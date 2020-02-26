const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const GoogleStrategy = require('passport-google-oauth20');
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('./keys');
const User = require('../models/user-model');
const bcrypt = require('bcryptjs');

passport.serializeUser((obj, done) => {
    done(null, obj.user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

// Basic auth
passport.use(new BasicStrategy((username, password, done) => {
    User.findOne({googleId: profile.id}).then((currentUser) => {
        if (currentUser)
        {
            // Username not found
            console.log("HTTP Basic username not found");
            return done(null, false, { message: "HTTP Basic username not found" });
        }

        if(bcrypt.compareSync(password, user.password) == false) {
            // Password does not match
            console.log("HTTP Basic password not matching username");
            return done(null, false, { message: "HTTP Basic password not found" });
          }
          return done(null, user);
    })
}))

// JWT auth
passport.use(
    new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: keys.secret
    }, (jwt_payload, done) => {
        console.log("Processing JWT payload for token content:");
         console.log(jwt_payload);

         const now = Date.now() / 1000;
        if(jwt_payload.exp > now) {
            done(null, jwt_payload.user);
        }
        else {// expired
            done(null, false);
        }
    }) 
)

passport.use(
    new GoogleStrategy({
        callbackURL: '/users/auth/google/redirect',
        // google people api keys
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
}, (accessToken, refreshToken, profile, done) => {
    // check if user already exists
    //console.log("passport callback")
    User.findOne({googleId: profile.id}).then((currentUser) => {
        if (currentUser)
        {
            // user already exists
            console.log('User is already registered: ' + accessToken);
            done(null, { user: currentUser, accessToken: accessToken});
            
        }
        else
        {
            // if not, create user in our db
            new User({
                username: profile.displayName,
                googleId: profile.id
            }).save().then((newUser) => {
                console.log('New user has been created: ' + newUser);
                done(null, newUser);
            }); // the new user is saved asyncronously
        }
    });
}));