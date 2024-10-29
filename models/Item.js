const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Item = sequelize.define('Item', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    pricePerDay: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    categoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Categories',
            key: 'id'
        }
    },
    ownerId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
});

Item.associate = models => {
    Item.belongsTo(models.User, { foreignKey: 'ownerId' });
    Item.belongsTo(models.Category, { foreignKey: 'categoryId' });
    Item.hasMany(models.Rental, { foreignKey: 'itemId' });
    Item.hasMany(models.Review, { foreignKey: 'itemId' });
    Item.hasMany(models.Logistics, { foreignKey: 'itemId' });
};

module.exports = Item;
