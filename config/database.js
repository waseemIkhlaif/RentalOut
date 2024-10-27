const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('rental_platform', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

// Export the Sequelize instance
module.exports = sequelize;