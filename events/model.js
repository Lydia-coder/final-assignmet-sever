const Sequelize = require("sequelize");
const sequelize = require("../db");
const Ticket = require("../tickets/model");

const User = require("../user/model");
const Event = sequelize.define(
  "event",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false
    },
    startDate: {
      type: Sequelize.DATE
      //   allowNull: false
    },
    endDate: {
      type: Sequelize.DATE
      //   allowNull: false
    }
  },
  {
    timestamp: false,
    tableName: "event"
  }
);

// User.belongsTo(Event);
Event.hasMany(Ticket);
Ticket.belongsTo(Event);

Event.belongsTo(User);
User.hasMany(Event);

module.exports = Event;
