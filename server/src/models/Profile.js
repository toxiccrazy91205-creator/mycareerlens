const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  group: {
    type: String,
    required: true
  },
  archetype: {
    id: String,
    name: String,
    description: String
  },
  hollandCodes: {
    type: Map,
    of: Number,
    default: {}
  },
  topInterests: [{
    type: String
  }],
  personality: {
    openness: Number,
    conscientiousness: Number,
    extraversion: Number,
    agreeableness: Number,
    emotionalStability: Number
  },
  intelligences: {
    type: Map,
    of: Number,
    default: {}
  },
  topIntelligences: [{
    type: String
  }],
  learningStyle: {
    type: String,
    enum: ['visual', 'auditory', 'readWrite', 'kinesthetic', null],
    default: null
  },
  eq: {
    type: Number,
    default: 0
  },
  unsureCount: {
    type: Number,
    default: 0
  },
  totalAnswered: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);