import Stripe from 'stripe';
import dotenv from 'dotenv';
import logger from './logger';

// Load environment variables
dotenv.config();

// Initialize Stripe
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
    logger.error('STRIPE_SECRET_KEY is not defined in environment variables');
    throw new Error('Stripe configuration error: Missing STRIPE_SECRET_KEY');
}

const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2023-10-16',
});

export interface PaymentIntentData {
    amount: number; // in smallest currency unit (e.g., cents for USD, paise for INR)
    currency: string;
    orderId: string;
    customerEmail: string;
    customerName: string;
}

export interface RefundData {
    paymentIntentId: string;
    amount?: number; // Optional: partial refund amount
    reason?: 'duplicate' | 'fraudulent' | 'requested_by_customer';
}

/**
 * Create a payment intent for order payment
 */
export const createPaymentIntent = async (data: PaymentIntentData): Promise<Stripe.PaymentIntent> => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: data.amount,
            currency: data.currency,
            metadata: {
                orderId: data.orderId,
                customerEmail: data.customerEmail,
                customerName: data.customerName,
            },
            automatic_payment_methods: {
                enabled: true,
            },
            description: `Order #${data.orderId} - ${data.customerName}`,
        });

        logger.info(`Payment intent created: ${paymentIntent.id} for order ${data.orderId}`);
        return paymentIntent;
    } catch (error) {
        logger.error('Error creating payment intent:', error);
        throw error;
    }
};

/**
 * Retrieve a payment intent
 */
export const getPaymentIntent = async (paymentIntentId: string): Promise<Stripe.PaymentIntent> => {
    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        return paymentIntent;
    } catch (error) {
        logger.error('Error retrieving payment intent:', error);
        throw error;
    }
};

/**
 * Confirm a payment intent
 */
export const confirmPaymentIntent = async (
    paymentIntentId: string,
    paymentMethodId: string
): Promise<Stripe.PaymentIntent> => {
    try {
        const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
            payment_method: paymentMethodId,
        });

        logger.info(`Payment intent confirmed: ${paymentIntentId}`);
        return paymentIntent;
    } catch (error) {
        logger.error('Error confirming payment intent:', error);
        throw error;
    }
};

/**
 * Cancel a payment intent
 */
export const cancelPaymentIntent = async (paymentIntentId: string): Promise<Stripe.PaymentIntent> => {
    try {
        const paymentIntent = await stripe.paymentIntents.cancel(paymentIntentId);
        logger.info(`Payment intent cancelled: ${paymentIntentId}`);
        return paymentIntent;
    } catch (error) {
        logger.error('Error cancelling payment intent:', error);
        throw error;
    }
};

/**
 * Create a refund
 */
export const createRefund = async (data: RefundData): Promise<Stripe.Refund> => {
    try {
        const refundData: Stripe.RefundCreateParams = {
            payment_intent: data.paymentIntentId,
        };

        if (data.amount) {
            refundData.amount = data.amount;
        }

        if (data.reason) {
            refundData.reason = data.reason;
        }

        const refund = await stripe.refunds.create(refundData);
        logger.info(`Refund created: ${refund.id} for payment ${data.paymentIntentId}`);
        return refund;
    } catch (error) {
        logger.error('Error creating refund:', error);
        throw error;
    }
};

/**
 * Construct webhook event from raw body and signature
 */
export const constructWebhookEvent = (
    payload: string | Buffer,
    signature: string
): Stripe.Event => {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
        throw new Error('STRIPE_WEBHOOK_SECRET is not defined');
    }

    try {
        const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
        return event;
    } catch (error) {
        logger.error('Error constructing webhook event:', error);
        throw error;
    }
};

/**
 * Get Stripe instance (for advanced operations)
 */
export const getStripeInstance = (): Stripe => {
    return stripe;
};

export default stripe;
