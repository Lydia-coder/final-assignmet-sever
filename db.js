const Sequelize = require("sequelize");
const databaseUrl =
  process.env.DATABASE_URL ||
  "postgres://postgres:secret@localhost:5432/postgres";
const db = new Sequelize(databaseUrl);

db.sync({ force: false })
  .then(() => console.log("database connected"))
  .catch(error => console.log(error));

module.exports = db;
