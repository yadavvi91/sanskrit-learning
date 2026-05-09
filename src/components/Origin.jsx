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
          A long-form essay on where the project came from — the Maharashtra SSC failure, Bibek Debroy's
          <em> Bhagavad Gītā for Millennials</em>, the WhatsApp message that triggered the verse-by-verse
          spillover, the four foundational verses, and the conversations with Claude that produced this
          codebase. Includes the original handwritten Debroy notes (Feb 2023) and the Khoomeik 192-dhātu
          data that seeded the Verbs sub-app.
        </p>
      </header>

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
