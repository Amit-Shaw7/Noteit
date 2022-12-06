const mongoose = require('mongoose');

// Creating a Schema for user 
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    timeStamp : {
        type : Date,
        default : Date.now
    }
});

// Ceating a modal for userSchema
module.exports = mongoose.model('user' , userSchema);