// ── S2 — P115 Tappa 4: massa magra + interruttori strati ──
// Fissa il contratto su:
//  - _percorsoSerieMassaMagra: solo punti InBody con campo `m`, ordinati per data
//    (le pesate intermedie non registrano la massa magra, quindi non compaiono qui);
//  - _percorsoLayersGet/percorsoLayerToggle/percorsoVistaPreset: stato di sessione
//    (non su p, non salvato), default "vista tecnica" (tutto acceso);
//  - _percorsoChartSvg rispetta gli interruttori: massa magra sullo STESSO asse kg
//    del peso (nessun secondo asse), cono di proiezione, corsia energia e dettagli
//    fasi (%/kcal) si accendono/spengono senza toccare gli altri calcoli.
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
    id: 'pc-' + Math.random().toString(36).slice(2),
    inbody: [{ data: iso(Date.now() - 60 * G), peso: 92, pg: 32, m: 60, mb: 1700 }],
    passiGiornalieri: 8000, fontePassi: 'misurati'
  }, extra);
}

test('COMPOSIZIONE — _percorsoSerieMassaMagra: solo InBody con `m`, ordinata per data', () => {
  const paz = inWin(pazBase({
    inbody: [
      { data: iso(Date.now() - 40 * G), peso: 90, pg: 30, m: 61 },
      { data: iso(Date.now() - 80 * G), peso: 93, pg: 33, m: 59 },      // fuori ordine → va riordinata
      { data: iso(Date.now() - 20 * G), peso: 88, pg: null, m: null }   // senza `m` → esclusa
    ],
    pesiIntermedi: [{ data: iso(Date.now() - 10 * G), peso: 87 }]        // niente massa magra qui → mai inclusa
  }));
  const serie = win._percorsoSerieMassaMagra(paz);
  assert.strictEqual(serie.length, 2, 'solo i 2 InBody con `m` valorizzato');
  assert.ok(serie[0].data < serie[1].data, 'ordinata cronologicamente');
  assert.strictEqual(serie[0].m, 59);
  assert.strictEqual(serie[1].m, 61);
  assert.strictEqual(serie[1].pg, 30, '% grassa portata con il punto');
});

test('STRATI — default "vista tecnica": tutti gli strati accesi per un paziente mai toccato', () => {
  // NB: l'oggetto torna dal realm JSDOM — JSON round-trip per confrontarlo nel realm del test
  // (stessa causa del problema con gli array cross-realm già visto nella Tappa 3).
  const layers = JSON.parse(JSON.stringify(win._percorsoLayersGet('paz-mai-visto-' + Math.random())));
  // (Tappa 5: aggiunto lo strato "consuntivo", anch'esso acceso di default)
  assert.deepStrictEqual(layers, { massaMagra: true, proiezione: true, energia: true, dettagliFasi: true, consuntivo: true });
});

test('STRATI — percorsoLayerToggle spegne/accende UN solo strato, gli altri restano', () => {
  const pid = 'pc-toggle-' + Math.random();
  win.db = win.db || { pazienti: [] };
  win.db.pazienti.push(win.eval('(' + JSON.stringify({ id: pid }) + ')'));
  win.percorsoLayerToggle(pid, 'massaMagra');
  let layers = win._percorsoLayersGet(pid);
  assert.strictEqual(layers.massaMagra, false);
  assert.strictEqual(layers.proiezione, true, 'gli altri strati non cambiano');
  assert.strictEqual(layers.energia, true);
  win.percorsoLayerToggle(pid, 'massaMagra');
  assert.strictEqual(win._percorsoLayersGet(pid).massaMagra, true, 'il toggle è reversibile');
});

test('STRATI — percorsoVistaPreset: "paziente" nasconde i tecnici, "tecnica" li riaccende tutti', () => {
  const pid = 'pc-preset-' + Math.random();
  win.percorsoVistaPreset(pid, 'paziente');
  const clean = win._percorsoLayersGet(pid);
  assert.strictEqual(clean.massaMagra, false);
  assert.strictEqual(clean.energia, false);
  assert.strictEqual(clean.dettagliFasi, false);
  assert.strictEqual(clean.proiezione, true, 'la proiezione resta utile anche in vista paziente');
  assert.strictEqual(clean.consuntivo, true, 'l\'aderenza resta anche in vista paziente (Tappa 5): è il momento educativo');
  win.percorsoVistaPreset(pid, 'tecnica');
  assert.deepStrictEqual(JSON.parse(JSON.stringify(win._percorsoLayersGet(pid))), { massaMagra: true, proiezione: true, energia: true, dettagliFasi: true, consuntivo: true });
});

test('GRAFICO — la massa magra compare/scompare col suo interruttore, sullo stesso asse kg (nessun secondo asse)', () => {
  const pid = 'pc-svg-mm-' + Math.random();
  const paz = inWin(pazBase({
    id: pid,
    percorso: { inizio: iso(Date.now() - 60 * G), fasi: [{ tipo: 'deficit', settimane: 20, pct: -18 }] }
  }));
  win.percorsoVistaPreset(pid, 'tecnica');
  const svgOn = win._percorsoChartSvg(paz);
  assert.ok(/#e87ba4/.test(svgOn), 'colore massa magra presente quando lo strato è acceso');
  assert.ok(/kg magra/.test(svgOn), 'etichetta ultimo punto massa magra');
  const vbOn = svgOn.match(/viewBox="0 0 (\d+) (\d+)"/);
  win.percorsoLayerToggle(pid, 'massaMagra');
  const svgOff = win._percorsoChartSvg(paz);
  assert.ok(!/#e87ba4/.test(svgOff), 'nessuna traccia di massa magra con lo strato spento');
  const vbOff = svgOff.match(/viewBox="0 0 (\d+) (\d+)"/);
  assert.strictEqual(vbOn[1], vbOff[1], 'stessa larghezza: la massa magra non introduce un asse/layout separato');
});

test('GRAFICO — interruttore energia: spegnerlo toglie la corsia e comprime il layout come "senza percorso"', () => {
  const pid = 'pc-svg-en-' + Math.random();
  const paz = inWin(pazBase({
    id: pid,
    macrosStorico: [{ kcal: 1800, tdee: 2400, timestamp: Date.now() - 30 * G }],
    percorso: { inizio: iso(Date.now() - 60 * G), fasi: [{ tipo: 'deficit', settimane: 20, pct: -18 }] }
  }));
  win.percorsoVistaPreset(pid, 'tecnica');
  const svgOn = win._percorsoChartSvg(paz);
  assert.ok(/Energia \(kcal\)/.test(svgOn));
  win.percorsoLayerToggle(pid, 'energia');
  const svgOff = win._percorsoChartSvg(paz);
  assert.ok(!/Energia \(kcal\)/.test(svgOff), 'niente corsia energia con lo strato spento');
  assert.ok(/viewBox="0 0 1000 400"/.test(svgOff), 'layout compatto come quando non c\'è alcun percorso');
});

test('GRAFICO — interruttore proiezione: spegnerlo toglie il cono senza toccare _percorsoProiezione', () => {
  const pid = 'pc-svg-proj-' + Math.random();
  const paz = inWin(pazBase({
    id: pid,
    pesiIntermedi: [{ data: iso(Date.now() - 5 * G), peso: 90.5 }],
    percorso: { inizio: iso(Date.now() - 60 * G), fasi: [{ tipo: 'deficit', settimane: 20, pct: -18 }] }
  }));
  const projPrima = win._percorsoProiezione(paz);
  win.percorsoVistaPreset(pid, 'tecnica');
  const svgOn = win._percorsoChartSvg(paz);
  win.percorsoLayerToggle(pid, 'proiezione');
  const svgOff = win._percorsoChartSvg(paz);
  const projDopo = win._percorsoProiezione(paz);
  assert.deepStrictEqual(projPrima, projDopo, 'il calcolo della proiezione è invariato: solo il disegno cambia');
  assert.ok(/rgba\(42,120,214,0\.14\)/.test(svgOn) && !/rgba\(42,120,214,0\.14\)/.test(svgOff), 'il cono sparisce solo dal disegno');
});

test('GRAFICO — interruttore dettagli fasi: nasconde %/kcal/settimane ma non l\'etichetta della fase', () => {
  const pid = 'pc-svg-det-' + Math.random();
  const paz = inWin(pazBase({
    id: pid,
    percorso: { inizio: iso(Date.now() - 10 * G), fasi: [{ tipo: 'deficit', settimane: 20, pct: -18 }] }
  }));
  win.percorsoVistaPreset(pid, 'tecnica');
  const svgOn = win._percorsoChartSvg(paz);
  assert.ok(/TDEE/.test(svgOn) && /sett\.<\/text>/.test(svgOn));
  win.percorsoLayerToggle(pid, 'dettagliFasi');
  const svgOff = win._percorsoChartSvg(paz);
  assert.ok(!/% TDEE/.test(svgOff), 'niente riga %/kcal/settimane');
  assert.ok(/Deficit/.test(svgOff), 'l\'etichetta del tipo di fase resta comunque visibile');
});
