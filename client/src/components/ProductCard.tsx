"use client";

import { useState } from "react";
import { formatPrice } from "@/utils/currency";
import { Product } from "@/data/categories";
import { Plus, Heart } from "lucide-react";
import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const { isInWishlist, toggleWishlist } = useWishlist();
    const isWishlisted = isInWishlist(product.id);

    // Use second image if available for hover effect, otherwise default
    const hoverImage = product.images && product.images.length > 1 ? product.images[1] : product.image;

    return (
        <div className="group block cursor-pointer">
            <div
                className="relative aspect-square overflow-hidden mb-6 bg-[#f5f5f5]"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Link href={`/products/${product.id}`} className="block w-full h-full relative z-10">
                    {/* Main Image */}
                    <img
                        src={product.image}
                        alt={product.name}
                        className={`absolute inset-0 w-full h-full object-contain p-8 mix-blend-multiply transition-opacity duration-700 ease-out ${isHovered ? 'opacity-0' : 'opacity-100'}`}
                    />

                    {/* Hover Image (Reveal) */}
                    <img
                        src={hoverImage}
                        alt={`${product.name} alternate`}
                        className={`absolute inset-0 w-full h-full object-contain p-8 mix-blend-multiply transition-opacity duration-700 ease-out ${isHovered ? 'opacity-100 scale-110' : 'opacity-0'}`}
                    />

                    {/* Badges */}
                    {product.tag && (
                        <span className="absolute top-4 left-4 text-[10px] uppercase bg-white/90 backdrop-blur px-3 py-1.5 tracking-widest text-primary border border-white/50 z-10">
                            {product.tag}
                        </span>
                    )}
                </Link>

                {/* Wishlist Button - Top Right */}
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(product);
                    }}
                    className={`absolute top-4 right-4 p-2 backdrop-blur rounded-full transition-all duration-300 transform z-30 cursor-pointer ${isWishlisted
                        ? 'bg-terracotta text-white opacity-100 translate-y-0'
                        : 'bg-white/80 opacity-0 group-hover:opacity-100 hover:bg-terracotta hover:text-white translate-y-[-10px] group-hover:translate-y-0'
                        }`}
                >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>

                {/* Quick Add Button - Bottom Center slide up */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-[20px] group-hover:translate-y-0 z-20 px-4">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            // Add cart logic here
                        }}
                        className="w-full bg-primary/90 backdrop-blur text-white text-[10px] uppercase tracking-widest py-3 hover:bg-terracotta transition-colors flex items-center justify-center gap-2"
                    >
                        <Plus className="w-3 h-3" />
                        Quick Add
                    </button>
                </div>
            </div>

            <Link href={`/products/${product.id}`}>
                <div className="text-center">
                    <h3 className="font-serif text-lg text-primary mb-2 group-hover:text-terracotta transition-colors">
                        {product.name}
                    </h3>
                    <div className="flex justify-center gap-3 text-sm font-light text-gray-500">
                        {product.originalPrice && (
                            <span className="line-through opacity-50">{formatPrice(product.originalPrice)}</span>
                        )}
                        <span className="text-primary font-medium">{formatPrice(product.price)}</span>
                    </div>
                </div>
            </Link>
        </div>
    );
}
