// ── S2 — Righe attività multiple e catalogo MET 2024 (3 ago 2026) ──
//
// Il bug che questa suite blocca per sempre: il modello dati aveva UN solo
// allenamento per paziente (una attività, N sedute, M minuti). Il paziente che fa
// 2 pesi + 2 CrossFit + 1 corsa non era rappresentabile, e qualunque singola attività
// si scegliesse l'errore arrivava a ~85 kcal/giorno — nella direzione peggiore, cioè
// più cibo di quanto avesse bruciato.
//
// Contratto fissato qui:
//  1. l'EAT è la SOMMA dei contributi delle righe, non il contributo di una sola;
//  2. le etichette storiche ("Pilates", "Circuit training") continuano a risolvere,
//     perché rinominare una voce di catalogo è una migrazione di dati, non di testo;
//  3. i valori MET sono quelli del Compendium 2024, non del 2011;
//  4. "non si allena" DICHIARATO è diverso da "non gliel'ho chiesto".
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();
const inWin = o => win.eval('(' + JSON.stringify(o) + ')');
const iso = t => { const d = new Date(t); return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0'); };
const OGGI = iso(Date.now());
// `const` a livello di script NON diventa proprietà di window (lexical global scope):
// il catalogo si legge con eval, non con win.<nome>.
const METMAP = JSON.parse(win.eval('JSON.stringify(_MET_ATTIVITA)'));
const CATALOGO = JSON.parse(win.eval('JSON.stringify(_MET_CATALOGO)'));
const ALIAS = JSON.parse(win.eval('JSON.stringify(_MET_ALIAS)'));

// Paziente dello screenshot di Fabrizio: peso 77.8, MB 1571.
function paz(extra){
  return Object.assign({
    id:'att', nome:'Mario', cognome:'Rossi', sesso:'M', altezza:178, nascita:'1988-01-10',
    inbody:[{ id:'b', data:OGGI, peso:77.8, m:55.6, pg:28.5, mb:1571 }]
  }, extra||{});
}

// EAT atteso di una riga, con la formula del motore: (MET−1) × peso × ore_effettive/giorno.
function eatRiga(met, sedute, minuti, peso){
  return Math.round((met-1) * peso * ((sedute*minuti/60)/7));
}

test('MULTI — l\'EAT è la somma delle righe, non il contributo di una sola attività', () => {
  const righe = [
    { nome:'Pesi, bodybuilding / powerlifting, sforzo vigoroso', sedute:2, minuti:45 }, // 6.0 MET
    { nome:'CrossFit / functional training (seduta intera)',     sedute:2, minuti:45 }, // 7.5 MET
    { nome:'Corsa 10 km/h',                                      sedute:1, minuti:45 }  // 9.3 MET
  ];
  const p = inWin(paz({ passiGiornalieri:4000, fontePassi:'misurati',
                        modalitaAllenamento:'precisa', attivita:righe }));
  const ct = win.calcolaTDEE(p);

  const atteso = eatRiga(6.0,2,45,77.8) + eatRiga(7.5,2,45,77.8) + eatRiga(9.3,1,45,77.8);
  assert.strictEqual(ct.eat, atteso, 'EAT = somma delle tre righe');
  assert.strictEqual(ct.righe.length, 3, 'le tre righe sono esposte una per una');
  assert.strictEqual(ct.seduteTot, 5, 'cinque sedute in tutto');
  assert.strictEqual(ct.fonteMet, 'righe-multiple');
  assert.ok(Math.abs(ct.oreEffSett - 3.75) < 0.01, 'ore effettive totali: ' + ct.oreEffSett);
});

test('MULTI — appiattire le stesse ore su una sola attività dà un numero diverso (è il bug che risolviamo)', () => {
  const ore = { sedute:5, minuti:45 };
  const multi = inWin(paz({ passiGiornalieri:4000, modalitaAllenamento:'precisa', attivita:[
    { nome:'Pesi, bodybuilding / powerlifting, sforzo vigoroso', sedute:2, minuti:45 },
    { nome:'CrossFit / functional training (seduta intera)',     sedute:2, minuti:45 },
    { nome:'Corsa 10 km/h',                                      sedute:1, minuti:45 }
  ]}));
  const soloCorsa = inWin(paz({ passiGiornalieri:4000, modalitaAllenamento:'precisa',
    attivita:[ Object.assign({ nome:'Corsa 10 km/h' }, ore) ] }));

  const a = win.calcolaTDEE(multi), b = win.calcolaTDEE(soloCorsa);
  assert.ok(Math.abs(a.oreEffSett - b.oreEffSett) < 0.01, 'stesso monte ore: il confronto è pulito');
  assert.ok(b.eat - a.eat > 60, 'la scorciatoia sovrastima di oltre 60 kcal/giorno (era: ' + (b.eat - a.eat) + ')');
});

test('MULTI — il MET esposto è la media pesata sulle ore, non la media aritmetica', () => {
  // 1 seduta a 4 MET + 1 seduta LUNGA a 10 MET: la media aritmetica direbbe 7.
  const p = inWin(paz({ passiGiornalieri:5000, modalitaAllenamento:'precisa', attivita:[
    { nome:'Pallavolo',      sedute:1, minuti:30 },  // 4.0 MET
    { nome:'Nuoto, stile libero veloce', sedute:1, minuti:90 }   // 9.8 MET
  ]}));
  const ct = win.calcolaTDEE(p);
  assert.ok(ct.metUsato > 8.0, 'la seduta lunga pesa di più: MET medio ' + ct.metUsato);
  assert.ok(ct.metUsato < 9.8, 'ma non è quello della sola seduta lunga');
});

test('MIGRAZIONE — un paziente storico coi tre campi singoli diventa una riga sola, senza perdere kcal', () => {
  const p = inWin(paz({ passiGiornalieri:4000, fontePassi:'misurati',
    seduteSettimana:4, minutiSeduta:35, attivitaSpecifica:'Circuit training' }));
  const ct = win.calcolaTDEE(p);
  assert.strictEqual(ct.modalita, 'precisa', 'la modalità si deduce dai campi compilati');
  assert.strictEqual(ct.righe.length, 1);
  assert.strictEqual(ct.righe[0].met, 7.5, 'l\'etichetta storica "Circuit training" risolve sulla voce 2024');
  assert.strictEqual(ct.eat, eatRiga(7.5, 4, 35, 77.8));
});

test('MIGRAZIONE — ogni etichetta storica risolve: nessuna riga perde il MET in silenzio', () => {
  // Se un alias saltasse, il MET diventerebbe null, la riga verrebbe scartata e l'EAT
  // crollerebbe a zero SENZA errori a video. È il modo tipico in cui una rinomina fa danno.
  const storiche = ['Corsa 8 km/h','Corsa 10 km/h','Corsa 12 km/h','Camminata veloce 6 km/h',
    'Camminata in salita','Ciclismo moderato','Ciclismo intenso (>22 km/h)','Mountain bike','Spinning',
    'Nuoto lento','Nuoto veloce (stile libero)','Body building / pesi vigorosi','Pesi leggeri / corpo libero',
    'Circuit training','HIIT / esercizi intensi','Salto con la corda','Pilates','Yoga','Stretching',
    'Calcio','Basket','Pallavolo','Beach volley','Tennis','Arti marziali','Canottaggio','Scherma','Pattinaggio'];
  storiche.forEach(function(nome){
    const voce = win._attivitaVoce(nome);
    assert.ok(voce, 'etichetta storica non risolta: ' + nome);
    assert.ok(typeof voce.m === 'number' && voce.m > 0, 'MET mancante per ' + nome);
  });
});

test('COMPENDIUM 2024 — i valori corretti in questa revisione sono davvero quelli nuovi', () => {
  // Erano fermi al Compendium 2011 nonostante il commento dicesse 2024.
  const attesi = {
    'Pilates, matwork': 1.8,
    'Yoga (hatha / generale)': 2.3,
    'Spinning / classe indoor cycling': 9.0,
    'Circuit training, sforzo vigoroso': 7.5,
    'HIIT / intervalli, sforzo moderato': 7.0,
    'HIIT / WOD vigoroso (solo tempo di lavoro)': 11.0,
    'Salto con la corda': 11.0,
    'Corsa 10 km/h': 9.3,
    'Camminata in salita (pendenza 6-10%)': 7.0
  };
  Object.keys(attesi).forEach(function(n){
    assert.strictEqual(METMAP[n], attesi[n], 'MET fuori posto per ' + n);
  });
});

test('CROSSFIT — è dichiarato stima, perché nel Compendium la voce non esiste', () => {
  const v = win._attivitaVoce('CrossFit / functional training (seduta intera)');
  assert.ok(v.s === true, 'la voce CrossFit deve essere marcata come stima');
  assert.strictEqual(v.m, 7.5, 'proxy 02040, seduta intera');
  const wod = win._attivitaVoce('HIIT / WOD vigoroso (solo tempo di lavoro)');
  assert.ok(!wod.s, 'la voce WOD invece è misurata nel Compendium');
  assert.ok(wod.m > v.m, 'il solo tempo di lavoro è più intenso della seduta intera');
});

test('NESSUNO — "non si allena" dichiarato non è un dato mancante', () => {
  const dichiarato = inWin(paz({ passiGiornalieri:4000, fontePassi:'misurati', modalitaAllenamento:'nessuno' }));
  const dedotto    = inWin(paz({ passiGiornalieri:4000, fontePassi:'misurati' }));
  const a = win.calcolaTDEE(dichiarato), b = win.calcolaTDEE(dedotto);

  assert.strictEqual(a.eat, 0, 'nessun allenamento, nessun EAT');
  assert.strictEqual(a.tdee, b.tdee, 'il TDEE non cambia: cambia solo quanto ci fidiamo');
  const motiviDedotto = b.affidabilita.motivi.join(' ');
  assert.ok(/allenamento non registrato/.test(motiviDedotto), 'il caso dedotto è penalizzato');
  const motiviDichiarato = a.affidabilita.motivi.join(' ');
  assert.ok(!/allenamento non registrato/.test(motiviDichiarato), 'il caso dichiarato no');
});

test('RIGHE — una riga senza sedute o senza minuti non entra, e non inventa un valore', () => {
  const p = inWin(paz({ passiGiornalieri:5000, modalitaAllenamento:'precisa', attivita:[
    { nome:'Corsa 10 km/h', sedute:2, minuti:40 },
    { nome:'Nuoto, stile libero veloce', sedute:null, minuti:60 },  // incompleta
    { nome:'', sedute:3, minuti:45 }                                 // senza attività
  ]}));
  const ct = win.calcolaTDEE(p);
  assert.strictEqual(ct.righe.length, 1, 'entra solo la riga completa');
  assert.strictEqual(ct.eat, eatRiga(9.3, 2, 40, 77.8));
});

test('MODALITÀ — "rapida" usa le ore anche se il paziente ha righe salvate da prima', () => {
  // Cambiare modalità deve cambiare il calcolo, non lasciarne due attivi insieme:
  // è il difetto dell'interfaccia vecchia, dove i due flussi convivevano.
  const p = inWin(paz({ passiGiornalieri:5000, modalitaAllenamento:'rapida', oreAllenamento:4,
    tipoAllenamento:'Cardio', intensitaAllenamento:'Media',
    attivita:[{ nome:'Corsa 10 km/h', sedute:5, minuti:60 }] }));
  const ct = win.calcolaTDEE(p);
  assert.strictEqual(ct.fonteOre, 'ore-settimana');
  assert.strictEqual(ct.righe.length, 0, 'le righe restano salvate ma non entrano nel calcolo');
  assert.strictEqual(ct.eat, Math.round((8.0-1) * 77.8 * (4/7)), 'MET dalla griglia Cardio/Media');
});

test('CATALOGO — nessun nome duplicato e ogni voce ha categoria, MET e codice', () => {
  const visti = {};
  CATALOGO.forEach(function(a){
    assert.ok(!visti[a.n], 'nome duplicato nel catalogo: ' + a.n);
    visti[a.n] = true;
    assert.ok(a.c && typeof a.c === 'string', 'categoria mancante: ' + a.n);
    assert.ok(typeof a.m === 'number' && a.m >= 1, 'MET non valido: ' + a.n);
    assert.ok(a.k && typeof a.k === 'string', 'codice Compendium mancante: ' + a.n);
  });
  // Ogni alias deve puntare a una voce che esiste davvero.
  Object.keys(ALIAS).forEach(function(vecchio){
    assert.ok(METMAP[ALIAS[vecchio]] != null,
      'alias rotto: ' + vecchio + ' → ' + ALIAS[vecchio]);
  });
});
