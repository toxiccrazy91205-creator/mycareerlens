const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: String,
    required: true
  },
  classGrade: {
    type: String,
    required: true
  },
  group: {
    type: String,
    required: true,
    enum: ['A', 'B', 'C', 'D', 'E']
  },
  quickMode: {
    type: Boolean,
    default: false
  },
  answers: {
    type: Map,
    of: Number,
    default: {}
  },
  completedAt: {
    type: Date,
    default: null
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['in_progress', 'completed'],
    default: 'in_progress'
  }
}, {
  timestamps: true
});

sessionSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Session', sessionSchema);