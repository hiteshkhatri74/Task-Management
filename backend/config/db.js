const mongoose = require('mongoose');                      // Import mongoose to connect with MongoDB

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);     // Connect to MongoDB using URI from environment variables
        console.log('MongoDB Connected');                  // Log success message if connection is successful
    }
    catch(err){
        console.error("MongoDB Error: ", err);            // Log error if connection fails
    }
}

module.exports = connectDB;                      // Export the database connection function