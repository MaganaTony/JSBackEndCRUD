const createError = require('http-errors');
const encryption = require('../lib/encryption');
const jwt = require('../lib/jwt');
const User = require("../models/User");

async function createUser(data) {
    const userFound = await User.findOne({ email: data.email });

    if (userFound) {
        throw createError(409, 'Email already registered');
    }

    if (!data.password) {
        throw createError(400, 'Password is required');
    }

    if (data.password.length < 6) {
        throw createError(400, 'Password must be at least 6 characters long');
    }

    const password = encryption.encrypt(data.password) 

    data.password = password;
    
    const newUser = await User.create(data);
    
    return newUser;
}

async function getUserById(id){
    const user = await User.findById(id);
    if(!user){
        throw createError(404, 'User not found');
    }
    return user;
}

async function updateUserById(id){
    const user = await User.findByIdAndUpdate(id)
    if(!user){
        throw createError(404, 'User not found');
    }
    return user;
}

async function getById(id){
    const user = await User.findById(id);
    return user;
}

async function login(data) {
    const user = await User.findOne( {email: data.email} ).select('+password');
    console.log(user);
        
    if (!user) {
        throw createError(401, 'The user does not exist');
    }

    const isValidPassword = encryption.compare(data.password, user.password);

    if (!isValidPassword) {
        throw createError(401, 'Password is incorrect');
    }

    const token = jwt.sign( {id: user._id} );

    return { token, user, id: user._id }; // Mostrar token y datos de user

}

module.exports = {
    createUser,
    getUserById,
    getById,
    updateUserById,
    login
}