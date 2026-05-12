// Apply audit-agent fixes from /tmp/bg-fixes/bg{N}.json to the
// per-chapter vyakhya JSONs in src/data/_bg{N}_vyakhya.json.
//
// Fix format (per chapter file):
//   {
//     "1.3": { "fixes": [
//       { "match_title": "...", "new_title": "...", "new_body": "...", "reason": "..." }
//     ] }
//   }
//
// Matching: title exact-match. If a fix specifies new_title and/or
// new_body, those replace the existing entry's fields. reason is only
// logged (not stored).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, '..');
const FIXES_DIR = '/tmp/bg-fixes';

let totalFixes = 0, totalUnmatched = 0;

for (let n = 1; n <= 18; n++) {
  if ([3, 12, 15].includes(n)) continue;  // hand-written, no agent audit
  const fixPath = path.join(FIXES_DIR, `bg${n}.json`);
  const srcPath = path.join(REPO_ROOT, `src/data/_bg${n}_vyakhya.json`);
  if (!fs.existsSync(fixPath)) {
    console.log(`BG ${n}: no fix file — skipping`);
    continue;
  }
  const fixes = JSON.parse(fs.readFileSync(fixPath, 'utf-8'));
  const src = JSON.parse(fs.readFileSync(srcPath, 'utf-8'));
  let chapterFixCount = 0, chapterUnmatched = 0;
  for (const [verseKey, payload] of Object.entries(fixes)) {
    const entries = src[verseKey];
    if (!Array.isArray(entries)) {
      console.warn(`  ${verseKey}: no entries in source — skipping`);
      continue;
    }
    for (const fix of payload.fixes || []) {
      const target = entries.find((e) => (e?.title || '').trim() === (fix.match_title || '').trim());
      if (!target) {
        chapterUnmatched++;
        console.warn(`  ${verseKey}: no entry with title "${fix.match_title}" — UNMATCHED`);
        continue;
      }
      if (fix.new_title) target.title = fix.new_title;
      if (fix.new_body)  target.body  = fix.new_body;
      chapterFixCount++;
      console.log(`  ${verseKey}: fixed "${fix.match_title}" (${fix.reason || 'no reason given'})`);
    }
  }
  if (chapterFixCount > 0 || chapterUnmatched > 0) {
    fs.writeFileSync(srcPath, JSON.stringify(src, null, 2));
    console.log(`BG ${n}: ${chapterFixCount} fixes applied, ${chapterUnmatched} unmatched`);
  } else {
    console.log(`BG ${n}: clean (no fixes needed)`);
  }
  totalFixes += chapterFixCount;
  totalUnmatched += chapterUnmatched;
}

console.log(`\nTotal: ${totalFixes} fixes applied, ${totalUnmatched} unmatched.`);
