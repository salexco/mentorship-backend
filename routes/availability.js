const express = require('express');
const router = express.Router();
const availabilityController = require('../controllers/availabilityController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, availabilityController.setAvailability);
router.get('/', authMiddleware, availabilityController.getAvailability);

module.exports = router;