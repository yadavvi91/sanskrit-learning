// Auto-enrich vibhaktiNotes + keyFights for every verse from DCS data.
//
// DCS already provides case/number/gender for every pada and lakāra/
// puruṣa/vacana for every finite verb. This script generates notes for
// every word that doesn't yet have one, using the DCS morphology.
//
// Output: scripts/_enriched_vibhakti.json — a per-verse patch that
// hydrate.js can merge in (or we can fold directly into verses.js).
//
// Run: node scripts/enrich-vibhakti-keyfights.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, '..');

const CASE_DEVA = {
  pra: 'प्रथमा', dvi: 'द्वितीया', tri: 'तृतीया', cha: 'चतुर्थी',
  pan: 'पञ्चमी', sha: 'षष्ठी', sap: 'सप्तमी', sam: 'सम्बोधन',
};
const CASE_ROLE = {
  pra: 'subject / nominative',
  dvi: 'object / accusative',
  tri: 'instrument or means / instrumental',
  cha: 'recipient / dative',
  pan: 'source / ablative',
  sha: 'possessor / genitive',
  sap: 'location or context / locative',
  sam: 'address (vocative) — not a participant in the action',
};
const NUM_DEVA = { eka: 'एकवचन', dvi: 'द्विवचन', bahu: 'बहुवचन' };
const GENDER_DEVA = { m: 'पुं.', f: 'स्त्री.', n: 'नपुं.' };
const LAKARA_DEVA = {
  lat: 'लट् (present)', lan: 'लङ् (past)', lrt: 'लृट् (future)',
  lot: 'लोट् (imperative)', vidhilin: 'विधिलिङ् (optative)',
};
const PURUSHA_DEVA = {
  prathama: 'प्रथम (3rd)', madhyama: 'मध्यम (2nd)', uttama: 'उत्तम (1st)',
};

function vibhaktiNote(form, parsing) {
  if (!parsing) return null;
  // Verbs handled separately as keyFights
  if (parsing.category === 'verb') return null;
  const c = CASE_DEVA[parsing.case];
  if (!c) return null;
  const n = NUM_DEVA[parsing.number];
  const g = GENDER_DEVA[parsing.gender];
  const role = CASE_ROLE[parsing.case] || '';
  const morph = [c, n, g].filter(Boolean).join(' ');
  return `${form} → ${morph} (${role})`;
}

function keyFightNote(form, parsing) {
  if (!parsing || parsing.category !== 'verb') return null;
  // Skip non-finite (participles, absolutives, infinitives — those are kṛdanta)
  if (parsing.kind) return null;
  const l = LAKARA_DEVA[parsing.lakara];
  const p = PURUSHA_DEVA[parsing.purusha];
  const n = NUM_DEVA[parsing.number];
  const parts = [l, p, n].filter(Boolean);
  if (parts.length === 0) return null;
  const root = parsing.root || '?';
  return `${form} = ${root} + ${parts.join(' + ')} — finite verb anchor`;
}

async function main() {
  const { VERSES } = await import(path.join(REPO_ROOT, 'src/data/verses.js'));
  const DCS = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'src/data/dcs-padaccheda.json'), 'utf-8'));

  const patches = {};
  let totalNewVibhakti = 0, totalNewKeyFights = 0, versesPatched = 0;

  for (const v of VERSES) {
    const key = `${v.chapter}.${v.verse}`;
    const dcs = DCS[key];
    if (!dcs) continue;

    const existingVibhakti = new Set((v.vibhaktiNotes || []).map((n) => String(n).split('→')[0].trim().split(/[\s,]/)[0]));
    const existingKeyFights = new Set((v.keyFights || []).map((n) => String(n).split(/[=→ ]/)[0].trim()));

    const newVibhakti = [];
    const newKeyFights = [];

    const padas = (v.padaccheda && v.padaccheda.length > 0) ? v.padaccheda : (dcs.padaccheda || []);
    for (const pada of padas) {
      const parsing = v.wordParsings?.[pada] || dcs.wordParsings?.[pada];
      if (!parsing) continue;

      // Pick a form for matching — strip hyphens for compounds
      const head = pada.split('-').pop();

      const vNote = vibhaktiNote(pada, parsing);
      if (vNote && !existingVibhakti.has(pada) && !existingVibhakti.has(head)) {
        newVibhakti.push(vNote);
        existingVibhakti.add(pada);
      }

      const kFight = keyFightNote(pada, parsing);
      if (kFight && !existingKeyFights.has(pada) && !existingKeyFights.has(head)) {
        newKeyFights.push(kFight);
        existingKeyFights.add(pada);
      }
    }

    if (newVibhakti.length > 0 || newKeyFights.length > 0) {
      patches[key] = { vibhaktiNotes: newVibhakti, keyFights: newKeyFights };
      totalNewVibhakti += newVibhakti.length;
      totalNewKeyFights += newKeyFights.length;
      versesPatched++;
    }
  }

  fs.writeFileSync(
    path.join(__dirname, '_enriched_vibhakti.json'),
    JSON.stringify(patches, null, 2)
  );

  console.log(`Verses patched: ${versesPatched} / ${VERSES.length}`);
  console.log(`New vibhaktiNotes: ${totalNewVibhakti}`);
  console.log(`New keyFights: ${totalNewKeyFights}`);
  console.log(`Sample BG 15.1:`, JSON.stringify(patches['15.1'] || {}, null, 2).slice(0, 800));
}

main().catch(err => { console.error(err); process.exit(1); });
