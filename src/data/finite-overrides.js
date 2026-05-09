// Hand-decoded क्रिया overrides for verses where the autoDecode engine
// either missed the finite verb (engine failure — needed help) or where
// the verse genuinely has no overt finite verb (nominal sentence with
// implied अस्ति — NOT an engine failure, just the way the verse is).
//
// Used by hydrate.js:
//   - Array value → fills verse.finiteVerbs (overrides autoDecode output)
//   - null value  → marks verse.noFiniteVerb = true so the audit UI
//                   doesn't flag it as needing क्रिया audit
//
// Coverage status (parts arrive as the parallel agent batch completes):
//   - _finite_overrides_part1.js: 49 verses (pending)
//   - _finite_overrides_part2.js: 49 verses (pending)
//   - _finite_overrides_part3.js: 48 verses (pending)
// Total: 146 verses — every auto-stub verse where the engine returned
// no क्रिया as of session start, hand-classified.

export const FINITE_OVERRIDES = {};
