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
Righe 2171-2227

- `2171` — _slugAlimento
- `2176` — CATALOGO_ALIMENTI (Map id→record; _CATALOGO_BY_NOME nome→record)
- `2179` — _catalogoIndicizza
- `2183` — _catalogoDeindicizza
- `2190` — costruisciCatalogo (chiamata al boot, avvolge ALIMENTI+CREA_ALIMENTI)
- `2213` — risolviAlimento (risoluzione UNICA: id → nome esatto → case-insensitive → canonico)

### MACROS PIANO — calcolo e badge macro reali vs target
Righe 2228-2548

- `2228` — getValoriCREA
- `2240` — getCurrentPaziente
- `2260` — getKcalWeekend
- `2303` — getMacrosRicettaComposta
- `2309` — calcolaMacrosPiano
- `2403` — renderBadgeMacrosReali
- `2461` — renderBadgeMacrosReali_DOM

### ANALISI DEL SANGUE — parsing, indici clinici derivati, interpretazione
Righe 2549-3017

- `2549` — ANALISI_KEY
- `2709` — _parseAnalisiNum
- `2717` — calcolaIndice
- `2855` — interpretaAnalisi
- `2867` — _interpAnalisiHtml
- `2881` — mostraInfoRange

### CONCETTI EDUCATIVI — sync Supabase, migrazione
Righe 3018-3230

- `3018` — pushConcetiSupabase
- `3032` — pullConcetiSupabase
- `3046` — migraConcetti

### ALIMENTI — categorie funzionali/semaforo, chip UI, equivalenze porzioni
Righe 3231-3504

- `3231` — getCategoriaSemaforo
- `3248` — _getCategorieGruppo
- `3262` — calcolaGrammaturaEquivalente
- `3279` — criterioByCat
- `3290` — suggerisciGrEquivalente
- `3335` — arrotondaPorzioneDiscreta
- `3349` — getCategoriaFunzionale
- `3389` — catArr
- `3405` — _tagComuniTrova
- `3409` — getTagComuniChip
- `3412` — setTagComuniChip
- `3420` — setCatChips
- `3433` — getStagioniChip
- `3436` — setStagioniChip
- `3443` — getProfiloChip
- `3446` — setProfiloChip
- `3455` — wireChipGroup
- `3466` — wireAttrChipGroups
- `3477` — wireRadioChipGroup

### CONFIG / STORAGE LOCALE — cfg, localStorage db, util data/valuta
Righe 3505-3665

- `3505` — getCfg
- `3506` — saveCfgL
- `3507` — getUrl
- `3508` — saveLocal
- `3509` — loadLocal
- `3510` — uid
- `3511` — today
- `3512` — addDays
- `3513` — fData
- `3514` — fEur
- `3516` — getLastSyncText
- `3526` — getSyncColor
- `3534` — aggiornaStatoSync
- `3560` — setSyncStatus
- `3597` — _registraTombstone
- `3605` — _tombstoneAttivi
- `3617` — _fondiTombstones
- `3631` — _mergeTombstonesRemoti
- `3644` — _applicaTombstones

### SYNC SUPABASE — push/pull ricette/pazienti, tombstones, conflitti (P69)
Righe 3666-4055

- `3666` — supaHeaders
- `3680` — pushRicetteSupabase
- `3705` — pullRicetteSupabase
- `3727` — delRicetteSupabase
- `3739` — delPazienteSupabase
- `3752` — pushToSheets
- `3795` — pullFromSheets
- `3870` — syncNow
- `3883` — sincronizzaTutto
- `4013` — testConnSupabase
- `4042` — _p68LogSaveAnonimo

### SYNC SUPABASE — save paziente, piani/cache piano, entrate, eventi
Righe 4056-4572

- `4056` — save
- `4074` — _pushRigaPerId
- `4107` — _flushDirtyIds
- `4190` — _p69LoadBaseline
- `4193` — _p69StoreBaseline
- `4196` — _p69SetBaseline
- `4200` — _p69DropBaseline
- `4204` — _p69SetBaselineFromRows
- `4210` — _p69NomePaz
- `4215` — _p69InList
- `4223` — _p69RilevaConflitti
- `4259` — _p69DialogoConflitti
- `4293` — _p69RisolviRicarica
- `4322` — _p69EsportaLocali
- `4335` — _p69RisolviSovrascrivi
- `4348` — pushPianoSupabase
- `4370` — pullPianiSupabase
- `4386` — delPianoSupabase
- `4402` — delPianiPazienteSupabase
- `4414` — pushCachePianoSupabase
- `4431` — caricaCachePianoSupabase
- `4453` — pushEntrateSupabase
- `4477` — pullEntrateSupabase
- `4491` — delEntrataSupabase
- `4499` — pushEntrataSupabase
- `4510` — pushEventoSupabase
- `4523` — pushEventiSupabase
- `4547` — pullEventiSupabase
- `4561` — delEventoSupabase
- `4572` — _pianoCacheKey

### UI GENERALE — config AI key, notifiche, navigazione (goTo/tab/modali)
Righe 4572-4721

- `4572` — _pianoCacheKey
- `4599` — _salvaPianoCache
- `4604` — _caricaPianoCache
- `4610` — salvaCfg
- `4611` — testConn
- `4617` — salvaAntKey
- `4625` — testaAntKey
- `4635` — initAntCard
- `4643` — esporta
- `4644` — importa
- `4649` — goTo
- `4665` — closeM
- `4673` — ngChiudiModale
- `4682` — ngChiudiPopupCoppia
- `4686` — ngAggiungiX
- `4697` — ngUpgradeModali
- `4717` — mTab
- `4718` — aggiornaEta
- `4719` — toggleOrarioNote
- `4720` — pdTab
- `4721` — notif

### PAZIENTI — registro: lista/card/kanban, apertura, editing, salvataggio, routine
Righe 4721-5966

- `4721` — notif
- `4729` — getPazView
- `4730` — setPazView
- `4739` — _pazStatoPiano
- `4747` — _pazUrgenzaControllo
- `4754` — _pazStatoTagHtml
- `4763` — _pazAggiornaFiltroRegimi
- `4771` — renderPaz
- `4822` — _renderPazCard
- `4847` — _renderPazLista
- `4874` — _renderPazKanban
- `4912` — openNuovoPaz
- `4938` — editPaz
- `4997` — applicaRegoloSemaforo
- `5508` — trovaChiaveAlimento
- `5517` — salvaPaz
- `5571` — openPaz
- `5653` — renderPdRoutine
- `5795` — updateRoutineCampo
- `5803` — suggerisciPastoEQuando
- `5830` — filtroLibreria
- `5839` — renderLibreriaGrid
- `5860` — aggiungiDaLibreriaIdx
- `5884` — openModalRoutine
- `5891` — salvaRoutineVoce
- `5916` — salvaRoutine
- `5923` — mostraRoutinePopup
- `5951` — removeRoutineVoce
- `5966` — _renderAggiustamentiSection

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 5966-6755

- `5966` — _renderAggiustamentiSection
- `6051` — salvaAggiustamento
- `6084` — eliminaAggiustamento
- `6093` — renderPdNote
- `6128` — salvaNotaClinica
- `6143` — deleteNota
- `6152` — saveNote
- `6667` — _applicaRegoloSemaforoLEGACY
- `6708` — resetSemaforoAuto
- `6755` — costruisciContestoPaziente

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 6755-7093

- `6755` — costruisciContestoPaziente
- `6893` — avviaFX
- `6921` — avviaAnalisi
- `6939` — _renderFlussoPanel
- `6983` — _riepEsc
- `6987` — _riepNum
- `6993` — _riepDelta
- `7001` — _riepDataSig
- `7019` — _riepParseFX
- `7033` — _riepAggiornaFX
- `7060` — _riepToggleDomandaDefault
- `7072` — _riepAddDomanda
- `7085` — _riepRemoveDomanda
- `7093` — renderPdRiepilogo

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 7093-7534

- `7093` — renderPdRiepilogo
- `7306` — renderPdRagionamento
- `7394` — inviaMessaggioRag
- `7413` — concludiERiassumi
- `7428` — salvaRagionamento
- `7449` — apriGeneratoreDaRag
- `7457` — nuovaSessioneRag
- `7463` — cancellaSavedRag
- `7473` — renderPazTimeline
- `7505` — renderPdAnamnesi
- `7534` — renderPdAlimenti

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 7534-8057

- `7534` — renderPdAlimenti
- `7578` — renderPdAnalisi
- `7622` — toggleAnalisiSection
- `7632` — loadAnalisiSanguePDF
- `7707` — mostraDiffAnalisi
- `7780` — _calcoloIncluso
- `7786` — toggleCalcoloIncluso
- `7808` — _renderCalcoliPannello
- `7844` — toggleGlossario
- `7849` — updateAnalisi
- `7902` — salvaAnalisi
- `7915` — applicaGruppoClinico
- `7944` — renderBoxGruppiCliniciSuggeriti
- `7976` — suggerisciGruppiClinici
- `8057` — renderMemoriaInbody

### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 8057-8311

- `8057` — renderMemoriaInbody
- `8105` — _ibFmtBreve
- `8114` — _renderPesiIntermediSection
- `8163` — aggiungiPesoIntermedio
- `8179` — eliminaPesoIntermedio
- `8189` — _ibSilhouetteSegmentale
- `8311` — renderPdInbody

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 8311-8583

- `8311` — renderPdInbody
- `8583` — renderPdMacros

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 8583-9455

- `8583` — renderPdMacros
- `8915` — aggiornaLabelMacros
- `8932` — calcolaMacros
- `9019` — applicaSchema
- `9026` — _renderRifPesoBox
- `9074` — _usaRifPeso
- `9078` — _aggiornaRifPesoTarget
- `9081` — _aggiornaRegimeSlider
- `9114` — _presetRegime
- `9118` — _initRegimeSliderDaPaziente
- `9134` — ricalcolaLAF
- `9170` — renderStoricoTDEE
- `9203` — attivaSlotTDEE
- `9211` — eliminaSlotTDEE
- `9224` — _toggleCiclizzazione
- `9230` — _aggiornaAnteprimaCiclizzazione
- `9248` — salvaCalcoloMacros
- `9349` — _metAllenamento
- `9361` — _neatFrazione
- `9367` — _larnLafStileVita
- `9384` — _regimeOffset
- `9394` — _componiRegimeText
- `9406` — calcolaTDEE
- `9455` — renderPianoPage

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 9455-9903

- `9455` — renderPianoPage
- `9473` — renderTargetBadge
- `9502` — verificaRegola_75_20_5
- `9539` — renderBadge75_20_5
- `9604` — _validaNorm
- `9607` — _validaMatchTermine
- `9615` — _validaCostruisciListe
- `9666` — _validaTesto
- `9687` — validaPiano
- `9761` — _validaFirmaBlocchi
- `9768` — renderBadgeValidatore
- `9799` — _validaVaiAlGiorno
- `9808` — apriPannelloValidatore
- `9865` — _validaEseguiOverride
- `9888` — validaGateExport
- `9903` — renderRiepilogoSettimana

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 9903-10594

- `9903` — renderRiepilogoSettimana
- `10036` — pianoPazSelezionato
- `10183` — renderPianoConPillTabs
- `10350` — renderPanelMacrosGiorno
- `10493` — pmgCambiaGrammi
- `10517` — riapriPiano
- `10555` — _montaPianoCorrente
- `10594` — pushTemplateSupabase

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 10594-11073

- `10594` — pushTemplateSupabase
- `10604` — pullTemplateSupabase
- `10615` — delTemplateSupabase
- `10624` — _promptTemplateNome
- `10649` — _creaTemplateDaJSON
- `10672` — salvaComeTemplate
- `10683` — salvaComeTemplateDaPiano
- `10692` — _normNomeAlim
- `10693` — _escRegAlim
- `10694` — _raccogliAlimentiDaPiano
- `10705` — _alimentiEsclusiPaziente
- `10717` — _trovaConflittiTemplate
- `10735` — _mostraAvvisoConflitti
- `10759` — applicaTemplate
- `10777` — apriPickerTemplate
- `10805` — _pickPaziente
- `10824` — applicaTemplatePick
- `10828` — rinominaTemplate
- `10839` — eliminaTemplate
- `10849` — renderLibreriaTemplate
- `10878` — renderStoricoPiani
- `10937` — eliminaPiano
- `10953` — _getActiveMacrosTarget
- `10977` — getTargetAttivi
- `11014` — calcolaTargetsCiclizzazione
- `11040` — _setupPianoTargets
- `11064` — getStagioneCorrente
- `11073` — costruisciPrompt

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 11073-11382

- `11073` — costruisciPrompt
- `11382` — toggleRegolePiano

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 11382-11857

- `11382` — toggleRegolePiano
- `11391` — aggiornaUIcolazione
- `11401` — salvaRegolePiano
- `11462` — _isModelloSistema
- `11465` — _isModelloSistemaModificato
- `11477` — caricaModelliCustomLocal
- `11491` — salvaModelliCustomLocal
- `11512` — _migraRecordCustom (P108: formato vecchio → record catalogo + alias legacy)
- `11526` — _syncAliasLegacy
- `11535` — caricaAlimentiCustom
- `11558` — pushAlimentiCustomSupabase
- `11572` — pullAlimentiCustomSupabase
- `11585` — pushModelliSupabase
- `11607` — pullModelliSupabase
- `11634` — _calcolaFreqDaModello
- `11653` — aggiornaUImodello
- `11742` — popolaDropdownModelli
- `11770` — cambiaModelloRotazione
- `11776` — ripristinaModelloOriginale
- `11799` — eliminaModelloCustom
- `11817` — mostraAnteprimaModello
- `11827` — apriEditorModello
- `11857` — _renderGrigliaModello

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
Righe 11857-12406

- `11857` — _renderGrigliaModello
- `12126` — _salvaModelloDaEditor
- `12168` — caricaRegolePiano
- `12195` — getAnthropicKey
- `12234` — _aiModelFor
- `12241` — _aiLogUsage
- `12263` — _aiProxyUrl
- `12267` — _aiProxyDisabled
- `12275` — _aiTokenPerProxy
- `12306` — aiCall
- `12406` — _normalizzaPianoNuovo

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 12406-12619

- `12406` — _normalizzaPianoNuovo
- `12479` — espandiPiano
- `12539` — getFruttaStile
- `12546` — _fruttaGetPasto
- `12556` — _fruttaContaRigheRicetta
- `12560` — _fruttaIndiceBasePasto
- `12580` — getFruttaMarker
- `12593` — fruttaMarkerHtml
- `12601` — _fruttaCheckboxHtml
- `12610` — toggleFrutta
- `12619` — _appendToggleFruttaStile

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 12619-13869

- `12619` — _appendToggleFruttaStile
- `12655` — _renderCelleGriglia
- `12732` — _renderRicetteTestuali
- `12771` — scambiaRicette
- `12842` — _renderCelleHtml
- `12850` — toggleCellaMenu
- `12869` — closeAllCellaMenus
- `12877` — _trovaPasto
- `12885` — cellaSposta
- `12939` — cellaCancella
- `12960` — apriEditGrammatura
- `13015` — cellaSwap
- `13032` — cellaRimuoviAlt
- `13046` — cellaAggiungiAlt
- `13141` — _mostraPopupAggiungiAlt
- `13227` — apriEditRicetta
- `13236` — aggiungiRicetta
- `13252` — rimuoviRicetta
- `13261` — _mostraPopupEditRicetta
- `13422` — ngAggiungiSpuntinoVuoto
- `13438` — apriAggiungiCella
- `13529` — _apriPopupRicettaComposta
- `13621` — _mostraPopupSceltaCategoriaAlimento
- `13762` — _aggiornaPianoBox
- `13869` — parseJSONSicuro

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 13869-14298

- `13869` — parseJSONSicuro
- `13917` — _attesoStrutturaPiano
- `13937` — _confrontaStrutturaPiano
- `13967` — _costruisciPromptDelta
- `13994` — _pianoToolSchema
- `14066` — _pianoMaxTokens
- `14075` — _estraiPianoDaRisposta
- `14097` — chiamaGeneraPiano
- `14267` — mostraLoadingSteps
- `14298` — apriAIWhatsApp

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 14298-14567

- `14298` — apriAIWhatsApp
- `14365` — generaMessaggioAI
- `14454` — copiaMessaggioAI
- `14464` — salvaInStorico
- `14476` — salvaVarianteAI
- `14491` — renderVariantiSalvate
- `14510` — usaVariante
- `14528` — eliminaVariante
- `14539` — renderStoricoMsg
- `14555` — apriWhatsApp
- `14567` — generaPiano

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 14567-15754

- `14567` — generaPiano
- `14745` — _ngColoreSemaforoNome
- `14753` — apriSceltaModalitaPiano
- `14788` — _ngChiudiModalita
- `14791` — _ngCostruisciGiornoVuoto
- `14799` — _ngGiornoHaContenuto
- `14811` — _ngCreaPianoManuale
- `14830` — _ngScrollTabGiorni
- `14840` — _ngAbilitaDragScroll
- `14868` — _ngCambiaNumeroGiorni
- `14890` — _ngRenderEditorManuale
- `14904` — _ngRenderAlbero
- `14945` — _ngToggleCat
- `14954` — _ngFiltraAlbero
- `14978` — _ngRenderPianoDestra
- `15093` — _ngSalvaPianoManuale
- `15119` — _ngParseIngrediente
- `15143` — _ngScomponiIngredienti
- `15155` — _ricCalcolaMacroDaIngredienti
- `15173` — _ricRicalcolaMacroLive
- `15180` — _ricAggiornaInfoMacro
- `15194` — _ricRicalcolaMacroLiveNow
- `15218` — _ngTrovaCategoriaAlimento
- `15251` — _ngPescaRicetta
- `15293` — _ngScomponiRicettaNelPasto
- `15330` — _ngDragStart
- `15341` — _ngDragStartCella
- `15352` — _ngDragOver
- `15359` — _ngDragLeave
- `15364` — _ngDrop
- `15383` — _ngAggiungiAlimento
- `15408` — _ngRimuoviAlimento
- `15422` — _ngDopoModifica
- `15485` — gramTestoCasalingo
- `15511` — _appendToggleNutrizionali
- `15554` — _appendTogglePromemoria
- `15583` — _appendBtnConcetti
- `15729` — cpFromEmoji
- `15735` — getEmojiCp
- `15754` — generaPDF

### EXPORT — generazione PDF piano (generaPDF)
Righe 15754-16756

- `15754` — generaPDF
- `16756` — openInbody

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 16756-16933

- `16756` — openInbody
- `16766` — salvaInbody
- `16790` — delInbody
- `16797` — ascoltaProgresso
- `16933` — buildSemBadges

### ALIMENTI CUSTOM — editor, badge semaforo per condizione
Righe 16933-17400

- `16933` — buildSemBadges
- `16961` — buildSemLegenda
- `16975` — renderAlEditor
- `17233` — salvaAlimentoCustom
- `17297` — eliminaAlimentoCustom
- `17321` — togAl
- `17374` — selCatAl
- `17388` — selTuttiAl
- `17400` — getEventi

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 17400-17730

- `17400` — getEventi
- `17414` — setCalView
- `17415` — calPrev
- `17416` — calNext
- `17417` — calToday
- `17419` — renderCal
- `17433` — renderCalMonth
- `17457` — renderCalWeek
- `17475` — renderCalDay
- `17491` — selGiorno
- `17505` — setDisp
- `17510` — openAddEvento
- `17523` — openAddEventoPaz
- `17529` — toggleEntrataCheck
- `17534` — salvaEvento
- `17557` — openEvDetail
- `17612` — delEvento
- `17620` — copyMsg
- `17627` — aggDateCal
- `17632` — syncInizio
- `17633` — syncControllo
- `17634` — aggiornaPrev
- `17651` — renderRic
- `17678` — openNuovaRic
- `17679` — editRic
- `17689` — salvaRic
- `17714` — delRic
- `17730` — renderEntrate

### RICETTARIO — CRUD ricette
Righe 17730-17875

- `17730` — renderEntrate
- `17815` — aggiungiEntrataPerPaziente
- `17832` — openNuovaEntrata
- `17846` — salvaEntrata
- `17867` — delEntrata
- `17875` — startVoiceRicetta

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 17875-18259

- `17875` — startVoiceRicetta
- `17905` — aiSuggerisciRicetta
- `17950` — renderConcettiModal
- `17969` — apriConcettiModal
- `17996` — salvaConcettiAllegati
- `18014` — loadInbodyPDF
- `18096` — _vitdLabel
- `18100` — getIntegratori
- `18104` — getIntegraWant
- `18108` — setIntegratori
- `18125` — setIntegraWant
- `18136` — getPatologieChip
- `18137` — getAllergieChip
- `18138` — setPatologieChip
- `18139` — setAllergieChip
- `18140` — getPatologie
- `18141` — getAllergie
- `18142` — setPatologieFromStr
- `18149` — setAllergieFromStr
- `18162` — getSdvChip
- `18163` — getCspChip
- `18164` — setSdvChip
- `18165` — setCspChip
- `18166` — setSdvFromStr
- `18167` — setCspFromStr
- `18171` — getBudget
- `18172` — setBudget
- `18177` — renderCalAnno
- `18208` — comprimeImmagine
- `18230` — uploadImmagineConcetto
- `18249` — rimuoviImmagineConcetto
- `18259` — renderConcettiPage

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 18259-18429

- `18259` — renderConcettiPage
- `18325` — entraSelConcetti
- `18326` — annullaSelConcetti
- `18327` — toggleConcettoSel
- `18332` — eliminaConcettiSelezionati
- `18351` — confermaEliminaConcetti
- `18366` — aiRiscriviConcetto
- `18380` — editConcetto
- `18398` — salvaConcetto
- `18409` — openNuovoConcetto
- `18429` — getAgendaPersonale

### DASHBOARD — agenda personale, todo, promemoria
Righe 18429-18593

- `18429` — getAgendaPersonale
- `18430` — saveAgendaPersonale
- `18431` — getAgendaTodo
- `18432` — saveAgendaTodo
- `18434` — pulisciAgendaVecchia
- `18438` — navigaAgenda
- `18447` — toggleFormAgenda
- `18448` — toggleFormTodo
- `18450` — salvaAgendaItem
- `18464` — salvaTodoItem
- `18476` — toggleAgendaFatto
- `18484` — toggleTodoFatto
- `18497` — _catCol
- `18499` — renderAgendaDx
- `18593` — renderDashboard

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 18593-18923

- `18593` — renderDashboard
- `18719` — renderScadenzeAlert
- `18904` — segnaGestito
- `18923` — archiviaPaz

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 18923-19003

- `18923` — archiviaPaz
- `18932` — ripristinaPaz
- `18938` — eliminaPaz
- `18981` — getDove
- `18985` — setDove
- `19003` — salvaCredenzialiPersistenti

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 19003-19447

- `19003` — salvaCredenzialiPersistenti
- `19008` — getCredenzialiPersistenti
- `19021` — cancellaCredenzialiPersistenti
- `19026` — rinnovaSessioneConRefreshToken
- `19043` — getSessioneSalvata (P105: su token scaduto ritorna null ma NON cancella più localStorage)
- `19062` — salvaSessione
- `19072` — cancellaSessione
- `19076` — eseguiLogin
- `19123` — eseguiLogout
- `19145` — mostraApp
- `19150` — verificaSessioneEAvvia
- `19178` — assicuraTokenValido
- `19207` — _garantiscoSessionePerSync (nuova, P105 — guard anti-scrittura anonima, usato da syncNow/sincronizzaTutto/_flushDirtyIds)
- `19219` — avviaRinnovoTokenPeriodico
- `19223` — fermaRinnovoTokenPeriodico
- `19232` — _authReset
- `19237` — _authMostra
- `19240` — mostraLogin
- `19241` — mostraRegistrazione
- `19242` — mostraRecupero
- `19243` — mostraNuovaPassword
- `19246` — eseguiRegistrazione
- `19284` — eseguiRecuperoPassword
- `19313` — eseguiNuovaPassword
- `19347` — _parseHashParams
- `19354` — _pulisciHash
- `19358` — gestisciRitornoAuth
- `19447` — renderPianoBox

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 19447-19642

- `19447` — renderPianoBox
- `19519` — apriPannelloRicette
- `19548` — chiudiPannelloRicette
- `19556` — applicaRicettaPasto
- `19592` — inizializzaP2
- `19604` — deepClone
- `19608` — applicaPatch
- `19642` — _aggiornaLabelSalvaPiano
