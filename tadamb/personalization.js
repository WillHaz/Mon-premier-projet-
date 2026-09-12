(() => {
  const SIGNS={
    "Bélier":{element:"Feu",mode:"cardinal"},"Taureau":{element:"Terre",mode:"fixe"},"Gémeaux":{element:"Air",mode:"mutable"},"Cancer":{element:"Eau",mode:"cardinal"},"Lion":{element:"Feu",mode:"fixe"},"Vierge":{element:"Terre",mode:"mutable"},"Balance":{element:"Air",mode:"cardinal"},"Scorpion":{element:"Eau",mode:"fixe"},"Sagittaire":{element:"Feu",mode:"mutable"},"Capricorne":{element:"Terre",mode:"cardinal"},"Verseau":{element:"Air",mode:"fixe"},"Poissons":{element:"Eau",mode:"mutable"}
  };
  const ANIMALS=["Rat","Buffle","Tigre","Lapin","Dragon","Serpent","Cheval","Chèvre","Singe","Coq","Chien","Cochon"];
  const WESTERN_ELEMENTS={
    "Feu":{drive:"agir vite, initier et donner de l’élan",underStress:"accélérer encore quand la situation demande parfois du recul"},
    "Terre":{drive:"sécuriser, rendre concret et construire dans la durée",underStress:"se crisper sur les repères connus lorsque l’incertitude augmente"},
    "Air":{drive:"comprendre, relier et faire circuler les idées",underStress:"mentaliser ou multiplier les hypothèses au lieu de trancher"},
    "Eau":{drive:"ressentir, protéger et donner du sens humain",underStress:"absorber trop fortement le climat émotionnel ou les non-dits"}
  };
  const CROSS={
    "Feu|Bois":"La croissance du Bois alimente votre Feu : le profil gagne en initiative, créativité et capacité à entraîner. Le risque est de lancer plus vite que vous ne consolidez.",
    "Feu|Feu":"Double intensité : volonté, présence et réactivité sont amplifiées. Très puissant pour initier, plus exigeant pour la patience et la régulation.",
    "Feu|Terre":"L’impulsion occidentale rencontre une couche chinoise plus concrète. Vous pouvez transformer l’enthousiasme en réalisation, à condition de ne pas vivre la prudence comme un frein.",
    "Feu|Métal":"Énergie et exigence se combinent : vous pouvez décider vite avec une forte volonté de précision. Sous pression, le ton peut devenir plus tranchant que prévu.",
    "Feu|Eau":"C’est une combinaison contrastée : l’élan veut avancer, l’Eau veut lire l’environnement. Bien intégrée, elle donne intuition + courage ; mal intégrée, alternance entre impulsion et hésitation.",
    "Terre|Bois":"La Terre apporte continuité, le Bois pousse à évoluer. Cette combinaison aide à grandir sans tout renverser, mais peut créer un tiraillement entre sécurité et nouveauté.",
    "Terre|Feu":"Vous avez une base stable mais une couche plus vive qui accélère les décisions. Cela évite l’immobilisme, au prix parfois d’une tension entre prudence et impatience.",
    "Terre|Terre":"Le besoin de concret est très renforcé. Endurance et fiabilité sont fortes ; le principal défi est d’éviter que la stabilité devienne résistance au changement.",
    "Terre|Métal":"Profil de structure, de méthode et d’exigence. Très bon pour organiser, sécuriser et décider ; attention à la rigidité ou à l’autocritique.",
    "Terre|Eau":"La stabilité occidentale rencontre une couche chinoise plus souple et intuitive. Cela donne souvent un profil discret mais très adaptable, capable de protéger ses bases tout en lisant finement le contexte.",
    "Air|Bois":"Curiosité et croissance se renforcent. Idées, apprentissage, réseau et innovation peuvent devenir des moteurs très forts, avec un risque de dispersion.",
    "Air|Feu":"Mental rapide + énergie d’action : vous pouvez transformer une idée en mouvement très vite. Le défi est de ne pas confondre stimulation et direction.",
    "Air|Terre":"Vos idées cherchent naturellement une traduction concrète. La combinaison est utile pour expliquer, structurer et rendre applicable ce qui était abstrait.",
    "Air|Métal":"Forte capacité d’analyse, de formulation et de décision. Le risque est de devenir trop cérébral, critique ou catégorique sous tension.",
    "Air|Eau":"Le mental et l’intuition fonctionnent ensemble. Vous pouvez comprendre les gens autant par les mots que par l’ambiance ; vigilance face à la surinterprétation.",
    "Eau|Bois":"Sensibilité et croissance se combinent : vous évoluez beaucoup par les liens, l’expérience et l’intuition. Les environnements humains peuvent vous transformer profondément.",
    "Eau|Feu":"Émotion et intensité se rencontrent. Cela donne chaleur, intuition et engagement, mais aussi une grande réactivité si la sécurité affective est menacée.",
    "Eau|Terre":"La sensibilité cherche à se sécuriser dans le concret. C’est une combinaison protectrice, fiable et contenante, avec parfois une tendance à retenir trop longtemps ce qui est ressenti.",
    "Eau|Métal":"Intuition + exigence : vous pouvez lire finement les situations et poser des limites nettes. Sous stress, la sensibilité peut se cacher derrière une attitude très contrôlée.",
    "Eau|Eau":"L’intuition et la réceptivité sont fortement amplifiées. Très grande finesse émotionnelle, mais nécessité de protéger vos limites et de distinguer vos émotions de celles du contexte."
  };
  const MODE_MIX={
    "cardinal|cardinal":"Votre Soleil et votre Ascendant poussent tous deux à initier : vous donnez facilement une impression de décision et de mouvement.",
    "fixe|fixe":"Votre identité et votre présence sociale renforcent la continuité, la fidélité aux choix et parfois l’entêtement.",
    "mutable|mutable":"Votre identité et votre manière d’entrer dans le monde sont toutes deux adaptables : vous changez facilement de registre, avec un risque de dispersion.",
    "cardinal|fixe":"Vous pouvez initier vite puis vous accrocher fortement à ce qui a été décidé. C’est une combinaison puissante pour porter un projet.",
    "fixe|cardinal":"Vous paraissez plus entreprenant que votre fonctionnement profond, qui a besoin de stabilité avant de s’engager pleinement.",
    "cardinal|mutable":"Vous démarrez facilement et savez ensuite ajuster. Le défi est de maintenir le cap quand trop d’options apparaissent.",
    "mutable|cardinal":"Vous êtes plus adaptable intérieurement que votre présence extérieure ne le laisse penser ; les autres peuvent vous croire plus tranché que vous ne l’êtes vraiment.",
    "fixe|mutable":"Votre fond cherche la continuité, tandis que votre manière d’apparaître est plus souple. Vous pouvez donc donner une impression de flexibilité tout en gardant des convictions très stables.",
    "mutable|fixe":"Vous êtes plus mobile intérieurement que votre présence sociale ne le montre. Cela peut surprendre ceux qui vous pensent plus prévisible que vous ne l’êtes."
  };
  const ANIMAL_PAIRS={
    Rat:{Rat:"double vigilance et forte capacité d’anticipation",Buffle:"stratégie + endurance",Tigre:"prudence + courage",Lapin:"adaptabilité + diplomatie",Dragon:"opportunisme + ambition",Serpent:"stratégie + intuition",Cheval:"prudence + besoin de liberté",Chèvre:"réalisme + sensibilité",Singe:"agilité mentale renforcée",Coq:"adaptation + précision",Chien:"stratégie + loyauté",Cochon:"prudence + générosité"},
    Buffle:{Rat:"constance + stratégie",Buffle:"endurance très renforcée",Tigre:"stabilité + combativité",Lapin:"fiabilité + tact",Dragon:"solidité + ambition",Serpent:"patience + finesse",Cheval:"stabilité + mobilité",Chèvre:"persévérance + créativité",Singe:"méthode + inventivité",Coq:"structure + précision",Chien:"fiabilité + loyauté",Cochon:"solidité + chaleur"},
    Tigre:{Rat:"courage + stratégie",Buffle:"initiative + endurance",Tigre:"indépendance très renforcée",Lapin:"intensité + diplomatie",Dragon:"audace + ambition",Serpent:"courage + profondeur",Cheval:"fort besoin de liberté",Chèvre:"franchise + sensibilité",Singe:"audace + malice",Coq:"énergie + exigence",Chien:"courage + loyauté",Cochon:"intensité + générosité"},
    Lapin:{Rat:"diplomatie + stratégie",Buffle:"tact + fiabilité",Tigre:"douceur + force",Lapin:"sensibilité relationnelle renforcée",Dragon:"tact + ambition",Serpent:"finesse + profondeur",Cheval:"diplomatie + indépendance",Chèvre:"empathie très renforcée",Singe:"tact + inventivité",Coq:"diplomatie + précision",Chien:"sensibilité + loyauté",Cochon:"douceur + générosité"},
    Dragon:{Rat:"ambition + stratégie",Buffle:"vision + endurance",Tigre:"forte énergie de conquête",Lapin:"ambition + tact",Dragon:"présence et ambition très renforcées",Serpent:"puissance + intuition",Cheval:"ambition + liberté",Chèvre:"vision + créativité",Singe:"ambition + inventivité",Coq:"direction + précision",Chien:"ambition + sens du devoir",Cochon:"rayonnement + générosité"},
    Serpent:{Rat:"intuition + stratégie",Buffle:"profondeur + patience",Tigre:"finesse + courage",Lapin:"intuition + diplomatie",Dragon:"profondeur + ambition",Serpent:"observation et contrôle renforcés",Cheval:"analyse + liberté",Chèvre:"intuition + sensibilité",Singe:"finesse + agilité",Coq:"profondeur + précision",Chien:"intuition + loyauté",Cochon:"profondeur + chaleur"},
    Cheval:{Rat:"liberté + stratégie",Buffle:"mobilité + endurance",Tigre:"indépendance très renforcée",Lapin:"mouvement + tact",Dragon:"élan + ambition",Serpent:"liberté + finesse",Cheval:"besoin de mouvement très fort",Chèvre:"liberté + créativité",Singe:"mobilité + inventivité",Coq:"élan + structure",Chien:"liberté + loyauté",Cochon:"mouvement + générosité"},
    Chèvre:{Rat:"sensibilité + stratégie",Buffle:"créativité + constance",Tigre:"douceur + courage",Lapin:"empathie très forte",Dragon:"créativité + ambition",Serpent:"sensibilité + intuition",Cheval:"créativité + liberté",Chèvre:"réceptivité très renforcée",Singe:"créativité + agilité",Coq:"sensibilité + précision",Chien:"empathie + loyauté",Cochon:"chaleur affective renforcée"},
    Singe:{Rat:"agilité mentale très forte",Buffle:"inventivité + méthode",Tigre:"malice + courage",Lapin:"agilité + diplomatie",Dragon:"inventivité + ambition",Serpent:"malice + finesse",Cheval:"adaptabilité + liberté",Chèvre:"inventivité + sensibilité",Singe:"ingéniosité très renforcée",Coq:"agilité + précision",Chien:"inventivité + loyauté",Cochon:"agilité + chaleur"},
    Coq:{Rat:"précision + stratégie",Buffle:"structure très renforcée",Tigre:"exigence + courage",Lapin:"précision + tact",Dragon:"exigence + ambition",Serpent:"précision + profondeur",Cheval:"structure + liberté",Chèvre:"exigence + sensibilité",Singe:"précision + inventivité",Coq:"exigence très renforcée",Chien:"structure + loyauté",Cochon:"précision + générosité"},
    Chien:{Rat:"loyauté + stratégie",Buffle:"fiabilité très forte",Tigre:"loyauté + courage",Lapin:"justice + tact",Dragon:"devoir + ambition",Serpent:"loyauté + profondeur",Cheval:"fidélité + liberté",Chèvre:"loyauté + sensibilité",Singe:"justice + inventivité",Coq:"devoir + précision",Chien:"loyauté très renforcée",Cochon:"fidélité + chaleur"},
    Cochon:{Rat:"générosité + stratégie",Buffle:"chaleur + fiabilité",Tigre:"générosité + courage",Lapin:"douceur relationnelle très forte",Dragon:"chaleur + ambition",Serpent:"générosité + profondeur",Cheval:"chaleur + liberté",Chèvre:"générosité + sensibilité",Singe:"chaleur + inventivité",Coq:"générosité + précision",Chien:"chaleur + loyauté",Cochon:"générosité très renforcée"}
  };
  function text(sel){return document.querySelector(sel)?.textContent?.trim()||''}
  function sign(raw){return Object.keys(SIGNS).find(x=>raw.includes(x))||null}
  function animal(raw){return ANIMALS.find(x=>raw.includes(x))||null}
  function element(raw){return ['Bois','Feu','Terre','Métal','Eau'].find(x=>raw.includes(x))||null}
  function profile(){return {sun:sign(text('#sunSign')),moon:sign(text('#moonSign')),rising:sign(text('#risingSign')),animal:animal(text('#yearAnimal')),hourAnimal:animal(text('#hourAnimal')),chEl:element(text('#yearElement'))}}
  function build(p){
    if(!p.sun)return null;
    const sunEl=SIGNS[p.sun].element;
    const cross=p.chEl?CROSS[`${sunEl}|${p.chEl}`]:null;
    const moon= p.moon ? (SIGNS[p.moon].element===sunEl ? `Votre Soleil ${p.sun} et votre Lune ${p.moon} parlent le même langage élémentaire (${sunEl}). Ce que vous voulez montrer et ce que vous ressentez coopèrent donc assez naturellement, mais leurs excès peuvent aussi se renforcer.` : `Votre Soleil ${p.sun} (${sunEl}) et votre Lune ${p.moon} (${SIGNS[p.moon].element}) ne fonctionnent pas sur le même registre. Cela crée plus de richesse intérieure, mais parfois un écart entre votre décision rationnelle et votre réaction émotionnelle.`) : null;
    const asc=p.rising?MODE_MIX[`${SIGNS[p.sun].mode}|${SIGNS[p.rising].mode}`]:null;
    const animals=p.animal&&p.hourAnimal?`La combinaison chinoise ${p.animal} / ${p.hourAnimal} donne une tonalité de ${ANIMAL_PAIRS[p.animal]?.[p.hourAnimal]||'double influence complémentaire'}. L’animal annuel décrit la stratégie sociale de fond ; celui de l’heure ressort davantage dans les réactions spontanées ou intimes.`:null;
    const stress=`Sous pression, votre élément occidental ${sunEl} tend à ${WESTERN_ELEMENTS[sunEl].underStress}.${p.chEl?` La couche chinoise ${p.chEl} peut alors modifier cette réaction, ce qui explique que vous ne réagissiez pas toujours comme un ${p.sun} “typique”.`:''}`;
    return {cross,moon,asc,animals,stress};
  }
  function render(){
    const r=build(profile()); if(!r)return;
    let box=document.querySelector('#combinationAnalysis');
    if(!box){
      const fusion=document.querySelector('.fusion'); if(!fusion)return;
      box=document.createElement('div'); box.id='combinationAnalysis'; box.className='combination-analysis'; fusion.appendChild(box);
    }
    box.innerHTML=`<h3>Ce qui rend cette combinaison vraiment particulière</h3>${[r.cross,r.moon,r.asc,r.animals,r.stress].filter(Boolean).map(x=>`<p>${x}</p>`).join('')}`;
    document.querySelectorAll('.report-pane').forEach(pane=>{
      if(pane.querySelector('.combo-detail'))return;
      const tab=pane.dataset.pane;
      const map={synth:r.cross,strengths:r.asc,love:r.moon,work:r.cross,stress:r.stress,relations:r.animals,evolution:r.moon,summary:r.cross};
      if(map[tab])pane.insertAdjacentHTML('beforeend',`<div class="combo-detail"><strong>Interaction spécifique de vos couches</strong><p>${map[tab]}</p></div>`);
    });
  }
  function style(){if(document.querySelector('#combination-style'))return;const s=document.createElement('style');s.id='combination-style';s.textContent=`.combination-analysis{margin-top:26px;padding:22px;border-radius:18px;background:rgba(5,7,16,.38);border:1px solid rgba(231,190,120,.18)}.combination-analysis h3{margin:0 0 12px;color:#f0c987;font-size:1.05rem}.combination-analysis p{margin:0 0 11px;color:#ddd7e6;line-height:1.72}.combo-detail{margin-top:24px;padding:17px 18px;border-radius:16px;background:rgba(167,139,250,.06);border:1px solid rgba(167,139,250,.15)}.combo-detail strong{display:block;color:#cdb4ff;margin-bottom:8px}.combo-detail p{margin:0;line-height:1.72;color:#ddd7e6}`;document.head.appendChild(s)}
  document.addEventListener('DOMContentLoaded',()=>{style();setTimeout(render,400);const t=document.querySelector('#results');if(t)new MutationObserver(()=>render()).observe(t,{subtree:true,childList:true,characterData:true});document.querySelector('#birth-form')?.addEventListener('submit',()=>setTimeout(render,500));});
})();