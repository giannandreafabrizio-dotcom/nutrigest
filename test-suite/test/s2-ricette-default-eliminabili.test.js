// ── S2 — le ricette di sistema si eliminano come le custom, per davvero ──
// Audit al contrario, 5 ago 2026: delRic su una delle 6 ricette di sistema
// (RICETTE_DEFAULT) toglieva la riga solo in locale e mostrava "✅ Ricetta
// eliminata" — ma pullRicetteSupabase ricostruiva SEMPRE db.ricette da
// [...RICETTE_DEFAULT] senza eccezioni: al sync successivo la ricetta
// tornava da sola. Decisione di Fabrizio: "voglio che tutte le ricette siano
// uguali e tutte devono poter essere cancellabili" — per qualunque
// nutrizionista scelga di farlo sulla propria installazione. Questi test
// coprono sia la parte pura (registro locale) sia il pull (con fetch
// simulato) per verificare che l'eliminazione sopravviva davvero al sync.
//
// NOTA TECNICA: RICETTE_DEFAULT e db sono dichiarate con const/let a livello
// top del file — non diventano proprietà di `window` in JSDOM (a differenza
// delle `function`, che sì). Si leggono quindi con win.eval(...).
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

function setupDomMinima(win){
  win.document.body.innerHTML = `
    <input id="s-ric"><select id="f-ric-cat"><option value=""></option></select>
    <select id="f-ric-tag"><option value=""></option></select>
    <div id="ric-count"></div><div id="ric-grid"></div>`;
  win.window.confirm = () => true;
}

test('_registraRicettaEliminata — aggiunge senza duplicati e persiste in db', () => {
  const win = loadApp();
  win.eval("db = {ricette:[]}");
  win.window._registraRicettaEliminata('r_default_5');
  win.window._registraRicettaEliminata('r_default_5'); // due volte, stesso id
  const set = win.eval('_ricetteEliminateSet()');
  assert.deepStrictEqual(Array.from(set), ['r_default_5'], 'nessun duplicato');
});

test('delRic su una ricetta di SISTEMA — la toglie e la registra come eliminata', async () => {
  const win = loadApp();
  setupDomMinima(win);
  win.eval("db = {ricette: RICETTE_DEFAULT.slice()}");
  win.window.fetch = async (url) => ({ ok: true, status: 200, json: async () => ([]), text: async () => '' });
  const idDefault = win.eval('RICETTE_DEFAULT[0].id'); // es. r_default_1
  await win.window.delRic(idDefault);
  const ricette = win.eval('db.ricette');
  assert.ok(!Array.from(ricette).find(r => r.id === idDefault), 'la ricetta non è più in db.ricette');
  const eliminate = win.eval('_ricetteEliminateSet()');
  assert.ok(Array.from(eliminate).includes(idDefault), 'registrata nel registro eliminate');
});

test('delRic su una ricetta CUSTOM — comportamento invariato, nessuna scrittura nel registro eliminate', async () => {
  const win = loadApp();
  setupDomMinima(win);
  win.eval("db = {ricette: RICETTE_DEFAULT.concat([{id:'custom_1', nome:'Mia ricetta', cat:'pranzo'}])}");
  win.window.fetch = async () => ({ ok: true, status: 200, json: async () => ([]), text: async () => '' });
  await win.window.delRic('custom_1');
  const ricette = win.eval('db.ricette');
  assert.ok(!Array.from(ricette).find(r => r.id === 'custom_1'));
  const eliminate = win.eval('_ricetteEliminateSet()');
  assert.strictEqual(Array.from(eliminate).includes('custom_1'), false, 'le custom non entrano nel registro delle default eliminate');
});

test('pullRicetteSupabase — una ricetta di sistema eliminata NON ritorna al pull successivo', async () => {
  const win = loadApp();
  setupDomMinima(win);
  const idDefault = win.eval('RICETTE_DEFAULT[2].id');
  win.eval("db = {ricette: RICETTE_DEFAULT.slice()}");
  win.window._registraRicettaEliminata(idDefault); // simula: già eliminata prima di questo pull
  win.window.fetch = async (url) => {
    if (String(url).includes('/rest/v1/collections')) {
      // il registro remoto è vuoto: l'unica traccia dell'eliminazione è quella locale appena fatta
      return { ok: true, status: 200, json: async () => ([]), text: async () => '' };
    }
    if (String(url).includes('/rest/v1/ricette')) {
      return { ok: true, status: 200, json: async () => ([]), text: async () => '' }; // nessuna custom su Supabase
    }
    throw new Error('URL non atteso nel mock: ' + url);
  };
  const ok = await win.window.pullRicetteSupabase();
  assert.strictEqual(ok, true);
  const ricette = win.eval('db.ricette');
  assert.ok(!Array.from(ricette).find(r => r.id === idDefault),
    'PRIMA di questa correzione: sarebbe tornata, perché pull ricostruiva sempre da RICETTE_DEFAULT');
  const totaleDefault = win.eval('RICETTE_DEFAULT.length');
  assert.strictEqual(Array.from(ricette).length, totaleDefault - 1);
});

test('pullRicetteSupabase — un\'eliminazione fatta su un ALTRO dispositivo arriva col registro remoto', async () => {
  const win = loadApp();
  setupDomMinima(win);
  const idDefault = win.eval('RICETTE_DEFAULT[3].id');
  win.eval("db = {ricette: RICETTE_DEFAULT.slice()}"); // qui NON è mai stata tolta in locale
  win.window.fetch = async (url) => {
    if (String(url).includes('/rest/v1/collections')) {
      // il "device 2" l'ha già eliminata e sincronizzata: il registro remoto la contiene
      return { ok: true, status: 200, json: async () => ([{ data: { ids: [idDefault] }, updated_at: null }]), text: async () => '' };
    }
    if (String(url).includes('/rest/v1/ricette')) {
      return { ok: true, status: 200, json: async () => ([]), text: async () => '' };
    }
    throw new Error('URL non atteso: ' + url);
  };
  const ok = await win.window.pullRicetteSupabase();
  assert.strictEqual(ok, true);
  const ricette = win.eval('db.ricette');
  assert.ok(!Array.from(ricette).find(r => r.id === idDefault), 'anche se non l\'avevo mai tolta qui, il registro remoto la esclude');
  const eliminate = win.eval('_ricetteEliminateSet()');
  assert.ok(Array.from(eliminate).includes(idDefault), 'il registro locale si aggiorna con quello remoto');
});

test('pullRicetteSupabase — senza nessuna eliminazione, tutte le 6 di sistema restano (nessuna regressione)', async () => {
  const win = loadApp();
  setupDomMinima(win);
  win.eval("db = {ricette: []}");
  win.window.fetch = async (url) => {
    if (String(url).includes('/rest/v1/collections')) return { ok: true, status: 200, json: async () => ([]), text: async () => '' };
    if (String(url).includes('/rest/v1/ricette')) return { ok: true, status: 200, json: async () => ([]), text: async () => '' };
    throw new Error('URL non atteso: ' + url);
  };
  const ok = await win.window.pullRicetteSupabase();
  assert.strictEqual(ok, true);
  const ricette = win.eval('db.ricette');
  const totaleDefault = win.eval('RICETTE_DEFAULT.length');
  assert.strictEqual(Array.from(ricette).length, totaleDefault, 'tutte le 6 di sistema, nessuna persa senza motivo');
});
