# Shipping asset provenance

The owner confirmed that the images displayed on the source site depict company work and may be reused. No generated direction comp is a shipping image. Source assets remain unchanged here; Astro produces responsive delivery formats at build time.

| Shipping source | Local archive | Use |
| --- | --- | --- |
| `src/assets/logo.jpg` | `old-site/assets/21687d531dd1-horizontal` | Existing roof/tree/RC identity. |
| `src/assets/kitchen.jpg` | `old-site/assets/6b40f68c1805-company-van-branded` | Completed kitchen; the misleading old filename is not used as alt text. |
| `src/assets/rendering.png` | `old-site/assets/bcc6fbac245a-kitchen-3d` | Design rendering, labelled as such. |
| `src/assets/framing.jpg` | `old-site/assets/58ba8f894227-construction-site` | Interior framing during construction. |

Original URLs and archive hashes are in `docs/assets.md`. The images are not asserted to depict a single project. No project name, location, client, or date has been supplied.

Self-hosted Barlow Condensed and Source Sans 3 WOFF2 files come from their Fontsource npm packages. License notices are included in `public/fonts/`. Only Latin 600 display, Latin 400 body, and Latin 600 controls are shipped.

Impeccable's generated-plate workflow cannot replace the original images or invent additional pixel detail. Its measured geometry remains useful for layout comparisons. The original files above take precedence over any generic plate-generation or minimum-generation-size requirement. This is a brief-driven exception, not a completed image-regeneration gate.
