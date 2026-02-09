import express from 'express';
import Product from '../models/Product';
import { authenticateToken, requireAdmin, AuthRequest } from '../middleware/auth';
import { validateProduct } from '../middleware/validation';
import { apiLimiter } from '../middleware/security';
import logger from '../utils/logger';

const router = express.Router();

// Get all products with pagination and filtering
router.get('/', apiLimiter, async (req, res) => {
    try {
        const {
            category,
            featured,
            search,
            minPrice,
            maxPrice,
            sort = 'createdAt',
            order = 'desc',
            page = '1',
            limit = '20'
        } = req.query;

        const query: any = {};

        if (category) query.category = category;
        if (featured === 'true') query.isFeatured = true;
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseFloat(minPrice as string);
            if (maxPrice) query.price.$lte = parseFloat(maxPrice as string);
        }

        const pageNum = parseInt(page as string);
        const limitNum = parseInt(limit as string);
        const skip = (pageNum - 1) * limitNum;

        const sortOrder = order === 'asc' ? 1 : -1;
        const sortObj: any = {};
        sortObj[sort as string] = sortOrder;

        const [products, total] = await Promise.all([
            Product.find(query)
                .sort(sortObj)
                .skip(skip)
                .limit(limitNum)
                .select('-__v'),
            Product.countDocuments(query)
        ]);

        res.json({
            success: true,
            data: products,
            pagination: {
                page: pageNum,
                limit: limitNum,
                total,
                pages: Math.ceil(total / limitNum)
            }
        });
    } catch (err) {
        logger.error('Get products error:', err);
        res.status(500).json({
            success: false,
            message: 'Error fetching products'
        });
    }
});

// Get single product
router.get('/:id', apiLimiter, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).select('-__v');

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.json({
            success: true,
            data: product
        });
    } catch (err) {
        logger.error('Get product error:', err);

        if (err instanceof Error && err.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid product ID'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error fetching product'
        });
    }
});

// Create product (Admin only)
router.post('/', authenticateToken, requireAdmin, validateProduct, async (req: AuthRequest, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();

        logger.info(`Product created by admin ${req.user?.id}: ${newProduct.name}`);

        res.status(201).json({
            success: true,
            data: newProduct,
            message: 'Product created successfully'
        });
    } catch (err) {
        logger.error('Create product error:', err);
        res.status(500).json({
            success: false,
            message: 'Error creating product'
        });
    }
});

// Update product (Admin only)
router.put('/:id', authenticateToken, requireAdmin, validateProduct, async (req: AuthRequest, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        logger.info(`Product updated by admin ${req.user?.id}: ${product.name}`);

        res.json({
            success: true,
            data: product,
            message: 'Product updated successfully'
        });
    } catch (err) {
        logger.error('Update product error:', err);
        res.status(500).json({
            success: false,
            message: 'Error updating product'
        });
    }
});

// Delete product (Admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        logger.info(`Product deleted by admin ${req.user?.id}: ${product.name}`);

        res.json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (err) {
        logger.error('Delete product error:', err);
        res.status(500).json({
            success: false,
            message: 'Error deleting product'
        });
    }
});

// Check stock availability
router.post('/check-stock', apiLimiter, async (req, res) => {
    try {
        const { items } = req.body;

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Items array is required'
            });
        }

        const stockCheck = await Promise.all(
            items.map(async (item: { productId: string; quantity: number }) => {
                const product = await Product.findById(item.productId);

                if (!product) {
                    return {
                        productId: item.productId,
                        available: false,
                        reason: 'Product not found'
                    };
                }

                if (product.stock < item.quantity) {
                    return {
                        productId: item.productId,
                        available: false,
                        reason: 'Insufficient stock',
                        availableStock: product.stock,
                        requestedQuantity: item.quantity
                    };
                }

                return {
                    productId: item.productId,
                    available: true,
                    availableStock: product.stock
                };
            })
        );

        const allAvailable = stockCheck.every(item => item.available);

        res.json({
            success: true,
            allAvailable,
            items: stockCheck
        });
    } catch (err) {
        logger.error('Stock check error:', err);
        res.status(500).json({
            success: false,
            message: 'Error checking stock'
        });
    }
});

export default router;
