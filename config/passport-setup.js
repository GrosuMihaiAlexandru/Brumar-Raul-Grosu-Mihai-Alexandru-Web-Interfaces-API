const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('./keys');
const bcrypt = require('bcryptjs');

const users = require('../database/users');

// Basic auth
passport.use(new BasicStrategy((username, password, done) => {
    const currentUser = users.getUserByName(username);

    if (currentUser == undefined)
    {
        // Username not found
        console.log("HTTP Basic username not found");
        return done(null, false, { message: "HTTP Basic username not found" });
    }

    if(bcrypt.compareSync(password, currentUser.password) == false)
    {
        // Password does not match
        console.log("HTTP Basic password not matching username");
        return done(null, false, { message: "HTTP Basic password not found" });
    }

    return done(null, currentUser);
}));

// JWT auth
passport.use(
    new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: keys.secret
    }, (jwt_payload, done) => {
        console.log("Processing JWT payload for token content:");
        console.log(jwt_payload);

        //const now = Date.now() / 1000;
        //if(jwt_payload.exp > now) {
            done(null, jwt_payload.user);
        //}
        /*
        else {// expired
            done(null, false);
        }*/
    }) 
);