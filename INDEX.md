# NutriGest — INDEX.md

Mappa funzioni → righe di `index.html`, organizzata per area funzionale.
Generato via grep sul file scaricato da GitHub (raw main) il 2026-07-12. Righe totali file: 19439 (aggiornato dopo commit d32f6aa, fix sessione P105 — era 19416 prima).

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

### CATALOGO UNICO ALIMENTI (P108 fase 0) — record {id,nome,categoriaSem,gDefault,per100g,fonte}, risoluzione id/nome
Righe 2242-2298

- `2242` — _slugAlimento
- `2247` — CATALOGO_ALIMENTI (Map id→record; _CATALOGO_BY_NOME nome→record)
- `2250` — _catalogoIndicizza
- `2254` — _catalogoDeindicizza
- `2261` — costruisciCatalogo (chiamata al boot, avvolge ALIMENTI+CREA_ALIMENTI)
- `2284` — risolviAlimento (risoluzione UNICA: id → nome esatto → case-insensitive → canonico)

### MACROS PIANO — calcolo e badge macro reali vs target
Righe 2299-2619

- `2299` — getValoriCREA
- `2311` — getCurrentPaziente
- `2331` — getKcalWeekend
- `2374` — getMacrosRicettaComposta
- `2380` — calcolaMacrosPiano
- `2474` — renderBadgeMacrosReali
- `2532` — renderBadgeMacrosReali_DOM

### ANALISI DEL SANGUE — parsing, indici clinici derivati, interpretazione
Righe 2620-3088

- `2620` — ANALISI_KEY
- `2780` — _parseAnalisiNum
- `2788` — calcolaIndice
- `2926` — interpretaAnalisi
- `2938` — _interpAnalisiHtml
- `2952` — mostraInfoRange

### CONCETTI EDUCATIVI — sync Supabase, migrazione
Righe 3089-3301

- `3089` — pushConcetiSupabase
- `3103` — pullConcetiSupabase
- `3117` — migraConcetti

### ALIMENTI — categorie funzionali/semaforo, chip UI, equivalenze porzioni
Righe 3302-3575

- `3302` — getCategoriaSemaforo
- `3319` — _getCategorieGruppo
- `3333` — calcolaGrammaturaEquivalente
- `3350` — criterioByCat
- `3361` — suggerisciGrEquivalente
- `3406` — arrotondaPorzioneDiscreta
- `3420` — getCategoriaFunzionale
- `3460` — catArr
- `3476` — _tagComuniTrova
- `3480` — getTagComuniChip
- `3483` — setTagComuniChip
- `3491` — setCatChips
- `3504` — getStagioniChip
- `3507` — setStagioniChip
- `3514` — getProfiloChip
- `3517` — setProfiloChip
- `3526` — wireChipGroup
- `3537` — wireAttrChipGroups
- `3548` — wireRadioChipGroup

### CONFIG / STORAGE LOCALE — cfg, localStorage db, util data/valuta
Righe 3576-3736

- `3576` — getCfg
- `3577` — saveCfgL
- `3578` — getUrl
- `3579` — saveLocal
- `3580` — loadLocal
- `3581` — uid
- `3582` — today
- `3583` — addDays
- `3584` — fData
- `3585` — fEur
- `3587` — getLastSyncText
- `3597` — getSyncColor
- `3605` — aggiornaStatoSync
- `3631` — setSyncStatus
- `3668` — _registraTombstone
- `3676` — _tombstoneAttivi
- `3688` — _fondiTombstones
- `3702` — _mergeTombstonesRemoti
- `3715` — _applicaTombstones

### SYNC SUPABASE — push/pull ricette/pazienti, tombstones, conflitti (P69)
Righe 3737-4126

- `3737` — supaHeaders
- `3751` — pushRicetteSupabase
- `3776` — pullRicetteSupabase
- `3798` — delRicetteSupabase
- `3810` — delPazienteSupabase
- `3823` — pushToSheets
- `3866` — pullFromSheets
- `3941` — syncNow
- `3954` — sincronizzaTutto
- `4084` — testConnSupabase
- `4113` — _p68LogSaveAnonimo

### SYNC SUPABASE — save paziente, piani/cache piano, entrate, eventi
Righe 4127-4643

- `4127` — save
- `4145` — _pushRigaPerId
- `4178` — _flushDirtyIds
- `4261` — _p69LoadBaseline
- `4264` — _p69StoreBaseline
- `4267` — _p69SetBaseline
- `4271` — _p69DropBaseline
- `4275` — _p69SetBaselineFromRows
- `4281` — _p69NomePaz
- `4286` — _p69InList
- `4294` — _p69RilevaConflitti
- `4330` — _p69DialogoConflitti
- `4364` — _p69RisolviRicarica
- `4393` — _p69EsportaLocali
- `4406` — _p69RisolviSovrascrivi
- `4419` — pushPianoSupabase
- `4441` — pullPianiSupabase
- `4457` — delPianoSupabase
- `4473` — delPianiPazienteSupabase
- `4485` — pushCachePianoSupabase
- `4502` — caricaCachePianoSupabase
- `4524` — pushEntrateSupabase
- `4548` — pullEntrateSupabase
- `4562` — delEntrataSupabase
- `4570` — pushEntrataSupabase
- `4581` — pushEventoSupabase
- `4594` — pushEventiSupabase
- `4618` — pullEventiSupabase
- `4632` — delEventoSupabase
- `4643` — _pianoCacheKey

### UI GENERALE — config AI key, notifiche, navigazione (goTo/tab/modali)
Righe 4643-4792

- `4643` — _pianoCacheKey
- `4670` — _salvaPianoCache
- `4675` — _caricaPianoCache
- `4681` — salvaCfg
- `4682` — testConn
- `4688` — salvaAntKey
- `4696` — testaAntKey
- `4706` — initAntCard
- `4714` — esporta
- `4715` — importa
- `4720` — goTo
- `4736` — closeM
- `4744` — ngChiudiModale
- `4753` — ngChiudiPopupCoppia
- `4757` — ngAggiungiX
- `4768` — ngUpgradeModali
- `4788` — mTab
- `4789` — aggiornaEta
- `4790` — toggleOrarioNote
- `4791` — pdTab
- `4792` — notif

### PAZIENTI — registro: lista/card/kanban, apertura, editing, salvataggio, routine
Righe 4792-6037

- `4792` — notif
- `4800` — getPazView
- `4801` — setPazView
- `4810` — _pazStatoPiano
- `4818` — _pazUrgenzaControllo
- `4825` — _pazStatoTagHtml
- `4834` — _pazAggiornaFiltroRegimi
- `4842` — renderPaz
- `4893` — _renderPazCard
- `4918` — _renderPazLista
- `4945` — _renderPazKanban
- `4983` — openNuovoPaz
- `5009` — editPaz
- `5068` — applicaRegoloSemaforo
- `5579` — trovaChiaveAlimento
- `5588` — salvaPaz
- `5642` — openPaz
- `5724` — renderPdRoutine
- `5866` — updateRoutineCampo
- `5874` — suggerisciPastoEQuando
- `5901` — filtroLibreria
- `5910` — renderLibreriaGrid
- `5931` — aggiungiDaLibreriaIdx
- `5955` — openModalRoutine
- `5962` — salvaRoutineVoce
- `5987` — salvaRoutine
- `5994` — mostraRoutinePopup
- `6022` — removeRoutineVoce
- `6037` — _renderAggiustamentiSection

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 6037-6826

- `6037` — _renderAggiustamentiSection
- `6122` — salvaAggiustamento
- `6155` — eliminaAggiustamento
- `6164` — renderPdNote
- `6199` — salvaNotaClinica
- `6214` — deleteNota
- `6223` — saveNote
- `6738` — _applicaRegoloSemaforoLEGACY
- `6779` — resetSemaforoAuto
- `6826` — costruisciContestoPaziente

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 6826-7164

- `6826` — costruisciContestoPaziente
- `6964` — avviaFX
- `6992` — avviaAnalisi
- `7010` — _renderFlussoPanel
- `7054` — _riepEsc
- `7058` — _riepNum
- `7064` — _riepDelta
- `7072` — _riepDataSig
- `7090` — _riepParseFX
- `7104` — _riepAggiornaFX
- `7131` — _riepToggleDomandaDefault
- `7143` — _riepAddDomanda
- `7156` — _riepRemoveDomanda
- `7164` — renderPdRiepilogo

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 7164-7605

- `7164` — renderPdRiepilogo
- `7377` — renderPdRagionamento
- `7465` — inviaMessaggioRag
- `7484` — concludiERiassumi
- `7499` — salvaRagionamento
- `7520` — apriGeneratoreDaRag
- `7528` — nuovaSessioneRag
- `7534` — cancellaSavedRag
- `7544` — renderPazTimeline
- `7576` — renderPdAnamnesi
- `7605` — renderPdAlimenti

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 7605-8128

- `7605` — renderPdAlimenti
- `7649` — renderPdAnalisi
- `7693` — toggleAnalisiSection
- `7703` — loadAnalisiSanguePDF
- `7778` — mostraDiffAnalisi
- `7851` — _calcoloIncluso
- `7857` — toggleCalcoloIncluso
- `7879` — _renderCalcoliPannello
- `7915` — toggleGlossario
- `7920` — updateAnalisi
- `7973` — salvaAnalisi
- `7986` — applicaGruppoClinico
- `8015` — renderBoxGruppiCliniciSuggeriti
- `8047` — suggerisciGruppiClinici
- `8128` — renderMemoriaInbody

### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 8128-8382

- `8128` — renderMemoriaInbody
- `8176` — _ibFmtBreve
- `8185` — _renderPesiIntermediSection
- `8234` — aggiungiPesoIntermedio
- `8250` — eliminaPesoIntermedio
- `8260` — _ibSilhouetteSegmentale
- `8382` — renderPdInbody

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 8382-8654

- `8382` — renderPdInbody
- `8654` — renderPdMacros

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 8654-9526

- `8654` — renderPdMacros
- `8986` — aggiornaLabelMacros
- `9003` — calcolaMacros
- `9090` — applicaSchema
- `9097` — _renderRifPesoBox
- `9145` — _usaRifPeso
- `9149` — _aggiornaRifPesoTarget
- `9152` — _aggiornaRegimeSlider
- `9185` — _presetRegime
- `9189` — _initRegimeSliderDaPaziente
- `9205` — ricalcolaLAF
- `9241` — renderStoricoTDEE
- `9274` — attivaSlotTDEE
- `9282` — eliminaSlotTDEE
- `9295` — _toggleCiclizzazione
- `9301` — _aggiornaAnteprimaCiclizzazione
- `9319` — salvaCalcoloMacros
- `9420` — _metAllenamento
- `9432` — _neatFrazione
- `9438` — _larnLafStileVita
- `9455` — _regimeOffset
- `9465` — _componiRegimeText
- `9477` — calcolaTDEE
- `9526` — renderPianoPage

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 9526-9974

- `9526` — renderPianoPage
- `9544` — renderTargetBadge
- `9573` — verificaRegola_75_20_5
- `9610` — renderBadge75_20_5
- `9675` — _validaNorm
- `9678` — _validaMatchTermine
- `9686` — _validaCostruisciListe
- `9737` — _validaTesto
- `9758` — validaPiano
- `9832` — _validaFirmaBlocchi
- `9839` — renderBadgeValidatore
- `9870` — _validaVaiAlGiorno
- `9879` — apriPannelloValidatore
- `9936` — _validaEseguiOverride
- `9959` — validaGateExport
- `9974` — renderRiepilogoSettimana

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 9974-10665

- `9974` — renderRiepilogoSettimana
- `10107` — pianoPazSelezionato
- `10254` — renderPianoConPillTabs
- `10421` — renderPanelMacrosGiorno
- `10564` — pmgCambiaGrammi
- `10588` — riapriPiano
- `10626` — _montaPianoCorrente
- `10665` — pushTemplateSupabase

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 10665-11144

- `10665` — pushTemplateSupabase
- `10675` — pullTemplateSupabase
- `10686` — delTemplateSupabase
- `10695` — _promptTemplateNome
- `10720` — _creaTemplateDaJSON
- `10743` — salvaComeTemplate
- `10754` — salvaComeTemplateDaPiano
- `10763` — _normNomeAlim
- `10764` — _escRegAlim
- `10765` — _raccogliAlimentiDaPiano
- `10776` — _alimentiEsclusiPaziente
- `10788` — _trovaConflittiTemplate
- `10806` — _mostraAvvisoConflitti
- `10830` — applicaTemplate
- `10848` — apriPickerTemplate
- `10876` — _pickPaziente
- `10895` — applicaTemplatePick
- `10899` — rinominaTemplate
- `10910` — eliminaTemplate
- `10920` — renderLibreriaTemplate
- `10949` — renderStoricoPiani
- `11008` — eliminaPiano
- `11024` — _getActiveMacrosTarget
- `11048` — getTargetAttivi
- `11085` — calcolaTargetsCiclizzazione
- `11111` — _setupPianoTargets
- `11135` — getStagioneCorrente
- `11144` — costruisciPrompt

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 11144-11453

- `11144` — costruisciPrompt
- `11453` — toggleRegolePiano

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 11453-11928

- `11453` — toggleRegolePiano
- `11462` — aggiornaUIcolazione
- `11472` — salvaRegolePiano
- `11533` — _isModelloSistema
- `11536` — _isModelloSistemaModificato
- `11548` — caricaModelliCustomLocal
- `11562` — salvaModelliCustomLocal
- `11583` — _migraRecordCustom (P108: formato vecchio → record catalogo + alias legacy)
- `11597` — _syncAliasLegacy
- `11606` — caricaAlimentiCustom
- `11629` — pushAlimentiCustomSupabase
- `11643` — pullAlimentiCustomSupabase
- `11656` — pushModelliSupabase
- `11678` — pullModelliSupabase
- `11705` — _calcolaFreqDaModello
- `11724` — aggiornaUImodello
- `11813` — popolaDropdownModelli
- `11841` — cambiaModelloRotazione
- `11847` — ripristinaModelloOriginale
- `11870` — eliminaModelloCustom
- `11888` — mostraAnteprimaModello
- `11898` — apriEditorModello
- `11928` — _renderGrigliaModello

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
Righe 11928-12477

- `11928` — _renderGrigliaModello
- `12197` — _salvaModelloDaEditor
- `12239` — caricaRegolePiano
- `12266` — getAnthropicKey
- `12305` — _aiModelFor
- `12312` — _aiLogUsage
- `12334` — _aiProxyUrl
- `12338` — _aiProxyDisabled
- `12346` — _aiTokenPerProxy
- `12377` — aiCall
- `12477` — _normalizzaPianoNuovo

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 12477-12690

- `12477` — _normalizzaPianoNuovo
- `12550` — espandiPiano
- `12610` — getFruttaStile
- `12617` — _fruttaGetPasto
- `12627` — _fruttaContaRigheRicetta
- `12631` — _fruttaIndiceBasePasto
- `12651` — getFruttaMarker
- `12664` — fruttaMarkerHtml
- `12672` — _fruttaCheckboxHtml
- `12681` — toggleFrutta
- `12690` — _appendToggleFruttaStile

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 12690-13940

- `12690` — _appendToggleFruttaStile
- `12726` — _renderCelleGriglia
- `12803` — _renderRicetteTestuali
- `12842` — scambiaRicette
- `12913` — _renderCelleHtml
- `12921` — toggleCellaMenu
- `12940` — closeAllCellaMenus
- `12948` — _trovaPasto
- `12956` — cellaSposta
- `13010` — cellaCancella
- `13031` — apriEditGrammatura
- `13086` — cellaSwap
- `13103` — cellaRimuoviAlt
- `13117` — cellaAggiungiAlt
- `13212` — _mostraPopupAggiungiAlt
- `13298` — apriEditRicetta
- `13307` — aggiungiRicetta
- `13323` — rimuoviRicetta
- `13332` — _mostraPopupEditRicetta
- `13493` — ngAggiungiSpuntinoVuoto
- `13509` — apriAggiungiCella
- `13600` — _apriPopupRicettaComposta
- `13692` — _mostraPopupSceltaCategoriaAlimento
- `13833` — _aggiornaPianoBox
- `13940` — parseJSONSicuro

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 13940-14369

- `13940` — parseJSONSicuro
- `13988` — _attesoStrutturaPiano
- `14008` — _confrontaStrutturaPiano
- `14038` — _costruisciPromptDelta
- `14065` — _pianoToolSchema
- `14137` — _pianoMaxTokens
- `14146` — _estraiPianoDaRisposta
- `14168` — chiamaGeneraPiano
- `14338` — mostraLoadingSteps
- `14369` — apriAIWhatsApp

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 14369-14638

- `14369` — apriAIWhatsApp
- `14436` — generaMessaggioAI
- `14525` — copiaMessaggioAI
- `14535` — salvaInStorico
- `14547` — salvaVarianteAI
- `14562` — renderVariantiSalvate
- `14581` — usaVariante
- `14599` — eliminaVariante
- `14610` — renderStoricoMsg
- `14626` — apriWhatsApp
- `14638` — generaPiano

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 14638-15825

- `14638` — generaPiano
- `14816` — _ngColoreSemaforoNome
- `14824` — apriSceltaModalitaPiano
- `14859` — _ngChiudiModalita
- `14862` — _ngCostruisciGiornoVuoto
- `14870` — _ngGiornoHaContenuto
- `14882` — _ngCreaPianoManuale
- `14901` — _ngScrollTabGiorni
- `14911` — _ngAbilitaDragScroll
- `14939` — _ngCambiaNumeroGiorni
- `14961` — _ngRenderEditorManuale
- `14975` — _ngRenderAlbero
- `15016` — _ngToggleCat
- `15025` — _ngFiltraAlbero
- `15049` — _ngRenderPianoDestra
- `15164` — _ngSalvaPianoManuale
- `15190` — _ngParseIngrediente
- `15214` — _ngScomponiIngredienti
- `15226` — _ricCalcolaMacroDaIngredienti
- `15244` — _ricRicalcolaMacroLive
- `15251` — _ricAggiornaInfoMacro
- `15265` — _ricRicalcolaMacroLiveNow
- `15289` — _ngTrovaCategoriaAlimento
- `15322` — _ngPescaRicetta
- `15364` — _ngScomponiRicettaNelPasto
- `15401` — _ngDragStart
- `15412` — _ngDragStartCella
- `15423` — _ngDragOver
- `15430` — _ngDragLeave
- `15435` — _ngDrop
- `15454` — _ngAggiungiAlimento
- `15479` — _ngRimuoviAlimento
- `15493` — _ngDopoModifica
- `15556` — gramTestoCasalingo
- `15582` — _appendToggleNutrizionali
- `15625` — _appendTogglePromemoria
- `15654` — _appendBtnConcetti
- `15800` — cpFromEmoji
- `15806` — getEmojiCp
- `15825` — generaPDF

### EXPORT — generazione PDF piano (generaPDF)
Righe 15825-16827

- `15825` — generaPDF
- `16827` — openInbody

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 16827-17004

- `16827` — openInbody
- `16837` — salvaInbody
- `16861` — delInbody
- `16868` — ascoltaProgresso
- `17004` — buildSemBadges

### ALIMENTI CUSTOM — editor, badge semaforo per condizione
Righe 17004-17471

- `17004` — buildSemBadges
- `17032` — buildSemLegenda
- `17046` — renderAlEditor
- `17304` — salvaAlimentoCustom
- `17368` — eliminaAlimentoCustom
- `17392` — togAl
- `17445` — selCatAl
- `17459` — selTuttiAl
- `17471` — getEventi

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 17471-17801

- `17471` — getEventi
- `17485` — setCalView
- `17486` — calPrev
- `17487` — calNext
- `17488` — calToday
- `17490` — renderCal
- `17504` — renderCalMonth
- `17528` — renderCalWeek
- `17546` — renderCalDay
- `17562` — selGiorno
- `17576` — setDisp
- `17581` — openAddEvento
- `17594` — openAddEventoPaz
- `17600` — toggleEntrataCheck
- `17605` — salvaEvento
- `17628` — openEvDetail
- `17683` — delEvento
- `17691` — copyMsg
- `17698` — aggDateCal
- `17703` — syncInizio
- `17704` — syncControllo
- `17705` — aggiornaPrev
- `17722` — renderRic
- `17749` — openNuovaRic
- `17750` — editRic
- `17760` — salvaRic
- `17785` — delRic
- `17801` — renderEntrate

### RICETTARIO — CRUD ricette
Righe 17801-17946

- `17801` — renderEntrate
- `17886` — aggiungiEntrataPerPaziente
- `17903` — openNuovaEntrata
- `17917` — salvaEntrata
- `17938` — delEntrata
- `17946` — startVoiceRicetta

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 17946-18330

- `17946` — startVoiceRicetta
- `17976` — aiSuggerisciRicetta
- `18021` — renderConcettiModal
- `18040` — apriConcettiModal
- `18067` — salvaConcettiAllegati
- `18085` — loadInbodyPDF
- `18167` — _vitdLabel
- `18171` — getIntegratori
- `18175` — getIntegraWant
- `18179` — setIntegratori
- `18196` — setIntegraWant
- `18207` — getPatologieChip
- `18208` — getAllergieChip
- `18209` — setPatologieChip
- `18210` — setAllergieChip
- `18211` — getPatologie
- `18212` — getAllergie
- `18213` — setPatologieFromStr
- `18220` — setAllergieFromStr
- `18233` — getSdvChip
- `18234` — getCspChip
- `18235` — setSdvChip
- `18236` — setCspChip
- `18237` — setSdvFromStr
- `18238` — setCspFromStr
- `18242` — getBudget
- `18243` — setBudget
- `18248` — renderCalAnno
- `18279` — comprimeImmagine
- `18301` — uploadImmagineConcetto
- `18320` — rimuoviImmagineConcetto
- `18330` — renderConcettiPage

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 18330-18500

- `18330` — renderConcettiPage
- `18396` — entraSelConcetti
- `18397` — annullaSelConcetti
- `18398` — toggleConcettoSel
- `18403` — eliminaConcettiSelezionati
- `18422` — confermaEliminaConcetti
- `18437` — aiRiscriviConcetto
- `18451` — editConcetto
- `18469` — salvaConcetto
- `18480` — openNuovoConcetto
- `18500` — getAgendaPersonale

### DASHBOARD — agenda personale, todo, promemoria
Righe 18500-18664

- `18500` — getAgendaPersonale
- `18501` — saveAgendaPersonale
- `18502` — getAgendaTodo
- `18503` — saveAgendaTodo
- `18505` — pulisciAgendaVecchia
- `18509` — navigaAgenda
- `18518` — toggleFormAgenda
- `18519` — toggleFormTodo
- `18521` — salvaAgendaItem
- `18535` — salvaTodoItem
- `18547` — toggleAgendaFatto
- `18555` — toggleTodoFatto
- `18568` — _catCol
- `18570` — renderAgendaDx
- `18664` — renderDashboard

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 18664-18994

- `18664` — renderDashboard
- `18790` — renderScadenzeAlert
- `18975` — segnaGestito
- `18994` — archiviaPaz

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 18994-19074

- `18994` — archiviaPaz
- `19003` — ripristinaPaz
- `19009` — eliminaPaz
- `19052` — getDove
- `19056` — setDove
- `19074` — salvaCredenzialiPersistenti

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 19074-19518

- `19074` — salvaCredenzialiPersistenti
- `19079` — getCredenzialiPersistenti
- `19092` — cancellaCredenzialiPersistenti
- `19097` — rinnovaSessioneConRefreshToken
- `19114` — getSessioneSalvata (P105: su token scaduto ritorna null ma NON cancella più localStorage)
- `19133` — salvaSessione
- `19143` — cancellaSessione
- `19147` — eseguiLogin
- `19194` — eseguiLogout
- `19216` — mostraApp
- `19221` — verificaSessioneEAvvia
- `19249` — assicuraTokenValido
- `19278` — _garantiscoSessionePerSync (nuova, P105 — guard anti-scrittura anonima, usato da syncNow/sincronizzaTutto/_flushDirtyIds)
- `19290` — avviaRinnovoTokenPeriodico
- `19294` — fermaRinnovoTokenPeriodico
- `19303` — _authReset
- `19308` — _authMostra
- `19311` — mostraLogin
- `19312` — mostraRegistrazione
- `19313` — mostraRecupero
- `19314` — mostraNuovaPassword
- `19317` — eseguiRegistrazione
- `19355` — eseguiRecuperoPassword
- `19384` — eseguiNuovaPassword
- `19418` — _parseHashParams
- `19425` — _pulisciHash
- `19429` — gestisciRitornoAuth
- `19518` — renderPianoBox

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 19518-19713

- `19518` — renderPianoBox
- `19590` — apriPannelloRicette
- `19619` — chiudiPannelloRicette
- `19627` — applicaRicettaPasto
- `19663` — inizializzaP2
- `19675` — deepClone
- `19679` — applicaPatch
- `19713` — _aggiornaLabelSalvaPiano
