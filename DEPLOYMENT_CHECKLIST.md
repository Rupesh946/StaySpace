# 🚀 StaySpace - Deployment Checklist

Use this checklist to ensure everything is ready for deployment.

---

## ✅ Pre-Deployment Checklist

### 1. Code Implementation
- [x] User model with authentication
- [x] Product model with inventory
- [x] Order model with workflow
- [x] Cart model with expiration
- [x] Auth controller (register, login, profile)
- [x] Product controller (CRUD, search, filter)
- [x] Order controller (create, track, manage)
- [x] Admin controller (dashboard, analytics)
- [x] Auth middleware (JWT, RBAC)
- [x] All API routes configured
- [x] Server setup with Vercel compatibility
- [x] Frontend AuthContext updated with role
- [x] Environment files created

### 2. Configuration Files
- [x] `server/vercel.json` created
- [x] `client/vercel.json` created
- [x] `server/.env.example` created
- [x] `client/.env.example` created
- [x] `server/.gitignore` created
- [x] `client/.gitignore` created

### 3. Documentation
- [x] README.md with project overview
- [x] DEPLOYMENT_GUIDE.md with step-by-step instructions
- [x] ADMIN_IMPLEMENTATION_PLAN.md with full feature plan
- [x] IMPLEMENTATION_SUMMARY.md with what's been built

---

## 📝 Before Deploying

### Step 1: Install Dependencies
```bash
# Backend
cd server
npm install

# Frontend
cd client
npm install
```

### Step 2: Set Up MongoDB Atlas
- [ ] Create MongoDB Atlas account
- [ ] Create new cluster (M0 FREE tier)
- [ ] Create database user
- [ ] Whitelist all IPs (0.0.0.0/0)
- [ ] Get connection string
- [ ] Test connection locally

### Step 3: Configure Local Environment

**Backend (`server/.env`):**
```env
MONGO_URI=your-mongodb-atlas-connection-string
MONGODB_URI=your-mongodb-atlas-connection-string
JWT_SECRET=generate-a-strong-secret-min-32-chars
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

### Step 4: Test Locally
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend  
cd client
npm run dev
```

**Test these features:**
- [ ] Visit http://localhost:3000
- [ ] Register a new user
- [ ] Login with credentials
- [ ] Browse products
- [ ] Add product to cart
- [ ] Create an order (COD)
- [ ] View order history
- [ ] Check backend API at http://localhost:5000

---

## 🌐 Deployment Steps

### Option A: Vercel CLI (Recommended)

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
- [ ] Deployment successful
- [ ] Copy backend URL: ________________

#### 4. Add Backend Environment Variables
```bash
vercel env add MONGO_URI
vercel env add MONGODB_URI
vercel env add JWT_SECRET
vercel env add CLIENT_URL
vercel env add NODE_ENV
```

Or via Vercel Dashboard:
- [ ] Go to project settings
- [ ] Add all environment variables
- [ ] Set for Production, Preview, Development

#### 5. Deploy Frontend
```bash
cd ../client
vercel --prod
```
- [ ] Deployment successful
- [ ] Copy frontend URL: ________________

#### 6. Add Frontend Environment Variables
```bash
vercel env add NEXT_PUBLIC_API_URL
vercel env add NEXT_PUBLIC_SITE_URL
```

#### 7. Update Backend CLIENT_URL
```bash
cd ../server
vercel env add CLIENT_URL
# Enter your frontend URL
vercel --prod
```
- [ ] Backend redeployed with correct CORS

---

## 🔐 Post-Deployment Setup

### 1. Create Admin User

**Register via frontend:**
- [ ] Go to your deployed frontend URL
- [ ] Click "Sign Up" / "Register"
- [ ] Create account with your email

**Update role in MongoDB:**
- [ ] Go to MongoDB Atlas
- [ ] Click "Browse Collections"
- [ ] Find `users` collection
- [ ] Find your user document
- [ ] Edit: Change `role` from `"customer"` to `"admin"`
- [ ] Save changes

**Verify admin access:**
- [ ] Log out and log back in
- [ ] Navigate to `/admin`
- [ ] Confirm admin panel access

### 2. Verify Deployment

**Test backend endpoints:**
- [ ] https://your-backend.vercel.app/
- [ ] https://your-backend.vercel.app/api/health
- [ ] https://your-backend.vercel.app/api/products

**Test frontend:**
- [ ] Homepage loads
- [ ] Products display
- [ ] User can register
- [ ] User can login
- [ ] Cart functionality works
- [ ] Order creation works
- [ ] Admin panel accessible (for admin users)

---

## 🎯 Feature Testing Checklist

### Customer Features
- [ ] User Registration
- [ ] User Login
- [ ] Browse Products
- [ ] Search Products
- [ ] Filter Products by Category
- [ ] View Product Details
- [ ] Add to Cart
- [ ] View Cart
- [ ] Update Cart Quantities
- [ ] Remove from Cart
- [ ] Checkout Process
- [ ] Add Shipping Address
- [ ] Place Order (COD)
- [ ] View Order History
- [ ] View Order Details
- [ ] Track Order Status
- [ ] Update Profile
- [ ] Add Multiple Addresses

### Admin Features
- [ ] Access Admin Dashboard
- [ ] View Dashboard Statistics
- [ ] View Total Revenue
- [ ] View Recent Orders
- [ ] View Low Stock Products
- [ ] View All Orders
- [ ] Update Order Status
- [ ] Add Tracking Number
- [ ] Mark Order as Shipped
- [ ] Mark Order as Delivered
- [ ] Cancel Order (restores inventory)
- [ ] View All Users
- [ ] Update User Roles
- [ ] View All Products
- [ ] Create New Product
- [ ] Edit Product
- [ ] Delete Product
- [ ] View Product Analytics

---

## 🐛 Troubleshooting

### Common Issues

**"Cannot connect to server"**
- [ ] Check backend is deployed
- [ ] Verify NEXT_PUBLIC_API_URL is correct
- [ ] Check backend health endpoint
- [ ] Review Vercel deployment logs

**"MongoDB connection failed"**
- [ ] Verify connection string is correct
- [ ] Check IP whitelist includes 0.0.0.0/0
- [ ] Confirm database user credentials
- [ ] Test connection from MongoDB Compass

**"Not authorized, token failed"**
- [ ] Verify JWT_SECRET is set
- [ ] Check token is being sent in headers
- [ ] Clear browser localStorage and login again

**"CORS error"**
- [ ] Verify CLIENT_URL matches frontend URL exactly
- [ ] Check CORS configuration in server/src/index.ts
- [ ] Redeploy backend after updating CLIENT_URL

**Admin panel not accessible**
- [ ] Confirm user role is "admin" in database
- [ ] Log out and log back in
- [ ] Check browser console for errors
- [ ] Verify /admin route exists in frontend

---

## 📊 Monitoring

### After Deployment

**Daily (First Week):**
- [ ] Check Vercel deployment logs
- [ ] Monitor error rates
- [ ] Review user registrations
- [ ] Check order creation

**Weekly:**
- [ ] Review MongoDB Atlas metrics
- [ ] Check database size
- [ ] Monitor API response times
- [ ] Review low stock products

**Monthly:**
- [ ] Update dependencies
- [ ] Review security
- [ ] Backup database
- [ ] Analyze user behavior

---

## 🎉 Success Criteria

Your deployment is successful when:
- [x] Backend is live and responding
- [x] Frontend is live and accessible
- [x] Users can register and login
- [x] Products are displayed
- [x] Orders can be created
- [x] Admin panel is accessible
- [x] Inventory updates on orders
- [x] No console errors
- [x] All API endpoints working
- [x] MongoDB connection stable

---

## 📞 Support Resources

- **Deployment Guide:** [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **Implementation Summary:** [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)
- **README:** [README.md](./README.md)
- **Vercel Docs:** https://vercel.com/docs
- **MongoDB Atlas Docs:** https://docs.atlas.mongodb.com
- **Next.js Docs:** https://nextjs.org/docs

---

## 🚀 Next Steps After Deployment

1. **Add Payment Gateway**
   - Integrate Stripe
   - Set up webhooks
   - Test payment flow

2. **Email Notifications**
   - Set up SendGrid/Resend
   - Create email templates
   - Send order confirmations

3. **Enhanced Features**
   - Product reviews
   - Advanced search (Algolia)
   - Image uploads (Cloudinary)
   - Analytics (Google Analytics)

4. **Performance**
   - Add caching (Redis/Upstash)
   - Optimize images
   - Set up CDN

5. **Marketing**
   - SEO optimization
   - Social media integration
   - Email marketing
   - Analytics tracking

---

**Remember:** Save your deployment URLs and credentials securely!

**Backend URL:** ____________________________

**Frontend URL:** ____________________________

**MongoDB Connection:** ____________________________

**Admin Email:** ____________________________

---

✅ **You're ready to deploy! Follow the steps above and check them off as you go.**
