// models/Item.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Item = sequelize.define('Item', {
    item_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'user_id',
        },
    },
    category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Categories',
            key: 'category_id',
        },
    },
    item_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    price_per_day: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    available_from: {
        type: DataTypes.DATE,
    },
    available_to: {
        type: DataTypes.DATE,
    },
    condition: {
        type: DataTypes.STRING(50),
    },
    security_deposit: {
        type: DataTypes.DECIMAL(10, 2),
    },
    image_url: {
        type: DataTypes.STRING(255),
    },
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Item;
