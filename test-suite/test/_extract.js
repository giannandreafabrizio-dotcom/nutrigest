// ── Helper condiviso: estrae lo script inline principale da index.html ──
// Usato da tutti i test per caricare le funzioni reali del file monolitico,
// senza duplicarne il codice nei test (fonte unica: index.html).
'use strict';
const fs = require('fs');
const path = require('path');

const INDEX_PATH = path.join(__dirname, '..', '..', 'index.html');

function extractMainScript() {
  const html = fs.readFileSync(INDEX_PATH, 'utf-8');
  // Cattura tutti i blocchi <script>...</script> che NON hanno src= (script inline)
  const re = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g;
  let match;
  let scripts = [];
  while ((match = re.exec(html)) !== null) {
    scripts.push(match[1]);
  }
  if (!scripts.length) throw new Error('Nessuno script inline trovato in index.html');
  // Il blocco applicativo principale è sempre il più lungo (il resto sono
  // eventuali micro-script di libreria/config inline, se presenti).
  scripts.sort((a, b) => b.length - a.length);
  return scripts[0];
}

module.exports = { extractMainScript, INDEX_PATH };
