"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, Search, X, User } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
    { name: "Office", href: "/spaces/office" },
    { name: "Living", href: "/spaces/living" },
    { name: "Bedroom", href: "/spaces/bedroom" },
    { name: "Sofas", href: "/category/sofas" },
    { name: "Outdoor", href: "/spaces/outdoor" },
    { name: "Dining", href: "/spaces/dining" },
];

interface NavbarProps {
    variant?: "default" | "dark";
}

export default function Navbar({ variant = "default" }: NavbarProps) {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const pathname = usePathname();
    const { getCartCount } = useCart();
    const { user, isAuthenticated, logout } = useAuth();
    const cartCount = getCartCount();

    const isDark = variant === "dark";
    const textColor = isDark ? "text-primary" : "text-white";
    const borderColor = isDark ? "border-gray-200" : "border-white/5";
    const hoverBg = isDark ? "hover:bg-black/5" : "hover:bg-black/20";
    const lineColor = isDark ? "bg-primary" : "bg-white";

    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
    };

    return (
        <>
            <nav className={`fixed top-0 w-full z-[1000] bg-transparent backdrop-blur-[6px] border-b ${borderColor} ${textColor} transition-all duration-300 ${hoverBg}`}>
                <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
                    {/* Left Logo */}
                    <Link href="/" className="flex-shrink-0 cursor-pointer relative z-20">
                        <span className="text-4xl font-display italic font-semibold tracking-tighter">STAYSPACE</span>
                    </Link>

                    {/* Center Navigation - Desktop */}
                    <div className="hidden lg:flex items-center gap-8 relative z-20">
                        {['Living', 'Bedroom', 'Dining', 'Office', 'Sofas', 'Outdoor'].map((item) => {
                            const href = item === 'Sofas' ? '/category/sofas' : `/spaces/${item.toLowerCase()}`;
                            const isActive = pathname === href;

                            return (
                                <Link
                                    key={item}
                                    href={href}
                                    className={`text-[11px] uppercase tracking-[0.15em] font-medium transition-colors relative group py-2 cursor-pointer ${isActive ? textColor : `${textColor}/70 hover:${textColor}`}`}
                                >
                                    {item.toUpperCase()}
                                    <span className={`absolute bottom-1 left-0 h-[1px] ${lineColor} transition-all duration-300 ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'}`} />
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right Section: Search & Icons */}
                    <div className="flex items-center gap-6">
                        {/* Search Bar */}
                        <div className="relative">
                            {!isSearchOpen ? (
                                <button
                                    onClick={() => setIsSearchOpen(true)}
                                    className={`hover:${textColor}/80 transition-colors hidden md:block`}
                                >
                                    <Search className="w-5 h-5 stroke-[1.5]" />
                                </button>
                            ) : (
                                <div className={`hidden md:flex items-center ${isDark ? 'bg-white/80 border-gray-200' : 'bg-black/40 border-white/10'} backdrop-blur-md rounded-sm px-3 py-2 w-64 border animate-in fade-in slide-in-from-right-4 duration-300`}>
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        autoFocus
                                        className={`bg-transparent border-none outline-none text-xs ${textColor} placeholder-${isDark ? 'gray-400' : 'white/60'} w-full font-light tracking-wide uppercase`}
                                        onBlur={(e) => {
                                            if (!e.currentTarget.value) setIsSearchOpen(false);
                                        }}
                                    />
                                    <button onClick={() => setIsSearchOpen(false)} className={`ml-2 hover:${textColor}/80`}>
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Icons */}
                        <div className="flex items-center gap-5">
                            {/* User Menu */}
                            <div className="relative">
                                {isAuthenticated ? (
                                    <>
                                        <button
                                            onClick={() => setShowUserMenu(!showUserMenu)}
                                            className={`hover:${textColor}/80 transition-colors flex items-center gap-2`}
                                        >
                                            <User className="w-5 h-5 stroke-[1.5]" />
                                        </button>
                                        <AnimatePresence>
                                            {showUserMenu && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    className="absolute right-0 top-full mt-4 w-56 bg-white shadow-xl border border-gray-100 z-50 py-2"
                                                    onMouseLeave={() => setShowUserMenu(false)}
                                                >
                                                    <div className="px-4 py-3 border-b border-gray-100">
                                                        <p className="text-sm font-medium text-primary">{user?.name}</p>
                                                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                                                    </div>
                                                    <button
                                                        onClick={handleLogout}
                                                        className="block w-full text-left px-4 py-3 text-xs uppercase tracking-wider text-gray-600 hover:bg-gray-50 transition-colors"
                                                    >
                                                        Logout
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </>
                                ) : (
                                    <Link
                                        href="/auth"
                                        className={`hover:${textColor}/80 transition-colors`}
                                    >
                                        <User className="w-5 h-5 stroke-[1.5]" />
                                    </Link>
                                )}
                            </div>
                            <Link href="/wishlist" className={`hover:${textColor}/80 transition-colors hidden md:block`}>
                                <span className="sr-only">Wishlist</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                            </Link>
                            <Link href="/cart" className={`hover:${textColor}/80 transition-colors relative`}>
                                <ShoppingCart className="w-5 h-5 stroke-[1.5]" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-terracotta text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                            {/* Mobile Menu Toggle */}
                            <button className="lg:hidden ml-2 cursor-pointer relative z-20">
                                <Menu className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
