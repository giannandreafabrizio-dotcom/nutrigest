// ── S2 — in quale pasto del giorno va l'integratore (P148, tappa 1) ──
//
// Richiesta di Fabrizio (5 ago 2026): "se un paziente assume vit d tutti i
// giorni nutrigest lo deve consigliare nel pasto della giornata con più
// grassi… che può essere variabile durante la settimana in base al piano
// alimentare". Stessa forma per la creatina, ma sui carboidrati.
//
// Due cose che questi test difendono e che non si vedono guardando il codice:
//
// 1. L'ASSEGNAZIONE È PER GIORNO. Non esiste un pasto scelto per l'intera
//    settimana, e quindi non esiste nessuna soglia di "costanza". Il test
//    `il pasto vincente cambia da un giorno all'altro` è la prova che il
//    requisito è quello e non l'altro: se qualcuno in futuro reintroducesse
//    una scelta unica per tutto il piano, quel test diventerebbe rosso.
//
// 2. IL SILENZIO (regola 19). Metà dei test verifica che la funzione NON
//    risponda quando non ha di che rispondere: giorno inesistente, pasti
//    vuoti, alimenti non riconosciuti. Un consiglio inventato su un piano
//    che non c'è finirebbe nel PDF di un paziente senza un errore a video —
//    la stessa famiglia di guasti di F6/F7 e della regola 11.
//
// Include anche il test di regressione su `calcolaMacrosPiano`: il 5 ago 2026
// la ponderata 35/25/15/10/8/7 è stata estratta in `_macrosCella` per non
// avere due modi diversi di sommare i macros di una cella (regola 15). I
// numeri pinnati qui sotto sono quelli PRIMA dell'estrazione, misurati sullo
// stesso fixture: se un domani cambiano, l'estrazione ha cambiato il
// comportamento e non solo la forma.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();

// NOTA TECNICA (realm JSDOM). Gli oggetti e gli array creati DENTRO la finestra
// JSDOM hanno un Object.prototype/Array.prototype diversi da quelli di Node:
// `assert.deepStrictEqual` confronta anche il prototipo e fallisce con "same
// structure but not reference-equal" pur essendo i valori identici. Si
// confrontano quindi copie normalizzate con JSON. Stessa famiglia del quirk
// già incontrato il 5 ago 2026 sui `const`/`let` top-level, che in JSDOM non
// diventano proprietà di `window` (a differenza delle `function`).
const pulito = (x) => JSON.parse(JSON.stringify(x));

// Il piano dell'esempio di Fabrizio: lunedì pranzo con la mozzarella è più
// grasso di lunedì cena col pollo; martedì è la cena col salmone a vincere.
function pianoEsempio() {
  return [
    { giorno: 'Lunedì', pasti: {
      colazione: { celle: [{ alimenti: [{ n: 'Latte', g: 200 }] }] },
      pranzo:    { celle: [{ alimenti: [{ n: 'Pasta', g: 80 }] },
                           { alimenti: [{ n: 'Mozzarella', g: 125 }] }] },
      cena:      { celle: [{ alimenti: [{ n: 'Riso', g: 80 }] },
                           { alimenti: [{ n: 'Petto di pollo', g: 150 }] }] }
    }},
    { giorno: 'Martedì', pasti: {
      pranzo: { celle: [{ alimenti: [{ n: 'Insalata', g: 200 }] }] },
      cena:   { celle: [{ alimenti: [{ n: 'Pane', g: 60 }] },
                        { alimenti: [{ n: 'Salmone', g: 150 }] }] }
    }}
  ];
}

// ── Il caso che ha generato la voce ──────────────────────────────────────

test('P148 — il pasto più grasso del lunedì è il pranzo (la mozzarella batte il pollo)', () => {
  const r = win.pastoMaxPerMacro(pianoEsempio(), 0, 'grassi');
  assert.ok(r, 'deve trovare un pasto');
  assert.strictEqual(r.slot, 'pranzo');
  assert.strictEqual(r.giorno, 'Lunedì');
  assert.ok(r.valore > 0, 'il valore dei grassi deve essere positivo');
});

test('P148 — il pasto vincente cambia da un giorno all\'altro (niente scelta unica per la settimana)', () => {
  const piano = pianoEsempio();
  const lun = win.pastoMaxPerMacro(piano, 0, 'grassi');
  const mar = win.pastoMaxPerMacro(piano, 1, 'grassi');
  assert.strictEqual(lun.slot, 'pranzo');
  assert.strictEqual(mar.slot, 'cena');
  assert.notStrictEqual(lun.slot, mar.slot,
    'se questi due coincidessero il fixture non proverebbe più la variabilità per giorno');
});

test('P148 — la regola dei carboidrati sceglie un pasto diverso da quella dei grassi', () => {
  const piano = pianoEsempio();
  const grassi = win.pastoMaxPerMacro(piano, 0, 'grassi');
  const carbo  = win.pastoMaxPerMacro(piano, 0, 'carboidrati');
  assert.strictEqual(grassi.slot, 'pranzo');
  assert.strictEqual(carbo.slot, 'cena',
    'creatina e vitamina D non devono finire per forza nello stesso pasto');
});

test('P148 — tutti i giorni in un colpo: un risultato per giorno, nell\'ordine del piano', () => {
  const out = win.pastoMaxPerMacroTuttiIGiorni(pianoEsempio(), 'g');
  assert.strictEqual(out.length, 2);
  assert.deepStrictEqual(out.map(x => x && x.slot), ['pranzo', 'cena']);
});

test('P148 — gli alias delle macro sono accettati in entrambe le forme', () => {
  const piano = pianoEsempio();
  assert.strictEqual(win.pastoMaxPerMacro(piano, 0, 'g').slot,
                     win.pastoMaxPerMacro(piano, 0, 'grassi').slot);
  assert.strictEqual(win.pastoMaxPerMacro(piano, 0, 'c').slot,
                     win.pastoMaxPerMacro(piano, 0, 'carboidrati').slot);
});

// ── Il silenzio: quando la funzione NON deve rispondere (regola 19) ───────

test('SILENZIO — piano assente o non array: nessun consiglio, nessuna eccezione', () => {
  assert.strictEqual(win.pastoMaxPerMacro(null, 0, 'g'), null);
  assert.strictEqual(win.pastoMaxPerMacro(undefined, 0, 'g'), null);
  assert.strictEqual(win.pastoMaxPerMacro('non un piano', 0, 'g'), null);
  assert.deepStrictEqual(pulito(win.pastoMaxPerMacroTuttiIGiorni(null, 'g')), []);
});

test('SILENZIO — giorno fuori dal piano: null, non il primo giorno per ripiego', () => {
  const piano = pianoEsempio();
  assert.strictEqual(win.pastoMaxPerMacro(piano, 99, 'g'), null);
  assert.strictEqual(win.pastoMaxPerMacro(piano, -1, 'g'), null);
});

test('SILENZIO — macro non riconosciuta: null invece di un ripiego sui grassi', () => {
  const piano = pianoEsempio();
  assert.strictEqual(win.pastoMaxPerMacro(piano, 0, 'proteine'), null);
  assert.strictEqual(win.pastoMaxPerMacro(piano, 0, ''), null);
  assert.strictEqual(win.pastoMaxPerMacro(piano, 0, undefined), null);
});

test('SILENZIO — giorno senza pasti, o con pasti tutti vuoti: nessun consiglio', () => {
  assert.strictEqual(win.pastoMaxPerMacro([{ giorno: 'Lunedì' }], 0, 'g'), null);
  assert.strictEqual(win.pastoMaxPerMacro([{ giorno: 'Lunedì', pasti: {} }], 0, 'g'), null);
  assert.strictEqual(win.pastoMaxPerMacro(
    [{ giorno: 'Lunedì', pasti: { pranzo: { celle: [] }, cena: { celle: [{ alimenti: [] }] } } }],
    0, 'g'), null);
});

test('SILENZIO — solo alimenti non riconosciuti: null, non un pasto scelto a caso', () => {
  const piano = [{ giorno: 'Lunedì', pasti: {
    pranzo: { celle: [{ alimenti: [{ n: 'Zzz alimento inesistente', g: 100 }] }] },
    cena:   { celle: [{ alimenti: [{ n: 'Altro nome inventato', g: 100 }] }] }
  }}];
  const r = win.pastoMaxPerMacro(piano, 0, 'g');
  assert.ok(r === null || r.valore > 0,
    'o non risponde, o risponde con un valore reale — mai un pasto a valore zero');
});

test('SILENZIO — un pasto vuoto non concorre e non vince mai', () => {
  const piano = [{ giorno: 'Lunedì', pasti: {
    colazione: { celle: [] },
    pranzo:    { celle: [{ alimenti: [{ n: 'Olio di oliva', g: 20 }] }] }
  }}];
  const r = win.pastoMaxPerMacro(piano, 0, 'g');
  assert.strictEqual(r.slot, 'pranzo');
});

// ── _macrosCella: la ponderata condivisa ─────────────────────────────────

test('_macrosCella — cella con un solo alimento: peso pieno, non 0.35', () => {
  const uno = win._macrosCella({ alimenti: [{ n: 'Olio di oliva', g: 100 }] });
  assert.ok(uno.g > 50, 'con 100g di olio i grassi devono essere quasi 100, non un terzo');
});

test('_macrosCella — più alternative: la ponderata riduce il contributo di ciascuna', () => {
  const sola  = win._macrosCella({ alimenti: [{ n: 'Olio di oliva', g: 100 }] });
  const conAlt = win._macrosCella({ alimenti: [{ n: 'Olio di oliva', g: 100 },
                                               { n: 'Olio di oliva', g: 100 }] });
  assert.ok(conAlt.g < sola.g,
    'due alternative dello stesso alimento pesano 0.35+0.25, meno di una sola al 100%');
});

test('_macrosCella — cella vuota o malformata: zeri, nessuna eccezione', () => {
  assert.deepStrictEqual(pulito(win._macrosCella(null)), { kcal: 0, p: 0, c: 0, g: 0 });
  assert.deepStrictEqual(pulito(win._macrosCella({})), { kcal: 0, p: 0, c: 0, g: 0 });
  assert.deepStrictEqual(pulito(win._macrosCella({ alimenti: [] })), { kcal: 0, p: 0, c: 0, g: 0 });
});

test('_macrosCella — registra gli alimenti non riconosciuti nel Set passato', () => {
  const nonTrovati = new Set();
  win._macrosCella({ alimenti: [{ n: 'Zzz alimento inesistente', g: 100 }] }, nonTrovati);
  assert.ok(nonTrovati.has('Zzz alimento inesistente'),
    'era il comportamento di calcolaMacrosPiano prima dell\'estrazione: non va perso');
});

test('_macrosCella — usa i macrosOverride delle ricette composte (B7)', () => {
  const r = win._macrosCella({ alimenti: [
    { n: 'Ricetta X', g: 0, ricettaComposta: true, macrosOverride: { kcal: 500, p: 30, c: 40, g: 20 } }
  ]});
  assert.strictEqual(r.kcal, 500);
  assert.strictEqual(r.g, 20);
});

// ── Regressione: l'estrazione non ha cambiato i numeri ───────────────────

test('REGRESSIONE — calcolaMacrosPiano dà gli stessi numeri di prima dell\'estrazione', () => {
  const piano = [
    { giorno: 'Lunedì', pasti: {
      colazione: { celle: [{ alimenti: [{ n: 'Latte', g: 200 }, { n: 'Fette biscottate', g: 30 }] }] },
      pranzo:    { celle: [{ alimenti: [{ n: 'Pasta', g: 80 }] },
                           { alimenti: [{ n: 'Mozzarella', g: 125 }] }] },
      cena:      { celle: [{ alimenti: [{ n: 'Riso', g: 80 }] },
                           { alimenti: [{ n: 'Petto di pollo', g: 150 }] }] }
    }},
    { giorno: 'Martedì', pasti: {
      pranzo: { celle: [{ alimenti: [{ n: 'Riso', g: 80 }] },
                        { alimenti: [{ n: 'Merluzzo', g: 150 }] }] },
      cena:   { celle: [{ alimenti: [{ n: 'Pane', g: 60 }] },
                        { alimenti: [{ n: 'Salmone', g: 150 }] }] }
    }}
  ];
  const r = win.calcolaMacrosPiano(piano);

  // Valori misurati il 5 ago 2026 PRIMA di estrarre _macrosCella.
  assert.deepStrictEqual(pulito(r.settimanale), { kcal: 1767, p: 112.5, c: 235.8, g: 48.2 });
  assert.deepStrictEqual(pulito(r.medio),       { kcal: 884,  p: 56.3,  c: 117.9, g: 24.1 });
  assert.deepStrictEqual(pulito(r.psMedio),     { kcal: 925,  p: 58.4,  c: 121.1, g: 26.4 });
  assert.strictEqual(r.giornalieri[0].kcal, 1059);
  assert.strictEqual(r.giornalieri[0].g, 29.5);
  assert.strictEqual(r.giornalieri[1].kcal, 708);
  assert.strictEqual(r.giornalieri[1].g, 18.6);

  // Il Set degli alimenti non trovati deve continuare a popolarsi: è il
  // canale con cui l'app avvisa che un nome non è stato riconosciuto.
  assert.ok(r.alimentiNonTrovati.includes('Fette biscottate'));
  assert.ok(r.alimentiNonTrovati.includes('Merluzzo'));
});
