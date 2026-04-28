import React, { useState } from 'react';

const CLASS_GROUPS = {
  "Class 1": "A", "Class 2": "A", "Class 3": "A", "Class 4": "A", "Class 5": "A",
  "Class 6": "B", "Class 7": "B", "Class 8": "B",
  "Class 9": "C", "Class 10": "C",
  "Class 11": "D", "Class 12": "D",
  "Undergraduate": "E", "Gap Year": "E"
};

const GROUP_LABELS = {
  A: "Junior (Class 1–5)",
  B: "Middle (Class 6–8)", 
  C: "Secondary (Class 9–10)",
  D: "Senior Secondary (Class 11–12)",
  E: "Undergraduate / Gap Year"
};

const GROUP_TIME = {
  A: "~15 minutes", B: "~20 minutes", C: "~30 minutes", D: "~40 minutes", E: "~30 minutes"
};

export default function ProfileWizard({ session, onNext, onBack }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState(session?.name || '');
  const [age, setAge] = useState(session?.age || '');
  const [classGrade, setClassGrade] = useState(session?.classGrade || '');
  const [errors, setErrors] = useState({});

  const totalSteps = 3;
  const group = CLASS_GROUPS[classGrade];

  const validateStep = () => {
    const newErrors = {};
    if (step === 1 && !name.trim()) {
      newErrors.name = 'Please enter your name';
    }
    if (step === 2 && !age) {
      newErrors.age = 'Please select your age group';
    }
    if (step === 3 && !classGrade) {
      newErrors.classGrade = 'Please select your class/grade';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onNext({
        name: name.trim(),
        age,
        classGrade,
        group,
        startedAt: new Date().toISOString()
      });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const renderDots = () => {
    return Array.from({ length: totalSteps }, (_, i) => (
      <div 
        key={i} 
        className={`progress-dot ${i + 1 === step ? 'active' : i + 1 < step ? 'completed' : ''}`}
      />
    ));
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="stack-lg">
            <div className="field">
              <label className="label" htmlFor="studentName">
                Student's Name <span className="req">*</span>
              </label>
              <input
                type="text"
                id="studentName"
                className={`input ${errors.name ? 'error' : ''}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                autoComplete="name"
              />
              {errors.name && <p className="error-msg">{errors.name}</p>}
            </div>
          </div>
        );
      
      case 2:
        const ageOptions = [
          { value: '6-9', label: '6-9 years', group: 'A' },
          { value: '10-13', label: '10-13 years', group: 'B' },
          { value: '14-15', label: '14-15 years', group: 'C' },
          { value: '16-17', label: '16-17 years', group: 'D' },
          { value: '18-21', label: '18-21 years', group: 'E' }
        ];
        return (
          <div className="stack-lg">
            <p className="text-secondary" style={{marginBottom: 'var(--sp-2)'}}>
              How old are you? 
            </p>
            <div className="radio-group">
              {ageOptions.map(opt => (
                <label 
                  key={opt.value} 
                  className={`radio-card ${age === opt.value ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="age"
                    value={opt.value}
                    checked={age === opt.value}
                    onChange={(e) => setAge(e.target.value)}
                  />
                  <span className="rc-icon">
                    {opt.group === 'A' ? '👶' : opt.group === 'B' ? '🧒' : opt.group === 'C' ? '👦' : opt.group === 'D' ? '👧' : '👱'}
                  </span>
                  {opt.label}
                </label>
              ))}
            </div>
            {errors.age && <p className="error-msg">{errors.age}</p>}
          </div>
        );
      
      case 3:
        const classOptions = [
          { value: 'Class 1', label: 'Class 1' },
          { value: 'Class 2', label: 'Class 2' },
          { value: 'Class 3', label: 'Class 3' },
          { value: 'Class 4', label: 'Class 4' },
          { value: 'Class 5', label: 'Class 5' },
          { value: 'Class 6', label: 'Class 6' },
          { value: 'Class 7', label: 'Class 7' },
          { value: 'Class 8', label: 'Class 8' },
          { value: 'Class 9', label: 'Class 9' },
          { value: 'Class 10', label: 'Class 10' },
          { value: 'Class 11', label: 'Class 11' },
          { value: 'Class 12', label: 'Class 12' },
          { value: 'Undergraduate', label: 'Undergraduate' },
          { value: 'Gap Year', label: 'Gap Year' }
        ];
        return (
          <div className="stack-lg">
            <p className="text-secondary" style={{marginBottom: 'var(--sp-2)'}}>
              Which class/grade are you in?
            </p>
            <div className="radio-group">
              {classOptions.map(opt => (
                <label 
                  key={opt.value} 
                  className={`radio-card ${classGrade === opt.value ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="classGrade"
                    value={opt.value}
                    checked={classGrade === opt.value}
                    onChange={(e) => setClassGrade(e.target.value)}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
            {errors.classGrade && <p className="error-msg">{errors.classGrade}</p>}
            {group && (
              <div className="glass" style={{marginTop: 'var(--sp-4)', padding: 'var(--sp-4)'}}>
                <p style={{fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)'}}>
                  <strong>Estimated time:</strong> {GROUP_TIME[group]}
                </p>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <section className="screen active" id="screen-profile" aria-label="Student profile">
      <div className="container">
        <div className="wizard-shell">
          <div className="wizard-header">
            <div className="wizard-step-label">Step {step} of {totalSteps}</div>
            <h2 className="wizard-title">About the Student</h2>
            <div className="progress-dots" id="pwDots">
              {renderDots()}
            </div>
          </div>
          <div className="glass wizard-body">
            {renderStepContent()}
            <div className="wizard-actions">
              <button className="btn btn-ghost" onClick={handleBack}>← Back</button>
              <button className="btn btn-primary" onClick={handleNext}>
                {step === totalSteps ? 'Finish' : 'Next →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}