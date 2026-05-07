// Routing smoke test: each top-level route mounts the right component.
// Uses MemoryRouter so we can assert against URLs without a real browser.

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, Navigate } from 'react-router-dom';
import VerseJourney from '../components/VerseJourney.jsx';
import PatternsWon from '../components/PatternsWon.jsx';
import Verbs from '../components/Verbs.jsx';
import Atlas from '../components/Atlas.jsx';
import Primer from '../components/Primer.jsx';
import Practice from '../components/Practice.jsx';

function AppShell() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/journey" replace />} />
      <Route path="/journey" element={<VerseJourney />} />
      <Route path="/journey/:chapter/:verse" element={<VerseJourney />} />
      <Route path="/patterns" element={<PatternsWon />} />
      <Route path="/verbs" element={<Verbs />} />
      <Route path="/verbs/:dhatuId" element={<Verbs />} />
      <Route path="/atlas" element={<Atlas />} />
      <Route path="/atlas/:section" element={<Atlas />} />
      <Route path="/primer" element={<Primer />} />
      <Route path="/practice" element={<Practice />} />
    </Routes>
  );
}

function renderAt(url) {
  return render(
    <MemoryRouter initialEntries={[url]}>
      <AppShell />
    </MemoryRouter>
  );
}

describe('routing — every top-level route renders its component', () => {
  it('/journey renders VerseJourney with the first decoded verse', () => {
    renderAt('/journey');
    expect(screen.getAllByText(/decoded so far/i).length).toBeGreaterThan(0);
  });

  it('/journey/2/3 selects Gītā 2.3', () => {
    renderAt('/journey/2/3');
    // The verse header shows the ref.
    const refs = screen.getAllByText(/Gītā 2\.3/);
    expect(refs.length).toBeGreaterThan(0);
  });

  it('/patterns renders Patterns Won matrix', () => {
    renderAt('/patterns');
    expect(screen.getByText(/Patterns Won/)).toBeDefined();
  });

  it('/verbs renders Verbs sub-app', () => {
    renderAt('/verbs');
    expect(screen.getByText(/Periodic Table/)).toBeDefined();
  });

  it('/verbs/:dhatuId selects that dhātu', () => {
    renderAt('/verbs/kr');
    // Periodic Table tab is default; expect the dhātu's heading rendered.
    expect(screen.getAllByText(/√कृ/).length).toBeGreaterThan(0);
  });

  it('/atlas defaults to the Pronouns sub-tab', () => {
    renderAt('/atlas');
    expect(screen.getByText(/Personal pronouns/)).toBeDefined();
  });

  it('/atlas/karaka selects the कारक sub-tab', () => {
    renderAt('/atlas/karaka');
    expect(screen.getAllByText(/semantic case-roles/i).length).toBeGreaterThan(0);
  });

  it('/primer renders the Primer', () => {
    renderAt('/primer');
    expect(screen.getByText(/पुनरारम्भः/)).toBeDefined();
  });

  it('/practice renders the Practice tab', () => {
    renderAt('/practice');
    expect(screen.getByText(/अभ्यासः/)).toBeDefined();
  });
});

describe('routing — root redirect', () => {
  it('/ redirects to /journey', () => {
    renderAt('/');
    expect(screen.getAllByText(/decoded so far/i).length).toBeGreaterThan(0);
  });
});
