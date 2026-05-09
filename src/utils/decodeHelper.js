// Decode helper engine: paste mool, get a stub.
//
// Combines the three pieces shipped in v8:
//   - undoSandhi() from sandhi.js  → candidate padaccheda
//   - buildVocabulary() from vocabulary.js → known-word parsings library
//   - LAKARA_META signals from endings.js → tentative finite-verb detection
//
// Returns a stub matching the shape of a verses.js entry, with empty fields
// where the user must contribute. Per-field confidence annotations help the
// user know where to focus their audit.

import { undoSandhi } from './sandhi.js';
import { buildVocabulary } from './vocabulary.js';
import { DHATUS_EXTENDED as DHATUS } from '../data/dhatus-extended.js';

// Stem → dhātu lookup table. Used by classifyByStem (below) to confirm a
// candidate verb form by checking whether its stripped stem matches a
// known root. This catches forms where the regex-only LAKARA_SIGNALS
// would either miss (e.g., आत्मनेपद उत्तम-एकवचन -ए on मन्ये, लभे) or
// false-positive (every सप्तमी-एकवचन noun also ends in -ए).
const STEM_TO_DHATU = new Map();
for (const d of DHATUS) {
  if (d.presentStem) STEM_TO_DHATU.set(d.presentStem, { ...d, viaStem: 'present' });
  if (d.futureStem) STEM_TO_DHATU.set(d.futureStem, { ...d, viaStem: 'future' });
}

// Pre-generated set of plausible finite-verb forms across the 192 dhātus.
// Used by tryYanSandhiSplit (below) to lexicon-validate internal-sandhi
// splits — only accept a split if the LEFT side is a known verb form.
// Avoids false-positives on words like संख्या / विद्या where "्या" is
// part of the root, not a sandhi junction.
const PRES_ENDINGS_P = ['ति', 'न्ति', 'सि', 'थः', 'थ', 'मि', 'वः', 'मः'];
const PRES_ENDINGS_A = ['ते', 'न्ते', 'से', 'एथे', 'ध्वे', 'ए', 'वहे', 'महे'];
const KNOWN_VERB_FORMS = new Set();
for (const d of DHATUS) {
  if (!d.presentStem) continue;
  const endings = d.pada === 'A' ? PRES_ENDINGS_A
                : d.pada === 'P' ? PRES_ENDINGS_P
                : [...PRES_ENDINGS_P, ...PRES_ENDINGS_A]; // 'U' = ubhayapadī
  for (const e of endings) KNOWN_VERB_FORMS.add(d.presentStem + e);
}

// Yan-sandhi unjoin with lexicon validation.
// Pattern: a chunk contains "्य" (virama+य) somewhere. If we replace
// "्य" with "ि" (matra) on the LEFT and start a new word with the
// vowel that followed, AND the resulting LEFT is a known verb form,
// accept the split. The right side starts with: आ if "्या", ए if "्ये",
// ओ if "्यो", उ if "्यु", ई if "्यी", or अ (implicit) otherwise.
//
// This catches the most common Gītā internal-sandhi pattern:
//   पश्यन्त्यात्मनि → पश्यन्ति + आत्मनि (left पश्यन्ति is a known
//   verb form: presentStem पश्य + ending न्ति)
function tryYanSandhiSplit(chunk) {
  for (let i = 1; i < chunk.length - 1; i++) {
    if (chunk[i] !== '्' || chunk[i + 1] !== 'य') continue;
    // Candidate left: everything before ्य, plus ि matra on the previous akṣara.
    const left = chunk.slice(0, i) + 'ि';
    if (!KNOWN_VERB_FORMS.has(left)) continue;
    // Right: vowel after ्य determines what the original word started with.
    const next = chunk[i + 2];
    let right;
    if (next === 'ा') right = 'आ' + chunk.slice(i + 3);
    else if (next === 'े') right = 'ए' + chunk.slice(i + 3);
    else if (next === 'ो') right = 'ओ' + chunk.slice(i + 3);
    else if (next === 'ु') right = 'उ' + chunk.slice(i + 3);
    else if (next === 'ी') right = 'ई' + chunk.slice(i + 3);
    else if (next === 'ू') right = 'ऊ' + chunk.slice(i + 3);
    else right = 'अ' + chunk.slice(i + 2); // implicit अ on bare consonant
    if (!right) continue;
    return { left, right, rule: { id: 'yan-lexicon', name: 'यण् सन्धि (lexicon-validated)' } };
  }
  return null;
}

// Verbal endings the engine recognises by stripping. Order doesn't matter
// here because we try every ending and accept the first whose stripped
// stem hits STEM_TO_DHATU. Sorted by length (descending) implicitly via
// individual entries — we'll iterate longest-first to avoid partial matches.
const STEM_BACKED_ENDINGS = [
  // आत्मनेपद present
  { suffix: 'महे', lakara: 'lat', pada: 'A', purusha: 'uttama',  vachana: 'bahu', hint: 'present Ā उत्तम बहु -महे' },
  { suffix: 'वहे', lakara: 'lat', pada: 'A', purusha: 'uttama',  vachana: 'dvi',  hint: 'present Ā उत्तम द्वि -वहे' },
  { suffix: 'ध्वे', lakara: 'lat', pada: 'A', purusha: 'madhyama', vachana: 'bahu', hint: 'present Ā मध्यम बहु -ध्वे' },
  { suffix: 'न्ते', lakara: 'lat', pada: 'A', purusha: 'prathama', vachana: 'bahu', hint: 'present Ā प्रथम बहु -न्ते' },
  { suffix: 'एते', lakara: 'lat', pada: 'A', purusha: 'prathama', vachana: 'dvi',  hint: 'present Ā प्रथम द्वि -एते' },
  { suffix: 'एथे', lakara: 'lat', pada: 'A', purusha: 'madhyama', vachana: 'dvi',  hint: 'present Ā मध्यम द्वि -एथे' },
  { suffix: 'से',  lakara: 'lat', pada: 'A', purusha: 'madhyama', vachana: 'eka',  hint: 'present Ā मध्यम एक -से' },
  { suffix: 'ते',  lakara: 'lat', pada: 'A', purusha: 'prathama', vachana: 'eka',  hint: 'present Ā प्रथम एक -ते' },
  { suffix: 'ए',   lakara: 'lat', pada: 'A', purusha: 'uttama',  vachana: 'eka',  hint: 'present Ā उत्तम एक -ए' },
  // परस्मैपद present
  { suffix: 'न्ति', lakara: 'lat', pada: 'P', purusha: 'prathama', vachana: 'bahu', hint: 'present P प्रथम बहु -न्ति' },
  { suffix: 'थः',  lakara: 'lat', pada: 'P', purusha: 'madhyama', vachana: 'dvi',  hint: 'present P मध्यम द्वि -थः' },
  { suffix: 'मः',  lakara: 'lat', pada: 'P', purusha: 'uttama',  vachana: 'bahu', hint: 'present P उत्तम बहु -मः' },
  { suffix: 'वः',  lakara: 'lat', pada: 'P', purusha: 'uttama',  vachana: 'dvi',  hint: 'present P उत्तम द्वि -वः' },
  { suffix: 'थ',   lakara: 'lat', pada: 'P', purusha: 'madhyama', vachana: 'bahu', hint: 'present P मध्यम बहु -थ' },
  { suffix: 'सि',  lakara: 'lat', pada: 'P', purusha: 'madhyama', vachana: 'eka',  hint: 'present P मध्यम एक -सि' },
  { suffix: 'ति',  lakara: 'lat', pada: 'P', purusha: 'prathama', vachana: 'eka',  hint: 'present P प्रथम एक -ति' },
  { suffix: 'मि',  lakara: 'lat', pada: 'P', purusha: 'uttama',  vachana: 'eka',  hint: 'present P उत्तम एक -मि' },
];
// Sort longest-first so multi-char endings match before their suffixes.
STEM_BACKED_ENDINGS.sort((a, b) => b.suffix.length - a.suffix.length);

// Try to classify a form by stripping a known verbal ending and confirming
// the residue is a known dhātu present-stem. High-precision: only fires
// when the stem matches DHATUS, so it never false-positives on noun forms
// that happen to end in -ए, -ते, -ति, etc.
function classifyByStem(form) {
  for (const ending of STEM_BACKED_ENDINGS) {
    if (!form.endsWith(ending.suffix)) continue;
    const stem = form.slice(0, form.length - ending.suffix.length);
    if (!stem) continue;
    const dhatu = STEM_TO_DHATU.get(stem);
    if (!dhatu) continue;
    // pada compatibility: A-only endings must be on Ā or उभयपदी roots;
    // P-only endings on P or उभयपदी.
    const dpada = dhatu.pada; // 'P' | 'A' | 'U'
    const epada = ending.pada;
    if (dpada !== 'U' && dpada !== epada) continue;
    return {
      form,
      lakara: ending.lakara,
      purusha: ending.purusha,
      vachana: ending.vachana,
      pada: ending.pada,
      root: dhatu.devanagari,
      gana: dhatu.gana,
      confidence: 'medium',
      signal: `${ending.hint} on √${dhatu.devanagari}`,
    };
  }
  return null;
}

// Strip shloka punctuation and normalise whitespace.
function cleanMoolLine(s) {
  return s
    .replace(/[।॥]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Endings that strongly signal a particular लकार on the bare form.
// Order matters: more specific (longer) signals first.
const LAKARA_SIGNALS = [
  // Future stem signals (-ष्य- / -स्य- + present-tense ending)
  { match: /ष्यति$|ष्यन्ति$|ष्यसि$|ष्यथ$|ष्यामि$|ष्यामः$|स्यति$|स्यन्ति$|स्यामि$/, lakara: 'lrt', purusha: null, hint: 'future stem' },
  { match: /ष्ये$|स्ये$|ष्यन्ते$|स्यन्ते$/, lakara: 'lrt', pada: 'A', hint: 'future stem (Ā)' },
  // विधिलिङ्
  { match: /ेत्$|ेयुः$|ेताम्$|ेम$/, lakara: 'vidhilin', hint: 'optative -ेत्' },
  { match: /ीय$|ीरन्$|ीमहि$/, lakara: 'vidhilin', pada: 'A', hint: 'optative आत्मनेपद' },
  // लोट्
  { match: /तु$|न्तु$/, lakara: 'lot', purusha: 'prathama', hint: 'imperative -तु' },
  // लट् (present)
  { match: /न्ति$/, lakara: 'lat', purusha: 'prathama', vachana: 'bahu', hint: 'present -न्ति' },
  { match: /ति$/,    lakara: 'lat', purusha: 'prathama', vachana: 'eka', hint: 'present -ति' },
  { match: /ते$/,    lakara: 'lat', pada: 'A', purusha: 'prathama', vachana: 'eka', hint: 'present आत्मनेपद -ते' },
  { match: /मि$/,    lakara: 'lat', purusha: 'uttama', vachana: 'eka', hint: 'present -मि' },
  // NOTE: आत्मनेपद उत्तम-एकवचन ending -ए (काङ्क्षे, लभे, मन्ये) is intentionally
  // NOT a blanket signal — every सप्तमी-एकवचन noun also ends in -ए
  // (कुरुक्षेत्रे, गृहे), so a regex catches massive false positives. Verses
  // like 1.32 where the finite verb takes this ending need vocabulary-backed
  // verification (planned) or hand-decoded data (current path).
  // लङ् (past, augmented)
  { match: /^अ.+त्$/, lakara: 'lan', hint: 'past with अ- augment + -त्' },
  { match: /^अ.+न्$/, lakara: 'lan', purusha: 'prathama', vachana: 'bahu', hint: 'past plural -न्' },
  { match: /^अ.+त$/,  lakara: 'lan', pada: 'A', hint: 'past आत्मनेपद with अ- augment' },
];

function classifyFiniteVerb(form) {
  // First pass: regex-based signals — high recall, may include some
  // false positives on shared noun/verb endings (e.g., -ति, -ते).
  for (const sig of LAKARA_SIGNALS) {
    if (sig.match.test(form)) {
      return {
        form,
        lakara: sig.lakara,
        purusha: sig.purusha ?? '?',
        vachana: sig.vachana ?? '?',
        pada: sig.pada ?? 'P',
        confidence: 'low',
        signal: sig.hint,
      };
    }
  }
  // Second pass: vocabulary-backed stem cross-check — high precision.
  // Catches forms the regex misses (मन्ये, लभे, भवसि, …) when the root
  // is in DHATUS. Won't catch verbs whose root isn't yet in the list;
  // those still need hand-decoding.
  const byStem = classifyByStem(form);
  if (byStem) return byStem;
  return null;
}

// One-character padas that are real Sanskrit words (mostly avyayas / particles).
// Anything else of length 1 emerging from a sandhi split is almost certainly
// a bogus over-eager savarna-dirgha undo (e.g., काङ्क्षे → क + अङ्क्षे).
const REAL_ONECHAR_PADAS = new Set(['न', 'च', 'तु', 'हि', 'वा', 'सः', 'या', 'अ', 'उ']);

function isPlausibleSplit(parts) {
  for (const p of parts) {
    if (p.length === 1 && !REAL_ONECHAR_PADAS.has(p)) return false;
  }
  return true;
}

// Recursively try yan-sandhi splits on a pada — keeps splitting as long
// as the left side keeps validating against KNOWN_VERB_FORMS. Returns
// the final list of padas after all yan-splits applied, plus a list of
// human-readable notes for the sandhiNotes panel.
function recursiveYanSplit(pada, notes) {
  const split = tryYanSandhiSplit(pada);
  if (!split) return [pada];
  notes.push(`${pada} = ${split.left} + ${split.right} (${split.rule.name})`);
  // The right side may itself contain another yan junction.
  return [split.left, ...recursiveYanSplit(split.right, notes)];
}

// Extract individual padas from a (multi-line) mool string by splitting on
// whitespace and running each chunk through the sandhi engine.
function extractPadas(mool) {
  const lines = (Array.isArray(mool) ? mool : String(mool).split(/\n+/))
    .map(cleanMoolLine)
    .filter(Boolean);
  const cleaned = lines.join(' ');

  const chunks = cleaned.split(/\s+/).filter(Boolean);
  const padas = [];
  const sandhiNotes = [];
  for (const chunk of chunks) {
    const r = undoSandhi(chunk);
    let firstPassPadas;
    if (!r || r.length === 0) {
      firstPassPadas = [chunk];
    } else {
      // Pick the first sandhi candidate whose parts pass the plausibility
      // filter. Falls back to keeping the chunk whole if every candidate
      // produces an implausible split.
      const candidate = r.find((c) => c.parts.length === 1 || isPlausibleSplit(c.parts));
      if (!candidate || candidate.parts.length === 1) {
        firstPassPadas = [chunk];
      } else {
        firstPassPadas = candidate.parts;
        const ruleNames = candidate.rules.map((rule) => rule.name).join(' + ');
        sandhiNotes.push(`${chunk} = ${candidate.parts.join(' + ')} (${ruleNames})`);
      }
    }
    // Second pass: try lexicon-validated yan-sandhi unjoin on each pada.
    // Catches internal junctions like पश्यन्त्यात्मन्यवस्थितम् →
    // पश्यन्ति + आत्मनि + अवस्थितम् (validated against KNOWN_VERB_FORMS).
    for (const p of firstPassPadas) {
      padas.push(...recursiveYanSplit(p, sandhiNotes));
    }
  }
  return { padas, sandhiNotes, lines };
}

// Look up each pada against the vocabulary library built from the existing
// decoded corpus. Returns wordParsings + a confidence map.
function lookupParsings(padas) {
  const vocab = buildVocabulary();
  const byWord = new Map(vocab.map((v) => [v.word, v]));

  const wordParsings = {};
  const confidence = {};
  for (const word of padas) {
    if (byWord.has(word)) {
      const entry = byWord.get(word);
      if (entry.parsing) {
        wordParsings[word] = entry.parsing;
        confidence[word] = 'high'; // exact match in known corpus
      }
    } else {
      confidence[word] = 'unknown';
    }
  }
  return { wordParsings, confidence };
}

// Public: turn a mool string into a stub.
export function autoDecode(mool) {
  if (!mool || typeof mool !== 'string' && !Array.isArray(mool)) {
    return null;
  }
  const moolStr = Array.isArray(mool) ? mool.join('\n') : mool;
  if (!moolStr.trim()) return null;

  const { padas, sandhiNotes, lines } = extractPadas(mool);
  const { wordParsings, confidence } = lookupParsings(padas);

  // Detect candidate finite verbs by ending signal.
  const finiteVerbs = [];
  for (const word of padas) {
    const fv = classifyFiniteVerb(word);
    if (fv) finiteVerbs.push(fv);
  }

  return {
    mool: lines,
    padaccheda: padas,
    sandhiNotes,
    samasNotes: [],
    finiteVerbs,
    nonFinite: [],
    vibhaktiNotes: [],
    keyFights: [],
    anvaya: '',
    hindi: '',
    english: '',
    references: { translations: [], commentaries: [] },
    wordParsings,
    _confidence: {
      padaccheda: 'medium',     // sandhi engine has limitations
      finiteVerbs: 'low',       // signal-based; needs audit
      wordParsings: 'mixed',    // see per-word confidence map
      everythingElse: 'empty',  // user must fill
    },
    _wordConfidence: confidence,
  };
}

// Format a stub as a JS object literal suitable for paste into verses.js.
export function stubToJs(stub, opts = {}) {
  const { chapter = '?', verse = '?', decodeIndex = '?', speaker = '', title = '' } = opts;
  const indent = (s, n = 6) => s.split('\n').map((line) => ' '.repeat(n) + line).join('\n');

  function arr(items, render = (x) => JSON.stringify(x)) {
    if (!items || items.length === 0) return '[]';
    return '[\n' + items.map((it) => '      ' + render(it) + ',').join('\n') + '\n    ]';
  }

  const lines = [];
  lines.push('  {');
  lines.push(`    chapter: ${chapter},`);
  lines.push(`    verse: ${verse},`);
  if (speaker) lines.push(`    speaker: ${JSON.stringify(speaker)},`);
  if (title) lines.push(`    title: ${JSON.stringify(title)},`);
  lines.push(`    decodeIndex: ${decodeIndex},`);
  lines.push(`    mool: ${arr(stub.mool)},`);
  lines.push(`    padaccheda: ${arr(stub.padaccheda)},`);
  lines.push(`    sandhiNotes: ${arr(stub.sandhiNotes)},`);
  lines.push(`    samasNotes: [], // TODO: classify each compound`);
  lines.push(`    finiteVerbs: ${arr(stub.finiteVerbs, JSON.stringify)},`);
  lines.push(`    nonFinite: [],`);
  lines.push(`    vibhaktiNotes: [], // TODO`);
  lines.push(`    keyFights: [], // TODO`);
  lines.push(`    anvaya: '', // TODO`);
  lines.push(`    hindi: '', // TODO`);
  lines.push(`    english: '', // TODO`);
  lines.push(`    wordParsings: {`);
  for (const [word, p] of Object.entries(stub.wordParsings)) {
    lines.push(`      ${JSON.stringify(word)}: ${JSON.stringify(p)},`);
  }
  lines.push(`    },`);
  lines.push('  },');
  return lines.join('\n');
}
