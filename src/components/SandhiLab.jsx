import { useMemo, useState } from 'react';
import { undoSandhi, SANDHI_RULES, describeRule } from '../utils/sandhi.js';

const PRESETS = [
  { label: 'पाण्डवाश्चैव',     why: '1.1 — visarga + च + अ + ए' },
  { label: 'नैतत्',           why: '2.3 — अ + ए → ऐ' },
  { label: 'त्यक्त्वोत्तिष्ठ', why: '2.3 — आ + उ → ओ (absolutive)' },
  { label: 'त्वय्युपपद्यते',  why: '2.3 — यण् (इ + उ → य्यु)' },
  { label: 'तच्च',          why: 'त् + च → च्च' },
];

export default function SandhiLab() {
  const [input, setInput] = useState('पाण्डवाश्चैव');

  const result = useMemo(() => undoSandhi(input)[0] ?? null, [input]);

  return (
    <article className="atlas-page">
      <h3 className="atlas-page-title">Sandhi Lab</h3>
      <p className="atlas-lede">
        <strong>This is a tool, not a reference.</strong> Paste any sandhi-joined string —
        the engine runs {SANDHI_RULES.length} Pāṇinian rules (visarga, consonant, vowel, yaṇ)
        and tries to reconstruct the original parts.
      </p>
      <p className="atlas-aside">
        Two surfaces in the app handle sandhi, by design:
      </p>
      <ul className="atlas-aside" style={{ paddingLeft: '20px', marginTop: '0' }}>
        <li><strong>Verse Detail → सन्धि block</strong> — hand-curated notes for a specific decoded verse. Read-only. The "what splits where" answer for the verse you're looking at.</li>
        <li><strong>This Sandhi Lab</strong> — interactive engine. Paste arbitrary input from anywhere (a verse you're decoding by hand, a quote from a commentary, etc.) and see the engine's analysis with the rule names. Use it when you hit a junction the verse's own notes don't cover.</li>
      </ul>
      <p className="atlas-aside">
        Lexical limits: without a Sanskrit dictionary the engine can't disambiguate every case (e.g. internal matras vs sandhi junctions). When the result looks wrong, your input was probably already unjoined — or the sandhi happens at a position that needs lexical cue. Try the presets below for known-good inputs.
      </p>

      <div className="sandhi-lab-input">
        <label htmlFor="sandhi-input">Joined string</label>
        <input
          id="sandhi-input"
          type="text"
          className="sandhi-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. पाण्डवाश्चैव"
        />
        <div className="sandhi-lab-presets">
          <span>Try:</span>
          {PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              className="sandhi-preset"
              onClick={() => setInput(p.label)}
              title={p.why}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {result && (
        <div className="sandhi-lab-result">
          <div className="sandhi-result-parts">
            {result.parts.length === 1 && result.rules.length === 0 ? (
              <p className="sandhi-result-empty">No sandhi-junction recognised. The string is either already unjoined or contains sandhi the engine can't auto-detect.</p>
            ) : (
              <>
                {result.parts.map((p, i) => (
                  <span key={i} style={{ display: 'contents' }}>
                    {i > 0 && <span className="sandhi-result-sep">·</span>}
                    <span className="sandhi-result-part">{p}</span>
                  </span>
                ))}
              </>
            )}
          </div>

          {result.rules.length > 0 && (
            <div className="sandhi-result-rules">
              <h4>Rules applied</h4>
              <ol>
                {result.rules.map((r, i) => {
                  const full = describeRule(r.id);
                  return (
                    <li key={i}>
                      <span className="rule-name">{r.name}</span>
                      {full && (
                        <>
                          <span className="rule-cat">[{full.category}]</span>
                          <span className="rule-desc">{full.description}</span>
                          <span className="rule-example">e.g., {full.example}</span>
                        </>
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
          )}
        </div>
      )}

      <details className="sandhi-rules-catalogue">
        <summary>Full rule catalogue ({SANDHI_RULES.length} rules)</summary>
        <ul>
          {SANDHI_RULES.map((r) => (
            <li key={r.id}>
              <span className="rule-name">{r.name}</span>
              <span className="rule-cat">[{r.category}{r.auto === false ? ' · opt-in' : ''}]</span>
              <span className="rule-example">{r.example}</span>
            </li>
          ))}
        </ul>
      </details>
    </article>
  );
}
