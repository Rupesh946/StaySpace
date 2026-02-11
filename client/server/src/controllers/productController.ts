import { Request, Response } from 'express';
import Product from '../models/Product';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req: Request, res: Response) => {
    try {
        const {
            category,
            minPrice,
            maxPrice,
            search,
            sort = '-createdAt',
            page = '1',
            limit = '20',
            featured
        } = req.query;

        // Build query
        const query: any = {
            status: 'active',
            isVisible: true
        };

        if (category) {
            query.category = category;
        }

        if (featured === 'true') {
            query.isFeatured = true;
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        if (search) {
            query.$text = { $search: search as string };
        }

        // Pagination
        const pageNum = parseInt(page as string);
        const limitNum = parseInt(limit as string);
        const skip = (pageNum - 1) * limitNum;

        // Execute query
        const products = await Product.find(query)
            .sort(sort as string)
            .skip(skip)
            .limit(limitNum);

        const total = await Product.countDocuments(query);

        res.json({
            products,
            page: pageNum,
            pages: Math.ceil(total / limitNum),
            total
        });
    } catch (error: any) {
        console.error('Get products error:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Increment views
        product.views += 1;
        await product.save();

        res.json(product);
    } catch (error: any) {
        console.error('Get product error:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get product by slug
// @route   GET /api/products/slug/:slug
// @access  Public
export const getProductBySlug = async (req: Request, res: Response) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Increment views
        product.views += 1;
        await product.save();

        res.json(product);
    } catch (error: any) {
        console.error('Get product by slug error:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error: any) {
        console.error('Create product error:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error: any) {
        console.error('Update product error:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (error: any) {
        console.error('Delete product error:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
export const getFeaturedProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find({
            isFeatured: true,
            status: 'active',
            isVisible: true
        })
            .limit(8)
            .sort('-createdAt');

        res.json(products);
    } catch (error: any) {
        console.error('Get featured products error:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};
