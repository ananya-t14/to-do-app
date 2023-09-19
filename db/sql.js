const { Sequelize } = require("sequelize");
const dbConfig = require("./sql.config");
// import dbConfig from '../config/db.config';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

async function connectPostgres() {
  try {
    await sequelize.authenticate();
    console.log("Connection to Postgres DB has been established successfully.");
    await sequelize.sync({ force: false });
    console.log("Postgres database synced ");
  } catch (error) {
    console.log("Error in connecting to Postgres DB " + error);
  }
}

module.exports = { connectPostgres, sequelize };
