// Auto-derive structural vyakhya entries from DCS data + KNOWN_SAMASAS.
//
// Vyakhya is the "what makes this verse tick" section — full-tier verses
// have 4-7 entries of interpretive commentary (the participle trap of
// समवेताः, विधिलिङ् as rhetorical horror, etc.). That kind of insight
// can't be auto-generated.
//
// But STRUCTURAL vyakhya — "this verse has N compounds of these types",
// "the finite verb is X", "Y is a participle / absolutive / infinitive
// not the main verb" — can be derived from the DCS morphology that we
// already have on every word. That gives every auto-stub verse 2-3
// extra structural entries on top of whatever interpretive note it
// already has.
//
// Output: scripts/_enriched_vyakhya.json
//
// Run: node scripts/enrich-vyakhya.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, '..');

const LAKARA_LABEL = {
  lat: 'लट् (present)',
  lan: 'लङ् (past)',
  lrt: 'लृट् (future)',
  lot: 'लोट् (imperative)',
  vidhilin: 'विधिलिङ् (optative)',
};

function compoundArchitecture(v) {
  // List the verse's compounds with their type, from samasNotes.
  const compounds = (v.samasNotes || []).filter((s) => s.compound && s.type);
  if (compounds.length === 0) return null;
  const lines = compounds.slice(0, 5).map((s) => {
    const t = s.type.split('(')[0].trim();
    return `${s.compound} — ${t}`;
  });
  const extra = compounds.length > 5 ? ` (and ${compounds.length - 5} more)` : '';
  return {
    title: `Compound architecture (${compounds.length})`,
    body: `${lines.join(' · ')}${extra}. Click each compound chip above for vigraha + meaning.`,
  };
}

function finiteVerbAnchor(v) {
  const fvs = v.finiteVerbs || [];
  if (fvs.length === 0) {
    return {
      title: 'Nominal verse (no finite verb)',
      body: 'No finite verb in this verse — the sentence runs on implied अस्ति or a predicate participle. The "verb" of the verse is whichever predicate-adjective or participle is doing the anchoring.',
    };
  }
  if (fvs.length === 1) {
    const fv = fvs[0];
    const lak = LAKARA_LABEL[fv.lakara] || fv.lakara || '?';
    return {
      title: 'Finite verb anchor',
      body: `${fv.form} (${fv.root || '?'} + ${lak} + ${fv.purusha || '?'} + ${fv.vachana || '?'}) is the verse's only finite verb. Every other verb-shaped word is a participle (कृदन्त), absolutive (-त्वा), or infinitive (-तुम्) — orbiting this anchor, not replacing it.`,
    };
  }
  const lines = fvs.slice(0, 4).map((fv) => {
    const lak = LAKARA_LABEL[fv.lakara] || fv.lakara || '?';
    return `${fv.form} (${lak})`;
  });
  return {
    title: `${fvs.length} finite verbs`,
    body: `${lines.join(' · ')}. Multiple finite verbs mean multiple clauses — each verb anchors its own action. Trace which subject goes with which verb via case agreement.`,
  };
}

function krdantaLayer(v, dcsParsings) {
  const krdantas = [];
  for (const pada of v.padaccheda || []) {
    const p = v.wordParsings?.[pada] || dcsParsings?.[pada];
    if (!p) continue;
    if (p.category !== 'krdanta') continue;
    let label = 'participle';
    if (p.kind === 'absolutive') label = 'absolutive (-त्वा/-य)';
    else if (p.kind === 'infinitive') label = 'infinitive (-तुम्)';
    else if (p.kind === 'past-passive-participle') label = 'PPP';
    krdantas.push({ form: pada, label, root: p.root });
  }
  if (krdantas.length === 0) return null;
  const lines = krdantas.slice(0, 5).map((k) =>
    `${k.form} (${k.label}${k.root && k.root !== k.form ? `, < ${k.root}` : ''})`
  );
  const extra = krdantas.length > 5 ? ` (+ ${krdantas.length - 5} more)` : '';
  return {
    title: `Kṛdanta layer (${krdantas.length})`,
    body: `${lines.join(' · ')}${extra}. These verb-derived words LOOK like verbs but don't anchor the sentence — they modify nouns (PPPs), chain actions (absolutives), or name actions (infinitives).`,
  };
}

function caseDistribution(v, dcsParsings) {
  const cases = {};
  for (const pada of v.padaccheda || []) {
    const p = v.wordParsings?.[pada] || dcsParsings?.[pada];
    if (!p?.case) continue;
    cases[p.case] = (cases[p.case] || 0) + 1;
  }
  if (Object.keys(cases).length < 2) return null;
  const CASE_DEVA = { pra: 'प्रथमा', dvi: 'द्वितीया', tri: 'तृतीया', cha: 'चतुर्थी', pan: 'पञ्चमी', sha: 'षष्ठी', sap: 'सप्तमी', sam: 'सम्बोधन' };
  const sorted = Object.entries(cases).sort((a, b) => b[1] - a[1]);
  const lines = sorted.map(([c, n]) => `${CASE_DEVA[c] || c}×${n}`);
  return {
    title: 'Case-role distribution',
    body: `${lines.join(' · ')}. The dominant case usually tells you the verse's grammatical centre of gravity — multiple प्रथमा means coordinated subjects; multiple सप्तमी means the verse is about locations/contexts; multiple द्वितीया means the action has many objects.`,
  };
}

async function main() {
  const { VERSES } = await import(path.join(REPO_ROOT, 'src/data/verses.js'));
  const { KNOWN_SAMASAS } = await import(path.join(REPO_ROOT, 'src/data/_known_samasas.js'));
  const DCS = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'src/data/dcs-padaccheda.json'), 'utf-8'));

  const patches = {};
  let totalAdded = 0, versesPatched = 0;

  for (const v of VERSES) {
    const key = `${v.chapter}.${v.verse}`;
    const dcs = DCS[key];
    if (!dcs) continue;

    // Use DCS data when v doesn't have pre-hydration data
    const verseLike = {
      padaccheda: (v.padaccheda && v.padaccheda.length > 0) ? v.padaccheda : (dcs.padaccheda || []),
      wordParsings: { ...(dcs.wordParsings || {}), ...(v.wordParsings || {}) },
      finiteVerbs: (v.finiteVerbs && v.finiteVerbs.length > 0) ? v.finiteVerbs : (dcs.finiteVerbs || []),
      samasNotes: v.samasNotes || [],  // populated only post-hydration; will be empty here
    };

    // Build candidate vyakhya entries
    const candidates = [];
    const arch = compoundArchitecture(verseLike);
    if (arch) candidates.push(arch);
    const fv = finiteVerbAnchor(verseLike);
    if (fv) candidates.push(fv);
    const kr = krdantaLayer(verseLike, dcs.wordParsings);
    if (kr) candidates.push(kr);
    // Case-role distribution removed (user complaint): the histogram was
    // redundant with the vibhakti section, and the trailing instructional
    // sentence ("The dominant case usually tells you…") repeated verbatim
    // on every verse. The caseDistribution() function is kept above in
    // case we want a smarter "stacked-case" variant later.

    // Dedup against existing titles
    const existingTitles = new Set((v.vyakhya || []).map((e) => (e?.title || '').trim()));
    const toAdd = candidates.filter((c) => !existingTitles.has(c.title));

    if (toAdd.length > 0) {
      patches[key] = toAdd;
      totalAdded += toAdd.length;
      versesPatched++;
    }
  }

  fs.writeFileSync(
    path.join(REPO_ROOT, 'src/data/_enriched_vyakhya.json'),
    JSON.stringify(patches, null, 2)
  );

  console.log(`Verses patched: ${versesPatched} / ${VERSES.length}`);
  console.log(`New vyakhya entries: ${totalAdded}`);
  console.log(`\nSample BG 15.1 enrichment:`);
  console.log(JSON.stringify(patches['15.1'] || {}, null, 2).slice(0, 1500));
}

main().catch((err) => { console.error(err); process.exit(1); });
