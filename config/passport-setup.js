const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

passport.use(
    new GoogleStrategy({
        callbackURL: '/users/auth/google/redirect',
        // google people api keys
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
}, (accessToken, refreshToken, profile, done) => {
    // callback function
    console.log('passport callback function fired')
    console.log(profile);

    new User({
        username: profile.displayName,
        googleId: profile.id
    }).save().then((newUser) => {
        console.log('New user has been created: ' + newUser);
    }); // the new user is saved asyncronously
}));