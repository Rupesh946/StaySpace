"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/utils/currency";
import { Lock, CreditCard, Truck, ShieldCheck } from "lucide-react";

export default function CheckoutPage() {
    const router = useRouter();
    const { cartItems, getCartTotal, clearCart } = useCart();
    const { user, isAuthenticated } = useAuth();
    const [isProcessing, setIsProcessing] = useState(false);

    // Shipping and billing form states
    const [shippingInfo, setShippingInfo] = useState({
        fullName: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "United States",
    });

    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: "",
        cardName: "",
        expiryDate: "",
        cvv: "",
    });

    const [sameAsShipping, setSameAsShipping] = useState(true);

    useEffect(() => {
        if (user) {
            setShippingInfo(prev => ({
                ...prev,
                fullName: user.name,
                email: user.email,
                phone: user.phone || "",
            }));
        }
    }, [user]);

    // Redirect if cart is empty
    useEffect(() => {
        if (cartItems.length === 0) {
            router.push("/cart");
        }
    }, [cartItems, router]);

    // Redirect to auth page if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/auth");
        }
    }, [isAuthenticated, router]);

    const subtotal = getCartTotal();
    const shipping = subtotal > 500 ? 0 : 50;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setShippingInfo({
            ...shippingInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        const name = e.target.name;

        // Format card number
        if (name === "cardNumber") {
            value = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
        }

        // Format expiry date
        if (name === "expiryDate") {
            value = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2").substr(0, 5);
        }

        setPaymentInfo({
            ...paymentInfo,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isAuthenticated) {
            router.push("/auth");
            return;
        }

        setIsProcessing(true);

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Clear cart and redirect to success page
        clearCart();
        router.push("/order-success");
    };

    if (cartItems.length === 0) {
        return null;
    }

    return (
        <main className="min-h-screen pt-24 bg-white">
            <Navbar variant="dark" />

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="mb-12">
                    <h1 className="text-5xl font-serif font-medium text-primary mb-2">Checkout</h1>
                    <p className="text-gray-500 font-light">Complete your order</p>
                </div>

                {!isAuthenticated && (
                    <div className="mb-8 p-6 bg-amber-50 border border-amber-200 rounded-sm">
                        <p className="text-sm text-amber-800 flex items-center gap-2">
                            <Lock className="w-4 h-4" />
                            Please sign in to continue with checkout
                        </p>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Left Column - Forms */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* Shipping Information */}
                            <section>
                                <h2 className="text-2xl font-serif font-medium text-primary mb-6 flex items-center gap-2">
                                    <Truck className="w-5 h-5" />
                                    Shipping Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-xs uppercase tracking-wider text-gray-500 block mb-2">Full Name *</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={shippingInfo.fullName}
                                            onChange={handleShippingChange}
                                            required
                                            disabled={!isAuthenticated}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-terracotta disabled:bg-gray-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs uppercase tracking-wider text-gray-500 block mb-2">Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={shippingInfo.email}
                                            onChange={handleShippingChange}
                                            required
                                            disabled={!isAuthenticated}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-terracotta disabled:bg-gray-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs uppercase tracking-wider text-gray-500 block mb-2">Phone *</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={shippingInfo.phone}
                                            onChange={handleShippingChange}
                                            required
                                            disabled={!isAuthenticated}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-terracotta disabled:bg-gray-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs uppercase tracking-wider text-gray-500 block mb-2">Country *</label>
                                        <select
                                            name="country"
                                            value={shippingInfo.country}
                                            onChange={handleShippingChange}
                                            required
                                            disabled={!isAuthenticated}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-terracotta disabled:bg-gray-50"
                                        >
                                            <option>United States</option>
                                            <option>Canada</option>
                                            <option>United Kingdom</option>
                                            <option>Australia</option>
                                        </select>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="text-xs uppercase tracking-wider text-gray-500 block mb-2">Address *</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={shippingInfo.address}
                                            onChange={handleShippingChange}
                                            required
                                            disabled={!isAuthenticated}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-terracotta disabled:bg-gray-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs uppercase tracking-wider text-gray-500 block mb-2">City *</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={shippingInfo.city}
                                            onChange={handleShippingChange}
                                            required
                                            disabled={!isAuthenticated}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-terracotta disabled:bg-gray-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs uppercase tracking-wider text-gray-500 block mb-2">State *</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={shippingInfo.state}
                                            onChange={handleShippingChange}
                                            required
                                            disabled={!isAuthenticated}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-terracotta disabled:bg-gray-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs uppercase tracking-wider text-gray-500 block mb-2">ZIP Code *</label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            value={shippingInfo.zipCode}
                                            onChange={handleShippingChange}
                                            required
                                            disabled={!isAuthenticated}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-terracotta disabled:bg-gray-50"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Payment Information */}
                            <section>
                                <h2 className="text-2xl font-serif font-medium text-primary mb-6 flex items-center gap-2">
                                    <CreditCard className="w-5 h-5" />
                                    Payment Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="text-xs uppercase tracking-wider text-gray-500 block mb-2">Card Number *</label>
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            value={paymentInfo.cardNumber}
                                            onChange={handlePaymentChange}
                                            placeholder="1234 5678 9012 3456"
                                            maxLength={19}
                                            required
                                            disabled={!isAuthenticated}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-terracotta disabled:bg-gray-50"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="text-xs uppercase tracking-wider text-gray-500 block mb-2">Cardholder Name *</label>
                                        <input
                                            type="text"
                                            name="cardName"
                                            value={paymentInfo.cardName}
                                            onChange={handlePaymentChange}
                                            required
                                            disabled={!isAuthenticated}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-terracotta disabled:bg-gray-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs uppercase tracking-wider text-gray-500 block mb-2">Expiry Date *</label>
                                        <input
                                            type="text"
                                            name="expiryDate"
                                            value={paymentInfo.expiryDate}
                                            onChange={handlePaymentChange}
                                            placeholder="MM/YY"
                                            maxLength={5}
                                            required
                                            disabled={!isAuthenticated}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-terracotta disabled:bg-gray-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs uppercase tracking-wider text-gray-500 block mb-2">CVV *</label>
                                        <input
                                            type="text"
                                            name="cvv"
                                            value={paymentInfo.cvv}
                                            onChange={handlePaymentChange}
                                            placeholder="123"
                                            maxLength={4}
                                            required
                                            disabled={!isAuthenticated}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-terracotta disabled:bg-gray-50"
                                        />
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center gap-2 text-xs text-gray-500">
                                    <ShieldCheck className="w-4 h-4 text-green-600" />
                                    Your payment information is encrypted and secure
                                </div>
                            </section>
                        </div>

                        {/* Right Column - Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-[#f5f5f5] p-8 rounded-sm sticky top-32">
                                <h2 className="text-2xl font-serif font-medium text-primary mb-6">Order Summary</h2>

                                {/* Cart Items */}
                                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex gap-4">
                                            <div className="w-16 h-16 bg-white rounded-sm overflow-hidden flex-shrink-0">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-contain p-2"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-sm font-medium text-primary">{item.name}</h3>
                                                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                                <p className="text-sm font-medium text-terracotta">{formatPrice(item.price * item.quantity)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pricing */}
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

                                <button
                                    type="submit"
                                    disabled={!isAuthenticated || isProcessing}
                                    className="w-full bg-primary text-white py-4 hover:bg-terracotta transition-all duration-300 text-xs font-bold uppercase tracking-[0.15em] rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isProcessing ? 'Processing...' : 'Place Order'}
                                </button>

                                {!isAuthenticated && (
                                    <p className="text-xs text-center text-gray-500 mt-4">
                                        Please sign in to complete your order
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </main>
    );
}
