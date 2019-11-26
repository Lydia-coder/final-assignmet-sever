const Sequelize = require("sequelize");
const sequelize = require("../db");
const User = require("../user/model");
const Ticket = sequelize.define(
  "ticket",
  {
    picture: {
      type: Sequelize.STRING,
      allowNull: false
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  },
  {
    timestamp: false,
    tableName: "ticket"
  }
);
Ticket.belongsTo(User);
User.hasMany(Ticket);

module.exports = Ticket;
