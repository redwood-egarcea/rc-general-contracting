---
name: RC General Contracting Inc
description: Rooms in focus, a photographic system for construction services.
colors:
  ink: "#172d39"
  background: "#f4f6f4"
  surface: "#ffffff"
  soft: "#dce5e7"
  action: "#a43120"
  on-action: "#ffffff"
  control-border: "#687b82"
  divider: "#c2ced1"
  error: "#a43120"
  success: "#24533f"
  dark-background: "#12232c"
  dark-surface: "#1c3541"
  dark-soft: "#244653"
  dark-ink: "#f4f6f4"
  dark-action: "#ff9b7d"
  dark-on-action: "#12232c"
  dark-control-border: "#95aab2"
  dark-divider: "#46616c"
  dark-error: "#ffb4a2"
  dark-success: "#b9dfc6"
typography:
  display:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(3.5rem, 7.6vw, 7rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(2.25rem, 4vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Source Sans 3, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  title:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "2rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  introduction:
    fontFamily: "Source Sans 3, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "normal"
  navigation:
    fontFamily: "Source Sans 3, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "normal"
  label:
    fontFamily: "Source Sans 3, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "normal"
rounded:
  square: "0"
  control: "4px"
spacing:
  1: "0.25rem"
  2: "0.5rem"
  3: "0.75rem"
  4: "1rem"
  6: "1.5rem"
  8: "2rem"
  12: "3rem"
  14: "3.5rem"
  16: "4rem"
  24: "6rem"
  32: "8rem"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.on-action}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
---

# Design system: RC General Contracting Inc

## Overview

**Rooms in focus** was selected by the owner through the Phase 2 comparison page on 23 September 2026. The home composition is a broad completed-kitchen photograph below a compact introduction, with a visible enquiry action. The supporting system uses open text layouts, real company imagery, and clear navigation.

This is the approved pre-build specification, written before implementation as the user requested. The source logo and photographs take precedence over generated details in the mockup. The full proposal, mobile treatment, and services-page composition remain in `docs/design-directions.md`, direction A. Copy approval is separate.

## Colors

The light theme uses cool pale surfaces, blue-tinted ink, and a brick-red action colour. Dark mode uses the `dark-` tokens above and the same semantic roles. `action` also supplies the focus colour in each theme. Keep all body text at the full `ink` colour, including captions on coloured surfaces.

The selected direction's normal-text, action, border, and focus pairs pass the planned thresholds in `docs/design-contrast.json`. Never infer that an arbitrary pairing or a photo overlay passes. Semantic success/error messages include text and an indicator, not colour alone. Keep photography unfiltered and the original logo on white.

## Typography

Self-host Barlow Condensed 600 for display/headings and Source Sans 3 400/600 for text and controls, with `font-display: swap` and their OFL notices. The generic fallback only covers loading failure; it is not the intended display face.

Sentence case throughout new headlines. Home H1 is approximately 96–112px at wide desktop widths and 56px at 360px. The mobile title may occupy three short lines to preserve its source tagline and legibility. Body text is 18px with a maximum reading measure of 64ch. Navigation and captions are at least 16px. Long words and links wrap without widening the page.

## Layout

Use a 1440px maximum container, 48px desktop gutters, 32px tablet gutters, and 24px mobile gutters. The home introduction holds a large heading at left and its description/action at right, both above the wide photograph. The photograph carries no overlay text. The services page uses an open, linked service index with visible descriptions.

Below 768px, layouts become a single reading sequence. Keep enquiry actions before hero imagery. The header may wrap brand and visible links; it stays in document flow and grows with content. Major section gaps are 96–128px on desktop and 56px on mobile. Related text blocks use 24px gaps.

Use the original image at an appropriate responsive size without artificial detail generation. A wide desktop crop may become 3:2 on mobile. Preserve the complete source image elsewhere when a crop omits material.

## Elevation & Depth

Flat surfaces and spacing establish hierarchy. No decorative shadows, glass panels, or gradients. Use a subtle divider only when it helps distinguish repeated text content.

## Shapes

Images and sections have square corners. Interactive controls use 4px corners. Avoid decorative cards, pill labels, and nested containers. Only a control's boundary should look like a control.

## Components

Primary buttons use the action/on-action pair, at least 48px height, and 12px by 24px padding. Secondary navigation uses readable text links with underlines for interaction. Buttons do not animate position. A hover underline or colour change may take 140ms; a disclosure may take 180ms with `cubic-bezier(.2,0,.2,1)`. Reduced-motion mode removes transitions and smooth scrolling.

Focus is a visible 3px outline with an offset; add a second contrasting ring where necessary on coloured controls. Targets are at least 44px tall. Inputs have persistent labels, visible borders, and associated error messages. Labels, body text, and placeholders must pass contrast in the actual rendered theme.

Contact and reveal controls have explicit pending, success, and retry states. Preserve form input on failure. Contact values are inserted only after server verification, with an announcement and useful link. The no-JavaScript fallback uses approved existing destinations without exposing protected values.

## Do's and Don'ts

- Do preserve all existing facts, testimonials, service scope, and the `#contact` anchor.
- Do use original company assets and identify the rendering accurately.
- Do keep the headline, purpose, and enquiry action visible early at 360px.
- Do keep motion restrained and check real keyboard, screen-reader, and browser behaviour.
- Don't invent testimonials, project relationships, locations, guarantees, or timelines.
- Don't ship a generated comp, generated room detail, or rasterized interface as page content.
- Don't use Inter/system display faces, pure black/gray UI colours, purple-to-blue gradients, card nesting, gray text on coloured backgrounds, bounce, or elastic easing.
- Don't claim quality gates have passed from design tokens or mockups alone.
