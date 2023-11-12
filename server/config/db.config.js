const Sequelize = require("sequelize");
const sequelize = new Sequelize("postapp2", "postgres", "9324", {
  host: "localhost",
  dialect: "postgres",
});
module.exports = sequelize;
