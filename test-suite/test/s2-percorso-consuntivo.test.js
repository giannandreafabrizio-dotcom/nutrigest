// ── S2 — P115 Tappa 5: slot consuntivo "Piano vs Realtà" (predisposizione) ──
// Fissa il CONTRATTO DATI che l'app paziente (P50) dovrà rispettare quando
// scriverà p.consuntivo, e la degradazione pulita di oggi (nessun dato → nulla
// compare, layout del grafico invariato al pixel rispetto alle Tappe 3-4):
//  - p.consuntivo = {fonte, giorni:[{data, aderenza:"ok"|"parziale"|"sgarro",
//    extraKcal>=0, ...}]} — oggetto con array dentro, mai proprietà su array;
//  - _percorsoConsuntivo (pura): normalizza/ordina/filtra, deriva l'aderenza
//    dalle extraKcal se assente (0→ok, ≤300→parziale, >300→sgarro, soglia
//    provvisoria), calcola pctAderenza, extraKcalTot, ritardoKg=extra/7700 e
//    settimanePerse=ritardo÷ritmo pianificato (media pesata fasi deficit);
//  - striscia aderenza nel grafico SOLO con dati + interruttore acceso.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();
const inWin = o => win.eval('(' + JSON.stringify(o) + ')');
const G = 864e5;
const iso = t => { const d = new Date(t); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0') };

function pazBase(extra) {
  return Object.assign({
    id: 'pv-' + Math.random().toString(36).slice(2),
    inbody: [{ data: iso(Date.now() - 30 * G), peso: 90, pg: 30, m: 60, mb: 1700 }],
    passiGiornalieri: 8000, fontePassi: 'misurati'
  }, extra);
}

test('CONSUNTIVO — senza p.consuntivo (il caso di oggi per tutti): ok:false con motivo', () => {
  const r = win._percorsoConsuntivo(inWin(pazBase({})));
  assert.strictEqual(r.ok, false);
  assert.ok(/app paziente/.test(r.motivo), 'il motivo spiega che i dati arriveranno con l\'app paziente');
});

test('CONSUNTIVO — normalizzazione: giorni invalidi scartati, ordinamento, derivazione aderenza da extraKcal', () => {
  const d3 = iso(Date.now() - 3 * G), d2 = iso(Date.now() - 2 * G), d1 = iso(Date.now() - 1 * G);
  const r = win._percorsoConsuntivo(inWin(pazBase({
    consuntivo: { fonte: 'app-paziente', giorni: [
      { data: d1, extraKcal: 500 },                      // senza aderenza, 500 kcal → derivato "sgarro"
      { data: d3, aderenza: 'ok', extraKcal: 0 },        // fuori ordine → va riordinato
      { data: 'non-una-data', aderenza: 'ok' },          // data invalida → scartato
      { data: d2, extraKcal: 200 },                      // senza aderenza, ≤300 → "parziale"
      { data: iso(Date.now()), aderenza: 'boh' }         // aderenza invalida E senza kcal → scartato
    ] }
  })));
  assert.strictEqual(r.ok, true);
  assert.strictEqual(r.giorni.length, 3, 'restano solo i 3 giorni validi');
  // NB: [...spread] per confrontare nel realm del test (lezione Tappe 3-4)
  assert.deepStrictEqual([...r.giorni].map(g => g.data), [d3, d2, d1], 'ordinati cronologicamente');
  assert.deepStrictEqual([...r.giorni].map(g => g.aderenza), ['ok', 'parziale', 'sgarro'], 'derivazione 0→ok, ≤300→parziale, >300→sgarro');
});

test('CONSUNTIVO — conteggi: pctAderenza, extraKcalTot e ritardoKg = extra ÷ 7700', () => {
  const gg = [];
  for (let i = 10; i >= 1; i--) gg.push({ data: iso(Date.now() - i * G), aderenza: i % 2 ? 'ok' : 'sgarro', extraKcal: i % 2 ? 0 : 770 });
  const r = win._percorsoConsuntivo(inWin(pazBase({ consuntivo: { giorni: gg } })));
  assert.strictEqual(r.pctAderenza, 50, '5 giorni ok su 10');
  assert.strictEqual(r.extraKcalTot, 3850, '5 sgarri × 770 kcal');
  assert.strictEqual(r.ritardoKg, 0.5, '3850 ÷ 7700 = 0.5 kg — la regola trasparente da mostrare in visita');
});

test('CONSUNTIVO — settimanePerse dal ritmo pianificato; null senza fasi deficit', () => {
  const conDeficit = inWin(pazBase({
    consuntivo: { giorni: [{ data: iso(Date.now() - 2 * G), aderenza: 'sgarro', extraKcal: 3850 }] },
    percorso: { inizio: iso(Date.now() - 10 * G), fasi: [{ tipo: 'deficit', settimane: 10, pct: -20 }] }
  }));
  const r1 = win._percorsoConsuntivo(conDeficit);
  const tdee = win.calcolaTDEE(conDeficit).tdee;
  const ritmoAtteso = tdee * 20 / 100 * 7 / 7700;   // kg/settimana del piano
  assert.ok(r1.settimanePerse != null);
  assert.ok(Math.abs(r1.settimanePerse - r1.ritardoKg / ritmoAtteso) < 0.06, 'settimane perse = ritardo ÷ ritmo del piano (± arrotondamento)');
  const soloMantenimento = inWin(pazBase({
    consuntivo: { giorni: [{ data: iso(Date.now() - 2 * G), aderenza: 'sgarro', extraKcal: 3850 }] },
    percorso: { inizio: iso(Date.now() - 10 * G), fasi: [{ tipo: 'mantenimento', settimane: 8, pct: 0 }] }
  }));
  assert.strictEqual(win._percorsoConsuntivo(soloMantenimento).settimanePerse, null, 'senza fasi deficit non esiste un ritmo di calo → null');
});

test('GRAFICO — striscia aderenza solo con dati: colori presenti, e layout invariato al pixel senza dati', () => {
  const pid = 'pv-svg-' + Math.random();
  const base = {
    id: pid,
    inbody: [{ data: iso(Date.now() - 30 * G), peso: 90, pg: 30, m: 60, mb: 1700 }],
    passiGiornalieri: 8000, fontePassi: 'misurati',
    macrosStorico: [{ kcal: 1800, tdee: 2400, timestamp: Date.now() - 20 * G }],
    percorso: { inizio: iso(Date.now() - 30 * G), fasi: [{ tipo: 'deficit', settimane: 12, pct: -18 }] }
  };
  win.percorsoVistaPreset(pid, 'tecnica');
  const svgSenza = win._percorsoChartSvg(inWin(base));
  assert.ok(!/aderenza/.test(svgSenza), 'oggi (nessun consuntivo) la striscia non esiste');
  assert.ok(/viewBox="0 0 1000 500"/.test(svgSenza), 'layout con corsia energia INVARIATO rispetto alle Tappe 3-4');
  const conDati = Object.assign({}, base, {
    consuntivo: { giorni: [
      { data: iso(Date.now() - 3 * G), aderenza: 'ok', extraKcal: 0 },
      { data: iso(Date.now() - 2 * G), aderenza: 'parziale', extraKcal: 250 },
      { data: iso(Date.now() - 1 * G), aderenza: 'sgarro', extraKcal: 900 }
    ] }
  });
  const svgCon = win._percorsoChartSvg(inWin(conDati));
  assert.ok(/aderenza/.test(svgCon), 'striscia presente con i dati');
  assert.ok(/#008300/.test(svgCon) && /#eda100/.test(svgCon) && /#e34948/.test(svgCon), 'i tre stati 🟢🟡🔴 disegnati');
  assert.ok(/\+900 kcal/.test(svgCon), 'tooltip col dettaglio dello sgarro');
  assert.ok(/viewBox="0 0 1000 524"/.test(svgCon), 'la striscia aggiunge il suo spazio (+24) solo quando esiste');
});

test('GRAFICO — interruttore consuntivo: spegnerlo toglie striscia e spazio', () => {
  const pid = 'pv-tgl-' + Math.random();
  const paz = inWin({
    id: pid,
    inbody: [{ data: iso(Date.now() - 30 * G), peso: 90, pg: 30, mb: 1700 }],
    passiGiornalieri: 8000, fontePassi: 'misurati',
    percorso: { inizio: iso(Date.now() - 30 * G), fasi: [{ tipo: 'deficit', settimane: 12, pct: -18 }] },
    consuntivo: { giorni: [{ data: iso(Date.now() - 1 * G), aderenza: 'sgarro', extraKcal: 900 }] }
  });
  win.percorsoVistaPreset(pid, 'tecnica');
  assert.ok(/aderenza/.test(win._percorsoChartSvg(paz)));
  win.percorsoLayerToggle(pid, 'consuntivo');
  const svgOff = win._percorsoChartSvg(paz);
  assert.ok(!/aderenza/.test(svgOff), 'striscia spenta');
  assert.ok(/viewBox="0 0 1000 500"/.test(svgOff), 'e il layout torna quello standard');
});

test('ISOLAMENTO — il consuntivo non tocca proiezione né TDEE (solo informativo)', () => {
  const mk = cons => inWin(pazBase({
    id: 'pv-iso',
    pesiIntermedi: [{ data: iso(Date.now() - 5 * G), peso: 89 }],
    percorso: { inizio: iso(Date.now() - 30 * G), fasi: [{ tipo: 'deficit', settimane: 12, pct: -18 }] },
    consuntivo: cons
  }));
  const senza = mk(undefined), con = mk({ giorni: [{ data: iso(Date.now() - 1 * G), aderenza: 'sgarro', extraKcal: 2000 }] });
  assert.strictEqual(win.calcolaTDEE(senza).tdee, win.calcolaTDEE(con).tdee);
  assert.deepStrictEqual(JSON.parse(JSON.stringify(win._percorsoProiezione(senza))), JSON.parse(JSON.stringify(win._percorsoProiezione(con))),
    'la proiezione ignora il consuntivo: 2000 kcal di sgarri non spostano il cono');
});
