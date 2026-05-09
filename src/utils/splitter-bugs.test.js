// Splitter regression tests: lock in correct behavior on verses where
// the engine was producing garbage padas. Each test verifies (a) no
// known-bogus fragment appears in the padaccheda, and (b) where
// possible, the target finite verb is correctly extracted.
//
// These verses originally surfaced from a user audit of Ch 3, 4, 9,
// 10, 18 — none have hand-decoded overrides yet, so the engine sees
// them cold. The fixes target three specific bug classes:
//   1. -र्म / -श्म / -ष्म conjunct misread as -м् + word boundary
//      (LEFT-conjunct guard).
//   2. Bogus 2-char verbal-ending fragments (ति, सि, मि) emitted as
//      "padas" by visarga-ta misfire on words like अस्ति / स्तुति.
//   3. म + conjunct boundaries inside genuine vocab-validated
//      compounds (मरुताम् + अस्मि) being suppressed by the
//      right-conjunct guard.

import { describe, it, expect } from 'vitest';
import { autoDecode } from './decodeHelper.js';

const TEST_VERSES = [
  {
    id: '3.42',
    mool: 'इन्द्रियाणि पराण्याहुरिन्द्रियेभ्यः परं मनः। मनसस्तु परा बुद्धिर्यो बुद्धेः परतस्तु सः॥',
    bogusPadas: [], // no known-bogus shapes for this verse pre-fix; mainly stays whole
  },
  {
    id: '4.37',
    mool: 'यथैधांसि समिद्धोऽग्निर्भस्मसात्कुरुतेऽर्जुन। ज्ञानाग्निः सर्वकर्माणि भस्मसात्कुरुते तथा॥',
    bogusPadas: ['अग्निर्भस्म्', 'भस्म्', 'असात्कुरुते'],
  },
  {
    id: '9.6',
    mool: 'यथाकाशस्थितो नित्यं वायुः सर्वत्रगो महान्। तथा सर्वाणि भूतानि मत्स्थानीत्युपधारय॥',
    bogusPadas: [],
  },
  {
    id: '10.21',
    mool: 'आदित्यानामहं विष्णुर्ज्योतिषां रविरंशुमान्। मरीचिर्मरुतामस्मि नक्षत्राणामहं शशी॥',
    bogusPadas: ['मरीचिर्म्', 'अरुतामस्मि'],
  },
  {
    id: '18.3',
    mool: 'त्याज्यं दोषवदित्येके कर्म प्राहुर्मनीषिणः। यज्ञदानतपःकर्म न त्याज्यमिति चापरे॥',
    bogusPadas: ['प्राहुर्म्', 'अनीषिणः'],
  },
  {
    id: '18.40',
    mool: 'न तदस्ति पृथिव्यां वा दिवि देवेषु वा पुनः। सत्त्वं प्रकृतिजैर्मुक्तं यदेभिः स्यात्त्रिभिर्गुणैः॥',
    bogusPadas: ['तदः', 'ति'], // 'ति' is also a length-2 false-positive
  },
];

describe('splitter — no garbage padas in audit-flagged verses', () => {
  for (const v of TEST_VERSES) {
    it(`${v.id}: padaccheda contains no known-bogus fragments`, () => {
      const out = autoDecode(v.mool);
      const padas = out.padaccheda || [];
      for (const bogus of v.bogusPadas) {
        expect(padas, `${v.id}: pada list ${JSON.stringify(padas)} contains bogus fragment "${bogus}"`).not.toContain(bogus);
      }
    });
  }
});

describe('splitter — vocab-validated splits override right-conjunct guard', () => {
  it('10.21: मरीचिर्मरुतामस्मि → ... + अस्मि (verb extracted)', () => {
    // मरुताम् itself stays inside the prefix blob `मरीचिर्मरुताम्` —
    // freeing it requires a visarga-r sandhi rule (out of scope for
    // this fix). What this commit delivers: अस्मि correctly cut off
    // as its own pada, no longer hidden inside the sandhi blob.
    const out = autoDecode('मरीचिर्मरुतामस्मि नक्षत्राणामहं शशी');
    expect(out.padaccheda).toContain('अस्मि');
  });

  it('10.21: अस्मि is classified as a finite verb', () => {
    const out = autoDecode('मरीचिर्मरुतामस्मि नक्षत्राणामहं शशी');
    const verbForms = (out.finiteVerbs || []).map((f) => f.form);
    expect(verbForms).toContain('अस्मि');
  });
});

describe('क्रिया classification — agent-vocab catches embedded verbs in sandhi blobs', () => {
  // After the splitter fixes, some chunks remain whole because freeing
  // the embedded verb would require sandhi rules we haven't wired (yan +
  // visarga-r chains, implicit-virama drop). For these chunks, the
  // agent-built shared vocab has the embedded finite verb correctly
  // identified — the relaxed length guard (15-25 chars) lets that
  // identification reach the UI.
  const FINITE_VERB_CASES = [
    { id: '3.42', mool: 'इन्द्रियाणि पराण्याहुरिन्द्रियेभ्यः परं मनः। मनसस्तु परा बुद्धिर्यो बुद्धेः परतस्तु सः॥', expectedRoot: '√अह्', expectedLakara: 'lit' },
    { id: '4.37', mool: 'यथैधांसि समिद्धोऽग्निर्भस्मसात्कुरुतेऽर्जुन। ज्ञानाग्निः सर्वकर्माणि भस्मसात्कुरुते तथा॥', expectedRoot: '√कृ', expectedLakara: 'lat' },
    { id: '9.6',  mool: 'यथाकाशस्थितो नित्यं वायुः सर्वत्रगो महान्। तथा सर्वाणि भूतानि मत्स्थानीत्युपधारय॥', expectedRoot: '√धृ', expectedLakara: 'lot' },
    { id: '10.21', mool: 'आदित्यानामहं विष्णुर्ज्योतिषां रविरंशुमान्। मरीचिर्मरुतामस्मि नक्षत्राणामहं शशी॥', expectedRoot: '√अस्', expectedLakara: 'lat' },
    { id: '18.3',  mool: 'त्याज्यं दोषवदित्येके कर्म प्राहुर्मनीषिणः। यज्ञदानतपःकर्म न त्याज्यमिति चापरे॥', expectedRoot: '√अह्', expectedLakara: 'lit' },
    { id: '18.40', mool: 'न तदस्ति पृथिव्यां वा दिवि देवेषु वा पुनः। सत्त्वं प्रकृतिजैर्मुक्तं यदेभिः स्यात्त्रिभिर्गुणैः॥', expectedRoot: '√अस्', expectedLakara: 'vidhilin' },
  ];
  for (const c of FINITE_VERB_CASES) {
    it(`${c.id}: produces a क्रिया card with ${c.expectedRoot} ${c.expectedLakara}`, () => {
      const out = autoDecode(c.mool);
      const verbs = out.finiteVerbs || [];
      expect(verbs.length, `${c.id}: expected at least one finite verb`).toBeGreaterThan(0);
      const matched = verbs.some((v) => v.root === c.expectedRoot && v.lakara === c.expectedLakara);
      expect(matched, `${c.id}: expected ${c.expectedRoot} ${c.expectedLakara}, got ${JSON.stringify(verbs.map((v) => `${v.form} [${v.root} ${v.lakara}]`))}`).toBe(true);
    });
  }
});

describe('splitter — vocab-hint pre-pass for implicit-virama-drop joins', () => {
  // The agent-built vocab encodes "(X + Y)" hints in glosses for chunks
  // joined via implicit-virama-drop (e.g., आचार्यम् + उपसङ्गम्य →
  // आचार्यमुपसङ्गम्य). Regular sandhi rules don't model this writing
  // convention. The pre-pass uses the hint when canonical-form join
  // equality validates it as ground truth.
  it('1.2: आचार्यमुपसङ्गम्य → आचार्यम् + उपसङ्गम्य', () => {
    const out = autoDecode('आचार्यमुपसङ्गम्य राजा वचनमब्रवीत्');
    expect(out.padaccheda).toContain('आचार्यम्');
    expect(out.padaccheda).toContain('उपसङ्गम्य');
    expect(out.padaccheda).not.toContain('आचार्यमुपसङ्गम्य');
  });

  it('1.2: वचनमब्रवीत् → वचनम् + अब्रवीत् (verb freed)', () => {
    const out = autoDecode('आचार्यमुपसङ्गम्य राजा वचनमब्रवीत्');
    expect(out.padaccheda).toContain('अब्रवीत्');
  });
});

describe('splitter — LEFT-conjunct guard on Pattern B', () => {
  it('धर्मक्षेत्रे (1.1) still does NOT split (samāsa, not sandhi)', () => {
    const out = autoDecode('धर्मक्षेत्रे कुरुक्षेत्रे');
    expect(out.padaccheda).toContain('धर्मक्षेत्रे');
    expect(out.padaccheda).not.toContain('धर्म्');
  });

  it('यथाभागमवस्थिताः (1.11) STILL splits as expected', () => {
    const out = autoDecode('अयनेषु च सर्वेषु यथाभागमवस्थिताः');
    expect(out.padaccheda).toContain('यथाभागम्');
    expect(out.padaccheda).toContain('अवस्थिताः');
  });
});
