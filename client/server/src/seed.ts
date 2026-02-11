import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product';
import Space from './models/Space';

dotenv.config();

const products = [
    {
        name: "Eames Lounge Chair",
        description: "The Eames Lounge Chair and Ottoman lives in museums like MoMA in New York and the Art Institute of Chicago.",
        price: 1200,
        category: "Office",
        images: ["https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=800"],
        stock: 10,
        isFeatured: true
    },
    {
        name: "Oak Executive Desk",
        description: "Solid oak construction with a minimal profile.",
        price: 950,
        category: "Office",
        images: ["https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800"],
        stock: 5
    },
    {
        name: "Minimalist Floor Lamp",
        description: "Sleek brass finish floor lamp.",
        price: 350,
        category: "Living",
        images: ["https://images.unsplash.com/photo-1507473888900-52e1ad1459a8?auto=format&fit=crop&q=80&w=800"],
        stock: 20
    }
];

const spaces = [
    {
        name: "Modern Home Office",
        type: "Office",
        imageUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2000",
        hotspots: [] as any[] // logic to link products would go here
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/stayspace');
        console.log("Connected to DB");

        await Product.deleteMany({});
        await Space.deleteMany({});

        const createdProducts = await Product.insertMany(products);
        console.log("Products seeded");

        // Link products to hotspots for the space
        const officeSpace = spaces[0];
        officeSpace.hotspots = [
            {
                x: 35,
                y: 60,
                productId: createdProducts[0]._id // Chair
            },
            {
                x: 65,
                y: 70,
                productId: createdProducts[1]._id // Desk
            }
        ];

        await Space.create(officeSpace);
        console.log("Spaces seeded");

        mongoose.disconnect();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
