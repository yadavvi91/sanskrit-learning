import { describe, it, expect } from 'vitest';
import { autoDecode, stubToJs } from './decodeHelper.js';

describe('autoDecode — input handling', () => {
  it('returns null on empty / whitespace input', () => {
    expect(autoDecode('')).toBeNull();
    expect(autoDecode(null)).toBeNull();
    expect(autoDecode(undefined)).toBeNull();
    expect(autoDecode('   ')).toBeNull();
  });

  it('strips shloka punctuation (। and ॥)', () => {
    const stub = autoDecode('धर्मक्षेत्रे कुरुक्षेत्रे।');
    expect(stub.mool[0]).not.toContain('।');
    expect(stub.padaccheda).toContain('धर्मक्षेत्रे');
    expect(stub.padaccheda).toContain('कुरुक्षेत्रे');
  });
});

describe('autoDecode — sandhi-undo on each chunk', () => {
  it('splits पाण्डवाश्चैव → पाण्डवाः · च · एव and notes the rules', () => {
    const stub = autoDecode('पाण्डवाश्चैव');
    expect(stub.padaccheda).toContain('पाण्डवाः');
    expect(stub.padaccheda).toContain('च');
    expect(stub.padaccheda).toContain('एव');
    expect(stub.sandhiNotes.length).toBeGreaterThan(0);
    expect(stub.sandhiNotes[0]).toContain('पाण्डवाश्चैव');
  });

  it('keeps a chunk intact when no sandhi recognised', () => {
    const stub = autoDecode('रामः');
    expect(stub.padaccheda).toEqual(['रामः']);
    expect(stub.sandhiNotes).toEqual([]);
  });
});

describe('autoDecode — vocabulary lookup', () => {
  it('fills wordParsings for words already in the corpus (e.g., च, एव, मामकाः)', () => {
    const stub = autoDecode('मामकाः च एव');
    expect(stub.wordParsings['च']).toBeDefined();
    expect(stub.wordParsings['एव']).toBeDefined();
    expect(stub.wordParsings['मामकाः']).toBeDefined();
  });

  it('marks unknown words as unknown in _wordConfidence', () => {
    const stub = autoDecode('xyzword');
    expect(stub._wordConfidence['xyzword']).toBe('unknown');
  });
});

describe('autoDecode — finite-verb signal detection', () => {
  it('flags अकुर्वत as a likely लङ् form', () => {
    const stub = autoDecode('अकुर्वत');
    expect(stub.finiteVerbs.length).toBeGreaterThan(0);
    const fv = stub.finiteVerbs[0];
    expect(fv.lakara).toMatch(/lan/);
  });

  it('flags भवति as a likely लट् present', () => {
    const stub = autoDecode('भवति');
    const fv = stub.finiteVerbs[0];
    expect(fv.lakara).toBe('lat');
    expect(fv.purusha).toBe('prathama');
  });

  it('flags भविष्यति as लृट् future', () => {
    const stub = autoDecode('भविष्यति');
    const fv = stub.finiteVerbs[0];
    expect(fv.lakara).toBe('lrt');
  });

  it('flags भुञ्जीय as विधिलिङ्', () => {
    const stub = autoDecode('भुञ्जीय');
    const fv = stub.finiteVerbs[0];
    expect(fv.lakara).toBe('vidhilin');
  });

  it('finite-verb candidates carry signal hints + low confidence', () => {
    const stub = autoDecode('भवति');
    const fv = stub.finiteVerbs[0];
    expect(fv.confidence).toBe('low');
    expect(fv.signal).toBeTruthy();
  });
});

describe('autoDecode — full mini-verse smoke', () => {
  it('handles the first half of Gītā 1.1 end-to-end', () => {
    const mool = 'धर्मक्षेत्रे कुरुक्षेत्रे समवेताः युयुत्सवः।';
    const stub = autoDecode(mool);
    expect(stub.padaccheda.length).toBe(4);
    expect(stub.padaccheda).toContain('समवेताः');
    expect(stub.padaccheda).toContain('युयुत्सवः');
    // समवेताः and युयुत्सवः are both in the corpus → vocab match
    expect(stub.wordParsings['समवेताः']).toBeDefined();
    expect(stub.wordParsings['युयुत्सवः']).toBeDefined();
  });
});

describe('stubToJs — paste-ready output', () => {
  it('produces a JS-literal block beginning with { and ending with },', () => {
    const stub = autoDecode('च एव');
    const js = stubToJs(stub, { chapter: 1, verse: 1, decodeIndex: 1 });
    expect(js).toMatch(/^\s*\{/);
    expect(js).toMatch(/\},\s*$/);
  });

  it('includes mool, padaccheda, and wordParsings in the output', () => {
    const stub = autoDecode('पाण्डवाश्च');
    const js = stubToJs(stub, { chapter: 1, verse: 1, decodeIndex: 1 });
    expect(js).toContain('mool:');
    expect(js).toContain('padaccheda:');
    expect(js).toContain('wordParsings:');
  });

  it('includes // TODO markers for fields the user must fill', () => {
    const stub = autoDecode('च एव');
    const js = stubToJs(stub, { chapter: 1, verse: 1 });
    expect(js).toContain('// TODO');
  });
});
