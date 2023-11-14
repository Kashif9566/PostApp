const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/jwt.config");

exports.create = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });
    const token = jwt.sign({ user: { id: newUser.id } }, jwtSecret, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll();
    res.json(allUsers);
  } catch (error) {
    console.error(error);
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.userId;

  try {
    if (!Number.isInteger(Number(userId))) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.userId;
  const { username } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.username = username;
    user.email = email;

    await user.save();

    res.json(user);
  } catch (error) {
    console.error(error);
    res.json({ error: "Internal Server Error" });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const deletedUser = await User.destroy({
      where: { id: userId },
    });

    if (!deletedUser) {
      return res.json({ error: "User not found" });
    }

    res.json({ message: "User deleted " });
  } catch (error) {
    console.error(error);
  }
};
