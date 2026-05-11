#!/usr/bin/env node
// Walk every verse, run autoDecode + lookupSharedVocab, flag padas
// that land on a "stem not in dictionary" template gloss AND look like
// splitter fragments (short, dangling viramas, vowel-mark-initial).
// Output the source verse + chunk so we can hand-write overrides.

import { VERSES } from '../src/data/verses.js';
import { autoDecode } from '../src/utils/decodeHelper.js';
import { hydrateAutoStubVerses } from '../src/data/hydrate.js';
import { lookupSharedVocab } from '../src/data/sharedVocab.js';

hydrateAutoStubVerses();

function isFragment(pada) {
  if (typeof pada !== 'string') return false;
  // Starts with a vowel-mark → leading consonant was eaten by a previous chunk
  if (/^[ा-ौंः]/.test(pada)) return true;
  // 1-character or 2-char with virama
  if (pada.length <= 2 && pada.endsWith('्')) return true;
  if (pada.length === 1) return true;
  return false;
}

function hasTemplateGloss(pada) {
  const v = lookupSharedVocab(pada);
  if (!v) return false;
  if (v.source !== 'suffix-inferred') return false;
  return /stem not in dictionary|likely subject form/.test(v.gloss || '');
}

const verseToBugs = new Map();
for (const v of VERSES) {
  if (!v.padaccheda || v.padaccheda.length === 0) continue;
  const bugs = [];
  // Identify which chunks of mool produced fragmented padas. We can't
  // perfectly reverse-map, but we can mark verses where any pada is
  // fragmenty or has a template gloss.
  for (let i = 0; i < v.padaccheda.length; i++) {
    const pada = v.padaccheda[i];
    if (!v.wordParsings?.[pada]) {
      // Only flag if no verse-local parsing
      if (isFragment(pada) || hasTemplateGloss(pada)) {
        bugs.push({ pada, idx: i });
      }
    }
  }
  if (bugs.length > 0) {
    verseToBugs.set(`${v.chapter}.${v.verse}`, { v, bugs });
  }
}

console.log(`Verses with template-gloss or fragment padas: ${verseToBugs.size}`);
console.log('');

// Find which mool chunks are most likely the source of the fragmented padas.
// For each verse, run autoDecode fresh and identify the chunks that produced
// fragments, then print: verse + source chunk + suggested split.
console.log('=== Source chunk identification ===');
const chunks_with_bugs = [];
for (const [ref, { v, bugs }] of verseToBugs) {
  if (v.tier === 'full') continue; // skip hand-decoded
  let r;
  try { r = autoDecode(v.mool); } catch { continue; }
  if (!r?.padaccheda) continue;

  // Walk the mool chunks and re-decode each individually to find which
  // chunk produces fragment padas.
  const mool = (Array.isArray(v.mool) ? v.mool : [v.mool]).join(' ').replace(/[।॥]/g, ' ');
  const moolChunks = mool.split(/\s+/).filter(Boolean);
  for (const chunk of moolChunks) {
    let chunkR;
    try { chunkR = autoDecode([chunk]); } catch { continue; }
    if (!chunkR?.padaccheda) continue;
    const chunkBugs = chunkR.padaccheda.filter(isFragment);
    if (chunkBugs.length > 0) {
      chunks_with_bugs.push({ ref, chunk, padas: chunkR.padaccheda, bugs: chunkBugs });
    }
  }
}

console.log(`Chunks producing fragments: ${chunks_with_bugs.length}`);
console.log('');
console.log('Top 60 worst chunks (sorted by ref):');
chunks_with_bugs
  .sort((a, b) => a.ref.localeCompare(b.ref, undefined, { numeric: true }))
  .slice(0, 60)
  .forEach((c) => {
    console.log(`${c.ref}\t${c.chunk}\t→\t${c.padas.join(' | ')}`);
  });
