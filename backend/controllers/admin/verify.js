const jwt = require('jsonwebtoken');                                     // Import JSON Web Token library to verify tokens
const User = require("../../models/user");                               // Import User model to fetch user details from MongoDB

const verify = async (req, res) => {                                     // Controller function to verify if user is authenticated
    try{
        const token = req?.cookies?.token;                               // Get JWT token from browser cookies (sent by frontend)

        if(!token){                                                      // If no token is found in cookies
            return res.status(401).json({
                message : "You are not authorize",
                authorized : false,
                error : true,
                success : false
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);                    // If token is valid, `decoded` will have the payload
        const user = await User.findById(decoded.id).select("-password");          // Find the user in the database by ID from token

        if(!user){                                                        // If user not found in DB
            return res.status(401).json({
                message : "You are not authorize",
                authorized : false,
                error : true,
                success : false
            });
        }

        res.status(200).json({                                       // If token is valid and user exists
            message : "User is authorized",
            data : user,
            authorized : true,
            success : true,
            error : false
        });
    }
    catch(err){                                                   // Handle errors like invalid token, expired token
        res.status(401).json({
            message : err.message || err,
            authorized : false,
            error : true,
            success : false
        });
    }
}

module.exports = verify;