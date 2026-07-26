// ── S2 — P123: le strade per arrivare al traguardo ──
// Nasce dal collaudo: "fare previsioni è difficile... mi serve sapere di quante
// calorie ha bisogno per arrivare a quella percentuale, e più soluzioni".
// Fissa il contratto su:
//  - _traguardoGrassoDaTogliere: i kg di GRASSO quasi non dipendono dal muscolo
//    previsto (è la scoperta che rende inutile indovinarlo);
//  - _stradaCalcola: kcal, ritmo sul grasso (deficit×7/7700), settimane, data,
//    e i guardrail (1% del peso a settimana, sotto il metabolismo basale, 12 sett.);
//  - _stradaAllaScadenza: dove sarà alla data che conta per il paziente;
//  - _percorsoGeneraFasi con pctDeficit: le fasi nascono sul ritmo scelto.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();
const inWin = o => win.eval('(' + JSON.stringify(o) + ')');
const G = 864e5;
const iso = t => { const d = new Date(t); return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0'); };
const OGGI = iso(Date.now());

// Mariano, i numeri veri del collaudo: 79.1 kg, magra 67.1, grasso 12 (15.2%)
const MARIANO = {
  id:'mar', sesso:'M', altezza:172,
  inbody:[{ id:'i', data:OGGI, peso:79.1, m:67.1, g:12, mb:1817 }],
  passiGiornalieri:6000, fontePassi:'stimati',
  seduteSettimana:3, minutiSeduta:36, attivitaSpecifica:'Circuit training (8 MET)',
  tipoLavoro:'in_piedi'
};

test('STRADE — il grasso da togliere quasi non dipende dal muscolo previsto', () => {
  const p = inWin(MARIANO);
  const conMuscolo = win.calcolaTraguardoComposizione(p, 12, {modo:'ricomposizione', guadagnoMagra:2});
  const senza     = win.calcolaTraguardoComposizione(p, 12, {modo:'ricomposizione', guadagnoMagra:0});
  const gA = win._traguardoGrassoDaTogliere(conMuscolo);
  const gB = win._traguardoGrassoDaTogliere(senza);
  // sul PESO i due scenari distano oltre 2 kg…
  assert.ok(Math.abs(conMuscolo.realistico.peso - conMuscolo.ottimista.peso) > 2,
    'sul peso la differenza è grossa: ' + conMuscolo.ottimista.peso + ' vs ' + conMuscolo.realistico.peso);
  // …ma sul GRASSO da togliere si assomigliano
  assert.ok(Math.abs(gA.max - gA.min) < 0.35, 'due etti scarsi di differenza tra gli scenari: ' + gA.min + '–' + gA.max);
  assert.ok(Math.abs(gA.kg - gB.kg) < 0.35, 'e cambiare la previsione sul muscolo sposta pochissimo: ' + gA.kg + ' vs ' + gB.kg);
  assert.ok(gA.kg > 2.4 && gA.kg < 3.0, 'circa 2.7 kg di grasso da togliere (era ' + gA.kg + ')');
});

test('STRADE — il ritmo è deficit × 7 / 7700, e le settimane vengono dal grasso', () => {
  const p = inWin(MARIANO);
  const tdee = win.calcolaTDEE(p).tdee;
  const r = win.calcolaTraguardoComposizione(p, 12, {modo:'ricomposizione', guadagnoMagra:2});
  const st = win._stradaCalcola(p, r, 15, tdee);
  assert.strictEqual(st.deficitKcal, Math.round(tdee*0.15));
  assert.strictEqual(st.kcalTarget, tdee - st.deficitKcal);
  const attesoKgSett = +(st.deficitKcal*7/7700).toFixed(3);
  assert.strictEqual(st.kgSett, attesoKgSett);
  const g = win._traguardoGrassoDaTogliere(r);
  assert.ok(Math.abs(st.settimane - g.kg/st.kgSett) < 0.11, 'settimane = grasso / ritmo');
});

test('STRADE — più deficit, meno settimane: la scala è monotòna', () => {
  const p = inWin(MARIANO);
  const s = win._stradeVerso(p, win.calcolaTraguardoComposizione(p, 12, {modo:'ricomposizione', guadagnoMagra:2}), '');
  assert.strictEqual(s.ok, true);
  assert.strictEqual(s.strade.length, 3, 'le tre strade standard');
  assert.strictEqual(s.strade.map(x => x.pct).join(','), '10,15,20');
  for(let i=1;i<s.strade.length;i++){
    assert.ok(s.strade[i].settimane < s.strade[i-1].settimane, 'più deficit → meno settimane');
    assert.ok(s.strade[i].kcalTarget < s.strade[i-1].kcalTarget, 'più deficit → meno calorie');
  }
});

test('STRADE — la percentuale libera si aggiunge e resta in ordine', () => {
  const p = inWin(MARIANO);
  const r = win.calcolaTraguardoComposizione(p, 12, {modo:'ricomposizione', guadagnoMagra:2});
  const s = win._stradeVerso(p, r, '25');
  assert.strictEqual(s.strade.length, 4);
  assert.strictEqual(s.strade.map(x => x.pct).join(','), '10,15,20,25');
  assert.strictEqual(s.strade[3].extra, true);
  const doppia = win._stradeVerso(p, r, '15');
  assert.strictEqual(doppia.strade.length, 3, 'un valore già presente non si duplica');
  const assurda = win._stradeVerso(p, r, '90');
  assert.strictEqual(assurda.strade.length, 3, 'oltre il 40% non si accetta');
});

test('STRADE — guardrail: ritmo oltre l\'1% del peso e target sotto il basale', () => {
  const p = inWin(MARIANO);
  const tdee = win.calcolaTDEE(p).tdee;
  const r = win.calcolaTraguardoComposizione(p, 12, {modo:'ricomposizione', guadagnoMagra:2});
  const lieve = win._stradaCalcola(p, r, 10, tdee);
  assert.strictEqual(lieve.avvisi.length, 0, 'il −10% non allarma nessuno');
  const estrema = win._stradaCalcola(p, r, 40, tdee);
  assert.ok(estrema.avvisi.some(a => /basale/.test(a)), 'il −40% porta sotto il metabolismo basale');
});

test('STRADE — oltre le 12 settimane la nota dice di spezzare in cicli', () => {
  // un traguardo molto lontano con un deficit blando
  const p = inWin(MARIANO);
  const tdee = win.calcolaTDEE(p).tdee;
  const r = win.calcolaTraguardoComposizione(p, 8, {modo:'ricomposizione', guadagnoMagra:0});
  const st = win._stradaCalcola(p, r, 5, tdee);
  assert.ok(st.settimane > 12);
  assert.ok(st.avvisi.some(a => /cicli/.test(a)));
});

test('STRADE — la data che conta: dove sarà al matrimonio di Mariano', () => {
  const p = inWin(MARIANO);
  const tdee = win.calcolaTDEE(p).tdee;
  const r = win.calcolaTraguardoComposizione(p, 12, {modo:'ricomposizione', guadagnoMagra:2});
  const decisa = win._stradaCalcola(p, r, 20, tdee);
  const fra33giorni = iso(Date.now() + 33*G);
  const alla = win._stradaAllaScadenza(r, decisa, fra33giorni);
  assert.ok(Math.abs(alla.settimane - 4.7) < 0.2, 'circa 4.7 settimane');
  assert.ok(alla.pctAllaData > 12 && alla.pctAllaData < 13.5,
    'a quella data sarà intorno al 12.5%, non ancora al 12: ' + alla.pctAllaData);
  assert.strictEqual(alla.arrivato, false, 'e va detto, non nascosto');
});

test('STRADE — scadenza passata o assente: null, nessun calcolo inventato', () => {
  const p = inWin(MARIANO);
  const tdee = win.calcolaTDEE(p).tdee;
  const r = win.calcolaTraguardoComposizione(p, 12, {modo:'ricomposizione', guadagnoMagra:2});
  const st = win._stradaCalcola(p, r, 15, tdee);
  assert.strictEqual(win._stradaAllaScadenza(r, st, iso(Date.now()-10*G)), null);
  assert.strictEqual(win._stradaAllaScadenza(r, st, null), null);
});

test('STRADE — traguardo già raggiunto: le strade non servono e lo dicono', () => {
  const p = inWin(MARIANO);
  const r = win.calcolaTraguardoComposizione(p, 20, {modo:'ricomposizione', guadagnoMagra:0});
  const s = win._stradeVerso(p, r, '');
  assert.strictEqual(s.ok, false);
  assert.match(s.motivo, /nessun grasso/);
});

test('STRADE — senza TDEE non si inventa niente', () => {
  const senzaIb = inWin({ sesso:'M' });
  const r = win.calcolaTraguardoComposizione(inWin(MARIANO), 12, {modo:'ricomposizione', guadagnoMagra:2});
  const s = win._stradeVerso(senzaIb, r, '');
  assert.strictEqual(s.ok, false);
  assert.match(s.motivo, /TDEE/);
});

test('GENERATORE — le fasi nascono sul deficit della strada scelta', () => {
  const p = inWin(Object.assign({}, MARIANO, { pesoTarget: 74 }));
  const dflt = win._percorsoGeneraFasi(p, 'dimagrimento');
  const soft = win._percorsoGeneraFasi(p, 'dimagrimento', {pctDeficit:-10});
  const decisa = win._percorsoGeneraFasi(p, 'dimagrimento', {pctDeficit:-20});
  assert.strictEqual(dflt.fasi[0].pct, -18, 'senza opzioni resta il default');
  assert.strictEqual(soft.fasi[0].pct, -10);
  assert.strictEqual(decisa.fasi[0].pct, -20);
  const settSoft = soft.fasi.filter(f => f.tipo === 'deficit').reduce((s,f) => s+f.settimane, 0);
  const settDecisa = decisa.fasi.filter(f => f.tipo === 'deficit').reduce((s,f) => s+f.settimane, 0);
  assert.ok(settSoft > settDecisa, 'col deficit blando servono più settimane di deficit');
  assert.ok(soft.fasi.every(f => f.tipo !== 'deficit' || f.settimane <= 12), 'la regola dei 12 vale ancora');
});
