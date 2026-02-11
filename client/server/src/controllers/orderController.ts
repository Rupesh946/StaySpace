import { Request, Response } from 'express';
import Order from '../models/Order';
import Product from '../models/Product';
import { AuthRequest } from '../middleware/authMiddleware';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const {
            items,
            shippingAddress,
            billingAddress,
            paymentMethod,
            subtotal,
            tax,
            shipping,
            discount,
            discountCode,
            total,
            customerNotes
        } = req.body;

        // Validation
        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }

        if (!shippingAddress) {
            return res.status(400).json({ message: 'Shipping address is required' });
        }

        // Verify stock availability and update inventory
        for (const item of items) {
            const product = await Product.findById(item.product);

            if (!product) {
                return res.status(404).json({
                    message: `Product not found: ${item.name}`
                });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    message: `Insufficient stock for ${product.name}. Available: ${product.stock}`
                });
            }

            // Deduct stock
            product.stock -= item.quantity;
            product.sales += item.quantity;
            await product.save();
        }

        // Create order
        const order = await Order.create({
            user: req.user._id,
            items,
            shippingAddress,
            billingAddress: billingAddress || shippingAddress,
            subtotal,
            tax,
            shipping,
            discount,
            discountCode,
            total,
            paymentMethod,
            customerNotes,
            paymentStatus: paymentMethod === 'cod' ? 'pending' : 'pending',
            orderStatus: 'pending'
        });

        res.status(201).json(order);
    } catch (error: any) {
        console.error('Create order error:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const orders = await Order.find({ user: req.user._id })
            .sort('-createdAt')
            .populate('items.product', 'name images');

        res.json(orders);
    } catch (error: any) {
        console.error('Get my orders error:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const order = await Order.findById(req.params.id)
            .populate('user', 'name email')
            .populate('items.product', 'name images');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if user owns this order or is admin
        if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to view this order' });
        }

        res.json(order);
    } catch (error: any) {
        console.error('Get order error:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = async (req: AuthRequest, res: Response) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.paymentStatus = 'paid';
        order.paidAt = new Date();
        order.orderStatus = 'processing';

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (error: any) {
        console.error('Update order to paid error:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private/Admin
export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find({})
            .populate('user', 'name email')
            .sort('-createdAt');

        res.json(orders);
    } catch (error: any) {
        console.error('Get all orders error:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const { orderStatus, trackingNumber, carrier } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.orderStatus = orderStatus || order.orderStatus;

        if (trackingNumber) order.trackingNumber = trackingNumber;
        if (carrier) order.carrier = carrier;

        if (orderStatus === 'shipped' && !order.shippedAt) {
            order.shippedAt = new Date();
        }

        if (orderStatus === 'delivered' && !order.deliveredAt) {
            order.deliveredAt = new Date();
        }

        if (orderStatus === 'cancelled' && !order.cancelledAt) {
            order.cancelledAt = new Date();

            // Restore stock
            for (const item of order.items) {
                const product = await Product.findById(item.product);
                if (product) {
                    product.stock += item.quantity;
                    product.sales -= item.quantity;
                    await product.save();
                }
            }
        }

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (error: any) {
        console.error('Update order status error:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};
