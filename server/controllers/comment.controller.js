const Comment = require("../models/comments.model");
const User = require("../models/user.model");
const Post = require("../models/posts.model");

exports.create = async (req, res) => {
  const { userId, postId } = req.params;
  const { content } = req.body;
  try {
    const newComment = await Comment.create({ userId, postId, content });
    const commentWithUser = await Comment.findByPk(newComment.id, {
      include: [{ model: User, as: "users" }],
    });
    res.json(commentWithUser);
  } catch (error) {
    console.log(error);
  }
};

exports.findAllByPost = async (req, res) => {
  const { postId } = req.params;
  try {
    const postWithComments = await Post.findByPk(postId, {
      include: [
        {
          model: Comment,
          as: "comments",
          include: [{ model: User, as: "users" }],
        },
      ],
    });
    res.json(postWithComments.comments);
  } catch (error) {
    console.log(error);
  }
};

exports.delete = async (req, res) => {
  const { commentId } = req.params;
  try {
    await Comment.destroy({ where: { id: commentId } });
    res.json("comment deleted");
  } catch (error) {
    console.log(error);
  }
};
