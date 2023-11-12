const sequelize = require("../config/db.config");
const { DataTypes } = require("sequelize");
const Comment = sequelize.define(
  "comment",
  {
    content: { type: DataTypes.TEXT },
  },
  {
    timestamps: true,
  }
);

module.exports = Comment;
