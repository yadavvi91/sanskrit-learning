import { useMemo } from 'react';
import { POSTPOSITIONS, PARTICLE_GROUPS, NEGATIVE_SPACE, tallyParticles } from '../data/avyaya.js';
import { VERSES } from '../data/verses.js';

export default function Avyaya() {
  const tally = useMemo(() => tallyParticles(VERSES), []);

  return (
    <article className="atlas-page">
      <h3 className="atlas-page-title">अव्यय — indeclinables</h3>
      <p className="atlas-lede">
        Pāṇini's three-bin taxonomy: every Sanskrit word is either{' '}
        <strong>सुबन्त</strong> (declinable — nouns, pronouns, adjectives),{' '}
        <strong>तिङन्त</strong> (conjugable — finite verbs), or{' '}
        <strong>अव्यय</strong> (indeclinable — particles, postpositions, most adverbs, conjunctions).
        English's eight word classes mostly collapse into these three.
      </p>

      {/* Auto-grown particle frequency from the decoded corpus */}
      {tally.length > 0 && (
        <section className="avyaya-tally">
          <h4 className="atlas-sub-title">Particles seen in your decoded corpus</h4>
          <p className="atlas-aside">
            Auto-counted from {VERSES.length} decoded verses. As more verses are decoded, this list grows.
          </p>
          <ul className="tally-list">
            {tally.map((t) => (
              <li key={t.word} className="tally-row">
                <span className="tally-word">{t.word}</span>
                <span className="tally-count">×{t.count}</span>
                <span className="tally-verses">in {t.verses.map((r) => `Gītā ${r}`).join(', ')}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Negative space — the page that makes the taxonomy click */}
      <section className="avyaya-negative">
        <h4 className="atlas-sub-title">What Sanskrit doesn't have</h4>
        {NEGATIVE_SPACE.map((n, i) => (
          <div key={i} className="negative-card">
            <h5>{n.title}</h5>
            <p>{n.body}</p>
          </div>
        ))}
      </section>

      {/* Postpositions */}
      <section>
        <h4 className="atlas-sub-title">Postpositions</h4>
        <p className="atlas-aside">
          ~15-20 indeclinables that follow a noun and govern a specific case. Look prepositional, behave like Hindi <em>के साथ</em>.
        </p>
        <table className="postposition-table">
          <thead><tr><th>Word</th><th>Sense</th><th>Governs</th></tr></thead>
          <tbody>
            {POSTPOSITIONS.map((p, i) => (
              <tr key={i}>
                <td className="post-word">{p.word}</td>
                <td>{p.sense}</td>
                <td className="post-case">{p.govern}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Particle groups */}
      <section>
        <h4 className="atlas-sub-title">Particles</h4>
        <div className="particle-groups">
          {PARTICLE_GROUPS.map((g, i) => (
            <div key={i} className="particle-group">
              <h5 className="particle-group-title">{g.title}</h5>
              <p className="particle-group-desc">{g.description}</p>
              <ul className="particle-list">
                {g.items.map((item, j) => (
                  <li key={j}>
                    <span className="particle-word">{item.word}</span>
                    <span className="particle-sense">{item.sense}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
