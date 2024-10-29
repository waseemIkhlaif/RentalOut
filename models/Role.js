const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    roleName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

Role.associate = models => {
    Role.hasMany(models.User, { foreignKey: 'roleId' });
};

module.exports = Role;
