const express = require('express');
const router = express.Router();
const mentorController = require('../controllers/mentorController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, mentorController.getMentors);

module.exports = router;