const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const OLD_CSS = 'animation:notifIn .28s cubic-bezier(.34,1.4,.64,1) forwards;}@keyframes notifIn{from{opacity:0;transform:scale(.87) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}.notif.hide{animation:notifOut .22s ease-in forwards;}@keyframes notifOut{from{opacity:1;transform:scale(1) translateY(0)}to{opacity:0;transform:scale(.93) translateY(4px)}}';

const NEW_CSS = 'animation:notifIn .4s cubic-bezier(.34,1.4,.64,1) forwards;}@keyframes notifIn{from{opacity:0;transform:scale(.85) translateY(12px)}to{opacity:1;transform:scale(1) translateY(0)}}.notif.hide{animation:notifOut .35s ease-in forwards;}@keyframes notifOut{from{opacity:1;transform:scale(1) translateY(0)}to{opacity:0;transform:scale(.9) translateY(6px)}}';

if(!html.includes(OLD_CSS)){console.error('FAIL: CSS non trovato');process.exit(1);}
html=html.replace(OLD_CSS,NEW_CSS);
fs.writeFileSync('index.html',html,'utf8');
console.log('OK: toast rallentato — entrata 0.4s, uscita 0.35s');
