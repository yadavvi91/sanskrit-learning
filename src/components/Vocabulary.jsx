import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VERSES } from '../data/verses.js';
import { buildVocabulary, VOCAB_COMPARATORS, vocabularyCategoryCounts } from '../utils/vocabulary.js';

const PAGE_SIZE = 50;

export default function Vocabulary() {
  const navigate = useNavigate();
  const vocab = useMemo(() => buildVocabulary(), []);
  const counts = useMemo(() => vocabularyCategoryCounts(vocab), [vocab]);

  const [sortBy, setSortBy] = useState({ column: 'firstMet', dir: 'asc' });
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [hideParticles, setHideParticles] = useState(true);
  const [onlyMissingGloss, setOnlyMissingGloss] = useState(false);
  const [pageLimit, setPageLimit] = useState(PAGE_SIZE);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    // Explicit category pick wins over the catch-all "Hide particles" toggle.
    // Without this, clicking the "particle (20)" chip while hideParticles
    // is true filters everything out.
    const explicitlyShowingParticles = categoryFilter === 'particle';
    let arr = vocab.filter((e) => {
      if (hideParticles && e.category === 'particle' && !explicitlyShowingParticles) return false;
      if (onlyMissingGloss && e.gloss) return false;
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
  }, [vocab, sortBy, categoryFilter, query, hideParticles, onlyMissingGloss]);

  // Reset pagination when filters change so the user always sees the top of
  // the new result set.
  useMemo(() => { setPageLimit(PAGE_SIZE); }, [categoryFilter, query, hideParticles, onlyMissingGloss, sortBy]); // eslint-disable-line react-hooks/exhaustive-deps

  const paged = visible.slice(0, pageLimit);
  const hasMore = visible.length > pageLimit;

  function clickHeader(column) {
    if (sortBy.column === column) {
      setSortBy({ column, dir: sortBy.dir === 'asc' ? 'desc' : 'asc' });
    } else {
      setSortBy({ column, dir: 'asc' });
    }
  }

  const missingCount = vocab.filter((e) => !e.gloss).length;
  const particleCount = (counts.particle ?? 0);

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
      </div>

      <div className="vocab-toolbar vocab-toolbar-secondary">
        <label className="vocab-toggle">
          <input
            type="checkbox"
            checked={hideParticles}
            onChange={(e) => setHideParticles(e.target.checked)}
          />
          Hide particles ({particleCount})
        </label>
        <label className="vocab-toggle">
          <input
            type="checkbox"
            checked={onlyMissingGloss}
            onChange={(e) => setOnlyMissingGloss(e.target.checked)}
          />
          Only words missing a gloss ({missingCount})
        </label>
        <span className="vocab-result-count">
          showing {Math.min(paged.length, visible.length)} of {visible.length}
        </span>
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
          {paged.map((e) => (
            <VocabRow key={e.word} entry={e} navigate={navigate} />
          ))}
          {visible.length === 0 && (
            <tr><td colSpan="5" className="patterns-empty">No words match.</td></tr>
          )}
        </tbody>
      </table>

      {hasMore && (
        <div className="vocab-pagination">
          <button
            type="button"
            className="vocab-show-more"
            onClick={() => setPageLimit((n) => n + PAGE_SIZE)}
          >
            Show {Math.min(PAGE_SIZE, visible.length - pageLimit)} more
            <span className="vocab-show-more-meta">
              ({visible.length - pageLimit} remaining)
            </span>
          </button>
          <button
            type="button"
            className="vocab-show-all"
            onClick={() => setPageLimit(visible.length)}
          >
            Show all {visible.length}
          </button>
        </div>
      )}
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
        {entry.fromSharedDict && (
          <span className="vocab-source-badge" title="Gloss from the shared Sanskrit dictionary, not from per-verse hand-decoding">dict</span>
        )}
      </td>
      <td className="pattern-cell-category">{entry.category ?? '—'}</td>
      <td>
        <div className="vocab-root">{entry.root ?? '—'}</div>
        {entry.gloss
          ? <div className="vocab-gloss">{entry.gloss}</div>
          : <div className="vocab-gloss vocab-gloss-missing">— no gloss yet —</div>}
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
