const express = require("express");
const router = express.Router();

const likes = require("../controllers/like.controller");

router.post("/user/:userId/post/:postId", likes.create);
router.get("/user/:userId/post/:postId", likes.getAllLikes);

module.exports = router;
