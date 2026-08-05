// ── S2 — Lo storico TDEE fotografa anche l'attività (4 ago 2026, P147d) ──
//
// Il buco che questa suite chiude: `macrosStorico` salvava il RISULTATO (kcal,
// macro, TDEE, LAF) ma non cosa stesse facendo il paziente per meritarselo.
// Il caso reale: un paziente che per tre mesi corre 2 volte e fa pesi 2 volte,
// poi cambia in calcio 2 volte e Pilates 2 volte. Due slot, due TDEE diversi —
// e nessun modo di sapere PERCHÉ fossero diversi, che è l'unica cosa che serve
// per decidere il ciclo successivo.
//
// Contratto fissato qui:
//  1. ogni slot nuovo porta con sé passi, lavoro, modalità, righe e giorni;
//  2. il riassunto sta su UNA riga (lo storico deve restare scorribile);
//  3. gli slot vecchi, che quella foto non ce l'hanno, non se la inventano;
//  4. "Riprendi" riporta l'attività NEL MODULO senza scrivere sul paziente:
//     guardare non salva, come per il pannello dal vivo.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();
const riass = a => win.eval('_riassuntoAttivitaSlot(' + JSON.stringify(a) + ')');

test('STORICO ATT — il riassunto dice passi, attività con le sedute e giorni di carico', () => {
  const testo = riass({ passi:5000, tipoLavoro:'in-piedi', modalita:'precisa',
    righe:[ {nome:'Corsa 8 km/h', met:8.5, sedute:3, minuti:35},
            {nome:'Circuit training, sforzo vigoroso', met:7.5, sedute:1, minuti:45} ],
    giorni:['Lun','Mar','Gio','Ven'] });
  assert.ok(/5\.000 passi/.test(testo), 'passi con il separatore delle migliaia: ' + testo);
  assert.ok(/3× Corsa 8 km\/h/.test(testo), 'sedute davanti al nome: ' + testo);
  assert.ok(/1× Circuit training/.test(testo), 'seconda attività presente: ' + testo);
  assert.ok(/lavoro in piedi/.test(testo), 'il lavoro non sedentario va detto: ' + testo);
  assert.ok(/carico: Lun Mar Gio Ven/.test(testo), 'giorni ON: ' + testo);
  assert.ok(testo.indexOf('\n') === -1, 'il riassunto deve stare su una riga sola');
});

test('STORICO ATT — un lavoro sedentario non occupa spazio nel riassunto', () => {
  const testo = riass({ passi:5000, tipoLavoro:'sedentario', modalita:'nessuno', giorni:[] });
  assert.ok(!/lavoro/.test(testo), 'il caso di default non va scritto: ' + testo);
  assert.ok(/non si allena/.test(testo));
});

test('STORICO ATT — la stima rapida si riconosce dal riassunto, non si confonde con le righe', () => {
  const testo = riass({ passi:8000, modalita:'rapida', ore:4, tipo:'Cardio', intensita:'Media', giorni:[] });
  assert.ok(/4 h\/sett/.test(testo), 'ore dichiarate: ' + testo);
  assert.ok(/cardio/.test(testo) && /media/.test(testo), 'tipo e intensità: ' + testo);
  assert.ok(!/×/.test(testo), 'in stima rapida non esistono sedute per attività: ' + testo);
});

test('STORICO ATT — uno slot salvato PRIMA di questa modifica non si inventa l\'attività', () => {
  assert.strictEqual(riass(null), '', 'niente foto, niente riassunto');
  assert.strictEqual(win.eval('_riassuntoAttivitaSlot(undefined)'), '');
  // Uno slot che esiste ma senza righe né modalità non deve produrre testo fantasma.
  assert.strictEqual(riass({ passi:null, modalita:'', giorni:[] }), '');
});

test('STORICO ATT — le righe salvate conservano il MET congelato, non solo il nome', () => {
  // Serve perché una voce di catalogo può cambiare valore (è successo con la
  // pallamano): lo slot deve restare la foto di quel giorno, non seguire il
  // catalogo di oggi.
  const a = { passi:5000, modalita:'precisa',
    righe:[{nome:'Pallamano', met:12.0, sedute:2, minuti:60}], giorni:[] };
  assert.strictEqual(a.righe[0].met, 12.0, 'il MET dello slot è un dato storico, non un rimando');
  assert.ok(/2× Pallamano/.test(riass(a)));
});

// ── "Usa questo" riporta anche l'attività (P147d bis) ──
// Tornare a un percorso passato significa tornare a TUTTO quel percorso.
// Il collaudo di Fabrizio: due salvataggi sullo stesso paziente (surplus con
// HIIT+corsa, poi deficit con pesi+casa); riattivando il primo, l'attività
// mostrata restava quella del secondo. Il target tornava indietro, l'allenamento no.
const winB = loadApp();
const dB = winB.document;
dB.body.innerHTML += [
  '<input id="p-passi" value="10000">',
  '<select id="p-fonte-passi"><option value="" selected></option><option value="misurati">m</option></select>',
  '<select id="p-lavoro"><option value="" selected></option><option value="in-piedi">ip</option></select>',
  '<input id="p-ore-all" value="">',
  '<select id="p-tipo-all"><option value="" selected></option></select>',
  '<select id="p-intens-all"><option value="" selected></option></select>',
  '<label><input type="radio" name="p-modalita-all" value="nessuno"></label>',
  '<label><input type="radio" name="p-modalita-all" value="rapida"></label>',
  '<label><input type="radio" name="p-modalita-all" value="precisa"></label>',
  '<input type="checkbox" id="gall-lun"><input type="checkbox" id="gall-mar">',
  '<input type="checkbox" id="gall-mer"><input type="checkbox" id="gall-gio">',
  '<input type="checkbox" id="gall-ven"><input type="checkbox" id="gall-sab">',
  '<input type="checkbox" id="gall-dom">',
  '<div id="att-righe"></div><div id="att-righe-tot"></div><div id="laf-display"></div>'
].join('');
winB.eval('_macrosPaziente = ' + JSON.stringify({ id:'z', nome:'A', cognome:'B', sesso:'M',
  altezza:180, nascita:'1985-01-01',
  inbody:[{ id:'i', data:'2026-07-01', peso:83, m:70, pg:15, mb:1987 }] }));

test('STORICO ATT — riattivare un percorso riporta la SUA attività, non lascia quella di adesso', () => {
  // Stato "di adesso": pesi + allenamento a casa, 10.000 passi.
  winB.eval('_attRighe = ' + JSON.stringify([
    { nome:'Pesi, squat e stacchi', sedute:3, minuti:56 },
    { nome:'Allenamento a casa, generico', sedute:1, minuti:43 } ]));
  dB.querySelector('input[name="p-modalita-all"][value="precisa"]').checked = true;

  // Il percorso vecchio: HIIT + corsa in salita, 8.000 passi, giorni Lun/Mar/Gio/Ven.
  const vecchio = { passi:8000, fontePassi:'misurati', tipoLavoro:'in-piedi', modalita:'precisa',
    righe:[ {nome:'HIIT / intervalli, sforzo moderato', met:7.0, sedute:3, minuti:56},
            {nome:'Corsa in salita (5% a 9,5 km/h)', met:13.3, sedute:1, minuti:43} ],
    giorni:['Lun','Mar','Gio','Ven'] };

  const ok = winB.eval('_riportaAttivitaNelModulo(' + JSON.stringify(vecchio) + ')');
  assert.strictEqual(ok, true, 'lo slot ha la fotografia, deve riuscire');

  const righe = JSON.parse(winB.eval('JSON.stringify(_attRighe)'));
  assert.strictEqual(righe.length, 2);
  assert.strictEqual(righe[0].nome, 'HIIT / intervalli, sforzo moderato', 'la prima riga è quella del percorso vecchio');
  assert.strictEqual(righe[1].nome, 'Corsa in salita (5% a 9,5 km/h)');
  assert.ok(!righe.some(r => /Pesi|casa/.test(r.nome)), 'l\'attività di adesso non deve sopravvivere');

  assert.strictEqual(dB.getElementById('p-passi').value, '8000', 'tornano anche i passi del periodo');
  assert.strictEqual(dB.getElementById('p-lavoro').value, 'in-piedi');
  assert.ok(dB.getElementById('gall-lun').checked && dB.getElementById('gall-ven').checked, 'giorni di carico ripristinati');
  assert.ok(!dB.getElementById('gall-mer').checked, 'e quelli non spuntati restano vuoti');
});

test('STORICO ATT — riattivare uno slot vecchio non svuota il modulo di adesso', () => {
  winB.eval('_attRighe = ' + JSON.stringify([{ nome:'Corsa 10 km/h', sedute:2, minuti:40 }]));
  const ok = winB.eval('_riportaAttivitaNelModulo(undefined)');
  assert.strictEqual(ok, false, 'niente fotografia: la funzione lo dice e non tocca niente');
  const righe = JSON.parse(winB.eval('JSON.stringify(_attRighe)'));
  assert.strictEqual(righe.length, 1, 'le righe correnti restano dove sono');
  assert.strictEqual(righe[0].nome, 'Corsa 10 km/h');
});
