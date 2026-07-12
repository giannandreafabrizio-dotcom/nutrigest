# NutriGest — INDEX.md

Mappa funzioni → righe di `index.html`, organizzata per area funzionale.
Generato via grep sul file scaricato da GitHub (raw main) il 2026-07-12. Righe totali file: 19416.

## Come usarlo
1. Trova l'area funzionale pertinente qui sotto (o cerca il nome funzione nella tabella).
2. Usa `view` con `view_range` sul range indicato invece di leggere tutto il file.
3. Se non sei sicuro del nome esatto, `grep -n "nomeFunzione"` prima di aprire.
4. Dopo modifiche strutturali (funzioni spostate/aggiunte in blocco), rigenera questo indice.
5. Se una funzione non è in tabella (closure interna, metodo annidato), usa grep diretto sul file.

⚠️ Le righe si spostano ad ogni modifica che aggiunge/rimuove righe sopra un dato punto. Il range è indicativo per la sessione in cui è stato generato; se un `view_range` non torna, fai grep di conferma prima di editare.

---

## Indice per area funzionale

### HEAD / CSS / HTML STATICO (markup, stili, struttura pagine)
Righe 1-2161

*(nessuna funzione top-level dichiarata in questo range — markup/CSS/dati statici)*

### MACROS PIANO — calcolo e badge macro reali vs target
Righe 2162-2484

- `2162` — getValoriCREA
- `2176` — getCurrentPaziente
- `2196` — getKcalWeekend
- `2239` — getMacrosRicettaComposta
- `2245` — calcolaMacrosPiano
- `2339` — renderBadgeMacrosReali
- `2397` — renderBadgeMacrosReali_DOM

### ANALISI DEL SANGUE — parsing, indici clinici derivati, interpretazione
Righe 2485-2953

- `2485` — ANALISI_KEY
- `2645` — _parseAnalisiNum
- `2653` — calcolaIndice
- `2791` — interpretaAnalisi
- `2803` — _interpAnalisiHtml
- `2817` — mostraInfoRange

### CONCETTI EDUCATIVI — sync Supabase, migrazione
Righe 2954-3166

- `2954` — pushConcetiSupabase
- `2968` — pullConcetiSupabase
- `2982` — migraConcetti

### ALIMENTI — categorie funzionali/semaforo, chip UI, equivalenze porzioni
Righe 3167-3440

- `3167` — getCategoriaSemaforo
- `3184` — _getCategorieGruppo
- `3198` — calcolaGrammaturaEquivalente
- `3215` — criterioByCat
- `3226` — suggerisciGrEquivalente
- `3271` — arrotondaPorzioneDiscreta
- `3285` — getCategoriaFunzionale
- `3325` — catArr
- `3341` — _tagComuniTrova
- `3345` — getTagComuniChip
- `3348` — setTagComuniChip
- `3356` — setCatChips
- `3369` — getStagioniChip
- `3372` — setStagioniChip
- `3379` — getProfiloChip
- `3382` — setProfiloChip
- `3391` — wireChipGroup
- `3402` — wireAttrChipGroups
- `3413` — wireRadioChipGroup

### CONFIG / STORAGE LOCALE — cfg, localStorage db, util data/valuta
Righe 3441-3601

- `3441` — getCfg
- `3442` — saveCfgL
- `3443` — getUrl
- `3444` — saveLocal
- `3445` — loadLocal
- `3446` — uid
- `3447` — today
- `3448` — addDays
- `3449` — fData
- `3450` — fEur
- `3452` — getLastSyncText
- `3462` — getSyncColor
- `3470` — aggiornaStatoSync
- `3496` — setSyncStatus
- `3533` — _registraTombstone
- `3541` — _tombstoneAttivi
- `3553` — _fondiTombstones
- `3567` — _mergeTombstonesRemoti
- `3580` — _applicaTombstones

### SYNC SUPABASE — push/pull ricette/pazienti, tombstones, conflitti (P69)
Righe 3602-3990

- `3602` — supaHeaders
- `3616` — pushRicetteSupabase
- `3641` — pullRicetteSupabase
- `3663` — delRicetteSupabase
- `3675` — delPazienteSupabase
- `3688` — pushToSheets
- `3731` — pullFromSheets
- `3806` — syncNow
- `3819` — sincronizzaTutto
- `3948` — testConnSupabase
- `3977` — _p68LogSaveAnonimo

### SYNC SUPABASE — save paziente, piani/cache piano, entrate, eventi
Righe 3991-4507

- `3991` — save
- `4009` — _pushRigaPerId
- `4042` — _flushDirtyIds
- `4125` — _p69LoadBaseline
- `4128` — _p69StoreBaseline
- `4131` — _p69SetBaseline
- `4135` — _p69DropBaseline
- `4139` — _p69SetBaselineFromRows
- `4145` — _p69NomePaz
- `4150` — _p69InList
- `4158` — _p69RilevaConflitti
- `4194` — _p69DialogoConflitti
- `4228` — _p69RisolviRicarica
- `4257` — _p69EsportaLocali
- `4270` — _p69RisolviSovrascrivi
- `4283` — pushPianoSupabase
- `4305` — pullPianiSupabase
- `4321` — delPianoSupabase
- `4337` — delPianiPazienteSupabase
- `4349` — pushCachePianoSupabase
- `4366` — caricaCachePianoSupabase
- `4388` — pushEntrateSupabase
- `4412` — pullEntrateSupabase
- `4426` — delEntrataSupabase
- `4434` — pushEntrataSupabase
- `4445` — pushEventoSupabase
- `4458` — pushEventiSupabase
- `4482` — pullEventiSupabase
- `4496` — delEventoSupabase
- `4507` — _pianoCacheKey

### UI GENERALE — config AI key, notifiche, navigazione (goTo/tab/modali)
Righe 4507-4656

- `4507` — _pianoCacheKey
- `4534` — _salvaPianoCache
- `4539` — _caricaPianoCache
- `4545` — salvaCfg
- `4546` — testConn
- `4552` — salvaAntKey
- `4560` — testaAntKey
- `4570` — initAntCard
- `4578` — esporta
- `4579` — importa
- `4584` — goTo
- `4600` — closeM
- `4608` — ngChiudiModale
- `4617` — ngChiudiPopupCoppia
- `4621` — ngAggiungiX
- `4632` — ngUpgradeModali
- `4652` — mTab
- `4653` — aggiornaEta
- `4654` — toggleOrarioNote
- `4655` — pdTab
- `4656` — notif

### PAZIENTI — registro: lista/card/kanban, apertura, editing, salvataggio, routine
Righe 4656-5901

- `4656` — notif
- `4664` — getPazView
- `4665` — setPazView
- `4674` — _pazStatoPiano
- `4682` — _pazUrgenzaControllo
- `4689` — _pazStatoTagHtml
- `4698` — _pazAggiornaFiltroRegimi
- `4706` — renderPaz
- `4757` — _renderPazCard
- `4782` — _renderPazLista
- `4809` — _renderPazKanban
- `4847` — openNuovoPaz
- `4873` — editPaz
- `4932` — applicaRegoloSemaforo
- `5443` — trovaChiaveAlimento
- `5452` — salvaPaz
- `5506` — openPaz
- `5588` — renderPdRoutine
- `5730` — updateRoutineCampo
- `5738` — suggerisciPastoEQuando
- `5765` — filtroLibreria
- `5774` — renderLibreriaGrid
- `5795` — aggiungiDaLibreriaIdx
- `5819` — openModalRoutine
- `5826` — salvaRoutineVoce
- `5851` — salvaRoutine
- `5858` — mostraRoutinePopup
- `5886` — removeRoutineVoce
- `5901` — _renderAggiustamentiSection

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 5901-6690

- `5901` — _renderAggiustamentiSection
- `5986` — salvaAggiustamento
- `6019` — eliminaAggiustamento
- `6028` — renderPdNote
- `6063` — salvaNotaClinica
- `6078` — deleteNota
- `6087` — saveNote
- `6602` — _applicaRegoloSemaforoLEGACY
- `6643` — resetSemaforoAuto
- `6690` — costruisciContestoPaziente

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 6690-7028

- `6690` — costruisciContestoPaziente
- `6828` — avviaFX
- `6856` — avviaAnalisi
- `6874` — _renderFlussoPanel
- `6918` — _riepEsc
- `6922` — _riepNum
- `6928` — _riepDelta
- `6936` — _riepDataSig
- `6954` — _riepParseFX
- `6968` — _riepAggiornaFX
- `6995` — _riepToggleDomandaDefault
- `7007` — _riepAddDomanda
- `7020` — _riepRemoveDomanda
- `7028` — renderPdRiepilogo

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 7028-7469

- `7028` — renderPdRiepilogo
- `7241` — renderPdRagionamento
- `7329` — inviaMessaggioRag
- `7348` — concludiERiassumi
- `7363` — salvaRagionamento
- `7384` — apriGeneratoreDaRag
- `7392` — nuovaSessioneRag
- `7398` — cancellaSavedRag
- `7408` — renderPazTimeline
- `7440` — renderPdAnamnesi
- `7469` — renderPdAlimenti

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 7469-7992

- `7469` — renderPdAlimenti
- `7513` — renderPdAnalisi
- `7557` — toggleAnalisiSection
- `7567` — loadAnalisiSanguePDF
- `7642` — mostraDiffAnalisi
- `7715` — _calcoloIncluso
- `7721` — toggleCalcoloIncluso
- `7743` — _renderCalcoliPannello
- `7779` — toggleGlossario
- `7784` — updateAnalisi
- `7837` — salvaAnalisi
- `7850` — applicaGruppoClinico
- `7879` — renderBoxGruppiCliniciSuggeriti
- `7911` — suggerisciGruppiClinici
- `7992` — renderMemoriaInbody

### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 7992-8246

- `7992` — renderMemoriaInbody
- `8040` — _ibFmtBreve
- `8049` — _renderPesiIntermediSection
- `8098` — aggiungiPesoIntermedio
- `8114` — eliminaPesoIntermedio
- `8124` — _ibSilhouetteSegmentale
- `8246` — renderPdInbody

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 8246-8518

- `8246` — renderPdInbody
- `8518` — renderPdMacros

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 8518-9390

- `8518` — renderPdMacros
- `8850` — aggiornaLabelMacros
- `8867` — calcolaMacros
- `8954` — applicaSchema
- `8961` — _renderRifPesoBox
- `9009` — _usaRifPeso
- `9013` — _aggiornaRifPesoTarget
- `9016` — _aggiornaRegimeSlider
- `9049` — _presetRegime
- `9053` — _initRegimeSliderDaPaziente
- `9069` — ricalcolaLAF
- `9105` — renderStoricoTDEE
- `9138` — attivaSlotTDEE
- `9146` — eliminaSlotTDEE
- `9159` — _toggleCiclizzazione
- `9165` — _aggiornaAnteprimaCiclizzazione
- `9183` — salvaCalcoloMacros
- `9284` — _metAllenamento
- `9296` — _neatFrazione
- `9302` — _larnLafStileVita
- `9319` — _regimeOffset
- `9329` — _componiRegimeText
- `9341` — calcolaTDEE
- `9390` — renderPianoPage

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 9390-9838

- `9390` — renderPianoPage
- `9408` — renderTargetBadge
- `9437` — verificaRegola_75_20_5
- `9474` — renderBadge75_20_5
- `9539` — _validaNorm
- `9542` — _validaMatchTermine
- `9550` — _validaCostruisciListe
- `9601` — _validaTesto
- `9622` — validaPiano
- `9696` — _validaFirmaBlocchi
- `9703` — renderBadgeValidatore
- `9734` — _validaVaiAlGiorno
- `9743` — apriPannelloValidatore
- `9800` — _validaEseguiOverride
- `9823` — validaGateExport
- `9838` — renderRiepilogoSettimana

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 9838-10521

- `9838` — renderRiepilogoSettimana
- `9971` — pianoPazSelezionato
- `10118` — renderPianoConPillTabs
- `10285` — renderPanelMacrosGiorno
- `10428` — pmgCambiaGrammi
- `10452` — riapriPiano
- `10482` — _montaPianoCorrente
- `10521` — pushTemplateSupabase

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 10521-11000

- `10521` — pushTemplateSupabase
- `10531` — pullTemplateSupabase
- `10542` — delTemplateSupabase
- `10551` — _promptTemplateNome
- `10576` — _creaTemplateDaJSON
- `10599` — salvaComeTemplate
- `10610` — salvaComeTemplateDaPiano
- `10619` — _normNomeAlim
- `10620` — _escRegAlim
- `10621` — _raccogliAlimentiDaPiano
- `10632` — _alimentiEsclusiPaziente
- `10644` — _trovaConflittiTemplate
- `10662` — _mostraAvvisoConflitti
- `10686` — applicaTemplate
- `10704` — apriPickerTemplate
- `10732` — _pickPaziente
- `10751` — applicaTemplatePick
- `10755` — rinominaTemplate
- `10766` — eliminaTemplate
- `10776` — renderLibreriaTemplate
- `10805` — renderStoricoPiani
- `10864` — eliminaPiano
- `10880` — _getActiveMacrosTarget
- `10904` — getTargetAttivi
- `10941` — calcolaTargetsCiclizzazione
- `10967` — _setupPianoTargets
- `10991` — getStagioneCorrente
- `11000` — costruisciPrompt

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 11000-11309

- `11000` — costruisciPrompt
- `11309` — toggleRegolePiano

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 11309-11745

- `11309` — toggleRegolePiano
- `11318` — aggiornaUIcolazione
- `11328` — salvaRegolePiano
- `11389` — _isModelloSistema
- `11392` — _isModelloSistemaModificato
- `11404` — caricaModelliCustomLocal
- `11418` — salvaModelliCustomLocal
- `11435` — caricaAlimentiCustom
- `11446` — pushAlimentiCustomSupabase
- `11460` — pullAlimentiCustomSupabase
- `11473` — pushModelliSupabase
- `11495` — pullModelliSupabase
- `11522` — _calcolaFreqDaModello
- `11541` — aggiornaUImodello
- `11630` — popolaDropdownModelli
- `11658` — cambiaModelloRotazione
- `11664` — ripristinaModelloOriginale
- `11687` — eliminaModelloCustom
- `11705` — mostraAnteprimaModello
- `11715` — apriEditorModello
- `11745` — _renderGrigliaModello

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
Righe 11745-12294

- `11745` — _renderGrigliaModello
- `12014` — _salvaModelloDaEditor
- `12056` — caricaRegolePiano
- `12083` — getAnthropicKey
- `12122` — _aiModelFor
- `12129` — _aiLogUsage
- `12151` — _aiProxyUrl
- `12155` — _aiProxyDisabled
- `12163` — _aiTokenPerProxy
- `12194` — aiCall
- `12294` — _normalizzaPianoNuovo

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 12294-12507

- `12294` — _normalizzaPianoNuovo
- `12367` — espandiPiano
- `12427` — getFruttaStile
- `12434` — _fruttaGetPasto
- `12444` — _fruttaContaRigheRicetta
- `12448` — _fruttaIndiceBasePasto
- `12468` — getFruttaMarker
- `12481` — fruttaMarkerHtml
- `12489` — _fruttaCheckboxHtml
- `12498` — toggleFrutta
- `12507` — _appendToggleFruttaStile

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 12507-13757

- `12507` — _appendToggleFruttaStile
- `12543` — _renderCelleGriglia
- `12620` — _renderRicetteTestuali
- `12659` — scambiaRicette
- `12730` — _renderCelleHtml
- `12738` — toggleCellaMenu
- `12757` — closeAllCellaMenus
- `12765` — _trovaPasto
- `12773` — cellaSposta
- `12827` — cellaCancella
- `12848` — apriEditGrammatura
- `12903` — cellaSwap
- `12920` — cellaRimuoviAlt
- `12934` — cellaAggiungiAlt
- `13029` — _mostraPopupAggiungiAlt
- `13115` — apriEditRicetta
- `13124` — aggiungiRicetta
- `13140` — rimuoviRicetta
- `13149` — _mostraPopupEditRicetta
- `13310` — ngAggiungiSpuntinoVuoto
- `13326` — apriAggiungiCella
- `13417` — _apriPopupRicettaComposta
- `13509` — _mostraPopupSceltaCategoriaAlimento
- `13650` — _aggiornaPianoBox
- `13757` — parseJSONSicuro

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 13757-14186

- `13757` — parseJSONSicuro
- `13805` — _attesoStrutturaPiano
- `13825` — _confrontaStrutturaPiano
- `13855` — _costruisciPromptDelta
- `13882` — _pianoToolSchema
- `13954` — _pianoMaxTokens
- `13963` — _estraiPianoDaRisposta
- `13985` — chiamaGeneraPiano
- `14155` — mostraLoadingSteps
- `14186` — apriAIWhatsApp

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 14186-14455

- `14186` — apriAIWhatsApp
- `14253` — generaMessaggioAI
- `14342` — copiaMessaggioAI
- `14352` — salvaInStorico
- `14364` — salvaVarianteAI
- `14379` — renderVariantiSalvate
- `14398` — usaVariante
- `14416` — eliminaVariante
- `14427` — renderStoricoMsg
- `14443` — apriWhatsApp
- `14455` — generaPiano

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 14455-15642

- `14455` — generaPiano
- `14633` — _ngColoreSemaforoNome
- `14641` — apriSceltaModalitaPiano
- `14676` — _ngChiudiModalita
- `14679` — _ngCostruisciGiornoVuoto
- `14687` — _ngGiornoHaContenuto
- `14699` — _ngCreaPianoManuale
- `14718` — _ngScrollTabGiorni
- `14728` — _ngAbilitaDragScroll
- `14756` — _ngCambiaNumeroGiorni
- `14778` — _ngRenderEditorManuale
- `14792` — _ngRenderAlbero
- `14833` — _ngToggleCat
- `14842` — _ngFiltraAlbero
- `14866` — _ngRenderPianoDestra
- `14981` — _ngSalvaPianoManuale
- `15007` — _ngParseIngrediente
- `15031` — _ngScomponiIngredienti
- `15043` — _ricCalcolaMacroDaIngredienti
- `15061` — _ricRicalcolaMacroLive
- `15068` — _ricAggiornaInfoMacro
- `15082` — _ricRicalcolaMacroLiveNow
- `15106` — _ngTrovaCategoriaAlimento
- `15139` — _ngPescaRicetta
- `15181` — _ngScomponiRicettaNelPasto
- `15218` — _ngDragStart
- `15229` — _ngDragStartCella
- `15240` — _ngDragOver
- `15247` — _ngDragLeave
- `15252` — _ngDrop
- `15271` — _ngAggiungiAlimento
- `15296` — _ngRimuoviAlimento
- `15310` — _ngDopoModifica
- `15373` — gramTestoCasalingo
- `15399` — _appendToggleNutrizionali
- `15442` — _appendTogglePromemoria
- `15471` — _appendBtnConcetti
- `15617` — cpFromEmoji
- `15623` — getEmojiCp
- `15642` — generaPDF

### EXPORT — generazione PDF piano (generaPDF)
Righe 15642-16644

- `15642` — generaPDF
- `16644` — openInbody

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 16644-16821

- `16644` — openInbody
- `16654` — salvaInbody
- `16678` — delInbody
- `16685` — ascoltaProgresso
- `16821` — buildSemBadges

### ALIMENTI CUSTOM — editor, badge semaforo per condizione
Righe 16821-17043

- `16821` — buildSemBadges
- `16849` — buildSemLegenda
- `16863` — renderAlEditor
- `16918` — salvaAlimentoCustom
- `16949` — eliminaAlimentoCustom
- `16964` — togAl
- `17017` — selCatAl
- `17031` — selTuttiAl
- `17043` — getEventi

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 17043-17373

- `17043` — getEventi
- `17057` — setCalView
- `17058` — calPrev
- `17059` — calNext
- `17060` — calToday
- `17062` — renderCal
- `17076` — renderCalMonth
- `17100` — renderCalWeek
- `17118` — renderCalDay
- `17134` — selGiorno
- `17148` — setDisp
- `17153` — openAddEvento
- `17166` — openAddEventoPaz
- `17172` — toggleEntrataCheck
- `17177` — salvaEvento
- `17200` — openEvDetail
- `17255` — delEvento
- `17263` — copyMsg
- `17270` — aggDateCal
- `17275` — syncInizio
- `17276` — syncControllo
- `17277` — aggiornaPrev
- `17294` — renderRic
- `17321` — openNuovaRic
- `17322` — editRic
- `17332` — salvaRic
- `17357` — delRic
- `17373` — renderEntrate

### RICETTARIO — CRUD ricette
Righe 17373-17518

- `17373` — renderEntrate
- `17458` — aggiungiEntrataPerPaziente
- `17475` — openNuovaEntrata
- `17489` — salvaEntrata
- `17510` — delEntrata
- `17518` — startVoiceRicetta

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 17518-17902

- `17518` — startVoiceRicetta
- `17548` — aiSuggerisciRicetta
- `17593` — renderConcettiModal
- `17612` — apriConcettiModal
- `17639` — salvaConcettiAllegati
- `17657` — loadInbodyPDF
- `17739` — _vitdLabel
- `17743` — getIntegratori
- `17747` — getIntegraWant
- `17751` — setIntegratori
- `17768` — setIntegraWant
- `17779` — getPatologieChip
- `17780` — getAllergieChip
- `17781` — setPatologieChip
- `17782` — setAllergieChip
- `17783` — getPatologie
- `17784` — getAllergie
- `17785` — setPatologieFromStr
- `17792` — setAllergieFromStr
- `17805` — getSdvChip
- `17806` — getCspChip
- `17807` — setSdvChip
- `17808` — setCspChip
- `17809` — setSdvFromStr
- `17810` — setCspFromStr
- `17814` — getBudget
- `17815` — setBudget
- `17820` — renderCalAnno
- `17851` — comprimeImmagine
- `17873` — uploadImmagineConcetto
- `17892` — rimuoviImmagineConcetto
- `17902` — renderConcettiPage

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 17902-18072

- `17902` — renderConcettiPage
- `17968` — entraSelConcetti
- `17969` — annullaSelConcetti
- `17970` — toggleConcettoSel
- `17975` — eliminaConcettiSelezionati
- `17994` — confermaEliminaConcetti
- `18009` — aiRiscriviConcetto
- `18023` — editConcetto
- `18041` — salvaConcetto
- `18052` — openNuovoConcetto
- `18072` — getAgendaPersonale

### DASHBOARD — agenda personale, todo, promemoria
Righe 18072-18236

- `18072` — getAgendaPersonale
- `18073` — saveAgendaPersonale
- `18074` — getAgendaTodo
- `18075` — saveAgendaTodo
- `18077` — pulisciAgendaVecchia
- `18081` — navigaAgenda
- `18090` — toggleFormAgenda
- `18091` — toggleFormTodo
- `18093` — salvaAgendaItem
- `18107` — salvaTodoItem
- `18119` — toggleAgendaFatto
- `18127` — toggleTodoFatto
- `18140` — _catCol
- `18142` — renderAgendaDx
- `18236` — renderDashboard

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 18236-18566

- `18236` — renderDashboard
- `18362` — renderScadenzeAlert
- `18547` — segnaGestito
- `18566` — archiviaPaz

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 18566-18646

- `18566` — archiviaPaz
- `18575` — ripristinaPaz
- `18581` — eliminaPaz
- `18624` — getDove
- `18628` — setDove
- `18646` — salvaCredenzialiPersistenti

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 18646-19068

- `18646` — salvaCredenzialiPersistenti
- `18651` — getCredenzialiPersistenti
- `18664` — cancellaCredenzialiPersistenti
- `18669` — rinnovaSessioneConRefreshToken
- `18686` — getSessioneSalvata
- `18699` — salvaSessione
- `18709` — cancellaSessione
- `18713` — eseguiLogin
- `18760` — eseguiLogout
- `18782` — mostraApp
- `18787` — verificaSessioneEAvvia
- `18815` — assicuraTokenValido
- `18840` — avviaRinnovoTokenPeriodico
- `18844` — fermaRinnovoTokenPeriodico
- `18853` — _authReset
- `18858` — _authMostra
- `18861` — mostraLogin
- `18862` — mostraRegistrazione
- `18863` — mostraRecupero
- `18864` — mostraNuovaPassword
- `18867` — eseguiRegistrazione
- `18905` — eseguiRecuperoPassword
- `18934` — eseguiNuovaPassword
- `18968` — _parseHashParams
- `18975` — _pulisciHash
- `18979` — gestisciRitornoAuth
- `19068` — renderPianoBox

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 19068-19416

- `19068` — renderPianoBox
- `19140` — apriPannelloRicette
- `19169` — chiudiPannelloRicette
- `19177` — applicaRicettaPasto
- `19213` — inizializzaP2
- `19225` — deepClone
- `19229` — applicaPatch
- `19263` — _aggiornaLabelSalvaPiano
