// Verb endings tables for the 5 Gita-practical lakaras × 2 padas × 3 puruṣa × 3 vacana.
// Tuned for thematic stems (gana 1, 4, 6, 10): the stem ends in inherent -अ;
// the endings are written so simple string concatenation produces the correct form.
// Athematic / suppletive / irregular roots use dhatu.forms[] overrides instead of these.

export const VIDHILIN_MARKER = 'े'; // ' े' — replaces inherent अ with ए
export const AUGMENT_LAN = 'अ';           // past-tense prefix

export const ENDINGS = {
  lat: {
    P: {
      prathama: { eka: 'ति', dvi: 'तः', bahu: 'न्ति' },
      madhyama: { eka: 'सि', dvi: 'थः', bahu: 'थ' },
      uttama:   { eka: 'ामि', dvi: 'ावः', bahu: 'ामः' },
    },
    A: {
      prathama: { eka: 'ते', dvi: 'ेते', bahu: 'न्ते' },
      madhyama: { eka: 'से', dvi: 'ेथे', bahu: 'ध्वे' },
      uttama:   { eka: 'े', dvi: 'ावहे', bahu: 'ामहे' },
    },
  },
  lan: {
    P: {
      prathama: { eka: 'त्', dvi: 'ताम्', bahu: 'न्' },
      madhyama: { eka: 'ः', dvi: 'तम्', bahu: 'त' },
      uttama:   { eka: 'म्', dvi: 'ाव', bahu: 'ाम' },
    },
    A: {
      prathama: { eka: 'त', dvi: 'ेताम्', bahu: 'न्त' },
      madhyama: { eka: 'थाः', dvi: 'ेथाम्', bahu: 'ध्वम्' },
      uttama:   { eka: 'े', dvi: 'ावहि', bahu: 'ामहि' },
    },
  },
  lot: {
    P: {
      prathama: { eka: 'तु', dvi: 'ताम्', bahu: 'न्तु' },
      madhyama: { eka: '', dvi: 'तम्', bahu: 'त' },
      uttama:   { eka: 'ानि', dvi: 'ाव', bahu: 'ाम' },
    },
    A: {
      prathama: { eka: 'ताम्', dvi: 'ेताम्', bahu: 'न्ताम्' },
      madhyama: { eka: 'स्व', dvi: 'ेथाम्', bahu: 'ध्वम्' },
      uttama:   { eka: 'ै', dvi: 'ावहै', bahu: 'ामहै' },
    },
  },
  vidhilin: {
    P: {
      prathama: { eka: 'ेत्', dvi: 'ेताम्', bahu: 'ेयुः' },
      madhyama: { eka: 'ेः', dvi: 'ेतम्', bahu: 'ेत' },
      uttama:   { eka: 'ेयम्', dvi: 'ेव', bahu: 'ेम' },
    },
    A: {
      prathama: { eka: 'ेत', dvi: 'ेयाताम्', bahu: 'ेरन्' },
      madhyama: { eka: 'ेथाः', dvi: 'ेयाथाम्', bahu: 'ेध्वम्' },
      uttama:   { eka: 'ेय', dvi: 'ेवहि', bahu: 'ेमहि' },
    },
  },
  // लृट् uses LAT endings on the FUTURE stem (root + -इष्य- / -स्य-)
  lrt: {
    P: {
      prathama: { eka: 'ति', dvi: 'तः', bahu: 'न्ति' },
      madhyama: { eka: 'सि', dvi: 'थः', bahu: 'थ' },
      uttama:   { eka: 'ामि', dvi: 'ावः', bahu: 'ामः' },
    },
    A: {
      prathama: { eka: 'ते', dvi: 'ेते', bahu: 'न्ते' },
      madhyama: { eka: 'से', dvi: 'ेथे', bahu: 'ध्वे' },
      uttama:   { eka: 'े', dvi: 'ावहे', bahu: 'ामहे' },
    },
  },
};

export const LAKARAS = ['lat', 'lan', 'lrt', 'lot', 'vidhilin'];

export const LAKARA_META = {
  lat:      { devanagari: 'लट्',      label: 'Present',     hint: 'is/does',          signal: '-ति / -मि' },
  lan:      { devanagari: 'लङ्',      label: 'Imperfect',   hint: 'was/did',          signal: 'अ- prefix + -त्' },
  lrt:      { devanagari: 'लृट्',     label: 'Future',      hint: 'will',             signal: '-ष्य- / -स्य- infix' },
  lot:      { devanagari: 'लोट्',     label: 'Imperative',  hint: '!command',         signal: '-तु / bare stem / -अन्तु' },
  vidhilin: { devanagari: 'विधिलिङ्', label: 'Optative',    hint: 'should/ought',     signal: '-ेत् / -ेयुः' },
};

export const PURUSHAS = [
  { id: 'prathama', devanagari: 'प्रथम',  label: 'Third (he/she/it/they)' },
  { id: 'madhyama', devanagari: 'मध्यम',  label: 'Second (you)' },
  { id: 'uttama',   devanagari: 'उत्तम',   label: 'First (I/we)' },
];

export const VACHANAS = [
  { id: 'eka',  devanagari: 'एकवचन',  label: 'singular' },
  { id: 'dvi',  devanagari: 'द्विवचन', label: 'dual' },
  { id: 'bahu', devanagari: 'बहुवचन', label: 'plural' },
];

export const PADAS = [
  { id: 'P', devanagari: 'परस्मैपद',  label: 'Active-form endings' },
  { id: 'A', devanagari: 'आत्मनेपद', label: 'Middle-form endings' },
];

export const GANA_META = {
  1: { devanagari: 'भ्वादि',     thematic: true,  rule: 'guṇa + अ',           ex: 'भू → भव-ति' },
  2: { devanagari: 'अदादि',     thematic: false, rule: 'root itself',         ex: 'अद् → अत्-ति' },
  3: { devanagari: 'जुहोत्यादि', thematic: false, rule: 'reduplicate',         ex: 'हु → जुहो-ति' },
  4: { devanagari: 'दिवादि',     thematic: true,  rule: 'root + य',            ex: 'दिव् → दीव्य-ति' },
  5: { devanagari: 'स्वादि',     thematic: true,  rule: 'root + नु / नो',     ex: 'सु → सुनो-ति' },
  6: { devanagari: 'तुदादि',     thematic: true,  rule: 'root + अ (no guṇa)', ex: 'तुद् → तुद-ति' },
  7: { devanagari: 'रुधादि',     thematic: false, rule: 'infix न',             ex: 'रुध् → रुणद्-धि' },
  8: { devanagari: 'तनादि',     thematic: true,  rule: 'root + उ / ओ',        ex: 'तन् → तनो-ति' },
  9: { devanagari: 'क्र्यादि',    thematic: true,  rule: 'root + ना / नी',      ex: 'क्री → क्रीणा-ति' },
  10:{ devanagari: 'चुरादि',     thematic: true,  rule: 'root + अय',           ex: 'चुर् → चोरय-ति' },
};
