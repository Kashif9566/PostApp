const express = require("express");
const router = express.Router();
const comments = require("../controllers/comment.controller");

router.post("/user/:userId/post/:postId", comments.create);

router.get("/user/:userId/post/:postId", comments.findAllByPost);

router.delete("/user/:userId/post/:postId/comment/:commentId", comments.delete);

module.exports = router;
