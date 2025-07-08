const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ✅ LOGIN CONTROLLER
exports.login = async (req, res) => {
  console.log('👉 Incoming login email:', req.body.email);
  let { email, password } = req.body;

  try {
    // Normalize email input
    email = email.trim().toLowerCase();

    console.log('🔍 Login attempt with email:', email);

    const user = await User.findOne({ email });

    console.log('🧠 User found in DB:', user ? user.email : 'None');

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password',
        error: 'EMAIL_NOT_FOUND',
        token: null,
        user: null
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password',
        error: 'WRONG_PASSWORD',
        token: null,
        user: null
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      error: null,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error('❌ Login error:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: err.message,
      token: null,
      user: null
    });
  }
};

// ✅ REGISTER CONTROLLER
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existing = await User.findOne({ email: email.trim().toLowerCase() });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered',
        error: 'EMAIL_EXISTS'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email: email.trim().toLowerCase(), // normalize before saving
      password: hashedPassword,
      role
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      error: null
    });

  } catch (err) {
    console.error('❌ Register error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: err.message
    });
  }
};

// ✅ GET LOGGED-IN USER PROFILE
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: 'USER_NOT_FOUND'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User retrieved successfully',
      error: null,
      user
    });
  } catch (err) {
    console.error('❌ Get user error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error while getting user',
      error: err.message
    });
  }
};