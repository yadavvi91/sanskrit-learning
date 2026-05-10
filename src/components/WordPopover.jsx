import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDeclensionForParsing, getDeclensionById } from '../data/declensions.js';
import { getPronounAnchor } from '../data/pronouns.js';
import { lookupSharedVocab } from '../data/sharedVocab.js';
import { getReferenceLink } from '../data/referenceLinks.js';

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
//   3. for hyphenated compounds (e.g., भीम-अर्जुन-समाः, पणव-आनक-गोमुखाः),
//      decompose at hyphens and look up each component; render a compound
//      popover listing per-component parsings + the case from the head.
//   4. neither → render an EmptyPopover so the click isn't a silent no-op.
function decomposeCompound(word) {
  if (!word.includes('-')) return null;
  const parts = word.split('-').filter(Boolean);
  if (parts.length < 2) return null;
  const components = parts.map((p) => ({ form: p, parsing: lookupSharedVocab(p) }));
  // The head (final piece) carries the case ending — its parsing best
  // describes the whole compound's grammatical role.
  const head = components[components.length - 1];
  // Only treat as a useful compound if at least one component resolved.
  if (!components.some((c) => c.parsing)) return null;
  return { components, head };
}

export default function WordPopover({ word, parsing, isFinite }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Effective parsing: verse-local first, then shared-dict fallback.
  const effectiveParsing = parsing ?? lookupSharedVocab(word) ?? null;
  // For hyphenated words, prefer component-by-component decomposition
  // over a generic suffix-inferred entry — the latter would say
  // "a-stem nom sg" with no real meaning, while CompoundPopover shows
  // each part's actual gloss (परम-इष्वासः → परम "supreme" + इष्वासः
  // "archer"). Authoritative parsings (verse-local or hand-curated
  // dict) still win over decomposition.
  const isWeakParsing = effectiveParsing && effectiveParsing.source === 'suffix-inferred';
  const compound = (!effectiveParsing || (isWeakParsing && word.includes('-')))
    ? decomposeCompound(word)
    : null;
  // If we found a usable compound decomposition, override the weak parsing.
  const finalParsing = compound ? null : effectiveParsing;

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

  const titleText = finalParsing
    ? (parsing ? 'Click to see grammar (hand-decoded)' : 'Click to see grammar (from shared dictionary)')
    : compound
      ? 'Click to see compound components'
      : 'Click — no grammar data yet, but the popover shows what we know';

  const hasParsing = !!(finalParsing || compound);

  return (
    <span className="word-popover-wrap" ref={ref}>
      <button
        type="button"
        className={`pada ${isFinite ? 'is-finite' : ''} ${hasParsing ? 'has-parsing' : ''} ${open ? 'is-open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
        title={titleText}
      >
        {word}
      </button>
      {open && (
        finalParsing
          ? <Popover word={word} parsing={finalParsing} fromSharedDict={!parsing && !!finalParsing} />
          : compound
            ? <CompoundPopover word={word} compound={compound} />
            : <EmptyPopover word={word} />
      )}
    </span>
  );
}

function CompoundPopover({ word, compound }) {
  const { components, head } = compound;
  const headParsing = head.parsing;
  return (
    <div className="word-popover word-popover-compound" role="dialog">
      <div className="wp-header">
        <span className="wp-word">{word}</span>
        <span className="wp-category">समास compound</span>
      </div>
      <p className="wp-gloss">
        Light समास compound from पदच्छेद. The head (final component) carries the case ending; the others modify it.
      </p>
      <dl className="wp-fields">
        {components.map((c, i) => (
          <CompoundRow key={i} index={i} component={c} isHead={i === components.length - 1} />
        ))}
      </dl>
      {headParsing?.case && (
        <p className="wp-note">
          Whole compound declines as: <strong>{CASE_LABELS[headParsing.case] ?? headParsing.case}</strong>
          {headParsing.number ? ` · ${NUMBER_LABELS[headParsing.number] ?? headParsing.number}` : ''}
          {headParsing.gender ? ` · ${GENDER_LABELS[headParsing.gender] ?? headParsing.gender}` : ''}
        </p>
      )}
    </div>
  );
}

function CompoundRow({ index, component, isHead }) {
  const { form, parsing } = component;
  return (
    <>
      <dt>
        <span className="wp-compound-pos">{index + 1}</span>
        {isHead && <span className="wp-compound-head" title="Head of the compound — carries the case ending">head</span>}
      </dt>
      <dd>
        <strong>{form}</strong>
        {parsing?.gloss && <span className="wp-compound-gloss"> — {parsing.gloss}</span>}
        {parsing?.root && parsing.root !== form && <span className="wp-compound-root"> · root <em>{parsing.root}</em></span>}
        {!parsing && <span className="wp-compound-unknown"> — (no gloss yet)</span>}
      </dd>
    </>
  );
}

// Last-resort shape analysis when every dictionary + suffix-inference layer
// has failed. Devanagari shape signals only: length, head/tail characters,
// presence of vowel marks. We return a short human-readable hint so the
// popover is never a pure dead-end.
function shapeHint(word) {
  const len = [...word].length;
  if (len <= 1) return 'Single character — almost certainly a splitter residue (likely an आ-/अ- prefix detached from its host word).';
  if (len === 2) return 'Two-character fragment — likely a splitter residue. Read the verse line for the surrounding context.';
  if (word.includes('-')) return 'Hyphenated compound with no resolved components — the head probably carries the case; each part may need its own gloss.';
  if (word.startsWith('ं') || word.startsWith('ः') || word.startsWith('े') || word.startsWith('ा') || word.startsWith('ि') || word.startsWith('ी') || word.startsWith('ु') || word.startsWith('ू') || word.startsWith('ो'))
    return 'Begins with a vowel-mark (मात्रा) — splitter cut at the wrong place; the leading consonant was absorbed by the previous word.';
  if (word.endsWith('्')) return 'Ends in विराम (् ) — consonant-stem form; check the verse text for the larger compound this belongs to.';
  return 'No dictionary entry or suffix pattern matched. Likely either an uncommon compound or a splitter mis-cut — check the verse line for context.';
}

function EmptyPopover({ word }) {
  return (
    <div className="word-popover word-popover-empty" role="dialog">
      <div className="wp-header">
        <span className="wp-word">{word}</span>
        <span className="wp-category">best-effort shape hint</span>
      </div>
      <p className="wp-gloss">{shapeHint(word)}</p>
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

      {/* Generic reference-link fallback — fires when neither the
          paradigm classifier nor the pronoun anchor produced a link.
          Routes verbs to /verbs, krdantas to /primer#krdanta, particles
          to /atlas/avyaya, etc. Ensures every popover has at least
          one outbound pedagogical link. */}
      {!paradigm && !pronounAnchor && (() => {
        const ref = getReferenceLink(parsing);
        if (!ref) return null;
        return (
          <button
            type="button"
            className="wp-paradigm-link"
            onClick={() => navigate(ref.url)}
            title={ref.label}
          >
            <span>{ref.label}</span>
            <span className="wp-paradigm-arrow">↗</span>
          </button>
        );
      })()}
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
