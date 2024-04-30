const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');

const checkUserExists = require("../middlewares/userAuth");
const checkIsPartner = require("../middlewares/partnerAuth");

router.get('/', checkUserExists, postController.getAllPosts);
router.get('/:partnerId', checkUserExists, postController.getPostsByPartner);
router.post('/:partnerId', checkIsPartner, postController.createPost);
router.put('/:postId', checkIsPartner, postController.updatePost);
router.delete('/:postId', checkIsPartner, postController.deletePost);

module.exports = router;