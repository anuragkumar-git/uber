const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Define user schema with fields for full name, email, password, and socketId
const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [2, 'First name must be atleast 2 characters long']
        },
        lastName: {
            type: String,
            minlength: [2, 'First name must be atleast 2 characters long']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be atleast 5 characters long']
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    }
})

// Generate JWT for authentication
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET)
    return token
}

// Compare provided password with the hashed password stored in the database
userSchema.methods.comparePassword = async function (password) {
    // console.log(password, typeof(this.password));
    return await bcrypt.compare(password, this.password)
}

// Hash password before saving it to the database
userSchema.statics.hashPassword = async (password) => {
    return await bcrypt.hash(password, 10)
}

// Create and export the user model
const userModel = mongoose.model('users', userSchema)
module.exports = userModel