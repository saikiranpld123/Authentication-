const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config.js'); // Adjust this path if necessary

const sequelize = new Sequelize(
    dbConfig.DB, 
    dbConfig.USER, 
    dbConfig.PASSWORD, 
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.user = require('./user.model.js')(sequelize, Sequelize); // Assuming user.model.js is in the same directory
db.role = require('./role.model.js')(sequelize, Sequelize); // Assuming role.model.js is in the same directory

// Define relationships
db.role.belongsToMany(db.user, {
  through: "user_roles"
});
db.user.belongsToMany(db.role, {
  through: "user_roles"
});

// Predefined roles
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
