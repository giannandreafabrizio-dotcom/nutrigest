// ── S2 — F9: il semaforo alimenti ha UNA sola fonte ──
// Fino al 26 lug 2026 convivevano due motori: quello valido (15 condizioni,
// guidato dalle checkbox p.checkSemaforo, colori 'grigioScuro'/'celeste') e un
// REGOLE_SEMAFORO "deprecato" ma eseguibile dal pulsante 🔄 Ricalcola, guidato
// dal testo libero p.patologie e con colori suoi ('grigio_scuro_1/2',
// 'celeste_1/2').
// Il danno non era il pulsante: prompt AI, validatore del piano e avvisi
// allergeni riconoscono SOLO 'grigioScuro'. Un alimento marcato dal vecchio
// motore si vedeva grigio a schermo ed era invisibile ai controlli — non
// escluso dal generatore, non segnalato se allergene.
// Questi test fissano il risultato: una tabella sola, un vocabolario solo, e
// nessun colore che sopravviva senza essere visto da chi decide.
'use strict';
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();
const inWin = o => win.eval('(' + JSON.stringify(o) + ')');
const SORGENTE = fs.readFileSync(path.join(__dirname, '..', '..', 'index.html'), 'utf-8');

const K_NDUJA = "Insaccati & Salumi__'Nduja";
const K_PASTA = 'Cereali con Glutine__Pasta';
const K_SGOMBRO = 'Pesce (Cena)__Sgombro';

test('FONTE UNICA — la tabella vecchia e il suo motore non esistono più', () => {
  assert.strictEqual(typeof win.REGOLE_SEMAFORO, 'undefined', 'REGOLE_SEMAFORO rimossa');
  assert.strictEqual(typeof win._applicaRegoloSemaforoLEGACY, 'undefined', 'il secondo motore è rimosso');
  // e non devono tornare: nel sorgente non esiste più nessuna DEFINIZIONE
  assert.strictEqual(/const\s+REGOLE_SEMAFORO\s*=/.test(SORGENTE), false, 'nessuna ridefinizione della tabella vecchia');
  assert.strictEqual(/function\s+_applicaRegoloSemaforoLEGACY/.test(SORGENTE), false, 'nessuna ridefinizione del motore vecchio');
  assert.strictEqual(/function\s+selTuttiAl/.test(SORGENTE), false, 'e il codice morto che scriveva sui colori è sparito');
  // quella valida invece c'è
  assert.ok(win.REGOLE_SEMAFORO_ALIMENTI && Object.keys(win.REGOLE_SEMAFORO_ALIMENTI).length === 15);
});

test('FONTE UNICA — un solo vocabolario di colori automatici, dichiarato in un posto solo', () => {
  // nota: gli array vivono nel contesto JSDOM, quindi si confrontano per valore
  assert.strictEqual(Array.from(win._SEM_COLORI_LEGACY).join('|'), 'grigio_scuro_1|grigio_scuro_2|celeste_1|celeste_2');
  assert.strictEqual(Array.from(win._SEM_COLORI_AUTO).join('|'),
    'grigioScuro|celeste|grigio_scuro_1|grigio_scuro_2|celeste_1|celeste_2');
});

test('MIGRAZIONE — toglie i colori vecchi e li rifà con le condizioni spuntate', () => {
  const stato = {}; stato[K_NDUJA] = 'grigio_scuro_2'; stato[K_SGOMBRO] = 'celeste_1';
  const p = inWin({ id: 'a', alimenti: stato, checkSemaforo: { 'pat-ipert': true } });
  const tolti = win._semaforoMigraPaziente(p);
  assert.strictEqual(tolti, 2, 'due colori legacy rimossi');
  // ricalcolo col sistema valido: la nduja è sconsigliata per l'iperteso, lo sgombro consigliato
  assert.strictEqual(p.alimenti[K_NDUJA], 'grigioScuro');
  assert.strictEqual(p.alimenti[K_SGOMBRO], 'celeste');
});

test('MIGRAZIONE — senza condizioni spuntate i colori vecchi se ne vanno e basta', () => {
  const stato = {}; stato[K_NDUJA] = 'grigio_scuro_1';
  const p = inWin({ id: 'b', alimenti: stato });
  assert.strictEqual(win._semaforoMigraPaziente(p), 1);
  assert.strictEqual(p.alimenti[K_NDUJA], undefined, 'nessun colore inventato da una regola che non esiste più');
});

test('MIGRAZIONE — le scelte manuali del medico non si toccano mai', () => {
  const stato = {};
  stato[K_NDUJA] = 'si';          // "questo paziente può mangiarla": deciso a mano
  stato[K_PASTA] = 'rosso';
  stato[K_SGOMBRO] = 'celeste_2'; // automatico legacy
  const p = inWin({ id: 'c', alimenti: stato, checkSemaforo: { 'pat-ipert': true } });
  win._semaforoMigraPaziente(p);
  assert.strictEqual(p.alimenti[K_NDUJA], 'si', 'la scelta manuale resta');
  assert.strictEqual(p.alimenti[K_PASTA], 'rosso', 'anche il rosso manuale resta');
});

test('MIGRAZIONE — è idempotente: girare due volte non cambia niente', () => {
  const stato = {}; stato[K_NDUJA] = 'grigio_scuro_1';
  const p = inWin({ id: 'd', alimenti: stato, checkSemaforo: { 'pat-ipert': true } });
  win._semaforoMigraPaziente(p);
  const dopoUno = JSON.stringify(p.alimenti);
  assert.strictEqual(win._semaforoMigraPaziente(p), 0, 'la seconda passata non trova più niente da togliere');
  assert.strictEqual(JSON.stringify(p.alimenti), dopoUno);
});

test('MIGRAZIONE — la passata su tutti i pazienti conta cosa ha toccato', () => {
  const s1 = {}; s1[K_NDUJA] = 'grigio_scuro_1';
  const s2 = {}; s2[K_PASTA] = 'celeste_2'; s2[K_SGOMBRO] = 'grigio_scuro_2';
  const s3 = {}; s3[K_PASTA] = 'rosso';
  const lista = inWin([
    { id: '1', alimenti: s1, checkSemaforo: { 'pat-ipert': true } },
    { id: '2', alimenti: s2 },
    { id: '3', alimenti: s3 }
  ]);
  const r = win._semaforoMigraTutti(lista);
  assert.strictEqual(r.colori, 3);
  assert.strictEqual(r.pazienti, 2, 'il terzo paziente aveva solo colori manuali');
});

test('IL BUG VERO — dopo la migrazione le esclusioni tornano visibili ai controlli', () => {
  // _alimentiEsclusiPaziente alimenta i conflitti col template AI e riconosce
  // solo 'rosso'/'no'/'grigioScuro': era qui che i colori legacy sparivano.
  const stato = {}; stato[K_NDUJA] = 'grigio_scuro_2';
  const prima = inWin({ id: 'e', alimenti: stato, checkSemaforo: { 'pat-ipert': true } });
  assert.strictEqual(Array.from(win._alimentiEsclusiPaziente(prima)).join(','), '',
    'col colore vecchio l\'alimento era invisibile ai controlli: è il bug che F9 chiude');
  win._semaforoMigraPaziente(prima);
  const dopo = Array.from(win._alimentiEsclusiPaziente(prima));
  assert.ok(dopo.indexOf("'Nduja") >= 0, 'dopo la migrazione l\'esclusione esiste per davvero');
  // e il ricalcolo porta con sé tutte le altre esclusioni dell'iperteso, che
  // prima di F9 non erano mai state scritte su questo paziente
  assert.ok(dopo.length > 5, 'il ricalcolo col sistema valido riempie davvero la lista: ' + dopo.length + ' voci');
});

test('RICALCOLO — applicaRegoloSemaforo ripulisce anche i colori del vecchio sistema', () => {
  // prima ripuliva solo i suoi due, e i legacy restavano appiccicati per sempre
  // sugli alimenti che nessuna regola nuova tocca
  const stato = {}; stato[K_PASTA] = 'celeste_1';   // nessuna regola dell'iperteso tocca la pasta
  const p = inWin({ id: 'f', alimenti: stato, checkSemaforo: { 'pat-ipert': true } });
  win.applicaRegoloSemaforo(p);
  assert.strictEqual(p.alimenti[K_PASTA], undefined, 'nessun residuo legacy');
});

test('CONDIZIONI ATTIVE — il riquadro elenca ciò che è spuntato, non ciò che deduce un testo libero', () => {
  const p = inWin({ id: 'g', checkSemaforo: { 'pat-ipert': true, 'all-nichel': true }, patologie: 'menopausa e gonfiore' });
  assert.strictEqual(Array.from(win._semaforoCondizioniAttive(p)).join(' · '), 'Ipertensione · Nichel');
  const vuoto = inWin({ id: 'h', patologie: 'colesterolo alto' });
  assert.strictEqual(Array.from(win._semaforoCondizioniAttive(vuoto)).length, 0,
    'il testo libero non accende più niente da solo');
});

test('RICALCOLA — il pulsante passa dal sistema valido, non da quello vecchio', () => {
  assert.strictEqual(typeof win.resetSemaforoAuto, 'function');
  const src = win.resetSemaforoAuto.toString();
  assert.ok(/applicaRegoloSemaforo/.test(src), 'chiama il motore valido');
  assert.ok(/_SEM_COLORI_AUTO/.test(src), 'e usa il vocabolario unico per la pulizia');
  assert.strictEqual(/LEGACY/.test(src), false);
});

test('CACHE — cambiare i colori del semaforo fa rigenerare il piano', () => {
  // _pianoCacheKey leggeva p.alimentiVerdi/Rossi/Esclusi: tre campi che nessuna
  // riga scrive mai, quindi il semaforo non entrava nella chiave e la cache
  // restituiva il piano vecchio.
  const base = { id: 'k1', regime: 'Ipocalorico moderato', alimenti: {} };
  const conRosso = { id: 'k1', regime: 'Ipocalorico moderato', alimenti: {} };
  conRosso.alimenti[K_PASTA] = 'rosso';
  // `db` è una variabile di script, non una proprietà di window: si assegna eseguendo dentro
  win.eval('db = ' + JSON.stringify({ pazienti: [base] }));
  const chiaveSenza = win._pianoCacheKey('k1');
  win.eval('db = ' + JSON.stringify({ pazienti: [conRosso] }));
  const chiaveCon = win._pianoCacheKey('k1');
  assert.ok(chiaveSenza && chiaveCon);
  assert.notStrictEqual(chiaveSenza, chiaveCon, 'due semafori diversi = due chiavi diverse');
  // e la vecchia lettura fantasma non deve tornare
  // (la regex cerca l'USO, non la parola: il commento che spiega il bug li nomina)
  assert.strictEqual(/\(p\.alimenti(Verdi|Rossi|Esclusi)\s*\|\|/.test(SORGENTE), false,
    'nessuna lettura dei tre campi inesistenti');
});
