const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DRIVER,
  database: process.env.DB_NAME
});

module.exports = sequelize;