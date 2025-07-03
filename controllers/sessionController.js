const Session = require('../models/Session');
const Availability = require('../models/Availability');

exports.bookSession = async (req, res) => {
  // booking logic
};

exports.getSessions = async (req, res) => {
  // get sessions logic
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