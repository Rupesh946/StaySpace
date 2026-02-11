# 🚀 Quick Deployment Guide

## Prerequisites
- Vercel CLI installed: `npm install -g vercel`
- MongoDB Atlas account created
- Connection string ready

## Deploy Backend

```bash
cd server
vercel --prod
```

**Environment Variables to Add in Vercel Dashboard:**
- `MONGO_URI` - Your MongoDB Atlas connection string
- `MONGODB_URI` - Same as MONGO_URI
- `JWT_SECRET` - Generate with: `openssl rand -base64 32`
- `JWT_EXPIRE` - `30d`
- `NODE_ENV` - `production`
- `CLIENT_URL` - Your frontend URL (add after frontend deployment)

## Deploy Frontend

```bash
cd client
vercel --prod
```

**Environment Variables to Add in Vercel Dashboard:**
- `NEXT_PUBLIC_API_URL` - Your backend URL + `/api`
- `NEXT_PUBLIC_SITE_URL` - Your frontend URL

## After Both Deployments

1. Update server's `CLIENT_URL` with actual frontend URL
2. Redeploy server: `vercel --prod`
3. Test your application!

## Test URLs

- Frontend: `https://your-project.vercel.app`
- Backend Health: `https://your-api.vercel.app/api/health`
