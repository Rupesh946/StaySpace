import express from 'express';
import Order from '../models/Order';
// Middleware for auth would go here, simplified for now
import jwt from 'jsonwebtoken';

const router = express.Router();

const verifyToken = (req: any, res: any, next: any) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

router.post('/', verifyToken, async (req: any, res: any) => {
    try {
        const { items, totalAmount, shippingAddress } = req.body;
        const newOrder = new Order({
            user: req.user.id,
            items,
            totalAmount,
            shippingAddress,
        });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.get('/my-orders', verifyToken, async (req: any, res: any) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate('items.product');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

export default router;
