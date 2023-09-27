module.exports = {
  HOST: 'localhost',
  PORT: 5432, // port for postgres sql
  USER: 'root',
  PASSWORD: 'Dushtomai@31',
  DB: 'todoapp',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
