"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Package, Clock, CheckCircle, XCircle, ChevronRight, Truck, ShoppingBag, Calendar, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";

interface OrderItem {
    product: {
        _id: string;
        name: string;
        images: string[];
    };
    quantity: number;
    price: number;
}

interface Order {
    _id: string;
    createdAt: string;
    total: number;
    orderStatus: string;
    paymentStatus: string;
    items: OrderItem[];
    shippingAddress: {
        address: string;
        city: string;
        postalCode: string;
        country: string;
    };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://stayspace.onrender.com/api';

export default function ProfilePage() {
    const { user, isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoadingOrders, setIsLoadingOrders] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push("/auth");
        }
    }, [isAuthenticated, loading, router]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const response = await fetch(`${API_URL}/orders/myorders`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }

                const data = await response.json();
                setOrders(data);
            } catch (err) {
                console.error("Error fetching orders:", err);
                setError("Failed to load order history");
            } finally {
                setIsLoadingOrders(false);
            }
        };

        if (isAuthenticated) {
            fetchOrders();
        }
    }, [isAuthenticated]);

    if (loading || (isAuthenticated && isLoadingOrders)) {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-terracotta"></div>
            </div>
        );
    }

    if (!isAuthenticated) return null;

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'delivered':
                return 'text-green-600 bg-green-50 border-green-100';
            case 'shipped':
                return 'text-blue-600 bg-blue-50 border-blue-100';
            case 'processing':
                return 'text-amber-600 bg-amber-50 border-amber-100';
            case 'cancelled':
                return 'text-red-600 bg-red-50 border-red-100';
            default:
                return 'text-gray-600 bg-gray-50 border-gray-100';
        }
    };

    const StatusIcon = ({ status }: { status: string }) => {
        switch (status.toLowerCase()) {
            case 'delivered': return <CheckCircle className="w-4 h-4" />;
            case 'shipped': return <Truck className="w-4 h-4" />;
            case 'processing': return <Clock className="w-4 h-4" />;
            case 'cancelled': return <XCircle className="w-4 h-4" />;
            default: return <Package className="w-4 h-4" />;
        }
    };

    return (
        <div className="min-h-screen bg-[#faf9f6]">
            <Navbar variant="dark" />

            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Sidebar / User Info */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm sticky top-32"
                        >
                            <div className="flex flex-col items-center text-center mb-6">
                                <div className="w-24 h-24 bg-terracotta/10 rounded-full flex items-center justify-center mb-4 text-terracotta text-3xl font-display italic">
                                    {user?.name.charAt(0)}
                                </div>
                                <h2 className="text-xl font-display font-medium text-primary">{user?.name}</h2>
                                <p className="text-stone-500 text-sm mt-1">{user?.email}</p>
                            </div>

                            <div className="space-y-4 pt-6 border-t border-stone-100">
                                <div className="flex items-center gap-3 text-stone-600 text-sm">
                                    <ShoppingBag className="w-4 h-4" />
                                    <span>{orders.length} Orders</span>
                                </div>
                                <div className="flex items-center gap-3 text-stone-600 text-sm">
                                    <MapPin className="w-4 h-4" />
                                    <span>Saved Addresses</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Main Content / Orders */}
                    <div className="lg:col-span-3">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <h1 className="text-3xl font-display font-light text-primary mb-8">Order History</h1>

                            {orders.length === 0 ? (
                                <div className="text-center py-20 bg-white rounded-2xl border border-stone-100 border-dashed">
                                    <Package className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-primary mb-2">No orders yet</h3>
                                    <p className="text-stone-500 mb-6">Start exploring our collections to find your perfect piece.</p>
                                    <button
                                        onClick={() => router.push('/')}
                                        className="px-6 py-2 bg-primary text-white text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors"
                                    >
                                        Start Shopping
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {orders.map((order) => (
                                        <div
                                            key={order._id}
                                            className="bg-white rounded-xl border border-stone-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                                        >
                                            <div className="p-6 border-b border-stone-50 flex flex-wrap gap-4 items-center justify-between bg-stone-50/30">
                                                <div className="flex gap-8">
                                                    <div>
                                                        <p className="text-xs text-stone-500 uppercase tracking-wider mb-1">Order Placed</p>
                                                        <p className="text-sm font-medium text-primary flex items-center gap-2">
                                                            <Calendar className="w-3.5 h-3.5 text-stone-400" />
                                                            {new Date(order.createdAt).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-stone-500 uppercase tracking-wider mb-1">Total Amount</p>
                                                        <p className="text-sm font-medium text-primary">${order.total.toFixed(2)}</p>
                                                    </div>
                                                </div>
                                                <div className={`px-3 py-1 rounded-full border text-xs font-medium uppercase tracking-wider flex items-center gap-2 ${getStatusColor(order.orderStatus)}`}>
                                                    <StatusIcon status={order.orderStatus} />
                                                    {order.orderStatus}
                                                </div>
                                            </div>

                                            <div className="p-6">
                                                <div className="space-y-6">
                                                    {order.items.map((item, index) => (
                                                        <div key={index} className="flex gap-4 items-start">
                                                            <div className="w-20 h-20 bg-stone-100 rounded-lg overflow-hidden flex-shrink-0">
                                                                <img
                                                                    src={item.product?.images?.[0] || '/placeholder.png'}
                                                                    alt={item.product?.name || 'Product'}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                            <div className="flex-1">
                                                                <h4 className="font-medium text-primary text-lg font-display">{item.product?.name}</h4>
                                                                <p className="text-sm text-stone-500 mt-1">Qty: {item.quantity}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="font-medium text-primary">${item.price.toFixed(2)}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="mt-6 pt-6 border-t border-stone-100 flex justify-between items-center">
                                                    <div className="text-xs text-stone-400">
                                                        Order ID: {order._id}
                                                    </div>
                                                    <button className="text-terracotta text-sm font-medium hover:text-terracotta/80 transition-colors flex items-center gap-1 group">
                                                        View Details
                                                        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
}
