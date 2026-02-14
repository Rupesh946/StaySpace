import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const CLIENT_URL = process.env.CLIENT_URL;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    console.warn('Missing Google OAuth Credentials in .env');
}

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID || 'MISSING_ID',
            clientSecret: GOOGLE_CLIENT_SECRET || 'MISSING_SECRET',
            callbackURL: '/api/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if user exists with googleId
                let user = await User.findOne({ googleId: profile.id });

                if (user) {
                    return done(null, user);
                }

                // Check if user exists with email (link account)
                const email = profile.emails?.[0]?.value;
                if (!email) {
                    return done(new Error('No email found from Google profile'));
                }

                user = await User.findOne({ email });

                if (user) {
                    // Link Google account to existing user
                    user.googleId = profile.id;
                    if (!user.avatar && profile.photos?.[0]?.value) {
                        user.avatar = profile.photos[0].value;
                    }
                    await user.save();
                    return done(null, user);
                }

                // Create new user
                user = await User.create({
                    name: profile.displayName,
                    email: email,
                    googleId: profile.id,
                    avatar: profile.photos?.[0]?.value,
                    isEmailVerified: true, // Google verified
                });

                return done(null, user);
            } catch (error) {
                return done(error as any, undefined);
            }
        }
    )
);

// Serialize/Deserialize not needed for JWT-based auth, but kept for robust passport setup if sessions used later
passport.serializeUser((user: any, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

export default passport;
