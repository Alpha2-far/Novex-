# assets/videos

La section « Découvrez Novex Confort en action » est alimentée par les
**vidéos TikTok officielles** de la marque, via l'embed TikTok — pas par
des fichiers vidéo hébergés ici.

## Intégrer une vidéo

1. Récupérer le code d'intégration officiel sur TikTok
   (Partager → Intégrer) pour chaque vidéo.
2. Dans `index.html`, section `#videos`, renseigner l'URL sur le bloc
   correspondant : `<article class="video-card" data-tiktok-url="…">`.
3. Remplacer le `<div class="media__placeholder">` de ce bloc par le
   `<blockquote class="tiktok-embed">` fourni par TikTok.
4. Charger le script officiel une seule fois, en fin de `<body>` :
   `<script async src="https://www.tiktok.com/embed.js"></script>`

Le conteneur `.video-card__frame` impose déjà le ratio 9:16 et la grille
est responsive (carrousel horizontal sur mobile, 3 colonnes dès 768 px).

Ce dossier peut accueillir les vignettes de secours (`poster-01.jpg`, …)
si l'on souhaite un affichage avant chargement de l'embed.
