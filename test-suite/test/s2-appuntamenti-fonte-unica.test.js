// ── S2 — P140 Tappa 1: l'appuntamento ha UNA sola fonte ──
// Fino al 30 lug 2026 getEventi() componeva il calendario da TRE posti che
// descrivono lo stesso fatto — p.visitaData, p.dateCalendario e db.eventi — e
// solo db.eventi aveva il campo `ora`. Il messaggio di preparazione usciva
// quindi senza orario, la stessa visita poteva comparire due volte, e un
// appuntamento nato dall'anagrafica non aveva id (dal calendario non lo potevi
// né spostare né cancellare).
//
// La scoperta che ha dato la forma alla soluzione: le tre fonti NON descrivono
// la stessa cosa. Quattro delle cinque date di dateCalendario (primo, chiamata,
// sett2, sett3) sono promemoria per il nutrizionista — nessuno si presenta in
// studio, un orario non serve. Gli unici appuntamenti veri sono la PRIMA VISITA
// e il CONTROLLO. Da qui: dateCalendario = pianificazione, db.eventi =
// calendario, e p.visitaData/p.controlloData restano come SPECCHIO leggibile.
//
// Questi test fissano il risultato e, soprattutto, i due modi in cui questa
// correzione può tornare a rompersi: l'id casuale (che rifà il doppione al
// primo sync fra PC e iPhone) e lo specchio cancellato senza spegnere il campo
// (che fa RISORGERE l'appuntamento alla ricarica dopo).
'use strict';
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();
const SORGENTE = fs.readFileSync(path.join(__dirname, '..', '..', 'index.html'), 'utf-8');

// NB: `db` è dichiarata con let a livello di script, NON è una proprietà di
// window: si raggiunge solo valutando codice nello scope della pagina.
function setDb(pazienti, eventi) {
  win.eval('db.pazienti = ' + JSON.stringify(pazienti) + '; db.eventi = ' + JSON.stringify(eventi || []) + ';');
  return win.eval('db');
}
win.eval('save = function(){}; saveLocal = function(){};');
const PAZ_BASE = {
  id: 'p1', nome: 'Mario', cognome: 'Rossi', tel: '3331112222',
  visitaData: '2026-08-12', controlloData: '',
  inizioAlim: '2026-08-15',
  dateCalendario: { primo: '2026-08-15', chiamata: '2026-08-22', sett2: '2026-08-29', sett3: '2026-09-05', controllo: '2026-09-12' }
};

test('MIGRAZIONE — la prima visita in anagrafica diventa un evento vero di calendario', () => {
  const db = setDb([PAZ_BASE]);
  win._appMigraTutti(db.pazienti);
  assert.strictEqual(db.eventi.length, 1, 'un solo evento creato');
  assert.strictEqual(db.eventi[0].tipo, 'visita');
  assert.strictEqual(db.eventi[0].data, '2026-08-12');
  assert.strictEqual(db.eventi[0].ora, '', 'nessun orario inventato per gli appuntamenti storici');
  assert.strictEqual(db.eventi[0].origin, 'anagrafica');
});

test('ID DETERMINISTICO — due dispositivi che migrano in parallelo producono lo STESSO id', () => {
  // È il punto che con uid() sarebbe un bug: PC e iPhone eseguono la migrazione
  // ognuno per conto proprio e al primo sync nascerebbe il doppione che questa
  // voce elimina. Con l'id deterministico i due record si sovrappongono.
  const dbA = setDb([PAZ_BASE]); win._appMigraTutti(dbA.pazienti);
  const idA = dbA.eventi[0].id;
  const dbB = setDb([PAZ_BASE]); win._appMigraTutti(dbB.pazienti);
  const idB = dbB.eventi[0].id;
  assert.strictEqual(idA, idB);
  assert.strictEqual(idA, 'anag-visita-p1');
  assert.strictEqual(/uid\(\)/.test(SORGENTE.slice(SORGENTE.indexOf('function _appSyncPaz'), SORGENTE.indexOf('function _appMigraPaziente'))), false,
    'lo specchio non deve mai generare id casuali');
});

test('IDEMPOTENZA — rigirare la migrazione non cambia più nulla', () => {
  const db = setDb([PAZ_BASE]);
  win._appMigraTutti(db.pazienti);
  const dopoUno = JSON.stringify({ p: db.pazienti, e: db.eventi });
  win._appMigraTutti(db.pazienti);
  win._appMigraTutti(db.pazienti);
  assert.strictEqual(JSON.stringify({ p: db.pazienti, e: db.eventi }), dopoUno);
});

test('IL CONTROLLO NON SI INVENTA — il +28 giorni sparisce da dati e sorgente', () => {
  // Regola 11 del CLAUDE.md: un valore di ripiego silenzioso su un dato che
  // ordina il tempo è un bug in attesa. Il controllo si concorda col paziente
  // (14 gg in keto, 25, 32… dipende): o c'è, o non c'è.
  const db = setDb([PAZ_BASE]);
  win._appMigraTutti(db.pazienti);
  assert.strictEqual(db.pazienti[0].dateCalendario.controllo, null, 'il +28 ereditato viene azzerato');
  assert.strictEqual(/addDays\(ini,\s*28\)/.test(SORGENTE), false, 'salvaPaz non lo riscrive più');
  // la pianificazione vera invece resta intatta
  assert.strictEqual(db.pazienti[0].dateCalendario.chiamata, '2026-08-22');
  assert.strictEqual(db.pazienti[0].dateCalendario.sett3, '2026-09-05');
});

test('CALENDARIO — nessun doppione, e la visita è finalmente cliccabile', () => {
  const db = setDb([PAZ_BASE]);
  win._appMigraTutti(db.pazienti);
  const ev = win.getEventi();
  const visite = ev.filter(e => e.tipo === 'visita');
  assert.strictEqual(visite.length, 1, 'una sola visita, non due');
  assert.ok(visite[0].id, 'ha un id: dal calendario si può spostare e cancellare');
  assert.strictEqual(ev.filter(e => e.tipo === 'controllo').length, 0, 'nessun controllo fantasma');
  assert.strictEqual(ev.filter(e => ['primo', 'chiamata', 'sett2', 'sett3'].includes(e.tipo)).length, 4,
    'i quattro promemoria di pianificazione restano dove sono');
});

test('SPOSTARE L\'APPUNTAMENTO — cambia la data della STESSA riga e l\'ora resta', () => {
  const db = setDb([PAZ_BASE]);
  win._appMigraTutti(db.pazienti);
  db.eventi[0].ora = '15:30';
  db.pazienti[0].visitaData = '2026-08-19';
  win._appSyncPaz(db.pazienti[0], true);
  assert.strictEqual(db.eventi.filter(e => e.tipo === 'visita').length, 1, 'non nasce un secondo evento');
  assert.strictEqual(db.eventi[0].data, '2026-08-19');
  assert.strictEqual(db.eventi[0].ora, '15:30', 'l\'ora già fissata non si perde');
  assert.strictEqual(db.eventi[0].id, 'anag-visita-p1', 'stesso id: su Supabase è un update, non una riga in più');
});

test('L\'EVENTO SCRITTO A MANO VINCE — lo specchio non gli si mette accanto', () => {
  const db = setDb(
    [{ id: 'p2', nome: 'Ada', cognome: 'Bianchi', tel: '', visitaData: '2026-09-01', controlloData: '' }],
    [{ id: 'manuale1', data: '2026-09-01', ora: '09:00', tipo: 'visita', pazId: 'p2', pazNome: 'Ada Bianchi' }]
  );
  win._appMigraTutti(db.pazienti);
  assert.strictEqual(db.eventi.length, 1);
  assert.strictEqual(db.eventi[0].id, 'manuale1', 'resta quello con l\'orario');
});

test('CANCELLARE LO SPECCHIO SPEGNE IL CAMPO — altrimenti l\'appuntamento risorge', () => {
  // Senza questa regola la migrazione ricrea l'evento dal campo del paziente
  // alla ricarica successiva: un appuntamento cancellato che torna da solo.
  const db = setDb([{ id: 'p3', nome: 'Ugo', cognome: 'Neri', tel: '', visitaData: '2026-09-01', controlloData: '2026-10-01' }]);
  win._appMigraTutti(db.pazienti);
  assert.strictEqual(db.eventi.length, 2, 'visita + controllo');
  db.pazienti[0].controlloData = '';
  win._appSyncPaz(db.pazienti[0], true);
  assert.strictEqual(db.eventi.length, 1);
  assert.strictEqual(db.eventi[0].tipo, 'visita');
  win._appMigraTutti(db.pazienti);
  assert.strictEqual(db.eventi.length, 1, 'e non torna al giro dopo');
  assert.ok(/origin\s*===\s*'anagrafica'/.test(SORGENTE.slice(SORGENTE.indexOf('async function delEvento'))),
    'delEvento riconosce lo specchio e spegne il campo');
});

test('IL CONTROLLO VERO ARRIVA IN CALENDARIO CON IL SUO ORARIO', () => {
  const db = setDb([{
    id: 'p4', nome: 'Lia', cognome: 'Verdi', tel: '', visitaData: '', controlloData: '2026-09-20',
    inizioAlim: '2026-08-20',
    dateCalendario: { primo: '2026-08-20', chiamata: '2026-08-27', sett2: '2026-09-03', sett3: '2026-09-10', controllo: '2026-09-17' }
  }]);
  win._appMigraTutti(db.pazienti);
  db.eventi.find(e => e.tipo === 'controllo').ora = '17:00';
  const controlli = win.getEventi().filter(e => e.tipo === 'controllo');
  assert.strictEqual(controlli.length, 1, 'solo quello concordato, non anche il calcolato');
  assert.strictEqual(controlli[0].data, '2026-09-20');
  assert.strictEqual(controlli[0].ora, '17:00');
});

test('PAZIENTE SENZA DATE — non si inventa nessun appuntamento', () => {
  const db = setDb([{ id: 'p5', nome: 'Zoe', cognome: 'Blu', visitaData: '', controlloData: '' }]);
  win._appMigraTutti(db.pazienti);
  assert.strictEqual(db.eventi.length, 0);
  assert.strictEqual(win.getEventi().length, 0);
});

test('MIGRAZIONE AGGANCIATA A TUTTI I PUNTI D\'INGRESSO (regola 12 + il quarto)', () => {
  // I tre canonici — e il quarto, non ovvio: pullEventiSupabase SOSTITUISCE
  // db.eventi col contenuto del server. Senza, un dispositivo già migrato vede
  // sparire le visite appena si sincronizza con uno non ancora migrato.
  ['function loadLocal', 'async function _pazFetchBlob', 'function importa', 'async function pullEventiSupabase']
    .forEach(function (firma) {
      const i = SORGENTE.indexOf(firma);
      assert.ok(i > 0, firma + ' non trovata');
      const corpo = SORGENTE.slice(i, i + 3000);
      assert.ok(/_appMigra(Tutti|Paziente)/.test(corpo), 'migrazione mancante in: ' + firma);
    });
});
