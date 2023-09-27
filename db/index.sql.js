const { Sequelize } = require('sequelize');
const dbConfig = require('./sql.config');

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
    // eslint-disable-next-line no-console
    console.log('Connection to Postgres DB has been established successfully.');
    await sequelize.sync({ force: false });
    // eslint-disable-next-line no-console
    console.log('Postgres database synced ');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`Error in connecting to Postgres DB ${error}`);
  }
}

module.exports = { connectPostgres, sequelize };
