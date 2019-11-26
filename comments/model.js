const Sequelize = require("sequelize");
const sequelize = require("../db");
const Ticket = require("../tickets/model");

const Comment = sequelize.define(
  "comment",
  {
    post: {
      type: Sequelize.STRING,
      allowNull: false
    },
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

module.exports = Comment;
