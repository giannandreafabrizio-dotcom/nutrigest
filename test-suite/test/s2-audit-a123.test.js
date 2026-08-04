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

// ══ A4 — vita/fianchi: le due scale seguivano regole diverse fra i sessi ══════
// Soglia OMS (Waist Circumference and Waist-Hip Ratio, Expert Consultation 2008,
// pubblicata 2011): obesità centrale da 0,90 nell'uomo e da 0,85 nella donna.
// La scala femminile era già così — rosso sopra 0,85, giallo nei cinque centesimi
// sotto. Quella maschile dava verde fino a 0,90 e rosso solo sopra 1,00: un uomo a
// 0,95, per l'OMS già in obesità centrale, compariva GIALLO.
function semWhr(sesso, valore) {
  const def = JSON.parse(win.eval("JSON.stringify(CALCOLI_CLINICI.find(function(x){return x.id==='whr';}).soglie)"));
  for (let i = 0; i < def.length; i++) {
    const s = def[i];
    if (s.sesso && s.sesso !== sesso) continue;
    if (s.max == null || valore <= s.max) return s.sem;
  }
  return null;
}

test('A4 — la soglia OMS vale per entrambi i sessi: 0,90 uomo e 0,85 donna', () => {
  assert.strictEqual(semWhr('M', 0.95), 'rosso', 'un uomo a 0,95 è oltre la soglia OMS, non può essere giallo');
  assert.strictEqual(semWhr('M', 0.92), 'rosso');
  assert.strictEqual(semWhr('F', 0.87), 'rosso', 'una donna a 0,87 è oltre la soglia OMS');
});

test('A4 — la fascia gialla è simmetrica: i cinque centesimi sotto la soglia', () => {
  assert.strictEqual(semWhr('M', 0.88), 'giallo', 'uomo fra 0,85 e 0,90');
  assert.strictEqual(semWhr('M', 0.84), 'verde');
  assert.strictEqual(semWhr('F', 0.83), 'giallo', 'donna fra 0,80 e 0,85');
  assert.strictEqual(semWhr('F', 0.78), 'verde');
});

test('A4 — la banda del grafico InBody usa le stesse due soglie del semaforo', () => {
  const rif = JSON.parse(win.eval('JSON.stringify(_IB_RIF.whr)'));
  assert.strictEqual(rif.M.hi, 0.90, 'il tetto della banda maschile è la soglia OMS');
  assert.strictEqual(rif.F.hi, 0.85, 'e quello femminile pure');
  // Con questo, grafico e scheda non possono più dire cose opposte sullo stesso numero:
  // sopra la banda è sopra la soglia OMS, ed è rosso anche nel semaforo.
  assert.strictEqual(semWhr('M', rif.M.hi + 0.01), 'rosso');
  assert.strictEqual(semWhr('F', rif.F.hi + 0.01), 'rosso');
});

// ══ A5 — il colesterolo totale da solo non decide ════════════════════════════
// Prima c'era una soglia secca a 190: un 195 risultava «sopra desiderabile» qui e
// «dentro il riferimento» nella tabella di laboratorio (che si ferma a 200). I due
// numeri non sono in contraddizione — 200 è l'intervallo del laboratorio, 190 il
// target prudenziale — ma la fascia in mezzo da sola non dice niente.
// Decisione di Fabrizio (4 ago 2026): si evidenzia SOLO se HDL o LDL non sono a posto.
function paz(sesso, hdl, ldl) {
  const a = {};
  if (hdl != null) a['HDL_val'] = hdl;
  if (ldl != null) a['LDL_val'] = ldl;
  return { sesso: sesso, analisiSangue: a };
}
function interpTot(v, p) {
  return JSON.parse(win.eval('JSON.stringify(interpretaAnalisi("Colesterolo totale", ' + v + ', ' + JSON.stringify(p) + '))'));
}

test('A5 — sotto 190 e sopra 200 il giudizio non dipende dal resto del profilo', () => {
  assert.strictEqual(interpTot(185, paz('M', 30, 150)).et, 'desiderabile');
  assert.strictEqual(interpTot(210, paz('M', 60, 90)).et, 'sopra il riferimento di laboratorio');
});

test('A5 — fra 190 e 200 si evidenzia solo se HDL o LDL non sono a posto', () => {
  const conHdlBasso = interpTot(195, paz('M', 35, 100));
  assert.strictEqual(conHdlBasso.sem, 'giallo');
  assert.ok(/HDL basso/.test(conHdlBasso.et), conHdlBasso.et);

  const conLdlAlto = interpTot(195, paz('M', 55, 130));
  assert.strictEqual(conLdlAlto.sem, 'giallo');
  assert.ok(/LDL/.test(conLdlAlto.et), conLdlAlto.et);

  const profiloBuono = interpTot(195, paz('M', 55, 100));
  assert.strictEqual(profiloBuono.sem, 'info', 'con HDL e LDL a posto non si allarma per il totale');
  assert.ok(/nella norma/.test(profiloBuono.et), profiloBuono.et);
});

test('A5 — la soglia HDL segue il sesso, come nella voce HDL', () => {
  // Donna a 45: sotto la soglia femminile (50) ma sopra quella maschile (40).
  assert.strictEqual(interpTot(195, paz('F', 45, 100)).sem, 'giallo');
  assert.strictEqual(interpTot(195, paz('M', 45, 100)).sem, 'info');
});

test('A5 — senza HDL e LDL non si inventa un giudizio, si dice che mancano', () => {
  const senza = interpTot(195, paz('M', null, null));
  assert.strictEqual(senza.sem, 'info');
  assert.ok(/servono HDL e LDL/.test(senza.et), senza.et);
});
