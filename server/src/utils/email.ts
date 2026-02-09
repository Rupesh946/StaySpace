import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import logger from './logger';

// Load environment variables
dotenv.config();

// Check if email is configured
const isEmailConfigured = !!(process.env.SMTP_USER && process.env.SMTP_PASS);

// Create reusable transporter only if credentials are provided
let transporter: nodemailer.Transporter | null = null;

if (isEmailConfigured) {
    transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    // Verify transporter configuration
    transporter.verify((error, success) => {
        if (error) {
            logger.warn('Email transporter verification failed:', error);
            logger.warn('Email functionality will be disabled. Add SMTP credentials to .env to enable emails.');
        } else {
            logger.info('✅ Email server is ready to send messages');
        }
    });
} else {
    logger.warn('⚠️  Email not configured. Add SMTP_USER and SMTP_PASS to .env to enable email functionality.');
}

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
    text?: string;
}

export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
    // Check if email is configured
    if (!transporter) {
        logger.warn('Email not sent - email system not configured. Add SMTP credentials to .env');
        return false;
    }

    try {
        const mailOptions = {
            from: `"${process.env.SMTP_FROM_NAME || 'StaySpace'}" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
            to: options.to,
            subject: options.subject,
            html: options.html,
            text: options.text || options.html.replace(/<[^>]*>/g, ''), // Strip HTML for text version
        };

        const info = await transporter.sendMail(mailOptions);
        logger.info(`✅ Email sent: ${info.messageId}`);
        return true;
    } catch (error) {
        logger.error('❌ Error sending email:', error);
        return false;
    }
};

// Email templates
export const emailTemplates = {
    orderConfirmation: (orderDetails: any) => ({
        subject: `Order Confirmation - #${orderDetails.orderId}`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: #1a1a1a; color: white; padding: 20px; text-align: center; }
                    .content { padding: 20px; background: #f9f9f9; }
                    .order-details { background: white; padding: 15px; margin: 20px 0; }
                    .item { border-bottom: 1px solid #eee; padding: 10px 0; }
                    .total { font-size: 18px; font-weight: bold; margin-top: 20px; }
                    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>STAYSPACE</h1>
                        <p>Thank you for your order!</p>
                    </div>
                    <div class="content">
                        <h2>Order Confirmation</h2>
                        <p>Hi ${orderDetails.customerName},</p>
                        <p>We've received your order and will send you a shipping confirmation email as soon as your order ships.</p>
                        
                        <div class="order-details">
                            <h3>Order #${orderDetails.orderId}</h3>
                            <p><strong>Order Date:</strong> ${new Date(orderDetails.createdAt).toLocaleDateString()}</p>
                            
                            <h4>Items:</h4>
                            ${orderDetails.items.map((item: any) => `
                                <div class="item">
                                    <p><strong>${item.productName}</strong></p>
                                    <p>Quantity: ${item.quantity} × ₹${item.price.toFixed(2)}</p>
                                </div>
                            `).join('')}
                            
                            <div class="total">
                                <p>Total: ₹${orderDetails.totalAmount.toFixed(2)}</p>
                            </div>
                            
                            <h4>Shipping Address:</h4>
                            <p>
                                ${orderDetails.shippingAddress.street}<br>
                                ${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.zip}<br>
                                ${orderDetails.shippingAddress.country}
                            </p>
                        </div>
                        
                        <p>If you have any questions, please contact our customer support.</p>
                    </div>
                    <div class="footer">
                        <p>&copy; 2026 StaySpace Interiors. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `
    }),

    welcomeEmail: (userName: string) => ({
        subject: 'Welcome to StaySpace!',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: #1a1a1a; color: white; padding: 30px; text-align: center; }
                    .content { padding: 30px; background: #f9f9f9; }
                    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>STAYSPACE</h1>
                    </div>
                    <div class="content">
                        <h2>Welcome, ${userName}!</h2>
                        <p>Thank you for joining StaySpace. We're excited to help you design the space you love.</p>
                        <p>Explore our curated collection of furniture and home decor to transform your living spaces.</p>
                        <p>Happy shopping!</p>
                    </div>
                    <div class="footer">
                        <p>&copy; 2026 StaySpace Interiors. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `
    }),

    passwordReset: (resetLink: string, userName: string) => ({
        subject: 'Password Reset Request - StaySpace',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: #1a1a1a; color: white; padding: 20px; text-align: center; }
                    .content { padding: 30px; background: #f9f9f9; }
                    .button { display: inline-block; padding: 12px 30px; background: #1a1a1a; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>STAYSPACE</h1>
                    </div>
                    <div class="content">
                        <h2>Password Reset Request</h2>
                        <p>Hi ${userName},</p>
                        <p>We received a request to reset your password. Click the button below to create a new password:</p>
                        <a href="${resetLink}" class="button">Reset Password</a>
                        <p>This link will expire in 1 hour.</p>
                        <p>If you didn't request this, please ignore this email.</p>
                    </div>
                    <div class="footer">
                        <p>&copy; 2026 StaySpace Interiors. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `
    })
};
