const { userModel } = require('../models/userModel')

// Create a new user with hashed password and return user data
const createUser = async ({
    firstName, lastName, email, password
}) => {
    if (!firstName || !email || !password) {
        throw new Error('All field are required')
    }
    // console.log('service:',firstName, lastName, email, password);

    // Create user with provided details
    const user = await userModel.create({
        fullName: {
            firstName,
            lastName,
        },
        email,
        password
    })

    return user
}

module.exports = { createUser }