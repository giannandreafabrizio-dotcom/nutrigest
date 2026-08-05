// ── S2 — P128 tappa 1: i dati dell'etichetta da Open Food Facts (5 ago 2026) ──
// DA DOVE NASCE: domanda di Fabrizio — "usiamo il database di Yuka, Open Food
// Facts: non possiamo sfruttarlo appieno?". Verificato: della risposta tenevamo
// quattro numeri (kcal, proteine, carboidrati, grassi) e buttavamo tutto il
// resto, cioè proprio i campi su cui le regole del semaforo dovranno ragionare
// quando il database crescerà col codice a barre.
//
// LA REGOLA CHE QUESTI TEST DIFENDONO: **assente non è zero.** Un prodotto di
// cui Open Food Facts non conosce il sodio deve risultare "sodio: non
// dichiarato", MAI "sodio: 0". Se diventasse zero, un dato mancante
// sembrerebbe un dato buono — ed è il difetto che P128 esiste per non fare.
// Metà dei casi qui sotto verifica proprio questo silenzio.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp, puro } = require('./_loadApp');

const win = loadApp();

// Prodotto realistico e COMPLETO (uno yogurt greco): tutti i campi compilati.
const PIENO = {
  product_name: 'Yogurt greco 0%', product_name_it: 'Yogurt greco 0%',
  brands: 'Marca, Altra', quantity: '150 g', serving_size: '150 g',
  nutriments: {
    'energy-kcal_100g': 57, 'proteins_100g': 10.3, 'carbohydrates_100g': 3.6,
    'sugars_100g': 3.6, 'fat_100g': 0.4, 'saturated-fat_100g': 0.1,
    'fiber_100g': 0, 'salt_100g': 0.1, 'sodium_100g': 0.04,
    'potassium_100g': 0.14, 'phosphorus_100g': 0.11
  },
  allergens_tags: ['en:milk'], traces_tags: ['en:nuts'],
  labels_tags: ['en:gluten-free', 'en:no-added-sugar'],
  ingredients_text_it: 'Latte scremato, fermenti lattici vivi',
  ingredients_tags: ['en:skimmed-milk', 'en:lactic-ferments'],
  categories_tags: ['en:dairies', 'en:yogurts'],
  additives_tags: [], nova_group: 3, nutriscore_grade: 'B',
  image_front_small_url: 'https://example.org/x.jpg'
};

// ═══ 1. Il campo assente resta assente ═══════════════════════════════════
test('P128 — un nutriente non dichiarato vale null, mai 0', () => {
  const et = win._offEstraiEtichetta({ nutriments: { 'energy-kcal_100g': 100 } }, '123', '2026-08-05');
  assert.strictEqual(et.per100g.kcal, 100);
  assert.strictEqual(et.per100g.sale, null, 'il sale non dichiarato NON è sale zero');
  assert.strictEqual(et.per100g.zuccheri, null);
  assert.strictEqual(et.per100g.saturi, null);
  assert.strictEqual(et.per100g.fibra, null);
});

test('P128 — uno zero DICHIARATO resta zero e non diventa "assente"', () => {
  // Il rovescio del test precedente, ed è la metà che si dimentica: un prodotto
  // che dichiara 0 g di fibra ha un dato, e va distinto da chi non lo dichiara.
  const et = win._offEstraiEtichetta(PIENO, '1', '2026-08-05');
  assert.strictEqual(et.per100g.fibra, 0, '0 dichiarato è un dato, non un buco');
  assert.notStrictEqual(et.per100g.fibra, null);
});

test('P128 — _offNum scarta il non-numero invece di ripiegare su 0', () => {
  assert.strictEqual(win._offNum('12,5'), null, 'la virgola non è il formato di Open Food Facts');
  assert.strictEqual(win._offNum('circa 3'), null);
  assert.strictEqual(win._offNum(''), null);
  assert.strictEqual(win._offNum(null), null);
  assert.strictEqual(win._offNum(-1), null, 'un nutriente negativo è un dato sbagliato');
  assert.strictEqual(win._offNum('3.5'), 3.5);
  assert.strictEqual(win._offNum(0), 0, 'zero è un numero valido');
});

test('P128 — la forma dell oggetto è sempre la stessa, anche sul prodotto vuoto', () => {
  const et = win._offEstraiEtichetta({}, null, null);
  assert.deepStrictEqual(puro(Object.keys(et.per100g)).sort(),
    ['carboidrati','fibra','fosforo','grassi','kcal','potassio','proteine','sale','saturi','sodio','zuccheri'],
    'chi legge non deve mai indovinare se una chiave esiste');
  assert.deepStrictEqual(puro(et.allergeni), []);
  assert.deepStrictEqual(puro(et.tracce), []);
  assert.strictEqual(et.ingredienti, null);
  assert.strictEqual(et.nova, null);
});

test('P128 — un prodotto senza nutriments non fa esplodere niente', () => {
  assert.doesNotThrow(() => win._offEstraiEtichetta(null, '1', null));
  assert.doesNotThrow(() => win._offEstraiEtichetta({ nutriments: null }, '1', null));
});

// ═══ 2. Le conversioni che l etichetta non dà ════════════════════════════
test('P128 — le kcal si ricavano dai kJ quando mancano', () => {
  const et = win._offEstraiEtichetta({ nutriments: { 'energy_100g': 418.4 } }, '1', null);
  assert.strictEqual(et.per100g.kcal, 100, '418,4 kJ / 4,184 = 100 kcal');
});

test('P128 — sale e sodio si completano a vicenda (sale = sodio x 2,5)', () => {
  const soloSodio = win._offEstraiEtichetta({ nutriments: { 'sodium_100g': 0.4 } }, '1', null);
  assert.strictEqual(soloSodio.per100g.sale, 1, '0,4 g di sodio = 1 g di sale');
  assert.strictEqual(soloSodio.per100g.sodio, 0.4);
  const soloSale = win._offEstraiEtichetta({ nutriments: { 'salt_100g': 1 } }, '1', null);
  assert.strictEqual(soloSale.per100g.sodio, 0.4);
});

test('P128 — SILENZIO: senza né sale né sodio non si inventa nessuno dei due', () => {
  const et = win._offEstraiEtichetta({ nutriments: {} }, '1', null);
  assert.strictEqual(et.per100g.sale, null);
  assert.strictEqual(et.per100g.sodio, null);
});

// ═══ 3. Allergeni: il dato più affidabile, ma con due trappole ═══════════
test('P128 — i tag arrivano puliti dal prefisso di lingua', () => {
  const et = win._offEstraiEtichetta(PIENO, '1', null);
  assert.deepStrictEqual(puro(et.allergeni), ['milk'], "'en:milk' diventa 'milk'");
  assert.deepStrictEqual(puro(et.tracce), ['nuts']);
});

test('P128 — le dichiarazioni "senza" vengono conservate a parte', () => {
  // LA TRAPPOLA DEL LATTOSIO: l allergene dichiarato è il LATTE, non il lattosio.
  // Un delattosato contiene latte e non contiene lattosio. Senza conservare
  // 'lactose-free' il sistema segnalerebbe come vietato proprio il prodotto
  // fatto apposta per quel paziente. Qui si raccoglie; la regola verrà dopo.
  const et = win._offEstraiEtichetta({ labels_tags: ['en:lactose-free', 'en:organic', 'en:gluten-free'] }, '1', null);
  assert.ok(et.senza.indexOf('lactose free') >= 0, 'il senza-lattosio va tenuto');
  assert.ok(et.senza.indexOf('gluten free') >= 0);
  assert.ok(et.senza.indexOf('organic') < 0, '"biologico" non è una dichiarazione di assenza');
});

test('P128 — i tag doppi o vuoti non sporcano la lista', () => {
  const et = win._offEstraiEtichetta({ allergens_tags: ['en:milk', 'it:milk', '', null, 'en:milk'] }, '1', null);
  assert.deepStrictEqual(puro(et.allergeni), ['milk'], 'stesso allergene in due lingue = una voce');
});

// ═══ 4. Nova e Nutri-Score: raccolti, mai clinici ═══════════════════════
test('P128 — nova e nutriscore si raccolgono in forma normalizzata', () => {
  const et = win._offEstraiEtichetta(PIENO, '1', null);
  assert.strictEqual(et.nova, 3);
  assert.strictEqual(et.nutriscore, 'b', 'minuscolo, per non doverlo normalizzare a valle');
});

test('P128 — un nova non numerico non diventa un numero a caso', () => {
  assert.strictEqual(win._offEstraiEtichetta({ nova_group: 'unknown' }, '1', null).nova, null);
  assert.strictEqual(win._offEstraiEtichetta({ nova_group: null }, '1', null).nova, null);
});

// ═══ 5. Il riepilogo dice anche cosa MANCA ══════════════════════════════
test('P128 — il riepilogo elenca i dati clinici presenti E quelli assenti', () => {
  const pieno = win._offRiepilogo(win._offEstraiEtichetta(PIENO, '1', null));
  assert.deepStrictEqual(puro(pieno.presenti), ['sale', 'zuccheri', 'grassi saturi', 'fibra']);
  assert.deepStrictEqual(puro(pieno.mancanti), []);
  assert.strictEqual(pieno.nAllergeni, 2, 'un allergene + una traccia');

  const scarno = win._offRiepilogo(win._offEstraiEtichetta({ nutriments: { 'energy-kcal_100g': 90 } }, '1', null));
  assert.deepStrictEqual(puro(scarno.presenti), [], 'nessun dato clinico');
  assert.strictEqual(scarno.mancanti.length, 4, 'e tutti e quattro vanno dichiarati mancanti');
});

test('P128 — SILENZIO: senza etichetta il riepilogo non inventa niente', () => {
  const r = win._offRiepilogo(null);
  assert.deepStrictEqual(puro(r.presenti), []);
  assert.deepStrictEqual(puro(r.mancanti), []);
  assert.strictEqual(r.nAllergeni, 0);
});

// ═══ 6. Il record conserva l etichetta ══════════════════════════════════
test('P128 — _migraRecordCustom porta etichetta:null e non un oggetto vuoto', () => {
  const rec = win._migraRecordCustom({ nome: 'Test', categoriaSem: 'Latte & Derivati' });
  assert.strictEqual(rec.etichetta, null,
    'un oggetto vuoto direbbe "letta e non c era niente", che non è la stessa cosa di "mai letta"');
});

test('P128 — un record che ha già l etichetta non la perde nella migrazione', () => {
  const et = win._offEstraiEtichetta(PIENO, '80012', '2026-08-05');
  const rec = win._migraRecordCustom({ nome: 'Yogurt X', categoriaSem: 'Latte & Derivati', etichetta: et });
  assert.ok(rec.etichetta, 'l etichetta deve sopravvivere');
  assert.strictEqual(rec.etichetta.per100g.sale, 0.1);
  assert.strictEqual(rec.etichetta.barcode, '80012');
  assert.strictEqual(rec.etichetta.letto, '2026-08-05', 'la data di lettura è parte del dato: dice quanto è vecchio');
});

test('P128 — i macro del record e quelli dell etichetta restano due cose distinte', () => {
  // Il record ha i valori CONFERMATI da Fabrizio nel form; l etichetta ha quelli
  // GREZZI di Open Food Facts. Se l utente corregge un valore prima di salvare,
  // i due devono poter divergere — altrimenti si perde la traccia di cosa è
  // stato corretto e perché.
  const et = win._offEstraiEtichetta(PIENO, '1', null);
  const rec = win._migraRecordCustom({
    nome: 'Yogurt corretto', categoriaSem: 'Latte & Derivati',
    per100g: { kcal: 60, p: 10, c: 4, g: 0.5 }, etichetta: et
  });
  assert.strictEqual(rec.per100g.kcal, 60, 'vale il valore confermato');
  assert.strictEqual(rec.etichetta.per100g.kcal, 57, "e l'etichetta ricorda quello originale");
});

// ═══ 7. Il riepilogo a schermo ══════════════════════════════════════════
test('P128 — il riepilogo scrive a schermo anche i dati NON dichiarati', () => {
  const d = win.document;
  const el = d.createElement('div'); el.id = 'ac-barcode-riep'; d.body.appendChild(el);
  win._bcMostraRiepilogo(win._offEstraiEtichetta({ nutriments: { 'salt_100g': 1.2 } }, '1', null));
  const t = el.textContent;
  assert.ok(t.indexOf('sale') >= 0, 'deve dire cosa è arrivato');
  assert.ok(t.indexOf('Non dichiarati') >= 0 && t.indexOf('fibra') >= 0,
    'e soprattutto cosa NON è arrivato: un buco taciuto sembra un dato buono');
  win._bcMostraRiepilogo(null);
  assert.strictEqual(el.innerHTML, '', 'senza etichetta il riquadro resta vuoto, non tiene il testo di prima');
  el.remove();
});

// ═══ 8. "Non contiene" oppure "nessuno l ha compilato"? ══════════════════
// Domanda di Fabrizio guardando il mockup: una lista di allergeni vuota su Open
// Food Facts può voler dire due cose opposte, e a schermo sono identiche.
// Il segnale che decide NON è un metadato: è la presenza del testo ingredienti,
// perché è da quello che Open Food Facts ricava gli allergeni.
test('P128 — allergene dichiarato: "contiene", e vale anche fra le tracce', () => {
  const et = win._offEstraiEtichetta({
    allergens_tags: ['en:gluten'], ingredients_text: 'Farina di frumento, acqua, sale'
  }, '1', null);
  assert.strictEqual(win._offStatoAllergene(et, 'gluten'), 'contiene');
  const tracce = win._offEstraiEtichetta({
    traces_tags: ['en:nuts'], ingredients_text: 'Farina, zucchero, uova, burro'
  }, '1', null);
  assert.strictEqual(win._offStatoAllergene(tracce, 'nuts'), 'contiene',
    'una traccia è un rischio, non un silenzio');
});

test('P128 — lista vuota MA ingredienti trascritti: "assente" è un informazione', () => {
  const et = win._offEstraiEtichetta({
    allergens_tags: [], ingredients_text: 'Pomodoro 100%, sale marino, basilico'
  }, '1', null);
  assert.strictEqual(win._offStatoAllergene(et, 'milk'), 'assente');
});

test('P128 — lista vuota SENZA ingredienti: "incompleta", non "assente"', () => {
  // È il cuore della domanda. Senza la lista ingredienti nessuno ha analizzato
  // niente, e l assenza di allergeni non significa "non contiene".
  const senza = win._offEstraiEtichetta({ allergens_tags: [] }, '1', null);
  assert.strictEqual(win._offStatoAllergene(senza, 'milk'), 'incompleta');
  const vuoto = win._offEstraiEtichetta({ allergens_tags: [], ingredients_text: '   ' }, '1', null);
  assert.strictEqual(win._offStatoAllergene(vuoto, 'milk'), 'incompleta');
  const briciola = win._offEstraiEtichetta({ allergens_tags: [], ingredients_text: 'latte' }, '1', null);
  assert.strictEqual(win._offStatoAllergene(briciola, 'milk'), 'incompleta',
    'una parola sola non è una lista ingredienti');
});

test('P128 — SILENZIO: senza etichetta lo stato è "incompleta", mai "assente"', () => {
  assert.strictEqual(win._offStatoAllergene(null, 'milk'), 'incompleta',
    'in dubbio si resta prudenti: un alimento senza etichetta non è un alimento sicuro');
});

test('P128 — più chiavi per lo stesso allergene (glutine = frumento, orzo, farro)', () => {
  const et = win._offEstraiEtichetta({
    allergens_tags: ['en:barley'], ingredients_text: 'Acqua, malto d orzo, luppolo'
  }, '1', null);
  assert.strictEqual(win._offStatoAllergene(et, ['gluten', 'wheat', 'barley']), 'contiene');
  assert.strictEqual(win._offStatoAllergene(et, ['milk']), 'assente');
});

test('P128 — i segnali di completezza si raccolgono ma non decidono da soli', () => {
  // completeness e states_tags entrano nel record come corroborazione. La regola
  // NON ci si appoggia: sono campi che la documentazione non conferma fino in
  // fondo, e una regola clinica non si costruisce su un campo incerto.
  const et = win._offEstraiEtichetta({
    completeness: 0.875, states_tags: ['en:ingredients-to-be-completed'],
    allergens_tags: [], ingredients_text: 'Acqua, zucchero, aromi naturali'
  }, '1', null);
  assert.strictEqual(et.completezza, 0.875);
  assert.deepStrictEqual(puro(et.stati), ['ingredients to be completed']);
  assert.strictEqual(win._offStatoAllergene(et, 'milk'), 'assente',
    'decide la lista ingredienti, non il metadato');
});
