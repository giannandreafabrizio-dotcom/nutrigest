// step3_2_pdf.js — secondo refactor di generaPDF (stile foto 3)
// Eseguire con: node step3_2_pdf.js
// Sostituisce la funzione precedente (Step 3.1).

const fs = require('fs');
const path = 'index.html';
let src = fs.readFileSync(path, 'utf8');

const startMarker = 'function generaPDF(paziente, giorni) {';
const tailMarker  = 'function openInbody(){';

const iStart = src.indexOf(startMarker);
const iTail  = src.indexOf(tailMarker);
if (iStart === -1) { console.error('ERRORE: startMarker non trovato'); process.exit(1); }
if (iTail   === -1) { console.error('ERRORE: tail openInbody non trovato'); process.exit(1); }

const before = src.slice(0, iStart);
const tail   = src.slice(iTail);

const NEW_FN = `function generaPDF(paziente, giorni) {
  // Fase 3.2 — Layout stile foto target: 1 pagina/giorno, distribuzione uniforme,
  // ricette '1.' bold + testo, label "Alternative:", layout 50/50 ariato.
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  // Palette
  var NERO    = [30, 30, 30];
  var GRIGIO  = [120, 120, 120];
  var GRIGIO2 = [200, 200, 200];
  var GRIGIO3 = [160, 160, 160];
  var TEAL    = [29, 158, 117];

  // Geometria pagina (A4 portrait)
  var W = 210, H = 297;
  var M = 14;
  var TOP_HEADER = 16;       // y header giorno
  var TOP_CONTENT = 36;      // y di partenza dei pasti (dopo header + linea)
  var BOTTOM = 282;          // limite inferiore contenuto (sopra footer)
  var FOOTER_Y = 290;
  var COL_GAP = 8;           // gap tra colonna sx e dx
  var COL_W = (W - M * 2 - COL_GAP) / 2;  // larghezza colonna 50/50

  var nomePaz = ((paziente.nome || '') + ' ' + (paziente.cognome || '')).trim();
  var dataGen = (function(){
    var d = new Date();
    var dd = String(d.getDate()).padStart(2,'0');
    var mm = String(d.getMonth()+1).padStart(2,'0');
    return dd + '/' + mm + '/' + d.getFullYear();
  })();

  var slotLabel = {
    colazione:'COLAZIONE',
    spuntino_mattina:'SPUNTINO MATTINA',
    pranzo:'PRANZO',
    spuntino_pomeriggio:'SPUNTINO POMERIGGIO',
    cena:'CENA',
    pre_nanna:'PRE-NANNA'
  };
  var slotKeys = ['colazione','spuntino_mattina','pranzo','spuntino_pomeriggio','cena','pre_nanna'];

  // ---------- helper ----------
  function safe(s) {
    if (s == null) return '';
    return String(s)
      .replace(/[\\u2018\\u2019]/g, "'")
      .replace(/[\\u201C\\u201D]/g, '"')
      .replace(/\\u2013/g, '-')
      .replace(/\\u2014/g, '-')
      .replace(/\\u2026/g, '...')
      .replace(/\\u00A0/g, ' ');
  }

  function setFont(weight, size, color) {
    doc.setFont('helvetica', weight || 'normal');
    doc.setFontSize(size);
    doc.setTextColor.apply(doc, color || NERO);
  }

  function measure(s, size, weight) {
    doc.setFont('helvetica', weight || 'normal');
    doc.setFontSize(size);
    return doc.getTextWidth(safe(s));
  }

  function gramText(g) {
    if (g == null || g === '') return '';
    return g + ' g';
  }

  // Normalizza l'accesso al pasto (nuovo formato pasti.{slot} oppure legacy)
  function pastoOf(g, key) {
    if (g.pasti && g.pasti[key]) return g.pasti[key];
    if (g[key]) return g[key];
    return null;
  }

  // ---------- MISURAZIONE altezza pasto (per distribuzione uniforme) ----------
  // Ritorna l'altezza in mm che il pasto occuperà (esclusi gap fra pasti)
  function measurePasto(slotKey, pasto) {
    if (!pasto) return 0;
    var hasCelle = pasto.celle && pasto.celle.length;
    var hasRicette = pasto.ricette && pasto.ricette.length;
    var notaTesto = (typeof pasto === 'string') ? pasto : '';
    if (!hasCelle && !hasRicette && !notaTesto) return 0;

    var h = 0;
    // Titolo pasto (slot label)
    h += 5.2;

    if (notaTesto) {
      var lines = doc.splitTextToSize(safe(notaTesto), W - M * 2);
      h += lines.length * 4.6 + 2;
      return h;
    }

    if (hasRicette) {
      pasto.ricette.forEach(function(r) {
        if (!r) return;
        // misura con formato "1. {testo}" — il numero è bold
        var prefixW = measure('1. ', 9.5, 'bold');
        var lines = doc.splitTextToSize(safe(r), W - M * 2 - prefixW);
        h += lines.length * 4.6;
      });
      h += 2;
    }

    if (hasCelle) {
      var righe = groupCelleByOrdine(pasto.celle);
      var ordKeys = Object.keys(righe).sort(function(a,b){ return Number(a)-Number(b); });
      ordKeys.forEach(function(ord) {
        var hSx = cellHeight(righe[ord].sx);
        var hDx = cellHeight(righe[ord].dx);
        h += Math.max(hSx, hDx) + 2.5;  // gap tra righe celle
      });
    }
    return h;
  }

  function groupCelleByOrdine(celle) {
    var righe = {};
    (celle || []).forEach(function(c) {
      var ord = c.ordine || 1;
      if (!righe[ord]) righe[ord] = { sx: null, dx: null };
      righe[ord][c.colonna || 'sx'] = c;
    });
    return righe;
  }

  // Altezza di una cella in mm
  function cellHeight(c) {
    if (!c || !c.alimenti || !c.alimenti.length) return 0;
    var n = c.alimenti.length;
    if (n === 1) return 5.5;
    // 1 principale (5.5) + label "Alternative:" (3.8) + (n-1) alternative (4.2 cad)
    return 5.5 + 3.8 + (n - 1) * 4.2 + 1;
  }

  // ---------- HEADER giorno + footer ----------
  function drawDayHeader(giornoLabel, macros) {
    setFont('bold', 16, NERO);
    doc.text(safe(giornoLabel), W / 2, TOP_HEADER + 4, { align: 'center' });

    if (macros && (macros.kcal || macros.proteine || macros.carboidrati || macros.grassi)) {
      var parts = [];
      if (macros.kcal != null) parts.push(Math.round(macros.kcal) + ' kcal');
      if (macros.proteine != null) parts.push('P ' + Math.round(macros.proteine) + ' g');
      if (macros.carboidrati != null) parts.push('C ' + Math.round(macros.carboidrati) + ' g');
      if (macros.grassi != null) parts.push('G ' + Math.round(macros.grassi) + ' g');
      setFont('normal', 9, GRIGIO);
      doc.text(parts.join('   ·   '), W / 2, TOP_HEADER + 10, { align: 'center' });
    }

    doc.setDrawColor.apply(doc, GRIGIO2);
    doc.setLineWidth(0.2);
    doc.line(M, TOP_HEADER + 13, W - M, TOP_HEADER + 13);
  }

  // ---------- DISEGNO pasto (a partire da y dato) ----------
  // Ritorna nuovo y dopo aver disegnato il pasto.
  function drawPasto(slotKey, pasto, y) {
    if (!pasto) return y;
    var hasCelle = pasto.celle && pasto.celle.length;
    var hasRicette = pasto.ricette && pasto.ricette.length;
    var notaTesto = (typeof pasto === 'string') ? pasto : '';
    if (!hasCelle && !hasRicette && !notaTesto) return y;

    // Titolo pasto: bold, dimensione 10.5, NERO (pulito, niente colore)
    setFont('bold', 10.5, NERO);
    doc.text(slotLabel[slotKey] || slotKey.toUpperCase(), M, y);
    y += 5.2;

    // Pasto in formato testo (legacy)
    if (notaTesto) {
      setFont('italic', 10, NERO);
      doc.splitTextToSize(safe(notaTesto), W - M * 2).forEach(function(l) {
        doc.text(l, M, y); y += 4.6;
      });
      y += 2;
      return y;
    }

    // Ricette descrittive: "1." bold + testo normale
    if (hasRicette) {
      var prefixW = measure('1. ', 9.5, 'bold');
      pasto.ricette.forEach(function(r, i) {
        if (!r) return;
        var prefix = (i + 1) + '. ';
        var lines = doc.splitTextToSize(safe(r), W - M * 2 - prefixW);
        // Prima riga: numero bold + testo normale
        setFont('bold', 9.5, NERO);
        doc.text(prefix, M, y);
        setFont('normal', 9.5, NERO);
        doc.text(lines[0] || '', M + prefixW, y);
        y += 4.6;
        // Righe successive (wrap): rientro
        for (var k = 1; k < lines.length; k++) {
          doc.text(lines[k], M + prefixW, y);
          y += 4.6;
        }
      });
      y += 2;
    }

    // Celle a 2 colonne 50/50
    if (hasCelle) {
      var righe = groupCelleByOrdine(pasto.celle);
      var ordKeys = Object.keys(righe).sort(function(a,b){ return Number(a)-Number(b); });
      ordKeys.forEach(function(ord) {
        var riga = righe[ord];
        var hSx = cellHeight(riga.sx);
        var hDx = cellHeight(riga.dx);
        var hRow = Math.max(hSx, hDx);
        drawCella(riga.sx, M, y, COL_W);
        drawCella(riga.dx, M + COL_W + COL_GAP, y, COL_W);
        y += hRow + 2.5;
      });
    }

    return y;
  }

  // Disegna una cella alla posizione (x, yTop) con larghezza wCell
  function drawCella(c, x, yTop, wCell) {
    if (!c || !c.alimenti || !c.alimenti.length) return;
    var ali = c.alimenti;
    var princ = ali[0];

    // PRINCIPALE: nome bold + grammatura bold a destra
    setFont('bold', 10, NERO);
    var nomeP = safe(princ.n || '');
    var gP = gramText(princ.g);
    var gPwidth = gP ? measure(gP, 10, 'bold') + 2 : 0;
    var nomeMaxW = wCell - gPwidth;
    var nomeLines = doc.splitTextToSize(nomeP, nomeMaxW);
    var nomeShown = nomeLines[0];
    if (nomeLines.length > 1) {
      while (nomeShown.length > 0 && measure(nomeShown + '...', 10, 'bold') > nomeMaxW) {
        nomeShown = nomeShown.slice(0, -1);
      }
      nomeShown += '...';
    }
    doc.text(nomeShown, x, yTop + 3.6);
    if (gP) doc.text(gP, x + wCell, yTop + 3.6, { align: 'right' });

    // ALTERNATIVE
    if (ali.length > 1) {
      var ay = yTop + 8.4;
      // Sub-label "Alternative:" piccolo grigio
      setFont('italic', 7.5, GRIGIO3);
      doc.text('Alternative:', x, ay);
      ay += 3.6;

      // Lista alternative
      setFont('italic', 9, GRIGIO);
      for (var i = 1; i < ali.length; i++) {
        var alt = ali[i];
        var nomeA = safe(alt.n || '');
        var gA = gramText(alt.g);
        var gAwidth = gA ? measure(gA, 9, 'italic') + 2 : 0;
        var nomeAmaxW = wCell - gAwidth;
        var nomeAlines = doc.splitTextToSize(nomeA, nomeAmaxW);
        var nomeAshown = nomeAlines[0];
        if (nomeAlines.length > 1) {
          while (nomeAshown.length > 0 && measure(nomeAshown + '...', 9, 'italic') > nomeAmaxW) {
            nomeAshown = nomeAshown.slice(0, -1);
          }
          nomeAshown += '...';
        }
        doc.text(nomeAshown, x, ay);
        if (gA) doc.text(gA, x + wCell, ay, { align: 'right' });
        ay += 4.2;
      }
    }
  }

  // ---------- CICLO PRINCIPALE: una pagina per giorno con distribuzione uniforme ----------
  giorni.forEach(function(g, idx) {
    if (idx > 0) doc.addPage();
    var giornoLabel = g.giorno || g.g || '';
    drawDayHeader(giornoLabel, g.macros);

    // Calcola elenco pasti non vuoti e loro altezza
    var pastiAttivi = [];
    slotKeys.forEach(function(k) {
      var p = pastoOf(g, k);
      var h = measurePasto(k, p);
      if (h > 0) pastiAttivi.push({ key: k, pasto: p, h: h });
    });
    if (!pastiAttivi.length) return;

    // Spazio disponibile per i pasti
    var hDisp = BOTTOM - TOP_CONTENT;
    var hTot  = pastiAttivi.reduce(function(s,p){ return s + p.h; }, 0);

    // Gap base tra pasti (minimo 4mm)
    var gapMin = 4;
    var nGaps = Math.max(pastiAttivi.length - 1, 1);
    var spazioExtra = hDisp - hTot - gapMin * nGaps;
    var gapExtra = 0;
    if (spazioExtra > 0 && pastiAttivi.length > 1) {
      // Distribuisci spazio extra come gap aggiuntivo, max 14mm per gap
      gapExtra = Math.min(spazioExtra / nGaps, 14);
    }
    var gap = gapMin + gapExtra;

    // Disegna pasti
    var y = TOP_CONTENT;
    pastiAttivi.forEach(function(p, i) {
      y = drawPasto(p.key, p.pasto, y);
      if (i < pastiAttivi.length - 1) y += gap;
    });
  });

  // ---------- Concetti educativi (in coda, opzionali) ----------
  var concetti = paziente.concetti || [];
  if (concetti.length) {
    doc.addPage();
    setFont('bold', 14, NERO);
    doc.text('Consigli per te', W / 2, TOP_HEADER + 4, { align: 'center' });
    doc.setDrawColor.apply(doc, GRIGIO2);
    doc.setLineWidth(0.2);
    doc.line(M, TOP_HEADER + 8, W - M, TOP_HEADER + 8);
    var yc = TOP_HEADER + 14;

    concetti.forEach(function(c) {
      var titolo = (typeof c === 'string') ? '' : (c.titolo || '');
      var testo  = (typeof c === 'string') ? c  : (c.testo || c.titolo || '');
      if (yc > BOTTOM - 12) { doc.addPage(); yc = TOP_HEADER + 4; }
      if (titolo) {
        setFont('bold', 10, TEAL);
        doc.text(safe(titolo), M, yc);
        yc += 5;
      }
      if (testo) {
        setFont('normal', 9, NERO);
        doc.splitTextToSize(safe(testo), W - M * 2).forEach(function(r) {
          if (yc > BOTTOM) { doc.addPage(); yc = TOP_HEADER + 4; }
          doc.text(r, M, yc); yc += 4.6;
        });
      }
      yc += 4;
    });
  }

  // ---------- FOOTER ----------
  var totPagine = doc.internal.getNumberOfPages();
  for (var i = 1; i <= totPagine; i++) {
    doc.setPage(i);
    setFont('normal', 7.5, GRIGIO);
    doc.text(safe(nomePaz), M, FOOTER_Y);
    doc.text('Generato il ' + dataGen, W / 2, FOOTER_Y, { align: 'center' });
    doc.text('Pag. ' + i + '/' + totPagine, W - M, FOOTER_Y, { align: 'right' });
  }

  var nomefile = 'Regime alimentare - ' + (paziente.nome || '') + ' ' + (paziente.cognome || '') + '.pdf';
  doc.save(nomefile);
}`;

const finalSrc = before + NEW_FN + '\n\n\n' + tail;
fs.writeFileSync(path, finalSrc, 'utf8');
console.log('OK — generaPDF aggiornata (Step 3.2 — stile foto target).');
console.log('Lunghezza nuova: ' + finalSrc.length + ' bytes (era ' + src.length + ').');
console.log('Differenza: ' + (finalSrc.length - src.length) + ' bytes.');
