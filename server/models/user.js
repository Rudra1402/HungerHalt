const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    myFavs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partner'
    }],
    isPartner: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true
    },
    votes: {
        type: Number,
        default: 0
    },
    hasVoted: {
        type: Boolean,
        default: false
    },
    votedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partner',
        default: null
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;