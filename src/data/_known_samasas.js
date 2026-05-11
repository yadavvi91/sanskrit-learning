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
};
