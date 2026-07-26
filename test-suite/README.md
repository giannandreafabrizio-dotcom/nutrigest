# NutriGest — Suite test automatica minima (P78)

Estrae lo script applicativo direttamente da `../index.html` (fonte unica:
GitHub `main`, mai una copia duplicata) ed esegue tre livelli di test.

## Uso

```
cd test-suite
npm install
npm test
```

## Documentazione che si difende da sola (26 lug 2026)

- `node rigenera-index.js` — riallinea tutti i numeri di riga di `INDEX.md`
  (e i range di sezione) su `index.html`. Da lanciare a ogni sessione che tocca
  il codice: stampa quante voci corregge.
- `test/s1-doc-allineata.test.js` — FALLISCE se: INDEX.md è disallineato (il
  messaggio d'errore contiene il rimedio), se il codice legge un id che non
  esiste più nel markup (la famiglia di bug F6/F7: campo tolto, lettura rimasta,
  dato azzerato in silenzio), o se una struttura dati `p.*` principale non è
  documentata nel Contesto. Gli orfani noti sono classificati in `ORFANI_NOTI`
  ciascuno col suo motivo.

## Cosa copre

- **S1 — Smoke**: lo script estratto ha sintassi valida (`new Function`) e si
  carica in JSDOM senza `ReferenceError`, con le funzioni pure principali
  definite su `window`. Pensato per intercettare bug di caricamento come
  febf056 (emojiCache) prima del deploy.
- **S2 — Unit sui puri**: `getValoriCREA`/`NOMI_CANONICI`,
  `trovaChiaveAlimento`, `parseJSONSicuro`, `_ngScomponiIngredienti`,
  `applicaRegoloSemaforo` (regole cliniche semaforo). `validaPiano` (P61)
  verrà aggiunto qui quando la funzione esisterà.
- **S3 — Render smoke (jsPDF)**: verifica solo il prerequisito di libreria
  (jsPDF genera un PDF minimo, `window.jspdf` è iniettabile nello stesso
  ambiente dello script). **Non** esegue `generaPDF()` end-to-end: quella
  funzione ha `measurePasto`/`drawPasto` annidate non esportate, legge
  `window.jspdf` e fa `fetch()` di rete per le emoji Twemoji — un vero test
  end-to-end richiederebbe un fixture paziente+piano fedele allo schema
  interno, con il rischio di dare un falso senso di sicurezza se il fixture
  non riflette i piani reali. **La generazione PDF resta verificata
  manualmente nel browser prima di ogni commit che tocca il PDF**, come già
  per i Pointer Events del drag&drop.

## Limiti noti (dichiarati, non nascosti)

- Pointer Events (drag&drop ricette): non testabili in JSDOM, verifica
  manuale browser.
- Generazione PDF end-to-end: verifica manuale browser (vedi sopra).
- L'app esegue codice di init a livello top (fine file) che assume markup
  HTML statico presente nella pagina reale; in JSDOM quel markup non c'è e
  JSDOM segnala un errore atteso, silenziato via `VirtualConsole` in
  `_loadApp.js` — non è un bug del codice applicativo.

## CI

`.github/workflows/test.yml` esegue `npm ci && npm test` su ogni push/PR a
`main` (~2 minuti).
