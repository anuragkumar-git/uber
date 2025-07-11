const { userModel } = require('../models/userModel')
const captainModel = require('../models/captainModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { blackListModel } = require('../models/blackListedModel');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            msg: "Unauthorized token"
        })
    }

    const isBlackListed = await blackListModel.findOne({ token: token })
    if (isBlackListed) {
        return res.status(401).json({
            msg: "Unauthorized"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findById(decoded._id)
        console.log(user);

        req.user = user
        return next()
    } catch {
        return res.status(401).json({
            msg: "Unauthorized"
        })
    }
}


module.exports.authCaptain = async (req, res, next)=>{
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({message:'Unauthorized Token'})
    }
     const isBlackListed = await blackListModel.findOne({ token: token })
    if (isBlackListed) {
        return res.status(401).json({
            msg: "Unauthorized"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const captain = await captainModel.findById(decoded._id)
        console.log(captain);

        req.captain = captain
        return next()
    } catch {
        return res.status(401).json({
            msg: "Unauthorized"
        })
    }
}