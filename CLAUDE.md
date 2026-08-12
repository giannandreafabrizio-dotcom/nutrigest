# NutriGest — CLAUDE.md
# Istruzioni per Claude Code

## Chi sono
Mi chiamo Fabrizio Giannandrea. Sono un nutrizionista professionista.
Non sono un tecnico informatico — spiegami sempre le cose in modo semplice e chiaro, passo per passo, in italiano.

## Il progetto: NutriGest
NutriGest è un'applicazione che voglio commercializzare e vendere.
- **File principale**: `index.html` (unico file HTML self-contained, **32.639 righe** al 12 ago 2026 — questo numero si ricontrolla con `wc -l`, non si copia)
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
5. **Nel sandbox si SCARICANO i file pinnati, non si clona il repo.** Se serve clonare (unico caso: prendere `test-suite/` e `vendor/`), **rimuovere `.git` subito dopo**. Motivo: l'hook di fine turno del sandbox controlla se la cartella di lavoro è un repository git e, trovandone uno con modifiche non committate, chiude ogni risposta con un avviso di commit — che qui è sempre un falso allarme, perché il commit lo fa solo Fabrizio dalla sua macchina. Senza `.git` l'hook esce subito e l'avviso sparisce. (28 lug 2026.)

**Procedura obbligatoria prima di consegnare un file modificato:**
1. Rileggere lo SHA di HEAD con `ls-remote`. Se è cambiato rispetto alla baseline → main si è mosso durante la sessione: riscaricare, ri-applicare le modifiche sulla versione nuova, MAI consegnare un file basato su una baseline superata (cancellerebbe in silenzio i commit intermedi).
2. **Verificare il CONTENUTO del file appena prima di consegnarlo** (grep su una stringa univoca della modifica appena fatta), non solo il conteggio righe o il diff di sessioni precedenti — un conteggio righe uguale non garantisce che il contenuto sia quello giusto.
3. Per `index.html`: sempre `node --check` sul blocco script; se la modifica tocca funzioni coperte dalla test-suite (`test-suite/`), eseguire anche i test.
4. Consegnare SEMPRE i file allo strumento di consegna della sessione (in Cowork: `SendUserFile`; nelle chat più vecchie si chiamava `present_files`). Un blocco commit senza i file allegati non è una consegna.

**Cartella `nutrigest` collegata in Cowork (dal 22 lug 2026):** Fabrizio tiene la cartella `Desktop\nutrigest` collegata in modo permanente all'app Claude (pulsante "Aggiungi cartella"). Quando la cartella risulta collegata via il bridge dispositivo (`mcp__remote-devices__*`), oltre a consegnare i file in chat, Claude li SALVA anche direttamente al posto giusto nella cartella dell'utente: `index.html` e i doc nella radice `nutrigest\`, i test in `test-suite\test\`. Così Fabrizio non deve spostarli a mano prima di committare. Restano invariate le regole di verifica (ricontrollo SHA, node --check, test, grep sul contenuto) prima del salvataggio. Se la cartella NON è collegata, Claude consegna solo in chat e lo segnala. Claude non esegue mai `git commit`/`push` al posto di Fabrizio: prepara i file e gli passa il comando.
   **E non esegue NESSUN comando git su quella cartella, nemmeno di sola lettura** (12 ago 2026, intoppo reale): dal bridge dispositivo si possono creare file ma non cancellarli, quindi un `git status` lascia dietro un `.git/index.lock` vuoto che poi **blocca il commit di Fabrizio** con «Another git process seems to be running». Lo SHA si legge con `git ls-remote` da bash nel sandbox, che non tocca niente in locale. Se un lock resta, si sposta in `_to_delete/` (non si può cancellare).

**Regole git non negoziabili:**
- **Il blocco commit deve essere copiabile in cmd.exe: ogni comando su UNA SOLA riga fisica.** Un `git commit -m "riga1<a capo>riga2"` in cmd chiude la stringa a fine riga: parte il solo titolo e **tutte le righe successive vengono eseguite come comandi**. Per un messaggio a più paragrafi si usano **più `-m` di seguito sulla stessa riga**. Dentro le virgolette evitare anche `%` e `!` (cmd li espande) e `>` `<` `|` `&`. (Incidente reale, 29 lug 2026.)
- Mai `git add -A` o `git add .`: sempre i file espliciti.
- Mai `push --force` o varianti. Se il push viene rifiutato: `git pull` e rieseguire — e se compare un conflitto, fermarsi e portarlo a Claude, non risolverlo a mano.
- Una sola sessione Claude alla volta sul repo.
- Rollback: ogni commit è recuperabile con `git revert <sha>` — la storia di GitHub è il backup del progetto.

## Connettori collegati (dal 10 agosto 2026) — regole d'uso

Dall'app Claude sono collegati: Supabase, PubMed, Google Drive, Gmail, Google Calendar, Claude in Chrome, più i plugin Design e Bio Research. Analisi completa: `claude/NutriGest_Connettori_Analisi.md` nel progetto. Tre regole NON negoziabili:

1. **Supabase: SOLA LETTURA per impostazione predefinita.** Il connettore può eseguire DDL (`apply_migration`, `execute_sql`) sul database di produzione, dove `git revert` non esiste. Qualsiasi scrittura (anche una riga) solo dopo OK esplicito di Fabrizio nello stesso giro di messaggi, con l'SQL mostrato PRIMA di eseguirlo. E l'organizzazione ha DUE progetti (`Nutrigest` = `zrhmspylnlklppvhgplp`, eu-west-1; `RISVEGLIO` = `zxuexfhuxxmsleiqkoaz`): il `project_id` va dichiarato a voce prima di ogni chiamata — sbagliare progetto significa scrivere sul database sbagliato senza che niente lo impedisca.
   **PRIMA SCRITTURA AVVENUTA L'11 AGOSTO 2026** (migrazione `p151_p152_p154_pk_composta_timestamptz_rls_initplan`: P151+P152+P154). La regola ha retto e la sequenza usata è il precedente da ripetere: verifiche di sola lettura sui **prerequisiti** → verifica di cosa si rompe **lato client** → SQL completo mostrato a Fabrizio con il `project_id` dichiarato → spiegazione in parole sue → **OK esplicito** → controllo pre-volo che nulla sia già applicato → esecuzione in **una sola migrazione** (una sola transazione) → riletta di advisor **e dati**. Due cose imparate quel giorno: **una migrazione DDL si accorpa**, perché aprire tre volte le stesse tabelle di produzione è tre volte il rischio; e **un controllo che dichiara un difetto va verificato come si verifica un difetto** — la query di verifica ha annunciato «8 policy non ottimizzate» che non esistevano, perché Postgres riscrive `(select auth.uid())` come `( SELECT auth.uid() AS uid)`.
2. **PubMed: un valore numerico dalla letteratura entra in `index.html` solo col PMID/DOI accanto al dato** (estensione della regola 20 — come il codice a 5 cifre del Compendium per i MET), e solo se letto dal testo completo, mai dal solo abstract. **PubMed NON chiude P130**: i valori FODMAP di Monash sono un dataset proprietario dell'app Monash, non una pubblicazione.
3. **Google Calendar NON si collega al prodotto.** NutriGest ha già la sua agenda (`eventi`, Scadenze C8): una sincronizzazione creerebbe due fonti di verità sulla stessa cosa — famiglia F4/regola 12. Se un giorno servirà, solo esportazione a senso unico.

4. **GitHub — collegato il 6 ago 2026. SI PUBBLICA SOLO DOPO APPROVAZIONE ESPLICITA DI FABRIZIO, OGNI VOLTA.** Non esiste un via libera permanente: il permesso vale per quel push e basta, e si chiede in chat («pubblico?»). Il motivo non è formale: **il repository esce su GitHub Pages, quindi ogni push è una messa in produzione immediata**, e il blocco commit era finora l'ultimo momento in cui un essere umano guardava cosa stava per andare online. *Da completare: gli strumenti di quel connettore non sono ancora comparsi in sessione (i connettori si agganciano all'avvio). La prima sessione che li vede fa l'inventario di cosa espone davvero e completa questo punto — scriverlo su ciò che si immagina sarebbe la Regola 23 applicata a se stessa.*

5. **Cosa il sandbox raggiunge davvero, e non è un ripiego.** Né `api.github.com` (502) né il sito live (403 sul proxy); `gh` non è installato. Da bash restano validi soltanto `git ls-remote` per lo SHA e `raw.githubusercontent.com/<owner>/<repo>/<SHA>/<file>` per i contenuti: è l'unica strada che esiste da lì.

## I documenti del progetto Claude — tabella di fiducia

> **Come si legge.** Audit di partenza **4 agosto 2026**; singole righe riverificate contro il
> repo il 5, 6, 10, 11 e 12 agosto, e ciascuna lo dichiara al proprio interno. **La data in
> testa non si sposta in blocco**: una riverifica riga per riga non è una riverifica di tutta
> la tabella (Regola 23, punto 4).

I file `claude/NutriGest_*.md` sono **fotografie datate di un ragionamento**, non lo stato del
software: nessuno li aggiorna quando il codice avanza. Il 30 luglio 2026 una sessione lesse
`P87_Comunicazione_Analisi` come stato attuale e stava per ricostruire da zero `p.invii[]` e il
motore di invio, esistenti da due giorni — e l'audit del 4 agosto ha trovato **la stessa
trappola in 10 documenti su 20**.

**La regola, prima della tabella:** un documento di progetto non autorizza a implementare
niente. Prima di scrivere una riga ispirata a uno di questi file → `grep` sui nomi delle
funzioni proposte in `index.html` **e** incrocio col `CHANGELOG.md`. **Il CHANGELOG è la fonte
di verità sullo stato; questi file lo sono sul *perché*.**

**Tre varianti peggiori della semplice obsolescenza, tutte già capitate:** *(a)* la fotografia
che **afferma** — una sessione senza il repo collegato scrisse qui una voce di roadmap che il
repo non aveva, con un numero già occupato (6 ago; **un numero di voce non si legge mai da una
fotografia**); *(b)* la **riga che esiste solo qui** — l'indice incompleto è più pericoloso di
un documento vecchio, perché nessuno pensa di verificare l'indice (11 e 12 ago, due volte);
*(c)* la riga **vera per mezza giornata**, che dichiara «in vigore» un vincolo temporaneo e
diventa falsa quando il vincolo cade (12 ago). Rimedi nei punti 5-8 della Regola 23.

| Documento | Stato al 4 ago 2026 |
|---|---|
| `_STATO_DOCUMENTI.md` | Copia di questa tabella, visibile dentro claude.ai. Va tenuta allineata: repo prima, copia poi. |
| `NutriGest_P9_Timeline_Ragionamento.md` | ✅ **Modello da imitare**: dichiara in testa cosa è implementato, coi commit. |
| `NutriGest_Plicometria_Ragionamento.md` | ✅ Dice il vero: P139 è davvero da fare, nessun codice plicometrico esiste. **Da leggere con P153**: se il modello dati generale (153a) si fa prima, la plicometria ne diventa un caso invece di un motore separato. |
| `NutriGest_P153_Altre_Bioimpedenziometrie_Ragionamento.md` | ✅ **Nato datato** (6 ago, verificato su `f356915`): dichiara in testa che nessun codice esiste. La colonna «diffusione» è **dichiarata non verificata** — impressioni, non dati. |
| `NutriGest_P124_Import_Referti.md` | ✅ Chiusa e collaudata. **Riusata dalla tappa 153b**: il motore di lettura referti vale anche per gli altri bioimpedenziometri. |
| `NutriGest_Incidente_Sync_11ago_e_P157.md` | ✅ **Verbale dell'incidente dell'11 ago** (sei pazienti sovrascritti da un PC indietro, recuperati dal backup del 9). Riverificato il 12 su `095b6ed`: §4, §5 e §6 **storici** — P157 chiusa e collaudata, regole restrittive decadute. Vivi: §1 e §3 (fatti e log) e il §7, da cui nascono P158 e la regola 27. |
| `NutriGest_Connettori_Analisi.md` | ⚠️ Riverificato l'11 ago su `6c34c7c` e sul database. Il **§1 è storico** — P151, P152 e P154 chiuse — e porta un riquadro che lo dice. **Vivi**: §2 (PubMed, e il fatto che *non* chiude P130), §3 (Chrome), §4 (Drive/Gmail/Calendar), §5-6 (plugin), §7 punti 3-6. |
| `NutriGest_Testi_Cosa_Entra_Nelle_AI.md` | ✅ Descrive lo stato dopo la modifica, coi marcatori di data. |
| `NutriGest_Chetogenica_Ragionamento.md` | ✅ Marcatori [fatto]/[non fatto] espliciti; i 4 punti aperti sono veri. |
| `NutriGest_Ricette_Caricamento_Massivo.md` | ✅ Il limite risolto è marcato; la fase 2 è davvero aperta. |
| `NutriGest_TDEE_Parte1b_Catalogo_e_LAF.md` | ✅ Scritto al passato coi commit. Due punti superati: il collaudo a video **è** avvenuto (P147d) e la «parte 2» del §4 **è chiusa** (P149). |
| `NutriGest_P35_Peso_Casalingo_Ragionamento.md` | ✅ **Secondo modello da imitare** con P9: dichiara stato, tappe, test e cosa non è stato fatto. Il suo «da tenere d'occhio» **è ancora aperto**: `_percorsoGeneraFasi` e `percorsoChiudiFase` leggono ancora la serie fusa `_serieePesoOss`. |
| `NutriGest_P128_Come_Fanno_Gli_Altri.md` | ✅ È ricerca (Yuka, Fig, Monash, software per dietisti): non invecchia. Il rimedio sull'incoerenza del prefill barcode è **ancora non fatto**, come deciso. |
| `NutriGest_P128_Alimenti_Etichetta_Ragionamento.md` | ⚠️ «Nessuna riga di codice scritta» è **falso**: tappe 1-5 chiuse la sera stessa del 5 ago. Resta vera solo la **tappa 6**. |
| `NutriGest_P128_Soglie_Metodo.md` | ⚠️ **Il più insidioso dei quattro P128.** «Nessuna soglia ancora decisa» è **falso** (adottate le UK FSA, provvisorie per scelta) e il §2 argomenta **contro** ciò che è implementato: letto come guida fa «correggere» una decisione presa. Il metodo però non è scartato — è la strada 1 di **P128b**. |
| `NutriGest_Roadmap_Semplice.md` | ⚠️ Fotografia del 6 ago con quattro sezioni riverificate il 12 (`c68565b`): sincronizzazione, database, collaudi arretrati, intestazione. **Si rigenera dalle schede del repo, non si legge come stato.** |
| `NutriGest_TDEE_Parte1_Ragionamento.md` | ⚠️ «Nessuna modifica al codice è stata fatta» è **falso** (P147 chiusa, `77649f0`); la «parte 2» che dà per aperta **è chiusa** (P149); il catalogo del §6 propone 78 voci mentre `_MET_CATALOGO` ne ha **117, di cui 108 col codice Compendium**. Si tiene per il *perché* del motore MET additivo. |
| `NutriGest_P87_Comunicazione_Analisi.md` | ⚰️ **ASSORBITO** il 10 ago (`a81fe0b`). Era il documento dell'incidente del 30 luglio; nel cartello resta la verifica delle tappe e dei due punti tecnici rispettati. |
| `NutriGest_P122_Collaudo_e_Correzioni.md` | ⚰️ **ASSORBITO** il 10 ago (`a81fe0b`). La domanda aperta ha una risposta: F6 è chiuso davvero — `p-obiettivo` era sparito dal markup mentre `salvaPaz` lo leggeva. |
| `NutriGest_Obiettivo_Ragionamento.md` | ⚠️ La tabella del §10 segna ✅ solo la tappa 1: **P122 è completa dal 26 luglio**, tutte e 5. **Si tiene**: il §3 è la fonte di verità sul *perché* il traguardo si deriva dalla % di grasso e non dal peso. |
| `NutriGest_Grafici_InBody_Ragionamento.md` | ⚠️ «Codice: non ancora toccato» è **falso**: P99 chiusa 28/7, e i due punti «Aperto» sono P131 e P132, entrambe chiuse. **Nota per P153:** la soglia dei 21 giorni è tarata sulla BIA InBody, non si copia su altri strumenti senza ripensarla. |
| `NutriGest_Grammature_Regole.md` | ⚰️ **ASSORBITO** il 10 ago: era una specifica, ed è diventata codice per intero in P121. Il suo punto aperto è deciso — gruppi di equivalenza diversi usano la **porzione standard** (`_porzioneStandard`). Da non confondere con `Grammature_Analisi`. |
| `NutriGest_Pazienti_Storici_Metodo.md` | ⚠️ Il flusso descritto **ignora P142 e P63b**, entrambe del 31 luglio. Si tiene per il metodo di caricamento degli storici, non per il flusso. |
| `NutriGest_FODMAP_Confronto_Fonti.md` | ⚰️ **ASSORBITO** il 10 ago: le tre proposte del §7 sono eseguite tutte. Resta viva **solo P130**, il cui stato di partenza è nella sua scheda. |
| `NutriGest_Grafici_Decisioni_Aperte.md` | ⚰️ **ASSORBITO** il 10 ago, ed era «il più pericoloso»: dichiarava tutto da implementare quando tutto era fatto (P131, P132), e proponeva i pulsanti di periodo **rimossi su richiesta esplicita di Fabrizio** (P134a). |
| `NutriGest_Grammature_Analisi.md` | ⚰️ **ASSORBITO** il 10 ago. Le **due proposte RESPINTE** — banda di plausibilità e guardia al 25% — restano in testa al cartello; il rifiuto è motivato **dentro il codice**. |
| `NutriGest_FODMAP_Verifica_Perplexity.md` | ⛔⚰️ **ASSORBITO il 10 ago — e resta un NON-FONTE.** Nessun valore va in un documento consegnato al paziente finché P130 non è chiusa, **comprese le voci «✓ Confermati»** (confermate contro siti divulgativi, non contro l'app Monash). Conservato per il *metodo*: da qui nasce la regola 14. |
| `CLAUDE.md` (copia nel progetto) | Riallineata al repo il 4 ago; il repo è cresciuto il 6, 10, 11 e 12 agosto (regole 26-28, punti 5-8 della Regola 23, righe mancanti). **In caso di divergenza vince il repo.** |

**Ancora aperta dentro la fonte di verità** (nessuna sessione ha toccato quella zona): in
`NutriGest_Roadmap_v4.md` il titolo della scheda **P122** dice «Tappa 1 chiusa, tappe 2-5
aperte» mentre trentotto righe più sotto lo stesso file scrive «P122 COMPLETA». **Un file che
si contraddice da solo è peggio di due file che si contraddicono fra loro**: chi legge non ha
modo di accorgersene. *E una correzione parziale è essa stessa una trappola* — nel caso gemello
di P124 la passata del 4 agosto sistemò il corpo della voce e lasciò la scheda, cioè proprio il
punto a cui rimandava.

### Regola 23 — un documento nuovo nasce già datato, e muore con la voce che l'ha generato

1. **Ogni documento nuovo nasce con un'intestazione di stato**: data, commit di riferimento,
   cosa è già implementato, cosa resta aperto. Senza, è una trappola dal giorno dopo.
2. **Non si crea un documento se il contenuto sta già nel CHANGELOG.** La domanda è «questo
   ragionamento serve fra tre mesi *e* non entra nel CHANGELOG?». Se non è sì a entrambe, si
   scrive una voce di CHANGELOG, non un file.
3. **Quando una voce di roadmap si chiude, il documento che l'ha progettata si marca nello
   stesso giro di consegna.** Costa un minuto; non farlo costa una sessione rifatta. *(«Chiusa
   in codice» e «collaudata» sono due chiusure diverse: si marcano entrambe.)*
4. **La tabella si riverifica quando si tocca un documento**, e la data in cima si sposta solo
   se la verifica è stata fatta davvero: **le dichiarazioni non si credono, si controllano.**
5. **Un documento di progetto non può contenere una voce di roadmap che il repo non ha, né
   assegnare un numero di voce.** (6 ago 2026.) Il numero si legge dal repo; se il repo non è
   raggiungibile, si chiede la cartella prima di scrivere.
6. **Un documento assorbito non si cancella: si sostituisce con un cartello di rimando** (data,
   commit della verifica, «conteneva → dove sta la verità»). La cancellazione lascia il buco;
   il cartello manda la prossima sessione al posto giusto. (10 ago 2026.)
7. **Una riga della tabella vale in due posti — repo prima, copia poi, NELLO STESSO MESSAGGIO
   in cui il documento nasce.** (11 ago, indurita il 12: è successo due volte in due giorni.)
   **Un indice incompleto è più pericoloso di un documento vecchio**, perché nessuno pensa di
   verificare l'indice. *Dove la penna sbaglia due volte serve una guardia meccanica (→ P155).*
8. **Una riga che dichiara «in vigore» un vincolo temporaneo si è data una scadenza, e va
   riletta il giorno in cui il vincolo cade.** (12 ago 2026: una riga scritta al mattino era
   falsa la sera, quando il collaudo di P157 fece decadere le regole restrittive.) *È
   prevedibile quale sia quel giorno: è scritto lì accanto cosa deve succedere.*

## Checklist documentazione — OBBLIGATORIA dopo ogni modifica

Nata da un incidente reale (16 lug 2026): P62/P77 erano implementate dal 7 lug ma la Roadmap diceva ancora «Da fare», e una sessione successiva stava per rifarle da zero. **La documentazione non si aggiorna «dopo, con calma»: si aggiorna nello stesso giro di consegna, e i file documentali entrano nello STESSO blocco commit del codice.** Una consegna senza CHANGELOG aggiornato è una consegna incompleta.

1. **CHANGELOG.md** — SEMPRE, per ogni modifica reale (append in cima): cosa, perché, lezioni.
2. **NutriGest_Roadmap_v4.md** — se la modifica chiude, avanza, blocca o riclassifica una voce: la scheda (Stato + commit + data + nota) SUBITO.
3. **NutriGest_Contesto_v18.txt** — solo se cambia il funzionamento attuale: funzioni riusabili, flussi, strutture dati, decisioni architetturali.
4. **CLAUDE.md** — solo se cambiano regole operative o emergono lezioni permanenti.
5. **INDEX.md** — **a OGNI sessione che tocca `index.html`**: `cd test-suite && node rigenera-index.js`. *(La vecchia politica «solo dopo modifiche strutturali» aveva prodotto un indice con 719 numeri su 730 sbagliati.)*

**Dal 26 lug 2026 parte della checklist è AUTOMATICA** (`test-suite/test/s1-doc-allineata.test.js`): (a) INDEX.md allineato — il messaggio d'errore contiene il rimedio; (b) nessun id letto dal codice che non esista più nel markup (famiglia F6/F7: campo tolto, lettura rimasta, dato azzerato in silenzio a ogni salvataggio), con gli orfani noti classificati in `ORFANI_NOTI` col motivo; (c) le strutture `p.*` principali documentate nel Contesto. **La lezione dietro: le dichiarazioni non si credono, si controllano** — l'intestazione di INDEX.md dichiarava un riallineo completo mentre 657 voci su 687 erano sbagliate. Ciò che il test non può controllare (la prosa di CHANGELOG/Contesto/Roadmap) resta responsabilità della checklist qui sopra.

**ORFANI_NOTI è un elenco di deroghe, non di assoluzioni.** «Censito» non vuol dire «innocuo»: il 30 lug 2026 si è scoperto che `#dash-agenda`, orfano noto, era letto da `renderDashboard()` con un `if(!agendaEl) return;` che usciva dalla funzione a metà — Sintesi clinica, Pazienti recenti, l'intera funzione Scadenze (C8) e gli Spunti **non erano MAI stati eseguiti**, e nessuno se n'era accorto perché quelle sezioni mostravano il testo statico dell'HTML. **La domanda non è «è censita?» ma «cosa smette di funzionare quando l'elemento non c'è?»**

## Checklist di chiusura/avanzamento voce (obbligatoria)
Quando una voce di roadmap si chiude o avanza di fase, aggiornare NELL'ORDINE:
1. **CHANGELOG.md** — nuova voce in cima con il racconto completo (unico posto per la storia).
2. **NutriGest_Roadmap_v4.md** — SOLO la SCHEDA della voce (stato, data, commit); se chiusa del tutto, spostare la scheda nell'archivio in fondo. Nessun altro punto del file va toccato: dal 18 lug 2026 non esistono più riepiloghi di stato duplicati (il riepilogo di testa è stato spostato nel CHANGELOG e i Blocchi A-D sono congelati come storico).
3. **NutriGest_Contesto_v18.txt** — SOLO se cambia il funzionamento dell'app (trasporti, tabelle, autenticazione, flussi).
4. **INDEX.md** — SOLO se funzioni aggiunte/rimosse/rinominate.
5. **Roadmap semplice** (progetto Claude) — rigenerata a fine sessione in formato "solo cosa resta".
6. **Verifica incrociata finale** — cercare il numero della voce (es. "P66c") in tutti e 4 i file del repo: nessuno deve dire una cosa superata. Se un file fuori perimetro risulta stantio, si corregge nella stessa sessione.

## Il costo d'ingresso: cosa si legge per intero e cosa si interroga

Una sessione **non** legge 1,3 MB di documentazione. Ne legge per intero **uno solo**:

| File | Peso | Come si usa davvero |
|---|---:|---|
| **`CLAUDE.md`** | **~48 KB** | **si legge tutto, ogni sessione** — è l'unico costo d'ingresso vero |
| `INDEX.md` | 49 KB | si cerca un nome di funzione, mai letto tutto |
| `NutriGest_Roadmap_v4.md` | 380 KB | si cerca la scheda della voce |
| `CHANGELOG.md` | 660 KB | si cerca il numero di voce |
| `NutriGest_Contesto_v18.txt` | 280 KB | si cerca la sezione |

**Ed è controintuitivo:** la dimensione di CHANGELOG, Roadmap e Contesto **non è un problema** —
cercare in 660 KB costa quanto cercare in 66. Il file su cui la brevità conta è **questo**,
l'unico che si paga per intero ogni volta. *(Corollario per chi misura: sommare i cinque dà un
numero grande e falso, e un obiettivo di riduzione posto su quel numero fa tagliare nella
memoria del progetto lasciando crescere l'unico file da tenere corto.)*

**Compattato il 12 agosto 2026 da 61 a ~48 KB**, su richiesta di Fabrizio. Non tagliando
sostanza: **nessuna regola persa, nessun numero cambiato, ogni documento ancora in tabella col
suo verdetto.** È sparita la ripetizione — la regola 24 che riscriveva la sezione «Connettori»,
una lezione scritta in tre punti diversi, un paragrafo diventato falso — e il *racconto* degli
episodi dentro le regole, che vive nel CHANGELOG. **Prima di aggiungere un paragrafo qui, la
domanda è se non stia meglio nel CHANGELOG:** la risposta è sì tutte le volte in cui è il
racconto di un episodio invece di una regola da rileggere.

## Ottimizzazione token — INDEX.md
Il file `index.html` è un monolite di grandi dimensioni: leggerlo per intero prima di ogni modifica è costoso in token e va evitato.
- **`INDEX.md`** (nella cartella del progetto) mappa **899 funzioni** top-level per area funzionale (Pazienti, Analisi del sangue, Composizione corporea, Motore TDEE, Generatore piani, Compositore manuale, Calendario, Autenticazione, ecc.) con il numero di riga di ciascuna.
- Prima di ogni modifica: apri `INDEX.md`, trova l'area/funzione pertinente, poi usa `view` con `view_range` mirato su `index.html` invece di leggere tutto il file.
- Se il nome funzione non è chiaro o non è in tabella, fai prima `grep -n "nomeFunzione" index.html`.
- Dal 26 lug 2026 le righe di `INDEX.md` sono **garantite dal test** `s1-doc-allineata`: se la suite è verde, l'indice è esatto. Se un `view_range` non corrisponde, la suite non era stata fatta girare — `node rigenera-index.js` e riparti.
- **Rigenera `INDEX.md` a ogni sessione che tocca `index.html`**: `cd test-suite && node rigenera-index.js`. Lo script stampa quante voci ha corretto — quel numero va guardato, non dato per buono.
- Usa `str_replace` per le modifiche puntuali quando la stringa target è già nota e univoca, senza bisogno di rileggere l'intero file.

## Quanto si scrive — una voce per SESSIONE, non per consegna (5 ago 2026)

Osservazione di Fabrizio: «stai producendo davvero tanti documenti e molto lunghi». Misurato lo
stesso giorno: **493 righe di CHANGELOG in una giornata, in dieci voci** che ripetevano le
stesse lezioni; fuse in tre senza perdere nulla, da 499 a 227 righe.
- **Una voce di CHANGELOG per sessione, non una per consegna.** Quattro tappe chiuse in un
  giorno sono UNA voce con quattro paragrafi.
- **La lezione permanente NON vive nel CHANGELOG:** diventa una riga numerata qui. Il CHANGELOG
  racconta l'episodio una volta sola; sono le regole numerate a essere rilette ogni volta.
- **La dimensione non è il problema, la ripetizione sì.** Quello che si paga è rileggere tre
  volte lo stesso ragionamento in tre punti diversi.

## Stile della documentazione — conciso ma completo
Quando aggiorni CLAUDE.md, CHANGELOG.md, Roadmap o INDEX.md, punta al conciso-ma-completo: taglia il superfluo, non la sostanza.
- **Conserva sempre:** root cause dei bug, il "perché" delle decisioni (non solo il "cosa"), gli incidenti e le lezioni imparate, i vincoli non ovvi. È la parte che ha valore mesi dopo — non sacrificarla per brevità.
- **Taglia:** ripetizioni, ri-spiegazioni di cose scritte poche righe sopra, elenchi di funzioni/righe già presenti in INDEX.md, dettagli meccanici ricostruibili dal diff git o dal codice stesso.
- In pratica: una voce di CHANGELOG/Roadmap dice cosa è cambiato, perché, e cosa sapere per non rifare l'errore — senza duplicare ciò che il codice o l'INDEX già dicono meglio.

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
- Autenticazione: schermata di login vera (`eseguiLogin`, Supabase `auth/v1/token` + refresh token). Fino al 31 lug 2026 questa riga diceva «nessuna (app personale)»: era rimasta indietro.
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
8. **Mai proprietà custom su array che vengono salvati** — `JSON.stringify` di un array ignora silenziosamente proprietà extra attaccate direttamente all'array (es. `piano._qualcosa = 'x'`); se il piano viene salvato su Supabase con `JSON.stringify(piano)`, quel dato sparisce al primo ricaricamento senza errori. Un flag/config va sempre su un campo di un oggetto dentro l'array (es. `piano[0].qualcosa`), mai sull'array stesso. (Scoperto e corretto durante P95, 14 lug 2026.)
9. **Attenzione ai rami di rendering "morti"**: più punti del codice condividono la stessa logica (es. render del giorno) ma solo UNO è il percorso realmente usato dall'interfaccia in produzione — gli altri possono essere raggiungibili solo in modalità legacy/fallback che l'utente non usa più. Prima di aggiungere una funzionalità a una funzione di render, verificare quale `if`/`return` precoce decide il percorso attivo (es. presenza di un elemento DOM come `#piano-select-paz`), altrimenti il codice è corretto ma invisibile. (Bug trovato in P94, corretto 14 lug 2026, commit 7aa3eb6.)

10. **Array cronologici: "l'ultimo elemento = lo stato attuale" è un'invariante di ordinamento implicita**, e il primo inserimento fuori ordine la rompe in silenzio. (P120, 25 lug 2026: ~20 punti leggevano `p.inbody[p.inbody.length-1]` mentre `salvaInbody` faceva `push` senza riordinare — caricare un referto vecchio dopo uno recente faceva girare TDEE, macro e prompt AI sul dato sbagliato, senza errori a video.) **Regola: l'invariante si garantisce nel punto di SCRITTURA** (ordinamento prima del save + migrazione idempotente sui dati esistenti), non correggendo i punti di lettura uno per uno — su codice clinico è la stessa correttezza con un decimo del rischio. Terza della famiglia dopo P118 tappa 1 e F4.
11. **Un valore di ripiego silenzioso su un dato che ordina il tempo è un bug in attesa** — `data: campo.value || today()` in `salvaInbody` sembrava prudente e invece era l'unico modo per cui un referto storico potesse prendere la data di oggi e falsare lo storico. Se un campo è strutturalmente necessario, meglio **bloccare con un messaggio chiaro** che riempirlo con un default plausibile. Vale la stessa frase già scritta per P118: una data inventata è peggio di una data mancante.

12. **Quando due parti del codice scrivono lo stesso campo con valori diversi, il danno non è dove si scrive: è in CHI LEGGE.** (F9, 26 lug 2026: due motori del semaforo scrivevano `p.alimenti` con vocabolari diversi. Le schermate riconoscevano entrambi — a video sembrava tutto normale — ma prompt AI, validatore e avvisi allergeni riconoscevano solo il primo: un alimento sconsigliato si vedeva grigio ed era **invisibile ai controlli di sicurezza**.) **Regola: davanti a una doppia scrittura, prima di stimarne la gravità si fa l'inventario dei LETTORI** e di quali valori ciascuno riconosce — è lì che si scopre se il bug è cosmetico o clinico. La correzione è quella di F4 (una fonte sola, vocabolario dichiarato in un posto solo) più una **migrazione idempotente in TUTTI i punti da cui i dati rientrano**: cache locale, blob dal server, import di backup — dimenticarne uno rimette in circolo i valori vecchi.

13. **Codice marcato "DEPRECATO" ma ancora raggiungibile è codice vivo.** `_applicaRegoloSemaforoLEGACY` aveva il commento "DEPRECATA — sostituita da…" da settimane ed era appesa a un pulsante reale. Il commento non disattiva niente: o si rimuove la chiamata, o la voce va in roadmap con una data. Vale anche al contrario: prima di rimuovere, verificare la raggiungibilità reale (F9: il pulsante compariva solo `if(p.regolaAttive.length)`, e quel campo lo scriveva **solo** il motore deprecato — un cerchio chiuso che lo rendeva invisibile sui pazienti nuovi e armato su quelli storici).

14. **Un dato clinico di laboratorio non si prende dalla memoria di un'AI né da un motore di ricerca AI.** (28 lug 2026, porzioni low-FODMAP: sbagliavano **entrambe** le fonti in punti diversi — le stime a memoria e Perplexity Pro, che dava il sedano low a 40-50 g quando la soglia è 10, errore **permissivo** di 4-5×.) **Il segnale d'allarme più forte non era un numero sbagliato ma la FORMA della risposta:** 67 alimenti, 67 valori tondi e sicuri, zero buchi dichiarati nonostante la richiesta esplicita di dichiararli — e le citazioni puntavano ad Alibaba e Scribd mentre la nota finale diceva «dati di laboratorio Monash». **In pratica:** (a) su valori che finiscono in un documento consegnato al paziente serve la fonte **primaria**; (b) ogni valore porta accanto **fonte e data** (`{max:42, fonte:'Monash'}`, e il badge deve mostrarle) perché le soglie cambiano — i mirtilli sono passati da 40 a 125 g; (c) un dato non verificato si dichiara tale in roadmap con una voce a sé (→ P130), non si lascia passare perché «è il migliore che abbiamo». **Un valore inventato è peggio di un valore mancante.**

15. **«Che giorno è» si chiede all'orologio LOCALE — e la funzione che lo fa deve essere UNA.** `toISOString()` risponde con l'ora di Greenwich: fra mezzanotte e le 01:00/02:00 italiane è ancora al giorno prima. Usa `ymdLoc()` / `today()`, mai `new Date().toISOString().slice(0,10)`. Se un caso è davvero in UTC, **dichiaralo sulla riga** con `/* UTC-VOLUTO: motivo */`, o il test `s1-date-locali` diventa rosso. Restano su `toISOString` i marca-tempo (`updated_at`, `creato`, `timestamp`): non dicono che giorno è, dicono in quale istante — ed è su quello che i dispositivi decidono chi ha salvato per ultimo. **La lezione più grande di P141 non è il fuso orario: è che il file conteneva TRE funzioni per la stessa cosa**, quella rotta e due copie corrette scritte da chi aveva sbattuto contro il problema nel proprio angolo. Quando trovi un difetto in una funzione condivisa, **ripara il rubinetto**: un helper corretto scritto accanto al proprio codice lascia rotti tutti gli altri usi. (31 lug 2026.)

16. **Una voce di roadmap che CONTA le occorrenze di un pattern non ha ancora fatto il lavoro: il lavoro è CLASSIFICARLE.** P141 diceva «45 usi di `toISOString` da sostituire». Erano 43, e 23 erano corretti: sostituirli tutti avrebbe rotto la sincronizzazione fra dispositivi. Prima di una modifica ad alto conteggio, dividere gli usi per SIGNIFICATO e dichiarare quali non si toccano e perché. (31 lug 2026.)

17. **Una decisione presa senza prove va riaperta quando le prove arrivano — ma quasi mai facendo la cosa che avevi scartato.** L'8 lug 2026 P63b (conferma con diff sull'import InBody) fu chiusa come «decisa di non fare», con un motivo giusto: un clic in più a ogni import anche quando è tutto corretto. Poggiava però su un presupposto **mai verificato** — che gli errori di lettura fossero rari. Il 31 lug, su 25 referti veri: ~1 su 2 con un errore, 1 su 5 grave (massa magra 45 kg letta 88). Il modo sbagliato di reagire sarebbe stato ribaltare il no; quel no era e resta valido. Il modo giusto è chiedersi **quale rischio è cambiato di forma**: non «il valore vecchio contro il nuovo» ma «il numero è plausibile?». **In pratica: in roadmap si scrive il PRESUPPOSTO su cui si è deciso, non solo la decisione** — così quando la realtà lo smentisce si sa cosa riaprire e cosa no.

18. **Se i dati sono legati da identità aritmetiche, il controllo non ha bisogno né dell'AI né del documento originale.** I valori delle analisi del sangue sono indipendenti fra loro: per accorgersi che uno è letto male servono euristiche (P124). Quelli dell'InBody no — «peso = massa grassa + massa magra» è la definizione con cui la bilancia stampa il foglio, non una stima: lì l'errore si trova con **una sottrazione**, in locale, senza una seconda chiamata AI e senza avere il referto sotto mano. **Prima di progettare un controllo su dati importati, cercare le identità che li legano.** Corollario visto in P63b: più controlli che si sovrappongono **localizzano** l'errore (massa magra sbagliata → salta solo la somma; massa grassa sbagliata → saltano somma e percentuale) — proprietà che vale la pena fissare con un test, perché si perde al primo ritocco delle tolleranze.

19. **Su un avviso, la metà più importante dei test è il SILENZIO.** «Un avviso che ha sempre ragione smette di essere letto» era in roadmap da tempo ma non era mai diventato disciplina di collaudo. In P63b metà dei 20 test nuovi verifica che l'avviso **non** parli: referto corretto, scarti di arrotondamento, virgola italiana, campi mancanti, tutti e 20 i livelli viscerali validi. E le tolleranze si scelgono larghe di proposito: meglio lasciar passare un errore piccolo che bruciare la credibilità dell'avviso con un falso allarme. **Il primo collaudo di un avviso nuovo non è «si accende quando deve», è «resta spento quando deve».**

20. **Un commento che cita una fonte non è una verifica che i numeri vengano da quella fonte.** In P147 (3 ago 2026) la tabella MET portava in testa «MET dal Compendium 2024»: diversi valori erano del **2011** — Pilates 3.5 invece di 1.8, Spinning 7.0 invece di 9.0. Il commento era stato creduto per un mese perché *sembrava* una verifica. **In pratica: accanto a ogni valore preso da una fonte esterna va l'identificatore che permette di ritrovarlo** (per i MET il codice a 5 cifre del Compendium), non il nome della fonte in cima alla tabella. Un'etichetta tradotta in italiano non è un identificatore: è una nostra parafrasi, e cambia. Stessa famiglia della regola 14 — fonte e data stanno **accanto al dato**, non nell'intestazione.

21. **Rinominare una voce di un catalogo è una migrazione di dati, non un ritocco di testo.** Sempre P147: le attività erano salvate sui pazienti per NOME (`attivitaSpecifica: 'Pilates'`). Cambiare l'etichetta in «Pilates, matwork» avrebbe fatto fallire il lookup, reso il MET `null`, scartato la riga e **azzerato l'EAT senza un errore a video** — il paziente si sarebbe trovato con qualche centinaio di kcal in meno. Serve una mappa di alias vecchio→nuovo e un test che percorra **tutte** le etichette storiche: se una salta deve diventare rosso subito, perché in produzione il sintomo è invisibile. Vale ogni volta che una stringa è insieme etichetta e chiave.

22. **Una guardia scritta per un campo solo è una guardia che verrà dimenticata al secondo campo.** Nel salvataggio dell'anagrafica `pesoTarget` aveva già la protezione `_stessoPaz` (leggi dal pannello TDEE solo se mostra QUESTO paziente). I campi attività, immediatamente sotto, no: col pannello chiuso il salvataggio li **azzerava**, col pannello aperto su un altro paziente glieli **copiava addosso**. Quando si scrive una guardia, va chiesto subito **quali altri campi hanno la stessa provenienza**, e la guardia va applicata al gruppo. (4ª occorrenza della famiglia «dato letto da un form che non gli appartiene».)

23. **Un documento nuovo nasce già datato, e muore con la voce che l'ha generato.** ➜ Testo completo in otto punti nella sezione **«Regola 23»** più sopra, insieme alla tabella di stato dei documenti di progetto. *(Questa riga esiste dal 10 ago 2026 perché la lista saltava da 22 a 24: chi citava «regola 23» e chi scorreva l'elenco non trovavano la stessa cosa. La numerazione NON si rifà — le regole sono citate per numero nel CHANGELOG.)*

24. **I connettori non sono strumenti come gli altri: uno scrive sul database di produzione, l'altro pubblica online.** (6 ago 2026.) ➜ Le regole operative complete — Supabase in sola lettura, i due progetti da non confondere, l'approvazione esplicita a OGNI push su GitHub, e cosa il sandbox raggiunge davvero — vivono nella sezione **«Connettori collegati»** più sopra, in un posto solo. *(Fino al 12 ago 2026 erano scritte due volte, qui e là, con parole diverse.)*

25. **Nel Contesto si scrive lo STATO, e la posizione si dichiara con l'IDENTIFICATORE — mai con l'etichetta a schermo, mai come transizione.** (11 ago 2026, scoperto da Fabrizio chiedendo «questo errore si è ripetuto altre volte?».) P149 scrisse che il blocco strade sta «nel passo *"3 · Quanto in fretta"*»; il giorno dopo P150 fuse i passi e la frase divenne falsa — mentre `#mac-strada-box`, l'id citato nella stessa frase, è ancora lì e ancora vero. **La frase non è invecchiata perché nessuno l'ha aggiornata: era scritta in modo da poter invecchiare.** E un **commento morto** in `index.html` citava lo stesso passo fantasma, così doc e codice si confermavano a vicenda su una cosa falsa. **Tre gesti:** (a) una frase di posizione si scrive *«sta in `#id`, scritto da `funzione()`»*, l'etichetta umana può seguire come orientamento, mai come coordinata; (b) si descrive lo **stato attuale** con la provenienza breve («così dal P149»), non il movimento «prima X, ora Y» — le transizioni sono mestiere del CHANGELOG e hanno *due* estremi che possono morire; (c) **chi rinomina o fonde sezioni ha nel proprio giro di consegna il grep del vecchio nome su TUTTO il repo, commenti compresi**. **Limiti dichiarati:** vale per le frasi di posizione, non per le parti cliniche senza identificatori; un identificatore può esistere e aver *cambiato mestiere*; ed è una regola di penna — la guardia meccanica è P155, la bonifica dell'esistente è P156.

26. **Una guardia che copre una strada su due è una guardia che qualcuno aggirerà senza saperlo — e quando un difetto non è rilevabile, si consegna l'attrezzo, non un controllo che finge di vederlo.** (12 ago 2026, P157.) Il controllo conflitti P69 esisteva ed era corretto, ma era scritto per il push per-id: il push **completo** — la strada dell'avvio, del pulsante «Sincronizza» e di ogni `save()` senza id — non ci passava. Sei pazienti riscritti da un PC rimasto indietro. È la regola 22 spostata dai *campi* ai *percorsi*: **quando scrivi una guardia, chiediti subito «quali ALTRE strade arrivano a questa scrittura?»**, e mettila dove confluiscono, non in ciascun chiamante (regola 15). **Seconda metà:** la stessa voce aveva un difetto *strutturalmente* invisibile — una scrittura fatta direttamente sul database lascia `updated_at` invariato, e nessun confronto di date può accorgersene. Lì non si scrive un controllo più furbo: si dà all'utente un comando esplicito (`riallineaTuttoDalCloud()`, col suo pulsante) e **si dichiara il buco nel test e nella scheda**.

27. **Un esito giusto per il motivo sbagliato passa il collaudo lo stesso.** (12 ago 2026, collaudo di P157.) Cancellato un referto e premuto «Riscarica tutto dal cloud» senza sincronizzare, ne restavano 23: giusto — ma **due meccanismi diversi danno lo stesso 23** (la cancellazione già arrivata al server, oppure la scheda *saltata* perché ancora sporca), e a schermo sono indistinguibili; nel secondo caso il collaudo avrebbe promosso una funzione mai eseguita. Deciso con una query aggregata sul database. **La domanda non è «il numero è quello che mi aspettavo?» ma «quali strade portano a questo numero, e quale ha agito?»** — regola 16 spostata dal codice al collaudo. *Corollario:* un'operazione che può SALTARE delle righe deve dirlo sempre, non solo quando ne salta.

28. **Un'azione il cui effetto avviene fuori dal campo visivo è indistinguibile da un'azione che non è avvenuta** — e chi la usa la dichiara rotta, con ragione. (12 ago 2026, P159: «Vai al giorno» cambiava il giorno e ridisegnava il piano, ma il pannello si apre da un badge che sta *sopra* il piano, quindi il cambiamento accadeva sotto la piega.) **Un comando che dichiara un movimento deve muovere anche lo sguardo** (`scrollIntoView`) **e dire dove ti ha portato**: lo scorrimento muto lascia lo stesso dubbio. *Corollario per la diagnosi:* «il codice è corretto» e «il difetto non esiste» sono affermazioni diverse — qui la prima era vera e la seconda falsa.

## Flusso di lavoro preferito
1. Modifica `index.html`
2. Testa in Chrome locale aprendo il file
3. Se funziona → commit (vedi Comandi utili)
4. Il sito si aggiorna automaticamente su GitHub Pages in ~30 secondi

## Stato sviluppo e prossimi passi
Il generatore automatico di piani alimentari (lettura dati paziente → ricette → piano settimanale nel mio stile → correzione manuale → PDF) è **già realizzato e in uso**, non più un obiettivo futuro. Lo stato attuale dello sviluppo (voci chiuse, in corso, da fare) vive SEMPRE in `NutriGest_Roadmap_v4.md` — consultare quello, non questo file, per sapere cosa fare dopo.

## Comandi utili
```bash
# Vai al progetto
cd C:\Users\giann\Desktop\nutrigest

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
