const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Session = require('../models/Session');

// Get sessions for the logged-in mentor
router.get('/mentor', authMiddleware, async (req, res) => {
  try {
    const sessions = await Session.find({ mentor: req.user.id }).populate('mentee');
    res.json(sessions);
  } catch (err) {
    console.error('Error fetching mentor sessions:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Book a new session (for mentees booking mentors)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { mentorId, date, time } = req.body;

    const newSession = new Session({
      mentor: mentorId,
      mentee: req.user.id,
      date,
      time,
      status: 'booked'
    });

    await newSession.save();
    res.json(newSession);
  } catch (err) {
    console.error('Error booking session:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/book', authMiddleware, async (req, res) => {
  const { mentorId, time } = req.body;

  try {
    const session = new Session({
      mentor: mentorId,
      mentee: req.user.id,
      time,
      status: 'pending'
    });

    await session.save();
    res.json({ message: 'Session booked successfully', session });
  } catch (err) {
    console.error('Error booking session:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
