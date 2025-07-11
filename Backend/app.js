const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();

const cors = require('cors')
const cookieParser = require('cookie-parser')
const dbConnection = require('./db/connection')
const userRoutes = require('./routes/userRoutes')
const captainRoutes = require('./routes/captainRoutes')

dbConnection()

// Middleware for cross-origin requests and JSON parsing
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cookieParser())

// Base route
app.get('/', (req, res) => {
    res.send(`Server is ready`);
});

// User routes
app.use('/users', userRoutes)
app.use('/captains', captainRoutes)
 
module.exports = app;