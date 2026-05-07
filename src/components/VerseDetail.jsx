import { useEffect, useState } from 'react';
import Glossary from './Glossary.jsx';
import { holyBhagavadGitaUrl } from '../utils/sources.js';
import { getNote, setNote } from '../utils/notes.js';

export default function VerseDetail({ verse, onOpenPrimer }) {
  const finiteForms = new Set(verse.finiteVerbs?.map((v) => v.form) || []);

  return (
    <article className="verse-detail">
      <header className="verse-header">
        <div className="verse-tagline">
          <span className="verse-ref">Gītā {verse.chapter}.{verse.verse}</span>
          {verse.speaker && <span className="verse-speaker">{verse.speaker}</span>}
          <a
            className="verse-source-link"
            href={holyBhagavadGitaUrl(verse.chapter, verse.verse)}
            target="_blank"
            rel="noopener noreferrer"
            title={`Open Gītā ${verse.chapter}.${verse.verse} on holy-bhagavad-gita.org`}
          >
            holy-bhagavad-gita.org ↗
          </a>
        </div>
        {verse.title && <p className="verse-title">{verse.title}</p>}
      </header>

      <Section label="मूल" labelEn="The verse">
        <div className="mool">
          {verse.mool.map((line, i) => (
            <div key={i} className="mool-line">
              {line}
            </div>
          ))}
        </div>
      </Section>

      <Section label="पदच्छेद" labelEn="Word-split" glossaryTerm="पदच्छेद" onOpenPrimer={onOpenPrimer}>
        <ol className="padaccheda">
          {verse.padaccheda.map((word, i) => (
            <li
              key={`${word}-${i}`}
              className={`pada ${finiteForms.has(word) ? 'is-finite' : ''}`}
            >
              {word}
            </li>
          ))}
        </ol>
        {/* सन्धि and समास are both "un-doing" operations and live together under पदच्छेद. */}
        {verse.sandhiNotes && verse.sandhiNotes.length > 0 && (
          <details className="sandhi">
            <summary>सन्धि — {verse.sandhiNotes.length} note{verse.sandhiNotes.length === 1 ? '' : 's'}</summary>
            <ul>
              {verse.sandhiNotes.map((note, i) => (
                <li key={i}>{note}</li>
              ))}
            </ul>
          </details>
        )}
        {verse.samasNotes && verse.samasNotes.length > 0 && (
          <details className="samas">
            <summary>समास — {verse.samasNotes.length} compound{verse.samasNotes.length === 1 ? '' : 's'}</summary>
            <ul>
              {verse.samasNotes.map((s, i) => (
                <li key={i} className="samas-row">
                  <span className="samas-compound">{s.compound}</span>
                  <span className="samas-eq">=</span>
                  <span className="samas-vigraha">{s.vigraha}</span>
                  <span className="samas-type">{s.type}</span>
                  <span className="samas-gloss">{s.gloss}</span>
                </li>
              ))}
            </ul>
          </details>
        )}
      </Section>

      <Section
        label="क्रिया"
        labelEn={`Finite verb${(verse.finiteVerbs?.length || 0) > 1 ? 's' : ''} — sentence anchor${(verse.finiteVerbs?.length || 0) > 1 ? 's' : ''}`}
        glossaryTerm="क्रिया"
        onOpenPrimer={onOpenPrimer}
      >
        <ul className="finite-list">
          {(verse.finiteVerbs || []).map((fv, i) => (
            <li key={i} className="finite-card">
              <div className="finite-form">{fv.form}</div>
              <div className="finite-meta">
                <span className="meta-pair"><span>धातु</span> {fv.root}</span>
                <span className="meta-pair"><span>लकार</span> {fv.lakara}</span>
                <span className="meta-pair"><span>पुरुष</span> {fv.purusha}</span>
                <span className="meta-pair"><span>वचन</span> {fv.vachana}</span>
              </div>
              <div className="finite-gloss">{fv.gloss}</div>
            </li>
          ))}
        </ul>
        {verse.nonFinite && verse.nonFinite.length > 0 && (
          <div className="non-finite">
            <div className="non-finite-label">कृदन्त — non-finite forms</div>
            <ul>
              {verse.nonFinite.map((nf, i) => (
                <li key={i}>
                  <span className="nf-form">{nf.form}</span>
                  <span className="nf-kind">{nf.kind}</span>
                  {nf.root && <span className="nf-root">{nf.root}</span>}
                  <span className="nf-gloss">{nf.gloss}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      {verse.vibhaktiNotes && verse.vibhaktiNotes.length > 0 && (
        <Section label="विभक्ति" labelEn="Case roles" glossaryTerm="विभक्ति" onOpenPrimer={onOpenPrimer}>
          <ul className="vibhakti-notes">
            {verse.vibhaktiNotes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </Section>
      )}

      {verse.keyFights && verse.keyFights.length > 0 && (
        <Section label="विवेकः" labelEn="Key fights won here">
          <ul className="fights">
            {verse.keyFights.map((fight, i) => (
              <li key={i}>{fight}</li>
            ))}
          </ul>
        </Section>
      )}

      <Section label="अन्वय" labelEn="Logical SOV ordering" glossaryTerm="अन्वय" onOpenPrimer={onOpenPrimer}>
        <p className="anvaya">{verse.anvaya}</p>
      </Section>

      <Section label="हिंदी" labelEn="Hindi">
        <p className="translation hindi">{verse.hindi}</p>
      </Section>

      <Section label="English" labelEn="">
        <p className="translation english">{verse.english}</p>
      </Section>

      {verse.references && (
        <Section label="टिप्पणी" labelEn="References — translations & commentaries">
          <References references={verse.references} />
        </Section>
      )}

      <Section label="स्वमतम्" labelEn="My notes — free-form, persisted on this device">
        <NotesPanel chapter={verse.chapter} verse={verse.verse} />
      </Section>
    </article>
  );
}

function NotesPanel({ chapter, verse }) {
  const [text, setText] = useState(() => getNote(chapter, verse));
  const [savedAt, setSavedAt] = useState(null);

  // Re-load when the verse changes (parent stays mounted across verses).
  useEffect(() => {
    setText(getNote(chapter, verse));
    setSavedAt(null);
  }, [chapter, verse]);

  // Debounced save: 700ms after the last keystroke.
  useEffect(() => {
    const timer = setTimeout(() => {
      setNote(chapter, verse, text);
      if (text) setSavedAt(new Date());
    }, 700);
    return () => clearTimeout(timer);
  }, [text, chapter, verse]);

  return (
    <div className="notes-panel">
      <textarea
        className="notes-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What stuck with you in this verse? What to come back to? Anything that doesn't fit the structured fields above…"
        rows={5}
        spellCheck="true"
      />
      <div className="notes-meta">
        {text.length > 0 && <span>{text.length} chars</span>}
        {savedAt && (
          <span className="notes-saved">
            saved {savedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>
    </div>
  );
}

function References({ references }) {
  const { translations = [], commentaries = [] } = references;
  return (
    <div className="references">
      {translations.length > 0 && (
        <div className="ref-group">
          <div className="ref-group-label">Translations</div>
          {translations.map((t, i) => (
            <details key={i} className="ref-card ref-translation">
              <summary>
                <span className="ref-translator">{t.translator}</span>
                <span className="ref-year">{t.year}</span>
                {t.license === 'public-domain' && <span className="ref-license">PD</span>}
              </summary>
              <blockquote>"{t.text}"</blockquote>
              {t.work && <cite className="ref-work">— {t.work}</cite>}
            </details>
          ))}
        </div>
      )}

      {commentaries.length > 0 && (
        <div className="ref-group">
          <div className="ref-group-label">Commentary positions</div>
          {commentaries.map((c, i) => (
            <details key={i} className="ref-card ref-commentary">
              <summary>
                <span className="ref-sage">{c.sage}</span>
                {c.school && <span className="ref-school">{c.school}</span>}
              </summary>
              <p>{c.summary}</p>
              <p className="ref-disclaimer">
                Summary based on the well-known {c.sage}-tradition reading; not a direct quotation.
              </p>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}

function Section({ label, labelEn, glossaryTerm, onOpenPrimer, children }) {
  const labelNode = glossaryTerm
    ? <Glossary term={glossaryTerm} onOpenPrimer={onOpenPrimer}><span className="section-label-sa">{label}</span></Glossary>
    : <span className="section-label-sa">{label}</span>;

  return (
    <section className="verse-section">
      <h3 className="section-label">
        {labelNode}
        {labelEn && <span className="section-label-en">{labelEn}</span>}
      </h3>
      <div className="section-body">{children}</div>
    </section>
  );
}
