# 🚀 FINAL DEPLOYMENT CHECKLIST

## ✅ Pre-Deployment Status

- [x] MongoDB Atlas configured and tested
- [x] Connection string working locally
- [x] JWT secret generated
- [x] Both client and server building successfully
- [x] All dependencies installed

---

## 📋 Environment Variables for Vercel

### **SERVER (Backend) Environment Variables**

Copy these EXACTLY to Vercel Dashboard → Server Project → Settings → Environment Variables:

```
MONGO_URI=mongodb+srv://rupeshgurjar946:RupeshJi1@cluster0.fcgmc5l.mongodb.net/stayspace?retryWrites=true&w=majority&appName=Cluster0

MONGODB_URI=mongodb+srv://rupeshgurjar946:RupeshJi1@cluster0.fcgmc5l.mongodb.net/stayspace?retryWrites=true&w=majority&appName=Cluster0

JWT_SECRET=e44nzetdLsIkOA80NutOg+ax7odMSHm0VGYzk9lCPW0=

JWT_EXPIRE=30d

PORT=5000

NODE_ENV=production

CLIENT_URL=https://your-frontend-url.vercel.app
```

**⚠️ IMPORTANT:** Update `CLIENT_URL` after deploying the frontend!

---

### **CLIENT (Frontend) Environment Variables**

Copy these to Vercel Dashboard → Client Project → Settings → Environment Variables:

```
NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app/api

NEXT_PUBLIC_SITE_URL=https://your-frontend-url.vercel.app
```

**⚠️ IMPORTANT:** Update `NEXT_PUBLIC_API_URL` after deploying the backend!

---

## 🚀 Deployment Steps

### **Step 1: Install Vercel CLI (if not installed)**

```bash
npm install -g vercel
```

### **Step 2: Deploy Backend**

```bash
cd c:\Users\Rupesh\Downloads\StaySpace\server
vercel login
vercel --prod
```

**After deployment:**
1. Copy the deployment URL (e.g., `https://stayspace-server.vercel.app`)
2. Go to Vercel Dashboard → Your Server Project → Settings → Environment Variables
3. Add ALL the server environment variables listed above
4. Update `CLIENT_URL` (you'll get this after deploying frontend)
5. Redeploy: `vercel --prod`

### **Step 3: Deploy Frontend**

```bash
cd c:\Users\Rupesh\Downloads\StaySpace\client
vercel --prod
```

**After deployment:**
1. Copy the deployment URL (e.g., `https://stayspace.vercel.app`)
2. Go to Vercel Dashboard → Your Client Project → Settings → Environment Variables
3. Add the client environment variables with the actual backend URL
4. Redeploy: `vercel --prod`

### **Step 4: Update Backend with Frontend URL**

1. Go back to Server project in Vercel Dashboard
2. Update `CLIENT_URL` environment variable with your frontend URL
3. Redeploy backend: `vercel --prod`

---

## ✅ Post-Deployment Testing

### Test Backend:
```bash
curl https://your-backend-url.vercel.app/api/health
```

Expected response: `{"status":"ok"}`

### Test Frontend:
Visit: `https://your-frontend-url.vercel.app`

**Test these features:**
- [ ] Homepage loads
- [ ] User can sign up
- [ ] User can sign in
- [ ] Products display correctly
- [ ] Cart functionality works
- [ ] Checkout process works

---

## 🎯 Current Status

✅ **MongoDB Atlas:** Connected and working  
✅ **Local Testing:** Both servers running successfully  
✅ **Production Builds:** Both client and server build without errors  
✅ **Environment Variables:** All prepared and ready  

**YOU ARE READY TO DEPLOY! 🚀**

---

## 📞 Troubleshooting

### If backend deployment fails:
- Check Vercel build logs
- Verify all environment variables are set
- Ensure MongoDB Atlas IP whitelist includes 0.0.0.0/0

### If frontend can't connect to backend:
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check CORS settings (CLIENT_URL in backend)
- Ensure both are using HTTPS

### If MongoDB connection fails:
- Verify connection string is correct
- Check MongoDB Atlas network access settings
- Ensure database user has correct permissions

---

## 🎉 Next Steps

1. Run `vercel login` to authenticate
2. Deploy backend first
3. Deploy frontend second
4. Update environment variables with actual URLs
5. Redeploy both
6. Test your live application!

**Good luck! 🚀**
