const Like = require("../models/likes.model");
const Post = require("../models/posts.model");

exports.create = async (req, res) => {
  const { userId, postId } = req.params;
  try {
    const like = await Like.create({ userId, postId });
    res.json(like);
  } catch (error) {
    console.log(error);
  }
};

exports.getAllLikes = async (req, res) => {
  const { postId } = req.params;

  try {
    const postWithLikes = await Post.findByPk(postId, {
      include: [{ model: Like, as: "likes" }],
    });

    res.json(postWithLikes.likes);
  } catch (error) {
    console.error(error);
    res.json({ error: "Internal Server Error" });
  }
};
