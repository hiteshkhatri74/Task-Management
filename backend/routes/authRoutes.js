const express = require('express');                                     // Import Express framework
const signUp = require('../controllers/admin/signUp');                        // Import signup controller
const signIn = require('../controllers/admin/signIn');
const logout = require('../controllers/admin/logout');
const middleware = require('../middlewares/authToken');
const verify = require('../controllers/admin/verify');
const userProfile = require('../controllers/admin/userprofile');
const updateProfile = require('../controllers/admin/updateprofile');
const router = express.Router();                                        // Create an Express router instance

// ------------------- Auth Routes -------------------
router.post('/signup', signUp);                         // Route to register a new user
router.post('/signin', signIn);                         // Route to login user
router.post('/logout',middleware, logout);              // Route to logout user and clear token
router.get('/verify', verify);                          // Route to verify user is logged in or not 
router.get('/profile',middleware,userProfile);          // Route to get user profile
router.put("/profile",middleware,updateProfile);        // Route to update profile

module.exports = router;                               // Export router to use in main app