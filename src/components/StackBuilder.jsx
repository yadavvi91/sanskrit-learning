import { useMemo, useState } from 'react';
import { conjugate, decompose, decompose_reverse } from '../utils/conjugator.js';
import {
  LAKARAS, LAKARA_META, GANA_META, PURUSHAS, VACHANAS,
} from '../utils/endings.js';

export default function StackBuilder({ dhatus }) {
  const [mode, setMode] = useState('forward');

  return (
    <div className="stack-builder">
      <nav className="stack-mode-toggle">
        <button
          type="button"
          className={`stack-mode-btn ${mode === 'forward' ? 'is-active' : ''}`}
          onClick={() => setMode('forward')}
        >
          Forward — build a form
        </button>
        <button
          type="button"
          className={`stack-mode-btn ${mode === 'reverse' ? 'is-active' : ''}`}
          onClick={() => setMode('reverse')}
        >
          Reverse — decode a form
        </button>
      </nav>

      {mode === 'forward' ? <Forward dhatus={dhatus} /> : <Reverse dhatus={dhatus} />}
    </div>
  );
}

function Forward({ dhatus }) {
  const [dhatu, setDhatu] = useState(dhatus[0]);
  const [lakara, setLakara] = useState('lat');
  const [pada, setPada] = useState(dhatus[0].pada === 'A' ? 'A' : 'P');
  const [purusha, setPurusha] = useState('prathama');
  const [vachana, setVachana] = useState('eka');

  const padasAvailable = dhatu.pada === 'U' ? ['P', 'A'] : [dhatu.pada];
  const form = conjugate(dhatu, lakara, pada, purusha, vachana);
  const layers = decompose(dhatu, lakara, pada, purusha, vachana);

  return (
    <div className="forward">
      <div className="forward-pickers">
        <Picker label="1. धातु">
          <select
            value={dhatu.id}
            onChange={(e) => {
              const next = dhatus.find((d) => d.id === e.target.value);
              setDhatu(next);
              if (next.pada !== 'U' && pada !== next.pada) setPada(next.pada);
            }}
          >
            {dhatus.map((d) => (
              <option key={d.id} value={d.id}>
                {d.devanagari} — {d.meanings[0]} (गण {d.gana})
              </option>
            ))}
          </select>
        </Picker>

        <Picker label="2. गण">
          <span className="picker-readonly">
            {dhatu.gana} · {GANA_META[dhatu.gana]?.devanagari}
            {!GANA_META[dhatu.gana]?.thematic && ' · athematic'}
          </span>
        </Picker>

        <Picker label="3. लकार">
          <select value={lakara} onChange={(e) => setLakara(e.target.value)}>
            {LAKARAS.map((l) => (
              <option key={l} value={l}>
                {LAKARA_META[l].devanagari} — {LAKARA_META[l].label}
              </option>
            ))}
          </select>
        </Picker>

        <Picker label="4. पद">
          <select value={pada} onChange={(e) => setPada(e.target.value)} disabled={padasAvailable.length === 1}>
            {padasAvailable.map((p) => (
              <option key={p} value={p}>{p === 'P' ? 'परस्मैपद' : 'आत्मनेपद'}</option>
            ))}
          </select>
        </Picker>

        <Picker label="5. पुरुष">
          <select value={purusha} onChange={(e) => setPurusha(e.target.value)}>
            {PURUSHAS.map((p) => (
              <option key={p.id} value={p.id}>{p.devanagari} — {p.label}</option>
            ))}
          </select>
        </Picker>

        <Picker label="वचन">
          <select value={vachana} onChange={(e) => setVachana(e.target.value)}>
            {VACHANAS.map((v) => (
              <option key={v.id} value={v.id}>{v.devanagari} — {v.label}</option>
            ))}
          </select>
        </Picker>
      </div>

      <div className="forward-result">
        <div className="formula-line">
          {layers.augment && (
            <>
              <span className="formula-piece formula-aug" title="augment">{layers.augment}</span>
              <span className="formula-op">+</span>
            </>
          )}
          <span className="formula-piece formula-stem" title="stem">{layers.stem}</span>
          <span className="formula-op">+</span>
          <span className="formula-piece formula-end" title="ending">{layers.ending || '∅'}</span>
          <span className="formula-op">=</span>
          <span className="formula-piece formula-result">{form ?? '—'}</span>
        </div>
        <div className="formula-legend">
          {layers.augment && <span><span className="dot dot-aug" />augment</span>}
          <span><span className="dot dot-stem" />stem</span>
          <span><span className="dot dot-end" />ending</span>
        </div>
      </div>
    </div>
  );
}

function Reverse({ dhatus }) {
  const [input, setInput] = useState('प्रतियोत्स्यामि');
  const matches = useMemo(() => {
    const trimmed = input.trim();
    if (!trimmed) return [];
    return decompose_reverse(trimmed, dhatus);
  }, [input, dhatus]);

  return (
    <div className="reverse">
      <label className="reverse-input-label">
        <span>Paste a finite verb form to decompose:</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="reverse-input"
          placeholder="e.g. प्रतियोत्स्यामि"
        />
      </label>

      {matches.length === 0 ? (
        <p className="reverse-empty">
          No match in the current corpus of {dhatus.length} dhātus.{' '}
          (Try: <code>अकुर्वत</code>, <code>भवति</code>, <code>उत्तिष्ठ</code>,{' '}
          <code>अस्ति</code>, <code>स्यात्</code>, <code>भुञ्जीय</code>,{' '}
          <code>प्रतियोत्स्यामि</code>.)
        </p>
      ) : (
        <ul className="reverse-matches">
          {matches.map((m, i) => (
            <li key={i} className="reverse-match">
              <ReverseFormula match={m} resultForm={input.trim()} />
              <div className="reverse-annotation">
                <span>{LAKARA_META[m.lakara].devanagari} <em>({LAKARA_META[m.lakara].label})</em></span>
                <span className="ann-sep">·</span>
                <span>{m.pada === 'P' ? 'परस्मैपद' : 'आत्मनेपद'}</span>
                <span className="ann-sep">·</span>
                <span>{PURUSHAS.find((p) => p.id === m.purusha)?.devanagari} {VACHANAS.find((v) => v.id === m.vachana)?.devanagari}</span>
                <span className="ann-sep">·</span>
                <span>गण {m.dhatu.gana}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Mirrors the Forward formula visually: chips for each layer, free "+" / "=" operators.
function ReverseFormula({ match, resultForm }) {
  const layers = decompose(match.dhatu, match.lakara, match.pada, match.purusha, match.vachana);
  return (
    <div className="formula-line">
      {match.prefixes && match.prefixes.map((u, i) => (
        <span key={`p${i}`} style={{ display: 'contents' }}>
          <span className="formula-piece formula-pre" title={`उपसर्ग — ${u.sense}`}>{u.prefix}</span>
          <span className="formula-op">+</span>
        </span>
      ))}
      {layers.augment && (
        <>
          <span className="formula-piece formula-aug" title="augment">{layers.augment}</span>
          <span className="formula-op">+</span>
        </>
      )}
      <span className="formula-piece formula-stem" title={`stem of √${match.dhatu.devanagari}`}>
        {layers.stem}
      </span>
      <span className="formula-op">+</span>
      <span className="formula-piece formula-end" title="ending">
        {layers.ending || '∅'}
      </span>
      <span className="formula-op">=</span>
      <span className="formula-piece formula-result">{resultForm}</span>
    </div>
  );
}

function Picker({ label, children }) {
  return (
    <label className="picker">
      <span className="picker-label">{label}</span>
      {children}
    </label>
  );
}
