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





app.listen(PORT, () => console.log(`Server running on port ${PORT}`));