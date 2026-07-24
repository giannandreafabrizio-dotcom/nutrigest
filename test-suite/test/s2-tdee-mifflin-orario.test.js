// ── S2 — P114 passo 7 (cross-check Mifflin) + passo 8 (orario allenamento AI) ──
// Fissa il contratto su:
//  - _crossCheckMifflin dentro calcolaTDEE: confronto MB InBody vs Mifflin-St
//    Jeor, bandierina SOLO se |divergenza| > 15% (non tocca nessun calcolo);
//  - costruisciContestoPaziente: l'orario di allenamento e la direttiva
//    pre/post-workout entrano nel contesto passato all'AI.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();

// Nascita che dà ~40 anni (l'età esatta è ricalcolata nel test, non hardcoded).
const NASCITA = '1986-01-01';
const etaAttesa = Math.floor((Date.now() - new Date(NASCITA).getTime()) / 31557600000);
// Mifflin-St Jeor M, 90 kg, 180 cm: 10×90 + 6.25×180 − 5×età + 5
const mifflinAtteso = Math.round(10 * 90 + 6.25 * 180 - 5 * etaAttesa + 5);

function ct(paz) {
  const o = win.eval('(' + JSON.stringify(paz) + ')');
  return win.calcolaTDEE(o);
}
function ctx(paz) {
  const o = win.eval('(' + JSON.stringify(paz) + ')');
  return win.costruisciContestoPaziente(o);
}
// Paziente base: MB 1700, peso 90, altezza 180, M, ~40 anni, InBody recente.
const IB = new Date(Date.now() - 10 * 864e5).toISOString().slice(0, 10);
function base(extra) {
  return Object.assign({
    id: 'p1', nome: 'Mario', cognome: 'Rossi',
    sesso: 'M', altezza: 180, nascita: NASCITA,
    inbody: [{ data: IB, peso: 90, pg: 30, mb: 1700 }]
  }, extra);
}

// ── PASSO 7 ────────────────────────────────────────────────────────────────
test('P114-7 — MB plausibile: cross-check calcolato, nessuna bandierina', () => {
  const r = ct(base());
  assert.ok(r.crossCheck, 'crossCheck presente quando ci sono i dati anagrafici');
  assert.strictEqual(r.crossCheck.mifflin, mifflinAtteso, 'BMR Mifflin calcolato correttamente');
  assert.strictEqual(r.crossCheck.mb, 1700);
  const divAtteso = Math.round(Math.abs(1700 - mifflinAtteso) / mifflinAtteso * 100);
  assert.strictEqual(r.crossCheck.divergenzaPct, divAtteso);
  assert.strictEqual(r.crossCheck.flag, divAtteso > 15, 'flag = divergenza > 15%');
  assert.strictEqual(r.crossCheck.flag, false, 'MB 1700 vs Mifflin è entro soglia → niente bandierina');
});

test('P114-7 — MB con refuso grossolano: bandierina alzata', () => {
  const r = ct(base({ inbody: [{ data: IB, peso: 90, pg: 30, mb: 1000 }] }));
  assert.ok(r.crossCheck.flag, 'MB 1000 (probabile refuso) diverge oltre il 15%');
  assert.ok(r.crossCheck.divergenzaPct > 15);
});

test('P114-7 — la bandierina NON cambia il TDEE (solo trasparenza)', () => {
  const conFlag = ct(base({ inbody: [{ data: IB, peso: 90, pg: 30, mb: 1000 }], passiGiornalieri: 8000, fontePassi: 'misurati' }));
  // stesso MB, senza dati anagrafici (nessun cross-check possibile)
  const senzaCheck = ct({ id: 'p1', inbody: [{ data: IB, peso: 90, pg: 30, mb: 1000 }], passiGiornalieri: 8000, fontePassi: 'misurati' });
  assert.strictEqual(senzaCheck.crossCheck, null, 'senza sesso/altezza/nascita nessun cross-check');
  assert.strictEqual(conFlag.tdee, senzaCheck.tdee, 'il TDEE è identico con o senza bandierina');
});

test('P114-7 — dati anagrafici incompleti → nessun cross-check (null)', () => {
  assert.strictEqual(ct(base({ sesso: null })).crossCheck, null, 'manca sesso');
  assert.strictEqual(ct(base({ altezza: null })).crossCheck, null, 'manca altezza');
  assert.strictEqual(ct(base({ nascita: null })).crossCheck, null, 'manca nascita');
});

test('P114-7 — soglia 15% è STRETTA (> 15, non ≥)', () => {
  // Costruisce un MB che dà esattamente ~15% di divergenza sopra Mifflin.
  const mb15 = Math.round(mifflinAtteso * 1.15);
  const r = ct(base({ inbody: [{ data: IB, peso: 90, pg: 30, mb: mb15 }] }));
  assert.strictEqual(r.crossCheck.flag, r.crossCheck.divergenzaPct > 15,
    'coerenza flag/percentuale al confine');
});

// ── PASSO 8 ────────────────────────────────────────────────────────────────
test('P114-8 — orario allenamento entra nel contesto AI con direttiva peri-workout', () => {
  const c = ctx(base({ orarioAllenamento: 'Sera', passiGiornalieri: 8000 }));
  assert.ok(/Orario allenamento:\s*Sera/.test(c), 'orario presente nel contesto');
  assert.ok(/pre-workout/i.test(c) && /post-workout/i.test(c), 'direttiva pre/post-workout presente');
});

test('P114-8 — orario Variabile riporta la nota', () => {
  const c = ctx(base({ orarioAllenamento: 'Variabile', orarioAllenamentoNote: 'dopo lavoro', passiGiornalieri: 8000 }));
  assert.ok(/Variabile \(dopo lavoro\)/.test(c), 'nota dell\'orario variabile inclusa');
});

test('P114-8 — senza orario allenamento nessuna riga peri-workout', () => {
  const c = ctx(base({ passiGiornalieri: 8000 }));
  assert.ok(!/Orario allenamento:/.test(c), 'nessuna riga orario se il campo è vuoto');
});
