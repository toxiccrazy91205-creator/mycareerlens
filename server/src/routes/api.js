const express = require('express');
const router = express.Router();
const Session = require('../models/Session');
const Profile = require('../models/Profile');
const Result = require('../models/Result');
const Stats = require('../models/Stats');
const { calculateCareers } = require('../utils/careerEngine');

function generateSessionId() {
  return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function calculateProfile(answers) {
  const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  let counts = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  
  for (const [qId, value] of answers) {
    if (value === 'unknown' || typeof value !== 'number') continue;
    
    if (qId.startsWith('r')) { scores.R += value; counts.R++; }
    else if (qId.startsWith('i') && !qId.startsWith('int')) { scores.I += value; counts.I++; }
    else if (qId.startsWith('a')) { scores.A += value; counts.A++; }
    else if (qId.startsWith('s') && !qId.startsWith('spa')) { scores.S += value; counts.S++; }
    else if (qId.startsWith('e')) { scores.E += value; counts.E++; }
    else if (qId.startsWith('c')) { scores.C += value; counts.C++; }
  }
  
  const percentages = {};
  const codes = ['R', 'I', 'A', 'S', 'E', 'C'];
  codes.forEach(code => {
    percentages[code] = counts[code] > 0 ? Math.round((scores[code] / counts[code]) / 5 * 100) : 0;
  });
  
  const topInterests = codes.sort((a, b) => percentages[b] - percentages[a]).slice(0, 3);
  
  // Personality (Big Five)
  let pf = { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 0, emotionalStability: 0 };
  let pfCount = 0;
  for (const [qId, value] of answers) {
    if (qId.startsWith('p') && typeof value === 'number') {
      const qNum = parseInt(qId.slice(1));
      if (qNum <= 2) pf.openness += value;
      else if (qNum <= 4) pf.conscientiousness += value;
      else if (qNum <= 6) pf.extraversion += value;
      else if (qNum <= 8) pf.agreeableness += value;
      else pf.emotionalStability += value;
      pfCount++;
    }
  }
  if (pfCount > 0) {
    Object.keys(pf).forEach(key => {
      pf[key] = Math.round((pf[key] / pfCount) / 5 * 100);
    });
  }
  
  // Intelligences
  const intScores = { spatial: 0, linguistic: 0, logicalMath: 0, bodilyKinesthetic: 0 };
  let intCount = 0;
  for (const [qId, value] of answers) {
    if (qId.startsWith('i') && typeof value === 'number') {
      const qNum = parseInt(qId.slice(1));
      if (qNum <= 2) intScores.spatial += value;
      else if (qNum <= 4) intScores.linguistic += value;
      else if (qNum <= 6) intScores.logicalMath += value;
      else intScores.bodilyKinesthetic += value;
      intCount++;
    }
  }
  const intelligences = {};
  const intKeys = ['spatial', 'linguistic', 'logicalMath', 'bodilyKinesthetic', 'musical', 'interpersonal', 'intrapersonal', 'naturalist'];
  intKeys.forEach(key => {
    intelligences[key] = intCount > 0 ? Math.round((intScores[key] || 0) / intCount / 5 * 100) : 0;
  });
  const topIntelligences = intKeys.sort((a, b) => intelligences[b] - intelligences[a]).slice(0, 3);
  
  // Learning style
  const lsScores = { visual: 0, auditory: 0, readWrite: 0, kinesthetic: 0 };
  let lsCount = 0;
  for (const [qId, value] of answers) {
    if (qId.startsWith('l') && typeof value === 'number') {
      const qNum = parseInt(qId.slice(1));
      if (qNum === 1) lsScores.visual += value;
      else if (qNum === 2) lsScores.auditory += value;
      else if (qNum === 3) lsScores.readWrite += value;
      else lsScores.kinesthetic += value;
      lsCount++;
    }
  }
  let learningStyle = null;
  if (lsCount > 0) {
    const max = Object.entries(lsScores).sort((a, b) => b[1] - a[1])[0];
    if (max[1] > 0) learningStyle = max[0];
  }
  
  // EQ
  let eq = 0, eqCount = 0;
  for (const [qId, value] of answers) {
    if (qId.startsWith('e') && typeof value === 'number') {
      eq += value;
      eqCount++;
    }
  }
  if (eqCount > 0) eq = Math.round((eq / eqCount) / 5 * 100);
  
  // Unknown count
  let unsureCount = 0;
  for (const [qId, value] of answers) {
    if (value === 'unknown') unsureCount++;
  }
  
  // Archetype
  let archetype = { id: 'versatileAdapter', name: 'The Versatile Adapter', description: 'Flexible and well-rounded, comfortable in many situations' };
  if (pf.openness >= 60 && pf.extraversion >= 60) {
    archetype = { id: 'visionaryExplorer', name: 'The Visionary Explorer', description: 'Loves new ideas and sharing them with the world' };
  } else if (pf.conscientiousness >= 60 && pf.extraversion >= 60) {
    archetype = { id: 'drivenLeader', name: 'The Driven Leader', description: 'Organized go-getter who rallies others toward goals' };
  } else if (pf.conscientiousness >= 60) {
    archetype = { id: 'steadyAchiever', name: 'The Steady Achiever', description: 'Disciplined, calm, and reliably excellent' };
  } else if (pf.agreeableness >= 60) {
    archetype = { id: 'compassionateConnector', name: 'The Compassionate Connector', description: 'Natural peacemaker who builds deep relationships' };
  }
  
  return { hollandCodes: percentages, topInterests, personality: pf, intelligences, topIntelligences, learningStyle, eq, unsureCount, totalAnswered: answers.size, archetype };
}

// POST /api/sessions - Create new session
router.post('/sessions', async (req, res) => {
  try {
    const { name, age, classGrade, group, quickMode } = req.body;
    
    const session = new Session({
      sessionId: generateSessionId(),
      name,
      age,
      classGrade,
      group,
      quickMode: quickMode || false,
      status: 'in_progress'
    });
    
    await session.save();
    
    res.status(201).json({ success: true, session });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/sessions/:sessionId - Get session
router.get('/sessions/:sessionId', async (req, res) => {
  try {
    const session = await Session.findOne({ sessionId: req.params.sessionId });
    
    if (!session) {
      return res.status(404).json({ success: false, error: 'Session not found' });
    }
    
    res.json({ success: true, session });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/sessions/:sessionId - Update session with answers
router.put('/sessions/:sessionId', async (req, res) => {
  try {
    const { answers, completed } = req.body;
    
    const session = await Session.findOne({ sessionId: req.params.sessionId });
    
    if (!session) {
      return res.status(404).json({ success: false, error: 'Session not found' });
    }
    
    // Update answers
    if (answers) {
      const answerMap = new Map();
      for (const [key, value] of Object.entries(answers)) {
        answerMap.set(key, value);
      }
      session.answers = answerMap;
    }
    
    if (completed) {
      session.completedAt = new Date();
      session.status = 'completed';
      
      // Calculate and save profile
      const profileData = calculateProfile(session.answers);
      const profile = new Profile({
        sessionId: session.sessionId,
        name: session.name,
        group: session.group,
        ...profileData
      });
      await profile.save();
      
      // Calculate and save careers
      const careerResults = calculateCareers(profileData);
      const result = new Result({
        sessionId: session.sessionId,
        profileId: profile._id,
        careers: careerResults,
        completedAt: new Date()
      });
      await result.save();
      
      // Update stats
      let stats = await Stats.findOne();
      if (!stats) {
        stats = new Stats({ visits: 0, completions: 0 });
      }
      stats.completions++;
      stats.lastUpdated = new Date();
      await stats.save();
    }
    
    await session.save();
    
    res.json({ success: true, session });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/results/:sessionId - Get results
router.get('/results/:sessionId', async (req, res) => {
  try {
    const profile = await Profile.findOne({ sessionId: req.params.sessionId });
    const result = await Result.findOne({ sessionId: req.params.sessionId });
    
    if (!profile) {
      return res.status(404).json({ success: false, error: 'Results not found' });
    }
    
    res.json({ success: true, profile, result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/stats - Get global stats
router.get('/stats', async (req, res) => {
  try {
    let stats = await Stats.findOne();
    
    if (!stats) {
      stats = new Stats({ visits: 1, completions: 0 });
      await stats.save();
    } else {
      stats.visits++;
      await stats.save();
    }
    
    res.json({ success: true, stats: { visits: stats.visits, completions: stats.completions } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;