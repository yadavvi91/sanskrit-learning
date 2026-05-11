# Checkpoint 41 — UX nav, scroll preservation, compound popover priority (Slice D of v14)

**Date:** 2026-05-10

## Trigger

Three independent UX complaints from the user reading-walk:

1. **No prev/next between verses.** *"Can we add prev and next buttons somewhere on the page to quickly read one verse after the other?"* Reading the Gītā end-to-end required mouse-clicking each verse in the sidebar grid.

2. **Scroll didn't preserve across navigation.** *"When I scroll such that the header is no longer visible, I can see all the way till the English translation. So when I move next, I should not have to scroll again to see the translation."* The page reset to scroll-top on every verse change.

3. **`परम-इष्वासः` / `धृष्टद्युम्नः` popover showed generic suffix-fallback.** *"What kind of meaning is 'a-stem nominative singular (m) — likely subject form'?"* Hyphenated compounds with non-vocab stems hit the suffix-fallback for the WHOLE form (`परम-इष्वासः`) before the per-component decomposition fired. The user saw the bare "a-stem nom sg" template instead of "परम (supreme) + इष्वासः (archer)".

Plus iteration on the nav UX itself:
4. *"This wastes vertical space, which is extremely expensive. Add small icons somewhere such that they are inconspicuous."* (initial bulky bars → floating icons)
5. *"At least keep left right on different sides lol."* (stacked-on-right → split left/right)

## What changed

### Verse navigation UI (`32f2769` → `038b001` → `5bff2b0` → `e4f4459`)

Iterated through three designs:

1. **First attempt** — `VerseNavBar` rendered above and below `VerseDetail`. Two horizontal bars with `[← prev]  [Gītā N.M]  [next →]` chips. **Rejected** by user as "wasting vertical space."
2. **Second attempt** — single floating chevron pair, both stacked on the right edge. **Rejected** by user — *"keep left right on different sides."*
3. **Final** — two separate `position: fixed` chevron buttons (`‹` on left edge at `12px`, `›` on right edge at `12px`), both vertically centered. 30×30 circular, `var(--parchment)` background, gold border on hover, opacity 0.55 default → 1.0 on hover. Disabled at 0.2 opacity on Gītā 1.1 (prev) and Gītā 18.78 (next). Hover title previews the destination ("← Gītā 1.10" / "Gītā 1.12 →"). aria-labels for screen readers. Wraps across chapter boundaries (last verse of chapter N → first of chapter N+1).

### Arrow-key keyboard navigation (`e4f4459`)

Window-level `keydown` listener in `VerseJourney`. `←` / `→` advance through verses with the same chapter-wrap logic. Ignored when:
- A text input or textarea has focus (so search-box typing still works)
- Any modifier key is held (Cmd / Ctrl / Alt / Shift — so browser shortcuts like Cmd+→ pass through)
- `e.preventDefault()` on the navigate so the page doesn't horizontally scroll.

### Scroll preservation (`4df5d32` first attempt, `19fb8b3` actual fix)

**First attempt** captured `window.scrollY` before `navigate()` and restored via two `requestAnimationFrame` calls in `VerseJourney`. **Didn't work**: the user came back saying *"it still resets — what did you even solve?"*

**Root cause**: `App.jsx`'s `ScrollToTop` component had a `useLayoutEffect` on `pathname` that unconditionally reset scroll to 0 on every route change. It ran AFTER the rAF restore in `VerseJourney`, overriding it.

**Actual fix**: `ScrollToTop` now tracks the previous path via `prevPathRef`. When both prev and current pathnames start with `/journey/` (verse-to-verse navigation), the reset is skipped entirely. Other route changes (journey → atlas → primer) still reset to 0 as before.

Applies to all three navigation paths:
- Chevron icons (left/right edges)
- Sidebar verse clicks
- Arrow-key keyboard nav

User scenario it solves: scroll down past the header to view the अन्वय / English translation → click `→` or press right-arrow → next verse loads at the same scroll position so the equivalent section is immediately visible.

### Compound popover priority (`e4f4459`)

`WordPopover` previously gated `decomposeCompound` on `effectiveParsing` being null. Once the suffix-fallback started returning entries for hyphenated forms (`परम-इष्वासः` → "a-stem nominative singular (m) — likely subject form"), the per-component breakdown never ran.

**Fix**: when `effectiveParsing.source === 'suffix-inferred'` AND the word contains a hyphen, prefer `decomposeCompound`'s richer per-part view. Authoritative parsings (verse-local hand-decoded `wordParsings`, real `SHARED_VOCAB` / `CORE_VOCAB` / `VOCAB_EXTENDED` entries) still win.

Effect for the user's specific complaints:
- `परम-इष्वासः` → CompoundPopover with **परम (supreme) + इष्वासः (archer)** — both components in vocab.
- `धृष्टद्युम्नः` → with the explicit coreVocab entry added in this slice, paradigm classifier produces "follows देव-class" link directly (no need for compound decomposition).

Same fix automatically benefits every other suffix-fallback-only hyphenated compound across the corpus.

### `defective √अह्` family → vocab (`19fb8b3`)

User flagged `आह` showing "no grammar data yet." The defective family was hard-coded in `decodeHelper.js`'s `DEFECTIVE_AH_FORMS` map (engine classifier path) but missing from the vocab dictionaries. Added explicit entries for आह / आहतुः / आहुः / प्राह / प्राहुः to coreVocab. Popovers now show "perfect 3sg/3du/3pl of defective √अह्" with proper gloss.

## CSS additions

```css
/* Floating chevrons — left + right edges */
.verse-nav-chev {
  position: fixed; top: 50%; transform: translateY(-50%);
  width: 30px; height: 30px; border-radius: 50%;
  background: var(--parchment); border: 1px solid var(--rule);
  color: var(--ink-soft); cursor: pointer;
  font-size: 18px; opacity: 0.55; z-index: 50;
  transition: opacity 0.15s, color 0.15s, border-color 0.15s, background 0.15s;
}
.verse-nav-chev-left  { left: 12px; }
.verse-nav-chev-right { right: 12px; }
.verse-nav-chev:hover:not(:disabled) {
  opacity: 1; color: var(--gold); border-color: var(--gold);
}
.verse-nav-chev:disabled { opacity: 0.2; cursor: not-allowed; }
```

## Tests

- 580 passing across 40 files.
- `WordPopover.test.jsx` updated for the "no parsing" case to use a 2-char input (अज) below the suffix-inferrer's threshold.
- Routing tests still pass (no new route additions; just behavior on existing `/journey/:chapter/:verse`).

## What's left for later slices

- Article voice rewrite + Origin page (Short/Full toggle, three-part restructure). [Slice E](checkpoint-42.md).
- Many short sandhi-residue fragments (`हः`, `शाः`, `संः`, `इन`, `अ`) still don't resolve — splitter problem, separate workstream.
