# Quality evidence

## Old-site baseline

Lighthouse 13.5.0, mobile defaults, simulated throttling. Captured 2026-09-23 at 17:20 UTC. Report and complete settings: `old-site/lighthouse-home.report.json` and `.html` (local only).

| Page | Phase 1 Performance | Accessibility | Best Practices | SEO | Phase 6 result |
| --- | ---: | ---: | ---: | ---: | --- |
| Home `/` | 68 | 96 | 96 | 92 | Not built or tested |
| Interior (`/services/`, approved route) | No old equivalent | N/A | N/A | N/A | Not built or tested |
| Contact (`/contact/`, approved route) | Part of old home | N/A | N/A | N/A | Not built or tested |

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

No new-site quality gate has run. After copy approval, record build, type, lint/format, Impeccable detector, audit/harden/adapt/polish, per-page Taste pre-flight, Lighthouse, Playwright, keyboard, and screen-reader results here. Every requested Lighthouse category must reach at least 95 on home, an interior page, and contact before deployment.

Tests must cover pass/fail Turnstile tokens, expiry and reuse errors, honeypot rejection, body/content-type validation, contact reveal, secret absence from build output, URL status codes, real 404 behaviour, and browser console errors. Live email delivery is verified only in the authorized delivery test, after the destination and provider are configured.

## Phase 2 proposal checks

Both proposed systems were checked for solid-colour token contrast: 50 text, action, border, and focus pairs passed their stated thresholds. The lowest checked normal-text contrast is 5.38:1. Details are in `docs/design-contrast.json`. This checks the proposed tokens only, not a rendered interface or imagery.

The design content plan contains every source service. Tracked proposal documents were checked against the locally recorded email and phone values; no match was found. The complete original source remains local and ignored. Generated direction mockups are concepts, not responsive-browser or Lighthouse evidence.
