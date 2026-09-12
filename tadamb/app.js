const SIGNS = [
  { name:"Bélier", element:"Feu", traits:"élan, franchise et goût de l’initiative" },
  { name:"Taureau", element:"Terre", traits:"stabilité, persévérance et rapport concret au monde" },
  { name:"Gémeaux", element:"Air", traits:"curiosité, mobilité mentale et besoin d’échange" },
  { name:"Cancer", element:"Eau", traits:"sensibilité, mémoire et instinct de protection" },
  { name:"Lion", element:"Feu", traits:"rayonnement, créativité et besoin d’expression" },
  { name:"Vierge", element:"Terre", traits:"analyse, précision et sens du service" },
  { name:"Balance", element:"Air", traits:"équilibre, relation et sens de la nuance" },
  { name:"Scorpion", element:"Eau", traits:"intensité, lucidité et capacité de transformation" },
  { name:"Sagittaire", element:"Feu", traits:"élan, quête de sens et besoin d’horizon" },
  { name:"Capricorne", element:"Terre", traits:"construction, endurance et sens des responsabilités" },
  { name:"Verseau", element:"Air", traits:"indépendance, originalité et vision collective" },
  { name:"Poissons", element:"Eau", traits:"intuition, imagination et réceptivité" }
];
const ANIMALS=["Rat","Buffle","Tigre","Lapin","Dragon","Serpent","Cheval","Chèvre","Singe","Coq","Chien","Cochon"];
const ANIMAL_TRAITS={Rat:"vif, adaptable et stratège",Buffle:"constant, fiable et patient",Tigre:"courageux, entier et indépendant",Lapin:"diplomate, sensible et attentif",Dragon:"ambitieux, magnétique et énergique",Serpent:"intuitif, profond et observateur",Cheval:"libre, mobile et enthousiaste",Chèvre:"créatif, empathique et délicat",Singe:"inventif, agile et joueur",Coq:"franc, précis et volontaire",Chien:"loyal, juste et protecteur",Cochon:"généreux, chaleureux et sincère"};
const STEMS=[{element:"Bois",polarity:"Yang"},{element:"Bois",polarity:"Yin"},{element:"Feu",polarity:"Yang"},{element:"Feu",polarity:"Yin"},{element:"Terre",polarity:"Yang"},{element:"Terre",polarity:"Yin"},{element:"Métal",polarity:"Yang"},{element:"Métal",polarity:"Yin"},{element:"Eau",polarity:"Yang"},{element:"Eau",polarity:"Yin"}];
const $=s=>document.querySelector(s), norm=n=>((n%360)+360)%360, rad=d=>d*Math.PI/180, deg=r=>r*180/Math.PI;

function signFromLongitude(l){const x=norm(l),i=Math.floor(x/30);return {...SIGNS[i],degree:x%30};}
function sunSignFromDate(m,d){const md=m*100+d;if(md>=321&&md<=419)return SIGNS[0];if(md>=420&&md<=520)return SIGNS[1];if(md>=521&&md<=620)return SIGNS[2];if(md>=621&&md<=722)return SIGNS[3];if(md>=723&&md<=822)return SIGNS[4];if(md>=823&&md<=922)return SIGNS[5];if(md>=923&&md<=1022)return SIGNS[6];if(md>=1023&&md<=1121)return SIGNS[7];if(md>=1122&&md<=1221)return SIGNS[8];if(md>=1222||md<=119)return SIGNS[9];if(md>=120&&md<=218)return SIGNS[10];return SIGNS[11];}
function julianDay(date){return date.getTime()/86400000+2440587.5;}
function sunLongitude(jd){const T=(jd-2451545)/36525,L0=norm(280.46646+36000.76983*T),M=norm(357.52911+35999.05029*T),C=(1.914602-0.004817*T)*Math.sin(rad(M))+0.019993*Math.sin(rad(2*M))+0.000289*Math.sin(rad(3*M));return norm(L0+C);}
function moonLongitude(jd){const d=jd-2451543.5,N=norm(125.1228-0.0529538083*d),i=5.1454,w=norm(318.0634+0.1643573223*d),e=.0549,M=norm(115.3654+13.0649929509*d);let E=M+deg(e*Math.sin(rad(M))*(1+e*Math.cos(rad(M))));const x=60.2666*(Math.cos(rad(E))-e),y=60.2666*Math.sqrt(1-e*e)*Math.sin(rad(E)),r=Math.hypot(x,y),v=deg(Math.atan2(y,x)),lon=norm(v+w),xe=r*(Math.cos(rad(N))*Math.cos(rad(lon))-Math.sin(rad(N))*Math.sin(rad(lon))*Math.cos(rad(i))),ye=r*(Math.sin(rad(N))*Math.cos(rad(lon))+Math.cos(rad(N))*Math.sin(rad(lon))*Math.cos(rad(i)));return norm(deg(Math.atan2(ye,xe)));}
function gst(jd){const T=(jd-2451545)/36525;return norm(280.46061837+360.98564736629*(jd-2451545)+0.000387933*T*T);}
function ascendantLongitude(jd,lat,lon){const T=(jd-2451545)/36525,e=rad(23.439291-0.0130042*T),theta=rad(norm(gst(jd)+lon)),phi=rad(lat),lambda=Math.atan2(-Math.cos(theta),Math.sin(theta)*Math.cos(e)+Math.tan(phi)*Math.sin(e));return norm(deg(lambda)+180);}
function partsInTimeZone(date,timeZone){const parts=new Intl.DateTimeFormat("en-CA",{timeZone,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hourCycle:"h23"}).formatToParts(date);return Object.fromEntries(parts.filter(p=>p.type!=="literal").map(p=>[p.type,Number(p.value)]));}
function zonedLocalToUtc(ds,ts,tz){const [y,m,d]=ds.split("-").map(Number),[h,min]=ts.split(":").map(Number),target=Date.UTC(y,m-1,d,h,min);let guess=target;for(let i=0;i<3;i++){const p=partsInTimeZone(new Date(guess),tz),represented=Date.UTC(p.year,p.month-1,p.day,p.hour,p.minute,p.second);guess+=target-represented;}return new Date(guess);}
async function geocodePlace(place){const r=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(place)}&count=1&language=fr&format=json`);if(!r.ok)throw new Error("Géocodage indisponible");const d=await r.json();if(!d.results?.length)throw new Error("Lieu introuvable. Essayez avec « ville, pays ».");return d.results[0];}
function getChineseRelatedYear(date){try{const parts=new Intl.DateTimeFormat("fr-FR-u-ca-chinese",{year:"numeric",timeZone:"UTC"}).formatToParts(date),r=parts.find(p=>p.type==="relatedYear");return r?Number(r.value):null;}catch{return null;}}
function chineseYearProfile(date){const y=getChineseRelatedYear(date);if(!y)return null;return {animal:ANIMALS[((y-4)%12+12)%12],...STEMS[((y-4)%10+10)%10]};}
function chineseHourAnimal(time){const h=Number(time.split(":")[0]);if(h===23||h===0)return "Rat";return ANIMALS[Math.floor((h+1)/2)%12];}
function formatDegree(s){return `${s.name} · ${s.degree.toFixed(1)}°`;}
function setStatus(t,state=""){const e=$("#status");e.textContent=t;e.dataset.state=state;}
function bridge(w,c){const map={"Feu|Feu":"Les deux traditions accentuent l’élan et l’expression.","Terre|Terre":"Les deux traditions renforcent le besoin de concret et de continuité.","Eau|Eau":"Sensibilité et intuition sont particulièrement présentes.","Terre|Bois":"La stabilité rencontre une dynamique de croissance.","Feu|Eau":"Impulsion et sensibilité doivent trouver leur équilibre.","Air|Eau":"Mental et émotion peuvent fonctionner sur deux rythmes."};return map[`${w}|${c}`]||`L’élément occidental ${w} rencontre l’élément chinois ${c}, dans une logique de complémentarité.`;}

const ELEMENT_LIFE={
  Feu:{work:"Vous avez besoin d’élan, d’autonomie et de défis visibles. Les environnements trop figés peuvent vous éteindre.",love:"Vous avez besoin d’intensité, de spontanéité et d’un lien vivant. L’ennui relationnel est rarement neutre pour vous.",communication:"Vous avez tendance à aller droit au but. La force est la clarté ; le risque est la précipitation.",money:"Vous pouvez décider vite quand quelque chose vous enthousiasme. Un cadre simple aide à éviter les choix impulsifs.",creativity:"Vous créez mieux quand vous pouvez initier, entraîner et donner une direction.",change:"Le changement vous stimule souvent davantage que l’immobilité, surtout si vous avez la main sur le départ."},
  Terre:{work:"Vous fonctionnez bien avec des responsabilités concrètes, de la continuité et un résultat mesurable.",love:"La confiance se construit par la constance, la présence et les actes plus que par les grands discours.",communication:"Vous préférez les échanges utiles, clairs et ancrés dans le réel.",money:"La sécurité matérielle et la prévisibilité comptent. Vous êtes généralement plus à l’aise avec une progression maîtrisée.",creativity:"Votre créativité devient forte lorsqu’elle peut déboucher sur quelque chose de tangible et durable.",change:"Vous changez plus facilement quand le nouveau cadre paraît solide et compréhensible."},
  Air:{work:"Vous avez besoin de mouvement intellectuel, d’échanges et d’une marge pour relier des idées ou des personnes.",love:"Le lien passe beaucoup par la conversation, la curiosité mutuelle et la liberté de rester soi-même.",communication:"C’est souvent un de vos terrains naturels : comprendre, reformuler, relier et nuancer.",money:"Vous pouvez raisonner efficacement mais vous lasser du suivi répétitif ; automatiser ou ritualiser aide.",creativity:"Les idées naissent du croisement, des rencontres, des mots et des connexions inattendues.",change:"Vous vous adaptez vite si vous comprenez le sens du changement et gardez une liberté mentale."},
  Eau:{work:"Vous donnez le meilleur dans un cadre humain, porteur de sens et suffisamment sécurisant pour utiliser votre intuition.",love:"Vous cherchez souvent profondeur, confiance et qualité émotionnelle plutôt qu’un lien superficiel.",communication:"Vous captez beaucoup de non-dit. Il peut être utile de verbaliser ce que vous avez déjà compris intuitivement.",money:"Le rapport à la sécurité peut être émotionnel autant que rationnel ; décider à froid aide à garder de la distance.",creativity:"Votre imagination fonctionne par intuition, ambiance, mémoire et sensibilité.",change:"Vous pouvez beaucoup vous adapter, mais avez besoin d’un temps intérieur pour intégrer les ruptures."}
};
function lifeProfiles(sun,moon,rising,chinese,hourAnimal){
  const e=ELEMENT_LIFE[sun.element], animal=chinese?ANIMAL_TRAITS[chinese.animal]:"un profil à préciser", intimate=hourAnimal?ANIMAL_TRAITS[hourAnimal]:null;
  return {
    work:`${e.work} La couche chinoise ajoute une tonalité ${animal}.`,
    love:`${e.love}${moon?` La Lune en ${moon.name} renforce aussi ${moon.traits}.`:" Sans heure, la lecture affective reste volontairement plus générale."}`,
    friends:`Vous avez tendance à rechercher des liens où ${sun.traits} peuvent s’exprimer sans devoir jouer un rôle.${rising?` Votre Ascendant ${rising.name} influence davantage la première impression et la façon d’entrer dans un groupe.`:""}`,
    communication:e.communication,
    money:e.money,
    creativity:`${e.creativity}${chinese?` Le ${chinese.animal} apporte en plus une manière ${animal} de lancer ou de porter les projets.`:""}`,
    family:`Votre besoin d’attachement se lit surtout dans la manière dont vous recherchez continuité, loyauté et espace personnel.${moon?` La Lune ${moon.name} précise cette zone avec ${moon.traits}.`:" Sans heure, TADAMB évite de surinterpréter cette dimension."}`,
    change:e.change,
    watch:`Votre principal point de vigilance est l’excès possible de vos qualités dominantes : ${sun.traits}. ${intimate?`Dans les réactions très instinctives, la tonalité ${intimate} peut aussi prendre le dessus.`:""}`
  };
}
function renderLife(p){$("#lifeWork").textContent=p.work;$("#lifeLove").textContent=p.love;$("#lifeFriends").textContent=p.friends;$("#lifeCommunication").textContent=p.communication;$("#lifeMoney").textContent=p.money;$("#lifeCreativity").textContent=p.creativity;$("#lifeFamily").textContent=p.family;$("#lifeChange").textContent=p.change;$("#lifeWatch").textContent=p.watch;}

$("#birth-form").addEventListener("submit",async e=>{
  e.preventDefault();
  const button=$("#submitButton");button.disabled=true;$("#results").classList.add("hidden");setStatus("Calcul du portrait…","loading");
  try{
    const firstName=$("#firstName").value.trim(),birthDate=$("#birthDate").value,birthTime=$("#birthTime").value,birthPlace=$("#birthPlace").value.trim();
    const [year,month,day]=birthDate.split("-").map(Number);
    const hasTime=Boolean(birthTime),hasPlace=Boolean(birthPlace);
    let place=null,utcDate=null,jd=null;
    if(hasTime&&hasPlace){place=await geocodePlace(birthPlace);utcDate=zonedLocalToUtc(birthDate,birthTime,place.timezone);jd=julianDay(utcDate);} 
    else if(hasTime){utcDate=new Date(Date.UTC(year,month-1,day,...birthTime.split(":").map(Number)));jd=julianDay(utcDate);} 
    else {utcDate=new Date(Date.UTC(year,month-1,day,12));jd=julianDay(utcDate);}

    const sun=hasTime?signFromLongitude(sunLongitude(jd)):sunSignFromDate(month,day);
    const moon=hasTime?signFromLongitude(moonLongitude(jd)):null;
    const rising=hasTime&&hasPlace?signFromLongitude(ascendantLongitude(jd,place.latitude,place.longitude)):null;
    const chinese=chineseYearProfile(new Date(Date.UTC(year,month-1,day,12)));
    const hourAnimal=hasTime?chineseHourAnimal(birthTime):null;

    $("#sunSign").textContent=sun.degree!==undefined?formatDegree(sun):sun.name;
    $("#moonSign").textContent=moon?formatDegree(moon):"Non calculable sans heure";
    $("#risingSign").textContent=rising?formatDegree(rising):"Non calculable sans heure + lieu";
    $("#yearAnimal").textContent=chinese?.animal||"Indisponible";
    $("#yearElement").textContent=chinese?`${chinese.element} · ${chinese.polarity}`:"—";
    $("#hourAnimal").textContent=hourAnimal||"Non calculable sans heure";

    const westernParts=[`Votre Soleil en ${sun.name} décrit une dominante de ${sun.traits}.`];
    if(moon) westernParts.push(`Votre Lune en ${moon.name} ajoute une tonalité émotionnelle faite de ${moon.traits}.`); else westernParts.push("Sans heure de naissance, TADAMB ne fixe pas la Lune avec certitude et préfère ne pas l’inventer.");
    if(rising) westernParts.push(`Votre Ascendant ${rising.name} colore votre manière d’entrer en relation avec le monde : ${rising.traits}.`); else westernParts.push("L’Ascendant nécessite à la fois l’heure et le lieu de naissance.");
    $("#westernText").textContent=westernParts.join(" ");

    if(chinese){let ct=`Année du ${chinese.animal}, ${chinese.element} ${chinese.polarity} : ${ANIMAL_TRAITS[chinese.animal]}.`;ct+=hourAnimal?` L’heure du ${hourAnimal} apporte une seconde nuance chinoise, plus intime et instinctive.`:" Sans heure, la couche chinoise liée à l’heure reste volontairement absente.";$("#chineseText").textContent=ct;} else $("#chineseText").textContent="La lecture chinoise annuelle n’a pas pu être déterminée proprement dans ce navigateur.";

    const who=firstName?`${firstName}, `:"";const layers=[`votre Soleil ${sun.name}`,chinese?`votre ${chinese.animal} ${chinese.element}`:null,moon?`votre Lune ${moon.name}`:null,rising?`votre Ascendant ${rising.name}`:null,hourAnimal?`votre heure chinoise ${hourAnimal}`:null].filter(Boolean);
    let fusion=`${who}TADAMB croise ici ${layers.join(", ")}. `;if(chinese) fusion+=bridge(sun.element,chinese.element)+" ";fusion+=hasTime&&hasPlace?"Le portrait utilise toutes les couches prévues dans cette V2.":"Le portrait est volontairement partiel : les couches impossibles à calculer avec les informations disponibles ne sont ni estimées ni inventées.";$("#fusionText").textContent=fusion;

    renderLife(lifeProfiles(sun,moon,rising,chinese,hourAnimal));

    if(hasTime&&hasPlace){$("#profileLevel").textContent="Portrait complet V2";$("#resolvedMeta").textContent=`${place.name}${place.country?`, ${place.country}`:""} · ${place.timezone}`;$("#precisionWarning").textContent="Date, heure et lieu disponibles : Soleil, Lune, Ascendant, double lecture chinoise et domaines de vie peuvent être croisés.";}
    else if(hasTime){$("#profileLevel").textContent="Portrait enrichi";$("#resolvedMeta").textContent="Heure connue · lieu non renseigné";$("#precisionWarning").textContent="La Lune et l’animal chinois de l’heure sont ajoutés. L’Ascendant reste indisponible sans lieu de naissance.";}
    else {$("#profileLevel").textContent="Portrait essentiel";$("#resolvedMeta").textContent="Date de naissance uniquement";$("#precisionWarning").textContent="TADAMB fournit le signe solaire, la lecture chinoise annuelle et des domaines de vie généraux. Les dimensions dépendant de l’heure restent absentes.";}

    setStatus("Portrait calculé.","success");$("#results").classList.remove("hidden");$("#results").scrollIntoView({behavior:"smooth",block:"start"});
  }catch(err){console.error(err);setStatus(err.message||"Impossible de calculer le portrait.","error");}
  finally{button.disabled=false;}
});
