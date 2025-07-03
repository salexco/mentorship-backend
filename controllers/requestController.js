const Request = require('../models/MentorshipRequest');
const MentorshipRequest = require('../models/MentorshipRequest');

exports.sendRequest = async (req, res) => {
  const { mentorId, message } = req.body;
  try {
    const request = new MentorshipRequest({
      mentee: req.user.id,
      mentor: mentorId,
      message  // ✅ ensure message is included here
    });

    await request.save();
    res.status(201).json(request);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMyRequests = async (req, res) => {
  try {
    const requests = await MentorshipRequest.find({ mentee: req.user.id }).populate('mentor', '-password');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyMentees = async (req, res) => {
  try {
    const requests = await MentorshipRequest.find({ mentor: req.user.id }).populate('mentee', '-password');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMentorRequests = async (req, res) => {
  try {
    const requests = await Request.find({ mentor: req.user.id }).populate('mentee', '-password');
    res.json(requests);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.acceptRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    // ✅ Ensure only the mentor can accept
    if (request.mentor.toString() !== req.user.id) {
      return res.status(403).json({ error: 'You are not authorized to accept this request' });
    }

    request.status = 'accepted';
    await request.save();

    res.json({ message: 'Request accepted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.rejectRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    // ✅ Ensure only the mentor can reject
    if (request.mentor.toString() !== req.user.id) {
      return res.status(403).json({ error: 'You are not authorized to reject this request' });
    }

    request.status = 'rejected';
    await request.save();

    res.json({ message: 'Request rejected' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};