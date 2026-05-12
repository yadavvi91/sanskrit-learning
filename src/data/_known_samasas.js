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

  // ─────────────────────────────────────────────────────────────────────
  // Batch 3: top stem-family compounds (~150 entries) covering सर्व-,
  // कर्म-, गुण-, योग-, भूत-, ज्ञान-, तद्-, आत्म-, ब्रह्म-, यज्ञ-, यत-,
  // काम-, देव-, बहु-, अनन्त-, अनेक-, अध्यात्म-, अव्यक्त-, अन्य-, एक-,
  // अर्थ-, धर्म- families.
  // ─────────────────────────────────────────────────────────────────────

  'सर्व-अर्थ':   { vigraha: 'सर्वान् अर्थान्', type: 'कर्मधारय', gloss: 'all objects/purposes' },
  'सर्व-आरम्भ': { vigraha: 'सर्वे आरम्भाः', type: 'कर्मधारय', gloss: 'all undertakings' },
  'सर्व-आश्चर्य-मय': { vigraha: 'सर्व-आश्चर्यैः पूर्णम्', type: 'तत्पुरुष (मयट्)', gloss: 'full of all marvels (BG 11.11)' },
  'सर्व-इन्द्रिय-गुण-आभास': { vigraha: 'सर्व-इन्द्रियाणां गुण-आभासः', type: 'षष्ठी तत्पुरुष (chain)', gloss: 'reflecting the qualities of all senses (BG 13.14)' },
  'सर्व-इन्द्रिय-विवर्जित': { vigraha: 'सर्व-इन्द्रियैः विवर्जितम्', type: 'तृतीया तत्पुरुष', gloss: 'free from all senses (BG 13.14)' },
  'सर्व-कर्म-संन्यास': { vigraha: 'सर्वेषां कर्मणां संन्यासः', type: 'षष्ठी तत्पुरुष', gloss: 'renunciation of all action' },
  'सर्व-कर्म-फल-त्यागिन्': { vigraha: 'सर्व-कर्म-फलं त्यजति यः', type: 'उपपद तत्पुरुष', gloss: 'one who renounces the fruit of all action (BG 12.11)' },
  'सर्व-कर्म-कृत्': { vigraha: 'सर्वाणि कर्माणि करोति यः', type: 'उपपद तत्पुरुष', gloss: 'doer of all actions' },
  'सर्व-गुह्य-तम': { vigraha: 'सर्वेषु गुह्येषु तममम्', type: 'सप्तमी तत्पुरुष', gloss: 'most secret of all secrets' },
  'सर्व-ज्ञान-विमूढ': { vigraha: 'सर्व-ज्ञानेषु विमूढः', type: 'सप्तमी तत्पुरुष', gloss: 'deluded in all knowledge (BG 3.32)' },
  'सर्व-त्यागिन्': { vigraha: 'सर्वं त्यजति यः', type: 'उपपद तत्पुरुष', gloss: 'one who renounces everything' },
  'सर्व-द्वार': { vigraha: 'सर्वाणि द्वाराणि', type: 'कर्मधारय', gloss: 'all the gates' },
  'सर्व-द्वार-संयम': { vigraha: 'सर्व-द्वाराणां संयमः', type: 'षष्ठी तत्पुरुष', gloss: 'restraint of all the gates (BG 8.12)' },
  'सर्व-पाप-प्रमोचन': { vigraha: 'सर्व-पापेभ्यः प्रमोचनम्', type: 'पञ्चमी तत्पुरुष', gloss: 'liberation from all sins' },
  'सर्व-भूत-आत्म-भूत-आत्मन्': { vigraha: 'सर्व-भूतानां आत्म-भूतः आत्मा यस्य', type: 'बहुव्रीहि (chain)', gloss: 'one whose self is identified with the self of all beings (BG 5.7)' },
  'सर्व-भूत-स्थ-आत्मन्': { vigraha: 'सर्व-भूतेषु स्थितः आत्मा यस्य', type: 'बहुव्रीहि', gloss: 'one whose self is established in all beings (BG 5.7)' },
  'सर्व-भूत-हृद्': { vigraha: 'सर्व-भूतानां हृदयम्', type: 'षष्ठी तत्पुरुष', gloss: 'the heart of all beings' },
  'सर्व-वित्': { vigraha: 'सर्वं वेद यः', type: 'उपपद तत्पुरुष', gloss: 'omniscient / knower of all' },
  'सर्व-समः': { vigraha: 'सर्वेषु समः', type: 'सप्तमी तत्पुरुष', gloss: 'equal to all' },
  'सर्व-संग': { vigraha: 'सर्वे संगाः', type: 'कर्मधारय', gloss: 'all attachments' },
  'सर्व-समुद्भव': { vigraha: 'सर्वस्य समुद्भवः', type: 'षष्ठी तत्पुरुष', gloss: 'the origin of all (BG 10.8)' },
  'सर्व-हर': { vigraha: 'सर्वं हरति यः', type: 'उपपद तत्पुरुष', gloss: 'all-stealing (death)' },

  'कर्म-अनुबन्धिन्': { vigraha: 'कर्मणा अनुबद्धः', type: 'तृतीया तत्पुरुष', gloss: 'bound by action' },
  'कर्म-कृत्': { vigraha: 'कर्म करोति यः', type: 'उपपद तत्पुरुष', gloss: 'doer of action' },
  'कर्म-चोदना': { vigraha: 'कर्मणि चोदना', type: 'सप्तमी तत्पुरुष', gloss: 'the impulse to action (BG 18.18)' },
  'कर्म-ज': { vigraha: 'कर्मणः जातः', type: 'पञ्चमी तत्पुरुष', gloss: 'born of action' },
  'कर्म-निबन्धन': { vigraha: 'कर्मणा निबन्धनम्', type: 'तृतीया तत्पुरुष', gloss: 'binding through action' },
  'कर्म-फल-त्यागिन्': { vigraha: 'कर्म-फलं त्यजति यः', type: 'उपपद तत्पुरुष', gloss: 'renouncer of the fruit of action (BG 18.11)' },
  'कर्म-फल-संयोग': { vigraha: 'कर्म-फलैः संयोगः', type: 'तृतीया तत्पुरुष', gloss: 'union with the fruits of action' },
  'कर्म-फल-हेतु': { vigraha: 'कर्म-फलस्य हेतुः', type: 'षष्ठी तत्पुरुष', gloss: 'motivated by the fruit of action (BG 2.47)' },
  'कर्म-संगिन्': { vigraha: 'कर्मणि संगः यस्य', type: 'बहुव्रीहि', gloss: 'one who is attached to action' },
  'कर्म-सिद्धि': { vigraha: 'कर्मणः सिद्धिः', type: 'षष्ठी तत्पुरुष', gloss: 'success of action' },
  'कर्म-योगिन्': { vigraha: 'कर्म-योगेन युक्तः', type: 'तृतीया तत्पुरुष', gloss: 'practitioner of कर्म-योग' },
  'कर्म-यज्ञ': { vigraha: 'कर्मणा यज्ञः', type: 'तृतीया तत्पुरुष', gloss: 'the sacrifice of action (BG 4.28)' },

  'गुण-अतीत': { vigraha: 'गुणानाम् अतीतः', type: 'षष्ठी तत्पुरुष', gloss: 'one who has transcended the guṇas (BG 14.25)' },
  'गुण-अन्वित': { vigraha: 'गुणैः अन्वितम्', type: 'तृतीया तत्पुरुष', gloss: 'endowed with qualities' },
  'गुण-कर्म-विभाग': { vigraha: 'गुण-कर्मणोः विभागः', type: 'षष्ठी तत्पुरुष', gloss: 'distinction of guṇas and actions (BG 3.28)' },
  'गुण-कर्म-विभागशस्': { vigraha: 'गुण-कर्म-विभागेन', type: 'तत्पुरुष (शस्)', gloss: 'according to the division of guṇas and actions (BG 4.13)' },
  'गुण-कर्मन्': { vigraha: 'गुणाश्च कर्माणि च', type: 'इतरेतर द्वंद्व', gloss: 'qualities and actions' },
  'गुण-मय': { vigraha: 'गुणैः निर्मितम्', type: 'तत्पुरुष (मयट्)', gloss: 'made of the guṇas' },
  'गुण-त्रय': { vigraha: 'त्रयो गुणाः', type: 'द्विगु', gloss: 'the triad of guṇas' },
  'गुण-भोक्तृ': { vigraha: 'गुणानां भोक्ता', type: 'षष्ठी तत्पुरुष', gloss: 'enjoyer of the guṇas' },
  'गुण-संग': { vigraha: 'गुणेषु संगः', type: 'सप्तमी तत्पुरुष', gloss: 'attachment to the guṇas (BG 13.21)' },
  'गुण-संख्यान': { vigraha: 'गुणानां संख्यानम्', type: 'षष्ठी तत्पुरुष', gloss: 'enumeration of the guṇas (BG 18.19)' },

  'योग-आरूढ': { vigraha: 'योगम् आरूढः', type: 'द्वितीया तत्पुरुष', gloss: 'one who has ascended in yoga (BG 6.3,4)' },
  'योग-ईश्वर': { vigraha: 'योगस्य ईश्वरः', type: 'षष्ठी तत्पुरुष', gloss: 'lord of yoga' },
  'योग-धारणा': { vigraha: 'योगस्य धारणा', type: 'षष्ठी तत्पुरुष', gloss: 'the yogic concentration (BG 8.12)' },
  'योग-बल': { vigraha: 'योगस्य बलम्', type: 'षष्ठी तत्पुरुष', gloss: 'the power of yoga' },
  'योग-भ्रष्ट': { vigraha: 'योगात् भ्रष्टः', type: 'पञ्चमी तत्पुरुष', gloss: 'fallen from yoga (BG 6.41)' },
  'योग-वित्तम': { vigraha: 'योगस्य वित्तमः', type: 'षष्ठी तत्पुरुष', gloss: 'foremost knower of yoga' },
  'योग-संज्ञित': { vigraha: 'योगः इति संज्ञितः', type: 'तत्पुरुष', gloss: 'known as yoga' },
  'योग-संसिद्धि': { vigraha: 'योगेन संसिद्धिः', type: 'तृतीया तत्पुरुष', gloss: 'perfection through yoga (BG 6.37)' },
  'योग-सेविन्': { vigraha: 'योगं सेवते यः', type: 'उपपद तत्पुरुष', gloss: 'one who practices yoga' },
  'योग-स्थ': { vigraha: 'योगे स्थितः', type: 'सप्तमी तत्पुरुष', gloss: 'established in yoga (BG 2.48)' },
  'योग-वित्': { vigraha: 'योगं वेद यः', type: 'उपपद तत्पुरुष', gloss: 'knower of yoga' },
  'योग-युक्त-आत्मन्': { vigraha: 'योगेन युक्तः आत्मा यस्य', type: 'बहुव्रीहि', gloss: 'one whose self is yoked in yoga' },

  'भूत-इज्या': { vigraha: 'भूतानां इज्या', type: 'षष्ठी तत्पुरुष', gloss: 'worship of beings/spirits (BG 17.4)' },
  'भूत-गण': { vigraha: 'भूतानां गणाः', type: 'षष्ठी तत्पुरुष', gloss: 'classes of beings' },
  'भूत-पृथग्भाव': { vigraha: 'भूतानां पृथग्-भावः', type: 'षष्ठी तत्पुरुष', gloss: 'the diverse manifestation of beings (BG 13.30)' },
  'भूत-प्रकृति-मोक्ष': { vigraha: 'भूत-प्रकृतेः मोक्षः', type: 'षष्ठी तत्पुरुष (chain)', gloss: 'liberation from the realm of becoming (BG 13.34)' },
  'भूत-भर्तृ': { vigraha: 'भूतानां भर्ता', type: 'षष्ठी तत्पुरुष', gloss: 'supporter of beings' },
  'भूत-भव्य': { vigraha: 'भूतं च भव्यं च', type: 'इतरेतर द्वंद्व', gloss: 'past and future' },
  'भूत-भावन': { vigraha: 'भूतानां भावनः', type: 'षष्ठी तत्पुरुष', gloss: 'cause of beings\' existence' },
  'भूत-भृत्': { vigraha: 'भूतान् बिभर्ति यः', type: 'उपपद तत्पुरुष', gloss: 'sustainer of beings' },
  'भूत-संमोह': { vigraha: 'भूतानां संमोहः', type: 'षष्ठी तत्पुरुष', gloss: 'delusion of beings' },
  'भूत-सर्ग': { vigraha: 'भूतानां सर्गः', type: 'षष्ठी तत्पुरुष', gloss: 'creation of beings' },

  'ज्ञान-अग्नि-दग्ध-कर्मन्': { vigraha: 'ज्ञान-अग्निना दग्धानि कर्माणि यस्य', type: 'बहुव्रीहि (chain)', gloss: 'one whose actions are burnt by the fire of knowledge (BG 4.19)' },
  'ज्ञान-अवस्थित-चेतस्': { vigraha: 'ज्ञाने अवस्थितं चेतः यस्य', type: 'बहुव्रीहि', gloss: 'one whose mind is established in knowledge' },
  'ज्ञान-असि': { vigraha: 'ज्ञानम् एव असिः', type: 'कर्मधारय', gloss: 'the sword of knowledge (BG 4.42)' },
  'ज्ञान-गम्य': { vigraha: 'ज्ञानेन गम्यम्', type: 'तृतीया तत्पुरुष', gloss: 'attainable through knowledge' },
  'ज्ञान-तपस्': { vigraha: 'ज्ञानेन तपः', type: 'तृतीया तत्पुरुष', gloss: 'the austerity of knowledge (BG 4.10)' },
  'ज्ञान-प्लव': { vigraha: 'ज्ञानम् एव प्लवः', type: 'कर्मधारय', gloss: 'the raft of knowledge (BG 4.36)' },
  'ज्ञान-वत्': { vigraha: 'ज्ञानवान्', type: 'मतुप्', gloss: 'possessor of knowledge / wise' },
  'ज्ञान-विप्लव': { vigraha: 'ज्ञानस्य विप्लवः', type: 'षष्ठी तत्पुरुष', gloss: 'destruction of knowledge' },

  'तद्-अर्थ': { vigraha: 'तस्य अर्थम्', type: 'तत्पुरुष (कृत्यर्थ)', gloss: 'for the sake of that' },
  'तद्-अर्थीय': { vigraha: 'तस्य अर्थाय हितः', type: 'तद्धित', gloss: 'meant for that purpose' },
  'तद्-आत्मन्': { vigraha: 'तत् आत्मा यस्य', type: 'बहुव्रीहि', gloss: 'one whose self is That' },
  'तद्-निष्ठ': { vigraha: 'तत्र निष्ठा यस्य', type: 'बहुव्रीहि', gloss: 'devoted to That' },
  'तद्-पर': { vigraha: 'तत् परम् यस्य', type: 'बहुव्रीहि', gloss: 'one to whom That is supreme' },
  'तद्-परायण': { vigraha: 'तत्र परायणः', type: 'सप्तमी तत्पुरुष', gloss: 'devoted to That' },
  'तद्-बुद्धि': { vigraha: 'तत्र बुद्धिः यस्य', type: 'बहुव्रीहि', gloss: 'one whose mind is on That' },
  'तद्-भाव-भाव': { vigraha: 'तद्-भावस्य भावः', type: 'षष्ठी तत्पुरुष', gloss: 'the state of being That (BG 8.6)' },
  'तद्-वत्': { vigraha: 'तेन तुल्यम्', type: 'तत्पुरुष (वतिः)', gloss: 'like that / similarly' },
  'तद्-विद्': { vigraha: 'तं वेद यः', type: 'उपपद तत्पुरुष', gloss: 'knower of That' },

  'आत्म-औपम्य': { vigraha: 'आत्मनः औपम्यम्', type: 'षष्ठी तत्पुरुष', gloss: 'comparison with oneself (BG 6.32)' },
  'आत्म-कारण': { vigraha: 'आत्मनः कारणम्', type: 'षष्ठी तत्पुरुष', gloss: 'for one\'s own sake' },
  'आत्म-पर-देह': { vigraha: 'आत्मनः परेषां च देहाः', type: 'षष्ठी तत्पुरुष (chain)', gloss: 'one\'s own and others\' bodies' },
  'आत्म-बुद्धि-प्रसाद-ज': { vigraha: 'आत्म-बुद्धेः प्रसादात् जातम्', type: 'पञ्चमी तत्पुरुष (chain)', gloss: 'born of the clarity of one\'s own intellect (BG 18.37)' },
  'आत्म-भाव-स्थ': { vigraha: 'आत्म-भावे स्थितः', type: 'सप्तमी तत्पुरुष', gloss: 'situated in the inner being (BG 10.11)' },
  'आत्म-संभाविता': { vigraha: 'आत्मना संभाविताः', type: 'तृतीया तत्पुरुष', gloss: 'self-conceited (BG 16.17)' },

  'ब्रह्म-अर्पण': { vigraha: 'ब्रह्मणि अर्पणम्', type: 'सप्तमी तत्पुरुष', gloss: 'offering to Brahman (BG 4.24)' },
  'ब्रह्म-उद्भव': { vigraha: 'ब्रह्मणः उद्भवः', type: 'पञ्चमी तत्पुरुष', gloss: 'arising from Brahman' },
  'ब्रह्म-कर्म': { vigraha: 'ब्रह्म एव कर्म', type: 'कर्मधारय', gloss: 'work that is Brahman' },
  'ब्रह्म-भुवन': { vigraha: 'ब्रह्मणः भुवनम्', type: 'षष्ठी तत्पुरुष', gloss: 'the world of Brahman' },
  'ब्रह्म-योग-युक्त-आत्मन्': { vigraha: 'ब्रह्म-योगेन युक्तः आत्मा यस्य', type: 'बहुव्रीहि', gloss: 'one whose self is yoked in the yoga of Brahman (BG 5.21)' },
  'ब्रह्म-विद्': { vigraha: 'ब्रह्म वेद यः', type: 'उपपद तत्पुरुष', gloss: 'knower of Brahman' },
  'ब्रह्म-संस्पर्श': { vigraha: 'ब्रह्मणा संस्पर्शः', type: 'तृतीया तत्पुरुष', gloss: 'contact with Brahman (BG 6.28)' },

  'यज्ञ-क्षपित-कल्मष': { vigraha: 'यज्ञेन क्षपितानि कल्मषाणि येषाम्', type: 'बहुव्रीहि', gloss: 'those whose sins are destroyed by sacrifice (BG 4.30)' },
  'यज्ञ-तपस्-क्रिया': { vigraha: 'यज्ञ-तपसोः क्रियाः', type: 'षष्ठी तत्पुरुष (chain)', gloss: 'rituals of sacrifice and austerity' },
  'यज्ञ-तपस्': { vigraha: 'यज्ञः च तपः च', type: 'इतरेतर द्वंद्व', gloss: 'sacrifice and austerity' },
  'यज्ञ-भाविता': { vigraha: 'यज्ञेन भाविताः', type: 'तृतीया तत्पुरुष', gloss: 'nourished by sacrifice' },
  'यज्ञ-शिष्ट-अमृत-भुज्': { vigraha: 'यज्ञ-शिष्टम् अमृतम् भुङ्क्ते यः', type: 'उपपद तत्पुरुष', gloss: 'eaters of the nectar-remnant of sacrifice (BG 4.31)' },

  'यत-आत्मवत्': { vigraha: 'यतः आत्मा यस्य', type: 'बहुव्रीहि', gloss: 'self-restrained' },
  'यत-इन्द्रिय-मनस्-बुद्धि': { vigraha: 'यतानि इन्द्रिय-मनस्-बुद्धयः यस्य', type: 'बहुव्रीहि (chain)', gloss: 'one whose senses, mind, and intellect are restrained (BG 5.28)' },
  'यत-चित्त-इन्द्रिय-क्रिय': { vigraha: 'यताः चित्त-इन्द्रिय-क्रियाः यस्य', type: 'बहुव्रीहि (chain)', gloss: 'one whose mind, senses, and actions are restrained (BG 6.12)' },
  'यत-चित्त': { vigraha: 'यतं चित्तं यस्य', type: 'बहुव्रीहि', gloss: 'one whose mind is restrained' },
  'यत-वाक्-काय-मानस': { vigraha: 'यताः वाक्-काय-मानसाः यस्य', type: 'बहुव्रीहि', gloss: 'one whose speech, body, and mind are restrained' },
  'नियत-आत्मन्': { vigraha: 'नियतः आत्मा यस्य', type: 'बहुव्रीहि', gloss: 'one whose self is controlled' },
  'नियत-मानस': { vigraha: 'नियतं मानसं यस्य', type: 'बहुव्रीहि', gloss: 'one whose mind is controlled' },

  'काम-ईप्सु': { vigraha: 'कामम् ईप्सति यः', type: 'उपपद तत्पुरुष', gloss: 'one desiring pleasure' },
  'काम-काम': { vigraha: 'कामान् कामयते यः', type: 'उपपद तत्पुरुष', gloss: 'one who desires pleasures' },
  'काम-कामिन्': { vigraha: 'कामान् कामयते यः', type: 'उपपद तत्पुरुष', gloss: 'pleasure-loving / hedonist' },
  'काम-राग-बल-अन्वित': { vigraha: 'काम-राग-बलैः अन्विताः', type: 'तृतीया तत्पुरुष (chain)', gloss: 'driven by the force of lust and passion (BG 16.10)' },

  'देव-ऋषि': { vigraha: 'देवानां ऋषिः', type: 'षष्ठी तत्पुरुष', gloss: 'divine sage' },
  'देव-द्विज-गुरु-प्राज्ञ-पूजन': { vigraha: 'देव-द्विज-गुरु-प्राज्ञानां पूजनम्', type: 'षष्ठी तत्पुरुष (chain)', gloss: 'worship of gods, twice-born, teachers, and the wise (BG 17.14)' },
  'देव-भोग': { vigraha: 'देवानां भोगाः', type: 'षष्ठी तत्पुरुष', gloss: 'enjoyments of the gods' },
  'देव-यज्': { vigraha: 'देवान् यजते यः', type: 'उपपद तत्पुरुष', gloss: 'sacrificer to the gods' },
  'देव-व्रत': { vigraha: 'देव-व्रते स्थिताः', type: 'सप्तमी तत्पुरुष', gloss: 'devoted to the worship of the gods' },

  'बहु-उदर': { vigraha: 'बहूनि उदराणि यस्य', type: 'बहुव्रीहि', gloss: 'many-bellied' },
  'बहु-दंष्ट्र-कराल': { vigraha: 'बहुभिः दंष्ट्रैः करालम्', type: 'तृतीया तत्पुरुष', gloss: 'fearsome with many fangs' },
  'बहु-बाहु-ऊरु-पाद': { vigraha: 'बहवः बाहु-ऊरु-पादाः यस्य', type: 'बहुव्रीहि (chain)', gloss: 'many-armed, many-thighed, many-footed' },
  'बहु-मत': { vigraha: 'बहुभिः मन्यते यः', type: 'तृतीया तत्पुरुष', gloss: 'highly regarded' },
  'बहु-वक्त्र-नेत्र': { vigraha: 'बहूनि वक्त्र-नेत्राणि यस्य', type: 'बहुव्रीहि', gloss: 'many-mouthed and many-eyed' },
  'बहु-शाख': { vigraha: 'बह्व्यः शाखाः यस्य', type: 'बहुव्रीहि', gloss: 'many-branched (BG 2.41)' },

  'अनन्त-बाहु': { vigraha: 'अनन्ताः बाहवः यस्य', type: 'बहुव्रीहि', gloss: 'endless-armed (BG 11.19)' },
  'अनन्त-रूप': { vigraha: 'अनन्तानि रूपाणि यस्य', type: 'बहुव्रीहि', gloss: 'of endless forms' },
  'अनन्त-वीर्य-अमित-विक्रम': { vigraha: 'अनन्त-वीर्यः अमित-विक्रमः', type: 'कर्मधारय (chain)', gloss: 'of endless valor and immeasurable might (BG 11.40)' },
  'अनन्त-वीर्य': { vigraha: 'अनन्तं वीर्यं यस्य', type: 'बहुव्रीहि', gloss: 'one of endless might' },

  'अनेक-अद्भुत-दर्शन': { vigraha: 'अनेकानि अद्भुतानि दर्शनानि यस्य', type: 'बहुव्रीहि', gloss: 'with many marvelous sights (BG 11.10)' },
  'अनेक-चित्त-विभ्रान्त': { vigraha: 'अनेकेषु चित्त-विभ्रान्तेषु', type: 'सप्तमी तत्पुरुष', gloss: 'with many wandering thoughts (BG 16.16)' },
  'अनेक-जन्म-संसिद्ध': { vigraha: 'अनेकैः जन्मभिः संसिद्धः', type: 'तृतीया तत्पुरुष', gloss: 'perfected through many births (BG 6.45)' },
  'अनेक-दिव्य-आभरण': { vigraha: 'अनेकानि दिव्यानि आभरणानि यस्य', type: 'बहुव्रीहि', gloss: 'with many divine ornaments (BG 11.10)' },
  'अनेक-बाहु-उदर-वक्त्र-नेत्र': { vigraha: 'अनेकानि बाहु-उदर-वक्त्र-नेत्राणि यस्य', type: 'बहुव्रीहि (chain)', gloss: 'with many arms, bellies, mouths, and eyes (BG 11.16)' },

  'अध्यात्म-चेतस्': { vigraha: 'अध्यात्मे चेतः यस्य', type: 'बहुव्रीहि', gloss: 'one whose mind is on the inner self (BG 3.30)' },
  'अध्यात्म-ज्ञान-नित्य-त्व': { vigraha: 'अध्यात्म-ज्ञानस्य नित्य-त्वम्', type: 'षष्ठी तत्पुरुष (chain)', gloss: 'constancy in knowledge of the self (BG 13.11)' },
  'अध्यात्म-नित्य': { vigraha: 'अध्यात्मे नित्यः', type: 'सप्तमी तत्पुरुष', gloss: 'constantly devoted to the self' },
  'अध्यात्म-विद्या': { vigraha: 'अध्यात्मस्य विद्या', type: 'षष्ठी तत्पुरुष', gloss: 'knowledge of the inner self (BG 10.32)' },
  'अध्यात्म-संज्ञित': { vigraha: 'अध्यात्म इति संज्ञितम्', type: 'तत्पुरुष', gloss: 'called "adhyātma" (the inner self) (BG 8.3)' },

  'अव्यक्त-आदि': { vigraha: 'अव्यक्तः आदिः येषाम्', type: 'बहुव्रीहि', gloss: 'with the unmanifest as origin (BG 2.28)' },
  'अव्यक्त-आसक्त-चेतस्': { vigraha: 'अव्यक्ते आसक्तं चेतः येषाम्', type: 'बहुव्रीहि', gloss: 'whose minds are attached to the unmanifest (BG 12.5)' },
  'अव्यक्त-निधन': { vigraha: 'अव्यक्तं निधनं येषाम्', type: 'बहुव्रीहि', gloss: 'with the unmanifest as their end (BG 2.28)' },
  'अव्यक्त-मूर्ति': { vigraha: 'अव्यक्ता मूर्तिः यस्य', type: 'बहुव्रीहि', gloss: 'one whose form is unmanifest (BG 9.4)' },
  'अव्यक्त-सञ्ज्ञक': { vigraha: 'अव्यक्तम् इति संज्ञितम्', type: 'तत्पुरुष', gloss: 'called "the unmanifest" (BG 8.18)' },

  'अन्य-गामिन्': { vigraha: 'अन्यत्र गच्छति यः', type: 'उपपद तत्पुरुष', gloss: 'one who goes elsewhere (BG 8.8)' },
  'अन्य-चेतस्': { vigraha: 'अन्यत्र चेतः यस्य', type: 'बहुव्रीहि', gloss: 'one whose mind is elsewhere' },
  'अन्य-भाज्': { vigraha: 'अन्यान् भजते यः', type: 'उपपद तत्पुरुष', gloss: 'one who worships another' },
  'अन्य-मनस्': { vigraha: 'अन्यत्र मनः यस्य', type: 'बहुव्रीहि', gloss: 'one whose mind is elsewhere' },
  'अन्य-योग': { vigraha: 'अन्यैः योगः', type: 'तृतीया तत्पुरुष', gloss: 'union with another' },

  'एक-अक्षर': { vigraha: 'एकं अक्षरम्', type: 'कर्मधारय', gloss: 'the one syllable (oṃ)' },
  'एक-अंश': { vigraha: 'एकेन अंशेन', type: 'तृतीया तत्पुरुष', gloss: 'with one fraction (BG 10.42)' },
  'एक-त्व': { vigraha: 'एकस्य भावः', type: 'भाव-prk', gloss: 'oneness / unity' },
  'एक-भक्ति': { vigraha: 'एका भक्तिः', type: 'कर्मधारय', gloss: 'single-minded devotion (BG 7.17)' },

  'अर्थ-अर्थिन्': { vigraha: 'अर्थम् अर्थयते यः', type: 'उपपद तत्पुरुष', gloss: 'one seeking wealth (BG 7.16)' },
  'अर्थ-काम': { vigraha: 'अर्थः च कामश्च', type: 'इतरेतर द्वंद्व', gloss: 'wealth and pleasure (two of the four goals)' },
  'अर्थ-व्यपाश्रय': { vigraha: 'अर्थस्य व्यपाश्रयः', type: 'षष्ठी तत्पुरुष', gloss: 'recourse to material gain (BG 18.34)' },
  'अर्थ-सञ्चय': { vigraha: 'अर्थस्य सञ्चयः', type: 'षष्ठी तत्पुरुष', gloss: 'accumulation of wealth' },

  'धर्म-अविरुद्ध': { vigraha: 'धर्मेण अविरुद्धः', type: 'तृतीया तत्पुरुष', gloss: 'not opposed to dharma (BG 7.11)' },
  'धर्म-आत्मन्': { vigraha: 'धर्मे आत्मा यस्य', type: 'बहुव्रीहि', gloss: 'one whose self is in dharma' },
  'धर्म-काम-अर्थ': { vigraha: 'धर्मः कामः अर्थश्च', type: 'इतरेतर द्वंद्व', gloss: 'dharma, pleasure, and wealth (three goals)' },
  'धर्म-सम्मूढ-चेतस्': { vigraha: 'धर्मे सम्मूढं चेतः यस्य', type: 'बहुव्रीहि', gloss: 'one whose mind is confused about dharma (BG 2.7)' },
  'धर्म-संस्थापन-अर्थ': { vigraha: 'धर्मस्य संस्थापनस्य अर्थम्', type: 'षष्ठी तत्पुरुष (कृत्यर्थ)', gloss: 'for the sake of establishing dharma (BG 4.8)' },

  // ─────────────────────────────────────────────────────────────────────
  // Batch 4: remaining stem families + high-occurrence singletons.
  // ─────────────────────────────────────────────────────────────────────

  // सर्व- (additional)
  'सर्व-कर्मन्': { vigraha: 'सर्वाणि कर्माणि', type: 'कर्मधारय', gloss: 'all actions' },
  'सर्व-काम': { vigraha: 'सर्वे कामाः', type: 'कर्मधारय', gloss: 'all desires' },
  'सर्व-किल्बिष': { vigraha: 'सर्वैः किल्बिषैः', type: 'तृतीया तत्पुरुष', gloss: 'by all sins' },
  'सर्व-क्षेत्र': { vigraha: 'सर्वेषु क्षेत्रेषु', type: 'सप्तमी तत्पुरुष', gloss: 'in all fields/bodies (BG 13.2)' },
  'सर्व-गुण': { vigraha: 'सर्वे गुणाः', type: 'कर्मधारय', gloss: 'all qualities' },
  'सर्व-धर्म': { vigraha: 'सर्वान् धर्मान्', type: 'कर्मधारय', gloss: 'all dharmas (BG 18.66)' },
  'सर्व-पाप': { vigraha: 'सर्वेभ्यः पापेभ्यः', type: 'पञ्चमी तत्पुरुष', gloss: 'from all sins (BG 18.66)' },
  'सर्व-योग': { vigraha: 'सर्वैः योगैः', type: 'तृतीया तत्पुरुष', gloss: 'by all yogas' },
  'सर्व-यज्ञ': { vigraha: 'सर्वे यज्ञाः', type: 'कर्मधारय', gloss: 'all sacrifices' },
  'सर्व-दुःख': { vigraha: 'सर्वाणि दुःखानि', type: 'कर्मधारय', gloss: 'all sorrows' },
  'सर्व-तपस्': { vigraha: 'सर्वाणि तपांसि', type: 'कर्मधारय', gloss: 'all austerities' },
  'सर्व-शास्त्र': { vigraha: 'सर्वाणि शास्त्राणि', type: 'कर्मधारय', gloss: 'all scriptures' },
  'सर्व-स्व': { vigraha: 'सर्वम् एव स्वम्', type: 'कर्मधारय', gloss: 'one\'s whole property' },
  'सर्व-यन्त्र': { vigraha: 'सर्वाणि यन्त्राणि', type: 'कर्मधारय', gloss: 'all instruments' },
  'सर्व-त्रग': { vigraha: 'सर्वत्र गच्छति यः', type: 'उपपद तत्पुरुष', gloss: 'all-pervading' },

  // कर्म- (additional)
  'कर्म-फल-आसङ्ग': { vigraha: 'कर्म-फले आसङ्गः', type: 'सप्तमी तत्पुरुष', gloss: 'attachment to the fruits of action (BG 4.20)' },
  'कर्म-फल-प्रेप्सु': { vigraha: 'कर्म-फलं प्रेप्सति यः', type: 'उपपद तत्पुरुष', gloss: 'one who desires the fruits of action' },
  'कर्म-बन्धन': { vigraha: 'कर्मणा बन्धनम्', type: 'तृतीया तत्पुरुष', gloss: 'bondage by action' },
  'कर्म-बन्ध': { vigraha: 'कर्मणः बन्धः', type: 'षष्ठी तत्पुरुष', gloss: 'bondage of action (BG 2.39)' },
  'कर्म-संग्रह': { vigraha: 'कर्मणः संग्रहः', type: 'षष्ठी तत्पुरुष', gloss: 'the basis of action (BG 18.18)' },

  // महा- (additional)
  'महा-अनुभाव': { vigraha: 'महान्तः अनुभावाः येषाम्', type: 'बहुव्रीहि', gloss: 'of great dignity/influence (BG 2.5)' },
  'महा-अशन': { vigraha: 'महान् अशनः', type: 'कर्मधारय', gloss: 'great-eating / voracious (BG 3.37)' },
  'महा-इष्वास': { vigraha: 'महान्तः इष्वासाः', type: 'कर्मधारय', gloss: 'great archers (BG 1.4)' },
  'महा-ऋषि-सिद्ध-सङ्घ': { vigraha: 'महा-ऋषीणां सिद्धानां च सङ्घाः', type: 'षष्ठी तत्पुरुष (chain)', gloss: 'hosts of great sages and perfected ones (BG 11.21)' },
  'महा-पाप्मन्': { vigraha: 'महान् पाप्मा', type: 'कर्मधारय', gloss: 'great sin (BG 3.37)' },
  'महा-योग-ईश्वर': { vigraha: 'महान् योग-ईश्वरः', type: 'कर्मधारय', gloss: 'the great lord of yoga' },

  // मद्- (additional)
  'मद्-कर्म-कृत्': { vigraha: 'मम कर्म करोति यः', type: 'उपपद तत्पुरुष', gloss: 'one who does my work (BG 11.55)' },
  'मद्-गत-प्राण': { vigraha: 'मद्-गताः प्राणाः येषाम्', type: 'बहुव्रीहि', gloss: 'those whose life-breaths are merged in me (BG 10.9)' },
  'मद्-परायण': { vigraha: 'अहम् परायणं यस्य', type: 'बहुव्रीहि', gloss: 'one who has me as supreme refuge' },
  'मद्-भक्ति': { vigraha: 'मयि भक्तिः', type: 'सप्तमी तत्पुरुष', gloss: 'devotion to me' },
  'मद्-मय': { vigraha: 'मया एव निर्मितम्', type: 'तत्पुरुष (मयट्)', gloss: 'consisting of me / one with me' },
  'मद्-आश्रित': { vigraha: 'मद्-आश्रितः', type: 'द्वितीया तत्पुरुष', gloss: 'taking refuge in me' },

  // ज्ञान- (additional)
  'ज्ञान-निर्धूत-कल्मष': { vigraha: 'ज्ञानेन निर्धूतानि कल्मषानि येषाम्', type: 'बहुव्रीहि (chain)', gloss: 'those whose sins are dispelled by knowledge (BG 5.17)' },
  'ज्ञान-योग-व्यवस्थिति': { vigraha: 'ज्ञान-योगे व्यवस्थितिः', type: 'सप्तमी तत्पुरुष', gloss: 'establishment in the yoga of knowledge (BG 16.1)' },
  'ज्ञान-विज्ञान-नाशन': { vigraha: 'ज्ञान-विज्ञानयोः नाशनम्', type: 'षष्ठी तत्पुरुष', gloss: 'destroyer of knowledge and realization (BG 3.41)' },
  'ज्ञान-सङ्ग': { vigraha: 'ज्ञाने सङ्गः', type: 'सप्तमी तत्पुरुष', gloss: 'attachment to knowledge (BG 14.6)' },
  'ज्ञान-विज्ञान-तृप्त-आत्मन्': { vigraha: 'ज्ञान-विज्ञानाभ्यां तृप्तः आत्मा यस्य', type: 'बहुव्रीहि (chain)', gloss: 'one whose self is satisfied by knowledge and realization (BG 6.8)' },

  // नित्य- (additional)
  'नित्य-अभियुक्त': { vigraha: 'नित्यम् अभियुक्तः', type: 'गति समास', gloss: 'always engaged (BG 9.22)' },
  'नित्य-जात': { vigraha: 'नित्यं जातः', type: 'गति समास', gloss: 'eternally born' },
  'नित्य-युक्त': { vigraha: 'नित्यं युक्तः', type: 'गति समास', gloss: 'ever-yoked' },
  'नित्य-वैरिन्': { vigraha: 'नित्यः वैरी', type: 'कर्मधारय', gloss: 'perpetual enemy (BG 3.39)' },
  'नित्य-सन्न्यासिन्': { vigraha: 'नित्यं सन्न्यासी', type: 'गति समास', gloss: 'the perpetual renunciate (BG 5.3)' },

  // योग- (additional)
  'योग-माया-समावृत': { vigraha: 'योग-मायया समावृतः', type: 'तृतीया तत्पुरुष', gloss: 'veiled by yoga-māyā (BG 7.25)' },
  'योग-यज्ञ': { vigraha: 'योगः एव यज्ञः', type: 'कर्मधारय', gloss: 'yoga-as-sacrifice (BG 4.28)' },
  'योग-संसिद्ध': { vigraha: 'योगेन संसिद्धः', type: 'तृतीया तत्पुरुष', gloss: 'perfected through yoga' },
  'योग-संन्यस्त-कर्मन्': { vigraha: 'योगेन संन्यस्तानि कर्माणि येन', type: 'बहुव्रीहि', gloss: 'one who has renounced actions through yoga (BG 4.41)' },

  // आत्म- (additional)
  'आत्म-माया': { vigraha: 'आत्मनः मायया', type: 'षष्ठी तत्पुरुष', gloss: 'by my own māyā (BG 4.6)' },
  'आत्म-विशुद्धि': { vigraha: 'आत्मनः विशुद्धिः', type: 'षष्ठी तत्पुरुष', gloss: 'self-purification (BG 6.12)' },
  'आत्म-संयम-योग-अग्नि': { vigraha: 'आत्म-संयम-योगः एव अग्निः', type: 'कर्मधारय (chain)', gloss: 'the fire of the yoga of self-restraint (BG 4.27)' },
  'आत्म-सम्भाविता': { vigraha: 'आत्मना सम्भाविताः', type: 'तृतीया तत्पुरुष', gloss: 'self-conceited (BG 16.17)' },

  // इन्द्रिय-
  'इन्द्रिय-अग्नि': { vigraha: 'इन्द्रियाणि एव अग्नयः', type: 'कर्मधारय', gloss: 'the senses as fires (BG 4.26)' },
  'इन्द्रिय-आराम': { vigraha: 'इन्द्रियेषु आरामः', type: 'सप्तमी तत्पुरुष', gloss: 'one who delights in the senses (BG 3.16)' },
  'इन्द्रिय-कर्मन्': { vigraha: 'इन्द्रियाणां कर्माणि', type: 'षष्ठी तत्पुरुष', gloss: 'the actions of the senses' },
  'इन्द्रिय-गोचर': { vigraha: 'इन्द्रियाणां गोचराः', type: 'षष्ठी तत्पुरुष', gloss: 'the range of the senses (BG 13.5)' },
  'इन्द्रिय-संयम': { vigraha: 'इन्द्रियाणां संयमः', type: 'षष्ठी तत्पुरुष', gloss: 'restraint of the senses' },
  'इन्द्रिय-गोग्राम': { vigraha: 'इन्द्रिय-गणस्य ग्रामः', type: 'षष्ठी तत्पुरुष', gloss: 'the collection of senses' },

  // गत- (departed-X / state-of-X)
  'गत-आगत': { vigraha: 'गतं च आगतं च', type: 'इतरेतर द्वंद्व', gloss: 'going and coming (BG 9.21)' },
  'गत-रस': { vigraha: 'गताः रसाः यस्य', type: 'बहुव्रीहि', gloss: 'one whose taste/desire has departed (BG 2.59)' },
  'गत-सङ्ग': { vigraha: 'गतः सङ्गः यस्य', type: 'बहुव्रीहि', gloss: 'one whose attachment has gone (BG 4.23)' },
  'गत-सन्देह': { vigraha: 'गतः सन्देहः यस्य', type: 'बहुव्रीहि', gloss: 'one whose doubts have gone (BG 18.73)' },

  // जित- (conquered-X)
  'जित-आत्मन्': { vigraha: 'जितः आत्मा यस्य', type: 'बहुव्रीहि', gloss: 'one whose self is conquered (self-mastered)' },
  'जित-इन्द्रिय': { vigraha: 'जितानि इन्द्रियाणि येन', type: 'बहुव्रीहि', gloss: 'one whose senses are conquered' },
  'जित-सङ्ग-दोष': { vigraha: 'जिताः सङ्ग-दोषाः येन', type: 'बहुव्रीहि (chain)', gloss: 'one who has conquered the defects of attachment (BG 15.5)' },

  // तत्त्व-
  'तत्त्व-अर्थवत्': { vigraha: 'तत्त्व-अर्थवत् यथार्थम्', type: 'मतुप्', gloss: 'as the true reality / truthfully' },
  'तत्त्व-ज्ञान-अर्थ-दर्शन': { vigraha: 'तत्त्व-ज्ञानस्य अर्थस्य दर्शनम्', type: 'षष्ठी तत्पुरुष (chain)', gloss: 'the vision of the truth of knowledge (BG 13.11)' },
  'तत्त्व-दर्शिन्': { vigraha: 'तत्त्वं पश्यति यः', type: 'उपपद तत्पुरुष', gloss: 'the seer of truth' },
  'तत्त्व-वित्': { vigraha: 'तत्त्वं वेद यः', type: 'उपपद तत्पुरुष', gloss: 'knower of truth' },

  // दुःख-
  'दुःख-अन्त': { vigraha: 'दुःखस्य अन्तः', type: 'षष्ठी तत्पुरुष', gloss: 'the end of sorrow' },
  'दुःख-आलय': { vigraha: 'दुःखानाम् आलयः', type: 'षष्ठी तत्पुरुष', gloss: 'abode of sorrow (BG 8.15)' },
  'दुःख-शोक-आमय-प्रद': { vigraha: 'दुःख-शोक-आमयान् प्रददाति यः', type: 'उपपद तत्पुरुष (chain)', gloss: 'giver of pain, grief, and disease (BG 17.9)' },
  'दुःख-हा': { vigraha: 'दुःखं हन्ति यः', type: 'उपपद तत्पुरुष', gloss: 'destroyer of sorrow' },
  'दुःख-संयोग-वियोग': { vigraha: 'दुःख-संयोगस्य वियोगः', type: 'षष्ठी तत्पुरुष', gloss: 'disjoining from the conjunction with sorrow (BG 6.23)' },

  // प्राण-
  'प्राण-अपान': { vigraha: 'प्राणः च अपानः च', type: 'इतरेतर द्वंद्व', gloss: 'inhalation and exhalation' },
  'प्राण-अपान-गति': { vigraha: 'प्राण-अपानयोः गती', type: 'षष्ठी तत्पुरुष', gloss: 'the movements of prāṇa and apāna (BG 4.29)' },
  'प्राण-अपान-समायुक्त': { vigraha: 'प्राण-अपानाभ्यां समायुक्तः', type: 'तृतीया तत्पुरुष', gloss: 'joined with prāṇa and apāna (BG 15.14)' },
  'प्राण-कर्मन्': { vigraha: 'प्राणानां कर्माणि', type: 'षष्ठी तत्पुरुष', gloss: 'the activities of the vital airs (BG 4.27)' },

  // भूत- (additional)
  'भूत-भाव-उद्भव-कर': { vigraha: 'भूत-भावस्य उद्भवं करोति', type: 'उपपद तत्पुरुष (chain)', gloss: 'creator of the becoming of beings (BG 8.3)' },
  'भूत-महेश्वर': { vigraha: 'भूतानां महेश्वरः', type: 'षष्ठी तत्पुरुष', gloss: 'great lord of beings (BG 9.11)' },
  'भूत-स्थ': { vigraha: 'भूतेषु स्थितः', type: 'सप्तमी तत्पुरुष', gloss: 'situated in beings' },

  // मनः- (mind-) — DCS uses मनः where vocab uses मनस्
  'मनः-गत': { vigraha: 'मनसि गताः', type: 'सप्तमी तत्पुरुष', gloss: 'present in the mind' },
  'मनः-प्रसाद': { vigraha: 'मनसः प्रसादः', type: 'षष्ठी तत्पुरुष', gloss: 'serenity of the mind (BG 17.16)' },
  'मनः-प्राण-इन्द्रिय-क्रिया': { vigraha: 'मनः-प्राण-इन्द्रियाणां क्रियाः', type: 'षष्ठी तत्पुरुष (chain)', gloss: 'the activities of the mind, vital airs, and senses (BG 18.33)' },
  'मनः-षष्ठ': { vigraha: 'मनः षष्ठं येषाम्', type: 'बहुव्रीहि', gloss: '(senses) with the mind as the sixth (BG 15.7)' },

  // यत- (additional)
  'यत-चित्त-इन्द्रिय': { vigraha: 'यतानि चित्त-इन्द्रियाणि येन', type: 'बहुव्रीहि (chain)', gloss: 'one whose mind and senses are restrained' },
  'यत-चेतस्': { vigraha: 'यतं चेतः येषाम्', type: 'बहुव्रीहि', gloss: 'those whose minds are restrained' },
  'यत-वाच्-काय-मानस': { vigraha: 'यताः वाक्-काय-मानसाः यस्य', type: 'बहुव्रीहि (chain)', gloss: 'one whose speech, body, and mind are restrained (BG 17.16)' },

  // स्व- (own-)
  'स्व-कर्मन्': { vigraha: 'स्वस्य कर्म', type: 'षष्ठी तत्पुरुष', gloss: 'one\'s own work' },
  'स्व-कर्म-निरत': { vigraha: 'स्व-कर्मणि निरतः', type: 'सप्तमी तत्पुरुष', gloss: 'devoted to one\'s own work (BG 18.45)' },
  'स्व-चक्षुस्': { vigraha: 'स्वैः चक्षुर्भिः', type: 'तृतीया तत्पुरुष', gloss: 'with one\'s own eyes (BG 11.8)' },
  'स्व-तेजस्': { vigraha: 'स्वेन तेजसा', type: 'तृतीया तत्पुरुष', gloss: 'with one\'s own splendour' },

  // आदित्य-
  'आदित्य-गत': { vigraha: 'आदित्ये गतम्', type: 'सप्तमी तत्पुरुष', gloss: 'present in the sun (BG 15.12)' },
  'आदित्य-वत्': { vigraha: 'आदित्येन तुल्यम्', type: 'तत्पुरुष (वतिः)', gloss: 'sun-like' },
  'आदित्य-वर्ण': { vigraha: 'आदित्यस्य वर्णः इव यस्य', type: 'बहुव्रीहि', gloss: 'sun-coloured (BG 8.9)' },

  // काम- (additional)
  'काम-क्रोध-वियुक्त': { vigraha: 'काम-क्रोधाभ्यां वियुक्तः', type: 'तृतीया तत्पुरुष', gloss: 'free from desire and anger (BG 5.26)' },
  'काम-सङ्कल्प-वर्जित': { vigraha: 'काम-सङ्कल्पाभ्यां वर्जितः', type: 'तृतीया तत्पुरुष', gloss: 'free from desire and resolve (BG 4.19)' },
  'काम-हैतुक': { vigraha: 'कामः हेतुः यस्य', type: 'बहुव्रीहि', gloss: 'motivated by desire (BG 16.8)' },

  // कार्य-
  'कार्य-अकार्य-व्यवस्थिति': { vigraha: 'कार्य-अकार्ययोः व्यवस्थितिः', type: 'षष्ठी तत्पुरुष', gloss: 'distinguishing between what to do and what not to do (BG 16.24)' },
  'कार्य-अकार्य': { vigraha: 'कार्यं च अकार्यं च', type: 'इतरेतर द्वंद्व', gloss: 'duty and what is not duty' },
  'कार्य-कारण-कर्तृ-त्व': { vigraha: 'कार्य-कारण-कर्तृत्वम्', type: 'षष्ठी तत्पुरुष (chain)', gloss: 'the agency in cause and effect (BG 13.20)' },

  // कृत्स्न- (whole)
  'कृत्स्न-कर्म-कृत्': { vigraha: 'कृत्स्नं कर्म करोति यः', type: 'उपपद तत्पुरुष', gloss: 'the doer of all action (BG 4.18)' },
  'कृत्स्न-वत्': { vigraha: 'कृत्स्नेन तुल्यम्', type: 'तत्पुरुष (वतिः)', gloss: 'as if complete' },
  'कृत्स्न-विद्': { vigraha: 'कृत्स्नं वेद यः', type: 'उपपद तत्पुरुष', gloss: 'knower of the whole' },

  // जन्म-
  'जन्म-बन्ध-विनिर्मुक्त': { vigraha: 'जन्म-बन्धात् विनिर्मुक्तः', type: 'पञ्चमी तत्पुरुष', gloss: 'liberated from the bondage of birth (BG 2.51)' },
  'जन्म-मृत्यु-जरा-दुःख': { vigraha: 'जन्म-मृत्यु-जरा-दुःखानि', type: 'इतरेतर द्वंद्व (chain)', gloss: 'birth, death, old age, and sorrow (BG 14.20)' },
  'जन्म-मृत्यु-जरा-व्याधि-दुःख-दोष-अनुदर्शन': { vigraha: 'जन्म-मृत्यु-जरा-व्याधि-दुःख-दोषाणाम् अनुदर्शनम्', type: 'षष्ठी तत्पुरुष (chain)', gloss: 'reflecting on the evil of birth, death, old age, disease, and pain (BG 13.8)' },

  // तुल्य-
  'तुल्य-निन्दा-आत्म-संस्तुति': { vigraha: 'तुल्ये निन्दा-आत्म-संस्तुती यस्य', type: 'बहुव्रीहि (chain)', gloss: 'one to whom blame and self-praise are alike (BG 14.24)' },
  'तुल्य-निन्दा-स्तुति': { vigraha: 'तुल्ये निन्दा-स्तुती यस्य', type: 'बहुव्रीहि', gloss: 'one to whom blame and praise are alike (BG 12.19)' },
  'तुल्य-प्रिय-अप्रिय': { vigraha: 'तुल्ये प्रिय-अप्रिये यस्य', type: 'बहुव्रीहि', gloss: 'one to whom the pleasant and unpleasant are alike (BG 14.24)' },

  // तेजः- (splendour-)
  'तेजः-अंश-सम्भव': { vigraha: 'तेजसः अंशात् सम्भवम्', type: 'पञ्चमी तत्पुरुष (chain)', gloss: 'arising from a fragment of splendour (BG 10.41)' },
  'तेजः-मय': { vigraha: 'तेजसा निर्मितम्', type: 'तत्पुरुष (मयट्)', gloss: 'made of light/splendour' },
  'तेजः-राशि': { vigraha: 'तेजसः राशिः', type: 'षष्ठी तत्पुरुष', gloss: 'mass of splendour (BG 11.17)' },

  // दम्भ- (pride-)
  'दम्भ-अर्थ': { vigraha: 'दम्भस्य अर्थम्', type: 'तत्पुरुष (कृत्यर्थ)', gloss: 'for the sake of ostentation (BG 17.18)' },
  'दम्भ-अहङ्कार-संयुक्त': { vigraha: 'दम्भ-अहङ्काराभ्यां संयुक्तः', type: 'तृतीया तत्पुरुष', gloss: 'joined with pride and ego (BG 17.5)' },
  'दम्भ-मान-मद-अन्वित': { vigraha: 'दम्भ-मान-मदैः अन्विताः', type: 'तृतीया तत्पुरुष (chain)', gloss: 'possessed of pride, conceit, and intoxication (BG 16.10)' },

  // दिव्य- (divine-)
  'दिव्य-अनेक-उद्यत-आयुध': { vigraha: 'दिव्यानि अनेकानि उद्यतानि आयुधानि यस्य', type: 'बहुव्रीहि (chain)', gloss: 'with many divine raised weapons (BG 11.10)' },
  'दिव्य-गन्ध-अनुलेपन': { vigraha: 'दिव्यैः गन्ध-अनुलेपनैः', type: 'तृतीया तत्पुरुष (chain)', gloss: 'with divine fragrances and ointments (BG 11.11)' },
  'दिव्य-माल्य-अम्बर-धर': { vigraha: 'दिव्यानि माल्यानि अम्बराणि च धरति यः', type: 'उपपद तत्पुरुष (chain)', gloss: 'wearing divine garlands and garments (BG 11.11)' },

  // दीप्त- (blazing-)
  'दीप्त-अनल-अर्क-द्युति': { vigraha: 'दीप्त-अनल-अर्क-द्युतिः', type: 'कर्मधारय (chain)', gloss: 'with the radiance of blazing fire and sun (BG 11.17)' },
  'दीप्त-विशाल-नेत्र': { vigraha: 'दीप्तानि विशालानि नेत्राणि यस्य', type: 'बहुव्रीहि (chain)', gloss: 'with blazing wide eyes (BG 11.24)' },
  'दीप्त-हुताश-वक्त्र': { vigraha: 'दीप्तं हुताश-वक्त्रम्', type: 'कर्मधारय', gloss: 'with a blazing fire-eating mouth (BG 11.28)' },

  // नर- (man-)
  'नर-अधम': { vigraha: 'नराणाम् अधमाः', type: 'षष्ठी तत्पुरुष', gloss: 'lowest of men (BG 16.19)' },
  'नर-लोक-वीर': { vigraha: 'नर-लोकस्य वीराः', type: 'षष्ठी तत्पुरुष', gloss: 'heroes of the human world (BG 11.28)' },
  'नर-पुङ्गव': { vigraha: 'नरेषु पुङ्गवः', type: 'सप्तमी तत्पुरुष', gloss: 'bull among men' },

  // Misc high-occurrence singletons
  'अकृत्स्न-विद्': { vigraha: 'अकृत्स्नं वेद यः', type: 'उपपद तत्पुरुष', gloss: 'one who knows only partially (BG 3.29)' },
  'अक्षर-समुद्भव': { vigraha: 'अक्षरात् समुद्भवः', type: 'पञ्चमी तत्पुरुष', gloss: 'arising from the imperishable (BG 3.15)' },
  'अक्षि-शिरस्-मुख': { vigraha: 'अक्षि-शिरः-मुखानि यस्य', type: 'बहुव्रीहि (chain)', gloss: 'with eyes, heads, and mouths (everywhere) (BG 13.14)' },
  'अचल-प्रतिष्ठ': { vigraha: 'अचला प्रतिष्ठा यस्य', type: 'बहुव्रीहि', gloss: 'unshakeable in its standing (BG 2.70)' },
  'अचिन्त्य-रूप': { vigraha: 'अचिन्त्यं रूपं यस्य', type: 'बहुव्रीहि', gloss: 'of inconceivable form (BG 8.9)' },
  'अज्ञान-विमोहित': { vigraha: 'अज्ञानेन विमोहिताः', type: 'तृतीया तत्पुरुष', gloss: 'deluded by ignorance (BG 16.15)' },
  'अज्ञान-सम्भूत': { vigraha: 'अज्ञानात् सम्भूतम्', type: 'पञ्चमी तत्पुरुष', gloss: 'arising from ignorance (BG 4.42)' },
  'अज्ञान-सम्मोह': { vigraha: 'अज्ञानेन सम्मोहः', type: 'तृतीया तत्पुरुष', gloss: 'delusion due to ignorance (BG 18.72)' },
  'अतिमानि-त्व': { vigraha: 'अतिमानिनः भावः', type: 'त्व-affix', gloss: 'arrogance (BG 16.3)' },
  'अदृष्ट-पूर्व': { vigraha: 'अदृष्टं पूर्वम्', type: 'कर्मधारय', gloss: 'never seen before (BG 11.45)' },
  'अनासक्त-बुद्धि': { vigraha: 'अनासक्ता बुद्धिः यस्य', type: 'बहुव्रीहि', gloss: 'one whose intellect is unattached (BG 18.49)' },
  'अनासक्त-मनस्': { vigraha: 'अनासक्तं मनः यस्य', type: 'बहुव्रीहि', gloss: 'one whose mind is unattached (BG 18.49)' },
  'अनिकेत-स्थिर-मति': { vigraha: 'अनिकेतः स्थिर-मतिः', type: 'कर्मधारय (chain)', gloss: 'homeless and steady-minded (BG 12.19)' },
  'अनिष्ट-इष्ट-मिश्र': { vigraha: 'अनिष्टं इष्टं च मिश्रम्', type: 'इतरेतर द्वंद्व (chain)', gloss: 'unwanted, wanted, and mixed (BG 18.12)' },
  'अनुदर्शन': { vigraha: 'अनुदर्शनम्', type: 'simple noun', gloss: 'observation / reflection' },
  'अपान-वायु': { vigraha: 'अपानः एव वायुः', type: 'कर्मधारय', gloss: 'the apāna wind' },
  'अबुद्धि-त्व': { vigraha: 'अबुद्धेः भावः', type: 'त्व-affix', gloss: 'foolishness' },
  'अभय-सत्त्व-संशुद्धि': { vigraha: 'अभयं सत्त्व-संशुद्धिश्च', type: 'इतरेतर द्वंद्व (chain)', gloss: 'fearlessness and inner purity (BG 16.1)' },
  'अभि-संधाय': { vigraha: 'अभि-संधाय', type: 'absolutive', gloss: 'having decided/aimed at' },
  'अभिजात-दैव-सम्पद्': { vigraha: 'अभिजाताः दैव्या सम्पदा युक्ताः', type: 'तृतीया तत्पुरुष (chain)', gloss: 'born to divine endowment (BG 16.3)' },
};
