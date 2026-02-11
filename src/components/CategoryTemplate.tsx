"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES } from "@/data/categories";
import { ArrowRight, Plus, ChevronDown } from "lucide-react";
import Navbar from "./Navbar";
import ShopSidebar from "./ShopSidebar";
import ProductCard from "./ProductCard";
import { notFound } from "next/navigation";

interface CategoryTemplateProps {
    categorySlug: string;
}

import { useWishlist } from "@/context/WishlistContext";

export default function CategoryTemplate({ categorySlug }: CategoryTemplateProps) {
    // Handle case insensitivity and ensure safe access
    const category = CATEGORIES[categorySlug.toLowerCase()];

    if (!category) {
        return notFound();
    }

    const { isInWishlist } = useWishlist();
    const [activeSceneIndex, setActiveSceneIndex] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
    const [showSortMenu, setShowSortMenu] = useState(false);
    const [showFilterMenu, setShowFilterMenu] = useState(false);

    // Find the highest price in this category for the slider max
    const maxProductPrice = category.allProducts.length > 0
        ? Math.max(...category.allProducts.map(p => p.price))
        : 1000;

    // Filter States
    const [priceRange, setPriceRange] = useState({ min: 0, max: maxProductPrice });
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
    const [showWishlistedOnly, setShowWishlistedOnly] = useState(false);

    // Helpers to infer metadata
    const getProductType = (name: string) => {
        const lower = name.toLowerCase();
        if (lower.includes('chair') || lower.includes('stool') || lower.includes('seat')) return 'Seating';
        if (lower.includes('table') || lower.includes('desk') || lower.includes('console')) return 'Tables';
        if (lower.includes('lamp') || lower.includes('light')) return 'Lighting';
        if (lower.includes('rug') || lower.includes('mat')) return 'Rugs';
        if (lower.includes('sofa') || lower.includes('sectional')) return 'Sofas';
        return 'Decor'; // Default
    };

    const getMaterial = (name: string, desc: string = '') => {
        const text = (name + ' ' + desc).toLowerCase();
        if (text.includes('leather')) return 'Leather';
        if (text.includes('velvet') || text.includes('plush')) return 'Velvet';
        if (text.includes('linen') || text.includes('cotton') || text.includes('fabric') || text.includes('wool') || text.includes('textile')) return 'Fabric';
        if (text.includes('oak') || text.includes('walnut') || text.includes('wood') || text.includes('teak') || text.includes('bamboo') || text.includes('rattan')) return 'Wood';
        if (text.includes('glass') || text.includes('mirror')) return 'Glass';
        if (text.includes('metal') || text.includes('brass') || text.includes('gold') || text.includes('steel') || text.includes('iron') || text.includes('chrome')) return 'Metal';
        if (text.includes('ceramic') || text.includes('marble') || text.includes('stone') || text.includes('concrete') || text.includes('clay')) return 'Stone/Ceramic';
        return 'Other';
    };

    // Extract unique available options for this category
    const availableTypes = Array.from(new Set(category.allProducts.map(p => getProductType(p.name))));
    const availableMaterials = Array.from(new Set(category.allProducts.map(p => getMaterial(p.name, p.description || '')))).filter(m => m !== 'Other').sort();

    const activeScene = category.scenes[activeSceneIndex];

    const sortedProducts = [...category.allProducts]
        .filter(p => {
            // Price Range
            if (p.price < priceRange.min || p.price > priceRange.max) return false;

            // Type
            if (selectedTypes.length > 0 && !selectedTypes.includes(getProductType(p.name))) return false;

            // Material
            if (selectedMaterials.length > 0 && !selectedMaterials.includes(getMaterial(p.name, p.description))) return false;

            // Wishlist Filter
            if (showWishlistedOnly && !isInWishlist(p.id)) {
                return false;
            }

            return true;
        })
        .sort((a, b) => {
            if (sortBy === 'price-asc') return a.price - b.price;
            if (sortBy === 'price-desc') return b.price - a.price;
            return 0; // featured (default order)
        });

    return (
        <main className="min-h-screen">
            <Navbar />

            {/* Shop by Scene (Primary Feature) - Merged Intro */}
            <section className="relative w-full h-[75vh] md:h-[85vh] bg-surface overflow-hidden group">
                {/* ... (keep scene image logic) ... */}
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
                        <div className="absolute inset-0 bg-black/40" />
                    </motion.div>
                </AnimatePresence>

                {/* Centered Text Overlay */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white z-10 px-4">
                    <h1 className="text-7xl md:text-9xl font-display italic font-medium tracking-tighter mb-6 opacity-95 drop-shadow-sm">
                        {category.title}
                    </h1>
                    <p className="text-lg md:text-xl font-sans font-light tracking-wide mb-12 max-w-xl leading-relaxed opacity-90">
                        {category.intro}
                    </p>

                    <div className="flex flex-col items-center gap-8 mt-2">
                        <span className="text-[11px] uppercase tracking-[0.2em] text-white/90 border border-white/20 px-5 py-2 rounded-full bg-black/10 backdrop-blur-sm">
                            Scene — {activeScene.title}
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
            <section className="px-6 pt-8 pb-12 max-w-[1600px] mx-auto min-h-[500px]">
                <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-100 pb-6 mb-12 relative">
                    <div className="flex gap-8 mb-4 md:mb-0">
                        <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                            {sortedProducts.length} Results
                        </p>
                    </div>

                    {/* Minimal Filter Group */}
                    <div className="flex gap-12 text-xs uppercase tracking-[0.2em] text-primary cursor-pointer relative">
                        {/* Filter Dropdown */}
                        <div className="relative">
                            <div
                                className="flex items-center gap-2 hover:text-terracotta transition-colors group"
                                onClick={() => setShowFilterMenu(!showFilterMenu)}
                            >
                                <span>Filter</span>
                                <Plus className={`w-3 h-3 transition-transform ${showFilterMenu ? 'rotate-45' : ''}`} />
                            </div>

                            <AnimatePresence>
                                {showFilterMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute right-0 top-full mt-4 w-72 bg-white shadow-xl border border-gray-100 z-50 p-6 max-h-[80vh] overflow-y-auto hidden-scrollbar"
                                        onMouseLeave={() => setShowFilterMenu(false)}
                                    >
                                        <div className="space-y-8">
                                            {/* Price Range */}
                                            <div>
                                                <h4 className="text-[10px] uppercase tracking-widest text-gray-500 mb-4">Price Range</h4>
                                                <div className="flex gap-4 items-center">
                                                    <div className="flex-1">
                                                        <label className="text-[8px] uppercase text-gray-400 block mb-1">Min</label>
                                                        <input
                                                            type="number"
                                                            value={priceRange.min}
                                                            onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                                                            className="w-full border border-gray-200 p-2 text-xs rounded-sm focus:outline-none focus:border-terracotta"
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <label className="text-[8px] uppercase text-gray-400 block mb-1">Max</label>
                                                        <input
                                                            type="number"
                                                            value={priceRange.max}
                                                            onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                                                            className="w-full border border-gray-200 p-2 text-xs rounded-sm focus:outline-none focus:border-terracotta"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Product Type */}
                                            <div>
                                                <h4 className="text-[10px] uppercase tracking-widest text-gray-500 mb-4">Product Type</h4>
                                                <div className="space-y-2">
                                                    {availableTypes.map(type => (
                                                        <label key={type} className="flex items-center gap-3 cursor-pointer group">
                                                            <div className={`w-4 h-4 border transition-colors flex items-center justify-center ${selectedTypes.includes(type) ? 'bg-terracotta border-terracotta' : 'border-gray-200 group-hover:border-terracotta'}`}>
                                                                {selectedTypes.includes(type) && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                                                            </div>
                                                            <input
                                                                type="checkbox"
                                                                className="hidden"
                                                                checked={selectedTypes.includes(type)}
                                                                onChange={() => {
                                                                    if (selectedTypes.includes(type)) {
                                                                        setSelectedTypes(selectedTypes.filter(t => t !== type));
                                                                    } else {
                                                                        setSelectedTypes([...selectedTypes, type]);
                                                                    }
                                                                }}
                                                            />
                                                            <span className="text-xs text-gray-600 group-hover:text-black transition-colors">{type}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Colors */}
                                            <div>
                                                <h4 className="text-[10px] uppercase tracking-widest text-gray-500 mb-4">Material</h4>
                                                <div className="space-y-2">
                                                    {availableMaterials.map(material => (
                                                        <label key={material} className="flex items-center gap-3 cursor-pointer group">
                                                            <div className={`w-4 h-4 border transition-colors flex items-center justify-center ${selectedMaterials.includes(material) ? 'bg-terracotta border-terracotta' : 'border-gray-200 group-hover:border-terracotta'}`}>
                                                                {selectedMaterials.includes(material) && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                                                            </div>
                                                            <input
                                                                type="checkbox"
                                                                className="hidden"
                                                                checked={selectedMaterials.includes(material)}
                                                                onChange={() => {
                                                                    if (selectedMaterials.includes(material)) {
                                                                        setSelectedMaterials(selectedMaterials.filter(t => t !== material));
                                                                    } else {
                                                                        setSelectedMaterials([...selectedMaterials, material]);
                                                                    }
                                                                }}
                                                            />
                                                            <span className="text-xs text-gray-600 group-hover:text-black transition-colors">{material}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Wishlist Toggle */}
                                            <div>
                                                <div className="flex items-center justify-between">
                                                    <h4 className="text-[10px] uppercase tracking-widest text-gray-500">Wishlist Only</h4>
                                                    <button
                                                        onClick={() => setShowWishlistedOnly(!showWishlistedOnly)}
                                                        className={`w-8 h-4 rounded-full relative transition-colors duration-300 ${showWishlistedOnly ? 'bg-terracotta' : 'bg-gray-200'}`}
                                                    >
                                                        <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all duration-300 shadow-sm ${showWishlistedOnly ? 'left-[calc(100%-0.85rem)]' : 'left-0.5'}`} />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Reset Filters */}
                                            <button
                                                onClick={() => {
                                                    setPriceRange({ min: 0, max: maxProductPrice });
                                                    setSelectedTypes([]);
                                                    setSelectedMaterials([]);
                                                    setShowWishlistedOnly(false);
                                                }}
                                                className="w-full text-[10px] uppercase tracking-widest text-terracotta hover:text-black transition-colors underline decoration-terracotta/30 underline-offset-4"
                                            >
                                                Reset All
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Sort Dropdown */}
                        <div className="relative">
                            <div
                                className="flex items-center gap-2 hover:text-terracotta transition-colors"
                                onClick={() => setShowSortMenu(!showSortMenu)}
                            >
                                <span>Sort By</span>
                                <ChevronDown className={`w-3 h-3 transition-transform ${showSortMenu ? 'rotate-180' : ''}`} />
                            </div>

                            <AnimatePresence>
                                {showSortMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute right-0 top-full mt-4 w-48 bg-white shadow-xl border border-gray-100 z-50 py-2"
                                        onMouseLeave={() => setShowSortMenu(false)}
                                    >
                                        {[
                                            { label: 'Featured', value: 'featured' },
                                            { label: 'Price: Low to High', value: 'price-asc' },
                                            { label: 'Price: High to Low', value: 'price-desc' },
                                        ].map((option) => (
                                            <button
                                                key={option.value}
                                                onClick={() => {
                                                    setSortBy(option.value as any);
                                                    setShowSortMenu(false);
                                                }}
                                                className={`block w-full text-left px-6 py-3 text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-colors ${sortBy === option.value ? 'text-terracotta font-bold' : 'text-gray-500'}`}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                    {sortedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
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
