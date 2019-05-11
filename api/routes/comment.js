const express = require("express");
const router = express.Router();
const CommentController = require('../controllers/comment');
const checkAuth = require('../middleware/check-auth');



router.post("/user/:id/comment",checkAuth, CommentController.comment_post_one);

router.get("/user/:id/comment/:commentId",checkAuth, CommentController.comment_get_one);

router.put('/user/:id/comment/update/:commentId/',checkAuth, CommentController.comment_update_all);

router.delete("/user/:id/comment/delete/:commentId/",checkAuth,CommentController.comment_delete_one)

module.exports = router;