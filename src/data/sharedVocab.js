// Shared Sanskrit word dictionary. Used as a fallback by buildVocabulary()
// when a verse doesn't carry per-word parsing for a given पद.
//
// Each entry is keyed by the exact padaccheda surface form. Same shape as
// verse.wordParsings entries: { category, root, gender?, number?, case?, gloss }.
//
// Coverage philosophy: focus on words that recur across the Gītā corpus —
// particles, pronouns, common vocatives, frequent verbs/nouns. Hand-curated
// rather than auto-extracted. As more verses get fully decoded, those verses'
// own wordParsings still take precedence; this dictionary fills the gap.

export const SHARED_VOCAB = {
  // ───── Particles (अव्यय) ─────
  'च':       { category: 'particle', gloss: 'and (clitic — cannot begin a sentence)' },
  'एव':      { category: 'particle', gloss: 'only / itself / exactly (emphatic)' },
  'अपि':    { category: 'particle', gloss: 'also / even' },
  'इति':    { category: 'particle', gloss: 'thus / closing-quotation' },
  'हि':      { category: 'particle', gloss: 'indeed / for / because' },
  'तु':       { category: 'particle', gloss: 'but / however' },
  'न':        { category: 'particle', gloss: 'not (general negation)' },
  'मा':      { category: 'particle', gloss: "don't / not (with लोट्/लुङ्)" },
  'स्म':     { category: 'particle', gloss: 'emphatic — strengthens मा into "definitely do not"' },
  'खलु':    { category: 'particle', gloss: 'truly / indeed' },
  'इह':       { category: 'particle', gloss: 'here / in this world' },
  'अत्र':    { category: 'particle', gloss: 'here' },
  'तत्र':    { category: 'particle', gloss: 'there' },
  'यत्र':    { category: 'particle', gloss: 'where (relative)' },
  'यथा':    { category: 'particle', gloss: 'as / in the manner that' },
  'तथा':    { category: 'particle', gloss: 'so / in that manner' },
  'यदा':    { category: 'particle', gloss: 'when (relative)' },
  'तदा':    { category: 'particle', gloss: 'then' },
  'कथम्':  { category: 'particle', gloss: 'how?' },
  'कदा':    { category: 'particle', gloss: 'when?' },
  'कदाचन': { category: 'particle', gloss: 'ever / at any time (with मा: never)' },
  'सर्वत्र':  { category: 'particle', gloss: 'everywhere' },
  'तस्मात्':  { category: 'particle', gloss: 'therefore' },
  'इव':       { category: 'particle', gloss: 'like / as if' },

  // ───── Pronouns (सर्वनाम) — common case forms ─────
  'अहम्':    { category: 'pronoun', root: 'अस्मद्', gender: '-', number: 'eka', case: 'pra', gloss: 'I' },
  'त्वम्':    { category: 'pronoun', root: 'युष्मद्', gender: '-', number: 'eka', case: 'pra', gloss: 'you' },
  'त्वा':     { category: 'pronoun', root: 'युष्मद्', gender: '-', number: 'eka', case: 'dvi', gloss: 'you (acc.)' },
  'माम्':    { category: 'pronoun', root: 'अस्मद्', gender: '-', number: 'eka', case: 'dvi', gloss: 'me' },
  'मे':       { category: 'pronoun', root: 'अस्मद्', gender: '-', number: 'eka', case: 'sha', gloss: 'my / mine (enclitic)' },
  'ते':       { category: 'pronoun', root: 'युष्मद्', gender: '-', number: 'eka', case: 'sha', gloss: 'your / yours (enclitic)' },
  'मयि':     { category: 'pronoun', root: 'अस्मद्', gender: '-', number: 'eka', case: 'sap', gloss: 'in/on me' },
  'मया':     { category: 'pronoun', root: 'अस्मद्', gender: '-', number: 'eka', case: 'tri', gloss: 'by me' },
  'त्वयि':   { category: 'pronoun', root: 'युष्मद्', gender: '-', number: 'eka', case: 'sap', gloss: 'in you' },
  'सः':       { category: 'pronoun', root: 'तद्', gender: 'm', number: 'eka', case: 'pra', gloss: 'he / that' },
  'तत्':     { category: 'pronoun', root: 'तद्', gender: 'n', number: 'eka', case: 'pra', gloss: 'it / that' },
  'तस्य':   { category: 'pronoun', root: 'तद्', gender: 'm/n', number: 'eka', case: 'sha', gloss: 'his / its' },
  'तस्मिन्': { category: 'pronoun', root: 'तद्', gender: 'm/n', number: 'eka', case: 'sap', gloss: 'in him / in that' },
  'तेषाम्':  { category: 'pronoun', root: 'तद्', gender: 'm', number: 'bahu', case: 'sha', gloss: 'of them / their' },
  'यः':       { category: 'pronoun', root: 'यद्', gender: 'm', number: 'eka', case: 'pra', gloss: 'who / which (relative)' },
  'यत्':     { category: 'pronoun', root: 'यद्', gender: 'n', number: 'eka', case: 'pra', gloss: 'what / which (relative)' },
  'ये':       { category: 'pronoun', root: 'यद्', gender: 'm', number: 'bahu', case: 'pra', gloss: 'who / which (rel., pl.)' },
  'किम्':    { category: 'pronoun', root: 'किम्', gender: 'n', number: 'eka', case: 'pra', gloss: 'what?' },
  'अस्मिन्': { category: 'pronoun', root: 'इदम्', gender: 'm/n', number: 'eka', case: 'sap', gloss: 'in this' },
  'एनम्':   { category: 'pronoun', root: 'एनद्', gender: 'm', number: 'eka', case: 'dvi', gloss: 'this / him (anaphoric)' },
  'एतत्':   { category: 'pronoun', root: 'एतद्', gender: 'n', number: 'eka', case: 'pra', gloss: 'this' },
  'एकम्':   { category: 'adjective', root: 'एक', gender: 'm', number: 'eka', case: 'dvi', gloss: 'one (acc.)' },
  'सर्वम्':  { category: 'adjective', root: 'सर्व', gender: 'n', number: 'eka', case: 'pra', gloss: 'all / everything' },
  'उभे':     { category: 'adjective', root: 'उभ', gender: 'n', number: 'dvi', case: 'dvi', gloss: 'both (n. dual)' },
  'तान्':    { category: 'pronoun', root: 'तद्', gender: 'm', number: 'bahu', case: 'dvi', gloss: 'them (m. acc. pl.)' },

  // ───── Vocatives — frequent epithets ─────
  'कौन्तेय':   { category: 'noun', root: 'कौन्तेय', gender: 'm', number: 'eka', case: 'sam', gloss: 'O son of Kuntī (= Arjuna)' },
  'पार्थ':      { category: 'noun', root: 'पार्थ', gender: 'm', number: 'eka', case: 'sam', gloss: 'O son of Pṛthā (= Arjuna)' },
  'भारत':       { category: 'noun', root: 'भारत', gender: 'm', number: 'eka', case: 'sam', gloss: 'O descendant of Bharata' },
  'धनञ्जय':    { category: 'noun', root: 'धनञ्जय', gender: 'm', number: 'eka', case: 'sam', gloss: 'O winner of wealth (= Arjuna)' },
  'कृष्ण':     { category: 'noun', root: 'कृष्ण', gender: 'm', number: 'eka', case: 'sam', gloss: 'O Krishna' },

  // ───── Common verb forms ─────
  'भवति':      { category: 'verb', root: '√भू', gana: 1, pada: 'P', lakara: 'lat', purusha: 'prathama', number: 'eka', gloss: 'is / becomes / arises' },
  'अस्ति':     { category: 'verb', root: '√अस्', gana: 2, pada: 'P', lakara: 'lat', purusha: 'prathama', number: 'eka', gloss: 'is / exists' },
  'गच्छति':   { category: 'verb', root: '√गम्', gana: 1, pada: 'P', lakara: 'lat', purusha: 'prathama', number: 'eka', gloss: 'goes' },
  'पश्यति':    { category: 'verb', root: '√दृश्', gana: 1, pada: 'P', lakara: 'lat', purusha: 'prathama', number: 'eka', gloss: 'sees' },

  // ───── Common nouns / adjectives across the corpus ─────
  'देहिनः':       { category: 'noun', root: 'देहिन्', gender: 'm', number: 'eka', case: 'sha', gloss: "of the embodied (soul)" },
  'देही':         { category: 'noun', root: 'देहिन्', gender: 'm', number: 'eka', case: 'pra', gloss: 'the embodied (soul)' },
  'देहे':         { category: 'noun', root: 'देह', gender: 'm', number: 'eka', case: 'sap', gloss: 'in the body' },
  'शरीराणि':    { category: 'noun', root: 'शरीर', gender: 'n', number: 'bahu', case: 'dvi', gloss: 'bodies' },
  'आत्मा':       { category: 'noun', root: 'आत्मन्', gender: 'm', number: 'eka', case: 'pra', gloss: 'self / soul' },
  'आत्मानम्':   { category: 'noun', root: 'आत्मन्', gender: 'm', number: 'eka', case: 'dvi', gloss: 'the self (acc.)' },
  'आत्मना':    { category: 'noun', root: 'आत्मन्', gender: 'm', number: 'eka', case: 'tri', gloss: 'by the self' },
  'आत्मनः':    { category: 'noun', root: 'आत्मन्', gender: 'm', number: 'eka', case: 'sha', gloss: 'of the self' },
  'मनः':         { category: 'noun', root: 'मनस्', gender: 'n', number: 'eka', case: 'pra', gloss: 'the mind' },
  'बुद्धि':       { category: 'noun', root: 'बुद्धि', gender: 'f', number: 'eka', case: 'pra', gloss: 'intellect / discriminating reason' },
  'धर्मस्य':     { category: 'noun', root: 'धर्म', gender: 'm', number: 'eka', case: 'sha', gloss: 'of dharma' },
  'अधर्मस्य':   { category: 'noun', root: 'अधर्म', gender: 'm', number: 'eka', case: 'sha', gloss: 'of adharma' },
  'योगः':        { category: 'noun', root: 'योग', gender: 'm', number: 'eka', case: 'pra', gloss: 'yoga' },
  'कर्म':        { category: 'noun', root: 'कर्मन्', gender: 'n', number: 'eka', case: 'pra', gloss: 'action / work' },
  'कर्मणि':     { category: 'noun', root: 'कर्मन्', gender: 'n', number: 'eka', case: 'sap', gloss: 'in action' },
  'कर्माणि':    { category: 'noun', root: 'कर्मन्', gender: 'n', number: 'bahu', case: 'dvi', gloss: 'actions / works' },
  'फलेषु':       { category: 'noun', root: 'फल', gender: 'n', number: 'bahu', case: 'sap', gloss: 'in fruits / results' },
  'सङ्गः':       { category: 'noun', root: 'सङ्ग', gender: 'm', number: 'eka', case: 'pra', gloss: 'attachment' },
  'कामः':       { category: 'noun', root: 'काम', gender: 'm', number: 'eka', case: 'pra', gloss: 'desire' },
  'क्रोधः':      { category: 'noun', root: 'क्रोध', gender: 'm', number: 'eka', case: 'pra', gloss: 'anger' },
  'सम्मोहः':    { category: 'noun', root: 'सम्मोह', gender: 'm', number: 'eka', case: 'pra', gloss: 'delusion / confusion' },
  'विषयान्':    { category: 'noun', root: 'विषय', gender: 'm', number: 'bahu', case: 'dvi', gloss: 'sense-objects' },
  'लोके':        { category: 'noun', root: 'लोक', gender: 'm', number: 'eka', case: 'sap', gloss: 'in the world' },
  'लोकः':        { category: 'noun', root: 'लोक', gender: 'm', number: 'eka', case: 'pra', gloss: 'the world / people' },
  'जनः':         { category: 'noun', root: 'जन', gender: 'm', number: 'eka', case: 'pra', gloss: 'a person / people' },
  'जनाः':        { category: 'noun', root: 'जन', gender: 'm', number: 'bahu', case: 'pra', gloss: 'people' },
  'गुरून्':       { category: 'noun', root: 'गुरु', gender: 'm', number: 'bahu', case: 'dvi', gloss: 'gurus / teachers (acc. pl.)' },
  'भोगान्':       { category: 'noun', root: 'भोग', gender: 'm', number: 'bahu', case: 'dvi', gloss: 'pleasures / enjoyments' },
  'धीरः':         { category: 'adjective', root: 'धीर', gender: 'm', number: 'eka', case: 'pra', gloss: 'the wise / steadfast one' },
  'श्रेष्ठः':     { category: 'adjective', root: 'श्रेष्ठ', gender: 'm', number: 'eka', case: 'pra', gloss: 'best / preeminent' },
  'इतरः':        { category: 'adjective', root: 'इतर', gender: 'm', number: 'eka', case: 'pra', gloss: 'the other / common (person)' },
  'श्रेयः':       { category: 'adjective', root: 'श्रेयस्', gender: 'n', number: 'eka', case: 'pra', gloss: 'better / preferable' },
  'समः':         { category: 'adjective', root: 'सम', gender: 'm', number: 'eka', case: 'pra', gloss: 'equal / even-minded' },
  'जरा':          { category: 'noun', root: 'जरा', gender: 'f', number: 'eka', case: 'pra', gloss: 'old age' },
  'कौमारम्':     { category: 'noun', root: 'कौमार', gender: 'n', number: 'eka', case: 'pra', gloss: 'childhood' },
  'यौवनम्':     { category: 'noun', root: 'यौवन', gender: 'n', number: 'eka', case: 'pra', gloss: 'youth' },
  'शरणम्':      { category: 'noun', root: 'शरण', gender: 'n', number: 'eka', case: 'dvi', gloss: 'refuge / shelter' },

  // ───── कृदन्त (non-finite forms) ─────
  'विहाय':      { category: 'krdanta', root: 'वि + √हा', kind: 'absolutive', gloss: 'having cast off / having abandoned' },
  'चिन्तयन्तः': { category: 'krdanta', root: '√चिन्त्', kind: 'present participle (m. nom. pl.)', gloss: 'thinking / meditating' },
  'जितः':       { category: 'krdanta', root: '√जि', kind: 'past passive participle', gloss: 'has been conquered' },
  'त्यक्त्वा':   { category: 'krdanta', root: '√त्यज्', kind: 'absolutive', gloss: 'having abandoned' },
  'भूत्वा':      { category: 'krdanta', root: '√भू', kind: 'absolutive', gloss: 'having become' },
  'परित्यज्य':  { category: 'krdanta', root: 'परि + √त्यज्', kind: 'absolutive', gloss: 'having completely abandoned' },
};

// Helper: lookup with both exact match and a small fall-through for hyphenated
// surface forms (e.g., padaccheda may use "आगम-अपायिनः" while the dictionary
// keys the unhyphenated form). Returns null if not found.
export function lookupSharedVocab(word) {
  if (!word) return null;
  if (SHARED_VOCAB[word]) return SHARED_VOCAB[word];
  // Try without hyphens (compound surface form → dictionary form)
  const dehyphenated = word.replace(/-/g, '');
  if (SHARED_VOCAB[dehyphenated]) return SHARED_VOCAB[dehyphenated];
  return null;
}
