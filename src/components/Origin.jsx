import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import articleMarkdown from '../../article.md?raw';

// The article uses relative image paths (article-images/foo.jpg) that work
// when GitHub renders the .md file. In the deployed app we serve images
// from /article-images/ — this rewrites the src on the way through.
function ArticleImage({ src, alt, ...rest }) {
  const fixed = src && src.startsWith('article-images/') ? `/${src}` : src;
  return <img src={fixed} alt={alt || ''} loading="lazy" {...rest} />;
}

function OriginSummary() {
  return (
    <div className="origin-summary">
      <h2>The short version</h2>

      <p>
        I went through Maharashtra SSC Sanskrit — pure rote. <em>देवः देवौ देवाः </em>
        memorised without ever being told why those endings exist. The compiled binary, never the source.
        Pāṇini's 2,500-year-old generative grammar — one of the most sophisticated formal systems
        ever written — taught upside-down.
      </p>

      <h3>February 2023 — the seed</h3>
      <p>
        I picked up Bibek Debroy's <em>Bhagavad Gītā for Millennials</em> and made serious
        handwritten notes — SOV vs SVO, पदच्छेद, अन्वय, the six वेदांग, अनुष्टुभ metre, laghu/guru.
        Then ran out of time and shelved it. The latent obsession kept simmering.
      </p>
      <ArticleImage src="article-images/debroy-notes-1.jpg" alt="Handwritten Debroy notes — SOV/SVO, padaccheda, anvaya, the six vedanga" />
      <ArticleImage src="article-images/debroy-notes-2.jpg" alt="Handwritten Debroy notes — anushtubh metre, laghu/guru, the metrical rules" />

      <h3>The sideways expression — Awadhi meter visualiser</h3>
      <p>
        That latent interest first surfaced as the <strong>Awadhi Meter Visualizer</strong> — a
        React + Vite app that breaks Sundarkand chaupāī into laghu/guru syllables, marks the यति,
        and animates the breakdown across four steps. Different language, same obsession with prosody.
        The parchment aesthetic + Devanāgarī + Cinzel/Cormorant typography of <em>this</em> project
        is the same design DNA.
      </p>

      <h3>The WhatsApp trigger</h3>
      <p>
        Someone in a chat said something depressing. I sent back Gītā 2.3 — <em>क्लैब्यं मा स्म गमः
        पार्थ</em>. They asked what it meant. I went to holy-bhagavad-gita.org for the gloss, saw the
        chapter/verse grid layout, kept reading. 2.3 → 2.4 → 2.5. The grid was the trigger; the
        Debroy frame was the latent capability waiting to be activated.
      </p>
      <ArticleImage src="article-images/holy-bhagavad-gita-grid.jpg" alt="The holy-bhagavad-gita.org chapter/verse grid — 12×6 clickable verses" />

      <h3>The four verses I fought for every word</h3>
      <p>
        Over one long Claude.ai conversation I fought through <strong>1.1, 2.3, 2.4, 2.5</strong>.
        Not "read." Fought. Each new ending was a separate fight: <em>समवेताः</em> looks like a verb
        but is a PPP; <em>मधुसूदन</em> looks like an object but is सम्बोधन; <em>भुञ्जीय</em> alone
        is the finite verb in 2.5 — <em>हत्वा</em>, <em>अहत्वा</em>, <em>भोक्तुम्</em> all look
        verbal but aren't. Every fight became a pattern; every pattern is now in <em>Patterns Won</em>.
      </p>

      <h3>The pedagogy I borrowed — bvsiitm + Khoomeik</h3>
      <p>
        Two external sources shaped the design. <strong>BV Srinivasan's bvsiitm.github.io</strong>
        teaches Sanskrit through the Gītā with a <em>known → +1 → drill → SRS</em> loop and the
        observation that <em>sandhi comes last</em>. <strong>Rohan Pandey's
        Khoomeik chart</strong> showed the dhātu coverage curve: top 192 dhātus = 86.1% of all
        Sanskrit verb tokens. The Verbs sub-app's periodic table is built around this.
      </p>
      <ArticleImage src="article-images/khoomeik-coverage-curve.jpg" alt="Khoomeik's dhātu coverage curve — top 192 dhātus = 86.1% of all Sanskrit verb tokens" />
      <ArticleImage src="article-images/khoomeik-chart-frequency.jpg" alt="Khoomeik's Top 192 Sanskrit Dhātus by Frequency, color-coded by गण" />

      <h3>What got built</h3>
      <ul>
        <li><strong>Verse Journey</strong> — every Gītā verse decoded with मूल → पदच्छेद → अन्वय → हिंदी → English, plus per-verse क्रिया, विभक्ति, समास, and व्याख्या sections.</li>
        <li><strong>Patterns Won</strong> — every grammar fight named, sourced to the verse that triggered it.</li>
        <li><strong>Verbs</strong> — the 192-dhātu periodic table with stack-builder for forward conjugation and reverse decoding.</li>
        <li><strong>Atlas</strong> — declension paradigms, सर्वनाम tables, समास types, अव्यय index, kāraka roles.</li>
        <li><strong>Primer</strong> — the decode method itself, plus an "Obscure points" reference for every gotcha that's surfaced in reading.</li>
        <li><strong>Practice</strong> — SRS-style review of patterns and forms.</li>
      </ul>

      <p className="origin-summary-cta">
        Below is the full long-form essay — the same story with the cuts un-made. Read on if you
        want the texture (or skim the table of contents and skip to what catches your eye).
      </p>

      <hr />
    </div>
  );
}

export default function Origin() {
  // Article markdown is bundled at build time via Vite's `?raw` import.
  const [md] = useState(articleMarkdown);

  // Match the project's verse-detail scroll-on-mount behaviour.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <article className="origin">
      <header className="origin-header">
        <p className="origin-eyebrow">How this project came to be</p>
        <p className="origin-meta">
          A short summary first, then the full long-form essay. Includes the original handwritten
          Debroy notes (Feb 2023), the holy-bhagavad-gita.org grid that started the spillover, and
          the Khoomeik 192-dhātu charts that seeded the Verbs sub-app.
        </p>
      </header>

      <OriginSummary />

      <div className="origin-prose">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{ img: ArticleImage }}
        >
          {md}
        </ReactMarkdown>
      </div>
    </article>
  );
}
