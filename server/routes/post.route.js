const express = require("express");
const router = express.Router();
const posts = require("../controllers/post.controller");
const multer = require("multer");

//multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/:userId", upload.single("image"), posts.create);

router.get("/all", posts.findAllPostsOfAllUsers);

router.get("/:userId", posts.findAll);

router.put("/:userId/:postId", posts.updatePost);

router.delete("/:userId/:postId", posts.delete);

module.exports = router;
