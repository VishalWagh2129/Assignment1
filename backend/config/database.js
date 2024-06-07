const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  operatorAlias:false,
    logging:false,
    pool: {
        max: 5,
        idle: 30000,
        acquire: 60000,
    },
});

module.exports = sequelize;
