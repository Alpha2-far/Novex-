# assets/videos

La section « Découvrez Novex Confort en action » utilise l'**intégration
TikTok officielle**. Aucune vidéo n'est hébergée ici.

## Fonctionnement

Chaque carte de `index.html` (section `#videos`) porte l'URL de la vidéo :

```html
<li class="video-card" data-tiktok-url="https://vm.tiktok.com/ZN8YR3frX/">
```

Les liens courts `vm.tiktok.com` ne contiennent pas l'identifiant de la
vidéo, indispensable à l'embed. `js/main.js` le résout donc via l'**API
oEmbed de TikTok**, qui renvoie le code d'intégration officiel, puis charge
`https://www.tiktok.com/embed.js` **une seule fois**.

Le tout est différé : rien n'est demandé à TikTok avant que la section
n'approche du viewport.

## Vidéos intégrées

1. https://vm.tiktok.com/ZN8YR3frX/
2. https://vm.tiktok.com/ZN8YR76bG/

## Ajouter ou remplacer une vidéo

Dupliquer un `<li class="video-card">` et renseigner `data-tiktok-url`.
La grille passe automatiquement à 1 colonne sur mobile et 2 dès 768 px ;
au-delà de deux vidéos, ajuster `.video-grid` dans `css/style.css`.

## Éviter l'appel oEmbed (optionnel)

Si l'URL canonique d'une vidéo est connue — de la forme
`https://www.tiktok.com/@novex.confort/video/7XXXXXXXXXXXXXXXXXX` —
ajouter l'identifiant sur la carte :

```html
<li class="video-card"
    data-tiktok-url="https://www.tiktok.com/@novex.confort/video/7XXXXXXXXXXXXXXXXXX"
    data-tiktok-id="7XXXXXXXXXXXXXXXXXX">
```

L'embed est alors construit directement, sans appel réseau supplémentaire.
C'est la variante la plus robuste.

## Modes dégradés

- **Script TikTok indisponible** (bloqueur de contenu, réseau) : le lien
  « Voir sur TikTok » est restauré après 6 s. Jamais de zone vide.
- **JavaScript désactivé** : le lien de repli présent dans le HTML reste
  affiché.

Les largeurs imposées par TikTok (`min-width: 325px`) sont neutralisées en
CSS afin qu'aucun embed ne dépasse du conteneur, y compris à 360 px.
