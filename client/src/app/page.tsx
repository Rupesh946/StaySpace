"use client";

import Navbar from "@/components/Navbar";
import ShopSidebar from "@/components/ShopSidebar";
import SpaceCard from "@/components/SpaceCard";
import { formatPrice } from "@/utils/currency";
import { ArrowRight, ArrowUp, Eye } from "lucide-react";
import { useState, useRef, useEffect } from "react";

import { CATEGORIES, Product } from "@/data/categories";

export default function Home() {
    const [curatedProducts, setCuratedProducts] = useState<Product[]>([]);

    useEffect(() => {
        // Gather all products from all categories
        const allProducts = Object.values(CATEGORIES).flatMap(cat => cat.allProducts);

        // Shuffle array using Fisher-Yates algorithm
        for (let i = allProducts.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allProducts[i], allProducts[j]] = [allProducts[j], allProducts[i]];
        }

        // Take the first 8
        setCuratedProducts(allProducts.slice(0, 8));
    }, []);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [hoveredSpace, setHoveredSpace] = useState<string | null>(null);
    const [activeScene, setActiveScene] = useState<{ products: Product[], title: string }>({
        products: CATEGORIES['living'].scenes[0].products,
        title: CATEGORIES['living'].scenes[0].title
    });
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
                products={activeScene.products}
                title={activeScene.title}
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
                    <h1 className="text-7xl md:text-[10rem] font-serif font-bold leading-none tracking-tighter mb-8 drop-shadow-2xl">
                        STAYSPACE
                    </h1>
                    <p className="text-2xl md:text-3xl font-display font-light italic mb-12 max-w-2xl mx-auto text-white/90 tracking-wide drop-shadow-lg">
                        Design the space. Live the feeling.
                    </p>
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

            {/* Featured Categories - Spaces */}
            <section className="py-20 px-6 bg-surface">
                <div className="max-w-[1400px] mx-auto">
                    {/* Header */}
                    <div className="mb-16 text-center">
                        <span className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3 block">Interiors</span>
                        <h2 className="text-4xl md:text-5xl font-display italic text-primary">Browse by Space</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:h-[1200px] group/grid">
                        {/* Row 1: Living, Office (Lower), Bedroom */}
                        {/* Wrapper for first column */}
                        <div className="flex flex-col gap-4 h-full">
                            <SpaceCard
                                id="living"
                                title="Living Room"
                                href="/spaces/living"
                                image="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1200&auto=format&fit=crop"
                                hoveredSpace={hoveredSpace}
                                setHoveredSpace={setHoveredSpace}
                            />
                            <SpaceCard
                                id="dining"
                                title="Dining"
                                href="/spaces/dining"
                                image="https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1200&auto=format&fit=crop"
                                hoveredSpace={hoveredSpace}
                                setHoveredSpace={setHoveredSpace}
                            />
                        </div>

                        {/* Wrapper for second column (Offset) */}
                        <div className="flex flex-col gap-4 h-full md:pt-12">
                            <SpaceCard
                                id="office"
                                title="Home Office"
                                href="/spaces/office"
                                image="https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=1200&auto=format&fit=crop"
                                hoveredSpace={hoveredSpace}
                                setHoveredSpace={setHoveredSpace}
                            />
                            <SpaceCard
                                id="sofas"
                                title="Sofas"
                                href="/category/sofas"
                                image="https://images.unsplash.com/photo-1550226891-ef816aed4a98?q=80&w=1200&auto=format&fit=crop"
                                hoveredSpace={hoveredSpace}
                                setHoveredSpace={setHoveredSpace}
                            />
                        </div>

                        {/* Wrapper for third column */}
                        <div className="flex flex-col gap-4 h-full">
                            <SpaceCard
                                id="bedroom"
                                title="Bedroom"
                                href="/spaces/bedroom"
                                image="https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=1200&auto=format&fit=crop"
                                hoveredSpace={hoveredSpace}
                                setHoveredSpace={setHoveredSpace}
                            />
                            <SpaceCard
                                id="outdoor"
                                title="Outdoor"
                                href="/spaces/outdoor"
                                image="https://images.unsplash.com/photo-1599619351208-3e6c839d6828?q=80&w=1200&auto=format&fit=crop"
                                hoveredSpace={hoveredSpace}
                                setHoveredSpace={setHoveredSpace}
                            />
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
                            sidebarTitle: "The Sunday Morning Retreat",
                            description: "A curated collection for slow living. Layered textures, warm lighting, and the perfect chair for losing yourself in a book.",
                            image: "/ShopTheSceneLiving.jpg",
                            products: CATEGORIES['living'].scenes[0].products
                        },
                        {
                            id: "evening-lounge",
                            tag: "Evening Mood",
                            title: <>The Evening<br />Lounge</>,
                            sidebarTitle: "The Evening Lounge",
                            description: "Deep tones and soft shadows. Create a space that invites conversation and calm as the day winds down.",
                            image: "/ShoptheSceneSofa.jpg",
                            products: CATEGORIES['sofas'].scenes[0].products
                        },
                        {
                            id: "minimalist-work",
                            tag: "Workspace",
                            title: <>Focused<br />Simplicity</>,
                            sidebarTitle: "Focused Simplicity",
                            description: "Clear lines for a clear mind. Designing a workspace that balances function with an inspiring aesthetic.",
                            image: "/ShopTheSceneOffice.jpg",
                            products: CATEGORIES['office'].scenes[0].products
                        },
                        {
                            id: "evening-feast",
                            tag: "Dining",
                            title: <>The Evening<br />Feast</>,
                            sidebarTitle: "The Evening Feast",
                            description: "Where conversations flow as freely as the wine. A setting designed for connection and culinary delight.",
                            image: "/ShopthesceneDining.jpg",
                            products: CATEGORIES['dining'].scenes[0].products
                        },
                        {
                            id: "garden-patio",
                            tag: "Nature's Retreat",
                            title: <>Garden<br />Patio</>,
                            sidebarTitle: "Garden Patio",
                            description: "Embrace the outdoors with comfort and style. A serene setting for fresh air and relaxation.",
                            image: "/ShopTheSceneOutdoor.avif",
                            products: CATEGORIES['outdoor'].scenes[0].products
                        }
                    ].map((scene) => (
                        <div key={scene.id} className="min-w-full h-full relative snap-start">
                            <div className="absolute inset-0">
                                <img
                                    src={scene.image}
                                    alt="Scene"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40" />
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
                                    onClick={() => {
                                        setActiveScene({
                                            products: scene.products,
                                            title: scene.sidebarTitle
                                        });
                                        setIsSidebarOpen(true);
                                    }}
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
                            {curatedProducts.map((product) => (
                                <a
                                    key={product.id}
                                    href={`/products/${product.id}`}
                                    className="min-w-[280px] md:min-w-[340px] snap-start group cursor-pointer"
                                >
                                    <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-black/5">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="text-center group-hover:opacity-80 transition-opacity">
                                        <h3 className="font-serif text-lg text-primary mb-1">{product.name}</h3>
                                        <p className="text-xs font-light text-gray-500 tracking-wide">{formatPrice(product.price)}</p>
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
