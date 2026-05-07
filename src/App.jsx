import { useCallback } from 'react';
import { NavLink, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import VerseJourney from './components/VerseJourney.jsx';
import PatternsWon from './components/PatternsWon.jsx';
import Verbs from './components/Verbs.jsx';
import Atlas from './components/Atlas.jsx';
import Primer from './components/Primer.jsx';
import LastVisitBanner from './components/LastVisitBanner.jsx';
import Practice from './components/Practice.jsx';
import Vocabulary from './components/Vocabulary.jsx';
import DecodeHelper from './components/DecodeHelper.jsx';
import ThemePicker from './components/ThemePicker.jsx';

const VIEWS = [
  { path: '/journey',  label: 'Verse Journey' },
  { path: '/patterns', label: 'Patterns Won' },
  { path: '/verbs',    label: 'Verbs' },
  { path: '/atlas',    label: 'Atlas' },
  { path: '/words',    label: 'Words' },
  { path: '/decode',   label: 'Decode' },
  { path: '/primer',   label: 'Primer' },
  { path: '/practice', label: 'Practice' },
];

export default function App() {
  const navigate = useNavigate();

  // Banner-driven navigation: keep the existing API for the banner,
  // implemented now by router navigation.
  const openPrimer = useCallback((sectionId) => {
    navigate(sectionId ? `/primer#${sectionId}` : '/primer');
  }, [navigate]);

  return (
    <div className="app">
      <header className="masthead">
        <div className="masthead-inner">
          <div className="masthead-text">
            <h1 className="masthead-title">गीताध्ययनम्</h1>
            <p className="masthead-sub">
              A working journal of Sanskrit, decoded one Gītā verse at a time.
            </p>
          </div>
          <nav className="view-switcher" aria-label="Views">
            {VIEWS.map((v) => (
              <NavLink
                key={v.path}
                to={v.path}
                className={({ isActive }) => `view-tab ${isActive ? 'is-active' : ''}`}
              >
                {v.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <ThemePicker />
      </header>

      <LastVisitBanner onOpenPrimer={openPrimer} />

      <main className="content">
        <Routes>
          <Route path="/" element={<Navigate to="/journey" replace />} />
          <Route path="/journey" element={<VerseJourney />} />
          <Route path="/journey/:chapter/:verse" element={<VerseJourney />} />
          <Route path="/patterns" element={<PatternsWon />} />
          <Route path="/verbs" element={<Verbs />} />
          <Route path="/verbs/:dhatuId" element={<Verbs />} />
          <Route path="/atlas" element={<Atlas />} />
          <Route path="/atlas/:section" element={<Atlas />} />
          <Route path="/words" element={<Vocabulary />} />
          <Route path="/decode" element={<DecodeHelper />} />
          <Route path="/primer" element={<Primer />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="colophon">
        <span>SOV · पदच्छेद · अन्वय · हिंदी · English</span>
      </footer>
    </div>
  );
}

function NotFound() {
  return (
    <div className="empty-state">
      <p>That tab doesn't exist. <a href="/journey">Back to Verse Journey →</a></p>
    </div>
  );
}
