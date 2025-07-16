const express = require('express');
const app = express();
const PORT = process.env.PORT || 3500;
// Static Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Admin Auth Routes
app.use('/admin' , require('./routes/adminRoutes/authRoutes/registerRoute'))
app.use('/admin' , require('./routes/adminRoutes/authRoutes/loginRoute'))
// User Auth Routes
app.use('/user' , require('./routes/userRoute/authRoutes/registerRoute'))
app.use('/user' , require('./routes/userRoute/authRoutes/loginRoute'))
// Restaurant Auth Routes
app.use('/restaurant' , require('./routes/restaurantRoute/authRoutes/registerRoute'))
app.use('/restaurant' , require('./routes/restaurantRoute/authRoutes/loginRoute'))
// Admin Routes controlling restaurants
app.use('/restaurants/unreviewed' , require('./routes/adminRoutes/reviewingRoute'))
// app.use('/restaurants/unreviewed' , require('./routes/adminRoutes/reviewingRoute'))
// User Route
app.use('/user' , require('./routes/userRoute/userRoute'))
// restaurant Route
app.use('/restaurant' , require('./routes/restaurantRoute/restaurantRoute'))
//menu-items Route
app.use('/menu-items' , require('./routes/menuItemsRoute/menu-items-Route'))
//order Route
app.use('/orders' , require('./routes/orderRoutes/orderRoute'))

//! post man change all end points and tokens 
//! create order finished and start over it with get all orders and status
// انقل كل اند بوينت علي حسب الرول بتاع اللي يقدر يوصلها
//? after all controllers and routes are done don't forget to make phone unique
//seeder for meals 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));