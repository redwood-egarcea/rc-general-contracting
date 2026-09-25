# RC General Contracting Inc website

Astro 7 with strict TypeScript, plain CSS, static pages and Cloudflare Workers API routes. The owner approved the audit, URL map and **Rooms in focus** design direction. Home, services, contact and 404 pages are implemented. Copy was approved by the owner’s “Commit and deploy” instruction. The site is live at [rcgcinc.ca](https://rcgcinc.ca). Deployment evidence and remaining work are recorded in [docs/quality.md](docs/quality.md).

The production site runs in the business Cloudflare account on Worker Custom Domains. HTTP and `www.rcgcinc.ca` redirect to `https://rcgcinc.ca`, preserving paths and query strings. The earlier workers.dev preview remains in its original account. Email sending awaits the owner's provider selection and verified sender. The contact page displays this limitation and links to direct contact options. Until delivery is configured, valid submissions return a clear 503 failure and preserve the visitor's text. Both email and phone reveal were verified on the new live domain with production Turnstile. No real email has been sent.

## Local setup

Use Node 22.12 or later and npm.

```sh
npm ci
cp .dev.vars.example .dev.vars
npm run dev
```

The example file uses Cloudflare's documented dummy pass keys and synthetic contact values. Never copy these to production. Real contact values belong only in Worker secrets. `.dev.vars` is ignored by Git.

For a stable preview of the built Worker:

```sh
PUBLIC_SITE_URL=http://localhost:8797 PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA PUBLIC_TURNSTILE_REVEAL_SITE_KEY=1x00000000000000000000AA npm run build
node scripts/preview-test.mjs
```

Restart Wrangler after rebuilding so its static asset index reflects the new output. Stop it with Ctrl+C. Astro's background development server can be managed with `npx astro dev --background`, `npx astro dev status`, and `npx astro dev stop`. Avoid running `astro check` and builds against an active dev preview; dependency re-optimization can leave its browser session stale.

Routine implementation checks:

```sh
npm run generate-types
npm run check
npm run lint
npm run format:check
npm run build
```

`npm run test:e2e` runs the Playwright security and browser suite using the built Worker. First build with `PUBLIC_SITE_URL=http://localhost:8797`, `PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA`, and `PUBLIC_TURNSTILE_REVEAL_SITE_KEY=1x00000000000000000000AA`. Tests use synthetic secrets from `.dev.vars.example` in an ignored configuration outside `dist`. Set `CAPTURE_SCREENSHOTS=1` to refresh the five-width light/dark evidence. `node scripts/check-contact-secrets.mjs` scans tracked files and the entire build. These checks do not replace the open Phase 6 gates in [docs/quality.md](docs/quality.md).

## Editing content

- `src/content/site.json`: shared labels, page copy, metadata, image descriptions and supported company facts.
- `src/content/services.json`: service collection, validated by Zod.
- `src/content/testimonials.json`: exact source testimonials, names, dates and ratings. Preserve quotations unless the owner approves a change.
- `src/content/messages.json`: form and contact-reveal states, validation and errors.
- `src/assets/`: approved original company imagery, processed through Astro Image/Picture.
- `src/styles/global.css`: selected light/dark tokens, layout and interaction styling.

Every new public statement must have a source. Review new prose through the installed Humanizer skill in file mode and update [docs/copy-review.md](docs/copy-review.md). The original source archive remains unchanged. [DESIGN.md](DESIGN.md) governs typography, colors, spacing and motion.

## Adding a page

Write an Impeccable surface brief within the approved system. Create reusable components and a composition-only route under `src/pages/`. Use `Base.astro` with a title and description under 155 characters. Add the approved route or redirect to `docs/url-map.json`. Run the page critique and Taste preflight, then the applicable quality checks. Pages prerender by default; only `/api/*` exports `prerender = false`.

## Configuration and secrets

Root `wrangler.jsonc` pins the business account, custom domains, public Turnstile keys, canonical hostname, hostname allowlist, asset routing and rate-limit bindings. Cloudflare Web Analytics uses automatic snippet installation for this zone; `PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN` is deliberately empty to avoid injecting a second beacon. Astro reads only explicitly allowed `PUBLIC_*` settings. Non-local builds reject absent or dummy Turnstile site keys. Static `_redirects` and robots rules are generated at build time; the build adds CSP hashes for its inline metadata scripts. The Cloudflare adapter emits its deployment configuration under `dist/server/`, pointing to `dist/client/` assets. Use Wrangler from the repository root so it follows this generated configuration.

Required secret names currently declared in Wrangler:

- `TURNSTILE_SECRET_KEY`: Managed form widget.
- `TURNSTILE_REVEAL_SECRET_KEY`: Non-Interactive reveal widget.
- `CONTACT_EMAIL` and `CONTACT_PHONE`: original public contact details.
- `FORM_DESTINATION`: owner-supplied recipient, kept separate from the public email.

The five required secrets are installed in the live Worker. `EMAIL_FROM` and any provider API key will be added after a provider and verified sender are selected. Mirror the appropriate secrets in Workers Builds production/preview settings when that integration is connected. Never place them in public build variables, content, source, logs or GitHub workflow text.

To set or rotate a configured secret, use the interactive prompt:

```sh
npx wrangler secret put TURNSTILE_SECRET_KEY
npx wrangler secret put TURNSTILE_REVEAL_SECRET_KEY
npx wrangler secret put CONTACT_EMAIL
npx wrangler secret put CONTACT_PHONE
npx wrangler secret put FORM_DESTINATION
```

Rotate widget keys through Cloudflare's supported rotation flow, update Worker/Builds secrets together, then verify both actions. If a public site key changes, rebuild the static site as well. Rotate the selected delivery credential at its provider and update all active environments before revoking the previous credential. Keep staging secrets separate when previews need different recipients.

The API limits are 20 requests/minute/IP overall and 3 submissions/minute/IP, per Cloudflare location. All responses use `no-store`. Form bodies are capped at 32 KiB; reveal bodies at 4 KiB. Production verification checks success, exact hostname and action. The narrow local-only dummy-key exception is documented in [docs/decisions.md](docs/decisions.md).

Direct contact details are checked automatically when the home or contact page loads. The Non-Interactive reveal widget stays out of view during this attempt. One verified request returns both email and phone; neither value is embedded in the page or bundle. A failed or stalled attempt shows “Verify with Cloudflare Turnstile” for a fresh, visible retry. Automatic completion never moves keyboard focus. Visitors without JavaScript retain the social contact links.

## Remaining release work

1. Complete delivery-provider setup, implement sending, and verify a real enquiry end to end.
2. Complete the remaining Phase 6 checks documented in [docs/quality.md](docs/quality.md), including the actual screen-reader walkthrough and successful email-submission coverage.
3. Connect Workers Builds and configure production/preview settings and secrets. The current deployment was published with Wrangler after GitHub CI passed.
4. Owner reviews the site on the new custom domain. The requested account/domain migration is complete; remaining features are tracked separately.

The owner explicitly requested deployment after the delivery and screen-reader limitations were disclosed. That release authorization does not mark the complete original brief as finished.

## Private source evidence

`old-site/`, `docs/source-copy/`, `docs/screenshots/old/`, raw evidence and `docs/contact-details.local.md` contain original contact values. They remain local and gitignored to honor the requirement that contact details never enter the repository or shipped output. Preserve a private backup before moving workspaces; a Git clone will not include them.

The reproducible crawl is `python3 scripts/audit-site.py`. A later crawl replaces exported evidence, so back up the dated archive first. Browser-rendered and conditional content supplements the crawler.

See [the audit](docs/audit.md), [asset inventory](docs/assets.md), [asset provenance](docs/asset-provenance.md), [skill setup](docs/skills.md), [decisions](docs/decisions.md) and [copy review](docs/copy-review.md).

## Repository and release status

Source: https://github.com/redwood-egarcea/rc-general-contracting. The owner approved public visibility. `main` requires a pull request and a successful `quality` check; administrator bypass, force pushes and deletion are disabled.

The live host is `https://rcgcinc.ca`. Production Turnstile widgets, Worker secrets and Cloudflare Web Analytics belong to the business account. The Worker Custom Domains and canonical redirect are configured; the existing email DNS records were preserved. Cloudflare's dashboard reports that Email Sending requires a Workers Paid plan. A sending provider and verified sender still need to be configured.

The post-build script removes credential files copied by the adapter. Use `node scripts/preview-test.mjs` for a local preview with synthetic credentials. Keep real values in Worker secrets only. Workers Builds integration and secret mirroring remain pending; GitHub CI currently checks changes but does not publish them to Cloudflare.

For production updates, use the `rcgcinc` Wrangler profile and run from the repository root after the PR and required checks pass:

```sh
npm run build
node scripts/check-contact-secrets.mjs
npx wrangler deploy --profile rcgcinc
```

The profile is local to this workstation. On another machine, authorize that account with a new profile before deploying; credentials are not in Git. See [the domain migration record](docs/domain-migration.md) for the target account, redirect rule, analytics mode and live checks.
