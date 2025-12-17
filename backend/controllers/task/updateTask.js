const Task = require("../../models/task");                     // Import Task model to update tasks in database

const updateTask = async (req, res) => {
    try{
        const { title, description,status } = req?.body;            // Extract updated title and description from request body
        const taskId = req?.params?.id;                      // Get task ID from URL params
        const userId = req?.user?._id;                     // Get logged-in user ID from auth middleware

        if(!taskId){
            return res.status(400).json({                      // If task ID is missing
                message : "Task Id is required",
                error : true,
                success : false
            });
        }

        if(!userId){                                   // If user is not authenticated
            return res.status(404).json({
                message : "User not found",
                error : true,
                success : false
            });
        }

        const task = await Task.findOne({            // Find task that belongs to the logged-in user
            _id : taskId,
            userId : userId
        });

        if(!task){                                        // If task does not exist or does not belong to user
            return res.status(404).json({
                message : "Task not found",
                error : true,
                success : false
            });
        }

        if(title !== undefined) task.title = title;                        // Update title if provided
        if(description !== undefined) task.description = description;      // Update description if provided
        if(status!== undefined) task.status = status;                      // update task status if provided
        await task.save();                                       // Save updated task to database

        res.status(200).json({                                 // Send success response
            message : "Task updated successfully",
            data : task,
            success : true,
            error : false
        });
    }
    catch(err){
        res.status(500).json({                          // Handle server or database errors
            message : err.message || err,
            error : true,
            success : false
        });
    }
}

module.exports = updateTask;                       // Export updateTask controller