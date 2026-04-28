import React from 'react';

const GROUP_MESSAGES = {
  A: {
    title: "Welcome! 🎉",
    body: "Hi ${name}! You've chosen to explore your interests — how exciting! We'll ask you some fun questions about what you like to do. There are no right or wrong answers — just pick what feels most like you!"
  },
  B: {
    title: "Welcome! 🌟",
    body: "Hi ${name}! You're about to discover your unique strengths and interests. We'll ask you some questions about what you enjoy doing. There are no right or wrong answers — just be yourself!"
  },
  C: {
    title: "Welcome! 🚀",
    body: "Hi ${name}! You're about to explore career directions that might suit you. We'll ask you questions about your interests and strengths. Be honest — there are no wrong answers!"
  },
  D: {
    title: "Welcome! 🎯",
    body: "Hi ${name}! You're about to get personalized career insights. We'll explore your interests, personality, and strengths. Answer honestly — this is about finding what genuinely fits you."
  },
  E: {
    title: "Welcome! 🌟",
    body: "Hi ${name}! You're about to discover career directions that match your profile. We'll ask you questions about your interests, personality, and values. Be yourself — there are no wrong answers!"
  }
};

export default function Welcome({ session, onBegin, onBack }) {
  const { name, group } = session || {};
  const message = GROUP_MESSAGES[group] || GROUP_MESSAGES.E;
  
  const displayMessage = {
    ...message,
    body: message.body.replace('${name}', name || 'there')
  };

  return (
    <section className="screen active" id="screen-welcome" aria-label="Personalized welcome">
      <div className="container container-narrow">
        <div className="glass card-spacious text-center">
          <div style={{fontSize: '3rem', marginBottom: 'var(--sp-3)'}}>🌟</div>
          <h2 id="welcomeTitle">{displayMessage.title}</h2>
          <p id="welcomeBody" style={{margin: 'var(--sp-4) 0', color: 'var(--text-secondary)', fontSize: 'var(--fs-lg)', lineHeight: '1.6'}}>
            {displayMessage.body}
          </p>
          <div className="cta-area">
            <button className="btn btn-primary btn-large" onClick={onBegin}>Begin Assessment →</button>
            <button className="btn btn-ghost btn-sm" onClick={onBack}>← Back to profile</button>
          </div>
        </div>
      </div>
    </section>
  );
}