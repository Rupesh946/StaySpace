import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import authRoutes from './routes/auth';
import productRoutes from './routes/products';
import spaceRoutes from './routes/spaces';
import orderRoutes from './routes/orders';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/spaces', spaceRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
    res.send('StaySpace API is running');
});

mongoose
    .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/stayspace')
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });
