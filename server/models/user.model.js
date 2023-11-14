const sequelize = require("../config/db.config");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "user",
  {
    username: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
  },
  {
    timestamps: true,
  }
);

const Post = require("./posts.model");
const Like = require("./likes.model");
const Comment = require("./comments.model");
const CommentLike = require("./commentsLike");

User.hasMany(Post, { as: "posts", foreignKey: "userId" });
Post.belongsTo(User, { as: "users", foreignKey: "userId" });

User.hasMany(Comment, { as: "comments", foreignKey: "userId" });
User.hasMany(Like, { as: "likes", foreignKey: "userId" });

Post.hasMany(Comment, { as: "comments", foreignKey: "postId" });
Post.hasMany(Like, { as: "likes", foreignKey: "postId" });

Like.belongsTo(Post, { as: "posts", foreignKey: "postId" });
Like.belongsTo(User, { as: "users", foreignKey: "userId" });

Comment.belongsTo(Post, { as: "posts", foreignKey: "postId" });
Comment.belongsTo(User, { as: "users", foreignKey: "userId" });

Comment.hasMany(CommentLike, { as: "commentLikes", foreignKey: "commentId" });
CommentLike.belongsTo(Comment, { as: "comments", foreignKey: "commentId" });

User.hasMany(CommentLike, { as: "commentLikes", foreignKey: "userId" });
CommentLike.belongsTo(User, { as: "users", foreignKey: "userId" });

Post.hasMany(CommentLike, { as: "commentLikes", foreignKey: "postId" });
CommentLike.belongsTo(Post, { as: "posts", foreignKey: "postId" });

module.exports = User;
