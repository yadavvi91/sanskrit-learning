#!/usr/bin/env node
// Pass 2: convert any remaining `root: '...'` entries that contain ZERO
// Devanagari characters to Devanagari. The first pass missed these because
// the regex required the root to START with [a-zA-Z]; entries like
// `root: '√bhu'` (start with √) leaked through. This pass catches:
//   - root: '√bhu'      → root: '√भू'
//   - root: '-ti'       → leaves as-is (audit fragment, non-Devanagari)
//   - root: 'kr'        → root: 'कृ'
// Entries that already have ANY Devanagari char are left alone — those
// are fine even if they have Latin parentheticals like '(causative)'.

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const DIR = new URL('../src/data/', import.meta.url).pathname;

const PAIRS = [
  ['kh', 'ख'], ['gh', 'घ'], ['ch', 'च्ह'], ['jh', 'झ'],
  ['th', 'थ'], ['dh', 'ध'], ['ph', 'फ'], ['bh', 'भ'],
  ['sh', 'श'],
  ['ng', 'ङ'], ['ny', 'ञ'],
  ['aa', 'आ'], ['ii', 'ई'], ['uu', 'ऊ'], ['ee', 'ई'],
  ['ai', 'ऐ'], ['au', 'औ'],
  ['k', 'क'], ['g', 'ग'], ['c', 'च'], ['j', 'ज'],
  ['t', 'त'], ['d', 'द'], ['n', 'न'],
  ['p', 'प'], ['b', 'ब'], ['m', 'म'],
  ['y', 'य'], ['r', 'र'], ['l', 'ल'], ['v', 'व'],
  ['s', 'स'], ['h', 'ह'],
  ['a', 'अ'], ['i', 'इ'], ['u', 'उ'], ['e', 'ए'], ['o', 'ओ'],
];

const CONSONANT_DEVA = new Set([
  'क','ख','ग','घ','ङ','च','छ','ज','झ','ञ','ट','ठ','ड','ढ','ण',
  'त','थ','द','ध','न','प','फ','ब','भ','म','य','र','ल','व','श','ष','स','ह',
]);
const VOWEL_TO_MATRA = {
  'अ': '', 'आ': 'ा', 'इ': 'ि', 'ई': 'ी', 'उ': 'ु', 'ऊ': 'ू',
  'ऋ': 'ृ', 'ए': 'े', 'ऐ': 'ै', 'ओ': 'ो', 'औ': 'ौ',
};

function transliterateWord(word) {
  let work = word.toLowerCase();
  let out = '';
  while (work.length > 0) {
    let matched = false;
    for (const [latin, deva] of PAIRS) {
      if (work.startsWith(latin)) { out += deva; work = work.slice(latin.length); matched = true; break; }
    }
    if (!matched) { out += work[0]; work = work.slice(1); }
  }
  let final = '';
  const chars = Array.from(out);
  for (let i = 0; i < chars.length; i++) {
    const cur = chars[i], next = chars[i + 1];
    if (CONSONANT_DEVA.has(cur)) {
      if (next && VOWEL_TO_MATRA[next] !== undefined) { final += cur + VOWEL_TO_MATRA[next]; i++; }
      else if (next && CONSONANT_DEVA.has(next)) { final += cur + '्'; }
      else if (!next) { final += cur + '्'; }
      else { final += cur; }
    } else { final += cur; }
  }
  return final;
}

// Hand-curated corrections for the √-prefixed dhātu Latin → Devanagari.
// The mechanical converter produces "श्भू" etc. (missing diacritics); these
// fix the common roots to their proper Sanskrit dhātu forms.
const ROOT_CORRECTIONS = {
  'भू': 'भू', 'विद्': 'विद्', 'क्र्': 'कृ', 'क्र': 'कृ',
  'द्विस्': 'द्विष्', 'मुच्': 'मुच्', 'लभ्': 'लभ्', 'विसिस्': 'वि+शिष्',
  'स्म्र्': 'स्मृ', 'स्रु': 'श्रु', 'इङ्': 'इङ्ग्', 'लिप्': 'लिप्',
  'दह्': 'दह्', 'भज्': 'भज्', 'भ्र्': 'भृ', 'भ्रम्': 'भ्रम्', 'भुज्': 'भुज्',
  'ब्रु': 'ब्रू', 'बुध्': 'बुध्', 'चल्': 'चल्', 'चि': 'चि', 'द': 'दा',
  'धा': 'धा', 'द्र्स्': 'दृश्', 'अह्': 'अह्', 'अप्': 'आप्', 'अस्': 'अस्',
  'बन्ध्': 'बन्ध्', 'या': 'या', 'जि': 'जि', 'ज्ना': 'ज्ञा', 'ह्र्': 'हृ',
  'इस्': 'इष्', 'ग्र्ह्': 'ग्रह्', 'हन्': 'हन्', 'कम्प्': 'कम्प्',
  'क्र्': 'कृ', 'क्ष्': 'क्ष्', 'क्षम्': 'क्षम्', 'क्षल्': 'क्षाल्',
  'क्षिप्': 'क्षिप्', 'मन्': 'मन्', 'म्र्': 'मृ', 'न्र्त्': 'नृत्',
  'पच्': 'पच्', 'पठ्': 'पठ्', 'पत्': 'पत्', 'पद्': 'पद्', 'प्र्च्ह्': 'प्रच्छ्',
  'प्रिय्': 'प्री', 'प्र्': 'पॄ', 'पुस्': 'पुष्', 'पुज्': 'पूज्',
  'रच्': 'रच्', 'रम्': 'रम्', 'रुह्': 'रुह्', 'रुद्': 'रुद्',
  'सद्': 'सद्', 'सह्': 'सह्', 'सेव्': 'सेव्', 'सिज्': 'सृज्',
  'स्मि': 'स्मि', 'स्था': 'स्था', 'स्तु': 'स्तु', 'स्व्र्': 'स्वृ',
  'स्व्र्ज्': 'सृज्', 'स्व्र्प्': 'स्वप्',
  'तप्': 'तप्', 'त्यज्': 'त्यज्', 'उच्': 'उच्', 'उद्': 'उद्',
  'वच्': 'वच्', 'वद्': 'वद्', 'वाह्': 'वह्', 'वर्धन्': 'वर्धन्',
  'विश्': 'विश्', 'व्र्ज्': 'वृज्', 'व्र्त्': 'वृत्', 'व्र्द्ह्': 'वृध्',
  'यज्': 'यज्', 'यम्': 'यम्', 'युध्': 'युध्',
};

const files = readdirSync(DIR)
  .filter((f) => /\.js$/.test(f) && !/test/.test(f))
  .sort();

let totalChanged = 0;
const unmapped = new Set();
for (const f of files) {
  const path = join(DIR, f);
  const src = readFileSync(path, 'utf8');
  let changed = 0;
  const out = src.replace(/root: '([^']+)'/g, (match, root) => {
    // Skip if it already has any Devanagari character.
    if (/[ऀ-ॿ]/.test(root)) return match;
    // Skip empty / weird cases.
    if (!root.trim() || root.length < 1) return match;
    // Handle √-prefixed roots specifically.
    if (root.startsWith('√')) {
      const latin = root.slice(1);
      const mech = transliterateWord(latin);
      const corrected = ROOT_CORRECTIONS[mech] || mech;
      changed++;
      return `root: '√${corrected}'`;
    }
    // Skip leading-hyphen audit fragments like '-ti', '-tra'.
    if (root.startsWith('-')) return match;
    // Plain Latin compound: transliterate via the same pipeline.
    const parts = root.split(/[-+\s]/);
    const sep = root.match(/[-+\s]/)?.[0] || '-';
    const newRoot = parts.map((p) => {
      if (!p) return p;
      const mech = transliterateWord(p);
      return ROOT_CORRECTIONS[mech] || mech;
    }).join(sep);
    if (newRoot !== root) {
      changed++;
      return `root: '${newRoot}'`;
    }
    return match;
  });
  if (changed > 0) {
    writeFileSync(path, out);
    console.log(`${f}: ${changed} root conversions`);
    totalChanged += changed;
  }
}
console.log(`\nTotal: ${totalChanged} Latin-only roots converted`);
if (unmapped.size > 0) {
  console.log('\nUnmapped (need manual review):', [...unmapped].sort());
}
