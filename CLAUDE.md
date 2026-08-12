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
- **Il blocco commit deve essere copiabile nel Prompt dei comandi di Windows (cmd.exe): ogni comando su UNA SOLA riga fisica.** Fabrizio lavora da `C:\Users\giann\Desktop\nutrigest>`, non da bash. Un `git commit -m "riga1<a capo>riga2"` in cmd chiude la stringa a fine riga: il commit parte con il solo titolo e **tutte le righe successive vengono eseguite come comandi**, producendo una cascata di `"-" non è riconosciuto come comando`. Per un messaggio a più paragrafi si usano **più `-m` di seguito sulla stessa riga** (`git commit -m "titolo" -m "primo paragrafo" -m "secondo paragrafo"`). Da evitare dentro le virgolette anche `%` e `!` (cmd li espande) e `>` `<` `|` `&`. (29 lug 2026, incidente reale.)
- Mai `git add -A` o `git add .` nel blocco commit: sempre i file espliciti.
- Mai suggerire `push --force` o varianti. Se il push viene rifiutato (non-fast-forward), il rimedio è: `git pull` e rieseguire — e se compare un conflitto, fermarsi e portare il problema a Claude, non risolverlo a mano.
- Una sola sessione di lavoro Claude alla volta sul repo: mai due chat in parallelo che modificano file.
- Rollback: ogni commit è recuperabile con `git revert <sha>` — la storia di GitHub è il backup del progetto; non servono copie manuali.

## Connettori collegati (dal 10 agosto 2026) — regole d'uso

Dall'app Claude sono collegati: Supabase, PubMed, Google Drive, Gmail, Google Calendar, Claude in Chrome, più i plugin Design e Bio Research. Analisi completa: `claude/NutriGest_Connettori_Analisi.md` nel progetto. Tre regole NON negoziabili:

1. **Supabase: SOLA LETTURA per impostazione predefinita.** Il connettore può eseguire DDL (`apply_migration`, `execute_sql`) sul database di produzione, dove `git revert` non esiste. Qualsiasi scrittura (anche una riga) solo dopo OK esplicito di Fabrizio nello stesso giro di messaggi, con l'SQL mostrato PRIMA di eseguirlo. E l'organizzazione ha DUE progetti (`Nutrigest` = `zrhmspylnlklppvhgplp`, eu-west-1; `RISVEGLIO` = `zxuexfhuxxmsleiqkoaz`): il `project_id` va dichiarato a voce prima di ogni chiamata — sbagliare progetto significa scrivere sul database sbagliato senza che niente lo impedisca.
   **PRIMA SCRITTURA AVVENUTA L'11 AGOSTO 2026** (migrazione `p151_p152_p154_pk_composta_timestamptz_rls_initplan`: P151+P152+P154). La regola ha retto e la sequenza usata è il precedente da ripetere: verifiche di sola lettura sui **prerequisiti** → verifica di cosa si rompe **lato client** → SQL completo mostrato a Fabrizio con il `project_id` dichiarato → spiegazione in parole sue → **OK esplicito** → controllo pre-volo che nulla sia già applicato → esecuzione in **una sola migrazione** (una sola transazione) → riletta di advisor **e dati**. Due cose imparate quel giorno: **una migrazione DDL si accorpa**, perché aprire tre volte le stesse tabelle di produzione è tre volte il rischio; e **un controllo che dichiara un difetto va verificato come si verifica un difetto** — la query di verifica ha annunciato «8 policy non ottimizzate» che non esistevano, perché Postgres riscrive `(select auth.uid())` come `( SELECT auth.uid() AS uid)`.
2. **PubMed: un valore numerico dalla letteratura entra in `index.html` solo col PMID/DOI accanto al dato** (estensione della regola 20 — come il codice a 5 cifre del Compendium per i MET), e solo se letto dal testo completo, mai dal solo abstract. **PubMed NON chiude P130**: i valori FODMAP di Monash sono un dataset proprietario dell'app Monash, non una pubblicazione.
3. **Google Calendar NON si collega al prodotto.** NutriGest ha già la sua agenda (`eventi`, Scadenze C8): una sincronizzazione creerebbe due fonti di verità sulla stessa cosa — famiglia F4/regola 12. Se un giorno servirà, solo esportazione a senso unico.

## Due lezioni del 30 luglio 2026

**1. I documenti del progetto Claude sono foto PIU' VECCHIE della roadmap.**
La regola "incrocia il CHANGELOG prima di implementare" (nata da P62/P77) va estesa ai
file `claude_NutriGest_*.md` del progetto. Il 30 lug una sessione stava per ricostruire
`p.invii[]` e il motore di invio — esistenti dal 28 lug, P87 CHIUSA — perche' il documento
`NutriGest_P87_Comunicazione_Analisi.md` descrive il PIANO di quel giorno e e' stato letto
come stato attuale. Quei documenti non portano una data di stato e non vengono aggiornati
quando il codice avanza: sono ragionamenti congelati, non fotografie del presente.
**In pratica:** prima di implementare qualunque cosa descritta in un documento di progetto,
verificare nel CODICE che non esista gia' (`grep` sui nomi delle funzioni proposte).

**2. ORFANI_NOTI e' un elenco di deroghe, non di assoluzioni.**
Il test `s1-doc-allineata` vieta gli id orfani NUOVI e classifica i vecchi in `ORFANI_NOTI`
con un motivo. Ma "censito" non vuol dire "innocuo": il 30 lug si e' scoperto che
`#dash-agenda`, orfano noto, era letto da `renderDashboard()` con un `if(!agendaEl) return;`
che usciva dalla funzione a meta'. Risultato: Sintesi clinica, Pazienti recenti, l'intera
funzione Scadenze (C8) e gli Spunti non erano MAI stati eseguiti, e nessuno se n'era accorto
perche' quelle sezioni mostravano il testo statico dell'HTML.
**In pratica:** per ogni voce di ORFANI_NOTI la domanda non e' "e' censita?" ma **"cosa
smette di funzionare quando l'elemento non c'e'?"**. Un orfano dentro una guardia che fa
`return` e' un pezzo di programma spento in silenzio.

## I documenti del progetto Claude — audit del 4 agosto 2026, righe riverificate fino al 10 agosto

> **Come si legge la data.** L'audit di partenza è del **4 agosto 2026**. Da allora singole
> righe sono state riverificate contro il repo il **5, 6, 10, 11 e 12 agosto**, e ciascuna lo
> dichiara al proprio interno. *(12 agosto: aggiunta la riga di `Incidente_Sync_11ago_e_P157`,
> nato l'11 e rimasto senza riga per un giorno — **seconda occorrenza consecutiva** del
> difetto della Regola 23 punto 7, dopo `Connettori_Analisi`. Due volte in due giorni non è
> distrazione: la riga va scritta PRIMA del documento, nello stesso messaggio.)* **La data in testa non è stata spostata in blocco**, perché
> una riverifica riga per riga non è una riverifica di tutta la tabella (Regola 23, punto 4).
> *(Prima del 10 agosto 2026 questa intestazione diceva soltanto «stato verificato al 4
> agosto» pur contenendo righe del 5 e del 6: la data diceva il falso per difetto, che è lo
> stesso difetto del dire il falso per eccesso.)*

I file `claude/NutriGest_*.md` del progetto Claude sono **fotografie datate di un
ragionamento**, non lo stato del software. Nessuno li aggiorna quando il codice avanza.
Il 30 luglio 2026 una sessione ha letto `NutriGest_P87_Comunicazione_Analisi.md` come stato
attuale e stava per ricostruire da zero `p.invii[]` e il motore di invio, esistenti da due
giorni. Quella non è stata una disattenzione isolata: **l'audit del 4 agosto 2026 ha trovato
la stessa trappola in 10 documenti su 20.**

**La regola, prima della tabella:** un documento di progetto non autorizza a implementare
niente. Prima di scrivere una riga di codice ispirata a uno di questi file → `grep` sul nome
delle funzioni proposte in `index.html` **e** incrocio col `CHANGELOG.md`. Il CHANGELOG è
la fonte di verità sullo stato; questi file sono la fonte di verità sul *perché*.

| Documento | Stato al 4 ago 2026 |
|---|---|
| `_STATO_DOCUMENTI.md` | Copia di questa tabella, visibile dentro claude.ai. |
| `NutriGest_P9_Timeline_Ragionamento.md` | ✅ **Modello da imitare**: dichiara in testa cosa è implementato, con i commit. |
| `NutriGest_Plicometria_Ragionamento.md` | ✅ Dice il vero: P139 è davvero da fare, nessun codice plicometrico esiste. |
| `NutriGest_P153_Altre_Bioimpedenziometrie_Ragionamento.md` | ✅ **Nato datato il 6 agosto 2026** (Regola 23, punto 1): dichiara in testa che nessun codice esiste e che oggi c'è solo il motore InBody. La colonna «diffusione» del censimento è **dichiarata non verificata**: sono impressioni da ricognizione, non dati di mercato. |
| `NutriGest_P124_Import_Referti.md` | ✅ Dichiara già «chiusa e collaudata». |
| `NutriGest_Incidente_Sync_11ago_e_P157.md` | ✅ **Riverificato DUE volte il 12 ago 2026** (mattino e sera), contro il repo a `2b8b556`/`095b6ed`. È il **verbale dell'incidente dell'11 agosto**. Porta in testa un riquadro che dichiara **storici** il §4 e il §6 e — dalla sera del 12 — **anche il §5: le regole restrittive (una scheda, un dispositivo) sono DECADUTE** col collaudo di P157. I §1 e §3 (fatti e log della console) non invecchiano: sono il verbale. La coda viva è il **§7**, ciò che il collaudo ha prodotto: la voce **P158** e la **regola 27**. *La sua riga è nata il 12 mattina, un giorno dopo il documento — seconda occorrenza del difetto del punto 7 — e ha dovuto essere corretta la sera stessa: da qui il punto 8.* |
| `NutriGest_Connettori_Analisi.md` | ⚠️ **RIGA MANCANTE FINO ALL'11 AGO 2026 — il documento esisteva dal 10 e questa tabella non lo conosceva** (c'era solo nella copia del progetto: esattamente il difetto che la Regola 23 dice di evitare, «la tabella va fatta crescere nello stesso giro in cui nasce un documento»). Il suo **§1 è diventato storico l'11 ago**: descrive P151, P152 e P154 come difetti aperti, e sono **tutte e tre chiuse** (migrazione `p151_p152_p154_…`, commit `6c34c7c`). Il documento porta ora in testa un riquadro che lo dichiara. **Resta vivo** per PubMed (§2 — e il fatto che *non* chiude P130), Chrome (§3), Drive/Gmail/Calendar (§4) e i plugin (§5-6). |
| `NutriGest_Testi_Cosa_Entra_Nelle_AI.md` | ✅ Descrive lo stato dopo la modifica, con i marcatori di data. |
| `NutriGest_Chetogenica_Ragionamento.md` | ✅ Marcatori [fatto]/[non fatto] espliciti; i 4 punti aperti sono veri. |
| `NutriGest_Ricette_Caricamento_Massivo.md` | ✅ Il limite risolto è marcato; la fase 2 è davvero aperta. |
| `NutriGest_TDEE_Parte1b_Catalogo_e_LAF.md` | ✅ Scritto al passato coi commit. Solo il §4 è superato: il collaudo a video **è** avvenuto e ha prodotto P147d. |
| `NutriGest_P35_Peso_Casalingo_Ragionamento.md` | ✅ **Classificato il 10 ago 2026** (nato 5 ago, mai verificato prima). **Secondo modello da imitare** con P9: dichiara in testa stato, tappe, test e cosa non è stato fatto. Il suo «da tenere d'occhio» **è vero e ancora aperto**, verificato oggi: `_percorsoGeneraFasi` e `percorsoChiudiFase` leggono ancora la serie fusa `_serieePesoOss` → coda scritta nella scheda P35. |
| `NutriGest_P128_Come_Fanno_Gli_Altri.md` | ✅ **Classificato il 10 ago 2026.** È ricerca (Yuka, Fig, Monash, software per dietisti): non invecchia. Verificato oggi che il rimedio proposto sull'incoerenza del prefill barcode è **ancora non fatto** (zero occorrenze), com'era la decisione di Fabrizio del 5 ago — «da riaprire al primo prodotto italiano coi conti che non tornano». |
| `NutriGest_P128_Alimenti_Etichetta_Ragionamento.md` | ⚠️ **Classificato il 10 ago 2026.** «Nessuna riga di codice scritta» è **falso**: le tappe 1-5 sono state chiuse **la sera stessa** del 5 agosto (verificato: `_semApplicaEtichette`, `_semEtichettaValuta`, `p.nonValutati`, campi OFF allargati). Resta vera solo la **tappa 6**. |
| `NutriGest_P128_Soglie_Metodo.md` | ⚠️ **Classificato il 10 ago 2026, ed è il più sottile dei quattro.** «Nessuna soglia ancora decisa» è **falso**: sono state adottate le UK FSA per 100 g, *consapevolmente provvisorie*. Il §2 di quel documento argomenta **contro** proprio ciò che è stato implementato — leggerlo come guida porta a «correggere» una decisione presa con la sua ragione (il colore è un aiuto, non un verdetto). Il metodo che propone **non è stato scartato**: è la strada 1 di **P128b**, già scritta nella scheda. |
| `NutriGest_Roadmap_Semplice.md` | ✅ **RIGA CORRETTA IL 10 AGO 2026 — questa tabella diceva il falso.** Sosteneva che il documento «non conosce P150/P151/P152»: **li conosce**, ha una sezione per ciascuno; era stato rigenerato il 6 agosto leggendo il repo a `f356915`. Resta una fotografia — non conosce le quattro cose trovate il 10 agosto — e si rigenera dalle schede, non si legge come stato. *(Il difetto era proprio qui: la copia nel progetto Claude era giusta e questa sbagliata, mentre la regola dice che in caso di divergenza vince il repo.)* |
| `NutriGest_TDEE_Parte1_Ragionamento.md` | ⚠️ **Riverificato il 10 ago 2026.** «Nessuna modifica al codice è stata fatta» resta **falso** (P147 chiusa, `77649f0`), e il catalogo del §6 propone 78 voci mentre `_MET_CATALOGO` ne ha **117**, di cui **108 col codice Compendium a 5 cifre** e **9 voci di ripiego** «Non in elenco — Forza/Cardio/Misto × bassa/media/alta» che per costruzione non sono voci del Compendium (portano `k:'griglia'`). *(Numero corretto il 10 ago 2026 dopo una verifica sull'app in produzione: avevo scritto «tutte e 117 col codice», ed era falso — 108, non 117.)*. Si tiene per il *perché* del motore MET additivo. |
| `NutriGest_P87_Comunicazione_Analisi.md` | ⚰️ **ASSORBITO il 10 ago 2026** (verificato su `a81fe0b`: `inviaMateriale`, `p.invii[]`, `_inviiRegistra` su 5 tipi, tab `pdTab('comunicazione')`; `fodmapInviato` zero occorrenze). Era **il documento dell'incidente del 30 luglio**: descrive un piano al futuro su lavoro chiuso. Nel cartello resta la verifica delle tre tappe e dei due punti tecnici rispettati (verde calcolato da `p.invii[]`, ordinamento garantito in scrittura). |
| `NutriGest_P122_Collaudo_e_Correzioni.md` | ⚰️ **ASSORBITO il 10 ago 2026** (verificato su `a81fe0b`: `guadagnoMagra`/modo «ricomposizione», «direzioni opposte», «quota del calo» solo nei commenti, `metodo:"manuale"` nelle revisioni; la coerenza referti è diventata P63b). «Nessuna correzione è ancora stata scritta» era vero per poche ore. **La domanda aperta ha una risposta**: F6 è chiuso davvero — `p-obiettivo` era sparito dal markup mentre `salvaPaz` lo leggeva, azzerando `p.obiettivo` a ogni salvataggio; la Tappa 2 ha ricreato il campo. |
| `NutriGest_Obiettivo_Ragionamento.md` | ⚠️ **Riverificato il 10 ago 2026.** La tabella del §10 segna ✅ solo la tappa 1 e dà stime orarie alle altre: **P122 è completa dal 26 luglio**, tutte e 5. **Si tiene**: il §3 resta la fonte di verità sul *perché* il traguardo si deriva dalla % di grasso e non dal peso. |
| `NutriGest_Grafici_InBody_Ragionamento.md` | ⚠️ **Riverificato il 10 ago 2026.** «Codice: non ancora toccato» resta **falso**: P99 chiusa 28/7, `_IB_MIN_GG` è in codice, e i due punti «Aperto» sono P131 e P132, entrambe chiuse. **Nota per P153:** la soglia dei 21 giorni è tarata sulla BIA InBody e non va copiata su altri strumenti senza ripensarla. |
| `NutriGest_Grammature_Regole.md` | ⚰️ **ASSORBITO il 10 ago 2026.** Era una **specifica**, ed è diventata codice per intero in P121 (verificate tutte e sei le regole su `a81fe0b`). Il suo «punto ancora aperto» — i legumi in una cella di carboidrati — è deciso: gruppi di equivalenza diversi usano la **porzione standard** (`_porzioneStandard`). Da non confondere con `Grammature_Analisi`, che contiene invece due proposte respinte. |
| `NutriGest_Pazienti_Storici_Metodo.md` | ⚠️ **Riverificato il 10 ago 2026.** Il flusso descritto **ignora ancora P142** (lo stato «prenotato» è nel codice) **e P63b** (i controlli di coerenza sull'import InBody ci sono), entrambe del 31 luglio. Si tiene per il metodo di caricamento degli storici, non per il flusso. |
| `NutriGest_FODMAP_Confronto_Fonti.md` | ⚰️ **ASSORBITO il 10 ago 2026.** Le tre proposte A/B/C del §7 sono eseguite tutte, verificate su `a81fe0b`: buchi del semaforo colmati, le due frasi pericolose dei concetti a **zero occorrenze**, i messaggi clinici del §6 in codice, e il PDF generato dalle liste (`_fodmapCostruisciPDF`) invece che statico. Resta viva **solo P130**, il cui stato di partenza è nella sua scheda. |
| `NutriGest_Grafici_Decisioni_Aperte.md` | ⚰️ **ASSORBITO il 10 ago 2026** (verificato su `index.html` a `a81fe0b`: ventaglio/`_ibFinestra`/`_ibFasciaRitmo` esistono, `_ibFiltraPeriodo` zero occorrenze). Era «il più pericoloso»: dichiarava tutto da implementare quando tutto era fatto (P131, P132) e proponeva i pulsanti di periodo **rimossi su richiesta esplicita di Fabrizio** (P134a). Nel progetto resta solo il cartello di rimando alle schede P131/P132/P134. |
| `NutriGest_Grammature_Analisi.md` | ⚰️ **ASSORBITO il 10 ago 2026** (verificato su `index.html` a `a81fe0b`: `ricalcolaAlternative` riga 3805 chiamato dai 4 punti + output AI, `criterioByCat` non esiste più, `_etichettaCriterio` in render). Le **due proposte RESPINTE** — banda di plausibilità (§5.3) e guardia al 25% (§5.4) — restano scritte in testa al cartello: il rifiuto è motivato **dentro il codice** (commenti a riga ~3708 e ~3845), ed è lì che va tenuto. Tutto il resto è in P121, chiusa e collaudata. |
| `NutriGest_FODMAP_Verifica_Perplexity.md` | ⛔⚰️ **ASSORBITO il 10 ago 2026 — e resta un NON-FONTE.** Nessun valore di quel file va in un documento consegnato al paziente finché P130 non è chiusa, **comprese le voci marcate «✓ Confermati»**: sono confermate contro siti divulgativi, non contro l'app Monash. Conservato per il *metodo* (è il documento da cui nasce la regola 14). Verificato lo stesso giorno: **nessuno dei valori sbagliati è entrato in `index.html`**; lo stato di partenza di P130 (4 valori su 16 verificati, 1 contraddizione sulle mandorle, `fonte` mai stampata) è ora nella scheda P130. |
| `CLAUDE.md` (copia nel progetto) | Era una copia del 25 luglio **divergente** dal repo — negava perfino il login esistente dal 31 luglio. Riallineata al repo il 4 agosto 2026. |

**Trovati nella stessa passata, dentro la fonte di verità — ✅ ENTRAMBI CHIUSI.** In
`NutriGest_Roadmap_v4.md` il titolo della scheda **P122** diceva «Tappa 1 chiusa, tappe 2-5
aperte» mentre trentotto righe più sotto lo stesso file scriveva «P122 COMPLETA»: **corretto
il 4 agosto 2026**. E la scheda di **P124** diceva «CHIUSA, da collaudare» mentre quattro
righe sopra, nello stesso blocco, era scritto due volte «COLLAUDO P124b: SUPERATO (26/7)»:
**corretto il 10 agosto 2026** — la passata del 4 agosto aveva sistemato il corpo della voce
e lasciato la scheda, cioè proprio il punto a cui rimandava.
**La lezione resta, ed è il motivo per cui questo paragrafo non si cancella:** *un file che
si contraddice da solo è peggio di due file che si contraddicono fra loro*, perché chi legge
non ha modo di accorgersene. E il secondo caso aggiunge un corollario: **una correzione
parziale è essa stessa una trappola**, perché lascia la contraddizione esattamente dove il
lettore è stato mandato a cercare la verità.

**Le altre nove voci «da collaudare» NON sono un difetto** (classificate il 10 ago 2026 —
contare non è ancora il lavoro, regola 16). Su 19 occorrenze nel file, cinque stanno nella
tabella modello/effort, che non è una fonte di stato; le restanti appartengono a dieci voci,
di cui una sola mentiva (P124, ora corretta). Le altre nove sono un arretrato vero, e si
dividono in **due nature diverse che non vanno confuse**:
- **collaudo a video, da fare a schermo** — P147, P148, P149, P150 (3-6 agosto): sono
  recenti, riguardano il riordino delle schermate, e il rischio è estetico o di leggibilità;
- **collaudo sul campo, su dati veri** — P125, P126, P127, P63b, P94 (26-31 luglio): qui il
  rischio è clinico, e nessun test automatico può sostituirlo.
Le prime si smaltiscono in blocco guardando l'app; le seconde no, e vanno pianificate coi
pazienti veri.

### Regola 23 — un documento nuovo nasce già datato, e muore con la voce che l'ha generato

1. **Ogni documento di progetto nuovo nasce con un'intestazione di stato**: data, commit di
   riferimento, cosa è già implementato, cosa resta davvero aperto. Senza, è una trappola
   dal giorno dopo.
2. **Non si crea un documento se il contenuto sta già nel CHANGELOG.** La domanda da farsi è
   «questo ragionamento serve fra tre mesi *e* non entra nel CHANGELOG?». Se la risposta non
   è sì a entrambe, non si scrive un file: si scrive una voce di CHANGELOG.
3. **Quando una voce di roadmap si chiude, il documento che l'ha progettata va marcato nello
   stesso giro di consegna** — è parte della checklist di chiusura, non un lavoro separato.
   Il costo di marcarlo è un minuto; il costo di non farlo è una sessione intera rifatta.
4. **La tabella qui sopra si riverifica quando si tocca un documento**, e la data in cima
   («verificato al …») si sposta solo se la verifica è stata fatta davvero. Una data di
   verifica falsa è lo stesso difetto dell'intestazione di INDEX.md che dichiarava un
   riallineo mai avvenuto (26 luglio): **le dichiarazioni non si credono, si controllano**.

> **I punti 5, 6 e 7 sono stati aggiunti qui il 12 agosto 2026: fino a quel giorno esistevano
> SOLO nella copia `_STATO_DOCUMENTI.md` dentro claude.ai, cioè fuori dalla fonte di verità.**
> È il difetto che il punto 7 descrive, applicato al punto 7 stesso: chi leggeva il repo aveva
> una regola che si fermava al 4 e non sapeva di essere incompleta. *Trovato mentre si
> aggiungeva il punto 8 — cioè solo perché qualcuno è andato a scrivere proprio lì.*

5. **Un documento di progetto non può contenere una voce di roadmap che il repo non ha, né
   assegnare un numero di voce.** (6 agosto 2026.) Il numero si legge dal repo; se il repo non
   è raggiungibile, si chiede la cartella prima di scrivere. Una sessione senza cartella
   collegata scrisse una voce nuova solo nella fotografia, e le diede un numero già occupato.
6. **Un documento assorbito non si cancella: si sostituisce con un cartello di rimando**
   (data, commit della verifica, tabella «conteneva → dove sta la verità»). La cancellazione
   silenziosa lascia il buco; il cartello manda la prossima sessione al posto giusto.
   (10 agosto 2026.)
7. **Una riga della tabella vale in due posti, e va scritta in tutti e due — repo prima, copia
   poi, NELLO STESSO MESSAGGIO in cui il documento nasce.** (11 agosto 2026, indurita il 12.)
   La riga di `Connettori_Analisi` esistette per un giorno solo nella copia del progetto;
   quella di `Incidente_Sync_11ago_e_P157` per un giorno non esistette affatto. **Un indice
   incompleto è più pericoloso di un documento vecchio**, perché nessuno pensa di verificare
   l'indice. **Due volte in due giorni non è distrazione, è un processo senza guardia** —
   stessa lezione che P155 applica al Contesto: dove la penna sbaglia due volte, serve una
   guardia meccanica.
8. **Una riga che dichiara «in vigore» un vincolo temporaneo si è data una scadenza, e va
   riletta il giorno in cui il vincolo cade.** (12 agosto 2026.) La riga di `Incidente_Sync`
   scritta al mattino diceva «il §5 resta interamente in vigore» — vero mentre lo si scriveva,
   **falso otto ore dopo**, quando il collaudo di P157 ha fatto decadere le regole restrittive.
   *È prevedibile quale sia quel giorno, perché è scritto lì accanto cosa deve succedere perché
   il vincolo cada:* quando quella condizione si avvera, la riga si rilegge nello stesso giro.

## Checklist documentazione — OBBLIGATORIA dopo ogni modifica
Nata da un incidente reale (16 lug 2026): P62/P77 erano state implementate il 7 lug ma la Roadmap era rimasta "Da fare" — una sessione successiva stava per rifarle da zero; salvata solo dall'incrocio col CHANGELOG. La documentazione NON si aggiorna "dopo, con calma": si aggiorna nello stesso giro di consegna della modifica, e i file documentali entrano nello STESSO blocco commit del codice.

Dopo ogni modifica, Claude passa in rassegna TUTTI questi file e aggiorna quelli toccati:
1. **CHANGELOG.md** — SEMPRE, per ogni modifica reale (append in cima): cosa, perché, lezioni. È la rete di sicurezza che ha salvato la sessione del 16 lug.
2. **NutriGest_Roadmap_v4.md** — se la modifica chiude, avanza, blocca o riclassifica una voce: aggiornare la scheda (Stato + commit + data + nota di chiusura) SUBITO, non in un momento separato.
3. **NutriGest_Contesto_v18.txt** — se cambia il funzionamento attuale del software: nuove funzioni riusabili, flussi, strutture dati, decisioni architetturali.
4. **CLAUDE.md** (questo file) — solo se cambiano regole operative, di sviluppo o emergono lezioni permanenti da codificare.
5. **INDEX.md** — **a OGNI sessione che tocca `index.html`**, con `cd test-suite && node rigenera-index.js` (10 secondi). Regola cambiata il 26 lug 2026: la vecchia politica "solo dopo modifiche strutturali" ha prodotto un indice con **719 numeri su 730 sbagliati** — e un'intestazione che dichiarava un riallineo mai avvenuto. Dal 26/7 il test `s1-doc-allineata` FALLISCE se l'indice è disallineato: non è più possibile dimenticarsene.

Il blocco commit di consegna include il codice E i file documentali aggiornati, elencati esplicitamente. Una consegna senza CHANGELOG aggiornato è una consegna incompleta.

**Dal 26 lug 2026 parte della checklist è AUTOMATICA** (`test-suite/test/s1-doc-allineata.test.js`, sempre nella suite): (a) INDEX.md allineato a index.html — rimedio: `node rigenera-index.js`; (b) nessun id letto dal codice che non esista più nel markup (la famiglia F6/F7: campo tolto, lettura rimasta, dato azzerato in silenzio a ogni salvataggio) — gli orfani noti sono classificati in `ORFANI_NOTI` col motivo, e aggiungerne uno senza motivo è vietato; (c) le strutture dati `p.*` principali documentate nel Contesto. La lezione dietro: **le dichiarazioni non si credono, si controllano** — l'intestazione di INDEX.md dichiarava un riallineo completo mentre 657 voci su 687 erano sbagliate, ed è lo stesso schema di F5/F6/F7. Ciò che il test non può controllare (la prosa di CHANGELOG/Contesto/Roadmap) resta responsabilità della checklist qui sopra, nello stesso giro di consegna.

## Checklist di chiusura/avanzamento voce (obbligatoria)
Quando una voce di roadmap si chiude o avanza di fase, aggiornare NELL'ORDINE:
1. **CHANGELOG.md** — nuova voce in cima con il racconto completo (unico posto per la storia).
2. **NutriGest_Roadmap_v4.md** — SOLO la SCHEDA della voce (stato, data, commit); se chiusa del tutto, spostare la scheda nell'archivio in fondo. Nessun altro punto del file va toccato: dal 18 lug 2026 non esistono più riepiloghi di stato duplicati (il riepilogo di testa è stato spostato nel CHANGELOG e i Blocchi A-D sono congelati come storico).
3. **NutriGest_Contesto_v18.txt** — SOLO se cambia il funzionamento dell'app (trasporti, tabelle, autenticazione, flussi).
4. **INDEX.md** — SOLO se funzioni aggiunte/rimosse/rinominate.
5. **Roadmap semplice** (progetto Claude) — rigenerata a fine sessione in formato "solo cosa resta".
6. **Verifica incrociata finale** — cercare il numero della voce (es. "P66c") in tutti e 4 i file del repo: nessuno deve dire una cosa superata. Se un file fuori perimetro risulta stantio, si corregge nella stessa sessione.

## Il costo d'ingresso: cosa si legge per intero e cosa si interroga (misurato il 10 ago 2026)

Una sessione **non** legge 1,3 MB di documentazione. Ne legge per intero **uno solo**:

| File | Peso | Come si usa davvero |
|---|---:|---|
| **`CLAUDE.md`** | **~50 KB** | **si legge tutto, ogni sessione** — è l'unico costo d'ingresso vero |
| `INDEX.md` | 48 KB | si cerca un nome di funzione, mai letto tutto |
| `NutriGest_Roadmap_v4.md` | 363 KB | si cerca la scheda della voce |
| `CHANGELOG.md` | 606 KB | si cerca il numero di voce |
| `NutriGest_Contesto_v18.txt` | 274 KB | si cerca la sezione |

**Cosa se ne ricava, ed è controintuitivo:** la dimensione di CHANGELOG, Roadmap e Contesto
**non è un problema** — cercare in 606 KB costa quanto cercare in 60. Il file su cui la
brevità conta davvero è **questo**, perché è l'unico che si paga per intero a ogni sessione.
Il 10 agosto 2026 è passato da 44 a ~50 KB in una giornata sola: **prima di aggiungere un
paragrafo qui, la domanda è se non stia meglio nel CHANGELOG** — e la risposta è sì tutte le
volte in cui è il racconto di un episodio invece di una regola da rileggere.
*(Corollario per chi misura: sommare i cinque file dà un numero grande e falso. Un obiettivo
di riduzione posto su quel numero fa tagliare dove non serve — cioè nella memoria del
progetto — e lascia crescere l'unico file che andrebbe tenuto corto.)*

## Ottimizzazione token — INDEX.md
Il file `index.html` è un monolite di grandi dimensioni: leggerlo per intero prima di ogni modifica è costoso in token e va evitato.
- **`INDEX.md`** (nella cartella del progetto) mappa **899 funzioni** top-level per area funzionale (Pazienti, Analisi del sangue, Composizione corporea, Motore TDEE, Generatore piani, Compositore manuale, Calendario, Autenticazione, ecc.) con il numero di riga di ciascuna.
- Prima di ogni modifica: apri `INDEX.md`, trova l'area/funzione pertinente, poi usa `view` con `view_range` mirato su `index.html` invece di leggere tutto il file.
- Se il nome funzione non è chiaro o non è in tabella, fai prima `grep -n "nomeFunzione" index.html`.
- Dal 26 lug 2026 le righe di `INDEX.md` sono **garantite dal test** `s1-doc-allineata`: se la suite è verde, l'indice è esatto. Se un `view_range` non corrisponde, la suite non era stata fatta girare — `node rigenera-index.js` e riparti.
- **Rigenera `INDEX.md` a ogni sessione che tocca `index.html`**: `cd test-suite && node rigenera-index.js`. Lo script stampa quante voci ha corretto — quel numero va guardato, non dato per buono.
- Usa `str_replace` per le modifiche puntuali quando la stringa target è già nota e univoca, senza bisogno di rileggere l'intero file.

## Quanto si scrive — una voce per SESSIONE, non per consegna (5 ago 2026)
Osservazione di Fabrizio: «stai producendo davvero tanti documenti e molto lunghi, ho paura
che nel tempo diventi troppo grande». Misurato lo stesso giorno: **493 righe di CHANGELOG in
una sola giornata, in dieci voci separate** che ripetevano le stesse lezioni. Fuse in tre
senza perdere nulla: **da 499 a 227 righe**.
- **Una voce di CHANGELOG per sessione di lavoro, non una per ogni consegna.** Se in una
  giornata si chiudono quattro tappe della stessa voce di roadmap, è UNA voce con quattro
  paragrafi, non quattro voci.
- **La lezione permanente NON vive nel CHANGELOG:** diventa una riga numerata qui in
  CLAUDE.md. Il CHANGELOG racconta l'episodio una volta sola; sono le regole numerate a
  essere rilette a ogni sessione. Ripetere la lezione in ogni voce è la causa principale
  della crescita.
- **La dimensione non è il problema, la ripetizione sì.** Il CHANGELOG non si legge mai per
  intero: si cerca per numero di voce, e cercare in 8000 righe costa quanto cercare in 800.
  Quello che si paga è rileggere tre volte lo stesso ragionamento in tre punti diversi.

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

10. **Array cronologici: "l'ultimo elemento = lo stato attuale" è un'invariante di ordinamento implicita** — e il primo inserimento fuori ordine la rompe in silenzio. Trovato in P120 (25 lug 2026): ~20 punti leggevano la misurazione corrente come `p.inbody[p.inbody.length-1]`, ma `salvaInbody` faceva `push` senza riordinare, quindi caricare un referto vecchio dopo uno recente faceva girare TDEE, macro e prompt AI sul dato sbagliato **senza errori a video**. **Regola:** garantire l'invariante nel punto di SCRITTURA (una funzione di ordinamento chiamata prima del save, più migrazione idempotente sui dati esistenti), non correggere i punti di lettura uno per uno — su codice clinico è la stessa correttezza con un decimo del rischio. Terzo caso della famiglia dopo P118 tappa 1 (valori "attuali" come specchio derivato del referto più recente) e F4 ("elimina la doppia fonte, non aggiungere un avviso").
11. **Un valore di ripiego silenzioso su un dato che ordina il tempo è un bug in attesa** — `data: campo.value || today()` in `salvaInbody` sembrava prudente e invece era l'unico modo per cui un referto storico potesse prendere la data di oggi e falsare lo storico. Se un campo è strutturalmente necessario, meglio **bloccare con un messaggio chiaro** che riempirlo con un default plausibile. Vale la stessa frase già scritta per P118: una data inventata è peggio di una data mancante.

12. **Quando due parti del codice scrivono lo stesso campo con valori diversi, il danno non è dove si scrive: è in CHI LEGGE.** Trovato con F9 (26 lug 2026): due motori del semaforo alimenti scrivevano `p.alimenti` con vocabolari diversi (`grigioScuro` vs `grigio_scuro_1/2`). Le schermate riconoscevano entrambi — quindi a video sembrava tutto normale — ma prompt AI, validatore del piano e avvisi allergeni riconoscevano **solo il primo**: un alimento sconsigliato si vedeva grigio ed era invisibile ai controlli di sicurezza. **Regola:** davanti a una doppia scrittura, prima di stimarne la gravità si fa l'inventario dei LETTORI e di quali valori ciascuno riconosce; è lì che si scopre se il bug è cosmetico o clinico. E la correzione è sempre quella di F4 — eliminare la seconda fonte e ridurre il vocabolario a uno solo, dichiarato in un posto solo — più una **migrazione idempotente in TUTTI i punti da cui i dati rientrano** (cache locale, blob dal server, import di backup: dimenticarne uno rimette in circolo i valori vecchi).

13. **Codice marcato "DEPRECATO" ma ancora raggiungibile è codice vivo.** `_applicaRegoloSemaforoLEGACY` aveva il commento "DEPRECATA — sostituita da…" da settimane ed era appesa a un pulsante reale. Il commento non disattiva niente: o si rimuove la chiamata, o la voce va in roadmap con una data. Vale anche al contrario: prima di rimuovere, verificare la raggiungibilità reale (F9: il pulsante compariva solo `if(p.regolaAttive.length)`, e quel campo lo scriveva **solo** il motore deprecato — un cerchio chiuso che lo rendeva invisibile sui pazienti nuovi e armato su quelli storici).

14. **Un dato clinico di laboratorio non si prende dalla memoria di un'AI né da un motore di ricerca AI.** Il 28 lug 2026, verificando le porzioni low-FODMAP, il controllo incrociato ha mostrato che **sbagliavano entrambe le fonti, in punti diversi**: le stime a memoria (fragole 150 g invece di 65, mannitolo al posto dei fruttani nelle patate dolci) e Perplexity Pro (sedano dato per low a 40-50 g quando la soglia è 10 g — errore PERMISSIVO di 4-5×, banana matura 2×, mirtilli su un valore Monash superato, limite sulle patate bianche e "riduzione GOS del 30-40%" inesistenti nelle fonti). **Il segnale d'allarme più forte non era un numero sbagliato ma la forma della risposta:** 67 alimenti, 67 valori tondi e sicuri, zero buchi dichiarati nonostante la richiesta esplicita di dichiararli — e le citazioni riga per riga puntavano ad **Alibaba e Scribd** mentre la nota finale dichiarava "dati di laboratorio Monash University". **Regole operative:** (a) su valori che finiscono in un documento consegnato al paziente serve la fonte PRIMARIA (per i FODMAP: l'app Monash, dataset proprietario a pagamento — tutto il resto del web è copia di copia, spesso ferma a versioni superate); (b) ogni valore porta accanto **fonte e data** (`{max:42, fonte:'Monash'}` in `FODMAP_PORZIONI`, e il badge deve mostrarli), perché le soglie vengono riviste — i mirtilli sono passati da 40 a 125 g; (c) un dato non verificato si dichiara tale in roadmap con una voce a sé (→ P130), non si lascia passare per buono perché "è il migliore che abbiamo". Vale la stessa frase di P118 e della regola 11: **un valore inventato è peggio di un valore mancante.**

15. **«Che giorno è» si chiede all'orologio LOCALE — e la funzione che lo fa deve essere UNA.** `toISOString()` risponde con l'ora di Greenwich: fra mezzanotte e le 01:00/02:00 italiane è ancora al giorno prima. Usa sempre `ymdLoc()` / `today()`, mai `new Date().toISOString().slice(0,10)`. Se un caso è davvero in UTC (la data nasce e resta in UTC, aritmetica con `setUTCDate`), **dichiaralo sulla riga** con `/* UTC-VOLUTO: motivo */` — il test `s1-date-locali` diventa rosso altrimenti. Restano su `toISOString` i marca-tempo (`updated_at`, `creato`, `timestamp`): non dicono che giorno è, dicono in quale istante, ed è su quello che i dispositivi decidono chi ha salvato per ultimo. **La lezione più grande di P141 non è il fuso orario: è che il file conteneva TRE funzioni per la stessa cosa** — quella rotta e due copie corrette scritte da chi aveva sbattuto contro il problema nel proprio angolo. È F4 applicato a una funzione invece che a un campo. Quando trovi un difetto in una funzione condivisa, **ripara il rubinetto**: scrivere un helper corretto accanto al proprio codice lascia rotti tutti gli altri usi e raddoppia le cose da tenere allineate. (31 lug 2026.)

16. **Una voce di roadmap che CONTA le occorrenze di un pattern non ha ancora fatto il lavoro: il lavoro è CLASSIFICARLE.** P141 diceva «45 usi di `toISOString` da sostituire». Erano 43, e 23 erano corretti: sostituirli tutti avrebbe rotto la sincronizzazione fra dispositivi. Prima di una modifica ad alto conteggio, dividere gli usi per SIGNIFICATO e dichiarare quali non si toccano e perché. (31 lug 2026.)

17. **Una decisione presa senza prove va riaperta quando le prove arrivano — ma quasi mai facendo la cosa che avevi scartato.** L'8 lug 2026 P63b (conferma con diff sull'import InBody) fu chiusa come "decisa di non fare", con un motivo giusto: costerebbe un clic a ogni import anche quando è tutto corretto. Poggiava però su un presupposto **mai verificato** — che gli errori di lettura fossero rari. Il 31 lug, 25 referti veri: ~1 su 2 con un errore, 1 su 5 grave (massa magra 45 kg letta 88 kg). Il modo sbagliato di reagire sarebbe stato ribaltare il no e implementare la tabella con le spunte; quel no era e resta valido. Il modo giusto è stato chiedersi **quale rischio era cambiato di forma**: non "il valore vecchio contro il nuovo", ma "il numero è plausibile?". **In pratica:** quando una voce è stata scartata, in roadmap va scritto il PRESUPPOSTO su cui si è deciso, non solo la decisione — così quando la realtà lo smentisce si sa cosa riaprire e cosa no.

18. **Se i dati sono legati da identità aritmetiche, il controllo non ha bisogno né dell'AI né del documento originale.** I valori delle analisi del sangue sono indipendenti fra loro: per accorgersi che uno è letto male servono euristiche (forma di intervallo, ordine di grandezza, impronta della riga — P124). I valori dell'InBody no: "peso = massa grassa + massa magra" è la definizione con cui la bilancia stampa il foglio, non una stima. Lì l'errore si trova con **una sottrazione**, in locale, senza una seconda chiamata AI e senza avere il referto sotto mano. **Prima di progettare un controllo su dati importati, cercare le identità che li legano: se ce n'è una, è più economica e più affidabile di qualunque euristica.** Corollario osservato in P63b: più controlli che si sovrappongono **localizzano** l'errore (massa magra sbagliata → salta solo la somma; massa grassa sbagliata → saltano somma e percentuale) — una proprietà che vale la pena fissare con un test, perché si perde al primo ritocco delle tolleranze.

19. **Su un avviso, la metà più importante dei test è il SILENZIO.** "Un avviso che ha sempre ragione smette di essere letto" era già scritto in roadmap ma non era mai stato tradotto in disciplina di collaudo. In P63b metà dei 20 test nuovi verifica che l'avviso **non** parli: referto corretto, scarti di arrotondamento, virgola italiana, campi mancanti, tutti e 20 i livelli viscerali validi. E le tolleranze si scelgono larghe di proposito: meglio lasciar passare un errore piccolo che bruciare la credibilità dell'avviso con un falso allarme. Il primo collaudo da fare su un avviso nuovo non è "si accende quando deve", è **"resta spento quando deve"**.

20. **Un commento che cita una fonte non è una verifica che i numeri vengano da quella fonte.** In P147 (3 ago 2026) la tabella MET portava in testa «MET dal Compendium 2024, valori corretti vs tabelle divulgative»: diversi valori erano invece quelli del **2011** — Pilates 3.5 al posto di 1.8, Spinning 7.0 al posto di 9.0, Circuit training 8.0 al posto di 7.5. Il commento era stato creduto per un mese perché *sembrava* una verifica. **In pratica:** su valori numerici presi da una fonte esterna, accanto a ciascuno va l'**identificatore che permette di ritrovarlo** (per i MET: il codice a 5 cifre del Compendium), non il nome della fonte in cima alla tabella. Un'etichetta tradotta in italiano non è un identificatore: è una nostra parafrasi, e cambia. Stessa famiglia della regola 14: la fonte primaria e la data stanno **accanto al dato**, non nell'intestazione.

21. **Rinominare una voce di un catalogo è una migrazione di dati, non un ritocco di testo.** Sempre P147: le attività erano salvate sui pazienti per NOME (`attivitaSpecifica: 'Pilates'`). Cambiare l'etichetta in «Pilates, matwork» avrebbe fatto fallire il lookup, reso il MET `null`, scartato la riga e **azzerato l'EAT senza un solo errore a video** — il paziente avrebbe semplicemente avuto qualche centinaio di kcal in meno. Serve una mappa di alias vecchio→nuovo, e un test che percorra **tutte** le etichette storiche: se una salta, deve diventare rosso subito, perché il sintomo in produzione è invisibile. Vale ogni volta che una stringa è insieme etichetta e chiave.

22. **Una guardia scritta per un campo solo è una guardia che verrà dimenticata al secondo campo.** Nel salvataggio dell'anagrafica `pesoTarget` aveva già la protezione `_stessoPaz` (leggi dal pannello TDEE solo se mostra QUESTO paziente), documentata e corretta. I campi attività, immediatamente sotto, no: col pannello chiuso il salvataggio li **azzerava**, col pannello aperto su un altro paziente glieli **copiava addosso**. Quando si scrive una guardia su un campo, va chiesto subito **quali altri campi hanno la stessa provenienza** e la guardia va applicata al gruppo, non alla riga. (4ª occorrenza della famiglia «dato letto da un form che non gli appartiene».)

23. **Un documento nuovo nasce già datato, e muore con la voce che l'ha generato.** ➜ Il testo completo di questa regola, in cinque punti, vive nella sezione **«Regola 23»** più sopra, insieme alla tabella di stato dei documenti di progetto — è troppo lungo per stare qui. *(Questa riga esiste dal 10 ago 2026 perché la lista saltava da 22 a 24: chi citava «regola 23» e chi scorreva l'elenco non trovavano la stessa cosa. La numerazione NON è stata rifatta — «regola 23» e «regola 24» sono già citate nel CHANGELOG, e rinumerarle avrebbe rotto quei riferimenti.)*

24. **I connettori non sono strumenti come gli altri: uno scrive sul database di produzione, l'altro pubblica online.** (6 ago 2026, decisioni prese con Fabrizio.)

**SUPABASE — collegato, e di norma SI USA IN SOLA LETTURA.** Il progetto e' `zrhmspylnlklppvhgplp` («Nutrigest»); nella stessa organizzazione ce n'e' un secondo, «RISVEGLIO», che **non va mai toccato**. Ammessi senza chiedere: `list_tables`, `get_advisors`, `list_migrations`, e query **aggregate** in `execute_sql`. Vietati di iniziativa, sempre e solo su istruzione esplicita caso per caso: qualunque `INSERT/UPDATE/DELETE/DDL`, `apply_migration`, `deploy_edge_function`, branch, restore, pause. **Il motivo non e' formale:** su GitHub ogni errore si annulla con `git revert`, sul database **no**, e li' dentro ci sono i dati sanitari di pazienti veri. Per la stessa ragione si preferiscono sempre gli aggregati alla lettura di righe: un conteggio risponde alla domanda senza portare nomi, pesi e analisi dentro la conversazione.
   **Perche' vale la pena averlo:** al primo uso ha trovato in dieci minuti due cose invisibili dal codice (→ P151, P152) e ha confermato che la roadmap dice il vero sugli avvisi di sicurezza. E ha corretto una mia lettura affrettata: il difetto su `updated_at`, dato per grave a colpo d'occhio, guardando i dati non morde. **Prima si guarda, poi si dichiara** — regola 16 applicata al database.

**GITHUB — collegato il 6 ago 2026. PUBBLICA SOLO DOPO APPROVAZIONE ESPLICITA DI FABRIZIO, OGNI VOLTA.** Non esiste un via libera permanente: il permesso vale per quel push e basta, e va chiesto in chat («pubblico?») prima di ogni pubblicazione. Il motivo e' che questo repository esce su GitHub Pages: **ogni push e' una messa in produzione immediata**, e il blocco commit era finora l'ultimo momento in cui un essere umano guardava cosa stava per andare online.
   **DA COMPLETARE:** al momento in cui si scrive, gli strumenti di quel connettore non erano ancora visibili in sessione (i connettori si agganciano all'avvio: chi lo collega a meta' chat lo trova solo nell'attivita' successiva). **La prima sessione che li vede fa l'inventario di cosa espone davvero e completa questa regola con le meccaniche**, invece di scriverle su cio' che si immagina — che sarebbe esattamente la trappola della regola 23 applicata a se stessa.
   **Quello che NON cambia:** il sandbox non raggiunge ne' `api.github.com` (502) ne' il sito live (403 sul proxy), e `gh` non e' installato. Da bash restano validi soltanto `git ls-remote` per lo SHA e `raw.githubusercontent.com/<owner>/<repo>/<SHA>/<file>` per i contenuti. Non e' un ripiego: e' l'unica strada che esiste da li'.

25. **Nel Contesto si scrive lo STATO, e la posizione si dichiara con l'IDENTIFICATORE — mai con l'etichetta a schermo, mai come transizione.** (11 ago 2026. Caso scoperto da Fabrizio chiedendo «questo errore si è ripetuto altre volte?».) P149 scrisse nel Contesto che il blocco strade sta «nel passo *"3 · Quanto in fretta"*»; il giorno dopo P150 fuse i passi 2 e 3 e la frase divenne falsa — mentre `#mac-strada-box`, l'id citato nella stessa frase, **è ancora lì e ancora vero**. La frase non è invecchiata perché nessuno l'ha aggiornata: era scritta in modo da poter invecchiare. E il caso era doppiamente insidioso: un **commento morto** in `index.html` citava lo stesso passo fantasma, così doc e codice si **confermavano a vicenda su una cosa falsa** — il controllo «verifico su una seconda fonte» falliva proprio quando serviva. **In pratica, tre gesti:** (a) una frase di posizione/struttura nel Contesto si scrive *«sta in `#id`, scritto da `funzione()`»* — l'etichetta umana può seguire come orientamento, mai come coordinata; (b) nel Contesto si descrive lo **stato attuale** con la provenienza breve («così dal P149»), non il movimento «prima stava in X, ora in Y» — le transizioni sono mestiere del CHANGELOG, e una transizione ha *due* estremi che possono morire; (c) **la sessione che rinomina, fonde o "asciuga" sezioni ha nel proprio giro di consegna il grep del vecchio nome su TUTTO il repo, commenti compresi** — il pericolo non è distribuito uniformemente: sta concentrato lì. **Tre limiti dichiarati** (un rimedio che non dichiara i suoi buchi è la trappola della regola 23 applicata a se stessa): la regola vale per le frasi di posizione e struttura, non per le parti cliniche che identificatori non ne hanno; un identificatore può esistere e aver *cambiato mestiere*, quindi «il nome c'è» non significa «la frase è vera»; e questa resta una regola di penna, eseguita da chi scrive — la guardia meccanica è P155, la bonifica dell'esistente è P156.

26. **Una guardia che copre una strada su due è una guardia che qualcuno aggirerà senza saperlo — e quando un difetto non è rilevabile, si consegna l'attrezzo, non un controllo che finge di vederlo.** (12 ago 2026, P157.) Il controllo conflitti P69 esisteva, era corretto, ed era stato scritto per il push per-id: il push COMPLETO — la strada dell'avvio, del pulsante «Sincronizza» e di ogni `save()` senza id — non ci passava. Sei pazienti riscritti da un PC rimasto indietro. È la regola 22 spostata dai *campi* ai *percorsi*: **quando scrivi una guardia, la domanda immediata è "quali ALTRE strade arrivano a questa scrittura?"**, e la guardia va messa nel punto in cui confluiscono, non in ciascun chiamante (regola 15, "ripara il rubinetto": l'attesa dell'idratazione sta dentro `pushToSheets`, non nei suoi tre chiamanti, altrimenti si dimentica al quarto). **Seconda metà della regola:** la stessa voce aveva un difetto *strutturalmente* invisibile — una scrittura fatta direttamente sul database lascia `updated_at` invariato, e nessun confronto di date può accorgersene. Lì non si scrive un controllo più furbo: si dà all'utente un comando esplicito per rimediare (`riallineaTuttoDalCloud()`, con il suo pulsante) e **si dichiara il buco nel test e nella scheda**. Un rimedio che non dichiara ciò che non vede è la regola 23 applicata a se stessa.

27. **Un esito giusto per il motivo sbagliato passa il collaudo lo stesso.** (12 ago 2026, collaudo di P157.) Fabrizio cancella un referto, preme «Riscarica tutto dal cloud» senza sincronizzare, vede 23 e chiede: «giusto?». Lo era — ma **due meccanismi diversi producono lo stesso 23**: o la cancellazione era già arrivata al server (`delInbody` chiama `save(p.id)`, che spinge da solo dopo 2s) e il pulsante ha scaricato il valore vero, **oppure** la scheda era ancora sporca e il pulsante l'ha *saltata*, mostrando 23 senza aver scaricato niente. A schermo sono indistinguibili, e nel secondo caso il collaudo avrebbe promosso una funzione mai eseguita. Deciso con una query aggregata di sola lettura sul database. **In pratica:** quando si collauda, la domanda non è «il numero è quello che mi aspettavo?» ma **«quali strade portano a questo numero, e quale ha agito?»** — se sono più d'una, il collaudo non è finito. È la regola 16 (classificare, non contare) spostata dal codice al collaudo. *Corollario di progettazione:* un'operazione che può **saltare** delle righe deve dirlo sempre, non solo quando ne salta — qui il segnale c'era (la finestra di conferma elenca le schede non toccate) ed è stato quello a rendere la verifica possibile.

28. **Un'azione il cui effetto avviene fuori dal campo visivo è indistinguibile da un'azione che non è avvenuta** — e chi la usa la dichiara rotta, con ragione. (12 ago 2026, P159: «Vai al giorno» cambiava il giorno e ridisegnava il piano, ma il pannello si apre da un badge che sta *sopra* il piano, quindi il cambiamento accadeva sotto la piega.) **Un comando che dichiara un movimento deve muovere anche lo sguardo** (`scrollIntoView`) **e dire dove ti ha portato**: lo scorrimento muto lascia lo stesso dubbio. *Corollario per la diagnosi, imparato lo stesso giorno sbagliando due volte in senso opposto:* «il codice è corretto» e «il difetto non esiste» sono affermazioni diverse — qui la prima era vera e la seconda falsa.

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
