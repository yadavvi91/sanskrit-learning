// उपसर्ग — the 22 traditional verbal prefixes that attach to dhātus
// and "violently change meaning" (Pāṇini: उपसर्गेण धात्वर्थो बलाद् अन्यत्र नीयते).
//
// Order matters for the prefix-stripping parser: longer prefixes are tried
// first so प्रति is matched before प्र. Sandhi between prefix and root is
// not yet handled (e.g., उद् + स्था → उत्तिष्ठ would need to know that
// उद् + त् → उत्); this list and the parser handle plain string-prefix cases.

export const UPASARGAS = [
  { prefix: 'प्रति',  iast: 'prati', sense: 'against / towards / back' },
  { prefix: 'परा',  iast: 'parā',  sense: 'away / off' },
  { prefix: 'सम्',   iast: 'sam',   sense: 'with / together / completely' },
  { prefix: 'अनु',  iast: 'anu',   sense: 'after / following' },
  { prefix: 'अधि',  iast: 'adhi',  sense: 'over / above / on' },
  { prefix: 'अपि',  iast: 'api',   sense: 'also / on / unto' },
  { prefix: 'अति',  iast: 'ati',   sense: 'beyond / very' },
  { prefix: 'अभि',  iast: 'abhi',  sense: 'towards / very / against' },
  { prefix: 'परि',  iast: 'pari',  sense: 'around / about' },
  { prefix: 'निस्', iast: 'nis',   sense: 'out / away from' },
  { prefix: 'निर्', iast: 'nir',   sense: 'out / away from' },
  { prefix: 'दुस्', iast: 'dus',   sense: 'badly / hard' },
  { prefix: 'दुर्', iast: 'dur',   sense: 'badly / hard' },
  { prefix: 'अप',  iast: 'apa',   sense: 'away / off' },
  { prefix: 'अव',  iast: 'ava',   sense: 'down / off' },
  { prefix: 'उप',  iast: 'upa',   sense: 'near / towards / under' },
  { prefix: 'उद्', iast: 'ud',    sense: 'up / out' },
  { prefix: 'प्र',  iast: 'pra',   sense: 'forth / forward' },
  { prefix: 'वि',  iast: 'vi',    sense: 'apart / asunder / variously' },
  { prefix: 'आ',   iast: 'ā',     sense: 'up to / hither' },
  { prefix: 'नि',  iast: 'ni',    sense: 'down / into' },
  { prefix: 'सु',  iast: 'su',    sense: 'well / good (rare as verbal upasarga)' },
];

// Sorted descending by length so the parser tries longer prefixes first.
export const UPASARGAS_BY_LENGTH = [...UPASARGAS].sort(
  (a, b) => b.prefix.length - a.prefix.length
);

const BY_PREFIX = new Map(UPASARGAS.map((u) => [u.prefix, u]));
export function lookupUpasarga(prefix) {
  return BY_PREFIX.get(prefix) ?? null;
}

// Try to peel one or more upasargas off the front of `form`.
// Returns { stripped, prefixes: [up1, up2, ...] } where `stripped` is the
// remainder after all prefixes are removed and `prefixes` is the list (in
// the order they appeared, outermost first).
export function stripUpasargas(form) {
  let remaining = form;
  const prefixes = [];
  // Try up to 2 stacked prefixes (समवेत = सम् + अव + …)
  for (let i = 0; i < 2; i++) {
    let matched = null;
    for (const u of UPASARGAS_BY_LENGTH) {
      if (remaining.startsWith(u.prefix) && remaining.length > u.prefix.length) {
        matched = u;
        break;
      }
    }
    if (!matched) break;
    prefixes.push(matched);
    remaining = remaining.slice(matched.prefix.length);
  }
  return { stripped: remaining, prefixes };
}
