const express = require('express'); 
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const User = require('../models/User');

// ✅ Get current user profile
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching user profile:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Update general user profile
router.put('/me', authMiddleware, async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { $set: req.body },
      { new: true }
    ).select('-password');
    res.json(updated);
  } catch (err) {
    console.error('Error updating user profile:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Update mentor-specific profile (using roleMiddleware)
router.put('/mentor/profile', authMiddleware, roleMiddleware(['mentor']), async (req, res) => {
  try {
    const { name, bio, skills, goals } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { name, bio, skills, goals },
      { new: true }
    ).select('-password');

    if (!updated) {
      return res.status(404).json({ error: 'Mentor not found' });
    }

    res.json(updated);
  } catch (err) {
    console.error('Error updating mentor profile:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;