# NutriGest — CLAUDE.md
# Istruzioni per Claude Code

## Chi sono
Mi chiamo Fabrizio Giannandrea. Sono un nutrizionista professionista.
Non sono un tecnico informatico — spiegami sempre le cose in modo semplice e chiaro, passo per passo, in italiano.

## Il progetto: NutriGest
NutriGest è un'applicazione che voglio commercializzare e vendere.
- **File principale**: `index.html` (unico file HTML self-contained, ~19.400+ righe)
- **GitHub**: `github.com/giannandreafabrizio-dotcom/nutrigest`
- **URL live**: `https://giannandreafabrizio-dotcom.github.io/nutrigest/`
- **Database**: Supabase (progetto `zrhmspylnlklppvhgplp`) — i nomi di funzione legacy `pushToSheets`/`pullFromSheets` sono rimasti per compatibilità ma usano Supabase internamente. Google Sheets/Apps Script è backend STORICO, dismesso: non usarlo come riferimento per modifiche nuove.
- **Dispositivi**: Windows 10 laptop (Lenovo Yoga 510, 8GB RAM) + iPhone 15 Pro Max
- **Browser**: Chrome su PC, Safari su iPhone
- Dettagli completi di backend, tabelle e funzioni sync → sezione STRUTTURA DATI del Contesto (`NutriGest_Contesto_v18.txt`), non duplicati qui.

## Protocollo fonte di verità e sicurezza (per ogni sessione Claude)
GitHub `main` è la fonte di verità per TUTTO (codice + documentazione: `index.html`, `NutriGest_Roadmap_v4.md`, `CHANGELOG.md`, `INDEX.md`, `CLAUDE.md`). Fabrizio non modifica mai nulla in locale. I file caricati nei documenti del progetto Claude possono essere una foto vecchia: NON fidarsi, scaricare sempre da GitHub.

**Procedura obbligatoria a inizio sessione (anti-cache, anti-conflitto):**
1. Leggere lo SHA di HEAD: `git ls-remote https://github.com/giannandreafabrizio-dotcom/nutrigest.git refs/heads/main` (niente API REST: è rate-limitata dall'IP condiviso del sandbox; `ls-remote` no).
2. Scaricare i file PINNATI a quello SHA: `raw.githubusercontent.com/giannandreafabrizio-dotcom/nutrigest/<SHA>/<file>` — mai dal ref `main` liscio, perché la CDN di raw può servire una versione in cache vecchia fino a ~5 minuti dopo un push.
3. Dichiarare a Fabrizio su quale commit si sta lavorando ("basato su `<SHA corto>`").
4. **Lavorare SEMPRE in un'unica cartella locale per l'intera sessione** — mai clonare/scaricare copie parallele in cartelle diverse. È la causa concreta di un incidente reale (13 lug 2026): due cartelle di lavoro diverse hanno portato a consegnare più volte un file più vecchio di quello appena editato, silenziosamente.

**Procedura obbligatoria prima di consegnare un file modificato:**
1. Rileggere lo SHA di HEAD con `ls-remote`. Se è cambiato rispetto alla baseline → main si è mosso durante la sessione: riscaricare, ri-applicare le modifiche sulla versione nuova, MAI consegnare un file basato su una baseline superata (cancellerebbe in silenzio i commit intermedi).
2. **Verificare il CONTENUTO del file appena prima di consegnarlo** (grep su una stringa univoca della modifica appena fatta), non solo il conteggio righe o il diff di sessioni precedenti — un conteggio righe uguale non garantisce che il contenuto sia quello giusto.
3. Per `index.html`: sempre `node --check` sul blocco script; se la modifica tocca funzioni coperte dalla test-suite (`test-suite/`), eseguire anche i test.
4. Consegnare SEMPRE i file via present_files (un blocco commit senza i file allegati non è una consegna).

**Regole git non negoziabili:**
- Mai `git add -A` o `git add .` nel blocco commit: sempre i file espliciti.
- Mai suggerire `push --force` o varianti. Se il push viene rifiutato (non-fast-forward), il rimedio è: `git pull` e rieseguire — e se compare un conflitto, fermarsi e portare il problema a Claude, non risolverlo a mano.
- Una sola sessione di lavoro Claude alla volta sul repo: mai due chat in parallelo che modificano file.
- Rollback: ogni commit è recuperabile con `git revert <sha>` — la storia di GitHub è il backup del progetto; non servono copie manuali.

## Ottimizzazione token — INDEX.md
Il file `index.html` è un monolite di grandi dimensioni: leggerlo per intero prima di ogni modifica è costoso in token e va evitato.
- **`INDEX.md`** (nella cartella del progetto) mappa ~530 funzioni top-level per area funzionale (Pazienti, Analisi del sangue, Composizione corporea, Motore TDEE, Generatore piani, Compositore manuale, Calendario, Autenticazione, ecc.) con il numero di riga di ciascuna.
- Prima di ogni modifica: apri `INDEX.md`, trova l'area/funzione pertinente, poi usa `view` con `view_range` mirato su `index.html` invece di leggere tutto il file.
- Se il nome funzione non è chiaro o non è in tabella, fai prima `grep -n "nomeFunzione" index.html`.
- Le righe in `INDEX.md` si spostano man mano che il file cresce/si modifica: sono indicative, non garantite. Se un `view_range` non corrisponde, fai grep di conferma prima di editare.
- **Rigenera `INDEX.md`** dopo modifiche strutturali importanti (aggiunta di grosse sezioni, spostamento di blocchi di funzioni), non dopo ogni piccolo commit.
- Usa `str_replace` per le modifiche puntuali quando la stringa target è già nota e univoca, senza bisogno di rileggere l'intero file.

## Secondo progetto: Patrimonio
- **File**: `Patrimonio_GoogleSheets.html`
- **URL live**: `https://giannandreafabrizio-dotcom.github.io/PATRIMONIO/`
- **Script URL Patrimonio**: `https://script.google.com/macros/s/AKfycby_AeHEdjMN6n_rIev68SiCiJL1bJDR_O_hEGWk8MMQ1roILyjL3XfWDvHnnuLCnbgzYw/exec`
- **Google Sheet ID Patrimonio**: `1dBBNyfsN_DGmiLHzufw66W5NSkFpqYN0X466HzgLavg`

## Architettura tecnica di NutriGest
- Tutto il codice è in UN SOLO file HTML (`index.html`)
- CSS, JavaScript e HTML sono tutti dentro questo file
- NON usare file separati — tutto deve rimanere self-contained
- Il frontend comunica con Supabase (database + Edge Functions)
- Autenticazione: nessuna (app personale)
- Storage locale: localStorage come cache, Supabase come database principale

## Struttura dati
La struttura di `db` (pazienti, ricette, piani, eventi, entrate, concetti, disponibilita) e di `ALIMENTI` è documentata e mantenuta aggiornata nella sezione STRUTTURA DATI del Contesto (`NutriGest_Contesto_v18.txt`) — non duplicata qui per evitare che questa copia diventi disallineata da quella (già successo: questa versione non includeva più `piani[]`).

## Stile nutrizionale di Fabrizio (molto importante)
- Schema TDEE (motore MET additivo, dal 4 lug 2026): `TDEE = MB(InBody) + NEAT(passi) + EAT((MET−1)×peso×ore effettive) + TEF(10%)` → poi slider percentuale del TDEE (non più offset fisso) → proteine/carb/grassi
- I vecchi bucket LAF fissi (Sedentario 1.20/Moderato 1.55/ecc.) e gli 8 regimi a offset fisso sono **superati** e restano solo come fallback manuale quando mancano dati di attività — dettaglio formule aggiornate nella sezione STILE NUTRIZIONALE del Contesto, non duplicato qui per evitare che questa copia si disallinei di nuovo (è già successo)
- I piani alimentari sono settimanali (6 giorni, 7 per chetogenici)
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
7. **Commit frequenti**: dopo ogni funzionalità che funziona, un blocco unico su una riga mirato su `index.html` (vedi Comandi utili)

## Flusso di lavoro preferito
1. Modifica `index.html`
2. Testa in Chrome locale aprendo il file
3. Se funziona → commit (vedi Comandi utili)
4. Il sito si aggiorna automaticamente su GitHub Pages in ~30 secondi

## Stato sviluppo e prossimi passi
Il generatore automatico di piani alimentari (lettura dati paziente → ricette → piano settimanale nel mio stile → correzione manuale → PDF) è **già realizzato e in uso**, non più un obiettivo futuro. Lo stato attuale dello sviluppo (voci chiuse, in corso, da fare) vive SEMPRE in `NutriGest_Roadmap_Modifiche.md` — consultare quello, non questo file, per sapere cosa fare dopo.

## Comandi utili
```bash
# Vai al progetto
cd C:\Users\User\Desktop\nutrigest

# Salva e pubblica una modifica (blocco unico, una riga)
cd %USERPROFILE%\Desktop\nutrigest && git add index.html && git commit -m "descrizione breve" && git push

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
