const mongoose = require('mongoose');

const AvailabilitySchema = new mongoose.Schema({
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  day: { type: String, required: true }, // e.g. Monday
  slots: [{ type: String }] // e.g. ["10:00 AM - 11:00 AM", "2:00 PM - 3:00 PM"]
}, { timestamps: true });

module.exports = mongoose.model('Availability', AvailabilitySchema);