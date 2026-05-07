import { useState } from 'react';
import Pronouns from './Pronouns.jsx';
import Samasa from './Samasa.jsx';
import Karaka from './Karaka.jsx';
import Avyaya from './Avyaya.jsx';
import AdjAdv from './AdjAdv.jsx';

const ATLAS_TABS = [
  { id: 'pronouns', deva: 'सर्वनाम',     en: 'Pronouns' },
  { id: 'samasa',   deva: 'समास',         en: 'Compounds' },
  { id: 'karaka',   deva: 'कारक',          en: 'Case-roles' },
  { id: 'avyaya',   deva: 'अव्यय',          en: 'Indeclinables' },
  { id: 'adjadv',   deva: 'विशेषण-क्रियाविशेषण', en: 'Adj. & Adv.' },
];

export default function Atlas() {
  const [tab, setTab] = useState('pronouns');

  return (
    <div className="atlas">
      <header className="atlas-header">
        <h2 className="atlas-title">व्याकरणकोषः</h2>
        <p className="atlas-sub">
          Pronouns, compounds, semantic case-roles, indeclinables — everything beyond the noun and verb engines.
        </p>
      </header>

      <div className="atlas-layout">
        <nav className="atlas-toc" aria-label="Atlas sections">
          {ATLAS_TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`atlas-toc-item ${tab === t.id ? 'is-active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              <span className="atlas-toc-deva">{t.deva}</span>
              <span className="atlas-toc-en">{t.en}</span>
            </button>
          ))}
        </nav>

        <div className="atlas-content">
          {tab === 'pronouns' && <Pronouns />}
          {tab === 'samasa'   && <Samasa />}
          {tab === 'karaka'   && <Karaka />}
          {tab === 'avyaya'   && <Avyaya />}
          {tab === 'adjadv'   && <AdjAdv />}
        </div>
      </div>
    </div>
  );
}
