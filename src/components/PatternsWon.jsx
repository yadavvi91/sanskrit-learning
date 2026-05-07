import { useMemo, useState } from 'react';
import { PATTERN_CATEGORIES } from '../data/patterns.js';
import { flattenPatterns, patternStats, COMPARATORS } from '../utils/patternStats.js';

export default function PatternsWon({ onOpenPrimer, onOpenVerse }) {
  const all = useMemo(() => flattenPatterns(), []);
  const [sortBy, setSortBy] = useState({ column: 'category', direction: 'asc' });
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [query, setQuery] = useState('');

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = all.filter((p) => {
      if (categoryFilter !== 'all' && p.categoryId !== categoryFilter) return false;
      if (q) {
        const hay = `${p.name} ${p.meaning}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    const cmp = COMPARATORS[sortBy.column] ?? COMPARATORS.category;
    arr.sort(cmp);
    if (sortBy.direction === 'desc') arr.reverse();
    return arr;
  }, [all, sortBy, categoryFilter, query]);

  function clickHeader(column) {
    if (sortBy.column === column) {
      setSortBy({ column, direction: sortBy.direction === 'asc' ? 'desc' : 'asc' });
    } else {
      setSortBy({ column, direction: 'asc' });
    }
  }

  return (
    <div className="patterns">
      <header className="patterns-header">
        <div>
          <h2 className="patterns-title">Patterns Won</h2>
          <p className="patterns-sub">
            {all.length} grammar patterns internalized so far. Sort, filter, search — and click a verse cell to jump there.
          </p>
        </div>
      </header>

      <div className="patterns-toolbar">
        <input
          type="search"
          placeholder="Search pattern or meaning…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="patterns-search"
        />
        <div className="patterns-cat-filters">
          <button
            type="button"
            className={`cat-chip ${categoryFilter === 'all' ? 'is-active' : ''}`}
            onClick={() => setCategoryFilter('all')}
          >
            All ({all.length})
          </button>
          {PATTERN_CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`cat-chip ${categoryFilter === c.id ? 'is-active' : ''}`}
              onClick={() => setCategoryFilter(c.id)}
            >
              {c.title} ({c.patterns.length})
            </button>
          ))}
        </div>
        <span className="patterns-result-count">{visible.length} shown</span>
      </div>

      <table className="patterns-matrix">
        <thead>
          <tr>
            <SortHeader column="name" sortBy={sortBy} onClick={clickHeader}>Pattern</SortHeader>
            <SortHeader column="category" sortBy={sortBy} onClick={clickHeader}>Category</SortHeader>
            <SortHeader column="firstMet" sortBy={sortBy} onClick={clickHeader}>First met</SortHeader>
            <SortHeader column="alsoSeen" sortBy={sortBy} onClick={clickHeader}>Seen in</SortHeader>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          {visible.map((p) => (
            <PatternRow key={`${p.categoryId}:${p.name}`} pattern={p} onOpenVerse={onOpenVerse} />
          ))}
          {visible.length === 0 && (
            <tr><td colSpan="5" className="patterns-empty">No patterns match.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function SortHeader({ column, sortBy, onClick, children }) {
  const isActive = sortBy.column === column;
  const arrow = isActive ? (sortBy.direction === 'asc' ? '▲' : '▼') : '';
  return (
    <th
      className={`patterns-th ${isActive ? 'is-sorted' : ''}`}
      onClick={() => onClick(column)}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onClick(column); }}
    >
      <span>{children}</span>
      <span className="th-arrow">{arrow}</span>
    </th>
  );
}

function PatternRow({ pattern, onOpenVerse }) {
  const stats = patternStats(pattern);
  const exampleText = pattern.trigger?.example ?? '';

  return (
    <tr className="patterns-row">
      <td>
        <div className="pattern-cell-name">{pattern.name}</div>
        <div className="pattern-cell-meaning">{pattern.meaning}</div>
      </td>
      <td className="pattern-cell-category">{pattern.categoryTitle}</td>
      <td className="pattern-cell-first">
        {stats.firstMet && onOpenVerse ? (
          <button
            type="button"
            className="verse-link"
            onClick={() => {
              const [c, v] = stats.firstMet.split('.').map(Number);
              onOpenVerse(c, v);
            }}
          >
            Gītā {stats.firstMet} ↗
          </button>
        ) : (
          <span className="verse-link-static">{pattern.trigger?.label ?? '—'}</span>
        )}
      </td>
      <td className="pattern-cell-count">
        {stats.total === 0 ? '—' : (
          <span title={`Total: ${stats.total} verse${stats.total === 1 ? '' : 's'}`}>
            {stats.total}
          </span>
        )}
      </td>
      <td className="pattern-cell-example">{exampleText}</td>
    </tr>
  );
}
