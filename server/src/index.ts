import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import adminRoutes from './routes/adminRoutes';
import spaceRoutes from './routes/spaces';

// Import models to ensure they are registered
import './models/User';
import './models/Product';
import './models/Order';
import './models/Cart';
import './models/Space';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
    process.env.CLIENT_URL,
    'http://localhost:3000',
    'https://stay-space-mocha.vercel.app',
    'https://stayspace-client.vercel.app' // Fallback
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log('Blocked by CORS:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/spaces', spaceRoutes);

// Health check
app.get('/', (req, res) => {
    res.json({
        message: 'StaySpace API is running',
        version: '1.0.0',
        env: process.env.NODE_ENV,
        endpoints: {
            auth: '/api/auth',
            products: '/api/products',
            orders: '/api/orders',
            admin: '/api/admin',
            spaces: '/api/spaces'
        }
    });
});

app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        dbState: mongoose.connection.readyState
    });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        message: err.message || 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Database Connection
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI;

        if (!mongoURI) {
            console.error('MongoDB URI is not defined');
            // Don't throw if just building
            if (process.env.npm_lifecycle_event === 'build') return false;
            throw new Error('MongoDB URI is not defined');
        }

        if (mongoose.connection.readyState === 1) {
            return true;
        }

        await mongoose.connect(mongoURI);
        console.log('MongoDB Connected');
        return true;
    } catch (err) {
        console.error('MongoDB connection error:', err);
        return false;
    }
};

// For Vercel Serverless
if (process.env.NODE_ENV === 'production') {
    connectDB();
}

export default app;

// Start server locally OR if explicitly requested (e.g. Render/Railway/VPS)
// We check if the file is being run directly or if PORT is set and we're not in a serverless function structure that forbids listening
if (process.env.NODE_ENV !== 'production' || process.env.RENDER || process.env.RAILWAY_ENVIRONMENT) {
    const startServer = async () => {
        const isConnected = await connectDB();
        const port = process.env.PORT || 5000;

        // Only listen if we are not in a Vercel Serverless environment context where export default matches
        // But since we can't easily detect that, we check for explicit platforms or dev
        // Actually, if we are main module:
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
            console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
        });
    };

    // Only run if not imported (this covers "node dist/index.js" case)
    if (require.main === module) {
        startServer();
    }
}

