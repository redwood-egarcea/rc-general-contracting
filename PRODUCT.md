# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

The user requires current stable Astro, TypeScript strict, static pages, and on-demand `/api/*` routes through `@astrojs/cloudflare`. Hosting is Cloudflare Workers with static assets. Use vanilla TypeScript and plain CSS with custom properties. Add an island only where client state requires it. Source control is GitHub; Workers Builds provides production and preview deployments.

## Users

The current site addresses residential and commercial construction clients. The service area is not specified beyond Ontario in its metadata. The site says the business relocated to Kincardine in 2026. Confirm the current service area before writing location-specific marketing pages.

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
- Stop for audit approval, design approval, copy review, workers.dev review, and final domain cutover approval.
- TODO(fact): new domain, its registration budget, and complete destination address after `inbox@`.
- TODO(fact): current service area, preferred business-name styling, and provenance of the current images and testimonials.
- TODO(fact): delivery provider and authorized sending domain. Select during implementation setup, before sending mail.

## Brand Commitments

The current title uses “Royal City General Contracting Inc”; the logo and body also use “RC General Contracting Inc”. Preserve both as source evidence until the owner confirms the preferred display name.

The existing roof, tree, and RC logo is available along with kitchen imagery, a design rendering, and construction imagery. The archive includes unused media alternatives. Their presence is not evidence that they depict the company's own completed projects.

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
3. Use actual brand assets without implying unsupported project ownership.
4. Keep private runtime values out of public artifacts.
5. Require measured evidence for quality claims and explicit approval at each phase gate.

## Accessibility & Inclusion

The brief requires keyboard and screen-reader checks, visible labels and announcements, reduced-motion support, responsive layouts starting at 360px, and mobile Lighthouse category scores of at least 95. The JavaScript-dependent contact flows need an honest fallback route using approved contact options.
