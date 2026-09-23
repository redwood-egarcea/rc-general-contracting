# RC General Contracting Inc website

Astro 7 with strict TypeScript, plain CSS, static pages and Cloudflare Workers API routes. The owner approved the audit, URL map and **Rooms in focus** design direction. Home, services, contact and 404 pages are implemented. Copy is awaiting approval; the final quality gates and deployment have not run.

The approved host is a `workers.dev` address. No domain purchase or Pages deployment is planned. Email sending awaits the owner's provider selection and verified sender. Until then, valid submissions return a clear 503 failure and preserve the visitor's text. Contact reveal works locally with dummy verification and synthetic values. No real email has been sent.

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
npm run build
npx wrangler dev --port 8797 --inspector-port 9337 --local
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

`npm run test:e2e` is reserved for the Playwright suite to be added at the approved quality phase. These routine checks do not replace the complete Phase 6 gates in [docs/quality.md](docs/quality.md).

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

Root `wrangler.jsonc` holds public keys, public hostname, analytics token, hostname allowlist, asset routing and rate-limit bindings. Astro reads only explicitly allowed `PUBLIC_*` settings. Non-local builds reject absent or dummy Turnstile site keys. Static `_redirects` and robots rules are generated at build time; the build adds CSP hashes for its inline metadata scripts. The Cloudflare adapter emits its deployment configuration under `dist/server/`, pointing to `dist/client/` assets. Use Wrangler from the repository root so it follows this generated configuration.

Required secret names currently declared in Wrangler:

- `TURNSTILE_SECRET_KEY`: Managed form widget.
- `TURNSTILE_REVEAL_SECRET_KEY`: Non-Interactive reveal widget.
- `CONTACT_EMAIL` and `CONTACT_PHONE`: original public contact details.
- `FORM_DESTINATION`: owner-supplied recipient, kept separate from the public email.
- `EMAIL_FROM`: verified sender, still to be selected with the delivery provider.

Any provider API key will be added after that choice. Secrets must also be configured in the appropriate Workers Builds production/preview settings before deployment. Never place them in public build variables, content, source, logs or GitHub workflow text.

To set or rotate a configured secret, use the interactive prompt:

```sh
npx wrangler secret put TURNSTILE_SECRET_KEY
npx wrangler secret put TURNSTILE_REVEAL_SECRET_KEY
npx wrangler secret put CONTACT_EMAIL
npx wrangler secret put CONTACT_PHONE
npx wrangler secret put FORM_DESTINATION
npx wrangler secret put EMAIL_FROM
```

Rotate widget keys through Cloudflare's supported rotation flow, update Worker/Builds secrets together, then verify both actions. If a public site key changes, rebuild the static site as well. Rotate the selected delivery credential at its provider and update all active environments before revoking the previous credential. Keep staging secrets separate when previews need different recipients.

The API limits are 20 requests/minute/IP overall and 3 submissions/minute/IP, per Cloudflare location. All responses use `no-store`. Form bodies are capped at 32 KiB; reveal bodies at 4 KiB. Production verification checks success, exact hostname and action. The narrow local-only dummy-key exception is documented in [docs/decisions.md](docs/decisions.md).

## Release gates

1. Complete delivery-provider setup and obtain copy approval.
2. Pass every Phase 6 gate, including real failure/retry coverage and required Lighthouse scores.
3. Create/push the GitHub repository, add required PR CI and protect `main`.
4. Connect Workers Builds, configure production and preview settings, and deploy to the approved `workers.dev` host.
5. Owner reviews the hosted site. Verify a real enquiry end to end. A later custom-domain cutover would require a separate explicit instruction.

No production resource has been created, and no site has been deployed.

## Private source evidence

`old-site/`, `docs/source-copy/`, `docs/screenshots/old/`, raw evidence and `docs/contact-details.local.md` contain original contact values. They remain local and gitignored to honor the requirement that contact details never enter the repository or shipped output. Preserve a private backup before moving workspaces; a Git clone will not include them.

The reproducible crawl is `python3 scripts/audit-site.py`. A later crawl replaces exported evidence, so back up the dated archive first. Browser-rendered and conditional content supplements the crawler.

See [the audit](docs/audit.md), [asset inventory](docs/assets.md), [asset provenance](docs/asset-provenance.md), [skill setup](docs/skills.md), [decisions](docs/decisions.md) and [copy review](docs/copy-review.md).
