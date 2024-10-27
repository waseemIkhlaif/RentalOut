// models/SecurityDeposit.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SecurityDeposit = sequelize.define('SecurityDeposit', {
    deposit_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    rental_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Rentals',
            key: 'rental_id',
        },
    },
    deposit_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    is_refunded: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    refund_date: {
        type: DataTypes.DATE,
    },
}, {
    timestamps: true,
});

module.exports = SecurityDeposit;
