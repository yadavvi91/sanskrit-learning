// Markdown export per verse. Output mirrors the verses-decoded.md
// canonical artefact so the export is paste-portable into Obsidian /
// the source-of-truth markdown / a draft email.
//
// Including the user's notes if present (slice 3); references if present (slice 2).

import { holyBhagavadGitaUrl } from './sources.js';
import { getNote } from './notes.js';

function lines(arr) {
  return (arr || []).map((s) => `> ${s}`).join('\n');
}

function bullet(arr) {
  return (arr || []).map((s) => `- ${s}`).join('\n');
}

export function verseToMarkdown(verse) {
  const out = [];

  // Heading
  out.push(`## Gītā ${verse.chapter}.${verse.verse}${verse.title ? ' — ' + verse.title : ''}`);
  out.push('');
  if (verse.speaker) out.push(`**Speaker:** ${verse.speaker}  `);
  out.push(`**Source:** [holy-bhagavad-gita.org](${holyBhagavadGitaUrl(verse.chapter, verse.verse)})`);
  out.push('');

  // Mool
  if (verse.mool?.length) {
    out.push('**मूल:**');
    out.push(lines(verse.mool));
    out.push('');
  }

  // Padaccheda
  if (verse.padaccheda?.length) {
    out.push('**पदच्छेद:**');
    out.push(`> ${verse.padaccheda.join(' | ')}`);
    out.push('');
  }

  // Sandhi
  if (verse.sandhiNotes?.length) {
    out.push('**सन्धि:**');
    out.push(bullet(verse.sandhiNotes));
    out.push('');
  }

  // Samas
  if (verse.samasNotes?.length) {
    out.push('**समास:**');
    for (const s of verse.samasNotes) {
      out.push(`- **${s.compound}** = ${s.vigraha} → *${s.type}* — ${s.gloss}`);
    }
    out.push('');
  }

  // Finite verbs
  if (verse.finiteVerbs?.length) {
    out.push('**क्रिया (finite verb' + (verse.finiteVerbs.length > 1 ? 's' : '') + '):**');
    for (const fv of verse.finiteVerbs) {
      out.push(`- **${fv.form}** — ${fv.root}, ${fv.lakara}, ${fv.purusha} ${fv.vachana} = "${fv.gloss}"`);
    }
    out.push('');
  }

  // Non-finite
  if (verse.nonFinite?.length) {
    out.push('**कृदन्त (non-finite):**');
    for (const nf of verse.nonFinite) {
      out.push(`- ${nf.form} — *${nf.kind}*${nf.root ? ' of ' + nf.root : ''} — "${nf.gloss}"`);
    }
    out.push('');
  }

  // Vibhakti notes
  if (verse.vibhaktiNotes?.length) {
    out.push('**विभक्ति:**');
    out.push(bullet(verse.vibhaktiNotes));
    out.push('');
  }

  // Key fights
  if (verse.keyFights?.length) {
    out.push('**विवेकः (key fights won here):**');
    out.push(bullet(verse.keyFights));
    out.push('');
  }

  // Anvaya
  if (verse.anvaya) {
    out.push('**अन्वय:**');
    out.push(`> ${verse.anvaya}`);
    out.push('');
  }

  // Hindi
  if (verse.hindi) {
    out.push('**हिंदी:**');
    out.push(`> ${verse.hindi}`);
    out.push('');
  }

  // English
  if (verse.english) {
    out.push('**English:**');
    out.push(`> ${verse.english}`);
    out.push('');
  }

  // References (translations + commentaries)
  if (verse.references) {
    if (verse.references.translations?.length) {
      out.push('### Translations');
      for (const t of verse.references.translations) {
        out.push(`**${t.translator}** (${t.year})${t.work ? ', *' + t.work + '*' : ''}${t.license === 'public-domain' ? ' [PD]' : ''}`);
        out.push(`> ${t.text}`);
        out.push('');
      }
    }
    if (verse.references.commentaries?.length) {
      out.push('### Commentary positions');
      for (const c of verse.references.commentaries) {
        out.push(`**${c.sage}** — *${c.school}*`);
        out.push(`> ${c.summary}`);
        out.push('');
      }
    }
  }

  // User's notes
  const userNote = getNote(verse.chapter, verse.verse);
  if (userNote) {
    out.push('### My notes');
    out.push(userNote);
    out.push('');
  }

  return out.join('\n').trim() + '\n';
}

// Async wrapper: copy the markdown to the clipboard.
export async function copyVerseMarkdown(verse) {
  const md = verseToMarkdown(verse);
  await navigator.clipboard.writeText(md);
  return md;
}
