const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys')

passport.use(
    new GoogleStrategy({
        callbackURL: '/users/auth/google/redirect',
        // google people api keys
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
}, () => {
    // callback function
}))