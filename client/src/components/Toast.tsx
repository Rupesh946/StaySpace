"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { useEffect } from "react";

interface ToastProps {
    message: string;
    isVisible: boolean;
    onClose: () => void;
    image?: string;
}

export default function Toast({ message, isVisible, onClose, image }: ToastProps) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed top-20 right-4 md:right-12 z-[2000] flex items-center gap-4 bg-[#1a1a1a] text-white pl-3 pr-6 py-3 rounded-full shadow-2xl backdrop-blur-md border border-white/10"
                >
                    {image && (
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10 border border-white/10 flex-shrink-0">
                            <img src={image} alt="" className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div className="flex flex-col">
                        <span className="text-xs font-medium tracking-wide">{message}</span>
                    </div>
                    {/* <div className="w-px h-6 bg-white/20 mx-2" />
                     <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                        <X className="w-3 h-3" />
                    </button> */}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
