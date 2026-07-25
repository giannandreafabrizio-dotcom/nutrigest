// ── S2 — Andamento nel tempo dei referti (P118 tappa 3) ──
// Il rischio di questa tappa e' clinico, non grafico: una freccia verde su un
// valore che sta peggiorando e' peggio di nessuna freccia. La regola e' che il
// colore guarda la DISTANZA DAL RANGE, mai la direzione del movimento.
// Questi test la inchiodano, insieme ai casi in cui NON si deve giudicare
// (esame senza riferimento, sesso ignoto su voce sesso-specifica).
//
// LIMITE DICHIARATO: l'aspetto di tracciato e grafico grande e' verificato a
// occhio sul rendering; qui si testano geometria minima e regole.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

function K(win, nome) { return win.eval('ANALISI_KEY')(nome); }
// Gli oggetti nati dentro JSDOM hanno prototipi di un altro realm: deepStrictEqual
// fallirebbe sempre. Si confronta la forma, non l'identita' del prototipo.
function piano(o) { return JSON.parse(JSON.stringify(o)); }
function rf(data, coppie, range) {
  const valori = {};
  Object.keys(coppie || {}).forEach(function (k) { valori[k] = String(coppie[k]); });
  return { id: 'rf' + data, data: data, valori: valori, range: range || {} };
}

test('P118 — la freccia guarda la distanza dal range, non la direzione', () => {
  const win = loadApp();
  const lim = { min: 0.4, max: 4.0 };
  // TSH che sale dentro→fuori: peggiora
  assert.strictEqual(win._andValutazione(3.8, 6.2, lim), 'bad');
  // TSH che scende da fuori verso il range: migliora, anche se scende
  assert.strictEqual(win._andValutazione(6.2, 4.5, lim), 'good');
  // Ferritina che SALE da sotto il minimo verso il range: migliora
  const limF = { min: 15, max: 150 };
  assert.strictEqual(win._andValutazione(9, 14, limF), 'good');
  assert.strictEqual(win._andValutazione(12, 42, limF), 'good');
  // Dentro il range prima e dopo: nessun giudizio
  assert.strictEqual(win._andValutazione(13.1, 13.4, { min: 12, max: 16 }), 'neutro');
});

test('P118 — senza range non si giudica mai', () => {
  const win = loadApp();
  assert.strictEqual(win._andValutazione(10, 99, null), 'neutro');
  assert.strictEqual(win._andDistanza(10, null), null);
});

test('P118 — la distanza dal range e zero dentro, positiva fuori da entrambi i lati', () => {
  const win = loadApp();
  const lim = { min: 70, max: 99 };
  assert.strictEqual(win._andDistanza(85, lim), 0);
  assert.strictEqual(win._andDistanza(104, lim), 5);
  assert.strictEqual(win._andDistanza(60, lim), 10);
  assert.strictEqual(win._andDistanza(120, { min: null, max: 100 }), 20);
  assert.strictEqual(win._andDistanza(120, { min: 100, max: null }), 0);
});

test('P118 — gli intervalli scritti dal laboratorio vengono letti nelle forme piu comuni', () => {
  const win = loadApp();
  const P = win._andParseRangeLab;
  assert.deepStrictEqual(piano(P('70 - 99 mg/dL')), { min: 70, max: 99 });
  assert.deepStrictEqual(piano(P('0.4–4.0')), { min: 0.4, max: 4.0 });
  assert.deepStrictEqual(piano(P('< 150 mg/dL')), { min: null, max: 150 });
  assert.deepStrictEqual(piano(P('> 40')), { min: 40, max: null });
  assert.deepStrictEqual(piano(P('0,8-1,2')), { min: 0.8, max: 1.2 });
  assert.strictEqual(P('negativo'), null, 'se non si capisce, meglio nessun giudizio');
});

test('P118 — il range del laboratorio batte quello standard anche nel giudizio', () => {
  const win = loadApp();
  const p = { sesso: 'M' };
  const conLab = { range: {} };
  conLab.range[K(win, 'Glicemia a digiuno')] = '65 - 110 mg/dL';
  assert.deepStrictEqual(piano(win._andLimiti('Glicemia a digiuno', p, conLab)), { min: 65, max: 110 });
  assert.deepStrictEqual(piano(win._andLimiti('Glicemia a digiuno', p, { range: {} })), { min: 70, max: 99 });
});

test('P118 — voce sesso-specifica con sesso non compilato: nessun limite, quindi nessun giudizio', () => {
  const win = loadApp();
  assert.strictEqual(win._andLimiti('Emoglobina', { sesso: '' }, null), null);
  assert.deepStrictEqual(piano(win._andLimiti('Emoglobina', { sesso: 'F' }, null)), { min: 12.0, max: 16.0 });
});

test('P118 — la serie prende solo referti datati e valori numerici, in ordine di data', () => {
  const win = loadApp();
  const k = K(win, 'TSH') + '_val';
  const p = {
    refertiSangue: [
      rf('2026-06-01', { [k]: '6.2' }),
      rf('', { [k]: '9.9' }),                  // senza data: fuori dall'asse del tempo
      rf('2025-03-03', { [k]: '2.1' }),
      rf('2026-01-12', { [k]: '  ' }),         // vuoto
      rf('2025-09-08', { [k]: 'negativo' })    // non numerico
    ]
  };
  const s = [...win._andSerie(p, 'TSH')];
  assert.deepStrictEqual(s.map(function (x) { return x.data; }), ['2025-03-03', '2026-06-01']);
  assert.deepStrictEqual(s.map(function (x) { return x.v; }), [2.1, 6.2]);
});

test('P118 — con meno di due misure non si disegna nulla', () => {
  const win = loadApp();
  const k = K(win, 'TSH') + '_val';
  const p = { sesso: 'F', refertiSangue: [rf('2026-06-01', { [k]: '6.2' })] };
  assert.strictEqual(win._andSparkHtml(win._andSerie(p, 'TSH'), { min: 0.4, max: 4 }, 'TSH'), '');
  assert.strictEqual(win._andRigaHtml('TSH', p, p.refertiSangue[0]), '');
});

test('P118 — il colore del tracciato: rosso se fuori, verde se sta rientrando, grigio se fermo dentro', () => {
  const win = loadApp();
  const lim = { min: 0.4, max: 4 };
  assert.strictEqual(win._andColore([{ v: 2.1 }, { v: 6.2 }], lim), '#c0392b');
  assert.strictEqual(win._andColore([{ v: 12 }, { v: 42 }], { min: 15, max: 150 }), '#27ae60');
  assert.strictEqual(win._andColore([{ v: 2.0 }, { v: 2.2 }], lim), '#6b6560');
  assert.strictEqual(win._andColore([{ v: 2.0 }, { v: 2.2 }], null), '#6b6560');
});

test('P118 — la riga sotto il valore mostra segno, variazione e numero di referti', () => {
  const win = loadApp();
  const k = K(win, 'TSH') + '_val';
  const p = { sesso: 'F', refertiSangue: [rf('2025-03-03', { [k]: '2.1' }), rf('2026-06-01', { [k]: '6.2' })] };
  const h = win._andRigaHtml('TSH', p, p.refertiSangue[1]);
  assert.match(h, /ai-delta bad/, 'TSH uscito dal range: rosso');
  assert.match(h, /↗/);
  assert.match(h, /\+4,1/, 'variazione col separatore decimale italiano');
  assert.match(h, /2 referti/);
  assert.match(h, /<polyline/, 'il tracciato fa parte della riga (opzione B)');
});

test('P118 — il pannello in fondo appare solo con esami seguibili e mette per primi i fuori range', () => {
  const win = loadApp();
  const kt = K(win, 'TSH') + '_val', kg = K(win, 'Glicemia a digiuno') + '_val';
  const vuoto = { sesso: 'F', refertiSangue: [] };
  assert.strictEqual(win._andPannelloHtml(vuoto), '', 'senza storico niente pannello');

  const p = {
    sesso: 'F',
    refertiSangue: [
      rf('2025-03-03', { [kt]: '2.1', [kg]: '88' }),
      rf('2026-06-01', { [kt]: '6.2', [kg]: '90' })
    ]
  };
  const h = win._andPannelloHtml(p);
  assert.match(h, /and-pannello/);
  assert.match(h, /2 esami con almeno due referti/);
  assert.match(h, /and-chip on[^>]*>TSH/, 'il fuori range viene proposto per primo');
  assert.match(h, /and-tab/, 'la tabella dei valori e sempre presente');
});

test('P118 — i passi della griglia sono numeri tondi', () => {
  const win = loadApp();
  assert.strictEqual(win._andPasso(40), 10);
  assert.strictEqual(win._andPasso(4), 1);
  assert.strictEqual(win._andPasso(0.4), 0.1);
  assert.ok(win._andPasso(0) > 0, 'ampiezza zero non deve produrre un ciclo infinito');
});
