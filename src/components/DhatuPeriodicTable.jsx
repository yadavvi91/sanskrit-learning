import { useState, useMemo } from 'react';
import { GANA_META } from '../utils/endings.js';

const TIER_OPTIONS = [
  { id: 'all',     label: 'All',      maxRank: Infinity },
  { id: 'top10',   label: 'Top 10',   maxRank: 10 },
  { id: 'top25',   label: 'Top 25',   maxRank: 25 },
  { id: 'top50',   label: 'Top 50',   maxRank: 50 },
  { id: 'top100',  label: 'Top 100',  maxRank: 100 },
  { id: 'top192',  label: 'Top 192',  maxRank: 192 },
  { id: 'gita',    label: 'In Gītā',  maxRank: Infinity, inGitaOnly: true },
];

export default function DhatuPeriodicTable({ dhatus, selectedId, onSelect }) {
  const [order, setOrder] = useState('frequency');
  const [tier, setTier] = useState('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const tierOpt = TIER_OPTIONS.find((t) => t.id === tier) ?? TIER_OPTIONS[0];
    const q = query.trim().toLowerCase();

    let arr = dhatus.filter((d) => {
      if (tierOpt.inGitaOnly && (d.gitaOccurrences || []).length === 0) return false;
      // The 49 stub dhātus added via _dhatus_extra.js have frequencyRank=null
      // (they exist in the Gītā but not in Khoomeik's top-192 list). Without
      // an explicit null check, `null > N` evaluates to false (null coerces
      // to 0), so they would leak through every Top-N tier. Treat unranked
      // dhātus as outside any Top-N tier; they only appear under "All".
      if (tierOpt.maxRank !== Infinity) {
        if (d.frequencyRank == null) return false;
        if (d.frequencyRank > tierOpt.maxRank) return false;
      }
      if (q) {
        const hay = `${d.devanagari} ${d.iast} ${d.meanings.join(' ')}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    if (order === 'gana') {
      arr.sort((a, b) => a.gana - b.gana || a.frequencyRank - b.frequencyRank);
    } else {
      arr.sort((a, b) => a.frequencyRank - b.frequencyRank);
    }
    return arr;
  }, [dhatus, order, tier, query]);

  return (
    <aside className="dhatu-table">
      <div className="dhatu-table-toolbar">
        <input
          type="search"
          placeholder="Search root, IAST, or meaning…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="dhatu-search"
        />
      </div>

      <div className="dhatu-tier-row">
        {TIER_OPTIONS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`tier-chip ${tier === t.id ? 'is-active' : ''}`}
            onClick={() => setTier(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="dhatu-table-toolbar">
        <span className="dhatu-toolbar-label">Order</span>
        <button
          type="button"
          className={`order-btn ${order === 'frequency' ? 'is-active' : ''}`}
          onClick={() => setOrder('frequency')}
        >
          By frequency
        </button>
        <button
          type="button"
          className={`order-btn ${order === 'gana' ? 'is-active' : ''}`}
          onClick={() => setOrder('gana')}
        >
          By गण
        </button>
        <span className="dhatu-result-count">{filtered.length} / {dhatus.length}</span>
      </div>

      {filtered.length === 0 ? (
        <p className="dhatu-empty">No dhātus match this filter.</p>
      ) : (
        <ol className="dhatu-grid">
          {filtered.map((d) => {
            const inGita = (d.gitaOccurrences || []).length > 0;
            return (
              <li key={d.id}>
                <button
                  type="button"
                  className={[
                    'dhatu-cell',
                    `gana-${d.gana}`,
                    selectedId === d.id ? 'is-selected' : '',
                    inGita ? 'in-gita' : '',
                  ].filter(Boolean).join(' ')}
                  onClick={() => onSelect(d)}
                  title={`${d.iast} — ${d.meanings.join(', ')} (गण ${d.gana}, ${d.pada}, rank #${d.frequencyRank})`}
                >
                  <span className="dhatu-deva">{d.devanagari}</span>
                  <span className="dhatu-iast">{d.iast}</span>
                </button>
              </li>
            );
          })}
        </ol>
      )}

      <div className="dhatu-legend">
        {Object.entries(GANA_META).map(([n, meta]) => (
          <span key={n} className={`gana-chip gana-${n}`} title={meta.rule}>
            <span className="gana-chip-num">{n}</span>{' '}
            <span className="gana-chip-name">{meta.devanagari}</span>
          </span>
        ))}
      </div>
    </aside>
  );
}
