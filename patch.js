// patch.js — Step 3.4: rifinitura estetica del PDF
//   1. Rimuove la riga macros sotto il nome del giorno
//   2. Aggiunge barra teal verticale a sinistra del nome pasto
//   3. Aggiunge linea grigia sottile tra i pasti
//   4. Font alimenti più grande (12pt invece di 10pt) — colonne più strette per compensare
//
// Idempotente + verifica sintassi.
// Eseguire: node patch.js

const fs = require('fs');
const path = 'index.html';
let src = fs.readFileSync(path, 'utf8');
const original = src;
console.log('Lunghezza iniziale:', src.length, 'bytes');

// ============================================================
// MOD 1 — drawDayHeader: rimuovi il blocco macros, sposta la linea più in alto
// ============================================================
const OLD_HEADER = `  function drawDayHeader(giornoLabel, macros) {
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
  }`;

const NEW_HEADER = `  function drawDayHeader(giornoLabel, macros) {
    setFont('bold', 17, NERO);
    doc.text(safe(giornoLabel), W / 2, TOP_HEADER + 4, { align: 'center' });
    doc.setDrawColor.apply(doc, GRIGIO2);
    doc.setLineWidth(0.2);
    doc.line(M, TOP_HEADER + 8, W - M, TOP_HEADER + 8);
  }`;

if (!src.includes(OLD_HEADER)) {
  console.log('[1/4] SKIP — drawDayHeader già modificato (o non trovato esattamente)');
} else {
  src = src.replace(OLD_HEADER, NEW_HEADER);
  console.log('[1/4] OK — drawDayHeader: rimossa riga macros, header più compatto');
}

// ============================================================
// MOD 2 — TOP_CONTENT: ora il content parte più in alto (header più piccolo)
// ============================================================
const OLD_TOP = "var TOP_CONTENT = 36;      // y di partenza dei pasti (dopo header + linea)";
const NEW_TOP = "var TOP_CONTENT = 26;      // y di partenza dei pasti (header senza macros)";
if (src.includes(OLD_TOP)) {
  src = src.replace(OLD_TOP, NEW_TOP);
  console.log('[2/4] OK — TOP_CONTENT spostato a 26mm (header più compatto)');
} else if (src.includes(NEW_TOP)) {
  console.log('[2/4] SKIP — TOP_CONTENT già aggiornato');
} else {
  console.log('[2/4] SKIP — TOP_CONTENT non trovato esattamente');
}

// ============================================================
// MOD 3 — drawPasto: aggiungi barra teal a sx del nome pasto + font label più grande
// ============================================================
const OLD_LABEL = `    // Titolo pasto: bold, dimensione 10.5, NERO (pulito, niente colore)
    setFont('bold', 10.5, NERO);
    doc.text(slotLabel[slotKey] || slotKey.toUpperCase(), M, y);
    y += 5.2;`;

const NEW_LABEL = `    // Titolo pasto: barra teal verticale + label bold 11pt nero
    doc.setFillColor.apply(doc, TEAL);
    doc.rect(M, y - 3.2, 1.1, 4.2, 'F');
    setFont('bold', 11, NERO);
    doc.text(slotLabel[slotKey] || slotKey.toUpperCase(), M + 2.6, y);
    y += 5.6;`;

if (!src.includes(OLD_LABEL)) {
  console.log('[3/4] SKIP — label pasto già modificato (o non trovato esattamente)');
} else {
  src = src.replace(OLD_LABEL, NEW_LABEL);
  console.log('[3/4] OK — barra teal verticale + label 11pt aggiunti');
}

// ============================================================
// MOD 4 — Font alimenti più grande nelle celle (10pt → 12pt principale, 9pt → 10.5pt alt)
// ============================================================
// Principale
const OLD_PRINC1 = `    setFont('bold', 10, NERO);
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
    if (gP) doc.text(gP, x + wCell, yTop + 3.6, { align: 'right' });`;

const NEW_PRINC1 = `    setFont('bold', 12, NERO);
    var nomeP = safe(princ.n || '');
    var gP = gramText(princ.g);
    var gPwidth = gP ? measure(gP, 12, 'bold') + 2 : 0;
    var nomeMaxW = wCell - gPwidth;
    var nomeLines = doc.splitTextToSize(nomeP, nomeMaxW);
    var nomeShown = nomeLines[0];
    if (nomeLines.length > 1) {
      while (nomeShown.length > 0 && measure(nomeShown + '...', 12, 'bold') > nomeMaxW) {
        nomeShown = nomeShown.slice(0, -1);
      }
      nomeShown += '...';
    }
    doc.text(nomeShown, x, yTop + 3.8);
    if (gP) doc.text(gP, x + wCell, yTop + 3.8, { align: 'right' });`;

if (!src.includes(OLD_PRINC1)) {
  console.log('[4a/4] SKIP — drawCella principale già modificato');
} else {
  src = src.replace(OLD_PRINC1, NEW_PRINC1);
  console.log('[4a/4] OK — principale: font 12pt');
}

// Alternative
const OLD_ALT1 = `      var ay = yTop + 8.4;
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
      }`;

const NEW_ALT1 = `      var ay = yTop + 9.2;
      // Sub-label "Alternative:" piccolo grigio
      setFont('italic', 8, GRIGIO3);
      doc.text('Alternative:', x, ay);
      ay += 4;

      // Lista alternative
      setFont('italic', 10.5, GRIGIO);
      for (var i = 1; i < ali.length; i++) {
        var alt = ali[i];
        var nomeA = safe(alt.n || '');
        var gA = gramText(alt.g);
        var gAwidth = gA ? measure(gA, 10.5, 'italic') + 2 : 0;
        var nomeAmaxW = wCell - gAwidth;
        var nomeAlines = doc.splitTextToSize(nomeA, nomeAmaxW);
        var nomeAshown = nomeAlines[0];
        if (nomeAlines.length > 1) {
          while (nomeAshown.length > 0 && measure(nomeAshown + '...', 10.5, 'italic') > nomeAmaxW) {
            nomeAshown = nomeAshown.slice(0, -1);
          }
          nomeAshown += '...';
        }
        doc.text(nomeAshown, x, ay);
        if (gA) doc.text(gA, x + wCell, ay, { align: 'right' });
        ay += 4.6;
      }`;

if (!src.includes(OLD_ALT1)) {
  console.log('[4b/4] SKIP — drawCella alternative già modificato');
} else {
  src = src.replace(OLD_ALT1, NEW_ALT1);
  console.log('[4b/4] OK — alternative: font 10.5pt');
}

// Aggiorno cellHeight per le nuove dimensioni
const OLD_CH = `  function cellHeight(c) {
    if (!c || !c.alimenti || !c.alimenti.length) return 0;
    var n = c.alimenti.length;
    if (n === 1) return 5.5;
    // 1 principale (5.5) + label "Alternative:" (3.8) + (n-1) alternative (4.2 cad)
    return 5.5 + 3.8 + (n - 1) * 4.2 + 1;
  }`;
const NEW_CH = `  function cellHeight(c) {
    if (!c || !c.alimenti || !c.alimenti.length) return 0;
    var n = c.alimenti.length;
    if (n === 1) return 6.2;
    // 1 principale (6.2) + label "Alternative:" (4) + (n-1) alternative (4.6 cad)
    return 6.2 + 4 + (n - 1) * 4.6 + 1;
  }`;
if (src.includes(OLD_CH)) {
  src = src.replace(OLD_CH, NEW_CH);
  console.log('[4c/4] OK — cellHeight aggiornata per nuove dimensioni');
} else {
  console.log('[4c/4] SKIP — cellHeight già aggiornata');
}

// ============================================================
// MOD 5 — Linea grigia sottile tra i pasti (nel ciclo principale)
// ============================================================
const OLD_CICLO = `    // Disegna pasti
    var y = TOP_CONTENT;
    pastiAttivi.forEach(function(p, i) {
      y = drawPasto(p.key, p.pasto, y);
      if (i < pastiAttivi.length - 1) y += gap;
    });`;

const NEW_CICLO = `    // Disegna pasti con linea separatrice grigia sottile tra di loro
    var y = TOP_CONTENT;
    pastiAttivi.forEach(function(p, i) {
      y = drawPasto(p.key, p.pasto, y);
      if (i < pastiAttivi.length - 1) {
        y += gap / 2;
        doc.setDrawColor.apply(doc, [232, 232, 232]);
        doc.setLineWidth(0.15);
        doc.line(M, y, W - M, y);
        y += gap / 2;
      }
    });`;

if (!src.includes(OLD_CICLO)) {
  console.log('[5/5] SKIP — ciclo principale già modificato');
} else {
  src = src.replace(OLD_CICLO, NEW_CICLO);
  console.log('[5/5] OK — linea separatrice tra pasti aggiunta');
}

// ============================================================
// VERIFICA SINTASSI
// ============================================================
const scriptRe = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
let m, fullJs = '';
while ((m = scriptRe.exec(src)) !== null) { fullJs += m[1] + '\n'; }
try {
  new Function(fullJs);
  console.log('\n✅ Sintassi JS valida');
} catch (e) {
  console.error('\n❌ ERRORE sintassi JS:', e.message);
  console.error('NON SCRIVO IL FILE per sicurezza.');
  process.exit(1);
}

fs.writeFileSync(path, src, 'utf8');
console.log('Lunghezza finale:', src.length, 'bytes (delta:', src.length - original.length, ')');
console.log('\nDone!');
