"use client";

import Navbar from "@/components/Navbar";
import SceneViewer from "@/components/SceneViewer";
import { useParams } from "next/navigation";

// Mock data - In real app, fetch from API based on params.id
const MOCK_SPACE = {
    id: "office",
    name: "Modern Home Office",
    imageUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2000",
    hotspots: [
        {
            id: "1",
            x: 35,
            y: 60,
            product: {
                id: "p1",
                name: "Eames Task Chair",
                price: 450,
                image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=800",
                description: "Ergonomic comfort meets mid-century modern design. The perfect addition to your workspace."
            }
        },
        {
            id: "2",
            x: 65,
            y: 70,
            product: {
                id: "p2",
                name: "Oak Executive Desk",
                price: 1200,
                image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800",
                description: "Solid oak construction with a minimal profile. Spacious surface for all your creative work."
            }
        }
    ]
};

export default function SpacePage({ params }: { params: { id: string } }) {
    // In a real app, use params.id to fetch data

    return (
        <main className="min-h-screen pt-20">
            <Navbar />

            <section className="bg-white">
                <div className="text-center py-10">
                    <span className="text-sm uppercase tracking-widest text-gray-500">Space</span>
                    <h1 className="text-4xl font-serif mt-2 capitalize">{params.id} Collection</h1>
                </div>

                <SceneViewer
                    imageUrl={MOCK_SPACE.imageUrl}
                    hotspots={MOCK_SPACE.hotspots}
                />
            </section>

            <section className="max-w-7xl mx-auto px-6 py-20">
                <h2 className="text-2xl font-serif mb-8">All Products in {params.id}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {/* Mock Product Grid */}
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
                                <img
                                    src={`https://source.unsplash.com/random/400x500/?furniture,${params.id},${i}`}
                                    alt="Product"
                                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                />
                            </div>
                            <h3 className="font-medium">Minimal Decoration Item</h3>
                            <p className="text-gray-500 mt-1">$120.00</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
