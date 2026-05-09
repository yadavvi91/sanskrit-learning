import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CHAPTERS } from '../data/chapters.js';
import { VERSES, getVerse, getVerseTier } from '../data/verses.js';
import { searchVerses } from '../utils/verseSearch.js';
import VerseDetail from './VerseDetail.jsx';

const orderedDecoded = [...VERSES].sort((a, b) => a.decodeIndex - b.decodeIndex);
const RECENT_COUNT = 5;

export default function VerseJourney() {
  const params = useParams();
  const navigate = useNavigate();
  const [showOnlyDecoded, setShowOnlyDecoded] = useState(false);
  const [showOnlyAuditNeeded, setShowOnlyAuditNeeded] = useState(false);
  const [jumpInput, setJumpInput] = useState('');
  const [searchInput, setSearchInput] = useState('');

  // Audit set: auto-stub verses where the engine produced no finite verb
  // AND the verse hasn't been hand-classified as nominal (noFiniteVerb).
  // These are the only verses that genuinely need hand-audit; nominal
  // sentences (descriptive lists, all-participles) are correctly empty
  // and shouldn't show up in the audit count.
  const auditNeeded = useMemo(
    () => VERSES.filter(
      (v) => v.tier === 'auto-stub'
        && (!v.finiteVerbs || v.finiteVerbs.length === 0)
        && !v.noFiniteVerb
    ),
    []
  );
  const auditKeys = useMemo(
    () => new Set(auditNeeded.map((v) => `${v.chapter}.${v.verse}`)),
    [auditNeeded]
  );

  const searchResults = useMemo(
    () => (searchInput.trim() ? searchVerses(searchInput) : []),
    [searchInput]
  );

  // Selection comes from the URL. Default = first decoded verse.
  const selected = useMemo(() => {
    if (params.chapter && params.verse) {
      return { chapter: Number(params.chapter), verse: Number(params.verse) };
    }
    const first = orderedDecoded[0];
    return first ? { chapter: first.chapter, verse: first.verse } : null;
  }, [params.chapter, params.verse]);

  const setSelected = ({ chapter, verse }) => navigate(`/journey/${chapter}/${verse}`);
  const openPrimer = (sectionId) => navigate(sectionId ? `/primer#${sectionId}` : '/primer');

  const selectedVerse = selected ? getVerse(selected.chapter, selected.verse) : null;

  const decodedKeys = useMemo(
    () => new Set(VERSES.map((v) => `${v.chapter}.${v.verse}`)),
    []
  );

  // Most-recent N decoded — sort by decodeIndex desc, take top N.
  const recent = useMemo(
    () => [...orderedDecoded].sort((a, b) => b.decodeIndex - a.decodeIndex).slice(0, RECENT_COUNT),
    []
  );

  return (
    <div className="journey">
      <aside className="journey-rail">
        <div className="decoded-summary">
          <span className="decoded-count">{VERSES.length}</span>
          <span className="decoded-label">decoded so far</span>
        </div>

        <div className="recent-chips">
          {recent.map((v) => {
            const active = selected?.chapter === v.chapter && selected?.verse === v.verse;
            return (
              <button
                key={`${v.chapter}.${v.verse}`}
                type="button"
                className={`recent-chip ${active ? 'is-active' : ''}`}
                onClick={() => setSelected({ chapter: v.chapter, verse: v.verse })}
                title={v.title}
              >
                {v.chapter}.{v.verse}
              </button>
            );
          })}
        </div>

        <form
          className="jump-form"
          onSubmit={(e) => {
            e.preventDefault();
            const m = jumpInput.trim().match(/^(\d{1,2})[.\s/-](\d{1,3})$/);
            if (!m) return;
            const c = Number(m[1]);
            const v = Number(m[2]);
            if (!decodedKeys.has(`${c}.${v}`)) return;
            setSelected({ chapter: c, verse: v });
            setJumpInput('');
          }}
        >
          <input
            type="text"
            className="jump-input"
            placeholder="Go to e.g. 4.7"
            value={jumpInput}
            onChange={(e) => setJumpInput(e.target.value)}
            aria-label="Jump to a verse"
          />
        </form>

        <input
          type="search"
          className="rail-search"
          placeholder="Search decoded corpus…"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          aria-label="Search across decoded verses"
        />

        {searchInput.trim() && (
          <SearchResults
            results={searchResults}
            onPick={(c, v) => { setSelected({ chapter: c, verse: v }); setSearchInput(''); }}
          />
        )}

        <button
          type="button"
          className={`decoded-only-toggle ${showOnlyDecoded ? 'is-active' : ''}`}
          onClick={() => setShowOnlyDecoded(!showOnlyDecoded)}
        >
          {showOnlyDecoded ? '◉ Showing decoded only — click to see all' : '○ Show only decoded'}
        </button>

        <div className="audit-summary" title="Auto-stub verses where the autoDecode engine returned no finite-verb candidate. These are the highest-priority verses to hand-decode in the Decode Helper.">
          <span className="audit-count">⚠ {auditNeeded.length}</span>
          <span className="audit-label">verses need क्रिया audit</span>
        </div>
        <button
          type="button"
          className={`audit-only-toggle ${showOnlyAuditNeeded ? 'is-active' : ''}`}
          onClick={() => setShowOnlyAuditNeeded(!showOnlyAuditNeeded)}
        >
          {showOnlyAuditNeeded ? '◉ Showing audit-needed — click to see all' : '○ Show only audit-needed'}
        </button>

        <div className="rail-divider" />

        <h2 className="rail-heading">All chapters</h2>
        <p className="rail-note">
          Decoded verses are <span className="legend-decoded">in saffron</span>.
          {!showOnlyDecoded && ' Greyed cells await decoding.'}
        </p>
        <div className="chapter-list">
          {CHAPTERS.map((ch) => (
            <ChapterRow
              key={ch.number}
              chapter={ch}
              decodedKeys={decodedKeys}
              auditKeys={auditKeys}
              selected={selected}
              onSelect={setSelected}
              showOnlyDecoded={showOnlyDecoded}
              showOnlyAuditNeeded={showOnlyAuditNeeded}
            />
          ))}
        </div>
      </aside>

      <section className="journey-detail">
        {selectedVerse ? (
          <VerseDetail verse={selectedVerse} onOpenPrimer={openPrimer} />
        ) : (
          <div className="empty-state">
            <p>Pick a verse from the journey to read its decode.</p>
          </div>
        )}
      </section>
    </div>
  );
}

function SearchResults({ results, onPick }) {
  if (results.length === 0) {
    return <p className="rail-search-empty">No matches in the decoded corpus.</p>;
  }
  const total = results.reduce((sum, r) => sum + r.hits.length, 0);
  return (
    <div className="rail-search-results">
      <div className="rail-search-meta">
        {results.length} verse{results.length === 1 ? '' : 's'} · {total} hit{total === 1 ? '' : 's'}
      </div>
      <ul>
        {results.map((r) => (
          <li key={`${r.chapter}.${r.verse}`}>
            <button
              type="button"
              className="rail-search-item"
              onClick={() => onPick(r.chapter, r.verse)}
              title={r.title || ''}
            >
              <span className="rail-search-ref">{r.chapter}.{r.verse}</span>
              <span className="rail-search-snippet">
                <span className="rail-search-field">{r.hits[0].label}</span>
                <span className="rail-search-text">{r.hits[0].snippet}</span>
                {r.hits.length > 1 && (
                  <span className="rail-search-more">+{r.hits.length - 1}</span>
                )}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ChapterRow({ chapter, decodedKeys, auditKeys, selected, onSelect, showOnlyDecoded, showOnlyAuditNeeded }) {
  const cells = Array.from({ length: chapter.verseCount }, (_, i) => i + 1);
  const decodedInChapter = cells.filter((v) => decodedKeys.has(`${chapter.number}.${v}`));
  const auditInChapter = cells.filter((v) => auditKeys?.has(`${chapter.number}.${v}`));

  // In "decoded only" mode, hide chapters with no decoded verses.
  if (showOnlyDecoded && decodedInChapter.length === 0) return null;
  // In "audit only" mode, hide chapters with no audit-needed verses.
  if (showOnlyAuditNeeded && auditInChapter.length === 0) return null;

  return (
    <details className="chapter-row" open={chapter.number <= 2 || (showOnlyDecoded && decodedInChapter.length > 0)}>
      <summary className="chapter-summary">
        <span className="chapter-num">अध्यायः {chapter.number}</span>
        <span className="chapter-name">{chapter.name}</span>
        <span className="chapter-count">
          {decodedInChapter.length > 0
            ? `${decodedInChapter.length}/${chapter.verseCount}`
            : `${chapter.verseCount}`}
          {decodedInChapter.length > 0 && (
            <span className="chapter-progress" title={`${decodedInChapter.length} of ${chapter.verseCount} verses decoded`}>
              <span
                className="chapter-progress-fill"
                style={{ width: `${Math.min(100, (decodedInChapter.length / chapter.verseCount) * 100)}%` }}
              />
            </span>
          )}
        </span>
      </summary>
      <div className="verse-grid">
        {cells.map((v) => {
          const key = `${chapter.number}.${v}`;
          const decoded = decodedKeys.has(key);
          if (showOnlyDecoded && !decoded) return null;
          if (showOnlyAuditNeeded && !auditKeys?.has(key)) return null;
          const needsAudit = auditKeys?.has(key);
          const active =
            selected && selected.chapter === chapter.number && selected.verse === v;
          const tier = decoded ? getVerseTier(chapter.number, v) : 'fallback';
          const titleByTier = {
            full:        `Gītā ${chapter.number}.${v} — fully decoded`,
            browse:      `Gītā ${chapter.number}.${v} — browse-tier`,
            'auto-stub': `Gītā ${chapter.number}.${v} — auto-stub draft (please audit)`,
            fallback:    `Gītā ${chapter.number}.${v} — not yet decoded`,
          };
          const title = needsAudit
            ? `${titleByTier[tier]} — ⚠ engine missed क्रिया, needs audit`
            : titleByTier[tier];
          return (
            <button
              key={key}
              type="button"
              disabled={!decoded}
              className={[
                'verse-cell',
                decoded ? 'is-decoded' : 'is-locked',
                `tier-${tier}`,
                needsAudit ? 'needs-audit' : '',
                active ? 'is-active' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() =>
                decoded && onSelect({ chapter: chapter.number, verse: v })
              }
              title={title}
            >
              {v}
            </button>
          );
        })}
      </div>
    </details>
  );
}
