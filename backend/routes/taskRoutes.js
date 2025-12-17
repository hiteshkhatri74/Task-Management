const express = require('express');                                     // Import Express framework
const middleware = require('../middlewares/authToken');
const getTask = require('../controllers/task/getTask');
const createTask = require('../controllers/task/createTask');
const deleteTask = require('../controllers/task/deleteTask');
const updateTask = require('../controllers/task/updateTask');
const router = express.Router();                                        // Create an Express router instance


// ------------------- Task Routes (Protected) -------------------
router.get('/', middleware, getTask);                   // Protected route to get all tasks of logged-in user
router.post('/', middleware, createTask);               // Protected route to create a new task
router.delete('/:id', middleware, deleteTask);            // Protected route to delete a task by ID
router.put('/:id', middleware, updateTask);            // Protected route to update a task by ID

module.exports = router;                               // Export router to use in main app