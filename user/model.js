const Sequelize = require("sequelize");
const sequelize = require("../db");
// const Comment = require("../comments/model");
const User = sequelize.define(
  "user",
  {
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    timestamp: false,
    tableName: "user"
  }
);
// User.hasMany(Comment);
// Comment.belongsTo(User);

module.exports = User;
