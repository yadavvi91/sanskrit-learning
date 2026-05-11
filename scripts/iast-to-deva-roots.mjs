#!/usr/bin/env node
// One-shot: convert every `root: 'latin-text'` entry in the bulk
// _vocab_extended_part*.js files to Devanagari. User flagged the Latin
// roots as visually inconsistent with the rest of the popover content.
//
// Conversion is plain IAST-without-diacritics → Devanagari. Some entries
// will be imperfect (a/ā collapse, t/ṭ collapse, n/ṇ collapse, etc.)
// — readable Devanagari beats consistent-looking Latin.

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const DIR = new URL('../src/data/', import.meta.url).pathname;

// Multi-character matches must run before single-char. Order matters.
const PAIRS = [
  // Aspirated consonants (2-char digraphs) — must run first.
  ['kh', 'ख'], ['gh', 'घ'], ['ch', 'च्ह'], ['jh', 'झ'],
  ['th', 'थ'], ['dh', 'ध'], ['ph', 'फ'], ['bh', 'भ'],
  ['sh', 'श'],
  // Sibilants and special.
  ['ng', 'ङ'], ['ny', 'ञ'],
  // Long vowels (rare in bulk data — usually 'a' is used for both).
  ['aa', 'आ'], ['ii', 'ई'], ['uu', 'ऊ'], ['ee', 'ई'],
  ['ai', 'ऐ'], ['au', 'औ'],
  // Plain consonants (single char).
  ['k', 'क'], ['g', 'ग'], ['c', 'च'], ['j', 'ज'],
  ['t', 'त'], ['d', 'द'], ['n', 'न'],
  ['p', 'प'], ['b', 'ब'], ['m', 'म'],
  ['y', 'य'], ['r', 'र'], ['l', 'ल'], ['v', 'व'],
  ['s', 'स'], ['h', 'ह'],
  // Vowels (singles).
  ['a', 'अ'], ['i', 'इ'], ['u', 'उ'], ['e', 'ए'], ['o', 'ओ'],
];

const CONSONANT_DEVA = new Set([
  'क','ख','ग','घ','ङ','च','छ','ज','झ','ञ','ट','ठ','ड','ढ','ण',
  'त','थ','द','ध','न','प','फ','ब','भ','म','य','र','ल','व','श','ष','स','ह',
]);
const VOWEL_TO_MATRA = {
  'अ': '',     // inherent
  'आ': 'ा',
  'इ': 'ि',
  'ई': 'ी',
  'उ': 'ु',
  'ऊ': 'ू',
  'ऋ': 'ृ',
  'ए': 'े',
  'ऐ': 'ै',
  'ओ': 'ो',
  'औ': 'ौ',
};

// Transliterate one whitespace-free Latin word to Devanagari.
function transliterateWord(word) {
  // Pass 1: greedy substitute Latin → Devanagari tokens.
  let work = word.toLowerCase();
  let out = '';
  while (work.length > 0) {
    let matched = false;
    for (const [latin, deva] of PAIRS) {
      if (work.startsWith(latin)) {
        out += deva;
        work = work.slice(latin.length);
        matched = true;
        break;
      }
    }
    if (!matched) {
      // Pass-through anything we don't recognize (digits, stray chars).
      out += work[0];
      work = work.slice(1);
    }
  }
  // Pass 2: collapse consonant+vowel-letter into consonant+matra.
  let final = '';
  const chars = Array.from(out);
  for (let i = 0; i < chars.length; i++) {
    const cur = chars[i];
    const next = chars[i + 1];
    if (CONSONANT_DEVA.has(cur)) {
      if (next && VOWEL_TO_MATRA[next] !== undefined) {
        final += cur + VOWEL_TO_MATRA[next];
        i++;
      } else if (next && CONSONANT_DEVA.has(next)) {
        // Consonant cluster: add virama.
        final += cur + '्';
      } else if (!next) {
        // Final consonant: virama (consonant stem ending).
        final += cur + '्';
      } else {
        final += cur;
      }
    } else {
      final += cur;
    }
  }
  return final;
}

// Compound: 'apahrta-cetas' → 'अपह्र्त-चेतस्' (component-wise).
function transliterate(latin) {
  return latin.split('-').map(transliterateWord).join('-');
}

const files = readdirSync(DIR)
  .filter((f) => /^_vocab_extended_part\d+\.js$/.test(f))
  .sort();

let totalChanged = 0;
for (const f of files) {
  const path = join(DIR, f);
  const src = readFileSync(path, 'utf8');
  let changed = 0;
  const out = src.replace(/root: '([a-zA-Z][a-zA-Z_\-]*)'/g, (m, latin) => {
    const deva = transliterate(latin);
    changed++;
    return `root: '${deva}'`;
  });
  if (changed > 0) {
    writeFileSync(path, out);
    console.log(`${f}: ${changed} roots converted`);
    totalChanged += changed;
  }
}
console.log(`\nTotal: ${totalChanged} roots converted to Devanagari`);
