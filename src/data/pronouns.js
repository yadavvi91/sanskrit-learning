// Sanskrit pronoun paradigms — सर्वनाम.
// Personal (अस्मद्, युष्मद्): no gender, 7 cases × 3 numbers, with enclitic alternates.
// सर्वनाम (तद्-template): 4 स्म-cells deviate from the राम pattern.

export const CASES = [
  { id: 'pra', deva: 'प्रथमा',   en: 'Nom.' },
  { id: 'dvi', deva: 'द्वितीया', en: 'Acc.' },
  { id: 'tri', deva: 'तृतीया',  en: 'Inst.' },
  { id: 'cha', deva: 'चतुर्थी',  en: 'Dat.' },
  { id: 'pan', deva: 'पञ्चमी',  en: 'Abl.' },
  { id: 'sha', deva: 'षष्ठी',     en: 'Gen.' },
  { id: 'sap', deva: 'सप्तमी',  en: 'Loc.' },
];

export const NUMBERS = [
  { id: 'eka',  deva: 'एकवचन',  en: 'sg' },
  { id: 'dvi',  deva: 'द्विवचन', en: 'du' },
  { id: 'bahu', deva: 'बहुवचन', en: 'pl' },
];

// Form + optional enclitic short form (mā, me, nau, naḥ, te, vaḥ).
const f = (form, enclitic = null) => ({ form, enclitic });

export const ASMAD = {
  id: 'asmad', deva: 'अस्मद्', en: 'I / we', genders: 'no gender',
  cells: {
    pra: { eka: f('अहम्'),    dvi: f('आवाम्'),                       bahu: f('वयम्') },
    dvi: { eka: f('माम्', 'मा'), dvi: f('आवाम्', 'नौ'),               bahu: f('अस्मान्', 'नः') },
    tri: { eka: f('मया'),       dvi: f('आवाभ्याम्'),                   bahu: f('अस्माभिः') },
    cha: { eka: f('मह्यम्', 'मे'), dvi: f('आवाभ्याम्', 'नौ'),        bahu: f('अस्मभ्यम्', 'नः') },
    pan: { eka: f('मत्'),       dvi: f('आवाभ्याम्'),                   bahu: f('अस्मत्') },
    sha: { eka: f('मम', 'मे'),  dvi: f('आवयोः', 'नौ'),               bahu: f('अस्माकम्', 'नः') },
    sap: { eka: f('मयि'),      dvi: f('आवयोः'),                      bahu: f('अस्मासु') },
  },
};

export const YUSHMAD = {
  id: 'yushmad', deva: 'युष्मद्', en: 'you', genders: 'no gender',
  cells: {
    pra: { eka: f('त्वम्'),     dvi: f('युवाम्'),                       bahu: f('यूयम्') },
    dvi: { eka: f('त्वाम्', 'त्वा'), dvi: f('युवाम्', 'वाम्'),         bahu: f('युष्मान्', 'वः') },
    tri: { eka: f('त्वया'),     dvi: f('युवाभ्याम्'),                   bahu: f('युष्माभिः') },
    cha: { eka: f('तुभ्यम्', 'ते'), dvi: f('युवाभ्याम्', 'वाम्'),    bahu: f('युष्मभ्यम्', 'वः') },
    pan: { eka: f('त्वत्'),    dvi: f('युवाभ्याम्'),                   bahu: f('युष्मत्') },
    sha: { eka: f('तव', 'ते'),  dvi: f('युवयोः', 'वाम्'),            bahu: f('युष्माकम्', 'वः') },
    sap: { eka: f('त्वयि'),    dvi: f('युवयोः'),                      bahu: f('युष्मासु') },
  },
};

// तद् — master सर्वनाम template. Four स्म-cells deviate from राम pattern (flagged as `isSma:true`).
export const TAD_M = {
  id: 'tad_m', deva: 'तद् (पुं.)', en: 'he / that (m.)',
  cells: {
    pra: { eka: { form: 'सः', isSuppletive: true }, dvi: { form: 'तौ' },             bahu: { form: 'ते',         isSma: true } },
    dvi: { eka: { form: 'तम्' },                    dvi: { form: 'तौ' },             bahu: { form: 'तान्' } },
    tri: { eka: { form: 'तेन' },                   dvi: { form: 'ताभ्याम्' },        bahu: { form: 'तैः' } },
    cha: { eka: { form: 'तस्मै', isSma: true },    dvi: { form: 'ताभ्याम्' },        bahu: { form: 'तेभ्यः' } },
    pan: { eka: { form: 'तस्मात्', isSma: true },  dvi: { form: 'ताभ्याम्' },        bahu: { form: 'तेभ्यः' } },
    sha: { eka: { form: 'तस्य' },                  dvi: { form: 'तयोः' },           bahu: { form: 'तेषाम्' } },
    sap: { eka: { form: 'तस्मिन्', isSma: true }, dvi: { form: 'तयोः' },           bahu: { form: 'तेषु' } },
  },
};

export const TAD_F = {
  id: 'tad_f', deva: 'तद् (स्त्री.)', en: 'she / that (f.)',
  cells: {
    pra: { eka: { form: 'सा', isSuppletive: true }, dvi: { form: 'ते' },              bahu: { form: 'ताः' } },
    dvi: { eka: { form: 'ताम्' },                   dvi: { form: 'ते' },              bahu: { form: 'ताः' } },
    tri: { eka: { form: 'तया' },                   dvi: { form: 'ताभ्याम्' },         bahu: { form: 'ताभिः' } },
    cha: { eka: { form: 'तस्यै', isSma: true },    dvi: { form: 'ताभ्याम्' },         bahu: { form: 'ताभ्यः' } },
    pan: { eka: { form: 'तस्याः', isSma: true },   dvi: { form: 'ताभ्याम्' },         bahu: { form: 'ताभ्यः' } },
    sha: { eka: { form: 'तस्याः' },                dvi: { form: 'तयोः' },            bahu: { form: 'तासाम्' } },
    sap: { eka: { form: 'तस्याम्', isSma: true }, dvi: { form: 'तयोः' },            bahu: { form: 'तासु' } },
  },
};

export const TAD_N = {
  id: 'tad_n', deva: 'तद् (नपुं.)', en: 'it / that (n.)',
  cells: {
    pra: { eka: { form: 'तत्', isSuppletive: true }, dvi: { form: 'ते' },             bahu: { form: 'तानि' } },
    dvi: { eka: { form: 'तत्' },                     dvi: { form: 'ते' },             bahu: { form: 'तानि' } },
    tri: { eka: { form: 'तेन' },                    dvi: { form: 'ताभ्याम्' },        bahu: { form: 'तैः' } },
    cha: { eka: { form: 'तस्मै', isSma: true },     dvi: { form: 'ताभ्याम्' },        bahu: { form: 'तेभ्यः' } },
    pan: { eka: { form: 'तस्मात्', isSma: true },   dvi: { form: 'ताभ्याम्' },        bahu: { form: 'तेभ्यः' } },
    sha: { eka: { form: 'तस्य' },                   dvi: { form: 'तयोः' },           bahu: { form: 'तेषाम्' } },
    sap: { eka: { form: 'तस्मिन्', isSma: true },  dvi: { form: 'तयोः' },           bahu: { form: 'तेषु' } },
  },
};

// Transfer pronouns: same template, prefix swapped. Just show the प्रथमा एकवचन across genders.
export const TAD_TRANSFERS = [
  { id: 'yad',   deva: 'यद्',   en: 'who/which (relative)', m: 'यः',     f: 'या',     n: 'यत्' },
  { id: 'kim',   deva: 'किम्', en: 'who?/what? (interrog.)', m: 'कः',    f: 'का',     n: 'किम्' },
  { id: 'sarva', deva: 'सर्व', en: 'all',                  m: 'सर्वः', f: 'सर्वा',  n: 'सर्वम्' },
  { id: 'anya',  deva: 'अन्य', en: 'other',                m: 'अन्यः', f: 'अन्या',  n: 'अन्यत्' },
  { id: 'eka',   deva: 'एक',   en: 'one',                  m: 'एकः',   f: 'एका',    n: 'एकम्' },
  { id: 'etad',  deva: 'एतद्', en: 'this (proximate)',     m: 'एषः',   f: 'एषा',    n: 'एतत्' },
];

export const OUTLIERS = [
  { id: 'idam', deva: 'इदम्', en: 'this (here)', m: 'अयम्', f: 'इयम्', n: 'इदम्', note: 'Suppletive nominatives. Stem अ- in oblique cases (अनेन / अस्मै / अस्मिन्).' },
  { id: 'adas', deva: 'अदस्', en: 'that (yonder)', m: 'असौ', f: 'असौ', n: 'अदः', note: 'Recognition-only. Distinctive nominative असौ.' },
];

export const CORRELATIVES = [
  { yat: 'यद् … तद्',     en: 'who/which … that one',   gita: 'यदा यदा हि धर्मस्य ग्लानिर्भवति … तदात्मानं सृजाम्यहम् (4.7-8)' },
  { yat: 'यदा … तदा',    en: 'when … then',              gita: 'यदा संहरते चायं कूर्मोऽङ्गानीव सर्वशः … तदा प्रज्ञा प्रतिष्ठिता (2.58)' },
  { yat: 'यत्र … तत्र',  en: 'where … there',            gita: 'यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः | तत्र श्रीर्विजयो भूतिर्ध्रुवा नीतिर्मतिर्मम (18.78)' },
  { yat: 'यथा … तथा',  en: 'as … so',                    gita: 'यथा प्रदीप्तं ज्वलनं पतंगा (11.29)' },
  { yat: 'यावत् … तावत्', en: 'as long as … so long', gita: 'यावदर्थमुदपाने सर्वतः सम्प्लुतोदके (2.46)' },
  { yat: 'यदि … तर्हि / तदा', en: 'if … then',         gita: 'यदि ह्यहं न वर्तेयं जातु कर्मण्यतन्द्रितः (3.23)' },
];

export const REFLEXIVES = [
  { id: 'sva',    deva: 'स्व',     en: '"own"',         note: 'Declines like सर्व. Possessive — स्वकीय / svakīya.' },
  { id: 'atman', deva: 'आत्मन्', en: '"self / Self"', note: 'Masculine -न् stem. Doubles as reflexive ("oneself") and philosophical Self. Gita exploits this ambiguity, e.g. आत्मना आत्मानम् उद्धरेत् (6.5).' },
];
