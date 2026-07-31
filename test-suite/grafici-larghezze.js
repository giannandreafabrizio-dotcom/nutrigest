// ── Rassegna dei grafici InBody alle larghezze reali (P146, 31 lug 2026) ────
//
// PERCHÉ ESISTE. In un grafico il testo è DISEGNATO, non scritto: un <text> SVG
// non va a capo e non si rimpicciolisce da solo. Un'etichetta pensata per la
// pagina larga, a mezza colonna resta lunga uguale e finisce addosso a quella
// accanto — e non produce nessun errore, nessuna eccezione, nessun test rosso.
// P145 ne ha corretti tre trovati a occhio; P146 ne ha trovato un quarto allo
// stesso modo. Guardare a occhio non scala: questo script MISURA.
//
// COME. Apre i sette grafici in un browser vero e per ogni <text> chiede al
// browser il rettangolo che occupa davvero (getBBox). Poi cerca le coppie che
// si sovrappongono e i testi che escono dal riquadro. Niente stime sulla
// lunghezza delle stringhe: le misure sono quelle vere del motore di rendering.
//
// COSA NON VEDE, dichiarato perché non venga scambiato per una garanzia: cerca
// solo TESTO CONTRO TESTO. Un'etichetta attraversata da una CURVA gli sfugge —
// e proprio così, guardando, il 31 lug si è trovato che la curva del grasso
// viscerale cancellava «lv.9 — limite superiore InBody» (le etichette erano
// disegnate PRIMA delle curve: in un SVG vince chi viene dopo). Quel controllo
// resta all'occhio. Questo script toglie di mezzo la parte meccanica, non la
// necessità di guardare il rendering.
//
// NON FA PARTE DELLA SUITE AUTOMATICA (`npm test`): serve un browser, e la
// suite gira solo su jsdom. Si lancia a mano quando si tocca un grafico:
//
//     cd test-suite && npm i -D playwright && node grafici-larghezze.js
//
// LE DUE LARGHEZZE che contano sono quelle vere della scheda: ~545px (riquadro
// a mezza colonna sul portatile) e ~397px (iPhone). La larghezza piena non ha
// mai trovato niente — è quella per cui le etichette sono state scritte.
'use strict';
const path = require('path');
const { loadApp } = require('./test/_loadApp');

const LARGHEZZE = [545, 397, 1100];
const SOGLIA_SOVRAPPOSIZIONE = 2;   // px: sotto questo si considera contatto innocuo

let chromium;
try { ({ chromium } = require('playwright')); }
catch (e) {
  console.error('Serve playwright: cd test-suite && npm i -D playwright');
  process.exit(2);
}

// ── dati di prova: un paziente con quattro referti, valori plausibili ────────
const REFERTI = [
  { data: '2026-01-10', peso: 92.4, pg: 32.1, musc: 33.8, acqua: 44.1, cintFianchi: 0.98, visc: 12 },
  { data: '2026-02-08', peso: 89.9, pg: 30.2, musc: 34.2, acqua: 44.6, cintFianchi: 0.96, visc: 11 },
  { data: '2026-03-09', peso: 87.1, pg: 27.9, musc: 34.4, acqua: 45.0, cintFianchi: 0.93, visc: 10 },
  { data: '2026-05-16', peso: 85.6, pg: 26.4, musc: 35.0, acqua: 45.4, cintFianchi: 0.91, visc: 9 }
];

function svgDeiGrafici() {
  const win = loadApp();
  const sorted = win.eval('(' + JSON.stringify(REFERTI) + ')');
  const S = win._ibSerie(sorted);
  const P = win._ibPeriodi(S);
  const ultimo = win.eval('(' + JSON.stringify(REFERTI[REFERTI.length - 1]) + ')');
  const out = [];
  LARGHEZZE.forEach(function (w) {
    out.push({ nome: 'G1 · Composizione nel tempo', w, svg: win._ibGrTempo(S, w) });
    out.push({ nome: 'G2 · Adiposità centrale', w, svg: win._ibGrAdiposita(S, w, 'M') });
    out.push({ nome: 'G2b · Righelli di oggi', w, svg: win._ibGrRighelliOggi(S, w, 'M') });
    out.push({ nome: 'G3 · Ritmo', w, svg: win._ibGrRitmo(P, w) });
    out.push({ nome: 'G3b · Mappa della qualità', w, svg: win._ibGrQualita(P, w) });
    out.push({ nome: 'G4 · Composizione del peso', w, svg: win._ibGrBarre(S, w) });
    out.push({ nome: 'G5 · Peso · Muscolo · Grasso', w, svg: win._ibGrForme(ultimo, w) });
  });
  return out.filter(function (g) { return g.svg && g.svg.indexOf('<svg') >= 0; });
}

function siSovrappongono(a, b) {
  const dx = Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x);
  const dy = Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y);
  return dx > SOGLIA_SOVRAPPOSIZIONE && dy > SOGLIA_SOVRAPPOSIZIONE;
}

(async () => {
  const grafici = svgDeiGrafici();
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1100, height: 800 } });
  await page.setContent('<!DOCTYPE html><html><head><meta charset="utf-8">' +
    '<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">' +
    '<style>body{font-family:"DM Sans",sans-serif;margin:0}</style></head><body><div id="q"></div></body></html>');
  await page.waitForTimeout(1200);   // i font devono essere caricati, o le misure sono di un altro carattere

  const problemi = [];
  for (const g of grafici) {
    await page.evaluate(function (s) { document.getElementById('q').innerHTML = s; }, g.svg);
    const misure = await page.evaluate(function () {
      const svg = document.querySelector('#q svg');
      if (!svg) return null;
      // NB: getBBox() ignora le trasformazioni, quindi su un'etichetta RUOTATA
      // (il titolo dell'asse Y) restituisce il rettangolo di prima della
      // rotazione — e ogni confronto diventa un falso allarme. getBoundingClientRect
      // le tiene invece in conto: si misura lì e si riporta nel sistema dell'SVG.
      const r0 = svg.getBoundingClientRect();
      // Il rettangolo di un <text> comprende tutta la riga tipografica (sopra e
      // sotto le lettere c'è spazio vuoto): confrontando quello, due etichette
      // vicine ma perfettamente leggibili risultano "sovrapposte". Si stringe
      // in verticale al 60% centrale, che è più o meno dove stanno le lettere.
      const testi = Array.from(svg.querySelectorAll('text')).map(function (t) {
        const b = t.getBoundingClientRect();
        const margine = b.height * 0.2;
        return { txt: (t.textContent || '').trim(),
          x: b.left - r0.left, y: b.top - r0.top + margine,
          width: b.width, height: Math.max(1, b.height - 2 * margine) };
      }).filter(function (t) { return t.txt && t.width > 0; });
      return { vb: { w: r0.width, h: r0.height }, testi: testi };
    });
    if (!misure) continue;

    for (let i = 0; i < misure.testi.length; i++) {
      for (let j = i + 1; j < misure.testi.length; j++) {
        if (siSovrappongono(misure.testi[i], misure.testi[j])) {
          problemi.push({ g: g.nome, w: g.w, tipo: 'sovrapposti',
            det: '«' + misure.testi[i].txt + '» + «' + misure.testi[j].txt + '»' });
        }
      }
    }
    misure.testi.forEach(function (t) {
      if (t.x < -1 || t.x + t.width > misure.vb.w + 1) {
        problemi.push({ g: g.nome, w: g.w, tipo: 'fuori dal riquadro', det: '«' + t.txt + '»' });
      }
    });
  }
  await browser.close();

  const perLarghezza = {};
  problemi.forEach(function (p) { (perLarghezza[p.w] = perLarghezza[p.w] || []).push(p); });
  console.log('Grafici esaminati: ' + grafici.length + ' (7 grafici × ' + LARGHEZZE.length + ' larghezze)');
  if (!problemi.length) { console.log('✓ nessuna etichetta sovrapposta o fuori dal riquadro'); process.exit(0); }
  LARGHEZZE.forEach(function (w) {
    const l = perLarghezza[w] || [];
    console.log('\n' + w + 'px — ' + l.length + ' problemi');
    l.forEach(function (p) { console.log('   [' + p.tipo + '] ' + p.g + ' → ' + p.det); });
  });
  process.exit(1);
})();
