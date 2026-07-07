// ── S2 — P62: confronto strutturale atteso/ottenuto (piani troncati) ──
// Verifica il contratto delle funzioni pure introdotte da P62:
// _attesoStrutturaPiano (cosa il prompt ha richiesto) e
// _confrontaStrutturaPiano (piano ottenuto vs atteso). Sono il cuore della
// difesa contro l'accettazione silenziosa di piani troncati.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();

function pazienteBase(extra) {
  return Object.assign({ regime: 'normocalorico', colazione: 'si', pranzo: 'si', cena: 'si', spuntM: 'no', spuntP: 'no', prenanna: 'no' }, extra || {});
}
function giornoCompleto(nome, slots) {
  var pasti = {};
  (slots || ['colazione','pranzo','cena']).forEach(function(s){ pasti[s] = { celle: [], ricette: [] }; });
  return { giorno: nome, pasti: pasti };
}

// ═══ _attesoStrutturaPiano ═══
test('S2 P62 _attesoStrutturaPiano — regime non chetogenico attende 6 giorni', () => {
  const atteso = win._attesoStrutturaPiano(pazienteBase());
  assert.strictEqual(atteso.nGiorniAttesi, 6);
});

test('S2 P62 _attesoStrutturaPiano — regime chetogenico attende 7 giorni', () => {
  const atteso = win._attesoStrutturaPiano(pazienteBase({ regime: 'Chetogenica' }));
  assert.strictEqual(atteso.nGiorniAttesi, 7);
});

test('S2 P62 _attesoStrutturaPiano — slot attesi riflettono solo i pasti attivi del paziente', () => {
  const atteso = win._attesoStrutturaPiano(pazienteBase({ spuntM: 'si', spuntP: 'si' }));
  assert.strictEqual(JSON.stringify(atteso.slotAttesi.slice().sort()), JSON.stringify(['cena','colazione','pranzo','spuntino_mattina','spuntino_pomeriggio'].sort()));
});

test('S2 P62 _attesoStrutturaPiano — pasto disattivato ("no") non entra negli attesi', () => {
  const atteso = win._attesoStrutturaPiano(pazienteBase({ cena: 'no' }));
  assert.ok(atteso.slotAttesi.indexOf('cena') === -1);
});

// ═══ _confrontaStrutturaPiano ═══
test('S2 P62 _confrontaStrutturaPiano — piano completo (6 giorni, tutti gli slot) → ok true', () => {
  const atteso = { nGiorniAttesi: 6, slotAttesi: ['colazione','pranzo','cena'] };
  const piano = [];
  for (let i = 0; i < 6; i++) piano.push(giornoCompleto('Giorno' + i));
  const esito = win._confrontaStrutturaPiano(piano, atteso);
  assert.strictEqual(esito.ok, true);
  assert.strictEqual(esito.giorniMancanti.length, 0);
  assert.strictEqual(esito.pastiMancanti.length, 0);
  assert.strictEqual(esito.giorniOttenuti, 6);
});

test('S2 P62 _confrontaStrutturaPiano — mancano gli ultimi 2 giorni (troncamento max_tokens) → rilevato', () => {
  const atteso = { nGiorniAttesi: 6, slotAttesi: ['colazione','pranzo','cena'] };
  const piano = [];
  for (let i = 0; i < 4; i++) piano.push(giornoCompleto('Giorno' + i));
  const esito = win._confrontaStrutturaPiano(piano, atteso);
  assert.strictEqual(esito.ok, false);
  assert.strictEqual(JSON.stringify(esito.giorniMancanti), JSON.stringify([4, 5]));
  assert.strictEqual(esito.giorniOttenuti, 4);
});

test('S2 P62 _confrontaStrutturaPiano — giorno presente ma con uno slot pasto mancante → rilevato come pastiMancanti, non come giorno mancante', () => {
  const atteso = { nGiorniAttesi: 2, slotAttesi: ['colazione','pranzo','cena'] };
  const piano = [giornoCompleto('Lunedì', ['colazione','pranzo','cena']), giornoCompleto('Martedì', ['colazione','pranzo'])];
  const esito = win._confrontaStrutturaPiano(piano, atteso);
  assert.strictEqual(esito.ok, false);
  assert.strictEqual(esito.giorniMancanti.length, 0, 'il giorno esiste, non va contato come giorno mancante');
  assert.strictEqual(esito.pastiMancanti.length, 1);
  assert.strictEqual(esito.pastiMancanti[0].slot, 'cena');
  assert.strictEqual(esito.pastiMancanti[0].giorno, 'Martedì');
});

test('S2 P62 _confrontaStrutturaPiano — pasto con celle vuote ma chiave presente NON è mancante (scelta legittima del generatore)', () => {
  const atteso = { nGiorniAttesi: 1, slotAttesi: ['colazione','pranzo','cena'] };
  const piano = [{ giorno: 'Lunedì', pasti: { colazione: { celle: [], ricette: [] }, pranzo: { celle: [], ricette: [] }, cena: { celle: [], ricette: [] } } }];
  const esito = win._confrontaStrutturaPiano(piano, atteso);
  assert.strictEqual(esito.ok, true, 'chiave presente con celle vuote non deve essere trattata come troncamento');
});

test('S2 P62 _confrontaStrutturaPiano — piano nullo/vuoto → tutti i giorni segnati mancanti, mai eccezione', () => {
  const atteso = { nGiorniAttesi: 3, slotAttesi: ['colazione'] };
  const esitoNull = win._confrontaStrutturaPiano(null, atteso);
  assert.strictEqual(esitoNull.ok, false);
  assert.strictEqual(JSON.stringify(esitoNull.giorniMancanti), JSON.stringify([0, 1, 2]));
  const esitoVuoto = win._confrontaStrutturaPiano([], atteso);
  assert.strictEqual(esitoVuoto.ok, false);
  assert.strictEqual(JSON.stringify(esitoVuoto.giorniMancanti), JSON.stringify([0, 1, 2]));
});

// ═══ _costruisciPromptDelta — verifica solo che non esploda e includa i giorni richiesti ═══
test('S2 P62 _costruisciPromptDelta — se costruisciPrompt non produce nulla (paziente inesistente) ritorna stringa vuota', () => {
  // pazienteId inesistente in db.pazienti (db non popolato in questo harness) → costruisciPrompt ritorna ''
  const out = win._costruisciPromptDelta('id-inesistente-xyz', ['Sabato', 'Domenica']);
  assert.strictEqual(out, '');
});
