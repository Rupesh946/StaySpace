"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, Search, X, User } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
    { name: "Living", href: "/spaces/living" },
    { name: "Bedroom", href: "/spaces/bedroom" },
    { name: "Dining", href: "/spaces/dining" },
    { name: "Office", href: "/spaces/office" },
    { name: "Sofas", href: "/category/sofas" },
    { name: "Outdoor", href: "/spaces/outdoor" },
];

interface NavbarProps {
    variant?: "default" | "dark";
}

export default function Navbar({ variant = "default" }: NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const pathname = usePathname();
    const { getCartCount } = useCart();
    const { user, isAuthenticated, logout } = useAuth();
    const cartCount = getCartCount();

    // Handle Scroll Effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock Body Scroll when Mobile Menu is Open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isMobileMenuOpen]);

    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
        setIsMobileMenuOpen(false);
    };

    // Dynamic Styling based on state
    const isDarkPage = variant === "dark";
    // We want dark text ONLY if we are on a dark variant page AND not scrolled AND mobile menu is closed.
    // In all other cases (Home, Scrolled, Mobile Menu Open), we want white text.
    const useDarkText = isDarkPage && !isScrolled && !isMobileMenuOpen;

    const headerBg = isScrolled || isMobileMenuOpen ? "bg-black/90 backdrop-blur-md border-white/5" : "bg-transparent border-transparent";
    const headerBorder = isScrolled ? "border-b" : "";

    const textColor = useDarkText ? "text-primary" : "text-white";
    const lineColor = useDarkText ? "bg-primary" : "bg-white";

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full z-[1000] px-6 py-5 transition-all duration-500 ease-in-out ${headerBg} ${headerBorder} ${textColor}`}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">

                    {/* 1. Logo (Left) */}
                    <Link href="/" className="relative z-[2001] group">
                        <span className="text-3xl lg:text-4xl font-serif font-medium tracking-tighter hover:opacity-80 transition-opacity">
                            STAYSPACE
                        </span>
                    </Link>

                    {/* 2. Desktop Navigation (Center) - Hidden on Mobile */}
                    <nav className="hidden lg:flex items-center gap-8 xl:gap-12 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 relative group ${isActive ? "opacity-100" : "opacity-70 hover:opacity-100"}`}
                                >
                                    {link.name}
                                    <span className={`absolute -bottom-2 left-0 w-full h-[1px] ${lineColor} transition-transform duration-300 origin-left ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                                </Link>
                            );
                        })}
                    </nav>

                    {/* 3. Icons & Actions (Right) */}
                    <div className="flex items-center gap-6 relative z-[2001]">
                        {/* Search */}
                        <div className="relative hidden md:block">
                            {isSearchOpen ? (
                                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 border border-white/10 animate-in fade-in zoom-in duration-200">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        autoFocus
                                        className="bg-transparent border-none outline-none text-xs text-white placeholder-white/50 w-32 tracking-wide"
                                        onBlur={(e) => !e.target.value && setIsSearchOpen(false)}
                                    />
                                    <X className="w-3 h-3 cursor-pointer opacity-70 hover:opacity-100 ml-2" onClick={() => setIsSearchOpen(false)} />
                                </div>
                            ) : (
                                <button onClick={() => setIsSearchOpen(true)} className={`hover:opacity-70 transition-opacity`}>
                                    <Search className="w-5 h-5 stroke-[1.5]" />
                                </button>
                            )}
                        </div>

                        {/* Account Overlay / Dropdown */}
                        <div className="relative hidden md:block">
                            {isAuthenticated ? (
                                <div className="relative">
                                    <button onClick={() => setShowUserMenu(!showUserMenu)} className="hover:opacity-70 transition-opacity flex items-center">
                                        <User className="w-5 h-5 stroke-[1.5]" />
                                    </button>
                                    <AnimatePresence>
                                        {showUserMenu && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                className="absolute right-0 top-full mt-4 w-56 bg-[#111] border border-white/10 rounded-xl shadow-2xl py-2 overflow-hidden"
                                                onMouseLeave={() => setShowUserMenu(false)}
                                            >
                                                <div className="px-5 py-3 border-b border-white/10">
                                                    <p className="text-sm text-white font-medium">{user?.name}</p>
                                                    <p className="text-xs text-white/50">{user?.email}</p>
                                                </div>
                                                <Link href="/profile" className="block px-5 py-2 text-xs uppercase tracking-widest text-white/70 hover:text-white hover:bg-white/5 transition-colors">My Profile</Link>
                                                <button onClick={handleLogout} className="block w-full text-left px-5 py-2 text-xs uppercase tracking-widest text-terracotta hover:bg-white/5 transition-colors border-t border-white/10 mt-1">Logout</button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <Link href="/auth" className="hover:opacity-70 transition-opacity">
                                    <User className="w-5 h-5 stroke-[1.5]" />
                                </Link>
                            )}
                        </div>

                        {/* Wishlist */}
                        <Link href="/wishlist" className="hover:opacity-70 transition-opacity hidden md:block">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                        </Link>

                        {/* Cart */}
                        <Link href="/cart" className="relative hover:opacity-70 transition-opacity">
                            <ShoppingCart className="w-5 h-5 stroke-[1.5]" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-terracotta text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Menu Toggle (Hamburger) */}
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="lg:hidden hover:opacity-70 transition-opacity"
                        >
                            <Menu className="w-6 h-6 stroke-[1.5]" />
                        </button>
                    </div>
                </div>
            </header>

            {/* 4. Luxury Fullscreen Mobile Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-xl flex flex-col justify-center items-center"
                    >
                        {/* Close Button Positioned Top Right */}
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute top-6 right-6 p-4 text-white/60 hover:text-white transition-colors group flex items-center gap-3"
                        >
                            <span className="text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">Close</span>
                            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                                <X className="w-5 h-5" />
                            </div>
                        </button>

                        {/* Navigation Links - Vertical List */}
                        <nav className="flex flex-col items-center gap-6 text-center">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-4xl md:text-5xl font-display font-light text-white/80 hover:text-white hover:scale-105 transition-all duration-300 italic block py-2"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Secondary Links (Account, Wishlist) */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="absolute bottom-12 flex items-center gap-8"
                        >
                            <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors">
                                My Account
                            </Link>
                            <Link href="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors">
                                Wishlist
                            </Link>
                        </motion.div>

                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
