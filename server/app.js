const express = require("express");
const cors = require("cors");

const app = express();
const sequelize = require("./config/db.config");
app.use(cors());
app.use(express.json());

//static files from the 'uploads' directory
app.use("/uploads", express.static("uploads"));

//routes
const userRoutes = require("./routes/user.routes");
app.use("/user", userRoutes);

const postRoutes = require("./routes/post.route");
app.use("/post", postRoutes);

const likesRoutes = require("./routes/like.route");
app.use("/likes", likesRoutes);

const commentRoutes = require("./routes/comment.route");
app.use("/comments", commentRoutes);

const commentLikesRoute = require("./routes/commentLike.route");
app.use("/commentLike", commentLikesRoute);

const searchRoutes = require("./routes/search.route");
app.use("/search", searchRoutes);

sequelize.sync();
app.listen(5000, () => {
  console.log("connected to 5000");
});
