const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ['admin', 'mentor', 'mentee'],
    default: 'mentee'
  },

  bio: {
    type: String,
    default: ''
  },

  skills: {
    type: [String],
    default: []
  },

  availability: {
  type: [String], // e.g. ['Monday 10am', 'Wednesday 2pm']
  default: []
},

  goals: {
    type: String,
    default: ''
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('User', userSchema);