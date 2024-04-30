const mongoose = require('mongoose');
const Notification = require('../models/notification');

exports.getNotifications = async (req, res) => {
    const { userId } = req.params
    try {
        const notifications = await Notification.find({ userId: userId });
        return res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: "Error: " + error });
    }
}