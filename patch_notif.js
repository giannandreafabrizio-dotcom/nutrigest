const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const OLD = `function notif(msg,dur=2500){const el=document.createElement('div');el.className='notif';el.textContent=msg;el.style.opacity='0';document.body.appendChild(el);void el.offsetWidth;el.style.opacity='';setTimeout(()=>{el.classList.add('hide');setTimeout(()=>el.remove(),250);},dur);}`;

const NEW = `function notif(msg,dur=2500){const el=document.createElement('div');el.className='notif';el.style.opacity='0';el.textContent=msg;document.body.appendChild(el);requestAnimationFrame(()=>requestAnimationFrame(()=>{el.style.opacity='';el.style.animation='notifIn .25s ease forwards';}));setTimeout(()=>{el.classList.add('hide');setTimeout(()=>el.remove(),250);},dur);}`;

if(!html.includes(OLD)){console.error('FAIL: funzione notif non trovata');process.exit(1);}
html=html.replace(OLD,NEW);
fs.writeFileSync('index.html',html,'utf8');
console.log('OK: toast animazione fixata con double requestAnimationFrame');
