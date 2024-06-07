const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('assignment', 'root', 'root1234', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
