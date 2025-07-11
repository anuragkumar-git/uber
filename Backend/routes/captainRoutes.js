const router = require('express').Router()
const { body } = require('express-validator')
const captainController = require('../controllers/captainController')
const authMiddleware = require('../middlewares/authMiddleware')

// router.get('/caption', middelware, controller)
router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must have atleast 3 characters'),
    body('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be atleast 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate Number must be atleast 3 characters long'),
    body('vehicle.capacity').isLength({ min: 1 }).withMessage('Vehicle capacity must be atlest 1'),
    body('vehicle.vehicleType').isIn(['motorcycle', 'auto', 'car']).withMessage('Invalid vehicle type')
], captainController.registerCaptain)

// Login route with input validation
router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 5 }).withMessage('Password must be atleast 5 characters long')
], captainController.loginCaptain)

router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile)

router.post('/logout', authMiddleware.authCaptain, captainController.logoutCaptain)

module.exports = router 