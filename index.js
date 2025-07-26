const express = require('express');
const app = express();
const PORT = process.env.PORT || 3500;
// Static Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Admin Auth Routes
app.use('/admin' , require('./routes/adminRoutes/authRoutes/registerRoute'))
app.use('/admin' , require('./routes/adminRoutes/authRoutes/loginRoute'))
app.use('/admin/restaurants' , require('./routes/adminRoutes/authRoutes/restaurantRoutes')) // controlling restaurants
app.use('/admin/users' , require('./routes/adminRoutes/authRoutes/usersControlRoute')) // controlling users
// Admin Routes controlling restaurants Requests
app.use('/admin/restaurants' , require('./routes/adminRoutes/restaurantRequestsRoutes/reviewCreateRestRoute'))
app.use('/admin/restaurants' , require('./routes/adminRoutes/restaurantRequestsRoutes/reviewUpdateRestRoute'))
// order Route
app.use('/admin/orders' , require('./routes/adminRoutes/ordersRoutes/orderRoute'))


// Restaurant Auth Routes
app.use('/restaurant' , require('./routes/restaurantRoute/authRoutes/registerRoute'))
app.use('/restaurant' , require('./routes/restaurantRoute/authRoutes/loginRoute'))
// Restaurant CRUD Routes
app.use('/restaurants/deleted' , require('./routes/restaurantRoute/authRoutes/restoreDeletedRoute'))
app.use('/restaurants' , require('./routes/restaurantRoute/authRoutes/CRUD_restaurantRoute'))
//menu-items Route All CRUD Operations
app.use('/restaurants' , require('./routes/restaurantRoute/menuItemsRoute/menu-items-Route'))
//order Route
app.use('/restaurants/orders' , require('./routes/restaurantRoute/orderRoutes/orderRoute'))


// User Auth Routes
app.use('/user' , require('./routes/userRoute/authRoutes/registerRoute'))
app.use('/user' , require('./routes/userRoute/authRoutes/loginRoute'))
app.use('/user' , require('./routes/userRoute/authRoutes/userRoute'))
// User Routes
app.use('/user/addresses' , require('./routes/userRoute/adressesRoute/addressRoute'))
app.use('/user/restaurants' , require('./routes/userRoute/restaurantsRoute'))
//order Route
app.use('/user/orders' , require('./routes/userRoute/orderRoutes/orderRoute'))

//seeder for meals 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//! when order controllers end try to delete a customer user 