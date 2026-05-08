// Grammar patterns internalized so far. Source of truth: patterns-won.md
// Each pattern names the verse that triggered it — feels like unlocking achievements.

export const PATTERN_CATEGORIES = [
  {
    id: 'noun',
    title: 'Noun System',
    patterns: [
      {
        name: 'प्रथमा = nominative',
        meaning: 'The -ः / -ाः ending = subject of sentence',
        trigger: { label: '1.1', verse: '1.1', example: 'धृतराष्ट्रः, मामकाः' },
      },
      {
        name: 'सप्तमी = locative',
        meaning: 'The -े ending *means* "in/at" — no separate preposition needed',
        trigger: { label: 'Lesson 2', example: 'वृन्दावने' },
      },
      {
        name: 'द्वितीया = accusative',
        meaning: 'The -म् / -ान् ending = object being acted on',
        trigger: { label: '2.4', verse: '2.4', example: 'भीष्मम्, द्रोणम्' },
      },
      {
        name: 'तृतीया = instrumental',
        meaning: 'The -भिः ending = "by/with"',
        trigger: { label: '2.4', verse: '2.4', example: 'इषुभिः — with arrows' },
      },
      {
        name: 'सम्बोधन = vocative',
        meaning: 'Shortened form (-अ endings) — addresses someone, never in the action',
        trigger: { label: '2.4', verse: '2.4', example: 'मधुसूदन, अरिसूदन' },
      },
      {
        name: 'विशेषण-विशेष्य agreement',
        meaning: 'Adjective must match noun in लिंग + वचन + विभक्ति (सामानाधिकरण्य)',
        trigger: { label: '2.5', verse: '2.5', example: 'महानुभावान् गुरून्' },
      },
      {
        name: 'Adjective identification',
        meaning: 'Endings narrow candidates; meaning picks the final match',
        trigger: { label: '1.1', verse: '1.1', example: 'समवेताः ↔ युयुत्सवः' },
      },
    ],
  },
  {
    id: 'verb',
    title: 'Verb System',
    patterns: [
      {
        name: 'Finite verb = sentence anchor',
        meaning:
          'Only the finite verb is conjugated for पुरुष + वचन + लकार; everything else orbits it',
        trigger: { label: '2.5', verse: '2.5', example: 'भुञ्जीय' },
      },
      {
        name: 'लङ् लकार identification',
        meaning: 'अ- prefix + -त् suffix = past tense',
        trigger: { label: '1.1', verse: '1.1', example: 'अकुर्वत' },
      },
      {
        name: 'लृट् लकार identification',
        meaning: '-ष्य- / -स्य- infix = future tense',
        trigger: { label: '2.4', verse: '2.4', example: 'प्रतियोत्स्यामि' },
      },
      {
        name: 'लोट् लकार identification',
        meaning: "Imperative mood — Krishna's instructions",
        trigger: { label: '2.3', verse: '2.3', example: 'उत्तिष्ठ, गमः' },
      },
      {
        name: 'विधिलिङ् identification',
        meaning: '-ीय / -यात् endings = "should/ought to" — the mood of rhetorical anguish',
        trigger: { label: '2.5', verse: '2.5', example: 'भुञ्जीय' },
      },
      {
        name: 'मा स्म + लोट्',
        meaning: '"Do not [verb]" — negated imperative',
        trigger: { label: '2.3', verse: '2.3', example: 'मा स्म गमः' },
      },
      {
        name: 'प्रथम पुरुष flip',
        meaning:
          'Sanskrit प्रथम = English 3rd person (he/she/it). Counted from outside in.',
        trigger: { label: '1.1', verse: '1.1', example: 'अकुर्वत — they did' },
      },
    ],
  },
  {
    id: 'krdanta',
    title: 'Kṛdanta — Verb-Derived Non-Finite Forms',
    patterns: [
      {
        name: 'Past passive participle (कृदन्त)',
        meaning:
          'Verb-derived adjective — agrees with a noun, does NOT anchor the sentence',
        trigger: { label: '1.1', verse: '1.1', example: 'समवेताः from सम् + अव + √इ' },
      },
      {
        name: 'Absolutive (हत्वा form)',
        meaning: '"Having [done]" — describes action before the main verb',
        trigger: { label: '2.5', verse: '2.5', example: 'हत्वा, अहत्वा' },
      },
      {
        name: 'Negative absolutive (अहत्वा)',
        meaning: 'अ + absolutive = "without [doing]"',
        trigger: { label: '2.5', verse: '2.5', example: 'अहत्वा — without killing' },
      },
      {
        name: 'Infinitive (भोक्तुम् form)',
        meaning: '"To [do]" — states purpose, cannot anchor sentence',
        trigger: { label: '2.5', verse: '2.5', example: 'भोक्तुम् — to eat' },
      },
    ],
  },
  {
    id: 'method',
    title: 'Decode Method',
    patterns: [
      {
        name: 'पदच्छेद → अन्वय → हिंदी → English',
        meaning: 'The full decode sequence',
        trigger: { label: 'Conversation' },
      },
      {
        name: 'अन्वय restores the default SOV order',
        meaning: 'Word order is free (case endings disambiguate); the unmarked default is SOV. अन्वय restores that default after the verse scrambles for metre — it does NOT mean "Sanskrit IS SOV"',
        trigger: { label: 'Conversation' },
      },
      {
        name: 'Hindi before English',
        meaning: 'Hindi is also default-SOV, so the order carries through; English flips to SVO. Sanskrit → Hindi is a closer structural step than Sanskrit → English',
        trigger: { label: 'Conversation' },
      },
      {
        name: 'Giveaway test',
        meaning:
          'Remove word X — does the sentence still work? If yes, X is not the finite verb',
        trigger: {
          label: '2.5',
          verse: '2.5',
          example: 'removing भोक्तुम् vs removing भुञ्जीय',
        },
      },
      {
        name: 'Endings narrow, meaning picks',
        meaning: 'विभक्ति matching gives candidates; context selects the right pairing',
        trigger: { label: '1.1', verse: '1.1', example: 'समवेताः — which noun does it describe?' },
      },
      {
        name: 'Sandhi comes last',
        meaning: 'Understand the expected form first; then the change makes sense',
        trigger: { label: 'bvsiitm explainer' },
      },
    ],
  },
];
