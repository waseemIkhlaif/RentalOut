const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    roleId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Roles',
            key: 'id'
        }
    }
});

User.associate = models => {
    User.hasMany(models.Item, { foreignKey: 'ownerId' });
    User.hasMany(models.Rental, { foreignKey: 'renterId' });
    User.hasMany(models.Review, { foreignKey: 'reviewerId' });
    User.belongsTo(models.Role, { foreignKey: 'roleId' });
    User.hasOne(models.SecurityDeposit, { foreignKey: 'userId' });
};

module.exports = User;
