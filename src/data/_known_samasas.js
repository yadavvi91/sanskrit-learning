// Hand-curated lexicon of unhyphenated unhyphenated nominal compounds that
// recur across the Gītā. These are samāsas that show up in padaccheda as
// single words (no hyphen, no `+` in vocab root) and would otherwise be
// invisible to the engine.
//
// Each entry: surfaceStemSet → { vigraha, type, gloss }. The stem-set
// matches the root field of an inflected pada — e.g. कर्मयोगः, कर्मयोगम्,
// कर्मयोगस्य all share root कर्मयोग, so one entry covers every case-form.
//
// Coverage philosophy: small, hand-verified, conservative. Auto-detection
// from vocab `+` markers was tried and produced many false positives
// (sandhi-joins mislabeled as compounds), so we stick with the lexicon.

export const KNOWN_SAMASAS = {
  // तत्पुरुष: X-of/in-Y
  'कर्मयोग':    { vigraha: 'कर्मणि योगः', type: 'सप्तमी तत्पुरुष', gloss: 'yoga-in-action (the path of disciplined action)' },
  'कर्मसंन्यास': { vigraha: 'कर्मणः संन्यासः', type: 'षष्ठी तत्पुरुष', gloss: 'renunciation of action' },
  'कर्मफल':     { vigraha: 'कर्मणः फलम्', type: 'षष्ठी तत्पुरुष', gloss: 'fruit of action' },
  'ज्ञानयोग':   { vigraha: 'ज्ञानेन योगः', type: 'तृतीया तत्पुरुष', gloss: 'yoga-through-knowledge' },
  'भक्तियोग':   { vigraha: 'भक्त्या योगः', type: 'तृतीया तत्पुरुष', gloss: 'yoga-through-devotion' },
  'ध्यानयोग':   { vigraha: 'ध्यानेन योगः', type: 'तृतीया तत्पुरुष', gloss: 'yoga-through-meditation' },
  'आत्मशुद्धि': { vigraha: 'आत्मनः शुद्धिः', type: 'षष्ठी तत्पुरुष', gloss: 'purification of the self' },
  'ब्रह्मनिर्वाण': { vigraha: 'ब्रह्मणि निर्वाणम्', type: 'सप्तमी तत्पुरुष', gloss: 'extinction-in-Brahman' },
  'स्वधर्म':    { vigraha: 'स्वस्य धर्मः', type: 'षष्ठी तत्पुरुष', gloss: "one's own dharma" },
  'स्वजन':     { vigraha: 'स्वस्य जनः', type: 'षष्ठी तत्पुरुष', gloss: "one's own kin" },
  'दुःखयोनि':  { vigraha: 'दुःखस्य योनिः', type: 'षष्ठी तत्पुरुष', gloss: 'source of sorrow' },
  'दुःखालय':   { vigraha: 'दुःखानाम् आलयः', type: 'षष्ठी तत्पुरुष', gloss: 'abode of sorrow' },
  'कर्मेन्द्रिय': { vigraha: 'कर्मणाम् इन्द्रियाणि', type: 'षष्ठी तत्पुरुष', gloss: 'organs of action' },
  'ज्ञानेन्द्रिय': { vigraha: 'ज्ञानस्य इन्द्रियाणि', type: 'षष्ठी तत्पुरुष', gloss: 'organs of knowledge / sense organs' },
  'मनोबुद्धि':  { vigraha: 'मनश्च बुद्धिश्च', type: 'इतरेतर द्वंद्व', gloss: 'mind and intellect' },
  'योगक्षेम':   { vigraha: 'योगश्च क्षेमश्च', type: 'इतरेतर द्वंद्व', gloss: 'acquisition and preservation' },
  'सुखदुःख':   { vigraha: 'सुखं च दुःखं च', type: 'इतरेतर द्वंद्व', gloss: 'pleasure and pain' },
  'शीतोष्ण':    { vigraha: 'शीतं च उष्णं च', type: 'इतरेतर द्वंद्व', gloss: 'cold and heat' },
  'जयापजय':    { vigraha: 'जयश्च अपजयश्च', type: 'इतरेतर द्वंद्व', gloss: 'victory and defeat' },
  'लाभालाभ':    { vigraha: 'लाभश्च अलाभश्च', type: 'इतरेतर द्वंद्व', gloss: 'gain and loss' },
  'मानापमान':  { vigraha: 'मानश्च अपमानश्च', type: 'इतरेतर द्वंद्व', gloss: 'honour and dishonour' },

  // कर्मधारय: X (which is also) Y / X-kind-of-Y
  'अहङ्कार':   { vigraha: 'अहम् + कार', type: 'कर्मधारय', gloss: '"I-maker" — the I-sense, ego' },
  'महात्मन्':   { vigraha: 'महान् आत्मा', type: 'कर्मधारय', gloss: 'great-souled one' },
  'महायोग':    { vigraha: 'महान् योगः', type: 'कर्मधारय', gloss: 'great yoga' },
  'महाबाहु':   { vigraha: 'महान्तः बाहवः यस्य', type: 'बहुव्रीहि', gloss: 'O mighty-armed one' },

  // बहुव्रीहि: one-whose-X-is-Y
  'स्थितप्रज्ञ': { vigraha: 'स्थिता प्रज्ञा यस्य सः', type: 'बहुव्रीहि', gloss: 'one whose wisdom is steady' },
  'स्थितधी':    { vigraha: 'स्थिता धीः यस्य सः', type: 'बहुव्रीहि', gloss: 'one whose intellect is steady' },
  'समबुद्धि':   { vigraha: 'समा बुद्धिः यस्य सः', type: 'बहुव्रीहि', gloss: 'one whose intellect is balanced' },
  'समदुःखसुख': { vigraha: 'समे दुःखसुखे यस्य सः', type: 'बहुव्रीहि', gloss: 'one to whom sorrow and joy are alike' },
  'जितेन्द्रिय': { vigraha: 'जितानि इन्द्रियाणि येन सः', type: 'बहुव्रीहि', gloss: 'one whose senses are conquered' },
  'दृढव्रत':    { vigraha: 'दृढं व्रतं यस्य सः', type: 'बहुव्रीहि', gloss: 'one whose vow is firm' },
  // Botanical / object तत्पुरुष compounds — recur across the Gītā in similes.
  'पद्मपत्र':   { vigraha: 'पद्मस्य पत्रम्', type: 'षष्ठी तत्पुरुष', gloss: 'leaf of a lotus (the classic image: untouched by water)' },

  // Multi-element तत्पुरुष chains (each next member governs the previous in षष्ठी)
  'मृत्युसंसारसागर': { vigraha: 'मृत्योः संसारस्य सागरः', type: 'षष्ठी तत्पुरुष (chain)', gloss: 'the ocean of the saṃsāra (cycle of rebirth) of death — three nouns in successive षष्ठी' },
  'जन्मकर्मफलप्रद': { vigraha: 'जन्मनः कर्मणः फलं प्रददाति', type: 'उपपद तत्पुरुष', gloss: 'bestowing the fruit of birth-and-action' },

  // बहुव्रीहि variants for "whose mind/heart is X-ed in Y"
  'आवेशित-चेतस्': { vigraha: 'आवेशितं चेतः येषां ते', type: 'बहुव्रीहि', gloss: 'those whose minds are absorbed / entered into' },
  'अपहृत-चेतस्': { vigraha: 'अपहृतं चेतः येषां ते', type: 'बहुव्रीहि', gloss: 'those whose minds are stolen / carried away' },
  'युक्त-चेतस्':  { vigraha: 'युक्तं चेतः यस्य सः', type: 'बहुव्रीहि', gloss: 'one whose mind is yoked / disciplined' },
  'प्रसन्न-चेतस्': { vigraha: 'प्रसन्नं चेतः यस्य सः', type: 'बहुव्रीहि', gloss: 'one whose mind is clear / serene' },
};
