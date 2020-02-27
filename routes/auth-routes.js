const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const users = require('../database/users');

router.post('/register', (req, res) => {
    if('username' in req.body == false ) {
        res.sendStatus(400);
        return;
    }
    if('password' in req.body == false ) {
        res.sendStatus(400);
        return;
    }
    if('email' in req.body == false ) {
        res.sendStatus(400);
        return;
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 6);
    // console.log(hashedPassword);

    const currentUser = users.getUserByName(req.body.username);
    
    if (currentUser)
    {
        // user already exists
        console.log('User is already registered: ' + currentUser);
        res.status(200).send('Already exists');
    }
    else
    {
        // if not, create user in our db
        users.addUser(req.body.username, req.body.email, hashedPassword);

        res.status(201).json({ status: "created" });
    }

    // res.status(201).send('Created successfully');
});

router.get('/loginForJWT', passport.authenticate('basic', { session: false }), (req, res) => {
  
      const body = {
        id: req.user.id,
        username: req.user.username,
        email : req.user.email
      };
      
      const payload = {
        user : body
      };
      const options = {
        expiresIn: '1d'
      }
  
      const token = jwt.sign(payload, keys.secret, options);
  
      return res.json({ token });
  })
  

module.exports = router;