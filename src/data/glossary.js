// Atlas-wide glossary. Term → 1-line definition + which Primer section explains it in detail.

export const GLOSSARY = {
  पदच्छेद:    { shortDef: 'Word-splitting — undoing sandhi and समास to recover individual पद (words).',          section: 'decode-sequence' },
  अन्वय:      { shortDef: 'Reordering into Sanskrit\'s default-unmarked SOV sequence after metrical scrambling. Word order itself is free (case endings disambiguate); अन्वय restores the default.', section: 'sov-svo' },
  सन्धि:       { shortDef: 'Phonetic fusion at word boundaries — joins sounds to ease pronunciation.',           section: 'sandhi' },
  समास:      { shortDef: 'Compound — two or more words fused into one. Six classical types (तत्पुरुष, etc.).', section: 'compounds' },
  क्रिया:       { shortDef: 'Finite verb — the sentence anchor, conjugated for person and number.',              section: 'finite-verb' },
  धातु:        { shortDef: 'Verb root — the irreducible base from which all verb forms are derived.',           section: 'finite-verb' },
  कृदन्त:     { shortDef: 'Non-finite verb form (absolutive, infinitive, PPP). Orbits the finite verb.',       section: 'krdanta' },
  लकार:       { shortDef: 'Tense-mood marker — present, past, future, imperative, optative.',                   section: 'lakara' },
  विभक्ति:    { shortDef: 'Case suffix — encodes grammatical role (subject, object, location, …).',             section: 'vibhakti' },
  सम्बोधन: { shortDef: 'Vocative case — direct address ("O Arjuna!"). Never part of the action.',           section: 'vibhakti' },
  कारक:       { shortDef: 'Semantic role in the action (agent, patient, instrument, …). Above विभक्ति.',     section: 'karaka' },
  अव्यय:      { shortDef: 'Indeclinable — particle, postposition, adverb, conjunction. Form does not change.', section: 'indeclinables' },
  सर्वनाम:    { shortDef: 'Pronoun. Personal (अस्मद् / युष्मद्) or सर्वनाम-template (तद्, यद्, किम्, …).',     section: 'pronouns' },
  सामानाधिकरण्य: { shortDef: 'Adjective–noun co-reference: agreement in गण + वचन + विभक्ति.',                section: 'adjectives' },
  उपसर्ग:    { shortDef: 'Verbal prefix (प्रति, उप, उद्, …). Attaches to dhātus and changes the meaning.',     section: 'finite-verb' },
};
