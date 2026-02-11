"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [view, setView] = useState<'signin' | 'signup'>('signin');
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login, signup } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            let result;

            if (view === 'signin') {
                result = await login(email, password);
                if (!result.success) {
                    setError(result.error || "Invalid email or password");
                }
            } else {
                if (!name.trim()) {
                    setError("Please enter your name");
                    setIsLoading(false);
                    return;
                }
                result = await signup(name, email, password);
                if (!result.success) {
                    setError(result.error || "Email already exists");
                }
            }

            if (result.success) {
                // Reset form
                setName("");
                setEmail("");
                setPassword("");
                setError("");
                onClose();
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setName("");
        setEmail("");
        setPassword("");
        setError("");
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.98 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[440px] max-h-[90vh] bg-white z-[101] shadow-2xl overflow-y-auto"
                    >
                        <div className="p-8 md:p-12">
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors z-10"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex flex-col items-center text-center">
                                <span className="text-xs font-sans uppercase tracking-[0.2em] text-gray-400 mb-4">
                                    {view === 'signin' ? 'Welcome Back' : 'Join Us'}
                                </span>
                                <h2 className="text-4xl font-display italic text-primary mb-10">
                                    {view === 'signin' ? 'Sign In' : 'Create Account'}
                                </h2>

                                {error && (
                                    <div className="w-full mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-xs text-center rounded-sm">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="w-full space-y-8">
                                    {view === 'signup' && (
                                        <div className="space-y-1 text-left">
                                            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">Name</label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full border-b border-gray-200 py-2 text-primary focus:border-black focus:outline-none transition-colors bg-transparent placeholder-gray-300 font-light"
                                                placeholder="John Doe"
                                                required={view === 'signup'}
                                            />
                                        </div>
                                    )}
                                    <div className="space-y-1 text-left">
                                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">Email</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full border-b border-gray-200 py-2 text-primary focus:border-black focus:outline-none transition-colors bg-transparent placeholder-gray-300 font-light"
                                            placeholder="email@example.com"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1 text-left">
                                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">Password</label>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full border-b border-gray-200 py-2 text-primary focus:border-black focus:outline-none transition-colors bg-transparent placeholder-gray-300 font-light"
                                            placeholder="••••••••"
                                            required
                                            minLength={6}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-black text-white py-4 text-xs uppercase tracking-[0.2em] hover:bg-terracotta transition-colors duration-300 mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? 'Please wait...' : (view === 'signin' ? 'Sign In' : 'Sign Up')}
                                    </button>
                                </form>

                                <div className="mt-8 flex gap-2 text-sm font-light text-gray-500">
                                    <span>
                                        {view === 'signin' ? "Don't have an account?" : "Already a member?"}
                                    </span>
                                    <button
                                        onClick={() => {
                                            setView(view === 'signin' ? 'signup' : 'signin');
                                            setError("");
                                        }}
                                        className="text-black underline decoration-gray-300 underline-offset-4 hover:decoration-black transition-all"
                                    >
                                        {view === 'signin' ? 'Join' : 'Sign In'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
