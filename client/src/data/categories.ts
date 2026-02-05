
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
                id: 'office-scene-new',
                title: 'Executive Workspace',
                image: '/ShopTheSceneOffice.jpg',
                products: [
                    { id: 'op3', name: 'Ergonomic Office Chair', price: 450, image: '/Product3Office(chair) (1).png' },
                    { id: 'op4', name: 'Modern Executive Desk', price: 1200, image: '/Product4Office(table) (1).png' },
                    { id: 'op1', name: 'Desk Essentials Set', price: 120, image: '/Product1Office(essentials) (1).png' },
                    { id: 'op2', name: 'Office Organizer', price: 85, image: '/Product2Office(essentials) (1).png' },
                ]
            }
        ],
        allProducts: [
            {
                id: 'op1', name: 'Desk Essentials Set', price: 120, image: '/Product1Office(essentials) (1).png',
                images: ['/Product1Office(essentials) (1).png', '/Product1Office(essentials) (2).png', '/Product1Office(essentials) (3).png', '/Product1Office(essentials) (4).png']
            },
            {
                id: 'op2', name: 'Office Organizer', price: 85, image: '/Product2Office(essentials) (1).png',
                images: ['/Product2Office(essentials) (1).png', '/Product2Office(essentials) (2).png', '/Product2Office(essentials) (3).png', '/Product2Office(essentials) (4).png', '/Product2Office(essentials)(5).png']
            },
            {
                id: 'op3', name: 'Ergonomic Office Chair', price: 450, image: '/Product3Office(chair) (1).png',
                images: ['/Product3Office(chair) (1).png', '/Product3Office(chair) (2).png', '/Product3Office(chair) (3).png', '/Product3Office(chair) (4).png']
            },
            {
                id: 'op4', name: 'Modern Executive Desk', price: 1200, image: '/Product4Office(table) (1).png',
                images: ['/Product4Office(table) (1).png', '/Product4Office(table) (2).png', '/Product4Office(table) (3).png', '/Product4Office(table) (4).png', '/Product4Office(table) (5).png']
            },
            {
                id: 'op5', name: 'Minimalist Work Table', price: 800, image: '/Product5Office(table) (1).png',
                images: ['/Product5Office(table) (1).png', '/Product5Office(table) (2).png', '/Product5Office(table) (3).png', '/Product5Office(table) (4).png', '/Product5Office(table) (5).png']
            },
            {
                id: 'op6', name: 'Executive Leather Chair', price: 650, image: '/Product6Office(chair) (1).png',
                images: ['/Product6Office(chair) (1).png', '/Product6Office(chair) (2).png', '/Product6Office(chair) (3).png', '/Product6Office(chair) (4).png', '/Product6Office(chair) (5).png', '/Product6Office(chair) (6).png']
            },
            {
                id: 'op7', name: 'Stationery Set', price: 45, image: '/Product7Office(essentials) (1).png',
                images: ['/Product7Office(essentials) (1).png', '/Product7Office(essentials) (2).png', '/Product7Office(essentials) (3).png', '/Product7Office(essentials) (4).png']
            },
            {
                id: 'op8', name: 'Corner Desk', price: 950, image: '/Product8Office(table) (1).png',
                images: ['/Product8Office(table) (1).png', '/Product8Office(table) (2).png', '/Product8Office(table) (3).png', '/Product8Office(table) (4).png', '/Product8Office(table) (5).png']
            },
            {
                id: 'op9', name: 'Study Table', price: 550, image: '/Product9office(table) (1).png',
                images: ['/Product9office(table) (1).png', '/Product9office(table) (2).png', '/Product9office(table) (3).png', '/Product9office(table) (4).png']
            },
            {
                id: 'op10', name: 'Compact Office Desk', price: 400, image: '/Product10Office(table) (1).png',
                images: ['/Product10Office(table) (1).png', '/Product10Office(table) (2).png', '/Product10Office(table) (3).png', '/Product10Office(table) (4).png']
            }
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
                id: 'sofa-scene-new',
                title: 'The Comfort Zone',
                image: '/ShoptheSceneSofa.jpg',
                products: [
                    { id: 'sf1', name: 'Cloud Comfort Sofa', price: 2100, image: '/Product1Sofa (1).png' },
                    { id: 'sf2', name: 'Contemporary Grey Sectional', price: 1850, image: '/Product2Sofa (1).png' },
                    { id: 'sf4', name: 'Luxe Velvet 3-Seater', price: 2300, image: '/Product4Sofa (1).png' },
                    { id: 'sf5', name: 'Minimalist Modular Sofa', price: 1950, image: '/Product5Sofa (1).png' },
                ]
            }
        ],
        allProducts: [
            {
                id: 'sf1', name: 'Cloud Comfort Sofa', price: 2100, image: '/Product1Sofa (1).png',
                images: ['/Product1Sofa (1).png', '/Product1Sofa (2).png', '/Product1Sofa (3).png', '/Product1Sofa (4).png', '/Product1Sofa (5).png']
            },
            {
                id: 'sf2', name: 'Contemporary Grey Sectional', price: 1850, image: '/Product2Sofa (1).png',
                images: ['/Product2Sofa (1).png', '/Product2Sofa (2).png', '/Product2Sofa (3).png', '/Product2Sofa (4).png']
            },
            {
                id: 'sf3', name: 'Beige Lounge Sofa', price: 1600, image: '/Product3Sofa (1).png',
                images: ['/Product3Sofa (1).png', '/Product3Sofa (2).png', '/Product3Sofa (3).png', '/Product3Sofa (4).png', '/Product3Sofa (5).png', '/Product3Sofa (6).png']
            },
            {
                id: 'sf4', name: 'Luxe Velvet 3-Seater', price: 2300, image: '/Product4Sofa (1).png',
                images: ['/Product4Sofa (1).png', '/Product4Sofa (2).png', '/Product4Sofa (3).png', '/Product4Sofa (4).png', '/Product4Sofa (5).png']
            },
            {
                id: 'sf5', name: 'Minimalist Modular Sofa', price: 1950, image: '/Product5Sofa (1).png',
                images: ['/Product5Sofa (1).png', '/Product5Sofa (2).png', '/Product5Sofa (3).png', '/Product5Sofa (4).png', '/Product5Sofa (5).png']
            },
            {
                id: 'sf6', name: 'Modern Loveseat', price: 1200, image: '/Product6Sofa (1).png',
                images: ['/Product6Sofa (1).png', '/Product6Sofa (2).png', '/Product6Sofa (3).png', '/Product6Sofa (4).png']
            },
            {
                id: 'sf7', name: 'Bold Accent Sofa', price: 1750, image: '/Product7Sofa (1).png',
                images: ['/Product7Sofa (1).png', '/Product7Sofa (2).png', '/Product7Sofa (3).png', '/Product7Sofa (4).png']
            },
            {
                id: 'sf8', name: 'Classic Family Sofa', price: 1450, image: '/Product8Sofa (1).png',
                images: ['/Product8Sofa (1).png', '/Product8Sofa (2).png', '/Product8Sofa (3).png', '/Product8Sofa (4).png', '/Product8Sofa (5).png', '/Product8Sofa (6).png']
            }
        ]
    },
    outdoor: {
        id: 'outdoor',
        title: 'Outdoor',
        intro: 'Extension of your living space into nature.',
        scenes: [
            {
                id: 'outdoor-scene-new',
                title: 'Garden Patio',
                image: '/ShopTheSceneOutdoor.avif',
                products: [
                    { id: 'od2', name: 'Patio Dining Set', price: 1200, image: '/Product2Outdoor(tableChair) (1).png' },
                    { id: 'od4', name: 'Classic Garden Bench', price: 450, image: '/Product4Outdoor(bench) (1).png' },
                    { id: 'od7', name: 'Pathway Lighting', price: 120, image: '/Product7Outdoor(lighting) (1).png' },
                    { id: 'od9', name: 'Rustic Bench', price: 380, image: '/Product9outdoor(bench) (1).png' },
                ]
            }
        ],
        allProducts: [
            {
                id: 'od1', name: 'Outdoor Floor Tiles', price: 85, image: '/Product1Outdoor(floor)(1).png',
                images: ['/Product1Outdoor(floor)(1).png', '/Product1Outdoor(floor) (2).png', '/Product1Outdoor(floor) (3).png', '/Product1Outdoor(floor) (4).png', '/Product1Outdoor(floor) (5).png']
            },
            {
                id: 'od2', name: 'Patio Dining Set', price: 1200, image: '/Product2Outdoor(tableChair) (1).png',
                images: ['/Product2Outdoor(tableChair) (1).png', '/Product2Outdoor(tableChair) (2).png', '/Product2Outdoor(tableChair) (3).png', '/Product2Outdoor(tableChair) (4).png', '/Product2Outdoor(tableChair) (5).png']
            },
            {
                id: 'od3', name: 'Garden Table', price: 550, image: '/Product3Outdoor(table) (1).png',
                images: ['/Product3Outdoor(table) (1).png', '/Product3Outdoor(table) (2).png', '/Product3Outdoor(table) (3).png', '/Product3Outdoor(table) (4).png']
            },
            {
                id: 'od4', name: 'Classic Garden Bench', price: 450, image: '/Product4Outdoor(bench) (1).png',
                images: ['/Product4Outdoor(bench) (1).png', '/Product4Outdoor(bench) (2).png', '/Product4Outdoor(bench) (3).png', '/Product4Outdoor(bench) (4).png', '/Product4Outdoor(bench) (5).png', '/Product4Outdoor(bench) (6).png']
            },
            {
                id: 'od5', name: 'Modern Bench', price: 320, image: '/Product5Outdoor(bench) (1).png',
                images: ['/Product5Outdoor(bench) (1).png', '/Product5Outdoor(bench) (2).png', '/Product5Outdoor(bench) (3).png']
            },
            {
                id: 'od6', name: 'Bistro Set', price: 280, image: '/Product6Outdoor(tablechair) (1).png',
                images: ['/Product6Outdoor(tablechair) (1).png', '/Product6Outdoor(tablechair) (2).png']
            },
            {
                id: 'od7', name: 'Pathway Lighting', price: 120, image: '/Product7Outdoor(lighting) (1).png',
                images: ['/Product7Outdoor(lighting) (1).png', '/Product7Outdoor(lighting) (2).png', '/Product7Outdoor(lighting) (3).png', '/Product7Outdoor(lighting) (4).png', '/Product7Outdoor(lighting) (5).png']
            },
            {
                id: 'od8', name: 'Hanging Outdoor Light', price: 95, image: '/Product8Outdoor(Lighitng) (1).png',
                images: ['/Product8Outdoor(Lighitng) (1).png', '/Product8Outdoor(Lighitng) (2).png', '/Product8Outdoor(Lighitng) (3).png']
            },
            {
                id: 'od9', name: 'Rustic Bench', price: 380, image: '/Product9outdoor(bench) (1).png',
                images: ['/Product9outdoor(bench) (1).png', '/Product9outdoor(bench) (2).png', '/Product9outdoor(bench) (3).png', '/Product9outdoor(bench) (4).png', '/Product9outdoor(bench) (5).png']
            }
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
