// ── S2 — trovaChiaveAlimento ──
// Risolve un nome alimento nella chiave "categoria__nome" dentro ALIMENTI.
// Usata da applicaRegoloSemaforo per collegare le regole cliniche (grigi/
// celesti) alle voci reali della tabella alimenti del paziente.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();

test('S2 trovaChiaveAlimento — match esatto restituisce "categoria__nome"', () => {
  const key = win.trovaChiaveAlimento('Pasta');
  assert.strictEqual(key, 'Cereali con Glutine__Pasta');
});

test('S2 trovaChiaveAlimento — match case-insensitive', () => {
  const key = win.trovaChiaveAlimento('pasta');
  assert.strictEqual(key, 'Cereali con Glutine__Pasta');
});

test('S2 trovaChiaveAlimento — alimento inesistente restituisce null (non deve inventare una chiave)', () => {
  const key = win.trovaChiaveAlimento('Alimento completamente inventato xyz');
  assert.strictEqual(key, null);
});

test('S2 trovaChiaveAlimento — alimenti con nomi simili in categorie diverse risolvono alla prima categoria che matcha', () => {
  // 'Riso' esiste in "Cereali senza Glutine": verifica solo che il match sia coerente e stabile
  const key = win.trovaChiaveAlimento('Riso');
  assert.ok(key, 'Riso dovrebbe essere trovato in ALIMENTI');
  assert.ok(key.endsWith('__Riso'), 'La chiave deve terminare con "__Riso"');
});
