const express = require("express");

const app = express();
const sequelizee = require('./config/database');

// models
const User = require('./models/User');
const Item = require('./models/Item');
const Rental = require('./models/Rental');
const Review = require('./models/Review');
const Category = require('./models/Category');
const Transaction = require('./models/Transaction');
const Logistics = require('./models/Logistics');
const SecurityDeposit = require('./models/SecurityDeposit');
const Role = require('./models/Role');

// Relation
User.belongsTo(Role, { foreignKey: 'role_id' });
Item.belongsTo(User, { foreignKey: 'user_id' });
Item.belongsTo(Category, { foreignKey: 'category_id' });
Rental.belongsTo(Item, { foreignKey: 'item_id' });
Rental.belongsTo(User, { foreignKey: 'renter_id' });
Review.belongsTo(Rental, { foreignKey: 'rental_id' });
Review.belongsTo(User, { foreignKey: 'reviewer_id' });
Transaction.belongsTo(Rental, { foreignKey: 'rental_id' });
Logistics.belongsTo(Rental, { foreignKey: 'rental_id' });
SecurityDeposit.belongsTo(Rental, { foreignKey: 'rental_id' });

sequelizee.sync({ force: false })
    .then(() => {
        console.log('Database synced');
    })
    .catch((err) => {
        console.error('Error syncing database:', err);
    });

app.listen(8000, () => {
    console.log("app running");
})