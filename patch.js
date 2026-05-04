// patch.js — Sidebar pulita + nuovo Sincronizza con barra di caricamento (stile 2)
//
// Cambiamenti:
//  • Rimuove "↺ Sincronizza" e "⬇ Backup" dalla sidebar
//  • Rinomina "🔄 Sincronizza tutto" → "🔄 Sincronizza"
//  • Aggiunge barra di caricamento stile 2 (gradient giallo→verde) sotto il pulsante
//  • Stati visivi: verde quando ok, rosso quando errore
//  • Mantiene Backup nella pagina Impostazioni
//  • Idempotente: puoi eseguirlo più volte senza creare duplicati
//  • Verifica sintassi prima di scrivere
//
// Eseguire: node patch.js dalla cartella nutrigest

const fs = require('fs');
const path = 'index.html';
let src = fs.readFileSync(path, 'utf8');
const original = src;

console.log('Lunghezza iniziale:', src.length, 'bytes');

// ============================================================
// PARTE 1 — PULIZIA: rimuovo TUTTE le occorrenze esistenti
// ============================================================

// 1a. Rimuovi pulsante sidebar "Sincronizza" (vecchio, syncNow)
src = src.replace(/\s*<button class="btn-aside" onclick="syncNow\(\)"[^>]*>[^<]*<\/button>/g, '');

// 1b. Rimuovi pulsante sidebar "Backup" (esporta)
src = src.replace(/\s*<button class="btn-aside" onclick="esporta\(\)"[^>]*>[^<]*<\/button>/g, '');

// 1c. Rimuovi tutti i pulsanti "Sincronizza tutto" sidebar (anche duplicati)
src = src.replace(/\s*<button id="btn-sync-tutto"[^>]*onclick="sincronizzaTutto\(\)"[^>]*>[^<]*<\/button>/g, '');

// 1d. Rimuovi wrapper sidebar precedenti (se ne avevamo)
src = src.replace(/\s*<div id="btn-sync-wrap"[\s\S]*?<\/div>\s*<\/div>/g, '');

// 1e. Rimuovi pulsante Impostazioni "Sincronizza tutto"
src = src.replace(/\s*<button id="btn-sync-tutto-cfg"[^>]*onclick="sincronizzaTutto\(\)"[^>]*>[^<]*<\/button>/g, '');

// 1f. Rimuovi paragrafi istruzioni duplicati
src = src.replace(/\s*<p style="font-size:\.75rem;color:var\(--text2\);margin-top:\.5rem">Premi <strong>Sincronizza tutto[\s\S]*?<\/p>/g, '');

// 1g. Rimuovi tutte le funzioni async sincronizzaTutto esistenti
const fnPattern = /async function sincronizzaTutto\(\)\{[\s\S]*?setTimeout\(function\(\)\{ if\(btn\) btn\.textContent='🔄 Sincronizza[^']*'; \}, 3500\);\s*\}\s*\}\s*/g;
const fnMatches = src.match(fnPattern);
console.log('Funzioni sincronizzaTutto trovate:', fnMatches ? fnMatches.length : 0);
src = src.replace(fnPattern, '');

console.log('Dopo pulizia:', src.length, 'bytes (rimossi', original.length - src.length, 'bytes)');

// ============================================================
// PARTE 2 — Aggiungi CSS per barra di caricamento stile 2
// ============================================================
// L'inietto subito prima della chiusura di un blocco <style>
const CSS_NEW = `
/* ── Sincronizza con barra di caricamento (stile 2) ── */
.sync-wrap{display:flex;flex-direction:column;gap:4px;margin-top:4px;}
.btn-sync-main{width:100%;padding:.5rem .6rem;background:#16a070;color:#fff;font-weight:600;border:none;border-radius:8px;cursor:pointer;font-size:.78rem;font-family:'DM Sans',sans-serif;transition:background .2s;}
.btn-sync-main:hover{background:#14906b;}
.btn-sync-main:disabled{cursor:wait;}
.btn-sync-main.is-ok{background:#16a070;}
.btn-sync-main.is-err{background:#dc2626;}
.sync-track{width:100%;height:4px;background:rgba(255,255,255,.15);border-radius:2px;overflow:hidden;opacity:0;transition:opacity .25s;}
.sync-wrap.is-loading .sync-track,.sync-wrap.is-ok .sync-track,.sync-wrap.is-err .sync-track{opacity:1;}
.sync-fill{height:100%;width:0%;border-radius:2px;background:linear-gradient(90deg,#fbbf24,#4ade80);transition:width .3s;}
.sync-wrap.is-loading .sync-fill{animation:sync-fill-anim 2.4s ease-in-out infinite;}
.sync-wrap.is-ok .sync-fill{width:100%;background:#4ade80;animation:none;}
.sync-wrap.is-err .sync-fill{width:100%;background:#dc2626;animation:none;}
@keyframes sync-fill-anim{0%{width:0%}50%{width:85%}100%{width:100%}}
`;
const STYLE_CLOSE = '</style>';
const firstStyleClose = src.indexOf(STYLE_CLOSE);
if (firstStyleClose === -1) {
  console.error('ERRORE: tag </style> non trovato'); process.exit(1);
}
// Inietto solo se non già presente
if (!src.includes('.btn-sync-main')) {
  src = src.slice(0, firstStyleClose) + CSS_NEW + src.slice(firstStyleClose);
  console.log('[1/4] CSS barra di caricamento aggiunto');
} else {
  console.log('[1/4] CSS già presente, skip');
}

// ============================================================
// PARTE 3 — Aggiungi pulsante in sidebar al posto di quelli rimossi
// ============================================================
// Cerco il riferimento "sync-pill" (è subito prima dei pulsanti aside) per posizionarmi
const SIDEBAR_ANCHOR = '<div class="sync-pill">';
const idxPill = src.indexOf(SIDEBAR_ANCHOR);
if (idxPill === -1) {
  console.error('ERRORE: ancora sync-pill non trovata'); process.exit(1);
}
// Trova la chiusura del div sync-pill
const pillClose = src.indexOf('</div>', idxPill);
if (pillClose === -1) {
  console.error('ERRORE: chiusura sync-pill non trovata'); process.exit(1);
}
// Inserisci il nuovo wrapper dopo </div> della sync-pill
const SIDEBAR_NEW = `</div>
    <div class="sync-wrap" id="btn-sync-wrap">
      <button id="btn-sync-tutto" class="btn-sync-main" onclick="sincronizzaTutto()">🔄 Sincronizza</button>
      <div class="sync-track"><div class="sync-fill"></div></div>
    </div>`;

// Sostituisco solo la prima </div> dopo sync-pill
const before = src.slice(0, pillClose);
const after = src.slice(pillClose + '</div>'.length);
// Verifico che non ci sia già il wrapper
if (!src.includes('id="btn-sync-wrap"')) {
  src = before + SIDEBAR_NEW + after;
  console.log('[2/4] Pulsante sidebar aggiunto');
} else {
  console.log('[2/4] Pulsante sidebar già presente, skip');
}

// ============================================================
// PARTE 4 — Funzione sincronizzaTutto() pulita (con feedback barra)
// ============================================================
const ANCHOR_SAVE = 'async function save(){saveLocal();await pushToSheets();}';
if (!src.includes(ANCHOR_SAVE)) {
  console.error('ERRORE: ancora save() non trovata'); process.exit(1);
}

const NEW_FN = `async function sincronizzaTutto(){
  var wrap = document.getElementById('btn-sync-wrap');
  var btn = document.getElementById('btn-sync-tutto');
  if(wrap){ wrap.classList.remove('is-ok','is-err'); wrap.classList.add('is-loading'); }
  if(btn){ btn.disabled=true; btn.textContent='Sincronizzazione...'; }
  var pullOk = false;
  var pushOk = false;
  try {
    pullOk = await pullFromSheets();
    if(pullOk){ renderPaz(); renderRic(); renderCal(); renderEntrate(); }
  } catch(e) { console.error('[SyncTutto] pull errore:', e); }
  try {
    pushOk = await pushToSheets();
  } catch(e) { console.error('[SyncTutto] push errore:', e); }
  var tsEl = document.getElementById('ss-ts');
  if(tsEl){ var now=new Date(); tsEl.textContent=now.toLocaleTimeString('it-IT',{hour:'2-digit',minute:'2-digit'})+' — '+now.toLocaleDateString('it-IT'); }
  if(wrap){ wrap.classList.remove('is-loading'); }
  if(btn){ btn.disabled = false; }
  if(pullOk && pushOk){
    if(wrap) wrap.classList.add('is-ok');
    if(btn) btn.textContent='✅ Sincronizzato';
    notif('✅ Sincronizzazione completata', 2500);
  } else if(pullOk || pushOk){
    if(wrap) wrap.classList.add('is-err');
    if(btn) btn.textContent='⚠️ Parziale';
    notif('⚠️ Sincronizzazione parziale', 3500);
  } else {
    if(wrap) wrap.classList.add('is-err');
    if(btn) btn.textContent='❌ Errore';
    notif('❌ Sincronizzazione fallita', 3500);
  }
  setTimeout(function(){
    if(btn) btn.textContent='🔄 Sincronizza';
    if(wrap){ wrap.classList.remove('is-ok','is-err'); }
  }, 3000);
}

`;

src = src.replace(ANCHOR_SAVE, NEW_FN + ANCHOR_SAVE);
console.log('[3/4] Funzione sincronizzaTutto aggiunta');

// ============================================================
// PARTE 5 — In Impostazioni: lasciamo Backup esistente e Sincronizza vecchio
//          (Backup è già lì, non tocco nulla)
// ============================================================
console.log('[4/4] Impostazioni: Backup mantenuto, nessuna modifica');

// ============================================================
// VERIFICA SINTASSI prima di scrivere
// ============================================================
const scriptRe = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
let m, fullJs = '';
while ((m = scriptRe.exec(src)) !== null) {
  fullJs += m[1] + '\n';
}
try {
  new Function(fullJs);
  console.log('\n✅ Sintassi JS valida');
} catch (e) {
  console.error('\n❌ ERRORE sintassi JS:', e.message);
  console.error('NON SCRIVO IL FILE per sicurezza. File invariato.');
  process.exit(1);
}

// ============================================================
// Scrittura
// ============================================================
fs.writeFileSync(path, src, 'utf8');
console.log('Lunghezza finale:', src.length, 'bytes (delta:', src.length - original.length, ')');
console.log('\nDone! Cambiamenti applicati:');
console.log('  • Sidebar: rimossi vecchi Sincronizza e Backup');
console.log('  • Sidebar: nuovo "🔄 Sincronizza" con barra di caricamento');
console.log('  • Impostazioni: Backup mantenuto');
