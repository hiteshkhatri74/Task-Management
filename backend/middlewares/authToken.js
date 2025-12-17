const jwt = require('jsonwebtoken');          // Import JWT to verify authentication token
const User = require('../models/user');     // Import User model

const middleware = async (req,res,next) => {    // Authentication middleware
    try{
        const token = req?.cookies?.token || (req?.headers?.authorization && req?.headers?.authorization.split(" ")[1]);
                                                       // Get token from cookies OR Authorization header (Bearer token)

        if(!token){
            return res.status(401).json({            // If token not found, user is not logged in
                message : "Please Login",
                error : true,
                success : false
            });
        }

        const decoded = jwt.verify(token,process.env.JWT_KEY);        // Verify token and decode payload using secret key
        const user = await User.findOne({email : decoded.email});         // Find user using email from decoded token

        if(!user){
            return res.status(401).json({                                 // If user does not exist or token is invalid
                message : "You are not authorize",
                error : true,
                success : false
            });
        }

        req.user = user;                      // Attach user data to request object
        next();                                 // Allow request to proceed to next middleware/controller
    }
    catch(err){
        res.status(500).json({                     // Handle token verification or server errors
            message : err.message || err,
            error : true,
            success : false
        });
    }
}

module.exports = middleware;                // Export authentication middleware