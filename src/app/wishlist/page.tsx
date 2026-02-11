"use client";

import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { useWishlist } from "@/context/WishlistContext";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function WishlistPage() {
    const { wishlistItems } = useWishlist();

    return (
        <main className="min-h-screen bg-surface">
            <Navbar variant="dark" />

            <section className="pt-32 pb-20 px-6 max-w-[1400px] mx-auto min-h-screen">
                <div className="mb-12">
                    <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 hover:text-black transition-colors mb-6">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-display italic text-primary">Your Wishlist</h1>
                    <p className="text-gray-500 mt-2 font-light tracking-wide">
                        {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
                    </p>
                </div>

                {wishlistItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-20 border border-dashed border-gray-200 rounded-lg text-center">
                        <h2 className="text-2xl font-display italic text-gray-400 mb-4">Your collection is empty</h2>
                        <p className="text-sm text-gray-400 mb-8 max-w-md">
                            Browse our scenes to find pieces that speak to you.
                        </p>
                        <Link
                            href="/"
                            className="bg-primary text-white px-8 py-3 text-xs uppercase tracking-widest hover:bg-black transition-colors"
                        >
                            Explore Scenes
                        </Link>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {wishlistItems.map((product) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </section>
        </main>
    );
}
