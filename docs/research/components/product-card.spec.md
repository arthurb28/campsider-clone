# ProductCard + BestDealsSection Specification

## Overview
- **Target file:** `src/components/ProductCard.tsx` + `src/components/BestDealsSection.tsx`
- **Interaction model:** Horizontal swiper carousel with navigation arrows
- **Section title:** "Nos meilleurs deals" / "Ils n'attendent que vous"

## Section Header Structure

### Header container (.home-featured-block__header)
- display: flex
- align-items: center
- justify-content: space-between
- padding: 24px 24px 16px
- background: #ffffff

### Section title
- font-size: 18px
- font-weight: 500
- color: #262f2c

### Section subtitle
- font-size: 14px
- color: #6b7280
- margin-top: 2px

### "Voir plus" button
- background-color: #be4a09
- color: #ffffff
- border-radius: 4px
- padding: 8px 20px
- font-size: 14px
- font-weight: 500
- border: none
- cursor: pointer
- hover: background #a84008

### Arrow buttons (prev/next)
- width: 32px, height: 32px
- border-radius: 50%
- border: 1px solid #e5e5e5
- background: #ffffff
- display: flex
- align-items: center
- justify-content: center
- cursor: pointer
- disabled state: opacity 0.4

---

## ProductCard Component

### Card container (article.product-card)
- background: #ffffff
- width: ~250px
- cursor: pointer
- display: flex
- flex-direction: column
- border: none (no card border)

### Image container (.product-card__swiper)
- position: relative
- aspect-ratio: 1/1
- background: #f9f9f9
- overflow: hidden

### Product image
- width: 100%
- height: 100%
- object-fit: contain
- padding: 12px

### Price tag badge (bottom-left of image)
- position: absolute
- bottom: 8px
- left: 8px
- display: flex
- gap: 4px
- align-items: center

### Discount badge (-44%, -65%, -57%)
- background-color: #be4a09
- color: #ffffff
- font-size: 12px
- font-weight: 700
- padding: 3px 6px
- border-radius: 2px

### Condition badge (NEUF / OCCASION)
- background-color: #262f2c
- color: #ffffff
- font-size: 11px
- font-weight: 500
- padding: 3px 6px
- border-radius: 2px
- letter-spacing: 0.5px
- text-transform: uppercase

### Wishlist heart button (top-right of image)
- position: absolute
- top: 8px
- right: 8px
- width: 32px, height: 32px
- border-radius: 50%
- background: rgba(255,255,255,0.9)
- border: none
- display: flex
- align-items: center
- justify-content: center
- cursor: pointer

### Card body (below image)
- padding: 12px 0

### Brand name (.product-card__brand)
- font-size: 18px
- font-weight: 500
- color: #072a36
- line-height: 1.2

### Model name (.product-card__model)
- font-size: 14px
- font-weight: 400
- color: #6b7280

### Price block
- display: flex
- align-items: baseline
- gap: 8px
- margin-top: 8px

### Current price
- font-size: 20px
- font-weight: 700
- color: #be4a09

### Old price (strikethrough)
- font-size: 14px
- color: #9ca3af
- text-decoration: line-through

### Metadata chips (year, size, height, condition)
- display: flex
- flex-wrap: wrap
- gap: 6px
- margin-top: 8px

### Single chip
- background: #f9f9f9
- border: 1px solid #e5e5e5
- border-radius: 4px
- padding: 3px 8px
- font-size: 12px
- color: #262f2c

---

## Product Data (verbatim from page)

Product 1:
- Brand: "CORRATEC"
- Model: "Dolomiti Elite"
- CurrentPrice: "789,99 €"
- OldPrice: "1 399 €"
- Discount: -44%
- Condition: NEUF
- Image: /images/products/corratec-dolomiti.png
- Chips: ["2025", "51", "170 - 180 cm", "S…"]

Product 2:
- Brand: "BMC"
- Model: "URS 01"
- CurrentPrice: "1 872 €"
- OldPrice: "5 299 €"
- Discount: -65%
- Condition: OCCASION
- Image: /images/products/bmc-urs01.jpg
- Chips: ["2019", "62", "188 - 205 cm", "S.."]

Product 3:
- Brand: "ORBEA"
- Model: "Orca OMX Carbone"
- CurrentPrice: "2 496 €"
- OldPrice: "5 799 €"
- Discount: -57%
- Condition: OCCASION
- Image: /images/products/orbea-orca-omx.jpg
- Chips: ["2023", "47", "155 - 168 cm", "S…"]

## Responsive Behavior
- **Desktop (1440px):** Show 3 product cards side by side with gap: 16px, padding: 0 24px
- **Mobile (390px):** Horizontal scroll, 1 card visible at a time
- **Breakpoint:** ~768px
