// models/Rental.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Rental = sequelize.define('Rental', {
    rental_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    item_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Items',
            key: 'item_id',
        },
    },
    renter_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'user_id',
        },
    },
    rental_start_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    rental_end_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    total_price: {
        type: DataTypes.DECIMAL(10, 2),
    },
    status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'completed', 'canceled'),
        defaultValue: 'pending',
    },
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Rental;
