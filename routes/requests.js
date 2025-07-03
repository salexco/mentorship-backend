const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, requestController.sendRequest);
router.get('/my-requests', authMiddleware, requestController.getMyRequests);
router.get('/my-mentees', authMiddleware, requestController.getMyMentees);

// ✅ ADD THIS ROUTE
router.get('/mentor-requests', authMiddleware, requestController.getMentorRequests);
router.put('/:id/accept', authMiddleware, requestController.acceptRequest);
router.put('/:id/reject', authMiddleware, requestController.rejectRequest);

module.exports = router;