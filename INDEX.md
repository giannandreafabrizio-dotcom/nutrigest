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

- `9193` — renderPdAnalisi
- `9237` — toggleAnalisiSection
- `9247` — loadAnalisiSanguePDF
- `9321` — mostraDiffAnalisi
- `9394` — _calcoloIncluso
- `9400` — toggleCalcoloIncluso
- `9422` — _renderCalcoliPannello
- `9458` — toggleGlossario
- `9463` — updateAnalisi
- `9516` — salvaAnalisi
- `9529` — applicaGruppoClinico
- `9558` — renderBoxGruppiCliniciSuggeriti
- `9590` — suggerisciGruppiClinici
- `9670` — renderMemoriaInbody

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


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 8246-8452

- `9718` — _ibFmtBreve
- `9727` — _renderPesiIntermediSection
- `9776` — aggiungiPesoIntermedio
- `9792` — eliminaPesoIntermedio
- `9802` — _ibSilhouetteSegmentale
- `9822` — pct
- `9828` — colMagra
- `9834` — colGrassa
- `9842` — colTroncoGrassa
- `10129` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 8724-8724

- `10401` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 9056-9607

- `10773` — aggiornaLabelMacros
- `10791` — calcolaMacros
- `10932` — applicaSchema
- `10940` — _renderRifPesoBox
- `10988` — _usaRifPeso
- `10992` — _aggiornaRifPesoTarget
- `10995` — _aggiornaRegimeSlider
- `11652` — _presetRegime
- `11656` — _initRegimeSliderDaPaziente
- `11674` — ricalcolaLAF
- `11816` — renderStoricoTDEE
- `11850` — attivaSlotTDEE
- `11858` — eliminaSlotTDEE
- `11871` — _toggleCiclizzazione
- `11877` — _aggiornaAnteprimaCiclizzazione
- `11895` — salvaCalcoloMacros
- `12009` — _metAllenamento
- `12025` — _neatFrazione
- `12099` — _larnLafStileVita
- `12116` — _regimeOffset
- `12126` — _componiRegimeText
- `12159` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `12171` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `12178` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `12248` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 9625-10055

- `12266` — renderTargetBadge
- `12295` — verificaRegola_75_20_5
- `12332` — renderBadge75_20_5
- `12397` — _validaNorm
- `12400` — _validaMatchTermine
- `12408` — _validaCostruisciListe
- `12412` — addA
- `12413` — addR
- `12414` — addE
- `12459` — _validaTesto
- `12480` — validaPiano
- `12554` — _validaFirmaBlocchi
- `12561` — renderBadgeValidatore
- `12592` — _validaVaiAlGiorno
- `12601` — apriPannelloValidatore
- `12608` — esc
- `12658` — _validaEseguiOverride
- `12681` — validaGateExport
- `12696` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 10065-10811

- `12706` — abbr
- `12711` — isSab
- `12713` — buildVistaA
- `12717` — righeCategoria
- `12769` — buildVistaB
- `12775` — barColor
- `12780` — barW
- `12788` — barRow
- `12809` — getTabContent
- `12813` — tabBtn
- `12829` — pianoPazSelezionato
- `12976` — renderPianoConPillTabs
- `12982` — _renderGiornoGen
- `13026` — _dc
- `13027` — _dd
- `13034` — rowG
- `13214` — renderPanelMacrosGiorno
- `13357` — pmgCambiaGrammi
- `13381` — riapriPiano
- `13419` — _montaPianoCorrente
- `13458` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 10821-11290

- `13468` — pullTemplateSupabase
- `13479` — delTemplateSupabase
- `13488` — _promptTemplateNome
- `13513` — _creaTemplateDaJSON
- `13536` — salvaComeTemplate
- `13547` — salvaComeTemplateDaPiano
- `13556` — _normNomeAlim
- `13557` — _escRegAlim
- `13558` — _raccogliAlimentiDaPiano
- `13569` — _alimentiEsclusiPaziente
- `13581` — _trovaConflittiTemplate
- `13599` — _mostraAvvisoConflitti
- `13623` — applicaTemplate
- `13641` — apriPickerTemplate
- `13669` — _pickPaziente
- `13688` — applicaTemplatePick
- `13692` — rinominaTemplate
- `13703` — eliminaTemplate
- `13713` — renderLibreriaTemplate
- `13742` — renderStoricoPiani
- `13801` — eliminaPiano
- `13817` — _getActiveMacrosTarget
- `13841` — getTargetAttivi
- `13878` — calcolaTargetsCiclizzazione
- `13904` — _setupPianoTargets
- `13928` — getStagioneCorrente
- `13937` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 11366-11599

- `14018` — _ricSlots
- `14297` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 11608-12076

- `14306` — aggiornaUIcolazione
- `14316` — salvaRegolePiano
- `14377` — _isModelloSistema
- `14380` — _isModelloSistemaModificato
- `14392` — caricaModelliCustomLocal
- `14406` — salvaModelliCustomLocal
- `14427` — _migraRecordCustom
- `14442` — _syncAliasLegacy
- `14451` — caricaAlimentiCustom
- `14475` — pushAlimentiCustomSupabase
- `14485` — pullAlimentiCustomSupabase
- `14499` — pushModelliSupabase
- `14517` — pullModelliSupabase
- `14542` — _calcolaFreqDaModello
- `14561` — aggiornaUImodello
- `14650` — popolaDropdownModelli
- `14678` — cambiaModelloRotazione
- `14684` — ripristinaModelloOriginale
- `14707` — eliminaModelloCustom
- `14725` — mostraAnteprimaModello
- `14735` — apriEditorModello
- `14765` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 12111-12625

- `14800` — rerender
- `15034` — _salvaModelloDaEditor
- `15076` — caricaRegolePiano
- `15106` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `15141` — _aiLogUsage
- `15163` — _aiProxyUrl
- `15169` — _aiTokenPerProxy
- `15198` — aiCall
- `15206` — fetchConTimeout
- `15222` — unTentativo
- `15272` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 12631-12838

- `15278` — _risolviCollisioniCelle
- `15345` — espandiPiano
- `15349` — al2
- `15350` — espPasto
- `15405` — getFruttaStile
- `15412` — _fruttaGetPasto
- `15422` — _fruttaContaRigheRicetta
- `15426` — _fruttaIndiceBasePasto
- `15446` — getFruttaMarker
- `15459` — fruttaMarkerHtml
- `15467` — _fruttaCheckboxHtml
- `15476` — toggleFrutta
- `15485` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 12874-14136

- `15521` — _renderCelleGriglia
- `15598` — _renderRicetteTestuali
- `15637` — scambiaRicette
- `15648` — _ricDragTrovaRigaSotto
- `15654` — _ricDragPulisciEvidenza
- `15657` — _onPointerMove
- `15673` — _onPointerUp
- `15708` — _renderCelleHtml
- `15716` — toggleCellaMenu
- `15735` — closeAllCellaMenus
- `15743` — _trovaPasto
- `15751` — cellaSposta
- `15805` — cellaCancella
- `15826` — apriEditGrammatura
- `15851` — salva
- `15881` — cellaSwap
- `15898` — cellaRimuoviAlt
- `15912` — cellaAggiungiAlt
- `16007` — _mostraPopupAggiungiAlt
- `16030` — renderLista
- `16093` — apriEditRicetta
- `16102` — aggiungiRicetta
- `16118` — rimuoviRicetta
- `16127` — _mostraPopupEditRicetta
- `16174` — renderListaRicette
- `16203` — renderRicettario
- `16206` — renderParziali
- `16210` — salvaRicetta
- `16289` — ngAggiungiSpuntinoVuoto
- `16305` — apriAggiungiCella
- `16316` — risolviCompatibili
- `16396` — _apriPopupRicettaComposta
- `16438` — aggiornaMacros
- `16488` — _mostraPopupSceltaCategoriaAlimento
- `16561` — vaiAlleCategorie
- `16629` — _aggiornaPianoBox
- `16656` — _renderGiornoAttivo
- `16784` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 14184-14565

- `16832` — _attesoStrutturaPiano
- `16852` — _confrontaStrutturaPiano
- `16882` — _costruisciPromptDelta
- `16909` — _pianoToolSchema
- `16984` — _pianoMaxTokens
- `16993` — _estraiPianoDaRisposta
- `17015` — chiamaGeneraPiano
- `17182` — mostraLoadingSteps
- `17185` — render
- `17213` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 14632-14834

- `17280` — generaMessaggioAI
- `17368` — copiaMessaggioAI
- `17378` — salvaInStorico
- `17390` — salvaVarianteAI
- `17405` — renderVariantiSalvate
- `17424` — usaVariante
- `17442` — eliminaVariante
- `17453` — renderStoricoMsg
- `17469` — apriWhatsApp
- `17837` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 15012-16510

- `18015` — _ngColoreSemaforoNome
- `18023` — apriSceltaModalitaPiano
- `18058` — _ngChiudiModalita
- `18061` — _ngCostruisciGiornoVuoto
- `18094` — _ngCostruisciGiornoSpeciale
- `18105` — _ngIndiceInizioSpeciali
- `18116` — _ngModalitaNomeGiorno
- `18122` — _ngImpostaModalitaNomeGiorno
- `18125` — _ngLettera
- `18132` — _ngEtichettaGiorno
- `18152` — _ngEtichettaGiornoBreve
- `18166` — _ngToggleGiornoSpeciale
- `18190` — _ngRenderPannelloSpeciale
- `18258` — _generaGiornoSpecialeAI
- `18358` — _ngGiornoHaContenuto
- `18370` — _ngCreaPianoManuale
- `18393` — _ngScrollTabGiorni
- `18403` — _ngAbilitaDragScroll
- `18440` — _ngCambiaNumeroGiorni
- `18472` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `18486` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `18527` — _ngToggleCat
- `18536` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `18560` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `18716` — _ngSalvaPianoManuale
- `18742` — _ngParseIngrediente
- `18766` — _ngScomponiIngredienti
- `18778` — _ricCalcolaMacroDaIngredienti
- `18796` — _ricRicalcolaMacroLive
- `18803` — _ricAggiornaInfoMacro
- `18817` — _ricRicalcolaMacroLiveNow
- `18841` — _ngTrovaCategoriaAlimento
- `18874` — _ngPescaRicetta
- `18917` — _ngScomponiRicettaNelPasto
- `18954` — _ngDragStart
- `18965` — _ngDragStartCella
- `18976` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `18983` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `18988` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `19007` — _ngAggiungiAlimento
- `19032` — _ngRimuoviAlimento
- `19046` — _ngDopoModifica
- `19064` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `19117` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `19146` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `19163` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `19171` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `19243` — gramTestoCasalingo
- `19269` — _appendToggleNutrizionali
- `19312` — _appendTogglePromemoria
- `19341` — _appendBtnConcetti
- `19355` — _refreshBtnConcetti
- `19487` — cpFromEmoji
- `19493` — getEmojiCp
- `19512` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `15057` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `17509` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `17514` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `17540` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `17628` — _spesaTestoWhatsApp
- `17644` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `17689` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `17712` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `17740` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `17800` — scaricaListaSpesaPDF (download diretto, un click)
- `17808` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `17820` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 16520-17544

- `19522` — fetchEmojiB64
- `19540` — _generaPDFSync
- `19625` — loadEmojiSync
- `19631` — drawEmoji
- `19642` — safe
- `19653` — setFont
- `19659` — measure
- `19665` — gramText
- `19674` — pastoOf
- `19683` — macroDelPasto
- `19728` — kcalDelPasto
- `19732` — macroDelGiorno
- `19750` — kcalDelGiorno
- `19753` — formatValori
- `19763` — drawCopertina
- `19896` — measurePasto
- `19946` — groupCelleByOrdine
- `19956` — cellHeight
- `19965` — drawDayHeader
- `19980` — drawPasto
- `20020` — stripEmojiPDF
- `20153` — drawCella
- `20490` — collectCp
- `20496` — getEmojiCpStandalone
- `20660` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 17554-17721

- `20670` — salvaInbody
- `20694` — delInbody
- `20701` — ascoltaProgresso
- `20719` — d
- `20720` — fD
- `20836` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 17749-18218

- `20864` — buildSemLegenda
- `20878` — renderAlEditor
- `20939` — _alimNomeRegex
- `20947` — _alimGiorniDaPiano
- `20955` — _scanGiorniPerNome
- `20970` — scanRiferimentiAlimento
- `20999` — _alimRefsRighe
- `21005` — rinominaAlimentoCustom
- `21022` — _renameInGiorni
- `21041` — _renameInPianoRecord
- `21093` — modificaAlimentoCustom
- `21113` — ripristinaValoriPrecedentiAlimento
- `21125` — _resetAlimModal
- `21136` — apriNuovoAlimentoCustom
- `21142` — salvaAlimentoCustom
- `21209` — eliminaAlimentoCustom
- `21240` — _alimFonteBadge
- `21245` — renderAlimentiPage
- `21248` — E
- `21315` — archiviaAlimentoCustom
- `21333` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 18245-18486

- `21360` — _bcSetStatus
- `21362` — apriScannerBarcode
- `21370` — chiudiScannerBarcode
- `21375` — _bcStopCamera
- `21383` — _bcModaleAperto
- `21385` — _bcAvviaCamera
- `21396` — _bcAvviaNativo
- `21416` — _bcAvviaZXing
- `21425` — _bcZXStart
- `21436` — _bcErroreCamera
- `21444` — cercaBarcodeManuale
- `21450` — _barcodeTrovato
- `21466` — cercaBarcodeOFF
- `21484` — _bcProdottoNonTrovato
- `21498` — _bcPrecompilaForm
- `21508` — num
- `21522` — togAl
- `21575` — selCatAl
- `21589` — selTuttiAl
- `21601` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 18500-18816

- `21615` — setCalView
- `21616` — calPrev
- `21617` — calNext
- `21618` — calToday
- `21620` — renderCal
- `21634` — renderCalMonth
- `21658` — renderCalWeek
- `21676` — renderCalDay
- `21692` — selGiorno
- `21706` — setDisp
- `21711` — openAddEvento
- `21724` — openAddEventoPaz
- `21730` — toggleEntrataCheck
- `21735` — salvaEvento
- `21758` — openEvDetail
- `21813` — delEvento
- `21821` — copyMsg
- `21828` — aggDateCal
- `21833` — syncInizio
- `21834` — syncControllo
- `21835` — aggiornaPrev
- `21852` — renderRic
- `21879` — openNuovaRic
- `21880` — editRic
- `21890` — salvaRic
- `21915` — delRic
- `21931` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 18901-18961

- `22016` — aggiungiEntrataPerPaziente
- `22033` — openNuovaEntrata
- `22047` — salvaEntrata
- `22068` — delEntrata
- `22076` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 18991-19345

- `22106` — aiSuggerisciRicetta
- `22151` — renderConcettiModal
- `22170` — apriConcettiModal
- `22197` — salvaConcettiAllegati
- `22215` — loadInbodyPDF
- `22297` — _vitdLabel
- `22301` — getIntegratori
- `22305` — getIntegraWant
- `22309` — setIntegratori
- `22326` — setIntegraWant
- `22337` — getPatologieChip
- `22338` — getAllergieChip
- `22339` — setPatologieChip
- `22340` — setAllergieChip
- `22341` — getPatologie
- `22342` — getAllergie
- `22343` — setPatologieFromStr
- `22350` — setAllergieFromStr
- `22363` — getSdvChip
- `22364` — getCspChip
- `22365` — setSdvChip
- `22366` — setCspChip
- `22367` — setSdvFromStr
- `22368` — setCspFromStr
- `22372` — getBudget
- `22373` — setBudget
- `22378` — renderCalAnno
- `22409` — comprimeImmagine
- `22431` — uploadImmagineConcetto
- `22450` — rimuoviImmagineConcetto
- `22460` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 19411-19515

- `22526` — entraSelConcetti
- `22527` — annullaSelConcetti
- `22528` — toggleConcettoSel
- `22533` — eliminaConcettiSelezionati
- `22552` — confermaEliminaConcetti
- `22567` — aiRiscriviConcetto
- `22581` — editConcetto
- `22599` — salvaConcetto
- `22610` — openNuovoConcetto
- `22630` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 19516-19679

- `22631` — saveAgendaPersonale
- `22632` — getAgendaTodo
- `22633` — saveAgendaTodo
- `22635` — pulisciAgendaVecchia
- `22639` — navigaAgenda
- `22648` — toggleFormAgenda
- `22649` — toggleFormTodo
- `22651` — salvaAgendaItem
- `22665` — salvaTodoItem
- `22677` — toggleAgendaFatto
- `22685` — toggleTodoFatto
- `22698` — _catCol
- `22700` — renderAgendaDx
- `22794` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 19805-20009

- `22920` — renderScadenzeAlert
- `23105` — segnaGestito
- `23124` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 20018-20089

- `23133` — ripristinaPaz
- `23141` — eliminaPaz
- `23186` — getDove
- `23190` — setDove
- `23208` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 20094-20533

- `23213` — getCredenzialiPersistenti
- `23226` — cancellaCredenzialiPersistenti
- `23231` — rinnovaSessioneConRefreshToken
- `23248` — getSessioneSalvata
- `23267` — salvaSessione
- `23277` — cancellaSessione
- `23281` — eseguiLogin
- `23328` — eseguiLogout
- `23350` — mostraApp
- `23355` — verificaSessioneEAvvia
- `23383` — assicuraTokenValido
- `23412` — _garantiscoSessionePerSync
- `23424` — avviaRinnovoTokenPeriodico
- `23428` — fermaRinnovoTokenPeriodico
- `23437` — _authReset
- `23442` — _authMostra
- `23445` — mostraLogin
- `23446` — mostraRegistrazione
- `23447` — mostraRecupero
- `23448` — mostraNuovaPassword
- `23451` — eseguiRegistrazione
- `23489` — eseguiRecuperoPassword
- `23518` — eseguiNuovaPassword
- `23552` — _parseHashParams
- `23559` — _pulisciHash
- `23563` — gestisciRitornoAuth
- `23653` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 20605-20862

- `23725` — apriPannelloRicette
- `23754` — chiudiPannelloRicette
- `23762` — applicaRicettaPasto
- `23798` — inizializzaP2
- `23810` — deepClone
- `23814` — applicaPatch
- `23848` — _aggiornaLabelSalvaPiano
- `23941` — getHint
- `23946` — validaInput
- `23971` — attacca
- `23978` — attaccaTutti
- `23986` — wireCatChips

---
