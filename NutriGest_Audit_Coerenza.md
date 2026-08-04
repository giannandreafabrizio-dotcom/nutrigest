# NutriGest — Audit di coerenza documenti ↔ codice

> ⚠️ **STATO — 4 agosto 2026, baseline `0f9fd36`.** Questa è una **lista di lavoro**, non un
> documento di ragionamento. Ogni riga è una segnalazione verificata contro il codice.
> **Nessuna correzione è stata applicata**: si decide voce per voce.
> Quando una voce viene chiusa, va barrata qui e registrata nel `CHANGELOG.md`.

**Metodo.** Otto verifiche in parallelo su `NutriGest_Roadmap_v4.md` (111 voci),
`NutriGest_Contesto_v18.txt`, `CHANGELOG.md` e il codice. L'arbitro è sempre stato
`index.html`: nulla è stato riportato senza una ricerca che lo confermasse. Le segnalazioni
più gravi sono state ricontrollate a mano una seconda volta.

**Non riportato di proposito:** numeri di riga vecchi, formulazioni datate, refusi, e le voci
del CHANGELOG superate da voci successive — un diario che racconta un cambiamento non si
contraddice, fa il suo mestiere.

---

## A. NON sono errori di documentazione: sono difetti del programma — ✅ **BLOCCO CHIUSO 4 ago 2026**

Sono emersi cercando le contraddizioni. Il documento diceva una cosa, il codice un'altra, e
in questi casi **aveva torto il codice**.

### ~~A1. Il cous cous è schedato fra i cereali SENZA glutine~~ ✅ CORRETTA 4 ago

Nel database degli alimenti il cous cous sta nella categoria `Cereali senza Glutine` con il
contrassegno `gl:false`, e l'interfaccia gli stampa accanto l'etichetta **[SG]**. Il cous cous
è semola di grano duro: contiene glutine.

*Verificato:* `index.html` riga 1973 — `{n:'Cous cous',g:80,gl:false}` dentro il blocco
`'Cereali senza Glutine'`; riga 26585 — `gl===false → '[SG]'`.

**Quanto è grave davvero.** Meno di quanto sembri, ma va corretto subito. Il controllo
automatico sugli allergeni (`validaPiano`) ha `couscous` e `cous cous` nella lista
Glutine/Celiachia (riga 17849), quindi **su un paziente segnalato come celiaco il piano viene
comunque bloccato**. Il danno è a monte: tu e il paziente leggete «senza glutine» accanto a un
alimento di grano, in una lista stampata o a schermo, e quella scritta è falsa.

La roadmap (P130, riga 517) lo liquida come *«nota cosmetica, non un bug»*. Non lo è.

### ~~A2. L'elenco pazienti del generatore non è più in ordine alfabetico~~ ✅ CORRETTA 4 ago

Una modifica di P142 ha inglobato in un commento l'ordinamento che c'era prima. Tutto quello
che segue `// P142` sulla stessa riga non viene eseguito.

*Verificato:* `index.html` riga 19146 —
`.filter(...) // P142.slice().sort(function(a,b){...})`

**Cosa ti succede:** la tendina «Applica template a…» elenca i pazienti in ordine casuale.
Con pochi pazienti non te ne accorgi; con molti, si sbaglia nome.

### ~~A3. La pizza condita del sabato conta 900 kcal invece di 1100~~ ✅ CORRETTA 4 ago

La tabella delle cene libere ha `'Pizza': 900` **prima** di `'Pizza con condimenti': 1100`, e
la ricerca si ferma alla prima voce che combacia. `'Pizza con condimenti'` contiene la parola
`'Pizza'`, quindi restituisce sempre 900. **Il valore 1100 non è mai raggiungibile.**

*Verificato:* `index.html` riga 2499 `KCAL_WEEKEND`, riga 2509 `getKcalWeekend`, riga 12851
`_kcalScelta` — ciclo con `includes()`, ritorna alla prima corrispondenza.

**Cosa ti succede:** ogni sabato in cui il paziente sceglie la pizza condita, il bilancio
settimanale sottostima di 200 kcal. Il paziente sembra più aderente di quanto sia.

### ~~A4. Lo stesso rapporto cintura/fianchi riceve due giudizi opposti~~ ✅ CORRETTA 4 ago

Il grafico InBody usa per le donne una fascia normale fino a **0,85**; la scheda Analisi
usa **0,80** per il verde e considera 0,80-0,85 giallo.

*Verificato:* `index.html` riga 13260 `_IB_RIF` → `F:{lo:0.75,hi:0.85}`; righe 2973-2974
`whr` → verde fino a 0,80, giallo fino a 0,85.

**Cosa ti succede:** una paziente a 0,83 risulta «nella norma» in una schermata e «a rischio»
nell'altra, nella stessa visita.

### ~~A5. Il colesterolo totale ha due limiti diversi nella stessa scheda~~ ✅ CORRETTA 4 ago

L'interpretazione clinica usa **190** mg/dL («desiderabile», criterio ESC/EAS 2019); la tabella
dei range di riferimento usa **200**.

*Verificato:* `index.html` riga 3161 (`v<190` → desiderabile) e riga 10711
(`'Colesterolo totale':{r:[null,200]}`).

**Cosa ti succede:** un valore di 195 risulta contemporaneamente «dentro il riferimento» e
«sopra il desiderabile». Due messaggi opposti sullo stesso esame.

### ~~A6. Il foglietto sui grassi buoni contraddice le grammature del piano~~ ✅ CHIUSA 4 ago

Il concetto educativo *«I grassi buoni e come usarli»* dice che 10 g di olio equivalgono a
20 g di semi di chia. Il motore delle equivalenze, che ragiona sui **grassi** e non sulle
kcal, ne calcola **35 g**.

*Verificato:* `index.html` riga 3314 (testo del concetto) contro `_GRUPPI_EQUIV` riga 3632 e
`calcolaGrammaturaEquivalente`.

**Cosa ti succede:** nello stesso PDF il piano scrive 35 g di chia e il foglietto allegato ne
consiglia 20. Il paziente chiede quale delle due è giusta.

### A7. La cartella «PRIORITÀ 1 — Bug aperti» contiene solo voci chiuse

Non è un difetto del programma ma dell'indice: cinque voci (P147, P146, P144, P140, P141)
tutte marcate ✅ chiusa sotto un titolo che dice «bug aperti».

**Cosa ti succede:** guardi l'indice, conti cinque bug che non esistono, e non vedi dove sono
quelli veri.

---

## B. Documenti che ti farebbero rifare un lavoro già fatto

Categoria «perdi una sessione». Tutte verificate: la cosa **esiste già nel codice**.

| # | Dove | Dice | Realtà |
|---|---|---|---|
| **B1** 🔴 | Roadmap r.1299 — **P61** | «Da fare · Priorità Alta (CRITICA)» — validatore allergeni tutto da costruire | Chiuso il **7 luglio** (commit `ed1e3e9`). `validaPiano` e `validaGateExport` sono in produzione e hanno 14 test dedicati. La stessa roadmap a riga 78 lo elenca fra le voci **chiuse**. |
| **B2** | Roadmap r.473 — **P4** | «DA NON PERDERE (30 lug): aggiungere il girovita, che alimenta il WHtR» | Girovita e WHtR esistono **da fine giugno**, con soglia 0,5 e protocollo di misura. Rifarli creerebbe un secondo campo girovita che non coincide col primo. |
| **B3** | Roadmap r.369 — **P37** | Scheda: «Da fare · sblocca P3/P84/P80» | Il titolo della stessa voce dice **«❌ ESCLUSO 14 luglio»**. La decisione è tua e datata; la scheda non è stata aggiornata. |
| **B4** | Roadmap r.947 — **P122** | Titolo: «Tappa 1 chiusa, tappe 2-5 aperte» | Trentotto righe sotto: **«P122 COMPLETA»**, 5 tappe più 5 correzioni, collaudata in studio. |
| **B5** | Roadmap r.122 — **P124b** | «COLLAUDO DA FARE» | Due righe sopra, due volte: **«SUPERATO (26/7)»**. |
| **B6** | Roadmap r.39 — **P73** | Nella tabella di pianificazione come lavoro da fare (Opus/High) | La scheda dice **chiusa** col commit `34dd1ae` del 16 luglio. |
| **B7** | Roadmap r.803 — **P40** | «campo passi + grafico, da fare» | `passiGiornalieri` è in anagrafica e **decide già le calorie** del paziente. Manca solo lo storico. |
| **B8** | Roadmap r.544 — **P35** | «Peso intermedio casalingo: da fare» | La card «⚖️ Peso casalingo» è **in produzione**. |
| **B9** | Contesto r.1141 | «C4 scartato, nessuna interfaccia attiva, da rimuovere» | Stessa card di sopra: c'è, con aggiungi ed elimina. |
| **B10** | Roadmap r.152 — **P65** | «scan dello storico commit per segreti, da fare» | Fatto il 13 luglio su 460 commit, nessuna chiave trovata. |

---

## C. Documenti che descrivono male il programma

Categoria «cerchi una cosa che non c'è, o non usi una cosa che hai».

| # | Dove | Dice | Realtà | Perché conta |
|---|---|---|---|---|
| **C1** 🔴 | Contesto r.551 | Cancellando un paziente, **piani ed entrate NON vengono rimossi** | `eliminaPaz` cancella **a cascata** piani, entrate ed eventi, anche su Supabase | Credi di poter recuperare la contabilità di un paziente cancellato. Non c'è più, nemmeno nel cloud. |
| **C2** | Roadmap r.359 — P33c | «la struttura N-giorni esiste già, max **31**» | Il codice si ferma a **14** giorni | Prometti un piano da 30 giorni che l'app non sa fare |
| **C3** | Roadmap r.482 — P3 | «Fast = preset, è già un filtro» | `tempoPrep` è solo salvato: nessun filtro, non entra nel prompt | Stimi mezz'ora per il protocollo «Fast»; il filtro va ancora scritto |
| **C4** | Contesto r.1024 | Il foglio richiesta esami stampa l'etichetta **SSN/PRIVATO** per ogni voce | Quella scritta **non viene stampata** | Dici al paziente cosa passa il servizio sanitario, e sul foglio non c'è |
| **C5** | Contesto r.969 | Avviso «controllo saltato» dopo **14 giorni** | Non esiste: arancione oltre **30**, rosso oltre **45** | Aspetti un avviso a due settimane che non arriverà mai |
| **C6** | Contesto r.2200 | `PORZIONI_DISCRETE`: 18+ alimenti con porzioni commerciali, fetta biscottata 6 g | Sostituita da `_PESI_UNITARI` (15 voci); fetta biscottata **10 g**; i latticini vanno a multipli di 5 g | Ti aspetti arrotondamenti alle confezioni che il programma non fa più |
| **C7** | Contesto r.1971 | Grafici InBody visibili **solo con ≥2 misurazioni** | Da P145 quattro grafici si disegnano **anche con un solo referto** | Alla prima visita non apri una scheda che invece ha già qualcosa da mostrare |
| **C8** | Roadmap r.195 | Regola dei **7000** kcal per kg di grasso | Il codice usa **7700** ovunque. La stessa roadmap dieci righe sotto scrive 7700 | Rifacendo un conto a mano prometti circa il 10% di calo in più |
| **C9** | Roadmap r.1018 | Circuit training = **8 MET** | Nel catalogo è **7,5** dal 3 agosto | Ricontrollando l'EAT a mano attribuisci più calorie bruciate di quante il piano ne conti |
| **C10** | Contesto r.2243 | Catalogo attività: **97 voci** | Sono **117** dal 3 agosto | Cerchi un'attività, la credi assente e ripieghi sulla stima grossolana |
| **C11** | Contesto r.2314 | Slider regime: da −40% a **+20%** | Da −40% a **+25%**, e fino a **−75%** in chetogenica | Credi impossibile un surplus che invece puoi impostare |
| **C12** | Contesto r.1225 | Modelli di rotazione salvati nella tabella `pazienti` | Stanno nella tabella `collections` | Cercandoli nel posto sbagliato li credi persi |
| **C13** | Contesto r.1865 | Le date della timeline vengono da `inizioPiano` | Il campo si chiama `inizioAlim`; `inizioPiano` non esiste | Cerchi un campo che non c'è |
| **C14** | Contesto r.1530 | L'analisi clinica AI gira con **1400** token | Ne usa **2000** (e lo stesso file lo scrive giusto altrove) | Sottostimi il costo di ogni chiamata di circa il 40% |
| **C15** | Contesto r.1557 | La scheda calcoli contiene **18** indici | Sono **22**: ci sono anche LDL stimato, calcio corretto, albumina/globuline, indice androgeni | Non cerchi quattro indici che il programma calcola già |
| **C16** | Contesto r.2261 | `_MET_ALIAS` mappa **28** etichette storiche | Ne mappa **18** | Solo un numero sbagliato: **ho verificato che tutti e 18 gli alias funzionano**, nessuno punta a una voce inesistente |
| **C17** | Contesto r.2994 | `fonteOre` vale `'sedute-minuti'` o `'ore-legacy'` | Vale `'righe-attivita'` o `'ore-settimana'` | Un controllo scritto su quei nomi non scatterebbe mai |
| **C18** | Contesto r.971 | I «✓ Gestito» delle scadenze stanno fuori dal backup | P144 li ha spostati sul paziente: viaggiano col backup | Credi di perderli cambiando dispositivo |

---

## D. Difetti strutturali della Roadmap

Non singole voci, ma il modo in cui il file è fatto.

- **D1.** In testa (riga 9) c'è scritto *«questo file non contiene più riepiloghi di stato
  duplicati»*, e subito sotto c'è una tabella di ~50 righe con lo stato di ogni voce. È
  proprio lì che nascono B1 e B6: le schede si aggiornano, la tabella d'apertura no.
  **La regola dichiarata («fa fede la scheda») e la pratica sono in conflitto.**
- **D2.** La data «ultimo allineamento: 18 luglio» è ferma da due settimane e mezzo.
- **D3.** La sigla **F5** è usata per due difetti diversi (proiezioni PostgREST e perdita dati
  in `salvaPaz`): «F5 chiusa» è ambiguo.

---

## Cosa NON è sopravvissuto alla verifica

Una segnalazione allarmante è stata **scartata**: era stato riportato che `_MET_ALIAS`
avesse alias rotti, con l'allenamento che sparisce dal calcolo senza avviso. **Falso.**
Controllati tutti e 18: puntano tutti a voci esistenti del catalogo. L'unico errore è il
numero scritto nel Contesto (C16).

---

## Ordine di lavoro consigliato

1. ~~**A1, A2, A3**~~ ✅ **fatte il 4 agosto 2026** — vedi CHANGELOG. Applicandole è emerso che il
   test 232 di `s2-paziente-prenotato` verificava la riga di sorgente parola per parola,
   commento compreso: **proteggeva il difetto invece del comportamento.** Riscritto.
2. ~~**A4, A5, A6**~~ ✅ **fatte il 4 agosto 2026** — decise da Fabrizio, vedi CHANGELOG.
   A6 rovescia la scelta di P121 sul criterio di equivalenza dei grassi: motivazione nel codice e nei test.
   **A6 chiusa il 4 ago in tre mosse:** il criterio del motore era stato cambiato per errore ed è
   stato ripristinato a P121 ('grassi'); la chia è uscita dalle alternative all'olio (era quella la
   correzione giusta); il foglietto è stato allineato al motore — grammature, premessa «stessi
   grassi» invece di «stesse calorie», e la spiegazione del perché la chia non c'è.
   Un test lega ora testo e motore: non possono più divergere in silenzio.
3. **B1-B10** — una passata sola sulla Roadmap: sono tutte correzioni di stato.
4. **D1** — decidere se la tabella d'apertura si tiene allineata o si elimina. Finché resta
   com'è, continuerà a generare voci come B1 e B6.
5. **C1-C18** — una passata sul Contesto. Nessuna urgenza tranne **C1**, che riguarda la
   perdita di dati.
