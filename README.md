# NutriGest

Applicazione web per la gestione dell'attività di un nutrizionista: anagrafica e cartella
clinica dei pazienti, composizione corporea, analisi del sangue, motore del fabbisogno
energetico, generazione e stampa dei piani alimentari, agenda e materiali per il paziente.

Il sito è servito da GitHub Pages a partire da questo repository: **ogni push è una messa in
produzione immediata.**

## Com'è fatto

- **Un solo file.** Tutta l'applicazione — markup, CSS e JavaScript — vive in `index.html`
  (32.308 righe). Non ci sono file `.css` o `.js` separati, e la scelta è deliberata: nessun
  passaggio di build, il file si apre in un browser così com'è.
- **Backend Supabase** (PostgreSQL + autenticazione + Edge Functions). `localStorage` fa da
  cache locale; il database è la fonte dei dati.
- **Dipendenze servite dal repo** (`vendor/`), non da CDN esterni: jsPDF per le stampe e
  Chart.js per i grafici residui. La scheda della composizione corporea usa un motore SVG
  proprio.
- **Test:** `test-suite/`, 738 test. Girano su Node, senza browser.

## La documentazione, e in che ordine si legge

Il repository contiene quattro documenti, ciascuno con un mestiere diverso. **Solo il primo
si legge per intero; gli altri si interrogano.**

| File | Risponde a | Come si usa |
|---|---|---|
| `CLAUDE.md` | come si lavora su questo progetto: regole, procedure, lezioni | **si legge tutto**, ~50 KB |
| `INDEX.md` | dove sta ogni funzione dentro `index.html` (899 voci) | si cerca un nome, si apre solo quel tratto di file |
| `NutriGest_Roadmap_v4.md` | cosa c'è da fare — 119 schede | si cerca la scheda della voce |
| `CHANGELOG.md` | cosa è successo, quando e perché | si cerca il numero di voce |
| `NutriGest_Contesto_v18.txt` | come funziona il software oggi | si cerca la sezione |

Due regole valgono più delle altre e sono spiegate per esteso in `CLAUDE.md`:

1. **Lo stato di una voce vive in un posto solo** — la sua scheda nella Roadmap. La storia
   vive nel CHANGELOG. Se una frase fuori dalla scheda la contraddice, fa fede la scheda.
2. **`INDEX.md` non si modifica a mano**: si rigenera con
   `cd test-suite && node rigenera-index.js`, e un test fa fallire la suite se è disallineato.

## Lavorare sul progetto

```bash
# 1. Da quale versione si parte
git ls-remote https://github.com/giannandreafabrizio-dotcom/nutrigest.git refs/heads/main

# 2. Test
cd test-suite && npm test

# 3. Indice delle funzioni, dopo ogni modifica a index.html
cd test-suite && node rigenera-index.js
```

Per provare l'applicazione basta aprire `index.html` in un browser: serve però un accesso al
backend, quindi senza credenziali si vede la sola schermata di login.

## Licenza e stato

Progetto personale, non open source: nessuna licenza d'uso è concessa. Il codice è visibile
perché GitHub Pages richiede un repository pubblico — non perché sia riutilizzabile.
