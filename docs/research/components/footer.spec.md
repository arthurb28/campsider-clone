# NewsletterSection + SEOLinksSection + Footer Specification

## Overview
- **Target file:** `src/components/NewsletterSection.tsx`, `src/components/SEOLinksSection.tsx`, `src/components/Footer.tsx`
- **Interaction model:** Static

---

## NewsletterSection

### Outer container
- padding: 32px 24px
- background: #ffffff

### Inner box
- border: 1px solid #e5e5e5
- border-radius: 4px
- padding: 40px 24px
- max-width: 700px
- margin: 0 auto
- text-align: center
- display: flex
- flex-direction: column
- align-items: center
- gap: 8px

### Heading
- font-size: 20px
- font-weight: 700
- color: #262f2c
- Text: "Devenez membre de la communauté Campsider"

### Subtitle
- font-size: 14px
- color: #6b7280
- Text: "Et recevez nos bons plans, réductions, conseils directement sur votre boite mail !"

### Form
- display: flex
- gap: 8px
- margin-top: 16px
- width: 100%
- max-width: 480px

### Email input
- flex: 1
- border: 1px solid #e5e5e5
- border-radius: 4px
- padding: 10px 16px
- font-size: 14px
- placeholder: "Email"
- outline: none

### Submit button
- background: #be4a09
- color: #ffffff
- border-radius: 4px
- padding: 10px 24px
- font-size: 14px
- font-weight: 500
- border: none
- cursor: pointer
- white-space: nowrap
- Text: "S'inscrire"

---

## SEOLinksSection

### Container
- padding: 32px 24px
- background: #ffffff
- border-top: 1px solid #e5e5e5

### Grid
- display: grid
- grid-template-columns: repeat(5, 1fr)
- gap: 24px 16px

### Column title
- font-size: 13px
- font-weight: 700
- color: #262f2c
- margin-bottom: 12px
- text-transform: uppercase

### Link
- display: block
- font-size: 13px
- color: #6b7280
- line-height: 1.8
- hover: color: #262f2c; text-decoration: underline

### SEO Links Data (verbatim):
Row 1 columns:
1. "Nos tops catégories": Skis alpins, Chaussures de ski alpin, snowboard-occasion, Skis de randonnée, Sacs de randonnée
2. "Nos tops marques": Rossignol, Dynastar, Salomon, Head, Atomic
3. "Par gamme": Rossignol Hero Elite, Rossignol Experience, Salomon S/Max, Salomon QST, Rossignol React
4. "Ski-Snow": Skis Freestyle, Skis Femme, Skis Enfants, Splitboard, Combinaison Ski
5. "Vélo": VTT, Vélos de route, VTT Femme Occasion, Vélos Enfants, Vélos électriques

Row 2 columns:
1. "Rossignol": Pursuit, Nova, Sprayer, Blackops, React
2. "Dynastar": Intense, Cham, Team, Legend, Powertrack
3. "Salomon S/Max": S/Max 4, S/Max 8, S/Max 12, S/Max Blast, S/Max X7
4. "Plus de marques": Blizzard, Millet, Patagonia, Scarpa, Völkl
5. "Nos conseils": Choisir ses skis alpins, Entretenir ses vêtements de ski, Choisir sa veste de ski, Choisir ses chaussures de ski, Choisir la taille de son vélo

---

## Footer

### Outer container
- background-color: #262f2c
- color: #f4f2ee
- padding: 40px 24px 24px

### Brand section
- max-width: 500px
- margin-bottom: 24px

### Footer logo
- font-size: 24px
- font-weight: 700
- color: #f4f2ee
- Text: "Campsider"

### Footer description
- font-size: 14px
- color: rgba(244,242,238,0.8)
- line-height: 1.6
- margin-top: 12px
- Text: "Campsider est la 1ère marketplace dédiée aux équipements de sport outdoor d'occasion (sports d'hiver, randonnée, trail-running, escalade et alpinisme). Notre mission ? Rendre accessible l'aventure à tous, et protéger nos terrains de jeu en privilégiant la seconde main."

### Horizontal rule
- border-top: 1px solid rgba(244,242,238,0.2)
- margin: 24px 0

### Links columns
- display: grid
- grid-template-columns: repeat(3, auto) 1fr
- gap: 24px 48px

### Column title
- font-size: 12px
- font-weight: 700
- color: #f4f2ee
- text-transform: uppercase
- letter-spacing: 1px
- margin-bottom: 16px

### Footer link
- display: block
- font-size: 14px
- color: rgba(244,242,238,0.7)
- line-height: 2
- hover: color: #f4f2ee

### Footer columns:
"À-PROPOS":
- Comment ça marche ?
- On recrute !
- Mentions légales
- Politique de confidentialité
- Devenir vendeur partenaire

"AIDE":
- Aide acheteur
- Aide vendeur
- Comment vendre ?
- Livraison
- FAQ
- Contact

"ACHETER":
- Sac de randonnée
- Montre GPS
- Tente
- Veste de randonnée
- Chaussure de randonnée
- Sac de couchage

### Bottom bar
- display: flex
- align-items: center
- justify-content: space-between
- margin-top: 32px
- padding-top: 16px
- border-top: 1px solid rgba(244,242,238,0.2)

### Social icons
- display: flex
- gap: 16px
- Instagram icon (24px, #f4f2ee)
- Facebook icon (24px, #f4f2ee)
- Use Lucide: Instagram, Facebook

### Payment icons (right side)
- Text showing "Mastercard · Visa · OSV" or simple payment icon placeholder

### Copyright
- font-size: 13px
- color: rgba(244,242,238,0.5)
- text-align: center
- Text: "© 2026 Campsider"

## Responsive Behavior
- **Desktop (1440px):** Full layouts as described
- **Mobile (390px):** All columns stack vertically, SEO grid 2-column, footer 1-column
- **Breakpoint:** ~768px
