// ── S2 — P-KETO-USCITA (uscita graduale dalla chetosi, 21 lug 2026) ──
// Fissa il contratto di: _kuFattoreScala/_kuRound (scala TDEE dei precompilati),
// _kuCalcolaStep (matematica dello step), _componiRegimeText (suffisso Uscita
// senza rompere il match "chetogen"/isCeto), costruisciPrompt (blocco
// REINTRODUZIONE quando p.ketoUscita.attiva, regola legumi/frutta in keto
// normale). NB: db/currentPazId/_macrosPaziente sono `let` top-level → il
// setup passa da win.eval() nel contesto globale, non da win.*.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();

const pazJson = JSON.stringify({
  id: 'ku1', nome: 'Mario', cognome: 'Rossi', strategia: 'keto-moderata',
  regime: 'Chetogenica LCKD', allergie: '',
  inbody: [{ data: '2026-07-01', peso: 90, m: 65, pg: 30, mb: 1700, bmi: 31, pesoIdeale: 75 }],
  passiGiornalieri: 8000,
  macrosTarget: { kcal: 1650, protG: 113, carbG: 82, grassiG: 65, protGkg: 1.5, ref: 'ideale', strategia: 'keto-moderata' },
  macrosStorico: [], regolePiano: {}, alimenti: {},
  ketoUscita: { attiva: true, label: 'Settimana 3', fonte: 'pane', fonteG: 40, colazioneG: 20, frutta: 'interi2', grassiGkgFfm: 1.0, carbTot: 82, kcal: 1650 }
});
win.eval(`db.pazienti=[${pazJson}]; currentPazId='ku1'; _macrosPaziente=db.pazienti[0]; window._tdeeRegime=2000;`);

test('S2 keto-uscita — fattore di scala TDEE (rif. 2000, clamp 0.7-1.6) e arrotondamento a passo', () => {
  win.eval('window._tdeeRegime=2600');
  assert.ok(Math.abs(win._kuFattoreScala() - 1.3) < 0.001, 'TDEE 2600 → 1.3');
  assert.strictEqual(win._kuRound(40 * 1.3, 5), 50, 'pane 40g × 1.3 → 50g a passo 5');
  win.eval('window._tdeeRegime=1400');
  assert.strictEqual(win._kuFattoreScala(), 0.7, 'clamp inferiore');
  win.eval('window._tdeeRegime=3600');
  assert.strictEqual(win._kuFattoreScala(), 1.6, 'clamp superiore');
  win.eval('window._tdeeRegime=2000');
  assert.strictEqual(win._kuFattoreScala(), 1, 'riferimento');
});

test('S2 keto-uscita — _componiRegimeText: suffisso Uscita presente/assente, match isCeto conservato', () => {
  const lbl = win.eval('_componiRegimeText(null,"keto-moderata")');
  assert.ok(/Chetogenica LCKD/.test(lbl));
  assert.ok(/Uscita: Settimana 3/.test(lbl), 'suffisso con uscita attiva');
  assert.ok(/hetogen/i.test(lbl), 'isCeto continua a riconoscerlo');
  win.eval('_macrosPaziente.ketoUscita.attiva=false');
  assert.ok(!/Uscita/.test(win.eval('_componiRegimeText(null,"keto-moderata")')), 'suffisso rimosso a uscita chiusa');
  win.eval('_macrosPaziente.ketoUscita.attiva=true');
});

test('S2 keto-uscita — costruisciPrompt con uscita attiva: blocco REINTRODUZIONE vincolante', () => {
  const prompt = win.eval('costruisciPrompt("ku1")');
  assert.ok(/REINTRODUZIONE CARBOIDRATI — Settimana 3/.test(prompt), 'blocco presente con label step');
  assert.ok(/pane integrale da 40g/.test(prompt), 'fonte e grammi dello step');
  assert.ok(/2 frutti INTERI/.test(prompt), 'stato frutta dello step');
  assert.ok(/circa 20g di carboidrati/.test(prompt), 'quota colazione');
  assert.ok(/allenamento o camminata/.test(prompt), 'timing vicino ad attività');
  assert.ok(/NON deve più restare in chetosi/.test(prompt), 'chetosi non più richiesta in uscita');
  assert.ok(!/regola di combinazione/.test(prompt), 'regola legumi/frutta sostituita dallo step');
});

test('S2 keto-uscita — costruisciPrompt keto normale: niente blocco, regola legumi/frutta presente', () => {
  win.eval('_macrosPaziente.ketoUscita.attiva=false');
  const prompt = win.eval('costruisciPrompt("ku1")');
  assert.ok(!/REINTRODUZIONE CARBOIDRATI/.test(prompt), 'nessun blocco senza uscita');
  assert.ok(/deve restare in chetosi\./.test(prompt), 'chetosi richiesta in keto normale');
  assert.ok(/porzione legumi ≈ 80g/.test(prompt), 'porzione legumi');
  assert.ok(/al massimo MEZZO frutto/.test(prompt), 'mezzo frutto con legumi/latticini');
  assert.ok(/UN frutto intero diviso in due metà/.test(prompt), 'frutto intero senza legumi');
  win.eval('_macrosPaziente.ketoUscita.attiva=true');
});

test('S2 keto-uscita — _kuCalcolaStep: carbo per fonte, frutta, colazione, base verdure; grassi su FFM, proteine su riferimento', () => {
  win.eval(`(function(){
    var d=document;
    function mkInput(id,val){var el=d.createElement('input');el.id=id;el.value=val;d.body.appendChild(el);}
    function mkSelect(id,val){var el=d.createElement('select');el.id=id;var o=d.createElement('option');o.value=val;o.selected=true;el.appendChild(o);d.body.appendChild(el);}
    mkSelect('ku-fonte','pane'); mkInput('ku-fonte-g','40');
    mkInput('ku-col-g','20'); mkSelect('ku-frutta','interi2');
    mkInput('ku-grassi','1.0'); mkInput('ku-prot','1.5');
    var r=d.createElement('input'); r.type='radio'; r.name='mac-ref'; r.value='ideale'; r.checked=true; d.body.appendChild(r);
  })()`);
  const s = win.eval('_kuCalcolaStep()');
  assert.strictEqual(s.choFonte, 18, '40g pane int. → 18g CHO (45/100g)');
  assert.strictEqual(s.choFrutta, 30, '2 frutti interi → 30g CHO');
  assert.strictEqual(s.carbTot, 78, '18+30+20+10 (base verdure)');
  assert.strictEqual(s.grassiG, 65, '1.0 g/kg × FFM 65');
  assert.strictEqual(s.protG, 113, '1.5 g/kg × peso ideale 75');
  assert.strictEqual(s.kcal, 113 * 4 + 78 * 4 + 65 * 9, 'kcal = P4+C4+G9');
});