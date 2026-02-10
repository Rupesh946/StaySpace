import express from 'express';
import User from '../models/User';
import Product from '../models/Product';
import Order from '../models/Order';
import { authenticateToken, requireAdmin, AuthRequest } from '../middleware/auth';
import logger from '../utils/logger';

const router = express.Router();

// Middleware to ensure all routes in this file are protected and admin-only
router.use(authenticateToken, requireAdmin);

// @route   GET /api/admin/stats
// @desc    Get system-wide statistics for the dashboard
// @access  Admin
router.get('/stats', async (req: AuthRequest, res) => {
    try {
        const [userCount, productCount, orderCount, orders] = await Promise.all([
            User.countDocuments(),
            Product.countDocuments(),
            Order.countDocuments(),
            Order.find().select('totalAmount')
        ]);

        const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

        // Get recent orders (last 5)
        const recentOrders = await Order.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('user', 'username email')
            .lean();

        res.json({
            success: true,
            data: {
                counts: {
                    users: userCount,
                    products: productCount,
                    orders: orderCount,
                    revenue: totalRevenue
                },
                recentOrders
            }
        });
    } catch (err) {
        logger.error('Admin stats error:', err);
        res.status(500).json({
            success: false,
            message: 'Error fetching admin stats'
        });
    }
});

// ==========================================
// USER MANAGEMENT
// ==========================================

// @route   GET /api/admin/users
// @desc    Get all users with pagination
// @access  Admin
router.get('/users', async (req: AuthRequest, res) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 20;
        const skip = (page - 1) * limit;

        const [users, total] = await Promise.all([
            User.find()
                .select('-passwordHash') // Exclude sensitive data
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            User.countDocuments()
        ]);

        res.json({
            success: true,
            data: users,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (err) {
        logger.error('Admin get users error:', err);
        res.status(500).json({
            success: false,
            message: 'Error fetching users'
        });
    }
});

// @route   PUT /api/admin/users/:id/role
// @desc    Update user role
// @access  Admin
router.put('/users/:id/role', async (req: AuthRequest, res) => {
    try {
        const { role } = req.body;
        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid role specified'
            });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true }
        ).select('-passwordHash');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        logger.info(`User ${user.id} role updated to ${role} by admin ${req.user?.id}`);

        res.json({
            success: true,
            data: user,
            message: `User role updated to ${role}`
        });
    } catch (err) {
        logger.error('Admin update user role error:', err);
        res.status(500).json({
            success: false,
            message: 'Error updating user role'
        });
    }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete a user
// @access  Admin
router.delete('/users/:id', async (req: AuthRequest, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        logger.info(`User ${user.id} deleted by admin ${req.user?.id}`);

        res.json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (err) {
        logger.error('Admin delete user error:', err);
        res.status(500).json({
            success: false,
            message: 'Error deleting user'
        });
    }
});

// ==========================================
// ORDER MANAGEMENT
// ==========================================

// @route   GET /api/admin/orders
// @desc    Get all orders with optional status filter
// @access  Admin
router.get('/orders', async (req: AuthRequest, res) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 20;
        const status = req.query.status as string;
        const skip = (page - 1) * limit;

        const query: any = {};
        if (status) {
            query.status = status;
        }

        const [orders, total] = await Promise.all([
            Order.find(query)
                .populate('user', 'username email')
                .populate({
                    path: 'items.product',
                    select: 'name price images'
                })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Order.countDocuments(query)
        ]);

        res.json({
            success: true,
            data: orders,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (err) {
        logger.error('Admin get orders error:', err);
        res.status(500).json({
            success: false,
            message: 'Error fetching orders'
        });
    }
});

// @route   PUT /api/admin/orders/:id/status
// @desc    Update order status
// @access  Admin
router.put('/orders/:id/status', async (req: AuthRequest, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
            });
        }

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        ).populate('user', 'username email');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        logger.info(`Order ${order.id} status updated to ${status} by admin ${req.user?.id}`);

        res.json({
            success: true,
            data: order,
            message: `Order status updated to ${status}`
        });
    } catch (err) {
        logger.error('Admin update order status error:', err);
        res.status(500).json({
            success: false,
            message: 'Error updating order status'
        });
    }
});


export default router;
