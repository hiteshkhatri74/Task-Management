const User = require('../../models/user');                        // Import User model

const updateProfile = async (req,res) => {
    try{
        const { name, profilePic } = req?.body;            // Get updated data from request body
        const userId = req?.user?._id;                     // Get logged-in user's ID

        if(!userId){                                      // If user is not authenticated
            return res.status(401).json({
                message : "User not authorize",
                error : true,
                success : false
            });
        }

        if(!name && !profilePic){                                // atleast one field is require
            return res.status(400).json({
                message: "Please update at least one field",
                error: true,
                success: false
            });
        }

        const updateData = {}; 
        if(name) updateData.name = name;
        if(profilePic) updateData.profilePic = profilePic;

        const user = await User.findByIdAndUpdate(userId,                  // Update user profile by ID
            updateData,                                        
            { new : true }                                                // new: true -> returns updated document
        );

        if(!user){                                               // If user not found in database
            return res.status(404).json({
                message : "User not found",
                error : true,
                success : false
            });
        }

        res.status(200).json({                                        // Send success response with updated user data
            message : "User profile updated successfully",
            user,
            success : true,
            error : false
        });
    }
    catch(err){                                        // Handle server or database errors
    res.status(500).json({
        message : err.message || err,
        error : true,
        success: false
    });
  }
}

module.exports = updateProfile;