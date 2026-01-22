# STAYSPACE - Interview Preparation Guide

## 1. Project Overview
"I built **StaySpace**, a premium furniture e-commerce platform that solves the 'imagination gap' in online shopping. Instead of just scrolling through grids of isolated products, users shop via **interactive scenes**. You can view a fully furnished room (Office, Living, etc.), click on items you like (Hotspots), and add them to the cart directly from the scene context."

## 2. Tech Stack & Rationale
- **Frontend**: **Next.js 14** (App Router) for SEO and server-side rendering performance.
- **Styling**: **Tailwind CSS** for a custom design system (no generic component libraries) to achieve the "editorial/premium" look.
- **Animations**: **Framer Motion** for smooth transitions (side panels, hover effects) that enhance the premium feel.
- **Backend**: **Node.js & Express** for a flexible REST API.
- **Database**: **MongoDB** with **Mongoose**. I chose a NoSQL DB for flexibility with product attributes but used **References (ObjectIds)** to maintain relationships between `Spaces` and `Products`.

## 3. Key Technical Challenges & Solutions

### A. Scene-Based Shopping (The "Hotspot" Feature)
**Challenge**: How to ensure clickable hotspots stay on the correct furniture item regardless of the screen size?
**Solution**:
- I implemented a coordinate system using **percentages** (`top: 60%`, `left: 35%`) rather than fixed pixels.
- The `Space` schema stores these coordinates.
- On the frontend, the `SceneViewer` component positions buttons absolutely relative to the container image. This makes the design **fully responsive**.

### B. Data Modeling for Scenes
**Schema Design**:
```typescript
// Space Schema
{
  type: String, // 'Office', 'Living'
  imageUrl: String,
  hotspots: [{
    x: Number,
    y: Number,
    productId: { type: Schema.Types.ObjectId, ref: 'Product' } // Relational link
  }]
}
```
**Why**: embedding `products` directly would duplicate data. Using `ref` ensures that if a product price changes, the Space page always shows the current price.

### C. State Management
- Used **Local State** for UI interactions (opening/closing the side panel).
- Used **URL State** (Routes) for navigation (`/spaces/office`).
- *Future improvement*: Could add Redux/Zustand for a global persistent cart.

## 4. Future Improvements (If asked "What would you add next?")
- **User Personalization**: "Save" scenes to a moodboard.
- **AR View**: View the furniture in your own room using WebXR.
- **Performance**: Implement Redis caching for product queries since they don't change often.
