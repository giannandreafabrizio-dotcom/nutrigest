// ── S2 — Registro invii unico p.invii (P87 Tappe 1-2, 28 lug 2026) ──
// Copre le parti che possono rompersi in silenzio:
//   1) l'invariante cronologica del registro (regola 10: ordina alla SCRITTURA);
//   2) la registrazione della richiesta esami nel registro unico (tipo 'analisi')
//      — dal 28/7 _richRegistra NON scrive piu' p.richiesteAnalisi;
//   3) la migrazione p.richiesteAnalisi → p.invii: completa, IDEMPOTENTE
//      (gira senza salvare in tutti i punti d'ingresso dati — regola 12 — quindi
//      una doppia esecuzione non deve mai duplicare), ed elimina la vecchia
//      fonte (F4);
//   4) lo storico nella card Analisi legge dal registro nuovo;
//   5) il bottone FODMAP calcola il suo colore dal registro, non da un flag.
//
// LIMITE DICHIARATO: l'invio reale (WhatsApp, navigator.share, Storage) resta
// verificato manualmente nel browser — dipende da rete e menu di sistema.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();
const inWin = o => win.eval('(' + JSON.stringify(o) + ')');
// _inviiRegistra salva: in questo harness il salvataggio di rete non serve.
win.eval('save = function(){}');

// ── 1. Invariante cronologica ────────────────────────────────────────────────
test('INVII — la scrittura ordina per data: un inserimento fuori ordine non rompe "ultimo = piu recente"', () => {
  const p = inWin({ id: 'x', invii: [] });
  p.invii.push({ data: '2026-07-01', tipo: 'fodmap', titolo: 'a', url: '', esito: 'link' });
  p.invii.push({ data: '2026-05-01', tipo: 'fodmap', titolo: 'b', url: '', esito: 'link' });
  win._inviiRegistra(p, { tipo: 'fodmap', titolo: 'c' });   // oggi
  const date = p.invii.map(v => v.data);
  const ordinate = date.slice().sort();
  // NB: confronti via join — gli array creati nel realm JSDOM hanno un prototipo
  // diverso da quelli di Node e deepStrictEqual li considera sempre diversi.
  assert.strictEqual(date.join(','), ordinate.join(','), 'p.invii deve restare ordinato per data');
  assert.strictEqual(p.invii[p.invii.length - 1].titolo, 'c', 'l\'ultimo elemento e\' il piu\' recente');
});

test('INVII — il registro e\' potato a 50 voci (le piu\' vecchie escono)', () => {
  const p = inWin({ id: 'y', invii: [] });
  for (let i = 0; i < 60; i++) {
    p.invii.push({ data: '2026-01-' + String((i % 28) + 1).padStart(2, '0'), tipo: 't', titolo: 'v' + i, url: '', esito: '' });
  }
  win._inviiRegistra(p, { tipo: 't', titolo: 'ultima' });
  assert.strictEqual(p.invii.length, 50);
  assert.strictEqual(p.invii[49].titolo, 'ultima');
});

test('INVII — _inviiUltimo trova l\'ultimo del tipo richiesto, o null', () => {
  const p = inWin({ id: 'z', invii: [
    { data: '2026-06-01', tipo: 'fodmap', titolo: 'vecchio', url: '', esito: '' },
    { data: '2026-07-01', tipo: 'analisi', titolo: 'esami', url: '', esito: '' },
    { data: '2026-07-10', tipo: 'fodmap', titolo: 'nuovo', url: '', esito: '' }
  ]});
  assert.strictEqual(win._inviiUltimo(p, 'fodmap').titolo, 'nuovo');
  assert.strictEqual(win._inviiUltimo(p, 'piano'), null);
  assert.strictEqual(win._inviiUltimo(inWin({ id: 'w' }), 'fodmap'), null);
});

// ── 2. La richiesta esami scrive nel registro unico ──────────────────────────
test('RICHIESTA ESAMI — _richRegistra scrive p.invii tipo analisi e NON tocca piu\' p.richiesteAnalisi', () => {
  const p = inWin({ id: 'r1' });
  const sezioni = inWin([{ id: 'base', titolo: 'Analisi di base', voci: [{ id: 'emocromo' }, { id: 'glicemia' }] }]);
  win._richRegistra(p, sezioni, 'Valutazione nutrizionale', 'http://pdf');
  assert.strictEqual(p.richiesteAnalisi, undefined, 'la vecchia fonte non deve rinascere');
  assert.strictEqual(p.invii.length, 1);
  const v = p.invii[0];
  assert.strictEqual(v.tipo, 'analisi');
  assert.strictEqual(v.titolo, 'Valutazione nutrizionale');
  assert.strictEqual(v.url, 'http://pdf');
  assert.strictEqual(v.esito, 'link');
  assert.strictEqual(v.voci.join(','), 'base.emocromo,base.glicemia', 'gli id voce restano per il confronto richiesto-vs-ricevuto (P116)');
  assert.strictEqual(v.n, 2);
});

// ── 3. Migrazione ────────────────────────────────────────────────────────────
function pazConStorico() {
  return inWin({ id: 'm1', invii: [], richiesteAnalisi: [
    { data: '2026-07-24', motivo: 'Controllo', voci: ['base.emocromo'], n: 1, url: '' },
    { data: '2026-07-20', motivo: 'Prima visita', voci: ['base.emocromo', 'base.lipidi'], n: 2, url: 'http://x' }
  ]});
}
test('MIGRAZIONE — converte tutto, conserva voci/n/url, ordina, ed elimina la vecchia fonte', () => {
  const p = pazConStorico();
  const n = win._inviiMigraPaziente(p);
  assert.strictEqual(n, 2);
  assert.strictEqual(p.richiesteAnalisi, undefined, 'F4: la doppia fonte si elimina');
  assert.strictEqual(p.invii.length, 2);
  assert.strictEqual(p.invii.map(v => v.data).join(','), '2026-07-20,2026-07-24', 'ordinata per data');
  assert.strictEqual(p.invii[0].esito, 'link');          // aveva url
  assert.strictEqual(p.invii[1].esito, 'pdf-scaricato'); // senza url
  assert.strictEqual(p.invii[0].n, 2);
});

test('MIGRAZIONE — e\' idempotente: se il campo vecchio rientra (blob/backup), niente duplicati', () => {
  const p = pazConStorico();
  win._inviiMigraPaziente(p);
  // Il blob dal server o un backup vecchio rimette in circolo il campo (regola 12)
  p.richiesteAnalisi = inWin([{ data: '2026-07-24', motivo: 'Controllo', voci: ['base.emocromo'], n: 1, url: '' }]);
  const n2 = win._inviiMigraPaziente(p);
  assert.strictEqual(n2, 0, 'la voce esiste gia\': non si duplica');
  assert.strictEqual(p.invii.length, 2);
  assert.strictEqual(p.richiesteAnalisi, undefined);
});

test('MIGRAZIONE — la passata su tutti conta cosa ha toccato e ignora chi non ha storico', () => {
  const lista = inWin([
    { id: 'a', richiesteAnalisi: [{ data: '2026-07-01', motivo: 'x', voci: [], n: 0, url: '' }] },
    { id: 'b' },
    { id: 'c', richiesteAnalisi: [] }
  ]);
  const r = win._inviiMigraTutti(lista);
  assert.strictEqual(r.voci, 1);
  assert.strictEqual(r.pazienti, 1);
  assert.strictEqual(lista[2].richiesteAnalisi, undefined, 'campo vuoto: si toglie e basta');
});

// ── 4. Lo storico legge dal registro nuovo ───────────────────────────────────
test('STORICO — _richStoricoHtml mostra le voci analisi da p.invii (anche migrate)', () => {
  const p = pazConStorico();
  win._inviiMigraPaziente(p);
  const h = win._richStoricoHtml(p);
  assert.ok(h.indexOf('Controllo') >= 0 && h.indexOf('Prima visita') >= 0, 'i motivi migrati compaiono');
  assert.ok(h.indexOf('2 voci') >= 0, 'il conteggio voci sopravvive alla migrazione');
  assert.ok(h.indexOf('http://x') >= 0, 'il link al PDF sopravvive');
  assert.strictEqual(win._richStoricoHtml(inWin({ id: 'v' })), '', 'senza storico, nessun riquadro');
});

// ── 5. Il bottone FODMAP calcola il colore dal registro ──────────────────────
test('FODMAP — bottone grigio senza invii, verde con data dopo un invio', () => {
  const mai = win._fodmapBottoneHtml(inWin({ id: 'f1', invii: [] }));
  assert.ok(/6b7280/.test(mai) && mai.indexOf('Invia elenco FODMAP') >= 0);
  const p = inWin({ id: 'f2', invii: [{ data: '2026-07-28', tipo: 'fodmap', titolo: 'Elenco', url: '', esito: 'link' }] });
  const dopo = win._fodmapBottoneHtml(p);
  assert.ok(/16a34a/.test(dopo), 'verde');
  assert.ok(dopo.indexOf('28/07/2026') >= 0, 'la data mostrata viene dal registro');
});
