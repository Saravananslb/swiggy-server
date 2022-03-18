const mongoose = require('mongoose');

const restaurantsSchema = mongoose.Schema({
    name: {
        type: String
    },
    locationId: {
        type: String
    },
    type: {
        type: String
    },
    address: {
        type: String
    },
    star: {
        type: String
    },
    ratings: {
        type: Number
    },
    deliveryTime: {
        type: Number
    },
    price: {
        type: Number,
    },
    offerPercent: {
        type: Number
    },
    foodImage: {
        type: String
    },
    foods: {
        type: Array
    }
});

module.exports = mongoose.model('restaurants', restaurantsSchema);