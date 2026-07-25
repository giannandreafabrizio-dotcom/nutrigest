// ── S2 — P37 pescata bilanciata dell'elenco ispirazione (25 lug 2026) ──
// Fissa il contratto della sostituzione di `ricetteDB.slice(0,80)` con
// `_ricPescaBilanciata()` dentro costruisciPrompt: tetto 120, quote per pasto
// ATTIVO, pescata casuale dentro ogni gruppo, deduplica dei nomi, nessun
// gruppo affamato da un ricettario sbilanciato.
// La funzione è annidata in costruisciPrompt (non esportata): si verifica
// dall'esterno leggendo la riga "Per ispirazione attingi a: ..." del prompt.
// NB: db/currentPazId sono `let` top-level → setup via win.eval().
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();

// Paziente non-keto con TUTTI i pasti attivi (colazione, spuntini, pranzo,
// cena, pre-nanna): così _mealActive è tutto true e nessun gruppo è spento.
const pazJson = JSON.stringify({
  id: 'isp1', nome: 'Anna', cognome: 'Bianchi', strategia: 'normocalorica',
  regime: 'Normocalorico', allergie: '',
  colazione: 'si', spuntM: 'si', spuntP: 'si', pranzo: 'si', cena: 'si', prenanna: 'si',
  inbody: [{ data: '2026-07-01', peso: 70, m: 52, pg: 26, mb: 1450, bmi: 24, pesoIdeale: 62 }],
  passiGiornalieri: 8000,
  macrosTarget: { kcal: 1800, protG: 100, carbG: 190, grassiG: 65, protGkg: 1.5, ref: 'ideale', strategia: 'normocalorica' },
  macrosStorico: [], regolePiano: {}, alimenti: {}
});
win.eval(`db.pazienti=[${pazJson}]; currentPazId='isp1'; _macrosPaziente=db.pazienti[0];`);

// Helper: costruisce N ricette per una categoria, senza stagione (→ valide
// tutto l'anno, il filtro stagionale non interferisce) e senza virgole nel
// nome (il prompt le unisce con ', ').
function ric(cat, n, prefix) {
  const out = [];
  for (let i = 1; i <= n; i++) {
    out.push({
      id: `${prefix}_${i}`,
      nome: `${prefix} ${String(i).padStart(3, '0')}`,
      cat: Array.isArray(cat) ? cat : [cat],
      tipo: 'completo',
      kcal: 400, prot: 25, carb: 40, grassi: 12,
      ing: 'Ingrediente generico 100g',
      desc: 'Preparazione generica.',
      tags: [], attributi: { stagioni: [], tempoPrep: 'medio', profilo: [] }
    });
  }
  return out;
}

function setRicette(arr) {
  win.eval(`db.ricette=${JSON.stringify(arr)};`);
}

// Estrae i nomi dalla riga "Per ispirazione attingi a: A, B, C."
function nomiIspirazione() {
  const prompt = win.eval('costruisciPrompt("isp1")');
  const m = prompt.match(/Per ispirazione attingi a: (.*)\.\n/);
  assert.ok(m, 'riga ispirazione presente nel prompt');
  if (m[1] === 'cucina italiana tradizionale') return [];
  return m[1].split(', ').filter(Boolean);
}

test('S2 P37 — ricettario grande (200 ricette): tetto a 120 nomi, nessun duplicato', () => {
  setRicette([].concat(
    ric('colazione', 50, 'COL'),
    ric('spuntino', 30, 'SPU'),
    ric('pranzo', 60, 'PRA'),
    ric('cena', 60, 'CEN')
  ));
  const nomi = nomiIspirazione();
  assert.strictEqual(nomi.length, 120, 'il tetto è 120, non più 80');
  assert.strictEqual(new Set(nomi).size, 120, 'nessun nome ripetuto');
});

test('S2 P37 — ogni pasto attivo è rappresentato (nessun gruppo escluso a priori)', () => {
  const nomi = nomiIspirazione();
  ['COL', 'SPU', 'PRA', 'CEN'].forEach(pfx => {
    assert.ok(nomi.some(n => n.startsWith(pfx)), `almeno una ricetta ${pfx} nella pescata`);
  });
});

test('S2 P37 — la pescata è casuale: due generazioni non danno lo stesso elenco', () => {
  const a = nomiIspirazione().join('|');
  const b = nomiIspirazione().join('|');
  assert.notStrictEqual(a, b, 'due chiamate consecutive attingono a pool diversi');
});

test('S2 P37 — ricettario sbilanciato: le poche colazioni non vengono annegate dai pranzi', () => {
  setRicette([].concat(
    ric('colazione', 5, 'COL'),
    ric('pranzo', 150, 'PRA')
  ));
  const nomi = nomiIspirazione();
  const col = nomi.filter(n => n.startsWith('COL'));
  assert.strictEqual(col.length, 5, 'tutte e 5 le colazioni disponibili arrivano all\'AI');
  assert.ok(nomi.length <= 120, 'tetto rispettato');
  assert.ok(nomi.length >= 100, 'i posti avanzati dalle colazioni vengono redistribuiti ai pranzi');
});

test('S2 P37 — ricettario piccolo (sotto il tetto): passano tutte, nessuna regressione', () => {
  setRicette([].concat(
    ric('colazione', 3, 'COL'),
    ric('pranzo', 4, 'PRA'),
    ric('cena', 4, 'CEN')
  ));
  const nomi = nomiIspirazione();
  assert.strictEqual(nomi.length, 11, 'con 11 ricette arrivano tutte e 11');
});

test('S2 P37 — ricetta su due pasti (pranzo+cena) conta una volta sola', () => {
  setRicette([].concat(
    ric(['pranzo', 'cena'], 10, 'DUE'),
    ric('colazione', 2, 'COL')
  ));
  const nomi = nomiIspirazione();
  assert.strictEqual(new Set(nomi).size, nomi.length, 'nessun doppione');
  assert.strictEqual(nomi.filter(n => n.startsWith('DUE')).length, 10, 'le 10 doppio-pasto compaiono una volta ciascuna');
});

test('S2 P37 — ricette a pasto indeterminato: tenute, ma con quota propria (max 15%)', () => {
  const senzaPasto = ric('spuntino', 60, 'AMB').map(r => { delete r.cat; r.tags = []; return r; });
  setRicette([].concat(
    ric('colazione', 40, 'COL'),
    ric('pranzo', 40, 'PRA'),
    ric('cena', 40, 'CEN'),
    senzaPasto
  ));
  const nomi = nomiIspirazione();
  const amb = nomi.filter(n => n.startsWith('AMB'));
  assert.ok(amb.length > 0, 'le ricette senza pasto determinabile non vengono scartate');
  assert.ok(amb.length <= 18, 'ma non occupano più del 15% del tetto (120 × 0.15 = 18)');
});

test('S2 P37 — ricettario vuoto: fallback testuale invariato', () => {
  setRicette([]);
  const prompt = win.eval('costruisciPrompt("isp1")');
  assert.ok(/Per ispirazione attingi a: cucina italiana tradizionale\./.test(prompt),
    'senza ricette resta il fallback "cucina italiana tradizionale"');
});
