const mongooose = require('mongoose');

const notificationSchema = new mongooose.Schema({
    userId: {
        type: mongooose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Notification = mongooose.model('Notification', notificationSchema);

module.exports = Notification;