"use client";

import Navbar from "@/components/Navbar";
import ShopSidebar from "@/components/ShopSidebar";
import { ArrowRight, Eye } from "lucide-react";
import { useState } from "react";

export default function Home() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <main className="min-h-screen">
            <Navbar />
            <ShopSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Hero Section */}
            <section className="relative h-screen w-full overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
                    >
                        <source src="/Landing Background.mp4" type="video/mp4" />
                    </video>
                    {/* Dark Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
                    <h1 className="text-7xl md:text-[10rem] font-display font-light italic leading-none tracking-tight mb-8 drop-shadow-lg">
                        STAYSPACE
                    </h1>
                    <p className="text-2xl md:text-4xl font-display font-light italic mb-12 max-w-2xl mx-auto text-white/90 tracking-wide drop-shadow-md">
                        Design the space. Live the feeling.
                    </p>




                </div>
            </section>

            {/* Shop The Look / Scenes Placeholder */}
            <section className="py-24 px-6 bg-beige">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-12">
                        <h2 className="text-4xl font-serif text-primary">Shop by Scene</h2>
                        <a href="/shop" className="text-sm border-b border-primary pb-1 uppercase tracking-widest hover:text-terracotta hover:border-terracotta transition-colors">View All Scenes</a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Scene 1 */}
                        <div
                            onClick={() => setIsSidebarOpen(true)}
                            className="group relative aspect-[16/9] overflow-hidden cursor-pointer"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1600"
                                alt="Modern Kitchen"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                            <div className="absolute bottom-6 left-6 text-white">
                                <h3 className="text-2xl font-serif">The Morning Ritual</h3>
                                <p className="text-sm opacity-90 mt-1">Kitchen & Dining Collection</p>
                            </div>
                        </div>

                        {/* Scene 2 */}
                        <div
                            onClick={() => setIsSidebarOpen(true)}
                            className="group relative aspect-[16/9] overflow-hidden cursor-pointer"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1505693416388-b0346efee539?q=80&w=1600"
                                alt="Bedroom Sanctuary"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                            <div className="absolute bottom-6 left-6 text-white">
                                <h3 className="text-2xl font-serif">Evening Sanctuary</h3>
                                <p className="text-sm opacity-90 mt-1">Bedroom Essentials</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
