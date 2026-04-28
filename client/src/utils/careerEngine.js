const CAREER_DATABASE = [
  { id: "CAR_001", name: "Software Engineer", sector: "Technology",
    hollandCodes: ["I","R","C"], topIntelligences: ["logicalMath","spatial"],
    aptitudeStrengths: ["logical","numerical"], personalityFit: ["openness","conscientiousness"],
    valueAlignment: ["valAchievement","valAutonomy"], creativityWeight: 60, leadershipWeight: 30,
    streamAlignment: { Science: "aligned", Commerce: "adjacent", Arts: "pivot" },
    description: "Design, build, test, and maintain software — web, mobile, backend, AI/ML, or systems.",
    education: "B.Tech/BSc CS or equivalent",
    salaryINR: { entry: 6, mid: 18, senior: 45 }, growthRate: "hot" },
  { id: "CAR_002", name: "Data Scientist", sector: "Technology",
    hollandCodes: ["I","C","R"], topIntelligences: ["logicalMath","intrapersonal"],
    aptitudeStrengths: ["numerical","logical"], personalityFit: ["openness","conscientiousness"],
    valueAlignment: ["valAchievement","valAutonomy"], creativityWeight: 50, leadershipWeight: 30,
    streamAlignment: { Science: "aligned", Commerce: "adjacent", Arts: "pivot" },
    description: "Extract insights from data using statistics, ML, and programming.",
    education: "B.Tech/BSc + MSc/MS preferred",
    salaryINR: { entry: 8, mid: 24, senior: 60 }, growthRate: "hot" },
  { id: "CAR_003", name: "Mechanical Engineer", sector: "Engineering",
    hollandCodes: ["R","I","C"], topIntelligences: ["logicalMath","spatial"],
    aptitudeStrengths: ["mechanical","spatialApt"], personalityFit: ["conscientiousness","emotionalStability"],
    valueAlignment: ["valAchievement","valSecurity"], creativityWeight: 45, leadershipWeight: 35,
    streamAlignment: { Science: "aligned", Commerce: "pivot", Arts: "pivot" },
    description: "Design, analyze, and maintain mechanical systems.",
    education: "B.Tech Mechanical",
    salaryINR: { entry: 4, mid: 12, senior: 30 }, growthRate: "stable" },
  { id: "CAR_004", name: "Civil Engineer", sector: "Engineering",
    hollandCodes: ["R","C","I"], topIntelligences: ["spatial","logicalMath"],
    aptitudeStrengths: ["spatialApt","numerical"], personalityFit: ["conscientiousness","agreeableness"],
    valueAlignment: ["valSecurity","valSocialImpact"], creativityWeight: 40, leadershipWeight: 50,
    streamAlignment: { Science: "aligned", Commerce: "pivot", Arts: "pivot" },
    description: "Design and oversee construction of buildings, bridges, roads.",
    education: "B.Tech Civil",
    salaryINR: { entry: 4, mid: 11, senior: 28 }, growthRate: "stable" },
  { id: "CAR_005", name: "Doctor (MBBS)", sector: "Healthcare",
    hollandCodes: ["I","S","R"], topIntelligences: ["logicalMath","interpersonal"],
    aptitudeStrengths: ["logical","verbal"], personalityFit: ["conscientiousness","agreeableness"],
    valueAlignment: ["valSocialImpact","valAchievement"], creativityWeight: 35, leadershipWeight: 55, minEQScore: 55,
    streamAlignment: { Science: "aligned", Commerce: "pivot", Arts: "pivot" },
    description: "Diagnose, treat, and manage patient health.",
    education: "MBBS (5.5 yrs) + MD/MS",
    salaryINR: { entry: 10, mid: 25, senior: 60 }, growthRate: "growing" },
  { id: "CAR_006", name: "Registered Nurse", sector: "Healthcare",
    hollandCodes: ["S","C","R"], topIntelligences: ["interpersonal","bodilyKinesthetic"],
    aptitudeStrengths: ["clerical","verbal"], personalityFit: ["agreeableness","conscientiousness"],
    valueAlignment: ["valSocialImpact","valSecurity"], creativityWeight: 30, leadershipWeight: 40, minEQScore: 60,
    streamAlignment: { Science: "aligned", Commerce: "pivot", Arts: "pivot" },
    description: "Provide direct patient care and support recovery.",
    education: "BSc Nursing (4 yrs)",
    salaryINR: { entry: 3, mid: 7, senior: 15 }, growthRate: "growing" },
  { id: "CAR_007", name: "Physiotherapist", sector: "Healthcare",
    hollandCodes: ["S","R","I"], topIntelligences: ["bodilyKinesthetic","interpersonal"],
    aptitudeStrengths: ["spatialApt","mechanical"], personalityFit: ["agreeableness","conscientiousness"],
    valueAlignment: ["valSocialImpact","valAchievement"], creativityWeight: 45, leadershipWeight: 35,
    streamAlignment: { Science: "aligned", Commerce: "pivot", Arts: "pivot" },
    description: "Restore movement through exercise and rehabilitation.",
    education: "BPT (4.5 yrs)",
    salaryINR: { entry: 3, mid: 8, senior: 18 }, growthRate: "growing" },
  { id: "CAR_008", name: "Investment Banker", sector: "Finance",
    hollandCodes: ["E","C","I"], topIntelligences: ["logicalMath","interpersonal"],
    aptitudeStrengths: ["numerical","verbal"], personalityFit: ["conscientiousness","extraversion"],
    valueAlignment: ["valFinancial","valAchievement"], creativityWeight: 40, leadershipWeight: 80,
    streamAlignment: { Science: "adjacent", Commerce: "aligned", Arts: "pivot" },
    description: "Advise on capital raising, M&A, and financial transactions.",
    education: "Top B-school MBA or CA/CFA",
    salaryINR: { entry: 15, mid: 50, senior: 150 }, growthRate: "stable" },
  { id: "CAR_009", name: "Financial Analyst", sector: "Finance",
    hollandCodes: ["C","I","E"], topIntelligences: ["logicalMath","intrapersonal"],
    aptitudeStrengths: ["numerical","clerical"], personalityFit: ["conscientiousness"],
    valueAlignment: ["valFinancial","valSecurity"], creativityWeight: 25, leadershipWeight: 40,
    streamAlignment: { Science: "adjacent", Commerce: "aligned", Arts: "pivot" },
    description: "Analyze financials and support investment decisions.",
    education: "B.Com/BBA + CFA",
    salaryINR: { entry: 5, mid: 14, senior: 35 }, growthRate: "stable" },
  { id: "CAR_010", name: "Graphic Designer", sector: "Creative Arts",
    hollandCodes: ["A","R","E"], topIntelligences: ["spatial","linguistic"],
    aptitudeStrengths: ["spatialApt","verbal"], personalityFit: ["openness","conscientiousness"],
    valueAlignment: ["valCreativity","valAutonomy"], creativityWeight: 90, leadershipWeight: 25,
    streamAlignment: { Science: "pivot", Commerce: "adjacent", Arts: "aligned" },
    description: "Create visual content that communicates ideas effectively.",
    education: "Degree in Design",
    salaryINR: { entry: 3, mid: 9, senior: 22 }, growthRate: "growing" },
  { id: "CAR_011", name: "Filmmaker", sector: "Creative Arts",
    hollandCodes: ["A","E","S"], topIntelligences: ["spatial","linguistic"],
    aptitudeStrengths: ["verbal","spatialApt"], personalityFit: ["openness","extraversion"],
    valueAlignment: ["valCreativity","valSocialImpact"], creativityWeight: 95, leadershipWeight: 70,
    streamAlignment: { Science: "pivot", Commerce: "adjacent", Arts: "aligned" },
    description: "Direct and produce films or video content.",
    education: "Film school or self-study",
    salaryINR: { entry: 3, mid: 15, senior: 80 }, growthRate: "growing" },
  { id: "CAR_012", name: "Teacher", sector: "Education",
    hollandCodes: ["S","A","I"], topIntelligences: ["linguistic","interpersonal"],
    aptitudeStrengths: ["verbal"], personalityFit: ["agreeableness","conscientiousness"],
    valueAlignment: ["valSocialImpact","valAchievement"], creativityWeight: 50, leadershipWeight: 40,
    streamAlignment: { Science: "aligned", Commerce: "aligned", Arts: "aligned" },
    description: "Educate and inspire students in various subjects.",
    education: "B.Ed / B.A. B.Ed",
    salaryINR: { entry: 3, mid: 8, senior: 20 }, growthRate: "stable" },
  { id: "CAR_013", name: "Lawyer", sector: "Law",
    hollandCodes: ["E","S","C"], topIntelligences: ["linguistic","interpersonal"],
    aptitudeStrengths: ["verbal"], personalityFit: ["conscientiousness","extraversion"],
    valueAlignment: ["valAchievement","valSocialImpact"], creativityWeight: 40, leadershipWeight: 60,
    streamAlignment: { Science: "pivot", Commerce: "aligned", Arts: "aligned" },
    description: "Practice law and advocate for clients.",
    education: "LLB (3 yrs) + LLM optional",
    salaryINR: { entry: 5, mid: 15, senior: 40 }, growthRate: "stable" },
  { id: "CAR_014", name: "Chef", sector: "Hospitality",
    hollandCodes: ["R","A","S"], topIntelligences: ["bodilyKinesthetic","spatial"],
    aptitudeStrengths: ["mechanical"], personalityFit: ["conscientiousness","openness"],
    valueAlignment: ["valCreativity","valSocialImpact"], creativityWeight: 85, leadershipWeight: 50,
    streamAlignment: { Science: "pivot", Commerce: "adjacent", Arts: "aligned" },
    description: "Create dishes and manage kitchen operations.",
    education: "Culinary school or apprenticeship",
    salaryINR: { entry: 3, mid: 8, senior: 25 }, growthRate: "stable" },
  { id: "CAR_015", name: "Pilot", sector: "Aviation",
    hollandCodes: ["R","I","E"], topIntelligences: ["spatial","logicalMath"],
    aptitudeStrengths: ["spatialApt","mechanical"], personalityFit: ["conscientiousness","emotionalStability"],
    valueAlignment: ["valAchievement","valAutonomy"], creativityWeight: 30, leadershipWeight: 60,
    streamAlignment: { Science: "aligned", Commerce: "pivot", Arts: "pivot" },
    description: "Fly aircraft and ensure safe travel.",
    education: "Commercial Pilot License",
    salaryINR: { entry: 8, mid: 20, senior: 50 }, growthRate: "stable" }
];

const HOLLAND_CODES = ['R', 'I', 'A', 'S', 'E', 'C'];
const INTELLIGENCES = ['logicalMath', 'linguistic', 'spatial', 'musical', 'bodilyKinesthetic', 'interpersonal', 'intrapersonal', 'naturalist'];
const LEARNING_STYLES = ['visual', 'auditory', 'readWrite', 'kinesthetic'];

function calculateRIASEC(answers) {
  const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  let count = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  
  Object.entries(answers).forEach(([qId, value]) => {
    if (value === 'unknown' || typeof value !== 'number') return;
    
    if (qId.startsWith('r')) {
      scores.R += value;
      count.R++;
    } else if (qId.startsWith('i') && !qId.startsWith('int')) {
      scores.I += value;
      count.I++;
    } else if (qId.startsWith('a')) {
      scores.A += value;
      count.A++;
    } else if (qId.startsWith('s') && !qId.startsWith('spa')) {
      scores.S += value;
      count.S++;
    } else if (qId.startsWith('e')) {
      scores.E += value;
      count.E++;
    } else if (qId.startsWith('c')) {
      scores.C += value;
      count.C++;
    }
  });
  
  const max = Math.max(...Object.values(count));
  if (max === 0) return { scores, topInterests: [] };
  
  const percentages = {};
  HOLLAND_CODES.forEach(code => {
    percentages[code] = count[code] > 0 ? Math.round((scores[code] / count[code]) / 5 * 100) : 0;
  });
  
  const topInterests = HOLLAND_CODES
    .sort((a, b) => percentages[b] - percentages[a])
    .slice(0, 3);
  
  return { scores: percentages, topInterests };
}

function calculatePersonality(answers) {
  const traits = {
    openness: 0, conscientiousness: 0, extraversion: 0, 
    agreeableness: 0, emotionalStability: 0
  };
  let count = 0;
  
  Object.entries(answers).forEach(([qId, value]) => {
    if (value === 'unknown' || typeof value !== 'number') return;
    if (qId.startsWith('p')) {
      const qNum = parseInt(qId.slice(1));
      if (qNum <= 2) traits.openness += value;
      else if (qNum <= 4) traits.conscientiousness += value;
      else if (qNum <= 6) traits.extraversion += value;
      else if (qNum <= 8) traits.agreeableness += value;
      else traits.emotionalStability += value;
      count++;
    }
  });
  
  if (count === 0) return traits;
  
  const normalize = (val) => Math.round((val / count) / 5 * 100);
  return {
    openness: normalize(traits.openness),
    conscientiousness: normalize(traits.conscientiousness),
    extraversion: normalize(traits.extraversion),
    agreeableness: normalize(traits.agreeableness),
    emotionalStability: normalize(traits.emotionalStability)
  };
}

function calculateIntelligence(answers) {
  const scores = {};
  INTELLIGENCES.forEach(i => scores[i] = 0);
  let count = 0;
  
  Object.entries(answers).forEach(([qId, value]) => {
    if (value === 'unknown' || typeof value !== 'number') return;
    if (qId.startsWith('i')) {
      const qNum = parseInt(qId.slice(1));
      if (qNum <= 2) scores.spatial += value;
      else if (qNum <= 4) scores.linguistic += value;
      else if (qNum <= 6) scores.logicalMath += value;
      else scores.bodilyKinesthetic += value;
      count++;
    }
  });
  
  if (count === 0) return { topIntelligences: [] };
  
  const percentages = {};
  Object.entries(scores).forEach(([key, val]) => {
    percentages[key] = Math.round((val / count) / 5 * 100);
  });
  
  const topIntelligences = INTELLIGENCES
    .sort((a, b) => percentages[b] - percentages[a])
    .slice(0, 3);
  
  return { percentages, topIntelligences };
}

function calculateLearningStyle(answers) {
  const scores = { visual: 0, auditory: 0, readWrite: 0, kinesthetic: 0 };
  let count = 0;
  
  Object.entries(answers).forEach(([qId, value]) => {
    if (value === 'unknown' || typeof value !== 'number') return;
    if (qId.startsWith('l')) {
      const qNum = parseInt(qId.slice(1));
      if (qNum === 1) scores.visual += value;
      else if (qNum === 2) scores.auditory += value;
      else if (qNum === 3) scores.readWrite += value;
      else scores.kinesthetic += value;
      count++;
    }
  });
  
  if (count === 0) return { learningStyle: null };
  
  const max = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  return { learningStyle: max[0] };
}

function calculateEQ(answers) {
  let total = 0, count = 0;
  
  Object.entries(answers).forEach(([qId, value]) => {
    if (value === 'unknown' || typeof value !== 'number') return;
    if (qId.startsWith('e')) {
      total += value;
      count++;
    }
  });
  
  return count > 0 ? Math.round((total / count) / 5 * 100) : 0;
}

const ARCHETYPES = [
  { id: "visionaryExplorer", name: "The Visionary Explorer", criteria: { openness: "high", extraversion: "high" }, description: "Loves new ideas and sharing them with the world" },
  { id: "reflectiveInnovator", name: "The Reflective Innovator", criteria: { openness: "high", intrapersonal: "high" }, description: "Deep thinker who generates original insights quietly" },
  { id: "steadyAchiever", name: "The Steady Achiever", criteria: { conscientiousness: "high", emotionalStability: "high" }, description: "Disciplined, calm, and reliably excellent" },
  { id: "drivenLeader", name: "The Driven Leader", criteria: { conscientiousness: "high", extraversion: "high" }, description: "Organized go-getter who rallies others toward goals" },
  { id: "compassionateConnector", name: "The Compassionate Connector", criteria: { agreeableness: "high", interpersonal: "high" }, description: "Natural peacemaker who builds deep relationships" },
  { id: "dependableAlly", name: "The Dependable Ally", criteria: { agreeableness: "high", conscientiousness: "high" }, description: "Reliable, kind, and always follows through" },
  { id: "versatileAdapter", name: "The Versatile Adapter", criteria: null, description: "Flexible and well-rounded, comfortable in many situations" }
];

function findArchetype(personality) {
  if (!personality) return ARCHETYPES[ARCHETYPES.length - 1];
  
  let bestMatch = ARCHETYPES[ARCHETYPES.length - 1];
  let bestScore = 0;
  
  ARCHETYPES.forEach(archetype => {
    if (!archetype.criteria) return;
    
    let score = 0;
    Object.entries(archetype.criteria).forEach(([trait, level]) => {
      const value = personality[trait] || 0;
      if (level === "high" && value >= 60) score += 1;
    });
    
    if (score > bestScore) {
      bestScore = score;
      bestMatch = archetype;
    }
  });
  
  return bestMatch;
}

export function calculateProfile(answers) {
  const riasec = calculateRIASEC(answers);
  const personality = calculatePersonality(answers);
  const intelligence = calculateIntelligence(answers);
  const learning = calculateLearningStyle(answers);
  const eq = calculateEQ(answers);
  const archetype = findArchetype(personality);
  
  return {
    ...riasec,
    ...personality,
    ...intelligence,
    ...learning,
    eq,
    archetype
  };
}

export function calculateCareers(profile, group) {
  const scored = CAREER_DATABASE.map(career => {
    let score = 50;
    
    const topInterests = profile.topInterests || [];
    const matchCount = career.hollandCodes.filter(code => topInterests.includes(code)).length;
    score += matchCount * 10;
    
    const topIntelligences = profile.topIntelligences || [];
    const intMatch = career.topIntelligences.filter(i => topIntelligences.includes(i)).length;
    score += intMatch * 8;
    
    if (career.personalityFit) {
      const pfMatch = career.personalityFit.filter(p => profile[p] && profile[p] > 50).length;
      score += pfMatch * 5;
    }
    
    if (profile.eq && career.minEQScore && profile.eq < career.minEQScore) {
      score *= 0.7;
    }
    
    score = Math.min(99, score);
    
    let tier = 'explore';
    if (score >= 80) tier = 'strong';
    else if (score >= 65) tier = 'good';
    
    let why = [];
    if (matchCount > 0) why.push(`Matches your ${matchCount} interest areas`);
    if (intMatch > 0) why.push(`Fits your ${intMatch} strengths`);
    
    return { ...career, score, tier, why };
  });
  
  return scored.sort((a, b) => b.score - a.score);
}

export { CAREER_DATABASE };