const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('RentalOut', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

// Export the Sequelize instance
module.exports = sequelize;