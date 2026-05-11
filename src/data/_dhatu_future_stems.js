// Hand-curated futureStem for in-Gītā dhātus that the bulk-extended
// parts didn't include. Each entry written using standard Sanskrit
// phonology rules (anit/seṭ classification, vowel-grade alternation,
// internal sandhi). The conjugator appends लृट् endings to these
// stems to produce future-tense forms (-ष्यति, -ष्यन्ति, -ष्यसि, etc.).
//
// Rule of thumb:
// - For thematic gaṇa 1/4/6 verbs with seṭ class: root + (guṇa) + इष्य
//   (e.g., भू → भविष्य, नी → नेष्य, रक्ष् → रक्षिष्य, गम् → गमिष्य)
// - For anit class roots: root + (sandhi) + ष्य/स्य
//   (e.g., √युध् → योत्स्य [internal sandhi], √भुज् → भोक्ष्य)
// - Athematic roots and irregular/suppletive forms need direct
//   recall — if you're unsure, leave the entry as null and add a
//   // AUDIT comment so the inferred form isn't shown to the user.
export const FUTURE_STEMS = {
  // नी → नेष्य (anit; guṇa ई → ए; ्+स्य → ष्य by ष-ruki)
  'ni': 'नेष्य',
  // पत् → पतिष्य (seṭ; thematic gaṇa 1)
  'pat': 'पतिष्य',
  // रक्ष् → रक्षिष्य (seṭ)
  'raksh': 'रक्षिष्य',
  // स्मृ → स्मरिष्य (seṭ; guṇa ऋ → अर्)
  'smr': 'स्मरिष्य',
  // शक् → शक्ष्य (anit; क्+स्य → क्ष्य)
  'shak': 'शक्ष्य',
  // जि → जेष्य (anit; guṇa इ → ए)
  'ji': 'जेष्य',
  // धृ → धरिष्य (seṭ; guṇa ऋ → अर्)
  'dhr': 'धरिष्य',
  // इष् → एषिष्य (seṭ; guṇa इ → ए)
  'ish': 'एषिष्य',
  // विद् "know" gaṇa 2 — present uses लिट् sense; future = वेत्स्य
  // (guṇa इ → ए; द्+स्य → त्स्य)
  'vid': 'वेत्स्य',
  // वृत् → वर्तिष्य (seṭ; Ātmanepada; guṇa ऋ → अर्)
  'vrt': 'वर्तिष्य',
  // विश् → वेक्ष्य (anit; guṇa इ → ए; श्+स्य → क्ष्य)
  'vish': 'वेक्ष्य',
  // सृज् → स्रक्ष्य (anit; ृ → र; ज्+स्य → क्ष्य)
  'srj': 'स्रक्ष्य',
  // ग्रह् → ग्रहीष्य (seṭ with long ī — irregular)
  'grah': 'ग्रहीष्य',
  // अह् is defective — has only लिट् forms (आह, आहुः); no
  // independent future. Suppletive future supplied by वच्/ब्रू.
  'ah': null, // AUDIT: defective root, no native future
  // चिन्त् gaṇa 10 → चिन्तयिष्य (causative-shape stem + इष्य)
  'cint': 'चिन्तयिष्य',
  // अर्ह् → अर्हिष्य (seṭ)
  'arh': 'अर्हिष्य',
  // नश् → नशिष्य (seṭ form; alt anit नङ्क्ष्य also attested)
  'nash': 'नशिष्य',
  // भज् → भक्ष्य (anit; ज्+स्य → क्ष्य)
  'bhaj': 'भक्ष्य',
  // स्तु → स्तोष्य (anit; guṇa उ → ओ; alt seṭ स्तविष्य)
  'stu': 'स्तोष्य',
  // क्षम् → क्षमिष्य (seṭ)
  'ksham': 'क्षमिष्य',
  // क्रम् → क्रमिष्य (seṭ)
  'kram': 'क्रमिष्य',
  // बुध् gaṇa 1 (Pāṇinian root, anit) → भोत्स्य
  // (guṇa उ → ओ; ध्+स्य → त्स्य)
  'budh': 'भोत्स्य',
  // तप् → तप्स्य (anit; प्+स्य = प्स्य)
  'tap': 'तप्स्य',
  // तृ → तरिष्य (seṭ; guṇa ऋ → अर्)
  'tr': 'तरिष्य',
  // प्रच्छ् → प्रक्ष्य (anit; samprasāraṇa reverses ृ → ; च्छ्+स्य → क्ष्य)
  'pra_ach': 'प्रक्ष्य',
  // मृ → मरिष्य (seṭ; guṇa ऋ → अर्)
  'mr': 'मरिष्य',
  // मुच् → मोक्ष्य (anit; guṇa उ → ओ; च्+स्य → क्ष्य)
  'muc': 'मोक्ष्य',
  // मुद् → मोदिष्य (seṭ; guṇa उ → ओ)
  'mud': 'मोदिष्य',
  // यत् → यतिष्य (seṭ)
  'yat': 'यतिष्य',
  // यज् → यक्ष्य (anit; ज्+स्य → क्ष्य)
  'yaj': 'यक्ष्य',
  // रम् → रंस्य (anit; nasal-anusvāra before स्य)
  'ram': 'रंस्य',
  // लिप् → लेप्स्य (anit; guṇa इ → ए; प्+स्य = प्स्य)
  'lip': 'लेप्स्य',
  // वद् → वदिष्य (seṭ)
  'vad_pra': 'वदिष्य',
  // वह् → वक्ष्य (anit; irregular ह्+स्य → क्ष्य with vowel shortening)
  'vah': 'वक्ष्य',
  // शंस् → शंसिष्य (seṭ)
  'shams': 'शंसिष्य',
  // शिष् gaṇa 7 → शेक्ष्य (anit; guṇa इ → ए; ष्+स्य → क्ष्य)
  'shish': 'शेक्ष्य',
  // सद् → सत्स्य (anit; द्+स्य → त्स्य)
  'sad': 'सत्स्य',
  // सेव् → सेविष्य (seṭ)
  'sev': 'सेविष्य',
  // हृ → हरिष्य (seṭ; guṇa ऋ → अर्)
  'hr': 'हरिष्य',
  // हु → होष्य (anit; guṇa उ → ओ)
  'hu': 'होष्य',
  // कृष् gaṇa 1 — has dual classification (anit क्रक्ष्य / seṭ कर्क्ष्य).
  // Pāṇinian standard for gaṇa 1 = anit क्रक्ष्य; gaṇa 6 (not this entry) = कर्क्ष्य.
  'krsh': 'क्रक्ष्य',
  // रञ्ज् → रंक्ष्य (anit; nasal lost, ज्+स्य → क्ष्य; some traditions रङ्क्ष्य)
  'ranj': 'रंक्ष्य',
  // तॄ → तरिष्य (seṭ; same as तृ in classical practice)
  'tri': 'तरिष्य',
  // चल् → चलिष्य (seṭ)
  'chal': 'चलिष्य',
  // शुच् → शोचिष्य (seṭ; guṇa उ → ओ)
  'sharm': 'शोचिष्य',
  // सिध् → सेत्स्य (anit; guṇa इ → ए; ध्+स्य → त्स्य)
  'sidh': 'सेत्स्य',
  // श्रि → श्रेष्य (anit; guṇa इ → ए)
  'shri': 'श्रेष्य',
  // ज्वल् → ज्वलिष्य (seṭ)
  'jval': 'ज्वलिष्य',
  // दह् → धक्ष्य (anit; irregular: द → ध, ह्+स्य → क्ष्य)
  'dah': 'धक्ष्य',
  // तुष् → तोक्ष्य (anit; guṇa उ → ओ; ष्+स्य → क्ष्य)
  'tush': 'तोक्ष्य',
  // शुष् → शोक्ष्य (anit; guṇa उ → ओ; ष्+स्य → क्ष्य)
  'shush': 'शोक्ष्य',
  // रिच् gaṇa 7 → रेक्ष्य (anit; guṇa इ → ए; च्+स्य → क्ष्य)
  'rich': 'रेक्ष्य',
  // द्विष् → द्वेक्ष्य (anit; guṇa इ → ए; ष्+स्य → क्ष्य)
  'dvish': 'द्वेक्ष्य',
  // लिह् → लेक्ष्य (anit; guṇa इ → ए; ह्+स्य → क्ष्य)
  'lih': 'लेक्ष्य',
  // मुह् → multiple attested forms (मोक्ष्य / मोह्य्ष्य / मोग्ध्य्ष्य).
  // Default classical = मोक्ष्य but it collides with मुच् future; safer to AUDIT.
  'muh': null, // AUDIT: मुह् has dual/triple future stems; needs verification
  // या → यास्य (seṭ; long ā retained)
  'ya': 'यास्य'
};
