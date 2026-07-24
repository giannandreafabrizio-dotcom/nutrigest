# NutriGest — INDEX.md

Mappa funzioni → righe di `index.html`, organizzata per area funzionale.
Numeri di riga riallineati automaticamente il 24 luglio 2026 (P116, richiesta analisi per il medico curante) + nuova sezione RICHIESTA ANALISI DEL SANGUE. Rigenerato per intero il 14 luglio 2026 sera (script Python su tutte le `function`/`async function` top-level, incluse le assegnazioni `window.X = function`), dopo l'unificazione pannello alimenti gara + Componi a mano col Generatore AI. Righe totali file: 23978.

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

- `9432` — renderPdAnalisi
- `9478` — toggleAnalisiSection
- `9488` — loadAnalisiSanguePDF
- `9569` — mostraDiffAnalisi
- `9662` — _calcoloIncluso
- `9668` — toggleCalcoloIncluso
- `9690` — _renderCalcoliPannello
- `9726` — toggleGlossario
- `9731` — updateAnalisi
- `9790` — salvaAnalisi
- `9803` — applicaGruppoClinico
- `9832` — renderBoxGruppiCliniciSuggeriti
- `9864` — suggerisciGruppiClinici
- `9944` — renderMemoriaInbody

---
### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9176 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `8683` — _richVal
- `8690` — _richBmi
- `8695` — _richPat
- `8701` — _richNum
- `8746` — _richPreselezione
- `8762` — richLeggiIntestazione
- `8766` — richSalvaIntestazione
- `8775` — apriRichiestaAnalisi
- `8795` — _richModaleHtml
- `8871` — _richEsc
- `8873` — _richMotivoCambia
- `8879` — _richToggleSez
- `8885` — _richAggiornaConteggi
- `8893` — _richMotivoCorrente
- `8903` — _richSelezione
- `8918` — _richTxt
- `8924` — _richCostruisciPDF
- `8933` — nuovaPagina
- `8934` — spazio
- `9020` — _richNomeFile
- `9025` — _richPrepara
- `9035` — _richRegistra
- `9049` — _richStato
- `9051` — richScaricaPDF
- `9066` — _richUpload
- `9094` — _richWaUrl
- `9101` — _richTestoWa
- `9115` — richInviaWhatsApp
- `9155` — richCopiaLink
- `9176` — _richStoricoHtml

---
### REFERTI DEL SANGUE DATATI — storico nel tempo (P118 tappa 1)
Righe 9194-9387 — migrazione, ordinamento, quadro attuale derivato, barra di selezione.

- `9217` — _refertoNuovoId
- `9220` — _refertoOggi
- `9224` — _refertoDataIt
- `9230` — _refertoConteggio
- `9244` — _refertiMigra
- `9271` — _refertiOrdinati
- `9282` — _refertoPiuRecente
- `9287` — _refertoInVista
- `9305` — _refertiApplica
- `9318` — _refertoCrea
- `9337` — refertoCambiaVista
- `9343` — refertoCambiaData
- `9355` — refertoNuovo
- `9363` — refertoDuplica
- `9372` — refertoElimina
- `9387` — _refertiBarraHtml

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 8246-8452

- `9992` — _ibFmtBreve
- `10001` — _renderPesiIntermediSection
- `10050` — aggiungiPesoIntermedio
- `10066` — eliminaPesoIntermedio
- `10076` — _ibSilhouetteSegmentale
- `10096` — pct
- `10102` — colMagra
- `10108` — colGrassa
- `10116` — colTroncoGrassa
- `10403` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 8724-8724

- `10675` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 9056-9607

- `11047` — aggiornaLabelMacros
- `11065` — calcolaMacros
- `11206` — applicaSchema
- `11214` — _renderRifPesoBox
- `11262` — _usaRifPeso
- `11266` — _aggiornaRifPesoTarget
- `11269` — _aggiornaRegimeSlider
- `11926` — _presetRegime
- `11930` — _initRegimeSliderDaPaziente
- `11948` — ricalcolaLAF
- `12090` — renderStoricoTDEE
- `12124` — attivaSlotTDEE
- `12132` — eliminaSlotTDEE
- `12145` — _toggleCiclizzazione
- `12151` — _aggiornaAnteprimaCiclizzazione
- `12169` — salvaCalcoloMacros
- `12283` — _metAllenamento
- `12299` — _neatFrazione
- `12373` — _larnLafStileVita
- `12390` — _regimeOffset
- `12400` — _componiRegimeText
- `12433` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `12445` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `12452` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `12522` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 9625-10055

- `12540` — renderTargetBadge
- `12569` — verificaRegola_75_20_5
- `12606` — renderBadge75_20_5
- `12671` — _validaNorm
- `12674` — _validaMatchTermine
- `12682` — _validaCostruisciListe
- `12686` — addA
- `12687` — addR
- `12688` — addE
- `12733` — _validaTesto
- `12754` — validaPiano
- `12828` — _validaFirmaBlocchi
- `12835` — renderBadgeValidatore
- `12866` — _validaVaiAlGiorno
- `12875` — apriPannelloValidatore
- `12882` — esc
- `12932` — _validaEseguiOverride
- `12955` — validaGateExport
- `12970` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 10065-10811

- `12980` — abbr
- `12985` — isSab
- `12987` — buildVistaA
- `12991` — righeCategoria
- `13043` — buildVistaB
- `13049` — barColor
- `13054` — barW
- `13062` — barRow
- `13083` — getTabContent
- `13087` — tabBtn
- `13103` — pianoPazSelezionato
- `13250` — renderPianoConPillTabs
- `13256` — _renderGiornoGen
- `13300` — _dc
- `13301` — _dd
- `13308` — rowG
- `13488` — renderPanelMacrosGiorno
- `13631` — pmgCambiaGrammi
- `13655` — riapriPiano
- `13693` — _montaPianoCorrente
- `13732` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 10821-11290

- `13742` — pullTemplateSupabase
- `13753` — delTemplateSupabase
- `13762` — _promptTemplateNome
- `13787` — _creaTemplateDaJSON
- `13810` — salvaComeTemplate
- `13821` — salvaComeTemplateDaPiano
- `13830` — _normNomeAlim
- `13831` — _escRegAlim
- `13832` — _raccogliAlimentiDaPiano
- `13843` — _alimentiEsclusiPaziente
- `13855` — _trovaConflittiTemplate
- `13873` — _mostraAvvisoConflitti
- `13897` — applicaTemplate
- `13915` — apriPickerTemplate
- `13943` — _pickPaziente
- `13962` — applicaTemplatePick
- `13966` — rinominaTemplate
- `13977` — eliminaTemplate
- `13987` — renderLibreriaTemplate
- `14016` — renderStoricoPiani
- `14075` — eliminaPiano
- `14091` — _getActiveMacrosTarget
- `14115` — getTargetAttivi
- `14152` — calcolaTargetsCiclizzazione
- `14178` — _setupPianoTargets
- `14202` — getStagioneCorrente
- `14211` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 11366-11599

- `14292` — _ricSlots
- `14571` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 11608-12076

- `14580` — aggiornaUIcolazione
- `14590` — salvaRegolePiano
- `14651` — _isModelloSistema
- `14654` — _isModelloSistemaModificato
- `14666` — caricaModelliCustomLocal
- `14680` — salvaModelliCustomLocal
- `14701` — _migraRecordCustom
- `14716` — _syncAliasLegacy
- `14725` — caricaAlimentiCustom
- `14749` — pushAlimentiCustomSupabase
- `14759` — pullAlimentiCustomSupabase
- `14773` — pushModelliSupabase
- `14791` — pullModelliSupabase
- `14816` — _calcolaFreqDaModello
- `14835` — aggiornaUImodello
- `14924` — popolaDropdownModelli
- `14952` — cambiaModelloRotazione
- `14958` — ripristinaModelloOriginale
- `14981` — eliminaModelloCustom
- `14999` — mostraAnteprimaModello
- `15009` — apriEditorModello
- `15039` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 12111-12625

- `15074` — rerender
- `15308` — _salvaModelloDaEditor
- `15350` — caricaRegolePiano
- `15380` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `15415` — _aiLogUsage
- `15437` — _aiProxyUrl
- `15443` — _aiTokenPerProxy
- `15472` — aiCall
- `15480` — fetchConTimeout
- `15496` — unTentativo
- `15546` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 12631-12838

- `15552` — _risolviCollisioniCelle
- `15619` — espandiPiano
- `15623` — al2
- `15624` — espPasto
- `15679` — getFruttaStile
- `15686` — _fruttaGetPasto
- `15696` — _fruttaContaRigheRicetta
- `15700` — _fruttaIndiceBasePasto
- `15720` — getFruttaMarker
- `15733` — fruttaMarkerHtml
- `15741` — _fruttaCheckboxHtml
- `15750` — toggleFrutta
- `15759` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 12874-14136

- `15795` — _renderCelleGriglia
- `15872` — _renderRicetteTestuali
- `15911` — scambiaRicette
- `15922` — _ricDragTrovaRigaSotto
- `15928` — _ricDragPulisciEvidenza
- `15931` — _onPointerMove
- `15947` — _onPointerUp
- `15982` — _renderCelleHtml
- `15990` — toggleCellaMenu
- `16009` — closeAllCellaMenus
- `16017` — _trovaPasto
- `16025` — cellaSposta
- `16079` — cellaCancella
- `16100` — apriEditGrammatura
- `16125` — salva
- `16155` — cellaSwap
- `16172` — cellaRimuoviAlt
- `16186` — cellaAggiungiAlt
- `16281` — _mostraPopupAggiungiAlt
- `16304` — renderLista
- `16367` — apriEditRicetta
- `16376` — aggiungiRicetta
- `16392` — rimuoviRicetta
- `16401` — _mostraPopupEditRicetta
- `16448` — renderListaRicette
- `16477` — renderRicettario
- `16480` — renderParziali
- `16484` — salvaRicetta
- `16563` — ngAggiungiSpuntinoVuoto
- `16579` — apriAggiungiCella
- `16590` — risolviCompatibili
- `16670` — _apriPopupRicettaComposta
- `16712` — aggiornaMacros
- `16762` — _mostraPopupSceltaCategoriaAlimento
- `16835` — vaiAlleCategorie
- `16903` — _aggiornaPianoBox
- `16930` — _renderGiornoAttivo
- `17058` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 14184-14565

- `17106` — _attesoStrutturaPiano
- `17126` — _confrontaStrutturaPiano
- `17156` — _costruisciPromptDelta
- `17183` — _pianoToolSchema
- `17258` — _pianoMaxTokens
- `17267` — _estraiPianoDaRisposta
- `17289` — chiamaGeneraPiano
- `17456` — mostraLoadingSteps
- `17459` — render
- `17487` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 14632-14834

- `17554` — generaMessaggioAI
- `17642` — copiaMessaggioAI
- `17652` — salvaInStorico
- `17664` — salvaVarianteAI
- `17679` — renderVariantiSalvate
- `17698` — usaVariante
- `17716` — eliminaVariante
- `17727` — renderStoricoMsg
- `17743` — apriWhatsApp
- `18111` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 15012-16510

- `18289` — _ngColoreSemaforoNome
- `18297` — apriSceltaModalitaPiano
- `18332` — _ngChiudiModalita
- `18335` — _ngCostruisciGiornoVuoto
- `18368` — _ngCostruisciGiornoSpeciale
- `18379` — _ngIndiceInizioSpeciali
- `18390` — _ngModalitaNomeGiorno
- `18396` — _ngImpostaModalitaNomeGiorno
- `18399` — _ngLettera
- `18406` — _ngEtichettaGiorno
- `18426` — _ngEtichettaGiornoBreve
- `18440` — _ngToggleGiornoSpeciale
- `18464` — _ngRenderPannelloSpeciale
- `18532` — _generaGiornoSpecialeAI
- `18632` — _ngGiornoHaContenuto
- `18644` — _ngCreaPianoManuale
- `18667` — _ngScrollTabGiorni
- `18677` — _ngAbilitaDragScroll
- `18714` — _ngCambiaNumeroGiorni
- `18746` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `18760` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `18801` — _ngToggleCat
- `18810` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `18834` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `18990` — _ngSalvaPianoManuale
- `19016` — _ngParseIngrediente
- `19040` — _ngScomponiIngredienti
- `19052` — _ricCalcolaMacroDaIngredienti
- `19070` — _ricRicalcolaMacroLive
- `19077` — _ricAggiornaInfoMacro
- `19091` — _ricRicalcolaMacroLiveNow
- `19115` — _ngTrovaCategoriaAlimento
- `19148` — _ngPescaRicetta
- `19191` — _ngScomponiRicettaNelPasto
- `19228` — _ngDragStart
- `19239` — _ngDragStartCella
- `19250` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `19257` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `19262` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `19281` — _ngAggiungiAlimento
- `19306` — _ngRimuoviAlimento
- `19320` — _ngDopoModifica
- `19338` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `19391` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `19420` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `19437` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `19445` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `19517` — gramTestoCasalingo
- `19543` — _appendToggleNutrizionali
- `19586` — _appendTogglePromemoria
- `19615` — _appendBtnConcetti
- `19629` — _refreshBtnConcetti
- `19761` — cpFromEmoji
- `19767` — getEmojiCp
- `19786` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `15057` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `17783` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `17788` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `17814` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `17902` — _spesaTestoWhatsApp
- `17918` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `17963` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `17986` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `18014` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `18074` — scaricaListaSpesaPDF (download diretto, un click)
- `18082` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `18094` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 16520-17544

- `19796` — fetchEmojiB64
- `19814` — _generaPDFSync
- `19899` — loadEmojiSync
- `19905` — drawEmoji
- `19916` — safe
- `19927` — setFont
- `19933` — measure
- `19939` — gramText
- `19948` — pastoOf
- `19957` — macroDelPasto
- `20002` — kcalDelPasto
- `20006` — macroDelGiorno
- `20024` — kcalDelGiorno
- `20027` — formatValori
- `20037` — drawCopertina
- `20170` — measurePasto
- `20220` — groupCelleByOrdine
- `20230` — cellHeight
- `20239` — drawDayHeader
- `20254` — drawPasto
- `20294` — stripEmojiPDF
- `20427` — drawCella
- `20764` — collectCp
- `20770` — getEmojiCpStandalone
- `20934` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 17554-17721

- `20944` — salvaInbody
- `20968` — delInbody
- `20975` — ascoltaProgresso
- `20993` — d
- `20994` — fD
- `21110` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 17749-18218

- `21138` — buildSemLegenda
- `21152` — renderAlEditor
- `21213` — _alimNomeRegex
- `21221` — _alimGiorniDaPiano
- `21229` — _scanGiorniPerNome
- `21244` — scanRiferimentiAlimento
- `21273` — _alimRefsRighe
- `21279` — rinominaAlimentoCustom
- `21296` — _renameInGiorni
- `21315` — _renameInPianoRecord
- `21367` — modificaAlimentoCustom
- `21387` — ripristinaValoriPrecedentiAlimento
- `21399` — _resetAlimModal
- `21410` — apriNuovoAlimentoCustom
- `21416` — salvaAlimentoCustom
- `21483` — eliminaAlimentoCustom
- `21514` — _alimFonteBadge
- `21519` — renderAlimentiPage
- `21522` — E
- `21589` — archiviaAlimentoCustom
- `21607` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 18245-18486

- `21634` — _bcSetStatus
- `21636` — apriScannerBarcode
- `21644` — chiudiScannerBarcode
- `21649` — _bcStopCamera
- `21657` — _bcModaleAperto
- `21659` — _bcAvviaCamera
- `21670` — _bcAvviaNativo
- `21690` — _bcAvviaZXing
- `21699` — _bcZXStart
- `21710` — _bcErroreCamera
- `21718` — cercaBarcodeManuale
- `21724` — _barcodeTrovato
- `21740` — cercaBarcodeOFF
- `21758` — _bcProdottoNonTrovato
- `21772` — _bcPrecompilaForm
- `21782` — num
- `21796` — togAl
- `21849` — selCatAl
- `21863` — selTuttiAl
- `21875` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 18500-18816

- `21889` — setCalView
- `21890` — calPrev
- `21891` — calNext
- `21892` — calToday
- `21894` — renderCal
- `21908` — renderCalMonth
- `21932` — renderCalWeek
- `21950` — renderCalDay
- `21966` — selGiorno
- `21980` — setDisp
- `21985` — openAddEvento
- `21998` — openAddEventoPaz
- `22004` — toggleEntrataCheck
- `22009` — salvaEvento
- `22032` — openEvDetail
- `22087` — delEvento
- `22095` — copyMsg
- `22102` — aggDateCal
- `22107` — syncInizio
- `22108` — syncControllo
- `22109` — aggiornaPrev
- `22126` — renderRic
- `22153` — openNuovaRic
- `22154` — editRic
- `22164` — salvaRic
- `22189` — delRic
- `22205` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 18901-18961

- `22290` — aggiungiEntrataPerPaziente
- `22307` — openNuovaEntrata
- `22321` — salvaEntrata
- `22342` — delEntrata
- `22350` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 18991-19345

- `22380` — aiSuggerisciRicetta
- `22425` — renderConcettiModal
- `22444` — apriConcettiModal
- `22471` — salvaConcettiAllegati
- `22489` — loadInbodyPDF
- `22571` — _vitdLabel
- `22575` — getIntegratori
- `22579` — getIntegraWant
- `22583` — setIntegratori
- `22600` — setIntegraWant
- `22611` — getPatologieChip
- `22612` — getAllergieChip
- `22613` — setPatologieChip
- `22614` — setAllergieChip
- `22615` — getPatologie
- `22616` — getAllergie
- `22617` — setPatologieFromStr
- `22624` — setAllergieFromStr
- `22637` — getSdvChip
- `22638` — getCspChip
- `22639` — setSdvChip
- `22640` — setCspChip
- `22641` — setSdvFromStr
- `22642` — setCspFromStr
- `22646` — getBudget
- `22647` — setBudget
- `22652` — renderCalAnno
- `22683` — comprimeImmagine
- `22705` — uploadImmagineConcetto
- `22724` — rimuoviImmagineConcetto
- `22734` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 19411-19515

- `22800` — entraSelConcetti
- `22801` — annullaSelConcetti
- `22802` — toggleConcettoSel
- `22807` — eliminaConcettiSelezionati
- `22826` — confermaEliminaConcetti
- `22841` — aiRiscriviConcetto
- `22855` — editConcetto
- `22873` — salvaConcetto
- `22884` — openNuovoConcetto
- `22904` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 19516-19679

- `22905` — saveAgendaPersonale
- `22906` — getAgendaTodo
- `22907` — saveAgendaTodo
- `22909` — pulisciAgendaVecchia
- `22913` — navigaAgenda
- `22922` — toggleFormAgenda
- `22923` — toggleFormTodo
- `22925` — salvaAgendaItem
- `22939` — salvaTodoItem
- `22951` — toggleAgendaFatto
- `22959` — toggleTodoFatto
- `22972` — _catCol
- `22974` — renderAgendaDx
- `23068` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 19805-20009

- `23194` — renderScadenzeAlert
- `23379` — segnaGestito
- `23398` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 20018-20089

- `23407` — ripristinaPaz
- `23415` — eliminaPaz
- `23460` — getDove
- `23464` — setDove
- `23482` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 20094-20533

- `23487` — getCredenzialiPersistenti
- `23500` — cancellaCredenzialiPersistenti
- `23505` — rinnovaSessioneConRefreshToken
- `23522` — getSessioneSalvata
- `23541` — salvaSessione
- `23551` — cancellaSessione
- `23555` — eseguiLogin
- `23602` — eseguiLogout
- `23624` — mostraApp
- `23629` — verificaSessioneEAvvia
- `23657` — assicuraTokenValido
- `23686` — _garantiscoSessionePerSync
- `23698` — avviaRinnovoTokenPeriodico
- `23702` — fermaRinnovoTokenPeriodico
- `23711` — _authReset
- `23716` — _authMostra
- `23719` — mostraLogin
- `23720` — mostraRegistrazione
- `23721` — mostraRecupero
- `23722` — mostraNuovaPassword
- `23725` — eseguiRegistrazione
- `23763` — eseguiRecuperoPassword
- `23792` — eseguiNuovaPassword
- `23826` — _parseHashParams
- `23833` — _pulisciHash
- `23837` — gestisciRitornoAuth
- `23927` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 20605-20862

- `23999` — apriPannelloRicette
- `24028` — chiudiPannelloRicette
- `24036` — applicaRicettaPasto
- `24072` — inizializzaP2
- `24084` — deepClone
- `24088` — applicaPatch
- `24122` — _aggiornaLabelSalvaPiano
- `24215` — getHint
- `24220` — validaInput
- `24245` — attacca
- `24252` — attaccaTutti
- `24260` — wireCatChips

---
