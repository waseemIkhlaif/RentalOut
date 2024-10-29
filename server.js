const express = require("express");
const app = express();
const sequelizee = require('./config/database');


//controllers
const UserController = require('./controllers/UserController');
const CategoryController = require('./controllers/CategoryController');
const RentalController = require('./controllers/RentalController');
const ItemController = require('./controllers/ItemController');
const LogisticsController = require('./controllers/LogisticsController');
app.use(express.json());
// api routers
app.use('/api/user', UserController);
app.use('/api/category', CategoryController);
app.use('/api/rental', RentalController);
app.use('/api/item', ItemController);
app.use('/api/logistic', LogisticsController);



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