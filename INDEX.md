# NutriGest — INDEX.md

Mappa funzioni → righe di `index.html`, organizzata per area funzionale.
Generato via grep sul file scaricato da GitHub (raw main), rigenerato automaticamente (script Python su tutte le `function` top-level) il 2026-07-13 sera dopo P110. Righe totali file: 20214 (era 19439 il 12 lug; +427 per P108 fase 0/P109 del 13 lug mattina, +142 per P108 fase 1 del 13 lug sera, +206 per P110 scanner barcode del 13 lug sera tardi).

⚠️ **Aggiornamento parziale 14 lug 2026 sera** (P95 + fix P94, commit ba5199f→7aa3eb6→3f69f08): righe totali ora 20686 (+472 dal 13 lug). Ho corretto solo la sezione COMPOSITORE MANUALE (nuove funzioni `_ng*NomeGiorno`/`_ngEtichettaGiorno*`) con i numeri di riga verificati oggi. Il resto dell'indice sotto questa nota NON è stato ri-shiftato riga per riga — i range restano indicativi, verificare con grep prima di aprire un view_range se la sessione precedente non torna esatta. Rigenerazione completa consigliata alla prossima modifica strutturale ampia.

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
Righe 2264-2306

- `2264` — _slugAlimento
- `2269` — CATALOGO_ALIMENTI (Map id→record; _CATALOGO_BY_NOME nome→record)
- `2272` — _catalogoIndicizza
- `2276` — _catalogoDeindicizza
- `2283` — costruisciCatalogo (chiamata al boot, avvolge ALIMENTI+CREA_ALIMENTI)
- `2306` — risolviAlimento (risoluzione UNICA: id → nome esatto → case-insensitive → canonico)

### MACROS PIANO — calcolo e badge macro reali vs target
Righe 2321-2554

- `2321` — getValoriCREA
- `2333` — getCurrentPaziente
- `2353` — getKcalWeekend
- `2396` — getMacrosRicettaComposta
- `2402` — calcolaMacrosPiano
- `2496` — renderBadgeMacrosReali
- `2554` — renderBadgeMacrosReali_DOM

### ANALISI DEL SANGUE — parsing, indici clinici derivati, interpretazione
Righe 2642-2974

- `2642` — ANALISI_KEY
- `2802` — _parseAnalisiNum
- `2810` — calcolaIndice
- `2948` — interpretaAnalisi
- `2960` — _interpAnalisiHtml
- `2974` — mostraInfoRange

### CONCETTI EDUCATIVI — sync Supabase, migrazione
Righe 3111-3139

- `3111` — pushConcetiSupabase
- `3125` — pullConcetiSupabase
- `3139` — migraConcetti

### ALIMENTI — categorie funzionali/semaforo, chip UI, equivalenze porzioni
Righe 3324-3570

- `3324` — getCategoriaSemaforo
- `3341` — _getCategorieGruppo
- `3355` — calcolaGrammaturaEquivalente
- `3372` — criterioByCat
- `3383` — suggerisciGrEquivalente
- `3428` — arrotondaPorzioneDiscreta
- `3442` — getCategoriaFunzionale
- `3482` — catArr
- `3498` — _tagComuniTrova
- `3502` — getTagComuniChip
- `3505` — setTagComuniChip
- `3513` — setCatChips
- `3526` — getStagioniChip
- `3529` — setStagioniChip
- `3536` — getProfiloChip
- `3539` — setProfiloChip
- `3548` — wireChipGroup
- `3559` — wireAttrChipGroups
- `3570` — wireRadioChipGroup

### CONFIG / STORAGE LOCALE — cfg, localStorage db, util data/valuta
Righe 3598-3737

- `3598` — getCfg
- `3599` — saveCfgL
- `3600` — getUrl
- `3601` — saveLocal
- `3602` — loadLocal
- `3603` — uid
- `3604` — today
- `3605` — addDays
- `3606` — fData
- `3607` — fEur
- `3609` — getLastSyncText
- `3619` — getSyncColor
- `3627` — aggiornaStatoSync
- `3653` — setSyncStatus
- `3690` — _registraTombstone
- `3698` — _tombstoneAttivi
- `3710` — _fondiTombstones
- `3724` — _mergeTombstonesRemoti
- `3737` — _applicaTombstones

### SYNC SUPABASE — push/pull ricette/pazienti, tombstones, conflitti (P69)
Righe 3759-4135

- `3759` — supaHeaders
- `3773` — pushRicetteSupabase
- `3798` — pullRicetteSupabase
- `3820` — delRicetteSupabase
- `3832` — delPazienteSupabase
- `3845` — pushToSheets
- `3888` — pullFromSheets
- `3963` — syncNow
- `3976` — sincronizzaTutto
- `4106` — testConnSupabase
- `4135` — _p68LogSaveAnonimo

### SYNC SUPABASE — save paziente, piani/cache piano, entrate, eventi
Righe 4149-4665

- `4149` — save
- `4167` — _pushRigaPerId
- `4200` — _flushDirtyIds
- `4283` — _p69LoadBaseline
- `4286` — _p69StoreBaseline
- `4289` — _p69SetBaseline
- `4293` — _p69DropBaseline
- `4297` — _p69SetBaselineFromRows
- `4303` — _p69NomePaz
- `4308` — _p69InList
- `4316` — _p69RilevaConflitti
- `4352` — _p69DialogoConflitti
- `4386` — _p69RisolviRicarica
- `4415` — _p69EsportaLocali
- `4428` — _p69RisolviSovrascrivi
- `4441` — pushPianoSupabase
- `4463` — pullPianiSupabase
- `4479` — delPianoSupabase
- `4495` — delPianiPazienteSupabase
- `4507` — pushCachePianoSupabase
- `4524` — caricaCachePianoSupabase
- `4546` — pushEntrateSupabase
- `4570` — pullEntrateSupabase
- `4584` — delEntrataSupabase
- `4592` — pushEntrataSupabase
- `4603` — pushEventoSupabase
- `4616` — pushEventiSupabase
- `4640` — pullEventiSupabase
- `4654` — delEventoSupabase
- `4665` — _pianoCacheKey

### UI GENERALE — config AI key, notifiche, navigazione (goTo/tab/modali)
Righe 4665-4815

- `4665` — _pianoCacheKey
- `4692` — _salvaPianoCache
- `4697` — _caricaPianoCache
- `4703` — salvaCfg
- `4704` — testConn
- `4710` — salvaAntKey
- `4718` — testaAntKey
- `4728` — initAntCard
- `4736` — esporta
- `4737` — importa
- `4742` — goTo
- `4759` — closeM
- `4767` — ngChiudiModale
- `4776` — ngChiudiPopupCoppia
- `4780` — ngAggiungiX
- `4791` — ngUpgradeModali
- `4811` — mTab
- `4812` — aggiornaEta
- `4813` — toggleOrarioNote
- `4814` — pdTab
- `4815` — notif

### PAZIENTI — registro: lista/card/kanban, apertura, editing, salvataggio, routine
Righe 4815-6060

- `4815` — notif
- `4823` — getPazView
- `4824` — setPazView
- `4833` — _pazStatoPiano
- `4841` — _pazUrgenzaControllo
- `4848` — _pazStatoTagHtml
- `4857` — _pazAggiornaFiltroRegimi
- `4865` — renderPaz
- `4916` — _renderPazCard
- `4941` — _renderPazLista
- `4968` — _renderPazKanban
- `5006` — openNuovoPaz
- `5032` — editPaz
- `5091` — applicaRegoloSemaforo
- `5602` — trovaChiaveAlimento
- `5611` — salvaPaz
- `5665` — openPaz
- `5747` — renderPdRoutine
- `5889` — updateRoutineCampo
- `5897` — suggerisciPastoEQuando
- `5924` — filtroLibreria
- `5933` — renderLibreriaGrid
- `5954` — aggiungiDaLibreriaIdx
- `5978` — openModalRoutine
- `5985` — salvaRoutineVoce
- `6010` — salvaRoutine
- `6017` — mostraRoutinePopup
- `6045` — removeRoutineVoce
- `6060` — _renderAggiustamentiSection

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 6060-6849

- `6060` — _renderAggiustamentiSection
- `6145` — salvaAggiustamento
- `6178` — eliminaAggiustamento
- `6187` — renderPdNote
- `6222` — salvaNotaClinica
- `6237` — deleteNota
- `6246` — saveNote
- `6761` — _applicaRegoloSemaforoLEGACY
- `6802` — resetSemaforoAuto
- `6849` — costruisciContestoPaziente

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 6849-7187

- `6849` — costruisciContestoPaziente
- `6987` — avviaFX
- `7015` — avviaAnalisi
- `7033` — _renderFlussoPanel
- `7077` — _riepEsc
- `7081` — _riepNum
- `7087` — _riepDelta
- `7095` — _riepDataSig
- `7113` — _riepParseFX
- `7127` — _riepAggiornaFX
- `7154` — _riepToggleDomandaDefault
- `7166` — _riepAddDomanda
- `7179` — _riepRemoveDomanda
- `7187` — renderPdRiepilogo

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 7187-7628

- `7187` — renderPdRiepilogo
- `7400` — renderPdRagionamento
- `7488` — inviaMessaggioRag
- `7507` — concludiERiassumi
- `7522` — salvaRagionamento
- `7543` — apriGeneratoreDaRag
- `7551` — nuovaSessioneRag
- `7557` — cancellaSavedRag
- `7567` — renderPazTimeline
- `7599` — renderPdAnamnesi
- `7628` — renderPdAlimenti

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 7628-8151

- `7628` — renderPdAlimenti
- `7672` — renderPdAnalisi
- `7716` — toggleAnalisiSection
- `7726` — loadAnalisiSanguePDF
- `7801` — mostraDiffAnalisi
- `7874` — _calcoloIncluso
- `7880` — toggleCalcoloIncluso
- `7902` — _renderCalcoliPannello
- `7938` — toggleGlossario
- `7943` — updateAnalisi
- `7996` — salvaAnalisi
- `8009` — applicaGruppoClinico
- `8038` — renderBoxGruppiCliniciSuggeriti
- `8070` — suggerisciGruppiClinici
- `8151` — renderMemoriaInbody

### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 8151-8405

- `8151` — renderMemoriaInbody
- `8199` — _ibFmtBreve
- `8208` — _renderPesiIntermediSection
- `8257` — aggiungiPesoIntermedio
- `8273` — eliminaPesoIntermedio
- `8283` — _ibSilhouetteSegmentale
- `8405` — renderPdInbody

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 8405-8677

- `8405` — renderPdInbody
- `8677` — renderPdMacros

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 8677-9549

- `8677` — renderPdMacros
- `9009` — aggiornaLabelMacros
- `9026` — calcolaMacros
- `9113` — applicaSchema
- `9120` — _renderRifPesoBox
- `9168` — _usaRifPeso
- `9172` — _aggiornaRifPesoTarget
- `9175` — _aggiornaRegimeSlider
- `9208` — _presetRegime
- `9212` — _initRegimeSliderDaPaziente
- `9228` — ricalcolaLAF
- `9264` — renderStoricoTDEE
- `9297` — attivaSlotTDEE
- `9305` — eliminaSlotTDEE
- `9318` — _toggleCiclizzazione
- `9324` — _aggiornaAnteprimaCiclizzazione
- `9342` — salvaCalcoloMacros
- `9443` — _metAllenamento
- `9455` — _neatFrazione
- `9461` — _larnLafStileVita
- `9478` — _regimeOffset
- `9488` — _componiRegimeText
- `9500` — calcolaTDEE
- `9549` — renderPianoPage

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 9549-9997

- `9549` — renderPianoPage
- `9567` — renderTargetBadge
- `9596` — verificaRegola_75_20_5
- `9633` — renderBadge75_20_5
- `9698` — _validaNorm
- `9701` — _validaMatchTermine
- `9709` — _validaCostruisciListe
- `9760` — _validaTesto
- `9781` — validaPiano
- `9855` — _validaFirmaBlocchi
- `9862` — renderBadgeValidatore
- `9893` — _validaVaiAlGiorno
- `9902` — apriPannelloValidatore
- `9959` — _validaEseguiOverride
- `9982` — validaGateExport
- `9997` — renderRiepilogoSettimana

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 9997-10688

- `9997` — renderRiepilogoSettimana
- `10130` — pianoPazSelezionato
- `10277` — renderPianoConPillTabs
- `10444` — renderPanelMacrosGiorno
- `10587` — pmgCambiaGrammi
- `10611` — riapriPiano
- `10649` — _montaPianoCorrente
- `10688` — pushTemplateSupabase

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 10688-11167

- `10688` — pushTemplateSupabase
- `10698` — pullTemplateSupabase
- `10709` — delTemplateSupabase
- `10718` — _promptTemplateNome
- `10743` — _creaTemplateDaJSON
- `10766` — salvaComeTemplate
- `10777` — salvaComeTemplateDaPiano
- `10786` — _normNomeAlim
- `10787` — _escRegAlim
- `10788` — _raccogliAlimentiDaPiano
- `10799` — _alimentiEsclusiPaziente
- `10811` — _trovaConflittiTemplate
- `10829` — _mostraAvvisoConflitti
- `10853` — applicaTemplate
- `10871` — apriPickerTemplate
- `10899` — _pickPaziente
- `10918` — applicaTemplatePick
- `10922` — rinominaTemplate
- `10933` — eliminaTemplate
- `10943` — renderLibreriaTemplate
- `10972` — renderStoricoPiani
- `11031` — eliminaPiano
- `11047` — _getActiveMacrosTarget
- `11071` — getTargetAttivi
- `11108` — calcolaTargetsCiclizzazione
- `11134` — _setupPianoTargets
- `11158` — getStagioneCorrente
- `11167` — costruisciPrompt

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 11167-11476

- `11167` — costruisciPrompt
- `11476` — toggleRegolePiano

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 11476-11953

- `11476` — toggleRegolePiano
- `11485` — aggiornaUIcolazione
- `11495` — salvaRegolePiano
- `11556` — _isModelloSistema
- `11559` — _isModelloSistemaModificato
- `11571` — caricaModelliCustomLocal
- `11585` — salvaModelliCustomLocal
- `11606` — _migraRecordCustom (P108: formato vecchio → record catalogo + alias legacy)
- `11621` — _syncAliasLegacy
- `11630` — caricaAlimentiCustom
- `11654` — pushAlimentiCustomSupabase
- `11668` — pullAlimentiCustomSupabase
- `11681` — pushModelliSupabase
- `11703` — pullModelliSupabase
- `11730` — _calcolaFreqDaModello
- `11749` — aggiornaUImodello
- `11838` — popolaDropdownModelli
- `11866` — cambiaModelloRotazione
- `11872` — ripristinaModelloOriginale
- `11895` — eliminaModelloCustom
- `11913` — mostraAnteprimaModello
- `11923` — apriEditorModello
- `11953` — _renderGrigliaModello

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
Righe 11953-12502

- `11953` — _renderGrigliaModello
- `12222` — _salvaModelloDaEditor
- `12264` — caricaRegolePiano
- `12291` — getAnthropicKey
- `12330` — _aiModelFor
- `12337` — _aiLogUsage
- `12359` — _aiProxyUrl
- `12363` — _aiProxyDisabled
- `12371` — _aiTokenPerProxy
- `12402` — aiCall
- `12502` — _normalizzaPianoNuovo

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 12502-12715

- `12502` — _normalizzaPianoNuovo
- `12575` — espandiPiano
- `12635` — getFruttaStile
- `12642` — _fruttaGetPasto
- `12652` — _fruttaContaRigheRicetta
- `12656` — _fruttaIndiceBasePasto
- `12676` — getFruttaMarker
- `12689` — fruttaMarkerHtml
- `12697` — _fruttaCheckboxHtml
- `12706` — toggleFrutta
- `12715` — _appendToggleFruttaStile

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 12715-13965

- `12715` — _appendToggleFruttaStile
- `12751` — _renderCelleGriglia
- `12828` — _renderRicetteTestuali
- `12867` — scambiaRicette
- `12938` — _renderCelleHtml
- `12946` — toggleCellaMenu
- `12965` — closeAllCellaMenus
- `12973` — _trovaPasto
- `12981` — cellaSposta
- `13035` — cellaCancella
- `13056` — apriEditGrammatura
- `13111` — cellaSwap
- `13128` — cellaRimuoviAlt
- `13142` — cellaAggiungiAlt
- `13237` — _mostraPopupAggiungiAlt
- `13323` — apriEditRicetta
- `13332` — aggiungiRicetta
- `13348` — rimuoviRicetta
- `13357` — _mostraPopupEditRicetta
- `13518` — ngAggiungiSpuntinoVuoto
- `13534` — apriAggiungiCella
- `13625` — _apriPopupRicettaComposta
- `13717` — _mostraPopupSceltaCategoriaAlimento
- `13858` — _aggiornaPianoBox
- `13965` — parseJSONSicuro

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 13965-14394

- `13965` — parseJSONSicuro
- `14013` — _attesoStrutturaPiano
- `14033` — _confrontaStrutturaPiano
- `14063` — _costruisciPromptDelta
- `14090` — _pianoToolSchema
- `14162` — _pianoMaxTokens
- `14171` — _estraiPianoDaRisposta
- `14193` — chiamaGeneraPiano
- `14363` — mostraLoadingSteps
- `14394` — apriAIWhatsApp

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 14394-14663

- `14394` — apriAIWhatsApp
- `14461` — generaMessaggioAI
- `14550` — copiaMessaggioAI
- `14560` — salvaInStorico
- `14572` — salvaVarianteAI
- `14587` — renderVariantiSalvate
- `14606` — usaVariante
- `14624` — eliminaVariante
- `14635` — renderStoricoMsg
- `14651` — apriWhatsApp
- `14663` — generaPiano

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 14663-15850

- `14663` — generaPiano
- `14841` — _ngColoreSemaforoNome
- `14849` — apriSceltaModalitaPiano
- `14884` — _ngChiudiModalita
- `15033` — _ngCostruisciGiornoVuoto
- `15077` — _ngIndiceInizioSpeciali
- `15088` — _ngModalitaNomeGiorno (P95: legge piano[0]._modoNomeGiorno, default 'sett')
- `15094` — _ngImpostaModalitaNomeGiorno (P95: scrive piano[0]._modoNomeGiorno)
- `15097` — _ngLettera (P95: converte indice 0/1/2... in A/B/C...)
- `15104` — _ngEtichettaGiorno (P95: etichetta display completa — Lunedì/Giorno 1/Giorno A)
- `15124` — _ngEtichettaGiornoBreve (P95: etichetta display abbreviata per le linguette — G1/GA)
- `15332` — _ngGiornoHaContenuto
- `15344` — _ngCreaPianoManuale
- `15363` — _ngScrollTabGiorni
- `15373` — _ngAbilitaDragScroll
- `15410` — _ngCambiaNumeroGiorni
- `15437` — _ngRenderEditorManuale
- `15000` — _ngRenderAlbero
- `15041` — _ngToggleCat
- `15050` — _ngFiltraAlbero
- `15074` — _ngRenderPianoDestra
- `15189` — _ngSalvaPianoManuale
- `15215` — _ngParseIngrediente
- `15239` — _ngScomponiIngredienti
- `15251` — _ricCalcolaMacroDaIngredienti
- `15269` — _ricRicalcolaMacroLive
- `15276` — _ricAggiornaInfoMacro
- `15290` — _ricRicalcolaMacroLiveNow
- `15314` — _ngTrovaCategoriaAlimento
- `15347` — _ngPescaRicetta
- `15389` — _ngScomponiRicettaNelPasto
- `15426` — _ngDragStart
- `15437` — _ngDragStartCella
- `15448` — _ngDragOver
- `15455` — _ngDragLeave
- `15460` — _ngDrop
- `15479` — _ngAggiungiAlimento
- `15504` — _ngRimuoviAlimento
- `15518` — _ngDopoModifica
- `15581` — gramTestoCasalingo
- `15607` — _appendToggleNutrizionali
- `15650` — _appendTogglePromemoria
- `15679` — _appendBtnConcetti
- `15825` — cpFromEmoji
- `15831` — getEmojiCp
- `15850` — generaPDF

### EXPORT — generazione PDF piano (generaPDF)
Righe 15850-16852

- `15850` — generaPDF
- `16852` — openInbody

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 16852-17029

- `16852` — openInbody
- `16862` — salvaInbody
- `16886` — delInbody
- `16893` — ascoltaProgresso
- `17029` — buildSemBadges

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 17029-17613

- `17029` — buildSemBadges
- `17057` — buildSemLegenda
- `17071` — renderAlEditor (editor dentro le preferenze-cibi del paziente)
- `17163` — scanRiferimentiAlimento (P82: scansione riferimenti per nome, sola lettura)
- `17192` — _alimRefsRighe
- `17198` — rinominaAlimentoCustom (P82: rinomina ovunque con conferma)
- `17286` — modificaAlimentoCustom
- `17303` — ripristinaValoriPrecedentiAlimento (undo singolo P82)
- `17315` — _resetAlimModal
- `17324` — apriNuovoAlimentoCustom
- `17330` — salvaAlimentoCustom (ora include campo allergeni + barcode/fonte 'off' se da scanner)
- `17395` — eliminaAlimentoCustom (P82: elimina solo a riferimenti zero)
- `17426` — _alimFonteBadge (P108 fase 1: badge Base CREA/Personalizzato/Da barcode)
- `17431` — renderAlimentiPage (P108 fase 1: sezione "Alimenti" indipendente dal paziente — lista/ricerca/filtri categoria+fonte+stato)
- `17500` — archiviaAlimentoCustom (P108 fase 1: attivo:false, mai elimina secco — record resta risolvibile)
- `17518` — ripristinaAlimentoCustom (P108 fase 1: inversa di archivia)

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 17572-17730

- `17578` — _bcSetStatus
- `17580` — apriScannerBarcode
- `17588` — chiudiScannerBarcode
- `17593` — _bcStopCamera
- `17601` — _bcModaleAperto
- `17603` — _bcAvviaCamera (sceglie BarcodeDetector nativo o ZXing)
- `17614` — _bcAvviaNativo (Chrome/Android)
- `17634` — _bcAvviaZXing (carica libreria da CDN)
- `17643` — _bcZXStart (Safari/iPhone, Firefox)
- `17654` — _bcErroreCamera
- `17662` — cercaBarcodeManuale (fallback input manuale)
- `17668` — _barcodeTrovato (dedup su CATALOGO_ALIMENTI)
- `17684` — cercaBarcodeOFF (fetch Open Food Facts, timeout 12s)
- `17702` — _bcProdottoNonTrovato
- `17716` — _bcPrecompilaForm (precompila mo-alim-custom, MAI auto-salva)
- `17534` — togAl
- `17587` — selCatAl
- `17601` — selTuttiAl
- `17613` — getEventi

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 17613-17943

- `17613` — getEventi
- `17627` — setCalView
- `17628` — calPrev
- `17629` — calNext
- `17630` — calToday
- `17632` — renderCal
- `17646` — renderCalMonth
- `17670` — renderCalWeek
- `17688` — renderCalDay
- `17704` — selGiorno
- `17718` — setDisp
- `17723` — openAddEvento
- `17736` — openAddEventoPaz
- `17742` — toggleEntrataCheck
- `17747` — salvaEvento
- `17770` — openEvDetail
- `17825` — delEvento
- `17833` — copyMsg
- `17840` — aggDateCal
- `17845` — syncInizio
- `17846` — syncControllo
- `17847` — aggiornaPrev
- `17864` — renderRic
- `17891` — openNuovaRic
- `17892` — editRic
- `17902` — salvaRic
- `17927` — delRic
- `17943` — renderEntrate

### RICETTARIO — CRUD ricette
Righe 17943-18088

- `17943` — renderEntrate
- `18028` — aggiungiEntrataPerPaziente
- `18045` — openNuovaEntrata
- `18059` — salvaEntrata
- `18080` — delEntrata
- `18088` — startVoiceRicetta

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 18088-18472

- `18088` — startVoiceRicetta
- `18118` — aiSuggerisciRicetta
- `18163` — renderConcettiModal
- `18182` — apriConcettiModal
- `18209` — salvaConcettiAllegati
- `18227` — loadInbodyPDF
- `18309` — _vitdLabel
- `18313` — getIntegratori
- `18317` — getIntegraWant
- `18321` — setIntegratori
- `18338` — setIntegraWant
- `18349` — getPatologieChip
- `18350` — getAllergieChip
- `18351` — setPatologieChip
- `18352` — setAllergieChip
- `18353` — getPatologie
- `18354` — getAllergie
- `18355` — setPatologieFromStr
- `18362` — setAllergieFromStr
- `18375` — getSdvChip
- `18376` — getCspChip
- `18377` — setSdvChip
- `18378` — setCspChip
- `18379` — setSdvFromStr
- `18380` — setCspFromStr
- `18384` — getBudget
- `18385` — setBudget
- `18390` — renderCalAnno
- `18421` — comprimeImmagine
- `18443` — uploadImmagineConcetto
- `18462` — rimuoviImmagineConcetto
- `18472` — renderConcettiPage

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 18472-18642

- `18472` — renderConcettiPage
- `18538` — entraSelConcetti
- `18539` — annullaSelConcetti
- `18540` — toggleConcettoSel
- `18545` — eliminaConcettiSelezionati
- `18564` — confermaEliminaConcetti
- `18579` — aiRiscriviConcetto
- `18593` — editConcetto
- `18611` — salvaConcetto
- `18622` — openNuovoConcetto
- `18642` — getAgendaPersonale

### DASHBOARD — agenda personale, todo, promemoria
Righe 18642-18806

- `18642` — getAgendaPersonale
- `18643` — saveAgendaPersonale
- `18644` — getAgendaTodo
- `18645` — saveAgendaTodo
- `18647` — pulisciAgendaVecchia
- `18651` — navigaAgenda
- `18660` — toggleFormAgenda
- `18661` — toggleFormTodo
- `18663` — salvaAgendaItem
- `18677` — salvaTodoItem
- `18689` — toggleAgendaFatto
- `18697` — toggleTodoFatto
- `18710` — _catCol
- `18712` — renderAgendaDx
- `18806` — renderDashboard

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 18806-19136

- `18806` — renderDashboard
- `18932` — renderScadenzeAlert
- `19117` — segnaGestito
- `19136` — archiviaPaz

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 19136-19216

- `19136` — archiviaPaz
- `19145` — ripristinaPaz
- `19151` — eliminaPaz
- `19194` — getDove
- `19198` — setDove
- `19216` — salvaCredenzialiPersistenti

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 19216-19660

- `19216` — salvaCredenzialiPersistenti
- `19221` — getCredenzialiPersistenti
- `19234` — cancellaCredenzialiPersistenti
- `19239` — rinnovaSessioneConRefreshToken
- `19256` — getSessioneSalvata (P105: su token scaduto ritorna null ma NON cancella più localStorage)
- `19275` — salvaSessione
- `19285` — cancellaSessione
- `19289` — eseguiLogin
- `19336` — eseguiLogout
- `19358` — mostraApp
- `19363` — verificaSessioneEAvvia
- `19391` — assicuraTokenValido
- `19420` — _garantiscoSessionePerSync (nuova, P105 — guard anti-scrittura anonima, usato da syncNow/sincronizzaTutto/_flushDirtyIds)
- `19432` — avviaRinnovoTokenPeriodico
- `19436` — fermaRinnovoTokenPeriodico
- `19445` — _authReset
- `19450` — _authMostra
- `19453` — mostraLogin
- `19454` — mostraRegistrazione
- `19455` — mostraRecupero
- `19456` — mostraNuovaPassword
- `19459` — eseguiRegistrazione
- `19497` — eseguiRecuperoPassword
- `19526` — eseguiNuovaPassword
- `19560` — _parseHashParams
- `19567` — _pulisciHash
- `19571` — gestisciRitornoAuth
- `19660` — renderPianoBox

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 19660-19855

- `19660` — renderPianoBox
- `19732` — apriPannelloRicette
- `19761` — chiudiPannelloRicette
- `19769` — applicaRicettaPasto
- `19805` — inizializzaP2
- `19817` — deepClone
- `19821` — applicaPatch
- `19855` — _aggiornaLabelSalvaPiano
