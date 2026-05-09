import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { COVERAGE_CURVE } from '../data/dhatus.js';
import { DHATUS_EXTENDED as DHATUS } from '../data/dhatus-extended.js';

const getDhatuById = (id) => DHATUS.find((d) => d.id === id) ?? null;
import DhatuPeriodicTable from './DhatuPeriodicTable.jsx';
import DhatuDetail from './DhatuDetail.jsx';
import StackBuilder from './StackBuilder.jsx';

const TABS = [
  { id: 'periodic', label: 'Periodic Table' },
  { id: 'stack',    label: 'Stack Builder' },
  { id: 'coverage', label: 'Coverage' },
];

export default function Verbs() {
  const params = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState('periodic');

  const selectedDhatu = (params.dhatuId && getDhatuById(params.dhatuId)) || DHATUS[0];
  const setSelectedDhatu = (d) => navigate(`/verbs/${d.id}`);
  const onOpenVerse = (chapter, verse) => navigate(`/journey/${chapter}/${verse}`);

  return (
    <div className="verbs">
      <header className="verbs-header">
        <div>
          <h2 className="verbs-title">धातुसङ्ग्रहः</h2>
          <p className="verbs-sub">
            The 5-layer verb stack — धातु → गण → लकार → पद → पुरुष × वचन — across all {DHATUS.length} dhātus
            of the Khoomeik top-192 list (~86.1% coverage of all Sanskrit verb tokens).
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
            dhatus={DHATUS}
            selectedId={selectedDhatu?.id}
            onSelect={setSelectedDhatu}
          />
          <DhatuDetail dhatu={selectedDhatu} onOpenVerse={onOpenVerse} />
        </div>
      )}

      {tab === 'stack' && <StackBuilder dhatus={DHATUS} />}

      {tab === 'coverage' && <Coverage dhatus={DHATUS} curve={COVERAGE_CURVE} />}
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
        This app currently includes <strong>{knownInThisApp}</strong> dhātus (the Khoomeik top-192
        frequency-ranked list), of which <strong>{inGita}</strong> appear in already-decoded Gītā
        verses. The top-192 list covers <strong>~86.1%</strong> of all classical Sanskrit verb tokens
        (Digital Corpus of Sanskrit, ~988k tokens analyzed via vidyut). The top 25 alone hit ~45% — a
        steep payoff curve that's the reason the Periodic Table prioritises frequency on the x-axis.
      </div>
    </section>
  );
}
