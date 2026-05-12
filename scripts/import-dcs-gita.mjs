// Import DCS (Digital Corpus of Sanskrit) Bhagavadgītā data → JSON.
//
// Source: github.com/OliverHellwig/sanskrit (CC BY-SA 4.0)
// Path:   dcs/data/conllu/files/Mahābhārata/Mahābhārata-NNNN-MBh, 6, BhaGī N-XXXX.conllu
//
// One .conllu file per Gītā chapter (BhaGī 1 .. BhaGī 18). Each file is
// a CoNLL-U document — sentences separated by blank lines, header lines
// starting with `#`, ten tab-separated columns per token row.
//
// Output: src/data/dcs-padaccheda.json, keyed by "chapter.verse",
// each entry = { padaccheda: [...], wordParsings: { form: {lemma, vibhakti, ...} }, sandhied: "..." }.
//
// Two notes worth holding in your head while reading the code:
//
//   1. Speaker tags (X uvāca) are their own CoNLL-U sentences. They're
//      not verses — they precede the verse body. We filter them out by
//      checking the verb-lemma column.
//
//   2. The `sent_counter` header gives verse number. It's set for most
//      sentences, but ABSENT for BG 1.1 and BG 2.1-2.4. For those
//      handful we hardcode the mapping (see processChapter).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DCS_DIR = '/tmp/dcs-sanskrit/dcs/data/conllu/files/Mahābhārata';
const REPO_ROOT = path.join(__dirname, '..');
const OUT_FILE = path.join(REPO_ROOT, 'src', 'data', 'dcs-padaccheda.json');

// ----------------------------------------------------------------------
// IAST → Devanāgarī transliteration
// ----------------------------------------------------------------------
//
// State machine over the IAST string. `pending` = true means the last
// emitted character was a consonant carrying an implicit `a` vowel that
// the next character may need to cancel (virama) or replace (mātrā).

const CONSONANT_2 = ['kh','gh','ch','jh','ṭh','ḍh','th','dh','ph','bh'];
const VOWEL_2 = ['ai','au'];

const CONSONANTS = {
  k:'क', kh:'ख', g:'ग', gh:'घ', 'ṅ':'ङ',
  c:'च', ch:'छ', j:'ज', jh:'झ', 'ñ':'ञ',
  'ṭ':'ट', 'ṭh':'ठ', 'ḍ':'ड', 'ḍh':'ढ', 'ṇ':'ण',
  t:'त', th:'थ', d:'द', dh:'ध', n:'न',
  p:'प', ph:'फ', b:'ब', bh:'भ', m:'म',
  y:'य', r:'र', l:'ल', v:'व',
  'ś':'श', 'ṣ':'ष', s:'स', h:'ह',
};

const VOWELS = {
  a:'अ', 'ā':'आ',
  i:'इ', 'ī':'ई',
  u:'उ', 'ū':'ऊ',
  'ṛ':'ऋ', 'ṝ':'ॠ',
  'ḷ':'ऌ', 'ḹ':'ॡ',
  e:'ए', ai:'ऐ',
  o:'ओ', au:'औ',
};

const VOWEL_SIGNS = {
  a:'', 'ā':'ा',
  i:'ि', 'ī':'ी',
  u:'ु', 'ū':'ू',
  'ṛ':'ृ', 'ṝ':'ॄ',
  'ḷ':'ॢ', 'ḹ':'ॣ',
  e:'े', ai:'ै',
  o:'ो', au:'ौ',
};

const SPECIAL = {
  'ṃ':'ं',
  'ḥ':'ः',
  "'":'ऽ',
  '’':'ऽ',
};

const VIRAMA = '्';

// Pāṇinian parasvarna: anusvāra (ं) before a stop consonant becomes the
// nasal of that varga + virama. This matches verses.js conventions
// (सम्प्लुत, not संप्लुत).
const VARGA_NASAL = {
  'क':'ङ','ख':'ङ','ग':'ङ','घ':'ङ','ङ':'ङ',
  'च':'ञ','छ':'ञ','ज':'ञ','झ':'ञ','ञ':'ञ',
  'ट':'ण','ठ':'ण','ड':'ण','ढ':'ण','ण':'ण',
  'त':'न','थ':'न','द':'न','ध':'न','न':'न',
  'प':'म','फ':'म','ब':'म','भ':'म','म':'म',
};

function applyParasvarna(s) {
  return s.replace(/ं([क-म])/g, (_, c) => {
    const nasal = VARGA_NASAL[c];
    return nasal ? nasal + VIRAMA + c : 'ं' + c;
  });
}

export function iastToDeva(s) {
  if (!s || typeof s !== 'string') return '';
  let out = '';
  let pending = false;
  let i = 0;

  while (i < s.length) {
    // 1) 2-char consonants (kh, gh, ...)
    let matched = false;
    for (const cp of CONSONANT_2) {
      if (s.startsWith(cp, i)) {
        if (pending) out += VIRAMA;
        out += CONSONANTS[cp];
        pending = true;
        i += cp.length;
        matched = true;
        break;
      }
    }
    if (matched) continue;

    // 2) 1-char consonants
    const c = s[i];
    if (CONSONANTS[c]) {
      if (pending) out += VIRAMA;
      out += CONSONANTS[c];
      pending = true;
      i++;
      continue;
    }

    // 3) 2-char vowels (ai, au)
    for (const vp of VOWEL_2) {
      if (s.startsWith(vp, i)) {
        if (pending) {
          out += VOWEL_SIGNS[vp];
          pending = false;
        } else {
          out += VOWELS[vp];
        }
        i += vp.length;
        matched = true;
        break;
      }
    }
    if (matched) continue;

    // 4) 1-char vowels
    if (VOWELS[c]) {
      if (pending) {
        if (c !== 'a') out += VOWEL_SIGNS[c];
        pending = false;
      } else {
        out += VOWELS[c];
      }
      i++;
      continue;
    }

    // 5) Anusvāra / visarga / avagraha — attach to implicit 'a', so don't flush.
    if (SPECIAL[c]) {
      pending = false;
      out += SPECIAL[c];
      i++;
      continue;
    }

    // 6) Anything else (whitespace, punctuation, danda, latin).
    if (pending) {
      out += VIRAMA;
      pending = false;
    }
    out += c;
    i++;
  }

  if (pending) out += VIRAMA;
  return applyParasvarna(out);
}

// ----------------------------------------------------------------------
// CoNLL-U parser
// ----------------------------------------------------------------------

function parseConllu(text) {
  const sentences = [];
  let cur = null;
  for (const line of text.split('\n')) {
    if (line.startsWith('##')) continue;            // doc-level header
    if (line.startsWith('# ')) {
      const m = line.match(/^# ([\w_]+)\s*=\s*(.*)$/);
      if (m) {
        if (!cur) cur = { headers: {}, tokens: [] };
        cur.headers[m[1]] = m[2];
      }
      continue;
    }
    if (line.trim() === '') {
      if (cur && cur.tokens.length > 0) sentences.push(cur);
      cur = null;
      continue;
    }
    const cols = line.split('\t');
    if (cols.length < 10) continue;
    if (!cur) cur = { headers: {}, tokens: [] };
    const [id, form, lemma, upos, xpos, feats, head, deprel, deps, misc] = cols;
    cur.tokens.push({
      id, form, lemma, upos, xpos, feats, head, deprel, deps, misc,
      isRange: id.includes('-'),
    });
  }
  if (cur && cur.tokens.length > 0) sentences.push(cur);
  return sentences;
}

function parseFeatString(s) {
  if (!s || s === '_') return {};
  const out = {};
  for (const kv of s.split('|')) {
    const idx = kv.indexOf('=');
    if (idx === -1) continue;
    out[kv.slice(0, idx)] = kv.slice(idx + 1);
  }
  return out;
}

// ----------------------------------------------------------------------
// Speaker detection
// ----------------------------------------------------------------------
//
// A speaker tag in DCS looks like:
//   # text = saṃjayaḥ uvāca
//   1  saṃjaya  saṃjaya  NOUN  ...
//   2  uvāca    vac      VERB  ...
//
// 1-4 non-range tokens; the VERB token's lemma is one of {vac, brū}.

function isSpeakerSentence(sent) {
  const real = sent.tokens.filter((t) => !t.isRange);
  if (real.length < 2 || real.length > 4) return false;
  const verbToken = real.find((t) => t.upos === 'VERB');
  if (!verbToken) return false;
  return ['vac', 'brū'].includes(verbToken.lemma);
}

// ----------------------------------------------------------------------
// Morphology mapping (DCS FEATS → internal schema)
// ----------------------------------------------------------------------

// Legacy-schema keys (used by WordPopover / sharedVocab) — what the rest
// of the app already understands. We emit these so DCS data slots in
// without UI changes.
const CASE_TO_KEY = {
  Nom: 'pra', Acc: 'dvi', Ins: 'tri', Dat: 'cha',
  Abl: 'pan', Gen: 'sha', Loc: 'sap', Voc: 'sam',
};

const NUMBER_TO_KEY = {
  Sing: 'eka', Dual: 'dvi', Plur: 'bahu',
};

const GENDER_TO_KEY = {
  Masc: 'm', Fem: 'f', Neut: 'n',
};

const LAKARA_TO_KEY = {
  'लट्': 'lat', 'लङ्': 'lan', 'लृट्': 'lrt', 'लोट्': 'lot', 'विधिलिङ्': 'vidhilin',
};

const PURUSHA_TO_KEY = {
  'प्रथम': 'prathama', 'मध्यम': 'madhyama', 'उत्तम': 'uttama',
};

const UPOS_TO_CATEGORY = {
  NOUN: 'noun', PROPN: 'noun', ADJ: 'adjective', PRON: 'pronoun',
  VERB: 'verb',
  ADV: 'particle', PART: 'particle', ADP: 'particle',
  CCONJ: 'particle', CONJ: 'particle', SCONJ: 'particle',
  DET: 'pronoun', INTJ: 'particle', NUM: 'adjective',
};

function lakaraFromFeats(f) {
  // Imperative & optative are mood-driven; tense-driven mappings:
  //   Pres + Ind        → लट्
  //   Past + Ind        → लङ् (imperfect) or लिट् (perfect — DCS rarely tags Aspect, so default लङ्)
  //   Fut  + Ind        → लृट्
  if (f.Mood === 'Imp') return 'लोट्';
  if (f.Mood === 'Opt' || f.Mood === 'Sub') return 'विधिलिङ्';
  if (f.Tense === 'Pres') return 'लट्';
  if (f.Tense === 'Past') return 'लङ्';
  if (f.Tense === 'Fut') return 'लृट्';
  return null;
}

function purushaFromFeats(f) {
  if (f.Person === '1') return 'उत्तम';
  if (f.Person === '2') return 'मध्यम';
  if (f.Person === '3') return 'प्रथम';
  return null;
}

function tokenToParsing(token) {
  const feats = parseFeatString(token.feats);
  const misc = parseFeatString(token.misc);
  // Prefer Unsandhied (canonical form) over form (in-context surface).
  // Crucial for forms like "kūrmo" (form) vs "kūrmaḥ" (Unsandhied) — the
  // canonical citation form is what the app vocabulary indexes against.
  const surfaceIast = misc.Unsandhied || token.form;
  const formDeva = iastToDeva(surfaceIast);
  const lemmaDeva = iastToDeva(token.lemma);
  // Legacy-schema parsing (matches WordPopover / sharedVocab expectations).
  const parsing = {
    form: formDeva,
    root: lemmaDeva,
    source: 'dcs',
  };
  // POS → category
  const category = UPOS_TO_CATEGORY[token.upos];
  if (category) parsing.category = category;
  // krdanta participles get their own category (overrides 'verb')
  if (token.upos === 'VERB' && feats.VerbForm === 'Part') parsing.category = 'krdanta';
  else if (token.upos === 'VERB' && feats.VerbForm === 'Conv') parsing.category = 'krdanta';
  else if (token.upos === 'VERB' && feats.VerbForm === 'Inf') parsing.category = 'krdanta';
  // Nominal morphology
  if (feats.Case && feats.Case !== 'Cpd' && CASE_TO_KEY[feats.Case]) {
    parsing.case = CASE_TO_KEY[feats.Case];
  }
  if (feats.Number && NUMBER_TO_KEY[feats.Number]) {
    parsing.number = NUMBER_TO_KEY[feats.Number];
  }
  if (feats.Gender && GENDER_TO_KEY[feats.Gender]) {
    parsing.gender = GENDER_TO_KEY[feats.Gender];
  }
  // Verbal morphology
  if (token.upos === 'VERB' && !feats.VerbForm) {
    const lakaraDeva = lakaraFromFeats(feats);
    if (lakaraDeva && LAKARA_TO_KEY[lakaraDeva]) parsing.lakara = LAKARA_TO_KEY[lakaraDeva];
    const purushaDeva = purushaFromFeats(feats);
    if (purushaDeva && PURUSHA_TO_KEY[purushaDeva]) parsing.purusha = PURUSHA_TO_KEY[purushaDeva];
  } else if (token.upos === 'VERB' && feats.VerbForm === 'Part') {
    parsing.kind = 'past-passive-participle';  // approximation; DCS doesn't distinguish PPP from other participles in FEATS reliably
  } else if (token.upos === 'VERB' && feats.VerbForm === 'Conv') {
    parsing.kind = 'absolutive';
  } else if (token.upos === 'VERB' && feats.VerbForm === 'Inf') {
    parsing.kind = 'infinitive';
  }
  if (feats.Case === 'Cpd') parsing.isCompoundMember = true;
  // Keep Devanāgarī labels alongside (for the verse-detail page's pre-existing renderers)
  parsing.lemmaIast = token.lemma;
  parsing.pos = token.upos;
  return parsing;
}

// ----------------------------------------------------------------------
// Verse assembly
// ----------------------------------------------------------------------
//
// Coalesce consecutive Case=Cpd tokens into a single hyphenated pada,
// matching the conventions in src/data/verses.js (e.g., "धर्म-क्षेत्रे").
//
// Skip range markers (id="3-4") — they only repeat the sandhied surface
// form; the desandhied parts already appear as individual tokens 3 and 4.

// Apply at the END of a complete pada string only (after compound join).
// Canonical citation form for adverbs ending in -as/-tas is with visarga:
// "kutas" → कुतः, "sarvaśas" → सर्वशः, "tatas" → ततः.
function finalizePada(p) {
  return p.replace(/स्$/, 'ः');
}

function buildVerseEntry(verseData) {
  const padaccheda = [];
  const wordParsings = {};
  let compoundBuffer = [];
  let compoundParsingBuffer = [];

  function flushCompound(finalParsing, finalForm) {
    if (compoundBuffer.length === 0) {
      if (finalForm) {
        const norm = finalizePada(finalForm);
        padaccheda.push(norm);
        if (finalParsing && !wordParsings[norm]) wordParsings[norm] = { ...finalParsing, form: norm };
      }
      return;
    }
    compoundBuffer.push(finalForm);
    compoundParsingBuffer.push(finalParsing);
    const joined = finalizePada(compoundBuffer.join('-'));
    padaccheda.push(joined);
    // Compose a parsing for the joined form: final member's case/number/gender
    // wins; component lemmas listed together for the popover.
    const composed = {
      ...finalParsing,
      form: joined,
      members: compoundParsingBuffer.map((p) => {
        const m = { form: p.form, pos: p.pos };
        if (p.root && p.root !== p.form) m.lemma = p.root;
        return m;
      }),
    };
    if (!wordParsings[joined]) wordParsings[joined] = composed;
    compoundBuffer = [];
    compoundParsingBuffer = [];
  }

  for (const token of verseData.tokens) {
    if (token.isRange) continue;
    if (!token.form || token.form === '_') continue;
    const parsing = tokenToParsing(token);
    if (parsing.isCompoundMember) {
      compoundBuffer.push(parsing.form);
      compoundParsingBuffer.push(parsing);
    } else {
      flushCompound(parsing, parsing.form);
    }
  }
  // Dangling compound (defensive — shouldn't happen in well-annotated DCS).
  if (compoundBuffer.length > 0) {
    const joined = compoundBuffer.join('-');
    padaccheda.push(joined);
    if (!wordParsings[joined]) {
      wordParsings[joined] = {
        form: joined,
        members: compoundParsingBuffer.map((p) => {
          const m = { form: p.form, pos: p.pos };
          if (p.root && p.root !== p.form) m.lemma = p.root;
          return m;
        }),
      };
    }
  }

  // Extract finite verbs — VERB tokens with no VerbForm tag
  // (participles, absolutives, infinitives are tagged VerbForm=Part/Conv/Inf).
  const finiteVerbs = [];
  for (const token of verseData.tokens) {
    if (token.isRange) continue;
    if (!token.form || token.form === '_') continue;
    if (token.upos !== 'VERB') continue;
    const feats = parseFeatString(token.feats);
    if (feats.VerbForm) continue;  // skip non-finite verb forms
    const misc = parseFeatString(token.misc);
    const surfaceIast = misc.Unsandhied || token.form;
    const fv = {
      form: iastToDeva(surfaceIast),
      root: '√' + iastToDeva(token.lemma),
    };
    const lakara = lakaraFromFeats(feats);
    if (lakara) fv.lakara = lakara;
    const purusha = purushaFromFeats(feats);
    if (purusha) fv.purusha = purusha;
    const vachanaMap = { Sing: 'एकवचन', Dual: 'द्विवचन', Plur: 'बहुवचन' };
    if (feats.Number && vachanaMap[feats.Number]) {
      fv.vachana = vachanaMap[feats.Number];
    }
    finiteVerbs.push(fv);
  }

  const sandhied = verseData.sentTexts.map((t) => iastToDeva(t)).join(' ');
  return { padaccheda, wordParsings, finiteVerbs, sandhied };
}

// ----------------------------------------------------------------------
// Per-chapter pipeline
// ----------------------------------------------------------------------
//
// `sent_counter` reliably gives the verse number when set. But it is
// inconsistently set in BhaGī 2 (24 verses unlabelled), BhaGī 13 (one
// verse unlabelled), and possibly stray cases elsewhere. So we resolve
// each non-speaker sentence in two passes:
//
//   1. If sent_counter is set → assign to that verse.
//   2. Otherwise content-match the sentence's # text (transliterated to
//      Devanāgarī and normalised) against the verse mool from verses.js.
//      Pick the verse with the highest token-coverage score.
//
// Speaker tags (X uvāca) are filtered out regardless.

function normaliseDeva(s) {
  // Strip whitespace + danda + avagraha + visarga + anusvāra so that
  // matching is robust to small spelling/sandhi differences between
  // DCS and verses.js mool.
  return (s || '')
    .replace(/[\s।॥ःंऽ.,?!|()'"​-‍]+/g, '')
    .replace(/[०-९]/g, '');
}

function buildVerseIndex(verses) {
  // chapter → [{ verse, normalised, tokens }]
  const index = new Map();
  for (const v of verses) {
    const mool = (v.mool || []).join('');
    const normalised = normaliseDeva(iastSafeOrPassthrough(mool));
    if (!index.has(v.chapter)) index.set(v.chapter, []);
    index.get(v.chapter).push({ verse: v.verse, normalised });
  }
  return index;
}

// verses.js mool is already in Devanāgarī, but in case anything sneaks
// through, pass through unchanged.
function iastSafeOrPassthrough(s) { return s; }

function bestVerseMatch(sentenceTextDeva, chapterVerses) {
  // Substring match first — fastest, catches the common case.
  const target = normaliseDeva(sentenceTextDeva);
  if (!target) return null;
  for (const v of chapterVerses) {
    if (v.normalised.includes(target)) return v.verse;
  }
  // Fallback: longest-common-substring-ish via n-gram overlap.
  let best = null, bestScore = 0;
  for (const v of chapterVerses) {
    const score = ngramOverlap(target, v.normalised, 4);
    if (score > bestScore) { best = v.verse; bestScore = score; }
  }
  // Require at least 0.5 coverage to accept the fallback match.
  return bestScore >= 0.5 ? best : null;
}

function ngramOverlap(a, b, n) {
  if (a.length < n) return b.includes(a) ? 1 : 0;
  let hits = 0, total = 0;
  for (let i = 0; i <= a.length - n; i++) {
    total++;
    if (b.includes(a.slice(i, i + n))) hits++;
  }
  return total === 0 ? 0 : hits / total;
}

function processChapterFile(filePath, chapterNum, chapterVerses) {
  const text = fs.readFileSync(filePath, 'utf-8');
  const sentences = parseConllu(text);
  const verses = new Map();
  const unresolved = [];

  function pushTo(verseNum, sent) {
    if (!verses.has(verseNum)) verses.set(verseNum, { tokens: [], sentTexts: [] });
    const v = verses.get(verseNum);
    v.tokens.push(...sent.tokens);
    if (sent.headers.text) v.sentTexts.push(sent.headers.text);
  }

  for (const sent of sentences) {
    if (isSpeakerSentence(sent)) continue;
    const counterStr = sent.headers.sent_counter;
    const sentDeva = iastToDeva(sent.headers.text || '');
    const matched = bestVerseMatch(sentDeva, chapterVerses);

    // Prefer content match (handles BG 13's recension offset cleanly and
    // the unlabelled-counter ranges in BhaGī 2). Fall back to sent_counter
    // when content match fails, or skip if neither resolves.
    if (matched != null) {
      pushTo(matched, sent);
    } else if (counterStr != null) {
      const counter = parseInt(counterStr, 10);
      if (!Number.isNaN(counter)) pushTo(counter, sent);
      else unresolved.push(sent);
    } else {
      unresolved.push(sent);
    }
  }

  if (unresolved.length > 0) {
    console.warn(
      `[BhaGī ${chapterNum}] ${unresolved.length} unresolved sentence(s):`
    );
    for (const u of unresolved.slice(0, 5)) {
      console.warn(`    "${u.headers.text}"`);
    }
  }

  return verses;
}

function findChapterFile(chapterNum) {
  const files = fs.readdirSync(DCS_DIR);
  return files.find(
    (f) => f.includes(`BhaGī ${chapterNum}-`) && f.endsWith('.conllu') && !f.endsWith('.conllu_parsed')
  );
}

// ----------------------------------------------------------------------
// Main
// ----------------------------------------------------------------------

async function main() {
  const versesModule = await import(path.join(REPO_ROOT, 'src/data/verses.js'));
  const verseIndex = buildVerseIndex(versesModule.VERSES);

  const result = {};
  let totalVerses = 0;
  for (let chapter = 1; chapter <= 18; chapter++) {
    const fname = findChapterFile(chapter);
    if (!fname) {
      console.warn(`Missing BhaGī ${chapter}`);
      continue;
    }
    const filePath = path.join(DCS_DIR, fname);
    const chapterVerses = verseIndex.get(chapter) || [];
    const verses = processChapterFile(filePath, chapter, chapterVerses);
    let tokensTotal = 0;
    for (const [verseNum, data] of verses.entries()) {
      const entry = buildVerseEntry(data);
      const key = `${chapter}.${verseNum}`;
      result[key] = entry;
      tokensTotal += entry.padaccheda.length;
    }
    totalVerses += verses.size;
    const expected = chapterVerses.length;
    const flag = verses.size === expected ? '✓' : `✗ (expected ${expected})`;
    console.log(
      `BhaGī ${chapter}: ${verses.size} verses ${flag}, ${tokensTotal} tokens`
    );
  }
  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(result, null, 2));
  console.log(`\nWrote ${totalVerses} verses to ${OUT_FILE}`);
  console.log(`Output size: ${(fs.statSync(OUT_FILE).size / 1024).toFixed(1)} KB`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
