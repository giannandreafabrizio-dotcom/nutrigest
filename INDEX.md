# NutriGest — INDEX.md

> **Come si riallineano i numeri di riga (26 lug 2026 · conteggio verificato il 10 ago 2026).** Questo file ha **899 voci** (l'intestazione ne dichiarava 823, e `CLAUDE.md` ne dichiarava ~673: contate una per una il 10 agosto):
> ogni riga aggiunta a `index.html` sposta tutte quelle sotto, quindi a mano non
> si mantiene. Il 26 luglio erano **719 su 730 sbagliate**, con uno scarto mediano
> di oltre 1800 righe — ed erano gia' 657 su 687 prima della sessione: il file era
> alla deriva da settimane. Non e' un problema di disciplina, e' un problema di
> metodo. Da rigenerare con questo script dopo ogni sessione che tocca il codice:
>
> ```python
> import io, re
> html = io.open('index.html', encoding='utf-8').read()
> reale = {}
> for n, l in enumerate(html.split('\n'), 1):
>     m = re.match(r'^(?:async )?function (\w+)\s*\(', l) or re.match(r'^(?:const|let|var) (\w+)\s*=', l)
>     if m and m.group(1) not in reale: reale[m.group(1)] = n
> idx = io.open('INDEX.md', encoding='utf-8').read()
> def fix(m):
>     nome = m.group(2)
>     return '- `%d` — %s%s' % (reale[nome], nome, m.group(3)) if nome in reale else m.group(0)
> io.open('INDEX.md', 'w', encoding='utf-8').write(
>     re.sub(r'^- `(\d+)` — (\w+)(.*)$', fix, idx, flags=re.M))
> ```
>
> Le 93 voci non trovate dallo script sono funzioni annidate o dichiarate non a
> inizio riga: quelle restano da controllare a mano.


Mappa funzioni → righe di `index.html`, organizzata per area funzionale.
**Numeri di riga riallineati il 26 luglio 2026** (P122 + P123 + F5/F6/F7): ricalcolate **719 voci su 730** con lo script qui sopra, insieme ai range "Righe A-B" di ogni sezione. Righe totali file: 26883.
**Ultimo rigenero automatico: 10 agosto 2026** — P130, campo `stato` in `FODMAP_PORZIONI`: 507 voci riallineate, 278 gia' esatte, 114 non verificabili (funzioni annidate). Righe totali file: 32.329. Suite 738/738 verde dopo il rigenero.

**Rigenero precedente: 5 agosto 2026** (audit al contrario: correzione `selCatAl`, rinomina `verificaRegola_70_25_10`, ricette di sistema eliminabili, rimozione `applicaPatch`; poi P148 tappa 1: `_macrosCella`, `pastoMaxPerMacro`, `pastoMaxPerMacroTuttiIGiorni`; poi P148 tappa 2: `CATALOGO_INTEGRATORI` e i cinque helper di risoluzione etichette; poi P148 tappa 3: `renderCaselleIntegratori`, `mostraInfoIntegratore`, `_infoIntegratoreHtml`; poi P148 tappa 4: le dieci funzioni del pasto automatico e del ponte Clinica→Routine) — lo script ha corretto **3371 voci** in totale nella giornata; i range "Righe A-B" di sezione NON sono stati ricalcolati in questa passata (restano quelli del 26 lug, indicativi). Righe totali file: 30946.

> **Attenzione, lezione del 5 ago 2026:** `rigenera-index.js` RIALLINEA i numeri di riga delle voci già presenti, ma **non aggiunge le funzioni nuove**. Dopo la tappa 1 di P148 la suite era verde e l'indice "allineato" pur non contenendo nessuna delle tre funzioni appena scritte — il test `s1-doc-allineata` verifica che le voci elencate siano giuste, non che siano complete. Una funzione nuova va aggiunta a mano alla sezione giusta, altrimenti la prossima sessione non la trova e rischia di riscriverla. Stessa famiglia della regola 20: un controllo automatico verde non è una verifica di ciò che il controllo non guarda.

> ⚠️ **Nota storica, da tenere presente.** L'intestazione precedente dichiarava un riallineo completo il 25 luglio, ma un controllo automatico su quel commit (`924414b`) ha trovato **657 voci sbagliate su 687**, con scarto mediano di +117 righe: la dichiarazione non corrispondeva al file. Prima ancora, la rigenerazione integrale del 14 luglio. Morale: **il riallineo va verificato, non dichiarato** — lo script sopra stampa quante voci corregge, e quel numero va guardato.

⚠️ **Nota sulla rigenerazione:** la versione precedente copriva solo la sezione COMPOSITORE MANUALE dopo P95; questa rigenerazione ricalcola TUTTI i numeri di riga da zero con uno script automatico (stesso metodo dichiarato qui sotto), così l'intero indice torna affidabile, non solo una sezione.

## Come usarlo
1. Trova l'area funzionale pertinente qui sotto (o cerca il nome funzione nella tabella).
2. Usa `view` con `view_range` sul range indicato invece di leggere tutto il file.
3. Se il nome funzione non è chiaro o non è in tabella, `grep -n "nomeFunzione" index.html` prima di editare.
4. **Rigenera questo indice a OGNI sessione che tocca `index.html`** — `cd test-suite && node rigenera-index.js`, dieci secondi. *(Riga corretta il 10 ago 2026: diceva «dopo modifiche strutturali ampie, non dopo ogni piccolo commit». Era la politica in vigore fino al 26 luglio, ed è **esattamente quella che ha prodotto 719 numeri su 730 sbagliati** — il difetto raccontato tre righe più sopra in questo stesso file. Dal 26 luglio `CLAUDE.md` prescrive l'opposto e il test `s1-doc-allineata` fallisce se l'indice è disallineato: questa riga istruiva a seguire la regola abbandonata perché rompeva il file che la contiene.)*

---

### HEAD / CSS / HTML STATICO (markup, stili, struttura pagine)
*(nessuna funzione top-level dichiarata in questo range — markup/CSS/dati statici)*

---

### CATALOGO UNICO ALIMENTI (P108 fase 0) — record {id,nome,categoriaSem,gDefault,per100g,fonte}, risoluzione id/nome
Righe 2375-2417

- `2375` — _slugAlimento
- `2383` — _catalogoIndicizza
- `2387` — _catalogoDeindicizza
- `2394` — costruisciCatalogo
- `2417` — risolviAlimento

---

### MACROS PIANO — calcolo e badge macro reali vs target
Righe 2432-2790

- `2432` — getValoriCREA
- `2444` — getCurrentPaziente
- `2479` — getKcalWeekend
- `2534` — getMacrosRicettaComposta
- `2551` — _macrosCella
- `2577` — calcolaMacrosPiano
- `2689` — pastoMaxPerMacro
- `2718` — pastoMaxPerMacroTuttiIGiorni
- `2724` — renderBadgeMacrosReali
- `2611` — pctStr
- `2612` — color
- `2625` — row
- `2790` — renderBadgeMacrosReali_DOM

---

### ANALISI DEL SANGUE — parsing, indici clinici derivati, interpretazione
Righe 3075-3282

- `3075` — _parseAnalisiNum
- `3083` — calcolaIndice
- `3256` — interpretaAnalisi
- `3268` — _interpAnalisiHtml
- `3282` — mostraInfoRange

---

### CONCETTI EDUCATIVI — sync Supabase, migrazione
Righe 3429-3453

- `3429` — pushConcetiSupabase
- `3439` — pullConcetiSupabase
- `3453` — migraConcetti

---

### ALIMENTI — categorie funzionali/semaforo, chip UI, equivalenze porzioni
Righe 3643-4015

- `3643` — getCategoriaSemaforo
- `3660` — _getCategorieGruppo
- `3674` — calcolaGrammaturaEquivalente
- `3726` — _gruppoEquiv  (P121: gruppo di equivalenza + criterio per categoria funzionale)
- `3732` — _porzioneStandard  (P121: porzione `g` di database dell'alimento)
- `3747` — suggerisciGrEquivalente  (P121: firma a 3 argomenti, il gruppo si deduce dai due alimenti)
- `3773` — _etichettaCriterio  (P121: ≈carbo / ≈prot / ≈grassi / fissa / porzione)
- `3793` — _promptAlternativeGrassi  (P121: riga del prompt AI generata dal motore)
- `3809` — ricalcolaAlternative  (P121: MOTORE UNICO, unico punto che scrive la grammatura di un'alternativa)
- `3828` — ricalcolaAlternativePiano  (P121: applica il motore a tutte le celle di un piano)
- `3877` — arrotondaGrammatura  (P121: sostituisce arrotondaPorzioneDiscreta — pezzi interi senza tetto / 5g)
- `3887` — getCategoriaFunzionale
- `3927` — catArr
- `3943` — _tagComuniTrova
- `3947` — getTagComuniChip
- `3950` — setTagComuniChip
- `3958` — setCatChips
- `3971` — getStagioniChip
- `3974` — setStagioniChip
- `3981` — getProfiloChip
- `3984` — setProfiloChip
- `3993` — wireChipGroup
- `4004` — wireAttrChipGroups
- `4015` — wireRadioChipGroup

---

### CONFIG / STORAGE LOCALE — cfg, localStorage db, util data/valuta
Righe 4043-4646

- `4043` — getCfg
- `4044` — saveCfgL
- `4045` — getUrl
- `4046` — saveLocal
- `4047` — loadLocal
- `4059` — uid
- `4077` — ymdLoc  (P141)
- `4082` — today
- `4090` — addDays
- `4098` — fData
- `4099` — fEur
- `4101` — getLastSyncText
- `4111` — getSyncColor
- `4118` — aggiornaStatoSync
- `4144` — setSyncStatus
- `4600` — _registraTombstone
- `4608` — _tombstoneAttivi
- `4620` — _fondiTombstones
- `4634` — _mergeTombstonesRemoti *(dal 24/7 legge il meta da `collections`, P74 1d)*
- `4646` — _applicaTombstones
- `4507` — _pazFetchMeta *(P74 1d — solo `collections`)*
- `4528` — _collectionsUpsert *(P74 — scrittura primaria dei 4 meta-record dal cutover 1d)*
- `4550` — _collectionsFetch *(P74 1d — lettura unica dei meta-record)*
- `4573` — _analisiSangueUpsert *(P74 fase 2 — scrittura ombra analisi del sangue, 24/7)*

---

### SYNC SUPABASE — push/pull ricette/pazienti, tombstones, conflitti (P69)
Righe 4670-5182

- `4670` — supaHeaders
- `4684` — pushRicetteSupabase
- `4755` — pullRicetteSupabase
- `4779` — delRicetteSupabase
- `4791` — delPazienteSupabase
- `4807` — pushToSheets
- `4912` — pullFromSheets
- `4997` — syncNow
- `5016` — sincronizzaTutto
- `4360` — stpSet
- `4365` — stpMsg
- `5152` — testConnSupabase
- `5182` — _p68LogSaveAnonimo

---

### SYNC SUPABASE — save paziente, piani/cache piano, entrate, eventi
Righe 5196-5722

- `5196` — save
- `5214` — _pushRigaPerId
- `5248` — _flushDirtyIds
- `5331` — _p69LoadBaseline
- `5334` — _p69StoreBaseline
- `5337` — _p69SetBaseline
- `5341` — _p69DropBaseline
- `5345` — _p69SetBaselineFromRows
- `5351` — _p69NomePaz
- `5356` — _p69InList
- `5364` — _p69RilevaConflitti
- `5400` — _p69DialogoConflitti
- `4738` — chiudi
- `5434` — _p69RisolviRicarica
- `5466` — _p69EsportaLocali
- `5479` — _p69RisolviSovrascrivi
- `5492` — pushPianoSupabase
- `5514` — pullPianiSupabase
- `5530` — delPianoSupabase
- `5546` — delPianiPazienteSupabase
- `5558` — pushCachePianoSupabase
- `5575` — caricaCachePianoSupabase
- `5597` — pushEntrateSupabase
- `5621` — pullEntrateSupabase
- `5635` — delEntrataSupabase
- `5643` — pushEntrataSupabase
- `5654` — pushEventoSupabase
- `5667` — pushEventiSupabase
- `5691` — pullEventiSupabase
- `5711` — delEventoSupabase
- `5722` — _pianoCacheKey

---

### UI GENERALE — config AI key, notifiche, navigazione (goTo/tab/modali)
Righe 5753-5864

- `5753` — _salvaPianoCache
- `5758` — _caricaPianoCache
- `5764` — salvaCfg
- `5765` — testConn
- `5772` — testaAntKey
- `5783` — initAntCard
- `5786` — esporta
- `5787` — importa
- `5792` — goTo
- `5808` — closeM
- `5816` — ngChiudiModale
- `5825` — ngChiudiPopupCoppia
- `5829` — ngAggiungiX
- `5840` — ngUpgradeModali
- `5860` — mTab
- `5861` — aggiornaEta
- `5862` — toggleOrarioNote
- `5863` — pdTab
- `5864` — notif

---

### PAZIENTI — registro: lista/card/kanban, apertura, editing, salvataggio, routine
Righe 5872-9353

- `5872` — getPazView
- `5873` — setPazView
- `5882` — _pazStatoPiano
- `5890` — _pazUrgenzaControllo
- `5905` — _pazBadgePrenotato  (P142)
- `5912` — pazSegnaArrivato  (P142)
- `5918` — _pazStatoTagHtml
- `5935` — _pazAggiornaFiltroRegimi
- `5943` — renderPaz
- `6001` — _renderPazCard
- `6026` — _renderPazLista
- `6053` — _renderPazKanban
- `6091` — openNuovoPaz
- `6118` — editPaz
- `6202` — REGOLE_SEMAFORO_ALIMENTI *(15 condizioni cliniche → grigi/celesti; globale dal 26/7 per essere verificabile dal test)*
- `6649` — _SEM_COLORI_LEGACY / `6105` _SEM_COLORI_AUTO *(F9 — unico vocabolario dei colori automatici)*
- `6654` — NOMI_CONDIZIONE_SEMAFORO *(etichette delle 15 condizioni, usate anche dal riquadro della scheda)*
- `6676` — _semaforoCondizioniAttive *(le condizioni spuntate su un paziente)*
- `6687` — _semaforoMigraPaziente *(F9 — toglie i colori legacy e ricalcola; idempotente)*
- `6698` — _semaforoMigraTutti *(passata su tutti i pazienti in memoria, con conteggio)*
- `6853` — applicaRegoloSemaforo *(dal 26/7 pulisce TUTTI e sei i colori automatici, non solo i suoi due)*
- `6957` — trovaChiaveAlimento *(match esatto sul nome: se non trova, la regola è ignorata in silenzio — vedi test s2-regole-nomi-alimenti)*
- `6981` — _pazNumOPrec *(F7 — campo assente = valore precedente, non azzeramento)*
- `6993` — _pazPreservaCampi *(F5 — l'anagrafica non cancella i campi che il form non gestisce)*
- `6999` — salvaPaz
- `7149` — openPaz
- `8737` — catalogoIntegratoriAttivi *(P148 — voci proponibili, esclude quelle ritirate)*
- `8741` — integratorePerChiave *(P148)*
- `8777` — _normEtichettaIntegr *(P148)*
- `8785` — chiaveIntegratore *(P148 — etichetta storica → chiave stabile, regola 21)*
- `8803` — migraEtichetteIntegratori *(P148 — {chiavi, liberi}: le sconosciute si conservano)*
- `8872` — integratoriDaSuggerireInRoutine *(P148 — ponte Clinica→Routine: suggerimento, mai aggiunta automatica)*
- `8888` — _suggerimentiDaClinicaHTML *(P148)*
- `8904` — renderPdRoutine
- `6723` — cardHTML
- `9073` — updateRoutineCampo
- `9081` — suggerisciPastoEQuando
- `9129` — pianoPiuRecenteDelPaziente *(P148 — piano più recente del paziente, già espanso)*
- `9142` — _macroRegolaRoutine *(P148 — 'g' o 'c' secondo la regolaOrario del catalogo)*
- `9150` — routineAmmetteAuto *(P148)*
- `9155` — routineSlotDelGiorno *(P148 — pasto di una voce IN UN GIORNO; la scelta manuale vince sempre)*
- `9166` — routineSlotPerGiornoNome *(P148 — stessa cosa per nome del giorno: è la forma usata dal PDF)*
- `9178` — routineAssegnazionePerGiorni *(P148 — [{giorno, slot}] per la scheda Routine)*
- `9191` — pesoAttualePaziente *(P148 — dall'InBody più recente, regola 10; mai congelato)*
- `9200` — doseIntegratoreRisolta *(P148 — dose per peso dei BCAA; senza referto non inventa numeri)*
- `9212` — filtroLibreria
- `9221` — renderLibreriaGrid
- `9242` — aggiungiDaLibreriaIdx
- `9271` — openModalRoutine
- `9278` — salvaRoutineVoce
- `9303` — salvaRoutine
- `9310` — mostraRoutinePopup
- `9338` — removeRoutineVoce
- `9353` — _renderAggiustamentiSection

---

### 📈 PERCORSO — timeline di periodizzazione (P115 Tappe 1-5 COMPLETE, 24 lug 2026)
Righe 6021-6621 (numeri ESATTI al 24/7 notte, dopo la Tappa 5). ⚠️ Questo blocco (~600 righe) fa slittare tutti i numeri delle sezioni SUCCESSIVE a riga ~6020 rispetto all'ultima rigenerazione completa: per quelle sezioni fare grep di conferma. Rigenerazione completa alla prossima modifica strutturale.

- `7195` — _PERCORSO_TIPI (const: tipi fase, colori, pct default)
- `7202` — _percorsoGet *(normalizza p.percorso, scarta fasi invalide)*
- `7226` — _percorsoIntervalli *(fasi consecutive → date concrete dal/al)*
- `7240` — _percorsoFaseAt *(fase attiva a una data; dal incluso, al escluso)*
- `7249` — _percorsoKcalFase *(pct → kcal indicative via calcolaTDEE)*
- `7272` — _percorsoProiezione *(Tappa 2 — proiezione ibrida teorica/calibrata, cono, obiettivo a intervallo)*
- `7330` — _percorsoDataBreve *(ISO → "12 set")*
- `7347` — _percorsoSerieEnergia *(Tappa 3 — serie introito/TDEE stimato/TDEE osservato per la corsia energia)*
- `7386` — _percorsoSerieMassaMagra *(Tappa 4 — solo InBody: punti {data,m,pg})*
- `7405` — _percorsoConsuntivo *(Tappa 5 — legge p.consuntivo scritto da P50: aderenza, extra kcal, ritardo=extra÷7700, settimane perse; oggi sempre ok:false)*
- `7447` — _PERCORSO_LAYERS_DEFAULT / _percorsoLayersState / _percorsoLayersGet *(Tappa 4 — stato interruttori, SOLO sessione, mai su p)*
- `7452` — percorsoLayerToggle *(Tappa 4 — inverte un solo strato)*
- `7458` — percorsoVistaPreset *(Tappa 4 — preset "tecnica"/"paziente")*
- `7474` — _percorsoPaz *(e a seguire i mutatori percorsoInit/SetInizio/AddFase/UpdFase/DelFase/MoveFase)*
- `7530` — _PERCORSO_MODELLI / _PERCORSO_GEN *(P122 T3 — 4 modelli + regole dei cicli)*
- `7548` — _percorsoGeneraFasi *(P122 T3 — pura: dal traguardo alle fasi, ritmo = quello della proiezione)*
- `7628` — _percorsoModelloSelectHtml
- `7637` — percorsoGeneraDaModello *(propone; conferma prima di sostituire fasi esistenti)*
- `7660` — _percorsoShiftGiorni *(pura: ancora = ultima pesata)*
- `7670` — percorsoRiallinea *(⏩ trasla il piano, riprende dal giorno-fase dell'interruzione)*
- `7697` — _TRG_TIPI / `6744` _TRG_COMPORTAMENTI *(P122 T4 — tipi di traguardo e libreria comportamenti)*
- `7719` — _traguardiGet · `6761` _traguardoValoreAttuale *(valore corrente dai dati esistenti, null se manca)*
- `7758` — _traguardoVerso *(auto: dedotto dalla partenza)* · `6803` _traguardoValuta · `6824` _traguardiValuta
- `7799` — traguardoAdd · `6852` traguardoUpd · `6867` traguardoDel · `6873` traguardoSegna
- `7857` — _COND_TIPI · `6897` _percorsoCondizione *(pura: la fase finisce per soglia — SOLO suggerimento)*
- `7873` — percorsoSetCondizione · `6927` percorsoChiudiFase *(esito fotografato, riapribile)*
- `7907` — _traguardiHtml *(blocco 🏁 in fondo alla scheda Percorso)*
- `8005` — _percorsoVistaPaz / `7049` _percorsoVistaPazAttiva *(P122 T5 — modalità di sessione)*
- `8012` — _percorsoVittorie *(pura: vittorie dall'inizio del percorso + flag ricomposizione)*
- `8050` — _percorsoNascondiPeso *(in fase di massa il peso non si mostra al paziente)*
- `8061` — _traguardoFaseCorrente *(traguardo della fase IN CORSO, non quello lontano)*
- `8089` — _traguardoTestoPaziente *(righe in italiano semplice, riusate dal messaggio WhatsApp)*
- `8122` — _vistaPazienteHtml *(i tre riquadri che guarda il paziente)*
- `8202` — _percorsoChartSvg *(due corsie: peso + massa magra + cono proiezione sopra, striscia aderenza in mezzo (solo con dati P50), energia (kcal) sotto — tutto gated dagli interruttori)*
- `8391` — renderPdPercorso *(scheda: badge fase, riga proiezione/obiettivo, riga Piano vs Realtà (solo con dati), toolbar interruttori, grafico, editor)*

*(Tappa 2 tocca anche `calcolaMacros`: box obiettivo con intervallo al posto della data secca.)*

---

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 9438-9609

- `9438` — salvaAggiustamento
- `9471` — eliminaAggiustamento
- `9480` — renderPdNote
- `9515` — salvaNotaClinica
- `9530` — deleteNota
- `9539` — saveNote
- `9559` — resetSemaforoAuto *(F9 — pulsante 🔄 Ricalcola: pulisce gli automatici e rifà col sistema valido; il motore LEGACY non esiste più)*
- `9609` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 9850-10048

- `9850` — avviaFX
- `9878` — avviaAnalisi
- `9895` — _renderFlussoPanel
- `9939` — _riepEsc
- `9943` — _riepNum
- `9949` — _riepDelta
- `9957` — _riepDataSig
- `9975` — _riepParseFX
- `8087` — clean
- `9989` — _riepAggiornaFX
- `10015` — _riepToggleDomandaDefault
- `10027` — _riepAddDomanda
- `10040` — _riepRemoveDomanda
- `10048` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 10260-10503

- `8218` — dCol
- `8336` — card
- `10260` — renderPdRagionamento
- `10348` — inviaMessaggioRag
- `10366` — concludiERiassumi
- `10380` — salvaRagionamento
- `10401` — apriGeneratoreDaRag
- `10409` — nuovaSessioneRag
- `10415` — cancellaSavedRag
- `10425` — renderPazTimeline
- `10462` — renderPdAnamnesi
- `10503` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 12472-13607

- `12472` — _anNorm *(P125 — testo confrontabile: minuscole, niente accenti)*
- `12478` — _anCorrisponde *(P125 — ricerca per parole-prefisso: "vit d" trova "Vitamina D")*
- `12484` — filtraAnalisi *(P125 — filtro dal vivo delle 119 voci)*
- `12518` — pulisciRicercaAnalisi
- `12524` — renderPdAnalisi
- `12580` — toggleAnalisiSection
- `12729` — loadAnalisiSanguePDF
- `12616` — _impPdfConfigurata
- `12617` — _impPdfLib
- `12627` — _impPdfApri
- `12640` — _impPdfPagina *(P124b — una pagina del PDF → immagine, con la rotazione RILEVATA, non quella dichiarata dal file)*
- `12661` — _impRuotaImmagine
- `12686` — _impRilevaRotazione *(P124b — chiamata piccola: di quanti gradi va girata la pagina)*
- `12705` — _impPromptPagina *(P124b — prompt di UNA pagina, con l'impronta della riga: valore+unità+riferimento)*
- `12904` — _impNormalizzaNumero *(P124 — numero all'italiana → punto decimale, conversione fatta dall'app e non dall'AI)*
- `12915` — _impNumeri
- `12923` — _impSembraIntervallo
- `12931` — _impUgualeAlRange
- `12940` — _impLimitiStd
- `12961` — _impFuoriScala
- `12970` — _impCorrezioneVirgola
- `12982` — _impTestoLimiti
- `13003` — _impRifPlausibile *(P124b — un "riferimento" che è un'unità di misura = riga disallineata)*
- `13016` — _impUnitaCanonica
- `13038` — _impStessaGrandezza *(P124b — stesso tipo di misura a meno del prefisso: nanomoli/micromoli/millimoli)*
- `13055` — _impUnitaCompatibili
- `13066` — _impControllaValore *(P124 — i controlli anti-errore su un valore estratto)*
- `13130` — mostraDiffAnalisi *(P124 — colonna Estratto modificabile + righe sospette deselezionate)*
- `13320` — _calcoloIncluso
- `13326` — toggleCalcoloIncluso
- `13348` — _renderCalcoliPannello
- `13389` — toggleGlossario
- `13394` — updateAnalisi
- `13453` — salvaAnalisi
- `13466` — applicaGruppoClinico
- `13495` — renderBoxGruppiCliniciSuggeriti
- `13527` — suggerisciGruppiClinici
- `13607` — renderMemoriaInbody

---
### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9176 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `10633` — _richVal
- `10640` — _richBmi
- `10645` — _richPat
- `10651` — _richNum
- `10696` — _richPreselezione
- `10712` — richLeggiIntestazione
- `10716` — richSalvaIntestazione
- `10725` — apriRichiestaAnalisi
- `10745` — _richModaleHtml
- `10821` — _richEsc
- `10823` — _richMotivoCambia
- `10829` — _richToggleSez
- `10835` — _richAggiornaConteggi
- `10843` — _richMotivoCorrente
- `10853` — _richSelezione
- `10868` — _richTxt
- `10874` — _richCostruisciPDF
- `8969` — nuovaPagina
- `8970` — spazio
- `10970` — _richNomeFile
- `10975` — _richPrepara
- `10988` — _richRegistra
- `10993` — _richStato
- `10995` — richScaricaPDF
- `11044` — _richUpload
- `11046` — _richWaUrl
- `11053` — _richTestoWa
- `11067` — richInviaWhatsApp
- `11107` — richCopiaLink
- `11128` — _richStoricoHtml

---
### REFERTI DEL SANGUE DATATI — storico nel tempo (P118 tappa 1)
Righe 9194-9387 — migrazione, ordinamento, quadro attuale derivato, barra di selezione.

- `12249` — _refertoNuovoId
- `12252` — _refertoOggi
- `12256` — _refertoDataIt
- `12262` — _refertoConteggio
- `12276` — _refertiMigra
- `12303` — _refertiOrdinati
- `12314` — _refertoPiuRecente
- `12319` — _refertoInVista
- `12337` — _refertiApplica
- `12350` — _refertoCrea
- `12369` — refertoCambiaVista
- `12375` — refertoCambiaData
- `12387` — refertoNuovo
- `12395` — refertoDuplica
- `12404` — refertoElimina
- `12419` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `11862` — _rangeNum
- `11868` — _rangeTestoDa
- `11887` — _rangeCoppia
- `11897` — _rangeHtml

---
### ANDAMENTO NEL TEMPO — tracciato, variazione, grafico grande (P118 tappa 3)
Righe 9441-9745 — serie storica, regola del colore, sparkline, pannello in fondo.

- `11939` — _andLimiti
- `11960` — _andParseRangeLab
- `11973` — _andDistanza
- `11980` — _andValutazione
- `11993` — _andSerie
- `12007` — _andNum
- `12011` — _andDataBreve
- `12016` — _andMeseAnno
- `12024` — _andDominio
- `12038` — _andColore
- `12051` — _andSparkHtml
- `12077` — _andRigaHtml
- `12099` — _andEsamiSeguibili
- `12107` — andScegliEsame
- `12113` — _andPannelloHtml
- `12166` — _andGraficoGrande
- `12217` — _andPasso

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 13657-15524

- `13657` — _ibFmtBreve
- `14119` — _renderPesiIntermediSection
- `14234` — aggiungiPesoIntermedio
- `14250` — eliminaPesoIntermedio
- `14260` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `15524` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 15832-15832

- `15832` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 16234-19434

- `16234` — aggiornaLabelMacros
- `16252` — calcolaMacros
- `16393` — applicaSchema
- `16428` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `16434` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `16456` — _misuraDaReferto *(P127 — UN referto letto con le regole del traguardo: usata anche dalla verifica al controllo)*
- `16489` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `16500` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `16518` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `16631` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `16645` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `16701` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `16715` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `16747` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `16780` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `16822` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `16830` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `16841` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `16868` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `16883` — _stradeVerso *(le strade complete + percentuale libera)*
- `16930` — _VC_TOLLERANZA_PCT / _VC_GIORNI_MIN / _VC_GIORNI_MIN_RITARO / _VC_COPERTURA_MIN_PCT / _VC_MAGRA_PRUDENZA_GG *(P127 — soglie cliniche della verifica)*
- `16940` — _mediaSlotPrescritta *(media pesata sui giorni di un campo dello storico target; la usa anche _kcalMediaPrescrittaOss)*
- `16960` — _vcDeficitSlot *(deficit di uno slot: campo offset o kcal−tdee per gli slot vecchi)*
- `16968` — _vcTratto *(P127 — cosa è cambiato fra due referti, previsto vs reale, TDEE misurato)*
- `17022` — _vcTraguardoSalvato *(traguardo ricostruito dal salvato, per la scheda Percorso)*
- `17032` — _verificaControllo *(P127 — motore puro: tratto recente, quadro dall'inizio, residuo al ritmo reale)*
- `17070` — _verificaControlloHtml *(blocco 🔎, unica fonte per pannello 🎯 e scheda Percorso; azioni solo dove c'è il campo kcal)*
- `17162` — _vcRitara *(scrive le kcal ritarate nel campo regime: propone, non salva)*
- `17180` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `17311` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `17335` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `17397` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `17535` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `17550` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `17575` — _renderRifPesoBox
- `17630` — _usaRifPeso
- `17634` — _aggiornaRifPesoTarget
- `17637` — _aggiornaRegimeSlider
- `18298` — _presetRegime
- `18302` — _initRegimeSliderDaPaziente
- `16633` — ricalcolaLAF
- `18480` — renderStoricoTDEE
- `18522` — attivaSlotTDEE
- `18539` — eliminaSlotTDEE
- `18552` — _toggleCiclizzazione
- `18558` — _aggiornaAnteprimaCiclizzazione
- `18576` — salvaCalcoloMacros
- `18891` — _metAllenamento
- `19130` — _neatFrazione
- `19249` — _larnLafStileVita
- `19266` — _regimeOffset
- `19276` — _componiRegimeText
- `19309` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `19321` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `19328` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `19434` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 19452-19896

- `19452` — renderTargetBadge
- `17819` — verificaRegola_75_20_5
- `17856` — renderBadge75_20_5
- `19597` — _validaNorm
- `19600` — _validaMatchTermine
- `19608` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `19659` — _validaTesto
- `19680` — validaPiano
- `19754` — _validaFirmaBlocchi
- `19761` — renderBadgeValidatore
- `19792` — _validaVaiAlGiorno
- `19801` — apriPannelloValidatore
- `13472` — esc
- `19858` — _validaEseguiOverride
- `19881` — validaGateExport
- `19896` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 20029-20675

- `13570` — abbr
- `13575` — isSab
- `13577` — buildVistaA
- `13581` — righeCategoria
- `13633` — buildVistaB
- `13639` — barColor
- `13644` — barW
- `13652` — barRow
- `13673` — getTabContent
- `13677` — tabBtn
- `20029` — pianoPazSelezionato
- `20176` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `20428` — renderPanelMacrosGiorno
- `20571` — pmgCambiaGrammi
- `20598` — riapriPiano
- `20636` — _montaPianoCorrente
- `20675` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 20685-21159

- `20685` — pullTemplateSupabase
- `20696` — delTemplateSupabase
- `20705` — _promptTemplateNome
- `20730` — _creaTemplateDaJSON
- `20753` — salvaComeTemplate
- `20764` — salvaComeTemplateDaPiano
- `20773` — _normNomeAlim
- `20774` — _escRegAlim
- `20775` — _raccogliAlimentiDaPiano
- `20786` — _alimentiEsclusiPaziente
- `20798` — _trovaConflittiTemplate
- `20816` — _mostraAvvisoConflitti
- `20840` — applicaTemplate
- `20858` — apriPickerTemplate
- `20886` — _pickPaziente
- `20910` — applicaTemplatePick
- `20914` — rinominaTemplate
- `20925` — eliminaTemplate
- `20935` — renderLibreriaTemplate
- `20964` — renderStoricoPiani
- `21023` — eliminaPiano
- `21039` — _getActiveMacrosTarget
- `21063` — getTargetAttivi
- `21100` — calcolaTargetsCiclizzazione
- `21126` — _setupPianoTargets
- `21150` — getStagioneCorrente
- `21159` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 21630-21630

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `21630` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 21639-22101

- `21639` — aggiornaUIcolazione
- `21649` — salvaRegolePiano
- `21710` — _isModelloSistema
- `21713` — _isModelloSistemaModificato
- `21725` — caricaModelliCustomLocal
- `21739` — salvaModelliCustomLocal
- `21760` — _migraRecordCustom
- `21778` — _syncAliasLegacy
- `21787` — caricaAlimentiCustom
- `21811` — pushAlimentiCustomSupabase
- `21821` — pullAlimentiCustomSupabase
- `21835` — pushModelliSupabase
- `21853` — pullModelliSupabase
- `21878` — _calcolaFreqDaModello
- `21897` — aggiornaUImodello
- `21986` — popolaDropdownModelli
- `22014` — cambiaModelloRotazione
- `22020` — ripristinaModelloOriginale
- `22043` — eliminaModelloCustom
- `22061` — mostraAnteprimaModello
- `22071` — apriEditorModello
- `22101` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 22370-22608

- `15738` — rerender
- `22370` — _salvaModelloDaEditor
- `22412` — caricaRegolePiano
- `22442` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `22477` — _aiLogUsage
- `22499` — _aiProxyUrl
- `22505` — _aiTokenPerProxy
- `22534` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `22608` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 22687-22827

- `16216` — _risolviCollisioniCelle
- `22687` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `22747` — getFruttaStile
- `22754` — _fruttaGetPasto
- `22764` — _fruttaContaRigheRicetta
- `22768` — _fruttaIndiceBasePasto
- `22788` — getFruttaMarker
- `22801` — fruttaMarkerHtml
- `22809` — _fruttaCheckboxHtml
- `22818` — toggleFrutta
- `22827` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 22863-24137

- `22863` — _renderCelleGriglia
- `22943` — _renderRicetteTestuali
- `22982` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `23053` — _renderCelleHtml
- `23061` — toggleCellaMenu
- `23080` — closeAllCellaMenus
- `23088` — _trovaPasto
- `23096` — cellaSposta
- `23150` — cellaCancella
- `23171` — apriEditGrammatura
- `16789` — salva
- `23219` — cellaSwap
- `23239` — cellaRimuoviAlt
- `23253` — cellaAggiungiAlt
- `23356` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `23441` — apriEditRicetta
- `23450` — aggiungiRicetta
- `23466` — rimuoviRicetta
- `23475` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `23637` — ngAggiungiSpuntinoVuoto
- `23653` — apriAggiungiCella
- `17254` — risolviCompatibili
- `23749` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `23841` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `23982` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `24137` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 24185-24577

- `24185` — _attesoStrutturaPiano
- `24205` — _confrontaStrutturaPiano
- `24235` — _costruisciPromptDelta
- `24262` — _pianoToolSchema
- `24337` — _pianoMaxTokens
- `24346` — _estraiPianoDaRisposta
- `24368` — chiamaGeneraPiano
- `24535` — mostraLoadingSteps
- `18123` — render
- `24577` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 24644-25221

- `24644` — generaMessaggioAI
- `24749` — copiaMessaggioAI
- `24759` — salvaInStorico
- `24771` — salvaVarianteAI
- `24786` — renderVariantiSalvate
- `24805` — usaVariante
- `24823` — eliminaVariante
- `24834` — renderStoricoMsg
- `24850` — apriWhatsApp
- `25221` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 25399-26896

- `25399` — _ngColoreSemaforoNome
- `25407` — apriSceltaModalitaPiano
- `25442` — _ngChiudiModalita
- `25445` — _ngCostruisciGiornoVuoto
- `25478` — _ngCostruisciGiornoSpeciale
- `25489` — _ngIndiceInizioSpeciali
- `25500` — _ngModalitaNomeGiorno
- `25506` — _ngImpostaModalitaNomeGiorno
- `25509` — _ngLettera
- `25516` — _ngEtichettaGiorno
- `25536` — _ngEtichettaGiornoBreve
- `25550` — _ngToggleGiornoSpeciale
- `25574` — _ngRenderPannelloSpeciale
- `25642` — _generaGiornoSpecialeAI
- `25742` — _ngGiornoHaContenuto
- `25754` — _ngCreaPianoManuale
- `25777` — _ngScrollTabGiorni
- `25787` — _ngAbilitaDragScroll
- `25824` — _ngCambiaNumeroGiorni
- `25856` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `25870` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `25911` — _ngToggleCat
- `25920` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `25944` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `26100` — _ngSalvaPianoManuale
- `26126` — _ngParseIngrediente
- `26150` — _ngScomponiIngredienti
- `26162` — _ricCalcolaMacroDaIngredienti
- `26180` — _ricRicalcolaMacroLive
- `26187` — _ricAggiornaInfoMacro
- `26201` — _ricRicalcolaMacroLiveNow
- `26225` — _ngTrovaCategoriaAlimento
- `26258` — _ngPescaRicetta
- `26301` — _ngScomponiRicettaNelPasto
- `26338` — _ngDragStart
- `26349` — _ngDragStartCella
- `26360` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `26367` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `26372` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `26391` — _ngAggiungiAlimento
- `26416` — _ngRimuoviAlimento
- `26430` — _ngDopoModifica
- `26448` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `26501` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `26530` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `26547` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `26555` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `26627` — gramTestoCasalingo
- `26653` — _appendToggleNutrizionali
- `26696` — _appendTogglePromemoria
- `26725` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `26871` — cpFromEmoji
- `26877` — getEmojiCp
- `26896` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `24871` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `24893` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `24898` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `24924` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `25012` — _spesaTestoWhatsApp
- `25028` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `25073` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `25096` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `25124` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `25184` — scaricaListaSpesaPDF (download diretto, un click)
- `25192` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `25204` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 28048-28048

- `20460` — fetchEmojiB64
- `20478` — _generaPDFSync
- `20563` — loadEmojiSync
- `20569` — drawEmoji
- `20580` — safe
- `20591` — setFont
- `20597` — measure
- `20603` — gramText
- `20612` — pastoOf
- `20621` — macroDelPasto
- `20666` — kcalDelPasto
- `20670` — macroDelGiorno
- `20688` — kcalDelGiorno
- `20691` — formatValori
- `20701` — drawCopertina
- `20834` — measurePasto
- `20884` — groupCelleByOrdine
- `20894` — cellHeight
- `20903` — drawDayHeader
- `20918` — drawPasto
- `20958` — stripEmojiPDF
- `21091` — drawCella
- `21428` — collectCp
- `21434` — getEmojiCpStandalone
- `28048` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 28062-28274

- `28062` — salvaInbody
- `28132` — delInbody
- `28139` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `28274` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 28302-29089

- `28302` — buildSemLegenda
- `28316` — renderAlEditor
- `28413` — _alimNomeRegex
- `28421` — _alimGiorniDaPiano
- `28429` — _scanGiorniPerNome
- `28444` — scanRiferimentiAlimento
- `28473` — _alimRefsRighe
- `28479` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `28567` — modificaAlimentoCustom
- `28587` — ripristinaValoriPrecedentiAlimento
- `28599` — _resetAlimModal
- `28611` — apriNuovoAlimentoCustom
- `28617` — salvaAlimentoCustom
- `28687` — eliminaAlimentoCustom
- `28995` — _alimFonteBadge
- `29000` — renderAlimentiPage
- `22217` — E
- `29071` — archiviaAlimentoCustom
- `29089` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 29116-29752

- `29116` — _bcSetStatus
- `29118` — apriScannerBarcode
- `29126` — chiudiScannerBarcode
- `29131` — _bcStopCamera
- `29139` — _bcModaleAperto
- `29141` — _bcAvviaCamera
- `29152` — _bcAvviaNativo
- `29172` — _bcAvviaZXing
- `29181` — _bcZXStart
- `29192` — _bcErroreCamera
- `29200` — cercaBarcodeManuale
- `29206` — _barcodeTrovato
- `29377` — cercaBarcodeOFF
- `29406` — _bcProdottoNonTrovato
- `29421` — _bcPrecompilaForm
- `22477` — num
- `29466` — togAl
- `29519` — selCatAl
- `25402` — selTuttiAl
- `29584` — _appIdAnag  (P140 T1)
- `29594` — _appSyncPaz  (P140 T1)
- `29638` — _appSpecchioInverso  (P140 T2)
- `29664` — _appRitiraSpecchio  (P140 T2)
- `29695` — _appAncoraTappe  (P140 T2)
- `29714` — _appTappe  (P140 T2)
- `29735` — _appMigraPaziente  (P140 T1)
- `29745` — _appMigraTutti  (P140 T1)
- `29752` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 29768-30237

- `29768` — setCalView
- `29778` — calPrev
- `29779` — calNext
- `29780` — calToday
- `29782` — renderCal
- `29796` — renderCalMonth
- `29823` — renderCalWeek
- `29856` — renderCalDay
- `29907` — selGiorno
- `29921` — setDisp
- `29926` — openAddEvento
- `29939` — openAddEventoPaz
- `29945` — toggleEntrataCheck
- `29950` — salvaEvento
- `29992` — _evTestoPromemoria  (P140 T1)
- `29998` — openEvDetail
- `30053` — delEvento
- `30075` — copyMsg
- `30087` — aggDateCal
- `27020` — syncInizio
- `27021` — syncControllo
- `30100` — aggiornaPrev
- `30125` — apriEventoDaScheda  (P140 T2)
- `30139` — _appAggiornaOreScheda  (P140 T2)
- `30156` — renderRic
- `30183` — openNuovaRic
- `30184` — editRic
- `30194` — salvaRic
- `30219` — delRic
- `30237` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 30323-30383

- `30323` — aggiungiEntrataPerPaziente
- `30340` — openNuovaEntrata
- `30354` — salvaEntrata
- `30375` — delEntrata
- `30383` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 30413-31128

- `30413` — aiSuggerisciRicetta
- `30458` — renderConcettiModal
- `30477` — apriConcettiModal
- `30504` — salvaConcettiAllegati
- `30528` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `30566` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `30709` — loadInbodyPDF
- `30830` — _vitdLabel
- `30834` — getIntegratori
- `30838` — getIntegraWant
- `30851` — _chiaviSpuntate *(P148 — risolve le etichette salvate in chiavi, regola 21)*
- `30859` — setIntegratori
- `30876` — setIntegraWant
- `30904` — _infoIntegratoreHtml *(P148 — contenuto del pannello ⓘ)*
- `30932` — mostraInfoIntegratore *(P148 — apre/chiude il pannello sotto la griglia)*
- `30944` — renderCaselleIntegratori *(P148 — genera le caselle dal catalogo; va chiamata PRIMA di setIntegratori, altrimenti le spunte non trovano gli elementi)*
- `31005` — getPatologieChip
- `31006` — getAllergieChip
- `31007` — setPatologieChip
- `31008` — setAllergieChip
- `31009` — getPatologie
- `31010` — getAllergie
- `31011` — setPatologieFromStr
- `31018` — setAllergieFromStr
- `31031` — getSdvChip
- `31032` — getCspChip
- `31033` — setSdvChip
- `31034` — setCspChip
- `31035` — setSdvFromStr
- `31036` — setCspFromStr
- `31040` — getBudget
- `31041` — setBudget
- `31046` — renderCalAnno
- `31077` — comprimeImmagine
- `31099` — uploadImmagineConcetto
- `31118` — rimuoviImmagineConcetto
- `31128` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 31194-31278

- `31194` — entraSelConcetti
- `31195` — annullaSelConcetti
- `31196` — toggleConcettoSel
- `31201` — eliminaConcettiSelezionati
- `31220` — confermaEliminaConcetti
- `31235` — aiRiscriviConcetto
- `31249` — editConcetto
- `31267` — salvaConcetto
- `31278` — openNuovoConcetto
- `27519` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 31315-31315

- `27520` — saveAgendaPersonale
- `27521` — getAgendaTodo
- `27522` — saveAgendaTodo
- `27524` — pulisciAgendaVecchia
- `27528` — navigaAgenda
- `27537` — toggleFormAgenda
- `27538` — toggleFormTodo
- `27540` — salvaAgendaItem
- `27554` — salvaTodoItem
- `27566` — toggleAgendaFatto
- `27574` — toggleTodoFatto
- `27587` — _catCol
- `27589` — renderAgendaDx
- `31315` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 31427-31752

- `31427` — renderScadenzeAlert
- `31687` — _scadGestiti  (P144)
- `31697` — _scadPota  (P144)
- `31712` — _scadMigraDaLocalStorage  (P144)
- `31735` — segnaGestito
- `31752` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 31761-31836

- `31761` — ripristinaPaz
- `31769` — eliminaPaz
- `31814` — getDove
- `31818` — setDove
- `31836` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 31841-32279

- `31841` — getCredenzialiPersistenti
- `31854` — cancellaCredenzialiPersistenti
- `31859` — rinnovaSessioneConRefreshToken
- `31876` — getSessioneSalvata
- `31895` — salvaSessione
- `31905` — cancellaSessione
- `31909` — eseguiLogin
- `31956` — eseguiLogout
- `31978` — mostraApp
- `31983` — verificaSessioneEAvvia
- `32011` — assicuraTokenValido
- `32040` — _garantiscoSessionePerSync
- `32052` — avviaRinnovoTokenPeriodico
- `32056` — fermaRinnovoTokenPeriodico
- `32065` — _authReset
- `32070` — _authMostra
- `32073` — mostraLogin
- `32074` — mostraRegistrazione
- `32075` — mostraRecupero
- `32076` — mostraNuovaPassword
- `32079` — eseguiRegistrazione
- `32117` — eseguiRecuperoPassword
- `32146` — eseguiNuovaPassword
- `32180` — _parseHashParams
- `32187` — _pulisciHash
- `32191` — gestisciRitornoAuth
- `32279` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 32351-32452

- `32351` — apriPannelloRicette
- `32380` — chiudiPannelloRicette
- `32388` — applicaRicettaPasto
- `32424` — inizializzaP2
- `32436` — deepClone
- `30143` — applicaPatch
- `32452` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
