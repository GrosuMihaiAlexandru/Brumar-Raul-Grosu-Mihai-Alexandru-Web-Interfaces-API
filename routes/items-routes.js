const router = require('express').Router();

//middleware for checking if the user is logged in
const authCheck = (req, res, next) => {
    if (!req.user)
    {
        // user is not logged in
        res.redirect('/users/auth/google')
    }
    else
    {
        next();
    }
}

router.get('/', authCheck, (req, res) => {
    res.send('you are logged in' + req.user.username);
});

module.exports = router;