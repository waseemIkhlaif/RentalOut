// models/Review.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Review = sequelize.define('Review', {
    review_id: {
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
    reviewer_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'user_id',
        },
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        },
    },
    review_text: {
        type: DataTypes.TEXT,
    },
}, {
    timestamps: true,
    createdAt: 'created_at',
});

module.exports = Review;
