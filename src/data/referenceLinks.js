// Generic reference-link helper for WordPopover.
//
// Given a parsing object (from lookupSharedVocab or hand-decoded
// wordParsings), return { url, label } for a "see in [reference]"
// button — so every popover has at least one outbound link to a
// pedagogical resource (Atlas / Primer / Verbs page).
//
// Returns null only when the parsing has no usable category. In
// practice every category has a fallback link, so this almost
// always returns something.

import { getDeclensionForParsing, getDeclensionById } from './declensions.js';
import { getPronounAnchor } from './pronouns.js';
import { DHATUS_EXTENDED } from './dhatus-extended.js';

// Build a quick lookup by both id and devanagari (with/without virama)
// so reference links can verify a dhatu actually exists in the Verbs
// page before linking there. Without this check, /verbs/ध्मा silently
// falls back to /verbs/भू (the first dhatu) — confusing.
const DHATU_REGISTRY = (() => {
  const set = new Set();
  for (const d of DHATUS_EXTENDED) {
    if (d.id) set.add(d.id);
    if (d.devanagari) {
      set.add(d.devanagari);
      set.add(d.devanagari.replace(/्$/, ''));
    }
  }
  return set;
})();
function dhatuExists(rootKey) {
  return DHATU_REGISTRY.has(rootKey)
      || DHATU_REGISTRY.has(rootKey.replace(/्$/, ''))
      || DHATU_REGISTRY.has(rootKey + '्');
}

const KIND_TO_PRIMER_TARGET = {
  'absolutive':      { url: '/primer#krdanta', label: 'see in Primer — कृदन्त (absolutive form)' },
  'infinitive':      { url: '/primer#krdanta', label: 'see in Primer — कृदन्त (infinitive form)' },
  'gerundive':       { url: '/primer#krdanta', label: 'see in Primer — कृदन्त (gerundive form)' },
  'past-passive':    { url: '/primer#krdanta', label: 'see in Primer — कृदन्त (past passive participle)' },
  'present-active':  { url: '/primer#krdanta', label: 'see in Primer — कृदन्त (present active participle / शतृ)' },
};

// Returns { url, label } or null. The CALLER decides whether to
// show this in addition to a more-specific link or instead of one.
export function getReferenceLink(parsing) {
  if (!parsing || typeof parsing !== 'object') return null;
  const { category, kind, lakara } = parsing;

  // Category-specific routing.
  switch (category) {
    case 'noun':
    case 'adjective': {
      // Try paradigm-class link first (most specific).
      const paradigmId = getDeclensionForParsing(parsing);
      const paradigm = paradigmId ? getDeclensionById(paradigmId) : null;
      if (paradigm) {
        return {
          url: `/atlas/declensions#${paradigm.id}`,
          label: `follows ${paradigm.name}-class — see all 24 forms`,
        };
      }
      // Fallback: Atlas Declensions index.
      return { url: '/atlas/declensions', label: 'see in Atlas — शब्दरूप (declension reference)' };
    }
    case 'pronoun': {
      const anchor = getPronounAnchor(parsing);
      if (anchor) {
        return {
          url: `/atlas/pronouns#${anchor.anchor}`,
          label: `see in सर्वनाम — ${anchor.label}`,
        };
      }
      return { url: '/atlas/pronouns', label: 'see in Atlas — सर्वनाम (pronoun tables)' };
    }
    case 'krdanta': {
      const target = KIND_TO_PRIMER_TARGET[kind];
      if (target) return target;
      // PPP with a noun-like declension may also link to declensions.
      if (kind === 'past-passive') {
        const paradigmId = getDeclensionForParsing(parsing);
        const paradigm = paradigmId ? getDeclensionById(paradigmId) : null;
        if (paradigm) {
          return {
            url: `/atlas/declensions#${paradigm.id}`,
            label: `PPP follows ${paradigm.name}-class — see all 24 forms`,
          };
        }
      }
      return { url: '/primer#krdanta', label: 'see in Primer — कृदन्त (verb-derived non-finite forms)' };
    }
    case 'verb': {
      // Strip "√" / preverb prefix to get a bare-root candidate.
      const rootMatch = parsing.root && /√([^\s]+)/.exec(parsing.root);
      const bareRoot = rootMatch ? rootMatch[1] : null;
      // Only link to /verbs/<id> if the dhatu is actually in the
      // Verbs page list. Otherwise the link silently falls back to
      // DHATUS[0] (= √भू) and surprises the user.
      if (bareRoot && dhatuExists(bareRoot)) {
        return {
          url: `/verbs/${bareRoot}`,
          label: `open √${bareRoot} in Verbs page`,
        };
      }
      // Dhatu exists in this verse but not in the 192-list yet.
      if (bareRoot && lakara) {
        return {
          url: '/primer#lakara',
          label: `see in Primer — लकार (√${bareRoot} not in the top-192 list yet)`,
        };
      }
      // Lakara-specific Primer hop.
      if (lakara) {
        return {
          url: '/primer#lakara',
          label: 'see in Primer — लकार (verb tense / mood reference)',
        };
      }
      return { url: '/verbs', label: 'see in Verbs — verb conjugation reference' };
    }
    case 'particle': {
      return { url: '/atlas/avyaya', label: 'see in Atlas — अव्यय (indeclinables)' };
    }
    case 'numeral': {
      return { url: '/primer#vibhakti', label: 'see in Primer — विभक्ति (numerals decline like adjectives)' };
    }
    default:
      return null;
  }
}

// Map "कृ" → "kr", "ध्मा" → "dhma", etc. — best-effort transliteration
// so /verbs/<id> route can resolve. Falls back to the bare devanagari
// itself (which the Verbs page can also handle).
function bareRootToId(deva) {
  // For now, just return the bare devanagari — the Verbs page resolves
  // by either id or devanagari root.
  return deva;
}
