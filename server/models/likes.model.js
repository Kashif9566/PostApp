const sequelize = require("../config/db.config");
const { DataTypes } = require("sequelize");
const Like = sequelize.define(
  "like",
  {
    postId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    timestamps: true,
  }
);

module.exports = Like;
