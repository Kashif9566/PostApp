const express = require("express");
const router = express.Router();
const commentsLike = require("../controllers/commentLike");

router.post(
  "/user/:userId/post/:postId/comment/:commentId",
  commentsLike.create
);
router.get(
  "/user/:userId/post/:postId/comment/:commentId",
  commentsLike.getAllCommentLikes
);
router.delete(
  "/user/:userId/post/:postId/comment/:commentId",
  commentsLike.unlike
);

module.exports = router;
