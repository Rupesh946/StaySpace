"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface User {
    id: string;
    email: string;
    name: string;
    phone?: string;
    role?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://stayspace.onrender.com/api';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load user from localStorage and verify token on mount
    useEffect(() => {
        const loadUser = async () => {
            console.log("AuthContext: Using API_URL:", API_URL);
            try {
                const token = localStorage.getItem("token");
                console.log("AuthContext: Loading user, token present:", !!token);

                if (token) {
                    // Verify token and get user data from backend
                    const response = await fetch(`${API_URL}/auth/me`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    if (response.ok) {
                        const userData = await response.json();
                        // Handle case where backend returns token in user object (unlikely for getMe, but safety first)
                        const userStart = { ...userData, id: userData._id || userData.id };
                        console.log("AuthContext: User loaded:", userStart);
                        setUser(userStart);
                    } else {
                        console.warn(`AuthContext: Failed to load user. Status: ${response.status} ${response.statusText}`);

                        // Check if response is HTML (common deployment error)
                        const contentType = response.headers.get("content-type");
                        if (contentType && contentType.includes("text/html")) {
                            console.error("AuthContext: CRITICAL - Endpoint returned HTML. Check API_URL environment variable! It looks like: " + API_URL);
                        }

                        // ONLY clear token if it's explicitly unauthorized (401)
                        if (response.status === 401) {
                            console.warn("AuthContext: Token invalid (401), clearing");
                            localStorage.removeItem("token");
                        }
                    }
                } else {
                    console.log("AuthContext: No token found");
                }
            } catch (error) {
                console.error("AuthContext: Network/Parse error loading user", error);

                // If it's a network error (e.g. backend down), try to keep the token
                // But if user is null, UI will show logged out. 
                // We're just logging it for now.
            } finally {
                setIsLoaded(true);
            }
        };

        loadUser();
    }, []);

    const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        try {
            console.log("AuthContext: Attempting login for", email);
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Backend returns user data + token in root object
                const { token, ...userData } = data;
                // Ensure id field is set (backend might send _id)
                const user = { ...userData, id: userData._id || userData.id };

                console.log("AuthContext: Login successful", user);
                // Store token and user data
                localStorage.setItem("token", token);
                setUser(user);
                return { success: true };
            } else {
                console.error("AuthContext: Login failed", data.message);
                return { success: false, error: data.message || 'Login failed' };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'Cannot connect to server. Please make sure the backend is running.' };
        }
    };

    const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        try {
            console.log("AuthContext: Attempting signup for", email);
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Backend returns user data + token in root object
                const { token, ...userData } = data;
                // Ensure id field is set (backend might send _id)
                const user = { ...userData, id: userData._id || userData.id };

                console.log("AuthContext: Signup successful", user);
                // Store token and user data
                localStorage.setItem("token", token);
                setUser(user);
                return { success: true };
            } else {
                console.error("AuthContext: Signup failed", data.message);
                return { success: false, error: data.message || 'Signup failed' };
            }
        } catch (error) {
            console.error('Signup error:', error);
            return { success: false, error: 'Cannot connect to server. Please make sure the backend is running.' };
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    const updateProfile = (data: Partial<User>) => {
        if (user) {
            const updatedUser = { ...user, ...data };
            setUser(updatedUser);
            // In a real app, you would also update this on the backend
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                loading: !isLoaded,
                login,
                signup,
                logout,
                updateProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
