// ── S2 — Le tre correzioni dell'audit di coerenza (4 ago 2026) ──
//
// Tutte e tre sono uscite confrontando la documentazione col codice: il documento
// diceva una cosa, il codice un'altra, e in questi tre casi aveva torto il codice.
// Nessuna era visibile usando il programma: sono difetti silenziosi.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const fs = require('fs');
const path = require('path');
const { loadApp } = require('./_loadApp');

const win = loadApp();
const SRC = fs.readFileSync(path.join(__dirname, '..', '..', 'index.html'), 'utf8');

// ── A1 — il cous cous è semola di grano duro ────────────────────────────────
// Stava fra i «Cereali senza Glutine» con gl:false, quindi l'interfaccia gli
// stampava accanto [SG]. Il validatore allergeni lo bloccava comunque sul celiaco
// (la parola è nella lista Glutine/Celiachia), ma la scritta a schermo era falsa:
// il nutrizionista e il paziente leggevano «senza glutine» su un derivato del grano.
test('A1 — il cous cous sta fra i cereali CON glutine ed è marcato gl:true', () => {
  const ALIMENTI = JSON.parse(win.eval('JSON.stringify(ALIMENTI)'));
  const dove = [];
  Object.keys(ALIMENTI).forEach(function(cat){
    (ALIMENTI[cat].items || []).forEach(function(it){
      if (it.n === 'Cous cous') dove.push({ cat: cat, gl: it.gl });
    });
  });
  assert.strictEqual(dove.length, 1, 'il cous cous deve comparire una volta sola: ' + JSON.stringify(dove));
  assert.strictEqual(dove[0].cat, 'Cereali con Glutine');
  assert.strictEqual(dove[0].gl, true, 'gl:false gli farebbe stampare accanto l\'etichetta [SG]');
});

test('A1 — nessun derivato del grano è rimasto fra i cereali senza glutine', () => {
  const ALIMENTI = JSON.parse(win.eval('JSON.stringify(ALIMENTI)'));
  const senza = (ALIMENTI['Cereali senza Glutine'] || {}).items || [];
  // Elenco volutamente stretto: solo nomi che sono grano al 100%, per non
  // trasformare il test in un indovino (il farro è grano, il bulgur è grano...).
  const grano = ['cous cous','couscous','bulgur','farro','orzo','kamut','seitan','semola','frik','freekeh'];
  senza.forEach(function(it){
    const n = String(it.n).toLowerCase();
    grano.forEach(function(g){
      assert.ok(n.indexOf(g) === -1,
        '«' + it.n + '» è un derivato del grano e non può stare fra i senza glutine');
    });
    assert.notStrictEqual(it.gl, true, '«' + it.n + '» è marcato gl:true dentro la categoria senza glutine');
  });
});

test('A1 — il cous cous resta nella lista allergeni Glutine/Celiachia', () => {
  // La rete di sicurezza non va persa spostando l'alimento di categoria.
  const riga = SRC.split('\n').find(function(l){ return l.indexOf("'Glutine / Celiachia':") >= 0; });
  assert.ok(riga, 'lista allergeni non trovata');
  assert.ok(/'cous cous'/.test(riga) && /'couscous'/.test(riga),
    'entrambe le grafie servono: il piano AI può scriverlo staccato o attaccato');
});

// ── A3 — la voce più specifica vince ────────────────────────────────────────
// La ricerca si fermava alla prima chiave che combaciava, e 'Pizza con condimenti'
// incontrava 'Pizza' prima di sé stessa: 1100 non era raggiungibile da nessuna
// scelta. Ogni sabato con la pizza condita il conto perdeva 200 kcal, in silenzio.
test('A3 — «Pizza con condimenti» vale 1100, non 900', () => {
  assert.strictEqual(win.eval("_kcalScelta('Pizza con condimenti')"), 1100);
  assert.strictEqual(win.eval("_kcalScelta('Pizza')"), 900, 'la pizza semplice non deve cambiare');
});

test('A3 — anche il piano usa la voce specifica, non solo il diario', () => {
  const paz = { weekend: 'Pizza con condimenti', regolePiano: { sabatolibero: true } };
  assert.strictEqual(win.eval('getKcalWeekend(' + JSON.stringify(paz) + ')'), 1100,
    'le due strade devono dare lo stesso numero, altrimenti il piano e il diario litigano');
});

test('A3 — ogni voce della tabella è raggiungibile da sé stessa', () => {
  // Il test che avrebbe trovato il difetto: se una chiave ne contiene un'altra,
  // quella più lunga deve comunque restituire il proprio valore.
  const KW = JSON.parse(win.eval('JSON.stringify(KCAL_WEEKEND)'));
  Object.keys(KW).forEach(function(k){
    assert.strictEqual(win.eval('_kcalScelta(' + JSON.stringify(k) + ')'), KW[k],
      'la voce «' + k + '» non restituisce il proprio valore: ne esiste una più corta che la intercetta');
  });
});

test('A3 — una scelta non in tabella resta sul valore di ripiego', () => {
  assert.strictEqual(win.eval("_kcalScelta('Kebab')"), 800);
  assert.strictEqual(win.eval("_kcalScelta('Non fatto (saltato)')"), 0);
  assert.strictEqual(win.eval("_kcalScelta('')"), 0);
});

// ── A2 — l'ordinamento inghiottito da un commento ───────────────────────────
// `.filter(...) // P142.slice().sort(...)` — tutto quello che segue un commento a
// fine riga è spento, e non si vede. La tendina elencava i pazienti in ordine di
// creazione invece che alfabetico.
test('A2 — la scelta del paziente nel generatore è ordinata per cognome e nome', () => {
  const i = SRC.indexOf('function _pickPaziente(');
  assert.ok(i > 0, 'funzione non trovata');
  const blocco = SRC.slice(i, i + 900);
  assert.ok(/\.sort\(/.test(blocco), 'l\'ordinamento deve esistere');
  assert.ok(/localeCompare/.test(blocco), 'e deve confrontare le stringhe, non i codici');
  // Il difetto vero: la sort dentro un commento a fine riga.
  blocco.split('\n').forEach(function(riga){
    const c = riga.indexOf('//');
    if (c >= 0) {
      assert.ok(riga.slice(c).indexOf('.sort(') === -1,
        'l\'ordinamento è finito dentro un commento a fine riga: ' + riga.trim().slice(0, 90));
    }
  });
});
