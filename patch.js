// patch.js — RIPARA il file: rimuove duplicazioni, aggiunge sincronizzaTutto pulita
// Eseguibile più volte senza creare duplicati (idempotente).
// Eseguire: node patch.js

const fs = require('fs');
const path = 'index.html';
let src = fs.readFileSync(path, 'utf8');
const original = src;

console.log('Lunghezza iniziale:', src.length, 'bytes');

// ============================================================
// PARTE 1 — Rimuovi TUTTE le occorrenze esistenti di sincronizzaTutto
// (sia funzioni JS sia pulsanti HTML)
// ============================================================

// 1a. Rimuovi tutte le righe di pulsanti sidebar duplicati
src = src.replace(/\s*<button id="btn-sync-tutto"[^>]*onclick="sincronizzaTutto\(\)"[^>]*>[^<]*<\/button>/g, '');

// 1b. Rimuovi tutte le righe di pulsanti impostazioni duplicati
src = src.replace(/\s*<button id="btn-sync-tutto-cfg"[^>]*onclick="sincronizzaTutto\(\)"[^>]*>[^<]*<\/button>/g, '');

// 1c. Rimuovi tutti i paragrafi di istruzioni duplicati
src = src.replace(/\s*<p style="font-size:\.75rem;color:var\(--text2\);margin-top:\.5rem">Premi <strong>Sincronizza tutto[^<]*<\/strong>[^<]*<\/p>/g, '');

// 1d. Rimuovi tutte le funzioni async sincronizzaTutto (sia bug che fix)
// Pattern: dall'inizio "async function sincronizzaTutto()" fino alla }, 3500); }\n
// Match non-greedy fino alla chiusura
const fnPattern = /async function sincronizzaTutto\(\)\{[\s\S]*?setTimeout\(function\(\)\{ if\(btn\) btn\.textContent='🔄 Sincronizza tutto'; \}, 3500\);\s*\}\s*\}\s*/g;
const fnMatches = src.match(fnPattern);
console.log('Funzioni sincronizzaTutto trovate:', fnMatches ? fnMatches.length : 0);
src = src.replace(fnPattern, '');

console.log('Dopo cleanup:', src.length, 'bytes');

// ============================================================
// PARTE 2 — Aggiungi UNA sola volta tutto, in modo pulito
// ============================================================

// 2a. Funzione sincronizzaTutto() — aggiunta prima di "async function save()"
const ANCHOR_SAVE = 'async function save(){saveLocal();await pushToSheets();}';
if (!src.includes(ANCHOR_SAVE)) {
  console.error('ERRORE: ancora save() non trovata');
  process.exit(1);
}

// IMPORTANTE: niente apostrofi non-escaped nelle stringhe!
const NEW_FN = `async function sincronizzaTutto(){
  var btn = document.getElementById('btn-sync-tutto');
  if(btn){ btn.disabled=true; btn.textContent='⏳ Sincronizzazione...'; }
  notif('⏳ Sincronizzazione in corso...', 2000);
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
  if(btn){
    btn.disabled = false;
    if(pullOk && pushOk){
      btn.textContent = '✅ Sincronizzato!';
      notif('✅ Sincronizzazione completata — dati aggiornati con Google Sheets', 3000);
    } else if(pullOk || pushOk){
      btn.textContent = '⚠️ Parziale';
      notif('⚠️ Sincronizzazione parziale', 4000);
    } else {
      btn.textContent = '❌ Errore';
      notif('❌ Sincronizzazione fallita — controlla connessione e URL Apps Script', 4000);
    }
    setTimeout(function(){ if(btn) btn.textContent='🔄 Sincronizza tutto'; }, 3500);
  }
}

`;

src = src.replace(ANCHOR_SAVE, NEW_FN + ANCHOR_SAVE);
console.log('[1/3] Funzione sincronizzaTutto aggiunta');

// 2b. Pulsante sidebar — aggiungo dopo "Backup"
const SIDEBAR_BACKUP = '<button class="btn-aside" onclick="esporta()">⬇ Backup</button>';
if (!src.includes(SIDEBAR_BACKUP)) {
  console.error('ERRORE: pulsante Backup sidebar non trovato');
  process.exit(1);
}
const SIDEBAR_NEW = SIDEBAR_BACKUP + '\n    <button id="btn-sync-tutto" class="btn-aside" onclick="sincronizzaTutto()" style="background:var(--teal);color:#fff;font-weight:600;border:none;margin-top:4px">🔄 Sincronizza tutto</button>';
src = src.replace(SIDEBAR_BACKUP, SIDEBAR_NEW);
console.log('[2/3] Pulsante sidebar aggiunto');

// 2c. Pulsante grande in Impostazioni — aggiungo dopo Sincronizza in pagina impostazioni
const SETTINGS_SYNC = '<button class="btn btn-g" onclick="syncNow()">↺ Sincronizza</button>';
if (src.includes(SETTINGS_SYNC)) {
  const SETTINGS_NEW = SETTINGS_SYNC + '\n        <button id="btn-sync-tutto-cfg" class="btn btn-p" onclick="sincronizzaTutto()" style="font-size:1rem;padding:.7rem 1.2rem">🔄 Sincronizza tutto</button>\n        <p style="font-size:.75rem;color:var(--text2);margin-top:.5rem">Premi <strong>Sincronizza tutto</strong> ogni volta che inizi e finisci di lavorare. Scarica i dati aggiornati da Google Sheets e li carica di nuovo, zero rischi di perdere dati.</p>';
  src = src.replace(SETTINGS_SYNC, SETTINGS_NEW);
  console.log('[3/3] Pulsante impostazioni aggiunto');
} else {
  console.log('[3/3] Pulsante impostazioni non aggiunto (ancora non trovata)');
}

// ============================================================
// PARTE 3 — Verifica sintassi del JS finale
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
  console.error('NON SCRIVO IL FILE per evitare di danneggiarlo. File invariato.');
  process.exit(1);
}

// ============================================================
// Scrittura
// ============================================================
fs.writeFileSync(path, src, 'utf8');
console.log('Lunghezza finale:', src.length, 'bytes (delta:', src.length - original.length, ')');
console.log('\nDone!');
