// ── Helper condiviso: carica lo script applicativo in un ambiente JSDOM ──
// Usato dai test S2 (unit su funzioni pure) e potenzialmente da futuri test
// che necessitano di `document`/`window` popolati come nel browser reale.
'use strict';
const { JSDOM, VirtualConsole } = require('jsdom');
const { extractMainScript } = require('./_extract');

/**
 * Carica lo script principale di index.html in un JSDOM fresco e restituisce
 * l'oggetto `window` con tutte le funzioni/variabili globali dell'app.
 *
 * NOTA: alcune funzioni dell'app assumono la presenza di `db`, elementi DOM
 * specifici, o browser API non disponibili in JSDOM (es. localStorage con
 * quota, fetch di rete, Supabase client). Questo helper carica lo script con
 * `runScripts: 'dangerously'` — sufficiente per testare le funzioni PURE
 * (parsing, calcoli, regole) che non toccano quelle dipendenze.
 *
 * L'app esegue anche codice di init a livello top (fine file, es.
 * renderPaz()/renderDashboard()) che nel browser reale trova il markup HTML
 * statico già presente nella pagina. In questo shell minimale quel markup
 * non c'è: JSDOM segnala un 'jsdomError' non catchable da try/catch
 * sincrono. Lo instradiamo su una VirtualConsole e lo ignoriamo
 * volutamente — non è un bug del codice applicativo, è il limite noto di
 * questo harness (init-su-markup-reale resta fuori scope, così come i
 * Pointer Events: verifica manuale, vedi principi di progetto).
 */
function loadApp() {
  const code = extractMainScript();
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('jsdomError', () => { /* atteso: init senza markup reale, vedi nota sopra */ });

  const dom = new JSDOM(
    `<!DOCTYPE html><html><body></body></html>`,
    { runScripts: 'dangerously', url: 'https://example.com/', virtualConsole }
  );
  const scriptEl = dom.window.document.createElement('script');
  scriptEl.textContent = code;
  dom.window.document.body.appendChild(scriptEl);
  return dom.window;
}

/**
 * Normalizza un valore che arriva DA DENTRO la finestra JSDOM, per poterlo
 * confrontare con `assert.deepStrictEqual`.
 *
 * PERCHÉ SERVE (scoperto tre volte nella stessa sessione, 5 ago 2026). Oggetti
 * e array creati dentro JSDOM hanno un `Object.prototype`/`Array.prototype`
 * diversi da quelli di Node. `deepStrictEqual` confronta anche il prototipo e
 * fallisce con "Values have same structure but are not reference-equal" pur
 * essendo i valori identici — un messaggio che sembra un bug del codice
 * applicativo e invece è un limite dell'harness. Il tranello è che alcune
 * righe passano lo stesso (`Array.from(...)` ricrea l'array nel realm di Node)
 * e altre no, quindi il difetto sembra intermittente.
 *
 * REGOLA 15, "ripara il rubinetto": stava per nascere una copia di questo
 * helper in ogni file di test che ne aveva bisogno. Vive qui, in un posto solo.
 *
 * Parente del quirk già noto sui `const`/`let` top-level dello script, che in
 * JSDOM NON diventano proprietà di `window` (le `function` sì): quelli si
 * leggono con `win.eval('NOME')`.
 */
function puro(x) {
  return x === undefined ? undefined : JSON.parse(JSON.stringify(x));
}

module.exports = { loadApp, puro };
