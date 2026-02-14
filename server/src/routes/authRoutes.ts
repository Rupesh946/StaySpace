import express from 'express';
import {
    register,
    login,
    getMe,
    updateProfile,
    addAddress,
    googleCallback
} from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';
import passport from 'passport';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/profile', protect, updateProfile);
router.post('/address', protect, addAddress);

// Debug Env Route (Remove in production later)
router.get('/debug-env', (req, res) => {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    res.json({
        hasClientId: !!clientId,
        clientIdLength: clientId ? clientId.length : 0,
        clientIdStart: clientId ? clientId.substring(0, 5) : 'NONE',
        nodeEnv: process.env.NODE_ENV
    });
});

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
    '/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    googleCallback
);

export default router;
