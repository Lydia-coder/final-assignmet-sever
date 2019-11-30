const Sequelize = require("sequelize");
const sequelize = require("../db");
const User = require("../user/model");
const Ticket = sequelize.define(
  "ticket",
  {
    price: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    ticketRisk: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    timestamp: true,
    tableName: "ticket"
  }
);
Ticket.belongsTo(User);
User.hasMany(Ticket);

module.exports = Ticket;
