// Extract every unique hyphenated compound from the Gītā corpus that is
// NOT yet covered by KNOWN_SAMASAS. For each one, pull verse context
// (chapter.verse + the verse mool line containing it) so the analyser
// has enough to decide तत्पुरुष vs बहुव्रीहि vs द्वंद्व etc.
//
// Output: a JSON file at scripts/_unknown_compounds.json with shape:
//   {
//     "काम-भोग-अर्थम्": {
//       stem: "काम-भोग-अर्थ",            // case-stripped key for KNOWN_SAMASAS
//       count: 1,
//       refs: ["16.12"],
//       mool: ["कामम् आश्रित्य दुष्पूरं दम्भ-मान-मद-अन्विताः। ... काम-भोग-अर्थम् ..."],
//       members: [{ form: "काम", lemma: "...", pos: "NOUN", gloss: "..." }, ...],
//       headRoot: "अर्थ",                  // DCS lemma of the final member
//       headCase: "dvi",                   // DCS case of the final member
//     },
//     ...
//   }
//
// Run with: node scripts/extract-unknown-compounds.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.join(__dirname, '..');

const OUT_FILE = path.join(__dirname, '_unknown_compounds.json');

async function main() {
  // Avoid hydrate.js (it imports a .json which raw Node ESM can't load
  // without an attribute). Read the JSON directly and merge the data
  // inline — same fields we need (padaccheda, wordParsings.members,
  // root, case, gender, number).
  const { VERSES } = await import(path.join(REPO_ROOT, 'src/data/verses.js'));
  const { KNOWN_SAMASAS } = await import(path.join(REPO_ROOT, 'src/data/_known_samasas.js'));
  const DCS = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'src/data/dcs-padaccheda.json'), 'utf-8'));

  // Mirror hydrate.js tryKnown: try DCS-lemma-stem first, then surface
  // case-stripping, then dehyphenated.
  const stripCase = (pada) =>
    pada.replace(/(ाभ्याम्|ेभ्यः|ेषु|ास्|ासः|ानाम्|ाणाम्|योः|ाय|ात्|ाः|यः|ाम्|ान्|ेन|ेण|ौ|ाः|ाणि|ानि|ेः|ैः|े|्|म्|ः|ा|ि|ी|ु|ू|ो|ै)$/, '');

  const known = new Set(Object.keys(KNOWN_SAMASAS));
  const VARGA_NASAL = {'क':'ङ','ख':'ङ','ग':'ङ','घ':'ङ','ङ':'ङ','च':'ञ','छ':'ञ','ज':'ञ','झ':'ञ','ञ':'ञ','ट':'ण','ठ':'ण','ड':'ण','ढ':'ण','ण':'ण','त':'न','थ':'न','द':'न','ध':'न','न':'न','प':'म','फ':'म','ब':'म','भ':'म','म':'म'};
  const NASAL_TO_VARGA = {'ङ':['क','ख','ग','घ','ङ'],'ञ':['च','छ','ज','झ','ञ'],'ण':['ट','ठ','ड','ढ','ण'],'न':['त','थ','द','ध','न'],'म':['प','फ','ब','भ','म']};
  const toParasvarna = (s) => s.replace(/ं([क-म])/g, (_, c) => VARGA_NASAL[c] ? VARGA_NASAL[c] + '्' + c : 'ं' + c);
  const toAnusvara = (s) => s.replace(/([ङञणनम])्([क-म])/g, (m, n, c) => (NASAL_TO_VARGA[n] || []).includes(c) ? 'ं' + c : m);
  const has = (k) => known.has(k) || known.has(toParasvarna(k)) || known.has(toAnusvara(k));
  const isKnown = (pada, parsing) => {
    if (has(pada)) return true;
    const m = parsing?.members;
    if (Array.isArray(m) && m.length >= 2 && m.length <= 5) {
      const total = 1 << m.length;
      for (let mask = 0; mask < total; mask++) {
        const parts = m.map((mem, i) => {
          const useLemma = (mask >> i) & 1;
          return useLemma && mem.lemma ? mem.lemma : mem.form;
        });
        if (has(parts.join('-'))) return true;
      }
    }
    const stem = stripCase(pada);
    if (has(stem)) return true;
    if (has(stem.replace(/-/g, ''))) return true;
    return false;
  };

  const compounds = new Map();
  for (const v of VERSES) {
    const key = `${v.chapter}.${v.verse}`;
    const dcsEntry = DCS[key];
    // The padaccheda + wordParsings the user sees in the deployed app come
    // from DCS for auto-stub verses (DCS overrides the engine). Use the
    // verse's padaccheda if hand-curated, otherwise fall back to DCS.
    const padaccheda = (v.padaccheda && v.padaccheda.length > 0) ? v.padaccheda : (dcsEntry?.padaccheda || []);
    const wordParsings = { ...(dcsEntry?.wordParsings || {}), ...(v.wordParsings || {}) };
    for (const w of padaccheda) {
      if (typeof w !== 'string' || !w.includes('-')) continue;
      const parsing = wordParsings[w];
      if (isKnown(w, parsing)) continue;
      if (!compounds.has(w)) {
        compounds.set(w, {
          stem: stripCase(w),
          count: 0,
          refs: [],
          mool: [],
          members: null,
          headRoot: null,
          headCase: null,
          headGender: null,
          headNumber: null,
        });
      }
      const entry = compounds.get(w);
      entry.count++;
      if (!entry.refs.includes(key)) entry.refs.push(key);
      if (entry.mool.length < 2 && Array.isArray(v.mool)) {
        for (const line of v.mool) {
          if (entry.mool.length >= 2) break;
          if (!entry.mool.includes(line)) entry.mool.push(line);
        }
      }
      if (!entry.members) {
        const parsing = wordParsings[w];
        if (parsing?.members) entry.members = parsing.members;
        if (parsing?.root) entry.headRoot = parsing.root;
        if (parsing?.case) entry.headCase = parsing.case;
        if (parsing?.gender) entry.headGender = parsing.gender;
        if (parsing?.number) entry.headNumber = parsing.number;
      }
    }
  }

  // Sort by frequency descending, then alphabetical.
  const entries = [...compounds.entries()].sort((a, b) => {
    if (b[1].count !== a[1].count) return b[1].count - a[1].count;
    return a[0].localeCompare(b[0]);
  });

  // Emit as ordered object.
  const out = {};
  for (const [w, e] of entries) out[w] = e;
  fs.writeFileSync(OUT_FILE, JSON.stringify(out, null, 2));

  console.log(`${entries.length} unique compounds need analysis.`);
  console.log(`Top 20 by frequency:`);
  for (const [w, e] of entries.slice(0, 20)) {
    console.log(`  ${e.count}x  ${w}  (${e.refs.slice(0, 3).join(', ')})`);
  }
  console.log(`\nWrote → ${OUT_FILE}`);
  console.log(`Size: ${(fs.statSync(OUT_FILE).size / 1024).toFixed(1)} KB`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
