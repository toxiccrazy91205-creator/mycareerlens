import React, { useState } from 'react';

const HOLLAND_PLAIN = {
  R: "Doer", I: "Thinker", A: "Creator",
  S: "Helper", E: "Persuader", C: "Organizer"
};

export default function Results({ session, profile, careers, onPrint, onRetake, onBack }) {
  const [activeTab, setActiveTab] = useState('profile');

  const renderProfileTab = () => {
    if (!profile) return (
      <div className="glass card-spacious text-center">
        <p className="text-secondary">Loading your profile...</p>
      </div>
    );

    const archetype = profile.archetype || {};
    const hollandCodes = profile.hollandCodes || {};
    const personality = profile.personality || {};
    const topIntelligences = profile.topIntelligences || [];
    const topInterests = profile.topInterests || [];

    return (
      <div>
        <div className="archetype-card">
          <div className="archetype-emoji">✨</div>
          <div className="archetype-name">{archetype.name || 'Your Profile'}</div>
          <p className="archetype-desc">
            {archetype.description || 'Based on your responses, this is your unique personality profile.'}
          </p>
        </div>

        <div className="holland-row" style={{marginTop: 'var(--sp-5)'}}>
          <span className="holland-label">Top Interest Areas</span>
          <div className="holland-chips">
            {topInterests.slice(0, 3).map(code => (
              <span key={code} className="holland-chip">
                <span className="holland-letter">{code}</span>
                {HOLLAND_PLAIN[code]}
              </span>
            ))}
          </div>
        </div>

        <div className="strengths-grid" style={{marginTop: 'var(--sp-5)'}}>
          <div className="profile-card">
            <h3 className="profile-card-title">Your Strengths</h3>
            <div className="dim-row">
              <span className="dim-row-label">Openness</span>
              <div className="dim-row-bar"><div className="dim-row-fill" style={{width: (personality.openness || 0) + '%'}}></div></div>
              <span className="dim-row-value">{personality.openness || 0}%</span>
            </div>
            <div className="dim-row">
              <span className="dim-row-label">Conscientiousness</span>
              <div className="dim-row-bar"><div className="dim-row-fill" style={{width: (personality.conscientiousness || 0) + '%'}}></div></div>
              <span className="dim-row-value">{personality.conscientiousness || 0}%</span>
            </div>
            <div className="dim-row">
              <span className="dim-row-label">Extraversion</span>
              <div className="dim-row-bar"><div className="dim-row-fill" style={{width: (personality.extraversion || 0) + '%'}}></div></div>
              <span className="dim-row-value">{personality.extraversion || 0}%</span>
            </div>
            <div className="dim-row">
              <span className="dim-row-label">Agreeableness</span>
              <div className="dim-row-bar"><div className="dim-row-fill" style={{width: (personality.agreeableness || 0) + '%'}}></div></div>
              <span className="dim-row-value">{personality.agreeableness || 0}%</span>
            </div>
            <div className="dim-row">
              <span className="dim-row-label">Emotional Stability</span>
              <div className="dim-row-bar"><div className="dim-row-fill" style={{width: (personality.emotionalStability || 0) + '%'}}></div></div>
              <span className="dim-row-value">{personality.emotionalStability || 0}%</span>
            </div>
          </div>

          <div className="profile-card">
            <h3 className="profile-card-title">Learning Style</h3>
            {profile.learningStyle ? (
              <p style={{textTransform: 'capitalize'}}>{profile.learningStyle}</p>
            ) : (
              <p className="profile-empty">Complete more questions to see your learning style.</p>
            )}
            <p className="profile-hint">
              Knowing your learning style helps you study more effectively.
            </p>
          </div>

          <div className="profile-card">
            <h3 className="profile-card-title">Multiple Intelligences</h3>
            {topIntelligences.length > 0 ? (
              <div className="holland-chips">
                {topIntelligences.map(i => (
                  <span key={i} className="holland-chip">{i}</span>
                ))}
              </div>
            ) : (
              <p className="profile-empty">Complete more questions to see your intelligences.</p>
            )}
          </div>
        </div>

        {(profile.group === 'A' || profile.group === 'B') && (
          <div className="talk-parent-card" style={{marginTop: 'var(--sp-5)'}}>
            <h3 className="talk-parent-title">💬 Talk to Your Parent</h3>
            <p className="talk-parent-intro">
              Here are some things you could discuss with your parent or guardian:
            </p>
            <ul className="talk-parent-list">
              <li>What did you find most interesting about these results?</li>
              <li>Are there any careers you'd like to learn more about?</li>
              <li>What activities do you enjoy the most?</li>
            </ul>
            <p className="talk-parent-closing">
              Remember: These are just starting points. Your interests will keep growing and changing as you do!
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderCareersTab = () => {
    if (!profile) return <div>Loading...</div>;

    const strongMatches = careers.filter(c => c.tier === 'strong');
    const goodFits = careers.filter(c => c.tier === 'good');
    const explore = careers.filter(c => c.tier === 'explore');

    return (
      <div>
        <p className="careers-intro">
          Based on your profile, here are careers that might suit you.
        </p>

        {profile.unsureCount && profile.totalAnswered && (profile.unsureCount / profile.totalAnswered > 0.2) && (
          <div id="unsureReliabilityBanner" className="unsure-banner unsure-banner-gentle">
            <p className="unsure-banner-title">Results may be less reliable</p>
            <p className="unsure-banner-body">
              You answered "I'm not sure" for many questions. Consider retaking for better results.
            </p>
          </div>
        )}

        <div className="meta-guidance">
          <strong>How to use this list</strong>
          <ul className="meta-guidance-list">
            <li><strong>Strong Match</strong> — Very high alignment with your profile</li>
            <li><strong>Good Fit</strong> — Good alignment, worth exploring</li>
            <li><strong>Worth Exploring</strong> — Moderate alignment, learn more</li>
          </ul>
        </div>

        {strongMatches.length > 0 && (
          <div className="tier-section tier-strong">
            <div className="tier-header">
              <span className="tier-icon">⭐</span>
              <span className="tier-label">Strong Matches</span>
              <span className="tier-count">{strongMatches.length}</span>
            </div>
            <p className="tier-desc">Careers that very closely align with your profile</p>
            <div className="careers-grid">
              {strongMatches.slice(0, 5).map((career, idx) => (
                <CareerCard key={career.careerId} career={career} rank={idx + 1} />
              ))}
            </div>
          </div>
        )}

        {goodFits.length > 0 && (
          <div className="tier-section tier-good">
            <div className="tier-header">
              <span className="tier-icon">✓</span>
              <span className="tier-label">Good Fits</span>
              <span className="tier-count">{goodFits.length}</span>
            </div>
            <div className="careers-grid">
              {goodFits.slice(0, 5).map((career, idx) => (
                <CareerCard key={career.careerId} career={career} rank={strongMatches.length + idx + 1} />
              ))}
            </div>
          </div>
        )}

        {explore.length > 0 && (
          <div className="tier-section tier-explore">
            <div className="tier-header">
              <span className="tier-icon">🔭</span>
              <span className="tier-label">Worth Exploring</span>
              <span className="tier-count">{explore.length}</span>
            </div>
            <div className="careers-grid">
              {explore.slice(0, 5).map((career, idx) => (
                <CareerCard key={career.careerId} career={career} rank={strongMatches.length + goodFits.length + idx + 1} />
              ))}
            </div>
          </div>
        )}

        <div className="meta-limits">
          <strong className="meta-limits-title">What this cannot tell you</strong>
          <p className="meta-limits-intro">
            Career decisions are complex. This tool is a starting point, not an answer.
          </p>
          <ul className="meta-limits-list">
            <li>It cannot predict academic performance</li>
            <li>It cannot account for family circumstances</li>
            <li>It cannot replace conversations with parents and counselors</li>
            <li>It cannot guarantee job availability</li>
          </ul>
        </div>
      </div>
    );
  };

  const renderActionTab = () => {
    return (
      <div>
        <div className="action-hero">
          <h3>Your Action Plan</h3>
          <p className="action-sub">
            Next steps to explore your career directions
          </p>
        </div>

        <div className="action-card">
          <h4 className="action-card-title">Top Actions</h4>
          <ul className="action-list">
            <li>Explore the careers listed in the Career Directions tab</li>
            <li>Talk to your parents about what interested you</li>
            <li>Try one activity from the skills section</li>
            <li>Watch videos about careers you're curious about</li>
            <li>Consider retaking this assessment in 1-2 years</li>
          </ul>
        </div>
      </div>
    );
  };

  const renderParentTab = () => {
    return (
      <div>
        <div className="parent-hero">
          <h3>Parent Guide</h3>
          <p className="parent-sub">
            How to support your child's career exploration
          </p>
        </div>

        <div className="parent-card">
          <h4 className="parent-card-title">About These Results</h4>
          <p className="parent-card-desc">
            These results are based on your child's responses to questions about their interests, 
            personality, and learning style. They are a starting point for conversation, not a definitive answer.
          </p>
        </div>

        <div className="parent-card">
          <h4 className="parent-card-title">How to Support Your Child</h4>
          <ul className="parent-list">
            <li>Discuss the results together — ask what surprised them</li>
            <li>Explore careers they didn't know existed</li>
            <li>Encourage trying activities in areas of interest</li>
            <li>Help them understand that interests can change</li>
            <li>Consider their passion, not just "stable" careers</li>
            <li>Remember: These are starting points, not final decisions</li>
          </ul>
        </div>

        <details className="parent-faq-item">
          <summary>Should my child retake this later?</summary>
          <div className="parent-faq-answer">
            <p><strong>Yes!</strong> Interests evolve significantly between ages 6 and 21. 
            We recommend retaking every 1-2 years, especially before major academic decisions.</p>
          </div>
        </details>

        <details className="parent-faq-item">
          <summary>How reliable is this?</summary>
          <div className="parent-faq-answer">
            <p>This uses established psychology frameworks, but MyCareerLens's specific implementation 
            hasn't been independently reviewed. Treat results as a conversation starter, not a diagnosis.</p>
          </div>
        </details>

        <details className="parent-faq-item">
          <summary>Do we still need a career counselor?</summary>
          <div className="parent-faq-answer">
            <p><strong>Possibly yes.</strong> For major decisions (Class 10 stream, Class 12 college), 
            a professional counselor can provide personalized guidance this tool cannot.</p>
          </div>
        </details>
      </div>
    );
  };

  const { name, group } = session || {};

  return (
    <section className="screen active" id="screen-results" aria-label="Your results">
      <div className="container">
        <div className="glass results-hero">
          <div className="flex-between" style={{flexWrap: 'wrap'}}>
            <div>
              <div className="results-hero-name">Results</div>
              <div className="results-hero-meta">
                {name && <span className="badge badge-primary">{name}</span>}
                {group && <span className="badge badge-gold">{group}</span>}
              </div>
            </div>
            <div className="results-actions">
              <button className="btn btn-secondary btn-sm" onClick={onPrint}>🖨️ Print</button>
              <button className="btn btn-primary btn-sm" onClick={onRetake}>🔄 Retake</button>
            </div>
          </div>
        </div>

        <nav className="tab-bar" role="tablist" aria-label="Results navigation">
          <div className="tab-bar-inner">
            <button 
              className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`} 
              data-tab="profile" 
              role="tab" 
              aria-selected={activeTab === 'profile'}
              onClick={() => setActiveTab('profile')}
            >
              <span className="tab-btn-icon">📊</span>
              <span className="tab-btn-label-full">Your Profile</span>
              <span className="tab-btn-label-short">Profile</span>
            </button>
            <button 
              className={`tab-btn ${activeTab === 'careers' ? 'active' : ''}`} 
              data-tab="careers" 
              role="tab" 
              aria-selected={activeTab === 'careers'}
              onClick={() => setActiveTab('careers')}
            >
              <span className="tab-btn-icon">🎯</span>
              <span className="tab-btn-label-full">Career Directions</span>
              <span className="tab-btn-label-short">Careers</span>
            </button>
            <button 
              className={`tab-btn ${activeTab === 'action' ? 'active' : ''}`} 
              data-tab="action" 
              role="tab" 
              aria-selected={activeTab === 'action'}
              onClick={() => setActiveTab('action')}
            >
              <span className="tab-btn-icon">📋</span>
              <span className="tab-btn-label-full">Action Plan</span>
              <span className="tab-btn-label-short">Action</span>
            </button>
            <button 
              className={`tab-btn ${activeTab === 'parent' ? 'active' : ''}`} 
              data-tab="parent" 
              role="tab" 
              aria-selected={activeTab === 'parent'}
              onClick={() => setActiveTab('parent')}
            >
              <span className="tab-btn-icon">💌</span>
              <span className="tab-btn-label-full">Parent Guide</span>
              <span className="tab-btn-label-short">Parent</span>
            </button>
          </div>
        </nav>

        <div style={{padding: 'var(--sp-5) 0'}}>
          <div className={`tab-panel ${activeTab === 'profile' ? 'active' : ''}`} id="tab-profile">
            {renderProfileTab()}
          </div>
          <div className={`tab-panel ${activeTab === 'careers' ? 'active' : ''}`} id="tab-careers">
            {renderCareersTab()}
          </div>
          <div className={`tab-panel ${activeTab === 'action' ? 'active' : ''}`} id="tab-action">
            {renderActionTab()}
          </div>
          <div className={`tab-panel ${activeTab === 'parent' ? 'active' : ''}`} id="tab-parent">
            {renderParentTab()}
          </div>
        </div>
      </div>
    </section>
  );
}

function CareerCard({ career, rank }) {
  const tierClass = career.tier === 'strong' ? 'career-card-strong' : 
                    career.tier === 'good' ? 'career-card-good' : 'career-card-explore';

  return (
    <div className={`career-card ${tierClass}`}>
      <div className="career-card-head">
        <span className="career-rank">#{rank}</span>
        <div className="career-score">
          <div className="career-score-num">{career.score}</div>
          <div className="career-score-label">match</div>
        </div>
      </div>
      <h3 className="career-name">{career.name}</h3>
      <div className="career-meta">
        <span className="badge badge-primary">{career.sector}</span>
      </div>
      <p className="career-desc">{career.description}</p>
      <div className="career-why">
        <strong>Why this fits you:</strong>
        <ul className="career-why-list">
          {career.why?.map((reason, i) => (
            <li key={i}>{reason}</li>
          ))}
        </ul>
      </div>
      <div className="salary-note">
        💰 Salary: ₹{career.salaryINR?.entry}LPA - {career.salaryINR?.mid}LPA
      </div>
    </div>
  );
}