const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/user-model');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

// google authentication
router.get('/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

// google authentication callback route
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send(req.user);
});

router.post('/register', (req, res) => {
    if('username' in req.body == false ) {
        res.status(400);
        res.json({status: "Missing username from body"})
        return;
    }
    if('password' in req.body == false ) {
        res.status(400);
        res.json({status: "Missing password from body"})
        return;
    }
    if('email' in req.body == false ) {
        res.status(400);
        res.json({status: "Missing email from body"})
        return;
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 6);
    console.log(hashedPassword);

    User.findOne({username: req.body.username}).then((currentUser) => {
      if (currentUser)
      {
          // user already exists
          console.log('User is already registered: ' + currentUser);
          done(null, currentUser);
      }
      else
      {
          // if not, create user in our db
          new User({
              username: req.body.username,
              password: hashedPassword,
              email: req.body.email
          }).save().then((newUser) => {
              console.log('New user has been created: ' + newUser);
              done(null, newUser);
          }); // the new user is saved asyncronously
      }
  });

  res.status(201).send('Created successfully');
})


router.get('/loginForJWT', passport.authenticate('basic', { session: false }), (req, res) => {
  
      const body = {
        id: req.user._id,
        username: req.user.username,
        email : req.user.email
      };
      
      const payload = {
        user : body
      };
      const options = {
        expiresIn: '1d'
      }
  
      /* Sign the token with payload, key and options.
         Detailed documentation of the signing here:
         https://github.com/auth0/node-jsonwebtoken#readme */
      const token = jwt.sign(payload, keys.secret, options);
  
      return res.json({ token });
  })
  

module.exports = router;