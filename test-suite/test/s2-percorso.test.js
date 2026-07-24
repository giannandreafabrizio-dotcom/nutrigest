// ── S2 — P9-PERCORSO Tappa 1: modello dati fasi + timeline ──
// Fissa il contratto su:
//  - _percorsoGet: normalizzazione (scarta fasi invalide, null senza inizio valido);
//  - _percorsoIntervalli: fasi CONSECUTIVE con date locali corrette (mai UTC-shift);
//  - _percorsoFaseAt: confini ("dal" incluso, "al" escluso), fuori percorso = null;
//  - _percorsoKcalFase: pct del TDEE corrente (coerente con calcolaTDEE);
//  - _percorsoChartSvg: vuoto senza dati, SVG con bande/peso quando i dati ci sono.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();

function inWin(obj){ return win.eval('(' + JSON.stringify(obj) + ')'); }

const PERCORSO = { inizio: '2026-01-05', fasi: [
  { tipo: 'deficit',      settimane: 4, pct: -18 },
  { tipo: 'mantenimento', settimane: 2, pct: 0 },
  { tipo: 'deficit',      settimane: 3, pct: -15 },
]};

test('PERCORSO — _percorsoGet normalizza e scarta le fasi invalide', () => {
  const p = inWin({ percorso: { inizio: '2026-01-05', fasi: [
    { tipo: 'deficit', settimane: 4, pct: -18 },
    { tipo: 'inesistente', settimane: 4, pct: -18 },  // tipo sconosciuto
    { tipo: 'surplus', settimane: 0, pct: 8 },        // durata nulla
    { tipo: 'mantenimento', settimane: 2, pct: 'x' }, // pct non numerica
  ]}});
  const pc = win._percorsoGet(p);
  assert.strictEqual(pc.fasi.length, 1, 'sopravvive solo la fase valida');
  assert.strictEqual(pc.fasi[0].tipo, 'deficit');
});

test('PERCORSO — _percorsoGet: null senza percorso o con inizio invalido', () => {
  assert.strictEqual(win._percorsoGet(inWin({})), null);
  assert.strictEqual(win._percorsoGet(inWin({ percorso: { fasi: [] } })), null);
  assert.strictEqual(win._percorsoGet(inWin({ percorso: { inizio: 'boh', fasi: [] } })), null);
});

test('PERCORSO — intervalli consecutivi con date locali giuste (no slittamento UTC)', () => {
  const ints = win._percorsoIntervalli(inWin(PERCORSO));
  assert.strictEqual(ints.length, 3);
  assert.strictEqual(ints[0].dal, '2026-01-05', 'la prima fase parte ESATTAMENTE da inizio');
  assert.strictEqual(ints[0].al,  '2026-02-02', '4 settimane dopo');
  assert.strictEqual(ints[1].dal, '2026-02-02', 'consecutive: nessun buco');
  assert.strictEqual(ints[1].al,  '2026-02-16');
  assert.strictEqual(ints[2].dal, '2026-02-16');
  assert.strictEqual(ints[2].al,  '2026-03-09');
});

test('PERCORSO — _percorsoFaseAt: confini (dal incluso, al escluso) e fuori percorso', () => {
  const pc = inWin(PERCORSO);
  assert.strictEqual(win._percorsoFaseAt(pc, '2026-01-04'), null, 'prima dell’inizio');
  assert.strictEqual(win._percorsoFaseAt(pc, '2026-01-05').indice, 0, 'primo giorno = fase 1');
  assert.strictEqual(win._percorsoFaseAt(pc, '2026-02-01').indice, 0, 'ultimo giorno fase 1');
  assert.strictEqual(win._percorsoFaseAt(pc, '2026-02-02').indice, 1, 'giorno di cambio = fase che INIZIA');
  assert.strictEqual(win._percorsoFaseAt(pc, '2026-03-08').indice, 2);
  assert.strictEqual(win._percorsoFaseAt(pc, '2026-03-09'), null, 'il percorso finito non ha fase attiva');
});

test('PERCORSO — _percorsoKcalFase coerente con calcolaTDEE', () => {
  const IB = new Date(Date.now() - 5 * 864e5).toISOString().slice(0, 10);
  const paz = inWin({ id: 'p1', inbody: [{ data: IB, peso: 90, pg: 30, mb: 1700 }],
    passiGiornalieri: 8000, fontePassi: 'misurati' });
  const tdee = win.calcolaTDEE(paz).tdee;
  assert.strictEqual(win._percorsoKcalFase(paz, -20), Math.round(tdee * 0.80));
  assert.strictEqual(win._percorsoKcalFase(paz, 0), tdee);
  assert.strictEqual(win._percorsoKcalFase(inWin({ id: 'x' }), -20), null, 'senza InBody nessuna kcal');
});

test('PERCORSO — _percorsoChartSvg: vuoto senza dati, SVG con fasi e peso', () => {
  assert.strictEqual(win._percorsoChartSvg(inWin({ id: 'v' })), '', 'niente fasi e <2 pesate → stringa vuota');
  const paz = inWin({ id: 'p2', percorso: PERCORSO,
    inbody: [{ data: '2026-01-05', peso: 90, pg: 30, mb: 1700 }],
    pesiIntermedi: [{ data: '2026-01-19', peso: 88.6 }],
    pesoTarget: 82 });
  const svg = win._percorsoChartSvg(paz);
  assert.ok(/^<svg/.test(svg), 'produce un SVG');
  assert.ok((svg.match(/<rect/g) || []).length >= 3, 'una banda per fase');
  assert.ok(/88\.6 kg/.test(svg), 'etichetta ultimo peso');
  assert.ok(/obiettivo 82 kg/.test(svg), 'linea peso obiettivo');
});

test('PERCORSO — la scheda esiste: renderPdPercorso definita e mutatori presenti', () => {
  ['renderPdPercorso','percorsoInit','percorsoAddFase','percorsoUpdFase','percorsoDelFase','percorsoMoveFase','percorsoSetInizio']
    .forEach(fn => assert.strictEqual(typeof win[fn], 'function', fn + ' definita'));
});
