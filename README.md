# Novex Confort — Landing page

Landing page de **Novex Confort**, vente de matelas à Cotonou (Bénin).

> **Phase actuelle : SQUELETTE.** La structure, le layout, les composants et
> le responsive sont en place. Les textes, visuels, prix, le SEO et le
> tracking seront traités dans une phase suivante.

## Stack

HTML5, CSS3 et JavaScript vanilla. **Aucun framework, aucun npm, aucune
dépendance à installer.** La seule ressource externe est la police
*Plus Jakarta Sans* (Google Fonts), en amélioration progressive : un stack
de polices système sert de repli si elle n'est pas disponible.

## Lancer le site

Ouvrir `index.html` dans un navigateur, ou servir le dossier :

```bash
python3 -m http.server 8000
```

## Arborescence

```
index.html          Page complète (10 sections)
css/style.css       Design tokens + composants, mobile-first
js/main.js          Menu mobile, accordion FAQ, scrollspy, liens WhatsApp
assets/images/      Visuels (logos provisoires inclus)
assets/videos/      Vidéos 9:16 (emplacements réservés)
assets/icons/       Icônes / favicons
```

## Sections

1. Header persistant (sticky)
2. Hero (split layout + carte flottante)
3. Bandeau d'action rapide
4. Pourquoi Novex Confort
5. À propos / expertise
6. Catalogue — nos matelas
7. Novex Confort en vidéo
8. CTA final
9. FAQ (accordion)
10. Footer

## Points à finaliser

- Textes marketing définitifs (tous les textes actuels sont provisoires)
- Visuels et vidéos réels (voir les `README.md` de `assets/`)
- Prix, dimensions et disponibilité des matelas (emplacements déjà prévus
  dans les cartes produit)
- SEO complet et données structurées
- Meta Pixel / Google Analytics — **volontairement absents**
- Branchement du bandeau d'action rapide sur un formulaire ou un CRM
  (aujourd'hui : ouverture d'une conversation WhatsApp pré-remplie)

## Configuration

Le numéro WhatsApp et le message par défaut sont centralisés dans l'objet
`CONFIG` en tête de `js/main.js`. La palette et le rythme vertical sont
centralisés dans le bloc `:root` de `css/style.css`.
