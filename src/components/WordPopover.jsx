import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDeclensionForParsing, getDeclensionById } from '../data/declensions.js';
import { getPronounAnchor } from '../data/pronouns.js';
import { lookupSharedVocab } from '../data/sharedVocab.js';

const CASE_LABELS = {
  pra: 'प्रथमा (Nom.)',
  dvi: 'द्वितीया (Acc.)',
  tri: 'तृतीया (Inst.)',
  cha: 'चतुर्थी (Dat.)',
  pan: 'पञ्चमी (Abl.)',
  sha: 'षष्ठी (Gen.)',
  sap: 'सप्तमी (Loc.)',
  sam: 'सम्बोधन (Voc.)',
};

const NUMBER_LABELS = {
  eka: 'एकवचन (sg)',
  dvi: 'द्विवचन (du)',
  bahu: 'बहुवचन (pl)',
};

const GENDER_LABELS = {
  m: 'पुं. (masc.)',
  f: 'स्त्री. (fem.)',
  n: 'नपुं. (neut.)',
  '-': '(no gender)',
};

const PURUSHA_LABELS = {
  prathama: 'प्रथम (3rd)',
  madhyama: 'मध्यम (2nd)',
  uttama: 'उत्तम (1st)',
};

const LAKARA_LABELS = {
  lat: 'लट् (present)',
  lan: 'लङ् (past)',
  lrt: 'लृट् (future)',
  lot: 'लोट् (imperative)',
  vidhilin: 'विधिलिङ् (optative)',
};

const CATEGORY_LABEL = {
  noun: 'noun',
  adjective: 'adjective',
  pronoun: 'pronoun',
  verb: 'finite verb',
  krdanta: 'कृदन्त',
  particle: 'अव्यय (particle)',
};

// Wraps a पद chip. Click to toggle a popover with the parsed grammar.
// Three layers of parsing data, in priority order:
//   1. verse.wordParsings[word] — hand-decoded verses' rich per-word data
//   2. lookupSharedVocab(word) — shared dictionary fallback
//   3. neither → render an "auto-stub draft" popover that at least
//      surfaces the word, so the click isn't a silent no-op
export default function WordPopover({ word, parsing, isFinite }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Effective parsing: verse-local first, then shared-dict fallback.
  const effectiveParsing = parsing ?? lookupSharedVocab(word) ?? null;

  useEffect(() => {
    if (!open) return;
    function close(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    function key(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', key);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', key);
    };
  }, [open]);

  const titleText = effectiveParsing
    ? (parsing ? 'Click to see grammar (hand-decoded)' : 'Click to see grammar (from shared dictionary)')
    : 'Click — no grammar data yet, but the popover shows what we know';

  return (
    <span className="word-popover-wrap" ref={ref}>
      <button
        type="button"
        className={`pada ${isFinite ? 'is-finite' : ''} ${effectiveParsing ? 'has-parsing' : ''} ${open ? 'is-open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
        title={titleText}
      >
        {word}
      </button>
      {open && (
        effectiveParsing
          ? <Popover word={word} parsing={effectiveParsing} fromSharedDict={!parsing && !!effectiveParsing} />
          : <EmptyPopover word={word} />
      )}
    </span>
  );
}

function EmptyPopover({ word }) {
  return (
    <div className="word-popover word-popover-empty" role="dialog">
      <div className="wp-header">
        <span className="wp-word">{word}</span>
        <span className="wp-category">no grammar data yet</span>
      </div>
      <p className="wp-gloss">
        This word isn't in the shared dictionary, and the verse hasn't been hand-decoded.
        It's a candidate for the Decode Helper queue.
      </p>
    </div>
  );
}

function Popover({ word, parsing, fromSharedDict }) {
  const navigate = useNavigate();
  const paradigmId = getDeclensionForParsing(parsing);
  const paradigm = paradigmId ? getDeclensionById(paradigmId) : null;
  // For pronouns, the link points to /atlas/pronouns#<section> instead.
  const pronounAnchor = !paradigm ? getPronounAnchor(parsing) : null;

  return (
    <div className="word-popover" role="dialog">
      <div className="wp-header">
        <span className="wp-word">{word}</span>
        <span className="wp-category">
          {CATEGORY_LABEL[parsing.category] ?? parsing.category}
          {fromSharedDict && <span className="wp-source-tag" title="Source: shared dictionary fallback (verse not hand-decoded)"> · dict</span>}
        </span>
      </div>

      {parsing.gloss && <p className="wp-gloss">"{parsing.gloss}"</p>}

      <dl className="wp-fields">
        {parsing.root && <Row label="root" value={parsing.root} />}
        {parsing.kind && <Row label="kind" value={parsing.kind} />}
        {parsing.gana != null && <Row label="गण" value={parsing.gana} />}
        {parsing.pada && <Row label="पद" value={parsing.pada === 'P' ? 'परस्मैपद' : parsing.pada === 'A' ? 'आत्मनेपद' : parsing.pada} />}
        {parsing.lakara && <Row label="लकार" value={LAKARA_LABELS[parsing.lakara] ?? parsing.lakara} />}
        {parsing.purusha && <Row label="पुरुष" value={PURUSHA_LABELS[parsing.purusha] ?? parsing.purusha} />}
        {parsing.gender && <Row label="लिंग" value={GENDER_LABELS[parsing.gender] ?? parsing.gender} />}
        {parsing.number && <Row label="वचन" value={NUMBER_LABELS[parsing.number] ?? parsing.number} />}
        {parsing.case && <Row label="विभक्ति" value={CASE_LABELS[parsing.case] ?? parsing.case} />}
      </dl>

      {parsing.note && <p className="wp-note">{parsing.note}</p>}

      {paradigm && (
        <button
          type="button"
          className="wp-paradigm-link"
          onClick={() => navigate(`/atlas/declensions#${paradigm.id}`)}
          title={`Open ${paradigm.name}-class full paradigm (24 forms) in Atlas`}
        >
          <span>follows <strong>{paradigm.name}</strong>-class — see all 24 forms</span>
          <span className="wp-paradigm-arrow">↗</span>
        </button>
      )}

      {pronounAnchor && (
        <button
          type="button"
          className="wp-paradigm-link"
          onClick={() => navigate(`/atlas/pronouns#${pronounAnchor.anchor}`)}
          title={`Open ${pronounAnchor.label} in Atlas → सर्वनाम`}
        >
          <span>see in <strong>सर्वनाम</strong> — {pronounAnchor.label}</span>
          <span className="wp-paradigm-arrow">↗</span>
        </button>
      )}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </>
  );
}
