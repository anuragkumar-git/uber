const router = require('express').Router()
const { body } = require('express-validator')
const userController = require('../controllers/userController')

// Register route with input validation
router.post('/register', [
    body('fullName.firstName').isLength({ min: 2 }).withMessage('First name must be atleast 2 characters long'),
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 5 }).withMessage('Password must be atleast 5 characters long')
], userController.registerUser)

// Login route with input validation
router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 5 }).withMessage('Password must be atleast 5 characters long')
], userController.loginUser)
module.exports = router