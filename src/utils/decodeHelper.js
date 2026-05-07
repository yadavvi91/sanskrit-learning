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
  // लङ् (past, augmented)
  { match: /^अ.+त्$/, lakara: 'lan', hint: 'past with अ- augment + -त्' },
  { match: /^अ.+न्$/, lakara: 'lan', purusha: 'prathama', vachana: 'bahu', hint: 'past plural -न्' },
  { match: /^अ.+त$/,  lakara: 'lan', pada: 'A', hint: 'past आत्मनेपद with अ- augment' },
];

function classifyFiniteVerb(form) {
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
  return null;
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
    if (!r || r.length === 0) {
      padas.push(chunk);
      continue;
    }
    const parts = r[0].parts;
    if (parts.length === 1) {
      padas.push(chunk);
    } else {
      padas.push(...parts);
      const ruleNames = r[0].rules.map((rule) => rule.name).join(' + ');
      sandhiNotes.push(`${chunk} = ${parts.join(' + ')} (${ruleNames})`);
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
