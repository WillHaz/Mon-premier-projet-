const SIGNS = [
  { name: "Bélier", element: "Feu", mode: "Cardinal", traits: "élan, franchise et goût de l’initiative" },
  { name: "Taureau", element: "Terre", mode: "Fixe", traits: "stabilité, persévérance et rapport concret au monde" },
  { name: "Gémeaux", element: "Air", mode: "Mutable", traits: "curiosité, mobilité mentale et besoin d’échange" },
  { name: "Cancer", element: "Eau", mode: "Cardinal", traits: "sensibilité, mémoire et instinct de protection" },
  { name: "Lion", element: "Feu", mode: "Fixe", traits: "rayonnement, créativité et besoin d’expression" },
  { name: "Vierge", element: "Terre", mode: "Mutable", traits: "analyse, précision et sens du service" },
  { name: "Balance", element: "Air", mode: "Cardinal", traits: "équilibre, relation et sens de la nuance" },
  { name: "Scorpion", element: "Eau", mode: "Fixe", traits: "intensité, lucidité et capacité de transformation" },
  { name: "Sagittaire", element: "Feu", mode: "Mutable", traits: "élan, quête de sens et besoin d’horizon" },
  { name: "Capricorne", element: "Terre", mode: "Cardinal", traits: "construction, endurance et sens des responsabilités" },
  { name: "Verseau", element: "Air", mode: "Fixe", traits: "indépendance, originalité et vision collective" },
  { name: "Poissons", element: "Eau", mode: "Mutable", traits: "intuition, imagination et réceptivité" }
];

const ANIMALS = ["Rat","Buffle","Tigre","Lapin","Dragon","Serpent","Cheval","Chèvre","Singe","Coq","Chien","Cochon"];
const ANIMAL_TRAITS = {
  Rat: "vif, adaptable et stratège", Buffle: "constant, fiable et patient", Tigre: "courageux, entier et indépendant",
  Lapin: "diplomate, sensible et attentif", Dragon: "ambitieux, magnétique et énergique", Serpent: "intuitif, profond et observateur",
  Cheval: "libre, mobile et enthousiaste", Chèvre: "créatif, empathique et délicat", Singe: "inventif, agile et joueur",
  Coq: "franc, précis et volontaire", Chien: "loyal, juste et protecteur", Cochon: "généreux, chaleureux et sincère"
};
const STEMS = [
  {element:"Bois", polarity:"Yang"}, {element:"Bois", polarity:"Yin"}, {element:"Feu", polarity:"Yang"}, {element:"Feu", polarity:"Yin"},
  {element:"Terre", polarity:"Yang"}, {element:"Terre", polarity:"Yin"}, {element:"Métal", polarity:"Yang"}, {element:"Métal", polarity:"Yin"},
  {element:"Eau", polarity:"Yang"}, {element:"Eau", polarity:"Yin"}
];

const $ = (selector) => document.querySelector(selector);
const norm360 = (n) => ((n % 360) + 360) % 360;
const rad = (d) => d * Math.PI / 180;
const deg = (r) => r * 180 / Math.PI;

function signFromLongitude(longitude) {
  const x = norm360(longitude);
  const index = Math.floor(x / 30);
  return { ...SIGNS[index], degree: x % 30, longitude: x };
}

function sunSignFromDate(month, day) {
  const md = month * 100 + day;
  if (md >= 321 && md <= 419) return SIGNS[0];
  if (md >= 420 && md <= 520) return SIGNS[1];
  if (md >= 521 && md <= 620) return SIGNS[2];
  if (md >= 621 && md <= 722) return SIGNS[3];
  if (md >= 723 && md <= 822) return SIGNS[4];
  if (md >= 823 && md <= 922) return SIGNS[5];
  if (md >= 923 && md <= 1022) return SIGNS[6];
  if (md >= 1023 && md <= 1121) return SIGNS[7];
  if (md >= 1122 && md <= 1221) return SIGNS[8];
  if (md >= 1222 || md <= 119) return SIGNS[9];
  if (md >= 120 && md <= 218) return SIGNS[10];
  return SIGNS[11];
}

function julianDay(date) {
  return date.getTime() / 86400000 + 2440587.5;
}

function sunLongitude(jd) {
  const T = (jd - 2451545.0) / 36525;
  const L0 = norm360(280.46646 + 36000.76983 * T + 0.0003032 * T * T);
  const M = norm360(357.52911 + 35999.05029 * T - 0.0001537 * T * T);
  const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(rad(M))
    + (0.019993 - 0.000101 * T) * Math.sin(rad(2 * M))
    + 0.000289 * Math.sin(rad(3 * M));
  return norm360(L0 + C);
}

function moonLongitude(jd) {
  const d = jd - 2451543.5;
  const N = norm360(125.1228 - 0.0529538083 * d);
  const i = 5.1454;
  const w = norm360(318.0634 + 0.1643573223 * d);
  const a = 60.2666;
  const e = 0.0549;
  const M = norm360(115.3654 + 13.0649929509 * d);
  let E = M + deg(e * Math.sin(rad(M)) * (1 + e * Math.cos(rad(M))));
  const x = a * (Math.cos(rad(E)) - e);
  const y = a * Math.sqrt(1 - e * e) * Math.sin(rad(E));
  const r = Math.sqrt(x * x + y * y);
  const v = deg(Math.atan2(y, x));
  const lon = norm360(v + w);
  const xeclip = r * (Math.cos(rad(N)) * Math.cos(rad(lon)) - Math.sin(rad(N)) * Math.sin(rad(lon)) * Math.cos(rad(i)));
  const yeclip = r * (Math.sin(rad(N)) * Math.cos(rad(lon)) + Math.cos(rad(N)) * Math.sin(rad(lon)) * Math.cos(rad(i)));
  let eclon = norm360(deg(Math.atan2(yeclip, xeclip)));

  const Ms = norm360(356.0470 + 0.9856002585 * d);
  const Ls = norm360(280.460 + 0.9856474 * d);
  const Lm = norm360(N + w + M);
  const D = norm360(Lm - Ls);
  const F = norm360(Lm - N);
  eclon += -1.274 * Math.sin(rad(M - 2 * D))
    + 0.658 * Math.sin(rad(2 * D))
    - 0.186 * Math.sin(rad(Ms))
    - 0.059 * Math.sin(rad(2 * M - 2 * D))
    - 0.057 * Math.sin(rad(M - 2 * D + Ms))
    + 0.053 * Math.sin(rad(M + 2 * D))
    + 0.046 * Math.sin(rad(2 * D - Ms))
    + 0.041 * Math.sin(rad(M - Ms))
    - 0.035 * Math.sin(rad(D))
    - 0.031 * Math.sin(rad(M + Ms))
    - 0.015 * Math.sin(rad(2 * F - 2 * D))
    + 0.011 * Math.sin(rad(M - 4 * D));
  return norm360(eclon);
}

function greenwichSiderealTime(jd) {
  const T = (jd - 2451545.0) / 36525;
  return norm360(280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T - (T * T * T) / 38710000);
}

function ascendantLongitude(jd, latitude, longitude) {
  const T = (jd - 2451545.0) / 36525;
  const epsilon = rad(23.439291 - 0.0130042 * T);
  const theta = rad(norm360(greenwichSiderealTime(jd) + longitude));
  const phi = rad(latitude);
  const lambda = Math.atan2(-Math.cos(theta), Math.sin(theta) * Math.cos(epsilon) + Math.tan(phi) * Math.sin(epsilon));
  return norm360(deg(lambda) + 180);
}

function partsInTimeZone(date, timeZone) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23"
  }).formatToParts(date);
  return Object.fromEntries(parts.filter(p => p.type !== "literal").map(p => [p.type, Number(p.value)]));
}

function zonedLocalToUtc(dateString, timeString, timeZone) {
  const [year, month, day] = dateString.split("-").map(Number);
  const [hour, minute] = timeString.split(":").map(Number);
  const target = Date.UTC(year, month - 1, day, hour, minute, 0);
  let guess = target;
  for (let i = 0; i < 3; i++) {
    const p = partsInTimeZone(new Date(guess), timeZone);
    const represented = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
    guess += target - represented;
  }
  return new Date(guess);
}

async function geocodePlace(place) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(place)}&count=1&language=fr&format=json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Géocodage indisponible");
  const data = await response.json();
  if (!data.results?.length) throw new Error("Lieu introuvable. Essayez avec « ville, pays ». ");
  return data.results[0];
}

function getChineseRelatedYear(date) {
  try {
    const parts = new Intl.DateTimeFormat("fr-FR-u-ca-chinese", { year: "numeric", timeZone: "UTC" }).formatToParts(date);
    const related = parts.find(p => p.type === "relatedYear");
    return related ? Number(related.value) : null;
  } catch (_) { return null; }
}

function chineseYearProfile(date) {
  const relatedYear = getChineseRelatedYear(date);
  if (!relatedYear) return null;
  const animalIndex = ((relatedYear - 4) % 12 + 12) % 12;
  const stemIndex = ((relatedYear - 4) % 10 + 10) % 10;
  return { year: relatedYear, animal: ANIMALS[animalIndex], ...STEMS[stemIndex] };
}

function chineseHourAnimal(time) {
  const hour = Number(time.split(":")[0]);
  if (hour === 23 || hour === 0) return "Rat";
  return ANIMALS[Math.floor((hour + 1) / 2) % 12];
}

function cuspWarning(sign) {
  return sign.degree < 0.8 || sign.degree > 29.2;
}

function elementBridge(westernElement, chineseElement) {
  const bridges = {
    "Feu|Feu": "Les deux systèmes amplifient l’élan, l’expression et l’intensité.",
    "Terre|Terre": "Les deux systèmes renforcent le besoin de concret, de continuité et de construction.",
    "Eau|Eau": "La sensibilité, l’intuition et la faculté d’adaptation sont particulièrement accentuées.",
    "Air|Métal": "La pensée, la précision et la capacité à prendre de la distance se répondent bien.",
    "Terre|Bois": "Le besoin de stabilité rencontre une poussée de croissance : construire sans rester immobile devient un thème central.",
    "Feu|Eau": "Une tension féconde apparaît entre impulsion et sensibilité : agir vite tout en ressentant beaucoup.",
    "Eau|Feu": "La profondeur émotionnelle rencontre une énergie plus visible et volontaire : intériorité et expression cherchent leur équilibre.",
    "Air|Eau": "Le mental et l’émotion peuvent fonctionner sur deux vitesses : comprendre d’un côté, ressentir de l’autre.",
    "Terre|Eau": "Le concret donne une structure à la sensibilité ; la sécurité aide l’émotion à circuler.",
    "Air|Bois": "Curiosité et croissance se renforcent : apprendre, relier et ouvrir de nouvelles pistes devient moteur."
  };
  return bridges[`${westernElement}|${chineseElement}`] || `L’élément occidental ${westernElement} rencontre l’élément chinois ${chineseElement} : TADAMB lit cette combinaison comme un jeu de complémentarités plutôt que comme une équivalence stricte.`;
}

function buildFusion(name, sun, moon, rising, chinese, hourAnimal) {
  const who = name ? `${name}, ` : "";
  const sameElement = [sun, moon, rising].filter(s => s.element === sun.element).length;
  const core = sameElement >= 2
    ? `Votre trio occidental insiste fortement sur l’élément ${sun.element}, ce qui donne une cohérence interne marquée.`
    : `Votre trio occidental mélange ${sun.element}, ${moon.element} et ${rising.element}, ce qui crée un profil moins monolithique et davantage modulé selon les situations.`;
  return `${who}votre Soleil en ${sun.name} décrit le centre volontaire et identitaire ; votre Lune en ${moon.name} nuance la vie émotionnelle et les réactions intimes ; votre Ascendant ${rising.name} décrit davantage votre manière d’entrer dans le monde. ${core} Côté chinois, le ${chinese.animal} ${chinese.element} ${chinese.polarity} apporte un tempérament ${ANIMAL_TRAITS[chinese.animal]}, tandis que le ${hourAnimal} colore la réaction instinctive d’une tonalité plus ${ANIMAL_TRAITS[hourAnimal]}. ${elementBridge(sun.element, chinese.element)} La lecture TADAMB cherche surtout ce qui se renforce, se compense ou se contredit entre ces couches — pas à empiler quatre horoscopes.`;
}

function setStatus(text, state = "") {
  const el = $("#status");
  el.textContent = text;
  el.dataset.state = state;
}

function formatDegree(sign) {
  return `${sign.name} · ${sign.degree.toFixed(1)}°`;
}

const form = $("#birth-form");
const results = $("#results");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const button = $("#submitButton");
  button.disabled = true;
  results.classList.add("hidden");
  setStatus("Recherche du lieu et calcul du portrait…", "loading");

  try {
    const firstName = $("#firstName").value.trim();
    const birthDate = $("#birthDate").value;
    const birthTime = $("#birthTime").value;
    const birthPlace = $("#birthPlace").value.trim();
    const [year, month, day] = birthDate.split("-").map(Number);

    const place = await geocodePlace(birthPlace);
    const utcDate = zonedLocalToUtc(birthDate, birthTime, place.timezone);
    const jd = julianDay(utcDate);

    const sun = signFromLongitude(sunLongitude(jd));
    const moon = signFromLongitude(moonLongitude(jd));
    const rising = signFromLongitude(ascendantLongitude(jd, place.latitude, place.longitude));
    const chinese = chineseYearProfile(new Date(Date.UTC(year, month - 1, day, 12)));
    const hourAnimal = chineseHourAnimal(birthTime);

    $("#resolvedPlace").textContent = `${place.name}${place.admin1 ? `, ${place.admin1}` : ""} · ${place.country || ""}`;
    $("#resolvedMeta").textContent = `${place.latitude.toFixed(3)}, ${place.longitude.toFixed(3)} · ${place.timezone}`;

    $("#sunSign").textContent = formatDegree(sun);
    $("#moonSign").textContent = formatDegree(moon);
    $("#risingSign").textContent = formatDegree(rising);
    $("#westernText").textContent = `Soleil ${sun.name} : ${sun.traits}. Lune ${moon.name} : le registre émotionnel emprunte davantage aux qualités ${moon.traits}. Ascendant ${rising.name} : la présence extérieure et la manière d’aborder une situation prennent une coloration de ${rising.traits}.`;

    if (chinese) {
      $("#yearAnimal").textContent = chinese.animal;
      $("#yearElement").textContent = `${chinese.element} · ${chinese.polarity}`;
      $("#hourAnimal").textContent = hourAnimal;
      $("#chineseText").textContent = `Année du ${chinese.animal}, ${chinese.element} ${chinese.polarity} : ${ANIMAL_TRAITS[chinese.animal]}. L’heure du ${hourAnimal} est utilisée par TADAMB comme deuxième couche chinoise pour nuancer les réactions plus privées et instinctives.`;
      $("#fusionText").textContent = buildFusion(firstName, sun, moon, rising, chinese, hourAnimal);
    } else {
      $("#yearAnimal").textContent = "Indisponible";
      $("#yearElement").textContent = "—";
      $("#hourAnimal").textContent = hourAnimal;
      $("#chineseText").textContent = "Le calendrier chinois n’est pas disponible dans ce navigateur. TADAMB préfère ne pas approximer l’animal autour du Nouvel An chinois.";
      $("#fusionText").textContent = "La synthèse croisée est suspendue car la couche chinoise n’a pas pu être établie proprement.";
    }

    const warnings = [];
    if (cuspWarning(moon)) warnings.push("La Lune est très proche d’une frontière de signe.");
    if (cuspWarning(rising)) warnings.push("L’Ascendant est très proche d’une frontière de signe.");
    $("#precisionWarning").textContent = warnings.length
      ? `${warnings.join(" ")} Pour une version publiée, TADAMB devra confirmer ce résultat avec Swiss Ephemeris.`
      : "Calcul V2 effectué à partir du lieu, du fuseau historique, de l’heure locale et de formules astronomiques embarquées. Une validation Swiss Ephemeris reste prévue avant mise en production commerciale.";

    setStatus("Portrait calculé.", "success");
    results.classList.remove("hidden");
    results.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    console.error(error);
    setStatus(error.message || "Impossible de calculer le portrait.", "error");
  } finally {
    button.disabled = false;
  }
});
