#!/usr/bin/env node
// ── rigenera-index.js — riallinea i numeri di riga di INDEX.md (26 lug 2026) ──
// PERCHÉ ESISTE: INDEX.md ha 800+ voci e ogni riga aggiunta a index.html sposta
// tutte quelle sotto. Il 26/7 un controllo automatico ha trovato 719 voci su 730
// col numero sbagliato (scarto ~1800 righe) — ed erano GIÀ 657 su 687 prima
// della sessione, nonostante l'intestazione dichiarasse un riallineo completo.
// Un indice sbagliato è peggio di nessun indice: manda le sessioni future a
// leggere il punto sbagliato del file.
// USO:  cd test-suite && node rigenera-index.js
// Il test s1-doc-allineata.test.js FALLISCE finché questo script non gira:
// è il meccanismo che tiene la documentazione allineata a ogni modifica.
'use strict';
const fs = require('fs');
const path = require('path');

const HTML = path.join(__dirname, '..', 'index.html');
const INDEX = path.join(__dirname, '..', 'INDEX.md');

// 1. posizione reale di ogni funzione/const dichiarata a inizio riga
const html = fs.readFileSync(HTML, 'utf8');
const righeHtml = html.split(/\r?\n/);
const reale = {};
righeHtml.forEach(function(l, i){
  const m = l.match(/^(?:async )?function (\w+)\s*\(/) || l.match(/^(?:const|let|var) (\w+)\s*=/);
  if (m && !(m[1] in reale)) reale[m[1]] = i + 1;
});

// 2. riscrivi le voci `- \`N\` — nome` e i range "Righe A-B" di ogni sezione
const idx = fs.readFileSync(INDEX, 'utf8');
const out = [];
let corrette = 0, esatte = 0, nonTrovate = 0;
let pendingHdr = null, sezione = [];

function chiudiSezione(){
  if (pendingHdr !== null && sezione.length){
    out[pendingHdr] = 'Righe ' + Math.min.apply(null, sezione) + '-' + Math.max.apply(null, sezione);
  }
  pendingHdr = null; sezione = [];
}

idx.split(/\r?\n/).forEach(function(riga){
  if (riga.startsWith('### ')) { chiudiSezione(); out.push(riga); return; }
  if (/^Righe \d+-\d+$/.test(riga)) { out.push(riga); pendingHdr = out.length - 1; return; }
  const m = riga.match(/^- `(\d+)` — (\w+)(.*)$/);
  if (m){
    const vecchio = +m[1], nome = m[2], resto = m[3];
    if (nome in reale){
      const nuovo = reale[nome];
      sezione.push(nuovo);
      if (nuovo !== vecchio) corrette++; else esatte++;
      out.push('- `' + nuovo + '` — ' + nome + resto);
      return;
    }
    nonTrovate++;
  }
  out.push(riga);
});
chiudiSezione();

fs.writeFileSync(INDEX, out.join('\n'));
console.log('INDEX.md rigenerato:');
console.log('  voci corrette:      ' + corrette);
console.log('  già esatte:         ' + esatte);
console.log('  non verificabili:   ' + nonTrovate + ' (funzioni annidate: numeri lasciati come sono)');
console.log('  righe index.html:   ' + righeHtml.length);
