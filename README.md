# STAYSPACE

## Project Setup

### Prerequisites
- Node.js installed

### Installation

1. **Install Server Dependencies**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in `server/` with:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/stayspace
   JWT_SECRET=your_secret
   ```

2. **Install Client Dependencies**
   ```bash
   cd client
   npm install
   ```

### Running the App

1. **Start Backend Server**
   ```bash
   cd server
   npm run dev
   ```
   Server will run on `http://localhost:5000`

2. **Start Frontend Client**
   ```bash
   cd client
   npm run dev
   ```
   Client will run on `http://localhost:3000`

## Features
- **Scene-Based Shopping**: Interactive hotspots on efficient room images.
- **Premium UI**: Minimalist, editorial design with smooth animations.
- **Full E-commerce Flow**: Products, Cart, Checkout (mock).
