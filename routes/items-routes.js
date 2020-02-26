const router = require('express').Router();
const keys = require('../config/keys');
const Item = require('../models/item-model');
const passport = require('passport');


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

router.post('/', authCheck, (req, res) => {
    // Checking if the json is valid
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
        res.status(201).send('Item Created');
      })
    }
    else
    {
        console.log(req.body);
        res.sendStatus(400);
    }
});

router.put('/', authCheck, (req, res) => {
    if (req.body.hasOwnProperty('id'))
    {
        Item.findById(req.body.id).then((currentItem) => {
            if (currentItem)
            {
                // Every other property besides id is not mandatory
                // Only the given properties will be updated
                if (req.body.hasOwnProperty('title'))
                {
                    currentItem.title = req.body.title;
                }
                if (req.body.hasOwnProperty('description'))
                {
                    currentItem.description = req.body.description;
                }
                if (req.body.hasOwnProperty('category'))
                {
                    currentItem.category = req.body.category;
                }
                if (req.body.hasOwnProperty('location'))
                {
                    currentItem.location = req.body.location;
                }
                if (req.body.hasOwnProperty('images'))
                {
                    currentItem.images = req.body.images;
                }
                if (req.body.hasOwnProperty('askingPrice'))
                {
                    currentItem.askingPrice = req.body.askingPrice;
                }
                if (req.body.hasOwnProperty('dateOfPosting'))
                {
                    currentItem.dateOfPosting = req.body.dateOfPosting;
                }
                if (req.body.hasOwnProperty('deliveryType'))
                {
                    currentItem.deliveryType = req.body.deliveryType;
                }
                if (req.body.hasOwnProperty('sellerInfo'))
                {
                    currentItem.sellerInfo = req.body.sellerInfo;
                }

                currentItem.save().then(() => {
                    console.log('Item Updated to ' + currentItem);
                    res.status(200).send('Item Updated');
                })
            }  
            else
            {
                res.status(404).send("Item not found");
            } 
        })
    }
    else
    {
        console.log(req.body);
        res.sendStatus(400);
    }
})

router.delete('/', authCheck, (req, res) => {
    if (req.body.hasOwnProperty('id'))
    {
        Item.findOneAndRemove({_id: req.body.id}, req.body, function(err,data)
        {
            if(!err){
                res.status(200).send("Deleted");
            }
            else
            {
                res.sendStatus(404);
            }
        });
        
    }
    else
    {
        res.sendStatus(400); 
    }
})

module.exports = router;