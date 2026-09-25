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

## Original Phase 6 acceptance requirements

The original brief requires build, type, lint/format, Impeccable detector, audit/harden/adapt/polish, per-page Taste pre-flight, Lighthouse, Playwright, keyboard, and screen-reader checks. Every requested Lighthouse category must reach at least 95 on home, an interior page, and contact. Dated results and outstanding checks follow below; the owner later authorized a review deployment with disclosed limitations.

Tests must cover pass/fail Turnstile tokens, expiry and reuse errors, honeypot rejection, body/content-type validation, contact reveal, secret absence from build output, URL status codes, real 404 behaviour, and browser console errors. Live email delivery is verified only in the authorized delivery test, after the destination and provider are configured.

## Phase 2 proposal checks

Both proposed systems were checked for solid-colour token contrast: 50 text, action, border, and focus pairs passed their stated thresholds. The lowest checked normal-text contrast is 5.38:1. Details are in `docs/design-contrast.json`. This checks the proposed tokens only, not a rendered interface or imagery.

The design content plan contains every source service. Tracked proposal documents were checked against the locally recorded email and phone values; no match was found. The complete original source remains local and ignored. Generated direction mockups are concepts, not responsive-browser or Lighthouse evidence.

## Implementation evidence before copy approval

Home, services, contact and 404 have independent Impeccable A/B page reviews, recorded in the corresponding critique documents. Each review's built-page detector returned exit 0 with no findings. Subsequent changes and the complete built output will be checked again in Phase 6. These bounded checks do not certify the later complete-site gate.

Routine build, Astro check and lint passed during implementation. The built Worker has a real 404, synthetic contact reveal with dummy Turnstile verification, and retained form input through the explicit delivery-unavailable response. Retry verification restores useful focus. A scan of repository candidates and build files found none of the privately recorded contact values. Production email success, complete pass/fail/expiry/reuse coverage, the final secret-absence scan, Lighthouse, both-theme/five-width captures and full keyboard/screen-reader testing remain required. Email sending is intentionally incomplete while provider setup is pending.


## Pre-deployment verification, 2026-09-23

Copy approved by the owner's “Commit and deploy” instruction. At the time of these local checks, the release gate remained open and deployment had not occurred. See the live deployment record below for the subsequent release.

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

## Live deployment, 2026-09-23

Live URL: https://rc-general-contracting.egarcea.workers.dev . The owner repeated “Please deploy it” after the email-delivery and screen-reader limitations were disclosed, authorizing this review release. The original brief is still incomplete where noted below.

- Deployed main commit: `d975a947f74dfd31e120f9c913753c6909f7e71d` (PR #1 merged).
- Cloudflare Worker version: `ebddd4f9-80cf-4037-8a5d-f9b34081c64a`.
- GitHub Actions `quality` passed on the release branch and on merged main: https://github.com/redwood-egarcea/rc-general-contracting/actions/runs/35917627172 . CI includes the Impeccable detector and 26 functional tests.
- Production build, Astro check, lint/format, contact-value scan and Wrangler deployment passed. All five required secrets are installed in the Worker; only their names were inspected after deployment.
- HTTPS checks passed for `/`, `/#contact`, `/services/`, `/contact/`, robots and sitemap. Unsuffixed services/contact URLs return their expected 301; an unknown path returns 404. CSP is present on all checked HTML responses. Protected values are absent from those responses and referenced same-host JS/CSS bundles.
- Live negative API checks passed: missing/dummy tokens return 400, an unsupported content type returns 415, and the honeypot returns 400. API responses include `Cache-Control: no-store`. Production rejects the dummy token.
- Both email and phone reveal succeeded through real production Turnstile in the browser. Each result became the expected mailto/tel link and received focus. No contact values were saved in public evidence.

| Page | Performance | Accessibility | Best Practices | SEO | LCP | CLS |
| --- | ---: | ---: | ---: | ---: | --- | ---: |
| Home | 97 | 100 | 100 | 100 | 2.3 s | 0 |
| Services | 100 | 100 | 100 | 100 | 1.7 s | 0 |
| Contact | 100 | 100 | 100 | 100 | 1.5 s | 0.004 |

Lighthouse 13.5.0, mobile defaults, live HTTPS host and production configuration. Reports are local in `docs/evidence/lighthouse-live/`. The initial contact run lost its Chrome protocol session; the separate completed contact run produced the recorded results. All requested categories meet 95. These measurements are a snapshot, not a guarantee of every visitor's performance.

The interactive contact check was initially free of console messages; a later Managed Turnstile iframe emitted two opaque errors and two warnings (`%c%d ... NaN`) from `challenges.cloudflare.com`. Both contact reveals completed. The separate contact Lighthouse run recorded no console errors. A universal zero-console-error gate is therefore not claimed.

Remaining work: configure a sending provider and verified sender, implement and test successful delivery with a real end-to-end enquiry, complete the actual screen-reader walkthrough, investigate the intermittent third-party console output, and connect Workers Builds with production/preview secrets. The current form visibly states that sending is unavailable and offers direct contact alternatives; it cannot deliver an enquiry. GitHub CI is connected, but Cloudflare deployment was performed through Wrangler and is not automatic.

## Business account deployment, 2026-09-25

Production is now https://rcgcinc.ca in the requested business account. PR #3 passed required CI and merged before deployment. Main source: `e9cb3261b2f64d05c77beb07a422a40810b8c2c7`; Worker version: `ca2af7eb-9fc9-4793-b8fc-2ce4c996e670`. CI run: https://github.com/redwood-egarcea/rc-general-contracting/actions/runs/36140922930 .

| Page | Performance | Accessibility | Best Practices | SEO | LCP | CLS |
| --- | ---: | ---: | ---: | ---: | --- | ---: |
| Home | 99 | 100 | 100 | 100 | 1.9 s | 0 |
| Services | 99 | 100 | 100 | 100 | 1.8 s | 0 |
| Contact | 100 | 100 | 100 | 100 | 1.5 s | 0.004 |

Lighthouse 13.5.0, mobile defaults, new live HTTPS host. Reports: `docs/evidence/rcgcinc-lighthouse/` (local only). All requested categories meet 95.

Build, Astro check, lint, formatting, secret-absence scan, deployment dry run and Impeccable detection passed. The first local suite exposed Wrangler's custom-domain hostname substitution; removing production routes from the local preview restored the intended localhost requests. The rerun passed all 26 functional/security/browser tests, with the optional screenshot-only test skipped. Site layout and copy did not change.

Live URL statuses, path redirects, apex HTTP/www canonical redirects with query preservation, canonical metadata, robots, sitemap, 404 and CSP passed. The www DNS result had reached authoritative/public resolvers and the normal browser; a local Node negative cache required the authoritative address for its separate HTTP check. Certificate validation was retained. Production APIs rejected missing/dummy tokens, unsupported content types and honeypot data; no-store headers were present. Contact values were absent from fetched HTML/JS/CSS and all build files. The new account's analytics beacon loaded once in the real browser.

Both email and phone reveal succeeded through the new production Turnstile widgets and moved focus to their links. No browser warnings/errors were recorded during that contact check. Email sending, its success-path/end-to-end tests, an actual screen-reader walkthrough and Workers Builds integration remain incomplete. The account/domain deployment does not mark those remaining features as finished.

## Approved logo and review update, 2026-09-25

The new RC mark is used in header/footer, favicon, touch icon and organization metadata. Direct contact options now precede the unavailable form. See `docs/ui-ux-seo-review.md` for independent UI/UX and technical findings, SEO follow-ups and scope limits.

Astro check (32 files), lint, formatting, production build, contact-value scan and Wrangler dry run passed. All 27 local Playwright checks passed, including screenshot capture. The screenshot matrix now reflects the approved mark at all five requested widths and both themes. Additional independent browser checks found no horizontal overflow at 320px on any route. Impeccable detector exited 0 with zero findings.

Lighthouse 13.5.0 mobile defaults, production build served locally before release:

| Page | Performance | Accessibility | Best Practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| Home | 100 | 100 | 100 | 100 |
| Services | 100 | 100 | 100 | 100 |
| Contact | 100 | 100 | 100 | 100 |

These are lab measurements. Delivery and the full screen-reader gate remain open; the original and earlier-preview domains still need SEO migration treatment. No full-brief completion or ranking improvement is claimed.

Live logo release: PR #5 passed required CI (run 36144104473) and deployed from `4ed694b4e916ca99f8aac46730640ec47ecaf7fb`, Worker version `89dc051b-e0fb-4c4a-b554-7de318ab1e71`. URL/security checks and the published logo/metadata assets passed. Live mobile Lighthouse: home 99/100/100/100, services 100/100/100/100, contact 99/100/100/100. The contact run required one retry after a headless-browser protocol failure; only the completed report is counted. A final 623px browser check identified inherited right alignment in the mobile hero action; a scoped full-width rule addresses it without changing desktop composition.

## Automatic contact reveal, 2026-09-25

The home and contact pages now begin a passive check on load. One verified API request returns both direct-contact links. Failure, expiry, unsupported browsers, blocked scripts, stalled widgets and network errors expose a manual retry; a fresh widget is created for every retry. Automatic completion does not move focus.

Validation before release:

- Astro check: 32 files, zero errors, warnings or hints. Lint, formatting, production build, contact-value scan and Wrangler dry run passed.
- Playwright: 36 passed; one optional screenshot-only case skipped. The real Cloudflare dummy pass widget revealed both contacts automatically through the server. Deterministic cases covered all failure paths above, keyboard retries, duplicate/stale callbacks, one token per request, and server rejection. Existing form, request guard, token validation, rate-limit, no-JavaScript and URL checks passed.
- Layout matrix: home, services, contact and 404 in both themes at 360, 768, 1024, 1440 and 1920px; no overflow or console errors. The mobile fallback was also inspected in the in-app browser, whose verification request failed and correctly exposed the retry control.
- Impeccable detector: exit 0, no findings. The scoped visual/Taste check retained the existing typography and colour system, stacked contact links, 48px link targets, visible focus and plain error recovery. Humanizer copy review is recorded in `docs/copy-review.md`.

Local evidence: `docs/evidence/passive-contact/` (ignored). This change does not configure email delivery or close the outstanding manual screen-reader review.

Lighthouse 13.5.0 mobile defaults, local built Worker with dummy pass credentials and automatic verification active:

| Page | Performance | Accessibility | Best Practices | SEO | LCP | CLS |
| --- | ---: | ---: | ---: | ---: | --- | ---: |
| Home | 100 | 100 | 100 | 69 | 1.2 s | 0 |
| Contact | 95 | 100 | 100 | 69 | 2.7 s | 0 |

The local SEO score reflects the deliberately non-indexable test build (`noindex` and disallowed robots). Production was rebuilt afterward with the canonical HTTPS host and production keys; its indexing metadata is preserved. These local figures do not substitute for a live SEO check.

## Email Routing form integration, 2026-09-25

Local validation: Astro check covered 33 files with no errors, warnings or hints. Lint, formatting and build passed. Playwright passed 41 checks; one optional screenshot-only case was skipped. New cases cover the fixed recipient, safe Reply-To, HTML escaping, waiting for delivery acceptance, provider failure, invalid configuration, successful API delivery through Cloudflare's local simulator, and successful inline browser confirmation with cleared fields. Existing token, honeypot, rate-limit, request validation, contact reveal, keyboard and layout checks still pass.

The existing `rcgcinc.ca` Email Routing domain is ready. The owner approved the narrower additional Routing permission and a verification email was sent to the requested destination. At preparation time that destination remains pending verification. No real enquiry has been delivered yet; the simulator does not establish inbox delivery. Release requires destination verification and a real form submission. Local evidence is kept in ignored `docs/evidence/email-routing/`.
