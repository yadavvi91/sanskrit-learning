import { useState } from 'react';
import { conjugate, decompose } from '../utils/conjugator.js';
import {
  LAKARAS, LAKARA_META, GANA_META, PADAS, PURUSHAS, VACHANAS,
} from '../utils/endings.js';

const PADA_LABEL = { P: 'परस्मैपद', A: 'आत्मनेपद', U: 'उभयपदी' };

export default function DhatuDetail({ dhatu }) {
  const [lakara, setLakara] = useState('lat');
  const [pada, setPada] = useState(dhatu.pada === 'A' ? 'A' : 'P');
  const [picked, setPicked] = useState(null);

  if (!dhatu) {
    return <section className="dhatu-detail empty-state">Pick a dhātu to see its full conjugation.</section>;
  }

  const padasAvailable = dhatu.pada === 'U' ? ['P', 'A'] : [dhatu.pada];

  return (
    <section className="dhatu-detail">
      <header className="dhatu-detail-header">
        <div className="dhatu-detail-name">
          <h3 className="dhatu-deva-large">√{dhatu.devanagari}</h3>
          <p className="dhatu-iast">/{dhatu.iast}/ — {dhatu.meanings.join(', ')}</p>
        </div>
        <div className="dhatu-detail-meta">
          <span className="meta-chip"><span>गण</span> {dhatu.gana} · {GANA_META[dhatu.gana]?.devanagari}</span>
          <span className="meta-chip"><span>पद</span> {PADA_LABEL[dhatu.pada]}</span>
          <span className="meta-chip"><span>RANK</span> #{dhatu.frequencyRank}</span>
          <span className="meta-chip"><span>STEM</span> {dhatu.presentStem}-</span>
          {dhatu.isSuppletive && <span className="meta-chip is-warn">suppletive</span>}
          {!GANA_META[dhatu.gana]?.thematic && <span className="meta-chip is-warn">athematic</span>}
        </div>
      </header>

      {dhatu.notes && <p className="dhatu-note">{dhatu.notes}</p>}

      <nav className="lakara-tabs" aria-label="Lakāras">
        {LAKARAS.map((l) => (
          <button
            key={l}
            type="button"
            className={`lakara-tab ${lakara === l ? 'is-active' : ''}`}
            onClick={() => { setLakara(l); setPicked(null); }}
          >
            <span className="lakara-tab-deva">{LAKARA_META[l].devanagari}</span>
            <span className="lakara-tab-en">{LAKARA_META[l].label}</span>
          </button>
        ))}
      </nav>

      <div className="lakara-meta">
        <span className="lakara-signal">Signal: {LAKARA_META[lakara].signal}</span>
        {padasAvailable.length > 1 && (
          <div className="pada-toggle">
            {padasAvailable.map((p) => (
              <button
                key={p}
                type="button"
                className={`pada-btn ${pada === p ? 'is-active' : ''}`}
                onClick={() => { setPada(p); setPicked(null); }}
              >
                {PADAS.find((x) => x.id === p)?.devanagari}
              </button>
            ))}
          </div>
        )}
      </div>

      <ConjugationGrid
        dhatu={dhatu}
        lakara={lakara}
        pada={pada}
        picked={picked}
        onPick={setPicked}
      />

      {picked && (
        <Breakdown
          dhatu={dhatu}
          lakara={lakara}
          pada={pada}
          purusha={picked.purusha}
          vachana={picked.vachana}
        />
      )}

      {dhatu.gitaOccurrences && dhatu.gitaOccurrences.length > 0 && (
        <section className="gita-occurrences">
          <h4>Met in Gītā</h4>
          <ul>
            {dhatu.gitaOccurrences.map((occ, i) => (
              <li key={i}>
                <span className="gita-ref">Gītā {occ.chapter}.{occ.verse}</span>
                <span className="gita-form">{occ.form}</span>
                <span className="gita-context">{occ.context}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </section>
  );
}

function ConjugationGrid({ dhatu, lakara, pada, picked, onPick }) {
  return (
    <table className="conj-grid">
      <thead>
        <tr>
          <th />
          {VACHANAS.map((v) => (
            <th key={v.id}>
              <span className="th-deva">{v.devanagari}</span>
              <span className="th-en">{v.label}</span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {PURUSHAS.map((p) => (
          <tr key={p.id}>
            <th scope="row">
              <span className="th-deva">{p.devanagari}</span>
              <span className="th-en">{p.label}</span>
            </th>
            {VACHANAS.map((v) => {
              const form = conjugate(dhatu, lakara, pada, p.id, v.id);
              const isPicked = picked && picked.purusha === p.id && picked.vachana === v.id;
              return (
                <td key={v.id} className={isPicked ? 'is-picked' : ''}>
                  {form ? (
                    <button
                      type="button"
                      className="conj-cell"
                      onClick={() => onPick({ purusha: p.id, vachana: v.id })}
                    >
                      {form}
                    </button>
                  ) : (
                    <span className="conj-cell is-missing">—</span>
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Breakdown({ dhatu, lakara, pada, purusha, vachana }) {
  const decomposed = decompose(dhatu, lakara, pada, purusha, vachana);
  const form = conjugate(dhatu, lakara, pada, purusha, vachana);
  return (
    <div className="breakdown">
      <h4 className="breakdown-title">Why <strong>{form}</strong>?</h4>
      <ol className="breakdown-layers">
        <li><span>1. धातु</span> √{dhatu.devanagari} ({dhatu.meanings[0]})</li>
        <li><span>2. गण</span> {dhatu.gana} ({GANA_META[dhatu.gana]?.rule}) → present stem <strong>{dhatu.presentStem}-</strong></li>
        <li><span>3. लकार</span> {LAKARA_META[lakara].devanagari} — {LAKARA_META[lakara].label}</li>
        <li><span>4. पद</span> {PADA_LABEL[pada]}</li>
        <li>
          <span>5. पुरुष / वचन</span>{' '}
          {PURUSHAS.find((p) => p.id === purusha)?.devanagari} ·{' '}
          {VACHANAS.find((v) => v.id === vachana)?.devanagari}
        </li>
      </ol>
      <div className="breakdown-formula">
        {decomposed.augment && <span className="formula-piece formula-aug">{decomposed.augment}</span>}
        <span className="formula-piece formula-stem">{decomposed.stem}</span>
        <span className="formula-piece formula-end">{decomposed.ending || '∅'}</span>
        <span className="formula-eq">=</span>
        <span className="formula-piece formula-result">{form}</span>
        {decomposed.wasOverridden && (
          <span className="formula-piece formula-flag" title="This form is irregular and is stored as an override rather than rule-generated.">
            irregular
          </span>
        )}
      </div>
    </div>
  );
}
