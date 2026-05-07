import { useState } from 'react';
import { DHATUS_TOP25, COVERAGE_CURVE } from '../data/dhatus.js';
import DhatuPeriodicTable from './DhatuPeriodicTable.jsx';
import DhatuDetail from './DhatuDetail.jsx';
import StackBuilder from './StackBuilder.jsx';

const TABS = [
  { id: 'periodic', label: 'Periodic Table' },
  { id: 'stack',    label: 'Stack Builder' },
  { id: 'coverage', label: 'Coverage' },
];

export default function Verbs({ onOpenVerse }) {
  const [tab, setTab] = useState('periodic');
  const [selectedDhatu, setSelectedDhatu] = useState(DHATUS_TOP25[0]);

  return (
    <div className="verbs">
      <header className="verbs-header">
        <div>
          <h2 className="verbs-title">धातुसङ्ग्रहः</h2>
          <p className="verbs-sub">
            The 5-layer verb stack — धातु → गण → लकार → पद → पुरुष × वचन — across {DHATUS_TOP25.length} top dhātus
            (Khoomeik frequency).
          </p>
        </div>
        <nav className="sub-tabs" aria-label="Verb views">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`sub-tab ${tab === t.id ? 'is-active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      {tab === 'periodic' && (
        <div className="verbs-split">
          <DhatuPeriodicTable
            dhatus={DHATUS_TOP25}
            selectedId={selectedDhatu?.id}
            onSelect={setSelectedDhatu}
          />
          <DhatuDetail dhatu={selectedDhatu} onOpenVerse={onOpenVerse} />
        </div>
      )}

      {tab === 'stack' && <StackBuilder dhatus={DHATUS_TOP25} />}

      {tab === 'coverage' && <Coverage dhatus={DHATUS_TOP25} curve={COVERAGE_CURVE} />}
    </div>
  );
}

function Coverage({ dhatus, curve }) {
  const knownInThisApp = dhatus.length;
  const inGita = dhatus.filter((d) => (d.gitaOccurrences || []).length > 0).length;
  return (
    <section className="coverage">
      <h3 className="coverage-heading">Coverage of all Sanskrit verb tokens (Khoomeik)</h3>
      <table className="coverage-table">
        <thead>
          <tr><th>Top N dhātus</th><th>% coverage</th></tr>
        </thead>
        <tbody>
          {curve.map((row) => (
            <tr key={row.topN} className={knownInThisApp >= row.topN ? 'is-reached' : ''}>
              <td>Top {row.topN}</td>
              <td>{row.percent.toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="coverage-note">
        This app currently includes <strong>{knownInThisApp}</strong> dhātus, of which <strong>{inGita}</strong>{' '}
        appear in already-decoded Gītā verses. Top-25 covers about <strong>45%</strong> of all classical
        Sanskrit verb tokens — a steep payoff curve.
      </div>
    </section>
  );
}
