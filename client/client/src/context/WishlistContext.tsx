"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Product } from "@/data/categories";
import Toast from "@/components/Toast";

interface WishlistContextType {
    wishlistItems: Product[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: string | number) => void;
    isInWishlist: (productId: string | number) => boolean;
    toggleWishlist: (product: Product) => void;
    clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Notification State
    const [notification, setNotification] = useState<{ message: string; isVisible: boolean; image?: string }>({
        message: "",
        isVisible: false,
    });

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem("wishlist");
            if (saved) {
                setWishlistItems(JSON.parse(saved));
            }
        } catch (error) {
            console.error("Failed to load wishlist", error);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    // Save to localStorage whenever items change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
        }
    }, [wishlistItems, isLoaded]);

    const showNotification = (message: string, image?: string) => {
        setNotification({ message, isVisible: true, image });
    };

    const closeNotification = () => {
        setNotification(prev => ({ ...prev, isVisible: false }));
    };

    const addToWishlist = (product: Product) => {
        setWishlistItems(prev => {
            if (prev.some(item => item.id === product.id)) return prev;
            return [...prev, product];
        });
        showNotification("Added to your collection", product.image);
    };

    const removeFromWishlist = (productId: string | number) => {
        setWishlistItems(prev => prev.filter(item => item.id !== productId));
    };

    const isInWishlist = (productId: string | number) => {
        return wishlistItems.some(item => item.id === productId);
    };

    const toggleWishlist = (product: Product) => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
            showNotification("Removed from collection", product.image);
        } else {
            addToWishlist(product);
        }
    };

    const clearWishlist = () => {
        setWishlistItems([]);
    };

    return (
        <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist, clearWishlist }}>
            {children}
            <Toast
                message={notification.message}
                isVisible={notification.isVisible}
                onClose={closeNotification}
                image={notification.image}
            />
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
}
