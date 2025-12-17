const Task = require("../../models/task");   // Import Task model to interact with tasks collection

const createTask = async (req, res) => {
    try{
        const { title, description } = req?.body;    // Extract task title and content from request body
        const userId = req?.user?._id;                 // Get logged-in user ID (set by auth middleware)

        if(!title || !description){                 // Validate required task fields
            return res.status(400).json({               
                message : "Please enter task",
                error : true,
                success : false
            });
        }

        if(!userId){                              // Safety check: user must be authenticated
            return res.status(404).json({
                message : "User not found",
                error : true,
                success : false
            });
        }

        const task = await Task.create({               // Create and save task linked to logged-in user
            title : title,
            description : description,
            userId : userId
        });

        res.status(201).json({                         // Send success response
            message : "Task Created Successfully",
            data : task,
            success : true,
            error : false
        });
    }
    catch(err){
        res.status(500).json({          // Handle server or database errors
            message : err.message || err,
            error : true,
            success : false
        });
    }
}

module.exports = createTask;