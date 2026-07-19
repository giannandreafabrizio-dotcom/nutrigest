# NutriGest — CHANGELOG (Storico Sessioni e Commit)

> **Origine:** questa sezione era in fondo a `NutriGest_Contesto_v17.txt` (~56% del file).
> Estratta l'8 luglio 2026 per separare la cronologia (append-only, consultata di rado)
> dalla descrizione del funzionamento attuale del software (consultata ad ogni sessione).
> **Regola invariata dal Contesto:** APPEND in cima (cronologia inversa), MAI eliminare.
> Sessioni vecchie >6 mesi possono essere compresse a 1-2 righe (solo se necessario).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STORICO SESSIONI E COMMIT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

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


