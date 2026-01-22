import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    category: string; // e.g. 'Office', 'Living', 'Sofa'
    images: string[];
    dimensions?: string;
    material?: string;
    stock: number;
    isFeatured: boolean;
}

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    images: [{ type: String }],
    dimensions: { type: String },
    material: { type: String },
    stock: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model<IProduct>('Product', ProductSchema);
