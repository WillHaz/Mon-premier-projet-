# TADAMB — portrait astrologique croisé

Prototype V2 d’un site permettant de produire un portrait astrologique occidental, chinois et croisé à partir des informations de naissance disponibles.

## Principe important : fonctionner même avec des données incomplètes

La **date de naissance est obligatoire**. L’heure et le lieu sont facultatifs.

TADAMB adapte automatiquement le niveau du portrait :

- **Portrait essentiel — date seule** : signe solaire + animal chinois annuel + élément + polarité Yin/Yang + synthèse croisée allégée.
- **Portrait enrichi — date + heure** : ajoute la Lune et l’animal chinois de l’heure. L’Ascendant reste indisponible sans lieu.
- **Portrait complet V2 — date + heure + lieu** : ajoute l’Ascendant grâce au fuseau, à la latitude et à la longitude du lieu de naissance.

Le principe produit est simple : **ne jamais inventer une donnée manquante**. Chaque couche impossible à calculer est affichée comme indisponible avec l’explication de l’information nécessaire pour l’obtenir.

## V2 — ce qui fonctionne

- heure et lieu facultatifs ;
- géocodage du lieu via Open-Meteo lorsqu’un lieu est fourni ;
- récupération latitude, longitude et fuseau IANA ;
- conversion de l’heure locale de naissance vers UTC lorsque heure + lieu sont disponibles ;
- calcul astronomique léger du Soleil ;
- calcul astronomique simplifié de la Lune lorsque l’heure est connue ;
- calcul de l’Ascendant lorsque heure + lieu sont connus ;
- animal chinois de l’année selon le calendrier chinois disponible via `Intl` ;
- élément et polarité Yin/Yang ;
- animal chinois de l’heure lorsque l’heure est connue ;
- moteur de synthèse TADAMB utilisant uniquement les couches effectivement calculables ;
- interface responsive mobile/desktop.

## Architecture actuelle

- `index.html` : interface ;
- `styles.css` : identité visuelle ;
- `app.js` : géocodage, calculs astronomiques, astrologie chinoise et moteur de synthèse.

Aucune donnée utilisateur n’est enregistrée par cette V2.

## Niveau de précision

Le Soleil et l’Ascendant utilisent des formules astronomiques adaptées à un prototype web. La Lune utilise un calcul simplifié. Pour une mise en production commerciale ou un thème natal présenté comme techniquement précis, ces positions devront être validées ou remplacées par Swiss Ephemeris.

## Double astrologie chinoise retenue

- **Axe 1 : année** — animal + élément + Yin/Yang.
- **Axe 2 : heure** — animal de la tranche horaire chinoise de deux heures, uniquement lorsque l’heure est connue.

### Extension V3 possible

Ajouter les quatre piliers BaZi : année, mois, jour et heure, avec troncs célestes, branches terrestres et équilibres des cinq éléments. En l’absence d’heure, le moteur BaZi devra lui aussi fonctionner en mode partiel et signaler explicitement le pilier manquant.

## Vision TADAMB

Le moteur final ne doit jamais se contenter de concaténer « Taureau + Rat + Ascendant X ». Il doit distinguer convergences, tensions, traits renforcés, image extérieure, fonctionnement intime, ressources, angles de vigilance et dynamique relationnelle.

L’astrologie est présentée comme une lecture symbolique et culturelle, pas comme une vérité scientifique, un diagnostic psychologique ou une prédiction certaine.
