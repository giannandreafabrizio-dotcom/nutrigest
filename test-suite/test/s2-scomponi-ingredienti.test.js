// ── S2 — _ngScomponiIngredienti ──
// Estrae {nome, grammatura} da una stringa libera di ingredienti (usato dal
// ricalcolo macro ricette, P33/BLOCCO17, e rilevante per P61: è la via con
// cui il futuro validatore potrà leggere le righe testuali invece di
// saltarle come "non riconosciute" a priori).
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();

function names(arr) { return arr.map(x => x.n); }
function grams(arr) { return arr.map(x => x.g); }

test('S2 _ngScomponiIngredienti — stringa vuota/assente restituisce array vuoto', () => {
  assert.strictEqual(win._ngScomponiIngredienti('').length, 0);
  assert.strictEqual(win._ngScomponiIngredienti(null).length, 0);
  assert.strictEqual(win._ngScomponiIngredienti(undefined).length, 0);
});

test('S2 _ngScomponiIngredienti — grammatura diretta a fine ingrediente ("Nome 60g")', () => {
  const res = win._ngScomponiIngredienti('Pane di segale integrale 60g');
  assert.strictEqual(res.length, 1);
  assert.strictEqual(res[0].n, 'Pane di segale integrale');
  assert.strictEqual(res[0].g, 60);
});

test('S2 _ngScomponiIngredienti — grammatura tra parentesi ("Nome N (60g)")', () => {
  const res = win._ngScomponiIngredienti('Uovo intero 1 (60g)');
  assert.strictEqual(res.length, 1);
  assert.strictEqual(res[0].n, 'Uovo intero');
  assert.strictEqual(res[0].g, 60);
});

test('S2 _ngScomponiIngredienti — più ingredienti separati da virgola', () => {
  const res = win._ngScomponiIngredienti('Uova intere 2 (120g), Pane integrale 40g, Olio EVO 5g');
  assert.strictEqual(res.length, 3);
  assert.strictEqual(JSON.stringify(names(res)), JSON.stringify(['Uova intere', 'Pane integrale', 'Olio EVO']));
  assert.strictEqual(JSON.stringify(grams(res)), JSON.stringify([120, 40, 5]));
});

test('S2 _ngScomponiIngredienti — ingrediente senza grammatura viene scartato (non genera falsi dati)', () => {
  const res = win._ngScomponiIngredienti('Sale e pepe q.b., Pane integrale 40g');
  // "Sale e pepe q.b." non ha grammatura esplicita → deve essere saltato
  assert.strictEqual(res.length, 1);
  assert.strictEqual(res[0].n, 'Pane integrale');
});

test('S2 _ngScomponiIngredienti — q.b. con grammatura tra parentesi viene comunque letto', () => {
  const res = win._ngScomponiIngredienti('Sale q.b. (2g)');
  assert.strictEqual(res.length, 1);
  assert.strictEqual(res[0].g, 2);
});

test('S2 _ngScomponiIngredienti — "X o Y <grammatura>" scarta l\'ingrediente (limite noto: la grammatura segue "o Y" e viene tagliata insieme, rilevante per P61 come caso "non verificabile")', () => {
  // La regex "\s+o\s+.*$" taglia via " o Fette biscottate 40g" per intero:
  // resta solo "Pane", senza grammatura → viene scartato da _ngParseIngrediente.
  // Comportamento ATTUALE fissato come baseline, non un requisito auspicato.
  const res = win._ngScomponiIngredienti('Pane o Fette biscottate 40g');
  assert.strictEqual(res.length, 0);
});

test('S2 _ngScomponiIngredienti — "X 40g o Y" (grammatura PRIMA della "o") viene letta correttamente', () => {
  const res = win._ngScomponiIngredienti('Pane 40g o Fette biscottate');
  assert.strictEqual(res.length, 1);
  assert.strictEqual(res[0].n, 'Pane');
  assert.strictEqual(res[0].g, 40);
});
