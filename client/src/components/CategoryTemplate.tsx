"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES } from "@/data/categories";
import { ArrowRight, Plus, ChevronDown } from "lucide-react";
import Navbar from "./Navbar";
import ShopSidebar from "./ShopSidebar";
import { notFound } from "next/navigation";

interface CategoryTemplateProps {
    categorySlug: string;
}

export default function CategoryTemplate({ categorySlug }: CategoryTemplateProps) {
    // Handle case insensitivity and ensure safe access
    const category = CATEGORIES[categorySlug.toLowerCase()];

    if (!category) {
        return notFound();
    }

    const [activeSceneIndex, setActiveSceneIndex] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const activeScene = category.scenes[activeSceneIndex];

    return (
        <main className="min-h-screen">
            <Navbar />

            {/* Shop by Scene (Primary Feature) - Merged Intro */}
            <section className="relative w-full h-[60vh] md:h-[65vh] bg-surface overflow-hidden group">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeScene.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0"
                    >
                        <img
                            src={activeScene.image}
                            alt={activeScene.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 transition-opacity duration-700 group-hover:bg-black/40" />
                    </motion.div>
                </AnimatePresence>

                {/* Centered Text Overlay */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white z-10 px-4">
                    <h1 className="text-xs font-sans uppercase tracking-[0.3em] opacity-80 mb-6 border-b border-white/30 pb-2">
                        {category.title}
                    </h1>
                    <p className="text-3xl md:text-5xl font-display italic font-light mb-10 max-w-3xl leading-tight drop-shadow-md">
                        {category.intro}
                    </p>

                    <div className="flex flex-col items-center gap-6 mt-4">
                        <span className="text-[10px] uppercase tracking-widest opacity-70">
                            Scene: {activeScene.title}
                        </span>
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="flex items-center gap-4 bg-white/20 backdrop-blur-md border border-white/30 px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-500"
                        >
                            <span className="text-xs uppercase tracking-widest">Shop the Scene</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>


            </section>

            {/* 4. Filter Bar & Product Count */}
            <section className="px-6 pt-8 pb-12 max-w-[1600px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-100 pb-6 mb-12">
                    <div className="flex gap-8 mb-4 md:mb-0">
                        <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                            {category.allProducts.length} Results
                        </p>
                    </div>

                    {/* Minimal Filter Group */}
                    <div className="flex gap-12 text-xs uppercase tracking-[0.2em] text-primary cursor-pointer">
                        <div className="flex items-center gap-2 hover:text-terracotta transition-colors group">
                            <span>Filter</span>
                            <Plus className="w-3 h-3 group-hover:rotate-90 transition-transform" />
                        </div>
                        <div className="flex items-center gap-2 hover:text-terracotta transition-colors">
                            <span>Sort By</span>
                            <ChevronDown className="w-3 h-3" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                    {category.allProducts.map((product) => (
                        <a href={`/products/${product.id}`} key={product.id} className="group cursor-pointer block">
                            <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-black/5">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                />
                                {product.tag && (
                                    <span className="absolute top-4 left-4 text-[10px] uppercase bg-white/90 backdrop-blur px-2 py-1 tracking-widest">
                                        {product.tag}
                                    </span>
                                )}
                            </div>
                            <div className="text-center">
                                <h3 className="font-serif text-lg text-primary mb-2 group-hover:text-terracotta transition-colors">
                                    {product.name}
                                </h3>
                                <div className="flex justify-center gap-3 text-sm font-light text-gray-500">
                                    {product.originalPrice && (
                                        <span className="line-through opacity-50">£{product.originalPrice}</span>
                                    )}
                                    <span>£{product.price}</span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </section>

            {/* Sidebar Overlay */}
            <ShopSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                products={activeScene.products}
                title={activeScene.title}
            />

            {/* Minimal Footer */}
            <footer className="py-12 border-t border-gray-100 text-center">
                <p className="text-2xl font-display italic text-primary mb-4">STAYSPACE</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">&copy; 2026 StaySpace Interiors</p>
            </footer>
        </main>
    );
}
