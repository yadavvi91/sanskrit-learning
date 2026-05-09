# Checkpoint 35 — Śaṅkara commentary lane: every verse has a position card

**Date:** 2026-05-09

## What changed

Closes the genuine gap from checkpoint-34: the user's "EVERYTHING" included `टिप्पणी References — translations & commentaries` and I had only shipped translations. Commentary positions were self-deferred ("irresponsible to bulk-generate") which is paternalism — the user explicitly chose "Everything, paraphrase-flagged" via clarifying question and accepted the audit-required risk profile.

This slice adds a Śaṅkara (Advaita Vedānta) commentary card to every auto-stub verse. After this commit, `references.commentaries` is non-empty on all 701 verses (Śaṅkara from this slice, plus whatever the 25 hand-curated 'full'/'browse' verses already had).

## Files

```
src/data/
  _shankara_part1.js          — chapters 1–6, 280 entries
  _shankara_part2.js          — chapters 7–12, 209 entries
  _shankara_part3.js          — chapters 13–18, 212 entries
  commentaries-shankara.js    — wraps the three parts, exports SHANKARA_SUMMARIES
  hydrate.js                  — pushes a {sage:'Śaṅkara', school:'Advaita Vedānta',
                                summary} card into v.references.commentaries
                                on auto-stub verses; idempotent on re-run
  hydrate.test.js             — adds two assertions (Gītā 7.5 has Śaṅkara card +
                                global "every auto-stub has Śaṅkara")
```

VerseDetail.jsx already renders the disclaimer:
> "Summary based on the well-known Śaṅkara-tradition reading; not a direct quotation."

…on every commentary card, so the auditing intent is visible in the UI.

## Quality / risk profile

Each chapter range had a confidence breakdown reported by the agent. Synthesized:

- **High-confidence ranges** (~70-85% of entries): chapter 2 niṣṭhā distinction, chapter 3 karma-yoga preliminary, chapter 4 jñāna-agni, chapter 5 anti-agency, chapter 6.29-32 sarva-bhūta-stham ātmānam, chapter 7.4-5 parā/aparā prakṛti, chapter 9.4-5 na ca matsthāni, chapter 10 catuḥ-ślokī area, chapter 13 kṣetra/kṣetrajña, chapter 18.50 jñāna-niṣṭhā culmination.
- **Medium confidence** (~15-25%): chapter 1 (Śaṅkara genuinely says little), chapter 4.1-12 avatāra section, chapter 6.10-17 dhyāna-vidhi, chapter 11 viśvarūpa stuti (Śaṅkara's bhāṣya is mostly word-gloss there), chapter 8 technical compressions, chapter 17.26-28 OM TAT SAT, chapter 18.74-78 Sañjaya frame verses.
- **Audit-priority** (~5%): 1.10 apāryapta/paryāpta, 4.16-18 kim-karma-kim-akarma, 6.46 jñānī-as-scholar reading, 18.66 sarvadharmān parityajya (the famous final-mokṣa verse — Advaita reads tightly here).

The user has the Decode Helper UI to promote per-verse from auto-stub → browse → full once reviewed.

## Verification

- 486 tests pass (was 484; added 2 Śaṅkara coverage assertions)
- Build: ~880 KB raw / ~298 KB gzipped (warning accepted)
- Spot-check: Gītā 18.66 → "Abandoning all dharmas, take refuge in me alone; I shall liberate you from all sins — do not grieve."

## State of EVERYTHING

| Field | Source for auto-stub | Coverage |
|---|---|---|
| मूल | hand + bulk | 701/701 |
| पदच्छेद | autoDecode | 701/701 |
| क्रिया | autoDecode finiteVerbs | 701/701 |
| English | Annie Besant 1895 | 701/701 |
| `references.translations` | Edwin Arnold 1885 | 701/701 |
| `references.commentaries` | **Śaṅkara/Advaita** ← this slice | 701/701 |
| हिंदी | modern Hindi gloss | 701/701 |
| अन्वय | bulk-generated SOV | 701/701 |
| विभक्ति notes | bulk-generated | 701/701 |
| विवेकः (keyFights) | bulk-generated | 701/701 |
| व्याख्या | bulk-generated | 701/701 |
| स्वमतम् | localStorage UI feature | n/a |

The "EVERYTHING" pass is now genuinely done. Audit is the next, slower phase — that happens per-verse via the Decode Helper.

## Out of scope (still deferred, honestly named)

- **Other commentary traditions** (Rāmānuja/Viśiṣṭādvaita, Madhva/Dvaita): one-tradition coverage is the meaningful first cut. Adding a second tradition is a future slice with the same agent pattern.
- **Audit pass on bulk-generated content**: the entire enriched corpus needs eventual human review. The Decode Helper is designed for this.
- **Tier promotion**: enriched verses stay tier='auto-stub' until reviewed.
