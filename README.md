# StaySpace - E-Commerce Platform

A modern, full-stack e-commerce platform for interior design and furniture, built with Next.js, Express, MongoDB, and deployed on Vercel.

## ✨ Features

### Customer Features
- 🔐 User authentication (register, login, JWT)
- 🛍️ Browse products with search and filtering
- 🛒 Shopping cart functionality
- 📦 Order placement and tracking
- 👤 User profile management
- 📍 Multiple shipping addresses
- 💰 Cash on Delivery (COD) payment

### Admin Features
- 📊 Dashboard with analytics
- 📦 Product management (CRUD)
- 🛍️ Order management
- 👥 User management
- 📈 Sales tracking
- 📉 Inventory monitoring
- 🔔 Low stock alerts

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **Animations:** Framer Motion

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs

### Deployment
- **Platform:** Vercel (Serverless)
- **Database Hosting:** MongoDB Atlas

## 📁 Project Structure

```
StaySpace/
├── client/                 # Next.js frontend
│   ├── src/
│   │   ├── app/           # Next.js app router pages
│   │   ├── components/    # React components
│   │   ├── context/       # Context providers (Auth, Cart, Wishlist)
│   │   ├── data/          # Static data
│   │   └── utils/         # Utility functions
│   ├── public/            # Static assets
│   ├── package.json
│   └── vercel.json
│
├── server/                # Express backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Auth & other middleware
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   └── index.ts       # Server entry point
│   ├── package.json
│   └── vercel.json
│
├── DEPLOYMENT_GUIDE.md    # Detailed deployment instructions
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- Vercel account (for deployment)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/stayspace.git
cd stayspace
```

### 2. Install Dependencies

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 3. Configure Environment Variables

**Backend (`server/.env`):**
```env
MONGO_URI=mongodb://localhost:27017/stayspace
MONGODB_URI=mongodb://localhost:27017/stayspace
JWT_SECRET=your-super-secret-jwt-key-change-this
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

### 4. Run Development Servers

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 📦 Deployment

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

### Quick Deploy to Vercel

```bash
# Deploy backend
cd server
vercel --prod

# Deploy frontend
cd ../client
vercel --prod
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/address` - Add address

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/slug/:slug` - Get product by slug
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/myorders` - Get user's orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/pay` - Mark order as paid
- `GET /api/orders` - Get all orders (Admin)
- `PUT /api/orders/:id/status` - Update order status (Admin)

### Admin
- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/role` - Update user role
- `DELETE /api/admin/users/:id` - Delete user

## 👤 User Roles

- **customer** - Default role for registered users
- **admin** - Full system access
- **manager** - Product and inventory management
- **support** - View orders and customer queries

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs (cost factor: 12)
- Role-based access control (RBAC)
- CORS configuration
- Input validation
- Secure HTTP headers

## 📊 Database Models

### User
- Authentication credentials
- Profile information
- Multiple shipping addresses
- Role-based permissions

### Product
- Product details and pricing
- Inventory tracking
- SEO metadata
- Categories and tags
- Sales analytics

### Order
- Order items and pricing
- Shipping and billing addresses
- Payment status
- Order status workflow
- Tracking information

### Cart
- User/session-based carts
- Auto-expiration (7 days)
- Price tracking

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ User authentication
- ✅ Product management
- ✅ Order system
- ✅ Admin dashboard
- ✅ COD payment

### Phase 2 (Planned)
- 💳 Payment gateway integration (Stripe)
- 📧 Email notifications
- 🔍 Advanced search (Algolia)
- ⭐ Product reviews and ratings
- ❤️ Enhanced wishlist

### Phase 3 (Future)
- 📱 Mobile app
- 🌍 Multi-language support
- 💱 Multi-currency support
- 🎁 Gift cards
- 📊 Advanced analytics

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
- Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- Review API documentation above
- Check browser console and network logs
- Review Vercel deployment logs

## 👨‍💻 Author

Built with ❤️ for modern e-commerce

---

**Happy Coding! 🚀**
