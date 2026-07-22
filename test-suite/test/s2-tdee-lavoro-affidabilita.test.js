// ── S2 — P114 passo 2 (modificatore lavoro nel NEAT) + passo 5 (affidabilità) ──
// Fissa il contratto di calcolaTDEE su:
//  - _bonusLavoroFrazione: bonus SOLO se passi non misurati (no doppio conteggio),
//    frazioni in-piedi 0.06 / pesante 0.13, tetto NEAT totale 0.60;
//  - un lavoro attivo basta a usare il metodo MET additivo anche senza passi;
//  - _affidabilitaTDEE: semaforo 🟢/🟡/🔴 + intervallo tdeeMin/tdeeMax.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();

const isoDaOra = giorni => new Date(Date.now() - giorni * 864e5).toISOString().slice(0, 10);
const IB_RECENTE = isoDaOra(10);   // InBody recente
const IB_VECCHIO = isoDaOra(200);  // InBody oltre 4 mesi

// Costruisce il paziente NEL realm di win e chiama la funzione reale dell'app.
function ct(paz) {
  const o = win.eval('(' + JSON.stringify(paz) + ')');
  return win.calcolaTDEE(o);
}
// Base: MB 1700, peso 90, InBody recente.
function base(extra) {
  return Object.assign({
    id: 'p1', inbody: [{ data: IB_RECENTE, peso: 90, pg: 30, mb: 1700 }]
  }, extra);
}

test('P114-2 — passi MISURATI: nessun bonus lavoro (anti doppio conteggio)', () => {
  const sedent = ct(base({ passiGiornalieri: 8000, fontePassi: 'misurati', tipoLavoro: 'sedentario' }));
  const pesante = ct(base({ passiGiornalieri: 8000, fontePassi: 'misurati', tipoLavoro: 'pesante' }));
  assert.strictEqual(pesante.bonusLavoro, 0, 'passi misurati → bonus 0 anche con lavoro pesante');
  assert.strictEqual(pesante.neat, sedent.neat, 'NEAT identico: lo stare in piedi è già nei passi misurati');
  assert.strictEqual(sedent.neat, 553, 'NEAT base 8000 passi su MB 1700 = 553');
});

test('P114-2 — passi STIMATI: bonus in piedi 0.06 e pesante 0.13', () => {
  const inPiedi = ct(base({ passiGiornalieri: 8000, fontePassi: 'stimati', tipoLavoro: 'in-piedi' }));
  assert.strictEqual(inPiedi.bonusLavoro, 0.06);
  assert.strictEqual(inPiedi.neat, 655, 'NEAT (0.325+0.06)×1700');
  const pesante = ct(base({ passiGiornalieri: 8000, fontePassi: 'stimati', tipoLavoro: 'pesante' }));
  assert.strictEqual(pesante.bonusLavoro, 0.13);
  assert.strictEqual(pesante.neat, 774, 'NEAT (0.325+0.13)×1700');
});

test('P114-2 — fonte passi vuota è trattata come stimata (bonus applicato)', () => {
  const r = ct(base({ passiGiornalieri: 8000, fontePassi: '', tipoLavoro: 'in-piedi' }));
  assert.strictEqual(r.bonusLavoro, 0.06);
});

test('P114-2 — tetto NEAT 0.60: 12000 passi (0.50) + pesante (0.13) è limitato', () => {
  const r = ct(base({ passiGiornalieri: 12000, fontePassi: 'stimati', tipoLavoro: 'pesante' }));
  assert.ok(Math.abs(r.neatFraz - 0.60) < 1e-9, 'frazione NEAT limitata a 0.60');
  assert.strictEqual(r.neat, 1020, '0.60 × 1700');
});

test('P114-2 — lavoro attivo senza passi usa il metodo MET (non LAF manuale)', () => {
  const r = ct(base({ tipoLavoro: 'pesante', fontePassi: 'stimati' }));
  assert.ok(/MET additivo/.test(r.metodo), 'un lavoro pesante è un dato di attività');
  assert.strictEqual(r.neat, 476, 'NEAT (0.15 base passi mancanti + 0.13) × 1700');
});

test('P114-5 — affidabilità ALTA: passi misurati + allenamento in minuti + InBody recente', () => {
  const r = ct(base({ passiGiornalieri: 8000, fontePassi: 'misurati', seduteSettimana: 3, minutiSeduta: 60 }));
  assert.strictEqual(r.affidabilita.livello, 'alta');
  assert.strictEqual(r.affidabilita.rangePct, 8);
  assert.strictEqual(r.affidabilita.tdeeMin, Math.round(r.tdee * 0.92));
  assert.strictEqual(r.affidabilita.tdeeMax, Math.round(r.tdee * 1.08));
  assert.ok(r.affidabilita.tdeeMin < r.tdee && r.tdee < r.affidabilita.tdeeMax);
});

test('P114-5 — affidabilità MEDIA: passi stimati', () => {
  const r = ct(base({ passiGiornalieri: 8000, fontePassi: 'stimati', seduteSettimana: 3, minutiSeduta: 60 }));
  assert.strictEqual(r.affidabilita.livello, 'media');
  assert.strictEqual(r.affidabilita.rangePct, 13);
});

test('P114-5 — affidabilità MEDIA→BASSA: passi mancanti + ore approssimate + InBody vecchio', () => {
  const r = ct({ id: 'p2', inbody: [{ data: IB_VECCHIO, peso: 90, pg: 30, mb: 1700 }], oreAllenamento: 4, tipoLavoro: 'in-piedi', fontePassi: 'stimati' });
  // passi mancanti (+2) + ore legacy senza minuti (+1) + InBody >120gg (+1) = 4 → bassa
  assert.strictEqual(r.affidabilita.livello, 'bassa');
  assert.strictEqual(r.affidabilita.rangePct, 18);
});

test('P114-5 — LAF manuale (nessun dato attività) → affidabilità BASSA, range ±20%', () => {
  const r = ct(base({ tipoLavoro: 'sedentario' }));
  assert.ok(/LAF manuale/.test(r.metodo));
  assert.strictEqual(r.affidabilita.livello, 'bassa');
  assert.strictEqual(r.affidabilita.rangePct, 20);
  assert.strictEqual(r.affidabilita.tdeeMin, Math.round(r.tdee * 0.80));
  assert.strictEqual(r.affidabilita.tdeeMax, Math.round(r.tdee * 1.20));
});
