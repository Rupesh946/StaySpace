"use client";

import Link from "next/link";
import { ShoppingCart, Menu, Search, X, User } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AuthModal from "./AuthModal";

const navLinks = [
    { name: "Office", href: "/spaces/office" },
    { name: "Living", href: "/spaces/living" },
    { name: "Bedroom", href: "/spaces/bedroom" },
    { name: "Sofas", href: "/category/sofas" },
    { name: "Outdoor", href: "/spaces/outdoor" },
    { name: "Dining", href: "/spaces/dining" },
];

export default function Navbar() {
    const [isAuthOpen, setIsAuthOpen] = useState(false);

    return (
        <>
            <nav className="absolute top-0 w-full z-50 px-12 py-8 flex items-center justify-between text-white transition-all duration-300">
                {/* Left Logo */}
                <div className="flex-shrink-0">
                    <Link href="/" className="text-3xl font-display italic font-medium tracking-wide hover:opacity-80 transition-opacity">
                        STAYSPACE
                    </Link>
                </div>

                {/* Center Navigation - Desktop */}
                <div className="hidden lg:flex items-center space-x-12">
                    {['Office', 'Living', 'Bedroom', 'Sofas', 'Outdoor', 'Dining'].map((item) => (
                        <Link
                            key={item}
                            href={`/spaces/${item.toLowerCase()}`}
                            className="text-[11px] uppercase tracking-[0.25em] font-medium text-white/90 hover:text-white relative group"
                        >
                            {item}
                            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100" />
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Icon */}
                <div className="lg:hidden">
                    <Menu className="w-6 h-6" />
                </div>

                {/* Right Icons */}
                <div className="flex items-center space-x-8">
                    <button
                        onClick={() => setIsAuthOpen(true)}
                        className="hover:text-gray-300 transition-colors"
                    >
                        <User className="w-5 h-5 stroke-[1.5]" />
                    </button>
                    <button className="hover:text-gray-300 transition-colors">
                        <Search className="w-5 h-5 stroke-[1.5]" />
                    </button>
                    <Link href="/cart" className="hover:text-gray-300 transition-colors relative">
                        <ShoppingCart className="w-5 h-5 stroke-[1.5]" />
                        {/* Optional Dot for cart items */}
                        {/* <span className="absolute -top-1 -right-1 w-2 h-2 bg-terracotta rounded-full" /> */}
                    </Link>
                </div>
            </nav>
            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
        </>
    );
}
