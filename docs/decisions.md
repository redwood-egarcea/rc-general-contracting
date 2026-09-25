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

## Phase 2 selection

The owner selected A, Rooms in focus, through the design comparison page, without a correction request. The approval was collected with Impeccable serve-question key `6122fc83`. Record the approved system before building, as the brief requires. Do not add another composition-selection round: the two requested directions and explicit choice satisfy this gate.

The source logo and approved company images must ship as originals, processed only for delivery. Impeccable instructions to regenerate image plates or substitute a pixel-matched font cannot override the brief's factual preservation and selected open-font pairing. Generated mockup artifacts are visual proposals, not evidence of additional work. The split introduction and three-line mobile source tagline are deliberate Impeccable structural decisions; Taste checks the rendered execution for generic output and readability rather than replacing that approved composition with its default header rules.

## Approved copy and fallback replacements

The owner approved replacing the obsolete reCAPTCHA notice with “This form uses Cloudflare Turnstile to help prevent spam. JavaScript is required.”, removing the old generic cookie banner when GoDaddy tracking is removed, consolidating duplicate metadata, and replacing the empty footer link with a visible home link. The owner approved existing Facebook and Instagram destinations as the JavaScript-free fallback. The original text remains archived. This does not approve the rest of the Phase 5 copy yet.

## Current stable framework

The requested `npm create astro@latest` resolved Astro 7.3.4 with the strict minimal template; `astro add` resolved Cloudflare 14.3.3 and sitemap 3.7.4. The brief requests current stable and identifies v6 as the version when written, so the current stable major is used. Static prerendering uses Node with compile-time image optimization; on-demand APIs use Workers. Sessions are disabled because this site has no sessions. The adapter generates its deploy configuration under `dist/`; the root asset config retains the requested `./dist` declaration.

## Contact verification and local development

Use two widget configurations: Managed for the form, Non-Interactive for contact reveal. Widget mode belongs to a widget, so the second flow gets `PUBLIC_TURNSTILE_REVEAL_SITE_KEY` and `TURNSTILE_REVEAL_SECRET_KEY` alongside the requested form keys. Both routes call the same `src/lib/turnstile.ts` verifier. Production acceptance requires Cloudflare success, the exact request hostname in the configured allowlist, and the expected action. Details: [widget modes](https://developers.cloudflare.com/turnstile/concepts/widget/) and [server validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/).

All API requests have a 20-request/minute/IP limit; submissions also have a 3-request/minute/IP limit. Cloudflare rate-limiting bindings apply per location, not as a globally precise counter. The thresholds allow normal verification retries and discourage repeated collection or submissions. Unknown IPs fail closed in production. See [Cloudflare's binding semantics](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/).

Local development is restricted to `APP_ENV=development` and an exact localhost/127.0.0.1 request hostname. `.dev.vars.example` contains public dummy keys and synthetic contact values. A real request to Cloudflare's dummy verifier on 2026-09-23 returned `hostname: example.com`, no action, and `metadata.result_with_testing_key: true`, unlike the illustrative response in the documentation. Only that exact dummy response, with the documented dummy token and secret on a local development host, has an explicit test-only acceptance branch. Production never accepts this branch. Hostname/action rejection must also be tested independently with realistic verification responses. [Documented test keys](https://developers.cloudflare.com/turnstile/troubleshooting/testing/).

Astro reads an explicit allowlist of four public settings from root Wrangler vars or build environment variables. Worker secrets are never imported into the static build configuration. Non-local builds reject missing or dummy Turnstile site keys. Wrangler generates binding types with non-literal string vars because development values differ from production.

## Email delivery setup

Cloudflare and GitHub CLI authentication are available. Checking Cloudflare Email Sending domains returned `Unauthorized` (2036), even though the OAuth scope includes email sending. No delivery provider or sender has been activated and no email has been sent. The owner has been asked whether to enable Cloudflare Email Service, use an existing provider, or request another recommendation. A verified sender domain is separate from the approved workers.dev website host. The supplied destination is retained only in the ignored local contact record.

## Static routing and response headers

Astro uses `trailingSlash: ignore` so the required exact `/api/submit` and `/api/contact` URLs work without redirects that could alter POST behavior. Generated `_redirects` normalizes the two new public page paths to their slash forms. The original home path and contact anchor remain unchanged. The real missing-page document is emitted as `dist/client/404.html`.

Root asset settings remain as requested; Astro's generated deployment config points the asset binding to `dist/client` and the Worker entry to `dist/server/entry.mjs`. `_headers` applies to assets, so APIs set their no-store and security headers directly. A post-build pass hashes every inline metadata script into the generated CSP. Source scripts stay external. Turnstile and the configured Cloudflare Analytics origins are explicitly allowed; no broad script unsafe-inline permission is used.

The approved direction and detailed contact/404 requirements settle those surfaces' purpose and behavior. Impeccable's generic extra interview/approval rounds are not repeated during the authorized build. Surface briefs record their contracts; separate required page critiques were completed. The broader finish review and audit/harden/adapt/polish passes remain part of the owner's Phase 6 gate.


## Release preparation

- The owner's “Commit and deploy” instruction approves the complete copy draft and authorizes a workers.dev release. Mandatory functional/quality gates still apply; an unconfigured contact form is not a deployable result.
- The owner explicitly approved making the new GitHub repository public after GitHub rejected private branch protection on the current plan. Main now requires PRs and the `quality` CI job, including for administrators.
- Production hostname: `rc-general-contracting.egarcea.workers.dev`, based on the existing account subdomain. Both Turnstile widgets allow this exact hostname only. Secrets are held locally in ignored release storage pending Worker installation; no secret values are documented here.
- Cloudflare Web Analytics was created through the signed-in dashboard because the Wrangler OAuth token lacks RUM/Builds scopes. Local builds omit analytics so test traffic does not contaminate production data or trigger hostname CORS errors. The public beacon token is committed intentionally.
- Cloudflare dashboard confirms Email Sending requires Workers Paid. The business sender domain is not present in this account. A provider/sender decision remains necessary; no subscription, DNS change, or sender identity is invented.
- Astro's adapter copies `.dev.vars` into `dist/server` for preview. The secure-build script removes all copied credential files. A separate ignored preview configuration supplies synthetic fixtures outside `dist`; production secrets belong in Cloudflare's secret store.
- Native ESM JSON import attributes let Playwright exercise the same strict server helpers under modern Node without a second validation implementation.
- The published Impeccable npm CLI is 4.1.0 while the installed skill is 4.3.1 with engine 0.1.5. CI pins the available CLI 4.1.0; the requested detector command successfully ran and exited 0.

## Explicit deployment instruction after blocker disclosure

The owner repeated “Please deploy it” after the email-sending and screen-reader blockers were explained. This authorizes publishing the current workers.dev review site while those previously requested release gates remain incomplete; it does not establish that the complete original brief is finished. A visible notice directs visitors away from the unavailable form to protected email/phone and social alternatives.

`EMAIL_FROM` is no longer a required deployment secret because no sender has been selected and the current handler never uses it. Do not invent a sender. The initial Worker receives the five known secrets atomically via Wrangler’s supported `deploy --secrets-file` option: current Wrangler rejects setting required secrets separately before a new Worker exists. Future rotation uses `wrangler secret put`. The file is private, local and ignored.

The authorized release was deployed successfully from protected main after CI passed. Both real contact reveals and the public URL map were verified on the live host. Workers Builds remains unconnected; the first release used Wrangler directly. The live version and measured quality results are recorded in `docs/quality.md`. This supersedes the earlier pre-deployment status without treating the missing email delivery and manual accessibility checks as passed.

## Business account and custom domain, 2026-09-25

The owner later requested deployment to the business Cloudflare account and `rcgcinc.ca`, superseding the earlier workers.dev-only hosting decision. The new production configuration pins the account ID and uses apex/www Worker Custom Domains. A zone redirect makes HTTPS apex canonical, preserving paths and query strings. A dedicated local OAuth profile uses only the website's required permissions; the broad default grant was rejected and replaced with a smaller grant.

New Turnstile widgets and secrets are owned by the target account. Cloudflare Web Analytics uses automatic zone installation, verified in the live browser; leaving the source beacon token empty prevents duplicate tracking. Existing mail DNS and the old preview deployment are preserved. Local test configuration discards production account/routes so request-origin validation remains meaningful on localhost. Details and live evidence are in `docs/domain-migration.md`.

## Approved logo and review fixes, 2026-09-25

The owner requested a minimalist RC logo, then explicitly asked to apply it and review UI/UX and SEO. The accepted generated mark replaces the old artwork in the shared branding and icons; the old source remains archived. Astro performs normal delivery-size/format optimization, and the original approved PNG is preserved. A white CSS inverse maintains dark-theme contrast without a boxed logo tile.

Working direct-contact options now precede the unavailable form in both DOM and visual order. Metadata describes those working paths rather than promising form delivery. The full review, independent assessments, measured checks and external-account follow-ups are recorded in `docs/ui-ux-seo-review.md`. No old-domain DNS or earlier-account deployment was changed during this patch.

The owner's specific requirements for original photography, intact testimonials, legal text and the approved hero take precedence over conflicting generic Taste suggestions. The new logo is an explicitly authorized exception to retaining the original logo. No new business facts were added.
