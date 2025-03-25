const { userModel } = require('../models/userModel')
const userService = require('../services/userService')
const { validationResult } = require('express-validator')
const { blackListModel } = require('../models/blackListedModel')
// Handle user registration
const registerUser = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { fullName, email, password } = req.body
    // Hash password using model method
    const hashedPassword = await userModel.hashPassword(password)

    // console.log('Controller:', fullName, email, hashedPassword);
    // console.log(req.body);

    // Create user using service layer
    const user = await userService.createUser({
        firstName: fullName.firstName,
        lastName: fullName?.lastName,
        email,
        password: hashedPassword
    })
    // console.log('controlleruser:', user);

    // Generate JWT token
    const token = user.generateAuthToken()
    res.status(201).json({ token, user })
}

// Handle user login
const loginUser = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body

    // Find user by email and include password in query
    const user = await userModel.findOne({ email }).select('+password')

    if (!user) {
        return res.status(401).json({
            message: 'Invalid Email or Password'
        })
    }

    // Compare input password with hashed password
    const isMatch = await user.comparePassword(password)
    // console.log('isMatch');

    if (!isMatch) {
        return res.status(401).json({
            message: 'Invalid Email or Password'
        })
    }

    // Generate token for authenticated user
    const token = user.generateAuthToken()
    res.cookie('token', token)
    res.status(200).json({ token, user })
}

//Handle user authentication
const getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user)
}

// Handle user logout
const logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await blackListModel.create({ token })
    res.status(200).json({ msg: "Logged out" })
}

module.exports = { registerUser, loginUser, getUserProfile, logoutUser }