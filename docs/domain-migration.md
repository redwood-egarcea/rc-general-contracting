# rcgcinc.ca deployment

The owner requested deployment to the Cloudflare account containing `rcgcinc.ca` on 2026-09-25. The canonical host is `https://rcgcinc.ca`.

## Target and access

- Account ID: `45b0c3cae64272b13031b86ed701e2f7`.
- Active zone ID: `41860ac86bfa7f0b049870645155c43c`.
- Worker: `rc-general-contracting`, with static assets and only `/api/*` rendered on demand.
- Local Wrangler profile: `rcgcinc`, bound to this workspace. Root configuration pins the account ID to prevent an accidental deployment to another account.
- Authorization is limited to account/user reads, Worker scripts/routes, zone reads, certificate configuration and Turnstile. The default grant's unrelated permissions were removed.

## Migration configuration

New Managed contact and Non-Interactive reveal widgets belong to the target account and allow `rcgcinc.ca`. Real contact values and the previously confirmed form destination are carried into the new Worker as secrets. New Turnstile secrets replace those from the preview account. Secret files remain local and ignored.

Worker Custom Domains are configured for the apex and `www`. A zone-level 301 rule matches `(http.host eq "www.rcgcinc.ca") or (http.host eq "rcgcinc.ca" and not ssl)` and redirects to `concat("https://rcgcinc.ca", http.request.uri.path)` with query preservation. Static asset `_redirects` cannot perform domain-level redirects, so the canonical-host rule belongs to Cloudflare's zone configuration.

The five pre-existing DNS records are email records: three Cloudflare Routing MX records, DKIM and SPF. They are preserved. The previous workers.dev deployment remains available in its original account.

Local previews remove account and custom-domain routes from the generated configuration. Otherwise Wrangler changes the simulated request hostname to the custom domain and the origin checks correctly reject localhost requests.

## Validation and release status

Preparation: Astro check passed with zero errors/warnings/hints; lint, format, local build and contact-value scan passed. All 26 functional/security/browser tests passed after the local preview routing correction; the optional screenshot-only test was skipped.

The site was deployed from main commit `e9cb3261b2f64d05c77beb07a422a40810b8c2c7` after PR #3 and its required CI passed. Worker version: `ca2af7eb-9fc9-4793-b8fc-2ce4c996e670`. Both apex and www Custom Domains are attached. The new account's generated workers.dev subdomain is available for preview infrastructure, but the production Worker's workers.dev route is disabled in favor of the canonical custom domain.

The active zone redirect rule is `0b859fd88d5d4948974ac68a77162c47`. Public and authoritative DNS resolve www correctly. The first Node HTTP check encountered a cached negative local DNS result; the normal browser followed www to the apex successfully, and HTTPS requests using the authoritative address confirmed the expected 301 with certificate verification enabled.

Cloudflare Web Analytics site `eed6e3e187aa4d21b03aaefd1230a6fe` uses automatic snippet installation. Its beacon was observed in the live browser with the new account's public token. The source analytics variable stays empty to prevent double counting. Cloudflare did not inject the snippet into non-browser command-line responses; that difference is expected in this deployment and browser verification is the evidence for installation.

Live checks passed for the complete URL map, canonical redirects with path/query preservation, robots, sitemap, real 404, security headers, production token rejection, content-type/honeypot rejection and no-store API responses. Protected contact values were absent from fetched HTML/JS/CSS and the complete build. Both real Turnstile contact reveals succeeded and focused the resulting links. The contact browser check recorded no warnings or errors.

Mobile Lighthouse 13.5.0 results on the new host: home 99/100/100/100, services 99/100/100/100, contact 100/100/100/100 (Performance/Accessibility/Best Practices/SEO). Reports are local in `docs/evidence/rcgcinc-lighthouse/`; further details are in `docs/quality.md`.

Email delivery remains unconfigured; the new account's dashboard also reports that Email Sending requires Workers Paid. The visible notice and protected direct-contact alternatives remain in place. Workers Builds integration is not yet connected, and the earlier manual screen-reader gate remains open. No paid plan was purchased and no new sender or recipient was invented.
