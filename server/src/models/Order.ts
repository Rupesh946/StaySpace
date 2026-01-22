import mongoose, { Document, Schema } from 'mongoose';

export interface IOrderItem {
    product: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
}

export interface IOrder extends Document {
    user: mongoose.Types.ObjectId;
    items: IOrderItem[];
    totalAmount: number;
    status: 'pending' | 'completed' | 'cancelled';
    shippingAddress: {
        street: string;
        city: string;
        zip: string;
        country: string;
    };
}

const OrderItemSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
});

const OrderSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [OrderItemSchema],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
    shippingAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        zip: { type: String, required: true },
        country: { type: String, required: true },
    },
}, { timestamps: true });

export default mongoose.model<IOrder>('Order', OrderSchema);
