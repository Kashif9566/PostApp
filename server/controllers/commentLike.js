const CommentLike = require("../models/commentsLike");
const Comment = require("../models/comments.model");

exports.create = async (req, res) => {
  const { userId, postId, commentId } = req.params;
  try {
    const commentLike = await CommentLike.create({ userId, postId, commentId });
    res.json(commentLike);
  } catch (error) {
    console.log(error);
  }
};

exports.getAllCommentLikes = async (req, res) => {
  const { commentId } = req.params;
  try {
    const allCommentLikes = await Comment.findByPk(commentId, {
      include: [{ model: CommentLike, as: "commentLikes" }],
    });
    res.json(allCommentLikes.commentLikes);
  } catch (error) {
    console.log(error);
  }
};

exports.unlike = async (req, res) => {
  const { commentId } = req.params;
  try {
    await CommentLike.destroy({ where: { id: commentId } });
    res.json("comment unliked");
  } catch (error) {
    console.log(error);
  }
};
