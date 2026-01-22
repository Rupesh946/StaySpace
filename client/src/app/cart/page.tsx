"use client";

import Navbar from "@/components/Navbar";
import { Trash2 } from "lucide-react";

export default function CartPage() {
    return (
        <main className="min-h-screen pt-20">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-serif mb-12">Your Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Mock Cart Item */}
                        <div className="flex gap-6 border-b pb-8">
                            <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                                <img
                                    src="https://source.unsplash.com/random/200x200/?furniture,chair"
                                    alt="Product"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-xl font-medium">Eames Lounge Chair</h3>
                                    <button className="text-gray-400 hover:text-red-500">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                                <p className="text-gray-500 mt-1">Black Leather / Walnut</p>
                                <div className="flex justify-between items-end mt-4">
                                    <div className="flex items-center border rounded-md">
                                        <button className="px-3 py-1 hover:bg-gray-100">-</button>
                                        <span className="px-3 py-1 border-x">1</span>
                                        <button className="px-3 py-1 hover:bg-gray-100">+</button>
                                    </div>
                                    <p className="text-lg font-serif">$1,200.00</p>
                                </div>
                            </div>
                        </div>

                        {/* Another Mock Item */}
                        <div className="flex gap-6 border-b pb-8">
                            <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                                <img
                                    src="https://source.unsplash.com/random/200x200/?lamp"
                                    alt="Product"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-xl font-medium">Modern Floor Lamp</h3>
                                    <button className="text-gray-400 hover:text-red-500">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                                <p className="text-gray-500 mt-1">Brass Finish</p>
                                <div className="flex justify-between items-end mt-4">
                                    <div className="flex items-center border rounded-md">
                                        <button className="px-3 py-1 hover:bg-gray-100">-</button>
                                        <span className="px-3 py-1 border-x">1</span>
                                        <button className="px-3 py-1 hover:bg-gray-100">+</button>
                                    </div>
                                    <p className="text-lg font-serif">$350.00</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-50 p-8 rounded-lg">
                            <h2 className="text-xl font-serif mb-6">Order Summary</h2>
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>$1,550.00</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>Calculated at checkout</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax</span>
                                    <span>$124.00</span>
                                </div>
                            </div>
                            <div className="border-t pt-4 mb-8">
                                <div className="flex justify-between text-xl font-medium">
                                    <span>Total</span>
                                    <span>$1,674.00</span>
                                </div>
                            </div>
                            <button className="w-full py-4 bg-black text-white hover:bg-accent hover:text-white transition-colors font-medium text-lg uppercase tracking-wide">
                                Checkout
                            </button>
                            <p className="text-xs text-gray-500 text-center mt-4">
                                Secure Checkout powered by Stripe
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
