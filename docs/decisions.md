# Decisions

## Phase boundary

This work stops after the Phase 1 audit. The user explicitly requires an audit review before design, and design approval before building. No Astro scaffold, GitHub publication, Cloudflare resource, or deployment is created during this phase. Local commits record the work; the first remote phase PR can be opened once GitHub setup is reached.

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

## Crawl method

Use GET requests for this source: HEAD on the homepage returned 404, while GET and browser navigation returned the actual page with HTTP 200. Inventory coverage comes from the sitemap, internal links, rendered page, public media manifest, and shipped router definition. The router declares `/` and a catch-all not-found route. This does not prove the absence of unpublished drafts in the old hosting account.

Do not send a live form submission as part of a read-only audit. The form's intended endpoint is observable in the bundle, but the destination inbox and server validation require account-side confirmation.

## URLs and schema

Preserve `/` and `/#contact`. Additional `/services/` and `/contact/` pages are proposals for design review, not approved routes. Keep the old domain under control for host-level redirects if a new domain is adopted. `_redirects` on the new Worker cannot redirect traffic arriving at an unrelated old host by itself.

The new JSON-LD must omit secret email and phone values. Preserve the remaining supported business facts. Do not add an address, business hours, coordinates, service radius, or review-provider attribution without evidence.

## Contact fallback and legal copy

Turnstile requires JavaScript. A fallback cannot expose secret email or phone in static markup. The existing Facebook and Instagram links are potential fallback contact options, subject to the user's approval. No new physical address, hours, or alternative number may be invented.

The old reCAPTCHA notice cannot truthfully describe a Turnstile deployment. It is preserved verbatim in the archive and listed under Proposed removals for an explicit replacement decision. No replacement legal policy has been drafted.
