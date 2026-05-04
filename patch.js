// patch.js — FIX urgente: correzione apostrofo non escapato che rompe il JS
// Eseguire con: node patch.js dalla cartella nutrigest

const fs = require('fs');
const path = 'index.html';
let src = fs.readFileSync(path, 'utf8');

const BUG = "controlla la connessione e l'URL Apps Script";
const FIX = "controlla la connessione e URL Apps Script";

if (src.includes(BUG)) {
  src = src.replace(BUG, FIX);
  fs.writeFileSync(path, src, 'utf8');
  console.log('FIX applicata — apostrofo rimosso dalla stringa');
  console.log('Lunghezza file: ' + src.length + ' bytes');
} else {
  console.log('Bug non trovato — forse già corretto o file diverso');
}
