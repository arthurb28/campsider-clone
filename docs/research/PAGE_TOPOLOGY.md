# Campsider Homepage — Page Topology

## URL
https://campsider.com

## Overall Layout
- Standard vertical scroll, no scroll-snap
- Max width: ~1310px (from hero swiper slide width)
- No smooth scroll library detected
- Fixed/sticky: main header sticks on scroll (standard sticky)
- Background: white (#ffffff)

## Sections (top to bottom)

### 1. AnnouncementBar
- **Class**: `.announces` inside `.main-navigation__announces`
- **Position**: Inside header, above main nav
- **Layout**: Full width, flex row, centered
- **Background**: `#4c8076` (teal-green)
- **Text**: white
- **Content**: Trustpilot rating link + trust badges (Matériel contrôlé et garanti, Paiement 100% sécurisé, Retour possible 30 jours, Livraison rapide et intégrée) + language selector (FR flag + chevron)
- **Interaction**: Static. Language dropdown on flag click.

### 2. MainHeader
- **Class**: `.main-header` > `.container.main-header__grid-container`
- **Position**: Sticky
- **Background**: `#262f2c` (dark charcoal)
- **Layout**: Grid row: [Logo] [Search bar] [Phone + Icons]
- **Logo**: "Campsider" text logo, white, bold
- **Search**: White input with search icon, placeholder "Rechercher un produit, une marque…"
- **Right icons**: Phone info (Lundi au Samedi 10h-19h / Échanger par téléphone), mail icon, account icon, cart icon — all white
- **Interaction**: Static header. Search box clickable.

### 3. CategoryNav
- **Class**: `.main-header-menu__categories-container`
- **Background**: `#262f2c` (same dark as header)
- **Layout**: Horizontal list of category links
- **Links**: Vélos de route | Vélos gravel | VTT électriques | VTT musculaires | VTC électriques | Vélos de ville électriques | Skis alpins | BLOG (bold) | AIDE ET SUPPORT (bold)
- **Text**: white on dark, 14px
- **Interaction**: Static links. Likely dropdowns on hover (not cloned).

### 4. HeroBanner
- **Class**: `.hero-swiper` (section)
- **Type**: Swiper.js image carousel, 3 slides
- **Background**: Light beige/cream (baked into images)
- **Content**: Full-width images (desktop + mobile versions), text baked into image
- **Slide 1**: gen-slider-without-trustpilot-desktop-min.jpg — bikes + ski equipment collage + "L'expert des équipements de sport d'occasion" heading
- **Nav**: Left/right arrows (circle buttons), dot pagination
- **Interaction**: Auto-play carousel, click arrows to navigate

### 5. CategoryCards (home-featured-block #1)
- **Type**: Horizontal swiper carousel of category cards
- **Card structure**: Square image + label below
- **Categories**: Vélos de route, Vélos gravel, VTT électriques, VTT musculaires, VTC électriques, Vélos ville électriques, Skis alpins
- **Card border**: 1px #e5e5e5, no border-radius
- **Label**: centered below image, 14px, #262f2c
- **Images**: from ctfassets.net CDN

### 6. TrustpilotSection
- **Type**: "Excellent" rating + 3 review cards (slider)
- **Left**: Big "Excellent" + 5-star rating + "Basé sur 4 809 avis" + Trustpilot logo
- **Right**: 3 review cards with rating, "Sur invitation" badge, title, body, author name, time ago
- **Background**: white
- **Interaction**: Left/right arrows for carousel

### 7. BestDeals ("Nos meilleurs deals")
- **Section class**: `.home-featured-block`
- **Header**: "Nos meilleurs deals" h2 + "Ils n'attendent que vous" subtitle + "Voir plus" button (orange) + navigation arrows
- **Cards**: Product cards (`.product-card`) with image, brand, model, price, discount badge, condition badge
- **Price tag**: Orange bg `#be4a09`, white text, on image
- **Condition**: "NEUF" (dark) or "OCCASION" (dark) badge on image
- **Price**: Current price orange, old price strikethrough
- **Metadata chips**: Year, frame size, height range, status — small rounded chips

### 8. SelectionSection ("Notre sélection du moment")
- **Section class**: `.home-featured-block`
- **Header**: "Notre sélection du moment" + "Rien que pour vous"
- **Cards**: 5 promo cards, each with colored background, tag (SÉLECTION/TOP MARQUES/BONS PLANS/etc.), bold white CTA text, subtitle, product image
- **Colors**: Dark teal, olive green, sage green, light blue, amber/orange
- **Structure**: card has bg color + product image on right side + text on left

### 9. BrandsSection ("Nos plus belles marques")
- **Section class**: `.home-featured-block`
- **Header**: "Nos plus belles marques" + "Petits prix garantis"
- **Cards**: Brand logo on white card with border
- **Brands**: Cannondale, Specialized, Giant, Rossignol, Dynastar
- **Card**: white bg, 1px border, logo centered

### 10. PressSection ("Ils parlent de nous")
- **Section class**: `.home-featured-block`
- **Header**: "Ils parlent de nous" + "(et en bien)"
- **Cards**: 3 press cards: M6, Les Echos, Le Monde
- **Card**: white bg, 1px border, logo + headline + "Lire plus" link

### 11. BlogSection ("Nos meilleurs conseils")
- **Section class**: `.home-featured-block`
- **Header**: "Nos meilleurs conseils" + "On vous dit tout" + "Voir plus" btn + arrows
- **Cards**: 3 article cards: image + title + "Lire plus" link

### 12. NewsletterSection
- **Class**: `.newsletter`
- **Container**: White bg with 1px border, rounded, centered
- **Heading**: "Devenez membre de la communauté Campsider"
- **Subtitle**: "Et recevez nos bons plans, réductions, conseils directement sur votre boite mail !"
- **Form**: Email input + "S'inscrire" orange button

### 13. SEOLinksSection
- **Layout**: 5-column grid of link lists
- **Sections**: Nos tops catégories, Nos tops marques, Par gamme, Ski-Snow, Vélo + sub-sections (Rossignol, Dynastar, Salomon S/Max, Plus de marques, Nos conseils)
- **Links**: Small gray text links, no special styling

### 14. Footer
- **Class**: `.main-footer`
- **Background**: `#262f2c` (dark)
- **Text**: `#f4f2ee` (cream)
- **Layout**: Logo + description, then horizontal rule, then 3-column links (À-PROPOS, AIDE, ACHETER), then bottom row (social icons + payment icons + copyright)
- **Social**: Instagram icon, Facebook icon
- **Payment**: Mastercard, Visa, OSV logos
- **Copyright**: "© 2026 Campsider"
