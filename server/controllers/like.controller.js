const Like = require("../models/likes.model");
const Post = require("../models/posts.model");
const User = require("../models/user.model");

exports.create = async (req, res) => {
  const { userId, postId } = req.params;
  try {
    const like = await Like.create({ userId, postId });
    const LikeWithUser = await Like.findByPk(like.id, {
      include: [{ model: User, as: "users" }],
    });
    res.json(LikeWithUser);
  } catch (error) {
    console.log(error);
  }
};

exports.getAllLikes = async (req, res) => {
  const { postId } = req.params;

  try {
    const postWithLikes = await Post.findByPk(postId, {
      include: [
        {
          model: Like,
          as: "likes",
          include: [{ model: User, as: "users" }],
        },
      ],
    });

    res.json(postWithLikes.likes);
  } catch (error) {
    console.error(error);
    res.json({ error: "Internal Server Error" });
  }
};
