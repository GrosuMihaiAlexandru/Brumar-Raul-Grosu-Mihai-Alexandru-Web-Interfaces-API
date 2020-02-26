const router = require('express').Router();
const passport = require('passport');

// google authentication
router.get('/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

// google authentication callback route
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send(req.user);
});

router.post('/registerBasic', (req, res) => {
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
    users.addUser(req.body.username, req.body.email, hashedPassword);

    res.status(201).json({ status: "created" });
})


router.get('/loginForJWT', passport.authenticate('basic', { session: false }), (req, res) => {
      const body = {
        id: req.user.id,
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
      const token = jwt.sign(payload, jwtSecretKey.secret, options);
  
      return res.json({ token });
  })
  

module.exports = router;