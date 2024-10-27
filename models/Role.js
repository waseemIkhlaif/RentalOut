// models/Role.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Role = sequelize.define('Role', {
    role_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    role_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = Role;
