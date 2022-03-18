const express = require('express');
const { getLocation, getRestaurant, addCart, getCart, checkoutItem } = require('../Controller/food.controller');
const isAuthenticated  = require('../Middleware/auth.middleware');
const router = express.Router();

router.get('/location', getLocation);
router.get('/restaurants', getRestaurant);
router.post('/cart', isAuthenticated, addCart);
router.get('/cart', isAuthenticated, getCart);
router.put('/checkout', isAuthenticated, checkoutItem);

module.exports = router;