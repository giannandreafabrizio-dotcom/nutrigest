# NutriGest — CLAUDE.md
# Istruzioni per Claude Code

## Chi sono
Mi chiamo Fabrizio Giannandrea. Sono un nutrizionista professionista con due studi (Magic e Centro Curae) e lavoro anche da casa a Napoli.
Non sono un tecnico informatico — spiegami sempre le cose in modo semplice e chiaro, passo per passo, in italiano.

## Il progetto: NutriGest
NutriGest è la mia applicazione web personale per gestire lo studio nutrizionistico.
- **File principale**: `index.html` (unico file HTML self-contained)
- **GitHub**: `github.com/giannandreafabrizio-dotcom/nutrigest`
- **URL live**: `https://giannandreafabrizio-dotcom.github.io/nutrigest/`
- **Database**: Google Sheets (via Google Apps Script)
- **Script URL NutriGest**: `https://script.google.com/macros/s/AKfycbzqJUPupClSwpWOc1YIJe9Frw1lExhnKVxIxHUYajOMvYvdyF6PEuDXMyOqWnXgF2sUQA/exec`
- **Google Sheet ID NutriGest**: `1zjdPU8JTy8E9ZtXVQO-QM2uwpO1ExhCkdFb9zYhA4QA`
- **Dispositivi**: Windows 10 laptop (Lenovo Yoga 510, 8GB RAM) + iPhone 15 Pro Max
- **Browser**: Chrome su PC, Safari su iPhone

## Secondo progetto: Patrimonio
- **File**: `Patrimonio_GoogleSheets.html`
- **URL live**: `https://giannandreafabrizio-dotcom.github.io/PATRIMONIO/`
- **Script URL Patrimonio**: `https://script.google.com/macros/s/AKfycby_AeHEdjMN6n_rIev68SiCiJL1bJDR_O_hEGWk8MMQ1roILyjL3XfWDvHnnuLCnbgzYw/exec`
- **Google Sheet ID Patrimonio**: `1dBBNyfsN_DGmiLHzufw66W5NSkFpqYN0X466HzgLavg`

## Architettura tecnica di NutriGest
- Tutto il codice è in UN SOLO file HTML (`index.html`)
- CSS, JavaScript e HTML sono tutti dentro questo file
- NON usare file separati — tutto deve rimanere self-contained
- Il frontend comunica con Google Sheets tramite fetch() all'URL Apps Script
- Autenticazione: nessuna (app personale)
- Storage locale: localStorage come cache, Google Sheets come database principale

## Struttura dati principale
```javascript
db = {
  pazienti: [],    // profili pazienti completi
  ricette: [],     // database ricette con macros
  eventi: [],      // calendario appuntamenti
  entrate: [],     // incassi studio
  concetti: [],    // concetti educativi personalizzati
  disponibilita: {} // disponibilità studi
}
```

## Struttura ALIMENTI (importante!)
Gli alimenti usano questa struttura — NON la vecchia con array di stringhe:
```javascript
ALIMENTI = {
  'Nome Categoria': {
    items: [
      {n: 'Nome alimento', g: 100, gl: true/false}  // gl = contiene glutine
    ]
  }
}
```
La chiave per ogni alimento nelle preferenze paziente è: `'Categoria__NomeAlimento'`

## Stile nutrizionale di Fabrizio (molto importante)
- Schema macronutrienti: MB (da InBody) × LAF → TDEE → deficit/surplus → proteine/carb/grassi
- LAF: Sedentario 1.20, Leggermente attivo 1.375, Moderato 1.55, Molto attivo 1.725
- 8 tipi di regime: Ipocalorico lento/moderato/aggressivo, Normocalorico, Ipercalorico leggero/chiaro, Chetogenico WLKD, Chetogenico moderato
- I piani alimentari sono settimanali (6 o 7 giorni)
- Ogni giorno ha: Colazione, Spuntino mattina, Pranzo, Merenda, Cena, Pre-nanna (opzionale)
- Il sabato sera è sempre "libero" (pizza/panino/sushi/pesce/carne rossa)
- Le ricette sono divise per categoria e momento della giornata
- Il PDF finale si chiama sempre: "Regime alimentare — Nome Cognome"
- I concetti educativi vengono allegati al PDF in base al profilo del paziente

## Regole di sviluppo — SEMPRE rispettale
1. **Non rompere mai quello che funziona** — prima di modificare una funzione, leggila tutta
2. **Testa sempre in Chrome** dopo ogni modifica importante
3. **Apostrofi nelle stringhe JS**: usa sempre doppi apici `"testo con l'apostrofo"` o escape `\'`
4. **Struttura ALIMENTI**: usa sempre `data.items` non `items` direttamente
5. **Null check**: usa sempre `document.getElementById(id)?.something` o verifica che l'elemento esista
6. **Un solo file**: non creare mai file CSS o JS separati
7. **Commit frequenti**: dopo ogni funzionalità che funziona, fai sempre `git add . && git commit -m "descrizione" && git push`

## Flusso di lavoro preferito
1. Modifica `index.html`
2. Testa in Chrome locale aprendo il file
3. Se funziona → `git add . && git commit -m "descrizione breve" && git push`
4. Il sito si aggiorna automaticamente su GitHub Pages in ~30 secondi

## Obiettivo principale — Generatore piani alimentari automatico
Il prossimo grande sviluppo è integrare dentro NutriGest un generatore che:
1. Legge i dati del paziente già inseriti (peso, kcal, preferenze, regime, allergie)
2. Usa le ricette del database NutriGest
3. Genera un piano settimanale nel mio stile personale
4. Mi permette di correggerlo
5. Genera il PDF finale "Regime alimentare — Nome Cognome"
6. In futuro: analisi di 300-700 miei piani precedenti per apprendere il mio stile

## Comandi utili
```bash
# Vai al progetto
cd C:\Users\User\Desktop\nutrigest

# Salva e pubblica una modifica
git add .
git commit -m "descrizione della modifica"
git push

# Controlla lo stato
git status

# Vedi gli ultimi commit
git log --oneline -5
```

## Note personali
- Fabrizio preferisce lavorare passo per passo con conferme esplicite
- Comunica in italiano sempre
- Quando non capisce qualche termine tecnico, rispiegarlo con parole semplici
- Ha il piano Claude Pro
- Usa la voce per inserire dati in NutriGest (speech recognition in italiano)
