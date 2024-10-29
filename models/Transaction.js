const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Payment = sequelize.define('Payment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('completed', 'pending', 'failed'),
        defaultValue: 'pending'
    },
    rentalId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Rentals',
            key: 'id'
        }
    }
});

Payment.associate = models => {
    Payment.belongsTo(models.Rental, { foreignKey: 'rentalId' });
};

module.exports = Payment;
