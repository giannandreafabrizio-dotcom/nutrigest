// ── S2/S3 — Richiesta analisi del sangue per il medico curante (P116) ──
// Copre le tre parti che possono rompersi in silenzio:
//   1) il catalogo delle voci resta agganciato ai nomi reali di ANALISI
//      (se una voce di ANALISI viene rinominata, il collegamento
//      "richiesto → ricevuto" si spezzerebbe senza errori a video);
//   2) le regole di preselezione accendono i blocchi giusti e SOLO quelli;
//   3) la costruzione del PDF non lancia eccezioni e produce contenuto.
//
// LIMITE DICHIARATO: l'invio (WhatsApp, caricamento su Supabase Storage) e
// l'aspetto grafico del foglio restano verificati MANUALMENTE nel browser —
// dipendono da rete, popup e menu nativo del sistema operativo.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const jsPDFModule = require('jspdf');
const { loadApp } = require('./_loadApp');

// Le costanti dichiarate con `const` a livello di script NON diventano
// proprieta' di window: si leggono valutando il nome nello scope della pagina.
function cost(win, nome) { return win.eval(nome); }

function pazBase(extra) {
  return Object.assign({
    id: 'test-1', nome: 'Mario', cognome: 'Rossi', nascita: '1980-05-10',
    sesso: 'M', tel: '333 1234567', patologie: '', regime: 'Mediterranea',
    inbody: [], analisiSangue: {}
  }, extra || {});
}
// Scrive un valore di analisi usando la stessa chiave che usa l'app.
function conAnalisi(win, coppie) {
  const as = {};
  Object.keys(coppie).forEach(function (nome) {
    as[win.eval('ANALISI_KEY')(nome) + '_val'] = String(coppie[nome]);
  });
  return as;
}
function sezioniAccese(pre) {
  const set = new Set();
  Object.keys(pre.sel).forEach(function (k) { if (pre.sel[k]) set.add(k.split('.')[0]); });
  return set;
}

test('P116 — ogni voce del catalogo punta a nomi realmente presenti in ANALISI', () => {
  const win = loadApp();
  const validi = new Set(Object.values(cost(win,'ANALISI')).flat());
  const mancanti = [];
  cost(win,'RICH_CATALOGO').forEach(function (sez) {
    sez.voci.forEach(function (v) {
      (v.map || []).forEach(function (nome) {
        if (!validi.has(nome)) mancanti.push(sez.id + '.' + v.id + ' → ' + nome);
      });
    });
  });
  assert.deepStrictEqual(mancanti, [], 'Voci scollegate da ANALISI: ' + mancanti.join(', '));
});

test('P116 — gli id delle voci sono univoci dentro ogni sezione', () => {
  const win = loadApp();
  cost(win,'RICH_CATALOGO').forEach(function (sez) {
    const ids = sez.voci.map(function (v) { return v.id; });
    assert.strictEqual(new Set(ids).size, ids.length, 'id duplicati nella sezione ' + sez.id);
  });
});

test('P116 — paziente senza dati: solo le 15 voci di base, nessun blocco extra', () => {
  const win = loadApp();
  const pre = win._richPreselezione(pazBase());
  const acc = sezioniAccese(pre);
  assert.deepStrictEqual([...acc], ['base'], 'Acceso qualcosa oltre alla base: ' + [...acc].join(', '));
  assert.strictEqual(Object.keys(pre.sel).length, 15, 'La base deve avere esattamente 15 voci');
  // pre.motivi nasce dentro il realm JSDOM: si confrontano le chiavi, non l'oggetto.
  assert.deepStrictEqual(Object.keys(pre.motivi), []);
});

test('P116 — BMI 32 accende il blocco insulino-resistenza, con motivo leggibile', () => {
  const win = loadApp();
  const pre = win._richPreselezione(pazBase({ inbody: [{ data: '2026-01-01', bmi: 32.4 }] }));
  assert.ok(sezioniAccese(pre).has('ir'), 'Il blocco IR doveva accendersi');
  assert.match(pre.motivi.ir, /BMI 32,4/);
});

test('P116 — regime chetogenico accende il blocco insulino-resistenza', () => {
  const win = loadApp();
  const pre = win._richPreselezione(pazBase({ regime: 'Chetogenica' }));
  assert.ok(sezioniAccese(pre).has('ir'));
});

test('P116 — transaminasi alterate accendono SOLO il blocco epatico', () => {
  const win = loadApp();
  const p = pazBase();
  p.analisiSangue = conAnalisi(win, { 'ALT (transaminasi)': 58 });
  const pre = win._richPreselezione(p);
  const acc = sezioniAccese(pre);
  assert.ok(acc.has('epatico'), 'Il blocco epatico doveva accendersi');
  assert.ok(!acc.has('ir') && !acc.has('cardio'), 'Accesi blocchi non pertinenti: ' + [...acc].join(', '));
  assert.match(pre.motivi.epatico, /ALT 58/);
});

test('P116 — TSH fuori range accende gli anticorpi tiroidei; LDL alto accende il cardiovascolare', () => {
  const win = loadApp();
  const p1 = pazBase(); p1.analisiSangue = conAnalisi(win, { 'TSH': 6.2 });
  assert.ok(sezioniAccese(win._richPreselezione(p1)).has('autotir'));
  const p2 = pazBase(); p2.analisiSangue = conAnalisi(win, { 'LDL': 165 });
  assert.ok(sezioniAccese(win._richPreselezione(p2)).has('cardio'));
});

test('P116 — una patologia in anamnesi accende il blocco corrispondente', () => {
  const win = loadApp();
  const pre = win._richPreselezione(pazBase({ patologie: 'PCOS, Reflusso' }));
  assert.ok(sezioniAccese(pre).has('ir'));
  assert.match(pre.motivi.ir, /anamnesi/);
});

test('P116 — micronutrienti e vitamine non si accendono mai da soli', () => {
  const win = loadApp();
  const p = pazBase({ patologie: 'PCOS', inbody: [{ data: '2026-01-01', bmi: 34 }] });
  p.analisiSangue = conAnalisi(win, { 'ALT (transaminasi)': 70, 'TSH': 7, 'LDL': 180, 'Ferritina': 400 });
  const acc = sezioniAccese(win._richPreselezione(p));
  assert.ok(!acc.has('micro'), 'I micronutrienti restano una scelta manuale');
  assert.ok(!acc.has('vitamine'), 'Le vitamine restano una scelta manuale');
});

test('P116 — i caratteri fuori dal set latino vengono sostituiti prima della stampa', () => {
  const win = loadApp();
  const out = win._richTxt('γ-GT — 30 μg… “ok”');
  assert.ok(!/[γμ—…“”]/.test(out), 'Caratteri non stampabili rimasti: ' + out);
  assert.match(out, /gamma-GT/);
});

test('P116 — il PDF si costruisce senza eccezioni e ha contenuto', () => {
  const win = loadApp();
  win.jspdf = jsPDFModule;
  const p = pazBase({ inbody: [{ data: '2026-01-01', bmi: 32.4 }] });
  const pre = win._richPreselezione(p);
  // Ricostruisce le sezioni come farebbe la modale, ma senza DOM.
  const sezioni = cost(win,'RICH_CATALOGO')
    .map(function (s) {
      const voci = s.voci.filter(function (v) { return pre.sel[s.id + '.' + v.id]; });
      return voci.length ? { id: s.id, titolo: s.titolo, voci: voci } : null;
    })
    .filter(Boolean);
  assert.ok(sezioni.length >= 2, 'Attese almeno base + IR');
  let doc = null;
  assert.doesNotThrow(function () {
    doc = win._richCostruisciPDF(p, sezioni, 'Valutazione nutrizionale iniziale');
  });
  assert.ok(doc, 'Il documento non deve essere null');
  assert.ok(doc.output('arraybuffer').byteLength > 0, 'Il PDF deve avere contenuto');
});

test('P116 — il link WhatsApp usa il numero del paziente con prefisso italiano', () => {
  const win = loadApp();
  const url = win._richWaUrl(pazBase(), 'ciao');
  assert.match(url, /^https:\/\/wa\.me\/393331234567\?text=/);
  const senzaTel = win._richWaUrl(pazBase({ tel: '' }), 'ciao');
  assert.match(senzaTel, /^https:\/\/wa\.me\/\?text=/);
});
