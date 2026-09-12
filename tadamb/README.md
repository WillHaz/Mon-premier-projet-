# TADAMB — portrait astrologique croisé

Prototype V2 d’un site permettant de saisir prénom, date, heure et lieu de naissance, puis de produire trois lectures :

1. astrologie occidentale ;
2. double astrologie chinoise ;
3. synthèse croisée TADAMB.

## V2 — ce qui fonctionne

- géocodage du lieu via Open-Meteo ;
- récupération latitude, longitude et fuseau IANA ;
- conversion de l’heure locale de naissance vers UTC avec prise en compte du fuseau historique fourni par le navigateur ;
- calcul astronomique léger du Soleil ;
- calcul astronomique simplifié de la Lune ;
- calcul de l’Ascendant à partir du temps sidéral local, de la latitude et de la longitude ;
- signe, élément et modalité du Soleil, de la Lune et de l’Ascendant ;
- animal chinois de l’année selon le calendrier chinois disponible via `Intl` ;
- élément et polarité Yin/Yang ;
- animal chinois de l’heure ;
- moteur de synthèse TADAMB qui cherche convergences, complémentarités et tensions ;
- interface responsive mobile/desktop ;
- avertissement automatique lorsque Lune ou Ascendant sont proches d’une frontière de signe.

## Architecture actuelle

Le prototype reste volontairement statique :

- `index.html` : interface ;
- `styles.css` : identité visuelle ;
- `app.js` : géocodage, calculs astronomiques, astrologie chinoise et moteur de synthèse.

Aucune donnée utilisateur n’est enregistrée par cette V2.

## Niveau de précision

Le Soleil et l’Ascendant utilisent des formules astronomiques adaptées à un prototype web. La Lune utilise une série simplifiée avec corrections périodiques principales.

Pour une mise en production commerciale ou un thème natal présenté comme techniquement précis, les positions et maisons devront être validées ou remplacées par Swiss Ephemeris. C’est particulièrement important lorsqu’un astre ou l’Ascendant se trouve très près d’une frontière de signe.

## Double astrologie chinoise retenue

- **Axe 1 : année** — animal + élément + Yin/Yang.
- **Axe 2 : heure** — animal de la tranche horaire chinoise de deux heures.

### Extension V3 possible

Ajouter les quatre piliers BaZi :
- année ;
- mois ;
- jour ;
- heure ;
- troncs célestes ;
- branches terrestres ;
- cinq éléments et leurs équilibres.

## Vision TADAMB

Le moteur final ne doit jamais se contenter de concaténer « Taureau + Rat + Ascendant X ». Il doit distinguer :

- convergences entre systèmes ;
- tensions et contradictions ;
- traits renforcés ;
- image extérieure vs fonctionnement intime ;
- ressources ;
- angles de vigilance ;
- dynamique relationnelle ;
- dynamique de travail et de décision.

L’astrologie est présentée comme une lecture symbolique et culturelle, pas comme une vérité scientifique, un diagnostic psychologique ou une prédiction certaine.
