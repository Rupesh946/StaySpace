"use client";

import { X, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import { formatPrice } from "@/utils/currency";
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
                            <div className="space-y-12">
                                {products?.map((product) => (
                                    <a key={product.id} href={`/products/${product.id}`} className="block group">
                                        <div className="relative aspect-square overflow-hidden bg-[#f5f5f5] mb-4">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-110 mix-blend-multiply"
                                            />
                                            {product.tag && (
                                                <span className="absolute top-2 left-2 text-[10px] uppercase bg-white/90 backdrop-blur px-2 py-1 tracking-widest text-primary border border-white/50">
                                                    {product.tag}
                                                </span>
                                            )}
                                        </div>

                                        <div className="text-center space-y-2">
                                            <h3 className="font-serif text-xl text-primary group-hover:text-terracotta transition-colors">
                                                {product.name}
                                            </h3>

                                            <div className="flex justify-center items-center gap-3 text-sm font-light">
                                                {product.originalPrice && (
                                                    <span className="text-gray-400 line-through decoration-gray-300">
                                                        {formatPrice(product.originalPrice)}
                                                    </span>
                                                )}
                                                <span className="text-primary font-medium">
                                                    {formatPrice(product.price)}
                                                </span>
                                            </div>

                                            <button className="w-full bg-primary text-white py-3 mt-2 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-terracotta transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-500">
                                                View Product
                                            </button>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
