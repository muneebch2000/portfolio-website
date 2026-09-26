(()=>{
  const menu=document.getElementById('menu');
  const nav=document.getElementById('navlinks');
  if(menu&&nav){menu.addEventListener('click',()=>nav.classList.toggle('open'));nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')))}

  const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');reveal.unobserve(e.target)}}),{threshold:.1});
  document.querySelectorAll('.reveal').forEach(el=>reveal.observe(el));

  const filters=[...document.querySelectorAll('[data-filter]')];
  if(filters.length){
    const cards=[...document.querySelectorAll('[data-category]')];
    filters.forEach(btn=>btn.addEventListener('click',()=>{
      const f=btn.dataset.filter;
      filters.forEach(x=>{x.classList.toggle('active',x===btn);x.setAttribute('aria-pressed',String(x===btn))});
      cards.forEach(c=>c.hidden=f!=='all'&&c.dataset.category!==f);
    }));
  }

  const tabs=[...document.querySelectorAll('[data-tab]')];
  if(tabs.length){
    const panels=[...document.querySelectorAll('[data-panel]')];
    tabs.forEach(btn=>btn.addEventListener('click',()=>{
      tabs.forEach(x=>x.classList.toggle('active',x===btn));
      panels.forEach(p=>p.classList.toggle('active',p.dataset.panel===btn.dataset.tab));
    }));
  }
})();