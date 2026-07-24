# NutriGest — INDEX.md

Mappa funzioni → righe di `index.html`, organizzata per area funzionale.
Numeri di riga riallineati automaticamente il 24 luglio 2026 (P116, richiesta analisi per il medico curante): 687 voci aggiornate + nuova sezione RICHIESTA ANALISI DEL SANGUE. Rigenerato per intero il 14 luglio 2026 sera (script Python su tutte le `function`/`async function` top-level, incluse le assegnazioni `window.X = function`), dopo l'unificazione pannello alimenti gara + Componi a mano col Generatore AI. Righe totali file: 23978.

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

- `2318` — _slugAlimento
- `2326` — _catalogoIndicizza
- `2330` — _catalogoDeindicizza
- `2337` — costruisciCatalogo
- `2360` — risolviAlimento

---

### MACROS PIANO — calcolo e badge macro reali vs target
Righe 2352-2601

- `2375` — getValoriCREA
- `2387` — getCurrentPaziente
- `2407` — getKcalWeekend
- `2464` — getMacrosRicettaComposta
- `2470` — calcolaMacrosPiano
- `2572` — renderBadgeMacrosReali
- `2582` — pctStr
- `2583` — color
- `2596` — row
- `2638` — renderBadgeMacrosReali_DOM

---

### ANALISI DEL SANGUE — parsing, indici clinici derivati, interpretazione
Righe 2849-3021

- `2886` — _parseAnalisiNum
- `2894` — calcolaIndice
- `3032` — interpretaAnalisi
- `3044` — _interpAnalisiHtml
- `3058` — mostraInfoRange

---

### CONCETTI EDUCATIVI — sync Supabase, migrazione
Righe 3158-3186

- `3201` — pushConcetiSupabase
- `3211` — pullConcetiSupabase
- `3225` — migraConcetti

---

### ALIMENTI — categorie funzionali/semaforo, chip UI, equivalenze porzioni
Righe 3371-3617

- `3410` — getCategoriaSemaforo
- `3427` — _getCategorieGruppo
- `3441` — calcolaGrammaturaEquivalente
- `3458` — criterioByCat
- `3469` — suggerisciGrEquivalente
- `3514` — arrotondaPorzioneDiscreta
- `3528` — getCategoriaFunzionale
- `3568` — catArr
- `3584` — _tagComuniTrova
- `3588` — getTagComuniChip
- `3591` — setTagComuniChip
- `3599` — setCatChips
- `3612` — getStagioniChip
- `3615` — setStagioniChip
- `3622` — getProfiloChip
- `3625` — setProfiloChip
- `3634` — wireChipGroup
- `3645` — wireAttrChipGroups
- `3656` — wireRadioChipGroup

---

### CONFIG / STORAGE LOCALE — cfg, localStorage db, util data/valuta
Righe 3645-3784

- `3684` — getCfg
- `3685` — saveCfgL
- `3686` — getUrl
- `3687` — saveLocal
- `3688` — loadLocal
- `3689` — uid
- `3690` — today
- `3691` — addDays
- `3692` — fData
- `3693` — fEur
- `3695` — getLastSyncText
- `3705` — getSyncColor
- `3713` — aggiornaStatoSync
- `3739` — setSyncStatus
- `4004` — _registraTombstone
- `4012` — _tombstoneAttivi
- `4024` — _fondiTombstones
- `4038` — _mergeTombstonesRemoti *(dal 24/7 legge il meta da `collections`, P74 1d)*
- `4050` — _applicaTombstones
- `3911` — _pazFetchMeta *(P74 1d — solo `collections`)*
- `3932` — _collectionsUpsert *(P74 — scrittura primaria dei 4 meta-record dal cutover 1d)*
- `3954` — _collectionsFetch *(P74 1d — lettura unica dei meta-record)*
- `3977` — _analisiSangueUpsert *(P74 fase 2 — scrittura ombra analisi del sangue, 24/7)*

---

### SYNC SUPABASE — push/pull ricette/pazienti, tombstones, conflitti (P69)
Righe 3806-4182

- `4074` — supaHeaders
- `4088` — pushRicetteSupabase
- `4113` — pullRicetteSupabase
- `4135` — delRicetteSupabase
- `4147` — delPazienteSupabase
- `4162` — pushToSheets
- `4206` — pullFromSheets
- `4285` — syncNow
- `4298` — sincronizzaTutto
- `4324` — stpSet
- `4329` — stpMsg
- `4429` — testConnSupabase
- `4459` — _p68LogSaveAnonimo

---

### SYNC SUPABASE — save paziente, piani/cache piano, entrate, eventi
Righe 4196-4712

- `4473` — save
- `4491` — _pushRigaPerId
- `4524` — _flushDirtyIds
- `4607` — _p69LoadBaseline
- `4610` — _p69StoreBaseline
- `4613` — _p69SetBaseline
- `4617` — _p69DropBaseline
- `4621` — _p69SetBaselineFromRows
- `4627` — _p69NomePaz
- `4632` — _p69InList
- `4640` — _p69RilevaConflitti
- `4676` — _p69DialogoConflitti
- `4702` — chiudi
- `4710` — _p69RisolviRicarica
- `4739` — _p69EsportaLocali
- `4752` — _p69RisolviSovrascrivi
- `4765` — pushPianoSupabase
- `4787` — pullPianiSupabase
- `4803` — delPianoSupabase
- `4819` — delPianiPazienteSupabase
- `4831` — pushCachePianoSupabase
- `4848` — caricaCachePianoSupabase
- `4870` — pushEntrateSupabase
- `4894` — pullEntrateSupabase
- `4908` — delEntrataSupabase
- `4916` — pushEntrataSupabase
- `4927` — pushEventoSupabase
- `4940` — pushEventiSupabase
- `4964` — pullEventiSupabase
- `4978` — delEventoSupabase
- `4989` — _pianoCacheKey

---

### UI GENERALE — config AI key, notifiche, navigazione (goTo/tab/modali)
Righe 4739-4862

- `5016` — _salvaPianoCache
- `5021` — _caricaPianoCache
- `5027` — salvaCfg
- `5028` — testConn
- `5035` — testaAntKey
- `5046` — initAntCard
- `5049` — esporta
- `5050` — importa
- `5055` — goTo
- `5072` — closeM
- `5080` — ngChiudiModale
- `5089` — ngChiudiPopupCoppia
- `5093` — ngAggiungiX
- `5104` — ngUpgradeModali
- `5124` — mTab
- `5125` — aggiornaEta
- `5126` — toggleOrarioNote
- `5127` — pdTab
- `5128` — notif

---

### PAZIENTI — registro: lista/card/kanban, apertura, editing, salvataggio, routine
Righe 4870-6107

- `5136` — getPazView
- `5137` — setPazView
- `5146` — _pazStatoPiano
- `5154` — _pazUrgenzaControllo
- `5161` — _pazStatoTagHtml
- `5170` — _pazAggiornaFiltroRegimi
- `5178` — renderPaz
- `5231` — _renderPazCard
- `5256` — _renderPazLista
- `5283` — _renderPazKanban
- `5321` — openNuovoPaz
- `5347` — editPaz
- `5410` — applicaRegoloSemaforo
- `5921` — trovaChiaveAlimento
- `5930` — salvaPaz
- `5988` — openPaz
- `6672` — renderPdRoutine
- `6687` — cardHTML
- `6814` — updateRoutineCampo
- `6822` — suggerisciPastoEQuando
- `6849` — filtroLibreria
- `6858` — renderLibreriaGrid
- `6879` — aggiungiDaLibreriaIdx
- `6903` — openModalRoutine
- `6910` — salvaRoutineVoce
- `6935` — salvaRoutine
- `6942` — mostraRoutinePopup
- `6970` — removeRoutineVoce
- `6985` — _renderAggiustamentiSection

---

### 📈 PERCORSO — timeline di periodizzazione (P115 Tappe 1-5 COMPLETE, 24 lug 2026)
Righe 6021-6621 (numeri ESATTI al 24/7 notte, dopo la Tappa 5). ⚠️ Questo blocco (~600 righe) fa slittare tutti i numeri delle sezioni SUCCESSIVE a riga ~6020 rispetto all'ultima rigenerazione completa: per quelle sezioni fare grep di conferma. Rigenerazione completa alla prossima modifica strutturale.

- `6032` — _PERCORSO_TIPI (const: tipi fase, colori, pct default)
- `6039` — _percorsoGet *(normalizza p.percorso, scarta fasi invalide)*
- `6050` — _percorsoIsoLocal *(data → YYYY-MM-DD LOCALE, mai toISOString/UTC)*
- `6056` — _percorsoIntervalli *(fasi consecutive → date concrete dal/al)*
- `6070` — _percorsoFaseAt *(fase attiva a una data; dal incluso, al escluso)*
- `6079` — _percorsoKcalFase *(pct → kcal indicative via calcolaTDEE)*
- `6102` — _percorsoProiezione *(Tappa 2 — proiezione ibrida teorica/calibrata, cono, obiettivo a intervallo)*
- `6160` — _percorsoDataBreve *(ISO → "12 set")*
- `6177` — _percorsoSerieEnergia *(Tappa 3 — serie introito/TDEE stimato/TDEE osservato per la corsia energia)*
- `6216` — _percorsoSerieMassaMagra *(Tappa 4 — solo InBody: punti {data,m,pg})*
- `6235` — _percorsoConsuntivo *(Tappa 5 — legge p.consuntivo scritto da P50: aderenza, extra kcal, ritardo=extra÷7700, settimane perse; oggi sempre ok:false)*
- `6277` — _PERCORSO_LAYERS_DEFAULT / _percorsoLayersState / _percorsoLayersGet *(Tappa 4 — stato interruttori, SOLO sessione, mai su p)*
- `6282` — percorsoLayerToggle *(Tappa 4 — inverte un solo strato)*
- `6288` — percorsoVistaPreset *(Tappa 4 — preset "tecnica"/"paziente")*
- `6296` — _percorsoPaz *(e a seguire i mutatori percorsoInit/SetInizio/AddFase/UpdFase/DelFase/MoveFase)*
- `6338` — _percorsoChartSvg *(due corsie: peso + massa magra + cono proiezione sopra, striscia aderenza in mezzo (solo con dati P50), energia (kcal) sotto — tutto gated dagli interruttori)*
- `6527` — renderPdPercorso *(scheda: badge fase, riga proiezione/obiettivo, riga Piano vs Realtà (solo con dati), toolbar interruttori, grafico, editor)*

*(Tappa 2 tocca anche `calcolaMacros`: box obiettivo con intervallo al posto della data secca.)*

---

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 6192-6896

- `7070` — salvaAggiustamento
- `7103` — eliminaAggiustamento
- `7112` — renderPdNote
- `7147` — salvaNotaClinica
- `7162` — deleteNota
- `7171` — saveNote
- `7686` — _applicaRegoloSemaforoLEGACY
- `7727` — resetSemaforoAuto
- `7774` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 7034-7234

- `7921` — avviaFX
- `7949` — avviaAnalisi
- `7966` — _renderFlussoPanel
- `8010` — _riepEsc
- `8014` — _riepNum
- `8020` — _riepDelta
- `8028` — _riepDataSig
- `8046` — _riepParseFX
- `8051` — clean
- `8060` — _riepAggiornaFX
- `8086` — _riepToggleDomandaDefault
- `8098` — _riepAddDomanda
- `8111` — _riepRemoveDomanda
- `8119` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 7297-7675

- `8182` — dCol
- `8300` — card
- `8331` — renderPdRagionamento
- `8419` — inviaMessaggioRag
- `8437` — concludiERiassumi
- `8451` — salvaRagionamento
- `8472` — apriGeneratoreDaRag
- `8480` — nuovaSessioneRag
- `8486` — cancellaSavedRag
- `8496` — renderPazTimeline
- `8528` — renderPdAnamnesi
- `8557` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 7719-8198

- `9158` — renderPdAnalisi
- `9202` — toggleAnalisiSection
- `9212` — loadAnalisiSanguePDF
- `9286` — mostraDiffAnalisi
- `9359` — _calcoloIncluso
- `9365` — toggleCalcoloIncluso
- `9387` — _renderCalcoliPannello
- `9423` — toggleGlossario
- `9428` — updateAnalisi
- `9481` — salvaAnalisi
- `9494` — applicaGruppoClinico
- `9523` — renderBoxGruppiCliniciSuggeriti
- `9555` — suggerisciGruppiClinici
- `9635` — renderMemoriaInbody

---

### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9141 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `8683` — _richVal
- `8690` — _richBmi
- `8695` — _richPat
- `8701` — _richNum
- `8746` — _richPreselezione
- `8762` — richLeggiIntestazione
- `8766` — richSalvaIntestazione
- `8775` — apriRichiestaAnalisi
- `8795` — _richModaleHtml
- `8873` — _richEsc
- `8875` — _richMotivoCambia
- `8881` — _richToggleSez
- `8887` — _richAggiornaConteggi
- `8895` — _richMotivoCorrente
- `8905` — _richSelezione
- `8920` — _richTxt
- `8926` — _richCostruisciPDF
- `8935` — nuovaPagina
- `8936` — spazio
- `9026` — _richNomeFile
- `9031` — _richPrepara
- `9041` — _richRegistra
- `9055` — _richStato
- `9057` — richScaricaPDF
- `9067` — richCondividiPDF
- `9089` — _richUpload
- `9104` — _richWaUrl
- `9115` — richInviaWhatsApp
- `9141` — _richStoricoHtml
---

### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 8246-8452

- `9683` — _ibFmtBreve
- `9692` — _renderPesiIntermediSection
- `9741` — aggiungiPesoIntermedio
- `9757` — eliminaPesoIntermedio
- `9767` — _ibSilhouetteSegmentale
- `9787` — pct
- `9793` — colMagra
- `9799` — colGrassa
- `9807` — colTroncoGrassa
- `10094` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 8724-8724

- `10366` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 9056-9607

- `10738` — aggiornaLabelMacros
- `10756` — calcolaMacros
- `10897` — applicaSchema
- `10905` — _renderRifPesoBox
- `10953` — _usaRifPeso
- `10957` — _aggiornaRifPesoTarget
- `10960` — _aggiornaRegimeSlider
- `11617` — _presetRegime
- `11621` — _initRegimeSliderDaPaziente
- `11639` — ricalcolaLAF
- `11781` — renderStoricoTDEE
- `11815` — attivaSlotTDEE
- `11823` — eliminaSlotTDEE
- `11836` — _toggleCiclizzazione
- `11842` — _aggiornaAnteprimaCiclizzazione
- `11860` — salvaCalcoloMacros
- `11974` — _metAllenamento
- `11990` — _neatFrazione
- `12064` — _larnLafStileVita
- `12081` — _regimeOffset
- `12091` — _componiRegimeText
- `12124` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `12136` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `12143` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `12213` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 9625-10055

- `12231` — renderTargetBadge
- `12260` — verificaRegola_75_20_5
- `12297` — renderBadge75_20_5
- `12362` — _validaNorm
- `12365` — _validaMatchTermine
- `12373` — _validaCostruisciListe
- `12377` — addA
- `12378` — addR
- `12379` — addE
- `12424` — _validaTesto
- `12445` — validaPiano
- `12519` — _validaFirmaBlocchi
- `12526` — renderBadgeValidatore
- `12557` — _validaVaiAlGiorno
- `12566` — apriPannelloValidatore
- `12573` — esc
- `12623` — _validaEseguiOverride
- `12646` — validaGateExport
- `12661` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 10065-10811

- `12671` — abbr
- `12676` — isSab
- `12678` — buildVistaA
- `12682` — righeCategoria
- `12734` — buildVistaB
- `12740` — barColor
- `12745` — barW
- `12753` — barRow
- `12774` — getTabContent
- `12778` — tabBtn
- `12794` — pianoPazSelezionato
- `12941` — renderPianoConPillTabs
- `12947` — _renderGiornoGen
- `12991` — _dc
- `12992` — _dd
- `12999` — rowG
- `13179` — renderPanelMacrosGiorno
- `13322` — pmgCambiaGrammi
- `13346` — riapriPiano
- `13384` — _montaPianoCorrente
- `13423` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 10821-11290

- `13433` — pullTemplateSupabase
- `13444` — delTemplateSupabase
- `13453` — _promptTemplateNome
- `13478` — _creaTemplateDaJSON
- `13501` — salvaComeTemplate
- `13512` — salvaComeTemplateDaPiano
- `13521` — _normNomeAlim
- `13522` — _escRegAlim
- `13523` — _raccogliAlimentiDaPiano
- `13534` — _alimentiEsclusiPaziente
- `13546` — _trovaConflittiTemplate
- `13564` — _mostraAvvisoConflitti
- `13588` — applicaTemplate
- `13606` — apriPickerTemplate
- `13634` — _pickPaziente
- `13653` — applicaTemplatePick
- `13657` — rinominaTemplate
- `13668` — eliminaTemplate
- `13678` — renderLibreriaTemplate
- `13707` — renderStoricoPiani
- `13766` — eliminaPiano
- `13782` — _getActiveMacrosTarget
- `13806` — getTargetAttivi
- `13843` — calcolaTargetsCiclizzazione
- `13869` — _setupPianoTargets
- `13893` — getStagioneCorrente
- `13902` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 11366-11599

- `13983` — _ricSlots
- `14262` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 11608-12076

- `14271` — aggiornaUIcolazione
- `14281` — salvaRegolePiano
- `14342` — _isModelloSistema
- `14345` — _isModelloSistemaModificato
- `14357` — caricaModelliCustomLocal
- `14371` — salvaModelliCustomLocal
- `14392` — _migraRecordCustom
- `14407` — _syncAliasLegacy
- `14416` — caricaAlimentiCustom
- `14440` — pushAlimentiCustomSupabase
- `14450` — pullAlimentiCustomSupabase
- `14464` — pushModelliSupabase
- `14482` — pullModelliSupabase
- `14507` — _calcolaFreqDaModello
- `14526` — aggiornaUImodello
- `14615` — popolaDropdownModelli
- `14643` — cambiaModelloRotazione
- `14649` — ripristinaModelloOriginale
- `14672` — eliminaModelloCustom
- `14690` — mostraAnteprimaModello
- `14700` — apriEditorModello
- `14730` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 12111-12625

- `14765` — rerender
- `14999` — _salvaModelloDaEditor
- `15041` — caricaRegolePiano
- `15071` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `15106` — _aiLogUsage
- `15128` — _aiProxyUrl
- `15134` — _aiTokenPerProxy
- `15163` — aiCall
- `15171` — fetchConTimeout
- `15187` — unTentativo
- `15237` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 12631-12838

- `15243` — _risolviCollisioniCelle
- `15310` — espandiPiano
- `15314` — al2
- `15315` — espPasto
- `15370` — getFruttaStile
- `15377` — _fruttaGetPasto
- `15387` — _fruttaContaRigheRicetta
- `15391` — _fruttaIndiceBasePasto
- `15411` — getFruttaMarker
- `15424` — fruttaMarkerHtml
- `15432` — _fruttaCheckboxHtml
- `15441` — toggleFrutta
- `15450` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 12874-14136

- `15486` — _renderCelleGriglia
- `15563` — _renderRicetteTestuali
- `15602` — scambiaRicette
- `15613` — _ricDragTrovaRigaSotto
- `15619` — _ricDragPulisciEvidenza
- `15622` — _onPointerMove
- `15638` — _onPointerUp
- `15673` — _renderCelleHtml
- `15681` — toggleCellaMenu
- `15700` — closeAllCellaMenus
- `15708` — _trovaPasto
- `15716` — cellaSposta
- `15770` — cellaCancella
- `15791` — apriEditGrammatura
- `15816` — salva
- `15846` — cellaSwap
- `15863` — cellaRimuoviAlt
- `15877` — cellaAggiungiAlt
- `15972` — _mostraPopupAggiungiAlt
- `15995` — renderLista
- `16058` — apriEditRicetta
- `16067` — aggiungiRicetta
- `16083` — rimuoviRicetta
- `16092` — _mostraPopupEditRicetta
- `16139` — renderListaRicette
- `16168` — renderRicettario
- `16171` — renderParziali
- `16175` — salvaRicetta
- `16254` — ngAggiungiSpuntinoVuoto
- `16270` — apriAggiungiCella
- `16281` — risolviCompatibili
- `16361` — _apriPopupRicettaComposta
- `16403` — aggiornaMacros
- `16453` — _mostraPopupSceltaCategoriaAlimento
- `16526` — vaiAlleCategorie
- `16594` — _aggiornaPianoBox
- `16621` — _renderGiornoAttivo
- `16749` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 14184-14565

- `16797` — _attesoStrutturaPiano
- `16817` — _confrontaStrutturaPiano
- `16847` — _costruisciPromptDelta
- `16874` — _pianoToolSchema
- `16949` — _pianoMaxTokens
- `16958` — _estraiPianoDaRisposta
- `16980` — chiamaGeneraPiano
- `17147` — mostraLoadingSteps
- `17150` — render
- `17178` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 14632-14834

- `17245` — generaMessaggioAI
- `17333` — copiaMessaggioAI
- `17343` — salvaInStorico
- `17355` — salvaVarianteAI
- `17370` — renderVariantiSalvate
- `17389` — usaVariante
- `17407` — eliminaVariante
- `17418` — renderStoricoMsg
- `17434` — apriWhatsApp
- `17802` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 15012-16510

- `17980` — _ngColoreSemaforoNome
- `17988` — apriSceltaModalitaPiano
- `18023` — _ngChiudiModalita
- `18026` — _ngCostruisciGiornoVuoto
- `18059` — _ngCostruisciGiornoSpeciale
- `18070` — _ngIndiceInizioSpeciali
- `18081` — _ngModalitaNomeGiorno
- `18087` — _ngImpostaModalitaNomeGiorno
- `18090` — _ngLettera
- `18097` — _ngEtichettaGiorno
- `18117` — _ngEtichettaGiornoBreve
- `18131` — _ngToggleGiornoSpeciale
- `18155` — _ngRenderPannelloSpeciale
- `18223` — _generaGiornoSpecialeAI
- `18323` — _ngGiornoHaContenuto
- `18335` — _ngCreaPianoManuale
- `18358` — _ngScrollTabGiorni
- `18368` — _ngAbilitaDragScroll
- `18405` — _ngCambiaNumeroGiorni
- `18437` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `18451` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `18492` — _ngToggleCat
- `18501` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `18525` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `18681` — _ngSalvaPianoManuale
- `18707` — _ngParseIngrediente
- `18731` — _ngScomponiIngredienti
- `18743` — _ricCalcolaMacroDaIngredienti
- `18761` — _ricRicalcolaMacroLive
- `18768` — _ricAggiornaInfoMacro
- `18782` — _ricRicalcolaMacroLiveNow
- `18806` — _ngTrovaCategoriaAlimento
- `18839` — _ngPescaRicetta
- `18882` — _ngScomponiRicettaNelPasto
- `18919` — _ngDragStart
- `18930` — _ngDragStartCella
- `18941` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `18948` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `18953` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `18972` — _ngAggiungiAlimento
- `18997` — _ngRimuoviAlimento
- `19011` — _ngDopoModifica
- `19029` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `19082` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `19111` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `19128` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `19136` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `19208` — gramTestoCasalingo
- `19234` — _appendToggleNutrizionali
- `19277` — _appendTogglePromemoria
- `19306` — _appendBtnConcetti
- `19320` — _refreshBtnConcetti
- `19452` — cpFromEmoji
- `19458` — getEmojiCp
- `19477` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `15057` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `17474` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `17479` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `17505` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `17593` — _spesaTestoWhatsApp
- `17609` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `17654` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `17677` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `17705` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `17765` — scaricaListaSpesaPDF (download diretto, un click)
- `17773` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `17785` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 16520-17544

- `19487` — fetchEmojiB64
- `19505` — _generaPDFSync
- `19590` — loadEmojiSync
- `19596` — drawEmoji
- `19607` — safe
- `19618` — setFont
- `19624` — measure
- `19630` — gramText
- `19639` — pastoOf
- `19648` — macroDelPasto
- `19693` — kcalDelPasto
- `19697` — macroDelGiorno
- `19715` — kcalDelGiorno
- `19718` — formatValori
- `19728` — drawCopertina
- `19861` — measurePasto
- `19911` — groupCelleByOrdine
- `19921` — cellHeight
- `19930` — drawDayHeader
- `19945` — drawPasto
- `19985` — stripEmojiPDF
- `20118` — drawCella
- `20455` — collectCp
- `20461` — getEmojiCpStandalone
- `20625` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 17554-17721

- `20635` — salvaInbody
- `20659` — delInbody
- `20666` — ascoltaProgresso
- `20684` — d
- `20685` — fD
- `20801` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 17749-18218

- `20829` — buildSemLegenda
- `20843` — renderAlEditor
- `20904` — _alimNomeRegex
- `20912` — _alimGiorniDaPiano
- `20920` — _scanGiorniPerNome
- `20935` — scanRiferimentiAlimento
- `20964` — _alimRefsRighe
- `20970` — rinominaAlimentoCustom
- `20987` — _renameInGiorni
- `21006` — _renameInPianoRecord
- `21058` — modificaAlimentoCustom
- `21078` — ripristinaValoriPrecedentiAlimento
- `21090` — _resetAlimModal
- `21101` — apriNuovoAlimentoCustom
- `21107` — salvaAlimentoCustom
- `21174` — eliminaAlimentoCustom
- `21205` — _alimFonteBadge
- `21210` — renderAlimentiPage
- `21213` — E
- `21280` — archiviaAlimentoCustom
- `21298` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 18245-18486

- `21325` — _bcSetStatus
- `21327` — apriScannerBarcode
- `21335` — chiudiScannerBarcode
- `21340` — _bcStopCamera
- `21348` — _bcModaleAperto
- `21350` — _bcAvviaCamera
- `21361` — _bcAvviaNativo
- `21381` — _bcAvviaZXing
- `21390` — _bcZXStart
- `21401` — _bcErroreCamera
- `21409` — cercaBarcodeManuale
- `21415` — _barcodeTrovato
- `21431` — cercaBarcodeOFF
- `21449` — _bcProdottoNonTrovato
- `21463` — _bcPrecompilaForm
- `21473` — num
- `21487` — togAl
- `21540` — selCatAl
- `21554` — selTuttiAl
- `21566` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 18500-18816

- `21580` — setCalView
- `21581` — calPrev
- `21582` — calNext
- `21583` — calToday
- `21585` — renderCal
- `21599` — renderCalMonth
- `21623` — renderCalWeek
- `21641` — renderCalDay
- `21657` — selGiorno
- `21671` — setDisp
- `21676` — openAddEvento
- `21689` — openAddEventoPaz
- `21695` — toggleEntrataCheck
- `21700` — salvaEvento
- `21723` — openEvDetail
- `21778` — delEvento
- `21786` — copyMsg
- `21793` — aggDateCal
- `21798` — syncInizio
- `21799` — syncControllo
- `21800` — aggiornaPrev
- `21817` — renderRic
- `21844` — openNuovaRic
- `21845` — editRic
- `21855` — salvaRic
- `21880` — delRic
- `21896` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 18901-18961

- `21981` — aggiungiEntrataPerPaziente
- `21998` — openNuovaEntrata
- `22012` — salvaEntrata
- `22033` — delEntrata
- `22041` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 18991-19345

- `22071` — aiSuggerisciRicetta
- `22116` — renderConcettiModal
- `22135` — apriConcettiModal
- `22162` — salvaConcettiAllegati
- `22180` — loadInbodyPDF
- `22262` — _vitdLabel
- `22266` — getIntegratori
- `22270` — getIntegraWant
- `22274` — setIntegratori
- `22291` — setIntegraWant
- `22302` — getPatologieChip
- `22303` — getAllergieChip
- `22304` — setPatologieChip
- `22305` — setAllergieChip
- `22306` — getPatologie
- `22307` — getAllergie
- `22308` — setPatologieFromStr
- `22315` — setAllergieFromStr
- `22328` — getSdvChip
- `22329` — getCspChip
- `22330` — setSdvChip
- `22331` — setCspChip
- `22332` — setSdvFromStr
- `22333` — setCspFromStr
- `22337` — getBudget
- `22338` — setBudget
- `22343` — renderCalAnno
- `22374` — comprimeImmagine
- `22396` — uploadImmagineConcetto
- `22415` — rimuoviImmagineConcetto
- `22425` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 19411-19515

- `22491` — entraSelConcetti
- `22492` — annullaSelConcetti
- `22493` — toggleConcettoSel
- `22498` — eliminaConcettiSelezionati
- `22517` — confermaEliminaConcetti
- `22532` — aiRiscriviConcetto
- `22546` — editConcetto
- `22564` — salvaConcetto
- `22575` — openNuovoConcetto
- `22595` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 19516-19679

- `22596` — saveAgendaPersonale
- `22597` — getAgendaTodo
- `22598` — saveAgendaTodo
- `22600` — pulisciAgendaVecchia
- `22604` — navigaAgenda
- `22613` — toggleFormAgenda
- `22614` — toggleFormTodo
- `22616` — salvaAgendaItem
- `22630` — salvaTodoItem
- `22642` — toggleAgendaFatto
- `22650` — toggleTodoFatto
- `22663` — _catCol
- `22665` — renderAgendaDx
- `22759` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 19805-20009

- `22885` — renderScadenzeAlert
- `23070` — segnaGestito
- `23089` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 20018-20089

- `23098` — ripristinaPaz
- `23106` — eliminaPaz
- `23151` — getDove
- `23155` — setDove
- `23173` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 20094-20533

- `23178` — getCredenzialiPersistenti
- `23191` — cancellaCredenzialiPersistenti
- `23196` — rinnovaSessioneConRefreshToken
- `23213` — getSessioneSalvata
- `23232` — salvaSessione
- `23242` — cancellaSessione
- `23246` — eseguiLogin
- `23293` — eseguiLogout
- `23315` — mostraApp
- `23320` — verificaSessioneEAvvia
- `23348` — assicuraTokenValido
- `23377` — _garantiscoSessionePerSync
- `23389` — avviaRinnovoTokenPeriodico
- `23393` — fermaRinnovoTokenPeriodico
- `23402` — _authReset
- `23407` — _authMostra
- `23410` — mostraLogin
- `23411` — mostraRegistrazione
- `23412` — mostraRecupero
- `23413` — mostraNuovaPassword
- `23416` — eseguiRegistrazione
- `23454` — eseguiRecuperoPassword
- `23483` — eseguiNuovaPassword
- `23517` — _parseHashParams
- `23524` — _pulisciHash
- `23528` — gestisciRitornoAuth
- `23618` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 20605-20862

- `23690` — apriPannelloRicette
- `23719` — chiudiPannelloRicette
- `23727` — applicaRicettaPasto
- `23763` — inizializzaP2
- `23775` — deepClone
- `23779` — applicaPatch
- `23813` — _aggiornaLabelSalvaPiano
- `23906` — getHint
- `23911` — validaInput
- `23936` — attacca
- `23943` — attaccaTutti
- `23951` — wireCatChips

---
