"use client";

import { useState, useEffect } from "react";

import Navbar from "@/components/Navbar";
import { CATEGORIES, Product } from "@/data/categories";
import ProductCard from "@/components/ProductCard";
import { formatPrice } from "@/utils/currency";
import { notFound } from "next/navigation";
import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductPage({ params }: { params: { id: string } }) {
    // Flatten all products from all categories to find the matching one
    const product = Object.values(CATEGORIES)
        .flatMap((cat) => cat.allProducts)
        .find((p) => String(p.id) === String(params.id));

    if (!product) {
        return notFound();
    }

    const { isInWishlist, toggleWishlist } = useWishlist();
    const isWishlisted = isInWishlist(product.id);

    // Find which category this product belongs to for breadcrumb/context (optional but nice)
    const category = Object.values(CATEGORIES).find(cat =>
        cat.allProducts.some(p => String(p.id) === String(params.id))
    );

    // Determine similar products based on basic keywords in the name
    const allProducts = Object.values(CATEGORIES).flatMap((cat) => cat.allProducts);

    const getProductType = (name: string) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('rug')) return 'rug';
        if (lowerName.includes('chair') || lowerName.includes('seat') || lowerName.includes('stool')) return 'chair';
        if (lowerName.includes('table') || lowerName.includes('desk') || lowerName.includes('console')) return 'table';
        if (lowerName.includes('pillow') || lowerName.includes('cushion')) return 'pillow';
        if (lowerName.includes('lamp') || lowerName.includes('light')) return 'lighting';
        if (lowerName.includes('sofa') || lowerName.includes('sectional')) return 'sofa';
        return 'furniture';
    };

    const currentType = getProductType(product.name);

    const similarProducts = allProducts
        .filter(p => p.id !== product.id && getProductType(p.name) === currentType)
        .slice(0, 4);

    const [activeImage, setActiveImage] = useState(product.image);
    const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        // Load recently viewed from local storage
        const stored = localStorage.getItem('recentlyViewed');
        let viewed: Product[] = stored ? JSON.parse(stored) : [];

        // Remove duplicates and current product if it exists
        viewed = viewed.filter(p => p.id !== product.id);

        // Add current product to the beginning
        viewed.unshift(product);

        if (viewed.length > 5) {
            viewed = viewed.slice(0, 5);
        }

        // Save back to local storage
        localStorage.setItem('recentlyViewed', JSON.stringify(viewed));

        // Update state with OTHER items (excluding current one for display)
        setRecentlyViewed(viewed.filter(p => p.id !== product.id));
    }, [product]);

    return (
        <main className="min-h-screen pt-24 bg-white">
            <Navbar variant="dark" />

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                    {/* Product Images */}
                    <div className="space-y-6">
                        {/* Main Image */}
                        <div className="aspect-square bg-[#f5f5f5] overflow-hidden rounded-sm relative group">
                            <img
                                src={activeImage}
                                alt={product.name}
                                className="w-full h-full object-contain p-4 transition-transform duration-[1.5s] ease-out group-hover:scale-110 mix-blend-multiply"
                            />
                        </div>

                        {/* Thumbnail Gallery */}
                        {product.images && product.images.length > 1 && (
                            <div className="grid grid-cols-4 md:grid-cols-5 gap-4">
                                {product.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveImage(img)}
                                        className={`aspect-square bg-[#f5f5f5] rounded-sm overflow-hidden border-2 transition-all duration-300 ${activeImage === img
                                            ? 'border-terracotta opacity-100'
                                            : 'border-transparent opacity-70 hover:opacity-100 hover:border-gray-200'
                                            }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`${product.name} view ${index + 1}`}
                                            className="w-full h-full object-contain p-2 mix-blend-multiply"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-center pt-8">
                        {category && (
                            <span className="text-xs text-gray-500 uppercase tracking-[0.2em] mb-4">
                                {category.title} / {product.tag || 'Furniture'}
                            </span>
                        )}
                        <h1 className="text-5xl font-serif font-medium text-primary mb-6 leading-tight">
                            {product.name}
                        </h1>
                        <p className="text-3xl font-light text-terracotta mb-8">
                            {formatPrice(product.price)}
                            {product.originalPrice && (
                                <span className="text-xl text-gray-300 line-through ml-4">
                                    {formatPrice(product.originalPrice)}
                                </span>
                            )}
                        </p>

                        <div className="prose prose-lg text-gray-400 font-light leading-relaxed mb-10 max-w-md">
                            <p>
                                {product.description || "Designed with an emphasis on form and function, this piece brings a timeless elegance to your space. Crafted from premium materials to ensure lasting quality and comfort."}
                            </p>
                        </div>



                        <div className="flex gap-4">
                            {/* Quantity Selector */}
                            <div className="flex items-center border border-gray-200 rounded-sm">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-12 h-full flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-500 hover:text-terracotta"
                                >
                                    -
                                </button>
                                <span className="w-8 text-center text-sm font-medium text-gray-900">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-12 h-full flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-500 hover:text-terracotta"
                                >
                                    +
                                </button>
                            </div>

                            <button className="flex-1 py-4 bg-primary text-white hover:bg-terracotta transition-all duration-300 text-xs font-bold uppercase tracking-[0.15em] rounded-sm">
                                Add to Cart
                            </button>
                            <button
                                onClick={() => toggleWishlist(product)}
                                className={`px-6 py-4 border transition-all duration-300 rounded-sm flex items-center justify-center ${isWishlisted
                                    ? 'border-terracotta bg-terracotta text-white'
                                    : 'border-gray-200 hover:border-terracotta hover:text-terracotta'
                                    }`}
                            >
                                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                            </button>
                        </div>

                        <div className="h-px bg-gray-100 my-10" />

                        <div className="space-y-6">
                            {/* Dimensions Selector */}
                            <div>
                                <label className="text-xs uppercase tracking-widest text-gray-900 block mb-3">Dimensions</label>
                                <div className="relative">
                                    <select className="w-full appearance-none bg-[#f5f5f5] border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-sm leading-tight focus:outline-none focus:border-terracotta transition-colors text-sm font-light">
                                        <option>80cm (H) x 120cm (W) x 70cm (D)</option>
                                        <option>85cm (H) x 150cm (W) x 75cm (D)</option>
                                        <option>90cm (H) x 180cm (W) x 80cm (D)</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>

                            {/* Features List */}
                            <div>
                                <h3 className="text-xs uppercase tracking-widest text-gray-900 mb-3 border-b border-gray-100 pb-2">Features</h3>
                                <ul className="list-disc list-inside text-sm font-light text-gray-500 space-y-2 marker:text-terracotta">
                                    <li>Handcrafted from sustainably sourced oak</li>
                                    <li>Premium fabric upholstery with stain resistance</li>
                                    <li>Ergonomic design for maximum comfort</li>
                                    <li>Durable construction built to last</li>
                                </ul>
                            </div>

                            {/* Delivery Info */}
                            <div>
                                <h3 className="text-xs uppercase tracking-widest text-gray-900 mb-3 border-b border-gray-100 pb-2">Delivery & Returns</h3>
                                <p className="text-sm font-light text-gray-500 leading-relaxed">
                                    Estimated delivery 3-5 days. We offer a 30-day hassle-free return policy. Contact our support team for any custom delivery requirements.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {similarProducts.length > 0 && (
                <section className="py-20 border-t border-gray-100 bg-[#fbfbfb]">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <h2 className="text-3xl font-serif font-medium mb-4">Similar Products</h2>
                                <p className="text-gray-500 font-light">Curated pieces that match this aesthetic.</p>
                            </div>
                            <a href={`/spaces/${category?.id || 'living'}`} className="text-xs uppercase tracking-widest border-b border-gray-300 pb-1 hover:border-terracotta hover:text-terracotta transition-all">
                                View Collection
                            </a>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {similarProducts.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
            {recentlyViewed.length > 0 && (
                <section className="py-12 border-t border-gray-100 bg-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <h2 className="text-2xl font-serif font-medium mb-2">Recently Viewed</h2>
                                <p className="text-gray-500 font-light text-sm">Continue from where you left off.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                            {recentlyViewed.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <div className="py-8" />
        </main>
    );
}
