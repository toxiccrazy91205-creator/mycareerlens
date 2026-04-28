const mongoose = require('mongoose');

const careerMatchSchema = new mongoose.Schema({
  careerId: String,
  name: String,
  score: Number,
  tier: {
    type: String,
    enum: ['strong', 'good', 'explore']
  },
  why: [String]
});

const resultSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  },
  careers: [careerMatchSchema],
  completedAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Result', resultSchema);