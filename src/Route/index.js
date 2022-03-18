const express = require('express');
const authRouter = require('./auth.route');
const foodRouter = require('./food.route');

const app = express();

app.use('/auth', authRouter);
app.use('/food', foodRouter);

module.exports = app;