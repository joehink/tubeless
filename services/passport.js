const passport = require('passport');
const YoutubeV3Strategy = require('passport-youtube-v3').Strategy
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users')

// For security, passport encrypts user
passport.serializeUser((user, done) => {
    done(null, user.id);
})

// Passport unscrambles secure user data
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id)
    done(null, user);
})

// Create YouTube passport strategy
// Strategy is what handles the auth process
passport.use(new YoutubeV3Strategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: keys.callbackURL,
    scope: ['https://www.googleapis.com/auth/youtube.readonly'],
    authorizationParams: {
      access_type : 'offline'
    }
}, (accessToken, refreshToken, profile, done) => {
    process.nextTick(async () => {
      // Take profile ID returned from auth process
      // Use it to find the user in our db with that ID
      let existingUser = await User.findOne({ googleID: profile.id });

      // If there is a user in our db with that ID
      if (existingUser) {
        existingUser = await User.findByIdAndUpdate(existingUser.id, { accessToken, refreshToken })
          return done(null, existingUser);
      }

      // If there is not an existing user, create a new one
      const user = await new User({
          googleID: profile.id,
          profileIMG: profile._json.items[0].snippet.thumbnails.default.url,
          accessToken: accessToken,
          refreshToken: refreshToken
      }).save();

      done(null, user);
    });
  })
)
