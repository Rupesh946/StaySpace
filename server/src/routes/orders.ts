import express from 'express';
import mongoose from 'mongoose';
import Order from '../models/Order';
import Product from '../models/Product';
import User from '../models/User';
import { authenticateToken, requireAdmin, AuthRequest } from '../middleware/auth';
import { validateOrder } from '../middleware/validation';
import { apiLimiter } from '../middleware/security';
import { sendEmail, emailTemplates } from '../utils/email';
import logger from '../utils/logger';

const router = express.Router();

// Create new order
router.post('/', authenticateToken, validateOrder, async (req: AuthRequest, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { items, totalAmount, shippingAddress } = req.body;

        // Verify stock availability and reduce stock atomically
        for (const item of items) {
            const product = await Product.findById(item.product).session(session);

            if (!product) {
                await session.abortTransaction();
                return res.status(404).json({
                    success: false,
                    message: `Product not found: ${item.product}`
                });
            }

            if (product.stock < item.quantity) {
                await session.abortTransaction();
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`
                });
            }

            // Reduce stock
            product.stock -= item.quantity;
            await product.save({ session });
        }

        // Create order
        const newOrder = new Order({
            user: req.user!.id,
            items,
            totalAmount,
            shippingAddress,
            status: 'pending'
        });

        await newOrder.save({ session });
        await session.commitTransaction();

        // Populate product details for email
        const populatedOrder = await Order.findById(newOrder._id)
            .populate('items.product', 'name price')
            .populate('user', 'username email');

        // Get user details
        const user = await User.findById(req.user!.id);

        // Send order confirmation email (non-blocking)
        if (user && populatedOrder) {
            const orderDetails = {
                orderId: populatedOrder._id.toString(),
                customerName: user.username,
                createdAt: populatedOrder.createdAt,
                items: populatedOrder.items.map((item: any) => ({
                    productName: item.product.name,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalAmount: populatedOrder.totalAmount,
                shippingAddress: populatedOrder.shippingAddress
            };

            sendEmail({
                to: user.email,
                ...emailTemplates.orderConfirmation(orderDetails)
            }).catch(err => logger.error('Failed to send order confirmation email:', err));
        }

        logger.info(`Order created: ${newOrder._id} by user ${req.user!.id}`);

        res.status(201).json({
            success: true,
            data: populatedOrder,
            message: 'Order placed successfully'
        });
    } catch (err) {
        await session.abortTransaction();
        logger.error('Create order error:', err);
        res.status(500).json({
            success: false,
            message: 'Error creating order'
        });
    } finally {
        session.endSession();
    }
});

// Get user's orders
router.get('/my-orders', authenticateToken, apiLimiter, async (req: AuthRequest, res) => {
    try {
        const orders = await Order.find({ user: req.user!.id })
            .populate('items.product', 'name images price')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: orders
        });
    } catch (err) {
        logger.error('Get user orders error:', err);
        res.status(500).json({
            success: false,
            message: 'Error fetching orders'
        });
    }
});

// Get single order
router.get('/:id', authenticateToken, async (req: AuthRequest, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('items.product', 'name images price')
            .populate('user', 'username email');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        // Check if user owns this order or is admin
        if (order.user._id.toString() !== req.user!.id && req.user!.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        res.json({
            success: true,
            data: order
        });
    } catch (err) {
        logger.error('Get order error:', err);
        res.status(500).json({
            success: false,
            message: 'Error fetching order'
        });
    }
});

// Get all orders (Admin only)
router.get('/admin/all', authenticateToken, requireAdmin, apiLimiter, async (req: AuthRequest, res) => {
    try {
        const {
            status,
            page = '1',
            limit = '20',
            sort = 'createdAt',
            order = 'desc'
        } = req.query;

        const query: any = {};
        if (status) query.status = status;

        const pageNum = parseInt(page as string);
        const limitNum = parseInt(limit as string);
        const skip = (pageNum - 1) * limitNum;

        const sortOrder = order === 'asc' ? 1 : -1;
        const sortObj: any = {};
        sortObj[sort as string] = sortOrder;

        const [orders, total] = await Promise.all([
            Order.find(query)
                .populate('items.product', 'name price')
                .populate('user', 'username email')
                .sort(sortObj)
                .skip(skip)
                .limit(limitNum),
            Order.countDocuments(query)
        ]);

        res.json({
            success: true,
            data: orders,
            pagination: {
                page: pageNum,
                limit: limitNum,
                total,
                pages: Math.ceil(total / limitNum)
            }
        });
    } catch (err) {
        logger.error('Get all orders error:', err);
        res.status(500).json({
            success: false,
            message: 'Error fetching orders'
        });
    }
});

// Update order status (Admin only)
router.patch('/:id/status', authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
    try {
        const { status } = req.body;

        if (!['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status'
            });
        }

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        ).populate('items.product', 'name price');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        logger.info(`Order ${order._id} status updated to ${status} by admin ${req.user!.id}`);

        res.json({
            success: true,
            data: order,
            message: 'Order status updated successfully'
        });
    } catch (err) {
        logger.error('Update order status error:', err);
        res.status(500).json({
            success: false,
            message: 'Error updating order status'
        });
    }
});

// Cancel order
router.post('/:id/cancel', authenticateToken, async (req: AuthRequest, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const order = await Order.findById(req.params.id).session(session);

        if (!order) {
            await session.abortTransaction();
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        // Check if user owns this order or is admin
        if (order.user.toString() !== req.user!.id && req.user!.role !== 'admin') {
            await session.abortTransaction();
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        // Can only cancel pending or processing orders
        if (!['pending', 'processing'].includes(order.status)) {
            await session.abortTransaction();
            return res.status(400).json({
                success: false,
                message: `Cannot cancel order with status: ${order.status}`
            });
        }

        // Restore stock
        for (const item of order.items) {
            await Product.findByIdAndUpdate(
                item.product,
                { $inc: { stock: item.quantity } },
                { session }
            );
        }

        order.status = 'cancelled';
        await order.save({ session });

        await session.commitTransaction();

        logger.info(`Order ${order._id} cancelled by user ${req.user!.id}`);

        res.json({
            success: true,
            data: order,
            message: 'Order cancelled successfully'
        });
    } catch (err) {
        await session.abortTransaction();
        logger.error('Cancel order error:', err);
        res.status(500).json({
            success: false,
            message: 'Error cancelling order'
        });
    } finally {
        session.endSession();
    }
});

export default router;
