# Decisions

## Owner responses, 23 September 2026

| Topic | Confirmed decision |
| --- | --- |
| Public name | RC General Contracting Inc. Use this in new copy; retain old variants in the source archive. |
| Service area | Kincardine. Do not add nearby towns or a service radius. |
| Current photos | They depict company work and may be reused. No project names, clients, dates, or addresses were supplied. |
| Hosting address | Use `workers.dev` and retain the requested Workers stack, confirmed in the follow-up. No new domain purchase is requested. |
| Analytics | Use Cloudflare Web Analytics in place of GoDaddy C2 and its loader. Implementation is pending the build. |

The owner subsequently approved the audit and URL map, including `/services/` and `/contact/`, and requested two design directions. The complete form-delivery address is stored only in the ignored local contact record. Remaining removals, legal-text changes, and design selection still need their stated reviews.

## Hosting clarification

The original brief explicitly requires Workers, its `wrangler.jsonc` asset configuration, Workers Builds, and on-demand Astro API routes. The subsequent `pages.dev` request points to Cloudflare Pages. The current [Astro Cloudflare adapter has removed Pages support](https://docs.astro.build/en/guides/integrations-guide/cloudflare/#removed-cloudflare-pages-support).

Confirmed resolution: retain the specified Workers stack and use the [provided `workers.dev` hostname](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/), with no domain purchase. This supersedes the interim `pages.dev` request.

## Analytics selection

Cloudflare Web Analytics replaces GoDaddy C2, its click-tracking integration, and `/analytics.js`. The owner explicitly selected Cloudflare Analytics after the audit. Use the website-analytics product rather than introducing custom Analytics Engine storage. [Cloudflare describes Web Analytics here](https://developers.cloudflare.com/web-analytics/about/).

The existing generic cookie-consent copy remains archived verbatim. Selecting a new analytics provider does not by itself approve replacement legal wording. Review the actual production services and proposed wording at the copy gate. No analytics site or beacon has been provisioned yet.

## Phase boundary

The Phase 1 audit and URL map are approved. Phase 2 may prepare two design directions for home and services, then must stop for design approval. No Astro scaffold, GitHub publication, Cloudflare resource, or deployment is created during design exploration. Local commits record the work; the first remote phase PR can be opened once GitHub setup is reached.

The configured GPG signer failed to open its passphrase prompt. The Phase 1 commits are unsigned local commits, created with a per-command override. Global and repository signing settings were not changed. Confirm signing requirements before remote publication.

## Source preservation and contact secrecy

The brief asks for unchanged source archives and also prohibits email and phone in the repository. The archive contains those values in HTML, structured data, JavaScript, screenshots, and possibly image pixels. Keep `old-site/`, `docs/source-copy/`, raw evidence, and old screenshots locally and exclude them from Git and deploy artifacts. Track the audit, asset index, decisions, and reproducible crawler without contact values. The local archive is part of the delivered workspace, but a Git clone will not include it.

Raw source text is not passed through Humanizer. That would violate the explicit requirement to keep it unchanged. New public copy will be reviewed in file mode in Phase 5, with legal text and exact quotations protected.

## Skill setup

The first `npx impeccable install` used its global default; a second run explicitly installed it into this project for Codex. The project installation is the authority for subsequent work. The three requested skill sets were installed and read before writing audit scripts. Taste includes both `design-taste-frontend` and `redesign-existing-projects`.

Impeccable init uses the user's explicit brief and the preserved source. Its generic request to repeat stack and product interviews is superseded by the instruction to answer from the fill-in block. Missing facts remain marked. No design world or build-path preference has been recorded. The comp-versus-code workflow choice belongs with the Phase 2 direction review.

## Skill conflicts resolved in favour of the brief

| Skill suggestion | Project decision |
| --- | --- |
| Redesign skill says to retain the existing framework and avoid a rewrite. | Use its audit checklist; rebuild in the exact Astro/Workers stack the user requested after approval. |
| Taste defaults to React/Next, Tailwind, and a motion library. | Use Astro, vanilla TypeScript, plain CSS, and CSS-first motion. |
| Taste defaults to dials 8/6/4. | Set the installed project skill to the user's 6/3/3. No adjustment. |
| Some Taste examples encourage invented names, organic-looking numbers, and randomized dates. | Never fabricate evidence, people, data, dates, or claims. |
| Taste prefers generated imagery and limits quote length. | Preserve real source assets and complete source quotes. Generated imagery cannot imply a real completed project. Any excerpt or omission requires review. |
| Taste bans dashes even in quotations; Humanizer rewrites punctuation. | Preserve exact testimonials and legal text until an approved copy decision. User preservation requirements override style rules. |
| Skills may suggest springs, inertial scroll, or extra design rounds. | No bounce or elastic easing; reduced-motion support; follow the user's phase gates and two-direction brief. |
| Impeccable presents a larger direction tournament and records DESIGN.md after a build. | Present exactly two directions as requested; keep the workshop reasoning in documentation. Record the chosen direction in its DESIGN.md format after approval and before implementation. Direction comps are proposals, not approval of copy or image alterations. |

## Crawl method

Use GET requests for this source: HEAD on the homepage returned 404, while GET and browser navigation returned the actual page with HTTP 200. Inventory coverage comes from the sitemap, internal links, rendered page, public media manifest, and shipped router definition. The router declares `/` and a catch-all not-found route. This does not prove the absence of unpublished drafts in the old hosting account.

Do not send a live form submission as part of a read-only audit. The form's intended endpoint is observable in the bundle, but the destination inbox and server validation require account-side confirmation.

## URLs and schema

Preserve `/` and `/#contact`. Additional `/services/` and `/contact/` pages are approved routes. Keep the old domain under control for host-level redirects if a new domain is adopted. `_redirects` on the new Worker cannot redirect traffic arriving at an unrelated old host by itself.

The new JSON-LD must omit secret email and phone values. Preserve the remaining supported business facts. Do not add an address, business hours, coordinates, service radius, or review-provider attribution without evidence.

## Contact fallback and legal copy

Turnstile requires JavaScript. A fallback cannot expose secret email or phone in static markup. The existing Facebook and Instagram links are potential fallback contact options, subject to the user's approval. No new physical address, hours, or alternative number may be invented.

The old reCAPTCHA notice cannot truthfully describe a Turnstile deployment. It is preserved verbatim in the archive and listed under Proposed removals for an explicit replacement decision. No replacement legal policy has been drafted.
