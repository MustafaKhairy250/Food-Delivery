const express = require('express');
const app = express();
const PORT = process.env.PORT || 3500;
// Static Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Auth Routes
app.use('/auth' , require('./routes/authRoutes/registerRoute'))
app.use('/auth' , require('./routes/authRoutes/loginRoute'))
// User Route
app.use('/user' , require('./routes/userRoute/userRoute'))
// restaurant Route
app.use('/restaurant' , require('./routes/restaurantRoute/restaurantRoute'))

app.use('/menu-items' , require('./routes/menuItemsRoute/menu-items-Route'))

//! don't forget validators of menu items
// need to make controller of menu items and routes then to check every end point with all the middlewares 
// all  possible end points (get all and get one don't need a role middleware)(create and update and delete need a restaurant role middleware)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));