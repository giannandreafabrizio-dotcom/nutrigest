// ── S2 — Ricerca fra i parametri + LDL stimato con Friedewald (P125) ──
// Due aggiunte alla scheda Analisi del sangue, 26 lug 2026.
//
// Sulla ricerca il punto delicato è UNO: la corrispondenza per parole-prefisso.
// Con una ricerca per sottostringa "vit d" NON trova "Vitamina D", perché la
// sequenza "vit d" dentro "vitamina d" non esiste. È il tipo di dettaglio che
// sembra funzionare finché non lo si prova sul caso vero.
//
// Sull'LDL il punto delicato è il CAMPO DI VALIDITÀ: sopra 400 di trigliceridi
// Friedewald non è impreciso, è inapplicabile — e un numero inapplicabile è
// peggio di un numero mancante, perché sembra un risultato.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();

// ═══════════════════════════════ RICERCA ═══════════════════════════════
const norm = (s) => win.eval('_anNorm')(s);
const match = (testo, q) => win.eval('_anCorrisponde')(testo, norm(q).split(' ').filter(Boolean));

test('P125 — "vit d" trova "Vitamina D (25-OH)" (la ricerca per sottostringa fallirebbe)', () => {
  assert.strictEqual('vitamina d 25 oh'.indexOf('vit d'), -1,
    'premessa del test: come sottostringa non c\'è, ed è il motivo della ricerca per parole');
  assert.strictEqual(match('Vitamina D (25-OH)', 'vit d'), true);
});

test('P125 — le ricerche che farà davvero', () => {
  [
    ['Ferritina', 'ferrit'],
    ['TSH', 'tsh'],
    ['Vitamina B12', 'b12'],
    ['Globuli bianchi (WBC)', 'glob bianc'],
    ['Globuli bianchi (WBC)', 'wbc'],
    ['Colesterolo totale', 'col tot'],
    ['γ-GT', 'gt'],
    ['Emoglobina', 'EMOGLOB'],
    ['Anti-transglutaminasi IgA (tTG)', 'ttg'],
    ['e-GFR (MDRD)', 'gfr']
  ].forEach(function ([voce, q]) {
    assert.strictEqual(match(voce, q), true, '"' + q + '" doveva trovare "' + voce + '"');
  });
});

test('P125 — non trova quello che non c\'entra', () => {
  assert.strictEqual(match('Ferritina', 'ferro'), false, '"ferro" non è prefisso di "ferritina"');
  assert.strictEqual(match('Vitamina D (25-OH)', 'vit b'), false);
  assert.strictEqual(match('Sodio', 'potassio'), false);
});

test('P125 — tutte le parole scritte devono corrispondere, non una qualsiasi', () => {
  assert.strictEqual(match('Vitamina D (25-OH)', 'vitamina zzz'), false,
    'con una sola parola su due la ricerca diventerebbe inutile');
});

test('P125 — accenti e maiuscole non contano', () => {
  assert.strictEqual(norm('Funzionalità tiroidea'), 'funzionalita tiroidea');
  assert.strictEqual(match('Funzionalità tiroidea', 'tiroid'), true);
  assert.strictEqual(match('Densità urine (peso specifico)', 'densita'), true);
});

test('P125 — ogni voce di ANALISI è raggiungibile scrivendo la sua prima parola', () => {
  const tutte = Object.values(win.eval('ANALISI')).flat();
  const irraggiungibili = tutte.filter(function (v) {
    const prima = norm(v).split(' ')[0];
    return !prima || !match(v, prima);
  });
  assert.deepStrictEqual(irraggiungibili, [], 'voci non trovabili: ' + irraggiungibili.join(' | '));
});

// ═══════════════════════════════ LDL ═══════════════════════════════
function paz(analisi, sesso) {
  const as = {};
  Object.keys(analisi).forEach(function (k) { as[win.eval('ANALISI_KEY')(k) + '_val'] = String(analisi[k]); });
  return { id: 'x', sesso: sesso || 'M', analisiSangue: as, inbody: [] };
}
function ldl(analisi, sesso) {
  const def = win.eval('CALCOLI_CLINICI').find(function (d) { return d.id === 'ldl_fw'; });
  assert.ok(def, 'il calcolo ldl_fw non esiste più');
  return win.eval('calcolaIndice')(paz(analisi, sesso), def);
}

test('P125 — Friedewald sul referto vero di Mangini: 158 − 48 − 91/5 = 91.8', () => {
  const r = ldl({ 'Colesterolo totale': 158, 'HDL': 48, 'Trigliceridi': 91 });
  assert.strictEqual(r.ok, true, 'non calcolato: ' + (r.error || (r.missing || []).join(', ')));
  assert.ok(Math.abs(r.val - 91.8) < 0.01, 'atteso 91.8, ottenuto ' + r.val);
});

test('P125 — sopra 400 di trigliceridi NON si calcola: inapplicabile, non impreciso', () => {
  const r = ldl({ 'Colesterolo totale': 250, 'HDL': 40, 'Trigliceridi': 450 });
  assert.strictEqual(r.ok, false, 'con TG 450 Friedewald non è valido e non deve produrre un numero');
  assert.ok(/trigliceridi/i.test(r.error), 'il motivo deve dire perché: ' + r.error);
});

test('P125 — a 400 esatti si calcola ancora (il confine è "sopra 400")', () => {
  assert.strictEqual(ldl({ 'Colesterolo totale': 250, 'HDL': 40, 'Trigliceridi': 400 }).ok, true);
});

test('P125 — valori incoerenti fra loro non producono un LDL negativo', () => {
  const r = ldl({ 'Colesterolo totale': 90, 'HDL': 70, 'Trigliceridi': 200 });   // → −20
  assert.strictEqual(r.ok, false);
  assert.ok(/incoerenti/i.test(r.error), r.error);
});

test('P125 — senza uno dei tre valori dice quale manca, non tira a indovinare', () => {
  const r = ldl({ 'Colesterolo totale': 158, 'HDL': 48 });
  assert.strictEqual(r.ok, false);
  // Array.from: gli array creati dentro JSDOM non sono reference-equal a quelli di node.
  assert.deepStrictEqual(Array.from(r.missing), ['Trigliceridi']);
});

test('P125 — nessun semaforo verde/rosso: il target LDL dipende dal rischio CV', () => {
  const def = win.eval('CALCOLI_CLINICI').find(function (d) { return d.id === 'ldl_fw'; });
  const semafori = Array.from(def.soglie).map(function (s) { return s.sem; });
  assert.deepStrictEqual(semafori, ['info'],
    'un verde/rosso fisso sull\'LDL direbbe una cosa che nessuna linea guida dice (v. RANGE_RIF livello B)');
  assert.strictEqual(ldl({ 'Colesterolo totale': 158, 'HDL': 48, 'Trigliceridi': 91 }).sem, 'info');
});

test('P125 — se il laboratorio ha misurato l\'LDL, l\'avviso confronta i due', () => {
  const vicino = ldl({ 'Colesterolo totale': 158, 'HDL': 48, 'Trigliceridi': 91, 'LDL': 93 });
  assert.ok(/in linea/i.test(vicino.avviso), vicino.avviso);
  const lontano = ldl({ 'Colesterolo totale': 158, 'HDL': 48, 'Trigliceridi': 91, 'LDL': 140 });
  assert.ok(/differenza/i.test(lontano.avviso), lontano.avviso);
  assert.ok(/misurato/i.test(lontano.avviso), 'deve dire che fa fede il misurato: ' + lontano.avviso);
});

test('P125 — con trigliceridi alti avverte che la stima sottostima', () => {
  const r = ldl({ 'Colesterolo totale': 240, 'HDL': 40, 'Trigliceridi': 300 });
  assert.strictEqual(r.ok, true);
  assert.ok(/sottostima/i.test(r.avviso), r.avviso);
  assert.ok(/non-HDL/i.test(r.avviso), 'deve indirizzare al non-HDL, che è più affidabile lì: ' + r.avviso);
});

test('P125 — il valore calcolato NON viene scritto nella casella LDL del paziente', () => {
  const p = paz({ 'Colesterolo totale': 158, 'HDL': 48, 'Trigliceridi': 91 });
  const def = win.eval('CALCOLI_CLINICI').find(function (d) { return d.id === 'ldl_fw'; });
  win.eval('calcolaIndice')(p, def);
  assert.strictEqual(p.analisiSangue['LDL_val'], undefined,
    'una stima che si scrive in un campo di valori misurati crea una doppia fonte (F4/P118/P120)');
});

test('P125 — la condizione di validità è un aggancio generico, non un caso speciale dell\'LDL', () => {
  const fs = require('fs');
  const path = require('path');
  const html = fs.readFileSync(path.join(__dirname, '..', '..', 'index.html'), 'utf8');
  const i = html.indexOf('function calcolaIndice');
  const corpo = html.slice(i, i + 3000);
  assert.ok(/typeof def\.valido\s*===\s*'function'/.test(corpo),
    'la condizione di validità è stata cablata dentro la formula: la prossima formula con un limite se lo dimenticherà');
});
