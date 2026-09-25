# Logo, UI/UX and SEO review

Reviewed 25 September 2026. Scope: home, services, contact and 404 on rcgcinc.ca, plus crawl files and the earlier domains. Method: independent Impeccable design assessment (`/root/logo_design_review`) and technical assessment (`/root/logo_technical_review`), source inspection, responsive browser checks and public HTTP checks. Design assessment finished before the parent read detector findings.

The photographic layout, readable type and visible navigation work well for a construction business. The new RC mark removes fine print that was unreadable at header size. The most consequential remaining issues are operational: email delivery is unavailable, and the earlier domains still serve independent copies of the site.

## Changes made

- Applied the approved RC roofline mark to header, footer, favicon and touch icon. Added its crawlable 512px image to the business structured data with a stable organization identifier.
- Reduced the desktop header from 112px to 80px. Kept the company name readable and the three navigation links visible on mobile. The same logo silhouette reverses to white in dark mode.
- Moved working email/phone reveal and social links before the unavailable form, in both DOM and visual order. At 360×800, the reveal buttons moved from approximately y=1650 to y=627, fully within the first viewport.
- Associated the delivery warning with the form's accessible description.
- Added the confirmed Kincardine location to home/services search titles. Corrected the contact description and home contact link so they point visitors to working contact methods.

## UI/UX findings

| Priority | Finding and evidence | Outcome |
| --- | --- | --- |
| P1 | The form explicitly says it cannot send, but still exposes editable fields and a Send enquiry button. A visitor can spend time composing a message that cannot be delivered. | Delivery remains unavailable. Working alternatives now lead the page, and the form warning is programmatically associated. Configuring and verifying delivery remains the highest-priority follow-up. |
| P2 | Mobile visitors originally passed the whole form before reaching working contact controls. | Fixed by reordering the existing sections; keyboard and visual order agree. |
| P2 | The original logo repeated tiny wording inside a small white square, particularly conspicuous in dark mode. | Fixed with the approved word-free RC mark, theme treatment and compact header. |
| P3 | The service-category index follows the large construction photo and starts around y=1064 at 360px. | Optional refinement: put the existing category shortcuts earlier. The current content and photo remain intact. |

The strongest features are the real company photographs, explicit service location, labelled design rendering, plain navigation and calm 404 recovery. No placeholder projects, extra locations, testimonials or statistics were added. No photo, service, review or legal text was removed.

### Design heuristic assessment

Qualitative independent assessment, not accessibility certification. Baseline was 24/32; bounded follow-up scored 25/32 after contact discovery improved.

| Heuristic | Score | Assessment |
| --- | ---: | --- |
| Visibility of status | 3/4 | Current navigation and delivery warning are clear; the form's active appearance remains a concern. |
| Match with the real world | 4/4 | Familiar services, location and plain language. |
| User control and freedom | 3/4 | Visible links, jump targets and useful 404 exits. |
| Consistency | 4/4 | Shared typography, spacing, labels and controls. |
| Error prevention | 1/4 | Unavailable delivery can still cost visitors time. |
| Recognition rather than recall | 4/4 | Working contact options are now immediately discoverable. |
| Flexibility and efficiency | n/a | Power-user shortcuts are not a meaningful requirement for this small marketing site. |
| Aesthetic and minimalist design | 3/4 | Coherent photography and type; the new mark is clear at small sizes. |
| Error recovery | 3/4 | Inline messages preserve input, and 404 exits work. |
| Help and documentation | n/a | Inline guidance is appropriate; a separate help system is unnecessary. |
| **Total** | **25/32** | **Good, with delivery readiness the main weakness.** |

The review covered first-time visitors, distracted mobile visitors, keyboard users and homeowners checking service scope. Skip-to-content and 404 recovery worked in a bounded keyboard walkthrough. This does not replace an actual screen-reader audit of Turnstile and the complete submission flow.

## SEO findings

| Priority | Finding | Evidence and action |
| --- | --- | --- |
| P1 | The original domain is still an independent site. | Both apex and www of the original domain returned 200 with self-referencing canonicals. Configure permanent redirects from its old URLs to their new counterparts when access to that hosting/domain is available. Verify both properties and submit the domain move in Search Console. [Google's site-move guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes). |
| P2 | The former workers.dev preview remains indexable as a separate copy. | It returns 200 with its own canonical. Redirect it to rcgcinc.ca or explicitly make that retained preview non-indexable in the previous account. This review did not modify the earlier deployment. |
| P2 | Search Console and Google Business Profile status are unknown. | No account/property reports were supplied or connected for this review. Verify the new domain, submit its sitemap, inspect the three canonical URLs and update the existing business profile's website link. No ranking, indexing or traffic improvement is claimed. |
| P2 | The site was missing an explicit structured-data logo. | Fixed with a crawlable 512px PNG and the site's stable organization identifier. Google's logo guidance requires at least 112×112px and a crawlable image. [Organization documentation](https://developers.google.com/search/docs/appearance/structured-data/organization). |
| P2 | Contact metadata invited an enquiry through an unavailable form. | Fixed with a factual description of the working protected contact links. |
| P3 | Location was absent from the services title. | Fixed using the owner-confirmed Kincardine location. |

### Technical and content checks

- All three public content pages have unique titles/descriptions, one H1, descriptive headings, internal navigation and self-referencing HTTPS apex canonicals. Descriptions are under 155 characters. An editorial H1 can stay natural because the introduction and metadata state the service and location.
- Robots allows public pages, blocks `/api/` and references the canonical sitemap. The sitemap contains only home, services and contact. The 404 is a real 404 and is excluded.
- New-domain HTTP/www and trailing-slash redirects are configured; paths and queries are preserved by the canonical-host rule. The old-domain migration issue is separate from these working new-domain redirects.
- Open Graph and Twitter tags include titles, descriptions, canonical URLs, a real kitchen image and its descriptive alternative. No protected email/phone is included in HTML, bundles or JSON-LD.
- `GeneralContractor` data uses confirmed business name, founder, founding date, service area and social links. No aggregate rating or review rich-result claim was added. No public street address was supplied, and the brief prohibits publishing contact values. Therefore, Google LocalBusiness rich-result eligibility is not claimed. [Local business requirements](https://developers.google.com/search/docs/appearance/structured-data/local-business).
- The new favicon is a square 96px PNG and the touch icon is 180px, with a pale surface for contrast. The content-hashed favicon URL stays unchanged unless the logo/transformation changes. [Google favicon guidance](https://developers.google.com/search/docs/appearance/favicon-in-search).
- Content depth is proportionate to the verified material. Future case studies could help visitors judge fit, but project locations, scopes, dates, outcomes and permissions must come from the owner. No additional location pages or manufactured FAQs were created.

## Taste and copy checks

Home, services, contact and 404 retain the approved 6/3/3 design, motion and density settings. Each page uses the same typography and colour system, explicit mobile layout, visible labels, real company photography where appropriate and reduced-motion support. Desktop navigation stays on one row. There are no decorative cards, gradients, icon walls, floating labels, excessive animation or invented proof.

The owner's preservation requirements override Taste's generic advice to shorten quotations, add attribution roles, generate new photography or replace the approved hero composition. Original testimonials and factual material remain intact. The changed content file received a Humanizer file-mode pass; details are recorded in `docs/copy-review.md`.

## Validation and limits

Initial local checks passed: Astro check (32 files, no errors/warnings/hints), lint, formatting, build, contact-value scan and all 27 Playwright checks. Screenshots were refreshed for all four routes in light/dark themes at 360, 768, 1024, 1440 and 1920px under `docs/screenshots/new/`. They show no horizontal overflow, missing image alternatives, broken images or undersized navigation/button targets.

Detector, production build, CI, Lighthouse and live-check evidence is recorded below. A successful automated accessibility score does not establish full WCAG conformance. Field Core Web Vitals, Search Console indexing, a real screen-reader review and actual email delivery remain outside the verified results.

Questions skipped: the logo application and review fixes were already authorized. The open items above need account access or delivery setup; no speculative business details were requested merely to complete this review.

### Independent technical review

Assessment B scored 18/20 within the bounded scope: accessibility 3, performance implementation 4, responsiveness 4, theming 4, integrity 3. The detector exited 0 with no findings, rule names or affected locations. All four routes also reflowed without horizontal overflow at 320px. Sampled navigation/contact targets were at least 44px high.

Measured token pairs: body text approximately 13.15:1 light and 14.84:1 dark; action text 6.91:1 light and 7.86:1 dark; control borders against their surfaces 4.43:1 light and 5.30:1 dark. These measurements do not certify all interactive/third-party states.

Run notes: independent assessors used separate temporary browser tabs and reset viewport changes. No protected contacts were captured in screenshots. Browser evaluation is read-only, so no mutable detector overlay was attempted or claimed; CLI results, DOM inspection and screenshots provide the evidence. The review-only preview server was stopped after inspection. No prior ignore list applied. Full internal reports remain in ignored `docs/evidence/logo-review/`.

### Production build checks

The production build, contact-value scan (231 tracked/built files) and Wrangler deployment dry run passed. Production HTML uses rcgcinc.ca canonicals and logo URLs; public pages are indexable and 404 is noindex. Description lengths are 141, 154 and 131 characters for home, services and contact.

Lighthouse 13.5.0 mobile defaults against the production build served locally:

| Page | Performance | Accessibility | Best Practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| Home | 100 | 100 | 100 | 100 |
| Services | 100 | 100 | 100 | 100 |
| Contact | 100 | 100 | 100 | 100 |

These are lab measurements before publication, not field Core Web Vitals. Cloudflare's automatic analytics injection is present on the deployed host rather than the local preview. The contact report notes that back/forward cache restoration is prevented; it did not reduce these category scores. Production credentials were never exposed by the checks. Both temporary preview processes were stopped.

### Live release verification

PR #5 passed required [GitHub CI](https://github.com/redwood-egarcea/rc-general-contracting/actions/runs/36144104473) and deployed from main `4ed694b4e916ca99f8aac46730640ec47ecaf7fb`. Initial logo release Worker version: `89dc051b-e0fb-4c4a-b554-7de318ab1e71`.

The live URL map, real 404, security headers, API rejection/no-store checks, robots/sitemap and canonical redirects passed. Logo metadata and PNG dimensions were verified from the published assets: 512px business logo, 96px favicon and 180px touch icon. All three updated titles/descriptions and the form's associated delivery notice are present.

Lighthouse 13.5.0 mobile defaults on rcgcinc.ca:

| Page | Performance | Accessibility | Best Practices | SEO | LCP | CLS |
| --- | ---: | ---: | ---: | ---: | --- | ---: |
| Home | 99 | 100 | 100 | 100 | 1.8 s | 0 |
| Services | 100 | 100 | 100 | 100 | 1.7 s | 0 |
| Contact | 99 | 100 | 100 | 100 | 1.8 s | 0.001 |

The first contact measurement lost its headless browser session; a fresh retry completed and produced the figures above. No failed run was counted as a pass. These lab scores do not measure real-user INP or search ranking.

The live browser exposed one intermediate-width layout issue at 623px: the homepage action block retained desktop right alignment after its parent became a single column. A mobile-only full-width rule corrects that inherited sizing. The original five-width screenshot matrix did not expose the issue; the focused follow-up explicitly checks 623px as well as 360px. The desktop layout and content are unchanged.

The independent reviewer scored this single fix resolved: at 623px the content container, action block and button are each 575px wide; at 360px each is 312px. Both use a 24px left edge with no horizontal overflow. The temporary viewport was reset and preview stopped. Evidence is local in `docs/evidence/logo-review/hero-width-*`.
