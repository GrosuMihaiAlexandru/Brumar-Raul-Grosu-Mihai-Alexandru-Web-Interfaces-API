const router = require('express').Router();
const mongoose = require('mongoose');

const items = require('../database/items');

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

router.get('/category', (req, res) => {
    if (req.body.hasOwnProperty('category'))
    {
        const currentItems = items.getAllCategoryItems(req.body.category);
        res.status(200).json(currentItems);
    }
    else
    {
        res.sendStatus(400);
    }
});

router.get('/location', (req, res) => {
    if (req.body.hasOwnProperty('location'))
    {
        const currentItems = items.getAllLocationItems(req.body.location);
        res.status(200).json(currentItems);
    }
    else
    {
        res.sendStatus(400);
    }
});

router.get('/dateOfPosting', (req, res) => {
    if (req.body.hasOwnProperty('dateOfPosting'))
    {
        const currentItems = items.getAllDateOfPostingItems(req.body.dateOfPosting);
        res.status(200).json(currentItems);
    }
    else
    {
        res.sendStatus(400);
    }
});

module.exports = router;