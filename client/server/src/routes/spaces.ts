import express from 'express';
import Space from '../models/Space';

const router = express.Router();

// Get all spaces
router.get('/', async (req, res) => {
    try {
        const { type } = req.query;
        const query = type ? { type } : {};
        const spaces = await Space.find(query).populate('hotspots.productId');
        res.json(spaces);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// Get single space
router.get('/:id', async (req, res) => {
    try {
        const space = await Space.findById(req.params.id).populate('hotspots.productId');
        if (!space) return res.status(404).json({ message: 'Space not found' });
        res.json(space);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// Create space
router.post('/', async (req, res) => {
    try {
        const newSpace = new Space(req.body);
        await newSpace.save();
        res.status(201).json(newSpace);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

export default router;
