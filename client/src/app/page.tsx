"use client";

import Navbar from "@/components/Navbar";
import ShopSidebar from "@/components/ShopSidebar";
import { ArrowRight, ArrowUp, Eye } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

import { useRef } from "react";

import { CATEGORIES } from "@/data/categories";

export default function Home() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const sceneScrollRef = useRef<HTMLDivElement>(null);

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
        }
    };

    const scrollScenesRight = () => {
        if (sceneScrollRef.current) {
            sceneScrollRef.current.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
        }
    };

    return (
        <main className="min-h-screen">
            <Navbar />
            <ShopSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                products={CATEGORIES['living'].scenes[0].products}
                title={CATEGORIES['living'].scenes[0].title}
            />

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
                    <motion.h1
                        className="text-7xl md:text-[10rem] font-display font-light italic leading-none tracking-tight mb-8 drop-shadow-lg"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 1 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.12,
                                    delayChildren: 0.5
                                }
                            }
                        }}
                    >
                        {"STAYSPACE".split("").map((letter, index) => (
                            <motion.span
                                key={index}
                                className="inline-block"
                                variants={{
                                    hidden: { opacity: 0, filter: "blur(10px)", y: 10 },
                                    visible: {
                                        opacity: 1,
                                        filter: "blur(0px)",
                                        y: 0,
                                        transition: {
                                            duration: 1.5,
                                            ease: [0.22, 1, 0.36, 1], // Editorial ease
                                        }
                                    }
                                }}
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }}
                        className="text-2xl md:text-4xl font-display font-light italic mb-12 max-w-2xl mx-auto text-white/90 tracking-wide drop-shadow-md"
                    >
                        Design the space. Live the feeling.
                    </motion.p>
                </div>
            </section>


            {/* Philosophy Section */}
            {/* Philosophy Section */}
            <section className="py-40 px-6">
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

            {/* Shop The Look / Scenes - Editorial Spotlight */}
            {/* Shop The Look / Scenes - Editorial Spotlight */}
            <section className="relative h-[90vh] w-full overflow-hidden group/scenes">
                <div
                    ref={sceneScrollRef}
                    className="flex overflow-x-auto h-full snap-x snap-mandatory scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {[
                        {
                            id: "sunday-retreat",
                            tag: "In Residence",
                            title: <>The Sunday Morning<br />Retreat</>,
                            description: "A curated collection for slow living. Layered textures, warm lighting, and the perfect chair for losing yourself in a book.",
                            image: "https://images.unsplash.com/photo-1616486338812-3aeee037a9ec?q=80&w=2600&auto=format&fit=crop"
                        },
                        {
                            id: "evening-lounge",
                            tag: "Evening Mood",
                            title: <>The Evening<br />Lounge</>,
                            description: "Deep tones and soft shadows. Create a space that invites conversation and calm as the day winds down.",
                            image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=2600&auto=format&fit=crop"
                        },
                        {
                            id: "minimalist-work",
                            tag: "Workspace",
                            title: <>Focused<br />Simplicity</>,
                            description: "Clear lines for a clear mind. Designing a workspace that balances function with an inspiring aesthetic.",
                            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2600&auto=format&fit=crop"
                        }
                    ].map((scene) => (
                        <div key={scene.id} className="min-w-full h-full relative snap-start">
                            <div className="absolute inset-0">
                                <img
                                    src={scene.image}
                                    alt="Scene"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/20" />
                            </div>

                            <div className="absolute bottom-20 left-10 md:left-20 text-white z-20 max-w-xl">
                                <span className="text-xs font-sans uppercase tracking-[0.3em] mb-6 block opacity-90">
                                    {scene.tag}
                                </span>
                                <h2 className="text-5xl md:text-7xl font-display italic font-light mb-8 leading-[1.1]">
                                    {scene.title}
                                </h2>
                                <p className="text-lg font-light font-display italic text-white/90 mb-10 max-w-md leading-relaxed">
                                    {scene.description}
                                </p>
                                <button
                                    onClick={() => setIsSidebarOpen(true)}
                                    className="group flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-500"
                                >
                                    <span className="text-xs uppercase tracking-widest">Shop This Scene</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Floating Navigation Arrow */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 z-30 h-24 w-24 flex items-center justify-center mr-8">
                    <button
                        onClick={scrollScenesRight}
                        className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-full hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 group/btn text-white"
                        aria-label="Next Scene"
                    >
                        <ArrowRight className="w-6 h-6" />
                    </button>
                </div>
            </section>


            {/* Editorial Horizontal Product Roll */}
            <section className="py-24 border-t border-gray-100">
                <div className="max-w-[1800px] mx-auto px-6 relative group/section">
                    <div className="flex items-end justify-between mb-12 px-2">
                        <div>
                            <span className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-2 block">
                                The Collection
                            </span>
                            <h2 className="text-4xl font-display italic text-primary">
                                Curated Pieces
                            </h2>
                        </div>
                        <a href="/shop" className="text-xs uppercase tracking-widest text-gray-400 hover:text-primary transition-colors border-b border-transparent hover:border-black pb-0.5">
                            View All
                        </a>
                    </div>

                    {/* Horizontal Scroll Container */}
                    <div className="relative overflow-hidden">
                        <div
                            ref={scrollContainerRef}
                            className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {[
                                { id: 1, name: "Lahar Cushion Cover", price: "£65.00", img: "https://images.unsplash.com/photo-1590354148767-1335b376269b?auto=format&fit=crop&q=80&w=800" },
                                { id: 2, name: "Dorothy Chest", price: "£850.00", img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800" },
                                { id: 3, name: "Lana Three Seater", price: "£2,100.00", img: "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&q=80&w=800" },
                                { id: 4, name: "Kintsugi Vase", price: "£125.00", img: "https://images.unsplash.com/photo-1579656381226-5fc70ac169d1?auto=format&fit=crop&q=80&w=800" },
                                { id: 5, name: "Arne Dining Chair", price: "£450.00", img: "https://images.unsplash.com/photo-1506898667547-42e22a46e125?auto=format&fit=crop&q=80&w=800" },
                                { id: 6, name: "Marble Coffee Table", price: "£1,200.00", img: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=800" }
                            ].map((product) => (
                                <a
                                    key={product.id}
                                    href={`/products/${product.id}`}
                                    className="min-w-[280px] md:min-w-[340px] snap-start group cursor-pointer"
                                >
                                    <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-black/5">
                                        <img
                                            src={product.img}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="text-center group-hover:opacity-80 transition-opacity">
                                        <h3 className="font-serif text-lg text-primary mb-1">{product.name}</h3>
                                        <p className="text-xs font-light text-gray-500 tracking-wide">{product.price}</p>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Floating Navigation Arrow */}
                        <div className="absolute right-0 top-1/2 -translate-y-12 z-20 h-full flex items-center justify-end pointer-events-none">
                            <button
                                onClick={scrollRight}
                                className="pointer-events-auto bg-white border border-gray-100 p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group/btn"
                                aria-label="Scroll right"
                            >
                                <ArrowRight className="w-5 h-5 text-gray-400 group-hover/btn:text-black transition-colors" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter / Footer Preview */}
            {/* Editorial Footer Section */}
            <footer className="relative bg-[#1a1a1a] text-white overflow-hidden">
                {/* Subtle Gradient/Vignette for Depth */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-40 pointer-events-none" />

                <div className="max-w-[1400px] mx-auto px-6 pt-40 pb-12 relative z-10 font-light">
                    {/* Inner Circle / Newsletter */}
                    <div className="flex flex-col items-center text-center mb-40 max-w-lg mx-auto">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-8 block font-sans">
                            Exclusive Access
                        </span>
                        <h2 className="text-5xl md:text-6xl font-display italic mb-8 font-light text-white/90">
                            The Inner Circle
                        </h2>
                        <p className="text-xs md:text-sm text-center text-neutral-400 font-sans tracking-widest leading-relaxed mb-16 max-w-sm mx-auto opacity-60">
                            Curated inspiration and first access to new collections.
                            <br /> An invitation to living well.
                        </p>

                        <div className="flex items-center w-full max-w-xs border-b border-white/10 pb-4 transition-colors focus-within:border-white/30 group">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="bg-transparent w-full outline-none text-white placeholder-neutral-700 font-light text-sm tracking-wide text-center"
                            />
                            <button className="text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors whitespace-nowrap ml-4">
                                Request Access
                            </button>
                        </div>
                    </div>

                    {/* Footer Bottom / Links */}
                    <div className="flex flex-col md:flex-row justify-between items-end gap-12 border-t border-white/5 pt-12">
                        <div className="space-y-6">
                            <p className="text-3xl font-display italic tracking-wide text-white/90">STAYSPACE</p>
                            <p className="text-[10px] text-neutral-600 uppercase tracking-widest">
                                &copy; 2026 StaySpace Interiors
                            </p>
                        </div>

                        {/* Back to Top */}
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-neutral-500 hover:text-white transition-colors duration-500 group"
                        >
                            <span>Back to Top</span>
                            <ArrowUp className="w-3 h-3 group-hover:-translate-y-1 transition-transform duration-300" />
                        </button>

                        <div className="flex gap-12 text-[10px] uppercase tracking-[0.25em] text-neutral-500">
                            <a href="#" className="hover:text-white transition-colors duration-500">Instagram</a>
                            <a href="#" className="hover:text-white transition-colors duration-500">Pinterest</a>
                            <a href="#" className="hover:text-white transition-colors duration-500">Contact</a>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}
