// ── S3 — Render smoke (jsPDF) ──
// Verifica il prerequisito minimo per la generazione PDF: che la libreria
// jsPDF (caricata via CDN nell'app reale) sia utilizzabile nello stesso
// ambiente JSDOM in cui gira lo script applicativo, e che una generazione
// PDF elementare non lanci eccezioni.
//
// LIMITE DICHIARATO (onestà sopra copertura apparente): generaPDF() reale
// ha measurePasto/drawPasto definite come funzioni ANNIDATE non esportate,
// legge window.jspdf, e fa fetch() di rete verso Cloudflare per le emoji
// Twemoji. Un vero smoke "giorno-tipo attraverso generaPDF()" richiederebbe
// mockare fetch e costruire un fixture paziente+piano fedele allo schema
// interno — rischio di costruire un fixture "finto" che non riflette i
// piani reali e dà un falso senso di sicurezza (lo stesso rischio che
// l'analisi critica segnala per P61). Questo test copre solo il
// prerequisito di libreria; la generazione PDF end-to-end resta verificata
// MANUALMENTE nel browser prima di ogni commit che tocca il PDF (vedi
// principi di progetto già in uso per Pointer Events/drag&drop).
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const jsPDFModule = require('jspdf');
const { loadApp } = require('./_loadApp');

test('S3 — jsPDF genera un PDF minimo senza eccezioni (prerequisito di libreria)', () => {
  const { jsPDF } = jsPDFModule;
  assert.doesNotThrow(() => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    doc.text('Smoke test NutriGest', 14, 16);
    const out = doc.output('arraybuffer');
    assert.ok(out.byteLength > 0, 'Il PDF generato deve avere contenuto');
  });
});

test('S3 — window.jspdf è iniettabile nello stesso ambiente JSDOM dello script applicativo', () => {
  const win = loadApp();
  // Simula l'iniezione della libreria come avviene nel browser reale (script src CDN)
  win.jspdf = jsPDFModule;
  assert.strictEqual(typeof win.jspdf.jsPDF, 'function');
  assert.strictEqual(typeof win.generaPDF, 'function', 'generaPDF deve essere definita e pronta a leggere window.jspdf');
});
