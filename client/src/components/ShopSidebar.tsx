"use client";

import { X, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import { Product } from "@/data/categories";

interface ShopSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    products: Product[];
    title?: string;
}

export default function ShopSidebar({ isOpen, onClose, products, title = "Shop the scene" }: ShopSidebarProps) {
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
                                <h2 className="text-2xl font-serif">{title} ({products?.length || 0})</h2>
                                <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                                    <X className="w-6 h-6 text-gray-500" />
                                </button>
                            </div>

                            {/* Product List */}
                            <div className="space-y-8">
                                {products?.map((product) => (
                                    <div key={product.id} className="group">
                                        <div className="relative aspect-square overflow-hidden bg-black/5 mb-4">
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
