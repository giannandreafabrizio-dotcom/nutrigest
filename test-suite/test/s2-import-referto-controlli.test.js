// ── S2 — Controlli anti-errore sull'import dei referti del sangue (P124) ──
// Nati da un caso REALE (26 lug 2026, referto fotografato di un paziente):
// l'AI ha restituito gli INTERVALLI DI RIFERIMENTO al posto dei risultati
// (Creatinina "0.72-1.18", e-GFR "89-98", Azotemia "30-25", B12 "197-771",
// Folati "4.5-23.2"), ha perso la virgola sul TSH ("1,560" → 1560) e una cifra
// sulla Vitamina D ("21,3" → 2.3). Nessuno di questi errori veniva segnalato.
//
// Questi test bloccano la regressione su entrambi i lati:
//  · i valori sbagliati DEVONO essere marcati sospetti;
//  · i valori legittimi NON devono esserlo (un allarme che suona sempre è un
//    allarme che si impara a ignorare — e su dati clinici è peggio del silenzio).
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();
const ctrl = (nome, val, rangeLab, sesso) =>
  win.eval('_impControllaValore')(nome, val, rangeLab || '', { sesso: sesso || 'M' });

// ── 1. L'intervallo di riferimento scambiato per risultato ──────────────────
test('P124 — un valore a due numeri separati da trattino è sospetto (i casi veri del referto)', () => {
  [
    ['Creatinina', '0.72-1.18'],
    ['e-GFR (MDRD)', '89-98'],
    ['Azotemia', '30-25'],
    ['Vitamina B12', '197-771'],
    ['Folati', '4.5-23.2']
  ].forEach(function ([nome, val]) {
    const c = ctrl(nome, val);
    assert.ok(c.sospetto, nome + ' = "' + val + '" doveva essere segnalato');
    assert.ok(c.motivi.join(' ').indexOf('intervallo') >= 0, nome + ': motivo poco chiaro');
  });
});

test('P124 — valore con le stesse cifre del range stampato dal lab: segnalato anche col trattino diverso', () => {
  const c = ctrl('Vitamina B12', '197 - 771', '197-771 pg/ml');
  assert.ok(c.sospetto);
  assert.ok(c.motivi.join(' ').indexOf('laboratorio') >= 0, 'manca il motivo "identico al range del laboratorio"');
});

// ── 2. La virgola persa ─────────────────────────────────────────────────────
test('P124 — TSH 1560 è impossibile e la correzione proposta è 1.56, non un numero a caso', () => {
  const c = ctrl('TSH', '1560');
  assert.ok(c.sospetto, 'TSH 1560 con riferimento 0.4-4.0 doveva essere segnalato');
  assert.strictEqual(c.suggerito, '1.56');
});

test('P124 — "1,560" scritto all\'italiana diventa 1.56 e NON è più sospetto', () => {
  const norm = win.eval('_impNormalizzaNumero')('1,560');
  assert.strictEqual(norm, '1.560');
  assert.strictEqual(win.eval('_parseAnalisiNum')(norm), 1.56);
  assert.strictEqual(ctrl('TSH', norm).sospetto, false);
});

test('P124 — la normalizzazione tocca solo le forme numeriche, non i valori qualitativi', () => {
  const n = win.eval('_impNormalizzaNumero');
  assert.strictEqual(n('21,3'), '21.3');
  assert.strictEqual(n('1.234,5'), '1234.5');
  assert.strictEqual(n('Limpido'), 'Limpido');
  assert.strictEqual(n('Giallo chiaro'), 'Giallo chiaro');
  assert.strictEqual(n('Assente'), 'Assente');
  assert.strictEqual(n('  13.6  '), '13.6');
});

// ── 3. Nessun suggerimento inventato ────────────────────────────────────────
// È il punto più importante del file: la Vitamina D del referto vero era 21,3
// e l'AI aveva scritto 2.3. Spostare la virgola dà 23 — plausibile, vicino,
// e SBAGLIATO. Un suggerimento del genere verrebbe accettato senza guardare il
// referto. Quindi si propone solo ciò che ricade DENTRO il riferimento.
test('P124 — Vitamina D 2.3: segnalata, ma senza correzione inventata', () => {
  const c = ctrl('Vitamina D (25-OH)', '2.3');
  assert.ok(c.sospetto, 'Vit D 2.3 con riferimento 30-100 doveva essere segnalata');
  assert.strictEqual(c.suggerito, null, 'non deve proporre 23: il valore vero era 21.3');
  assert.ok(c.motivi.join(' ').indexOf('ricontrollalo sul referto') >= 0);
});

// ── 4. Nessun falso allarme sui valori legittimi ────────────────────────────
test('P124 — i valori corretti del referto vero non vengono segnalati', () => {
  [
    ['Trigliceridi', '91'],
    ['Vitamina B12', '546'],
    ['Ferritina', '122.0'],
    ['Ferro', '81'],
    ['Vitamina D (25-OH)', '21.3'],
    ['FT4', '1.17'],
    ['FT3', '3.46'],
    ['Colesterolo totale', '158'],
    ['HDL', '48'],
    ['Piastrine (PLT)', '173'],
    ['Globuli bianchi (WBC)', '5.47']
  ].forEach(function ([nome, val]) {
    const c = ctrl(nome, val);
    assert.strictEqual(c.sospetto, false, nome + ' = ' + val + ' segnalato per sbaglio: ' + c.motivi.join(' · '));
  });
});

test('P124 — un valore fuori range ma credibile NON è un valore sospetto', () => {
  // Folati 3.9 è sotto il riferimento: è un dato clinico, non un errore di lettura.
  const c = ctrl('Folati', '3.9');
  assert.strictEqual(c.sospetto, false, 'un valore basso vero non va confuso con un errore di trascrizione');
});

test('P124 — fuori scala solo oltre il fattore 10, non al primo valore anomalo', () => {
  const fs = win.eval('_impFuoriScala');
  const lim = { min: 0.4, max: 4.0 };
  assert.strictEqual(fs(8, lim), false, 'TSH 8 è alto ma possibile');
  assert.strictEqual(fs(40, lim), false, 'il confine è 10× il massimo: 40 non lo supera');
  assert.strictEqual(fs(41, lim), true);
  assert.strictEqual(fs(0.03, lim), true);
  assert.strictEqual(fs(0.05, lim), false);
});

// ── 5. Le voci qualitative delle urine non hanno un riferimento numerico ────
test('P124 — su un esame senza riferimento numerico un testo non è un errore', () => {
  const c = ctrl('Colore', 'Giallo chiaro');
  assert.strictEqual(c.sospetto, false);
});

test('P124 — un valore vuoto non genera avvisi', () => {
  assert.strictEqual(ctrl('TSH', '').sospetto, false);
  assert.strictEqual(ctrl('TSH', '   ').motivi.length, 0);
});

// ── 6. Limiti sesso-consapevoli ─────────────────────────────────────────────
test('P124 — senza sesso in anagrafica si usa l\'unione dei due intervalli, mai uno a caso', () => {
  const lim = win.eval('_impLimitiStd');
  const M = lim('Creatinina', { sesso: 'M' });
  const F = lim('Creatinina', { sesso: 'F' });
  const X = lim('Creatinina', {});
  assert.deepStrictEqual([M.min, M.max], [0.70, 1.20]);
  assert.deepStrictEqual([F.min, F.max], [0.50, 0.90]);
  assert.deepStrictEqual([X.min, X.max], [0.50, 1.20], 'senza sesso: l\'unione, non una scelta arbitraria');
});

// ── 7. La finestra di conferma consente davvero la correzione a mano ────────
// Guardia sul markup: se qualcuno rifacesse la colonna "Estratto" di sola
// lettura, il problema del 26/7 tornerebbe identico e nessun altro test
// se ne accorgerebbe.
test('P124 — la colonna Estratto della finestra di conferma è un campo scrivibile', () => {
  const fs = require('fs');
  const path = require('path');
  const html = fs.readFileSync(path.join(__dirname, '..', '..', 'index.html'), 'utf8');
  const i = html.indexOf('function mostraDiffAnalisi');
  assert.ok(i > 0, 'mostraDiffAnalisi non trovata');
  const corpo = html.slice(i, i + 14000);
  assert.ok(corpo.indexOf('class="diff-analisi-val"') > 0,
    'la casella del valore estratto non è più un input: l\'utente non può correggere l\'errore che vede');
  assert.ok(corpo.indexOf('_impControllaValore') > 0,
    'la finestra non chiama più i controlli anti-errore');
});
