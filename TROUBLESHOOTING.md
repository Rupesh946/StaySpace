# 🔧 StaySpace - Troubleshooting & Setup Guide

This guide will help you solve common issues when starting the server and running the application.

---

## 🚨 Common Issues & Solutions

### Issue 1: TypeScript Compilation Errors

**Error:**
```
TSError: × Unable to compile TypeScript:
src/models/User.ts:87:43 - error TS2769: No overload matches this call.
```

**Solution:** ✅ **FIXED!**
The bcrypt TypeScript types have been corrected in the User model. The server should now compile without errors.

---

### Issue 2: Cannot Start Server - MongoDB Connection

**Error:**
```
MongoDB connection error: MongooseServerSelectionError
```

**Solutions:**

#### Option A: Use MongoDB Atlas (Recommended for Deployment)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster (M0)
3. Create a database user
4. Whitelist all IPs: `0.0.0.0/0`
5. Get connection string
6. Update `.env`:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/stayspace?retryWrites=true&w=majority
   ```

#### Option B: Use Local MongoDB (For Development)
1. Install MongoDB locally:
   - **Windows:** Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - **Mac:** `brew install mongodb-community`
   - **Linux:** Follow [official guide](https://docs.mongodb.com/manual/administration/install-on-linux/)

2. Start MongoDB:
   ```bash
   # Windows
   net start MongoDB
   
   # Mac/Linux
   brew services start mongodb-community
   # or
   sudo systemctl start mongod
   ```

3. Update `.env`:
   ```env
   MONGO_URI=mongodb://localhost:27017/stayspace
   ```

---

### Issue 3: Missing Dependencies

**Error:**
```
Cannot find module 'bcryptjs'
Cannot find module 'jsonwebtoken'
```

**Solution:**
```bash
cd server
npm install
```

If still having issues:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

### Issue 4: Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solutions:**

#### Option A: Kill the Process (Windows)
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

#### Option B: Change Port
Update `server/.env`:
```env
PORT=5001
```

---

### Issue 5: Environment Variables Not Loading

**Error:**
```
MongoDB URI is not defined in environment variables
```

**Solution:**

1. **Create `.env` file** in `server/` directory:
   ```bash
   cd server
   # Copy example file
   copy .env.example .env
   ```

2. **Edit `.env`** with your values:
   ```env
   MONGO_URI=mongodb://localhost:27017/stayspace
   MONGODB_URI=mongodb://localhost:27017/stayspace
   JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
   JWT_EXPIRE=30d
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:3000
   ```

3. **Verify file exists:**
   ```bash
   dir .env
   ```

---

### Issue 6: CORS Errors in Frontend

**Error:**
```
Access to fetch at 'http://localhost:5000/api/auth/login' from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solution:**

1. Check `server/.env` has correct CLIENT_URL:
   ```env
   CLIENT_URL=http://localhost:3000
   ```

2. Restart the server after changing .env

3. Verify CORS is configured in `server/src/index.ts` (already done)

---

### Issue 7: JWT Secret Not Set

**Error:**
```
secretOrPrivateKey must have a value
```

**Solution:**

Generate a strong JWT secret:
```bash
# Windows PowerShell
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((New-Guid).ToString() + (New-Guid).ToString()))

# Or use any random 32+ character string
```

Add to `server/.env`:
```env
JWT_SECRET=your-generated-secret-here-min-32-chars
```

---

## 📝 Step-by-Step Server Setup

### Step 1: Install Dependencies

```bash
# Navigate to server directory
cd server

# Install all dependencies
npm install
```

**Expected output:**
```
added 150 packages, and audited 151 packages in 15s
```

### Step 2: Set Up Environment Variables

1. **Create `.env` file:**
   ```bash
   # Windows
   copy .env.example .env
   
   # Mac/Linux
   cp .env.example .env
   ```

2. **Edit `.env` file** with your configuration:

**For Local Development (MongoDB Local):**
```env
MONGO_URI=mongodb://localhost:27017/stayspace
MONGODB_URI=mongodb://localhost:27017/stayspace
JWT_SECRET=dev-secret-key-change-in-production-min-32-chars
JWT_EXPIRE=30d
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

**For Local Development (MongoDB Atlas):**
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/stayspace?retryWrites=true&w=majority
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/stayspace?retryWrites=true&w=majority
JWT_SECRET=dev-secret-key-change-in-production-min-32-chars
JWT_EXPIRE=30d
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

### Step 3: Start MongoDB (if using local)

```bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Step 4: Start the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

**Expected output:**
```
Server running on port 5000
Environment: development
MongoDB Connected
```

### Step 5: Verify Server is Running

Open browser or use curl:
```bash
# Browser
http://localhost:5000

# Or use curl
curl http://localhost:5000
```

**Expected response:**
```json
{
  "message": "StaySpace API is running",
  "version": "1.0.0",
  "endpoints": {
    "auth": "/api/auth",
    "products": "/api/products",
    "orders": "/api/orders",
    "admin": "/api/admin",
    "spaces": "/api/spaces"
  }
}
```

---

## 🎨 Frontend Setup

### Step 1: Install Dependencies

```bash
# Navigate to client directory
cd client

# Install all dependencies
npm install
```

### Step 2: Set Up Environment Variables

1. **Create `.env.local` file:**
   ```bash
   # Windows
   copy .env.example .env.local
   
   # Mac/Linux
   cp .env.example .env.local
   ```

2. **Edit `.env.local`:**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

### Step 3: Start the Frontend

```bash
npm run dev
```

**Expected output:**
```
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
- event compiled client and server successfully
```

### Step 4: Open in Browser

Visit: `http://localhost:3000`

---

## ✅ Verification Checklist

After starting both servers, verify:

- [ ] Backend running at `http://localhost:5000`
- [ ] Backend health check: `http://localhost:5000/api/health` returns `{"status":"ok"}`
- [ ] Frontend running at `http://localhost:3000`
- [ ] No errors in backend terminal
- [ ] No errors in frontend terminal
- [ ] MongoDB connected (check backend terminal)
- [ ] Can access homepage
- [ ] Can register a new user
- [ ] Can login

---

## 🐛 Debugging Tips

### Check Backend Logs

Look for these messages in the backend terminal:
```
✅ Server running on port 5000
✅ MongoDB Connected
```

If you see errors:
```
❌ MongoDB connection error: ...
❌ Error: listen EADDRINUSE: ...
```

### Check Frontend Logs

Look for:
```
✅ ready started server on 0.0.0.0:3000
✅ compiled client and server successfully
```

### Test API Endpoints

```bash
# Health check
curl http://localhost:5000/api/health

# Get products
curl http://localhost:5000/api/products

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

### Check MongoDB Connection

```bash
# If using local MongoDB
mongosh
> show dbs
> use stayspace
> show collections
```

---

## 🔄 Quick Reset

If everything is broken and you want to start fresh:

### Backend Reset
```bash
cd server

# Stop server (Ctrl+C)

# Delete node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Verify .env exists and is correct
cat .env

# Start server
npm run dev
```

### Frontend Reset
```bash
cd client

# Stop server (Ctrl+C)

# Delete node_modules and .next
rm -rf node_modules package-lock.json .next

# Reinstall
npm install

# Verify .env.local exists
cat .env.local

# Start server
npm run dev
```

---

## 📞 Still Having Issues?

### Check These Files

1. **`server/.env`** - Environment variables set correctly?
2. **`server/package.json`** - All dependencies listed?
3. **`server/src/index.ts`** - Server configuration correct?
4. **`client/.env.local`** - API URL correct?

### Common Mistakes

- ❌ `.env` file not created (only `.env.example` exists)
- ❌ MongoDB not running (if using local)
- ❌ Wrong MongoDB connection string
- ❌ Port 5000 already in use
- ❌ JWT_SECRET not set or too short
- ❌ CLIENT_URL doesn't match frontend URL
- ❌ node_modules not installed

### Get Help

1. Check error messages carefully
2. Review this troubleshooting guide
3. Check MongoDB Atlas dashboard (if using Atlas)
4. Review Vercel logs (if deployed)
5. Check browser console (F12) for frontend errors
6. Check terminal for backend errors

---

## 🎯 Expected File Structure

Make sure you have these files:

```
StaySpace/
├── server/
│   ├── node_modules/          ✅ Should exist after npm install
│   ├── src/
│   │   ├── controllers/       ✅ 4 controller files
│   │   ├── middleware/        ✅ authMiddleware.ts
│   │   ├── models/            ✅ 4 model files
│   │   ├── routes/            ✅ 5 route files
│   │   └── index.ts           ✅ Main server file
│   ├── .env                   ✅ YOUR environment variables
│   ├── .env.example           ✅ Template
│   ├── package.json           ✅ Dependencies
│   └── vercel.json            ✅ Vercel config
│
└── client/
    ├── node_modules/          ✅ Should exist after npm install
    ├── src/
    │   ├── app/               ✅ Next.js pages
    │   ├── components/        ✅ React components
    │   └── context/           ✅ Auth, Cart, Wishlist
    ├── .env.local             ✅ YOUR environment variables
    ├── .env.example           ✅ Template
    ├── package.json           ✅ Dependencies
    └── vercel.json            ✅ Vercel config
```

---

## 🚀 Success!

Once both servers are running without errors:

1. ✅ Backend: `http://localhost:5000`
2. ✅ Frontend: `http://localhost:3000`
3. ✅ MongoDB: Connected
4. ✅ Ready to develop!

**Next:** Try registering a user and testing the features!

---

**Remember:** Always check the terminal output for error messages. They usually tell you exactly what's wrong!
