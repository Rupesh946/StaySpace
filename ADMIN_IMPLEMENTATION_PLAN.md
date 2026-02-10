# Admin Panel Implementation Plan for StaySpace

This document outlines the step-by-step process to add a comprehensive Admin Panel to your StaySpace application.

## Phase 1: Backend Setup (Server)

### 1. Verification
You already have a `role` field in your `User` model (`server/src/models/User.ts`), which is great! It defaults to 'user' but allows 'admin'.

### 2. Create Admin Middleware
Create a middleware to protect admin-only routes. This ensures only users with `role: 'admin'` can access these endpoints.

**File:** `server/src/middleware/adminMiddleware.ts`
```typescript
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/User';

interface AuthRequest extends Request {
  user?: IUser;
}

export const adminObj = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};
```

### 3. Create Admin Controller
Create a controller to handle admin-specific logic like getting dashboard stats.

**File:** `server/src/controllers/adminController.ts`
```typescript
import { Request, Response } from 'express';
import User from '../models/User';
import Product from '../models/Product';
import Order from '../models/Order';

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const userCount = await User.countDocuments();
    const productCount = await Product.countDocuments();
    const orderCount = await Order.countDocuments();
    
    // Calculate total revenue (example)
    const orders = await Order.find();
    const totalRevenue = orders.reduce((acc, order) => acc + (order.totalPrice || 0), 0);

    res.json({
      users: userCount,
      products: productCount,
      orders: orderCount,
      revenue: totalRevenue
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
```

### 4. Create Admin Routes
Set up the API endpoints for the admin panel.

**File:** `server/src/routes/adminRoutes.ts`
```typescript
import express from 'express';
import { protect } from '../middleware/authMiddleware'; // Assuming auth middleware exists
import { adminObj } from '../middleware/adminMiddleware';
import { getDashboardStats } from '../controllers/adminController';

const router = express.Router();

// protect checks for valid JWT, adminObj checks for role 'admin'
router.get('/stats', protect, adminObj, getDashboardStats);

export default router;
```

**Register the routes in `server/src/index.ts`:**
```typescript
import adminRoutes from './routes/adminRoutes';
// ...
app.use('/api/admin', adminRoutes);
```

---

## Phase 2: Frontend Setup (Client)

We will use Next.js App Router to create a dedicated `/admin` section.

### 1. Create Admin Layout
This layout (in `client/src/app/admin/layout.tsx`) will provide a consistent Sidebar for navigation across all admin pages and handle route protection.

```tsx
'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { LayoutDashboard, ShoppingBag, Users, ListOrdered } from 'lucide-react'; 

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user || user.role !== 'admin') {
        router.push('/'); // Redirect non-admins to home
      }
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== 'admin') {
    return <div className="flex justify-center items-center h-screen">Loading Admin Panel...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md z-10 flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        </div>
        <nav className="mt-6 flex flex-col gap-2">
          <Link href="/admin" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent hover:border-black transition-colors">
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent hover:border-black transition-colors">
            <ShoppingBag className="w-5 h-5 mr-3" />
            Products
          </Link>
          <Link href="/admin/orders" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent hover:border-black transition-colors">
            <ListOrdered className="w-5 h-5 mr-3" />
            Orders
          </Link>
          <Link href="/admin/users" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent hover:border-black transition-colors">
            <Users className="w-5 h-5 mr-3" />
            Users
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
```

### 2. Create Admin Dashboard Page
**File:** `client/src/app/admin/page.tsx`
```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; 

export default function AdminDashboard() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        {/* Add more cards for Users, Products, Orders */}
      </div>
    </div>
  );
}
```

## Phase 3: Getting Access

Since self-registration as 'admin' is insecure:

1.  Register a new user normally via the website.
2.  Connect to your MongoDB database (using MongoDB Compass or `mongosh`).
3.  Find your user document in the `users` collection.
4.  Update the `role` field from `"user"` to `"admin"`.
5.  Log out and log back in to refresh your token/session.

---

# Vercel Deployment Plan for StaySpace E-Commerce Platform

## Overview
This comprehensive plan outlines the deployment of StaySpace to Vercel with full e-commerce capabilities including authentication, authorization, payment processing, inventory management, and more.

---

## Phase 1: Pre-Deployment Setup

### 1.1 Environment Configuration

#### Backend Environment Variables (.env)
```env
# Database
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/stayspace?retryWrites=true&w=majority

# JWT Authentication
JWT_SECRET=<strong-random-secret-key>
JWT_EXPIRE=30d
REFRESH_TOKEN_SECRET=<another-strong-secret>
REFRESH_TOKEN_EXPIRE=90d

# CORS
CLIENT_URL=https://your-domain.vercel.app
ALLOWED_ORIGINS=https://your-domain.vercel.app,https://admin.your-domain.vercel.app

# Payment Gateway (Stripe)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email Service (SendGrid/Resend)
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=SG.xxx
FROM_EMAIL=noreply@stayspace.com
ADMIN_EMAIL=admin@stayspace.com

# File Upload (Cloudinary/AWS S3)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx

# Redis (for sessions/caching - Upstash)
REDIS_URL=redis://default:xxx@xxx.upstash.io:6379

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Node Environment
NODE_ENV=production
PORT=5000
```

#### Frontend Environment Variables (.env.local)
```env
NEXT_PUBLIC_API_URL=https://api.your-domain.vercel.app
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

### 1.2 Project Structure Optimization

```
StaySpace/
├── client/                 # Next.js frontend (deployed separately)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vercel.json
│
├── server/                 # Express backend (deployed as serverless)
│   ├── src/
│   ├── package.json
│   └── vercel.json
│
└── README.md
```

---

## Phase 2: Authentication & Authorization Implementation

### 2.1 Enhanced Authentication System

#### Features to Implement:
1. **JWT-based Authentication**
   - Access tokens (short-lived: 30 minutes)
   - Refresh tokens (long-lived: 90 days)
   - Token rotation on refresh

2. **OAuth Integration**
   - Google OAuth 2.0
   - Facebook Login
   - Apple Sign In

3. **Multi-Factor Authentication (MFA)**
   - Email-based OTP
   - SMS verification (Twilio)
   - Authenticator app support (TOTP)

4. **Password Security**
   - Bcrypt hashing (cost factor: 12)
   - Password strength validation
   - Password reset via email
   - Password history (prevent reuse)

#### Implementation Files:

**Backend: `server/src/middleware/authMiddleware.ts`**
```typescript
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;
  
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
```

**Backend: `server/src/controllers/authController.ts`**
```typescript
// Add methods for:
// - register
// - login
// - refreshToken
// - logout
// - forgotPassword
// - resetPassword
// - verifyEmail
// - enable2FA
// - verify2FA
// - oauthCallback
```

### 2.2 Role-Based Access Control (RBAC)

#### User Roles:
- **Customer** - Browse, purchase, manage orders
- **Admin** - Full system access
- **Manager** - Product & inventory management
- **Support** - View orders, manage customer queries
- **Vendor** (future) - Manage own products

#### Permission System:
```typescript
// server/src/models/User.ts
interface IUser {
  role: 'customer' | 'admin' | 'manager' | 'support';
  permissions: string[]; // ['products:read', 'products:write', 'orders:read']
}
```

**Backend: `server/src/middleware/authorize.ts`**
```typescript
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Role ${req.user.role} is not authorized to access this route` 
      });
    }
    
    next();
  };
};
```

---

## Phase 3: E-Commerce Core Features

### 3.1 Product Management

#### Features:
- Product CRUD operations
- Variant management (size, color, material)
- Image upload & optimization
- SEO metadata
- Product categories & tags
- Featured products
- Related products
- Product reviews & ratings

#### Database Schema Enhancement:
```typescript
// server/src/models/Product.ts
interface IProduct {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  cost: number; // For profit calculation
  sku: string;
  barcode?: string;
  
  // Inventory
  inventory: {
    quantity: number;
    lowStockThreshold: number;
    trackInventory: boolean;
    allowBackorder: boolean;
  };
  
  // Variants
  variants: [{
    name: string;
    options: string[];
    sku: string;
    price: number;
    inventory: number;
  }];
  
  // Media
  images: [{
    url: string;
    alt: string;
    isPrimary: boolean;
  }];
  
  // Organization
  category: ObjectId;
  tags: string[];
  collections: ObjectId[];
  
  // SEO
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  
  // Status
  status: 'draft' | 'active' | 'archived';
  isVisible: boolean;
  isFeatured: boolean;
  
  // Analytics
  views: number;
  sales: number;
  
  // Reviews
  rating: number;
  reviewCount: number;
  
  createdAt: Date;
  updatedAt: Date;
}
```

### 3.2 Shopping Cart & Checkout

#### Features:
- Persistent cart (saved to database for logged-in users)
- Guest checkout
- Cart abandonment tracking
- Promo code/discount system
- Tax calculation
- Shipping calculation
- Multiple shipping addresses
- Gift wrapping option
- Order notes

#### Cart Schema:
```typescript
// server/src/models/Cart.ts
interface ICart {
  user?: ObjectId;
  sessionId?: string; // For guest users
  items: [{
    product: ObjectId;
    variant?: ObjectId;
    quantity: number;
    price: number; // Price at time of adding
  }];
  
  // Discounts
  discountCode?: string;
  discountAmount: number;
  
  // Totals
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  
  expiresAt: Date;
}
```

### 3.3 Order Management

#### Features:
- Order creation & tracking
- Order status workflow
- Email notifications
- Invoice generation
- Refund processing
- Order history
- Bulk order export

#### Order Schema:
```typescript
// server/src/models/Order.ts
interface IOrder {
  orderNumber: string; // Auto-generated unique ID
  user: ObjectId;
  
  // Items
  items: [{
    product: ObjectId;
    variant?: ObjectId;
    name: string;
    sku: string;
    quantity: number;
    price: number;
    total: number;
  }];
  
  // Pricing
  subtotal: number;
  discount: number;
  discountCode?: string;
  tax: number;
  shipping: number;
  total: number;
  
  // Shipping
  shippingAddress: {
    fullName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  
  billingAddress: {
    // Same structure as shipping
  };
  
  // Payment
  payment: {
    method: 'card' | 'paypal' | 'cod';
    status: 'pending' | 'paid' | 'failed' | 'refunded';
    transactionId?: string;
    paidAt?: Date;
  };
  
  // Fulfillment
  fulfillment: {
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    trackingNumber?: string;
    carrier?: string;
    shippedAt?: Date;
    deliveredAt?: Date;
  };
  
  // Metadata
  notes?: string;
  customerNotes?: string;
  tags: string[];
  
  createdAt: Date;
  updatedAt: Date;
}
```

### 3.4 Payment Integration (Stripe)

#### Setup Steps:
1. Install Stripe SDK: `npm install stripe @stripe/stripe-js`
2. Create Stripe account and get API keys
3. Set up webhook endpoint for payment events

#### Implementation:

**Backend: `server/src/services/paymentService.ts`**
```typescript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export const createPaymentIntent = async (amount: number, currency = 'usd') => {
  return await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Convert to cents
    currency,
    automatic_payment_methods: { enabled: true },
  });
};

export const handleWebhook = async (event: Stripe.Event) => {
  switch (event.type) {
    case 'payment_intent.succeeded':
      // Update order status
      break;
    case 'payment_intent.payment_failed':
      // Handle failed payment
      break;
  }
};
```

**Frontend: `client/src/components/checkout/PaymentForm.tsx`**
```typescript
import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Implement payment form component
```

### 3.5 Inventory Management

#### Features:
- Real-time stock tracking
- Low stock alerts
- Automatic stock deduction on order
- Stock restoration on refund/cancellation
- Inventory history log
- Multi-location inventory (future)

**Backend: `server/src/services/inventoryService.ts`**
```typescript
export const reserveStock = async (productId: string, quantity: number) => {
  const product = await Product.findById(productId);
  
  if (product.inventory.quantity < quantity) {
    throw new Error('Insufficient stock');
  }
  
  product.inventory.quantity -= quantity;
  await product.save();
  
  // Log inventory change
  await InventoryLog.create({
    product: productId,
    type: 'sale',
    quantity: -quantity,
    reason: 'Order placed',
  });
};
```

---

## Phase 4: Email & Notification System

### 4.1 Email Templates

#### Required Email Templates:
1. **Welcome Email** - New user registration
2. **Email Verification** - Confirm email address
3. **Password Reset** - Reset password link
4. **Order Confirmation** - Order placed successfully
5. **Order Shipped** - Tracking information
6. **Order Delivered** - Delivery confirmation
7. **Refund Processed** - Refund notification
8. **Low Stock Alert** - Admin notification
9. **Abandoned Cart** - Reminder email
10. **Newsletter** - Marketing campaigns

#### Implementation:

**Backend: `server/src/services/emailService.ts`**
```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const sendEmail = async (to: string, template: string, data: any) => {
  const templates = {
    orderConfirmation: {
      subject: 'Order Confirmation - #{orderNumber}',
      html: generateOrderConfirmationHTML(data),
    },
    // Add more templates
  };
  
  await sgMail.send({
    to,
    from: process.env.FROM_EMAIL!,
    subject: templates[template].subject.replace('#{orderNumber}', data.orderNumber),
    html: templates[template].html,
  });
};
```

### 4.2 Push Notifications (Optional)

- Browser push notifications for order updates
- Admin notifications for new orders
- Low stock alerts

---

## Phase 5: Search & Filtering

### 5.1 Product Search

#### Features:
- Full-text search
- Autocomplete suggestions
- Search history
- Typo tolerance
- Faceted search (filters)

#### Implementation Options:
1. **MongoDB Text Search** (Basic)
2. **Algolia** (Recommended for production)
3. **Elasticsearch** (Advanced)

**Backend: `server/src/controllers/searchController.ts`**
```typescript
export const searchProducts = async (req: Request, res: Response) => {
  const { q, category, minPrice, maxPrice, sort } = req.query;
  
  const query: any = {
    status: 'active',
    isVisible: true,
  };
  
  if (q) {
    query.$text = { $search: q as string };
  }
  
  if (category) {
    query.category = category;
  }
  
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }
  
  const products = await Product.find(query)
    .sort(sort || '-createdAt')
    .limit(20);
  
  res.json(products);
};
```

---

## Phase 6: Analytics & Reporting

### 6.1 Analytics Integration

#### Tools to Integrate:
1. **Google Analytics 4** - User behavior tracking
2. **Hotjar** - Heatmaps & session recordings
3. **Mixpanel** - Product analytics
4. **Custom Analytics Dashboard** - Business metrics

#### Key Metrics to Track:
- Total revenue
- Average order value
- Conversion rate
- Cart abandonment rate
- Customer lifetime value
- Top-selling products
- Traffic sources
- User demographics

**Frontend: `client/src/lib/analytics.ts`**
```typescript
export const trackEvent = (eventName: string, properties?: any) => {
  // Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties);
  }
  
  // Custom analytics
  fetch('/api/analytics/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event: eventName, properties }),
  });
};
```

### 6.2 Admin Dashboard Analytics

**Backend: `server/src/controllers/analyticsController.ts`**
```typescript
export const getDashboardStats = async (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;
  
  const stats = {
    revenue: await calculateRevenue(startDate, endDate),
    orders: await Order.countDocuments({ createdAt: { $gte: startDate, $lte: endDate } }),
    customers: await User.countDocuments({ role: 'customer' }),
    products: await Product.countDocuments({ status: 'active' }),
    
    // Charts data
    revenueByDay: await getRevenueByDay(startDate, endDate),
    topProducts: await getTopProducts(10),
    ordersByStatus: await getOrdersByStatus(),
  };
  
  res.json(stats);
};
```

---

## Phase 7: Security Implementation

### 7.1 Security Measures

#### Essential Security Features:
1. **Rate Limiting**
   ```typescript
   import rateLimit from 'express-rate-limit';
   
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100, // Limit each IP to 100 requests per windowMs
   });
   
   app.use('/api/', limiter);
   ```

2. **CORS Configuration**
   ```typescript
   import cors from 'cors';
   
   app.use(cors({
     origin: process.env.ALLOWED_ORIGINS?.split(','),
     credentials: true,
   }));
   ```

3. **Helmet.js** - Security headers
   ```typescript
   import helmet from 'helmet';
   app.use(helmet());
   ```

4. **Input Validation** - Using Zod
   ```typescript
   import { z } from 'zod';
   
   const productSchema = z.object({
     name: z.string().min(3).max(100),
     price: z.number().positive(),
     // ... more validation
   });
   ```

5. **SQL Injection Prevention** - MongoDB parameterized queries
6. **XSS Protection** - Sanitize user inputs
7. **CSRF Protection** - CSRF tokens for forms
8. **HTTPS Only** - Enforce SSL
9. **Secure Cookies** - httpOnly, secure, sameSite flags
10. **Data Encryption** - Encrypt sensitive data at rest

### 7.2 PCI Compliance

- Never store credit card details
- Use Stripe for payment processing
- Implement SSL/TLS
- Regular security audits
- Access control & logging

---

## Phase 8: Performance Optimization

### 8.1 Frontend Optimization

1. **Next.js Optimizations**
   - Image optimization (next/image)
   - Code splitting
   - Static generation (SSG) for product pages
   - Incremental Static Regeneration (ISR)
   - API route caching

2. **Asset Optimization**
   - Compress images (WebP format)
   - Lazy loading
   - CDN for static assets (Vercel Edge Network)
   - Font optimization

3. **Caching Strategy**
   ```typescript
   // client/src/app/products/[slug]/page.tsx
   export const revalidate = 3600; // Revalidate every hour
   ```

### 8.2 Backend Optimization

1. **Database Indexing**
   ```typescript
   // server/src/models/Product.ts
   productSchema.index({ name: 'text', description: 'text' });
   productSchema.index({ category: 1, status: 1 });
   productSchema.index({ slug: 1 }, { unique: true });
   ```

2. **Query Optimization**
   - Use select() to limit fields
   - Implement pagination
   - Use lean() for read-only queries

3. **Caching with Redis**
   ```typescript
   import Redis from 'ioredis';
   const redis = new Redis(process.env.REDIS_URL);
   
   export const getCachedProducts = async () => {
     const cached = await redis.get('products:featured');
     if (cached) return JSON.parse(cached);
     
     const products = await Product.find({ isFeatured: true });
     await redis.setex('products:featured', 3600, JSON.stringify(products));
     return products;
   };
   ```

---

## Phase 9: Vercel Deployment Configuration

### 9.1 Backend Deployment (Serverless Functions)

**File: `server/vercel.json`**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/index.ts"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

**Update: `server/src/index.ts`**
```typescript
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// For Vercel serverless
export default app;

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
```

### 9.2 Frontend Deployment

**File: `client/vercel.json`**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://api.your-domain.vercel.app/api/:path*"
    }
  ]
}
```

**Update: `client/next.config.js`**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // For Cloudinary images
    formats: ['image/webp', 'image/avif'],
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  
  // Performance
  swcMinify: true,
  
  // Headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

### 9.3 Deployment Steps

#### Step 1: Prepare MongoDB Atlas
1. Create MongoDB Atlas account
2. Create a new cluster
3. Whitelist Vercel IPs (or allow all: 0.0.0.0/0)
4. Create database user
5. Get connection string

#### Step 2: Set Up Vercel Projects

**Backend Deployment:**
```bash
cd server
vercel --prod
```

**Frontend Deployment:**
```bash
cd client
vercel --prod
```

#### Step 3: Configure Environment Variables in Vercel

1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add all environment variables from .env files
5. Separate variables for Production, Preview, and Development

#### Step 4: Custom Domain Setup

1. Add custom domain in Vercel
2. Update DNS records:
   - `A` record: `76.76.21.21`
   - `CNAME` record for www: `cname.vercel-dns.com`
3. Enable HTTPS (automatic with Vercel)

#### Step 5: Set Up Webhooks

**Stripe Webhook:**
1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://api.your-domain.vercel.app/api/webhooks/stripe`
3. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
4. Copy webhook secret to environment variables

---

## Phase 10: Testing & Quality Assurance

### 10.1 Testing Strategy

#### Unit Tests
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

**Example: `server/src/__tests__/auth.test.ts`**
```typescript
import { register, login } from '../controllers/authController';

describe('Auth Controller', () => {
  test('should register new user', async () => {
    // Test implementation
  });
  
  test('should login existing user', async () => {
    // Test implementation
  });
});
```

#### Integration Tests
- Test API endpoints
- Test payment flow
- Test order creation

#### E2E Tests (Playwright/Cypress)
```bash
npm install --save-dev @playwright/test
```

**Example: `client/e2e/checkout.spec.ts`**
```typescript
import { test, expect } from '@playwright/test';

test('complete checkout flow', async ({ page }) => {
  await page.goto('/products');
  await page.click('text=Add to Cart');
  await page.click('text=Checkout');
  // ... complete checkout
  await expect(page).toHaveURL(/\/order-confirmation/);
});
```

### 10.2 Pre-Launch Checklist

- [ ] All environment variables configured
- [ ] Database indexes created
- [ ] Payment gateway tested (test mode)
- [ ] Email templates tested
- [ ] SSL certificate active
- [ ] Custom domain configured
- [ ] Analytics tracking verified
- [ ] Error monitoring set up (Sentry)
- [ ] Backup strategy implemented
- [ ] Load testing completed
- [ ] Security audit passed
- [ ] Mobile responsiveness verified
- [ ] Browser compatibility tested
- [ ] SEO optimization completed
- [ ] Legal pages added (Privacy, Terms, Refund)
- [ ] Admin panel access configured

---

## Phase 11: Post-Deployment

### 11.1 Monitoring

#### Error Tracking (Sentry)
```bash
npm install @sentry/nextjs @sentry/node
```

**Frontend: `client/sentry.client.config.js`**
```javascript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

#### Uptime Monitoring
- Use Vercel Analytics
- Set up UptimeRobot or Pingdom
- Configure alerts for downtime

#### Performance Monitoring
- Vercel Analytics
- Google PageSpeed Insights
- Web Vitals tracking

### 11.2 Backup Strategy

1. **Database Backups**
   - MongoDB Atlas automatic backups
   - Daily snapshots
   - Point-in-time recovery

2. **Code Backups**
   - Git repository (GitHub/GitLab)
   - Vercel deployment history

3. **Media Backups**
   - Cloudinary automatic backups
   - Regular exports

### 11.3 Maintenance Plan

#### Weekly Tasks:
- Review error logs
- Check inventory levels
- Review abandoned carts
- Analyze sales data

#### Monthly Tasks:
- Security updates
- Performance optimization
- Database cleanup
- Backup verification
- Analytics review

#### Quarterly Tasks:
- Feature updates
- User feedback implementation
- A/B testing
- SEO audit

---

## Phase 12: Additional Features (Future Enhancements)

### 12.1 Customer Features
- Wishlist functionality
- Product comparison
- Customer reviews & ratings
- Loyalty program
- Referral system
- Gift cards
- Subscription products
- Live chat support
- AR product preview (furniture visualization)

### 12.2 Admin Features
- Bulk product import/export
- Advanced reporting
- Customer segmentation
- Marketing automation
- A/B testing tools
- Multi-currency support
- Multi-language support
- Vendor management (marketplace)

### 12.3 Marketing Features
- Email marketing campaigns
- SMS marketing
- Push notifications
- Social media integration
- Influencer tracking
- Affiliate program
- Blog/Content management
- SEO tools

---

## Phase 13: Compliance & Legal

### 13.1 Required Legal Pages

1. **Privacy Policy**
   - Data collection practices
   - Cookie usage
   - Third-party services
   - User rights (GDPR)

2. **Terms of Service**
   - User agreements
   - Prohibited activities
   - Liability limitations

3. **Refund Policy**
   - Return conditions
   - Refund timeline
   - Process details

4. **Shipping Policy**
   - Delivery times
   - Shipping costs
   - International shipping

5. **Cookie Policy**
   - Types of cookies used
   - Cookie management

### 13.2 Compliance Requirements

- **GDPR** (EU) - Data protection
- **CCPA** (California) - Consumer privacy
- **PCI DSS** - Payment card security
- **ADA** - Accessibility compliance
- **CAN-SPAM** - Email marketing

---

## Phase 14: Cost Estimation

### 14.1 Monthly Costs

| Service | Tier | Estimated Cost |
|---------|------|----------------|
| Vercel (Frontend) | Pro | $20/month |
| Vercel (Backend) | Pro | $20/month |
| MongoDB Atlas | M10 | $57/month |
| Cloudinary | Plus | $89/month |
| SendGrid | Essentials | $20/month |
| Stripe | Pay-as-you-go | 2.9% + $0.30/transaction |
| Upstash Redis | Pay-as-you-go | ~$10/month |
| Domain | - | $12/year |
| SSL Certificate | - | Free (Vercel) |
| **Total** | | **~$228/month** |

### 14.2 Scaling Costs

As traffic grows:
- Increase MongoDB cluster size
- Upgrade Vercel plan
- Add CDN (Cloudflare)
- Increase email quota

---

## Summary

This comprehensive plan covers:
✅ Authentication & Authorization (JWT, OAuth, MFA, RBAC)
✅ E-commerce Core (Products, Cart, Checkout, Orders)
✅ Payment Integration (Stripe)
✅ Inventory Management
✅ Email Notifications
✅ Search & Filtering
✅ Analytics & Reporting
✅ Security (Rate limiting, CORS, Encryption)
✅ Performance Optimization
✅ Vercel Deployment
✅ Testing & QA
✅ Monitoring & Maintenance
✅ Legal Compliance
✅ Future Enhancements

**Next Steps:**
1. Review and approve this plan
2. Set up third-party accounts (Stripe, SendGrid, Cloudinary)
3. Implement features phase by phase
4. Test thoroughly in staging environment
5. Deploy to production
6. Monitor and iterate

**Estimated Timeline:** 8-12 weeks for full implementation
