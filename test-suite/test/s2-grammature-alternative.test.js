// ── S2 — P121: motore unico delle grammature delle alternative ──
// Copre le tre parti della logica decisa il 25 lug 2026:
//   1. arrotondaGrammatura — pezzi interi senza tetto / multipli di 5g
//   2. suggerisciGrEquivalente — gruppi di equivalenza e criterio per gruppo
//   3. ricalcolaAlternative — le alternative si ricalcolano, non si scalano
// I casi numerici sono quelli reali che avevano fatto emergere il problema.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();

// ── 1. Arrotondamento ────────────────────────────────────────────────────────

test('P121 arrotondaGrammatura — alimenti a pezzi: numero intero di pezzi, NESSUN tetto', () => {
  // Il bug storico: PORZIONI_DISCRETE era una lista chiusa [6,12,18,24,30,36] e
  // schiacciava 102g (10 fette biscottate) sul massimo della lista, 36g.
  assert.strictEqual(win.arrotondaGrammatura('Fette biscottate integrali', 102), 100, '10 fette da 10g');
  assert.strictEqual(win.arrotondaGrammatura('Uovo intero', 282), 275, '5 uova da 55g');
  assert.strictEqual(win.arrotondaGrammatura('Uovo intero', 47), 55, 'minimo un pezzo intero');
  assert.strictEqual(win.arrotondaGrammatura('Tonno al naturale', 139), 120, '2 scatolette da 60g');
});

test('P121 arrotondaGrammatura — tutto il resto: multipli di 5g, minimo 5g', () => {
  assert.strictEqual(win.arrotondaGrammatura('Pasta', 83), 85);
  assert.strictEqual(win.arrotondaGrammatura('Patate', 353), 355);
  assert.strictEqual(win.arrotondaGrammatura('Olio EVO', 2), 5);
  assert.strictEqual(win.arrotondaGrammatura('Pasta', 0), 0, 'grammatura nulla resta nulla');
});

test('P121 arrotondaGrammatura — i latticini NON sono alimenti a pezzi (restano liberi a passo 5g)', () => {
  // Decisione esplicita: lo yogurt non va incastrato sul vasetto da 125g, perche'
  // a molti pazienti va prescritto a 200g (confezione grande).
  assert.strictEqual(win.arrotondaGrammatura('Yogurt greco intero', 198), 200);
  assert.strictEqual(win.arrotondaGrammatura('Mozzarella di vacca', 118), 120);
});

// ── 2. Gruppi di equivalenza ─────────────────────────────────────────────────

test('P121 cereali — equivalenza sui carboidrati (valore vero, nessun tetto)', () => {
  const farro = win.suggerisciGrEquivalente('Pasta', 80, 'Farro');
  assert.strictEqual(farro.criterio, 'carbo');
  assert.strictEqual(farro.gr, 95); // 80 × 79,1 ÷ 67,1 = 94,3 → 95

  const patate = win.suggerisciGrEquivalente('Pasta', 80, 'Patate');
  assert.strictEqual(patate.gr, 355, '80g di pasta valgono davvero ~354g di patate: si mostra il valore vero');
});

test('P121 proteine — equivalenza sulle proteine', () => {
  const uovo = win.suggerisciGrEquivalente('Petto di pollo', 150, 'Uovo intero');
  assert.strictEqual(uovo.criterio, 'proteine');
  assert.strictEqual(uovo.gr, 275, '5 uova, non piu\' troncato a 150g dalla vecchia lista chiusa');
});

// NOTA STORICA — il 4 agosto 2026 questo criterio e' stato cambiato in 'kcal' e
// rimesso a posto lo stesso giorno. L'audit aveva trovato che il motore calcolava 33 g
// di semi di chia dove il foglietto al paziente ne consigliava 20; Fabrizio ha
// obiettato sulla porzione, e la correzione applicata era stata cambiare il CRITERIO
// dell'intero gruppo grassi. Sbagliato: l'obiezione era su UN alimento, non sulla
// regola. La chia ha solo il 31% di grassi, quindi qualunque equivalenza sui lipidi la
// fa esplodere; la risposta giusta e' stata toglierla dalle alternative all'olio.
// Un'obiezione su un valore non e' un mandato a cambiare la regola che lo produce.
test('P121 olio e grassi — equivalenza sui GRASSI, non sulle kcal', () => {
  const avocado = win.suggerisciGrEquivalente('Olio EVO', 10, 'Avocado');
  assert.strictEqual(avocado.criterio, 'grassi');
  assert.strictEqual(avocado.gr, 45); // 10 × 99,9 ÷ 23,0 = 43,4 → 45 (sulle kcal sarebbe stato 40)
});

test('P121 i semi di chia NON sono fra le alternative all\'olio', () => {
  // Decisione di Fabrizio, 4 ago 2026: con il 31% di grassi servirebbero 33 g per
  // pareggiare un cucchiaio d'olio, ed e' una porzione che non si consiglia. Gli altri
  // semi restano: il lino ha il 42% di grassi e sta su grammature sensate.
  const lista = JSON.parse(win.eval('JSON.stringify(_ALT_GRASSI_PROMPT)'));
  assert.ok(lista.indexOf('Semi di chia') === -1, 'la chia non va proposta per la cella dell\'olio');
  assert.ok(lista.indexOf('Semi di lino') >= 0, 'gli altri semi invece si');
  const riga = win._promptAlternativeGrassi(10);
  assert.ok(!/chia/i.test(riga), 'nemmeno la riga che va all\'AI deve nominarla: ' + riga);
});

test('P121 nessuna alternativa all\'olio supera una porzione sensata', () => {
  // Il controllo che avrebbe fermato il caso della chia prima che arrivasse al paziente:
  // ogni alternativa proposta deve restare sotto il doppio delle calorie del riferimento.
  const CREA = JSON.parse(win.eval('JSON.stringify(CREA_ALIMENTI)'));
  const kcalRif = CREA['Olio EVO'].kcal * 0.10;   // 10 g di olio = 90 kcal
  JSON.parse(win.eval('JSON.stringify(_ALT_GRASSI_PROMPT)')).forEach(function (nome) {
    const r = win.suggerisciGrEquivalente('Olio EVO', 10, nome);
    const a = CREA[nome];
    if (!r || !a) return;
    const kcal = a.kcal * r.gr / 100;
    assert.ok(kcal < kcalRif * 2,
      nome + ': ' + r.gr + ' g valgono ' + Math.round(kcal) + ' kcal contro le ' + kcalRif +
      ' del cucchiaio d\'olio — porzione fuori scala, va tolta dalle alternative');
  });
});

test('P121 verdura — nessuna equivalenza: stessa grammatura del principale', () => {
  const carote = win.suggerisciGrEquivalente('Zucchine', 200, 'Carote');
  assert.strictEqual(carote.criterio, 'fissa');
  assert.strictEqual(carote.gr, 200, 'sulle kcal avrebbe dato 63g');
});

test('P121 legumi — equivalenza sui carboidrati, ma solo tra legumi', () => {
  const ceci = win.suggerisciGrEquivalente('Lenticchie (barattolo)', 120, 'Ceci (barattolo)');
  assert.strictEqual(ceci.criterio, 'carbo');
  assert.strictEqual(ceci.gr, 135); // 120 × 15,4 ÷ 13,9 = 133 → 135
});

test('P121 gruppi diversi — niente calcolo, porzione standard di database', () => {
  // Il legume sotto la pasta NON diventa 410g: prende i suoi 120g standard.
  const lenticchie = win.suggerisciGrEquivalente('Pasta', 80, 'Lenticchie (barattolo)');
  assert.strictEqual(lenticchie.criterio, 'porzione');
  assert.strictEqual(lenticchie.gr, 120);
});

test('P121 avocado — trattato come grasso, non come frutta', () => {
  assert.strictEqual(win.getCategoriaFunzionale('Avocado'), 'grasso');
  // Sotto un frutto non produce piu' 833g: gruppo diverso → porzione standard.
  const sottoMela = win.suggerisciGrEquivalente('Mela', 150, 'Avocado');
  assert.strictEqual(sottoMela.criterio, 'porzione');
  assert.strictEqual(sottoMela.gr, 75);
});

// ── 3. Motore ────────────────────────────────────────────────────────────────

test('P121 ricalcolaAlternative — riscrive tutte le alternative dal principale', () => {
  const cella = { id: 'c1', alimenti: [
    { n: 'Pasta', g: 80 },
    { n: 'Farro', g: 999 },   // valore sbagliato di partenza
    { n: 'Patate', g: 1 }     // valore sbagliato di partenza
  ]};
  win.ricalcolaAlternative(cella);
  assert.strictEqual(cella.alimenti[0].g, 80, 'il principale non si tocca mai');
  assert.strictEqual(cella.alimenti[1].g, 95);
  assert.strictEqual(cella.alimenti[2].g, 355);
  assert.strictEqual(cella.alimenti[1].eq, 'carbo', 'il criterio usato viene registrato per l\'interfaccia');
});

test('P121 ricalcolaAlternative — il risultato non dipende dalla storia della cella (niente deriva)', () => {
  // Prima di P121 le alternative venivano moltiplicate per nuovo/vecchio e
  // arrotondate a 5g ad ogni passaggio: due percorsi diversi davano due risultati diversi.
  const diretta = { id: 'c1', alimenti: [{ n: 'Pasta', g: 60 }, { n: 'Patate', g: 0 }] };
  const passaggi = { id: 'c2', alimenti: [{ n: 'Pasta', g: 100 }, { n: 'Patate', g: 0 }] };
  win.ricalcolaAlternative(diretta);
  passaggi.alimenti[0].g = 37; win.ricalcolaAlternative(passaggi);
  passaggi.alimenti[0].g = 123; win.ricalcolaAlternative(passaggi);
  passaggi.alimenti[0].g = 60; win.ricalcolaAlternative(passaggi);
  assert.strictEqual(passaggi.alimenti[1].g, diretta.alimenti[1].g);
});

test('P121 ricalcolaAlternative — non tocca le ricette composte (hanno macro propri)', () => {
  const cella = { id: 'c1', alimenti: [
    { n: 'Pasta', g: 80 },
    { n: 'Pancake proteici ★', g: 40, ricettaComposta: 'pancake_proteici' }
  ]};
  win.ricalcolaAlternative(cella);
  assert.strictEqual(cella.alimenti[1].g, 40);
});

test('P121 ricalcolaAlternative — cella con un solo alimento o principale senza grammatura: nessun effetto', () => {
  const sola = { id: 'c1', alimenti: [{ n: 'Pasta', g: 80 }] };
  assert.doesNotThrow(() => win.ricalcolaAlternative(sola));
  const senzaG = { id: 'c2', alimenti: [{ n: 'Pasta', g: 0 }, { n: 'Farro', g: 77 }] };
  win.ricalcolaAlternative(senzaG);
  assert.strictEqual(senzaG.alimenti[1].g, 77, 'senza una base valida non si inventa nulla');
  assert.doesNotThrow(() => win.ricalcolaAlternative(null));
});

test('P121 _normalizzaPianoNuovo — le grammature delle alternative dell\'AI vengono ricalcolate', () => {
  const grezzo = [{ g: 'Lunedì', pasti: { pranzo: { ric: [], ce: [
    { id: 'c1', co: 'sx', or: 1, al: [
      { n: 'Pasta', g: 80, cat: 'ca', cl: 'v' },
      { n: 'Farro', g: 500, cat: 'ca', cl: 'v' }   // numero fuori scala inventato dall'AI
    ]}
  ]}}}];
  const out = win._normalizzaPianoNuovo(grezzo);
  const al = out[0].pasti.pranzo.celle[0].alimenti;
  assert.strictEqual(al[0].g, 80, 'il principale scelto dall\'AI resta');
  assert.strictEqual(al[1].g, 95, 'l\'alternativa viene riscritta dal motore');
});

test('P121 prompt AI — la riga delle alternative ai grassi e\' generata dal motore', () => {
  const riga = win._promptAlternativeGrassi(10);
  assert.match(riga, /Avocado 45g/, 'lo stesso numero che l\'app calcolerebbe');
  assert.ok(riga.split(',').length >= 6, 'tutte le alternative previste sono elencate');
});
