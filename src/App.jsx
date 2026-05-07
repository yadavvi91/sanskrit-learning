import { useState } from 'react';
import VerseJourney from './components/VerseJourney.jsx';
import PatternsWon from './components/PatternsWon.jsx';
import Verbs from './components/Verbs.jsx';

const VIEWS = [
  { id: 'journey', label: 'Verse Journey' },
  { id: 'patterns', label: 'Patterns Won' },
  { id: 'verbs', label: 'Verbs' },
];

export default function App() {
  const [view, setView] = useState('journey');

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

      <main className="content">
        {view === 'journey' && <VerseJourney />}
        {view === 'patterns' && <PatternsWon />}
        {view === 'verbs' && <Verbs />}
      </main>

      <footer className="colophon">
        <span>SOV · पदच्छेद · अन्वय · हिंदी · English</span>
      </footer>
    </div>
  );
}
