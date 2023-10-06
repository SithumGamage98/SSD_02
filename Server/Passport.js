// Configure Passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User'); // Replace with your user model

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback', // This should match your configured redirect URI
    },
    async (accessToken, refreshToken, profile, done) => {
      // Check if the user already exists in your database or create a new user
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const newUser = new User({
        googleId: profile.id,
        displayName: profile.displayName,
        // Add other user information as needed
      });
      await newUser.save();
      done(null, newUser);
    }
  )
);

// Set up Passport.js session serialization and deserialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
