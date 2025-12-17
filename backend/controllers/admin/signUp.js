const bcrypt = require('bcryptjs');                             // Import bcrypt to hash passwords securely
const User = require('../../models/user');                        // Import User model
const generateToken = require('../../components/generateToken');   // Import function to generate JWT token

const signUp = async (req,res) => {
    try{
        const { name, email, password, profilePic } = req?.body;         // Extract user data from request body

        if(!name || !email || !password ){                  // Validate required fields
            return res.status(400).json({
                message : "Please fill out inputs",
                success : false,
                error : true
            });
        }

        const existingUser = await User.findOne({email : email});     // Check if user already exists
        if(existingUser){                                             // Prevent duplicate account creation
            return res.status(400).json({
                message : "You already have an account, Please Login",
                success : false,
                error : true
            });
        }

        const salt = await bcrypt.genSalt(10);                       // Generate salt for hashing
        const hashPassword = await bcrypt.hash(password, salt);     // Hash the user password

        if(!hashPassword){                                       // Safety check (rarely fails)
            return res.status(500).json({
                message : "Something went wrong",
                error : true,
                success : false,
            });
        }

        const user = await User.create({                   // Save user in database with hashed password
            name,
            email,
            password : hashPassword,
            profilePic : profilePic ? profilePic.trim() : ""
        });

        const token = generateToken(user);            // Generate JWT token
        const tokenOption = {
            httpOnly : true,                       // Cookie not accessible by JS
            secure : true,                         // Works only on HTTPS
            sameSite : 'None',                     // Allows cross-site cookies
            maxAge : 24 * 60 * 60 * 1000           // 1 day expiry
        }

        res.cookie('token',token, tokenOption);       // Store token in browser cookies
        res.status(201).send({                        // Send success response
            message : "User Created Successfully",
            success : true,
            error : false
        });
    }
    catch(err){
        res.status(500).json({                       // Handle unexpected server errors
            message : err.message || err,
            success : false,
            error : true
        });
    }
}

module.exports = signUp;    // Export signup function