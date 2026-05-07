import { useMemo, useState } from 'react';
import { SAMASA_TYPES, buildSamasaBank, lookupSamasaType } from '../data/samasa.js';

export default function Samasa() {
  const [view, setView] = useState('bank'); // 'bank' | 'identifier'

  return (
    <article className="atlas-page">
      <h3 className="atlas-page-title">समास — compound analysis</h3>
      <p className="atlas-lede">
        The same compound can mean wildly different things depending on type:{' '}
        <strong>पीताम्बरः</strong> as <em>तत्पुरुष</em> = "yellow garment";
        as <em>बहुव्रीहि</em> = "[the one] wearing yellow garments" = Krishna.
        विग्रह — un-compounding — is the analytical step that decides which.
      </p>

      <nav className="samasa-views">
        <button type="button" className={`samasa-view ${view === 'bank' ? 'is-active' : ''}`} onClick={() => setView('bank')}>
          Compound bank
        </button>
        <button type="button" className={`samasa-view ${view === 'identifier' ? 'is-active' : ''}`} onClick={() => setView('identifier')}>
          Type identifier (drill)
        </button>
        <button type="button" className={`samasa-view ${view === 'types' ? 'is-active' : ''}`} onClick={() => setView('types')}>
          Type reference
        </button>
      </nav>

      {view === 'bank'       && <CompoundBank />}
      {view === 'identifier' && <TypeIdentifier />}
      {view === 'types'      && <TypeReference />}
    </article>
  );
}

function CompoundBank() {
  const bank = useMemo(() => buildSamasaBank(), []);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? bank : bank.filter((b) => {
    const t = lookupSamasaType(b.type);
    return t && t.family === filter;
  });

  const families = ['all', ...new Set(SAMASA_TYPES.map((t) => t.family))];

  return (
    <>
      <div className="samasa-filters">
        {families.map((f) => (
          <button
            key={f}
            type="button"
            className={`samasa-filter ${filter === f ? 'is-active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All' : f}
          </button>
        ))}
      </div>

      <p className="samasa-bank-meta">
        {filtered.length} compound{filtered.length === 1 ? '' : 's'} from {new Set(filtered.map((b) => `${b.verseRef.chapter}.${b.verseRef.verse}`)).size}{' '}
        decoded verse(s). Auto-grown from <code>verses.js → samasNotes[]</code>.
      </p>

      <ul className="samasa-bank">
        {filtered.map((b, i) => (
          <li key={i} className="samasa-bank-row">
            <span className="bank-compound">{b.compound}</span>
            <span className="bank-eq">=</span>
            <span className="bank-vigraha">{b.vigraha}</span>
            <span className="bank-type">{b.type}</span>
            <span className="bank-gloss">{b.gloss}</span>
            <span className="bank-ref">Gītā {b.verseRef.chapter}.{b.verseRef.verse}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

function TypeIdentifier() {
  const bank = useMemo(() => buildSamasaBank(), []);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  if (bank.length === 0) {
    return <p>No samas data in the corpus yet.</p>;
  }
  const current = bank[idx % bank.length];

  function handlePick(typeDeva) {
    if (picked) return; // already answered
    const isCorrect = typeDeva === current.type;
    setPicked({ typeDeva, isCorrect });
    setScore((s) => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }));
  }

  function next() {
    setPicked(null);
    setIdx((i) => i + 1);
  }

  return (
    <div className="samasa-drill">
      <div className="drill-prompt">
        <div className="drill-row">
          <span className="drill-compound">{current.compound}</span>
          <span className="drill-eq">=</span>
          <span className="drill-vigraha">{current.vigraha}</span>
        </div>
        <p className="drill-question">Which type?</p>
      </div>

      <div className="drill-options">
        {SAMASA_TYPES.map((t) => {
          let cls = 'drill-option';
          if (picked) {
            if (t.deva === current.type) cls += ' is-correct';
            else if (picked.typeDeva === t.deva) cls += ' is-wrong';
          }
          return (
            <button key={t.id} type="button" className={cls} onClick={() => handlePick(t.deva)} disabled={!!picked}>
              <span className="opt-deva">{t.deva}</span>
              <span className="opt-en">{t.en}</span>
            </button>
          );
        })}
      </div>

      {picked && (
        <div className={`drill-feedback ${picked.isCorrect ? 'is-correct' : 'is-wrong'}`}>
          {picked.isCorrect
            ? <>✓ Right. <strong>{current.compound}</strong> is <em>{current.type}</em> — {current.gloss}.</>
            : <>✗ It's <em>{current.type}</em> — {current.gloss}.</>}
          <button type="button" className="drill-next" onClick={next}>Next</button>
        </div>
      )}

      <div className="drill-score">
        Score: {score.correct} / {score.total}{' '}
        {score.total > 0 && <span className="drill-pct">({Math.round(100 * score.correct / score.total)}%)</span>}
      </div>
    </div>
  );
}

function TypeReference() {
  return (
    <div className="samasa-types">
      {SAMASA_TYPES.map((t) => (
        <section key={t.id} className="samasa-type-card">
          <header>
            <h4 className="type-deva">{t.deva}</h4>
            <span className="type-family">{t.family}</span>
          </header>
          <p className="type-en">{t.en}</p>
          <p className="type-rule">{t.rule}</p>
          {t.pattern && <p className="type-pattern"><strong>Pattern:</strong> {t.pattern}</p>}
          <ul className="type-examples">
            {t.examples.map((ex, i) => <li key={i}>{ex}</li>)}
          </ul>
        </section>
      ))}
    </div>
  );
}
