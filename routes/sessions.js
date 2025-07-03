const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, sessionController.bookSession);
router.get('/', authMiddleware, sessionController.getSessions);
router.put('/:id/status', authMiddleware, sessionController.updateStatus);

module.exports = router;