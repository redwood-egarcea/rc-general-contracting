disposition: fix

Missing inputs: no separate QUALITY BAR card or hero-stage diff was supplied; the workshop explicitly makes the company assets and selected composition the visual authority. Final Lighthouse results and an actual screen-reader walk were pending in this review packet.

## persistence

Pass for evidence and direction persistence; fail for complete release acceptance and closed Impeccable tooling state.

- Inspected all 40 PNGs in `docs/screenshots/new/`: home, services, contact and 404, each at 360, 768, 1024, 1440 and 1920px in light and dark themes. Every capture shows the correct page from its document top, with sensible dimensions, loaded page content and no malformed black or blank capture regions. The contact captures show the initial/loading form state, not successful delivery. The supplied named mobile captures are the authoritative mobile evidence.
- Inspected the approved `rooms-in-focus.png`, the exact 1505×1045 build capture, the final comparison, and all ten paired regions. No recapture is required for this packet.
- `PRODUCT.md`, the pre-build `DESIGN.md`, all four surface contracts, asset provenance and the approval record exist. `docs/design-workshop.md` corroborates candidate 7 and seed `7b1ba3e5`; the recorded selection key is `6122fc83`.
- `.impeccable/build/state.json` records the comp round as skipped because the approved comp preceded the state, and the measured spec as closed. Plates remain open; hero and later phases remain pending. There are no forced closures and no recorded hero gate score. This is not a completed tool gate.
- `docs/decisions.md` and `docs/asset-provenance.md` explicitly require original company images and the approved font pairing instead of regenerated plates or generated lettering. That precedence is valid. The review does not require invented image detail or a replacement font to satisfy a lower-level tool workflow.
- The parent reports 26 passing automated tests covering the 40 layouts, routes, image/target/overflow checks, console, dummy verification/reveal, failure recovery and security checks. These are reported test evidence, not an independent execution by this reviewer. Production email delivery, the final performance threshold and an actual screen-reader walk are not certified here.

## fidelity

The comp's salient inventory is a compact white-square roof/tree/RC mark with a text name, three visible navigation links, a large condensed two-line source tagline at left, a short Kincardine introduction and broad red enquiry action at right, an uninterrupted panoramic kitchen photograph, a cool pale page field, and the next display heading at the lower edge. The build preserves that inventory and reading order.

The final measurement is **0.7874 overall**, verdict **drift**, with structure 0.6739, colour 0.9230 and detail 0.7385. Its fixed-coordinate regions must be read alongside the complete frame: responsive spacing and approved source substitutions shift pixels without removing elements.

| Salient element | Classification | Evidence and disposition |
| --- | --- | --- |
| Header topology and visible destinations | Match | Logo/name remain left, Services/About/Contact remain right on desktop. Mobile keeps visible links beneath the brand as specified in `DESIGN.md`. |
| `brand-logo` | Adaptation | Report says missing, 0.5192. The paired crop visibly contains the original roof/tree/RC mark, clipped only by the comparison's comp coordinates; the full build frame contains the complete mark. Source reuse and the white background are required by `PRODUCT.md`, `DESIGN.md` and the recorded owner answer. No missing asset finding. |
| `brand-name` | Adaptation | Report says drift, 0.6947. The complete correct public name is present; its smaller width and position follow the approved Source Sans 3 pairing, 48px gutter and compact header. The comparison crop cuts its beginning because the build starts farther left. |
| `nav-services` | Adaptation | Report says missing, 0.6114. The paired crop shows the beginning of the displaced link at its right edge, and the complete frame clearly shows Services. Its position follows the shared header's approved gutters and type; it is not absent. |
| `nav-about` and `nav-contact` | Adaptation | Report scores 0.6948 and 0.6808. All three real destinations remain in the original order. Fixed-coordinate crops intersect neighbouring text because the navigation group is narrower and farther right. The shared header and approved type system authorize this adjustment. |
| `headline` / TYPE | Adaptation | Report says drift, 0.7155. Barlow Condensed preserves the compressed, heavy, low-contrast sans character, rounded terminals and two-line sentence-case hierarchy. It is lighter and flatter than the generated lettering. `DESIGN.md` explicitly specifies self-hosted Barlow Condensed 600, and the home contract gives written tokens precedence over generated defects; the build follows that authority. |
| `introduction` | Adaptation | Report says drift, 0.5365; its image label says contradicted. The pair shows the same two-line scope/location sentence shifted right, with the approved Source Sans 3 styling. The full frame retains the intended right-hand text/action group; no content or topology is lost. |
| `enquiry-action` | Adaptation | Report says drift, 0.6346. A broad brick-red rectangle remains directly beneath the introduction, with the same explicit project action. Approved 4px corners, Source Sans 3 600 and the flat action colour replace generated softness. The comp does not promise a physical stamped or textured button. |
| `kitchen` / MATERIAL | Adaptation | Report says drift, 0.7187. Actual source photography remains the focal material at essentially the same panoramic scale. Its exposure and details differ from the generated comp, as required by the owner-approved original-asset rule. It is not washed out behind an overlay or replaced by CSS. The complete source view appears farther down the home page. |
| `next-section` | Adaptation | Report says drift, 0.5831; its image label says contradicted. The same heading remains immediately after the kitchen and visible in the exact-size first frame. Its smaller scale follows the approved 3rem section-heading endpoint rather than the generated comp's larger lettering. |
| GROUND | Adaptation | Four unobstructed comp samples are RGB 242/245/243 or 241/244/242; corresponding build samples are 244/246/244 (`#f4f6f4`). The build is slightly lighter, retains the cool pale character and exactly uses the approved background token. No cream or warm beige drift. |
| Dark-theme ground and action | Adaptation | The navy ground, pale text and coral action follow the explicit `DESIGN.md` dark tokens. This is an approved theme extension, not an unapproved reinterpretation of the light comp. |
| Lower-page service, history, practice and review content | Match | Open sections, complete visible descriptions, actual construction/rendering imagery and preserved quotations extend the comp in the order promised by the home contract. No invented project name, location or case-study relationship is introduced in the reviewed presentation. |

| Surface | THESIS | OWN-WORLD | STORY | FIRST VIEWPORT | FORM |
| --- | --- | --- | --- | --- | --- |
| Home | Finished work and immediate enquiry lead. | Approved palette, condensed display type and open sections are visible. | Scope, kitchen, services, company/practices, reviews and contact remain in order. | At desktop the next heading enters the fold; at 360px heading, purpose and action precede the photo. The kitchen plus compressed tagline remain the memorable pair. | Candidate/seed are corroborated; original-photo precedence is obeyed. |
| Services | The complete service index stays open and readable. | Shared type and real imagery remain consistent. | Index, descriptions and enquiry are visible in sequence. | Wide title/action field becomes one mobile column; framing is accurately captioned. | Established-world extension holds, with a complete-photo link preserving the cropped source material. |
| Contact | Three labelled fields and direct alternatives are easy to distinguish. | Shared type, flat surfaces and visible controls hold without decorative imagery. | Entry, verification and failure recovery exist; successful delivery remains incomplete because the provider is unconfigured. | Form begins after the compact introduction; alternatives sit alongside at wide widths and below at 360px. | Seed and three-field structure hold; reported dummy/failure tests do not establish production send success. |
| 404 | A clear explanation and two recovery links are visible. | Familiar header, theme and typography persist. | Missing-page explanation leads directly to home or services. | Both recovery actions are visible at 360px. | The static recovery surface requires no JavaScript; the parent reports real 404 status coverage. |

No salient visual element is missing or contradicted after applying the documented authority and inspecting the paired crops. No rebuild directive is warranted. The remaining failures are functional completion, acceptance evidence and finish documentation.

## ceiling

Within the approved residential-architecture-magazine world, the native devices are present: large actual photography, a decisive condensed headline, open reading columns, square images, modest captions and clear enquiry actions. An alternate QUALITY BAR card was not selected, so a separate card-specific ceiling cannot be certified. Extra texture, ornament, fake material, photographic overlays or decorative motion would conflict with the approved system.

Taste preflight at the requested 6/3/3 scope holds visually across all four surfaces: one clear primary action, specific original imagery, visible navigation, coherent shapes and automatic themes, readable real copy, mobile stacking and restrained interaction. The approved split introduction, larger source-logo header and three-line mobile tagline are documented choices. No kicker, decorative section numbering, nested-card scaffold, hard offset shadow, gradient lettering, imitation illustration, emoji icon system or system display font appears. The original labelled design rendering is a required source asset, not an invented decorative illustration. CSS samples show themed selection, caret, scrollbar, link underline and focus styling, plus reduced-motion handling. Screenshots do not prove dynamic focus announcements, screen-reader operation or performance.

## material_fixes

1. **Contact STORY / product completion:** configure the authorized email provider and sending identity, then verify a real successful submission and confirmation; the current honest 503 cannot fulfil the promised enquiry delivery.
2. **Acceptance evidence:** complete the required actual screen-reader walk and final mobile Lighthouse checks on home, services and contact; record observed results and remedy failures before claiming the requested accessibility/performance gates passed.
3. **Persistence:** reconcile the finish record with the original-asset exception and final comparison evidence; retain the actual open/pending Impeccable phases unless they close through a supported truthful workflow, and do not report the tool gates as complete.
4. **Design documentation / detector advisory:** document the shipped interior/404 heading ramp `clamp(3rem, 5.5vw, 5rem)` and its 5rem endpoint in `DESIGN.md`, or align it to an already approved ramp; the detector's single advisory is a documentation mismatch, not a reason to enlarge or redesign the pages.

## keep

Preserve the original company photos and logo, exact protected source quotations/legal copy, restrained cool palette, compressed sentence-case display type, open service descriptions, visible mobile navigation and direct enquiry order.

## verdict

Bounded documentation verdict, 2026-09-23. Scored only the original four fixes against `DESIGN.md`, `.impeccable/design.json`, `docs/design-finish.md` and the updated `docs/quality.md`; no source, browser, screenshot or detector pass was repeated.

1. **Unresolved — Contact STORY / product completion:** email setup and a verified successful submission remain pending; the recorded tests do not send mail or establish successful delivery.
2. **Partial — Acceptance evidence:** the quality record now contains local mobile Lighthouse scores of 100/100/100/69 for home, services and contact, with local noindex as the sole scored SEO failure, 26 passing tests and GitHub Actions success on `76e8ffb`. Production acceptance remains pending. VoiceOver could not start while the Mac was locked; asking the owner to unlock it does not establish a screen-reader pass.
3. **Resolved — Persistence documentation:** the finish record and design sidecar explicitly preserve the original-asset exception, reviewed visual scope and incomplete release/tool state. Open plates and pending hero/later phases are disclosed, with no forced closure or overall completion claim. This resolves the documentation finding, not the tool gates themselves.
4. **Resolved — Heading-ramp documentation:** `DESIGN.md` now records the implemented `interior-heading` role as Barlow Condensed 600, `clamp(3rem, 5.5vw, 5rem)`, line-height 1.05 and tracking -0.02em; the sidecar and finish record agree. No new detector result is claimed.

No regressions introduced by this documentation batch were identified within the bounded scope.

## remaining

Original fixes 1 and 2 remain open: real email delivery and successful-form evidence, an actual screen-reader walkthrough after unlock, and final production Lighthouse/console acceptance. Impeccable's recorded tool phases also remain open/pending as disclosed. The documentation fixes do not confer an overall ship verdict.

disposition: fix
