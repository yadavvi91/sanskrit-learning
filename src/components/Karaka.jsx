import { KARAKAS, KARAKA_KEY_INSIGHT } from '../data/karaka.js';

export default function Karaka() {
  return (
    <article className="atlas-page">
      <h3 className="atlas-page-title">कारक — semantic case-roles</h3>
      <p className="atlas-lede">
        <strong>विभक्ति</strong> = morphological case (the ending). <strong>कारक</strong> = the semantic role
        in the action. The two layers usually align (कर्ता takes प्रथमा), but in passive constructions the
        विभक्ति assignments swap while the कारक roles do not.
      </p>

      <div className="karaka-insight">
        {KARAKA_KEY_INSIGHT}
      </div>

      <table className="karaka-table">
        <thead>
          <tr>
            <th>कारक</th>
            <th>Role</th>
            <th>Active विभक्ति</th>
            <th>Passive विभक्ति</th>
            <th>Sense</th>
          </tr>
        </thead>
        <tbody>
          {KARAKAS.map((k) => (
            <tr key={k.id}>
              <td className="karaka-deva">{k.deva}</td>
              <td className="karaka-role">{k.en}</td>
              <td className="karaka-vibhakti">{k.activeVibhakti}</td>
              <td className="karaka-vibhakti">{k.passiveVibhakti}</td>
              <td className="karaka-sense">{k.sense}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 className="atlas-sub-title">Worked examples</h4>
      <ul className="karaka-examples">
        {KARAKAS.map((k) => (
          <li key={k.id}>
            <div className="karaka-ex-name"><strong>{k.deva}</strong> ({k.en})</div>
            <div className="karaka-ex-active"><span>active:</span> {k.activeEx}</div>
            <div className="karaka-ex-passive"><span>passive:</span> {k.passiveEx}</div>
          </li>
        ))}
      </ul>
    </article>
  );
}
