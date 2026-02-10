import mongoose, { Document, Schema } from 'mongoose';

export interface ICart extends Document {
    user?: mongoose.Types.ObjectId;
    sessionId?: string;
    items: {
        product: mongoose.Types.ObjectId;
        quantity: number;
        price: number;
    }[];
    subtotal: number;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

const CartSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    sessionId: {
        type: String
    },
    items: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
        },
        price: {
            type: Number,
            required: true
        }
    }],
    subtotal: {
        type: Number,
        default: 0
    },
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    }
}, {
    timestamps: true
});

// Calculate subtotal before saving
CartSchema.pre('save', function (this: any, next) {
    this.subtotal = this.items.reduce((total: number, item: any) => {
        return total + (item.price * item.quantity);
    }, 0);
    next();
});

// Create indexes
CartSchema.index({ user: 1 });
CartSchema.index({ sessionId: 1 });
CartSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // Auto-delete expired carts

export default mongoose.model<ICart>('Cart', CartSchema);
