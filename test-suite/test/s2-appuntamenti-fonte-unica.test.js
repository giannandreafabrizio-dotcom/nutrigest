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
  // solo il corpo di _appSyncPaz: la promozione (Tappa 2) usa uid() di proposito
  const CORPO = SORGENTE.slice(SORGENTE.indexOf('function _appSyncPaz'), SORGENTE.indexOf('// ── P140 Tappa 2'));
  assert.strictEqual(/uid\(\)/.test(CORPO), false, 'creando lo specchio non si generano mai id casuali');
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
  assert.strictEqual(/addDays\(ini,\s*28\)/.test(SORGENTE), false, 'salvaPaz non lo riscrive più');
  // Tappa 2: il campo non esiste più affatto — le tappe si calcolano
  assert.strictEqual(db.pazienti[0].dateCalendario, undefined, 'dateCalendario è stato dismesso');
  assert.strictEqual(win.getEventi().filter(e => e.tipo === 'controllo').length, 0, 'e nessun controllo fantasma resta in calendario');
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
  assert.ok(/_appSpecchioInverso/.test(SORGENTE.slice(SORGENTE.indexOf('async function delEvento'), SORGENTE.indexOf('function copyMsg'))),
    'delEvento riallinea i campi della scheda dopo la cancellazione');
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

// ── Difetti trovati nel collaudo in Chrome del 31 lug 2026 ───────────────────

test('NIENTE DOPPIONE DI PASSAGGIO — l\'evento con l\'ora fa da parte lo specchio SUBITO', () => {
  // Prima della correzione: salvando dal calendario un evento "Prima visita"
  // per lo stesso paziente e lo stesso giorno, a video ne comparivano DUE fino
  // al ricaricamento successivo (la migrazione lo toglieva, ma solo al giro
  // dopo). A schermo sembrava che la correzione di P140 non avesse funzionato.
  const db = setDb([{ id: 'g1', nome: 'Giovanni', cognome: 'D', tel: '333', visitaData: '2026-07-29', controlloData: '' }]);
  win._appMigraTutti(db.pazienti);
  win.eval("pushEventoSupabase=function(){};notif=function(){};closeM=function(){};renderCal=function(){};");
  win.eval("document.body.innerHTML='<input id=\"ev-data\" value=\"2026-07-29\"><input id=\"ev-ora\" value=\"15:30\">'"
    + "+'<select id=\"ev-tipo\"><option value=\"visita\" selected>v</option></select>'"
    + "+'<select id=\"ev-paz\"><option value=\"g1\" selected>g</option></select>'"
    + "+'<input id=\"ev-note\" value=\"\"><input id=\"ev-prezzo\" value=\"\"><div id=\"ev-entrata-box\"></div>'"
    + "+'<select id=\"ev-promemoria\"><option value=\"no\" selected>no</option></select>'; salvaEvento();");
  const visite = win.getEventi().filter(e => e.tipo === 'visita');
  assert.strictEqual(visite.length, 1, 'una sola visita SENZA aspettare il ricaricamento');
  assert.strictEqual(visite[0].ora, '15:30', 'e resta quella con l\'orario');
});

test('IL PROMEMORIA NON DICE PIÙ "oggi" A PRESCINDERE', () => {
  // Aprendo il 31 luglio il controllo del 26 agosto si leggeva "previsto per
  // oggi": una frase che AFFERMA una data sbagliata. Ora porta la data vera —
  // e quando la data non c'è resta generica invece di inventarla.
  const ev = win.eval("({data:'2026-08-26',ora:'17:00'})");
  assert.strictEqual(win._evTestoPromemoria('Controllo previsto {data}.', ev),
    'Controllo previsto per il 26/08/2026 alle 17:00.');
  assert.strictEqual(win._evTestoPromemoria('Controllo previsto {data}.', win.eval("({data:'2026-08-26'})")),
    'Controllo previsto per il 26/08/2026.');
  assert.strictEqual(win._evTestoPromemoria('Controllo previsto {data}.', null),
    'Controllo previsto.', 'senza data la frase resta corretta, solo generica');
  // NB: si cerca la DEFINIZIONE del messaggio, non la stringa nuda — quella
  // compare anche nel commento che spiega perché è stata tolta.
  assert.strictEqual(/testo:\s*'[^']*previsto per oggi/.test(SORGENTE), false, 'il testo fisso non torna');
  assert.ok(/testo:\s*'Controllo con misurazione InBody previsto \{data\}\.'/.test(SORGENTE));
});

// ── P140 Tappa 2 — lo specchio inverso e l'avviso onesto ────────────────────

function creaEvento(o){
  win.eval("pushEventoSupabase=function(){};notif=function(){};closeM=function(){};renderCal=function(){};save=function(){};delEventoSupabase=function(){};");
  win.eval("document.body.innerHTML='<input id=\"ev-data\" value=\"" + o.data + "\"><input id=\"ev-ora\" value=\"" + (o.ora||'') + "\">'"
    + "+'<select id=\"ev-tipo\"><option value=\"" + o.tipo + "\" selected>t</option></select>'"
    + "+'<select id=\"ev-paz\"><option value=\"" + (o.pazId||'') + "\" selected>p</option></select>'"
    + "+'<input id=\"ev-note\" value=\"\"><input id=\"ev-prezzo\" value=\"\"><div id=\"ev-entrata-box\"></div>'"
    + "+'<select id=\"ev-promemoria\"><option value=\"no\" selected>no</option></select>'; salvaEvento();");
}

test('SPECCHIO INVERSO — l\'appuntamento fissato dal calendario riempie la scheda', () => {
  // Il difetto trovato nel collaudo del 31 lug: l'anagrafica scriveva nel
  // calendario, il calendario non scriveva nell'anagrafica.
  const db = setDb([{ id: 'g1', nome: 'Giovanni', cognome: 'D', tel: '333', visitaData: '', controlloData: '' }]);
  creaEvento({ data: '2026-09-20', ora: '17:00', tipo: 'controllo', pazId: 'g1' });
  assert.strictEqual(db.pazienti[0].controlloData, '2026-09-20', 'la scheda si è riempita da sola');
  assert.strictEqual(db.eventi.filter(e => e.tipo === 'controllo').length, 1, 'e non è nato uno specchio in più');
});

test('SPECCHIO INVERSO — «prossimo controllo» segue il controllo più IN LÀ, non l\'ultimo salvato', () => {
  const db = setDb([{ id: 'g1', nome: 'Giovanni', cognome: 'D', tel: '', visitaData: '', controlloData: '' }]);
  creaEvento({ data: '2026-10-15', tipo: 'controllo', pazId: 'g1' });
  creaEvento({ data: '2026-09-20', tipo: 'controllo', pazId: 'g1' });   // salvato dopo, ma è prima
  assert.strictEqual(db.pazienti[0].controlloData, '2026-10-15',
    'il campo dice "prossimo controllo": deve essere il più lontano, non l\'ultimo digitato');
});

test('LO SPECCHIO SI RITIRA sullo stesso giorno, ma viene PROMOSSO su un giorno diverso', () => {
  // Il punto delicato: se lo specchio venisse cancellato quando l'appuntamento
  // vero cade in un ALTRO giorno, si perderebbe una data che Fabrizio aveva
  // scritto davvero. Su dati clinici non si butta via niente per far tornare
  // un modello.
  let db = setDb([{ id: 'g1', nome: 'G', cognome: 'D', tel: '', visitaData: '2026-08-12', controlloData: '' }]);
  win._appMigraTutti(db.pazienti);
  creaEvento({ data: '2026-08-12', ora: '15:30', tipo: 'visita', pazId: 'g1' });
  let visite = db.eventi.filter(e => e.tipo === 'visita');
  assert.strictEqual(visite.length, 1, 'stesso giorno: lo specchio si ritira');
  assert.strictEqual(visite[0].ora, '15:30', 'resta quello con l\'ora');

  db = setDb([{ id: 'g2', nome: 'G', cognome: 'D', tel: '', visitaData: '2026-08-12', controlloData: '' }]);
  win._appMigraTutti(db.pazienti);
  creaEvento({ data: '2026-07-29', ora: '09:00', tipo: 'visita', pazId: 'g2' });
  visite = db.eventi.filter(e => e.tipo === 'visita').map(e => e.data).sort();
  // .join: gli array vivono nel realm JSDOM, si confrontano per valore
  assert.strictEqual(visite.join('|'), '2026-07-29|2026-08-12', 'giorno diverso: nessuna delle due date si perde');
  const vecchio = db.eventi.find(e => e.data === '2026-08-12');
  assert.strictEqual(vecchio.origin, undefined, 'lo specchio è stato PROMOSSO a evento normale');
  assert.notStrictEqual(vecchio.id, 'anag-visita-g2', 'con un id nuovo, così la migrazione non lo tocca più');
  assert.strictEqual(db.pazienti[0].visitaData, '2026-07-29', 'la scheda segue la visita più vecchia');
  win._appMigraTutti(db.pazienti);
  assert.strictEqual(db.eventi.filter(e => e.tipo === 'visita').length, 2, 'e restano due anche dopo il ricaricamento');
});

test('CANCELLARE UN APPUNTAMENTO — il campo segue, non resta indietro', () => {
  const db = setDb([{ id: 'g1', nome: 'G', cognome: 'D', tel: '', visitaData: '', controlloData: '' }]);
  win.eval("confirm=function(){return true;};saveLocal=function(){};save=function(){};delEventoSupabase=async function(){};closeM=function(){};renderCal=function(){};notif=function(){};");
  creaEvento({ data: '2026-09-20', tipo: 'controllo', pazId: 'g1' });
  creaEvento({ data: '2026-10-15', tipo: 'controllo', pazId: 'g1' });
  assert.strictEqual(db.pazienti[0].controlloData, '2026-10-15');
  win.eval("delEvento(db.eventi.find(e=>e.data==='2026-10-15').id)");
  assert.strictEqual(db.pazienti[0].controlloData, '2026-09-20', 'il campo prende il controllo rimasto');
  win.eval("delEvento(db.eventi.find(e=>e.data==='2026-09-20').id)");
  assert.strictEqual(db.pazienti[0].controlloData, '', 'e si svuota quando non ne resta nessuno');
  win._appMigraTutti(db.pazienti);
  assert.strictEqual(db.eventi.length, 0, 'nessun appuntamento risorge alla ricarica');
});

test('AVVISO — «controllo da fissare» al posto di «controllo saltato»', () => {
  // Il vecchio avviso contava i giorni da una data inventata (inizio+28). Il
  // nuovo risponde a una domanda vera: c'è un controllo fissato da qui in poi?
  win.eval("document.body.innerHTML='<div id=\"dash-scadenze-content\"></div><span id=\"dash-scadenze-badge\"></span>'; try{localStorage.removeItem('scadenze_gestite')}catch(e){}");
  const giorniFa = n => win.eval("(function(){var d=new Date();d.setDate(d.getDate()-(" + n + "));return d.toISOString().slice(0,10);})()");

  setDb([{ id: 'x1', nome: 'Lia', cognome: 'V', tel: '333', inizioAlim: giorniFa(40), visitaData: '', controlloData: '' }]);
  win.eval('renderScadenzeAlert()');
  let html = win.eval("document.getElementById('dash-scadenze-content').innerHTML");
  assert.ok(html.indexOf('Controllo da fissare') >= 0, 'piano avviato da 40 giorni, nessun controllo: avvisa');
  assert.ok(html.indexOf('nessun controllo fissato') >= 0);

  // stesso paziente, ma un controllo FISSATO nel futuro: niente avviso
  setDb([{ id: 'x1', nome: 'Lia', cognome: 'V', tel: '333', inizioAlim: giorniFa(40), visitaData: '', controlloData: '' }],
        [{ id: 'e1', data: giorniFa(-10), ora: '17:00', tipo: 'controllo', pazId: 'x1', pazNome: 'Lia V' }]);
  win.eval('renderScadenzeAlert()');
  html = win.eval("document.getElementById('dash-scadenze-content').innerHTML");
  assert.strictEqual(html.indexOf('Controllo da fissare'), -1, 'con un controllo fissato non deve dire niente');

  // piano avviato da poco: non e' ancora ora
  setDb([{ id: 'x1', nome: 'Lia', cognome: 'V', tel: '333', inizioAlim: giorniFa(10), visitaData: '', controlloData: '' }]);
  win.eval('renderScadenzeAlert()');
  html = win.eval("document.getElementById('dash-scadenze-content').innerHTML");
  assert.strictEqual(html.indexOf('Controllo da fissare'), -1, 'a 10 giorni dall\'inizio non si assilla nessuno');
});

// ── P140 Tappa 2 — le tappe si calcolano, ancorate all'ultimo appuntamento ───

test('TAPPE CALCOLATE — dateCalendario non viene più salvato da nessuna parte', () => {
  assert.strictEqual(/dateCalendario\s*:/.test(SORGENTE), false, 'salvaPaz non lo scrive più');
  const db = setDb([{ id: 'g1', nome: 'G', cognome: 'D', tel: '', inizioAlim: '2026-08-03',
    visitaData: '', controlloData: '',
    dateCalendario: { primo: '2020-01-01', chiamata: '2020-01-08', sett2: '2020-01-15', sett3: '2020-01-22', controllo: '2020-02-01' } }]);
  win._appMigraTutti(db.pazienti);
  assert.strictEqual(db.pazienti[0].dateCalendario, undefined, 'la migrazione lo toglie anche dai dati vecchi');
  // e le tappe che si vedono sono quelle CALCOLATE, non quelle salvate nel 2020
  const tipi = win.getEventi().filter(e => e.pazId === 'g1');
  assert.strictEqual(tipi.some(e => String(e.data).startsWith('2020')), false, 'nessuna data fossile sopravvive');
  assert.strictEqual(tipi.filter(e => e.tipo === 'chiamata')[0].data, '2026-08-10', 'chiamata = ancora + 7');
});

test('ANCORA — le tappe seguono l\'ULTIMO appuntamento, non l\'inizio del piano', () => {
  // Il caso raccontato da Fabrizio: controllo sabato 1 aprile, la chiamata NON
  // è a una settimana dall'inizio del piano ma a una settimana dal controllo.
  // Con l'ancora vecchia, dopo il primo mese non nasceva più nessun promemoria
  // e il calendario semplicemente taceva.
  const db = setDb(
    [{ id: 'g1', nome: 'G', cognome: 'D', tel: '', inizioAlim: '2026-01-10', visitaData: '', controlloData: '' }],
    [{ id: 'e1', data: '2026-04-01', ora: '10:00', tipo: 'controllo', pazId: 'g1', pazNome: 'G D' }]
  );
  const tappe = win._appTappe(db.pazienti[0]);
  const q = k => (tappe.find(t => t.tipo === k) || {}).data;
  assert.strictEqual(q('chiamata'), '2026-04-08', 'una settimana dopo il controllo, non dal piano di gennaio');
  assert.strictEqual(q('sett2'), '2026-04-15');
  assert.strictEqual(q('primo'), '2026-01-10', 'l\'inizio piano resta quello che è');
});

test('ANCORA — un appuntamento FUTURO non sposta ancora le tappe', () => {
  // Il controllo è fissato ma non è ancora successo: le tappe devono restare
  // ancorate all'ultimo appuntamento AVVENUTO, non a uno che deve arrivare.
  const futuro = win.eval("(function(){var d=new Date();d.setDate(d.getDate()+30);return d.toISOString().slice(0,10);})()");
  const db = setDb(
    [{ id: 'g1', nome: 'G', cognome: 'D', tel: '', inizioAlim: '2026-01-10', visitaData: '', controlloData: '' }],
    [{ id: 'e1', data: futuro, tipo: 'controllo', pazId: 'g1', pazNome: 'G D' }]
  );
  const tappe = win._appTappe(db.pazienti[0]);
  assert.strictEqual((tappe.find(t => t.tipo === 'chiamata') || {}).data, '2026-01-17',
    'finché il controllo non è avvenuto comanda ancora il piano');
});

test('LA CHIAMATA CONCORDATA fa sparire quella proposta', () => {
  // «Mi chiami lunedì 10 aprile alle 18:30, quando finisco di lavorare»:
  // la fissi in calendario e la proposta automatica si toglie di mezzo, invece
  // di restare lì a dire un giorno che non avete concordato.
  const db = setDb(
    [{ id: 'g1', nome: 'G', cognome: 'D', tel: '', inizioAlim: '', visitaData: '', controlloData: '' }],
    [{ id: 'e1', data: '2026-04-01', tipo: 'controllo', pazId: 'g1', pazNome: 'G D' }]
  );
  let ev = win.getEventi().filter(e => e.pazId === 'g1' && e.tipo === 'chiamata');
  assert.strictEqual(ev.length, 1);
  assert.strictEqual(ev[0].data, '2026-04-08');
  assert.strictEqual(ev[0].proposta, true, 'è marcata come proposta, non come appuntamento');

  db.eventi.push(win.eval("({id:'e2',data:'2026-04-10',ora:'18:30',tipo:'chiamata',pazId:'g1',pazNome:'G D'})"));
  ev = win.getEventi().filter(e => e.pazId === 'g1' && e.tipo === 'chiamata');
  assert.strictEqual(ev.length, 1, 'una sola chiamata, non la proposta più quella vera');
  assert.strictEqual(ev[0].data, '2026-04-10');
  assert.strictEqual(ev[0].ora, '18:30');
});

test('I CAMPI DOPPI DELLA SCHEDA NON ESISTONO PIÙ', () => {
  // Due caselle per lo stesso dato, più il codice che le teneva allineate.
  ['p-inizio2', 'p-controllo2'].forEach(id => {
    assert.strictEqual(new RegExp('id="' + id + '"').test(SORGENTE), false, id + ' rimosso dal modulo');
  });
  ['function syncInizio', 'function syncControllo'].forEach(f => {
    assert.strictEqual(SORGENTE.indexOf(f), -1, f + ' rimossa');
  });
  assert.strictEqual(/id="tp-cal-paz"/.test(SORGENTE), false, 'la linguetta doppia è sparita');
  // e i campi nuovi ci sono
  ['p-visita-ora', 'p-controllo-ora'].forEach(id => {
    assert.ok(new RegExp('id="' + id + '"').test(SORGENTE), id + ' presente');
  });
});
