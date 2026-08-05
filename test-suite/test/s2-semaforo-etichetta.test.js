// ── S2 — P128 tappa 4: il semaforo legge anche l'etichetta (5 ago 2026) ─────
// DA DOVE NASCE, parole di Fabrizio: «se aggiungo il latte di una certa marca ed
// ho un paziente intollerante al lattosio, io voglio vedere che quel latte è
// grigio scuro e quindi sconsigliato per la sua patologia».
//
// Il difetto: il semaforo colorava solo per NOME, con liste di nomi propri. Un
// prodotto appena scansionato non è in nessuna lista, quindi entrava fra gli
// alimenti scegliibili per il paziente BIANCO — indistinguibile da uno
// controllato e approvato. Con un database che cresce col codice a barre è il
// rischio principale dell'app.
//
// LA REGOLA CHE QUESTI TEST DIFENDONO: null non è "va bene". Un'etichetta che
// non dice niente su una condizione non deve mai produrre un celeste.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp, puro } = require('./_loadApp');

const win = loadApp();
const et = o => win._offEstraiEtichetta(o, '8001', '2026-08-05');
const rec = (nome, prod) => ({ nome: nome, categoriaSem: 'Latte & Derivati',
  gDefault: 100, fonte: 'off', attivo: true, per100g: { kcal: 50, p: 3, c: 5, g: 2 },
  etichetta: prod ? et(prod) : null });

const LATTE = { allergens_tags: ['en:milk'], ingredients_text: 'Latte intero pastorizzato' };
const LATTE_SL = { allergens_tags: ['en:milk'], labels_tags: ['en:lactose-free'],
  ingredients_text: 'Latte intero delattosato, lattasi' };

// ═══ 1. Il caso che ha originato la voce ═════════════════════════════════
test('P128 — il latte di marca è GRIGIO per l intollerante al lattosio', () => {
  const v = win._semEtichettaValuta(rec('Latte Marca X', LATTE), 'all-lattosio');
  assert.strictEqual(v, 'grigio',
    'è il caso chiesto da Fabrizio: scansiono un latte, il paziente è intollerante, dev essere sconsigliato');
});

test('P128 — il latte SENZA LATTOSIO è celeste, non grigio', () => {
  const v = win._semEtichettaValuta(rec('Latte senza lattosio', LATTE_SL), 'all-lattosio');
  assert.strictEqual(v, 'celeste',
    'il prodotto fatto apposta per quel paziente non può risultargli sconsigliato');
});

test('P128 — lo stesso latte non dice niente sulle altre condizioni', () => {
  const r = rec('Latte Marca X', LATTE);
  assert.strictEqual(win._semEtichettaValuta(r, 'all-glutine'), null,
    'senza glutine dichiarato né presente, l etichetta tace — e tacere non è "va bene"');
  assert.strictEqual(win._semEtichettaValuta(r, 'pat-ipert'), null, 'il sodio non è dichiarato');
});

// ═══ 2. I numeri, con le soglie UK FSA ═══════════════════════════════════
test('P128 — sale sopra 1,5 g/100 g: grigio per l iperteso', () => {
  const salato = rec('Dado', { nutriments: { 'salt_100g': 18 }, ingredients_text: 'Sale, esaltatori, aromi' });
  assert.strictEqual(win._semEtichettaValuta(salato, 'pat-ipert'), 'grigio');
});

test('P128 — sale fino a 0,3 g/100 g: celeste', () => {
  const magro = rec('Passata', { nutriments: { 'salt_100g': 0.02 }, ingredients_text: 'Pomodoro 99,5%, basilico' });
  assert.strictEqual(win._semEtichettaValuta(magro, 'pat-ipert'), 'celeste');
});

test('P128 — SILENZIO: nella fascia media non si consiglia e non si sconsiglia', () => {
  const medio = rec('Pane', { nutriments: { 'salt_100g': 1.0 }, ingredients_text: 'Farina, acqua, sale, lievito' });
  assert.strictEqual(win._semEtichettaValuta(medio, 'pat-ipert'), null,
    'la fascia media è un non-verdetto, non un via libera');
});

test('P128 — SILENZIO: il dato mancante non produce MAI un celeste', () => {
  // È la regola più importante del blocco. Un prodotto di cui non conosciamo il
  // sodio non è un prodotto a basso sodio.
  const muto = rec('Prodotto X', { nutriments: {}, ingredients_text: 'Ingredienti vari e assortiti' });
  ['pat-ipert', 'pat-diabete', 'pat-lipidi'].forEach(function (c) {
    assert.strictEqual(win._semEtichettaValuta(muto, c), null, c + ': dato assente ≠ dato buono');
  });
});

test('P128 — SILENZIO: un alimento senza etichetta non viene toccato', () => {
  const crea = rec('Petto di pollo', null);
  ['pat-ipert', 'all-lattosio', 'all-glutine', 'pat-diabete'].forEach(function (c) {
    assert.strictEqual(win._semEtichettaValuta(crea, c), null,
      'sui CREA-INRAN continuano a valere le liste di nomi, e basta');
  });
});

test('P128 — SILENZIO: una condizione fuori perimetro non riceve verdetti', () => {
  const r = rec('Latte Marca X', LATTE);
  ['all-nichel', 'all-fodmap', 'pat-uricemia', 'pat-ossalati', 'pat-ibs',
   'pat-reflusso', 'pat-tiroid', 'csp-gravidanza', 'csp-allattamento', 'pat-irc'
  ].forEach(function (c) {
    assert.strictEqual(win._semEtichettaValuta(r, c), null,
      c + ': non si deduce dall etichetta e non si deve inventare');
  });
});

// ═══ 3. L integrazione col semaforo del paziente ═════════════════════════
// NOTA HARNESS: CATALOGO_ALIMENTI e ALIMENTI sono `const` top-level dello
// script, e in JSDOM i const NON diventano proprietà di window (le function sì).
// Si prendono con win.eval e poi si mutano in loco — il riferimento è lo stesso
// che vede il codice applicativo. CATALOGO_ALIMENTI è una **Map** (id → record),
// non un array: costruire il test su un array avrebbe collaudato una struttura
// che l app non ha (ed è così che il primo giro è stato scritto, sbagliato).
function pazConCatalogo(condizioni, records) {
  const CAT = win.eval('CATALOGO_ALIMENTI');
  const ALI = win.eval('ALIMENTI');
  CAT.clear();                 // è una Map: id → record
  Object.keys(ALI).forEach(k => delete ALI[k]);
  records.forEach(function (r, i) {
    r.id = r.id || ('test:' + i);
    CAT.set(r.id, r);
    if (!ALI[r.categoriaSem]) ALI[r.categoriaSem] = { items: [] };
    ALI[r.categoriaSem].items.push({ n: r.nome, g: r.gDefault, _custom: true });
  });
  const cs = {}; condizioni.forEach(function (c) { cs[c] = true; });
  return { id: 'T', checkSemaforo: cs, alimenti: {} };
}

test('P128 — il colore arriva davvero su p.alimenti, dove lo legge tutto il resto', () => {
  const p = pazConCatalogo(['all-lattosio'], [rec('Latte Marca X', LATTE)]);
  win.applicaRegoloSemaforo(p);
  assert.strictEqual(p.alimenti['Latte & Derivati__Latte Marca X'], 'grigioScuro',
    'è il valore che avvisi allergeni, generatore e PDF sanno già leggere');
  assert.ok((p.motivazioniSemaforo['Latte & Derivati__Latte Marca X'].grigi || []).indexOf('Lattosio') >= 0,
    'e il motivo deve arrivare al tooltip');
});

test('P128 — senza la condizione attiva il prodotto resta bianco', () => {
  const p = pazConCatalogo(['pat-diabete'], [rec('Latte Marca X', LATTE)]);
  win.applicaRegoloSemaforo(p);
  assert.strictEqual(p.alimenti['Latte & Derivati__Latte Marca X'], undefined,
    'il lattosio non è un problema di tutti i pazienti');
});

test('P128 — un colore messo A MANO non viene sovrascritto dall etichetta', () => {
  // Regola già valida per le liste di nomi: la scelta del nutrizionista vince.
  const p = pazConCatalogo(['all-lattosio'], [rec('Latte Marca X', LATTE)]);
  p.alimenti['Latte & Derivati__Latte Marca X'] = 'si';
  win.applicaRegoloSemaforo(p);
  assert.strictEqual(p.alimenti['Latte & Derivati__Latte Marca X'], 'si',
    'la scelta ultima è sempre del nutrizionista');
});

test('P128 — l alimento archiviato non entra nel semaforo', () => {
  const r = rec('Latte Marca X', LATTE); r.attivo = false;
  const p = pazConCatalogo(['all-lattosio'], [r]);
  win.applicaRegoloSemaforo(p);
  assert.strictEqual(p.alimenti['Latte & Derivati__Latte Marca X'], undefined);
});

test('P128 — due condizioni attive: il grigio vince sul celeste', () => {
  // Un prodotto senza lattosio ma salatissimo, su un paziente iperteso e
  // intollerante: deve restare sconsigliato.
  const r = rec('Formaggio delattosato stagionato', {
    allergens_tags: ['en:milk'], labels_tags: ['en:lactose-free'],
    nutriments: { 'salt_100g': 3.2 }, ingredients_text: 'Latte delattosato, sale, caglio' });
  const p = pazConCatalogo(['all-lattosio', 'pat-ipert'], [r]);
  win.applicaRegoloSemaforo(p);
  assert.strictEqual(p.alimenti['Latte & Derivati__Formaggio delattosato stagionato'], 'grigioScuro',
    'in conflitto vince la cautela');
  assert.strictEqual(p.motivazioniSemaforo['Latte & Derivati__Formaggio delattosato stagionato'].conflitto, true,
    'e il conflitto resta registrato, così il tooltip può spiegarlo');
});

// ═══ 4. P128 tappa 5 — quello che nessuno ha ancora guardato ════════════
// Il difetto che tutta P128 esiste per chiudere: la casella bianca significa
// "valutato e va bene" E "non l ho mai guardato", e a schermo sono identiche.
// Con prodotti che entrano da soli col codice a barre, un alimento mai valutato
// SEMBRA approvato.
const nv = p => p.nonValutati || {};

test('P128 — un prodotto scansionato è "da valutare" sulle condizioni non deducibili', () => {
  const p = pazConCatalogo(['all-lattosio', 'all-nichel', 'pat-uricemia'], [rec('Latte Marca X', LATTE)]);
  win.applicaRegoloSemaforo(p);
  const k = 'Latte & Derivati__Latte Marca X';
  assert.strictEqual(p.alimenti[k], 'grigioScuro', 'il lattosio lo sa dall etichetta');
  assert.deepStrictEqual(puro(nv(p)[k]), ['Nichel', 'Gotta/Iperuricemia'],
    'ma di nichel e purine non sa niente, e deve dirlo invece di lasciarlo bianco');
});

test('P128 — la condizione già coperta NON compare fra i da valutare', () => {
  const p = pazConCatalogo(['all-lattosio'], [rec('Latte Marca X', LATTE)]);
  win.applicaRegoloSemaforo(p);
  assert.strictEqual(nv(p)['Latte & Derivati__Latte Marca X'], undefined,
    'l unica condizione attiva ha un verdetto: non resta nessun buco');
});

test('P128 — anche un CELESTE conta come valutato', () => {
  // Il senza-lattosio riceve un verdetto positivo: è comunque una risposta.
  const p = pazConCatalogo(['all-lattosio'], [rec('Latte senza lattosio', LATTE_SL)]);
  win.applicaRegoloSemaforo(p);
  assert.strictEqual(p.alimenti['Latte & Derivati__Latte senza lattosio'], 'celeste');
  assert.strictEqual(nv(p)['Latte & Derivati__Latte senza lattosio'], undefined);
});

test('P128 — SILENZIO: i CREA-INRAN non sono mai "da valutare"', () => {
  // LA RIGA DI CONFINE. Le liste di nomi sono state costruite guardando proprio
  // il catalogo CREA: l assenza di un alimento dalla lista del nichel è una
  // DECISIONE, non un buco. Senza questa riga, dieci condizioni per 278 alimenti
  // sarebbero tutte da valutare e il segnale morirebbe il giorno stesso.
  const crea = rec('Petto di pollo', null); crea.fonte = 'crea';
  const p = pazConCatalogo(['all-nichel', 'all-fodmap', 'pat-uricemia'], [crea]);
  win.applicaRegoloSemaforo(p);
  assert.deepStrictEqual(puro(Object.keys(nv(p))), [],
    'sul catalogo curato a mano il bianco è una risposta, non un buco');
});

test('P128 — un colore messo a mano toglie il punto interrogativo', () => {
  const p = pazConCatalogo(['all-nichel', 'pat-uricemia'], [rec('Latte Marca X', LATTE)]);
  const k = 'Latte & Derivati__Latte Marca X';
  p.alimenti[k] = 'si';
  win.applicaRegoloSemaforo(p);
  assert.strictEqual(nv(p)[k], undefined,
    'il nutrizionista ha guardato e ha firmato: non c è più niente da valutare');
});

test('P128 — SILENZIO: nessuna condizione attiva, nessun "da valutare"', () => {
  const p = pazConCatalogo([], [rec('Latte Marca X', LATTE)]);
  win.applicaRegoloSemaforo(p);
  assert.deepStrictEqual(puro(Object.keys(nv(p))), [],
    'senza condizioni non c è niente da valutare: il paziente non ha patologie');
});

test('P128 — SILENZIO: l alimento archiviato non produce buchi', () => {
  const r = rec('Latte Marca X', LATTE); r.attivo = false;
  const p = pazConCatalogo(['all-nichel'], [r]);
  win.applicaRegoloSemaforo(p);
  assert.deepStrictEqual(puro(Object.keys(nv(p))), []);
});

test('P128 — i buchi si ricalcolano da capo, non si accumulano', () => {
  // Se il paziente perde una condizione, il buco relativo deve sparire: uno
  // stato stantio qui direbbe "da valutare" per una patologia che non ha più.
  const r = rec('Latte Marca X', LATTE);
  const p = pazConCatalogo(['all-nichel', 'pat-uricemia'], [r]);
  win.applicaRegoloSemaforo(p);
  assert.strictEqual(nv(p)['Latte & Derivati__Latte Marca X'].length, 2);
  p.checkSemaforo = { 'all-nichel': true };
  win.applicaRegoloSemaforo(p);
  assert.deepStrictEqual(puro(nv(p)['Latte & Derivati__Latte Marca X']), ['Nichel'],
    'tolta la gotta, il suo buco sparisce');
});
