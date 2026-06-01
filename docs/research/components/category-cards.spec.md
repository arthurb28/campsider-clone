# CategoryCards Specification

## Overview
- **Target file:** `src/components/CategoryCards.tsx`
- **Interaction model:** Horizontal scroll carousel (static on desktop shows 6, scrollable on mobile)
- **Section title:** None (no title, directly below hero)

## DOM Structure
Section → swiper container → row of `.swiper-slide` cards
Each card: anchor > square image + label text below

## Computed Styles

### Section container
- padding: 24px 24px
- background-color: #ffffff

### Card
- width: ~190px (fixed)
- cursor: pointer
- display: flex
- flex-direction: column
- align-items: center
- border: 1px solid #e5e5e5
- background: #ffffff

### Card image
- width: 100%
- aspect-ratio: 1/1
- object-fit: contain
- padding: 16px

### Card label
- font-size: 14px
- font-weight: 400
- color: #262f2c
- text-align: center
- padding: 8px 4px 12px
- border-top: 1px solid #e5e5e5

## Category Data
1. { label: "Vélos de route", imageSrc: "/images/categories/velos-de-route.jpg", alt: "Vélos de route", href: "/velos-de-route" }
2. { label: "Vélos gravel", imageSrc: "/images/categories/velos-gravel.png", alt: "Vélos gravel", href: "/velos-gravel" }
3. { label: "VTT électriques", imageSrc: "/images/categories/vtt-electriques.png", alt: "VTT électriques", href: "/vtt-electriques" }
4. { label: "VTT musculaires", imageSrc: "/images/categories/vtt-musculaires.jpg", alt: "VTT musculaires", href: "/vtt-musculaires" }
5. { label: "VTC électriques", imageSrc: "/images/categories/vtc-electriques.png", alt: "VTC électriques", href: "/vtc-electriques" }
6. { label: "Vélos ville électriques", imageSrc: "/images/categories/vtc-electriques.png", alt: "Vélos ville électriques", href: "/velos-ville-electriques" }

Note: Use the ctfassets.net URLs directly via Next.js Image with unoptimized, or use local /images paths.

## Responsive Behavior
- **Desktop (1440px):** All cards visible in a row, no scroll needed, gap: 16px between cards
- **Mobile (390px):** Horizontal scroll, cards ~140px wide, scroll-snap-type: x mandatory
- **Breakpoint:** ~768px

## Implementation Notes
- Use `next/image` with `width` and `height` props or just `<img>` for simplicity
- Horizontal scroll with `overflow-x: auto`, `display: flex`, `gap: 16px`
- Wrap in a container with `padding: 0 24px`
