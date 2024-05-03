const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    partnerId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    itemId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    paymentMode: {
        type: String,
        enum: ['pre', 'post'],
        required: true
    },
    isOrderIDVerified: {
        type: Boolean,
        default: false
    },
    paymentStatus: {
        type: Boolean,
        required: true
    },
    uniqueOrderId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;