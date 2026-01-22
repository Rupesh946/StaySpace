import express from 'express';
import Product from '../models/Product';

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
    try {
        const { category, featured } = req.query;
        let query: any = {};
        if (category) query.category = category;
        if (featured === 'true') query.isFeatured = true;

        const products = await Product.find(query);
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// Get single product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// Create product (Admin only logic omitted for brevity, but implied)
router.post('/', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

export default router;
