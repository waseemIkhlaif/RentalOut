// models/Logistics.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Logistics = sequelize.define('Logistics', {
    logistics_id: {
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
    pickup_location: {
        type: DataTypes.STRING(255),
    },
    delivery_location: {
        type: DataTypes.STRING(255),
    },
    pickup_time: {
        type: DataTypes.DATE,
    },
    delivery_time: {
        type: DataTypes.DATE,
    },
    method: {
        type: DataTypes.ENUM('in-person', 'courier'),
        defaultValue: 'in-person',
    },
}, {
    timestamps: true,
});

module.exports = Logistics;
