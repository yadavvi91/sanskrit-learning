import { useMemo, useState } from 'react';
import { autoDecode, stubToJs } from '../utils/decodeHelper.js';

const DEFAULT_INPUT = 'मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय';

export default function DecodeHelper() {
  const [input, setInput] = useState(DEFAULT_INPUT);
  const [chapter, setChapter] = useState(1);
  const [verse, setVerse] = useState(1);
  const [copied, setCopied] = useState(false);

  const stub = useMemo(() => autoDecode(input), [input]);
  const js = useMemo(
    () => (stub ? stubToJs(stub, { chapter, verse, decodeIndex: '?' }) : ''),
    [stub, chapter, verse]
  );

  async function handleCopy() {
    if (!js) return;
    try {
      await navigator.clipboard.writeText(js);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {/* ignore */}
  }

  return (
    <div className="decode-helper">
      <header className="decode-header">
        <div>
          <h2 className="decode-title">सङ्केतकः</h2>
          <p className="decode-sub">
            Paste a verse's mool (Devanāgarī, with or without <code>।</code>/<code>॥</code>).
            The engine runs sandhi-undo + vocabulary lookup + finite-verb signal detection
            and produces a stub paste-ready for <code>verses.js</code>. Audit the stub —
            fill <code>// TODO</code> fields, then commit. Cuts decode time substantially.
          </p>
        </div>
      </header>

      <div className="decode-row">
        <label>
          <span>Chapter</span>
          <input
            type="number"
            min="1" max="18"
            value={chapter}
            onChange={(e) => setChapter(Number(e.target.value))}
            className="decode-num"
          />
        </label>
        <label>
          <span>Verse</span>
          <input
            type="number"
            min="1"
            value={verse}
            onChange={(e) => setVerse(Number(e.target.value))}
            className="decode-num"
          />
        </label>
      </div>

      <textarea
        className="decode-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        placeholder="मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय"
      />

      {stub && (
        <>
          <div className="decode-preview">
            <h3>Auto-stub preview</h3>

            <section className="decode-section">
              <h4>पदच्छेद ({stub.padaccheda.length} words)</h4>
              <ul className="decode-padas">
                {stub.padaccheda.map((p, i) => {
                  const conf = stub._wordConfidence[p] ?? 'unknown';
                  return (
                    <li key={i} className={`decode-pada decode-pada-${conf}`}>
                      <span>{p}</span>
                      {stub.wordParsings[p] && (
                        <small>{stub.wordParsings[p].gloss}</small>
                      )}
                    </li>
                  );
                })}
              </ul>
              <p className="decode-legend">
                <span className="decode-legend-dot decode-legend-high" /> known word
                <span className="decode-legend-dot decode-legend-unknown" /> unknown — needs parsing
              </p>
            </section>

            {stub.sandhiNotes.length > 0 && (
              <section className="decode-section">
                <h4>सन्धि — {stub.sandhiNotes.length} note(s)</h4>
                <ul className="decode-list">
                  {stub.sandhiNotes.map((n, i) => <li key={i}>{n}</li>)}
                </ul>
              </section>
            )}

            {stub.finiteVerbs.length > 0 && (
              <section className="decode-section">
                <h4>क्रिया — finite-verb candidate(s)</h4>
                <ul className="decode-list">
                  {stub.finiteVerbs.map((fv, i) => (
                    <li key={i} className="decode-fv">
                      <strong>{fv.form}</strong> — likely <em>{fv.lakara}</em>
                      {fv.purusha !== '?' && `, ${fv.purusha}`}
                      {fv.vachana !== '?' && ` ${fv.vachana}`}
                      <small> ({fv.signal}; confidence: {fv.confidence})</small>
                    </li>
                  ))}
                </ul>
                <p className="decode-warn">⚠ Finite-verb detection is signal-based — audit each candidate.</p>
              </section>
            )}
          </div>

          <div className="decode-output">
            <div className="decode-output-header">
              <h3>JS — paste into <code>src/data/verses.js</code></h3>
              <button type="button" className="decode-copy" onClick={handleCopy}>
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
            <pre className="decode-js"><code>{js}</code></pre>
          </div>
        </>
      )}
    </div>
  );
}
