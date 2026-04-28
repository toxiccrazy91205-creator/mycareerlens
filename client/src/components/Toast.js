import React from 'react';

export default function Toast({ toast }) {
  if (!toast) return null;
  
  return (
    <div className="toast-area" aria-live="polite" aria-atomic="true">
      <div className={`toast ${toast.type}`}>
        {toast.message}
      </div>
    </div>
  );
}