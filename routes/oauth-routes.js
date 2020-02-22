const router = require('express').Router();

// auth with google
router.get('/google', (req, res) => {
    res.send('logging in with google');
});

module.exports = router;