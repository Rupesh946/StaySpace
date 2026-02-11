"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { CheckCircle, Package, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function OrderSuccessPage() {
    const router = useRouter();
    const { user, isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/");
        }
    }, [isAuthenticated, router]);

    const orderNumber = `ORD-${Date.now().toString().slice(-8)}`;

    return (
        <main className="min-h-screen pt-24 bg-white">
            <Navbar variant="dark" />

            <div className="max-w-3xl mx-auto px-6 py-20">
                <div className="text-center">
                    {/* Success Icon */}
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-8">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>

                    {/* Heading */}
                    <h1 className="text-5xl font-serif font-medium text-primary mb-4">
                        Order Confirmed!
                    </h1>
                    <p className="text-xl text-gray-500 font-light mb-8">
                        Thank you for your purchase, {user?.name}
                    </p>

                    {/* Order Details */}
                    <div className="bg-[#f5f5f5] p-8 rounded-sm mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                            <div>
                                <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Order Number</p>
                                <p className="text-lg font-medium text-primary">{orderNumber}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Email</p>
                                <p className="text-lg font-medium text-primary">{user?.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* What's Next */}
                    <div className="space-y-6 mb-12">
                        <h2 className="text-2xl font-serif font-medium text-primary mb-6">What happens next?</h2>

                        <div className="flex items-start gap-4 text-left">
                            <div className="flex-shrink-0 w-12 h-12 bg-terracotta/10 rounded-full flex items-center justify-center">
                                <Mail className="w-6 h-6 text-terracotta" />
                            </div>
                            <div>
                                <h3 className="font-medium text-primary mb-1">Order Confirmation Email</h3>
                                <p className="text-sm text-gray-500 font-light">
                                    We've sent a confirmation email to {user?.email} with your order details.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 text-left">
                            <div className="flex-shrink-0 w-12 h-12 bg-terracotta/10 rounded-full flex items-center justify-center">
                                <Package className="w-6 h-6 text-terracotta" />
                            </div>
                            <div>
                                <h3 className="font-medium text-primary mb-1">Processing & Shipping</h3>
                                <p className="text-sm text-gray-500 font-light">
                                    Your order will be processed within 1-2 business days and shipped to your address. You'll receive a tracking number once it ships.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 hover:bg-terracotta transition-all duration-300 text-xs font-bold uppercase tracking-[0.15em] rounded-sm"
                        >
                            Continue Shopping
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
