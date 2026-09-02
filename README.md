# Novex Confort — Landing page

Landing page de **Novex Confort** — *Le choix d'un sommeil de qualité.*
Vente de matelas à Cotonou (Bénin).

> **Phase 2 : contenu réel et assets.** Le contenu, le wording, les
> informations produit et la direction artistique sont en place. Restent à
> intégrer les visuels produit et les vidéos TikTok, puis la phase 3
> (tracking, SEO, optimisation).

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
js/main.js          Menu mobile, FAQ, composition, scrollspy, liens WhatsApp
assets/images/      Logo, favicon + emplacements des visuels attendus
assets/icons/       Icônes / favicons
```

## Sections

1. Header persistant (sticky)
2. Hero — « Le confort qui change vos nuits. »
3. Bandeau de micro-conversion (format / épaisseur / zone)
4. Pourquoi Novex Confort (4 cartes)
5. À propos
6. Nos matelas (1, 2 et 3 places)
7. Composition interne (schéma en 5 couches, interactif)
8. Bénéfices
9. CTA final
10. FAQ (accordion)
11. Footer (dont les liens TikTok, Instagram et WhatsApp)

## Informations de contact

Ces données sont utilisées dans la page ; elles ne doivent être modifiées
qu'à la demande de Novex Confort.

- **Adresse** : Qt Marina PK10, Cotonou, Bénin
- **Téléphone / WhatsApp** : +229 01 97 22 41 40
- **E-mail** : novex.contact00@gmail.com
- **Instagram** : [@Novex.Confort](https://www.instagram.com/novex.confort/)
- **TikTok** : [@novex.confort](https://www.tiktok.com/@novex.confort)
- **Livraison** : partout au Bénin

## Reste à fournir

- **Visuels produit** — voir `assets/images/README.md` pour la liste des
  fichiers attendus et les emplacements déjà câblés.

Tant qu'un asset manque, la page affiche un placeholder propre indiquant le
nom du fichier attendu, plutôt qu'une image générique.

## Règles de contenu

Le contenu ne mentionne que des informations communiquées par Novex Confort :
formats (1, 2 et 3 places), épaisseurs (20 cm et 25 cm), composition
(tissu respirant, mémoire de forme, mousse de confort, ressorts ensachés,
mousse de soutien) et livraison au Bénin.

Ne sont volontairement **pas** affichés, faute d'information confirmée :
prix, dimensions en centimètres, délais de livraison, garantie, politique
de retour, ancienneté de l'entreprise. Le wording évite également toute
promesse de nature médicale.

## Phase suivante (3)

Volontairement absents à ce stade : Meta Pixel, Google Analytics,
Conversions API, SEO avancé, Schema.org, CRM, backend, paiement en ligne.

## Configuration

- Numéro WhatsApp et message par défaut : objet `CONFIG` en tête de
  `js/main.js`. Chaque CTA peut porter son propre message via
  l'attribut `data-wa-message`.
- Palette et rythme vertical : bloc `:root` de `css/style.css`.
- Les logos TikTok, Instagram et WhatsApp du footer sont les glyphes
  officiels des marques, intégrés en SVG inline (aucune requête externe).
