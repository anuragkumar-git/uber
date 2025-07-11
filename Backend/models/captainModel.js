const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const captainSchema = new mongoose.Schema({

    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [2, 'First name must have atleast 2 characters']
        },
        lastname: {
            type: String,
            minlength: [2, 'First name must have atleast 2 characters']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        // match: [/^\S@\S+\.\S+/, 'Please Enter a Valid Email']
    },
    // contactNumber: {
    //     type: Number,
    //     // required:true,
    // },
    password: {
        type: String,
        required: true,
        select: false,
    },
    soketId: {
        type: String
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    // vehicleInfo: {
    //     VehicleNumber: {
    //         type: String,
    //         uppercase: true
    //     },
    //     vehicleType: {
    //         type: String,
    //         required: true,
    //         enum: ['Two Wheeler', 'Auto', 'Car', 'Bike'],
    //     },
    //     vehicalColor: {
    //         type: String,
    //         required: true,
    //     },
    //     passengerCapacity: {
    //         type: Number,
    //         requried: true,
    //         min: [1, 'Minimum Single Passenger Capacity Required']
    //     }

    // },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'Color must be atlest 3 characters long']
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, 'Plate must be atlest 3 characters long']
            // uppercase: true
        },
        capacity: {
            type: Number,
            requried: true,
            min: [1, 'Minimum Single Passenger Capacity Required']
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['motorcycle', 'auto', 'car'],
        },

    },
    location: {
        lat: { type: Number },
        lang: { type: Number }
    }
})

//JWT Token for Authentication
captainSchema.methods.generatAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SCERET, { expiresIn: '24h' })
    return token
}

//Compare Password
captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

//Hash Password Before Using it
captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10)
}

const captainModel = mongoose.model('captain', captainSchema)
//export const captainModel = mongoose.model('captain', captainSchema)

module.exports = captainModel 