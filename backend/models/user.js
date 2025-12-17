const mongoose = require('mongoose');     // Import mongoose to work with MongoDB

const userSchema = mongoose.Schema({
    name : {
        type : String,             // Name will be a string
        required : true           //  Name is mandatory
    },
    email : {
        type : String,
        required : true,
        unique : true              // Email must be unique in database
    },
    password : {
        type : String,
        required : true
    },
    profilePic : {
        type : String,
        default : ""              // Optional field; empty string if not provided
    }
},{
    timestamps : true           // Automatically adds createdAt & updatedAt
});

module.exports = mongoose.model('User', userSchema);      // Export admin model to use in other files