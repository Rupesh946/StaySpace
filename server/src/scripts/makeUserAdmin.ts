import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';

dotenv.config();

const makeUserAdmin = async () => {
    const email = process.argv[2];

    if (!email) {
        console.error('Please provide an email address as an argument.');
        console.log('Usage: npx ts-node src/scripts/makeUserAdmin.ts <email>');
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/stayspace');
        console.log("Connected to DB");

        const user = await User.findOne({ email });

        if (!user) {
            console.error(`User with email ${email} not found.`);
            process.exit(1);
        }

        user.role = 'admin';
        await user.save();

        console.log(`Successfully updated user ${user.name} (${user.email}) to ADMIN role.`);

        mongoose.disconnect();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

makeUserAdmin();
