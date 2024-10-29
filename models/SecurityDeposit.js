const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SecurityDeposit = sequelize.define('SecurityDeposit', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    depositAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('held', 'refunded', 'forfeited'),
        defaultValue: 'held'
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
});

SecurityDeposit.associate = models => {
    SecurityDeposit.belongsTo(models.User, { foreignKey: 'userId' });
};

module.exports = SecurityDeposit;
