# StaySpace Deployment Guide for Vercel

This guide will help you deploy StaySpace to Vercel with all e-commerce features (excluding payment gateway for now).

## 📋 Prerequisites

Before deploying, ensure you have:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- [Vercel](https://vercel.com/) account
- [Git](https://git-scm.com/) installed

---

## 🚀 Part 1: MongoDB Atlas Setup

### 1. Create MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign in or create a new account
3. Create a new project (e.g., "StaySpace")
4. Click "Build a Database"
5. Choose **M0 FREE** tier
6. Select your preferred cloud provider and region
7. Click "Create Cluster"

### 2. Configure Database Access

1. Go to **Database Access** in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username and strong password (save these!)
5. Set user privileges to "Read and write to any database"
6. Click "Add User"

### 3. Configure Network Access

1. Go to **Network Access** in the left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for Vercel)
4. Confirm by clicking "Confirm"

### 4. Get Connection String

1. Go to **Database** in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `stayspace`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/stayspace?retryWrites=true&w=majority
```

---

## 🔧 Part 2: Local Testing

### 1. Install Dependencies

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 2. Configure Environment Variables

**Backend (`server/.env`):**
```env
MONGO_URI=your-mongodb-atlas-connection-string
MONGODB_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
JWT_EXPIRE=30d
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

**Frontend (`client/.env.local`):**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Test Locally

```bash
# Terminal 1 - Start Backend
cd server
npm run dev

# Terminal 2 - Start Frontend
cd client
npm run dev
```

Visit `http://localhost:3000` to test your application.

---

## ☁️ Part 3: Deploy to Vercel

### Option A: Deploy via Vercel CLI (Recommended)

#### 1. Install Vercel CLI

```bash
npm install -g vercel
```

#### 2. Login to Vercel

```bash
vercel login
```

#### 3. Deploy Backend

```bash
cd server
vercel --prod
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- Project name? **stayspace-api** (or your choice)
- Directory? **./** (press Enter)
- Override settings? **N**

**Important:** Copy the deployment URL (e.g., `https://stayspace-api.vercel.app`)

#### 4. Add Backend Environment Variables

```bash
cd server
vercel env add MONGO_URI
# Paste your MongoDB Atlas connection string

vercel env add MONGODB_URI
# Paste the same connection string

vercel env add JWT_SECRET
# Enter a strong secret (min 32 characters)

vercel env add CLIENT_URL
# Enter your frontend URL (we'll update this after frontend deployment)

vercel env add NODE_ENV
# Enter: production
```

Or add them via Vercel Dashboard:
1. Go to your project on Vercel
2. Settings → Environment Variables
3. Add each variable for **Production**, **Preview**, and **Development**

#### 5. Deploy Frontend

```bash
cd ../client
vercel --prod
```

Follow the prompts similar to backend deployment.

**Important:** Copy the deployment URL (e.g., `https://stayspace.vercel.app`)

#### 6. Add Frontend Environment Variables

```bash
cd client
vercel env add NEXT_PUBLIC_API_URL
# Enter: https://your-backend-url.vercel.app/api

vercel env add NEXT_PUBLIC_SITE_URL
# Enter: https://your-frontend-url.vercel.app
```

#### 7. Update Backend CLIENT_URL

```bash
cd ../server
vercel env add CLIENT_URL
# Enter: https://your-frontend-url.vercel.app

# Redeploy backend with updated env
vercel --prod
```

### Option B: Deploy via Vercel Dashboard

#### 1. Push Code to GitHub

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/yourusername/stayspace.git
git branch -M main
git push -u origin main
```

#### 2. Import to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure for **Backend**:
   - **Project Name:** stayspace-api
   - **Root Directory:** `server`
   - **Framework Preset:** Other
   - **Build Command:** Leave empty
   - **Output Directory:** Leave empty
   - Add environment variables (see above)
5. Click "Deploy"

6. Repeat for **Frontend**:
   - **Project Name:** stayspace
   - **Root Directory:** `client`
   - **Framework Preset:** Next.js
   - Add environment variables (see above)
7. Click "Deploy"

---

## 🔐 Part 4: Create Admin User

### 1. Register a User

1. Go to your deployed frontend URL
2. Click "Sign Up" or "Register"
3. Create an account with your email

### 2. Update User Role in MongoDB

#### Option A: Using MongoDB Atlas Dashboard

1. Go to MongoDB Atlas
2. Click "Browse Collections"
3. Find the `users` collection
4. Find your user document
5. Click "Edit Document"
6. Change `role` from `"customer"` to `"admin"`
7. Click "Update"

#### Option B: Using MongoDB Compass

1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect using your connection string
3. Navigate to `stayspace` database → `users` collection
4. Find your user
5. Edit the document and change `role` to `"admin"`
6. Save

### 3. Verify Admin Access

1. Log out and log back in
2. Navigate to `/admin` on your frontend
3. You should now have access to the admin panel

---

## ✅ Part 5: Verify Deployment

### Test These Endpoints:

**Backend Health Check:**
```
https://your-backend-url.vercel.app/
https://your-backend-url.vercel.app/api/health
```

**Frontend:**
```
https://your-frontend-url.vercel.app/
```

### Test Core Features:

1. ✅ User Registration
2. ✅ User Login
3. ✅ Browse Products
4. ✅ Add to Cart
5. ✅ Create Order (COD)
6. ✅ View Orders
7. ✅ Admin Dashboard (if admin user)
8. ✅ Admin: View Orders
9. ✅ Admin: Update Order Status

---

## 🎨 Part 6: Custom Domain (Optional)

### 1. Add Custom Domain

1. Go to your Vercel project
2. Settings → Domains
3. Add your domain (e.g., `stayspace.com`)
4. Follow DNS configuration instructions

### 2. Update Environment Variables

Update `CLIENT_URL` in backend and `NEXT_PUBLIC_SITE_URL` in frontend to use your custom domain.

---

## 🔧 Troubleshooting

### Backend Issues

**Error: "MongoDB connection failed"**
- Verify your MongoDB Atlas connection string
- Check if IP whitelist includes `0.0.0.0/0`
- Ensure database user has correct permissions

**Error: "Not authorized, token failed"**
- Check if `JWT_SECRET` is set in environment variables
- Ensure it's the same secret used for token generation

**Error: "CORS error"**
- Verify `CLIENT_URL` matches your frontend URL exactly
- Check CORS configuration in `server/src/index.ts`

### Frontend Issues

**Error: "Cannot connect to server"**
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check if backend is deployed and running
- Test backend health endpoint directly

**Error: "User not found" after login**
- Clear browser localStorage
- Check if user exists in MongoDB
- Verify token is being sent in requests

### Deployment Issues

**Build fails on Vercel**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify TypeScript has no errors locally

**Environment variables not working**
- Ensure variables are added for correct environment (Production/Preview/Development)
- Redeploy after adding environment variables
- Check variable names match exactly (case-sensitive)

---

## 📊 Monitoring & Maintenance

### 1. Vercel Analytics

Enable Vercel Analytics in your project settings to track:
- Page views
- Performance metrics
- Error rates

### 2. MongoDB Monitoring

Use MongoDB Atlas monitoring to track:
- Database connections
- Query performance
- Storage usage

### 3. Regular Maintenance

- **Weekly:** Check error logs in Vercel
- **Monthly:** Review database performance
- **Quarterly:** Update dependencies

---

## 🚀 Next Steps

Now that your application is deployed, you can:

1. **Add Payment Gateway** (Stripe, PayPal, etc.)
2. **Implement Email Notifications** (SendGrid, Resend)
3. **Add Product Reviews**
4. **Implement Wishlist**
5. **Add Search Functionality** (Algolia)
6. **Set up Analytics** (Google Analytics)
7. **Add Image Upload** (Cloudinary)
8. **Implement Caching** (Redis/Upstash)

---

## 📝 Important URLs

Save these for reference:

- **Frontend:** https://your-frontend.vercel.app
- **Backend API:** https://your-backend.vercel.app/api
- **MongoDB Atlas:** https://cloud.mongodb.com
- **Vercel Dashboard:** https://vercel.com/dashboard

---

## 🆘 Support

If you encounter issues:

1. Check Vercel deployment logs
2. Check MongoDB Atlas logs
3. Review browser console for errors
4. Check Network tab in browser DevTools

---

## 🎉 Congratulations!

Your StaySpace e-commerce platform is now live on Vercel!

**What you've deployed:**
- ✅ Full authentication system (register, login, JWT)
- ✅ Role-based access control (customer, admin, manager, support)
- ✅ Product management (CRUD, search, filtering)
- ✅ Shopping cart functionality
- ✅ Order management system
- ✅ Inventory tracking
- ✅ Admin dashboard with analytics
- ✅ User profile management
- ✅ Address management
- ✅ Order tracking
- ✅ COD payment support

**Ready to add later:**
- 💳 Payment gateway integration (Stripe)
- 📧 Email notifications
- 🔍 Advanced search (Algolia)
- 📸 Image uploads (Cloudinary)
- ⚡ Caching (Redis)
- 📊 Advanced analytics
