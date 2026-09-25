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

Deployment and live checks are pending. Email delivery remains unconfigured; the visible notice and protected direct-contact alternatives remain in place. Workers Builds integration is not yet connected.
