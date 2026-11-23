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

// Animated systems study, drawn locally without external graphics libraries.
(() => {
  const canvas = document.getElementById('system-canvas');
  if (!canvas) return;
  const context = canvas.getContext('2d');
  if (!context) return;
  const art = canvas.parentElement;
  const motionButton = art.querySelector('.art-motion');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const modes = {
    build: { symbol: '{ }', word: 'BUILD', description: 'Turn an idea into a system people can use.' },
    secure: { symbol: '◇', word: 'SECURE', description: 'Understand the boundaries. Protect what matters.' },
    connect: { symbol: '+', word: 'CONNECT', description: 'See how code, infrastructure, and people fit together.' }
  };
  let mode = 'build';
  let paused = reduceMotion.matches;
  let visible = true;
  let frame = 0;
  let phase = 0;
  let previousTime = 0;
  let width = 0;
  let height = 0;

  function draw() {
    context.clearRect(0, 0, width, height);
    const centerX = width / 2;
    const centerY = height * 0.43;
    const radius = Math.min(width * 0.36, 170);
    const count = mode === 'connect' ? 18 : 12;
    const points = Array.from({ length: count }, (_, index) => {
      const angle = index * Math.PI * 2 / count + phase;
      return { x: centerX + Math.cos(angle) * radius, y: centerY + Math.sin(angle) * radius * 0.78 };
    });
    context.strokeStyle = '#a2b8d5';
    context.lineWidth = 0.7;
    points.forEach((point, index) => {
      const target = mode === 'build' ? points[(index + 4) % count] : { x: centerX, y: centerY };
      context.beginPath();
      context.moveTo(point.x, point.y);
      context.lineTo(target.x, target.y);
      context.stroke();
      context.fillStyle = index % 3 === 0 ? '#2258df' : '#89a7cd';
      context.beginPath();
      context.arc(point.x, point.y, index % 3 === 0 ? 5 : 3, 0, Math.PI * 2);
      context.fill();
    });
    context.strokeStyle = mode === 'secure' ? '#2258df' : '#c2cfdf';
    context.lineWidth = mode === 'secure' ? 2 : 1;
    for (let ring = 0; ring < 3; ring += 1) {
      context.beginPath();
      context.ellipse(centerX, centerY, radius + ring * 17, radius * 0.78 + ring * 17, 0, 0, Math.PI * 2);
      context.stroke();
    }
  }

  function animate(time) {
    frame = 0;
    if (paused || !visible || document.hidden) return;
    if (previousTime) phase += Math.min(time - previousTime, 50) * 0.00012;
    previousTime = time;
    draw();
    frame = requestAnimationFrame(animate);
  }

  function updateAnimation() {
    cancelAnimationFrame(frame);
    previousTime = 0;
    motionButton.textContent = paused ? 'Resume motion' : 'Pause motion';
    motionButton.setAttribute('aria-pressed', String(paused));
    draw();
    if (!paused && visible && !document.hidden) frame = requestAnimationFrame(animate);
  }

  function resize() {
    const bounds = art.getBoundingClientRect();
    width = bounds.width;
    height = bounds.height;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    draw();
  }

  art.querySelectorAll('[data-art-mode]').forEach(button => {
    button.addEventListener('click', () => {
      mode = button.dataset.artMode;
      art.dataset.mode = mode;
      art.querySelector('.art-symbol').textContent = modes[mode].symbol;
      art.querySelector('.art-word').textContent = modes[mode].word;
      art.querySelector('#art-description').textContent = modes[mode].description;
      art.querySelectorAll('[data-art-mode]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      draw();
    });
  });
  motionButton.addEventListener('click', () => { paused = !paused; updateAnimation(); });
  reduceMotion.addEventListener('change', event => { paused = event.matches; updateAnimation(); });
  document.addEventListener('visibilitychange', updateAnimation);
  new ResizeObserver(resize).observe(art);
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; updateAnimation(); }).observe(art);
  resize();
  updateAnimation();
})();
