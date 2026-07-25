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

- `2344` — _slugAlimento
- `2352` — _catalogoIndicizza
- `2356` — _catalogoDeindicizza
- `2363` — costruisciCatalogo
- `2386` — risolviAlimento

---

### MACROS PIANO — calcolo e badge macro reali vs target
Righe 2352-2601

- `2401` — getValoriCREA
- `2413` — getCurrentPaziente
- `2433` — getKcalWeekend
- `2490` — getMacrosRicettaComposta
- `2496` — calcolaMacrosPiano
- `2598` — renderBadgeMacrosReali
- `2608` — pctStr
- `2609` — color
- `2622` — row
- `2664` — renderBadgeMacrosReali_DOM

---

### ANALISI DEL SANGUE — parsing, indici clinici derivati, interpretazione
Righe 2849-3021

- `2912` — _parseAnalisiNum
- `2920` — calcolaIndice
- `3058` — interpretaAnalisi
- `3070` — _interpAnalisiHtml
- `3084` — mostraInfoRange

---

### CONCETTI EDUCATIVI — sync Supabase, migrazione
Righe 3158-3186

- `3227` — pushConcetiSupabase
- `3237` — pullConcetiSupabase
- `3251` — migraConcetti

---

### ALIMENTI — categorie funzionali/semaforo, chip UI, equivalenze porzioni
Righe 3371-3617

- `3436` — getCategoriaSemaforo
- `3453` — _getCategorieGruppo
- `3467` — calcolaGrammaturaEquivalente
- `3484` — criterioByCat
- `3495` — suggerisciGrEquivalente
- `3540` — arrotondaPorzioneDiscreta
- `3554` — getCategoriaFunzionale
- `3594` — catArr
- `3610` — _tagComuniTrova
- `3614` — getTagComuniChip
- `3617` — setTagComuniChip
- `3625` — setCatChips
- `3638` — getStagioniChip
- `3641` — setStagioniChip
- `3648` — getProfiloChip
- `3651` — setProfiloChip
- `3660` — wireChipGroup
- `3671` — wireAttrChipGroups
- `3682` — wireRadioChipGroup

---

### CONFIG / STORAGE LOCALE — cfg, localStorage db, util data/valuta
Righe 3645-3784

- `3710` — getCfg
- `3711` — saveCfgL
- `3712` — getUrl
- `3713` — saveLocal
- `3714` — loadLocal
- `3715` — uid
- `3716` — today
- `3717` — addDays
- `3718` — fData
- `3719` — fEur
- `3721` — getLastSyncText
- `3731` — getSyncColor
- `3739` — aggiornaStatoSync
- `3765` — setSyncStatus
- `4030` — _registraTombstone
- `4038` — _tombstoneAttivi
- `4050` — _fondiTombstones
- `4064` — _mergeTombstonesRemoti *(dal 24/7 legge il meta da `collections`, P74 1d)*
- `4076` — _applicaTombstones
- `3937` — _pazFetchMeta *(P74 1d — solo `collections`)*
- `3958` — _collectionsUpsert *(P74 — scrittura primaria dei 4 meta-record dal cutover 1d)*
- `3980` — _collectionsFetch *(P74 1d — lettura unica dei meta-record)*
- `4003` — _analisiSangueUpsert *(P74 fase 2 — scrittura ombra analisi del sangue, 24/7)*

---

### SYNC SUPABASE — push/pull ricette/pazienti, tombstones, conflitti (P69)
Righe 3806-4182

- `4100` — supaHeaders
- `4114` — pushRicetteSupabase
- `4139` — pullRicetteSupabase
- `4161` — delRicetteSupabase
- `4173` — delPazienteSupabase
- `4188` — pushToSheets
- `4232` — pullFromSheets
- `4311` — syncNow
- `4324` — sincronizzaTutto
- `4350` — stpSet
- `4355` — stpMsg
- `4455` — testConnSupabase
- `4485` — _p68LogSaveAnonimo

---

### SYNC SUPABASE — save paziente, piani/cache piano, entrate, eventi
Righe 4196-4712

- `4499` — save
- `4517` — _pushRigaPerId
- `4550` — _flushDirtyIds
- `4633` — _p69LoadBaseline
- `4636` — _p69StoreBaseline
- `4639` — _p69SetBaseline
- `4643` — _p69DropBaseline
- `4647` — _p69SetBaselineFromRows
- `4653` — _p69NomePaz
- `4658` — _p69InList
- `4666` — _p69RilevaConflitti
- `4702` — _p69DialogoConflitti
- `4728` — chiudi
- `4736` — _p69RisolviRicarica
- `4765` — _p69EsportaLocali
- `4778` — _p69RisolviSovrascrivi
- `4791` — pushPianoSupabase
- `4813` — pullPianiSupabase
- `4829` — delPianoSupabase
- `4845` — delPianiPazienteSupabase
- `4857` — pushCachePianoSupabase
- `4874` — caricaCachePianoSupabase
- `4896` — pushEntrateSupabase
- `4920` — pullEntrateSupabase
- `4934` — delEntrataSupabase
- `4942` — pushEntrataSupabase
- `4953` — pushEventoSupabase
- `4966` — pushEventiSupabase
- `4990` — pullEventiSupabase
- `5004` — delEventoSupabase
- `5015` — _pianoCacheKey

---

### UI GENERALE — config AI key, notifiche, navigazione (goTo/tab/modali)
Righe 4739-4862

- `5042` — _salvaPianoCache
- `5047` — _caricaPianoCache
- `5053` — salvaCfg
- `5054` — testConn
- `5061` — testaAntKey
- `5072` — initAntCard
- `5075` — esporta
- `5076` — importa
- `5081` — goTo
- `5098` — closeM
- `5106` — ngChiudiModale
- `5115` — ngChiudiPopupCoppia
- `5119` — ngAggiungiX
- `5130` — ngUpgradeModali
- `5150` — mTab
- `5151` — aggiornaEta
- `5152` — toggleOrarioNote
- `5153` — pdTab
- `5154` — notif

---

### PAZIENTI — registro: lista/card/kanban, apertura, editing, salvataggio, routine
Righe 4870-6107

- `5162` — getPazView
- `5163` — setPazView
- `5172` — _pazStatoPiano
- `5180` — _pazUrgenzaControllo
- `5187` — _pazStatoTagHtml
- `5196` — _pazAggiornaFiltroRegimi
- `5204` — renderPaz
- `5257` — _renderPazCard
- `5282` — _renderPazLista
- `5309` — _renderPazKanban
- `5347` — openNuovoPaz
- `5373` — editPaz
- `5436` — applicaRegoloSemaforo
- `5947` — trovaChiaveAlimento
- `5956` — salvaPaz
- `6014` — openPaz
- `6698` — renderPdRoutine
- `6713` — cardHTML
- `6840` — updateRoutineCampo
- `6848` — suggerisciPastoEQuando
- `6875` — filtroLibreria
- `6884` — renderLibreriaGrid
- `6905` — aggiungiDaLibreriaIdx
- `6929` — openModalRoutine
- `6936` — salvaRoutineVoce
- `6961` — salvaRoutine
- `6968` — mostraRoutinePopup
- `6996` — removeRoutineVoce
- `7011` — _renderAggiustamentiSection

---

### 📈 PERCORSO — timeline di periodizzazione (P115 Tappe 1-5 COMPLETE, 24 lug 2026)
Righe 6021-6621 (numeri ESATTI al 24/7 notte, dopo la Tappa 5). ⚠️ Questo blocco (~600 righe) fa slittare tutti i numeri delle sezioni SUCCESSIVE a riga ~6020 rispetto all'ultima rigenerazione completa: per quelle sezioni fare grep di conferma. Rigenerazione completa alla prossima modifica strutturale.

- `6032` — _PERCORSO_TIPI (const: tipi fase, colori, pct default)
- `6065` — _percorsoGet *(normalizza p.percorso, scarta fasi invalide)*
- `6076` — _percorsoIsoLocal *(data → YYYY-MM-DD LOCALE, mai toISOString/UTC)*
- `6082` — _percorsoIntervalli *(fasi consecutive → date concrete dal/al)*
- `6096` — _percorsoFaseAt *(fase attiva a una data; dal incluso, al escluso)*
- `6105` — _percorsoKcalFase *(pct → kcal indicative via calcolaTDEE)*
- `6128` — _percorsoProiezione *(Tappa 2 — proiezione ibrida teorica/calibrata, cono, obiettivo a intervallo)*
- `6186` — _percorsoDataBreve *(ISO → "12 set")*
- `6203` — _percorsoSerieEnergia *(Tappa 3 — serie introito/TDEE stimato/TDEE osservato per la corsia energia)*
- `6242` — _percorsoSerieMassaMagra *(Tappa 4 — solo InBody: punti {data,m,pg})*
- `6261` — _percorsoConsuntivo *(Tappa 5 — legge p.consuntivo scritto da P50: aderenza, extra kcal, ritardo=extra÷7700, settimane perse; oggi sempre ok:false)*
- `6277` — _PERCORSO_LAYERS_DEFAULT / _percorsoLayersState / _percorsoLayersGet *(Tappa 4 — stato interruttori, SOLO sessione, mai su p)*
- `6308` — percorsoLayerToggle *(Tappa 4 — inverte un solo strato)*
- `6314` — percorsoVistaPreset *(Tappa 4 — preset "tecnica"/"paziente")*
- `6322` — _percorsoPaz *(e a seguire i mutatori percorsoInit/SetInizio/AddFase/UpdFase/DelFase/MoveFase)*
- `6364` — _percorsoChartSvg *(due corsie: peso + massa magra + cono proiezione sopra, striscia aderenza in mezzo (solo con dati P50), energia (kcal) sotto — tutto gated dagli interruttori)*
- `6553` — renderPdPercorso *(scheda: badge fase, riga proiezione/obiettivo, riga Piano vs Realtà (solo con dati), toolbar interruttori, grafico, editor)*

*(Tappa 2 tocca anche `calcolaMacros`: box obiettivo con intervallo al posto della data secca.)*

---

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 6192-6896

- `7096` — salvaAggiustamento
- `7129` — eliminaAggiustamento
- `7138` — renderPdNote
- `7173` — salvaNotaClinica
- `7188` — deleteNota
- `7197` — saveNote
- `7712` — _applicaRegoloSemaforoLEGACY
- `7753` — resetSemaforoAuto
- `7800` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 7034-7234

- `7947` — avviaFX
- `7975` — avviaAnalisi
- `7992` — _renderFlussoPanel
- `8036` — _riepEsc
- `8040` — _riepNum
- `8046` — _riepDelta
- `8054` — _riepDataSig
- `8072` — _riepParseFX
- `8077` — clean
- `8086` — _riepAggiornaFX
- `8112` — _riepToggleDomandaDefault
- `8124` — _riepAddDomanda
- `8137` — _riepRemoveDomanda
- `8145` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 7297-7675

- `8208` — dCol
- `8326` — card
- `8357` — renderPdRagionamento
- `8445` — inviaMessaggioRag
- `8463` — concludiERiassumi
- `8477` — salvaRagionamento
- `8498` — apriGeneratoreDaRag
- `8506` — nuovaSessioneRag
- `8512` — cancellaSavedRag
- `8522` — renderPazTimeline
- `8554` — renderPdAnamnesi
- `8583` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 7719-8198

- `9992` — renderPdAnalisi
- `10041` — toggleAnalisiSection
- `10051` — loadAnalisiSanguePDF
- `10143` — mostraDiffAnalisi
- `10242` — _calcoloIncluso
- `10248` — toggleCalcoloIncluso
- `10270` — _renderCalcoliPannello
- `10306` — toggleGlossario
- `10311` — updateAnalisi
- `10370` — salvaAnalisi
- `10383` — applicaGruppoClinico
- `10412` — renderBoxGruppiCliniciSuggeriti
- `10444` — suggerisciGruppiClinici
- `10524` — renderMemoriaInbody

---
### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9176 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `8709` — _richVal
- `8716` — _richBmi
- `8721` — _richPat
- `8727` — _richNum
- `8772` — _richPreselezione
- `8788` — richLeggiIntestazione
- `8792` — richSalvaIntestazione
- `8801` — apriRichiestaAnalisi
- `8821` — _richModaleHtml
- `8897` — _richEsc
- `8899` — _richMotivoCambia
- `8905` — _richToggleSez
- `8911` — _richAggiornaConteggi
- `8919` — _richMotivoCorrente
- `8929` — _richSelezione
- `8944` — _richTxt
- `8950` — _richCostruisciPDF
- `8959` — nuovaPagina
- `8960` — spazio
- `9046` — _richNomeFile
- `9051` — _richPrepara
- `9061` — _richRegistra
- `9075` — _richStato
- `9077` — richScaricaPDF
- `9092` — _richUpload
- `9120` — _richWaUrl
- `9127` — _richTestoWa
- `9141` — richInviaWhatsApp
- `9181` — richCopiaLink
- `9202` — _richStoricoHtml

---
### REFERTI DEL SANGUE DATATI — storico nel tempo (P118 tappa 1)
Righe 9194-9387 — migrazione, ordinamento, quadro attuale derivato, barra di selezione.

- `9777` — _refertoNuovoId
- `9780` — _refertoOggi
- `9784` — _refertoDataIt
- `9790` — _refertoConteggio
- `9804` — _refertiMigra
- `9831` — _refertiOrdinati
- `9842` — _refertoPiuRecente
- `9847` — _refertoInVista
- `9865` — _refertiApplica
- `9878` — _refertoCrea
- `9897` — refertoCambiaVista
- `9903` — refertoCambiaData
- `9915` — refertoNuovo
- `9923` — refertoDuplica
- `9932` — refertoElimina
- `9947` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `9390` — _rangeNum
- `9396` — _rangeTestoDa
- `9415` — _rangeCoppia
- `9425` — _rangeHtml

---
### ANDAMENTO NEL TEMPO — tracciato, variazione, grafico grande (P118 tappa 3)
Righe 9441-9745 — serie storica, regola del colore, sparkline, pannello in fondo.

- `9467` — _andLimiti
- `9488` — _andParseRangeLab
- `9501` — _andDistanza
- `9508` — _andValutazione
- `9521` — _andSerie
- `9535` — _andNum
- `9539` — _andDataBreve
- `9544` — _andMeseAnno
- `9552` — _andDominio
- `9566` — _andColore
- `9579` — _andSparkHtml
- `9605` — _andRigaHtml
- `9627` — _andEsamiSeguibili
- `9635` — andScegliEsame
- `9641` — _andPannelloHtml
- `9694` — _andGraficoGrande
- `9745` — _andPasso

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 8246-8452

- `10572` — _ibFmtBreve
- `10581` — _renderPesiIntermediSection
- `10630` — aggiungiPesoIntermedio
- `10646` — eliminaPesoIntermedio
- `10656` — _ibSilhouetteSegmentale
- `10676` — pct
- `10682` — colMagra
- `10688` — colGrassa
- `10696` — colTroncoGrassa
- `10983` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 8724-8724

- `11255` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 9056-9607

- `11627` — aggiornaLabelMacros
- `11645` — calcolaMacros
- `11786` — applicaSchema
- `11794` — _renderRifPesoBox
- `11842` — _usaRifPeso
- `11846` — _aggiornaRifPesoTarget
- `11849` — _aggiornaRegimeSlider
- `12506` — _presetRegime
- `12510` — _initRegimeSliderDaPaziente
- `12528` — ricalcolaLAF
- `12670` — renderStoricoTDEE
- `12704` — attivaSlotTDEE
- `12712` — eliminaSlotTDEE
- `12725` — _toggleCiclizzazione
- `12731` — _aggiornaAnteprimaCiclizzazione
- `12749` — salvaCalcoloMacros
- `12863` — _metAllenamento
- `12879` — _neatFrazione
- `12953` — _larnLafStileVita
- `12970` — _regimeOffset
- `12980` — _componiRegimeText
- `13013` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `13025` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `13032` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `13102` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 9625-10055

- `13120` — renderTargetBadge
- `13149` — verificaRegola_75_20_5
- `13186` — renderBadge75_20_5
- `13251` — _validaNorm
- `13254` — _validaMatchTermine
- `13262` — _validaCostruisciListe
- `13266` — addA
- `13267` — addR
- `13268` — addE
- `13313` — _validaTesto
- `13334` — validaPiano
- `13408` — _validaFirmaBlocchi
- `13415` — renderBadgeValidatore
- `13446` — _validaVaiAlGiorno
- `13455` — apriPannelloValidatore
- `13462` — esc
- `13512` — _validaEseguiOverride
- `13535` — validaGateExport
- `13550` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 10065-10811

- `13560` — abbr
- `13565` — isSab
- `13567` — buildVistaA
- `13571` — righeCategoria
- `13623` — buildVistaB
- `13629` — barColor
- `13634` — barW
- `13642` — barRow
- `13663` — getTabContent
- `13667` — tabBtn
- `13683` — pianoPazSelezionato
- `13830` — renderPianoConPillTabs
- `13836` — _renderGiornoGen
- `13880` — _dc
- `13881` — _dd
- `13888` — rowG
- `14068` — renderPanelMacrosGiorno
- `14211` — pmgCambiaGrammi
- `14235` — riapriPiano
- `14273` — _montaPianoCorrente
- `14312` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 10821-11290

- `14322` — pullTemplateSupabase
- `14333` — delTemplateSupabase
- `14342` — _promptTemplateNome
- `14367` — _creaTemplateDaJSON
- `14390` — salvaComeTemplate
- `14401` — salvaComeTemplateDaPiano
- `14410` — _normNomeAlim
- `14411` — _escRegAlim
- `14412` — _raccogliAlimentiDaPiano
- `14423` — _alimentiEsclusiPaziente
- `14435` — _trovaConflittiTemplate
- `14453` — _mostraAvvisoConflitti
- `14477` — applicaTemplate
- `14495` — apriPickerTemplate
- `14523` — _pickPaziente
- `14542` — applicaTemplatePick
- `14546` — rinominaTemplate
- `14557` — eliminaTemplate
- `14567` — renderLibreriaTemplate
- `14596` — renderStoricoPiani
- `14655` — eliminaPiano
- `14671` — _getActiveMacrosTarget
- `14695` — getTargetAttivi
- `14732` — calcolaTargetsCiclizzazione
- `14758` — _setupPianoTargets
- `14782` — getStagioneCorrente
- `14791` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 11366-11599

- `14872` — _ricSlots
- `15151` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 11608-12076

- `15160` — aggiornaUIcolazione
- `15170` — salvaRegolePiano
- `15231` — _isModelloSistema
- `15234` — _isModelloSistemaModificato
- `15246` — caricaModelliCustomLocal
- `15260` — salvaModelliCustomLocal
- `15281` — _migraRecordCustom
- `15296` — _syncAliasLegacy
- `15305` — caricaAlimentiCustom
- `15329` — pushAlimentiCustomSupabase
- `15339` — pullAlimentiCustomSupabase
- `15353` — pushModelliSupabase
- `15371` — pullModelliSupabase
- `15396` — _calcolaFreqDaModello
- `15415` — aggiornaUImodello
- `15504` — popolaDropdownModelli
- `15532` — cambiaModelloRotazione
- `15538` — ripristinaModelloOriginale
- `15561` — eliminaModelloCustom
- `15579` — mostraAnteprimaModello
- `15589` — apriEditorModello
- `15619` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 12111-12625

- `15654` — rerender
- `15888` — _salvaModelloDaEditor
- `15930` — caricaRegolePiano
- `15960` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `15995` — _aiLogUsage
- `16017` — _aiProxyUrl
- `16023` — _aiTokenPerProxy
- `16052` — aiCall
- `16060` — fetchConTimeout
- `16076` — unTentativo
- `16126` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 12631-12838

- `16132` — _risolviCollisioniCelle
- `16199` — espandiPiano
- `16203` — al2
- `16204` — espPasto
- `16259` — getFruttaStile
- `16266` — _fruttaGetPasto
- `16276` — _fruttaContaRigheRicetta
- `16280` — _fruttaIndiceBasePasto
- `16300` — getFruttaMarker
- `16313` — fruttaMarkerHtml
- `16321` — _fruttaCheckboxHtml
- `16330` — toggleFrutta
- `16339` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 12874-14136

- `16375` — _renderCelleGriglia
- `16452` — _renderRicetteTestuali
- `16491` — scambiaRicette
- `16502` — _ricDragTrovaRigaSotto
- `16508` — _ricDragPulisciEvidenza
- `16511` — _onPointerMove
- `16527` — _onPointerUp
- `16562` — _renderCelleHtml
- `16570` — toggleCellaMenu
- `16589` — closeAllCellaMenus
- `16597` — _trovaPasto
- `16605` — cellaSposta
- `16659` — cellaCancella
- `16680` — apriEditGrammatura
- `16705` — salva
- `16735` — cellaSwap
- `16752` — cellaRimuoviAlt
- `16766` — cellaAggiungiAlt
- `16861` — _mostraPopupAggiungiAlt
- `16884` — renderLista
- `16947` — apriEditRicetta
- `16956` — aggiungiRicetta
- `16972` — rimuoviRicetta
- `16981` — _mostraPopupEditRicetta
- `17028` — renderListaRicette
- `17057` — renderRicettario
- `17060` — renderParziali
- `17064` — salvaRicetta
- `17143` — ngAggiungiSpuntinoVuoto
- `17159` — apriAggiungiCella
- `17170` — risolviCompatibili
- `17250` — _apriPopupRicettaComposta
- `17292` — aggiornaMacros
- `17342` — _mostraPopupSceltaCategoriaAlimento
- `17415` — vaiAlleCategorie
- `17483` — _aggiornaPianoBox
- `17510` — _renderGiornoAttivo
- `17638` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 14184-14565

- `17686` — _attesoStrutturaPiano
- `17706` — _confrontaStrutturaPiano
- `17736` — _costruisciPromptDelta
- `17763` — _pianoToolSchema
- `17838` — _pianoMaxTokens
- `17847` — _estraiPianoDaRisposta
- `17869` — chiamaGeneraPiano
- `18036` — mostraLoadingSteps
- `18039` — render
- `18067` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 14632-14834

- `18134` — generaMessaggioAI
- `18222` — copiaMessaggioAI
- `18232` — salvaInStorico
- `18244` — salvaVarianteAI
- `18259` — renderVariantiSalvate
- `18278` — usaVariante
- `18296` — eliminaVariante
- `18307` — renderStoricoMsg
- `18323` — apriWhatsApp
- `18691` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 15012-16510

- `18869` — _ngColoreSemaforoNome
- `18877` — apriSceltaModalitaPiano
- `18912` — _ngChiudiModalita
- `18915` — _ngCostruisciGiornoVuoto
- `18948` — _ngCostruisciGiornoSpeciale
- `18959` — _ngIndiceInizioSpeciali
- `18970` — _ngModalitaNomeGiorno
- `18976` — _ngImpostaModalitaNomeGiorno
- `18979` — _ngLettera
- `18986` — _ngEtichettaGiorno
- `19006` — _ngEtichettaGiornoBreve
- `19020` — _ngToggleGiornoSpeciale
- `19044` — _ngRenderPannelloSpeciale
- `19112` — _generaGiornoSpecialeAI
- `19212` — _ngGiornoHaContenuto
- `19224` — _ngCreaPianoManuale
- `19247` — _ngScrollTabGiorni
- `19257` — _ngAbilitaDragScroll
- `19294` — _ngCambiaNumeroGiorni
- `19326` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `19340` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `19381` — _ngToggleCat
- `19390` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `19414` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `19570` — _ngSalvaPianoManuale
- `19596` — _ngParseIngrediente
- `19620` — _ngScomponiIngredienti
- `19632` — _ricCalcolaMacroDaIngredienti
- `19650` — _ricRicalcolaMacroLive
- `19657` — _ricAggiornaInfoMacro
- `19671` — _ricRicalcolaMacroLiveNow
- `19695` — _ngTrovaCategoriaAlimento
- `19728` — _ngPescaRicetta
- `19771` — _ngScomponiRicettaNelPasto
- `19808` — _ngDragStart
- `19819` — _ngDragStartCella
- `19830` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `19837` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `19842` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `19861` — _ngAggiungiAlimento
- `19886` — _ngRimuoviAlimento
- `19900` — _ngDopoModifica
- `19918` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `19971` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `20000` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `20017` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `20025` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `20097` — gramTestoCasalingo
- `20123` — _appendToggleNutrizionali
- `20166` — _appendTogglePromemoria
- `20195` — _appendBtnConcetti
- `20209` — _refreshBtnConcetti
- `20341` — cpFromEmoji
- `20347` — getEmojiCp
- `20366` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `15057` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `18363` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `18368` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `18394` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `18482` — _spesaTestoWhatsApp
- `18498` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `18543` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `18566` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `18594` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `18654` — scaricaListaSpesaPDF (download diretto, un click)
- `18662` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `18674` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 16520-17544

- `20376` — fetchEmojiB64
- `20394` — _generaPDFSync
- `20479` — loadEmojiSync
- `20485` — drawEmoji
- `20496` — safe
- `20507` — setFont
- `20513` — measure
- `20519` — gramText
- `20528` — pastoOf
- `20537` — macroDelPasto
- `20582` — kcalDelPasto
- `20586` — macroDelGiorno
- `20604` — kcalDelGiorno
- `20607` — formatValori
- `20617` — drawCopertina
- `20750` — measurePasto
- `20800` — groupCelleByOrdine
- `20810` — cellHeight
- `20819` — drawDayHeader
- `20834` — drawPasto
- `20874` — stripEmojiPDF
- `21007` — drawCella
- `21344` — collectCp
- `21350` — getEmojiCpStandalone
- `21514` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 17554-17721

- `21524` — salvaInbody
- `21548` — delInbody
- `21555` — ascoltaProgresso
- `21573` — d
- `21574` — fD
- `21690` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 17749-18218

- `21718` — buildSemLegenda
- `21732` — renderAlEditor
- `21793` — _alimNomeRegex
- `21801` — _alimGiorniDaPiano
- `21809` — _scanGiorniPerNome
- `21824` — scanRiferimentiAlimento
- `21853` — _alimRefsRighe
- `21859` — rinominaAlimentoCustom
- `21876` — _renameInGiorni
- `21895` — _renameInPianoRecord
- `21947` — modificaAlimentoCustom
- `21967` — ripristinaValoriPrecedentiAlimento
- `21979` — _resetAlimModal
- `21990` — apriNuovoAlimentoCustom
- `21996` — salvaAlimentoCustom
- `22063` — eliminaAlimentoCustom
- `22094` — _alimFonteBadge
- `22099` — renderAlimentiPage
- `22102` — E
- `22169` — archiviaAlimentoCustom
- `22187` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 18245-18486

- `22214` — _bcSetStatus
- `22216` — apriScannerBarcode
- `22224` — chiudiScannerBarcode
- `22229` — _bcStopCamera
- `22237` — _bcModaleAperto
- `22239` — _bcAvviaCamera
- `22250` — _bcAvviaNativo
- `22270` — _bcAvviaZXing
- `22279` — _bcZXStart
- `22290` — _bcErroreCamera
- `22298` — cercaBarcodeManuale
- `22304` — _barcodeTrovato
- `22320` — cercaBarcodeOFF
- `22338` — _bcProdottoNonTrovato
- `22352` — _bcPrecompilaForm
- `22362` — num
- `22376` — togAl
- `22429` — selCatAl
- `22443` — selTuttiAl
- `22455` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 18500-18816

- `22469` — setCalView
- `22470` — calPrev
- `22471` — calNext
- `22472` — calToday
- `22474` — renderCal
- `22488` — renderCalMonth
- `22512` — renderCalWeek
- `22530` — renderCalDay
- `22546` — selGiorno
- `22560` — setDisp
- `22565` — openAddEvento
- `22578` — openAddEventoPaz
- `22584` — toggleEntrataCheck
- `22589` — salvaEvento
- `22612` — openEvDetail
- `22667` — delEvento
- `22675` — copyMsg
- `22682` — aggDateCal
- `22687` — syncInizio
- `22688` — syncControllo
- `22689` — aggiornaPrev
- `22706` — renderRic
- `22733` — openNuovaRic
- `22734` — editRic
- `22744` — salvaRic
- `22769` — delRic
- `22785` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 18901-18961

- `22870` — aggiungiEntrataPerPaziente
- `22887` — openNuovaEntrata
- `22901` — salvaEntrata
- `22922` — delEntrata
- `22930` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 18991-19345

- `22960` — aiSuggerisciRicetta
- `23005` — renderConcettiModal
- `23024` — apriConcettiModal
- `23051` — salvaConcettiAllegati
- `23069` — loadInbodyPDF
- `23151` — _vitdLabel
- `23155` — getIntegratori
- `23159` — getIntegraWant
- `23163` — setIntegratori
- `23180` — setIntegraWant
- `23191` — getPatologieChip
- `23192` — getAllergieChip
- `23193` — setPatologieChip
- `23194` — setAllergieChip
- `23195` — getPatologie
- `23196` — getAllergie
- `23197` — setPatologieFromStr
- `23204` — setAllergieFromStr
- `23217` — getSdvChip
- `23218` — getCspChip
- `23219` — setSdvChip
- `23220` — setCspChip
- `23221` — setSdvFromStr
- `23222` — setCspFromStr
- `23226` — getBudget
- `23227` — setBudget
- `23232` — renderCalAnno
- `23263` — comprimeImmagine
- `23285` — uploadImmagineConcetto
- `23304` — rimuoviImmagineConcetto
- `23314` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 19411-19515

- `23380` — entraSelConcetti
- `23381` — annullaSelConcetti
- `23382` — toggleConcettoSel
- `23387` — eliminaConcettiSelezionati
- `23406` — confermaEliminaConcetti
- `23421` — aiRiscriviConcetto
- `23435` — editConcetto
- `23453` — salvaConcetto
- `23464` — openNuovoConcetto
- `23484` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 19516-19679

- `23485` — saveAgendaPersonale
- `23486` — getAgendaTodo
- `23487` — saveAgendaTodo
- `23489` — pulisciAgendaVecchia
- `23493` — navigaAgenda
- `23502` — toggleFormAgenda
- `23503` — toggleFormTodo
- `23505` — salvaAgendaItem
- `23519` — salvaTodoItem
- `23531` — toggleAgendaFatto
- `23539` — toggleTodoFatto
- `23552` — _catCol
- `23554` — renderAgendaDx
- `23648` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 19805-20009

- `23774` — renderScadenzeAlert
- `23959` — segnaGestito
- `23978` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 20018-20089

- `23987` — ripristinaPaz
- `23995` — eliminaPaz
- `24040` — getDove
- `24044` — setDove
- `24062` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 20094-20533

- `24067` — getCredenzialiPersistenti
- `24080` — cancellaCredenzialiPersistenti
- `24085` — rinnovaSessioneConRefreshToken
- `24102` — getSessioneSalvata
- `24121` — salvaSessione
- `24131` — cancellaSessione
- `24135` — eseguiLogin
- `24182` — eseguiLogout
- `24204` — mostraApp
- `24209` — verificaSessioneEAvvia
- `24237` — assicuraTokenValido
- `24266` — _garantiscoSessionePerSync
- `24278` — avviaRinnovoTokenPeriodico
- `24282` — fermaRinnovoTokenPeriodico
- `24291` — _authReset
- `24296` — _authMostra
- `24299` — mostraLogin
- `24300` — mostraRegistrazione
- `24301` — mostraRecupero
- `24302` — mostraNuovaPassword
- `24305` — eseguiRegistrazione
- `24343` — eseguiRecuperoPassword
- `24372` — eseguiNuovaPassword
- `24406` — _parseHashParams
- `24413` — _pulisciHash
- `24417` — gestisciRitornoAuth
- `24507` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 20605-20862

- `24579` — apriPannelloRicette
- `24608` — chiudiPannelloRicette
- `24616` — applicaRicettaPasto
- `24652` — inizializzaP2
- `24664` — deepClone
- `24668` — applicaPatch
- `24702` — _aggiornaLabelSalvaPiano
- `24795` — getHint
- `24800` — validaInput
- `24825` — attacca
- `24832` — attaccaTutti
- `24840` — wireCatChips

---
