const express = require("express");
const router = express.Router();
const CommentController = require('../controllers/comment')



router.post("/user/:id/comment", CommentController.comment_post_one);

router.get("/user/:id/comment/:commentId", CommentController.comment_get_one);

router.put('/user/:id/comment/update/:commentId/', CommentController.comment_update_all);

router.delete("/user/:id/comment/delete/:commentId/",CommentController.comment_delete_one)

module.exports = router;