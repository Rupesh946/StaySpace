"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { ArrowLeft, Mail, Lock, User as UserIcon } from "lucide-react";

export default function AuthPage() {
    const router = useRouter();
    const { login, signup } = useAuth();
    const [isSignUp, setIsSignUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Form states
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleGoogleLogin = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/google`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            if (isSignUp) {
                if (!name.trim()) {
                    setError("Please enter your name");
                    setIsLoading(false);
                    return;
                }
                const result = await signup(name, email, password);
                if (!result.success) {
                    setError(result.error || "Unable to create account");
                    setIsLoading(false);
                    return;
                }
            } else {
                const result = await login(email, password);
                if (!result.success) {
                    setError(result.error || "Login failed");
                    setIsLoading(false);
                    return;
                }
            }

            // Success - reset form and redirect
            setName("");
            setEmail("");
            setPassword("");
            setError("");

            router.push("/");
        } catch (err) {
            console.error("AuthPage: error", err);
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex">
            {/* Left Side - Image/Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop')",
                    }}
                >
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="relative z-10 flex flex-col justify-between p-12 text-white">
                    <Link href="/" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="text-sm uppercase tracking-wider">Back to Home</span>
                    </Link>

                    <div>
                        <h1 className="text-6xl font-display italic font-bold mb-6">STAYSPACE</h1>
                        <p className="text-xl font-light max-w-md leading-relaxed">
                            Design the space. Live the feeling.
                        </p>
                    </div>

                    <div className="text-xs text-white/60 uppercase tracking-wider">
                        © 2026 StaySpace Interiors
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md">
                    {/* Mobile Back Button */}
                    <Link href="/" className="lg:hidden flex items-center gap-2 text-primary hover:text-terracotta transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-xs uppercase tracking-wider">Back</span>
                    </Link>

                    {/* Form Header */}
                    <div className="mb-10">
                        <h2 className="text-4xl font-display italic text-primary mb-3">
                            {isSignUp ? "Create Account" : "Welcome Back"}
                        </h2>
                        <p className="text-gray-500 font-light">
                            {isSignUp
                                ? "Join us and start designing your perfect space"
                                : "Sign in to continue your journey"}
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-sm">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {isSignUp && (
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-gray-600 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="John Doe"
                                        required={isSignUp}
                                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-sm focus:outline-none focus:border-terracotta transition-colors"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-xs uppercase tracking-wider text-gray-600 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="email@example.com"
                                    required
                                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-sm focus:outline-none focus:border-terracotta transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs uppercase tracking-wider text-gray-600 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-sm focus:outline-none focus:border-terracotta transition-colors"
                                />
                            </div>
                        </div>

                        {!isSignUp && (
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 accent-terracotta" />
                                    <span className="text-gray-600">Remember me</span>
                                </label>
                                <button type="button" className="text-terracotta hover:underline">
                                    Forgot password?
                                </button>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary text-white py-4 hover:bg-terracotta transition-all duration-300 text-xs font-bold uppercase tracking-[0.15em] rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Please wait..." : (isSignUp ? "Create Account" : "Sign In")}
                        </button>
                    </form>

                    {/* Toggle Sign Up/Sign In */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                            <button
                                onClick={() => {
                                    setIsSignUp(!isSignUp);
                                    setError("");
                                    setName("");
                                    setEmail("");
                                    setPassword("");
                                }}
                                className="text-primary font-medium hover:text-terracotta transition-colors underline underline-offset-4"
                            >
                                {isSignUp ? "Sign In" : "Sign Up"}
                            </button>
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-4 text-gray-400 tracking-wider">Or continue with</span>
                        </div>
                    </div>

                    {/* Social Login */}
                    <div className="grid grid-cols-1 gap-4">
                        <button
                            onClick={handleGoogleLogin}
                            type="button"
                            className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-sm hover:bg-gray-50 transition-colors"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span className="text-sm font-medium text-gray-700">Google</span>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
