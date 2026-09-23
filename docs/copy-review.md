# Copy review

The complete draft is ready for owner review. This is not approval to deploy or a claim that the final quality gates have passed. Email-provider selection and a verified sender are still required; a valid form currently returns an honest delivery-unavailable response.

Read the site in the local built Worker preview, or review [all proposed public copy](copy-for-review.md). Authoritative content files are `src/content/site.json`, `services.json`, `testimonials.json` and `messages.json`. The unchanged fact source remains in the ignored `docs/source-copy/home.md` archive.

| Page / content | What changed and why | Source and preserved facts | Unresolved `TODO(fact):` |
| --- | --- | --- | --- |
| Home introduction | Source tagline uses sentence case and commas. Added confirmed location and a descriptive enquiry action. | Existing Design/Renovate/Build tagline; residential/commercial scope; owner-confirmed name and Kincardine. | None. |
| Home services | Service paragraph becomes three visible groups with full item lists. Added a detailed services route. | Complete design, drawings, 3D renderings, engineering, permits, turnkey renovations large or small, new builds, residential/commercial work and all nine finishing/construction services. | None. |
| Home company history | Split a long paragraph into readable paragraphs. Retained the original registered-name spelling in the history. | Founder Joshua Newbigging; Guelph, Ontario; 2017 founding; Kincardine, Ontario; 2026 move; almost two decades' experience; Red Seal certification; licence across Canada; licensed/insured/incorporated company; experienced trained staff. | None. No extra location, award or credential added. |
| Home working practices | Corrected grammar and separated collaboration, site protection and trade coordination. Removed body exclamation marks. | Client involvement, clean sites, floor protection, dust/mess barriers, most work in-house, trusted licensed plumbing/electrical professionals, source claim about rarely being held up by a trade, quality control and proper finished work. | None. |
| Home reviews | More direct heading and clear attribution/date layout. The aggregate is explicitly described as displayed on the previous website. | All three quotations, names, initials, dates and five-star values preserved exactly; original 5.0/13 aggregate retained. | Review-platform identity is unknown, so no platform or fresh verification is claimed. No new fact is needed for the archive-qualified wording. |
| Home contact anchor | Retains `/#contact`, adds form navigation and protected email/phone controls. | Original public email and phone remain available only through Worker secrets and successful verification. | None. Values intentionally absent from this document and the repository. |
| Services | Open index and descriptions use the existing service scope. Added Kincardine for direct arrivals. Four grouped finishing bullets retain all nine names. | Same source services; no pricing, schedule, guarantee, process stages or project story added. Full framing photo available through its caption link. | None. Image locations and whether images depict the same job are unknown; neither is claimed. |
| Contact | Three labelled fields, input guidance, verification messages, direct contact and approved social fallback. | Existing name/email/message form intent; supplied delivery destination stored privately; existing Facebook/Instagram. | Sender/provider setup is `TODO(setup)`, not a public business claim. |
| Contact errors and success | Replaced vague dormant source strings with specific errors and retries. Inputs stay visible on failure. Success wording requires actual delivery acceptance before it can appear. | Technical behavior required by the brief. No promised response time, quote or availability. | None. Success path implementation is blocked on provider setup. |
| 404 | Plain missing-page explanation and useful home/services links. | The old missing-page behavior becomes a real HTTP 404; no company facts added. | None. |
| Metadata | One consistent title/description/canonical set per page. Company schema excludes protected contact values. | Supported name, area, founder, founding year and social URLs. Meta description lengths: home 141, services 154, contact 140, 404 111. | Production hostname is pending provisioning; local builds are noindex. |
| Image alternatives | Literal descriptions replace inaccurate legacy descriptions, including the “company van” asset that is actually a kitchen. Rendering is explicitly labelled as such. | Inspected original images. Linked logo is decorative within its labelled company-home link; other images have descriptive alt text. | None. |
| Legal / consent | The obsolete reCAPTCHA notice and generic cookie banner have approved replacements/removal. | New Turnstile notice is exactly owner-approved; copyright remains verbatim, including 2025 and the original company name. | None. No new privacy policy has been invented. |

## Humanizer file-mode pass

Reviewed `src/content/site.json`, `src/content/services.json`, `src/content/testimonials.json` and `src/content/messages.json` against the archive. The review covered headings, paragraphs, metadata, captions, alt text, labels, no-script copy and all error/success messages. Final prose was written back to those files. No code, data identifiers, link targets, legal line or quotation was rewritten by this pass.

The revised prose removes hype, vague closers, unnecessary technical detail and speculative promises. It retains the source's actual three-verb tagline and factual claims. Exclamation marks and an em dash inside exact customer quotations remain deliberately unchanged; preservation overrides style rules. No exclamation marks appear in newly written body prose. Headlines use sentence case.

## Explicit replacements for this copy approval

The owner already approved the Turnstile notice, removal of the GoDaddy-related generic cookie banner, duplicate metadata consolidation, replacement of the empty footer link, and the social fallback. This review also asks approval for the ordinary copy restructuring shown above: new section headings, grouped service text, descriptive image alternatives, and replacing the dormant generic form messages with the complete messages in the review file. The source archive remains unchanged. No business fact, service, testimonial or social destination is proposed for removal.

## Outstanding setup and validation

- Select and enable the delivery provider; verify a sender. No live delivery has occurred.
- Provision the real Turnstile widgets, hostname and Cloudflare Analytics token before production build/deploy.
- Obtain owner copy approval before Phase 6. The full Lighthouse, Playwright, keyboard/screen-reader, security and five-width screenshot gates remain pending.
