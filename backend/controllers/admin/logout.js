const logout = (req,res) => {                    // Logout controller function
    const tokenOption = {
        httpOnly : true,                        // Cookie not accessible via JavaScript
        secure : true,                          // Cookie works only over HTTPS
        sameSite : "None"                       // Allows cross-site cookies
    }

    res.clearCookie("token", tokenOption);        // Remove the JWT token cookie from browser
    res.json({                                    // Send logout success response
        message : "Logout Successfully",
        success : true,
        error : false,
    });
}

module.exports = logout;                 // Export logout controller