// step3_3_ricette.js — Step 3.3: ricette dinamiche nel Generatore UI
// - Pranzo/cena: 3 ricette default + possibilità di aggiungere la 4ª
// - Colazione/spuntini/pre-nanna: possibilità di aggiungere 1 ricetta
// - Pulsante 🗑 accanto a ogni ricetta per rimuoverla
// Eseguire con: node step3_3_ricette.js

const fs = require('fs');
const path = 'index.html';
let src = fs.readFileSync(path, 'utf8');

// === PARTE 1: sostituzione del blocco "ricette" dentro _renderCelleHtml ===
const OLD_RICETTE_BLOCK = `  // Ricette descrittive in cima (solo pranzo/cena) — cliccabili
  var giornoEscR = giorno.replace(/"/g,'&quot;');
  if (pasto.ricette && pasto.ricette.length) {
    html += '<div style="font-size:.75rem;color:var(--text2);margin:.3rem 0 .5rem;line-height:1.7;background:#f8fafc;border-radius:6px;padding:.4rem .6rem">';
    pasto.ricette.forEach(function(r, i) {
      if (r) html += '<div class="ric-edit" onclick="apriEditRicetta(\\''+giornoEscR+'\\',\\''+slotKey+'\\','+i+')" style="cursor:pointer;border-radius:4px;padding:1px 4px;transition:background .15s" onmouseover="this.style.background=\\'#e2e8f0\\'" onmouseout="this.style.background=\\'transparent\\'" title="Click per modificare"><span style="color:var(--teal);font-weight:600">' + (i+1) + '</span> → ' + r + '</div>';
    });
    html += '</div>';
  }`;

const NEW_RICETTE_BLOCK = `  // Ricette descrittive in cima — cliccabili + cestino + bottone aggiungi
  var giornoEscR = giorno.replace(/"/g,'&quot;');
  var maxRic = (slotKey === 'pranzo' || slotKey === 'cena') ? 4 : 1;
  var ricetteArr = (pasto.ricette || []).filter(function(r){ return r != null; });
  // Filtra le ricette davvero presenti (non-vuote)
  var ricetteVisibili = ricetteArr.filter(function(r){ return (r||'').trim() !== ''; });
  if (ricetteVisibili.length || maxRic > 0) {
    html += '<div style="font-size:.75rem;color:var(--text2);margin:.3rem 0 .5rem;line-height:1.7;background:#f8fafc;border-radius:6px;padding:.4rem .6rem">';
    ricetteArr.forEach(function(r, i) {
      if (!r || !(r||'').trim()) return;
      html += '<div style="display:flex;align-items:center;gap:6px;border-radius:4px;padding:1px 4px">';
      html += '<span class="ric-edit" onclick="apriEditRicetta(\\''+giornoEscR+'\\',\\''+slotKey+'\\','+i+')" style="flex:1;cursor:pointer;transition:background .15s" onmouseover="this.style.background=\\'#e2e8f0\\'" onmouseout="this.style.background=\\'transparent\\'" title="Click per modificare"><span style="color:var(--teal);font-weight:600">' + (i+1) + '</span> &rarr; ' + r + '</span>';
      html += '<button class="alt-ctrl alt-x" onclick="rimuoviRicetta(\\''+giornoEscR+'\\',\\''+slotKey+'\\','+i+')" title="Rimuovi ricetta" style="font-size:.7rem">🗑</button>';
      html += '</div>';
    });
    // Bottone aggiungi (visibile se non si è raggiunto il max)
    if (ricetteVisibili.length < maxRic) {
      var labelBtn = (slotKey === 'pranzo' || slotKey === 'cena')
        ? (ricetteVisibili.length === 0 ? '+ Aggiungi ricetta' : '+ Aggiungi ' + (ricetteVisibili.length+1) + 'ª ricetta')
        : '+ Aggiungi ricetta';
      html += '<div style="margin-top:.3rem"><button class="alt-add" onclick="aggiungiRicetta(\\''+giornoEscR+'\\',\\''+slotKey+'\\')">'+labelBtn+'</button></div>';
    }
    html += '</div>';
  }`;

if (!src.includes(OLD_RICETTE_BLOCK)) {
  console.error('ERRORE: blocco ricette in _renderCelleHtml non trovato');
  process.exit(1);
}
src = src.replace(OLD_RICETTE_BLOCK, NEW_RICETTE_BLOCK);
console.log('[1/3] OK — blocco ricette in _renderCelleHtml aggiornato');

// === PARTE 2: aggiunta funzioni aggiungiRicetta() e rimuoviRicetta() ===
// Le inserisco subito dopo la funzione apriEditRicetta
const ANCHOR_2 = `function apriEditRicetta(giorno, slotKey, idx) {
  var ctx = _trovaPasto(giorno, slotKey);
  if (!ctx || !ctx.pasto) return;
  if (!ctx.pasto.ricette) ctx.pasto.ricette = ['','',''];
  _mostraPopupEditRicetta(giorno, slotKey, idx, ctx.pasto.ricette[idx] || '');
}`;

const REPLACEMENT_2 = ANCHOR_2 + `

function aggiungiRicetta(giorno, slotKey) {
  // Aggiunge una nuova ricetta in coda all'array e apre subito il popup di modifica.
  var ctx = _trovaPasto(giorno, slotKey);
  if (!ctx || !ctx.pasto) return;
  if (!ctx.pasto.ricette) ctx.pasto.ricette = [];
  // Compatta eventuali stringhe vuote (legacy: pranzi/cene salvavano ['','',''])
  ctx.pasto.ricette = ctx.pasto.ricette.filter(function(r){ return (r||'').trim() !== ''; });
  var maxRic = (slotKey === 'pranzo' || slotKey === 'cena') ? 4 : 1;
  if (ctx.pasto.ricette.length >= maxRic) return;
  ctx.pasto.ricette.push('');
  _aggiornaPianoBox();
  if (window._pdfPiano) window._pdfPiano = window._pianoCorrente;
  // Apri direttamente il popup sulla nuova ricetta vuota
  apriEditRicetta(giorno, slotKey, ctx.pasto.ricette.length - 1);
}

function rimuoviRicetta(giorno, slotKey, idx) {
  var ctx = _trovaPasto(giorno, slotKey);
  if (!ctx || !ctx.pasto || !ctx.pasto.ricette) return;
  if (!confirm('Rimuovere questa ricetta?')) return;
  ctx.pasto.ricette.splice(idx, 1);
  _aggiornaPianoBox();
  if (window._pdfPiano) window._pdfPiano = window._pianoCorrente;
}`;

if (!src.includes(ANCHOR_2)) {
  console.error('ERRORE: ancora apriEditRicetta non trovata');
  process.exit(1);
}
// Verifica che le funzioni non esistano già (idempotenza)
if (src.includes('function aggiungiRicetta(giorno, slotKey)')) {
  console.log('[2/3] SKIP — aggiungiRicetta/rimuoviRicetta gia presenti');
} else {
  src = src.replace(ANCHOR_2, REPLACEMENT_2);
  console.log('[2/3] OK — aggiunte funzioni aggiungiRicetta() e rimuoviRicetta()');
}

// === PARTE 3: piccolo fix in apriEditRicetta per non forzare ['','',''] ===
// Vogliamo che, quando l'utente clicca su una ricetta con array di lunghezza variabile,
// non si "ripristinino" sempre a 3 stringhe vuote.
const OLD_INIT = `function apriEditRicetta(giorno, slotKey, idx) {
  var ctx = _trovaPasto(giorno, slotKey);
  if (!ctx || !ctx.pasto) return;
  if (!ctx.pasto.ricette) ctx.pasto.ricette = ['','',''];
  _mostraPopupEditRicetta(giorno, slotKey, idx, ctx.pasto.ricette[idx] || '');
}`;
const NEW_INIT = `function apriEditRicetta(giorno, slotKey, idx) {
  var ctx = _trovaPasto(giorno, slotKey);
  if (!ctx || !ctx.pasto) return;
  if (!ctx.pasto.ricette) ctx.pasto.ricette = [];
  // Garantisci lunghezza minima senza distruggere il contenuto esistente
  while (ctx.pasto.ricette.length <= idx) ctx.pasto.ricette.push('');
  _mostraPopupEditRicetta(giorno, slotKey, idx, ctx.pasto.ricette[idx] || '');
}`;
if (src.includes(OLD_INIT)) {
  src = src.replace(OLD_INIT, NEW_INIT);
  console.log('[3/3] OK — apriEditRicetta non forza piu array a lunghezza 3');
} else {
  console.log('[3/3] SKIP — apriEditRicetta gia aggiornata');
}

// === PARTE 4: anche la salvaRicetta del popup deve usare la stessa logica ===
const OLD_SALVA = `  function salvaRicetta(testo) {
    var ctx = _trovaPasto(giorno, slotKey);
    if (!ctx || !ctx.pasto) return;
    if (!ctx.pasto.ricette) ctx.pasto.ricette = ['','',''];
    ctx.pasto.ricette[idx] = (testo||'').trim();
    document.getElementById('popup-ric').remove();
    document.getElementById('popup-ric-bg').remove();
    _aggiornaPianoBox();
    if (window._pdfPiano) window._pdfPiano = window._pianoCorrente;
  }`;
const NEW_SALVA = `  function salvaRicetta(testo) {
    var ctx = _trovaPasto(giorno, slotKey);
    if (!ctx || !ctx.pasto) return;
    if (!ctx.pasto.ricette) ctx.pasto.ricette = [];
    while (ctx.pasto.ricette.length <= idx) ctx.pasto.ricette.push('');
    ctx.pasto.ricette[idx] = (testo||'').trim();
    document.getElementById('popup-ric').remove();
    document.getElementById('popup-ric-bg').remove();
    _aggiornaPianoBox();
    if (window._pdfPiano) window._pdfPiano = window._pianoCorrente;
  }`;
if (src.includes(OLD_SALVA)) {
  src = src.replace(OLD_SALVA, NEW_SALVA);
  console.log('[BONUS] OK — salvaRicetta nel popup aggiornata');
}

fs.writeFileSync(path, src, 'utf8');
console.log('\\nDone. File scritto: ' + path);
console.log('Lunghezza finale: ' + src.length + ' bytes');
