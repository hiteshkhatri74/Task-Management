const express = require('express');                    // Import Express framework to build the backend server
const cors = require('cors');                          // Import CORS to allow frontend requests
const cookieParser = require('cookie-parser');         // Import cookie-parser to read cookies from requests
const dotenv = require('dotenv');                      // Import dotenv to read environment variables from .env file

const connectDB = require('./config/db');                   // Import MongoDB connection function
const taskRoutes = require('./routes/taskRoutes');          // Import task-related routes
const authRoutes = require('./routes/authRoutes');          // Import auth-related routes

dotenv.config();                         // Load environment variables
const app = express();                   // Initialize express app

// ------------------- Middlewares -------------------
app.use(cors({                                     // Enable CORS so frontend can access backend
   origin : process.env.FRONTEND_URL,              // frontend URL allowed
   credentials : true                              // allow cookies
}));

app.use(cookieParser());                       // Middleware to parse cookies
app.use(express.json());                       // Middleware to parse JSON request body

// ------------------- Database -------------------
connectDB();                                    // Connect to MongoDB database

// ------------------- Routes -------------------
app.use('/api/auth', authRoutes);                   
app.use('/api/tasks', taskRoutes);                        // Register task routes

// ------------------- Server -------------------
const PORT = process.env.PORT || 5000;                      // Define server port
 
app.listen(PORT,() => {                                              // Start the server
   console.log(`Server is running on http://localhost:${PORT}`);
});