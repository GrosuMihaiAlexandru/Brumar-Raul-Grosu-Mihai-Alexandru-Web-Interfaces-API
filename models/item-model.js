const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    location: {
        type: String
    },
    images: {
        type: [String]
    },
    askingPrice: {
        type: String
    },
    dateOfPosting: {
        type: String
    },
    deliveryType: {
        type: String
    },
    sellerInfo: {
        type: String
    },
    userId: {
        type: String
    }
});

const Item = mongoose.model('item', itemSchema);

module.exports = Item;