"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/utils/currency";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
    const [promoCode, setPromoCode] = useState("");

    const subtotal = getCartTotal();
    const shipping = subtotal > 0 ? (subtotal > 500 ? 0 : 50) : 0;
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + shipping + tax;

    if (cartItems.length === 0) {
        return (
            <main className="min-h-screen pt-24 bg-white">
                <Navbar variant="dark" />
                <div className="max-w-7xl mx-auto px-6 py-20">
                    <div className="text-center py-20">
                        <ShoppingBag className="w-20 h-20 mx-auto text-gray-300 mb-6" />
                        <h1 className="text-4xl font-serif font-medium text-primary mb-4">Your Cart is Empty</h1>
                        <p className="text-gray-500 mb-8 font-light">Looks like you haven't added anything to your cart yet.</p>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 hover:bg-terracotta transition-all duration-300 text-xs font-bold uppercase tracking-[0.15em]"
                        >
                            Continue Shopping
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen pt-24 bg-white">
            <Navbar variant="dark" />

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="mb-12">
                    <h1 className="text-5xl font-serif font-medium text-primary mb-2">Shopping Cart</h1>
                    <p className="text-gray-500 font-light">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex gap-6 border-b border-gray-100 pb-6">
                                {/* Product Image */}
                                <Link href={`/products/${item.id}`} className="flex-shrink-0">
                                    <div className="w-32 h-32 bg-[#f5f5f5] rounded-sm overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-contain p-4 mix-blend-multiply hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                </Link>

                                {/* Product Info */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <Link href={`/products/${item.id}`}>
                                            <h3 className="text-lg font-serif font-medium text-primary mb-1 hover:text-terracotta transition-colors">
                                                {item.name}
                                            </h3>
                                        </Link>
                                        {item.tag && (
                                            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">{item.tag}</p>
                                        )}
                                        <p className="text-lg font-light text-terracotta">
                                            {formatPrice(item.price)}
                                        </p>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-4 mt-4">
                                        <div className="flex items-center border border-gray-200 rounded-sm">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-500 hover:text-terracotta"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-12 text-center text-sm font-medium text-gray-900">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-500 hover:text-terracotta"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors flex items-center gap-2 text-xs uppercase tracking-wider"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Remove
                                        </button>
                                    </div>
                                </div>

                                {/* Item Total */}
                                <div className="text-right">
                                    <p className="text-lg font-medium text-primary">
                                        {formatPrice(item.price * item.quantity)}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {/* Clear Cart Button */}
                        <button
                            onClick={clearCart}
                            className="text-xs uppercase tracking-wider text-gray-400 hover:text-red-500 transition-colors underline underline-offset-4"
                        >
                            Clear Cart
                        </button>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-[#f5f5f5] p-8 rounded-sm sticky top-32">
                            <h2 className="text-2xl font-serif font-medium text-primary mb-6">Order Summary</h2>

                            {/* Promo Code */}
                            <div className="mb-6">
                                <label className="text-xs uppercase tracking-wider text-gray-500 block mb-2">Promo Code</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value)}
                                        placeholder="Enter code"
                                        className="flex-1 px-4 py-3 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-terracotta"
                                    />
                                    <button className="px-6 py-3 bg-primary text-white text-xs uppercase tracking-wider hover:bg-terracotta transition-colors rounded-sm">
                                        Apply
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium text-primary">{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-medium text-primary">
                                        {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Tax (10%)</span>
                                    <span className="font-medium text-primary">{formatPrice(tax)}</span>
                                </div>
                            </div>

                            <div className="flex justify-between text-lg font-serif font-medium mb-6">
                                <span className="text-primary">Total</span>
                                <span className="text-terracotta">{formatPrice(total)}</span>
                            </div>

                            {shipping > 0 && (
                                <p className="text-xs text-gray-500 mb-6 text-center">
                                    Add {formatPrice(500 - subtotal)} more for free shipping
                                </p>
                            )}

                            <Link
                                href="/checkout"
                                className="block w-full bg-primary text-white text-center py-4 hover:bg-terracotta transition-all duration-300 text-xs font-bold uppercase tracking-[0.15em] rounded-sm mb-4"
                            >
                                Proceed to Checkout
                            </Link>

                            <Link
                                href="/"
                                className="block w-full text-center py-4 border border-gray-200 text-primary hover:border-terracotta hover:text-terracotta transition-all duration-300 text-xs font-bold uppercase tracking-[0.15em] rounded-sm"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
