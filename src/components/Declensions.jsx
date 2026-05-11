import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { DECLENSIONS, VIBHAKTI_ORDER, VACHANA_ORDER } from '../data/declensions.js';

// शब्दरूपावलिः — full noun-declension reference. The Atlas tab that
// fills the gap left by the Primer's "vibhakti in 1 minute" summary:
// here every paradigm gets its full 8 × 3 = 24 form table, with
// corpus examples that actually appear in the decoded verses.
//
// Deep-linkable: /atlas/declensions#deva preselects the देव paradigm.
// Used by WordPopover's "→ X-class" link to land on the relevant
// paradigm directly from any verse-detail popover.

const DEFAULT_PARADIGM = 'deva';

function paradigmFromHash(hash) {
  const id = (hash || '').replace(/^#/, '');
  return DECLENSIONS.some((d) => d.id === id) ? id : null;
}

export default function Declensions({ onOpenVerse }) {
  const location = useLocation();
  const cardRef = useRef(null);

  // Initial state honors the URL hash so deep-links land on the right
  // paradigm without a flicker.
  const [activeId, setActiveId] = useState(
    () => paradigmFromHash(location.hash) || DEFAULT_PARADIGM
  );

  // Re-sync when the hash changes mid-session (e.g. user clicks another
  // popover link without leaving the Declensions tab).
  useEffect(() => {
    const fromHash = paradigmFromHash(location.hash);
    if (fromHash && fromHash !== activeId) {
      setActiveId(fromHash);
      // Scroll the active card into view so the user lands on the
      // table, not the chip row.
      requestAnimationFrame(() => {
        cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, [location.hash]);

  const active = DECLENSIONS.find((d) => d.id === activeId) ?? DECLENSIONS[0];

  return (
    <article className="atlas-page declensions">
      <h3 className="atlas-page-title">शब्दरूपावलिः — noun declensions</h3>
      <p className="atlas-lede">
        The 8 paradigms below classify every common noun in the corpus. Pick a stem-class to see the
        full 24-form table (8 cases × 3 numbers) and the actual Gītā words that follow it.
      </p>
      <p className="atlas-aside">
        Why multiple paradigms? Because <strong>राम is not सीता is not फल is not कर्मन्</strong>. Each ending pattern declines differently —
        and recognizing which paradigm a word follows is the whole game once you know its case + number from the popover.
      </p>

      <nav className="declension-chips" aria-label="Choose a paradigm">
        {DECLENSIONS.map((d) => (
          <button
            key={d.id}
            type="button"
            className={`declension-chip ${activeId === d.id ? 'is-active' : ''}`}
            onClick={() => setActiveId(d.id)}
          >
            <span className="declension-chip-name">{d.name}</span>
            <span className="declension-chip-meta">
              {d.gender === 'm' ? 'पुं.' : d.gender === 'f' ? 'स्त्री.' : 'नपुं.'} · {d.ending}
            </span>
          </button>
        ))}
      </nav>

      <div ref={cardRef}>
        <ParadigmCard paradigm={active} onOpenVerse={onOpenVerse} />
      </div>
    </article>
  );
}

function ParadigmCard({ paradigm, onOpenVerse }) {
  return (
    <section className="declension-card">
      <header className="declension-header">
        <div>
          <h4 className="declension-name">{paradigm.name}</h4>
          <span className="declension-sub">
            {paradigm.gender === 'm' ? 'पुल्लिङ्ग' : paradigm.gender === 'f' ? 'स्त्रीलिङ्ग' : 'नपुंसकलिङ्ग'}
            {' '}stem {paradigm.ending} — <em>{paradigm.sample}</em>
          </span>
        </div>
      </header>

      <p className="declension-description">{paradigm.description}</p>

      <div className="declension-table-wrap">
        <table className="declension-table">
          <thead>
            <tr>
              <th className="vibhakti-col-head">विभक्ति</th>
              {VACHANA_ORDER.map((v) => (
                <th key={v.id}>
                  <span className="vachana-deva">{v.deva}</span>
                  <span className="vachana-en">{v.en}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {VIBHAKTI_ORDER.map((vib) => (
              <tr key={vib.id} className={vib.id === 'sam' ? 'is-sam-row' : ''}>
                <th scope="row" className="vibhakti-cell">
                  <span className="vibhakti-deva">{vib.deva}</span>
                  <span className="vibhakti-en">{vib.en}</span>
                  <span className="vibhakti-sense">{vib.sense}</span>
                </th>
                {VACHANA_ORDER.map((v) => (
                  <td key={v.id} className="form-cell">
                    {paradigm.forms[vib.id]?.[v.id] ?? '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {paradigm.pedagogyNote && (
        <p className="declension-pedagogy">{paradigm.pedagogyNote}</p>
      )}

      {paradigm.corpusExamples?.length > 0 && (
        <section className="declension-examples">
          <h5>From the decoded corpus</h5>
          <ul className="declension-example-list">
            {paradigm.corpusExamples.map((ex, i) => (
              <li key={i} className="declension-example">
                <span className="example-word">{ex.word}</span>
                <span className="example-parsing">{ex.parsing}</span>
                <span className="example-gloss">{ex.gloss}</span>
                {ex.verseRef ? (
                  onOpenVerse ? (
                    <button
                      type="button"
                      className="example-ref example-ref-link"
                      onClick={() => onOpenVerse(ex.verseRef.chapter, ex.verseRef.verse)}
                      title="Open this verse in Verse Journey"
                    >
                      Gītā {ex.verseRef.chapter}.{ex.verseRef.verse} ↗
                    </button>
                  ) : (
                    <span className="example-ref">Gītā {ex.verseRef.chapter}.{ex.verseRef.verse}</span>
                  )
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      )}
    </section>
  );
}
