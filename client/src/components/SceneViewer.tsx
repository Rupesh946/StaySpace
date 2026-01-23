"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
}

interface Hotspot {
    id: string;
    x: number; // percentage
    y: number; // percentage
    product: Product;
}

interface SceneViewerProps {
    imageUrl: string;
    hotspots: Hotspot[];
}

export default function SceneViewer({ imageUrl, hotspots }: SceneViewerProps) {
    const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);

    return (
        <div className="relative w-full h-[80vh] bg-background overflow-hidden">
            {/* Scene Image */}
            <img
                src={imageUrl}
                alt="Room Scene"
                className="w-full h-full object-cover"
            />

            {/* Hotspots */}
            {hotspots.map((hotspot) => (
                <button
                    key={hotspot.id}
                    onClick={() => setSelectedHotspot(hotspot)}
                    className="absolute w-8 h-8 -ml-4 -mt-4 bg-white/90 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer group z-10"
                    style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                >
                    <Plus className="w-5 h-5 text-gray-800 group-hover:text-accent transition-colors" />
                    {/* Pulsing effect */}
                    <span className="absolute inset-0 rounded-full bg-white opacity-50 animate-ping" />
                </button>
            ))}

            {/* Product Side Panel */}
            <AnimatePresence>
                {selectedHotspot && (
                    <>
                        {/* Backdrop to close */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedHotspot(null)}
                            className="absolute inset-0 bg-black/20 z-20"
                        />

                        {/* Panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute right-0 top-0 bottom-0 w-full md:w-96 bg-white shadow-2xl z-30 p-8 flex flex-col"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-2xl font-serif">Product Details</h3>
                                <button onClick={() => setSelectedHotspot(null)} className="p-2 hover:bg-gray-100 rounded-full">
                                    <Plus className="w-6 h-6 rotate-45" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto">
                                <div className="aspect-square bg-black/5 mb-6 rounded-lg overflow-hidden">
                                    <img
                                        src={selectedHotspot.product.image}
                                        alt={selectedHotspot.product.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h4 className="text-xl font-medium mb-2">{selectedHotspot.product.name}</h4>
                                <p className="text-2xl font-serif mb-4">${selectedHotspot.product.price}</p>
                                <p className="text-gray-600 leading-relaxed mb-8">
                                    {selectedHotspot.product.description}
                                </p>
                            </div>

                            <button className="w-full py-4 bg-black text-white hover:bg-accent hover:text-white transition-colors font-medium text-lg uppercase tracking-wide">
                                Add to Cart
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
