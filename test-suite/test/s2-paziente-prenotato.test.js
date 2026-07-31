// ── S2 — P142: il paziente nasce alla telefonata (31 lug 2026) ──
// Prima, un paziente esisteva per NutriGest solo quando veniva in studio. Ma la
// sua storia comincia alla telefonata, ed è lì che va mandato il messaggio di
// preparazione alla bioimpedenziometria — l'evento zero. Il freno era pratico:
// creare la scheda subito sporcava l'elenco con chi poi non si presenta.
//
// Lo stato 'prenotato' scioglie il nodo. Questi test fissano le tre regole che,
// se saltano, lo rendono peggio di niente:
//   1. NASCE da sé (prima visita futura), senza un campo in più da compilare;
//   2. si SPEGNE da sé alla prima misurazione — averlo misurato è la prova che
//      è venuto, e un cambio di stato che dipende dalla memoria di qualcuno è
//      un cambio di stato che prima o poi non avviene;
//   3. i prenotati stanno FUORI da conteggi e avvisi: altrimenti ogni persona
//      che telefona comparirebbe il giorno dopo come "InBody da fare" e come
//      "paziente sparito" — veri entrambi, inutili entrambi.
'use strict';
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();
const SORGENTE = fs.readFileSync(path.join(__dirname, '..', '..', 'index.html'), 'utf-8');
win.eval('save=function(){};saveLocal=function(){};notif=function(){};closeM=function(){};renderPaz=function(){};renderCal=function(){};openPaz=function(){};pushEventoSupabase=function(){};');

const gg = n => win.eval("(function(){var d=new Date();d.setDate(d.getDate()+(" + n + "));return ymdLoc(d);})()");
function setDb(pazienti, eventi) {
  win.eval('db.pazienti = ' + JSON.stringify(pazienti) + '; db.eventi = ' + JSON.stringify(eventi || []) + ';');
  return win.eval('db');
}

test('NASCE DA SÉ — prima visita nel futuro = prenotato, oggi = attivo', () => {
  // la regola vive in salvaPaz, sul ramo "paziente nuovo"
  const corpo = SORGENTE.slice(SORGENTE.indexOf('function salvaPaz'), SORGENTE.indexOf('async function openPaz'));
  assert.ok(/pd\.visitaData\s*>\s*today\(\)\)\s*pd\.stato\s*=\s*'prenotato'/.test(corpo),
    'un paziente nuovo con la visita in una data futura nasce prenotato');
  // e la regola sta SOLO sul ramo del paziente nuovo: modificare un paziente
  // esistente non deve poterlo rispedire in «In arrivo»
  const ramoModifica = corpo.slice(corpo.indexOf('if(editPazId){'), corpo.indexOf('}else{'));
  assert.strictEqual(/stato\s*=\s*'prenotato'/.test(ramoModifica), false);
});

test('SI SPEGNE DA SÉ — la prima misurazione lo toglie da «In arrivo»', () => {
  const corpo = SORGENTE.slice(SORGENTE.indexOf('function salvaInbody'), SORGENTE.indexOf('function delInbody'));
  assert.ok(/p\.stato===['"]prenotato['"]/.test(corpo) && /p\.stato\s*=\s*['"]{2}/.test(corpo),
    'salvaInbody riporta il paziente fra gli attivi');
});

test('L\'ELENCO — i prenotati hanno la loro vista e non sporcano quella normale', () => {
  const corpo = SORGENTE.slice(SORGENTE.indexOf('function renderPaz()'), SORGENTE.indexOf('function _renderPazLista'));
  assert.ok(/fStato===['"]in-arrivo['"]/.test(corpo), 'esiste il filtro «In arrivo»');
  assert.ok(/stato!==['"]archiviato['"]&&p\.stato!==['"]prenotato['"]/.test(corpo),
    'l\'elenco normale li esclude');
  assert.ok(/id="f-paz-stato"[^>]*>[\s\S]{0,600}?value="in-arrivo"/.test(SORGENTE),
    'e la voce c\'è anche nella tendina, non solo nel codice');
});

test('L\'ETICHETTA — un prenotato in ritardo si vede che è in ritardo', () => {
  const inArrivo = win._pazStatoTagHtml(win.eval("({id:'a',stato:'prenotato',visitaData:'" + gg(7) + "'})"));
  assert.ok(inArrivo.indexOf('Prenotato') >= 0);
  assert.strictEqual(inArrivo.indexOf('Non presentato'), -1);
  const scaduto = win._pazStatoTagHtml(win.eval("({id:'a',stato:'prenotato',visitaData:'" + gg(-3) + "'})"));
  assert.ok(scaduto.indexOf('Non presentato') >= 0, 'il giorno è passato ed è ancora prenotato: è il dato del no-show');
  // e un paziente normale non è toccato da niente di tutto questo
  const normale = win._pazStatoTagHtml(win.eval("({id:'b',inizioAlim:'" + gg(-3) + "'})"));
  assert.strictEqual(normale.indexOf('Prenotato'), -1);
});

test('LA VIA D\'USCITA MANUALE — «✓ È arrivato», e in un senso solo', () => {
  // Chi viene ma non viene misurato resterebbe in «In arrivo» per sempre, e una
  // vista che accumula scarti smette di essere guardata.
  const db = setDb([{ id: 'x1', nome: 'Lia', cognome: 'V', stato: 'prenotato', visitaData: gg(-1) }]);
  win.pazSegnaArrivato('x1');
  assert.strictEqual(db.pazienti[0].stato, '');
  // nessun bottone per il verso opposto: un campo che si gira in due sensi è un
  // campo che prima o poi qualcuno gira per sbaglio
  assert.strictEqual(/function\s+pazSegnaPrenotato/.test(SORGENTE), false);
});

test('FUORI DAI CONTI E DAGLI AVVISI — un prenotato non è ancora un paziente', () => {
  const dash = SORGENTE.slice(SORGENTE.indexOf('function renderDashboard'), SORGENTE.indexOf('function renderScadenzeAlert'));
  assert.ok(/stato!==['"]archiviato['"]&&p\.stato!==['"]prenotato['"]/.test(dash),
    'il KPI "pazienti" non li conta');
  const scad = SORGENTE.slice(SORGENTE.indexOf('function renderScadenzeAlert'));
  assert.ok(/stato !== 'archiviato' && p\.stato !== 'prenotato'/.test(scad),
    'e le scadenze li saltano: senza, ogni telefonata diventa un avviso "InBody da fare"');
  // e il generatore di piani non propone chi non è ancora venuto
  assert.ok(/stato!=='archiviato'&&p\.stato!=='prenotato';\}\) \/\/ P142/.test(SORGENTE));
});

test('GLI ESISTENTI NON VENGONO RICLASSIFICATI', () => {
  // Non si può sapere se un paziente vecchio senza misurazioni sia un no-show o
  // semplicemente uno mai misurato: marcarlo sarebbe inventare un fatto.
  // Nessuna migrazione deve scrivere 'prenotato' da nessuna parte.
  ['_appMigraTutti', '_appMigraPaziente', 'loadLocal'].forEach(function (f) {
    const i = SORGENTE.indexOf('function ' + f);
    if (i < 0) return;
    assert.strictEqual(/stato\s*=\s*['"]prenotato['"]/.test(SORGENTE.slice(i, i + 2500)), false,
      f + ' non deve marcare nessuno come prenotato');
  });
});
