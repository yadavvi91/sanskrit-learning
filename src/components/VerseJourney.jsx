import { useEffect, useMemo, useState } from 'react';
import { CHAPTERS } from '../data/chapters.js';
import { VERSES, getVerse, isDecoded } from '../data/verses.js';
import VerseDetail from './VerseDetail.jsx';

const orderedDecoded = [...VERSES].sort((a, b) => a.decodeIndex - b.decodeIndex);
const RECENT_COUNT = 5;

export default function VerseJourney({ onOpenPrimer, jumpTo }) {
  const [selected, setSelected] = useState(() => {
    const first = orderedDecoded[0];
    return first ? { chapter: first.chapter, verse: first.verse } : null;
  });
  const [showOnlyDecoded, setShowOnlyDecoded] = useState(false);

  // Cross-tab navigation: when another tab requests a specific verse, jump to it.
  useEffect(() => {
    if (jumpTo && (jumpTo.chapter !== selected?.chapter || jumpTo.verse !== selected?.verse)) {
      setSelected({ chapter: jumpTo.chapter, verse: jumpTo.verse });
    }
    // selected intentionally not in deps — we only respond to jumpTo changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jumpTo]);

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

        <button
          type="button"
          className={`decoded-only-toggle ${showOnlyDecoded ? 'is-active' : ''}`}
          onClick={() => setShowOnlyDecoded(!showOnlyDecoded)}
        >
          {showOnlyDecoded ? '◉ Showing decoded only — click to see all' : '○ Show only decoded'}
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
              selected={selected}
              onSelect={setSelected}
              showOnlyDecoded={showOnlyDecoded}
            />
          ))}
        </div>
      </aside>

      <section className="journey-detail">
        {selectedVerse ? (
          <VerseDetail verse={selectedVerse} onOpenPrimer={onOpenPrimer} />
        ) : (
          <div className="empty-state">
            <p>Pick a verse from the journey to read its decode.</p>
          </div>
        )}
      </section>
    </div>
  );
}

function ChapterRow({ chapter, decodedKeys, selected, onSelect, showOnlyDecoded }) {
  const cells = Array.from({ length: chapter.verseCount }, (_, i) => i + 1);
  const decodedInChapter = cells.filter((v) => decodedKeys.has(`${chapter.number}.${v}`));

  // In "decoded only" mode, hide chapters with no decoded verses.
  if (showOnlyDecoded && decodedInChapter.length === 0) return null;

  return (
    <details className="chapter-row" open={chapter.number <= 2 || (showOnlyDecoded && decodedInChapter.length > 0)}>
      <summary className="chapter-summary">
        <span className="chapter-num">अध्यायः {chapter.number}</span>
        <span className="chapter-name">{chapter.name}</span>
        <span className="chapter-count">
          {showOnlyDecoded
            ? `${decodedInChapter.length} decoded`
            : `${chapter.verseCount} verses`}
        </span>
      </summary>
      <div className="verse-grid">
        {cells.map((v) => {
          const key = `${chapter.number}.${v}`;
          const decoded = decodedKeys.has(key);
          if (showOnlyDecoded && !decoded) return null;
          const active =
            selected && selected.chapter === chapter.number && selected.verse === v;
          return (
            <button
              key={key}
              type="button"
              disabled={!decoded}
              className={[
                'verse-cell',
                decoded ? 'is-decoded' : 'is-locked',
                active ? 'is-active' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() =>
                decoded && onSelect({ chapter: chapter.number, verse: v })
              }
              title={
                decoded
                  ? `Gītā ${chapter.number}.${v} — decoded`
                  : `Gītā ${chapter.number}.${v} — not yet decoded`
              }
            >
              {v}
            </button>
          );
        })}
      </div>
    </details>
  );
}
