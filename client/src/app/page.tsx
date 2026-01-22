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


            {/* Philosophy Section */}
            {/* Philosophy Section */}
            <section className="py-40 px-6 bg-white">
                <div className="max-w-3xl mx-auto text-center">
                    <span className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-8 block">The Philosophy</span>
                    <h2 className="text-5xl md:text-7xl font-display italic font-light text-primary mb-10 leading-relaxed">
                        "Your home should be a story of who you are, and a collection of what you love."
                    </h2>
                    <p className="text-xs md:text-sm font-sans text-gray-400 tracking-[0.15em] uppercase opacity-60">
                        Curated for the quiet moments of everyday life.
                    </p>
                </div>
            </section>

            {/* Featured Categories */}
            <section className="py-20 px-6 bg-surface">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:h-[1200px]">
                        {/* Row 1: Living, Office (Lower), Bedroom */}
                        {/* Wrapper for first column */}
                        <div className="flex flex-col gap-4 h-full">
                            <a href="/spaces/living" className="relative group overflow-hidden h-[600px] block cursor-pointer">
                                <img
                                    src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1200&auto=format&fit=crop"
                                    alt="Living"
                                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-700" />
                                <div className="absolute bottom-10 left-10 text-white">
                                    <h3 className="text-3xl font-display italic mb-3">Living Room</h3>
                                    <div className="overflow-hidden">
                                        <span className="inline-block text-xs uppercase tracking-widest border-b border-white/50 pb-1 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 ease-out">
                                            Explore Collection
                                        </span>
                                    </div>
                                </div>
                            </a>
                            <a href="/spaces/dining" className="relative group overflow-hidden h-[600px] block cursor-pointer">
                                <img
                                    src="https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1200&auto=format&fit=crop"
                                    alt="Dining"
                                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-700" />
                                <div className="absolute bottom-10 left-10 text-white">
                                    <h3 className="text-3xl font-display italic mb-3">Dining</h3>
                                    <div className="overflow-hidden">
                                        <span className="inline-block text-xs uppercase tracking-widest border-b border-white/50 pb-1 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 ease-out">
                                            Explore Collection
                                        </span>
                                    </div>
                                </div>
                            </a>
                        </div>

                        {/* Wrapper for second column (Offset) */}
                        <div className="flex flex-col gap-4 h-full md:pt-12">
                            <a href="/spaces/office" className="relative group overflow-hidden h-[600px] block cursor-pointer">
                                <img
                                    src="https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=1200&auto=format&fit=crop"
                                    alt="Office"
                                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-700" />
                                <div className="absolute bottom-10 left-10 text-white">
                                    <h3 className="text-3xl font-display italic mb-3">Home Office</h3>
                                    <div className="overflow-hidden">
                                        <span className="inline-block text-xs uppercase tracking-widest border-b border-white/50 pb-1 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 ease-out">
                                            Explore Collection
                                        </span>
                                    </div>
                                </div>
                            </a>
                            <a href="/category/sofas" className="relative group overflow-hidden h-[600px] block cursor-pointer">
                                <img
                                    src="https://images.unsplash.com/photo-1550226891-ef816aed4a98?q=80&w=1200&auto=format&fit=crop"
                                    alt="Sofas"
                                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-700" />
                                <div className="absolute bottom-10 left-10 text-white">
                                    <h3 className="text-3xl font-display italic mb-3">Sofas</h3>
                                    <div className="overflow-hidden">
                                        <span className="inline-block text-xs uppercase tracking-widest border-b border-white/50 pb-1 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 ease-out">
                                            Explore Collection
                                        </span>
                                    </div>
                                </div>
                            </a>
                        </div>

                        {/* Wrapper for third column */}
                        <div className="flex flex-col gap-4 h-full">
                            <a href="/spaces/bedroom" className="relative group overflow-hidden h-[600px] block cursor-pointer">
                                <img
                                    src="https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=1200&auto=format&fit=crop"
                                    alt="Bedroom"
                                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-700" />
                                <div className="absolute bottom-10 left-10 text-white">
                                    <h3 className="text-3xl font-display italic mb-3">Bedroom</h3>
                                    <div className="overflow-hidden">
                                        <span className="inline-block text-xs uppercase tracking-widest border-b border-white/50 pb-1 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 ease-out">
                                            Explore Collection
                                        </span>
                                    </div>
                                </div>
                            </a>
                            <a href="/spaces/outdoor" className="relative group overflow-hidden h-[600px] block cursor-pointer">
                                <img
                                    src="https://images.unsplash.com/photo-1599619351208-3e6c839d6828?q=80&w=1200&auto=format&fit=crop"
                                    alt="Outdoor"
                                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-700" />
                                <div className="absolute bottom-10 left-10 text-white">
                                    <h3 className="text-3xl font-display italic mb-3">Outdoor</h3>
                                    <div className="overflow-hidden">
                                        <span className="inline-block text-xs uppercase tracking-widest border-b border-white/50 pb-1 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 ease-out">
                                            Explore Collection
                                        </span>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Shop The Look / Scenes */}


            {/* Featured Pieces */}
            <section className="py-32 px-6 bg-white">
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-center mb-20">
                        <span className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4 block">Selection</span>
                        <h2 className="text-5xl font-display italic text-primary">Featured Pieces</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                        {/* Product 1 */}
                        <a href="/products/1" className="group cursor-pointer block">
                            <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-gray-50">
                                <img
                                    src="https://images.unsplash.com/photo-1590354148767-1335b376269b?auto=format&fit=crop&q=80&w=800"
                                    alt="Lahar Cushion"
                                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                />
                            </div>
                            <div className="text-center">
                                <h3 className="font-serif text-lg text-primary mb-2 group-hover:text-terracotta transition-colors">Lahar Cushion Cover</h3>
                                <p className="text-sm font-light text-gray-500">£65.00</p>
                            </div>
                        </a>

                        {/* Product 2 */}
                        <a href="/products/2" className="group cursor-pointer block lg:translate-y-12">
                            <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-gray-50">
                                <img
                                    src="https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800"
                                    alt="Dorothy Chest"
                                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                />
                            </div>
                            <div className="text-center">
                                <h3 className="font-serif text-lg text-primary mb-2 group-hover:text-terracotta transition-colors">Dorothy Chest of Drawers</h3>
                                <p className="text-sm font-light text-gray-500">£850.00</p>
                            </div>
                        </a>

                        {/* Product 3 */}
                        <a href="/products/3" className="group cursor-pointer block">
                            <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-gray-50">
                                <img
                                    src="https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&q=80&w=800"
                                    alt="Lana Sofa"
                                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                />
                            </div>
                            <div className="text-center">
                                <h3 className="font-serif text-lg text-primary mb-2 group-hover:text-terracotta transition-colors">Lana Three Seater</h3>
                                <p className="text-sm font-light text-gray-500">£2,100.00</p>
                            </div>
                        </a>

                        {/* Product 4 */}
                        <a href="/products/4" className="group cursor-pointer block lg:translate-y-12">
                            <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-gray-50">
                                <img
                                    src="https://images.unsplash.com/photo-1579656381226-5fc70ac169d1?auto=format&fit=crop&q=80&w=800"
                                    alt="Ceramic Vase"
                                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                />
                            </div>
                            <div className="text-center">
                                <h3 className="font-serif text-lg text-primary mb-2 group-hover:text-terracotta transition-colors">Kintsugi Vase</h3>
                                <p className="text-sm font-light text-gray-500">£125.00</p>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            {/* Newsletter / Footer Preview */}
            <section className="py-32 px-6 bg-charcoal text-white relative overflow-hidden">
                <div className="max-w-xl mx-auto text-center relative z-10">
                    <h2 className="text-5xl font-display italic mb-6">Join the Inner Circle</h2>
                    <p className="text-gray-400 font-light mb-10">
                        Subscribe to receive curated design inspiration, early access to new collections, and exclusive offers.
                    </p>
                    <div className="flex border-b border-gray-600 pb-2">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="bg-transparent w-full outline-none text-white placeholder-gray-500 font-light"
                        />
                        <button className="text-xs uppercase tracking-widest hover:text-gray-300 transition-colors">Subscribe</button>
                    </div>
                </div>
            </section>

            {/* Minimal Footer */}
            <footer className="bg-white py-12 px-6 border-t border-gray-100">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-2xl font-display italic text-primary">STAYSPACE</p>
                    <div className="flex gap-8 text-xs uppercase tracking-widest text-gray-500">
                        <a href="#" className="hover:text-primary transition-colors">Instagram</a>
                        <a href="#" className="hover:text-primary transition-colors">Pinterest</a>
                        <a href="#" className="hover:text-primary transition-colors">Contact</a>
                    </div>
                    <p className="text-xs text-gray-400 font-light">&copy; 2026 StaySpace Interiors.</p>
                </div>
            </footer>
        </main>
    );
}
