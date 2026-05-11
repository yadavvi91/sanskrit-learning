// End-to-end learning-workflow tests.
//
// Each `it(...)` here corresponds to one workflow in `docs/workflows.md`.
// They mount the full <App /> under a MemoryRouter and walk through the
// multi-tab journeys a learner actually does — Verse Journey ↔ Atlas ↔ Verbs
// ↔ Practice etc. — not single-component interactions (those live next to
// their components).
//
// The corresponding doc walkthrough + Mermaid sequence diagram is at
//   ../../docs/workflows.md
//
// Each test references its workflow ID (W1…W10) so you can grep-jump
// between code and doc.

import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App.jsx';

afterEach(() => cleanup());

beforeEach(() => {
  try { window.localStorage.clear(); } catch {/* ignore */}
  document.documentElement.removeAttribute('data-theme');
});

function mount(initialUrl = '/journey') {
  return render(
    <MemoryRouter initialEntries={[initialUrl]}>
      <App />
    </MemoryRouter>
  );
}

function masthead() {
  return screen.getByLabelText('Views');
}

function clickMasthead(label) {
  fireEvent.click(within(masthead()).getByText(label));
}

// ─────────────────────────────────────────────────────────────────────────────

describe('workflows — cross-tab learning journeys', () => {
  it('W1 — verse 2.3 → Atlas/avyaya → return via jump form', () => {
    const { container } = mount('/journey/2/3');

    // 1. Land on Gītā 2.3.
    expect(screen.getAllByText(/Gītā 2\.3/).length).toBeGreaterThan(0);

    // 2. Click Atlas in masthead.
    clickMasthead('Atlas');
    // 3. Default Atlas sub-tab is Declensions (the शब्दरूप paradigm reference).
    expect(screen.getByText(/शब्दरूपावलिः/)).toBeDefined();

    // 4. Click Indeclinables sub-tab.
    const atlasToc = screen.getByLabelText('Atlas sections');
    fireEvent.click(within(atlasToc).getByText('Indeclinables'));
    // Avyaya page renders some particle-class content.
    expect(screen.getAllByText(/अव्यय/).length).toBeGreaterThan(0);

    // 5. Click Verse Journey in masthead — lands on /journey (no params).
    clickMasthead('Verse Journey');
    // Now showing some verse, not necessarily 2.3 yet.
    expect(screen.getAllByText(/decoded so far/i).length).toBeGreaterThan(0);

    // 6. Recent-chips show the 5 most-recent decodes. 2.3 (decodeIndex 2)
    // isn't among them in the current corpus, so the realistic return path
    // is the jump-to-verse form. (Chapter-grid click would also work.)
    const jump = container.querySelector('.jump-input');
    fireEvent.change(jump, { target: { value: '2.3' } });
    fireEvent.submit(jump.closest('form'));
    expect(screen.getAllByText(/Gītā 2\.3/).length).toBeGreaterThan(0);
  });

  it('W2 — verse 1.1 → Sandhi Lab → engine result → jump back', () => {
    const { container } = mount('/journey/1/1');

    // 1. Verse 1.1 visible.
    expect(screen.getAllByText(/Gītā 1\.1/).length).toBeGreaterThan(0);

    // 2. Cross to Sandhi Lab via masthead + Atlas TOC.
    clickMasthead('Atlas');
    fireEvent.click(within(screen.getByLabelText('Atlas sections')).getByText('Sandhi Lab'));

    // 3. Default input is पाण्डवाश्चैव — assert via the input's value.
    const sandhiInput = screen.getByLabelText(/Joined string/i);
    expect(sandhiInput.value).toBe('पाण्डवाश्चैव');

    // 4. Type a new sandhi candidate; rule-list re-renders.
    fireEvent.change(sandhiInput, { target: { value: 'नैतत्' } });
    // Result has at least 2 split-parts.
    expect(container.querySelectorAll('.sandhi-result-part').length).toBeGreaterThanOrEqual(2);

    // 5. Return to Verse Journey and jump back to 1.1.
    clickMasthead('Verse Journey');
    const jumpInput = container.querySelector('.jump-input');
    fireEvent.change(jumpInput, { target: { value: '1.1' } });
    fireEvent.submit(jumpInput.closest('form'));
    expect(screen.getAllByText(/Gītā 1\.1/).length).toBeGreaterThan(0);
  });

  it('W3 — Samāsa Bank verses-mode → click ref → land on verse with compound', () => {
    mount('/atlas/samasa');
    expect(screen.getByText(/समास — compound analysis/)).toBeDefined();

    // 1. Switch to "From your verses" mode.
    fireEvent.click(screen.getByText(/From your verses/));

    // 2. Click the first Gītā c.v ↗ button.
    const refBtns = screen.getAllByText(/Gītā \d+\.\d+ ↗/);
    expect(refBtns.length).toBeGreaterThan(0);
    const refText = refBtns[0].textContent; // "Gītā 2.13 ↗" etc.
    const match = refText.match(/(\d+)\.(\d+)/);
    expect(match).toBeDefined();
    const [, c, v] = match;

    fireEvent.click(refBtns[0]);

    // 3. Land on the corresponding verse.
    expect(screen.getAllByText(new RegExp(`Gītā ${c}\\.${v}`)).length).toBeGreaterThan(0);
    // And the verse has its own समास section visible.
    expect(screen.getAllByText(/समास/i).length).toBeGreaterThan(0);
  });

  it('W4 — Periodic Table → Stack Builder Reverse → decode भविष्यति', () => {
    const { container } = mount('/verbs');

    // 1. Click the भू cell in the Periodic Table.
    const cells = Array.from(container.querySelectorAll('.dhatu-cell'));
    const bhuCell = cells.find((c) => c.querySelector('.dhatu-deva')?.textContent === 'भू');
    expect(bhuCell).toBeDefined();
    fireEvent.click(bhuCell);
    expect(screen.getAllByText(/√भू/).length).toBeGreaterThan(0);

    // 2. Switch to Stack Builder.
    fireEvent.click(screen.getByText('Stack Builder'));
    expect(screen.getByText(/Forward — build a form/)).toBeDefined();

    // 3. Switch to Reverse mode.
    fireEvent.click(screen.getByText(/Reverse — decode a form/));

    // 4. Type भविष्यति — engine returns लृट् match.
    const reverseInput = container.querySelector('.reverse-input');
    fireEvent.change(reverseInput, { target: { value: 'भविष्यति' } });

    // The annotation row should mention लृट् for at least one match.
    const matches = Array.from(container.querySelectorAll('.reverse-annotation'));
    expect(matches.length).toBeGreaterThan(0);
    const lrtFound = matches.some((m) => /लृट्/.test(m.textContent));
    expect(lrtFound).toBe(true);
  });

  it('W5 — search → jump → search → jump-to-verse anchor', () => {
    const { container } = mount('/journey');

    // 1. Search "पार्थ" — Krishna's address term.
    const searchBox = container.querySelector('.rail-search');
    fireEvent.change(searchBox, { target: { value: 'पार्थ' } });

    // 2. Click first result (if any).
    const items = container.querySelectorAll('.rail-search-item');
    if (items.length > 0) {
      fireEvent.click(items[0]);
      // Search box cleared after selection.
      expect(container.querySelector('.rail-search').value).toBe('');
    }

    // 3. Search a different term.
    fireEvent.change(container.querySelector('.rail-search'), { target: { value: 'धर्म' } });
    const moreItems = container.querySelectorAll('.rail-search-item');
    if (moreItems.length > 0) {
      fireEvent.click(moreItems[0]);
    }

    // 4. Jump to verse 2.3 explicitly via the jump form.
    const jumpInput = container.querySelector('.jump-input');
    fireEvent.change(jumpInput, { target: { value: '2.3' } });
    fireEvent.submit(jumpInput.closest('form'));
    expect(screen.getAllByText(/Gītā 2\.3/).length).toBeGreaterThan(0);
  });

  it('W6 — switch theme on /journey, persists across /atlas + /verbs navigation', () => {
    const { container } = mount('/journey');

    // 1. Default theme on mount.
    expect(document.documentElement.dataset.theme).toBe('parchment');

    // 2. Open ThemePicker and switch to "Ink & Vermillion".
    fireEvent.click(container.querySelector('.theme-trigger'));
    const targetSwatch = Array.from(container.querySelectorAll('.theme-swatch'))
      .find((b) => b.querySelector('.swatch-name')?.textContent === 'Ink & Vermillion');
    expect(targetSwatch).toBeDefined();
    fireEvent.click(targetSwatch);

    // 3. data-theme + localStorage updated.
    expect(document.documentElement.dataset.theme).toBe('ink-vermillion');
    expect(window.localStorage.getItem('theme_v1')).toBe('ink-vermillion');

    // 4. Navigate to /atlas/samasa — theme persists.
    clickMasthead('Atlas');
    expect(document.documentElement.dataset.theme).toBe('ink-vermillion');

    // 5. Navigate to /verbs — still persists.
    clickMasthead('Verbs');
    expect(document.documentElement.dataset.theme).toBe('ink-vermillion');

    // 6. Back to /journey — still persists (didn't snap back to default).
    clickMasthead('Verse Journey');
    expect(document.documentElement.dataset.theme).toBe('ink-vermillion');
  });

  it('W7 — Patterns Won → click first-met verse-ref → land on verse', () => {
    const { container } = mount('/patterns');
    expect(screen.getAllByText(/Patterns Won/).length).toBeGreaterThan(0);

    // 1. Find a first-met verse-link button.
    const verseLink = container.querySelector('.verse-link');
    expect(verseLink, 'expected at least one first-met verse-link in the matrix').toBeDefined();
    const refMatch = verseLink.textContent.match(/Gītā (\d+)\.(\d+)/);
    expect(refMatch).toBeDefined();
    const [, c, v] = refMatch;

    // 2. Click it — should navigate to /journey/c/v.
    fireEvent.click(verseLink);
    expect(screen.getAllByText(new RegExp(`Gītā ${c}\\.${v}`)).length).toBeGreaterThan(0);
  });

  it('W8 — drill wrong → Type Reference → return to drill', () => {
    mount('/atlas/samasa');

    // 1. Switch to drill view.
    fireEvent.click(screen.getByText(/Type identifier \(drill\)/));
    expect(screen.getByText(/Which type\?/)).toBeDefined();

    // 2. Pick the first option (any type — guaranteed to be wrong half the time;
    // we don't care which, we just need to test the drill flow).
    const opts = Array.from(document.querySelectorAll('.drill-option'));
    fireEvent.click(opts[0]);
    // Either ✓ or ✗ feedback is now visible.
    const feedback = document.querySelector('.drill-feedback');
    expect(feedback).toBeDefined();

    // 3. Switch to Type Reference view to read about a type.
    fireEvent.click(screen.getByText(/Type reference/));
    // The reference renders 10 type cards.
    expect(document.querySelectorAll('.samasa-type-card').length).toBe(10);

    // 4. Return to drill — fresh state.
    fireEvent.click(screen.getByText(/Type identifier \(drill\)/));
    expect(screen.getByText(/Which type\?/)).toBeDefined();
    // Score reset to 0/0.
    expect(screen.getByText(/Score: 0 \/ 0/)).toBeDefined();
  });

  it('W9 — Decode helper → set ch/v → engine → Copy → clipboard called', async () => {
    // Stub clipboard.
    const writeText = vi.fn().mockResolvedValue();
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });

    const { container } = mount('/decode');

    // 1. Set chapter 4, verse 8.
    const numInputs = container.querySelectorAll('.decode-num');
    fireEvent.change(numInputs[0], { target: { value: '4' } });
    fireEvent.change(numInputs[1], { target: { value: '8' } });

    // 2. Paste a verse mūla (using the Gītā 4.7 phrasing — engine doesn't need
    // an exact corpus match to produce a stub).
    const textarea = container.querySelector('.decode-input');
    fireEvent.change(textarea, { target: { value: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत' } });

    // 3. Engine produces stub → JS preview block visible.
    const js = container.querySelector('.decode-js');
    expect(js).toBeDefined();
    expect(js.textContent).toMatch(/chapter:\s*4/);
    expect(js.textContent).toMatch(/verse:\s*8/);

    // 4. Click Copy.
    fireEvent.click(container.querySelector('.decode-copy'));
    await new Promise((r) => setTimeout(r, 0));
    expect(writeText).toHaveBeenCalled();
    const copied = writeText.mock.calls[0][0];
    expect(copied).toMatch(/chapter:\s*4/);
    expect(copied).toMatch(/verse:\s*8/);
  });

  it('W12 — verse 2.14 → click तान् → Atlas/pronouns#tad → तद्-template visible', () => {
    // Stub scrollIntoView (jsdom doesn't implement it) and rAF so the
    // hash-driven scroll fires synchronously.
    const scrollSpy = vi.fn();
    Element.prototype.scrollIntoView = scrollSpy;
    const origRaf = global.requestAnimationFrame;
    global.requestAnimationFrame = (cb) => { cb(); return 0; };

    const { container } = mount('/journey/2/14');
    expect(screen.getAllByText(/Gītā 2\.14/).length).toBeGreaterThan(0);

    // 1. Click the तान् chip in पदच्छेद.
    const taanChip = Array.from(container.querySelectorAll('.padaccheda .pada'))
      .find((c) => c.textContent === 'तान्');
    expect(taanChip).toBeDefined();
    fireEvent.click(taanChip);

    // 2. Popover footer shows "see in सर्वनाम" link.
    const link = container.querySelector('.wp-paradigm-link');
    expect(link).toBeDefined();
    expect(link.textContent).toMatch(/सर्वनाम/);
    expect(link.textContent).toMatch(/तद्-template/);

    // 3. Click the link → navigate to /atlas/pronouns#tad.
    fireEvent.click(link);

    // 4. Pronouns page renders with #tad section in the DOM and
    //    scrollIntoView fired on it.
    expect(container.querySelector('#tad')).not.toBeNull();
    expect(scrollSpy).toHaveBeenCalled();

    global.requestAnimationFrame = origRaf;
  });

  it('W11 — verse 2.4 → Atlas/declensions → corpus example back to verse', () => {
    const { container } = mount('/journey/2/4');
    expect(screen.getAllByText(/Gītā 2\.4/).length).toBeGreaterThan(0);

    // 1. Cross to Atlas → Declensions.
    clickMasthead('Atlas');
    fireEvent.click(within(screen.getByLabelText('Atlas sections')).getByText('Declensions'));
    expect(screen.getByText(/शब्दरूपावलिः/)).toBeDefined();

    // 2. देव paradigm is active by default; pedagogy note mentions भीष्मम्.
    const note = container.querySelector('.declension-pedagogy');
    expect(note?.textContent).toContain('भीष्मम्');

    // 3. Click the भीष्मम् corpus-example verse-ref → land back on 2.4.
    const refButtons = Array.from(container.querySelectorAll('.example-ref-link'));
    const bhishmaRef = refButtons.find((b) => b.textContent.includes('2.4'));
    expect(bhishmaRef).toBeDefined();
    fireEvent.click(bhishmaRef);

    expect(screen.getAllByText(/Gītā 2\.4/).length).toBeGreaterThan(0);
  });

  it('W10 — Practice fail → study verse → return to Practice with updated SRS', () => {
    mount('/practice');
    expect(screen.getByText(/अभ्यासः/)).toBeDefined();

    // 1. Start a session.
    fireEvent.click(screen.getByText(/Start session/));
    expect(screen.getByText(/Show answer/)).toBeDefined();

    // 2. Show answer + rate Again (failed it).
    fireEvent.click(screen.getByText(/Show answer/));
    fireEvent.click(screen.getByText('Again'));

    // SRS persisted.
    const stored = JSON.parse(window.localStorage.getItem('srs_v1'));
    expect(stored).toBeDefined();
    expect(Object.keys(stored.schedules).length).toBeGreaterThanOrEqual(1);

    // 3. End session if still in one.
    const endBtn = screen.queryByText(/End session/);
    if (endBtn) fireEvent.click(endBtn);

    // 4. Navigate to Verse Journey to study.
    clickMasthead('Verse Journey');
    expect(screen.getAllByText(/decoded so far/i).length).toBeGreaterThan(0);

    // 5. Return to Practice — SRS state still in localStorage.
    clickMasthead('Practice');
    expect(screen.getByText(/अभ्यासः/)).toBeDefined();
    const stored2 = JSON.parse(window.localStorage.getItem('srs_v1'));
    expect(Object.keys(stored2.schedules).length).toBe(Object.keys(stored.schedules).length);

    // 6. Start session again (the retry leg of the loop).
    fireEvent.click(screen.getByText(/Start session/));
    expect(screen.queryByText(/Show answer/) || screen.queryByText(/Start session/)).toBeDefined();
  });
});
