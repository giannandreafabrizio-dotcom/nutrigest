// ── S1 — LA DOCUMENTAZIONE SI DIFENDE DA SOLA (26 lug 2026) ──
// Nato da una settimana istruttiva: F5, F6 e F7 erano tutti "qualcosa di scritto
// che nessuno verificava" (campi letti da moduli che non li avevano più), e
// INDEX.md aveva 719 numeri di riga su 730 sbagliati NONOSTANTE l'intestazione
// dichiarasse un riallineo completo. La regola che ne esce: le dichiarazioni
// non si credono, si controllano — a ogni run dei test.
//
// Questo file rende ROSSI i test quando:
//  1. INDEX.md non è più allineato a index.html → rimedio: node rigenera-index.js
//  2. il codice legge un id che non esiste da nessuna parte (la famiglia F6/F7)
//     → rimedio: o l'elemento va ricreato, o la lettura va tolta, o l'id va
//       aggiunto alla lista sotto CON UNA RIGA DI MOTIVO. Mai ignorare.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', '..', 'index.html'), 'utf8');
const idx = fs.readFileSync(path.join(__dirname, '..', '..', 'INDEX.md'), 'utf8');

// ── 1. INDEX.md allineato ────────────────────────────────────────────────────
test('DOC — INDEX.md è allineato a index.html (se fallisce: node rigenera-index.js)', () => {
  const reale = {};
  html.split(/\r?\n/).forEach(function(l, i){
    const m = l.match(/^(?:async )?function (\w+)\s*\(/) || l.match(/^(?:const|let|var) (\w+)\s*=/);
    if (m && !(m[1] in reale)) reale[m[1]] = i + 1;
  });
  const sbagliate = [];
  let verificate = 0;
  let m;
  const re = /^- `(\d+)` — (\w+)/gm;
  while ((m = re.exec(idx)) !== null){
    const nome = m[2];
    if (!(nome in reale)) continue;      // funzioni annidate: non verificabili
    verificate++;
    if (reale[nome] !== +m[1]) sbagliate.push(nome + ': INDEX ' + m[1] + ' vs reale ' + reale[nome]);
  }
  assert.ok(verificate > 500, 'l\'indice deve coprire il grosso del file (verificate: ' + verificate + ')');
  assert.strictEqual(sbagliate.length, 0,
    sbagliate.length + ' voci disallineate (prime 5: ' + sbagliate.slice(0, 5).join(' · ') + '). Rimedio: cd test-suite && node rigenera-index.js');
});

// ── 2. Niente nuovi id orfani (la famiglia F6/F7) ────────────────────────────
// Ogni id qui sotto è stato CLASSIFICATO il 26 lug 2026. Se questo test fallisce
// con un id nuovo, qualcuno ha tolto un elemento dal markup lasciando la lettura
// nel codice: è esattamente come sono nati F6 (obiettivo azzerato a ogni
// salvataggio) e F7 (altezza e peso azzerati). Non aggiungere qui senza motivo.
const ORFANI_NOTI = {
  // pattern "rimuovi se esiste, poi crea": leggere prima di creare è il mestiere
  'mo-rich-analisi': 'popup creato al volo (P116)',
  'modello-popup-overlay': 'popup creato al volo',
  'piano-load-msg': 'messaggio di caricamento creato al volo',
  'popup-add-alt': 'popup legacy creato via createElement (.id=)',
  'popup-add-alt-bg': 'sfondo del popup legacy',
  'popup-ric': 'popup legacy creato via createElement (.id=)',
  'popup-ric-bg': 'sfondo del popup legacy',
  'popup-cat-alim': 'popup legacy creato via createElement (.id=)',
  'popup-cat-alim-bg': 'sfondo del popup legacy',
  'popup-ricetta-composta': 'popup legacy creato via createElement (.id=)',
  'popup-ricetta-composta-bg': 'sfondo del popup legacy',
  // letture con guardia if(el): innocue, l'elemento è di un layout non più attivo
  'dash-agenda': 'guardato con if(!el)return',
  'ss-url': 'guardato con if(urlEl)',
  'p-peso-target': 'campo rimosso; salvataggio protetto dalla catena di ripiego (P122 T1)',
  // situazioni note, documentate nel CHANGELOG del 26/7
  'cfg-url': 'CODICE MORTO: testConn() non è chiamata da nessun bottone',
  'mac-laf': 'selettore LAF manuale rimosso: il ripiego fissa 1.20 — nota in roadmap'
};

function idDefiniti(){
  const def = new Set();
  let m;
  const re1 = /id=\\?["']([A-Za-z0-9_\-]+)\\?["']/g;
  while ((m = re1.exec(html)) !== null) def.add(m[1]);
  const re2 = /\.id\s*=\s*["']([A-Za-z0-9_\-]+)["']/g;
  while ((m = re2.exec(html)) !== null) def.add(m[1]);
  return def;
}

test('DOC — nessun NUOVO id letto da getElementById che non esista da nessuna parte', () => {
  const def = idDefiniti();
  const nuovi = new Set();
  let m;
  const re = /getElementById\(\s*['"]([A-Za-z0-9_\-]+)['"]\s*\)/g;
  while ((m = re.exec(html)) !== null){
    if (!def.has(m[1]) && !(m[1] in ORFANI_NOTI)) nuovi.add(m[1]);
  }
  assert.strictEqual(nuovi.size, 0,
    'id letti ma MAI definiti (famiglia F6/F7): ' + Array.from(nuovi).join(', ') +
    '. O si ricrea l\'elemento, o si toglie la lettura, o si classifica in ORFANI_NOTI con un motivo.');
});

test('DOC — nessun NUOVO id orfano nelle letture via helper g/gn/gs (dove vivevano F6 e F7)', () => {
  const def = idDefiniti();
  const noti = new Set(['p-dove', 'p-peso-target']);   // p-dove: riscritto da getDove(); p-peso-target: catena di ripiego P122
  const nuovi = new Set();
  let m;
  const re = /\b(?:g|gn|gs|gv|sv|_gn|_gs|_g)\(\s*['"]([a-z][a-z0-9\-]{2,})['"]/g;
  while ((m = re.exec(html)) !== null){
    const id = m[1];
    if (id.indexOf('-') < 0) continue;                 // solo id-like
    if (!def.has(id) && !noti.has(id) && !(id in ORFANI_NOTI)) nuovi.add(id);
  }
  assert.strictEqual(nuovi.size, 0,
    'letture helper di id inesistenti: ' + Array.from(nuovi).join(', ') +
    '. È ESATTAMENTE come sono nati F6 e F7: un campo tolto dal markup con la lettura rimasta nel codice.');
});

// ── 3. Le strutture dati nuove sono documentate nel Contesto ─────────────────
test('DOC — il Contesto documenta le strutture dati che il codice usa', () => {
  const ctx = fs.readFileSync(path.join(__dirname, '..', '..', 'NutriGest_Contesto_v18.txt'), 'utf8');
  // p.* usati dal codice che DEVONO avere una casa nella sezione STRUTTURA DATI
  ['p.obiettivoPercorso', 'p.percorso', 'p.refertiSangue', 'p.consuntivo'].forEach(function(campo){
    const doc = ctx.indexOf(campo + ' = ') >= 0 || ctx.indexOf(campo + '[] = ') >= 0;
    assert.ok(doc, campo + ' usato dal codice ma non documentato in STRUTTURA DATI');
  });
});
