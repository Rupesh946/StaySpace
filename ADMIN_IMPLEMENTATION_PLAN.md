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
