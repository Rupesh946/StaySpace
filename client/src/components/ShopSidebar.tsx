"use client";

import { X, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// Mock Data matching the reference image style
const sceneProducts = [
    {
        id: 1,
        name: "Lahar Cushion Cover - Earthy Red",
        price: 65.00,
        image: "https://images.unsplash.com/photo-1590354148767-1335b376269b?auto=format&fit=crop&q=80&w=400",
        discount: null
    },
    {
        id: 2,
        name: "Muhibbi Throw - Earthy Red",
        price: 136.00,
        originalPrice: 195.00,
        image: "https://images.unsplash.com/photo-1616627552504-2b7336e8b28f?auto=format&fit=crop&q=80&w=400",
        discount: "-30%"
    },
    {
        id: 3,
        name: "Dorothy Chest of Drawers",
        price: 850.00,
        image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=400",
        discount: null,
        tag: "SALE"
    },
    {
        id: 4,
        name: "Sheki Headboard - Super King",
        price: 1250.00,
        image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=400",
        discount: null
    }
];

interface ShopSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ShopSidebar({ isOpen, onClose }: ShopSidebarProps) {
    // Prevent body scroll when sidebar is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black z-50 cursor-pointer"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full md:w-[400px] bg-white z-[60] shadow-2xl overflow-y-auto"
                    >
                        <div className="p-6">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                                <h2 className="text-2xl font-serif">Shop scene (4)</h2>
                                <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                                    <X className="w-6 h-6 text-gray-500" />
                                </button>
                            </div>

                            {/* Product List */}
                            <div className="space-y-8">
                                {sceneProducts.map((product) => (
                                    <div key={product.id} className="group">
                                        <div className="relative aspect-square overflow-hidden bg-gray-50 mb-4">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            {product.tag && (
                                                <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 uppercase tracking-wider">
                                                    {product.tag}
                                                </span>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-serif text-lg leading-tight group-hover:text-terracotta transition-colors">
                                                    {product.name}
                                                </h3>
                                            </div>

                                            <div className="flex items-center gap-3 text-sm">
                                                {product.originalPrice && (
                                                    <span className="text-gray-400 line-through">
                                                        £{product.originalPrice.toFixed(2)}
                                                    </span>
                                                )}
                                                <span className={product.discount ? "text-terracotta font-medium" : "text-gray-900"}>
                                                    £{product.price.toFixed(2)}
                                                </span>
                                                {product.discount && (
                                                    <span className="text-xs text-terracotta bg-terracotta/10 px-1.5 py-0.5 rounded">
                                                        {product.discount}
                                                    </span>
                                                )}
                                            </div>

                                            <button className="w-full bg-charcoal text-white py-3 mt-4 text-xs font-medium tracking-widest uppercase hover:bg-terracotta transition-colors flex items-center justify-center gap-2">
                                                <span>View Details</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
