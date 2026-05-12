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
      <h2>Short version</h2>

      <p>
        I went through Maharashtra SSC Sanskrit in school — pure rote. <em>देवः देवौ देवाः </em>
        memorised for the exam, without ever being told why those endings exist. There's an old
        grammar — Pāṇini's अष्टाध्यायी — that I've heard explains the rules behind the forms,
        but I'd never come across it in school and I still don't really know how it works.
        We got the tables; we never got the rules.
      </p>

      <h3>February 2023 — picking up the Gītā again</h3>
      <p>
        In February 2023 I picked up Bibek Debroy's <em>Bhagavad Gītā for Millennials</em>. There
        was no plan to build anything — I just wanted to read the Gītā with some real understanding
        for once. I made handwritten notes as I went (SOV vs SVO, पदच्छेद, अन्वय, the six वेदांग,
        अनुष्टुभ metre, laghu/guru), then ran out of time and shelved it. The notes stayed.
      </p>
      <ArticleImage src="article-images/debroy-notes-1.jpg" alt="Handwritten Debroy notes — SOV/SVO, padaccheda, anvaya, the six vedanga" />
      <ArticleImage src="article-images/debroy-notes-2.jpg" alt="Handwritten Debroy notes — anushtubh metre, laghu/guru, the metrical rules" />

      <h3>Sundarkand — the longer route that brought me here</h3>
      <p>
        I read Sundarkand every other week, and have been doing that for the past four-plus
        years. To read along with the audio I built the{' '}
        <a href="https://sundarkand.yadavvi.com/">Sundarkand reciter</a> (chaupāī text synced
        to recitation). Years of reciting is where I came to *feel* why metre matters — the
        laghu/guru rhythm, why the यति falls where it does. None of that would have come from
        a book. The{' '}
        <a href="https://github.com/yadavvi91/awadhi-meter-identifier">Awadhi Meter Visualizer</a>{' '}
        then made the felt sense visible. By the time I sat down with the Gītā, अनुष्टुभ was
        no longer abstract. These threads don't compete; they completed each other. The longer
        route is what gave the Sanskrit reading whatever depth it has.
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

      <Sources />

    </div>
  );
}

function Sources() {
  return (
    <>
      <h3>Sources & external Sanskrit corpora</h3>
      <p>
        The padaccheda + morphology shown in this app is not original work — it's looked up
        from the <strong>Digital Corpus of Sanskrit</strong>, whose human annotators have been
        tagging Sanskrit texts for two decades. Listed here are the academic resources I've
        drawn on or that future Sanskrit work should consult. Bookmark them.
      </p>

      <ul className="origin-sources">
        <li>
          <a href="https://github.com/OliverHellwig/sanskrit"
             target="_blank" rel="noopener noreferrer"><strong>Digital Corpus of Sanskrit (DCS)</strong></a>
          {' — '}Oliver Hellwig, Heidelberg. CoNLL-U files with surface form, lemma, and
          Universal Dependencies morphology for every token. <em>Covers:</em> Ṛgveda,
          Atharvaveda, Mahābhārata (incl. the Gītā), Rāmāyaṇa, the Aṣṭādhyāyī, dozens of
          Purāṇas and Upaniṣads, kāvya, śāstra works. <em>License:</em> CC BY-SA 4.0.
          The Gītā subset of this corpus is what powers the padaccheda on every verse here.
        </li>
        <li>
          <a href="http://www.sanskrit-linguistics.org/dcs/"
             target="_blank" rel="noopener noreferrer"><strong>DCS web interface</strong></a>
          {' — '}Browse the same data in a searchable web UI: text lookup, lemma index,
          KWIC concordance.
        </li>
        <li>
          <a href="https://github.com/ambuda-org/vidyut"
             target="_blank" rel="noopener noreferrer"><strong>vidyut</strong> (ambuda-org)</a>
          {' — '}Rust + WASM Sanskrit toolkit. Sandhi engine, conjugator, lemmatizer.
          What Rohan Pandey (Khoomeik) used to derive the dhātu coverage curve. Open-source
          alternative to the Heritage Reader for runtime computation.
        </li>
        <li>
          <a href="https://sanskrit.inria.fr/" target="_blank" rel="noopener noreferrer">
          <strong>Sanskrit Heritage Site</strong> (INRIA — Gérard Huet)</a>
          {' — '}The pioneering computational Sanskrit project (since ~2000). Web segmenter,
          declension tables for every standard pattern, conjugator, padapāṭha generator.
          Heritage Dictionary integrated. French/English.
        </li>
        <li>
          <a href="https://sanskrit.uohyd.ac.in/" target="_blank" rel="noopener noreferrer">
          <strong>Sanskrit Computational Linguistics</strong> (Univ. of Hyderabad / IIT-H)</a>
          {' — '}Amba Kulkarni's group. Tools for sandhi-vicchedaka, samāsa-vigraha,
          kāraka analyser, anvaya generator. Also hosts the Sanskrit Wordnet.
        </li>
        <li>
          <a href="http://sanskritlibrary.org/" target="_blank" rel="noopener noreferrer">
          <strong>The Sanskrit Library</strong> (Brown University — Peter Scharf)</a>
          {' — '}Annotated digital corpus with segmentation tools, Pāṇini's
          Aṣṭādhyāyī interlinear, multiple dictionaries (Monier-Williams, Apte, Macdonell).
        </li>
        <li>
          <a href="https://ambuda.org/" target="_blank" rel="noopener noreferrer">
          <strong>Ambuda</strong></a>
          {' — '}Sanskrit text library with parsed editions of the Mahābhārata, Rāmāyaṇa,
          Purāṇas. Sister project to vidyut. Built for read-along.
        </li>
        <li>
          <a href="https://bvsiitm.github.io/sanskrit-gita-learn/"
             target="_blank" rel="noopener noreferrer"><strong>bvsiitm.github.io/sanskrit-gita-learn</strong></a>
          {' — '}BV Srinivasan's Gītā course (IITM). Pedagogy that influenced this app:
          <em>known → +1 → drill → SRS</em>, sandhi-last, frequency-first dhātus.
        </li>
        <li>
          <a href="https://twitter.com/khoomeik" target="_blank" rel="noopener noreferrer">
          <strong>@khoomeik / Rohan Pandey</strong></a>
          {' — '}Top-192 dhātu frequency chart (derived from DCS via vidyut). The
          basis for the Verbs sub-app's periodic table. Also organises a Sanskrit
          reading circle.
        </li>
        <li>
          <a href="https://www.holy-bhagavad-gita.org/" target="_blank" rel="noopener noreferrer">
          <strong>holy-bhagavad-gita.org</strong></a>
          {' — '}The chapter/verse grid that triggered this project. Per-verse word-by-word
          glosses, multiple translations, Śaṅkara/Rāmānuja commentaries.
        </li>
        <li>
          <a href="https://www.sacred-texts.com/hin/index.htm"
             target="_blank" rel="noopener noreferrer"><strong>Internet Sacred Text Archive</strong></a>
          {' — '}Public-domain editions of Vedic and classical Sanskrit texts in roman
          transliteration. Edwin Arnold's <em>Song Celestial</em> (used here as one of the
          three parallel English translations) is hosted here.
        </li>
        <li>
          <a href="https://sanskritdocuments.org/" target="_blank" rel="noopener noreferrer">
          <strong>sanskritdocuments.org</strong></a>
          {' — '}Vast Sanskrit text repository (ITRANS/Devanagari) — Vedas, Upaniṣads,
          Bhāgavatam, Yogasūtra, stotras, classical literature. Community-maintained.
        </li>
      </ul>

      <p className="origin-sources-note">
        License attribution: the DCS-derived <code>src/data/dcs-padaccheda.json</code> in this
        repo is CC BY-SA 4.0 per the upstream. Anyone reusing it should credit Oliver Hellwig.
      </p>
    </>
  );
}

export default function Origin() {
  // Article markdown is bundled at build time via Vite's `?raw` import.
  const [md] = useState(articleMarkdown);
  const [view, setView] = useState('short'); // 'short' | 'full'

  // Match the project's verse-detail scroll-on-mount behaviour.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <article className="origin">
      <header className="origin-header">
        <p className="origin-eyebrow">How this project came to be</p>
        <p className="origin-meta">
          Two versions: a short summary card with the key images, or the full long-form essay.
          The seed (Debroy, Feb 2023), the trigger (a WhatsApp message + holy-bhagavad-gita.org grid),
          the four foundational verses, the bvsiitm + Khoomeik influences, and the conversations
          with Claude that produced this codebase.
        </p>
        <div className="origin-toggle" role="tablist" aria-label="Origin view">
          <button
            type="button"
            role="tab"
            aria-selected={view === 'short'}
            className={`origin-toggle-btn ${view === 'short' ? 'is-active' : ''}`}
            onClick={() => setView('short')}
          >
            Short version
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={view === 'full'}
            className={`origin-toggle-btn ${view === 'full' ? 'is-active' : ''}`}
            onClick={() => setView('full')}
          >
            Full essay
          </button>
        </div>
      </header>

      {view === 'short' ? (
        <OriginSummary />
      ) : (
        <div className="origin-prose">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{ img: ArticleImage }}
          >
            {md}
          </ReactMarkdown>
        </div>
      )}
    </article>
  );
}
