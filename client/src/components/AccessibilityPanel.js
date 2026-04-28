import React from 'react';

export default function AccessibilityPanel({ a11y, onToggle, onFontSizeAdjust }) {
  return (
    <>
      <button 
        className="a11y-launcher" 
        id="a11yLauncher" 
        aria-label="Open accessibility settings" 
        aria-expanded="false"
        onClick={() => {
          const panel = document.getElementById('a11yPanel');
          const isOpen = panel.classList.contains('open');
          panel.classList.toggle('open');
          panel.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
          document.getElementById('a11yLauncher').setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
        }}
      >
        ⚙️
      </button>
      <div className="a11y-panel" id="a11yPanel" role="dialog" aria-label="Accessibility settings" aria-hidden="true">
        <h4 style={{marginBottom: 'var(--sp-3)'}}>Accessibility</h4>
        <div className="a11y-row">
          <span className="a11y-row-label">🌙 Dark Mode</span>
          <button 
            className={`toggle ${a11y.darkMode ? 'on' : ''}`} 
            id="tgDark" 
            role="switch" 
            aria-checked={a11y.darkMode ? 'true' : 'false'} 
            aria-label="Toggle dark mode"
            onClick={() => onToggle('darkMode')}
          ></button>
        </div>
        <div className="a11y-row">
          <span className="a11y-row-label">🔆 High Contrast</span>
          <button 
            className={`toggle ${a11y.highContrast ? 'on' : ''}`} 
            id="tgContrast" 
            role="switch" 
            aria-checked={a11y.highContrast ? 'true' : 'false'} 
            aria-label="Toggle high contrast mode"
            onClick={() => onToggle('highContrast')}
          ></button>
        </div>
        <div className="a11y-row">
          <span className="a11y-row-label">A+ Text Size</span>
          <span className="stepper">
            <button 
              className="stepper-btn" 
              id="fsDown" 
              aria-label="Decrease text size"
              onClick={() => onFontSizeAdjust(-1)}
            >
              −
            </button>
            <span className="stepper-val" id="fsVal">{a11y.fontSize}</span>
            <button 
              className="stepper-btn" 
              id="fsUp" 
              aria-label="Increase text size"
              onClick={() => onFontSizeAdjust(1)}
            >
              +
            </button>
          </span>
        </div>
        <div className="a11y-row">
          <span className="a11y-row-label">👁️ Dyslexia Font</span>
          <button 
            className={`toggle ${a11y.dyslexia ? 'on' : ''}`} 
            id="tgDyslexia" 
            role="switch" 
            aria-checked={a11y.dyslexia ? 'true' : 'false'} 
            aria-label="Toggle dyslexia-friendly font"
            onClick={() => onToggle('dyslexia')}
          ></button>
        </div>
        <div className="a11y-row">
          <span className="a11y-row-label">⏱️ Timer Visible</span>
          <button 
            className={`toggle ${a11y.timerVisible ? 'on' : ''}`} 
            id="tgTimer" 
            role="switch" 
            aria-checked={a11y.timerVisible ? 'true' : 'false'} 
            aria-label="Toggle assessment timer visibility"
            onClick={() => onToggle('timerVisible')}
          ></button>
        </div>
      </div>
    </>
  );
}