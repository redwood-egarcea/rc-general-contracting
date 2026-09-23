# Current-site audit

Audit date: 23 September 2026. Source: [Royal City General Contracting Inc](https://www.royalcitygeneralcontractinginc.ca/).

**Phase 1 is ready for review. Design and implementation have not started.**

Owner responses received on 23 September 2026: use RC General Contracting Inc as the public name; serve Kincardine; current photos depict company work and may be reused; use Cloudflare Web Analytics. In a follow-up, the owner confirmed `workers.dev`, supplied the complete delivery inbox, and approved the audit and URL map. The specific removals and social-link fallback were subsequently approved. See [decisions](decisions.md).

The public site has one marketing page and a catch-all not-found view. Its copy and assets are archived. The main problems are an unusable contact form, an oversized logo that dominates the first screen, mobile overflow, conflicting canonicals, and large images. No source content has been removed.

## Scope and evidence

The audit used HTTP GET responses, the sitemap, internal links, browser-rendered HTML, the public media manifest, and the shipped JavaScript route table. The route table declares `/` and `*`; the sitemap lists only `/`. There are no other linked marketing pages to crawl or include in a top-five Lighthouse baseline. Unpublished pages in the old hosting account cannot be discovered from these sources.

- [Unchanged homepage copy](source-copy/home.md), including image alt text, metadata, conditional form messages, dormant hero text, and cookie consent copy.
- [Unchanged not-found copy](source-copy/not-found.md).
- [Full asset inventory](assets.md): 47 downloaded file URLs, including 31 image files, three font files, two stylesheets, ten scripts, and one media manifest. Several files are aliases or unused alternatives.
- `old-site/inventory.json`: response details, metadata, forms, scripts, asset hashes, and usage references.
- `old-site/html/`: original response and rendered HTML.
- `old-site/structured-data.json`: unchanged structured data.
- `old-site/browser-assets.json` and `old-site/inline-svg-inventory.json`: browser-observed assets and 22 inline SVG occurrences.
- [Lighthouse report](../old-site/lighthouse-home.report.html) and its [JSON](../old-site/lighthouse-home.report.json).
- [360px](screenshots/old/home-360.jpg), [768px](screenshots/old/home-768.jpg), [1024px](screenshots/old/home-1024.jpg), [1440px](screenshots/old/home-1440.jpg), and [1920px](screenshots/old/home-1920.jpg) screenshots. Full-page capture at a 360px viewport is 574px wide because it records the measured horizontal overflow; the separate `home-360-viewport.jpg` shows the visible 360px screen.

The raw archive and screenshots are local and gitignored because they expose contact values. They remain in this workspace. The tracked audit refers to the values by secret name. See [decisions](decisions.md) for this resolution of the brief's source-preservation and repository-secrecy requirements.

## URL inventory

Word counts include extracted body text, navigation/footer text, hidden H1 text, and testimonial initials, split on whitespace. They exclude metadata and alt text. Conditional strings are preserved separately and excluded from the count. Inbound counts refer to links on discovered indexable pages; synthetic probes are excluded.

| Path / host | HTTP GET | Title | H1 | Words | Inbound internal links |
| --- | --- | --- | --- | --- | --- |
| `https://www.royalcitygeneralcontractinginc.ca/` | 200 | Royal City General Contracting Inc — Design, Renovate, New Build | DESIGN – RENOVATE – BUILD (visually hidden) | 428 | 2 self-links: header logo and empty footer home link; no other indexable page links to it |
| `https://royalcitygeneralcontractinginc.ca/` | 200 | Same homepage | Same homepage | Duplicate host | Canonical/OG/schema references point here; not a separate content page |
| `/#contact` | Homepage fragment | Same homepage | Same homepage | Included above | 0 visible in-page navigation links; the section ID exists |
| Catch-all, tested at `/audit-missing-page-20260923` | **200**, despite a rendered 404 view | Homepage title retained | 404 | 33 in rendered view | 0; deliberate audit probe |

The homepage meta description is 175 characters:

> Royal City General Contracting Inc offers complete residential and commercial construction services in Ontario — renovations, new builds, design, framing, cabinetry, and more.

The not-found response has no distinct page metadata. Raw HTML initially serves the homepage shell; client routing renders the not-found view. This is a soft 404.

## Content that must carry over

| Existing block | Preserved facts and content |
| --- | --- |
| Identity | Both Royal City and RC business-name variants; roof/tree/RC logo; “Design – Renovate – Build”; dormant “RESIDENTIAL & COMMERCIAL” subheadline in the bundle. |
| About Us | Founded in Guelph, Ontario in 2017 by Joshua Newbigging; relocated to Kincardine, Ontario in 2026; almost two decades of construction experience; Red Seal, licensing, insurance and incorporation claims; experienced staff trained in current techniques. |
| What We Do | Residential and commercial construction; design; engineering and permits; turnkey renovations large or small; new builds; collaboration with clients; drawings, designs and 3D renderings; framing, drywall, flooring, decks/fences, tiling, waterproofing, painting, trim and cabinetry; list explicitly not exhaustive. |
| What Sets Us Apart | Clients informed and involved throughout; clean work sites; flooring protection and barriers for dust and mess; most work performed in-house; trusted licensed plumbing/electrical trades; source claims about avoiding trade delays, quality control and keeping projects running smoothly. |
| Reviews | “5.0 stars — 13 Reviews”; three displayed five-star quotes from Don Shrives (June 17, 2026), Derek Gooding (April 16, 2026), and martina freitag (May 24, 2024). Complete quotations, spelling, dates, and initials are archived. |
| Contact | Email, phone, Facebook and Instagram links, contact heading, incomplete form and its conditional messages. |
| Legal/consent | Exact reCAPTCHA notice and Google policy links; exact cookie consent text; copyright © 2025 and rights-reserved wording. |
| Not-found view | 404 heading, explanation, Home and Back controls, shared identity and footer. |

These are claims made by the source site. No additional credentials, locations, statistics, clients, guarantees, project names, or review-provider attribution have been inferred. No FAQ, team listing, blog, downloadable PDF, price list, case-study page, address, or opening hours were found.

## Assets and brand material

Every file URL and where it is referenced appears in [assets.md](assets.md). The local archive totals 12,023,616 bytes, including unused media alternatives. This is separate from the page-load transfer measured by Lighthouse.

| Visible asset | Actual content / dimensions | Finding |
| --- | --- | --- |
| `logo/horizontal` | Square JPEG, 1254 × 1254, roof/tree/RC mark | Usable source identity, but raster with substantial surrounding whitespace. Rendered HTML advertises a different aspect ratio and the orientation script applies large sizing. |
| `about/company-van-branded` | Kitchen photograph, 1688 × 1126 | The current alt text describes a branded van. That description is wrong. |
| `about/kitchen-3d` | Kitchen design sketch/rendering, 1448 × 1086 PNG | 3,474,546 bytes. Existing alt text calls it an open-plan kitchen/living-room 3D rendering; the visible image is a kitchen sketch. |
| `about/construction-site` | Interior framing photograph, 960 × 720 | Fits the source description. No project identity or ownership can be established from the picture alone. |

The logo, kitchen image, sketch, and framing image are the strongest material to carry into design exploration. The owner has confirmed that the current photos depict company work and may be reused. They can support a story about completed spaces, design, and construction. Project names, locations, clients, and dates remain unknown; the sketch must remain identified as a rendering. Keep the logo's identity during exploration; propose any redrawing or replacement for approval. The confirmation does not establish provenance for every unused alternative in the old media manifest.

Fonts are Special Elite 400 for headings and Lora 400/500 for body text, fetched from Google Fonts. Their TTF reference files and stylesheet are archived. There is no font licensing evidence in the page itself; verify licences for any production font choice before self-hosting.

## Forms

The homepage has one `<form novalidate>` with three empty field wrappers. It has no visible name, email, or message inputs and no submit button. The only rendered input is the off-screen `_gotcha` honeypot, with `tabindex="-1"`, `autocomplete="off"`, and `aria-hidden="true"`.

| Field expected by script | Rendered? | Observable client validation |
| --- | --- | --- |
| `name` | No | Trim string; missing value becomes empty string. |
| `email` | No | Trim string; no email-format check in the application handler. |
| `message` | No | Trim string; empty body becomes “New contact form submission”. |
| `_gotcha` | Hidden input | Handler returns without submission if populated. |
| CAPTCHA token | No | No reCAPTCHA token generation or validation call found in the contact handler. |

The bundle intends to POST JSON to `/api/contact/contact`. It sends `user.email`, `user.name`, a `conversation.messages_attributes` message, and a form-title value. On `success`, it resets the form and shows “Thanks! We'll be in touch.” On errors it displays a server error or generic retry message using `role="alert"`; success uses `role="status"`.

No live submission was sent. The destination inbox, server validation, delivery provider, retention settings, and actual delivery behaviour cannot be established from the frontend. The DOM's default action is the current URL with method GET, but the JavaScript handler intends the POST described above. The rebuild needs a functional form rather than a literal reproduction of the missing fields.

The owner has supplied the complete destination address; it is recorded in the ignored local contact inventory for Worker secret configuration. This is separate from the existing public contact email.

## Contact details and exposure

Exact values are in the [local contact inventory](contact-details.local.md), with unchanged copies in the source archive.

| Value | Every observed occurrence |
| --- | --- |
| `CONTACT_EMAIL` | Visible contact text; rendered `mailto:` link; reversible Cloudflare email-obfuscation payload in response HTML; LocalBusiness JSON-LD; JavaScript content object used by contact and schema. |
| `CONTACT_PHONE` | Visible contact text; `tel:` link; LocalBusiness JSON-LD; JavaScript contact object and schema literal. |
| Facebook | Contact icon/link; LocalBusiness `sameAs`; application bundle. Destination: https://www.facebook.com/Royalcitygeneralcontracting/ |
| Instagram | Contact icon/link; LocalBusiness `sameAs`; application bundle. Destination: https://www.instagram.com/rcgcinc/ |

Image files and historical logo variants may contain printed contact details; inspect candidate production assets before including them. A text grep cannot detect text embedded in pixels.

The new site must omit the email and phone from JSON-LD as well as visible HTML and bundles. Reveal controls can retain the existing contact section. The owner approved the existing social links as the JavaScript-free fallback.

## Third-party services: keep/drop decisions

| Service or script | Evidence and role | Recommendation | Decision |
| --- | --- | --- | --- |
| GoDaddy Signals/C2, `img1.wsimg.com/signals/js/clients/scc-c2/scc-c2.min.js` | Loaded in the browser; CookieBanner calls its loader. Click tracking emits `airo.website.click`, including element text, link target, page title and section. | Replace with Cloudflare Web Analytics. | Owner selected Cloudflare Analytics, 23 September 2026 |
| `/analytics.js` | Initialises `_signalsDataLayer`; comments describe consent-dependent C2 loading. | Retire with the GoDaddy integration. | Owner selected Cloudflare Analytics, 23 September 2026 |
| `CookieBanner-BsfGEvva.js` | Stores analytics consent; contains exact consent wording and Accept/Decline controls. Source calls the C2 loader before checking saved consent, while click tracking checks `_allowCT`. | Preserve wording in archive. Choose what to carry over after the analytics decision. This audit is not a legal-compliance determination. | Approved by owner, 23 September 2026 |
| Google Fonts CSS and `fonts.gstatic.com` files | Special Elite and Lora. | Replace remote delivery with licensed, self-hosted fonts from the approved direction. | Direction A approved |
| Google reCAPTCHA notice and policy links | Notice is visible, but no reCAPTCHA script/widget/token flow was observed. | Replace obsolete notice when Turnstile is implemented; exact legal-copy change needs approval. | Approved by owner, 23 September 2026 |
| Cloudflare email-decode script | Reversibly decodes public email; does not keep it out of schema or JavaScript. | Replace with the requested server-verified reveal flow. | Requested by brief |
| `/airo-video-slots.js`, `/airo-logo-orientation.js`, React/router/query/Radix bundles | Old platform rendering and media helpers. No active video found. | Replace with Astro components and responsive images while preserving content. | Requested rebuild |
| Facebook and Instagram | Outbound links only; no embedded social widgets or social pixel observed. | Keep. | Proposed |

No Google Analytics tag, Google Tag Manager container, Meta pixel, chat widget, or embedded review-provider widget was found in the inspected HTML, app bundles, or browser-observed assets. This is an observation of the inspected state, not access to the hosting account's configuration.

## Search metadata and redirects

- Two canonical tags disagree: one uses `https://www.royalcitygeneralcontractinginc.ca/`, the other uses `https://royalcitygeneralcontractinginc.ca`. Lighthouse flags this.
- Open Graph and Twitter title, description, image, and card metadata exist. Their URL references use the apex host, while the sitemap uses `www`.
- One Organization object is named with the `www` hostname. A second graph defines a named LocalBusiness, WebSite, and WebPage using the apex hostname. The entities and IDs should be consolidated around the approved canonical host.
- The LocalBusiness graph exposes contact values and founding year. There is no FAQPage, breadcrumb, or aggregate-review schema. Do not add review schema without checking the supported facts and intended use.
- No hreflang tags found. The document language is English.
- `robots.txt` allows all crawling and points to the working XML sitemap. The sitemap contains one URL and no `lastmod`.
- HTTP on each hostname redirects with **301** to HTTPS on the same hostname. Neither HTTPS host redirects to the other.
- The deliberate unknown-path probe returns **200** and then shows a 404 view. The rebuild must send a real 404 status.
- HEAD on `/` returned 404 during the initial probe, although GET returned 200. Use GET-based URL checks for the source baseline and make the rebuilt responses consistent.

## Design audit using redesign-existing-projects

Reading this as a contractor marketing-site overhaul for residential and commercial enquiries, using the existing identity and real source imagery. The replacement visual direction will be chosen in Phase 2.

### What works

The three company paragraphs contain useful specifics about services, design, work-site protection, and coordination. Testimonials have names and dates. The main page has a logical heading hierarchy and explicit alt attributes, though two image descriptions need correction. The existing `#contact` anchor, social destinations, and meaningful business history can all carry over.

### What needs to change

| Priority | Finding | Effect / proposed response |
| --- | --- | --- |
| Critical | No usable contact form | Visitors cannot submit an enquiry through the displayed form. Build labelled fields and a working delivery flow with clear retry states. |
| High | Logo fills or exceeds the first screen | At 1024px, the logo box is 992px tall; at the 1440px capture it was about 1756px tall. No useful service introduction or contact action is visible immediately. Constrain the brand mark and give the first screen a clear message and action. |
| High | Mobile horizontal overflow | At 360px, document width is 574px. The long email link is a measured overflow source; its child span is fixed at 30px. Reveal controls and wrapping rules will resolve this. |
| High | Fixed display sizes | The About span is 48px and Contact span is 96px, overriding fluid heading sizes. Contact lettering wraps heavily on small screens. Use a deliberate responsive type scale. |
| High | Misleading alt text | Kitchen photo described as a branded van; sketch described too broadly. Rewrite from visible image content without inventing provenance. |
| Medium | Repeated equal-column layouts | Three equal About columns followed by three review cards flatten the narrative. Give services, company story, and reviews distinct structures while retaining every claim. |
| Medium | No visible navigation or primary CTA near the top | Visitors must scroll to find contact information. Add clear navigation and one consistent enquiry label. |
| Medium | Typewriter headings with serif body | Special Elite is distinctive but competes with the construction imagery, especially at large sizes. Explore a more controlled pairing using self-hosted fonts. |
| Medium | Generic neutral tokens | Current CSS uses untinted grayscale, a mostly unused cyan accent, stock radii and shadows. Build one coherent palette around the approved direction. |
| Medium | Accessibility gaps | No skip link. Four star containers use `aria-label` on generic divs without a permitted role, which Lighthouse flags. Correct semantics and verify keyboard/screen-reader behaviour in the rebuild. |
| Medium | Runtime error | Chrome and Lighthouse both recorded React error #418. Preserve the evidence and remove this failure through the static Astro rebuild. |
| Medium | Form and legal mismatch | The reCAPTCHA notice promises protection not visible in the client implementation. Replacement language needs an explicit decision. |
| Low | Empty footer home link | The link has an accessible label but no visible content. Give it a visible purpose or propose its removal. |

Current visual dial estimate: variance 2, motion 1, density 4. This is a design judgment, not a measured score. The rebuild will use the requested 6 / 3 / 3. The old site fails the Taste pre-flight for viewport-fitting hero, responsive overflow, repeated three-column sections, CTA/form completeness, and several typography/palette defaults. No rebuilt page is being declared complete in this phase.

## Lighthouse baseline

Lighthouse 13.5.0, mobile defaults with simulated throttling, run on 23 September 2026 at 17:20 UTC. One run; laboratory results vary with network and device conditions. Full settings are in the saved JSON.

| Existing page | Performance | Accessibility | Best Practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| `/` | **68** | **96** | **96** | **92** |
| Pages 2–5 | N/A | N/A | N/A | N/A |

There are no four additional discovered marketing pages. The not-found route is a catch-all state, not another indexed page.

FCP was 3.3s, LCP 5.8s, Speed Index 5.5s, Total Blocking Time 0ms, and CLS 0. The page transferred about 4,063 KiB. Lighthouse estimated 3,492 KiB of image-delivery savings and 1,670ms of render-blocking savings. Accessibility lost points for the star-container ARIA attributes; Best Practices for the console error; SEO for conflicting canonicals. The high accessibility score does not validate the missing form, image-description accuracy, or the manual keyboard experience.

The corresponding Phase 6 comparison is reserved in [quality.md](quality.md).

## Proposed URL map

No existing content path needs to change. The owner now requests a Cloudflare-provided hostname rather than a new domain purchase. The owner confirmed `workers.dev`, retaining the original Workers stack. Custom-host redirects below apply only if a later domain cutover is approved.

| Old URL / state | Proposed destination | Behaviour | Reason / status |
| --- | --- | --- | --- |
| `/` | `/` | 200 on canonical host | Keep existing path and full content coverage. |
| `/#contact` | `/#contact` | Keep working anchor | Existing section identifier survives; no redirect. |
| HTTP `www` and apex | HTTPS canonical host, same path/query | 301 | Preserve HTTPS enforcement and consolidate host. |
| Old-domain HTTPS `www` and apex, if moving domain | New canonical host, same path/query | 301 | Requires continued control of the old domain; implement only at approved cutover. |
| Unknown paths | Branded not-found page | 404 | Fix current soft 404; do not blanket-redirect unknown URLs home. |
| No old equivalent | `/services/` | 200, approved | Interior page for existing service details; expand layout without inventing facts. |
| No old equivalent | `/contact/` | 200, approved | Dedicated form, reveal controls and approved fallback. Retain home contact content. |

No path-to-path 301 is currently needed, so an eventual `public/_redirects` file may initially have no migration entries. Host redirects belong in Cloudflare rules at the appropriate host. The synthetic missing-page probe is not a real old page and must not become a route.

## Proposed removals

Nothing in this table has been removed from the source archive. The owner approved all listed replacements during implementation; the archive stays unchanged.

| Proposal | Reason | Replacement / preservation | Approval |
| --- | --- | --- | --- |
| Remove the reCAPTCHA-specific notice from the new public site | Turnstile will replace the protection named in the notice. | Archive verbatim; approve accurate replacement wording separately. | Approved by owner, 23 September 2026 |
| Remove GoDaddy C2 telemetry and its loader | Owner selected Cloudflare Analytics. | Replace with Cloudflare Web Analytics during the build. | Selected, 23 September 2026; not implemented |
| Remove old generic cookie-consent wording if its services no longer apply | Text refers broadly to advertising, analytics and support. | Keep verbatim if carried forward; otherwise approve replacement after the tracking decision. | Approved by owner, 23 September 2026 |
| Remove duplicate, conflicting Organization/canonical markup | Creates competing business identities and canonical hosts. | One consistent supported entity graph; secret contact values remain server-side. | Approved by owner, 23 September 2026 |
| Remove the empty footer link | No visible content or useful visual affordance. | Visible home link or logo remains available. | Approved by owner, 23 September 2026 |

No company paragraph, service, testimonial, social link, image used on the page, or legal text is proposed for silent deletion. Dates and names will not be modernised by guesswork. Dormant source strings stay in the source inventory for the copy review.

## Decisions and missing facts

The owner approved the audit scope and URL map and requested two design directions. Approval to enter Phase 2 does not approve unspecified removals or a deployment.

Confirmed: public name RC General Contracting Inc; service area Kincardine; current company photos approved for reuse; Cloudflare Web Analytics selected. No new domain purchase is requested.

Before writing final copy or configuring production:

1. TODO(fact): source of the displayed reviews and rating count. No review-provider attribution may be invented.
2. Email-delivery provider and verified sender setup remain open. The specific legal-text replacements and social fallback are approved.

Phase 2 will shape the home page and one approved interior page, present two design directions, and stop for design approval.
