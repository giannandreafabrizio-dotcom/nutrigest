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

// ═══════════════════════════════════════════════════════════════════════════
// P124b — L'IMPRONTA DELLA RIGA (26 lug 2026, secondo caso reale)
// Il PDF del referto era una SCANSIONE con le pagine ruotate di 90°: l'AI
// leggeva la tabella coricata e scivolava di riga — Piastrine prendeva il
// valore dell'Emoglobina, TSH quello di FT4. Il sintomo riconoscibile: come
// "intervallo di riferimento" tornavano "pg" e "migliaia/mmc", cioè le UNITÀ
// di righe vicine. Questi test bloccano quel sintomo.
// ═══════════════════════════════════════════════════════════════════════════

test('P124b — un "riferimento" che è in realtà un\'unità di misura smaschera la riga sbagliata', () => {
  const ok = win.eval('_impRifPlausibile');
  ['pg', 'migliaia/mmc', '%', 'g/dl', '1,17'].forEach(function (r) {
    assert.strictEqual(ok(r), false, '"' + r + '" non è un intervallo di riferimento');
  });
  ['12-18', '0,27-4,20', '< 150', '>= 40', '> 30 valori ottimali', '150-450', ''].forEach(function (r) {
    assert.strictEqual(ok(r), true, '"' + r + '" è un riferimento legittimo');
  });
});

test('P124b — le unità dei laboratori italiani non generano falsi allarmi', () => {
  const eq = win.eval('_impUnitaCompatibili');
  [
    ['migliaia/mmc', '10³/µL'],
    ['milioni/mmc', '10⁶/µL'],
    ['mcg/dl', 'µg/dL'],
    ['mcmol/L', 'µmol/L'],
    ['microU/ml', 'µU/mL'],
    ['MG/DL', 'mg/dL'],
    ['ng/ml', 'ng/mL'],
    ['ml/min/1,73m', 'mL/min/1.73m²'],
    ['g/dl', 'g/dL']
  ].forEach(function ([lab, std]) {
    assert.strictEqual(eq(lab, std), true, lab + ' e ' + std + ' sono la stessa unità');
  });
});

test('P124b — unità di un altro esame: riga disallineata', () => {
  const eq = win.eval('_impUnitaCompatibili');
  assert.strictEqual(eq('%', '10³/µL'), false, 'una percentuale al posto di un valore assoluto');
  assert.strictEqual(eq('pg', 'g/dL'), false, 'MCH al posto di Emoglobina');
  assert.strictEqual(eq('migliaia/mmc', 'fL'), false, 'Piastrine al posto di MCV');
});

test('P124b — i casi veri dello scivolamento di riga vengono presi', () => {
  // Piastrine 15.1 (era l'Emoglobina) con riferimento "migliaia/mmc"
  const c1 = ctrl('Piastrine (PLT)', '15.1', { rif: 'migliaia/mmc', unita: 'migliaia/mmc' });
  assert.ok(c1.sospetto, 'il riferimento non è un intervallo: doveva essere segnalata');
  // Globuli bianchi 0.40 (era % Basofili): unità % invece di 10³/µL
  const c2 = ctrl('Globuli bianchi (WBC)', '0.40', { rif: '0-1,5', unita: '%' });
  assert.ok(c2.sospetto, 'unità percentuale su un valore assoluto: doveva essere segnalata');
  assert.ok(c2.motivi.join(' ').indexOf('unità') >= 0);
  // TSH 1.17 (era FT4) con "riferimento" 1,17
  const c3 = ctrl('TSH', '1.17', { rif: '1,17', unita: 'NG/DL' });
  assert.ok(c3.sospetto, 'riferimento non intervallo + unità di FT4: doveva essere segnalata');
});

test('P124b — la riga letta bene non viene toccata dall\'impronta', () => {
  [
    ['Emoglobina', '15,1', 'g/dl', '12-18'],
    ['Piastrine (PLT)', '173', 'migliaia/mmc', '150-450'],
    ['Globuli bianchi (WBC)', '5,0', 'migliaia/mmc', '4-11'],
    ['MCH', '29,1', 'pg', '26-31'],
    ['TSH', '1,560', 'microU/ml', '0,27-4,20'],
    ['Ferro', '81', 'mcg/dl', '65-175'],
    ['Vitamina B12', '546', 'pg/ml', '197-771'],
    ['Vitamina D (25-OH)', '21,3', 'ng/ml', '> 30 valori ottimali']
  ].forEach(function ([nome, valore, unita, rif]) {
    const c = ctrl(nome, win.eval('_impNormalizzaNumero')(valore), { rif: rif, unita: unita });
    assert.strictEqual(c.sospetto, false, nome + ' segnalato per sbaglio: ' + c.motivi.join(' · '));
  });
});

test('P124b — lo stesso esame con due valori diversi su due pagine è un conflitto, non una scelta', () => {
  const c = ctrl('Glicemia a digiuno', '95', { rif: '60-100', unita: 'MG/DL', conflitto: '112 (pag. 2)' });
  assert.ok(c.sospetto);
  assert.ok(c.motivi.join(' ').indexOf('112') >= 0, 'deve dire con quale altro valore va in conflitto');
});

test('P124b — sulle voci qualitative delle urine il riferimento a parole non è un errore', () => {
  const c = ctrl('Colore', 'Giallo paglierino', { rif: 'giallo paglierino', unita: '' });
  assert.strictEqual(c.sospetto, false);
});

// ── Guardie sul rendering delle pagine ──────────────────────────────────────
test('P124b — il PDF viene reso pagina per pagina e le pagine arrivano dritte', () => {
  const fs = require('fs');
  const path = require('path');
  const html = fs.readFileSync(path.join(__dirname, '..', '..', 'index.html'), 'utf8');
  assert.ok(html.indexOf('vendor/pdf.min.js') > 0, 'pdf.js non è più caricato: senza, il PDF torna a essere letto coricato');
  assert.ok(fs.existsSync(path.join(__dirname, '..', '..', 'vendor', 'pdf.min.js')), 'vendor/pdf.min.js mancante');
  assert.ok(fs.existsSync(path.join(__dirname, '..', '..', 'vendor', 'pdf.worker.min.js')), 'vendor/pdf.worker.min.js mancante');
  const i = html.indexOf('async function _impPdfPagina');
  assert.ok(i > 0, '_impPdfPagina non trovata');
  const corpo = html.slice(i, i + 2500);
  assert.ok(corpo.indexOf('getViewport') > 0, 'senza getViewport la pagina non viene resa');
  assert.ok(/rotation\s*:\s*rot/.test(corpo), 'la rotazione rilevata non viene più applicata al rendering');
  // Il PDF del 26/7 dichiarava /Rotate 270 ma andava girato di 180: la
  // rotazione si RILEVA guardando la pagina, non si legge dal file.
  assert.ok(html.indexOf('async function _impRilevaRotazione') > 0,
    'tolto il rilevamento dell\'orientamento: si torna a fidarsi della rotazione dichiarata nel PDF, che era sbagliata');
  const j2 = html.indexOf('async function _impRilevaRotazione');
  const corpoRot = html.slice(j2, j2 + 1400);
  assert.ok(/return\s*0/.test(corpoRot), 'senza ripiego a 0 una risposta strana ruoterebbe la pagina a caso');
  const j = html.indexOf('async function loadAnalisiSanguePDF');
  const fn = html.slice(j, j + 9000);
  assert.ok(/for\s*\(\s*let\s+i\s*=\s*0\s*;\s*i\s*<\s*pagine\.length/.test(fn),
    'l\'import non cicla più sulle pagine: si torna a mandare tutto il referto in una chiamata sola');
  assert.ok(fn.indexOf('_impPromptPagina') > 0, 'il prompt per pagina non è più usato');
  assert.ok(fn.indexOf('_impRilevaRotazione') > 0, 'l\'import non controlla più l\'orientamento prima di leggere');
});

test('P124b — il prompt chiede valore, unità e riferimento dalla STESSA riga', () => {
  const fs = require('fs');
  const path = require('path');
  const html = fs.readFileSync(path.join(__dirname, '..', '..', 'index.html'), 'utf8');
  const i = html.indexOf('function _impPromptPagina');
  assert.ok(i > 0);
  const corpo = html.slice(i, i + 5000);
  ['"voce"', '"valore"', '"unita"', '"rif"', 'STESSA riga', 'REGOLA DI COERENZA'].forEach(function (t) {
    assert.ok(corpo.indexOf(t) > 0, 'manca dal prompt: ' + t);
  });
});

// ── P124b, seconda correzione dopo il collaudo del 26/7 ─────────────────────
// Due cose emerse ricaricando il referto vero con le pagine finalmente dritte:
// (a) i leucociti sui referti italiani compaiono DUE VOLTE, in percentuale e in
//     valore assoluto — non è un conflitto, è lo stesso esame in due unità;
// (b) come data del referto era stata letta la DATA DI NASCITA del paziente
//     (06/03/1990 invece del 17/06/2026), che sta due centimetri più in là
//     nella stessa intestazione. Una data sbagliata ma plausibile è il danno
//     peggiore possibile su uno storico: stessa lezione di P118 e P120.
function corpoImport() {
  const fs = require('fs');
  const path = require('path');
  const html = fs.readFileSync(path.join(__dirname, '..', '..', 'index.html'), 'utf8');
  const i = html.indexOf('async function loadAnalisiSanguePDF');
  assert.ok(i > 0, 'loadAnalisiSanguePDF non trovata');
  return html.slice(i, i + 12000);
}

test('P124b — percentuale e valore assoluto dello stesso esame si risolvono con l\'unità, non a caso', () => {
  const fn = corpoImport();
  assert.ok(fn.indexOf('_impUnitaCompatibili') > 0,
    'la fusione non guarda più l\'unità: la riga in percentuale e quella in valore assoluto tornerebbero a darsi conflitto a ogni emocromo');
  assert.ok(fn.indexOf('_impLimitiStd') > 0, 'senza l\'unità attesa non si può scegliere quale riga tenere');
});

test('P124b — la data di nascita del paziente non può diventare la data del referto', () => {
  const fn = corpoImport();
  assert.ok(/p\.nascita/.test(fn),
    'tolto il confronto con la data di nascita: torna il caso del 26/7 (referto datato 06/03/1990)');
  assert.ok(/cand\s*>\s*oggi/.test(fn), 'tolto il rifiuto delle date nel futuro');
});

test('P124b — il prompt avverte esplicitamente della data di nascita nell\'intestazione', () => {
  const fs = require('fs');
  const path = require('path');
  const html = fs.readFileSync(path.join(__dirname, '..', '..', 'index.html'), 'utf8');
  const i = html.indexOf('function _impPromptPagina');
  const corpo = html.slice(i, i + 6000);
  assert.ok(corpo.indexOf('DATA DI NASCITA') > 0, 'il prompt non mette più in guardia sulla data di nascita');
  assert.ok(corpo.indexOf('ENTRAMBE le righe') > 0, 'il prompt non chiede più sia la percentuale sia il valore assoluto');
});
