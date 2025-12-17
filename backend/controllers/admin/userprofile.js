const User = require("../../models/user");                // Import Task model to interact with tasks collection

/* GET USER PROFILE */
const userProfile = async (req, res) => {
  try {
    const userId = req?.user?._id                                 // Get logged-in user's ID from req.user (set by auth middleware)
    const user = await User.findById(userId);                      // Find user by ID
 
    if (!user) {                                                 // If user does not exist in database
      return res.status(404).json({
        message : "User not found",
        error : true,
        success: false
      });
    }

    res.json({                                        // If user is found, send profile data
        message : "User profile found",
        user : user,
        success : true,
        error : false
    });
  } 
  catch(err){                                       // Handle any server or database errors
    res.status(500).json({
        message : err.message || err,
        error : true,
        success: false
    });
  }
};

module.exports = userProfile;