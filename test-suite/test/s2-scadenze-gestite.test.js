// ── S2 — P144: i "gestito" delle scadenze vivono nel paziente (31 lug 2026) ──
// Prima stavano in localStorage, cioè nella memoria del singolo browser: fuori
// dal backup JSON e non sincronizzati. Venti avvisi sistemati dal PC dello
// studio si rivedevano tutti e venti sul telefono. Ora stanno nel paziente, che
// è già dentro il backup e già viaggia fra i dispositivi — il dato va dove va la
// cosa di cui parla. Stessa famiglia dell'agenda rimossa il 30 luglio.
//
// I punti che questi test tengono fermi:
//   1. la scadenza a 14 giorni si applica in LETTURA (un "gestito" vecchio non
//      può riapparire solo perché nessuno l'ha ripulito);
//   2. la migrazione dal vecchio cassetto NON butta via le voci dei pazienti
//      non ancora scaricati su quel dispositivo;
//   3. il cassetto vecchio sparisce solo quando è davvero vuoto.
'use strict';
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();
const SORGENTE = fs.readFileSync(path.join(__dirname, '..', '..', 'index.html'), 'utf-8');
win.eval('save=function(){};saveLocal=function(){};notif=function(){};renderScadenzeAlert=function(){};');

const gg = n => win.eval("(function(){var d=new Date();d.setDate(d.getDate()+(" + n + "));return ymdLoc(d);})()");
const LS = {
  set: o => win.eval("localStorage.setItem('scadenze_gestite'," + JSON.stringify(JSON.stringify(o)) + ")"),
  get: () => win.eval("localStorage.getItem('scadenze_gestite')")
};
function setPaz(pazienti) {
  win.eval('db.pazienti = ' + JSON.stringify(pazienti) + ';');
  return win.eval('db.pazienti');
}

test('SEGNA — il "gestito" finisce nel paziente, non nel browser', () => {
  const paz = setPaz([{ id: 'p1', nome: 'Lia', cognome: 'V' }]);
  win.eval("localStorage.removeItem('scadenze_gestite')");
  win.segnaGestito('inbody_p1');
  assert.strictEqual(paz[0]._scadenzeGestite.inbody, win.today());
  assert.strictEqual(LS.get(), null, 'niente più scritture nel cassetto del browser');
  // e il codice non lo legge più per decidere cosa mostrare
  // slice fino alle funzioni di supporto: la MIGRAZIONE il cassetto vecchio lo
  // legge di mestiere, quello che non deve più leggerlo è chi DECIDE cosa mostrare
  const corpo = SORGENTE.slice(SORGENTE.indexOf('function renderScadenzeAlert'), SORGENTE.indexOf('const _SCAD_GIORNI'));
  assert.strictEqual(/getItem\('scadenze_gestite'\)/.test(corpo), false);
});

test('LA CHIAVE si spezza al PRIMO underscore (l\'id non ne contiene)', () => {
  const paz = setPaz([{ id: 'abc123', nome: 'X', cognome: 'Y' }]);
  win.segnaGestito('dafissare_abc123');
  assert.deepStrictEqual(Object.keys(paz[0]._scadenzeGestite).sort().join('|'), 'dafissare');
  assert.strictEqual(paz[0]._scadenzeGestite.dafissare, win.today());
});

test('SCADENZA A 14 GIORNI — applicata in LETTURA, non solo alla potatura', () => {
  const p = win.eval("({id:'p9',_scadenzeGestite:{inbody:'" + gg(-3) + "',sparito:'" + gg(-20) + "'}})");
  const vivi = win._scadGestiti(p, win.today());
  assert.ok(vivi.inbody, 'tre giorni fa: ancora valido');
  assert.strictEqual(vivi.sparito, undefined, 'venti giorni fa: scaduto, l\'avviso deve tornare');
  // il dato grezzo non è stato toccato: la lettura non ha effetti collaterali
  assert.ok(p._scadenzeGestite.sparito, 'leggere non cancella');
});

test('MIGRAZIONE — travasa dal cassetto vecchio e lo svuota', () => {
  const paz = setPaz([{ id: 'p1', nome: 'A', cognome: 'B' }, { id: 'p2', nome: 'C', cognome: 'D' }]);
  LS.set({ 'inbody_p1': gg(-2), 'sparito_p2': gg(-1) });
  assert.strictEqual(win._scadMigraDaLocalStorage(paz), true);
  assert.strictEqual(paz[0]._scadenzeGestite.inbody, gg(-2));
  assert.strictEqual(paz[1]._scadenzeGestite.sparito, gg(-1));
  assert.strictEqual(LS.get(), null, 'travasato tutto: il cassetto vecchio sparisce');
  // idempotente: rigirarla non fa niente
  assert.strictEqual(win._scadMigraDaLocalStorage(paz), false);
});

test('MIGRAZIONE — le voci dei pazienti non ancora scaricati NON si perdono', () => {
  // Su questo dispositivo la scheda di p2 non è mai stata aperta (P74: le righe
  // leggere non stanno in db.pazienti). Buttare la sua voce vorrebbe dire
  // perdere un "gestito" che l'utente aveva dato davvero.
  const paz = setPaz([{ id: 'p1', nome: 'A', cognome: 'B' }]);
  LS.set({ 'inbody_p1': gg(-2), 'sparito_p2': gg(-1) });
  win._scadMigraDaLocalStorage(paz);
  assert.strictEqual(paz[0]._scadenzeGestite.inbody, gg(-2));
  const resto = JSON.parse(LS.get() || '{}');
  assert.deepStrictEqual(Object.keys(resto).join('|'), 'sparito_p2', 'la voce orfana resta in attesa');
  // quando la scheda arriva, migra anche lei
  const paz2 = setPaz([{ id: 'p1', nome: 'A', cognome: 'B' }, { id: 'p2', nome: 'C', cognome: 'D' }]);
  paz2[0]._scadenzeGestite = win.eval("({inbody:'" + gg(-2) + "'})");
  win._scadMigraDaLocalStorage(paz2);
  assert.strictEqual(paz2[1]._scadenzeGestite.sparito, gg(-1));
  assert.strictEqual(LS.get(), null);
});

test('MIGRAZIONE — non sovrascrive un "gestito" più recente già nel paziente', () => {
  const paz = setPaz([{ id: 'p1', nome: 'A', cognome: 'B', _scadenzeGestite: { inbody: gg(-1) } }]);
  LS.set({ 'inbody_p1': gg(-9) });
  win._scadMigraDaLocalStorage(paz);
  assert.strictEqual(paz[0]._scadenzeGestite.inbody, gg(-1), 'vince la data più recente');
});

test('SEGNARE UN PAZIENTE NON SCARICATO non crea dati fantasma', () => {
  const paz = setPaz([{ id: 'p1', nome: 'A', cognome: 'B' }]);
  win.eval("localStorage.removeItem('scadenze_gestite')");
  win.segnaGestito('inbody_p999');
  assert.strictEqual(paz.length, 1, 'nessun paziente inventato');
  assert.strictEqual(LS.get(), null, 'e niente ritorno al cassetto del browser');
});
