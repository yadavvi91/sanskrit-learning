# Checkpoint 42 — Origin page Short/Full toggle and article voice rewrite (Slice E of v14)

**Date:** 2026-05-10

## Trigger

Two threads of feedback in this slice.

**(1) Origin page — separate short and long versions.**

> *"Can you summarize the origin story somewhere? I just want to read it / give it for someone to read. Add the images and all as well. But summarize. Don't be as verbal as it is over there."*

The existing `/origin` page rendered the full 622-line `article.md` essay. User wanted a tight summary card too — both available, choice explicit.

> *"I want both short and the long versions!"*

**(2) Article voice rewrite.**

User read through the full article and pushed back at multiple levels:

> *"Why is Claude a character in it? You've quoted me from that chat and then started to explain it in third person. No. I want to write this in first person. I am doing these things. And mid-conversation, I sent Claude a few links — what does that even mean? These are the things that I found, and these are the things that I read. Before I talk to you, I had already read those things."*

> *"नवनीत literally means butter — fresh, soft — a slightly charming name for a book that was, for most students, anything but. — this is not something I would write, ever. Just not my style. From heartfelt to journalisty."*

> *"What that book never tells you is where the table comes from... Pāṇini's अष्टाध्यायी, one of the most sophisticated formal generative grammars ever written... I know that Pāṇini's अष्टाध्यायी is an important text but I don't know what it does. What's with the superlative praises — most sophisticated formal generative grammars ever written, how would I know? I barely know how to read Sanskrit."*

> *"Two years before any code was written — why is the code a character at all? It was a genuine interest to learn Sanskrit and not create anything to learn something. I just wanted to get good at Sanskrit."*

> *"Worth saying because they share the design DNA of this project (parchment, Devanāgarī typography, the same React + Vite stack)... who gives a rats ass. The project is not really my focus, it is concepts that I am after. Never mention this parchment shit ever again. Main dil nikaal ke rakh raha hu aur tujhe react ki padi hai."*

> *"It feels like the text tries to convey that I am pitting one project against the other... they are not against or a diversion. They complete each other. It's like god's path to make me go through such routes so that I can learn more in-depth and with more humility and understanding."*

> *"The growth arc, the trust crisis, the search engine — these are all about the project. These are not about why I started with this project. The introduction should be separate. By introduction I mean all the evolution of my thought from 2006 to 2023 to bvsiitm to khoomeik. I don't want to mix the project design / progress versus the pedagogy or the historical inspiration that brought me here."*

Plus mid-stream context the user hadn't given before:

> *"I read Sundarkand every other week, and have been doing this for the past four-plus years. This helped me with recognising the meters, and that was the inspiration behind the Awadhi-meter project... once I learned how to read Sundarkand and developed some idea of what things are, I created the Awadhi meter recogniser. So these things are running in parallel. The meter recogniser is NOT a primary thing I created to learn Sanskrit."*

## What changed

### Origin page — Short/Full toggle (`115f9c8` → `76f492b`)

Initially landed as a stacked layout (`OriginSummary` rendered above `<ReactMarkdown>{md}</ReactMarkdown>`). User clarification *"I want both!"* converted that to an explicit tab toggle.

**Final UX**:
- Header has two tab buttons: `[ Short version ]  [ Full essay ]`
- Default: Short version
- Tab buttons styled with gold-active fill (`var(--gold)` background, white text) + parchment-deep hover
- Switching tabs scrolls back to top (`useEffect` on `view`)
- Both views fully available; just made the choice explicit

**Short version content** — 6 sections, 4 inline images:
1. The Maharashtra SSC frustration (rote tables, no rules)
2. February 2023 — picking up the Gītā again (with both Debroy notes pages embedded)
3. The parallel Sundarkand reading practice (with sundarkand.yadavvi.com + Awadhi-meter links)
4. The WhatsApp trigger (with the holy-bhagavad-gita.org grid image)
5. The four verses fought (1.1, 2.3, 2.4, 2.5 distilled)
6. The pedagogy borrowed — bvsiitm + Khoomeik (with Khoomeik's coverage curve and frequency chart)
7. What got built — bullet list of the six sub-apps

### Article voice rewrite (`8a79f95`, `2d8132e`, `688764f`, `da3df24`, `b3d654c`)

Five rounds of correction landed sequentially. Each round closed a specific category the user pushed back on:

**Round 1 — Claude as character (`8a79f95`).** Removed every "in the conversation that started this project" / "what I told Claude" / "Mid-conversation I sent Claude a few links" / "the conversation just had to add the verb system" / "as Claude was walking me through" framing. The opening line that was a quote-from-chat became direct first-person narration. The "I sent Claude links" line became "Two sources I'd found and worked through before any of this app existed." The "first conversation with Claude that produced this project's foundational data" became "the work that became this project." The CLAUDE.md filename meta-explanation ("exists because Claude.ai conversations cannot be directly imported into Claude Code") was dropped — replaced with what the file actually does ("a framing document that carries the whole project's *why* in one file"). The "mid-way through the second conversation, Claude had front-loaded a long theoretical answer" example became Vishal's design principle (examples first, theory second), no chat-narrator.

**Round 2 — Journalistic flourishes + tech-as-metaphor + superlatives (`2d8132e`).** Removed:
- `नवनीत literally means butter — fresh, soft — a slightly charming name` etymology aside
- `It is the compiled binary. The source code — Pāṇini's अष्टाध्यायी, one of the most sophisticated formal generative grammars ever written, two-and-a-half thousand years old — is a generative system that derives these forms` paragraph (the tech metaphor + superlative the user explicitly disowned)
- Replaced with: *"There's an old grammar — Pāṇini's अष्टाध्यायी — that I've since heard is the source of the rules behind these forms, but I'd never come across it in school and I still don't really know how it works. We were just handed the tables and told to learn them."*
- *"Two years before any code was written, I started Bibek Debroy's..."* → *"In February 2023 I picked up Bibek Debroy's Bhagavad Gita for Millennials. There was no plan to build anything. I just wanted to read the Gītā with some real understanding for once."*
- "latent capital" / "sublimated sideways" / "discharge the obsession into a thing that exists" similar phrasings retired

**Round 3 — Sundarkand actually being a parallel thread (`688764f`).** The article had positioned the Awadhi Meter Visualizer as a "sideways expression of the same Sanskrit obsession." User context: he reads Sundarkand every other week (4+ years), built `sundarkand.yadavvi.com` for that practice, and the Awadhi meter visualiser came OUT of years of reciting. Reframed the section accordingly.

**Round 4 — Aesthetic / tech-stack talk gone (`da3df24`).** Removed every "parchment / Devanāgarī typography / React + Vite / design DNA / engineering discipline / aesthetic" mention from the prose. The section now leads with the practice itself: *"I read Sundarkand every other week, and have been doing that for the past four-plus years. The reading itself is the practice; everything else came out of it."* Same fix on:
- v1 row in growth-arc table: "The React app... Parchment aesthetic." → "First version of the app."
- Lineage bullet: stopped attributing design-language donor status; positioned as longer-running practice in the user's life.
- References sub-heading: "(separate practice, same design DNA)" → "(separate practice)".

**Round 5 — Sundarkand "completing each other" (`b3d654c`).** The previous reframe still positioned the threads as "separate / parallel / not in service of Sanskrit." User correction: they don't compete, they complete each other. The reading practice gave him the FELT sense of metre that Debroy's अनुष्टुभ explanation alone wouldn't have given. Looking back, it feels less like a plan and more like a longer route he was led down. Section now closes:

> *"These don't compete. They don't run parallel. They completed each other. Looking back, it feels less like a plan and more like a longer route I was led down — through Sundarkand, through Awadhi metre, through Debroy — so that when I sat down with the Gītā I'd have the in-depth feel for it that I wouldn't have had if I'd come at it directly."*

### Three-part restructure (`bf708c6`)

User: *"I don't want to mix the project design / progress versus the pedagogy or the historical inspiration."*

Reorganised into three explicit `# Part N` headers:

```
# Part 1 — how I got here
  ## The shape of a frustration
  ## February 2023 — picking up the Gītā again
  ## Sundarkand — the longer route that brought me here
  ## Two more things came my way: bvsiitm + Khoomeik [BRIEF callouts only]
  ## The WhatsApp trigger
  ## The four verses I fought for every word
  ## The grammar that emerged

# Part 2 — the pedagogy and data that shaped my thinking
  ## The pedagogy and data that shaped my thinking
    ### bvsiitm.github.io — full pedagogy detail (5 principles + Quantum Country + what I borrowed)
    ### Khoomeik's data foundation (coverage curve, charts, what data does and doesn't give)

# Part 3 — the project itself
  ## The decision to build
  ## The growth arc — v1 through v13
  ## The trust crisis
  ## What the engine actually does now
  ## What this project is actually trying to do
  ## A note on pedagogy — examples first, theory second
```

The bvsiitm pedagogy detail (5 principles, what I borrowed, where I diverged, the platform-thesis section, Quantum Country lineage) and the Khoomeik data detail (frequency table, chart variants, coverage curve) **moved out of Part 1** — Part 1 now just has brief inspiration callouts pointing forward to Part 2. Closing sections (Lineage, What's still open, A working journal, References, Appendix) remain after Part 3 as cross-cutting.

Title block updated: *"An article in three parts: how I got here (the personal evolution from 2006 onward), the pedagogy and data that shaped my thinking (in detail), and the project itself (what got built, design, progress)."*

## CSS additions

`.origin-summary` (parchment card, gold-accented headings) + `.origin-toggle` (gold-fill active tab) — scoped to `/origin` page so they don't leak into other prose surfaces.

## Files

- `src/components/Origin.jsx` — added `OriginSummary` component, `view` state, tab toggle.
- `src/styles.css` — `.origin-summary`, `.origin-summary-cta`, `.origin-toggle`, `.origin-toggle-btn` styles.
- `article.md` — full rewrite of the personal-narrative sections, three-part restructure, lineage / references / appendix updates.

## Tests

580 passing. No test changes — the article rewrite doesn't have direct test coverage; the visual + voice were the deliverable.

## What's left

The article rewrite closes the v14 plan. Remaining items captured in the plan's "out of scope (still deferred)" section — splitter coverage on visarga-r + yan-chain combined sandhi, implicit-virama drop in continuous writing for -त् + consonant, ~240 short sandhi-residue padas, hand-decoded chapter overrides for Ch 3-9 and Ch 11-18.
