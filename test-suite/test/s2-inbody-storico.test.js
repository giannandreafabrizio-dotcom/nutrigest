// ── S2 — P120 storico InBody: data del test + ordine per data (25 lug 2026) ──
// Fissa il contratto dei due helper puri introdotti per rendere sicuro il
// caricamento dei referti storici, uno alla volta e in qualsiasi ordine:
//   _ibNormalizzaData(raw) → 'YYYY-MM-DD' | null   (mai una data inventata)
//   _ibOrdinaPerData(p)    → riordina p.inbody per data, true se cambiato
// Il motivo di _ibOrdinaPerData: ~20 punti del codice leggono la misurazione
// "attuale" come p.inbody[p.inbody.length-1] (ULTIMA INSERITA, non la più
// recente per data). Tenendo l'array ordinato, quell'indice è sempre corretto.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();

// ═══ _ibNormalizzaData ═══════════════════════════════════════════════════════

test('S2 P120 — data ISO già valida: passa invariata', () => {
  assert.strictEqual(win._ibNormalizzaData('2024-03-15'), '2024-03-15');
});

test('S2 P120 — data ISO con ora a seguire (referto InBody stampa data+ora)', () => {
  assert.strictEqual(win._ibNormalizzaData('2024-03-15 09:42'), '2024-03-15');
  assert.strictEqual(win._ibNormalizzaData('2024-03-15T09:42:00'), '2024-03-15');
});

test('S2 P120 — formato italiano DD/MM/YYYY e varianti con punto o trattino', () => {
  assert.strictEqual(win._ibNormalizzaData('15/03/2024'), '2024-03-15');
  assert.strictEqual(win._ibNormalizzaData('15.03.2024'), '2024-03-15');
  assert.strictEqual(win._ibNormalizzaData('15-03-2024'), '2024-03-15');
  assert.strictEqual(win._ibNormalizzaData('5/3/2024'), '2024-03-05', 'giorno/mese a una cifra');
  assert.strictEqual(win._ibNormalizzaData('15/03/2024 09:42'), '2024-03-15', 'con ora a seguire');
});

test('S2 P120 — valore assente o non interpretabile: null, non un ripiego', () => {
  [null, undefined, '', '   ', 'non leggibile', 'N/D', '2024', 'marzo 2024', {}].forEach(v => {
    assert.strictEqual(win._ibNormalizzaData(v), null, 'atteso null per ' + JSON.stringify(v));
  });
});

test('S2 P120 — date implausibili scartate: futuro, prima del 1990, giorno inesistente', () => {
  assert.strictEqual(win._ibNormalizzaData('2099-01-01'), null, 'nel futuro → null');
  assert.strictEqual(win._ibNormalizzaData('1975-06-20'), null, 'prima del 1990 (è una data di nascita) → null');
  assert.strictEqual(win._ibNormalizzaData('2024-02-31'), null, '31 febbraio non esiste → null');
  assert.strictEqual(win._ibNormalizzaData('2024-13-01'), null, 'mese 13 → null');
  assert.strictEqual(win._ibNormalizzaData('2024-00-10'), null, 'mese 0 → null');
});

test('S2 P120 — oggi è accettata (import di una BIA fatta adesso)', () => {
  const oggi = win.eval('today()');
  assert.strictEqual(win._ibNormalizzaData(oggi), oggi);
});

// ═══ _ibOrdinaPerData ════════════════════════════════════════════════════════

function paz(date) {
  return { id: 'p1', inbody: date.map((d, i) => ({ id: 'ib' + i, data: d, peso: 80 + i })) };
}

test('S2 P120 — referti caricati in ordine sparso: dopo l\'ordinamento l\'ultima posizione è la più recente', () => {
  // Lo scenario reale: BIA nuova salvata per prima, poi si caricano i referti
  // storici. Senza ordinamento "l'attuale" diventerebbe il referto del 2023.
  const p = paz(['2026-07-20', '2023-01-10', '2024-05-05']);
  const cambiato = win._ibOrdinaPerData(p);
  assert.strictEqual(cambiato, true, 'l\'ordine è cambiato');
  assert.deepStrictEqual(p.inbody.map(x => x.data), ['2023-01-10', '2024-05-05', '2026-07-20']);
  assert.strictEqual(p.inbody[p.inbody.length - 1].data, '2026-07-20',
    'p.inbody[length-1] — ciò che ~20 punti del codice leggono come "attuale" — è la misura più recente');
});

test('S2 P120 — array già in ordine: nessuna modifica e ritorna false', () => {
  const p = paz(['2023-01-10', '2024-05-05', '2026-07-20']);
  assert.strictEqual(win._ibOrdinaPerData(p), false);
  assert.deepStrictEqual(p.inbody.map(x => x.data), ['2023-01-10', '2024-05-05', '2026-07-20']);
});

test('S2 P120 — misurazione senza data: finisce in testa, non diventa mai "l\'attuale"', () => {
  const p = { id: 'p1', inbody: [
    { id: 'a', data: '2026-07-20' },
    { id: 'b', data: '' },
    { id: 'c', data: '2024-05-05' }
  ]};
  win._ibOrdinaPerData(p);
  assert.strictEqual(p.inbody[0].id, 'b', 'senza data → in testa');
  assert.strictEqual(p.inbody[p.inbody.length - 1].id, 'a', 'la più recente resta in coda');
});

test('S2 P120 — casi limite: paziente nullo, senza inbody, con 0 o 1 misurazioni', () => {
  assert.strictEqual(win._ibOrdinaPerData(null), false);
  assert.strictEqual(win._ibOrdinaPerData({}), false);
  assert.strictEqual(win._ibOrdinaPerData({ inbody: [] }), false);
  assert.strictEqual(win._ibOrdinaPerData({ inbody: [{ id: 'x', data: '2024-01-01' }] }), false);
  assert.strictEqual(win._ibOrdinaPerData({ inbody: 'non-un-array' }), false);
});

test('S2 P120 — due misurazioni nello stesso giorno: entrambe conservate', () => {
  // Caso legittimo: digiuno + post-pranzo. L'ordinamento non deve perderne una.
  const p = paz(['2024-05-05', '2023-01-10', '2024-05-05']);
  win._ibOrdinaPerData(p);
  assert.strictEqual(p.inbody.length, 3, 'nessuna misurazione persa');
  assert.deepStrictEqual(p.inbody.map(x => x.data), ['2023-01-10', '2024-05-05', '2024-05-05']);
});

test('S2 P120 — il prompt di import chiede la data del test e vieta di dedurla', () => {
  const src = require('./_extract').extractMainScript();
  assert.ok(/data_referto/.test(src), 'campo data_referto presente nel prompt di estrazione');
  assert.ok(/NON confonderla con la data di nascita/.test(src), 'avvertenza anti-confusione con la data di nascita');
  assert.ok(/non dedurla e non inventarla/.test(src), 'divieto esplicito di inventare la data');
});
