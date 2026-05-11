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
import { lookupSharedVocab } from '../data/sharedVocab.js';
import { VOCAB_EXTENDED } from '../data/vocabulary-extended.js';
import { stripUpasargas } from '../data/upasargas.js';

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
  // Don't fire yan-split if the chunk already ends in a strong verb-ending
  // (-न्ति, -न्ते, -न्तु, -ष्यति, -ष्यते). Those are almost certainly a
  // single verb form where any internal `्य` is intrinsic to the dhātu
  // stem (e.g., नमस्यन्ति from denominative √नमस्य), not a sandhi
  // junction. Catches false-positive splits like
  //   नमस्यन्ति → [नमसि(noun "in salutation"), अन्ति(particle "near")]
  if (/(?:न्ति|न्ते|न्तु|ष्यति|ष्यते|स्यति|स्यते)$/.test(chunk)) return null;

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
    const primaryMeaning = Array.isArray(dhatu.meanings) && dhatu.meanings[0];
    // When the stem matched via futureStem (भविष्य), the lakara is लृट्
    // regardless of which present-tense ending followed.
    const isFutureStem = dhatu.viaStem === 'future';
    const effectiveLakara = isFutureStem ? 'lrt' : ending.lakara;
    return {
      form,
      lakara: effectiveLakara,
      purusha: ending.purusha,
      vachana: ending.vachana,
      pada: ending.pada,
      root: dhatu.devanagari,
      gana: dhatu.gana,
      gloss: primaryMeaning ? (isFutureStem ? `will ${primaryMeaning}` : `to ${primaryMeaning}`) : '',
      confidence: 'medium',
      signal: `${ending.hint} on √${dhatu.devanagari}${isFutureStem ? ' (future stem)' : ''}`,
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
// `trusted: true` means this regex is verb-specific enough that vocab
// override (which can be agent-mistagged) shouldn't suppress it.
// `trusted` defaults to false → vocab non-verb tag suppresses the match.
const LAKARA_SIGNALS = [
  // Future stem signals (-ष्य- / -स्य- + present-tense ending). Cover
  // every (ष्य/स्य) × (ति, सि, मि, थः, थ, वः, मः, न्ति) combination
  // for parasmaipada — these regex patterns are highly specific because
  // the -स्य/-ष्य infix is a distinctive future-tense marker.
  { match: /ष्यति$|ष्यतः$|ष्यन्ति$|ष्यसि$|ष्यथः$|ष्यथ$|ष्यामि$|ष्यावः$|ष्यामः$|स्यति$|स्यतः$|स्यन्ति$|स्यसि$|स्यथः$|स्यथ$|स्यामि$|स्यावः$|स्यामः$/, lakara: 'lrt', purusha: null, hint: 'future stem (P)', trusted: true },
  // Future ātmanepada
  { match: /ष्यते$|ष्यन्ते$|ष्यसे$|ष्ये$|स्यते$|स्यन्ते$|स्यसे$|स्ये$|ष्यध्वे$|स्यध्वे$|ष्यावहे$|स्यावहे$|ष्यामहे$|स्यामहे$/, lakara: 'lrt', pada: 'A', hint: 'future stem (Ā)', trusted: true },
  // विधिलिङ्
  { match: /ेत्$|ेयुः$|ेताम्$|ेम$/, lakara: 'vidhilin', hint: 'optative -ेत्', trusted: true },
  { match: /ीय$|ीरन्$|ीमहि$/, lakara: 'vidhilin', pada: 'A', hint: 'optative आत्मनेपद', trusted: true },
  // Irregular विधिलिङ् -यात् (अदादिगण: √अस् → स्यात्; also कुर्यात्, etc.).
  // Highly verb-specific tail; trusted.
  { match: /यात्$/, lakara: 'vidhilin', purusha: 'prathama', vachana: 'eka', hint: 'optative -यात् (irregular, e.g., स्यात्)', trusted: true },
  // लोट् 3rd person (-न्तु distinctive). Bare -तु also matches the
  // particle तु, so it's untrusted by default.
  { match: /न्तु$/, lakara: 'lot', purusha: 'prathama', vachana: 'bahu', hint: 'imperative -न्तु', trusted: true },
  { match: /तु$/, lakara: 'lot', purusha: 'prathama', hint: 'imperative -तु' },
  // लोट् 2sg -हि — also matches the particle हि, untrusted.
  { match: /हि$/, lakara: 'lot', purusha: 'madhyama', vachana: 'eka', hint: 'imperative -हि' },
  // लोट् आत्मनेपद endings. Highly verb-specific — these patterns don't
  // collide with common nominal endings, so they're trusted.
  // -स्व (2sg ātmane., e.g., युध्यस्व, कुरुष्व): "[you] do (it for yourself)!"
  { match: /स्व$/, lakara: 'lot', pada: 'A', purusha: 'madhyama', vachana: 'eka', hint: 'imperative आत्मनेपद -स्व (2sg)', trusted: true },
  // -ध्वम् (2pl ātmane., e.g., प्रहसध्वम् "rejoice!", युध्यध्वम्)
  { match: /ध्वम्$/, lakara: 'lot', pada: 'A', purusha: 'madhyama', vachana: 'bahu', hint: 'imperative आत्मनेपद -ध्वम् (2pl)', trusted: true },
  // -न्ताम् (3pl ātmane., e.g., युध्यन्ताम्)
  { match: /न्ताम्$/, lakara: 'lot', pada: 'A', purusha: 'prathama', vachana: 'bahu', hint: 'imperative आत्मनेपद -न्ताम् (3pl)', trusted: true },
  // -ताम् alone (3sg ātmane., e.g., युध्यताम्). Trickier — also appears
  // in certain compound endings, but the verb-form pattern is distinctive
  // enough to be net-positive.
  { match: /ताम्$/, lakara: 'lot', pada: 'A', purusha: 'prathama', vachana: 'eka', hint: 'imperative आत्मनेपद -ताम् (3sg)' },
  // लट् (present). Multi-character endings like -न्ति / -न्ते are
  // distinctive enough to trust; bare -ति / -ते match many nouns.
  { match: /न्ति$/, lakara: 'lat', purusha: 'prathama', vachana: 'bahu', hint: 'present -न्ति', trusted: true },
  { match: /ति$/,    lakara: 'lat', purusha: 'prathama', vachana: 'eka', hint: 'present -ति' },
  // Passive (कर्मणि प्रयोग) -यते: उच्यते "is called", ज्ञायते "is known",
  // दृश्यते "is seen". Distinct from आत्मनेपद -ते: passive inserts -य- before
  // the ending. Future stems (-स्यते/-ष्यते) match earlier, so this only
  // catches genuine passive -यते. Trusted.
  { match: /यते$/,   lakara: 'lat', pada: 'Kr', purusha: 'prathama', vachana: 'eka', hint: 'passive -यते (कर्मणि लट्)', trusted: true },
  { match: /यन्ते$/, lakara: 'lat', pada: 'Kr', purusha: 'prathama', vachana: 'bahu', hint: 'passive -यन्ते (कर्मणि लट् 3pl)', trusted: true },
  { match: /ते$/,    lakara: 'lat', pada: 'A', purusha: 'prathama', vachana: 'eka', hint: 'present आत्मनेपद -ते' },
  { match: /मि$/,    lakara: 'lat', purusha: 'uttama', vachana: 'eka', hint: 'present -मि' },
  { match: /सि$/,    lakara: 'lat', purusha: 'madhyama', vachana: 'eka', hint: 'present -सि (2sg)' },
  { match: /षि$/,    lakara: 'lat', purusha: 'madhyama', vachana: 'eka', hint: 'present -षि (2sg, retroflex)' },
  { match: /से$/,    lakara: 'lat', pada: 'A', purusha: 'madhyama', vachana: 'eka', hint: 'present आत्मनेपद -से (2sg)' },
  { match: /षे$/,    lakara: 'lat', pada: 'A', purusha: 'madhyama', vachana: 'eka', hint: 'present आत्मनेपद -षे (2sg, retroflex)' },
  // आत्मनेपद उत्तम/मध्यम endings — distinctive enough to trust.
  { match: /महे$/,   lakara: 'lat', pada: 'A', purusha: 'uttama', vachana: 'bahu', hint: 'present आत्मनेपद -महे (1pl)', trusted: true },
  { match: /ध्वे$/,  lakara: 'lat', pada: 'A', purusha: 'madhyama', vachana: 'bahu', hint: 'present आत्मनेपद -ध्वे (2pl)', trusted: true },
  // -ुः matches both legit verbs (प्राहुः) and nouns (चक्षुः, मधुः).
  // Untrusted — vocab override should suppress the noun cases.
  { match: /ुः$/,    lakara: 'lat', purusha: 'prathama', vachana: 'bahu', hint: 'present परस्मैपद -ुः (irregular plural)' },
  // NOTE: आत्मनेपद उत्तम-एकवचन ending -ए (काङ्क्षे, लभे, मन्ये) is intentionally
  // NOT a blanket signal — every सप्तमी-एकवचन noun also ends in -ए
  // (कुरुक्षेत्रे, गृहे), so a regex catches massive false positives. Verses
  // like 1.32 where the finite verb takes this ending need vocabulary-backed
  // verification (planned) or hand-decoded data (current path).
  // लङ् (past, augmented). The अ- prefix isn't actually verb-specific
  // (many nouns/pronouns/adjectives start with अ- as a negative prefix:
  // अन्यत्, अपरान्, अकर्मकृत्, अच्युत, अनन्त, …). Untrusted; rely on
  // the stem-strip enrichment to confirm real verbs (अकुर्वत → √कृ).
  { match: /^अ.+त्$/, lakara: 'lan', hint: 'past with अ- augment + -त्' },
  { match: /^अ.+न्$/, lakara: 'lan', purusha: 'prathama', vachana: 'bahu', hint: 'past plural -न्' },
  { match: /^अ.+त$/,  lakara: 'lan', pada: 'A', hint: 'past आत्मनेपद with अ- augment' },
];

// LAKARA codes used by VOCAB_EXTENDED / SHARED_VOCAB. The vocab schema
// uses 'lat' / 'lan' / 'lrt' etc. internally — same as classifyByStem.
const VALID_LAKARAS = new Set(['lat', 'lan', 'lrt', 'lot', 'vidhilin', 'lit', 'lun', 'lin']);

// Defective √अह् ("to say") exists only in लिट् (perfect). Common forms
// across the Gītā: आह (3sg), आहतुः (3du), आहुः (3pl), with उपसर्ग variants
// (प्र-, अनु-, सम्-). Hard-coded so the regex pass doesn't have to choose
// between "obscure perfect" and the much commoner -ुः plural ending.
const DEFECTIVE_AH_FORMS = new Map([
  ['आह',     { purusha: 'prathama', vachana: 'eka',  gloss: '"he/she said"' }],
  ['आहतुः',  { purusha: 'prathama', vachana: 'dvi',  gloss: '"the two said"' }],
  ['आहुः',   { purusha: 'prathama', vachana: 'bahu', gloss: '"they say / the wise say"' }],
  ['प्राह',  { purusha: 'prathama', vachana: 'eka',  gloss: '"he/she declared"' }],
  ['प्राहुः', { purusha: 'prathama', vachana: 'bahu', gloss: '"they declare / the wise declare"' }],
]);

function classifyFiniteVerb(form) {
  // Reject fragments — no real Sanskrit verb is shorter than 3 characters.
  // The 2-char "ति" / "ते" sandhi-residue tokens that the engine sometimes
  // emits as padas would otherwise match the -ति / -ते regex patterns
  // and produce gloss-less क्रिया cards. (Forms like अह्, स्था are dhātu
  // citation forms, never as standalone padas in actual verses.)
  if (!form || form.length < 3) return null;

  // Defective √अह् perfect (लिट्) — fixed lookup; bypasses regex/vocab.
  const defective = DEFECTIVE_AH_FORMS.get(form);
  if (defective) {
    return {
      form,
      lakara: 'lit',
      purusha: defective.purusha,
      vachana: defective.vachana,
      pada: 'P',
      root: form.startsWith('प्र') ? 'प्र + √अह्' : '√अह्',
      gloss: defective.gloss,
      confidence: 'high',
      signal: 'defective-ah',
    };
  }

  // Zero-th pass: direct vocab lookup. Catches forms like प्राहुरव्ययम्
  // (a sandhi-joined verb where neither stem nor regex match — only
  // the agent-curated vocab knows it's a verb).
  //
  // Length guard: longer sandhi blobs (length > 25) are usually multi-
  // word junctions the splitter should have caught (e.g., the original
  // भीष्ममेवाभिरक्षन्तु at 21 chars now splits cleanly via Pattern A).
  // For genuinely-unsplit blobs at 15-25 chars, the agent-built vocab
  // typically has the embedded finite verb correctly identified — we
  // trust that approximation, since the alternative is showing no क्रिया
  // at all on verses where visarga-r / yan-chain undo isn't yet wired.
  // Forms beyond 25 chars are almost always bulk-vocab tagging errors
  // and stay rejected.
  // Try the form directly, then with उपसर्ग prefixes stripped — many
  // upasarga-prefixed verb forms (उपसेवते = उप + सेवते, अधिगच्छति =
  // अधि + गच्छति) aren't individually catalogued, but the bare verb
  // form usually is. When the stripped form classifies as a verb, we
  // re-attach the prefix label to the root for display.
  let v0 = lookupSharedVocab(form);
  let v0PrefixLabel = '';
  if (!v0 || v0.category !== 'verb') {
    const stripped = stripUpasargas(form);
    if (stripped.prefixes.length > 0) {
      const v0s = lookupSharedVocab(stripped.stripped);
      if (v0s && v0s.category === 'verb') {
        v0 = v0s;
        v0PrefixLabel = stripped.prefixes.map((p) => p.prefix).join(' + ') + ' + ';
      }
    }
  }
  if (v0 && v0.category === 'verb' && v0.lakara && VALID_LAKARAS.has(v0.lakara)
      && form.length <= 25) {
    return {
      form,
      lakara: v0.lakara,
      purusha: v0.purusha || '?',
      vachana: v0.number || '?',
      pada: v0.pada || 'P',
      root: v0PrefixLabel + (v0.root || ''),
      gana: v0.gana,
      gloss: v0.gloss || '',
      confidence: 'medium',
      signal: v0PrefixLabel ? 'vocab-direct (upasarga-stripped)' : 'vocab-direct',
    };
  }

  // First pass: vocabulary-backed stem cross-check — high precision +
  // returns root/gloss/gana from the dhātu lexicon. Catches forms with
  // recognisable presentStems (मन्ये, लभे, भवसि, अपश्यत् of √पश्य, …).
  const byStem = classifyByStem(form);
  if (byStem) return byStem;

  // Second pass: regex-based signals — broader recall, suppresses
  // false-positive endings against the vocabulary, and enriches with
  // dictionary data when available so finiteVerbs always carries a
  // gloss whenever we can produce one.
  for (const sig of LAKARA_SIGNALS) {
    if (!sig.match.test(form)) continue;
    const vocab = lookupSharedVocab(form);
    // Vocab-override suppression: the regex matched, but if vocab
    // explicitly classifies the form as a non-verb AND the matching
    // signal isn't `trusted` (i.e., it's an ending also common on
    // nouns/particles), reject the regex match. Trusted signals
    // (-ष्य-future, -न्ति, -न्ते, -महे, -न्तु, -^अ.+त्$ लङ्, etc.)
    // are too verb-specific to be overridden — a "noun" vocab tag
    // on those is almost certainly an agent miscategorisation.
    if (!sig.trusted && vocab && vocab.category && vocab.category !== 'verb') return null;
    const base = {
      form,
      lakara: sig.lakara,
      purusha: sig.purusha ?? '?',
      vachana: sig.vachana ?? '?',
      pada: sig.pada ?? 'P',
      confidence: 'low',
      signal: sig.hint,
    };
    if (vocab && vocab.category === 'verb') {
      // Vocab beats regex for grammatical specifics (it's hand- or
      // agent-curated) but keep the regex's lakara if vocab lacks it.
      return {
        ...base,
        root: vocab.root || '',
        gloss: vocab.gloss || '',
        lakara: vocab.lakara || base.lakara,
        purusha: vocab.purusha || base.purusha,
        vachana: vocab.number || base.vachana,
        pada: vocab.pada || base.pada,
        confidence: 'medium',
      };
    }
    // Last resort: try stripping common verbal endings and looking up
    // the stem in the dhātu list to populate root + gloss even when
    // STEM_TO_DHATU's strict pada-match failed earlier.
    for (const e of ['न्ति', 'ति', 'ते', 'मि', 'सि', 'षि', 'से', 'षे',
                     'महे', 'ध्वे', 'वहे', 'त्', 'न्', 'त', 'ुः']) {
      if (!form.endsWith(e)) continue;
      const stem = form.slice(0, form.length - e.length);
      const augmented = stem.startsWith('अ') ? stem.slice(1) : stem;
      const dhatu = STEM_TO_DHATU.get(stem) || STEM_TO_DHATU.get(augmented);
      if (!dhatu) continue;
      const m = Array.isArray(dhatu.meanings) && dhatu.meanings[0];
      return { ...base, root: dhatu.devanagari, gana: dhatu.gana,
               gloss: m ? `to ${m}` : '' };
    }
    // Trusted regex matches stay even without gloss — they're verb-
    // specific endings (-न्ति, -ष्यति, -^अ.+त्$) where the regex is
    // confident even without lexicon backing.
    if (sig.trusted) return base;
    // Untrusted regex match + no enrichment available → almost
    // certainly a false positive (sandhi-fragment, kṛdanta, or noun
    // that happens to end in -ति/-ते). Reject rather than show a
    // gloss-less क्रिया card.
    return null;
  }
  return null;
}

// One-character padas that are real Sanskrit words (mostly avyayas / particles).
// Anything else of length 1 emerging from a sandhi split is almost certainly
// a bogus over-eager savarna-dirgha undo (e.g., काङ्क्षे → क + अङ्क्षे).
const REAL_ONECHAR_PADAS = new Set(['न', 'च', 'तु', 'हि', 'वा', 'सः', 'या', 'अ', 'उ']);

// Two-character verbal-ending fragments that are NEVER standalone padas.
// These appear when visarga-* sandhi rules misfire root-internally:
// e.g., तदस्ति → तदः + ति (the स्त is internal to अस्ति, not a junction).
// All the strings below are finite-verb endings that real Sanskrit words
// only carry as suffixes — they're never written as separate words. If a
// candidate split produces one of these as a part, the split is bogus.
// (Distinct from REAL_SHORT_TAILS like ते / च / तु, which ARE real words.)
const BOGUS_SHORT_FRAGMENTS = new Set([
  'ति', // present 3sg P (verbal ending, never standalone)
  'सि', // present 2sg P
  'मि', // present 1sg P
  'ष्य', 'स्य', // future-stem fragments / genitive matra
  'त्व',  // absolutive fragment / abstract-noun suffix
]);

function isPlausibleSplit(parts) {
  for (const p of parts) {
    if (p.length === 1 && !REAL_ONECHAR_PADAS.has(p)) return false;
    if (BOGUS_SHORT_FRAGMENTS.has(p)) return false;
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
// -म् + vowel sandhi splitter. The accusative-singular -म् ending and
// many indeclinables (कथम्, यथाभागम्, …) end in virama-म्. When joined
// with a vowel-initial next word, the virama is dropped and the next
// vowel either becomes a matra on the surviving म or is fully absorbed
// into the implicit अ on म. Two patterns to undo:
//
//   Pattern A: -मे[क-ह] mid-chunk → -म् + एव + (rest)
//     e.g. भीष्ममेवाभिरक्षन्तु → भीष्मम् + एव + अभिरक्षन्तु
//
//   Pattern B: -म[bare consonant with implicit अ] mid-chunk where the
//     prefix-with-virama is a recognized word → -म् + अ-(rest)
//     e.g. यथाभागमवस्थिताः → यथाभागम् + अवस्थिताः
//
// Both gated by chunk length (skip if <8 chars) to avoid false positives
// on intra-word -मे- / -म-clusters (कमेल, समय, etc.).
function splitMakaraCompound(chunk) {
  if (!chunk || chunk.length < 8) return null;

  // Pattern A: मेव mid-chunk, NOT at the very start.
  // Restoration: prefix gets virama (-म्), middle is एव (full particle
  // with vowel-letter), suffix is rest with savarṇa-dīrgha undone if
  // the next char is ा (एव + अ → एवा → restore as अ).
  const mevaIdx = chunk.indexOf('मेव');
  if (mevaIdx >= 1) {
    const after = chunk[mevaIdx + 3];
    // Only fire when there's something after मेव (otherwise it's the
    // chunk-final particle and shouldn't be split).
    if (after) {
      const prefix = chunk.slice(0, mevaIdx) + 'म्';
      let suffix = chunk.slice(mevaIdx + 3);
      // Restore savarṇa-dīrgha: if suffix starts with ा, that came from
      // एव + अ-; replace ा with the vowel-letter अ.
      if (suffix.startsWith('ा')) suffix = 'अ' + suffix.slice(1);
      // Plausibility: prefix must be a real ending (ends in -म् after
      // adding virama, length >= 4) and suffix must be a real word start
      // (length >= 2).
      if (prefix.length >= 4 && suffix.length >= 2) {
        return [prefix, 'एव', suffix];
      }
    }
  }

  // Pattern B: -म + bare consonant where it's likely a word boundary.
  // Walk through every म in the chunk that's followed by a bare consonant
  // (not a matra, not a virama, not anusvara/visarga). Two-tier validation:
  //   - PREFER lexicon validation: if the prefix-with-virama is in vocab,
  //     definitely split.
  //   - FALL BACK to length-and-shape heuristic: if the chunk is ≥12 chars,
  //     prefix is ≥4 chars, and suffix is ≥5 chars, accept the split. Real
  //     internal -म[C]- clusters in single words (e.g., कमलाक्ष = कम+ला+क्ष,
  //     length 8) don't trigger the length gate. Rare false positives on
  //     intermediate-length compounds are tolerable; 165 corpus-wide
  //     false-negatives (-म्+vowel boundaries that should be split) is not.
  const matraSet = new Set(['ा', 'ि', 'ी', 'ु', 'ू', 'ृ', 'ॄ', 'े', 'ै', 'ो', 'ौ', '्', 'ं', 'ः', 'ँ']);
  for (let i = 1; i < chunk.length - 2; i++) {
    if (chunk[i] !== 'म') continue;
    if (matraSet.has(chunk[i + 1])) continue;
    const next = chunk[i + 1];
    if (!/[क-ह]/.test(next)) continue;
    // LEFT-conjunct guard: if this म is internal to a conjunct cluster
    // (र्म, श्म, ष्म, ग्म…), the prefix `slice(0,i+1) + '्'` would be
    // junk like `मरीचिर्म्` or `अग्निर्भस्म्` — never a real pada. Real
    // -म् pada-endings come from a vowel-or-matra immediately before म,
    // not from a virama. This catches the र्+म mis-split class
    // (मरीचिर्मरुतामस्मि, प्राहुर्मनीषिणः, अग्निर्भस्मसात्...).
    if (chunk[i - 1] === '्') continue;
    const isRightConjunct = chunk[i + 2] === '्';
    // chunk.slice(0, i+1) already includes the م itself; append the
    // virama (्) — NOT an extra 'म्' which would double the consonant.
    const prefix = chunk.slice(0, i + 1) + '्';
    const suffix = 'अ' + chunk.slice(i + 1);
    if (prefix.length < 4 || suffix.length < 5) continue;
    // Tier 1: BOTH prefix AND suffix lexicon-validated. This case can
    // override the right-conjunct guard — if both pieces are known
    // words, the conjunct is internal to the suffix word (e.g.,
    // मरुतामस्मि → मरुताम् + अस्मि, where स्म is internal to अस्मि),
    // not a samāsa internal cluster.
    if (lookupSharedVocab(prefix) && lookupSharedVocab(suffix)) return [prefix, suffix];
    // Tier 1b: suffix is a known *verb* form. The right-conjunct guard
    // exists to prevent splitting inside samāsa clusters, but the
    // suffix being a recognized verb is strong evidence the boundary
    // is real (verb forms don't appear as samāsa-internal substrings).
    // This catches cases where the prefix is a longer sandhi blob that
    // hasn't yet been further decomposed (e.g., मरीचिर्मरुतामस्मि →
    // मरीचिर्मरुताम् + अस्मि — the prefix needs visarga-r undo to
    // become a real word, but अस्मि alone is enough to justify the cut).
    {
      const sufVocab = lookupSharedVocab(suffix);
      if (sufVocab && sufVocab.category === 'verb') return [prefix, suffix];
    }
    // Right-conjunct guard for the remaining tiers: if the next consonant
    // starts a conjunct cluster (क्ष, त्र, ष्व), the boundary is almost
    // certainly internal to a समास compound, NOT a -м् + अ- sandhi
    // junction. धर्मक्षेत्रे, कर्मक्षेत्रे — both fit this shape and
    // must NOT split unless lexicon validation cleared them above.
    if (isRightConjunct) continue;
    // Tier 2: lexicon-validated split on prefix only (suffix often
    // unlexicalized but the prefix being a known word is strong signal).
    if (lookupSharedVocab(prefix)) return [prefix, suffix];
    // Tier 3: length-and-shape heuristic for unlexicalized -м् + अ- forms
    if (chunk.length >= 12) return [prefix, suffix];
  }

  // Pattern C: -м + ा (matra) mid-chunk. The matra represents a vowel
  // boundary — either -м् + आ- (visarga absorbed; common in genitive-
  // plural -आम् + आ-initial-word: पाण्डुपुत्राणामाचार्य → पाण्डुपुत्राणाम्
  // + आचार्य) or -м (implicit अ) + अ- (savarṇa-dīrgha: अ + अ → ā;
  // common in समास compounds: भीमार्जुनसमाः → भीम + अर्जुनसमाः). Try
  // both restorations and pick whichever validates against vocab. Falls
  // back to (a) for long unlexicalized chunks since accusative/genitive
  // -м् endings are more common in continuous text than समास unmerges.
  for (let i = 1; i < chunk.length - 2; i++) {
    if (chunk[i] !== 'म') continue;
    if (chunk[i + 1] !== 'ा') continue;
    const afterMatra = chunk[i + 2];
    if (!afterMatra || matraSet.has(afterMatra)) continue;
    // LEFT-conjunct guard (same rationale as Pattern B): a м internal
    // to a conjunct (र्म, श्म, ष्म…) cannot be a real -म् pada-ending.
    if (chunk[i - 1] === '्') continue;
    // (a) -м् + आ- restoration
    const prefixA = chunk.slice(0, i + 1) + '्';
    const suffixA = 'आ' + chunk.slice(i + 2);
    // (b) -м (implicit अ) + अ- restoration
    const prefixB = chunk.slice(0, i + 1);
    const suffixB = 'अ' + chunk.slice(i + 2);
    if (prefixA.length < 4 || suffixA.length < 4) continue;
    // Lexicon validation, in priority order:
    if (lookupSharedVocab(prefixA)) return [prefixA, suffixA];
    if (lookupSharedVocab(prefixB)) return [prefixB, suffixB];
    if (lookupSharedVocab(suffixA)) return [prefixA, suffixA];
    if (lookupSharedVocab(suffixB)) return [prefixB, suffixB];
    // Tier 2: long chunk fallback — default to -м् + आ- since that's
    // the more common pattern in flowing text.
    if (chunk.length >= 14) return [prefixA, suffixA];
  }

  return null;
}

// Visarga-र् sandhi: the visarga at the end of a word becomes -र् when
// the next word starts with a voiced consonant or vowel. Surface form
// in Devanagari script differs by what follows:
//   - Before voiced consonant: `र + ् + C` (virama explicitly written).
//     E.g., मरीचिर्मरुताम् ← मरीचिः + मरुताम्.
//   - Before vowel-letter: `र + <V-matra>` (no virama; the next word's
//     initial vowel attaches to the joining र as a matra).
//     E.g., पराण्याहुरिन्द्रियेभ्यः ← पराण्याहुः + इन्द्रियेभ्यः
//     (the इ from इन्द्रियेभ्यः became the ि matra on र).
//
// Both surface patterns get visited. To avoid false positives on internal
// -र-<matra> (कुरुते, मरुत्, पुरुष — endless internal occurrences) the
// matra-form path requires lexicon-validation of at least one half.
const MATRA_TO_LETTER = {
  'ा': 'आ', 'ि': 'इ', 'ी': 'ई', 'ु': 'उ', 'ू': 'ऊ',
  'ृ': 'ऋ', 'ॄ': 'ॠ', 'े': 'ए', 'ै': 'ऐ', 'ो': 'ओ', 'ौ': 'औ',
};
function splitVisargaR(chunk) {
  if (!chunk || chunk.length < 6) return null;
  const VOICED_CONSONANTS = /[गघङजझञडढणदधनबभयलवहळ]/; // exclude र itself
  for (let i = 1; i < chunk.length - 2; i++) {
    if (chunk[i] !== 'र') continue;
    // LEFT-conjunct guard: this र is internal to a conjunct (-्र-, like
    // द्र, ब्र, ग्र); not a sandhi junction.
    if (chunk[i - 1] === '्') continue;
    const after = chunk[i + 1];
    let left, right;
    if (after === '्') {
      // Pattern A: र + ् + voiced-consonant.
      const cons = chunk[i + 2];
      if (!VOICED_CONSONANTS.test(cons)) continue;
      left = chunk.slice(0, i) + 'ः';
      right = chunk.slice(i + 2);
    } else if (MATRA_TO_LETTER[after]) {
      // Pattern B: र + V-matra → restored as left-with-visarga + V-letter.
      left = chunk.slice(0, i) + 'ः';
      right = MATRA_TO_LETTER[after] + chunk.slice(i + 2);
    } else {
      continue;
    }
    if (left.length < 5 || right.length < 4) continue;
    const leftVocab = lookupSharedVocab(left);
    const rightVocab = lookupSharedVocab(right);
    // Either half vocab-validated → strong evidence; accept.
    if (leftVocab || rightVocab) return [left, right];
    // Length heuristic: both halves substantial (≥5 chars) on a long
    // chunk (≥15 chars). The internal -र-<matra> false-positive cases
    // (कुरुते, मरुत्, पुरुष, ब्रह्मनिर्वाणम्, अन्तर्यामी, etc.) all
    // produce one half <5 chars, so they're filtered out by length alone.
    if (left.length >= 5 && right.length >= 5 && chunk.length >= 15) {
      return [left, right];
    }
  }
  return null;
}

// Recursively apply splitMakaraCompound to a chunk. Each split reduces
// length, so recursion terminates. Notes are appended for each successful
// split for the sandhiNotes panel.
function recursiveMakaraSplit(chunk, notes) {
  const split = splitMakaraCompound(chunk);
  if (!split) return [chunk];
  notes.push(`${chunk} = ${split.join(' + ')} (compound -म् + vowel boundary)`);
  // Re-apply on each piece in case any of them contains another junction.
  const result = [];
  for (const piece of split) result.push(...recursiveMakaraSplit(piece, notes));
  return result;
}

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

// Vocab-hint splits: agent-built vocab glosses sometimes contain a
// "(X + Y + ...)" parenthetical naming the underlying padas. Many of
// these encode an *implicit-virama-drop* join — the kind the regular
// sandhi rules don't catch (e.g., आचार्यम् + उपसङ्गम्य → आचार्यमुपसङ्गम्य,
// where the virama on -म् drops in continuous writing). When the hint
// validates structurally — that is, joining the parts and comparing
// under a canonical form (viramas + avagraha removed, matras mapped
// to vowel-letters) reproduces the chunk — we trust it as a ground-
// truth split. Cases where vowel sandhi or yan-rule modifications
// reshape the join (e.g., सखा + इति → सखेति) fail the equality test
// and fall through to the existing sandhi rules.
const MATRA_TO_VOWEL = {
  // matra-ā phonetically represents *long* आ, not short अ. The earlier
  // map had 'ा': 'अ' which broke savarṇa-dīrgha equality (e.g. matra ा
  // in a chunk failed to compare equal to explicit आ in a vocab-hint
  // join). All other matras were already correct.
  'ा': 'आ', 'ि': 'इ', 'ी': 'ई', 'ु': 'उ', 'ू': 'ऊ',
  'ृ': 'ऋ', 'ॄ': 'ॠ', 'े': 'ए', 'ै': 'ऐ', 'ो': 'ओ', 'ौ': 'औ',
};
// Savarṇa-dīrgha collapse: same-class vowel pairs merge to the long form.
// अ+अ, अ+आ, आ+अ, आ+आ → आ. इ+इ, इ+ई, ई+इ, ई+ई → ई. Same for u/ū, ṛ/ṝ.
// Without this, vocab-hint splits whose join uses savarṇa-dīrgha (e.g.
// त्यक्त्वा + आत्मशुद्धये → त्यक्त्वात्मशुद्धये, आ+आ → आ) fail the
// canonical-join equality test and the splitter mis-cuts on a vowel
// boundary instead.
const SAVARNA_CLASS = {
  'अ': 'आ', 'आ': 'आ',
  'इ': 'ई', 'ई': 'ई',
  'उ': 'ऊ', 'ऊ': 'ऊ',
  'ऋ': 'ॠ', 'ॠ': 'ॠ',
};
function collapseSavarna(arr) {
  const out = [];
  for (let i = 0; i < arr.length; i++) {
    const cur = arr[i], next = arr[i + 1];
    if (cur && next && SAVARNA_CLASS[cur] && SAVARNA_CLASS[cur] === SAVARNA_CLASS[next]) {
      out.push(SAVARNA_CLASS[cur]);
      i++; // skip the merged neighbour
    } else {
      out.push(cur);
    }
  }
  return out;
}
function devaCanonical(s) {
  return Array.from(s)
    // Drop viramas, avagrahas, candrabindu (nasal-vowel marker).
    .filter((c) => c !== '्' && c !== 'ऽ' && c !== 'ँ')
    .map((c) => {
      // Anusvara ↔ -म्: visually distinct but phonologically the same
      // word-final nasal. हृदं ↔ हृदम्, इदं ↔ इदम्, विष्टभ्याहमिदं ↔
      // विष्टभ्याहमिदम्. Without this, vocab-hint splits like
      // "विष्टभ्य + अहम् + इदम्" don't match the chunk विष्टभ्याहमिदं.
      if (c === 'ं') return 'म';
      return MATRA_TO_VOWEL[c] || c;
    })
    .join('');
}
// Canonical with savarṇa-dīrgha collapse — used to validate vocab-hint
// joins that contracted via अकः सवर्णे दीर्घः.
function devaCanonicalSavarna(s) {
  return collapseSavarna(Array.from(devaCanonical(s))).join('');
}
const VOCAB_HINT_SPLITS = new Map();
for (const [key, v] of Object.entries(VOCAB_EXTENDED)) {
  if (!v || !v.gloss) continue;
  const m = v.gloss.match(/\(([^()]*\+[^()]*)\)/);
  if (!m) continue;
  const parts = m[1].split('+').map((s) => s.trim());
  if (parts.length < 2) continue;
  // Each part must be pure Devanagari (no Latin, no parenthetical noise).
  if (parts.some((p) => !/^[ऀ-ॿ]+$/.test(p))) continue;
  // Structural validation: canonical join must equal canonical chunk,
  // either as-is or under savarṇa-dīrgha collapse (अकः सवर्णे दीर्घः).
  const joinCanon = devaCanonical(parts.join(''));
  const keyCanon = devaCanonical(key);
  if (joinCanon !== keyCanon) {
    const joinSav = devaCanonicalSavarna(parts.join(''));
    const keySav = devaCanonicalSavarna(key);
    if (joinSav !== keySav) continue;
  }
  VOCAB_HINT_SPLITS.set(key, parts);
}

// Hand-curated splitter overrides. These bypass the structural-canonical
// validation entirely — used when sandhi at the join boundary involves
// voiced/voiceless stop alternation (त् + अ → द् + अ, त् + भ → द् + भ)
// that the canonical comparison doesn't handle. User-reported chunks
// that the engine consistently mis-cut go here.
const SPLITTER_OVERRIDES = new Map([
  // 3.10 — visarga-lopa: एषः → एष before व; the vocab gloss says (प्रसविष्यध्वम् + एषः)
  // which fails the canonical validation because the join has a trailing ः the chunk doesn't.
  ['प्रसविष्यध्वमेष', ['प्रसविष्यध्वम्', 'एष']],
  // 3.10 — वोऽस्तु + इष्टकामधुक् via avagraha + vowel sandhi
  ['वोऽस्त्विष्टकामधुक्', ['वः', 'अस्तु', 'इष्टकामधुक्']],
  // 3.11 — तैः + दत्तान् + अप्रदाय + एभ्यः (visarga-र् + accusative + abs. + dat.pl.)
  ['तैर्दत्तानप्रदायैभ्यो', ['तैः', 'दत्तान्', 'अप्रदाय', 'एभ्यः']],
  // 3.13 — त् + voiced sandhi (जश्त्व, Pāṇini 8.4.53). The generic rules
  // exist in sandhi.js but `auto: false` because the same surface
  // clusters (द्भ, द्ग, द + vowel) occur inside non-compound words and
  // we don't yet have lexicon validation on the splitter. Until that
  // lands, listing each chunk here.
  ['अन्नाद्भवन्ति', ['अन्नात्', 'भवन्ति']],
  ['पर्जन्यादन्नसम्भवः', ['पर्जन्यात्', 'अन्न-सम्भवः']],
  ['यज्ञाद्भवति', ['यज्ञात्', 'भवति']],
  // 3.15 — कर्म + ब्रह्म-उद्भवम्; ब्रह्म + अक्षर-समुद्भवम्; तस्मात् + सर्वगतम्
  ['ब्रह्मोद्भवं', ['ब्रह्म-उद्भवम्']],
  ['ब्रह्माक्षरसमुद्भवम्', ['ब्रह्म-अक्षर-समुद्भवम्']],
  ['तस्मात्सर्वगतं', ['तस्मात्', 'सर्वगतम्']],
  // 3.16 — न + अनुवर्तयति + इह (न + vrddhi)
  ['नानुवर्तयतीह', ['न', 'अनुवर्तयति', 'इह']],
  // 3.17 — यः + तु + आत्मरतिः + एव; आत्म-न्य + एव + च + सन्तुष्टः
  ['यस्त्वात्मरतिरेव', ['यः', 'तु', 'आत्मरतिः', 'एव']],
  // 3.18 — कश्चित् + अर्थ-व्यपाश्रयः
  ['कश्चिदर्थव्यपाश्रयः', ['कश्चित्', 'अर्थ-व्यपाश्रयः']],
  // 12.7 — मयि + आवेशितचेतसाम् (yaṇ sandhi: इ + आ → य्या). The vocab gloss
  // treats this as one chunk; the locative pronoun मयि is a separate word
  // whose semantic role (the locus of "absorbed in me") is independent
  // of the बहुव्रीहि आवेशित-चेतस्.
  ['मय्यावेशितचेतसाम्', ['मयि', 'आवेशित-चेतसाम्']],
  // 12.9 — माम् + इच्छ + आप्तुम् ("(you) want to attain me"). इच्छ + आप्तुम्
  // → इच्छाप्तुम् via savarṇa-dīrgha (अ + आ → आ); the boundary disappears.
  ['मामिच्छाप्तुं', ['माम्', 'इच्छ', 'आप्तुम्']],
  // 5.10 — ब्रह्मणि + आधाय (yaṇ sandhi इ + आ → य्या); "having placed in Brahman"
  ['ब्रह्मण्याधाय', ['ब्रह्मणि', 'आधाय']],
  // 5.10 — पद्मपत्रम् + इव + अम्भसा ("like a lotus-leaf by water"). Three
  // words; पद्मपत्र itself is a तत्पुरुष samāsa ("leaf of lotus") that
  // KNOWN_SAMASAS surfaces separately.
  ['पद्मपत्रमिवाम्भसा', ['पद्मपत्रम्', 'इव', 'अम्भसा']],
  // 5.13 — संन्यस्य + आस्ते ("having renounced, [he] sits"). The य + आ
  // join via savarṇa-dīrgha (अ + आ → आ on the inherent vowel of य्) hides
  // the boundary; engine was mis-cutting as संन्यस्याः + ते (visarga +
  // pronoun "ते") which is totally wrong here.
  ['संन्यस्यास्ते', ['संन्यस्य', 'आस्ते']],
  // 5.15 — अज्ञानेन + आवृतम् ("covered by ignorance"). Savarṇa-dīrgha
  // (अ + आ → आ) at the joint hides the boundary; the result looks like
  // one PPP word but is actually instrumental + PPP.
  ['अज्ञानेनावृतं', ['अज्ञानेन', 'आवृतम्']],
  // 5.19 — तस्मात् + ब्रह्मणि (त् + ब → द्ब via जश्त्व). Same generic
  // rule we have wired-but-gated in sandhi.js.
  ['तस्माद्ब्रह्मणि', ['तस्मात्', 'ब्रह्मणि']],
  // 5.20 — ब्रह्मविद् + ब्रह्मणि (consonant-final compound noun next to
  // locative; no sandhi modification at the join, just concatenation).
  ['ब्रह्मविद्ब्रह्मणि', ['ब्रह्मविद्', 'ब्रह्मणि']],
  // 5.18 — हस्तिनि is a single word (loc. sg. of हस्तिन् "elephant"); the
  // splitter was wrongly cutting it as हः + तिनि. Surface form unchanged
  // but kept whole.
  ['हस्तिनि', ['हस्तिनि']],
  // 5.20 — न + प्रहृष्येत् + प्रियं + प्राप्य + न + उद्विजेत् + प्राप्य
  // + च + अप्रियम्. The user-flagged chunks:
  ['नोद्विजेत्प्राप्य', ['न', 'उद्विजेत्', 'प्राप्य']],
  ['प्रहृष्येत्प्रियं', ['प्रहृष्येत्', 'प्रियम्']],
  // 5.20 — स्थिरबुद्धिः + असम्मूढः (visarga-र् sandhi); the first half
  // स्थिरबुद्धि is itself a बहुव्रीहि samāsa (covered in KNOWN_SAMASAS).
  ['स्थिरबुद्धिरसम्मूढो', ['स्थिरबुद्धिः', 'असम्मूढः']],
  // 5.21 — बाह्य-स्पर्शेषु + असक्त-आत्मा (loc. pl. + bahuvrīhi adj.).
  // The षु + अ → ष्व + अ join hides the boundary.
  ['बाह्यस्पर्शेष्वसक्तात्मा', ['बाह्य-स्पर्शेषु', 'असक्त-आत्मा']],
  // 5.21 — विन्दति + आत्मनि (yaṇ sandhi इ + आ → य्या).
  ['विन्दत्यात्मनि', ['विन्दति', 'आत्मनि']],
  // 5.21 — ब्रह्मयोगयुक्त + आत्मा (savarṇa-dīrgha अ + आ → आ). Yes,
  // lexically it's a single bahuvrīhi, but for padaccheda we decompose
  // it into its two clear semantic halves — same as we do for हस्त-
  // and -आत्मन् compounds elsewhere. The bahuvrīhi entry stays in
  // KNOWN_SAMASAS for when the form appears compactly.
  ['ब्रह्मयोगयुक्तात्मा', ['ब्रह्मयोगयुक्त', 'आत्मा']],
]);
for (const [chunk, parts] of SPLITTER_OVERRIDES) {
  VOCAB_HINT_SPLITS.set(chunk, parts);
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
    // Pre-pass: vocab-hint split. If the agent-built vocab has a
    // structurally-validated "(X + Y)" hint for this chunk, use it
    // verbatim — it's ground truth for implicit-virama-drop joins
    // that the regular sandhi rules don't model.
    const hintParts = VOCAB_HINT_SPLITS.get(chunk);
    if (hintParts) {
      sandhiNotes.push(`${chunk} = ${hintParts.join(' + ')} (vocab-hint split)`);
      padas.push(...hintParts);
      continue;
    }
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
          const afterNasal = nasalSplit || [piece2];
          if (nasalSplit) {
            sandhiNotes.push(`${piece2} = ${nasalSplit.join(' + ')} (compound -न् boundary)`);
          }
          // Final pass: -म् + vowel sandhi splitter on each piece. Catches
          // compounds like भीष्ममेवाभिरक्षन्तु → भीष्मम् + एव + अभिरक्षन्तु
          // and यथाभागमवस्थिताः → यथाभागम् + अवस्थिताः that the नasal /
          // यन् passes don't reach. Recursive — a chunk with multiple
          // -म् + V junctions gets fully decomposed (e.g., 15.1's
          // ऊर्ध्वमूलमधःशाखमश्वत्थं → ऊर्ध्वमूलम् + अधःशाखम् + अश्वत्थम्).
          for (const piece3 of afterNasal) {
            const afterMakara = recursiveMakaraSplit(piece3, sandhiNotes);
            // Visarga-र् pass on each makara-piece. Catches the
            // -र्<vowel-letter> and -र्<voiced-cons> junctions
            // (पराण्याहुरिन्द्रियेभ्यः → पराण्याहुः + इन्द्रियेभ्यः).
            for (const piece4 of afterMakara) {
              const visargaSplit = splitVisargaR(piece4);
              if (visargaSplit) {
                sandhiNotes.push(`${piece4} = ${visargaSplit.join(' + ')} (visarga-र् sandhi)`);
                padas.push(...visargaSplit);
              } else {
                padas.push(piece4);
              }
            }
          }
        }
      }
    }
  }
  return { padas, sandhiNotes, lines, chunks };
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

  const { padas, sandhiNotes, lines, chunks } = extractPadas(mool);
  const { wordParsings, confidence } = lookupParsings(padas);

  // Detect candidate finite verbs by ending signal. Two passes:
  // 1. Try each split pada — catches cleanly-split verbs.
  // 2. Try each ORIGINAL whitespace chunk that wasn't surfaced as a pada
  //    — catches forms where vocab-direct lookup classifies the still-
  //    joined sandhi blob (e.g., स्यात्त्रिभिर्गुणैः → √अस् विधिलिङ्)
  //    even though the padaccheda has further decomposed the chunk.
  const finiteVerbs = [];
  const seenForms = new Set();
  for (const word of padas) {
    const fv = classifyFiniteVerb(word);
    if (fv && !seenForms.has(fv.form)) {
      finiteVerbs.push(fv);
      seenForms.add(fv.form);
    }
  }
  const padaSet = new Set(padas);
  for (const chunk of chunks || []) {
    if (padaSet.has(chunk) || seenForms.has(chunk)) continue;
    const fv = classifyFiniteVerb(chunk);
    if (fv && !seenForms.has(fv.form)) {
      finiteVerbs.push(fv);
      seenForms.add(fv.form);
    }
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
