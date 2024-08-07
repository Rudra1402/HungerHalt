const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

const checkUserExists = require("../middlewares/userAuth");
const checkIsPartner = require("../middlewares/partnerAuth");

router.post('/signup', userController.createUser);
router.post('/signin', userController.loginUser);
router.get('/', checkUserExists, userController.getUsers);
router.post('/vote', checkUserExists, userController.voteUser)
router.put('/:userId', checkUserExists, userController.updateUser);

module.exports = router;