'use strict';
const siteBase=new URL('./',document.currentScript.src).pathname;
const routes={home:siteBase,expertise:siteBase+'expertise/',projects:siteBase+'projects/',experience:siteBase+'experience/',ai:siteBase+'expertise/#ai-security','ai-security':siteBase+'expertise/#ai-security',about:siteBase+'about/'};
// Retain old shared section links after moving to separate pages.
if((location.pathname===siteBase||location.pathname===siteBase+'index.html')&&routes[location.hash.slice(1)])location.replace(routes[location.hash.slice(1)]);
const dialog=document.getElementById('command-menu');
const commandSearch=document.getElementById('command-search');
function openCommands(){dialog.showModal();commandSearch.value='';filterCommands();commandSearch.focus()}
function filterCommands(){let count=0;document.querySelectorAll('.command-item').forEach(a=>{a.hidden=!a.textContent.toLowerCase().includes(commandSearch.value.toLowerCase());if(!a.hidden)count++});document.querySelector('.command-empty').hidden=count>0}
document.querySelector('.command-trigger').addEventListener('click',openCommands);
document.querySelector('.close-command').addEventListener('click',()=>dialog.close());
commandSearch.addEventListener('input',filterCommands);
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();dialog.open?dialog.close():openCommands()}});
const topButton=document.getElementById('backtop');window.addEventListener('scroll',()=>topButton.hidden=window.scrollY<600,{passive:true});topButton.addEventListener('click',()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));
const terminal=document.getElementById('terminal-form');
if(terminal)terminal.addEventListener('submit',e=>{e.preventDefault();const input=document.getElementById('terminal-input');let cmd=input.value.trim().toLowerCase().replace(/^cd\s+/,'').replace(/^\/+|\/+$/g,'');const output=document.getElementById('terminal-result');if(routes[cmd]){location.assign(routes[cmd]);return}const answers={help:'Commands: home · expertise · projects · experience · ai · about · whoami · clear',ls:'expertise/  projects/  experience/  about/',whoami:'Muhammad Muneeb Ur Rehman — security engineer focused on AI/LLM security, web application security, offensive testing, and Linux systems.',clear:''};output.textContent=Object.hasOwn(answers,cmd)?answers[cmd]:'Unknown portfolio command. Type help to see available commands.';input.value=''});
const projectSearch=document.getElementById('project-search');let projectFilter='all';
function filterProjects(){if(!projectSearch)return;const q=projectSearch.value.toLowerCase();let count=0;document.querySelectorAll('.project').forEach(p=>{p.hidden=!(projectFilter==='all'||p.dataset.category===projectFilter)||!p.textContent.toLowerCase().includes(q);if(!p.hidden)count++});document.getElementById('project-count').textContent=count+' of '+document.querySelectorAll('.project').length+' projects';document.getElementById('project-empty').hidden=count>0}
if(projectSearch){projectSearch.addEventListener('input',filterProjects);document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{projectFilter=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));filterProjects()}))}
const aiSearch=document.getElementById('ai-search');let aiFilter='all';
function filterAI(){if(!aiSearch)return;let count=0;const q=aiSearch.value.toLowerCase();document.querySelectorAll('.aicard').forEach(p=>{p.hidden=!(aiFilter==='all'||p.dataset.aiCategory===aiFilter)||!p.textContent.toLowerCase().includes(q);if(!p.hidden)count++});document.getElementById('ai-count').textContent=count+' of 15 topics';document.getElementById('ai-empty').hidden=count>0;syncExpand()}
function syncExpand(){const visible=[...document.querySelectorAll('.aicard:not([hidden]) details')];const expanded=visible.length>0&&visible.every(d=>d.open);const b=document.getElementById('expand-ai');b.textContent=expanded?'Collapse all notes':'Expand all notes';b.setAttribute('aria-expanded',String(expanded));b.disabled=visible.length===0}
if(aiSearch){aiSearch.addEventListener('input',filterAI);document.querySelectorAll('[data-ai-filter]').forEach(b=>b.addEventListener('click',()=>{aiFilter=b.dataset.aiFilter;document.querySelectorAll('[data-ai-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));filterAI()}));document.getElementById('expand-ai').addEventListener('click',()=>{const b=document.getElementById('expand-ai');const open=b.getAttribute('aria-expanded')!=='true';document.querySelectorAll('.aicard:not([hidden]) details').forEach(d=>d.open=open);syncExpand()});document.querySelectorAll('.aicard details').forEach(d=>d.addEventListener('toggle',syncExpand))}

const experienceButtons=document.querySelectorAll('[data-experience-filter]');
if(experienceButtons.length){
  experienceButtons.forEach(btn=>btn.addEventListener('click',()=>{
    const filter=btn.dataset.experienceFilter;
    let count=0;
    experienceButtons.forEach(x=>x.setAttribute('aria-pressed',String(x===btn)));
    document.querySelectorAll('.experience-item').forEach(item=>{
      const cats=(item.dataset.experienceCategory||'').split(' ');
      item.hidden=filter!=='all'&&!cats.includes(filter);
      if(!item.hidden)count++;
    });
    const empty=document.getElementById('experience-empty');
    if(empty)empty.hidden=count>0;
  }));
}
