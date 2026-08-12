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
Righe 19452-19919

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
- `19807` — _validaVaiAlGiorno
- `19824` — apriPannelloValidatore
- `13472` — esc
- `19881` — _validaEseguiOverride
- `19904` — validaGateExport
- `19919` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 20052-20698

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
- `20052` — pianoPazSelezionato
- `20199` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `20451` — renderPanelMacrosGiorno
- `20594` — pmgCambiaGrammi
- `20621` — riapriPiano
- `20659` — _montaPianoCorrente
- `20698` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 20708-21182

- `20708` — pullTemplateSupabase
- `20719` — delTemplateSupabase
- `20728` — _promptTemplateNome
- `20753` — _creaTemplateDaJSON
- `20776` — salvaComeTemplate
- `20787` — salvaComeTemplateDaPiano
- `20796` — _normNomeAlim
- `20797` — _escRegAlim
- `20798` — _raccogliAlimentiDaPiano
- `20809` — _alimentiEsclusiPaziente
- `20821` — _trovaConflittiTemplate
- `20839` — _mostraAvvisoConflitti
- `20863` — applicaTemplate
- `20881` — apriPickerTemplate
- `20909` — _pickPaziente
- `20933` — applicaTemplatePick
- `20937` — rinominaTemplate
- `20948` — eliminaTemplate
- `20958` — renderLibreriaTemplate
- `20987` — renderStoricoPiani
- `21046` — eliminaPiano
- `21062` — _getActiveMacrosTarget
- `21086` — getTargetAttivi
- `21123` — calcolaTargetsCiclizzazione
- `21149` — _setupPianoTargets
- `21173` — getStagioneCorrente
- `21182` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 21653-21653

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `21653` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 21662-22124

- `21662` — aggiornaUIcolazione
- `21672` — salvaRegolePiano
- `21733` — _isModelloSistema
- `21736` — _isModelloSistemaModificato
- `21748` — caricaModelliCustomLocal
- `21762` — salvaModelliCustomLocal
- `21783` — _migraRecordCustom
- `21801` — _syncAliasLegacy
- `21810` — caricaAlimentiCustom
- `21834` — pushAlimentiCustomSupabase
- `21844` — pullAlimentiCustomSupabase
- `21858` — pushModelliSupabase
- `21876` — pullModelliSupabase
- `21901` — _calcolaFreqDaModello
- `21920` — aggiornaUImodello
- `22009` — popolaDropdownModelli
- `22037` — cambiaModelloRotazione
- `22043` — ripristinaModelloOriginale
- `22066` — eliminaModelloCustom
- `22084` — mostraAnteprimaModello
- `22094` — apriEditorModello
- `22124` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 22393-22631

- `15738` — rerender
- `22393` — _salvaModelloDaEditor
- `22435` — caricaRegolePiano
- `22465` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `22500` — _aiLogUsage
- `22522` — _aiProxyUrl
- `22528` — _aiTokenPerProxy
- `22557` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `22631` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 22710-22850

- `16216` — _risolviCollisioniCelle
- `22710` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `22770` — getFruttaStile
- `22777` — _fruttaGetPasto
- `22787` — _fruttaContaRigheRicetta
- `22791` — _fruttaIndiceBasePasto
- `22811` — getFruttaMarker
- `22824` — fruttaMarkerHtml
- `22832` — _fruttaCheckboxHtml
- `22841` — toggleFrutta
- `22850` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 22886-24160

- `22886` — _renderCelleGriglia
- `22966` — _renderRicetteTestuali
- `23005` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `23076` — _renderCelleHtml
- `23084` — toggleCellaMenu
- `23103` — closeAllCellaMenus
- `23111` — _trovaPasto
- `23119` — cellaSposta
- `23173` — cellaCancella
- `23194` — apriEditGrammatura
- `16789` — salva
- `23242` — cellaSwap
- `23262` — cellaRimuoviAlt
- `23276` — cellaAggiungiAlt
- `23379` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `23464` — apriEditRicetta
- `23473` — aggiungiRicetta
- `23489` — rimuoviRicetta
- `23498` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `23660` — ngAggiungiSpuntinoVuoto
- `23676` — apriAggiungiCella
- `17254` — risolviCompatibili
- `23772` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `23864` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `24005` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `24160` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 24208-24600

- `24208` — _attesoStrutturaPiano
- `24228` — _confrontaStrutturaPiano
- `24258` — _costruisciPromptDelta
- `24285` — _pianoToolSchema
- `24360` — _pianoMaxTokens
- `24369` — _estraiPianoDaRisposta
- `24391` — chiamaGeneraPiano
- `24558` — mostraLoadingSteps
- `18123` — render
- `24600` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 24667-25244

- `24667` — generaMessaggioAI
- `24772` — copiaMessaggioAI
- `24782` — salvaInStorico
- `24794` — salvaVarianteAI
- `24809` — renderVariantiSalvate
- `24828` — usaVariante
- `24846` — eliminaVariante
- `24857` — renderStoricoMsg
- `24873` — apriWhatsApp
- `25244` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 25422-26919

- `25422` — _ngColoreSemaforoNome
- `25430` — apriSceltaModalitaPiano
- `25465` — _ngChiudiModalita
- `25468` — _ngCostruisciGiornoVuoto
- `25501` — _ngCostruisciGiornoSpeciale
- `25512` — _ngIndiceInizioSpeciali
- `25523` — _ngModalitaNomeGiorno
- `25529` — _ngImpostaModalitaNomeGiorno
- `25532` — _ngLettera
- `25539` — _ngEtichettaGiorno
- `25559` — _ngEtichettaGiornoBreve
- `25573` — _ngToggleGiornoSpeciale
- `25597` — _ngRenderPannelloSpeciale
- `25665` — _generaGiornoSpecialeAI
- `25765` — _ngGiornoHaContenuto
- `25777` — _ngCreaPianoManuale
- `25800` — _ngScrollTabGiorni
- `25810` — _ngAbilitaDragScroll
- `25847` — _ngCambiaNumeroGiorni
- `25879` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `25893` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `25934` — _ngToggleCat
- `25943` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `25967` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `26123` — _ngSalvaPianoManuale
- `26149` — _ngParseIngrediente
- `26173` — _ngScomponiIngredienti
- `26185` — _ricCalcolaMacroDaIngredienti
- `26203` — _ricRicalcolaMacroLive
- `26210` — _ricAggiornaInfoMacro
- `26224` — _ricRicalcolaMacroLiveNow
- `26248` — _ngTrovaCategoriaAlimento
- `26281` — _ngPescaRicetta
- `26324` — _ngScomponiRicettaNelPasto
- `26361` — _ngDragStart
- `26372` — _ngDragStartCella
- `26383` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `26390` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `26395` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `26414` — _ngAggiungiAlimento
- `26439` — _ngRimuoviAlimento
- `26453` — _ngDopoModifica
- `26471` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `26524` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `26553` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `26570` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `26578` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `26650` — gramTestoCasalingo
- `26676` — _appendToggleNutrizionali
- `26719` — _appendTogglePromemoria
- `26748` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `26894` — cpFromEmoji
- `26900` — getEmojiCp
- `26919` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `24894` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `24916` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `24921` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `24947` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `25035` — _spesaTestoWhatsApp
- `25051` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `25096` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `25119` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `25147` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `25207` — scaricaListaSpesaPDF (download diretto, un click)
- `25215` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `25227` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 28071-28071

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
- `28071` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 28085-28297

- `28085` — salvaInbody
- `28155` — delInbody
- `28162` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `28297` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 28325-29112

- `28325` — buildSemLegenda
- `28339` — renderAlEditor
- `28436` — _alimNomeRegex
- `28444` — _alimGiorniDaPiano
- `28452` — _scanGiorniPerNome
- `28467` — scanRiferimentiAlimento
- `28496` — _alimRefsRighe
- `28502` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `28590` — modificaAlimentoCustom
- `28610` — ripristinaValoriPrecedentiAlimento
- `28622` — _resetAlimModal
- `28634` — apriNuovoAlimentoCustom
- `28640` — salvaAlimentoCustom
- `28710` — eliminaAlimentoCustom
- `29018` — _alimFonteBadge
- `29023` — renderAlimentiPage
- `22217` — E
- `29094` — archiviaAlimentoCustom
- `29112` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 29139-29775

- `29139` — _bcSetStatus
- `29141` — apriScannerBarcode
- `29149` — chiudiScannerBarcode
- `29154` — _bcStopCamera
- `29162` — _bcModaleAperto
- `29164` — _bcAvviaCamera
- `29175` — _bcAvviaNativo
- `29195` — _bcAvviaZXing
- `29204` — _bcZXStart
- `29215` — _bcErroreCamera
- `29223` — cercaBarcodeManuale
- `29229` — _barcodeTrovato
- `29400` — cercaBarcodeOFF
- `29429` — _bcProdottoNonTrovato
- `29444` — _bcPrecompilaForm
- `22477` — num
- `29489` — togAl
- `29542` — selCatAl
- `25402` — selTuttiAl
- `29607` — _appIdAnag  (P140 T1)
- `29617` — _appSyncPaz  (P140 T1)
- `29661` — _appSpecchioInverso  (P140 T2)
- `29687` — _appRitiraSpecchio  (P140 T2)
- `29718` — _appAncoraTappe  (P140 T2)
- `29737` — _appTappe  (P140 T2)
- `29758` — _appMigraPaziente  (P140 T1)
- `29768` — _appMigraTutti  (P140 T1)
- `29775` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 29791-30260

- `29791` — setCalView
- `29801` — calPrev
- `29802` — calNext
- `29803` — calToday
- `29805` — renderCal
- `29819` — renderCalMonth
- `29846` — renderCalWeek
- `29879` — renderCalDay
- `29930` — selGiorno
- `29944` — setDisp
- `29949` — openAddEvento
- `29962` — openAddEventoPaz
- `29968` — toggleEntrataCheck
- `29973` — salvaEvento
- `30015` — _evTestoPromemoria  (P140 T1)
- `30021` — openEvDetail
- `30076` — delEvento
- `30098` — copyMsg
- `30110` — aggDateCal
- `27020` — syncInizio
- `27021` — syncControllo
- `30123` — aggiornaPrev
- `30148` — apriEventoDaScheda  (P140 T2)
- `30162` — _appAggiornaOreScheda  (P140 T2)
- `30179` — renderRic
- `30206` — openNuovaRic
- `30207` — editRic
- `30217` — salvaRic
- `30242` — delRic
- `30260` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 30346-30406

- `30346` — aggiungiEntrataPerPaziente
- `30363` — openNuovaEntrata
- `30377` — salvaEntrata
- `30398` — delEntrata
- `30406` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 30436-31151

- `30436` — aiSuggerisciRicetta
- `30481` — renderConcettiModal
- `30500` — apriConcettiModal
- `30527` — salvaConcettiAllegati
- `30551` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `30589` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `30732` — loadInbodyPDF
- `30853` — _vitdLabel
- `30857` — getIntegratori
- `30861` — getIntegraWant
- `30874` — _chiaviSpuntate *(P148 — risolve le etichette salvate in chiavi, regola 21)*
- `30882` — setIntegratori
- `30899` — setIntegraWant
- `30927` — _infoIntegratoreHtml *(P148 — contenuto del pannello ⓘ)*
- `30955` — mostraInfoIntegratore *(P148 — apre/chiude il pannello sotto la griglia)*
- `30967` — renderCaselleIntegratori *(P148 — genera le caselle dal catalogo; va chiamata PRIMA di setIntegratori, altrimenti le spunte non trovano gli elementi)*
- `31028` — getPatologieChip
- `31029` — getAllergieChip
- `31030` — setPatologieChip
- `31031` — setAllergieChip
- `31032` — getPatologie
- `31033` — getAllergie
- `31034` — setPatologieFromStr
- `31041` — setAllergieFromStr
- `31054` — getSdvChip
- `31055` — getCspChip
- `31056` — setSdvChip
- `31057` — setCspChip
- `31058` — setSdvFromStr
- `31059` — setCspFromStr
- `31063` — getBudget
- `31064` — setBudget
- `31069` — renderCalAnno
- `31100` — comprimeImmagine
- `31122` — uploadImmagineConcetto
- `31141` — rimuoviImmagineConcetto
- `31151` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 31217-31301

- `31217` — entraSelConcetti
- `31218` — annullaSelConcetti
- `31219` — toggleConcettoSel
- `31224` — eliminaConcettiSelezionati
- `31243` — confermaEliminaConcetti
- `31258` — aiRiscriviConcetto
- `31272` — editConcetto
- `31290` — salvaConcetto
- `31301` — openNuovoConcetto
- `27519` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 31338-31338

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
- `31338` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 31450-31775

- `31450` — renderScadenzeAlert
- `31710` — _scadGestiti  (P144)
- `31720` — _scadPota  (P144)
- `31735` — _scadMigraDaLocalStorage  (P144)
- `31758` — segnaGestito
- `31775` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 31784-31859

- `31784` — ripristinaPaz
- `31792` — eliminaPaz
- `31837` — getDove
- `31841` — setDove
- `31859` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 31864-32302

- `31864` — getCredenzialiPersistenti
- `31877` — cancellaCredenzialiPersistenti
- `31882` — rinnovaSessioneConRefreshToken
- `31899` — getSessioneSalvata
- `31918` — salvaSessione
- `31928` — cancellaSessione
- `31932` — eseguiLogin
- `31979` — eseguiLogout
- `32001` — mostraApp
- `32006` — verificaSessioneEAvvia
- `32034` — assicuraTokenValido
- `32063` — _garantiscoSessionePerSync
- `32075` — avviaRinnovoTokenPeriodico
- `32079` — fermaRinnovoTokenPeriodico
- `32088` — _authReset
- `32093` — _authMostra
- `32096` — mostraLogin
- `32097` — mostraRegistrazione
- `32098` — mostraRecupero
- `32099` — mostraNuovaPassword
- `32102` — eseguiRegistrazione
- `32140` — eseguiRecuperoPassword
- `32169` — eseguiNuovaPassword
- `32203` — _parseHashParams
- `32210` — _pulisciHash
- `32214` — gestisciRitornoAuth
- `32302` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 32374-32475

- `32374` — apriPannelloRicette
- `32403` — chiudiPannelloRicette
- `32411` — applicaRicettaPasto
- `32447` — inizializzaP2
- `32459` — deepClone
- `30143` — applicaPatch
- `32475` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
