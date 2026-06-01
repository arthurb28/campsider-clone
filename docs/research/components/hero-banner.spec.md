# HeroBanner Specification

## Overview
- **Target file:** `src/components/HeroBanner.tsx`
- **Interaction model:** Click-driven carousel (left/right arrow navigation + dot pagination)
- **Screenshot:** See section 4 in PAGE_TOPOLOGY.md

## DOM Structure
`<section class="hero-swiper">` contains:
- Swiper wrapper with 3 slides
- Each slide: `<a>` wrapping `<img class="is-hidden-touch">` (desktop) + `<img class="is-hidden-desktop">` (mobile)
- Left arrow button (circle, absolute left)
- Right arrow button (circle, absolute right)
- Dot pagination (centered, bottom)

## Computed Styles

### Container
- position: relative
- width: 100%
- overflow: hidden
- background-color: #f5f0e8 (light beige — visible before image loads)

### Slide image
- width: 100%
- height: auto
- display: block
- object-fit: cover

### Arrow buttons
- position: absolute
- top: 50%
- transform: translateY(-50%)
- width: 40px
- height: 40px
- border-radius: 50%
- background: rgba(255,255,255,0.9)
- border: none
- display: flex
- align-items: center
- justify-content: center
- cursor: pointer
- z-index: 10
- Left arrow: left: 16px
- Right arrow: right: 16px

### Dot pagination
- position: absolute
- bottom: 16px
- left: 50%
- transform: translateX(-50%)
- display: flex
- gap: 8px
- z-index: 10

### Dot
- width: 8px
- height: 8px
- border-radius: 50%
- background: rgba(255,255,255,0.5)
- cursor: pointer

### Active dot
- background: #ffffff
- width: 24px
- border-radius: 4px

## Slide Data
Slide 1 (desktop): https://images.ctfassets.net/g56npo3mo9q7/1tlY1d5vYEOlTjWmmcMYJr/20a818e1c1bd04a83d66515003096ee5/gen-slider-without-trustpilot-desktop-min.jpg
Slide 1 (mobile): https://images.ctfassets.net/g56npo3mo9q7/17jvi5cUyIaA6PQQYhKBjq/145037a1a3eedad64722df3fb9eaf555/gen-slider-without-trustpilot-mobile-min__1_.jpg

Note: All 3 slides use the same images (duplicate slides). Use local paths:
- Desktop: /images/hero/slider-1-desktop.jpg
- Mobile: /images/hero/slider-1-mobile.jpg

## States & Behaviors

### Carousel navigation
- **Trigger:** Click left/right arrow or dot
- **State change:** Active slide index increments/decrements, dots update
- **Transition:** slide transform or opacity fade

## Responsive Behavior
- **Desktop (1440px):** Show `is-hidden-touch` image (full width banner ~430px tall)
- **Mobile (390px):** Show `is-hidden-desktop` image (taller aspect ratio ~500px)
- **Breakpoint:** ~1024px (Bulma CSS "touch" breakpoint)

## Assets
- `/images/hero/slider-1-desktop.jpg`
- `/images/hero/slider-1-mobile.jpg`
