const router = require('express').Router();
const Item = require('../models/item-model')
const mongoose = require('mongoose');

router.get('/category', (req, res) => {
    if (req.body.hasOwnProperty('category'))
    {
        Item.find({category: req.body.category}).then((currentItems) => {
            res.status(200).json(currentItems);
        });
    }
    else
    {
        res.sendStatus(400);
    }
});

router.get('/location', (req, res) => {
    if (req.body.hasOwnProperty('location'))
    {
        Item.find({location: req.body.location}).then((currentItems) => {
            res.status(200).json(currentItems);
        });
    }
    else
    {
        res.sendStatus(400);
    }
});

router.get('/dateOfPosting', (req, res) => {
    if (req.body.hasOwnProperty('dateOfPosting'))
    {
        Item.find({dateOfPosting: req.body.dateOfPosting}).then((currentItems) => {
            res.status(200).json(currentItems);
        });
    }
    else
    {
        res.sendStatus(400);
    }
});

module.exports = router;