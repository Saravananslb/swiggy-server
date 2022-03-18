const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
    userId: {
        type: String
    },
    foods: {
        type: Array
    },
    isOrdered: {
        type: Boolean,
        default: false
    },
    orderedAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('orders', ticketSchema);