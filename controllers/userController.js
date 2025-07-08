const User = require('../models/User');

// ✅ Get current user profile
exports.getMyProfile = async (req, res) => {
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
};

// ✅ Update general user profile
exports.updateProfile = async (req, res) => {
  const { name, bio, skills, goals } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, bio, skills, goals },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error('Error updating user profile:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// ✅ Update mentor-specific profile (if needed separately)
exports.updateMentorProfile = async (req, res) => {
  const { name, bio, skills, goals } = req.body;
  try {
    const updatedMentor = await User.findByIdAndUpdate(
      req.user.id,
      { name, bio, skills, goals },
      { new: true }
    ).select('-password');

    if (!updatedMentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }

    res.json(updatedMentor);
  } catch (err) {
    console.error('Error updating mentor profile:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};
