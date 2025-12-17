const mongoose = require('mongoose');      // Import mongoose to interact with MongoDB

const taskSchema = mongoose.Schema({
    title : {
        type : String,               // Task title as string
        required : true              // Title is mandatory
    },
    description : {
        type : String,               // Detailed task description
        required : true
    },
    status : {
        type : String,                             // Current status of the task
        enum : ["pending", "completed"],           // Only these two values allowed
        default : "pending"                        // Default status when task is created
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,       // Stores User's ObjectId
        ref : 'User',                              // References the user collection (relation)
        required : true
    }
},{
    timestamps : true
}
);

module.exports = mongoose.model('Task', taskSchema);    // Export Task model to use in other files