const router = require('express').Router();
const passport = require('passport');

// google authentication
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// google authentication callback route
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send(req.user);
});

module.exports = router;