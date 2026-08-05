// ── S2 — P115 Tappa 3: corsia energia (serie introito/TDEE/osservato) ──
// Fissa il contratto su _percorsoSerieEnergia:
//  - intake PASSATO dagli slot macrosStorico (ogni slot vale fino al successivo,
//    stessa semantica di _kcalMediaPrescrittaOss), clampato a [t0, oggi];
//  - intake FUTURO dalle fasi (pct del TDEE stimato corrente = _percorsoKcalFase);
//  - tdee: gradini storici (campo tdee degli slot) + tratto "attuale" fino a t1;
//  - oss: segmento [dal..al] del TDEE osservato quando calcolabile;
//  - la corsia entra nel grafico SOLO se esiste un percorso con fasi.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();
const inWin = o => win.eval('(' + JSON.stringify(o) + ')');
const G = 864e5;
const iso = t => { const d = new Date(t); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0') };
const OGGI_MS = new Date(iso(Date.now()) + 'T00:00:00').getTime();

function pazBase(extra) {
  return Object.assign({
    id: 'pe', inbody: [{ data: iso(Date.now()), peso: 90, pg: 30, mb: 1700 }],
    passiGiornalieri: 8000, fontePassi: 'misurati'
  }, extra);
}

test('ENERGIA — slot storici: ogni slot vale fino al successivo, poi fino a oggi', () => {
  const t60 = OGGI_MS - 60 * G, t20 = OGGI_MS - 20 * G;
  const paz = inWin(pazBase({
    macrosStorico: [{ kcal: 1800, tdee: 2400, timestamp: t60 }, { kcal: 1600, tdee: 2350, timestamp: t20 }],
    percorso: { inizio: iso(Date.now()), fasi: [{ tipo: 'deficit', settimane: 8, pct: -20 }] }
  }));
  const en = win._percorsoSerieEnergia(paz, t60 - 10 * G, OGGI_MS + 56 * G);
  const storici = en.intake.filter(g => g.fonte === 'storico');
  assert.strictEqual(storici.length, 2);
  assert.strictEqual(storici[0].kcal, 1800);
  assert.strictEqual(storici[0].da, t60, 'il primo slot parte dal suo timestamp');
  assert.strictEqual(storici[0].a, t20, 'e vale fino al timestamp del successivo');
  assert.strictEqual(storici[1].kcal, 1600);
  assert.strictEqual(storici[1].a, OGGI_MS, "l'ultimo slot vale fino a oggi");
  const tdeeStorici = en.tdee.filter(g => g.fonte === 'storico').map(g => g.kcal);
  // NB: [...spread] per confrontare nel realm del test (l'array arriva dal realm JSDOM)
  assert.deepStrictEqual([...tdeeStorici], [2400, 2350], 'gradini TDEE fotografati negli slot');
  assert.strictEqual(en.tdee[en.tdee.length - 1].fonte, 'attuale', 'tratto attuale in coda');
  assert.strictEqual(en.tdee[en.tdee.length - 1].kcal, win.calcolaTDEE(paz).tdee);
});

test('ENERGIA — clamping: slot più vecchio di t0 parte da t0, nulla oltre t1', () => {
  const t100 = OGGI_MS - 100 * G, t0 = OGGI_MS - 30 * G, t1 = OGGI_MS + 10 * G;
  const paz = inWin(pazBase({
    macrosStorico: [{ kcal: 2000, tdee: 2500, timestamp: t100 }],
    percorso: { inizio: iso(Date.now()), fasi: [{ tipo: 'deficit', settimane: 20, pct: -18 }] }
  }));
  const en = win._percorsoSerieEnergia(paz, t0, t1);
  assert.strictEqual(en.intake[0].da, t0, 'clampato a t0');
  en.intake.concat(en.tdee).forEach(g => {
    assert.ok(g.da >= t0 && g.a <= t1, 'ogni segmento dentro [t0,t1]');
  });
});

test('ENERGIA — intake futuro = kcal delle fasi (pct del TDEE stimato corrente)', () => {
  const paz = inWin(pazBase({
    percorso: { inizio: iso(Date.now()), fasi: [{ tipo: 'deficit', settimane: 4, pct: -20 }, { tipo: 'mantenimento', settimane: 4, pct: 0 }] }
  }));
  const en = win._percorsoSerieEnergia(paz, OGGI_MS - 5 * G, OGGI_MS + 56 * G);
  const fasi = en.intake.filter(g => g.fonte === 'fase');
  assert.strictEqual(fasi.length, 2);
  assert.strictEqual(fasi[0].kcal, win._percorsoKcalFase(paz, -20));
  assert.strictEqual(fasi[1].kcal, win._percorsoKcalFase(paz, 0));
  assert.ok(fasi[0].da >= OGGI_MS, 'il futuro parte da oggi, mai dal passato');
});

test('ENERGIA — TDEE osservato come segmento sul suo tratto di calcolo', () => {
  const d70 = iso(Date.now() - 70 * G), d50 = iso(Date.now() - 50 * G), d10 = iso(Date.now() - 10 * G);
  const paz = inWin(pazBase({
    // P35 tappa 1 (5 ago 2026): il TDEE osservato si calibra SOLO su misurazioni
    // di studio — due bilance diverse non calibrano un metabolismo. La fixture
    // usava due pesate di casa: ora sono tre InBody, con d70 come ancora della
    // fase acqua/glicogeno (i primi 14 giorni restano esclusi).
    inbody: [{ data: d70, peso: 90, pg: 30, mb: 1700 },
             { data: d50, peso: 89.2, pg: 29, mb: 1700 },
             { data: d10, peso: 87.8, pg: 28, mb: 1700 }],
    macrosStorico: [{ kcal: 1800, tdee: 2500, timestamp: Date.now() - 70 * G }],
    percorso: { inizio: d10, fasi: [{ tipo: 'mantenimento', settimane: 8, pct: 0 }] }
  }));
  const oss = win.calcolaTDEEOsservato(paz);
  assert.ok(oss.ok, 'fixture osservato valida: ' + (oss.motivo || ''));
  const en = win._percorsoSerieEnergia(paz, OGGI_MS - 80 * G, OGGI_MS + 56 * G);
  assert.ok(en.oss, 'segmento osservato presente');
  assert.strictEqual(en.oss.kcal, oss.tdeeOss);
  assert.ok(en.oss.da < en.oss.a, 'segmento con estensione temporale reale');
});

test('ENERGIA — la corsia è nel grafico SOLO con un percorso', () => {
  const conPercorso = inWin(pazBase({
    macrosStorico: [{ kcal: 1800, tdee: 2400, timestamp: OGGI_MS - 30 * G }],
    percorso: { inizio: iso(Date.now()), fasi: [{ tipo: 'deficit', settimane: 8, pct: -18 }] }
  }));
  const svg1 = win._percorsoChartSvg(conPercorso);
  assert.ok(/Energia \(kcal\)/.test(svg1), 'titolo corsia presente');
  assert.ok(/#eb6834/.test(svg1) && /#0F6E56/.test(svg1), 'introito e TDEE stimato disegnati');
  const soloPesi = inWin({ id: 'sp',
    inbody: [{ data: iso(Date.now() - 30 * G), peso: 90, pg: 30, mb: 1700 }],
    pesiIntermedi: [{ data: iso(Date.now() - 5 * G), peso: 89 }] });
  const svg2 = win._percorsoChartSvg(soloPesi);
  assert.ok(svg2 && !/Energia \(kcal\)/.test(svg2), 'senza percorso niente corsia');
  assert.ok(/viewBox="0 0 1000 400"/.test(svg2), 'layout compatto invariato senza percorso');
});
