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

module.exports = { loadApp };
