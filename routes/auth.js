const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware'); // if you have middleware to verify token

// Debug: Ensure login is defined
console.log('authController.login:', authController.login);

// Login route
router.post('/login', authController.login);

// Register route (optional, if you have registration logic)
router.post('/register', authController.register);

// New route to get current user
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;
