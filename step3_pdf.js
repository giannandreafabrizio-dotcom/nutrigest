// step3_pdf.js — sostituisce la funzione generaPDF in index.html
// Eseguire con: node step3_pdf.js
// Il file index.html verrà modificato sul posto.

const fs = require('fs');
const path = 'index.html';
let src = fs.readFileSync(path, 'utf8');

// === ANCORE ===
const startMarker = 'function generaPDF(paziente, giorni) {';
const endMarker   = '\n  doc.save(nomefile);\n}\n\n\nfunction openInbody(){';

const iStart = src.indexOf(startMarker);
const iEnd   = src.indexOf(endMarker);
if (iStart === -1) { console.error('ERRORE: startMarker non trovato'); process.exit(1); }
if (iEnd   === -1) { console.error('ERRORE: endMarker non trovato');   process.exit(1); }

const before = src.slice(0, iStart);
const after  = src.slice(iEnd + '\n  doc.save(nomefile);\n}\n\n\n'.length); // tieni "function openInbody(){"

// === NUOVA FUNZIONE generaPDF ===
const NEW_FN = `function generaPDF(paziente, giorni) {
  // Fase 3 — Layout pulito 2 colonne, 1 pagina per giorno, niente header verde, niente icone.
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  // Palette minimale
  var NERO    = [30, 30, 30];
  var GRIGIO  = [120, 120, 120];
  var GRIGIO2 = [200, 200, 200];
  var TEAL    = [29, 158, 117];

  // Geometria pagina (A4: 210 x 297)
  var W = 210, H = 297;
  var M = 14;                  // margine sx/dx
  var TOP = 16;                // margine top
  var BOTTOM = 285;            // limite per page-break
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
  var y = 0;

  // Sostituisce caratteri non rappresentabili in helvetica/WinAnsi
  function safe(s) {
    if (s == null) return '';
    return String(s)
      .replace(/[\\u2018\\u2019]/g, "'")   // smart single quotes
      .replace(/[\\u201C\\u201D]/g, '"')   // smart double quotes
      .replace(/\\u2013/g, '-')             // en dash
      .replace(/\\u2014/g, '-')             // em dash
      .replace(/\\u2026/g, '...')           // ellipsis
      .replace(/\\u00A0/g, ' ');            // nbsp
  }

  function setFont(weight, size, color) {
    doc.setFont('helvetica', weight || 'normal');
    doc.setFontSize(size);
    doc.setTextColor.apply(doc, color || NERO);
  }

  function drawDayHeader(giornoLabel, macros) {
    // Nome giorno centrato
    setFont('bold', 16, NERO);
    doc.text(safe(giornoLabel), W / 2, TOP + 4, { align: 'center' });

    // Riga macros target (se presenti)
    if (macros && (macros.kcal || macros.proteine || macros.carboidrati || macros.grassi)) {
      var parts = [];
      if (macros.kcal != null) parts.push(Math.round(macros.kcal) + ' kcal');
      if (macros.proteine != null) parts.push('P ' + Math.round(macros.proteine) + 'g');
      if (macros.carboidrati != null) parts.push('C ' + Math.round(macros.carboidrati) + 'g');
      if (macros.grassi != null) parts.push('G ' + Math.round(macros.grassi) + 'g');
      setFont('normal', 9, GRIGIO);
      doc.text(parts.join('   ·   '), W / 2, TOP + 10, { align: 'center' });
    }

    // Linea separatrice sottile
    doc.setDrawColor.apply(doc, GRIGIO2);
    doc.setLineWidth(0.2);
    doc.line(M, TOP + 13, W - M, TOP + 13);

    y = TOP + 19;
  }

  function ensure(h) {
    if (y + h > BOTTOM) {
      doc.addPage();
      // Sulle pagine successive di overflow, header minimale (raro: 1 giorno = 1 pagina)
      y = TOP + 4;
      setFont('italic', 9, GRIGIO);
      doc.text('(segue) ' + safe(_currentGiornoLabel), W / 2, y, { align: 'center' });
      doc.setDrawColor.apply(doc, GRIGIO2);
      doc.setLineWidth(0.2);
      doc.line(M, y + 3, W - M, y + 3);
      y += 9;
    }
  }

  // Misura larghezza testo nella font/size correnti — per auto-fit
  function measure(s, size, weight) {
    doc.setFont('helvetica', weight || 'normal');
    doc.setFontSize(size);
    return doc.getTextWidth(safe(s));
  }

  // Ritorna stringa con grammatura formattata
  function gramText(g) {
    if (g == null || g === '') return '';
    return g + 'g';
  }

  // ---------- render di un singolo pasto ----------
  function drawPasto(slotKey, pasto) {
    if (!pasto) return;
    // Salta se non c'è nulla (né celle né testo)
    var hasCelle = pasto.celle && pasto.celle.length;
    var hasRicette = pasto.ricette && pasto.ricette.length;
    var notaTesto = (typeof pasto === 'string') ? pasto : '';
    if (!hasCelle && !hasRicette && !notaTesto) return;

    ensure(10);

    // Titolo pasto (piccolo, maiuscoletto, niente icone/cerchi)
    setFont('bold', 9.5, TEAL);
    doc.text(slotLabel[slotKey] || slotKey.toUpperCase(), M, y);
    y += 4.8;

    // Pasto in formato testo libero (legacy)
    if (notaTesto) {
      setFont('italic', 10, NERO);
      doc.splitTextToSize(safe(notaTesto), W - M * 2).forEach(function(l) {
        ensure(5); doc.text(l, M, y); y += 4.6;
      });
      y += 2;
      return;
    }

    // Ricette descrittive (solo pranzo/cena tipicamente)
    if (hasRicette) {
      setFont('italic', 9.5, NERO);
      pasto.ricette.forEach(function(r, i) {
        if (!r) return;
        var prefix = (i + 1) + '. ';
        var maxW = W - M * 2 - measure(prefix, 9.5, 'italic');
        var lines = doc.splitTextToSize(safe(r), maxW);
        ensure(lines.length * 4.5 + 1);
        lines.forEach(function(l, li) {
          var x = M;
          if (li === 0) {
            // numero in nero non corsivo
            setFont('bold', 9.5, NERO);
            doc.text(prefix, x, y);
            x += measure(prefix, 9.5, 'bold');
            setFont('italic', 9.5, NERO);
            doc.text(l, x, y);
          } else {
            setFont('italic', 9.5, NERO);
            doc.text(l, M + measure(prefix, 9.5, 'bold'), y);
          }
          y += 4.5;
        });
      });
      y += 1.5;
    }

    // Celle a 2 colonne
    if (hasCelle) {
      // Raggruppa per ordine
      var celle = pasto.celle.slice().sort(function(a,b){
        if (a.ordine !== b.ordine) return (a.ordine||1) - (b.ordine||1);
        return (a.colonna === 'sx') ? -1 : 1;
      });
      var righe = {};
      celle.forEach(function(c) {
        var ord = c.ordine || 1;
        if (!righe[ord]) righe[ord] = { sx: null, dx: null };
        righe[ord][c.colonna || 'sx'] = c;
      });
      var ordKeys = Object.keys(righe).sort(function(a,b){ return Number(a)-Number(b); });

      // Auto-fit larghezza colonna sx in base alla riga più larga della colonna sx
      var totalW = W - M * 2;
      var gutter = 6;
      var maxSxW = 0;
      ordKeys.forEach(function(ord) {
        var c = righe[ord].sx;
        if (!c || !c.alimenti) return;
        c.alimenti.forEach(function(a, idx) {
          var weight = (idx === 0) ? 'bold' : 'italic';
          var size = (idx === 0) ? 10 : 9;
          var line = (a.n || '') + '  ' + gramText(a.g);
          var w = measure(line, size, weight);
          if (w > maxSxW) maxSxW = w;
        });
      });
      // Vincoli: min 38%, max 62% della larghezza disponibile (al netto del gutter)
      var availW = totalW - gutter;
      var sxW = maxSxW + 4; // un piccolo padding
      var minSx = availW * 0.38;
      var maxSx = availW * 0.62;
      if (sxW < minSx) sxW = minSx;
      if (sxW > maxSx) sxW = maxSx;
      var dxW = availW - sxW;
      var xSx = M;
      var xDx = M + sxW + gutter;

      ordKeys.forEach(function(ord) {
        var riga = righe[ord];
        // Calcola altezza riga = max delle due celle
        var hSx = cellHeight(riga.sx);
        var hDx = cellHeight(riga.dx);
        var hRow = Math.max(hSx, hDx);
        ensure(hRow + 1.5);
        drawCella(riga.sx, xSx, y, sxW);
        drawCella(riga.dx, xDx, y, dxW);
        y += hRow + 1.5;
      });
    }

    y += 2.5;
  }

  // Altezza richiesta da una cella (per allineare le 2 colonne)
  function cellHeight(c) {
    if (!c || !c.alimenti || !c.alimenti.length) return 0;
    // riga principale (10pt) ~5mm + ogni alternativa (9pt) ~4mm
    var n = c.alimenti.length;
    return 5 + (n - 1) * 4;
  }

  // Disegna una cella: principale grassetto + alt corsivo grigio
  function drawCella(c, x, yTop, wCell) {
    if (!c || !c.alimenti || !c.alimenti.length) return;
    var ali = c.alimenti;
    var princ = ali[0];

    // PRINCIPALE: nome bold a sinistra, grammatura bold allineata a destra
    setFont('bold', 10, NERO);
    var nomeP = safe(princ.n || '');
    var gP = gramText(princ.g);
    // Tronca nome se troppo lungo per stare nella cella
    var gPwidth = gP ? measure(gP, 10, 'bold') + 2 : 0;
    var nomeMaxW = wCell - gPwidth;
    var nomeLines = doc.splitTextToSize(nomeP, nomeMaxW);
    // Una riga per il principale (se va a capo prendiamo solo la prima riga + ellissi)
    var nomeShown = nomeLines[0];
    if (nomeLines.length > 1) {
      // accorcia finché non sta + '...'
      while (nomeShown.length > 0 && measure(nomeShown + '...', 10, 'bold') > nomeMaxW) {
        nomeShown = nomeShown.slice(0, -1);
      }
      nomeShown += '...';
    }
    doc.text(nomeShown, x, yTop + 3.4);
    if (gP) {
      doc.text(gP, x + wCell, yTop + 3.4, { align: 'right' });
    }

    // ALTERNATIVE
    var ay = yTop + 7;
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
      ay += 4;
    }
  }

  // ---------- ciclo principale: una pagina per giorno ----------
  var _currentGiornoLabel = '';

  // Normalizza: il piano può arrivare in 2 forme — { pasti: {...} } (nuovo) oppure { colazione, pranzo, ... } (legacy espanso)
  function pastoOf(g, key) {
    if (g.pasti && g.pasti[key]) return g.pasti[key];
    if (g[key]) return g[key];
    return null;
  }

  giorni.forEach(function(g, idx) {
    if (idx > 0) doc.addPage();
    _currentGiornoLabel = g.giorno || g.g || '';
    drawDayHeader(_currentGiornoLabel, g.macros);

    slotKeys.forEach(function(key) {
      drawPasto(key, pastoOf(g, key));
    });
  });

  // ---------- Concetti educativi (opzionali, in coda) ----------
  var concetti = paziente.concetti || [];
  if (concetti.length) {
    doc.addPage();
    setFont('bold', 14, NERO);
    doc.text('Consigli per te', W / 2, TOP + 4, { align: 'center' });
    doc.setDrawColor.apply(doc, GRIGIO2);
    doc.setLineWidth(0.2);
    doc.line(M, TOP + 8, W - M, TOP + 8);
    y = TOP + 14;

    concetti.forEach(function(c) {
      var titolo = (typeof c === 'string') ? '' : (c.titolo || '');
      var testo  = (typeof c === 'string') ? c  : (c.testo || c.titolo || '');
      ensure(12);
      if (titolo) {
        setFont('bold', 10, TEAL);
        doc.text(safe(titolo), M, y);
        y += 5;
      }
      if (testo) {
        setFont('normal', 9, NERO);
        doc.splitTextToSize(safe(testo), W - M * 2).forEach(function(r) {
          ensure(5); doc.text(r, M, y); y += 4.6;
        });
      }
      y += 4;
    });
  }

  // ---------- Footer su tutte le pagine ----------
  var totPagine = doc.internal.getNumberOfPages();
  for (var i = 1; i <= totPagine; i++) {
    doc.setPage(i);
    setFont('normal', 7.5, GRIGIO);
    var footL = nomePaz;
    var footC = 'Generato il ' + dataGen;
    var footR = 'Pag. ' + i + '/' + totPagine;
    doc.text(safe(footL), M, 292);
    doc.text(footC, W / 2, 292, { align: 'center' });
    doc.text(footR, W - M, 292, { align: 'right' });
  }

  var nomefile = 'Regime alimentare - ' + (paziente.nome || '') + ' ' + (paziente.cognome || '') + '.pdf';
  doc.save(nomefile);
}`;

// Costruisci nuovo file
const out = before + NEW_FN + '\n\n\nfunction openInbody(){' + after.replace(/^function openInbody\(\)\{/, '');
// Nota: l'`after` inizia DOPO "function openInbody(){" perché endMarker include quel pezzo.
// Devo ricostruire correttamente: meglio rifare il calcolo.

// Refaccio in modo più robusto:
const REBUILD = before + NEW_FN + endMarker; // endMarker = "\n  doc.save(nomefile);\n}\n\n\nfunction openInbody(){"
// Però NEW_FN finisce già con doc.save(...); }, quindi non devo includere quella parte.
// Ricalcolo: "endMarker" comincia con il vecchio doc.save; il nuovo lo ha già. 
// Quindi la sostituzione corretta è:
//   nuovo = before + NEW_FN + "\n\n\nfunction openInbody(){" + restoDopo

const tailStart = src.indexOf('function openInbody(){');
if (tailStart === -1) { console.error('ERRORE: tail openInbody non trovato'); process.exit(1); }
const tail = src.slice(tailStart); // include "function openInbody(){..."
const finalSrc = before + NEW_FN + '\n\n\n' + tail;

fs.writeFileSync(path, finalSrc, 'utf8');
console.log('OK — generaPDF sostituita.');
console.log('Lunghezza nuova: ' + finalSrc.length + ' bytes (era ' + src.length + ').');
console.log('Differenza: ' + (finalSrc.length - src.length) + ' bytes.');