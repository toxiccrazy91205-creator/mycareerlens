import React, { useState, useEffect, useCallback } from 'react';

const MODULES = [
  {
    id: 'riasec',
    label: 'Career Interests',
    questions: [
      { id: 'r1', text: 'I enjoy working with my hands or tools', options: ['Disagree a lot', 'Disagree a little', 'Neutral', 'Agree a little', 'Agree a lot'] },
      { id: 'r2', text: 'I like fixing or building things', options: ['Disagree a lot', 'Disagree a little', 'Neutral', 'Agree a little', 'Agree a lot'] },
      { id: 'i1', text: 'I enjoy solving puzzles or problems', options: ['Disagree a lot', 'Disagree a little', 'Neutral', 'Agree a little', 'Agree a lot'] },
      { id: 'i2', text: 'I like science experiments', options: ['Disagree a lot', 'Disagree a little', 'Neutral', 'Agree a little', 'Agree a lot'] },
      { id: 'a1', text: 'I enjoy drawing, painting, or creating art', options: ['Disagree a lot', 'Disagree a little', 'Neutral', 'Agree a little', 'Agree a lot'] },
      { id: 'a2', text: 'I like expressing myself creatively', options: ['Disagree a lot', 'Disagree a little', 'Neutral', 'Agree a little', 'Agree a lot'] },
      { id: 's1', text: 'I enjoy helping others', options: ['Disagree a lot', 'Disagree a little', 'Neutral', 'Agree a little', 'Agree a lot'] },
      { id: 's2', text: 'I like working in teams', options: ['Disagree a lot', 'Disagree a little', 'Neutral', 'Agree a little', 'Agree a lot'] },
      { id: 'e1', text: 'I enjoy leading or organizing groups', options: ['Disagree a lot', 'Disagree a little', 'Neutral', 'Agree a little', 'Agree a lot'] },
      { id: 'e2', text: 'I like persuading others', options: ['Disagree a lot', 'Disagree a little', 'Neutral', 'Agree a little', 'Agree a lot'] },
      { id: 'c1', text: 'I enjoy organizing details', options: ['Disagree a lot', 'Disagree a little', 'Neutral', 'Agree a little', 'Agree a lot'] },
      { id: 'c2', text: 'I like working with numbers or data', options: ['Disagree a lot', 'Disagree a little', 'Neutral', 'Agree a little', 'Agree a lot'] }
    ]
  },
  {
    id: 'personality',
    label: 'Personality',
    questions: [
      { id: 'p1', text: 'I am curious about new ideas', options: ['Disagree a lot', 'Disagree a little', 'Neutral', 'Agree a little', 'Agree a lot'] },
      { id: 'p2', text: 'I like trying new things', options: ['Disagree a lot', 'Disagree a little', 'Neutral', 'Agree a little', 'Agree a lot'] },
      { id: 'p3', text: 'I am organized and careful', options: ['Disagree a lot', 'Disagree a little', 'Neutral', 'Agree a little', 'Agree a lot'] },
      { id: 'p4', text: 'I finish what I start', options: ['Disagree a lot', 'Disagree a little', 'Neutral', 'Agree a little', 'Agree a lot'] },
      { id: 'p5', text: 'I enjoy being around people', options: ['Disagree a lot', 'Disagree a little', 'Neutral', 'Agree a little', 'Agree a lot'] },
      { id: 'p6', text: 'I like talking to new people', options: ['Disagree a lot', 'Disagree a little', 'Neutral', 'Agree a little', 'Agree a lot'] },
      { id: 'p7', text: 'I trust and care about others', options: ['Disagree a lot', 'Disagree a little', 'Neutral', 'Agree a little', 'Agree a lot'] },
      { id: 'p8', text: 'I want to help people', options: ['Disagree a lot', 'Disagree a little', 'Neutral', 'Agree a little', 'Agree a lot'] },
      { id: 'p9', text: 'I stay calm under pressure', options: ['Disagree a lot', 'Disagree a little', 'Neutral', 'Agree a little', 'Agree a lot'] },
      { id: 'p10', text: 'I handle stress well', options: ['Disagree a lot', 'Disagree a little', 'Neutral', 'Agree a little', 'Agree a lot'] }
    ]
  },
  {
    id: 'intelligence',
    label: 'Multiple Intelligences',
    questions: [
      { id: 'i1', text: 'I learn best by seeing pictures or diagrams', options: ['Disagree a lot', 'Disagree a little', 'Neutral', 'Agree a little', 'Agree a lot'] },
      { id: 'i2', text: 'I enjoy visual arts', options: ['Disagree a lot', 'Disagree a little', 'Neutral', 'Agree a little', 'Agree a lot'] },
      { id: 'i3', text: 'I am good with words and language', options: ['Disagree a lot', 'Disagree a little', 'Neutral', 'Agree a little', 'Agree a lot'] },
      { id: 'i4', text: 'I enjoy reading and writing', options: ['Disagree a lot', 'Disagree a little', 'Neutral', 'Agree a little', 'Agree a lot'] },
      { id: 'i5', text: 'I am good with numbers', options: ['Disagree a lot', 'Disagree a little', 'Neutral', 'Agree a little', 'Agree a lot'] },
      { id: 'i6', text: 'I enjoy math and logic puzzles', options: ['Disagree a lot', 'Disagree a little', 'Neutral', 'Agree a little', 'Agree a lot'] },
      { id: 'i7', text: 'I learn best by doing and practicing', options: ['Disagree a lot', 'Disagree a little', 'Neutral', 'Agree a little', 'Agree a lot'] },
      { id: 'i8', text: 'I enjoy physical activities', options: ['Disagree a lot', 'Disagree a little', 'Neutral', 'Agree a little', 'Agree a lot'] }
    ]
  },
  {
    id: 'learning',
    label: 'Learning Style',
    questions: [
      { id: 'l1', text: 'I learn best when I can see visuals', options: ['Disagree a lot', 'Disagree a little', 'Neutral', 'Agree a little', 'Agree a lot'] },
      { id: 'l2', text: 'I learn best when I listen to explanations', options: ['Disagree a lot', 'Disagree a little', 'Neutral', 'Agree a little', 'Agree a lot'] },
      { id: 'l3', text: 'I learn best by reading and taking notes', options: ['Disagree a lot', 'Disagree a little', 'Neutral', 'Agree a little', 'Agree a lot'] },
      { id: 'l4', text: 'I learn best by doing hands-on activities', options: ['Disagree a lot', 'Disagree a little', 'Neutral', 'Agree a little', 'Agree a lot'] }
    ]
  },
  {
    id: 'eq',
    label: 'Emotional Intelligence',
    questions: [
      { id: 'e1', text: 'I understand how I feel', options: ['Disagree a lot', 'Disagree a little', 'Neutral', 'Agree a little', 'Agree a lot'] },
      { id: 'e2', text: 'I can manage my emotions', options: ['Disagree a lot', 'Disagree a little', 'Neutral', 'Agree a little', 'Agree a lot'] },
      { id: 'e3', text: 'I understand how others feel', options: ['Disagree a lot', 'Disagree a little', 'Neutral', 'Agree a little', 'Agree a lot'] },
      { id: 'e4', text: 'I can work well with others', options: ['Disagree a lot', 'Disagree a little', 'Neutral', 'Agree a little', 'Agree a lot'] }
    ]
  }
];

const UNSURE_LABELS = {
  A: "I'm not sure",
  B: "I'm not sure", 
  C: "I'm not sure",
  D: "Not sure",
  E: "Not sure"
};

const ANSWER_UNKNOWN = "unknown";

export default function QuestionWizard({ session, onSaveProgress, onComplete, onBack }) {
  const { group } = session || {};
  const [currentModule, setCurrentModule] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [showUnsure, setShowUnsure] = useState(false);
  const [autoSaveTimer, setAutoSaveTimer] = useState(null);

  const module = MODULES[currentModule];
  const questions = module?.questions || [];
  const question = questions[currentQuestion];
  const totalQuestions = MODULES.reduce((sum, m) => sum + m.questions.length, 0);
  
  const currentProgress = () => {
    let done = 0;
    for (let i = 0; i < currentModule; i++) {
      done += MODULES[i].questions.length;
    }
    done += currentQuestion;
    return Math.round((done / totalQuestions) * 100);
  };

  useEffect(() => {
    setSelectedOption(answers[question?.id] !== undefined ? answers[question.id] : null);
  }, [question?.id, answers]);

  useEffect(() => {
    if (autoSaveTimer) {
      clearTimeout(autoSaveTimer);
    }
    const timer = setTimeout(() => {
      if (Object.keys(answers).length > 0) {
        onSaveProgress?.(answers);
      }
    }, 3000);
    setAutoSaveTimer(timer);
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [answers, onSaveProgress]);

  const handleOptionSelect = (value) => {
    const newAnswers = { ...answers, [question.id]: value };
    setAnswers(newAnswers);
    setSelectedOption(value);
  };

  const handleUnsure = () => {
    const newAnswers = { ...answers, [question.id]: ANSWER_UNKNOWN };
    setAnswers(newAnswers);
    setSelectedOption(ANSWER_UNKNOWN);
    setShowUnsure(false);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowUnsure(false);
    } else if (currentModule < MODULES.length - 1) {
      setCurrentModule(currentModule + 1);
      setCurrentQuestion(0);
      setShowUnsure(false);
    } else {
      onSaveProgress?.(answers, true);
      onComplete?.(answers);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentModule > 0) {
      setCurrentModule(currentModule - 1);
      setCurrentQuestion(MODULES[currentModule - 1].questions.length - 1);
    } else {
      onBack();
    }
  };

  if (!module) {
    return <div className="qwiz-shell">Loading...</div>;
  }

  const unsureLabel = UNSURE_LABELS[group] || "Not sure";

  return (
    <section className="screen active" id="screen-questions" aria-label="Assessment questions">
      <div className="container">
        <div className="qwiz-shell">
          <div className="qwiz-meta">
            <span className="qwiz-module-label">{module.label}</span>
            <span>Question {currentQuestion + 1} of {questions.length}</span>
          </div>
          
          <div className="qwiz-progress-wrap">
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{width: currentProgress() + '%'}}></div>
            </div>
          </div>

          <div className="qwiz-qtext">
            {question?.text}
          </div>

          <div className="qwiz-options">
            {question?.options.map((opt, i) => (
              <button
                key={i}
                className={`qwiz-option ${selectedOption === i + 1 ? 'selected' : ''}`}
                onClick={() => handleOptionSelect(i + 1)}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="qwiz-unsure-wrap">
            <button 
              className={`qwiz-unsure ${showUnsure ? 'selected' : ''}`}
              onClick={() => setShowUnsure(!showUnsure)}
            >
              {unsureLabel}
            </button>
            {showUnsure && (
              <button className="qwiz-unsure selected" onClick={handleUnsure} style={{marginTop: 'var(--sp-2)'}}>
                Confirm - I really don't know
              </button>
            )}
            <p className="qwiz-unsure-hint">
              That's okay! Not sure = leave blank.
            </p>
          </div>

          <div className="qwiz-nav">
            <button className="btn btn-ghost" onClick={handlePrev}>← Previous</button>
            <button 
              className="btn btn-primary" 
              onClick={handleNext}
              disabled={selectedOption === null}
            >
              {currentQuestion === questions.length - 1 && currentModule === MODULES.length - 1 ? 'See Results →' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}