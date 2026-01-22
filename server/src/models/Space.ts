import mongoose, { Document, Schema } from 'mongoose';

export interface IHotspot {
    x: number; // Percentage from left
    y: number; // Percentage from top
    productId: mongoose.Types.ObjectId;
}

export interface ISpace extends Document {
    name: string;
    type: 'Office' | 'Living' | 'Bedroom' | 'Dining' | 'Outdoor';
    imageUrl: string;
    hotspots: IHotspot[];
    description?: string;
}

const HotspotSchema = new Schema({
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
});

const SpaceSchema: Schema = new Schema({
    name: { type: String, required: true },
    type: {
        type: String,
        enum: ['Office', 'Living', 'Bedroom', 'Dining', 'Outdoor'],
        required: true
    },
    imageUrl: { type: String, required: true },
    hotspots: [HotspotSchema],
    description: { type: String },
}, { timestamps: true });

export default mongoose.model<ISpace>('Space', SpaceSchema);
