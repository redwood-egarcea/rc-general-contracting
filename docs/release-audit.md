# Release audit, 2026-09-23

Impeccable audit started after the owner's “Commit and deploy” instruction approved the draft for release. The audit precedes harden, adapt and polish corrections.

| Dimension | Initial score | Evidence |
| --- | ---: | --- |
| Accessibility | 3/4 | Labels, focus recovery and live regions pass browser tests; mobile About target is narrower than 44px. Actual screen-reader walkthrough remains open. |
| Performance | 3/4 | Static pages, optimized images and self-hosted fonts; final Lighthouse results pending. |
| Responsive design | 3/4 | Four routes tested at five widths in both themes; narrow About target needs correction. |
| Theming | 4/4 | Both themes render consistently across the viewport matrix; no horizontal overflow observed. |
| Implementation integrity | 2/4 | Complete source-derived content and shared patterns, but email sending is not configured. Detector pending. |
| Total | 15/20 | Good visual implementation; release remains blocked on functional delivery and final verification. |

## Findings

- **P0 — Email delivery unavailable.** `src/pages/api/submit.ts` returns a truthful 503 after verification. Cloudflare dashboard confirms Workers Paid is required. The business sender domain is not in this account. Configure the owner's selected provider and verified sender, then prove real delivery. No provider success is simulated.
- **P1 — Adapter copies local secrets into build output.** The absence test found synthetic contact values in `dist/server/.dev.vars`. The adapter creates this for preview use. Remove credential files after build and run local preview using a separate ignored configuration outside `dist`. No actual business contacts were present in this file.
- **P2 — Mobile About target width.** The narrow header link is shorter than 44px. Add minimum inline size while retaining the approved navigation composition.

## Hardening evidence

The initial security suite passed nine tests: host/action validation, IP forwarding, invalid/reused/expired tokens, real Cloudflare dummy pass/fail/duplicate secrets, rejection of dummy keys on production hosts, service outages, origins/method/content types, both rate limits, body size/malformed JSON, Unicode input and field/honeypot/header-injection validation. Local reveal returned the requested synthetic detail only, with `no-store`. Browser verification failure preserved the enquiry and retry restored focus. No-JavaScript social fallbacks worked.

The initial run had 23 passes and three failures: the About target in two themes and the copied local credential file. These are recorded before fixes. A rerun will score the corrections; this report is not a release pass.


## Corrections and bounded final pass

Harden: the post-build scrub removes copied credential files; synthetic preview bindings are now outside dist. All nine security tests and complete-build absence checks pass. Cloudflare's live dummy pass/fail/duplicate responses were exercised; no production bypass was added.

Adapt: the mobile About link now has a 44px minimum inline size. All four pages pass targets, loaded-image, single-H1 and overflow assertions at all five widths in both themes. Forty screenshots are saved and independently validated.

Polish: the independent finish review found no missing or contradicted visual element after the documented source-image/font adaptations and no reason for a visual rebuild. The interior-heading ramp is reconciled in the design record. The prior approved visible navigation and restrained motion remain. Development analytics is omitted to avoid production traffic pollution and localhost CORS errors.

Rerun: 26/26 tests pass, plus the separate exact-comp screenshot check. Build, check, lint, format and contact scans pass. Lighthouse's three local pages score 100/100/100/69; only indexing fails SEO because this is a deliberately non-indexable local build. The release disposition remains **fix**, because actual delivery, final production acceptance and VoiceOver testing are outstanding. VoiceOver could not start while the Mac was locked. These open gates are not visual polish defects and are not silently waived.
