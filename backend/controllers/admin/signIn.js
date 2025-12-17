const bcrypt = require('bcryptjs');                             // Import bcrypt to compare hashed passwords
const User = require('../../models/user');                       // Import user model
const generateToken = require('../../components/generateToken');   // Import function to generate JWT token

const signIn = async (req,res) => {
    try{
        const { email, password } = req?.body;                // Extract login credentials from request body

        if(!email || !password){                             // Validate required inputs
            return res.status(400).json({
                message : "Please fill out inputs",
                error : true,
                success : false
            });
        }

        const user = await User.findOne({email : email});    // Find user by email in database

        if(!user){                                         // If user not found
            return res.status(400).json({
                message : "Email or Password incorrect",
                error : true,
                success : false
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);      // Compare entered password with stored hashed password

        if(!isMatch){                                            // If password does not match
            return res.status(400).json({
                message : "Email or Password incorrect",
                error : true,
                success : false
            });
        }

        const token = generateToken(user);       // Generate JWT token using logged-in admin data
        const tokenOption = {
            httpOnly : true,                        // Prevent JavaScript access (XSS protection)
            secure : true,                          // Cookie sent only over HTTPS
            sameSite : "None",                      // Allows cross-site cookies
            maxAge : 24 * 60 * 60 * 1000            // Token expires in 1 day
        }

        res.cookie('token', token, tokenOption);    // Store token in secure HTTP-only cookie

        res.status(200).json({                     // Send successful login response
            message : "Login Successfully",
            success : true,
            error : false
        });
    }
    catch(err){
        res.status(500).json({                       // Handle server or unexpected errors
            message : err.message || err,
            error : true,
            success : false
        });
    }
}

module.exports = signIn;       // Export signin controller