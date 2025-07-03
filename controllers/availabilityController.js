const Availability = require('../models/Availability');

exports.setAvailability = async (req, res) => {
  const { day, slots } = req.body;

  try {
    // Check if availability for that day already exists for this mentor
    let availability = await Availability.findOne({ mentor: req.user.id, day });

    if (availability) {
      // Update slots
      availability.slots = slots;
      await availability.save();
      res.json({ message: 'Availability updated', availability });
    } else {
      // Create new availability
      availability = new Availability({
        mentor: req.user.id,
        day,
        slots
      });
      await availability.save();
      res.status(201).json({ message: 'Availability set', availability });
    }

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAvailability = async (req, res) => {
  try {
    const availability = await Availability.find({ mentor: req.user.id });
    res.json(availability);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};