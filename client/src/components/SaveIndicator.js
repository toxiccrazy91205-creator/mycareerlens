import React from 'react';

export default function SaveIndicator({ show }) {
  return (
    <div className={`save-indicator ${show ? 'show' : ''}`} aria-live="polite">
      💾 Saved
    </div>
  );
}