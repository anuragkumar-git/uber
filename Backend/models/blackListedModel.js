const mongoose  = require("mongoose")
const Schema = mongoose.Schema()

// Define Black list Schema for tokens with fields for token and timestamp
const blackListSchema = new mongoose.Schema({
    token: {
        type: String,
        unique: true,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400
    }
})

const blackListModel = mongoose.model('blacklist', blackListSchema)

module.exports = {blackListModel}