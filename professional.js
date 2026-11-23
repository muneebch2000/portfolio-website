(()=>{
  const menu=document.getElementById('menu');
  const nav=document.getElementById('navlinks');
  if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}))}

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
// The illustration follows the chapter closest to the reading position.
(() => {
  const visual = document.querySelector('.story-visual');
  if (!visual) return;
  const chapters = [...document.querySelectorAll('.story-chapter')];
  const motionButton = document.querySelector('.motion-toggle');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reducedMotion.matches;
  let scheduled = false;

  function updateMotion() {
    document.body.classList.toggle('motion-paused', paused);
    motionButton.setAttribute('aria-pressed', String(paused));
    motionButton.textContent = paused ? 'Resume animation' : 'Pause animation';
  }

  function updateChapter() {
    scheduled = false;
    const readingPosition = window.innerHeight * 0.55;
    const active = chapters.reduce((closest, chapter) => {
      const bounds = chapter.getBoundingClientRect();
      const distance = Math.abs(bounds.top + bounds.height / 2 - readingPosition);
      return distance < closest.distance ? { chapter, distance } : closest;
    }, { chapter: chapters[0], distance: Infinity }).chapter;
    if (visual.dataset.scene === active.dataset.scene) return;
    visual.dataset.scene = active.dataset.scene;
    visual.querySelector('.core-symbol').textContent = active.dataset.symbol;
    visual.querySelector('.core-label').textContent = active.dataset.label;
    visual.querySelector('.scene-caption').textContent = active.dataset.caption;
  }

  function scheduleUpdate() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(updateChapter);
  }

  motionButton.addEventListener('click', () => {
    paused = !paused;
    updateMotion();
  });
  reducedMotion.addEventListener('change', event => {
    paused = event.matches;
    updateMotion();
  });
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  updateMotion();
  updateChapter();
})();
