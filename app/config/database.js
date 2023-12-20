// database.js

const { Sequelize } = require('sequelize');
const dbConfig = require('./app/config/db.config'); // Adjust the relative path according to where this file is located

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

module.exports = sequelize;

