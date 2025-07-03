const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/me', authMiddleware, userController.getMyProfile);
router.put('/me/profile', authMiddleware, userController.updateProfile);

module.exports = router;