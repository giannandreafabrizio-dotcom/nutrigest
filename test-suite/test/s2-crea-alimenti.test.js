// ── S2 — getValoriCREA / NOMI_CANONICI ──
// Lookup dei valori nutrizionali CREA con fallback su nomi canonici e
// categoria funzionale. Funzione chiave per ogni calcolo macro nel piano.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();

test('S2 getValoriCREA — restituisce null per nome vuoto/assente', () => {
  assert.strictEqual(win.getValoriCREA('', null), null);
  assert.strictEqual(win.getValoriCREA(null, null), null);
  assert.strictEqual(win.getValoriCREA(undefined, null), null);
});

test('S2 getValoriCREA — match diretto su CREA_ALIMENTI (nome esatto in tabella)', () => {
  // 'Pane comune' è nel CREA_ALIMENTI reale (usato anche come NOMI_CANONICI target)
  const v = win.getValoriCREA('Pane comune', null);
  assert.ok(v, 'Pane comune dovrebbe avere valori CREA diretti');
  assert.strictEqual(typeof v.kcal, 'number');
});

test('S2 getValoriCREA — disambiguazione via NOMI_CANONICI (case-insensitive)', () => {
  // 'pane' (minuscolo, generico) deve risolvere a 'Pane comune' via NOMI_CANONICI
  const vGenerico = win.getValoriCREA('pane', null);
  const vCanonico = win.getValoriCREA('Pane comune', null);
  assert.ok(vGenerico, 'Il nome generico "pane" dovrebbe risolvere tramite NOMI_CANONICI');
  assert.deepStrictEqual(vGenerico, vCanonico, 'Il lookup generico deve restituire gli stessi valori del nome canonico');
});

test('S2 getValoriCREA — case-insensitive anche con maiuscole/minuscole miste', () => {
  const v1 = win.getValoriCREA('PANE', null);
  const v2 = win.getValoriCREA('Pane comune', null);
  assert.deepStrictEqual(v1, v2);
});

test('S2 getValoriCREA — fallback su categoria funzionale quando nome non riconosciuto', () => {
  const vFrutta = win.getValoriCREA('Alimento inesistente xyz', 'frutta');
  const vVerdura = win.getValoriCREA('Alimento inesistente xyz', 'verdura');
  const vGrasso = win.getValoriCREA('Alimento inesistente xyz', 'grasso');
  const vLegumi = win.getValoriCREA('Alimento inesistente xyz', 'legumi');
  assert.ok(vFrutta, 'Fallback categoria "frutta" deve restituire "Frutta mista"');
  assert.ok(vVerdura, 'Fallback categoria "verdura" deve restituire "Verdura mista"');
  assert.ok(vGrasso, 'Fallback categoria "grasso" deve restituire "Frutta secca mista"');
  assert.ok(vLegumi, 'Fallback categoria "legumi" deve restituire "Legumi mista"');
});

test('S2 getValoriCREA — nessun match e nessuna categoria fallback → null (comportamento "non verificabile", chiave per P61)', () => {
  const v = win.getValoriCREA('Vellutata di zucca con crostini e semi', null);
  assert.strictEqual(v, null, 'Una riga ricetta libera non riconosciuta deve restituire null, non un fallback silenzioso');
});
