# 🚀 StaySpace Deployment Guide
## Frontend on Vercel + Backend on Render

Your StaySpace application is **100% ready** to deploy! This guide will walk you through deploying:
- **Frontend** → Vercel (Best for Next.js)
- **Backend** → Render (Free tier available, always-on)

---

## ✅ Pre-Deployment Checklist

Before deploying, make sure you have:
- [x] All code implemented ✅
- [x] MongoDB Atlas account (or create one - FREE)
- [x] GitHub account
- [x] Vercel account (sign up with GitHub - FREE)
- [x] Render account (sign up with GitHub - FREE)

**Estimated Time:** 30-45 minutes

---

## 📋 Part 1: Prepare Your Code

### Step 1: Push to GitHub

If you haven't already, push your code to GitHub:

```bash
# Navigate to project root
cd StaySpace

# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for deployment"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/stayspace.git
git branch -M main
git push -u origin main
```

### Step 2: Verify File Structure

Make sure you have these files:

```
StaySpace/
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── index.ts
│   ├── .env.example          ✅
│   ├── .gitignore            ✅
│   ├── package.json          ✅
│   └── vercel.json           ✅ (We'll update this for Render)
│
└── client/
    ├── src/
    ├── .env.example          ✅
    ├── .gitignore            ✅
    ├── package.json          ✅
    └── vercel.json           ✅
```

---

## 🗄️ Part 2: Set Up MongoDB Atlas

### Step 1: Create MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Click **"Create"** → **"Shared"** (FREE M0 tier)
4. Choose your cloud provider and region (closest to you)
5. Cluster Name: `StaySpace` (or any name)
6. Click **"Create Cluster"** (takes 3-5 minutes)

### Step 2: Create Database User

1. Click **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Authentication Method: **Password**
4. Username: `stayspace_user` (or your choice)
5. Password: **Generate a strong password** (SAVE THIS!)
6. Database User Privileges: **Read and write to any database**
7. Click **"Add User"**

### Step 3: Whitelist All IPs

1. Click **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

### Step 4: Get Connection String

1. Click **"Database"** (left sidebar)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Driver: **Node.js**, Version: **5.5 or later**
5. Copy the connection string:
   ```
   mongodb+srv://stayspace_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<password>` with your actual password
7. Add database name: `stayspace`
   ```
   mongodb+srv://stayspace_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/stayspace?retryWrites=true&w=majority
   ```

**SAVE THIS CONNECTION STRING!** You'll need it for deployment.

---

## 🖥️ Part 3: Deploy Backend to Render

### Step 1: Create Render Account

1. Go to [Render.com](https://render.com)
2. Click **"Get Started"**
3. Sign up with **GitHub** (easiest)
4. Authorize Render to access your repositories

### Step 2: Create New Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: **stayspace**
3. Configure the service:

**Basic Settings:**
- **Name:** `stayspace-api` (or your choice)
- **Region:** Choose closest to you
- **Branch:** `main`
- **Root Directory:** `server`
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Instance Type:**
- Select **"Free"** (or paid if you prefer)

### Step 3: Add Environment Variables

Scroll down to **"Environment Variables"** and add these:

Click **"Add Environment Variable"** for each:

| Key | Value |
|-----|-------|
| `MONGO_URI` | Your MongoDB Atlas connection string |
| `MONGODB_URI` | Same MongoDB Atlas connection string |
| `JWT_SECRET` | Generate a strong secret (min 32 characters) |
| `JWT_EXPIRE` | `30d` |
| `NODE_ENV` | `production` |
| `CLIENT_URL` | `https://your-app.vercel.app` (we'll update this after frontend deployment) |
| `PORT` | `5000` |

**Generate JWT Secret:**
```bash
# Windows PowerShell
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((New-Guid).ToString() + (New-Guid).ToString()))

# Or use this online: https://randomkeygen.com/
# Choose "CodeIgniter Encryption Keys" (256-bit)
```

### Step 4: Deploy Backend

1. Click **"Create Web Service"**
2. Wait for deployment (3-5 minutes)
3. Once deployed, you'll get a URL like: `https://stayspace-api.onrender.com`

**SAVE THIS URL!** This is your backend API URL.

### Step 5: Verify Backend Deployment

Visit your Render URL:
```
https://stayspace-api.onrender.com
```

You should see:
```json
{
  "message": "StaySpace API is running",
  "version": "1.0.0",
  "endpoints": {...}
}
```

✅ **Backend deployed successfully!**

---

## 🌐 Part 4: Deploy Frontend to Vercel

### Step 1: Create Vercel Account

1. Go to [Vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Sign up with **GitHub** (easiest)
4. Authorize Vercel to access your repositories

### Step 2: Import Project

1. Click **"Add New..."** → **"Project"**
2. Find your **stayspace** repository
3. Click **"Import"**

### Step 3: Configure Project

**Framework Preset:** Next.js (auto-detected)

**Root Directory:** Click **"Edit"** → Select **"client"**

**Build Settings:**
- Build Command: `npm run build` (auto-filled)
- Output Directory: `.next` (auto-filled)
- Install Command: `npm install` (auto-filled)

### Step 4: Add Environment Variables

Click **"Environment Variables"** and add:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_API_URL` | `https://stayspace-api.onrender.com/api` |
| `NEXT_PUBLIC_SITE_URL` | Leave empty for now (we'll add after deployment) |

### Step 5: Deploy Frontend

1. Click **"Deploy"**
2. Wait for deployment (2-3 minutes)
3. Once deployed, you'll get a URL like: `https://stayspace-abc123.vercel.app`

**SAVE THIS URL!** This is your frontend URL.

### Step 6: Update Environment Variables

**Update Frontend:**
1. Go to Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Edit `NEXT_PUBLIC_SITE_URL` → Add your Vercel URL
4. Redeploy: Deployments → Latest → ⋯ → Redeploy

**Update Backend:**
1. Go to Render Dashboard → Your Web Service
2. Environment → Edit `CLIENT_URL`
3. Change to your Vercel URL: `https://stayspace-abc123.vercel.app`
4. Save Changes (auto-redeploys)

---

## 🔐 Part 5: Create Admin User

### Step 1: Register via Frontend

1. Go to your Vercel URL: `https://stayspace-abc123.vercel.app`
2. Click **"Sign Up"** or **"Register"**
3. Create an account with your email

### Step 2: Update User Role in MongoDB

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click **"Browse Collections"**
3. Database: `stayspace` → Collection: `users`
4. Find your user document
5. Click **"Edit Document"** (pencil icon)
6. Change `"role": "customer"` to `"role": "admin"`
7. Click **"Update"**

### Step 3: Verify Admin Access

1. Log out from your frontend
2. Log back in
3. Navigate to `/admin`
4. You should now see the admin dashboard! 🎉

---

## ✅ Part 6: Verify Deployment

### Test Backend Endpoints

```bash
# Health check
curl https://stayspace-api.onrender.com/api/health

# Get products
curl https://stayspace-api.onrender.com/api/products
```

### Test Frontend Features

Visit your Vercel URL and test:
- [ ] Homepage loads
- [ ] Can register new user
- [ ] Can login
- [ ] Can browse products
- [ ] Can add to cart
- [ ] Can create order
- [ ] Can view order history
- [ ] Admin can access `/admin` dashboard

---

## 🎨 Part 7: Custom Domain (Optional)

### Add Custom Domain to Vercel

1. Go to Vercel Dashboard → Your Project
2. Settings → Domains
3. Add your domain (e.g., `stayspace.com`)
4. Follow DNS configuration instructions
5. Wait for DNS propagation (5-30 minutes)

### Add Custom Domain to Render

1. Go to Render Dashboard → Your Web Service
2. Settings → Custom Domain
3. Add your API subdomain (e.g., `api.stayspace.com`)
4. Follow DNS configuration instructions

### Update Environment Variables

After adding custom domains, update:

**Vercel (Frontend):**
- `NEXT_PUBLIC_API_URL` → `https://api.stayspace.com/api`
- `NEXT_PUBLIC_SITE_URL` → `https://stayspace.com`

**Render (Backend):**
- `CLIENT_URL` → `https://stayspace.com`

---

## 🔧 Troubleshooting

### Backend Issues

**"Application failed to respond"**
- Check Render logs: Dashboard → Logs
- Verify MongoDB connection string is correct
- Check all environment variables are set

**"MongoDB connection failed"**
- Verify IP whitelist includes 0.0.0.0/0
- Check username/password in connection string
- Ensure database name is included in URI

**"CORS error"**
- Verify `CLIENT_URL` matches your Vercel URL exactly
- Check CORS configuration in `server/src/index.ts`

### Frontend Issues

**"Cannot connect to server"**
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check backend is deployed and running
- Test backend health endpoint directly

**Build fails**
- Check Vercel build logs
- Verify all dependencies are in `package.json`
- Test build locally: `npm run build`

**Environment variables not working**
- Redeploy after adding/changing variables
- Check variable names match exactly (case-sensitive)
- Ensure `NEXT_PUBLIC_` prefix for client-side variables

---

## 📊 Monitoring & Maintenance

### Render (Backend)

**Free Tier Limitations:**
- Spins down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- 750 hours/month free

**Upgrade to Paid ($7/month):**
- Always-on (no spin-down)
- Faster performance
- More resources

**Monitor:**
- Dashboard → Metrics
- Dashboard → Logs
- Set up alerts for errors

### Vercel (Frontend)

**Free Tier:**
- Unlimited deployments
- 100GB bandwidth/month
- Automatic HTTPS
- Global CDN

**Monitor:**
- Analytics (enable in settings)
- Deployment logs
- Error tracking

### MongoDB Atlas

**Free Tier (M0):**
- 512MB storage
- Shared RAM
- Shared vCPU

**Monitor:**
- Metrics tab
- Performance Advisor
- Set up alerts for storage/connections

---

## 💰 Cost Breakdown

### Free Tier (Recommended for Testing)

| Service | Plan | Cost | Limitations |
|---------|------|------|-------------|
| Render (Backend) | Free | $0 | Spins down after 15 min |
| Vercel (Frontend) | Hobby | $0 | 100GB bandwidth/month |
| MongoDB Atlas | M0 | $0 | 512MB storage |
| **Total** | | **$0/month** | |

### Production Tier (Recommended for Live Site)

| Service | Plan | Cost | Benefits |
|---------|------|------|----------|
| Render (Backend) | Starter | $7/month | Always-on, faster |
| Vercel (Frontend) | Pro | $20/month | More bandwidth, analytics |
| MongoDB Atlas | M10 | $57/month | Dedicated cluster |
| **Total** | | **$84/month** | |

---

## 🚀 Deployment Checklist

### Pre-Deployment
- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] IP whitelist configured (0.0.0.0/0)
- [ ] Connection string saved

### Backend (Render)
- [ ] Render account created
- [ ] Web service created
- [ ] Root directory set to `server`
- [ ] All environment variables added
- [ ] Deployed successfully
- [ ] Backend URL saved
- [ ] Health endpoint tested

### Frontend (Vercel)
- [ ] Vercel account created
- [ ] Project imported
- [ ] Root directory set to `client`
- [ ] Environment variables added
- [ ] Deployed successfully
- [ ] Frontend URL saved
- [ ] Homepage loads

### Post-Deployment
- [ ] Updated `CLIENT_URL` in Render
- [ ] Updated `NEXT_PUBLIC_SITE_URL` in Vercel
- [ ] Created admin user
- [ ] Updated user role to admin
- [ ] Verified admin panel access
- [ ] Tested all features

---

## 🎉 Success!

Your StaySpace application is now live!

**Your URLs:**
- **Frontend:** https://stayspace-abc123.vercel.app
- **Backend API:** https://stayspace-api.onrender.com
- **Admin Panel:** https://stayspace-abc123.vercel.app/admin

**What You've Deployed:**
- ✅ Full authentication system
- ✅ Product management
- ✅ Shopping cart
- ✅ Order system
- ✅ Admin dashboard
- ✅ Inventory tracking
- ✅ User management
- ✅ COD payment support

---

## 📝 Next Steps

### 1. Add Payment Gateway (Stripe)
- Create Stripe account
- Add Stripe keys to environment variables
- Implement payment flow
- Set up webhooks

### 2. Email Notifications
- Set up SendGrid or Resend
- Create email templates
- Send order confirmations
- Password reset emails

### 3. Enhanced Features
- Product reviews
- Advanced search (Algolia)
- Image uploads (Cloudinary)
- Analytics (Google Analytics)

### 4. Performance
- Add caching (Redis/Upstash)
- Optimize images
- Set up CDN

### 5. Marketing
- SEO optimization
- Social media integration
- Email marketing
- Content marketing

---

## 📞 Support Resources

- **Render Docs:** https://render.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **MongoDB Atlas Docs:** https://docs.atlas.mongodb.com
- **Next.js Docs:** https://nextjs.org/docs

---

## 🔗 Important Links

**Save these for reference:**

- **Frontend URL:** ____________________________
- **Backend URL:** ____________________________
- **MongoDB Atlas:** https://cloud.mongodb.com
- **Render Dashboard:** https://dashboard.render.com
- **Vercel Dashboard:** https://vercel.com/dashboard
- **GitHub Repo:** ____________________________

---

## ⚠️ Important Notes

1. **Free Tier Render:** Backend spins down after 15 minutes of inactivity. First request after spin-down takes 30-60 seconds. This is normal!

2. **Environment Variables:** Always redeploy after changing environment variables.

3. **MongoDB Connection String:** Keep it secret! Never commit to GitHub.

4. **Admin User:** Only create admin users via MongoDB Atlas, never through the registration form.

5. **CORS:** Make sure `CLIENT_URL` in Render matches your Vercel URL exactly (no trailing slash).

---

**Congratulations! Your StaySpace e-commerce platform is now live! 🎉**

**Need help?** Check the troubleshooting section or review the deployment logs in Render/Vercel dashboards.
