const Task = require("../../models/task");    // Import Task model to delete tasks from database

const deleteTask = async (req,res) => {
    try{
        const taskId = req?.params?.id;           // Get task ID from URL parameters
        const userId = req?.user?._id;          // Get logged-in user ID from auth middleware

        if(!taskId){                              // If task ID is missing
            return res.status(400).json({
                message : "Task Id is required",
                error : true,
                success : false
            });
        }

        if(!userId) {                            // If user is not authenticated
            return res.status(404).json({
                message : "User not Found",
                error : true,
                success : false
            });
        }

        const task = await Task.findOne({            // Find task that belongs to the logged-in user
            _id : taskId,
            userId : userId
        });

        if(!task){                               // If task does not exist or does not belong to user
            return res.status(404).json({
                message : "Task not found",
                error : true,
                success : false
            });
        }

        await task.deleteOne();             // Delete the task from database

        res.status(200).json({                               // Send success response
            message : "Task deleted successfully",
            success : true,
            error : false
        });
    }
    catch(err) {                                     // Handle server or database errors
        res.status(500).json({
            message : err.message || err,
            error : true,
            success : false
        });
    }
}

module.exports = deleteTask;                       // Export deleteTask controller