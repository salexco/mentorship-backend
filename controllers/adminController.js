const User = require('../models/User');
const Request = require('../models/MentorshipRequest');
const Session = require('../models/Session');


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find()
      .populate('mentee mentor', '-password');
    res.json(requests);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find()
      .populate('mentee mentor', '-password');
    res.json(sessions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateUserRole = async (req, res) => {
  const { role } = req.body;

  try {
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ message: 'User role updated', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};