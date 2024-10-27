// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Import the Sequelize instance

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(20),
    },
    address: {
        type: DataTypes.TEXT,
    },
    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    role_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Roles',
            key: 'role_id',
        },
    },
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = User;
