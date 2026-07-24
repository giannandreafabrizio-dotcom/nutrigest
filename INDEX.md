# NutriGest — INDEX.md

Mappa funzioni → righe di `index.html`, organizzata per area funzionale.
Rigenerato per intero il 14 luglio 2026 sera (script Python su tutte le `function`/`async function` top-level, incluse le assegnazioni `window.X = function`), dopo l'unificazione pannello alimenti gara + Componi a mano col Generatore AI. Righe totali file: 20888 (era 20686 al 14 lug sera precedente).

⚠️ **Nota sulla rigenerazione:** la versione precedente copriva solo la sezione COMPOSITORE MANUALE dopo P95; questa rigenerazione ricalcola TUTTI i numeri di riga da zero con uno script automatico (stesso metodo dichiarato qui sotto), così l'intero indice torna affidabile, non solo una sezione.

## Come usarlo
1. Trova l'area funzionale pertinente qui sotto (o cerca il nome funzione nella tabella).
2. Usa `view` con `view_range` sul range indicato invece di leggere tutto il file.
3. Se il nome funzione non è chiaro o non è in tabella, `grep -n "nomeFunzione" index.html` prima di editare.
4. Rigenera questo indice dopo modifiche strutturali ampie (nuove sezioni, spostamento di blocchi di funzioni), non dopo ogni piccolo commit.

---

### HEAD / CSS / HTML STATICO (markup, stili, struttura pagine)
*(nessuna funzione top-level dichiarata in questo range — markup/CSS/dati statici)*

---

### CATALOGO UNICO ALIMENTI (P108 fase 0) — record {id,nome,categoriaSem,gDefault,per100g,fonte}, risoluzione id/nome
Righe 2295-2337

- `2295` — _slugAlimento
- `2303` — _catalogoIndicizza
- `2307` — _catalogoDeindicizza
- `2314` — costruisciCatalogo
- `2337` — risolviAlimento

---

### MACROS PIANO — calcolo e badge macro reali vs target
Righe 2352-2601

- `2352` — getValoriCREA
- `2364` — getCurrentPaziente
- `2384` — getKcalWeekend
- `2427` — getMacrosRicettaComposta
- `2433` — calcolaMacrosPiano
- `2535` — renderBadgeMacrosReali
- `2545` — pctStr
- `2546` — color
- `2559` — row
- `2601` — renderBadgeMacrosReali_DOM

---

### ANALISI DEL SANGUE — parsing, indici clinici derivati, interpretazione
Righe 2849-3021

- `2849` — _parseAnalisiNum
- `2857` — calcolaIndice
- `2995` — interpretaAnalisi
- `3007` — _interpAnalisiHtml
- `3021` — mostraInfoRange

---

### CONCETTI EDUCATIVI — sync Supabase, migrazione
Righe 3158-3186

- `3158` — pushConcetiSupabase
- `3172` — pullConcetiSupabase
- `3186` — migraConcetti

---

### ALIMENTI — categorie funzionali/semaforo, chip UI, equivalenze porzioni
Righe 3371-3617

- `3371` — getCategoriaSemaforo
- `3388` — _getCategorieGruppo
- `3402` — calcolaGrammaturaEquivalente
- `3419` — criterioByCat
- `3430` — suggerisciGrEquivalente
- `3475` — arrotondaPorzioneDiscreta
- `3489` — getCategoriaFunzionale
- `3529` — catArr
- `3545` — _tagComuniTrova
- `3549` — getTagComuniChip
- `3552` — setTagComuniChip
- `3560` — setCatChips
- `3573` — getStagioniChip
- `3576` — setStagioniChip
- `3583` — getProfiloChip
- `3586` — setProfiloChip
- `3595` — wireChipGroup
- `3606` — wireAttrChipGroups
- `3617` — wireRadioChipGroup

---

### CONFIG / STORAGE LOCALE — cfg, localStorage db, util data/valuta
Righe 3645-3784

- `3645` — getCfg
- `3646` — saveCfgL
- `3647` — getUrl
- `3648` — saveLocal
- `3649` — loadLocal
- `3650` — uid
- `3651` — today
- `3652` — addDays
- `3653` — fData
- `3654` — fEur
- `3656` — getLastSyncText
- `3666` — getSyncColor
- `3674` — aggiornaStatoSync
- `3700` — setSyncStatus
- `3737` — _registraTombstone
- `3745` — _tombstoneAttivi
- `3757` — _fondiTombstones
- `3771` — _mergeTombstonesRemoti *(dal 24/7 legge il meta da `collections`, P74 1d)*
- `3784` — _applicaTombstones
- `3909` — _pazFetchMeta *(P74 1d — solo `collections`)*
- `3930` — _collectionsUpsert *(P74 — scrittura primaria dei 4 meta-record dal cutover 1d)*
- `3952` — _collectionsFetch *(P74 1d — lettura unica dei meta-record)*
- `3975` — _analisiSangueUpsert *(P74 fase 2 — scrittura ombra analisi del sangue, 24/7)*

---

### SYNC SUPABASE — push/pull ricette/pazienti, tombstones, conflitti (P69)
Righe 3806-4182

- `3806` — supaHeaders
- `3820` — pushRicetteSupabase
- `3845` — pullRicetteSupabase
- `3867` — delRicetteSupabase
- `3879` — delPazienteSupabase
- `3892` — pushToSheets
- `3935` — pullFromSheets
- `4010` — syncNow
- `4023` — sincronizzaTutto
- `4049` — stpSet
- `4054` — stpMsg
- `4153` — testConnSupabase
- `4182` — _p68LogSaveAnonimo

---

### SYNC SUPABASE — save paziente, piani/cache piano, entrate, eventi
Righe 4196-4712

- `4196` — save
- `4214` — _pushRigaPerId
- `4247` — _flushDirtyIds
- `4330` — _p69LoadBaseline
- `4333` — _p69StoreBaseline
- `4336` — _p69SetBaseline
- `4340` — _p69DropBaseline
- `4344` — _p69SetBaselineFromRows
- `4350` — _p69NomePaz
- `4355` — _p69InList
- `4363` — _p69RilevaConflitti
- `4399` — _p69DialogoConflitti
- `4425` — chiudi
- `4433` — _p69RisolviRicarica
- `4462` — _p69EsportaLocali
- `4475` — _p69RisolviSovrascrivi
- `4488` — pushPianoSupabase
- `4510` — pullPianiSupabase
- `4526` — delPianoSupabase
- `4542` — delPianiPazienteSupabase
- `4554` — pushCachePianoSupabase
- `4571` — caricaCachePianoSupabase
- `4593` — pushEntrateSupabase
- `4617` — pullEntrateSupabase
- `4631` — delEntrataSupabase
- `4639` — pushEntrataSupabase
- `4650` — pushEventoSupabase
- `4663` — pushEventiSupabase
- `4687` — pullEventiSupabase
- `4701` — delEventoSupabase
- `4712` — _pianoCacheKey

---

### UI GENERALE — config AI key, notifiche, navigazione (goTo/tab/modali)
Righe 4739-4862

- `4739` — _salvaPianoCache
- `4744` — _caricaPianoCache
- `4750` — salvaCfg
- `4751` — testConn
- `4765` — testaAntKey
- `4775` — initAntCard
- `4783` — esporta
- `4784` — importa
- `4789` — goTo
- `4806` — closeM
- `4814` — ngChiudiModale
- `4823` — ngChiudiPopupCoppia
- `4827` — ngAggiungiX
- `4838` — ngUpgradeModali
- `4858` — mTab
- `4859` — aggiornaEta
- `4860` — toggleOrarioNote
- `4861` — pdTab
- `4862` — notif

---

### PAZIENTI — registro: lista/card/kanban, apertura, editing, salvataggio, routine
Righe 4870-6107

- `4870` — getPazView
- `4871` — setPazView
- `4880` — _pazStatoPiano
- `4888` — _pazUrgenzaControllo
- `4895` — _pazStatoTagHtml
- `4904` — _pazAggiornaFiltroRegimi
- `4912` — renderPaz
- `4963` — _renderPazCard
- `4988` — _renderPazLista
- `5015` — _renderPazKanban
- `5053` — openNuovoPaz
- `5079` — editPaz
- `5138` — applicaRegoloSemaforo
- `5649` — trovaChiaveAlimento
- `5658` — salvaPaz
- `5712` — openPaz
- `5794` — renderPdRoutine
- `5809` — cardHTML
- `5936` — updateRoutineCampo
- `5944` — suggerisciPastoEQuando
- `5971` — filtroLibreria
- `5980` — renderLibreriaGrid
- `6001` — aggiungiDaLibreriaIdx
- `6025` — openModalRoutine
- `6032` — salvaRoutineVoce
- `6057` — salvaRoutine
- `6064` — mostraRoutinePopup
- `6092` — removeRoutineVoce
- `6107` — _renderAggiustamentiSection

---

### 📈 PERCORSO — timeline di periodizzazione (P115 Tappa 1, 24 lug 2026)
Righe 6021-6280 (numeri ESATTI al 24/7 sera). ⚠️ L'inserimento di questo blocco (~260 righe) fa slittare di +~260 tutti i numeri delle sezioni SUCCESSIVE a riga ~6020 rispetto all'ultima rigenerazione completa: per quelle sezioni fare grep di conferma. Rigenerazione completa alla prossima modifica strutturale.

- `6032` — _PERCORSO_TIPI (const: tipi fase, colori, pct default)
- `6039` — _percorsoGet *(normalizza p.percorso, scarta fasi invalide)*
- `6050` — _percorsoIsoLocal *(data → YYYY-MM-DD LOCALE, mai toISOString/UTC)*
- `6056` — _percorsoIntervalli *(fasi consecutive → date concrete dal/al)*
- `6070` — _percorsoFaseAt *(fase attiva a una data; dal incluso, al escluso)*
- `6079` — _percorsoKcalFase *(pct → kcal indicative via calcolaTDEE)*
- `6086` — _percorsoPaz
- `6087` — percorsoInit
- `6093` — percorsoSetInizio
- `6097` — percorsoAddFase *(alternanza suggerita deficit↔mantenimento)*
- `6106` — percorsoUpdFase
- `6114` — percorsoDelFase
- `6119` — percorsoMoveFase
- `6128` — _percorsoChartSvg *(bande fasi + peso reale + oggi + obiettivo)*
- `6210` — renderPdPercorso *(scheda: badge fase, grafico, editor)*

---

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 6192-6896

- `6192` — salvaAggiustamento
- `6225` — eliminaAggiustamento
- `6234` — renderPdNote
- `6269` — salvaNotaClinica
- `6284` — deleteNota
- `6293` — saveNote
- `6808` — _applicaRegoloSemaforoLEGACY
- `6849` — resetSemaforoAuto
- `6896` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 7034-7234

- `7034` — avviaFX
- `7062` — avviaAnalisi
- `7080` — _renderFlussoPanel
- `7124` — _riepEsc
- `7128` — _riepNum
- `7134` — _riepDelta
- `7142` — _riepDataSig
- `7160` — _riepParseFX
- `7165` — clean
- `7174` — _riepAggiornaFX
- `7201` — _riepToggleDomandaDefault
- `7213` — _riepAddDomanda
- `7226` — _riepRemoveDomanda
- `7234` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 7297-7675

- `7297` — dCol
- `7415` — card
- `7447` — renderPdRagionamento
- `7535` — inviaMessaggioRag
- `7554` — concludiERiassumi
- `7569` — salvaRagionamento
- `7590` — apriGeneratoreDaRag
- `7598` — nuovaSessioneRag
- `7604` — cancellaSavedRag
- `7614` — renderPazTimeline
- `7646` — renderPdAnamnesi
- `7675` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 7719-8198

- `7719` — renderPdAnalisi
- `7763` — toggleAnalisiSection
- `7773` — loadAnalisiSanguePDF
- `7848` — mostraDiffAnalisi
- `7921` — _calcoloIncluso
- `7927` — toggleCalcoloIncluso
- `7949` — _renderCalcoliPannello
- `7985` — toggleGlossario
- `7990` — updateAnalisi
- `8043` — salvaAnalisi
- `8056` — applicaGruppoClinico
- `8085` — renderBoxGruppiCliniciSuggeriti
- `8117` — suggerisciGruppiClinici
- `8198` — renderMemoriaInbody

---

### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 8246-8452

- `8246` — _ibFmtBreve
- `8255` — _renderPesiIntermediSection
- `8304` — aggiungiPesoIntermedio
- `8320` — eliminaPesoIntermedio
- `8330` — _ibSilhouetteSegmentale
- `8350` — pct
- `8356` — colMagra
- `8362` — colGrassa
- `8370` — colTroncoGrassa
- `8452` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 8724-8724

- `8724` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 9056-9607

- `9056` — aggiornaLabelMacros
- `9073` — calcolaMacros
- `9166` — applicaSchema
- `9173` — _renderRifPesoBox
- `9221` — _usaRifPeso
- `9225` — _aggiornaRifPesoTarget
- `9228` — _aggiornaRegimeSlider
- `9263` — _presetRegime
- `9267` — _initRegimeSliderDaPaziente
- `9283` — ricalcolaLAF
- `9322` — renderStoricoTDEE
- `9355` — attivaSlotTDEE
- `9363` — eliminaSlotTDEE
- `9376` — _toggleCiclizzazione
- `9382` — _aggiornaAnteprimaCiclizzazione
- `9400` — salvaCalcoloMacros
- `9501` — _metAllenamento
- `9513` — _neatFrazione
- `9519` — _larnLafStileVita
- `9536` — _regimeOffset
- `9546` — _componiRegimeText
- `9550` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `9552` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `9558` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `9607` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 9625-10055

- `9625` — renderTargetBadge
- `9654` — verificaRegola_75_20_5
- `9691` — renderBadge75_20_5
- `9756` — _validaNorm
- `9759` — _validaMatchTermine
- `9767` — _validaCostruisciListe
- `9771` — addA
- `9772` — addR
- `9773` — addE
- `9818` — _validaTesto
- `9839` — validaPiano
- `9913` — _validaFirmaBlocchi
- `9920` — renderBadgeValidatore
- `9951` — _validaVaiAlGiorno
- `9960` — apriPannelloValidatore
- `9967` — esc
- `10017` — _validaEseguiOverride
- `10040` — validaGateExport
- `10055` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 10065-10811

- `10065` — abbr
- `10070` — isSab
- `10072` — buildVistaA
- `10076` — righeCategoria
- `10128` — buildVistaB
- `10134` — barColor
- `10139` — barW
- `10147` — barRow
- `10168` — getTabContent
- `10172` — tabBtn
- `10188` — pianoPazSelezionato
- `10335` — renderPianoConPillTabs
- `10341` — _renderGiornoGen
- `10385` — _dc
- `10386` — _dd
- `10393` — rowG
- `10567` — renderPanelMacrosGiorno
- `10710` — pmgCambiaGrammi
- `10734` — riapriPiano
- `10772` — _montaPianoCorrente
- `10811` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 10821-11290

- `10821` — pullTemplateSupabase
- `10832` — delTemplateSupabase
- `10841` — _promptTemplateNome
- `10866` — _creaTemplateDaJSON
- `10889` — salvaComeTemplate
- `10900` — salvaComeTemplateDaPiano
- `10909` — _normNomeAlim
- `10910` — _escRegAlim
- `10911` — _raccogliAlimentiDaPiano
- `10922` — _alimentiEsclusiPaziente
- `10934` — _trovaConflittiTemplate
- `10952` — _mostraAvvisoConflitti
- `10976` — applicaTemplate
- `10994` — apriPickerTemplate
- `11022` — _pickPaziente
- `11041` — applicaTemplatePick
- `11045` — rinominaTemplate
- `11056` — eliminaTemplate
- `11066` — renderLibreriaTemplate
- `11095` — renderStoricoPiani
- `11154` — eliminaPiano
- `11170` — _getActiveMacrosTarget
- `11194` — getTargetAttivi
- `11231` — calcolaTargetsCiclizzazione
- `11257` — _setupPianoTargets
- `11281` — getStagioneCorrente
- `11290` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 11366-11599

- `11366` — _ricSlots
- `11599` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 11608-12076

- `11608` — aggiornaUIcolazione
- `11618` — salvaRegolePiano
- `11679` — _isModelloSistema
- `11682` — _isModelloSistemaModificato
- `11694` — caricaModelliCustomLocal
- `11708` — salvaModelliCustomLocal
- `11729` — _migraRecordCustom
- `11744` — _syncAliasLegacy
- `11753` — caricaAlimentiCustom
- `11777` — pushAlimentiCustomSupabase
- `11791` — pullAlimentiCustomSupabase
- `11804` — pushModelliSupabase
- `11826` — pullModelliSupabase
- `11853` — _calcolaFreqDaModello
- `11872` — aggiornaUImodello
- `11961` — popolaDropdownModelli
- `11989` — cambiaModelloRotazione
- `11995` — ripristinaModelloOriginale
- `12018` — eliminaModelloCustom
- `12036` — mostraAnteprimaModello
- `12046` — apriEditorModello
- `12076` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 12111-12625

- `12111` — rerender
- `12345` — _salvaModelloDaEditor
- `12387` — caricaRegolePiano
- `12414` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `12460` — _aiLogUsage
- `12482` — _aiProxyUrl
- `12494` — _aiTokenPerProxy
- `12525` — aiCall
- `12534` — fetchConTimeout
- `12554` — unTentativo
- `12625` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 12631-12838

- `12631` — _risolviCollisioniCelle
- `12698` — espandiPiano
- `12702` — al2
- `12703` — espPasto
- `12758` — getFruttaStile
- `12765` — _fruttaGetPasto
- `12775` — _fruttaContaRigheRicetta
- `12779` — _fruttaIndiceBasePasto
- `12799` — getFruttaMarker
- `12812` — fruttaMarkerHtml
- `12820` — _fruttaCheckboxHtml
- `12829` — toggleFrutta
- `12838` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 12874-14136

- `12874` — _renderCelleGriglia
- `12951` — _renderRicetteTestuali
- `12990` — scambiaRicette
- `13001` — _ricDragTrovaRigaSotto
- `13007` — _ricDragPulisciEvidenza
- `13010` — _onPointerMove
- `13026` — _onPointerUp
- `13061` — _renderCelleHtml
- `13069` — toggleCellaMenu
- `13088` — closeAllCellaMenus
- `13096` — _trovaPasto
- `13104` — cellaSposta
- `13158` — cellaCancella
- `13179` — apriEditGrammatura
- `13204` — salva
- `13234` — cellaSwap
- `13251` — cellaRimuoviAlt
- `13265` — cellaAggiungiAlt
- `13360` — _mostraPopupAggiungiAlt
- `13383` — renderLista
- `13446` — apriEditRicetta
- `13455` — aggiungiRicetta
- `13471` — rimuoviRicetta
- `13480` — _mostraPopupEditRicetta
- `13527` — renderListaRicette
- `13555` — renderRicettario
- `13558` — renderParziali
- `13562` — salvaRicetta
- `13641` — ngAggiungiSpuntinoVuoto
- `13657` — apriAggiungiCella
- `13668` — risolviCompatibili
- `13748` — _apriPopupRicettaComposta
- `13790` — aggiornaMacros
- `13840` — _mostraPopupSceltaCategoriaAlimento
- `13913` — vaiAlleCategorie
- `13981` — _aggiornaPianoBox
- `14008` — _renderGiornoAttivo
- `14136` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 14184-14565

- `14184` — _attesoStrutturaPiano
- `14204` — _confrontaStrutturaPiano
- `14234` — _costruisciPromptDelta
- `14261` — _pianoToolSchema
- `14333` — _pianoMaxTokens
- `14342` — _estraiPianoDaRisposta
- `14364` — chiamaGeneraPiano
- `14534` — mostraLoadingSteps
- `14537` — render
- `14565` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 14632-14834

- `14632` — generaMessaggioAI
- `14721` — copiaMessaggioAI
- `14731` — salvaInStorico
- `14743` — salvaVarianteAI
- `14758` — renderVariantiSalvate
- `14777` — usaVariante
- `14795` — eliminaVariante
- `14806` — renderStoricoMsg
- `14822` — apriWhatsApp
- `14834` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 15012-16510

- `15012` — _ngColoreSemaforoNome
- `15020` — apriSceltaModalitaPiano
- `15055` — _ngChiudiModalita
- `15058` — _ngCostruisciGiornoVuoto
- `15091` — _ngCostruisciGiornoSpeciale
- `15102` — _ngIndiceInizioSpeciali
- `15113` — _ngModalitaNomeGiorno
- `15119` — _ngImpostaModalitaNomeGiorno
- `15122` — _ngLettera
- `15129` — _ngEtichettaGiorno
- `15149` — _ngEtichettaGiornoBreve
- `15163` — _ngToggleGiornoSpeciale
- `15187` — _ngRenderPannelloSpeciale
- `15255` — _generaGiornoSpecialeAI
- `15357` — _ngGiornoHaContenuto
- `15369` — _ngCreaPianoManuale
- `15392` — _ngScrollTabGiorni
- `15402` — _ngAbilitaDragScroll
- `15439` — _ngCambiaNumeroGiorni
- `15471` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `15485` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `15526` — _ngToggleCat
- `15535` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `15559` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `15715` — _ngSalvaPianoManuale
- `15741` — _ngParseIngrediente
- `15765` — _ngScomponiIngredienti
- `15777` — _ricCalcolaMacroDaIngredienti
- `15795` — _ricRicalcolaMacroLive
- `15802` — _ricAggiornaInfoMacro
- `15816` — _ricRicalcolaMacroLiveNow
- `15840` — _ngTrovaCategoriaAlimento
- `15873` — _ngPescaRicetta
- `15915` — _ngScomponiRicettaNelPasto
- `15952` — _ngDragStart
- `15963` — _ngDragStartCella
- `15974` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `15981` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `15986` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `16005` — _ngAggiungiAlimento
- `16030` — _ngRimuoviAlimento
- `16044` — _ngDopoModifica
- `16062` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `16115` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `16144` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `16161` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `16169` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `16241` — gramTestoCasalingo
- `16267` — _appendToggleNutrizionali
- `16310` — _appendTogglePromemoria
- `16339` — _appendBtnConcetti
- `16353` — _refreshBtnConcetti
- `16485` — cpFromEmoji
- `16491` — getEmojiCp
- `16510` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `15057` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `15079` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `15084` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `15110` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `15198` — _spesaTestoWhatsApp
- `15214` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `15259` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `15282` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `15310` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `15370` — scaricaListaSpesaPDF (download diretto, un click)
- `15378` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `15390` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 16520-17544

- `16520` — fetchEmojiB64
- `16538` — _generaPDFSync
- `16623` — loadEmojiSync
- `16629` — drawEmoji
- `16640` — safe
- `16651` — setFont
- `16657` — measure
- `16663` — gramText
- `16672` — pastoOf
- `16681` — macroDelPasto
- `16726` — kcalDelPasto
- `16730` — macroDelGiorno
- `16748` — kcalDelGiorno
- `16751` — formatValori
- `16761` — drawCopertina
- `16805` — measurePasto
- `16854` — groupCelleByOrdine
- `16864` — cellHeight
- `16873` — drawDayHeader
- `16888` — drawPasto
- `16927` — stripEmojiPDF
- `17060` — drawCella
- `17376` — collectCp
- `17382` — getEmojiCpStandalone
- `17544` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 17554-17721

- `17554` — salvaInbody
- `17578` — delInbody
- `17585` — ascoltaProgresso
- `17603` — d
- `17604` — fD
- `17721` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 17749-18218

- `17749` — buildSemLegenda
- `17763` — renderAlEditor
- `17824` — _alimNomeRegex
- `17832` — _alimGiorniDaPiano
- `17840` — _scanGiorniPerNome
- `17855` — scanRiferimentiAlimento
- `17884` — _alimRefsRighe
- `17890` — rinominaAlimentoCustom
- `17907` — _renameInGiorni
- `17926` — _renameInPianoRecord
- `17978` — modificaAlimentoCustom
- `17998` — ripristinaValoriPrecedentiAlimento
- `18010` — _resetAlimModal
- `18021` — apriNuovoAlimentoCustom
- `18027` — salvaAlimentoCustom
- `18094` — eliminaAlimentoCustom
- `18125` — _alimFonteBadge
- `18130` — renderAlimentiPage
- `18133` — E
- `18200` — archiviaAlimentoCustom
- `18218` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 18245-18486

- `18245` — _bcSetStatus
- `18247` — apriScannerBarcode
- `18255` — chiudiScannerBarcode
- `18260` — _bcStopCamera
- `18268` — _bcModaleAperto
- `18270` — _bcAvviaCamera
- `18281` — _bcAvviaNativo
- `18301` — _bcAvviaZXing
- `18310` — _bcZXStart
- `18321` — _bcErroreCamera
- `18329` — cercaBarcodeManuale
- `18335` — _barcodeTrovato
- `18351` — cercaBarcodeOFF
- `18369` — _bcProdottoNonTrovato
- `18383` — _bcPrecompilaForm
- `18393` — num
- `18407` — togAl
- `18460` — selCatAl
- `18474` — selTuttiAl
- `18486` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 18500-18816

- `18500` — setCalView
- `18501` — calPrev
- `18502` — calNext
- `18503` — calToday
- `18505` — renderCal
- `18519` — renderCalMonth
- `18543` — renderCalWeek
- `18561` — renderCalDay
- `18577` — selGiorno
- `18591` — setDisp
- `18596` — openAddEvento
- `18609` — openAddEventoPaz
- `18615` — toggleEntrataCheck
- `18620` — salvaEvento
- `18643` — openEvDetail
- `18698` — delEvento
- `18706` — copyMsg
- `18713` — aggDateCal
- `18718` — syncInizio
- `18719` — syncControllo
- `18720` — aggiornaPrev
- `18737` — renderRic
- `18764` — openNuovaRic
- `18765` — editRic
- `18775` — salvaRic
- `18800` — delRic
- `18816` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 18901-18961

- `18901` — aggiungiEntrataPerPaziente
- `18918` — openNuovaEntrata
- `18932` — salvaEntrata
- `18953` — delEntrata
- `18961` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 18991-19345

- `18991` — aiSuggerisciRicetta
- `19036` — renderConcettiModal
- `19055` — apriConcettiModal
- `19082` — salvaConcettiAllegati
- `19100` — loadInbodyPDF
- `19182` — _vitdLabel
- `19186` — getIntegratori
- `19190` — getIntegraWant
- `19194` — setIntegratori
- `19211` — setIntegraWant
- `19222` — getPatologieChip
- `19223` — getAllergieChip
- `19224` — setPatologieChip
- `19225` — setAllergieChip
- `19226` — getPatologie
- `19227` — getAllergie
- `19228` — setPatologieFromStr
- `19235` — setAllergieFromStr
- `19248` — getSdvChip
- `19249` — getCspChip
- `19250` — setSdvChip
- `19251` — setCspChip
- `19252` — setSdvFromStr
- `19253` — setCspFromStr
- `19257` — getBudget
- `19258` — setBudget
- `19263` — renderCalAnno
- `19294` — comprimeImmagine
- `19316` — uploadImmagineConcetto
- `19335` — rimuoviImmagineConcetto
- `19345` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 19411-19515

- `19411` — entraSelConcetti
- `19412` — annullaSelConcetti
- `19413` — toggleConcettoSel
- `19418` — eliminaConcettiSelezionati
- `19437` — confermaEliminaConcetti
- `19452` — aiRiscriviConcetto
- `19466` — editConcetto
- `19484` — salvaConcetto
- `19495` — openNuovoConcetto
- `19515` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 19516-19679

- `19516` — saveAgendaPersonale
- `19517` — getAgendaTodo
- `19518` — saveAgendaTodo
- `19520` — pulisciAgendaVecchia
- `19524` — navigaAgenda
- `19533` — toggleFormAgenda
- `19534` — toggleFormTodo
- `19536` — salvaAgendaItem
- `19550` — salvaTodoItem
- `19562` — toggleAgendaFatto
- `19570` — toggleTodoFatto
- `19583` — _catCol
- `19585` — renderAgendaDx
- `19679` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 19805-20009

- `19805` — renderScadenzeAlert
- `19990` — segnaGestito
- `20009` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 20018-20089

- `20018` — ripristinaPaz
- `20024` — eliminaPaz
- `20067` — getDove
- `20071` — setDove
- `20089` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 20094-20533

- `20094` — getCredenzialiPersistenti
- `20107` — cancellaCredenzialiPersistenti
- `20112` — rinnovaSessioneConRefreshToken
- `20129` — getSessioneSalvata
- `20148` — salvaSessione
- `20158` — cancellaSessione
- `20162` — eseguiLogin
- `20209` — eseguiLogout
- `20231` — mostraApp
- `20236` — verificaSessioneEAvvia
- `20264` — assicuraTokenValido
- `20293` — _garantiscoSessionePerSync
- `20305` — avviaRinnovoTokenPeriodico
- `20309` — fermaRinnovoTokenPeriodico
- `20318` — _authReset
- `20323` — _authMostra
- `20326` — mostraLogin
- `20327` — mostraRegistrazione
- `20328` — mostraRecupero
- `20329` — mostraNuovaPassword
- `20332` — eseguiRegistrazione
- `20370` — eseguiRecuperoPassword
- `20399` — eseguiNuovaPassword
- `20433` — _parseHashParams
- `20440` — _pulisciHash
- `20444` — gestisciRitornoAuth
- `20533` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 20605-20862

- `20605` — apriPannelloRicette
- `20634` — chiudiPannelloRicette
- `20642` — applicaRicettaPasto
- `20678` — inizializzaP2
- `20690` — deepClone
- `20694` — applicaPatch
- `20728` — _aggiornaLabelSalvaPiano
- `20821` — getHint
- `20826` — validaInput
- `20847` — attacca
- `20854` — attaccaTutti
- `20862` — wireCatChips

---
