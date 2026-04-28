const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'API Error');
    }
    
    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

// Session APIs
export async function createSession(profileData) {
  return fetchAPI('/sessions', {
    method: 'POST',
    body: JSON.stringify(profileData),
  });
}

export async function getSession(sessionId) {
  return fetchAPI(`/sessions/${sessionId}`);
}

export async function updateSession(sessionId, answers, completed = false) {
  return fetchAPI(`/sessions/${sessionId}`, {
    method: 'PUT',
    body: JSON.stringify({ answers, completed }),
  });
}

// Results APIs
export async function getResults(sessionId) {
  return fetchAPI(`/results/${sessionId}`);
}

// Stats API
export async function getStats() {
  return fetchAPI('/stats');
}

export default {
  createSession,
  getSession,
  updateSession,
  getResults,
  getStats,
};