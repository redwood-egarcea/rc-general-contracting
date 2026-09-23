# Design documentation finish, 2026-09-23

Outcome: the implemented interior/404 heading ramp is now recorded in the approved Rooms in focus system. This is a documentation reconciliation, not a redesign or a complete release pass. The independent finish review remains `disposition: fix`; no deployment has occurred.

## Scope and authority

Read `PRODUCT.md`, `DESIGN.md`, `src/styles/global.css`, the four `.impeccable/surfaces/` contracts, sampled header/form/reveal components, and `docs/finish-review.md`, `docs/release-audit.md`, and `docs/quality.md`. The documenter follows `.agents/skills/impeccable/agents/impeccable_documenter.toml` and `reference/document.md`.

The owner-selected Rooms in focus identity, original roof/tree/RC logo, original company photography, and approved font pairing remain authoritative. Generated comp details do not override those assets or written decisions. No source files, surface briefs, build-state files, or review disposition were changed by this pass.

## Recorded change

- Added `typography.interior-heading` to `DESIGN.md` frontmatter: Barlow Condensed 600, `clamp(3rem, 5.5vw, 5rem)`, line-height 1.05, and tracking -0.02em. These values are already shared by the services/contact introductions and 404 heading in the stylesheet. The 5rem endpoint belongs to this compact H1 role; the home display and section headline roles are preserved.
- Refreshed the schemaVersion 2 sidecar from the approved frontmatter and sampled implementation. It now includes palette metadata, typography-role metadata, and self-contained examples of the actual primary button, secondary reveal button, retry action, labelled input, navigation, and interior heading. Existing palette and type identity are unchanged.
- Kept primitive tokens in `DESIGN.md`, their normative schema location. The sidecar extends those tokens with canonical colour metadata and component CSS; it does not introduce a competing `tokens` snapshot. Tonal ramps are panel visualizations synthesized from the existing colour tokens, not new UI colours.
- Replaced the stale pre-build-only sidecar status with the bounded review status. The current 140ms control transition and reduced-motion behaviour are represented; the unused optional 180ms disclosure is not presented as implemented motion.

## Review evidence and limits

The independent reviewer validated all 40 captures across four routes, five widths, and both themes, plus the exact-size comp comparison and ten paired regions. The measured comparison was 0.7874 overall with a tool verdict of drift. Applying the documented original-asset and font authority, the reviewer found no missing or contradicted salient visual element and called for no visual rebuild. This documenter relies on that review; it did not rerun browser review or capture screenshots.

The reported `npx impeccable@4.1.0 detect --json dist/` run exited 0 with one advisory: the interior heading's 5rem endpoint was absent from the recorded typography ramp. This pass addresses that documentation mismatch. The detector was not rerun, so no new detector result is claimed. The installed skill is version 4.3.1; the reported npm CLI is version 4.1.0.

`docs/quality.md` records 26 passing local functional/layout/security tests and local mobile Lighthouse scores of 100/100/100/69 on home, services, and contact. SEO remains below the requested threshold because the local build deliberately prohibits crawling. These measurements do not establish production acceptance.

The Impeccable comp round remains recorded as skipped because the approved comp predates the state, and the measured spec is closed. Plates remain open; hero and later phases remain pending. No tool phase was force-closed or represented as complete by this documentation pass.

## Remaining work and uncatalogued differences

Release still requires configured email delivery and a verified sender, a real successful submission and successful-form browser coverage, an actual screen-reader walkthrough, production configuration and secret installation, Lighthouse/console checks meeting every requested category threshold, Workers Builds, and live URL verification. The unavailable-delivery response is truthful but does not fulfil the contact flow's success promise.

Source sampling also identified pre-existing differences outside the requested heading reconciliation: desktop home H1 and H2 inherit line-height 1.05 while the approved display/headline tokens say 1.02/1.1; H2 tracking is -0.02em while the headline token says -0.01em; desktop navigation inherits line-height 1.6 while its token says 1.4; form labels inherit 1.125rem/1.6 while the label token says 1rem/1.4. The mobile home H1 does use 1.02. The optional 180ms disclosure remains approved prose but has no current implementation. These differences are reported without changing the incumbent approved values or source in this bounded pass; they are not new design rules. No craft-floor defect was canonized.
