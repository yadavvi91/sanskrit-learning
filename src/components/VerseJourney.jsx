import { useMemo, useState } from 'react';
import { CHAPTERS } from '../data/chapters.js';
import { VERSES, getVerse, isDecoded } from '../data/verses.js';
import VerseDetail from './VerseDetail.jsx';

const orderedDecoded = [...VERSES].sort((a, b) => a.decodeIndex - b.decodeIndex);

export default function VerseJourney() {
  const [selected, setSelected] = useState(() => {
    const first = orderedDecoded[0];
    return first ? { chapter: first.chapter, verse: first.verse } : null;
  });

  const selectedVerse = selected ? getVerse(selected.chapter, selected.verse) : null;

  const decodedKeys = useMemo(
    () => new Set(VERSES.map((v) => `${v.chapter}.${v.verse}`)),
    []
  );

  return (
    <div className="journey">
      <aside className="journey-rail">
        <h2 className="rail-heading">Decoded so far</h2>
        <ol className="decode-order">
          {orderedDecoded.map((v) => {
            const key = `${v.chapter}.${v.verse}`;
            const active =
              selected && selected.chapter === v.chapter && selected.verse === v.verse;
            return (
              <li key={key}>
                <button
                  type="button"
                  className={`decode-order-item ${active ? 'is-active' : ''}`}
                  onClick={() => setSelected({ chapter: v.chapter, verse: v.verse })}
                >
                  <span className="decode-order-num">{v.decodeIndex}</span>
                  <span className="decode-order-ref">
                    Gītā {v.chapter}.{v.verse}
                  </span>
                  <span className="decode-order-title">{v.title}</span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="rail-divider" />

        <h2 className="rail-heading">All chapters</h2>
        <p className="rail-note">
          Decoded verses are <span className="legend-decoded">in saffron</span>.
          Greyed cells await decoding.
        </p>
        <div className="chapter-list">
          {CHAPTERS.map((ch) => (
            <ChapterRow
              key={ch.number}
              chapter={ch}
              decodedKeys={decodedKeys}
              selected={selected}
              onSelect={setSelected}
            />
          ))}
        </div>
      </aside>

      <section className="journey-detail">
        {selectedVerse ? (
          <VerseDetail verse={selectedVerse} />
        ) : (
          <div className="empty-state">
            <p>Pick a verse from the journey to read its decode.</p>
          </div>
        )}
      </section>
    </div>
  );
}

function ChapterRow({ chapter, decodedKeys, selected, onSelect }) {
  const cells = Array.from({ length: chapter.verseCount }, (_, i) => i + 1);
  return (
    <details className="chapter-row" open={chapter.number <= 2}>
      <summary className="chapter-summary">
        <span className="chapter-num">अध्यायः {chapter.number}</span>
        <span className="chapter-name">{chapter.name}</span>
        <span className="chapter-count">{chapter.verseCount} verses</span>
      </summary>
      <div className="verse-grid">
        {cells.map((v) => {
          const key = `${chapter.number}.${v}`;
          const decoded = decodedKeys.has(key);
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
