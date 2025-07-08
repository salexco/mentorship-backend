const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  mentee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
