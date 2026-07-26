// ── S2 — Scoperta tecnica #5: i nomi delle regole cliniche devono esistere nel DB ──
// Il meccanismo del semaforo automatico è: per ogni condizione (diabete, nichel,
// glutine…) una lista di NOMI di alimenti da sconsigliare (grigi) o consigliare
// (celesti). applicaRegoloSemaforo cerca ogni nome con trovaChiaveAlimento e —
// questo è il punto — se non lo trova **non fa niente e non dice niente**: la
// casella resta bianca, identica a un alimento valutato e approvato.
// Il 26 lug 2026 erano 32 i nomi in quello stato: 'Nduja sconsigliata in SEI
// condizioni e mai colorata, "Maiale arista" (parole invertite) in quattro,
// "Dado da brodo" per il celiaco, "Mozzarella Protinella" per l'intollerante al
// lattosio. Nessun errore a video, per mesi.
// Questo test rende impossibile che succeda di nuovo: se qualcuno scrive un nome
// che il database non contiene, la suite diventa rossa prima del commit.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();
const REGOLE = win.REGOLE_SEMAFORO_ALIMENTI;
const ALIMENTI = win.ALIMENTI;

const nomiDB = new Set();
Object.keys(ALIMENTI || {}).forEach(cat => (ALIMENTI[cat].items || []).forEach(i => nomiDB.add(String(i.n).toLowerCase())));

const LISTE = ['grigi', 'celesti'];

test('REGOLE — il letterale è raggiungibile e non è vuoto', () => {
  assert.ok(REGOLE && typeof REGOLE === 'object', 'REGOLE_SEMAFORO_ALIMENTI esposto su window');
  assert.ok(Object.keys(REGOLE).length >= 15, 'le 15 condizioni cliniche ci sono tutte');
  assert.ok(nomiDB.size > 250, 'il DB alimenti è caricato (' + nomiDB.size + ' voci)');
});

test('REGOLE — ogni nome citato esiste nel database alimenti (altrimenti la regola è muta)', () => {
  const orfani = [];
  Object.entries(REGOLE).forEach(([id, reg]) => {
    LISTE.forEach(k => (reg[k] || []).forEach(nome => {
      if (!nomiDB.has(String(nome).toLowerCase())) orfani.push(id + ' · ' + k + ' · "' + nome + '"');
    }));
  });
  assert.strictEqual(orfani.length, 0,
    orfani.length + ' nome/i che il DB non contiene — la regola verrebbe ignorata IN SILENZIO:\n  ' + orfani.join('\n  '));
});

test('REGOLE — trovaChiaveAlimento li risolve davvero tutti (stesso percorso del codice vero)', () => {
  // il test sopra confronta le stringhe; questo passa dalla funzione che usa l'app,
  // così copre anche eventuali differenze fra il confronto del test e quello reale.
  const falliti = [];
  Object.entries(REGOLE).forEach(([id, reg]) => {
    LISTE.forEach(k => (reg[k] || []).forEach(nome => {
      if (!win.trovaChiaveAlimento(nome)) falliti.push(id + ' · ' + k + ' · "' + nome + '"');
    }));
  });
  assert.strictEqual(falliti.length, 0, 'trovaChiaveAlimento restituisce null per:\n  ' + falliti.join('\n  '));
});

test('REGOLE — nessun nome ripetuto nella stessa lista', () => {
  const dup = [];
  Object.entries(REGOLE).forEach(([id, reg]) => {
    LISTE.forEach(k => {
      const visti = new Set();
      (reg[k] || []).forEach(nome => {
        const n = String(nome).toLowerCase();
        if (visti.has(n)) dup.push(id + ' · ' + k + ' · "' + nome + '"');
        visti.add(n);
      });
    });
  });
  assert.strictEqual(dup.length, 0, 'doppioni:\n  ' + dup.join('\n  '));
});

test('REGOLE — nessun alimento sconsigliato E consigliato nella stessa condizione', () => {
  const conflitti = [];
  Object.entries(REGOLE).forEach(([id, reg]) => {
    const grigi = new Set((reg.grigi || []).map(x => String(x).toLowerCase()));
    (reg.celesti || []).forEach(nome => {
      if (grigi.has(String(nome).toLowerCase())) conflitti.push(id + ' · "' + nome + '"');
    });
  });
  assert.strictEqual(conflitti.length, 0, 'grigio e celeste insieme:\n  ' + conflitti.join('\n  '));
});

// ── I casi concreti corretti il 26 lug 2026: che restino corretti ──

test('REGOLE — la nduja è sconsigliata dove deve esserlo, e adesso il DB la conosce', () => {
  assert.ok(nomiDB.has("'nduja"), "'Nduja è nel database alimenti");
  ['pat-diabete', 'pat-lipidi', 'pat-ipert', 'pat-reflusso', 'pat-irc', 'csp-gravidanza'].forEach(id => {
    const g = (REGOLE[id].grigi || []).map(x => x.toLowerCase());
    assert.ok(g.includes("'nduja"), id + ' sconsiglia la nduja');
  });
});

test('REGOLE — "Maiale arista" era invertito: ora è "Arista di maiale" e il DB lo trova', () => {
  const tocc = [];
  Object.entries(REGOLE).forEach(([id, reg]) => LISTE.forEach(k => {
    if ((reg[k] || []).some(x => x.toLowerCase() === 'arista di maiale')) tocc.push(id + '/' + k);
  }));
  assert.ok(tocc.length >= 4, 'compare in almeno quattro liste (era ' + tocc.join(', ') + ')');
  assert.ok(win.trovaChiaveAlimento('Arista di maiale'), 'e il DB lo risolve');
  const restaVecchio = JSON.stringify(REGOLE).includes('Maiale arista');
  assert.strictEqual(restaVecchio, false, 'la vecchia forma non è rimasta da nessuna parte');
});

test('REGOLE — glutine e lattosio: le due voci che non funzionavano ora colorano', () => {
  assert.ok((REGOLE['all-glutine'].grigi || []).includes('Dado da brodo'), 'dado da brodo fra i grigi del glutine');
  assert.ok(win.trovaChiaveAlimento('Dado da brodo'), 'e il DB lo conosce');
  const latt = (REGOLE['all-lattosio'].grigi || []).map(x => x.toLowerCase());
  assert.ok(latt.includes('mozzarella di vacca'), 'la mozzarella è fra i grigi del lattosio');
  assert.strictEqual(JSON.stringify(REGOLE).includes('Mozzarella Protinella'), false, 'il nome inesistente è sparito');
});

test('REGOLE — nichel: avena e cioccolato risolti, senape spostata fra gli sconsigliati', () => {
  const g = (REGOLE['all-nichel'].grigi || []).map(x => x.toLowerCase());
  const c = (REGOLE['all-nichel'].celesti || []).map(x => x.toLowerCase());
  assert.ok(g.includes("fiocchi d'avena"), "l'avena è nel DB come Fiocchi d'avena");
  assert.ok(g.includes('cioccolato fondente 85%'), 'il cioccolato è quello che il DB contiene');
  assert.ok(g.includes('senape'), 'la senape è fra gli sconsigliati (decisione clinica 26/7)');
  assert.ok(!c.includes('senape'), 'e non è più fra i consigliati');
});

test('REGOLE — il vitellone da tabella è diventato i tagli veri del ricettario', () => {
  assert.strictEqual(JSON.stringify(REGOLE).includes('Vitellone'), false, 'nessun "Vitellone" residuo');
  const gDiab = (REGOLE['pat-diabete'].grigi || []).map(x => x.toLowerCase());
  assert.ok(gDiab.includes('macinato di manzo') && gDiab.includes('hamburger di manzo'), 'i tagli grassi sono sconsigliati');
  const cNichel = (REGOLE['all-nichel'].celesti || []).map(x => x.toLowerCase());
  assert.ok(cNichel.includes('fettina di vitello') && cNichel.includes('tagliata di manzo'), 'i tagli magri sono consigliati');
});

test('REGOLE — prova end-to-end: un iperteso vede grigio ciò che la regola dice', () => {
  const p = win.eval('(' + JSON.stringify({
    id: 'x', alimenti: {}, checkSemaforo: { 'pat-ipert': true }
  }) + ')');
  win.applicaRegoloSemaforo(p);
  const chiaveNduja = win.trovaChiaveAlimento("'Nduja");
  const chiaveDado = win.trovaChiaveAlimento('Dado da brodo');
  assert.strictEqual(p.alimenti[chiaveNduja], 'grigioScuro', 'la nduja si colora davvero');
  assert.strictEqual(p.alimenti[chiaveDado], 'grigioScuro', 'e il dado da brodo pure');
  // e un alimento consigliato prende il celeste
  const chiaveSgombro = win.trovaChiaveAlimento('Sgombro');
  assert.strictEqual(p.alimenti[chiaveSgombro], 'celeste', 'lo sgombro resta consigliato');
});

test('REGOLE — le scelte manuali del medico non vengono sovrascritte dalle regole', () => {
  const chiaveNduja = win.trovaChiaveAlimento("'Nduja");
  const stato = {}; stato[chiaveNduja] = 'si';   // "questo paziente può mangiarla": deciso a mano
  const p = win.eval('(' + JSON.stringify({ id: 'y', alimenti: stato, checkSemaforo: { 'pat-ipert': true } }) + ')');
  win.applicaRegoloSemaforo(p);
  assert.strictEqual(p.alimenti[chiaveNduja], 'si', 'la scelta manuale vince sulla regola automatica');
});
