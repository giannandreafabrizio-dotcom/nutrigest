const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const OLD_CSS = '.notif{position:fixed;bottom:1.5rem;right:1.5rem;background:var(--text);color:#fff;padding:.65rem 1.1rem;border-radius:10px;font-size:.78rem;z-index:1000;box-shadow:var(--shadow2);animation:notifIn .25s ease forwards;}@keyframes notifIn{from{opacity:0;transform:scale(.93)}to{opacity:1;transform:scale(1)}}.notif.hide{animation:notifOut .25s ease forwards;}@keyframes notifOut{from{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.93)}}';

const NEW_CSS = '.notif{position:fixed;bottom:1.5rem;right:1.5rem;background:var(--text);color:#fff;padding:.65rem 1.1rem;border-radius:10px;font-size:.78rem;z-index:1000;box-shadow:var(--shadow2);opacity:0;transform:scale(.93);transition:none;}.notif.show{animation:notifIn .28s cubic-bezier(.34,1.4,.64,1) forwards;}@keyframes notifIn{from{opacity:0;transform:scale(.87) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}.notif.hide{animation:notifOut .22s ease-in forwards;}@keyframes notifOut{from{opacity:1;transform:scale(1) translateY(0)}to{opacity:0;transform:scale(.93) translateY(4px)}}';

const OLD_FN = `function notif(msg,dur=2500){const el=document.createElement('div');el.className='notif';el.style.opacity='0';el.textContent=msg;document.body.appendChild(el);requestAnimationFrame(()=>requestAnimationFrame(()=>{el.style.opacity='';el.style.animation='notifIn .25s ease forwards';}));setTimeout(()=>{el.classList.add('hide');setTimeout(()=>el.remove(),250);},dur);}`;

const NEW_FN = `function notif(msg,dur=2500){const el=document.createElement('div');el.className='notif';el.textContent=msg;document.body.appendChild(el);requestAnimationFrame(()=>requestAnimationFrame(()=>{el.classList.add('show');}));setTimeout(()=>{el.classList.remove('show');el.classList.add('hide');setTimeout(()=>el.remove(),250);},dur);}`;

if(!html.includes(OLD_CSS)){console.error('FAIL: CSS non trovato');process.exit(1);}
if(!html.includes(OLD_FN)){console.error('FAIL: funzione notif non trovata');process.exit(1);}
html=html.replace(OLD_CSS,NEW_CSS);
html=html.replace(OLD_FN,NEW_FN);
fs.writeFileSync('index.html',html,'utf8');
console.log('OK: toast animazione fix definitivo (fade+scale con bounce)');
