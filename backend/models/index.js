const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import your models here
db.User = require('./user')(sequelize, Sequelize);
db.Brand = require('./brand')(sequelize, Sequelize);
db.Influencer = require('./influencer')(sequelize, Sequelize);
db.Campaign = require('./campaign')(sequelize, Sequelize);

module.exports = db;
