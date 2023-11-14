const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/jwt.config");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/user.model");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = jwt.sign({ user: { id: user.id } }, jwtSecret, {
        expiresIn: "1h",
      });
      res.json({ token });
    } else {
      res.status(401).json({ msg: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/profile", authMiddleware, async (req, res) => {
  res.json({ user: req.user });
});

router.post("/register", userController.create);
router.get("/", userController.getAllUsers);
router.get("/:userId", userController.getUserById);
router.put("/:userId", userController.updateUser);
router.delete("/:userId", userController.deleteUser);

module.exports = router;
