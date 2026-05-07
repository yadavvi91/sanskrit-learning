import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VERSES } from '../data/verses.js';
import { buildVocabulary, VOCAB_COMPARATORS, vocabularyCategoryCounts } from '../utils/vocabulary.js';

export default function Vocabulary() {
  const navigate = useNavigate();
  const vocab = useMemo(() => buildVocabulary(), []);
  const counts = useMemo(() => vocabularyCategoryCounts(vocab), [vocab]);

  const [sortBy, setSortBy] = useState({ column: 'firstMet', dir: 'asc' });
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [query, setQuery] = useState('');

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = vocab.filter((e) => {
      if (categoryFilter !== 'all' && (e.category ?? 'unknown') !== categoryFilter) return false;
      if (q) {
        const hay = `${e.word} ${e.root ?? ''} ${e.gloss ?? ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    const cmp = VOCAB_COMPARATORS[sortBy.column] ?? VOCAB_COMPARATORS.firstMet;
    arr.sort(cmp);
    if (sortBy.dir === 'desc') arr.reverse();
    return arr;
  }, [vocab, sortBy, categoryFilter, query]);

  function clickHeader(column) {
    if (sortBy.column === column) {
      setSortBy({ column, dir: sortBy.dir === 'asc' ? 'desc' : 'asc' });
    } else {
      setSortBy({ column, dir: 'asc' });
    }
  }

  return (
    <div className="vocabulary">
      <header className="vocab-header">
        <div>
          <h2 className="vocab-title">शब्दकोषः</h2>
          <p className="vocab-sub">
            {vocab.length} unique words you've met across {VERSES_DECODED_COUNT()} decoded verses.
            Click a verse-ref to jump there. Auto-grown from <code>verses.js → padaccheda[]</code>.
          </p>
        </div>
      </header>

      <div className="vocab-toolbar">
        <input
          type="search"
          placeholder="Search by word, root, or meaning…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="vocab-search"
        />
        <div className="vocab-cat-filters">
          <button
            type="button"
            className={`cat-chip ${categoryFilter === 'all' ? 'is-active' : ''}`}
            onClick={() => setCategoryFilter('all')}
          >
            All ({vocab.length})
          </button>
          {Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([cat, n]) => (
            <button
              key={cat}
              type="button"
              className={`cat-chip ${categoryFilter === cat ? 'is-active' : ''}`}
              onClick={() => setCategoryFilter(cat)}
            >
              {cat} ({n})
            </button>
          ))}
        </div>
        <span className="vocab-result-count">{visible.length} shown</span>
      </div>

      <table className="vocab-matrix">
        <thead>
          <tr>
            <SortHeader column="word" sortBy={sortBy} onClick={clickHeader}>Word</SortHeader>
            <SortHeader column="category" sortBy={sortBy} onClick={clickHeader}>Category</SortHeader>
            <th>Root / gloss</th>
            <SortHeader column="firstMet" sortBy={sortBy} onClick={clickHeader}>First met</SortHeader>
            <SortHeader column="count" sortBy={sortBy} onClick={clickHeader}>Seen in</SortHeader>
          </tr>
        </thead>
        <tbody>
          {visible.map((e) => (
            <VocabRow key={e.word} entry={e} navigate={navigate} />
          ))}
          {visible.length === 0 && (
            <tr><td colSpan="5" className="patterns-empty">No words match.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function SortHeader({ column, sortBy, onClick, children }) {
  const isActive = sortBy.column === column;
  const arrow = isActive ? (sortBy.dir === 'asc' ? '▲' : '▼') : '';
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

function VocabRow({ entry, navigate }) {
  return (
    <tr className="patterns-row vocab-row">
      <td>
        <div className="vocab-word">{entry.word}</div>
      </td>
      <td className="pattern-cell-category">{entry.category ?? '—'}</td>
      <td>
        <div className="vocab-root">{entry.root ?? '—'}</div>
        {entry.gloss && <div className="vocab-gloss">{entry.gloss}</div>}
      </td>
      <td className="pattern-cell-first">
        <button
          type="button"
          className="verse-link"
          onClick={() => navigate(`/journey/${entry.firstMet.chapter}/${entry.firstMet.verse}`)}
        >
          Gītā {entry.firstMet.chapter}.{entry.firstMet.verse} ↗
        </button>
      </td>
      <td className="pattern-cell-count vocab-count">
        {entry.count}
        {entry.occurrences.length > 1 && (
          <span className="vocab-occurrences">
            {' ('}
            {entry.occurrences.map((o, i) => (
              <span key={i}>
                {i > 0 && ', '}
                <button
                  type="button"
                  className="verse-link"
                  onClick={() => navigate(`/journey/${o.chapter}/${o.verse}`)}
                >
                  {o.chapter}.{o.verse}
                </button>
              </span>
            ))}
            {')'}
          </span>
        )}
      </td>
    </tr>
  );
}

function VERSES_DECODED_COUNT() { return VERSES.length; }
