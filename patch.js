// patch.js — aggiunge pulsante "🔄 Sincronizza tutto" a NutriGest
// Eseguire con: node patch.js dalla cartella nutrigest
// Da ora in poi tutti gli script si chiamano patch.js — sostituisci sempre il vecchio.

const fs = require('fs');
const path = 'index.html';
let src = fs.readFileSync(path, 'utf8');
const original = src;

// ============================================================
// PARTE 1: nuova funzione sincronizzaTutto()
// Fa: pull da Sheets → salva locale → push su Sheets → notifica
// ============================================================
const ANCHOR_SAVE = 'async function save(){saveLocal();await pushToSheets();}';
if (!src.includes(ANCHOR_SAVE)) {
  console.error('ERRORE: ancora save() non trovata'); process.exit(1);
}

const NEW_FN = `async function sincronizzaTutto(){
  // 1. Mostra stato "in corso"
  var btn = document.getElementById('btn-sync-tutto');
  if(btn){ btn.disabled=true; btn.textContent='⏳ Sincronizzazione...'; }
  notif('⏳ Sincronizzazione in corso...', 2000);

  var pullOk = false;
  var pushOk = false;
  var errMsg = '';

  // 2. PULL — scarica dati freschi da Google Sheets
  try {
    pullOk = await pullFromSheets();
    if(pullOk){
      renderPaz(); renderRic(); renderCal(); renderEntrate();
    }
  } catch(e) {
    errMsg = 'Pull fallito: ' + e.message;
    console.error('[SyncTutto] pull errore:', e);
  }

  // 3. PUSH — carica dati locali su Google Sheets (sempre, anche se pull ok)
  try {
    pushOk = await pushToSheets();
  } catch(e) {
    errMsg = (errMsg ? errMsg + ' | ' : '') + 'Push fallito: ' + e.message;
    console.error('[SyncTutto] push errore:', e);
  }

  // 4. Aggiorna timestamp UI
  var tsEl = document.getElementById('ss-ts');
  if(tsEl){ var now=new Date(); tsEl.textContent=now.toLocaleTimeString('it-IT',{hour:'2-digit',minute:'2-digit'})+' — '+now.toLocaleDateString('it-IT'); }

  // 5. Feedback finale
  if(btn){
    btn.disabled = false;
    if(pullOk && pushOk){
      btn.textContent = '✅ Sincronizzato!';
      notif('✅ Sincronizzazione completata — dati aggiornati con Google Sheets', 3000);
    } else if(pullOk || pushOk){
      btn.textContent = '⚠️ Parziale';
      notif('⚠️ Sincronizzazione parziale — ' + (pullOk?'pull ok':'pull fallito') + ' / ' + (pushOk?'push ok':'push fallito'), 4000);
    } else {
      btn.textContent = '❌ Errore';
      notif('❌ Sincronizzazione fallita — controlla la connessione e l\'URL Apps Script', 4000);
    }
    // Ripristina testo dopo 3 secondi
    setTimeout(function(){ if(btn) btn.textContent='🔄 Sincronizza tutto'; }, 3500);
  }
}

`;

src = src.replace(ANCHOR_SAVE, NEW_FN + ANCHOR_SAVE);
console.log('[1/3] OK — aggiunta funzione sincronizzaTutto()');

// ============================================================
// PARTE 2: pulsante nella sidebar (accanto a Sincronizza e Backup esistenti)
// ============================================================
const OLD_SIDEBAR_BTNS = `    <button class="btn-aside" onclick="syncNow()">↺ Sincronizza</button>
    <button class="btn-aside" onclick="esporta()">⬇ Backup</button>`;

const NEW_SIDEBAR_BTNS = `    <button class="btn-aside" onclick="syncNow()">↺ Sincronizza</button>
    <button class="btn-aside" onclick="esporta()">⬇ Backup</button>
    <button id="btn-sync-tutto" class="btn-aside" onclick="sincronizzaTutto()" style="background:var(--teal);color:#fff;font-weight:600;border:none;margin-top:4px">🔄 Sincronizza tutto</button>`;

if (!src.includes(OLD_SIDEBAR_BTNS)) {
  console.error('ERRORE: pulsanti sidebar non trovati'); process.exit(1);
}
src = src.replace(OLD_SIDEBAR_BTNS, NEW_SIDEBAR_BTNS);
console.log('[2/3] OK — pulsante nella sidebar');

// ============================================================
// PARTE 3: pulsante anche nella pagina Impostazioni (più grande, con istruzioni)
// ============================================================
const OLD_SETTINGS_BTN = `        <button class="btn btn-g" onclick="syncNow()">↺ Sincronizza</button>`;
const NEW_SETTINGS_BTN = `        <button class="btn btn-g" onclick="syncNow()">↺ Sincronizza</button>
        <button id="btn-sync-tutto-cfg" class="btn btn-p" onclick="sincronizzaTutto()" style="font-size:1rem;padding:.7rem 1.2rem">🔄 Sincronizza tutto</button>
        <p style="font-size:.75rem;color:var(--text2);margin-top:.5rem">Premi <strong>Sincronizza tutto</strong> ogni volta che inizi e finisci di lavorare. Scarica i dati aggiornati da Google Sheets e li carica di nuovo — zero rischi di perdere dati.</p>`;

if (!src.includes(OLD_SETTINGS_BTN)) {
  console.error('ERRORE: pulsante Sincronizza in Impostazioni non trovato'); process.exit(1);
}
src = src.replace(OLD_SETTINGS_BTN, NEW_SETTINGS_BTN);
console.log('[3/3] OK — pulsante grande in Impostazioni con istruzioni');

// ============================================================
// Scrittura file
// ============================================================
fs.writeFileSync(path, src, 'utf8');
const diff = src.length - original.length;
console.log('\nDone. Lunghezza finale: ' + src.length + ' bytes (+ ' + diff + ' bytes).');
console.log('\nCosa è cambiato:');
console.log('  • Sidebar: pulsante verde "🔄 Sincronizza tutto" sempre visibile');
console.log('  • Impostazioni: pulsante grande + istruzioni su quando usarlo');
console.log('  • Funzione sincronizzaTutto(): pull → push → feedback visivo');
