// One-shot fix: BG 13 interpretive notes were authored against DCS's
// recension (34 verses, omitting the interpolated 13.1 "prakṛtim
// puruṣam"). After we standardized on verses.js's 35-verse recension,
// every interp key for chapter 13 is off-by-one — 13.N's content
// belongs to verses.js's 13.(N+1).
//
// This script rewrites _interp_part3.js: shifts keys 13.1..13.34 → 13.2..13.35,
// drops the colophon-placeholder 13.35.
//
// Run once: node scripts/shift-bg13-interp.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FILE = path.join(__dirname, '..', 'src/data/_interp_part3.js');

let text = fs.readFileSync(FILE, 'utf-8');

// First: drop the 13.35 colophon placeholder entry entirely. Match the
// whole entry: from "  '13.35': {" through its closing "  },".
const placeholderRe = /\n  '13\.35':\s*\{[^]*?\n  \},?/;
const placeholderMatch = text.match(placeholderRe);
if (placeholderMatch) {
  console.log(`Removing 13.35 placeholder (${placeholderMatch[0].length} chars):`);
  console.log(placeholderMatch[0].slice(0, 200) + '...');
  text = text.replace(placeholderRe, '');
} else {
  console.warn('13.35 placeholder not matched — already removed?');
}

// Now shift 13.1..13.34 → 13.2..13.35. Do in REVERSE order so we don't
// double-rename (e.g., if we rename 13.1 → 13.2 first, the next pass
// would see the new 13.2 and rename it again).
for (let n = 34; n >= 1; n--) {
  const oldKey = `'13.${n}':`;
  const newKey = `'13.${n + 1}':`;
  if (!text.includes(oldKey)) {
    console.warn(`Key ${oldKey} not found — skipping.`);
    continue;
  }
  text = text.replace(oldKey, newKey);
}

fs.writeFileSync(FILE, text);
console.log('\nShift complete. BG 13 keys are now 13.2 .. 13.35 (13.1 has no interp).');
