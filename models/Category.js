// models/Category.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('Category', {
    category_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    category_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = Category;
