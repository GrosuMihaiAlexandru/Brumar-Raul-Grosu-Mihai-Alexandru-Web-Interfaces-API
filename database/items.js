const uuidv4 = require('uuid/v4');


let items = [
    {
        id: "1cd67a99-e7a0-4de0-8442-72d16d6aa853",
        userId: "dc7015c4-1523-41fe-b322-0eacaeec9b80",
        images: ["lksnglkdrglkdgd5gd2f4gd25g4fgcfg2cfg4cf53g4cf"],
        title: "Old Chair 25",
        description: "nice and confortable chair",
        category: "Furniture",
        location: "London",
        askingPrice: "25EUR",
        dateOfPosting: "20-02-2020",
        deliveryType: "Pickup",
        sellerInfo: "Jaakko Penttinen, jaakko.penttinen@gmail.com, +35889898989"
    },
    {
        id: "7e2f26f2-c621-48cf-842f-f49978b714f8",
        userId: "dc7015c4-1523-41fe-b322-0eacaeec9b80",
        images: ["lksnglkdrglkdgd5gd2f4gd25g4fgcfg2cfg4cf53g4cf"],
        title: "Old Chair 99",
        description: "nice and confortable very old chair",
        category: "Furniture",
        location: "Oulu",
        askingPrice: "30EUR",
        dateOfPosting: "20-02-2020",
        deliveryType: "Pickup",
        sellerInfo: "Jaakko Penttinen, jaakko.penttinen@gmail.com, +35889898989"
    }
];

module.exports = {
    insertItem: (userId, images, title, description, category, location, askingPrice, dateOfPosting, deliveryType, sellerInfo) => {
        items.push({
        id: uuidv4(),
        userId,
        images,
        title,
        description,
        category,
        location,
        askingPrice,
        dateOfPosting,
        deliveryType,
        sellerInfo
        });
    },
    getAllItems: () => items,
    getAllUserItems: (userId) => items.filter(i => i.userId == userId),
    getItem: (itemId) => items.find(i => i.id == itemId),
    getAllCategoryItems: (category) => items.filter(i => i.category == category),
    getAllLocationItems: (location) => items.filter(i => i.location == location),
    getAllDateOfPostingItems: (dateOfPosting) => items.filter(i => i.dateOfPosting == dateOfPosting),
    modifyItem: (itemId, newValue) => {
        oldItem = items.find(i => i.id == itemId);
        index = items.findIndex(i => i.id == itemId);

        if (oldItem)
        {
            console.log(itemId);

            if (newValue.hasOwnProperty('title'))
            {
                oldItem.title = newValue.title;
            }
            if (newValue.hasOwnProperty('description'))
            {
                oldItem.description = newValue.description;
            }
            if (newValue.hasOwnProperty('category'))
            {
                oldItem.category = newValue.category;
            }
            if (newValue.hasOwnProperty('location'))
            {
                oldItem.location = newValue.location;
            }
            if (newValue.hasOwnProperty('images'))
            {
                oldItem.images = newValue.images;
            }
            if (newValue.hasOwnProperty('askingPrice'))
            {
                oldItem.askingPrice = newValue.askingPrice;
            }
            if (newValue.hasOwnProperty('dateOfPosting'))
            {
                oldItem.dateOfPosting = newValue.dateOfPosting;
            }
            if (newValue.hasOwnProperty('deliveryType'))
            {
                oldItem.deliveryType = newValue.deliveryType;
            }
            if (newValue.hasOwnProperty('sellerInfo'))
            {
                oldItem.sellerInfo = newValue.sellerInfo;
            }
            console.log(oldItem)
            items[index] = oldItem;
        }
    },
    deleteItem: (itemId) => {
        index = items.findIndex(i => i.id == itemId);
        items.splice(index, 1);
    }
}