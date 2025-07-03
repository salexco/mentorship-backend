const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied: Admins only' });
  }
  next();
};

router.get('/users', authMiddleware, adminOnly, adminController.getAllUsers);
router.get('/requests', authMiddleware, adminOnly, adminController.getAllRequests);
router.get('/sessions', authMiddleware, adminOnly, adminController.getAllSessions);

module.exports = router;