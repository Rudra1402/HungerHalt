const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item');

const checkUserExists = require("../middlewares/userAuth");
const checkIsPartner = require("../middlewares/partnerAuth");

router.post('/', checkIsPartner, itemController.createItems);
router.get('/', checkUserExists, itemController.getItems);
router.get('/:itemId', checkUserExists, itemController.getItems);
router.get('/partner/:partnerId', checkUserExists, itemController.getItemsByPartnerId);
router.put('/:itemId', checkIsPartner, itemController.updateItem);
router.delete('/:itemId', checkIsPartner, itemController.deleteItem);

module.exports = router;