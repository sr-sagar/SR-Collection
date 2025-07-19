const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    
    email: {
        type: String,
        required: true,
        unique: true
    },
    
    password: {
        type: String,
        required: true,

    },
    phoneNumber: {
        type: String,
        required: true,
    },
    adress: {
        city: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        }
    },
    userRole: {
        type: String,
        required: true,
    },
    
},{timestamps: true})

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;