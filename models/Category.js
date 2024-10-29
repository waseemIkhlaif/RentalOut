const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

Category.associate = models => {
    Category.hasMany(models.Item, { foreignKey: 'categoryId' });
};

module.exports = Category;
