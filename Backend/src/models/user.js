const mongoose = require('mongoose');
const { type } = require('os');

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role:{
        type: String,
        enum:['usuario', 'admin'],
        default: 'usuario',
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'La contraseña debe tener al menos 8 caracteres']
    }
});

const user = mongoose.model('user', userSchema);

module.exports = user;