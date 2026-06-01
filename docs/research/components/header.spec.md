# Header Specification (AnnouncementBar + MainHeader + CategoryNav)

## Overview
- **Target file:** `src/components/Header.tsx`
- **Interaction model:** Static (sticky on scroll)
- **Screenshot reference:** See PAGE_TOPOLOGY.md section 1-3

## Component Structure
Three stacked sub-sections all inside `<header className="main-header">`:
1. AnnouncementBar — teal ribbon
2. MainHeader — dark bar with logo, search, icons
3. CategoryNav — dark bar with navigation links

---

## 1. AnnouncementBar

### Container
- background-color: #4c8076
- color: #ffffff
- padding: 8px 24px
- display: flex
- justify-content: center (or space-between)
- align-items: center
- gap: 24px
- font-size: 13px
- font-weight: 400

### Left: Trustpilot
- Text: "Voir nos **4 809 avis** sur [Trustpilot logo] Trustpilot"
- "4 809 avis" is underlined link
- Trustpilot green star logo (✦ use a simple star or inline SVG)

### Center trust badges (flex row with gap):
- ✓ Matériel contrôlé et garanti
- ✓ Paiement 100 % sécurisé
- ✓ Retour possible 30 jours
- ✓ Livraison rapide et intégrée
Each preceded by a green circle checkmark icon

### Right: Language selector
- French flag (🇫🇷) + "FR" + chevron down
- font-size: 13px

---

## 2. MainHeader

### Container (.main-header__grid-container)
- background-color: #262f2c
- padding: 12px 24px
- display: grid
- grid-template-columns: auto 1fr auto
- align-items: center
- gap: 24px
- height: ~70px

### Logo
- Text "Campsider" in bold
- color: #ffffff
- font-size: 24px
- font-weight: 700
- letter-spacing: -0.5px

### Search bar
- background: #ffffff
- border-radius: 4px
- padding: 10px 16px
- display: flex
- align-items: center
- gap: 8px
- width: 100%
- Input: placeholder "Rechercher un produit, une marque…", font-size: 14px, color: #262f2c
- Search icon on right: gray, 18px

### Right icons section
- display: flex
- align-items: center
- gap: 16px
- color: #ffffff

#### Phone info
- font-size: 12px
- line1: "Lundi au Samedi 10h-19h"
- line2: "Échanger par téléphone" (underlined, slightly larger)

#### Icons (from left to right)
- Mail icon (24px, white)
- Account/person icon (24px, white)
- Cart/shopping bag icon (24px, white)

---

## 3. CategoryNav

### Container
- background-color: #262f2c
- border-top: 1px solid rgba(255,255,255,0.1)
- padding: 0 24px
- display: flex
- align-items: center
- gap: 0
- height: 44px
- overflow-x: auto

### Category links
- color: #ffffff
- font-size: 14px
- font-weight: 400
- padding: 0 16px
- height: 100%
- display: flex
- align-items: center
- white-space: nowrap
- border-bottom: 2px solid transparent
- hover: border-bottom-color: #ffffff

### Special links (BLOG, AIDE ET SUPPORT)
- font-weight: 700
- margin-left: auto (for right alignment)
- padding: 0 16px

### Nav items:
1. Vélos de route
2. Vélos gravel
3. VTT électriques
4. VTT musculaires
5. VTC électriques
6. Vélos de ville électriques
7. Skis alpins
8. BLOG (bold, right-aligned)
9. AIDE ET SUPPORT (bold)

---

## Responsive Behavior
- **Desktop (1440px):** Full layout as described
- **Mobile (390px):** Logo only + search + hamburger menu icon. Category nav hidden.
- **Breakpoint:** ~768px

## Notes
- Use `position: sticky; top: 0; z-index: 50` on the header wrapper
- All icons use Lucide React: `Search`, `Mail`, `User`, `ShoppingBag`, `Phone`, `ChevronDown`
