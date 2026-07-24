// ── S2 — Referti del sangue datati (P118 tappa 1) ──
// Il punto delicato di questa tappa non e' l'interfaccia, e' la REGOLA che
// tiene insieme due rappresentazioni dello stesso dato:
//   · p.refertiSangue[] — cosa ha misurato ogni laboratorio, quel giorno;
//   · p.analisiSangue   — il quadro clinico ATTUALE, derivato: per ogni esame
//     il valore misurato piu' di recente. Lo leggono contesto AI, generatore
//     piani, calcoli derivati, gruppi clinici e richiesta esami (P116).
// Se questa derivazione sbaglia, l'errore non si vede a video: si vede nei
// piani generati. Da qui i test.
//
// LIMITE DICHIARATO: selettore, campo data e modale di conferma import sono
// interfaccia e restano verificati a mano nel browser.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

function K(win, nome) { return win.eval('ANALISI_KEY')(nome); }
function valori(win, coppie) {
  const o = {};
  Object.keys(coppie).forEach(function (n) { o[K(win, n) + '_val'] = String(coppie[n]); });
  return o;
}
function paz(extra) {
  return Object.assign({ id: 'p1', nome: 'Mario', cognome: 'Rossi', analisiSangue: {} }, extra || {});
}

test('P118 — migrazione: i valori vecchi diventano un referto, senza inventare la data', () => {
  const win = loadApp();
  const p = paz({ analisiSangue: valori(win, { 'Glicemia a digiuno': 92, 'TSH': 2.1 }) });
  const fatto = win._refertiMigra(p);
  assert.strictEqual(fatto, true);
  assert.strictEqual(p.refertiSangue.length, 1);
  assert.strictEqual(p.refertiSangue[0].data, '', 'senza indizi la data resta vuota, non "oggi"');
  assert.strictEqual(p.refertiSangue[0].dataStimata, true);
  assert.strictEqual(win._refertoConteggio(p.refertiSangue[0]), 2);
});

test('P118 — migrazione: se esiste la provenienza degli import, la data si deduce e resta marcata', () => {
  const win = loadApp();
  const p = paz({
    analisiSangue: valori(win, { 'Glicemia a digiuno': 92 }),
    _analisiMeta: {
      [K(win, 'Glicemia a digiuno')]: { fonte: 'ai-import', data: '2026-03-14T10:00:00.000Z', file: 'a.pdf' },
      [K(win, 'TSH')]: { fonte: 'ai-import', data: '2026-05-02T10:00:00.000Z', file: 'b.pdf' }
    }
  });
  win._refertiMigra(p);
  assert.strictEqual(p.refertiSangue[0].data, '2026-05-02', 'prende la piu' + "'" + ' recente');
  assert.strictEqual(p.refertiSangue[0].dataStimata, false);
});

test('P118 — migrazione: idempotente, e non crea nulla su un paziente senza valori', () => {
  const win = loadApp();
  const p = paz({ analisiSangue: valori(win, { 'TSH': 2.1 }) });
  win._refertiMigra(p);
  const idPrimo = p.refertiSangue[0].id;
  assert.strictEqual(win._refertiMigra(p), false, 'la seconda chiamata non deve fare nulla');
  assert.strictEqual(p.refertiSangue.length, 1);
  assert.strictEqual(p.refertiSangue[0].id, idPrimo);

  const vuoto = paz({ analisiSangue: { TSH_val: '', altro_val: '   ' } });
  assert.strictEqual(win._refertiMigra(vuoto), false);
  assert.strictEqual(vuoto.refertiSangue.length, 0);
});

test('P118 — ordinamento: dal piu' + "'" + ' recente al piu' + "'" + ' vecchio, i senza data in fondo', () => {
  const win = loadApp();
  const p = paz({
    refertiSangue: [
      { id: 'b', data: '2026-01-10', valori: {} },
      { id: 'senza', data: '', valori: {} },
      { id: 'a', data: '2026-06-01', valori: {} }
    ]
  });
  assert.deepStrictEqual(win._refertiOrdinati(p).map(function (r) { return r.id; }), ['a', 'b', 'senza']);
  assert.strictEqual(win._refertoPiuRecente(p).id, 'a');
});

test('P118 — il quadro attuale prende, esame per esame, la misura piu' + "'" + ' recente', () => {
  const win = loadApp();
  const p = paz({
    refertiSangue: [
      { id: 'vecchio', data: '2026-01-10', valori: valori(win, { 'Glicemia a digiuno': 88, 'Vitamina D (25-OH)': 22, 'TSH': 2.0 }) },
      { id: 'nuovo', data: '2026-06-01', valori: valori(win, { 'Glicemia a digiuno': 104, 'TSH': 3.1 }) }
    ]
  });
  win._refertiApplica(p);
  const as = p.analisiSangue;
  assert.strictEqual(as[K(win, 'Glicemia a digiuno') + '_val'], '104', 'vince il referto recente');
  assert.strictEqual(as[K(win, 'TSH') + '_val'], '3.1');
  assert.strictEqual(as[K(win, 'Vitamina D (25-OH)') + '_val'], '22',
    'un esame non ripetuto nel referto nuovo NON deve sparire dal quadro attuale');
});

test('P118 — i valori vuoti di un referto recente non cancellano quelli vecchi', () => {
  const win = loadApp();
  const p = paz({
    refertiSangue: [
      { id: 'vecchio', data: '2026-01-10', valori: valori(win, { 'TSH': '2.0' }) },
      { id: 'nuovo', data: '2026-06-01', valori: { [K(win, 'TSH') + '_val']: '   ' } }
    ]
  });
  win._refertiApplica(p);
  assert.strictEqual(p.analisiSangue[K(win, 'TSH') + '_val'], '2.0');
});

test('P118 — un referto nuovo contiene SOLO i valori misurati quel giorno', () => {
  const win = loadApp();
  const p = paz({
    refertiSangue: [{ id: 'vecchio', data: '2026-01-10', valori: valori(win, { 'TSH': 2.0, 'Ferritina': 80 }) }]
  });
  win._refertiApplica(p);
  const rf = win._refertoCrea(p, '2026-06-01', valori(win, { 'TSH': 3.1 }), 'referto.pdf');
  assert.strictEqual(win._refertoConteggio(rf), 1, 'il referto non eredita i valori del precedente');
  assert.strictEqual(rf.file, 'referto.pdf');
  assert.strictEqual(rf.dataStimata, false);
  // ...ma il quadro attuale li conserva entrambi
  assert.strictEqual(p.analisiSangue[K(win, 'TSH') + '_val'], '3.1');
  assert.strictEqual(p.analisiSangue[K(win, 'Ferritina') + '_val'], '80');
});

test('P118 — eliminare il referto piu' + "'" + ' recente riporta il quadro attuale a quello prima', () => {
  const win = loadApp();
  const p = paz({
    refertiSangue: [
      { id: 'vecchio', data: '2026-01-10', valori: valori(win, { 'TSH': '2.0' }) },
      { id: 'nuovo', data: '2026-06-01', valori: valori(win, { 'TSH': 3.1 }) }
    ]
  });
  win._refertiApplica(p);
  assert.strictEqual(p.analisiSangue[K(win, 'TSH') + '_val'], '3.1');
  p.refertiSangue = p.refertiSangue.filter(function (r) { return r.id !== 'nuovo'; });
  win._refertiApplica(p);
  assert.strictEqual(p.analisiSangue[K(win, 'TSH') + '_val'], '2.0');
});

test('P118 — la data si mostra in formato italiano, e senza data lo dice', () => {
  const win = loadApp();
  assert.strictEqual(win._refertoDataIt('2026-06-01'), '01/06/2026');
  assert.strictEqual(win._refertoDataIt(''), 'data non indicata');
});

test('P118 — la richiesta esami (P116) continua a leggere il quadro attuale dopo la migrazione', () => {
  const win = loadApp();
  const p = paz({
    nascita: '1980-01-01', patologie: '', regime: 'Mediterranea', inbody: [],
    analisiSangue: valori(win, { 'ALT (transaminasi)': 58 })
  });
  win._refertiMigra(p);
  win._refertiApplica(p);
  const pre = win._richPreselezione(p);
  const sezioni = new Set(Object.keys(pre.sel).map(function (k) { return k.split('.')[0]; }));
  assert.ok(sezioni.has('epatico'), 'P116 deve continuare a vedere i valori dopo il passaggio ai referti');
});
