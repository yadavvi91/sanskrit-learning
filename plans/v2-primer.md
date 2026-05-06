# Plan — Sanskrit Learning v2: Primer (Cold-Start Safety Net)

> **Promoted from v3 to v2.** Re-entry safety should precede daily-practice machinery (the [Practice plan](v3-practice-mode.md) is now v3).

## Context

The project's origin story is *re-entry failure* — the February 2023 Bibek Debroy notes that fell out of memory after a few months because there was nothing to come back to. v1 captures *content* (decoded verses + 23 patterns won) but not the *meta-knowledge* needed to read that content cold:

- "Which word is the finite verb?"
- "What does -ः mean again?"
- "Why is अन्वय SOV?"
- "Wait, what's a कृदन्त?"

After a 2–3 month gap, even the user's own decoded verses become opaque without this scaffolding. v2 builds the **Primer** — an on-demand reference that lets you re-enter the project without reloading every concept from scratch.

**Design rule (non-negotiable):** the primer must not overwhelm the main content. Verse Journey and Patterns Won stay clean. The primer is a *margin note*, not a chapter — available when wanted, invisible when not.

## Why this ships before Practice mode (v3)

Practice without re-entry safety is fragile: if you do daily SRS reviews for two weeks, then break for a month, you'll come back to cards you can't even parse. Doing the Primer *first* makes Practice robust.

## Decisions (recommended; flag if you'd rather another path)

| Decision | Choice | Reason |
|---|---|---|
| Primary surface | **Fourth tab: "Primer"** | One canonical place. Self-contained. Easy to navigate after a long break. |
| Inline help | **Small `?` triggers next to jargon** in Verse Detail + Patterns Won | "I'm staring at कृदन्त, what is that again?" → tap → 1-line definition + "open primer →" |
| Cold-start prompt | **Last-visit banner** if >14 days since last visit | Soft prompt: *"It's been a while — want a quick refresh?"* Dismissible. |
| Content source | **Curated from `sanskrit-reference.md` into structured JS data** | Single source of truth, consistent styling, easy to extend. Not free-form markdown. |
| Layout | **Single scrollable page with sticky TOC**, anchored sections | Like an `explainer.html` page — read top-to-bottom or jump to section via TOC. |

## Primer content (sections, in order)

Each section ~3–6 sentences + a small visual. Aimed at re-entry, not first-time learning.

1. **Why Sanskrit is hard to read at first** — free word order, case endings carry meaning, sandhi joins words. The decoder's job is to undo that.
2. **SOV vs SVO — the most important sentence** — Sanskrit/Hindi: I an apple eat. English: I eat an apple. *अन्वय always reorders to SOV.*
3. **The decode sequence** — पदच्छेद → अन्वय → हिंदी → English. One sentence per arrow + a worked mini-example (e.g. वृन्दावने कृष्णः).
4. **Finding the finite verb** — the sentence anchor. Endings to scan for (-ति/-मि for लट्, अ-…-त् for लङ्, -ष्य- for लृट्, -तु/-हि for लोट्, -यात्/-ीय for विधिलिङ्). The *giveaway test*: remove a word — does the sentence still work? Then it's not the finite verb.
5. **विभक्ति in one minute** — table of 8 cases with one-line meanings + an example token. Cross-link each row to a verse where it appears in your decoded set (e.g. *सप्तमी* → 2.4 *सङ्ख्ये*).
6. **लकार in one minute** — same treatment for the 5 Gita-essential लकार. Spotting signals + example tokens from decoded verses.
7. **Kṛdanta — what's NOT the finite verb** — absolutive (हत्वा), negative absolutive (अहत्वा), infinitive (भोक्तुम्), past passive participle (समवेताः). Why mistaking one for the finite verb is the #1 trap.
8. **विशेषण-विशेष्य — adjectives shadow their nouns** — सामानाधिकरण्य. Match लिंग + वचन + विभक्ति. Example: महानुभावान् ↔ गुरून्.
9. **Sandhi (just enough)** — *deferred deliberately*. The primer notes that you've decided to defer sandhi rules, links to where you'll pick this up later. No actual sandhi rules yet.
10. **पुरुष flip** — Sanskrit प्रथम = English 3rd person. One sentence. Trips everyone the first three times.
11. **Glossary** — every Sanskrit grammar term used in the app, alphabetized, one-line definition, link back to the section that explains it.

The primer should fit on roughly one full-page-scroll on a 13" laptop. If it grows beyond that, split into "Quick refresher" (the first 4 sections) + "Deeper reference" (the rest).

## Files to add

| File | Purpose |
|---|---|
| `src/components/Primer.jsx` | The primer tab. Sticky TOC on left, scrollable content on right. |
| `src/components/PrimerSection.jsx` | One section component — heading + body + optional table + optional cross-links. |
| `src/components/Glossary.jsx` | Reusable popover. Receives a `term` prop, looks up definition + primer-section anchor, renders trigger + popover. |
| `src/components/LastVisitBanner.jsx` | Reads/writes localStorage `lastVisitAt`. If >14 days, render a small dismissible banner at the top of the app. |
| `src/data/primer.js` | Structured content for all 11 sections. Each section: `{ id, title, body, table?, examples? }`. |
| `src/data/glossary.js` | Term → `{ shortDef, primerSectionId, examples? }`. |

## Files to modify

| File | Change |
|---|---|
| [src/App.jsx](src/App.jsx) | Add a **Primer** tab to the masthead. Mount `LastVisitBanner` above main content. Update localStorage on every mount. |
| [src/components/VerseDetail.jsx](src/components/VerseDetail.jsx) | Wrap section labels (पदच्छेद, क्रिया, विभक्ति, अन्वय, कृदन्त) with `<Glossary term="...">` so a `?` becomes available without disturbing the existing layout. |
| [src/components/PatternsWon.jsx](src/components/PatternsWon.jsx) | Same — wrap pattern names that contain jargon (e.g. "लङ् लकार identification") with Glossary triggers. |
| [src/styles.css](src/styles.css) | Add `.primer`, `.primer-toc`, `.glossary-trigger`, `.glossary-popover`, `.last-visit-banner` styles. Reuse existing parchment palette + fonts. |

## Behavior details

### Glossary popover
- Trigger: small `?` superscript next to the term (`.glossary-trigger`).
- Hover (desktop) or tap (mobile) opens the popover.
- Popover contains: term, 1-line definition, "open primer →" link that jumps to the relevant section + scrolls into view.
- Click outside or `Esc` closes.
- A11y: `aria-haspopup`, focusable trigger, `Esc` handling.

### Last-visit banner
- On mount, read `localStorage.lastVisitAt`. Diff against now.
- If >14 days OR no previous value, render banner: *"It's been {N} days — open the Primer for a 2-minute refresh?"*
- Banner has two buttons: **Open Primer** (switches view + dismisses) and **Dismiss** (sets `lastVisitAt = now`).
- Always update `lastVisitAt` to now on app exit (via `beforeunload`) so the next visit's diff is accurate.

### Cross-linking back to verses
- Each table row in the विभक्ति / लकार sections has an "as seen in" column with a clickable verse ref. Clicking it switches view to Verse Journey and selects that verse.
- This makes the primer *not* a dead reference — it stays connected to the user's actual decoded corpus.

## Verification

1. Open Primer tab — all 11 sections render, TOC links scroll into view.
2. Hover a jargon term in Verse Detail (e.g. *पदच्छेद*) — popover appears with definition + "open primer →" link. Click link — switches to Primer, scrolls to *Decode sequence* section.
3. In primer's विभक्ति table, click "*as seen in 2.4*" — switches to Verse Journey, opens 2.4 detail.
4. localStorage smoke test: clear, reload — banner shows ("first visit" copy). Click **Open Primer** — switches view, banner dismisses.
5. Set `localStorage.lastVisitAt = (Date.now() - 30*24*3600*1000).toString()`, reload — banner shows "*It's been 30 days*".
6. `npm run build` — clean. `npm run dev` — page loads, no console errors. Devanagari renders cleanly across all primer sections.

## Out of scope (v4+)

- Audio pronunciation for Sanskrit terms.
- Self-test mode on primer ("match the term to its definition").
- Localization of jargon explanations into other languages (Marathi, etc.).
- Linking outward to bvsiitm / Ashtadhyayi references.

## Sequencing (locked)

1. **v2 (this plan) first** — primer + last-visit banner.
2. **v3 (practice mode) second** — SRS + +1, building on a foundation the user can re-orient to.
