// models/Transaction.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transaction = sequelize.define('Transaction', {
    transaction_id: {
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
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    payment_method: {
        type: DataTypes.STRING(50),
    },
    transaction_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed', 'failed'),
        defaultValue: 'pending',
    },
}, {
    timestamps: true,
});

module.exports = Transaction;
