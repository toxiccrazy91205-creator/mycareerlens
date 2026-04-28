import React from 'react';

export default function Landing({ session, stats, onStart, onQuickStart, onHistory }) {
  return (
    <section className="screen active" id="screen-landing" aria-label="Welcome">
      <div className="container">
        <div className="hero">
          <div className="hero-deco hero-deco-1" aria-hidden="true"></div>
          <div className="hero-deco hero-deco-2" aria-hidden="true"></div>
          <h1>MyCareerLens</h1>
          <p className="hero-tag">Discover Your Career Direction</p>
          <p className="hero-sub">
            A free, research-backed career exploration tool for Indian students aged 6–21. 
            Honest, warm, and designed to travel with you wherever you go.
          </p>
          
          {stats && (stats.visits > 0 || stats.completions > 0) && (
            <p style={{textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem'}}>
              📊 {stats.completions?.toLocaleString() || 0} completions
            </p>
          )}
          
          <div className="cta-area">
            <button className="btn btn-primary btn-large btn-pulse" onClick={onStart}>
              Start Your Assessment →
            </button>
            <a href="#" className="cta-secondary" onClick={(e) => { e.preventDefault(); onQuickStart(); }}>
              Short on time? Try the Quick Exploration (10 min, 20 questions)
            </a>
            <p className="hero-calibration">
              A simple career exploration tool — not a formal test or professional assessment. 
              A starting point for thinking about career directions; it doesn't predict your future or guarantee outcomes.
            </p>
          </div>
        </div>

        <section aria-label="How it works" style={{marginTop: 'var(--sp-8)'}}>
          <h2 className="text-center" style={{marginBottom: 'var(--sp-2)'}}>How It Works</h2>
          <p className="text-center text-muted" style={{marginBottom: 'var(--sp-5)'}}>
            Four simple steps from your first tap to personalized career directions.
          </p>
          <div className="hiw-grid">
            <div className="glass hiw-card">
              <div className="hiw-icon">📝</div>
              <div className="hiw-title">Tell us about yourself</div>
              <div className="hiw-desc">Quick profile: name, age, class (2 minutes)</div>
            </div>
            <div className="glass hiw-card">
              <div className="hiw-icon">🧠</div>
              <div className="hiw-title">Answer fun questions</div>
              <div className="hiw-desc">Activity-based questions across multiple dimensions (15–40 min depending on age)</div>
            </div>
            <div className="glass hiw-card">
              <div className="hiw-icon">📊</div>
              <div className="hiw-title">See your unique profile</div>
              <div className="hiw-desc">Your strengths, interests, personality, and learning style — beautifully visualized</div>
            </div>
            <div className="glass hiw-card">
              <div className="hiw-icon">🎯</div>
              <div className="hiw-title">Explore career directions</div>
              <div className="hiw-desc">Career paths that align with your profile, with roadmaps and action steps</div>
            </div>
          </div>
        </section>

        <section aria-label="Trust indicators" style={{marginTop: 'var(--sp-8)'}}>
          <div className="trust-row">
            <div className="trust-item">
              <span className="trust-icon">🔬</span>
              <span className="trust-text">Built on established research frameworks used by career psychologists worldwide</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🔒</span>
              <span className="trust-text">Your answers are securely stored in our database</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🎁</span>
              <span className="trust-text">Free forever — no premium tiers, no ads, no data collection</span>
            </div>
          </div>
        </section>

        <aside className="credits-badge" aria-label="Created by" role="complementary">
          <button 
            className="credits-badge-toggle" 
            aria-label="Toggle credits visibility" 
            title="Hide/show credits"
            onClick={(e) => {
              const badge = e.target.closest('.credits-badge');
              badge.classList.toggle('collapsed');
            }}
          >
            −
          </button>
          <div className="credits-badge-content">
            <div className="credits-badge-ribbon">🎁 A Gift to Young Minds</div>
            <div className="credits-badge-name">by <strong>Mr. Rajan Tonape</strong></div>
            <div className="credits-badge-title">Visionary for Young India</div>
            <div className="credits-badge-divider"></div>
            <div className="credits-badge-collab">
              Developed with <strong>Claude</strong><br/><span>by Anthropic</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}