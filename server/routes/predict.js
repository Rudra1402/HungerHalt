const express = require('express');
const router = express.Router();
const predictController = require('../controllers/predict');

router.post('/', predictController.predictHandler);

module.exports = router;