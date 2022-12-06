const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost:27017';

const connectToMongo = () => {
    mongoose.connect(dbURI, () => {
        console.log("DB connected Succesfully");
    })
}

module.exports = connectToMongo;