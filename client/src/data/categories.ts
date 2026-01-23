
export interface Product {
    id: string | number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    description?: string;
    tag?: string;
    discount?: string;
}

export interface Scene {
    id: string;
    title: string; // e.g. "Morning Focus"
    image: string;
    products: Product[];
    hotspots?: { x: number; y: number; productId: string | number }[]; // Optional
}

export interface CategoryData {
    id: string;
    title: string; // e.g. "Office"
    intro: string; // e.g. "Designed for focus and quiet intention."
    scenes: Scene[];
    allProducts: Product[];
}

export const CATEGORIES: Record<string, CategoryData> = {
    office: {
        id: 'office',
        title: 'Office',
        intro: 'Designed for focus and quiet intention.',
        scenes: [
            {
                id: 'office-1',
                title: 'Morning Focus',
                image: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?q=80&w=2000&auto=format&fit=crop',
                products: [
                    { id: 'o1', name: 'Eames Task Chair', price: 450, image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&q=80&w=400' },
                    { id: 'o2', name: 'Oak Executive Desk', price: 1200, image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=400' },
                    { id: 'o3', name: 'Anglepoise Lamp', price: 180, image: 'https://images.unsplash.com/photo-1534349762230-e73715c6d3bc?auto=format&fit=crop&q=80&w=400' }
                ]
            },
            {
                id: 'office-2',
                title: 'Creative Studio',
                image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2000&auto=format&fit=crop',
                products: [
                    { id: 'o4', name: 'Drafting Stool', price: 220, image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=400' },
                    { id: 'o5', name: 'Wide Plan Chest', price: 950, image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=400' }
                ]
            }
        ],
        allProducts: [
            { id: 'o1', name: 'Eames Task Chair', price: 450, image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&q=80&w=600' },
            { id: 'o2', name: 'Oak Executive Desk', price: 1200, image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=600' },
            { id: 'o3', name: 'Anglepoise Lamp', price: 180, image: 'https://images.unsplash.com/photo-1534349762230-e73715c6d3bc?auto=format&fit=crop&q=80&w=600' },
            { id: 'o4', name: 'Drafting Stool', price: 220, image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=600' },
            { id: 'o5', name: 'Wide Plan Chest', price: 950, image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=600' },
            { id: 'o6', name: 'Leather Desk Pad', price: 85, image: 'https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&q=80&w=600' },
            { id: 'o7', name: 'Ceramic Pen Pot', price: 45, image: 'https://images.unsplash.com/photo-1515542706979-33d526e838b3?auto=format&fit=crop&q=80&w=600' },
            { id: 'o8', name: 'Minimalist Bookshelf', price: 650, image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&q=80&w=600' }
        ]
    },
    living: {
        id: 'living',
        title: 'Living',
        intro: 'A gathering place for stories and rest.',
        scenes: [
            {
                id: 'living-1',
                title: 'Golden Hour',
                image: 'https://images.unsplash.com/photo-1616486338812-3aeee037a9ec?q=80&w=2600&auto=format&fit=crop',
                products: [
                    { id: 'l1', name: 'Lana Three Seater', price: 2100, image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&q=80&w=400' },
                    { id: 'l2', name: 'Alabaster Coffee Table', price: 890, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=400' },
                    { id: 'l3', name: 'Velvet Throw Pillow', price: 55, image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?auto=format&fit=crop&q=80&w=400' }
                ]
            },
            {
                id: 'living-2',
                title: 'Evening Lounge',
                image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=2600&auto=format&fit=crop',
                products: [
                    { id: 'l4', name: 'Modular Sectional', price: 3200, image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=400' },
                    { id: 'l5', name: 'Brass Floor Lamp', price: 340, image: 'https://images.unsplash.com/photo-1513506003011-3b03c80165bd?auto=format&fit=crop&q=80&w=400' }
                ]
            }
        ],
        allProducts: [
            { id: 'l1', name: 'Lana Three Seater', price: 2100, image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&q=80&w=600' },
            { id: 'l2', name: 'Alabaster Coffee Table', price: 890, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600' },
            { id: 'l3', name: 'Velvet Throw Pillow', price: 55, image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?auto=format&fit=crop&q=80&w=600' },
            { id: 'l4', name: 'Modular Sectional', price: 3200, image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=600' },
            { id: 'l5', name: 'Brass Floor Lamp', price: 340, image: 'https://images.unsplash.com/photo-1513506003011-3b03c80165bd?auto=format&fit=crop&q=80&w=600' },
            { id: 'l6', name: 'Area Rug - Wool', price: 750, image: 'https://images.unsplash.com/photo-1575414003591-ece8d0416c7a?auto=format&fit=crop&q=80&w=600' },
            { id: 'l7', name: 'Wall Mirror', price: 210, image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=600' },
            { id: 'l8', name: 'Media Console', price: 1400, image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&q=80&w=600' }
        ]
    },
    bedroom: {
        id: 'bedroom',
        title: 'Bedroom',
        intro: 'Sanctuary for the end of the day.',
        scenes: [
            {
                id: 'bed-1',
                title: 'Soft Morning',
                image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=2600&auto=format&fit=crop',
                products: [
                    { id: 'b1', name: 'Linen Duvet Set', price: 280, image: "https://images.unsplash.com/photo-1522771753035-4a503f389f46?auto=format&fit=crop&q=80&w=400" },
                    { id: 'b2', name: 'Oak Nightstand', price: 350, image: "https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?auto=format&fit=crop&q=80&w=400" }
                ]
            }
        ],
        allProducts: [
            { id: 'b1', name: 'Linen Duvet Set', price: 280, image: "https://images.unsplash.com/photo-1522771753035-4a503f389f46?auto=format&fit=crop&q=80&w=600" },
            { id: 'b2', name: 'Oak Nightstand', price: 350, image: "https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?auto=format&fit=crop&q=80&w=600" },
            { id: 'b3', name: 'Ceramic Table Lamp', price: 120, image: "https://images.unsplash.com/photo-1507473885765-e6ed058b7832?auto=format&fit=crop&q=80&w=600" }
        ]
    },
    sofas: {
        id: 'sofas',
        title: 'Sofas',
        intro: 'The centerpiece of your living space.',
        scenes: [
            {
                id: 'sofa-1',
                title: 'The Central Piece',
                image: 'https://images.unsplash.com/photo-1550226891-ef816aed4a98?q=80&w=2600&auto=format&fit=crop',
                products: [
                    { id: 's1', name: 'Velvet Chesterfield', price: 2400, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=400" }
                ]
            }
        ],
        allProducts: [
            { id: 's1', name: 'Velvet Chesterfield', price: 2400, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600" },
            { id: 's2', name: 'Modern Sectional', price: 1800, image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=600" }
        ]
    },
    outdoor: {
        id: 'outdoor',
        title: 'Outdoor',
        intro: 'Extension of your living space into nature.',
        scenes: [
            {
                id: 'out-1',
                title: 'Garden Patio',
                image: 'https://images.unsplash.com/photo-1599619351208-3e6c839d6828?q=80&w=2600&auto=format&fit=crop',
                products: [
                    { id: 'od1', name: 'Teak Lounge Chair', price: 650, image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=400" }
                ]
            }
        ],
        allProducts: [
            { id: 'od1', name: 'Teak Lounge Chair', price: 650, image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=600" }
        ]
    },
    dining: {
        id: 'dining',
        title: 'Dining',
        intro: 'Where conversations and meals are shared.',
        scenes: [
            {
                id: 'dine-1',
                title: 'Family Feast',
                image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=2600&auto=format&fit=crop',
                products: [
                    { id: 'd1', name: 'Solid Walnut Table', price: 2200, image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=400" },
                    { id: 'd2', name: 'Fabric Dining Chair', price: 320, image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=400" }
                ]
            }
        ],
        allProducts: [
            { id: 'd1', name: 'Solid Walnut Table', price: 2200, image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=600" },
            { id: 'd2', name: 'Fabric Dining Chair', price: 320, image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=600" }
        ]
    }
};
