const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Comment = require('../models/Comment');

// Post a comment (mentor to mentee)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { menteeId, text } = req.body;

    const comment = new Comment({
      mentor: req.user._id,
      mentee: menteeId,
      text
    });

    await comment.save();
    res.json(comment);
  } catch (err) {
    console.error('Error posting comment:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all comments for a mentee
router.get('/:menteeId', authMiddleware, async (req, res) => {
  try {
    const comments = await Comment.find({ mentee: req.params.menteeId })
      .populate('mentor', 'name email');
    res.json(comments);
  } catch (err) {
    console.error('Error fetching comments:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
