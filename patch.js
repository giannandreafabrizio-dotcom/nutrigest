// patch.js — Fix bug "storico piani sparisce durante sincronizzazione"
//
// CAUSA: db.piani non era inizializzato in 3 punti:
//   1. dichiarazione globale (riga ~1633)
//   2. loadLocal — gli array da garantire non includono 'piani'
//   3. pullFromSheets — stesso array
//
// EFFETTO: quando fai pull da Sheets, db viene sostituito ma db.piani
// dopo il pull potrebbe diventare undefined, e i piani spariscono.
//
// FIX: aggiungo 'piani' a tutti e 3 i punti.
//
// Idempotente + verifica sintassi.
// Eseguire: node patch.js

const fs = require('fs');
const path = 'index.html';
let src = fs.readFileSync(path, 'utf8');
const original = src;
console.log('Lunghezza iniziale:', src.length, 'bytes');

// ============================================================
// FIX 1 — dichiarazione globale di db
// ============================================================
const OLD_INIT = `let db={pazienti:[],ricette:[],eventi:[],entrate:[],disponibilita:{}};`;
const NEW_INIT = `let db={pazienti:[],ricette:[],eventi:[],entrate:[],piani:[],disponibilita:{}};`;
if (src.includes(OLD_INIT)) {
  src = src.replace(OLD_INIT, NEW_INIT);
  console.log('[1/3] OK — dichiarazione globale db ora include piani:[]');
} else if (src.includes(NEW_INIT)) {
  console.log('[1/3] SKIP — già aggiornato');
} else {
  console.log('[1/3] WARN — pattern dichiarazione db non trovato esattamente');
}

// ============================================================
// FIX 2 — loadLocal: garantisci che db.piani esista dopo caricamento da localStorage
// ============================================================
const OLD_LOAD = `function loadLocal(){try{const r=localStorage.getItem(DB_KEY);if(r){db=JSON.parse(r);['pazienti','ricette','eventi','entrate'].forEach(k=>{if(!db[k])db[k]=[];});if(!db.disponibilita)db.disponibilita={};}}catch(e){}}`;
const NEW_LOAD = `function loadLocal(){try{const r=localStorage.getItem(DB_KEY);if(r){db=JSON.parse(r);['pazienti','ricette','eventi','entrate','piani'].forEach(k=>{if(!db[k])db[k]=[];});if(!db.disponibilita)db.disponibilita={};}}catch(e){}}`;
if (src.includes(OLD_LOAD)) {
  src = src.replace(OLD_LOAD, NEW_LOAD);
  console.log('[2/3] OK — loadLocal ora garantisce db.piani:[]');
} else if (src.includes(NEW_LOAD)) {
  console.log('[2/3] SKIP — già aggiornato');
} else {
  console.log('[2/3] WARN — pattern loadLocal non trovato esattamente');
}

// ============================================================
// FIX 3 — pullFromSheets: garantisci che db.piani esista dopo pull
// ============================================================
const OLD_PULL = `if(data&&data.pazienti){db=data;['pazienti','ricette','eventi','entrate'].forEach(k=>{if(!db[k])db[k]=[];});if(!db.disponibilita)db.disponibilita={};saveLocal();localStorage.setItem('lastSync',Date.now());return true;}`;
const NEW_PULL = `if(data&&data.pazienti){db=data;['pazienti','ricette','eventi','entrate','piani'].forEach(k=>{if(!db[k])db[k]=[];});if(!db.disponibilita)db.disponibilita={};saveLocal();localStorage.setItem('lastSync',Date.now());return true;}`;
if (src.includes(OLD_PULL)) {
  src = src.replace(OLD_PULL, NEW_PULL);
  console.log('[3/3] OK — pullFromSheets ora preserva db.piani');
} else if (src.includes(NEW_PULL)) {
  console.log('[3/3] SKIP — già aggiornato');
} else {
  console.log('[3/3] WARN — pattern pullFromSheets non trovato esattamente');
}

// ============================================================
// FIX 4 — Importa file JSON: stesso pattern in due punti
// ============================================================
const importPattern1 = /\['pazienti','ricette','eventi','entrate'\]\.forEach\(k=>\{if\(!db\[k\]\)db\[k\]=\[\];\}\);/g;
const importMatches = src.match(importPattern1);
if (importMatches) {
  src = src.replace(importPattern1, "['pazienti','ricette','eventi','entrate','piani'].forEach(k=>{if(!db[k])db[k]=[];});");
  console.log('[4/4] OK — aggiornati', importMatches.length, 'punti residui (importa, ecc.)');
} else {
  console.log('[4/4] SKIP — nessun pattern residuo trovato');
}

// ============================================================
// VERIFICA SINTASSI
// ============================================================
const scriptRe = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
let m, fullJs = '';
while ((m = scriptRe.exec(src)) !== null) { fullJs += m[1] + '\n'; }
try {
  new Function(fullJs);
  console.log('\n✅ Sintassi JS valida');
} catch (e) {
  console.error('\n❌ ERRORE sintassi JS:', e.message);
  console.error('NON SCRIVO IL FILE per sicurezza.');
  process.exit(1);
}

fs.writeFileSync(path, src, 'utf8');
console.log('Lunghezza finale:', src.length, 'bytes (delta:', src.length - original.length, ')');
console.log('\nDone! Cambiamenti applicati.');
console.log('\n⚠️ NOTA: dopo il commit/push, sul PC fai un "Sincronizza" UNA VOLTA');
console.log('   per ri-pushare i piani che hai già su localStorage prima che spariscano.');
