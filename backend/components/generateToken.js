const jwt = require('jsonwebtoken');               // Import jsonwebtoken to create JWT tokens

const generateToken = (user) => {
    return jwt.sign({ email: user.email, id : user._id},     // Payload: user data stored in token
        process.env.JWT_KEY);                                // Secret key used to sign the token
}

module.exports = generateToken;                // Export function to generate JWT token