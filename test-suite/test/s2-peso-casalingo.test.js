// ── S2 — P35: i numeri del peso casalingo (5 ago 2026) ───────────────────────
// DA DOVE NASCE: la sezione "Peso casalingo" mostrava un elenco e due numeri
// sbagliati. Il Δ di ogni pesata era calcolato contro il PRIMO PESO INBODY,
// cioè contro la bilancia dello studio: lo scarto di taratura fra le due
// bilance traslava tutto lo storico casalingo, e il paziente si vedeva addosso
// un ritardo il giorno stesso in cui iniziava. Ed è la famiglia di F4/P118/P120
// — due fonti sullo stesso fatto — con la correzione di sempre: ogni serie si
// confronta con la PROPRIA prima misura.
//
// LA METÀ PIÙ IMPORTANTE DI QUESTI TEST È IL SILENZIO (regola 19). Un numero
// che compare quando il dato non lo regge è peggio di un numero assente: due
// pesate a tre giorni di distanza con ±0,4 kg di rumore danno "−1,9 kg a
// settimana" senza che sia successo niente. Metà dei casi qui sotto verifica
// che il numero NON si calcoli.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp, puro } = require('./_loadApp');

const win = loadApp();

// ── strumenti ──────────────────────────────────────────────────────────────
const G = 86400000;
// costruisce date locali a partire da un giorno 0, così i test non dipendono
// dal fuso né dall'ora di esecuzione
function gg(n, base) {
  const d = new Date(base || new Date(2026, 3, 1)); // 1 apr 2026, locale
  d.setDate(d.getDate() + n);
  return win.ymdLoc(d);
}
// paziente sintetico: pesate a offset di giorni dal 1 apr
const paz = (casa, studio) => ({
  id: 'T1',
  pesiIntermedi: (casa || []).map(([n, kg]) => ({ data: gg(n), peso: kg })),
  inbody: (studio || []).map(([n, kg]) => ({ data: gg(n), peso: kg })),
});
const mappaDi = casa => win._pcasMappa(win._pcasSerie(paz(casa)).casa);
const statDi = (casa, a, b) => win._pcasStat(mappaDi(casa), gg(a), gg(b));

// serie fitta e regolare: −0,5 kg a settimana esatti, una pesata al giorno
const FITTA = [];
for (let i = 0; i <= 56; i++) FITTA.push([i, +(80 - 0.5 * i / 7).toFixed(3)]);

// ═══ 1. Le due serie non si fondono mai ═══════════════════════════════════
test('P35 — _pcasSerie tiene casa e studio separate', () => {
  const s = win._pcasSerie(paz([[0, 79.2], [3, 78.8]], [[0, 78.4]]));
  assert.strictEqual(s.casa.length, 2, 'due pesate a casa');
  assert.strictEqual(s.studio.length, 1, 'una misurazione in studio');
  assert.strictEqual(s.casa[0].peso, 79.2);
  assert.strictEqual(s.studio[0].peso, 78.4);
});

test('P35 — le pesate senza data o senza peso vengono scartate, non azzerate', () => {
  const p = { id: 'T', pesiIntermedi: [
    { data: gg(0), peso: 79.2 }, { data: '', peso: 80 }, { data: gg(2), peso: null },
    { data: 'non-una-data', peso: 78 }, { data: gg(3), peso: '78,5' }, { data: gg(4), peso: 78.1 },
    { data: gg(6), peso: 'settantotto' },
  ] };
  const s = win._pcasSerie(p);
  assert.strictEqual(s.casa.length, 3, 'restano le tre righe con un peso leggibile');
  assert.deepStrictEqual(puro(s.casa.map(x => x.peso)), [79.2, 78.5, 78.1],
    'la virgola italiana vale 78,5 — parseFloat da solo la leggerebbe 78, mezzo chilo di errore muto');
});

test('P35 — _pcasNumero non ripiega mai su un numero plausibile', () => {
  assert.strictEqual(win._pcasNumero('78,5'), 78.5);
  assert.strictEqual(win._pcasNumero('78.5'), 78.5);
  assert.strictEqual(win._pcasNumero(78.5), 78.5);
  assert.strictEqual(win._pcasNumero('78,5 kg'), null, 'con l unità appresso non è un numero');
  assert.strictEqual(win._pcasNumero('circa 78'), null);
  assert.strictEqual(win._pcasNumero(''), null);
  assert.strictEqual(win._pcasNumero(null), null);
});

// ═══ 2. Media mobile su finestra di DATE, non sulle ultime righe ══════════
test('P35 — la media mobile usa i giorni, non le righe dell array', () => {
  // 4 pesate consecutive, poi un buco di 40 giorni, poi una sola pesata.
  const m = mappaDi([[0, 80], [1, 80], [2, 80], [3, 80], [43, 70]]);
  // sul giorno 43 la finestra ±3 contiene UNA sola pesata → niente media,
  // anche se "le ultime 7 righe" darebbero un numero.
  assert.strictEqual(win._pcasMedia(m, gg(43)).v, null,
    'con una pesata sola nella finestra la media non deve esistere');
  // sul giorno 1 la finestra ne contiene 4 → media = 80
  assert.strictEqual(win._pcasMedia(m, gg(1)).v, 80);
});

test('P35 — la media mobile è la media vera delle pesate in finestra', () => {
  const m = mappaDi([[10, 79.0], [11, 80.0], [12, 81.0]]);
  assert.strictEqual(win._pcasMedia(m, gg(11)).v, 80,
    '(79+80+81)/3 = 80');
  assert.strictEqual(win._pcasMedia(m, gg(11)).n, 3);
});

test('P35 — SILENZIO: sotto le 3 pesate in finestra la media non si disegna', () => {
  const m = mappaDi([[10, 79.0], [11, 80.0]]);
  assert.strictEqual(win._pcasMedia(m, gg(10)).v, null, 'due pesate non bastano');
  assert.strictEqual(win._pcasMedia(m, gg(10)).n, 2, 'ma il conteggio resta leggibile');
});

// ═══ 3. Velocità: il numero deve essere quello vero ═══════════════════════
test('P35 — su una serie a −0,5 kg/sett la velocità misurata è −0,5', () => {
  const s = statDi(FITTA, 0, 56);
  assert.strictEqual(s.ok, true, 'il numero deve calcolarsi');
  assert.ok(Math.abs(s.vel + 0.5) < 0.01, 'atteso circa −0,50, ottenuto ' + s.vel);
  // la variazione è quella fra i CENTRI dei due gruppi, non fra gli estremi della
  // finestra: su 50 giorni misurati a −0,5 kg/sett fanno −3,57 kg, non −4,0.
  assert.strictEqual(s.ggMisurati, 50, 'i giorni davvero misurati sono centro-a-centro');
  assert.ok(Math.abs(s.dKg + 3.57) < 0.05, 'atteso circa −3,57 kg, ottenuto ' + s.dKg);
});

test('P35 — l etichetta della variazione dichiara i giorni MISURATI, non la finestra', () => {
  // stessa famiglia del difetto "Ultima settimana": un numero non deve mai essere
  // presentato con un denominatore più grande di quello su cui è stato calcolato.
  const s = statDi(FITTA, 0, 56);
  assert.ok(s.ggMisurati < s.gg,
    'i giorni misurati devono essere meno della finestra (' + s.ggMisurati + ' vs ' + s.gg + ')');
  const html = win._renderPesiIntermediSection(paz(FITTA));
  assert.ok(html.indexOf('misurata su ' + s.ggMisurati + ' giorni') >= 0,
    'la tessera deve dichiarare i giorni misurati');
});

test('P35 — il rumore di una singola mattina non sposta il risultato', () => {
  // stessa serie, ma la primissima e l ultima pesata sono "storte" di 1,5 kg:
  // con due pesate singole il calcolo sballerebbe, con le medie no.
  const storta = FITTA.map(([n, kg], i) =>
    i === 0 ? [n, kg + 1.5] : i === FITTA.length - 1 ? [n, kg - 1.5] : [n, kg]);
  const pulita = statDi(FITTA, 0, 56).vel;
  const sporca = statDi(storta, 0, 56).vel;
  assert.ok(Math.abs(sporca - pulita) < 0.08,
    'due pesate anomale non devono spostare la velocità di più di 0,08 kg/sett (' + pulita + ' → ' + sporca + ')');
});

test('P35 — un paziente che si pesa due volte a settimana ottiene comunque i numeri', () => {
  // il difetto trovato in collaudo: con gruppi di estremo fissi a 7 giorni,
  // chi si pesa lun e gio ha UNA pesata nei primi 7 giorni e il numero spariva.
  const rada = [];
  for (let i = 0; i <= 84; i += 1) if (i % 7 === 0 || i % 7 === 3) rada.push([i, +(80 - 0.5 * i / 7).toFixed(3)]);
  const s = statDi(rada, 0, 84);
  assert.strictEqual(s.ok, true, 'con due pesate a settimana il numero deve comparire');
  assert.ok(Math.abs(s.vel + 0.5) < 0.05, 'atteso circa −0,50, ottenuto ' + s.vel);
});

test('P35 — il divisore è la distanza vera fra i gruppi, non la lunghezza della finestra', () => {
  // Le pesate finiscono al giorno 28 ma la finestra arriva al 40: se il divisore
  // fosse 40/7 la velocità risulterebbe più lenta del vero.
  const dati = [];
  for (let i = 0; i <= 28; i++) dati.push([i, +(80 - 0.5 * i / 7).toFixed(3)]);
  const s = statDi(dati, 0, 40);
  assert.strictEqual(s.ok, true);
  assert.ok(Math.abs(s.vel + 0.5) < 0.06,
    'la velocità deve restare −0,5 kg/sett, non diluirsi sulla coda vuota (ottenuto ' + s.vel + ')');
  assert.ok(s.ggMisurati <= 28, 'e i giorni dichiarati non superano quelli con dato');
});

test('P35 — SILENZIO: se la coda della finestra è vuota, nessun numero inventato', () => {
  // stesse pesate, ma la finestra arriva al giorno 90: il gruppo di destra non
  // trova nulla nemmeno allargandosi a 21 giorni.
  const dati = [];
  for (let i = 0; i <= 28; i++) dati.push([i, +(80 - 0.5 * i / 7).toFixed(3)]);
  const s = statDi(dati, 0, 90);
  assert.strictEqual(s.ok, false, 'meglio nessun numero che un numero su una coda vuota');
  assert.strictEqual(s.motivo, 'pesate');
});

test('P35 — peso fermo: la velocità è zero, non un numero qualsiasi', () => {
  const piatta = [];
  for (let i = 0; i <= 56; i++) piatta.push([i, 80]);
  const s = statDi(piatta, 0, 56);
  assert.strictEqual(s.ok, true);
  assert.strictEqual(s.dKg, 0);
  assert.strictEqual(s.vel, 0);
});

// ═══ 4. SILENZIO — metà del collaudo ══════════════════════════════════════
test('P35 — SILENZIO: finestra più corta di 14 giorni, nessun numero', () => {
  const s = statDi(FITTA, 0, 13);
  assert.strictEqual(s.ok, false);
  assert.strictEqual(s.motivo, 'finestra');
});

test('P35 — SILENZIO: una sola pesata per lato, nessun numero', () => {
  const s = statDi([[0, 80], [60, 76]], 0, 60);
  assert.strictEqual(s.ok, false, 'due pesate isolate non fanno una velocità');
  assert.strictEqual(s.motivo, 'pesate');
});

test('P35 — SILENZIO: finestra sopra un buco senza pesate', () => {
  const s = statDi([[0, 80], [1, 80], [2, 80], [80, 74], [81, 74], [82, 74]], 20, 60);
  assert.strictEqual(s.ok, false, 'dentro il buco non c è niente da misurare');
});

test('P35 — SILENZIO: pesate tutte ravvicinate, i due gruppi coincidono', () => {
  // 4 pesate in 4 giorni dentro una finestra di 14: i gruppi di estremo si
  // sovrappongono e la distanza fra i centri sta sotto la settimana.
  const s = statDi([[5, 80], [6, 80.2], [7, 79.8], [8, 80.1]], 0, 14);
  assert.strictEqual(s.ok, false);
  assert.strictEqual(s.motivo, 'ravvicinate',
    'non è "mancano pesate": ce ne sono quattro, ma tutte nello stesso punto del tempo');
});

test('P35 — SILENZIO: pesate al centro di una finestra lunga e vuota agli estremi', () => {
  const s = statDi([[30, 80], [31, 80.2], [32, 79.8], [33, 80.1], [34, 79.9]], 0, 60);
  assert.strictEqual(s.ok, false);
  assert.strictEqual(s.motivo, 'pesate', 'agli estremi della finestra non c è niente');
});

test('P35 — SILENZIO: nessuna pesata, nessun modello e nessun errore', () => {
  assert.strictEqual(win._pcasModello({ id: 'V', pesiIntermedi: [], inbody: [] }), null);
  assert.strictEqual(win._pcasModello({ id: 'V' }), null);
});

// ═══ 5. Fascia di ritmo — Regola A (P132) ═════════════════════════════════
test('P35 — la fascia è una percentuale del peso di adesso, non un numero fisso', () => {
  const a = win._pcasFascia(80), b = win._pcasFascia(60);
  assert.ok(Math.abs(a.rapido + 0.56) < 1e-9, '0,7% di 80 = 0,56');
  assert.ok(Math.abs(a.lento + 0.24) < 1e-9, '0,3% di 80 = 0,24');
  assert.ok(b.rapido > a.rapido, 'sul paziente più leggero la fascia si stringe');
});

test('P35 — la fascia non esiste senza un peso', () => {
  assert.strictEqual(win._pcasFascia(null), null);
  assert.strictEqual(win._pcasFascia(0), null);
});

test('P35 — il giudizio distingue rapido / dentro / lento', () => {
  const f = win._pcasFascia(80); // −0,56 … −0,24
  assert.strictEqual(win._pcasGiudizio(-0.80, f), 'rapido');
  assert.strictEqual(win._pcasGiudizio(-0.40, f), 'dentro');
  assert.strictEqual(win._pcasGiudizio(-0.10, f), 'lento');
  assert.strictEqual(win._pcasGiudizio(+0.30, f), 'lento', 'anche il peso che sale è "non abbastanza rapido", non un allarme');
});

test('P35 — SILENZIO: i bordi esatti della fascia non sono fuori fascia', () => {
  const f = win._pcasFascia(80);
  assert.strictEqual(win._pcasGiudizio(f.rapido, f), 'dentro', 'il bordo rapido è ancora dentro');
  assert.strictEqual(win._pcasGiudizio(f.lento, f), 'dentro', 'il bordo lento è ancora dentro');
});

test('P35 — SILENZIO: senza velocità o senza fascia non si giudica', () => {
  assert.strictEqual(win._pcasGiudizio(null, win._pcasFascia(80)), null);
  assert.strictEqual(win._pcasGiudizio(-0.5, null), null);
  assert.strictEqual(win._pcasGiudizio(NaN, win._pcasFascia(80)), null);
});

// ═══ 6. Date locali (regola 16 / s1-date-locali) ══════════════════════════
test('P35 — le date restano locali e non slittano di un giorno', () => {
  assert.strictEqual(win._pcasAddGg('2026-03-28', 4), '2026-04-01', 'attraversa il cambio dell ora legale');
  assert.strictEqual(win._pcasAddGg('2026-10-24', 4), '2026-10-28', 'e anche quello di ottobre');
  assert.strictEqual(win._pcasGgTra('2026-03-28', '2026-04-01'), 4);
  assert.strictEqual(win._pcasGgTra('2026-10-24', '2026-10-28'), 4);
  assert.strictEqual(win._pcasGgTra('2026-01-01', '2026-12-31'), 364);
});

test('P35 — una data malformata non diventa oggi né NaN', () => {
  assert.strictEqual(win._pcasData('boh'), null);
  assert.strictEqual(win._pcasAddGg('boh', 3), null);
  assert.strictEqual(win._pcasGgTra('boh', '2026-04-01'), null);
});

// ═══ 7. Il Δ dell elenco parte dalla prima pesata A CASA ══════════════════
test('P35 — il delta della lista non usa più il peso InBody come base', () => {
  // bilancia di casa tarata 0,8 kg più alta: se la base fosse il peso studio,
  // il primo giorno mostrerebbe +0,8 kg senza che il paziente abbia fatto nulla.
  const p = paz([[0, 79.2], [30, 76.4]], [[0, 78.4]]);
  const html = win._renderPesiIntermediSection(p);
  assert.ok(html.indexOf('−2,8 kg') >= 0,
    'il delta deve essere 76,4 − 79,2 = −2,8 (contro la prima pesata a casa)');
  assert.ok(html.indexOf('−4,4 kg') < 0 && html.indexOf('+0,8 kg') < 0,
    'non deve comparire nessun delta calcolato contro il peso dello studio');
});

test('P35 — l etichetta dell ultima variazione dice i giorni veri', () => {
  const html = win._renderPesiIntermediSection(paz([[0, 80], [21, 78.7]]));
  assert.ok(html.indexOf('Ultima settimana') < 0,
    'non deve più dire "Ultima settimana" quando sono passati 21 giorni');
  assert.ok(html.indexOf('Negli ultimi 21 giorni') >= 0, 'deve dichiarare l intervallo vero');
});

// ═══ 8. Il disegno non esplode sui casi limite ════════════════════════════
test('P35 — la sezione si disegna anche senza nessuna pesata', () => {
  const html = win._renderPesiIntermediSection({ id: 'V', pesiIntermedi: [], inbody: [] });
  assert.ok(html.indexOf('Nessuna pesata registrata') >= 0);
  assert.ok(html.indexOf('<svg') < 0, 'niente grafico quando non c è niente da disegnare');
});

test('P35 — con una sola pesata non si disegna un grafico', () => {
  const html = win._renderPesiIntermediSection(paz([[0, 80]]));
  assert.ok(html.indexOf('<svg') < 0, 'un punto solo non è un andamento');
});

test('P35 — con due pesate il grafico compare e contiene le due serie', () => {
  const html = win._renderPesiIntermediSection(paz(FITTA, [[0, 79.2], [56, 75.2]]));
  assert.ok(html.indexOf('<svg') >= 0, 'il grafico deve esserci');
  assert.ok(html.indexOf('pcas-barra') >= 0, 'la barra di scorrimento deve esserci');
  assert.ok(html.indexOf('Pesate a casa') >= 0 && html.indexOf('Bilancia studio') >= 0,
    'gli interruttori delle due serie devono esserci');
});

test('P35 — tutte le pesate nello stesso giorno: nessun crash, nessun numero', () => {
  const p = paz([[5, 80], [5, 80.5], [5, 79.5]]);
  assert.doesNotThrow(() => win._renderPesiIntermediSection(p));
  const s = statDi([[5, 80]], 5, 5);
  assert.strictEqual(s.ok, false);
});

// ═══ 9. Tetto della lista e indice di eliminazione ════════════════════════
test('P35 — la lista si ferma a 10 righe e offre di aprirsi', () => {
  const html = win._renderPesiIntermediSection(paz(FITTA)); // 57 pesate
  const righe = (html.match(/eliminaPesoIntermedio/g) || []).length;
  assert.strictEqual(righe, 10, 'devono comparire solo le ultime 10 righe');
  assert.ok(html.indexOf('Mostra tutte le 57 pesate') >= 0, 'e il bottone deve dire quante sono in tutto');
});

test('P35 — sotto le 10 pesate non compare nessun bottone', () => {
  const poche = FITTA.slice(0, 6);
  const html = win._renderPesiIntermediSection(paz(poche));
  assert.ok(html.indexOf('Mostra tutte') < 0);
});

test('P35 — l indice passato a eliminaPesoIntermedio è quello dell array ordinato', () => {
  // Il rischio: la lista mostra solo le ultime 10 righe, ma l array ne ha 57.
  // Se l indice fosse quello della VISTA, cliccare la ✕ su una riga cancellerebbe
  // un altra pesata — un errore invisibile perché la lista si ridisegna comunque.
  const html = win._renderPesiIntermediSection(paz(FITTA));
  const idx = [...html.matchAll(/eliminaPesoIntermedio\('T1',(\d+)\)/g)].map(m => +m[1]);
  assert.deepStrictEqual(puro(idx), [56, 55, 54, 53, 52, 51, 50, 49, 48, 47],
    'la riga in cima è l ultima pesata, cioè l indice 56 dell array ordinato');
});
