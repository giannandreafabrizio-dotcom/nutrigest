// ── S2 — "Tutti" (selCatAl) non deve far sparire un colore automatico ──
// Audit al contrario, 4/5 ago 2026: il bottone "Tutti" sovrascriveva in blocco
// TUTTI gli alimenti di una categoria con lo stesso colore manuale, anche
// quelli marcati celeste/grigio scuro da applicaRegoloSemaforo per un motivo
// clinico (allergia, patologia) — senza ricordare l'origine e senza mostrarla
// più a schermo. A differenza del click singolo (togAl), non c'era alcuna
// protezione. Fabrizio, 5 ago 2026: "'tutti' si deve comportare come
// 'singolo' ... deve restare visibile che quell'alimento era o celeste o
// grigio scuro". Questi test fissano il comportamento corretto.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();
const inWin = o => win.eval('(' + JSON.stringify(o) + ')');

const CAT_INSACCATI = 'Insaccati & Salumi';
const K_NDUJA = "Insaccati & Salumi__'Nduja";
const CAT_PESCE = 'Pesce (Cena)';
const K_SGOMBRO = 'Pesce (Cena)__Sgombro';

// Prepara un paziente iperteso: applicaRegoloSemaforo marca la 'Nduja grigio
// scuro (alto sodio) e lo sgombro celeste (cardioprotettivo) — stessa coppia
// già usata in s2-semaforo-fonte-unica.test.js.
function pazienteIpertesoInEditor() {
  const p = inWin({ id: 'sel1', alimenti: {}, checkSemaforo: { 'pat-ipert': true } });
  win.applicaRegoloSemaforo(p);
  // ricarica motivazioni/stato esattamente come fa apriAlEditor (riga 5831)
  win.window._alStato = p.alimenti;
  win.window._alMotivazioni = p.motivazioniSemaforo;
  win.window._alGroupStato = {};
  win.window._alOrigineAuto = {};
  win.document.body.innerHTML = '<div id="al-editor"></div>';
  return p;
}

test('PRIMA DELLA CORREZIONE (baseline) — la Nduja parte grigio scuro per un iperteso', () => {
  const p = pazienteIpertesoInEditor();
  assert.strictEqual(win.window._alStato[K_NDUJA], 'grigioScuro');
  assert.ok((win.window._alMotivazioni[K_NDUJA].grigi || []).includes('Ipertensione'));
});

test('"Tutti" ricorda l\'origine automatica prima di sovrascrivere (come togAl)', () => {
  pazienteIpertesoInEditor();
  assert.strictEqual(win.window._alStato[K_NDUJA], 'grigioScuro', 'precondizione');
  win.selCatAl(CAT_INSACCATI);
  // "Tutti" può comunque scegliere "sì" per l'intera categoria...
  assert.strictEqual(win.window._alStato[K_NDUJA], 'si', 'il nutrizionista può ancora selezionare');
  // ...ma l'origine grigio scuro non è andata persa
  assert.strictEqual(win.window._alOrigineAuto[K_NDUJA], 'grigioScuro', 'origine registrata, come fa togAl sul singolo');
});

test('L\'origine resta VISIBILE nel badge dopo il rendering, con il marcatore di override', () => {
  pazienteIpertesoInEditor();
  win.selCatAl(CAT_INSACCATI);
  const html = win.document.getElementById('al-editor').innerHTML;
  assert.ok(html.includes('Alto sodio'), 'il badge della condizione originale (Ipertensione → Alto sodio) è ancora a video: ' + html.slice(0, 4000));
  assert.ok(html.includes('sem-override'), 'un indicatore distingue "scelta manuale sopra un automatico" da un automatico ancora attivo');
});

test('Il ciclo completo di "Tutti" torna al colore automatico di origine, non al neutro', () => {
  pazienteIpertesoInEditor();
  win.selCatAl(CAT_INSACCATI); // ''→sì
  win.selCatAl(CAT_INSACCATI); // sì→arancione
  win.selCatAl(CAT_INSACCATI); // arancione→rosso
  assert.strictEqual(win.window._alStato[K_NDUJA], 'rosso');
  win.selCatAl(CAT_INSACCATI); // rosso→'' (torna al neutro del GRUPPO)
  assert.strictEqual(win.window._alStato[K_NDUJA], 'grigioScuro',
    'tornando al neutro, l\'alimento che era automatico ci ritorna — prima di questa correzione sarebbe sparito');
  assert.strictEqual(win.window._alOrigineAuto[K_NDUJA], undefined, 'l\'origine "consumata" viene ripulita');
});

test('Un alimento MAI automatico si comporta esattamente come prima (nessuna regressione)', () => {
  const p = inWin({ id: 'sel2', alimenti: {}, checkSemaforo: {} });
  win.applicaRegoloSemaforo(p); // nessuna condizione spuntata: nessun colore automatico
  win.window._alStato = p.alimenti;
  win.window._alMotivazioni = p.motivazioniSemaforo || {};
  win.window._alGroupStato = {};
  win.window._alOrigineAuto = {};
  win.document.body.innerHTML = '<div id="al-editor"></div>';
  assert.strictEqual(win.window._alStato[K_SGOMBRO], undefined);
  win.selCatAl(CAT_PESCE);
  assert.strictEqual(win.window._alStato[K_SGOMBRO], 'si');
  assert.strictEqual(win.window._alOrigineAuto[K_SGOMBRO], undefined, 'nessuna origine da ricordare: non era mai stato automatico');
  win.selCatAl(CAT_PESCE); win.selCatAl(CAT_PESCE); win.selCatAl(CAT_PESCE); // → arancione → rosso → neutro
  assert.strictEqual(win.window._alStato[K_SGOMBRO], undefined, 'torna semplicemente vuoto, come sempre');
});

test('Un secondo giro di "Tutti" su un alimento già in stato manuale non riscrive l\'origine già salvata', () => {
  pazienteIpertesoInEditor();
  win.selCatAl(CAT_INSACCATI); // grigioScuro → si (origine salvata: grigioScuro)
  win.selCatAl(CAT_INSACCATI); // si → arancione: NON deve ri-registrare origine da 'si'
  assert.strictEqual(win.window._alOrigineAuto[K_NDUJA], 'grigioScuro', 'l\'origine resta quella vera, non "si"');
});
