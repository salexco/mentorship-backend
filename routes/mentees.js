const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');
const Session = require('../models/Session');

// Get mentee profile
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const mentee = await User.findById(req.user.id).select('-password');
    res.json(mentee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get mentee booked sessions
router.get('/sessions', authMiddleware, async (req, res) => {
  try {
    const sessions = await Session.find({ mentee: req.user.id }).populate('mentor', 'name bio');
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update mentee profile
router.put('/profile', authMiddleware, async (req, res) => {
  const { name, bio, goals } = req.body;

  try {
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { name, bio, goals },
      { new: true }
    ).select('-password');

    res.json(updated);
  } catch (err) {
    console.error('Error updating mentee profile:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all mentors with availability (assuming availability is part of mentor schema)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const mentors = await User.find({ role: 'mentor' }).select('-password');
    res.json(mentors);
  } catch (err) {
    console.error('Error fetching mentors:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});



module.exports = router;
