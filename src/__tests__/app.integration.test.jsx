// App-level integration tests. Mount the full <App /> tree under a
// MemoryRouter and exercise the click-through workflows that the
// component-level tests can't see: masthead navigation, deep links,
// cross-tab callbacks (Samāsa Bank → verse, Verbs → DhatuDetail), Atlas
// sub-tab navigation via the URL, and the 404 fallback.
//
// Why this file exists: routing.test.jsx mounts each route and asserts
// "the component shows up" — which catches typos in the <Route> tree
// but not the actual user flow ("click X, end up on URL Y, see Z").
// The user flagged that gap directly.

import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import { render, screen, fireEvent, cleanup, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App.jsx';

afterEach(() => cleanup());

beforeEach(() => {
  // The masthead is a fixed-positioned banner; make sure each test
  // starts from a clean localStorage so theme/visit state doesn't leak.
  try { window.localStorage.clear(); } catch {/* ignore */}
});

function mount(initialUrl = '/') {
  return render(
    <MemoryRouter initialEntries={[initialUrl]}>
      <App />
    </MemoryRouter>
  );
}

describe('App — masthead navigation between top-level views', () => {
  it('renders the masthead with all 9 view tabs (Origin lands last)', () => {
    mount('/journey');
    const nav = screen.getByLabelText('Views');
    const tabs = within(nav).getAllByRole('link');
    const labels = tabs.map((t) => t.textContent);
    expect(labels).toEqual([
      'Verse Journey', 'Patterns Won', 'Verbs', 'Atlas',
      'Words', 'Decode', 'Primer', 'Practice', 'Origin',
    ]);
  });

  it('clicking "Patterns Won" tab navigates from /journey to /patterns', () => {
    mount('/journey');
    const nav = screen.getByLabelText('Views');
    fireEvent.click(within(nav).getByText('Patterns Won'));
    // /patterns has its own page heading — distinguish from the masthead tab
    // by matching the >1 occurrences (both nav link AND page heading).
    expect(screen.getAllByText(/Patterns Won/).length).toBeGreaterThanOrEqual(2);
    // And the patterns table renders.
    expect(screen.getAllByText(/First met/i).length).toBeGreaterThan(0);
  });

  it('clicking "Atlas" navigates to /atlas and shows Declensions by default', () => {
    mount('/journey');
    fireEvent.click(within(screen.getByLabelText('Views')).getByText('Atlas'));
    // Default sub-tab is declensions (was pronouns before the शब्दरूप tab landed).
    expect(screen.getByText(/शब्दरूपावलिः/)).toBeDefined();
  });

  it('clicking "Verbs" navigates to /verbs and shows the periodic table', () => {
    mount('/journey');
    fireEvent.click(within(screen.getByLabelText('Views')).getByText('Verbs'));
    expect(screen.getByText(/Periodic Table/)).toBeDefined();
  });

  it('clicking "Words" navigates to /words and shows शब्दकोषः', () => {
    mount('/journey');
    fireEvent.click(within(screen.getByLabelText('Views')).getByText('Words'));
    expect(screen.getByText('शब्दकोषः')).toBeDefined();
  });

  it('clicking "Practice" navigates to /practice and shows अभ्यासः', () => {
    mount('/journey');
    fireEvent.click(within(screen.getByLabelText('Views')).getByText('Practice'));
    expect(screen.getByText(/अभ्यासः/)).toBeDefined();
  });

  it('clicking "Primer" navigates to /primer', () => {
    mount('/journey');
    fireEvent.click(within(screen.getByLabelText('Views')).getByText('Primer'));
    // Primer's masthead heading is पुनरारम्भः
    expect(screen.getByText(/पुनरारम्भः/)).toBeDefined();
  });

  it('the active tab has the is-active class', () => {
    mount('/atlas');
    const nav = screen.getByLabelText('Views');
    const atlas = within(nav).getByText('Atlas');
    expect(atlas.className).toMatch(/is-active/);
    // And no other tab is active.
    const others = within(nav).getAllByRole('link').filter((l) => l !== atlas);
    for (const o of others) {
      expect(o.className).not.toMatch(/is-active/);
    }
  });
});

describe('App — deep links land on the right view', () => {
  it('/ redirects to /journey', () => {
    mount('/');
    expect(screen.getAllByText(/decoded so far/i).length).toBeGreaterThan(0);
  });

  it('/journey/2/3 deep-links into Gītā 2.3', () => {
    mount('/journey/2/3');
    expect(screen.getAllByText(/Gītā 2\.3/).length).toBeGreaterThan(0);
  });

  it('/atlas/samasa shows the Samāsa Compound bank', () => {
    mount('/atlas/samasa');
    expect(screen.getByText(/समास — compound analysis/)).toBeDefined();
  });

  it('/atlas/sandhi shows the Sandhi Lab', () => {
    mount('/atlas/sandhi');
    // "Sandhi Lab" appears in the heading and the lede; both match.
    expect(screen.getAllByText(/Sandhi Lab/).length).toBeGreaterThanOrEqual(1);
    // The input field is the unambiguous Lab marker.
    expect(screen.getByLabelText(/Joined string/i)).toBeDefined();
  });

  it('/atlas/karaka shows कारक', () => {
    mount('/atlas/karaka');
    expect(screen.getAllByText(/semantic case-roles/i).length).toBeGreaterThan(0);
  });

  it('/atlas/avyaya shows Avyaya', () => {
    mount('/atlas/avyaya');
    expect(screen.getAllByText(/अव्यय/).length).toBeGreaterThan(0);
  });

  it('/atlas/adjadv shows the Adj/Adv tab', () => {
    mount('/atlas/adjadv');
    expect(screen.getAllByText(/विशेषण/).length).toBeGreaterThan(0);
  });

  it('/verbs/kr selects √कृ in the Periodic Table', () => {
    mount('/verbs/kr');
    expect(screen.getAllByText(/√कृ/).length).toBeGreaterThan(0);
  });

  it('an unknown route shows the 404 fallback', () => {
    mount('/this-tab-does-not-exist');
    expect(screen.getByText(/That tab doesn't exist/)).toBeDefined();
  });
});

describe('App — cross-tab navigation flows (the user-flagged gap)', () => {
  it('clicking a Samāsa Bank verse-ref navigates to /journey/c/v', () => {
    // Atlas → Samasa → Compound bank. Each row whose compound has a
    // verseRef gets a "Gītā c.v ↗" button. Clicking it should land us
    // on the corresponding verse detail page.
    mount('/atlas/samasa');

    // Toggle to "From your verses" so the bank is verse-grown (rows with verseRef).
    const fromVerses = screen.getByText(/From your verses/i).closest('button');
    fireEvent.click(fromVerses);

    // The first verse-ref button — text matches Gītā c.v ↗
    const refButtons = screen.getAllByText(/Gītā \d+\.\d+ ↗/);
    expect(refButtons.length).toBeGreaterThan(0);
    fireEvent.click(refButtons[0]);

    // Now we should be on the journey page — Decoded-so-far rail visible.
    expect(screen.getAllByText(/decoded so far/i).length).toBeGreaterThan(0);
  });

  it('switching Atlas sub-tabs via TOC clicks updates the active sub-tab', () => {
    mount('/atlas/pronouns');
    expect(screen.getByText(/Personal pronouns/i)).toBeDefined();

    // Click the Compounds sub-tab in the Atlas TOC.
    const toc = screen.getByLabelText('Atlas sections');
    fireEvent.click(within(toc).getByText('Compounds'));
    expect(screen.getByText(/समास — compound analysis/)).toBeDefined();
  });

  it('Verbs Periodic Table → click cell → DhatuDetail switches', () => {
    const { container } = mount('/verbs');

    // Periodic Table cells are .dhatu-cell buttons, each with a .dhatu-deva
    // span carrying the devanāgarī. Find the cell for भू (√bhū) and click.
    const cells = Array.from(container.querySelectorAll('.dhatu-cell'));
    const bhuCell = cells.find((c) => c.querySelector('.dhatu-deva')?.textContent === 'भू');
    expect(bhuCell, 'expected a भू cell in the periodic table').toBeDefined();
    fireEvent.click(bhuCell);

    // Detail pane shows √भू as the heading.
    expect(screen.getAllByText(/√भू/).length).toBeGreaterThan(0);
  });

  it('Verbs sub-tabs (Periodic / Stack / Coverage) switch via click', () => {
    mount('/verbs');

    // Default = periodic. Switch to Stack Builder.
    fireEvent.click(screen.getByText('Stack Builder'));
    // Stack Builder has both forward and reverse mode buttons.
    expect(screen.getByText(/Forward — build a form/)).toBeDefined();
    expect(screen.getByText(/Reverse — decode a form/)).toBeDefined();

    // Switch to Coverage.
    fireEvent.click(screen.getByText('Coverage'));
    // The unique element to the Coverage pane is the .coverage-heading h3
    // and the .coverage-table; the verbs-sub paragraph now also mentions
    // "Sanskrit verb tokens" (Khoomeik citation), so don't pin on text.
    expect(document.querySelector('.coverage-heading')).toBeTruthy();
    expect(document.querySelector('.coverage-table')).toBeTruthy();
  });
});

describe('App — colophon + structure', () => {
  it('renders the colophon footer with the SOV legend', () => {
    mount('/journey');
    expect(screen.getByText(/SOV · पदच्छेद · अन्वय/)).toBeDefined();
  });

  it('renders the masthead title गीताध्ययनम्', () => {
    mount('/journey');
    expect(screen.getByText('गीताध्ययनम्')).toBeDefined();
  });
});
