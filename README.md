# Royal City website rebuild

Phase 1 is complete and awaiting review. There is no application scaffold or deployment yet.

Start with [the audit](docs/audit.md), [product context](PRODUCT.md), [asset inventory](docs/assets.md), and [decisions](docs/decisions.md). Approve the audit and URL map before design work. Review proposed removals individually.

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

1. Audit approval and explicit keep/drop decisions.
2. Two design directions for home and one interior page, then design approval.
3. Astro implementation and protected contact flows.
4. Copy review, followed by all quality gates.
5. GitHub and Workers Builds setup, workers.dev review, then an explicitly approved custom-domain cutover.

Local setup, editing content, adding pages, deployment, and secret-rotation instructions will be completed with the implementation. No production secrets or test keys have been configured.
