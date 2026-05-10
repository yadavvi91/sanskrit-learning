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
  'ध्यायतः':    { category: 'krdanta', root: '√ध्यै', kind: 'present participle (gen. sg.)', gloss: 'of (the man) dwelling/meditating' },

  // ───── More finite verbs from the corpus ─────
  'मुह्यति':       { category: 'verb', root: '√मुह्', gana: 4, pada: 'P', lakara: 'lat', purusha: 'prathama', number: 'eka', gloss: 'is deluded' },
  'तितिक्षस्व':   { category: 'verb', root: '√तिज् (desid.)', lakara: 'lot', purusha: 'madhyama', number: 'eka', gloss: 'endure!' },
  'गृह्णाति':     { category: 'verb', root: '√ग्रह्', gana: 9, pada: 'P', lakara: 'lat', purusha: 'prathama', number: 'eka', gloss: 'takes / receives' },
  'संयाति':       { category: 'verb', root: 'सम् + √या', lakara: 'lat', purusha: 'prathama', number: 'eka', gloss: 'goes / passes into' },
  'छिन्दन्ति':    { category: 'verb', root: '√छिद्', gana: 7, pada: 'P', lakara: 'lat', purusha: 'prathama', number: 'bahu', gloss: 'cleave / cut' },
  'दहति':         { category: 'verb', root: '√दह्', gana: 1, pada: 'P', lakara: 'lat', purusha: 'prathama', number: 'eka', gloss: 'burns' },
  'क्लेदयन्ति':  { category: 'verb', root: '√क्लिद् (caus.)', lakara: 'lat', purusha: 'prathama', number: 'bahu', gloss: 'wet' },
  'शोषयति':      { category: 'verb', root: '√शुष् (caus.)', lakara: 'lat', purusha: 'prathama', number: 'eka', gloss: 'dries' },
  'भूः':           { category: 'verb', root: '√भू', lakara: 'lot (negated by मा)', purusha: 'madhyama', number: 'eka', gloss: 'be — negated: "do not be"' },
  'अस्तु':         { category: 'verb', root: '√अस्', gana: 2, pada: 'P', lakara: 'lot', purusha: 'prathama', number: 'eka', gloss: 'let it be' },
  'कुरु':          { category: 'verb', root: '√कृ', gana: 8, pada: 'P', lakara: 'lot', purusha: 'madhyama', number: 'eka', gloss: 'do!' },
  'उच्यते':      { category: 'verb', root: '√वच्', lakara: 'lat (passive)', purusha: 'prathama', number: 'eka', gloss: 'is called / is said' },
  'जहाति':        { category: 'verb', root: '√हा', gana: 3, pada: 'P', lakara: 'lat', purusha: 'prathama', number: 'eka', gloss: 'casts off / abandons' },
  'युज्यस्व':    { category: 'verb', root: '√युज्', lakara: 'lot', purusha: 'madhyama', number: 'eka', gloss: 'yoke yourself!' },
  'उपजायते':    { category: 'verb', root: 'उप + √जन्', lakara: 'lat', purusha: 'prathama', number: 'eka', gloss: 'arises (proximally)' },
  'सञ्जायते':   { category: 'verb', root: 'सम् + √जन्', lakara: 'lat', purusha: 'prathama', number: 'eka', gloss: 'is fully born / springs up' },
  'अभिजायते':  { category: 'verb', root: 'अभि + √जन्', lakara: 'lat', purusha: 'prathama', number: 'eka', gloss: 'arises forth (climactically)' },
  'प्रणश्यति':   { category: 'verb', root: 'प्र + √नश्', lakara: 'lat', purusha: 'prathama', number: 'eka', gloss: 'perishes' },
  'प्रणश्यामि': { category: 'verb', root: 'प्र + √नश्', lakara: 'lat', purusha: 'uttama', number: 'eka', gloss: 'I am lost / perish' },
  'आचरति':      { category: 'verb', root: 'आ + √चर्', lakara: 'lat', purusha: 'prathama', number: 'eka', gloss: 'practices / does' },
  'कुरुते':      { category: 'verb', root: '√कृ', gana: 8, pada: 'A', lakara: 'lat', purusha: 'prathama', number: 'eka', gloss: 'does (for himself)' },
  'अनुवर्तते': { category: 'verb', root: 'अनु + √वृत्', lakara: 'lat', purusha: 'prathama', number: 'eka', gloss: 'follows' },
  'सृजामि':      { category: 'verb', root: '√सृज्', lakara: 'lat', purusha: 'uttama', number: 'eka', gloss: 'I send forth / I manifest' },
  'सम्भवामि':  { category: 'verb', root: 'सम् + √भू', lakara: 'lat', purusha: 'uttama', number: 'eka', gloss: 'I come into being / I manifest' },
  'उद्धरेत्':     { category: 'verb', root: 'उद् + √हृ', lakara: 'vidhilin', purusha: 'prathama', number: 'eka', gloss: 'should lift up' },
  'अवसादयेत्': { category: 'verb', root: 'अव + √सद् (caus.)', lakara: 'vidhilin', purusha: 'prathama', number: 'eka', gloss: 'should let sink' },
  'वर्तेत':      { category: 'verb', root: '√वृत्', lakara: 'vidhilin (Ā)', purusha: 'prathama', number: 'eka', gloss: 'would behave' },
  'मन्ये':         { category: 'verb', root: '√मन्', lakara: 'lat (Ā)', purusha: 'uttama', number: 'eka', gloss: 'I think / I deem' },
  'पर्युपासते':  { category: 'verb', root: 'परि + उप + √आस्', lakara: 'lat', purusha: 'prathama', number: 'bahu', gloss: 'they worship / sit around (in reverence)' },
  'वहामि':        { category: 'verb', root: '√वह्', lakara: 'lat', purusha: 'uttama', number: 'eka', gloss: 'I bear / I provide' },
  'करोषि':       { category: 'verb', root: '√कृ', gana: 8, pada: 'P', lakara: 'lat', purusha: 'madhyama', number: 'eka', gloss: 'you do' },
  'अश्नासि':     { category: 'verb', root: '√अश्', lakara: 'lat', purusha: 'madhyama', number: 'eka', gloss: 'you eat' },
  'जुहोषि':      { category: 'verb', root: '√हु', lakara: 'lat', purusha: 'madhyama', number: 'eka', gloss: 'you offer in sacrifice' },
  'ददासि':      { category: 'verb', root: '√दा', lakara: 'lat', purusha: 'madhyama', number: 'eka', gloss: 'you give' },
  'तपस्यसि':    { category: 'verb', root: '√तप्', lakara: 'lat', purusha: 'madhyama', number: 'eka', gloss: 'you perform austerity' },
  'कुरुष्व':     { category: 'verb', root: '√कृ', gana: 8, pada: 'A', lakara: 'lot', purusha: 'madhyama', number: 'eka', gloss: 'do (it for yourself)!' },
  'व्रज':         { category: 'verb', root: '√व्रज्', lakara: 'lot', purusha: 'madhyama', number: 'eka', gloss: 'go!' },
  'मोक्षयिष्यामि': { category: 'verb', root: '√मुच् (caus.)', lakara: 'lrt', purusha: 'uttama', number: 'eka', gloss: 'I will liberate / release' },
  'शुचः':        { category: 'verb', root: '√शुच्', lakara: 'lung (negated by मा)', purusha: 'madhyama', number: 'eka', gloss: 'grieve — negated: "do not grieve"' },

  // ───── More nouns / adjectives from the corpus ─────
  'पुंसः':         { category: 'noun', root: 'पुम्स्', gender: 'm', number: 'eka', case: 'sha', gloss: 'of the man / person' },
  'सङ्गम्':       { category: 'noun', root: 'सङ्ग', gender: 'm', number: 'eka', case: 'dvi', gloss: 'attachment (acc.)' },
  'सङ्गात्':      { category: 'noun', root: 'सङ्ग', gender: 'm', number: 'eka', case: 'pan', gloss: 'from attachment' },
  'कामात्':       { category: 'noun', root: 'काम', gender: 'm', number: 'eka', case: 'pan', gloss: 'from desire' },
  'क्रोधात्':     { category: 'noun', root: 'क्रोध', gender: 'm', number: 'eka', case: 'pan', gloss: 'from anger' },
  'सम्मोहात्':   { category: 'noun', root: 'सम्मोह', gender: 'm', number: 'eka', case: 'pan', gloss: 'from delusion' },
  'तेषु':          { category: 'pronoun', root: 'तद्', gender: 'm', number: 'bahu', case: 'sap', gloss: 'in them / among them' },
  'अधिकारः':    { category: 'noun', root: 'अधिकार', gender: 'm', number: 'eka', case: 'pra', gloss: 'right / entitlement / authority' },
  'अकर्मणि':    { category: 'noun', root: 'अकर्मन्', gender: 'n', number: 'eka', case: 'sap', gloss: 'in inaction' },
  'समत्वम्':    { category: 'noun', root: 'समत्व', gender: 'n', number: 'eka', case: 'pra', gloss: 'equanimity / sameness' },
  'योगाय':       { category: 'noun', root: 'योग', gender: 'm', number: 'eka', case: 'cha', gloss: 'for yoga' },
  'कर्मसु':       { category: 'noun', root: 'कर्मन्', gender: 'n', number: 'bahu', case: 'sap', gloss: 'in actions' },
  'कौशलम्':     { category: 'noun', root: 'कौशल', gender: 'n', number: 'eka', case: 'pra', gloss: 'skill' },
  'वासांसि':     { category: 'noun', root: 'वासस्', gender: 'n', number: 'bahu', case: 'dvi', gloss: 'garments / clothes' },
  'जीर्णानि':   { category: 'adjective', root: 'जीर्ण', gender: 'n', number: 'bahu', case: 'dvi', gloss: 'worn out' },
  'नवानि':       { category: 'adjective', root: 'नव', gender: 'n', number: 'bahu', case: 'dvi', gloss: 'new' },
  'नरः':          { category: 'noun', root: 'नर', gender: 'm', number: 'eka', case: 'pra', gloss: 'a man' },
  'अपराणि':     { category: 'adjective', root: 'अपर', gender: 'n', number: 'bahu', case: 'dvi', gloss: 'others' },
  'अन्यानि':    { category: 'adjective', root: 'अन्य', gender: 'n', number: 'bahu', case: 'dvi', gloss: 'others / different ones' },
  'शस्त्राणि':  { category: 'noun', root: 'शस्त्र', gender: 'n', number: 'bahu', case: 'pra', gloss: 'weapons' },
  'पावकः':       { category: 'noun', root: 'पावक', gender: 'm', number: 'eka', case: 'pra', gloss: 'fire' },
  'आपः':          { category: 'noun', root: 'अप्', gender: 'f', number: 'bahu', case: 'pra', gloss: 'waters' },
  'मारुतः':      { category: 'noun', root: 'मारुत', gender: 'm', number: 'eka', case: 'pra', gloss: 'wind' },
  'पुंसा':        { category: 'noun', root: 'पुम्स्', gender: 'm', number: 'eka', case: 'tri', gloss: 'by a man' },
  'अनित्याः':    { category: 'adjective', root: 'अनित्य', gender: 'm', number: 'bahu', case: 'pra', gloss: 'impermanent' },
  'श्रेयान्':     { category: 'adjective', root: 'श्रेयस्', kind: 'comparative', gender: 'm', number: 'eka', case: 'pra', gloss: 'better / superior' },
  'विगुणः':      { category: 'adjective', root: 'विगुण', gender: 'm', number: 'eka', case: 'pra', gloss: 'devoid of merits / imperfectly performed' },
  'निधनम्':      { category: 'noun', root: 'निधन', gender: 'n', number: 'eka', case: 'pra', gloss: 'death' },
  'ग्लानिः':     { category: 'noun', root: 'ग्लानि', gender: 'f', number: 'eka', case: 'pra', gloss: 'decline / weakness' },
  'अभ्युत्थानम्': { category: 'noun', root: 'अभ्युत्थान', gender: 'n', number: 'eka', case: 'pra', gloss: 'rising / uprising' },
  'परित्राणाय':  { category: 'noun', root: 'परित्राण', gender: 'n', number: 'eka', case: 'cha', gloss: 'for the protection / rescue' },
  'साधूनाम्':    { category: 'noun', root: 'साधु', gender: 'm', number: 'bahu', case: 'sha', gloss: 'of the good / saintly (ones)' },
  'विनाशाय':    { category: 'noun', root: 'विनाश', gender: 'm', number: 'eka', case: 'cha', gloss: 'for the destruction' },
  'दुष्कृताम्': { category: 'noun', root: 'दुष्कृत्', gender: 'm', number: 'bahu', case: 'sha', gloss: 'of evildoers' },
  'युगे':         { category: 'noun', root: 'युग', gender: 'n', number: 'eka', case: 'sap', gloss: 'in (each) age' },
  'बन्धुः':      { category: 'noun', root: 'बन्धु', gender: 'm', number: 'eka', case: 'pra', gloss: 'friend / kinsman' },
  'रिपुः':        { category: 'noun', root: 'रिपु', gender: 'm', number: 'eka', case: 'pra', gloss: 'enemy' },
  'येन':          { category: 'pronoun', root: 'यद्', gender: 'm', number: 'eka', case: 'tri', gloss: 'by which / by whom' },
  'अनात्मनः':   { category: 'noun', root: 'अनात्मन्', gender: 'm', number: 'eka', case: 'sha', gloss: 'of the unconquered self' },
  'शत्रुत्वे':   { category: 'noun', root: 'शत्रुत्व', gender: 'n', number: 'eka', case: 'sap', gloss: 'in enmity' },
  'शत्रुवत्':    { category: 'particle', gloss: 'like an enemy' },
  'चञ्चलम्':    { category: 'adjective', root: 'चञ्चल', gender: 'n', number: 'eka', case: 'pra', gloss: 'restless / unsteady' },
  'प्रमाथि':     { category: 'adjective', root: 'प्रमाथिन्', gender: 'n', number: 'eka', case: 'pra', gloss: 'turbulent / agitating' },
  'बलवत्':       { category: 'adjective', root: 'बलवत्', gender: 'n', number: 'eka', case: 'pra', gloss: 'powerful / strong' },
  'दृढम्':        { category: 'adjective', root: 'दृढ', gender: 'n', number: 'eka', case: 'pra', gloss: 'firm / obstinate' },
  'निग्रहम्':    { category: 'noun', root: 'निग्रह', gender: 'm', number: 'eka', case: 'dvi', gloss: 'restraint / control' },
  'वायोः':       { category: 'noun', root: 'वायु', gender: 'm', number: 'eka', case: 'sha', gloss: 'of the wind' },
  'सुदुष्करम्':  { category: 'adjective', root: 'सुदुष्कर', gender: 'n', number: 'eka', case: 'pra', gloss: 'very difficult to do' },
  'अनन्याः':     { category: 'adjective', root: 'अनन्य', gender: 'm', number: 'bahu', case: 'pra', gloss: 'with no other (object) / single-minded' },
  'मैत्रः':       { category: 'adjective', root: 'मैत्र', gender: 'm', number: 'eka', case: 'pra', gloss: 'friendly' },
  'करुणः':       { category: 'adjective', root: 'करुण', gender: 'm', number: 'eka', case: 'pra', gloss: 'compassionate' },
  'निर्ममः':     { category: 'adjective', root: 'निर्मम', gender: 'm', number: 'eka', case: 'pra', gloss: 'free from "mine"-ness / non-possessive' },
  'निरहङ्कारः':  { category: 'adjective', root: 'निरहङ्कार', gender: 'm', number: 'eka', case: 'pra', gloss: 'free from ego' },
  'क्षमी':        { category: 'adjective', root: 'क्षमिन्', gender: 'm', number: 'eka', case: 'pra', gloss: 'forgiving / patient' },
  'कदाचित्':    { category: 'particle', gloss: 'sometimes / ever' },
  'फलम्':        { category: 'noun', root: 'फल', gender: 'n', number: 'eka', case: 'pra', gloss: 'fruit / result' },
  'प्रमाणम्':   { category: 'noun', root: 'प्रमाण', gender: 'n', number: 'eka', case: 'dvi', gloss: 'standard / proof / authority' },

  // ───── Common compounds (when seen in the padaccheda as one chunk) ─────
  'मात्रास्पर्शाः':       { category: 'noun', root: 'मात्रास्पर्श', gender: 'm', number: 'bahu', case: 'pra', gloss: 'sense-contacts (matter-touches)' },
  'शीतोष्णसुखदुःखदाः':  { category: 'adjective', root: 'शीतोष्णसुखदुःखद', gender: 'm', number: 'bahu', case: 'pra', gloss: 'giving cold/heat/pleasure/pain' },
  'आगमापायिनः':         { category: 'adjective', root: 'आगमापायिन्', gender: 'm', number: 'bahu', case: 'pra', gloss: 'coming-and-going (transient)' },
  'देहान्तरप्राप्तिः':    { category: 'noun', root: 'देहान्तरप्राप्ति', gender: 'f', number: 'eka', case: 'pra', gloss: 'attainment of another body' },
  'कर्मफलहेतुः':         { category: 'noun', root: 'कर्मफलहेतु', gender: 'm', number: 'eka', case: 'pra', gloss: 'cause of the fruit-of-action (motive)' },
  'योगस्थः':              { category: 'adjective', root: 'योगस्थ', gender: 'm', number: 'eka', case: 'pra', gloss: 'established in yoga' },
  'सिद्ध्यसिद्ध्योः':     { category: 'noun', root: 'सिद्ध्यसिद्धि', gender: 'f', number: 'dvi', case: 'sap', gloss: 'in success and failure' },
  'बुद्धियुक्तः':         { category: 'adjective', root: 'बुद्धियुक्त', gender: 'm', number: 'eka', case: 'pra', gloss: 'endowed with discriminating reason' },
  'सुकृतदुष्कृते':         { category: 'noun', root: 'सुकृतदुष्कृत', gender: 'n', number: 'dvi', case: 'dvi', gloss: 'good and bad deeds (the two)' },
  'धर्मसंस्थापनार्थाय':  { category: 'noun', root: 'धर्मसंस्थापनार्थ', gender: 'm', number: 'eka', case: 'cha', gloss: 'for the firm establishment of dharma' },
  'सर्वभूतानाम्':         { category: 'noun', root: 'सर्वभूत', gender: 'n', number: 'bahu', case: 'sha', gloss: 'of all beings' },
  'समदुःखसुखः':         { category: 'adjective', root: 'समदुःखसुख', gender: 'm', number: 'eka', case: 'pra', gloss: 'equal in pain and pleasure' },
  'महानुभावान्':         { category: 'adjective', root: 'महानुभाव', gender: 'm', number: 'bahu', case: 'dvi', gloss: 'noble-souled / of great spirit' },
  'अर्थकामान्':           { category: 'adjective', root: 'अर्थकाम', gender: 'm', number: 'bahu', case: 'dvi', gloss: 'driven by wealth and pleasure' },
  'रुधिरप्रदिग्धान्':    { category: 'adjective', root: 'रुधिरप्रदिग्ध', gender: 'm', number: 'bahu', case: 'dvi', gloss: 'smeared with blood' },
  'धर्मक्षेत्रे':           { category: 'noun', root: 'धर्मक्षेत्र', gender: 'n', number: 'eka', case: 'sap', gloss: 'in the field of dharma' },
  'कुरुक्षेत्रे':          { category: 'noun', root: 'कुरुक्षेत्र', gender: 'n', number: 'eka', case: 'sap', gloss: 'in the field of the Kurus' },
  // The Kuru clan / patriarch — proper noun, masc. -u stem.
  'कुरून्':                { category: 'noun', root: 'कुरु', gender: 'm', number: 'bahu', case: 'dvi', gloss: 'the Kurus (acc. pl.)' },
  'कुरूणाम्':              { category: 'noun', root: 'कुरु', gender: 'm', number: 'bahu', case: 'sha', gloss: 'of the Kurus' },
  'कुरुषु':                { category: 'noun', root: 'कुरु', gender: 'm', number: 'bahu', case: 'sap', gloss: 'among the Kurus' },
  'कौरवाणाम्':            { category: 'noun', root: 'कौरव', gender: 'm', number: 'bahu', case: 'sha', gloss: 'of the Kauravas (descendants of Kuru)' },
  'पाण्डवाः':              { category: 'noun', root: 'पाण्डव', gender: 'm', number: 'bahu', case: 'pra', gloss: 'the Pāṇḍavas (sons of Pāṇḍu)' },
  'पाण्डवानीकम्':          { category: 'noun', root: 'पाण्डवानीक', gender: 'n', number: 'eka', case: 'dvi', gloss: 'the army of the Pāṇḍavas' },
  'भीष्मः':                { category: 'noun', root: 'भीष्म', gender: 'm', number: 'eka', case: 'pra', gloss: 'Bhīṣma (the eldest Kuru elder)' },
  'भीष्ममहं':              { category: 'noun', root: 'भीष्म', gender: 'm', number: 'eka', case: 'dvi', gloss: 'Bhīṣma (acc.) + अहम् (I) — sandhi of भीष्मम् + अहम्' },
  'द्रोणः':                { category: 'noun', root: 'द्रोण', gender: 'm', number: 'eka', case: 'pra', gloss: 'Droṇa (the teacher)' },
  'द्रोणम्':                { category: 'noun', root: 'द्रोण', gender: 'm', number: 'eka', case: 'dvi', gloss: 'Droṇa (acc.)' },
  'पार्थः':                { category: 'noun', root: 'पार्थ', gender: 'm', number: 'eka', case: 'pra', gloss: 'Pārtha (Arjuna, son of Pṛthā)' },
  'पार्थ':                  { category: 'noun', root: 'पार्थ', gender: 'm', number: 'eka', case: 'sam', gloss: 'O Pārtha (vocative)' },
  'पार्थम्':                { category: 'noun', root: 'पार्थ', gender: 'm', number: 'eka', case: 'dvi', gloss: 'Pārtha (acc.)' },
  // Mahābhārata cast — bare/stem and common-vocative forms.
  // Some inflected variants are already entered above; these are the
  // base forms users see across many verses.
  'सञ्जय':                  { category: 'noun', root: 'सञ्जय', gender: 'm', number: 'eka', case: 'sam', gloss: 'O Sañjaya (Dhṛtarāṣṭra\'s charioteer-narrator)' },
  'धृतराष्ट्र':              { category: 'noun', root: 'धृतराष्ट्र', gender: 'm', number: 'eka', case: 'sam', gloss: 'Dhṛtarāṣṭra (the blind Kuru king)' },
  'धृतराष्ट्रः':             { category: 'noun', root: 'धृतराष्ट्र', gender: 'm', number: 'eka', case: 'pra', gloss: 'Dhṛtarāṣṭra (subject)' },
  'अर्जुन':                  { category: 'noun', root: 'अर्जुन', gender: 'm', number: 'eka', case: 'sam', gloss: 'O Arjuna' },
  'अर्जुनः':                 { category: 'noun', root: 'अर्जुन', gender: 'm', number: 'eka', case: 'pra', gloss: 'Arjuna (subject)' },
  'युधिष्ठिर':              { category: 'noun', root: 'युधिष्ठिर', gender: 'm', number: 'eka', case: 'sam', gloss: 'Yudhiṣṭhira (eldest Pāṇḍava)' },
  'भीम':                     { category: 'noun', root: 'भीम', gender: 'm', number: 'eka', case: 'sam', gloss: 'Bhīma (second Pāṇḍava)' },
  'नकुल':                    { category: 'noun', root: 'नकुल', gender: 'm', number: 'eka', case: 'sam', gloss: 'Nakula (fourth Pāṇḍava)' },
  'सहदेव':                  { category: 'noun', root: 'सहदेव', gender: 'm', number: 'eka', case: 'sam', gloss: 'Sahadeva (fifth Pāṇḍava)' },
  'द्रौपदी':                 { category: 'noun', root: 'द्रौपदी', gender: 'f', number: 'eka', case: 'pra', gloss: 'Draupadī (queen of the Pāṇḍavas)' },
  'कुन्ती':                  { category: 'noun', root: 'कुन्ती', gender: 'f', number: 'eka', case: 'pra', gloss: 'Kuntī (mother of the elder Pāṇḍavas)' },
  'गाण्डीव':                 { category: 'noun', root: 'गाण्डीव', gender: 'n', number: 'eka', case: 'pra', gloss: 'Gāṇḍīva (Arjuna\'s bow)' },
  'गाण्डीवम्':               { category: 'noun', root: 'गाण्डीव', gender: 'n', number: 'eka', case: 'dvi', gloss: 'Gāṇḍīva (acc. — the bow)' },
  'सात्यकि':                { category: 'noun', root: 'सात्यकि', gender: 'm', number: 'eka', case: 'pra', gloss: 'Sātyaki (warrior, Krishna\'s ally)' },
  'विकर्णः':                { category: 'noun', root: 'विकर्ण', gender: 'm', number: 'eka', case: 'pra', gloss: 'Vikarṇa (a Kaurava brother)' },
  'दुर्योधन':                { category: 'noun', root: 'दुर्योधन', gender: 'm', number: 'eka', case: 'sam', gloss: 'Duryodhana (eldest Kaurava)' },
  'दुर्योधनः':               { category: 'noun', root: 'दुर्योधन', gender: 'm', number: 'eka', case: 'pra', gloss: 'Duryodhana (subject)' },
  'शल्य':                    { category: 'noun', root: 'शल्य', gender: 'm', number: 'eka', case: 'sam', gloss: 'Śalya (king of Madra)' },
  'विराट':                   { category: 'noun', root: 'विराट', gender: 'm', number: 'eka', case: 'sam', gloss: 'Virāṭa (king who sheltered the Pāṇḍavas)' },
  'जयद्रथ':                  { category: 'noun', root: 'जयद्रथ', gender: 'm', number: 'eka', case: 'sam', gloss: 'Jayadratha (Sindhu king, ally of Kauravas)' },
  'काशिराज':                 { category: 'noun', root: 'काशिराज', gender: 'm', number: 'eka', case: 'pra', gloss: 'Kāśirāja (king of Kāśī)' },
  'पुरुजित':                 { category: 'noun', root: 'पुरुजित्', gender: 'm', number: 'eka', case: 'pra', gloss: 'Purujit (warrior name)' },
  'कुन्तिभोज':               { category: 'noun', root: 'कुन्तिभोज', gender: 'm', number: 'eka', case: 'pra', gloss: 'Kuntibhoja (Kuntī\'s adoptive father)' },
  'शैब्य':                   { category: 'noun', root: 'शैब्य', gender: 'm', number: 'eka', case: 'pra', gloss: 'Śaibya (warrior name)' },
  'चेकितान':                 { category: 'noun', root: 'चेकितान', gender: 'm', number: 'eka', case: 'pra', gloss: 'Cekitāna (Yādava warrior)' },
  'हर्ष':                    { category: 'noun', root: 'हर्ष', gender: 'm', number: 'eka', case: 'pra', gloss: 'joy / delight / horripilation' },
  'भगवान्':                  { category: 'noun', root: 'भगवत्', gender: 'm', number: 'eka', case: 'pra', gloss: 'the Blessed One (Krishna)' },
  // Musical instruments — components of the द्वन्द्व compound in Gītā 1.13
  'पणव':                    { category: 'noun', root: 'पणव', gender: 'm', number: 'eka', case: 'pra', gloss: 'small drum / tabor' },
  'आनक':                    { category: 'noun', root: 'आनक', gender: 'm', number: 'eka', case: 'pra', gloss: 'kettle-drum' },
  'गोमुख':                  { category: 'noun', root: 'गोमुख', gender: 'm', number: 'eka', case: 'pra', gloss: 'cow-mouth horn (a wind instrument)' },
  'गोमुखाः':                { category: 'noun', root: 'गोमुख', gender: 'm', number: 'bahu', case: 'pra', gloss: 'cow-mouth horns (plural)' },
  'शङ्ख':                   { category: 'noun', root: 'शङ्ख', gender: 'm', number: 'eka', case: 'pra', gloss: 'conch-shell' },
  'शङ्खाः':                 { category: 'noun', root: 'शङ्ख', gender: 'm', number: 'bahu', case: 'pra', gloss: 'conch-shells' },
  'शङ्खान्':                { category: 'noun', root: 'शङ्ख', gender: 'm', number: 'bahu', case: 'dvi', gloss: 'conch-shells (acc.)' },
  'भेरी':                   { category: 'noun', root: 'भेरी', gender: 'f', number: 'eka', case: 'pra', gloss: 'kettle-drum / war-drum' },
  'भेर्यः':                 { category: 'noun', root: 'भेरी', gender: 'f', number: 'bahu', case: 'pra', gloss: 'kettle-drums (plural)' },
  'हृदयदौर्बल्यम्':       { category: 'noun', root: 'हृदयदौर्बल्य', gender: 'n', number: 'eka', case: 'dvi', gloss: 'weakness of the heart' },
  'मधुसूदन':              { category: 'noun', root: 'मधुसूदन', gender: 'm', number: 'eka', case: 'sam', gloss: 'O slayer of Madhu (Krishna)' },
  'अरिसूदन':              { category: 'noun', root: 'अरिसूदन', gender: 'm', number: 'eka', case: 'sam', gloss: 'O slayer of foes (Krishna)' },
  'पूजार्हौ':              { category: 'adjective', root: 'पूजार्ह', gender: 'm', number: 'dvi', case: 'dvi', gloss: 'worthy of worship (the two)' },
  'परन्तप':                { category: 'noun', root: 'परन्तप', gender: 'm', number: 'eka', case: 'sam', gloss: 'O scorcher of enemies' },
  'सर्वधर्मान्':           { category: 'noun', root: 'सर्वधर्म', gender: 'm', number: 'bahu', case: 'dvi', gloss: 'all dharmas (acc. pl.)' },
  'सर्वपापेभ्यः':          { category: 'noun', root: 'सर्वपाप', gender: 'n', number: 'bahu', case: 'pan', gloss: 'from all sins' },
  'मदर्पणम्':              { category: 'noun', root: 'मदर्पण', gender: 'n', number: 'eka', case: 'dvi', gloss: 'as an offering to Me' },
  'योगक्षेमम्':            { category: 'noun', root: 'योगक्षेम', gender: 'n', number: 'eka', case: 'dvi', gloss: 'acquisition-and-preservation / welfare' },
  'नित्याभियुक्तानाम्':  { category: 'adjective', root: 'नित्याभियुक्त', gender: 'm', number: 'bahu', case: 'sha', gloss: 'of the constantly devoted (ones)' },
  'स्वधर्मः':              { category: 'noun', root: 'स्वधर्म', gender: 'm', number: 'eka', case: 'pra', gloss: 'one\'s own dharma' },
  'स्वधर्मे':              { category: 'noun', root: 'स्वधर्म', gender: 'm', number: 'eka', case: 'sap', gloss: 'in one\'s own dharma' },
  'परधर्मात्':             { category: 'noun', root: 'परधर्म', gender: 'm', number: 'eka', case: 'pan', gloss: "from another's dharma" },
  'परधर्मः':               { category: 'noun', root: 'परधर्म', gender: 'm', number: 'eka', case: 'pra', gloss: "another's dharma" },
  'स्वनुष्ठितात्':         { category: 'adjective', root: 'स्वनुष्ठित', gender: 'm', number: 'eka', case: 'pan', gloss: 'well-performed (abl.)' },
  'भयावहः':                { category: 'adjective', root: 'भयावह', gender: 'm', number: 'eka', case: 'pra', gloss: 'fraught with fear / dangerous' },
  'स्मृतिविभ्रमः':        { category: 'noun', root: 'स्मृतिविभ्रम', gender: 'm', number: 'eka', case: 'pra', gloss: 'confusion of memory' },
  'स्मृतिभ्रंशात्':        { category: 'noun', root: 'स्मृतिभ्रंश', gender: 'm', number: 'eka', case: 'pan', gloss: 'from collapse of memory' },
  'बुद्धिनाशः':            { category: 'noun', root: 'बुद्धिनाश', gender: 'm', number: 'eka', case: 'pra', gloss: 'destruction of intellect' },
  'बुद्धिनाशात्':          { category: 'noun', root: 'बुद्धिनाश', gender: 'm', number: 'eka', case: 'pan', gloss: 'from destruction of intellect' },

  // ───── Pre-sandhi alternate keys ─────
  // padaccheda often shows the un-fused form (e.g. "देह-अन्तर-प्राप्तिः")
  // while the dictionary key above carries the post-sandhi joined form
  // ("देहान्तरप्राप्तिः", अ+अ → आ). The lookup helper strips hyphens but
  // doesn't apply sandhi. Aliases here close that gap so both surfaces hit.
  'देहअन्तरप्राप्तिः':     { category: 'noun', root: 'देहान्तरप्राप्ति', gender: 'f', number: 'eka', case: 'pra', gloss: 'attainment of another body' },
  'शीतउष्णसुखदुःखदाः':  { category: 'adjective', root: 'शीतोष्णसुखदुःखद', gender: 'm', number: 'bahu', case: 'pra', gloss: 'giving cold/heat/pleasure/pain' },
  'आगमअपायिनः':           { category: 'adjective', root: 'आगमापायिन्', gender: 'm', number: 'bahu', case: 'pra', gloss: 'coming-and-going (transient)' },
  'सिद्धिअसिद्ध्योः':      { category: 'noun', root: 'सिद्ध्यसिद्धि', gender: 'f', number: 'dvi', case: 'sap', gloss: 'in success and failure' },
  'सुअनुष्ठितात्':           { category: 'adjective', root: 'स्वनुष्ठित', gender: 'm', number: 'eka', case: 'pan', gloss: 'well-performed (abl.)' },
  'भयआवहः':                { category: 'adjective', root: 'भयावह', gender: 'm', number: 'eka', case: 'pra', gloss: 'fraught with fear / dangerous' },
  'धर्मसंस्थापनअर्थाय':  { category: 'noun', root: 'धर्मसंस्थापनार्थ', gender: 'm', number: 'eka', case: 'cha', gloss: 'for the firm establishment of dharma' },
  'नित्यअभियुक्तानाम्':   { category: 'adjective', root: 'नित्याभियुक्त', gender: 'm', number: 'bahu', case: 'sha', gloss: 'of the constantly devoted (ones)' },
  'मत्अर्पणम्':              { category: 'noun', root: 'मदर्पण', gender: 'n', number: 'eka', case: 'dvi', gloss: 'as an offering to Me' },

  // The one entry that was simply missing — not a sandhi issue.
  'अद्वेष्टा':              { category: 'noun', root: 'अद्वेष्टृ', gender: 'm', number: 'eka', case: 'pra', gloss: 'one who hates no being / non-hater' },
};

import { VOCAB_EXTENDED } from './vocabulary-extended.js';
import { CORE_VOCAB } from './coreVocab.js';

// Suffix-pattern fallback: when a form isn't in any dictionary, try to
// infer its category + grammatical signal from its ending. Best-effort,
// not authoritative — but better than "no grammar data yet" on every
// inflected form the agent vocab missed. Each pattern is conservative
// (multi-character suffix where possible) to avoid false positives on
// short tokens.
//
// Returns null if no pattern matches.
function inferFromSuffix(word) {
  if (!word || word.length < 2) return null;
  const synth = (extra) => ({ source: 'suffix-inferred', ...extra });
  // ── Verb forms ──
  if (word.endsWith('न्तु')) return synth({ category: 'verb', lakara: 'lot', purusha: 'prathama', number: 'bahu', pada: 'P', gloss: 'imperative 3pl — "let them X"' });
  if (word.endsWith('न्ताम्')) return synth({ category: 'verb', lakara: 'lot', pada: 'A', purusha: 'prathama', number: 'bahu', gloss: 'imperative ātmanepada 3pl' });
  if (word.endsWith('ध्वम्')) return synth({ category: 'verb', lakara: 'lot', pada: 'A', purusha: 'madhyama', number: 'bahu', gloss: 'imperative ātmanepada 2pl — "you all do!"' });
  if (word.endsWith('स्व'))  return synth({ category: 'verb', lakara: 'lot', pada: 'A', purusha: 'madhyama', number: 'eka', gloss: 'imperative ātmanepada 2sg — "do (for yourself)!"' });
  if (word.endsWith('ष्यति') || word.endsWith('स्यति')) return synth({ category: 'verb', lakara: 'lrt', purusha: 'prathama', number: 'eka', pada: 'P', gloss: 'future 3sg — "will X"' });
  if (word.endsWith('ष्यन्ति') || word.endsWith('स्यन्ति')) return synth({ category: 'verb', lakara: 'lrt', purusha: 'prathama', number: 'bahu', pada: 'P', gloss: 'future 3pl — "they will X"' });
  if (word.endsWith('ष्यसि') || word.endsWith('स्यसि')) return synth({ category: 'verb', lakara: 'lrt', purusha: 'madhyama', number: 'eka', pada: 'P', gloss: 'future 2sg — "you will X"' });
  if (word.endsWith('ष्यामि') || word.endsWith('स्यामि')) return synth({ category: 'verb', lakara: 'lrt', purusha: 'uttama', number: 'eka', pada: 'P', gloss: 'future 1sg — "I will X"' });
  if (word.endsWith('ष्यते') || word.endsWith('स्यते')) return synth({ category: 'verb', lakara: 'lrt', purusha: 'prathama', number: 'eka', pada: 'A', gloss: 'future ātmanepada 3sg' });
  // ── Imperfect (लङ्) — past tense, augmented with अ- ──
  // -अन्त (no virama after त) = ātmanepada/passive 3pl past:
  //   अभ्यहन्यन्त ← अभि + √हन् passive + लङ् 3pl
  if (/^अ.+न्त$/.test(word)) return synth({ category: 'verb', lakara: 'lan', purusha: 'prathama', number: 'bahu', pada: 'A', gloss: 'imperfect 3pl ātmanepada/passive — "they were X-ed / they X-ed (for self)"' });
  if (/^अ.+त्$/.test(word) && word.length >= 4) return synth({ category: 'verb', lakara: 'lan', purusha: 'prathama', number: 'eka', gloss: 'imperfect 3sg with अ- augment — "X-ed"' });
  if (/^अ.+न्$/.test(word) && word.length >= 4) return synth({ category: 'verb', lakara: 'lan', purusha: 'prathama', number: 'bahu', gloss: 'imperfect 3pl with अ- augment — "they X-ed"' });
  // ── Optative (विधिलिङ्) ──
  if (word.endsWith('ेयुः')) return synth({ category: 'verb', lakara: 'vidhilin', purusha: 'prathama', number: 'bahu', gloss: 'optative 3pl — "they should X"' });
  if (word.endsWith('ेम'))    return synth({ category: 'verb', lakara: 'vidhilin', purusha: 'uttama', number: 'bahu', gloss: 'optative 1pl — "we should X"' });
  if (word.endsWith('ेताम्')) return synth({ category: 'verb', lakara: 'vidhilin', purusha: 'prathama', number: 'dvi', gloss: 'optative 3du — "the two should X"' });
  if (word.endsWith('यात्'))  return synth({ category: 'verb', lakara: 'vidhilin', purusha: 'prathama', number: 'eka', gloss: 'optative 3sg (irregular -यात्)' });
  // ── Krdanta endings ──
  if (word.endsWith('त्वा'))  return synth({ category: 'krdanta', kind: 'absolutive', gloss: 'absolutive — "having X-ed"' });
  if (word.endsWith('तुम्'))  return synth({ category: 'krdanta', kind: 'infinitive', gloss: 'infinitive — "to X"' });
  if (word.endsWith('इतव्यम्') || word.endsWith('तव्यम्')) return synth({ category: 'krdanta', kind: 'gerundive', gloss: 'gerundive — "to be X-ed / ought to be X-ed"', gender: 'n', number: 'eka', case: 'pra' });
  if (word.endsWith('अनीयम्') || word.endsWith('नीयम्'))  return synth({ category: 'krdanta', kind: 'gerundive', gloss: 'gerundive — "to be X-ed"', gender: 'n', number: 'eka', case: 'pra' });
  if (word.endsWith('इतम्'))  return synth({ category: 'krdanta', kind: 'past-passive', gloss: 'past-passive participle (n. sg)', gender: 'n', number: 'eka', case: 'pra' });
  if (word.endsWith('इतः'))   return synth({ category: 'krdanta', kind: 'past-passive', gloss: 'past-passive participle (m. sg)', gender: 'm', number: 'eka', case: 'pra' });
  if (word.endsWith('िताः'))  return synth({ category: 'krdanta', kind: 'past-passive', gloss: 'past-passive participle (m. pl)', gender: 'm', number: 'bahu', case: 'pra' });
  if (word.endsWith('ितान्')) return synth({ category: 'krdanta', kind: 'past-passive', gloss: 'past-passive participle (m. pl, object)', gender: 'm', number: 'bahu', case: 'dvi' });
  // -त-suffix PPP catches verbs whose stem already ends in vowel:
  // गत/जात/स्थित — caught above. But ष्ट (कृष्ट, हृष्ट) and ष्ट्र-class also count.
  if (word.endsWith('ष्टाः')) return synth({ category: 'krdanta', kind: 'past-passive', gloss: 'past-passive participle (m. pl)', gender: 'm', number: 'bahu', case: 'pra' });
  if (word.endsWith('ष्टम्')) return synth({ category: 'krdanta', kind: 'past-passive', gloss: 'past-passive participle (n. sg)', gender: 'n', number: 'eka', case: 'pra' });
  if (word.endsWith('ष्टः'))  return synth({ category: 'krdanta', kind: 'past-passive', gloss: 'past-passive participle (m. sg)', gender: 'm', number: 'eka', case: 'pra' });
  // ── A-stem nominal endings (broad fallback) ──
  if (word.endsWith('ानाम्')) return synth({ category: 'noun', number: 'bahu', case: 'sha', gloss: 'a-stem genitive plural — "of (the) X-s"' });
  if (word.endsWith('एभ्यः')) return synth({ category: 'noun', number: 'bahu', case: 'cha', gloss: 'a-stem dative/ablative plural' });
  if (word.endsWith('ेभ्यः')) return synth({ category: 'noun', number: 'bahu', case: 'cha', gloss: 'a-stem dative/ablative plural' });
  if (word.endsWith('ैः'))    return synth({ category: 'noun', number: 'bahu', case: 'tri', gloss: 'a-stem instrumental plural — "by/with X-s"' });
  if (word.endsWith('ान्'))   return synth({ category: 'noun', gender: 'm', number: 'bahu', case: 'dvi', gloss: 'a-stem accusative plural (m)' });
  if (word.endsWith('आभ्याम्')) return synth({ category: 'noun', number: 'dvi', case: 'tri', gloss: 'a-stem dual instrumental/dative/ablative' });
  if (word.endsWith('ाभिः'))   return synth({ category: 'noun', gender: 'f', number: 'bahu', case: 'tri', gloss: 'ā-stem feminine instrumental plural' });
  if (word.endsWith('एण'))    return synth({ category: 'noun', number: 'eka', case: 'tri', gloss: 'a-stem instrumental singular — "by X"' });
  if (word.endsWith('स्य'))   return synth({ category: 'noun', number: 'eka', case: 'sha', gloss: 'a-stem genitive singular — "of X"' });
  if (word.endsWith('स्मात्')) return synth({ category: 'pronoun', number: 'eka', case: 'pan', gloss: 'pronominal ablative — "from X / for that reason"' });
  if (word.endsWith('स्मिन्')) return synth({ category: 'pronoun', number: 'eka', case: 'sap', gloss: 'pronominal locative — "in X"' });
  // ── Indeclinable yathā-/sarva- compounds ──
  if (word.startsWith('यथा'))   return synth({ category: 'particle', gloss: 'yathā-compound — "according to / as / in the manner of"' });
  // ── Present tense verb forms (broad) ──
  if (word.endsWith('न्ति') && word.length >= 4) return synth({ category: 'verb', lakara: 'lat', purusha: 'prathama', number: 'bahu', pada: 'P', gloss: 'present 3pl — "they X"' });
  if (word.endsWith('न्ते') && word.length >= 4) return synth({ category: 'verb', lakara: 'lat', purusha: 'prathama', number: 'bahu', pada: 'A', gloss: 'present ātmanepada 3pl — "they X (for self)"' });
  if (word.endsWith('यते') && word.length >= 4) return synth({ category: 'verb', lakara: 'lat', purusha: 'prathama', number: 'eka', pada: 'Kr', gloss: 'passive present 3sg — "is X-ed"' });
  if (word.endsWith('ते') && word.length >= 4)  return synth({ category: 'verb', lakara: 'lat', purusha: 'prathama', number: 'eka', pada: 'A', gloss: 'present ātmanepada 3sg — "X-s (for self)"' });
  if (word.endsWith('ति') && word.length >= 4)  return synth({ category: 'verb', lakara: 'lat', purusha: 'prathama', number: 'eka', pada: 'P', gloss: 'present 3sg — "X-s"' });
  if (word.endsWith('मि') && word.length >= 4)  return synth({ category: 'verb', lakara: 'lat', purusha: 'uttama',  number: 'eka', pada: 'P', gloss: 'present 1sg — "I X"' });
  if (word.endsWith('से') && word.length >= 4)  return synth({ category: 'verb', lakara: 'lat', purusha: 'madhyama', number: 'eka', pada: 'A', gloss: 'present ātmanepada 2sg — "you X (for self)"' });
  if (word.endsWith('सि') && word.length >= 4)  return synth({ category: 'verb', lakara: 'lat', purusha: 'madhyama', number: 'eka', pada: 'P', gloss: 'present 2sg — "you X"' });
  // Present active participles (शतृ) — -अन्/-अन्तम्/-अन्तः ending after consonant.
  // Devanagari surface: -न्, -न्तम्, -न्तः, -न्तौ, -न्तः
  if (word.endsWith('न्तौ')) return synth({ category: 'krdanta', kind: 'present-active', gloss: 'present active participle (शतृ, m. dual) — "X-ing two"' });
  if (word.endsWith('न्तः') && word.length >= 5) return synth({ category: 'krdanta', kind: 'present-active', gloss: 'present active participle (शतृ, m. pl, nom)' });
  if (word.endsWith('न्तम्') && word.length >= 5) return synth({ category: 'krdanta', kind: 'present-active', gloss: 'present active participle (शतृ, m. sg, acc)' });
  if (word.endsWith('न्') && word.length >= 4) return synth({ category: 'krdanta', kind: 'present-active', gloss: 'present active participle (शतृ, m. sg, nom) — "the one who X-s"' });
  // Absolutive -य ending (अव्ययीभाव style — for prefix+verb forms like आसाद्य, उद्यम्य, आपूर्य)
  if (word.endsWith('य') && word.length >= 4) return synth({ category: 'krdanta', kind: 'absolutive', gloss: 'absolutive — "having X-ed" (-य suffix)' });
  // Vocative -न् forms (राजन्, भगवन्)
  if (/[कगचजटडतदपबमरलवशसह]न्$/.test(word)) {
    return synth({ category: 'noun', case: 'sambodhana', gloss: '-अन् stem vocative — "O X!"' });
  }
  // ── Broad fallbacks (run last) ──
  // -आत् (matra-ा + त्) → a-stem ablative singular ("from X")
  if (word.endsWith('ात्') && word.length >= 4) {
    return synth({ category: 'noun', number: 'eka', case: 'pan', gloss: 'a-stem ablative singular — "from X"' });
  }
  // Vocative endings — broad
  if (word.endsWith('हो'))    return synth({ category: 'noun', case: 'sambodhana', gloss: 'vocative (compound) — "O X!"' });
  // Word-final -ः with reasonable stem length → m. nom. sg. (a-stem)
  if (word.endsWith('ः') && word.length >= 4 && !word.endsWith('ुः') && !word.endsWith('ोः')) {
    return synth({ category: 'noun', gender: 'm', number: 'eka', case: 'pra', gloss: 'a-stem nominative singular (m) — likely subject form' });
  }
  // Word-final -म् with reasonable stem length → ambiguous (n. nom or
  // m. acc); flag both.
  if (word.endsWith('म्') && word.length >= 4) {
    return synth({ category: 'noun', number: 'eka', case: 'pra-or-dvi', gloss: 'a-stem -म् ending — neuter nominative or masculine accusative singular (ambiguous)' });
  }
  // Word-final -अं (anusvara) → equivalent to -म्
  if (word.endsWith('ं') && word.length >= 4) {
    return synth({ category: 'noun', number: 'eka', case: 'pra-or-dvi', gloss: 'a-stem -ं ending (anusvara form of -म्) — neuter nom or masc acc singular' });
  }
  return null;
}

// Helper: lookup with both exact match and a small fall-through for hyphenated
// surface forms (e.g., padaccheda may use "आगम-अपायिनः" while the dictionary
// keys the unhyphenated form). Returns null if not found.
//
// Lookup priority (high → low):
//   1. SHARED_VOCAB[word]       — hand-curated, trusted entries
//   2. CORE_VOCAB[word]         — pronoun decl. tables + a-stem nouns
//                                 (covers येषाम्, अयम्, राज्यम्, …)
//   3. VOCAB_EXTENDED[word]     — bulk agent-generated, audit-flagged
//   4. de-hyphenated retries on each
//   5. Suffix-pattern fallback — best-effort grammatical signal from
//                                 the word's ending (lat/lot/krdanta/
//                                 case-class). Ensures every form has
//                                 *some* grammar info instead of "no
//                                 grammar data yet".
export function lookupSharedVocab(word) {
  if (!word) return null;
  if (SHARED_VOCAB[word]) return SHARED_VOCAB[word];
  if (CORE_VOCAB[word]) return CORE_VOCAB[word];
  if (VOCAB_EXTENDED[word]) return VOCAB_EXTENDED[word];
  // Try without hyphens (compound surface form → dictionary form)
  const dehyphenated = word.replace(/-/g, '');
  if (SHARED_VOCAB[dehyphenated]) return SHARED_VOCAB[dehyphenated];
  if (CORE_VOCAB[dehyphenated]) return CORE_VOCAB[dehyphenated];
  if (VOCAB_EXTENDED[dehyphenated]) return VOCAB_EXTENDED[dehyphenated];
  // Suffix-inferred fallback (best-effort).
  const inferred = inferFromSuffix(word);
  if (inferred) return inferred;
  return null;
}
