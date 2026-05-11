import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
  CASES, NUMBERS, ASMAD, YUSHMAD, TAD_M, TAD_F, TAD_N,
  TAD_TRANSFERS, OUTLIERS, CORRELATIVES, REFLEXIVES,
  PRONOUN_SECTION_IDS,
} from '../data/pronouns.js';

export default function Pronouns() {
  // Hash-driven section scroll, parallel to Declensions.jsx. Used by the
  // WordPopover's pronoun deep-link: clicking तान् in 2.14 navigates to
  // /atlas/pronouns#tad, which lands the user at the तद्-template section.
  const location = useLocation();
  useEffect(() => {
    const hashId = (location.hash || '').replace(/^#/, '');
    if (!hashId || !PRONOUN_SECTION_IDS.includes(hashId)) return;
    requestAnimationFrame(() => {
      const target = document.getElementById(hashId);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [location.hash]);

  return (
    <article className="atlas-page">
      <h3 className="atlas-page-title" id="personal">Personal pronouns — pure memorization</h3>
      <p className="atlas-lede">
        अस्मद् ("I/we") and युष्मद् ("you") are <strong>suppletive</strong>: different stems per case.
        No gender. Enclitic short forms (मा, मे, नौ, नः, ते, वः) cannot begin a sentence and
        cannot follow च / वा / ह / अह / एव.
      </p>
      <div className="pronoun-row">
        <PersonalTable pronoun={ASMAD} />
        <PersonalTable pronoun={YUSHMAD} />
      </div>

      <h3 className="atlas-page-title" id="tad">तद्-template — once memorized, six more pronouns are free</h3>
      <p className="atlas-lede">
        तद् is the master सर्वनाम template. Four <span className="sma-flag">स्म-cells</span>{' '}
        deviate from the राम pattern (gold border). These four cells propagate to <em>every</em>{' '}
        सर्वनाम pronoun below.
      </p>

      <div className="tad-grid">
        <SarvanamaTable card={TAD_M} />
        <SarvanamaTable card={TAD_F} />
        <SarvanamaTable card={TAD_N} />
      </div>

      <h4 className="atlas-sub-title" id="transfers">Six "free" pronouns — same template, prefix swapped</h4>
      <table className="transfer-table">
        <thead>
          <tr>
            <th>देवनागरी</th><th>Meaning</th>
            <th>पुं. प्रथमा एक</th><th>स्त्री. प्रथमा एक</th><th>नपुं. प्रथमा एक</th>
          </tr>
        </thead>
        <tbody>
          {TAD_TRANSFERS.map((t) => (
            <tr key={t.id}>
              <td className="transfer-deva">{t.deva}</td>
              <td className="transfer-en">{t.en}</td>
              <td>{t.m}</td><td>{t.f}</td><td>{t.n}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 className="atlas-sub-title" id="outliers">Outliers — recognition only</h4>
      <ul className="outliers">
        {OUTLIERS.map((o) => (
          <li key={o.id}>
            <strong>{o.deva}</strong> ({o.en}) — पुं. <em>{o.m}</em> · स्त्री. <em>{o.f}</em> · नपुं. <em>{o.n}</em>.
            <span className="outlier-note"> {o.note}</span>
          </li>
        ))}
      </ul>

      <h3 className="atlas-page-title" id="correlatives">Correlative pairs — the structural backbone of Krishna's teachings</h3>
      <p className="atlas-lede">
        Sanskrit has no relative-pronoun + complementizer like English "who/that." It uses
        <strong> paired clauses</strong>: a यद्-clause sets up a referent, a तद्-clause picks it up.
        Half of the Gītā's philosophical claims are यद्…तद् structures.
      </p>
      <table className="correlative-table">
        <thead>
          <tr><th>Pair</th><th>Meaning</th><th>Gītā example</th></tr>
        </thead>
        <tbody>
          {CORRELATIVES.map((c) => (
            <tr key={c.yat}>
              <td className="correlative-pair">{c.yat}</td>
              <td>{c.en}</td>
              <td className="correlative-gita">{c.gita}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="atlas-page-title" id="reflexives">Reflexives</h3>
      <ul className="reflexive-list">
        {REFLEXIVES.map((r) => (
          <li key={r.id}>
            <strong>{r.deva}</strong> ({r.en}) — {r.note}
          </li>
        ))}
      </ul>
    </article>
  );
}

function PersonalTable({ pronoun }) {
  return (
    <div className="pronoun-card">
      <div className="pronoun-card-head">
        <h4 className="pronoun-deva">{pronoun.deva}</h4>
        <p className="pronoun-en">{pronoun.en} · <em>{pronoun.genders}</em></p>
      </div>
      <table className="pronoun-table">
        <thead>
          <tr><th /><th>एकवचन</th><th>द्विवचन</th><th>बहुवचन</th></tr>
        </thead>
        <tbody>
          {CASES.map((c) => (
            <tr key={c.id}>
              <th scope="row">
                <span className="case-deva">{c.deva}</span>
                <span className="case-en">{c.en}</span>
              </th>
              {NUMBERS.map((n) => {
                const cell = pronoun.cells[c.id]?.[n.id];
                return (
                  <td key={n.id}>
                    <span className="cell-form">{cell?.form}</span>
                    {cell?.enclitic && (
                      <span className="cell-enclitic" title="Enclitic alternate (cannot begin a sentence)">
                        {cell.enclitic}
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SarvanamaTable({ card }) {
  return (
    <div className="pronoun-card">
      <div className="pronoun-card-head">
        <h4 className="pronoun-deva">{card.deva}</h4>
        <p className="pronoun-en">{card.en}</p>
      </div>
      <table className="pronoun-table">
        <thead>
          <tr><th /><th>एकवचन</th><th>द्विवचन</th><th>बहुवचन</th></tr>
        </thead>
        <tbody>
          {CASES.map((c) => (
            <tr key={c.id}>
              <th scope="row">
                <span className="case-deva">{c.deva}</span>
                <span className="case-en">{c.en}</span>
              </th>
              {NUMBERS.map((n) => {
                const cell = card.cells[c.id]?.[n.id];
                const cls = ['cell'];
                if (cell?.isSma) cls.push('is-sma');
                if (cell?.isSuppletive) cls.push('is-suppletive');
                return (
                  <td key={n.id} className={cls.join(' ')}>
                    {cell?.form}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
