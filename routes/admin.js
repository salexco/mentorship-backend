const Setting = require('../models/Setting');
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied: Admins only' });
  }
  next();
};

router.get('/users', authMiddleware, adminOnly, adminController.getAllUsers);
router.get('/requests', authMiddleware, adminOnly, adminController.getAllRequests);
router.get('/sessions', authMiddleware, adminOnly, adminController.getAllSessions);
router.put('/users/:id/role', authMiddleware, adminOnly, adminController.updateUserRole);
router.get('/users',
  authMiddleware,           // ✅ first check token
  roleMiddleware(['admin']),// ✅ then check role
  adminController.getAllUsers
);

module.exports = router;

router.use(authMiddleware); // Ensure user is authenticated first

router.get('/users', roleMiddleware(['admin']), adminController.getAllUsers);
router.get('/requests', roleMiddleware(['admin']), adminController.getAllRequests);
router.get('/sessions', roleMiddleware(['admin']), adminController.getAllSessions);

// Get admin profile
router.get('/profile', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    const admin = await User.findById(req.user.id).select('-password');
    res.json(admin);
  } catch (err) {
    console.error('Error fetching admin profile:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update admin profile
router.put('/profile', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  const { name, email } = req.body;
  try {
    const updatedAdmin = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true }
    ).select('-password');
    res.json(updatedAdmin);
  } catch (err) {
    console.error('Error updating admin profile:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all matches (sessions) for admin
router.get('/matches', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    const matches = await Session.find()
      .populate('mentor', 'name email')
      .populate('mentee', 'name email')
      .sort({ createdAt: -1 });

    res.json(matches);
  } catch (err) {
    console.error('Error fetching matches:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all mentees
router.get('/mentees', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    const mentees = await User.find({ role: 'mentee' }).select('-password').sort({ createdAt: -1 });
    res.json(mentees);
  } catch (err) {
    console.error('Error fetching mentees:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all mentors
router.get('/mentors', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    const mentors = await User.find({ role: 'mentor' }).select('-password').sort({ createdAt: -1 });
    res.json(mentors);
  } catch (err) {
    console.error('Error fetching mentors:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all sessions
router.get('/sessions', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    const sessions = await Session.find()
      .populate('mentor', 'name email')
      .populate('mentee', 'name email')
      .sort({ date: -1 });
    res.json(sessions);
  } catch (err) {
    console.error('Error fetching sessions:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all feedback
router.get('/feedback', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate('mentee', 'name email')
      .populate('mentor', 'name email')
      .sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    console.error('Error fetching feedback:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all users (admin only)
router.get('/users', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a user (admin only)
router.delete('/users/:id', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error('Error deleting user:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all settings
router.get('/settings', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    const settings = await Setting.find();
    res.json(settings);
  } catch (err) {
    console.error('Error fetching settings:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a setting
router.put('/settings/:key', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  const { value } = req.body;
  try {
    const setting = await Setting.findOneAndUpdate(
      { key: req.params.key },
      { value },
      { upsert: true, new: true }
    );
    res.json(setting);
  } catch (err) {
    console.error('Error updating setting:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});




module.exports = router;

