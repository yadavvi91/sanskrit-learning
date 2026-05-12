// One-time hydration of auto-stub verses with engine-generated padaccheda
// + finite-verb candidates. Runs autoDecode (which does sandhi-undo +
// dictionary lookups) over each tier='auto-stub' verse on app boot, so
// the user sees clickable word chips instead of a wall of mool text.
//
// Why a separate module: avoids the cycle if we put the import directly
// in verses.js (verses → decodeHelper → vocabulary → verses). Here we
// import both, but only call the function from App.jsx after all modules
// have fully loaded.

import { VERSES } from './verses.js';
import { autoDecode } from '../utils/decodeHelper.js';
import { BESANT_TRANSLATIONS } from './translations-besant.js';
import { ARNOLD_TRANSLATIONS } from './translations-arnold.js';
import { HINDI_TRANSLATIONS } from './translations-hindi.js';
import { INTERP_NOTES } from './interpretive.js';
import { SHANKARA_SUMMARIES } from './commentaries-shankara.js';
import { FINITE_OVERRIDES } from './finite-overrides.js';
import { DHATUS_EXTENDED } from './dhatus-extended.js';
import { FUTURE_STEMS } from './_dhatu_future_stems.js';
import { VERSE_OVERRIDES } from './verse-overrides.js';
import { lookupSharedVocab, lookupByRoot } from './sharedVocab.js';
import { KNOWN_SAMASAS } from './_known_samasas.js';
import DCS_PADACCHEDA from './dcs-padaccheda.json';

// Compound-type names recognised in vibhaktiNotes. Longest-first so
// "षष्ठी तत्पुरुष" beats the bare "तत्पुरुष" when both match.
const COMPOUND_TYPES_LONGEST_FIRST = [
  'इतरेतर द्वंद्व', 'इतरेतर द्वन्द्व', 'समाहार द्वंद्व', 'समाहार द्वन्द्व',
  'उपपद तत्पुरुष', 'षष्ठी तत्पुरुष', 'तृतीया तत्पुरुष', 'चतुर्थी तत्पुरुष',
  'पञ्चमी तत्पुरुष', 'सप्तमी तत्पुरुष', 'द्वितीया तत्पुरुष',
  'तत्पुरुष', 'बहुव्रीहि', 'द्वंद्व', 'द्वन्द्व', 'कर्मधारय', 'अव्ययीभाव',
];

// Parse vibhaktiNotes for predicate participles AND predicate adjectives:
// words tagged as PPP / past-passive / predicate adjective / gerundive that
// "serve as predicate". These are the "verb" of nominal sentences —
// e.g., 1.33's काङ्क्षितम् ("was desired"), 2.20's अजः नित्यः (stacked
// predicate adjectives describing अयम्). Returns [{ form, gloss, kind }]
// so VerseDetail can surface them instead of (or alongside) the generic
// "implied अस्ति" line.
//
// `kind` indicates whether the note tagged a participle ("PPP") or a
// plain adjective ("adjective") — used to label the rendered sub-section.
function parsePredicatePPPsFromVibhakti(notes) {
  const result = [];
  for (const note of notes || []) {
    const isPPP = /PPP|past[- ]passive/i.test(note);
    const isAdjective = /predicate adjective/i.test(note);
    const isGerundive = /gerundive/i.test(note);
    if (!isPPP && !isAdjective && !isGerundive) continue;
    // Must explicitly mark "predicate" usage — avoids picking up
    // attributive PPPs that are not the sentence's predicate.
    if (!/predicate|serves as/i.test(note)) continue;
    const arrowIdx = note.indexOf('→');
    if (arrowIdx === -1) continue;
    const before = note.slice(0, arrowIdx).trim();
    const forms = before.split(/,\s*/)
      .map((c) => c.replace(/\s*\([^()]*\)\s*/g, '').trim())
      // Strip parenthetical count markers like "(thrice)" added by the agent.
      .filter((c) => c && !/^\(.*\)$/.test(c));
    if (forms.length === 0) continue;
    const glossMatch = note.match(/[“"„]([^”"]+)[”"]/) || note.match(/'([^']+)'/);
    const gloss = glossMatch ? glossMatch[1] : '';
    const kind = isPPP ? 'PPP' : isGerundive ? 'gerundive' : 'adjective';
    for (const f of forms) {
      result.push({ form: f, gloss, kind });
    }
  }
  return result;
}

// Parse vibhaktiNotes for compound type-tagged entries. Returns a list
// of { compound, type, gloss } extracted from notes like:
//   "अश्रुपूर्णाकुलेक्षणम् → द्वितीया एकवचन — बहुव्रीहि "(him) whose eyes…""
//   "महानुभावान् गुरून् → ... ; both बहुव्रीहि"
function parseSamasaFromVibhakti(notes) {
  const result = [];
  for (const note of notes || []) {
    let type = null;
    for (const t of COMPOUND_TYPES_LONGEST_FIRST) {
      if (note.includes(t)) { type = t; break; }
    }
    if (!type) continue;
    const arrowIdx = note.indexOf('→');
    if (arrowIdx === -1) continue;
    const before = note.slice(0, arrowIdx).trim();
    // Compound names — comma-separated; strip parenthetical annotations.
    const compounds = before.split(/,\s*/)
      .map((c) => c.replace(/\s*\([^()]*\)\s*/g, '').trim())
      .filter(Boolean);
    if (compounds.length === 0) continue;
    // Gloss — first quoted span (curly or straight quotes).
    const glossMatch = note.match(/[“"„]([^”"]+)[”"]/) || note.match(/'([^']+)'/);
    const gloss = glossMatch ? glossMatch[1] : '';
    for (const c of compounds) {
      result.push({ compound: c, type, gloss });
    }
  }
  return result;
}

let done = false;

export function hydrateAutoStubVerses() {
  if (done) return;
  done = true;

  for (const v of VERSES) {
    if (v.tier !== 'auto-stub') continue;
    const key = `${v.chapter}.${v.verse}`;

    // Verse-level overrides — hand-decoded padaccheda / finiteVerbs /
    // notes / anvaya / hindi / english for verses where the engine
    // produces sub-quality results. Each field is filled only if the
    // verse doesn't already have it (so an in-place verses.js override
    // takes priority over a chapter-level batch override). The verse
    // remains tier='auto-stub' for tier-test compatibility, but with
    // floor-quality content it cannot regress below.
    const vOverride = VERSE_OVERRIDES[key];
    if (vOverride) {
      if (vOverride.speaker && !v.speaker) v.speaker = vOverride.speaker;
      if (Array.isArray(vOverride.padaccheda) && (!v.padaccheda || v.padaccheda.length === 0)) {
        v.padaccheda = vOverride.padaccheda;
      }
      if (Array.isArray(vOverride.sandhiNotes) && (!v.sandhiNotes || v.sandhiNotes.length === 0)) {
        v.sandhiNotes = vOverride.sandhiNotes;
      }
      if (Array.isArray(vOverride.finiteVerbs) && (!v.finiteVerbs || v.finiteVerbs.length === 0)) {
        v.finiteVerbs = vOverride.finiteVerbs;
      } else if (vOverride.finiteVerbs === null) {
        v.noFiniteVerb = true;
      }
      if (Array.isArray(vOverride.vibhaktiNotes) && (!v.vibhaktiNotes || v.vibhaktiNotes.length === 0)) {
        v.vibhaktiNotes = vOverride.vibhaktiNotes;
      }
      if (Array.isArray(vOverride.keyFights) && (!v.keyFights || v.keyFights.length === 0)) {
        v.keyFights = vOverride.keyFights;
      }
      if (Array.isArray(vOverride.samasNotes) && (!v.samasNotes || v.samasNotes.length === 0)) {
        v.samasNotes = vOverride.samasNotes;
      }
      if (vOverride.anvaya && !v.anvaya) v.anvaya = vOverride.anvaya;
      if (vOverride.hindi && !v.hindi) v.hindi = vOverride.hindi;
      if (vOverride.english && !v.english) v.english = vOverride.english;
      if (Array.isArray(vOverride.vyakhya) && (!v.vyakhya || v.vyakhya.length === 0)) {
        v.vyakhya = vOverride.vyakhya;
      }
      // anuvṛtti — explicit verb-carry-over from a neighbouring verse.
      // When set, the क्रिया section renders the carried verb + source
      // verse instead of the generic "implied अस्ति" line.
      if (vOverride.anuvrtti && !v.anuvrtti) v.anuvrtti = vOverride.anuvrtti;
      if (Array.isArray(vOverride.predicatePPPs) && (!v.predicatePPPs || v.predicatePPPs.length === 0)) {
        v.predicatePPPs = vOverride.predicatePPPs;
      }
      // implicitVerb — when the verse is genuinely nominal but the
      // implied predicate is something other than अस्ति. Used for
      // विभूति-style "I am X" verses where मनेप is implied (मन्ये etc.).
      if (vOverride.implicitVerb && !v.implicitVerb) {
        v.implicitVerb = vOverride.implicitVerb;
        v.implicitVerbMeaning = vOverride.implicitVerbMeaning;
      }
    }

    // DCS (Digital Corpus of Sanskrit) is the new primary source for
    // padaccheda — overrides engine + _chN_overrides for auto-stub
    // verses. Full-tier hand decodes (BG 1.1, 2.3, 2.4, 2.5) are not in
    // this loop and remain untouched. See plans/v19-dcs-integration.md.
    const dcsEntry = DCS_PADACCHEDA[key];
    if (dcsEntry && Array.isArray(dcsEntry.padaccheda) && dcsEntry.padaccheda.length > 0) {
      v.padaccheda = dcsEntry.padaccheda;
      v.padacchedaSource = 'dcs';
      // Merge DCS wordParsings into verse.wordParsings (legacy schema)
      // so WordPopover and the empty-popover audit pick them up as
      // proper coverage. Existing wordParsings from VERSE_OVERRIDES win
      // (so any hand-curated entry stays authoritative).
      //
      // DCS provides morphology + lemma but NOT glosses (English/Hindi
      // meaning). Enrich each parsing by looking up the lemma (root) in
      // sharedVocab — that gives the popover something to render
      // alongside the case/number/gender row.
      if (dcsEntry.wordParsings && typeof dcsEntry.wordParsings === 'object') {
        if (!v.wordParsings) v.wordParsings = {};
        // suffix-inferred glosses fall into two groups:
        //   - confident: the stem WAS found in a dictionary, so the gloss
        //     is a real meaning + a regular declension tag (e.g.,
        //     परमाः → "supreme / highest (m. nom. pl.)"). Keep these.
        //   - speculative: the stem was NOT found, so the gloss is just
        //     a pattern-match guess that tags itself "stem not in
        //     dictionary" or "verb stem not in dictionary" (e.g.,
        //     प्रलय → "absolutive of प्रल-stem (verb stem not in
        //     dictionary)"). Drop these — they're the bogus content.
        const isSpeculative = (g) =>
          !g || /stem not in dictionary/i.test(g);
        const authoritativeGloss = (form) => {
          const d = lookupSharedVocab(form);
          if (d) {
            if (!(d.source === 'suffix-inferred' && isSpeculative(d.gloss))) {
              return d.gloss || null;
            }
          }
          // Form not found as a vocab key. Try matching as a `root`
          // field on an existing vocab entry — handles DCS lemmas
          // (आत्मन्, कर्मन्, अस्मद्) whose citation form (आत्मा, कर्म,
          // अहम्) is the actual vocab key.
          const byRoot = lookupByRoot(form);
          return byRoot?.gloss || null;
        };
        for (const [w, p] of Object.entries(dcsEntry.wordParsings)) {
          if (v.wordParsings[w]) continue;
          const enriched = { ...p };
          if (!enriched.gloss) {
            // Try the surface form first (अहम् → "I"), then the DCS
            // lemma (DCS often uses the compound-prefix form मद् where
            // our vocab keys are अहम्). Both go through authoritativeGloss
            // which strips speculative suffix-inferred matches.
            let g = authoritativeGloss(w);
            if (!g && enriched.root) g = authoritativeGloss(enriched.root);
            if (g) enriched.gloss = g;
          }
          // For compound members, look up each part's gloss too so
          // CompoundPopover (the per-part rendering) has data to show.
          // Try the surface form first, then fall back to the DCS lemma
          // (e.g., अन्ताम् → no entry; lemma अन्त → "end").
          if (Array.isArray(enriched.members)) {
            enriched.members = enriched.members.map((m) => {
              if (m.gloss) return m;
              let g = authoritativeGloss(m.form);
              if (!g && m.lemma) g = authoritativeGloss(m.lemma);
              return g ? { ...m, gloss: g } : m;
            });
          }
          v.wordParsings[w] = enriched;
        }
      }
      // DCS finite verbs — fill only if not already populated by a
      // FINITE_OVERRIDES block or verse-level override. Hand-decoded
      // finiteVerbs (where present) keep priority over DCS.
      if (Array.isArray(dcsEntry.finiteVerbs) && dcsEntry.finiteVerbs.length > 0
          && (!v.finiteVerbs || v.finiteVerbs.length === 0)) {
        v.finiteVerbs = dcsEntry.finiteVerbs;
      }
    }

    if (!v.padaccheda || v.padaccheda.length === 0) {
      try {
        const stub = autoDecode((v.mool || []).join(' '));
        if (stub) {
          v.padaccheda = stub.padaccheda;
          v.padacchedaSource = v.padacchedaSource || 'engine';
          if (!v.finiteVerbs || v.finiteVerbs.length === 0) {
            v.finiteVerbs = stub.finiteVerbs;
          }
          // Plumb sandhiNotes from the engine — these are the structural
          // splits the engine made (visarga sandhi, yan, makara, vocab-hint
          // splits, etc.). Without this the सन्धि section was empty for
          // every Ch 3+ verse even when the engine clearly did the work.
          if ((!v.sandhiNotes || v.sandhiNotes.length === 0)
              && Array.isArray(stub.sandhiNotes) && stub.sandhiNotes.length > 0) {
            v.sandhiNotes = stub.sandhiNotes;
          }
        }
      } catch {
        // Skip — the verse just renders without padaccheda.
      }
    }

    // Hand-decoded finite-verb overrides:
    //   - null      → mark verse.noFiniteVerb = true (nominal sentence)
    //   - [items]   → replace v.finiteVerbs with the curated entries
    //                 (used both to fill empties AND to correct engine
    //                 mis-classifications, e.g., the future-stem regex
    //                 firing on the denominative नमस्यन्ति in 11.36)
    const override = FINITE_OVERRIDES[key];
    if (override === null) {
      // null = "this verse has no finite verb, period". Clears any
      // engine false-positive (निर्योगक्षेम wrongly matching विधिलिङ्
      // -एम) and marks the verse as nominal-by-design.
      v.finiteVerbs = [];
      v.noFiniteVerb = true;
    } else if (Array.isArray(override) && override.length > 0) {
      v.finiteVerbs = override;
    }

    // Derive samasNotes from hyphenated padaccheda entries when the
    // verse doesn't have explicit samasNotes. The Ch1/Ch2 batch agents
    // hyphenate light compounds in padaccheda (काम-आत्मानः, स्वर्ग-पराः,
    // जन्म-कर्म-फल-प्रदाम्) but rarely emit a structured samasNotes block.
    //
    // Two-tier derivation:
    //   1. Parse vibhaktiNotes for "<compound> → <vibhakti> ... <type>
    //      "<gloss>"" patterns. Many ch1/ch2 vibhakti notes already tag
    //      the compound type (बहुव्रीहि, तत्पुरुष, द्वंद्व, etc.) and
    //      give a paraphrase — that's the proper समासविग्रह, not just
    //      a sandhi split. Match the parsed compound to the hyphenated
    //      padaccheda entry by prefix (sandhi may modify the visible
    //      form: सम्प्लुत-उदके in padaccheda ↔ सम्प्लुतोदके in vibhakti).
    //   2. Fallback for any hyphenated pada with no vibhakti match: a
    //      bare compound-vigraha entry (just the structural split,
    //      empty type and gloss, source='derived-from-padaccheda').
    // Auto-extract predicate-PPPs / predicate-adjectives from vibhaktiNotes.
    // Fires on any verse whose vibhakti notes mention "predicate" — even
    // if finite verbs exist (2.20 has 4 finite verbs but stacks four
    // predicate adjectives describing अयम्; both deserve surfacing).
    if ((!v.predicatePPPs || v.predicatePPPs.length === 0)
        && Array.isArray(v.vibhaktiNotes)) {
      const ppps = parsePredicatePPPsFromVibhakti(v.vibhaktiNotes);
      if (ppps.length > 0) v.predicatePPPs = ppps;
    }

    if ((!v.samasNotes || v.samasNotes.length === 0)
        && Array.isArray(v.padaccheda)) {
      const vibhaktiSamasa = parseSamasaFromVibhakti(v.vibhaktiNotes);
      const derived = [];

      // First pass: hand-curated KNOWN_SAMASAS table. Try several keys:
      // (a) the pada's vocab `root` field — catches unhyphenated compounds
      //     where lookupSharedVocab found a dict entry (कर्मयोग,
      //     स्थितप्रज्ञ).
      // (b) the hyphenated pada itself — for DCS-style hyphenated
      //     compounds with case ending (काम-भोग-अर्थम्).
      // (c) the hyphenated pada with the case ending stripped — so a
      //     single entry covers every case-form (काम-भोग-अर्थम् /
      //     काम-भोग-अर्थे / काम-भोग-अर्थाय all match key काम-भोग-अर्थ).
      // (d) the dehyphenated stem (कामभोगार्थ) — for entries already
      //     keyed without hyphens.
      // Parasvarna ↔ anusvāra normalisation. DCS produces parasvarna forms
      // (मुक्त-सङ्गः, लोक-सङ्ग्रहम्); some hand-curated entries use
      // anusvāra (मुक्त-संग, लोक-संग्रह). Normalise to the parasvarna form
      // so a single lookup matches either spelling.
      const VARGA_NASAL = {
        'क':'ङ','ख':'ङ','ग':'ङ','घ':'ङ','ङ':'ङ',
        'च':'ञ','छ':'ञ','ज':'ञ','झ':'ञ','ञ':'ञ',
        'ट':'ण','ठ':'ण','ड':'ण','ढ':'ण','ण':'ण',
        'त':'न','थ':'न','द':'न','ध':'न','न':'न',
        'प':'म','फ':'म','ब':'म','भ':'म','म':'म',
      };
      const toParasvarna = (s) => s.replace(/ं([क-म])/g, (_, c) =>
        VARGA_NASAL[c] ? VARGA_NASAL[c] + '्' + c : 'ं' + c
      );
      // Inverse: ङ्क → ंक, ञ्ज → ंज, etc. — collapses any varga-nasal +
      // virama + same-varga-stop into ं + stop.
      const NASAL_TO_VARGA = {
        'ङ': ['क','ख','ग','घ','ङ'],
        'ञ': ['च','छ','ज','झ','ञ'],
        'ण': ['ट','ठ','ड','ढ','ण'],
        'न': ['त','थ','द','ध','न'],
        'म': ['प','फ','ब','भ','म'],
      };
      const toAnusvara = (s) => s.replace(/([ङञणनम])्([क-म])/g, (m, n, c) =>
        (NASAL_TO_VARGA[n] || []).includes(c) ? 'ं' + c : m
      );
      const tryKey = (key) => {
        if (KNOWN_SAMASAS[key]) return KNOWN_SAMASAS[key];
        const para = toParasvarna(key);
        if (para !== key && KNOWN_SAMASAS[para]) return KNOWN_SAMASAS[para];
        const anus = toAnusvara(key);
        if (anus !== key && KNOWN_SAMASAS[anus]) return KNOWN_SAMASAS[anus];
        return null;
      };

      function tryKnown(pada) {
        // (a) Vocab root
        const vocab = lookupSharedVocab(pada);
        const root = vocab?.root && typeof vocab.root === 'string' && !vocab.root.includes('+')
          ? vocab.root : null;
        if (root) { const hit = tryKey(root); if (hit) return hit; }
        // (b) Raw pada
        { const hit = tryKey(pada); if (hit) return hit; }
        // (c) DCS-lemma-based stems: try every combination of {form,lemma}
        // per member. DCS members sometimes differ between surface (मनः)
        // and lemma (मनस्), participle (अर्पित) vs verb-root (अर्पय्), etc.
        // 2^N combinations for N members — fine up to ~5 members.
        const wp = v.wordParsings?.[pada];
        if (Array.isArray(wp?.members) && wp.members.length >= 2 && wp.members.length <= 5) {
          const m = wp.members;
          const n = m.length;
          const total = 1 << n;
          for (let mask = 0; mask < total; mask++) {
            const parts = m.map((mem, i) => {
              const useLemma = (mask >> i) & 1;
              return useLemma && mem.lemma ? mem.lemma : mem.form;
            });
            const candidate = parts.join('-');
            const hit = tryKey(candidate);
            if (hit) return hit;
          }
        }
        // (d) Surface-form case-stripping. Comprehensive ending list:
        // long-vowel + visarga/m, plural endings, dual endings, dative,
        // ablative, locative, instrumental, vocative.
        const stem = pada.replace(/(अभ्याम्|एभ्यः|एषु|येषु|आभ्यः|आसः|आनाम्|आणाम्|योः|आय|आत्|आः|यः|ाम्|ान्|एन|ेन|एण|ेण|आः|ौ|ेषु|ास्|ाः|ाणि|ानि|एः|ैः|े|्|म्|ः|ा|ि|ी|ु|ू|ो|ै)$/, '');
        if (stem !== pada) { const hit = tryKey(stem); if (hit) return hit; }
        // (e) Dehyphenated stem
        const dehyphenStem = stem.replace(/-/g, '');
        if (dehyphenStem !== stem) { const hit = tryKey(dehyphenStem); if (hit) return hit; }
        return null;
      }
      const seenCompounds = new Set();
      for (const pada of v.padaccheda) {
        if (typeof pada !== 'string') continue;
        const known = tryKnown(pada);
        if (known && !seenCompounds.has(pada)) {
          seenCompounds.add(pada);
          derived.push({
            compound: pada,
            vigraha: known.vigraha,
            type: known.type,
            gloss: known.gloss,
            source: 'known-samasa-lexicon',
          });
        }
      }

      // Helper: look up a compound part's gloss. Suffix-inferred entries
      // come in two flavours: confident (stem found in dict, gloss is a
      // real meaning) and speculative (stem not found, gloss is a
      // pattern-match guess marked "stem not in dictionary"). Drop only
      // the speculative ones so we keep accurate noun declensions like
      // परमाः → "supreme / highest (m. nom. pl.)" but reject bogus verb
      // misidentifications like प्रलय → "absolutive of प्रल-stem".
      function authoritativeVocab(part) {
        const v = lookupSharedVocab(part);
        if (v && !(v.source === 'suffix-inferred' && /stem not in dictionary/i.test(v.gloss || ''))) {
          return v;
        }
        // Reverse-index fallback: try `part` as a `root` field.
        return lookupByRoot(part) || null;
      }
      // Also try the DCS-provided per-member data attached to this verse's
      // wordParsings — DCS marks each compound part with its actual lemma
      // (e.g., 'प्रलय' → root 'प्रलय', 'अन्तम्' → root 'अन्त'), and our
      // hydration enriches members with gloss from the shared dictionaries.
      function dcsMemberGloss(pada, part) {
        const wp = v.wordParsings?.[pada];
        if (!wp || !Array.isArray(wp.members)) return null;
        const m = wp.members.find((x) => x.form === part);
        if (!m) return null;
        if (m.gloss) return m.gloss;
        if (m.lemma) {
          const direct = lookupSharedVocab(m.lemma);
          if (direct && direct.gloss && !(direct.source === 'suffix-inferred' && /stem not in dictionary/i.test(direct.gloss))) {
            return direct.gloss;
          }
          const byRoot = lookupByRoot(m.lemma);
          if (byRoot?.gloss) return byRoot.gloss;
        }
        return null;
      }

      for (const pada of v.padaccheda) {
        if (typeof pada !== 'string' || !pada.includes('-')) continue;
        if (seenCompounds.has(pada)) continue;
        const parts = pada.split('-').filter(Boolean);
        if (parts.length < 2) continue;
        const firstPart = parts[0];
        const match = vibhaktiSamasa.find((s) => s.compound.startsWith(firstPart));
        let derivedGloss = match ? match.gloss : '';
        let derivedType = match ? match.type : '';
        if (!match) {
          const components = parts.map((part) => ({
            part,
            vocab: authoritativeVocab(part),
            dcsGloss: dcsMemberGloss(pada, part),
          }));
          // Build a "twice-born (द्विज) + best (उत्तम)" style gloss using
          // ONLY real dictionary hits (DCS-member or non-inferred vocab).
          // Parts without an authoritative gloss are listed bare — that's
          // honest: "we know this is here, we don't have a gloss yet".
          const componentGlosses = components.map(({ part, vocab, dcsGloss }) => {
            const g = dcsGloss || vocab?.gloss;
            if (!g) return part;
            const trimmed = g.split(/[—,;(]/)[0].trim();
            return trimmed ? part + ' (' + trimmed + ')' : part;
          });
          // Only include a derivedGloss if at least one part had a real
          // dictionary hit. Otherwise leave it blank — the verse-detail
          // UI falls back to showing just the vigraha + type.
          const hadAnyGloss = components.some((c) => c.dcsGloss || c.vocab?.gloss);
          derivedGloss = hadAnyGloss ? componentGlosses.join(' + ') : '';
          if (parts.length >= 3) {
            const nounLike = components.filter(({ vocab }) =>
              vocab && (vocab.category === 'noun' || vocab.category === 'adjective'));
            if (nounLike.length >= 3) {
              derivedType = 'इतरेतर द्वंद्व (inferred)';
            }
          }
          if (parts.length === 2 && !derivedType) {
            const [a, b] = components.map((c) => c.vocab);
            if (a && b && a.category === 'noun' && b.category === 'noun') {
              derivedType = 'तत्पुरुष? (inferred — best guess)';
            }
          }
          // बहुव्रीहि pattern recognisers. Compounds ending in these
          // stems are almost always bahuvrīhi (describing a person/thing
          // by what they possess or hold as supreme). Add a paraphrase so
          // X-परम / X-निष्ठ / X-तत्पर etc. surface as more than just
          // "(supreme)" — e.g., काम-उपभोग-परम = "those whose highest aim
          // is enjoyment of desire".
          const lastPart = parts[parts.length - 1];
          // Strip case ending to get the stem (परमाः → परम, परायणाः → परायण).
          const lastStem = lastPart.replace(/[ःाेिीुूोौैंम्]$|आः$|ौ$/, '');
          const BAHUVRIHI_HEADS = {
            'परम': 'whose supreme [aim] is',
            'परमा': 'whose supreme [aim] is',
            'परायण': 'devoted to / holding supreme',
            'परायणा': 'devoted to / holding supreme',
            'निष्ठ': 'firmly established in',
            'तत्पर': 'intent upon / devoted to',
            'पर': 'holding as highest',
            'चेतस्': 'whose mind is on',
            'मनस्': 'whose mind is on',
            'आत्म': 'whose self is',
            'आत्मन्': 'whose self is',
          };
          // Adverbial compounds: X-अर्थम् / X-अर्थे / X-अर्थाय → "for the
          // sake of X". These are NOT bahuvrīhi — they're a distinct
          // तत्पुरुष subtype (कृत्यर्थ). Handle them BEFORE the bahuvrīhi
          // check so "X-अर्थम्" doesn't get mis-tagged.
          const ARTHA_SUFFIXES = ['अर्थम्', 'अर्थाय', 'अर्थे'];
          const arthaMatch = ARTHA_SUFFIXES.find((s) => lastPart === s);
          if (!derivedType && arthaMatch) {
            const innerParts = components.slice(0, -1).map(({ part, dcsGloss, vocab }) => {
              const g = dcsGloss || vocab?.gloss;
              if (!g) return part;
              return g.split(/[—,;(]/)[0].trim();
            });
            derivedType = 'तत्पुरुष (कृत्यर्थ — adverbial "for the sake of")';
            if (innerParts.length > 0) {
              derivedGloss = `for the sake of ${innerParts.join(' ')}`;
            }
          }
          if (!derivedType && BAHUVRIHI_HEADS[lastStem]) {
            // For each inner part, prefer its gloss but fall back to the
            // form itself so we don't silently drop unknowns. Example:
            // काम-उपभोग-परम → "whose supreme [aim] is desire उपभोग"
            // — clearer than dropping उपभोग entirely.
            const innerParts = components.slice(0, -1).map(({ part, dcsGloss, vocab }) => {
              const g = dcsGloss || vocab?.gloss;
              if (!g) return part;
              return g.split(/[—,;(]/)[0].trim();
            });
            derivedType = 'बहुव्रीहि (inferred)';
            if (innerParts.length > 0) {
              derivedGloss = `${BAHUVRIHI_HEADS[lastStem]} ${innerParts.join(' ')}`;
            }
          }
        }
        derived.push({
          compound: pada,
          vigraha: parts.join(' + '),
          type: derivedType,
          gloss: derivedGloss,
          source: match ? 'derived-from-vibhakti' : 'derived-from-padaccheda',
        });
      }
      if (derived.length > 0) v.samasNotes = derived;
    }

    if (!v.english) {
      const t = BESANT_TRANSLATIONS[key];
      if (t) v.english = t;
    }

    if (!v.hindi) {
      const t = HINDI_TRANSLATIONS[key];
      if (t) v.hindi = t;
    }

    const arnold = ARNOLD_TRANSLATIONS[key];
    if (arnold) {
      if (!v.references) v.references = { translations: [], commentaries: [] };
      if (!Array.isArray(v.references.translations)) v.references.translations = [];
      const already = v.references.translations.some((t) => t.translator === 'Edwin Arnold');
      if (!already) {
        v.references.translations.push({
          translator: 'Edwin Arnold',
          year: 1885,
          license: 'public-domain',
          work: 'The Song Celestial',
          text: arnold,
        });
      }
    }

    const shankara = SHANKARA_SUMMARIES[key];
    if (shankara) {
      if (!v.references) v.references = { translations: [], commentaries: [] };
      if (!Array.isArray(v.references.commentaries)) v.references.commentaries = [];
      const already = v.references.commentaries.some((c) => c.sage === 'Śaṅkara');
      if (!already) {
        v.references.commentaries.push({
          sage: 'Śaṅkara',
          school: 'Advaita Vedānta',
          summary: shankara,
        });
      }
    }

    const interp = INTERP_NOTES[key];
    if (interp) {
      if (interp.anvaya && !v.anvaya) v.anvaya = interp.anvaya;
      if (Array.isArray(interp.vibhaktiNotes) && (!v.vibhaktiNotes || v.vibhaktiNotes.length === 0)) {
        v.vibhaktiNotes = interp.vibhaktiNotes;
      }
      if (Array.isArray(interp.keyFights) && (!v.keyFights || v.keyFights.length === 0)) {
        v.keyFights = interp.keyFights;
      }
      if (Array.isArray(interp.vyakhya) && (!v.vyakhya || v.vyakhya.length === 0)) {
        v.vyakhya = interp.vyakhya;
      }
    }
  }

  // Second pass: fill MISSING fields on full / browse-tier verses too.
  // Hand-decoded verses keep all their curated content (gated on
  // `!v.<field>` so the override never overwrites). This catches cases
  // like 18.66 (browse-tier hand-decoded with rich anvaya/vyakhya but
  // no vibhaktiNotes/keyFights — interp data fills the gap).
  for (const v of VERSES) {
    if (v.tier === 'auto-stub') continue;
    const key = `${v.chapter}.${v.verse}`;
    const interp = INTERP_NOTES[key];
    if (!interp) continue;
    if (interp.anvaya && !v.anvaya) v.anvaya = interp.anvaya;
    if (Array.isArray(interp.vibhaktiNotes) && (!v.vibhaktiNotes || v.vibhaktiNotes.length === 0)) {
      v.vibhaktiNotes = interp.vibhaktiNotes;
    }
    if (Array.isArray(interp.keyFights) && (!v.keyFights || v.keyFights.length === 0)) {
      v.keyFights = interp.keyFights;
    }
    if (Array.isArray(interp.vyakhya) && (!v.vyakhya || v.vyakhya.length === 0)) {
      v.vyakhya = interp.vyakhya;
    }
  }

  // Fill futureStem on bulk-extended dhātus that lack it. Top-25
  // entries already have hand-curated futureStem and won't be touched.
  // This unblocks the लृट् column in DhatuDetail's conjugation grid
  // for the ~80 in-Gītā dhātus that were previously blank.
  for (const d of DHATUS_EXTENDED) {
    if (d.futureStem) continue;
    const stem = FUTURE_STEMS[d.id];
    if (stem) d.futureStem = stem;
  }

  // Third pass: back-populate gitaOccurrences on each dhātu by scanning
  // every verse's finiteVerbs across the whole corpus. The original 25
  // top-frequency dhātus were hand-curated with gitaOccurrences (and
  // those entries are preserved); the other ~167 dhātus from the
  // bulk-extended list previously had nothing. Catches "In Gītā" filter
  // dhātus across all 18 chapters automatically.
  const rootKeyMap = new Map();
  for (const d of DHATUS_EXTENDED) {
    // Index by every plausible key the finiteVerbs root field might
    // use: bare devanagari, devanagari without trailing virama, with √
    // prefix, etc.
    const bareDeva = d.devanagari.replace(/्$/, '');
    rootKeyMap.set(d.devanagari, d);
    rootKeyMap.set(bareDeva, d);
    rootKeyMap.set('√' + d.devanagari, d);
    rootKeyMap.set('√' + bareDeva, d);
    if (d.id) rootKeyMap.set(d.id, d);
  }
  for (const v of VERSES) {
    for (const fv of v.finiteVerbs || []) {
      if (!fv.root) continue;
      const dhatu = rootKeyMap.get(fv.root) || rootKeyMap.get(fv.root.replace(/^√/, ''));
      if (!dhatu) continue;
      if (!Array.isArray(dhatu.gitaOccurrences)) dhatu.gitaOccurrences = [];
      // Skip if this exact (chapter, verse, form) is already recorded —
      // top-25 entries have curated examples we don't want to dupe.
      const already = dhatu.gitaOccurrences.some(
        (o) => o.chapter === v.chapter && o.verse === v.verse && o.form === fv.form
      );
      if (already) continue;
      dhatu.gitaOccurrences.push({
        chapter: v.chapter,
        verse: v.verse,
        form: fv.form,
        context: fv.gloss
          ? `${fv.form} — ${fv.gloss}`
          : `${fv.form} (${fv.lakara || '?'} ${fv.purusha || '?'} ${fv.vachana || '?'})`,
      });
    }
  }
}
