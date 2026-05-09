// Chapter 10 (विभूति योग) — small targeted overrides on top of the
// auto-stub data. The bulk of विभूति योग verses (10.21-10.42) already
// classify cleanly because each one repeats अस्मि — the autoDecode
// engine and shared vocab pick those up. The chain-starter 10.20
// itself has no overt finite verb and got the generic "implied अस्ति"
// message; this override sets implicitVerb='अस्मि' so the popover
// names the actual implied 1sg form ("I am") and notes that the
// chain about to begin runs on अनुवृत्ति from this अहम् + अस्मि.

export const CH10_VERSE_OVERRIDES = {
  '10.20': {
    implicitVerb: 'अस्मि',
    implicitVerbMeaning: 'I am — 1st-person singular of √अस्',
    keyFights: [
      'विभूति-योग chain-starter. No overt finite verb here, but the implied verb is आत्मनेपद-style अस्मि (I am) — Krishna identifying himself with cosmic categories.',
      'Verses 10.21-10.42 carry अस्मि forward by अनुवृत्ति. Each "अहं X" or "X-genitive-pl Y" gets the same अस्मि mentally supplied: "I am the X among Y\'s." This is the densest अनुवृत्ति stretch in the Gītā.',
    ],
  },
};
