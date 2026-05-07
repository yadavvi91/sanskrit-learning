import { PATTERN_CATEGORIES } from '../data/patterns.js';

export default function PatternsWon({ onOpenPrimer, onOpenVerse }) {
  const total = PATTERN_CATEGORIES.reduce((n, c) => n + c.patterns.length, 0);

  return (
    <div className="patterns">
      <header className="patterns-header">
        <h2 className="patterns-title">Patterns Won</h2>
        <p className="patterns-sub">
          {total} grammar patterns internalized so far — each tied to the verse that made it click.
        </p>
      </header>

      <div className="patterns-grid">
        {PATTERN_CATEGORIES.map((cat) => (
          <section key={cat.id} className="pattern-category">
            <header className="category-header">
              <h3 className="category-title">{cat.title}</h3>
              <span className="category-count">{cat.patterns.length}</span>
            </header>
            <ul className="pattern-list">
              {cat.patterns.map((p) => (
                <li key={p.name} className="pattern-card">
                  <div className="pattern-name">{p.name}</div>
                  <div className="pattern-meaning">{p.meaning}</div>
                  <div className="pattern-trigger">
                    <span className="trigger-label">unlocked by</span>
                    {p.trigger.verse && onOpenVerse ? (
                      <button
                        type="button"
                        className="trigger-ref trigger-ref-link"
                        onClick={() => {
                          const [c, v] = p.trigger.verse.split('.').map(Number);
                          onOpenVerse(c, v);
                        }}
                      >
                        Gītā {p.trigger.verse} ↗
                      </button>
                    ) : (
                      <span className="trigger-ref">
                        {p.trigger.verse ? `Gītā ${p.trigger.verse}` : p.trigger.label}
                      </span>
                    )}
                    {p.trigger.example && (
                      <span className="trigger-example">{p.trigger.example}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
