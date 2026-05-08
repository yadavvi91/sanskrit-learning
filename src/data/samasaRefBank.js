// Reference catalogue of canonical Sanskrit compounds.
//
// This is the *Atlas-as-reference* layer: examples a student would meet in
// any introductory grammar (Apte, Whitney, Bhandarkar), independent of the
// project's decoded verse corpus. The auto-grown verse bank in samasa.js
// continues to serve the "compounds I've personally encountered" view —
// these two layers are complementary, not redundant.
//
// Coverage goal: every type in SAMASA_TYPES has at least 3 canonical
// examples, including अव्ययीभाव which is rarely attested in the Gītā but
// common across the broader Sanskrit corpus.

export const SAMASA_REF_BANK = [
  // ───────────── तत्पुरुष family ─────────────

  // षष्ठी (genitive)
  { compound: 'राजपुत्रः',     vigraha: 'राज्ञः पुत्रः',          type: 'षष्ठी तत्पुरुष',    gloss: 'king\'s son',          source: 'classical' },
  { compound: 'गङ्गाजलम्',     vigraha: 'गङ्गायाः जलम्',          type: 'षष्ठी तत्पुरुष',    gloss: 'water of the Ganges', source: 'classical' },
  { compound: 'देवालयः',       vigraha: 'देवस्य आलयः',            type: 'षष्ठी तत्पुरुष',    gloss: 'house of god — temple', source: 'classical' },
  { compound: 'पादोदकम्',      vigraha: 'पादयोः उदकम्',           type: 'षष्ठी तत्पुरुष',    gloss: 'water of (someone\'s) feet', source: 'devotional' },

  // द्वितीया (accusative)
  { compound: 'कृष्णश्रितः',   vigraha: 'कृष्णम् आश्रितः',        type: 'द्वितीया तत्पुरुष', gloss: 'one who has taken refuge in Krishna', source: 'devotional' },
  { compound: 'सुखप्राप्तः',   vigraha: 'सुखम् प्राप्तः',          type: 'द्वितीया तत्पुरुष', gloss: 'one who has attained happiness', source: 'classical' },

  // तृतीया (instrumental)
  { compound: 'विद्याहीनः',    vigraha: 'विद्यया हीनः',           type: 'तृतीया तत्पुरुष',  gloss: 'devoid of learning',   source: 'classical' },
  { compound: 'मातृसदृशः',     vigraha: 'मात्रा सदृशः',           type: 'तृतीया तत्पुरुष',  gloss: 'similar to (the) mother', source: 'classical' },

  // चतुर्थी (dative)
  { compound: 'यूपदारु',       vigraha: 'यूपाय दारु',              type: 'चतुर्थी तत्पुरुष', gloss: 'wood for the sacrificial post', source: 'vedic' },
  { compound: 'गोहितम्',       vigraha: 'गवे हितम्',                type: 'चतुर्थी तत्पुरुष', gloss: 'beneficial for cows',  source: 'classical' },

  // पञ्चमी (ablative)
  { compound: 'चोरभयम्',       vigraha: 'चोरात् भयम्',             type: 'पञ्चमी तत्पुरुष',  gloss: 'fear from a thief',    source: 'classical' },
  { compound: 'स्वर्गपतितः',   vigraha: 'स्वर्गात् पतितः',         type: 'पञ्चमी तत्पुरुष',  gloss: 'fallen from heaven',   source: 'classical' },

  // सप्तमी (locative)
  { compound: 'गृहस्थः',        vigraha: 'गृहे स्थः',                 type: 'सप्तमी तत्पुरुष',  gloss: 'one who stands in the house — a householder', source: 'classical' },
  { compound: 'जलचरः',          vigraha: 'जले चरति इति',             type: 'उपपद तत्पुरुष',    gloss: 'water-mover — fish',  source: 'classical' },

  // उपपद (compound with a verbal-action right member)
  { compound: 'कुम्भकारः',      vigraha: 'कुम्भम् करोति इति',        type: 'उपपद तत्पुरुष',    gloss: 'pot-maker — potter',   source: 'classical' },
  { compound: 'वेदविद्',         vigraha: 'वेदम् वेत्ति इति',          type: 'उपपद तत्पुरुष',    gloss: 'knower of the Veda',   source: 'classical' },
  { compound: 'मनोहरः',         vigraha: 'मनः हरति इति',              type: 'उपपद तत्पुरुष',    gloss: 'mind-stealer — charming', source: 'classical' },
  { compound: 'धनदः',            vigraha: 'धनम् ददाति इति',            type: 'उपपद तत्पुरुष',    gloss: 'wealth-giver — Kubera', source: 'classical' },

  // कर्मधारय
  { compound: 'नीलोत्पलम्',    vigraha: 'नीलम् उत्पलम्',          type: 'कर्मधारय',           gloss: 'blue lotus',           source: 'classical' },
  { compound: 'महाराजः',       vigraha: 'महान् राजा',              type: 'कर्मधारय',           gloss: 'great king',            source: 'classical' },
  { compound: 'कृष्णसर्पः',    vigraha: 'कृष्णः सर्पः',            type: 'कर्मधारय',           gloss: 'black snake — cobra',   source: 'classical' },
  { compound: 'पीतम्बरम्',     vigraha: 'पीतम् अम्बरम्',          type: 'कर्मधारय',           gloss: 'yellow garment',         source: 'devotional', note: 'as compared to the बहुव्रीहि below' },

  // द्विगु (numerical)
  { compound: 'त्रिलोकी',       vigraha: 'त्रयाणाम् लोकानाम् समाहारः', type: 'द्विगु',          gloss: 'group of three worlds', source: 'classical' },
  { compound: 'पञ्चवटी',       vigraha: 'पञ्च वटीनाम् समाहारः',   type: 'द्विगु',              gloss: 'group of five banyan trees', source: 'epic' },
  { compound: 'चतुर्युगम्',    vigraha: 'चतुर्णाम् युगानाम् समाहारः', type: 'द्विगु',           gloss: 'group of four ages',    source: 'epic' },

  // ───────────── द्वन्द्व family ─────────────

  // इतरेतर (enumerated, takes plural / dual)
  { compound: 'रामलक्ष्मणौ',   vigraha: 'रामः च लक्ष्मणः च',     type: 'इतरेतर द्वन्द्व',  gloss: 'Rāma and Lakṣmaṇa (the two)', source: 'epic' },
  { compound: 'मातापितरौ',     vigraha: 'माता च पिता च',           type: 'इतरेतर द्वन्द्व',  gloss: 'mother and father (the two)', source: 'classical' },
  { compound: 'सुखदुःखे',      vigraha: 'सुखम् च दुःखम् च — ते',  type: 'इतरेतर द्वन्द्व',  gloss: 'pleasure and pain (the two)', source: 'classical' },

  // समाहार (collective, takes singular neuter)
  { compound: 'पाणिपादम्',     vigraha: 'पाणी च पादौ च',           type: 'समाहार द्वन्द्व',   gloss: 'hands-and-feet (collectively)', source: 'classical' },
  { compound: 'अहिनकुलम्',     vigraha: 'अहिः च नकुलः च',         type: 'समाहार द्वन्द्व',   gloss: 'snake-and-mongoose', source: 'classical' },

  // ───────────── बहुव्रीहि (possessive) ─────────────
  { compound: 'पीताम्बरः',     vigraha: 'पीतम् अम्बरम् यस्य सः', type: 'बहुव्रीहि',          gloss: '[the one] wearing yellow garments — Krishna', source: 'devotional' },
  { compound: 'चक्रपाणिः',      vigraha: 'चक्रम् पाणौ यस्य सः',   type: 'बहुव्रीहि',          gloss: '[the one] with the discus in his hand — Viṣṇu', source: 'devotional' },
  { compound: 'दशाननः',         vigraha: 'दश आननानि यस्य सः',     type: 'बहुव्रीहि',          gloss: '[the one] of ten faces — Rāvaṇa', source: 'epic' },
  { compound: 'चन्द्रशेखरः',    vigraha: 'चन्द्रः शेखरे यस्य सः', type: 'बहुव्रीहि',          gloss: '[the one] with the moon on his crest — Śiva', source: 'devotional' },
  { compound: 'महाबाहुः',       vigraha: 'महान्तौ बाहू यस्य सः',  type: 'बहुव्रीहि',          gloss: '[the one] of mighty arms', source: 'epic' },

  // ───────────── अव्ययीभाव (adverbial) ─────────────
  // These were absent from the Gītā 25-verse corpus — included here
  // because the Atlas should teach the type even when the specific
  // examples don't appear in the user's reading.
  { compound: 'यथाशक्ति',        vigraha: 'शक्तिम् अनतिक्रम्य',     type: 'अव्ययीभाव',        gloss: 'according to (one\'s) ability', source: 'classical' },
  { compound: 'यथाक्रमम्',       vigraha: 'क्रमम् अनतिक्रम्य',      type: 'अव्ययीभाव',        gloss: 'in order, sequentially',  source: 'classical' },
  { compound: 'यथाविधि',          vigraha: 'विधिम् अनतिक्रम्य',      type: 'अव्ययीभाव',        gloss: 'according to the rule',   source: 'classical' },
  { compound: 'अनुगङ्गम्',       vigraha: 'गङ्गाम् अनुगतम्',         type: 'अव्ययीभाव',        gloss: 'along the Ganges',       source: 'classical' },
  { compound: 'उपगिरि',           vigraha: 'गिरेः समीपे',              type: 'अव्ययीभाव',        gloss: 'near the mountain',      source: 'classical' },
  { compound: 'प्रत्यक्षम्',     vigraha: 'अक्षणोः प्रति',             type: 'अव्ययीभाव',        gloss: 'before the eyes / directly perceived', source: 'classical' },
  { compound: 'सायम्प्रातः',     vigraha: 'सायम् च प्रातः च',         type: 'अव्ययीभाव',        gloss: 'evening and morning',     source: 'classical' },

  // ───────────── नञ्-समास (negation) ─────────────
  { compound: 'अधर्मः',           vigraha: 'न धर्मः',                  type: 'नञ्-समास',          gloss: 'not-dharma — adharma',    source: 'classical' },
  { compound: 'अहिंसा',           vigraha: 'न हिंसा',                  type: 'नञ्-समास',          gloss: 'non-violence',           source: 'classical' },
  { compound: 'अनासक्तिः',        vigraha: 'न आसक्तिः',                type: 'नञ्-समास',          gloss: 'non-attachment',         source: 'gita' },
  { compound: 'अनार्यः',           vigraha: 'न आर्यः',                  type: 'नञ्-समास',          gloss: 'non-noble',              source: 'classical' },
  { compound: 'अकर्म',              vigraha: 'न कर्म',                  type: 'नञ्-समास',          gloss: 'non-action / inaction',   source: 'gita' },
];

// Stats helper for the Compound Bank UI.
export function refBankCountByFamily() {
  const counts = {};
  for (const e of SAMASA_REF_BANK) {
    // Map type → family using a small table (keep it local — tying back to
    // SAMASA_TYPES would invite circular structure for niche types).
    const family = familyOf(e.type);
    counts[family] = (counts[family] ?? 0) + 1;
  }
  return counts;
}

function familyOf(type) {
  if (type.includes('तत्पुरुष') || type === 'कर्मधारय' || type === 'द्विगु') return 'तत्पुरुष';
  if (type.includes('द्वन्द्व')) return 'द्वन्द्व';
  if (type === 'बहुव्रीहि') return 'बहुव्रीहि';
  if (type === 'अव्ययीभाव') return 'अव्ययीभाव';
  if (type === 'नञ्-समास') return 'नञ्-समास';
  return 'other';
}
