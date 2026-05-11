import { useEffect, useMemo, useRef, useState } from 'react';
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
          <DhatuCombobox
            dhatus={dhatus}
            value={dhatu}
            onChange={(next) => {
              setDhatu(next);
              if (next.pada !== 'U' && pada !== next.pada) setPada(next.pada);
            }}
          />
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

// Searchable replacement for the 190-entry dhātu <select>. Click toggles
// a popover with a search input that filters by devanāgarī / IAST /
// meaning / gana number; clicking a row commits the selection and closes.
function DhatuCombobox({ dhatus, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const wrapRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (!open) return;
    const close = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    const key = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', key);
    // Focus the search input on open.
    requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', key);
    };
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return dhatus;
    return dhatus.filter((d) => {
      if (d.devanagari.includes(query)) return true;
      const iast = (d.iast || '').toLowerCase();
      if (iast.includes(q)) return true;
      if (d.meanings.some((m) => m.toLowerCase().includes(q))) return true;
      if (String(d.gana) === q) return true;
      return false;
    });
  }, [dhatus, query]);

  // Keep activeIdx in range when the filter changes.
  useEffect(() => { setActiveIdx(0); }, [query]);

  const commit = (d) => {
    onChange(d);
    setOpen(false);
    setQuery('');
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[activeIdx]) commit(filtered[activeIdx]);
    }
  };

  // Scroll the active row into view as the user arrow-keys through.
  useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current.querySelector(`[data-idx="${activeIdx}"]`);
    if (el && typeof el.scrollIntoView === 'function') el.scrollIntoView({ block: 'nearest' });
  }, [open, activeIdx]);

  return (
    <div className="dhatu-combobox" ref={wrapRef}>
      <button
        type="button"
        className="dhatu-combobox-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="dhatu-trigger-deva">{value.devanagari}</span>
        <span className="dhatu-trigger-meta">— {value.meanings[0]} (गण {value.gana})</span>
        <span className="dhatu-trigger-caret">▾</span>
      </button>

      {open && (
        <div className="dhatu-combobox-popover" role="listbox">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={`Search ${dhatus.length} dhātus — devanāgarī, IAST, meaning, or gaṇa`}
            className="dhatu-combobox-search"
          />
          <div className="dhatu-combobox-list" ref={listRef}>
            {filtered.length === 0 ? (
              <div className="dhatu-combobox-empty">No match.</div>
            ) : filtered.map((d, i) => (
              <button
                key={d.id}
                type="button"
                data-idx={i}
                className={`dhatu-combobox-row ${i === activeIdx ? 'is-active' : ''} ${d.id === value.id ? 'is-selected' : ''}`}
                onMouseEnter={() => setActiveIdx(i)}
                onClick={() => commit(d)}
                role="option"
                aria-selected={d.id === value.id}
              >
                <span className="dhatu-row-deva">{d.devanagari}</span>
                <span className="dhatu-row-iast">{d.iast || ''}</span>
                <span className="dhatu-row-meaning">{d.meanings[0]}</span>
                <span className="dhatu-row-gana">गण {d.gana}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
