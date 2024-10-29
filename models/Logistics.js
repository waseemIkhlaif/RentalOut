const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Logistics = sequelize.define('Logistics', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    deliveryType: {
        type: DataTypes.ENUM('pickup', 'delivery'),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING
    },
    itemId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Items',
            key: 'id'
        }
    }
});

Logistics.associate = models => {
    Logistics.belongsTo(models.Item, { foreignKey: 'itemId' });
};

module.exports = Logistics;
