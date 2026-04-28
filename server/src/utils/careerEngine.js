const CAREER_DATABASE = [
  { id: "CAR_001", name: "Software Engineer", sector: "Technology",
    hollandCodes: ["I","R","C"], topIntelligences: ["logicalMath","spatial"],
    personalityFit: ["openness","conscientiousness"],
    streamAlignment: { Science: "aligned", Commerce: "adjacent", Arts: "pivot" },
    description: "Design, build, test, and maintain software.",
    education: "B.Tech/BSc CS",
    salaryINR: { entry: 6, mid: 18, senior: 45 },
    growthRate: "hot" },
  { id: "CAR_002", name: "Data Scientist", sector: "Technology",
    hollandCodes: ["I","C","R"], topIntelligences: ["logicalMath","intrapersonal"],
    personalityFit: ["openness","conscientiousness"],
    streamAlignment: { Science: "aligned", Commerce: "adjacent", Arts: "pivot" },
    description: "Extract insights from data using statistics and ML.",
    education: "B.Tech + MSc/MS",
    salaryINR: { entry: 8, mid: 24, senior: 60 },
    growthRate: "hot" },
  { id: "CAR_003", name: "Mechanical Engineer", sector: "Engineering",
    hollandCodes: ["R","I","C"], topIntelligences: ["logicalMath","spatial"],
    personalityFit: ["conscientiousness","emotionalStability"],
    streamAlignment: { Science: "aligned", Commerce: "pivot", Arts: "pivot" },
    description: "Design and analyze mechanical systems.",
    education: "B.Tech Mechanical",
    salaryINR: { entry: 4, mid: 12, senior: 30 },
    growthRate: "stable" },
  { id: "CAR_004", name: "Civil Engineer", sector: "Engineering",
    hollandCodes: ["R","C","I"], topIntelligences: ["spatial","logicalMath"],
    personalityFit: ["conscientiousness","agreeableness"],
    streamAlignment: { Science: "aligned", Commerce: "pivot", Arts: "pivot" },
    description: "Design and oversee construction.",
    education: "B.Tech Civil",
    salaryINR: { entry: 4, mid: 11, senior: 28 },
    growthRate: "stable" },
  { id: "CAR_005", name: "Doctor (MBBS)", sector: "Healthcare",
    hollandCodes: ["I","S","R"], topIntelligences: ["logicalMath","interpersonal"],
    personalityFit: ["conscientiousness","agreeableness"],
    streamAlignment: { Science: "aligned", Commerce: "pivot", Arts: "pivot" },
    description: "Diagnose and treat patients.",
    education: "MBBS (5.5 yrs) + MD/MS",
    salaryINR: { entry: 10, mid: 25, senior: 60 },
    growthRate: "growing" },
  { id: "CAR_006", name: "Registered Nurse", sector: "Healthcare",
    hollandCodes: ["S","C","R"], topIntelligences: ["interpersonal","bodilyKinesthetic"],
    personalityFit: ["agreeableness","conscientiousness"],
    streamAlignment: { Science: "aligned", Commerce: "pivot", Arts: "pivot" },
    description: "Provide direct patient care.",
    education: "BSc Nursing",
    salaryINR: { entry: 3, mid: 7, senior: 15 },
    growthRate: "growing" },
  { id: "CAR_007", name: "Physiotherapist", sector: "Healthcare",
    hollandCodes: ["S","R","I"], topIntelligences: ["bodilyKinesthetic","interpersonal"],
    personalityFit: ["agreeableness","conscientiousness"],
    streamAlignment: { Science: "aligned", Commerce: "pivot", Arts: "pivot" },
    description: "Restore movement through rehabilitation.",
    education: "BPT",
    salaryINR: { entry: 3, mid: 8, senior: 18 },
    growthRate: "growing" },
  { id: "CAR_008", name: "Investment Banker", sector: "Finance",
    hollandCodes: ["E","C","I"], topIntelligences: ["logicalMath","interpersonal"],
    personalityFit: ["conscientiousness","extraversion"],
    streamAlignment: { Science: "adjacent", Commerce: "aligned", Arts: "pivot" },
    description: "Advise on financial transactions.",
    education: "MBA or CA/CFA",
    salaryINR: { entry: 15, mid: 50, senior: 150 },
    growthRate: "stable" },
  { id: "CAR_009", name: "Financial Analyst", sector: "Finance",
    hollandCodes: ["C","I","E"], topIntelligences: ["logicalMath","intrapersonal"],
    personalityFit: ["conscientiousness"],
    streamAlignment: { Science: "adjacent", Commerce: "aligned", Arts: "pivot" },
    description: "Analyze financials for investment decisions.",
    education: "B.Com + CFA",
    salaryINR: { entry: 5, mid: 14, senior: 35 },
    growthRate: "stable" },
  { id: "CAR_010", name: "Graphic Designer", sector: "Creative Arts",
    hollandCodes: ["A","R","E"], topIntelligences: ["spatial","linguistic"],
    personalityFit: ["openness","conscientiousness"],
    streamAlignment: { Science: "pivot", Commerce: "adjacent", Arts: "aligned" },
    description: "Create visual content.",
    education: "Degree in Design",
    salaryINR: { entry: 3, mid: 9, senior: 22 },
    growthRate: "growing" },
  { id: "CAR_011", name: "Filmmaker", sector: "Creative Arts",
    hollandCodes: ["A","E","S"], topIntelligences: ["spatial","linguistic"],
    personalityFit: ["openness","extraversion"],
    streamAlignment: { Science: "pivot", Commerce: "adjacent", Arts: "aligned" },
    description: "Direct and produce films.",
    education: "Film school",
    salaryINR: { entry: 3, mid: 15, senior: 80 },
    growthRate: "growing" },
  { id: "CAR_012", name: "Teacher", sector: "Education",
    hollandCodes: ["S","A","I"], topIntelligences: ["linguistic","interpersonal"],
    personalityFit: ["agreeableness","conscientiousness"],
    streamAlignment: { Science: "aligned", Commerce: "aligned", Arts: "aligned" },
    description: "Educate and inspire students.",
    education: "B.Ed",
    salaryINR: { entry: 3, mid: 8, senior: 20 },
    growthRate: "stable" },
  { id: "CAR_013", name: "Lawyer", sector: "Law",
    hollandCodes: ["E","S","C"], topIntelligences: ["linguistic","interpersonal"],
    personalityFit: ["conscientiousness","extraversion"],
    streamAlignment: { Science: "pivot", Commerce: "aligned", Arts: "aligned" },
    description: "Practice law and advocate.",
    education: "LLB",
    salaryINR: { entry: 5, mid: 15, senior: 40 },
    growthRate: "stable" },
  { id: "CAR_014", name: "Chef", sector: "Hospitality",
    hollandCodes: ["R","A","S"], topIntelligences: ["bodilyKinesthetic","spatial"],
    personalityFit: ["conscientiousness","openness"],
    streamAlignment: { Science: "pivot", Commerce: "adjacent", Arts: "aligned" },
    description: "Create dishes in kitchens.",
    education: "Culinary school",
    salaryINR: { entry: 3, mid: 8, senior: 25 },
    growthRate: "stable" },
  { id: "CAR_015", name: "Pilot", sector: "Aviation",
    hollandCodes: ["R","I","E"], topIntelligences: ["spatial","logicalMath"],
    personalityFit: ["conscientiousness","emotionalStability"],
    streamAlignment: { Science: "aligned", Commerce: "pivot", Arts: "pivot" },
    description: "Fly aircraft.",
    education: "Pilot License",
    salaryINR: { entry: 8, mid: 20, senior: 50 },
    growthRate: "stable" }
];

function calculateCareers(profile) {
  const { hollandCodes, topInterests, personality, intelligences, topIntelligences, eq } = profile;
  
  const scored = CAREER_DATABASE.map(career => {
    let score = 50;
    
    // Holland codes match
    const interestMatch = career.hollandCodes.filter(code => 
      topInterests && topInterests.includes(code)
    ).length;
    score += interestMatch * 12;
    
    // Intelligences match
    if (topIntelligences) {
      const intMatch = career.topIntelligences.filter(i => topIntelligences.includes(i)).length;
      score += intMatch * 10;
    }
    
    // Personality fit
    if (career.personalityFit && personality) {
      const pfMatch = career.personalityFit.filter(p => 
        personality[p] && personality[p] > 50
      ).length;
      score += pfMatch * 6;
    }
    
    // EQ penalty
    if (career.minEQScore && eq && eq < career.minEQScore) {
      score *= 0.7;
    }
    
    score = Math.min(99, Math.max(0, score));
    
    let tier = 'explore';
    if (score >= 80) tier = 'strong';
    else if (score >= 65) tier = 'good';
    
    let why = [];
    if (interestMatch > 0) why.push(`Matches your ${interestMatch} interest areas`);
    if (topIntelligences && topIntelligences.some(i => career.topIntelligences.includes(i))) {
      why.push('Fits your strengths');
    }
    
    return {
      careerId: career.id,
      name: career.name,
      score,
      tier,
      why,
      sector: career.sector,
      description: career.description,
      salaryINR: career.salaryINR,
      education: career.education,
      growthRate: career.growthRate
    };
  });
  
  return scored.sort((a, b) => b.score - a.score);
}

module.exports = { CAREER_DATABASE, calculateCareers };