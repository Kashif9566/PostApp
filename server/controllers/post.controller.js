const Post = require("../models/posts.model");
const User = require("../models/user.model");

exports.create = async (req, res) => {
  const { caption } = req.body;
  const image = req.file ? req.file.path : null;
  const userId = req.params.userId;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.json({ error: "User not found" });
    }
    const newPost = await Post.create({
      caption: caption,
      image: image,
      userId: userId,
    });

    //post with user
    const postWithUser = await Post.findByPk(newPost.id, {
      include: [{ model: User, as: "users", attributes: ["username"] }],
    });
    res.json(postWithUser);
  } catch (error) {
    console.log(error);
  }
};

exports.findAll = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Post,
          as: "posts",
          include: [{ model: User, as: "users", attributes: ["username"] }],
        },
      ],
    });

    if (!user) {
      return res.json({ error: "User not found" });
    }

    res.json(user.posts);
  } catch (error) {
    console.log(error);
    res.json({ error: "Internal Server Error" });
  }
};

exports.findAllPostsOfAllUsers = async (req, res) => {
  try {
    const posts = await Post.findAll({
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
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updatePost = async (req, res) => {
  const postId = req.params.postId;
  const { caption } = req.body;

  try {
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    post.caption = caption;
    await post.save();
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.delete = async (req, res) => {
  const postId = req.params.postId;

  try {
    const deletedPost = await Post.destroy({
      where: { id: postId },
    });

    res.json(deletedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
