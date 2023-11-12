const { Op } = require("sequelize");
const User = require("../models/user.model");
const Post = require("../models/posts.model");

exports.searchPosts = async (req, res) => {
  const { userId } = req.query;
  const { search } = req.query;
  try {
    let whereCondition = {};
    if (userId) {
      whereCondition.userId = userId;
    }
    if (search) {
      whereCondition.caption = { [Op.iLike]: `%${search}%` };
    }

    const posts = await Post.findAll({
      where: whereCondition,
      include: [
        {
          model: User,
          as: "users",
          attributes: ["username"],
        },
      ],
    });

    res.json(posts);
  } catch (error) {
    console.log(error);
  }
};
