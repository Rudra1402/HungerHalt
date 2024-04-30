const express = require('express')
const router = express.Router();
const notificationController = require('../controllers/notification');

const checkUserExists = require("../middlewares/userAuth");
const checkIsPartner = require("../middlewares/partnerAuth");

router.get('/:userId', checkUserExists, notificationController.getNotifications);

module.exports = router;