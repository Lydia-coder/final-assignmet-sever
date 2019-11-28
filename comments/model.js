const Sequelize = require("sequelize");
const sequelize = require("../db");
const Ticket = require("../tickets/model");
const User = require("../user/model");

const Comment = sequelize.define(
  "comment",
  {
    text: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    timestamp: false,
    tableName: "comment"
  }
);
Ticket.hasMany(Comment);
Comment.belongsTo(Ticket);
//Comment.belongsTo(User);
//User.hasMany(Comment);

module.exports = Comment;
