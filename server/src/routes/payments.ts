import express from 'express';
import { authenticateToken, requireAdmin, AuthRequest } from '../middleware/auth';
import { apiLimiter } from '../middleware/security';
import Order from '../models/Order';
import User from '../models/User';
import {
    createPaymentIntent,
    getPaymentIntent,
    cancelPaymentIntent,
    createRefund,
    constructWebhookEvent,
} from '../utils/stripe';
import logger from '../utils/logger';
import { sendEmail, emailTemplates } from '../utils/email';

const router = express.Router();

/**
 * Create payment intent for an order
 * POST /api/payments/create-intent
 */
router.post('/create-intent', authenticateToken, apiLimiter, async (req: AuthRequest, res) => {
    try {
        const { orderId } = req.body;

        if (!orderId) {
            return res.status(400).json({
                success: false,
                message: 'Order ID is required',
            });
        }

        // Get order details
        const order = await Order.findById(orderId).populate('user', 'username email');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found',
            });
        }

        // Verify order belongs to user
        if (order.user._id.toString() !== req.user!.id) {
            return res.status(403).json({
                success: false,
                message: 'Access denied',
            });
        }

        // Check if order already has a payment
        if (order.paymentId) {
            return res.status(400).json({
                success: false,
                message: 'Order already has a payment associated',
            });
        }

        // Check if order is in pending status
        if (order.status !== 'pending') {
            return res.status(400).json({
                success: false,
                message: `Cannot create payment for order with status: ${order.status}`,
            });
        }

        // Get user details
        const user = await User.findById(req.user!.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Convert amount to smallest currency unit (paise for INR, cents for USD)
        const amountInSmallestUnit = Math.round(order.totalAmount * 100);

        // Create payment intent
        const paymentIntent = await createPaymentIntent({
            amount: amountInSmallestUnit,
            currency: process.env.PAYMENT_CURRENCY || 'inr',
            orderId: order._id.toString(),
            customerEmail: user.email,
            customerName: user.username,
        });

        // Update order with payment intent ID
        order.paymentId = paymentIntent.id;
        await order.save();

        logger.info(`Payment intent created for order ${orderId}: ${paymentIntent.id}`);

        res.json({
            success: true,
            data: {
                clientSecret: paymentIntent.client_secret,
                paymentIntentId: paymentIntent.id,
                amount: order.totalAmount,
                currency: paymentIntent.currency,
            },
            message: 'Payment intent created successfully',
        });
    } catch (error) {
        logger.error('Error creating payment intent:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating payment intent',
        });
    }
});

/**
 * Get payment status
 * GET /api/payments/status/:paymentIntentId
 */
router.get('/status/:paymentIntentId', authenticateToken, apiLimiter, async (req: AuthRequest, res) => {
    try {
        const { paymentIntentId } = req.params;

        const paymentIntent = await getPaymentIntent(paymentIntentId);

        // Find order with this payment ID
        const order = await Order.findOne({ paymentId: paymentIntentId });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found for this payment',
            });
        }

        // Verify order belongs to user or user is admin
        if (order.user.toString() !== req.user!.id && req.user!.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied',
            });
        }

        res.json({
            success: true,
            data: {
                paymentIntentId: paymentIntent.id,
                status: paymentIntent.status,
                amount: paymentIntent.amount / 100,
                currency: paymentIntent.currency,
                orderId: order._id,
                orderStatus: order.status,
            },
        });
    } catch (error) {
        logger.error('Error getting payment status:', error);
        res.status(500).json({
            success: false,
            message: 'Error retrieving payment status',
        });
    }
});

/**
 * Cancel payment (for pending orders)
 * POST /api/payments/cancel/:paymentIntentId
 */
router.post('/cancel/:paymentIntentId', authenticateToken, apiLimiter, async (req: AuthRequest, res) => {
    try {
        const { paymentIntentId } = req.params;

        // Find order with this payment ID
        const order = await Order.findOne({ paymentId: paymentIntentId });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found for this payment',
            });
        }

        // Verify order belongs to user
        if (order.user.toString() !== req.user!.id) {
            return res.status(403).json({
                success: false,
                message: 'Access denied',
            });
        }

        // Cancel payment intent
        const cancelledPayment = await cancelPaymentIntent(paymentIntentId);

        logger.info(`Payment cancelled: ${paymentIntentId} for order ${order._id}`);

        res.json({
            success: true,
            data: {
                paymentIntentId: cancelledPayment.id,
                status: cancelledPayment.status,
            },
            message: 'Payment cancelled successfully',
        });
    } catch (error) {
        logger.error('Error cancelling payment:', error);
        res.status(500).json({
            success: false,
            message: 'Error cancelling payment',
        });
    }
});

/**
 * Create refund (Admin only)
 * POST /api/payments/refund
 */
router.post('/refund', authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
    try {
        const { orderId, amount, reason } = req.body;

        if (!orderId) {
            return res.status(400).json({
                success: false,
                message: 'Order ID is required',
            });
        }

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found',
            });
        }

        if (!order.paymentId) {
            return res.status(400).json({
                success: false,
                message: 'No payment found for this order',
            });
        }

        // Create refund
        const refundAmount = amount ? Math.round(amount * 100) : undefined;

        const refund = await createRefund({
            paymentIntentId: order.paymentId,
            amount: refundAmount,
            reason: reason || 'requested_by_customer',
        });

        // Update order status
        order.status = 'cancelled';
        await order.save();

        logger.info(`Refund created: ${refund.id} for order ${orderId} by admin ${req.user!.id}`);

        res.json({
            success: true,
            data: {
                refundId: refund.id,
                amount: refund.amount / 100,
                status: refund.status,
            },
            message: 'Refund processed successfully',
        });
    } catch (error) {
        logger.error('Error creating refund:', error);
        res.status(500).json({
            success: false,
            message: 'Error processing refund',
        });
    }
});

/**
 * Stripe webhook handler
 * POST /api/payments/webhook
 */
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const signature = req.headers['stripe-signature'] as string;

    if (!signature) {
        return res.status(400).json({
            success: false,
            message: 'Missing stripe-signature header',
        });
    }

    try {
        const event = constructWebhookEvent(req.body, signature);

        logger.info(`Webhook received: ${event.type}`);

        // Handle different event types
        switch (event.type) {
            case 'payment_intent.succeeded': {
                const paymentIntent = event.data.object as any;
                const orderId = paymentIntent.metadata.orderId;

                // Update order status
                const order = await Order.findById(orderId).populate('user', 'username email');

                if (order) {
                    order.status = 'processing';
                    await order.save();

                    logger.info(`Order ${orderId} payment succeeded, status updated to processing`);

                    // Send payment confirmation email
                    const user = await User.findById(order.user);
                    if (user) {
                        const populatedOrder = await Order.findById(orderId)
                            .populate('items.product', 'name price');

                        if (populatedOrder) {
                            const orderDetails = {
                                orderId: populatedOrder._id.toString(),
                                customerName: user.username,
                                createdAt: populatedOrder.createdAt,
                                items: populatedOrder.items.map((item: any) => ({
                                    productName: item.product.name,
                                    quantity: item.quantity,
                                    price: item.price,
                                })),
                                totalAmount: populatedOrder.totalAmount,
                                shippingAddress: populatedOrder.shippingAddress,
                            };

                            sendEmail({
                                to: user.email,
                                ...emailTemplates.orderConfirmation(orderDetails),
                            }).catch(err => logger.error('Failed to send payment confirmation email:', err));
                        }
                    }
                }
                break;
            }

            case 'payment_intent.payment_failed': {
                const paymentIntent = event.data.object as any;
                const orderId = paymentIntent.metadata.orderId;

                logger.warn(`Payment failed for order ${orderId}`);

                // Optionally update order or notify user
                break;
            }

            case 'payment_intent.canceled': {
                const paymentIntent = event.data.object as any;
                const orderId = paymentIntent.metadata.orderId;

                logger.info(`Payment cancelled for order ${orderId}`);
                break;
            }

            case 'charge.refunded': {
                const charge = event.data.object as any;
                logger.info(`Charge refunded: ${charge.id}`);
                break;
            }

            default:
                logger.info(`Unhandled event type: ${event.type}`);
        }

        res.json({ received: true });
    } catch (error) {
        logger.error('Webhook error:', error);
        res.status(400).json({
            success: false,
            message: 'Webhook error',
        });
    }
});

/**
 * Get payment configuration (publishable key)
 * GET /api/payments/config
 */
router.get('/config', (req, res) => {
    res.json({
        success: true,
        data: {
            publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
            currency: process.env.PAYMENT_CURRENCY || 'inr',
        },
    });
});

export default router;
