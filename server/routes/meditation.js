const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Meditation = require('../models/Meditation');

// Start a meditation session
router.post('/', auth, async (req, res) => {
  try {
    const { type, duration, moodBefore } = req.body;
    
    const meditation = new Meditation({
      user: req.user.id,
      type,
      duration,
      moodBefore
    });

    await meditation.save();
    res.json(meditation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Complete a meditation session
router.put('/:id', auth, async (req, res) => {
  try {
    const { moodAfter, flowPath } = req.body;
    
    const meditation = await Meditation.findById(req.params.id);
    if (!meditation) return res.status(404).json({ msg: 'Meditation not found' });

    if (meditation.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    meditation.moodAfter = moodAfter;
    meditation.flowPath = flowPath;
    await meditation.save();

    res.json(meditation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all meditation sessions
router.get('/', auth, async (req, res) => {
  try {
    const meditations = await Meditation.find({ user: req.user.id }).sort('-completedAt');
    res.json(meditations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
