const Task = require("../../models/task");    // Import Task model to fetch tasks from database

const getTask = async (req,res) => {
    try{
        const userId = req?.user?._id;          // Get logged-in user ID from auth middleware

        if(!userId){
            return res.status(404).json({            // If user is not authenticated
                message : "User not found",
                error : true,
                success : false
            });
        }

        const tasks = await Task.find({ userId : userId }).sort({ createdAt: -1 });    // Fetch all tasks created by the logged-in user , sorted by creation date (newest first)

        res.status(200).json({                            // Send tasks in response
            message : "Tasks fetched successfully",
            data : tasks,
            success : true,
            error : false
        });
    }
    catch(err){                                            // Handle server or database errors
        res.status(500).json({
            message : err.message || err,
            error : true,
            success : false
        });
    }
}

module.exports = getTask;                               