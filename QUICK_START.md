# 🚀 Quick Start Guide - Get StaySpace Running NOW!

Follow these steps **exactly** to get your server running.

---

## ⚡ Quick Fix (If Server Won't Start)

### Step 1: Check if MongoDB is the Issue

The most common reason the server won't start is **MongoDB connection**.

**Quick Test:**
```bash
cd server
node -e "console.log(require('dotenv').config()); console.log(process.env.MONGO_URI)"
```

If you see `undefined`, your `.env` file is missing or incorrect.

---

## 🔧 Fix It in 3 Steps

### Step 1: Create .env File

```bash
cd server
```

**Create a file named `.env`** (not `.env.example`) with this content:

```env
MONGO_URI=mongodb://localhost:27017/stayspace
MONGODB_URI=mongodb://localhost:27017/stayspace
JWT_SECRET=stayspace-dev-secret-key-12345678901234567890
JWT_EXPIRE=30d
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

**Save the file!**

### Step 2: Choose Your MongoDB Option

#### Option A: Use MongoDB Atlas (EASIEST - No Install Needed)

1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Create account
4. Create a FREE cluster (M0)
5. Create database user (username + password)
6. Click "Network Access" → "Add IP Address" → "Allow Access from Anywhere"
7. Click "Connect" → "Connect your application"
8. Copy the connection string
9. Replace `<password>` with your password
10. Update `.env`:
    ```env
    MONGO_URI=mongodb+srv://username:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/stayspace?retryWrites=true&w=majority
    MONGODB_URI=mongodb+srv://username:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/stayspace?retryWrites=true&w=majority
    ```

#### Option B: Install MongoDB Locally

**Windows:**
1. Download: https://www.mongodb.com/try/download/community
2. Install with default settings
3. MongoDB will start automatically
4. Your `.env` is already correct (uses localhost)

**Mac:**
```bash
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongod
```

### Step 3: Start the Server

```bash
cd server
npm run dev
```

**You should see:**
```
Server running on port 5000
Environment: development
MongoDB Connected
```

✅ **SUCCESS!** Your server is running!

---

## 🎯 If You Still Get Errors

### Error: "Cannot find module"

**Fix:**
```bash
cd server
npm install
npm run dev
```

### Error: "Port 5000 already in use"

**Fix (Windows):**
```bash
netstat -ano | findstr :5000
taskkill /PID <number> /F
```

Or change port in `.env`:
```env
PORT=5001
```

### Error: "MongoDB connection failed"

**Fix:**
- If using Atlas: Check username/password in connection string
- If using local: Make sure MongoDB service is running
  ```bash
  # Windows
  net start MongoDB
  ```

### Error: TypeScript compilation error

**Fix:**
```bash
cd server
npm install typescript ts-node @types/node --save-dev
npm run dev
```

---

## 📱 Start Frontend Too

Once backend is running:

```bash
# New terminal window
cd client
npm install
npm run dev
```

Visit: http://localhost:3000

---

## ✅ Verification

**Backend running?**
- Open: http://localhost:5000
- Should see: `{"message":"StaySpace API is running",...}`

**Frontend running?**
- Open: http://localhost:3000
- Should see: Your StaySpace homepage

---

## 🆘 Still Not Working?

### Check This:

1. **Is `.env` file created?**
   ```bash
   cd server
   dir .env
   ```
   Should show the file. If not, create it!

2. **Is MongoDB running?**
   - Atlas: Check dashboard
   - Local: Check services (Windows: Task Manager → Services → MongoDB)

3. **Are dependencies installed?**
   ```bash
   cd server
   dir node_modules
   ```
   Should show folder. If not: `npm install`

4. **Check the error message**
   - Read what it says
   - Look for "MongoDB", "EADDRINUSE", "Cannot find module"
   - Fix that specific issue

---

## 💡 Pro Tips

1. **Always run `npm install` first** in both server and client
2. **Create `.env` file** - don't just rename `.env.example`
3. **Use MongoDB Atlas** for easiest setup (no local install needed)
4. **Check terminal output** - errors tell you what's wrong
5. **One terminal for backend, one for frontend**

---

## 🎉 Success Checklist

- [ ] Created `server/.env` file
- [ ] MongoDB is running (Atlas or local)
- [ ] Ran `npm install` in server folder
- [ ] Server starts without errors
- [ ] Can access http://localhost:5000
- [ ] Ran `npm install` in client folder
- [ ] Frontend starts without errors
- [ ] Can access http://localhost:3000

---

## 📚 More Help

- **Detailed troubleshooting:** See `TROUBLESHOOTING.md`
- **Deployment guide:** See `DEPLOYMENT_GUIDE.md`
- **Full documentation:** See `README.md`

---

**Remember:** The #1 issue is usually the `.env` file or MongoDB connection. Fix those first!

**Need MongoDB Atlas help?** Watch: https://www.youtube.com/results?search_query=mongodb+atlas+setup

**You got this! 🚀**
