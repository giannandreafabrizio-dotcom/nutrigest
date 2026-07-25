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

- `2321` — _slugAlimento
- `2329` — _catalogoIndicizza
- `2333` — _catalogoDeindicizza
- `2340` — costruisciCatalogo
- `2363` — risolviAlimento

---

### MACROS PIANO — calcolo e badge macro reali vs target
Righe 2352-2601

- `2378` — getValoriCREA
- `2390` — getCurrentPaziente
- `2410` — getKcalWeekend
- `2467` — getMacrosRicettaComposta
- `2473` — calcolaMacrosPiano
- `2575` — renderBadgeMacrosReali
- `2585` — pctStr
- `2586` — color
- `2599` — row
- `2641` — renderBadgeMacrosReali_DOM

---

### ANALISI DEL SANGUE — parsing, indici clinici derivati, interpretazione
Righe 2849-3021

- `2889` — _parseAnalisiNum
- `2897` — calcolaIndice
- `3035` — interpretaAnalisi
- `3047` — _interpAnalisiHtml
- `3061` — mostraInfoRange

---

### CONCETTI EDUCATIVI — sync Supabase, migrazione
Righe 3158-3186

- `3204` — pushConcetiSupabase
- `3214` — pullConcetiSupabase
- `3228` — migraConcetti

---

### ALIMENTI — categorie funzionali/semaforo, chip UI, equivalenze porzioni
Righe 3371-3617

- `3413` — getCategoriaSemaforo
- `3430` — _getCategorieGruppo
- `3444` — calcolaGrammaturaEquivalente
- `3461` — criterioByCat
- `3472` — suggerisciGrEquivalente
- `3517` — arrotondaPorzioneDiscreta
- `3531` — getCategoriaFunzionale
- `3571` — catArr
- `3587` — _tagComuniTrova
- `3591` — getTagComuniChip
- `3594` — setTagComuniChip
- `3602` — setCatChips
- `3615` — getStagioniChip
- `3618` — setStagioniChip
- `3625` — getProfiloChip
- `3628` — setProfiloChip
- `3637` — wireChipGroup
- `3648` — wireAttrChipGroups
- `3659` — wireRadioChipGroup

---

### CONFIG / STORAGE LOCALE — cfg, localStorage db, util data/valuta
Righe 3645-3784

- `3687` — getCfg
- `3688` — saveCfgL
- `3689` — getUrl
- `3690` — saveLocal
- `3691` — loadLocal
- `3692` — uid
- `3693` — today
- `3694` — addDays
- `3695` — fData
- `3696` — fEur
- `3698` — getLastSyncText
- `3708` — getSyncColor
- `3716` — aggiornaStatoSync
- `3742` — setSyncStatus
- `4007` — _registraTombstone
- `4015` — _tombstoneAttivi
- `4027` — _fondiTombstones
- `4041` — _mergeTombstonesRemoti *(dal 24/7 legge il meta da `collections`, P74 1d)*
- `4053` — _applicaTombstones
- `3914` — _pazFetchMeta *(P74 1d — solo `collections`)*
- `3935` — _collectionsUpsert *(P74 — scrittura primaria dei 4 meta-record dal cutover 1d)*
- `3957` — _collectionsFetch *(P74 1d — lettura unica dei meta-record)*
- `3980` — _analisiSangueUpsert *(P74 fase 2 — scrittura ombra analisi del sangue, 24/7)*

---

### SYNC SUPABASE — push/pull ricette/pazienti, tombstones, conflitti (P69)
Righe 3806-4182

- `4077` — supaHeaders
- `4091` — pushRicetteSupabase
- `4116` — pullRicetteSupabase
- `4138` — delRicetteSupabase
- `4150` — delPazienteSupabase
- `4165` — pushToSheets
- `4209` — pullFromSheets
- `4288` — syncNow
- `4301` — sincronizzaTutto
- `4327` — stpSet
- `4332` — stpMsg
- `4432` — testConnSupabase
- `4462` — _p68LogSaveAnonimo

---

### SYNC SUPABASE — save paziente, piani/cache piano, entrate, eventi
Righe 4196-4712

- `4476` — save
- `4494` — _pushRigaPerId
- `4527` — _flushDirtyIds
- `4610` — _p69LoadBaseline
- `4613` — _p69StoreBaseline
- `4616` — _p69SetBaseline
- `4620` — _p69DropBaseline
- `4624` — _p69SetBaselineFromRows
- `4630` — _p69NomePaz
- `4635` — _p69InList
- `4643` — _p69RilevaConflitti
- `4679` — _p69DialogoConflitti
- `4705` — chiudi
- `4713` — _p69RisolviRicarica
- `4742` — _p69EsportaLocali
- `4755` — _p69RisolviSovrascrivi
- `4768` — pushPianoSupabase
- `4790` — pullPianiSupabase
- `4806` — delPianoSupabase
- `4822` — delPianiPazienteSupabase
- `4834` — pushCachePianoSupabase
- `4851` — caricaCachePianoSupabase
- `4873` — pushEntrateSupabase
- `4897` — pullEntrateSupabase
- `4911` — delEntrataSupabase
- `4919` — pushEntrataSupabase
- `4930` — pushEventoSupabase
- `4943` — pushEventiSupabase
- `4967` — pullEventiSupabase
- `4981` — delEventoSupabase
- `4992` — _pianoCacheKey

---

### UI GENERALE — config AI key, notifiche, navigazione (goTo/tab/modali)
Righe 4739-4862

- `5019` — _salvaPianoCache
- `5024` — _caricaPianoCache
- `5030` — salvaCfg
- `5031` — testConn
- `5038` — testaAntKey
- `5049` — initAntCard
- `5052` — esporta
- `5053` — importa
- `5058` — goTo
- `5075` — closeM
- `5083` — ngChiudiModale
- `5092` — ngChiudiPopupCoppia
- `5096` — ngAggiungiX
- `5107` — ngUpgradeModali
- `5127` — mTab
- `5128` — aggiornaEta
- `5129` — toggleOrarioNote
- `5130` — pdTab
- `5131` — notif

---

### PAZIENTI — registro: lista/card/kanban, apertura, editing, salvataggio, routine
Righe 4870-6107

- `5139` — getPazView
- `5140` — setPazView
- `5149` — _pazStatoPiano
- `5157` — _pazUrgenzaControllo
- `5164` — _pazStatoTagHtml
- `5173` — _pazAggiornaFiltroRegimi
- `5181` — renderPaz
- `5234` — _renderPazCard
- `5259` — _renderPazLista
- `5286` — _renderPazKanban
- `5324` — openNuovoPaz
- `5350` — editPaz
- `5413` — applicaRegoloSemaforo
- `5924` — trovaChiaveAlimento
- `5933` — salvaPaz
- `5991` — openPaz
- `6675` — renderPdRoutine
- `6690` — cardHTML
- `6817` — updateRoutineCampo
- `6825` — suggerisciPastoEQuando
- `6852` — filtroLibreria
- `6861` — renderLibreriaGrid
- `6882` — aggiungiDaLibreriaIdx
- `6906` — openModalRoutine
- `6913` — salvaRoutineVoce
- `6938` — salvaRoutine
- `6945` — mostraRoutinePopup
- `6973` — removeRoutineVoce
- `6988` — _renderAggiustamentiSection

---

### 📈 PERCORSO — timeline di periodizzazione (P115 Tappe 1-5 COMPLETE, 24 lug 2026)
Righe 6021-6621 (numeri ESATTI al 24/7 notte, dopo la Tappa 5). ⚠️ Questo blocco (~600 righe) fa slittare tutti i numeri delle sezioni SUCCESSIVE a riga ~6020 rispetto all'ultima rigenerazione completa: per quelle sezioni fare grep di conferma. Rigenerazione completa alla prossima modifica strutturale.

- `6032` — _PERCORSO_TIPI (const: tipi fase, colori, pct default)
- `6042` — _percorsoGet *(normalizza p.percorso, scarta fasi invalide)*
- `6053` — _percorsoIsoLocal *(data → YYYY-MM-DD LOCALE, mai toISOString/UTC)*
- `6059` — _percorsoIntervalli *(fasi consecutive → date concrete dal/al)*
- `6073` — _percorsoFaseAt *(fase attiva a una data; dal incluso, al escluso)*
- `6082` — _percorsoKcalFase *(pct → kcal indicative via calcolaTDEE)*
- `6105` — _percorsoProiezione *(Tappa 2 — proiezione ibrida teorica/calibrata, cono, obiettivo a intervallo)*
- `6163` — _percorsoDataBreve *(ISO → "12 set")*
- `6180` — _percorsoSerieEnergia *(Tappa 3 — serie introito/TDEE stimato/TDEE osservato per la corsia energia)*
- `6219` — _percorsoSerieMassaMagra *(Tappa 4 — solo InBody: punti {data,m,pg})*
- `6238` — _percorsoConsuntivo *(Tappa 5 — legge p.consuntivo scritto da P50: aderenza, extra kcal, ritardo=extra÷7700, settimane perse; oggi sempre ok:false)*
- `6277` — _PERCORSO_LAYERS_DEFAULT / _percorsoLayersState / _percorsoLayersGet *(Tappa 4 — stato interruttori, SOLO sessione, mai su p)*
- `6285` — percorsoLayerToggle *(Tappa 4 — inverte un solo strato)*
- `6291` — percorsoVistaPreset *(Tappa 4 — preset "tecnica"/"paziente")*
- `6299` — _percorsoPaz *(e a seguire i mutatori percorsoInit/SetInizio/AddFase/UpdFase/DelFase/MoveFase)*
- `6341` — _percorsoChartSvg *(due corsie: peso + massa magra + cono proiezione sopra, striscia aderenza in mezzo (solo con dati P50), energia (kcal) sotto — tutto gated dagli interruttori)*
- `6530` — renderPdPercorso *(scheda: badge fase, riga proiezione/obiettivo, riga Piano vs Realtà (solo con dati), toolbar interruttori, grafico, editor)*

*(Tappa 2 tocca anche `calcolaMacros`: box obiettivo con intervallo al posto della data secca.)*

---

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 6192-6896

- `7073` — salvaAggiustamento
- `7106` — eliminaAggiustamento
- `7115` — renderPdNote
- `7150` — salvaNotaClinica
- `7165` — deleteNota
- `7174` — saveNote
- `7689` — _applicaRegoloSemaforoLEGACY
- `7730` — resetSemaforoAuto
- `7777` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 7034-7234

- `7924` — avviaFX
- `7952` — avviaAnalisi
- `7969` — _renderFlussoPanel
- `8013` — _riepEsc
- `8017` — _riepNum
- `8023` — _riepDelta
- `8031` — _riepDataSig
- `8049` — _riepParseFX
- `8054` — clean
- `8063` — _riepAggiornaFX
- `8089` — _riepToggleDomandaDefault
- `8101` — _riepAddDomanda
- `8114` — _riepRemoveDomanda
- `8122` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 7297-7675

- `8185` — dCol
- `8303` — card
- `8334` — renderPdRagionamento
- `8422` — inviaMessaggioRag
- `8440` — concludiERiassumi
- `8454` — salvaRagionamento
- `8475` — apriGeneratoreDaRag
- `8483` — nuovaSessioneRag
- `8489` — cancellaSavedRag
- `8499` — renderPazTimeline
- `8531` — renderPdAnamnesi
- `8560` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 7719-8198

- `9656` — renderPdAnalisi
- `9703` — toggleAnalisiSection
- `9713` — loadAnalisiSanguePDF
- `9805` — mostraDiffAnalisi
- `9904` — _calcoloIncluso
- `9910` — toggleCalcoloIncluso
- `9932` — _renderCalcoliPannello
- `9968` — toggleGlossario
- `9973` — updateAnalisi
- `10032` — salvaAnalisi
- `10045` — applicaGruppoClinico
- `10074` — renderBoxGruppiCliniciSuggeriti
- `10106` — suggerisciGruppiClinici
- `10186` — renderMemoriaInbody

---
### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9176 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `8686` — _richVal
- `8693` — _richBmi
- `8698` — _richPat
- `8704` — _richNum
- `8749` — _richPreselezione
- `8765` — richLeggiIntestazione
- `8769` — richSalvaIntestazione
- `8778` — apriRichiestaAnalisi
- `8798` — _richModaleHtml
- `8874` — _richEsc
- `8876` — _richMotivoCambia
- `8882` — _richToggleSez
- `8888` — _richAggiornaConteggi
- `8896` — _richMotivoCorrente
- `8906` — _richSelezione
- `8921` — _richTxt
- `8927` — _richCostruisciPDF
- `8936` — nuovaPagina
- `8937` — spazio
- `9023` — _richNomeFile
- `9028` — _richPrepara
- `9038` — _richRegistra
- `9052` — _richStato
- `9054` — richScaricaPDF
- `9069` — _richUpload
- `9097` — _richWaUrl
- `9104` — _richTestoWa
- `9118` — richInviaWhatsApp
- `9158` — richCopiaLink
- `9179` — _richStoricoHtml

---
### REFERTI DEL SANGUE DATATI — storico nel tempo (P118 tappa 1)
Righe 9194-9387 — migrazione, ordinamento, quadro attuale derivato, barra di selezione.

- `9441` — _refertoNuovoId
- `9444` — _refertoOggi
- `9448` — _refertoDataIt
- `9454` — _refertoConteggio
- `9468` — _refertiMigra
- `9495` — _refertiOrdinati
- `9506` — _refertoPiuRecente
- `9511` — _refertoInVista
- `9529` — _refertiApplica
- `9542` — _refertoCrea
- `9561` — refertoCambiaVista
- `9567` — refertoCambiaData
- `9579` — refertoNuovo
- `9587` — refertoDuplica
- `9596` — refertoElimina
- `9611` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `9367` — _rangeNum
- `9373` — _rangeTestoDa
- `9392` — _rangeCoppia
- `9402` — _rangeHtml

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 8246-8452

- `10234` — _ibFmtBreve
- `10243` — _renderPesiIntermediSection
- `10292` — aggiungiPesoIntermedio
- `10308` — eliminaPesoIntermedio
- `10318` — _ibSilhouetteSegmentale
- `10338` — pct
- `10344` — colMagra
- `10350` — colGrassa
- `10358` — colTroncoGrassa
- `10645` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 8724-8724

- `10917` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 9056-9607

- `11289` — aggiornaLabelMacros
- `11307` — calcolaMacros
- `11448` — applicaSchema
- `11456` — _renderRifPesoBox
- `11504` — _usaRifPeso
- `11508` — _aggiornaRifPesoTarget
- `11511` — _aggiornaRegimeSlider
- `12168` — _presetRegime
- `12172` — _initRegimeSliderDaPaziente
- `12190` — ricalcolaLAF
- `12332` — renderStoricoTDEE
- `12366` — attivaSlotTDEE
- `12374` — eliminaSlotTDEE
- `12387` — _toggleCiclizzazione
- `12393` — _aggiornaAnteprimaCiclizzazione
- `12411` — salvaCalcoloMacros
- `12525` — _metAllenamento
- `12541` — _neatFrazione
- `12615` — _larnLafStileVita
- `12632` — _regimeOffset
- `12642` — _componiRegimeText
- `12675` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `12687` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `12694` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `12764` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 9625-10055

- `12782` — renderTargetBadge
- `12811` — verificaRegola_75_20_5
- `12848` — renderBadge75_20_5
- `12913` — _validaNorm
- `12916` — _validaMatchTermine
- `12924` — _validaCostruisciListe
- `12928` — addA
- `12929` — addR
- `12930` — addE
- `12975` — _validaTesto
- `12996` — validaPiano
- `13070` — _validaFirmaBlocchi
- `13077` — renderBadgeValidatore
- `13108` — _validaVaiAlGiorno
- `13117` — apriPannelloValidatore
- `13124` — esc
- `13174` — _validaEseguiOverride
- `13197` — validaGateExport
- `13212` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 10065-10811

- `13222` — abbr
- `13227` — isSab
- `13229` — buildVistaA
- `13233` — righeCategoria
- `13285` — buildVistaB
- `13291` — barColor
- `13296` — barW
- `13304` — barRow
- `13325` — getTabContent
- `13329` — tabBtn
- `13345` — pianoPazSelezionato
- `13492` — renderPianoConPillTabs
- `13498` — _renderGiornoGen
- `13542` — _dc
- `13543` — _dd
- `13550` — rowG
- `13730` — renderPanelMacrosGiorno
- `13873` — pmgCambiaGrammi
- `13897` — riapriPiano
- `13935` — _montaPianoCorrente
- `13974` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 10821-11290

- `13984` — pullTemplateSupabase
- `13995` — delTemplateSupabase
- `14004` — _promptTemplateNome
- `14029` — _creaTemplateDaJSON
- `14052` — salvaComeTemplate
- `14063` — salvaComeTemplateDaPiano
- `14072` — _normNomeAlim
- `14073` — _escRegAlim
- `14074` — _raccogliAlimentiDaPiano
- `14085` — _alimentiEsclusiPaziente
- `14097` — _trovaConflittiTemplate
- `14115` — _mostraAvvisoConflitti
- `14139` — applicaTemplate
- `14157` — apriPickerTemplate
- `14185` — _pickPaziente
- `14204` — applicaTemplatePick
- `14208` — rinominaTemplate
- `14219` — eliminaTemplate
- `14229` — renderLibreriaTemplate
- `14258` — renderStoricoPiani
- `14317` — eliminaPiano
- `14333` — _getActiveMacrosTarget
- `14357` — getTargetAttivi
- `14394` — calcolaTargetsCiclizzazione
- `14420` — _setupPianoTargets
- `14444` — getStagioneCorrente
- `14453` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 11366-11599

- `14534` — _ricSlots
- `14813` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 11608-12076

- `14822` — aggiornaUIcolazione
- `14832` — salvaRegolePiano
- `14893` — _isModelloSistema
- `14896` — _isModelloSistemaModificato
- `14908` — caricaModelliCustomLocal
- `14922` — salvaModelliCustomLocal
- `14943` — _migraRecordCustom
- `14958` — _syncAliasLegacy
- `14967` — caricaAlimentiCustom
- `14991` — pushAlimentiCustomSupabase
- `15001` — pullAlimentiCustomSupabase
- `15015` — pushModelliSupabase
- `15033` — pullModelliSupabase
- `15058` — _calcolaFreqDaModello
- `15077` — aggiornaUImodello
- `15166` — popolaDropdownModelli
- `15194` — cambiaModelloRotazione
- `15200` — ripristinaModelloOriginale
- `15223` — eliminaModelloCustom
- `15241` — mostraAnteprimaModello
- `15251` — apriEditorModello
- `15281` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 12111-12625

- `15316` — rerender
- `15550` — _salvaModelloDaEditor
- `15592` — caricaRegolePiano
- `15622` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `15657` — _aiLogUsage
- `15679` — _aiProxyUrl
- `15685` — _aiTokenPerProxy
- `15714` — aiCall
- `15722` — fetchConTimeout
- `15738` — unTentativo
- `15788` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 12631-12838

- `15794` — _risolviCollisioniCelle
- `15861` — espandiPiano
- `15865` — al2
- `15866` — espPasto
- `15921` — getFruttaStile
- `15928` — _fruttaGetPasto
- `15938` — _fruttaContaRigheRicetta
- `15942` — _fruttaIndiceBasePasto
- `15962` — getFruttaMarker
- `15975` — fruttaMarkerHtml
- `15983` — _fruttaCheckboxHtml
- `15992` — toggleFrutta
- `16001` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 12874-14136

- `16037` — _renderCelleGriglia
- `16114` — _renderRicetteTestuali
- `16153` — scambiaRicette
- `16164` — _ricDragTrovaRigaSotto
- `16170` — _ricDragPulisciEvidenza
- `16173` — _onPointerMove
- `16189` — _onPointerUp
- `16224` — _renderCelleHtml
- `16232` — toggleCellaMenu
- `16251` — closeAllCellaMenus
- `16259` — _trovaPasto
- `16267` — cellaSposta
- `16321` — cellaCancella
- `16342` — apriEditGrammatura
- `16367` — salva
- `16397` — cellaSwap
- `16414` — cellaRimuoviAlt
- `16428` — cellaAggiungiAlt
- `16523` — _mostraPopupAggiungiAlt
- `16546` — renderLista
- `16609` — apriEditRicetta
- `16618` — aggiungiRicetta
- `16634` — rimuoviRicetta
- `16643` — _mostraPopupEditRicetta
- `16690` — renderListaRicette
- `16719` — renderRicettario
- `16722` — renderParziali
- `16726` — salvaRicetta
- `16805` — ngAggiungiSpuntinoVuoto
- `16821` — apriAggiungiCella
- `16832` — risolviCompatibili
- `16912` — _apriPopupRicettaComposta
- `16954` — aggiornaMacros
- `17004` — _mostraPopupSceltaCategoriaAlimento
- `17077` — vaiAlleCategorie
- `17145` — _aggiornaPianoBox
- `17172` — _renderGiornoAttivo
- `17300` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 14184-14565

- `17348` — _attesoStrutturaPiano
- `17368` — _confrontaStrutturaPiano
- `17398` — _costruisciPromptDelta
- `17425` — _pianoToolSchema
- `17500` — _pianoMaxTokens
- `17509` — _estraiPianoDaRisposta
- `17531` — chiamaGeneraPiano
- `17698` — mostraLoadingSteps
- `17701` — render
- `17729` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 14632-14834

- `17796` — generaMessaggioAI
- `17884` — copiaMessaggioAI
- `17894` — salvaInStorico
- `17906` — salvaVarianteAI
- `17921` — renderVariantiSalvate
- `17940` — usaVariante
- `17958` — eliminaVariante
- `17969` — renderStoricoMsg
- `17985` — apriWhatsApp
- `18353` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 15012-16510

- `18531` — _ngColoreSemaforoNome
- `18539` — apriSceltaModalitaPiano
- `18574` — _ngChiudiModalita
- `18577` — _ngCostruisciGiornoVuoto
- `18610` — _ngCostruisciGiornoSpeciale
- `18621` — _ngIndiceInizioSpeciali
- `18632` — _ngModalitaNomeGiorno
- `18638` — _ngImpostaModalitaNomeGiorno
- `18641` — _ngLettera
- `18648` — _ngEtichettaGiorno
- `18668` — _ngEtichettaGiornoBreve
- `18682` — _ngToggleGiornoSpeciale
- `18706` — _ngRenderPannelloSpeciale
- `18774` — _generaGiornoSpecialeAI
- `18874` — _ngGiornoHaContenuto
- `18886` — _ngCreaPianoManuale
- `18909` — _ngScrollTabGiorni
- `18919` — _ngAbilitaDragScroll
- `18956` — _ngCambiaNumeroGiorni
- `18988` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `19002` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `19043` — _ngToggleCat
- `19052` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `19076` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `19232` — _ngSalvaPianoManuale
- `19258` — _ngParseIngrediente
- `19282` — _ngScomponiIngredienti
- `19294` — _ricCalcolaMacroDaIngredienti
- `19312` — _ricRicalcolaMacroLive
- `19319` — _ricAggiornaInfoMacro
- `19333` — _ricRicalcolaMacroLiveNow
- `19357` — _ngTrovaCategoriaAlimento
- `19390` — _ngPescaRicetta
- `19433` — _ngScomponiRicettaNelPasto
- `19470` — _ngDragStart
- `19481` — _ngDragStartCella
- `19492` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `19499` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `19504` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `19523` — _ngAggiungiAlimento
- `19548` — _ngRimuoviAlimento
- `19562` — _ngDopoModifica
- `19580` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `19633` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `19662` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `19679` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `19687` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `19759` — gramTestoCasalingo
- `19785` — _appendToggleNutrizionali
- `19828` — _appendTogglePromemoria
- `19857` — _appendBtnConcetti
- `19871` — _refreshBtnConcetti
- `20003` — cpFromEmoji
- `20009` — getEmojiCp
- `20028` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `15057` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `18025` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `18030` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `18056` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `18144` — _spesaTestoWhatsApp
- `18160` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `18205` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `18228` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `18256` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `18316` — scaricaListaSpesaPDF (download diretto, un click)
- `18324` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `18336` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 16520-17544

- `20038` — fetchEmojiB64
- `20056` — _generaPDFSync
- `20141` — loadEmojiSync
- `20147` — drawEmoji
- `20158` — safe
- `20169` — setFont
- `20175` — measure
- `20181` — gramText
- `20190` — pastoOf
- `20199` — macroDelPasto
- `20244` — kcalDelPasto
- `20248` — macroDelGiorno
- `20266` — kcalDelGiorno
- `20269` — formatValori
- `20279` — drawCopertina
- `20412` — measurePasto
- `20462` — groupCelleByOrdine
- `20472` — cellHeight
- `20481` — drawDayHeader
- `20496` — drawPasto
- `20536` — stripEmojiPDF
- `20669` — drawCella
- `21006` — collectCp
- `21012` — getEmojiCpStandalone
- `21176` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 17554-17721

- `21186` — salvaInbody
- `21210` — delInbody
- `21217` — ascoltaProgresso
- `21235` — d
- `21236` — fD
- `21352` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 17749-18218

- `21380` — buildSemLegenda
- `21394` — renderAlEditor
- `21455` — _alimNomeRegex
- `21463` — _alimGiorniDaPiano
- `21471` — _scanGiorniPerNome
- `21486` — scanRiferimentiAlimento
- `21515` — _alimRefsRighe
- `21521` — rinominaAlimentoCustom
- `21538` — _renameInGiorni
- `21557` — _renameInPianoRecord
- `21609` — modificaAlimentoCustom
- `21629` — ripristinaValoriPrecedentiAlimento
- `21641` — _resetAlimModal
- `21652` — apriNuovoAlimentoCustom
- `21658` — salvaAlimentoCustom
- `21725` — eliminaAlimentoCustom
- `21756` — _alimFonteBadge
- `21761` — renderAlimentiPage
- `21764` — E
- `21831` — archiviaAlimentoCustom
- `21849` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 18245-18486

- `21876` — _bcSetStatus
- `21878` — apriScannerBarcode
- `21886` — chiudiScannerBarcode
- `21891` — _bcStopCamera
- `21899` — _bcModaleAperto
- `21901` — _bcAvviaCamera
- `21912` — _bcAvviaNativo
- `21932` — _bcAvviaZXing
- `21941` — _bcZXStart
- `21952` — _bcErroreCamera
- `21960` — cercaBarcodeManuale
- `21966` — _barcodeTrovato
- `21982` — cercaBarcodeOFF
- `22000` — _bcProdottoNonTrovato
- `22014` — _bcPrecompilaForm
- `22024` — num
- `22038` — togAl
- `22091` — selCatAl
- `22105` — selTuttiAl
- `22117` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 18500-18816

- `22131` — setCalView
- `22132` — calPrev
- `22133` — calNext
- `22134` — calToday
- `22136` — renderCal
- `22150` — renderCalMonth
- `22174` — renderCalWeek
- `22192` — renderCalDay
- `22208` — selGiorno
- `22222` — setDisp
- `22227` — openAddEvento
- `22240` — openAddEventoPaz
- `22246` — toggleEntrataCheck
- `22251` — salvaEvento
- `22274` — openEvDetail
- `22329` — delEvento
- `22337` — copyMsg
- `22344` — aggDateCal
- `22349` — syncInizio
- `22350` — syncControllo
- `22351` — aggiornaPrev
- `22368` — renderRic
- `22395` — openNuovaRic
- `22396` — editRic
- `22406` — salvaRic
- `22431` — delRic
- `22447` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 18901-18961

- `22532` — aggiungiEntrataPerPaziente
- `22549` — openNuovaEntrata
- `22563` — salvaEntrata
- `22584` — delEntrata
- `22592` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 18991-19345

- `22622` — aiSuggerisciRicetta
- `22667` — renderConcettiModal
- `22686` — apriConcettiModal
- `22713` — salvaConcettiAllegati
- `22731` — loadInbodyPDF
- `22813` — _vitdLabel
- `22817` — getIntegratori
- `22821` — getIntegraWant
- `22825` — setIntegratori
- `22842` — setIntegraWant
- `22853` — getPatologieChip
- `22854` — getAllergieChip
- `22855` — setPatologieChip
- `22856` — setAllergieChip
- `22857` — getPatologie
- `22858` — getAllergie
- `22859` — setPatologieFromStr
- `22866` — setAllergieFromStr
- `22879` — getSdvChip
- `22880` — getCspChip
- `22881` — setSdvChip
- `22882` — setCspChip
- `22883` — setSdvFromStr
- `22884` — setCspFromStr
- `22888` — getBudget
- `22889` — setBudget
- `22894` — renderCalAnno
- `22925` — comprimeImmagine
- `22947` — uploadImmagineConcetto
- `22966` — rimuoviImmagineConcetto
- `22976` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 19411-19515

- `23042` — entraSelConcetti
- `23043` — annullaSelConcetti
- `23044` — toggleConcettoSel
- `23049` — eliminaConcettiSelezionati
- `23068` — confermaEliminaConcetti
- `23083` — aiRiscriviConcetto
- `23097` — editConcetto
- `23115` — salvaConcetto
- `23126` — openNuovoConcetto
- `23146` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 19516-19679

- `23147` — saveAgendaPersonale
- `23148` — getAgendaTodo
- `23149` — saveAgendaTodo
- `23151` — pulisciAgendaVecchia
- `23155` — navigaAgenda
- `23164` — toggleFormAgenda
- `23165` — toggleFormTodo
- `23167` — salvaAgendaItem
- `23181` — salvaTodoItem
- `23193` — toggleAgendaFatto
- `23201` — toggleTodoFatto
- `23214` — _catCol
- `23216` — renderAgendaDx
- `23310` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 19805-20009

- `23436` — renderScadenzeAlert
- `23621` — segnaGestito
- `23640` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 20018-20089

- `23649` — ripristinaPaz
- `23657` — eliminaPaz
- `23702` — getDove
- `23706` — setDove
- `23724` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 20094-20533

- `23729` — getCredenzialiPersistenti
- `23742` — cancellaCredenzialiPersistenti
- `23747` — rinnovaSessioneConRefreshToken
- `23764` — getSessioneSalvata
- `23783` — salvaSessione
- `23793` — cancellaSessione
- `23797` — eseguiLogin
- `23844` — eseguiLogout
- `23866` — mostraApp
- `23871` — verificaSessioneEAvvia
- `23899` — assicuraTokenValido
- `23928` — _garantiscoSessionePerSync
- `23940` — avviaRinnovoTokenPeriodico
- `23944` — fermaRinnovoTokenPeriodico
- `23953` — _authReset
- `23958` — _authMostra
- `23961` — mostraLogin
- `23962` — mostraRegistrazione
- `23963` — mostraRecupero
- `23964` — mostraNuovaPassword
- `23967` — eseguiRegistrazione
- `24005` — eseguiRecuperoPassword
- `24034` — eseguiNuovaPassword
- `24068` — _parseHashParams
- `24075` — _pulisciHash
- `24079` — gestisciRitornoAuth
- `24169` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 20605-20862

- `24241` — apriPannelloRicette
- `24270` — chiudiPannelloRicette
- `24278` — applicaRicettaPasto
- `24314` — inizializzaP2
- `24326` — deepClone
- `24330` — applicaPatch
- `24364` — _aggiornaLabelSalvaPiano
- `24457` — getHint
- `24462` — validaInput
- `24487` — attacca
- `24494` — attaccaTutti
- `24502` — wireCatChips

---
