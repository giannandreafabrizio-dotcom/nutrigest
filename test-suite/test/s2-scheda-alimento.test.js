// ── S2 — P128 tappa 2: la scheda alimento (5 ago 2026) ──────────────────────
// Vista di sola lettura su un alimento del catalogo. Non tocca dati e non entra
// in nessun calcolo: è il banco di collaudo delle soglie PRIMA che colorino
// qualcosa, e il posto dove il "da valutare" diventa visibile.
//
// La ciambella è in percentuale di CALORIE e non di grammi (decisione di
// Fabrizio): in grammi i grassi risultano schiacciati, perché pesano più del
// doppio per grammo, e la ripartizione non si confronterebbe col target.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp, puro } = require('./_loadApp');

const win = loadApp();

const etichetta = o => win._offEstraiEtichetta(o, '8001', '2026-08-05');

// Si prende la definizione VERA della condizione, non una ricostruita a mano:
// costruirla nel test significherebbe collaudare una configurazione che l app
// non usa — ed è così che un difetto passa i test e arriva in produzione.
const voce = k => {
  const fam = win.eval('_SCH_FAMIGLIE');
  for (const f of fam) for (const v of f.voci) if (v.k === k) return v;
  throw new Error('condizione non trovata nella configurazione reale: ' + k);
};

const REC_PIENO = {
  nome: 'Cracker integrali', categoriaSem: 'Cereali con Glutine', gDefault: 30,
  fonte: 'off', barcode: '8001', per100g: { kcal: 437, p: 10.1, c: 62.0, g: 15.4 },
  etichetta: etichetta({
    nutriments: { 'salt_100g': 1.9, 'sugars_100g': 2.1, 'energy-kcal_100g': 437,
                  'proteins_100g': 10.1, 'carbohydrates_100g': 62, 'fat_100g': 15.4 },
    allergens_tags: ['en:gluten'],
    ingredients_text: 'Farina di frumento integrale 68%, olio di girasole, lievito, sale'
  })
};
const REC_CREA = { nome: 'Petto di pollo', categoriaSem: 'Carne Bianca', gDefault: 150,
  fonte: 'crea', per100g: { kcal: 100, p: 23.3, c: 0, g: 0.8 }, etichetta: null };

// ═══ 1. La ciambella è in calorie ════════════════════════════════════════
test('P128 — le quote sono di CALORIE, non di grammi', () => {
  // 62 C + 10,1 P + 15,4 G → in grammi 71/12/18; in calorie 58/9/32.
  const q = win._schQuoteKcal({ kcal: 437, p: 10.1, c: 62, g: 15.4 });
  assert.ok(Math.abs(q.carb - 58.1) < 0.3, 'carboidrati ~58%, ottenuto ' + q.carb);
  assert.ok(Math.abs(q.prot - 9.5) < 0.3, 'proteine ~9,5%, ottenuto ' + q.prot);
  assert.ok(Math.abs(q.gras - 32.5) < 0.3, 'grassi ~32,5%, ottenuto ' + q.gras);
  assert.ok(q.gras > 30, 'in grammi i grassi sarebbero 18%: è questa la differenza che conta');
});

test('P128 — le tre quote sommano sempre a 100', () => {
  [[1, 1, 1], [0, 50, 0], [62, 10.1, 15.4], [0.5, 0.2, 99]].forEach(function (t) {
    const q = win._schQuoteKcal({ c: t[0], p: t[1], g: t[2] });
    assert.ok(Math.abs(q.carb + q.prot + q.gras - 100) < 1e-6, 'somma ≠ 100 su ' + t.join('/'));
  });
});

test('P128 — SILENZIO: senza macro non si inventa nessuna ciambella', () => {
  assert.strictEqual(win._schQuoteKcal(null), null);
  assert.strictEqual(win._schQuoteKcal({}), null, 'un alimento a zero non ha una ripartizione');
  assert.strictEqual(win._schQuoteKcal({ c: 0, p: 0, g: 0 }), null);
  const h = win._schHtml({ nome: 'Vuoto', per100g: null, etichetta: null }, false);
  assert.ok(h.indexOf('valori non impostati') >= 0 || h.indexOf('non ha i valori') >= 0);
});

// ═══ 2. Gli stati delle condizioni ═══════════════════════════════════════
test('P128 — il numero sopra soglia è valutato, non "da valutare"', () => {
  const st = win._schStatoCondizione(REC_PIENO, voce('pat-ipert'));
  assert.strictEqual(st.s, 'no');
  assert.ok(st.m.indexOf('sopra la soglia') >= 0);
  assert.ok(st.m.indexOf('1,9') >= 0, 'il motivo porta il numero, non solo il verdetto');
});

test('P128 — il dato che manca dà "da valutare" col motivo giusto', () => {
  const st = win._schStatoCondizione(REC_PIENO, voce('pat-lipidi'));
  assert.strictEqual(st.s, 'valutare');
  assert.strictEqual(st.m, 'il dato manca in etichetta',
    'questo si risolve digitando un numero dall etichetta vera');
});

test('P128 — le condizioni non deducibili dicono PERCHÉ non lo sono', () => {
  const st = win._schStatoCondizione(REC_PIENO, voce('all-nichel'));
  assert.strictEqual(st.s, 'valutare');
  assert.strictEqual(st.m, 'non si deduce dall\'etichetta',
    'e questo NON si risolverà mai da solo: sono due buchi diversi');
});

test('P128 — l alimento senza etichetta non finisce mai "valutato" sui numeri', () => {
  ['sale', 'zuccheri', 'saturi'].forEach(function (campo) {
    const st = win._schStatoCondizione(REC_CREA, { k: 'x', lab: 'X', campo: campo });
    assert.strictEqual(st.s, 'valutare', campo + ': un CREA-INRAN non ha etichetta');
  });
});

test('P128 — glutine dichiarato: valutato e negativo', () => {
  const st = win._schStatoCondizione(REC_PIENO, voce('all-glutine'));
  assert.strictEqual(st.s, 'no');
});

test('P128 — lattosio: "contiene latte" non è "vietato"', () => {
  // La trappola: l allergene obbligatorio è il LATTE, non il lattosio. Un
  // delattosato contiene latte e non contiene lattosio.
  const rec = { nome: 'Yogurt', per100g: { kcal: 57, p: 10, c: 4, g: 0.4 },
    etichetta: etichetta({ allergens_tags: ['en:milk'], ingredients_text: 'Latte scremato, fermenti lattici' }) };
  const st = win._schStatoCondizione(rec, voce('all-lattosio'));
  assert.strictEqual(st.s, 'attenzione', 'attenzione, non divieto');
  assert.ok(st.m.indexOf('delattosato') >= 0, 'e deve dire cosa andare a verificare');

  const dela = { nome: 'Yogurt senza lattosio', per100g: { kcal: 57, p: 10, c: 4, g: 0.4 },
    etichetta: etichetta({ allergens_tags: ['en:milk'], labels_tags: ['en:lactose-free'],
      ingredients_text: 'Latte scremato delattosato, fermenti lattici' }) };
  const st2 = win._schStatoCondizione(dela, voce('all-lattosio'));
  assert.strictEqual(st2.s, 'ok', 'col "senza lattosio" dichiarato il prodotto è ammesso');
});

test('P128 — SILENZIO: lista vuota senza ingredienti resta "da valutare"', () => {
  const rec = { nome: 'Biscotti', per100g: { kcal: 468, p: 6.6, c: 68, g: 18 },
    etichetta: etichetta({ allergens_tags: [] }) };
  const st = win._schStatoCondizione(rec, voce('all-glutine'));
  assert.strictEqual(st.s, 'valutare');
  assert.ok(st.m.indexOf('incompleta') >= 0);
});

// ═══ 3. Il dato mancante è disegnato come mancante ═══════════════════════
test('P128 — un nutriente non dichiarato si legge "non dichiarato", non "0"', () => {
  const h = win._schHtml(REC_PIENO, false);
  assert.ok(h.indexOf('non dichiarato') >= 0, 'saturi e fibra mancano e devono dirlo');
  assert.ok(h.indexOf('Open Food Facts non ce l') >= 0, 'e devono dire di chi è il buco');
});

test('P128 — l alimento CREA dichiara di non avere un etichetta', () => {
  const h = win._schHtml(REC_CREA, false);
  assert.ok(h.indexOf('non viene da una scansione') >= 0);
  assert.ok(h.indexOf('non vanno letti come zero') >= 0);
});

test('P128 — la scheda dichiara SEMPRE da dove vengono le soglie', () => {
  // Scelta di Fabrizio del 5 ago 2026: si adottano le soglie britanniche come
  // punto di partenza, perché un alimento valutato con una soglia grossolana è
  // meglio di uno che nessuno ha guardato. Ma la provenienza va dichiarata, e
  // va dichiarato che sono da rivalutare: una soglia senza la sua fonte è una
  // soglia che nessuno saprà più rivedere.
  const h = win._schHtml(REC_PIENO, false);
  assert.ok(h.indexOf('UK FSA') >= 0, 'la fonte deve essere scritta a schermo');
  assert.ok(h.indexOf('scaffale') >= 0, 'e va detto che sono soglie da scaffale, non cliniche');
  assert.ok(h.indexOf('Da rivalutare') >= 0, 'e che sono provvisorie');
  assert.ok(h.indexOf('non colora il semaforo del piano') >= 0,
    'e che restano confinate a questa scheda');
});

// ═══ 4. L interruttore porzione ═════════════════════════════════════════
test('P128 — la porzione scala i macro ma NON le soglie', () => {
  const cento = win._schHtml(REC_PIENO, false);
  const porz = win._schHtml(REC_PIENO, true);
  assert.ok(cento.indexOf('437') >= 0, 'a 100 g sono 437 kcal');
  assert.ok(porz.indexOf('131') >= 0, 'su 30 g sono 131 kcal');
  assert.ok(cento.indexOf('soglia UK FSA') >= 0, 'a 100 g il metro delle soglie c è, con la fonte');
  assert.ok(porz.indexOf('su 30 g') >= 0, 'sulla porzione si dichiara la base, e il metro sparisce');
});

test('P128 — il contatore "da valutare" conta davvero', () => {
  const h = win._schHtml(REC_PIENO, false);
  const m = h.match(/(\d+) valutate/);
  assert.ok(m, 'il contatore deve esserci');
  const daValutare = (h.match(/>da valutare</g) || []).length;
  assert.ok(daValutare >= 9, 'le nove condizioni non deducibili sono sempre da valutare, ottenute ' + daValutare);
});

test('P128 — la dichiarazione "senza" viene PRIMA dell allergene', () => {
  // Caso reale: un prodotto senza glutine certificato può avere "tracce di
  // frumento" nella trascrizione. Se vincesse l allergene, il prodotto
  // certificato risulterebbe vietato al celiaco per cui è stato fatto.
  const rec = { nome: 'Pane senza glutine', per100g: { kcal: 250, p: 3, c: 50, g: 4 },
    etichetta: etichetta({ allergens_tags: ['en:gluten'], labels_tags: ['en:gluten-free'],
      ingredients_text: 'Amido di mais, acqua, lievito, sale, fibra vegetale' }) };
  const st = win._schStatoCondizione(rec, voce('all-glutine'));
  assert.strictEqual(st.s, 'ok');
  assert.ok(st.m.indexOf('senza') >= 0);
});

// ═══ 5. Rifiniture trovate guardando la scheda in un browser ═════════════
test('P128 — avere il numero non è averlo valutato', () => {
  // L insufficienza renale ha il sodio ma NON ha una soglia clinica: dire
  // "valutato" sarebbe la stessa bugia del bianco che significa due cose.
  const st = win._schStatoCondizione(REC_PIENO, voce('pat-irc'));
  assert.strictEqual(st.s, 'valutare', 'senza soglia non c è giudizio');
  assert.ok(st.m.indexOf('soglia da definire') >= 0, 'e va detto perché');
  assert.ok(/\d/.test(st.m), 'col dato accanto, che comunque serve');
});

test('P128 — i tag allergeni si leggono in italiano', () => {
  assert.strictEqual(win._schTrad('milk'), 'latte');
  assert.strictEqual(win._schTrad('sesame seeds'), 'sesamo');
  assert.strictEqual(win._schTrad('lactose free'), 'senza lattosio');
  assert.strictEqual(win._schTrad('qualcosa di ignoto'), 'qualcosa di ignoto',
    'un tag che non conosciamo resta com è: meglio una parola inglese che una sparita');
  const h = win._schHtml(REC_PIENO, false);
  assert.ok(h.indexOf('frumento') >= 0, 'en:wheat deve arrivare a schermo come frumento');
});
