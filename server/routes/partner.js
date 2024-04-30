const express = require('express');
const router = express.Router();
const partnerController = require('../controllers/partner');

const checkUserExists = require("../middlewares/userAuth");
const checkIsPartner = require("../middlewares/partnerAuth");

router.get('/', checkUserExists, partnerController.getPartners);
router.get('/:id', checkUserExists, partnerController.getPartnerById);
router.get('/:type', checkUserExists, partnerController.getPartnersByType);
router.put('/:partnerId', checkIsPartner, partnerController.updatePartner);

module.exports = router;