# Royal City website rebuild

Phase 1 and the URL map are approved. Phase 2 design exploration is in progress. There is no application scaffold or deployment yet.

The owner has confirmed the public name RC General Contracting Inc, Kincardine as the service area, reuse of company photos, and Cloudflare Web Analytics. A Cloudflare-provided hostname replaces the proposed domain purchase. The confirmed hostname is `workers.dev`, retaining the Workers stack. The full form-delivery address is recorded locally for secret configuration.

Start with [the audit](docs/audit.md), [product context](PRODUCT.md), [asset inventory](docs/assets.md), and [decisions](docs/decisions.md). Review proposed removals individually; design approval is the next gate.

## Local evidence

`old-site/`, `docs/source-copy/`, `docs/screenshots/old/`, and `docs/contact-details.local.md` contain original evidence, including current public email and phone values. They are gitignored to keep those values out of the repository. They remain in the original workspace and are not available from a Git clone. Preserve a private backup before moving workspaces.

The public-source crawler uses Python 3 and curl:

```sh
python3 scripts/audit-site.py
```

It fetches linked pages, the sitemap, source assets, and redirect probes. Before running it on a fresh workspace, capture browser-rendered HTML and the browser asset inventory for the full archive. Conditional copy, the not-found page, screenshots, and Lighthouse were also captured during the audit. A later crawl replaces the crawl files and source-copy export; preserve the dated archive first.

## Skills

See [skill setup](docs/skills.md) for installation commands and the project Taste dials. The project keeps Impeccable's recommended ignore rules and tracks `PRODUCT.md`. `DESIGN.md` will be written only after a direction is selected.

## Next gates

1. Remaining explicit keep/drop decisions from the approved audit.
2. Two design directions for home and one interior page, then design approval.
3. Astro implementation and protected contact flows.
4. Copy review, followed by all quality gates.
5. GitHub and Workers hosting setup, followed by review of the hosted site. Any later custom-domain cutover requires explicit approval.

Local setup, editing content, adding pages, deployment, and secret-rotation instructions will be completed with the implementation. No production secrets or test keys have been configured.
