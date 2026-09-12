(() => {
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];

  function syncName(){
    const value=$('#firstName')?.value?.trim();
    const out=$('#profileDisplayName');
    if(out) out.textContent=value || 'Votre';
  }

  function syncIntro(){
    const level=$('#profileLevel')?.textContent?.trim() || '';
    const intro=$('#resultIntro');
    if(!intro) return;
    if(level.includes('complet')) intro.textContent='Date, heure et lieu sont disponibles : TADAMB peut croiser toutes les couches prévues dans ce portrait.';
    else if(level.includes('enrichi')) intro.textContent='L’heure permet d’enrichir la lecture émotionnelle et chinoise. L’Ascendant reste volontairement absent sans lieu fiable.';
    else intro.textContent='Un portrait essentiel construit avec la date de naissance. Les couches qui nécessitent l’heure ou le lieu ne sont pas inventées.';
  }

  function makeReveal(){
    const candidates=$$('.method-grid article,.overview-stage,.reading-panel,.fusion,.deep-dive-marker,.deep-section,#detailedReport,.pdf-export-wrap');
    candidates.forEach(el=>el.classList.add('reveal'));
    if(!('IntersectionObserver' in window)){candidates.forEach(el=>el.classList.add('visible'));return;}
    const obs=new IntersectionObserver(entries=>entries.forEach(e=>{
      if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}
    }),{threshold:.08,rootMargin:'0px 0px -30px 0px'});
    candidates.forEach(el=>obs.observe(el));
  }

  function setupResultNav(){
    const nav=$('.result-nav');
    if(!nav) return;
    const links=$$('a[href^="#"]',nav);
    const pairs=links.map(a=>({a,el:$(a.getAttribute('href'))})).filter(x=>x.el);
    links.forEach(a=>a.addEventListener('click',()=>links.forEach(x=>x.classList.toggle('active',x===a))));
    if(!('IntersectionObserver' in window)) return;
    const obs=new IntersectionObserver(entries=>{
      const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(!visible) return;
      links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${visible.target.id}`));
    },{rootMargin:'-22% 0px -62% 0px',threshold:[0,.15,.4]});
    pairs.forEach(x=>obs.observe(x.el));
  }

  function enhanceDetails(){
    $$('.deep-section').forEach((detail,i)=>{
      detail.addEventListener('toggle',()=>{
        if(!detail.open) return;
        // Keep the page calm on mobile: only one practical drawer open at a time.
        if(window.innerWidth<700){
          $$('.deep-section').forEach(other=>{if(other!==detail)other.open=false;});
        }
      });
      if(i===0 && window.innerWidth<700) detail.open=false;
    });
  }

  function afterPortrait(){
    syncName();
    setTimeout(()=>{syncIntro();makeReveal();setupResultNav();},220);
  }

  document.addEventListener('DOMContentLoaded',()=>{
    syncName();
    $('#firstName')?.addEventListener('input',syncName);
    $('#birth-form')?.addEventListener('submit',afterPortrait);
    enhanceDetails();
    makeReveal();

    const results=$('#results');
    if(results){
      new MutationObserver(()=>{
        if(!results.classList.contains('hidden')){syncIntro();syncName();makeReveal();}
      }).observe(results,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['class']});
    }
  });
})();