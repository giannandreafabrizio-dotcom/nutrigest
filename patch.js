// ═══════════════════════════════════════════════════════════════════════════
// NutriGest — patch.js
// FIX BUG CRITICO: pushToSheets per body > 30KB (chunking + verifica hash)
// Data: 5 maggio 2026
// ═══════════════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, 'index.html');
let html = fs.readFileSync(FILE, 'utf8');

// ─── 1. Trova e sostituisci la vecchia pushToSheets ────────────────────────
const oldPush = `async function pushToSheets(){
  const url=getUrl();
  if(!url){setSyncStatus(false);return false;}
  try{
    await fetch(url,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/json'},body:JSON.stringify(db)});
    localStorage.setItem('lastSync',Date.now());
    setSyncStatus(true);
    return true;
  }catch(e){
    setSyncStatus(false);
    notif('⚠ Sync fallito — dati salvati solo in locale',3500);
    console.error('[Sync] push ERRORE:',e);
    return false;
  }
}`;

const newPush = `// ─── Hash deterministico (FNV-1a 32 bit) per verifica integrita ──────────
function _hashDb(str){
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++){
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h.toString(36);
}

// ─── Encoding sicuro per Unicode (accenti italiani, emoji, ecc.) ──────────
function _b64encode(str){
  return btoa(unescape(encodeURIComponent(str)));
}

// ─── Verifica via GET che il server abbia salvato l'hash atteso ───────────
async function _verifyHash(url, expectedHash){
  try{
    const r = await fetch(url + '?action=getHash', {method:'GET', mode:'cors'});
    if(!r.ok) return false;
    const data = await r.json();
    return data && data.hash === expectedHash;
  }catch(e){
    console.error('[Sync] verifyHash errore:', e);
    return false;
  }
}

// ─── Push singolo (legacy, per db piccoli) ────────────────────────────────
async function _pushSingle(url, jsonStr){
  await fetch(url, {
    method:'POST', mode:'no-cors',
    headers:{'Content-Type':'application/json'},
    body: jsonStr
  });
}

// ─── Push chunked: divide in pezzi da 20KB e verifica via hash ────────────
async function _pushChunked(url, jsonStr, expectedHash){
  const encoded = _b64encode(jsonStr);
  const CHUNK_SIZE = 20000; // 20KB per chunk (sotto soglia ~30KB di Chrome)
  const chunks = [];
  for (let i = 0; i < encoded.length; i += CHUNK_SIZE){
    chunks.push(encoded.slice(i, i + CHUNK_SIZE));
  }
  const tot = chunks.length;
  const sessionId = Date.now().toString(36) + Math.random().toString(36).slice(2,8);

  console.log('[Sync] push chunked: ' + tot + ' chunk da ~20KB, sessionId=' + sessionId);

  // Init sessione (resetta eventuali chunk parziali precedenti)
  await fetch(url, {
    method:'POST', mode:'no-cors',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({action:'chunkInit', sessionId, tot, hash: expectedHash})
  });

  // Invio sequenziale dei chunk
  for (let i = 0; i < tot; i++){
    await fetch(url, {
      method:'POST', mode:'no-cors',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({action:'chunk', sessionId, idx:i, data: chunks[i]})
    });
    // Piccola pausa per non saturare (Apps Script ha limiti di concorrenza)
    if (i < tot - 1) await new Promise(r => setTimeout(r, 50));
  }

  // Commit: server riassembla, valida JSON, scrive A1
  await fetch(url, {
    method:'POST', mode:'no-cors',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({action:'chunkCommit', sessionId})
  });
}

// ─── pushToSheets — versione affidabile con verifica hash ─────────────────
async function pushToSheets(){
  const url = getUrl();
  if(!url){ setSyncStatus(false); return false; }

  const jsonStr = JSON.stringify(db);
  const sizeKB = Math.round(jsonStr.length / 1024);
  const expectedHash = _hashDb(jsonStr);
  console.log('[Sync] push: db ' + sizeKB + 'KB, hash=' + expectedHash);

  // Soglia: db < 25KB usa POST singolo, altrimenti chunked
  const SOGLIA_KB = 25;

  try{
    if (sizeKB < SOGLIA_KB){
      await _pushSingle(url, jsonStr);
    } else {
      await _pushChunked(url, jsonStr, expectedHash);
    }

    // VERIFICA via GET che il server abbia davvero ricevuto i dati
    // Attendi ~800ms per dare tempo al server di completare la scrittura
    await new Promise(r => setTimeout(r, 800));
    let ok = await _verifyHash(url, expectedHash);

    // Un retry se la prima verifica fallisce
    if (!ok){
      console.warn('[Sync] verifica hash fallita, retry tra 1.5s...');
      await new Promise(r => setTimeout(r, 1500));
      ok = await _verifyHash(url, expectedHash);
    }

    if (ok){
      localStorage.setItem('lastSync', Date.now());
      setSyncStatus(true);
      console.log('[Sync] push OK (hash verificato)');
      return true;
    } else {
      // Retry completo: forza chunked anche se db piccolo
      console.warn('[Sync] hash mismatch dopo retry, tento chunked forzato...');
      await _pushChunked(url, jsonStr, expectedHash);
      await new Promise(r => setTimeout(r, 1200));
      ok = await _verifyHash(url, expectedHash);
      if (ok){
        localStorage.setItem('lastSync', Date.now());
        setSyncStatus(true);
        console.log('[Sync] push OK al secondo tentativo');
        return true;
      }
      throw new Error('hash mismatch dopo 2 tentativi');
    }
  } catch(e){
    setSyncStatus(false);
    notif('⚠ Sync fallito — dati salvati solo in locale', 3500);
    console.error('[Sync] push ERRORE:', e);
    return false;
  }
}`;

if (!html.includes(oldPush)) {
  console.error('❌ ERRORE: vecchia pushToSheets non trovata. Patch annullata.');
  process.exit(1);
}
html = html.replace(oldPush, newPush);
console.log('✓ Sostituita pushToSheets()');

// ─── 2. Salva il file ─────────────────────────────────────────────────────
fs.writeFileSync(FILE, html, 'utf8');
console.log('✓ index.html aggiornato (' + html.length + ' bytes)');
console.log('');
console.log('PROSSIMI PASSI:');
console.log('  1. Aggiornare apps_script.gs (vedi file allegato)');
console.log('  2. Redeploy Web App in Apps Script (Deploy → Manage deployments → Edit → New version)');
console.log('  3. git add . && git commit -m "Fix critico: pushToSheets con chunking e verifica hash" && git push');
