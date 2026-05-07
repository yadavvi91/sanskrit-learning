import { useCallback, useState } from 'react';
import VerseJourney from './components/VerseJourney.jsx';
import PatternsWon from './components/PatternsWon.jsx';
import Verbs from './components/Verbs.jsx';
import Atlas from './components/Atlas.jsx';
import Primer from './components/Primer.jsx';
import LastVisitBanner from './components/LastVisitBanner.jsx';
import Practice from './components/Practice.jsx';

const VIEWS = [
  { id: 'journey', label: 'Verse Journey' },
  { id: 'patterns', label: 'Patterns Won' },
  { id: 'verbs', label: 'Verbs' },
  { id: 'atlas', label: 'Atlas' },
  { id: 'primer', label: 'Primer' },
  { id: 'practice', label: 'Practice' },
];

export default function App() {
  const [view, setView] = useState('journey');
  const [primerJumpTo, setPrimerJumpTo] = useState(null);

  const openPrimer = useCallback((sectionId) => {
    setPrimerJumpTo(sectionId ?? null);
    setView('primer');
  }, []);

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
              <button
                key={v.id}
                type="button"
                className={`view-tab ${view === v.id ? 'is-active' : ''}`}
                onClick={() => setView(v.id)}
              >
                {v.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <LastVisitBanner onOpenPrimer={openPrimer} />

      <main className="content">
        {view === 'journey' && <VerseJourney />}
        {view === 'patterns' && <PatternsWon />}
        {view === 'verbs' && <Verbs />}
        {view === 'atlas' && <Atlas />}
        {view === 'primer' && <Primer jumpToSection={primerJumpTo} />}
        {view === 'practice' && <Practice />}
      </main>

      <footer className="colophon">
        <span>SOV · पदच्छेद · अन्वय · हिंदी · English</span>
      </footer>
    </div>
  );
}
