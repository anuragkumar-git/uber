const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();

const cors = require('cors')
const dbConnection = require('./db/connection')
const userRoutes = require('./routes/userRoutes')

dbConnection()

// Middleware for cross-origin requests and JSON parsing
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Base route
app.get('/', (req, res) => {
    res.send(`Server is ready`);
});

// User routes
app.use('/users', userRoutes)
 
module.exports = app;