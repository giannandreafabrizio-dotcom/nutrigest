// ── S2 — Routine: pasto automatico giorno per giorno (P148, tappa 4) ─────
//
// La richiesta che ha generato tutta P148, nelle parole di Fabrizio (5 ago
// 2026): "se un paziente assume vit d tutti i giorni nutrigest lo deve
// consigliare nel pasto della giornata con più grassi… che può essere
// variabile durante la settimana in base al piano alimentare".
//
// TRE PROPRIETÀ CHE QUESTI TEST DIFENDONO, e che non si vedono leggendo il
// codice:
//
// 1. SI SALVA LA REGOLA, NON IL RISULTATO. `pastoRif:'auto'` non è un pasto:
//    è "il pasto più grasso di QUEL giorno", ricalcolato ogni volta sul piano
//    reale. Congelare il pasto calcolato dentro la voce sarebbe più semplice
//    e sbagliato: al primo piano nuovo la voce indicherebbe il pasto di un
//    piano che non esiste più, senza un errore a video (F4, regola 12).
//    Il test `cambiare piano cambia il risultato` è quello che lo prova.
//
// 2. LA SCELTA MANUALE NON VIENE MAI SOVRASCRITTA. È il punto 6 del disegno
//    ("ogni nutrizionista sceglie se applicarli o cambiarli"): se pastoRif è
//    un pasto vero, il calcolo non entra nemmeno in funzione.
//
// 3. IL PESO NON SI CONGELA. La dose dei BCAA è 1 g ogni 10 kg: si legge
//    dall'InBody più recente al momento della visualizzazione. Copiarla nella
//    voce di routine mostrerebbe, tre mesi dopo, una dose giusta per un peso
//    che non esiste più — stessa famiglia della regola 12.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp, puro } = require('./_loadApp');

const win = loadApp();

// Lunedì: pranzo grasso (mozzarella), cena magra ma ricca di carboidrati.
// Martedì: il contrario — è il caso "cambia di giorno in giorno".
function pianoDueGiorni() {
  return [
    { giorno: 'Lunedì', pasti: {
      pranzo: { celle: [{ alimenti: [{ n: 'Mozzarella', g: 125 }] }] },
      cena:   { celle: [{ alimenti: [{ n: 'Petto di pollo', g: 150 }] },
                        { alimenti: [{ n: 'Riso', g: 100 }] }] }
    }},
    { giorno: 'Martedì', pasti: {
      pranzo: { celle: [{ alimenti: [{ n: 'Insalata', g: 200 }] }] },
      cena:   { celle: [{ alimenti: [{ n: 'Salmone', g: 150 }] }] }
    }}
  ];
}

function voceLib(chiave, extra) {
  const v = win.eval('LIBRERIA_ROUTINE').find(x => x.chiave === chiave);
  assert.ok(v, 'voce di libreria non trovata: ' + chiave);
  return Object.assign({}, puro(v), extra || {});
}

// ── Il caso di Fabrizio ──────────────────────────────────────────────────

test('AUTO — la vitamina D va nel pasto più grasso, e cambia da un giorno all\'altro', () => {
  const v = voceLib('vitd', { pastoRif: 'auto' });
  const ass = win.routineAssegnazionePerGiorni(v, pianoDueGiorni());
  assert.deepStrictEqual(puro(ass), [
    { giorno: 'Lunedì', slot: 'pranzo' },
    { giorno: 'Martedì', slot: 'cena' }
  ], 'è esattamente l\'esempio che Fabrizio ha descritto');
});

test('AUTO — la creatina segue i carboidrati, non i grassi: pasto diverso lo stesso giorno', () => {
  const piano = pianoDueGiorni();
  const vitd = win.routineSlotDelGiorno(voceLib('vitd', { pastoRif: 'auto' }), piano, 0);
  const creat = win.routineSlotDelGiorno(voceLib('creat', { pastoRif: 'auto' }), piano, 0);
  assert.strictEqual(vitd, 'pranzo');
  assert.strictEqual(creat, 'cena');
  assert.notStrictEqual(vitd, creat,
    'le due regole devono poter portare a pasti diversi nello stesso giorno');
});

test('AUTO — solo le voci a cui il catalogo dà una regola possono stare in automatico', () => {
  ['omega3', 'vitd', 'k2', 'coq10', 'creat'].forEach(k =>
    assert.strictEqual(win.routineAmmetteAuto(voceLib(k)), true, k));
  ['ferro', 'melat', 'zinco', 'prob'].forEach(k =>
    assert.strictEqual(win.routineAmmetteAuto(voceLib(k)), false, k));
});

test('AUTO — aggiungendo dalla libreria, i liposolubili partono già in automatico', () => {
  const lib = win.eval('LIBRERIA_ROUTINE');
  const idx = lib.findIndex(v => v.chiave === 'omega3');
  // NOTA REALM: `db` e `currentPazId` sono dichiarati con let/var a livello top
  // dello script e NON sono proprietà di window in JSDOM — vanno assegnati
  // dentro un eval, non come win.window.db (vedi `puro` in _loadApp.js).
  win.eval('db = {pazienti:[{id:"p1", nome:"Test", routineGiornaliera:[]}], piani:[]}; currentPazId="p1";');
  win.document.body.innerHTML = '<div id="pd-routine"></div>';
  win.aggiungiDaLibreriaIdx(idx);
  const rt = puro(win.eval('db.pazienti[0].routineGiornaliera'));
  assert.strictEqual(rt.length, 1);
  assert.strictEqual(rt[0].pastoRif, 'auto',
    'indovinare un pasto fisso dal testo, quando esiste una regola, è la risposta peggiore');
});

// ── La regola, non il risultato ──────────────────────────────────────────

test('REGOLA NON RISULTATO — cambiando piano cambia il pasto, senza toccare la voce', () => {
  const v = voceLib('vitd', { pastoRif: 'auto' });
  const primo = win.routineSlotDelGiorno(v, pianoDueGiorni(), 0);
  // stesso giorno, piano diverso: ora il pasto grasso è la cena
  const altroPiano = [{ giorno: 'Lunedì', pasti: {
    pranzo: { celle: [{ alimenti: [{ n: 'Insalata', g: 200 }] }] },
    cena:   { celle: [{ alimenti: [{ n: 'Mozzarella', g: 125 }] }] }
  }}];
  const secondo = win.routineSlotDelGiorno(v, altroPiano, 0);
  assert.strictEqual(primo, 'pranzo');
  assert.strictEqual(secondo, 'cena');
  assert.strictEqual(v.pastoRif, 'auto',
    'la voce non è stata modificata: è il calcolo a essere rifatto, non il dato a essere riscritto');
});

test('MANUALE VINCE — un pasto scelto a mano non viene mai sovrascritto dal calcolo', () => {
  const piano = pianoDueGiorni();
  const v = voceLib('vitd', { pastoRif: 'colazione' });
  assert.strictEqual(win.routineSlotDelGiorno(v, piano, 0), 'colazione');
  assert.strictEqual(win.routineSlotDelGiorno(v, piano, 1), 'colazione',
    'vale su tutti i giorni: la decisione del nutrizionista è definitiva');
});

test('MANUALE VINCE — anche se il pasto scelto non è quello che il calcolo suggerirebbe', () => {
  const piano = pianoDueGiorni();
  const auto = win.routineSlotDelGiorno(voceLib('vitd', { pastoRif: 'auto' }), piano, 0);
  const manuale = win.routineSlotDelGiorno(voceLib('vitd', { pastoRif: 'pre_nanna' }), piano, 0);
  assert.notStrictEqual(auto, manuale);
  assert.strictEqual(manuale, 'pre_nanna');
});

// ── Risoluzione per nome del giorno (quella usata dal PDF) ───────────────

test('PDF — la risoluzione per nome del giorno dà lo stesso risultato di quella per indice', () => {
  const piano = pianoDueGiorni();
  const v = voceLib('vitd', { pastoRif: 'auto' });
  assert.strictEqual(win.routineSlotPerGiornoNome(v, piano, 'Lunedì'),
                     win.routineSlotDelGiorno(v, piano, 0));
  assert.strictEqual(win.routineSlotPerGiornoNome(v, piano, 'Martedì'),
                     win.routineSlotDelGiorno(v, piano, 1));
});

test('PDF — il nome del giorno si riconosce a prescindere da maiuscole e spazi', () => {
  const piano = pianoDueGiorni();
  const v = voceLib('vitd', { pastoRif: 'auto' });
  assert.strictEqual(win.routineSlotPerGiornoNome(v, piano, '  lunedì '), 'pranzo');
});

// ── Il silenzio (regola 19) ──────────────────────────────────────────────

test('SILENZIO — senza piano la voce automatica non finisce in un pasto a caso', () => {
  const v = voceLib('vitd', { pastoRif: 'auto' });
  assert.strictEqual(win.routineSlotDelGiorno(v, null, 0), '');
  assert.strictEqual(win.routineSlotDelGiorno(v, [], 0), '');
  assert.strictEqual(win.routineSlotPerGiornoNome(v, null, 'Lunedì'), '');
  assert.deepStrictEqual(puro(win.routineAssegnazionePerGiorni(v, null)), []);
});

test('SILENZIO — un giorno che nel piano non esiste non produce un pasto', () => {
  const v = voceLib('vitd', { pastoRif: 'auto' });
  assert.strictEqual(win.routineSlotPerGiornoNome(v, pianoDueGiorni(), 'Domenica'), '');
});

test('SILENZIO — una voce senza regola messa in automatico non inventa un pasto', () => {
  const v = voceLib('melat', { pastoRif: 'auto' });
  assert.strictEqual(win.routineSlotDelGiorno(v, pianoDueGiorni(), 0), '',
    'melatonina non ha una regola sui macros: meglio nessun pasto che uno inventato');
});

test('SILENZIO — giorni non calcolabili restano senza pasto, gli altri no', () => {
  const piano = pianoDueGiorni();
  piano.push({ giorno: 'Mercoledì', pasti: {} });
  const ass = win.routineAssegnazionePerGiorni(voceLib('vitd', { pastoRif: 'auto' }), piano);
  assert.strictEqual(ass.length, 3);
  assert.strictEqual(ass[2].slot, '', 'il giorno vuoto non deve ereditare il pasto di un altro giorno');
  assert.strictEqual(ass[0].slot, 'pranzo', 'e non deve invalidare i giorni calcolabili');
});

test('SILENZIO — voce nulla o malformata: nessuna eccezione', () => {
  assert.strictEqual(win.routineSlotDelGiorno(null, pianoDueGiorni(), 0), '');
  assert.strictEqual(win.routineSlotDelGiorno({}, pianoDueGiorni(), 0), '');
  assert.strictEqual(win.routineAmmetteAuto(null), false);
});

// ── La dose che dipende dal peso ─────────────────────────────────────────

test('DOSE PER PESO — i BCAA si calcolano sull\'InBody più recente', () => {
  const d = win.doseIntegratoreRisolta(voceLib('bcaa'), { inbody: [{ peso: 60 }, { peso: 70 }] });
  assert.ok(/7 g/.test(d), 'con 70 kg devono essere 7 g: ' + d);
  assert.ok(/70 kg/.test(d), 'e il peso usato va dichiarato, per poterlo verificare');
});

test('DOSE PER PESO — usa l\'ULTIMO referto, non il primo (regola 10)', () => {
  const d = win.doseIntegratoreRisolta(voceLib('bcaa'), { inbody: [{ peso: 100 }, { peso: 50 }] });
  assert.ok(/5 g/.test(d), 'l\'ultimo elemento di p.inbody è la misurazione attuale: ' + d);
});

test('DOSE PER PESO — senza referto NON inventa un numero, mostra la regola', () => {
  const d = win.doseIntegratoreRisolta(voceLib('bcaa'), {});
  assert.ok(/10 kg/.test(d));
  assert.ok(!/→/.test(d), 'un peso plausibile inventato è peggio di un peso mancante (regola 11): ' + d);
});

test('DOSE PER PESO — le voci a dose fissa restano invariate', () => {
  const d = win.doseIntegratoreRisolta(voceLib('omega3'), { inbody: [{ peso: 70 }] });
  assert.strictEqual(d, voceLib('omega3').dose);
});

test('DOSE PER PESO — il peso non viene mai copiato dentro la voce di routine', () => {
  const v = voceLib('bcaa');
  win.doseIntegratoreRisolta(v, { inbody: [{ peso: 70 }] });
  const testo = JSON.stringify(v);
  assert.ok(!/70/.test(testo),
    'un peso congelato qui dentro mostrerebbe fra tre mesi una dose giusta per un peso che non esiste più');
});

// ── Il ponte Clinica → Routine ───────────────────────────────────────────

test('PONTE — gli integratori spuntati in Clinica e non in routine vengono suggeriti', () => {
  const sugg = win.integratoriDaSuggerireInRoutine({
    integratori: ['Omega-3'], integraWant: ['Creatina'], routineGiornaliera: []
  });
  assert.deepStrictEqual(puro(sugg).map(v => v.chiave).sort(), ['creat', 'omega3'],
    'è il problema da cui è nata P148: spunto Omega-3 in Clinica e nella Routine non trovo niente');
});

test('PONTE — quello che è già in routine non viene risuggerito', () => {
  const sugg = win.integratoriDaSuggerireInRoutine({
    integratori: ['Omega-3', 'Creatina'],
    integraWant: [],
    routineGiornaliera: [{ chiave: 'omega3', nome: 'Omega-3 (EPA/DHA)' }]
  });
  assert.deepStrictEqual(puro(sugg).map(v => v.chiave), ['creat']);
});

test('PONTE — riconosce le voci di routine anche senza chiave, dal solo nome storico', () => {
  const sugg = win.integratoriDaSuggerireInRoutine({
    integratori: ['Ferro'], integraWant: [],
    routineGiornaliera: [{ nome: 'Ferro (bisgliccinato)' }]   // refuso storico, senza chiave
  });
  assert.deepStrictEqual(puro(sugg), [],
    'le voci salvate prima del catalogo non hanno `chiave`: vanno risolte dal nome');
});

test('PONTE — è un suggerimento, non un\'aggiunta: la routine non viene toccata', () => {
  const p = { integratori: ['Omega-3'], integraWant: [], routineGiornaliera: [] };
  win.integratoriDaSuggerireInRoutine(p);
  assert.strictEqual(p.routineGiornaliera.length, 0,
    '"prende già" è un fatto di anamnesi, la voce in Routine è una prescrizione: non sono la stessa cosa');
});

test('PONTE — le voci ritirate dal catalogo non vengono mai suggerite', () => {
  const sugg = win.integratoriDaSuggerireInRoutine({
    integratori: ['Blu di metilene'], integraWant: [], routineGiornaliera: []
  });
  assert.deepStrictEqual(puro(sugg), [],
    'conservato sul paziente sì, riproposto come prescrizione no');
});

test('SILENZIO — paziente senza integratori in Clinica: nessun suggerimento', () => {
  assert.deepStrictEqual(puro(win.integratoriDaSuggerireInRoutine({})), []);
  assert.deepStrictEqual(puro(win.integratoriDaSuggerireInRoutine(null)), []);
  assert.deepStrictEqual(puro(win.integratoriDaSuggerireInRoutine(
    { integratori: [], integraWant: [], routineGiornaliera: [] })), []);
});
