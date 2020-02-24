const router = require('express').Router();
const keys = require('../config/keys');
const Item = require('../models/item-model')


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

router.post('/', authCheck, (req, res) => {
    if (req.body.hasOwnProperty('title') && req.body.hasOwnProperty('description') && req.body.hasOwnProperty('category') && req.body.hasOwnProperty('location') &&
    req.body.hasOwnProperty('images') && req.body.hasOwnProperty('askingPrice') && req.body.hasOwnProperty('dateOfPosting') && req.body.hasOwnProperty('deliveryType') &&
    req.body.hasOwnProperty('sellerInfo'))
    {
    new Item({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        location: req.body.location,
        images: req.body.images,
        askingPrice: req.body.askingPrice,
        dateOfPosting: req.body.dateOfPosting,
        deliveryType: req.body.deliveryType,
        sellerInfo: req.body.sellerInfo,
        userId: req.user.id
    }).save().then((newItem) => {
        console.log('New item has been created ' + newItem);
        res.status(201).send('Item Created')
      })
    }
    else
    {
        res.sendStatus(400);
    }
});

module.exports = router;