# Plan v9 — Decode Helper: paste mool, get a stub

> Sequels v8 (Reading Workbench). v8 made decoding faster *during* the work; v9 makes the *blank-page* problem easier. Paste a Gītā verse's mool → engine runs sandhi-undo + word-pattern matching against the existing parsings library + finite-verb spotting → generates a stub verse-data structure. The user audits the stub instead of building it from scratch.

## Context

The v8 workbench (sandhi engine + word popovers + vocabulary + vocab cards) made *active* decoding fast. But starting a new verse is still blank-page: you stare at the mool, hand-undo sandhi, hand-list padaccheda, hand-tag every word.

What we now have that we didn't have 24 hours ago:
- **Sandhi engine** — given a mool string, produces candidate padaccheda automatically (`undoSandhi`)
- **Vocabulary index** — every word the user has met, with its parsing
- **Conjugator + Lakāra signals** — given a form, can identify likely lakāra by ending shape

These three combine into a real auto-stub. Run the engine on `पाण्डवाश्चैव` → padaccheda includes `च`, `एव`, `पाण्डवाः`. Look up `च` in the vocabulary → particle, "and". Look up `एव` → particle, "only". Identify `अकुर्वत` by its `-त-` ending + `अ-` prefix → likely लङ् prathama bahu. Stub out the rest.

The user audits, fills in what the engine couldn't infer (translations, key fights, samāsa types, references), and now has a fully-decoded verse in 15 minutes instead of 60.

## Decisions locked

| Decision | Choice | Reason |
|---|---|---|
| Output format | A JS data block paste-ready for `verses.js` | Same shape verses already use; user pastes in directly |
| Scope of auto-inference | Sandhi-undo + vocabulary-lookup + finite-verb-by-signal | Three engines we already have. Anything beyond is v10+. |
| Confidence indicator | Per-field annotation: `✓` confident, `?` uncertain, `✗` user-must-fill | Signals where the user must focus their audit |
| Where it lives | Top-level **Decode** tab next to **Words** | Workflow tool, deserves first-class status |

## Implementation slices

### Slice 0 — This plan-doc

`plans/v9-decode-helper.md` committed alone.

### Slice 1 — Engine: `src/utils/decodeHelper.js` + tests

Pure function: `autoDecode(mool: string, opts?) → DecodedStub`.

Steps:
1. Strip shloka punctuation (`।`, `॥`, line breaks) → joined string
2. Run `undoSandhi` on each space-separated chunk → padaccheda candidate
3. For each pada, lookup in the vocabulary index (every word any decoded verse has parsed) → fill `wordParsings[word]` with confidence
4. Detect finite verbs by ending signals — `-ति`, `-मि`, `-त्`, `-ष्यति`, `-तु`, `-एत्` — and tentatively assign lakāra
5. Return:
   ```js
   {
     mool: [...],
     padaccheda: [...],
     wordParsings: { ... },     // filled where vocabulary matches
     finiteVerbs: [...],        // detected by signal, low confidence
     sandhiNotes: [...],         // from the rules applied
     samasNotes: [],            // empty — user fills
     vibhaktiNotes: [],         // empty
     keyFights: [],             // empty
     anvaya: '',                // empty
     hindi: '', english: '',    // empty
     references: { translations: [], commentaries: [] },
     _confidence: { ... },      // per-field annotation
   }
   ```

Tests:
- `autoDecode("धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः")` → padaccheda has 4 elements, 3 of them already in vocab
- Sandhi-undo runs on each chunk
- Finite verb detection: `अकुर्वत` flagged as likely लङ्
- Empty / whitespace input returns empty stub
- Confidence annotations populate correctly

### Slice 2 — UI: `src/components/DecodeHelper.jsx`

A two-panel layout:
- Left: textarea for mool input + a "Run autodecode" button
- Right: the generated stub displayed pretty (mool lines, padaccheda chips with confidence colours, parsings, etc.)
- Bottom: "Copy as JS data" button → puts the stub on the clipboard formatted as a `verses.js` entry

Confidence colours:
- green border on chips with high-confidence parsings (vocab match)
- amber on uncertain (signal-detected verbs, etc.)
- gray on unknown words

### Slice 3 — Route + masthead

Add `/decode` route in App.jsx. Add **Decode** tab between Words and Primer. Done.

## Files

| File | Slice | Change |
|---|---|---|
| `plans/v9-decode-helper.md` (new) | 0 | This plan |
| `src/utils/decodeHelper.js` (new) | 1 | The engine |
| `src/utils/decodeHelper.test.js` (new) | 1 | Tests |
| `src/components/DecodeHelper.jsx` (new) | 2 | The UI |
| `src/App.jsx` | 3 | New tab + route |
| `src/styles.css` | 2 | Decode-helper styling |
| `checkpoint-23.md` ... `checkpoint-25.md` | per slice | Narrative |

## Verification

End-to-end:
1. Paste `धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः। मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय॥`
2. Engine produces padaccheda with `पाण्डवाः · च · एव` correctly split (sandhi-undo)
3. `च`, `एव`, `मामकाः`, `सञ्जय` get vocab-matched parsings (already in our corpus from 1.1)
4. `अकुर्वत` flagged as likely लङ् by the `अ-` prefix + `-त` ending
5. Click "Copy as JS" → output is paste-ready for `verses.js`

## Out of scope (v10+)

- Translation auto-generation
- Commentary auto-summarising
- Lexicon-backed parsing (ambush of unrecognised words)
- Causative/passive/desiderative recognition
- Multi-line meter (अनुष्टुभ्) detection beyond stripping punctuation
