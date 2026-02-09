import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User';
import { authenticateToken } from '../middleware/auth';
import { validateRegistration, validateLogin } from '../middleware/validation';
import { authLimiter } from '../middleware/security';
import { sendEmail, emailTemplates } from '../utils/email';
import logger from '../utils/logger';

const router = express.Router();

// Register new user
router.post('/register', authLimiter, validateRegistration, async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email'
            });
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({ username: name, email, passwordHash });
        await newUser.save();

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            logger.error('JWT_SECRET is not defined');
            return res.status(500).json({
                success: false,
                message: 'Server configuration error'
            });
        }

        const token = jwt.sign(
            { id: newUser._id, role: newUser.role },
            jwtSecret,
            { expiresIn: '7d' }
        );

        // Send welcome email (non-blocking)
        sendEmail({
            to: email,
            ...emailTemplates.welcomeEmail(name)
        }).catch(err => logger.error('Failed to send welcome email:', err));

        logger.info(`New user registered: ${email}`);

        res.status(201).json({
            success: true,
            token,
            user: {
                id: newUser._id,
                name: newUser.username,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (err) {
        logger.error('Register error:', err);
        res.status(500).json({
            success: false,
            message: 'Server error during registration'
        });
    }
});

// Login user
router.post('/login', authLimiter, validateLogin, async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            logger.error('JWT_SECRET is not defined');
            return res.status(500).json({
                success: false,
                message: 'Server configuration error'
            });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            jwtSecret,
            { expiresIn: '7d' }
        );

        logger.info(`User logged in: ${email}`);

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        logger.error('Login error:', err);
        res.status(500).json({
            success: false,
            message: 'Server error during login'
        });
    }
});

// Get current user
router.get('/me', authenticateToken, async (req: any, res) => {
    try {
        const user = await User.findById(req.user.id).select('-passwordHash');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            user: {
                id: user._id,
                name: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        logger.error('Get user error:', err);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// Request password reset
router.post('/forgot-password', authLimiter, async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            // Don't reveal if user exists
            return res.json({
                success: true,
                message: 'If an account exists with this email, a password reset link has been sent.'
            });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

        user.resetPasswordToken = resetTokenHash;
        user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
        await user.save();

        // Create reset link
        const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;

        // Send email
        await sendEmail({
            to: email,
            ...emailTemplates.passwordReset(resetLink, user.username)
        });

        logger.info(`Password reset requested for: ${email}`);

        res.json({
            success: true,
            message: 'If an account exists with this email, a password reset link has been sent.'
        });
    } catch (err) {
        logger.error('Forgot password error:', err);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// Reset password
router.post('/reset-password', authLimiter, async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Token and new password are required'
            });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 8 characters long'
            });
        }

        const resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');

        const user = await User.findOne({
            resetPasswordToken: resetTokenHash,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired reset token'
            });
        }

        // Update password
        const salt = await bcrypt.genSalt(12);
        user.passwordHash = await bcrypt.hash(newPassword, salt);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        logger.info(`Password reset successful for user: ${user.email}`);

        res.json({
            success: true,
            message: 'Password has been reset successfully'
        });
    } catch (err) {
        logger.error('Reset password error:', err);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

export default router;
