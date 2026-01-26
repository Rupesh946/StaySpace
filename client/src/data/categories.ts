
export interface Product {
    id: string | number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    description?: string;
    tag?: string;
    discount?: string;
    images?: string[];
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
                id: 'living-scene-new',
                title: 'Modern Serenity',
                image: '/ShopTheSceneLiving.jpg',
                products: [
                    { id: 'ls1', name: 'Modern Cream Sofa', price: 1800, image: '/Product1Sofa (2).png' },
                    { id: 'lp16', name: 'Textured Floor Rug', price: 580, image: '/Product16Living(rug) (1).png' },
                    { id: 'lp19', name: 'Low Profile Coffee Table', price: 880, image: '/Product19Living(table) (1).png' },
                    { id: 'lp12', name: 'Embroidered Throw Pillow', price: 65, image: '/Product12Living(pillow) (1).png' },
                ]
            }
        ],

        allProducts: [
            {
                id: 'ls1', name: 'Modern Cream Sofa', price: 1800, image: '/Product1Sofa (2).png',
                images: ['/Product1Sofa (2).png', '/Product1Sofa (3).png']
            },
            {
                id: 'lp1', name: 'Modern Lounge Chair', price: 1200, image: '/product1Living (4).png',
                images: ['/product1Living (4).png', '/product1Living (5).png', '/product1Living (6).png']
            },
            {
                id: 'lp2', name: 'Sleek Accent Chair', price: 950, image: '/product2Living (1).png',
                images: ['/product2Living (1).png', '/product2Living (2).png', '/product2Living (3).png', '/product2Living (4).png']
            },
            {
                id: 'lp3', name: 'Soft Area Rug', price: 450, image: '/Product3Living(rug) (1).png',
                images: ['/Product3Living(rug) (1).png', '/Product3Living(rug) (2).png', '/Product3Living(rug) (3).png']
            },
            {
                id: 'lp4', name: 'Modern Coffee Table', price: 890, image: '/Product4Living(table) (1).png',
                images: ['/Product4Living(table) (1).png', '/Product4Living(table) (2).png', '/Product4Living(table) (3).png', '/Product4Living(table) (4).png', '/Product4Living(table) (5).png']
            },
            {
                id: 'lp5', name: 'Plush Velvet Pillow', price: 55, image: '/Product5Living(pillow) (1).png',
                images: ['/Product5Living(pillow) (1).png', '/Product5Living(pillow) (2).png', '/Product5Living(pillow) (3).png']
            },
            {
                id: 'lp6', name: 'Wooden Side Table', price: 340, image: '/Product6Living(table) (1).png',
                images: ['/Product6Living(table) (1).png', '/Product6Living(table) (2).png', '/Product6Living(table) (3).png']
            },
            {
                id: 'lp7', name: 'Industrial Coffee Table', price: 780, image: '/Product7Living(table (1).png',
                images: ['/Product7Living(table (1).png', '/Product7Living(table (2).png', '/Product7Living(table (3).png', '/Product7Living(table (4).png', '/Product7Living(table (5).png', '/Product7Living(table (6).png']
            },
            {
                id: 'lp8', name: 'Minimalist Round Table', price: 560, image: '/product8Living(table) (1).png',
                images: ['/product8Living(table) (1).png', '/product8Living(table) (2).png', '/product8Living(table) (3).png', '/product8Living(table) (4).png', '/product8Living(table) (5).png']
            },
            {
                id: 'lp9', name: 'Nesting Tables', price: 670, image: '/Product9Living(table) (1).png',
                images: ['/Product9Living(table) (1).png', '/Product9Living(table) (2).png', '/Product9Living(table) (3).png', '/Product9Living(table) (4).png', '/Product9Living(table) (5).png']
            },
            {
                id: 'lp10', name: 'Geometric Side Table', price: 430, image: '/product10Living(table) (1).png',
                images: ['/product10Living(table) (1).png', '/product10Living(table) (2).png', '/product10Living(table) (3).png', '/product10Living(table) (4).png', '/product10Living(table) (5).png', '/product10Living(table) (6).png']
            },
            {
                id: 'lp11', name: 'Woven Jute Rug', price: 320, image: '/Product11Living(rug) (1).png',
                images: ['/Product11Living(rug) (1).png', '/Product11Living(rug) (2).png', '/Product11Living(rug) (3).png']
            },
            {
                id: 'lp12', name: 'Embroidered Throw Pillow', price: 65, image: '/Product12Living(pillow) (1).png',
                images: ['/Product12Living(pillow) (1).png', '/Product12Living(pillow) (2).png']
            },
            {
                id: 'lp13', name: 'Cotton Blend Pillow', price: 45, image: '/Product13Living(pillow) (1).png',
                images: ['/Product13Living(pillow) (1).png', '/Product13Living(pillow) (2).png']
            },
            {
                id: 'lp14', name: 'Decorative Accent Cushion', price: 75, image: '/Product14Living(pillow) (1).png',
                images: ['/Product14Living(pillow) (1).png', '/Product14Living(pillow) (2).png', '/Product14Living(pillow) (3).png']
            },
            {
                id: 'lp15', name: 'Glass Top Table', price: 1100, image: '/Product15Living(table) (1).png',
                images: ['/Product15Living(table) (1).png', '/Product15Living(table) (2).png', '/Product15Living(table) (3).png', '/Product15Living(table) (4).png']
            },
            {
                id: 'lp16', name: 'Textured Floor Rug', price: 580, image: '/Product16Living(rug) (1).png',
                images: ['/Product16Living(rug) (1).png', '/Product16Living(rug) (2).png']
            },
            {
                id: 'lp17', name: 'Rustic Wood Table', price: 920, image: '/Product17Living(table) (1).png',
                images: ['/Product17Living(table) (1).png', '/Product17Living(table) (2).png', '/Product17Living(table) (3).png', '/Product17Living(table) (4).png']
            },
            {
                id: 'lp18', name: 'Contemporary Center Table', price: 1450, image: '/Product18Living(table) (1).png',
                images: ['/Product18Living(table) (1).png', '/Product18Living(table) (2).png', '/Product18Living(table) (3).png', '/Product18Living(table) (4).png', '/Product18Living(table) (5).png', '/Product18Living(table) (6).png', '/Product18Living(table) (7).png']
            },
            {
                id: 'lp19', name: 'Low Profile Coffee Table', price: 880, image: '/Product19Living(table) (1).png',
                images: ['/Product19Living(table) (1).png', '/Product19Living(table) (2).png', '/Product19Living(table) (3).png', '/Product19Living(table) (4).png']
            },
            {
                id: 'lp20', name: 'Abstract Pattern Rug', price: 650, image: '/Product20Living(rug) (1).png',
                images: ['/Product20Living(rug) (1).png', '/Product20Living(rug) (2).png']
            },
            {
                id: 'lp21', name: 'Large Area Rug', price: 900, image: '/Product21Living(rug) (1).png',
                images: ['/Product21Living(rug) (1).png', '/Product21Living(rug) (2).png']
            },
            {
                id: 'lp22', name: 'Cozy Bedroom Rug', price: 400, image: '/Product22Living(rug) (1).png',
                images: ['/Product22Living(rug) (1).png', '/Product22Living(rug) (2).png', '/Product22Living(rug) (3).png']
            },
            {
                id: 'lp23', name: 'Square Throw Pillow', price: 50, image: '/Product23Living(pillow) (1).png',
                images: ['/Product23Living(pillow) (1).png', '/Product23Living(pillow) (2).png', '/Product23Living(pillow) (3).png']
            },
            {
                id: 'lp24', name: 'Compact Side Table', price: 290, image: '/Product24Living(table) (1).png',
                images: ['/Product24Living(table) (1).png', '/Product24Living(table) (2).png', '/Product24Living(table) (3).png']
            }
        ]
    },
    bedroom: {
        id: 'bedroom',
        title: 'Bedroom',
        intro: 'Sanctuary for the end of the day.',
        scenes: [
            {
                id: 'bedroom-scene-new',
                title: 'Serene Sanctuary',
                image: '/Shopthescene bedroom.png',
                products: [
                    { id: 'bp1', name: 'Modern Platform Bed', price: 1200, image: '/Product1Bedroom(bed) (1).png' },
                    { id: 'bp2', name: 'Minimalist Bedside Lamp', price: 150, image: '/Product3Bedroom(lamp) (1).png' },
                    { id: 'bp3', name: 'Soft Texture Rug', price: 300, image: '/Product5Bedroom(floormat) (1).png' },
                    { id: 'bp4', name: 'Oak Storage Cupboard', price: 850, image: '/Product2Bedroom(cupboard) (1).png' },
                ]
            }
        ],
        allProducts: [
            {
                id: 'bp1', name: 'Modern Platform Bed', price: 1200, image: '/Product1Bedroom(bed) (1).png',
                images: ['/Product1Bedroom(bed) (1).png', '/Product1Bedroom(bed) (2).png', '/Product1Bedroom(bed) (3).png', '/Product1Bedroom(bed) (4).png']
            },
            {
                id: 'bp2', name: 'Minimalist Bedside Lamp', price: 150, image: '/Product3Bedroom(lamp) (1).png',
                images: ['/Product3Bedroom(lamp) (1).png', '/Product3Bedroom(lamp) (2).png', '/Product3Bedroom(lamp) (3).png', '/Product3Bedroom(lamp) (4).png']
            },
            {
                id: 'bp3', name: 'Soft Texture Rug', price: 300, image: '/Product5Bedroom(floormat) (1).png',
                images: ['/Product5Bedroom(floormat) (1).png', '/Product5Bedroom(floormat) (2).png', '/Product5Bedroom(floormat) (3).png']
            },
            {
                id: 'bp4', name: 'Oak Storage Cupboard', price: 850, image: '/Product2Bedroom(cupboard) (1).png',
                images: ['/Product2Bedroom(cupboard) (1).png', '/Product2Bedroom(cupboard) (2).png', '/Product2Bedroom(cupboard) (3).png', '/Product2Bedroom(cupboard) (4).png']
            },
            {
                id: 'bp5', name: 'Contemporary Table Lamp', price: 180, image: '/Product4Bedroom(lamp) (1).png',
                images: ['/Product4Bedroom(lamp) (1).png', '/Product4Bedroom(lamp) (2).png', '/Product4Bedroom(lamp) (3).png', '/Product4Bedroom(lamp) (4).png']
            },
            {
                id: 'bp6', name: 'Tall Storage Unit', price: 950, image: '/Product6Bedroom(cupboard) (1).png',
                images: ['/Product6Bedroom(cupboard) (1).png', '/Product6Bedroom(cupboard) (2).png', '/Product6Bedroom(cupboard) (3).png']
            },
            {
                id: 'bp7', name: 'Wide Wardrobe', price: 1500, image: '/Product7Bedroom(cupboard) (1).png',
                images: ['/Product7Bedroom(cupboard) (1).png', '/Product7Bedroom(cupboard) (2).png']
            },
            {
                id: 'bp8', name: 'compact Bedside Table', price: 250, image: '/Product8Bedroom(cupboard) (1).png',
                images: ['/Product8Bedroom(cupboard) (1).png', '/Product8Bedroom(cupboard) (2).png', '/Product8Bedroom(cupboard) (3).png', '/Product8Bedroom(cupboard) (4).png', '/Product8Bedroom(cupboard) (5).png']
            },
            {
                id: 'bp9', name: 'Elegant Reading Lamp', price: 210, image: '/Product9Bedroom(lamp) (1).png',
                images: ['/Product9Bedroom(lamp) (1).png', '/Product9Bedroom(lamp) (2).png', '/Product9Bedroom(lamp) (3).png', '/Product9Bedroom(lamp) (4).png']
            },
            {
                id: 'bp10', name: 'Decorative Storage Box', price: 45, image: '/Product10Bedroom(Box) (1).png',
                images: ['/Product10Bedroom(Box) (1).png', '/Product10Bedroom(Box) (2).png', '/Product10Bedroom(Box) (3).png', '/Product10Bedroom(Box) (4).png']
            },
            {
                id: 'bp11', name: 'Luxury Upholstered Bed', price: 2200, image: '/Product11Bedroom(bed) (1).png',
                images: ['/Product11Bedroom(bed) (1).png', '/Product11Bedroom(bed) (2).png', '/Product11Bedroom(bed) (3).png', '/Product11Bedroom(bed) (4).png', '/Product11Bedroom(bed) (5).png']
            }
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
                id: 'dining-scene-1',
                title: 'Evening Feast',
                image: '/ShopthesceneDining.jpg',
                products: [
                    { id: 'dp1', name: 'Marble Top Dining Table', price: 2400, image: '/Product1Dining(dtable) (1).png' },
                    { id: 'dp2', name: 'Oak Farmhouse Table', price: 1800, image: '/Product2Dining(dtable) (1).png' },
                    { id: 'dp3', name: 'Round Walnut Table', price: 1200, image: '/Product3Dining(table) (1).png' },
                    { id: 'dp4', name: 'Modern Glass Set', price: 3200, image: '/Product4Dining(table) (1).png' },
                ]
            }
        ],
        allProducts: [
            {
                id: 'dp1', name: 'Marble Top Dining Table', price: 2400, image: '/Product1Dining(dtable) (1).png',
                images: ['/Product1Dining(dtable) (1).png', '/Product1Dining(dtable) (2).png', '/Product1Dining(dtable) (3).png', '/Product1Dining(dtable) (4).png']
            },
            {
                id: 'dp2', name: 'Oak Farmhouse Table', price: 1800, image: '/Product2Dining(dtable) (1).png',
                images: ['/Product2Dining(dtable) (1).png', '/Product2Dining(dtable) (2).png', '/Product2Dining(dtable) (3).png', '/Product2Dining(dtable) (4).png', '/Product2Dining(dtable) (5).png']
            },
            {
                id: 'dp3', name: 'Round Walnut Table', price: 1200, image: '/Product3Dining(table) (1).png',
                images: ['/Product3Dining(table) (1).png', '/Product3Dining(table) (2).png', '/Product3Dining(table) (3).png', '/Product3Dining(table) (4).png']
            },
            {
                id: 'dp4', name: 'Modern Glass Set', price: 3200, image: '/Product4Dining(table) (1).png',
                images: ['/Product4Dining(table) (1).png', '/Product4Dining(table) (2).png', '/Product4Dining(table) (3).png', '/Product4Dining(table) (4).png', '/Product4Dining(table) (5).png']
            },
            {
                id: 'dp5', name: 'Minimalist Dining Chair', price: 350, image: '/Product5Dining(table) (1).png',
                images: ['/Product5Dining(table) (1).png', '/Product5Dining(table) (2).png', '/Product5Dining(table) (3).png', '/Product5Dining(table) (4).png', '/Product5Dining(table) (5).png']
            },
            {
                id: 'dp6', name: 'Large Banquet Table', price: 4200, image: '/Product6Dining(table) (1).png',
                images: ['/Product6Dining(table) (1).png', '/Product6Dining(table) (2).png', '/Product6Dining(table) (3).png', '/Product6Dining(table) (4).png', '/Product6Dining(table) (5).png']
            },
            {
                id: 'dp7', name: 'Rustic Wooden Table', price: 2100, image: '/Product7Dining(table) (1).png',
                images: ['/Product7Dining(table) (1).png', '/Product7Dining(table) (2).png', '/Product7Dining(table) (3).png', '/Product7Dining(table) (4).png']
            },
            {
                id: 'dp8', name: 'Compact Dining Set', price: 1500, image: '/Product8Dining(table) (1).png',
                images: ['/Product8Dining(table) (1).png', '/Product8Dining(table) (2).png', '/Product8Dining(table) (3).png', '/Product8Dining(table) (4).png']
            },
            {
                id: 'dp9', name: 'Extendable Family Table', price: 2800, image: '/Product9Dining(table) (1).png',
                images: ['/Product9Dining(table) (1).png', '/Product9Dining(table) (2).png', '/Product9Dining(table) (3).png', '/Product9Dining(table) (4).png', '/Product9Dining(table) (5).png']
            }
        ]
    }
};
