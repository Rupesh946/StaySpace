import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

// Extend Express Request type
export interface AuthRequest extends Request {
    user?: {
        id: string;
        role: string;
    };
}

// Verify JWT token
export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access denied. No token provided.'
        });
    }

    try {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            logger.error('JWT_SECRET is not defined in environment variables');
            return res.status(500).json({
                success: false,
                message: 'Server configuration error'
            });
        }

        const decoded = jwt.verify(token, jwtSecret) as { id: string; role: string };
        req.user = decoded;
        next();
    } catch (err) {
        logger.warn('Invalid token attempt:', { error: err });
        return res.status(403).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};

// Check if user is admin
export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: 'Authentication required'
        });
    }

    if (req.user.role !== 'admin') {
        logger.warn('Unauthorized admin access attempt:', { userId: req.user.id });
        return res.status(403).json({
            success: false,
            message: 'Admin access required'
        });
    }

    next();
};

// Optional authentication (doesn't fail if no token)
export const optionalAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return next();
    }

    try {
        const jwtSecret = process.env.JWT_SECRET;
        if (jwtSecret) {
            const decoded = jwt.verify(token, jwtSecret) as { id: string; role: string };
            req.user = decoded;
        }
    } catch (err) {
        // Token is invalid, but we don't fail - just continue without user
        logger.debug('Optional auth - invalid token');
    }

    next();
};
