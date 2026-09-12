(() => {
  function txt(sel){ return document.querySelector(sel)?.textContent?.trim() || '—'; }
  function val(sel){ return document.querySelector(sel)?.value?.trim() || ''; }
  function escapeHtml(s=''){ return s.replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }

  function section(title, body){
    if(!body || body==='—') return '';
    return `<section class="pdf-section"><h2>${escapeHtml(title)}</h2>${body}</section>`;
  }
  function paragraph(label, value){
    if(!value || value==='—') return '';
    return `<div class="pdf-item"><h3>${escapeHtml(label)}</h3><p>${escapeHtml(value)}</p></div>`;
  }
  function collectReportPanes(){
    const labels={synth:'Synthèse générale',strengths:'Forces & failles',love:'Amour',work:'Travail',stress:'Aligné / Stress / Shadow',relations:'Relations',evolution:'Évolution',summary:'Résumé final'};
    return [...document.querySelectorAll('#detailedReport .report-pane')].map(p=>{
      const key=p.dataset.pane||'';
      const clone=p.cloneNode(true);
      clone.classList.remove('active');
      clone.querySelectorAll('.editorial-block').forEach(()=>{});
      return section(labels[key]||key, clone.innerHTML);
    }).join('');
  }

  function buildPdfHtml(){
    const name=val('#firstName') || 'Portrait TADAMB';
    const date=val('#birthDate');
    const time=val('#birthTime');
    const place=val('#birthPlace');
    const profileLevel=txt('#profileLevel');
    const sun=txt('#sunSign'), moon=txt('#moonSign'), rising=txt('#risingSign');
    const yearAnimal=txt('#yearAnimal'), yearElement=txt('#yearElement'), hourAnimal=txt('#hourAnimal');

    const identity=[date?`Né(e) le ${date}`:'',time?`à ${time}`:'',place?`à ${place}`:''].filter(Boolean).join(' ');

    const chineseDetails = [
      ['Tempérament chinois',txt('#chineseTemperament')],['Forces chinoises',txt('#chineseStrengths')],['Défis chinois',txt('#chineseChallenges')],['Amour & relations',txt('#chineseLove')],['Travail & projets',txt('#chineseWork')],['Influence de l’élément',txt('#chineseElementText')]
    ].map(([l,v])=>paragraph(l,v)).join('');

    const life = [
      ['Travail',txt('#lifeWork')],['Amour',txt('#lifeLove')],['Amitiés',txt('#lifeFriends')],['Communication',txt('#lifeCommunication')],['Argent & sécurité',txt('#lifeMoney')],['Créativité & projets',txt('#lifeCreativity')],['Famille & attachement',txt('#lifeFamily')],['Changement & décisions',txt('#lifeChange')],['Points de vigilance',txt('#lifeWatch')]
    ].map(([l,v])=>paragraph(l,v)).join('');

    const keys = [
      ['Forces',txt('#keyStrengths')],['Fragilités',txt('#keyFragilities')],['Besoins profonds',txt('#keyNeeds')],['Ce qui motive',txt('#keyMotivations')],['Ce qui épuise',txt('#keyDrains')],['Compatibilités relationnelles',txt('#keyCompatibility')]
    ].map(([l,v])=>paragraph(l,v)).join('');

    const manual = [
      ['Pour vous approcher',txt('#manualApproach')],['Pour vous convaincre',txt('#manualConvince')],['En cas de conflit',txt('#manualConflict')],['Quand ça va mal',txt('#manualSupport')],['Ce qui vous fait décrocher',txt('#manualDisconnect')]
    ].map(([l,v])=>paragraph(l,v)).join('');

    const compat = [
      ['Affinités naturelles',txt('#compatStrong')],['Complémentarités',txt('#compatComplementary')],['Relations plus exigeantes',txt('#compatDemanding')]
    ].map(([l,v])=>paragraph(l,v)).join('');

    return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>TADAMB — ${escapeHtml(name)}</title><style>
      @page{size:A4;margin:16mm 15mm 18mm}
      *{box-sizing:border-box} body{margin:0;font-family:Arial,Helvetica,sans-serif;color:#191923;background:white;font-size:10.5pt;line-height:1.55}
      .cover{min-height:250mm;display:flex;flex-direction:column;justify-content:center;page-break-after:always;padding:16mm 8mm;border:1px solid #ddd;border-radius:18px}
      .brand{letter-spacing:.25em;font-size:11pt;font-weight:800;color:#7c5a28;margin-bottom:24px}.star{font-size:28pt;color:#b78845}
      h1{font-size:34pt;line-height:1.02;margin:8px 0 18px}.subtitle{font-size:15pt;color:#595664;margin-bottom:36px}.identity{font-size:11pt;color:#6c6875}
      .signature{margin-top:42px;padding:18px 20px;background:#f5f0e8;border-radius:14px;font-size:14pt;font-weight:700}.meta{margin-top:16px;color:#77727f;font-size:9.5pt}
      .profile-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin:20px 0 4px}.profile-box{border:1px solid #ddd;border-radius:10px;padding:11px}.profile-box small{display:block;color:#777;margin-bottom:5px}.profile-box strong{font-size:11pt}
      .pdf-section{page-break-before:always}.pdf-section:first-of-type{page-break-before:auto}h2{font-size:22pt;margin:0 0 18px;border-bottom:1px solid #d8d2c8;padding-bottom:8px;color:#24232b}h3{font-size:12.5pt;margin:18px 0 6px;color:#8a622a}p{margin:0 0 11px}.pdf-item{break-inside:avoid;margin-bottom:16px;padding:12px 14px;background:#f7f6f8;border-radius:10px}.pdf-item h3{margin-top:0}.report-note{padding:12px 14px;border-left:3px solid #b78845;background:#faf7f1;margin:16px 0}.report-signature{padding:14px;background:#f3eee6;border-radius:10px;font-weight:700;margin-top:18px}.editorial-block{margin:18px 0;padding-top:8px;border-top:1px solid #eee}.editorial-label{font-weight:700;color:#8a622a;margin-bottom:6px}
      .toc{page-break-after:always}.toc ol{padding-left:22px}.toc li{margin:7px 0}.footer-note{font-size:8.5pt;color:#777;margin-top:24px;border-top:1px solid #ddd;padding-top:10px}
      @media print{a{color:inherit;text-decoration:none}}
    </style></head><body>
      <div class="cover">
        <div class="star">✦</div><div class="brand">TADAMB</div>
        <h1>${escapeHtml(name)}</h1>
        <div class="subtitle">Portrait astrologique croisé<br>Occidental × Chinois</div>
        <div class="identity">${escapeHtml(identity||'Données de naissance partielles')}</div>
        <div class="signature">${escapeHtml(sun)} × ${escapeHtml(yearAnimal)} ${escapeHtml(yearElement==='—'?'':yearElement)}</div>
        <div class="meta">Niveau de précision : ${escapeHtml(profileLevel)}</div>
      </div>

      <section class="toc"><h2>Sommaire</h2><ol>
        <li>Repères astrologiques</li><li>Portrait occidental</li><li>Lecture chinoise</li><li>Portrait fusionné TADAMB</li><li>Rapport détaillé</li><li>Domaines de vie</li><li>Clés personnelles</li><li>Mode d’emploi</li><li>Compatibilités</li><li>Conclusion</li>
      </ol><div class="footer-note">Lecture symbolique et culturelle. TADAMB ne présente pas l’astrologie comme une science ni comme un diagnostic psychologique.</div></section>

      ${section('Repères astrologiques',`<div class="profile-grid"><div class="profile-box"><small>Soleil</small><strong>${escapeHtml(sun)}</strong></div><div class="profile-box"><small>Lune</small><strong>${escapeHtml(moon)}</strong></div><div class="profile-box"><small>Ascendant</small><strong>${escapeHtml(rising)}</strong></div><div class="profile-box"><small>Animal chinois</small><strong>${escapeHtml(yearAnimal)}</strong></div><div class="profile-box"><small>Élément & polarité</small><strong>${escapeHtml(yearElement)}</strong></div><div class="profile-box"><small>Animal de l’heure</small><strong>${escapeHtml(hourAnimal)}</strong></div></div>`)}
      ${section('Portrait occidental',`<p>${escapeHtml(txt('#westernText'))}</p>`)}
      ${section('Lecture chinoise',`<p>${escapeHtml(txt('#chineseText'))}</p>${chineseDetails}`)}
      ${section('Portrait fusionné TADAMB',`<p>${escapeHtml(txt('#fusionText'))}</p>`)}
      ${collectReportPanes()}
      ${section('Domaines de vie',life)}
      ${section('Clés personnelles',keys)}
      ${section('Votre mode d’emploi',manual)}
      ${section('Compatibilités entre signes',compat)}
      ${section('Conclusion',`<p>${escapeHtml(name)}, ce rapport cherche surtout à mettre en évidence la cohérence, les tensions et les complémentarités de votre profil. Les différentes traditions astrologiques ne sont pas traitées comme des verdicts, mais comme des grilles symboliques permettant de réfléchir à vos besoins, vos modes de réaction et vos dynamiques relationnelles.</p><div class="report-signature">TADAMB — Deux traditions. Un seul portrait.</div><div class="footer-note">Document généré depuis votre portrait TADAMB. Aucune donnée personnelle n’est enregistrée par cette version du site.</div>`)}
    </body></html>`;
  }

  function printPdf(){
    const html=buildPdfHtml();
    const frame=document.createElement('iframe');
    frame.style.position='fixed';frame.style.right='0';frame.style.bottom='0';frame.style.width='0';frame.style.height='0';frame.style.border='0';
    document.body.appendChild(frame);
    const doc=frame.contentWindow.document;doc.open();doc.write(html);doc.close();
    frame.onload=()=>setTimeout(()=>{frame.contentWindow.focus();frame.contentWindow.print();setTimeout(()=>frame.remove(),1500);},250);
  }

  function injectButton(){
    if(document.querySelector('#exportPdfBtn')) return;
    const report=document.querySelector('#detailedReport'); if(!report) return;
    const wrap=document.createElement('div');wrap.className='pdf-export-wrap';
    wrap.innerHTML=`<button id="exportPdfBtn" type="button" class="pdf-export-btn"><span>↓</span> Exporter le rapport en PDF</button><p>Une version A4 complète sera préparée. Dans la fenêtre d’impression, choisissez « Enregistrer au format PDF ».</p>`;
    report.insertAdjacentElement('afterend',wrap);
    wrap.querySelector('#exportPdfBtn').addEventListener('click',printPdf);
  }

  function injectStyles(){
    if(document.querySelector('#pdf-export-style'))return;
    const s=document.createElement('style');s.id='pdf-export-style';s.textContent=`.pdf-export-wrap{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:20px 22px;border:1px solid rgba(231,190,120,.24);background:rgba(231,190,120,.05);border-radius:20px}.pdf-export-wrap p{margin:0;color:#aaa5b6;font-size:.83rem;line-height:1.5;max-width:540px}.pdf-export-btn{grid-column:auto;margin:0;width:auto;white-space:nowrap;padding:14px 20px}.pdf-export-btn span{margin-right:7px}@media(max-width:760px){.pdf-export-wrap{display:grid}.pdf-export-btn{width:100%}}`;document.head.appendChild(s);
  }

  document.addEventListener('DOMContentLoaded',()=>{injectStyles();injectButton();const results=document.querySelector('#results');if(results)new MutationObserver(()=>injectButton()).observe(results,{childList:true,subtree:true});});
})();