"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface SpaceCardProps {
    id: string;
    title: string;
    href: string;
    image: string;
    hoveredSpace: string | null;
    setHoveredSpace: Dispatch<SetStateAction<string | null>>;
}

export default function SpaceCard({ id, title, href, image, hoveredSpace, setHoveredSpace }: SpaceCardProps) {
    const isHovered = hoveredSpace === id;
    const isBlur = hoveredSpace !== null && hoveredSpace !== id;

    return (
        <Link
            href={href}
            className={`relative group overflow-hidden h-[600px] block cursor-pointer transition-all duration-700 ease-out ${isBlur ? "opacity-40 scale-[0.98] blur-[2px] grayscale-[50%]" : "opacity-100 scale-100 blur-0 grayscale-0"}`}
            onMouseEnter={() => setHoveredSpace(id)}
            onMouseLeave={() => setHoveredSpace(null)}
        >
            <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
            />

            {/* Dark overlay */}
            <div className={`absolute inset-0 bg-black/20 transition-colors duration-700 ${isHovered ? "bg-black/40" : ""}`} />

            <div className="absolute bottom-10 left-10 text-white z-10 w-full pr-10">
                <h3 className="text-4xl font-display italic mb-4 drop-shadow-md transform transition-transform duration-700 group-hover:-translate-y-2">
                    {title}
                </h3>

                <div className="overflow-hidden">
                    <div className="flex items-center gap-4 text-xs uppercase tracking-widest border-b border-white/50 pb-2 w-max translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 ease-out">
                        <span>Explore Collection</span>
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </Link>
    );
}
