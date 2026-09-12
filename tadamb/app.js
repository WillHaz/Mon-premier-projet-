const western = {
  "Bélier": { dates: [[3,21],[4,19]], traits: "élan, franchise et goût de l’initiative" },
  "Taureau": { dates: [[4,20],[5,20]], traits: "stabilité, persévérance et rapport concret au monde" },
  "Gémeaux": { dates: [[5,21],[6,20]], traits: "curiosité, mobilité mentale et besoin d’échange" },
  "Cancer": { dates: [[6,21],[7,22]], traits: "sensibilité, mémoire et instinct de protection" },
  "Lion": { dates: [[7,23],[8,22]], traits: "rayonnement, créativité et besoin d’expression" },
  "Vierge": { dates: [[8,23],[9,22]], traits: "analyse, précision et sens du service" },
  "Balance": { dates: [[9,23],[10,22]], traits: "équilibre, relation et sens de la nuance" },
  "Scorpion": { dates: [[10,23],[11,21]], traits: "intensité, lucidité et capacité de transformation" },
  "Sagittaire": { dates: [[11,22],[12,21]], traits: "élan, quête de sens et besoin d’horizon" },
  "Capricorne": { dates: [[12,22],[1,19]], traits: "construction, endurance et sens des responsabilités" },
  "Verseau": { dates: [[1,20],[2,18]], traits: "indépendance, originalité et vision collective" },
  "Poissons": { dates: [[2,19],[3,20]], traits: "intuition, imagination et réceptivité" }
};

const animals = ["Rat","Buffle","Tigre","Lapin","Dragon","Serpent","Cheval","Chèvre","Singe","Coq","Chien","Cochon"];
const animalTraits = {
  Rat: "vif, adaptable et stratège",
  Buffle: "constant, fiable et patient",
  Tigre: "courageux, entier et indépendant",
  Lapin: "diplomate, sensible et attentif",
  Dragon: "ambitieux, magnétique et énergique",
  Serpent: "intuitif, profond et observateur",
  Cheval: "libre, mobile et enthousiaste",
  Chèvre: "créative, empathique et délicate",
  Singe: "inventif, agile et joueur",
  Coq: "franc, précis et volontaire",
  Chien: "loyal, juste et protecteur",
  Cochon: "généreux, chaleureux et sincère"
};

const stems = [
  {element:"Bois", polarity:"Yang"}, {element:"Bois", polarity:"Yin"},
  {element:"Feu", polarity:"Yang"}, {element:"Feu", polarity:"Yin"},
  {element:"Terre", polarity:"Yang"}, {element:"Terre", polarity:"Yin"},
  {element:"Métal", polarity:"Yang"}, {element:"Métal", polarity:"Yin"},
  {element:"Eau", polarity:"Yang"}, {element:"Eau", polarity:"Yin"}
];

function sunSign(month, day) {
  const md = month * 100 + day;
  if (md >= 321 && md <= 419) return "Bélier";
  if (md >= 420 && md <= 520) return "Taureau";
  if (md >= 521 && md <= 620) return "Gémeaux";
  if (md >= 621 && md <= 722) return "Cancer";
  if (md >= 723 && md <= 822) return "Lion";
  if (md >= 823 && md <= 922) return "Vierge";
  if (md >= 923 && md <= 1022) return "Balance";
  if (md >= 1023 && md <= 1121) return "Scorpion";
  if (md >= 1122 && md <= 1221) return "Sagittaire";
  if (md >= 1222 || md <= 119) return "Capricorne";
  if (md >= 120 && md <= 218) return "Verseau";
  return "Poissons";
}

function getChineseRelatedYear(date) {
  try {
    const parts = new Intl.DateTimeFormat("fr-FR-u-ca-chinese", { year: "numeric", timeZone: "UTC" }).formatToParts(date);
    const related = parts.find(p => p.type === "relatedYear");
    if (related) return Number(related.value);
  } catch (_) {}
  return null;
}

function chineseYearProfile(date) {
  const relatedYear = getChineseRelatedYear(date);
  if (!relatedYear) return null;
  const animalIndex = ((relatedYear - 4) % 12 + 12) % 12;
  const stemIndex = ((relatedYear - 4) % 10 + 10) % 10;
  return { year: relatedYear, animal: animals[animalIndex], ...stems[stemIndex] };
}

function chineseHourAnimal(time) {
  const hour = Number(time.split(":")[0]);
  if (hour === 23 || hour === 0) return "Rat";
  return animals[Math.floor((hour + 1) / 2) % 12];
}

function buildFusion(name, sun, chinese, hourAnimal) {
  const who = name ? `${name}, ` : "";
  const sunTrait = western[sun].traits;
  const yearTrait = animalTraits[chinese.animal];
  const hourTrait = animalTraits[hourAnimal];
  return `${who}la lecture croisée met en tension trois niveaux : votre Soleil en ${sun} parle de ${sunTrait}; votre ${chinese.animal} ${chinese.element} ${chinese.polarity} apporte un tempérament ${yearTrait}; et l’animal de votre heure, ${hourAnimal}, colore davantage votre manière instinctive de réagir, souvent de façon plus ${hourTrait}. La future version TADAMB ajoutera la Lune et l’Ascendant pour distinguer plus finement l’identité consciente, le monde émotionnel et la manière dont vous entrez en relation avec l’extérieur.`;
}

const form = document.querySelector("#birth-form");
const results = document.querySelector("#results");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const firstName = document.querySelector("#firstName").value.trim();
  const birthDate = document.querySelector("#birthDate").value;
  const birthTime = document.querySelector("#birthTime").value;
  const [year, month, day] = birthDate.split("-").map(Number);
  const dateUTC = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));

  const sun = sunSign(month, day);
  const chinese = chineseYearProfile(dateUTC);
  const hourAnimal = chineseHourAnimal(birthTime);

  document.querySelector("#sunSign").textContent = sun;
  document.querySelector("#westernText").textContent = `Votre Soleil en ${sun} décrit une dominante de ${western[sun].traits}. Cette première couche sera enrichie par la Lune, l’Ascendant, les maisons et les aspects planétaires.`;
  document.querySelector("#hourAnimal").textContent = hourAnimal;

  if (chinese) {
    document.querySelector("#yearAnimal").textContent = chinese.animal;
    document.querySelector("#yearElement").textContent = `${chinese.element} · ${chinese.polarity}`;
    document.querySelector("#chineseText").textContent = `Votre année chinoise est placée sous le signe du ${chinese.animal}, associé ici à l’élément ${chinese.element} et à une polarité ${chinese.polarity}. Votre heure de naissance correspond au ${hourAnimal} : c’est la seconde lecture chinoise utilisée par TADAMB pour nuancer le comportement instinctif et intime.`;
    document.querySelector("#fusionText").textContent = buildFusion(firstName, sun, chinese, hourAnimal);
  } else {
    document.querySelector("#yearAnimal").textContent = "Indisponible";
    document.querySelector("#yearElement").textContent = "Indisponible";
    document.querySelector("#chineseText").textContent = "Le calendrier chinois n’est pas disponible dans ce navigateur. TADAMB n’utilise pas une approximation basée sur l’année civile, afin de ne pas donner un résultat faux autour du Nouvel An chinois.";
    document.querySelector("#fusionText").textContent = "La synthèse complète sera disponible dès que le calcul chinois pourra être déterminé de façon fiable.";
  }

  results.classList.remove("hidden");
  results.scrollIntoView({ behavior: "smooth", block: "start" });
});
