const router = require('express').Router();
const passport = require('passport');

// google authentication
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

module.exports = router;