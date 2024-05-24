const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
    bannerImage: {
        type: String,
        required: false
    },
    logo: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    tags: {
        type: [String],
        default: []
    },
    socials: {
        type: String
    },
    ordersPlaced: {
        type: Number,
        default: 0
    },
    netItemsCount: {
        type: Number,
        default: 0
    },
    partnerType: {
        type: String,
        enum: ['s', 'r', 'd']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    totalVotes: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Partner = mongoose.model('Partner', partnerSchema);

module.exports = Partner;