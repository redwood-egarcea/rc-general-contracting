# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

The original brief requires current stable Astro, TypeScript strict, static pages, and on-demand `/api/*` routes through `@astrojs/cloudflare`, hosted on Cloudflare Workers with static assets. Use vanilla TypeScript and plain CSS with custom properties. Add an island only where client state requires it. Source control is GitHub; the original deployment workflow uses Workers Builds for production and previews.

The owner confirmed a Cloudflare-provided `workers.dev` hostname, retaining the requested Workers stack. No domain purchase or custom-domain cutover is currently requested.

## Users

The current site addresses residential and commercial construction clients. The owner confirmed Kincardine as the service area on 23 September 2026. Do not infer a surrounding service radius or additional towns. The source says the business relocated from Guelph to Kincardine in 2026; retain that history without implying that Guelph is still served.

## Product Purpose

Help visitors understand the company's construction services and make an enquiry. Rebuild the existing site without losing its content or inventing facts. The finished site must deliver real form submissions, preserve old URLs, and meet the user's performance, accessibility, and SEO gates.

## Operating Context

The source is https://www.royalcitygeneralcontractinginc.ca/. The publicly discoverable marketing site has one page with company information, services, reviews, and contact sections. Its `#contact` anchor must keep working.

The source names Joshua Newbigging as founder, gives 2017 as the founding year, and describes a move from Guelph to Kincardine in 2026. Its descriptions of experience, Red Seal certification, licensing, insurance, and work practices are source claims, not independently verified credentials.

## Capabilities and Constraints

- A contact form with server-side validation, a honeypot, Turnstile verification, inline status messages, and email delivery.
- Email and phone revealed only after server-verified Turnstile tokens. Values belong in Worker secrets and must not enter Git, static HTML, JavaScript, JSON-LD, or public images.
- Worker routes need request limits, no-store contact responses, and rate limits.
- Preserve original source copy and assets locally. Archives containing contact values are excluded from Git and deployment.
- No page, section, or content removal without an explicit decision recorded against the audit.
- Use Cloudflare Web Analytics, selected by the owner, in place of the old GoDaddy analytics integration.
- Stop for audit approval, design approval, copy review, and review of the hosted site. Any later custom-domain cutover requires explicit approval.
- The owner supplied the complete form-delivery address. It is recorded only in the ignored local contact record and will become a Worker secret, separate from public contact-reveal values.
- Phase 1 audit and URL map are approved: keep `/` and `/#contact`; add `/services/` and `/contact/`. Phase 2 is authorized.
- TODO(fact): provenance of the source testimonials and rating count; no review-provider attribution has been supplied.
- TODO(fact): delivery provider and authorized sending domain. Select during implementation setup, before sending mail.

## Brand Commitments

The owner confirmed **RC General Contracting Inc** as the preferred public name on 23 September 2026. The old title's “Royal City General Contracting Inc” variant remains unchanged in the source archive.

The existing roof, tree, and RC logo is available along with kitchen imagery, a design rendering, and construction imagery. The owner confirmed that the current photos depict company work and may be reused. Specific project names, locations, clients, and dates remain unknown. Describe the sketch as a rendering, not a completed space. Unused alternatives in the media archive need separate selection and provenance checks before publication.

The user requires sentence-case headlines, plain prose, no invented claims, and Humanizer review of all shipped copy. Legal and privacy text stays verbatim unless the user approves a change. Design direction is intentionally undecided until Phase 2.

## Evidence on Hand

- `docs/audit.md`: public crawl and design audit.
- `docs/assets.md`: asset inventory with URLs and usage.
- `docs/source-copy/`: unchanged page copy and conditional text, local only.
- `old-site/`: original HTML, scripts, styles, media, metadata, and Lighthouse reports, local only.
- `docs/screenshots/old/`: old-site captures at the five requested widths, local only.

No voice sample, rates, address, opening hours, project locations, or additional case-study facts were supplied. Do not manufacture them.

## Product Principles

1. Preserve source facts and make every rewrite traceable.
2. Let visitors understand the work and reach the business without avoidable friction.
3. Use the approved company photos without inventing project names, locations, or results.
4. Keep private runtime values out of public artifacts.
5. Require measured evidence for quality claims and explicit approval at each phase gate.

## Accessibility & Inclusion

The brief requires keyboard and screen-reader checks, visible labels and announcements, reduced-motion support, responsive layouts starting at 360px, and mobile Lighthouse category scores of at least 95. The JavaScript-dependent contact flows need an honest fallback route using approved contact options.
