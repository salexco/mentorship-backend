const Session = require('../models/Session');
const Availability = require('../models/Availability');

exports.bookSession = async (req, res) => {
  const { mentorId, day, slot } = req.body;

  try {
    // Check mentor availability
    const availability = await Availability.findOne({ mentor: mentorId, day });

    if (!availability || !availability.slots.includes(slot)) {
      return res.status(400).json({ error: 'Selected slot is not available' });
    }

    // Create session
    const session = new Session({
      mentee: req.user.id,
      mentor: mentorId,
      day,
      slot,
      status: 'pending'
    });

    await session.save();

    // Optionally remove booked slot from availability
    availability.slots = availability.slots.filter(s => s !== slot);
    await availability.save();

    res.status(201).json(session);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

  

exports.getSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ mentee: req.user.id }).populate('mentor');
    res.json(sessions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const mongoose = require('mongoose');
exports.getMentorSessions = async (req, res) => {
  try {
    const mentorObjectId = new mongoose.Types.ObjectId(req.user.id);
    const sessions = await Session.find({ mentor: mentorObjectId}).populate('mentee');
    res.json(sessions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Ensure only mentor can mark as completed
    if (status === 'completed' && session.mentor.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Only mentor can mark as completed' });
    }

    // Ensure only mentee can cancel
    if (status === 'cancelled' && session.mentee.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Only mentee can cancel session' });
    }

    session.status = status;
    await session.save();

    res.json({ message: 'Session marked as ${status}', session });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.addFeedback = async (req, res) => {
  const { feedback, rating } = req.body;

  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Ensure only mentee can leave feedback
    if (session.mentee.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Only mentee can leave feedback' });
    }

    session.feedback = feedback;
    session.rating = rating;
    await session.save();

    res.json({ message: 'Feedback submitted successfully', session });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMentorFeedback = async (req, res) => {
  try {
    const sessions = await Session.find({ mentor: req.user.id, feedback: { $exists: true } })
      .populate('mentee', 'name email');

    res.json(sessions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};