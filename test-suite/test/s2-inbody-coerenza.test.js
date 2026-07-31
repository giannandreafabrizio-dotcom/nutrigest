// ── S2 — P63b: i conti del referto InBody devono tornare (31 lug 2026) ───────
// DA DOVE NASCE: caricando 25 referti InBody veri, circa 1 su 2 aveva almeno un
// errore di lettura AI e 1 su 5 un errore grave. Il caso peggiore: massa magra
// 45 kg letta 88 kg. Nessun controllo esisteva, perché loadInbodyPDF scrive i
// valori dell'AI DIRETTAMENTE nei campi (le analisi del sangue hanno staging +
// conferma da P63/P124, l'InBody no).
//
// PERCHÉ SI PUÒ CONTROLLARE SENZA IL REFERTO: i numeri dell'InBody sono legati
// da identità aritmetiche ("peso = massa grassa + massa magra" è la definizione
// con cui la bilancia stampa il foglio, non una stima). L'errore si vede con
// una sottrazione.
//
// LA METÀ PIÙ IMPORTANTE DI QUESTI TEST È IL SILENZIO: un avviso che suona
// anche quando è tutto giusto smette di essere letto. I casi "referto corretto
// → zero segnalazioni" valgono quanto quelli che scovano l'errore.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();

// Referto realistico e COERENTE (donna, 62,4 kg, 165 cm):
//   18,7 + 43,7 = 62,4 · %grassa 18,7/62,4 = 30,0 · BMI 62,4/1,65² = 22,9
//   acqua 32,0/43,7 = 73% · muscolare 24,1 < magra 43,7 · viscerale 8 (1-20)
const REFERTO_OK = { peso:62.4, pg:30.0, g:18.7, m:43.7, musc:24.1,
                     acqua:32.0, bmi:22.9, altezza:165, visc:8 };

const campi = probs => probs.flatMap(p => p.campi);

// NOTA HARNESS: le funzioni dell'app girano nel realm JSDOM, quindi l'array che
// restituiscono NON è reference-equal a un [] di Node — deepStrictEqual fallisce
// anche quando è vuoto. Si asserisce sulla lunghezza; in cambio il messaggio di
// errore mostra quale controllo ha sbagliato a suonare, che è ciò che serve.
const muto = (r, msg) => {
  const p = win._ibControllaCoerenza(r);
  assert.strictEqual(p.length, 0,
    (msg || 'atteso silenzio') + ' — invece ha segnalato: ' + p.map(x => x.testo).join(' | '));
};

// ═══ Il silenzio: nessun falso allarme ═══════════════════════════════════════

test('S2 P63b — referto coerente: zero segnalazioni', () => {
  muto(REFERTO_OK);
});

test('S2 P63b — scarti di arrotondamento: restano muti', () => {
  // Il referto stampa a un decimale: la somma può scostarsi di un ette.
  muto(Object.assign({}, REFERTO_OK, { peso:62.4, g:18.75, m:43.72 }));
});

test('S2 P63b — taratura generosa: uno scarto sotto il chilo non suona', () => {
  // Scelta esplicita: meglio lasciar passare un errore piccolo che bruciare
  // la credibilità dell'avviso. Qui si cercano gli errori che spostano la clinica.
  muto(Object.assign({}, REFERTO_OK, { m:43.7 - 0.8 }));
});

test('S2 P63b — campi mancanti: nessun controllo inventato', () => {
  muto({ peso:62.4 }, 'un solo valore non basta a nessun controllo');
  muto({}, 'oggetto vuoto');
  [null, undefined, 'x', 42].forEach(v => muto(v, 'input non valido: ' + JSON.stringify(v)));
});

test('S2 P63b — valori non numerici: ignorati, non segnalati', () => {
  muto(Object.assign({}, REFERTO_OK, { visc:'non leggibile', bmi:'' }));
});

test('S2 P63b — numeri con la virgola italiana', () => {
  const r = { peso:'62,4', pg:'30,0', g:'18,7', m:'43,7', musc:'24,1',
              acqua:'32,0', bmi:'22,9', altezza:'165', visc:'8' };
  muto(r, 'la virgola italiana va normalizzata come il punto');
});

// ═══ Il caso reale del 31 luglio 2026 ════════════════════════════════════════

test('S2 P63b — CASO REALE: massa magra 45 kg letta 88 kg', () => {
  // Referto vero: peso 51,2 · grassa 6,2 · magra 45,0 · acqua 33,0
  const letto = { peso:51.2, pg:12.1, g:6.2, m:88, musc:21.0, acqua:33.0, visc:5 };
  const probs = win._ibControllaCoerenza(letto);
  assert.ok(probs.length >= 1, 'la massa magra doppia deve essere segnalata');
  assert.ok(campi(probs).includes('ib-m'), 'il campo massa magra deve essere indicato');
  assert.ok(/massa grassa \+ massa magra/i.test(probs[0].testo), 'il messaggio spiega quale conto non torna');
});

test('S2 P63b — le sovrapposizioni LOCALIZZANO l\'errore', () => {
  // Solo la massa magra sbagliata → salta la somma, ma la % grassa TORNA
  // (dipende da massa grassa e peso, entrambi corretti). È la firma dell'errore.
  const soloMagra = { peso:51.2, pg:12.1, g:6.2, m:88 };
  const t = win._ibControllaCoerenza(soloMagra).map(p => p.testo).join(' ');
  assert.ok(/massa grassa \+ massa magra/i.test(t), 'la somma non torna');
  assert.ok(!/% di massa grassa/i.test(t), 'la percentuale invece torna: l\'errore è la massa magra');

  // Massa GRASSA sbagliata → saltano somma E percentuale insieme.
  const soloGrassa = { peso:51.2, pg:12.1, g:20.0, m:45.0 };
  const t2 = win._ibControllaCoerenza(soloGrassa).map(p => p.testo).join(' ');
  assert.ok(/massa grassa \+ massa magra/i.test(t2), 'la somma non torna');
  assert.ok(/% di massa grassa/i.test(t2), 'e nemmeno la percentuale: l\'errore è la massa grassa');
});

// ═══ Un controllo per volta ══════════════════════════════════════════════════

test('S2 P63b — la somma peso = grassa + magra', () => {
  const r = Object.assign({}, REFERTO_OK, { g:30.0 });   // 30,0 + 43,7 = 73,7 ≠ 62,4
  const probs = win._ibControllaCoerenza(r);
  assert.ok(probs.some(p => /massa grassa \+ massa magra/i.test(p.testo)));
  assert.ok(campi(probs).includes('ib-peso'));
});

test('S2 P63b — la % di massa grassa deve tornare con grassa e peso', () => {
  const r = Object.assign({}, REFERTO_OK, { pg:45.0 });   // il vero è 30,0
  const probs = win._ibControllaCoerenza(r);
  assert.ok(probs.some(p => /% di massa grassa/i.test(p.testo)));
  assert.ok(campi(probs).includes('ib-pg'));
});

test('S2 P63b — il BMI deve tornare con peso e altezza', () => {
  const r = Object.assign({}, REFERTO_OK, { bmi:31.0 });  // il vero è 22,9
  const probs = win._ibControllaCoerenza(r);
  assert.ok(probs.some(p => /BMI/.test(p.testo)));
  assert.ok(campi(probs).includes('ib-altezza'), 'anche l\'altezza può essere il numero sbagliato');
});

test('S2 P63b — altezza in metri invece che in centimetri', () => {
  const r = Object.assign({}, REFERTO_OK, { altezza:1.65 });
  assert.ok(win._ibControllaCoerenza(r).some(p => /BMI/.test(p.testo)));
});

test('S2 P63b — acqua corporea fuori dal rapporto con la massa magra', () => {
  const r = Object.assign({}, REFERTO_OK, { acqua:12.0 }); // 12/43,7 = 27%
  const probs = win._ibControllaCoerenza(r);
  assert.ok(probs.some(p => /acqua totale/i.test(p.testo)));
  assert.ok(campi(probs).includes('ib-acqua'));
});

test('S2 P63b — la banda dell\'acqua è larga apposta: 65% e 80% passano', () => {
  [0.65, 0.73, 0.80].forEach(rap => {
    muto(Object.assign({}, REFERTO_OK, { acqua: +(43.7 * rap).toFixed(1) }),
         'rapporto acqua/magra ' + rap + ' è fisiologico');
  });
});

test('S2 P63b — la massa muscolare non può superare la massa magra', () => {
  const r = Object.assign({}, REFERTO_OK, { musc:50.0 }); // magra 43,7
  const probs = win._ibControllaCoerenza(r);
  assert.ok(probs.some(p => /massa muscolare/i.test(p.testo)));
  assert.ok(campi(probs).includes('ib-musc'));
});

test('S2 P63b — grasso viscerale: area in cm² presa per il livello', () => {
  const probs = win._ibControllaCoerenza(Object.assign({}, REFERTO_OK, { visc:94 }));
  assert.ok(probs.some(p => /viscerale/i.test(p.testo)));
  assert.ok(probs.some(p => /cm²/.test(p.testo)), 'il messaggio dice dove guardare sul foglio');
});

test('S2 P63b — livelli viscerali validi 1-20: tutti muti', () => {
  for (let lv = 1; lv <= 20; lv++) {
    muto(Object.assign({}, REFERTO_OK, { visc:lv }), 'livello viscerale ' + lv + ' è valido');
  }
});

test('S2 P63b — più errori insieme: segnalati tutti, ognuno coi suoi campi', () => {
  const r = { peso:62.4, pg:30.0, g:18.7, m:88, musc:95, acqua:32.0, bmi:22.9, altezza:165, visc:120 };
  const probs = win._ibControllaCoerenza(r);
  assert.ok(probs.length >= 3, 'attesi almeno tre problemi distinti, trovati ' + probs.length);
  probs.forEach(p => {
    assert.ok(Array.isArray(p.campi) && p.campi.length, 'ogni problema indica i campi');
    assert.ok(typeof p.testo === 'string' && p.testo.length, 'ogni problema ha un testo');
  });
});

// ═══ Il contratto con lo schermo ═════════════════════════════════════════════

test('S2 P63b — i campi indicati esistono davvero nel modale', () => {
  const noti = ['ib-peso','ib-pg','ib-g','ib-m','ib-musc','ib-acqua','ib-bmi','ib-altezza','ib-visc'];
  const r = { peso:62.4, pg:99, g:18.7, m:88, musc:95, acqua:2, bmi:99, altezza:165, visc:120 };
  campi(win._ibControllaCoerenza(r)).forEach(id => {
    assert.ok(noti.includes(id), 'campo sconosciuto nel messaggio: ' + id);
  });
});

test('S2 P63b — la lista dei campi sorvegliati copre quelli usati nei controlli', () => {
  assert.ok(Array.isArray(win._IB_CAMPI_COERENZA));
  const r = { peso:62.4, pg:99, g:18.7, m:88, musc:95, acqua:2, bmi:99, altezza:165, visc:120 };
  campi(win._ibControllaCoerenza(r)).forEach(id => {
    assert.ok(win._IB_CAMPI_COERENZA.includes(id), id + ' va sorvegliato per rifare i conti mentre si corregge');
  });
});
