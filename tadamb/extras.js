const EXTRA_SIGNS={
  "Bélier":{element:"Feu",approach:"Soyez direct, vivant et sincère. L’énergie franche crée plus facilement le contact que les détours.",convince:"Montrez l’intérêt concret, le défi et la marge d’action. Un argument trop long perd vite de son impact.",conflict:"Allez au fond du sujet rapidement, sans jouer sur les sous-entendus. Laissez ensuite retomber la pression.",support:"Redonnez une prise sur l’action : une décision, une étape, un mouvement possible.",disconnect:"La lenteur imposée, le flou, l’inaction et les rapports trop passifs peuvent provoquer un décrochage rapide."},
  "Taureau":{element:"Terre",approach:"Avancez simplement, sans pression. La confiance se construit par la constance et la cohérence.",convince:"Apportez des faits, de la stabilité et une logique concrète. Il faut sentir que la proposition tient dans le temps.",conflict:"Évitez de brusquer. Un échange posé et factuel fonctionne mieux qu’une confrontation à chaud.",support:"Rassurez par des repères concrets, du temps et une présence fiable.",disconnect:"L’instabilité, les promesses non tenues, la précipitation et les changements imposés usent rapidement la confiance."},
  "Gémeaux":{element:"Air",approach:"Stimulez la curiosité et la conversation. L’échange vivant est la meilleure porte d’entrée.",convince:"Apportez plusieurs angles, laissez de la liberté et évitez les discours figés.",conflict:"Remettez les mots au centre et clarifiez vite les malentendus avant qu’ils ne s’accumulent.",support:"Offrez de l’écoute, du recul et de nouvelles perspectives plutôt qu’une réponse unique.",disconnect:"La monotonie, le silence, les rigidités intellectuelles et les échanges fermés créent vite de la distance."},
  "Cancer":{element:"Eau",approach:"Créez un climat de confiance, de douceur et de sécurité émotionnelle.",convince:"Montrez que vous avez compris l’impact humain et affectif, pas seulement la logique du projet.",conflict:"Évitez la froideur et les attaques sèches. Nommez ce qui s’est passé avec tact et continuité.",support:"Présence, écoute et sécurité comptent souvent plus que des solutions immédiates.",disconnect:"Le sentiment d’insécurité, l’indifférence et les non-dits prolongés peuvent fermer la relation."},
  "Lion":{element:"Feu",approach:"Soyez chaleureux, clair et respectueux. Une vraie reconnaissance ouvre davantage qu’une flatterie artificielle.",convince:"Donnez du sens, de la visibilité et un rôle où l’expression personnelle compte.",conflict:"Évitez l’humiliation ou la mise en défaut publique. Dites les choses franchement, mais avec respect.",support:"Rappelez les forces, redonnez de la perspective et une occasion de reprendre sa place.",disconnect:"L’indifférence, le mépris, la dévalorisation et les environnements ternes coupent vite l’élan."},
  "Vierge":{element:"Terre",approach:"Soyez clair, précis et fiable. Les détails cohérents inspirent confiance.",convince:"Préparez les faits, les étapes, les risques et la logique d’exécution.",conflict:"Restez factuel et précis, sans dramatiser. Les faits mal formulés sont souvent plus irritants que le désaccord lui-même.",support:"Aidez à remettre de l’ordre, prioriser et retrouver une structure simple.",disconnect:"Le désordre chronique, les approximations et l’improvisation permanente fatiguent rapidement."},
  "Balance":{element:"Air",approach:"Privilégiez le tact, l’écoute et un échange équilibré.",convince:"Montrez les bénéfices pour chaque partie et laissez de la place à la nuance.",conflict:"Évitez l’escalade. Cherchez d’abord ce qui peut être rééquilibré avant de trancher.",support:"Offrez un espace calme où les différentes options peuvent être remises en perspective.",disconnect:"L’agressivité, l’injustice, la grossièreté et les rapports de force permanents créent de la distance."},
  "Scorpion":{element:"Eau",approach:"Soyez authentique et évitez le superficiel. La confiance se gagne par la profondeur et la cohérence.",convince:"Parlez du fond, des enjeux réels et de ce qui se joue derrière les apparences.",conflict:"Ne minimisez pas. Une discussion honnête, directe et privée vaut mieux qu’un compromis de façade.",support:"Respectez le besoin d’intimité et de contrôle, tout en restant présent sans intrusion.",disconnect:"La duplicité, la trahison, la superficialité et les demi-vérités coupent fortement le lien."},
  "Sagittaire":{element:"Feu",approach:"Entrez par l’enthousiasme, l’ouverture et la liberté.",convince:"Donnez une vision, un horizon et la sensation qu’il y a quelque chose à explorer.",conflict:"Dites les choses franchement, puis évitez de transformer le désaccord en enfermement durable.",support:"Aidez à retrouver du sens, de l’espace et une perspective plus large.",disconnect:"Le contrôle étroit, la routine sans sens et l’absence d’horizon provoquent vite une perte d’intérêt."},
  "Capricorne":{element:"Terre",approach:"Soyez fiable, sobre et cohérent. La crédibilité précède souvent la proximité.",convince:"Présentez un plan solide, les responsabilités, le calendrier et la valeur à long terme.",conflict:"Restez adulte, factuel et orienté solution. Les débordements émotionnels répétés ferment vite l’échange.",support:"Aidez à retrouver maîtrise, structure et perspective de progression.",disconnect:"Le manque de sérieux, l’instabilité et les engagements flous érodent rapidement la confiance."},
  "Verseau":{element:"Air",approach:"Respectez l’indépendance et entrez par l’idée, la singularité ou la vision.",convince:"Expliquez le pourquoi, laissez de l’autonomie et évitez les arguments d’autorité.",conflict:"Donnez de l’espace, clarifiez les principes et évitez le chantage émotionnel.",support:"Offrez du recul, une lecture différente et la liberté de revenir à son rythme.",disconnect:"Le conformisme, le contrôle, l’intrusion et les règles sans logique font rapidement décrocher."},
  "Poissons":{element:"Eau",approach:"Soyez doux, intuitif et humain. Une ambiance de confiance compte beaucoup.",convince:"Reliez la proposition au sens, à l’intuition et à l’impact humain.",conflict:"Évitez la brutalité. Dites les choses avec clarté, mais sans nier l’émotion.",support:"Écoute, douceur, temps et sentiment d’être compris sont souvent essentiels.",disconnect:"La dureté, le cynisme, l’agressivité et les climats trop secs coupent l’élan relationnel."}
};

const COMPATIBILITY={
  "Bélier":{strong:["Lion","Sagittaire"],complementary:["Gémeaux","Verseau"],demanding:["Cancer","Capricorne"]},
  "Taureau":{strong:["Vierge","Capricorne"],complementary:["Cancer","Poissons"],demanding:["Lion","Verseau"]},
  "Gémeaux":{strong:["Balance","Verseau"],complementary:["Bélier","Lion"],demanding:["Vierge","Poissons"]},
  "Cancer":{strong:["Scorpion","Poissons"],complementary:["Taureau","Vierge"],demanding:["Bélier","Balance"]},
  "Lion":{strong:["Bélier","Sagittaire"],complementary:["Gémeaux","Balance"],demanding:["Taureau","Scorpion"]},
  "Vierge":{strong:["Taureau","Capricorne"],complementary:["Cancer","Scorpion"],demanding:["Gémeaux","Sagittaire"]},
  "Balance":{strong:["Gémeaux","Verseau"],complementary:["Lion","Sagittaire"],demanding:["Cancer","Capricorne"]},
  "Scorpion":{strong:["Cancer","Poissons"],complementary:["Vierge","Capricorne"],demanding:["Lion","Verseau"]},
  "Sagittaire":{strong:["Bélier","Lion"],complementary:["Balance","Verseau"],demanding:["Vierge","Poissons"]},
  "Capricorne":{strong:["Taureau","Vierge"],complementary:["Scorpion","Poissons"],demanding:["Bélier","Balance"]},
  "Verseau":{strong:["Gémeaux","Balance"],complementary:["Bélier","Sagittaire"],demanding:["Taureau","Scorpion"]},
  "Poissons":{strong:["Cancer","Scorpion"],complementary:["Taureau","Capricorne"],demanding:["Gémeaux","Sagittaire"]}
};

function currentSunSign(){
  const raw=document.querySelector('#sunSign')?.textContent||'';
  return Object.keys(EXTRA_SIGNS).find(sign=>raw.includes(sign))||null;
}

function renderExtras(){
  const sign=currentSunSign();
  if(!sign)return;
  const m=EXTRA_SIGNS[sign],c=COMPATIBILITY[sign];
  document.querySelector('#manualApproach').textContent=m.approach;
  document.querySelector('#manualConvince').textContent=m.convince;
  document.querySelector('#manualConflict').textContent=m.conflict;
  document.querySelector('#manualSupport').textContent=m.support;
  document.querySelector('#manualDisconnect').textContent=m.disconnect;
  document.querySelector('#compatStrong').textContent=`${c.strong.join(' · ')} — affinités généralement fluides sur le rythme, l’énergie et la manière d’entrer en relation.`;
  document.querySelector('#compatComplementary').textContent=`${c.complementary.join(' · ')} — différences souvent stimulantes, avec un potentiel de complémentarité si chacun garde sa manière d’être.`;
  document.querySelector('#compatDemanding').textContent=`${c.demanding.join(' · ')} — relations pouvant demander davantage d’ajustements sur le rythme, la sécurité ou la communication.`;
}

const observer=new MutationObserver(()=>renderExtras());
const target=document.querySelector('#sunSign');
if(target)observer.observe(target,{childList:true,subtree:true,characterData:true});
document.querySelector('#birth-form')?.addEventListener('submit',()=>setTimeout(renderExtras,150));
