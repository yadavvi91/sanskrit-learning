// कारक — semantic case-roles (Pāṇini's deeper layer above विभक्ति).
// विभक्ति = morphological ending. कारक = role in the action.
// Active vs passive constructions: विभक्ति assignments swap, कारक roles stay.

export const KARAKAS = [
  {
    id: 'karta', deva: 'कर्ता', en: 'agent',
    activeVibhakti: 'प्रथमा', passiveVibhakti: 'तृतीया',
    sense: 'The doer of the action.',
    activeEx: 'रामः रावणं हन्ति — *Rāma kills Rāvaṇa*',
    passiveEx: 'रामेण रावणः हतः — *Rāvaṇa is killed by Rāma*',
  },
  {
    id: 'karman', deva: 'कर्म', en: 'patient / object',
    activeVibhakti: 'द्वितीया', passiveVibhakti: 'प्रथमा',
    sense: 'The thing acted upon.',
    activeEx: 'रामः रावणं हन्ति',
    passiveEx: 'रामेण रावणः हतः',
  },
  {
    id: 'karana', deva: 'करण', en: 'instrument',
    activeVibhakti: 'तृतीया', passiveVibhakti: 'तृतीया',
    sense: 'The means / tool of the action.',
    activeEx: 'इषुभिः युध्यते — *fights with arrows* (cf. Gītā 2.4 इषुभिः)',
    passiveEx: '— same in passive',
  },
  {
    id: 'sampradana', deva: 'सम्प्रदान', en: 'recipient',
    activeVibhakti: 'चतुर्थी', passiveVibhakti: 'चतुर्थी',
    sense: 'The one for whom the action is done.',
    activeEx: 'ब्राह्मणाय धनं ददाति — *gives money to the brāhmaṇa*',
    passiveEx: '— recipient stays in चतुर्थी',
  },
  {
    id: 'apadana', deva: 'अपादान', en: 'source',
    activeVibhakti: 'पञ्चमी', passiveVibhakti: 'पञ्चमी',
    sense: 'That from which separation occurs.',
    activeEx: 'वृक्षात् पत्रम् पतति — *a leaf falls from the tree*',
    passiveEx: '— source stays in पञ्चमी',
  },
  {
    id: 'adhikarana', deva: 'अधिकरण', en: 'location',
    activeVibhakti: 'सप्तमी', passiveVibhakti: 'सप्तमी',
    sense: 'The locus of the action — place, time, or object on which something rests.',
    activeEx: 'सङ्ख्ये योत्स्यामि — *(I) shall fight in battle* (Gītā 2.4 सङ्ख्ये)',
    passiveEx: '— location stays in सप्तमी',
  },
];

export const KARAKA_KEY_INSIGHT =
  'Pāṇini built the whole grammar around कारक, not विभक्ति. In passive constructions ' +
  'the विभक्ति assignments swap (कर्ता drops to तृतीया, कर्म rises to प्रथमा), but the ' +
  'roles themselves do not change. Once you read by role, passive sentences stop looking ' +
  'broken — they look like the same scene with a different camera angle.';
