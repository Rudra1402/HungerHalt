const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');

const checkUserExists = require("../middlewares/userAuth");
const checkIsPartner = require("../middlewares/partnerAuth");

router.post('/', checkUserExists, orderController.createOrder);
router.get('/', checkIsPartner, orderController.getOrders);
router.get('/:partnerId', checkIsPartner, orderController.getOrdersByPartner);
router.put('/:orderId', checkIsPartner, orderController.updateOrder);

module.exports = router;