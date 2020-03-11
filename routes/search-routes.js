const router = require('express').Router();
const mongoose = require('mongoose');

const items = require('../database/items');

const categories= ['vehicles', 'real_estate', 'jobs', 'electonics_&_appliances', 'furniture', 'mobiles', 'pets', 'books', 'fashion', 'services', 'sports_&_hobbies'];

router.get('/userId', (req,res) => {
    if (req.body.hasOwnProperty('userId'))
    {
        const currentItems = items.getAllUserItems(req.body.userId);
        res.status(200).json(currentItems);
    }
    else
    {
        res.sendStatus(400);
    }
});

router.get('/category/:itemCategory', (req, res) => {
    if (categories.find(x => x == req.params.itemCategory))
    {
        const currentItems = items.getAllCategoryItems(req.params.itemCategory);
        res.status(200).json(currentItems);
    }
    else
    {
        res.status(200).send('Category doesn\'t exist');
    }
});

router.get('/location/:itemLocation', (req, res) => {
    const currentItems = items.getAllLocationItems(req.params.itemLocation);
    res.status(200).json(currentItems);
});

router.get('/dateOfPosting/:itemDate', (req, res) => {
    const currentItems = items.getAllDateOfPostingItems(req.params.itemDate);
    res.status(200).json(currentItems);
});

module.exports = router;