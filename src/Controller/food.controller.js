const { getLocations, getRestaurants, addToCart, getCartItem, checkout } = require('../Service/food.service');

const getLocation = async(req, res) => {
    try {
        const search = req.query.search;
        const locations = await getLocations(search);
        res.json({ status: true, locations});
        return;
    }
    catch (error) {
        console.log(error)
        res.json(error);
    }
}

const getCart = async(req, res) => {
    try {
        const userId = res.locals.userId;
        const carts = await getCartItem(userId);
        res.json({ status: true, carts});
        return;
    }
    catch (error) {
        console.log(error)
        res.json(error);
    }
}

const getRestaurant = async(req, res) => {
    try {
        const locationId = req.query.locationId;
        const restaurantId = req.query.restaurantId;
        const restaurantName = req.query.restaurantName;
        const restaurants = await getRestaurants(locationId, restaurantId, restaurantName);
        res.json({ status: true, restaurants});
        return;
    }
    catch (error) {
        console.log(error)
        res.json(error);
    }
}

const addCart = async(req, res) => {
    try {
        const userId = res.locals.userId;
        const foods = req.body.foods;
        const carts = await addToCart(userId, foods);
        res.json({ status: true, carts: carts});
        return;
    }
    catch (error) {
        console.log(error)
        res.json(error);
    }
}

const checkoutItem = async(req, res) => {
    try {
        const userId = res.locals.userId;
        const id = req.body.id;
        const carts = await checkout(userId, id);
        res.json({ status: true, carts});
        return;
    }
    catch (error) {
        console.log(error)
        res.json(error);
    }
}

module.exports = {
    getLocation,
    getRestaurant,
    addCart,
    getCart,
    checkoutItem
}