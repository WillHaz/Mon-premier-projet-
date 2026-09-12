# TADAMB — prototype astrologique croisé

Prototype de site permettant de saisir prénom, date, heure et lieu de naissance, puis de produire trois lectures :

1. astrologie occidentale ;
2. double astrologie chinoise ;
3. synthèse croisée TADAMB.

## État de la V1

Déjà fonctionnel dans le navigateur :
- signe solaire occidental ;
- animal chinois de l’année, avec prise en compte du calendrier chinois via `Intl` lorsque le navigateur le permet ;
- élément + polarité Yin/Yang de l’année ;
- animal chinois de l’heure de naissance ;
- texte de synthèse croisée basique ;
- interface responsive mobile/desktop.

À brancher pour obtenir un vrai thème natal occidental :
- géocodage du lieu de naissance vers latitude/longitude ;
- conversion correcte de l’heure locale historique vers UTC ;
- positions Soleil, Lune et planètes ;
- Ascendant et Milieu du Ciel ;
- maisons astrologiques ;
- aspects ;
- moteur d’interprétation détaillé.

## Moteur astronomique recommandé

`@swisseph/browser` (Swiss Ephemeris en WebAssembly) permet de calculer les positions planétaires et les maisons directement dans le navigateur. Cela permet de garder une architecture pouvant être hébergée comme site statique après une étape de build.

## Double astrologie chinoise retenue pour le MVP

- **Axe 1 : année** — animal + élément + Yin/Yang.
- **Axe 2 : heure de naissance** — animal de la tranche horaire chinoise de deux heures.

Extension possible : ajouter les quatre piliers BaZi (année, mois, jour, heure) avec troncs célestes et branches terrestres.

## Vision du moteur TADAMB

Le moteur final ne doit pas simplement juxtaposer des descriptions. Il doit distinguer :
- convergences entre systèmes ;
- tensions/contradictions ;
- traits renforcés ;
- comportements visibles vs intimes ;
- ressources, angles de vigilance et dynamique relationnelle.

Le texte final doit rester présenté comme une lecture symbolique/interprétative, et non comme une vérité scientifique ou un diagnostic psychologique.
