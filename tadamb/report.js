(() => {
  const SIGN_DATA = {
    "Bélier": { core:"avance par impulsion, décision et conquête", gift:"capacité à initier, trancher et remettre du mouvement", risk:"impatience, réaction trop rapide ou difficulté à supporter les temps morts", need:"liberté d’action et sentiment d’avancer" },
    "Taureau": { core:"construit lentement mais solidement, avec un fort besoin de cohérence", gift:"constance, endurance, fiabilité et sens du réel", risk:"rigidité, résistance au changement ou attachement excessif à ce qui est connu", need:"sécurité, stabilité et confiance tangible" },
    "Gémeaux": { core:"fonctionne par curiosité, mouvement mental et circulation des idées", gift:"adaptabilité, vivacité, humour et capacité à relier les personnes", risk:"dispersion, volatilité ou difficulté à approfondir quand l’intérêt baisse", need:"stimulation, dialogue et liberté mentale" },
    "Cancer": { core:"avance par attachement, intuition et besoin de protéger ce qui compte", gift:"empathie, mémoire affective, loyauté et finesse émotionnelle", risk:"repli, susceptibilité ou difficulté à lâcher ce qui a blessé", need:"sécurité émotionnelle et sentiment d’appartenance" },
    "Lion": { core:"cherche à exprimer pleinement qui il est et à donner de la chaleur autour de lui", gift:"rayonnement, générosité, créativité et capacité à entraîner", risk:"orgueil blessé, besoin de reconnaissance ou dramatisation quand il se sent ignoré", need:"reconnaissance sincère et possibilité d’exprimer sa singularité" },
    "Vierge": { core:"analyse, améliore et cherche à rendre les choses plus justes et plus efficaces", gift:"précision, sens pratique, fiabilité et capacité à voir ce qui doit être corrigé", risk:"perfectionnisme, autocritique ou tendance à trop contrôler les détails", need:"utilité, clarté et cadre cohérent" },
    "Balance": { core:"cherche l’équilibre, la qualité du lien et une forme de justesse relationnelle", gift:"diplomatie, écoute, élégance relationnelle et sens de la nuance", risk:"hésitation, évitement du conflit ou tendance à trop tenir compte du regard d’autrui", need:"harmonie, respect mutuel et échanges équilibrés" },
    "Scorpion": { core:"vit les choses en profondeur et cherche la vérité derrière les apparences", gift:"lucidité, intensité, endurance psychologique et capacité de transformation", risk:"méfiance, contrôle ou difficulté à pardonner quand la confiance a été brisée", need:"authenticité, profondeur et loyauté" },
    "Sagittaire": { core:"avance par expansion, sens, découverte et besoin d’horizon", gift:"enthousiasme, optimisme, vision et capacité à remettre les événements en perspective", risk:"excès, impatience face aux contraintes ou tendance à fuir l’enfermement", need:"liberté, sens et possibilité d’explorer" },
    "Capricorne": { core:"progresse par maîtrise, responsabilité et construction à long terme", gift:"discipline, solidité, fiabilité et capacité à tenir dans la durée", risk:"dureté envers soi, retenue émotionnelle ou surcharge de responsabilités", need:"respect, maîtrise et progression concrète" },
    "Verseau": { core:"fonctionne par indépendance, originalité et vision globale", gift:"inventivité, recul, pensée libre et capacité à sortir des cadres", risk:"distance émotionnelle, refus des contraintes ou rigidité paradoxale dans ses idées", need:"autonomie, cohérence intellectuelle et liberté d’être différent" },
    "Poissons": { core:"capte l’ambiance, les émotions et le sens implicite avant même qu’ils soient formulés", gift:"intuition, imagination, empathie et capacité à relier les mondes intérieurs", risk:"perméabilité émotionnelle, fuite ou difficulté à poser des limites nettes", need:"sens, douceur et espace intérieur" }
  };

  const ANIMAL_DATA = {
    Rat:{gift:"intelligence d’adaptation, sens de l’opportunité et capacité à comprendre vite les rapports de force",risk:"hypervigilance, calcul excessif ou tendance à trop anticiper",relation:"a besoin de confiance, d’intelligence relationnelle et d’un partenaire qui respecte son besoin de garder une marge de manœuvre",work:"excellent pour repérer les opportunités, organiser les ressources et naviguer dans les environnements mouvants"},
    Buffle:{gift:"patience, fiabilité et puissance de travail",risk:"entêtement ou difficulté à changer une stratégie déjà engagée",relation:"recherche la loyauté, la stabilité et les actes concrets",work:"avance très bien dans les projets exigeant constance, méthode et résistance"},
    Tigre:{gift:"courage, indépendance et forte énergie d’engagement",risk:"impulsivité, opposition ou besoin de défi permanent",relation:"a besoin d’intensité et d’un lien qui ne l’enferme pas",work:"excellent dans l’initiative, le changement et les situations qui demandent de prendre position"},
    Lapin:{gift:"diplomatie, finesse et sens du climat relationnel",risk:"évitement du conflit ou hypersensibilité aux tensions",relation:"a besoin de douceur, de sécurité et de respect des nuances",work:"très bon dans la négociation, la médiation et les environnements où le tact compte"},
    Dragon:{gift:"ambition, énergie et capacité à donner une direction",risk:"excès de confiance, impatience ou difficulté à accepter la banalité",relation:"a besoin d’admiration réciproque, de mouvement et d’un partenaire solide",work:"fort potentiel de leadership, de création et de mobilisation"},
    Serpent:{gift:"intuition stratégique, profondeur et sens de l’observation",risk:"secret, méfiance ou contrôle excessif",relation:"cherche profondeur, discrétion et fidélité",work:"excellent pour analyser, anticiper et décider avec peu d’informations"},
    Cheval:{gift:"élan, sociabilité et besoin de liberté",risk:"dispersion, impatience ou rejet de la routine",relation:"a besoin d’espace, de mouvement et d’une relation vivante",work:"très bon dans les environnements mobiles, relationnels et autonomes"},
    Chèvre:{gift:"créativité, sensibilité et intelligence affective",risk:"doute, dépendance au climat émotionnel ou difficulté à trancher",relation:"a besoin de bienveillance, d’encouragement et de sécurité affective",work:"forte créativité dans les environnements humains, esthétiques ou porteurs de sens"},
    Singe:{gift:"agilité, humour et intelligence inventive",risk:"dispersion, impatience ou tendance à contourner plutôt qu’affronter",relation:"a besoin de complicité mentale et de légèreté",work:"excellent pour résoudre vite les problèmes et inventer des chemins non conventionnels"},
    Coq:{gift:"franchise, précision et capacité à structurer",risk:"critique, rigidité ou besoin d’avoir raison",relation:"recherche respect, clarté et engagement réel",work:"excellent dans les environnements où qualité, méthode et exigence comptent"},
    Chien:{gift:"loyauté, sens de la justice et protection des autres",risk:"inquiétude, méfiance ou difficulté à relativiser les injustices",relation:"a besoin de fidélité, de sécurité morale et de réciprocité",work:"très solide dans les missions où confiance, service et responsabilité sont essentiels"},
    Cochon:{gift:"générosité, chaleur et sincérité",risk:"naïveté, excès de confiance ou difficulté à dire non",relation:"cherche authenticité, douceur et plaisir partagé",work:"excellent dans les environnements humains où coopération et confiance priment"}
  };

  const ELEMENT_CHINESE = {
    Bois:"ajoute une dynamique de croissance, d’ouverture et de développement. Il pousse à créer, apprendre et élargir ce qui existe déjà.",
    Feu:"renforce l’intensité, l’expression et le besoin de mouvement. Il rend le profil plus visible, volontaire et réactif.",
    Terre:"stabilise, concrétise et rend plus pragmatique. Il accentue le besoin de sécurité, de continuité et de résultats tangibles.",
    Métal:"apporte précision, exigence, structure et capacité de décision. Il peut aussi durcir les positions quand la pression monte.",
    Eau:"apporte adaptabilité, intuition, finesse relationnelle et capacité à contourner les obstacles plutôt qu’à les affronter frontalement."
  };

  function text(id){ return document.querySelector(id)?.textContent?.trim() || ""; }
  function firstMatch(raw, values){ return values.find(v => raw.includes(v)) || null; }
  function currentProfile(){
    const signs=Object.keys(SIGN_DATA), animals=Object.keys(ANIMAL_DATA);
    const sun=firstMatch(text('#sunSign'),signs);
    const moon=firstMatch(text('#moonSign'),signs);
    const rising=firstMatch(text('#risingSign'),signs);
    const animal=firstMatch(text('#yearAnimal'),animals);
    const hourAnimal=firstMatch(text('#hourAnimal'),animals);
    const rawElement=text('#yearElement');
    const element=["Bois","Feu","Terre","Métal","Eau"].find(e=>rawElement.includes(e))||null;
    const polarity=["Yin","Yang"].find(p=>rawElement.includes(p))||null;
    const firstName=document.querySelector('#firstName')?.value?.trim()||"";
    return {sun,moon,rising,animal,hourAnimal,element,polarity,firstName};
  }

  function pTag(txt){ return `<p>${txt}</p>`; }
  function h3(txt){ return `<h3>${txt}</h3>`; }
  function note(txt){ return `<div class="report-note">${txt}</div>`; }

  function buildReport(p){
    if(!p.sun) return null;
    const s=SIGN_DATA[p.sun];
    const a=p.animal?ANIMAL_DATA[p.animal]:null;
    const m=p.moon?SIGN_DATA[p.moon]:null;
    const r=p.rising?SIGN_DATA[p.rising]:null;
    const ha=p.hourAnimal?ANIMAL_DATA[p.hourAnimal]:null;
    const who=p.firstName?`${p.firstName}, `:"";
    const china=p.animal?`${p.animal}${p.element?` ${p.element}`:""}${p.polarity?` ${p.polarity}`:""}`:"profil chinois annuel non disponible";

    const synth = [
      h3('Votre architecture générale'),
      pTag(`${who}votre base occidentale en ${p.sun} indique un fonctionnement qui ${s.core}. Votre force spontanée repose sur ${s.gift}. ${a?`La couche chinoise ${china} ajoute ${a.gift}.`:''}`),
      pTag(`${m?`Votre Lune en ${p.moon} montre qu’en profondeur, votre monde émotionnel cherche surtout ${m.need}. Cela peut parfois être très différent de ce que votre Soleil donne à voir.`:`Sans heure fiable, TADAMB ne force pas une interprétation lunaire : cette partie reste volontairement ouverte.`}`),
      pTag(`${r?`Votre Ascendant ${p.rising} agit comme une interface avec le monde : vous pouvez être perçu d’abord à travers ${r.core}, même si votre fonctionnement profond est plus nuancé.`:`Sans heure et lieu fiables, l’image extérieure liée à l’Ascendant n’est pas utilisée.`}`),
      h3('La fusion TADAMB'),
      pTag(`${a?`Le point intéressant n’est pas d’additionner “${p.sun} + ${p.animal}”, mais de voir comment ces deux logiques se corrigent. Votre ${p.sun} vous pousse vers ${s.need}, tandis que le ${p.animal} apporte ${a.gift}. Ensemble, cela crée un profil qui peut être à la fois très identifiable dans ses valeurs et beaucoup plus adaptable dans sa façon d’agir.`:`La fusion reste centrée sur le profil occidental tant que la couche chinoise annuelle n’est pas disponible.`}`),
      p.element?pTag(`L’élément chinois ${p.element} ${p.polarity||''} ${ELEMENT_CHINESE[p.element]}`):'',
      note('Cette lecture décrit des tendances symboliques. Elle ne remplace ni l’observation réelle d’une personne ni son histoire personnelle.')
    ].join('');

    const strengths = [
      h3('Forces dominantes'),
      pTag(`Votre première ressource est ${s.gift}. Dans un contexte favorable, cette qualité vous donne une manière très personnelle de prendre votre place, de tenir vos engagements et de vous orienter.`),
      a?pTag(`Le ${p.animal} ajoute ${a.gift}. C’est souvent là que le profil devient moins prévisible : vous pouvez exprimer votre signe occidental d’une manière plus stratégique, plus souple ou plus intense selon la coloration chinoise.`):'',
      m?pTag(`La Lune ${p.moon} ajoute une ressource plus intime : ${m.gift}. Elle peut être moins visible socialement, mais devient décisive dans les moments importants.`):'',
      h3('Fragilités et angles morts'),
      pTag(`L’excès de vos qualités peut devenir votre premier piège : ${s.risk}. Ce n’est pas l’opposé de votre force, c’en est souvent la version poussée trop loin.`),
      a?pTag(`Côté chinois, le point de vigilance est ${a.risk}. Quand les deux systèmes se tendent en même temps, vous pouvez avoir l’impression de défendre une nécessité alors qu’il s’agit parfois surtout de protéger votre sécurité ou votre contrôle.`):'',
      ha?pTag(`Votre animal de l’heure, ${p.hourAnimal}, peut ressortir dans les réactions très instinctives. Sous pression, il ajoute une tonalité de ${ha.risk}.`):'',
      h3('Le point d’équilibre'),
      pTag(`Votre meilleur équilibre apparaît quand vous conservez ${s.need} sans laisser ${s.risk} prendre toute la place. L’enjeu n’est donc pas de devenir “moins ${p.sun}”, mais d’utiliser cette énergie avec davantage de souplesse.`)
    ].join('');

    const love = [
      h3('Votre manière d’aimer'),
      pTag(`Dans le lien affectif, vous avez besoin de ${s.need}. Vous vous engagez mieux lorsque le lien respecte votre rythme naturel et ne vous oblige pas à jouer un rôle.`),
      m?pTag(`La Lune ${p.moon} précise fortement cette zone : émotionnellement, vous recherchez ${m.need}. C’est souvent cette couche qui explique pourquoi une relation “logiquement compatible” peut malgré tout ne pas vous nourrir.`):pTag(`Sans heure de naissance, la lecture affective reste volontairement centrée sur le Soleil et la couche chinoise.`),
      a?pTag(`Le ${p.animal} cherche quant à lui ${a.relation}. Cela apporte une seconde exigence relationnelle : le couple doit fonctionner dans la réalité quotidienne, pas seulement dans l’attraction.`):'',
      h3('Ce qui sécurise le lien'),
      pTag(`Vous fonctionnez mieux avec une personne qui comprend votre besoin de ${s.need}, tout en sachant vous confronter avec respect lorsque ${s.risk} apparaît. La meilleure compatibilité n’est donc pas forcément la personne qui vous ressemble le plus, mais celle avec laquelle vos besoins essentiels ne sont pas vécus comme des défauts.`),
      h3('Ce qui abîme la relation'),
      pTag(`${a?`Les risques se situent surtout entre ${s.risk} et ${a.risk}. `:''}Quand vous ne vous sentez plus en sécurité, vous pouvez renforcer vos mécanismes naturels au lieu de les assouplir. C’est souvent là que naissent les malentendus, les silences ou les réactions trop fortes.`)
    ].join('');

    const work = [
      h3('Votre fonctionnement professionnel'),
      pTag(`Au travail, votre ${p.sun} donne une base de ${s.gift}. Vous êtes généralement plus performant lorsque vous disposez de ${s.need} et que votre rôle a une logique claire.`),
      a?pTag(`Le ${p.animal} apporte un deuxième moteur : ${a.work}. Cette combinaison peut créer une vraie valeur lorsqu’il faut à la fois tenir une ligne et s’adapter à la réalité.`):'',
      r?pTag(`L’Ascendant ${p.rising} influence votre style visible : les autres peuvent d’abord percevoir ${r.gift}, avant de découvrir votre fonctionnement plus profond.`):'',
      h3('Management et environnement idéal'),
      pTag(`Vous donnez davantage quand le cadre vous fait confiance, vous laisse une zone d’autonomie et reconnaît la valeur concrète de ce que vous apportez. Un management trop flou peut activer ${s.risk}; un management trop contrôlant peut vous faire décrocher même si la mission vous intéresse.`),
      h3('Risque professionnel'),
      pTag(`Votre risque n’est pas seulement l’échec : c’est aussi de rester trop longtemps dans un fonctionnement devenu mauvais parce qu’une partie de vous continue à vouloir le maîtriser. Votre levier principal consiste à distinguer persévérance et enfermement.`)
    ].join('');

    const stress = [
      h3('Scénario aligné'),
      pTag(`Quand vous êtes aligné, ${s.gift} s’exprime sans excès. ${a?`Le ${p.animal} utilise ${a.gift} comme un outil et non comme une défense.`:''} Vous savez alors avancer tout en gardant assez de recul pour ajuster votre trajectoire.`),
      h3('Scénario sous stress'),
      pTag(`Sous stress, votre qualité dominante peut se rigidifier : ${s.risk}. ${a?`En parallèle, le ${p.animal} peut accentuer ${a.risk}.`:''} Vous risquez alors de répéter davantage ce qui d’habitude fonctionne, alors même que la situation réclame autre chose.`),
      h3('Scénario “shadow”'),
      pTag(`Dans une phase plus sombre ou très défensive, vous pouvez finir par protéger votre mécanisme de sécurité plutôt que votre objectif réel. Ce n’est plus “je fais ce qui est juste pour moi”, mais “je dois absolument conserver le contrôle de la situation”. C’est généralement le moment où vos relations et vos décisions deviennent plus coûteuses.`),
      h3('Signal de retour à l’équilibre'),
      pTag(`Le retour commence lorsque vous pouvez de nouveau identifier ce dont vous avez réellement besoin — ${s.need} — sans confondre ce besoin avec la stratégie utilisée pour l’obtenir.`)
    ].join('');

    const relations = [
      h3('Ce que vous donnez aux autres'),
      pTag(`Vous apportez naturellement ${s.gift}. ${a?`La couche ${p.animal} ajoute ${a.gift}.`:''} Cela peut faire de vous quelqu’un de très présent, fiable ou stimulant selon le contexte.`),
      h3('Ce que vous attendez sans toujours le dire'),
      pTag(`Vous attendez souvent que l’autre respecte ${s.need}. ${m?`Votre Lune ${p.moon} ajoute un besoin émotionnel de ${m.need}.`:''} Quand ces besoins ne sont pas compris, vous pouvez vous sentir mal interprété même si la relation paraît correcte extérieurement.`),
      h3('Les frictions typiques'),
      pTag(`Les frictions apparaissent surtout lorsque votre interlocuteur touche votre zone de vulnérabilité : ${s.risk}. ${a?`Avec le ${p.animal}, ${a.risk} peut aussi s’activer.`:''} La meilleure manière de résoudre ces tensions est de revenir au besoin concret derrière la réaction.`),
      h3('Compatibilité réelle'),
      pTag(`La compatibilité la plus solide vient moins d’un signe “idéal” que d’une capacité mutuelle à accueillir les différences de rythme, de sécurité et de communication. Les signes donnent une grille; la maturité relationnelle décide de ce qu’on en fait.`)
    ].join('');

    const evolution = [
      h3('Ce qu’il faut renforcer'),
      pTag(`Renforcez consciemment ${s.gift}. Cette qualité est votre base et n’a pas besoin d’être corrigée : elle a besoin d’être utilisée au bon endroit.`),
      h3('Ce qu’il faut assouplir'),
      pTag(`Travaillez surtout sur ${s.risk}. ${a?`Côté chinois, surveillez également ${a.risk}.`:''} L’objectif n’est pas de supprimer ces réactions, mais de repérer plus tôt le moment où elles commencent à vous enfermer.`),
      h3('Ce qu’il faut comprendre'),
      pTag(`Votre besoin central reste ${s.need}. Beaucoup de vos choix deviennent plus lisibles quand vous distinguez ce besoin profond des habitudes utilisées pour le satisfaire.`),
      h3('Mini-plan TADAMB'),
      pTag(`1. Identifier ce qui vous nourrit réellement. 2. Nommer ce qui vous met sous tension avant que la réaction automatique prenne le dessus. 3. Choisir une réponse qui protège le besoin sans rigidifier la relation. 4. Conserver vos forces, mais changer de stratégie quand elles deviennent coûteuses.`)
    ].join('');

    const summary = [
      h3('Votre signature en quelques lignes'),
      pTag(`${who}votre profil associe la logique du ${p.sun}${p.animal?` à celle du ${china}`:''}. Le fil rouge est un besoin de ${s.need}, soutenu par ${s.gift}.${a?` Votre couche chinoise apporte ${a.gift}.`:''}`),
      m?pTag(`Votre vie émotionnelle, marquée par la Lune ${p.moon}, demande aussi ${m.need}.`):'',
      r?pTag(`Votre Ascendant ${p.rising} donne extérieurement une tonalité de ${r.gift}.`):'',
      pTag(`Votre principal enjeu consiste à ne pas laisser ${s.risk} devenir une réponse automatique à l’insécurité. Votre potentiel est maximal lorsque vos différentes couches travaillent ensemble plutôt que chacune de leur côté.`),
      `<div class="report-signature">${p.sun}${p.animal?` × ${p.animal}`:''}${p.element?` ${p.element}`:''} — construire votre propre équilibre entre identité, adaptation et relation.</div>`
    ].join('');

    return {synth,strengths,love,work,stress,relations,evolution,summary};
  }

  function injectStyles(){
    if(document.querySelector('#tadamb-report-style')) return;
    const style=document.createElement('style'); style.id='tadamb-report-style';
    style.textContent=`
      .report-panel{border-color:rgba(231,190,120,.28);background:linear-gradient(145deg,rgba(231,190,120,.06),rgba(167,139,250,.045));}
      .report-tabs{display:flex;gap:8px;overflow-x:auto;padding:4px 0 14px;margin:0 0 22px;scrollbar-width:thin}
      .report-tab{flex:0 0 auto;border:1px solid rgba(255,255,255,.12);background:rgba(5,7,16,.48);color:#d9d4e2;border-radius:999px;padding:10px 15px;font:inherit;font-size:.82rem;font-weight:750;cursor:pointer;margin:0}
      .report-tab.active{background:linear-gradient(135deg,#f6d59b,#cdb4ff);color:#17121c;border-color:transparent}
      .report-content{background:rgba(5,7,16,.35);border:1px solid rgba(255,255,255,.08);border-radius:22px;padding:clamp(22px,4vw,38px)}
      .report-pane{display:none}.report-pane.active{display:block}
      .report-pane h3{font-size:1.1rem;color:#f0c987;margin:28px 0 8px}.report-pane h3:first-child{margin-top:0}
      .report-pane p{color:#dfdae9;line-height:1.82;font-size:1rem;margin:0 0 15px;max-width:900px}
      .report-note{margin-top:24px;padding:16px 18px;border-left:2px solid rgba(231,190,120,.55);background:rgba(231,190,120,.055);color:#aaa5b6;font-size:.86rem;line-height:1.6}
      .report-signature{margin-top:28px;padding:22px;border-radius:18px;background:linear-gradient(135deg,rgba(231,190,120,.12),rgba(167,139,250,.1));font-size:1.08rem;font-weight:750;line-height:1.55}
      @media(max-width:760px){.report-content{border-radius:18px}.report-pane p{font-size:.96rem}.report-tabs{margin-right:-12px}.report-tab{padding:9px 12px}}
    `;
    document.head.appendChild(style);
  }

  function injectPanel(){
    if(document.querySelector('#detailedReport')) return;
    const fusion=document.querySelector('.fusion');
    if(!fusion) return;
    const section=document.createElement('section');
    section.id='detailedReport'; section.className='panel report-panel';
    section.innerHTML=`
      <div class="section-head compact"><div><p class="step">05 · Rapport TADAMB détaillé</p><h2>Votre portrait fusionné, en profondeur</h2></div><span class="symbol">✦</span></div>
      <p class="section-copy life-copy">Un rapport développé, construit à partir des couches réellement disponibles de votre profil occidental et chinois.</p>
      <nav class="report-tabs" aria-label="Onglets du rapport">
        <button type="button" class="report-tab active" data-tab="synth">Synthèse</button>
        <button type="button" class="report-tab" data-tab="strengths">Forces & failles</button>
        <button type="button" class="report-tab" data-tab="love">Amour</button>
        <button type="button" class="report-tab" data-tab="work">Travail</button>
        <button type="button" class="report-tab" data-tab="stress">Aligné / Stress / Shadow</button>
        <button type="button" class="report-tab" data-tab="relations">Relations</button>
        <button type="button" class="report-tab" data-tab="evolution">Évolution</button>
        <button type="button" class="report-tab" data-tab="summary">Résumé</button>
      </nav>
      <div class="report-content"></div>`;
    fusion.insertAdjacentElement('afterend',section);
    section.querySelectorAll('.report-tab').forEach(btn=>btn.addEventListener('click',()=>{
      section.querySelectorAll('.report-tab').forEach(b=>b.classList.toggle('active',b===btn));
      section.querySelectorAll('.report-pane').forEach(p=>p.classList.toggle('active',p.dataset.pane===btn.dataset.tab));
    }));
  }

  function render(){
    injectStyles(); injectPanel();
    const panel=document.querySelector('#detailedReport'); if(!panel) return;
    const report=buildReport(currentProfile()); if(!report) return;
    const content=panel.querySelector('.report-content');
    const active=panel.querySelector('.report-tab.active')?.dataset.tab || 'synth';
    content.innerHTML=Object.entries(report).map(([key,html])=>`<article class="report-pane ${key===active?'active':''}" data-pane="${key}">${html}</article>`).join('');
  }

  document.addEventListener('DOMContentLoaded',()=>{render();
    const target=document.querySelector('#results');
    if(target)new MutationObserver(()=>render()).observe(target,{subtree:true,childList:true,characterData:true});
    document.querySelector('#birth-form')?.addEventListener('submit',()=>setTimeout(render,250));
  });
})();