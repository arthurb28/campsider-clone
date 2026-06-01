# SelectionSection + BrandsSection + PressSection + BlogSection Specification

## Overview
- **Target file:** `src/components/SelectionSection.tsx`, `src/components/BrandsSection.tsx`, `src/components/PressSection.tsx`, `src/components/BlogSection.tsx`
- **Interaction model:** Static sections (no carousel needed, desktop shows all items)

---

## SelectionSection ("Notre sélection du moment")

### Section header
- Title: "Notre sélection du moment" (18px, weight 500, #262f2c)
- Subtitle: "Rien que pour vous" (14px, #6b7280)
- No "Voir plus" button
- padding: 24px 24px 16px

### Cards container
- display: flex (or grid)
- gap: 12px
- padding: 0 24px 24px
- overflow-x: auto on mobile

### Selection card
- width: ~250px
- min-width: 220px
- height: ~200px
- position: relative
- overflow: hidden
- border-radius: 4px
- cursor: pointer

### Card background colors (from left to right as seen on page):
1. #2d5a4e (dark teal-green) — "ROULEZ JEUNESSE / SÉLECTION"
2. #3a5a2a (dark olive green) — "À VOUS LES PISTES / TOP MARQUES"
3. #4a6741 (sage green) — "PETITS PRIX / BONS PLANS"
4. #5b7fa8 (steel blue) — "À VOUS LES PISTES / DESTOCKAGE"
5. #b8792a (amber/warm orange) — "JUSQU'À -40% / TOP MARQUES"

### Card content (text overlay)
- position: absolute, top: 0, left: 0, right: 0, bottom: 0
- padding: 16px
- display: flex
- flex-direction: column
- justify-content: space-between

### Top tag
- display: flex
- align-items: center
- gap: 6px
- font-size: 11px
- font-weight: 600
- color: #ffffff
- opacity: 0.9
- text-transform: uppercase
- letter-spacing: 0.5px

### Tag icon (lightning bolt ⚡ or arrow)
- Small icon, ~12px

### CTA label (e.g., "SÉLECTION", "TOP MARQUES")
- font-size: 18px
- font-weight: 900
- color: #ffffff
- text-transform: uppercase
- line-height: 1.1

### Subtitle text (e.g., "Nos vélos électriques")
- font-size: 13px
- color: rgba(255,255,255,0.85)
- font-weight: 400

### Product image (right side of card)
- position: absolute
- bottom: 0
- right: -10px
- height: 80%
- object-fit: contain

### Caption below card
- font-size: 13px
- color: #262f2c
- text-align: center
- padding: 8px 4px

### Selection card data:
1. bgColor: "#2d5a4e", tag: "🚀 ROULEZ JEUNESSE", label: "SÉLECTION", subtitle: "Nos vélos électriques", caption: "Vélos électriques", imgSrc: use category image
2. bgColor: "#3a5a2a", tag: "🎿 À VOUS LES PISTES", label: "TOP MARQUES", subtitle: "Nos skis alpins / ROSSIGNOL", caption: "Sélection Skis Rossignol"
3. bgColor: "#4a6741", tag: "⚡ PETITS PRIX", label: "BONS PLANS", subtitle: "VTT à moins de 1500€", caption: "VTT < 1500€"
4. bgColor: "#5b7fa8", tag: "🎿 À VOUS LES PISTES", label: "DESTOCKAGE", subtitle: "Nos skis alpins Jusqu'à -70%", caption: "Bons plans skis alpins"
5. bgColor: "#b8792a", tag: "⚡ JUSQU'À -40%", label: "TOP MARQUES", subtitle: "Sélection Vélos de route", caption: "Top marques vélos de route"

---

## BrandsSection ("Nos plus belles marques")

### Section header
- Title: "Nos plus belles marques" (18px, weight 500, #262f2c)
- Subtitle: "Petits prix garantis" (14px, #6b7280)
- padding: 24px 24px 16px

### Cards container
- display: flex
- gap: 12px
- padding: 0 24px 24px
- overflow-x: auto

### Brand card
- min-width: 180px
- height: 80px
- border: 1px solid #e5e5e5
- background: #ffffff
- display: flex
- align-items: center
- justify-content: center
- padding: 12px 16px
- cursor: pointer

### Brand logo image
- max-height: 40px
- max-width: 140px
- object-fit: contain

### Caption below brand card
- font-size: 13px
- color: #262f2c
- text-align: center
- padding: 6px 0

### Brand data (use external URLs directly — they're logos served by ctfassets):
Note: For these brand logos, use the original ctfassets.net URLs since we don't have them locally.
1. Cannondale — show "Cannondale" as text logo (bold, large, black serif-like)
2. Specialized — red S logo with "SPECIALIZED" text
3. Giant — "GIANT" with G logo
4. Rossignol — "ROSSIGNOL" with mountain/ski logo  
5. Dynastar — "▲ DYNASTAR" text

Since we don't have the actual logos, render them as text in styled boxes with appropriate font-weight.
Brand logos fallback: just render brand name in large bold text, color: #000000, font-size: 20px.

---

## PressSection ("Ils parlent de nous")

### Section header
- Title: "Ils parlent de nous" (18px, weight 500, #262f2c)
- Subtitle: "(et en bien)" (14px, #6b7280)
- padding: 24px 24px 16px

### Cards container
- display: grid
- grid-template-columns: repeat(3, 1fr)
- gap: 16px
- padding: 0 24px 24px

### Press card
- border: 1px solid #e5e5e5
- background: #ffffff
- display: flex
- flex-direction: column
- align-items: center
- padding: 32px 24px 16px

### Logo area
- height: 100px
- display: flex
- align-items: center
- justify-content: center

### Headline text
- font-size: 14px
- color: #262f2c
- font-weight: 500
- text-align: left
- width: 100%

### "Lire plus" link
- font-size: 13px
- color: #262f2c
- text-decoration: underline
- margin-left: auto

### Press data:
1. Logo: M6 (red/gray logo), Headline: "Campsider dans le 20h"
2. Logo: Les Echos (text logo with underlines), Headline: "Campsider : le site de revente de matéri..."
3. Logo: Le Monde (serif text logo), Headline: "Campsider mise sur l'essor des articles d..."

---

## BlogSection ("Nos meilleurs conseils")

### Section header
- Title: "Nos meilleurs conseils" (18px, weight 500, #262f2c)
- Subtitle: "On vous dit tout" (14px, #6b7280)
- "Voir plus" orange button
- Navigation arrows
- padding: 24px 24px 16px

### Cards container
- display: grid
- grid-template-columns: repeat(3, 1fr)
- gap: 16px
- padding: 0 24px 24px

### Blog card
- border: none
- background: #ffffff

### Blog image
- width: 100%
- aspect-ratio: 16/9
- object-fit: cover

### Blog title
- font-size: 14px
- font-weight: 500
- color: #262f2c
- padding: 8px 0 4px

### "Lire plus" link
- font-size: 13px
- color: #262f2c
- text-decoration: underline

### Blog data (verbatim titles):
1. Title: "Nos conseils d'achat pour un vélo de ro..." — use /images/hero/slider-1-desktop.jpg as placeholder
2. Title: "Quelles sont les aides à l'achat d'un vélo..." — use /images/hero/slider-1-desktop.jpg as placeholder  
3. Title: "Comment bien choisir ses skis alpins ?" — use /images/hero/slider-1-desktop.jpg as placeholder

## Responsive Behavior
- **Desktop (1440px):** Grid layouts as described, all visible
- **Mobile (390px):** Stack to 1 column, horizontal scroll for selection/brands
- **Breakpoint:** ~768px
