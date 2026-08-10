# NutriGest — CHANGELOG (Storico Sessioni e Commit)

> **Origine:** questa sezione era in fondo a `NutriGest_Contesto_v17.txt` (~56% del file).
> Estratta l'8 luglio 2026 per separare la cronologia (append-only, consultata di rado)
> dalla descrizione del funzionamento attuale del software (consultata ad ogni sessione).
> **Regola invariata dal Contesto:** APPEND in cima (cronologia inversa), MAI eliminare.
> Sessioni vecchie >6 mesi possono essere compresse a 1-2 righe (solo se necessario).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STORICO SESSIONI E COMMIT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

10 AGOSTO 2026 — VERIFICHE SUL DATABASE VERO COI CONNETTORI NUOVI · PRIMO DOCUMENTO
⛔ ASSORBITO · SEZIONE «CONNETTORI» IN CLAUDE.MD. Baseline `a81fe0b`. **Nessuna riga
di codice toccata**; nessuna scrittura sul database: solo letture.

**Le verifiche (connettore Supabase, prima sessione in cui il database si legge
direttamente invece che per screenshot).** Quattro voci confermate sul progetto
`zrhmspylnlklppvhgplp`: **P151** esatta com'è scritta (PK solo `id` proprio su
`ricette`, `piani`, `entrate`, `eventi`; `ai_usage` ha `id` bigint generato dal db,
giusto non contarla); **P152** confermata sulle stesse quattro tabelle
(`updated_at` text); **P106** chiusa davvero e **P107** unico avviso di sicurezza
rimasto; **P67 T1** regge (`eu-west-1`). **Trovato di nuovo, mai visto prima:** il
Performance Advisor segnala `auth_rls_initplan` su TUTTE e 8 le tabelle — ogni policy
RLS rivaluta `auth.uid()` per riga invece che per query (rimedio noto:
`(select auth.uid())`), più l'indice `ai_usage_user_created` mai usato. Nessun impatto
misurabile con 47 pazienti; stessa famiglia di P151, «debito che scade quando vendi».
**Voce di roadmap da aprire (numero da assegnare leggendo il repo), da fare nella
stessa passata di P151/P152** — tre aperture delle stesse otto tabelle di produzione
sono tre volte il rischio. Analisi completa dei connettori e dei plugin (cosa serve,
cosa no, PubMed non chiude P130, Bio Research fuori bersaglio):
`claude/NutriGest_Connettori_Analisi.md`.

**PRIMA PASSATA DI ASSORBIMENTO DOCUMENTI (decisione di Fabrizio: i documenti del
progetto si assorbono nei file di verità, uno per sessione, in ordine di pericolosità
⛔→🗄️→⚠️).** Assorbito il primo dei tre ⛔: `NutriGest_Grafici_Decisioni_Aperte.md`.
Verifica prima della chiusura: `grep` su `index.html` a `a81fe0b` — ventaglio,
`_ibFinestra`, `_ibFasciaRitmo`, `_ibGrForme` esistono; `_ibFiltraPeriodo` ZERO
occorrenze (i pulsanti di periodo sono davvero stati rimossi, P134a). Ogni contenuto
del documento è risultato o implementato (P131, P132, P133, P137) o respinto da
Fabrizio (pulsanti di periodo) o già conservato nelle schede (il «resta vero»
sull'incrocio delle curve è testuale nella scheda P131). Il file nel progetto Claude è
ora un cartello di rimando; la riga nella tabella di CLAUDE.md è passata da ⛔ ad
ASSORBITO.

**Secondo ⛔ assorbito nella stessa sessione: `NutriGest_Grammature_Analisi.md`.**
Verifiche su `a81fe0b`: `ricalcolaAlternative` esiste (riga 3805) ed è chiamato dai
quattro punti di modifica **e** su tutto l'output AI; `criterioByCat` ha ZERO
occorrenze (sostituito dai gruppi di equivalenza); la tabella «isocalorica» scritta a
mano nel prompt non c'è più — l'unica traccia di «Frutta secca mista 20g» è il commento
che spiega perché era sbagliata; `_etichettaCriterio` (§5.7 del documento) è usata in
due punti di render. **Le due proposte RESPINTE — banda di plausibilità e guardia al
25% — restano in testa al cartello**, ma la cosa che davvero le ha protette dal venire
rifatte per sbaglio è che il rifiuto è motivato **dentro `index.html`** (commenti a riga
~3708 «NESSUN tetto di plausibilita'» e ~3845 «Nessun tetto»): una decisione respinta
vive nel codice, non solo in un documento di progetto. Unica cosa ancora aperta, già
nella sua scheda: la fase 2 di P121 (gruppi semaforo intercambiabili).

Prossimo e ultimo ⛔: `FODMAP_Verifica_Perplexity` (finta fonte di dati; da assorbire
insieme alla verifica che P130 sia ancora davvero aperta).

**Difetto di processo trovato oggi, da non ripetere.** Per capire perché un commit
sembrava non partire ho eseguito `git status` dalla sessione sulla cartella collegata:
da lì git non riesce a rimuovere il proprio `.git/index.lock` (`Operation not
permitted`) e lo lascia sul disco, bloccando il git di Fabrizio con «another git process
seems to be running». **Dalla sessione non si eseguono comandi git sulla cartella
collegata, nemmeno di sola lettura** — restano validi solo `ls-remote` e i file scaricati
da `raw.githubusercontent.com`, come già prescrive il protocollo. Nella stessa verifica è
emerso che su questa macchina (`C:\Users\User`, diversa da `C:\Users\giann`) **82 file
risultano modificati con ZERO differenze reali**: è solo la convenzione di fine riga, il
repo non ha un `.gitattributes`. Non è un bug e non va committato — ed è la ragione
concreta per cui la regola «mai `git add -A`, sempre i file espliciti» non è una
formalità: un `add -A` produrrebbe un commit che tocca ogni riga di ogni file, rendendo
illeggibile qualunque diff futuro. Sistemazione definitiva (`* text=auto`) da valutare in
una sessione sua.

**CLAUDE.md — nuova sezione «Connettori collegati»,** tre regole: Supabase in sola
lettura salvo OK esplicito con SQL mostrato prima (e `project_id` dichiarato: i
progetti Supabase sono DUE); un numero da PubMed entra in codice solo col PMID/DOI
accanto al dato e mai dal solo abstract; Google Calendar non si collega al prodotto
(sarebbe la doppia fonte di verità di F4/regola 12).

6 AGOSTO 2026 (2ª sessione) — P153 APERTA: LE ALTRE BIOIMPEDENZIOMETRIE, E DUE
DIFETTI DI PROCESSO TROVATI DA FABRIZIO. Baseline f356915. **Nessuna riga di codice
toccata**: sessione di ricerca, progettazione e documentazione. Connesso il connettore
PubMed (authless).

**La domanda.** Fabrizio: dare la possibilità di usare NutriGest anche a chi non ha
l'InBody né il plicometro — quali bioimpedenziometrie servono, quali sono le più
diffuse. Ricerca fatta con la ricerca web (Perplexity non è collegato: cercato nel
registro dei connettori, non c'è).

**Il risultato che cambia la forma del lavoro.** I dispositivi sul mercato sono decine,
ma **le forme del dato sono due**: chi consegna l'elettricità grezza (Rz, Xc, angolo di
fase a 50 kHz — Akern, Bodystat, Maltron, RJL/BIA 310e, BioTekna) e chi consegna i
compartimenti già calcolati con equazioni proprietarie (InBody, Tanita, seca mBCA,
Jawon, Charder, Evolt, più le bilance domestiche). Non si implementa una marca alla
volta: si implementano le due lingue. È lo stesso movimento di P124, che non ha scritto
un lettore per ogni laboratorio ma un lettore di tabelle di referto. Priorità
controintuitiva, messa per iscritto nella scheda: Akern è il nome italiano ma è anche
l'unica famiglia col motore di equazioni da scrivere; la famiglia B si apre quasi gratis
riusando lo stampo InBody. Scheda completa e cinque tappe → **P153** nella Roadmap v4;
ragionamento esteso → `claude/NutriGest_P153_Altre_Bioimpedenziometrie_Ragionamento.md`.

**PRIMO DIFETTO — ho scritto una voce di roadmap solo nella fotografia.** Le prime tre
scritture della sessione sono andate nei documenti del progetto Claude
(`NutriGest_Roadmap_Semplice.md`, `_STATO_DOCUMENTI.md`, il documento nuovo) perché la
cartella del repo non era ancora collegata. Risultato: **una voce di roadmap esistente
solo nella fotografia e assente dalla fonte di verità** — chi legge il repo non la trova,
chi legge il progetto la trova e la crede autorizzata. Non è la solita fotografia che
invecchia: è una fotografia che afferma qualcosa che l'originale non dice. Se ne è
accorto Fabrizio, chiedendo «perché hai aggiornato solo la roadmap semplice e non la
v4?». **Regola operativa che ne esce: se la cartella del repo non è collegata, la prima
cosa da fare è chiederla — non scrivere intanto nei documenti del progetto.**

**SECONDO DIFETTO, conseguenza del primo — il numero di voce era già occupato.** La voce
era stata numerata **P150** leggendo `NutriGest_Roadmap_Semplice.md`, foto del 5 agosto.
Nel repo P150 esiste già ed è **chiusa** (schermata TDEE, stessa giornata), e sono già
occupati anche P151 e P152 (nati dalla sessione Supabase). Rinumerata **P153** ovunque,
compreso il nome del file nel progetto Claude. È esattamente la trappola descritta in
CLAUDE.md — *i documenti del progetto sono fotografie datate, non lo stato del software* —
applicata non a una funzione da reimplementare ma alla **numerazione**: un contatore letto
da una copia vecchia produce collisioni silenziose.

**Terza cosa trovata, e sarebbe stato il terzo errore: P101 esisteva già.** «Referti
non-InBody», aperta da tempo, aveva già visto il rischio giusto (il «falso amico»: una
bilancia diversa che riporta «massa grassa» con metodo non confrontabile) e prescritto
`misurazione.fonte` più la segnalazione del cambio fonte nei grafici. P153 la contiene e
la generalizza — P101 restava dentro l'impianto InBody, P153 sposta il problema sul
modello dati — quindi **P101 è marcata assorbita nella tappa 153b**, non aperta due volte.
La regola che l'ha intercettata è quella scritta il 30 luglio: *prima di implementare
qualcosa descritto in un documento, cercarlo nel codice e nella roadmap.*

**Due regole fissate ora perché costano poco adesso e care dopo:** (1) **non si converte
mai** fra strumenti — le equazioni sono proprietarie, un valore convertito sarebbe un
numero inventato con l'aria di un numero misurato (regola 11); si cambia serie, come le
due bilance di P35. (2) Ogni valore derivato porta scritto se è **letto** dal referto o
**calcolato** da noi con quale equazione, e i due non si mescolano nella stessa serie.

**Il dato che manca, dichiarato come mancante:** quanto siano diffusi i singoli
dispositivi negli studi italiani non è pubblicato da nessuno. Le ricerche di mercato
danno il giro d'affari globale e i tre nomi in testa; i siti dei professionisti sono un
campione autoselezionato. La fonte migliore è chiedere a dieci nutrizionisti che
strumento hanno — annotato nella scheda invece di essere stimato a occhio.

**File toccati:** `NutriGest_Roadmap_v4.md` (scheda P153 nuova, nota di assorbimento in
P101, nota di precedenza in P139), `CLAUDE.md` (riga del documento nuovo nella tabella di
stato; corretta la riga di `NutriGest_Roadmap_Semplice.md`, che dal 4 agosto diceva ancora
«foto al 31 luglio»), `CHANGELOG.md` (questa voce). **`index.html` non toccato**, quindi
nessun `node --check`, nessuna rigenerazione di INDEX.md, suite non eseguita.

6 AGOSTO 2026 — P150: LA SCHERMATA TDEE RIORGANIZZATA (PASSI 1-2).
Baseline 08318b5. Suite 738 verdi. Lavoro di sola DISPOSIZIONE e testi: nessuna
formula, soglia, avviso o scrittura sul paziente e' stata toccata.

**Il problema, misurato.** La pagina renderizzata a video sul portatile di Fabrizio
(1090 px di larghezza utile) era alta 2.573 px: 3,7 schermate, 45 campi, 26 pulsanti,
sei tinte di sfondo diverse. Mescolava a peso visivo identico tre cose: quello che si
COMPILA (pochi campi), quello che l'app CALCOLA, e quello che si CONSULTA (tabella
delle 12 categorie, quattro formule di peso ideale, classifica dei protocolli). Il
risultato era sparso: TDEE a un terzo di pagina, kcal target a due terzi, macro in
fondo dietro «Calcola».

**Passo 2: da quattro campi a una domanda.** Il riquadro del traguardo chiedeva
% grasso + modo del muscolo + kg/quota + «deciso da». Ora chiede una frase sola —
«Portare il grasso dal 28.5% al [15] %» — con la sintesi accanto. Modo, quota e
guadagno scendono nella piega «Altro» insieme allo storico: P123 aveva gia' misurato
che la previsione sul muscolo sposta il peso finale di chili ma il grasso da togliere
di due etti, quindi non decide ne' calorie ne' settimane. «Deciso da» e' stato
rimosso su richiesta di Fabrizio (le due letture di `trg-deciso` sono sparite, non
lasciate orfane). Il corpo del risultato non mostra piu' il peso in grande ne' la
banda gialla: un riquadro verde con le due coppie che contano (grasso, magra) e il
peso come somma. Un pulsante solo, **ancorato allo scenario a massa magra invariata**
(`r.ottimista`) perche' non contiene nessuna previsione; spento quando il traguardo a
video e' gia' quello salvato, cosi' si vede se c'e' una modifica non ancora scritta.
Lo scenario col muscolo resta nella piega col suo «usa questo invece».

**Passi 2 e 3 fusi, e la tabella delle strade diventa uno slider.** Erano una
decisione sola spezzata in due. «Come ci arrivi» era una tabella a cinque colonne:
ora e' uno slider 0-40% le cui TACCHE portano l'esito — `0% · -10% · -15% · -20%` e
sotto le settimane (53, 36, 27). La scala e' diventata il confronto. Sotto il pollice
un'etichetta viva dice «-17% · 2117 kcal · 31 settimane»: lo stesso comando fa
confrontare e regolare, quindi il campo «Altra percentuale» sparisce e la piega
«Regola a mano» nasce chiusa quando lo slider c'e'.

**Due trappole trovate mentre si scriveva.**
(a) `_stradaUsa` mostra una notifica e, se il paziente ha un percorso, apre un
`confirm()` sulle fasi. Agganciarlo a `oninput` avrebbe aperto decine di finestre per
ogni trascinamento: l'anteprima e' stata separata dall'azione (`_ritmoAnteprima` non
tocca il regime, `onchange` si). Verificato: 30 movimenti consecutivi, zero dialoghi.
(b) Chiudendo la piega «Regola a mano» nel markup si creava un difetto vero: su un
paziente senza sesso o senza InBody il traguardo non e' calcolabile,
`_traguardoAnteprima` esce prima di chiamare `_aggiornaStradaBox`, lo slider non
viene disegnato e **l'unico comando delle calorie sarebbe finito nascosto in una
piega chiusa**. Il test P149 esisteva apposta e l'ha bloccato. La piega nasce aperta
e la chiude `_aggiornaStradaBox` solo quando le tacche ci sono.

**Testi.** 425 -> 218 parole di prosa, senza perdere niente di necessario. Tre regole:
una frase resta solo se dice qualcosa che i numeri accanto non dicono gia'; le sigle
si sciolgono dove si spiega il metodo e non nelle etichette (`MB + NEAT + EAT + TEF`
-> «basale + passi + allenamento + digestione»); i titoli dicono cosa esce, non da
dove si parte («Da dove parte — attivita' fisica» -> «Quanto consuma»). La nota «in
ricomposizione il peso dice poco» e' stata accorciata perche' ripeteva la coppia di
numeri del riquadro sopra — e ripetere un dato due volte e' il modo piu' rapido per
renderlo invisibile.

**Due test aggiornati, non indeboliti.** P149 verificava la strada in vigore tramite
il pallino ◉ delle righe di tabella: il marcatore ora e' la tacca evidenziata
(`.near`), e sono stati aggiunti due controlli in piu' sulla posizione del pollice.
Il test sulla nota di ricomposizione cerca «non la bilancia» invece di «il peso dice
poco»: cambia la formulazione, non l'intento.

**NELLA STESSA SESSIONE — PRIMO USO DEL CONNETTORE SUPABASE.** Collegato il
connettore Supabase (gia' attivo) e usato in sola lettura: schema, avvisi di
sicurezza e query aggregate, nessun dato personale letto. **Gli avvisi confermano la
roadmap**: unico rilievo aperto `auth_leaked_password_protection`, cioe' P107, che la
roadmap gia' da' per bloccata dal piano Supabase. RLS attivo su tutte e 8 le tabelle.
Il connettore ha pero' mostrato due cose che dal codice non si vedono, ed e' il motivo
per cui vale la pena averlo → P151 e P152.

**Correzione a una mia lettura affrettata.** Alla prima occhiata avevo segnalato come
grave la doppia natura di `updated_at` (testo su `ricette`/`piani`/`entrate`/`eventi`,
`timestamptz` sulle altre quattro). Verificato con i dati veri: le quattro colonne di
testo sono **popolate al 100%, tutte in ISO, tutte lunghe esattamente 24 caratteri, un
solo formato**. Il confronto lessicografico su ISO a lunghezza fissa ordina
correttamente nel tempo: **oggi non c'e' nessun bug attivo**, solo una fragilita'
latente (una colonna di testo accetta qualunque cosa). Vale la regola 16 al contrario:
prima di dichiarare grave un difetto trovato per struttura, si guardano i dati.

**RILASCIO SU PAGES PIANTATO, E `.nojekyll`.** La build `pages-build-deployment` #615
del push di P150 e' **fallita dopo 30 minuti e 8 secondi**, contro i ~40 secondi di
tutte le precedenti: la firma di una build appesa, non di un errore di contenuto. Non
serve rifare il push — ogni build di Pages pubblica lo stato ATTUALE di `main`, quindi
la successiva porta online anche i commit della fallita. Controllando si e' visto che
il repository **non ha `.nojekyll`**: Pages fa girare Jekyll su tutta la cartella
(`test-suite/`, `vendor/`, tutti i `.md`) prima di pubblicare un file HTML che e' gia'
pronto. Aggiunto un `.nojekyll` vuoto in radice. **Non e' una diagnosi di #615** — la
causa vera non e' dimostrata e con ogni probabilita' era un intoppo lato GitHub — e'
una messa in sicurezza che rende le pubblicazioni piu' rapide e meno capricciose.
Annotato anche un dubbio da verificare: nell'elenco dei workflow non compare una
esecuzione della **suite di test** per i commit di oggi, mentre c'e' per quello di
ieri. I 738 test sono stati eseguiti in locale prima della consegna, quindi il codice
e' coperto; ma se il controllo automatico e' spento sul serio, e' una rete di sicurezza
che manca **in silenzio** — la famiglia di difetti che questo progetto conosce meglio.

**CLAUDE.md ALLINEATO.** Corretti due fatti stantii: `index.html` era dato a «~20.900+
righe» e ne ha **32.308** (ora la riga dice anche di ricontrollarlo con `wc -l` invece
di ricopiarlo), e il nome dello strumento di consegna. Aggiunta la **regola 24** sui
connettori, che mette per iscritto le due decisioni prese oggi.

**GITHUB.** Nella prima ricerca avevo concluso che il connettore GitHub non esistesse:
sbagliato, la ricerca guardava il registro pubblico. Fabrizio l'ha collegato. Non e'
arrivato in questa sessione — i connettori si agganciano all'avvio, quindi serve
un'attivita' nuova. **Deciso: Claude potra' pubblicare solo dopo approvazione esplicita
di Fabrizio in chat, di volta in volta, mai con un via libera permanente.** Il
protocollo vero si scrive nella prossima sessione, dopo aver fatto l'inventario degli
strumenti che quel connettore espone davvero — scriverlo adesso su cio' che immagino
sarebbe esattamente la trappola della regola 23. Da correggere allora anche due
affermazioni stantie in CLAUDE.md: `index.html` e' dato a «~20.900+ righe» e ne ha
**32.308**, e la consegna e' descritta con il vecchio nome dello strumento.

**Cosa NON e' stato fatto** (deciso con Fabrizio, resta aperto): la forma «costruire
muscolo» del passo 2 — oggi per un percorso in surplus `_stradeVerso` esce con
«nessun grasso da togliere» e il blocco delle strade non compare affatto, verificato
sul codice. Richiede due campi nuovi in `obiettivoPercorso.clinico` (massa magra
obiettivo, tetto di grasso), un ramo surplus nelle strade e la migrazione sui
pazienti salvati. Deciso inoltre che su quel percorso **non si stima il tempo**: il
ritmo di crescita muscolare non si ricava dalle calorie, e un numero inventato con
l'aria di essere calcolato e' peggio di un numero assente (regola 11).

5 AGOSTO 2026 (11/11) — P149: LA SECONDA PARTE DEL TDEE, DALL'OBIETTIVO PESO IN GIU'.
Baseline d7f4512. Suite da 732 a 738 verdi (6 test nuovi in
`s2-tdee-parte2-ordine.test.js`). Chiude cio' che P147 aveva lasciato aperto: la
prima meta' della scheda Macros era stata rifatta il 3 agosto, questa e' la seconda.

IL MOTORE NON E' STATO TOCCATO. `calcolaTDEE`, `calcolaTraguardoComposizione`,
`_stradeVerso`, `_stradaCalcola`, `_traguardoScrivi`, i pavimenti di sicurezza per
sesso, lo storico delle revisioni, la verifica al controllo P127, il contesto AI e
il PDF: identici. E' cambiato DOVE stanno le cose e QUANTE VOLTE compaiono.

I TRE DIFETTI VERI.
(1) **Le decisioni erano in ordine sbagliato.** Giorni di carico, ciclizzazione
carboidrati e cronotipo stavano PRIMA del calcolo: la ciclizzazione chiedeva
"kcal giorni ON / kcal giorni OFF" mezza schermata prima che le calorie
esistessero. Due numeri che devono USCIRE dal calcolo, digitati a occhio.
(2) **Le calorie si decidevano in sei posti**: slider, campo kcal, campo %, dieci
pulsanti preset, tre pulsanti "Usa" delle strade, "Ritara a X kcal" della verifica
al controllo. E dopo aver premuto "Usa" su -20% la tabella delle strade restava
identica: nulla diceva quale fosse quella in vigore.
(3) **Il peso obiettivo si decideva in tre posti che si contraddicono** — campo
libero in alto, pannello 🎯 al centro, quattro chip di riferimento sotto. Che
fosse un difetto strutturale lo diceva il codice stesso: dal 26 luglio esiste un
avviso scritto apposta per quando il campo e il pannello divergono ("il campo dice
86 kg, l'ultimo traguardo calcolato era 75,2"). **Un avviso che ripara una
contraddizione creata dall'interfaccia e' un sintomo, non una cura.**

LA SCHEDA ORA RACCONTA UNA DECISIONE IN CINQUE PASSI, con i titoli numerati:
1 Da dove parte (attivita' fisica, invariata da P147) · 2 Dove vuole arrivare
(il 🎯 da solo) · 3 Quanto in fretta (approccio dieta, verifica al controllo,
strade, regime) · 4 Come si compone il piatto · 5 Come si distribuisce nella
settimana. Il passo 5 e' esattamente il blocco che stava in cima.

COSA E' SCESO SOTTO UNA PIEGA, NON RIMOSSO. Il campo "Obiettivo peso" e i quattro
riferimenti (Peso Ideale InBody, BMI, Devine, Robinson) vivono in
`#mac-altri-modi`, chiusa per default. **Il campo NON e' stato eliminato:** lo
leggono `salvaCalcoloMacros`, `_traguardoUsa`, `_traguardoAllineaManuale`,
`_usaRifPeso`, il salvataggio dell'anagrafica con la guardia `_stessoPaz` e la
tabella di validazione dei campi. Toglierlo sarebbe stata la famiglia F6/F7 —
campo tolto, lettura rimasta, dato azzerato in silenzio. Un test verifica che
esista, che porti il valore del paziente e che stia DENTRO la piega.

STRADE E REGIME NELLO STESSO PASSO. `_verificaControlloHtml` e `_stradeHtml` non
si concatenano piu' dentro `#trg-out` (in coda al riquadro del traguardo): vanno
in `#mac-strada-box`, sopra il regime energetico che impostano. Le righe delle
strade sono cliccabili (via il gia' esistente `_stradaUsa`) e quella in vigore e'
marcata con un pallino pieno. **La marcatura non ricorda cosa e' stato cliccato:
la RILEGGE dal campo % del regime**, in `_stradeEvidenzia`, agganciata alla fine
di `_aggiornaRegimeSlider` — cioe' all'unico imbuto da cui passano slider, campi,
preset, "Usa" e "Ritara". Se le calorie vengono cambiate da qualunque altra parte
la riga si spegne e accanto al regime compare "impostato a mano". E' la stessa
logica di P147c sul pannello LAF: **un numero visibile che contraddice i comandi
visibili sopra di esso e' peggio di un numero assente.**

IL TRANELLO EVITATO NELLA PIEGA DEL REGIME. Slider, kcal, % e i dieci preset sono
finiti dentro `<details id="mac-regime-manuale">`. Ma su un paziente senza
traguardo calcolabile (manca il sesso, manca l'InBody) le strade non esistono, e
la piega chiusa avrebbe nascosto **l'unico comando rimasto per le calorie**.
Quindi la piega si apre da sola quando le strade non ci sono, una volta sola per
apertura scheda (`_regimeFoldAuto`), e poi la decide l'utente. Due test, uno per
ciascuno dei due casi.

ANCHE: l'approccio dieta (Bilanciata/Chetogenica) e' rimasto PRIMA della scelta
del ritmo e non e' sceso col resto della composizione — in chetogenica i
protocolli sono in kcal assolute con bande proprie, quindi condiziona sia il passo
3 sia il passo 4 e deve stare in cima al 3. La tabella "Riferimento per categoria
paziente" (7 colonne x 6 righe) e' diventata richiudibile: e' materiale di
consultazione, non un passo della decisione.

METODO — il riordino e' stato fatto da uno script con ancoraggi verificati
(`find_one` che si ferma se una stringa non e' unica), non a mano riga per riga:
su un blocco di markup di 150 righe dentro un template literal, un taglio a occhio
sbagliato di una riga non da' errore di sintassi, da' un `<div>` non chiuso che si
vede solo a video. Collaudo: `node --check` sullo script estratto, INDEX.md
rigenerato, suite completa, e **render vero in Chromium** dello stesso paziente
dello screenshot per guardare il risultato invece di dedurlo.

5 AGOSTO 2026 (10/10) — P128 TAPPA 5: QUELLO CHE NESSUNO HA ANCORA GUARDATO.
Suite da 724 a 732 verdi (8 test nuovi). **Con questa P128 arriva al punto per cui
era stata aperta.**

IL DIFETTO, scritto nella scheda fin dal 26 luglio: la casella bianca significa due
cose — "valutato e va bene" e "non l'ho mai guardato" — e a schermo sono identiche.
Con 278 alimenti curati a mano passa; con prodotti che entrano da soli col codice a
barre **un alimento mai valutato SEMBRA approvato**, ed e' il rischio principale
dell'app.

COSA FA. `applicaRegoloSemaforo` tiene ora traccia della COPERTURA: per ogni
alimento, quali condizioni hanno ricevuto un verdetto — da una regola per nome,
dall'etichetta, o da un colore manuale. Cio' che resta scoperto finisce in
`p.nonValutati` (chiave alimento -> elenco delle condizioni scoperte), e la lista
alimenti mostra un badge **"? N"** col dettaglio nel tooltip, piu' una riga di
riepilogo in testa: *"? N alimenti non ancora valutati per almeno una condizione di
questo paziente — bianco non vuol dire approvato"*.

LA RIGA DI CONFINE, ed e' la decisione che tiene in vita il segnale: **il "da
valutare" vale SOLO per gli alimenti che NON vengono dalle tabelle CREA-INRAN.**
Sui CREA le liste di nomi sono state costruite da Fabrizio guardando proprio quel
catalogo: l'assenza di un alimento dalla lista del nichel e' una DECISIONE, non un
buco. Su un prodotto scansionato non lo e'. Senza questa riga sarebbero dieci
condizioni x 278 alimenti tutte "da valutare", e il segnale sarebbe morto il giorno
stesso — regola 19 applicata ai dati invece che agli avvisi.

E UN COLORE MESSO A MANO CHIUDE LA QUESTIONE: e' il nutrizionista che ha guardato,
ed e' la sua firma. Il punto interrogativo sparisce.

I buchi si **ricalcolano da capo** a ogni passata, non si accumulano: se il paziente
perde una condizione, il buco relativo sparisce. Uno stato stantio qui direbbe "da
valutare" per una patologia che il paziente non ha piu'.

TRE DEGLI OTTO TEST NUOVI VERIFICANO IL SILENZIO: i CREA non producono mai buchi,
un paziente senza condizioni non ne produce, un alimento archiviato nemmeno.

RESTA SOLO LA TAPPA 6 (il marchio nel piano AI, che tocca il documento consegnato
al paziente) e P128b (rivalutare le soglie). Entrambe non urgenti.

5 AGOSTO 2026 (9/9) — P128 TAPPA 4: IL SEMAFORO LEGGE ANCHE L'ETICHETTA.
Suite da 710 a 724 verdi (14 test nuovi, `s2-semaforo-etichetta`).

DA DOVE NASCE, parole di Fabrizio: *"se aggiungo il latte di una certa marca ed ho
un paziente intollerante al lattosio, io voglio vedere che quel latte e' grigio
scuro e quindi sconsigliato per la sua patologia"*.
  IL DIFETTO ERA ESATTAMENTE QUELLO. Il semaforo colorava solo per NOME, con liste
di nomi propri. Un prodotto appena scansionato non e' in nessuna lista, quindi
entrava fra gli alimenti scegliibili per il paziente **bianco** — cioe'
indistinguibile da uno controllato e approvato. Con un database che cresce col
codice a barre e' il rischio principale dell'app, ed e' il motivo per cui P128
esiste.

COSA FA. `applicaRegoloSemaforo` ha ora una SECONDA sorgente: `_semApplicaEtichette`
scorre il catalogo e, per i soli alimenti che hanno un'etichetta (cioe' gli
scansionati), riversa i verdetti nei MEDESIMI contatori delle regole per nome.
Conseguenza voluta: tooltip, avvisi allergeni, esclusioni del generatore e PDF
funzionano senza sapere da dove viene il colore — nessuno di loro e' stato toccato.
  `_semEtichettaValuta(rec, condizione)` e' pura e restituisce 'grigio', 'celeste'
o **null**. Perimetro: lattosio e glutine dagli allergeni dichiarati; sodio,
zuccheri e saturi dalle soglie UK FSA della tappa 3. Le altre dieci condizioni
restano fuori: non si deducono, e non si inventano.

LA REGOLA CHE TIENE IN PIEDI TUTTO: **null non e' "va bene".** Un'etichetta che non
dice niente su una condizione non produce mai un celeste. Un prodotto di cui non
conosciamo il sodio non e' un prodotto a basso sodio, e la fascia media non e' un
via libera. Cinque dei quattordici test nuovi verificano solo questo silenzio.

E LA PRECEDENZA CHE EVITA IL DANNO PEGGIORE: la dichiarazione "senza" viene prima
dell'allergene. Un latte delattosato dichiara il LATTE fra gli allergeni e non
contiene lattosio: senza quella precedenza risulterebbe sconsigliato proprio al
paziente per cui e' fatto. Ora risulta **celeste**, cioe' consigliato.

INVARIANTI CONFERMATE DAI TEST: un colore messo a mano non viene mai sovrascritto
(la scelta ultima e' del nutrizionista); un alimento archiviato non entra nel
semaforo; in conflitto fra grigio e celeste vince la cautela e il conflitto resta
registrato per il tooltip; sui CREA-INRAN non cambia nulla.

RICALCOLO IMMEDIATO. Salvando un alimento si richiama `_semRicalcolaPazienteAperto`:
senza, il prodotto appena scansionato sarebbe rimasto bianco fino al successivo
salvataggio del paziente — di nuovo indistinguibile da uno valutato.

UN DIFETTO DA UN TEST, E LA STESSA LEZIONE DI STAMATTINA: la prima versione
iterava `CATALOGO_ALIMENTI` come un array. **E' una Map** (id -> record). Il codice
e' stato corretto, ma il punto vero e' il test: era stato scritto su un array,
cioe' collaudava una struttura dati che l'app non ha. E' la stessa lezione della
tappa 2, dove il test costruiva a mano una configurazione che l'app non usa.
**Un test che si costruisce il proprio mondo non collauda niente.**

5 AGOSTO 2026 (8/8) — P128 TAPPA 3: SI ADOTTANO LE SOGLIE BRITANNICHE, E SI
DICHIARA CHE SONO PROVVISORIE. Suite 710 verdi.

LA DOMANDA DI FABRIZIO era "qual e' il miglior modo per determinare le soglie, un
modo scientificamente valido?", e la ricerca ha portato due documenti nel progetto
Claude: il metodo (budget giornaliero + quota della porzione, con le fonti OMS
verificate) e il confronto con gli altri software.
  DAL CONFRONTO: Yuka e il Nutri-Score danno un voto UGUALE PER TUTTI, senza
condizioni cliniche. Fig lavora sugli ingredienti con 50.000 relazioni
dieta-ingrediente — che sono il loro prodotto, non un dettaglio: e' l'ordine di
grandezza del lavoro per nichel/FODMAP/purine a mano. Monash FODMAP, l'unico
rigoroso, misura in laboratorio e mette il semaforo SULLA PORZIONE, non sui 100 g.
Il software professionale per dietisti in gran parte non affronta il problema.
  **Nessuno di loro ha uno stato "non l'ho ancora valutato".** Per un consumatore
va bene, non rischia niente. Per chi firma una dieta e' l'unica cosa che distingue
"l'ho controllato" da "non l'ho mai guardato" — ed e' la parte gia' costruita qui.

LA DECISIONE. Fabrizio ha osservato che "NutriGest colora gli alimenti perche' il
nutrizionista scelga con piu' facilita', pero' la scelta ultima e' sempre del
nutrizionista". Se il colore e' un AIUTO e non un verdetto, la precisione della
soglia conta molto meno: si sta ordinando una lista, non misurando. Quindi: si
adottano le soglie UK FSA per 100 g, **consapevolmente provvisorie**, perche' un
alimento valutato con una soglia grossolana e' meglio di un alimento che nessuno
ha guardato — che e' il difetto vero quando il database cresce col codice a barre.
  La scheda alimento **dichiara la fonte e la provvisorieta' a schermo**, e un test
lo verifica: una soglia senza la sua fonte e' una soglia che nessuno sapra' rivedere.
  Le soglie restano confinate alla scheda: non colorano il semaforo del piano.

APERTA P128b — RIVALUTARE LE SOGLIE, priorita' bassa, non bloccante. Due strade
candidate: la quota del budget giornaliero per porzione (che si adatta al TDEE del
paziente e usa `gDefault`, gia' presente in ogni record), oppure — idea di Fabrizio —
**mostrare la quantita' invece del colore**: "una porzione porta il 34% del sale
della giornata di questo paziente". La seconda non richiede NESSUNA soglia: elimina
del tutto la decisione piu' difficile e resta personalizzata.

5 AGOSTO 2026 (7/7) — P128 TAPPA 2: LA SCHEDA ALIMENTO. Suite da 692 a 710
verdi (18 test nuovi, `s2-scheda-alimento`).

COS'E'. Pulsante 🍽 su ogni riga della sezione Alimenti — anche sui CREA-INRAN,
perche' e' sola lettura — che apre una scheda con: ciambella dei macro in
percentuale di CALORIE, interruttore 100 g / porzione, i quattro numeri clinici
dell'etichetta col metro delle soglie, allergeni a tre stati, ingredienti, e la
valutazione clinica delle 15 condizioni divise in tre famiglie col contatore
"N valutate · M da valutare". Non tocca nessun dato e non entra in nessun calcolo.

LA CIAMBELLA E' IN CALORIE, NON IN GRAMMI (decisione di Fabrizio): sui cracker i
grammi direbbero 71% carboidrati e 18% grassi, le calorie 58% e 32%. In grammi i
grassi risultano schiacciati — pesano piu' del doppio per grammo — e la
ripartizione non si confronterebbe col target del paziente.

LE SOGLIE SONO DICHIARATE PROVVISORIE A SCHERMO. Sale, zuccheri e saturi usano il
semaforo britannico (FSA), che e' una soglia da SCAFFALE e non clinica. La scheda
lo dice in fondo con un riquadro: "non colora nulla e non entra in nessun calcolo
— serve a guardare i dati veri prima di decidere le soglie". Le soglie cliniche
restano la tappa 3, L0, lavoro a quattro mani.

UN DIFETTO CLINICO PRESO DA UN TEST, ed era il peggiore possibile in questa voce:
uno **yogurt delattosato risultava VIETATO al paziente intollerante al lattosio**.
Il motivo: il prodotto dichiara il LATTE fra gli allergeni (perche' il latte c'e')
e la regola guardava l'allergene prima della dichiarazione "senza lattosio". Ora la
dichiarazione "senza" viene PRIMA dell'allergene. Vale identico per il pane senza
glutine certificato che porta "tracce di frumento" nella trascrizione: senza questa
precedenza sarebbe vietato proprio al celiaco per cui e' fatto.

E UNA LEZIONE SUL COME TESTARE. Il test che ha trovato il difetto inizialmente
FALLIVA per colpa mia: costruiva la definizione della condizione a mano invece di
leggere quella vera da `_SCH_FAMIGLIE`. Riscritto per prendere la configurazione
REALE (`voce('all-lattosio')`): collaudare una configurazione che l'app non usa e'
il modo piu' comodo per far passare un difetto ai test.

DUE RIFINITURE VISTE SOLO APRENDO LA SCHEDA IN UN BROWSER, non leggendo il codice:
  1. **Avere il numero non e' averlo valutato.** L'insufficienza renale mostrava
     "valutato" perche' il sodio c'era, ma una soglia clinica per il sodio non
     esiste ancora. Ora senza soglia si resta su "da valutare", col dato accanto:
     dire "valutato" sarebbe la stessa bugia del bianco che significa due cose.
  2. **I tag di Open Food Facts sono in inglese** e arrivavano a schermo cosi'
     ("milk", "sesame seeds", "lactose free") in un'app italiana. Tradotti i piu'
     frequenti; un tag sconosciuto resta com'e' — meglio una parola inglese che
     una parola sparita.

RESTA: tappa 3 (soglie cliniche, L0), 4 (allergeni come regola vera), 5 (stato
derivato nella lista), 6 (marchio nel piano AI).

5 AGOSTO 2026 (6/6) — P128 TAPPA 1: SI RACCOGLIE TUTTA L'ETICHETTA, NON PIU'
QUATTRO NUMERI. Suite da 667 a 685 verdi (19 test nuovi, `s2-etichetta-off`).

DA DOVE NASCE. Fabrizio voleva ripartire da P90 ("l'abbiamo gia' fatto?") e ha
chiesto: "usiamo il database di Yuka, Open Food Facts: non possiamo sfruttarlo
appieno?". Verificando sono uscite tre cose.
  1. **P90 NON e' fatto**: e' il FoodRowEditor, cioe' come una riga alimento+grammi
     entra in una ricetta. Quello che e' fatto e' il blocco P108/P109/P110 —
     sezione Alimenti, record unico e scanner barcode — chiuso il 13 luglio.
  2. **La scheda di P128 dichiara una dipendenza sbagliata** ("dipende da P90").
     Cio' che P128 aspettava era il codice a barre e il record unico, cioe' P110 e
     P108: **e' sbloccata da tre settimane e nessuno se n'era accorto.** Corretta.
  3. **Della risposta di Open Food Facts tenevamo il 15%.** La chiamata chiedeva
     `product_name,brands,nutriments,serving_quantity` e ne mappava quattro numeri:
     kcal, proteine, carboidrati, grassi. Sodio, zuccheri, saturi, fibra, allergeni
     dichiarati, ingredienti, categorie — cioe' esattamente la materia prima delle
     regole future — arrivavano e venivano buttati a ogni scansione.

COSA FA QUESTA TAPPA. La chiamata chiede tutti i campi utili e nasce
`_offEstraiEtichetta(prod, barcode, data)`, pura e testabile, che produce una
scheda d'etichetta dalla forma SEMPRE identica — chi legge non deve mai indovinare
se una chiave esiste. Il record alimento la conserva in `etichetta`, additiva:
nessuna migrazione, i record vecchi hanno `etichetta:null` e va bene cosi'.

LA REGOLA CHE GOVERNA IL BLOCCO: **assente non e' zero.** Un campo che Open Food
Facts non ha vale null e si dichiara mancante. Se diventasse 0, un prodotto di cui
non conosciamo il sodio sembrerebbe un prodotto senza sodio — ed e' esattamente il
difetto che P128 esiste per non commettere. Il rovescio vale altrettanto: uno zero
DICHIARATO (0 g di fibra) e' un dato e non va confuso con un buco.

DUE CONVERSIONI, PERCHE' L'ETICHETTA E' INCOMPLETA IN MODI PREVEDIBILI: kcal dai kJ
quando manca il valore diretto (4,184 kJ = 1 kcal), e sale<->sodio a vicenda
(sale = sodio x 2,5). Se mancano entrambi non si inventa nessuno dei due.

LA TRAPPOLA DEL LATTOSIO, raccolta ora e da usare nella tappa 4: l'allergene
dichiarato e' **il latte, non il lattosio**. Un delattosato contiene latte e non
contiene lattosio. Senza conservare `labels_tags: lactose-free` il sistema
segnalerebbe come vietato proprio il prodotto fatto apposta per quel paziente.
Stesso discorso per il senza glutine. Le dichiarazioni "senza" finiscono quindi in
un campo loro.

NOVA E NUTRI-SCORE SI RACCOLGONO, MA NON SONO CLINICI e non entreranno in nessuna
regola: il Nutri-Score e' una sintesi da supermercato, e una A puo' convivere con un
contenuto di sale proibitivo per un iperteso. Scritto nel codice accanto al campo,
perche' e' li' che qualcuno un giorno sara' tentato di usarlo.

IL DATO RACCOLTO NON RESTA INVISIBILE. Il riquadro del barcode ora dice in una riga
cosa l'etichetta ha portato **e cosa non ha portato** ("Dall'etichetta: sale ·
zuccheri · fibra — Non dichiarati: grassi saturi"). Un dato raccolto e mai mostrato
e' indistinguibile da un dato mancante, che e' la confusione che questa voce esiste
per togliere di mezzo.

LO STESSO DIFETTO DI STAMATTINA, PRESO DUE VOLTE IN UN GIORNO: la prima versione di
`_offNum` usava `parseFloat` nudo, e `parseFloat("12,5")` vale 12. E' identico al
difetto trovato poche ore prima in P35 sulla virgola italiana. Qui pero' la
decisione e' opposta e voluta: il valore con la virgola si **scarta** invece di
convertirlo, perche' da una fonte esterna non si sa se la virgola separa i decimali
o le migliaia — e un campo scartato compare come "non dichiarato", che e' vero e
verificabile a mano sull'etichetta. Trovato da un test, non rileggendo il codice.

REGOLE D'USO DI OPEN FOOD FACTS, verificate oggi sulla loro documentazione: 15
letture prodotto al minuto per IP (scansionando un prodotto alla volta siamo
lontanissimi), dati sotto Open Database License con attribuzione dovuta — il
riquadro la cita gia'. Chiedono uno User-Agent identificativo: **dal browser non e'
impostabile** perche' e' un header vietato in `fetch`, quindi si passano `app_name`
e `app_version` in query. Detto come sta, non promesso.

ADDENDUM DELLA SERA — "NON CONTIENE" E "NESSUNO L'HA COMPILATO" DIVENTANO DUE
COSE DIVERSE. Domanda di Fabrizio guardando il mockup della scheda alimento: una
lista di allergeni vuota su Open Food Facts puo' voler dire "non contiene" oppure
"nessuno l'ha ancora trascritta", e a schermo erano identiche.
  SI PUO' DISTINGUERE, e il segnale che decide **non e' un bollino di completezza**:
e' **la lista degli ingredienti**. Open Food Facts ricava gli allergeni analizzando
il testo trascritto da un volontario; se quel testo non c'e', non c'e' stata nessuna
analisi e l'assenza di allergeni non significa niente. Nasce
`_offStatoAllergene(et, chiavi)` con tre valori invece di due: 'contiene' (dichiarato
fra allergeni o tracce), 'assente' (ingredienti trascritti e allergene non presente:
e' un'informazione), 'incompleta' (nessuna lista ingredienti: l'assenza non vale).
  `completeness` e `states_tags` si raccolgono come corroborazione ma **la regola non
ci si appoggia**: nella documentazione ufficiale ho potuto confermare `completeness`
e `complete`, non `states_tags`, e una regola clinica non si costruisce su un campo
che non si e' verificato. Raccolti si', usati come prova no.
  In dubbio si resta prudenti: senza etichetta lo stato e' 'incompleta', mai
'assente'. Un alimento di cui non sappiamo niente non e' un alimento sicuro.
  Trovato anche `nutrient_levels` — la classificazione basso/medio/alto che Open
Food Facts calcola da se' sui quattro nutrienti. Si raccoglie: sara' utile come
CONTROPROVA delle soglie della tappa 3, mai come loro sostituto (sono soglie da
scaffale, non cliniche — stesso ragionamento del Nutri-Score).

RESTA DA FARE (P128, tappe 2-6): la scheda alimento con la ciambella dei macro in
percentuale di CALORIE, le soglie cliniche voce per voce con Fabrizio (L0), gli
allergeni come regola, lo stato "da valutare" derivato, e il marchio nel piano AI.
Decisioni gia' prese e registrate nella scheda.

5 AGOSTO 2026 (5/5) — P35 TAPPE 1 E 2: LE DUE BILANCE SI SEPARANO, E IL PESO
CASALINGO HA UN GRAFICO. Suite da 630 a 665 verdi (35 test nuovi).

IL DISEGNO, deciso da Fabrizio guardando tre mockup successivi. Alla domanda su
quali tappe opzionali fare la risposta e' stata "voglio cose semplici, non voglio
riempire di grafici anche il peso casalingo": UN grafico solo, con interruttori
per accendere anche la serie dello studio, una barra di scorrimento nel tempo e
pochi numeri. Scartate quindi la striscia di aderenza (tappa 4 della scheda) e il
confronto casa-studio come pannello a se' (tappa 5) — quest'ultima e' comunque
soddisfatta nella forma sicura che la scheda stessa prescriveva: le due serie sullo
stesso asse dei tempi senza fonderle, nessun numero derivato, nessun offsetBilancia.

TAPPA 1 — LA SEPARAZIONE, che era la correzione di un difetto clinico silenzioso.
`_serieePesoOss` fondeva p.inbody[] e p.pesiIntermedi[] in una serie sola, e quella
serie alimentava tre numeri clinici: il valore attuale del traguardo di peso, il
punto di partenza della proiezione, e il Δpeso che calibra il TDEE osservato. Se la
bilancia di casa legge 1,2 kg in piu' di quella dello studio, quel 1,2 entrava come
se fosse grasso preso — in tutti e tre. Nasce `_seriePesoClinico(p)` (solo InBody) e
i tre punti leggono da li'. La serie fusa resta viva ma con un uso dichiarato:
`_percorsoChartSvg` (che disegna i due tipi di punto e la fonte si vede a schermo) e
`_percorsoShiftGiorni` (che usa solo la DATA dell'ultima pesata come ancora, non i
kg). Il compromesso — meno dati per il TDEE osservato — era gia' stato accettato da
Fabrizio il 4 agosto: la risposta e' clinica, proporre una misurazione professionale
ogni due-tre settimane.
  Corretto nello stesso giro anche il delta della lista, che era calcolato contro il
PRIMO PESO INBODY: il paziente vedeva addosso lo scarto di taratura il giorno stesso
in cui iniziava. Ora ogni serie si confronta con la propria prima misura.
  TRE TEST ESISTENTI SONO DIVENTATI ROSSI, ed era il punto. Uno si chiamava "il peso
usa anche le pesate intermedie, non solo gli InBody": codificava esattamente il
comportamento che questa tappa rovescia, ed e' stato riscritto al contrario con la
spiegazione del perche'. Due fixture del TDEE osservato calibravano su pesate di casa
e ora usano InBody. Un test che diventa rosso per una decisione presa non e' un test
sbagliato: e' la decisione che si vede.

TAPPA 2 — IL GRAFICO (prefisso `_pcas*`). Due serie separate sullo stesso asse dei
tempi, con segni diversi (pallini per casa, rombi e tratteggio per lo studio) perche'
restino leggibili come DUE STRUMENTI anche accese insieme. Media mobile a 7 giorni
calcolata su una FINESTRA DI DATE e non sulle ultime 7 righe dell'array — con pesate
a buchi "le ultime 7 pesate" puo' voler dire un mese — e la linea si INTERROMPE dove
la finestra ha meno di 3 pesate, invece di interpolare sopra il vuoto. Barra di
scorrimento trascinabile sotto al grafico, con 1 mese / 3 mesi / Tutto come
scorciatoie che muovono la barra invece di essere un secondo controllo che puo' dire
un'altra cosa. Tre numeri che seguono la finestra scelta: ultima pesata, variazione,
velocita' in kg/settimana col metro della fascia di ritmo.

LA FASCIA ESISTEVA GIA' e si chiama `_ibFasciaRitmo` (P132). Ne avevo scritta una
seconda dentro il blocco nuovo prima che il repo mi correggesse: e' la regola 15,
ripara il rubinetto — due copie della stessa soglia divergono al primo ritocco e i
grafici InBody direbbero una cosa diversa dal peso casalingo sullo stesso paziente.
Riusata quella, con la stessa disciplina di P132: si colora SOLO il calo troppo
rapido, la lentezza e' scritta a parole e non colorata.

TRE DIFETTI TROVATI DAI TEST E DAL COLLAUDO, non dalla rilettura del codice:
  1. `parseFloat("78,5")` vale 78. La virgola italiana in un peso salvato diventava
     mezzo chilo di errore MUTO. Nasce `_pcasNumero`, che converte la virgola e
     scarta tutto cio' che non e' un numero pulito invece di arrotondarlo (regola 11:
     un ripiego silenzioso su un dato e' un bug in attesa).
  2. La tessera diceva "in 124 giorni" ma la variazione e' misurata fra i CENTRI dei
     due gruppi di estremo, cioe' su meno giorni. E' la stessa famiglia del difetto
     "Ultima settimana: -1,3 kg in 21 giorni" che questa voce corregge: l'etichetta
     non deve mai dichiarare un denominatore piu' grande di quello usato. Ora la
     tessera dice "misurata su N giorni" con gli N veri.
  3. Con gruppi di estremo fissi a 7 giorni, un paziente che si pesa due volte a
     settimana non vedeva quasi mai un numero — una pesata sola nei primi 7 giorni.
     I gruppi ora si allargano fino a 21 giorni finche' non trovano 2 pesate. Trovato
     provando il mockup su una serie rada, non leggendo il codice.

LA META' DEI 35 TEST NUOVI VERIFICA IL SILENZIO (regola 19): finestra sotto i 14
giorni, una sola pesata per lato, finestra sopra un buco, coda della finestra vuota,
pesate tutte ravvicinate, bordi esatti della fascia che NON sono fuori fascia. Due
pesate a tre giorni di distanza con il rumore di mezzo chilo darebbero "-1,9 kg a
settimana" senza che sia successo niente: meglio nessun numero.

COLLAUDO. `node --check`, 665/665 verdi, INDEX.md rigenerato, e la sezione renderizzata
in un browser vero su una serie demo di 125 giorni con 68 pesate — e' li' che si e'
visto il difetto 3 e che la lista di 68 righe sotto al grafico era diventata
ingestibile (ora si ferma a 10 con "Mostra tutte"). I calcoli sono stati verificati
contro un'implementazione indipendente in Python prima di scrivere il codice: zero
discordanze su 125 giorni.

AGGIUNTA DELLA SERA, dopo la prima prova sul campo. Fabrizio ha aperto un paziente
senza pesate casalinghe, ne ha aggiunta una a caso, e il grafico e' comparso: con UN
punto solo, cioe' senza niente da guardare. Due correzioni:
  - il grafico non si apre piu' da solo. Nell'intestazione della card c'e' un bottone
    "📈 Apri il grafico" a destra, e la scheda InBody resta com'era finche' non lo si
    chiede. Lo stato dura finche' si resta su quel paziente; cambiando paziente
    riparte chiuso, come la finestra riparte da "Tutto".
  - sotto le 2 pesate a casa non compare nemmeno il bottone: un punto solo non e' un
    andamento, e offrire di aprirlo e' una promessa che il grafico non mantiene.
  E un difetto trovato aprendo DUE card nello stesso documento: `_pcasStatoGet` SCRIVE
lo stato globale, e veniva chiamata anche per un paziente il cui grafico non era
disegnabile — azzerando quello del paziente a schermo. Ora si chiama solo quando il
grafico esiste davvero. Nell'app si vede una card alla volta e non sarebbe emerso: e'
uscito perche' il collaudo mette due pazienti nella stessa pagina.

RESTA APERTO: la striscia di aderenza, se un domani servisse per i pazienti lontani.
E la domanda di P132 sulla lentezza resta decisa nel modo prudente (non si colora),
coerente con l'esistente.

5 AGOSTO 2026 (4/4) — MANUTENZIONE DOCUMENTAZIONE, su osservazione di Fabrizio.
"Stai producendo davvero tanti documenti e molto lunghi, ho paura che nel tempo
diventi troppo grande." Misurato: il CHANGELOG era a 8457 righe / 548K, e 493
di quelle righe erano state scritte in giornata, in dieci voci separate che
raccontavano più volte le stesse lezioni.
  La struttura regge — il CHANGELOG non si legge mai per intero, si cerca per
numero di voce, e cercare in 8000 righe costa quanto cercare in 800. Il difetto
era la prolissità, contro una regola di stile che c'era già scritta ("taglia le
ripetizioni e le ri-spiegazioni"). Le dieci voci di oggi sono state fuse in
tre — audit, disegno di P148, realizzazione di P148 — conservando root cause,
decisioni, lezioni e incidenti, e togliendo solo il racconto ripetuto: da 499 a
227 righe, senza perdere nulla di sostanziale.
  **Il meccanismo giusto esiste già ed è quello che regge nel tempo:** la
storia va nel CHANGELOG UNA volta, la lezione permanente diventa una riga
numerata in CLAUDE.md. Sono quelle regole a essere rilette a ogni sessione, non
la cronaca. Da qui in avanti: una voce per sessione di lavoro, non una per
consegna.
  Segnata anche in P35 la decisione ancora aperta sulle tappe opzionali del
grafico del peso casalingo, che rischiava di restare implicita.

5 AGOSTO 2026 (3/4) — P148 REALIZZATA E COLLAUDATA: QUATTRO TAPPE.
Baseline b413f08 → 8988864. 95 test nuovi, suite da 534 a 630 verdi.

TAPPA 1 — IL MOTORE. `pastoMaxPerMacro(piano, giorno, macro)` e
`pastoMaxPerMacroTuttiIGiorni` restituiscono lo slot pasto con più grassi (o
più carboidrati) di un giorno. Nessuna chiamata AI: il piano è già generato con
alimenti e grammi, la risposta è una somma e un massimo — stesso principio di
P63b. Sull'esempio di Fabrizio esce quel che deve: lunedì pranzo (mozzarella),
martedì cena (salmone).
  La ponderata 35/25/15/10/8/7 serviva anche qui e viveva dentro
  `calcolaMacrosPiano`. Copiarla sarebbe stato più rapido ed è il difetto di
  P141 (tre funzioni per la stessa cosa, correggerne una lascia rotte le
  altre): è stata quindi ESTRATTA in `_macrosCella` — regola 15, ripara il
  rubinetto. Protezione: output misurato su un fixture prima dell'estrazione e
  riconfrontato dopo, identico, e ora pinnato in un test di regressione.
  `calcolaMacrosPiano` non ne aveva NESSUNO prima di oggi.

TAPPA 2 — IL CATALOGO UNICO. `CATALOGO_INTEGRATORI` è l'unico posto in cui un
integratore è definito: 25 voci attive con nome, dose, quando, regolaOrario,
sinergie, incompatibilità, razionale. `INTEGR_KEYS`, `INTEGR_LABELS` e il
blocco "integratore" di `LIBRERIA_ROUTINE` sono DERIVATI da lì (F4/regola 12:
si elimina la seconda fonte). La libreria della Routine passa da 12 a 25 voci,
le stesse della Clinica.
  IL GUASTO INTERCETTATO PRIMA DI SCRIVERLO — REGOLA 21 IN DIRETTA. Gli
  integratori sono salvati sui pazienti per ETICHETTA, non per chiave
  (["Probiotici", "Ferro"]). Il catalogo rinomina diverse voci, e
  `setIntegratori` confrontava l'etichetta carattere per carattere: aprendo un
  paziente storico la casella sarebbe risultata non spuntata e il salvataggio
  successivo avrebbe cancellato il dato, senza un errore a video. È lo stesso
  guasto di P147 sulle attività; la regola 21 lo prevedeva e stavolta è stato
  preso PRIMA. Rimedio: mappa `INTEGR_ALIAS` con tutte le etichette storiche
  dei due elenchi e `chiaveIntegratore()` usata dai due setter. Nella mappa è
  finito anche un refuso reale dei dati: "Ferro (bisgliccinato)" con due c.
  BLU DI METILENE: ritirato (`attivo:false`), NON cancellato. Cancellare la
  riga avrebbe fatto sparire il dato dai pazienti che ce l'hanno — famiglia
  F6/F7. Non è proponibile, ma la sua etichetta continua a risolvere.
  Le etichette che nessuna regola sa tradurre finiscono in `liberi` e si
  conservano come testo libero: un dato cancellato è peggio sia di uno
  mancante sia di uno inventato (regola 11 portata alle conseguenze).

TAPPA 3 — LA SCHEDA CLINICA SI GENERA DA SOLA. Le 19 caselle scritte a mano nel
markup sono sostituite da `renderCaselleIntegratori(p)`: è proprio quel doppio
punto di manutenzione ad aver fatto divergere i due elenchi. Il render va
chiamato PRIMA di `setIntegratori` — invertendoli le spunte non
comparirebbero, in silenzio: c'è un commento sul punto di chiamata e un test
che fissa l'ordine.
  COLORI: `var(--teal)` e `var(--blue)` al posto di `#BA7517`, che non era
  nemmeno una variabile CSS ma un colore scritto a mano in venti punti. Il
  motivo non è estetico: una casella di ANAMNESI (il paziente lo prende) non
  deve leggersi come un GIUDIZIO clinico (glielo consiglio). Un test vieta gli
  accent-color del semaforo su questa griglia, così il vincolo non si perde.
  PANNELLO ⓘ per voce: dose, quando, alternative col loro motivo, sinergie
  scritte col NOME (non con la chiave interna), avvertenze staccate con un
  bordo rosso, razionale. Resta aperto finché non lo chiudi invece di essere un
  avviso a scomparsa: cinque righe di testo su iPhone non si leggono in un
  toast. La casella del Blu di metilene compare solo sui pazienti che ce
  l'hanno, marcata "(ritirato)".

TAPPA 4 — IL PASTO AUTOMATICO. `pastoRif` accetta 'auto', che non è un pasto ma
una REGOLA, risolta ogni volta sul piano reale del paziente, giorno per giorno.
  SI SALVA LA REGOLA, NON IL RISULTATO. Congelare il pasto calcolato dentro la
  voce sarebbe stato più semplice e sbagliato: al primo piano nuovo la voce
  indicherebbe il pasto di un piano che non esiste più. È la doppia fonte di
  verità di F4/regola 12 applicata al tempo invece che ai campi. Un test lo
  fissa: cambia il piano, cambia il pasto, la voce non viene toccata.
  LA SCELTA MANUALE NON VIENE MAI SOVRASCRITTA: se `pastoRif` è un pasto vero,
  il calcolo non entra nemmeno in funzione.
  NEL PDF LA RISOLUZIONE VA IN DUE PUNTI. Il generatore MISURA l'altezza dei
  pasti prima di disegnarli: sostituendo il filtro solo nel disegno, il PDF
  avrebbe stampato una voce in un pasto di cui non aveva riservato lo spazio.
  DOSE PER PESO (BCAA, 1 g ogni 10 kg): letta dall'InBody più recente (regola
  10) al momento in cui si mostra, MAI copiata nella voce — un peso congelato
  mostrerebbe fra tre mesi una dose giusta per un peso che non esiste più.
  Senza referto non viene mostrato nessun numero: resta la regola.
  PONTE CLINICA→ROUTINE: suggerimento cliccabile, non aggiunta automatica.
  "prende già / vorrebbe" è un fatto di ANAMNESI, la voce in Routine è una
  PRESCRIZIONE che finisce nel PDF: trasformare la prima nella seconda
  significherebbe prescrivere ciò che il paziente aveva solo dichiarato. Il
  ponte riconosce anche le voci salvate prima del catalogo, senza `chiave`,
  risolvendole dal nome.

DUE COSE DELL'ATTREZZATURA, utili a chi verrà dopo.
(1) TRAPPOLA DI REALM JSDOM, incontrata in tre forme: `deepStrictEqual` su
valori nati dentro la finestra fallisce per il prototipo diverso; i `const`/
`let` top-level non diventano proprietà di `window` (le `function` sì) e si
leggono con `win.eval`; assegnare `win.window.db` non rebinda il `let db`, va
fatto dentro un eval. L'helper di normalizzazione stava per essere copiato in
ogni file di test: è stato messo in `_loadApp.js` come `puro()` — regola 15
applicata all'attrezzatura di collaudo.
(2) `rigenera-index.js` RIALLINEA i numeri di riga ma NON aggiunge le funzioni
nuove. Dopo la tappa 1 la suite era verde e l'indice "allineato" pur non
contenendo nessuna delle tre funzioni appena scritte: `s1-doc-allineata`
verifica che le voci elencate siano giuste, non che siano complete. Annotato in
testa a INDEX.md. Stessa famiglia della regola 20: un controllo verde non è una
verifica di ciò che quel controllo non guarda.

COLLAUDO A VIDEO SUPERATO da Fabrizio lo stesso giorno, sui sette punti
concordati: spunte intatte su un paziente storico (il punto in cui il guasto da
regola 21 si sarebbe visto), colori, pannello ⓘ, suggerimento dalla Clinica,
pasto automatico giorno per giorno su un paziente con piano, scavalcamento
manuale che regge alla riapertura, PDF con la voce nel pasto giusto di ogni
giorno. P148 CHIUSA.

5 AGOSTO 2026 (2/4) — P148 DISEGNATA: DAL PROBLEMA AL CATALOGO, E UNA DOMANDA
CHE NON ANDAVA POSTA. Nessuna riga di codice, solo la scheda di roadmap.

DA DOVE NASCE. Fabrizio spunta "Omega-3" nella scheda Clinica di un paziente,
va sulla Routine per dirgli quando assumerlo, e la trova vuota. Chiede se non
sia più logico che le due si colleghino.

VERIFICATO NEL CODICE: sono due sistemi indipendenti. Clinica (19 voci) scrive
p.integratori/p.integraWant, letti SOLO nel contesto che va a FX. Routine (12
voci con dose/quando/razionale) scrive p.routineGiornaliera, alimentata solo da
un click manuale. Il problema vero non è "manca un collegamento": le due liste
usano vocabolari diversi, costruiti in momenti diversi — solo 5 voci su 19
hanno un corrispondente, e nemmeno con lo stesso nome. Decisione: unificarle,
con disegno prima e codice dopo (schema di P35).

I COLORI. Fabrizio nota che "prende già"/"vorrebbe prendere" si leggono come
verde e arancione, i registri del semaforo alimenti, e chiede di cambiarli.
Deciso: due colori diversi, non nessun colore (19 righe × 2 caselle in tinta
unica sarebbero illeggibili). `var(--teal)` resta, `var(--blue)` sostituisce
`#BA7517`: entrambi già in palette, entrambi toni freddi lontani dalla rampa
calda del semaforo.

IL CATALOGO. Schema `{chiave, nome, dose, dosePerPeso?, quanteVolte, quando,
quandoAlt?, regolaOrario, sinergie[], evitareCon[], razionale}`. Fabrizio ha
dettato 3 voci d'esempio (Omega-3, Vitamina D3, Ferro) e ha chiesto
esplicitamente di completare le altre; la bozza è stata marcata come contenuto
clinico da rivedere riga per riga, con 4 righe segnalate per interazione nota
con farmaci (K2 e CoQ10 con anticoagulanti, Berberina con ipoglicemizzanti,
Pappa reale con allergie all'alveare).
  BLU DI METILENE TOLTO su decisione di Fabrizio: unica voce con interazione
  seria nota (SSRI) e uso specialistico — una casella spuntabile in un catalogo
  rapido è l'interfaccia sbagliata per qualcosa che va ragionato ogni volta.
  Resta gestibile come nota libera.
  Poi Fabrizio ha corretto SEI voci: magnesio+potassio (non solo la sera —
  anche post-allenamento, dopo sudorazione, nella stanchezza); magnesio da solo
  (due usi distinti: mattina energizzante, sera per il sonno); multivitaminico
  (mai a stomaco vuoto); probiotico (NON a stomaco vuoto come avevo scritto —
  durante i pasti); creatina (dopo il pasto più ricco di carboidrati); BCAA
  (1 g ogni 10 kg, metà prima e metà dopo l'allenamento). Le restanti 16
  approvate. Contenuto clinico: non si tocca senza passare da lui.

TRE CONSEGUENZE STRUTTURALI di quelle correzioni, non testuali:
(a) la creatina introduce una SECONDA regola automatica, 'pasto_piu_carbo',
identica per forma a quella dei grassi — `regolaOrario` diventa una famiglia, e
la funzione va scritta generica da subito invece di duplicarla poi;
(b) i BCAA rendono la DOSE dipendente dal paziente: non più una stringa fissa
ma una forma calcolata sul peso;
(c) il magnesio mostra che `quando` può avere PIÙ alternative legittime —
comprimerle in una frase perde l'informazione clinica che le rende utili.

LA DOMANDA CHE NON ANDAVA POSTA — la lezione più importante della giornata.
Il disegno prevedeva che il sistema scegliesse UN pasto per l'intero piano, e
da lì nasceva il problema di cosa fare quando il pasto più grasso cambia da un
giorno all'altro. È stata posta a Fabrizio come scelta fra due soglie (80% o
maggioranza), lui ha risposto, la decisione è stata discussa e committata — e
poche ore dopo, chiarendo, ha detto che intendeva l'assegnazione GIORNO PER
GIORNO. Con quella lettura il problema della soglia non si risolve: NON ESISTE.
La domanda nasceva da un errore di comprensione del requisito, e averla
presentata con due opzioni ben argomentate l'ha fatta sembrare legittima.
**Prima di far scegliere fra due varianti di una regola, va verificato che la
REGOLA sia quella che l'utente ha in testa** — altrimenti si raffina con
precisione la risposta sbagliata. Stessa famiglia della regola 16: il lavoro
apparente nasconde che il presupposto non è stato controllato.

IL CATALOGO È UN DEFAULT SCAVALCABILE. Parole di Fabrizio: i consigli sono
scritti e visibili, ma ogni nutrizionista sceglie se applicarli o cambiarli.
Vale anche per il pasto calcolato, che si presenta compilato ma modificabile e
non viene risovrascritto. Questo abbassa il rischio delle bozze ma NON
sostituisce la revisione clinica: un default sbagliato che nessuno corregge
finisce comunque nel PDF del paziente — è il modo in cui sarebbero passati i
valori FODMAP sbagliati (regola 14).

5 AGOSTO 2026 (1/4) — AUDIT AL CONTRARIO: DAL CODICE AI DOCUMENTI.
Baseline b413f08. Sette segnalazioni, sei chiuse in giornata.

IL METODO, opposto a quello delle passate precedenti: invece di partire dai
documenti e cercarne il riscontro nel codice, si parte dalle funzioni che
esistono e si cercano quelle di cui nessun documento parla. 877 funzioni
top-level, filtro meccanico per assenza di menzione nei quattro file di
verità → 401 candidati, esaminati da nove agenti in parallelo, poi
riverificati uno per uno nel codice. Sette segnalazioni reali.

1. `selCatAl` — CORRETTA. Il pulsante "Tutti" di una categoria sovrascriveva
il colore del semaforo senza registrare quello di origine, e riportando il
ciclo a "nessun colore" lo azzerava del tutto: un alimento segnalato
automaticamente come celeste o grigio scuro perdeva la segnalazione in
silenzio. Decisione di Fabrizio: «"tutti" si deve comportare come "singolo" —
il nutrizionista può scegliere, ma deve restare visibile che quell'alimento
era celeste o grigio scuro». Corretto registrando l'origine in
`_alOrigineAuto` e ripristinandola a fine ciclo, con un marcatore ✏️ che
distingue lo scavalcamento manuale dalla segnalazione ancora automatica.

2. `suggerisciPastoEQuando` — SPIEGATA, non corretta. Indovina il pasto dal
testo e lo SALVA subito, prima che il nutrizionista lo veda; la tendina che
compare dopo è modificabile ma non segnala che il valore è una supposizione.
Nessun intervento: è diventata la premessa di P148.

3. Badge `75/20/5` — RINOMINATO in `70/25/10`. I nomi non corrispondevano più
alle soglie applicate dal codice. Fabrizio ha chiesto perché 70+25+10 faccia
105: perché non sono una ripartizione, sono tre limiti indipendenti di minimo
e massimo — spiegazione ora scritta in un commento sopra la funzione, non solo
detta a voce.

4. Ricette di sistema — ORA ELIMINABILI DAVVERO. `delRic` toglieva la riga e
diceva "eliminata", ma `pullRicetteSupabase` ricostruiva sempre le 6 ricette
di sistema: al sync successivo tornavano. Fabrizio: «voglio che tutte le
ricette siano uguali e tutte cancellabili — non lo farò io, ma un nutrizionista
che ha la sua versione dev'essere libero». Registro `_ricetteEliminate`
sincronizzato sul meta-record generico, distinto dai tombstone dei pazienti
(quelli hanno TTL e cascata, qui non servono).

5. Modulo B3 (validazione input numerici, 26 campi) — DOCUMENTATO nel Contesto:
esisteva e nessun documento lo nominava.

6. `applicaPatch` — RIMOSSA. Zero chiamanti, confermato con grep.

7. `ascoltaProgresso` — annotata come P43b, da valutare senza fretta.

DUE LEZIONI. (a) I documenti di progetto Claude sono fotografie datate: prima
di implementare qualunque cosa descritta lì dentro va cercato nel CODICE se
esiste già. (b) `ORFANI_NOTI` è un elenco di deroghe, non di assoluzioni: per
ogni voce la domanda non è "è censita?" ma "cosa smette di funzionare quando
l'elemento non c'è?" — un orfano dentro una guardia che fa `return` è un pezzo
di programma spento in silenzio.

4 AGOSTO 2026 — P35 RISCRITTA: IL PESO CASALINGO E' UNO STRUMENTO SEPARATO.
Baseline d4d5a67. Nessuna riga di codice toccata: solo la scheda di roadmap.

DA DOVE NASCE. Fabrizio apre la scheda InBody di un paziente, vede la card "Peso
casalingo" e chiede cos'e'. Da li' detta il disegno vero della voce, che non era
quello scritto in roadmap.

IL DISEGNO. Il peso casalingo non e' un secondo peso: e' un secondo STRUMENTO, con
tre mestieri suoi. (1) I pazienti lontani — Fabrizio ne segue in Svizzera e negli
Stati Uniti, per loro un controllo con la bilancia dello studio e' impossibile e il
peso casalingo e' l'unico monitoraggio disponibile. (2) L'aggancio alla futura app
del paziente: e' il dato che il paziente potra' inserire da solo, proprio perche' non
tocca nulla di clinico. (3) Il paziente molto attento che ha bisogno di riferire il
peso ogni giorno o ogni settimana. La regola che governa tutto: dall'InBody nascono i
grafici e i numeri clinici, il peso casalingo vive in una serie sua con un suo
grafico, e NON SI FONDONO MAI.

IL DIFETTO CHE E' VENUTO FUORI CERCANDO DI DESCRIVERLO. Oggi si fondono, e in
silenzio. `_serieePesoOss` unisce p.inbody[] e p.pesiIntermedi[], e quella serie
alimenta tre punti clinici: il valore attuale di un traguardo di peso (prende
l'ULTIMO della serie, quindi se l'ultima registrazione e' casalinga il traguardo
viene valutato sulla bilancia del paziente), il punto di partenza della proiezione
del percorso, e calcolaTDEEOsservato. Se la bilancia di casa legge sistematicamente
1,2 kg in piu', quel 1,2 entra come se fosse grasso preso in tutti e tre. E' la
famiglia di P118 e P120 — due fonti per lo stesso dato che non si dichiarano.

NON e' invece un problema il confronto FRA due pesate casalinghe: stessa bilancia,
l'errore sistematico si annulla nella differenza. E' il confronto casa-studio a
essere inquinato, non il trend di casa. La distinzione decide tutto il disegno.

IL COMPROMESSO, RISOLTO FUORI DAL SOFTWARE. Separando le serie il TDEE osservato
resta con molti meno dati, perche' gli InBody sono rari. Decisione di Fabrizio: non
si risolve in codice, e' un argomento clinico e commerciale — un motivo in piu' per
proporre al paziente una misurazione con la bilancia professionale ogni due o tre
settimane, meglio per la qualita' del dato e con un ritorno economico maggiore.

LE TAPPE. (1) Separare le serie — e' anche una correzione di difetto, quindi la
priorita' della voce sale da Bassa a Media. (2) Il grafico dell'andamento casalingo,
quello che Fabrizio vuole di sicuro: punti grezzi sottili piu' MEDIA MOBILE A 7
GIORNI in evidenza, perche' il peso di un singolo giorno e' rumore e mostrarli
insieme insegna al paziente fissato che il +0,8 kg di stamattina non e' grasso.
(3) Velocita' calcolata sulla media mobile, con la fascia di ritmo gia' in casa
(_ibFasciaRitmo, P132) e la stessa disciplina: si colora solo il lato pericoloso.
(4) Striscia di aderenza al monitoraggio — per il paziente lontano dice a colpo
d'occhio, prima di una videochiamata, se il dato e' denso o pieno di buchi.
(5) Confronto casa-studio a bassa priorita' e solo disegnando le due serie sullo
stesso asse SENZA fonderle: lo scarto verticale fra le linee E' l'offset, si vede a
occhio e non produce nessun numero derivato.

SUPERATO IL VECCHIO PIANO. La scheda proponeva di calcolare e salvare
`offsetBilancia` per normalizzare i pesi di casa su quelli di studio. Non si fa piu':
le due serie non si normalizzano perche' non si confrontano. Segnato come nota
storica dentro la scheda, non cancellato.

UNA COSA CHE VALE PER TUTTO IL PROGETTO, detta da Fabrizio nella stessa sessione: nei
primi tempi qualche modifica puo' non essere finita nel CHANGELOG. Se e' successo,
allora nell'app ci sono funzioni che nessun documento nomina — ed e' esattamente
quello che l'audit ha trovato. Vale la pena, un giorno, una passata AL CONTRARIO:
partire dalle funzioni che esistono nel codice e cercare quelle di cui nessun
documento parla. Il peso casalingo e' il primo caso trovato per caso.

4 AGOSTO 2026 — AUDIT BLOCCHI B e C: 28 CORREZIONI ALLE DUE FONTI DI VERITA'.
Baseline c9fffac. Nessuna riga di codice toccata: solo Roadmap_v4 e Contesto_v18.

IL BLOCCO B — dieci voci di roadmap che avrebbero fatto rifare lavoro gia' fatto.
La piu' grave: **P61**, il validatore clinico che blocca allergeni e alimenti vietati
nei piani, era marcato "Da fare · Priorita' Alta (CRITICA)" ed e' chiuso dal 7 luglio
(commit ed1e3e9, validaPiano + validaGateExport + 14 test). Il file si contraddiceva
da solo: a riga 78 la elencava gia' fra le chiuse. Poi **P4** (girovita e WHtR
"DA NON PERDERE", esistono da fine giugno — rifarli avrebbe creato un SECONDO campo
girovita divergente dal primo), **P37** (titolo "ESCLUSO 14 luglio", scheda "Da fare"),
**P122** (titolo "tappe 2-5 aperte", corpo "COMPLETA"), **P124b** (collaudo "DA FARE"
due righe sotto due "SUPERATO"), **P73** e **P66c** (chiuse ma ancora nella tabella di
pianificazione), **P65** (scan dei 460 commit gia' fatto il 13 luglio).

DUE VOCI ERANO PARZIALI, E QUELLO E' IL CASO PIU' DELICATO. Marcarle CHIUSA sarebbe
stato l'errore peggiore di quello che stavamo correggendo — dichiarare fatto cio' che
non c'e' e' un buco che nessuno sorveglia. **P40 passi:** il campo esiste e DECIDE GIA'
LE CALORIE (entra nella curva NEAT di calcolaTDEE); manca lo storico nel tempo, quindi
un numero dichiarato a gennaio calcola le kcal ad agosto senza che nulla dica che e'
vecchio. **P35 peso casalingo:** la card e' in produzione, ma `offsetBilancia` non
esiste (0 occorrenze) — il delta mostrato e' sul kg grezzo, quindi **puo' essere in
parte differenza fra la bilancia di casa e quella dello studio, non variazione del
paziente**. Entrambe riscritte come PARZIALI con dentro cosa c'e' e cosa manca.

I TRE DIFETTI STRUTTURALI DELLA ROADMAP. (D1) Il file dichiarava "non contiene piu'
riepiloghi di stato duplicati" e subito sotto aveva una tabella di ~50 righe che di
fatto lo era — ed e' da li' che sono nate le divergenze su P61 e P73. La tabella serve
(dice quale modello usare), quindi resta, ma ora dichiara in testa di NON essere una
fonte di stato. (D2) "Ultimo allineamento 18 lug" aggiornato al 4 agosto **dichiarando
che e' PARZIALE**: riverificate solo le undici voci di questa passata, il resto del
file resta al 18 luglio. Una data di verifica che copre piu' di quanto e' stato
verificato e' esattamente il difetto che stiamo togliendo. (D3) La sigla **F5** era
usata per due difetti diversi: la seconda serie diventa `F5-salvaPaz`.

IL BLOCCO C — diciassette correzioni al Contesto, che dichiara di descrivere il
presente. La piu' importante: **eliminaPaz**. Il file diceva che cancellando un
paziente piani ed entrate NON vengono rimossi e restano nelle tabelle. E' il contrario:
la cancellazione e' a cascata su db.piani, db.entrate, db.eventi, e parte anche su
Supabase — **le entrate contabili spariscono dal cloud e non sono piu' recuperabili da
nessun dispositivo**. Un errore su cosa si perde cancellando e' il tipo di errore che
si scopre quando e' tardi.

Le altre: peso casalingo dato per "scartato, nessuna interfaccia" quando la card c'e';
`PORZIONI_DISCRETE` che non esiste piu' da P121 (sostituita da `_PESI_UNITARI`, 14
voci, fetta biscottata 10 g e non 6, latticini a multipli di 5 g); grafici InBody dati
per "visibili solo con ≥2 misurazioni" quando da P145 quattro si disegnano con un solo
referto; soglia degli avvisi "14 giorni" che non esiste (arancione oltre 30, rosso oltre
45); catalogo MET 97 → **117**; alias MET 28 → **18** (con la verifica esplicita che
nessuno e' rotto, cosi' il numero corretto non allarma); indici clinici 18 → **22**
(mancavano LDL stimato, calcio corretto, albumina/globuline, indice androgeni); slider
regime "−40/+20" → **−40/+25**, e **−75%** in chetogenica; token dell'analisi AI 1400 →
**2000**; modelli di rotazione cercati nella tabella sbagliata; `inizioPiano` che non
esiste (e' `inizioAlim`); i nomi di `fonteOre`; il filtro "Fast" dato per fatto quando
`tempoPrep` non filtra nulla; l'etichetta SSN dichiarata sul foglio richiesta e mai
stampata; le scadenze "✓ Gestito" date per fuori backup quando P144 le ha spostate sul
paziente.

DUE SEGNALAZIONI NON CONFERMATE, E NON CORRETTE. Il "piano fino a 31 giorni" non esiste
nel Contesto: diceva gia' 1-14, coerente col codice. E la tabella della cena libera
riportava gia' 1100 per la pizza condita. Una segnalazione che non regge alla verifica
non si corregge lo stesso per chiudere la riga: si scarta e si dice perche'.

522 test verdi, invariati: nessuna riga di codice e' stata toccata.

4 AGOSTO 2026 — A6 CHIUSA: IL FOGLIETTO AL PAZIENTE PARLA LA STESSA LINGUA DEL MOTORE.
Baseline e22a714.

Ultimo pezzo dell'audit. Ripristinata la regola (voce qui sotto), restava il testo:
il concetto "I grassi buoni" dichiarava di andare a pari CALORIE e riportava numeri
scritti a mano che non tornavano con nessuna delle due regole — avocado 40 g contro i
45 del motore, lino 15 contro 25, olive nere 30 contro 40.

COSA CAMBIA NEL TESTO CHE LEGGE IL PAZIENTE.
(a) La premessa: da "circa le stesse calorie di 10g di Olio EVO" a "la stessa quantita'
    di GRASSI". Era falsa anche prima: 20 g di noci sono 130 kcal, non 90.
(b) Le sei grammature, prese dal motore: avocado 45, frutta secca mista 20 (l'unica che
    gia' tornava), lino 25, olive verdi 65, olive nere 40, burri 20.
(c) La chiusa: "mantenendo lo stesso spazio calorico" diventa "lo stesso apporto di
    GRASSI", piu' una precisazione che prima non c'era — a parita' di grassi queste
    alternative costano da +4 kcal (olive verdi) a +44 (lino), perche' a differenza
    dell'olio portano anche fibra e proteine. Su una sostituzione ogni tanto non cambia
    nulla; a chi alterna ogni giorno va detto.
(d) I semi di chia escono dall'elenco ma NON spariscono in silenzio: sono citati poco
    sotto come fonte di omega-3, e un paziente che li cercasse fra le alternative
    troverebbe un buco. Un paragrafo nuovo spiega che di grasso ne hanno circa un terzo
    (il lino quasi la meta'), che per pareggiare un cucchiaio d'olio ne servirebbero
    oltre 30 g, e che vanno usati come AGGIUNTA e non al posto della cella grasso.
    Un'assenza spiegata insegna qualcosa; un'assenza muta sembra una dimenticanza.

IL TEST CHE LEGA TESTO E MOTORE. Il difetto non nasceva da un numero sbagliato ma dal
fatto che due cose che devono coincidere vivevano separate: un testo scritto a mano e
un motore che calcola. Ora un test confronta le grammature del CONCETTO con quelle
calcolate: fallisce sia se qualcuno cambia il criterio senza riscrivere il foglietto,
sia se aggiorna il foglietto senza guardare il motore. Piu' due controlli: la premessa
deve dichiarare la regola giusta (e la vecchia frase "stesse calorie" non deve tornare),
e la chia non deve rientrare nell'elenco senza che la sua assenza resti spiegata.
522 test verdi.

CON QUESTA L'AUDIT DI COERENZA CHIUDE IL BLOCCO A: sei difetti trovati confrontando
documentazione e codice, sei chiusi. Restano il blocco B (dieci voci di roadmap che
farebbero rifare lavoro gia' fatto) e il blocco C (diciotto punti in cui il Contesto
descrive male il programma), elencati in NutriGest_Audit_Coerenza.md.

4 AGOSTO 2026 — A6 RIMESSA A POSTO: L'OBIEZIONE ERA SU UN ALIMENTO, NON SULLA REGOLA.
Baseline 1e47cb1.

L'ERRORE. Nella voce qui sotto il criterio del gruppo grassi era stato cambiato da
'grassi' a 'kcal', rovesciando P121. La motivazione riportata era una decisione di
Fabrizio. Non lo era: Fabrizio aveva detto che 35 g di semi di chia sono una porzione
spropositata. E' un'obiezione su UN VALORE, non un mandato a cambiare la regola che lo
produce — e la differenza non e' sottile, perche' il criterio governa TUTTE le
alternative ai grassi di TUTTI i piani nuovi.

Sue parole, il giorno stesso: "ti ho detto di lasciare 20 gr di chia non perche' voglio
ricambiare le regole, assolutamente no... e poi non metterei mai come alternativa nello
specifico i semi di chia al posto dell'olio, ma solo per i semi di chia; invece lo farei
tranquillamente con tutti gli altri semi".

RIPRISTINATO. olio e grasso tornano a criterio 'grassi'. Avocado 45 g, frutta secca
mista 20 g, lino 25 g, olive verdi 65 g, olive nere 40 g, burri 20 g.

LA CORREZIONE GIUSTA ERA UN'ALTRA: la chia esce da _ALT_GRASSI_PROMPT, cioe' dalle
alternative proposte per la cella dell'olio (nel piano e nella riga che va all'AI). Ha
solo il 31% di grassi — contro il 42% del lino — quindi QUALUNQUE equivalenza sui
lipidi la fa esplodere: e' l'alimento a essere fuori posto in quell'elenco, non il
modo di calcolarlo. Resta nel database e nei piani, semplicemente non viene proposta
al posto dell'olio.

TEST. Ripristinato quello sul criterio 'grassi' (Avocado 45 g) con dentro la storia del
rovesciamento e del ripristino, perche' e' il posto dove si guarda se un domani venisse
di nuovo la tentazione. Due nuovi: la chia non deve comparire ne' nell'elenco ne' nella
riga per l'AI; e — il controllo che avrebbe fermato il caso prima che arrivasse al
paziente — NESSUNA alternativa proposta puo' valere piu' del doppio delle calorie del
cucchiaio d'olio di riferimento. Se domani si aggiunge all'elenco un alimento poco
grasso e molto calorico, il test lo blocca. 519 verdi.

RESTA APERTO. Con il criterio 'grassi' ripristinato, il foglietto "I grassi buoni"
torna a divergere dal motore: dichiara di andare a pari CALORIE e riporta avocado 40 g,
lino 15 g, olive nere 30 g, mentre il motore calcola 45, 25 e 40. E' la stessa
divergenza che l'audit aveva segnalato come A6. Va chiusa allineando il TESTO al
motore — decisione di Fabrizio ancora da prendere, perche' cambia le porzioni che legge
il paziente. Nel frattempo la riga della chia nel foglietto resta, e ora nessun piano
la propone.

4 AGOSTO 2026 — AUDIT A4/A5/A6: LE TRE CONTRADDIZIONI CLINICHE.
Baseline d4b3f92.

Le tre che l'audit non poteva chiudere da solo, perche' la domanda non era tecnica ma
"quale valore e' quello giusto". Decise da Fabrizio.

A4 — NON ERANO DUE SOGLIE DIVERSE: ERA LA SCALA MASCHILE A NON SEGUIRE L'OMS.
Verificata la fonte (WHO, Waist Circumference and Waist-Hip Ratio: Report of a WHO
Expert Consultation 2008, pubbl. 2011): obesita' centrale da 0,90 nell'uomo e 0,85
nella donna. La banda del grafico InBody usava gia' quelle due. Il semaforo della
scheda Analisi per le donne pure — rosso sopra 0,85, giallo nei cinque centesimi
sotto. Quello maschile invece dava verde fino a 0,90 e rosso solo sopra 1,00: un uomo
a 0,95, per l'OMS gia' in obesita' centrale, compariva GIALLO. Allineato alla stessa
regola: verde fino a 0,85, giallo 0,85-0,90, rosso sopra 0,90. Il caso della donna a
0,83 non era invece un errore: la banda dice "sotto la soglia OMS" (vero) e il
semaforo "sopra l'ottimale" (vero).

A5 — IL TOTALE DA SOLO NON DECIDE. C'era una soglia secca a 190: un 195 risultava
"sopra desiderabile" nell'interpretazione e "dentro il riferimento" nella tabella di
laboratorio, che si ferma a 200. I due numeri NON sono in contraddizione — 200 e'
l'intervallo del laboratorio, quello stampato sul referto che il paziente ha in mano;
190 e' il target prudenziale ESC/EAS. Cambiarne uno avrebbe perso un'informazione
vera. Decisione di Fabrizio: il colesterolo totale non e' un buon predittore da solo,
persone con lo stesso totale hanno rischi molto diversi; la fascia 190-200 si
evidenzia SOLO se HDL o LDL non sono ottimali. Implementato: sotto 190 desiderabile,
sopra 200 sopra il riferimento, in mezzo si guardano HDL (soglia per sesso, 40 M /
50 F) e LDL (116, target rischio basso ESC/EAS 2019). Se HDL e LDL mancano si dice
che mancano, invece di inventare un giudizio.

A6 — LE ALTERNATIVE AI GRASSI PASSANO A PARI KCAL, E QUESTO ROVESCIA P121.
Il foglietto "I grassi buoni" dichiara di andare a pari calorie; il motore pareggiava
i GRASSI. Nello stesso PDF il piano scriveva 33 g di semi di chia e il foglietto ne
consigliava 20. Ricalcolato tutto: la chia e' il caso limite perche' di grasso ne ha
il 31%, quindi a pari grassi servono 33 g che valgono 158 kcal invece di 90 — quasi
il doppio. Fabrizio: "35 grammi di semi di chia sono eccessivi, lascia 20".

Il rovesciamento va detto per intero, perche' la scelta del 25 luglio era motivata:
l'olio e' 100% lipidi, e sulle kcal entrano anche carboidrati e proteine
dell'alternativa. Vero — ma vale anche al contrario e pesa di piu': semi e frutta
secca NON sono grasso puro, quindi pareggiare i grassi porta dentro le calorie di
fibra e proteine senza contarle. Il compromesso accettato: sul singolo pasto il
target dei GRASSI resta un po' sotto quando si sostituisce con semi o frutta secca.
Si e' scelto di sbagliare sul macro invece che sull'energia.

L'esito e' che motore e testo al paziente ora coincidono: avocado 40 g, chia 20 g,
lino 15 g, olive verdi 60 g, olive nere 30 g, burro di arachidi 15 g — esattamente i
numeri che il foglietto porta da sempre. Unico residuo: il foglietto dice "frutta
secca mista 20 g" mentre il motore calcola 13-15 g (noci 13, mandorle 15).

DUE TEST CHE CONGELAVANO LA DECISIONE VECCHIA. s2-grammature-alternative aveva
"P121 olio e grassi — equivalenza sui GRASSI, non piu' sulle kcal" e il controllo
"Avocado 45g" nella riga del prompt AI. Riscritti sulla decisione nuova, con dentro
il perche' del rovesciamento: se un domani si tornasse indietro, il posto da guardare
e' il test, non il codice. Aggiunto un test che confronta il motore col TESTO del
concetto "I grassi buoni": fallisce se qualcuno cambia il criterio senza riscrivere
il foglietto al paziente — che e' esattamente il modo in cui i due sono divergiti.

TEST. Sette nuovi in s2-audit-a123 (soglie OMS per entrambi i sessi, fascia gialla
simmetrica, banda del grafico allineata al semaforo, colesterolo nelle cinque
combinazioni HDL/LDL comprese quelle mancanti) e tre in s2-grammature-alternative.
519 test verdi.

4 AGOSTO 2026 — AUDIT A1/A2/A3: TRE DIFETTI TROVATI CONFRONTANDO I DOCUMENTI.
Baseline 0f9fd36.

DA DOVE NASCONO. Non da un collaudo: dall'audit di coerenza fra documentazione e
codice. In tutti e tre i casi il documento diceva una cosa e il codice un'altra, e
aveva torto il CODICE. Nessuno dei tre era visibile usando il programma.

A1 — IL COUS COUS ERA SCHEDATO FRA I CEREALI SENZA GLUTINE. Stava in 'Cereali senza
Glutine' con gl:false, quindi l'interfaccia gli stampava accanto l'etichetta [SG].
Il cous cous e' semola di grano duro. La rete di sicurezza teneva — 'cous cous' e
'couscous' sono nella lista allergeni Glutine/Celiachia, quindi su un paziente
segnalato come celiaco validaPiano bloccava comunque — ma la scritta letta dal
nutrizionista e dal paziente era falsa. Spostato fra i cereali CON glutine, gl:true.
La roadmap (P130) lo liquidava come "nota cosmetica, non un bug": non lo era.
Nessun dato paziente toccato: p.alimenti e' indicizzato per NOME, non per categoria.

A2 — UN COMMENTO A FINE RIGA AVEVA SPENTO L'ORDINAMENTO ALFABETICO. In
_pickPaziente: `.filter(...) // P142.slice().sort(...)`. Tutto quello che segue un
`//` e' spento, e a schermo non si vede nulla di strano: la tendina "Applica
template a..." elencava i pazienti in ordine di creazione. Ripristinato, col
commento su una riga sua.

A3 — LE 1100 KCAL DELLA PIZZA CONDITA NON ERANO RAGGIUNGIBILI. getKcalWeekend e
_kcalScelta cercavano "la prima chiave che combacia", e 'Pizza con condimenti'
incontra 'Pizza' prima di se' stessa: tornava sempre 900. Ogni sabato con la pizza
condita il conto settimanale perdeva 200 kcal in silenzio. Ora vince la chiave PIU'
LUNGA fra quelle che combaciano, cioe' la piu' specifica — regola che tiene anche
per le voci che si aggiungeranno in futuro, senza dover badare all'ordine della
tabella. Le due funzioni ora condividono lo stesso match: prima erano due copie
della stessa logica, ed e' cosi' che il piano e il diario possono divergere.

IL TEST CHE PROTEGGEVA IL DIFETTO. Applicando A2 e' fallito il test 232 di
s2-paziente-prenotato: verificava la riga di sorgente parola per parola, COMMENTO
COMPRESO (`...'prenotato';}) // P142`). Cioe' congelava la riga difettosa e avrebbe
segnalato come rottura qualunque correzione. Riscritto sul COMPORTAMENTO: che nel
blocco di _pickPaziente ci sia il filtro, senza pretendere una forma esatta.
Lezione generale: un test che confronta testo di sorgente invece di comportamento
non protegge il programma, protegge il difetto.

TEST. Nuovo file s2-audit-a123: il cous cous sta fra i cereali con glutine ed e'
gl:true; nessun derivato del grano e' rimasto fra i senza glutine; le due grafie
restano nella lista allergeni; la pizza condita vale 1100 e la pizza semplice 900;
piano e diario danno lo stesso numero; e — il test che avrebbe trovato il difetto —
OGNI voce di KCAL_WEEKEND deve restituire il proprio valore, cosi' una chiave che
ne intercetta un'altra viene scoperta subito. Piu' un controllo che vieta a
qualunque `.sort(` di finire dentro un commento a fine riga in quel blocco.
510 test verdi.

4 AGOSTO 2026 — P147e: VIA "RICALCOLA LAF", IL PANNELLO ANCORA IL REGIME DA SE'.
Baseline bc79ada.

DA DOVE NASCE. Fabrizio, dopo tre giri di domande sullo stesso tasto: "non capisco,
quel foglietto non lo scrive quando premo salva TDEE?". Aveva ragione, e la
spiegazione data prima era incompleta. Il valore window._tdeeRegime — che TUTTO il
resto del programma legge (slider del regime, preset keto, ritaratura, uscita dalla
chetogenica, calcolaMacros) — veniva scritto in TRE momenti: apertura della scheda,
"Ricalcola LAF", salvataggio.

QUINDI A COSA SERVIVA IL TASTO. A un lavoro solo: riscrivere quel valore SENZA
salvare. Serviva perche' fra l'apertura e il salvataggio si poteva cambiare
l'allenamento, vedere il TDEE muoversi nel pannello (automatico da P147c) e poi
impostare un deficit del 16% calcolato sul TDEE VECCHIO. Il tasto era il rimedio
manuale a un disallineamento che non doveva esistere.

LA CORREZIONE. _aggiornaPannelloTdeeLive scrive anche window._tdeeRegime e
window._mbRegime, e ri-ancora lo slider mantenendo la percentuale scelta: se il TDEE
sale, il −16% resta −16% e le kcal seguono. Il valore assoluto non si tocca mai da
li': quello lo decide l'utente. Cosi' l'unico lavoro rimasto al tasto sparisce, e il
tasto con lui. Resta un solo pulsante nella scheda: "Salva dati TDEE".

RIMOSSA ANCHE LA FUNZIONE, non solo il pulsante. Una `ricalcolaLAF()` orfana sarebbe
sembrata una strada praticabile a chi legge il codice fra sei mesi. Al suo posto un
commento che dice cosa faceva e dove sono finiti i suoi tre lavori. Nota: uno dei
tre — riversare i campi del form sul paziente in memoria — NON e' stato spostato
nell'aggiornamento dal vivo. E' una scrittura, e le scritture restano un gesto
esplicito: "Salva dati TDEE".

TRE AVVISI RISCRITTI. "TDEE non disponibile — clicca prima Ricalcola LAF" mandava
l'utente a premere un tasto che non esiste piu'. Ora dicono la causa vera: serve il
metabolismo basale da un referto InBody.

TEST. Tre nuovi in s2-laf-pannello-vivo: il valore ancorato deve coincidere con
quello scritto nel pannello (se divergono siamo punto e daccapo); cambiare
allenamento lo sposta subito senza premere niente; e un test che vieta il ritorno
del tasto — funzione assente, nessun onclick, nessun avviso che lo citi. 502 verdi.

4 AGOSTO 2026 — AUDIT DEI DOCUMENTI DI PROGETTO: 10 TRAPPOLE SU 20.
Baseline 033ca88.

DA DOVE NASCE. Fabrizio chiede perche' negli ultimi giorni nascano tanti file e se
sia un bene o un problema nel lungo periodo. Domanda giusta al momento giusto:
nella cartella nutrigest non era stato aggiunto nulla (solo i 4 file del repo,
aggiornati), ma i documenti del progetto Claude erano saliti a venti.

COSA E' VENUTO FUORI. Riletti tutti e venti incrociandoli col CHANGELOG e col
codice: DIECI contengono frasi che, lette oggi, farebbero credere che qualcosa sia
ancora da fare quando e' gia' in produzione. Non e' il caso limite del 30 luglio:
e' meta' della biblioteca.

I TRE CASI CHE NON SONO SOLO "DOCUMENTAZIONE VECCHIA":
- Grafici_Decisioni_Aperte dice "da qui in poi e' tutto ancora da implementare" e
  propone i pulsanti di periodo. Quei pulsanti sono stati fatti il 29 luglio e
  RIMOSSI lo stesso giorno perche' a Fabrizio non piacevano. Chi legge quel file e
  li rifa' non ripete un lavoro: DISFA una decisione presa guardando la funzione in uso.
- Grammature_Analisi propone la banda di plausibilita' e la guardia al 25%, due
  cose RESPINTE: implementarle rimetterebbe in circolo i troncamenti silenziosi che
  P121 aveva eliminato. Danno clinico, non estetico.
- FODMAP_Verifica_Perplexity contiene tabelle di porzioni marcate "confermate" che
  vengono da fonti secondarie, non dall'app Monash. P130 le rimette tutte in
  verifica. Un valore di quel file copiato in un PDF consegnato al paziente e' la
  regola 14 violata alla lettera.

IL PEGGIO ERA ALTROVE. La copia di CLAUDE.md dentro il progetto era ferma al 25
luglio: senza le lezioni del 30 luglio, senza le regole 12-22, senza la regola su
cmd.exe, e con scritto "Autenticazione: nessuna (app personale)" mentre il login
vero esiste dal 31 luglio. Due versioni divergenti delle REGOLE OPERATIVE — cioe'
il file che decide come lavorano tutte le sessioni. Riallineata al repo.

PERCHE' LA CORREZIONE STA IN CLAUDE.MD E NON DENTRO I DIECI DOCUMENTI. Mettere
un'intestazione di stato in ognuno sarebbe stato piu' ordinato ma meno efficace:
un documento lo si legge solo se lo si apre, mentre CLAUDE.md e' caricato SEMPRE,
all'inizio di ogni sessione, prima di qualunque scelta. La tabella di stato dei
venti documenti sta li'; una copia sta nel progetto come _STATO_DOCUMENTI.md,
perche' e' dentro claude.ai che quei file si aprono per primi.

REGOLA 23. (a) Ogni documento nuovo nasce con intestazione di stato: data, commit,
cosa e' gia' fatto, cosa resta aperto. (b) Non si crea un documento se il contenuto
sta gia' nel CHANGELOG — la domanda e' "serve fra tre mesi E non entra nel
CHANGELOG?", e servono due si'. (c) Quando una voce si chiude, il documento che
l'ha progettata si marca NELLO STESSO GIRO di consegna: un minuto contro una
sessione rifatta. (d) La data di verifica si sposta solo se la verifica c'e' stata
davvero — e' lo stesso difetto dell'intestazione di INDEX.md che dichiarava un
riallineo mai avvenuto.

DUE CONTRADDIZIONI TROVATE DENTRO LA FONTE DI VERITA'. In Roadmap_v4 il titolo
della scheda P122 dice "Tappa 1 chiusa, tappe 2-5 aperte" e trentotto righe piu'
sotto lo stesso file dice "P122 COMPLETA"; e P124b risulta "COLLAUDO DA FARE"
mentre il CHANGELOG lo da' superato dal 26 luglio. Un file che si contraddice da
solo e' peggio di due file che si contraddicono fra loro: chi legge non ha modo di
accorgersene. Annotate in CLAUDE.md, da correggere quando si tocca quella zona.

CORRETTA ANCHE UNA DATA MIA: la voce P147d qui sotto diceva 3 agosto, ma il commit
033ca88 e' del 4 agosto alle 13:47 UTC. Segnalato da Fabrizio, che da tre giorni e'
a New York col PC rimasto su ora di Roma. Nota utile per il futuro: con quel
disallineamento, dalle 18:00 di New York in poi il PC e' gia' al giorno dopo, e
tutto cio' che l'app data da sola (prima visita, inizio percorso, creazione
paziente, data del referto precompilata) prende la data di domani.

4 AGOSTO 2026 — P147d: LO STORICO SALVAVA IL RISULTATO, NON IL MOTIVO.
Baseline d803f72.

DA DOVE NASCE. Fabrizio, collaudando il pannello dal vivo: "il tasto salva
esiste, lo so, ma salva solo i valori finali e non tutta la storia del paziente".
L'esempio suo: un paziente che corre 2 volte e fa pesi 2 volte, salvato; poi
cambia e fa calcio 2 volte e Pilates 2 volte, salvato. Tornando sul primo
salvataggio le attivita' non tornano quelle di allora — restano le ultime.

IL PUNTO. macrosStorico teneva kcal, macro, TDEE, LAF, regime, timestamp: cioe'
il RISULTATO. Due slot con TDEE diversi non dicevano PERCHE' fossero diversi, e
il perche' e' l'unica cosa che serve per decidere il ciclo successivo. Uno
storico che dice quanto mangiava il paziente ma non cosa faceva e' meta' dato.

UNO O DUE TASTI DI SALVATAGGIO? Domanda esplicita di Fabrizio. Risposta: UNO. Il
LAF non e' una cosa separata da salvare, e' DERIVATO dagli stessi campi (passi,
lavoro, attivita'): due tasti significherebbero salvare lo stesso dato due volte
sotto due nomi, e soprattutto due momenti diversi in cui scattare la foto —
quindi slot in cui le attivita' dicono una cosa e le kcal un'altra. E' la stessa
classe di difetto appena chiusa con P147c (un numero visibile che contraddice i
campi visibili). Non serviva un secondo tasto: serviva che il tasto esistente
fotografasse tutto.

COSA ENTRA NELLO SLOT. passi, fonte passi, tipo di lavoro, modalita', righe
complete (nome + MET CONGELATO + sedute + minuti), ore/tipo/intensita' se in
stima rapida, NEAT, EAT, MET medio, sedute totali, ore effettive, giorni di
carico. Il MET congelato e' voluto: se domani una voce di catalogo cambia valore
(e' appena successo con la pallamano) lo slot deve restare la foto di quel
giorno, non seguire il catalogo di oggi.

COME SI LEGGE. Una riga sola sotto ogni slot: "5.000 passi · lavoro in piedi ·
3× Corsa 8 km/h · 1× Circuit training · carico: Lun Mar Gio Ven". Deve stare su
una riga: se diventa un secondo pannello lo storico smette di essere scorribile
a colpo d'occhio, che e' tutto il suo valore. Il lavoro sedentario non si scrive
(e' il caso di default e occuperebbe spazio per dire "niente").

"USA QUESTO" RIPORTA ANCHE L'ALLENAMENTO. Prima riattivare uno slot cambiava
solo il target del generatore: il TDEE tornava indietro, l'attivita' no. Il
collaudo di Fabrizio l'ha mostrato in due mosse — surplus con 3 HIIT + 1 corsa
in salita a 8.000 passi, poi deficit con 3 pesi + 1 allenamento a casa a 10.000
passi; riattivando il primo percorso restava a schermo l'allenamento del
secondo. Tornare a un percorso passato significa tornare a TUTTO quel percorso.
Ora "Usa questo" riporta passi, lavoro, modalita', righe e giorni di carico.

DOVE FINISCONO QUEI DATI: nel MODULO, non sul paziente. Diventano correnti solo
con "Salva dati TDEE". Cosi' riattivare un vecchio target per il generatore non
riscrive di nascosto l'allenamento di oggi — stessa regola del pannello dal vivo.
Il tasto "Riprendi" separato e' stato tolto: due pulsanti per la stessa idea
erano il modo per non capire piu' quale premere.

SLOT VECCHI. Quelli salvati prima di oggi non hanno la foto e NON se la
inventano: nessuna riga attivita', nessun "Riprendi". Ricostruire cosa facesse
il paziente dai dati attuali sarebbe mentire su un dato clinico.

TEST. Nuovo file s2-storico-attivita: il riassunto con passi, sedute per
attivita' e giorni; il lavoro sedentario che non occupa spazio; la stima rapida
che non si confonde con le righe; lo slot vecchio che resta muto; il MET
congelato che non segue il catalogo. 497 test verdi.

3 AGOSTO 2026 — P147c: IL RIQUADRO LAF ERA UNA FOTOGRAFIA, NON UN CALCOLO.
Baseline 468c0b3.

DA DOVE NASCE. Nello screenshot mandato per approvare la nuova schermata c'era
una contraddizione che nessuno cercava: il modulo diceva "Nessuna attivita'
inserita" e il riquadro sotto dichiarava "EAT 60 (6 MET medio)". Non era un
errore di formula. Il pannello si ridisegnava in TRE soli momenti — apertura
della scheda, "Ricalcola LAF", salvataggio — e in mezzo restava fermo. Quel 60
veniva da un oreAllenamento=1 legacy del paziente, letto all'apertura: poi
l'utente aveva scelto "calcolo preciso" e il riquadro non se n'era accorto.

PERCHE' CONTAVA, VISTO CHE IL PIANO SALVATO ERA GIUSTO. salvaCalcoloMacros
ricalcola, quindi nessuna dieta in giro era sbagliata. Il danno era di LETTURA:
si guarda il TDEE a schermo, ci si fa un'idea del paziente e si decide il
regime — su un numero scaduto. Un numero visibile che non corrisponde ai campi
visibili sopra di esso e' peggio di un numero assente.

LA CORREZIONE. Nuova _aggiornaPannelloTdeeLive(), agganciata a passi, fonte
passi, tipo di lavoro, radio della modalita' e ai tre campi della stima rapida,
piu' a _attRigheTotale (quindi copre aggiungi/togli/modifica riga, compreso il
passaggio a ZERO righe, che era il caso dello screenshot). Il ricalcolo gira su
una COPIA del paziente: nessuna scrittura sul db, nessuna notifica, nessun
riancoraggio dello slider regime. Scrivere resta un gesto esplicito, di
"Ricalcola LAF" e del salvataggio; questo aggiorna solo cio' che l'occhio legge.

DICITURA CHIARITA. "Calcolo preciso" con zero righe mostrava lo stesso testo di
"non si allena" ("nessun allenamento strutturato"). Sono due cose diverse: un
modulo lasciato a meta' e un paziente sedentario. Ora il primo caso dice
"calcolo preciso selezionato, ma nessuna attivita' inserita — EAT a zero".

TEST. Nuovo file s2-laf-pannello-vivo: l'EAT fantasma non deve sopravvivere al
cambio di modalita'; aggiungere una riga muove il TDEE senza premere Ricalcola;
l'anteprima non deve scrivere sul paziente (ore legacy, attivita' e modalita'
restano intatte finche' non si salva); a pannello chiuso la funzione non esplode.
492 test verdi.

3 AGOSTO 2026 — P147b: 20 ATTIVITA' IN PIU' NEL CATALOGO, SCELTE A MANO.
Baseline 77649f0.

DA DOVE NASCE. Chiusa la parte 1, Fabrizio chiede di poter LEGGERE il Compendium
e decidere lui cosa aggiungere, non di ricevere una lista gia' filtrata. Prima
verifica: il 2024 e' davvero l'ultima versione, non ne esiste una piu' recente.
Poi gli sono state estratte le 585 voci delle otto categorie che riguardano
l'allenamento (conditioning, sport, corsa, cammino, bici, acqua, invernali,
danza), TRADOTTE in italiano con le velocita' convertite in km/h e i pesi in kg
— il catalogo originale e' in miglia orarie e libbre, illeggibile in ambulatorio.
Su 71 voci selezionate, 48 erano gia' dentro: il catalogo copriva meglio di
quanto sembrasse.

LE 20 NUOVE. Corsa e camminata: tapis roulant 5 e 6 km/h (17355, 17358) e
"Corsa, ritmo non noto" (12150, 8.0) per il paziente che non sa dire il passo.
Palestra: circuit training a corpo libero (02032), salto con la corda a ritmo
(15551), "Palestra, seduta generica" (02060) e "Allenamento a casa" (02064) —
queste due servono a chi dice solo "vado in palestra" e prima finiva su una voce
di ripiego. Corpo-mente: Pilates generico (02105), hot yoga (02155), corso di
step completo (02004), pole dance (02108). Bici: ritmo libero moderato e intenso
(01016, 01017). Nuoto: acque libere (18300). Sport: calcio a 5 (15195),
squash amatoriale (15652), boxe al sacco leggero (15110), ginnastica artistica
(15300), equitazione (15370), motocross/enduro (15470). Catalogo: 97 -> 117.

DUE VOCI SCARTATE, NON DIMENTICATE. 02120 "water aerobics" a 5.3 MET e 02175
"yoga general" a 2.3 sono lo stesso esercizio di 18355 (acquagym, 5.5) e 02150
(yoga hatha, 2.3), che erano gia' in catalogo. Metterle avrebbe prodotto due
righe quasi identiche nello stesso menu a tendina: il nutrizionista si ferma a
chiedersi quale sia quella giusta e la differenza e' 0.2 MET, cioe' nulla.

IL BUG CHE E' SALTATO FUORI DAL CONFRONTO — "PALLAMANO" ERA L'ALTRO HANDBALL.
La voce puntava a 15320 "Handball, general", 12.0 MET: nel Compendium quello e'
il gioco AMERICANO contro il muro, non la pallamano a squadre. Quella e' 15330
"Handball, team" a 8.0. Chi giocava a pallamano si vedeva attribuire il 50% di
dispendio in piu' su ogni seduta. Corretto lasciando il NOME identico, cosi' le
righe gia' salvate sui pazienti continuano a risolvere e prendono il MET giusto
al primo ricalcolo — rinominare avrebbe orfanato i dati.

TEST. Tre nuovi test in s2-tdee-attivita-multiple: i 20 codici con il loro MET
esatto; la pallamano che deve puntare a 15330 e mai piu' a 15320; le categorie
che devono restare in blocchi consecutivi, perche' il menu a tendina apre un
optgroup nuovo ogni volta che cambia la categoria e una categoria spezzata
comparirebbe due volte. 486 test verdi.

3 AGOSTO 2026 — P147: LA SEZIONE TDEE, PRIMA PARTE (ATTIVITA FISICA -> LAF).
Baseline ec6b52c.

DA DOVE NASCE. Fabrizio manda lo screenshot del pannello e dice che non ci
capisce piu' nulla, pur avendolo scritto lui. Quattro domande precise: perche'
si chiama "P7"; perche' i due flussi (generico e preciso) si vedono insieme se
poi se ne usa uno solo; si possono aggiungere altre attivita', tutte
certificate; e come si fa col paziente che fa DUE volte pesi, DUE volte
CrossFit e UNA volta corsa.

IL MOTORE NON ERA IL PROBLEMA — L'INTERFACCIA NON DICEVA MAI COSA STAVA
FACENDO. calcolaTDEE aveva gia' dentro una priorita' precisa e invisibile:
sedute+minuti battono le ore; l'attivita' specifica batte tipo+intensita'. I due
flussi ESISTEVANO gia', semplicemente nessuno li dichiarava. Nello screenshot si
vede il caso limite: Tipo e Intensita' NON specificati, e il calcolo gira lo
stesso a 8 MET perche' a decidere e' stata l'attivita' specifica. Il pannello in
fondo non lo spiegava. Lezione: quando l'utente dice "non ci capisco nulla" su
una cosa che ha progettato lui, di solito il difetto non e' nella formula ma in
cio' che la formula NON racconta di se'.

"P7" ERA IL NUMERO DELLA PRATICA. Etichetta di roadmap interna finita in
interfaccia. Tolta. Nei commenti del codice resta (li' serve), nell'interfaccia
si scrive cosa fa il campo.

IL DIFETTO VERO: UN SOLO ALLENAMENTO PER PAZIENTE. Il modello dati era una
attivita', N sedute, M minuti. Col paziente 2 pesi + 2 CrossFit + 1 corsa
QUALUNQUE scelta e' sbagliata: sullo stesso monte ore (5x45 min, peso 77.8) la
realta' fa 261 kcal/giorno, "tutto pesi" 208, "tutto corsa" 346. **85 kcal al
giorno di errore, e nella direzione peggiore** — piu' cibo di quanto abbia
bruciato. Su un ipocalorico da -500 e' oltre un sesto del deficit, e il paziente
multi-attivita' non e' raro: e' la norma fra i 25 e i 45 anni.
LA CORREZIONE: l'allenamento e' una LISTA di righe {nome, sedute, minuti} e
l'EAT e' la somma. La formula non cambia — e' lo stesso (MET-1)xpesoxore dentro
un ciclo. Il MET esposto diventa la media pesata SULLE ORE (con una riga sola si
espone il MET della riga: ricavarlo dall'EAT gia' arrotondato dava 7.52 al posto
di 7.5, un numero che non sta in nessuna tabella).

I VALORI MET ERANO FERMI AL COMPENDIUM 2011, COL COMMENTO CHE DICEVA 2024.
Verificati uno per uno sulla fonte primaria (pacompendium.com). Fuori posto:
Pilates 3.5 -> 1.8 · Spinning 7.0 -> 9.0 · Circuit training 8.0 -> 7.5 ·
HIIT 8.0 -> 7.0 moderato / 11.0 vigoroso · Yoga 3.0 -> 2.3 · Corsa 10 km/h
10.0 -> 9.3 · Camminata in salita 6.0 -> 7.0 · e altri minori.
**LEZIONE PERMANENTE (regola 20): un commento che cita una fonte non e' una
verifica che i numeri vengano da quella fonte.** Il commento diceva "Compendium
2024" ed era stato creduto per un mese.
Catalogo passato da 30 a 97 voci (88 attivita reali + 9 voci di ripiego «non in elenco»), ognuna col CODICE ufficiale del Compendium
(`k`) accanto al MET: l'etichetta italiana e' una traduzione nostra, il codice
no — e' quello che permette di ritrovare la voce sulla fonte senza fidarsi del
nome.

IL CROSSFIT NON ESISTE NEL COMPENDIUM. Cercato: non c'e' "CrossFit" ne'
"functional training", e non e' una dimenticanza — non e' un'attivita' a
intensita' costante, quindi non si misura come la corsa a 10 km/h. La
letteratura misura i WOD: ~12.9 MET (uomini) sul WOD "Karen", ma su 8-12 minuti
di lavoro. **Il motore moltiplica per i MINUTI EFFETTIVI: mettere 12 MET su 60
minuti sovrastima di ~250 kcal a seduta.** Scelta: voce "CrossFit / functional
training (seduta intera)" = 7.5 MET, proxy 02040 (circuit training con
kettlebell, recuperi minimi, vigoroso), MARCATA COME STIMA nel catalogo, nel
pannello e nel contesto AI; piu' una voce separata "HIIT / WOD vigoroso (solo
tempo di lavoro)" = 11.0 (02214) per chi dichiara i minuti del solo WOD.

"NON SI ALLENA" ORA E' UNA COSA CHE SI PUO' DIRE. Prima campi vuoti significavano
insieme "non si allena" e "non gliel'ho chiesto", e il calcolo li trattava
uguali. Ora la modalita' e' esplicita (Non si allena / Stima rapida / Calcolo
preciso) e l'indice di affidabilita' distingue i due casi: il TDEE non cambia,
cambia quanto ci fidiamo. Attenzione al dettaglio che poteva romperlo:
`_modalitaAllenamento` ripiega su 'nessuno' anche per DEDUZIONE su un paziente
storico senza campi — quindi il bonus di affidabilita' scatta solo se
`p.modalitaAllenamento === 'nessuno'` e' scritto davvero.

BUG SILENZIOSO TROVATO STRADA FACENDO (quarta occorrenza della famiglia
pesoTarget). Il salvataggio dell'ANAGRAFICA leggeva i campi attivita' con
`gn('p-passi')`, `gn('p-sedute')`... ma quei campi NON stanno in quella
anagrafica: vivono nel pannello TDEE. Due danni, entrambi muti: col pannello
chiuso AZZERAVA passi/sedute/minuti/attivita' del paziente; col pannello aperto
su un ALTRO paziente gli COPIAVA ADDOSSO i dati di quello. La guardia era gia'
scritta dieci righe sopra per `pesoTarget` (`_stessoPaz`) — non era stata estesa
al resto. Ora i campi attivita' passano dalla stessa guardia e, quando il
pannello non e' quello giusto, si conservano i valori precedenti.

MIGRAZIONE. Le etichette storiche ("Pilates", "Circuit training", "Spinning"...)
risolvono via `_MET_ALIAS` sulle voci nuove: **rinominare una voce di catalogo e'
una migrazione di dati, non un ritocco di testo** — senza alias il MET sarebbe
diventato null, la riga scartata e l'EAT crollato a zero SENZA errori a video. Un
test percorre tutte e 28 le etichette storiche per bloccarlo. I pazienti storici
coi tre campi singoli diventano una riga sola in lettura (non si toccano i dati);
la scrittura definitiva avviene al primo salvataggio.

ALTRO IN QUESTO GIRO: "Orario allenamento" spostato accanto a Cronotipo e Orario
pasto principale — non entra in nessuna formula del TDEE, serve a distribuire i
pasti; stava fra i campi di dispendio solo per abitudine. Il pannello TDEE ora ha
UNA sola funzione che lo disegna (`_tdeePannelloHtml`), usata dai tre punti che
prima avevano tre HTML quasi uguali. Aggiunta la riga "Metodo allenamento", che
dice sempre quale strada ha usato il motore.

COLLAUDO: suite 472 -> 483 (11 test nuovi in `s2-tdee-attivita-multiple.test.js`);
4 test di `s2-contesto-attivita` aggiornati al contratto nuovo mantenendone
l'intento (cio' che e' usato e cio' che e' scartato dev'essere dichiarato);
`node --check` sul blocco script; smoke JSDOM del pannello (radio, pannelli che
si alternano, righe, totale vivo, salvataggio). INDEX.md rigenerato.
Sul paziente dello screenshot il TDEE passa da 2280 a 2265 kcal (Circuit training
8.0 -> 7.5): -15 kcal, dentro il rumore.

RESTA DA FARE — la SECONDA parte, dall'obiettivo peso in giu': giorni di carico,
ciclizzazione carboidrati, cronotipo e orario pasto principale. Fabrizio ha detto
che neanche li' ci capisce piu' nulla. Nota nata qui: le righe attivita' sanno
quante sedute fa il paziente, quindi la coerenza fra sedute dichiarate e giorni
ON spuntati a mano diventa verificabile.


31 LUGLIO 2026 (sera) — P63b: I CONTI DEL REFERTO INBODY DEVONO TORNARE.
Baseline f11063a.

LA PROVA CHE MANCAVA. L'8 luglio P63b ("conferma con diff anche per l'InBody")
era stata chiusa come DECISA DI NON FARE, con un motivo buono: l'InBody non
sostituisce un valore attuale, ne aggiunge uno nuovo allo storico, quindi il
confronto "attuale vs estratto" ha poco senso clinico e il clic in piu' si
pagherebbe a ogni import. Quel ragionamento pero' poggiava su un presupposto mai
verificato: che gli errori di lettura fossero rari.

Il 31 luglio Fabrizio ha caricato 25 referti veri. Circa 1 su 2 aveva almeno un
errore, 1 su 5 un errore grave: 6-7 sbagli sul grasso viscerale e 4-5 numeri
confusi, il peggiore una MASSA MAGRA DI 45 kg LETTA 88 kg. Un numero plausibile
a colpo d'occhio, e quindi invisibile.

PERCHE' ERA GRAVE. loadInbodyPDF scrive i valori dell'AI DIRETTAMENTE nei campi:
nessuno staging, nessuna conferma (le analisi del sangue ce l'hanno da P63/P124,
l'InBody no). E il cross-check Mifflin di P114 non poteva vederlo: calcolaTDEE
usa `lastIb.mb`, il metabolismo basale LETTO DAL REFERTO, non ricavato dalla
massa magra. Quindi una massa magra sbagliata non sposta le calorie — sposta
tutto cio' che serve a giudicare se la dieta funziona: `_avvisoProteineDeficit`
(soglia su g/kg FFM), la linea massa magra del Percorso (e quindi anche la massa
grassa, che e' il divario fra le due linee) e la riga "Massa magra X kg" del
contesto AI, cioe' ogni parere clinico e ogni piano generato per quel paziente.
Il danno non e' nel numero: e' nel giudizio, ed e' silenzioso.

LA CORREZIONE — NON QUELLA SCARTATA. Non e' tornata la tabella con le spunte
(quel no dell'8 luglio resta valido: costa un clic anche quando e' tutto giusto).
E' entrato il pezzo B di P124 tradotto sull'InBody: controlli deterministici che
parlano SOLO quando i conti non tornano. Qui pero' sono piu' forti che sul
sangue, ed e' il punto tecnico della giornata: **i valori del sangue sono
indipendenti fra loro, quelli dell'InBody no**. "peso = massa grassa + massa
magra" non e' una stima, e' la definizione con cui la bilancia stampa il foglio.
L'errore si trova con una sottrazione — senza AI, senza seconda chiamata, senza
avere il referto sotto mano.

Sei controlli in `_ibControllaCoerenza` (pura, quindi testabile): somma,
% grassa, BMI, rapporto acqua/massa magra, muscolare ≤ magra, viscerale nel
livello 1-20. Piu' un avviso fisso sotto il pulsante di import che nomina i tre
campi che hanno davvero sbagliato sul campo — "ricontrolla i numeri" non dice
all'occhio dove guardare.

EFFETTO COLLATERALE NON CERCATO: i controlli si sovrappongono, e le
sovrapposizioni LOCALIZZANO l'errore. Massa magra sbagliata -> salta solo la
somma. Massa grassa sbagliata -> saltano somma E percentuale. Peso sbagliato ->
saltano somma, percentuale E BMI. Fissato da un test apposta, perche' e' una
proprieta' che si perde al primo ritocco delle tolleranze.

TARATURA. Tolleranze larghe di proposito (1 kg o 2% sulla somma, banda 60-85%
sull'acqua): "un avviso che ha sempre ragione smette di essere letto" e' gia'
regola di roadmap, e la meta' piu' importante dei 20 test nuovi e' proprio il
SILENZIO — referto corretto, arrotondamenti, virgola italiana, campi mancanti,
tutti i 20 livelli viscerali validi. Meglio lasciar passare un errore da mezzo
chilo che bruciare la credibilita' dell'avviso.

NON BLOCCA il salvataggio, a differenza della data mancante di P120: un referto
puo' avere numeri strani per motivi legittimi, e la decisione clinica resta a
Fabrizio. Avvisa, evidenzia, e si zittisce appena il valore viene corretto.

FUORI PERIMETRO, DICHIARATO: i referti gia' in archivio non vengono ricontrollati
(Fabrizio ha corretto a mano i 25 mentre li caricava). La scansione retroattiva
dello storico resta disponibile e NON richiede i PDF — legge i numeri gia' in
cartella — ma non e' stata fatta in questa consegna.

Test 452 -> 472 (`s2-inbody-coerenza.test.js`). INDEX.md rigenerato (767 voci).

31 LUGLIO 2026 — P144: I "GESTITO" DELLE SCADENZE VANNO NEL PAZIENTE.
Baseline 22b853e.

IL DIFETTO. Il bottone "✓ Gestito" sotto ogni avviso di dashboard scriveva
nella chiave localStorage `scadenze_gestite`: la memoria del SINGOLO browser.
Tre conseguenze: (1) non si sincronizza — venti avvisi sistemati dal PC dello
studio si rivedevano tutti e venti sul telefono, e viceversa; (2) e' fuori dal
backup JSON, quindi cambiare computer o svuotare la cache li cancellava tutti
insieme; (3) e' la stessa famiglia dell'agenda rimossa il 30 lug — dati fuori
da `db`. La differenza e' che li' era codice morto, qui e' codice vivo.

LA CORREZIONE. `p._scadenzeGestite = { tipo: 'YYYY-MM-DD' }`. Il "gestito"
parla di UN paziente, quindi va dentro quel paziente: da li' viaggia gia' fra i
dispositivi (P74 sincronizza il blob paziente) ed e' gia' dentro il backup.
**Il dato va dove va la cosa di cui parla** — non serve inventargli un
contenitore nuovo.

DUE DETTAGLI CHE VALEVA LA PENA CURARE.
1. LA SCADENZA A 14 GIORNI SI APPLICA IN LETTURA (`_scadGestiti`), non solo
   alla potatura in scrittura. Se dipendesse dalla pulizia, un "gestito" vecchio
   sopravvissuto per qualunque motivo continuerebbe a nascondere un avviso vero.
   La potatura in scrittura resta, ma come igiene dei dati, non come regola.
2. LA MIGRAZIONE NON BUTTA NIENTE. Su un dispositivo dove la scheda di un
   paziente non e' mai stata aperta (P74: le righe leggere non stanno in
   db.pazienti), la sua voce non e' travasabile — e cancellarla vorrebbe dire
   perdere un "gestito" dato davvero. Resta nel cassetto vecchio e migra al giro
   in cui la scheda arriva; il cassetto sparisce solo quando e' vuoto per
   davvero. E se la stessa voce esiste gia' nel paziente con una data piu'
   recente, vince quella recente.

UN SOLO PUNTO DI CHIAMATA per la migrazione (renderScadenzeAlert), non i tre
canonici della regola 12: quelli servono quando i dati ARRIVANO da fuori,
mentre qui la sorgente e' localStorage, che e' di questo dispositivo e non
viaggia. Dichiarato nel commento perche' non sembri una dimenticanza.

COLLAUDO: 7 test nuovi, suite 452/452, node --check, INDEX rigenerato.


31 LUGLIO 2026 — P146: LA RASSEGNA DEI GRAFICI ALLE LARGHEZZE VERE.
Baseline 6c59b25.

IL METODO, prima del risultato. P145 aveva corretto tre etichette tagliate
trovate A OCCHIO; P146 nasceva da una quarta trovata allo stesso modo. Guardare
a occhio non scala: la prima cosa fatta qui e' stato scrivere uno strumento che
MISURA — `test-suite/grafici-larghezze.js`. Apre i sette grafici in un browser
vero a 545px (mezza colonna), 397px (iPhone) e 1100px (larghezza piena), e per
ogni <text> chiede al browser il rettangolo che occupa DAVVERO, poi cerca le
coppie che si sovrappongono e i testi fuori dal riquadro. Niente stime sulla
lunghezza delle stringhe: misure vere del motore di rendering.
DUE TRAPPOLE NELLO STRUMENTO STESSO, entrambe scoperte perche' produceva falsi
allarmi: (1) `getBBox()` ignora le trasformazioni, quindi su un'etichetta
RUOTATA (i titoli degli assi Y) restituisce il rettangolo di prima della
rotazione — si misura con getBoundingClientRect; (2) il rettangolo di un
<text> comprende tutta la riga tipografica, spazio bianco sopra e sotto
incluso, e due etichette vicine ma perfettamente leggibili risultavano
"sovrapposte" — si confronta il 60% centrale. Prima delle correzioni lo
strumento segnalava 10 problemi, 7 dei quali falsi. **Uno strumento di
misura va tarato prima di credergli, altrimenti il rumore fa buttare via il
segnale.**

I TRE DIFETTI VERI.
1. LA MAPPA DELLA QUALITA' a 545px: il titolo dell'asse X e la didascalia
   «colore piu' pieno = periodo piu' recente» sulla stessa riga, una sopra
   l'altra — si leggeva «variazione MASSA GRASSA (kg)olore piu' pieno…». Una
   regola per mandare la didascalia a capo esisteva GIA', ma scattava sotto i
   440px: chi l'ha scritta pensava «stretto = telefono» e non ha considerato
   che anche il computer, con la scheda a meta' schermo (545px), e' stretto.
   **La correzione non e' stata alzare la soglia ma TOGLIERLA:** la didascalia
   sta sempre su una riga sua. Una regola che non esiste non puo' avere il
   numero sbagliato.
2. «GRASSO VISCERALE» NON SI E' MAI VISTO nella vista larga. Il righello destro
   stava a `w-46` e _ibRighello scrive il titolo 42px piu' a destra: finiva a
   `w+9`, fuori dal riquadro. Non dipendeva dalla larghezza — era invisibile
   SEMPRE, da quando esiste. Nessuno se n'era accorto perche' **un'etichetta
   che manca non lascia un buco: lascia niente.** Righello spostato a `w-70`.
3. LA CURVA CANCELLAVA IL SUO PROPRIO LIMITE. «lv.9 — limite superiore InBody»
   veniva attraversata dalla curva del grasso viscerale. Motivo: le etichette
   delle soglie erano disegnate PRIMA delle curve, e in un SVG vince chi viene
   dopo. E succedeva proprio **quando il paziente MIGLIORA** e la curva scende
   verso il limite: il caso piu' frequente e quello che si mostra al paziente.
   Le etichette ora si accumulano a parte e si disegnano alla fine, con un
   alone bianco (`alone:true` in _ibTx, paint-order stroke).
   NB: questo lo strumento NON l'ha trovato — controlla testo contro testo, non
   testo contro linee. E' stato trovato guardando. Il limite e' dichiarato in
   testa allo script perche' non venga scambiato per una garanzia.

COLLAUDO: strumento verde su 18 combinazioni (7 grafici × 3 larghezze), suite
445/445, node --check, INDEX rigenerato, e i tre punti corretti riguardati a
video prima e dopo.


31 LUGLIO 2026 — P142: IL PAZIENTE NASCE ALLA TELEFONATA. Baseline b37e420.

IL NODO. La storia di un paziente comincia quando ti chiama, non quando entra
in studio: e' li' che va mandato il messaggio di preparazione alla
bioimpedenziometria — l'evento zero. Ma creare la scheda subito SPORCAVA
l'elenco, perche' non tutti quelli che prenotano poi vengono. Fabrizio doveva
scegliere fra perdere la storia e riempire la lista di nomi mai visti.

COSA C'ERA GIA' (verificato nel codice, non nella scheda): i template
prep_uomo/prep_donna, il motore d'invio col registro p.invii, e — da ieri —
l'appuntamento con l'ORA (P140), quindi {appuntamento} esce completo. Mancava
solo il flusso attorno. Vale la pena ripeterlo: **prima di implementare quello
che una scheda descrive, si guarda nel codice cosa esiste gia'** (lezione del
30 lug, ancora valida).

LE TRE REGOLE, e il perche' di ciascuna.
1. NASCE DA SE'. Un paziente NUOVO con la prima visita in una data FUTURA nasce
   'prenotato'. Zero campi in piu', zero gesti in piu'. Se la visita e' oggi
   (il paziente e' gia' davanti) nasce attivo. Scelta di Fabrizio fra tre
   opzioni: la tendina esplicita e' stata scartata perche' avrebbe rimesso un
   campo in una scheda appena alleggerita da P140 T2.
2. SI SPEGNE DA SE'. Alla prima misurazione InBody il paziente torna attivo:
   averlo misurato E' la prova che e' venuto. **Un cambio di stato che dipende
   dalla memoria di qualcuno e' un cambio di stato che prima o poi non
   avviene.** Piu' una via d'uscita manuale ("✓ E' arrivato") per chi viene e
   non viene misurato — senza, resterebbe in «In arrivo» per sempre, e una
   vista che accumula scarti smette di essere guardata. In UN SENSO SOLO:
   nessun bottone per rispedire qualcuno fra i prenotati, perche' un campo che
   si gira in due sensi e' un campo che prima o poi qualcuno gira per sbaglio.
3. STANNO FUORI DAI CONTI E DAGLI AVVISI. Elenco normale, KPI "pazienti",
   scadenze dashboard e menu del generatore di piani: tutti escludono i
   prenotati. Senza, ogni persona che telefona sarebbe comparsa il giorno dopo
   come "⚖️ InBody da fare" e come "👻 Paziente sparito". Veri entrambi, inutili
   entrambi: non e' sparito, deve ancora arrivare. **Un avviso che ha sempre
   ragione smette di essere letto.**

GLI ESISTENTI NON VENGONO TOCCATI (decisione di Fabrizio). Un paziente vecchio
senza misurazioni potrebbe essere un no-show o semplicemente uno mai misurato:
non e' distinguibile, e marcarlo sarebbe inventare un fatto. La regola vale
solo da adesso in avanti — che e' anche la natura del dato sul no-show: o lo
registri da quando lo accendi, o quel numero non esiste.

L'ETICHETTA CHE DICE LA COSA UTILE. Un prenotato non ha un piano, ma scrivere
"Nessun piano" sarebbe vero e inutile: l'etichetta dice «📅 Prenotato · data».
E se il giorno e' passato ed e' ancora prenotato diventa rossa: «Non
presentato? 27/07». Quello e' il dato grezzo del tasso di no-show, visibile
senza costruire nessuna statistica.

COLLAUDO: 7 test nuovi, suite 445/445, node --check, INDEX rigenerato, e le due
viste dell'elenco GUARDATE a video (P145) con pazienti finti — normale: solo
chi e' gia' stato in studio; «In arrivo»: i tre prenotati, con quello scaduto
in rosso. Contatore: "2 pazienti · 3 in arrivo".


31 LUGLIO 2026 — P141: "CHE GIORNO E'" SI CHIEDE ALL'OROLOGIO GIUSTO.
Baseline 696e994.

IL DIFETTO NOTO. `today()` era `new Date().toISOString().slice(0,10)`.
toISOString risponde con l'ora di GREENWICH: in Italia (avanti di 1h d'inverno,
2h d'estate) fra mezzanotte e le 01:00/02:00 locali Greenwich e' ancora al
giorno prima, quindi today() rispondeva IERI. Verificato eseguendo il codice
vero con TZ=Europe/Rome: alle 00:30 del 12 agosto rispondeva 11 agosto.

IL SECONDO DIFETTO, CHE LA SCHEDA NON CONOSCEVA. Provando anche `addDays` (la
funzione dietro tutte le tappe +7/+14/+21 e le date del piano) e' saltato fuori
che sbagliava di un giorno ogni volta che l'intervallo scavalcava il cambio
dell'ora legale: addDays('2026-03-25',7) rispondeva 31/03 invece di 01/04.
Silenzioso e STAGIONALE — ogni anno, per le settimane a cavallo di fine marzo,
tutte le date automatiche uscivano un giorno prima e nessuno se ne accorgeva.
Causa: `new Date(s)` legge la stringa come mezzanotte UTC, ma `setDate` fa
l'aritmetica in ora LOCALE; se in mezzo l'offset cambia, si perde un giorno.
Ora addDays lavora tutto in UTC (Date.UTC + setUTCDate): aritmetica di
calendario pura, nessun fuso di mezzo.

LA SCOPERTA CHE HA DATO FORMA ALLA CORREZIONE. Nel file c'erano TRE funzioni
per la stessa cosa: `today()` (rotta) e due copie CORRETTE scritte da chi aveva
sbattuto contro il problema nel proprio angolo — `_percorsoIsoLocal` (P118, 22
usi) e `_calYmd` (30 lug, 5 usi). Ogni volta il rubinetto era rimasto rotto e
qualcuno aveva messo un secchio sotto il proprio pezzo di codice. E' F4
applicato a una FUNZIONE invece che a un campo. Le due copie sono state rimosse
e i loro 27 usi puntano ora all'unica `ymdLoc()`.

LA PRECISAZIONE CHE HA EVITATO UN DANNO. La scheda diceva "45 usi di
toISOString da sostituire". Contati e classificati: sono 43, e ~23 sono GIUSTI
COSI'. Sono i marca-tempo (updated_at, creato, timestamp, generatoIl): non
dicono "che giorno e'" ma "in quale istante preciso", ed e' su quell'istante
che due dispositivi decidono chi ha salvato per ultimo. Sostituirli avrebbe
rotto la sincronizzazione. **Una voce di roadmap che conta le occorrenze di un
pattern non ha ancora fatto il lavoro: il lavoro e' classificarle.**

I PUNTI CORRETTI (una decina, oltre alle due funzioni alla radice): registro
invii `_inviiRegistra` (una cosa mandata all'una di notte restava datata IERI,
per sempre — regola 11 pura), log consumi AI `_aiLogUsage`, nome del file PDF
su storage, filtri e KPI delle entrate (settimana e mese: guardando il
fatturato all'una di notte del primo del mese si vedeva ancora il mese
scorso), dashboard (oggi e i confini della settimana).

DUE PUNTI LASCIATI IN UTC DI PROPOSITO, e ora dichiarati sulla riga: il return
di addDays e il ciclo dei sabati del piano (seme letto come UTC, avanzamento
con setUTCDate — nessun orologio locale di mezzo).

LA RETE DI SICUREZZA (test s1-date-locali). Il difetto e' gia' riemerso tre
volte da solo, perche' `new Date().toISOString().slice(0,10)` e' la cosa che
viene in mente per prima. Il test diventa ROSSO su qualunque riga che ricavi un
GIORNO da toISOString, a meno che la riga porti il marcatore esplicito
`/* UTC-VOLUTO: motivo */`. La dichiarazione sta ACCANTO al codice che deroga,
non in un elenco dentro un file di test: la legge chi modifica quella riga.
Piu' i test funzionali su ymdLoc (mezzanotte e mezza d'estate e d'inverno) e su
addDays (cambio ora legale in primavera e in autunno, anno bisestile, a cavallo
d'anno). Il test fissa anche che la funzione data-locale sia UNA SOLA: la
quarta copia nasce rossa.

DATI GIA' SALVATI SBAGLIATI: si lasciano (decisione di Fabrizio). Non c'e' modo
di sapere QUALI record furono scritti fra mezzanotte e le due, e correggerli
tutti sposterebbe anche quelli giusti. Un dato sbagliato che sai essere
sbagliato e' meno pericoloso di una correzione che ne sposta cento a caso.

COLLAUDO: 5 test nuovi, suite 438/438, node --check, INDEX rigenerato.


31 LUGLIO 2026 — P140 TAPPA 2: L'ORA, LO SPECCHIO INVERSO, E LA FINE DELLE DATE
DERIVATE SALVATE. Baseline 206864a.

COME E' NATA. La Tappa 2 doveva essere solo "dove si mette l'ora". E' stato
consegnato un MOCKUP A CONFRONTO (metodo P145: motore vero, _appSyncPaz copiata
dal file, due colonne da provare a video) e Fabrizio, provandolo, ha risposto
due cose. La prima: «mi piace la pulizia di A pero' il controllo di B». La
seconda, molto piu' grossa: «come abbiamo tolto la regola che il controllo era
dopo 28 giorni precisi, dovremmo togliere anche la regola che dopo una
settimana chiamo — molte volte i pazienti mi indicano il giorno e anche l'ora.
Fanno il controllo il sabato 1 aprile e poi non li chiamo sabato 8, mi dicono
di chiamarli lunedi' 10 alle 18:30 quando finiscono di lavorare». E: «ci sono
molti campi che fanno le stesse cose, voglio semplificare».
LEZIONE DI METODO: il mockup non e' servito a far scegliere fra A e B — e'
servito a far emergere un difetto che nessuna delle due opzioni riguardava.
Mettere in mano all'utente una cosa che funziona vale piu' di descrivergliela.

1. LE TAPPE NON SI SALVANO PIU': SI CALCOLANO. `p.dateCalendario` memorizzava
   cinque date tutte ricavabili da altro: `primo` era la COPIA IDENTICA di
   `inizioAlim`, chiamata/sett2/sett3 erano +7/+14/+21, `controllo` era il
   gemello di `controlloData`. Cinque valori derivati salvati accanto alla loro
   sorgente — la famiglia F4/P118/P140, quella che diverge in silenzio. Ora le
   calcola `_appTappe()` quando servono e il campo e' stato dismesso, con
   migrazione idempotente ai soliti punti d'ingresso.
   TRAPPOLA TROVATA: `_pazPreservaCampi` (la protezione F7 che ricopia da _old
   ogni chiave che pd non ha) faceva RISORGERE `dateCalendario` a ogni
   salvataggio. Una protezione generica va riletta quando si RIMUOVE un campo,
   non solo quando se ne aggiunge uno.

2. L'ANCORA DELLE TAPPE E' L'ULTIMO APPUNTAMENTO AVVENUTO, non la data di
   inizio piano. E' come lavora Fabrizio (parole sue sopra) ed elimina un buco
   che nessuno aveva mai notato: con l'ancora vecchia, dopo il primo mese non
   nasceva piu' NESSUN promemoria a meno di riscrivere a mano l'inizio piano, e
   il calendario semplicemente taceva. Una tappa CONCORDATA (evento vero in
   db.eventi, con giorno e ora) fa sparire quella proposta.
   NOTA: non si e' potuto verificare sui dati veri se Fabrizio aggiorni
   inizioAlim a ogni controllo (il sandbox non raggiunge Supabase). Con questa
   ancora la domanda non conta piu': funziona in tutti e due i casi.

3. LO SPECCHIO INVERSO (`_appSpecchioInverso`). Fino alla T1 l'anagrafica
   scriveva nel calendario ma non viceversa. Ora i due campi sono una
   PROIEZIONE di db.eventi: «prima visita» = la visita piu' vecchia, «prossimo
   controllo» = il controllo piu' IN LA' nel tempo (che e' cio' che il campo
   promette). Si chiama SOLO da gesti espliciti (salvaEvento, delEvento), mai
   dai percorsi di caricamento: se girasse mentre db.eventi non e' ancora
   scaricato azzererebbe due date vere — stessa disciplina di
   `propagaCancellazione`.

4. LO SPECCHIO SI RITIRA, O VIENE PROMOSSO (`_appRitiraSpecchio`). Quando nasce
   un appuntamento vero: stesso giorno -> lo specchio si ritira (era lo stesso
   fatto visto da due parti); giorno DIVERSO -> lo specchio viene PROMOSSO a
   evento normale (id nuovo, niente piu' `origin`) invece di essere cancellato.
   Cancellarlo sarebbe stata una perdita silenziosa: quella data era vera. Su
   dati clinici non si butta via niente per far tornare un modello.

5. I CAMPI DOPPI SONO SPARITI. La linguetta "Calendario" della scheda paziente
   conteneva "Data inizio alimentazione" e "Controllo personalizzato": gli
   STESSI due campi gia' presenti nella linguetta Dati con nomi diversi, piu'
   `syncInizio`/`syncControllo` il cui unico mestiere era ricopiare l'uno
   nell'altro. Due caselle, un dato. Linguetta e funzioni rimosse; l'anteprima
   e' traslocata sotto le date e ora chiama `_appTappe()` — la STESSA funzione
   del calendario, quindi non puo' piu' mostrare date diverse da quelle che il
   calendario disegna.

6. L'ORA: LA PULIZIA DI A COL CONTROLLO DI B (scelta di Fabrizio). Accanto a
   «Data prima visita» e «Data prossimo controllo» un campo ora, piu' un
   bottone «… altro» che apre la finestra evento completa gia' compilata.
   L'ora NON viene memorizzata sul paziente: si legge e si scrive
   sull'appuntamento, l'unico posto dove l'ora esiste — altrimenti avremmo
   riaperto la doppia fonte che P140 esiste per chiudere.
   `_appAggiornaOreScheda()` riallinea il modulo aperto dopo un salvataggio
   fatto dalla porta laterale: senza, al "Conferma" della scheda i valori
   vecchi avrebbero riscritto sopra quelli nuovi.

7. AVVISO «CONTROLLO DA FISSARE» al posto di «controllo saltato». Il vecchio
   contava i giorni da `dateCalendario.controllo`, cioe' dal +28 inventato. Il
   nuovo risponde a una domanda vera e verificabile: c'e' un controllo fissato
   da qui in avanti? Se no e sono passati >30 gg dall'ultimo controllo (o
   dall'inizio piano) esce arancione, >45 gg rosso, col messaggio WhatsApp
   pronto. Chiave NUOVA (`dafissare_`): i "gestito" del vecchio avviso
   parlavano di un'altra cosa e non devono zittire questo.
   Il "non si e' presentato" NON e' deducibile dai dati (nessuno registra
   l'assenza) ed e' gia' coperto da "paziente sparito" e "InBody da fare":
   meglio un avviso su un fatto certo che tre su un'ipotesi.

COLLAUDO. 12 test nuovi (23 in s2-appuntamenti-fonte-unica), suite 433/433,
node --check, INDEX rigenerato. E il rendering GUARDATO alle due larghezze
reali (P145): a 397px `.fr-3` diventa 2 colonne e il bottone «… altro» andava
a capo lasciando un buco — corretto con align-items:flex-end al posto di una
label invisibile. La didascalia dell'anteprima dice «dall'inizio del piano» o
«dall'ultimo appuntamento avvenuto» a seconda di quale delle due e' l'ancora:
scriverne una sola sarebbe stato falso meta' delle volte.

RESTA APERTO: trascinare l'appuntamento col mouse per spostarlo di giorno
(chiesto da Fabrizio il 31 lug). Oggi e' finalmente possibile perche' ogni voce
del calendario e' un evento con un id — prima meta' erano date disegnate, senza
niente da afferrare. Consegna a parte per non confondere il collaudo.

NOTA FUORI PERIMETRO: CLAUDE.md dichiara «Autenticazione: nessuna (app
personale)», ma esiste una schermata di login vera (`eseguiLogin`, Supabase
auth/v1/token, refresh token). La riga e' stata corretta.


31 LUGLIO 2026 — P140 T1, DUE DIFETTI TROVATI DAL COLLAUDO IN CHROME.
Baseline dfd5be1 (il commit di P140 Tappa 1).

IL COLLAUDO HA FATTO IL SUO MESTIERE. Fabrizio ha provato P140 T1 su un paziente
nuovo (prima visita 29/7, inizio piano 3/8, controllo scritto a mano il 26/8) e
il comportamento atteso c'era tutto: i quattro promemoria di pianificazione al
loro posto, il controllo del 26/8 diventato un evento vero (nel dettaglio
compare "Elimina evento", che prima non c'era), nessun controllo fantasma al
31/8 (03/08 + 28). Ma provando il passo successivo — fissare l'appuntamento con
l'ORA dal calendario — sono usciti due difetti.

1. IL DOPPIONE DI PASSAGGIO. salvaEvento() non avvisava lo specchio: creando
   l'evento "Prima visita" per lo stesso paziente e lo stesso giorno, a video ne
   comparivano DUE fino al ricaricamento successivo. La migrazione lo toglieva,
   ma solo al giro dopo — e nel frattempo sembrava che P140 non avesse
   funzionato. Corretto: salvaEvento chiama _appSyncPaz(paz,true), lo stesso
   allineamento che salvaPaz fa gia'.
   LEZIONE: quando si introduce uno specchio, non basta agganciarlo ai punti
   d'ingresso DATI (load, blob, import) — va agganciato anche a ogni punto in
   cui l'utente scrive dall'ALTRO lato dello specchio. La migrazione ripara, ma
   ripara tardi, e "tardi" su uno schermo vuol dire "rotto".

2. IL PROMEMORIA CHE DICEVA "oggi" A PRESCINDERE. MESSAGGI.controllo era il
   testo fisso 'Controllo con misurazione InBody previsto per oggi.': aprendo il
   31 luglio il controllo del 26 agosto si leggeva "previsto per oggi". Difetto
   preesistente, non introdotto da P140 — ma reso visibile da P140, perche'
   prima quel dettaglio si apriva di rado. Ora il testo porta {data}, sostituito
   da _evTestoPromemoria() con la data VERA dell'evento e l'ora se c'e'. Quando
   la data non e' disponibile (le tappe di pianificazione non hanno id, quindi
   l'evento e' null) il segnaposto sparisce e la frase resta generica invece che
   sbagliata: e' la stessa regola di P118 e della regola 11 applicata al TESTO —
   una data inventata e' peggio di una data mancante.

COLLAUDO: 2 test nuovi (13 in tutto in s2-appuntamenti-fonte-unica), suite
423/423 verde, node --check OK, INDEX rigenerato.

RESTA APERTO E VA IN TAPPA 2 (terzo difetto trovato nello stesso giro, non
corretto qui perche' e' lavoro vero): se l'evento viene creato su un giorno
DIVERSO da quello scritto in anagrafica, le due visite restano entrambe e il
campo del paziente continua a dire la data vecchia. E' lo SPECCHIO INVERSO che
manca — oggi l'anagrafica scrive nel calendario, il calendario non scrive
nell'anagrafica.


30 LUGLIO 2026 (6a sessione) — P140 TAPPA 1: L'APPUNTAMENTO NASCE IN UN POSTO
SOLO. Baseline 8996053.

IL PROBLEMA DI PARTENZA (scheda P140). getEventi() componeva il calendario da
TRE posti che descrivono lo stesso fatto — p.visitaData, p.dateCalendario e
db.eventi — ma solo db.eventi ha il campo `ora`. Conseguenza operativa: il
template {appuntamento} usciva monco ("il 12/08/2026" senza ora) e il flusso di
prenotazione chiesto in P142 restava bloccato.

LA SCOPERTA CHE HA CAMBIATO LA FORMA DEL PROBLEMA. Le tre fonti NON descrivono
la stessa cosa. Quattro delle cinque date di p.dateCalendario (primo, chiamata
sett.1, msg sett.2, msg sett.3) non sono appuntamenti: sono promemoria per il
nutrizionista, derivati dalla data di inizio piano. Nessuno si presenta in
studio e un orario non gli serve, ne' gli servira' mai. Gli unici due fatti che
sono appuntamenti veri — il paziente viene a un'ora — sono la PRIMA VISITA e il
CONTROLLO. Quindi non era una tripla fonte su tutto: era una DOPPIA fonte sulle
due sole cose che sono appuntamenti. Da qui la scelta fra le due ipotesi della
scheda: non fusione, ma la separazione onesta — dateCalendario resta la
PIANIFICAZIONE, db.eventi diventa il CALENDARIO.

IL SECONDO DIFETTO, EMERSO DAL RACCONTO DI FABRIZIO. Descrivendo la sua
procedura reale (il paziente chiama, si fissa la prima visita con giorno E ora;
il controllo si concorda insieme alla prima visita o alla chiamata della
settimana dopo, e cade a 14 giorni per i keto, o a 25, o a 32 — "dipende da
tante variabili") e' venuto fuori che salvaPaz scriveva
`controllo: g('p-controllo') || addDays(ini,28)`. Quel +28 non era un default
ragionevole: era UN APPUNTAMENTO INVENTATO. Finiva in calendario come se fosse
fissato, e la dashboard ci costruiva sopra l'avviso "controllo saltato"
contando i giorni da una data mai concordata con nessuno. E' la regola 11 del
CLAUDE.md alla lettera — la stessa di `data: campo.value || today()` in
salvaInbody. Terzo caso della famiglia.

COSA E' STATO FATTO (Tappa 1, nessuna modifica di interfaccia).
  - `_appIdAnag(pazId,tipo)` -> 'anag-<tipo>-<idPaziente>': l'id dell'evento e'
    DETERMINISTICO, non uid(). Due motivi, entrambi bug con un id casuale:
    (1) PC e iPhone eseguono la migrazione ognuno per conto proprio — con uid()
    nascerebbero due eventi diversi per la stessa visita e al primo sync il
    doppione tornerebbe dalla porta di servizio; con l'id deterministico i due
    record si sovrappongono (upsert merge-duplicates gia' in uso);
    (2) spostare l'appuntamento cambia la DATA della stessa riga, quindi l'ora
    gia' fissata non si perde e non resta in giro un evento orfano.
  - `_appSyncPaz(p, propagaCancellazione)`: allinea gli eventi-specchio ai campi
    anagrafici. Idempotente. Se un evento e' gia' segnato A MANO per quel giorno
    (magari con l'ora), quello vince e lo specchio non si aggiunge.
    `propagaCancellazione` e' VERO solo quando e' Fabrizio a salvare il
    paziente: in migrazione si aggiunge e si allinea in locale ma non si
    cancella su Supabase, perche' un blob arrivato dal server puo' essere piu'
    vecchio di quello di un altro dispositivo.
  - `_appMigraPaziente` / `_appMigraTutti`: migrazione idempotente ai TRE punti
    d'ingresso dati (regola 12) — loadLocal, _pazFetchBlob, importa — PIU' un
    quarto punto non ovvio: pullEventiSupabase, che SOSTITUISCE db.eventi con
    quello del server. Senza quella riga, un dispositivo gia' migrato vedeva
    sparire le visite dal calendario appena si sincronizzava con uno non ancora
    migrato. La migrazione azzera anche il controllo inventato
    (`dateCalendario.controllo = p.controlloData || null`): nessun dato inserito
    a mano viene toccato — il +28 era derivato da inizioAlim, ricalcolabile.
  - salvaPaz: `|| addDays(ini,28)` diventa `|| null` (punto di SCRITTURA,
    regola 10) e chiama `_appSyncPaz(pd,true)` pushando gli eventi toccati.
  - getEventi(): 'visita' e 'controllo' non escono piu' da p.visitaData /
    p.dateCalendario. Restano solo i quattro promemoria di pianificazione.
  - delEvento: se l'evento cancellato e' uno specchio (origin 'anagrafica'),
    spegne anche il campo del paziente. Senza questo, la migrazione lo avrebbe
    RICREATO alla ricarica successiva: un appuntamento cancellato che risorge.
  - aggiornaPrev: la riga "S.4 — Controllo" nella preview "Date automatiche"
    sostituita da una nota che dice come si fissa davvero il controllo.

EFFETTI COLLATERALI POSITIVI, tutti gratis dopo l'unificazione.
  - Il KPI "appuntamenti della settimana" in dashboard contava solo db.eventi:
    una prima visita scritta in anagrafica non veniva contata. Ora si'.
  - Un appuntamento nato dall'anagrafica non aveva `id`: dal calendario non lo
    potevi ne' spostare ne' cancellare (openEvDetail riceveva evId=''). Ora ce
    l'ha ed e' un evento a tutti gli effetti.
  - Le due medicazioni sul sintomo del 30 lug (fascia "senza orario" in vista
    Settimana, blocco "SENZA ORARIO" in vista Giorno) restano valide e utili,
    ma ora coprono il caso vero (evento senza ora ancora fissata) invece di un
    difetto strutturale.

COLLAUDO. Banco di prova deterministico a tavolino: 23 asserzioni su 9 scenari
(migrazione storica, idempotenza a due giri, zero doppioni, due dispositivi in
parallelo che generano lo stesso id, spostamento data con ora conservata,
evento manuale che vince, cancellazione che spegne il campo, controllo vero con
orario, paziente senza date). Tutte verdi. `node --check` sul blocco script.

DECISIONI PRESE CON FABRIZIO.
  - Appuntamenti storici: migrati tutti, senza ora. Nessun orario convenzionale
    (sarebbe un dato inventato). Una regola sola, nessuna eccezione da ricordare.
  - Il +28 sparisce. In cambio l'avviso rosso "controllo saltato" — che era
    calcolato su quella data finta — smette di scattare per chi non ha un
    controllo fissato, e in Tappa 2 diventa "controllo DA FISSARE", che e'
    l'avviso onesto e quello davvero utile.
  - Dove si fissa l'ora nell'interfaccia: Fabrizio non sa quale preferisce fra
    campo-ora in anagrafica e bottone "Fissa appuntamento" — vuole PROVARLI.
    Tappa 2 si apre con un mockup a confronto (stesso metodo di P145).

RESTA APERTO (Tappa 2). Lo specchio inverso db.eventi -> p.visitaData (oggi un
evento creato dal calendario non compila il campo dell'anagrafica); il punto
d'ingresso dell'ORA; il nuovo avviso "controllo da fissare". Finche' l'ora non
si puo' inserire, {appuntamento} resta senza orario: P140 sblocca P142 solo a
Tappa 2 finita.


30 LUGLIO 2026 (5ª sessione) — P145: LA SCHEDA InBody ALLA PRIMA MISURAZIONE.
Baseline 047f135. Nata da uno screenshot di Fabrizio: paziente nuovo, una sola
misurazione, scheda InBody senza NESSUN grafico.

IL DIFETTO. Tutti e sei i riquadri erano costruiti dentro un solo `if(hasMulti)`
(hasMulti = sorted.length>=2). Restavano a video la silhouette segmentale e la
tendina delle misurazioni: nient'altro.

LA DIAGNOSI. `hasMulti` era diventato una scorciatoia per "abbiamo abbastanza
dati", ma i sei grafici non hanno lo stesso fabbisogno:
  - PERCORSO (servono >=2, e le loro guardie interne sono corrette):
    Composizione nel tempo (variazione dal basale: con un punto sono tre zeri),
    Ritmo e Qualita' (lavorano sui PERIODI, e un periodo e' la distanza fra due
    referti: con uno solo _ibPeriodi ne restituisce zero), curva dell'adiposita'.
  - FOTOGRAFIA (bastava una misurazione): la composizione a barre, e soprattutto
    G5 «Peso · Muscolo · Grasso» (P133) — `_ibGrForme(ib,w)` riceve UNA
    misurazione (`_ibVista.ultimoIb`), non la serie. Era l'unico dei sei che per
    costruzione non poteva aver bisogno di due referti, ed era chiuso li' dentro
    per il solo punto del file in cui era stato scritto: il grafico piu' utile
    alla prima visita era l'unico che alla prima visita non si vedeva.

LEZIONE. Una condizione di guardia scritta per un GRUPPO di funzioni assorbe
tutto cio' che viene aggiunto dentro quel gruppo, anche cio' che non le
appartiene. Aggiungendo un riquadro a un blocco condizionale la domanda non e'
"sta bene qui?" ma "questa condizione parla anche di lui?". E' la stessa
famiglia dell'incidente del 30 lug (3ª sessione): li' un `return` anticipato
spegneva meta' dashboard, qui una `if` di gruppo spegneva sei grafici su un
caso d'uso intero.

METODO. Prima di scrivere codice, mockup a confronto costruito con il MOTORE
VERO (funzioni _ib* copiate da 047f135, dati del paziente dello screenshot) e
tre scenari messi a video: A (solo G5), B (scheda "prima visita"), C (tutti i
grafici sempre). C e' servito a rispondere visivamente al dubbio di Fabrizio
"mostro anche gli altri?": quattro riquadri su sei restano vuoti e la scheda
sembra rotta. Fabrizio ha scelto B.

LA MODIFICA (index.html):
1) Tre riquadri escono da `if(hasMulti)`: G5, composizione a barre, adiposita'.
   L'ordine dei riquadri (_cOrdine) NON cambia: quelli vuoti cadono nel
   .filter(Boolean) e la griglia si richiude su chi resta.
2) `_ibGrBarre`: soglia da `V.length<2` a `V.length<1` + ramo "barra unica" —
   barra larga e centrata (con 1 sola misurazione il calcolo normale la lasciava
   a 46px in mezzo a mezzo riquadro vuoto) e nomi/kg/% scritti DI FIANCO alle
   fette invece che nel tooltip, che su un referto stampato non esiste.
   La percentuale e' a un decimale: cosi' la fetta del grasso ridice esattamente
   la "% grassa" del referto (34,5%) e le tre fette fanno 100 e non 101.
3) `_ibAdipCurva(S)` — nuova: "questa serie puo' disegnare una curva?" in UN
   posto solo, usata sia da renderPdInbody per scegliere il riquadro sia da
   `_ibGrAdiposita` per disegnare. Due copie della stessa condizione sono la
   premessa di F9: divergono, e resta un riquadro con dentro il vuoto.
4) `_ibGrRighelliOggi()` — nuova: alla prima misurazione l'adiposita' centrale
   mostra i due RIGHELLI clinici (viscerale e cintura/fianchi con le fasce e la
   fonte) al posto della curva. Non e' un grafico nuovo: e' `_ibRighello`, che
   gia' stava di fianco alla curva. Stessa card, stesso posto nella griglia.
5) `_ibFormeMotivo(ib)` — nuova: G5 non sparisce piu' in silenzio quando manca
   `ib.rif`. Il riquadro resta e SCRIVE perche' ("questo referto non porta gli
   intervalli di riferimento... reimporta il PDF"). Prima erano due `return ''`
   dentro il disegno piu' una `if(...)` in renderPdInbody: tre condizioni per la
   stessa cosa, e a video il nulla. Famiglia F6/F7 — l'uscita silenziosa.
6) `_ibFormaPaziente(ib)` — nuova: la forma riconosciuta (a C / a D /
   bilanciata) calcolata in un posto solo, per il badge nel disegno e per la
   frase in HTML.

TRE ETICHETTE TAGLIATE, trovate GUARDANDO il rendering (non nei test):
  - la frase clinica della forma ("...la priorita' e' togliere grasso
    proteggendo il muscolo") era un <text> SVG, che non va a capo: a mezza
    colonna finiva troncata a meta' parola e sotto i 520px spariva del tutto,
    cioe' proprio su iPhone. Ora e' HTML sotto il grafico: si adatta da sola e
    su telefono si vede per la prima volta.
  - l'etichetta dell'idratazione usciva dal riquadro ("atteso 72–7" a mezza
    colonna, "· atteso" su iPhone): accorciata due volte, una per soglia.
  - la riga del grasso si leggeva «Massa» accanto a «Muscolo» (taglio
    automatico alla prima parola, `r[3].split(' ')[0]`): ora le versioni corte
    sono scritte per esteso — Peso / Muscolo / Grasso.
  Un'etichetta tagliata e' peggio di un'etichetta corta.

COLLAUDO (Playwright sul file vero, scheda costruita DA NASCOSTA e poi mostrata,
come impone la regola di P136):
  1 misurazione con rif   → barre, righelli e forme disegnati; nessun riquadro
                            vuoto; frase clinica presente e intera.
  1 misurazione senza rif → forme mostra il messaggio "referto senza intervalli"
                            (nessun contenitore [data-ib] vuoto).
  2 misurazioni           → tempo, barre, ritmo, qualita', adip (CURVA), forme:
                            invariato rispetto a prima, nessuna regressione.
  iPhone (430px)          → tutte e tre le etichette accorciate entrano; le
                            versioni corte Peso/Muscolo/Grasso si leggono.
Suite 410/410. INDEX.md rigenerato.

FUORI PERIMETRO (visto nel collaudo, NON toccato per non allargare il giro):
nella Mappa della qualita' a mezza colonna il titolo dell'asse X "variazione
MASSA GRASSA (kg)" e la didascalia "colore piu' pieno = periodo piu' recente"
si sovrappongono. Difetto pre-esistente, stessa famiglia dei tre qui sopra
(testo SVG che non va a capo): da segnare in roadmap.


30 LUGLIO 2026 (4ª sessione) — NAVIGAZIONE CALENDARIO CORRETTA PER OGNI VISTA,
SCADENZE DASHBOARD RAGGRUPPATE PER PAZIENTE. Baseline 5da94f1. Sessione nata dal
collaudo di Fabrizio sulle due sessioni precedenti: due difetti reali trovati
guardando l'app coi propri dati, non nei miei test con pazienti finti.

1) NAVIGAZIONE CALENDARIO — LA FRECCIA "GIORNO SUCCESSIVO" SALTAVA DI 7 GIORNI.
`calNext`/`calPrev` avevano un solo `if`: `month` → ±1 mese, `else` → ±7 giorni per
TUTTO il resto. Andava bene per la vista Settimana ma sbagliava per Giorno (che
doveva avanzare di 1 giorno, non di 7 — da qui "va di giovedì in giovedì" osservato
da Fabrizio) e per Anno (che doveva avanzare di 1 anno, mai testato prima). Introdotta
`_calPasso(delta)` con un ramo esplicito per ciascuno dei 4 valori reali di `calView`
('month'/'week'/'day'/'anno', verificati da dove li scrive `setCalView`).
COLLAUDO (le 4 viste, stessa data di partenza 16/07/2026):
  mese      → +1 mese  (16/07 → 16/08) ✓
  settimana → +7 giorni (16/07 → 23/07) ✓ (comportamento invariato, era già giusto)
  giorno    → +1 giorno (16/07 → 17/07) ✓ (PRIMA sarebbe stato 23/07, il difetto)
  anno      → +1 anno  (16/07/2026 → 16/07/2027) ✓ (mai stato corretto)

2) SCADENZE DASHBOARD (C8) — RAGGRUPPATE PER PAZIENTE, LISTA TRONCATA A 5+5.
Fabrizio ha mostrato uno screenshot con 53 avvisi (45 urgenti): ogni AVVISO era una
riga a sé, quindi un paziente con "sparito" + "controllo saltato" occupava due card
quasi identiche. `renderScadenzeAlert` ora raggruppa gli item per `pazId` dentro
ciascuna sezione (urgenti/attenzione): una card per paziente, con dentro tutte le
etichette che lo riguardano, ordinata dal problema più vecchio (gg più alto) al più
recente. Il pulsante "✓ Gestito" resta per-singolo-avviso (stessa chiave di prima):
gestire "controllo saltato" non deve nascondere anche "sparito" sullo stesso
paziente, sono problemi diversi.
TRONCAMENTO: ogni sezione mostra al massimo 5 pazienti, con un bottone "Mostra tutti
(N altri)" che rivela un blocco già pronto nel DOM (solo un cambio di classe, nessun
ricalcolo). Soglie delle regole (28gg sparito, 14gg controllo saltato, 28gg piano,
60gg InBody) confermate invariate da Fabrizio — il problema era la presentazione,
non i giorni.
COLLAUDO (7 pazienti "sparito" + 1 con doppio problema "sparito"+"controllo
saltato", tutti con misurazione recente per isolare il caso): sezione Urgenti dice
"8 pazienti", il paziente col doppio problema compare in UNA sola card con
ENTRAMBE le etichette dentro, bottone "Mostra tutti (3 altri)" presente e
corretto (5 visibili + 3 nell'extra = 8, nessun paziente perso o duplicato).

NOTA FUORI PERIMETRO (non toccata qui, per non allargare il giro): il pulsante
"Gestito" scrive in `localStorage` chiave `scadenze_gestite` — fuori da `db`,
quindi fuori dal backup JSON e non sincronizzato tra dispositivi. Stessa famiglia
di difetto dell'agenda rimossa il 30 lug (3ª sessione), ma non è nata in questa
sessione: segnata per una voce di roadmap a parte.

Suite 410/410. INDEX.md rigenerato.


30 LUGLIO 2026 (3ª sessione) — DASHBOARD: RIMOSSO IL RETURN ANTICIPATO CHE UCCIDEVA
META' FUNZIONE. Commit separato di proposito (scelta di Fabrizio): accende codice mai
eseguito in produzione, quindi deve poter essere annullato da solo senza travolgere il
calendario e i template della 2ª sessione.

IL DIFETTO. `renderDashboard()` conteneva, subito dopo i KPI:
    const agendaEl = document.getElementById('dash-agenda');
    if(!agendaEl) return;
Ma `#dash-agenda` NON esiste nel markup, e non esisteva nemmeno prima di questa
sessione: e' il residuo di una dashboard piu' vecchia, gia' censito in ORFANI_NOTI
della test-suite (che infatti passava: il test vieta gli orfani NUOVI, non conosce le
conseguenze di quelli noti). Quel `return` faceva uscire la funzione a meta', quindi
NON sono MAI stati eseguiti:
  - Sintesi clinica (#dash-sintesi, #dash-alert-tags)
  - Pazienti recenti (#dash-pazienti-recenti)
  - renderScadenzeAlert() — l'INTERA funzione "Scadenze pazienti" (C8)
  - Spunti per i piani alimentari (#dash-spunti-list)
Tutti e quattro gli elementi ESISTONO nel markup: erano li' ad aspettare un contenuto
che non arrivava mai.

PERCHE' NESSUNO SE N'ERA ACCORTO. Le sezioni non apparivano vuote: mostravano il testo
statico scritto a mano nell'HTML. In particolare "Nessuna scadenza urgente 🎉" non era
un risultato ma un'etichetta, identica con zero o con trenta controlli scaduti. E' la
firma della famiglia F6/F7: id letto, elemento inesistente, nessun errore in console —
la guardia trasforma il guasto in un'uscita silenziosa.

LA CORREZIONE. Rimosso il blocco morto "Agenda di oggi" (25 righe) e con esso il
return. Rientrava naturalmente nel lavoro della 2ª sessione: quel blocco ERA l'agenda.

COLLAUDO (confronto diretto b9f4b36 vs modificato, stesso markup e stessi dati):
  paziente con controllo scaduto → PRIMA "Nessuna scadenza urgente 🎉"
                                   DOPO  "🔴 Urgenti (1)"
  sintesi clinica  → PRIMA vuota, DOPO "1 allerta clinica da tenere a mente."
  pazienti recenti → PRIMA vuoto, DOPO popolato
  spunti           → PRIMA vuoto, DOPO popolato
  nessun errore a runtime in nessuno dei due stati. Suite 410/410.

LEZIONE. ORFANI_NOTI e' un elenco di deroghe, non di assoluzioni: un id classificato
come "noto" resta un guasto latente finche' qualcuno non guarda COSA succede quando la
lettura fallisce. Qui la conseguenza era meta' schermata. Vale la pena rileggere le
voci di ORFANI_NOTI chiedendosi non "e' censito?" ma "cosa smette di funzionare quando
l'elemento non c'e'?".


30 LUGLIO 2026 (2ª sessione) — TEMPLATE PREPARAZIONE VISITA, VISTE CALENDARIO RIPARATE,
AGENDA RIMOSSA. Baseline b9f4b36. Sessione nata da una domanda di prodotto (un tasto per
mandare al paziente le istruzioni pre-bioimpedenziometria) che ha fatto emergere tre
difetti latenti.

PREMESSA — INCIDENTE SFIORATO. Il piano iniziale prevedeva di costruire `p.invii[]` e il
motore di invio: esistono dal 28 luglio, P87 e' CHIUSA. L'errore nasceva dal documento di
progetto `NutriGest_P87_Comunicazione_Analisi.md`, che descrive il PIANO del 28 lug ed e'
stato letto come stato attuale. E' P62/P77 in una forma nuova. REGOLA ESTESA: l'incrocio
col CHANGELOG prima di implementare vale anche — e soprattutto — per i documenti di
ragionamento del progetto Claude, che sono foto piu' vecchie della roadmap e non portano
una data di stato.

1) TEMPLATE PREPARAZIONE PRIMA VISITA (COM_TEMPLATES). Aggiunti `prep_uomo` e
`prep_donna`: istruzioni dettagliate per una BIA affidabile (24h prima: niente alcol,
allenamento intenso, sauna, idratazione invariata; la mattina: digiuno o 4h, niente caffe'
nelle 3h, niente creme su mani e piedi; portare le analisi). La versione donna aggiunge la
fase del ciclo: nei giorni delle mestruazioni e nella settimana precedente la ritenzione
idrica rende la misura non confrontabile con le successive.
CRITERIO DI REDAZIONE (deciso con Fabrizio): nel messaggio entra SOLO cio' che il paziente
deve fare PRIMA di uscire di casa. Fuori percio' bagno, gioielli ed elenco farmaci: si
risolvono in studio in dieci secondi, e un'istruzione ricordata tre giorni prima si perde
mentre una detta all'accoglienza si esegue. Tolto anche il paragrafo sui farmaci per non
indurre nessuno a sospenderli di propria iniziativa.
Armonizzato `precontrollo`, che diceva "digiuno da almeno 3 ore" in contrasto col
protocollo. Textarea della tab Comunicazione da rows=4 a rows=8 (testi di 800-1000
caratteri). `{appuntamento}` risolveva gia' data E ora via `_comProssimoApp`/`getEventi`.

2) VISTA SETTIMANA — GLI EVENTI SENZA ORA SPARIVANO. `renderCalWeek` filtrava
`(e.ora||'').startsWith(hh)`: con `ora` vuota il confronto e' falso per TUTTE le 16 fasce,
quindi l'evento non finiva nella casella sbagliata — spariva del tutto. E `getEventi()`
produce eventi senza `ora` da DUE delle tre fonti (`p.visitaData` e `p.dateCalendario`),
cioe' la quasi totalita' degli appuntamenti reali. La vista Mese filtra solo su `e.data` e
infatti mostrava tutto: da qui l'asimmetria che Fabrizio vedeva a schermo. Aggiunta una
fascia "senza orario" in testa a ogni colonna-giorno.
COLLAUDO: 3 eventi senza ora → PRIMA 0/3 visibili, DOPO 3/3.

3) VISTA GIORNO — LISTA PIATTA NON ORDINATA. `renderCalDay` non perdeva niente ma non
ordinava: gli eventi uscivano nell'ordine di produzione di `getEventi()` (prima tutte le
visitaData, poi le dateCalendario, poi db.eventi). Sostituita da una timeline a slot di
30' 07:30-19:30, con blocco "senza orario" in testa e rete di sicurezza "fuori fascia" per
gli orari esterni alla griglia — cioe' il difetto del punto 2 deliberatamente non
riprodotto nel codice nuovo.
COLLAUDO: eventi inseriti 15:45/18:00/09:00 → PRIMA stampati in quell'ordine, DOPO
09:00 → 15:45 → 18:00.

4) AGENDA DI DASHBOARD RIMOSSA (~165 righe JS + 47 di markup). Motivi, in ordine di
gravita':
  a) `salvaAgendaItem` e `salvaTodoItem` scrivevano `data: today()` cablato e il form non
     aveva un campo data: inserire un promemoria FUTURO era IMPOSSIBILE. Era esattamente
     l'uso per cui la funzione esisteva. Navigando a domani e scrivendo, la voce nasceva
     con la data di oggi e spariva dalla schermata in corso.
  b) `pulisciAgendaVecchia()` era un corpo vuoto: i todo si accumulavano per sempre.
  c) I dati vivevano in localStorage, fuori da `db`, quindi FUORI dal backup JSON e non
     sincronizzati tra dispositivi.
  d) `AGENDA_CAT` duplicava `EV_TYPES` come sistema di categorie/colori.
  e) Le categorie erano cablate su Fabrizio ("Vigile del fuoco"): inadatte a un prodotto
     venduto a terzi.
Il follow-up clinico che l'agenda sembrava coprire e' gia' gestito meglio da
`p.dateCalendario` (chiamata sett.1, msg sett.2/3, controllo), automatico dalla data di
inizio piano. Nessuna capacita' persa.
SALVATO IL DISEGNO, NON LA FUNZIONE: la timeline a slot e' stata trapiantata in
`renderCalDay` (punto 3), dove ha dati veri da mostrare. Dashboard portata a colonna
singola. Zero riferimenti orfani residui (grep + test s1).

DECISIONE DI PRODOTTO (Fabrizio, 30 lug): l'agenda come sezione a se' NON si fa. Non si
riorganizza la navigazione di uno strumento che non e' ancora in uso — la decisione costa
zero a rimandarla e rimandandola diventa informata. Il Calendario resta l'unica porta: e'
quello che serve al flusso di prenotazione (trovare uno slot libero e' una vista mese, non
una timeline del giorno).

Suite 410/410. INDEX.md rigenerato.

NOTE PER LE PROSSIME SESSIONI:
- `today()` e' `new Date().toISOString().slice(0,10)`: toISOString converte in UTC, quindi
  in Italia fra mezzanotte e le 2:00 restituisce IERI. 45 usi di toISOString nel file. Non
  corretto qui (fuori perimetro): nel codice NUOVO di questa sessione e' stato introdotto
  `_calYmd()` che usa la data locale, cosi' il difetto non si propaga.
- TRIPLA FONTE sugli appuntamenti: `p.visitaData`, `p.dateCalendario[...]` e `db.eventi`
  descrivono lo stesso fatto e solo l'ultima ha il campo `ora`. E' F4, ed e' la causa
  radice dei punti 2 e 3. Va unificata insieme al flusso di prenotazione.
- La test-suite richiede `npm install` in `test-suite/` (jsdom, jspdf): senza, fallisce 42
  test su 46 per moduli mancanti e sembra un guasto del codice.


30 LUGLIO 2026 — P139 APERTA: PLICOMETRIA. SESSIONE DI SOLO RAGIONAMENTO, NESSUN
CODICE TOCCATO. Baseline `4833ca6`. Modificati solo Roadmap e CHANGELOG.

**LA DOMANDA DI FABRIZIO:** *"molti nutrizionisti usano come metodo di misura
anche la plicometria, vorrei aggiungerla. Ma prima vorrei ragionare se ne vale
davvero la pena, e se sì qual è il modo migliore e come la colleghiamo alle
altre funzioni."* Dato dichiarato subito, e che ha riorientato tutta la sessione:
**Fabrizio il plicometro non l'ha mai usato.** Quindi la funzione non nasce da un
bisogno della sua pratica ma dal posizionamento commerciale, e lo standard va
scelto su cosa fanno gli altri, non su cosa farebbe lui.

**IL VERDETTO: sì, ma per un motivo solo, ed è commerciale.** Come stima della %
di grasso, a lui che ha l'InBody la plicometria non serve. Il punto vero è che
NutriGest oggi ha un presupposto nascosto: **serve un InBody.** Il motore TDEE
parte dal MB sulla massa magra InBody, P122 deriva il traguardo dalla massa magra
InBody, la scheda composizione è una scheda InBody. Un collega senza InBody compra
l'app e ne trova spenta la metà caratterizzante. La plicometria è il **secondo
motore d'ingresso**. Mercato verificato: Dietosystem la vende come modulo
dedicato, WinFood/MetaDieta/Bodygeo/Sifa la hanno; i gestionali economici
(Nutribook, Appuntoo, Nutriverso) non gestiscono composizione corporea. Non
averla colloca NutriGest in quella seconda fascia.

**IL NUMERO CHE HA DECISO L'ARCHITETTURA.** Stesso paziente inventato ma
plausibile (uomo 42 anni, 88 kg, 178 cm), stesse pliche, calcolato con tutti i
metodi: Jackson-Pollock 3 → **18,6%**, JP7 → 20,0%, Durnin-Womersley → 27,3%,
Peterson → 27,2%. **8,8 punti di ampiezza.** Propagati a Katch-McArdle:
**da 1.751 a 1.918 kcal di metabolismo basale — 167 kcal decise da quale riga di
codice si è scelta.** Dal lato opposto, il minimo cambiamento *rilevabile* su una
somma di 7 pliche (MDC₉₅ = 2,77 × errore tecnico) è ≈ 7 mm, cioè **meno di 1
punto percentuale di grasso**. L'errore del metodo è dieci volte il segnale che
si vuole misurare.

**DA LÌ LA REGOLA: si salvano i millimetri, la percentuale è derivata.**
Indicatore primario = somma pliche in mm e sua traiettoria; la % grasso è output
terziario collassato, con equazione ed errore dichiarati accanto. È la **terza
applicazione** dello schema "fonte di verità grezza + specchio derivato" già usato
in P118 tappa 1 e in P122 (`pesoTarget`). Coincide con la posizione della
letteratura recente (German J Sports Med 2022, position statement IOC/Ackland
2012, prassi ISAK): convertire in percentuale aggiunge un passaggio d'errore più
grande del segnale.

**IL RISCHIO È IL "FALSO AMICO" DI P101, AUTO-INFLITTO.** Sarebbe la terza fonte
di verità sulla composizione corporea, dopo InBody e peso casalingo. Famiglia già
vissuta due volte (P118 sui referti del sangue, P120 sullo storico InBody): è la
ragione per cui esistono le lezioni 10-11 di CLAUDE.md. Regola scritta nella
scheda: **serie plicometrica sempre separata da quella InBody, mai fuse in un
unico grafico o campo "% grasso"**. L'unico confronto legittimo fra i due metodi
è indicizzato alla variazione dal basale — cioè il grafico già scelto in P99.

**TRE COSE TROVATE DALLA RICERCA CHE NESSUNO SI ASPETTAVA.**
- **L'equazione di Faulkner non è di Faulkner.** È un errore bibliografico
  smentito nel 2007 (Glaner & Pires Neto, *"o fim de um mito"*): deriva da
  coefficienti mai pubblicati di Yuhasz, propagati dai laboratori brasiliani alla
  letteratura ispanofona e poi italiana. Nessuna popolazione di validazione,
  nessun errore documentato. È diffusa perché si calcola a mente e perché dà
  valori stabilmente bassi sui magri e allenati — conferma quello che il cliente
  sportivo vuole sentirsi dire. **Mai come default.**
- **Vincolo normativo che chiude una porta:** linee guida ONB/FNOB (delibera
  433/2019, par. 7) vietano di demandare il rilievo al cliente. **Niente
  inserimento pliche lato app paziente**, anche se sarebbe comodo. Il biologo
  nutrizionista può invece eseguirla senza vincoli (par. 8, apparecchi non
  invasivi).
- **Tre siti anatomici diversi si chiamano tutti "sovrailiaca"** (cresta iliaca
  ISAK / sovraspinale ISAK / suprailiaca ACSM), e le equazioni ne usano di
  diversi. Mai l'etichetta generica da sola, mai riusare il valore di un sito per
  popolare l'altro.

**IL RISCHIO DI COLLAUDO, MESSO PER ISCRITTO INVECE CHE SCOPERTO DOPO.** Fabrizio
non sa usare il plicometro, quindi **non può collaudare sul campo** — e la lezione
del 29 luglio dice che su questo genere di lavoro il collaudo vero è guardare il
risultato reale, non il test verde. Le tappe sono state ordinate perché quel
rischio cada il più tardi possibile: 1-2 (registro e grafico) sono deterministiche
e verificabili a tavolino, 3-5 richiedono giudizio clinico. Fra la 2 e la 3 c'è una
fermata esplicita. Contromisure: collaudo numerico delle equazioni nella
test-suite, un plicometro da €30 per provare l'interfaccia con due mani occupate,
e soprattutto **un collega che la usa già**.

**PERCHÉ QUESTA VOCE ESISTE ANCHE SE NON SI IMPLEMENTA SUBITO.** Fabrizio ha detto
che la farà "più in là nel tempo" e ha chiesto se poteva lasciare la chat aperta.
No: la sessione è effimera. Il ragionamento sta nel progetto Claude, ma **la
roadmap è l'unica cosa che una sessione futura legge per sapere cosa fare** —
senza la scheda, fra tre mesi il documento resta lì e nessuno lo va a cercare.
È l'incidente del 16 luglio (P62/P77 fatte ma roadmap ferma su "Da fare") girato
al contrario, e la lezione è la stessa: **il posto dove una decisione va scritta
non è dove è stata presa, è dove verrà cercata.**

**RAGIONAMENTO COMPLETO** (formule esatte con tutti i coefficienti, tabella
Durnin-Womersley per fascia d'età, modello dati, schermata di inserimento, sei
punti bibliografici da chiudere prima di codificare, fonti primarie):
`claude/NutriGest_Plicometria_Ragionamento.md` nel progetto Claude.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

29 LUGLIO 2026 (4) — P138: PULIZIA ESTETICA DELLA SCHEDA INBODY E ARMONIA FRA I RIQUADRI.
Test **410/410**. Baseline `79e6cf5`. Include la rigenerazione di INDEX.md.
Anteprima mostrata a Fabrizio PRIMA di consegnare, come chiesto da lui.

**LA REGOLA CHE HA GUIDATO TUTTO**, parole sue: *"ci deve essere armonia di
grandezza tra i grafici"*. Otto richieste puntuali, tutte accolte.

**LAYOUT.** Peso casalingo e Memoria paziente affiancati in cima (una colonna
sotto i 900px): prendevano una riga intera ciascuno, due fasce larghe quanto lo
schermo prima ancora del primo grafico. Nella Memoria i delta scendono a una riga
di testo piccolo — li' quello che serve e' il pulsante dell'ascolto. L'analisi
segmentale non prende piu' la riga intera: sta a meta' con accanto la tendina
"Tutte le misurazioni", che **resta a meta' anche da aperta** (scelta di
Fabrizio) e scorre di lato.

**VIA IL TESTO DI SERVIZIO.** La fascia verde "Dal … ad oggi" (gli stessi tre
numeri sono nelle tessere del primo grafico) e SETTE didascalie sotto i grafici,
piu' la riga "Media reale …" dal piede del Ritmo. Le date e le fonti non
spariscono: salgono nella testata del riquadro (`.ib-hd-sub`).

**ARMONIA, IN NUMERI.** Le altezze stavano fra 234 e 360px: tempo 262→300,
qualita' max 360→320, barre 340→320, ritmo 306→290 (senza il piede), forme
234→286. `.ib-g2col` passa ad `align-items:stretch`, cosi' due riquadri accanto
finiscono alla stessa altezza.

**TRE COSE SALVATE DALLA CANCELLAZIONE, PERCHE' NON ERANO DIDASCALIE.**
- `muscolo −0,01 kg/sett` era **solo** nella riga tolta dal Ritmo: e' salito in
  testata accanto a "Media grasso". Toglierlo avrebbe tolto un numero, non un
  commento.
- Il **tratteggio** delle barre (periodo sotto le 3 settimane) restava senza
  spiegazione: e' diventato un quadratino nella legenda in alto.
- La **fonte delle fasce** di Peso·Muscolo·Grasso (regola 14) e' passata nella
  testata: "fasce dagli intervalli del referto".

**COSA SI PERDE, DETTO A FABRIZIO PRIMA E DA LUI ACCETTATO.** Nella Mappa della
qualita' i pallini restano numerati ma l'elenco `1 22 ago→3 set · …` non c'e'
piu': la data del periodo si legge solo col passaggio del mouse o col tocco.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

29 LUGLIO 2026 (3) — P137: I GRAFICI ALLA PROVA DEI 25 REFERTI VERI DI UNA PAZIENTE.
Test **410/410**. Baseline `c897a5a`. Include la rigenerazione di INDEX.md.
P133 COLLAUDATA lo stesso giorno: primo import reale con gli intervalli letti dal
referto, la card "Peso · Muscolo · Grasso" compare e riconosce la Forma a C.

Il collaudo vero e' arrivato da una paziente con 25 misurazioni: periodi da 12
giorni ad anni, un dato anomalo (+24 kg di muscolo in una misurazione), ±35 kg
di escursione. Quattro difetti, quattro rimedi:

**1. `_ibPasso` — il passo degli assi si adatta.** Prima era fisso per grafico
("passo 2 sopra i 6 kg"): con ±35 kg uscivano piu' di trenta etichette una
sull'altra. Ora escono sempre ~5-8 etichette (passi 1·2·5 per potenza di dieci),
su Composizione nel tempo, Ritmo, Mappa della qualita' e Adiposita'.

**2. Scorrimento anche per Composizione nel tempo e Adiposita' centrale.**
Scelta di Fabrizio ("ogni misurazione ha il suo spazio"). Parte solo oltre le 8
misurazioni: sotto, il layout di oggi non cambia di un pixel.

**3. Ritmo — la scala segue il GROSSO dei dati (85° percentile).** Un solo
periodo anomalo da ±3 kg/sett schiacciava tutte le barre in una striscia. Le
barre tagliate hanno il marcatore ▲/▼ e il conteggio e' scritto NEL grafico: si
taglia, mai in silenzio. Le scritte "12 gg" sotto le barre piu' strette di 30px
non si stampano (lineetta rossa e tocco restano).

**4. Testi che si accavallavano.** Le date sotto l'asse ora si scelgono sui
PIXEL e non contando le misurazioni (con l'asse del tempo reale due referti
ravvicinati fondevano "22 ago" con "24 set"); le etichette di fine curva si
scansano se le curve convergono, col trattino agganciato al punto vero; "kg"
non si stampa piu' sopra il tick piu' alto della Composizione a barre.

Verificato su: paziente sintetica 25 misurazioni (PC e iPhone), paziente da 7
(nessuna differenza rispetto a ieri), test suite completa.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

29 LUGLIO 2026 (2) — P136: I GRAFICI INBODY DISEGNATI ALLA LARGHEZZA VERA · FILTRI DI PERIODO RIMOSSI.
Test **410/410**. Baseline `bea7fef`. Include la rigenerazione di INDEX.md.

**P136 — IL DIFETTO CHE SI "RIPARAVA" CAMBIANDO LO ZOOM.** Fabrizio: aprendo la
scheda InBody i grafici uscivano giganti e sgranati; scendendo a 90% e tornando a
100% si vedevano bene. **Causa:** `renderPdInbody` gira da `openPaz` **mentre la
linguetta InBody è ancora nascosta**, dove `clientWidth` vale 0; `_ibDisegnaSvg`
cadeva sul ripiego 240–320 px, disegnava piccolo e il CSS (`width:100%`) stirava
l'SVG fino alla larghezza vera. Misurato sulla versione pubblicata: **stiramento
2,02×** su tre riquadri su cinque. Il cambio di zoom "riparava" perché `resize`
era l'unico evento che faceva rientrare il codice.
**Correzione:** (a) sotto gli 80 px **non si disegna** — una larghezza inventata è
peggio di un riquadro vuoto per un istante; (b) `ResizeObserver` su `#pd-inbody`
che ridisegna appena arriva la larghezza vera; (c) `data-ibw` ricorda la
larghezza già usata, così l'osservatore non gira a vuoto.
**Perché è durato settimane:** in collaudo la scheda veniva **sempre resa
visibile prima di disegnarla**, cioè la prova non ripeteva il percorso reale
dell'utente. Il test nuovo la costruisce da nascosta, la mostra e verifica che
larghezza-riquadro / larghezza-disegno faccia 1,00.

**P134 (a) RIMOSSA, LO STESSO GIORNO.** Fabrizio, dopo averla usata: *"non mi
piace questa modifica che hai fatto con i 3 filtri, voglio tornare come era
prima"*. Via la riga di pulsanti, il CSS e la separazione archivio/finestra: la
scheda mostra sempre tutte le misurazioni. **Resta il tocco (parte b), che non
era in discussione.** Da ricordare: il problema di partenza — 25 referti
illeggibili — era già risolto dallo scorrimento laterale; il filtro aggiungeva un
comando in cima alla scheda per un fastidio che in visita non si sente.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

29 LUGLIO 2026 — P134 CHIUSA: FILTRI DI PERIODO E LETTURA DEI VALORI COL TOCCO.
Test **410/410**. Baseline `a9db8d3`. Include la rigenerazione di INDEX.md.

**(a) I PULSANTI 6 MESI · 1 ANNO · 2 ANNI · TUTTO.** Filtrano tutti i grafici
insieme, default "Tutto". Tre decisioni che contano più del codice:
- **Il taglio parte dall'ultima misurazione, non da oggi.** `_ibFiltraPeriodo`
  guarda indietro dall'ultimo referto: un paziente che non viene da un anno
  altrimenti vedrebbe "6 mesi" vuoto, cioè un grafico bianco al posto della sua
  storia.
- **Archivio e finestra sono due variabili diverse.** `sortedTutte` è tutto,
  `sorted` è ciò che l'utente ha scelto. I grafici usano la finestra, **la
  tabella in fondo e i conteggi usano sempre l'archivio**: l'etichetta "Tutte le
  misurazioni (N)" resta vera qualunque pulsante sia premuto.
- **Niente troncamenti silenziosi.** Sotto i pulsanti c'è sempre scritto quante
  misurazioni si vedono su quante, con "le altre restano a un clic, non sono
  cancellate". Un pulsante che lascerebbe meno di 2 misurazioni è disattivato e
  dice il motivo; la barra non compare sotto le 4 misurazioni; cambiando paziente
  si riparte da "Tutto".

**(b) IL TOCCO SU IPHONE.** Un solo `pointerdown` che ignora
`pointerType==='mouse'` e **riusa gli stessi bersagli invisibili e la stessa
etichetta del desktop**: nessun testo mantenuto in due posti, nessuna soglia di
pressione prolungata da indovinare. L'etichetta esce **sopra il dito** — sotto,
sarebbe coperta proprio dalla mano che l'ha aperta — e si chiude toccando fuori,
allo scorrimento o dopo 5 secondi.

**TRE COLLISIONI DI TESTO TROVATE SOLO GUARDANDO IL RENDER A 430px.** Nessun
test le vedeva, nessun errore in console: didascalia della mappa qualità
sovrapposta al titolo dell'asse; "NELLA NORMA" più larga della fascia che
etichetta; fonti dell'adiposità centrale tagliate dal bordo destro. È la stessa
lezione di `_IBC.whr` di ieri — **su una grafica scritta a mano, il collaudo è
guardare l'immagine**: il codice che non fallisce non è codice che funziona.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

28 LUGLIO 2026 (n) — P132 CHIUSA (scelta b): LA FASCIA DEL RITMO SEGNALA SOLO IL LATO PERICOLOSO · ANALISI SEGMENTALE RIMESSA IN RIGA.
Test **410/410**. Baseline `f49f015`. Include la rigenerazione di INDEX.md.

**P132 — LA FASCIA SI CALCOLA SUL PAZIENTE.** `_ibFasciaRitmo(peso)` = 0,3–0,7%
del peso a settimana in massa grassa. La fascia fissa uguale per tutti dava un
falso allarme "stai calando troppo in fretta" a chi pesa 113 kg e perde 0,45
kg/sett, che va benissimo. **Senza peso non si disegna nessuna fascia** — non si
inventa un riferimento.

**LA SCELTA DI FABRIZIO È LA (b): il colore d'allarme segnala SOLO il lato
pericoloso.** Calo più rapido del consigliato (zona ambra sotto la fascia) e
muscolo che scende: quelli prendono un ⚠ sulla barra, con il motivo nel
passaggio del mouse. **Andare più piano non si colora affatto.**
*Il perché conta più della regola:* un paziente lento vedeva la barra fuori dal
verde a ogni apertura della scheda — un rimprovero a ogni visita per un fatto che
spesso non dipende da lui. Sul paziente di prova, al 15% di grasso, sarebbe
uscito "sotto il ritmo" praticamente sempre. Nella stessa logica la riga della
proiezione all'obiettivo passa da ambra a **neutra**: "vale la pena riparlarne in
visita" invece di "è il ritmo da rivedere".

**DUE TARATURE CHE SEMBRANO DETTAGLI E NON LO SONO.**
- **La scala segue i DATI, non la fascia.** Al primo tentativo la finestra si
  allargava per contenere tutta la fascia consigliata: su un paziente magro,
  la cui fascia sta molto più in basso delle sue barre reali, **tutte le barre si
  schiacciavano nella metà alta del grafico**. Ora la scala resta sui dati, la
  fascia viene tagliata al bordo e — se il limite rapido finisce fuori — c'è
  scritto a schermo che è fuori scala. Stessa scelta già fatta per le soglie del
  viscerale in P131.
- **La soglia del muscolo in calo è ritmo E quantità insieme** (`rm < −0,03` **e**
  `dm < −0,25 kg`). Con la sola soglia sul ritmo, 0,15 kg persi in sette settimane
  — cioè rumore di misura — accendevano il ⚠. Un allarme che si accende sul
  rumore smette di essere un allarme.

**ANALISI SEGMENTALE: A RIGA INTERA SOLO SE RESTEREBBE DA SOLA.** Fabrizio l'ha
vista scendere sotto invece di stare accanto all'adiposità. Causa: il grafico
delle forme (P133) non compare sui referti già importati — non hanno gli
intervalli — quindi i riquadri sopra erano **5, dispari**, e il segmentale a riga
intera lasciava un buco. Ora la larghezza si decide contando i riquadri
effettivamente presenti: se sono dispari, il segmentale prende il posto libero
accanto all'ultimo. *Lezione:* una regola di layout scritta sul caso "tutto
presente" si rompe al primo riquadro condizionale.

**COLLAUDATO DA FABRIZIO:** l'ingrandimento a tutto schermo dei riquadri funziona.

28 LUGLIO 2026 (m) — P133 TAPPA 1+2: GLI INTERVALLI DAL REFERTO E IL GRAFICO DELLE FORME · MISURAZIONI IN TABELLA · INGRANDIMENTO A TUTTO SCHERMO.
Test **410/410**. Baseline `5f1167b`. Include la rigenerazione di INDEX.md.

**P133 — DA DOVE NASCE.** Fabrizio mostra in visita il grafico InBody
"Analisi Muscolo-Grasso" (tre asticelle peso / muscolo / grasso con zone
Sotto-Normale-Sopra) e ne spiega le forme: **a C** (peso e grasso alti, muscolo
basso), **a D** (peso contenuto, tanto muscolo, poco grasso), o le tre asticelle
**equivalenti**. Voleva la stessa cosa in NutriGest.

**PERCHÉ NON SI POTEVA COPIARE — e il motivo vero non è legale.** L'idea e la
lettura clinica non sono proteggibili, la grafica sì: una versione nostra si può
fare. Ma le asticelle InBody sono in **percentuale rispetto a un valore
"standard" calcolato da una formula loro che non abbiamo**. Ricostruire quella
scala avrebbe significato inventarsi il denominatore — cioè rifare l'errore del
livello 15 un'ora dopo averlo scoperto.

**LA VIA D'USCITA ERA GIÀ IN CASA.** Il referto **stampa gli intervalli tra
parentesi** accanto a ogni valore (`Peso (kg) 79,1 ( 55,3~74,8 )`), e NutriGest
ha già questa disciplina per il sangue: *"sul referto del paziente fa sempre fede
il range del laboratorio"*. Estesa all'InBody.
- **Tappa 1** — il prompt di `loadInbodyPDF` chiede anche `riferimenti` (peso,
  muscolo, grasso, acqua, metabolismo, cintura/fianchi, viscerale), con l'esempio
  del formato preso dal referto reale di un paziente. `_ibPuliRiferimenti`
  **scarta** un intervallo malformato invece di aggiustarlo (min≥max, non
  numerico, negativo): meglio nessun riferimento che uno inventato. Gli intervalli
  non hanno un campo nel modale — appartengono al referto, non ai valori — quindi
  viaggiano in `window._ibRifImport`, azzerato da `openInbody` (altrimenti un
  import lascerebbe in giro i riferimenti del paziente precedente) e scritto da
  `salvaInbody` in `ib.rif`.
- **Tappa 2** — `_ibGrForme`: le tre fasce di riferimento sono **allineate nella
  stessa colonna** (è questo che fa emergere la forma), e `_ibFormaDi` **riconosce
  la forma e scrive la frase** che Fabrizio direbbe a voce. Quest'ultima parte è
  ciò che rende il grafico nostro e non loro: InBody la forma non la nomina.
  **Il grafico non compare se il referto non ha stampato gli intervalli** — senza
  denominatore non si disegna niente, e tutto il resto della scheda resta com'è.

**MISURAZIONI IN TABELLA (scelta di Fabrizio).** Le card una-per-referto erano
~1200px di numeri che i grafici sopra hanno già raccontato, e con 25 referti
diventavano una pagina infinita. Ora: una **tabella dentro un `<details>` chiuso**.
Il guadagno non è solo lo spazio — *"le card non si potevano confrontare"*: per
seguire l'acqua bisognava saltare da un riquadro all'altro, mentre **una tabella
si legge in colonna**. Decimali fissi per colonna, perché "79" accanto a "78,1"
spezza l'allineamento della virgola.

**INGRANDIMENTO A TUTTO SCHERMO** su ogni riquadro (⤢ in alto a destra).
*Perché un overlay nostro e non la Fullscreen API:* su iPhone Safari la modalità a
schermo intero funziona **solo sui video**, quindi l'API non servirebbe proprio
dove serve di più. Il riquadro viene clonato e **il grafico ridisegnato alla
larghezza grande** — non è uno zoom dell'immagine, è lo stesso disegno rifatto:
`_ibDisegnaSvg` ora accetta una radice.
Analisi segmentale spostata a **riga intera** (`.ib-wide`): sono due figure
affiancate e in mezza colonna stavano strette.

**RESTA APERTO.** P132 aspetta la decisione clinica di Fabrizio (la fascia del
ritmo deve giudicare anche la lentezza, o solo il lato pericoloso?). P134
(filtri di periodo + tocco per leggere i valori su telefono) non toccata.
**Da collaudare con un import vero:** la tappa 1 è scritta ma non è mai passata
per una chiamata AI reale — il primo referto importato è il collaudo.

28 LUGLIO 2026 (l) — P131 CHIUSA: ADIPOSITÀ CENTRALE SENZA PIÙ SOGLIE SENZA FONTE, SCALE CHE SI ADATTANO AL PAZIENTE, MAPPA CHE SI APRE A VENTAGLIO.
Test **410/410**. Baseline `02120b5`. Include la rigenerazione di INDEX.md.

**LA COSA PIÙ IMPORTANTE DI QUESTA SESSIONE NON È UN GRAFICO.** Fabrizio ha
chiesto: *"perché hai aggiunto il livello 15 come rischio? il mio InBody dà 1–9"*.
Controllando: le soglie **&lt;10 sicuro / 10–14 attenzione / ≥15 rischio** erano già
in produzione **prima** di questa sessione (verificato sul commit `f54cfb0`), e nel
CHANGELOG non esisteva nessuna voce che dicesse da dove venissero. Io le avevo
**ereditate e ricopiate** nei grafici nuovi senza chiedermi la fonte.
È esattamente la regola 14, applicata male da chi l'aveva appena scritta.
**Correzione:** le soglie ora vivono in `_IB_RIF` **con la fonte accanto al valore**,
e la fonte **arriva fino allo schermo** (riga sotto il grafico). Il 10/15 è stato
rimosso: il referto dichiara 1–9 e la macchina del paziente vince.
Per il rapporto cintura/fianchi restano i valori OMS (0,80–0,90 uomo · 0,75–0,85
donna) — hanno una fonte, che ora è scritta — con **entrambi** i limiti mostrati.

**P131 — ADIPOSITÀ CENTRALE (era l'ultimo grafico su Chart.js).**
- **Le scale si adattano al paziente.** Richiesta di Fabrizio, e ha ragione: una
  scala fissa 0–20 rende invisibili 0,5 livelli di viscerale su un paziente magro.
  `_ibFinestra` parte dai valori del paziente con un'ampiezza minima (2 livelli /
  0,04) e si allarga per includere una soglia se è a portata.
- **Ma lo zoom automatico è la stessa cosa che faceva sembrare un crollo un calo di
  0,7 livelli**, quindi arriva con due contrappesi obbligatori: il **righello
  clinico completo** di fianco (`_ibRighello`, con evidenziata la finestra che si
  sta guardando) e la **variazione scritta in numeri** a fine curva. Se il grafico
  dice "−0,9 lv." nessuno legge un crollo in una linea che scende.
- Numeri degli assi colorati come le rispettive linee (idea di Fabrizio): risolve
  "quale righello è di chi", che prima andava dedotto.
- Con questo **la scheda InBody non usa più Chart.js per nessun grafico.**

**MAPPA DELLA QUALITÀ.** Il numero del periodo è ora **sempre scritto**, anche sui
punti vecchi: a sbiadire è solo il colore del pallino. Quando più periodi cadono
quasi nello stesso punto il gruppo **si apre a ventaglio** al passaggio del mouse o
al tocco, e ogni pallino resta legato alla posizione vera da **un filo sottile** —
spostare un dato, anche per un attimo, è disegnarlo dove non è: il filo è ciò che
rende leggibile il trucco invece di renderlo una bugia.

**MOLTE MISURAZIONI.** Provato con 25 referti su 3 anni: i grafici non si rompono
allo stesso modo. L'andamento nel tempo regge (migliora); le barre reggono ma le %
di idratazione si accavallano; **Ritmo e Composizione a barre si rompono**. Ora,
quando non ci stanno, si disegnano più larghi e la card **scorre di lato** con
l'avviso "trascina per vedere tutte le N misurazioni". Nessun troncamento
silenzioso: è la stessa regola del "niente valori di ripiego muti".

**UNA LEZIONE DI METODO, PICCOLA E COSTOSA.** La curva del rapporto cintura/fianchi
non si disegnava: usavo `_IBC.whr`, che **non esisteva** nella palette. `_ibEl`
salta gli attributi `undefined`, quindi lo `stroke` spariva e la linea diventava
invisibile — **nessun errore in console, nessun test rosso**. L'ha trovata solo il
render con Playwright guardato a occhio. *Regola:* su un motore che costruisce SVG
per concatenazione di stringhe, una chiave di palette sbagliata è un guasto
silenzioso — il controllo che lo intercetta è guardare l'immagine, non leggere il log.

**RIMANDATO (con motivo).** Il grafico a tre asticelle peso/muscolo/grasso che
Fabrizio usa in visita (forme a C / a D / equivalenti) → **P133**: non si può
copiare la scala InBody perché è in % di uno "standard" calcolato da una formula
loro che non abbiamo, e inventarsi il denominatore sarebbe il livello 15 daccapo.
La via giusta è leggere gli **intervalli stampati sul referto** (`109,8 ( 52,8~71,4 )`),
come già si fa per il sangue. Serve prima quella modifica all'import.
Filtri di periodo e tocco-per-leggere-i-valori → **P134**. P132 attende una
decisione clinica di Fabrizio.

28 LUGLIO 2026 (i) — GRAFICI INBODY: RIFINITURE DOPO IL COLLAUDO DI FABRIZIO SUI DATI VERI.
Test **410/410**. Baseline `359db86`. Include la rigenerazione di INDEX.md.

Quattro correzioni nate dal guardare la scheda con un paziente reale, non con i
dati di prova. Nessuna era prevedibile a tavolino.

1. **Ordine dei riquadri** — "Composizione — peso, pezzo per pezzo" e "Adiposità
   centrale" si scambiano di posto (scelta di Fabrizio: la composizione sta meglio
   accanto all'andamento nel tempo). Colta l'occasione per rendere l'ordine
   **dichiarato in un punto solo**: i riquadri si costruiscono in variabili
   (`_cTempo`, `_cBarre`, `_cRitmo`, `_cQual`, `_cAdip`) e si assemblano in
   `_cOrdine`. Spostare una card ora è riordinare una lista, non muovere blocchi
   di template dentro `renderPdInbody`.

2. **Numeri della card "Composizione corporea nel tempo" riportati alla taglia
   delle altre tessere** (1.1rem, come "Memoria paziente"). Erano stati ingranditi
   su richiesta di Fabrizio nel giro precedente; visti in pagina si staccavano dal
   resto invece di dare risalto. *La lezione è sul metodo, non sul CSS:* una
   richiesta di dimensione va vista renderizzata nel contesto vero prima di darla
   per buona — un'anteprima costa pochi minuti e ha evitato un secondo commit.

3. **Proiezione all'obiettivo con un tetto (`_IB_MAX_SETT` = 52).** Con questo
   paziente usciva «Mancano 2,8 kg · circa 150 settimane al ritmo reale»: quasi tre
   anni. Il numero era corretto (media peso quasi zero) ma è **la stessa famiglia
   del «−4,9 kg/sett»**: preciso all'apparenza e inutile nella sostanza, su una
   scheda che il paziente può vedere. Oltre l'anno non si dà più un numero e si
   dice la cosa utile — che è il ritmo a dover cambiare. Terzo caso, dopo la soglia
   dei 21 giorni: **un calcolo giusto su un input che non regge il calcolo produce
   un numero che mente lo stesso.**

4. **Etichette delle date sotto le barre del Ritmo, uniformate alla sola data di
   fine.** Prima la larghezza della barra decideva il formato: «6 ott → 24 nov» sui
   periodi larghi, «7 mag» su quelli stretti. Due formati sulla stessa riga fanno
   sembrare un errore quello che era solo mancanza di spazio. La data di partenza è
   passata nella didascalia sotto il grafico, dove non collide con niente.
   Conseguenza da non dimenticare: con le date attive anche a colonna stretta, la
   fascia sotto il grafico ospita 4 righe più la nota sul tratteggio — `Bm` a 96px
   sul mobile e la nota su riga propria, altrimenti si sovrappongono (visto e
   corretto nell'anteprima iPhone prima di consegnare).

28 LUGLIO 2026 (h) — GRAFICI INBODY RIFATTI (P99): ASSE DEL TEMPO VERO, NIENTE PIÙ DOPPIO CONTEGGIO DELL'ACQUA, SCHEDA A 2 COLONNE.
Test **410/410**. Baseline `f54cfb0`. Include la rigenerazione di INDEX.md.

**COME È NATA.** Fabrizio ha chiesto di alzare la qualità dei singoli grafici
InBody prima del restyling generale. Il caso di prova è stato un paziente con
7 misurazioni: guardando i grafici con quei dati sono venuti fuori tre difetti,
di cui due NON estetici.

**I TRE DIFETTI.**
1. **L'asse del tempo non era il tempo.** Le misurazioni erano posizionate per
   indice dell'array, non per data. Tra 24 nov e 12 feb passano 80 giorni, tra
   24 giu e 25 giu ne passa 1: il grafico li disegnava larghi uguale. Chi guarda
   legge una storia che nei dati non c'è.
2. **Doppio conteggio dell'acqua — difetto di sostanza.** Il grafico a barre
   impilava `grasso + muscolo + acqua`, ma l'acqua corporea totale sta DENTRO la
   massa magra. Risultato: barre da ~100 kg per un paziente di 79. Il totale
   mostrato non era il peso di nessuno.
3. **«Ultimo: −4,9 kg/sett» era un numero falso.** Lo produceva l'ultimo periodo
   di 1 giorno: 0,7 kg diviso 1/7 di settimana. Un numero drammatico, sbagliato,
   e visibile al paziente. Stessa famiglia dei bug P118/P120: un calcolo corretto
   su un intervallo che non regge il calcolo.

**COSA È STATO FATTO.**
- **Motore SVG proprio** (`_ibGrTempo`, `_ibGrRitmo`, `_ibGrQualita`, `_ibGrBarre`,
  dispatcher `_ibDisegnaSvg`). *Perché non Chart.js:* servivano asse del tempo
  reale, barre larghe quanto la durata del periodo, nastri di collegamento tra
  barre e una mappa a quadranti — forme che Chart.js non fa senza plugin.
  **L'adiposità centrale (ib-c2) resta su Chart.js**, invariata: lì non serviva.
- **G1 · Variazione dal punto di partenza.** Prima: tre linee (80 / 38 / 12 kg)
  su un asse 0–90, dove 3 kg di variazione erano alti pochi pixel e il grafico
  diceva "fermo" mentre il paziente faceva ricomposizione. Ora le curve partono
  tutte da zero e l'asse mostra i kg CAMBIATI: la forbice grasso↓ / muscolo↑ è
  il grafico da girare verso il paziente che dice «ma la bilancia non scende».
  Tolta la "traiettoria ideale" (era quasi sovrapposta al peso, si perdeva);
  l'informazione sull'obiettivo resta nella card Ritmo.
- **G3a · Ritmo a barre a specchio.** Zero al centro (muscolo sopra, grasso
  sotto), valori in kg/settimana, **larghezza della barra = durata del periodo**,
  fascia verde del ritmo consigliato. **Soglia `_IB_MIN_GG` = 21 giorni:** sotto
  quella durata il ritmo settimanale non si mostra, non entra nella media e la
  barra è tratteggiata. La media in testata ora è onesta (somma delle variazioni
  dei periodi attendibili / somma delle loro settimane), non la media delle medie.
- **G3b · Mappa della qualità.** Quadranti Δgrasso × Δmuscolo, un punto per
  periodo grande quanto la sua durata: risponde a «questo periodo è stato di
  qualità?», domanda che due barre affiancate non facevano leggere a colpo d'occhio.
- **G4 · Composizione = peso, pezzo per pezzo.** Stack `resto della magra +
  muscolo + grasso`, che somma **esattamente al peso**. L'acqua esce dalla pila e
  diventa una striscia separata in % della massa magra (atteso 72–74%): così un
  calo di acqua non viene più scambiato per un calo di muscolo. Nastri di
  collegamento tra barre consecutive per far vedere il movimento.
- **Layout `.ib-g2col`:** 6 riquadri su 2 colonne da PC (≥900px), 1 sola colonna
  su telefono — la vista iPhone resta identica a prima nella struttura, com'era
  richiesto. La scheda si accorcia di circa metà pagina.
- **Colori:** massa grassa passa da `#E24B4A` a **terracotta `#DD5A33`**. La coppia
  rosso/verde precedente era sotto la soglia di separazione per il daltonismo
  rosso-verde (ΔE deutan 7,2 contro 8 richiesto); il terracotta passa tutti i
  controlli mantenendo il significato "caldo = grasso".

**DUE COSE IMPARATE, DA NON RIFARE.**
- **Le linee morbide vanno bloccate dentro il segmento.** `_ibCurva` è una
  Catmull-Rom con i punti di controllo limitati (`_ibClamp`) al segmento tra i due
  dati. Senza il blocco, con l'asse del tempo REALE due misurazioni a un giorno di
  distanza fanno scavalcare la curva sopra il valore vero: il grafico disegna un
  massimo che non esiste. La `tension:.35` di Chart.js aveva lo stesso rischio ma
  non si vedeva perché i punti erano equidistanti — **è l'asse del tempo corretto
  ad aver reso visibile il problema, non ad averlo creato.**
- **Il segno si decide sul valore già arrotondato.** `_ibSg` arrotonda PRIMA di
  scegliere `+`/`−`: i cicli che generano le tacche degli assi accumulano errore
  in virgola mobile e producevano etichette come «−0,00».

**RESTA APERTO (non toccato, segnalato a Fabrizio).**
- **«Adiposità centrale» ha due assi verticali** (0,85–0,93 a sinistra, lv.3–lv.5
  a destra). Due scale sullo stesso disegno fanno sembrare correlate due curve che
  non lo sono: è l'errore più comune nei grafici. Da rifare con lo stesso metodo.
- La **fascia di ritmo consigliato** (`_IB_RITMO_OK`, −0,10 / −0,35 kg/sett) è
  fissa: andrebbe calcolata sul peso e sull'adiposità del paziente.

28 LUGLIO 2026 (g) — COMPORTAMENTO ALIMENTARE: CRISI DI FAME E CIBI PREFERITI ENTRANO NELLE AI.
Test **410/410**. Baseline `b45920b`. Include la rigenerazione di INDEX.md (vedi in fondo).

**IL PROBLEMA, TROVATO PARTENDO DA UNA DOMANDA DI FABRIZIO.** "Quali testi che
inserisco entrano nella valutazione AI, e con che gerarchia?" L'audit ha trovato
tre campi raccolti in visita e mai riletti: **Crisi di fame** era completamente
morto (nessuna AI, e nemmeno visibile nella scheda anamnesi: lo scrivevi e non lo
rivedeva nessuno, neanche tu); **Cibi preferiti** e **Non rinuncia a** si
vedevano solo nella scheda. In particolare il generatore di piani conosceva i
gusti del paziente SOLO dal semaforo alimentare — che dice cosa e' *permesso*,
non cosa il paziente *ama*: due cose diverse, e la seconda regge l'aderenza.

**COSA E' STATO FATTO.**
1. **Crisi di fame semi-strutturata** — caselle di fascia (mattina, pomeriggio,
   sera, dopo cena, notte) -> `p.crisiFasce[]`, piu' la nota libera che resta in
   `p.crisi`. `crisiFameTesto(p)` e' la sorgente unica del testo combinato.
   *Perche' caselle e non testo libero:* la fascia deve diventare un vincolo
   operativo nel generatore, e una regola meccanica non puo' dipendere da come e'
   scritta la frase in visita. `CRISI_AZIONI` traduce fascia -> istruzione di
   distribuzione.
2. **Ragionamento clinico** — crisi, preferiti e non-rinuncia entrano in
   `costruisciContestoPaziente`, ciascuno con la sua chiave di lettura.
3. **Generatore di piani** — blocco nuovo "COMPORTAMENTO ALIMENTARE E
   PREFERENZE", tenuto SEPARATO da VINCOLI CLINICI e dichiarato subordinato ad
   esso. Le crisi spostano solo la DISTRIBUZIONE (totale e macro invariati, e
   solo sui pasti attivi: se il pre-nanna non e' attivo la quota va sulla cena).
   I preferiti sono preferenza DENTRO gli alimenti autorizzati: se un preferito
   non e' in lista va ignorato in silenzio. Ereditato in automatico dal prompt
   delta e dal giorno speciale, che riusano `costruisciPrompt`.
4. **Scheda anamnesi** — "Crisi di fame" ora e' visibile accanto ai preferiti.

**LA DECISIONE PIU' IMPORTANTE E' STATA UN NO: il contesto emotivo NON entra nel
generatore.** Tre motivi, in ordine di peso: (a) il piano lo legge il PAZIENTE —
"storia di fallimenti precedenti" che filtra nel testo generato e' un danno
serio, e i modelli editorializzano quando ricevono contesto emotivo; (b) diluisce
i vincoli duri in un prompt gia' lunghissimo, e il punto dove il generatore gia'
fatica e' il budget carboidrati keto; (c) **ci arriva gia', per la strada
giusta** — contesto emotivo -> AI di ragionamento -> giudizio del medico ->
riassunto -> blocco "DECISIONI CLINICHE DEL MEDICO" con priorita' assoluta nel
prompt del piano.

**CRITERIO GENERALE DA RIUSARE.** Al generatore vanno in corsia diretta solo i
dati che sono gia' **istruzioni meccaniche** (una fascia oraria e' una regola di
distribuzione). I dati che richiedono **interpretazione** passano dal ragionamento
clinico e dal filtro del medico. La domanda giusta prima di aggiungere qualcosa
al prompt del piano non e' "e' un dato utile?" ma "e' gia' un'istruzione?".

**LEZIONE DI PROCESSO — INDEX.md e i test sulle modifiche "banali".** Il commit
precedente (`b45920b`, tre caselle integratori) aveva spostato ~13 righe e
disallineato INDEX.md: il test `s1-doc-allineata` era gia' rosso su main prima di
questa sessione, e non era stato visto perche' la modifica sembrava troppo
piccola per meritare la suite. **Non esiste una modifica troppo piccola per far
girare i test:** basta inserire righe per rompere un file di documentazione che
un'altra sessione usera' per navigare il codice. INDEX.md rigenerato qui
(`node rigenera-index.js`, 767 voci) e incluso nel commit.

28 LUGLIO 2026 (f) — INTEGRATORI: 3 NUOVE CASELLE (LEUCINA, PAPPA REALE, BETA-ALANINA).
Baseline `55e3b8a`. Modifica minima, nessun test toccato.

**COSA.** Aggiunte tre voci al gruppo chip "Integratori" della scheda paziente,
in coda alle voci sportive (dopo EAA): Leucina (`leuc`), Pappa reale (`pappar`),
Beta-alanina (`betaala`). Come tutte le altre hanno la doppia casella
"Prende già" (teal) / "Vorrebbe prendere" (arancio).

**COME.** Due soli punti toccati, perché l'architettura del blocco integratori è
già data-driven: `INTEGR_KEYS` + `INTEGR_LABELS` guidano get/set e tutti i
consumatori a valle (contesto AI, riepilogo, PDF, prompt) leggono da lì. Quindi
è bastato: (1) i tre `<div class="chip-pill">` nell'HTML con gli id
`int-<key>`/`inw-<key>`; (2) le tre chiavi in `INTEGR_KEYS` e le tre etichette in
`INTEGR_LABELS`. Nessuna migrazione dati necessaria: i pazienti esistenti hanno
semplicemente le nuove caselle spente (`setIntegratori` fa `includes` su una
lista che non contiene le nuove etichette → `false`).

**LEZIONE (conferma, non nuova).** Il costo di questa aggiunta è stato basso
perché le etichette vivono in UN posto solo. Ogni volta che si è tentati di
scrivere a mano "EAA (essenziali)" in un punto a valle (PDF, prompt AI), si sta
creando la doppia fonte che rende cara l'aggiunta successiva: verificato con
grep che i label degli integratori compaiono solo nell'HTML dei chip e in
`INTEGR_LABELS`.

28 LUGLIO 2026 (e) — CLAUDE.md: REGOLA 14 SULLE FONTI DEI DATI CLINICI.
Solo documentazione, nessun codice toccato. Test invariati (410/410).

Codificata come regola permanente la lezione della verifica FODMAP del 28/7
(doc `NutriGest_FODMAP_Verifica_Perplexity.md`): su un dato clinico di
laboratorio né la memoria di un'AI né un motore di ricerca AI sono una fonte —
il controllo incrociato ha mostrato errori da entrambe le parti, e Perplexity
citava Alibaba/Scribd dichiarando Monash. Serviva in CLAUDE.md perché è
esattamente il tipo di errore che una sessione futura rifarebbe in buona fede,
riempiendo con sicurezza le porzioni mancanti di `FODMAP_PORZIONI`. La regola
fissa tre punti: fonte primaria per ciò che si consegna al paziente, fonte+data
accanto a ogni valore, e voce di roadmap dedicata per i dati non verificati
(→ P130) invece di lasciarli passare come "i migliori che abbiamo".

28 LUGLIO 2026 (d) — P87 TAPPA 3: TAB "COMUNICAZIONE" — P87 CHIUSA.
Test 403 → **410** (nuovo `s2-comunicazione.test.js`, 7 test). Baseline `9e9f422`.

**COSA È STATO FATTO.** La 12ª tab della scheda paziente, "📨 Comunicazione",
nello scope onesto v1 della roadmap — resa possibile a basso costo dalle Tappe
1-2: è una VISTA su `p.invii[]`, non un motore nuovo.
1. **Template variabilizzati** — 5 di serie (promemoria appuntamento,
   pre-controllo con digiuno, richiesta peso, sollecito referto,
   incoraggiamento) + template personali salvabili ("💾 Salva come template",
   localStorage per-dispositivo come le varianti WA-AI: non sono dati clinici).
   Variabili: `{nome}` `{cognome}` `{appuntamento}` — quest'ultima compilata dal
   CALENDARIO REALE via `getEventi()` (visita, tappe dateCalendario, eventi
   manuali): primo appuntamento futuro del paziente, con ora se presente. Senza
   appuntamenti il segnaposto diventa un testo VISIBILE nel riquadro di
   anteprima ("(nessun appuntamento in calendario)"), mai un buco muto.
2. **Anteprima modificabile** — il testo compilato finisce in una textarea che
   Fabrizio può correggere prima dell'invio. Tre azioni: 💬 WhatsApp (wa.me col
   testo pronto), ✉️ Email (bozza mailto: i pazienti non hanno un campo email in
   scheda, il destinatario si sceglie nel programma di posta), 📄 Copia testo.
   Ogni azione registra `tipo:'messaggio'` nel diario (esiti nuovi: 'email',
   'copiato').
3. **Storico invii completo** — tutte le voci di `p.invii` in ordine inverso,
   con filtri a chip per tipo (📋 FODMAP · 🩸 esami · 🍽️ piano · ✨ AI ·
   💬 messaggi), esito e link "apri" dove c'è l'URL. È la prima volta che la
   domanda "cosa ho mandato a questo paziente?" ha una risposta completa a video.

**NON FATTO (deciso):** il passaggio dell'invio PIANO al motore a 3 livelli
resta fuori — richiede che `generaPDF` restituisca il doc invece di salvarlo
subito, ed è il cuore dell'app: voce separata, non un effetto collaterale di
questa tab. Business API: si rivaluta con P50, come da scheda.

**LEZIONE DI TEST (piccola ma da ricordare):** nello storico le etichette dei
tipi compaiono SEMPRE nei chip del filtro — un'asserzione "la stringa X non
c'è più dopo il filtro" deve usare stringhe che esistono solo nelle RIGHE
(url, conteggi), non le etichette. E un test che modifica stato condiviso
(`_comFiltro`) lo ripristina anche nel percorso di errore, o il test dopo
eredita il filtro sbagliato.

28 LUGLIO 2026 (c) — P87 TAPPA 2: TUTTI GLI INVII NEL REGISTRO UNICO, RICHIESTE ESAMI MIGRATE.
Test 394 → **403** (nuovo `s2-invii-registro.test.js`, 9 test). Baseline `db54f72`.
Verifica sul campo della Tappa 1 fatta da Fabrizio in Chrome: bottone ok, PDF ok.

**COSA È STATO FATTO.** Chiusa la promessa della Tappa 2: ogni cosa che parte
verso il paziente lascia traccia in `p.invii[]`.
1. **Piano alimentare** — `apriWhatsApp()` ora registra `tipo:'piano'` dopo
   l'apertura di wa.me (il PDF è scaricato da generaPDF un attimo prima). Copre
   tutti e 3 i bottoni WhatsApp del piano.
2. **Messaggi AI** — il link "📲 Apri in WhatsApp" del modal AI registra
   `tipo:'ai'` al click (`_aiWaRegistraClick`, legge il paziente da `_aiWaCtx`;
   try/catch: se qualcosa va storto il link si apre comunque).
3. **Richieste esami MIGRATE** — `p.richiesteAnalisi[]` (P116) confluisce in
   `p.invii[]` come `tipo:'analisi'`, conservando `voci[]` e `n` per il futuro
   confronto richiesto-vs-ricevuto. `_richRegistra` scrive nel registro unico;
   `_richStoricoHtml` legge da lì (stesso aspetto). Il campo vecchio viene
   ELIMINATO dopo il travaso (F4: la doppia fonte si elimina, non si affianca).
4. **Migrazione idempotente ovunque entrano dati** (regola 12, stesso schema di
   F9): `_inviiMigraPaziente/_inviiMigraTutti` agganciate a load iniziale, blob
   dal server (`_pazAssicuraBlob`) e import backup. Idempotenza per FIRMA
   (tipo|data|titolo|n|url): il blob di un dispositivo non aggiornato che
   rimette in circolo `p.richiesteAnalisi` non duplica nulla — necessaria
   perché la migrazione gira senza salvare, quindi può rieseguirsi più volte.
5. `_inviiOrdina` estratta: ordinamento+potatura del registro vivono in una
   funzione sola, usata da registrazione e migrazione (regola 10).

**PERCHÉ LA MIGRAZIONE ORA E NON IN TAPPA 3:** la vista Comunicazione dovrà
leggere UN registro, non federarne due; e ogni giorno passato con due registri
è un giorno in cui un invio può finire nel posto sbagliato. I lettori erano
solo 2 (`_richRegistra`, `_richStoricoHtml`) — inventario fatto prima di
stimare il rischio, come da regola 12.

**RESTA PER LA TAPPA 3:** la tab "Comunicazione" (vista completa su `p.invii[]`
+ template variabilizzati + wa.me/mailto). Nota onesta: l'invio del PIANO resta
sul canale vecchio (PDF scaricato + testo wa.me, allegato a mano) — portarlo
sul motore a 3 livelli richiede che `generaPDF` restituisca il doc invece di
salvarlo subito: da valutare in Tappa 3, non era nello scope del tracciamento.

28 LUGLIO 2026 (b) — P87 TAPPA 1: REGISTRO INVII + MOTORE DI INVIO + BOTTONE "ELENCO FODMAP".
Test 394/394. Baseline `7c22bb2`. INDEX rigenerato (27.459 → 27.704 righe).

**PERCHÉ E DECISIONE.** Fabrizio manda a mano, ai pazienti che chiamano gonfi, un
PDF con gli alimenti basso/alto FODMAP. Voleva un bottone che lo invii in
automatico e resti verde una volta inviato. Analizzata l'alternativa "sezione
Comunicazione" (doc `NutriGest_P87_Comunicazione_Analisi.md`): la sezione è la
Tappa 3, ma il valore vero è il REGISTRO unificato degli invii, costruibile
subito. Deciso percorso a 3 tappe; qui la Tappa 1.

**COSA È STATO FATTO.**
1. **Registro unico `p.invii[]`** — voci `{data,tipo,titolo,url,esito}`. Scrittura
   via `_inviiRegistra` che ORDINA per data prima del save e taglia a 50 (regola
   10: invariante cronologica garantita alla scrittura). `_inviiUltimo(p,tipo)`
   legge l'ultimo di un tipo.
2. **Motore di invio generico `inviaMateriale(opt)`** — estratto dalla logica a 3
   livelli di `richInviaWhatsApp` (allegato vero via navigator.share → PDF
   caricato + link wa.me → PDF scaricato + testo), invariata e ora riusabile.
   Registra sempre l'esito. Upload generalizzato: `_richUpload` è ora un wrapper
   di `_materialeUpload(doc,p,bucket)` (bucket default 'richieste', già esistente).
3. **Bottone "📋 Invia elenco FODMAP"** nell'intestazione della scheda paziente
   (`pd-fodmap-box`), sempre visibile da ogni tab — pensato per "paziente al
   telefono". Grigio se mai inviato, **verde con data** dopo l'invio. Il colore si
   CALCOLA da `p.invii[]` (`_fodmapBottoneHtml`), NON da un flag: niente doppia
   fonte di verità (F4/P118/P120). Accanto, bottone 📄 per solo scaricare.
4. **PDF generato dalle liste** `REGOLE_SEMAFORO_ALIMENTI['all-fodmap']`
   (`_fodmapCostruisciPDF`): consigliati vs da evitare, raggruppati per categoria
   ALIMENTI, con i tetti di porzione sui dose-dipendenti (`FODMAP_PORZIONI`).
   Non è più un file statico: correggendo il semaforo cambia anche ciò che parte
   al paziente — chiude il disallineamento del vecchio PDF del 2025.

**PORZIONI: I MIGLIORI DATI CHE ABBIAMO OGGI, NON QUELLI DEFINITIVI.** `FODMAP_PORZIONI`
usa valori orientativi (fonte principale Monash) verificati in parte contro fonti
primarie il 28/7 (doc `NutriGest_FODMAP_Verifica_Perplexity.md`). Quella verifica
ha mostrato che sia le stime a memoria sia le risposte di un'AI di ricerca
contengono errori: la fonte unica affidabile è l'app Monash (a pagamento). Ogni
porzione porta la sua `fonte`. **Verifica totale rimandata a P130.**

**NOTA COSMETICA (non un bug):** nel PDF "Cous cous" compare sotto "Cereali senza
glutine" perché è così categorizzato nel DB ALIMENTI (campo `gl:false`), benché
sia frumento. È nella lista GIUSTA (da evitare); la categoria-etichetta è un
residuo del DB, non della feature. Sistemabile a parte.

**TAPPA 2 (futura):** portare sullo stesso motore/registro anche gli invii che
oggi non lasciano traccia (PDF piano `apriWhatsApp`, messaggi AI, e migrare
`p.richiesteAnalisi[]` in `p.invii[]`). **TAPPA 3:** la sezione "Comunicazione"
come vista su `p.invii[]` + template variabilizzati.

28 LUGLIO 2026 — REVISIONE CLINICA LISTE FODMAP (semaforo `all-fodmap` + 2 concetti educativi).
Test 394/394. Baseline `0d673d2`. Nessuna funzione toccata: solo dati
(REGOLE_SEMAFORO_ALIMENTI) e testi (concetti `fodmap-teorico` e `fodmap-lista`).
INDEX.md rigenerato (righe spostate, 27.444 → 27.459).

**PERCHÉ.** Fabrizio ha portato due fonti nuove: l'articolo Vincenzi-Paolini
(ADI 2014;6:44-47, con sue evidenziazioni) e il PDF a 9 categorie che manda oggi
ai pazienti gonfi. Dal confronto con NutriGest (doc di progetto
`NutriGest_FODMAP_Confronto_Fonti.md`) sono emersi: 1 divergenza clinica vera,
~15 alimenti presenti in ALIMENTI ma "bianchi" per la spunta Low-FODMAP, e
5 messaggi clinici assenti dai concetti. NB: il PDF sorgente ha 9 alimenti in
doppia colonna e zero porzioni — NON è stato recepito alla lettera; dove le
fonti litigano si è seguita Monash (2023-26).

**DECISIONI CLINICHE (di Fabrizio, 28/7):**
1. **Legumi in scatola sciacquati** (ceci, lenticchie, borlotti) → da grigi a
   CELESTI, porzione ~40 g sgocciolati. Monash: gli oligosaccaridi migrano nel
   liquido di governo. I secchi restano grigi. Corretta anche la riga del
   concetto lista che diceva "tutti, secchi o in barattolo".
2. **Finocchio** → da grigio a CELESTE, max ~75 g crudo (dose-dipendente:
   moderato a ~145 g, alto a ~195 g). Risolta anche la contraddizione col
   concetto keto che lo consiglia come spuntino libero.
3. **Avocado** → GRIGIO con soglie esplicite nel concetto: low fino a 60 g,
   moderato 60-80, alto oltre 80 (porzione default in ALIMENTI = 75 g).

**BUCHI COLMATI nel semaforo** (alimenti già in ALIMENTI ma senza avviso):
grigi += Pistacchi, Anacardi (oligosaccaridi, ADI 2014), Avocado, Birra,
Cous cous, Pane di segale, Fiocchi di farro, Datteri, Miele crudo, Salame,
Mortadella, 'Nduja (aglio/cipolla in polvere negli impasti);
celesti += Finocchio, Fagiolini, Ceci/Borlotti/Lenticchie (barattolo),
Mirtilli, Melograno, Papaya, Grano saraceno, Nocciole, Semi di
zucca/lino/chia. Bilancio: grigi 46→54, celesti 54→67.

**CONCETTI EDUCATIVI.** `fodmap-lista`: corretta la frase pericolosa "PROTEINE:
... senza restrizioni" (insaccati con aglio/cipolla in polvere esclusi), aggiunte
porzioni e distinzioni (banana per maturazione, avocado a soglie, chewing-gum
"senza zucchero" tra i polioli, regola d'oro sulla quantità). `fodmap-teorico`:
aggiunti i messaggi dell'articolo ADI — perché la fase 1 non va prolungata
(microbiota), "spesso non è il glutine ma i fruttani" (Biesiekierski 2013,
doppio cieco), niente biomarker predittivi, la low-FODMAP non è l'unico
strumento.

**LEZIONE.** Il materiale che si manda al paziente (il PDF del 2025) era
disallineato sia dalle evidenze sia dall'app, con errori interni (9 voci in
doppia colonna). Quando arriverà il bottone "Invia elenco FODMAP" (tappa 1 del
percorso deciso il 28/7: motore invio riusabile + registro `p.invii[]`), il PDF
andrà GENERATO dalle liste del semaforo, mai allegato come file statico: una
fonte sola, sempre allineata.

26 LUGLIO 2026 (6ª sessione, coda 9) — F9 CHIUSA: IL SEMAFORO ALIMENTI HA UNA SOLA FONTE.
Test 382 → **394**. `index.html` da 27.908 a **27.444 righe** (−464). Commit
precedente `a1251c5`. Decisione di Fabrizio: **cancellare** la tabella vecchia,
non migrarla — "erano 19, siamo arrivati a 15 ma fatte bene e validate".

**COSA C'ERA.** Due motori del semaforo attivi insieme: `applicaRegoloSemaforo`
(15 condizioni validate, guidato dalle checkbox `p.checkSemaforo`, colori
`grigioScuro`/`celeste`) e `_applicaRegoloSemaforoLEGACY` (19 condizioni dedotte
dal testo libero `p.patologie`/`p.farmaci`, colori `grigio_scuro_1/2` e
`celeste_1/2`), quest'ultimo agganciato al pulsante 🔄 Ricalcola.

**IL DANNO VERO NON ERA IL PULSANTE.** Verificato leggendo tutti i consumatori:
le schermate (editor, scheda, popup) riconoscono entrambi i vocabolari, ma
**prompt AI (`costruisciPrompt`), validatore del piano (`_validaCostruisciListe`),
avvisi allergeni e rilevatore conflitti (`_alimentiEsclusiPaziente`) riconoscono
SOLO `grigioScuro`**. Un alimento marcato dal motore vecchio si vedeva grigio a
schermo ed era **invisibile ai controlli**: non finiva fra gli "Esclusi (mai
usare)" del generatore e, se allergene, non produceva né blocco né nota. E
restava lì per sempre, perché `applicaRegoloSemaforo` ripuliva solo i suoi due
colori. Il pulsante, per contro, si è rivelato quasi-irraggiungibile: compare
solo `if(p.regolaAttive.length)`, e `regolaAttive` lo scriveva **solo il motore
vecchio** — quindi invisibile su ogni paziente creato con la build attuale, ma
armato su dati storici e su qualunque backup importato.

**COSA È STATO FATTO.**
1. **Un solo vocabolario**, dichiarato in un posto solo: `_SEM_COLORI_LEGACY` +
   `_SEM_COLORI_AUTO`. `applicaRegoloSemaforo` ora ripulisce **tutti e sei** i
   colori automatici, non solo i suoi due.
2. **Migrazione idempotente** (stesso schema di P120, e negli stessi punti):
   `_semaforoMigraPaziente` toglie i colori legacy e — se il paziente ha
   condizioni spuntate — li rifà col sistema valido; `_semaforoMigraTutti` gira
   in `loadLocal`, sul blob che arriva dal server e sull'**import di un backup**
   (l'altra porta d'ingresso dei dati vecchi), e logga quanto ha toccato.
   Nessuna riscrittura di massa sul server: il dato si allinea al primo
   salvataggio, e rigirare la migrazione non cambia niente. **I colori manuali
   del medico non vengono mai toccati.**
3. **Pulsante 🔄 Ricalcola** → chiama il sistema valido, ridisegna la scheda e
   dice su quante condizioni ha lavorato (o che non ce n'è nessuna spuntata). Il
   riquadro in testa elenca ora le **condizioni spuntate** (`NOMI_CONDIZIONE`
   portato fuori dalla funzione, una copia sola) invece di `p.regolaAttive`, ed è
   sempre visibile. Il campo `p.regolaAttive` resta sui dati ma non viene più né
   scritto né letto — cancellare dati per fare ordine è sempre la scelta
   sbagliata.
4. **Eliminati** `REGOLE_SEMAFORO` (19 condizioni, 565 righe),
   `_applicaRegoloSemaforoLEGACY`, e `selTuttiAl` — codice morto che scriveva sui
   colori del paziente senza essere chiamato da nessuna parte.
5. **BONUS, stessa famiglia:** `_pianoCacheKey` costruiva la chiave della cache
   leggendo `p.alimentiVerdi`, `p.alimentiRossi`, `p.alimentiEsclusi` — **tre
   campi che nessuna riga del programma scrive mai**. Valevano sempre stringa
   vuota, quindi il semaforo non entrava nella chiave: si cambiavano i colori, si
   rigenerava il piano e tornava quello vecchio dalla cache. Ora la chiave
   contiene l'impronta reale di `p.alimenti`. *Effetto collaterale voluto: le
   cache piano esistenti sono invalidate una volta sola.*

**VERIFICA SUL CAMPO (26/7, subito dopo il deploy).** Console sui 38 pazienti
reali: `typeof _semaforoMigraTutti` → `function` (versione nuova attiva) ·
nessun colore legacy in memoria né in localStorage · e soprattutto
`db.pazienti.filter(p=>(p.regolaAttive||[]).length).length` → **0**. Quel campo
lo scriveva SOLO il motore vecchio e la migrazione non lo tocca: è la prova che
`_applicaRegoloSemaforoLEGACY` **non è mai girato** su questi dati. Il rischio
era armato ma non è mai scattato — **nessun piano generato finora è da
rifare per questo motivo**. La correzione che invece ha toccato tutti è quella
della cache (punto 5).

**PERCHÉ CANCELLARE E NON MIGRARE.** La tabella vecchia non era una copia
sbiadita: era una **seconda opinione clinica mai riconciliata**. Riso basmati
sconsigliato lì e consigliato qui; ceci e lenticchie in scatola sconsigliati per
il colon irritabile lì, consigliati qui; spirulina invertita. E la sua qualità
era bassa: **118 nomi su 42 distinti non esistono nel DB alimenti** — compreso il
`Pompelmo` delle statine, cioè la voce che rende quella regola sensata, che era
**muta**. Le 15 condizioni nuove hanno invece copertura DB del 100% dal commit
precedente.

**COSA NON È STATO BUTTATO.** Le 9 condizioni che vivevano solo lì — stitichezza,
gonfiore, menopausa, ciclo abbondante e le 5 interazioni con i farmaci
(metformina, levotiroxina, statine, anticoagulanti, cortisone) — sono
clinicamente utili e non hanno equivalente. Vanno **riscritte da zero** con nomi
verificati: **P129** in roadmap, con le liste originali riportate come materiale
di partenza e la proposta del suggeritore dal campo farmaci (propone, non
applica).

**File toccati:** `index.html`, `test-suite/test/s2-semaforo-fonte-unica.test.js`
(nuovo, 12 test), `INDEX.md`, `NutriGest_Roadmap_v4.md`,
`NutriGest_Contesto_v18.txt`, `CHANGELOG.md`.

26 LUGLIO 2026 (6ª sessione, coda 8) — SCOPERTA #5 SALDATA: 32 NOMI DI ALIMENTI CHE LE REGOLE CLINICHE CERCAVANO E NON TROVAVANO.
Test 370 → **382**. Commit precedente `f644b1a`. Nata da una domanda di Fabrizio
sulle "scoperte tecniche chiave" in fondo alla roadmap: la #5 non era un
promemoria, era un buco aperto.

**IL PROBLEMA, MISURATO.** Il semaforo automatico funziona così: per ogni
condizione (15 fra patologie, allergie e condizioni speciali) una lista di NOMI
da sconsigliare (grigi) o consigliare (celesti); `applicaRegoloSemaforo` cerca
ogni nome con `trovaChiaveAlimento` e — questo è il punto — `if(key){...}`: se
non lo trova **non fa niente e non dice niente**. La casella resta bianca,
indistinguibile da un alimento valutato e approvato. Contati sul commit
`f644b1a`: **32 nomi in quello stato**, fra cui `Nduja` (sconsigliata in SEI
condizioni — diabete, lipidi, ipertensione, reflusso, rene, gravidanza — e mai
colorata), `Maiale arista` (parole invertite rispetto ad `Arista di maiale`, in
quattro liste), `Dado da brodo` per il celiaco, `Mozzarella Protinella` per
l'intollerante al lattosio, `Avena`/`Fiocchi avena`/`Cioccolato fondente` per il
nichel. Stessa famiglia di F5/F6/F7 e della regola 10 di CLAUDE.md: un dato che
sparisce senza rumore.

**LE CORREZIONI.** Tre gruppi, i primi meccanici, gli altri decisi da Fabrizio:
- **Refusi:** `Maiale arista` → `Arista di maiale` (sblocca 4 liste) ·
  `Avena` + `Fiocchi avena` → `Fiocchi d'avena` (due voci per lo stesso alimento)
  · `Cioccolato fondente` (doppione di `Cioccolato fondente 85%`, già accanto)
  rimosso · `Mozzarella Protinella` → `Mozzarella di vacca`.
- **Sette alimenti aggiunti al DB** (scelta di Fabrizio: aggiungerli, non togliere
  le regole): `'Nduja` 30 g (Insaccati) · `Dado da brodo` 5 g e `Senape` 10 g
  (Olio & Condimenti) · `Camomilla` 2 g (Spezie) · `Semi di lino` 10 g (Frutta
  Secca & Semi) · `Pasta di riso` 80 g (Cereali senza Glutine) · `Frutti rossi
  misti` 150 g (Frutta). Grammature allineate ai simili già in tabella.
- **Decisioni cliniche:** `Vitellone carne semigrassa`/`tagli magri` (nomi da
  tabella INRAN, mai esistiti nel DB) sostituiti dai tagli veri del ricettario —
  `Macinato di manzo`+`Hamburger di manzo` fra i grigi, `Fettina di vitello`+
  `Tagliata di manzo` fra i celesti. E la **senape spostata dai consigliati agli
  sconsigliati** nella regola nichel: era fra i celesti, ma è alimento a nichel
  alto — segnalato come probabile refuso e confermato da Fabrizio.
- **Tre doppioni** rimossi (mozzarella nel lattosio, lenticchie e orata in
  gravidanza): innocui, ma il test nuovo non li tollera.
Risultato: **0 nomi orfani, 0 doppioni, 0 conflitti grigio/celeste**.

**LA PARTE CHE VALE PIÙ DELLE CORREZIONI.** Il letterale delle regole è uscito da
dentro `applicaRegoloSemaforo` ed è diventato `REGOLE_SEMAFORO_ALIMENTI` a
livello globale (esposto su `window` insieme ad `ALIMENTI` — `const` a livello di
script non finisce sull'oggetto globale, per questo i test non le vedevano).
Serve al nuovo `s2-regole-nomi-alimenti.test.js` (12 test): ogni nome deve
esistere nel DB, `trovaChiaveAlimento` deve risolverlo davvero, niente doppioni,
niente alimento grigio e celeste insieme, più i casi concreti corretti oggi e due
prove end-to-end (l'iperteso vede grigia la nduja; una scelta manuale del medico
non viene sovrascritta dalla regola). **Da oggi un nome sbagliato fa diventare
rossa la suite prima del commit, invece di restare muto per mesi.**

**TROVATO CHIUDENDO — F9, APERTA E NON CORRETTA.** Il controllo finale sul file ha
trovato due nomi appena corretti (`Maiale arista`, `Vitellone tagli magri`)
ancora presenti **fuori** dal blocco sistemato: stanno in una SECONDA tabella di
regole, `REGOLE_SEMAFORO` (18 condizioni, marcata DEPRECATA), che è **ancora
attiva** — 114 nomi orfani, scala colori diversa (`grigio_scuro_1/2`), e guidata
dal campo testuale `p.patologie` invece che dalle checkbox. Il pulsante
**"🔄 Ricalcola"** (`resetSemaforoAuto`) cancella tutti i colori automatici e poi
chiama SOLO quella vecchia: un paziente colorato dalle 15 condizioni validate,
dopo un click, può ritrovarsi **senza colori** e senza avviso. Non corretta in
questa consegna perché la tabella vecchia contiene condizioni che il sistema
nuovo non ha (stitichezza, gonfiore, menopausa, e le interazioni coi farmaci:
metformina, levotiroxina, statine, anticoagulanti, cortisone): vanno migrate, non
buttate — ed è lavoro clinico. Scheda F9 in roadmap. **Nel frattempo il pulsante
"🔄 Ricalcola" non va premuto.** *(Aggiornamento: F9 è stata chiusa poche ore
dopo, nella coda 9 qui sopra — il pulsante ora è sicuro.)*

**QUELLO CHE RESTA APERTO (detto qui perché è il vero seguito).** Le liste di
nomi non scalano al DB da codice a barre: con migliaia di prodotti industriali
nessuno le scrive a mano. La direzione discussa con Fabrizio: regole sui NUMERI
dell'etichetta (sodio, zuccheri, saturi, fibra) per le patologie metaboliche,
allergeni dichiarati per le intolleranze, categoria come rete di sicurezza, e le
liste di nomi ridotte a eccezioni esplicite. Soprattutto: servirà un **quarto
stato "non valutato"** distinto dal bianco — oggi bianco significa insieme "ok
per lui" e "non l'ho guardato", e su 10.000 prodotti quella confusione diventa il
rischio principale.

**File toccati:** `index.html` (7 alimenti nel DB, correzione dei nomi nelle 15
regole, `REGOLE_SEMAFORO_ALIMENTI` portata a livello globale + esposizione su
window), `test-suite/test/s2-regole-nomi-alimenti.test.js` (nuovo, 12 test),
`INDEX.md`, `NutriGest_Roadmap_v4.md`, `NutriGest_Contesto_v18.txt`, `CHANGELOG.md`.

26 LUGLIO 2026 (6ª sessione, coda 7) — P126: IL CONTESTO AI CITAVA I CAMPI CHE IL MOTORE SCARTA · P127: LA VERIFICA AL CONTROLLO.
Test 350 → **370**. Commit precedente `ee166ee`. Le due cose "promesse e non fatte"
segnate in cima alla roadmap semplice, chiuse insieme. La parte keto delle strade
(P123) resta aperta per scelta di Fabrizio: "la voglio fare più in là".

**P126 — L'AI COMMENTAVA NUMERI DIVERSI DA QUELLI SU CUI ERANO CALCOLATI I MACRO.**
Il blocco Attività di `costruisciContestoPaziente` scriveva *"6000 passi/giorno ·
Misto · intensità media · 3 ore/sett."*: tre di quei campi il motore MET additivo
**li scarta**. Con un'attività specifica selezionata il MET viene da lì (Circuit
training = 8), non dalla griglia tipo×intensità; con sedute e minuti compilati le
ore effettive sono `3 × 36 min = 1,8 h/sett`, non le 3 del campo generico. Il
ragionamento clinico riceveva quindi il profilo di allenamento **sbagliato** e
commentava un carico che non esiste, mentre le kcal che aveva davanti erano
calcolate su un altro.
**La correzione non è cosmetica:** il contesto ora racconta la scomposizione vera
(NEAT dai passi + bonus lavoro · MET usato e da dove viene · ore EFFETTIVE e il
conto che le produce · EAT · TEF · somma = TDEE) e in fondo dichiara, separata,
la riga **"Dichiarato ma NON usato dal calcolo"** con il motivo di ogni scarto.
Un dato dichiarato e inutilizzato resta un'informazione clinica — l'AI può
notarne l'incoerenza e suggerire di aggiornare l'anagrafica — ma non deve più
passare per il dato usato.
**Dove sta la garanzia:** i numeri non vengono ricalcolati dal contesto. È
`calcolaTDEE` a restituire ora anche `oreEffSett`, `oreEffGiorno`, `fonteOre`
(`sedute-minuti` | `ore-legacy`) e `fonteMet` (`attivita-specifica` |
`tipo-intensita`); il contesto li legge e basta. Ricalcolarli lì avrebbe creato
la solita seconda fonte destinata a divergere alla prima modifica del motore. Un
test confronta la stringa scritta con l'output di `calcolaTDEE`.

**P127 — LA VERIFICA AL CONTROLLO: COSA È SUCCESSO DAVVERO, E LA STRADA VA RITARATA?**
P122 dice qual è il traguardo, P123 con quante calorie arrivarci. Mancava il
pezzo che serve ogni settimana in studio: **quando il paziente torna**. Nuovo
blocco 🔎 *"Com'è andata davvero"*, in **due posti** (scelta di Fabrizio): nel
pannello 🎯 sopra le strade e nella scheda Percorso — stessa funzione HTML, non
due copie; il tasto che ritara le calorie esiste solo dove il campo delle calorie
è in pagina.
Dice quattro cose: **(1)** grasso, massa magra, muscolo scheletrico e peso
cambiati dall'ultimo controllo, col ritmo settimanale; **(2)** quanto era atteso
a quelle calorie e se il reale è in linea (±20%), più lento o più veloce;
**(3)** il consumo reale che quel calo implica e la proposta di ritaratura;
**(4)** quanto manca **al ritmo reale** e se la data che conta per il paziente
regge. Con tre o più referti, una riga finale sul cammino dall'inizio.
**Le scelte di metodo, tutte per non inventare numeri:**
- **Il "previsto" viene dal deficit REALMENTE PRESCRITTO nel tratto** (media
  pesata sui giorni degli slot di `macrosStorico`), non dal regime impostato
  oggi: confrontare il calo di maggio col regime di luglio darebbe uno scarto
  finto. Il regime attuale resta solo come ripiego, e il riquadro lo dichiara.
- **Il ritmo si legge sul grasso, non sul peso** (stessa ragione di P123: acqua e
  glicogeno sono peso, non grasso).
- **Le due misure vengono dallo stesso `_misuraDaReferto`** — estratto dal ciclo
  di `_traguardoMisura`, che ora lo usa. Se il referto vecchio fosse letto da
  `peso−grassa` e quello nuovo dal campo `m`, la differenza sarebbe **di metodo,
  non del paziente**: un "delta" inventato su cui si prendono decisioni.
- **La ritaratura si propone solo con ≥21 giorni fra i referti e ≥60% del tratto
  coperto da un target salvato.** Sotto quelle soglie un "consumo misurato"
  sarebbe rumore travestito da numero. E **propone, non applica**: scrive nel
  campo calorie, il salvataggio resta un gesto esplicito.
- **Sotto le tre settimane** il riquadro avverte che la massa magra si muove
  soprattutto per acqua e glicogeno.
- **In regime non in deficit** (mantenimento o massa) non parla di velocità di
  calo: dice che il numero da guardare è la massa magra.
- **In vista paziente non compare**: è il ragionamento del medico.
Un test verifica che la lettura resti cronologica anche con referti inseriti
fuori ordine: P120 garantisce l'ordine in scrittura, ma questa lettura non deve
dipendere da quell'invariante per non invertire i segni.

**Debito tecnico saldato di passaggio:** `_kcalMediaPrescrittaOss` e il nuovo
deficit medio condividono ora `_mediaSlotPrescritta` — una sola copia
dell'aritmetica sullo storico target.

**Trovato durante la sessione:** su `main` la suite era **rossa** — `INDEX.md`
era rimasto a 26.883 righe contro le 27.552 reali (573 voci disallineate). È
esattamente ciò per cui il test `s1-doc-allineata` è nato ieri: la sessione
precedente aveva toccato `index.html` senza rigenerare l'indice. Rigenerato in
questa consegna.

**File toccati:** `index.html` (P126: `calcolaTDEE` espone `oreEffSett`/
`oreEffGiorno`/`fonteOre`/`fonteMet`/`passiUsati`, blocco Attività di
`costruisciContestoPaziente` riscritto, metodo nella riga LAF; P127:
`_misuraDaReferto` estratta da `_traguardoMisura`, `_mediaSlotPrescritta`,
`_vcDeficitSlot`, `_vcTratto`, `_vcTraguardoSalvato`, `_verificaControllo`,
`_verificaControlloHtml`, `_vcRitara`, agganci in `_traguardoAnteprima` e
`renderPdPercorso`, `_kcalMediaPrescrittaOss` generalizzata),
`test-suite/test/s2-contesto-attivita.test.js` (nuovo, 6 test),
`test-suite/test/s2-verifica-controllo.test.js` (nuovo, 14 test), `INDEX.md`,
`NutriGest_Roadmap_v4.md`, `NutriGest_Contesto_v18.txt`, `CHANGELOG.md`.

26 LUGLIO 2026 (6ª sessione, coda 6) — P125: RICERCA FRA I PARAMETRI + LDL STIMATO CON FRIEDEWALD.
Test 334 → **350**. Nate da tre proposte di Fabrizio, discusse prima di scrivere codice; la terza (elettroforesi in frazioni) è stata rimandata di proposito.

**1. RICERCA FRA LE 119 VOCI.** Casella in cima alla scheda Analisi: filtra dal
vivo, apre da sole le sezioni con risultati, le richiude alla cancellazione,
ESC pulisce. Cerca anche nei TITOLI di sezione ("tiroid" → tutte e 7 le voci
tiroidee).
**Il dettaglio che decide se funziona o no:** la corrispondenza è per
**parole-prefisso**, non per sottostringa. Con la sottostringa, `"vit d"` NON
trova "Vitamina D (25-OH)" — la sequenza "vit d" dentro "vitamina d" non
esiste. Con le parole-prefisso ogni parola scritta deve essere l'inizio di una
parola del nome, e allora funzionano tutte le ricerche che si fanno davvero:
`vit d`, `ferrit`, `glob bianc`, `b12`, `wbc`, `ttg`, `col tot`. Un test
verifica che **ognuna delle 119 voci sia raggiungibile** scrivendo la sua prima
parola.

**2. LDL STIMATO (FRIEDEWALD).** `LDL = Totale − HDL − Trigliceridi/5`. Sul
referto reale: 158 − 48 − 18,2 = **92 mg/dL**.
**Sta nel pannello dei calcoli derivati e NON scrive nella casella LDL.** Un
valore calcolato dentro un campo che a volte contiene un valore misurato è una
doppia fonte: la famiglia di bug che ha già colpito tre volte (F4, P118 tappa 1,
P120). Fra sei mesi, davanti a un "92", nessuno saprebbe più chi l'ha prodotto.
Qui il nome della scheda lo dice.
**Nessun semaforo verde/rosso**, coerentemente con la voce 'LDL' in RANGE_RIF
(livello B): il target dipende dal rischio cardiovascolare individuale (<55
molto alto · <70 alto · <100 moderato · <116 basso), quindi un colore fisso
direbbe una cosa che nessuna linea guida dice. Il glossario spiega i target.
**Campo di validità applicato, non solo scritto:** sopra 400 di trigliceridi il
calcolo NON viene fatto e la scheda dice perché — Friedewald lì non è impreciso,
è **inapplicabile**, e un numero inapplicabile è peggio di un numero mancante
perché sembra un risultato. Stessa logica sui valori incoerenti (LDL negativo).
La scheda avverte inoltre quando i trigliceridi superano 200 (Friedewald
sottostima → guarda il non-HDL, che c'è già), quando la stima scende sotto 70, e
quando **il laboratorio ha misurato un LDL diverso** — in quel caso fa fede il
misurato, e la differenza è scritta.

**DUE AGGANCI GENERICI, NON DUE CASI SPECIALI.** `calcolaIndice` ha ora
`def.valido(vals,p)` (condizione di applicabilità → motivo scritto) e
`def.avviso(vals,p,val)` (nota contestuale sotto il numero), più `def.dec` per
le decimali. Scritti generici apposta: la prossima formula con un limite di
validità non deve reinventarlo né — peggio — dimenticarselo. Su `ldl_fw` le
decimali sono 0: "91.80 mg/dL" comunicherebbe una precisione che una stima non ha.

**RIMANDATA: elettroforesi proteica in frazioni.** Oggi è UNA casella di testo
libero — l'unica voce del database costruita così: non entra in nessun calcolo,
non ha andamento nel tempo, non ha semaforo. Trasformarla in 5 frazioni
numeriche (albumina, α1, α2, β, γ) la renderebbe utile, ma richiede decisioni
cliniche di Fabrizio. **Decisione già presa e da non rimettere in discussione:
si useranno le PERCENTUALI** (sempre stampate, riferimenti standard) — la scelta
serve proprio a non ripetere il pasticcio % / valore assoluto dei leucociti visto
oggi con P124b. Da valutare anche l'avviso sul picco monoclonale nelle γ, che
però non è materia da nutrizionista: se ci sarà, dovrà dire "manda dal medico",
non interpretare.

**Verificato in un browser vero** oltre che nei test: ricerca provata con "vit d"
(1 voce), "ferrit" (1), "tiroid" (7 voci, sezione aperta da sola), "zzz"
(nessuna voce trovata), campo vuoto (119 voci, sezioni richiuse); scheda LDL a
92 mg/dL con pallino grigio e **casella LDL del paziente rimasta vuota**.

**File toccati:** `index.html` (ricerca: `_anNorm`, `_anCorrisponde`,
`filtraAnalisi`, `pulisciRicercaAnalisi` + casella in `renderPdAnalisi`; LDL:
`ldl_fw` in CALCOLI_CLINICI, agganci `valido`/`avviso`/`dec` in `calcolaIndice`
e `_renderCalcoliPannello`, CSS `.calc-nota`),
`test-suite/test/s2-analisi-ricerca-ldl.test.js` (nuovo, 16 test), `INDEX.md`,
`NutriGest_Roadmap_v4.md`, `CHANGELOG.md`.

26 LUGLIO 2026 (6ª sessione, coda 5) — P124b: I PREFISSI DELLE UNITÀ FACEVANO SUONARE L'ALLARME SU RIGHE GIUSTE.
Test 330 → **334**. Commit precedente `df47356`.

**IL FALSO ALLARME.** Terzo giro di collaudo, due righe segnate in rosso che
erano perfettamente allineate: **Omocisteina 11,3** ("unità letta *nanomoli/L*,
attesa µmol/L") e **Creatinina umol/L 97** ("unità letta *mmol/L*"). Il valore,
il riferimento del laboratorio e l'esame erano tutti corretti: l'AI aveva solo
trascritto male il PREFISSO dell'unità — un carattere solo (u/n/m/p), la cosa
più facile da sbagliare leggendo una scansione.

**PERCHÉ È UN PROBLEMA SERIO E NON UN FASTIDIO.** Il controllo sull'unità nasce
per smascherare la RIGA SBAGLIATA (`%` dove servono 10³/µL). Ma nanomoli,
micromoli e millimoli misurano tutte la stessa cosa — una concentrazione molare
— quindi lì non c'è nessuna riga sbagliata da smascherare. Un allarme che suona
sulle righe giuste è il modo più rapido per far smettere di leggere gli allarmi,
e a quel punto non protegge più nemmeno quando ha ragione. È la stessa regola
già scritta per il suggerimento della virgola: **meglio nessun avviso che un
avviso che si impara a saltare**.

**LA CORREZIONE.** `_impStessaGrandezza` confronta la GRANDEZZA FISICA a meno
del prefisso (nanomoli/micromoli/millimoli → moli; mg/µg → grammi): se le due
unità sono la stessa grandezza, nessun allarme. Restano segnalate le grandezze
davvero diverse (`%` contro 10³/µL, `pg` contro g/dL, `migliaia/mmc` contro fL).
**Il caso in cui il prefisso conta davvero — il valore espresso in un'altra
scala — non resta scoperto:** lo prende `_impFuoriScala`, che ragiona sui numeri
(una creatinina di 97 in una casella che si aspetta 0,7-1,2 è 80 volte il
massimo e viene segnalata comunque). Verificato con un test apposta.

**Costo accettato consapevolmente:** l'unità non distingue più mg/dL da µg/dL né
ng/mL da pg/mL, quindi uno scambio di riga fra due esami che differiscono solo
per il prefisso non viene più preso *dall'unità*. Restano su quel caso il
controllo del riferimento e quello di ordine di grandezza.

**File toccati:** `index.html` (`_impStessaGrandezza`, messaggio del controllo
unità riscritto), `test-suite/test/s2-import-referto-controlli.test.js`,
`INDEX.md`, `NutriGest_Roadmap_v4.md`, `CHANGELOG.md`.

26 LUGLIO 2026 (6ª sessione, coda 4) — P124b: LE DUE COSE VISTE NEL COLLAUDO CON LE PAGINE FINALMENTE DRITTE.
Test 327 → **330**. Collaudo di P124b **superato**: emocromo, TSH e FT4 letti giusti, niente più scivolamento di riga.

**(1) Percentuale e valore assoluto non sono un conflitto.** Sui referti italiani
i leucociti compaiono DUE VOLTE — "% Neutrofili 54,7" e "# Neutrofili 2,7" — e
l'AI, correttamente, leggeva entrambe le righe. L'app le trattava come due
letture in disaccordo dello stesso esame e segnalava un conflitto su cinque voci
a ogni emocromo. Il valore che teneva era anche quello giusto (ANALISI e
RANGE_STD ragionano in valori ASSOLUTI), ma la riga arrivava deselezionata:
metà emocromo da rispuntare a mano ogni volta. Ora la scelta la fa **l'unità di
misura**: fra due righe dello stesso esame si tiene quella la cui unità
corrisponde a quella attesa, e il conflitto si segnala solo quando l'unità non
decide. Verificato che funziona **in tutti e due gli ordini** di arrivo delle
righe. Il prompt ora chiede esplicitamente di riportare ENTRAMBE le righe: la
scelta è dell'app, che sa quale unità usa, non del modello, che non lo sa.
*Un avviso che suona su metà emocromo a ogni import è un avviso che si impara a
ignorare — e allora non protegge più nemmeno quando ha ragione.*

**(2) Era stata letta la DATA DI NASCITA al posto di quella del prelievo.**
Nella finestra di conferma la data del referto diceva **06/03/1990**: è la data
di nascita del paziente, stampata nell'intestazione a due centimetri da quella
del prelievo (17/06/2026). Nessuno l'aveva segnalata perché è una data
perfettamente formata e plausibile — ed è esattamente il danno peggiore
possibile su uno storico datato: un referto del 2026 archiviato nel 1990 falsa
ordinamento, andamento nel tempo e confronti, senza un errore a video. Ora:
il prompt avverte esplicitamente della data di nascita nell'intestazione, e
**l'app rifiuta** la data letta se coincide con `p.nascita` o se è nel futuro,
dicendolo e lasciando il campo da compilare. *Terza applicazione della stessa
regola di P118/P120: meglio nessuna data che una data inventata.*

**File toccati:** `index.html` (fusione per unità di misura e guardia sulla data
in `loadAnalisiSanguePDF`, prompt in `_impPromptPagina`),
`test-suite/test/s2-import-referto-controlli.test.js`, `INDEX.md`,
`NutriGest_Roadmap_v4.md`, `CHANGELOG.md`.

26 LUGLIO 2026 (6ª sessione, coda 3) — P124b: LE PAGINE DEL REFERTO ARRIVAVANO ALL'AI CORICATE SU UN FIANCO.
Test 318 → **327**. Aggiunte `vendor/pdf.min.js` e `vendor/pdf.worker.min.js` (pdf.js 3.11.174).

**IL SECONDO COLLAUDO, PEGGIO DEL PRIMO.** Con P124 pubblicata Fabrizio ricarica
il referto — stavolta il PDF a 4 pagine invece della foto — e su 32 valori ne
escono ~25 sbagliati. Ma sbagliati in modo NUOVO: non colonna sbagliata, **riga
sbagliata**. Piastrine prendeva 15,1 (l'Emoglobina), Globuli bianchi 0,40 (%
Basofili), TSH 1,17 (FT4) e FT4 1560 (TSH). E come "intervallo di riferimento"
tornavano `pg` e `migliaia/mmc`: le UNITÀ DI MISURA di righe vicine.

**LA CAUSA, trovata solo perché Fabrizio ha allegato il PDF vero.** Il file è
una **scansione senza livello di testo** (`pdftotext` restituisce 4 byte) e le
pagine, una volta convertite in immagini, arrivano **ruotate di 90°**. Su una
tabella fitta letta di traverso l'allineamento delle righe collassa: è tutto lì.
**E c'è il colpo di scena che ha deciso l'architettura: la rotazione DICHIARATA
dal PDF era sbagliata.** Il file dice `/Rotate 270`; provate tutte e quattro le
rotazioni in un browser vero, l'unica che raddrizza il referto è **180**. Quindi
non ci si può fidare del metadato: l'orientamento va RILEVATO guardando la
pagina. È la stessa lezione di F5/F6/F7 e dell'INDEX.md sbagliato — **le
dichiarazioni non si credono, si controllano** — applicata stavolta a un file
di terzi invece che al nostro codice.

**LA CORREZIONE.**
**1. Le pagine le rendiamo noi, dritte** (`vendor/pdf.min.js`). Per ogni referto:
una chiamata piccola a bassa risoluzione che chiede *di quanti gradi va girata la
pagina*, poi il rendering di tutte le pagine con quella rotazione. Se la risposta
non è 0/90/180/270 si resta a 0: meglio non ruotare che ruotare a caso. Vale
anche per le **foto** scattate storte, che avevano lo stesso identico problema.
**2. Una pagina per chiamata.** Meno righe insieme, meno spazio per scivolare.
Una pagina illeggibile non fa fallire il referto: si segnala e si prosegue.
**3. L'impronta della riga.** L'AI deve riportare, per ogni esame e DALLA STESSA
RIGA, quattro campi: voce, valore, **unità** e **riferimento**. I tre dati si
controllano a vicenda, e l'app scarta la riga quando non tornano:
   · il "riferimento" non è un intervallo (`pg`, `migliaia/mmc`, `1,17`) → riga disallineata;
   · l'unità non è quella dell'esame (`%` dove servono 10³/µL) → riga disallineata;
   · lo stesso esame compare su due pagine con valori diversi → conflitto, decide Fabrizio.
Sul caso reale questi due soli controlli scartano 14 righe sbagliate su 25.
`_impUnitaCanonica` normalizza le scritture dei laboratori italiani
(`migliaia/mmc`↔`10³/µL`, `mcg/dl`↔`µg/dL`, `microU/ml`↔`µU/mL`): senza, il
controllo avrebbe dato falsi allarmi su mezzo emocromo.

**VERIFICATO IN UN BROWSER VERO, NON SOLO NEI TEST.** Il PDF di Mangini è stato
aperto in Chromium headless: 4 pagine rese in ~1,7 s ciascuna (~200 KB), la
pagina 1 raddrizzata e leggibile, e il flusso completo con `aiCall` finto
produce esattamente la finestra attesa — righe buone spuntate, riga con
riferimento `migliaia/mmc` scartata, riga con unità `%` scartata, conflitto fra
pagine segnalato. Il primo tentativo di verifica era passato 180 invece di 270 e
usciva storto: **l'errore era nel test, non nel codice** — ed è il motivo per cui
la verifica va fatta guardando l'immagine, non leggendo il valore di ritorno.

**Perché pdf.js e non un prompt migliore.** Era la tentazione: riscrivere le
istruzioni. Ma quando un modello sbaglia in modo SISTEMATICO e non casuale, la
causa non è quasi mai nel prompt — è in **cosa gli stiamo davvero facendo
vedere**. Nessuna istruzione rende leggibile una tabella coricata.

**File toccati:** `index.html` (blocco import riscritto: `_impPdfApri`,
`_impPdfPagina`, `_impRuotaImmagine`, `_impRilevaRotazione`, `_impPromptPagina`,
`loadAnalisiSanguePDF`; più `_impRifPlausibile`, `_impUnitaCanonica`,
`_impUnitaCompatibili` nei controlli), `vendor/pdf.min.js` e
`vendor/pdf.worker.min.js` (nuovi), `test-suite/test/s2-import-referto-controlli.test.js`,
`INDEX.md`, `NutriGest_Roadmap_v4.md`, `CHANGELOG.md`.

26 LUGLIO 2026 (6ª sessione, coda 2) — P124: L'IMPORT DEI REFERTI DEL SANGUE SMETTE DI ESSERE UN ATTO DI FEDE.
Test 305 → **318**, tutti verdi (`s2-import-referto-controlli.test.js`, 13 nuovi).

**IL CASO REALE.** Fabrizio stava caricando le analisi di un paziente e si è
fermato a metà: la finestra di conferma mostrava **Creatinina "0.72-1.18",
e-GFR "89-98", Azotemia "30-25", Vitamina B12 "197-771", Folati "4.5-23.2"**
— cioè gli INTERVALLI DI RIFERIMENTO copiati al posto dei risultati —, **TSH
1560** (il referto diceva `1,560`: virgola persa, valore ×1000) e **Vitamina D
2.3** invece di `21,3` (una cifra caduta). Su sedici valori estratti, sette
erano sbagliati. Referto fotografato, con una pagina ruotata di 90°.

**LE TRE COSE CHE NON ANDAVANO, IN ORDINE DI GRAVITÀ.**
**(1) La finestra di conferma era di sola lettura.** Vedeva l'errore e non
poteva correggerlo: poteva solo togliere la spunta, e poi ricercarsi la voce a
mano tra ~117 caselle della scheda. L'ultimo controllo prima che un dato entri
nella cartella clinica è l'occhio del clinico sul referto vero — e quel
controllo non aveva sbocco. **(2) Nessun controllo automatico.** Un valore
formato da due numeri col trattino non è un risultato in nessun esame
esistente, e un TSH di 1560 con riferimento 0.4–4.0 è fuori dal mondo di quel
esame: nessuna delle due cose veniva notata. Gli unici avvisi presenti
(fuori range, delta >50%) guardavano la *clinica*, non la *plausibilità della
lettura* — e infatti tacevano proprio sui valori inventati. **(3) Il prompt
chiedeva all'AI di convertire il numero** ("usa il punto come separatore
decimale"): è esattamente la richiesta che ha prodotto `1,560` → `1560`.

**LA CORREZIONE, IN TRE PEZZI.**
**A — La colonna "Estratto" è un campo scrivibile.** Si corregge il numero lì,
sul momento, col referto davanti. Chi corregge una riga sospetta si vede
**rimettere la spunta da sola** (una riga corretta ma rimasta deselezionata
sarebbe stato il vecchio bug con un passaggio in più). Il valore corretto a
mano viene marcato in provenienza come `ai-import-corretto`, distinto da
`ai-import`: fra sei mesi si potrà sapere quanto spesso l'AI sbaglia e su cosa.
**B — Tre controlli deterministici** (`_impControllaValore`), che funzionano
*proprio quando* l'AI sbaglia, perché non dipendono dall'AI: forma di
intervallo (`0.72-1.18`), stesse cifre del range stampato dal laboratorio
(`197-771`), ordine di grandezza oltre il fattore 10 rispetto a `RANGE_STD`
(TSH 1560). Le righe sospette arrivano **deselezionate** e in rosso, con un
banner che spiega le due cause tipiche. Il riferimento dell'esame è ora
stampato accanto al nome: il confronto si fa a colpo d'occhio.
**C — Il prompt non chiede più di convertire**: chiede di copiare il numero
cifra per cifra *come è stampato*, virgola italiana compresa — la conversione
la fa il programma (`_impNormalizzaNumero`). Aggiunte l'istruzione esplicita
sulla colonna Esito/Risultato contro quella dei riferimenti, e l'istruzione di
**omettere** l'esame quando la lettura è incerta (foto storta, pagina ruotata).

**LA DECISIONE PIÙ IMPORTANTE: quando NON suggerire.** Il controllo 3 propone
la correzione ("usa 1.56") **solo se** lo spostamento della virgola riporta il
valore DENTRO il riferimento. Sulla Vitamina D, 2.3 × 10 = 23 — plausibile,
vicino, e **sbagliato**: il valore vero era 21.3. Un suggerimento del genere
verrebbe accettato senza riaprire il referto, e l'errore diventerebbe
definitivo con l'aria di essere stato verificato. Quindi lì l'app dice solo
"ricontrollalo sul referto" e non propone niente. **Un suggerimento sbagliato
è peggio di nessun suggerimento: il primo si accetta, il secondo si controlla.**
Stessa famiglia della lezione di P120/P118: un ripiego silenzioso su un dato
clinico è un bug in attesa.

**Perché non è servita una seconda chiamata AI di verifica.** Era l'opzione D
(pulsante "rileggi questo valore"): scartata per ora — costa una chiamata a
click e i tre controlli deterministici prendono già 7 errori su 7 del caso
reale. Si riapre se il collaudo mostra errori che sfuggono a tutti e tre
(es. Trigliceridi 91 letto 21: numero plausibile, dentro il riferimento —
contro questo esiste solo l'occhio umano, ed è per questo che A viene prima di B).

**File toccati:** `index.html` (prompt di estrazione, 9 funzioni `_imp*` nuove,
`mostraDiffAnalisi` riscritta), `test-suite/test/s2-import-referto-controlli.test.js`
(nuovo), `INDEX.md`, `NutriGest_Roadmap_v4.md`, `CHANGELOG.md`.

26 LUGLIO 2026 (6ª sessione, coda) — LA DOCUMENTAZIONE SI DIFENDE DA SOLA: INDEX.md RIALLINEATO (719 VOCI SU 730 ERANO SBAGLIATE) + AUDIT GLOBALE DEGLI ID ORFANI + TEST PERMANENTE.
Test 301 → **305**, tutti verdi (`s1-doc-allineata.test.js`). Codice dell'app NON toccato.

**1. INDEX.md era rotto, e non da oggi.** Un controllo automatico (ogni voce
dell'indice confrontata con la riga vera in `index.html`) ha trovato **719 numeri
su 730 sbagliati** dopo la sessione — ma soprattutto **657 su 687 GIÀ sbagliati
prima** (commit `924414b`), con scarto mediano +117 righe, **nonostante
l'intestazione dichiarasse un riallineo completo il 25 luglio**. La dichiarazione
non corrispondeva al file: lo stesso identico schema di F5/F6/F7 — qualcosa di
scritto che nessuno verifica. Un indice sbagliato è peggio di nessun indice:
manda le sessioni future a leggere il punto sbagliato del monolite.
Riallineate tutte le 730 voci verificabili + i range "Righe A-B" di sezione;
93 voci (funzioni annidate) restano non verificabili e sono dichiarate tali.

**2. AUDIT GLOBALE DEGLI ID ORFANI** — l'estensione promessa dell'audit F7, su
TUTTA l'app e su due canali: `getElementById` diretto (357 id distinti) e le
letture via helper `g/gn/gs` dove vivevano F6 e F7 (106 id). Esito: **nessun
nuovo bug della famiglia F6/F7**. 16 orfani trovati e classificati uno a uno:
11 sono il pattern legittimo "rimuovi se esiste, poi crea" (popup dinamici);
3 letture con guardia `if(el)` innocue; e **2 trovati veri ma non distruttivi**:
- `cfg-url` → **`testConn()` è codice morto**: legge un campo che non esiste e
  nessun bottone la chiama più. Se mai ricollegata, crasherebbe.
- `mac-laf` → il **selettore LAF manuale non esiste più nel markup**: per il
  paziente SENZA alcun dato di attività il ripiego fissa silenziosamente
  LAF 1.20, e la UI dice "da selezione manuale" — una selezione impossibile.
  Non è perdita di dati (1.20 è il default prudente) ma il messaggio mente:
  segnato in roadmap come nota di P114/TDEE.

**3. IL GUARDIANO PERMANENTE** (`s1-doc-allineata.test.js` + `rigenera-index.js`):
- INDEX.md disallineato → **test rosso** con il rimedio scritto nel messaggio
  (`cd test-suite && node rigenera-index.js`, 10 secondi, stampa quante voci
  corregge). Provato rompendo l'indice apposta: rosso; script: verde.
- **Nuovo id orfano** (campo tolto dal markup con la lettura rimasta nel codice)
  → test rosso su entrambi i canali. È il vaccino della famiglia F6/F7: i 16
  attuali sono in una lista `ORFANI_NOTI` ognuno col suo motivo, e aggiungerne
  uno senza motivo è vietato dal commento stesso.
- Strutture dati `p.*` principali non documentate nel Contesto → test rosso.
Regola aggiornata in CLAUDE.md: INDEX si rigenera **a ogni sessione che tocca
index.html** (la vecchia politica "solo dopo modifiche strutturali" è quella che
ha prodotto la deriva), e la parte meccanica della checklist documentazione ora
è imposta dalla suite invece che affidata alla memoria.

**Lezione, la più generale della settimana.** F5, F6, F7 e l'INDEX alla deriva
sono lo stesso bug in quattro vesti: **una dichiarazione che nessuno controlla**
(una whitelist "completa", un campo "esistente", un riallineo "fatto"). La
risposta giusta non è più disciplina — è trasformare la dichiarazione in un
controllo che gira da solo. Da oggi la suite lo fa a ogni run.

26 LUGLIO 2026 (6ª sessione, chiusura) — COLLAUDO SUL CAMPO: TUTTO VERDE.
Nessuna modifica al codice: questa voce registra solo gli esiti, perché lo stato
di una funzione lo decide l'uso in studio, non il fatto che i test passino.

Fabrizio ha collaudato su **Mariano** (paziente reale, 7 referti InBody, nessuna
analisi del sangue) l'intera catena costruita in due giorni:
- **P122 tappe 1-5 + le 5 correzioni post-collaudo** — traguardo dalla
  composizione, domanda in visita strutturata, modelli di periodizzazione e
  riallineo, traguardi multipli e condizione di uscita, vista paziente:
  **tutto funziona**. Il percorso generato su Mariano (deficit 6 sett. −20% →
  mantenimento 6 → surplus 16) è stato giudicato corretto.
- **P123 — le strade**: le tre velocità, il pulsante «Usa» che imposta il regime
  e riscrive le fasi, la riga della scadenza personale: **funziona**.
- **F7** — altezza inserita, salvata e **rimasta salvata** dopo riapertura: il
  bug dei campi che si azzeravano è chiuso davvero.
- **P121 — grammature delle alternative (arretrato dal 25/7)**: **collaudata,
  funziona**. Era l'unico collaudo aperto che toccava i piani alimentari veri.
  Verificata l'equivalenza sui carboidrati nel popup "Aggiungi alternativa"
  (riso 60g · crackers 75g · frisella 40g · pasta integrale 75g · gnocchi 150g,
  tutte marcate ≈carbo) con i semafori Consigliato / Con moderazione / Sconsigliato.

**Resta aperto, per scelta di Fabrizio:** la parte chetogenica di P123 (durate
massime per protocollo e ciclo keto → uscita graduale → mantenimento), più le
due cose promesse in sessione e non ancora fatte — il contesto AI che cita i
campi scartati dal motore TDEE, e la verifica al controllo (quanto muscolo ha
messo dall'ultimo referto, ritmo reale contro ritmo scelto).

26 LUGLIO 2026 (6ª sessione, seguito) — P123: LE STRADE PER ARRIVARE AL TRAGUARDO (+ pannello 🎯 reso leggibile).
Baseline `cbf5aae`. Test 290 → **301**, tutti verdi (`s2-strade.test.js`).

**Origine.** Fabrizio, in collaudo, davanti al pannello 🎯: *"senti io non riesco a
capirlo"*. E subito dopo la richiesta vera: *"fare previsioni è difficile… più che
deciderle prima è più interessante vedere i valori quando torna al controllo. La
cosa utile è che, una volta scritta la percentuale a cui punta, mi dai un consiglio
su quante calorie dovrebbe assumere, e magari più soluzioni, una più aggressiva e
una più lenta… la parte che mi interessa di più è la programmazione nel lungo
periodo."*

**LA SCOPERTA CHE SEMPLIFICA TUTTO.** I chili di **grasso** da togliere non
dipendono quasi per niente dal muscolo che il paziente metterà. Su Mariano (79.1
kg, magra 67.1, grasso 12 kg) puntando al 12%: muscolo fermo → **−2.8 kg di
grasso**; +2 kg di muscolo → **−2.6 kg**. **Due etti di differenza**, contro i
**2.2 kg** di differenza sul PESO finale (76.3 vs 78.5).
Quindi la previsione sul muscolo — che Fabrizio giustamente non vuole fare — non
solo è difficile: è **irrilevante** per la cosa che si deve programmare davvero,
cioè quanto deficit dare e per quanto tempo. Il muscolo si **misura al controllo**,
non si indovina prima. Ragionare in grasso invece che in peso immunizza per di più
dalla sovrastima delle prime settimane (acqua e glicogeno sono peso, non grasso).

**IL BLOCCO «🛣 Come ci arrivi»**, sotto il pannello 🎯. Dal traguardo escono le
strade, calcolate sul TDEE reale:
`kg di grasso a settimana = deficit × 7 ÷ 7700` · `settimane = grasso ÷ ritmo`.
Tre standard decise da Fabrizio — **−10% Soft, −15% Media, −20% Decisa** — più un
campo libero per qualsiasi altra percentuale (−5, −25…). Per ognuna: calorie
target, deficit, grasso perso a settimana, settimane e **data di arrivo**.
Guardrail: ritmo oltre l'1% del peso a settimana, target sotto il metabolismo
basale, oltre 12 settimane di deficit continuo ("va spezzato in cicli").
**Il pulsante «Usa»** imposta il regime energetico su quel deficit e, se esiste un
percorso, propone di **riscrivere le fasi su quel ritmo** — `_percorsoGeneraFasi`
accetta ora `{pctDeficit}` invece del solo default −18%. È l'aggancio che mancava
tra traguardo, calorie e programmazione lunga: prima erano tre cose separate.

**LA DATA CHE CONTA.** Se il paziente ha una scadenza personale (Tappa 2), il
blocco dice dove sarà a quella data con la strada più decisa. Su Mariano, che si
sposa fra 4.7 settimane: *"nemmeno la strada più decisa ci arriva — a quella data
sarà intorno al 12.5% di grasso"*. È la frase da dirgli in visita oggi, non a
settembre — e chiude il cerchio con la domanda della Tappa 2.

**PANNELLO 🎯 RESO LEGGIBILE** (stessa sessione, stesso motivo).
- **Le etichette «ottimista» e «realistico» erano girate al contrario.** Venivano
  dal dimagrimento, dove "conservi tutta la massa magra" è la buona notizia; in
  ricomposizione lo scenario "ottimista" era quello in cui il paziente **non mette
  un grammo di muscolo**, cioè il peggiore. Ora i due scenari dicono cosa succede
  al muscolo: uno principale in grande, l'alternativa in piccolo.
- **Via la parola «Fascia»**: non era un intervallo di incertezza ma due ipotesi
  diverse, e i numeri sotto si riferivano solo a una delle due senza dirlo.
- **Avvisi filtrati** (scelta di Fabrizio): riquadro solo per ciò che richiede una
  decisione — soglie di sicurezza, referti incoerenti, conflitto con l'aspettativa
  del paziente. Le note informative diventano una riga sola piccola.

**In chetogenica il blocco non compare**: i protocolli keto sono definiti in kcal
assolute con bande e durate massime proprie (PSMF 400-800, VLCKD 600-800, LCKD
800-1500), non in % del TDEE — lì la domanda non è "quanto ci mette" ma "quanto
può durare". Rinviato per scelta di Fabrizio; al suo posto una riga che lo spiega.

**Lezione.** *"Non riesco a capirlo"* detto dal professionista che lo usa ogni
giorno vale quanto un test rosso. Il pannello era corretto nei numeri e sbagliato
nel racconto: due scenari affiancati con etichette prese in prestito da un altro
contesto, una "fascia" che non era una fascia, e cinque riquadri di avvisi intorno
al numero che conta. E la domanda giusta non era quella che il pannello faceva
("quanto muscolo metterà?") ma quella che non faceva: **"quante calorie, e per
quanto tempo?"**

**Da collaudare.** Paziente con traguardo impostato → pannello 🎯 → il blocco
🛣 in fondo: le tre strade devono avere numeri che ti convincono, e il pulsante
«Usa» deve spostare lo slider del regime. Se il paziente ha una scadenza
personale, controlla la riga con la data. In chetogenica deve comparire solo la
riga di rinvio.

26 LUGLIO 2026 (6ª sessione, seguito) — F7: I CAMPI ALTEZZA E PESO ERANO SPARITI DAL MODULO E OGNI SALVATAGGIO DELL'ANAGRAFICA LI AZZERAVA. Terzo caso della famiglia.
Baseline `be8c2fc`. Test 283 → **290**, tutti verdi (`s2-anagrafica-campi.test.js`).

**Origine.** Durante il collaudo di P122 gli avevo chiesto di verificare che in
anagrafica ci fossero sesso e altezza. Osservazione di Fabrizio: *"il sesso c'è
ma l'altezza no, però ricordo che l'altezza la estrapolavi dal referto InBody.
Indaga."*

**Il bug.** Il campo `p-altezza` **non esiste nel markup** del modal, ma
`salvaPaz` continua a leggerlo: `gn()` su elemento assente restituisce `null`,
quindi **ogni salvataggio dell'anagrafica azzerava `p.altezza`**. Sembrava
funzionare per un motivo preciso — `salvaInbody` fa `p.altezza = ib.altezza` a
ogni referto importato: il ciclo era *importi una BIA → l'altezza c'è → modifichi
l'anagrafica → sparisce → importi la BIA dopo → ricompare*. Intermittente, quindi
invisibile. Identico a F6 (campo obiettivo) e cugino di F5.

**Audit sistematico** su tutti e 56 i campi letti da `salvaPaz`: **sei** non
esistono nel markup. `p-altezza` → azzerava `p.altezza`; `p-peso` → azzerava
`p.peso` (il ripiego per chi non ha InBody); `p-no-rinuncia` → azzerava
`p.noRinuncia`; `p-risc` → **codice morto** (`p.risc` non è letto da nessuna
parte); `p-peso-target` → già protetto dalla Tappa 1; `p-dove` → innocuo, più
avanti c'è `dove:getDove()` che riscrive la chiave.

**Impatto reale dell'altezza mancante:** senza `p.altezza` e senza il ripiego
sull'InBody saltano BMI, range di normopeso, Devine/Robinson, cross-check
Mifflin (P114 passo 7), la riga del contesto AI e gli indici clinici derivati.
Un paziente **senza bioimpedenziometria** non ha l'altezza da nessuna parte: è
cieco su tutto quello che ci si appoggia.

**Correzione.**
1. **Altezza e Peso dichiarato tornano nel tab Dati** (accanto a sesso e data di
   nascita), con la nota che servono finché non c'è un referto InBody;
   **«Non rinuncia a»** torna nel tab Preferenze cibi. `p-risc` non viene più letto.
2. `_pazNumOPrec(idCampo, campoPaz)`: legge il numero dal modulo, e **se il campo
   non c'è tiene il valore che il paziente aveva già**. Un campo assente è "non lo
   so", non "cancella". Svuotarlo a mano invece azzera davvero — cancellare deve
   poter cancellare. Vale anche se un domani il campo sparisse di nuovo dal markup.
3. **L'InBody continua ad aggiornare l'altezza** (è il dato più recente e misurato
   sul posto), ma uno scarto oltre i **2 cm** viene dichiarato con un avviso:
   *"Altezza diversa da quella in anagrafica: 178 → 186 cm. Controlla che il
   referto sia di questo paziente."* Avvisa e aggiorna, non blocca — scelta di
   Fabrizio. Nasce da un fatto reale: nel primo collaudo un referto risultava di
   un'altra persona.

**Lezione (terza della stessa famiglia).** F5 era una whitelist di campi da
riportare che era invecchiata; F6 e F7 sono l'immagine speculare — **il codice
legge un campo che non esiste più**, e nessuno se ne accorge perché
`getElementById` su un id inesistente non dà errore: restituisce `null`, che
sembra un valore legittimo. **Quando si toglie un pezzo di markup bisogna cercare
chi lo legge.** E il presidio giusto non è ricordarsene: è che *un campo assente
non possa mai distruggere un dato*. L'audit che ha trovato tutti e sei i casi è
dieci righe di script sul corpo di `salvaPaz` incrociato con gli `id` del markup:
vale la pena rifarlo ogni volta che si tocca un modulo.

26 LUGLIO 2026 (6ª sessione, seguito) — P122 TAPPA 5: LA VISTA PAZIENTE — **P122 COMPLETA**.
Baseline `955d395`. Test 270 → **283**, tutti verdi (`s2-vista-paziente.test.js`).

**Origine.** Ultima tappa di `NutriGest_Obiettivo_Ragionamento.md`. Il preset
"🙂 Vista paziente" esisteva dalla P115 ma spegneva **solo strati del grafico**:
il paziente vedeva comunque corridoio, storico delle revisioni, editor delle
fasi e proiezione tecnica. Ora è una **modalità vera**, che cambia cosa si
racconta e non solo cosa si disegna.

**Cosa vede il paziente** (tre riquadri + i suoi traguardi):
1. **Dove sei adesso** — peso, muscolo, grasso. **In fase di massa il peso non
   compare**: al suo posto i chili di muscolo. Non è una bugia, è scegliere
   l'indicatore che descrive il progresso — in surplus il peso sale per
   costruzione e vederlo salire spaventa proprio mentre il percorso funziona.
2. **Cosa hai già ottenuto** — le vittorie **dall'inizio del percorso** (non dal
   referto più vecchio in archivio: la storia di tre anni fa non è questo
   percorso): grasso, muscolo, girovita. E quando il peso è fermo ma la
   composizione è migliorata scatta la frase che serve davvero in
   ricomposizione: *"Il peso è praticamente lo stesso, ma hai perso 2.6 kg di
   grasso e messo 3 kg di muscolo. È esattamente quello che vogliamo."*
3. **Adesso** — la fase in corso, quante settimane restano, e il traguardo di
   **questa fase** invece di quello a otto mesi (un traguardo lontano demotiva,
   uno vicino motiva). In fase di massa niente peso atteso, ma la frase *"il peso
   sale ed è giusto così: quello che guardiamo è il muscolo"*.
4. **I tuoi traguardi** (Tappa 4) con le barre di progresso, filtrati sulla fase
   in corso; quelli già mancati non si ripropongono, e in fase di massa il
   traguardo di peso viene escluso — manderebbe il messaggio opposto.

**Cosa sparisce in vista paziente:** editor delle fasi, generatore di modelli,
riga di proiezione tecnica (metodo/±%), badge della condizione di uscita,
pulsante Riallinea, data di inizio modificabile, interruttori degli strati,
note del generatore, legenda tecnica (sostituita da una riga in italiano
semplice). Restano i due pulsanti di preset per tornare alla vista tecnica.
**In fase di massa la linea della massa magra si ACCENDE** nel grafico: è l'unica
che descrive il progresso mentre il peso sale, quindi spegnerla — come faceva il
vecchio preset — era il contrario di ciò che serve.
*Nota dichiarata:* dentro il grafico l'etichetta del peso resta visibile (la
linea del peso è la spina dorsale del disegno); è il **testo** a non citarlo mai
in fase di massa. Nasconderlo anche nel grafico è una modifica di pochi minuti se
al primo uso in studio dà fastidio.

**Il messaggio WhatsApp eredita tutto** (`generaMessaggioAI`): nei dati clinici
entrano le variazioni di massa grassa, massa magra e girovita, più le righe
pronte di `_traguardoTestoPaziente`; e due istruzioni esplicite all'AI — se il
peso è fermo ma la composizione è migliorata, **costruire il messaggio su quello
e non sulla bilancia**; se il paziente è in fase di aumento, **non citare il peso
né i chili presi**, ma massa muscolare, forza e recupero. Il tutto in un try/catch:
il messaggio deve poter partire anche su un paziente senza percorso.

**P122 COMPLETA** (5 tappe + 5 correzioni post-collaudo, 25-26 luglio 2026).
Da un campo di testo libero e un numero digitato a mano a: traguardo derivato
dalla composizione con soglie di sicurezza per sesso · la domanda in visita
strutturata con l'aspettativa del paziente · le fasi generate dal traguardo con
il riallineo · traguardi multipli e comportamentali con condizione di uscita ·
la vista paziente. Test da 197 a **283**.

**Da collaudare.** Su un paziente in fase di massa: scheda 📈 Percorso →
🙂 Vista paziente. Deve sparire tutto ciò che è clinico, il peso non deve
comparire nei testi, e la linea rosa della massa magra deve accendersi. Poi
genera un messaggio WhatsApp e verifica che non parli di chili presi.

26 LUGLIO 2026 (6ª sessione, seguito) — P122 TAPPA 4: TRAGUARDI MULTIPLI, CONDIZIONE DI USCITA DELLE FASI, CHIUSURA CON ESITO.
Baseline `e25daaf`. Test 254 → **270**, tutti verdi (`s2-traguardi-multipli.test.js`).

**Origine.** Quarta tappa di `NutriGest_Obiettivo_Ragionamento.md`, promossa da
"bella da avere" a necessaria dal collaudo: dopo la correzione sulla
ricomposizione è chiaro che **in un percorso ben riuscito il peso può non
muoversi affatto**. Un solo traguardo di peso ha un difetto fatale — quando la
bilancia è ferma il paziente non ha nessuna vittoria disponibile, e chi non ha
vittorie molla.

**1. TRAGUARDI MULTIPLI** (`p.obiettivoPercorso.traguardi[]`, opzionale).
Sette tipi, ognuno con il **valore attuale letto dai dati che l'app ha già**:
% di grasso, massa grassa, massa magra, peso, girovita (dall'InBody e dalle
pesate intermedie), esame del sangue (dal referto datato più recente, riusa
`_andSerie` di P118), e **comportamento**.
- La **partenza** viene fotografata alla creazione — dopo non sarebbe più
  recuperabile — e da lì esce il progresso 0-100% con la barra.
- Il **verso** è fisso dove ha senso (la massa magra si raggiunge sempre
  salendo, il grasso scendendo) e dedotto dalla partenza per peso ed esami, dove
  dipende dal paziente: un sottopeso deve salire.
- Dato mancante → `null` e "dato non disponibile": **mai un numero inventato**.
- I **comportamentali** sono l'unico tipo senza misura automatica: si segnano a
  mano ✓ o ✕ (ri-cliccando si annulla) e restano `null` finché non decidi. Sono
  l'unica vittoria disponibile in un mese storto, ed è lì che si sposta la
  stella polare quando il paziente non si impegna.
- Libreria comportamenti **scelta da Fabrizio** (26/7): passi al giorno ·
  allenamenti a settimana · ore di sonno · alcol massimo a settimana · verdura a
  pranzo e cena · sgarri massimi a settimana · acqua al giorno. Un click e il
  traguardo è assegnato col suo valore di partenza.
- Ogni traguardo può avere una **scadenza** e agganciarsi a una **fase**.
- Il select degli esami mostra **solo quelli che quel paziente ha davvero** nei
  referti: niente liste da 119 voci da scorrere.

**2. CONDIZIONE DI USCITA DELLA FASE.** Una fase può finire *"quando il grasso
scende sotto il 12%"* invece che a calendario — è come lavora Fabrizio davvero:
si passa alla massa quando il paziente è pronto, non quando lo dice la data.
Tre tipi (% grasso, peso, massa magra), con l'operatore dedotto dal verso.
Quando scatta compare un **suggerimento verde** in testata: *"Condizione
raggiunta: passi alla fase successiva?"* — e **nient'altro succede**. Scelta
esplicita di Fabrizio contro l'alternativa "accorcia la fase da sola": l'app
propone e non tocca il piano (fissato da un test che confronta il JSON del
percorso prima e dopo la valutazione).

**3. CHIUSURA DELLA FASE CON ESITO.** Il lucchetto 🔒 chiude una fase
fotografando peso, % di grasso e massa magra del giorno; la riga diventa grigia
e sotto compare *"Chiusa il … — peso 84 kg · grasso 18% · magra 66 kg"*.
Serve a Fabrizio per imparare dai suoi stessi percorsi, e al paziente per vedere
che i due mesi buoni sono contati eccome anche se poi ne sono seguiti due
storti. Ri-cliccando si riapre: nessuna azione irreversibile.

**Bug trovato dal render smoke (stessa famiglia di F5).** `_percorsoGet`
normalizzava ogni fase **ricostruendo l'oggetto con i soli tre campi originari**
(`tipo`, `settimane`, `pct`): condizione di uscita, stato ed esito venivano
salvati correttamente su `p.percorso` ma **sparivano per chi leggeva dalla
normalizzazione** — cioè la scheda, che li mostrava vuoti. Corretto conservando
i campi opzionali quando ci sono. È la stessa lezione di F5 (whitelist di campi
che invecchia), stavolta trovata in dieci minuti perché il render smoke controlla
quello che l'utente vede davvero, non solo quello che le funzioni restituiscono.

**Da collaudare.** Scheda 📈 Percorso, in fondo: aggiungi un traguardo di massa
magra e uno comportamentale, controlla che il valore di oggi e la barra di
progresso siano giusti. Nell'editor delle fasi, colonna *"…oppure finché"*:
imposta *% di grasso ≤* un valore già raggiunto e verifica che compaia il badge
verde in testata **senza che il piano cambi**. Prova 🔒 su una fase e riaprila.

26 LUGLIO 2026 (6ª sessione, seguito) — P122 CORREZIONI POST-COLLAUDO: IL MOTORE IMPARA LA RICOMPOSIZIONE + COERENZA DEI REFERTI INBODY.
Baseline `ef8c9b2`. Test 237 → **254**, tutti verdi (`s2-traguardo-correzioni.test.js`).

**Origine.** Collaudo sul campo delle Tappe 1-3 fatto da Fabrizio (note complete
nel doc di progetto `NutriGest_P122_Collaudo_e_Correzioni.md`). Cinque correzioni,
tutte nate da cose viste con gli occhi su un paziente vero.

**1. IL MOTORE NON SAPEVA COS'È LA RICOMPOSIZIONE** (la più grave).
Segnalazione testuale di Fabrizio: *"il fatto che gli scrivo che deve arrivare al
9% di grasso corporeo non implica che debba dimagrire, ma che debba perdere
grasso e aumentare muscolo."* `calcolaTraguardoComposizione` conosceva solo massa
magra **costante** o in **calo**: mancava il caso in cui SALE, che è il percorso
standard di Fabrizio. Su un paziente in ricomposizione l'app scriveva "da perdere
6.1 kg" con un obiettivo clinico che non era perdere 6 kg.
Quanto pesa l'errore, su 83 kg con 70 di magra puntando al 9%:
magra ferma → **76.9 kg** · +2 kg di magra → **79.1** · +4 → **81.3** ·
+6 → **83.5** (peso di partenza, obiettivo raggiunto). Stesso traguardo di
composizione, **6.6 kg di differenza sul peso finale**.
Ora il terzo parametro accetta `{modo, quotaMagraPersa, guadagnoMagra}` (numero
semplice ancora accettato, retrocompatibile): modo `dimagrimento` = quota del
calo da massa magra · modo `ricomposizione` = `peso = (magra + guadagno)/(1−T)`,
default +2 kg deciso da Fabrizio. **Il modo si presceglie dalla categoria
dichiarata in visita nella Tappa 2** (`ricomposizione`/`massa` → magra che sale):
la Tappa 2 finalmente *informa* la Tappa 1, e il campo che non c'entra sparisce
dalla schermata. Il pannello non dice più "da perdere X kg" ma i due numeri che
contano davvero — **grasso −5.9 kg · massa magra +2.0 kg · peso −3.9 kg** — con
la nota esplicita: in ricomposizione al paziente si mostra la coppia, non la
bilancia. *(Corollario: le Tappe 4 e 5 — traguardi multipli e vista paziente
senza peso — passano da opzionali a necessarie.)*

**2. REFERTI INBODY INCOERENTI, e la QUARTA occorrenza del pattern "due fonti".**
Il referto del collaudo aveva peso 83 kg, campo *massa magra* 70 kg e campo
*% grasso* 10%: numeri che non possono coesistere (70 su 83 significa 13 kg di
grasso, cioè **15.7%**). Il pannello scriveva serenamente «massa grassa 13 kg
(10%)», una frase che si contraddice da sola, perché prendeva la grassa da
`peso−m` e la percentuale dal campo del referto.
Nella stessa schermata comparivano anche «FFM: 74.7 kg» in alto e «calcolato su
FFM (70 kg)» in fondo: **una sola riga di tutta l'app** (in `renderPdMacros`)
ricavava la massa magra dalla percentuale, mentre motore macro, proteine g/kg,
PDF e pannello 🎯 leggono tutti il campo `m`. Quarta occorrenza del pattern già
visto in P118, P120 e P121.
Correzioni: **la % di grasso è ora SEMPRE derivata dalla massa magra usata**
(i numeri a schermo tornano sempre fra loro); i referti che non tornano
producono `mis.incoerenza` con lo scarto, il valore usato e **il valore
alternativo con cui il traguardo cambierebbe** — mostrato in arancione nel
pannello e come avviso nel motore (scelta di Fabrizio: avvisare, non bloccare,
perché un referto può avere arrotondamenti legittimi); la riga della FFM usa il
campo `m`, col ripiego solo quando manca davvero.
**Perché non è cosmetico:** al 9%, con magra 70 il traguardo è 76.9 kg, con 74.7
è 82.1. **Cinque chili, in silenzio.**

**3. IL CONFRONTO CON L'ASPETTATIVA IGNORAVA IL PESO ATTUALE.**
Su un paziente di 83 kg che ne vuole 86, con traguardo a 76.9, l'app scriveva:
*"9.1 kg più prudente del corridoio: c'è margine per alzare l'asticella insieme"*.
Ma quello vuole **crescere** mentre il traguardo lo fa **calare**: non è
prudenza, sono direzioni opposte — ed è la cosa più importante da dire in visita.
Aggiunto il livello `opposto`, e la direzione si legge dallo **scenario in uso**,
non dal centro della fascia (in ricomposizione la fascia può stare a cavallo del
peso attuale: fissato da test).

**4. DUE ETICHETTE CHE NON SI CAPIVANO.** «quota del calo da massa magra» →
«quanto del calo è massa magra», con la spiegazione sotto che cambia col modo
(Fabrizio ha dovuto chiedere cosa significasse: se non è chiaro al professionista
che la usa ogni giorno, è l'etichetta a essere sbagliata). E «Scenario realistico
non calcolabile con questi valori», che compariva con la quota a **0** dove il
calcolo è validissimo: ora dice che i due scenari semplicemente **coincidono**.

**5. TRAGUARDO SCRITTO A MANO ≠ TRAGUARDO CLINICO.** Campo *Obiettivo peso* a 86
kg e storico che diceva «→ 75.2 kg»: scrivendo il numero a mano `p.pesoTarget`
cambia e `obiettivoPercorso.clinico` resta indietro, con lo storico che mostra un
valore non più attivo. Ora il pannello se ne accorge, lo dichiara in arancione e
offre «Registra 86 kg come scelta manuale» (`_traguardoAllineaManuale`, metodo
`manuale`, con la sua riga di storico).

**Lezione.** Il collaudo sul campo ha trovato in venti minuti due errori che
nessun test avrebbe potuto trovare, perché **non erano errori di calcolo ma di
modello**: il motore era coerente con sé stesso e sbagliato rispetto alla
clinica. Un'ipotesi implicita mai scritta ("chi punta a una % di grasso più bassa
vuole dimagrire") vale quanto un bug, e si vede solo mettendo il software davanti
a chi fa il lavoro vero.

**Da collaudare.** Paziente con categoria "ricomposizione" in anagrafica →
pannello 🎯: il selettore «il muscolo, nel percorso» deve essere già su *sale*, e
il campo deve chiedere i kg di massa magra, non la quota. Verifica i numeri della
riga grasso/magra/peso. Su un referto con dati discordi deve comparire il riquadro
arancione con entrambi i traguardi possibili.

26 LUGLIO 2026 (6ª sessione) — P122 TAPPA 3: MODELLI DI PERIODIZZAZIONE + PULSANTE "RIALLINEA" — IL PERCORSO SMETTE DI ESSERE UN GRAFICO E DIVENTA UN PIANO.
Baseline `bf3aa6d`. Test 225 → **237**, tutti verdi (`s2-percorso-generatore.test.js`).

**Origine.** Terza tappa di `NutriGest_Obiettivo_Ragionamento.md`. Prima le fasi
della scheda 📈 Percorso si scrivevano a mano una per una; ora l'app le genera
dal traguardo (Tappa 1), e il piano regge anche il paziente che sparisce un mese.

**Cosa è stato fatto.**
1. **Motore puro `_percorsoGeneraFasi(p, modello)`** con 4 modelli:
   - **Ricomposizione** (lo standard di Fabrizio): deficit a cicli fino al
     traguardo → stabilizzazione → massa;
   - **Dimagrimento a cicli**: come sopra, senza massa finale;
   - **Massa prima, definizione poi**: surplus a cicli (fino al traguardo se è
     sopra il peso attuale, altrimenti due blocchi standard);
   - **Mantenimento/salute**: una fase sola, i traguardi sono esami e abitudini.
   Regole cliniche codificate: **blocchi di deficit mai oltre 12 settimane**
   (stress tiroideo/adattamento), **mantenimento di 4 settimane tra i blocchi**,
   **6 settimane di stabilizzazione prima della massa**, guardia a **8 cicli**
   (oltre, il traguardo va ridiscusso — la nota lo dice — non il piano allungato).
   Il ritmo usato per dimensionare i blocchi è lo STESSO della proiezione P115
   (TDEE × %fase ÷ 7700): generatore e grafico non possono contraddirsi.
2. **Le fasi generate sono fasi normali** di `p.percorso`: nessuna struttura
   nuova, tutto modificabile/riordinabile/cancellabile come prima. La
   generazione PROPONE: se esistono già fasi chiede conferma esplicita prima di
   sostituirle (mai una riscrittura silenziosa). Senza traguardo impostato, i
   modelli a deficit si fermano e mandano al pannello 🎯 della Tappa 1.
3. **⏩ Riallinea a oggi** (`percorsoRiallinea` + `_percorsoShiftGiorni` pura):
   il paziente sparisce sei settimane e torna → un click e tutto il piano trasla
   in avanti. L'**ancora è l'ultima pesata registrata** (fin lì il percorso è
   stato vissuto; il buco dopo è tempo fermo), e la traslazione conserva
   l'offset dentro le fasi: si riprende ESATTAMENTE dal giorno-fase in cui ci
   si era fermati — matematica, non stima (fissato da test). Sotto i 7 giorni
   di scarto il pulsante risponde "già allineato" e non tocca nulla.
4. **Via la bocciatura**: "Oggi fuori dalle fasi pianificate" (arancione,
   tono da esame fallito) è diventato "⏸ Il piano è rimasto indietro — capita
   in tutti i percorsi veri" (azzurro), con il pulsante ⏩ accanto. Il pulsante
   è sempre visibile nella testata della scheda, perché il caso tipico è il
   paziente sparito A METÀ percorso, non a percorso finito.
5. UI: a percorso vuoto, accanto a "➕ Crea il percorso a mano" c'è
   "🧭 Genera le fasi" con il menu dei modelli (regole dichiarate sotto, in
   piccolo); a percorso esistente, "Rigenera dal traguardo" nel footer
   dell'editor. Dopo la generazione compare UNA volta il riquadro con modello,
   ritmo previsto e note cliniche del generatore.

**Da collaudare in produzione.** (1) Paziente con traguardo impostato (Tappa 1)
→ scheda 📈 Percorso → modello "Ricomposizione" → 🧭 Genera: le fasi devono
avere senso clinico ai tuoi occhi (blocchi ≤12 sett., mantenimenti giusti,
massa in fondo); la proiezione deve toccare il traguardo dentro le fasi di
deficit. (2) Paziente SENZA traguardo → il generatore deve rifiutarsi e
mandarti al pannello 🎯. (3) Su un percorso con l'ultima pesata vecchia di
settimane → ⏩ Riallinea: le date delle fasi traslano, il grafico segue.
(4) Rigenera sopra fasi esistenti → deve chiedere conferma.

**Resta da fare (P122 tappe 4-5):** traguardi multipli (composizione, esami,
circonferenze, comportamento) + condizione di uscita dalle fasi; vista paziente
del traguardo. Consiglio: prima un giro di collaudo sul campo delle tappe 1-3.

25 LUGLIO 2026 (5ª sessione, seguito) — P122 TAPPA 2: LA DOMANDA IN VISITA, STRUTTURATA · F6: IL CAMPO OBIETTIVO ERA SPARITO DAL MODAL E OGNI SALVATAGGIO LO AZZERAVA.
Baseline `b30fa38`. Test 212 → **225**, tutti verdi (`s2-obiettivo-paziente.test.js`).

**Origine.** Seconda tappa del piano di `NutriGest_Obiettivo_Ragionamento.md`:
la domanda che Fabrizio fa a ogni prima visita — *"qual è il tuo obiettivo?"* —
diventa un dato strutturato invece di una risposta che si perde.

**F6 — bug trovato subito, stessa famiglia di F5.** Il campo `p-obiettivo` era
**sparito dal markup** del modal anagrafica in qualche revisione passata, ma
`salvaPaz` continuava a leggerlo: elemento assente → stringa vuota → **ogni
salvataggio dell'anagrafica azzerava `p.obiettivo` in silenzio**. È il motivo
per cui la domanda in visita non aveva più una casella da nessuna parte.
La Tappa 2 ricrea il campo (e ci costruisce intorno la sezione nuova), chiudendo
anche questo buco. Lezione: quando si rimuove un pezzo di markup, cercare chi lo
legge — un `getElementById` orfano non dà errori, produce dati vuoti.

**Cosa è stato fatto (Tappa 2).**
1. **Sezione 🎯 nel tab Dati** del modal anagrafica, subito dopo il contesto
   emotivo: obiettivo dichiarato (parole del paziente, torna in `p.obiettivo`),
   categoria (dimagrire / ricomposizione / massa / salute / performance /
   mantenimento), **"cosa cambierebbe nella tua vita quando ci arrivi?"** (la
   motivazione vera, da rileggergli al terzo mese), **peso che si aspetta
   LUI/LEI** — registrato apposta anche se irrealistico: Foster 1997, il "peso
   dei sogni" sta a ~−30% e il divario non affrontato è la prima causa di
   abbandono al 4°-6° mese —, **"c'è una data che conta per te?"** (evento +
   data: matrimonio, estate, gara), e i due numeri che valgono più di mezz'ora
   di anamnesi: **importanza 0-10 e fiducia 0-10**.
2. **Scrittura**: `_obiettivoPazienteDaForm(pd)` scrive SOLO
   `obiettivoPercorso.paziente` (clinico e storico restano intatti, già protetti
   da `_pazPreservaCampi`), non crea strutture vuote se non c'è niente da dire,
   e la **data racconta quando il paziente l'ha detto**: resta quella della
   prima dichiarazione finché il contenuto non cambia. Senza markup è un no-op
   assoluto (test e contesti legacy).
3. **Confronto aspettativa ↔ corridoio** (`_traguardoConfrontoAspettativa`,
   pura): nel pannello 🎯 della scheda Macros, sotto la fascia calcolata, appare
   il confronto con il peso atteso dal paziente — dentro il corridoio ("siete
   allineati — diglielo, è raro"), oltre il bordo prudente (divario
   quantificato: "7.9 kg OLTRE… è la conversazione della prima visita"), o più
   prudente del corridoio ("margine per alzare l'asticella insieme"). Il lato
   "ambizioso" si ribalta correttamente nei percorsi di massa.
4. **La voce del paziente nel pannello** (`_traguardoVocePazienteHtml`):
   categoria, parole sue, aspettativa, scadenza personale, importanza/fiducia —
   e quando importanza ≥7 con fiducia ≤4, l'avviso operativo: *"sa cosa vuole ma
   non crede di farcela: parti da traguardi comportamentali piccoli e vincibili"*.
5. **Contesto AI** (`costruisciContestoPaziente`): blocco "OBIETTIVO DEL
   PAZIENTE" con categoria, motivo, aspettativa (marcata "NON è il target
   clinico"), scadenza personale, importanza/fiducia con la stessa regola
   operativa, il traguardo clinico derivato (% grasso → fascia, chi ha deciso)
   e la riga "⚠ Divario aspettativa-traguardo" quando supera 1 kg. I pazienti
   senza Tappa 2 non producono il blocco: retrocompatibilità fissata da test.

**Da collaudare in produzione.** (1) Apri l'anagrafica di un paziente: nel tab
Dati c'è la sezione 🎯; compila, salva, riapri: i valori tornano. (2) Con
un'aspettativa compilata, scheda Macros → pannello 🎯: compare "La voce del
paziente" e, sotto la fascia, il confronto. (3) Avvia il ragionamento AI e
verifica che il blocco OBIETTIVO DEL PAZIENTE arrivi nel contesto. (4) Verifica
F6: scrivi un obiettivo, salva, riapri — prima di oggi si azzerava.

**Resta da fare (P122 tappe 3-5):** modelli di periodizzazione + "riallinea";
traguardi multipli e fasi con condizione di uscita; vista paziente del traguardo.

25 LUGLIO 2026 (5ª sessione) — P122 TAPPA 1: IL TRAGUARDO SI DERIVA DALLA COMPOSIZIONE CORPOREA · F5: LA MODIFICA DELL'ANAGRAFICA CANCELLAVA IN SILENZIO PERCORSO, REFERTI DEL SANGUE E RICHIESTE ESAMI.
Baseline `924414b`. Test 197 → **212**, tutti verdi (`s2-traguardo-composizione.test.js`).

**Origine.** Domanda di Fabrizio: in visita chiede sempre al paziente *"qual è il
tuo obiettivo?"*, ma nell'app quella risposta finisce solo in `p.obiettivo`
(testo libero, usato per estetica in intestazione/PDF/prompt), mentre il numero
che conta davvero — `p.pesoTarget` — lo decide lui a mano. *"Chi dovrebbe
decidere quel peso: io, il paziente, il Peso Ideale del referto InBody, il
BMI?"* Analisi completa nel doc di progetto `NutriGest_Obiettivo_Ragionamento.md`
(cinque tappe: questa è la prima).

**La risposta è: nessuno dei quattro.** Il traguardo primario non è un peso, è
una **percentuale di grasso**, e il peso ne è la conseguenza aritmetica:
`peso obiettivo = massa magra / (1 − %grasso/100)`. È già il metodo clinico reale
di Fabrizio ("li porto al 10-12% e poi faccio massa"): ragiona in composizione,
non in chili. Gli altri riferimenti sono più deboli e restano solo di confronto —
il **Peso Ideale InBody non usa la massa magra appena misurata** (lo deriva da
altezza e sesso, di fatto un BMI di riferimento: su un muscoloso è sistematicamente
basso), il BMI è statistica di popolazione, Devine e Robinson sono formule nate
per dosare i farmaci.

**Cosa è stato fatto (Tappa 1).**
1. Motore puro `calcolaTraguardoComposizione(p, %target, quotaMagraPersa)`: dalla
   misurazione InBody più recente produce **due scenari**, non un numero secco —
   *ottimista* (massa magra tutta conservata) e *realistico* (una quota del calo
   è massa magra, default 20%, regolabile). Vincolo del realistico:
   `m − q·X = (1−T)·(peso − X)` → `X = (m − (1−T)·peso)/(q − (1−T))`.
   Sul paziente di riferimento (92 kg, magra 68, grasso 26.1%) puntando al 12%:
   **77.3 kg** ottimista, **72.9 kg** realistico. La fascia tra i due È il
   traguardo onesto: dove cadrai dipende da quanto proteggi la massa magra, cioè
   da proteine e allenamento coi pesi — le due leve su cui si può agire.
2. **Soglie di sicurezza per sesso**, non negoziabili: uomo blocco <6% / avviso
   <10%; donna blocco <14% / avviso <20%. Il "10-12%" di Fabrizio è una soglia
   MASCHILE: l'equivalente clinico femminile sta sul 18-22% e sotto il 16%
   compaiono amenorrea e alterazioni ormonali. **Senza il sesso in anagrafica il
   motore non calcola** e lo dice: meglio fermarsi che riempire con un default
   plausibile (regola 11). Avvisi anche su BMI fuori norma e su cali >20% del peso
   ("va spezzato in più cicli").
3. **Un solo punto di scrittura** (`_traguardoScrivi`, regola 10): aggiorna
   `p.obiettivoPercorso.clinico`, appende le righe di **storico** dei campi
   cambiati (data · da → a · motivo · chi ha deciso) e allinea `p.pesoTarget`
   come **specchio derivato** — così proiezione P115, box "mancano X kg",
   contesto AI e PDF continuano a funzionare senza toccare una riga.
   Il traguardo non si sovrascrive mai in silenzio: è la stessa lezione di P118
   (referti datati) e P120 (storico InBody ordinato), applicata al terzo dato che
   racconta il tempo.
4. Registrato **chi ha deciso** (medico / condiviso / paziente) e con quale
   metodo. Costa due campi e, fra cento pazienti, risponde a una domanda che oggi
   nessuno può porsi: con quale modo di fissare l'obiettivo i pazienti arrivano
   in fondo più spesso.
5. UI dentro `#mac-peso-rif-box` (scheda Macros): pannello 🎯 sopra i chip di
   confronto, anteprima live che non ridisegna i campi mentre digiti (niente
   perdita di focus), due bottoni "Usa X kg" — **assenti quando il traguardo è
   sotto la soglia del grasso essenziale**, dove i numeri si mostrano ma non si
   applicano. I chip esistenti (Peso Ideale InBody, BMI, Devine, Robinson) restano
   ma sono stati **declassati a "solo per confronto"**, con scritto perché.

**F5 — bug silenzioso trovato durante il lavoro (grave).** `salvaPaz`, nel ramo
di modifica, ricostruiva il paziente da zero dal form e riportava dal vecchio
oggetto solo un **elenco esplicito di campi**. Quella whitelist era ferma a
prima delle ultime funzioni: **`p.percorso` (P115), `p.refertiSangue` (P118),
`p.richiesteAnalisi` (P116), `p.consuntivo` e `p.creato` non c'erano**. Effetto:
aprire l'anagrafica di un paziente e premere Salva **cancellava la timeline di
periodizzazione e l'intero archivio dei referti del sangue datati**, senza un
errore a video — restava solo `p.analisiSangue`, cioè lo specchio derivato, che
faceva sembrare tutto a posto. Non era ancora emerso perché P115/P118 sono del
24 luglio e il collaudo non era stato fatto.
**Fix nel punto di scrittura, non un allungamento della lista:**
`_pazPreservaCampi(pd, _old)` riporta per costruzione **tutto ciò che il form non
produce** (`if(!(k in pd)) pd[k]=old[k]`), quindi ogni campo futuro è al sicuro
dal primo giorno; i campi gestiti dal form restano quelli del form, anche quando
vengono svuotati di proposito. Nello stesso giro protetto anche `pesoTarget`, che
ora è uno specchio derivato: veniva letto da `mac-peso-target`, cioè dalla scheda
Macros **aperta**, che può appartenere a un paziente diverso da quello che si sta
modificando — ora il campo si usa solo se è lo stesso paziente, con ripiego sul
valore precedente invece che su `null`.

**Lezione (quarta della famiglia, dopo P118, P120 e F4).** Una **whitelist di
campi da preservare è un elenco che qualcuno deve ricordarsi di allungare**: prima
o poi non succede, e il dato sparisce in silenzio. Quando la scelta è tra
"elencare ciò che si salva" e "elencare ciò che si sostituisce", la seconda è
l'unica che regge il tempo — perché il codice nuovo è sempre nella categoria che
non è stata elencata.

**Da collaudare in produzione.** (1) Paziente con InBody e sesso impostato →
scheda Macros → pannello 🎯: cambia la % obiettivo e guarda muoversi i due
scenari; prova un valore assurdo (4% su un uomo) e verifica che i bottoni
spariscano. (2) Premi "Usa X kg": il campo Obiettivo peso si compila e la scheda
📈 Percorso aggiorna la data di raggiungimento. (3) Ripeti con una % diversa e
controlla la riga "Storico: … ultima il … 77.3 → 74.0 kg". (4) **Verifica di
F5:** apri un paziente che ha percorso e referti del sangue, modifica
l'anagrafica, salva, e controlla che scheda 📈 Percorso e archivio referti siano
ancora lì.

**Resta da fare (P122 tappe 2-5):** la domanda in visita strutturata (categoria,
motivo, aspettativa del paziente, scadenza personale, importanza/fiducia);
i modelli di periodizzazione che generano le fasi dal traguardo + il pulsante
"riallinea"; i traguardi multipli (composizione, esami, circonferenze,
comportamento); la vista paziente del traguardo di fase.

25 LUGLIO 2026 (4ª sessione) — P121: MOTORE UNICO DELLE GRAMMATURE DELLE ALTERNATIVE.
Baseline `d905489`. Test 181 → **197**, tutti verdi (`s2-grammature-alternative.test.js`).

**Origine.** Fabrizio segnala che cambiando la grammatura di un alimento le
alternative a volte cambiano e a volte no, e che i numeri risultanti sono spesso
strani: 10g di olio davano un avocado ora a 20g ora a 75g. L'analisi (doc di
progetto `NutriGest_Grammature_Analisi.md`) ha trovato **cinque sorgenti di
grammatura che non si parlavano** e due comandi di modifica con comportamento
opposto — non una formula sbagliata.

**Root cause.**
1. `apriEditGrammatura` **scalava** le alternative in proporzione (`nuovo/vecchio`,
   arrotondato a 5g ad ogni passaggio), mentre `pmgCambiaGrammi` (pannello Macros)
   **non le toccava affatto**: da qui il "delle volte cambiano e delle volte no".
   La scalatura è corretta solo se la cella partiva già equivalente — quasi mai,
   perché i numeri arrivavano dall'AI o dai default di database. Moltiplicava
   l'errore invece di correggerlo, e arrotondava ad ogni giro accumulando deriva.
2. `PORZIONI_DISCRETE` era una **lista chiusa di totali ammessi** e prendeva sempre
   il valore più vicino, senza limite di distanza: 102g di fette biscottate
   (l'equivalente in carboidrati di 80g di pasta, cioè 10 fette) finivano
   schiacciati sul massimo della lista, **36g**; 282g di uovo a 150g. Fino al −65%,
   in silenzio. Il modello giusto è quello del nutrizionista: quanto pesa un pezzo,
   e quanti pezzi servono.
3. Il criterio di equivalenza era scelto per categoria del principale, con le
   verdure sulle **kcal** (200g di zucchine ≡ 63g di carote) e l'avocado dentro la
   categoria Frutta con equivalenza sui carboidrati (150g di mela ≡ **833g** di
   avocado, ha 1,8g di carboidrati per 100g).
4. L'output dell'AI non veniva mai ricontrollato: `_normalizzaPianoNuovo` copiava
   `g` così com'era. E la riga del prompt con le alternative ai grassi era scritta
   a mano e non coincideva col motore ("frutta secca mista 20g per 10g di olio",
   valore vero sui grassi 11g).

**Regole decise con Fabrizio** (doc di progetto `NutriGest_Grammature_Regole.md`):
cereali/frutta **carboidrati** · proteine **proteine** · legumi **carboidrati ma solo
tra legumi** · olio+grassi **grassi** (non più kcal: l'olio è 100% lipidi, sulle kcal
entravano anche carboidrati e proteine dell'alternativa) · verdura **nessuna
equivalenza**, stessa grammatura del principale. Alimenti di gruppi diversi (il legume
sotto la pasta) non si calcolano: prendono la porzione standard di database — è così
che i "120g di legumi in barattolo" del prompt e l'equivalenza convivono senza
contraddirsi. **Nessun tetto di plausibilità**, deciso esplicitamente da Fabrizio:
80g di pasta valgono davvero 354g di patate e 150g di pollo valgono davvero 275g di
uovo, e il valore vero si mostra sempre.

**Implementazione.**
- `ricalcolaAlternative(cella)` è ora l'**unico punto** che scrive la grammatura di
  un'alternativa, chiamato da `apriEditGrammatura`, `pmgCambiaGrammi`, `cellaSwap`,
  `cellaAggiungiAlt` e da `_normalizzaPianoNuovo` (output AI: l'AI decide *cosa*,
  l'app decide *quanto*). Il principale non si tocca mai. Le ricette composte (B7)
  sono escluse, hanno macro propri.
- `_GRUPPI_EQUIV` + `_gruppoEquiv` sostituiscono `criterioByCat`, che decideva sul
  solo principale e non sapeva nulla dell'alternativa.
- `arrotondaGrammatura` sostituisce `arrotondaPorzioneDiscreta`: `_PESI_UNITARI`
  (uovo 55g, fetta biscottata 10g, scatoletta 60g, panetto di tofu 125g…) → numero
  intero di pezzi **senza tetto**; tutto il resto multipli di 5g. I latticini sono
  fuori dalla tabella di proposito: lo yogurt non va incastrato sul vasetto da 125g,
  a molti pazienti va prescritto a 200g perché comprano la confezione grande.
- Avocado spostato a categoria funzionale `grasso` in `_ALIMENTI_OVERRIDE_CATEGORIA`
  (la categoria semaforo resta "Frutta", quindi **nessun dato paziente cambia**) e
  non più proposto tra le alternative in una cella di frutta.
- Interfaccia: accanto a ogni alternativa l'etichetta del criterio
  (`≈carbo`/`≈prot`/`≈grassi`/`fissa`/`porzione`), che prima era impossibile dedurre.

**Due bug silenziosi trovati strada facendo e corretti nello stesso giro:**
- Il popup "Aggiungi alternativa" leggeva `a.g` ma `cellaAggiungiAlt` costruisce gli
  oggetti con `gDefault`: il ripiego era sempre `undefined` e cadeva sul generico di
  categoria. Codice morto che sembrava funzionante.
- Il popup "Aggiungi alimento" salvava in `alimenti[].categoria` la categoria
  **semaforo** ("Cereali con Glutine") dove tutto il resto del codice si aspetta
  quella **funzionale** ("carbo"). Conseguenza: i ripieghi di `getValoriCREA` non
  scattavano mai e un alimento assente da CREA contava **0 kcal** nel calcolo dei
  macro, mostrando "—" senza alcun errore.

**Lezione (famiglia di regola 10/11 di CLAUDE.md).** Quando lo stesso dato può essere
scritto da più punti, il problema non è mai la formula: è che non esiste **un** punto
di scrittura. Qui cinque sorgenti producevano numeri tutti "plausibili" e nessuno
sbagliato in modo visibile — la diagnosi è arrivata solo ricalcolando a mano i valori
della schermata e vedendo che 94g e 354g venivano dal motore mentre 75g era la porzione
di default del database. **Corollario nuovo:** un arrotondamento verso una lista chiusa
di valori ammessi è un troncamento travestito — se la lista non copre il dominio, il
valore fuori scala non viene segnalato, viene silenziosamente riportato dentro.

25 LUGLIO 2026 (3ª sessione) — COLLAUDI P119/P120 + RIALLINEAMENTO DOCUMENTALE.
Baseline `339b08d`. Nessuna modifica funzionale: solo un commento rinominato,
INDEX.md riallineato e documentazione messa in pari.

**COLLAUDI, entrambi con esito positivo.**
*P119* — generazione reale con `🔄 Rigenera` (il pulsante normale può rispondere
dalla cache 90gg, e in quel caso `costruisciPrompt` non viene nemmeno eseguita:
è il motivo per cui al primo tentativo la riga di log non compariva). Console:
`[Prompt] Filtro stagionale ATTIVO (estate): 31/31 ricette candidate` →
`[Prompt] Ispirazione: 31/31 ricette pescate (tetto 120, bilanciata per pasto
attivo + casuale)`, con i 31 nomi presenti nel prompt completo.
**Osservazione utile emersa dal collaudo:** 31/31 *dopo* il filtro stagionale
significa che nessuna ricetta ha `attributi.stagioni` valorizzato — il pre-filtro
esiste ma non ha su cosa lavorare. Da ricordare al momento del carico massivo:
metadata compilati = pool già su misura del paziente e tetto quasi mai raggiunto.
*P120* — verificato su paziente reale: data del test letta dal referto invece di
"oggi", secondo referto più vecchio caricato dopo il primo senza che diventi
"l'attuale", avviso anti-doppione sulla stessa data.

**RIALLINEAMENTO DOCUMENTALE** (le tre inezie annotate a fine 2ª sessione):
1. Commento del codice della pescata bilanciata rietichettato da `P37` a `P119`
   (chi cercava "P119" in `index.html` non trovava nulla); il riferimento storico
   a P37 resta nella riga del tetto token come "(P37, poi P119)".
2. `INDEX.md` riallineato: ricalcolate **tutte** le 772 voci (l'ultimo
   riallineamento era del 24 lug, su un file di 23.978 righe contro le 25.063 di
   oggi), aggiunte `_ricPescaBilanciata`, `_ibNormalizzaData`, `_ibOrdinaPerData`,
   e **ricalcolati anche i 40 range "Righe A-B" di sezione**, che erano rimasti
   indietro rispetto alle voci da almeno due rigenerazioni (davano intervalli
   scollegati dai numeri elencati sotto: chi li usava per un `view_range` mirato
   apriva il pezzo di file sbagliato).
3. Intestazione "Aggiornato:" del Contesto riportata al 25 luglio: era ferma al 17
   pur essendo il file aggiornato nei contenuti in 5 sessioni successive.
4. Schede P119 e P120 nella Roadmap: stato da "CHIUSA" a "CHIUSA E COLLAUDATA",
   con l'esito dei collaudi registrato nella scheda.

**LEZIONE:** i collaudi arrivano quasi sempre *dopo* il commit che consegna la
modifica, quindi lo stato "collaudata" resta fuori dal repo se non si passa una
seconda volta. Vale la pena chiudere la sessione con un giro di riallineamento
dedicato invece di rimandarlo alla successiva — costa cinque minuti e evita che
la prossima sessione legga "chiusa, collaudo da fare" per qualcosa già verificato.

25 LUGLIO 2026 (2ª sessione) — P120: STORICO INBODY A PROVA DI CARICO GRADUALE.
Baseline `c2f9800`. **Nasce e chiude P120.** Nata da un piano di lavoro di
Fabrizio: ha molti pazienti storici con 1, 2 o anche 10 referti BIA e vuole
caricarli un paziente alla volta nel tempo — tipicamente il giorno che il
paziente torna. L'analisi del codice ha trovato che **proprio quel piano era il
caso in cui l'app sbagliava in silenzio.**

**LA ROOT CAUSE (la parte da rileggere fra sei mesi):** una ventina di punti del
codice leggono la misurazione corrente come `p.inbody[p.inbody.length-1]` —
l'**ULTIMA INSERITA**, non la più recente per data. Fra questi: motore TDEE,
contesto AI del generatore (`costruisciPrompt`), badge BMI in lista, cross-check
Mifflin (P114 passo 7), PDF. Solo TRE punti ordinavano per data (`renderPdInbody`,
`renderMemoriaInbody`, render scheda). E `salvaInbody()` faceva `push` senza
riordinare. Scenario reale: paziente che torna → salvi la BIA nuova → recuperi
5 referti vecchi e li carichi → l'ultimo inserito è del 2023 → **TDEE, macro e
prompt AI calcolati sul peso di tre anni prima, senza un errore a video.**

**COSA (tre interventi, tutti nell'area InBody):**
1. `_ibOrdinaPerData(p)` — ordina `p.inbody` per data crescente. Chiamata da
   `salvaInbody()` (dopo il push, prima del `save`), da `_pazFetchBlob()` e da
   `loadLocal()` come migrazione idempotente sui dati già esistenti. **Una
   funzione rende corretti tutti e ~20 i punti senza toccarne nessuno**: se
   l'array è ordinato, l'ultima posizione È la misura più recente. Le voci senza
   data finiscono in testa, così non possono diventare "l'attuale".
2. `data_referto` aggiunta al prompt di `loadInbodyPDF()` + `_ibNormalizzaData()`
   (accetta YYYY-MM-DD e DD/MM/YYYY con varianti punto/trattino, con o senza ora;
   scarta futuro, pre-1990 e giorni inesistenti). Prima il campo data restava su
   **oggi** (precompilato da `openInbody`) e la data del test non veniva nemmeno
   chiesta all'AI: importare 10 referti storici produceva 10 misurazioni datate
   oggi e lo storico non nasceva. Ora: data letta dal referto → campo compilato +
   conferma verde; data non leggibile → **campo svuotato**, avviso arancione
   (`#ib-data-hint`) e `salvaInbody()` che **blocca il salvataggio**. Il ripiego
   `|| today()` è stato rimosso di proposito: era l'unica via per cui una
   misurazione potesse prendere in silenzio la data sbagliata.
3. Anti-doppione per data in `salvaInbody()`: se esiste già una misurazione con
   quella data, `confirm()` con scelta sostituisci/aggiungi (mantenendo l'`id`
   originale in caso di sostituzione). Due BIA nello stesso giorno restano
   legittime (digiuno + post-pranzo), quindi la decisione resta a Fabrizio — non
   una deduplica forzata come per le pesate intermedie.

**PERCHÉ ORDINARE INVECE DI CORREGGERE I ~20 PUNTI:** correggerli uno per uno
significava toccare motore TDEE, prompt AI e PDF nello stesso commit — rischio
alto su codice clinico, per un beneficio identico. L'invariante "array ordinato"
sposta la correttezza in un posto solo. Stessa logica della P118 tappa 1, dove i
valori "attuali" del sangue sono diventati uno specchio derivato del referto più
recente invece di 119 letture da correggere.

**TEST:** 169 → **181**, tutti verdi. Nuovo `s2-inbody-storico.test.js` (12 test)
sui due helper puri: formati data italiani e ISO con ora, valori non
interpretabili → `null`, date implausibili scartate, ordinamento con referti
sparsi (verifica esplicita che `p.inbody[length-1]` sia la più recente), array
già ordinato → `false`, voce senza data in testa, casi limite (paziente nullo,
`inbody` assente/vuoto/non-array), due misurazioni nello stesso giorno entrambe
conservate, più un controllo sul testo del prompt (chiede `data_referto`, vieta
di dedurla, avverte di non confonderla con la data di nascita).

**LEZIONE PERMANENTE (codificata anche in CLAUDE.md, regola 10):** quando un
array cronologico viene letto come "l'ultimo elemento = lo stato attuale", quella
è una **invariante implicita di ordinamento** che nessuno dichiara e che il primo
inserimento fuori ordine rompe in silenzio. Il rimedio giusto è garantire
l'invariante nel punto di scrittura, non correggere i punti di lettura. Terzo
caso della stessa famiglia dopo P118 tappa 1 e il pattern "doppia fonte" (F4).

**NOTA OPERATIVA per il carico storico:** per far esistere un paziente bastano
nome e cognome (`salvaPaz`); il primo referto InBody regala anche data di
nascita, sesso e altezza (`window._ibAutofill`, `p.altezza`). Se si precaricano
pazienti storici come **attivi** con `visitaData` vecchia, `renderScadenzeAlert`
accende "👻 Paziente sparito" oltre i 28 giorni: archiviarli (`p.stato='archiviato'`,
esclusi da allarmi/lista/menu generatore, dati conservati, ritorno con un click)
oppure lasciare `visitaData` vuota. Metodo completo nel doc di progetto
`NutriGest_Pazienti_Storici_Metodo.md`.

25 LUGLIO 2026 — P119: PESCATA BILANCIATA DELL'ISPIRAZIONE (ricettario grande).
Baseline `ccdf6c4`. **Nasce e chiude P119** (fase 1). Nata da una domanda di
Fabrizio, non da un bug segnalato: ha molte ricette pronte da caricare e ha
rimandato per mesi per paura di "sovraccaricare" il generatore o di rendere
più pesanti le modifiche al codice.

**LE DUE PAURE ERANO INFONDATE — vale registrarlo perché tornerà la domanda:**
(1) le ricette non stanno in `index.html` (solo le 6 di `RICETTE_DEFAULT`) ma
nella tabella dedicata `ricette` su Supabase: caricarne 500 non aggiunge una
riga al file, quindi costo in token e rischio delle modifiche restano identici;
(2) all'AI arrivano **solo i nomi** delle ricette (`Per ispirazione attingi a:`),
non ingredienti né macro, quindi il costo del prompt non dipende dal numero di
ricette in archivio. Nessun sovraccarico era tecnicamente possibile.

**IL PROBLEMA VERO, TROVATO CERCANDO ALTRO:** `costruisciPrompt` chiudeva con
`ricetteDB.slice(0,80)` — le **prime** 80 nell'ordine di arrivo da
`pullRicetteSupabase`, che interroga `?select=id,data` **senza `ORDER BY`**.
Ordine arbitrario ma stabile ⇒ venivano scartate **sempre le stesse ricette di
coda**, a ogni generazione e per ogni paziente. Con 200 ricette candidate ~120
lavoravano e ~80 erano scritte per niente. Due effetti collaterali: rigenerare
un piano per lo stesso paziente attingeva sempre allo stesso pool (varietà
apparente ma non reale), e un ricettario sbilanciato (60 pranzi, 5 colazioni)
poteva annegare le colazioni dentro i pranzi.

**COSA:** `_ricPescaBilanciata()` (annidata in `costruisciPrompt`, accanto a
`_ricSlots`) sostituisce il taglio. Tetto **80 → 120** nomi (80 nomi ≈ 600
token: il margine c'era tutto). I posti sono ripartiti per **pasto ATTIVO** con
pesi `colazione 1 · spuntino 1 · pranzo 1,5 · cena 1,5 · pre_nanna 0,5`,
**mescolata Fisher-Yates dentro ogni gruppo**, quota max 15% del tetto per le
ricette a pasto indeterminato (che restano tenute, come prima: filosofia
conservativa invariata), redistribuzione dei posti avanzati dai gruppi più
piccoli della loro quota, deduplica per nome (una ricetta su pranzo+cena conta
una volta sola). I tre filtri conservativi a monte — pasto attivo, stagione con
guardia anti-pool-vuoto, keto — sono **invariati**: il prompt clinico non è
stato toccato in nessun punto.

**PERCHÉ COSÌ e non solo alzando il tetto:** alzare il tetto da solo non
risolveva niente — con 200 ricette avresti continuato a scartare sempre le
stesse 80. È la **pescata casuale** il pezzo che conta; il tetto più alto serve
solo a renderla più ricca. Registrato perché è la tentazione ovvia da evitare
se la voce tornasse in discussione.

**TEST:** 161 → **169**, tutti verdi. Nuovo file `s2-ispirazione-pescata.test.js`
(8 test): tetto a 120 con 200 ricette e zero duplicati, ogni pasto attivo
rappresentato, due generazioni consecutive che danno elenchi diversi,
ricettario sbilanciato (5 colazioni + 150 pranzi → tutte e 5 le colazioni
passano), ricettario piccolo che passa intero senza regressioni, ricetta su due
pasti contata una volta, pasto indeterminato tenuto ma sotto il 15%, ricettario
vuoto con fallback "cucina italiana tradizionale" invariato. La funzione è
annidata e non esportata: i test la verificano dall'esterno leggendo la riga
"Per ispirazione attingi a: ..." del prompt — pattern riusabile per le altre
parti interne di `costruisciPrompt`.

**LEZIONE (non sul codice, sul metodo):** la paura di Fabrizio era ragionevole
ma puntava al bersaglio sbagliato, e la risposta giusta non era rassicurarlo:
era leggere il codice. Il costo del prompt era un non-problema; lo spreco
silenzioso di due terzi del suo lavoro futuro era un problema reale che nessuno
avrebbe visto, perché non produce errori — produce solo piani meno vari.
**Un tetto tarato su un archivio piccolo diventa un collo di bottiglia
invisibile quando l'archivio cresce: quando si scrive un `slice(0,N)` "per i
token", va scritto insieme al criterio di scelta, non solo al numero.**

**RESTA DA FARE (fase 2 di P119, rimandata d'accordo con Fabrizio):** casella di
ricerca in `_ngPescaRicetta()` e `apriPannelloRicette()` (oggi elencano tutto
senza ricerca); controllo anti-doppioni sui nomi, da fare con **P81**, perché
`_ngScomponiRicettaNelPasto()` cerca la ricetta **per nome** e con due omonime
prende sempre la prima; import in blocco oltre le ~300 ricette, perché
`salvaRic()` rispedisce **tutte** le ricette custom a ogni singolo salvataggio
(nessun dirty-tracking come P68/P69 sui pazienti) → caricamento uno-a-uno
O(n²), ~170 KB per salvataggio a 300 ricette. Dettagli e cifre nella scheda.

**TRAPPOLA SEGNALATA A FABRIZIO prima di iniziare a caricare** (comportamento
già esistente, non introdotto oggi): se un salvataggio mostra `⚠️ Ricetta
salvata SOLO in locale — sync fallito`, va risalvata **prima** di sincronizzare
o ricaricare la pagina. `syncNow()` fa prima il pull, e `pullRicetteSupabase()`
**sostituisce** `db.ricette` con `[RICETTE_DEFAULT + quelle del server]`: una
ricetta mai arrivata su Supabase viene cancellata senza avvisi.

24 LUGLIO 2026 (3ª sessione, parte 6) — SOGLIE DI RIFERIMENTO VALIDATE.
Baseline `ca66bd5`. Solo documentazione, nessuna modifica al codice.

Fabrizio ha rivisto `NutriGest_Range_Validazione.md` e ha **validato la
tabella RANGE_STD** cosi' com'e'. Motivazione registrata perche' e' il tipo
di ragionamento che serve rileggere fra sei mesi: nei referti reali il
laboratorio stampa quasi sempre il proprio intervallo, che l'app estrae
all'import e a cui da' la precedenza; RANGE_STD entra quindi in gioco solo
per i valori inseriti a mano o per i pochi referti che non riportano il
range. Il suo peso clinico e' marginale — ma NON nullo: e' anche la fonte
del giudizio colore dell'andamento (tappa 3) quando il referto non porta un
intervallo, quindi resta corretto averla validata invece di lasciarla
"orientativa" a tempo indeterminato.

**P118 e' ora chiusa in tutte e tre le tappe, senza pendenze documentali.**

24 LUGLIO 2026 (3ª sessione, parte 5) — P118 TAPPA 3: ANDAMENTO NEL TEMPO.
Baseline `3db9488`. **Chiude P118** (tutte e tre le tappe). Preceduta da un
mockup HTML mostrato a Fabrizio con tre alternative di interfaccia: ha scelto
l'opzione B (variazione + tracciato sempre visibile) e il grafico grande.

**COSA:** sotto ogni valore un tracciato di ~3 cm con dietro la fascia del
range, la variazione rispetto al referto precedente e il numero di referti
disponibili. In fondo alla scheda il pannello "📈 Andamento nel tempo":
scelta dell'esame (pastiglie per i fuori range + menu con tutti quelli
misurati almeno due volte), grafico grande con fascia, griglia a numeri
tondi, etichetta solo sull'ultimo punto, e **tabella dei referti a fianco**
— che non e' decorativa: e' il canale di lettura per chi non distingue i
colori e per leggere i numeri esatti senza passare col mouse.

**LA REGOLA DEL COLORE (il punto che poteva fare danno clinico).** Il colore
NON guarda la direzione del movimento ma la **distanza dal range**:
`distanza(v)` = 0 dentro, quanto manca al minimo se sotto, quanto eccede il
massimo se sopra. Distanza scesa → verde, salita → rosso, 0→0 → grigio. Una
freccia verde perche' il valore sale sarebbe stata sbagliata: il TSH che sale
da 3 a 6 peggiora, la ferritina che sale da 12 a 42 migliora. **Senza range
si resta SEMPRE grigi** — voci qualitative delle urine, esami senza
riferimento, e anche una voce sesso-specifica su un paziente col sesso non
compilato: mai un giudizio clinico su un esame di cui non si conosce la
normalita'.

**ALTRE SCELTE DI CAUTELA:** i referti **senza data non entrano** nella serie
(non possono stare su un asse del tempo; la barra della tappa 1 invita a
metterla); con meno di due misure non si disegna nulla invece di mostrare un
punto solo; `_andParseRangeLab` accetta solo le forme che riconosce con
certezza ("70 - 99", "0,8-1,2", "< 150", "> 40") e in caso di dubbio
restituisce null, cioe' nessun giudizio.

**BUG TROVATO DAI TEST:** `String.replace(',', '.')` sostituisce **solo la
prima** occorrenza, quindi l'intervallo "0,8-1,2" veniva letto come 0.8–1 —
un range sbagliato del 17% su ogni referto italiano con decimali in virgola.
Corretto con `replace(/,/g,'.')`. E' esattamente il tipo di errore che non si
vede a occhio sul rendering.

**VERIFICHE:** `node --check`; suite **149 → 161, tutte verdi** (nuovo
`s2-andamento-referti.test.js`: la regola del colore nei quattro casi
clinici, nessun giudizio senza range, distanza sui due lati, parser degli
intervalli di laboratorio incluso il caso della virgola, serie che scarta
referti senza data e valori non numerici, colore del tracciato, contenuto
della riga, pannello che compare solo con storico e mette per primi i fuori
range, passi di griglia tondi). Rendering verificato a immagine costruendo la
scheda vera con una paziente di prova a quattro referti.

**LEZIONE:** prima di scrivere il codice di una funzione che *interpreta*
dati clinici, mostrare un mockup e far scegliere. Il mockup ha fatto emergere
la domanda giusta — "di che colore e' la freccia?" — prima che diventasse una
riga di codice da correggere.

24 LUGLIO 2026 (3ª sessione, parte 4) — P118 TAPPA 2: RANGE DI RIFERIMENTO
SOTTO OGNI VALORE. Baseline `302edfa`.

**PROBLEMA:** l'app aveva soglie per **10 voci su 119** (`RANGE_RIF`), e solo
dentro il tooltip della ℹ️. Per le altre 109 il riferimento non esisteva da
nessuna parte: il valore era un numero nudo.

**COSA:** nuova `RANGE_STD` — 119 voci, unita' di misura, sesso-specifiche
dove serve (emoglobina, ematocrito, creatinina, ferritina, transaminasi,
acido urico, VES, testosterone, CK...), intervalli aperti dove il riferimento
e' un tetto o un pavimento ("< 150 mg/dL", "> 90 mL/min"), e voci qualitative
per le urine e gli anticorpi ("Assente", "Negativo"). Il riferimento compare
**sempre visibile sotto ogni casella** (`ai-range`), accanto al pallino che
c'era gia'.

**TRE FONTI, PRECEDENZA ESPLICITA:** (1) il range **stampato dal laboratorio**
su QUEL referto, che l'AI ora estrae durante l'import nella chiave `_range` e
che finisce in `rf.range[key]` — e' il piu' corretto, perche' gli intervalli
variano per metodica e strumento; (2) `RANGE_STD`; (3) `RANGE_RIF`, che NON e'
la stessa cosa e non e' stata toccata: quelle sono **soglie decisionali
cliniche** (LDL "ottimale") e continuano a pilotare il semaforo. Range e
semaforo convivono e dicono cose diverse — "cosa considera normale il
laboratorio" e "cosa ne penso io". Tenerli separati era il punto: fonderli
avrebbe fatto sparire l'una o l'altra informazione.

**SCELTE DI CAUTELA:** se il sesso non e' in scheda l'app **mostra entrambi**
gli intervalli invece di sceglierne uno; il range del laboratorio e' marcato
con l'etichetta "lab" per non confonderlo con quello standard; il prompt
vieta esplicitamente di inventare intervalli assenti dal referto; 40 voci
portano una nota (fase del ciclo, eta', metodica, percentuale vs assoluto,
chetoni attesi in chetogenica) perche' il numero da solo ingannerebbe.

**DA FARE — VALIDAZIONE CLINICA:** la tabella e' stata proposta da Claude e
consegnata a Fabrizio come `NutriGest_Range_Validazione.md` per la revisione
voce per voce. Finche' non e' rivista va considerata **orientativa**: e' tutta
in un unico punto del codice, quindi correggerla e' veloce e a basso rischio.

**VERIFICHE:** `node --check`; suite **140 → 149, tutte verdi** (nuovo
`s2-range-riferimento.test.js`: copertura totale delle 119 voci, nessuna voce
orfana, nessuna soglia malformata (min>max, unita' mancante, sesso-specifico a
meta'), forma di intervalli chiusi/aperti/qualitativi, precedenza del range di
laboratorio, note che non rompono l'attributo title, e non-regressione su
`RANGE_RIF`).

24 LUGLIO 2026 (3ª sessione, parte 3) — P118 TAPPA 1: REFERTI DEL SANGUE
DATATI. Baseline `9d898a5`. Prima delle tre tappe chieste da Fabrizio
(storico datato → range di riferimento → andamento nel tempo).

**PROBLEMA:** `p.analisiSangue` conteneva UN SOLO set di valori. Ogni import
sovrascriveva il precedente, e non esisteva nemmeno il concetto di "referto":
per questo non c'era un posto dove mettere la data. Senza data non esiste
storico, e senza storico non esiste andamento.

**COSA:** nuovo `p.refertiSangue[] = {id, data, dataStimata, lab, file,
valori:{KEY_val}, range:{}, note}`. In cima alla scheda una barra con
selettore dei referti (etichettati "gg/mm/aaaa · N valori"), campo data,
e i pulsanti Nuovo / Copia / Elimina. Il campo `range` nasce vuoto: lo
riempira' la tappa 2.

**LA REGOLA CHE TIENE TUTTO INSIEME (il punto architetturale).**
`p.analisiSangue` NON viene rimosso e NON diventa una copia del referto in
vista: diventa lo **specchio derivato del quadro clinico attuale**, cioe' per
ogni esame il valore misurato **piu' di recente**, ricostruito da
`_refertiApplica()`. Due conseguenze volute:
1. i ~10 consumatori esistenti (contesto AI, generatore piani, calcoli
   derivati, gruppi clinici, richiesta esami P116, firma di sincronizzazione,
   tabella ombra P74 fase 2) **non sono stati toccati** e continuano a leggere
   "i valori attuali del paziente";
2. un referto parziale non cancella nulla — se l'ultimo referto non ripeteva
   la vitamina D, resta valida quella di prima. E' come ragiona un clinico ed
   e' anche il comportamento che l'app aveva PRIMA di P118 (un import parziale
   non azzerava i valori vecchi): la retrocompatibilita' di comportamento era
   un requisito, non un effetto collaterale.
Ogni singolo referto invece contiene **solo cio' che quel laboratorio ha
davvero misurato quel giorno** — un referto non deve mai far credere che un
esame sia stato fatto in una data in cui non e' stato fatto.
`_refertiApplica()` e' l'UNICO punto che riscrive `p.analisiSangue`: se un
giorno i valori attuali risultassero sbagliati, il colpevole e' li'.

**MIGRAZIONE:** `_refertiMigra(p)` gira a ogni apertura scheda ed e'
idempotente. Trasforma i valori vecchi in un referto. La data non esiste nel
dato vecchio: la deduce dalla piu' recente `p._analisiMeta[].data` (la
provenienza degli import), altrimenti **la lascia vuota** e marca
`dataStimata` — l'interfaccia chiede a Fabrizio di correggerla. Scelta
deliberata: **inventare "oggi" avrebbe prodotto uno storico plausibile e
falso**, che e' peggio di un buco dichiarato.

**IMPORT:** la conferma del diff non sovrascrive piu': **crea un referto
nuovo**, e la data e' **obbligatoria** (senza data il referto non entrerebbe
nell'andamento). Il prompt di estrazione ora chiede anche `_data_referto`
(data del prelievo, o in mancanza di refertazione): se l'AI la trova, il
campo arriva gia' compilato e resta correggibile; si accetta solo nel formato
AAAA-MM-GG, per non far entrare date inventate.

**VERIFICHE:** `node --check`; suite **130 → 140, tutte verdi** (nuovo
`s2-referti-datati.test.js`: migrazione con e senza indizi di data +
idempotenza, ordinamento coi senza-data in fondo, quadro attuale che prende
la misura piu' recente esame per esame, esame non ripetuto che NON sparisce,
valori vuoti che non cancellano, referto nuovo che non eredita, eliminazione
che riporta indietro il quadro, e un test di non-regressione su P116 che
legge i valori dopo la migrazione).

**PROSSIME TAPPE:** (2) tabella range per le 119 voci + lettura dei range
stampati dal laboratorio durante l'import, mostrati sotto ogni valore;
(3) frecce di variazione rispetto al referto precedente e mini-grafico
dell'andamento.

**LEZIONE:** quando si passa da "un valore" a "una serie storica di valori",
la tentazione e' spostare tutti i lettori sulla nuova struttura. Tenere
invece il vecchio campo come **specchio derivato con una regola sola e un
solo punto di scrittura** ha permesso di cambiare la struttura dati senza
toccare nessuno dei consumatori — e i test di non-regressione sui consumatori
costano molto meno che riscriverli.

24 LUGLIO 2026 (3ª sessione, parte 2) — P116 RIVISTA DOPO IL PRIMO COLLAUDO
REALE. Baseline `dd9201f`. Tre correzioni nate provando la funzione su una
paziente vera (Chetogenico WLKD, BMI 37,1 → blocco insulino-resistenza acceso
correttamente).

**1. Via le etichette SSN / PRIVATO.** Decisione di Fabrizio: sul foglio e
nella checklist erano rumore, non informazione. Rimosse da entrambi. Il campo
`ssn` resta nei dati di `RICH_CATALOGO` (nessuno lo legge piu': se un giorno
servisse, basta ripristinare le due righe di render) e la nota finale del PDF
non ne parla piu'. Il testo di ogni voce ora usa tutta la larghezza.

**2. Un solo pulsante di invio, che sceglie da solo la strada migliore.**
Scoperta del collaudo: **Chrome su Windows supporta `navigator.share` con
file** e passa il PDF a WhatsApp Desktop come allegato vero — cosa che non
davo per scontata (la condivisione di file era attesa solo su iPhone). Quindi
"Invia su WhatsApp" ora prova in ordine: **(1)** allegato col menu di
condivisione del sistema, **(2)** link caricato su Storage, **(3)** PDF
scaricato + WhatsApp col testo. Se l'utente ANNULLA la condivisione
(`AbortError`) si ferma li': non deve ripiegare sul link, sarebbe un invio
non voluto. Il pulsante "Condividi" separato è sparito (era la stessa cosa) e
al suo posto c'è **🔗 Copia link**, utile per email/SMS e per diagnosticare
lo Storage.

**3. Errori del caricamento finalmente visibili (root cause aperta).** Al
primo collaudo "Invia su WhatsApp" scaricava il PDF invece di mandare il
link: `_richUpload` restituiva `null` e inghiottiva il motivo. Ora ritorna
`{url}` oppure `{err}` con stato HTTP e una spiegazione in italiano — bucket
inesistente, policy INSERT mancante, oppure **sessione scaduta** (in quel
caso `supaHeaders()` ripiega sulla chiave anonima e la policy
`authenticated` respinge: è il candidato numero uno, stesso schema del bug
P105). Il messaggio compare sotto i pulsanti. **Lezione generalizzabile: un
`catch(e){ return null }` su una chiamata di rete costa sempre un giro di
collaudo in piu' — vale la pena restituire il motivo fin dalla prima
scrittura** (è esattamente ciò che P76 chiede di sistemare ovunque).

**VERIFICHE:** `node --check`; suite **130/130 verdi** (i test P116 non
toccano l'invio, che resta verificato a mano: dipende da rete, popup e menu
di sistema). Layout del foglio ricontrollato rendendo il PDF a immagine.

24 LUGLIO 2026 (3ª sessione) — P116: RICHIESTA ANALISI DEL SANGUE PER IL
MEDICO CURANTE. Sessione Cowork con Fabrizio (Opus 5). Baseline `880668d`.
**Voce nata e chiusa nella stessa sessione** (non passa dalla Roadmap: entra
diretta in Contesto + CHANGELOG).

**PROBLEMA:** Fabrizio consiglia esami che poi prescrive il medico di base
del paziente. Finora consegnava un PDF-catalogo con ~40 voci uguali per
tutti. Un medico che riceve un catalogo generico ne prescrive tre a caso o
niente: il documento giusto per quel destinatario è una richiesta CORTA,
INTESTATA a quel paziente e MOTIVATA. Da qui la riprogettazione: non "un
bottone che stampa il catalogo", ma un generatore di richieste personali.

**COSA:** nella scheda Analisi del sangue nuovo bottone 🩸 **Richiesta
esami** → modale con checklist **già pre-spuntata**:
- le **15 voci di base** sempre accese (emocromo, glicemia, insulina, assetto
  lipidico, creatinina+eGFR, elettroliti, transaminasi, azotemia, acido
  urico, ferritina+sideremia, TSH/FT3/FT4, B12, folati, vit. D, omocisteina);
- i **blocchi di approfondimento si accendono da soli** dai dati già in
  scheda, ognuno con il motivo mostrato a video: insulino-resistenza (BMI≥30,
  glicemia≥100, HbA1c≥5.7, insulina≥12, anamnesi diabete/PCOS/IR, regime
  chetogenico), cardiovascolare (LDL≥130, col.tot≥240, TG≥200, anamnesi),
  epatico (ALT/AST>40, steatosi), ferro (ferritina >300 o <30, sideremia<50),
  autoimmunità tiroidea (TSH fuori 0.4–4, anamnesi tiroide);
- **vitamine e micronutrienti non si accendono MAI da soli** — restano scelta
  clinica esplicita (decisione di Fabrizio in sessione).
Il nutrizionista ha sempre l'ultima parola: può togliere anche una voce di
base e aggiungere qualsiasi altra.

**IL FOGLIO (jsPDF, stile del PDF originale di Fabrizio):** intestato al
paziente con data di nascita, data e **motivo della richiesta**; casella da
spuntare per ogni voce; etichetta **SSN / PRIVATO** per voce, così il
paziente sa in partenza cosa probabilmente non passa sulla ricetta rossa e
non fa tre giri inutili; disclaimer in chiusura ("proposta sottoposta alla
valutazione del Medico Curante, cui competono la prescrizione e ogni
decisione clinica" — linguaggio non prescrittivo, coerente con P73).
Richiesta tipica (base, o base + un blocco) = **una pagina sola**.

**INVIO (entrambe le strade, scelta di Fabrizio):**
- 💬 *Invia su WhatsApp* — carica il PDF su **Supabase Storage** (bucket
  pubblico `richieste`, nome file con parte casuale di 18 caratteri: non
  indovinabile) e apre WhatsApp col messaggio e il **link** già pronti.
  **È l'unica strada che funziona anche da PC**: WhatsApp non permette a
  nessun sito di allegare file a una chat, né da desktop né da mobile.
  Se il caricamento fallisce (bucket non ancora creato, rete assente)
  degrada da solo: scarica il PDF e apre WhatsApp col testo, da allegare a
  mano. La finestra viene aperta DENTRO il click e riempita dopo l'upload,
  altrimenti il browser la blocca come popup.
- 📲 *Condividi* — `navigator.share` col file: su iPhone apre il menu iOS e
  passa il PDF allegato a WhatsApp; su desktop, dove non è supportato,
  scarica.
- 📄 *Scarica PDF*.
Ogni invio registra la richiesta in `p.richiesteAnalisi[]` (data, motivo,
voci, link) e lo **storico compare in cima alla scheda** con il link per
riaprire il PDF.

**SCELTA ARCHITETTURALE (il punto che regge il seguito):** le voci del
catalogo non sono testo libero — ognuna dichiara `map:[...]` con i nomi
ESATTI delle voci di `ANALISI`. È la stessa anagrafica usata dal form dei
risultati, quindi domani si potrà dire "richiesti 15, arrivati 12, mancano
3" senza rifare nulla. Un test di regressione verifica che nessun `map`
punti a un nome inesistente: se una voce di ANALISI viene rinominata il
collegamento si spezzerebbe **in silenzio**, e questo è l'unico modo di
accorgersene.

**MULTIUTENTE (predisposizione, non ancora attiva):** l'intestazione
professionale (nome, albo, studio, contatti) è un blocco **opzionale**
salvato su localStorage e configurabile dalla modale stessa. Vuota — la
scelta di Fabrizio per sé — il foglio esce senza intestazione; per gli
altri utenti basterà compilarla, senza toccare il codice.

**DA FARE PRIMA DELL'USO (2 minuti, pannello Supabase):** creare il bucket
**pubblico** `richieste` e una policy INSERT per il ruolo **`authenticated`**.
Il caricamento passa da `supaHeaders()`, quindi viaggia con l'access_token
dell'utente collegato e non con la chiave anonima: la policy resta chiusa a
chi possiede solo la chiave pubblica dell'app (che è dentro index.html).
Senza bucket/policy la funzione non si rompe: ricade sul PDF scaricato +
WhatsApp col testo.

**VERIFICHE:** `node --check` sul blocco script; suite **118 → 130, tutte
verdi** (nuovo `s2-richiesta-analisi.test.js`: aggancio catalogo↔ANALISI,
id univoci, paziente vuoto = solo le 15 di base, ogni regola accende il
blocco giusto e SOLO quello, micro/vitamine mai automatiche, sostituzione
caratteri non stampabili, costruzione PDF, link wa.me con prefisso 39).
Layout verificato rendendo il PDF a immagine (2 bug corretti così: `γ` →
`gamma` produceva "gamma--GT", e il foglio andava a 2 pagine anche nei casi
tipici — margini e passo riga ricalibrati).

**LEZIONI:**
1. **jsPDF 2.5.1 (quella vendorizzata) stampa correttamente le accentate
   italiane** à è é ì ò ù (WinAnsi): verificato caricando `vendor/jspdf.umd.min.js`
   in JSDOM, non la 4.x del test-suite. Restano da sostituire solo i
   caratteri FUORI da Latin-1 (γ, μ, trattino lungo, virgolette curve,
   puntini di sospensione) — a questo serve `_richTxt`.
2. **Nei test, le costanti `const` di livello script NON sono su `window`**:
   si leggono con `win.eval('NOME')`. E `deepStrictEqual` fra un oggetto
   nato dentro JSDOM e uno letterale del test **fallisce sempre** (prototipi
   di realm diversi): confrontare le chiavi, non l'oggetto.
3. WhatsApp non consente allegati da web: se serve mandare un file da PC,
   l'unica strada è caricarlo e mandare il link. Vale per qualunque futura
   funzione di invio.

24 LUGLIO 2026 (2ª sessione, parte 6) — P115 TAPPA 5: SLOT CONSUNTIVO "PIANO
VS REALTÀ" (PREDISPOSIZIONE). Sessione Cowork con Fabrizio (Fable 5).
Baseline `3802f5d`. **Chiude l'implementazione di P115 (tutte e 5 le tappe).**

**COSA:** predisposto il terzo livello della scheda 📈 Percorso — il
consuntivo dall'automonitoraggio del paziente — SENZA costruire
l'acquisizione dati (che arriverà con l'app paziente P50). Fissato il
CONTRATTO DATI `p.consuntivo = {fonte, giorni:[{data, aderenza:"ok"|
"parziale"|"sgarro", extraKcal, opz. extraProt/Carb/Grassi, passi,
sonnoOre}]}` (oggetto con array dentro, mai proprietà su array — regola 8) e
il motore puro `_percorsoConsuntivo`: normalizza/ordina/filtra, deriva
l'aderenza dalle extraKcal se assente (0→ok, ≤300→parziale, >300→sgarro,
soglia provvisoria), e calcola le REGOLE TRASPARENTI per il momento
educativo in visita: % aderenza, kcal extra totali, **ritardo kg =
extra÷7700**, **settimane perse = ritardo ÷ ritmo di calo pianificato**
(media pesata |pct| fasi deficit; null senza deficit). Nel grafico:
striscia aderenza (rettangolino/giorno 🟢🟡🔴 con tooltip, tra corsia peso
ed energia) + riga riepilogo + interruttore in toolbar — acceso anche in
vista paziente, perché mostrare l'effetto degli sgarri È lo scopo.

**PUNTO ARCHITETTURALE (il senso della tappa):** oggi NESSUN paziente ha
`p.consuntivo`, quindi tutto degrada a invisibile e il layout resta AL
PIXEL quello delle Tappe 3-4 (viewBox 500 con energia, 400 senza — fissato
da test di regressione; lo spazio della striscia, +24px, esiste solo coi
dati). Quando P50 scriverà il campo rispettando il contratto, il livello
si accenderà da solo senza toccare il grafico. Era la nota architetturale
del design doc: "slot previsto ma vuoto, degrada bene".

**VERIFICHE:** suite **111 → 118, tutte verdi** (nuovo
`s2-percorso-consuntivo.test.js`: contratto/normalizzazione/derivazione,
conteggi esatti (3850÷7700=0.5 kg), settimanePerse dal ritmo pianificato e
null senza deficit, striscia solo con dati + layout invariato senza,
toggle, isolamento proiezione/TDEE con 2000 kcal di sgarri). Aggiornato
`s2-percorso-composizione.test.js` (i default degli strati hanno ora la 5ª
chiave `consuntivo:true` — modifica di contratto legittima, documentata
qui). Lezione realm ricorrente: anche `.map()` su un array JSDOM resta nel
realm JSDOM — spread `[...arr]` PRIMA di `deepStrictEqual`, terza volta che
si ripresenta (Tappa 3 array, Tappa 4 oggetti, Tappa 5 map). Collaudo
visivo Chromium con/senza dati fittizi (riepilogo coerente: 9630 kcal →
1.25 kg → 3.4 settimane sul ritmo medio pianificato). SHA ricontrollato
invariato (`3802f5d`). P115: restano solo il collaudo in produzione di
Fabrizio e, un domani, P50.

24 LUGLIO 2026 (2ª sessione, parte 5) — P115 TAPPA 4: MASSA MAGRA +
INTERRUTTORI STRATI. Sessione Cowork con Fabrizio (Sonnet). Baseline `c35db97`.

**COSA:** nella corsia peso della scheda 📈 Percorso compare una seconda
linea, la **massa magra** (quadratini magenta `#e87ba4`, tratteggiata:
misurazioni InBody più rade delle pesate) — SULLO STESSO ASSE kg del peso,
non un asse nuovo: il divario visivo tra le due linee È la massa grassa,
nessun calcolo aggiunto. Tooltip nativo SVG (`<title>` dentro il marker) con
% grassa al passaggio del mouse — zero JS di interazione da mantenere.
Fonte dati solo InBody (`_percorsoSerieMassaMagra`): le pesate intermedie
non misurano la composizione corporea, quindi non compaiono qui (a
differenza della linea peso che le include).

**INTERRUTTORI:** riga di checkbox sopra il grafico per accendere/spegnere
4 strati (massa magra, cono proiezione, corsia energia, dettagli fasi
%/kcal/settimane) + due preset rapidi: **🔧 Vista tecnica** (tutto acceso,
default a ogni apertura scheda) e **🙂 Vista paziente** (nasconde massa
magra, corsia energia e dettagli fasi — lascia peso, bande fasi col solo
nome e cono di proiezione, utile e non ansiogeno da mostrare in studio).
Scelta di design: lo stato è **solo di sessione** (variabile in memoria
`_percorsoLayersState`, mai su `p`, mai salvato) — è una preferenza di
visualizzazione, non un dato clinico, e non deve sporcare il record del
paziente né richiedere una migrazione dati. Motore invariato: disattivare
un layer nasconde solo il disegno, `_percorsoProiezione` e
`_percorsoSerieEnergia` restano identici (verificato in test).

**VERIFICHE:** suite **103 → 111, tutte verdi** (nuovo
`s2-percorso-composizione.test.js`: serie massa magra solo-InBody e
ordinata, default vista tecnica, toggle singolo non tocca gli altri
strati, preset paziente/tecnica, cono/energia/dettagli spariscono dal
grafico ma non dal calcolo, layout compatto invariato spegnendo energia).
Lezione ripetuta dalla Tappa 3 ma su OGGETTI stavolta (non solo array):
un oggetto che attraversa il realm JSDOM non passa `deepStrictEqual` contro
un literal Node — normalizzare con `JSON.parse(JSON.stringify(...))` prima
del confronto. Collaudo visivo Chromium: vista tecnica e vista paziente
side-by-side, nessuna sovrapposizione di etichette, linea massa magra
leggibile pur schiacciata in basso (range naturale ridotto sull'asse
condiviso col peso — atteso, non un bug). SHA ricontrollato invariato
(`c35db97`). Di P115 resta solo la Tappa 5 (slot consuntivo, prossima
sessione con Fable/Opus effort alto).

24 LUGLIO 2026 (2ª sessione, parte 4) — P115 TAPPA 3: CORSIA ENERGIA NEL
GRAFICO PERCORSO. Sessione Cowork con Fabrizio (Fable 5). Baseline `666fa2a`.

**COSA:** il grafico della scheda 📈 Percorso diventa a DUE CORSIE (solo
quando esiste un percorso: senza fasi il layout resta quello compatto
storico, fissato da test): sopra il peso, sotto la corsia "Energia (kcal)"
con asse proprio — mai due scale sovrapposte, regola del design. Tre serie:
(1) **introito prescritto** (arancio): PASSATO dagli slot di `macrosStorico`
(ogni slot vale dal suo timestamp al successivo — semantica identica a
`_kcalMediaPrescrittaOss`), FUTURO dalle fasi (pct del TDEE stimato
corrente, tratteggiato); (2) **TDEE stimato** (verde): gradini storici dal
campo `tdee` fotografato negli slot + tratto attuale tratteggiato fino a
fine percorso; (3) **TDEE osservato** (viola, P114 passo 4): segmento
spesso sul SUO tratto di calcolo [dal..al] con etichetta. Lettura clinica
dichiarata in didascalia: la DISTANZA tra arancio e verde/viola È il
deficit/surplus reale nel tempo — se il viola sta sotto una prescrizione
"in deficit", il finto deficit si vede qui e nella proiezione che risale
(coerenza tra corsie verificata a occhio nel collaudo). Bande fasi ripetute
nella corsia (senza etichette) per continuità visiva; griglia kcal a 3
livelli arrotondati a 100; stato-vuoto con invito a salvare un calcolo TDEE.

**MOTORE (`_percorsoSerieEnergia`, pura):** segmenti [da,a] in ms clampati a
[t0,t1]; passato mai oltre "oggi"; futuro mai prima di "oggi"; slot senza
kcal/timestamp scartati; osservato assente se non calcolabile. Lezione di
test: gli array che attraversano il realm JSDOM non passano
`deepStrictEqual` (prototipo diverso) — confrontare con spread `[...arr]`.

**VERIFICHE:** suite **98 → 103, tutte verdi** (`s2-percorso-energia.
test.js`: semantica slot-fino-al-successivo, clamping, futuro=kcal fasi,
segmento osservato, corsia presente solo col percorso + layout compatto
invariato senza); collaudo visivo Chromium sui due casi (teorica: storico
2100→2148 + fasi future; calibrata: viola 2070 sopra prescritto 1800 =
deficit vero, sotto la prescrizione futura 2177 = finto deficit visibile).
SHA ricontrollato invariato. Resta il collaudo di Fabrizio in produzione.
Di P115 restano le Tappe 4 (massa magra + interruttori) e 5 (slot
consuntivo).

24 LUGLIO 2026 (2ª sessione, parte 3) — P115 TAPPA 2: PROIEZIONE IBRIDA DEL
PESO. Sessione Cowork con Fabrizio (Fable 5). Baseline `107eadb`. Chiude nel
merito il vecchio P114 passo 9 ("da data secca a range") dentro la scheda
Percorso, come da design.

**MOTORE (`_percorsoProiezione`, pura):** dal peso reale più recente
(`_serieePesoOss`) proietta giorno per giorno lungo le fasi pianificate.
Intake fase = TDEE stimato × (1+pct/100) — è ciò che viene davvero prescritto
(la % dello slider è sul TDEE stimato). Bilancio = intake − TDEE di
riferimento: OSSERVATO (P114 passo 4, campo `tdeeOss`) se disponibile →
metodo "calibrata", altrimenti stimato → "teorica". Pendenza = bilancio/7700
kg/die: la 7700 resta solo l'innesco, con la calibrazione la pendenza segue
il ritmo VERO del paziente (questo risolve la sovrastima della vecchia stima
lineare oltre 4-6 settimane). Effetto clinico voluto e verificato dal test:
in mantenimento calibrato con osservato < stimato la pendenza diventa
POSITIVA — l'adattamento metabolico si VEDE; e se l'osservato è sotto
l'intake di un "deficit sulla carta", il grafico mostra che per quel paziente
NON è un deficit (avviso prezioso in visita). Cono: ±(0.25 kg + giorni ×
TDEEstim×rangePct%/7700), rangePct dall'affidabilità (passo 5) o 8% se
calibrata. Guardia 730 giorni. Fuori fase (buco teorico): mantiene.
Obiettivo (se pesoTarget): intervallo dal=bordo ottimista / al=prudente
(null → "oltre la fine del percorso"), confini verificati dai test. SOLO
INFORMATIVO: un test fissa che il TDEE è identico prima/dopo.

**UI:** cono azzurro + linea centrale tratteggiata nel grafico Percorso
(sotto la linea del peso reale), etichetta finale "~lo–hi kg" sopra il cono,
riga riepilogo sotto il badge fase: metodo (teorica "si calibrerà da sola" /
calibrata col valore e il caveat "assume che le kcal prescritte vengano
seguite" — stesso presupposto dichiarato del TDEE osservato), intervallo ±%,
e obiettivo "tra <data> e <data>". **`calcolaMacros`: la data secca è
SOSTITUITA dall'intervallo** — settimane min–max e "arrivo tra <data> e
<data>" calcolati con ±rangePct dell'affidabilità; nota esplicita "a ritmo
costante, senza fasi di mantenimento" + rimando alla scheda 📈 Percorso per
la curva con le fasi. Se lo scenario prudente non è stimabile (deficit −
incertezza ≤ 0): "almeno N settimane".

**VERIFICHE:** suite **92 → 98, tutte verdi** (`s2-percorso-proiezione.
test.js`: pendenza teorica esatta, cono crescente, calibrata con fixture
TDEE-osservato valida e risalita in mantenimento, intervallo obiettivo
dal≤centro≤al, degradazioni pulite, cono nel SVG + zero effetti sui
calcoli); collaudo visivo Chromium su due casi (teorica con cono che si
piega sulle fasi; calibrata che smaschera un finto deficit). Estrazione
script con `extractMainScript()` (lezione parte 2). SHA ricontrollato
invariato. Resta il collaudo di Fabrizio in produzione. Di P115 restano le
Tappe 3 (corsia energia), 4 (massa magra + interruttori), 5 (slot
consuntivo).

24 LUGLIO 2026 (2ª sessione, parte 2) — P115 TAPPA 1: SCHEDA "📈 PERCORSO"
(TIMELINE DI PERIODIZZAZIONE). Sessione Cowork con Fabrizio (Fable 5).
Baseline `ea3d7db`. Nasce P115: l'evoluzione del passo 9 di P114 decisa da
Fabrizio in questa stessa sessione dopo una fase di design con mockup (tutte
le decisioni nel doc di progetto Claude "NutriGest_P9_Timeline_Ragionamento":
grafico integrato, proiezione ibrida, strati-interruttore, scheda dedicata,
futuro livello "Piano vs Realtà" agganciato all'app paziente P50).

**COSA:** nuova linguetta "📈 Percorso" nella scheda paziente (tra TDEE e
Note cliniche) con: (1) modello dati `p.percorso = {inizio:"YYYY-MM-DD",
fasi:[{tipo, settimane, pct}]}` — fasi CONSECUTIVE per costruzione (niente
buchi/sovrapposizioni da gestire; oggetto, non proprietà su array — regola 8);
(2) editor delle fasi (aggiungi con alternanza suggerita deficit↔mantenimento,
modifica tipo/durata/%TDEE con limiti −40..+25% e 1..104 settimane, riordina,
elimina, data di inizio); (3) grafico SVG: bande colorate per fase (deficit
azzurro/mantenimento grigio/surplus arancio), fasi future tratteggiate, linea
peso reale da `_serieePesoOss` (riuso del passo 4 P114: InBody pieni ● +
pesate intermedie vuote ○), linea "oggi", linea obiettivo peso, asse mensile;
(4) badge "Oggi: fase X di N" o avviso fuori-percorso. Le kcal per fase sono
INDICATIVE (% del TDEE corrente via `calcolaTDEE`, stessa logica dello
slider) e dichiarate tali. NIENTE proiezione (Tappa 2) e NIENTE consuntivo
(slot previsto dal design, arriva con l'app paziente).

**BUG EVITATO IN CORSA (lezione):** la prima stesura usava
`toISOString().slice(0,10)` per le date delle fasi — ma è UTC: in Italia la
mezzanotte locale diventa il giorno PRIMA, tutte le date delle fasi sarebbero
slittate di un giorno. Introdotta `_percorsoIsoLocal` (formattazione LOCALE)
usata ovunque nel blocco; il test sugli intervalli fissa le date esatte e
protegge dal regresso. Seconda lezione di processo: `node
test-suite/test/_extract.js > file` produce un FILE VUOTO (il modulo non
stampa) → il `node --check` su quel file è un falso "OK". D'ora in poi
l'estrazione va fatta via `require('./_extract.js').extractMainScript()` —
il vero cancello di sintassi resta la suite (S1).

**VERIFICHE:** sintassi OK sull'estrazione vera; nuovo file di test
`s2-percorso.test.js` (7 test: normalizzazione, intervalli consecutivi con
date locali esatte, confini di fase dal-incluso/al-escluso, kcal coerenti con
calcolaTDEE, SVG con/senza dati, esistenza render+mutatori); **suite 85 → 92,
tutte verdi**; collaudo visivo in Chromium headless su paziente demo (scheda
renderizzata correttamente: badge fase corrente, bande, tratteggio futuro,
editor). SHA ricontrollato invariato (`ea3d7db`). Resta il collaudo di
Fabrizio in produzione. Prossime tappe P115: (2) proiezione ibrida, (3)
corsia energia, (4) massa magra + interruttori strati, (5) slot consuntivo.

24 LUGLIO 2026 (2ª sessione) — P114 PASSI 7 + 8: CROSS-CHECK MIFFLIN +
ORARIO ALLENAMENTO ALL'AI. Sessione Cowork con Fabrizio (Opus). Baseline
`a570757`. Chiusi i due passi fattibili subito del motore TDEE; di P114
resta ora SOLO il passo 9 (previsione dimagrimento a range), che attende una
decisione clinica di Fabrizio. Autonomia L1: perimetro (7 e 8) e soglia
Mifflin (±15%) approvati esplicitamente a inizio sessione.

**PASSO 7 — Controllo incrociato Mifflin-St Jeor (bandierina anti-refuso).**
Cosa: due funzioni pure nuove — `_mifflinBMR(p, lastIb)` calcola il
metabolismo basale TEORICO con Mifflin (10×kg + 6.25×cm − 5×anni + M:+5/F:−161,
leggendo peso/altezza da InBody con fallback su `p`, età da `p.nascita`,
sesso da `p.sesso`) e `_crossCheckMifflin` lo confronta col MB del referto
InBody che alimenta il motore. `calcolaTDEE` calcola `crossCheck` subito dopo
aver letto il MB e lo restituisce in ENTRAMBI i return (MET additivo e LAF
manuale). `_affidabilitaHtml` aggiunge una bandierina 🚩 rossa SOTTO il
semaforo di affidabilità (quindi appare ovunque già appare quello: apertura
paziente, Ricalcola, salvataggio) SOLO se la divergenza supera il 15%. Perché
15% e non 10/20: soglia scelta da Fabrizio come compromesso — cattura refusi
grossi (MB digitato storto, OCR del referto sbagliato, misura in condizioni
errate) senza far scattare falsi allarmi per la muscolatura alta, dove il MB
InBody (Katch-McArdle su FFM) supera legittimamente Mifflin. Sicurezza: NON
tocca nessun calcolo — è pura trasparenza; se manca anche solo uno tra peso,
altezza, età, sesso il cross-check è `null` e non compare. Lezione: la soglia
è STRETTA (`> 15`, non `≥`) e il confronto è a livello di MB (non di TDEE)
perché è lì che vive il refuso e il LAF è comunque comune ai due — confrontare
i TDEE non aggiungerebbe informazione.

**PASSO 8 — Orario di allenamento nel contesto AI.** Cosa: il campo
`orarioAllenamento` (Mattina/Pomeriggio/Sera/Variabile, già raccolto ma mai
passato all'AI) ora entra in `costruisciContestoPaziente` — costruttore unico
del contesto usato sia dal generatore di piani sia dall'analisi del controllo.
Aggiunta una riga "Orario allenamento: …" (con la nota se Variabile) più una
direttiva peri-workout: carboidrati facilmente digeribili ~1-2 h prima,
quota proteica + carboidrati nel pasto successivo, SEMPRE compatibilmente col
regime e col budget di carboidrati impostato (così resta sicura anche in
keto), giorni OFF distribuiti normalmente. Il blocco Attività ora si attiva
anche col solo orario impostato. Nessun effetto sul calcolo.

**VERIFICHE PRE-CONSEGNA:** `node --check` sul blocco script OK; nuovo file di
test `s2-tdee-mifflin-orario.test.js` (5 test passo 7 + 3 test passo 8, con
verifica esplicita che il TDEE è identico con/senza bandierina e che l'età
Mifflin è ricalcolata, non hardcoded); **suite 77 → 85, tutti verdi**; grep di
conferma su stringhe univoche; SHA di HEAD ri-controllato invariato
(`a570757`) prima della consegna. Manca solo il collaudo in produzione di
Fabrizio (bandierina su un paziente con dati anagrafici completi + verifica
che l'AI usi l'orario nei suggerimenti). Di P114 resta il solo passo 9.

24 LUGLIO 2026 — P74 FASE 1d (CUTOVER META-RECORD SU `collections`) + AVVIO
FASE 2 (DOPPIA SCRITTURA ANALISI DEL SANGUE). Sessione Cowork con Fabrizio
(Fable 5). Baseline `def73de`. **Pushato da Fabrizio in commit `97acb03`;
tabella `analisi_sangue` creata via SQL Editor prima del push.** Precondizione
verificata: 7 giorni di collaudo stabile della doppia lettura 1c (17→24 lug,
confermato da Fabrizio: nessuna anomalia su PC né iPhone). Autonomia L0:
perimetro (1d + avvio fase 2) approvato esplicitamente a inizio sessione.

**COLLAUDO IN PRODUZIONE ✅ FATTO IL 24 LUG 2026, ESITO POSITIVO (dopo reload
forzato PC + iPhone):** (1) creato paziente da iPhone → comparso su PC dopo
sync; (2) eliminato da PC → sparito da iPhone dopo sync = il registro
tombstone P64, ora dentro `collections`, viaggia corretto (era il punto più
delicato del cutover); (3) alimenti custom, concetti educativi e modelli di
rotazione tutti presenti su entrambi i dispositivi = i 4 meta-record letti
correttamente dalla nuova casa; (4) tabella `analisi_sangue` popolata con
l'uso — 39 righe, tutte con lo stesso `user_id` (RLS ok), `data` con i valori
reali dove il paziente ha analisi (es. FT3/FT4/HDL) e `{}` dove non le ha.
Resta solo: backup + eliminazione manuale delle 4 righe finte da `pazienti`
tra qualche giorno, poi gradino successivo fase 2 (diff blob↔tabella).

FASE 1d — CUTOVER. I 4 meta-record (meta_collections, __alimenti_custom,
__modelli_rotazione, __concetti_educativi) ora vivono SOLO in `collections`:
- Scrittura: i 5 punti di push (pushConcetiSupabase, pushAlimentiCustomSupabase,
  pushModelliSupabase, sezione meta di pushToSheets, ramo META_KEY di
  _pushRigaPerId) scrivono solo via _collectionsUpsert, che da "ombra
  best-effort" diventa scrittura PRIMARIA: il suo esito fa fede (return
  false / throw in pushToSheets se fallisce). Spariscono i GET+PATCH/POST
  sulle righe finte di `pazienti`.
- Lettura: i 4 read-point (pullConcetiSupabase, _pazFetchMeta,
  pullAlimentiCustomSupabase, pullModelliSupabase) leggono solo via
  _collectionsFetch. Anche _mergeTombstonesRemoti (P64) legge il registro
  tombstone dal meta in `collections` — era l'ultimo lettore legacy nascosto.
- Rimossi gli helper della doppia lettura 1c ormai senza chiamanti:
  _preferNuovo e _tsMs (la guardia "mai un dato più vecchio" era una misura
  di transizione; la storia resta in questo CHANGELOG e in git).
- Le migrazioni storiche dentro pullFromSheets (eventi/entrate/piani/ricette
  dal meta) restano nel codice: innocue, non troveranno mai più quei campi.
PERCHÉ: chiudere la finestra in cui due posizioni potevano divergere; era il
gradino previsto dallo schema target (Contesto, DECISIONI ARCHITETTURALI).
RISCHIO RESIDUO NOTO: un dispositivo con la versione VECCHIA in cache
scriverebbe ancora nelle righe finte, che nessuno legge più → al primo
utilizzo post-commit serve un reload forzato su ENTRAMBI i dispositivi
(PC: Ctrl+F5; iPhone: chiudi scheda Safari e riapri). Le 4 righe finte in
`pazienti` NON sono ancora eliminate: backup + eliminazione manuale guidata
solo dopo qualche giorno di collaudo del cutover (istruzioni consegnate a
Fabrizio in sessione: export CSV + tabella di backup via SQL Editor).
Rollback estremo: `git revert` del commit 1d.

FASE 2 (AVVIO) — ANALISI DEL SANGUE, DOPPIA SCRITTURA. Stesso pattern 1b che
ha già funzionato per i meta-record: nuova tabella `analisi_sangue`
{paz_id text, user_id uuid default auth.uid(), data jsonb, updated_at,
PK(paz_id,user_id)}, RLS row-owner identica alle altre (SQL fornito a
Fabrizio, da eseguire nell'SQL Editor PRIMA di usare la nuova versione:
l'upsert ombra su tabella mancante fallirebbe best-effort con solo log
console, senza danni). Nuovo helper _analisiSangueUpsert(pazId, analisi):
upsert POST con Prefer: resolution=merge-duplicates, best-effort, agganciato
DOPO il successo del push legacy del blob nei 2 punti che pushano pazienti
(loop di pushToSheets e ramo paziente di _pushRigaPerId); l'esito non altera
mai il return del chiamante. delPazienteSupabase elimina anche la riga ombra
(best-effort) per non lasciare orfani nel diff. NESSUN CAMBIO DI LETTURA:
l'app continua a leggere p.analisiSangue dal blob. Prossimi gradini (ognuno
L0): diff blob↔tabella pulito → doppia lettura → estrazione dal blob con
segnale di versione minima (un client vecchio non deve poter ri-pushare un
blob "senza analisi" cancellando l'estratto).

VERIFICA: node --check sul blocco script OK; test-suite 77/77 verdi;
ls-remote ricontrollato in consegna (HEAD ancora def73de); grep di contenuto
su "P74 1d"/"P74 f2"/_analisiSangueUpsert nel file consegnato. Collaudo di
produzione richiesto a Fabrizio dopo il push: sync completa + spot-check di
concetti/alimenti custom/modelli/disponibilità su PC e iPhone (con reload
forzato), test elimina-paziente↔sync (tombstone), e verifica nel Table
Editor che `analisi_sangue` si popoli con l'uso.

22 LUGLIO 2026 — P114 PASSI 2+5: MODIFICATORE LAVORO NEL NEAT + INDICE DI
AFFIDABILITÀ DELLA STIMA TDEE (SEMAFORO + INTERVALLO). Sessione Cowork con
Fabrizio (Opus). Baseline `80a59b5`, HEAD invariato in consegna.
**Pushato da Fabrizio in commit `f263ad1`. Collaudato in produzione lo stesso
giorno da Fabrizio: campi Fonte passi/Tipo di lavoro e semaforo di affidabilità
verificati su paziente reale, esito positivo ("mi piace").**

PASSO 2 — MODIFICATORE LAVORO NEL NEAT. Due nuovi campi nel pannello Attività
Fisica: "Fonte passi" (Misurati smartwatch/telefono · Stimati a occhio) e
"Tipo di lavoro" (Sedentario · In piedi/in movimento · Pesante con carichi),
salvati su `p.fontePassi` e `p.tipoLavoro`. La quota NON ambulatoria del lavoro
(stare in piedi, spostare carichi) si somma alla frazione NEAT dei passi:
in-piedi +0.06 del MB, pesante +0.13, con tetto di sicurezza sulla frazione
NEAT totale a 0.60. REGOLA ANTI-DOPPIO-CONTEGGIO (il punto clinico): il bonus
scatta SOLO quando i passi non sono misurati (`fontePassi ≠ 'misurati'` o vuota)
— con i passi da smartwatch lo stare in piedi è già nel conteggio, aggiungerlo
sarebbe contarlo due volte. Un lavoro attivo è di per sé un dato di attività:
attiva il metodo MET additivo (NEAT base 0.15 + bonus) anche senza passi né
allenamento, invece di cadere sul LAF manuale. Frazioni validate da Fabrizio.

PASSO 5 — INDICE DI AFFIDABILITÀ + INTERVALLO. `_affidabilitaTDEE` assegna un
livello 🟢 alta / 🟡 media / 🔴 bassa a punti sulla qualità dei dati: passi
misurati (0) vs stimati (+1) vs mancanti (+2); allenamento in ore approssimate
senza minuti effettivi (+1); InBody più vecchio di 4 mesi (+1); LAF manuale →
sempre bassa. 0 punti = alta, 1-2 = media, ≥3 = bassa. Da qui un intervallo
intorno al TDEE: ±8% (alta), ±13% (media), ±18% (bassa), ±20% su LAF manuale —
mostrato come "stima probabile tra X e Y kcal" col motivo dello scarto. Reso via
`_affidabilitaHtml` in tutti i box TDEE (apertura paziente, Ricalcola LAF,
salvataggio). NON entra in nessun calcolo: pura trasparenza contro la falsa
precisione del numero secco. Il passo 7 (cross-check Mifflin-St Jeor come
bandierina) si aggancerà a questo indice.

FILE: `index.html` (calcolaTDEE + helper `_bonusLavoroFrazione`,
`_affidabilitaTDEE`, `_affidabilitaHtml`, costanti `_LAVORO_BONUS`/
`_NEAT_FRAZIONE_MAX`; wiring form nei 6 punti lettura/scrittura). Nuovo test
`test-suite/test/s2-tdee-lavoro-affidabilita.test.js` (10 casi: no-doppio-
conteggio, bonus in-piedi/pesante, tetto 0.60, lavoro-senza-passi, semaforo
alta/media/bassa, intervalli). Suite 68→77 verdi. `new Function` OK. Zero
modifiche a dati salvati: i `macrosTarget` restano snapshot, non ricalcolati.
STATO P114: passi 2 e 5 ✅ CHIUSI (pushati e collaudati). Restano solo 7 (cross-check Mifflin, ora sbloccato dal 5), 8
(orario allenamento nel contesto AI), 9 (previsione dimagrimento — decisione
clinica di Fabrizio pendente).

21 LUGLIO 2026 — P-KETO-USCITA: USCITA GRADUALE DALLA CHETOSI (MODALE
MANUALE + BLOCCO REINTRODUZIONE NEL GENERATORE) + REGOLA FRUTTA/LEGUMI
IN KETO NORMALE. Avanza P47 (parte "reintroduzione carbo a step").
Sessione Cowork con Fabrizio (Fable). Baseline `5b9d15e`,
riallineata in sessione a `9bb9fd3` (P114 passi 1-6 pushati in parallelo;
merge pulito su index.html, conflitto solo in CHANGELOG, risolto).

COSA: era l'unico pezzo mancante della conduzione ADI (fase 3, pag. 41).
DECISIONE DI DESIGN (il punto importante da ricordare): NON è un
automatismo a fasi precalcolate. Fabrizio ha descritto la sua pratica
reale (sett.1: pane int. 40g O patate 150g 1x/die vicino ad allenamento/
camminata + 2 mezzi frutti; sett.2: frutti interi; sett.3: +20g carbo a
colazione; sett.4+: pane 60→80g o pasta/riso/farro 60g, +30g colazione)
e ha chiesto gestione MANUALE caso per caso: durata e contenuto li
decide lui. Quindi: modale di lavoro, non motore automatico.

- MODALE "🔄 Uscita graduale" (pulsante nel pannello Macros, solo in
  modalità keto): etichetta step libera, fonte carbo (pane/patate/
  riso-pasta-farro int.) con grammi, colazione glucidica (g carbo),
  frutta a 3 stati (2 mezzi / 2 interi / niente), grassi g/kg FFM
  (default 1.0, stabili per tutta l'uscita — scelta di Fabrizio),
  proteine libere. Precompilato scalato sul TDEE (rif. 40g pane per
  TDEE 2000, clamp 0.7–1.6, arrotondo a passo: pane 5g, patate 25g).
- TRUCCO CHIAVE (zero modifiche alla matematica del motore): kcal
  obiettivo = P+C+G(g/kg FFM); il motore keto esistente calcola i
  grassi come "resto" → riproduce esattamente il g/kg FFM voluto.
- Step salvato su p.ketoUscita {attiva,label,fonte,fonteG,colazioneG,
  frutta,grassiGkgFfm,...}; "Termina uscita" mette attiva=false.
- _componiRegimeText: suffisso " — Uscita: <label>" (contiene sempre
  "chetogen" → isCeto/7giorni/filtri ricette invariati).
- calcolaMacros: la guardia carbo>50g diventa box informativo teal
  ("di proposito") quando l'uscita è attiva; resta warning altrimenti.
- costruisciPrompt: con uscita attiva il blocco keto dice "NON deve più
  restare in chetosi, ma il budget resta vincolante" + nuovo blocco
  REINTRODUZIONE CARBOIDRATI con le istruzioni alimentari dello step
  (fonte 1x/die vicino ad allenamento, frutta, colazione, nessun altro
  amidaceo; 3 gruppi verdure → riferimento non rigido in uscita).
  PERCHÉ: senza il blocco nel prompt l'AI distribuirebbe i carbo a modo
  suo — i numeri non bastano, servono le istruzioni alimentari.
- REGOLA FRUTTA/LEGUMI in keto NORMALE (pratica di Fabrizio, assente
  dai protocolli pubblicati): porzione legumi ≈80g; giorno con legumi
  O latticini → max mezzo frutto; giorno senza → un frutto intero in
  due metà. Nel prompt keto standard; sostituita dallo step in uscita.

TEST: suite 63→68 (nuovo test/s2-keto-uscita.test.js: scala TDEE,
matematica step, suffisso etichetta, prompt con/senza uscita). Sintassi
script verificata. LEZIONE HARNESS (per i prossimi test): db/
currentPazId/_macrosPaziente sono `let` top-level → NON raggiungibili
come win.* da jsdom; il setup deve passare da win.eval() nel contesto
globale, altrimenti i test falliscono in modo ingannevole (16 falsi
negativi in sessione prima della correzione dell'harness).

RESTA APERTO (non in questo giro): auto-proposta del passaggio a
Bilanciata/mantenimento a TDEE a fine uscita ("pausa metabolica",
eventuale nuovo deficit dopo 2-4 mesi — per ora passaggio manuale);
preset semaforo verdure keto; auto-allegato concetto educativo keto;
bonifica p.cheto/p.chetoNote.

19 LUGLIO 2026 (4) — P114 PASSO 6: TEF DINAMICO (INFORMATIVO). Sessione
Fable 5 (effort alto), baseline `212d230`.
DECISIONE DI PROGETTO (la parte "difficile" del passo): il TEF dinamico
NON è agganciato al calcolo del target, per non creare la circolarità
target→macro→TEF→target. Numericamente la 2ª iterazione sposterebbe il
risultato di <5 kcal (contrazione forte: solo il macro "riempitivo"
varia), ma l'effetto totale del TEF dinamico è 40-80 kcal, nel rumore
della stima: introdurre il loop nella catena slider/salvataggio sarebbe
rischio senza valore. Coerente con la linea prudente dei passi 3/4:
si mostra il numero, non si costruisce il loop.
COSA È STATO AGGIUNTO (index.html):
- `_tefDinamico(protG, carbG, grassiG, tdee)` (accanto a
  `_avvisoProteineDeficit`): TEF effettivo = media pesata sui kcal dei
  macro (proteine 25%, carboidrati 7,5%, grassi 2% dell'energia — valori
  medi di letteratura); TDEE corretto = (tdee/1.10)×(1+tefFrac), dove
  tdee/1.10 è la base metabolica implicita nel modello a TEF 10% fisso.
  Torna anche protPct/grassiPct per contestualizzare. Null se intake<=0
  o tdee assente.
- In `calcolaMacros`: box informativo (grigio, accanto agli avvisi keto/
  proteine) con TEF% della dieta; se |Δ|≥15 kcal mostra anche il TDEE
  reale a quella composizione, con nota "dieta ricca di grassi, TEF
  basso" (grassi ≥55% en.) o "alta quota proteica, TEF alto" (prot ≥30%).
  Dichiarazione fissa: informativo, non modifica il target.
NESSUN CALCOLO/SALVATAGGIO MODIFICATO: funzione a sola lettura.
VERIFICHE: matematica su 8 diete campione (keto VLCKD −47 kcal come
previsto · iperproteica +55 · bilanciata 18%prot −24 · PSMF +49 · mista
~10% Δ≈0) + guardie null (intake 0, tdee null) + node --check + 63/63.
NB roadmap: P114 ora ha chiusi i passi 1,3,4,6. Restano 2,5,7,8,9.

19 LUGLIO 2026 (3) — P114 PASSO 4: TDEE OSSERVATO (PRIMA RELEASE, SOLO
INFORMATIVO). Sessione Fable 5 (effort alto), baseline `5ea2d2c`.
METODO VALIDATO PRIMA DI SCRIVERE CODICE APP: prototipo isolato eseguito
su 6 pazienti simulati; confronto V1 (formula 7700 kcal/kg secca su
tutto il periodo) vs V2 (scarto dei primi 14 giorni = fase acqua/
glicogeno). V1 gonfia sistematicamente il TDEE di chi cala molto nelle
prime settimane (attribuisce l'acqua all'energia); scelta V2 con
Fabrizio. Configurazione approvata: V2 · riquadro informativo · NESSUN
aggancio ai calcoli (prima ci si fa l'occhio sui pazienti reali).
COSA È STATO AGGIUNTO (index.html, prima di `renderStoricoTDEE`):
- `_serieePesoOss(p)`: serie peso ordinata da p.inbody[] + 
  p.pesiIntermedi[], dedup per data (vince l'InBody), guardia su date
  malformate (isNaN su Date).
- `_kcalMediaPrescrittaOss(p,d0,d1)`: kcal media PESATA SUI GIORNI dai
  target di p.macrosStorico[] (ogni slot vale dal suo timestamp al
  successivo) — gestisce i cambi di target a metà percorso.
- `calcolaTDEEOsservato(p)`: TDEE = kcalMedie − Δpeso×7700/giorni sul
  SOLO tratto stabilizzato. Guardie (tutte testate): <2 pesate valide ·
  <2 pesate dopo lo scarto dei 14 gg · tratto stabilizzato <21 gg ·
  nessun target nel tratto · copertura target <60% · |Δpeso|>2 kg/sett
  (probabile pesata anomala; una VLCKD reale a 1.1-1.6 kg/sett passa) ·
  risultato fuori 600-6000 kcal. Ogni rifiuto ha un motivo leggibile.
- `_renderTDEEOsservatoHtml(p)`: riquadro viola sotto lo storico TDEE
  con: TDEE osservato, confronto col TDEE stimato (verde ≤8% · ambra
  ≤15% · rosso oltre), dettaglio pesate/periodo/kcal medie, e due
  avvertenze fisse: "informativo — non entra nei calcoli" e "presuppone
  aderenza al piano". Se non calcolabile e il paziente ha ≥2 pesate:
  riga grigia col motivo (il professionista sa cosa manca); paziente
  senza dati: nessun riquadro.
- Aggancio: `renderStoricoTDEE` appende il riquadro in entrambi i rami
  (storico presente/vuoto).
NESSUNA MODIFICA a calcoli, slider, salvataggi: funzione a sola lettura.
VERIFICHE: 10 casi funzionali sulle funzioni REALI estratte dal file
(regressione col prototipo: identici) + 3 casi sulla guardia velocità +
node --check + test-suite 63/63 verdi.
PROSSIMO (differito di proposito): pulsante "Usa come TDEE" che inietta
l'osservato nel calcolo — solo dopo che Fabrizio si è fatto l'occhio
sull'affidabilità coi pazienti reali.

19 LUGLIO 2026 (2) — P114 PASSO 3: GUARDRAIL SURPLUS + PROTEINE MINIME.
Sessione Fable 5 (effort alto), baseline `e791a62` (post-NEAT).
COSA È CAMBIATO (index.html):
- `_aggiornaRegimeSlider` (~r9806): nuovo avviso SURPLUS. Valutato sulla
  percentuale EFFETTIVA (`offKcal/tdee`), non su `pct`: lo slider cappa a
  +25% ma digitando le kcal a mano il cap si supera, perché il campo kcal
  non viene riscritto quando `origine==='kcal'` (comportamento voluto da
  FIX-REGIME). Sopra +25% effettivo: avviso rosso sulla quota che va in
  massa grassa. Priorità invariata: sotto-MB > surplus > deficit.
- NUOVA `_avvisoProteineDeficit(protG, ffm, kcalObj, tdee, isKeto)`
  (~r9822, accanto a `_gradoKeto`): la soglia si valuta SEMPRE su g/kg di
  FFM InBody qualunque sia il riferimento scelto nel pannello (FFM/Peso
  ideale/Peso corporeo), perché è l'unico denominatore confrontabile.
  STANDARD, deficit ≤−20%: <1,5 g/kg FFM rosso · <1,8 arancione.
  KETO: solo soglia di sicurezza <1,2 g/kg FFM (i protocolli ADI/AME
  hanno proteine già validate — evita falsi allarmi su VLCKD).
  Senza FFM/TDEE non avvisa: silenzio invece di falso allarme.
- Agganciata in `calcolaMacros`: `_protWarnHtml` accanto a `_ketoWarnHtml`
  nel box `mac-result`.
NESSUN CALCOLO ESISTENTE MODIFICATO: solo avvisi aggiuntivi, i macro e il
TDEE restano identici.
VERIFICHE: test logico dedicato dell'avviso proteine (10 casi: soglie,
bordo −20%, keto, dati mancanti ffm/protG/tdee/ffm=0) + test della
priorità dei warning slider (9 scenari) + node --check + 63/63 verdi.
RILEVATO E NON TOCCATO (da decidere con Fabrizio): il box previsione
dimagrimento in `calcolaMacros` (~r9656-9699) usa la regola 7700 kcal/kg
in forma LINEARE e proietta una data di arrivo ("arrivo indicativo: gg
mes aaaa"). La linearità sovrastima sistematicamente oltre le 4-6
settimane perché ignora il calo del dispendio col peso. Candidato a
diventare P114 passo 9 (range invece di data secca) — non modificato
senza decisione clinica di Fabrizio.

19 LUGLIO 2026 — NEAT CONTINUO (PRIMO PASSO NUOVA VOCE P114 — REVISIONE
MOTORE TDEE). Sessione Fable 5 (effort alto), baseline `5b9d15e`.
Origine: revisione critica delle 11 proposte ChatGPT sul motore TDEE.
Verificato sul codice che cronotipo e orario allenamento NON entrano nel
calcolo (premessa #8/#9 errata); individuato nel NEAT a fasce il punto
più grezzo del motore (termine da 0.15-0.50×MB con salti di fascia:
7499→0.25 vs 7500→0.35 = +150 kcal per 1 passo).
COSA È CAMBIATO (index.html, `_neatFrazione` ~r10460):
- La frazione NEAT ora è una curva CONTINUA: interpolazione lineare tra
  ancore poste sui CENTRI delle vecchie 4 fasce — (2000, 0.15) (5750,
  0.25) (8750, 0.35) (12000, 0.50), con pavimento ≤2000 e tetto ≥12000.
- Scala complessiva invariata; sparisce l'effetto scalino. Il tetto 0.50
  si raggiunge gradualmente a 12000 passi (prima: di colpo a 10000).
- Guardia input rinforzata: null E NaN → 0.15 (prima solo null).
- Nuova costante `_NEAT_ANCORE` accanto alla funzione.
EFFETTO SUI PAZIENTI: i TDEE ricalcolati live cambiano di ~50-140 kcal
vicino ai vecchi bordi di fascia (es. 4000 passi: −70 su MB 1500; 10000
passi: −138). I `macrosTarget` GIÀ SALVATI restano intatti (snapshot).
VERIFICHE: test numerico dedicato (monotonia su 0-16000 passi, salto max
0.001/passo, casi null/NaN/bordi) + node --check sul blocco script +
test-suite completa 63/63 verdi.
DOCUMENTAZIONE: nuova voce P114 in Roadmap v4 (piano completo revisione
TDEE, questo è il passo 1); sezione STILE NUTRIZIONALE del Contesto
aggiornata con la nuova formula NEAT.

18 LUGLIO 2026 — P66c CHIUSA (CHIAVE AI SOLO SERVER-SIDE) + NUOVA
PROCEDURA DOCUMENTAZIONE + PULIZIA POST-P66c + NUOVA VOCE P113.
Sessione Cowork con Fabrizio (Opus per P66c, Fable per indagine e
riorganizzazione). Due commit: `e536b95` (index.html — P66c) e il
presente commit (pulizia codice + tutta la documentazione).

── PARTE 1: P66c — chiusura trasporto diretto legacy (commit e536b95,
   HEAD 7c93ffb → e536b95, +71/−125 righe) ──
PRECONDIZIONE (da roadmap: "NON eseguire senza evidenza di uso stabile
del proxy"): verificata insieme a Fabrizio sulla tabella ai_usage — ~20
righe status 200 dall'8 al 17 lug 2026, un solo user_id, tutti i tipi di
chiamata (concetto, import-inbody, fx, ragionamento-riassunto, piano).
Il proxy (Fase 1, commit 85fc8cd) reggeva stabilmente da ~9 giorni.
COSA È CAMBIATO:
- aiCall è ora SOLO proxy autenticato (Edge Function ai-proxy col JWT di
  sessione). Rimossi il ramo diretto verso api.anthropic.com e ogni
  lettura della chiave.
- getAnthropicKey (window.prompt + scrittura anthropicApiKey) ELIMINATA.
  Nuovo helper _aiPronto() = utente collegato (sessione valida o
  rinnovabile via refresh token).
- ~15 call-site AI ripuliti: guardie "hai la chiave?" → "sei collegato?"
  (inclusi 2 call-site sfuggiti al primo grep — giorno speciale P94 e
  voce-progresso — intercettati dal controllo di invarianti).
- Impostazioni: card "API Anthropic" → "Servizio AI" (solo test via
  proxy); initAntCard ora BONIFICA la chiave legacy dai browser.
- Senza sessione o proxy giù: errore chiaro, MAI fallback silenzioso.
  Rollback estremo: git revert e536b95.
Verifica: node --check ok, suite 63/63 verde, invarianti di assenza
chiave. Collaudo in produzione di Fabrizio dopo il push.

── PARTE 2: INDAGINE "PROCEDURE SOVRAPPOSTE" E NUOVA REGOLA DOC ──
Su richiesta di Fabrizio ("più procedure che si sovrappongono"),
verificato che lo stato delle voci viveva in 4-5 posti (riepilogo in
testa alla Roadmap, Blocchi A-D, schede, archivio, più il Contesto) con
3 disallineamenti storici documentati (P59/P60, P78, Contesto su P66c).
ADOTTATA LA REGOLA "UN POSTO SOLO" (testi approvati da Fabrizio):
- Stato voce → SOLO la SCHEDA in NutriGest_Roadmap_v4.md;
- Storia → SOLO CHANGELOG.md; Funzionamento → Contesto; Funzioni → INDEX;
- Roadmap semplice (progetto Claude) = fotografia derivata, formato
  "solo cosa resta", rigenerata a fine sessione;
- Riepilogone di testa della Roadmap SPOSTATO qui sotto (integrale);
- Blocchi A-D congelati come fotografia storica dell'8 lug;
- Checklist di chiusura voce (6 passi, con verifica incrociata finale)
  aggiunta a CLAUDE.md.
NUOVA VOCE P113 — Una sola procedura di sessione: unificare
assicuraTokenValido / _aiTokenPerProxy / verificaSessioneEAvvia /
_aiPronto (stesso refresh_token monouso → rischio rinnovi concorrenti;
prima di P66c il fallback diretto mascherava l'esito). Scheda in Roadmap.

── PARTE 3: PULIZIA POST-P66c (index.html, approvata voce per voce) ──
(a) rimosso il kill-switch _aiProxyDisabled/aiProxyDisabled: senza via
    diretta non faceva più NULLA (falsa sicurezza);
(b) rimossi AI_MODELS e _aiModelFor (registro modelli client: serviva
    solo al trasporto diretto; il modello lo decide il MODEL_REGISTRY
    della Edge Function);
(c) riscritti i commenti sopra aiCall che descrivevano ancora fallback e
    kill-switch come esistenti; aggiornato il commento di _aiLogUsage;
(d) log locale consumi (localStorage aiUsage) TENUTO deliberatamente:
    unica vista consumi senza aprire Supabase; sorte da decidere con
    P66d;
(e) Contesto v18 aggiornato: sezione "API key" e "PIANO DI CHIUSURA"
    ora dicono il vero (chiave solo server-side, piano eseguito);
(f) INDEX.md allineato (salvaAntKey/_aiModelFor/_aiProxyDisabled fuori,
    getAnthropicKey → _aiPronto).
Verifica della pulizia: node --check ok, suite test verde, zero
riferimenti residui a kill-switch/AI_MODELS/trasporto diretto.

── PARTE 4: RIEPILOGO STORICO MIGRATO DALLA TESTA DELLA ROADMAP ──
(Testo integrale al 17 lug 2026, conservato qui per la cronologia; da
questa data la testa della Roadmap non contiene più stati duplicati.)

**Stato voci chiuse (8 lug 2026, aggiornato 14 lug 2026 sera):** P61 (validatore clinico), P62 (troncamento), P77 (output strutturato tool-use, commit `676927e`), P78 (suite test, commit `ba5c109`), **P68** (push incrementale, commit `5487754`+`97f0d53`), **P55** (sorgente unica target macros, `getTargetAttivi`, commit `85b18ea`, 9 lug 2026), **P105** (fix sessione anti-42501, commit `d32f6aa`, 12 lug 2026), **P108 fase 0** (catalogo unico alimenti con id stabile, `risolviAlimento`, commit `f574bb5`, 13 lug 2026), **P109** (valori CREA-INRAN per 68/95 alimenti privi di macros, commit `937cf17`, 13 lug 2026), **P108 fase 1** (sezione "Alimenti": lista/ricerca/filtri, campo allergeni, archivia invece di elimina, confermata in produzione da Fabrizio, 13 lug 2026 sera), **P112** (pannello alimenti unificato giorno gara + unificazione Componi a mano col Generatore AI, commit `2cd0230`→`5173a75`→`c421a07`, 14 lug 2026 sera) chiuse **per intero** → archiviate in fondo (ragionamento CTO) e dettagliate nel CHANGELOG. P63 (diff import, `8c9e77a`) e P66 (proxy AI, `85fc8cd`) chiuse **in parte**, restano come voci-residuo qui sotto. **P60** (separatore frutta PDF, commit `17064c8`) chiusa il 7 lug 2026; **P59** (marker frutta su celle) chiusa lo stesso giorno ma **scartata** dopo verifica clinica (implementata poi revertita, commit `d3c50e0`→`177dce9`) — corretto il 9 lug 2026 un disallineamento: erano rimaste segnate "Da fare" in questo file nonostante CHANGELOG e Contesto le documentassero già chiuse dal 7 luglio. Tutte secondo la SOLUZIONE OTTIMIZZATA, non l'approccio originario.

17 LUGLIO 2026 — P74 FASE 1c: DOPPIA LETTURA `collections` CON PREFERENZA
AL NUOVO E RETE DI SICUREZZA SUL LEGACY. Sessione Cowork con Fabrizio,
modello Opus. HEAD dcaec68 → e88e0fb (index.html). Autonomia L0 (ogni
passo approvato da Fabrizio). Collaudato in produzione da Fabrizio (PC +
iPhone) subito dopo il push: pazienti, concetti, alimenti custom e modelli
di rotazione si caricano regolarmente.

Contesto: la fase 1b (16 lug, notte) aveva attivato la scrittura "ombra"
verso la tabella nuova `collections` senza toccare la lettura. Il 1c è il
gradino che sposta la LETTURA dei 4 meta-record verso la tabella nuova, in
modo transitorio e reversibile.

VERIFICA PRELIMINARE (prima di scrivere codice): Fabrizio ha aperto il
Table Editor di Supabase e confermato che tutte e 4 le righe si popolano
con l'uso reale — `meta_collections`, `__concetti_educativi`,
`__alimenti_custom`, `__modelli_rotazione` — tutte con `updated_at` recente
e stesso `user_id` (RLS ok). Le due righe alimenti/modelli sono state
attivate con una modifica-e-salva mirata per confermare i 5 punti di
scrittura della 1b.

IMPLEMENTAZIONE: due helper puri nuovi accanto a `_collectionsUpsert`:
  - `_collectionsFetch(key)` → legge `collections?key=eq.<key>&select=data,
    updated_at`, ritorna `{data, updated_at}` o null (RLS scopa per utente).
  - `_preferNuovo(neo, legData, legUpd, isValido)` → sceglie il dato nuovo
    solo se presente, valido e non più vecchio del legacy; altrimenti
    ricade sul legacy. Non può MAI restituire un dato più vecchio del
    legacy corrente → nel peggiore dei casi si comporta come prima del 1c.
  - `_tsMs(s)` → normalizza il timestamp Postgres a prova di Safari/iPhone
    (separatore spazio o `T`, offset `+00`/`+00:00`/`Z`, microsecondi → ms).
I 4 read-point (`pullConcetiSupabase`, `_pazFetchMeta`,
`pullAlimentiCustomSupabase`, `pullModelliSupabase`) ora leggono legacy +
collections e passano per `_preferNuovo`; i `select` legacy includono
`updated_at` per il confronto. Nessun cambio ai punti di SCRITTURA (1b) né
alle GET del push che scelgono POST/PATCH. Un log finale segnala se il
dato servito viene da `(collections)` o `(legacy)`.

VERIFICA: `node --check` sul blocco script ok; 7 test unitari sulla logica
`_preferNuovo`/`_tsMs` (preferenza al nuovo, ricaduta sul legacy quando più
recente o quando il nuovo manca/è invalido, casi limite di parsing date)
tutti verdi; diff contenuto a 86 inserimenti / 14 rimozioni sui soli 4
read-point + 2 helper; collaudo in produzione di Fabrizio.

PROSSIMO PASSO (fase 1d, non in questa sessione): dopo qualche giorno di
1c stabile, ritirare del tutto la lettura legacy dei meta-record (lettura
sola da `collections`), poi fase 2 (entità pesanti in tabelle tipizzate).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

17 LUGLIO 2026 — P93 ESTENSIONE: SCHEDA "CIBO" — RESOCONTO MENSILE DI
ADERENZA AGGANCIATO ALL'AI DEL CONTROLLO. Sessione Cowork con Fabrizio,
modello Opus. HEAD 3f32163 → 28675c3 (index.html). Autonomia L1, 3 scelte
di design confermate da Fabrizio prima di implementare.

Contesto: Fabrizio ha chiesto se la scheda "Sabato" (appena chiusa nel
passo precedente) potesse diventare la sezione dove, al controllo mensile,
annota nel dettaglio come riferisce il paziente di aver seguito il piano
(pasto per pasto: rispettato / più / meno / altro) — e se questo resoconto
potesse influenzare l'interpretazione AI del controllo ("Cosa proporre").
Risposta: sì, con un modello a voci strutturate (non testo libero) che si
aggancia in coda al contesto già inviato all'AI.

SCELTE DI DESIGN (confermate da Fabrizio):
  - FORMATO: strutturato per pasto/abitudine (7 voci fisse con stato +
    nota), non un campo di testo libero unico.
  - DOVE: si amplia la scheda "Sabato" esistente (rinominata "🍽️ Cibo"),
    non se ne crea una nuova — il diario sabato resta come sotto-sezione.
  - AGGANCIO: il resoconto entra nel contesto AI che genera "Cosa
    proporre" nel Riepilogo chiamata.

IMPLEMENTAZIONE (commit 28675c3):
  - TAB/PANNELLO: bottone rinominato "🍽️ Cibo" (`pdTab('cibo',this)`),
    pannello `pd-cibo`, funzione `renderPdCibo(p)` che compone: form
    resoconto mensile + separatore + diario sabato (`_htmlDiarioSabato`,
    logica invariata, solo estratta in funzione propria).
  - DATI: p.aderenza = [{id, data, voci:{chiave:{s,n}}, generale}], array
    di resoconti (uno per mese/controllo) sull'oggetto paziente; il più
    recente per data è quello attivo in editing (`_aderenzaCorrente`,
    get-or-create). Nessuna proprietà custom su array (regola 8 rispettata).
  - VOCI FISSE (VOCI_ADERENZA): colazione, spuntino mattina, pranzo,
    merenda, cena, pre-nanna, sabato sera libero. Per ciascuna: stato
    (STATI_ADERENZA: Rispettato / Più del previsto / Meno del previsto /
    Altro-fuori piano) + nota libera facoltativa. Più un campo note
    generali sul mese e una data (default: oggi).
  - UI: `_htmlAderenzaMese` renderizza le 7 righe (select stato + input
    nota), data picker, textarea note generali, bottone "+ Nuovo
    resoconto", elenco resoconti precedenti con eliminazione (✕,
    conferma). `salvaAderenza(key, sub, val)` gestisce i tre casi
    (__generale, __data, voci[key][sub]) con save(p.id) e refresh mirato
    del riquadro recap (`_recapAderenzaHtml`: "Resoconto del [data] · N/7
    voci compilate · N rispettate", o messaggio stato-vuoto).
  - AGGANCIO AI (il cuore della richiesta): nuova funzione
    `aderenzaSintesiTesto(p)` compone un testo che riassume il resoconto
    corrente (stato+nota per voce, note generali) più il riepilogo del
    diario sabato (frequenza scelte, quante volte con alcol). Questo testo
    viene iniettato in coda a `costruisciContestoPaziente(p)` — la
    funzione che prepara il contesto per `avviaFX`/l'analisi AI del
    controllo — con un'istruzione esplicita: "Usa questa aderenza per
    interpretare i risultati (es. peso fermo ma sgarri frequenti) e
    calibrare Cosa proporre." Da questo commit, ogni "💡 Cosa proporre"
    generato tiene conto di ciò che il paziente riferisce a voce, non solo
    dei dati clinici numerici.

VERIFICA: node --check sul blocco <script> estratto ok; suite automatica
63/63 verde; test JSDOM end-to-end che inietta un paziente con resoconto
aderenza + diario sabato e conferma che la stringa di contesto AI generata
contiene letteralmente "ADERENZA RIFERITA DAL PAZIENTE", le note digitate
e il riepilogo sabato. Diff contro HEAD fresco confermato: solo le righe
attese modificate.

17 LUGLIO 2026 — P93 PASSO 2: SCHEDA "SABATO" NEL PAZIENTE (diario scelte
+ recap controllo). Sessione Cowork con Fabrizio, modello Opus. HEAD
7a6d060 → e981772 (index.html: +95 / -1). Autonomia L1, 3 scelte di design
confermate da Fabrizio prima di implementare. Anticipato rispetto alla
stima "~2 settimane": fatto subito nella stessa sessione.

Contesto: seconda metà di P93. Il PDF (passo 1) fa auto-monitoraggio su
CARTA (il paziente spunta); questo passo dà una CASA DIGITALE al dato —
Fabrizio registra al controllo cosa ha scelto il paziente ogni sabato, e
lo rivede come storico. È la prima fetta concreta del diario P85; in
futuro (app paziente P50) sarà il paziente a compilarlo.

SCELTE DI DESIGN (confermate da Fabrizio):
  - DOVE: nuova scheda "🍔 Sabato" nella scheda paziente (accanto a InBody/
    TDEE), non sotto al piano né dentro una scheda esistente.
  - COSA: scelta + alcol + kcal automatiche (dalla tabella KCAL_WEEKEND) +
    nota facoltativa.
  - COME: i sabati del periodo sono PRE-ELENCATI (tra inizio piano e
    controllo); Fabrizio riempie solo le caselle.

IMPLEMENTAZIONE (commit e981772):
  - DATI: p.diarioSabato = [{data, scelta, alcol, nota, kcal}] sull'oggetto
    paziente. Stessa disciplina di p.inbody (array + save(p.id)); nessuna
    proprietà custom su array (regola 8). Record vuoti ripuliti in automatico.
  - UI: tab + pannello pd-sabato; renderPdSabato(p) elenca i sabati
    (helper _sabatiPeriodo, UTC-safe coerente con today()/addDays: primo
    sabato ≥ inizioAlim, passo +7, cap 26). Ogni riga = data + select scelta
    (opzioni per-paziente da getWeekendOpzioni + Altro + "Non fatto") +
    select alcol + cella kcal auto + nota. Recap in cima (_recapSabatoHtml):
    "N/tot sabati registrati · scelte più frequenti · alcol X/N · media kcal".
  - KCAL: _kcalScelta riusa KCAL_WEEKEND (match parziale sul nome), 0 se
    "Non fatto", 800 se scelta non riconosciuta.
  - SALVATAGGIO: salvaDiarioSabato(data, campo, val) → _diarioSabatoRec
    (find-or-create) → set campo → save(p.id) → refresh MIRATO di recap +
    cella kcal (niente ridisegno completo, non perde focus). Copia fedele
    del pattern salvaInbody/delInbody (già in produzione).
  - Se manca p.inizioAlim: messaggio che invita a impostare la data.
  - VERIFICA: node --check ok; suite 63/63; test JSDOM end-to-end via
    _loadApp — elenco 4 sabati corretto su periodo reale, salvataggio su
    db.pazienti[0].diarioSabato, kcal auto (Pizza 900/Sushi 750), recap
    aggiornato ("2/4 · Pizza ×1 · Sushi ×1 · alcol 1/2 · media ~825"),
    pulizia record svuotato. SHA HEAD + diff vs HEAD (solo il blocco nuovo)
    ricontrollati prima della consegna.

Con questo P93 è chiusa completamente: PDF (v1 4d50d15 → redesign 7ddffdf)
+ pannello app (e981772).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

17 LUGLIO 2026 — P93 REDESIGN BLOCCO SABATO (estetica + auto-monitoraggio
su carta). Sessione Cowork con Fabrizio, modello Opus. HEAD 6a91d07 →
7ddffdf (index.html: +75 / -37). Autonomia L1, scelte confermate via
mockup renderizzati (mock visivo prima di implementare).

Contesto: dopo aver visto P93 v1 (riquadro ambra a elenco puntato) nel PDF
reale, Fabrizio ha chiesto di renderlo più bello E di trasformarlo in uno
strumento di auto-monitoraggio: il paziente segna la scelta fatta, così al
controllo lui verifica l'aderenza (come già con le caselle Acqua/Passi/Sonno
del footer PDF). Deciso insieme, via mockup, con varianti a confronto.

REDESIGN (commit 7ddffdf):
  - LAYOUT A2 (scelto tra A1 pillole-a-flusso e A2 griglia): griglia a 2
    colonne, ogni opzione = pillola bianca con EMOJI DEL CIBO (pizza/panino/
    sushi/pesce/carne/libero) + 4 caselline allineate a destra = le 4
    settimane fino al controllo, che il paziente spunta a mano. Riga alcol
    con le sue 4 caselline. Didascalia "4 caselle = 4 settimane · spunta la
    settimana in cui hai scelto". Boxes vettoriali con doc.rect (come le
    pillole promemoria footer).
  - COLORE: verde acqua/teal, coordinato col colore primario dell'app
    (bordo 29,158,117 · fondo 237,250,245 · titolo 15,92,66). L'arancione
    della v1 è stato scartato da Fabrizio.
  - CODICE PDF: nuove `_WEEKEND_FOOD_CP` (mappa opzione→codepoint emoji) e
    `_drawBoxes4`; `_cenaLiberaHeight`/`drawCenaLibera` riscritte (altezza
    da nOpz→2 colonne, riga alcol condizionale). Emoji cibo 1f355/1f96a/
    1f363/1f41f/1f969/1f193 aggiunte al preload cpSet.
  - PER-PAZIENTE invariato: quali opzioni mostrare si spunta nel form
    (p.weekendAltre) — chi non ama sushi/pizza non le vede nel PDF.
  - VERIFICA: node --check ok; suite 63/63; render dal CODICE REALE estratto
    dal file (non dal mock) in 3 scenari: 7 opzioni+alcol, 2 opzioni senza
    alcol, con compressione c=0.9. SHA HEAD ricontrollato + diff vs HEAD
    (solo il blocco cambiato) prima della consegna.

SEGUITO PIANIFICATO (Fabrizio, ~2 settimane → fine lug/inizio ago 2026):
  Passo 2 = pannello app per registrare le scelte nel tempo (versione che
  usa Fabrizio al controllo; in futuro, con l'app paziente P50, sarà il
  paziente a confermare pasto per pasto e generare il report kcal). È la
  versione leggera del diario P85, tocca i dati salvati → a tappe con
  approvazione. NON ancora iniziato.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

17 LUGLIO 2026 — P93 PASTO LIBERO SABATO CONFIGURABILE (fatta, in
produzione) + P96 ETICHETTA WE (verificata, chiusa senza codice). Sessione
Cowork con Fabrizio, modello Opus (claude-opus-4-8). Baseline e874174 →
HEAD 4d50d15 (1 commit, index.html: +114 / -4). Autonomia L1, 3 scelte di
design confermate da Fabrizio prima di implementare.

P93 — PASTO LIBERO DEL SABATO CONFIGURABILE (commit 4d50d15). Scelte di
Fabrizio: (1) più opzioni alternative, (2) alcol con menu preimpostato,
(3) blocco PDF a riquadro colorato evidenziato.
  - MODELLO DATI (additivo, retrocompatibile, sull'oggetto paziente):
    `p.weekend` (stringa) resta l'opzione PRINCIPALE e continua a guidare
    stima kcal (getKcalWeekend), vincolo AI e spunti calendario — zero
    regressione sui consumer esistenti. Aggiunti `p.weekendAltre` (array
    di alternative concesse, checkbox nel form) e `p.weekendAlcol`
    (stringa da select: nessuno / 1 calice di vino / 1 birra / 1 drink).
    Nessuna proprietà custom su array salvati (regola 8 rispettata: sono
    campi dell'oggetto paziente, non attaccati a un array).
  - HELPER PURI top-level: getWeekendOpzioni(paziente) (principale +
    alternative, dedup, ordine preservato) e isWeekendLiberoAttivo(paziente)
    (regola `sabatolibero !== false`).
  - FORM PAZIENTE: sotto "Sabato sera (principale — stima kcal)", nuova
    riga con chip-checkbox "altre opzioni concesse" (classe .p-we-alt,
    data-opt) + select "Alcol concesso" (#p-weekend-alcol). Load: spunta
    le checkbox da p.weekendAltre e carica p.weekendAlcol. Save: raccoglie
    le checked in array + valore select.
  - PDF (blocco dedicato): nel loop giorni, se il giorno è sabato (non
    speciale) col libero attivo e la cena non ha contenuto reale, la cena
    è sostituita da un pasto sintetico {_cenaLibera:true, _wl:...} che
    scorre nel normale motore di layout (compressione/espansione) grazie
    ai branch dedicati in measurePasto/drawPasto. drawCenaLibera disegna
    il riquadro ambra (roundedRect 'FD', fill 255,248,235 · bordo
    232,168,80) con titolo 🍔 "SABATO SERA - PASTO LIBERO", elenco opzioni
    ("A scelta tra:" se >1) e riga alcol 🍷. Altezza condivisa tra misura
    e disegno (_cenaLiberaHeight) per non sforare il layout. Emoji 1f354 e
    1f377 aggiunte al preload cpSet. Fallback pulito solo-testo se le PNG
    Twemoji non sono in cache.
  - AI LAYER: la riga di vincolo del prompt ora elenca opzioni + alcol
    ("Sabato cena: PASTO LIBERO — <opzioni> (alcol concesso: ...) — non
    generare nulla per la cena del sabato"). Aggiornata anche la riga
    "Sabato cena libera" del blocco REGOLE PERSONALIZZATE.
  - COMPORTAMENTO: se il sabato ha una cena reale inserita a mano, il
    riquadro NON compare (rispetta l'override); se la regola sabatolibero
    è disattivata, sparisce del tutto. Il tracking di cosa è stato
    realmente bevuto resta FUORI (materia del diario, P85), come da roadmap.
  - VERIFICA: node --check ok sul blocco script; suite automatica
    test-suite/ 63/63 verde sul file modificato (S1 smoke JSDOM + S2 puri
    + S3 jsPDF); PDF di prova generato con lo stesso motore jsPDF 2.5.1 e
    reso con pdftoppm, controllato a video nelle tre casistiche
    (multi-opzione+alcol / opzione singola / vuoto). SHA HEAD ricontrollato
    prima della consegna (main non mosso durante l'edit).

P96 — ESTETICA TAG WE NEL PDF (verificata, chiusa senza codice proprio).
Controllato tutto il motore di generazione PDF: il tag "WE" NON esiste più
(zero occorrenze), assorbito dai lavori PDF di giugno (P72/P60/P92) come
previsto dal CTO. Nessuna estetica da correggere. La verifica ha però fatto
emergere che il sabato sera libero non veniva stampato affatto nel PDF (slot
cena vuoto → measurePasto 0 → non disegnato): buco chiuso contestualmente
da P93. Voce chiusa; il valore aggiunto è confluito nel blocco PDF di P93.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

17 LUGLIO 2026 — P84 LISTA DELLA SPESA (chiusa, in produzione) + FIX
max_tokens GENERATORE PIANI. Sessione con Fabrizio, alternanza Opus
(claude-opus-4-8, decisioni + implementazione) e Sonnet (claude-sonnet-5,
ritocchi/commit). Baseline 3d67bc4 → HEAD c75df24. Autonomia L1.

P84 — LISTA DELLA SPESA AUTOMATICA (commit 919dce6, 85f5fd7, f1495ff,
4f7d511, 1171aea, f0e1ebe, c75df24). Nuovo pulsante "🛒 Lista della spesa"
sotto al piano (ramo attivo _renderGiornoGen del Generatore). Motore puro
`costruisciListaSpesa(piano, paziente)` — nessun DOM, non salva nulla, si
ricalcola sempre dal piano:
  - Aggrega SOLO i pasti principali (cella.alimenti[0]), niente
    alternative; salta la cena libera del sabato; esclude sale e olio
    (spezie incluse). Le righe-ricetta con grammatura leggibile vengono
    scomposte (riuso _ngScomponiIngredienti) e sommate.
  - Categorie da getCategoriaFunzionale; le voci dettagliate portano id
    catalogo + barcode (P108) per il riuso futuro (app paziente / link).
  - Frutta / verdura / frutta secca NON elencate per alimento ma come
    voce generica con numero di porzioni raggruppate per grammatura; la
    frutta con la taglia (50g piccoli / 100g medi / 150g interi, valori
    fissi di Fabrizio). Le altre categorie dettagliate con i grammi.
  - Nota in testa: "Lista calcolata in base alle prime scelte di ogni
    pasto".
  Vista `_spesaHtml`: riquadri colorati per categoria su due colonne
  bilanciate (LPT + ordine canonico), testo ingrandito (iterazioni: prima
  due colonne piccole, poi colonna unica mobile — scartata su richiesta —
  infine due colonne fisse con font più grande, leggibile anche sul PDF
  rimpicciolito dal telefono).
  Export (semplificato su richiesta di Fabrizio):
  - 📄 Scarica PDF = PDF vero disegnato con jsPDF (_spesaCostruisciPDF,
    stesso motore del PDF piano), scaricato con un click, SENZA dialogo di
    stampa (prima usava window.print, scomodo).
  - 📤 Condividi PDF = navigator.share({files:[pdf]}): sul telefono apre
    il menù nativo → WhatsApp con il PDF ALLEGATO; sul computer (share di
    file non supportato) fallback a download. Sostituisce il vecchio
    pulsante WhatsApp-testo.
  Funzioni legacy lasciate ma non più collegate: stampaListaSpesa
  (window.print), copiaListaSpesa (clipboard), whatsappListaSpesa (wa.me
  testo). Verifica: node --check ad ogni consegna; test logico del motore
  (aggregazione, esclusioni, sabato, taglie frutta, porzioni); prove nel
  browser headless con DB reale (categorizzazione corretta) e PDF
  renderizzato (pdftoppm) per il controllo visivo.

FIX max_tokens GENERATORE PIANI (commit 2eec7bc). Bug reale visto in
console da Fabrizio: "Errore generazione AI: Risposta AI senza blocco
tool_use né testo" su un piano ricco da 6 giorni. Causa: `_pianoMaxTokens`
dava un tetto troppo stretto (1500/giorno+1500 → 10500 per 6 giorni), la
risposta AI si troncava per max_tokens a metà del tool_use e
`_estraiPianoDaRisposta` lanciava PRIMA che il recupero P62 potesse
partire. Fix minimale: tetto allargato a 2200/giorno+2000 (6gg=15200,
7gg=16000, cap invariato 16000). È solo un tetto: non aumenta il costo dei
piani che già rientravano. NB residuo: se un piano superasse anche i 16000
si ripresenterebbe — resta come possibile lavoro futuro rendere il
recupero robusto al troncamento totale.

16 LUGLIO 2026 (notte) — P74 FASE 1a+1b (tabella `collections` + doppia
scrittura) IN CORSO — piano fase 1 in 4 sotto-passi (1a tabella, 1b
doppia scrittura, 1c doppia lettura, 1d cutover) concordato con
Fabrizio dopo la chiusura della 0.5. Sessione avviata su Opus
(claude-opus-4-8), rifinitura 1b su Sonnet (claude-sonnet-5). Autonomia
L0, baseline commit 6ec732e:

  1a — Tabella `collections` creata da Fabrizio via SQL Editor Supabase
  (script fornito da Claude, non eseguibile lato client): schema
  `{key text, user_id uuid default auth.uid(), data jsonb, updated_at
  timestamptz, PK(key,user_id)}`, RLS row-owner identica alle 5 tabelle
  esistenti (policy unica FOR ALL, `user_id = auth.uid()`). Verificato
  da Fabrizio: rls_attivo=true, numero_policy=1. Nessun dato esistente
  toccato — tabella nuova e vuota.

  1b — Doppia scrittura (SOLO scrittura, nessun cambio di lettura):
  nuovo helper `_collectionsUpsert(key, data)` (upsert POST con
  `Prefer: resolution=merge-duplicates`, stesso pattern già in uso per
  `pushModelliSupabase`). Agganciato ai 5 punti che scrivono i 4
  meta-record: `pushConcetiSupabase`, `pushAlimentiCustomSupabase`,
  `pushModelliSupabase`, la sezione meta di `pushToSheets` (push
  completo) e il ramo `META_KEY` di `_pushRigaPerId` (push incrementale
  P68). Ogni chiamata scrive in `collections` la STESSA identica
  chiave e lo STESSO identico `data` già scritto nella vecchia riga
  `pazienti` — nessuna trasformazione, mapping 1:1.

  Scelta di sicurezza deliberata: la scrittura ombra parte SOLO se la
  scrittura legacy è andata a buon fine (gate esplicito su ogni sito:
  dopo il controllo di errore, prima del `return true`/`return ok`). Un
  fallimento della scrittura ombra non altera mai l'esito della
  funzione chiamante (nessun await bloccante sul suo esito, solo
  log console in caso di errore) — la fase 1b non deve MAI poter
  peggiorare l'affidabilità del salvataggio reale, che oggi dipende
  solo dalla vecchia posizione. Nessuna lettura da `collections` in
  questa fase: il comportamento visibile dell'app è invariato al 100%.

  Verifica: node --check sul blocco script OK; test-suite completa
  63/63 verdi; smoke JSDOM dedicato con fetch mockato — copre i 4
  meta-record (chiavi e contenuto scritti in `collections` corretti,
  spot-check su alimenti custom e su meta_collections/disponibilita) e
  il caso di fallimento legacy (scrittura ombra NON deve avvenire se
  la legacy fallisce), verificato sia per un push diretto
  (pushAlimentiCustomSupabase) sia per il push incrementale
  (_pushRigaPerId su META_KEY).

  DA FARE prima della 1c: uso reale per qualche giorno (push naturali
  dell'app, PC+iPhone) per lasciare che `collections` si popoli con
  tutti e 4 i meta-record; poi verifica manuale nel dashboard Supabase
  (Table Editor → collections) che le 4 righe esistano con contenuto
  plausibile, PRIMA di introdurre la lettura preferenziale.

16 LUGLIO 2026 (tardo) — P74 FASE 0.5 ✅ CHIUSA: collaudo in produzione
confermato da Fabrizio (commit `6ec732e`, push riuscito). Verificato su
PC e iPhone: sincronizzazione, apertura scheda dopo modifica su altro
dispositivo, creazione paziente con comparsa cross-device, archivia/
ripristina dalla lista — tutto ok, nessuna regressione. Prossimo passo:
fase 1 (`collections` per i 4 meta-record) in discussione, autonomia L0.

16 LUGLIO 2026 (sessione serale) — P74 FASE 0.5 (pull "shallow" lista
pazienti + download differenziale, variante B2) IN COLLAUDO + schema
target P74 nel Contesto (fase 0) + fix scheda P78 in Roadmap. Sessione
iniziata su Fable 5 (claude-fable-5, effort medio), rifinitura B2 su
Opus (claude-opus-4-8). Autonomia L0 — variante scelta da Fabrizio tra
tre proposte (B1 lazy vs B2 pull differenziale vs A solo-percezione),
baseline commit 59a8f64:

  Nota di percorso: la prima stesura era B1 lazy; Fabrizio ha poi scelto
  il B2. La differenza pratica era piccola (il B1 che avevo scritto già
  scaricava in sottofondo i blob mancanti), ma il B2 è stato reso "pulito"
  con tre rifiniture — vedi sotto — così il codice e i documenti dicono
  davvero B2.

  Cosa: i pull dei pazienti (pullFromSheets e tappa 1 di sincronizzaTutto)
  non scaricano più il blob intero di ogni paziente ma una PROIEZIONE
  leggera PostgREST (select=id,updated_at,nome:data->>nome,...: solo i
  campi mostrati in lista) → la lista appare subito. Subito dopo,
  _pazIdrataCambiati scarica il blob completo dei SOLI pazienti nuovi o
  cambiati dall'ultima volta (updated_at ≠ baseline P69) e li sostituisce
  al volo in db.pazienti. I pazienti NON cambiati (il caso normale) non
  viaggiano mai più: era il grosso del payload a ogni sync. Il dispositivo
  resta però SEMPRE completo — tutti i blob in cache (offline ok,
  generatore/dashboard completi, scheda istantanea).

  Le tre rifiniture B2 rispetto alla prima stesura B1:
  1. NIENTE evict-then-refetch: le copie superate non vengono più espulse
     dalla cache e riscaricate (c'era un istante a blob assente → un
     paziente poteva "lampeggiare via" dal menu generatore). Ora restano
     in cache e vengono sostituite al volo dalla versione nuova.
  2. Il download dei cambiati è il PASSO PRINCIPALE garantito dopo ogni
     pull (_pazIdrataCambiati), non un'aggiunta in secondo piano.
  3. Apertura scheda istantanea: legge la cache (_pazAssicuraBlob torna
     subito se il blob è fresco); il download al volo resta solo come rete
     di sicurezza per i casi limite (dispositivo nuovo, apertura durante
     l'idratazione).

  Architettura e sicurezza (il perché delle scelte):
  - Le righe leggere vivono SOLO in window._pazIndex (localStorage
    'pazIndexP74'), MAI in db.pazienti: pushToSheets invia l'intero
    contenuto di db.pazienti, e una riga leggera pushata avrebbe
    sovrascritto il blob clinico completo sul server. REGOLA NON
    NEGOZIABILE per tutte le fasi successive di P74.
  - La lista si disegna da _pazMergedList() = blob idratati + righe
    leggere (marcate _shallowRow, mai salvate né pushate). Con l'idratazione
    B2 le righe leggere sono solo scaffolding transitorio (primo caricamento
    su un dispositivo nuovo / finestra di idratazione): a regime la lista
    viene tutta dai blob.
  - _pazApplicaIndice riconcilia la cache: la presenza remota comanda
    (stessa semantica del pull storico); esce dalla cache SOLO chi è
    sparito da remoto (e non è dirty o in uso). Le copie superate restano
    e le aggiorna l'idratazione. MAI espulsi pazienti dirty o in uso
    (scheda aperta / generatore): il conflitto resta competenza di P69.
  - _pazIdrataCambiati seleziona per differenza baseline↔indice: scarica
    id mai visti (nessuna baseline) e id con updated_at diverso dalla
    baseline (cambiati altrove); salta i dirty (P69 al push). updated_at
    è la stessa colonna letta dal pull leggero e dal fetch del blob →
    dopo l'idratazione baseline===indice, quindi nessun ri-download degli
    invariati (transizione dolce: le baseline dei client aggiornati
    esistono già dal push/pull pre-P74).
  - Baseline P69: NON più allineata in blocco dal pull
    (_p69SetBaselineFromRows rimossa dai 2 call-site; funzione lasciata
    nel codice). Si aggiorna SOLO quando il blob viene davvero scaricato
    (_pazFetchBlob) o pushato: allinearla dal pull leggero avrebbe
    "accecato" il rilevamento conflitti (baseline nuova + blob vecchio →
    flush che sovrascrive senza avviso).
  - Meta record (disponibilita + tombstone + migrazioni legacy): non
    arriva più col pull unico → fetch dedicato _pazFetchMeta(); se
    fallisce, il pull prosegue (i tombstone vengono comunque rifusi
    prima di ogni push del meta da _mergeTombstonesRemoti).
  - Tombstone P64: filtrati dall'indice in _pazApplicaIndice;
    _applicaTombstones ed eliminaPaz ripuliscono anche l'indice.
  - Offline: al primo avvio post-aggiornamento l'indice si semina dalla
    cache blob locale (_pazIndexLoad, chiamata dopo loadLocal); scheda
    mai scaricata su un dispositivo nuovo → messaggio dedicato, nessun
    crash; copia locale presente ma superata + offline → si apre la
    copia locale con avviso.
  - Guardia "0 righe = non toccare i dati locali" replicata; in
    sincronizzaTutto ora è esplicita (prima il pull inline avrebbe
    azzerato db.pazienti su risposta vuota).

  Verifica: node --check sul blocco script OK; test-suite completa
  63/63 verdi; smoke JSDOM dedicato B2 (niente espulsione dei superati,
  merge lista, download differenziale = solo cambiati/nuovi mai gli
  invariati, dirty-guard, rimozione-da-remoto, filtro tombstone) OK.

  DA COLLAUDARE IN PRODUZIONE prima di dichiarare chiusa la fase:
  avvio e Sincronizza su PC e iPhone; apertura scheda dopo una modifica
  fatta sull'altro dispositivo; creazione paziente su un dispositivo e
  comparsa sull'altro (lista + menu generatore); archivia/ripristina
  dalla lista; verifica payload ridotto (Network tab: il GET pazienti di
  lista non porta più la colonna data; solo i cambiati fanno il GET del
  blob completo).

  Documentazione: Roadmap — scheda P74 avanzata a "In corso (0.5 in
  collaudo, variante B2)"; scheda P78 corretta (risultava "Da fare" ma è
  chiusa dal 7 lug 2026, commit ba5c109 — stesso tipo di disallineamento
  dell'incidente P62/P77). Contesto — nuova sezione "P74 SCHEMA TARGET"
  nelle Decisioni architetturali (fase 0 "su carta", chiesta dalla
  roadmap per non far inventare a P63/P25/P88 forme incompatibili) e
  semantica sync aggiornata al pull leggero + download differenziale.

16 LUGLIO 2026 — P73 (revisione linguaggio prescrittivo) CHIUSA
(commit `34dd1ae`) + disallineamento roadmap/CHANGELOG scoperto su
P62/P77. Fable 5, Ragionamento Attivo Alto, Fabrizio in loop (L0 —
nessuna riformulazione autonoma di contenuto clinico):

  Punto di partenza: audit delle parole-sentinella (prescriv*,
  posologia, mg/die, terapia) su tutti i contenuti hardcoded
  dell'app, per rimuovere linguaggio da prescrizione medica che
  espone a rischio legale/regolatorio (l'app non deve sostituirsi
  a una prescrizione — sinergia con P53/classificazione MDR).

  Audit: trovate 3 occorrenze critiche nella scheda Berberina
  ("perché la prescrivo", "A chi la prescrivo", "PERCHE' LA
  PRESCRIVO") con dosaggio diretto (500mg x3/die) e "prodotto
  consigliato" (rischio doppio: prescrittivo + commerciale); 1
  occorrenza media in Vitamina D ("Integrazione consigliata:
  2.000 UI/giorno"); 2 occorrenze UI ("Spezie terapeutiche",
  "Routine giornaliera terapeutica"). Zero occorrenze in
  posologia, nei prompt AI (FX/WhatsApp), nei commenti di codice
  (mg/die a righe 5451-5492 sono commenti, invisibili).

  Riformulazione (approvata da Fabrizio voce per voce prima di
  scrivere codice): principio guida "da prescrizione a evidenza
  scientifica + rimando al medico". Berberina: titolo e
  intestazione riformulati, "a chi la prescrivo"→"in quali
  situazioni la ricerca ne ha studiato i benefici", dosaggi
  attribuiti esplicitamente ai protocolli di ricerca (non a
  Fabrizio), rimosso "prodotto consigliato", disclaimer finale
  rafforzato con menzione esplicita delle interazioni
  farmacologiche (metformina, insulina). Vitamina D: stesso
  principio, dosaggio attribuito alle integrazioni comuni in
  letteratura, non a un consiglio diretto. UI: "Spezie
  terapeutiche"→"Spezie funzionali", "Routine giornaliera
  terapeutica"→"...di benessere".

  Nuovo componente `disclaimerClinico()` (~riga 3151, index.html):
  stringa unica riusabile, oggi richiamata in coda alla sezione
  "Consigli per te" del PDF (font 7.5 grigio). Fonte unica del
  testo — nessuna copia sparsa da tenere allineata a mano.

  Verifica: `node --check` sul blocco script (19.046+ righe) OK;
  grep di conferma zero occorrenze residue di "prescriv*" nel
  file dopo la modifica.

  Lasciato invariato (deciso con Fabrizio): commenti di codice
  con "TERAPEUTICA" (invisibili all'utente, tocco minimo); nota
  "bersaglio terapeutico" nell'analisi del sangue (linguaggio
  tecnico corretto in quel contesto, visibile solo al
  professionista, non al paziente).

  Resta DA FARE (spostato dentro P78, non ha senso come task
  isolato prima che esista la suite): la lista sentinella come
  test automatico (grep che fallisce se "prescrivo" ricompare in
  un futuro contenuto incollato) — punto (4) della scheda P73
  originaria.

  DISALLINEAMENTO SCOPERTO — P62 e P77: durante la
  pianificazione di questa sessione, la Roadmap segnava P62 e
  P77 come "Da fare". Prima di iniziare a implementarle, il
  CHANGELOG (questa sezione, voce del 7 luglio sessione serale)
  ha rivelato che erano GIÀ state chiuse il 7 lug 2026 (commit
  `676927e`): schema tool-use versionato, rigenerazione delta,
  cache 90gg confermata non impattata, suite 61/61. La scheda
  Roadmap era rimasta "Da fare" perché non era stata aggiornata
  nello stesso commit di chiusura. Le tre schede (P73/P62/P77)
  sono state corrette a "CHIUSA" in `NutriGest_Roadmap_v4.md`
  con dettagli e riferimento ai commit. LEZIONE OPERATIVA (da
  CLAUDE.md/prassi): incrociare sempre Roadmap+CHANGELOG prima di
  dare per scontato che una voce sia da fare, per evitare di
  rifare lavoro già esistente; idealmente la scheda Roadmap va
  aggiornata a CHIUSA nello stesso commit in cui si chiude la
  voce, non in un secondo momento separato.


ricette nel modale pasto e in Pesca ricetta (commit `bd1744f`). Sonnet
Low/Medium, Thinking OFF:

  Punto di partenza: Fabrizio ha notato che ricette della stessa
  "famiglia" (es. "Pancake alla banana con mirtilli e miele" e
  "Pancake proteico con mirtilli e cannella") comparivano lontane
  nella lista ricette, perché l'ordine era semplicemente quello di
  inserimento (nessun ordinamento esisteva nel codice).

  Analisi: la roadmap prevedeva P80 come raggruppamento per campo
  `r.famiglia`, assegnato automaticamente da P37 (dedupe fuzzy sulle
  1.256 ricette d'archivio). In questa sessione P37 è stato escluso
  dalla roadmap (valutato spreco di risorse da Fabrizio), quindi
  l'assegnazione automatica della famiglia non è più disponibile.
  Concordata con Fabrizio una soluzione più leggera in due possibili
  strade: (A) ordinamento alfabetico puro, zero tagging manuale,
  risolve i casi in cui le ricette simili condividono le prime parole
  del nome; (B) campo "famiglia" editabile a mano, più flessibile ma
  richiede tagging manuale di ogni ricetta. Scelta: Strada A.

  Implementazione: aggiunto `ricette.sort(...)` con
  `localeCompare(..., 'it', {sensitivity:'base'})` su `r.nome` in due
  punti: (1) `renderListaRicette` (righe ~13527, modale a linguette
  Scrivi/Ricettario/Ricette parziali, condiviso da tab Ricettario e
  tab Ricette parziali); (2) `_ngPescaRicetta` (righe ~15874, popup
  "Pesca ricetta" viola). Zero altre modifiche, zero struttura dati
  nuova. Verificato `node --check` su tutti i blocchi script prima
  della consegna. Confermato funzionante in produzione da Fabrizio.

  Nota per il futuro: se l'ordinamento alfabetico non basta a
  raggruppare ricette con nomi diversi che dovrebbero stare vicine,
  resta aperta la Strada B (campo `r.famiglia` manuale) come
  estensione, non alternativa — le due tecniche possono coesistere.

  Altre decisioni di roadmap in questa sessione (nessun codice
  toccato):
  - P83 (caffè fit) → ANNULLATO. La categoria "Fit" verrà rimossa;
    sostituita dalla composizione automatica delle celle dal titolo
    ricetta (funzione già in uso per altre ricette).
  - P37 (caricamento 1.256 ricette dagli appunti) → ESCLUSO
    definitivamente dalla roadmap, giudicato spreco di risorse da
    Fabrizio. Impatto: P80 e P3/P84, che lo citavano come sblocco,
    vanno ripensati senza quel prerequisito (P80 già ripensato in
    questa sessione, vedi sopra).
  - P82 (alimenti custom) → solo verificato: già chiuso il 12 luglio
    2026, nessuna azione necessaria.

14 LUGLIO 2026 — SERA TARDI — Pannello alimenti unificato nel giorno gara
+ unificazione "Componi a mano" col Generatore AI (commit `2cd0230` →
`5173a75` → `c421a07`). Opus High, Thinking ON:

  Punto di partenza: nel giorno gara (e negli altri giorni generati
  dall'AI) non esisteva un modo rapido di aggiungere un alimento dentro
  una cella — solo il popup categoria→alimento di `apriAggiungiCella`.
  Il "Componi a mano" invece aveva già un pannello alimenti a sinistra
  con ricerca, colori semaforo e trascinamento (`_ngRenderAlbero` +
  `_ngDrop`), ma viveva in un editor completamente separato
  (`_ngRenderEditorManuale`/`_ngRenderPianoDestra`) con la sua estetica
  (linguette blu, card separate per pasto) diversa da quella verde a
  pillole del generatore AI.

  MOCKUP PRIMA DEL CODICE: prima di toccare `index.html`, generati due
  mockup (HTML statico, poi widget) mostrati a Fabrizio per validare
  layout (pannello 250px a sinistra, ricerca+filtro+semaforo, zona di
  rilascio evidenziata in verde con "rilascia qui: nome (Xg proposti)")
  prima di scrivere qualunque riga di codice reale.

  COMMIT `2cd0230` — Pannello alimenti nel giorno gara: nuove funzioni
  `_garaRenderPannelloAlimenti` (colonna sinistra 250px, riusa
  `ALIMENTI`/`_ngColoreSemaforoNome`, elenco COMPLETO — colorati per
  semaforo paziente + non segnati in grigio), `_garaFiltro` (ricerca
  testo + checkbox "Solo alimenti del paziente", default ON),
  `_garaDragOver`/`_garaDragLeave`/`_garaDrop` (drop-zone che avvolge
  `_renderCelleHtml` di ogni pasto in `_renderGiornoGen`; drop su cella
  esistente → alternativa, su vuoto → nuova cella, via
  `_ngAggiungiAlimento` — stessa mutazione dati del compositore
  manuale, refresh via `_aggiornaPianoBox`). Sorgente drag: riusa
  `_ngDragStart` esistente, nessuna duplicazione lì.

  COMMIT `5173a75` — Unificazione "Componi a mano": invece di
  ridipingere `_ngRenderEditorManuale` per farlo sembrare il
  generatore (due copie da mantenere), `_ngCreaPianoManuale` ora
  chiama `inizializzaP2` + `renderPianoConPillTabs` — lo STESSO
  ingresso del flusso AI. Riportate nel generatore le due funzionalità
  che aveva solo il manuale: pill "+" per aggiungere giorni (fino a
  14, riusa `_ngCambiaNumeroGiorni`/`_ngIndiceInizioSpeciali`) e
  bottone "📖 Pesca ricetta" per pasto (riusa `_ngPescaRicetta`
  esistente). Salvataggio unificato sul bottone reale "💾 Salva piano
  definitivo" (`p2-save`, upsert su Supabase) invece del vecchio
  `_ngSalvaPianoManuale` (cache locale soltanto) — aggiunto il gate
  clinico P61 (`validaGateExport`) anche lì, silenzioso sui piani
  validi, prima assente sul percorso manuale-poi-generatore. Aggiunto
  snapshot/ripristino dello stato del pannello alimenti (testo
  ricerca, categorie aperte, scroll) attraverso i re-render innescati
  da ogni drop, altrimenti si sarebbero azzerati a ogni alimento
  trascinato. `_ngRenderEditorManuale`/`_ngRenderPianoDestra` e i loro
  drag handler (`_ngDragOver`/`_ngDragLeave`/`_ngDrop`) restano nel
  file marcati esplicitamente come LEGACY/fallback (commento in testa
  alla funzione), non più nel percorso vivo — stessa disciplina già
  applicata al bug P94 (rami di rendering morti).

  COMMIT `c421a07` — Fix allineamento: le pill dei giorni (Lun/Mar/
  Mer...) erano posizionate sopra l'INTERA riga (pannello alimenti
  incluso), segnalato con screenshot da Fabrizio. Spostato `pillsHtml`
  dentro la colonna destra del layout flex, sopra la card verde del
  giorno — ora le pill partono da dove inizia la card, non dal bordo
  del pannello alimenti.

  Per ciascun commit: `node --check` sul blocco script, verifica del
  contenuto (grep su stringa univoca della modifica) prima della
  consegna, SHA di HEAD riverificato invariato prima di consegnare.

  RIGENERATO INDEX.md per intero (non solo la sezione toccata) con
  script Python automatico su tutte le `function`/`async function`
  top-level (673 funzioni, prima l'estrazione ne perdeva 86 perché non
  gestiva `async function` — corretto durante la rigenerazione stessa).
  Sezioni ancorate ai titoli editoriali del vecchio indice; funzioni
  nuove (`_gara*`) e legacy (`_ngRenderEditorManuale` e affini)
  annotate esplicitamente riga per riga.

  FOCUS COMPONENTI COINVOLTI: Frontend (Generatore AI + Compositore
  manuale, ora stesso percorso di rendering). Nessun DB nuovo, nessuna
  AI coinvolta in questo blocco.

14 LUGLIO 2026 — P92 Consigli condizionali nel PDF (fatta, ridefinita
in sessione) (commit c352514). Sonnet Bassa:

  P92 nella scheda originaria parlava di due consigli pre-pranzo/
  anti-dolce nel footer promemoria. La richiesta reale, emersa mostrando
  a Fabrizio uno screenshot del PDF, era diversa: ridisegnare la riga
  "Prima/Durante/Dopo" (integratori/routine) che compare accanto al
  nome del pasto, segnalata come resa "orribile".

  Tre problemi trovati nel rendering originale (pastoBlocco, blocco
  routineDelPasto): (1) la riga partiva schiacciata a destra del titolo
  pasto, con poco spazio orizzontale — causava a-capo a metà parola;
  (2) le emoji nei nomi routine (es. "Succo Verde 🟢") non sono gestite
  dal font Helvetica di jsPDF e producevano glifi illeggibili tipo
  "Ø=ßâ"; (3) spaziatura fra lettere anomala, artefatto della
  compressione del testo nello spazio ristretto.

  Fix: le voci sono raggruppate per momento (prima/durante/dopo) in
  pillole colorate (verde chiaro/verde/ambra) accanto al titolo del
  pasto, con l'etichetta Prima/Durante/Dopo in grassetto corsivo. Più
  voci nello stesso momento si uniscono in un'unica pillola con " + "
  (es. "Durante · Vitamina D3 2000 + Curcuma e pepe nero 1 cucchiaino").
  Il wrap va a capo con pillole intere, mai spezzate a metà. Nuova
  funzione locale stripEmojiPDF() rimuove emoji/simboli solo dal testo
  stampato nel PDF — non tocca i dati salvati né la funzione globale
  safe() usata altrove nel file (18 usi), per non avere impatti fuori
  da questo blocco.

  Prima di procedere sono state mostrate a Fabrizio due anteprime reali
  generate con jsPDF (stesso motore di produzione) per validare stile
  e comportamento di wrap/raggruppamento, incluse le scelte finali su
  layout (pillole accanto al titolo, non sotto), stile testo (grassetto
  corsivo, non simboli ▸◆◂) e raggruppamento (pillola unica per
  momento, non una per voce).

14 LUGLIO 2026 — P95 Nomi giorni configurabili (fatta) + fix bug P94
(commit ba5199f → 7aa3eb6 → 3f69f08). Sonnet Media:

  P95 Nomi dei giorni configurabili — verifica preliminare (10 min, come
  da scheda): i giorni NON sono chiavi ma array di oggetti, quindi
  nessuna migrazione necessaria. Il nome del giorno però fa tre lavori
  diversi nel codice: chiave di lookup (_trovaPasto e simili), rilevamento
  semantico (weekend, ON/OFF ciclizzazione via regex), etichetta a
  schermo/PDF. Richiesta reale di Fabrizio: solo il terzo punto, con due
  varianti aggiuntive oltre al nome-settimana — "Giorno 1" e "Giorno A".

  Implementazione (commit ba5199f): funzioni condivise
  _ngEtichettaGiorno / _ngEtichettaGiornoBreve / _ngModalitaNomeGiorno
  calcolano l'etichetta da mostrare senza mai toccare la stringa interna
  del giorno (weekend/ON-OFF/lookup restano intatti). I giorni speciali
  (P94) mantengono sempre il loro titolo a tema in ogni modalità. La
  modalità scelta si salva su piano[0]._modoNomeGiorno — un campo di
  oggetto normale, non una proprietà custom sull'array (che
  JSON.stringify ignorerebbe silenziosamente al salvataggio su Supabase:
  bug evitato in fase di test, prima della consegna).

  Riposizionamento (commit 3f69f08): il selettore Sett/1/A, su richiesta
  di Fabrizio dopo un primo mockup, è stato spostato dall'intestazione
  verde alla riga delle linguette giorno, prima del primo tab.

  Fix bug P94 (commit 7aa3eb6, stessa sessione): i bottoni-toggle delle
  giornate speciali (Fase 1) non comparivano nel Generatore AI a
  pillole — erano scritti dentro _renderGiornoAttivo, raggiungibile solo
  dalla vista legacy, mentre il Generatore a pillole chiama
  _renderGiornoGen e fa return prima di arrivarci. Aggiunto lo stesso
  blocco bottoni dentro _renderGiornoGen (dopo _appendBtnConcetti).
  Fase 1 di P94 va ricollaudata dal Generatore AI a pillole dopo questo
  fix (non solo dall'editor manuale, dove funzionava già).

14 LUGLIO 2026 — P94 Giornate speciali (fatta, 2 fasi)
(commit 997d0ce → 36c377b → 58875eb → ca4137a). Sonnet Media per fase 1,
Opus Alto + Thinking ON per fase 2:

  P94 Giornate speciali — implementazione più semplice del previsto:
  il giorno speciale è un giorno IDENTICO agli altri (stessa struttura
  pasti/celle), solo con etichetta a tema. Nessuna dipendenza da P3
  (niente preset dietetico dedicato): essendo un giorno vero nell'array
  del piano, entra da solo in medie kcal, lista spesa, validatore P61
  e PDF.

  Fase 1 (commit 997d0ce, 36c377b, 58875eb): bottoni-toggle preimpostati
  (🎄 Natale · 🏆 Giorno gara · 🚗 Viaggio in macchina · ✈️ Viaggio in
  aereo) nell'editor manuale e nel Generatore AI. Acceso → aggiunge
  giorno vuoto in fondo (speciale:true, temaKey); spento → lo rimuove.
  Le speciali restano sempre ultime: `_ngCambiaNumeroGiorni` inserisce
  i nuovi giorni normali PRIMA di eventuali speciali (via
  `_ngIndiceInizioSpeciali`). Nello stesso giro, fix di un bug preesistente
  sul click delle tab giorni su desktop (drag-scroll, commit 36c377b).

  Fase 2 (commit ca4137a): pannello contesto (campi guidati per tema +
  note libere) + generazione AI del singolo giorno (`_generaGiornoSpecialeAI`),
  una sola chiamata dedicata che riusa l'intera pipeline esistente
  (costruisciPrompt, _pianoToolSchema(1), aiCall, espandiPiano) con
  un'istruzione finale che vincola l'output a 1 giorno adattato al
  contesto, rispettando comunque kcal/macro/allergie del paziente.
  Costo stimato ~3-5 centesimi $ a chiamata (Sonnet) — verificato prima
  di procedere. NON ANCORA COLLAUDATA su paziente reale.

13 LUGLIO 2026 (sessione pomeridiana/serale) — Fix regime energetico
(commit 878cb60), P65 scan storico Git, P67 T1/T3, protocollo
fonte-di-verità in CLAUDE.md, P72 self-hosting CDN. Nessun modello
richiesto per T1/scan/protocollo, Sonnet Bassa per P72, Opus (High,
Thinking ON) per il fix regime:

  Fix regime energetico (commit 878cb60) — bug: il target mostrato sopra
  lo slider regime (ancorato a `window._tdeeRegime`, metodo MET additivo)
  e il risultato di `calcolaMacros()` (che ricalcolava un proprio TDEE
  con MB×LAF) potevano divergere (es. 1806 vs 1441 kcal). Tre fix:
  1) `calcolaMacros` usa ora lo stesso TDEE/MB ancorati allo slider;
  2) le kcal digitate manualmente non vengono più riscritte con
  l'arrotondamento al punto percentuale; 3) `ricalcolaLAF` sincronizza
  `_macrosPaziente` con l'oggetto db aggiornato. Verificato con
  `node --check` sul blocco script.

  P65 — scan storico Git (460 commit) per segreti prima di rendere il
  repo privato: nessuna chiave reale trovata (solo placeholder UI
  `sk-ant-...`), nessuna service_role/AWS key, nessun `.env` committato,
  il file locale `password api keys.txt` non è mai stato tracciato.
  Repo pronto per essere reso privato; resta da decidere GitHub a
  pagamento vs migrazione a Vercel (P51).

  P67 — T1 chiusa: regione Supabase confermata `eu-west-1` (UE), nessuna
  migrazione necessaria. Prodotta la bozza tecnica dei flussi di dati
  (mappa dati/finalità/basi giuridiche/responsabili esterni/diritti
  interessato) per T3, da consegnare al consulente — non è un'informativa
  definitiva, generarla come tale è stato rifiutato anche su richiesta
  esplicita di Fabrizio (dati sanitari, rischio di falsa impressione di
  completezza). T2 (modello dati consensi + gate) SOSPESA su richiesta
  di Fabrizio: nessuna raccolta consensi strutturata mai esistita finora,
  e se NutriGest diventa multi-tenant (P53) ogni nutrizionista cliente
  resterebbe verosimilmente titolare autonomo dei propri consensi — il
  software potrebbe non avere alcun obbligo di tracciarli. Non si
  implementa finché un consulente non conferma la necessità.

  Protocollo fonte-di-verità (CLAUDE.md) — formalizzato dopo un incidente
  reale nella stessa sessione: due modifiche (Roadmap P67, CLAUDE.md
  stesso) erano state preparate correttamente ma MAI arrivate su GitHub
  nonostante commit+push riusciti, perché consegnate da una cartella di
  lavoro locale diversa da quella editata — un errore di disciplina
  nella sessione Claude, non un problema Git né un errore di Fabrizio.
  Scoperto grazie al controllo di integrità prima di procedere con P72
  (verifica contenuto, non solo conteggio righe). Nessun dato perso:
  richiesto un backup locale completo (`nutrigest_BACKUP`, 187 file con
  `.git`) prima di correggere, poi le modifiche sono state riapplicate
  sul contenuto reale scaricato da GitHub, non da copie locali obsolete.
  Aggiunta in CLAUDE.md la regola di lavorare sempre in un'unica cartella
  per sessione e di verificare il contenuto (non solo la lunghezza) prima
  di ogni consegna.

  Riordino Roadmap (stessa sessione, su richiesta di Fabrizio): le 9
  voci completamente chiuse che erano rimaste mescolate alle sezioni
  attive (P106, P68, P69, P105, P72, P59, P60, P55, P111) sono state
  spostate nell'ARCHIVIO in fondo al file — nessun contenuto eliminato,
  solo riposizionato; verificato che ogni voce esista esattamente una
  volta. Restano nelle sezioni attive P63 e P66 perché chiuse solo in
  parte (portano residui aperti: InBody per P63, Fase 2 + commit di
  chiusura per P66). Contestualmente allineata P111: risultava "Da fare"
  in Roadmap nonostante fosse chiusa e documentata (commit 737b790,
  sessione serale) — scheda aggiornata a chiusa e archiviata.

  P72 — self-hosting Chart.js 4.4.1 e jsPDF 2.5.1 al posto del CDN
  cdnjs.cloudflare.com (irraggiungibile dal sandbox, 403, stesso blocco
  già visto il 9 luglio). Le stesse identiche versioni scaricate via npm
  registry (dominio raggiungibile), verificate per dimensione, hash
  sha384 e stringa di versione dichiarata nel file. Nessun plugin extra
  in uso (niente chartjs-plugin-*/jspdf-autotable) quindi i due file
  bastano da soli. File in `vendor/chart.umd.min.js` e
  `vendor/jspdf.umd.min.js`, tag `<script>` aggiornati. Il problema SRI
  (P72 originaria) diventa non-applicabile: niente più terze parti a
  runtime per queste due librerie.

13 LUGLIO 2026 (sessione notturna) — P107 verificata e bloccata (Leaked
Password Protection), nessun codice toccato:

  P107 — tentata attivazione del toggle "Prevent use of leaked passwords"
  in Supabase → Authentication → Sign In / Providers → Email. Dashboard
  mostra esplicitamente "Only available on Pro plan and above": la
  feature richiede l'upgrade a Supabase Pro, non attivabile sul piano
  attuale. Non è una svista di configurazione né un bug: limite del
  piano tariffario, confermato dallo screenshot della dashboard. Voce
  spostata da "Da fare" a "Bloccata — da fare quando si passa a Supabase
  Pro" in Roadmap. Nessun impatto su codice o produzione.


13 LUGLIO 2026 (sessione notturna) — P106 chiusa (blindatura
`rls_auto_enable()`), operazione SQL diretta su Supabase, nessun commit
Git (nessuna riga di `index.html` coinvolta):

  P106 — la funzione `public.rls_auto_enable()` (SECURITY DEFINER)
  risultava eseguibile da `public`/`authenticated` senza restrizioni
  (2 warning Security Advisor, visti 12 lug 2026). Approccio (b) DROP
  FUNCTION tentato per primo (RLS ormai stabile su tutte le tabelle
  sync, sembrava codice ormai inerte) ma **fallito con errore Postgres
  `2BP01`**: un **event trigger attivo `ensure_rls`** (su evento
  `ddl_command_end`) dipende dalla funzione e la richiama in automatico
  ogni volta che viene creata una nuova tabella in `public`, eseguendo
  `alter table ... enable row level security` sulla tabella appena
  creata. Ispezionato il codice sorgente della funzione (`prosrc`) per
  confermare: loop su `pg_event_trigger_ddl_commands()`, filtro su
  `CREATE TABLE`/`CREATE TABLE AS`/`SELECT INTO` in schema `public`,
  RLS accesa in automatico con log (`RAISE LOG 'rls_auto_enable:
  enabled RLS on %'`). Eliminarla avrebbe disattivato silenziosamente
  questo automatismo, lasciando ogni tabella futura scoperta fino a
  intervento manuale — rischio maggiore del warning originale.
  Applicata quindi la soluzione (a) **REVOKE**, con un secondo
  irrobustimento per il warning gemello (search_path mutabile):
  ```sql
  REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM PUBLIC;
  REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM anon;
  REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM authenticated;
  ALTER FUNCTION public.rls_auto_enable() SET search_path = pg_catalog, public;
  ```
  Verificato sul campo con tabella usa-e-getta (`_test_rls_p106`)
  creata DOPO la revoca dei permessi: `relrowsecurity = true` confermato
  in `pg_class`, quindi l'automatismo del trigger funziona ancora
  (event trigger non passa dai permessi EXECUTE dell'utente) — porta
  manuale chiusa, rete di sicurezza automatica intatta. Tabella di test
  rimossa subito dopo. Nessun file applicativo modificato.


13 LUGLIO 2026 (sessione serale) — P111 chiusa (chiarezza UI medie
settimanali su piano parziale), commit `737b790`:

  P111 — origine: Fabrizio segnala macros "assurdi" (115 kcal per un
  pasto pollo+pasta) in un piano di test con un solo pasto compilato su
  6 giorni. Verificato: nessun bug di calcolo, `calcolaMacrosPiano`
  divide correttamente per il totale dei giorni dell'array (`n =
  giornalieri.length`), ma la UI non comunicava che la media fosse su
  un piano incompleto. Soluzione minima secondo scheda (Sonnet,
  Low/Medium, Thinking OFF, L1): aggiunto calcolo di
  `giorniCompilati`/`giorniTotali`/`pianoParziale` dentro
  `calcolaMacrosPiano` (giorno "compilato" = almeno un pasto con
  kcal > 0 su prime scelte o ponderata), **senza alterare in alcun modo
  il calcolo esistente della media** (resta diviso per il totale dei
  giorni, `n`, come prima). In `renderBadgeMacrosReali`: etichetta
  compatta "(parziale: N/M gg)" accanto al titolo del badge e un
  avviso testuale giallo quando `pianoParziale === true` — "Piano
  parziale: N di M giorni compilati. La media è comunque calcolata su
  M giorni, quindi i valori sotto sono sottostimati finché non
  completi il piano." Verificato con `node --check` su tutti gli
  script inline e con test funzionale mirato (piano 6 giorni/1
  compilato → `giorniCompilati:1, pianoParziale:true`; piano 6/6
  compilato → `pianoParziale:false`), nessuna regressione sul calcolo
  della media.


barcode via Open Food Facts), modello Opus/Fable (Max, Thinking ON) per
l'integrazione e il flusso di conferma, Sonnet per la UI camera, commit
`689cfd8`, confermata funzionante in produzione da Fabrizio (incluso su
Safari/iPhone, piattaforma dichiarata maggioritaria):

  P110 — scanner barcode (sezione "Alimenti"):
  1) Pulsante "📷 Scansiona barcode" nell'header di `#page-alimenti`,
     accanto a "+ Nuovo alimento" → `apriScannerBarcode()`.
  2) Modale dedicato `mo-barcode`: video con mirino, stato testuale,
     campo di inserimento manuale del codice (fallback sempre disponibile,
     anche senza camera o offline). Lettura a due percorsi: `BarcodeDetector`
     nativo se presente (Chrome/Android), altrimenti libreria ZXing caricata
     da CDN jsdelivr (versione pinnata 0.21.3) al primo utilizzo — copre
     Safari/iPhone e Firefox. La camera si ferma sempre alla chiusura del
     modale (X automatica inclusa), niente stream orfani.
  3) Barcode trovato → `_barcodeTrovato()`: prima dedup contro
     `CATALOGO_ALIMENTI` (stesso barcode già presente → niente doppione,
     notifica e filtro sulla lista sull'alimento esistente); altrimenti
     fetch a `world.openfoodfacts.org/api/v2/product/{barcode}.json`
     (timeout 12s, nessuna chiave API).
  4) Prodotto trovato → `_bcPrecompilaForm()`: riapre il form di P108
     (`mo-alim-custom`) con nome+brand, kcal/P/C/G per 100g (conversione
     kJ→kcal se manca il valore diretto), grammatura da porzione se
     disponibile, e un box informativo con il barcode che invita a
     verificare i valori sull'etichetta. **Nessun auto-salvataggio**:
     l'utente conferma o corregge da `salvaAlimentoCustom()` come un
     alimento manuale qualunque, poi Conferma per scrivere davvero.
  5) Prodotto assente da Open Food Facts o servizio irraggiungibile →
     messaggi dedicati (`_bcProdottoNonTrovato`, errore di rete/timeout)
     che non bloccano il flusso: nel primo caso il form si apre comunque
     vuoto con il barcode agganciato (utile per il dedup alla prossima
     scansione), nel secondo si invita a riprovare o inserire a mano.
  6) Il record salvato nasce con `fonte:'off'` e `barcode` valorizzato
     (badge "Da barcode", già previsto da P108 fase 1) — vive SOLO nel
     database di NutriGest da quel momento: Open Food Facts è un
     rubinetto una-tantum in lettura, mai una dipendenza runtime, quindi
     un piano già generato non muta se OFF cambia o è irraggiungibile in
     futuro. Nuovo filtro fonte "Solo da barcode" nella pagina Alimenti.
  Verifica: `node --check` pulito su tutti gli script inline; test
  unitario del parsing Open Food Facts sui casi limite (nome IT/EN, brand
  già contenuto nel nome, solo kJ senza kcal, nutrimenti mancanti, prodotto
  vuoto). Con questa chiusura, l'intero blocco P108/P109/P110 (catalogo
  alimenti unico, riempimento mirato CREA-INRAN, scanner barcode) è
  completo.


13 LUGLIO 2026 (sessione serale) — P108 fase 1 chiusa (sezione "Alimenti":
catalogo unico con lista/ricerca/filtri, campo allergeni, archivia invece
di elimina), modello Opus (High, Thinking ON), confermata funzionante in
produzione da Fabrizio:

  P108 fase 1 — sezione "Alimenti" (menu di sinistra, indipendente dal
  paziente):
  1) Nuova voce nav "Alimenti" → `#page-alimenti` + `renderAlimentiPage()`,
     agganciata a `goTo('alimenti')`. Prima la gestione degli alimenti
     custom viveva SOLO dentro le preferenze-cibi del singolo paziente
     (`al-editor`, `_alStato=p.alimenti`) — non esisteva una vista
     indipendente sull'intero catalogo.
  2) Lista con ricerca (nome), filtro categoria (popolato dinamicamente
     dalle categorie presenti in `CATALOGO_ALIMENTI`), filtro fonte
     (Base CREA-INRAN / Personalizzati), filtro stato (Attivi/Archiviati/
     Tutti). Ogni riga: nome, badge fonte, categoria/grammatura, macros/
     100g, chip allergeni. Alimenti base in sola lettura (🔒), personalizzati
     con azioni Modifica/Rinomina/Archivia.
  3) Campo **allergeni** aggiunto al record (`allergeni:[]`, chip separate
     da virgola nel form `mo-alim-custom`, riusata dalla Fase 0/P82) e letto/
     scritto in entrambi i rami di `salvaAlimentoCustom` (aggiunta e
     modifica). Non agganciato al validatore semaforo/P61 — resta un campo
     informativo del record, non un input di validazione clinica (fuori
     scope dichiarato di questa fase).
  4) **Archivia invece di elimina secco** (coerente con l'archiviazione
     pazienti già in app): `archiviaAlimentoCustom(nome)` imposta
     `attivo:false`, rimuove l'alimento dalle proiezioni runtime
     (`ALIMENTI[cat].items`, `CREA_ALIMENTI[nome]`) così sparisce dai
     picker dei NUOVI piani, ma il record resta indicizzato in
     `CATALOGO_ALIMENTI` → `risolviAlimento()` continua a trovarlo →
     `getValoriCREA()` continua a restituirne i macros per piani/ricette
     GIÀ esistenti che lo referenziano. `ripristinaAlimentoCustom(nome)`
     inverte l'operazione. `caricaAlimentiCustom()` (P108 fase 0) adattata:
     indicizza SEMPRE nel catalogo, ma proietta nei picker legacy solo se
     `attivo!==false`.
  5) `eliminaAlimentoCustom` (P82, elimina a riferimenti zero) resta
     invariata e coesiste: elimina per chi vuole liberarsi definitivamente
     di un alimento mai usato; archivia per chi vuole nasconderlo dai
     nuovi piani senza perdere lo storico.
  Verifica: controllo sintattico (`node --check`) su tutti gli script
  inline del file; conferma a mano che `getValoriCREA`→`risolviAlimento`
  passa dal catalogo (non da `CREA_ALIMENTI` diretto), quindi l'invariante
  "un archiviato mantiene i macros nei piani esistenti" tiene anche dopo
  la rimozione da `CREA_ALIMENTI`. Testato in produzione da Fabrizio.


CREA-INRAN per alimenti privi di macros), modello Opus/Fable (Max/High,
Thinking ON):

  P108 fase 0 — catalogo unico con id stabile (commit f574bb5):
  1) `CATALOGO_ALIMENTI` (Map id→record) + `_CATALOGO_BY_NOME` (nome→record):
     costruiti al boot da `costruisciCatalogo()`, che avvolge (non sostituisce)
     `ALIMENTI` e `CREA_ALIMENTI` esistenti. Ogni record:
     `{id, nome, categoriaSem, categoriaFunz, gDefault, gl, per100g, tags,
     barcode, fonte:'crea'|'custom', attivo}`. Id deterministico
     `crea:<slug-nome>` per gli alimenti CREA-INRAN esistenti (stesso id su
     ogni dispositivo, nessun bisogno di sync); `cust:<timestamp>-<random>`
     per i custom, assegnato alla creazione o migrato lazy dal formato
     vecchio. `per100g` CONDIVIDE l'oggetto con `CREA_ALIMENTI[nome]` — una
     sola verità, zero copie divergenti.
  2) `risolviAlimento(rif)` — risoluzione UNICA: id → nome esatto → nome
     case-insensitive → nome canonico (`NOMI_CANONICI`). Sostituisce la
     logica sparsa che prima viveva solo dentro `getValoriCREA`.
  3) `getValoriCREA` riscritta come involucro sottile su `risolviAlimento`:
     firma e fallback INVARIATI (chi la chiama non nota differenza), ma ora
     risolve anche differenze di maiuscole/spazi (184 casi in più risolti
     nei test, prima finivano nel fallback generico).
  4) Alimenti custom: `_migraRecordCustom()` + `_syncAliasLegacy()` — i
     record vecchi `{n,cat,g,kcal,p,c,g100}` vengono migrati lazy al primo
     boot (id assegnato una volta, poi stabile), mantenendo gli alias legacy
     per compatibilità con codice/dispositivi non ancora aggiornati.
     `caricaAlimentiCustom()` riscritta: idempotente, richiamabile dopo ogni
     pull Supabase senza duplicare le proiezioni in `ALIMENTI`/`CREA_ALIMENTI`.
  5) Rinomina/modifica/elimina alimento custom (P82) adattate al nuovo
     modello: col rename ora il NOME cambia ma l'ID resta lo stesso (prima
     l'identità era solo il nome); controllo duplicati alla creazione ora
     GLOBALE via `risolviAlimento` (prima un custom omonimo di un alimento
     base ne sovrascriveva i macros in silenzio — bug reale, chiuso qui).
  Verifica: 36 test su dati reali estratti dal file (equivalenza vecchia/
  nuova `getValoriCREA` su tutti gli alimenti esistenti, zero regressioni;
  migrazione; idempotenza su pull ripetuti; id stabili tra riavvii) +
  controllo sintattico sull'intero JS del file prima del commit.

  P109 — valori nutrizionali per alimenti già a catalogo, prima privi di
  macros (commit 937cf17):
  Scope deciso con Fabrizio: NON import di tutte le tabelle CREA-INRAN (che
  avrebbe imposto scelte cliniche non sue ad altri nutrizionisti futuri
  utenti del prodotto), ma solo colmare i buchi nel catalogo ESISTENTE — 95
  alimenti con categoria/grammatura ma senza kcal/proteine/carboidrati/
  grassi, che fino a ieri cadevano silenziosamente nel fallback generico
  ('Verdura mista'/'Frutta mista'/ecc.) dentro `getValoriCREA`.
  Fonte: tabelle ufficiali CREA (ex INRAN), testo incollato da Fabrizio
  (copiato dal proprio lettore PDF, non OCR). Estrazione con parser dedicato
  ancorato al rapporto fisso kcal↔kj (~4,18) per allineare le colonne anche
  quando un valore intermedio manca dal testo — nel corso della verifica
  sono stati trovati e corretti DUE bug del parser stesso (allineamento che
  in alcuni casi scambiava Acqua con Proteine quando mancava solo la colonna
  Fibra; ambiguità del rapporto kcal/kj su righe con più coppie candidate)
  prima di scrivere qualunque valore nel file. Tutti i 68 valori finali
  verificati con un controllo di plausibilità automatico (somma proteine+
  carboidrati+grassi ≤105g, nessuna proteina >50g fuori dalla frutta a
  guscio) e con doppio controllo manuale sui casi limite.
  Risultato: 68/95 buchi colmati. I 27 restanti (spezie: cannella, curcuma,
  zafferano, timo, origano...; integratori/esotici: spirulina, bacche di
  goji, moringa, berberina, gomasio; voci composte di Fabrizio: pancake
  banana ★, pancake proteici ★) restano vuoti come prima — non sono nelle
  tabelle CREA classiche, nessun valore inventato.
  NOTA POST-RILASCIO: Fabrizio ha segnalato macros apparentemente assurdi in
  un piano di test (115 kcal per pollo+pasta). Verificato: non un bug — la
  tabella "PRIME SCELTE"/"MEDIA PONDERATA" mostra la media SETTIMANALE
  (kcal/6 giorni), e il piano di test aveva un solo pasto compilato su 6
  giorni. Conti rifatti a mano: tutti i 4 valori (kcal, proteine, carboidrati,
  grassi) tornano al decimale. Nessun dato o calcolo modificato. Segnalato
  però un problema di comunicazione UI reale → nuova voce roadmap (vedi
  Roadmap, sezione UX).

12 LUGLIO 2026 (sessione pomeridiana) — P82 chiusa (alimenti custom: gestione
completa con identità sicura) + fix bug post-rilascio + fix separato bug
riapriPiano scoperto durante il test, modello Fable 5 (Alto, Thinking ON):

  P82 — implementazione (commit 8edc873):
  1) `scanRiferimentiAlimento(nome)` — funzione pura, legge db senza scrivere.
     Cerca il nome in: celle piano (match esatto su `a.n`), righe testuali dei
     pasti (`_alimNomeRegex` con confini di parola `(^|[^A-Za-zÀ-ÿ0-9])` per
     evitare falsi positivi tipo "Skyr" su "Skyrim"), ingredienti ricette
     (`r.ing`+`r.nome`), chiavi semaforo profilo paziente (`cat__nome`).
     Ritorna `{tot, dettagli:[{tipo,label,count,ref}]}` per piano/template/
     ricetta/profilo.
  2) 🏷 Rinomina (`rinominaAlimentoCustom`): controllo duplicati (custom,
     CREA_ALIMENTI, database base) → scansione → `confirm()` con conteggio
     riferimenti e primi 10 elencati → se confermato, sostituisce il nome in
     piani/template/piano-in-editor/ricette/profili, poi push mirato di ogni
     struttura toccata (`pushPianoSupabase` per piano, `pushTemplateSupabase`
     per template, `pushRicetteSupabase` se una ricetta è cambiata, `save(id)`
     per ogni paziente col profilo toccato) + `pushAlimentiCustomSupabase`.
  3) ✕ Eliminazione (`eliminaAlimentoCustom`): blocco totale se
     `scanRiferimentiAlimento(nome).tot > 0`, mostra dove è usato invece di
     un errore generico; elimina solo a riferimenti zero.
  4) ✎ Modifica valori (`modificaAlimentoCustom`): riusa il modal esistente
     con nome bloccato (`disabled`), salva `{prev, updated_at}` sul record
     prima di sovrascrivere, bottone "↺ Ripristina valori precedenti" per
     undo singolo (non un log completo — scelta esplicita anti
     over-engineering della scheda CTO).
  5) `_alimCustomMacros(a)` — ponte unico per la mappatura g100↔g (grassi)
     verso `CREA_ALIMENTI`, usato in caricamento/aggiunta/modifica (elimina
     la duplicazione della Scoperta #12).
  Verificato: `node --check` sul blocco script + 16 asserzioni Node mirate
  (regex confini parola/accentate, scanner multi-fonte con db stub 4 fonti,
  ponte macros, replace preservando "Skyrim" non toccato da rename "Skyr").

  BUG POST-RILASCIO (stessa sessione, scoperto dal test reale di Fabrizio):
  rinomina ed eliminazione non producevano alcun effetto né alcun messaggio
  (né alert né confirm); la ✎ modifica valori invece funzionava. Causa
  (commit fix 8ac585e): `pianoJSON` nel DB è salvato come STRINGA
  (`JSON.stringify`, confermato leggendo `riapriPiano`/`applicaTemplate`
  che fanno `JSON.parse(x.pianoJSON)` prima di leggerlo), ma
  `scanRiferimentiAlimento` passava `pl.pianoJSON` grezzo a
  `_scanGiorniPerNome`, che ci faceva `.forEach()` sopra — `TypeError:
  giorni.forEach is not a function` su una stringa, non gestito, interrotto
  prima di qualsiasi `alert`/`confirm`. Poiché `modificaAlimentoCustom` non
  chiama lo scanner, non era toccata dal bug — da qui il sintomo "solo la
  matita funziona". Fix: nuovo normalizzatore `_alimGiorniDaPiano(pj)` —
  parsa la stringa (try/catch → `[]` se corrotta), supporta anche il
  formato `{giorni:[...]}`, usato da `scanRiferimentiAlimento` per piani e
  template; la rinomina ri-serializza con `JSON.stringify(giorni)` dopo la
  mutazione (altrimenti avrebbe salvato un array dove il resto del codice
  si aspetta una stringa). Verificato con 9 asserzioni Node che riproducono
  la struttura dati reale (pianoJSON come stringa) e il crash esatto,
  risolto. Confermato funzionante in produzione da Fabrizio dopo il fix.

  FIX SEPARATO — bug riapriPiano (non legato a P82, scoperto da screenshot
  durante lo stesso ciclo di test; commit 259d787): selezionando un
  paziente nel generatore e aprendo lo storico rapido/alimentazione
  salvata, si apriva sempre l'ultimo piano salvato in assoluto (Stacchio
  Mangieri) invece di quello del paziente selezionato (Terenzio Ruggieri);
  lo storico piani completo invece funzionava correttamente. Causa:
  `riapriPiano(pazId, idx)` indicizza `db.piani[idx]` sull'array GLOBALE
  di tutti i pazienti. I due chiamanti calcolavano `idx` su basi diverse:
  lo storico completo (riga ~10858) usa `db.piani.indexOf(pl)` — indice
  globale corretto; lo storico rapido nel generatore (riga ~10108) usava
  `(numero piani del paziente) - 1 - i` — indice RELATIVO al paziente
  filtrato, passato però a una funzione che si aspetta l'indice globale.
  Fix: lo storico rapido ora usa anch'esso `db.piani.indexOf(pl)` (stessa
  logica del chiamante che già funzionava, una sola fonte). Aggiunto anche
  un guardrail difensivo in `riapriPiano`: se `piano.pazienteId !== pazId`
  atteso, invece di montare il piano sbagliato in silenzio, recupera il
  piano più recente del paziente atteso (o avvisa se non ne esiste
  nessuno). Verificato con 4 asserzioni Node che riproducono lo scenario
  esatto (Stacchio ultimo salvato, Terenzio selezionato) — il bug si
  manifesta senza la fix e sparisce con essa.

12 LUGLIO 2026 — P105 chiusa (fix sessione anti-RLS 42501), scoperta non
pianificata partita da segnalazione utente (screenshot console browser +
Supabase Advisor), modello Opus (High, Thinking ON):

  Sintomo riportato da Fabrizio: bottone "Sincronizza" falliva con
  `code 42501 — new row violates row-level security policy for table
  "pazienti"` (status 401 in console), pull che tornavano silenziosamente
  0 righe. App di fatto bloccata in "Solo locale".

  Percorso diagnostico (tutto in lettura, nessuna modifica finché non
  confermato) prima di scrivere una riga di codice:
  1) Ipotesi iniziale (poi smentita): policy RLS mancanti su `pazienti`.
     Query `pg_policies` ha mostrato invece `owner_all_pazienti` (ALL,
     USING/WITH CHECK `user_id = auth.uid()`) già presente e corretta,
     insieme alle omologhe su ricette/piani/eventi/entrate.
  2) Ipotesi seconda (poi smentita): colonna `user_id` senza default,
     righe orfane. Query su `information_schema.columns` ha mostrato
     `user_id` con `default auth.uid()` e `NOT NULL` — schema corretto.
  3) Trovate 2 righe su un `user_id` diverso dalle 42 principali —
     ipotesi orfane scartata dopo conferma di Fabrizio: è un secondo
     account suo di test, tenuto volutamente separato (nessuna azione,
     nessun merge, nessuna cancellazione).
  4) Con schema e policy scagionati, la causa doveva essere nel client:
     mappati tutti i punti che leggono/scrivono la sessione
     (`getSessioneSalvata`, `salvaSessione`, `cancellaSessione`,
     `assicuraTokenValido`, `avviaRinnovoTokenPeriodico`) e i 3 call-site
     di scrittura (`syncNow`, `sincronizzaTutto`, `_flushDirtyIds` P68).
     Trovato: `getSessioneSalvata()` cancellava `localStorage` non appena
     il token risultava scaduto, perdendo il `refresh_token` necessario al
     rinnovo — dopo di che ogni chiamata successiva vedeva "nessuna
     sessione" e non "sessione da rinnovare". `supaHeaders()` ripiegava
     quindi in silenzio sulla chiave anonima; Supabase riceveva
     `auth.uid()` NULL; la RLS (giustamente) respingeva la scrittura.
     Concausa: `sincronizzaTutto()` (il bottone realmente premuto da
     Fabrizio) non chiamava affatto `assicuraTokenValido()` prima di
     scrivere — unica tra le tre funzioni di sync a non farlo — e le
     altre due ne ignoravano comunque l'esito (`await` senza controllo
     del valore di ritorno, sync proseguiva anche a rinnovo fallito).
  5) Confermato empiricamente da Fabrizio prima di procedere: uscire e
     rientrare dall'app (sessione fresca) riporta il sync verde —
     diagnosi validata al 100% prima di scrivere il fix.

  d32f6aa — fix: sessione non più distruttiva + guard anti-scrittura
    anonima. `getSessioneSalvata()` su token scaduto ritorna `null` ma
    NON cancella più il record da `localStorage` (il refresh_token
    sopravvive per il rinnovo; cancellato solo dal logout esplicito
    `cancellaSessione`). Nuova funzione `_garantiscoSessionePerSync()`:
    chiama `assicuraTokenValido()`, e se il rinnovo fallisce avvisa
    l'utente ("Sessione scaduta — esci e rientra per sincronizzare") e
    ferma la chiamata invece di proseguire in anonimo. `syncNow`,
    `sincronizzaTutto` e `_flushDirtyIds` (quest'ultimo libera
    correttamente `window._syncInFlight` se si ferma) ora passano dal
    guard invece del vecchio `assicuraTokenValido()` non verificato.
    Lasciato invariato l'unico altro punto rimasto
    (`_p69RisolviRicarica`, una LETTURA in risoluzione conflitti: da
    anonimo tornerebbe zero righe, non un 42501 — il guard lì non serve).
    Verificato: `node --check` sul blocco script (17.651 righe, sintassi
    valida dopo le 5 modifiche) + 9 asserzioni mirate in Node (sessione
    scaduta non cancellata / refresh_token preservato / sessione valida
    letta correttamente / guard ritorna false e avvisa se il rinnovo
    fallisce / guard ritorna true senza falsi allarmi se la sessione è
    valida), tutte verdi. Confermato a mano da Fabrizio dopo il commit:
    sync torna verde con normale uscita/rientro.

  Nota per P66c: la sua precondizione ("qualche giorno di uso stabile in
  produzione col proxy AI") ora è finalmente osservabile — prima di
  questo fix il sync si rompeva in silenzio ogni ~1h e avrebbe mascherato
  eventuali fallback anomali del proxy nello stesso identico modo.

  Residui aperti dallo stesso Security Advisor Supabase (stessa
  sessione, non ancora eseguiti — vedi P106/P107 in Roadmap):
  la funzione `public.rls_auto_enable()` (SECURITY DEFINER) risulta
  eseguibile da `public` e da utenti signed-in senza restrizioni (2
  warning) — è la funzione che in passato ha acceso la RLS in autonomia
  sulle tabelle; da blindare (REVOKE EXECUTE) o rimuovere (DROP), a
  decisione di Fabrizio. Leaked Password Protection risulta disabilitata
  (1 info) — toggle manuale in dashboard Supabase.

9 LUGLIO 2026 (sessione 2) — P55 chiusa (sorgente unica target macros) +
  tentativo P72 rimandato:

  1) P55 — `getTargetAttivi(p)`, sorgente unica dei target macros (commit
    85b18ea): l'audit di implementazione ha trovato 6 sedi che ricalcolavano
    i target per conto proprio (non 2 come stimato in roadmap), già
    divergenti tra loro: `costruisciContestoPaziente` onorava i g/kg
    personalizzati ma ignorava FFM/BMI; `_aggiornaAnteprimaCiclizzazione`,
    il box macros del generatore, `calcolaTargetsCiclizzazione` e
    `costruisciPrompt` avevano la logica FFM/BMI ma 1.8/0.9 hardcoded
    (ignoravano i g/kg custom); `_setupPianoTargets` usava solo il peso,
    mai la FFM (terza variante semantica). Un paziente con BMI≥25, InBody
    e g/kg personalizzati poteva ricevere fino a 3 risultati diversi a
    seconda della funzione. Estratta `getTargetAttivi(p)`: priorità (1)
    target salvato dal medico (`_getActiveMacrosTarget`, vince il più
    recente tra FX/TDEE) → fonte 'fx'/'tdee'; (2) fallback canonico
    unificato (riferimento FFM se BMI≥25 e InBody presente altrimenti
    peso, rispettando `p.rifCalcolo`; g/kg personalizzati `p.proteine_gkg`/
    `p.grassi_gkg` default 1.8/0.9; kcal = TDEE + offset regime) → fonte
    'fallback'. Le 6 sedi ora consumano tutte questa funzione. Il blocco
    generazione senza target (BUG3 STEP2) resta bloccante come da
    comportamento esistente; `costruisciPrompt` mostra ora un avviso
    visibile via notif() (non solo console.log) quando cade nel fallback,
    invece del semplice log. 24 test unitari/di coerenza in JSDOM (P78):
    priorità fx/tdee, fallback FFM vs peso, g/kg custom, coerenza tra
    tutti i consumer sullo stesso paziente — tutti pass. Modello: Fable 5
    Alto, Thinking ON (tocca i target clinici P/C/G). Autonomia L0 — le
    tre decisioni di semantica (superset FFM+g/kg custom nel fallback,
    mantenere il blocco invece di sola conferma, ambito dei test)
    confermate da Fabrizio prima di scrivere codice.

  2) P72 — tentativo SRI CDN, rimandato (nessun commit): obiettivo era
    aggiungere `integrity`+`crossorigin` ai due tag `<script>` CDN
    (Chart.js 4.4.1, jsPDF 2.5.1). Bloccato da un limite d'ambiente:
    `cdnjs.cloudflare.com` non è raggiungibile dalla rete del sandbox
    (403 dal proxy egress), e il tool di web fetch restituisce i file JS
    come dato binario opaco, non hashabile localmente con openssl/node.
    Scartata l'opzione di copiare un hash "riportato" da una ricerca web:
    esiste un bug noto e documentato (GitHub cdnjs/cdnjs discussion
    #14124) per cui l'hash SRI pubblicato sul sito cdnjs a volte non
    combacia col file realmente servito dal CDN — un `integrity`
    sbagliato blocca silenziosamente lo script in produzione, rischio
    giudicato peggiore del rimandare. Nessun codice modificato. Deciso
    con Fabrizio: rimandare, riprendere con hash generato da un ambiente
    con accesso di rete pieno o passando a self-hosting/jsDelivr.

9 LUGLIO 2026 — P69 conflitti multi-dispositivo (updated_at), commit eb52ece,
  modello Fable 5 Ragionamento Attivo Alto, autonomia L0 (tocca il sync e
  l'integrità dati multi-dispositivo). Con P68 chiuso, il push per-id ora
  premette un pre-check: `SELECT id,updated_at` dei soli id paziente sporchi,
  confrontati con una baseline locale (`p69Baseline` in localStorage,
  aggiornata a ogni pull e a ogni push riuscito — pull completo, sync
  completa e push per-id). Tre esiti: record invariato → push normale;
  modificato su un altro dispositivo (remoto più recente della baseline) →
  push sospeso, record marcato "pending" (esclude i re-arm del debounce da
  riaprire il dialogo), si apre il dialogo a tre vie (ricarica dal cloud /
  esporta le mie copie poi ricarica / sovrascrivi consapevole — le mie
  vincono); assente sul server con baseline nota → eliminato altrove, non
  resuscitato (rispetta il tombstone P64), notifica non bloccante. Nessun
  merge per-campo: il record resta un blob (onestà architetturale, coerente
  con P64). Meta-record esclusi dal pre-check, restano last-write-wins.
  Fail-open: un pre-check di rete fallito non blocca mai un salvataggio —
  il caso peggiore torna al last-write-wins pre-P69, mai peggio. Pulizia
  baseline sulla cancellazione paziente (evita voci stale).
  Verificato: sintassi (node -e new Function sul blocco script) + JSDOM a
  pagina completa, 35 asserzioni (baseline set/load/drop, classificazione
  modified/deleted/safe su casi reali inclusi record nuovo mai sincronizzato,
  fail-open su errore server, forceOverwrite che salta il pre-check,
  rendering del dialogo con anti-duplicazione, resolver sovrascrivi che
  ripristina correttamente dirty/pending/force).



  1) P68 parte 1 — meccanismo (commit 5487754), modello Fable 5 Ragionamento
    Attivo Alto, autonomia L0 (tocca il percorso di persistenza dati pazienti,
    zero iniziativa oltre lo scritto). Risolta la SOLUZIONE OTTIMIZZATA della
    roadmap: `save()` a 47 call-site, molti dei quali non sapevano quale
    paziente avessero toccato — istruirli tutti in un colpo rischiava il bug
    opposto (modifiche non pushate, perdita dati silenziosa, peggiore del
    problema di partenza). Soluzione: `save(pazId?)` retro-compatibile.
    Senza argomento: comportamento storico invariato, byte per byte (saveLocal
    + pushToSheets completo) — così i call-site non ancora migrati continuano
    a funzionare identici. Con argomento: saveLocal immediato, id aggiunto a
    `window._dirtyIds` (Set), `_syncPendingFail` armato subito (la guardia
    beforeunload copre la finestra tra modifica locale e conferma cloud),
    debounce 2s che coalesce raffiche di save() ravvicinate in un solo flush
    (`_flushDirtyIds`). Il flush pusha SOLO le righe sporche via
    `_pushRigaPerId` (una POST per id), rimuove ogni id dal set SOLO a
    conferma 2xx per-id — un fallimento non azzera gli altri, restano nel set
    per il prossimo tentativo. Rispetta `_syncInFlight`: se un push completo
    (o un altro flush) è già in corso, si riprogramma senza perdere id. I 4
    meta-record (`meta_collections`, `__alimenti_custom`,
    `__modelli_rotazione`, `__concetti_educativi`) sono id sporchi normali,
    stesso `_pushRigaPerId` — nessuna funzione dedicata separata. Un id
    sporco senza riga locale (eliminato dopo la marcatura) viene saltato
    senza POST: nessuna resurrezione, il tombstone P64 resta l'unico
    gestore dell'eliminazione. Un push completo riuscito svuota comunque
    tutto il dirty set (lo ha già coperto). Telemetria temporanea
    `p68SaveAnon` in localStorage (retention 30gg, chiamante loggato in
    console) per censire i save() anonimi rimasti da migrare.
    `pushAlimentiCustomSupabase` ora ritorna un booleano esplicito (prima
    ignorava l'esito): serviva al reset per-id solo a 2xx.
    Verificato: sintassi (node -e new Function sul blocco script, 17.409
    righe) + JSDOM a pagina completa, 7 gruppi/21 asserzioni (comportamento
    storico invariato + telemetria, marcatura senza chiamate di rete,
    coalescenza raffica con un paziente non toccato mai pushato, fallimento
    500 selettivo che lascia nel set solo l'id fallito, meta-record con
    merge tombstone preservato, id fantasma saltato senza POST, flush
    rinviato sotto lock che non perde l'id).

  2) P68 parte 2 — migrazione call-site (commit 97f0d53), modello Sonnet 4.6
    Media, autonomia L1 (micro-refactor nei call-site toccati, nessuna
    decisione clinica). Migrati 44 dei 47 call-site storici da save()
    anonimo a save(id), ognuno verificato leggendo il contesto della
    funzione per identificare l'oggetto realmente in scope (non per
    posizione nel file): salvaPaz e pd.id; tutta la routine giornaliera (5
    funzioni); aggiustamenti macros (2); note cliniche (3, inclusa
    saveNote); resetSemaforoAuto; FX/riepilogo chiamata (4 funzioni,
    incluse le domande aperte); ragionamento clinico (3, entrambi i rami di
    salvaRagionamento + cancellaSavedRag); salvaAnalisi (deriva p da
    currentPazId, prima non lo leggeva affatto); toggleCalcoloIncluso;
    mostraDiffAnalisi (p è parametro); gruppi clinici (3: applica +
    suggerisci, entrambi i rami); pesi intermedi (2); slot TDEE (2);
    salvaCalcoloMacros; salvaRegolePiano; frutta stile (chiusura con p
    esterno); inbody (salva + elimina); salvaConcettiAllegati (paziente);
    archiviaPaz/ripristinaPaz (id esplicito passato, non currentPazId — punto
    di attenzione: sono le uniche due funzioni dove il paziente toccato può
    differire da quello aperto in UI). setDisp → save(META_KEY), non un id
    paziente (db.disponibilita vive nel meta record). Le 5 funzioni concetti
    (upload/rimuovi immagine, riscrivi, salva, nuovo, elimina) →
    save(_CONCETTI_META_KEY). Lasciati anonimi apposta (push completo
    corretto, non dimenticanza): importa() (sostituzione massiva del db) ed
    eliminaDefinitivamentePaz (deve propagare rimozione + tombstone P64 in
    un solo push completo, non un id sporco isolato).
    Verificato: sintassi invariata sul blocco script dopo tutte le
    sostituzioni + seconda suite JSDOM dedicata ai call-site reali (non solo
    al meccanismo grezzo), 4 gruppi/10 asserzioni: archiviaPaz('paz2') marca
    correttamente paz2 anche quando il paziente aperto in UI è un altro
    (catturava un bug plausibile — usare currentPazId invece dell'id
    passato); setDisp marca META_KEY e mai un id paziente; save() anonimo
    continua a fare push completo di tutti i pazienti dopo la migrazione
    (nessuna regressione su importa/eliminazione); due call-site reali
    ravvicinati sullo stesso paziente (deleteNota + saveNote) producono un
    solo POST coalescato, non due.
    Roadmap aggiornata in sessione: P68 chiusa (voce spostata da "Da fare" a
    riferimento nella tabella modello/effort e nel Blocco B); P69 ora la
    condizione "con P68 fatto" è verificata, non più ipotetica — sblocca
    concretamente la sua implementazione; la voce residua sulla coda offline
    (F3, priorità Bassa) riformulata: il dirty-set esiste già in memoria,
    manca solo la sua persistenza su reload + retry con backoff + badge UI.

8 LUGLIO 2026 — P63 conferma con diff per import AI analisi sangue +
P66 Fase 0+1 (client AI unificato + proxy Edge Function):

  1) P63 — Conferma con diff per import AI dei referti, Analisi del sangue
    (commit 8c9e77a), modello Sonnet 4.6 Media, autonomia L1 (componente
    frontend generico guidato da schema, nessuna decisione clinica
    autonoma). Riuso totale dello schema esistente: ANALISI (elenco campi)
    e RANGE_RIF (soglie), zero strutture dati nuove. loadAnalisiSanguePDF
    non scrive più direttamente su p.analisiSangue: l'estrazione popola
    solo staging, poi apre il modal mostraDiffAnalisi — tabella campo→
    attuale→estratto con checkbox per riga (default spuntato), evidenza
    automatica di valori fuori range (interpretaAnalisi) e di delta
    anomalo (>50% dal valore precedente). Conferma applica solo le righe
    spuntate; ogni campo scritto porta provenienza in
    p._analisiMeta[key] = {fonte:'ai-import', data, file}. InBody
    volutamente FUORI SCOPE per questa sessione (Fabrizio ha scelto di
    fare prima solo Analisi del sangue, ~117 campi, il caso con più
    superficie); da estendere in sessione dedicata con lo stesso pattern.
    Validato con smoke test JSDOM sulla pagina COMPLETA (non lo script
    isolato, per evitare falsi negativi da codice di bootstrap che tocca
    elementi DOM assenti in una pagina bare): apertura modal, evidenza
    fuori-range, default-checked, esclusione riga deselezionata, scrittura
    corretta, provenienza salvata, chiusura modal — tutti verdi.

  2) P66 Fase 0 — Client AI unificato aiCall (commit 85fc8cd), modello
    Fable 5 Ragionamento Attivo Alto per contratto+funzione (L0 sul flusso
    generazione piano). Le 15 chiamate dirette ad api.anthropic.com sparse
    nel file (non 8 come stimato nella scheda originaria: testaAntKey, FX,
    ragionamento clinico chat+riassunto, import analisi sangue, gruppi
    clinici, generazione piano, rigenerazione delta, note legacy,
    WhatsApp AI, voce progresso, ricetta AI, import InBody, riscrivi
    concetto, nuovo concetto) unificate in un solo wrapper aiCall(opts):
    fetch, headers, timeout (5 min, AbortController), retry-once su status
    transitori (429/500/502/503/529) e su errori di rete puri (mai su
    timeout, mai su 401/403), log consumi per giorno/tipo in localStorage
    aiUsage (retention 30gg). Registro AI_MODELS: la stringa modello vive
    in un punto solo. Comportamento dei 15 call-site preservato byte per
    byte (stessi model/max_tokens/tools/tool_choice/messages sul flusso
    piano — cache 90gg non toccata, vincolo Scoperta #4 verificato).

  3) P66 Fase 1 — Trasporto proxy Edge Function (stesso commit 85fc8cd
    per il client index.html; deliverable separati ai-proxy-index.ts e
    ai_usage.sql applicati manualmente da Fabrizio su Supabase). aiCall
    ora prova PRIMA il proxy (Edge Function 'ai-proxy', JWT della sessione
    utente, niente più chiave Anthropic nel browser, modello deciso dal
    MODEL_REGISTRY server-side) e ricade AUTOMATICAMENTE sul trasporto
    diretto legacy se: il proxy non è raggiungibile (404/5xx/rete giù),
    la sessione manca o è irrecuperabile, o è attivo il kill-switch
    (localStorage.setItem('aiProxyDisabled','1')). Le risposte del proxy
    passate ad Anthropic portano l'header x-proxy-upstream: la sua ASSENZA
    è il segnale che distingue un errore d'infrastruttura del proxy
    (→ fallback) da un errore API vero tipo 529 (→ retry normale SUL
    proxy, mai fallback). Refresh token gestito internamente
    (_aiTokenPerProxy): se l'access_token è scaduto o il proxy risponde
    401 senza upstream, un tentativo di refresh col refresh_token prima
    di ricadere sul diretto. trasportoDiretto:true forza il legacy nel
    test-chiave di Impostazioni (deve testare LA CHIAVE, non il proxy).
    Validato con 11 test funzionali (fetch mockato, sessioni sintetiche):
    proxy felice con body verificato (niente x-api-key, niente model),
    kill-switch, trasportoDiretto forzato, nessuna sessione, sessione
    scaduta con refresh riuscito, 401-infra→refresh→retry, 404-infra→
    fallback diretto, 529-upstream→retry sul proxy SENZA fallback,
    400-upstream→throw diretto, rete-giù-su-proxy→fallback diretto, log
    usage marcato "(proxy)". Setup lato Fabrizio l'8 lug 2026: tabella
    ai_usage creata via SQL Editor (RLS: solo select per l'utente
    proprietario, insert riservato alla service role della funzione),
    secret ANTHROPIC_API_KEY in Project Settings→Edge Functions→Secrets
    (sezione propria, NON sotto Project Settings→General — punto di
    confusione registrato per sessioni future), funzione ai-proxy
    deployata via editor dashboard (sostituendo per intero il template
    default withSupabase, incompatibile col contratto Deno.serve scritto).
    Verificato in produzione: prima riga reale in ai_usage con
    tipo='concetto', model='claude-sonnet-4-5', status=200,
    input_tokens=292, output_tokens=334 — la catena sessione→JWT→
    proxy→secret→risposta→log è confermata end-to-end, non solo
    raggiungibile. DECISIONE ESPLICITA: GitHub NON collegato a Supabase
    per il deploy delle funzioni (scelta valutata e confermata corretta,
    vedi DECISIONI ARCHITETTURALI). PROSSIMO PASSO (non ancora fatto):
    dopo qualche giorno di uso stabile in produzione, commit di chiusura
    P66 che rimuove il trasporto diretto legacy, la chiave Anthropic dal
    localStorage del browser e il window.prompt di getAnthropicKey — da
    quel commit in poi la chiave non toccherà più nessun browser client.

7 LUGLIO 2026 (sessione serale) — P77 output strutturato generazione piani
(tool-use) + verifica P62 già chiusa:

  1) P77 — Output strutturato per la generazione piani (commit 676927e),
    modello Sonnet 5 Medium (L0 sul contratto AI, come da scheda della
    Roadmap Due — nessuna decisione clinica autonoma, ma il contratto con
    l'AI è una superficie architetturale su cui non si va in autonomia):
    Sostituito testo JSON libero + riparazione con tool-use Anthropic a
    input_schema vincolato, eliminando alla radice la classe di bug "JSON
    malformato/troncato/chiavi impreviste" che parseJSONSicuro tamponava
    solo a valle. Nuove funzioni (subito prima di chiamaGeneraPiano):
    - PIANO_SCHEMA_VERSION = 1 (costante, persistita nel meta piano).
    - _pianoToolSchema(nGiorni): costruisce il tool Anthropic "genera_piano"
      con input_schema che ricalca ESATTAMENTE la forma già consumata da
      _normalizzaPianoNuovo/espandiPiano e letta da validaPiano (P61) —
      giorni→pasti (6 slot)→celle{id,co:enum sx/dx,or,al}→alimenti{n,g,
      cat:enum 9 valori,cl:enum v/a/r}, con minItems/maxItems 1-6 per cella
      e additionalProperties:false. Zero cambi a valle: chi consuma il piano
      espanso non si accorge del cambio di contratto a monte.
    - _pianoMaxTokens(nGiorni): dimensiona il budget token sui giorni
      effettivamente richiesti (1500×n + 1500, cap 16000) — 7 giorni=12000,
      IDENTICO al valore fisso precedente (nessuna regressione di costo);
      il vantaggio si vede sulla chiamata delta (2 giorni=4500 invece del
      6000 fisso di prima).
    - _estraiPianoDaRisposta(data): doppio parser. Percorso primario cerca
      il blocco content[].type==='tool_use' con name 'genera_piano' e
      restituisce input.giorni direttamente (viaSchema:true, zero parsing
      testuale). Se assente (fallback legacy, previsto per la settimana di
      campo secondo la procedura del progetto), cerca il primo blocco
      type==='text', ripulisce eventuali fence markdown e passa ancora per
      parseJSONSicuro come prima di P77 (viaSchema:false) — throw solo se
      non c'è né tool_use né testo utilizzabile.
    Integrazione in chiamaGeneraPiano: l'atteso strutturale
    (_attesoStrutturaPiano) viene calcolato PRIMA della fetch (non più dopo,
    come nel P62 originario) per dimensionare schema e max_tokens sulla
    stessa chiamata, poi riusato come fonte unica nel confronto P62 a valle
    (nessun doppio calcolo). tool_choice forzato su {type:'tool',
    name:'genera_piano'} sulla chiamata principale E su quella delta di
    P62(c) — stesso schema, stesso estrattore, max_tokens sui soli giorni
    mancanti. Meta piano arricchito con schemaVersion e viaSchema (campi
    additivi, per monitorare quanto spesso il fallback legacy scatta in
    campo prima di rimuoverlo).
    VERIFICA ESPLICITA fatta PRIMA di implementare (il rischio più citato
    dall'analisi critica del CTO): _pianoCacheKey (cache 90gg) NON include
    il prompt nell'hash — solo parametri paziente (target, preferenze,
    regime, ciclizzazione) — e la cache salva il piano già espanso. Cambiare
    il contratto AI non ha invalidato nulla: zero picco di costi, contro il
    rischio paventato nella scheda P77 della Roadmap Due.
    Pulizia del blocco FORMATO OUTPUT nel prompt (~35 righe + esempio,
    assorbimento di P43 previsto dall'analisi critica) VOLUTAMENTE RIMANDATA
    al commit di chiusura del fallback legacy: quel testo resta necessario
    finché il doppio parser è attivo, perché è l'unica guida per il
    percorso di fallback testuale. Le regole semantiche del prompt (max 6
    alimenti, equivalenze isocaloriche olio, disposizione default celle)
    restano comunque nel prompt in ogni caso — lo schema garantisce la
    struttura, non la semantica dei valori.
    Suite invariata 61/61 dopo P77 (nessun golden test nuovo aggiunto: è
    infrastruttura del contratto di trasporto, non nuova logica clinica —
    resta coperta indirettamente dai 10 test di struttura di P62, che
    validano la stessa forma piano che P77 ora garantisce a monte). Smoke
    test manuale in sessione (non nel repo): _pianoToolSchema/
    _pianoMaxTokens/_estraiPianoDaRisposta verificati su casi limite (schema
    valido, max_tokens 7gg=12000/2gg=4500/cap 16000/default 7,
    estrazione via tool_use, estrazione fallback legacy con fence+JSON
    riparabile, throw su risposta senza contenuto utilizzabile).

  2) Verifica P62 (nessun commit — sola conferma, stessa sessione): scheda
    dell'analisi critica riletta punto per punto (a,b,c,d) contro il codice
    risultante da P77: stop_reason catturato e mai accettato in silenzio,
    confronto strutturale con _confrontaStrutturaPiano, rigenerazione delta
    che fonde SOLO i giorni mancanti, persistenza stopReason/usage/struttura
    nel meta — tutti e quattro già presenti e funzionanti (chiusi nella
    sessione pomeridiana dello stesso giorno, commit 9b2aa9e, vedi sotto).
    P77 rafforza P62 anziché sostituirla: con tool_choice forzato il
    percorso schema non può più produrre il "formato vecchio" che il ramo
    `!_isNuovoFormato` gestiva — quel ramo resta attivo solo per il fallback
    testuale di P77, coerentemente. Nessuna riga di codice aggiuntiva
    necessaria per P62: la voce era già chiusa, la verifica lo conferma.

7 LUGLIO 2026 (sessione pomeridiana) — P61 validatore clinico post-generazione AI
+ P62 stop accettazione piani troncati:

  1) P61 — Validatore clinico post-generazione (commit ed1e3e9), modello Fable 5
    Ragionamento Attivo Alto per il motore + golden test, Sonnet per il pannello UI
    (autonomia L0 sul motore, L1 sulla UI, come da scheda dell'analisi critica):
    Implementata la SOLUZIONE OTTIMIZZATA del CTO (non l'approccio originario della
    Roadmap Uno), che risolveva due buchi identificati: (a) le righe testuali di
    ricetta — non le celle — sono il rischio massimo, perché non matchano nessuna
    chiave DB e un validatore che le salta dà falso senso di sicurezza; (b) validare
    solo "post-generazione" è tardi, perché il piano si modifica a mano dopo (griglia,
    drag&drop, Pesca ricetta) e ogni modifica può reintrodurre un allergene.
    Funzione pura validaPiano(piano, p) → {violazioni[], copertura, livello}, tre
    esiti per elemento: conforme / violazione (tipo+gravità) / NON VERIFICABILE.
    Gravità a tre livelli: allergene (da regola semaforo grigioScuro con motivazione
    Glutine/Lattosio/Nichel/Low-FODMAP, O da chip/testo libero in p.allergie via
    liste di termini _VALIDA_ALLERGENI_TERMINI) → BLOCCO; rosso semaforo → AVVISO;
    escluso manuale o grigioScuro per patologia (non allergia) → NOTA. Le righe
    ricetta passano PRIMA per uno scan a testo intero contro le liste di pericolo
    (cattura "Vellutata di zucca con crostini" per celiaco, anche senza chiave DB),
    POI per _ngScomponiIngredienti (riuso P33) per il conteggio di copertura: i
    token non riconosciuti finiscono nel contatore "non verificabili", sempre
    mostrato nel badge ("verificati 31/36 elementi — 5 non verificabili") — mai
    dichiarati sicuri implicitamente. Integrazione: un solo hook in
    renderBadge75_20_5 → renderBadgeValidatore, che copre tutti i 15+ punti di
    render/mutazione esistenti senza toccarli singolarmente (post-generazione,
    ogni modifica manuale via _aggiornaPianoBox, navigazione giorni). Badge
    permanente verde/giallo/rosso accanto al badge 75/20/5, con "verificati X/Y
    elementi"; click apre pannello dettagli (apriPannelloValidatore) con lista
    violazioni raggruppate per gravità e bottone "Vai al giorno →" (naviga
    direttamente allo slot). Gate bloccante (validaGateExport) su generaPDF e su
    _ngSalvaPianoManuale: se ci sono blocchi (allergeni), l'azione si ferma e si
    apre il pannello in modalità 'gate' con un campo di override esplicito
    motivato obbligatorio — l'override viene registrato in piano[0]._validaOverride
    (persiste nella cache Supabase, additivo) e legato a una FIRMA delle violazioni
    bloccanti (_validaFirmaBlocchi): se il piano cambia anche di un solo elemento,
    la firma cambia e l'override decade da solo, non si trascina su piani diversi.
    Post-generazione, se il validatore trova blocchi, il pannello si apre da solo
    (non solo il badge) — l'errore va visto subito, non scoperto dopo. Golden test
    (finding F2 dell'analisi critica: "P61 senza golden test è un validatore non
    validato", P78 chiusa il 7 lug come prerequisito pratico): 14 casi in
    test-suite/test/s2-valida-piano.test.js — allergene in cella da regola
    semaforo, allergene da chip testuale senza regola semaforo, allergene dentro
    riga testuale libera (il caso critico "crostini" per celiaco), allergene da
    testo libero p.allergie, rosso→avviso, escluso→nota, grigioScuro per patologia
    (non allergia)→nota (non blocco — distinzione clinica chiave), gerarchia
    blocco>avviso>nota su violazioni miste, piano pulito→ok con copertura 100%,
    riga non verificabile→mai livello ok, riga verificabile→ok, robustezza input
    null/vuoto, matching a parola intera (no falsi positivi tipo "panela"), firma
    override che cambia se cambia il piano.

  2) P62 — Stop all'accettazione silenziosa di piani troncati (commit 9b2aa9e),
    modello Sonnet 5 Medium (L1 — fix mirato al parser/generatore, nessun dato
    clinico nuovo, coerente con la scheda dell'analisi critica):
    Implementata la SOLUZIONE OTTIMIZZATA (non l'approccio difensivo originario:
    "avvisa e rigenera tutto" butta via i giorni buoni già pagati in token).
    (a) stop_reason della risposta Anthropic catturato ad ogni chiamata di
    generazione piano (chiamaGeneraPiano); se 'max_tokens', log esplicito, MAI
    salvataggio silenzioso. (b) Confronto STRUTTURALE tra atteso e ottenuto, non
    solo riparazione testuale: _attesoStrutturaPiano(p) calcola giorni attesi (6,
    o 7 se il regime è chetogenico — stessa logica di costruisciPrompt) e slot
    pasto attivi dal profilo paziente (stessa fonte di _pastiCfg in generaPiano).
    _confrontaStrutturaPiano(pianoEspanso, atteso) verifica giorni mancanti e
    pasti mancanti per giorno, distinguendo correttamente uno slot ASSENTE
    (troncamento — chiave del pasto non esiste nel giorno) da uno slot PRESENTE
    ma con celle vuote (scelta legittima del generatore, non un bug — non va
    segnalato). parseJSONSicuro resta INVARIATO: la sua riparazione cosmetica
    (chiudere parentesi/virgole) non cambia, il controllo strutturale gira DOPO,
    sul piano già espanso. (c) Rigenerazione DELTA: se mancano giorni interi (non
    tutti — altrimenti l'errore è più a monte), _costruisciPromptDelta riusa
    costruisciPrompt e aggiunge un'appendice che vincola l'AI a rispondere SOLO
    con i giorni mancanti nello stesso formato; la risposta viene fusa
    (pianoEspanso.push) nel piano esistente — costo minimo, non rigenera da zero.
    Se il troncamento riguarda solo alcuni SLOT dentro giorni già presenti (non
    giorni interi), niente rigenerazione automatica: notifica esplicita, il
    piano va controllato prima di salvare/PDF. (d) Osservabilità: stop_reason,
    usage (token) ed esito struttura persistiti in pianoEspanso[0].meta (campo
    additivo, retrocompatibile — chi non lo conosce lo ignora), pronto per i
    quota-per-utente di P66 quando arriverà. Golden test: 10 casi in
    test-suite/test/s2-struttura-piano.test.js — nGiorniAttesi 6 vs 7 (cheto),
    slotAttesi solo pasti attivi, pasto disattivato escluso, piano completo→ok,
    giorni mancanti in coda rilevati correttamente, slot mancante dentro giorno
    presente (NON contato come giorno mancante), celle vuote con chiave presente
    (NON falso positivo), piano nullo/vuoto senza eccezioni,
    _costruisciPromptDelta con paziente inesistente. NOTA TECNICA: i test hanno
    richiesto JSON.stringify anziché assert.deepStrictEqual per il confronto
    array (oggetti cross-realm in JSDOM, stesso principio già in
    NOTE PROGETTO/PRINCIPI).

  3) Suite test dopo le due voci: da 51 a 61/61 (37 preesistenti + 14 P61 + 10
    P62), zero regressioni, sintassi validata con lo stesso metodo standard
    (estrazione script + new Function(code)).

7 LUGLIO 2026 — P59 (implementato e revertito) + P60 separatore frutta PDF + P78
suite test automatica:

  1) P59 — marker frutta esteso ai pasti a sole celle, poi REVERTITO (commit
    d3c50e0 → 177dce9):
    Diagnosi: getFruttaMarker/il rendering PDF disegnavano il marker 🍎 solo dentro
    il ramo hasRicette (righe ricetta testuali) sia in measurePasto che in drawPasto;
    uno spuntino fatto di sole celle non mostrava mai il marker nel PDF anche con la
    casella attiva. Prima implementazione (commit d3c50e0): aggiunta una riga
    sintetica frutta (testo "+ frutta" o emoji stagionale) sotto il blocco celle
    quando !hasRicette, riusando getFruttaMarker(pasto, giorni, giornoNome, slotKey,
    paziente, 0). Verificato via screenshot reale (spuntino mattina con cella
    "🍎 Frutta mista 150g" + riga sintetica "+ 🍑" sotto): Fabrizio ha segnalato che
    la riga è ridondante quando la cella è già un alimento-frutta esplicito con
    propria emoji, e genera confusione visiva. Deciso: il marker frutta resta
    agganciato SOLO alle righe ricetta testuali, non alle celle — è una decisione di
    prodotto, non un errore tecnico. Revert completo di measurePasto e drawPasto
    (commit 177dce9): rimossi i blocchi if(!hasRicette){...} aggiunti in entrambe le
    funzioni, comportamento tornato identico a prima di P59.

  2) P60 — separatore "+" attenuato tra ricetta ed emoji frutta stagionale nel PDF
    (commit 17064c8):
    Il testo generico "+ frutta" (stile paziente non stagionale) aveva già un
    separatore naturale; mancava solo nello stile STAGIONALE (emoji), dove testo
    ricetta ed emoji si toccavano senza spazio. Fix: prima di disegnare l'emoji
    stagionale, disegnato un "+" con colore GRIGIO3 (160,160,160 — stesso tono usato
    altrove nel PDF per testo secondario tipo "Alternative:"), poi l'emoji spostata
    della larghezza reale del "+" misurata con measure(). Applicato nel ramo
    ricette testuali di drawPasto; il tentativo di applicarlo anche al blocco celle
    di P59 è stato rimosso insieme al revert di P59 (vedi sopra).

  3) P78 — suite di test automatica minima (commit ba5c109):
    Primo harness di test del repo, cartella test-suite/ + CI GitHub Actions
    (.github/workflows/test.yml, npm ci && npm test su push/PR a main, ~2 min).
    Estrae lo script inline da index.html (test/_extract.js, blocco più lungo tra i
    <script> senza src) e lo carica in JSDOM (test/_loadApp.js) con VirtualConsole
    che silenzia il 'jsdomError' atteso dal codice di init a fine file (es.
    renderPaz() letto a fine script, assume markup HTML statico che nel browser
    reale è già in pagina — non un bug applicativo, limite noto dell'harness,
    documentato nel README della cartella).
    S1 smoke (2 test): sintassi valida (new Function) + caricamento JSDOM senza
    ReferenceError, funzioni chiave presenti su window.
    S2 unit sui puri (31 test) contro il codice REALE, non contro assunzioni —
    durante la scrittura sono emerse e sono state corrette due assunzioni sbagliate:
    (a) confronto oggetti/array con deepStrictEqual falliva cross-realm quando
    l'oggetto è costruito dentro il VM context di JSDOM anche a parità di
    struttura — fix: confronto via JSON.stringify anziché deepStrictEqual quando il
    valore attraversa il confine JSDOM/Node; (b) "Pane o Fette biscottate 40g" in
    _ngParseIngrediente: la regex \s+o\s+.*$ taglia via " o Fette biscottate 40g"
    per intero, INCLUSA la grammatura, quindi l'ingrediente viene scartato per
    mancanza di grammatura — comportamento diverso da quanto assunto in prima
    stesura del test, ora fissato come baseline documentata (rilevante per P61 come
    possibile caso "non verificabile"). Funzioni coperte: getValoriCREA/
    NOMI_CANONICI (fallback categoria, case-insensitive, nessun match → null),
    trovaChiaveAlimento, parseJSONSicuro (riparazione parentesi non chiuse,
    preamboli AI, troncamento a metà stringa → irreparabile per design),
    _ngScomponiIngredienti, applicaRegoloSemaforo (regole cliniche pat-diabete
    testate su "Pane comune"→grigioScuro e "Mela"→celeste; priorità di 'si'/'rosso'
    sul semaforo automatico verificata esplicitamente).
    S3 render-smoke jsPDF (2 test): limitato al prerequisito di libreria (jsPDF
    genera un PDF minimo in Node, window.jspdf iniettabile nello stesso ambiente
    JSDOM dello script). Scope NON esteso a generaPDF() end-to-end: measurePasto/
    drawPasto sono funzioni annidate non esportate dentro _generaPDFSync, la
    generazione fa fetch() di rete per le emoji Twemoji — costruire un fixture
    paziente+piano per un test end-to-end avrebbe il rischio di dare un falso senso
    di sicurezza se il fixture non riflette fedelmente i piani reali (stesso rischio
    segnalato dall'analisi critica per P61). Scelta dichiarata nel README di
    test-suite/, non nascosta: generazione PDF resta verifica MANUALE nel browser
    prima di ogni commit che la tocca, come già per i Pointer Events del drag&drop.
    37/37 test verdi. Prerequisito esplicito per P61 (finding F2 dell'analisi
    critica: "P61 senza golden test è un validatore non validato") — i golden test
    di validaPiano andranno aggiunti in test-suite/test/s2-valida-piano.test.js
    quando la funzione esisterà.


5 LUGLIO 2026 (sessione serale) — BLOCCO 17: ricettario strutturato + stagionalità
generatore + persistenza gruppi clinici + fix root-cause editPaz (documentata 6 lug):

  1) Fix persistenza gruppi clinici (commit decf5ef):
    applicaGruppoClinico spuntava e salvava (fix a54cb14 del 30 giu) ma i SUGGERIMENTI
    del bottone 🔍 vivevano solo nel DOM: cambiando tab o ricaricando sparivano, e non
    c'era memoria di quali fossero già stati applicati. Ora suggerisciGruppiClinici
    salva l'esito in p.gruppiCliniciSuggeriti [{id,nome,motivazione,applicato}] e il
    box è ridisegnato da renderBoxGruppiCliniciSuggeriti(p) dentro renderPdAnalisi;
    applicaGruppoClinico marca voce.applicato, scrive p.checkSemaforo[id]=true,
    sincronizza il checkbox se presente, ricalcola il semaforo e salva.

  2) Fix ROOT-CAUSE editPaz/checkSemaforo (commit 5a0721f):
    Sintomo: le patologie attivate da "Applica gruppo clinico" risultavano azzerate
    riaprendo la scheda paziente. Causa reale: gli id dei checkbox (pat-*, all-*,
    csp-*) sono CONDIVISI tra il vecchio campo testuale p.patologie/p.allergie e
    p.checkSemaforo; editPaz() applicava checkSemaforo PRIMA di setPatologieFromStr/
    setAllergieFromStr, così il campo legacy (spesso vuoto) resettava a false i
    checkbox appena impostati — in silenzio. Fix doppio: (a) in editPaz() i checkbox
    sono popolati da p.checkSemaforo DOPO le due setXFromStr (commento IMPORTANTE nel
    codice); (b) salvaPaz() costruisce il nuovo checkSemaforo con Object.assign a
    partire da quello GIÀ SALVATO del paziente, poi applica lo stato del DOM: gli id
    senza checkbox nel DOM non vengono più persi. Trappola aggiunta al TL;DR.

  3) Sistema attributi strutturati ricette (commit 48805d9):
    Nuovo campo r.attributi = {stagioni[], tempoPrep, profilo[]} SEPARATO da r.tags
    (che resta libero/legacy e fallback slot-pasto per P1). Array vuoto = esplicito
    "nessun vincolo": la ricetta resta candidata per qualunque filtro (qualità mai
    peggiorabile). Dettaglio valori in STRUTTURA DATI.

  4) Editor ricetta riorganizzato + TAG_COMUNI (commit d68bfec):
    Blocco unico in testa con chip per Categoria (multi, coerente P57), Stagione,
    Profilo, Tempo prep (0-5/5-10/10-20/gt20), Tipo (completo/contorno), e 8 TAG
    COMUNI canonici (Proteica, Leggera, Mediterranea, Chetogenica, Antinfiammatoria,
    Ricca di fibre, Comfort food, Batch cooking) che SOSTITUISCONO il campo tag a
    testo libero. Migrazione: _tagComuniTrova() riconosce label e varianti storiche
    ('keto','light','meal prep'...) accendendo il chip; i tag NON riconosciuti restano
    in r.tags al salvataggio (zero perdite). Wiring chip: wireChipGroup/
    wireRadioChipGroup/wireAttrChipGroups; i radio non emettono 'change' su chi si
    deseleziona → riallineare lo stile di tutto il gruppo a ogni cambio. Nella LISTA
    ricettario aggiunto il select "Tutti i tag" (f-ric-tag) accanto a ricerca+categoria.

  5) Ricalcolo automatico kcal/macro ricetta dagli ingredienti (commit 7e2edf1):
    oninput su r-ing → _ricRicalcolaMacroLive (debounce) → _ricCalcolaMacroDaIngredienti:
    riuso di _ngScomponiIngredienti (parser P33) + getCategoriaFunzionale +
    getValoriCREA; somma solo gli ingredienti riconosciuti, SOVRASCRIVE i 4 campi
    (kcal intere, macro a 0.1g), messaggio di esito con conteggio riconosciuti o
    avviso arancione con l'elenco dei non riconosciuti. Scelta deterministica (zero
    chiamate AI, zero costi, coerente con CREA_ALIMENTI del codice).

  6) Stagionalità nel generatore AI con guardia anti-pool-vuoto (commit 66139ec):
    getStagioneCorrente() (mesi: 3-5/6-8/9-11/12-2; override window._stagioneOverride)
    + secondo filtro conservativo in costruisciPrompt() dopo P1: tiene le ricette
    della stagione corrente O senza stagioni (vuoto = tutto l'anno). Guardia: soglia
    max(8, ⅓ del pool post-P1 arrotondato per eccesso) — sotto soglia il pre-filtro
    si DISATTIVA da solo e si torna al pool completo; il suggerimento stagionale
    resta comunque nel prompt come testo. Log console con numeri e stato del filtro.

  7) Riordino drag&drop ricette testuali nel piano (commit ab4d472):
    Handle ⠿ per riga (touch-action:none); Pointer Events con listener su document
    aggiunti SOLO durante il gesto e rimossi a pointerup/pointercancel (_dragState,
    nessun leak). Swap via scambiaRicette(giorno,slot,idxA,idxB) su pasto.ricette +
    _aggiornaPianoBox() + riallineamento window._pdfPiano. Condiviso AI/manuale.
    NOTA TEST: i Pointer Events non sono simulabili in jsdom — verifica solo manuale
    in browser (pattern già noto dalla barra giorni del BLOCCO 16).

  Due commit di servizio "trigger redeploy github pages" (d920c3d, c200806): deploy
  Pages falliti lato infrastruttura GitHub, risolti col commit vuoto (pattern noto).
  Individuati in sessione e RIMANDATI alla roadmap (non implementati, registrati qui
  solo come esito di sessione): marker 🍎 frutta nel PDF non disegnato per spuntini
  composti da sole CELLE (il marker si aggancia solo alla riga ricetta testuale —
  limite già descritto in COMPOSITORE MANUALE) e separatore visivo "+" grigio tra
  testo ricetta ed emoji frutta.
  Righe file: 17.724 → 18.125. Commit finale sessione: ab4d472.

5 LUGLIO 2026 — BLOCCO 16: compositore manuale allineato al generatore AI + fix critico login:

  Fix bug semaforo carne rossa (commit 900bdb3):
    Fettina di cavallo/agnello suggerivano grammature sballate (es. 80g invece di
    ~200g) nel flusso "Aggiungi alternativa". Causa doppia: (1) getCategoriaFunzionale()
    aveva `Array.isArray(ALIMENTI[cat])` sempre falso (la struttura reale è
    {items:[...]}, non un array diretto) — quel ramo di lookup dal database non
    scattava MAI, dead code silenzioso; (2) il fallback a regex testuale non
    includeva "cavallo"/"agnello" tra le parole chiave proteine → classificati come
    'condimento' (fallback 5g, criterio kcal invece di proteine). Fix: corretto il
    check su .items + aggiunte le parole mancanti alla regex (cavallo, agnello,
    fegato, cuore, + vari pesci/molluschi con lo stesso problema latente).

  Copia alimento tra celle via drag&drop (commit 68fce7b):
    Ogni alimento già piazzato in una cella è trascinabile (_ngDragStartCella) per
    copiarlo in un altro pasto dello stesso giorno, riusando lo stesso meccanismo
    del drag dalla libreria (_ngDrop): drop su zona vuota → nuova cella, drop su
    cella esistente → alternativa. L'originale resta (copia, non spostamento).
    Decisione presa con Fabrizio: drag&drop vero (non un menu "copia in→") perché
    già funzionante da iPhone, priorità comunque al desktop.

  Footer compositore manuale allineato al generatore AI (commit ec6d6a6):
    Il compositore manuale aveva solo "Salva piano"/"Scarica PDF". Aggiunto tutto
    il resto già presente nel generatore AI (toggle nutrizionali, promemoria PDF,
    stile frutta, Concetti da allegare, WhatsApp, Salva come template) riusando le
    funzioni già esistenti (_appendToggleNutrizionali ecc., già generiche/pronte),
    zero duplicazione di codice.

  Griglia celle unificata generatore AI + compositore manuale (commit 6ec4b22):
    Estratta _renderCelleGriglia condivisa (menu ⋯ completo, swap alternativa,
    grammatura cliccabile, checkbox frutta per pasto) — prima il manuale aveva una
    versione semplificata (_ngRenderCelleManuale, rimossa) senza queste funzioni.
    Scoperta e corretta un'insidia: tutte le funzioni del menu ⋯ chiamano
    _aggiornaPianoBox(), che non riconosceva la modalità manuale — senza il fix,
    il primo click su "elimina"/"modifica grammatura" nel manuale avrebbe
    sovrascritto la vista col box classico del generatore AI. Aggiunto ramo
    dedicato (controlla window._ngModalitaManuale + esistenza #ng-piano-destra).

  Barra giorni + fix Pesca ricetta (commit bdc10c6, fa2a323, 358fd11):
    Sostituito il vecchio selettore verticale "quanti giorni?" con tab orizzontali
    cliccabili + scroll a frecce ‹ › + drag-to-scroll mouse (Pointer Events con
    setPointerCapture, bind solo sull'elemento — MAI su window, per non accumulare
    listener a ogni cambio giorno in una sessione lunga). "Componi a mano" ora apre
    subito l'editor con 6 giorni di default (niente più domanda preliminare);
    numero giorni (1-14) sempre modificabile con conferma se si perdono dati.
    Fix separato: "📖 Pesca ricetta" scomponeva gli ingredienti nelle celle ma non
    scriveva il nome della ricetta come riga testuale — la frutta per pasto si
    aggancia SOLO a una riga di ricetta scritta (getFruttaMarker), quindi senza
    quella riga il checkbox "🍎 frutta" restava senza effetto nel PDF.

  Popup "Scegli categoria → Aggiungi alimento" ridisegnato (commit 552c316):
    Sostituiti i due popup separati (_mostraPopupCategoriaAlimenti, rimossa) con un
    SOLO popup a due pannelli che scorrono (_mostraPopupSceltaCategoriaAlimento) —
    il tasto ← indietro nella versione precedente non esisteva perché il primo
    popup veniva distrutto (remove() dal DOM) prima di aprire il secondo; ora è
    lo stesso elemento che scorre avanti/indietro. Decisione di design con
    Fabrizio: 3 esempi visivi mostrati (2 colonne stile diagram/interattivo, poi
    stile iOS 18 con card verticali — scartato per desktop, troppo verticale),
    scelta finale: estetica "as-is" dell'app ma a 3 colonne, emoji per alimento
    (via getEmojiCp, non tutti gli alimenti ne hanno una), niente barra di ricerca
    nello step alimenti, sfondo opaco tra i due step (non si intravede lo step
    precedente durante/dopo la transizione). Il flusso "aggiungi alternativa su
    cella esistente" (cellaAggiungiAlt/_mostraPopupAggiungiAlt, con ricerca) non
    è stato toccato — resta un percorso diverso e volutamente separato.

  INCIDENTE E FIX CRITICO — ReferenceError bloccava il login (commit febf056):
    Per riusare getEmojiCp() nel nuovo popup, è stata estratta da dentro generaPDF
    a livello globale insieme a EMOJI_MAP/EMOJI_CAT_FALLBACK. Nell'estrazione, la
    riga `var _emojiCache = emojiCache || {}` è finita per errore nel blocco
    globale — ma `emojiCache` esiste SOLO come parametro di _generaPDFSync, quindi
    a livello globale il browser lanciava `Uncaught ReferenceError: emojiCache is
    not defined` AL CARICAMENTO DELLA PAGINA, bloccando l'intero script (un unico
    <script> concatenato) — login incluso. Diagnosi: prima sospettato un problema
    di cache/GitHub Pages (era effettivamente successo in parallelo anche un
    deploy fallito con "Error: Deployment failed, try again later", errore
    infrastrutturale generico risolto con un commit vuoto --allow-empty per
    forzare il redeploy), poi isolato il vero problema chiedendo la console del
    browser (F12) a Fabrizio: messaggio d'errore esatto = riga/colonna precisi
    del bug. Fix: rimessa la riga dentro _generaPDFSync, dove il parametro
    emojiCache esiste davvero. Verificato con test isolato in Node che riproduce
    esattamente il meccanismo (stessa riga, stessa variabile, nessuna eccezione
    dopo il fix). Lezione: quando si estrae codice da dentro una funzione per
    renderlo globale, verificare OGNI riga del blocco spostato per dipendenze dai
    parametri della funzione originale — non solo la funzione target dichiarata.

4 LUGLIO 2026 — BLOCCO 15: campo Sesso + BIA per-misurazione + UX modali/pazienti + guard sync:

  Riordino preset regime energetico + box riferimenti obiettivo peso (commit 7c23f5a):
    Pulsanti preset kcal/% riordinati in sequenza logica −25/−20/−15/−10/−5/
    Mantenimento/+10/+15/+20/+25 (prima disordinati e incompleti, mancavano −5/
    +15/+20/+25). Slider e clamp interno estesi da max +20 a max +25 per
    coerenza col nuovo bottone. Aggiunto box "Riferimenti obiettivo peso" sotto
    il campo omonimo nella scheda macros: mostra fino a 4 valori cliccabili
    (compilano il campo al click) — Peso Ideale InBody (dal referto, se
    presente), range BMI normale 18.5–24.9 (da altezza), formula di Devine
    (1974) e formula di Robinson (1983), entrambe sesso-specifiche. Le ultime
    due inizialmente non comparivano mai: scoperto che richiedono p.sesso, un
    campo letto in 8 punti del codice ma MAI scritto da alcun form (vedi sotto).

  Campo Sesso in anagrafica — sblocca Devine/Robinson e soglie cliniche sesso-
  specifiche (commit 30150f3, riposizionato in dfe6ac1):
    Scoperta: p.sesso era letto in 8 punti (soglia T/E2 ipogonadismo, soglia
    ferritina bassa F<50/M<40, soglia cintura/fianchi 0.90 M / 0.85 F sia nel
    grafico che nel calcolo, oltre alle nuove Devine/Robinson) ma non esisteva
    ALCUN campo "Sesso" in anagrafica — sempre undefined, tutte quelle soglie
    ricadevano silenziosamente sul ramo di default. Aggiunto select Maschio/
    Femmina nel tab Dati del modal paziente, collegato a salvaPaz()/editPaz().
    Prima versione (commit 30150f3) messa in una riga fr3 a 3 colonne insieme a
    Data di nascita — non visibile a schermo nonostante fosse nel DOM (causa
    non isolata con certezza: probabile combinazione cache browser + struttura
    riga fragile). Riposizionato (commit dfe6ac1) in riga fr a 2 colonne
    collaudata accanto a Data di nascita, stesso pattern di Nome/Cognome.
    Sync Supabase: nessuna modifica necessaria, l'intero oggetto paziente è
    salvato come JSON in un'unica colonna, sesso si sincronizza da solo.
    Nota operativa: pazienti già esistenti richiedono un salvataggio manuale
    dell'anagrafica (o autofill da InBody, vedi sotto) per valorizzare il
    campo — fino ad allora restano sul comportamento legacy.

  BIA-Condizione: da campo anagrafico unico a per-misurazione InBody (commit dfe6ac1):
    Richiesta di Fabrizio: la condizione BIA (Digiuno/Post-spuntino/Post-
    pranzo) è specifica di OGNI misurazione, non della persona — averla come
    campo unico paziente rendeva lo storico InBody meno interpretabile (misure
    fatte in condizioni diverse non distinguibili a colpo d'occhio). Rimosso
    p-bia dall'anagrafica; aggiunto select "Condizione BIA" nel form Misurazione
    InBody, salvato per-oggetto in ib.condizioneBia (array p.inbody[]). Mostrato
    come badge (🩺 Digiuno) accanto alla data in ogni card dello storico.
    Retrocompatibilità: il vecchio p.bia dei pazienti esistenti non viene perso
    — preservato nel merge di salvaPaz() se non sovrascritto da un nuovo valore
    — ma lo storico si costruisce da qui in avanti sulla condizione per-
    misurazione. Nessuna funzione editInbody esiste (le misurazioni si
    aggiungono/eliminano, non si modificano): non serve ripopolare il campo.

  Rimossa conferma di chiusura da tutti i modal (commit fbefa99):
    ngChiudiModale() e ngChiudiPopupCoppia() chiedevano sempre conferma
    ("Vuoi chiudere questa finestra? Le eventuali modifiche non salvate
    andranno perse.") anche premendo Annulla senza aver modificato nulla —
    percepito come fastidioso su ogni chiusura. Rimosso il confirm() da
    entrambe le funzioni: chiusura sempre immediata. Essendo le due funzioni
    centralizzate e usate da tutti i modal dell'app (paziente, InBody, eventi
    calendario, ricette, entrate, AI WhatsApp, alimenti custom), la modifica
    copre l'intera app senza toccare singoli modal.

  Autofill data di nascita e sesso in anagrafica dal referto InBody (commit 8358790):
    Richiesta di Fabrizio: la data di nascita (e il sesso) sono spesso già
    presenti sul referto InBody caricato — evitare la doppia digitazione.
    Il prompt di estrazione AI (loadInbodyPDF) ora chiede anche data_nascita
    (formato YYYY-MM-DD) e sesso (M/F). Se i campi anagrafici corrispondenti
    sono vuoti, vengono compilati nel form E persistiti direttamente
    sull'oggetto paziente al momento di salvaInbody() — stesso pattern già
    usato per l'altezza (che si aggiorna sempre da InBody indipendentemente
    dal form anagrafico). Non sovrascrive MAI dati già presenti. Gestisce sia
    formato YYYY-MM-DD che DD/MM/YYYY in input. Flag window._ibAutofill
    azzerato ad ogni apertura di openInbody() per evitare che un vecchio
    autofill sopravviva a una misurazione successiva senza PDF caricato.

  Viste Lista e Kanban pazienti + filtri estesi condivisi (commit be151e7):
    Aggiunte 2 nuove modalità di visualizzazione alla pagina Pazienti (prima
    solo Card): Lista compatta (riga per paziente: avatar, nome, età, stato,
    regime, data controllo — utile per scorrere rapidamente 30+ pazienti) e
    Kanban per stato piano (colonne Nessun piano / In corso / Completato /
    Archiviati con conteggio). Toggle vista persistito in localStorage
    (nutrigest_pazView). Filtri riprogettati e CONDIVISI dalle 3 viste tramite
    due funzioni centrali (_pazStatoPiano, _pazUrgenzaControllo): il vecchio
    filtro singolo "Con piano attivo/Archiviati" è diventato "Stato piano"
    (Tutti/Nessun piano/In corso/Completato/Archiviati) + nuovo filtro
    "Regime" (popolato dinamicamente dai regimi realmente presenti tra i
    pazienti) + nuovo filtro "Controllo" (Scaduto/Questa settimana/Senza
    data). Nessuna divergenza di comportamento tra le viste: la logica di
    stato/urgenza è unica.

  Guard anti-perdita dati: avviso beforeunload solo se sync non confermato
  (commit 71dc1b9):
    Richiesta di Fabrizio: timore di perdere dati chiudendo il browser senza
    premere "Sincronizza". Verificato che l'architettura esistente già mette
    al sicuro ogni salvataggio: save() chiama sempre saveLocal()+pushToSheets()
    ad ogni azione (salva paziente, InBody, ricetta...), non solo al click
    manuale su Sincronizza — quel pulsante serve principalmente al pull da
    altri dispositivi. Il rischio reale era un push a Supabase fallito
    silenziosamente (rete assente, Supabase irraggiungibile) senza che
    l'utente se ne accorgesse prima di chiudere. Aggiunto: window.
    addEventListener('beforeunload',...) che mostra il dialog nativo di
    conferma chiusura SOLO se window._syncPendingFail (ultimo push fallito)
    o window._syncInFlight (push ancora in corso) sono true — silenzioso in
    ogni altro caso, incluso il caso base senza modifiche. I due flag sono
    agganciati direttamente dentro pushToSheets()/setSyncStatus(): si azzerano
    ad ogni push riuscito, quindi anche un retry manuale (bottone 🔄
    Sincronizza) che va a buon fine fa sparire l'avviso automaticamente.
    Commit: 71dc1b9. Diff riportato da Fabrizio dopo il push: +32/−158 righe —
    numero anomalo per una modifica di ~17 righe, primo segnale della
    regressione descritta sotto.

4 LUGLIO 2026 — BLOCCO 15b: regressione accidentale + fix (commit 80fdf6c):

  Diagnosi: il diff +32/−158 del commit 71dc1b9 (sopra) era il sintomo di una
  regressione, non della modifica guard-sync in sé. Confronto diretto tra i
  due commit su GitHub (curl raw.githubusercontent.com su be151e7 e 71dc1b9):
  be151e7 aveva 17.484 righe, 71dc1b9 ne aveva 17.358 — mancavano per intero
  le funzioni _pazStatoPiano, _pazUrgenzaControllo, _renderPazLista,
  _renderPazKanban, _renderPazCard, setPazView, il CSS .paz-view-btn/
  .paz-list-row/.paz-kanban-*, e l'HTML del toggle vista introdotti nel
  BLOCCO 15 (viste Lista/Kanban pazienti). Il commit 71dc1b9 aveva
  effettivamente RIPORTATO renderPaz() e l'HTML correlato alla versione
  precedente a be151e7, cancellando la feature — spiegando in un colpo solo
  sia l'anomalia del diff sia la segnalazione di Fabrizio ("la modifica delle
  tre forme di visuale non funziona, non le visualizzo").
  Causa più probabile: il file index.html locale sul Desktop, al momento del
  commit del guard sync, non era la versione più recente consegnata da
  Claude — verosimilmente un download del browser che ha riusato un vecchio
  file "index.html" già presente nella cartella invece di scaricare quello
  aggiornato. Non è stato un errore nel codice generato in quella sessione
  (verificato: il file consegnato in quel momento conteneva ancora la feature
  viste intatta).
  Fix: ricostruito il file partendo da be151e7 (versione integra, con viste
  pazienti + Sesso + BIA per-misurazione + autofill InBody) e riapplicate
  sopra esattamente le stesse modifiche del guard sync (stessi 3 punti di
  aggancio: inizializzazione flag, setSyncStatus, pushToSheets). Verificato
  con diff mirato tra be151e7 e il file ricostruito: uniche differenze le 17
  righe attese del guard sync, nessun'altra perdita né duplicazione. Verifica
  finale post-push: scaricato il file live da GitHub main e contati i
  riferimenti alle 3 feature chiave (viste pazienti, sync guard, sesso/BIA) —
  tutti presenti (17.501 righe totali).
  Lezione di processo: quando Fabrizio segnala un diff insolito su un commit
  (righe eliminate molto maggiori delle attese), è un segnale da investigare
  SUBITO confrontando i commit su GitHub, prima di procedere con altro —
  un file locale disallineato può silenziosamente annullare lavoro di sessioni
  precedenti anche se il codice generato in sessione era corretto.

4 LUGLIO 2026 — BLOCCO 14: sync fix + P57 + fix NaN grassi + P34 chiuso + P7-TDEE + P58 regime slider:



  Fix sync — database pazienti vuoto bloccava tutta la sincronizzazione (commit fab46c1):
    sincronizzaTutto() lanciava throw su 0 pazienti trovati (due punti: tabella
    completamente vuota, o solo riga meta senza pazienti reali), trattando uno
    stato legittimo (account nuovo, tabella svuotata per test, ultimo paziente
    eliminato) come errore fatale. pullOk=false bloccava a catena anche pull/push
    di ricette, piani ed entrate, mostrando "Sincronizzazione fallita" anche
    quando gli altri dati sarebbero stati sincronizzabili. Fix: rimossi i due
    throw, db.pazienti=[] è ora un caso valido gestito normalmente. Modello:
    Sonnet 4.6 Low.

  P57 — Ricette multi-categoria (commit c49c2a3):
    Richiesta di Fabrizio: ricette di verdure valide sia a pranzo che a cena, ma
    il campo categoria era a scelta singola (dropdown). r.cat da stringa singola
    ad array — retrocompatibilità totale via helper catArr(r), che normalizza
    sia il vecchio formato stringa che il nuovo array (nessuna migrazione dati
    necessaria, le ricette esistenti continuano a funzionare). Nel modal
    Nuova/Modifica Ricetta il dropdown CATEGORIA diventa 5 chip cliccabili
    multi-selezionabili (Colazione/Pranzo/Cena/Spuntino/Post-workout), colorati
    come i badge già usati nella griglia (stessa mappa CAT_COLORS). Aggiornati
    tutti i punti che filtravano per categoria esatta: griglia Ricettario
    (badge multipli per ricetta), selettore ricette/parziali nel piano
    (renderListaRicette), pannello "Pesca ricetta", pannello slide-in "Ricette
    compatibili", e il filtro ispirazione per l'AI (_ricSlots, rinominata da
    _ricSlot: una ricetta pranzo+cena viene ora proposta all'AI se ALMENO uno
    dei due pasti è attivo per il paziente, non solo se lo sono entrambi).
    Aggiornata anche aiSuggerisciRicetta() per spuntare i chip invece di
    scrivere su un select ormai rimosso. Validato: sintassi JS + 10 test
    isolati (retrocompatibilità stringa→array, ricetta multi-cat visibile sia
    a pranzo che a cena, validazione salvataggio con zero categorie
    selezionate, filtro ispirazione AI su pasto parzialmente attivo).

  Fix NaN grassi alimenti custom — chiave g100 non allineata a g (commit 6cb545d):
    Scoperto da Fabrizio: i grassi di un alimento aggiunto da etichetta (es.
    "Pancake Tre Mulini") comparivano come NaN in ogni tabella pasto/giorno,
    propagandosi a cascata sui totali "Verifica Macros" dell'intera giornata.
    Causa: caricaAlimentiCustom() (ricostruisce CREA_ALIMENTI da
    db.alimentiCustom a ogni sync/load) e salvaAlimentoCustom() scrivevano il
    valore grassi sotto la chiave g100, ma lo schema nativo di CREA_ALIMENTI
    (identico per tutti gli alimenti "ufficiali", es. 'Frutta mista':
    {kcal:50,p:0.8,c:12,g:0.2}) usa la chiave g — e ogni funzione di calcolo
    macro legge vals.g, mai vals.g100. Fix: le due funzioni ora scrivono su
    chiave g; nessuna migrazione dati necessaria, perché la fonte
    (db.alimentiCustom[].g100, struttura interna separata per evitare
    collisione col campo "grammi di riferimento") resta invariata — cambia
    solo la chiave di destinazione in CREA_ALIMENTI. I dati già inseriti da
    Fabrizio sono corretti automaticamente al primo reload, senza reinserire
    nulla. Validato: sintassi + test isolato che riproduce il bug reale (NaN
    prima del fix, valore corretto dopo, su un caso con grassi noti).

  P34 — Diagnosi bug kcal CHIUSA + ciclizzazione carboidrati carico/scarico
  (commit fd4c23c):
    Diagnosi aperta dal 12 maggio, mai chiusa, un tentativo precedente il 24
    mag rivelatosi errato (schema JSON cena senza carboidrati — dati reali
    mostravano carboidrati presenti). Ricognizione nel codice ha trovato che
    costruisciPrompt() — la funzione REALMENTE usata dal generatore
    (generaPiano()→chiamaGeneraPiano()→costruisciPrompt()) — manda all'AI un
    solo target kcal/macro per l'intera settimana, con le etichette "ON"/"OFF"
    sui nomi giorno puramente cosmetiche. Nel frattempo la card "Verifica
    Macros" confronta l'output dell'AI contro DUE target differenziati
    (window._pianoTargetsOFF, calcolato altrove con un modello LAF diverso).
    L'AI ottimizzava verso un solo numero, la verifica ne usava due → gli
    scarti sistematici osservati sui pazienti ciclizzati (es. "+317 kcal").
    Trovato per strada anche un blocco di ~35 righe di codice morto in
    generaPiano() (un prompt completo costruito e mai passato a nessuna
    funzione) e un calcolo target parallelo con fallback hardcoded (1.8/0.9
    g/kg) usato SOLO per popolare il riquadro di riepilogo mostrato a schermo
    — una "doppia verità" tra il numero visto da Fabrizio e quello usato per
    generare davvero il piano.
    Fix — nuovo modello di ciclizzazione (decisione clinica esplicita di
    Fabrizio, non calcolo automatico da LAF): il medico imposta a mano kcal ON
    (carico) e kcal OFF (scarico); proteine e grassi restano fissi (dai target
    attivi da Ragionamento/TDEE), i carboidrati assorbono tutta la differenza
    (calcolaTargetsCiclizzazione). Attivazione tramite casella dedicata
    "Ciclizzazione carboidrati", indipendente dai giorni di allenamento
    (usabile anche su pazienti non sportivi che ciclizzano per aderenza/
    metabolismo). Il selettore giorni, condiviso con l'allenamento, è stato
    rietichettato in UI "Giorni di carico (ON)" (dato salvato invariato,
    p.giorniAllenamento, nessuna migrazione). costruisciPrompt() ora invia
    target ON/OFF espliciti con grammature carbo per pasto distinte; nuovo
    helper _setupPianoTargets() unifica il calcolo dei target tra generazione
    e riapertura piano; barriera anti-generazione se la ciclizzazione è attiva
    ma kcal ON/OFF mancanti o nessun giorno di carico selezionato. Rimosso il
    codice morto e il calcolo target parallelo in generaPiano().
    Bonus trovato durante l'implementazione: salvaPaz() (salvataggio scheda
    anagrafica) ricostruisce l'intero paziente da zero portando avanti solo
    una lista curata di campi storici — non includeva p.ciclizzazione,
    introdotta nella stessa sessione: salvando l'anagrafica principale la
    ciclizzazione sarebbe sparita silenziosamente. Fix nello stesso commit.
    Validato: sintassi + 16 test isolati (caso reale TDEE 2000/-500 → carbo ON
    196g/OFF 121g a proteine e grassi fissi, differenza 75g, calcolo da peso
    senza target salvati, clamp non-negativo se il target OFF implicherebbe
    carbo negativi, incompleta→barriera). Modello: Opus 4.8 Max + Thinking ON.

  P7-TDEE — Motore MET additivo (Compendium 2024) + confronto LARN (commit 2a020eb):
    Sostituito il vecchio calcolo PAL/LAF a bucket (coefficienti NEAT+EAT
    sommati con cap a 1.80, doppio conteggio strutturale tra passi e
    allenamento) con un modello per componenti: TDEE = MB(InBody) + NEAT
    (passi, come frazione calibrata del MB) + EAT((MET-1)×peso×ore effettive)
    + TEF(10%). Il "MET-1" (non il MET pieno) evita il doppio conteggio: 1 MET
    è il metabolismo a riposo, già contato nel MB.
    Nuovi campi (aggiunti accanto a quelli esistenti, nessuna rottura
    retroattiva): Sedute/settimana + Minuti effettivi/seduta (il lavoro reale
    di allenamento, esclusi i recuperi lunghi — su richiesta esplicita di
    Fabrizio per risolvere la sovrastima della forza, dove molte pause
    gonfiavano la durata totale) — se compilati hanno priorità sul vecchio
    "Ore allenamento/settimana", altrimenti fallback legacy invariato.
    Attività specifica opzionale con MET esatto dal Compendium (ha priorità
    sulla griglia Tipo/Intensità). Griglia MET tipo×intensità (Forza
    3.5/5.0/6.0, Cardio 6.0/8.0/10.0, Misto 4.5/6.0/7.5) validata contro 3
    tabelle fornite da Fabrizio (foto), con 2 valori scartati perché
    incoerenti col Compendium (corsa 8km/h=6.4 → corretto a 8.3; nuoto
    lento=10 → corretto a 5.5, righe invertite nella fonte).
    Pannello trasparente: il bottone "Ricalcola LAF" ora mostra la
    scomposizione MB+NEAT+EAT+TEF con il MET usato, e affianca il confronto
    LARN (SINU, stile di vita a 4 livelli) come guardrail di plausibilità —
    coerente con la filosofia di Fabrizio "mostro tutto, decide il medico",
    pensando anche alla futura vendita del software (il nutrizionista
    acquirente deve poter vedere quale formula sta usando NutriGest).
    Resta aperto (non affrontato in questa sessione): procedura senza referto
    InBody (BMR stimato via Mifflin-St Jeor o Katch-McArdle) per il futuro
    acquirente del software privo di bioimpedenziometro.
    Validato: sintassi + 14 test isolati (scomposizione corretta,
    retrocompatibilità con oreAllenamento legacy, fallback LAF manuale senza
    alcun dato attività, priorità attività specifica sulla griglia, nessun
    crash senza InBody, coerenza LARN su profilo sedentario/attivo). Modello:
    Opus 4.8 Max + Thinking ON.

  P58 — Regime energetico a slider kcal/percentuale + strategia keto separata
  (commit e357527):
    Su richiesta di Fabrizio ("voglio una soluzione a scorrimento per decidere
    il deficit, sia in kcal che in percentuale"): il vecchio menu a tendina
    "Tipo regime" (8 opzioni fisse, es. "Ipocalorico moderato -500 kcal" uguale
    per tutti i pazienti indipendentemente dal loro TDEE) è sostituito da uno
    slider energetico in percentuale del TDEE, sincronizzato in tempo reale
    con un campo kcal assolute (muovi uno, l'altro si aggiorna), con preset
    rapidi (-10/-15/-20/-25%, mantenimento, +10%). Più corretto clinicamente:
    un deficit fisso di 500 kcal è leggero per un uomo da 2800 kcal ma pesante
    per una donna da 1600.
    Soglia di sicurezza: sostituito il vecchio limite fisso con il
    metabolismo basale del singolo paziente — avviso se il target scende
    sotto l'MB misurato, indipendentemente dal sesso.
    Strategia sganciata: la chetogenica non è un livello di deficit ma una
    distribuzione macro — mescolata nel vecchio menu, impediva di avere "keto
    + deficit del 20%" in modo pulito. Nuovo selettore "Strategia dieta"
    (Standard/Keto moderata/Keto aggressiva) indipendente dallo slider.
    Compatibilità: p.regime resta un'etichetta testuale composta
    automaticamente (_componiRegimeText) — nessuno dei ~15 punti del codice
    che leggono p.regime come stringa (generatore, prompt AI, badge, isCeto)
    è stato toccato direttamente. Fonte di verità reale: p.regimeOffsetPct,
    letto da un helper unico _regimeOffset() che sostituisce 8 tabelle di
    offset duplicate sparse nel codice, con fallback per i pazienti legacy
    (solo regime testuale salvato, nessun regimeOffsetPct). Aggiornato anche
    salvaPaz() per portare avanti regime/offset/strategia nel carry-forward
    (stesso punto del fix ciclizzazione sopra).
    Validato: sintassi + 18 test isolati (priorità %→kcal snapshot→legacy
    testuale, auto-adattamento della kcal quando cambia il TDEE,
    retrocompatibilità con regime testuale esistente, composizione etichetta
    per ogni fascia, keto che attiva isCeto mantenendo il deficit scelto dallo
    slider). Modello: Opus 4.8 Max + Thinking ON.

1 LUGLIO 2026 — BLOCCO 0 COMPLETATO: P29 (sicurezza RLS + token) + P30
  (multi-tenancy: blindatura meta-record + registrazione + onboarding):

  P29 — SQL Parte 1 (no commit, SQL su Supabase):
    Colonna user_id uuid aggiunta con IF NOT EXISTS su pazienti/piani/eventi/
    entrate/ricette. Backfill tutte le righe → UUID 627dfd55-2a97-423b-9f70-
    f782b3c51429. Default auth.uid() per nuovi record. Verifica: 5 tabelle ×
    righe_senza_owner = 0. RLS ancora spento, app identica.

  P29 — Codice (commit 54e8c8d — 48 inserimenti):
    supaHeaders(): ora legge getSessioneSalvata() e usa access_token nel Bearer
    (fallback anon key se non loggato o token scaduto). Tutti e 34 i call site
    aggiornati automaticamente. Nuova assicuraTokenValido(): rinnovo proattivo
    con buffer 2 min prima della scadenza. Timer avviaRinnovoTokenPeriodico()
    ogni 30 min, avviato a login+avvio, fermato al logout. Rinnovo in testa a
    syncNow() come rete di sicurezza. Costante APP_URL aggiunta per redirect.
    Syntax check OK, 10/10 test funzionali passati. Test sul campo: login →
    pazienti visibili → sync OK. RLS ancora spento → deployment sicuro.

  P29 — SQL Parte 2 (no commit, SQL su Supabase):
    user_id SET NOT NULL su tutte e 5 le tabelle. Policy row-owner
    owner_all_* (FOR ALL USING/WITH CHECK user_id = auth.uid()) create. ENABLE
    ROW LEVEL SECURITY su tutte e 5. Rimossa policy legacy
    accesso_completo_pazienti su pazienti (qual=true, with_check=true —
    annullava l'isolamento row-owner, sopravvissuta da tentativo precedente).
    Verifica finale: 5 tabelle × rls_attivo=true × numero_policy=1.
    Test: login → tutti i pazienti visibili → sync OK. Nessun 401/403.

  P30 — Blindatura meta-record (no commit, SQL su Supabase):
    PK di pazienti cambiata da (id) a (id, user_id): DROP CONSTRAINT
    pazienti_pkey + ADD CONSTRAINT pazienti_pkey PRIMARY KEY (id, user_id).
    Prerequisito: diagnostica FK (nessuna FK esterna su pazienti → cambio PK
    sicuro). Verifica: INSERT riga finta UUID 00000000-...-0001 con id
    '__alimenti_custom' → 2 righe coesistenti → DELETE riga finta → 1 riga.

  P30 — Codice (commit P30 — +247 righe):
    Schermata login ristrutturata in 4 modalità (auth-mode-login/signup/
    recover/newpass) con toggle JS mostraLogin/mostraRegistrazione/
    mostraRecupero/mostraNuovaPassword. Link "Registrati" e "Password
    dimenticata?" nella schermata login. Costante APP_URL usata come
    redirect_to in signup e recover. Flusso completo signup → conferma email
    → auto-login al ritorno dal link. Messaggio italiano chiaro se email
    non confermata (regex "not confirmed"). Flusso recupero: richiesta link
    → messaggio generico (privacy) → ritorno con #type=recovery →
    schermata nuova password → PUT /auth/v1/user con recovery token.
    gestisciRitornoAuth() chiamata a ogni avvio: intercetta hash URL, smista
    a recovery o auto-login, pulisce l'hash con history.replaceState.
    Onboarding: renderPaz() distingue "zero pazienti" (benvenuto guidato +
    bottone CTA) da "filtro senza risultati" (messaggio semplice).
    Syntax check OK, 8/8 test gestione hash + 6/6 validazione form.
    Test sul campo con account reale: registrazione → email Supabase ricevuta
    → link conferma → accesso → benvenuto onboarding → recupero password →
    nuovo login → OK. Account di test cancellato dalla dashboard Supabase.
    Supabase: Site URL e Redirect URLs impostati su APP_URL. Conferma email ON.

  Modello: Opus 4.8 Extra + Thinking ON (dati pazienti reali, sicurezza).
  Backup 5 CSV eseguito prima di ogni intervento SQL.

30 GIUGNO 2026 (sessione 2) — 4 fix/feature + 1 scoperta in roadmap:

  1) Funzionalità renale — divisione campo Creatinina (commit 1479c96):
    La voce unica 'Creatinina + eGFR' era clinicamente imprecisa. Sostituita
    con 3 voci distinte: 'Creatinina', 'Creatinina umol/L', 'e-GFR (MDRD)'.
    Aggiornata la dependency del calcolo BUN/Creatinina. Modello: Sonnet Low.

  2) P56 — Range di riferimento standardizzati analisi sangue (commit 585759b):
    Nuovo oggetto RANGE_RIF con soglie da ADA 2026, ESC/EAS 2019+2025,
    KDIGO 2024, Endocrine Society 2024, AHA/CDC. Architettura 3 livelli:
    A (cutoff diagnostici fissi, semaforo vero: Glicemia, HbA1c DCCT/IFCC,
    e-GFR con stadiazione KDIGO G1–G5), B (target per rischio, pallino info:
    LDL/HDL/TG/ColTot), C (orientativo con caveat: VitD, hsCRP). Riga
    interpretazione sotto ogni campo con semaforo + ℹ️ che apre notif() al
    tap. Funzioni: interpretaAnalisi(), _interpAnalisiHtml(), mostraInfoRange().
    33 test Node: tutti pass. Analiti non in RANGE_RIF → nessuna soglia
    hardcoded (ormoni, enzimi metodo-dipendenti → al referto).
    Modello: Opus High + Thinking ON (tocca interpretazione dati clinici).
    Bozza approvata voce per voce da Fabrizio prima di scrivere codice.

  3) Fix bug gruppi clinici — applicaGruppoClinico (commit a54cb14):
    Causa: la funzione spuntava solo il DOM, mai p.checkSemaforo né save().
    Se la tab Clinica non era renderizzata → getElementById null → nessun
    effetto reale, ma messaggio "✓ Applicato" appariva comunque.
    Fix: scrittura diretta su p.checkSemaforo + save(). Modello: Sonnet Medium.

  4) Fix ℹ️ range non cliccabile su mobile (commit 154611f):
    title="..." non funziona al tap mobile. Aggiunto onclick → mostraInfoRange()
    → notif() per 6s. Allargata .notif per testi lunghi. Modello: Sonnet Low.

  5) Scoperta P55 (nessun codice modificato):
    costruisciPrompt() riga 9346: fallback legacy con macros hardcoded (1.8
    g/kg prot, 0.9 g/kg grassi) segnalato solo in console.log, mai in UI.
    Stessa logica duplicata in costruisciContestoPaziente() ~5850. Si lega
    a P34 (una delle cause aperte). Aggiunto come P55 in roadmap.

30 GIUGNO 2026 — 4 modifiche: Integratori, fix ciclo colori, Analisi del sangue, P33 modalità manuale:
  Sessione lunga, quattro richieste scollegate tra loro, effort/modello dichiarati
  prima di ogni modifica come da prassi.

  1) Integratori — 4 nuove voci + dosaggio Vitamina D a tendina:
    Richiesta: aggiungere Acido folico, Blu di metilene, Fosfatidilcolina,
      Lecitina di soia in "modifica paziente" → integratori, più un menu a
      tendina sulla Vitamina D per il dosaggio (2000/4000 UI).
    Implementazione: 4 nuove chip nel markup, stesso pattern checkbox "Prende
      già"/"Vorrebbe prendere" delle voci esistenti. Select dosaggio aggiunto
      accanto alla chip Vitamina D; il dosaggio selezionato viene incluso
      nell'etichetta salvata (es. "Vitamina D (2000 UI)") tramite funzione
      _vitdLabel(), letto correttamente al rientro nella scheda paziente.
    Modello: Sonnet Medium (modifica UI/contenuto, nessun rischio dati).
    Commit: 46fd0af.

  2) Ciclo colori alimenti consigliati/sconsigliati — fix in 2 passi:
    Richiesta iniziale: il ciclo manuale su un alimento "consigliato" (celeste)
      o "sconsigliato" (grigio scuro) doveva seguire l'ordine verde→arancione→
      rosso→torna all'origine, invece il primo click saltava direttamente ad
      arancione.
    Primo fix (commit b198953): aggiunto lo step "verde" mancante nella
      funzione togAl — ora il primo click su un alimento celeste/grigio porta
      correttamente a verde prima di proseguire nel ciclo.
    Bug trovato da Fabrizio dopo il primo fix: al SECONDO giro del ciclo, il
      colore "tornava" sempre a grigio scuro anche per gli alimenti partiti da
      celeste — il colore di origine non veniva mai memorizzato in modo
      persistente tra un giro e l'altro della funzione, si perdeva l'
      informazione "era celeste" dopo il primo ciclo completo.
    Fix definitivo (commit 6b4dfad): introdotta mappa dedicata
      window._alOrigineAuto che salva esplicitamente il colore di origine
      (celeste o grigioScuro) per ogni alimento attualmente in ciclo manuale,
      usata per tornare correttamente all'origine a ogni giro, illimitatamente.
      Verificato con simulazione di 10 click consecutivi per entrambi i casi
      (celeste e grigio scuro): sequenza corretta e ripetibile confermata.
    Modello: Sonnet Medium (logica di stato UI, nessun dato paziente toccato).
    Commit: b198953 → 6b4dfad.

  3) Analisi del sangue — riorganizzazione completa + import automatico da referto:
    Richiesta: migliorare la disposizione (basata sul documento originale
      "Analisi del Sangue Consigliate" inizialmente fornito da Fabrizio) e
      aggiungere numerosi nuovi valori: Calcio, Fosforo, PTT, PT, INR, le due
      emoglobine glicate (HbA1c DCCT e IFCC), Paratormone intatto, esame
      completo delle urine e specifiche dettagliate dell'emocromo (da foto di
      referti reali fornite da Fabrizio). Successivamente Fabrizio ha chiesto
      di valutare e includere ulteriori analisi utili in ambito nutrizionale
      (proposte da Claude e tutte accettate) e i relativi nuovi calcoli
      derivati.
    Implementazione: struttura ANALISI riscritta da 10 a 23 sezioni cliniche
      (Emocromo diviso in Serie rossa/Serie bianca/Piastrine, Glicemia e
      metabolismo glucidico, Coagulazione, Stato nutrizionale proteico,
      Infiammazione, Metabolismo osseo e paratiroide, Screening celiachia,
      Esame completo delle urine, ecc.), per un totale di 117 voci (da circa
      50). Aggiunti 3 nuovi calcoli clinici automatici in CALCOLI_CLINICI:
      Calcio corretto per albumina (formula di Payne), A/G — Albumina/
      Globuline, FAI — indice androgeno libero (Testosterone/SHBG); totale
      calcoli automatici nel pannello: 21. Nuovo pulsante "📄 Importa referto
      (PDF/foto)" nella card Analisi del sangue — funzione loadAnalisiSanguePDF,
      indipendente da loadInbodyPDF (InBody resta un referto separato, della
      bilancia, non va confuso con i referti di laboratorio che il paziente
      manda via mail o che Fabrizio fotografa): invia il file all'API
      Anthropic con un elenco sincronizzato delle 117 voci riconoscibili,
      estrae solo i valori realmente presenti nel referto e li inserisce
      nelle celle corrispondenti, con notifica del numero di valori importati.
    Verifiche fatte: 117 voci/23 sezioni senza duplicati di chiave (che
      avrebbero causato ID HTML doppi), tutte le dipendenze dei 21 calcoli
      clinici risolte correttamente contro le voci ANALISI esistenti, sintassi
      JS valida (node --check).
    Modello: Opus High + Thinking ON (dati clinici del paziente, nuova
      pipeline di estrazione AI dove un mapping sbagliato = dato clinico
      sbagliato).
    Commit: eebc06f.

  4) P33 — Modalità composizione manuale del piano (2 commit):
    Contesto: P33 era in roadmap come "scomposizione automatica ingredienti
      ricetta nel piano". Prima di scrivere codice, ragionamento approfondito
      con Fabrizio sui limiti della scomposizione semplice (il problema delle
      alternative su pranzo/cena, poco guadagno su un pasto già popolato
      dall'AI) — emersa l'idea di Fabrizio di usare la scomposizione dentro
      una NUOVA modalità di composizione manuale del piano, alternativa alla
      generazione AI, dove il contesto "pasto vuoto" rende la scomposizione
      pienamente efficace senza i rischi del pasto già pieno.
    Design deciso con Fabrizio (incluse 3 iterazioni di mockup visivi, l'
      ultima ispirata a uno screenshot reale di Metadieta fornito da
      Fabrizio, ma con estetica NutriGest propria): bivio iniziale "Genera
      con AI" / "Componi a mano"; campo numero giorni libero (nessun default,
      così copre anche piani lunghi); albero a sinistra con SOLO alimenti
      singoli (non le ricette, scelta esplicita per differenziarsi da
      Metadieta) raggruppati per categoria, nomi colorati dal semaforo del
      paziente; drag & drop alimento→cella (zona vuota = nuova cella, cella
      esistente = alternativa); ricette tramite pulsante dedicato "Pesca
      ricetta" che riapre il ricettario esistente; colorazione semaforo SUL
      NOME del singolo alimento (non sulla cella), così una cella può
      contenere più alimenti della stessa categoria con colori diversi (es.
      Patata verde + Farro arancione insieme); scomposizione ricetta v1 con
      SOLO i principali (alternative aggiunte a mano, l'aggancio automatico
      registrato a parte come P33b).
    Commit 1 — ossatura (216381f): apriSceltaModalitaPiano() apre il bivio;
      _ngCreaPianoManuale() crea N giorni vuoti in formato celle; _ngRenderAlbero()
      costruisce l'albero da ALIMENTI con _ngColoreSemaforoNome() per il colore;
      drag&drop con _ngDragStart/_ngDragOver/_ngDrop/_ngAggiungiAlimento (drop su
      cella esistente via attributo data-ng-cell = alternativa, drop su zona
      vuota = nuova cella); editor split sinistra/destra con
      _ngRenderEditorManuale(); salvataggio e PDF riusano _salvaPianoCache/
      generaPDF/espandiPiano esistenti — il formato dati prodotto
      ({giorno,pasti:{slot:{celle:[...]}}}) è identico a quello del piano AI,
      piena compatibilità verificata contro espandiPiano().
    Commit 2 — scomposizione ricette (d64ab64): pulsante "Pesca ricetta"
      riattivato con _ngPescaRicetta() (apre il ricettario filtrato per
      categoria slot); parser ingredienti _ngParseIngrediente()/
      _ngScomponiIngredienti() testato su 7 casi reali del ricettario
      (grammi diretti, grammi tra parentesi con conteggio tipo "Uovo intero 1
      (60g)"→60g e "Wasa 3 fette (30g)"→30g, pattern "X o Y"→prende solo X,
      scarto corretto di q.b./spezie senza peso come "Aglio 1 spicchio" e
      "Prezzemolo q.b."); categoria per il colore semaforo risolta da
      _ngTrovaCategoriaAlimento() con tre livelli di match (esatto →
      NOMI_CANONICI → parziale); _ngScomponiRicettaNelPasto() crea una cella
      per ingrediente, bilanciando le colonne sx/dx.
    Verifiche fatte: sintassi JS a ogni step (node --check), test logico
      isolato del parser sui 7 casi reali, test end-to-end della scomposizione
      (Carbonara di funghi → 4 celle corrette, aglio e prezzemolo
      correttamente saltati, categorie del semaforo risolte correttamente:
      Cereali con Glutine, Verdura, Uova, Olio & Condimenti).
    Confermato funzionante sul campo da Fabrizio dopo entrambi i commit
      ("funziona tutto procedi").
    Roadmap: nate P33b (aggancio automatico alternative per categoria,
      deliberatamente rimandato — prima va provato il flusso solo-principali
      sul campo) e P33c (idea di Fabrizio: modalità "piano lungo" 10-12+
      giorni con ricetta singola per pasto senza alternative, ispirata dalla
      presenza delle kcal su ogni ricetta — da pensare, non ancora
      progettata). Il campo numero-giorni di P33 (max 31, nessun limite
      stretto) già supporta tecnicamente piani lunghi.
    Modello: Opus High + Thinking ON (architettura del piano, nuovo flusso di
      composizione, parsing con casi-limite).
    Commit: 216381f → d64ab64.


  Sessione breve, tre modifiche scollegate tra loro, tutte Sonnet 4.6 Low/Medium,
  Thinking OFF — nessun dato paziente coinvolto in nessuna delle tre.

  1) Pulsante "+ Aggiungi spuntino mattina/pomeriggio" (P10, riapertura):
    Trigger: Fabrizio vuole sostituire il vecchio popup "Ricette compatibili"
      (apriPannelloRicette, filtrato solo sulle ricette salvate per quella
      categoria) con il popup "Scegli categoria" già usato per "+ Aggiungi
      alimento" nei pasti esistenti — accesso a tutto il catalogo ALIMENTI
      filtrato sulle preferenze del paziente, più libertà di scelta.
    Causa tecnica del perché non bastava solo cambiare l'onclick: lo slot
      spuntino non esiste ancora nel piano in questo caso (_trovaPasto
      ritornerebbe pasto:undefined), quindi apriAggiungiCella fallirebbe
      subito (if (!ctx || !ctx.pasto) return;).
    Fix: nuova funzione ngAggiungiSpuntinoVuoto(giorno, slotKey) — crea il
      pasto vuoto ({celle:[]}) nel formato dati corretto (nuovo g.pasti[slot]
      o vecchio g[slot], stessa logica già usata altrove nel file per
      distinguere i due formati), poi richiama apriAggiungiCella. Il pulsante
      "+ Aggiungi spuntino" ora chiama questa funzione invece di
      apriPannelloRicette. Il vecchio popup "Ricette compatibili" resta nel
      codice — usato solo quando si clicca sul nome di un pasto GIÀ esistente
      (comportamento non toccato, non era oggetto della richiesta).
    Commit: 879a6e9.

  2) Bug residuo P27 — label bottone salva piano rimasta sul paziente precedente:
    Sintomo riportato da Fabrizio: cambiando paziente nel generatore (es. da
      "Terenzio Ruggieri" a un altro), il bottone verde in fondo restava con
      la scritta "Aggiorna piano di Terenzio Ruggieri" anche dopo il cambio.
    Causa: pianoPazSelezionato() resetta correttamente
      window._pianoEditingId = null al cambio paziente (per non rischiare di
      aggiornare il piano del paziente sbagliato), ma non richiamava mai
      _aggiornaLabelSalvaPiano() — la funzione che scrive il testo del
      bottone in base a quella variabile. Il dato interno era già corretto,
      la UI no.
    Fix: una riga, chiamata a _aggiornaLabelSalvaPiano() subito dopo il
      reset di _pianoEditingId in pianoPazSelezionato().
    Commit: 61e9604.

  3) P5 — AI corregge/completa anche il titolo ricetta (non solo i macro):
    Trigger: in "+ Aggiungi ricetta" → tasto "✨ AI" (aiSuggerisciRicetta),
      Fabrizio vuole che l'AI possa anche modificare il titolo in base alla
      ricetta effettivamente generata, non solo compilare macro/ingredienti
      a partire da un titolo fisso.
    Decisione finale: diversa da quella originariamente prevista in roadmap
      ("suggerimento da confermare, non sovrascrivere subito" — per non
      perdere il titolo dettato a voce). Fabrizio ha chiesto sovrascrittura
      diretta nello stesso giro di chiamata AI.
    Fix: prompt esteso con un campo nome (titolo corretto/completato/ben
      formattato — istruzione esplicita di espandere titoli brevi o generici
      in un nome descrittivo, es. "pollo riso" → "Petto di pollo grigliato
      con riso basmati e verdure"; titolo già corretto → restituito
      invariato). Risposta: se ric.nome è presente, sovrascrive r-nome.
      Non differenzia per campo tipo (completo/contorno) — stesso
      comportamento per entrambi.
    Commit: 01dd853.

  Verifica sintassi: node --check (estrazione script inline) dopo ognuna
    delle tre modifiche, nessun errore.

29 GIUGNO 2026 (sessione successiva) — P22 Vista Consulto/Riepilogo chiamata +
  P1 Ottimizzazione token ricettario:

  P22 — Vista Consulto / Riepilogo chiamata (commit 63c5128 + 1744b20):
    Trigger: Fabrizio vuole un riepilogo dei dati più importanti del paziente
      prima/durante una chiamata telefonica, senza dover saltare tra le tab.
    Decisione finale: layout completo "tutto sotto gli occhi anche scrollando",
      non compresso — priorità ad avere tutte le informazioni funzionali alla
      chiamata, scroll accettato.
    Step 1 (FX): prompt FX esteso da 2 a 4 sezioni — Sezione 3 "Cosa proporre
      (ora)" (3-4 azioni operative per la prossima fase) + Sezione 4 "Percorso
      5-7 mesi" (mini-roadmap a fasi: mesi 1-2 / 3-4 / 5-7). max_tokens FX
      1400→2000.
    Step 2 (vista): nuova tab "📞 Riepilogo chiamata" in barra paziente
      (renderPdRiepilogo, agganciata in openPaz e in pdTab per l'auto-fire).
      Due colonne: sinistra trend peso multi-punto (curva SVG da p.inbody,
      ultimi 4 valori), indici clinici fuori range (riusa CALCOLI_CLINICI +
      calcolaIndice, stesso semaforo giallo/rosso della tab Analisi sangue),
      macro piano corrente (_getActiveMacrosTarget); destra note cliniche
      recenti (ultime 3 da p.noteClinica), domande aperte (vedi STRUTTURA DATI
      p.domandeChiamata), routine alimenti funzionali (p.routineGiornaliera).
      Sezione "Storia del paziente" sotto: aggiustamenti macros
      (p.aggiustamentiMacros), integratori/farmaci, quadro clinico
      (patologie/allergie/condSpeciali).
    Auto-rigenerazione FX: box "Cosa proporre" confronta una firma dei dati
      clinici (_riepDataSig) con quella salvata all'ultima analisi
      (p.ragionamentoClinico.fxSig — vedi STRUTTURA DATI). Se diversa, rigenera
      l'FX da sola all'apertura della tab (banner giallo "dati cambiati",
      poi chiamata avviaFX). Auto-fire SOLO on-open della tab, non ad ogni
      apertura paziente, per non sprecare token ad ogni click. Pulsante manuale
      "🔄 Aggiorna" sempre presente; primo utilizzo su paziente mai analizzato →
      "🧠 Genera analisi".
    Escluso da questa v1: Preferenze cibi (p.alimenti, struttura a chiavi-stato
      complessa) — valutare mapping dedicato in una sessione futura se richiesto.
    Iter di design: 3 mockup proposti (Cruscotto clinico / Scaletta chiamata /
      Due colonne) via tool Visualizer prima di scrivere codice, poi convergenza
      su layout Due colonne con aggiunte (trend multi-punto, sangue fuori range,
      domande aperte, storia completa) decise insieme a Fabrizio su mockup
      successivi, prima dell'implementazione reale.

  P1 — Ottimizzazione token ricettario (commit 96e21b4):
    Trigger: punto di roadmap "Priorità 2 — Architettura ricettario", prossimo
      nella catena di dipendenze dopo P32/P5 (chiusi) e prima di P33/P37.
    Scoperta in analisi: leggendo costruisciPrompt (builder reale del prompt
      piano — il blocco prompt dentro generaPiano() a riga ~11868 è codice
      morto, mai usato) emerge che il Livello 2 (indice compatto: solo titoli
      ricetta, non descrizioni lunghe) e il Livello 3 (dettaglio recuperato
      lato app, zero token: l'AI riceve solo il titolo come "ispirazione",
      mai ingredienti/macro) erano già di fatto implementati, senza che fosse
      documentato in roadmap. Mancava solo il Livello 1 (filtro pre-invio).
    Fix (versione conservativa): nuova funzione _ricSlot() determina il pasto
      di una ricetta da cat/tags; ricetteDB filtrato per pasto attivo del
      paziente (_mealActive). Ricette a metadata ambigua/assente vengono
      SEMPRE tenute (oggi la maggioranza — solo 6/75 ricette default hanno
      cat/tags puliti come pasto; le altre voci `cat` sono profili paziente,
      es. "Obesità II – sedentario, dimagrimento", non categorie pasto) → la
      qualità dei piani non può peggiorare, si toglie solo ciò che è
      palesemente fuori-slot. Tetto di sicurezza: max 80 titoli inviati.
    Effetto pratico oggi: minimo (ricettario poco taggato). Diventa efficace
      con P37 (caricamento massivo + tag normalizzati) — filtro già pronto,
      scala con la crescita del ricettario.

  Verifica sintassi: node --check (estrazione script inline) dopo ogni
    modifica (FX, vista, filtro P1), nessun errore.

28 GIUGNO 2026 (sessione successiva) — Fix uscita accidentale dai modali:
  Trigger: Fabrizio segnala che, modificando un piano alimentare (in particolare
    aggiungendo un alimento), un click accidentale fuori dal riquadro visibile
    chiude il modale senza preavviso, con perdita di quanto si stava facendo.
    Problema confermato generale, non limitato al piano.
  Passo 1 (Sonnet 4.6, poi rivalutato Opus High/Thinking ON per l'estensione
    a tutta l'app — commit 4e86631 cumulativo coi passi successivi):
    - Disabilitata la chiusura al click sullo sfondo su tutti gli 8 modali
      standard (.overlay/.modal, sia statici con id mo-* sia dinamici in JS)
      e sui 2 popup non-standard già noti (routine, modelli rotazione).
    - X iniettata automaticamente su ogni .modal via MutationObserver
      (ngUpgradeModali/ngAggiungiX), con conferma obbligatoria alla chiusura
      (ngChiudiModale, basata su confirm() nativo).
  Bug residuo trovato da Fabrizio dopo il primo giro: il problema persisteva
    nel flusso "+ Aggiungi alimento" del piano. Causa: 4 popup costruiti a
    mano con position:fixed (popup-add-cat, popup-add-alt, popup-ric,
    popup-ricetta-composta — categoria→alimento→eventuale ricetta composta
    pancake/avena), MAI passati dalle classi .overlay/.modal standard, quindi
    invisibili alla prima bonifica. Trovati con ricerca esaustiva del pattern
    "e.target===" (firma del click-outside) su tutto il file: dopo il fix,
    zero occorrenze residue in tutto index.html.
  Passo 1-bis (Sonnet 4.6 Medium): disabilitata la chiusura sullo sfondo sui
    4 popup + aggiunta ngChiudiPopupCoppia(popId,bgId) per gestire la X anche
    quando popup ed elemento di sfondo sono due nodi DOM separati (non un
    unico overlay come negli altri modali). Le 4 X ora chiedono conferma
    come ovunque nell'app.
  Passo 2 (footer, decisione esplicita di Fabrizio: schema identico SENZA
    eccezioni anche sui 3 casi "speciali" — elimina concetti, avviso
    informativo, selettori template/paziente): tutti i 13 footer (.mf)
    dell'app — 7 statici + 6 dinamici — uniformati a Annulla rosso (.btn-r)
    + Conferma verde (.btn-v), piena larghezza. Nuove classi CSS .btn-v/.btn-r
    e regola .mf .btn per il padding pieno. Verificato con node --check ad
    ogni passo, nessun errore di sintassi in tutto il processo.
  Commit: 4e86631 (X+stop click-outside, inclusi i 4 popup) → 3bc09aa (footer
    uniformi). Vedi UI — PALETTE E REGOLE STILE → sottosezione MODALI per il
    dettaglio tecnico stabile (helper riutilizzabili per nuovi modali futuri).

28 GIUGNO 2026 (continuazione) — P32 chiuso, ricettario completo vs contorno:
  Sessione diretta (non ricostruita), avviata dopo la ricostruzione di
  Frutta/Concetti dalla sessione precedente. Fabrizio ha confermato di voler
  procedere su P32, segnalato come "ne abbiamo solo parlato, non so se l'ho
  fatto" — verificato nel codice scaricato fresco da GitHub: il campo `tipo`
  P32 NON esisteva, confermato che era rimasto solo a livello di decisione
  discussa, non implementata.

  Richiesta originale di Fabrizio: quando si modifica una ricetta di un piano
  cliccandone il nome, poter scegliere dal ricettario una ricetta che SOSTITUISCE
  quella attuale, oppure (per ricette come "Spaghetti di zucchine con menta e
  aglio" o "Insalata di carote, barbabietole e pangrattato") una ricetta che si
  AGGIUNGE invece di sostituire. Punto di svolta nella discussione: questi
  esempi sono multi-ingrediente, quindi il criterio originale di P32 ("singola
  categoria = si aggiunge") non reggeva — il criterio reale è la FUNZIONE
  (sostituisce vs aggiunge), non la struttura della ricetta. Da qui la
  decisione finale: campo `tipo` con valori `completo` / `contorno`,
  terminologia scelta da Fabrizio (preferita a "componente/pasto completo").

  Letture preliminari (prerequisito hard di P32, prima di toccare codice):
  mappato il flusso completo di editing ricetta-in-piano — popup
  `_mostraPopupEditRicetta` con tab Scrivi/Ricettario, array `pasto.ricette[]`
  già esistente (max 4 per pranzo/cena, 1 per gli altri slot), funzioni
  `apriEditRicetta`/`aggiungiRicetta`/`rimuoviRicetta` già pronte. Confermato
  che `RICETTE_COMPOSTE` (pancake parametrici) è un sistema indipendente, non
  toccato. Mockup interattivo mostrato a Fabrizio prima di scrivere codice per
  validare la UX sostituisce/aggiunge.

  9121f07 — feat: P32 passo 1/2. Campo `r.tipo` sulla ricetta (default
            'completo', retrocompatibile — tutte le ricette esistenti restano
            'completo' senza bisogno di migrazione). Selettore "Tipo" nel modal
            Ricette accanto a Categoria: "Pasto completo (sostituisce)" /
            "Contorno (si aggiunge)". `salvaRic`/`editRic`/`openNuovaRic`
            aggiornate per leggere/scrivere/resettare il campo.
            Passo 2/2 stesso commit: nel popup di editing piano, click su una
            ricetta `contorno` dal ricettario FONDE il testo nella riga
            esistente con separatore " + " invece di sostituirla (click su
            `completo` sostituisce come prima — comportamento legacy intatto).
            Funzione `salvaRicetta` accetta ora un secondo parametro `tipo`.
            Validato: sintassi JS su tutto l'inline + test funzionale isolato
            dei 5 casi limite del merge (riga piena+completo, riga piena+
            contorno, doppio contorno, riga vuota+contorno, tipo assente→
            sostituisce per retrocompatibilità).

  Feedback Fabrizio dopo test: la fusione funziona, ma vuole i contorni
  raggruppati in una sezione separata dal ricettario normale invece che
  mescolati con badge, per trovarli più in fretta — terza richiesta esplicita:
  "non li voglio mescolati, le ricette complete nel ricettario e le ricette
  parziali nella nuova sezione".

  b1f5ede — feat: nuovo terzo tab "🥗 Ricette parziali" nel popup di editing
            ricetta-in-piano, accanto a Scrivi e Ricettario. Generalizzata
            `renderRicettario` in `renderListaRicette(listEl, filtro,
            tipoFiltro)` condivisa: il tab Ricettario ora filtra SOLO
            `tipo==='completo'`, il nuovo tab Ricette parziali filtra SOLO
            `tipo==='contorno'` — separazione netta, non più liste mescolate
            con badge (badge rimosso, ridondante visto che ora il tab stesso
            comunica il comportamento). Ricerca testuale indipendente nei due
            tab. Limiti per slot invariati (1 colazione/spuntini/pre-nanna, 4
            pranzo/cena) — i contorni si fondono nella riga quindi non
            occupano slot aggiuntivi anche dove il limite è 1.
            Validato: sintassi JS su tutto l'inline + test funzionale isolato
            della funzione di filtro (separazione completo/contorno per
            categoria pasto, ricerca testuale in entrambi i tab, retrocompat
            ricette senza campo tipo → finiscono nel Ricettario).

  Residuo aperto, non richiesto in questa sessione: i macros (kcal/P/C/G) del
  contorno non vengono sommati a quelli del pasto — `pasto.ricette[]` è testo
  descrittivo, la fusione è puramente testuale. Se in futuro serve che il
  contorno incida sui macro calcolati del pasto, è lavoro separato e più ampio.
  P5 (titolo AI ricette) era agganciato alla vecchia decisione P32
  (componente/completo per struttura) — quel criterio non esiste più, P5 resta
  aperto ma scollegato, da ripensare da zero se ancora interessa.

28 GIUGNO 2026 — Frutta nei pasti + Concetti select/elimina + fix sync pazienti + layout 4 colonne:
  NOTA RICOSTRUZIONE: chat originale di lavoro su Frutta+Concetti cancellata da
  Fabrizio senza aggiornare roadmap/contesto. Sessione successiva ricostruita
  leggendo lo storico commit su GitHub (fonte di verità, sempre disponibile anche
  se la chat è persa) — nessun dato di codice perso, solo i due file di
  pianificazione erano disallineati. Procedura adottata: in futuro, se una chat
  con modifiche in sospeso viene persa, ricostruire da `git log` su GitHub
  prima di assumere che il lavoro sia perso.

  19f72b7 — feat: Frutta nei pasti. Casella per pasto sul rigo header (editor).
            Selettore stile per paziente: Generico ("+ frutta" testuale) o
            Stagionale (emoji a rotazione via Twemoji/EMOJI_MAP). Rotazione
            deterministica per indice, niente ripetizioni adiacenti tra mesi.
            Coerenza forzata tra vista editor e generazione PDF (preload emoji
            incluso nel rendering PDF).
  9ac394c — feat: Frutta, aggiunte banana e ananas al pool stagionale (pool
            arrivato a 11 frutti totali). Estesa la rotazione anche tra le
            alternative dello stesso pasto (non solo tra mesi/giorni diversi).

  1ba666a — feat: Concetti Educativi, modalità di selezione multipla con
            eliminazione. Flag `db.concettiMigrato` persistente (stesso pattern
            anti-resurrezione già usato altrove) per evitare che i concetti seed
            eliminati rispuntino dopo un reload/sync.
  cd5a14a — fix: Concetti, pulsanti Seleziona/Elimina/Annulla riportati a
            dimensione normale (regressione visiva del commit precedente).

  10c5a87 — fix: bug riportato da Fabrizio in chat — eliminare un paziente e poi
            sincronizzare lo faceva rispuntare. Causa: `eliminaPaz()` rimuoveva
            il paziente solo in locale; non esisteva una `delPazienteSupabase`
            dedicata (a differenza di ricette/entrate/eventi/piani, che l'hanno
            già). Il pull successivo riscaricava tutte le righe rimaste su
            Supabase, paziente eliminato compreso. Stesso problema per gli
            eventi collegati al paziente. Fix: aggiunta `delPazienteSupabase(id)`
            sul modello delle altre `del*Supabase`; `eliminaPaz` ora è async,
            cattura gli eventi collegati PRIMA di filtrarli localmente, elimina
            dal remoto sia il paziente sia quegli eventi, poi `save()`.
            Nota lasciata a Fabrizio: i pazienti eliminati prima di questo fix
            possono avere ancora una riga residua su Supabase — vanno
            rieliminati una volta con la nuova logica per pulirla del tutto.

  a6aec49 — feat: layout pazienti, da 3 a 4 colonne su desktop. Scelta tra 3
            alternative proposte (lista compatta raggruppata per lettera /
            card raggruppate per stato clinico / card attuali più compatte a 4
            colonne) — Fabrizio ha scelto la terza, cambio minimo rispetto
            all'esistente. `.paz-grid` minmax 270px→200px, padding/avatar/font
            ridotti, nome e meta con ellissi per evitare overflow su card più
            stretta. Nessuna logica toccata, solo CSS.
  (commit minore, stesso giorno, non isolato) — aggiunta opzione "Nome A→Z"
            al selettore ordinamento pazienti (`sort-paz`), prima c'erano solo
            Cognome A→Z e Più recenti. Richiesta esplicita di Fabrizio.

27 GIUGNO 2026 — P10 (spuntino manuale) + P15 (nuovi alimenti):
  a0b83b7 — feat: P10, slot spuntino manuale post-generazione (approccio A confermato:
            la decisione di scheda paziente Sì/No spuntino mattina/pomeriggio resta
            intoccata — generatore e prompt AI non modificati). Novità: in
            renderPianoConPillTabs, se lo slot spuntino_mattina/pomeriggio non è
            presente per il giorno aperto, al posto della riga (prima saltata del tutto)
            compare un pulsante tratteggiato "+ Aggiungi spuntino mattina/pomeriggio"
            che apre apriPannelloRicette già esistente, per quel giorno specifico (non
            tutti i giorni insieme — scelta esplicita). Colazione/pranzo/cena/pre_nanna
            invariati (comportamento identico a prima se assenti).
            Fix collegato (stesso commit): applicaRicettaPasto scriveva sempre su
            giornoObj[slotKey], anche quando il giorno è in formato nuovo
            (giornoObj.pasti[slotKey]) — creava una chiave duplicata a livello giorno
            invece di scrivere dentro pasti. Bug preesistente, capitava già su
            colazione/pranzo/cena in formato nuovo; reso più probabile da P10 perché
            invita a usare lo stesso flusso anche per lo spuntino. Fix: rileva il
            formato (isFormatoNuovo = !!giornoObj.pasti) e scrive nel punto giusto in
            entrambi i casi.
            Falso allarme verificato in sessione: PDF di un paziente mostrava
            "SPUNTINO MATTINA" vuoto anche senza spuntino attivo — causa non era P10,
            ma un piano salvato il 24 giugno (prima di P28 whitelist e di P10), residuo
            pre-fix. Confermato risolto rigenerando il piano: measurePasto/drawPasto
            nel modulo PDF già escludono correttamente uno slot {} (nessuna modifica
            necessaria lì).
            Validato: sintassi JS su tutto l'inline + mock Node su entrambi i formati
            piano (vecchio/nuovo) per applicaRicettaPasto, nessun doppione prodotto.

  1300250 — feat: P15, 14 nuovi alimenti in Preferenze cibi + CREA_ALIMENTI.
            Cereali con Glutine: Fiocchi di farro (40g), Biscotti secchi (30g),
            Biscotti frollini (30g), Puccia salentina (100g).
            Olio & Condimenti: Pesto basilico (20g), Pesto rucola (20g).
            Categoria NUOVA "Integratori sportivi": Proteine Whey/Caseine/Vegetali
            (30g, separate su richiesta esplicita), Mass gainer (100g), Maltodestrine
            (30g) — classificati 'fit' nel fallback funzionale (non 'carbo' puro,
            sono integratori specifici, non alimenti comuni).
            Categoria NUOVA "Alcolici": Birra (330ml), Vino (150ml), Gin tonic (200ml)
            — nessun colore di default nel master (il semaforo è sempre per-paziente),
            ma indicazione clinica documentata in commento: Vino → arancione,
            Birra/Gin tonic → rosso, da impostare a mano quando attivati su un paziente.
            Fix collegato necessario (stesso commit): getCategoriaFunzionale() usa
            ALIMENTI solo per override espliciti — il punto 2 della funzione
            (Object.isArray(lista)) non scatta mai sul formato reale {items:[...]},
            quindi ogni nuovo alimento sarebbe caduto nel fallback regex per parole
            chiave. Aggiunte le regex mancanti (proteine whey/caseine/vegetali→
            proteine, mass gainer/maltodestrine→fit, pesto→olio, biscotti/fiocchi di
            farro/puccia→carbo, birra/vino/gin tonic→condimento di default).
            Bug scoperto e corretto in corsa: "Pesto rucola" veniva intercettato dalla
            regex di "verdura" (contiene "rucola") prima di arrivare al controllo
            "pesto" → spostato un controllo esplicito ^pesto prima del blocco verdura.
            _CAT_SEMAFORO_TO_FUNZIONALE (mappa categoria-semaforo→funzionale più vecchia,
            con chiavi tipo 'Cereali con Glutine') risultata già morta per lo stesso
            motivo (Array.isArray fallisce su {items:[...]}) — bug preesistente più
            ampio, FUORI scope da P15, non toccato, da valutare a parte.
            Validato: presenza nei due database con nomi corrispondenti (14/14),
            classificazione funzionale corretta sui 14 nuovi alimenti, nessuna
            regressione sulla classificazione dei ~200 alimenti esistenti (test mirato
            su Rucola/Lattuga per confermare il fix pesto non rompe l'ortaggio).

27 GIUGNO 2026 — Feature "Template di piano" + P27 (salva/aggiorna piano):
  4fd39b2 — feat: libreria di piani-modello riutilizzabili (fuori numerazione P1-P53)
            Nuova struttura db.templatePiani, sync su tabella Supabase "piani" esistente
            con flag _isTemplate (pazienteId='__TEMPLATE__', nessuna tabella nuova).
            Un template copia SOLO struttura pasti + ricette, non le regole/preferenze
            del piano (quelle restano del paziente di destinazione); target sempre
            ricalcolati sul paziente a cui si applica. Salvataggio da due punti: pagina
            Piano ("Salva come template riutilizzabile") e Storico Piani (per ogni card).
            Applicazione da due punti: pagina Piano ("Usa template", sul paziente già
            selezionato) e libreria nello Storico ("Applica", con scelta paziente).
            Conflict-check non bloccante: confronta gli alimenti del template (estratti
            sia da formato compatto {n,g} sia da formato pasti/celle {nome}) con gli
            esclusi/rossi/grigioScuro del paziente di destinazione, match per nome con
            regex a confini di parola (evita falsi positivi tipo "Uva" su "Uvetta").
            Mostra un avviso elenco dopo l'applicazione, il medico sostituisce a mano.
            Refactor collaterale: estratta da riapriPiano la logica di montaggio piano +
            calcolo target in helper condiviso _montaPianoCorrente, riusato anche da
            applicaTemplate — single source of truth, evita due istanze dello stesso bug.
            Namespace verificato non in collisione con MODELLI_ROTAZIONE (feature
            esistente di rotazione settimanale, tabella/chiavi diverse).
            Validato: sintassi JS su tutto l'inline + mock funzionale 13/13 sul
            conflict-check (estrazione nomi, esclusioni, word-boundary, no falsi positivi).

  be2cd9f — fix: P27 salva/aggiorna piano con stato editing, niente più doppioni
            Bug: il tasto "Salva piano" creava sempre un id nuovo → doppioni (7 piani
            Nunzia). Introdotto window._pianoEditingId (id del piano in modifica, null =
            piano nuovo) con etichetta dinamica del tasto ("Aggiorna piano di X" /
            "Salva piano definitivo"). Si popola in riapriPiano, si azzera in
            inizializzaP2 (nuova generazione), in pianoPazSelezionato al cambio reale
            di paziente (anti-overwrite incrociato), e in applicaTemplate (un template
            applicato crea sempre un piano nuovo). pushPianoSupabase faceva già upsert
            (Prefer: resolution=merge-duplicates) — nessuna modifica lato Supabase
            necessaria, il bug era solo client-side. id orfano (piano cancellato nel
            frattempo) degrada automaticamente a "nuovo".
            Validato: mock 17/17 sulla macchina a stati (salvataggi ripetuti senza
            doppioni, riapri→aggiorna, cambio paziente→nuovo, template→nuovo, id
            orfano→degrado, no-op su riselezione stesso paziente).
            Migrazione manuale residua: 7 doppioni Nunzia da eliminare a mano dallo
            Storico Piani — non automatizzato, scelta clinica di quale tenere.

25 GIUGNO 2026 — 2ª SESSIONE (continuazione) — Blocco 3 completato per intero
  (P26 + P18 Fase A + P17 Fasi B/C/D):

  c9fab21 — P26: fix target kcal. Bug: salvaRagionamento estraeva le kcal col primo
    match /(\d{3,4})\s*kcal/i su _ragRiassunto → se il testo citava MB o TDEE prima
    del target, salvava quei valori invece del target deciso. Ricontrollato il piano
    iniziale (Approccio A su avviaFX) e corretto: la fonte giusta è _ragRiassunto
    POST-RAFFINAMENTO (non l'output FX grezzo), perché se Fabrizio cambia le kcal in
    chat il numero finale corretto è solo nel riassunto. Fix: (1) prompt del riassunto
    impone riga obbligatoria "🎯 TARGET FINALE: X kcal"; (2) salvaRagionamento ancora
    la regex lì; (3) OPZIONE 2 (decisione utente): se l'ancora o un macro manca, il
    testo si salva ma macrosDecisi resta null, avviso "rilancia Concludi e Riassumi"
    — mai un numero potenzialmente sbagliato salvato in silenzio. BUG GEMELLO scoperto
    durante la verifica (non previsto): stessa regex fragile nel fallback del
    generatore (apriGeneratoreDaRag) — corretto anch'esso, se manca l'ancora il
    generatore ricade sul calcolo da TDEE. Validato: mock su 5 casi incluso il bug
    originale (MB 1500 + TDEE 2200 prima di TARGET FINALE 1800 → ora prende 1800).

  ec1a313 — P18 Fase A: fix trappola checkbox analisi del sangue. Bug: i due consumer
    (costruisciContestoPaziente riga ~5398, generatore riga ~7946) filtravano su
    _check===true → un valore inserito SENZA spuntare la casella non arrivava mai
    all'AI. Decisione utente: checkbox ELIMINATA del tutto, basta il valore non vuoto
    nel campo _val. UI riorganizzata: sezioni collassabili (aperte se hanno ≥1 voce
    compilata, chiuse se vuote), badge "N compilate"/"vuota", voci compilate
    evidenziate in verde con bordo. Update incrementale via parametro changedKey
    (niente perdita di focus mentre si digita). _check legacy nei pazienti vecchi
    resta come dead-data ignorato dai consumer (nessuna migrazione necessaria).
    Validato: sintassi + mock su 5 casi consumer + 7 verifiche sul rendering.

  8e5be39 — P17 Fase B + D parziale: modulo "Calcoli clinici", prima stesura.
    7 campi nuovi in ANALISI (Neutrofili, Linfociti, Transferrina, Testosterone
    totale, Estradiolo, Albumina urinaria, Creatinina urinaria) + costante
    CALCOLI_CLINICI con 14 indici iniziali: Tot/HDL, LDL/HDL, TG/HDL, non-HDL,
    HOMA-IR, TyG, BUN/Creatinina, Fabbisogno idrico, FT3/FT4, AST/ALT (De Ritis),
    NLR, Ferritina/Transferrina (rapporto numerico — distingue infiammazione,
    sovraccarico, carenza funzionale), T/E2 (solo maschi, hidden su femmina), ACR.
    Ogni indice: formula, soglie semaforo (verde/giallo/rosso/info), glossario ℹ️
    (cosa misura · range · nota clinica). 3 CORREZIONI fatte durante il mock testing
    (non nella prima stesura): soglie TyG sbagliate di un ordine di grandezza (la
    formula logaritmica dà ~8-9 non ~4.5, corretto a 8.6/9.0); soglie HOMA-IR troppo
    stringenti (paziente sano risultava giallo, rilassate a <2 verde); formula ACR
    con errore di conversione mg/dL→g/L (corretta a albumina×100/creatinina).
    Validato con un "paziente sano simulato": 13/14 indici verdi dopo le correzioni.

  7659c1a — P17 Fase C: i calcoli arrivano a FX. Toggle 📤 "includi nel ragionamento
    FX" per-indice, DEFAULT ON per tutti (decisione utente). Stato persistente in
    p.calcoliClinici.includi[id] — solo false esplicito esclude (undefined→incluso).
    Toggle visibile solo sui calcoli ok (non su quelli con dati mancanti — non ha
    senso un interruttore su un calcolo che non esiste). costruisciContestoPaziente
    aggiunge sezione "Calcoli derivati rilevanti: Tot/HDL 3.27 (ok) · HOMA-IR 1.78
    (ok) · ..." con etichetta semaforo (ok/borderline/ALTERATO). Generatore piano
    NON riceve i calcoli (scope limitato a FX per decisione, possibile estensione
    futura simmetrica). Validato: mock su 5 casi (default ON paziente nuovo,
    esclusione persistita, contesto FX che riflette le inclusioni/esclusioni).

  70b2c2a — P17 Fase D (residuo): completamento del modulo a 18 indici. 3 campi
    nuovi nell'InBody (Girovita cm, Pressione SIST., Pressione DIAST. — persistiti
    come girovita/paSbp/paDbp), ApoA1 nelle analisi (sezione cardiovascolare).
    4 calcoli aggiuntivi: WHR (letto da InBody.cintFianchi già esistente, soglie
    SESSO-SPECIFICHE M<0.90/F<0.80 verde), WHtR (girovita/altezza, cutoff universale
    0.5), PA media (DBP+(SBP-DBP)/3), ApoB/ApoA1 (predittore INTERHEART, miglior
    singolo indice di rischio infarto). Motore calcolaIndice esteso per leggere
    dipendenze dall'ultimo InBody (_peso,_altezza,_girovita,_cintFianchi,_sbp,_dbp)
    e per soglie sesso-specifiche generiche (prima solo "hidden" su T/E2). Validato:
    9 mock sui 4 nuovi calcoli + un "paziente completo" che esercita tutti i 18
    indici con 0 missing.
    DEBITO TECNICO aperto (non bloccante): "Creatinina + eGFR" è un campo unico —
    se il medico inserisce eGFR invece della creatinina sierica, BUN/Creatinina dà
    un risultato senza senso clinico. Andrebbe splittato in due campi (~15 min).

  Riepilogo sessione: 6 commit puliti totali (84e776a→70b2c2a), Blocco 3
  completamente chiuso. Residuo APERTO non di Blocco 3: riassunto paziente
  motivante in linguaggio caldo allegabile al PDF (era parte di P16, via P6).


25 GIUGNO 2026 — 2ª SESSIONE — Blocco 3 / P16 completato (unione F1+F3 in FX):
  84e776a — P16: le due chiamate AI parallele del ragionamento clinico (avviaF1
    900 tok "📊 Macros & Bilancio" + avviaF3 450 tok "⚠️ Alert Clinici", lanciate
    con Promise.allSettled) sono state fuse in UNA sola funzione avviaFX (sonnet-4-5,
    max_tokens 1400). Il system prompt produce due sezioni in un unico output
    (📊 Sezione 1 ex-F1: macros+composizione+parere · 🏥 Sezione 2 ex-F3: flag
    clinici). Il contesto paziente (costruisciContestoPaziente) viene inviato UNA
    volta sola invece di due → risparmio sull'input (il buco di P16), output
    invariato. Orchestratore avviaAnalisiParallela → avviaAnalisi (chiamata singola,
    try/catch). UI: i due riquadri affiancati → pannello unico "🧠 Analisi clinica
    (FX)". Stato _ragFlussi da {f1,f3} a {fx}, con reload RETROCOMPATIBILE (pazienti
    già salvati con flussi:{f1,f3} → concatenati in fx; nuovi salvano flussi:{fx}).
    Chiave logica macrosDecisi.source 'f1'→'fx' aggiornata in modo atomico nei 4
    punti che la leggono (2 consumatori che distinguono ragionamento-clinico da
    TDEE-salvato + 2 produttori in _getActiveMacrosTarget) + 5 etichette a video
    "F1"→"FX". La logica "ultimo salvataggio vince per timestamp tra TDEE e FX" era
    già corretta: solo rinominata l'etichetta. SCELTA: la sottosezione "⚡ Flag
    rapidi" di F1 rimossa (ridondante con 🏥 Flag clinici nel pannello unico).
    Validato: sintassi (node -e new Function) + mock funzionale (winner-logic nei
    3 casi TDEE/FX/solo-FX, contesto inviato 1 volta sola, reload retrocompat
    vecchio/nuovo). Push pulito fast-forward 7218970..84e776a.
    NON FATTO in questa sessione (residui di P16): (1) "riassunto paziente" =
    seconda riscrittura di FX in linguaggio caldo/motivante allegabile al PDF via
    P6; (2) P26 (bug regex kcal in salvaRagionamento) — invariato; la funzione
    avviaF1 citata in P26 è ora avviaFX.


25 GIUGNO 2026 — Blocco 6 / P11 completato (riepilogo settimanale):
  2a370da/7218970 — P11: renderRiepilogoSettimana (riga ~7092) riscritta.
    Vista A "Griglia giorni": prima mostrava solo cella.alimenti[0] (prima cella
    di ogni pasto, ignorando le altre); ora raggruppa per categoria funzionale
    reale (campo `categoria` su ogni alimento: carbo/proteine/legumi/frutta),
    leggendo TUTTE le celle del pasto. Verdura sempre omessa (sempre presente,
    non serve ripeterla). Fallback: se un pasto ha solo categorie fuori
    whitelist (fit/condimento/olio/grasso — es. pizza/piatto unico/sabato
    libero), le mostra comunque in stile neutro invece di lasciare il pasto
    vuoto. Vista B "Macros/giorno": stessa logica di calcolo (calcolaMacrosPiano,
    target da _getActiveMacrosTarget), solo dimensioni ridotte (font/padding/
    barre). Vista C "Alimenti usati" (classifica frequenza top 20): rimossa
    interamente — incluso il calcolo freq{} che veniva usato anche dalla vecchia
    Vista A per il badge "alta rip.", anch'esso eliminato con la riscrittura.
    Decisione confermata via mockup interattivo (3 viste affiancate oggi/proposta)
    prima di toccare codice, come da procedura "esempi prima di decidere".
    Verificato: sintassi (node -e new Function) + test funzionale isolato con
    dati finti (incl. caso limite categoria fuori whitelist) + diff riga per
    riga del merge con origin/main prima del push, per escludere alterazioni
    accidentali su altre funzioni durante il merge automatico.
    NOTA SESSIONE: il push iniziale è stato rifiutato (rejected, fetch first) —
    causa: pull mai eseguito dopo l'ultimo push (5b58b00) fatto in una sessione
    precedente, non un conflitto di contenuto. Risolto con git pull --no-edit
    (merge automatico pulito, nessun conflict marker) poi git push. Nessun dato
    perso. Vedi roadmap, sezione "Principi operativi", per la regola sui due
    dispositivi (lavorare uno alla volta, pull sempre prima di iniziare).


  57a4871 — B2: P20 vincoli clinici nel generatore + P24-pat gotta/ossalati semaforo +
    Bieta nel DB (vedi STRUTTURA DATI/SEMAFORO/GENERATORE PIANO per dettaglio)
  023197f — P31: selezione concetti educativi da allegare al PDF (pulsante export +
    p.concettiAllegati + risoluzione da db.concetti)
  5b58b00 — UX: footer promemoria PDF solo su pagine giorni, bottoni export ridisegnati
    (opzione A gerarchica) — vedi PDF per dettaglio
  675b528/8c0759c — INCIDENTE DEPLOY GitHub Pages (non legato al codice):
    dopo il push 5b58b00, il job "deploy" del workflow pages-build-deployment ha
    fallito con "Error: Deployment failed, try again later." — disservizio
    temporaneo lato infrastruttura GitHub (confermato via ricerca: pattern noto,
    non causato da NutriGest). Re-run del job è rimasto bloccato in "Queued" per
    diversi minuti (altro pattern noto: code Actions incastrate anche con runner
    GitHub-hosted). Risolto con un nuovo commit (no semplice re-run) che ha
    sbloccato la coda: micro-modifica 675b528 → conflitto di divergenza (remoto
    aveva ref tecnici del workflow non presenti in locale, 16 commit di differenza)
    → git pull + merge (nessun conflitto reale sul contenuto, "All conflicts
    fixed") → commit di merge 8c0759c → push → deploy #345 verde in 2m23s.
    LEZIONE: se un deploy GitHub Pages fallisce con quel messaggio o resta
    incastrato in coda, NON insistere con re-run multipli — un nuovo commit reale
    (anche minimo) sblocca la pipeline più efficacemente. Verificare sempre
    confrontando raw.githubusercontent.com (repo) vs il sito .github.io pubblicato
    quando "le modifiche non si vedono" — spesso è il deploy, non il codice o la
    cache browser (testare anche in incognito per escludere la cache prima di
    sospettare il deploy).
  Contenuto delle 3 feature (dettaglio completo nelle sezioni di riferimento):
    P20: blocco VINCOLI CLINICI in costruisciPrompt, dati clinici come vincoli
      operativi non commentati, contesto emotivo escluso, nessun lucchetto piano.
    P24-pat: Gotta/Iperuricemia + Calcolosi ossalica, liste verificate nome-per-nome
      contro ALIMENTI (40+34 alimenti, zero righe morte), Bieta sanata nel DB.
    P31: renderConcettiModal ponte verso il rendering PDF dei concetti che esisteva
      già ma era orfano (paziente.concetti mai scritto) — risolto via p.concettiAllegati
      (id) → db.concetti (fonte unica) al momento della stampa.
    UX: bottoni export ridisegnati in gerarchia (Salva primario, PDF+WA secondari
      affiancati, Concetti riga-impostazione) + fix footer promemoria solo su giorni.

22 GIUGNO 2026 — Estetica footer pillole (fix) + ingrandimento adattivo pagina giorno:
  7e79ffe — feat: ingrandimento adattivo pagina giorno (scala font/celle 0.85-1.15) +
            distacco header proporzionale + footer pillole espandibili
            Scala unica (non più solo gap come in P12a originale) propagata a cellHeight,
            drawCella, measurePasto, drawPasto: 0.85 compressione (giorno pieno) ↔ 1.15
            espansione (giorno scarno, +15% font/celle, scelto su 3 opzioni proposte).
            drawDayHeader ora riceve topContent e posiziona i valori-giorno sopra il
            primo pasto, non più attaccati al nome. Distacco titolo↔primo pasto
            proporzionale: 35% dello spazio libero, max 16mm (prima fisso a 6mm).
            Footer pillole indipendenti, sempre al massimo (1.15) se c'è larghezza
            libera. Gap massimo tra pasti 14→10mm (evita buchi eccessivi su giorni
            scarni). Testato con rendering reale jsPDF in Node (script temporaneo,
            poi rimosso): drawCella a 0.85/1.0/1.15 senza crash, rapporto altezze
            esattamente 1.15/0.85=1.3529 atteso — misura e disegno restano coerenti.
            Limite noto e accettato: giorni molto scarni non riempiono mai tutta la
            pagina anche al massimo +15%, resta margine in fondo — non risolvibile
            senza alzare il tetto di scala oltre 1.15 (parametro singolo, facile da
            cambiare se richiesto in uso reale).
  d5ad75f — fix: allineamento testo footer pillole (baseline middle) + emoji allenamento
            alta intensità mancante
            Sostituito offset empirico (cy + fontSize*0.32) con { baseline: 'middle' } di
            jsPDF per centrare il testo esattamente come emoji e caselle. Bug emoji: il
            codepoint usato per "allenamento alta intensità" (1f3cb-fe0f) non esiste su
            Twemoji — quel suffisso vale solo per varianti tono-pelle/genere. Corretto in
            1f3cb (file base), verificato contro il catalogo Twemoji reale via web search.
  1118780 — style: footer promemoria PDF come pillole colorate orizzontali con emoji
            (Proposta A, scelta tra 3 mockup proposti). Sfondo colorato tenue per tipo,
            emoji+nome+4 caselle sulla stessa riga, sempre una riga sola (si restringono
            fino al 70% se non entrano tutte). 6 colori fissi: acqua verde, passi blu,
            sonno viola, allenamento bassa corallo, allenamento alta ambra, integratori
            rosa. Codepoint emoji aggiunti alla lista sempre pre-caricata.

21 GIUGNO 2026 — Blocco 5 PDF completato (P12a → P23 → P12b, ordine rispettato):
  a209cd2 — feat: P12b alternative da 3 a 6 per cella, pesi 35/25/15/10/8/7 su calcoli e
            prompt AI
            4 punti cablati aggiornati: calcolo macro giorno (2x), pannello laterale macro
            (semplificato da if/else a formula con array pesi), calcolo macro pasto nel PDF.
            Prompt AI: vincolo "MASSIMO 3" → "MASSIMO 6 alimenti per cella". Pesi ponderata
            35/25/15/10/8/7 (somma 100%) sostituiscono 40/30/30, sempre coerenti a qualsiasi
            numero di alternative (1-6). Rendering PDF (drawCella) già iterava su ali.length
            senza limite cablato → nessuna modifica necessaria lì.
  2ea3c6c — feat: P23 promemoria footer PDF (acqua/passi/sonno/allenamento/integratori) con
            toggle UI
            6 flag globali _pdfRem* (default: acqua, passi, sonno attivi). Funzione
            _appendTogglePromemoria, stesso pattern UI di P13, agganciata nei 3 punti dove
            già compare il pannello toggle nutrizionali. Acqua calcolata da peso (~32,5 ml/kg,
            ultimo InBody o p.peso). Footer: etichetta + 4 caselle vuote per voce attiva, su
            ogni pagina tranne copertina. BOTTOM si abbassa solo se almeno un promemoria attivo.
  1fe5227 — feat: P12a difesa anti-overflow PDF, compressione gap fino a 85% + avviso
            measurePasto e drawPasto ora accettano un fattore compr (default 1) che scala
            SOLO i gap verticali (+2, +2.5), mai i font — zero rischio di disallineamento tra
            misura e disegno. Nel ciclo principale: se il giorno non entra a gap normali,
            calcolo compr (clampato 0.85-1), rimisuro, e lo passo identico a drawPasto. Se
            anche a 0.85 non basta, avviso rosso visibile sotto il nome del giorno invece di
            lasciare uscire il contenuto dal foglio in silenzio. Giorni che già entravano bene
            restano bit-per-bit identici (compr=1). NOTA: questo approccio "solo gap" è stato
            superato il giorno dopo da P12a-bis (7e79ffe, vedi sessione 22 giugno sopra), che
            estende lo stesso fattore anche ai font in entrambe le direzioni.

21 GIUGNO 2026 — Collaudo procedura roadmap + P9:
  e389f2b — fix: rimosso bottone "Cancella tutti i piani"
            + funzione cancellaStoricoPiani() orfana (riga 954 HTML + riga 7815 JS).
            Azione distruttiva di massa mai usata. Decisione presa in roadmap P9.
            Prima collaudo della nuova procedura: roadmap separata dal contesto,
            P9 spostato da "Blocco 1" a "Tabella decisioni prese" come completato.
  NOTA SETUP NUOVO PC: cambiato computer (da Lenovo Yoga 510 a nuovo PC Windows).
            Git non era installato (scaricato da git-scm.com). La cartella
            Desktop\nutrigest copiata manualmente dal vecchio PC NON era un repo
            Git vero (mancava la cartella .git, invisibile, che le copie manuali
            di file non portano con sé) → "fatal: not a git repository".
            FIX DEFINITIVO: spostata la vecchia cartella (nutrigest_backup),
            poi `git clone` vero del repo GitHub in una nutrigest nuova, poi
            copiato dentro il file con la modifica, poi commit. Configurata
            anche identità Git (user.name/user.email) — richiesta solo alla
            prima volta su un PC nuovo. Da questo momento il workflow da
            terminale (comando a riga unica) funziona di nuovo su questo PC.

4 GIUGNO 2026 — Concetti educativi a fonte unica su Supabase:
  8b8566a — fix: migrazione concetti, flag _seed per fondere seed + custom senza loop
            Bug nella prima versione: migraConcetti vedeva i 15 custom già su Supabase
            (pushati senza fusione) e li scambiava per "migrazione completata", non fondendo
            mai i 21 seed → restavano 15 concetti. Fix: flag _seed:true distingue lo stato
            realmente migrato dai semplici custom. Finché _seed non è presente, fonde il seed;
            dopo, salta (anti-loop). Risultato verificato: 34 concetti visualizzati.
  08ca6c0 — feat: concetti educativi fonte unica su Supabase + fix conteggio/visualizzazione
            (1) CONCETTI_EDUCATIVI svuotato → CONCETTI_EDUCATIVI_SEED (21 concetti, tier:plus,
                autore:fabrizio). Alias let CONCETTI_EDUCATIVI riassegnato a db.concetti.
            (2) Nuove funzioni pushConcetiSupabase / pullConcetiSupabase / migraConcetti
                (riga __concetti_educativi in tabella pazienti, data={concetti:[...]}).
            (3) renderConcettiPage legge SOLO da db.concetti (prima ciclava sull'array statico
                ignorando i custom) + conteggio corretto + badge PLUS.
            (4) editConcetto/salvaConcetto/aiRiscriviConcetto/openNuovoConcetto lavorano su
                db.concetti con tier:plus, autore:fabrizio.
            (5) pull concetti aggiunto in pullFromSheets e sincronizzaTutto; push in pushToSheets.

NOTA SESSIONE 4 giugno:
  - Recupero dati: i concetti "spariti" (spirulina, zabaione, probiotici, ecc.) erano salvi
    in localStorage (chiave ng_db, 15 elementi in db.concetti) ma non visualizzati né su
    Supabase. Verificato via console prima di qualunque modifica — nulla era andato perso.
  - Decisione strategica Fabrizio: TUTTI i concetti (21 seed + custom) marcati tier:'plus'.
    Diventeranno il pacchetto premium della VERSIONE PLUS di NutriGest, da vendere ai
    nutrizionisti clienti. Selezione/miglioramento dei concetti nel tempo.
  - Roadmap SaaS chiarita in 3 passi: A) fonte unica concetti (FATTO oggi) →
    B) multi-tenancy (ogni nutrizionista i suoi dati, prerequisito vendita) →
    C) libreria condivisa read-only + sblocco premium. B e C non ancora iniziati.
  - Protocollo origine codice formalizzato: Fabrizio non modifica MAI in locale →
    GitHub main unica fonte. Eliminato il vecchio "carica il file".
  - Migrazione: gira sul browser dove ci sono i custom in localStorage. Primo avvio sul
    PC principale, poi gli altri dispositivi pullano i 34 da Supabase.

26 MAGGIO 2026 — InBody UI + silhouette segmentale + fix peso ideale + suggeritore AI:
  e2e71cf — feat: suggeritore AI gruppi clinici da analisi sangue e InBody (ALTRA CHAT)
            Bottone 🔍 Gruppi clinici nella card Analisi del sangue. Manda all'AI i valori
            del sangue + BMI/%Grassa/Viscerale dall'ultimo InBody. L'AI propone i gruppi
            semaforo pertinenti con motivazione; il medico applica solo quelli condivisi
            (nessuna spunta automatica). Completato e funzionante.
  667c4ad — fix: ripristino reset nome file PDF e input file in openInbody
            (le 2 righe erano state sovrascritte dal commit b3eecba, che era partito da un
            index.html caricato precedente alla fix 6e86fa2).
  b3eecba — feat: modale InBody orizzontale + silhouette segmentale heatmap + fix peso ideale
            (1) Modale .modal-lg 880px: campi in 3 colonne (.fr-3), segmentali in 5 (.fr-5),
                responsive a 2 colonne ≤760px.
            (2) Silhouette "Variante F" (_ibSilhouetteSegmentale in renderPdInbody): due sagome
                SVG morbide (magra teal / grassa arancio-rosso) centrate sotto il titolo, valori
                kg posizionati anatomicamente con simmetria sx/dx, tronco al centro dentro la
                sagoma, NIENTE percentuali. Colore = scostamento dalla norma (heatmap 3 livelli,
                soglie InBody-standard, norma stimata da peso proporzionale atteso sul totale).
            (3) Prompt AI estrazione PDF: aggiunto peso_ideale; parser corretto da ib.pesoIdeale
                a ib.peso_ideale → il campo si compila e alimenta il calcolo macro g/Peso Ideale.
  6e86fa2 — fix: reset nome file PDF e input file in openInbody (residuo tra pazienti diversi)

NOTA SESSIONE 26 maggio:
  - Silhouette segmentale scelta dopo iterazione su ~7 alternative con Fabrizio. Criteri finali:
    sagoma morbida (non realistica, non a blocchi), colore come segnale di scostamento,
    valori solo in kg (no percentuali), tronco centrato dentro la sagoma, simmetria sx/dx.
    Sola visualizzazione: gli input restano nella modale.
  - C4 (peso casalingo): CAMBIO DI ROTTA rispetto al 24 mag. Non più "scartato/da rimuovere":
    Fabrizio vuole tenerlo e migliorarlo nel tempo (gestione offset bilance / uso del trend).
  - Lezione anti-regressione: la fix 6e86fa2 è stata persa perché un commit successivo è partito
    da un file caricato più vecchio della produzione. Regola rinforzata: partire SEMPRE dalla
    versione corrente del repo GitHub, mai da un file potenzialmente obsoleto.

2 GIUGNO 2026 — Analisi sicurezza Supabase (RLS / disallineamento token) — NESSUN COMMIT:
  Sessione di sola analisi, nessun codice eseguito (Fabrizio ha voluto capire prima).
  Innesco: email warning Supabase (RLS disabilitato, dati pazienti reali esposti).
  Scoperta: le chiamate DB usano solo la anon key (supaHeaders), non l'access_token utente
    → login protegge la UI ma non i dati. RLS disabilitato dal codice (causa del warning).
  Decisione: soluzione SCALABILE (user_id + RLS row-owner), NON minima (auth.role()), per
    evitare migrazione costosa al multi-tenancy. Piano 6 step definito (backup→…→commit),
    da eseguire in sessione dedicata partendo dal backup.
  Dettaglio tecnico completo (diagnosi + piano 6 step) → roadmap P29.

24 MAGGIO 2026 — Fix pasti non attivi + B5 aggiustamenti macros:
  ff0690d — fix: doppio layer pasti non attivi nel generatore AI
            (1) Prompt rinforzato: "REGOLA ASSOLUTA N.1: genera ESCLUSIVAMENTE i pasti X.
                I pasti Y NON ESISTONO per questo paziente — non inserirli MAI nel JSON"
            (2) Filtro post-parsing: dopo risposta AI, prima del render, rimuove dal JSON
                qualsiasi chiave di pasto non attivo (giorno[chiave] e giorno.pasti[chiave])
  c2f43af — feat B5: aggiustamenti macros mensili in tab Note Cliniche
            Struttura: p.aggiustamentiMacros[] = {id,data,macro,delta,totale,peso,nota}
            Form: data + macro (C/P/G) + variazione ±g + peso controllo opz. + nota opz.
            Logica: calcola totale automatico da macrosTarget corrente, aggiorna macrosTarget
            e kcal (delta×4 per C/P, ×9 per G), notifica di rigenerare il piano.
            UI: tabella compatta con badge macro colorati + Δ peso vs visita precedente.
            Cap 15 | workflow completamente manuale (medico decide quando registrare).

NOTA SESSIONE 24 maggio:
  - C4 (peso casalingo) SCARTATO definitivamente: bilance domestiche hanno offset fisso
    vs bilancia studio (±2-3 kg). Delta inaffidabile → decisioni cliniche sbagliate.
    Il codice C4 era entrato per errore in commit B5 (costruito su file già modificato).
    La sezione "Peso casalingo" appare nel tab InBody ma va rimossa dal codice.
  - C10 (bug kcal sovrastimato): tentativo diagnosi errato su Mangini (ipotesi schema
    JSON cena senza carbo — refutata da screenshot che mostrava patate+gnocchi).
    Vera causa ancora sconosciuta. Nessuna modifica committata per C10.
    Da riprendere raccogliendo: target kcal + output giorno completo + kcal calcolate.
  - B5 implementato come strumento per reverse dieting mensile, NON come versioning
    TDEE automatico. Il workflow clinico reale è: +20g carbo/mese → controllo peso →
    se stabile continua, se sale torna indietro, se cala aumenta ancora.
  - Decisione: aggiustamentiMacros separato da noteClinica testuali (due strumenti
    diversi: strutturato vs qualitativo). Da rivalutare dopo uso reale.

21 MAGGIO 2026 — ROT-EDITOR completo:
  97120d7 — feat(rotazione): editor completo modelli rotazione settimanale
            +506 righe nette: griglia editabile 6/7 giorni con chip rimovibili,
            dropdown dinamico, 4 azioni (👁/✏️/📋/➕), modifica protetta NARUTO/HINATA
            con conferma + 🔄 ripristino originale, 🗑️ elimina custom, riepilogo
            frequenze live, anteprima a griglia, sync Supabase via __modelli_rotazione,
            persistenza localStorage, prompt AI aggiornato per domenica.
            Architettura: MODELLI_ROTAZIONE_DEFAULT (const) + MODELLI_ROTAZIONE (let).
            Scelta A1: riga dedicata in tabella pazienti (zero modifiche schema Supabase).

20 MAGGIO 2026 — POMERIGGIO/SERA (Fix alternativa pesce + UI regole piano + rotazione):
  ee3b535 — feat: integrazione modello NARUTO/HINATA nel prompt AI + tipo colazione nel prompt
            Schema proteico inviato con "⚠️ OBBLIGATORIO" | legumi135+rotazione esclusi dal
            prompt se modello attivo | tipo colazione dolce/salata nel prompt (mista → silenzio)
  33d2d35 — feat: rotazione settimanale NARUTO/HINATA + tipo colazione + auto-derivazione frequenze
            Nuova sezione "Rotazione settimanale" in Regole piano | MODELLI_ROTAZIONE hardcoded |
            auto-compila frequenze da modello (read-only) | disabilita regole in conflitto |
            popup "👁 Vedi schema" con tabella 6×2 | radio tipo colazione dolce/salata/mista
  cff3096 — ui: riordino frequenze piano, emoji legumi 🌱 e affettati 🍖
            Ordine SX: Carne rossa, Carne bianca, Pesce, Affettati
            Ordine DX: Legumi, Uova, Pesce conservato, Latticini
  82377bf — fix: dropdown menu celle sempre visibile (position fixed + apre sopra/sotto)
            position:fixed + getBoundingClientRect | z-index 99999 | apre verso l'alto
            se spazio insufficiente sotto (menuH=160px threshold)
  f287da2 — fix: pesce pranzo+cena unificati come alternative, fallback database se profilo vuoto
            _GRUPPI_SEMAFORO aggiunge 'Pesce (Pranzo)':'pesce' e 'Pesce (Cena)':'pesce'
            Se nessun alimento nel profilo → confirm() con opzione "mostra tutto DB"
  282a9ab — fix: aggiungi alternativa usa categoria semaforo corretta
            Nuove funzioni: getCategoriaSemaforo(), _getCategorieGruppo(), _GRUPPI_SEMAFORO
            Bug: categoriaTarget era stringa semaforo "Pesce (Cena)" invece di "proteine"
            Fix: filtra per categoria semaforo, non funzionale | cereali unificati
            Messaggio errore migliorato con nome categoria e suggerimento azione

19 MAGGIO 2026 — MATTINA (Fix calcolo macros legumi + disambiguazione nomi AI):
  2b1a2f0 — feat: mappa NOMI_CANONICI per disambiguazione automatica nomi alimenti AI
            21 regole "nome generico → nome canonico CREA" applicate in getValoriCREA()
            silenziosamente, zero token aggiuntivi al prompt AI:
              Legumi: fagioli/ceci/lenticchie → (barattolo) | piselli → surgelati
              Cereali: pasta/riso → bianco | pane → comune
              Latticini: latte/yogurt/ricotta/mozzarella → vaccino intero
              Proteine: tonno → sottolio | salmone → fresco | pollo → petto
              Olio: tutte varianti → Olio EVO
  dc268bc — fix: alias nomi alimenti AI per calcolo macros (legumi, pesce)
            Risolve warning "Alimenti non nel DB CREA" che escludeva dal calcolo:
            Ceci/Lenticchie/Fagioli borlotti/Piselli barattolo (l'AI scrive senza
            parentesi tonde, il CREA aveva chiavi con parentesi) + Filetti di
            merluzzo/nasello (in CREA esisteva solo "Filetti di merluzzo/nasello"
            unito). Aggiunti 6 alias + 'Legumi mista' fallback + check
            categoriaFunzionale==='legumi' in getValoriCREA().

22 MAGGIO 2026 — (BARRA-SYNC + fix generatore + alimenti custom + nuovi alimenti):
  2fb06dc — BARRA-SYNC: stepper orizzontale 5 tappe (Pazienti→Ricette→Piani→Entrate→Push)
            + fix ripristino mostraLoadingSteps originale (sovrascritto per errore)
  abd2393 — fix: schema JSON prompt dinamico — genera solo pasti attivi
            (colazione/spuntini disabilitati non compaiono nel piano AI)
  965b07d — feat: alimenti personalizzati da etichetta nel semaforo preferenze cibi
            modale ➕, salvataggio db.alimentiCustom[], sync Supabase __alimenti_custom
            badge ✦custom + bottone ✕ rimozione, disponibili per tutti i pazienti
  d501fdd — feat: +cous cous (CREA secco), +fegato/cuore vitello (CREA), +caffè/tè
            rinomina Latte Vegetale → Bevande Vegetali (caffè+tè dentro)
            categoria Personalizzati eliminata — solo 19 categorie esistenti (Modello 1)
  9ddb450 — fix: tipo colazione disabilitato (grigio, pointer-events:none) se paziente
            ha colazione=No — coerenza UI/logica generatore

NOTA SESSIONE 22 maggio:
  - Alimenti custom: strategia Modello 1 (privato per installazione). Modello condiviso
    tra nutrizionisti valutato per futuro (rischi: qualità dati, duplicati, responsabilità
    clinica). Da rivalutare con 20-30 utenti paganti.
  - BARRA-SYNC: mostraLoadingSteps (stepper verticale generatore AI) NON va toccato —
    era già funzionante. La BARRA-SYNC riguarda solo la sincronizzazione Supabase.
  - Fix pasti disabilitati: il bug era nello schema JSON hardcoded nel prompt —
    l'AI seguiva lo schema (con tutte le chiavi) ignorando le istruzioni testuali.
    Soluzione: schema costruito dinamicamente in JS con solo i pasti attivi.
  - Workflow file: da ora Fabrizio carica index.html nel progetto Claude ad ogni
    sessione. Claude NON usa clone git in /tmp (causa diff sporchi nei commit).

18 MAGGIO 2026 — POMERIDIANA (Fix ragionamento + UX piano + bug critici):
  ed16efc — Fix: cellaSposta usa swap esplicito (Sposta su/giu era no-op con ordini contigui)
  c8a7964 — Fix: cambio paziente nel generatore azzera piano renderizzato (no cross-paziente)
  07e452d — Fix: piani cache (_isCache) esclusi da db.piani + riapriPiano robusto + Invalid Date gestito
  7c115be — Fix: generatore rispetta pasti selezionati nella scheda paziente (spuntM/spuntP/prenanna)
            + UX: scaling proporzionale arrotondato a 5g alternative quando cambia prima scelta
  dd76794 — UX: cambio grammatura prima scelta allinea automaticamente le alternative (poi rifinito)
  7bac530 — Fix: ragionamento clinico legge macrosTarget salvato dal medico (F1 valida invece di ricalcolare)
            + prompt F1 aggiornato: "parere clinico sui macros scelti" invece di proporre alternative

17 MAGGIO 2026 — NOTTURNA (C8 + B7):
  f582580 — C8: alert scadenze dashboard (sparito/piano/inbody/controllo)
  939a749 — B7: ricette composte Fit (pancake proteici + banana, selettore avena)

17 MAGGIO 2026 — SERALE (B1):
  da671fd — B1: messaggi WhatsApp AI variante C (tono, lunghezza, varianti, storico)

24 MAGGIO 2026 — SERALE (Bug fix + Nichel + Concetti educativi):
  713d359 — Fix: collisioni celle piano AI (alimenti invisibili es. Parmigiano)
            _risolviCollisioniCelle in _normalizzaPianoNuovo + riapriPiano
  9bded6d — Fix: "Stima macros non disponibile" al riapri piano
            pianoPazSelezionato azzerava _pianoTargets appena impostati
            Soluzione: _pianoTargets impostato DOPO chiamata a pianoPazSelezionato
            + priorità _getActiveMacrosTarget(p) su ricalcolo TDEE
  9619225 — feat: semaforo nichel aggiornato con PDF quantitativo μg/100g
            soglia taglio ~50μg: aggiunti Avena/Fiocchi avena/Castagne/Calamari/
            Burro frutta secca/Tè/Camomilla nei grigi + Ceci spostati da celesti a grigi
            + aggiunti Pane/Patate/Pera/Pesca/Mortadella/Pancetta/Senape nei celesti
  c508817 — feat: nuovo concetto educativo hardcoded "Allergia al nichel"
            soglia <250μg/die, tabella μg gruppi, 5 consigli pratici, calcolo giornaliero
  VIA UI  — 11 nuovi concetti in db.concetti + modifica concetto cheto base:
            Semi di chia, Microbiota, Zabaione pre-workout, Ferro e assorbimento,
            Pane-ricotta-marmellata, Filosofia alimentare, Cheto e intestino,
            Cheto e integratori, Spirulina + 3 ricette barbabietola nel ricettario
  DECISIONE: nuovi concetti sempre via UI (db.concetti), non nel codice
             codice per comportamenti, Supabase per dati

17 MAGGIO 2026 — POMERIDIANA (B0 + B6 + C7):
  0b5561e — C7: +16 alimenti, rinomina carne, ordine categorie
  8a3a9cd — Fix B6: riepilogo settimana appare anche su piani riaperti
  5aa6f87 — B6: Tab Riepilogo settimana 3 viste (griglia/macros/alimenti)
  00cf801 — B0: popup alimenti colori identici a Preferenze cibi
  d6325f4 — B0: grammature ALIMENTI aggiornate (pasta 80g, pane 100g, ecc.)
  3ae1047 — Fix: escape apici onclick popup categorie
  ce66b89 — B0: popup Aggiungi alimento usa categorie ALIMENTI dirette

15 MAGGIO 2026 — DIURNA:
  1fe7bc5 — C6: checkbox Resta connesso + auto-login (PC e iPhone)
  668b1d4 — Fix: verifica macros 3 colonne (prime scelte + ponderata + target)

14 MAGGIO 2026 — SERALE (ROADMAP UX 7/8):
  c08c0a8 — UX: tasto WhatsApp generatore con messaggio pre-compilato
  9ab4663 — Fix: popup Routine usa pastoRif + mostra quando/razionale
  c77ece2 — Fix: popup Routine legge _ragPazId
  1e141a5 — UX: tasto Routine nel generatore con popup sola lettura
  0589c5f — UX: Ricalcola LAF allineato agli altri campi TDEE
  810f407 — UX: Note Cliniche append-only + fix syntax error
  881f23d — UX: F1/F3 affiancati desktop, verticali iPhone
  e0a12dd — UX: tasto Salva routine con toast
  cd0e383 — UX: Ricalcola LAF btn-g→btn-p
  693ce18 — UX: riordino tab paziente + rinomina Anamnesi→Dati

14 MAGGIO 2026 — POMERIDIANA (Supabase risanamento):
  85639c3 — Fix: tabelle entrate ed eventi dedicate Supabase
  26cb7ae — Fix: tabella piani dedicata Supabase
  842c2e3 — Fix: tabella ricette dedicata Supabase + log diagnostici

13 MAGGIO 2026 — PDF estetica + fix:
  38ea260 — PDF: giorno MAIUSCOLO + pasto teal
  8ec3751 — PDF: pasto 11pt, emoji primo alim., ricette 11pt, routine bold 8.5pt
  6fc4031 — Fix: ripristino emoji titoli pasto PDF
  67aec39 — Fix: skip pazienti senza id push Supabase
  d379c82 — Fix: filtra piani orfani al pull Supabase
  9a72af8 — Fix: reset mac-salva-box cambio paziente
  3c2f80b — Fix: tasto Salva TDEE visibile dopo calcolaMacros()

13 MAGGIO 2026 — UX celle + pannello:
  ecb4c93 — UX: pannello laterale 350px
  8fd1166 — UX: pannello variante C 320px sticky
  82c98cd — UX: menu ⋯ contestuale celle piano

12 MAGGIO 2026 — SERALE (PDF Twemoji):
  4a74332 — Feat: copertina PDF + Twemoji + frase casuale
  b699032 — Fix: emoji async + rimosse linee separatrici
  6446746 — Feat: emoji Twemoji titoli pasto
  4737861, 2a73d4b, c2c950a, f361778 — Fix vari PDF e Salva TDEE

12 MAGGIO 2026 — DIURNA + SERALE (Blocco A + B):
  bee7e25 — A8: stima kcal cena libera sabato
  0afaa71 — A3+A4: 5 concetti educativi + immagini
  65885c5 — Ricalcola LAF + Storico TDEE
  d5df100 — A10: 3 riferimenti P/G + Peso Ideale InBody
  b5f3b47, 8bc9c0e, 79a9745 — A9/A7/A5/A6 fix LAF + semaforo
  c58ba4d — B4: succhi salute 5 colori Routine
  fe0838f — Fix: menu celle adattivo + tab Cena sabato
  40ba17f — Fix: ID menu celle univoco
  80b4700 — P13: macros 40/30/30 + pannello laterale

11 MAGGIO 2026:
  602cb5c, 01428eb, f0d6039 — P2: grammature umane (senza bilancia, porzioni, equivalenze)
  54e4522→940db75 — P3: semaforo 13 condizioni validate
  3841f26, 01d757c — P1b: cache Supabase 90gg + max_tokens 12000
  e57a882 — Generatore 900px + riepilogo collassabile
  710995f — Fix riapriPiano definitivo
  7d25eb3 — Navigazione pill tabs giorni
  68035a3 — Previsione kg/sett + tempo obiettivo TDEE

9-10 MAGGIO 2026:
  964bc31 — Semaforo automatico trasparente
  ef7ee44 — Integratori doppio quadratino verde/ambra
  (login Supabase Auth, F1/F3 ottimizzati, analisi sangue, layout)


