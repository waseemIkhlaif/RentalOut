const express = require("express");
const app = express();
const sequelizee = require('./config/database');

const Role = require('./models/Role');
//controllers
const UserController = require('./controllers/UserController');
const CategoryController = require('./controllers/CategoryController');
const RentalController = require('./controllers/RentalController');
const ItemController = require('./controllers/ItemController');
const LogisticsController = require('./controllers/LogisticsController');
const ReviewController = require('./controllers/ReviewController');
const DepositController = require('./controllers/SecurityDepositController');
const TransactionController = require('./controllers/TransactionController');
app.use(express.json());
// api routers
app.use('/api/user', UserController);
app.use('/api/category', CategoryController);
app.use('/api/rental', RentalController);
app.use('/api/item', ItemController);
app.use('/api/logistic', LogisticsController);
app.use('/api/review', ReviewController);
app.use('/api/Deposit', DepositController);
app.use('/api/transaction', TransactionController);


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