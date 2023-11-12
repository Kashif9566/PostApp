const sequelize = require("../config/db.config");
const { DataTypes } = require("sequelize");

const Post = sequelize.define(
  "posts",
  {
    caption: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING, allowNull: true },
  },
  {
    timestamps: true,
  }
);
module.exports = Post;
