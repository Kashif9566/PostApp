const sequelize = require("../config/db.config");
const { DataTypes } = require("sequelize");

const CommentLike = sequelize.define(
  "commmetLike",
  {
    postId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    commentId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    timestamps: true,
  }
);
module.exports = CommentLike;
