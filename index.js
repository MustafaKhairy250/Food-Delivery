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
// User Route All CRUD Operations
app.use('/user' , require('./routes/userRoute/userRoute'))
// restaurant Route All CRUD Operations
app.use('/restaurant' , require('./routes/restaurantRoute/restaurantRoute'))
//menu-items Route All CRUD Operations
app.use('/menu-items' , require('./routes/restaurantRoute/menuItemsRoute/menu-items-Route'))
//order Route
app.use('/orders' , require('./routes/userRoute/orderRoutes/orderRoute'))

//? delwa2ty 5lsna kol end point fel auth lw7dha w 3mlna controller ll review fadel bokra nzbt kol l files hna w fe postman w nkml b2a sho8l mn mkan ma w2fna 
//! post man change all end points and tokens 
//! create order finished and start over it with get all orders and status
// انقل كل اند بوينت علي حسب الرول بتاع اللي يقدر يوصلها
//seeder for meals 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));