# TrustpilotSection Specification

## Overview
- **Target file:** `src/components/TrustpilotSection.tsx`
- **Interaction model:** Click-driven carousel (left/right arrows for reviews)
- **Background:** white

## DOM Structure
Full-width section with two parts side by side:
- Left: "Excellent" rating block
- Right: 3 review cards (horizontal carousel)

## Computed Styles

### Section container
- padding: 32px 24px
- background-color: #ffffff
- display: flex
- align-items: center
- gap: 32px
- max-width: 1310px
- margin: 0 auto

### Left block
- min-width: 200px
- display: flex
- flex-direction: column
- align-items: flex-start
- gap: 4px

### "Excellent" text
- font-size: 28px
- font-weight: 700
- color: #262f2c

### Trustpilot stars
- Green stars (5 stars, one slightly muted for 4.8 rating)
- Star color: #00b67a (Trustpilot green)
- width: 28px each, gap: 4px

### "Basé sur 4 809 avis" text
- font-size: 13px
- color: #6b7280
- "4 809 avis" is a link, underlined

### Trustpilot logo
- width: ~100px
- Trustpilot black logo (text + star)

### Right: Reviews carousel
- flex: 1
- display: flex
- gap: 16px
- overflow: hidden

### Review card
- flex: 0 0 calc(33.33% - 11px)
- background: #ffffff
- border: 1px solid #e5e5e5
- padding: 16px
- display: flex
- flex-direction: column
- gap: 8px

### Review card stars
- Green stars (5 stars), smaller ~16px each
- Trustpilot green: #00b67a

### "Sur invitation" badge
- font-size: 11px
- color: #6b7280
- display: flex
- align-items: center
- gap: 4px
- ✓ checkmark icon

### Review title
- font-size: 14px
- font-weight: 600
- color: #262f2c

### Review body
- font-size: 13px
- color: #262f2c
- line-height: 1.4

### Author + time
- font-size: 12px
- color: #6b7280
- "Author Name, Il y a X heures"

### "Nos avis 5 étoiles" link (below reviews)
- font-size: 13px
- color: #262f2c
- underline

### Left/right arrows (same style as hero)
- width: 36px, height: 36px
- border-radius: 50%
- border: 1px solid #e5e5e5
- background: #ffffff

## Review Data (verbatim)
Review 1:
- Title: "Merci très bon site"
- Body: "Merci très bon site"
- Author: "Fernando Aguiar"
- Time: "Il y a 17 heures"

Review 2:
- Title: "Vélo en très bon état et bons cons…"
- Body: "Vélo en très bon état, conseil téléphonique avant achat de qualité"
- Author: "Elise G"
- Time: "Il y a 18 heures"

Review 3:
- Title: "Très bien rapport qualité prix serv…"
- Body: "Très bien rapport qualité prix service je recommande"
- Author: "Asmat Mohammed"
- Time: "Il y a 1 jour"

Footer text: "Nos avis 5 étoiles"

## Responsive Behavior
- **Desktop:** Side-by-side layout
- **Mobile (390px):** Stack vertically, left block on top, reviews scroll horizontally
- **Breakpoint:** ~768px
