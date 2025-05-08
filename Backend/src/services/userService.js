const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user.js');

const secret_key = '1652013pP';

async function getUserById(id){
    try{
        const userId = await user.findById(id);
        if(!userId){
            throw new Error('No user found with the provided ID');
        }
        console.log('User found:', userId);
        return userId;
    }catch(error){
        console.error('Error while fetching user by ID:', error);
    }
}

async function insertUser(userData){
    try{
        console.log('Data received on the server:', userData);
        const {email, password, role, ...restData} = userData;

        const existingUser = await user.findOne({ email });

        if(existingUser){
            throw new Error('An account with that email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('password hashed:', hashedPassword);

        const newUser = new user({
            ...restData,
            email,
            password: hashedPassword,
            role: role || 'user'
        });

        const response = await newUser.save();
        console.log('user saved:', response);
        return response;
    }catch(error){
        console.error('Error creating user in the database:', error);
        throw error;
    }
}

async function getUsers(){
    try{
    const users = await user.find();
    return users;
}catch(error){
    console.error('Error while fetching users:', error);
    throw error;
}
}

async function  deleteUser(id){
    try{
        const userDelete = await user.findByIdAnadDelete(id);

        if(!userDelete){
            throw new Error('User not found');
        }

        console.log('User delete:', userDelete);
        return userDelete;

    }catch(error){
        console.log('Error while deleting the user', error);
        throw error;
    }
}

async function updateUser(id, userData){
    try{
    userData.lastUpdate = new Date();

    const userUpdate = await user.findByIdAndUpdate(id, userData,{
        new: true,
        runValidators: true,
    });

    if(!userUpdate){
        throw new Error('User not found');
    }

    console.log('User updated:', userUpdate);
    return userUpdate;
}catch(error){
    console.error('Error while updating the user');
    throw error;
}
}

const loginUser = async (email, password) =>{
    const userLogin = await user.findOne({ email });

    if(!userLogin){
        throw new Error ('User not found');
    }

    const match = await bcrypt.compare(password, user.password);
    if(!match){
        throw new Error('Password not found');
    }

    const token = jwt.sign({id: userLogin.id, email: userLogin.email, role:userLogin.role}, secret_key, {expiresIn:'1h'});
    console.log('Token generated:', token);
    return token;
}

module.exports = {
    insertUser,
    getUsers, 
    updateUser,
    getUserById,
    loginUser
}