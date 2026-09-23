# Quality evidence

## Old-site baseline

Lighthouse 13.5.0, mobile defaults, simulated throttling. Captured 2026-09-23 at 17:20 UTC. Report and complete settings: `old-site/lighthouse-home.report.json` and `.html` (local only).

| Page | Phase 1 Performance | Accessibility | Best Practices | SEO | Phase 6 result |
| --- | ---: | ---: | ---: | ---: | --- |
| Home `/` | 68 | 96 | 96 | 92 | Built; see current results below |
| Interior (`/services/`, approved route) | No old equivalent | N/A | N/A | N/A | Built; see current results below |
| Contact (`/contact/`, approved route) | Part of old home | N/A | N/A | N/A | Built; see current results below |

Only one marketing page exists in the public sitemap and router. No scores have been invented for additional baseline pages.

| Metric | Home baseline |
| --- | ---: |
| FCP | 3.3 seconds |
| LCP | 5.8 seconds |
| Speed Index | 5.5 seconds |
| Total Blocking Time | 0 milliseconds |
| CLS | 0 |
| Transfer size | 4,063 KiB |

The source form is missing its visible inputs and submit button. Chrome and Lighthouse both report React error #418. A 360px browser viewport has a 574px document width, with contact email overflow. Four star containers fail the prohibited-ARIA-attribute check. Canonical tags conflict.

## Screenshot baseline

The old homepage was captured at 360×800, 768×1024, 1024×900, 1440×1000, and 1920×1080 in `docs/screenshots/old/`. These are full-page captures after reloading at each width. Screenshots contain current public contact details and are therefore gitignored. Viewport measurements are in `old-site/viewport-measurements.json`.

## Pending Phase 6 gates

The final new-site quality gate has not run. Routine build/type/lint checks and bounded page reviews were performed during implementation. After copy approval, record the full build, type, lint/format, Impeccable detector, audit/harden/adapt/polish, per-page Taste pre-flight, Lighthouse, Playwright, keyboard, and screen-reader results here. Every requested Lighthouse category must reach at least 95 on home, an interior page, and contact before deployment.

Tests must cover pass/fail Turnstile tokens, expiry and reuse errors, honeypot rejection, body/content-type validation, contact reveal, secret absence from build output, URL status codes, real 404 behaviour, and browser console errors. Live email delivery is verified only in the authorized delivery test, after the destination and provider are configured.

## Phase 2 proposal checks

Both proposed systems were checked for solid-colour token contrast: 50 text, action, border, and focus pairs passed their stated thresholds. The lowest checked normal-text contrast is 5.38:1. Details are in `docs/design-contrast.json`. This checks the proposed tokens only, not a rendered interface or imagery.

The design content plan contains every source service. Tracked proposal documents were checked against the locally recorded email and phone values; no match was found. The complete original source remains local and ignored. Generated direction mockups are concepts, not responsive-browser or Lighthouse evidence.

## Implementation evidence before copy approval

Home, services, contact and 404 have independent Impeccable A/B page reviews, recorded in the corresponding critique documents. Each review's built-page detector returned exit 0 with no findings. Subsequent changes and the complete built output will be checked again in Phase 6. These bounded checks do not certify the later complete-site gate.

Routine build, Astro check and lint passed during implementation. The built Worker has a real 404, synthetic contact reveal with dummy Turnstile verification, and retained form input through the explicit delivery-unavailable response. Retry verification restores useful focus. A scan of repository candidates and build files found none of the privately recorded contact values. Production email success, complete pass/fail/expiry/reuse coverage, the final secret-absence scan, Lighthouse, both-theme/five-width captures and full keyboard/screen-reader testing remain required. Email sending is intentionally incomplete while provider setup is pending.


## Current release verification, 2026-09-23

Copy approved by the owner's “Commit and deploy” instruction. **Release gate remains open; no deployment has occurred.**

| Page | Performance | Accessibility | Best Practices | SEO | LCP | CLS |
| --- | ---: | ---: | ---: | ---: | --- | ---: |
| Home | 100 | 100 | 100 | 69 | 1.5 s | 0 |
| Services | 100 | 100 | 100 | 69 | 1.5 s | 0 |
| Contact | 100 | 100 | 100 | 69 | 1.3 s | 0 |

Lighthouse 13.5.0, mobile defaults, local built Worker at port 8797. Reports: `docs/evidence/lighthouse/` (local). SEO's only failed scored audit is `is-crawlable`: local builds intentionally emit noindex and disallow crawling. These are actual local measurements, not 95+ production acceptance. The production build must be verified with its final hostname, analytics and Turnstile configuration before acceptance.

Build, Astro check (zero errors/warnings/hints), lint and format passed. The Playwright suite passed **26/26** functional/layout/security tests. A separate screenshot-only test passed at the approved comp size. Security tests use both controlled siteverify responses and the real Cloudflare dummy pass/fail/duplicate keys; they never send mail. Browser tests cover every URL and redirect, real 404, 40 page/theme/viewport combinations, images/targets/overflow/console, synthetic contact reveal, malformed/missing-token/honeypot requests, retained input and keyboard retry focus, and JavaScript-free social fallbacks. The browser failure scenario uses a controlled expired-token API response; actual helper rejection is independently covered. Email success is not covered because delivery is not configured.

Screenshots for home, services, contact and 404 at 360, 768, 1024, 1440 and 1920px, in both themes, are in `docs/screenshots/new/`. Old screenshots remain beside them in the ignored `old/` directory because they expose protected contacts. All 40 new captures were validated by the independent finish reviewer. The comp-size capture and comparison are local in `.impeccable/review/`.

`npx impeccable@4.1.0 detect --json dist/` exited 0. Its single advisory was the interior heading's 5rem endpoint absent from DESIGN.md's typography ramp; the intentional ramp has now been reconciled in DESIGN.md and its sidecar (see docs/design-finish.md). The detector has not been rerun after this documentation-only correction. The npm CLI version differs from the installed skill version (4.3.1). Audit/harden/adapt/polish evidence is in `docs/release-audit.md`; final independent disposition is in `docs/finish-review.md`.

The complete build and tracked-file contact scan passed; Git history was also scanned with privately recorded contacts. No actual contact values were found. An initial test found synthetic values copied by the adapter into `dist/server/.dev.vars`; the post-build scrub now removes credential files and local preview loads fixtures from `.wrangler/test/` instead. Subsequent absence checks passed.

Still required: configured and verified email sending, a real end-to-end submission, successful-form browser coverage, actual screen-reader walkthrough, final production configuration Lighthouse/console checks with every category >=95, production secret installation, Workers Builds and live URL verification. Passing the implemented local tests does not certify these missing gates.

GitHub Actions `quality` passed on commit `76e8ffb` in 1m27s: https://github.com/redwood-egarcea/rc-general-contracting/actions/runs/35914210102 . The current review is PR #1. VoiceOver startup was attempted through the Computer Use skill, but the Mac was locked and could not be automatically unlocked. No screen-reader pass is claimed; the owner was asked to unlock it.

The production configuration was built separately after local tests: build passed, all three marketing pages use the final canonical hostname and omit noindex, public Turnstile sitekeys are real, and the complete contact-value scan passed. This static inspection confirms the production indexing configuration; it does not substitute for the pending production Lighthouse/console run or actual delivery. CI also passed on the documentation/evidence commit `36f0da5` in 1m19s (run 35916423165).
