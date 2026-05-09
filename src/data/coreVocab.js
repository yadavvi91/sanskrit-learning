// Core vocab — pronoun declensions + high-frequency nouns / PPPs / verb
// forms that the agent-built VOCAB_EXTENDED missed.
//
// The agents that built VOCAB_EXTENDED tagged vocab from corpus context,
// so they captured contextually-attested forms but missed declensions
// that don't happen to appear in their sample. Result: very common
// pronoun declensions (येषाम्, अयम्, त्वाम्, …) and frequent nouns
// (राज्यम्, हृदयम्, ज्ञानम्) returned null in lookupSharedVocab, leaving
// the WordPopover to show "no grammar data yet" on basic words.
//
// This module fills the gap: a generative pronoun-declension table plus
// a curated list of common nouns. Loaded with high priority by
// lookupSharedVocab so the agent-built VOCAB_EXTENDED entries (which can
// be sandhi-blob-tagged) don't shadow these clean forms.

const CASES = ['pra', 'dvi', 'tri', 'cha', 'pan', 'sha', 'sap'];
const CASE_LABEL = {
  pra: 'प्रथमा',
  dvi: 'द्वितीया',
  tri: 'तृतीया',
  cha: 'चतुर्थी',
  pan: 'पञ्चमी',
  sha: 'षष्ठी',
  sap: 'सप्तमी',
};
const NUMBERS = ['eka', 'dvi', 'bahu'];
const NUMBER_LABEL = { eka: 'एकवचन', dvi: 'द्विवचन', bahu: 'बहुवचन' };

// Build a pronoun declension entry. `forms` is { mn-eka: [pra, dvi, tri,
// cha, pan, sha, sap], mn-dvi: [...], mn-bahu: [...], n-eka: [...], … }
// where the seven entries map to the seven cases. Returns a flat
// { form: vocabEntry } map.
function buildPronounDeclension(rootStem, baseGloss, forms) {
  const out = {};
  for (const [key, list] of Object.entries(forms)) {
    if (!list) continue;
    const [genderCode, numberCode] = key.split('-');
    const genderLabel = { m: 'm', f: 'f', n: 'n' }[genderCode];
    for (let i = 0; i < CASES.length; i++) {
      const form = list[i];
      if (!form) continue;
      out[form] = {
        category: 'pronoun',
        root: rootStem,
        gender: genderLabel,
        number: numberCode,
        case: CASES[i],
        gloss: glossForCase(baseGloss, CASES[i], numberCode),
        source: 'core-vocab',
      };
    }
  }
  return out;
}

function glossForCase(base, c, n) {
  const numLabel = n === 'eka' ? '' : n === 'dvi' ? ' (two)' : ' (pl)';
  switch (c) {
    case 'pra': return `${base}${numLabel}`;
    case 'dvi': return `${base} (object)${numLabel}`;
    case 'tri': return `by/with ${base}${numLabel}`;
    case 'cha': return `for ${base}${numLabel}`;
    case 'pan': return `from ${base}${numLabel}`;
    case 'sha': return `of ${base}${numLabel}`;
    case 'sap': return `in ${base}${numLabel}`;
    default: return base;
  }
}

// यद् (relative): "who, which, that"
const YAD = buildPronounDeclension('यद्', 'who/which', {
  'm-eka':  ['यः', 'यम्', 'येन', 'यस्मै', 'यस्मात्', 'यस्य', 'यस्मिन्'],
  'm-dvi':  ['यौ', 'यौ', 'याभ्याम्', 'याभ्याम्', 'याभ्याम्', 'ययोः', 'ययोः'],
  'm-bahu': ['ये', 'यान्', 'यैः', 'येभ्यः', 'येभ्यः', 'येषाम्', 'येषु'],
  'n-eka':  ['यत्', 'यत्', 'येन', 'यस्मै', 'यस्मात्', 'यस्य', 'यस्मिन्'],
  'n-dvi':  ['ये', 'ये', 'याभ्याम्', 'याभ्याम्', 'याभ्याम्', 'ययोः', 'ययोः'],
  'n-bahu': ['यानि', 'यानि', 'यैः', 'येभ्यः', 'येभ्यः', 'येषाम्', 'येषु'],
  'f-eka':  ['या', 'याम्', 'यया', 'यस्यै', 'यस्याः', 'यस्याः', 'यस्याम्'],
  'f-bahu': ['याः', 'याः', 'याभिः', 'याभ्यः', 'याभ्यः', 'यासाम्', 'यासु'],
});

// तद् (demonstrative): "he, she, it, that"
const TAD = buildPronounDeclension('तद्', 'he/that', {
  'm-eka':  ['सः', 'तम्', 'तेन', 'तस्मै', 'तस्मात्', 'तस्य', 'तस्मिन्'],
  'm-dvi':  ['तौ', 'तौ', 'ताभ्याम्', 'ताभ्याम्', 'ताभ्याम्', 'तयोः', 'तयोः'],
  'm-bahu': ['ते', 'तान्', 'तैः', 'तेभ्यः', 'तेभ्यः', 'तेषाम्', 'तेषु'],
  'n-eka':  ['तत्', 'तत्', 'तेन', 'तस्मै', 'तस्मात्', 'तस्य', 'तस्मिन्'],
  'n-dvi':  ['ते', 'ते', 'ताभ्याम्', 'ताभ्याम्', 'ताभ्याम्', 'तयोः', 'तयोः'],
  'n-bahu': ['तानि', 'तानि', 'तैः', 'तेभ्यः', 'तेभ्यः', 'तेषाम्', 'तेषु'],
  'f-eka':  ['सा', 'ताम्', 'तया', 'तस्यै', 'तस्याः', 'तस्याः', 'तस्याम्'],
  'f-bahu': ['ताः', 'ताः', 'ताभिः', 'ताभ्यः', 'ताभ्यः', 'तासाम्', 'तासु'],
});

// इदम् (proximal demonstrative): "this"
const IDAM = buildPronounDeclension('इदम्', 'this', {
  'm-eka':  ['अयम्', 'इमम्', 'अनेन', 'अस्मै', 'अस्मात्', 'अस्य', 'अस्मिन्'],
  'm-dvi':  ['इमौ', 'इमौ', 'आभ्याम्', 'आभ्याम्', 'आभ्याम्', 'अनयोः', 'अनयोः'],
  'm-bahu': ['इमे', 'इमान्', 'एभिः', 'एभ्यः', 'एभ्यः', 'एषाम्', 'एषु'],
  'n-eka':  ['इदम्', 'इदम्', 'अनेन', 'अस्मै', 'अस्मात्', 'अस्य', 'अस्मिन्'],
  'n-bahu': ['इमानि', 'इमानि', 'एभिः', 'एभ्यः', 'एभ्यः', 'एषाम्', 'एषु'],
  'f-eka':  ['इयम्', 'इमाम्', 'अनया', 'अस्यै', 'अस्याः', 'अस्याः', 'अस्याम्'],
  'f-bahu': ['इमाः', 'इमाः', 'आभिः', 'आभ्यः', 'आभ्यः', 'आसाम्', 'आसु'],
});

// एतद् (proximal demonstrative): "this"
const ETAD = buildPronounDeclension('एतद्', 'this', {
  'm-eka':  ['एषः', 'एतम्', 'एतेन', 'एतस्मै', 'एतस्मात्', 'एतस्य', 'एतस्मिन्'],
  'm-dvi':  ['एतौ', 'एतौ', 'एताभ्याम्', 'एताभ्याम्', 'एताभ्याम्', 'एतयोः', 'एतयोः'],
  'm-bahu': ['एते', 'एतान्', 'एतैः', 'एतेभ्यः', 'एतेभ्यः', 'एतेषाम्', 'एतेषु'],
  'n-eka':  ['एतत्', 'एतत्', 'एतेन', 'एतस्मै', 'एतस्मात्', 'एतस्य', 'एतस्मिन्'],
  'n-bahu': ['एतानि', 'एतानि', 'एतैः', 'एतेभ्यः', 'एतेभ्यः', 'एतेषाम्', 'एतेषु'],
  'f-eka':  ['एषा', 'एताम्', 'एतया', 'एतस्यै', 'एतस्याः', 'एतस्याः', 'एतस्याम्'],
});

// किम् (interrogative): "who, what, which"
const KIM = buildPronounDeclension('किम्', 'who/what', {
  'm-eka':  ['कः', 'कम्', 'केन', 'कस्मै', 'कस्मात्', 'कस्य', 'कस्मिन्'],
  'm-bahu': ['के', 'कान्', 'कैः', 'केभ्यः', 'केभ्यः', 'केषाम्', 'केषु'],
  'n-eka':  ['किम्', 'किम्', 'केन', 'कस्मै', 'कस्मात्', 'कस्य', 'कस्मिन्'],
  'n-bahu': ['कानि', 'कानि', 'कैः', 'केभ्यः', 'केभ्यः', 'केषाम्', 'केषु'],
  'f-eka':  ['का', 'काम्', 'कया', 'कस्यै', 'कस्याः', 'कस्याः', 'कस्याम्'],
});

// सर्व (pronominal adjective): "all, every"
const SARVA = buildPronounDeclension('सर्व', 'all', {
  'm-eka':  ['सर्वः', 'सर्वम्', 'सर्वेण', 'सर्वस्मै', 'सर्वस्मात्', 'सर्वस्य', 'सर्वस्मिन्'],
  'm-bahu': ['सर्वे', 'सर्वान्', 'सर्वैः', 'सर्वेभ्यः', 'सर्वेभ्यः', 'सर्वेषाम्', 'सर्वेषु'],
  'n-eka':  ['सर्वम्', 'सर्वम्', 'सर्वेण', 'सर्वस्मै', 'सर्वस्मात्', 'सर्वस्य', 'सर्वस्मिन्'],
  'n-bahu': ['सर्वाणि', 'सर्वाणि', 'सर्वैः', 'सर्वेभ्यः', 'सर्वेभ्यः', 'सर्वेषाम्', 'सर्वेषु'],
});

// अहम् (1st person): "I, we"
const ASMAD = {
  'अहम्':       { category: 'pronoun', root: 'अस्मद्', number: 'eka',  case: 'pra', gloss: 'I' },
  'माम्':       { category: 'pronoun', root: 'अस्मद्', number: 'eka',  case: 'dvi', gloss: 'me (object)' },
  'मा':         { category: 'pronoun', root: 'अस्मद्', number: 'eka',  case: 'dvi', gloss: 'me (enclitic)' },
  'मया':        { category: 'pronoun', root: 'अस्मद्', number: 'eka',  case: 'tri', gloss: 'by me' },
  'मह्यम्':     { category: 'pronoun', root: 'अस्मद्', number: 'eka',  case: 'cha', gloss: 'for me' },
  'मे':         { category: 'pronoun', root: 'अस्मद्', number: 'eka',  case: 'sha', gloss: 'of me / for me (enclitic)' },
  'मत्':        { category: 'pronoun', root: 'अस्मद्', number: 'eka',  case: 'pan', gloss: 'from me' },
  'मत्तः':      { category: 'pronoun', root: 'अस्मद्', number: 'eka',  case: 'pan', gloss: 'from me' },
  'मम':         { category: 'pronoun', root: 'अस्मद्', number: 'eka',  case: 'sha', gloss: 'of me / mine' },
  'मयि':        { category: 'pronoun', root: 'अस्मद्', number: 'eka',  case: 'sap', gloss: 'in me' },
  'आवाम्':      { category: 'pronoun', root: 'अस्मद्', number: 'dvi',  case: 'pra', gloss: 'we two' },
  'नौ':         { category: 'pronoun', root: 'अस्मद्', number: 'dvi',  case: 'sha', gloss: 'of us two (enclitic)' },
  'वयम्':       { category: 'pronoun', root: 'अस्मद्', number: 'bahu', case: 'pra', gloss: 'we' },
  'अस्मान्':    { category: 'pronoun', root: 'अस्मद्', number: 'bahu', case: 'dvi', gloss: 'us (object)' },
  'अस्माभिः':   { category: 'pronoun', root: 'अस्मद्', number: 'bahu', case: 'tri', gloss: 'by us' },
  'अस्मभ्यम्':  { category: 'pronoun', root: 'अस्मद्', number: 'bahu', case: 'cha', gloss: 'for us' },
  'अस्मत्':     { category: 'pronoun', root: 'अस्मद्', number: 'bahu', case: 'pan', gloss: 'from us' },
  'अस्माकम्':   { category: 'pronoun', root: 'अस्मद्', number: 'bahu', case: 'sha', gloss: 'of us' },
  'अस्मासु':    { category: 'pronoun', root: 'अस्मद्', number: 'bahu', case: 'sap', gloss: 'in us' },
  'नः':         { category: 'pronoun', root: 'अस्मद्', number: 'bahu', case: 'sha', gloss: 'of us / for us (enclitic)' },
};

// त्वम् (2nd person): "you"
const YUSHMAD = {
  'त्वम्':       { category: 'pronoun', root: 'युष्मद्', number: 'eka',  case: 'pra', gloss: 'you' },
  'त्वाम्':      { category: 'pronoun', root: 'युष्मद्', number: 'eka',  case: 'dvi', gloss: 'you (object)' },
  'त्वां':       { category: 'pronoun', root: 'युष्मद्', number: 'eka',  case: 'dvi', gloss: 'you (object)' },
  'त्वा':        { category: 'pronoun', root: 'युष्मद्', number: 'eka',  case: 'dvi', gloss: 'you (enclitic)' },
  'त्वया':       { category: 'pronoun', root: 'युष्मद्', number: 'eka',  case: 'tri', gloss: 'by you' },
  'तुभ्यम्':     { category: 'pronoun', root: 'युष्मद्', number: 'eka',  case: 'cha', gloss: 'for you' },
  'ते':          { category: 'pronoun', root: 'युष्मद्', number: 'eka',  case: 'sha', gloss: 'of you / for you (enclitic)' },
  'त्वत्':       { category: 'pronoun', root: 'युष्मद्', number: 'eka',  case: 'pan', gloss: 'from you' },
  'तव':          { category: 'pronoun', root: 'युष्मद्', number: 'eka',  case: 'sha', gloss: 'of you / your' },
  'त्वयि':       { category: 'pronoun', root: 'युष्मद्', number: 'eka',  case: 'sap', gloss: 'in you' },
  'युवाम्':      { category: 'pronoun', root: 'युष्मद्', number: 'dvi',  case: 'pra', gloss: 'you two' },
  'वाम्':        { category: 'pronoun', root: 'युष्मद्', number: 'dvi',  case: 'sha', gloss: 'of you two (enclitic)' },
  'यूयम्':       { category: 'pronoun', root: 'युष्मद्', number: 'bahu', case: 'pra', gloss: 'you (pl)' },
  'युष्मान्':    { category: 'pronoun', root: 'युष्मद्', number: 'bahu', case: 'dvi', gloss: 'you (pl, object)' },
  'युष्माभिः':   { category: 'pronoun', root: 'युष्मद्', number: 'bahu', case: 'tri', gloss: 'by you (pl)' },
  'युष्मभ्यम्':  { category: 'pronoun', root: 'युष्मद्', number: 'bahu', case: 'cha', gloss: 'for you (pl)' },
  'युष्मत्':     { category: 'pronoun', root: 'युष्मद्', number: 'bahu', case: 'pan', gloss: 'from you (pl)' },
  'युष्माकम्':   { category: 'pronoun', root: 'युष्मद्', number: 'bahu', case: 'sha', gloss: 'of you (pl)' },
  'युष्मासु':    { category: 'pronoun', root: 'युष्मद्', number: 'bahu', case: 'sap', gloss: 'in you (pl)' },
  'वः':          { category: 'pronoun', root: 'युष्मद्', number: 'bahu', case: 'sha', gloss: 'of you (pl, enclitic)' },
};

// Build a-stem masculine declension (राम-style) — covers most common
// nouns ending in -a (राज्य → noun in -अ → declined like राम). Also
// includes the bare-stem entry so the word resolves when it appears
// as a compound's first member (e.g., धर्म- in धर्म-क्षेत्रे).
function buildAStemMasculine(stem, gloss) {
  return {
    [stem]:             { category: 'noun', root: stem, gender: 'm', number: '?',     case: 'compound-stem', gloss: `${gloss} (compound stem)` },
    [stem + 'ः']:       { category: 'noun', root: stem, gender: 'm', number: 'eka',  case: 'pra', gloss: `${gloss}` },
    [stem + 'म्']:       { category: 'noun', root: stem, gender: 'm', number: 'eka',  case: 'dvi', gloss: `${gloss} (object)` },
    [stem + 'ेन']:      { category: 'noun', root: stem, gender: 'm', number: 'eka',  case: 'tri', gloss: `by ${gloss}` },
    [stem + 'ाय']:      { category: 'noun', root: stem, gender: 'm', number: 'eka',  case: 'cha', gloss: `for ${gloss}` },
    [stem + 'ात्']:     { category: 'noun', root: stem, gender: 'm', number: 'eka',  case: 'pan', gloss: `from ${gloss}` },
    [stem + 'स्य']:     { category: 'noun', root: stem, gender: 'm', number: 'eka',  case: 'sha', gloss: `of ${gloss}` },
    [stem + 'े']:       { category: 'noun', root: stem, gender: 'm', number: 'eka',  case: 'sap', gloss: `in ${gloss}` },
    [stem + 'ौ']:       { category: 'noun', root: stem, gender: 'm', number: 'dvi',  case: 'pra', gloss: `${gloss} (two)` },
    [stem + 'ाः']:      { category: 'noun', root: stem, gender: 'm', number: 'bahu', case: 'pra', gloss: `${gloss} (pl)` },
    [stem + 'ान्']:     { category: 'noun', root: stem, gender: 'm', number: 'bahu', case: 'dvi', gloss: `${gloss} (pl, object)` },
    [stem + 'ैः']:      { category: 'noun', root: stem, gender: 'm', number: 'bahu', case: 'tri', gloss: `by ${gloss} (pl)` },
    [stem + 'ेभ्यः']:   { category: 'noun', root: stem, gender: 'm', number: 'bahu', case: 'cha', gloss: `for ${gloss} (pl)` },
    [stem + 'ानाम्']:   { category: 'noun', root: stem, gender: 'm', number: 'bahu', case: 'sha', gloss: `of ${gloss} (pl)` },
    [stem + 'ेषु']:     { category: 'noun', root: stem, gender: 'm', number: 'bahu', case: 'sap', gloss: `in ${gloss} (pl)` },
  };
}

// Build a-stem neuter declension (फल-style) — for नपुंसकलिंग nouns.
function buildAStemNeuter(stem, gloss) {
  return {
    [stem]:             { category: 'noun', root: stem, gender: 'n', number: '?',     case: 'compound-stem', gloss: `${gloss} (compound stem)` },
    [stem + 'म्']:       { category: 'noun', root: stem, gender: 'n', number: 'eka',  case: 'pra', gloss: `${gloss}` },
    [stem + 'ेन']:      { category: 'noun', root: stem, gender: 'n', number: 'eka',  case: 'tri', gloss: `by ${gloss}` },
    [stem + 'ाय']:      { category: 'noun', root: stem, gender: 'n', number: 'eka',  case: 'cha', gloss: `for ${gloss}` },
    [stem + 'ात्']:     { category: 'noun', root: stem, gender: 'n', number: 'eka',  case: 'pan', gloss: `from ${gloss}` },
    [stem + 'स्य']:     { category: 'noun', root: stem, gender: 'n', number: 'eka',  case: 'sha', gloss: `of ${gloss}` },
    [stem + 'े']:       { category: 'noun', root: stem, gender: 'n', number: 'eka',  case: 'sap', gloss: `in ${gloss}` },
    [stem + 'ानि']:     { category: 'noun', root: stem, gender: 'n', number: 'bahu', case: 'pra', gloss: `${gloss} (pl)` },
    [stem + 'ैः']:      { category: 'noun', root: stem, gender: 'n', number: 'bahu', case: 'tri', gloss: `by ${gloss} (pl)` },
    [stem + 'ेभ्यः']:   { category: 'noun', root: stem, gender: 'n', number: 'bahu', case: 'cha', gloss: `for ${gloss} (pl)` },
    [stem + 'ानाम्']:   { category: 'noun', root: stem, gender: 'n', number: 'bahu', case: 'sha', gloss: `of ${gloss} (pl)` },
    [stem + 'ेषु']:     { category: 'noun', root: stem, gender: 'n', number: 'bahu', case: 'sap', gloss: `in ${gloss} (pl)` },
  };
}

// High-frequency a-stem nouns (mostly neuter — Sanskrit favours -अम् for
// abstract concepts).
const COMMON_NOUNS = {
  ...buildAStemNeuter('राज्य', 'kingdom'),
  ...buildAStemNeuter('ज्ञान', 'knowledge'),
  ...buildAStemNeuter('हृदय', 'heart'),
  ...buildAStemNeuter('कर्म', 'action'),  // technically -न् stem but most forms behave like -अ
  ...buildAStemNeuter('योग', 'yoga / discipline'),
  ...buildAStemNeuter('दुःख', 'suffering'),
  ...buildAStemNeuter('सुख', 'pleasure'),
  ...buildAStemNeuter('पाप', 'sin'),
  ...buildAStemNeuter('पुण्य', 'merit'),
  ...buildAStemNeuter('मन', 'mind'),  // technically -न् stem
  ...buildAStemMasculine('काम', 'desire'),
  ...buildAStemMasculine('लोक', 'world'),
  ...buildAStemMasculine('शोक', 'sorrow'),
  ...buildAStemMasculine('मोह', 'delusion'),
  ...buildAStemMasculine('पुरुष', 'man / spirit'),
  ...buildAStemMasculine('धर्म', 'dharma'),
  // PPP nominative singular forms — predicate adjectives.
  'काङ्क्षितम्':  { category: 'krdanta', kind: 'past-passive', root: '√काङ्क्ष्', gender: 'n', number: 'eka', case: 'pra', gloss: 'desired' },
  'काङ्क्षितः':   { category: 'krdanta', kind: 'past-passive', root: '√काङ्क्ष्', gender: 'm', number: 'eka', case: 'pra', gloss: 'desired' },
  'उक्तम्':       { category: 'krdanta', kind: 'past-passive', root: '√वच्',   gender: 'n', number: 'eka', case: 'pra', gloss: 'said / spoken' },
  'उक्तः':        { category: 'krdanta', kind: 'past-passive', root: '√वच्',   gender: 'm', number: 'eka', case: 'pra', gloss: 'said / spoken' },
  'कृतम्':        { category: 'krdanta', kind: 'past-passive', root: '√कृ',    gender: 'n', number: 'eka', case: 'pra', gloss: 'done / made' },
  'कृतः':         { category: 'krdanta', kind: 'past-passive', root: '√कृ',    gender: 'm', number: 'eka', case: 'pra', gloss: 'done / made' },
  'गतम्':         { category: 'krdanta', kind: 'past-passive', root: '√गम्',  gender: 'n', number: 'eka', case: 'pra', gloss: 'gone' },
  'गतः':          { category: 'krdanta', kind: 'past-passive', root: '√गम्',  gender: 'm', number: 'eka', case: 'pra', gloss: 'gone' },
  'स्थितम्':      { category: 'krdanta', kind: 'past-passive', root: '√स्था', gender: 'n', number: 'eka', case: 'pra', gloss: 'standing / stationed' },
  'स्थितः':       { category: 'krdanta', kind: 'past-passive', root: '√स्था', gender: 'm', number: 'eka', case: 'pra', gloss: 'standing / stationed' },
  'जातम्':        { category: 'krdanta', kind: 'past-passive', root: '√जन्',  gender: 'n', number: 'eka', case: 'pra', gloss: 'born / arisen' },
  'जातः':         { category: 'krdanta', kind: 'past-passive', root: '√जन्',  gender: 'm', number: 'eka', case: 'pra', gloss: 'born / arisen' },
  // Common verb forms missing from VOCAB_EXTENDED.
  'अर्हसि':       { category: 'verb', root: '√अर्ह्', gana: 1, pada: 'P', lakara: 'lat',     purusha: 'madhyama', number: 'eka', gloss: 'you ought / are able' },
  'अर्हति':       { category: 'verb', root: '√अर्ह्', gana: 1, pada: 'P', lakara: 'lat',     purusha: 'prathama', number: 'eka', gloss: 'is able / ought' },
  'इच्छामि':      { category: 'verb', root: '√इष्',   gana: 6, pada: 'P', lakara: 'lat',     purusha: 'uttama',  number: 'eka', gloss: 'I wish / desire' },
  'इच्छसि':       { category: 'verb', root: '√इष्',   gana: 6, pada: 'P', lakara: 'lat',     purusha: 'madhyama', number: 'eka', gloss: 'you wish' },
  'इच्छति':       { category: 'verb', root: '√इष्',   gana: 6, pada: 'P', lakara: 'lat',     purusha: 'prathama', number: 'eka', gloss: 'wishes' },
  'भवामि':        { category: 'verb', root: '√भू',    gana: 1, pada: 'P', lakara: 'lat',     purusha: 'uttama',  number: 'eka', gloss: 'I become / am' },
  'भवसि':         { category: 'verb', root: '√भू',    gana: 1, pada: 'P', lakara: 'lat',     purusha: 'madhyama', number: 'eka', gloss: 'you become / are' },
  'भवति':         { category: 'verb', root: '√भू',    gana: 1, pada: 'P', lakara: 'lat',     purusha: 'prathama', number: 'eka', gloss: 'becomes / is' },
  'अवाप्स्यसि':   { category: 'verb', root: 'अव + √आप्', gana: 5, pada: 'P', lakara: 'lrt',  purusha: 'madhyama', number: 'eka', gloss: 'you will obtain' },
  'अवाप्नोति':    { category: 'verb', root: 'अव + √आप्', gana: 5, pada: 'P', lakara: 'lat',  purusha: 'prathama', number: 'eka', gloss: 'obtains' },
  'कर्तुम्':      { category: 'krdanta', kind: 'infinitive', root: '√कृ',    gloss: 'to do / to act' },
  'गन्तुम्':      { category: 'krdanta', kind: 'infinitive', root: '√गम्',  gloss: 'to go' },
  'हन्तुम्':      { category: 'krdanta', kind: 'infinitive', root: '√हन्',  gloss: 'to kill' },
  'द्रष्टुम्':    { category: 'krdanta', kind: 'infinitive', root: '√दृश्', gloss: 'to see' },
  'ज्ञातुम्':     { category: 'krdanta', kind: 'infinitive', root: '√ज्ञा', gloss: 'to know' },
  'श्रोतुम्':     { category: 'krdanta', kind: 'infinitive', root: '√श्रु', gloss: 'to hear' },
  'आवृत्य':       { category: 'krdanta', kind: 'absolutive', root: 'आ + √वृ', gloss: 'having covered / enveloped' },
  'उक्त्वा':      { category: 'krdanta', kind: 'absolutive', root: '√वच्', gloss: 'having said' },
  'गत्वा':        { category: 'krdanta', kind: 'absolutive', root: '√गम्', gloss: 'having gone' },
  'कृत्वा':       { category: 'krdanta', kind: 'absolutive', root: '√कृ',  gloss: 'having done' },
  // Common adverbs / indeclinables
  'एवम्':          { category: 'particle', gloss: 'thus / in this way' },
  'नित्यम्':       { category: 'particle', gloss: 'always / constantly' },
  'सदा':           { category: 'particle', gloss: 'always' },
  'कदापि':         { category: 'particle', gloss: 'ever / at any time' },
  'सम्यक्':        { category: 'particle', gloss: 'rightly / properly' },
  'पुनः':          { category: 'particle', gloss: 'again' },
  'सर्वत्र':       { category: 'particle', gloss: 'everywhere' },
  'उभयोः':         { category: 'noun', root: 'उभ', gender: 'm', number: 'dvi', case: 'sha', gloss: 'of both' },
  'सेनयोः':        { category: 'noun', root: 'सेना', gender: 'f', number: 'dvi', case: 'sha', gloss: 'of (the two) armies' },
  // More common krdantas user audit surfaced in Ch 1-3
  'अवस्थितः':       { category: 'krdanta', kind: 'past-passive', root: 'अव + √स्था', gender: 'm', number: 'eka', case: 'pra', gloss: 'stationed / standing' },
  'अवस्थिताः':      { category: 'krdanta', kind: 'past-passive', root: 'अव + √स्था', gender: 'm', number: 'bahu', case: 'pra', gloss: 'stationed (pl)' },
  'अवस्थितान्':     { category: 'krdanta', kind: 'past-passive', root: 'अव + √स्था', gender: 'm', number: 'bahu', case: 'dvi', gloss: 'stationed (pl, object)' },
  'अवस्थितम्':      { category: 'krdanta', kind: 'past-passive', root: 'अव + √स्था', gender: 'n', number: 'eka', case: 'pra', gloss: 'stationed' },
  'समवेताः':        { category: 'krdanta', kind: 'past-passive', root: 'सम् + अव + √इ', gender: 'm', number: 'bahu', case: 'pra', gloss: 'assembled / gathered (pl)' },
  'विषीदन्तम्':     { category: 'krdanta', kind: 'present-active', root: 'वि + √सद्', gender: 'm', number: 'eka', case: 'dvi', gloss: 'despondent (m. sg, object)' },
  'विषीदन्तः':      { category: 'krdanta', kind: 'present-active', root: 'वि + √सद्', gender: 'm', number: 'eka', case: 'pra', gloss: 'despondent' },
  'उपसङ्गम्य':      { category: 'krdanta', kind: 'absolutive',     root: 'उप + सम् + √गम्', gloss: 'having approached' },
  'उपगम्य':         { category: 'krdanta', kind: 'absolutive',     root: 'उप + √गम्', gloss: 'having approached' },
  'समीक्ष्य':        { category: 'krdanta', kind: 'absolutive',     root: 'सम् + √ईक्ष्', gloss: 'having beheld / looked over' },
  'दृष्ट्वा':        { category: 'krdanta', kind: 'absolutive',     root: '√दृश्', gloss: 'having seen' },
  'श्रुत्वा':        { category: 'krdanta', kind: 'absolutive',     root: '√श्रु', gloss: 'having heard' },
  'त्यक्त्वा':       { category: 'krdanta', kind: 'absolutive',     root: '√त्यज्', gloss: 'having abandoned' },
  'हत्वा':          { category: 'krdanta', kind: 'absolutive',     root: '√हन्', gloss: 'having killed' },
  // Common verb forms
  'आप्नोति':        { category: 'verb', root: '√आप्',   gana: 5, pada: 'P', lakara: 'lat', purusha: 'prathama', number: 'eka',  gloss: 'obtains' },
  'अनुवर्तते':      { category: 'verb', root: 'अनु + √वृत्', gana: 1, pada: 'A', lakara: 'lat', purusha: 'prathama', number: 'eka',  gloss: 'follows' },
  'अनुवर्तन्ते':    { category: 'verb', root: 'अनु + √वृत्', gana: 1, pada: 'A', lakara: 'lat', purusha: 'prathama', number: 'bahu', gloss: 'follow (pl)' },
  'उत्तिष्ठ':        { category: 'verb', root: 'उद् + √स्था', gana: 1, pada: 'P', lakara: 'lot', purusha: 'madhyama', number: 'eka',  gloss: 'rise up! / stand up!' },
  'गच्छति':         { category: 'verb', root: '√गम्',  gana: 1, pada: 'P', lakara: 'lat', purusha: 'prathama', number: 'eka',  gloss: 'goes' },
  'गच्छामि':        { category: 'verb', root: '√गम्',  gana: 1, pada: 'P', lakara: 'lat', purusha: 'uttama',   number: 'eka',  gloss: 'I go' },
  'जानाति':         { category: 'verb', root: '√ज्ञा', gana: 9, pada: 'P', lakara: 'lat', purusha: 'prathama', number: 'eka',  gloss: 'knows' },
  'जानन्ति':        { category: 'verb', root: '√ज्ञा', gana: 9, pada: 'P', lakara: 'lat', purusha: 'prathama', number: 'bahu', gloss: 'they know' },
  // Common compounds appearing whole in padaccheda
  'क्षेत्रक्षेत्रज्ञयोः': { category: 'noun', root: 'क्षेत्र+क्षेत्रज्ञ', gender: 'm', number: 'dvi', case: 'sha', gloss: 'of the field and the field-knower' },
  'लोकसङ्ग्रहम्':    { category: 'noun', root: 'लोकसङ्ग्रह', gender: 'm', number: 'eka', case: 'dvi', gloss: 'world-welfare (object)' },
  'लोकसङ्ग्रहः':     { category: 'noun', root: 'लोकसङ्ग्रह', gender: 'm', number: 'eka', case: 'pra', gloss: 'world-welfare' },
  // Indeclinables / adverbs
  'यावत्':          { category: 'particle', gloss: 'as much as / while' },
  'तावत्':          { category: 'particle', gloss: 'so much as / so long as' },
  // Compound prefix-words that aren't in agent vocab.
  'महा':            { category: 'particle', root: 'महत्', gloss: 'great (compound prefix; fusion of महत् → महा-)' },
  'सु':             { category: 'particle', gloss: 'good / well (intensifying compound prefix)' },
  'दुर्':           { category: 'particle', gloss: 'bad / hard / ill (negative compound prefix)' },
  'अति':            { category: 'particle', gloss: 'across / beyond / very (compound prefix)' },
  // Common compound first-members and ordinary nouns user audit caught
  'द्विज':          { category: 'noun', root: 'द्विज', gender: 'm', number: '?', case: 'compound-stem', gloss: 'twice-born (brahmin) — compound stem' },
  'द्विजः':         { category: 'noun', root: 'द्विज', gender: 'm', number: 'eka', case: 'pra', gloss: 'twice-born / brahmin' },
  'उत्तम':          { category: 'adjective', root: 'उत्तम', gender: 'm', number: '?', case: 'compound-stem', gloss: 'best / highest (compound stem)' },
  'उत्तमः':         { category: 'adjective', root: 'उत्तम', gender: 'm', number: 'eka', case: 'pra', gloss: 'best / highest' },
  'उत्तमम्':        { category: 'adjective', root: 'उत्तम', gender: 'n', number: 'eka', case: 'pra', gloss: 'best / highest' },
  'उत्तमाम्':       { category: 'adjective', root: 'उत्तम', gender: 'f', number: 'eka', case: 'dvi', gloss: 'best / highest (object)' },
  'इष्वास':         { category: 'noun', root: 'इष्वास', gender: 'm', number: '?', case: 'compound-stem', gloss: 'archer / bow-shooter (compound stem)' },
  'इष्वासः':        { category: 'noun', root: 'इष्वास', gender: 'm', number: 'eka', case: 'pra', gloss: 'archer' },
  'इष्वासाः':       { category: 'noun', root: 'इष्वास', gender: 'm', number: 'bahu', case: 'pra', gloss: 'archers' },
  // Other common compound stems
  'रुधिर':          { category: 'noun', root: 'रुधिर', gender: 'n', number: '?', case: 'compound-stem', gloss: 'blood (compound stem)' },
  'रुधिरम्':        { category: 'noun', root: 'रुधिर', gender: 'n', number: 'eka', case: 'pra', gloss: 'blood' },
  'देह':            { category: 'noun', root: 'देह', gender: 'm', number: '?', case: 'compound-stem', gloss: 'body (compound stem)' },
  'देहम्':          { category: 'noun', root: 'देह', gender: 'm', number: 'eka', case: 'dvi', gloss: 'body (object)' },
  'देहः':           { category: 'noun', root: 'देह', gender: 'm', number: 'eka', case: 'pra', gloss: 'body' },
  'अर्थ':           { category: 'noun', root: 'अर्थ', gender: 'm', number: '?', case: 'compound-stem', gloss: 'meaning / purpose (compound stem)' },
  'अर्थः':          { category: 'noun', root: 'अर्थ', gender: 'm', number: 'eka', case: 'pra', gloss: 'meaning / purpose' },
  'अर्थम्':         { category: 'noun', root: 'अर्थ', gender: 'm', number: 'eka', case: 'dvi', gloss: 'meaning / purpose (object)' },
  'अर्थे':          { category: 'noun', root: 'अर्थ', gender: 'm', number: 'eka', case: 'sap', gloss: 'for the sake of / in the matter of' },
  'अन्तर':          { category: 'noun', root: 'अन्तर', gender: 'n', number: '?', case: 'compound-stem', gloss: 'interior / between (compound stem)' },
  'मात्रा':         { category: 'noun', root: 'मात्रा', gender: 'f', number: 'eka', case: 'pra', gloss: 'measure / quantity' },
  'स्पर्श':         { category: 'noun', root: 'स्पर्श', gender: 'm', number: '?', case: 'compound-stem', gloss: 'touch (compound stem)' },
  'स्पर्शाः':       { category: 'noun', root: 'स्पर्श', gender: 'm', number: 'bahu', case: 'pra', gloss: 'touches / contacts (pl)' },
  'शीत':            { category: 'adjective', root: 'शीत', gender: 'n', number: '?', case: 'compound-stem', gloss: 'cold (compound stem)' },
  'उष्ण':           { category: 'adjective', root: 'उष्ण', gender: 'n', number: '?', case: 'compound-stem', gloss: 'hot (compound stem)' },
  'आगम':            { category: 'noun', root: 'आगम', gender: 'm', number: '?', case: 'compound-stem', gloss: 'arrival / coming (compound stem)' },
  'अपायिन्':        { category: 'noun', root: 'अपायिन्', gender: 'm', number: '?', case: 'compound-stem', gloss: 'going-away one (compound stem)' },
  'अपायिनः':        { category: 'noun', root: 'अपायिन्', gender: 'm', number: 'bahu', case: 'pra', gloss: 'those who go away' },
  'अनुभाव':         { category: 'noun', root: 'अनुभाव', gender: 'm', number: '?', case: 'compound-stem', gloss: 'dignity / power (compound stem)' },
  'अनुभावान्':      { category: 'noun', root: 'अनुभाव', gender: 'm', number: 'bahu', case: 'dvi', gloss: 'dignified ones (object)' },
  'दौर्बल्य':       { category: 'noun', root: 'दौर्बल्य', gender: 'n', number: '?', case: 'compound-stem', gloss: 'weakness (compound stem)' },
  'दौर्बल्यम्':     { category: 'noun', root: 'दौर्बल्य', gender: 'n', number: 'eka', case: 'pra', gloss: 'weakness' },
  'क्षेत्रे':       { category: 'noun', root: 'क्षेत्र', gender: 'n', number: 'eka', case: 'sap', gloss: 'in the field' },
  'क्षेत्रम्':      { category: 'noun', root: 'क्षेत्र', gender: 'n', number: 'eka', case: 'pra', gloss: 'field' },
  'क्षेत्र':        { category: 'noun', root: 'क्षेत्र', gender: 'n', number: '?', case: 'compound-stem', gloss: 'field (compound stem)' },
  'प्रदिग्ध':       { category: 'krdanta', kind: 'past-passive', root: 'प्र + √दिह्', gloss: 'smeared / anointed (compound stem)' },
  'प्रदिग्धान्':    { category: 'krdanta', kind: 'past-passive', root: 'प्र + √दिह्', gender: 'm', number: 'bahu', case: 'dvi', gloss: 'smeared (pl, object)' },
  // Common predicate adjectives / PPPs from the survey
  'विमुक्त':        { category: 'krdanta', kind: 'past-passive', root: 'वि + √मुच्', gloss: 'released / liberated (compound stem)' },
  'विमुक्ताः':      { category: 'krdanta', kind: 'past-passive', root: 'वि + √मुच्', gender: 'm', number: 'bahu', case: 'pra', gloss: 'released / liberated (pl)' },
  'अचिन्त्य':       { category: 'krdanta', kind: 'gerundive', root: 'अ + √चिन्त्', gloss: 'unthinkable (compound stem)' },
  'अचिन्त्यं':      { category: 'krdanta', kind: 'gerundive', root: 'अ + √चिन्त्', gender: 'n', number: 'eka', case: 'pra', gloss: 'unthinkable' },
  'आविश्य':         { category: 'krdanta', kind: 'absolutive', root: 'आ + √विश्', gloss: 'having entered / pervaded' },
  'आश्रितः':        { category: 'krdanta', kind: 'past-passive', root: 'आ + √श्रि', gender: 'm', number: 'eka', case: 'pra', gloss: 'taken refuge in' },
  'अनिर्देश्य':     { category: 'krdanta', kind: 'gerundive', root: 'अ + निर् + √दिश्', gloss: 'indescribable (compound stem)' },
  'सर्वत्रग':       { category: 'adjective', root: 'सर्वत्रग', gender: 'm', number: '?', case: 'compound-stem', gloss: 'going-everywhere (compound stem)' },
  'सर्वत्रगम्':     { category: 'adjective', root: 'सर्वत्रग', gender: 'n', number: 'eka', case: 'pra', gloss: 'going everywhere' },
  'दोष':            { category: 'noun', root: 'दोष', gender: 'm', number: '?', case: 'compound-stem', gloss: 'fault / defect (compound stem)' },
  'दोषम्':          { category: 'noun', root: 'दोष', gender: 'm', number: 'eka', case: 'dvi', gloss: 'fault (object)' },
  'दोषाः':          { category: 'noun', root: 'दोष', gender: 'm', number: 'bahu', case: 'pra', gloss: 'faults (pl)' },
  'इन्द्रियाणाम्':  { category: 'noun', root: 'इन्द्रिय', gender: 'n', number: 'bahu', case: 'sha', gloss: 'of the senses' },
  'द्वन्द्वैः':     { category: 'noun', root: 'द्वन्द्व', gender: 'n', number: 'bahu', case: 'tri', gloss: 'by the pairs of opposites' },
  'द्वन्द्वम्':     { category: 'noun', root: 'द्वन्द्व', gender: 'n', number: 'eka', case: 'pra', gloss: 'pair of opposites' },
};

// आत्मन् — n-stem masculine "self / soul / Self". Hugely common across
// the Gītā with several characteristic forms (आत्मानम्, आत्मना, etc.).
const ATMAN = {
  'आत्मा':       { category: 'noun', root: 'आत्मन्', gender: 'm', number: 'eka',  case: 'pra', gloss: 'self / Self' },
  'आत्मानम्':    { category: 'noun', root: 'आत्मन्', gender: 'm', number: 'eka',  case: 'dvi', gloss: 'self (object)' },
  'आत्मानं':     { category: 'noun', root: 'आत्मन्', gender: 'm', number: 'eka',  case: 'dvi', gloss: 'self (object, anusvāra form)' },
  'आत्मना':      { category: 'noun', root: 'आत्मन्', gender: 'm', number: 'eka',  case: 'tri', gloss: 'by the self' },
  'आत्मने':      { category: 'noun', root: 'आत्मन्', gender: 'm', number: 'eka',  case: 'cha', gloss: 'for the self' },
  'आत्मनः':      { category: 'noun', root: 'आत्मन्', gender: 'm', number: 'eka',  case: 'sha', gloss: 'of the self / from the self' },
  'आत्मनि':      { category: 'noun', root: 'आत्मन्', gender: 'm', number: 'eka',  case: 'sap', gloss: 'in the self' },
  'आत्मानौ':     { category: 'noun', root: 'आत्मन्', gender: 'm', number: 'dvi',  case: 'pra', gloss: 'two selves' },
  'आत्मानः':     { category: 'noun', root: 'आत्मन्', gender: 'm', number: 'bahu', case: 'pra', gloss: 'selves (pl)' },
  'आत्मनाम्':    { category: 'noun', root: 'आत्मन्', gender: 'm', number: 'bahu', case: 'sha', gloss: 'of selves (pl)' },
  'आत्मसु':      { category: 'noun', root: 'आत्मन्', gender: 'm', number: 'bahu', case: 'sap', gloss: 'in selves (pl)' },
};

// Common i-stem nouns: अग्नि, मुनि, ऋषि, etc.
function buildIStemMasculine(stem, gloss) {
  return {
    [stem + 'िः']:     { category: 'noun', root: stem + 'ि', gender: 'm', number: 'eka',  case: 'pra', gloss },
    [stem + 'िम्']:    { category: 'noun', root: stem + 'ि', gender: 'm', number: 'eka',  case: 'dvi', gloss: `${gloss} (object)` },
    [stem + 'िना']:    { category: 'noun', root: stem + 'ि', gender: 'm', number: 'eka',  case: 'tri', gloss: `by ${gloss}` },
    [stem + 'ये']:     { category: 'noun', root: stem + 'ि', gender: 'm', number: 'eka',  case: 'cha', gloss: `for ${gloss}` },
    [stem + 'ेः']:     { category: 'noun', root: stem + 'ि', gender: 'm', number: 'eka',  case: 'sha', gloss: `of ${gloss}` },
    [stem + 'ौ']:      { category: 'noun', root: stem + 'ि', gender: 'm', number: 'eka',  case: 'sap', gloss: `in ${gloss}` },
    [stem + 'यः']:     { category: 'noun', root: stem + 'ि', gender: 'm', number: 'bahu', case: 'pra', gloss: `${gloss} (pl)` },
    [stem + 'ीन्']:    { category: 'noun', root: stem + 'ि', gender: 'm', number: 'bahu', case: 'dvi', gloss: `${gloss} (pl, object)` },
    [stem + 'िभिः']:   { category: 'noun', root: stem + 'ि', gender: 'm', number: 'bahu', case: 'tri', gloss: `by ${gloss} (pl)` },
    [stem + 'ीनाम्']:  { category: 'noun', root: stem + 'ि', gender: 'm', number: 'bahu', case: 'sha', gloss: `of ${gloss} (pl)` },
    [stem + 'िषु']:    { category: 'noun', root: stem + 'ि', gender: 'm', number: 'bahu', case: 'sap', gloss: `in ${gloss} (pl)` },
  };
}
const I_STEM_NOUNS = {
  ...buildIStemMasculine('अग्न', 'fire'),
  ...buildIStemMasculine('मुन', 'sage'),
  ...buildIStemMasculine('ऋष', 'seer'),
};

// Build i-stem feminine declension (मति-style) — for स्त्रीलिंग nouns.
function buildIStemFeminine(stem, gloss) {
  return {
    [stem + 'िः']:     { category: 'noun', root: stem + 'ि', gender: 'f', number: 'eka',  case: 'pra', gloss },
    [stem + 'िम्']:    { category: 'noun', root: stem + 'ि', gender: 'f', number: 'eka',  case: 'dvi', gloss: `${gloss} (object)` },
    [stem + 'या']:     { category: 'noun', root: stem + 'ि', gender: 'f', number: 'eka',  case: 'tri', gloss: `by ${gloss}` },
    [stem + 'ये']:     { category: 'noun', root: stem + 'ि', gender: 'f', number: 'eka',  case: 'cha', gloss: `for ${gloss}` },
    [stem + 'ेः']:     { category: 'noun', root: stem + 'ि', gender: 'f', number: 'eka',  case: 'sha', gloss: `of ${gloss}` },
    [stem + 'ौ']:      { category: 'noun', root: stem + 'ि', gender: 'f', number: 'eka',  case: 'sap', gloss: `in ${gloss}` },
    [stem + 'यः']:     { category: 'noun', root: stem + 'ि', gender: 'f', number: 'bahu', case: 'pra', gloss: `${gloss} (pl)` },
    [stem + 'ीः']:     { category: 'noun', root: stem + 'ि', gender: 'f', number: 'bahu', case: 'dvi', gloss: `${gloss} (pl, object)` },
    [stem + 'िभिः']:   { category: 'noun', root: stem + 'ि', gender: 'f', number: 'bahu', case: 'tri', gloss: `by ${gloss} (pl)` },
    [stem + 'ीनाम्']:  { category: 'noun', root: stem + 'ि', gender: 'f', number: 'bahu', case: 'sha', gloss: `of ${gloss} (pl)` },
    [stem + 'िषु']:    { category: 'noun', root: stem + 'ि', gender: 'f', number: 'bahu', case: 'sap', gloss: `in ${gloss} (pl)` },
  };
}
const I_STEM_FEMININES = {
  ...buildIStemFeminine('शान्त', 'peace'),
  ...buildIStemFeminine('बुद्ध', 'intellect'),
  ...buildIStemFeminine('व्यक्त', 'manifestation'),
  ...buildIStemFeminine('कीर्त', 'fame'),
  ...buildIStemFeminine('गत', 'gait / path'),  // -इ stem गति (overlaps with PPP गत — that's OK, vocab keys different)
  ...buildIStemFeminine('स्मृत', 'memory'),
};

// Extra high-frequency a-stem masculines & neuters.
const MORE_NOUNS = {
  // Names + epithets (a-stem masculines treated as proper nouns).
  ...buildAStemMasculine('आचार्य', 'teacher'),
  ...buildAStemMasculine('भीष्म', 'Bhīṣma'),
  ...buildAStemMasculine('द्रोण', 'Drona'),
  ...buildAStemMasculine('अर्जुन', 'Arjuna'),
  ...buildAStemMasculine('कृष्ण', 'Krishna'),
  ...buildAStemMasculine('हृषीकेश', 'Hṛṣīkeśa (Krishna)'),
  ...buildAStemMasculine('केशव', 'Keśava (Krishna)'),
  ...buildAStemMasculine('गोविन्द', 'Govinda (Krishna)'),
  ...buildAStemMasculine('मधुसूदन', 'Madhusūdana (Krishna)'),
  ...buildAStemMasculine('पार्थ', 'Pārtha (Arjuna)'),
  ...buildAStemMasculine('शूर', 'hero'),
  ...buildAStemMasculine('देव', 'god'),
  ...buildAStemMasculine('दैत्य', 'demon'),
  ...buildAStemMasculine('मानव', 'human'),
  ...buildAStemMasculine('विष', 'enemy / poison-like'),
  // High-frequency a-stem neuters
  ...buildAStemNeuter('वचन', 'word'),
  ...buildAStemNeuter('विश्व', 'universe'),
  ...buildAStemNeuter('कारण', 'cause'),
  ...buildAStemNeuter('बल', 'strength / army'),
  ...buildAStemNeuter('वाक्य', 'speech / sentence'),
  ...buildAStemNeuter('रूप', 'form'),
  ...buildAStemNeuter('इन्द्रिय', 'sense organ'),
  ...buildAStemNeuter('युद्ध', 'battle'),
  ...buildAStemNeuter('रथ', 'chariot'),
  ...buildAStemNeuter('शास्त्र', 'scripture / treatise'),
  ...buildAStemNeuter('फल', 'fruit'),
  ...buildAStemNeuter('धन', 'wealth'),
  ...buildAStemNeuter('गुण', 'quality'),
  ...buildAStemNeuter('यज्ञ', 'sacrifice'),
  ...buildAStemNeuter('दान', 'gift'),
  ...buildAStemNeuter('तप', 'austerity'),
  ...buildAStemNeuter('अमृत', 'nectar / immortality'),
  ...buildAStemNeuter('समुद्र', 'ocean'),
  ...buildAStemNeuter('सङ्ग्राम', 'battle'),
  ...buildAStemNeuter('अहंकार', 'ego / I-maker'),
};

// More common forms — krdantas, indeclinables, infrequent verbs.
const MORE_COMMON = {
  // Indefinite pronoun
  'कश्चित्':       { category: 'pronoun', root: 'किम्+चित्', gender: 'm', number: 'eka', case: 'pra', gloss: 'anyone / someone' },
  'कश्चन':         { category: 'pronoun', root: 'किम्+चन',  gender: 'm', number: 'eka', case: 'pra', gloss: 'anyone' },
  'किञ्चित्':      { category: 'pronoun', root: 'किम्+चित्', gender: 'n', number: 'eka', case: 'pra', gloss: 'anything' },
  // Common PPPs / krdantas
  'प्रोक्तम्':      { category: 'krdanta', kind: 'past-passive', root: 'प्र + √वच्',  gender: 'n', number: 'eka', case: 'pra', gloss: 'declared / proclaimed' },
  'प्रोक्तः':       { category: 'krdanta', kind: 'past-passive', root: 'प्र + √वच्',  gender: 'm', number: 'eka', case: 'pra', gloss: 'declared / proclaimed' },
  'अहैतुकम्':       { category: 'krdanta', kind: 'past-passive', root: 'अ + हेतु', gender: 'n', number: 'eka', case: 'pra', gloss: 'without cause / motiveless' },
  'असमुदाहृतम्':    { category: 'krdanta', kind: 'past-passive', root: 'अ + सम् + उद् + आ + √हृ', gender: 'n', number: 'eka', case: 'pra', gloss: 'not stated / not properly declared' },
  'अफलाकाङ्क्षिभिः': { category: 'noun', root: 'अफलाकाङ्क्षिन्', gender: 'm', number: 'bahu', case: 'tri', gloss: 'by those not desiring fruit' },
  // Infinitives
  'शोचितुम्':      { category: 'krdanta', kind: 'infinitive', root: '√शुच्', gloss: 'to grieve' },
  // Absolutives
  'आश्रित्य':       { category: 'krdanta', kind: 'absolutive', root: 'आ + √श्रि', gloss: 'having taken refuge in' },
  'उपेत्य':         { category: 'krdanta', kind: 'absolutive', root: 'उप + √इ',   gloss: 'having approached' },
  'अवष्टभ्य':       { category: 'krdanta', kind: 'absolutive', root: 'अव + √स्तभ्', gloss: 'having relied on / steadied' },
  'विसृज्य':        { category: 'krdanta', kind: 'absolutive', root: 'वि + √सृज्', gloss: 'having released' },
  'उत्सृज्य':       { category: 'krdanta', kind: 'absolutive', root: 'उद् + √सृज्', gloss: 'having abandoned / cast off' },
  'समुपाश्रितः':    { category: 'krdanta', kind: 'past-passive', root: 'सम् + उप + आ + √श्रि', gender: 'm', number: 'eka', case: 'pra', gloss: 'one who has fully taken refuge' },
  // Adverbs
  'आश्चर्यवत्':     { category: 'particle', gloss: 'wonderfully / as if a wonder' },
  // Compound-derived nouns the pad-splitter leaves whole
  'भूतग्राम्':      { category: 'noun', root: 'भूतग्राम', gender: 'm', number: 'eka', case: 'dvi', gloss: 'the multitude of beings (object)' },
  'भूतग्रामः':      { category: 'noun', root: 'भूतग्राम', gender: 'm', number: 'eka', case: 'pra', gloss: 'the multitude of beings' },
  'जन्ममृत्युजः':   { category: 'noun', root: 'जन्ममृत्युज', gender: 'm', number: 'eka', case: 'pra', gloss: 'born of birth-and-death' },
  'आत्मविनिग्रहः':  { category: 'noun', root: 'आत्मविनिग्रह', gender: 'm', number: 'eka', case: 'pra', gloss: 'self-restraint' },
};

// Combined map. Pronoun tables come first, then common nouns/PPPs.
export const CORE_VOCAB = {
  ...ATMAN,
  ...I_STEM_NOUNS,
  ...I_STEM_FEMININES,
  ...MORE_NOUNS,
  ...MORE_COMMON,
  ...YAD,
  ...TAD,
  ...IDAM,
  ...ETAD,
  ...KIM,
  ...SARVA,
  ...ASMAD,
  ...YUSHMAD,
  ...COMMON_NOUNS,
};

// Convenience: case label expansion (used by Atlas / Primer if needed).
export const CASE_NAMES = CASE_LABEL;
export const NUMBER_NAMES = NUMBER_LABEL;
