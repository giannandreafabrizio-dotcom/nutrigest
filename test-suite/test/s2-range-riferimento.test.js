// ── S2 — Range di riferimento sotto ogni valore (P118 tappa 2) ──
// Il rischio qui non e' il codice, e' il DATO: una tabella di soglie cliniche
// sbagliata o incompleta si legge come informazione affidabile. Quindi:
//   · copertura totale (nessuna voce di ANALISI senza riferimento);
//   · nessuna soglia malformata (min > max, unita' mancante dove serve);
//   · precedenza rispettata: il range del laboratorio batte quello standard;
//   · niente scelte arbitrarie quando il sesso non e' noto.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

function K(win, nome) { return win.eval('ANALISI_KEY')(nome); }

test('P118 — ogni voce di ANALISI ha un riferimento: nessuna casella resta muta', () => {
  const win = loadApp();
  const tutte = Object.values(win.eval('ANALISI')).flat();
  const STD = win.eval('RANGE_STD');
  const senza = tutte.filter(function (n) { return !STD[n]; });
  assert.deepStrictEqual(senza, [], 'Voci senza riferimento: ' + senza.join(' | '));
});

test('P118 — la tabella non contiene voci che non esistono in ANALISI', () => {
  const win = loadApp();
  const tutte = new Set(Object.values(win.eval('ANALISI')).flat());
  const orfane = Object.keys(win.eval('RANGE_STD')).filter(function (n) { return !tutte.has(n); });
  assert.deepStrictEqual(orfane, [], 'Riferimenti che non corrispondono a nessun esame: ' + orfane.join(' | '));
});

test('P118 — nessuna soglia malformata (min <= max, numeri veri, unita presente)', () => {
  const win = loadApp();
  const STD = win.eval('RANGE_STD');
  const problemi = [];
  Object.keys(STD).forEach(function (nome) {
    const d = STD[nome];
    if (d.t) return;                       // esame qualitativo: nessun intervallo
    const coppie = [d.r, d.M, d.F].filter(Boolean);
    if (!coppie.length) { problemi.push(nome + ': nessun intervallo ne testo atteso'); return; }
    if (typeof d.u !== 'string') problemi.push(nome + ': unita di misura assente');
    coppie.forEach(function (c) {
      if (!Array.isArray(c) || c.length !== 2) { problemi.push(nome + ': intervallo malformato'); return; }
      const min = c[0], max = c[1];
      if (min == null && max == null) problemi.push(nome + ': intervallo vuoto su entrambi i lati');
      [min, max].forEach(function (v) {
        if (v != null && (typeof v !== 'number' || isNaN(v))) problemi.push(nome + ': soglia non numerica');
      });
      if (min != null && max != null && min > max) problemi.push(nome + ': minimo maggiore del massimo');
    });
    if ((d.M && !d.F) || (d.F && !d.M)) problemi.push(nome + ': sesso-specifico a meta');
  });
  assert.deepStrictEqual(problemi, [], problemi.join(' · '));
});

test('P118 — intervalli chiusi, aperti e qualitativi si leggono nella forma giusta', () => {
  const win = loadApp();
  const t = win._rangeTestoDa;
  assert.strictEqual(t({ u: 'mg/dL', r: [70, 99] }, 'M'), '70–99 mg/dL');
  assert.strictEqual(t({ u: 'mg/dL', r: [null, 150] }, 'M'), '< 150 mg/dL');
  assert.strictEqual(t({ u: 'mL/min/1.73m²', r: [90, null] }, 'F'), '> 90 mL/min/1.73m²');
  assert.strictEqual(t({ t: 'Assente' }, 'M'), 'Assente');
});

test('P118 — sesso noto: si mostra il suo intervallo; sesso ignoto: si mostrano entrambi', () => {
  const win = loadApp();
  const def = { u: 'g/dL', M: [13.5, 17.5], F: [12.0, 16.0] };
  assert.strictEqual(win._rangeTestoDa(def, 'M'), '13.5–17.5 g/dL');
  assert.strictEqual(win._rangeTestoDa(def, 'F'), '12–16 g/dL');
  const senzaSesso = win._rangeTestoDa(def, '');
  assert.match(senzaSesso, /M 13\.5–17\.5/);
  assert.match(senzaSesso, /F 12–16/, 'senza sesso in scheda non si sceglie a caso: si mostrano entrambi');
});

test('P118 — il range stampato dal laboratorio ha la precedenza su quello standard', () => {
  const win = loadApp();
  const p = { id: 'p1', sesso: 'M' };
  const rf = { id: 'r1', data: '2026-06-01', valori: {}, range: {} };
  rf.range[K(win, 'Glicemia a digiuno')] = '65 - 105 mg/dL';
  const conLab = win._rangeHtml('Glicemia a digiuno', p, rf);
  assert.match(conLab, /65 - 105 mg\/dL/);
  assert.match(conLab, /ai-range-fonte/, 'va marcato come proveniente dal laboratorio');
  const senzaLab = win._rangeHtml('Glicemia a digiuno', p, { range: {} });
  assert.match(senzaLab, /70–99 mg\/dL/);
  assert.ok(!/ai-range-fonte/.test(senzaLab), 'il riferimento standard non va spacciato per quello del lab');
});

test('P118 — le note cliniche finiscono nel titolo, senza rompere l\'HTML', () => {
  const win = loadApp();
  const h = win._rangeHtml('Vitamina D (25-OH)', { sesso: 'F' }, null);
  assert.match(h, /30–100 ng\/mL/);
  assert.match(h, /title="[^"]*carenza[^"]*"/, 'la nota deve stare nel title e non contenere doppi apici grezzi');
});

test('P118 — un esame senza riferimento non stampa una riga vuota', () => {
  const win = loadApp();
  assert.strictEqual(win._rangeHtml('Esame che non esiste', { sesso: 'M' }, null), '');
});

test('P118 — le 10 soglie cliniche esistenti restano intatte: semaforo e riferimento convivono', () => {
  const win = loadApp();
  const RIF = win.eval('RANGE_RIF');
  assert.ok(RIF['Glicemia a digiuno'], 'RANGE_RIF non va svuotato dalla tappa 2');
  const interp = win.interpretaAnalisi('Glicemia a digiuno', '104', { sesso: 'M' });
  assert.ok(interp && interp.et, 'il semaforo continua a interpretare il valore');
});
