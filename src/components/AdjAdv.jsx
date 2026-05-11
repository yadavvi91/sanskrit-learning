import { COMPARISON_SUFFIXES, IRREGULAR_COMPARISONS, ADVERB_PATTERNS } from '../data/adjAdv.js';

export default function AdjAdv() {
  return (
    <article className="atlas-page">
      <h3 className="atlas-page-title">विशेषण + क्रियाविशेषण — adjectives & adverbs</h3>
      <p className="atlas-lede">
        Both ride on systems already in place. Adjectives use the noun declension and{' '}
        agree with the noun in <strong>विभक्ति + वचन + लिंग</strong>. Most adverbs are{' '}
        <strong>frozen case forms</strong> of adjectives.
      </p>

      <h4 className="atlas-sub-title">Comparison: -तर / -तम</h4>
      <div className="comparison-grid">
        {COMPARISON_SUFFIXES.map((s) => (
          <section key={s.suffix} className="comparison-card">
            <header>
              <h5>{s.suffix}</h5>
              <span className="comparison-name">{s.name}</span>
            </header>
            <p className="comparison-note">{s.note}</p>
            <ul>
              {s.examples.map((ex, i) => (
                <li key={i}>
                  <span className="ex-base">{ex.base}</span>
                  <span className="ex-arrow">→</span>
                  <span className="ex-derived">{ex.derived}</span>
                  <span className="ex-en">{ex.en}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <h4 className="atlas-sub-title">Irregular comparisons</h4>
      <table className="irreg-comparison-table">
        <thead>
          <tr><th>Positive</th><th>Comparative</th><th>Superlative</th></tr>
        </thead>
        <tbody>
          {IRREGULAR_COMPARISONS.map((row, i) => (
            <tr key={i}>
              <td>{row.positive}</td>
              <td>{row.comparative}</td>
              <td>{row.superlative}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 className="atlas-sub-title">Adverbs — mostly frozen case forms</h4>
      {ADVERB_PATTERNS.map((p, i) => (
        <section key={i} className="adverb-pattern">
          <h5>{p.title}</h5>
          <p className="adverb-note">{p.note}</p>
          <ul>
            {p.examples.map((ex, j) => (
              <li key={j}>
                <span className="ex-base">{ex.source}</span>
                <span className="ex-arrow">→</span>
                <span className="ex-derived">{ex.adverb}</span>
                <span className="ex-en">{ex.en}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <p className="atlas-callout">
        <strong>Pronominal adjectives</strong> (सर्व, अन्य, एक) follow the सर्वनाम pattern with स्म-cells —
        not the राम pattern. See the <em>Pronouns</em> section.
      </p>
    </article>
  );
}
