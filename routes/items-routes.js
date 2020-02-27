const router = require('express').Router();
const keys = require('../config/keys');
const passport = require('passport');

const items = require('../database/items');

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

router.get('/test', passport.authenticate('google', { scope: ['profile']}), (req, res) => {
    res.send("secure Hello World");
})

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    // Checking if the json is valid
    if (req.body.hasOwnProperty('title') && req.body.hasOwnProperty('description') && req.body.hasOwnProperty('category') && req.body.hasOwnProperty('location') &&
    req.body.hasOwnProperty('images') && req.body.hasOwnProperty('askingPrice') && req.body.hasOwnProperty('dateOfPosting') && req.body.hasOwnProperty('deliveryType') &&
    req.body.hasOwnProperty('sellerInfo'))
    {
        console.log(req.user);
        
        items.insertItem(req.body.userId, req.body.images, req.body.title, req.body.description, req.body.category, req.body.location, req.body.askingPrice, req.body.dateOfPosting, req.body.deliveryType, req.body.sellerInfo);
        
        res.status(201).send('Item Created');
    }
    else
    {
        console.log(req.body);
        res.sendStatus(400);
    }
});

router.put('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    if (req.body.hasOwnProperty('id'))
    {
        if (items.getItem(req.body.id))
        {
            items.modifyItem(req.body.id, req.body);

            res.status(200).send('Item Updated');
        }
        else
        {
            res.sendStatus(404);
        }
    }
    else
    {
        res.sendStatus(400);
    }
})

router.delete('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    if (req.body.hasOwnProperty('id'))
    {
        if (items.getItem(req.body.id))
        {
            items.deleteItem(req.body.id);
            res.status(200).send('Deleted');
        }
        else
        {
            res.sendStatus(404);
        }
    }
    else
    {
        res.sendStatus(400); 
    }
})

module.exports = router;