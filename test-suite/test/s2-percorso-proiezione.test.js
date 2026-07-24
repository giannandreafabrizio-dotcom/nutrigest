// ── S2 — P115 Tappa 2: proiezione ibrida del peso ──
// Fissa il contratto su _percorsoProiezione:
//  - metodo "teorica": pendenza = deficit prescritto (pct del TDEE stimato) / 7700;
//  - metodo "calibrata": TDEE osservato disponibile → il riferimento diventa quello,
//    e in mantenimento con osservato < stimato la pendenza diventa POSITIVA
//    (l'adattamento metabolico si vede, non si nasconde);
//  - cono di incertezza che si allarga nel tempo;
//  - intervallo di raggiungimento obiettivo (dal = bordo ottimista, al = prudente);
//  - degradazioni pulite (ok:false con motivo) senza percorso/pesi/entro percorso concluso.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();
const inWin = o => win.eval('(' + JSON.stringify(o) + ')');
const G = 864e5;
const iso = t => { const d = new Date(t); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
const OGGI = iso(Date.now());

// Paziente base: MB 1700, passi misurati → TDEE deterministico, affidabilità alta.
function pazBase(extra) {
  return Object.assign({
    id: 'pp', inbody: [{ data: OGGI, peso: 90, pg: 30, mb: 1700 }],
    passiGiornalieri: 8000, fontePassi: 'misurati'
  }, extra);
}

test('PROIEZIONE — teorica: pendenza settimanale = pct del TDEE / 7700', () => {
  const paz = inWin(pazBase({ percorso: { inizio: OGGI, fasi: [{ tipo: 'deficit', settimane: 20, pct: -20 }] } }));
  const tdee = win.calcolaTDEE(paz).tdee;
  const r = win._percorsoProiezione(paz);
  assert.ok(r.ok);
  assert.strictEqual(r.metodo, 'teorica');
  assert.strictEqual(r.tdeeRef, tdee, 'senza TDEE osservato il riferimento è lo stimato');
  const attesoSett1 = 90 - tdee * 0.20 * 7 / 7700;
  assert.ok(Math.abs(r.punti[1].kg - attesoSett1) < 0.02, 'dopo 7 giorni: ' + r.punti[1].kg + ' vs ' + attesoSett1.toFixed(2));
  assert.ok(r.punti[r.punti.length - 1].kg < r.punti[1].kg, 'il peso continua a scendere nel deficit');
});

test('PROIEZIONE — il cono si allarga col tempo', () => {
  const paz = inWin(pazBase({ percorso: { inizio: OGGI, fasi: [{ tipo: 'deficit', settimane: 12, pct: -18 }] } }));
  const r = win._percorsoProiezione(paz);
  const larghezza = q => q.hi - q.lo;
  assert.ok(larghezza(r.punti[2]) > larghezza(r.punti[1]), 'settimana 2 più larga della 1');
  assert.ok(larghezza(r.punti[r.punti.length - 1]) > larghezza(r.punti[2]), 'la fine è la più larga');
});

test('PROIEZIONE — calibrata: mantenimento con TDEE osservato < stimato → il peso RISALE', () => {
  const d70 = iso(Date.now() - 70 * G), d50 = iso(Date.now() - 50 * G), d10 = iso(Date.now() - 10 * G);
  const paz = inWin(pazBase({
    inbody: [{ data: d70, peso: 90, pg: 30, mb: 1700 }],
    pesiIntermedi: [{ data: d50, peso: 89.2 }, { data: d10, peso: 87.8 }],
    macrosStorico: [{ kcal: 1800, timestamp: Date.now() - 70 * G }],
    percorso: { inizio: d10, fasi: [{ tipo: 'mantenimento', settimane: 8, pct: 0 }] }
  }));
  const oss = win.calcolaTDEEOsservato(paz);
  assert.ok(oss.ok, 'fixture valida per il TDEE osservato: ' + (oss.motivo || ''));
  const r = win._percorsoProiezione(paz);
  assert.strictEqual(r.metodo, 'calibrata');
  assert.strictEqual(r.tdeeRef, oss.tdeeOss);
  assert.strictEqual(r.rangePct, 8, 'calibrata → cono più stretto');
  const stim = win.calcolaTDEE(paz).tdee;
  assert.ok(oss.tdeeOss < stim, 'nel fixture l\'osservato è sotto lo stimato');
  assert.ok(r.punti[r.punti.length - 1].kg > r.punti[0].kg, 'intake=stimato ma fabbisogno reale più basso → risalita visibile');
});

test('PROIEZIONE — obiettivo: intervallo dal (ottimista) / al (prudente), dal ≤ al', () => {
  const paz = inWin(pazBase({ pesoTarget: 87,
    percorso: { inizio: OGGI, fasi: [{ tipo: 'deficit', settimane: 20, pct: -20 }] } }));
  const r = win._percorsoProiezione(paz);
  assert.ok(r.obiettivo, 'obiettivo raggiungibile nel percorso');
  assert.ok(r.obiettivo.dal <= r.obiettivo.centro, 'il bordo ottimista arriva prima del centro');
  assert.ok(r.obiettivo.al === null || r.obiettivo.centro <= r.obiettivo.al, 'il prudente arriva dopo (o oltre il percorso)');
  assert.strictEqual(r.obiettivo.raggiungibile, true);
});

test('PROIEZIONE — degradazioni pulite: senza fasi, senza pesi, percorso concluso', () => {
  assert.strictEqual(win._percorsoProiezione(inWin(pazBase({}))).ok, false, 'senza percorso');
  const senzaPesi = inWin({ id: 'x', percorso: { inizio: OGGI, fasi: [{ tipo: 'deficit', settimane: 4, pct: -18 }] } });
  assert.strictEqual(win._percorsoProiezione(senzaPesi).ok, false, 'senza pesi');
  const concluso = inWin(pazBase({ percorso: { inizio: iso(Date.now() - 100 * G), fasi: [{ tipo: 'deficit', settimane: 2, pct: -18 }] } }));
  const r = win._percorsoProiezione(concluso);
  assert.strictEqual(r.ok, false);
  assert.ok(/concluso/.test(r.motivo));
});

test('PROIEZIONE — il cono entra nel grafico SVG e la proiezione NON tocca i calcoli', () => {
  const paz = inWin(pazBase({ percorso: { inizio: OGGI, fasi: [{ tipo: 'deficit', settimane: 12, pct: -18 }] } }));
  const svg = win._percorsoChartSvg(paz);
  assert.ok(/stroke-dasharray="5 4"/.test(svg), 'linea centrale tratteggiata presente');
  assert.ok(/rgba\(42,120,214,0\.14\)/.test(svg), 'cono presente');
  const prima = win.calcolaTDEE(paz).tdee;
  win._percorsoProiezione(paz);
  assert.strictEqual(win.calcolaTDEE(paz).tdee, prima, 'TDEE identico prima/dopo la proiezione');
});
