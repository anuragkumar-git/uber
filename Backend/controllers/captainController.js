const { blackListModel } = require('../models/blackListedModel')
const captainModel = require('../models/captainModel')
const captainService = require('../services/captainService')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

module.exports.registerCaptain = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { fullname, email, password, vehicle } = req.body

    const isCaptainExist = await captainModel.findOne({ email })
    if (isCaptainExist) {
        return res.status(400).json({ Message: 'Captain already exist' })
    }

    // Hash password using model method
    const hashedPassword = await captainModel.hashPassword(password)

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    })

    // const token = captain.generateAuthToken();
    const token = jwt.sign({ _id: captain._id }, process.env.JWT_SECRET, { expiresIn: '24h' })
    return res.status(201).json({ token, captain })
}


module.exports.loginCaptain = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    const captain = await captainModel.findOne({ email }).select('+password')
    if (!captain) {
        return res.status(401).json({ message: 'Invalid email or password' })
    }

    const passwordMatch = await captain.comparePassword(password)
    if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' })
    }

    const token = jwt.sign({ _id: captain._id }, process.env.JWT_SECRET, { expiresIn: '24h' })
    res.cookie('token', token)
    return res.status(200).json({ token, captain })
}

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({ captain: req.captain })
}

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token
    await blackListModel.create({ token })

    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successfully' });


}