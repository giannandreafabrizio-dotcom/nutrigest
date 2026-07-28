// ── S2 — Tab Comunicazione (P87 Tappa 3, 28 lug 2026) ──
// Copre le parti pure che possono rompersi in silenzio:
//   1) la compilazione dei template: i segnaposto {nome}/{cognome}/{appuntamento}
//      devono sparire SEMPRE dal testo — un segnaposto non sostituito che parte
//      su WhatsApp e' il bug piu' visibile che questa tab possa produrre;
//   2) {appuntamento} viene dal calendario REALE (getEventi: visita, tappe,
//      eventi manuali) e prende il primo appuntamento futuro, non uno a caso;
//   3) lo storico della tab mostra tutti i tipi del registro p.invii e il
//      filtro per tipo non perde voci.
//
// LIMITE DICHIARATO: apertura wa.me/mailto, clipboard e salvataggio template
// (prompt + localStorage) restano verificati manualmente nel browser.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();
const inWin = o => win.eval('(' + JSON.stringify(o) + ')');
win.eval('save = function(){}');

// NB: `db` e' dichiarata con let a livello di script, NON e' una proprieta'
// di window: si raggiunge solo valutando codice nello scope della pagina.
function pazInDb(extra) {
  const paz = Object.assign({ id: 'com-1', nome: 'Anna', cognome: 'Bianchi', tel: '333' }, extra || {});
  win.eval('db.pazienti = ' + JSON.stringify([paz]) + '; db.eventi = [];');
  return win.eval('db.pazienti[0]');
}
function eventoInDb(ev) {
  win.eval('db.eventi.push(' + JSON.stringify(ev) + ')');
}

// ── 1. Compilazione template ─────────────────────────────────────────────────
test('COMPILA — {nome} e {cognome} sostituiti, nessun segnaposto sopravvive', () => {
  const p = pazInDb();
  const out = win._comCompila('Ciao {nome} {cognome}, ci vediamo {appuntamento}.', p);
  assert.ok(out.indexOf('Anna') >= 0 && out.indexOf('Bianchi') >= 0);
  assert.ok(out.indexOf('{') < 0, 'nessuna graffa residua: ' + out);
});

test('COMPILA — senza appuntamenti futuri il segnaposto diventa un testo VISIBILE, non sparisce muto', () => {
  const p = pazInDb();
  const out = win._comCompila('Appuntamento: {appuntamento}', p);
  assert.ok(out.indexOf('nessun appuntamento') >= 0, out);
});

test('COMPILA — tutti i template di serie compilano senza lasciare segnaposti', () => {
  const p = pazInDb();
  const tpls = win.eval('COM_TEMPLATES');
  assert.ok(tpls.length >= 4, 'ci sono almeno 4 template di serie');
  for (let i = 0; i < tpls.length; i++) {
    const out = win._comCompila(tpls[i].testo, p);
    assert.ok(out.indexOf('{') < 0, 'template "' + tpls[i].titolo + '" lascia un segnaposto: ' + out);
  }
});

// ── 2. Prossimo appuntamento dal calendario reale ────────────────────────────
test('APPUNTAMENTO — prende il primo evento futuro del paziente, ignora passato e altri pazienti', () => {
  const p = pazInDb();
  eventoInDb({ id: 'e1', data: '2000-01-01', ora: '10:00', tipo: 'controllo', pazId: 'com-1' }); // passato
  eventoInDb({ id: 'e2', data: '2099-03-15', ora: '15:30', tipo: 'controllo', pazId: 'com-1' });
  eventoInDb({ id: 'e3', data: '2099-01-10', ora: '09:00', tipo: 'visita', pazId: 'ALTRO' });    // altro paziente
  eventoInDb({ id: 'e4', data: '2099-02-01', ora: '11:00', tipo: 'chiamata', pazId: 'com-1' }); // il piu' vicino
  const ev = win._comProssimoApp(p);
  assert.strictEqual(ev.data, '2099-02-01');
  const out = win._comCompila('{appuntamento}', p);
  assert.strictEqual(out, 'il 01/02/2099 alle 11:00');
});

test('APPUNTAMENTO — vede anche la visita iniziale del paziente (fonte dateCalendario/visitaData)', () => {
  const p = pazInDb({ visitaData: '2099-05-05' });
  const ev = win._comProssimoApp(p);
  assert.ok(ev && ev.data === '2099-05-05', 'la visita da scheda paziente entra nel calcolo');
});

// ── 3. Storico con filtri ────────────────────────────────────────────────────
test('STORICO — mostra tutti i tipi del registro e il filtro non perde voci', () => {
  const p = pazInDb({ invii: [
    { data: '2026-07-01', tipo: 'fodmap', titolo: 'Elenco FODMAP', url: '', esito: 'link' },
    { data: '2026-07-02', tipo: 'analisi', titolo: 'Controllo', url: 'http://x', esito: 'link', n: 3 },
    { data: '2026-07-03', tipo: 'messaggio', titolo: 'Promemoria appuntamento', url: '', esito: 'copiato' }
  ]});
  win.eval('_comFiltro=""');
  const tutti = win._comStoricoHtml(p);
  ['Elenco FODMAP', 'Controllo', 'Promemoria appuntamento', '3 voci', 'http://x'].forEach(function (s) {
    assert.ok(tutti.indexOf(s) >= 0, 'manca "' + s + '" nello storico completo');
  });
  win.eval('_comFiltro="messaggio"');
  const soloMsg = win._comStoricoHtml(p);
  assert.ok(soloMsg.indexOf('Promemoria appuntamento') >= 0);
  // NB: le etichette dei tipi ('Elenco FODMAP'...) compaiono SEMPRE nei chip del
  // filtro: per verificare l'esclusione si controllano stringhe che esistono
  // solo nelle RIGHE delle altre voci (url e conteggio della voce analisi).
  assert.ok(soloMsg.indexOf('http://x') < 0 && soloMsg.indexOf('3 voci') < 0, 'il filtro esclude le righe degli altri tipi');
  win.eval('_comFiltro=""');
});

test('STORICO — paziente senza invii: messaggio vuoto, nessun errore', () => {
  win.eval('_comFiltro=""');   // difensivo: non dipendere dallo stato del test precedente
  const h = win._comStoricoHtml(pazInDb());
  assert.ok(h.indexOf('Nessun invio registrato') >= 0);
});
