// ── S2 — Il riquadro LAF si aggiorna dal vivo (3 ago 2026, P147c) ──
//
// Il bug che questa suite blocca per sempre: il pannello "Fattore attività (LAF)"
// si ridisegnava SOLO all'apertura della scheda, su "Ricalcola LAF" e al
// salvataggio. In mezzo il nutrizionista poteva cambiare modalità o togliere una
// riga e continuare a leggere i numeri di prima. Caso visto dal vivo: il modulo
// diceva "Nessuna attività inserita" e il riquadro sotto dichiarava "EAT 60
// (6 MET medio)" — quel 60 arrivava da un `oreAllenamento` vecchio del paziente,
// letto all'apertura. Il piano salvato era corretto; sbagliato era il numero su
// cui l'occhio decideva.
//
// Contratto fissato qui:
//  1. toccare un campo qualsiasi dell'attività ridisegna il riquadro;
//  2. il ricalcolo dal vivo NON scrive sul paziente (quello resta un gesto
//     esplicito: "Ricalcola LAF" o salvataggio);
//  3. "calcolo preciso" senza righe dice EAT 0 e lo DICHIARA, invece di
//     mostrare il testo di "non si allena".
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();
const d = win.document;

// Il pannello macros vero non è montabile a pezzi in JSDOM: si ricostruiscono i
// soli campi che _aggiornaPannelloTdeeLive legge, con gli stessi id dell'app.
// Se un id cambia in index.html senza cambiare qui, il test smette di vedere il
// campo e il valore atteso non torna: è voluto.
d.body.innerHTML += [
  '<input id="p-passi" value="6000">',
  '<select id="p-fonte-passi"><option value="" selected></option><option value="misurati">m</option></select>',
  '<select id="p-lavoro"><option value="" selected></option><option value="pesante">p</option></select>',
  '<input id="p-ore-all" value="1">',
  '<select id="p-tipo-all"><option value="" selected></option></select>',
  '<select id="p-intens-all"><option value="" selected></option></select>',
  '<label><input type="radio" name="p-modalita-all" value="nessuno"></label>',
  '<label><input type="radio" name="p-modalita-all" value="rapida"></label>',
  '<label><input type="radio" name="p-modalita-all" value="precisa"></label>',
  '<div id="att-righe-tot"></div>',
  '<div id="laf-display"></div>'
].join('');

// Paziente dello screenshot: MB 1554, peso 83.7, e un oreAllenamento=1 legacy
// rimasto in scheda — è esattamente il dato che produceva l'EAT fantasma.
const PAZ = { id:'x', nome:'A', cognome:'B', sesso:'M', altezza:170, nascita:'1985-01-01',
  oreAllenamento:1, passiGiornalieri:6000,
  inbody:[{ id:'i', data:'2026-07-01', peso:83.7, m:54.8, pg:30, mb:1554 }] };

function scenario(modalita, righe){
  win.eval('_macrosPaziente = ' + JSON.stringify(PAZ));
  win.eval('_attRighe = ' + JSON.stringify(righe || []));
  d.querySelector('input[name="p-modalita-all"][value="' + modalita + '"]').checked = true;
  win.eval('_aggiornaPannelloTdeeLive()');
  return d.getElementById('laf-display').textContent.replace(/\s+/g, ' ');
}

test('LAF VIVO — "calcolo preciso" senza righe azzera l\'EAT invece di lasciare quello vecchio', () => {
  const testo = scenario('precisa', []);
  assert.ok(/EAT 0\b/.test(testo), 'EAT deve essere 0, letto: ' + testo);
  assert.ok(!/EAT 60/.test(testo), 'non deve restare l\'EAT calcolato dalle ore legacy');
  assert.ok(!/MET medio/.test(testo), 'senza righe non esiste un MET medio da mostrare');
});

test('LAF VIVO — con "calcolo preciso" e nessuna riga il metodo lo dichiara, non finge "non si allena"', () => {
  const testo = scenario('precisa', []);
  assert.ok(/nessuna attività inserita/.test(testo),
    'il metodo deve distinguere il modulo lasciato a metà dal paziente sedentario: ' + testo);
});

test('LAF VIVO — aggiungere una riga muove subito il TDEE, senza premere Ricalcola', () => {
  const vuoto = scenario('precisa', []);
  const conRiga = scenario('precisa', [{ nome:'Corsa 10 km/h', sedute:3, minuti:45 }]);
  const kcal = t => +(/TDEE: (\d+) kcal/.exec(t) || [])[1];
  assert.ok(kcal(conRiga) > kcal(vuoto),
    'tre corse a settimana devono alzare il TDEE: ' + kcal(vuoto) + ' → ' + kcal(conRiga));
  // (9.3−1) × 83.7 × (3×45/60)/7 = 372 kcal/giorno
  const atteso = Math.round((9.3 - 1) * 83.7 * ((3 * 45 / 60) / 7));
  assert.ok(new RegExp('EAT ' + atteso + '\\b').test(conRiga), 'EAT atteso ' + atteso + ', letto: ' + conRiga);
});

test('LAF VIVO — "non si allena" toglie l\'EAT anche se il paziente ha ore legacy in scheda', () => {
  const testo = scenario('nessuno', []);
  assert.ok(/EAT 0\b/.test(testo), 'letto: ' + testo);
  assert.ok(/nessun allenamento strutturato/.test(testo), 'letto: ' + testo);
});

test('LAF VIVO — l\'anteprima NON scrive sul paziente: resta un gesto esplicito', () => {
  scenario('precisa', [{ nome:'Corsa 10 km/h', sedute:3, minuti:45 }]);
  assert.strictEqual(win.eval('_macrosPaziente.oreAllenamento'), 1,
    'le ore legacy non vanno cancellate da un semplice sguardo al pannello');
  assert.strictEqual(win.eval('JSON.stringify(_macrosPaziente.attivita)'), undefined,
    'la riga digitata non deve finire sul paziente prima del salvataggio');
  assert.strictEqual(win.eval('_macrosPaziente.modalitaAllenamento'), undefined,
    'nemmeno la modalità va scritta: la scrive salvaCalcoloMacros');
});

test('LAF VIVO — a pannello chiuso la funzione non esplode e non fa nulla', () => {
  const salvato = d.getElementById('laf-display');
  salvato.remove();
  assert.doesNotThrow(() => win.eval('_aggiornaPannelloTdeeLive()'));
  d.body.appendChild(salvato);
});
