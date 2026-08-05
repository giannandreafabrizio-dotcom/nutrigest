// ── S2 — TDEE parte 2: l'ordine della scheda e il posto unico di ogni numero ──
// (5 ago 2026, P149)
//
// Il difetto che questa suite blocca per sempre. La seconda metà della scheda
// Macros chiedeva le decisioni nell'ordine sbagliato: giorni di carico,
// ciclizzazione carboidrati e cronotipo stavano PRIMA del calcolo, tanto che la
// ciclizzazione domandava "kcal giorni ON / OFF" mezza schermata prima che le
// calorie esistessero. E lo stesso numero si decideva in piu' posti: il peso
// obiettivo in tre (campo libero, pannello 🎯, chip di riferimento), le calorie
// in sei (slider, kcal, %, dieci preset, i pulsanti "Usa" delle strade, la
// ritaratura) — senza che nulla dicesse mai quale valore fosse quello in vigore.
//
// Contratto fissato qui:
//  1. l'ordine dei blocchi nel markup segue la decisione clinica:
//     traguardo -> strade -> regime -> composizione -> distribuzione;
//  2. il campo `mac-peso-target` NON sparisce (decine di lettori: salvataggio,
//     _traguardoUsa, _usaRifPeso, validazione campi) ma vive dentro la piega
//     "Altri modi", cioe' sotto il metodo consigliato e non accanto ad esso;
//  3. verifica al controllo e strade vivono in #mac-strada-box, accanto al
//     regime energetico che impostano, non in coda al riquadro del traguardo;
//  4. la strada in vigore si LEGGE dal regime, non si ricorda: se le calorie
//     cambiano da qualunque altro comando, la riga marcata si riallinea;
//  5. quando le strade non ci sono (traguardo non calcolabile), la piega
//     "Regola a mano" resta APERTA — altrimenti l'unico comando delle calorie
//     sarebbe nascosto.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();
const d = win.document;

// Paziente dello screenshot che ha fatto nascere la voce: ricomposizione, un
// referto InBody completo, un pesoTarget gia' scritto in scheda.
const PAZ = {
  id: 'x', nome: 'A', cognome: 'B', sesso: 'M', altezza: 180, nascita: '1985-01-01',
  passiGiornalieri: 8000, modalitaAllenamento: 'nessuno', pesoTarget: 71.3,
  inbody: [{ id: 'i', data: '2026-07-29', peso: 77.8, m: 55.6, pg: 28.5, mb: 1571,
             altezza: 180, pesoIdeale: 71.3 }]
};

function render(paz) {
  d.body.innerHTML = '<div id="pd-macros"></div>';
  win.eval('window.__PZ = ' + JSON.stringify(paz));
  win.eval('renderPdMacros(window.__PZ)');
  return d.getElementById('pd-macros').innerHTML;
}

function pos(html, id) {
  const i = html.indexOf('id="' + id + '"');
  assert.ok(i >= 0, 'id mancante nel markup della scheda: ' + id);
  return i;
}

test('P149 — la distribuzione settimanale sta DOPO il calcolo, non prima', () => {
  const html = render(PAZ);
  const regime = pos(html, 'mac-off-slider');
  ['gall-lun', 'cic-attiva', 'p-cronotipo', 'p-orario-pasto', 'p-orario-all'].forEach(id => {
    assert.ok(pos(html, id) > regime,
      id + ' deve stare dopo il regime energetico: nessuno di questi campi cambia il totale delle calorie');
  });
});

test('P149 — l\'ordine dei blocchi segue la decisione: traguardo, strade, regime, composizione', () => {
  const html = render(PAZ);
  const seq = ['laf-display', 'mac-peso-rif-box', 'mac-altri-modi', 'mac-strada-box',
               'mac-off-slider', 'mac-prot', 'gall-lun'];
  const idx = seq.map(id => pos(html, id));
  for (let i = 1; i < idx.length; i++) {
    assert.ok(idx[i] > idx[i - 1], seq[i] + ' deve venire dopo ' + seq[i - 1]);
  }
});

test('P149 — il campo Obiettivo peso resta (ha decine di lettori) ma vive dentro «Altri modi»', () => {
  render(PAZ);
  const campo = d.getElementById('mac-peso-target');
  assert.ok(campo, 'il campo non va rimosso: lo leggono salvataggio, _traguardoUsa, _usaRifPeso, validazione');
  assert.strictEqual(campo.value, '71.3', 'il valore del paziente deve arrivare nel campo');
  assert.ok(campo.closest('#mac-altri-modi'),
    'il campo deve stare dentro la piega, non accanto al metodo consigliato');
  assert.ok(d.getElementById('mac-rif-chips').closest('#mac-altri-modi'),
    'anche i riferimenti InBody/BMI/Devine/Robinson stanno nella piega');
});

test('P149 — verifica al controllo e strade stanno in #mac-strada-box, non in #trg-out', () => {
  render(PAZ);
  const box = d.getElementById('mac-strada-box');
  const out = d.getElementById('trg-out');
  assert.ok(box.querySelectorAll('[data-strada-pct]').length >= 3,
    'le tre strade devono essere renderizzate nel riquadro del passo 3');
  assert.strictEqual(out.querySelectorAll('[data-strada-pct]').length, 0,
    'nessuna strada deve restare dentro il riquadro del traguardo');
  assert.ok(/Come ci arrivi/.test(box.innerHTML), 'il titolo delle strade sta nel passo 3');
});

test('P149 — la strada in vigore si legge dal regime e si riallinea a ogni cambio', () => {
  render(PAZ);
  const pct = d.getElementById('mac-off-pct');
  const etichetta = () => d.getElementById('mac-regime-strada').textContent;
  const marcate = () => [...d.querySelectorAll('[data-strada-pct]')]
    .filter(tr => tr.querySelector('.strada-dot').textContent === '◉')
    .map(tr => tr.getAttribute('data-strada-pct'));

  pct.value = '-20'; win.eval('_stradeEvidenzia()');
  assert.deepStrictEqual(marcate(), ['20'], 'a −20% deve essere marcata la strada Decisa');
  assert.ok(/strada −20%/.test(etichetta()), 'il regime deve dichiarare quale strada sta usando');

  // valore fuori dalla griglia: nessuna riga in vigore, e va DETTO
  pct.value = '-13'; win.eval('_stradeEvidenzia()');
  assert.deepStrictEqual(marcate(), [], 'a −13% nessuna strada è quella attiva');
  assert.ok(/a mano/.test(etichetta()), 'fuori dalle strade l\'etichetta deve dirlo, non restare muta');

  // il preset passa dallo stesso imbuto (_aggiornaRegimeSlider): la riga segue
  win.eval('_presetRegime(-15)');
  assert.deepStrictEqual(marcate(), ['15'], 'cambiando le calorie da un altro comando la riga si riallinea');
});

test('P149 — senza traguardo calcolabile la piega «Regola a mano» resta aperta', () => {
  const senzaSesso = Object.assign({}, PAZ); delete senzaSesso.sesso;
  render(senzaSesso);
  assert.strictEqual(d.querySelectorAll('[data-strada-pct]').length, 0,
    'senza sesso il traguardo non è calcolabile e le strade non esistono');
  assert.strictEqual(d.getElementById('mac-regime-manuale').open, true,
    'l\'unico comando rimasto per le calorie non può essere nascosto in una piega chiusa');

  render(PAZ);
  assert.strictEqual(d.getElementById('mac-regime-manuale').open, false,
    'con le strade in pagina la piega si chiude: la scelta si fa lì sopra');
});
