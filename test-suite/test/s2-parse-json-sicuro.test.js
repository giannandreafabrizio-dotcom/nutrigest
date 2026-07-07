// ── S2 — parseJSONSicuro ──
// Parser tollerante usato per le risposte AI. Rilevante per P62 (distinguere
// riparazione cosmetica da troncamento sostanziale): questi test fissano il
// comportamento ATTUALE come baseline, prima di quell'intervento.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();

test('S2 parseJSONSicuro — JSON valido passa invariato', () => {
  const input = '{"a":1,"b":[1,2,3]}';
  const result = win.parseJSONSicuro(input);
  assert.strictEqual(JSON.stringify(result), JSON.stringify({ a: 1, b: [1, 2, 3] }));
});

test('S2 parseJSONSicuro — ripara parentesi graffe non chiuse (troncamento oggetto)', () => {
  const input = '{"giorni":[{"nome":"Lunedì"';
  const result = win.parseJSONSicuro(input);
  assert.ok(result, 'Dovrebbe riparare e restituire un oggetto');
  assert.ok(Array.isArray(result.giorni));
});

test('S2 parseJSONSicuro — ripara array non chiuso (troncamento array)', () => {
  const input = '[{"nome":"Lunedì"},{"nome":"Martedì"';
  const result = win.parseJSONSicuro(input);
  assert.ok(Array.isArray(result));
  assert.strictEqual(result.length, 2);
});

test('S2 parseJSONSicuro — ignora testo prima del primo { o [ (preamboli AI tipo "Ecco il piano:")', () => {
  const input = 'Ecco il piano richiesto:\n{"ok":true}';
  const result = win.parseJSONSicuro(input);
  assert.strictEqual(JSON.stringify(result), JSON.stringify({ ok: true }));
});

test('S2 parseJSONSicuro — non confonde graffe/quadre dentro stringhe con la struttura reale', () => {
  const input = '{"nota":"testo con { parentesi } dentro una stringa","ok":true}';
  const result = win.parseJSONSicuro(input);
  assert.strictEqual(result.ok, true);
  assert.strictEqual(result.nota, 'testo con { parentesi } dentro una stringa');
});

test('S2 parseJSONSicuro — nessun JSON individuabile lancia errore esplicito (mai fallimento silenzioso)', () => {
  assert.throws(() => win.parseJSONSicuro('testo libero senza struttura JSON'), /JSON non riparabile|Nessun JSON trovato/);
});

test('S2 parseJSONSicuro — troncamento nel mezzo di una stringa aperta è irreparabile (limite noto, rilevante per P62)', () => {
  // Una stringa JSON troncata a metà di un valore testuale (virgolette aperte)
  // non è riparabile chiudendo solo le parentesi: deve fallire in modo esplicito,
  // non produrre un JSON "quasi giusto" con dati silenziosamente persi.
  const input = '{"ricetta":"Pasta con pomodoro e';
  assert.throws(() => win.parseJSONSicuro(input));
});
