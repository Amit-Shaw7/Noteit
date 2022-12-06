const mongoose = require('mongoose');
// const {Schema} = mongoose;

// Creating a Schema for user 
const noteSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true,
    },
    tag : {
        type : String,
        default : "General"
    },
    timeStamp : {
        type : Date,
        default : Date.now
    }
});

// Ceating a modal for userSchema
module.exports = mongoose.model('notes' , noteSchema);