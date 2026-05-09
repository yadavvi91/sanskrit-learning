# Checkpoint 37 — popover bug, deeper engine work, bulk vocab fill

**Date:** 2026-05-09

## Trigger

Continuation of the trust-crisis arc from checkpoint-36. Two specific user complaints reopened the engine + UX work:

1. **`अपश्यत्स्थितान्` should be split** — the past-tense `-त्+C` compound boundary wasn't being separated, so verses still showed long unparsed compounds.
2. **Clicking padaccheda chips in Verse Journey did nothing** — auto-stub verses produce no `wordParsings`, and `WordPopover` had a bug that suppressed the popover entirely when `parsing` was null. The click was a silent no-op for ~676 verses.

After fixing those, a deeper third complaint surfaced:

3. **`कुरूनिति` (1.25) shows "no grammar data yet"** — even after splitting, only 1.6% of auto-stub padaccheda words had any sharedVocab entry. The vocab dictionary covered 93 hand-curated words against 4,027 distinct unknown words across the corpus.

## What changed

### Slice A — engine: past-tense compound splitter

[src/utils/decodeHelper.js](src/utils/decodeHelper.js) — new `tryPastTenseSplit` runs alongside the existing yan + nasal splitters. Generates `KNOWN_PAST_FORMS` from the 192-dhātu list (`अ` + presentStem + `त्/न्/त`). For any `्+C` boundary in a chunk, looks for the longest verb-form suffix of the LEFT side that's a known लङ् form. If matched, splits.

Cascade verified on Gītā 1.26:

```
before: तत्रापश्यत्स्थितान्पार्थः / पितॄनथ / पितामहान् / आचार्यान्मातुलान्भ्रातॄन्पुत्रान्पौत्रान्सखींः / तथा
after:  तत्र / अपश्यत् / स्थितान् / पार्थः / पितॄन् / अथ / पितामहान् / आचार्यान् / मातुलान् / भ्रातॄन् / पुत्रान् / पौत्रान् / सखींः / तथा
```

### Slice B — engine: कुरूनिति-style elided-matra nasal split

[src/utils/decodeHelper.js](src/utils/decodeHelper.js) — adds `ELIDED_MATRA_TAILS` and Pattern D in `splitNasalCompound`. When a chunk ends in `[long matra]+(निति|निव|नेव|नेते)`, restores the canonical -न् ending and emits the particle (इति/इव/एव/एते) as a separate word. Also fixed a recursion bug where Pattern C/D wasn't tried on the FINAL piece of multi-split chunks.

Verified on Gītā 1.25: `पश्यैतान्समवेतान्कुरूनिति` → `पश्यैतान् / समवेतान् / कुरून् / इति`.

### Slice C — UI: popover three-tier fallback

[src/components/WordPopover.jsx](src/components/WordPopover.jsx) — fixed the silent-no-op bug. `WordPopover` now has three layers:

1. `verse.wordParsings[word]` — hand-decoded full/browse-tier data (highest confidence)
2. `lookupSharedVocab(word)` — shared dictionary fallback (medium confidence, tagged `· dict`)
3. `EmptyPopover` — visible "no grammar data yet" panel for completely-unknown words

The click is never silent anymore; either you get real data or an honest acknowledgment of the gap.

### Slice D — bulk vocab fill (the big one)

8 parallel agents wrote per-chunk grammar entries for the 4,027 distinct unknown padaccheda words in the auto-stub corpus. Round-robin frequency-balanced split so each chunk has a mix of high- and low-frequency words. Output: `_vocab_extended_part{1..8}.js` (4,028 entries total).

[src/data/vocabulary-extended.js](src/data/vocabulary-extended.js) composes all 8 parts. [src/data/sharedVocab.js](src/data/sharedVocab.js) `lookupSharedVocab` now consults both maps with priority: `SHARED_VOCAB` → `VOCAB_EXTENDED`, with hyphen-stripped retries on each.

**Coverage shift:**

| State | chip-clicks with grammar data |
|---|---|
| Session start | 117 / 7,332 (1.6%) |
| After bulk fill | 7,188 / 7,332 (98.0%) |

Remaining 144 are agent-flagged `null` — sandhi-residue fragments that aren't standalone Sanskrit words (engine artifacts from imperfect padaccheda splitting, not vocab-data gaps). ~280 entries are inline-flagged `// AUDIT` for human review.

## Verification

- **Tests**: 491/491 passing (added: `सहारेड्Vocab` collision-priority test, `कुरून्` regression guard, plus the existing `WordPopover` empty-state and dict-fallback tests)
- **Build**: green (~890 KB raw / ~310 KB gzipped — over the warning threshold per prior directive, accepted)
- **Spot-checks**:
  - Gītā 1.26 fully decomposes into 14 padas
  - Gītā 1.25 fully decomposes; clicking कुरून् opens a popover with "noun · dict · the Kurus (acc. pl.) · root कुरु · masc. · बहुवचन · द्वितीया"

## What's still real

- ~280 entries flagged `// AUDIT` for human review — paraphrase-quality scope agreed with the user; bulk auditing is a long-tail effort
- 144 sandhi-residue fragments remain genuinely null — fixing them needs better sandhi splitting, not more vocab data
- The deeper engine fix (vocabulary-validated split candidates with full word-boundary lookup, beyond -त्/-न्/-य् patterns) is still open

## Lesson

The user's "do this using how much ever agents you need" was a clear signal that scope should track the size of the gap. Eight parallel agents on a 4,027-word task is heavyweight, but the alternative (incremental hand-add 14 entries at a time) was what triggered the user's frustration in the first place. Match the scope to the complaint.

## Commits this slice

- `434428f` popover three-tier fallback + EmptyPopover
- `239dd5a` past-tense -त्+C lexicon-validated splitter
- `ae6bd72` ELIDED_MATRA_TAILS (कुरूनिति → कुरून्+इति) + Mahābhārata cast in sharedVocab
- `f4def7c` VOCAB_EXTENDED wrapper scaffolding (empty)
- `28392a9` 4,028 vocab entries from 8 parallel agents → 98% chip-click coverage
- `d8c545b` कुरून् regression guard test
