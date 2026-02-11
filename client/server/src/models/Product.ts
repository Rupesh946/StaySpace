import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    slug: string;
    description: string;
    shortDescription?: string;
    price: number;
    compareAtPrice?: number;
    category: string; // e.g. 'Office', 'Living', 'Sofa'
    images: string[];
    dimensions?: string;
    material?: string;
    stock: number;
    lowStockThreshold: number;
    isFeatured: boolean;
    isVisible: boolean;
    status: 'draft' | 'active' | 'archived';
    sku?: string;
    tags: string[];
    seo: {
        title?: string;
        description?: string;
        keywords?: string[];
    };
    views: number;
    sales: number;
    rating: number;
    reviewCount: number;
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        maxlength: 200
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    compareAtPrice: {
        type: Number,
        min: 0
    },
    category: {
        type: String,
        required: true,
        index: true
    },
    images: [{
        type: String
    }],
    dimensions: {
        type: String
    },
    material: {
        type: String
    },
    stock: {
        type: Number,
        default: 0,
        min: 0
    },
    lowStockThreshold: {
        type: Number,
        default: 5
    },
    isFeatured: {
        type: Boolean,
        default: false,
        index: true
    },
    isVisible: {
        type: Boolean,
        default: true
    },
    status: {
        type: String,
        enum: ['draft', 'active', 'archived'],
        default: 'active',
        index: true
    },
    sku: {
        type: String,
        unique: true,
        sparse: true
    },
    tags: [{
        type: String,
        lowercase: true
    }],
    seo: {
        title: { type: String },
        description: { type: String },
        keywords: [{ type: String }]
    },
    views: {
        type: Number,
        default: 0
    },
    sales: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    reviewCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Generate slug from name before saving
ProductSchema.pre('save', function (this: any, next) {
    if (this.isModified('name') && !this.slug) {
        this.slug = this.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
    next();
});

// Create indexes for search and filtering
ProductSchema.index({ name: 'text', description: 'text' });
ProductSchema.index({ category: 1, status: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ createdAt: -1 });

export default mongoose.model<IProduct>('Product', ProductSchema);
