const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');

// GET all mentors
router.get('/', authMiddleware, async (req, res) => {
  try {
    const mentors = await User.find({ role: 'mentor' }).select('-password');
    res.json(mentors);
  } catch (err) {
    console.error('Error fetching mentors:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET mentor by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const mentor = await User.findById(req.params.id).select('-password');
    if (!mentor || mentor.role !== 'mentor') {
      return res.status(404).json({ error: 'Mentor not found' });
    }
    res.json(mentor);
  } catch (err) {
    console.error('Error fetching mentor by ID:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});


// Get current mentor profile
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update mentor profile
router.put('/profile', authMiddleware, async (req, res) => {
  const { name, bio, skills, goals } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        bio,
        skills,
        goals
      },
      { new: true }
    ).select('-password');

    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:id/availability', authMiddleware, async (req, res) => {
  try {
    const mentor = await User.findById(req.params.id).select('name availability');
    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }
    res.json({ name: mentor.name, availability: mentor.availability });
  } catch (err) {
    console.error('Error fetching mentor availability:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
