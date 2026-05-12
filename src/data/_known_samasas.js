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
  'कर्मफलसंयोग': { vigraha: 'कर्मणः फलस्य संयोगः', type: 'षष्ठी तत्पुरुष (chain)', gloss: 'connection with the fruit of action (three-noun chain: action → fruit → connection)' },
  'कर्मफलहेतु':  { vigraha: 'कर्मणः फलं हेतुः यस्य', type: 'बहुव्रीहि', gloss: 'one whose motive is the fruit of action' },
  'विद्याविनयसम्पन्न': { vigraha: 'विद्यया विनयेन च सम्पन्नः', type: 'तृतीया तत्पुरुष (chain)', gloss: 'endowed with knowledge and humility (विद्या "knowledge" + विनय "humility" both qualifying सम्पन्न "endowed")' },
  'धूतकल्मष':    { vigraha: 'धूताः कल्मषाः येषां ते', type: 'बहुव्रीहि', gloss: 'those whose impurities have been shaken off' },
  'ब्रह्मविद्':    { vigraha: 'ब्रह्म वेत्ति इति', type: 'उपपद तत्पुरुष', gloss: 'knower of Brahman (-विद् "one who knows" as second member)' },
  'स्थिरबुद्धि':  { vigraha: 'स्थिरा बुद्धिः यस्य सः', type: 'बहुव्रीहि', gloss: 'one whose intellect is steady' },
  'असक्तात्मन्':  { vigraha: 'असक्तः आत्मा यस्य सः', type: 'बहुव्रीहि', gloss: 'one whose self is unattached' },
  'ब्रह्मयोगयुक्तात्मन्': { vigraha: 'ब्रह्मयोगेन युक्तः आत्मा यस्य सः', type: 'बहुव्रीहि', gloss: 'one whose self is joined to Brahman-yoga' },
  'बाह्यस्पर्श': { vigraha: 'बाह्याः स्पर्शाः', type: 'कर्मधारय', gloss: 'outer contacts / external sensations' },
  'शरीरविमोक्षण': { vigraha: 'शरीरस्य विमोक्षणम्', type: 'षष्ठी तत्पुरुष', gloss: 'release of the body (i.e. death; the moment of bodily liberation)' },
  'काम-क्रोध-उद्भव':{ vigraha: 'कामात् क्रोधात् च उद्भवः', type: 'पञ्चमी तत्पुरुष (chain)', gloss: 'arising from desire and anger (two-source chain: desire → anger → impulse-arising)' },
  // BG 5.24 — three bahuvrīhi compounds describing the inward-turned yogī
  'अन्तःसुख':    { vigraha: 'अन्तः सुखं यस्य सः', type: 'बहुव्रीहि', gloss: 'one whose happiness is within (अन्तर् "inside" + सुख "happiness")' },
  'अन्तराराम':  { vigraha: 'अन्तर्-आरामः यस्य सः', type: 'बहुव्रीहि', gloss: 'one whose delight is within (अन्तर् + आराम — "inner garden / inner delight")' },
  'अन्तर्ज्योतिः':{ vigraha: 'अन्तर्-ज्योतिः यस्य सः', type: 'बहुव्रीहि', gloss: 'one whose light is within (अन्तर् + ज्योति — "inner light")' },
  // BG 5.25 — more bahuvrīhi describing the liberated sage
  'छिन्नद्वैध':   { vigraha: 'छिन्नं द्वैधं येषां ते', type: 'बहुव्रीहि', gloss: 'those whose duality / doubt has been cut away' },
  'यतात्मन्':    { vigraha: 'यतः आत्मा यस्य सः', type: 'बहुव्रीहि', gloss: 'one whose self is controlled (BG 5.7, 5.25, 7.18, 12.11, 12.14)' },
  'क्षीणकल्मष':  { vigraha: 'क्षीणाः कल्मषाः येषां ते', type: 'बहुव्रीहि', gloss: 'those whose impurities have wasted away (BG 5.25)' },
  'सर्वभूतहित':  { vigraha: 'सर्वेषां भूतानां हितम्', type: 'षष्ठी तत्पुरुष', gloss: 'the welfare of all beings' },
  'काम-क्रोध-वियुक्त': { vigraha: 'कामात् क्रोधात् च वियुक्तः', type: 'पञ्चमी तत्पुरुष (chain)', gloss: 'free from desire and anger' },
  'विदितात्मन्':       { vigraha: 'विदितः आत्मा येषां ते', type: 'बहुव्रीहि', gloss: 'those whose self has been known / those who have realized the Self (BG 5.26)' },
  'नासा-अभ्यन्तर-चारिन्': { vigraha: 'नासायाः अभ्यन्तरे चरति इति', type: 'उपपद तत्पुरुष', gloss: 'moving inside the nostrils (the prāṇa-apāna in BG 5.27 yogic breath description; first member नासा "nostril" with long ā)' },
  // BG 5.28 — two long bahuvrīhi compounds describing the liberated yogi
  'यतेन्द्रियमनोबुद्धि': { vigraha: 'यतानि इन्द्रिय-मनस्-बुद्धयः येन सः', type: 'बहुव्रीहि', gloss: 'one whose senses, mind, and intellect are controlled' },
  'मोक्षपरायण':         { vigraha: 'मोक्षः परायणम् यस्य सः', type: 'बहुव्रीहि', gloss: 'one whose supreme goal is liberation' },
  'विगत-इच्छा-भय-क्रोध':{ vigraha: 'विगतानि इच्छा-भय-क्रोधाः यस्य सः', type: 'बहुव्रीहि', gloss: 'one whose desire, fear, and anger have departed' },
  // BG 5.29 — Krishna as Lord of all worlds
  'सर्व-लोक-महेश्वर':  { vigraha: 'सर्वेषां लोकानां महेश्वरः', type: 'षष्ठी तत्पुरुष (chain)', gloss: 'Great Lord of all worlds' },
  // BG 6.2 — bahuvrīhi describing who is/is-not a yogi
  'असंन्यस्त-सङ्कल्प': { vigraha: 'असंन्यस्तः सङ्कल्पः येन सः', type: 'बहुव्रीहि (नञ्)', gloss: 'one who has not renounced his sankalpas (intentions / will-formations)' },
  // BG 6.3, 6.4 — योग-आरूढ "one who has ascended into yoga" (the
  // metaphor: यो + ग as the goal mountain; अ + आ → आ savarṇa-dīrgha).
  'योग-आरूढ':         { vigraha: 'योगम् आरूढः', type: 'द्वितीया तत्पुरुष', gloss: 'one who has ascended into yoga / is established in yoga (BG 6.3, 6.4)' },
  'सर्वसङ्कल्पसंन्यासिन्': { vigraha: 'सर्वान् सङ्कल्पान् संन्यसति इति', type: 'उपपद तत्पुरुष (over a कर्मधारय)', gloss: 'one who renounces all sankalpas / will-formations (the defining quality of the योग-आरूढ in BG 6.4)' },
  // BG 6.7–6.9 — the सम-दर्शन (equal-vision) compounds
  'मान-अपमान':       { vigraha: 'मानश्च अपमानश्च', type: 'इतरेतर द्वंद्व', gloss: 'honour and dishonour' },
  'शीत-उष्ण-सुख-दुःख':{ vigraha: 'शीतं उष्णं सुखं दुःखं च', type: 'इतरेतर द्वंद्व (chain)', gloss: 'cold, heat, pleasure, and pain — the classical four-element द्वंद्व chain BG 6.7 uses to define equanimity' },
  'ज्ञान-विज्ञान-तृप्त-आत्मन्': { vigraha: 'ज्ञानेन विज्ञानेन च तृप्तः आत्मा यस्य सः', type: 'बहुव्रीहि (chain)', gloss: 'one whose self is satisfied with knowledge and discriminative knowledge (BG 6.8)' },
  'सम-लोष्ट-अश्म-काञ्चन':{ vigraha: 'समाः लोष्ट-अश्म-काञ्चनाः यस्य सः', type: 'बहुव्रीहि', gloss: 'one to whom a clod, a stone, and gold are equal (BG 6.8 — image of supreme detachment)' },
  'सुहृद्-मित्र-अरि-उदासीन-मध्यस्थ-द्वेष्य-बन्धु':{ vigraha: 'सुहृद्-मित्र-अरि-उदासीन-मध्यस्थ-द्वेष्य-बन्धवः', type: 'इतरेतर द्वंद्व (seven-element chain)', gloss: 'friend (well-hearted), ally, enemy, neutral, mediator, hateful, and kinsman — the seven categories of social relation BG 6.9 says the yogi sees with equal eye. First stem सुहृद् (voiced -द्); the surface न्म in सुहृन्मित्र comes from -द् + म- → -न्म- consonant-cluster nasal assimilation' },
  'परम-आत्मन्':       { vigraha: 'परमः आत्मा', type: 'कर्मधारय', gloss: 'the Supreme Self (परम "supreme" + आत्मन् "self")' },
  'यत-चित्त-आत्मन्':  { vigraha: 'यतौ चित्तम् आत्मा च यस्य सः', type: 'बहुव्रीहि', gloss: 'one whose mind and self are restrained (BG 6.10)' },
  // BG 6.12 — the meditation-seat verse compounds
  'यतचित्तेन्द्रियक्रिय': { vigraha: 'यतानि चित्त-इन्द्रिय-क्रियाः यस्य सः', type: 'बहुव्रीहि', gloss: 'one whose mind, senses, and actions are controlled (BG 6.12)' },
  'आत्मविशुद्धि':      { vigraha: 'आत्मनः विशुद्धिः', type: 'षष्ठी तत्पुरुष', gloss: 'self-purification (विशुद्धि = वि + शुद्धि, "thorough purification"; BG 6.12)' },
  'काय-शिरस्-ग्रीव':  { vigraha: 'कायश्च शिरश्च ग्रीवा च', type: 'इतरेतर द्वंद्व (chain)', gloss: 'body, head, and neck (the three-part posture-target in BG 6.13)' },
  'नासिका-अग्र':      { vigraha: 'नासिकायाः अग्रम्', type: 'षष्ठी तत्पुरुष', gloss: 'tip of the nose (the gaze-target in BG 6.13)' },
  // BG 6.14 — bahuvrīhi describing the meditator
  'प्रशान्त-आत्मन्':   { vigraha: 'प्रशान्तः आत्मा यस्य सः', type: 'बहुव्रीहि', gloss: 'one whose self is calmed (BG 6.14)' },
  'मत्-चित्त':         { vigraha: 'मयि चित्तं यस्य सः', type: 'बहुव्रीहि', gloss: 'one whose mind is on me / fixed on Me (मत्- = "of me, in me"; recurring epithet for the yogī devoted to Kṛṣṇa, e.g. BG 6.14, 18.57)' },
  // BG 6.15 — three bahuvrīhi modifying शान्तिम्
  'नियत-मानस':       { vigraha: 'नियतम् मानसम् यस्य सः', type: 'बहुव्रीहि', gloss: 'one whose mind is restrained (BG 6.15)' },
  'निर्वाण-परम':     { vigraha: 'निर्वाणं परमं यस्याः सा', type: 'बहुव्रीहि', gloss: 'she whose supreme end is nirvāṇa (modifying शान्तिम् in BG 6.15)' },
  'मत्-संस्था':        { vigraha: 'मयि संस्था यस्याः सा', type: 'बहुव्रीहि', gloss: 'she who has abode in me (modifying शान्तिम् in BG 6.15; मत्- = "in me")' },
  // BG 6.16 — "not too much, not too little" bahuvrīhi
  'अति-स्वप्न-शील':   { vigraha: 'अति-स्वप्नः शीलं यस्य सः', type: 'बहुव्रीहि', gloss: 'one habituated to too much sleep (BG 6.16; अति-स्वप्न = "too much sleep", -शील = "having as habit")' },
  // BG 6.17 — moderation compounds describing the yogi
  'युक्त-आहार-विहार': { vigraha: 'युक्तौ आहार-विहारौ यस्य सः', type: 'बहुव्रीहि', gloss: 'one whose eating and recreation are regulated (BG 6.17)' },
  'युक्त-स्वप्न-अवबोध': { vigraha: 'युक्तौ स्वप्न-अवबोधौ यस्य सः', type: 'बहुव्रीहि', gloss: 'one whose sleeping and waking are regulated (BG 6.17)' },
  // BG 6.21 — pair describing the supreme bliss
  'बुद्धि-ग्राह्य':    { vigraha: 'बुद्ध्या ग्राह्यः', type: 'तृतीया तत्पुरुष', gloss: 'graspable by the intellect (gerundive ग्राह्य; BG 6.21)' },
  'अति-इन्द्रिय':     { vigraha: 'इन्द्रियाणि अतिक्रान्तः', type: 'प्रादि-समास / अव्ययीभाव', gloss: 'beyond the senses / transcending the senses (BG 6.21)' },
  'इन्द्रिय-ग्राम':   { vigraha: 'इन्द्रियाणां ग्रामः', type: 'षष्ठी तत्पुरुष', gloss: 'collection / group of the senses (BG 6.24)' },
  'आसक्त-मनस्':      { vigraha: 'आसक्तं मनः यस्य सः', type: 'बहुव्रीहि', gloss: 'one whose mind is attached (BG 7.1, with मयि as locus: "mind attached to me")' },
  // BG 6.23 — Krishna's own definition of yoga
  'दुःख-संयोग-वियोग':{ vigraha: 'दुःख-संयोगस्य वियोगः', type: 'षष्ठी तत्पुरुष (chain)', gloss: 'the disjunction from union with sorrow / separation from sorrow-contact (BG 6.23 — Krishna\'s definition of yoga)' },
  'योग-संज्ञित':      { vigraha: 'योगः इति संज्ञितः', type: 'तत्पुरुष', gloss: 'called yoga / known by the name yoga (BG 6.23)' },
  'अनिर्विण्ण-चेतस्':{ vigraha: 'अनिर्विण्णं चेतः यस्य सः', type: 'बहुव्रीहि', gloss: 'one whose mind is undisheartened / undespondent (BG 6.23)' },
  // BG 7.15 — Krishna's classification of those who don't approach him
  'मायया-अपहृत-ज्ञान':{ vigraha: 'मायया अपहृतं ज्ञानं येषां ते', type: 'बहुव्रीहि (with embedded तृतीया-तत्पुरुष)', gloss: 'those whose knowledge has been carried off by māyā (BG 7.15 — the instrumental मायया is embedded inside the bahuvrīhi; the masc.-pl. ending -आः agrees with the referent, not with neuter ज्ञान)' },
  // BG 7.16 — agent-nouns describing the kinds of devotees
  'अर्थार्थिन्':       { vigraha: 'अर्थम् अर्थयते इति', type: 'उपपद तत्पुरुष', gloss: 'seeker of wealth / one who desires wealth (BG 7.16)' },
  'हृत-ज्ञान':       { vigraha: 'हृतं ज्ञानं येषां ते', type: 'बहुव्रीहि', gloss: 'those whose knowledge has been stolen (BG 7.20 — companion to the 7.15 मायया-अपहृत-ज्ञान compound)' },
  // BG 7.27 — nested compound: द्वंद्व inside तृतीया-तत्पुरुष
  'इच्छा-द्वेष-समुत्थ': { vigraha: 'इच्छाद्वेषाभ्याम् समुत्थः', type: 'तृतीया तत्पुरुष (with द्वंद्व इच्छा-द्वेष inside)', gloss: 'arisen from desire-and-aversion (nested compound: द्वंद्व इच्छा-द्वेष "desire+aversion" inside तृतीया-तत्पुरुष; BG 7.27 — what gives rise to the द्वंद्व-मोह that confuses all beings at birth)' },
  'द्वंद्व-मोह':      { vigraha: 'द्वंद्वस्य मोहः', type: 'षष्ठी तत्पुरुष', gloss: 'delusion of the pairs of opposites (BG 7.27)' },
  // BG 8.8 — नञ्-bahuvrīhi describing the focused mind
  'न-अन्य-गामिन्': { vigraha: 'न अन्यत्र गच्छति इति', type: 'नञ्-तत्पुरुष / बहुव्रीहि', gloss: 'non-other-going / not going elsewhere = single-pointed / unwavering (BG 8.8 — describing चेतसा). The surface नान्यगामिन् is the नञ्-prefix form (न- before vowel-initial -अन्य-, gives नान्य- by savarṇa-dīrgha).' },

  // ─── Batch expansion: common Gītā compounds (commit batch) ───
  // तत्पुरुष chains involving ब्रह्म, कर्म, ज्ञान, आत्म, धर्म, योग
  'ब्रह्मचर्य':      { vigraha: 'ब्रह्मणि चर्या', type: 'सप्तमी तत्पुरुष', gloss: 'celibacy / studentship / conduct-toward-Brahman' },
  'ब्रह्मभूत':       { vigraha: 'ब्रह्म भूतः', type: 'कर्मधारय', gloss: 'become Brahman / merged with Brahman (BG 5.24, 18.54)' },
  'ब्रह्मसंस्पर्श':  { vigraha: 'ब्रह्मणा संस्पर्शः', type: 'तृतीया तत्पुरुष', gloss: 'contact with Brahman' },
  'ब्रह्मविद्या':    { vigraha: 'ब्रह्मणः विद्या', type: 'षष्ठी तत्पुरुष', gloss: 'knowledge of Brahman' },
  'धर्मक्षेत्र':     { vigraha: 'धर्मस्य क्षेत्रम्', type: 'षष्ठी तत्पुरुष', gloss: 'field of dharma (BG 1.1)' },
  'कुरुक्षेत्र':     { vigraha: 'कुरूणां क्षेत्रम्', type: 'षष्ठी तत्पुरुष', gloss: 'the field of the Kurus (BG 1.1)' },
  'कुरुनन्दन':      { vigraha: 'कुरूणां नन्दनः', type: 'षष्ठी तत्पुरुष', gloss: 'delighter of the Kurus (epithet for Arjuna)' },
  'भरतर्षभ':       { vigraha: 'भरतानां ऋषभः', type: 'षष्ठी तत्पुरुष', gloss: 'bull among the Bharatas (epithet)' },
  'भरतसत्तम':      { vigraha: 'भरतानां सत्तमः', type: 'षष्ठी तत्पुरुष', gloss: 'best among the Bharatas (epithet)' },
  'पुरुषर्षभ':      { vigraha: 'पुरुषाणां ऋषभः', type: 'षष्ठी तत्पुरुष', gloss: 'bull among men (epithet)' },
  'पुरुषोत्तम':     { vigraha: 'पुरुषाणाम् उत्तमः', type: 'षष्ठी तत्पुरुष', gloss: 'supreme person (epithet of Kṛṣṇa; BG 15)' },
  'नरोत्तम':       { vigraha: 'नराणाम् उत्तमः', type: 'षष्ठी तत्पुरुष', gloss: 'best of men' },
  'नरेन्द्र':        { vigraha: 'नराणाम् इन्द्रः', type: 'षष्ठी तत्पुरुष', gloss: 'king (lit. "Indra of men")' },
  'राजर्षि':         { vigraha: 'राजा ऋषिः', type: 'कर्मधारय', gloss: 'royal sage' },
  'महात्मा':       { vigraha: 'महान् आत्मा यस्य सः', type: 'बहुव्रीहि', gloss: 'great-souled one' },
  'महायोग':       { vigraha: 'महान् योगः', type: 'कर्मधारय', gloss: 'great yoga' },
  'महाबाहु':      { vigraha: 'महान्तौ बाहू यस्य सः', type: 'बहुव्रीहि', gloss: 'O mighty-armed one (epithet)' },
  'महामते':        { vigraha: 'महती मतिः यस्य सः', type: 'बहुव्रीहि', gloss: 'O great-minded one' },
  'महर्षि':        { vigraha: 'महान् ऋषिः', type: 'कर्मधारय', gloss: 'great sage' },

  // सम-X compounds (बहुव्रीहि "to whom X is equal/same")
  'सम-दर्शिन्':   { vigraha: 'समं पश्यति इति', type: 'उपपद तत्पुरुष', gloss: 'one who sees equally (BG 5.18, 13.28)' },
  'सम-चित्त':     { vigraha: 'समं चित्तं यस्य सः', type: 'बहुव्रीहि', gloss: 'one of equal mind' },
  'सम-बुद्धि':    { vigraha: 'समा बुद्धिः यस्य सः', type: 'बहुव्रीहि', gloss: 'one of equal intellect' },
  'सम-दुःख-सुख': { vigraha: 'समे दुःख-सुखे यस्य सः', type: 'बहुव्रीहि', gloss: 'one to whom joy and sorrow are equal (BG 2.15, 14.24)' },
  'सम-शीतोष्ण':  { vigraha: 'समे शीत-उष्णे यस्य सः', type: 'बहुव्रीहि', gloss: 'one to whom cold and heat are equal' },
  'सम-सुहृत्': { vigraha: 'समं सुहृत् यस्य सः', type: 'बहुव्रीहि', gloss: 'one who is equally friendly to all' },

  // नित्य- / सदा- compounds
  'नित्ययुक्त':    { vigraha: 'नित्यं युक्तः', type: 'गति समास', gloss: 'always united / always yoked' },
  'नित्यतृप्त':   { vigraha: 'नित्यं तृप्तः', type: 'गति समास', gloss: 'always content' },
  'नित्यवैरिन्':  { vigraha: 'नित्यः वैरी', type: 'कर्मधारय', gloss: 'perpetual enemy' },
  'नित्यसत्त्वस्थ': { vigraha: 'नित्यं सत्त्वे स्थितः', type: 'गति समास', gloss: 'always established in sattva (BG 2.45)' },
  'सदाचार':       { vigraha: 'सतां आचारः', type: 'षष्ठी तत्पुरुष', gloss: 'conduct of the good / righteous behaviour' },

  // -चेतस् / -मानस / -हृदय / -आत्मन् बहुव्रीहि family
  'योग-युक्त-चेतस्':{ vigraha: 'योगेन युक्तं चेतः यस्य सः', type: 'बहुव्रीहि', gloss: 'one whose mind is yoked in yoga' },
  'विगत-स्पृह':   { vigraha: 'विगता स्पृहा यस्य सः', type: 'बहुव्रीहि', gloss: 'one whose longing has departed (BG 2.56)' },
  'विगत-ज्वर':    { vigraha: 'विगतः ज्वरः यस्य सः', type: 'बहुव्रीहि', gloss: 'one whose fever / agitation has gone (BG 3.30)' },
  'विगत-भी':      { vigraha: 'विगता भीः यस्य सः', type: 'बहुव्रीहि', gloss: 'one whose fear has gone (BG 6.14)' },
  'गत-व्यथ':      { vigraha: 'गता व्यथा यस्य सः', type: 'बहुव्रीहि', gloss: 'one whose pain has gone' },
  'गत-असु':      { vigraha: 'गताः असवः यस्य सः', type: 'बहुव्रीहि', gloss: 'one whose life-breaths have gone (BG 2.11 — the dead)' },
  'दृढ-निश्चय':  { vigraha: 'दृढः निश्चयः यस्य सः', type: 'बहुव्रीहि', gloss: 'one of firm resolve' },
  'दृढ-व्रत':     { vigraha: 'दृढं व्रतं यस्य सः', type: 'बहुव्रीहि', gloss: 'one of firm vow (BG 7.28)' },

  // द्वंद्व pairs and chains
  'काम-क्रोध':     { vigraha: 'कामश्च क्रोधश्च', type: 'इतरेतर द्वंद्व', gloss: 'desire and anger' },
  'राग-द्वेष':     { vigraha: 'रागश्च द्वेषश्च', type: 'इतरेतर द्वंद्व', gloss: 'attraction and aversion' },
  'मोह-संकर':    { vigraha: 'मोहः च संकरः च', type: 'इतरेतर द्वंद्व', gloss: 'delusion and admixture' },
  'जन्म-मृत्यु':   { vigraha: 'जन्म च मृत्युः च', type: 'इतरेतर द्वंद्व', gloss: 'birth and death' },
  'जन्म-मरण':    { vigraha: 'जन्म च मरणं च', type: 'इतरेतर द्वंद्व', gloss: 'birth and death' },
  'जरा-मरण':     { vigraha: 'जरा च मरणं च', type: 'इतरेतर द्वंद्व', gloss: 'old age and death' },
  'पुण्य-पाप':    { vigraha: 'पुण्यं च पापं च', type: 'इतरेतर द्वंद्व', gloss: 'merit and demerit' },
  'भय-शोक':     { vigraha: 'भयं च शोकः च', type: 'इतरेतर द्वंद्व', gloss: 'fear and grief' },
  'सत्य-असत्य':  { vigraha: 'सत्यं च असत्यं च', type: 'इतरेतर द्वंद्व', gloss: 'truth and untruth' },
  'देव-असुर':    { vigraha: 'देवाश्च असुराश्च', type: 'इतरेतर द्वंद्व', gloss: 'gods and demons' },

  // Specific Gītā compounds frequently encountered
  'अहम्-कार':    { vigraha: 'अहम् इति कारः', type: 'कर्मधारय', gloss: 'the "I-maker" — egoism, ego-sense' },
  'अनहंकार':     { vigraha: 'न अहंकारः', type: 'नञ् तत्पुरुष', gloss: 'absence of egoism' },
  'अनहंकृत':     { vigraha: 'न अहंकृतः', type: 'नञ् तत्पुरुष', gloss: 'free from egoism' },
  'आत्मवश्य':    { vigraha: 'आत्मना वश्यः', type: 'तृतीया तत्पुरुष', gloss: 'under one\'s own control / self-mastered' },
  'आत्मसम्यम':  { vigraha: 'आत्मनः संयमः', type: 'षष्ठी तत्पुरुष', gloss: 'self-restraint' },
  'आत्मसंस्थ':   { vigraha: 'आत्मनि संस्थः', type: 'सप्तमी तत्पुरुष', gloss: 'fixed in the self' },
  'आत्मरति':     { vigraha: 'आत्मनि रतिः', type: 'सप्तमी तत्पुरुष', gloss: 'delight in the self (BG 3.17)' },
  'आत्मतृप्त':    { vigraha: 'आत्मना तृप्तः', type: 'तृतीया तत्पुरुष', gloss: 'satisfied in/by the self (BG 3.17)' },
  'अहैतुक':     { vigraha: 'न हेतुः यस्य', type: 'बहुव्रीहि (नञ्)', gloss: 'unmotivated / causeless' },
  'अनपेक्ष':     { vigraha: 'न अपेक्षा यस्य', type: 'बहुव्रीहि (नञ्)', gloss: 'free from expectation' },
  'निर्ममः':     { vigraha: 'निर्गतं ममकारः यस्य', type: 'बहुव्रीहि', gloss: 'free from mine-ness / non-possessive' },
  'निरहंकार':    { vigraha: 'निर्गतः अहंकारः यस्य', type: 'बहुव्रीहि', gloss: 'free from egoism (BG 2.71, 12.13)' },
  'निराशी':       { vigraha: 'निर्गता आशीः यस्य', type: 'बहुव्रीहि', gloss: 'free from desire / expectation-less (BG 4.21, 6.10)' },
  'दुष्कृत':       { vigraha: 'दुष्ट कृतम्', type: 'गति समास', gloss: 'evil deed / evildoer' },
  'सुकृत':        { vigraha: 'सु कृतम्', type: 'गति समास', gloss: 'good deed / well-done' },
  'सर्व-धर्म':   { vigraha: 'सर्वे धर्माः', type: 'कर्मधारय', gloss: 'all dharmas' },
  'सर्व-कर्म':   { vigraha: 'सर्वाणि कर्माणि', type: 'कर्मधारय', gloss: 'all actions' },
  'सर्व-भूत':    { vigraha: 'सर्वाणि भूतानि', type: 'कर्मधारय', gloss: 'all beings' },
  'सर्व-भूत-स्थ':{ vigraha: 'सर्व-भूतेषु स्थितः', type: 'सप्तमी तत्पुरुष', gloss: 'situated in all beings' },
  'सर्व-गत':     { vigraha: 'सर्वत्र गतः', type: 'सप्तमी तत्पुरुष', gloss: 'all-pervading' },

  // Specific compound names + epithets for the Pandava conches in BG 1
  'पाञ्चजन्य':    { vigraha: 'पञ्चजनस्य संबन्धी', type: 'तद्धित-derivative', gloss: 'Pāñcajanya (Kṛṣṇa\'s conch)' },
  'देवदत्त':      { vigraha: 'देवैः दत्तः', type: 'तृतीया तत्पुरुष', gloss: 'Devadatta (Arjuna\'s conch — "given by the gods")' },
  'पौण्ड्र':      { vigraha: 'पुण्ड्र-देशस्य', type: 'तद्धित-derivative', gloss: 'Pauṇḍra (Bhīma\'s conch)' },
  'अनन्त-विजय':  { vigraha: 'अनन्तः विजयः', type: 'कर्मधारय', gloss: 'Anantavijaya (Yudhiṣṭhira\'s conch)' },
  'सुघोष':       { vigraha: 'शोभनः घोषः यस्य', type: 'बहुव्रीहि', gloss: 'Sughoṣa (Nakula\'s conch — "fine-sounding")' },
  'मणिपुष्पक':   { vigraha: 'मणयः पुष्पकाणि यस्य', type: 'बहुव्रीहि', gloss: 'Maṇipuṣpaka (Sahadeva\'s conch — "jeweled-flower")' },

  // Multi-element तत्पुरुष chains (each next member governs the previous in षष्ठी)
  'मृत्युसंसारसागर': { vigraha: 'मृत्योः संसारस्य सागरः', type: 'षष्ठी तत्पुरुष (chain)', gloss: 'the ocean of the saṃsāra (cycle of rebirth) of death — three nouns in successive षष्ठी' },
  'जन्मकर्मफलप्रद': { vigraha: 'जन्मनः कर्मणः फलं प्रददाति', type: 'उपपद तत्पुरुष', gloss: 'bestowing the fruit of birth-and-action' },

  // बहुव्रीहि variants for "whose mind/heart is X-ed in Y"
  'आवेशित-चेतस्': { vigraha: 'आवेशितं चेतः येषां ते', type: 'बहुव्रीहि', gloss: 'those whose minds are absorbed / entered into' },
  'अपहृत-चेतस्': { vigraha: 'अपहृतं चेतः येषां ते', type: 'बहुव्रीहि', gloss: 'those whose minds are stolen / carried away' },
  'युक्त-चेतस्':  { vigraha: 'युक्तं चेतः यस्य सः', type: 'बहुव्रीहि', gloss: 'one whose mind is yoked / disciplined' },
  'प्रसन्न-चेतस्': { vigraha: 'प्रसन्नं चेतः यस्य सः', type: 'बहुव्रीहि', gloss: 'one whose mind is clear / serene' },

  // ─────────────────────────────────────────────────────────────────────
  // High-frequency hyphenated DCS-style compounds — added in response to
  // user feedback that bare per-component listings ("desire + enjoyment +
  // meaning") were unhelpful for compounds that have a settled semantic.
  // Keys can be either the dehyphenated stem (कर्मयोग) or the hyphenated
  // surface stem (काम-भोग-अर्थ) with the case ending stripped.
  // ─────────────────────────────────────────────────────────────────────

  // -अर्थम् adverbial compounds — "for the sake of X"
  'काम-भोग-अर्थ': { vigraha: 'काम-भोगस्य अर्थम्', type: 'तत्पुरुष (कृत्यर्थ)', gloss: 'for the sake of sensual enjoyment' },
  'यज्ञ-अर्थ':    { vigraha: 'यज्ञस्य अर्थम्', type: 'तत्पुरुष (कृत्यर्थ)', gloss: 'for the sake of sacrifice (BG 3.9)' },
  'लोक-संग्रह':   { vigraha: 'लोकानां संग्रहः', type: 'षष्ठी तत्पुरुष', gloss: 'the holding-together of the world (BG 3.20, 3.25)' },

  // काम-* compounds
  'काम-भोग':     { vigraha: 'कामस्य भोगः', type: 'षष्ठी तत्पुरुष', gloss: 'enjoyment of sensual desire' },
  'काम-उपभोग':  { vigraha: 'कामस्य उपभोगः', type: 'षष्ठी तत्पुरुष', gloss: 'sensual enjoyment / indulgence in desire' },
  'काम-उपभोग-परम':  { vigraha: 'कामोपभोगः परमः यस्य सः', type: 'बहुव्रीहि (nested with षष्ठी तत्पुरुष)', gloss: 'whose supreme aim is the enjoyment of desire (BG 16.11)' },
  'काम-रूप':      { vigraha: 'कामस्य रूपम्', type: 'षष्ठी तत्पुरुष', gloss: 'in the form of desire (BG 3.43)' },
  'काम-क्रोध-उद्भव': { vigraha: 'काम-क्रोधाभ्यां उद्भवः यस्य', type: 'बहुव्रीहि', gloss: 'arising from desire and anger' },
  'काम-क्रोध-वियुक्त': { vigraha: 'काम-क्रोधाभ्यां वियुक्तः', type: 'तृतीया तत्पुरुष', gloss: 'free from desire and anger (BG 5.26)' },
  'काम-क्रोध-परायण': { vigraha: 'काम-क्रोधयोः परायणाः', type: 'बहुव्रीहि', gloss: 'devoted to desire and anger (BG 16.12)' },
  // BG 16.12 — the bondage-of-desire compounds. Both are तत्पुरुष chains
  // describing what binds the demoniac: the "hundreds of bonds of hope"
  // by which they are tied, and the "accumulations of wealth" they pursue.
  'आशा-पाश-शत':  { vigraha: 'आशा-पाशानां शतानि', type: 'षष्ठी तत्पुरुष (chain)', gloss: 'hundreds of bonds of desire (BG 16.12 — chain: आशा "desire/hope" → पाश "noose/bond" → शत "hundred"; the instrumental plural -ऐः on शत carries the case of the whole compound: "bound by hundreds of hope-nooses")' },
  'अर्थ-सञ्चय':   { vigraha: 'अर्थस्य सञ्चयः', type: 'षष्ठी तत्पुरुष', gloss: 'accumulation of wealth (BG 16.12)' },

  // मद्-* compounds (DCS uses मद् for "me/my" — first-person compound prefix)
  'मद्-भक्त':    { vigraha: 'मम भक्तः', type: 'षष्ठी तत्पुरुष', gloss: 'my devotee' },
  'मद्-भाव':     { vigraha: 'मम भावः', type: 'षष्ठी तत्पुरुष', gloss: 'my state of being / my nature' },
  'मद्-चित्त':    { vigraha: 'मयि चित्तं यस्य सः', type: 'बहुव्रीहि', gloss: 'one whose mind is on me' },
  'मद्-पर':      { vigraha: 'अहम् परः यस्य सः', type: 'बहुव्रीहि', gloss: 'one for whom I am the supreme [aim]' },
  'मद्-परम':    { vigraha: 'अहम् परमः यस्य सः', type: 'बहुव्रीहि', gloss: 'one whose supreme [aim] is me' },
  'मद्-स्थ':      { vigraha: 'मयि स्थितः', type: 'सप्तमी तत्पुरुष', gloss: 'situated in me' },
  'मद्-स्थान':   { vigraha: 'मम स्थानम्', type: 'षष्ठी तत्पुरुष', gloss: 'my abode' },
  'मद्-योग':     { vigraha: 'मया योगः', type: 'तृतीया तत्पुरुष', gloss: 'union with me' },
  'मद्-कर्म':    { vigraha: 'मम कर्म', type: 'षष्ठी तत्पुरुष', gloss: 'my work / action for my sake' },
  'मद्-कर्म-परम': { vigraha: 'मद्-कर्म परमं यस्य सः', type: 'बहुव्रीहि', gloss: 'one whose supreme [pursuit] is work for me (BG 12.10)' },
  'मद्-अर्थ':    { vigraha: 'मम अर्थम्', type: 'तत्पुरुष (कृत्यर्थ)', gloss: 'for my sake' },

  // सर्व-* compounds
  'सर्व-कर्माण':  { vigraha: 'सर्वाणि कर्माणि', type: 'कर्मधारय', gloss: 'all actions' },
  'सर्व-भूत':     { vigraha: 'सर्वाणि भूतानि', type: 'कर्मधारय', gloss: 'all beings' },
  'सर्व-भूत-हित':{ vigraha: 'सर्व-भूतानां हितम्', type: 'षष्ठी तत्पुरुष', gloss: 'the welfare of all beings' },
  'सर्व-भूत-स्थित':{ vigraha: 'सर्व-भूतेषु स्थितः', type: 'सप्तमी तत्पुरुष', gloss: 'situated in all beings' },
  'सर्व-भाव':    { vigraha: 'सर्वैः भावैः', type: 'तृतीया तत्पुरुष', gloss: 'with one\'s whole being / wholeheartedly' },
  'सर्व-धर्म':   { vigraha: 'सर्वान् धर्मान्', type: 'कर्मधारय', gloss: 'all dharmas (BG 18.66)' },
  'सर्व-पाप':    { vigraha: 'सर्वाणि पापानि', type: 'कर्मधारय', gloss: 'all sins' },
  'सर्व-योग':    { vigraha: 'सर्वैः योगैः', type: 'तृतीया तत्पुरुष', gloss: 'by all yogas' },

  // ज्ञान-* compounds
  'ज्ञान-चक्षुस्': { vigraha: 'ज्ञानम् एव चक्षुः', type: 'कर्मधारय', gloss: 'the eye of knowledge / knowledge as an eye' },
  'ज्ञान-यज्ञ':  { vigraha: 'ज्ञानेन यज्ञः', type: 'तृतीया तत्पुरुष', gloss: 'the sacrifice of knowledge (BG 4.33)' },
  'ज्ञान-अग्नि': { vigraha: 'ज्ञानम् एव अग्निः', type: 'कर्मधारय', gloss: 'the fire of knowledge (BG 4.37)' },
  'ज्ञान-दीप':   { vigraha: 'ज्ञानम् एव दीपः', type: 'कर्मधारय', gloss: 'the lamp of knowledge' },
  'ज्ञान-विज्ञान-तृप्त-आत्म': { vigraha: 'ज्ञान-विज्ञानाभ्यां तृप्तः आत्मा यस्य सः', type: 'बहुव्रीहि', gloss: 'one whose self is satisfied by knowledge and realization (BG 6.8)' },

  // ब्रह्म-* compounds
  'ब्रह्म-निर्वाण': { vigraha: 'ब्रह्मणि निर्वाणम्', type: 'सप्तमी तत्पुरुष', gloss: 'extinction-in-Brahman / liberation' },
  'ब्रह्म-योग':    { vigraha: 'ब्रह्मणा योगः', type: 'तृतीया तत्पुरुष', gloss: 'union with Brahman' },
  'ब्रह्म-भूत':    { vigraha: 'ब्रह्म भूतः', type: 'गति समास', gloss: 'become Brahman / one with Brahman (BG 5.24)' },
  'ब्रह्म-कर्म-समाधि': { vigraha: 'ब्रह्म-कर्मणि समाधिः यस्य', type: 'बहुव्रीहि', gloss: 'absorbed in the work-that-is-Brahman (BG 4.24)' },

  // योग-* compounds
  'योग-युक्त':    { vigraha: 'योगेन युक्तः', type: 'तृतीया तत्पुरुष', gloss: 'yoked in yoga' },
  'योग-क्षेम':    { vigraha: 'योगः च क्षेमश्च', type: 'इतरेतर द्वंद्व', gloss: 'acquisition and preservation' },
  'योग-संन्यस्त-कर्मन्': { vigraha: 'योगेन संन्यस्तानि कर्माणि येन', type: 'बहुव्रीहि', gloss: 'one who has renounced actions through yoga (BG 4.41)' },

  // वेद-/शास्त्र-* compounds
  'वेद-विद्':    { vigraha: 'वेदं वेद', type: 'उपपद तत्पुरुष', gloss: 'knower of the Veda' },
  'वेद-वाद-रत': { vigraha: 'वेद-वादे रताः', type: 'सप्तमी तत्पुरुष', gloss: 'attached to the disputations of the Veda (BG 2.42)' },
  'वेदान्त-कृत्': { vigraha: 'वेदान्तं करोति', type: 'उपपद तत्पुरुष', gloss: 'the author/cause of Vedānta (BG 15.15)' },
  'शास्त्र-विधि': { vigraha: 'शास्त्रस्य विधिः', type: 'षष्ठी तत्पुरुष', gloss: 'the injunction of scripture' },

  // -चेतस्/-मनस् बहुव्रीहि (mind-state compounds)
  'सम-दुःख-सुख': { vigraha: 'समे दुःख-सुखे यस्य सः', type: 'बहुव्रीहि', gloss: 'one to whom sorrow and joy are alike (BG 12.13)' },
  'सम-लोष्ट-अश्म-काञ्चन': { vigraha: 'समाः लोष्ट-अश्म-काञ्चनानि यस्य सः', type: 'बहुव्रीहि (chain)', gloss: 'one to whom a clod, a stone, and gold are equal (BG 6.8)' },
  'समबुद्धि':     { vigraha: 'समा बुद्धिः यस्य सः', type: 'बहुव्रीहि', gloss: 'one whose intellect is balanced' },
  'विशुद्ध-आत्म': { vigraha: 'विशुद्धः आत्मा यस्य सः', type: 'बहुव्रीहि', gloss: 'one whose self is purified' },
  'विजित-आत्म':  { vigraha: 'विजितः आत्मा यस्य सः', type: 'बहुव्रीहि', gloss: 'one whose self is conquered (self-mastered)' },
  'यत-आत्म':     { vigraha: 'यतः आत्मा यस्य सः', type: 'बहुव्रीहि', gloss: 'one whose self is restrained' },

  // Vocatives / epithets of Arjuna and Kṛṣṇa
  'महा-बाहु':   { vigraha: 'महान्तौ बाहू यस्य सः', type: 'बहुव्रीहि', gloss: 'O mighty-armed one (Arjuna epithet)' },
  'भरत-ऋषभ':   { vigraha: 'भरतानाम् ऋषभः', type: 'षष्ठी तत्पुरुष', gloss: 'O bull among the Bhāratas (Arjuna)' },
  'कुरु-नन्दन':  { vigraha: 'कुरूणां नन्दनः', type: 'षष्ठी तत्पुरुष', gloss: 'O delight of the Kurus (Arjuna)' },
  'भरत-श्रेष्ठ':  { vigraha: 'भरतेषु श्रेष्ठः', type: 'सप्तमी तत्पुरुष', gloss: 'O best of the Bhāratas' },
  'कुरु-श्रेष्ठ': { vigraha: 'कुरुषु श्रेष्ठः', type: 'सप्तमी तत्पुरुष', gloss: 'O best of the Kurus' },
  'पुरुष-व्याघ्र': { vigraha: 'पुरुषेषु व्याघ्रः', type: 'सप्तमी तत्पुरुष', gloss: 'O tiger among men' },
  'पुरुष-ऋषभ':  { vigraha: 'पुरुषेषु ऋषभः', type: 'सप्तमी तत्पुरुष', gloss: 'O bull among men' },
  'मधुसूदन':    { vigraha: 'मधुं सूदितवान्', type: 'उपपद तत्पुरुष', gloss: 'slayer of Madhu (Kṛṣṇa epithet)' },
  'अरि-सूदन':   { vigraha: 'अरीन् सूदितवान्', type: 'उपपद तत्पुरुष', gloss: 'slayer of foes (Kṛṣṇa epithet)' },

  // Specific contextual compounds
  'इन्द्रिय-अर्थ': { vigraha: 'इन्द्रियाणाम् अर्थाः', type: 'षष्ठी तत्पुरुष', gloss: 'sense-objects' },
  'इन्द्रिय-ग्राम': { vigraha: 'इन्द्रियाणां ग्रामः', type: 'षष्ठी तत्पुरुष', gloss: 'the collection of senses' },
  'मान-अवमान':  { vigraha: 'मानः च अवमानः च', type: 'इतरेतर द्वंद्व', gloss: 'honour and dishonour' },
  'प्रयाण-काल':  { vigraha: 'प्रयाणस्य कालः', type: 'षष्ठी तत्पुरुष', gloss: 'the time of departure (death)' },
  'स्वभाव-ज':   { vigraha: 'स्वभावेन जातः', type: 'तृतीया तत्पुरुष', gloss: 'born of one\'s own nature' },
  'जीव-भूत':    { vigraha: 'जीव-भूतः अंशः', type: 'कर्मधारय', gloss: 'the living portion / the soul-form (BG 15.7)' },
  'ज्ञान-चक्षुष्':{ vigraha: 'ज्ञानम् एव चक्षुः येषाम्', type: 'बहुव्रीहि', gloss: 'those whose eye is knowledge (BG 13.35)' },
  'दुःख-संयोग-वियोग': { vigraha: 'दुःख-संयोगस्य वियोगः', type: 'षष्ठी तत्पुरुष', gloss: 'disjoining from the conjunction with sorrow (BG 6.23)' },
  'सिद्धि-असिद्धि': { vigraha: 'सिद्धिः च असिद्धिः च', type: 'इतरेतर द्वंद्व', gloss: 'success and failure' },
  'पर-धर्म':    { vigraha: 'परस्य धर्मः', type: 'षष्ठी तत्पुरुष', gloss: 'another\'s dharma' },
  'स्व-धर्म':    { vigraha: 'स्वस्य धर्मः', type: 'षष्ठी तत्पुरुष', gloss: 'one\'s own dharma' },
  'स्व-जन':     { vigraha: 'स्वस्य जनाः', type: 'षष्ठी तत्पुरुष', gloss: 'one\'s own people / kinsmen' },
  'आश्चर्य-वत्': { vigraha: 'आश्चर्येण तुल्यम्', type: 'तत्पुरुष (वतिः)', gloss: 'as if a marvel (BG 2.29)' },
  'नित्य-युक्त': { vigraha: 'नित्यं युक्तः', type: 'गति समास', gloss: 'always united / always yoked' },
  'युक्त-स्वप्न-अवबोध': { vigraha: 'युक्तौ स्वप्न-अवबोधौ यस्य', type: 'बहुव्रीहि', gloss: 'one whose sleep and waking are disciplined (BG 6.17)' },
  'युक्त-आहार-विहार': { vigraha: 'युक्तौ आहार-विहारौ यस्य', type: 'बहुव्रीहि', gloss: 'one whose food and recreation are disciplined (BG 6.17)' },

  // ─────────────────────────────────────────────────────────────────────
  // Batch 2 (2026-05-12): Extracted via scripts/extract-unknown-compounds.mjs
  // covering all multi-occurrence compounds + high-recurrence stem families.
  // ─────────────────────────────────────────────────────────────────────

  // महा-* (great-X)
  'महा-बाह':       { vigraha: 'महान्तौ बाहू यस्य सः', type: 'बहुव्रीहि', gloss: 'O mighty-armed one' },
  'महा-ऋषि':       { vigraha: 'महान्तः ऋषयः', type: 'कर्मधारय', gloss: 'the great sages' },
  'महा-रथ':        { vigraha: 'महान्तः रथाः येषाम् ते', type: 'बहुव्रीहि', gloss: 'great chariot-warriors' },
  'महा-योगिन्':    { vigraha: 'महान् योगी', type: 'कर्मधारय', gloss: 'great yogi' },
  'महा-भूत':       { vigraha: 'महान्ति भूतानि', type: 'कर्मधारय', gloss: 'the great elements (earth/water/fire/air/space)' },
  'महा-पाप':       { vigraha: 'महान्ति पापानि', type: 'कर्मधारय', gloss: 'great sins' },
  'महा-राज':       { vigraha: 'महान् राजा', type: 'कर्मधारय', gloss: 'great king' },
  'महा-कर्मन्':    { vigraha: 'महत् कर्म', type: 'कर्मधारय', gloss: 'great deed' },
  'महा-आत्मन्':    { vigraha: 'महान् आत्मा यस्य सः', type: 'बहुव्रीहि', gloss: 'great-souled' },

  // सर्व-* (all-X)
  'सर्व-भूत':       { vigraha: 'सर्वाणि भूतानि', type: 'कर्मधारय', gloss: 'all beings' },
  'सर्व-भूतान':     { vigraha: 'सर्वाणि भूतानि', type: 'कर्मधारय', gloss: 'all beings' },
  'सर्व-भूत-स्थित': { vigraha: 'सर्व-भूतेषु स्थितः', type: 'सप्तमी तत्पुरुष', gloss: 'situated in all beings' },
  'सर्व-कर्म-फल-त्याग': { vigraha: 'सर्व-कर्मणां फलस्य त्यागः', type: 'षष्ठी तत्पुरुष (chain)', gloss: 'renunciation of the fruit of all action' },
  'सर्व-आरम्भ-परित्यागिन्': { vigraha: 'सर्वान् आरम्भान् परित्यजति यः', type: 'बहुव्रीहि', gloss: 'one who renounces all undertakings (BG 12.16)' },
  'सर्व-कर्म-फल': { vigraha: 'सर्वेषां कर्मणां फलम्', type: 'षष्ठी तत्पुरुष', gloss: 'the fruit of all action' },
  'सर्व-संकल्प-संन्यासिन्': { vigraha: 'सर्वान् संकल्पान् संन्यस्यति यः', type: 'बहुव्रीहि', gloss: 'one who renounces all volition (BG 6.4)' },
  'सर्व-इन्द्रिय': { vigraha: 'सर्वाणि इन्द्रियाणि', type: 'कर्मधारय', gloss: 'all the senses' },
  'सर्व-गुह्य-तम': { vigraha: 'सर्वेषु गुह्येषु गुह्यतमम्', type: 'सप्तमी तत्पुरुष', gloss: 'most secret of all secrets' },
  'सर्व-लोक-महेश्वर': { vigraha: 'सर्वलोकानां महेश्वरः', type: 'षष्ठी तत्पुरुष', gloss: 'great lord of all worlds' },
  'सर्व-दुःख': { vigraha: 'सर्वाणि दुःखानि', type: 'कर्मधारय', gloss: 'all sorrows' },
  'सर्व-यज्ञ': { vigraha: 'सर्वे यज्ञाः', type: 'कर्मधारय', gloss: 'all sacrifices' },
  'सर्व-तपस्': { vigraha: 'सर्वाणि तपांसि', type: 'कर्मधारय', gloss: 'all austerities' },
  'सर्व-शास्त्र': { vigraha: 'सर्वाणि शास्त्राणि', type: 'कर्मधारय', gloss: 'all scriptures' },
  'सर्व-भयानक': { vigraha: 'सर्वेभ्यः भयानकः', type: 'पञ्चमी तत्पुरुष', gloss: 'most terrible of all' },

  // मद्-* / त्वद्-* (my-X / your-X)
  'मद्-प्रसाद':    { vigraha: 'मम प्रसादः', type: 'षष्ठी तत्पुरुष', gloss: 'my grace' },
  'मद्-मनस्':      { vigraha: 'मयि मनः यस्य', type: 'बहुव्रीहि', gloss: 'one whose mind is on me' },
  'मद्-याजिन्':    { vigraha: 'मां यजति यः', type: 'उपपद तत्पुरुष', gloss: 'my sacrificer / one who worships me' },
  'मद्-गत':        { vigraha: 'माम् गतः', type: 'द्वितीया तत्पुरुष', gloss: 'gone to me / merged in me' },
  'मद्-व्यपाश्रय': { vigraha: 'माम् व्यपाश्रितः', type: 'उपपद तत्पुरुष', gloss: 'taking refuge in me' },
  'मद्-आश्रय':     { vigraha: 'माम् आश्रितः', type: 'द्वितीया तत्पुरुष', gloss: 'taking refuge in me' },
  'मद्-योग':       { vigraha: 'मया योगः', type: 'तृतीया तत्पुरुष', gloss: 'union with me' },
  'मद्-अनुग्रह':   { vigraha: 'मम अनुग्रहः', type: 'षष्ठी तत्पुरुष', gloss: 'my grace / favour' },
  'मद्-समुद्भव':   { vigraha: 'मद् समुद्भवः', type: 'पञ्चमी तत्पुरुष', gloss: 'arising from me' },
  'मद्-धाम':       { vigraha: 'मम धाम', type: 'षष्ठी तत्पुरुष', gloss: 'my abode' },
  'मद्-भूत':       { vigraha: 'मद्-समानः भूतः', type: 'कर्मधारय', gloss: 'become like me (BG 14.19)' },
  'त्वद्-अन्य':    { vigraha: 'त्वत्तः अन्यः', type: 'पञ्चमी तत्पुरुष', gloss: 'other than you' },

  // कुल-* (family) — Arjuna's anguish in BG 1
  'कुल-क्षय':      { vigraha: 'कुलस्य क्षयः', type: 'षष्ठी तत्पुरुष', gloss: 'destruction of the family' },
  'कुल-क्षय-कृत':  { vigraha: 'कुलस्य क्षयं करोति यः', type: 'उपपद तत्पुरुष', gloss: 'doer of family-destruction (BG 1.38)' },
  'कुल-घ्न':       { vigraha: 'कुलं हन्ति यः', type: 'उपपद तत्पुरुष', gloss: 'destroyer of the family' },
  'कुल-धर्म':     { vigraha: 'कुलस्य धर्मः', type: 'षष्ठी तत्पुरुष', gloss: 'duty/dharma of the family' },
  'कुल-स्त्री':    { vigraha: 'कुलस्य स्त्रियः', type: 'षष्ठी तत्पुरुष', gloss: 'women of the family' },
  'कुल-क्षेत्र':  { vigraha: 'कुलस्य क्षेत्रम्', type: 'षष्ठी तत्पुरुष', gloss: 'the family field/lineage' },

  // आत्म-* / आत्मन्-* compounds (DCS uses both forms for "self")
  'आत्म-विनिग्रह': { vigraha: 'आत्मनः विनिग्रहः', type: 'षष्ठी तत्पुरुष', gloss: 'restraint of the self / self-control' },
  'आत्म-विभूति':   { vigraha: 'आत्मनः विभूतयः', type: 'षष्ठी तत्पुरुष', gloss: 'manifestations of the self (Kṛṣṇa\'s divine glories)' },
  'आत्म-संयम':     { vigraha: 'आत्मनः संयमः', type: 'षष्ठी तत्पुरुष', gloss: 'self-restraint' },
  'आत्म-ज्ञान':    { vigraha: 'आत्मनः ज्ञानम्', type: 'षष्ठी तत्पुरुष', gloss: 'knowledge of the self' },
  'आत्म-काम':     { vigraha: 'आत्मनि कामः यस्य', type: 'बहुव्रीहि', gloss: 'one whose love/desire is for the self' },
  'आत्म-शुद्धि':  { vigraha: 'आत्मनः शुद्धिः', type: 'षष्ठी तत्पुरुष', gloss: 'purification of the self' },
  'आत्म-दर्शन':   { vigraha: 'आत्मनः दर्शनम्', type: 'षष्ठी तत्पुरुष', gloss: 'vision of the self' },
  'आत्म-संस्थ':    { vigraha: 'आत्मनि संस्थः', type: 'सप्तमी तत्पुरुष', gloss: 'fixed in the self' },
  'आत्म-वत्':      { vigraha: 'आत्मना तुल्यम्', type: 'तत्पुरुष (वतिः)', gloss: 'like one\'s self' },
  'आत्म-योग':     { vigraha: 'आत्मना योगः', type: 'तृतीया तत्पुरुष', gloss: 'union with/through the self' },

  // ज्ञान-* / विज्ञान-*
  'ज्ञान-यज्ञ':    { vigraha: 'ज्ञानेन यज्ञः', type: 'तृतीया तत्पुरुष', gloss: 'sacrifice of knowledge' },
  'ज्ञान-अग्नि':   { vigraha: 'ज्ञानम् एव अग्निः', type: 'कर्मधारय', gloss: 'the fire of knowledge' },
  'ज्ञान-चक्षुस्': { vigraha: 'ज्ञानम् एव चक्षुः', type: 'कर्मधारय', gloss: 'the eye of knowledge' },
  'ज्ञान-वैराग्य': { vigraha: 'ज्ञानेन वैराग्यम्', type: 'तृतीया तत्पुरुष', gloss: 'dispassion through knowledge' },
  'ज्ञान-दीपित':   { vigraha: 'ज्ञानेन दीपितः', type: 'तृतीया तत्पुरुष', gloss: 'illuminated by knowledge' },
  'विज्ञान-सहित':  { vigraha: 'विज्ञानेन सहितम्', type: 'तृतीया तत्पुरुष', gloss: 'accompanied by realization' },
  'अज्ञान-ज':     { vigraha: 'अज्ञानात् जातः', type: 'पञ्चमी तत्पुरुष', gloss: 'born of ignorance' },
  'अज्ञान-संमोह':  { vigraha: 'अज्ञानेन संमोहः', type: 'तृतीया तत्पुरुष', gloss: 'delusion due to ignorance' },

  // यज्ञ-/दान-/तपस्-* (sacrifice/giving/austerity — पुण्य triad)
  'यज्ञ-दान-तपस्-कर्मन्': { vigraha: 'यज्ञ-दान-तपसां कर्म', type: 'षष्ठी तत्पुरुष (chain)', gloss: 'the act of sacrifice, giving, and austerity' },
  'यज्ञ-दान-तपस्': { vigraha: 'यज्ञः च दानं च तपः च', type: 'समाहार द्वंद्व', gloss: 'sacrifice, giving, and austerity (BG 18.5)' },
  'यज्ञ-शिष्ट':    { vigraha: 'यज्ञात् शिष्टम्', type: 'पञ्चमी तत्पुरुष', gloss: 'what is left over from sacrifice' },
  'यज्ञ-अर्थ':     { vigraha: 'यज्ञस्य अर्थम्', type: 'तत्पुरुष (कृत्यर्थ)', gloss: 'for the sake of sacrifice' },
  'यज्ञ-शिष्ट-आशिन्': { vigraha: 'यज्ञ-शिष्टम् अश्नाति यः', type: 'उपपद तत्पुरुष', gloss: 'eater of sacrificial remnants' },
  'दान-क्रिया':    { vigraha: 'दानस्य क्रिया', type: 'षष्ठी तत्पुरुष', gloss: 'the act of giving' },
  'तपस्-कर्मन्':   { vigraha: 'तपसः कर्म', type: 'षष्ठी तत्पुरुष', gloss: 'the act of austerity' },

  // काम-/क्रोध-/लोभ-* (gates of hell — BG 16.21)
  'काम-क्रोध-लोभ': { vigraha: 'कामः च क्रोधः च लोभः च', type: 'इतरेतर द्वंद्व', gloss: 'desire, anger, and greed (the three gates of hell)' },
  'काम-क्रोध':    { vigraha: 'कामः च क्रोधः च', type: 'इतरेतर द्वंद्व', gloss: 'desire and anger' },
  'काम-राग-बल':   { vigraha: 'कामस्य रागस्य बलम्', type: 'षष्ठी तत्पुरुष', gloss: 'the force of lust-passion' },
  'काम-राग-विवर्जित': { vigraha: 'काम-रागाभ्यां विवर्जितः', type: 'तृतीया तत्पुरुष', gloss: 'free from desire and passion' },
  'काम-आत्मन्':   { vigraha: 'कामे आत्मा यस्य', type: 'बहुव्रीहि', gloss: 'one whose self is in desire' },

  // विगत-* (one whose X has departed)
  'विगत-स्पृह':   { vigraha: 'विगता स्पृहा यस्य', type: 'बहुव्रीहि', gloss: 'one whose longing has departed' },
  'विगत-भी':       { vigraha: 'विगता भीः यस्य', type: 'बहुव्रीहि', gloss: 'one whose fear has gone' },
  'विगत-ज्वर':    { vigraha: 'विगतः ज्वरः यस्य', type: 'बहुव्रीहि', gloss: 'one whose fever has gone' },
  'विगत-इच्छा-भय-क्रोध': { vigraha: 'विगताः इच्छा-भय-क्रोधाः यस्य', type: 'बहुव्रीहि', gloss: 'one whose desire, fear, and anger have gone' },

  // -आगम (arrival, especially of day/night)
  'अहर्-आगम':     { vigraha: 'अह्नः आगमः', type: 'षष्ठी तत्पुरुष', gloss: 'the coming of day' },
  'रात्रि-आगम':   { vigraha: 'रात्रेः आगमः', type: 'षष्ठी तत्पुरुष', gloss: 'the coming of night' },
  'अन्त-काल':     { vigraha: 'अन्तस्य कालः', type: 'षष्ठी तत्पुरुष', gloss: 'the time of the end (death)' },

  // प्रकृति-* (nature)
  'प्रकृति-ज':    { vigraha: 'प्रकृतेः जातः', type: 'पञ्चमी तत्पुरुष', gloss: 'born of nature / arising from prakṛti' },
  'प्रकृति-स्थ':  { vigraha: 'प्रकृतौ स्थितः', type: 'सप्तमी तत्पुरुष', gloss: 'situated in prakṛti' },
  'प्रकृति-संभव': { vigraha: 'प्रकृतेः संभवः', type: 'षष्ठी तत्पुरुष', gloss: 'arising from prakṛti' },
  'प्रकृति-जैः':  { vigraha: 'प्रकृतौ जातैः', type: 'सप्तमी तत्पुरुष', gloss: 'by those born of prakṛti' },

  // -ज (born of), -भव (arising from), -संभव (origin from)
  'अज्ञान-संभव':  { vigraha: 'अज्ञानात् संभवः', type: 'पञ्चमी तत्पुरुष', gloss: 'arising from ignorance' },
  'देह-ज':        { vigraha: 'देहात् जातः', type: 'पञ्चमी तत्पुरुष', gloss: 'born of the body' },
  'स्वभाव-ज':     { vigraha: 'स्वभावात् जातः', type: 'पञ्चमी तत्पुरुष', gloss: 'born of one\'s own nature' },
  'जल-ज':        { vigraha: 'जलात् जातः', type: 'पञ्चमी तत्पुरुष', gloss: 'water-born (lotus)' },
  'दुःख-योनि':    { vigraha: 'दुःखस्य योनिः', type: 'षष्ठी तत्पुरुष', gloss: 'source of sorrow' },

  // बुद्धि-* (intellect)
  'बुद्धि-योग':   { vigraha: 'बुद्ध्या योगः', type: 'तृतीया तत्पुरुष', gloss: 'yoga of intellect' },
  'बुद्धि-नाश':   { vigraha: 'बुद्धेः नाशः', type: 'षष्ठी तत्पुरुष', gloss: 'destruction of intellect' },
  'बुद्धि-भेद':   { vigraha: 'बुद्धेः भेदः', type: 'षष्ठी तत्पुरुष', gloss: 'confusion of intellect' },
  'बुद्धि-संयोग': { vigraha: 'बुद्ध्या संयोगः', type: 'तृतीया तत्पुरुष', gloss: 'union with intellect / previous-life intellect' },

  // कर्म-* (action)
  'कर्म-योग':     { vigraha: 'कर्मणि योगः', type: 'सप्तमी तत्पुरुष', gloss: 'yoga of action' },
  'कर्म-फल':     { vigraha: 'कर्मणः फलम्', type: 'षष्ठी तत्पुरुष', gloss: 'fruit of action' },
  'कर्म-फल-त्याग': { vigraha: 'कर्म-फलस्य त्यागः', type: 'षष्ठी तत्पुरुष', gloss: 'renunciation of the fruit of action' },
  'कर्म-संग':     { vigraha: 'कर्मणि संगः', type: 'सप्तमी तत्पुरुष', gloss: 'attachment to action' },
  'कर्म-बन्ध':    { vigraha: 'कर्मणः बन्धः', type: 'षष्ठी तत्पुरुष', gloss: 'the bondage of action' },
  'कर्म-संन्यास': { vigraha: 'कर्मणः संन्यासः', type: 'षष्ठी तत्पुरुष', gloss: 'renunciation of action' },
  'कर्म-इन्द्रिय': { vigraha: 'कर्मणाम् इन्द्रियाणि', type: 'षष्ठी तत्पुरुष', gloss: 'organs of action' },
  'पुण्य-कर्मन्': { vigraha: 'पुण्यानि कर्माणि', type: 'कर्मधारय', gloss: 'meritorious deeds' },

  // विशिष्ट epithets
  'भरत-सत्तम':  { vigraha: 'भरतेषु सत्तमः', type: 'सप्तमी तत्पुरुष', gloss: 'O best of the Bhāratas' },
  'भरत-ऋषभ':    { vigraha: 'भरतानाम् ऋषभः', type: 'षष्ठी तत्पुरुष', gloss: 'O bull among the Bhāratas' },
  'कुरु-नन्दन':  { vigraha: 'कुरूणां नन्दनः', type: 'षष्ठी तत्पुरुष', gloss: 'O delight of the Kurus' },
  'कुरु-सत्तम':  { vigraha: 'कुरुषु सत्तमः', type: 'सप्तमी तत्पुरुष', gloss: 'O best of the Kurus' },
  'पुरुष-व्याघ्र': { vigraha: 'पुरुषेषु व्याघ्रः', type: 'सप्तमी तत्पुरुष', gloss: 'O tiger among men' },
  'पुरुष-ऋषभ':   { vigraha: 'पुरुषेषु ऋषभः', type: 'सप्तमी तत्पुरुष', gloss: 'O bull among men' },
  'भरत-श्रेष्ठ': { vigraha: 'भरतेषु श्रेष्ठः', type: 'सप्तमी तत्पुरुष', gloss: 'O best of the Bhāratas' },
  'धनुर्-धर':    { vigraha: 'धनुः धरति यः', type: 'उपपद तत्पुरुष', gloss: 'wielder of the bow' },

  // विशेष nominal compounds frequently appearing
  'अमृत-उपम':    { vigraha: 'अमृतेन तुल्यम्', type: 'तत्पुरुष (वतिः)', gloss: 'like nectar' },
  'अर्पित-मनस्-बुद्धि': { vigraha: 'अर्पिते मनः-बुद्धी यस्य', type: 'बहुव्रीहि', gloss: 'one whose mind and intellect are offered (to me)' },
  'अन्य-देवता':   { vigraha: 'अन्याः देवताः', type: 'कर्मधारय', gloss: 'other gods' },
  'तत्त्व-विद्':  { vigraha: 'तत्त्वं वेद यः', type: 'उपपद तत्पुरुष', gloss: 'knower of the truth' },
  'क्षेत्र-क्षेत्रज्ञ': { vigraha: 'क्षेत्रं च क्षेत्रज्ञः च', type: 'इतरेतर द्वंद्व', gloss: 'the field and the knower-of-the-field' },
  'दंष्ट्र-कराल':  { vigraha: 'करालाः दंष्ट्राः येषाम्', type: 'बहुव्रीहि', gloss: 'with fearsome fangs' },
  'पर-धर्म':     { vigraha: 'परस्य धर्मः', type: 'षष्ठी तत्पुरुष', gloss: 'another\'s dharma' },
  'फल-आकाङ्क्षिन्': { vigraha: 'फलम् आकाङ्क्षति यः', type: 'उपपद तत्पुरुष', gloss: 'one who desires the fruit' },
  'ब्रह्म-अग्नि': { vigraha: 'ब्रह्म एव अग्निः', type: 'कर्मधारय', gloss: 'the fire of Brahman' },
  'ब्रह्म-भूय':   { vigraha: 'ब्रह्मणः भावः', type: 'षष्ठी तत्पुरुष', gloss: 'becoming Brahman' },
  'भूत-ग्राम':    { vigraha: 'भूतानां ग्रामः', type: 'षष्ठी तत्पुरुष', gloss: 'the multitude of beings' },
  'मुक्त-संग':    { vigraha: 'मुक्तः संगः यस्य', type: 'बहुव्रीहि', gloss: 'one whose attachment is released' },
  'यत-चित्त-आत्मन्': { vigraha: 'यतौ चित्त-आत्मानौ यस्य', type: 'बहुव्रीहि', gloss: 'one whose mind and self are restrained' },
  'लोक-संग्रह':   { vigraha: 'लोकानां संग्रहः', type: 'षष्ठी तत्पुरुष', gloss: 'maintenance of the world (BG 3.20)' },
  'व्यवसाय-आत्मक': { vigraha: 'व्यवसाये आत्मा यस्य', type: 'बहुव्रीहि', gloss: 'one whose self/essence is in determination' },
  'शब्द-आदि':    { vigraha: 'शब्दः आदिः येषाम्', type: 'बहुव्रीहि', gloss: '(the sense-objects) beginning with sound' },
  'शरीर-स्थ':    { vigraha: 'शरीरे स्थितः', type: 'सप्तमी तत्पुरुष', gloss: 'situated in the body' },
  'षष्-मास':     { vigraha: 'षट् मासाः', type: 'द्विगु', gloss: 'six months' },
  'समृद्ध-वेग':   { vigraha: 'समृद्धः वेगः येषाम्', type: 'बहुव्रीहि', gloss: 'with abounding speed (BG 11.29)' },
  'सर्व-भाव':    { vigraha: 'सर्वैः भावैः', type: 'तृतीया तत्पुरुष', gloss: 'with one\'s whole being' },
  'सिद्धि-असिद्धि': { vigraha: 'सिद्धिः च असिद्धिः च', type: 'इतरेतर द्वंद्व', gloss: 'success and failure' },
  'सत्त्व-संशुद्धि': { vigraha: 'सत्त्वस्य संशुद्धिः', type: 'षष्ठी तत्पुरुष', gloss: 'purification of one\'s being' },
  'इन्द्रिय-अर्थ': { vigraha: 'इन्द्रियाणाम् अर्थाः', type: 'षष्ठी तत्पुरुष', gloss: 'sense-objects' },
  'इन्द्रिय-ग्राम': { vigraha: 'इन्द्रियाणां ग्रामः', type: 'षष्ठी तत्पुरुष', gloss: 'the collection of senses' },
  'उदासीन-वत्':  { vigraha: 'उदासीनेन तुल्यम्', type: 'तत्पुरुष (वतिः)', gloss: 'as if indifferent' },
};
