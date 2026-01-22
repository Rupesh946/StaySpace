"use client";

import Navbar from "@/components/Navbar";

export default function ProductPage({ params }: { params: { id: string } }) {
    return (
        <main className="min-h-screen pt-20">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-gray-100 overflow-hidden rounded-lg">
                            <img
                                src={`https://source.unsplash.com/random/800x800/?furniture,chair`}
                                alt="Product"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="aspect-square bg-gray-100 rounded-lg" />
                            <div className="aspect-square bg-gray-100 rounded-lg" />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-center">
                        <span className="text-sm text-gray-500 uppercase tracking-widest mb-2">Seating</span>
                        <h1 className="text-4xl font-serif mb-4">Eames Lounge Chair</h1>
                        <p className="text-2xl font-serif mb-6">$1,200.00</p>

                        <div className="prose prose-lg text-gray-600 mb-8">
                            <p>
                                The Eames Lounge Chair and Ottoman lives in museums like MoMA in New York and the Art Institute of Chicago, in stylish interiors and in documentary films.
                            </p>
                        </div>

                        <div className="flex space-x-4 mb-8">
                            <div className="w-12 h-12 rounded-full bg-neutral-900 border-2 border-transparent ring-2 ring-offset-2 ring-gray-200 cursor-pointer" />
                            <div className="w-12 h-12 rounded-full bg-neutral-500 border-2 border-transparent cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-gray-200" />
                            <div className="w-12 h-12 rounded-full bg-orange-900 border-2 border-transparent cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-gray-200" />
                        </div>

                        <button className="w-full py-4 bg-black text-white hover:bg-accent hover:text-white transition-colors font-medium text-lg uppercase tracking-wide">
                            Add to Cart
                        </button>

                        <div className="h-px bg-gray-200 my-8" />

                        <div className="space-y-2 text-sm text-gray-500">
                            <p>Free shipping on orders over $500</p>
                            <p>30-day return policy</p>
                            <p>1-year warranty included</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
