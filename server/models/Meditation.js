const mongoose = require('mongoose');

const MeditationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['night', 'instant'],
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  moodBefore: {
    type: String,
    enum: ['excited', 'happy', 'neutral', 'sad', 'angry', 'anxious']
  },
  moodAfter: {
    type: String,
    enum: ['excited', 'happy', 'neutral', 'sad', 'angry', 'anxious']
  },
  flowPath: {
    type: [String],
    enum: ['body', 'senses', 'mind', 'intelligence', 'soul', 'paramatma']
  },
  completedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Meditation', MeditationSchema);
