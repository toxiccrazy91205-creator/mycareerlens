import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Landing from './components/Landing';
import ProfileWizard from './components/ProfileWizard';
import Welcome from './components/Welcome';
import QuestionWizard from './components/QuestionWizard';
import Results from './components/Results';
import AccessibilityPanel from './components/AccessibilityPanel';
import Toast from './components/Toast';
import SaveIndicator from './components/SaveIndicator';
import * as api from './services/api';

const STORAGE_KEY_A11Y = "careerlens_v4_a11y";

export default function App() {
  const [session, setSession] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [profile, setProfile] = useState(null);
  const [careers, setCareers] = useState([]);
  const [a11y, setA11y] = useState({
    darkMode: false,
    highContrast: false,
    fontSize: 0,
    dyslexia: false,
    timerVisible: true
  });
  const [toast, setToast] = useState(null);
  const [showSave, setShowSave] = useState(false);
  const [stats, setStats] = useState({ visits: 0, completions: 0 });
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    const initApp = async () => {
      try {
        const savedA11y = localStorage.getItem(STORAGE_KEY_A11Y);
        if (savedA11y) {
          try {
            const parsed = JSON.parse(savedA11y);
            setA11y(parsed);
            applyA11y(parsed);
          } catch (e) {}
        }

        const savedSessionId = sessionStorage.getItem('careerlens_sessionId');
        if (savedSessionId) {
          try {
            const sessionData = await api.getSession(savedSessionId);
            if (sessionData.success) {
              setSessionId(savedSessionId);
              setSession(sessionData.session);
              
              if (sessionData.session.status === 'completed') {
                const resultsData = await api.getResults(savedSessionId);
                if (resultsData.success && resultsData.profile) {
                  setProfile(resultsData.profile);
                  if (resultsData.result) {
                    setCareers(resultsData.result.careers || []);
                  }
                }
              }
            }
          } catch (e) {
            sessionStorage.removeItem('careerlens_sessionId');
          }
        }

        const statsData = await api.getStats();
        if (statsData.success) {
          setStats(statsData.stats);
        }
      } catch (error) {
        console.error('Init error:', error);
      } finally {
        setLoading(false);
      }
    };

    initApp();
  }, []);

  const applyA11y = (settings) => {
    const html = document.documentElement;
    if (settings.darkMode) html.setAttribute('data-theme', 'dark');
    else html.setAttribute('data-theme', 'light');
    
    if (settings.highContrast) html.setAttribute('data-contrast', 'high');
    else html.removeAttribute('data-contrast');
    
    if (settings.fontSize > 0) html.setAttribute('data-fs', settings.fontSize.toString());
    else html.removeAttribute('data-fs');
    
    if (settings.dyslexia) html.setAttribute('data-dyslexia', 'true');
    else html.removeAttribute('data-dyslexia');
  };

  const updateA11y = (newA11y) => {
    setA11y(newA11y);
    localStorage.setItem(STORAGE_KEY_A11Y, JSON.stringify(newA11y));
    applyA11y(newA11y);
  };

  const toggleA11y = (key) => {
    const newA11y = { ...a11y };
    if (key === 'fontSize') return;
    newA11y[key] = !newA11y[key];
    updateA11y(newA11y);
  };

  const adjustFontSize = (delta) => {
    const newSize = Math.max(0, Math.min(3, a11y.fontSize + delta));
    const newA11y = { ...a11y, fontSize: newSize };
    updateA11y(newA11y);
  };

  const showToastMessage = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const createNewSession = async (profileData) => {
    try {
      const data = await api.createSession(profileData);
      if (data.success) {
        const newSessionId = data.session.sessionId;
        setSessionId(newSessionId);
        sessionStorage.setItem('careerlens_sessionId', newSessionId);
        setSession({ ...profileData, sessionId: newSessionId });
        return newSessionId;
      }
    } catch (error) {
      showToastMessage('Failed to create session', 'error');
    }
    return null;
  };

  const completeSession = async (answers) => {
    if (!sessionId) return;
    
    try {
      await api.updateSession(sessionId, answers, true);
      const resultsData = await api.getResults(sessionId);
      if (resultsData.success) {
        setProfile(resultsData.profile);
        if (resultsData.result) {
          setCareers(resultsData.result.careers || []);
        }
      }
      showToastMessage('Results saved!', 'success');
    } catch (error) {
      showToastMessage('Failed to save results', 'error');
    }
  };

  const saveProgress = async (answers) => {
    if (!sessionId) return;
    
    try {
      await api.updateSession(sessionId, answers, false);
      setShowSave(true);
      setTimeout(() => setShowSave(false), 1500);
    } catch (error) {
      console.error('Save error:', error);
    }
  };

  const startNewSession = () => {
    sessionStorage.removeItem('careerlens_sessionId');
    setSessionId(null);
    setSession(null);
    setProfile(null);
    setCareers([]);
    navigate('/');
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div className="app">
        <div className="bg-mesh"></div>
        <div className="flex-center" style={{ minHeight: '100vh' }}>
          <div className="glass card-spacious text-center">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="bg-mesh" aria-hidden="true"></div>
      
      <a href="#appMain" className="skip-link">Skip to main content</a>
      
      <AccessibilityPanel 
        a11y={a11y} 
        onToggle={toggleA11y}
        onFontSizeAdjust={adjustFontSize}
      />
      
      <Toast toast={toast} />
      <SaveIndicator show={showSave} />
      
      <main id="appMain" tabIndex="-1">
        <Routes>
          <Route path="/" element={
            <Landing 
              session={session}
              stats={stats}
              onStart={() => navigate('/profile')}
              onQuickStart={() => navigate('/profile')}
              onHistory={() => navigate('/results')}
            />
          } />
          <Route path="/profile" element={
            <ProfileWizard
              session={session}
              onNext={async (data) => {
                const newId = await createNewSession(data);
                if (newId) {
                  navigate('/welcome');
                }
              }}
              onBack={() => navigate('/')}
            />
          } />
          <Route path="/welcome" element={
            <Welcome
              session={session}
              onBegin={() => navigate('/questions')}
              onBack={() => navigate('/profile')}
            />
          } />
          <Route path="/questions" element={
            <QuestionWizard
              session={session}
              onSaveProgress={saveProgress}
              onComplete={async (answers) => {
                await completeSession(answers);
                navigate('/results');
              }}
              onBack={() => navigate('/welcome')}
            />
          } />
          <Route path="/results" element={
            <Results
              session={session}
              profile={profile}
              careers={careers}
              onPrint={() => window.print()}
              onRetake={startNewSession}
              onBack={() => navigate('/')}
            />
          } />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container">
          <p><strong>MyCareerLens</strong> is a research-informed career exploration tool. It is not a clinical diagnostic and should not replace professional counseling for major academic decisions. <strong>This tool does not provide professional, clinical, or diagnostic evaluation of any kind.</strong> No outcomes, results, or career paths suggested by this tool are guaranteed.</p>
          <p>Inspired by established academic frameworks: Gardner's Multiple Intelligences (1983), Holland's RIASEC (1959), Big Five Personality Model, learning style preferences (Fleming's VARK model), and Goleman's Emotional Intelligence (1995). This tool is independently developed and is not affiliated with, endorsed by, or connected to any authors, organizations, or official providers of the referenced academic frameworks.</p>
          <p>MyCareerLens respects your privacy. Your responses and results are stored securely in our database. No personal data is shared or sold.</p>
          <p>Free forever. No premium. No upsell. Credits: Google Fonts, OpenDyslexic.</p>
        </div>
      </footer>
    </div>
  );
}