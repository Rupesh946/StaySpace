"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Product } from "@/data/categories";
import Toast from "@/components/Toast";

export interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: string | number) => void;
    updateQuantity: (productId: string | number, quantity: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getCartCount: () => number;
    isInCart: (productId: string | number) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Notification State
    const [notification, setNotification] = useState<{ message: string; isVisible: boolean; image?: string }>({
        message: "",
        isVisible: false,
    });

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem("cart");
            if (saved) {
                setCartItems(JSON.parse(saved));
            }
        } catch (error) {
            console.error("Failed to load cart", error);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    // Save to localStorage whenever items change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("cart", JSON.stringify(cartItems));
        }
    }, [cartItems, isLoaded]);

    const showNotification = (message: string, image?: string) => {
        setNotification({ message, isVisible: true, image });
    };

    const closeNotification = () => {
        setNotification(prev => ({ ...prev, isVisible: false }));
    };

    const addToCart = (product: Product, quantity: number = 1) => {
        setCartItems(prev => {
            const existingItem = prev.find(item => item.id === product.id);

            if (existingItem) {
                // Update quantity if item already exists
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                // Add new item
                return [...prev, { ...product, quantity }];
            }
        });
        showNotification(`Added ${quantity > 1 ? quantity + 'x ' : ''}to cart`, product.image);
    };

    const removeFromCart = (productId: string | number) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
        showNotification("Removed from cart");
    };

    const updateQuantity = (productId: string | number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setCartItems(prev =>
            prev.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const getCartCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    const isInCart = (productId: string | number) => {
        return cartItems.some(item => item.id === productId);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getCartTotal,
                getCartCount,
                isInCart,
            }}
        >
            {children}
            <Toast
                message={notification.message}
                isVisible={notification.isVisible}
                onClose={closeNotification}
                image={notification.image}
            />
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
