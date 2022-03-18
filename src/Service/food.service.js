const locationSchema = require('../Models/location.model');
const restaurantsSchema = require('../Models/restaurants.model');
const ordersSchema = require('../Models/orders.model');
const { endOfDay, startOfDay } = require('date-fns');

const getLocations = async(location) => {
    const locations = await locationSchema.find();
    const loc = locations.filter(item => {
        if (item.name.includes(location) || item.pinCode.includes(location) || item.district.includes(location) || item.state.includes(location)) {
            return item;
        }
    })
    return loc;
}

const addToCart = async(userId, foods) => {
    const orders = await ordersSchema.find({userId: userId, isOrdered: false});
    console.log(foods)
    if(!orders.length) {
        const newOrders = new ordersSchema({
            userId,
            foods
        })
        const ordered = await newOrders.save();
        console.log(ordered)
        return ordered;
    }
    return await ordersSchema.findOneAndUpdate({userId, isOrdered: false }, {foods});

}

const checkout = async(userId, id) => {
    return await ordersSchema.findOneAndUpdate({userId, _id: id, isOrdered: false }, {isOrdered: true});
}

const getCartItem = async(userId) => {
    return await ordersSchema.findOne({userId, isOrdered: false });
}

const getRestaurants = async(locationId, restaurantId, restaurantName) => {
    let restaurants = [];
    if (locationId)
        restaurants = await restaurantsSchema.find({locationId});
    else if (restaurantId)
        restaurants = await restaurantsSchema.find({_id: restaurantId.toLowerCase()})
    else if (restaurantName)
        restaurants = await restaurantsSchema.find({name: {$regex: restaurantName }})
    else
        restaurants = await restaurantsSchema.find()
    return restaurants;
}


module.exports = {
    getLocations,
    addToCart,
    getRestaurants,
    checkout,
    getCartItem
}