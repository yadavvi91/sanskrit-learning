import { useState, useMemo } from 'react';
import { GANA_META } from '../utils/endings.js';

export default function DhatuPeriodicTable({ dhatus, selectedId, onSelect }) {
  const [order, setOrder] = useState('frequency');

  const sorted = useMemo(() => {
    const arr = [...dhatus];
    if (order === 'gana') {
      arr.sort((a, b) => a.gana - b.gana || a.frequencyRank - b.frequencyRank);
    } else {
      arr.sort((a, b) => a.frequencyRank - b.frequencyRank);
    }
    return arr;
  }, [dhatus, order]);

  return (
    <aside className="dhatu-table">
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
      </div>

      <ol className="dhatu-grid">
        {sorted.map((d) => {
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
                title={`${d.iast} — ${d.meanings.join(', ')} (गण ${d.gana}, ${d.pada})`}
              >
                <span className="dhatu-rank">{d.frequencyRank}</span>
                <span className="dhatu-deva">{d.devanagari}</span>
                <span className="dhatu-gana-tag">{d.gana}</span>
              </button>
            </li>
          );
        })}
      </ol>

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
