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
import { DHATUS_EXTENDED as DHATUS } from '../data/dhatus-extended.js';

// Stem → dhātu lookup table. Used by classifyByStem (below) to confirm a
// candidate verb form by checking whether its stripped stem matches a
// known root. This catches forms where the regex-only LAKARA_SIGNALS
// would either miss (e.g., आत्मनेपद उत्तम-एकवचन -ए on मन्ये, लभे) or
// false-positive (every सप्तमी-एकवचन noun also ends in -ए).
const STEM_TO_DHATU = new Map();
for (const d of DHATUS) {
  if (d.presentStem) STEM_TO_DHATU.set(d.presentStem, { ...d, viaStem: 'present' });
  if (d.futureStem) STEM_TO_DHATU.set(d.futureStem, { ...d, viaStem: 'future' });
}

// Pre-generated set of plausible finite-verb forms across the 192 dhātus.
// Used by tryYanSandhiSplit (below) to lexicon-validate internal-sandhi
// splits — only accept a split if the LEFT side is a known verb form.
// Avoids false-positives on words like संख्या / विद्या where "्या" is
// part of the root, not a sandhi junction.
//
// Endings include retroflex variants (-षि for -सि after specific
// contexts) and the irregular plural परस्मैपद -ुः (प्राहुः, चकुः, etc.).
const PRES_ENDINGS_P = ['ति', 'न्ति', 'सि', 'षि', 'थः', 'थ', 'मि', 'वः', 'मः', 'ुः'];
const PRES_ENDINGS_A = ['ते', 'न्ते', 'से', 'षे', 'एथे', 'ध्वे', 'ए', 'वहे', 'महे'];

// Devanagari matras + virama — characters that can NOT carry an implicit
// अ. A presentStem ending in any of these is athematic / vowel-final.
const MATRA_AND_VIRAMA = new Set(['ा', 'ि', 'ी', 'ु', 'ू', 'ृ', 'ॄ', 'े', 'ै', 'ो', 'ौ', '्']);
function isThematicStem(stem) {
  if (!stem) return false;
  return !MATRA_AND_VIRAMA.has(stem.slice(-1));
}

const KNOWN_VERB_FORMS = new Set();
// Past-tense (लङ्) forms — augmented with अ-, used by tryPastTenseSplit
// to lexicon-validate -त्+consonant compound boundaries like
// अपश्यत्स्थितान् → अपश्यत् + स्थितान्.
const KNOWN_PAST_FORMS = new Set();
for (const d of DHATUS) {
  if (!d.presentStem) continue;
  const stem = d.presentStem;
  const endings = d.pada === 'A' ? PRES_ENDINGS_A
                : d.pada === 'P' ? PRES_ENDINGS_P
                : [...PRES_ENDINGS_P, ...PRES_ENDINGS_A]; // 'U' = ubhayapadī
  for (const e of endings) KNOWN_VERB_FORMS.add(stem + e);
  // Vowel-lengthening rule: for thematic stems ending in implicit -अ
  // (i.e., bare consonant), the stem-final अ lengthens to आ before the
  // उत्तम-पुरुष endings -मि, -वः, -मः (परस्मैपद) and -वहे, -महे
  // (आत्मनेपद). पच + मि → पचामि, not पचमि.
  if (isThematicStem(stem)) {
    const lengthened = stem + 'ा';
    const utEndingsP = ['मि', 'वः', 'मः'];
    const utEndingsA = ['वहे', 'महे'];
    if (d.pada !== 'A') for (const e of utEndingsP) KNOWN_VERB_FORMS.add(lengthened + e);
    if (d.pada !== 'P') for (const e of utEndingsA) KNOWN_VERB_FORMS.add(lengthened + e);
  }
  // लङ् (augmented past) forms: अ + presentStem + ending.
  // Most common: 3sg P -त् (अकरोत्, अपश्यत्), 3pl P -न् (अकुर्वन्),
  // 3sg A -त (अपश्यत = "he/she A-saw"; bare-final-अ form), and 1sg P
  // -अम् (अहम् + verb-stem + अम् → no virama, ends in अम्).
  KNOWN_PAST_FORMS.add('अ' + stem + 'त्');
  KNOWN_PAST_FORMS.add('अ' + stem + 'न्');
  if (d.pada !== 'P') KNOWN_PAST_FORMS.add('अ' + stem + 'त');
}

// Lexicon-validated -त्+C splitter for augmented-past compound boundaries.
// Looks for "्" followed by a consonant inside a chunk and tries to split
// there; accepts the split only if some SUFFIX of the LEFT side is a
// known past-tense form (अ + stem + त्/न्). Recovers Gītā 1.26's
// अपश्यत्स्थितान् → [अपश्यत्, स्थितान्] without false-positive on
// internal consonant clusters in compound nouns.
function tryPastTenseSplit(chunk) {
  for (let i = 1; i < chunk.length - 2; i++) {
    if (chunk[i] !== '्') continue;
    const next = chunk[i + 1];
    if (!/[क-ह]/.test(next)) continue;
    const left = chunk.slice(0, i + 1); // includes the virama
    const right = chunk.slice(i + 1);
    if (right.length < 3) continue;
    // Look for the longest verb-form suffix of `left`.
    for (let j = 0; j < left.length - 3; j++) {
      const candidate = left.slice(j);
      if (!KNOWN_PAST_FORMS.has(candidate)) continue;
      const prefix = left.slice(0, j);
      if (prefix && prefix.length < 2) continue; // implausibly short prefix
      const parts = prefix ? [prefix, candidate, right] : [candidate, right];
      return { parts, rule: { id: 'past-tense-lexicon', name: 'लङ् compound boundary (lexicon-validated)' } };
    }
  }
  return null;
}

// Yan-sandhi unjoin with lexicon validation. Looks for "्य" inside a
// chunk and, if the LEFT side (with ि restored) ends in a known verb
// form, accepts the split. Returns {parts: [...]} or null.
//
// Two paths handled:
//   1. The whole left prefix IS a known verb form. Returns 2 parts.
//        पश्यन्त्यात्मनि → [पश्यन्ति, आत्मनि]
//   2. A SUFFIX of the left prefix is a known verb form, and what
//      precedes is a sandhi-residue (notably र् from visarga + voiced
//      consonant). Returns 3 parts. Common in compound-line endings:
//        सुखदुःखसंज्ञैर्गच्छन्त्यमूढाः →
//          [सुखदुःखसंज्ञैः, गच्छन्ति, अमूढाः]
//      (र् restored to ः at the prefix boundary)
//
// Avoids false-positives on words like संख्या / विद्या / मध्या where
// "्या" is part of the root, not a sandhi junction — those have no
// suffix that matches a verb form.
function tryYanSandhiSplit(chunk) {
  for (let i = 1; i < chunk.length - 1; i++) {
    if (chunk[i] !== '्' || chunk[i + 1] !== 'य') continue;
    const leftPrefixed = chunk.slice(0, i) + 'ि';
    // Find the longest VERB-FORM suffix of the left prefix, scanning
    // from the start (so j=0 = full prefix, j=1 = drop one char, etc.).
    for (let j = 0; j < leftPrefixed.length; j++) {
      const verbCandidate = leftPrefixed.slice(j);
      if (!KNOWN_VERB_FORMS.has(verbCandidate)) continue;
      const prefix = leftPrefixed.slice(0, j); // possibly empty
      // Determine right side from the vowel after ्य.
      const next = chunk[i + 2];
      let right;
      if (next === 'ा') right = 'आ' + chunk.slice(i + 3);
      else if (next === 'े') right = 'ए' + chunk.slice(i + 3);
      else if (next === 'ो') right = 'ओ' + chunk.slice(i + 3);
      else if (next === 'ु') right = 'उ' + chunk.slice(i + 3);
      else if (next === 'ी') right = 'ई' + chunk.slice(i + 3);
      else if (next === 'ू') right = 'ऊ' + chunk.slice(i + 3);
      else right = 'अ' + chunk.slice(i + 2); // implicit अ on bare consonant
      if (!right) continue;
      // Restore visarga from र् sandhi-residue at the prefix boundary
      // (visarga + voiced consonant → र् + voiced consonant).
      let cleanedPrefix = prefix;
      if (prefix.endsWith('र्')) cleanedPrefix = prefix.slice(0, -2) + 'ः';
      const parts = prefix
        ? [cleanedPrefix, verbCandidate, right]
        : [verbCandidate, right];
      return {
        parts,
        rule: { id: 'yan-lexicon', name: 'यण् सन्धि (lexicon-validated)' },
      };
    }
  }
  return null;
}

// Verbal endings the engine recognises by stripping. Order doesn't matter
// here because we try every ending and accept the first whose stripped
// stem hits STEM_TO_DHATU. Sorted by length (descending) implicitly via
// individual entries — we'll iterate longest-first to avoid partial matches.
const STEM_BACKED_ENDINGS = [
  // आत्मनेपद present
  { suffix: 'महे', lakara: 'lat', pada: 'A', purusha: 'uttama',  vachana: 'bahu', hint: 'present Ā उत्तम बहु -महे' },
  { suffix: 'वहे', lakara: 'lat', pada: 'A', purusha: 'uttama',  vachana: 'dvi',  hint: 'present Ā उत्तम द्वि -वहे' },
  { suffix: 'ध्वे', lakara: 'lat', pada: 'A', purusha: 'madhyama', vachana: 'bahu', hint: 'present Ā मध्यम बहु -ध्वे' },
  { suffix: 'न्ते', lakara: 'lat', pada: 'A', purusha: 'prathama', vachana: 'bahu', hint: 'present Ā प्रथम बहु -न्ते' },
  { suffix: 'एते', lakara: 'lat', pada: 'A', purusha: 'prathama', vachana: 'dvi',  hint: 'present Ā प्रथम द्वि -एते' },
  { suffix: 'एथे', lakara: 'lat', pada: 'A', purusha: 'madhyama', vachana: 'dvi',  hint: 'present Ā मध्यम द्वि -एथे' },
  { suffix: 'से',  lakara: 'lat', pada: 'A', purusha: 'madhyama', vachana: 'eka',  hint: 'present Ā मध्यम एक -से' },
  { suffix: 'षे',  lakara: 'lat', pada: 'A', purusha: 'madhyama', vachana: 'eka',  hint: 'present Ā मध्यम एक -षे (retroflex)' },
  { suffix: 'ते',  lakara: 'lat', pada: 'A', purusha: 'prathama', vachana: 'eka',  hint: 'present Ā प्रथम एक -ते' },
  { suffix: 'ए',   lakara: 'lat', pada: 'A', purusha: 'uttama',  vachana: 'eka',  hint: 'present Ā उत्तम एक -ए' },
  // परस्मैपद present
  { suffix: 'न्ति', lakara: 'lat', pada: 'P', purusha: 'prathama', vachana: 'bahu', hint: 'present P प्रथम बहु -न्ति' },
  { suffix: 'थः',  lakara: 'lat', pada: 'P', purusha: 'madhyama', vachana: 'dvi',  hint: 'present P मध्यम द्वि -थः' },
  { suffix: 'मः',  lakara: 'lat', pada: 'P', purusha: 'uttama',  vachana: 'bahu', hint: 'present P उत्तम बहु -मः' },
  { suffix: 'वः',  lakara: 'lat', pada: 'P', purusha: 'uttama',  vachana: 'dvi',  hint: 'present P उत्तम द्वि -वः' },
  { suffix: 'थ',   lakara: 'lat', pada: 'P', purusha: 'madhyama', vachana: 'bahu', hint: 'present P मध्यम बहु -थ' },
  { suffix: 'सि',  lakara: 'lat', pada: 'P', purusha: 'madhyama', vachana: 'eka',  hint: 'present P मध्यम एक -सि' },
  { suffix: 'षि',  lakara: 'lat', pada: 'P', purusha: 'madhyama', vachana: 'eka',  hint: 'present P मध्यम एक -षि (retroflex)' },
  { suffix: 'ति',  lakara: 'lat', pada: 'P', purusha: 'prathama', vachana: 'eka',  hint: 'present P प्रथम एक -ति' },
  { suffix: 'मि',  lakara: 'lat', pada: 'P', purusha: 'uttama',  vachana: 'eka',  hint: 'present P उत्तम एक -मि' },
];
// Sort longest-first so multi-char endings match before their suffixes.
STEM_BACKED_ENDINGS.sort((a, b) => b.suffix.length - a.suffix.length);

// Try to classify a form by stripping a known verbal ending and confirming
// the residue is a known dhātu present-stem. High-precision: only fires
// when the stem matches DHATUS, so it never false-positives on noun forms
// that happen to end in -ए, -ते, -ति, etc.
function classifyByStem(form) {
  for (const ending of STEM_BACKED_ENDINGS) {
    if (!form.endsWith(ending.suffix)) continue;
    const stem = form.slice(0, form.length - ending.suffix.length);
    if (!stem) continue;
    const dhatu = STEM_TO_DHATU.get(stem);
    if (!dhatu) continue;
    // pada compatibility: A-only endings must be on Ā or उभयपदी roots;
    // P-only endings on P or उभयपदी.
    const dpada = dhatu.pada; // 'P' | 'A' | 'U'
    const epada = ending.pada;
    if (dpada !== 'U' && dpada !== epada) continue;
    return {
      form,
      lakara: ending.lakara,
      purusha: ending.purusha,
      vachana: ending.vachana,
      pada: ending.pada,
      root: dhatu.devanagari,
      gana: dhatu.gana,
      confidence: 'medium',
      signal: `${ending.hint} on √${dhatu.devanagari}`,
    };
  }
  return null;
}

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
  // Future stem signals (-ष्य- / -स्य- + present-tense ending). Cover
  // every (ष्य/स्य) × (ति, सि, मि, थः, थ, वः, मः, न्ति) combination
  // for parasmaipada — these regex patterns are highly specific because
  // the -स्य/-ष्य infix is a distinctive future-tense marker.
  { match: /ष्यति$|ष्यतः$|ष्यन्ति$|ष्यसि$|ष्यथः$|ष्यथ$|ष्यामि$|ष्यावः$|ष्यामः$|स्यति$|स्यतः$|स्यन्ति$|स्यसि$|स्यथः$|स्यथ$|स्यामि$|स्यावः$|स्यामः$/, lakara: 'lrt', purusha: null, hint: 'future stem (P)' },
  // Future ātmanepada
  { match: /ष्यते$|ष्यन्ते$|ष्यसे$|ष्ये$|स्यते$|स्यन्ते$|स्यसे$|स्ये$|ष्यध्वे$|स्यध्वे$|ष्यावहे$|स्यावहे$|ष्यामहे$|स्यामहे$/, lakara: 'lrt', pada: 'A', hint: 'future stem (Ā)' },
  // विधिलिङ्
  { match: /ेत्$|ेयुः$|ेताम्$|ेम$/, lakara: 'vidhilin', hint: 'optative -ेत्' },
  { match: /ीय$|ीरन्$|ीमहि$/, lakara: 'vidhilin', pada: 'A', hint: 'optative आत्मनेपद' },
  // लोट्
  { match: /तु$|न्तु$/, lakara: 'lot', purusha: 'prathama', hint: 'imperative -तु' },
  // लोट् मध्यम-एकवचन -हि (imperative "do!", "go!", e.g., जहि, उत्तिष्ठ).
  // Highly distinctive ending — almost no nouns end in -हि.
  { match: /हि$/, lakara: 'lot', purusha: 'madhyama', vachana: 'eka', hint: 'imperative -हि' },
  // लट् (present)
  { match: /न्ति$/, lakara: 'lat', purusha: 'prathama', vachana: 'bahu', hint: 'present -न्ति' },
  { match: /ति$/,    lakara: 'lat', purusha: 'prathama', vachana: 'eka', hint: 'present -ति' },
  { match: /ते$/,    lakara: 'lat', pada: 'A', purusha: 'prathama', vachana: 'eka', hint: 'present आत्मनेपद -ते' },
  { match: /मि$/,    lakara: 'lat', purusha: 'uttama', vachana: 'eka', hint: 'present -मि' },
  { match: /सि$/,    lakara: 'lat', purusha: 'madhyama', vachana: 'eka', hint: 'present -सि (2sg)' },
  { match: /षि$/,    lakara: 'lat', purusha: 'madhyama', vachana: 'eka', hint: 'present -षि (2sg, retroflex)' },
  { match: /से$/,    lakara: 'lat', pada: 'A', purusha: 'madhyama', vachana: 'eka', hint: 'present आत्मनेपद -से (2sg)' },
  { match: /षे$/,    lakara: 'lat', pada: 'A', purusha: 'madhyama', vachana: 'eka', hint: 'present आत्मनेपद -षे (2sg, retroflex)' },
  { match: /महे$/,   lakara: 'lat', pada: 'A', purusha: 'uttama', vachana: 'bahu', hint: 'present आत्मनेपद -महे (1pl)' },
  { match: /ध्वे$/,  lakara: 'lat', pada: 'A', purusha: 'madhyama', vachana: 'bahu', hint: 'present आत्मनेपद -ध्वे (2pl)' },
  // Plural परस्मैपद -ुः (प्राहुः, चकुः, …). Distinct enough from any
  // common nominal ending that a regex match is safe.
  { match: /ुः$/,    lakara: 'lat', purusha: 'prathama', vachana: 'bahu', hint: 'present परस्मैपद -ुः (irregular plural)' },
  // NOTE: आत्मनेपद उत्तम-एकवचन ending -ए (काङ्क्षे, लभे, मन्ये) is intentionally
  // NOT a blanket signal — every सप्तमी-एकवचन noun also ends in -ए
  // (कुरुक्षेत्रे, गृहे), so a regex catches massive false positives. Verses
  // like 1.32 where the finite verb takes this ending need vocabulary-backed
  // verification (planned) or hand-decoded data (current path).
  // लङ् (past, augmented)
  { match: /^अ.+त्$/, lakara: 'lan', hint: 'past with अ- augment + -त्' },
  { match: /^अ.+न्$/, lakara: 'lan', purusha: 'prathama', vachana: 'bahu', hint: 'past plural -न्' },
  { match: /^अ.+त$/,  lakara: 'lan', pada: 'A', hint: 'past आत्मनेपद with अ- augment' },
];

function classifyFiniteVerb(form) {
  // First pass: regex-based signals — high recall, may include some
  // false positives on shared noun/verb endings (e.g., -ति, -ते).
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
  // Second pass: vocabulary-backed stem cross-check — high precision.
  // Catches forms the regex misses (मन्ये, लभे, भवसि, …) when the root
  // is in DHATUS. Won't catch verbs whose root isn't yet in the list;
  // those still need hand-decoding.
  const byStem = classifyByStem(form);
  if (byStem) return byStem;
  return null;
}

// One-character padas that are real Sanskrit words (mostly avyayas / particles).
// Anything else of length 1 emerging from a sandhi split is almost certainly
// a bogus over-eager savarna-dirgha undo (e.g., काङ्क्षे → क + अङ्क्षे).
const REAL_ONECHAR_PADAS = new Set(['न', 'च', 'तु', 'हि', 'वा', 'सः', 'या', 'अ', 'उ']);

function isPlausibleSplit(parts) {
  for (const p of parts) {
    if (p.length === 1 && !REAL_ONECHAR_PADAS.has(p)) return false;
  }
  return true;
}

// Short particle / connective words that legitimately appear as the
// second piece of a compound split (e.g., पितॄन् + अथ).
const REAL_SHORT_TAILS = new Set([
  'अथ', 'इति', 'अपि', 'अति', 'इव', 'एव', 'च', 'न', 'तु', 'हि', 'वा',
  'तत्', 'सः', 'या', 'ते', 'मे', 'सा', 'अहम्',
]);

function isPlausibleNasalSplit(left, right) {
  if (left.length < 3) return false;
  if (right.length >= 3) return true;
  return REAL_SHORT_TAILS.has(right);
}

// Split a chunk at "[long-vowel matra] + न + ् + [next-akṣara start]"
// boundaries. Catches Sanskrit accusative-plural compound concatenation
// where multiple -आन्/-ीन्/-ून्/-ॄन् nouns sit beside each other in
// a list without intervening whitespace, e.g. Gītā 1.26's
//   आचार्यान्मातुलान्भ्रातॄन्पुत्रान्पौत्रान्सखींः
// → [आचार्यान्, मातुलान्, भ्रातॄन्, पुत्रान्, पौत्रान्, सखींः]
//
// Also handles the no-virama variant where the source typing convention
// drops the virama on -न् before a following vowel-letter:
//   पितॄनथ = पितॄन् + अथ (written as if the virama is absent)
// matched on `[long matra] + न + [vowel-letter अ-औ]` (no virama in between).
//
// Restricting to long matras (ा, ी, ू, ॄ) avoids the bulk of false
// positives: words with internal -न्C clusters (शान्त, आनन्द) typically
// have short or no preceding vowel-marker, so they don't match.
// Plausibility guard rejects splits where one side is implausibly short.
// Elided-अ particle tails: when -न् (acc.pl. ending) joins with अ-initial
// particle, both the virama and the अ may be elided in writing convention
// (e.g., पितॄन् + अथ → पितॄनथ, with the implicit-अ on न absorbing the
// अ from अथ). Map of "tail-after-elision → original full particle" used
// to lexicon-validate this specific split pattern.
const ELIDED_A_TAILS = new Map([
  ['थ',   'अथ'],   // पितॄनथ → पितॄन् + अथ
  ['पि',  'अपि'],  // -नपि → -न् + अपि
  ['ति',  'अति'],  // -नति → -न् + अति (rarer, possible false-positive on -नति nouns)
  ['हम्', 'अहम्'], // -नहम् → -न् + अहम्
]);

// Pattern D: matra-on-न tails. When -न् + vowel-initial particle joins,
// some printings drop the virama AND render the next word's vowel as a
// MATRA on the surviving न. Different from ELIDED_A_TAILS (which assume
// the vowel itself drops). E.g., कुरून् + इति → कुरूनिति (ि is the
// matra-form of इ attached to न). Whitelisted to acc.pl.-acceptable
// particle endings to avoid false positives on common words like भानुना,
// मुनिता etc.
const ELIDED_MATRA_TAILS = new Map([
  ['निति', 'इति'],
  ['निव',  'इव'],
  ['नेव',  'एव'],
  ['नेते', 'एते'],
]);

function splitNasalCompound(chunk) {
  // Pattern A: standard -न्-virama boundary (-ान्C, -ीन्C, etc.).
  // Pattern B: no-virama boundary (-ानV, -ीनV, etc.) where V is a
  //            vowel-letter (अ, आ, इ, ई, उ, ऊ, ऋ, ए, ऐ, ओ, औ).
  // Combined regex with two alternatives.
  const re = /([ाीूॄ])(न्[अ-ह]|न[अ-औ])/g;
  const splits = [];
  let lastEnd = 0;
  let match;
  while ((match = re.exec(chunk)) !== null) {
    const matra = match[1];
    const tail = match[2];
    // For pattern A (न्C): cut AFTER virama, before next consonant.
    //   "...ान्म..." → "...ान्" + "म..."  (splitAt = matchStart + 1 + 2)
    // For pattern B (नV): cut AFTER न (no virama), before vowel-letter.
    //   "...ानअ..." → "...ान" + "अ..."     (splitAt = matchStart + 1 + 1)
    const isVirama = tail.startsWith('न्');
    const splitAt = match.index + 1 + (isVirama ? 2 : 1);
    const left = chunk.slice(lastEnd, splitAt);
    // For no-virama case the LEFT ends in bare न (implicit अ); the next
    // word starts with its own vowel. To make LEFT a proper word, append
    // a virama so it reads as -न्.
    const leftWord = isVirama ? left : left + '्';
    const remaining = chunk.slice(splitAt);
    if (!isPlausibleNasalSplit(leftWord, remaining)) continue;
    splits.push(leftWord);
    lastEnd = splitAt;
    re.lastIndex = splitAt;
  }
  if (lastEnd === 0) {
    // Pattern C (elided अ-particle): scan for "[long matra]+न+(elided
    // tail)" where the tail is a known अ-initial particle missing its
    // initial अ (पितॄनथ → पितॄन् + अथ). Whitelisted to avoid false
    // positives like जनति (a noun in -नति).
    for (const [tail, restored] of ELIDED_A_TAILS) {
      // We want chunk to END with [matra]+न+tail (so the elided particle
      // is the rightmost piece), or to have it followed by a separator.
      const re2 = new RegExp(`([ाीूॄ])न${tail}(?=$|\\s|[।॥])`);
      const m = re2.exec(chunk);
      if (m) {
        const splitAt = m.index + 1 + 1; // matra + न
        const left = chunk.slice(0, splitAt) + '्';
        const right = restored;
        if (isPlausibleNasalSplit(left, right)) {
          // Recurse on the left in case it's also a nasal compound.
          const leftSplits = splitNasalCompound(left) || [left];
          return [...leftSplits, right];
        }
      }
    }
    // Pattern D (matra-on-न elision): the particle's initial vowel was
    // rendered as a matra on the surviving -न (कुरून् + इति → कुरूनिति).
    // Tighter regex: chunk ends in [long matra] + (full matra-tail).
    for (const [tail, restored] of ELIDED_MATRA_TAILS) {
      const re3 = new RegExp(`([ाीूॄ])${tail}(?=$|\\s|[।॥])`);
      const m = re3.exec(chunk);
      if (m) {
        const splitAt = m.index + 1; // up through the long matra
        const left = chunk.slice(0, splitAt) + 'न्'; // restore -न् ending
        const right = restored;
        if (isPlausibleNasalSplit(left, right)) {
          const leftSplits = splitNasalCompound(left) || [left];
          return [...leftSplits, right];
        }
      }
    }
    return null;
  }
  const final = chunk.slice(lastEnd);
  if (final) {
    // Recurse on the final tail piece — it may itself contain a Pattern
    // C or D match (e.g., कुरूनिति → कुरून् + इति) that the main loop
    // doesn't catch because its regex requires explicit virama.
    const sub = splitNasalCompound(final);
    if (sub) splits.push(...sub);
    else splits.push(final);
  }
  return splits.length >= 2 ? splits : null;
}

// Recursively try yan-sandhi splits on a pada — keeps splitting as long
// as a part keeps validating against KNOWN_VERB_FORMS. Returns the final
// list of padas after all yan-splits applied, plus human-readable notes.
function recursiveYanSplit(pada, notes) {
  const split = tryYanSandhiSplit(pada);
  if (!split) return [pada];
  notes.push(`${pada} = ${split.parts.join(' + ')} (${split.rule.name})`);
  // The LAST part (right side) may itself contain another yan junction.
  // Earlier parts are kept as-is; they're either prefix residues or the
  // matched verb form, which shouldn't yan-split again.
  const last = split.parts[split.parts.length - 1];
  const restRecursed = recursiveYanSplit(last, notes);
  return [...split.parts.slice(0, -1), ...restRecursed];
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
    let firstPassPadas;
    if (!r || r.length === 0) {
      firstPassPadas = [chunk];
    } else {
      // Pick the first sandhi candidate whose parts pass the plausibility
      // filter. Falls back to keeping the chunk whole if every candidate
      // produces an implausible split.
      const candidate = r.find((c) => c.parts.length === 1 || isPlausibleSplit(c.parts));
      if (!candidate || candidate.parts.length === 1) {
        firstPassPadas = [chunk];
      } else {
        firstPassPadas = candidate.parts;
        const ruleNames = candidate.rules.map((rule) => rule.name).join(' + ');
        sandhiNotes.push(`${chunk} = ${candidate.parts.join(' + ')} (${ruleNames})`);
      }
    }
    // Second pass: yan-sandhi unjoin first (lexicon-validated; catches
    // पश्यन्त्यात्मन्यवस्थितम् → पश्यन्ति + आत्मनि + अवस्थितम्), THEN
    // nasal-compound split on accusative-plural lists (आचार्यान्मातुलान्…
    // → आचार्यान् + मातुलान् + …), THEN past-tense -त्+C compound split
    // (अपश्यत्स्थितान् → अपश्यत् + स्थितान्). Each is lexicon-aware in
    // its own way; ordering matters when patterns overlap (e.g.,
    // यान्त्यधमां needs the यन् path, not nasal).
    for (const p of firstPassPadas) {
      const afterYan = recursiveYanSplit(p, sandhiNotes);
      for (const piece of afterYan) {
        // Try past-tense split first within each yan-piece (so an
        // augmented past-tense form is isolated before nasal split).
        const pastSplit = tryPastTenseSplit(piece);
        const afterPast = pastSplit ? pastSplit.parts : [piece];
        if (pastSplit) {
          sandhiNotes.push(`${piece} = ${pastSplit.parts.join(' + ')} (${pastSplit.rule.name})`);
        }
        for (const piece2 of afterPast) {
          const nasalSplit = splitNasalCompound(piece2);
          if (nasalSplit) {
            sandhiNotes.push(`${piece2} = ${nasalSplit.join(' + ')} (compound -न् boundary)`);
            padas.push(...nasalSplit);
          } else {
            padas.push(piece2);
          }
        }
      }
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
