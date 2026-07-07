// ── S2 — validaPiano (P61) — GOLDEN TEST ──
// Il validatore clinico post-generazione è la rete di sicurezza n.1 del
// prodotto (finding F2 dell'analisi critica: "P61 senza golden test è un
// validatore non validato"). Questi test fissano il contratto della funzione
// PURA validaPiano(piano, p) su piani sintetici con violazioni NOTE:
// ogni bug clinico futuro trovato sul campo va aggiunto qui come caso.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();

// ── Helper: costruttori di piani e pazienti sintetici ──
function pianoConCella(nomeAlimento, slot) {
  return [{
    giorno: 'Lunedì',
    pasti: { [slot || 'pranzo']: { celle: [{ id: 'c1', alimenti: [{ n: nomeAlimento, colore: 'verde' }] }] } }
  }];
}
function pianoConRicetta(testoRicetta, slot) {
  return [{
    giorno: 'Lunedì',
    pasti: { [slot || 'pranzo']: { ricette: [testoRicetta] } }
  }];
}
function pazienteBase(extra) {
  return Object.assign({ nome: 'Test', cognome: 'Paziente', allergie: '', alimenti: {}, motivazioniSemaforo: {} }, extra || {});
}

// ═══ 1. ALLERGENE IN CELLA → BLOCCO ═══
test('S2 validaPiano — allergene da regola semaforo (grigioScuro + motivazione Glutine) in cella → blocco', () => {
  const p = pazienteBase({
    allergie: 'Glutine / Celiachia',
    alimenti: { 'Cereali con Glutine__Pasta': 'grigioScuro' },
    motivazioniSemaforo: { 'Cereali con Glutine__Pasta': { grigi: ['Glutine'] } }
  });
  const esito = win.validaPiano(pianoConCella('Pasta'), p);
  assert.strictEqual(esito.livello, 'blocco');
  const v = esito.violazioni.find(x => x.gravita === 'blocco');
  assert.ok(v, 'deve esserci una violazione di gravità blocco');
  assert.strictEqual(v.tipo, 'allergene');
  assert.strictEqual(v.elemento, 'Pasta');
  assert.strictEqual(v.fonte, 'cella');
  assert.strictEqual(v.giorno, 'Lunedì');
});

test('S2 validaPiano — allergene da chip testuale (Uova) in cella, senza regola semaforo → blocco', () => {
  // "Uova" non ha regola semaforo: il match deve avvenire via _VALIDA_ALLERGENI_TERMINI
  const p = pazienteBase({ allergie: 'Uova' });
  const esito = win.validaPiano(pianoConCella('Uovo intero', 'colazione'), p);
  assert.strictEqual(esito.livello, 'blocco');
  assert.ok(esito.violazioni.some(v => v.tipo === 'allergene' && /uovo/i.test(v.elemento)));
});

// ═══ 2. ALLERGENE IN RIGA TESTUALE (il rischio massimo — analisi critica) ═══
test('S2 validaPiano — allergene dentro una riga ricetta testuale → blocco anche senza match di chiave DB', () => {
  const p = pazienteBase({ allergie: 'Glutine / Celiachia' });
  const esito = win.validaPiano(pianoConRicetta('Vellutata di zucca con crostini e semi'), p);
  assert.strictEqual(esito.livello, 'blocco');
  const v = esito.violazioni.find(x => x.gravita === 'blocco');
  assert.ok(v, 'la riga testuale con "crostini" deve produrre blocco per glutine');
  assert.strictEqual(v.fonte, 'ricetta');
  // La riga ha prodotto evidenza → conta come verificata, non come non-verificabile
  assert.strictEqual(esito.copertura.verificati, 1);
  assert.strictEqual(esito.copertura.nonVerificabili.length, 0);
});

test('S2 validaPiano — allergene in testo libero p.allergie ("fragole") matcha la cella Fragole → blocco', () => {
  const p = pazienteBase({ allergie: 'fragole' });
  const esito = win.validaPiano(pianoConCella('Fragole', 'spuntino_mattina'), p);
  assert.strictEqual(esito.livello, 'blocco');
  assert.ok(esito.violazioni.some(v => v.tipo === 'allergene' && v.elemento === 'Fragole'));
});

// ═══ 3. ROSSO SEMAFORO → AVVISO ═══
test('S2 validaPiano — alimento rosso nel semaforo paziente → avviso (non blocco)', () => {
  const p = pazienteBase({ alimenti: { 'Frutta__Banana': 'rosso' } });
  const esito = win.validaPiano(pianoConCella('Banana', 'spuntino_pomeriggio'), p);
  assert.strictEqual(esito.livello, 'avviso');
  const v = esito.violazioni[0];
  assert.strictEqual(v.tipo, 'rosso');
  assert.strictEqual(v.gravita, 'avviso');
});

// ═══ 4. ESCLUSO MANUALE / SCONSIGLIATO → NOTA ═══
test('S2 validaPiano — alimento escluso manualmente (colore "no") → nota', () => {
  const p = pazienteBase({ alimenti: { 'Verdure__Cavolfiore': 'no' } });
  const esito = win.validaPiano(pianoConCella('Cavolfiore', 'cena'), p);
  assert.strictEqual(esito.livello, 'nota');
  assert.strictEqual(esito.violazioni[0].tipo, 'escluso');
  assert.strictEqual(esito.violazioni[0].gravita, 'nota');
});

test('S2 validaPiano — grigioScuro per PATOLOGIA (non allergia) → nota, NON blocco', () => {
  // Un alimento sconsigliato per diabete non è un allergene: la distinzione
  // di gravità è il cuore clinico del validatore.
  const p = pazienteBase({
    alimenti: { 'Frutta__Uva': 'grigioScuro' },
    motivazioniSemaforo: { 'Frutta__Uva': { grigi: ['Diabete/IR/PCOS'] } }
  });
  const esito = win.validaPiano(pianoConCella('Uva'), p);
  assert.strictEqual(esito.livello, 'nota');
  assert.strictEqual(esito.violazioni[0].gravita, 'nota');
});

// ═══ 5. GERARCHIA: blocco vince su avviso e nota ═══
test('S2 validaPiano — con violazioni miste il livello complessivo è il più grave (blocco)', () => {
  const p = pazienteBase({
    allergie: 'Uova',
    alimenti: { 'Frutta__Banana': 'rosso' }
  });
  const piano = [{
    giorno: 'Martedì',
    pasti: {
      colazione: { celle: [{ id: 'c1', alimenti: [{ n: 'Uovo intero' }] }] },
      pranzo: { celle: [{ id: 'c2', alimenti: [{ n: 'Banana' }] }] }
    }
  }];
  const esito = win.validaPiano(piano, p);
  assert.strictEqual(esito.livello, 'blocco');
  assert.strictEqual(esito.violazioni.length, 2);
});

// ═══ 6. PIANO PULITO → OK, copertura piena ═══
test('S2 validaPiano — piano senza violazioni e tutto verificabile → livello ok, copertura 100%', () => {
  const p = pazienteBase({ allergie: 'Glutine / Celiachia' });
  const esito = win.validaPiano(pianoConCella('Riso'), p);
  assert.strictEqual(esito.livello, 'ok');
  assert.strictEqual(esito.violazioni.length, 0);
  assert.strictEqual(esito.copertura.totale, 1);
  assert.strictEqual(esito.copertura.verificati, 1);
});

// ═══ 7. COPERTURA: il non riconosciuto NON è dichiarato sicuro ═══
test('S2 validaPiano — riga testuale senza ingredienti estraibili → non verificabile, livello mai "ok"', () => {
  const p = pazienteBase({});
  const esito = win.validaPiano(pianoConRicetta('Vellutata speciale della nonna'), p);
  assert.strictEqual(esito.violazioni.length, 0, 'nessuna violazione nota');
  assert.strictEqual(esito.copertura.nonVerificabili.length, 1, 'la riga deve finire tra i non verificabili');
  assert.strictEqual(esito.copertura.verificati, 0);
  assert.notStrictEqual(esito.livello, 'ok', 'copertura incompleta ⇒ il badge non può essere verde');
});

test('S2 validaPiano — riga con ingredienti grammati e riconosciuti dal DB → verificata', () => {
  const p = pazienteBase({});
  const esito = win.validaPiano(pianoConRicetta('Riso 80g, Zucchine 150g'), p);
  assert.strictEqual(esito.copertura.verificati, 1);
  assert.strictEqual(esito.copertura.nonVerificabili.length, 0);
  assert.strictEqual(esito.livello, 'ok');
});

// ═══ 8. ROBUSTEZZA input ═══
test('S2 validaPiano — piano vuoto/nullo o paziente nullo → esito neutro senza eccezioni', () => {
  assert.strictEqual(win.validaPiano(null, pazienteBase()).livello, 'ok');
  assert.strictEqual(win.validaPiano([], pazienteBase()).livello, 'ok');
  assert.strictEqual(win.validaPiano(pianoConCella('Riso'), null).livello, 'ok');
});

test('S2 validaPiano — il matching è a parola intera: "pane" non deve matchare "panela" o simili', () => {
  const p = pazienteBase({ allergie: 'Glutine / Celiachia' });
  // "Panela" contiene "pane" come sottostringa ma non come parola: nessun blocco
  const esito = win.validaPiano(pianoConRicetta('Zucchero panela 10g'), p);
  assert.ok(!esito.violazioni.some(v => v.gravita === 'blocco'), 'match di sottostringa non deve produrre blocco');
});

// ═══ 9. FIRMA OVERRIDE: cambia se cambiano le violazioni bloccanti ═══
test('S2 _validaFirmaBlocchi — la firma lega l\'override alle violazioni esatte (piano diverso ⇒ firma diversa)', () => {
  const p = pazienteBase({ allergie: 'Uova' });
  const e1 = win.validaPiano(pianoConCella('Uovo intero', 'colazione'), p);
  const e2 = win.validaPiano(pianoConCella('Uovo intero', 'cena'), p);
  const f1 = win._validaFirmaBlocchi(e1);
  const f2 = win._validaFirmaBlocchi(e2);
  assert.ok(f1 && f2, 'entrambe le firme devono esistere');
  assert.notStrictEqual(f1, f2, 'slot diverso ⇒ firma diversa ⇒ override decaduto');
});
