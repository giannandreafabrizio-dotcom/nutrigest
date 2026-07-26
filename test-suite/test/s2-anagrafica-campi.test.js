// ── S2 — F7: un campo assente dal modulo non deve poter CANCELLARE un dato ──
// Trovato durante il collaudo di P122: il campo Altezza era sparito dal modulo
// dell'anagrafica ma salvaPaz continuava a leggerlo — campo assente → gn() null
// → p.altezza azzerata a OGNI salvataggio. Sembrava reggere solo perché
// salvaInbody la riscrive a ogni referto importato: bug intermittente, quindi
// invisibile. Terzo caso della famiglia dopo F5 e F6.
// Qui si fissa il contratto di _pazNumOPrec: campo pieno → il suo valore;
// campo svuotato di proposito → null; campo ASSENTE → il valore precedente.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();

function campo(id, valore){
  let el = win.document.getElementById(id);
  if(!el){ el = win.document.createElement('input'); el.id = id; win.document.body.appendChild(el); }
  el.value = valore;
  return el;
}
function togliCampo(id){ const el = win.document.getElementById(id); if(el) el.remove(); }

// il paziente "in modifica" vive in db + editPazId, come nel flusso reale
function preparaPaziente(dati){
  win.eval('db = { pazienti: [' + JSON.stringify(Object.assign({id:'f7'}, dati)) + '] }');
  win.eval('editPazId = "f7"');
}

test('F7 — campo compilato: vince il valore del modulo', () => {
  preparaPaziente({ altezza: 170 });
  campo('p-altezza', '178');
  assert.strictEqual(win._pazNumOPrec('p-altezza', 'altezza'), 178);
  togliCampo('p-altezza');
});

test('F7 — campo ASSENTE dal modulo: si tiene il valore precedente, non si azzera', () => {
  preparaPaziente({ altezza: 178, peso: 83 });
  togliCampo('p-altezza'); togliCampo('p-peso');
  assert.strictEqual(win._pazNumOPrec('p-altezza', 'altezza'), 178, 'è esattamente il bug F7');
  assert.strictEqual(win._pazNumOPrec('p-peso', 'peso'), 83);
});

test('F7 — campo svuotato di proposito: si rispetta, torna null', () => {
  preparaPaziente({ altezza: 178 });
  campo('p-altezza', '');
  assert.strictEqual(win._pazNumOPrec('p-altezza', 'altezza'), null, 'cancellare a mano deve poter cancellare');
  togliCampo('p-altezza');
});

test('F7 — paziente nuovo (nessun precedente): null senza esplodere', () => {
  win.eval('db = { pazienti: [] }');
  win.eval('editPazId = null');
  togliCampo('p-altezza');
  assert.strictEqual(win._pazNumOPrec('p-altezza', 'altezza'), null);
});

test('F7 — valore precedente non numerico o assente: null, mai NaN', () => {
  preparaPaziente({ altezza: 'boh' });
  togliCampo('p-altezza');
  assert.strictEqual(win._pazNumOPrec('p-altezza', 'altezza'), null);
  preparaPaziente({});
  assert.strictEqual(win._pazNumOPrec('p-altezza', 'altezza'), null);
});

test('F7 — campo con testo non numerico: si ripiega sul precedente', () => {
  preparaPaziente({ altezza: 178 });
  campo('p-altezza', 'centosettanta');
  assert.strictEqual(win._pazNumOPrec('p-altezza', 'altezza'), 178, 'meglio il dato vecchio che nessun dato');
  togliCampo('p-altezza');
});

test('F7 — i campi mancanti sono tornati nel markup', () => {
  const fs = require('fs');
  const html = fs.readFileSync(require('./_extract').INDEX_PATH, 'utf-8');
  ['p-altezza', 'p-peso', 'p-no-rinuncia'].forEach(function(id){
    assert.ok(html.indexOf('id="' + id + '"') >= 0, 'manca nel modulo: ' + id);
  });
  assert.ok(html.indexOf("gs('p-risc')") < 0, "p-risc era codice morto: non deve più essere letto");
});
