
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import { signTokens } from "./utils/jwt";
import { User } from "./models/User";

dotenv.config();
console.log(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_CALLBACK_URL)
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!, // e.g. http://localhost:3000/auth/google/callback
    },
    async (accessToken: string, refreshToken: string, profile: any, done: any) => {
      try {
        console.log("🔑 Google profile:", JSON.stringify(profile, null, 2));

        const { id, displayName, emails, photos } = profile;
        const email = emails?.[0]?.value;
        const photo = photos?.[0]?.value;

        if (!email) {
          return done(new Error("No email found in Google profile"), null);
        }

        // Find or create user
        let user = await User.findOne({ email });
        if (!user) {
          user = await User.create({
            email,
            googleId: id,
            name: displayName,
            avatar: photo,
          });
        } else {
          if (!user.googleId) {
            user.googleId = id;
            user.name = user.name || displayName;
            user.avatar = user.avatar || photo;
            await user.save();
          }
        }

        // ✅ Use consistent JWT signing from utils
        const { token, refreshToken: jwtRefreshToken } = signTokens(user._id.toString());

        return done(null, { user, token, refreshToken: jwtRefreshToken });
      } catch (err) {
        console.error("Passport Google strategy error:", err);
        return done(err, null);
      }
    }
  )
);

export default passport;
