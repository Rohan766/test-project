const mongoose = require('mongoose');
require('dotenv').config(); 

const connectDB = async () => {
    try {
        const username = process.env.MONGODB_USERNAME;
        const password = process.env.MONGODB_PASSWORD; 
        const mongoURI = process.env.MONGODB_URI
        // console.log("UserName=>", username, "password=>", password, `mongodb://${username}:${password}@127.0.0.1:27017/test-project`)
        await mongoose.connect(`mongodb://${username}:${password}@${mongoURI}/test-project`);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    }
};
module.exports = connectDB;