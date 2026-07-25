# NutriGest — INDEX.md

Mappa funzioni → righe di `index.html`, organizzata per area funzionale.
Numeri di riga riallineati automaticamente il 25 luglio 2026 (P119 pescata bilanciata dell'ispirazione + P120 storico InBody ordinato e data del test): ricalcolate tutte le voci, aggiunte `_ricPescaBilanciata`, `_ibNormalizzaData`, `_ibOrdinaPerData`, e **ricalcolati anche i range "Righe A-B" di ogni sezione**, che erano rimasti indietro rispetto alle voci. Rigenerato per intero il 14 luglio 2026 sera (script Python su tutte le `function`/`async function` top-level, incluse le assegnazioni `window.X = function`). Righe totali file: 25063.

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
Righe 2347-2389

- `2347` — _slugAlimento
- `2355` — _catalogoIndicizza
- `2359` — _catalogoDeindicizza
- `2366` — costruisciCatalogo
- `2389` — risolviAlimento

---

### MACROS PIANO — calcolo e badge macro reali vs target
Righe 2404-2667

- `2404` — getValoriCREA
- `2416` — getCurrentPaziente
- `2436` — getKcalWeekend
- `2493` — getMacrosRicettaComposta
- `2499` — calcolaMacrosPiano
- `2601` — renderBadgeMacrosReali
- `2611` — pctStr
- `2612` — color
- `2625` — row
- `2667` — renderBadgeMacrosReali_DOM

---

### ANALISI DEL SANGUE — parsing, indici clinici derivati, interpretazione
Righe 2915-3087

- `2915` — _parseAnalisiNum
- `2923` — calcolaIndice
- `3061` — interpretaAnalisi
- `3073` — _interpAnalisiHtml
- `3087` — mostraInfoRange

---

### CONCETTI EDUCATIVI — sync Supabase, migrazione
Righe 3230-3254

- `3230` — pushConcetiSupabase
- `3240` — pullConcetiSupabase
- `3254` — migraConcetti

---

### ALIMENTI — categorie funzionali/semaforo, chip UI, equivalenze porzioni
Righe 3439-3685

- `3439` — getCategoriaSemaforo
- `3456` — _getCategorieGruppo
- `3470` — calcolaGrammaturaEquivalente
- `3487` — criterioByCat
- `3498` — suggerisciGrEquivalente
- `3543` — arrotondaPorzioneDiscreta
- `3557` — getCategoriaFunzionale
- `3597` — catArr
- `3613` — _tagComuniTrova
- `3617` — getTagComuniChip
- `3620` — setTagComuniChip
- `3628` — setCatChips
- `3641` — getStagioniChip
- `3644` — setStagioniChip
- `3651` — getProfiloChip
- `3654` — setProfiloChip
- `3663` — wireChipGroup
- `3674` — wireAttrChipGroups
- `3685` — wireRadioChipGroup

---

### CONFIG / STORAGE LOCALE — cfg, localStorage db, util data/valuta
Righe 3713-4086

- `3713` — getCfg
- `3714` — saveCfgL
- `3715` — getUrl
- `3716` — saveLocal
- `3717` — loadLocal
- `3724` — uid
- `3725` — today
- `3726` — addDays
- `3727` — fData
- `3728` — fEur
- `3730` — getLastSyncText
- `3740` — getSyncColor
- `3748` — aggiornaStatoSync
- `3774` — setSyncStatus
- `4040` — _registraTombstone
- `4048` — _tombstoneAttivi
- `4060` — _fondiTombstones
- `4074` — _mergeTombstonesRemoti *(dal 24/7 legge il meta da `collections`, P74 1d)*
- `4086` — _applicaTombstones
- `3947` — _pazFetchMeta *(P74 1d — solo `collections`)*
- `3968` — _collectionsUpsert *(P74 — scrittura primaria dei 4 meta-record dal cutover 1d)*
- `3990` — _collectionsFetch *(P74 1d — lettura unica dei meta-record)*
- `4013` — _analisiSangueUpsert *(P74 fase 2 — scrittura ombra analisi del sangue, 24/7)*

---

### SYNC SUPABASE — push/pull ricette/pazienti, tombstones, conflitti (P69)
Righe 4110-4495

- `4110` — supaHeaders
- `4124` — pushRicetteSupabase
- `4149` — pullRicetteSupabase
- `4171` — delRicetteSupabase
- `4183` — delPazienteSupabase
- `4198` — pushToSheets
- `4242` — pullFromSheets
- `4321` — syncNow
- `4334` — sincronizzaTutto
- `4360` — stpSet
- `4365` — stpMsg
- `4465` — testConnSupabase
- `4495` — _p68LogSaveAnonimo

---

### SYNC SUPABASE — save paziente, piani/cache piano, entrate, eventi
Righe 4509-5025

- `4509` — save
- `4527` — _pushRigaPerId
- `4560` — _flushDirtyIds
- `4643` — _p69LoadBaseline
- `4646` — _p69StoreBaseline
- `4649` — _p69SetBaseline
- `4653` — _p69DropBaseline
- `4657` — _p69SetBaselineFromRows
- `4663` — _p69NomePaz
- `4668` — _p69InList
- `4676` — _p69RilevaConflitti
- `4712` — _p69DialogoConflitti
- `4738` — chiudi
- `4746` — _p69RisolviRicarica
- `4775` — _p69EsportaLocali
- `4788` — _p69RisolviSovrascrivi
- `4801` — pushPianoSupabase
- `4823` — pullPianiSupabase
- `4839` — delPianoSupabase
- `4855` — delPianiPazienteSupabase
- `4867` — pushCachePianoSupabase
- `4884` — caricaCachePianoSupabase
- `4906` — pushEntrateSupabase
- `4930` — pullEntrateSupabase
- `4944` — delEntrataSupabase
- `4952` — pushEntrataSupabase
- `4963` — pushEventoSupabase
- `4976` — pushEventiSupabase
- `5000` — pullEventiSupabase
- `5014` — delEventoSupabase
- `5025` — _pianoCacheKey

---

### UI GENERALE — config AI key, notifiche, navigazione (goTo/tab/modali)
Righe 5052-5164

- `5052` — _salvaPianoCache
- `5057` — _caricaPianoCache
- `5063` — salvaCfg
- `5064` — testConn
- `5071` — testaAntKey
- `5082` — initAntCard
- `5085` — esporta
- `5086` — importa
- `5091` — goTo
- `5108` — closeM
- `5116` — ngChiudiModale
- `5125` — ngChiudiPopupCoppia
- `5129` — ngAggiungiX
- `5140` — ngUpgradeModali
- `5160` — mTab
- `5161` — aggiornaEta
- `5162` — toggleOrarioNote
- `5163` — pdTab
- `5164` — notif

---

### PAZIENTI — registro: lista/card/kanban, apertura, editing, salvataggio, routine
Righe 5172-7021

- `5172` — getPazView
- `5173` — setPazView
- `5182` — _pazStatoPiano
- `5190` — _pazUrgenzaControllo
- `5197` — _pazStatoTagHtml
- `5206` — _pazAggiornaFiltroRegimi
- `5214` — renderPaz
- `5267` — _renderPazCard
- `5292` — _renderPazLista
- `5319` — _renderPazKanban
- `5357` — openNuovoPaz
- `5383` — editPaz
- `5446` — applicaRegoloSemaforo
- `5957` — trovaChiaveAlimento
- `5966` — salvaPaz
- `6024` — openPaz
- `6708` — renderPdRoutine
- `6723` — cardHTML
- `6850` — updateRoutineCampo
- `6858` — suggerisciPastoEQuando
- `6885` — filtroLibreria
- `6894` — renderLibreriaGrid
- `6915` — aggiungiDaLibreriaIdx
- `6939` — openModalRoutine
- `6946` — salvaRoutineVoce
- `6971` — salvaRoutine
- `6978` — mostraRoutinePopup
- `7006` — removeRoutineVoce
- `7021` — _renderAggiustamentiSection

---

### 📈 PERCORSO — timeline di periodizzazione (P115 Tappe 1-5 COMPLETE, 24 lug 2026)
Righe 6021-6621 (numeri ESATTI al 24/7 notte, dopo la Tappa 5). ⚠️ Questo blocco (~600 righe) fa slittare tutti i numeri delle sezioni SUCCESSIVE a riga ~6020 rispetto all'ultima rigenerazione completa: per quelle sezioni fare grep di conferma. Rigenerazione completa alla prossima modifica strutturale.

- `6068` — _PERCORSO_TIPI (const: tipi fase, colori, pct default)
- `6075` — _percorsoGet *(normalizza p.percorso, scarta fasi invalide)*
- `6086` — _percorsoIsoLocal *(data → YYYY-MM-DD LOCALE, mai toISOString/UTC)*
- `6092` — _percorsoIntervalli *(fasi consecutive → date concrete dal/al)*
- `6106` — _percorsoFaseAt *(fase attiva a una data; dal incluso, al escluso)*
- `6115` — _percorsoKcalFase *(pct → kcal indicative via calcolaTDEE)*
- `6138` — _percorsoProiezione *(Tappa 2 — proiezione ibrida teorica/calibrata, cono, obiettivo a intervallo)*
- `6196` — _percorsoDataBreve *(ISO → "12 set")*
- `6213` — _percorsoSerieEnergia *(Tappa 3 — serie introito/TDEE stimato/TDEE osservato per la corsia energia)*
- `6252` — _percorsoSerieMassaMagra *(Tappa 4 — solo InBody: punti {data,m,pg})*
- `6271` — _percorsoConsuntivo *(Tappa 5 — legge p.consuntivo scritto da P50: aderenza, extra kcal, ritardo=extra÷7700, settimane perse; oggi sempre ok:false)*
- `6313` — _PERCORSO_LAYERS_DEFAULT / _percorsoLayersState / _percorsoLayersGet *(Tappa 4 — stato interruttori, SOLO sessione, mai su p)*
- `6318` — percorsoLayerToggle *(Tappa 4 — inverte un solo strato)*
- `6324` — percorsoVistaPreset *(Tappa 4 — preset "tecnica"/"paziente")*
- `6332` — _percorsoPaz *(e a seguire i mutatori percorsoInit/SetInizio/AddFase/UpdFase/DelFase/MoveFase)*
- `6374` — _percorsoChartSvg *(due corsie: peso + massa magra + cono proiezione sopra, striscia aderenza in mezzo (solo con dati P50), energia (kcal) sotto — tutto gated dagli interruttori)*
- `6563` — renderPdPercorso *(scheda: badge fase, riga proiezione/obiettivo, riga Piano vs Realtà (solo con dati), toolbar interruttori, grafico, editor)*

*(Tappa 2 tocca anche `calcolaMacros`: box obiettivo con intervallo al posto della data secca.)*

---

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 7106-7810

- `7106` — salvaAggiustamento
- `7139` — eliminaAggiustamento
- `7148` — renderPdNote
- `7183` — salvaNotaClinica
- `7198` — deleteNota
- `7207` — saveNote
- `7722` — _applicaRegoloSemaforoLEGACY
- `7763` — resetSemaforoAuto
- `7810` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 7957-8155

- `7957` — avviaFX
- `7985` — avviaAnalisi
- `8002` — _renderFlussoPanel
- `8046` — _riepEsc
- `8050` — _riepNum
- `8056` — _riepDelta
- `8064` — _riepDataSig
- `8082` — _riepParseFX
- `8087` — clean
- `8096` — _riepAggiornaFX
- `8122` — _riepToggleDomandaDefault
- `8134` — _riepAddDomanda
- `8147` — _riepRemoveDomanda
- `8155` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 8218-8593

- `8218` — dCol
- `8336` — card
- `8367` — renderPdRagionamento
- `8455` — inviaMessaggioRag
- `8473` — concludiERiassumi
- `8487` — salvaRagionamento
- `8508` — apriGeneratoreDaRag
- `8516` — nuovaSessioneRag
- `8522` — cancellaSavedRag
- `8532` — renderPazTimeline
- `8564` — renderPdAnamnesi
- `8593` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 10002-10534

- `10002` — renderPdAnalisi
- `10051` — toggleAnalisiSection
- `10061` — loadAnalisiSanguePDF
- `10153` — mostraDiffAnalisi
- `10252` — _calcoloIncluso
- `10258` — toggleCalcoloIncluso
- `10280` — _renderCalcoliPannello
- `10316` — toggleGlossario
- `10321` — updateAnalisi
- `10380` — salvaAnalisi
- `10393` — applicaGruppoClinico
- `10422` — renderBoxGruppiCliniciSuggeriti
- `10454` — suggerisciGruppiClinici
- `10534` — renderMemoriaInbody

---
### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9176 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `8719` — _richVal
- `8726` — _richBmi
- `8731` — _richPat
- `8737` — _richNum
- `8782` — _richPreselezione
- `8798` — richLeggiIntestazione
- `8802` — richSalvaIntestazione
- `8811` — apriRichiestaAnalisi
- `8831` — _richModaleHtml
- `8907` — _richEsc
- `8909` — _richMotivoCambia
- `8915` — _richToggleSez
- `8921` — _richAggiornaConteggi
- `8929` — _richMotivoCorrente
- `8939` — _richSelezione
- `8954` — _richTxt
- `8960` — _richCostruisciPDF
- `8969` — nuovaPagina
- `8970` — spazio
- `9056` — _richNomeFile
- `9061` — _richPrepara
- `9071` — _richRegistra
- `9085` — _richStato
- `9087` — richScaricaPDF
- `9102` — _richUpload
- `9130` — _richWaUrl
- `9137` — _richTestoWa
- `9151` — richInviaWhatsApp
- `9191` — richCopiaLink
- `9212` — _richStoricoHtml

---
### REFERTI DEL SANGUE DATATI — storico nel tempo (P118 tappa 1)
Righe 9194-9387 — migrazione, ordinamento, quadro attuale derivato, barra di selezione.

- `9787` — _refertoNuovoId
- `9790` — _refertoOggi
- `9794` — _refertoDataIt
- `9800` — _refertoConteggio
- `9814` — _refertiMigra
- `9841` — _refertiOrdinati
- `9852` — _refertoPiuRecente
- `9857` — _refertoInVista
- `9875` — _refertiApplica
- `9888` — _refertoCrea
- `9907` — refertoCambiaVista
- `9913` — refertoCambiaData
- `9925` — refertoNuovo
- `9933` — refertoDuplica
- `9942` — refertoElimina
- `9957` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `9400` — _rangeNum
- `9406` — _rangeTestoDa
- `9425` — _rangeCoppia
- `9435` — _rangeHtml

---
### ANDAMENTO NEL TEMPO — tracciato, variazione, grafico grande (P118 tappa 3)
Righe 9441-9745 — serie storica, regola del colore, sparkline, pannello in fondo.

- `9477` — _andLimiti
- `9498` — _andParseRangeLab
- `9511` — _andDistanza
- `9518` — _andValutazione
- `9531` — _andSerie
- `9545` — _andNum
- `9549` — _andDataBreve
- `9554` — _andMeseAnno
- `9562` — _andDominio
- `9576` — _andColore
- `9589` — _andSparkHtml
- `9615` — _andRigaHtml
- `9637` — _andEsamiSeguibili
- `9645` — andScegliEsame
- `9651` — _andPannelloHtml
- `9704` — _andGraficoGrande
- `9755` — _andPasso

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 10582-10993

- `10582` — _ibFmtBreve
- `10591` — _renderPesiIntermediSection
- `10640` — aggiungiPesoIntermedio
- `10656` — eliminaPesoIntermedio
- `10666` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `10993` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 11265-11265

- `11265` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 11637-13112

- `11637` — aggiornaLabelMacros
- `11655` — calcolaMacros
- `11796` — applicaSchema
- `11804` — _renderRifPesoBox
- `11852` — _usaRifPeso
- `11856` — _aggiornaRifPesoTarget
- `11859` — _aggiornaRegimeSlider
- `12516` — _presetRegime
- `12520` — _initRegimeSliderDaPaziente
- `12538` — ricalcolaLAF
- `12680` — renderStoricoTDEE
- `12714` — attivaSlotTDEE
- `12722` — eliminaSlotTDEE
- `12735` — _toggleCiclizzazione
- `12741` — _aggiornaAnteprimaCiclizzazione
- `12759` — salvaCalcoloMacros
- `12873` — _metAllenamento
- `12889` — _neatFrazione
- `12963` — _larnLafStileVita
- `12980` — _regimeOffset
- `12990` — _componiRegimeText
- `13023` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `13035` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `13042` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `13112` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 13130-13560

- `13130` — renderTargetBadge
- `13159` — verificaRegola_75_20_5
- `13196` — renderBadge75_20_5
- `13261` — _validaNorm
- `13264` — _validaMatchTermine
- `13272` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `13323` — _validaTesto
- `13344` — validaPiano
- `13418` — _validaFirmaBlocchi
- `13425` — renderBadgeValidatore
- `13456` — _validaVaiAlGiorno
- `13465` — apriPannelloValidatore
- `13472` — esc
- `13522` — _validaEseguiOverride
- `13545` — validaGateExport
- `13560` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 13570-14322

- `13570` — abbr
- `13575` — isSab
- `13577` — buildVistaA
- `13581` — righeCategoria
- `13633` — buildVistaB
- `13639` — barColor
- `13644` — barW
- `13652` — barRow
- `13673` — getTabContent
- `13677` — tabBtn
- `13693` — pianoPazSelezionato
- `13840` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `14078` — renderPanelMacrosGiorno
- `14221` — pmgCambiaGrammi
- `14245` — riapriPiano
- `14283` — _montaPianoCorrente
- `14322` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 14332-14801

- `14332` — pullTemplateSupabase
- `14343` — delTemplateSupabase
- `14352` — _promptTemplateNome
- `14377` — _creaTemplateDaJSON
- `14400` — salvaComeTemplate
- `14411` — salvaComeTemplateDaPiano
- `14420` — _normNomeAlim
- `14421` — _escRegAlim
- `14422` — _raccogliAlimentiDaPiano
- `14433` — _alimentiEsclusiPaziente
- `14445` — _trovaConflittiTemplate
- `14463` — _mostraAvvisoConflitti
- `14487` — applicaTemplate
- `14505` — apriPickerTemplate
- `14533` — _pickPaziente
- `14552` — applicaTemplatePick
- `14556` — rinominaTemplate
- `14567` — eliminaTemplate
- `14577` — renderLibreriaTemplate
- `14606` — renderStoricoPiani
- `14665` — eliminaPiano
- `14681` — _getActiveMacrosTarget
- `14705` — getTargetAttivi
- `14742` — calcolaTargetsCiclizzazione
- `14768` — _setupPianoTargets
- `14792` — getStagioneCorrente
- `14801` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 14882-15235

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `15235` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 15244-15703

- `15244` — aggiornaUIcolazione
- `15254` — salvaRegolePiano
- `15315` — _isModelloSistema
- `15318` — _isModelloSistemaModificato
- `15330` — caricaModelliCustomLocal
- `15344` — salvaModelliCustomLocal
- `15365` — _migraRecordCustom
- `15380` — _syncAliasLegacy
- `15389` — caricaAlimentiCustom
- `15413` — pushAlimentiCustomSupabase
- `15423` — pullAlimentiCustomSupabase
- `15437` — pushModelliSupabase
- `15455` — pullModelliSupabase
- `15480` — _calcolaFreqDaModello
- `15499` — aggiornaUImodello
- `15588` — popolaDropdownModelli
- `15616` — cambiaModelloRotazione
- `15622` — ripristinaModelloOriginale
- `15645` — eliminaModelloCustom
- `15663` — mostraAnteprimaModello
- `15673` — apriEditorModello
- `15703` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 12111-12625

- `15738` — rerender
- `15972` — _salvaModelloDaEditor
- `16014` — caricaRegolePiano
- `16044` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `16079` — _aiLogUsage
- `16101` — _aiProxyUrl
- `16107` — _aiTokenPerProxy
- `16136` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `16210` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 16216-16423

- `16216` — _risolviCollisioniCelle
- `16283` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `16343` — getFruttaStile
- `16350` — _fruttaGetPasto
- `16360` — _fruttaContaRigheRicetta
- `16364` — _fruttaIndiceBasePasto
- `16384` — getFruttaMarker
- `16397` — fruttaMarkerHtml
- `16405` — _fruttaCheckboxHtml
- `16414` — toggleFrutta
- `16423` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 16459-17722

- `16459` — _renderCelleGriglia
- `16536` — _renderRicetteTestuali
- `16575` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `16646` — _renderCelleHtml
- `16654` — toggleCellaMenu
- `16673` — closeAllCellaMenus
- `16681` — _trovaPasto
- `16689` — cellaSposta
- `16743` — cellaCancella
- `16764` — apriEditGrammatura
- `16789` — salva
- `16819` — cellaSwap
- `16836` — cellaRimuoviAlt
- `16850` — cellaAggiungiAlt
- `16945` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `17031` — apriEditRicetta
- `17040` — aggiungiRicetta
- `17056` — rimuoviRicetta
- `17065` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `17227` — ngAggiungiSpuntinoVuoto
- `17243` — apriAggiungiCella
- `17254` — risolviCompatibili
- `17334` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `17426` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `17567` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `17722` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 17770-18151

- `17770` — _attesoStrutturaPiano
- `17790` — _confrontaStrutturaPiano
- `17820` — _costruisciPromptDelta
- `17847` — _pianoToolSchema
- `17922` — _pianoMaxTokens
- `17931` — _estraiPianoDaRisposta
- `17953` — chiamaGeneraPiano
- `18120` — mostraLoadingSteps
- `18123` — render
- `18151` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 18218-18775

- `18218` — generaMessaggioAI
- `18306` — copiaMessaggioAI
- `18316` — salvaInStorico
- `18328` — salvaVarianteAI
- `18343` — renderVariantiSalvate
- `18362` — usaVariante
- `18380` — eliminaVariante
- `18391` — renderStoricoMsg
- `18407` — apriWhatsApp
- `18775` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 18953-20450

- `18953` — _ngColoreSemaforoNome
- `18961` — apriSceltaModalitaPiano
- `18996` — _ngChiudiModalita
- `18999` — _ngCostruisciGiornoVuoto
- `19032` — _ngCostruisciGiornoSpeciale
- `19043` — _ngIndiceInizioSpeciali
- `19054` — _ngModalitaNomeGiorno
- `19060` — _ngImpostaModalitaNomeGiorno
- `19063` — _ngLettera
- `19070` — _ngEtichettaGiorno
- `19090` — _ngEtichettaGiornoBreve
- `19104` — _ngToggleGiornoSpeciale
- `19128` — _ngRenderPannelloSpeciale
- `19196` — _generaGiornoSpecialeAI
- `19296` — _ngGiornoHaContenuto
- `19308` — _ngCreaPianoManuale
- `19331` — _ngScrollTabGiorni
- `19341` — _ngAbilitaDragScroll
- `19378` — _ngCambiaNumeroGiorni
- `19410` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `19424` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `19465` — _ngToggleCat
- `19474` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `19498` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `19654` — _ngSalvaPianoManuale
- `19680` — _ngParseIngrediente
- `19704` — _ngScomponiIngredienti
- `19716` — _ricCalcolaMacroDaIngredienti
- `19734` — _ricRicalcolaMacroLive
- `19741` — _ricAggiornaInfoMacro
- `19755` — _ricRicalcolaMacroLiveNow
- `19779` — _ngTrovaCategoriaAlimento
- `19812` — _ngPescaRicetta
- `19855` — _ngScomponiRicettaNelPasto
- `19892` — _ngDragStart
- `19903` — _ngDragStartCella
- `19914` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `19921` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `19926` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `19945` — _ngAggiungiAlimento
- `19970` — _ngRimuoviAlimento
- `19984` — _ngDopoModifica
- `20002` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `20055` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `20084` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `20101` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `20109` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `20181` — gramTestoCasalingo
- `20207` — _appendToggleNutrizionali
- `20250` — _appendTogglePromemoria
- `20279` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `20425` — cpFromEmoji
- `20431` — getEmojiCp
- `20450` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `18425` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `18447` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `18452` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `18478` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `18566` — _spesaTestoWhatsApp
- `18582` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `18627` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `18650` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `18678` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `18738` — scaricaListaSpesaPDF (download diretto, un click)
- `18746` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `18758` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 20460-21598

- `20460` — fetchEmojiB64
- `20478` — _generaPDFSync
- `20563` — loadEmojiSync
- `20569` — drawEmoji
- `20580` — safe
- `20591` — setFont
- `20597` — measure
- `20603` — gramText
- `20612` — pastoOf
- `20621` — macroDelPasto
- `20666` — kcalDelPasto
- `20670` — macroDelGiorno
- `20688` — kcalDelGiorno
- `20691` — formatValori
- `20701` — drawCopertina
- `20834` — measurePasto
- `20884` — groupCelleByOrdine
- `20894` — cellHeight
- `20903` — drawDayHeader
- `20918` — drawPasto
- `20958` — stripEmojiPDF
- `21091` — drawCella
- `21428` — collectCp
- `21434` — getEmojiCpStandalone
- `21598` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 21609-21805

- `21609` — salvaInbody
- `21663` — delInbody
- `21670` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `21805` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 21833-22302

- `21833` — buildSemLegenda
- `21847` — renderAlEditor
- `21908` — _alimNomeRegex
- `21916` — _alimGiorniDaPiano
- `21924` — _scanGiorniPerNome
- `21939` — scanRiferimentiAlimento
- `21968` — _alimRefsRighe
- `21974` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `22062` — modificaAlimentoCustom
- `22082` — ripristinaValoriPrecedentiAlimento
- `22094` — _resetAlimModal
- `22105` — apriNuovoAlimentoCustom
- `22111` — salvaAlimentoCustom
- `22178` — eliminaAlimentoCustom
- `22209` — _alimFonteBadge
- `22214` — renderAlimentiPage
- `22217` — E
- `22284` — archiviaAlimentoCustom
- `22302` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 22329-22570

- `22329` — _bcSetStatus
- `22331` — apriScannerBarcode
- `22339` — chiudiScannerBarcode
- `22344` — _bcStopCamera
- `22352` — _bcModaleAperto
- `22354` — _bcAvviaCamera
- `22365` — _bcAvviaNativo
- `22385` — _bcAvviaZXing
- `22394` — _bcZXStart
- `22405` — _bcErroreCamera
- `22413` — cercaBarcodeManuale
- `22419` — _barcodeTrovato
- `22435` — cercaBarcodeOFF
- `22453` — _bcProdottoNonTrovato
- `22467` — _bcPrecompilaForm
- `22477` — num
- `22491` — togAl
- `22544` — selCatAl
- `22558` — selTuttiAl
- `22570` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 22584-22900

- `22584` — setCalView
- `22585` — calPrev
- `22586` — calNext
- `22587` — calToday
- `22589` — renderCal
- `22603` — renderCalMonth
- `22627` — renderCalWeek
- `22645` — renderCalDay
- `22661` — selGiorno
- `22675` — setDisp
- `22680` — openAddEvento
- `22693` — openAddEventoPaz
- `22699` — toggleEntrataCheck
- `22704` — salvaEvento
- `22727` — openEvDetail
- `22782` — delEvento
- `22790` — copyMsg
- `22797` — aggDateCal
- `22802` — syncInizio
- `22803` — syncControllo
- `22804` — aggiornaPrev
- `22821` — renderRic
- `22848` — openNuovaRic
- `22849` — editRic
- `22859` — salvaRic
- `22884` — delRic
- `22900` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 22985-23045

- `22985` — aggiungiEntrataPerPaziente
- `23002` — openNuovaEntrata
- `23016` — salvaEntrata
- `23037` — delEntrata
- `23045` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 23075-23511

- `23075` — aiSuggerisciRicetta
- `23120` — renderConcettiModal
- `23139` — apriConcettiModal
- `23166` — salvaConcettiAllegati
- `23190` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `23228` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `23237` — loadInbodyPDF
- `23348` — _vitdLabel
- `23352` — getIntegratori
- `23356` — getIntegraWant
- `23360` — setIntegratori
- `23377` — setIntegraWant
- `23388` — getPatologieChip
- `23389` — getAllergieChip
- `23390` — setPatologieChip
- `23391` — setAllergieChip
- `23392` — getPatologie
- `23393` — getAllergie
- `23394` — setPatologieFromStr
- `23401` — setAllergieFromStr
- `23414` — getSdvChip
- `23415` — getCspChip
- `23416` — setSdvChip
- `23417` — setCspChip
- `23418` — setSdvFromStr
- `23419` — setCspFromStr
- `23423` — getBudget
- `23424` — setBudget
- `23429` — renderCalAnno
- `23460` — comprimeImmagine
- `23482` — uploadImmagineConcetto
- `23501` — rimuoviImmagineConcetto
- `23511` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 23577-23681

- `23577` — entraSelConcetti
- `23578` — annullaSelConcetti
- `23579` — toggleConcettoSel
- `23584` — eliminaConcettiSelezionati
- `23603` — confermaEliminaConcetti
- `23618` — aiRiscriviConcetto
- `23632` — editConcetto
- `23650` — salvaConcetto
- `23661` — openNuovoConcetto
- `23681` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 23682-23845

- `23682` — saveAgendaPersonale
- `23683` — getAgendaTodo
- `23684` — saveAgendaTodo
- `23686` — pulisciAgendaVecchia
- `23690` — navigaAgenda
- `23699` — toggleFormAgenda
- `23700` — toggleFormTodo
- `23702` — salvaAgendaItem
- `23716` — salvaTodoItem
- `23728` — toggleAgendaFatto
- `23736` — toggleTodoFatto
- `23749` — _catCol
- `23751` — renderAgendaDx
- `23845` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 23971-24175

- `23971` — renderScadenzeAlert
- `24156` — segnaGestito
- `24175` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 24184-24259

- `24184` — ripristinaPaz
- `24192` — eliminaPaz
- `24237` — getDove
- `24241` — setDove
- `24259` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 24264-24704

- `24264` — getCredenzialiPersistenti
- `24277` — cancellaCredenzialiPersistenti
- `24282` — rinnovaSessioneConRefreshToken
- `24299` — getSessioneSalvata
- `24318` — salvaSessione
- `24328` — cancellaSessione
- `24332` — eseguiLogin
- `24379` — eseguiLogout
- `24401` — mostraApp
- `24406` — verificaSessioneEAvvia
- `24434` — assicuraTokenValido
- `24463` — _garantiscoSessionePerSync
- `24475` — avviaRinnovoTokenPeriodico
- `24479` — fermaRinnovoTokenPeriodico
- `24488` — _authReset
- `24493` — _authMostra
- `24496` — mostraLogin
- `24497` — mostraRegistrazione
- `24498` — mostraRecupero
- `24499` — mostraNuovaPassword
- `24502` — eseguiRegistrazione
- `24540` — eseguiRecuperoPassword
- `24569` — eseguiNuovaPassword
- `24603` — _parseHashParams
- `24610` — _pulisciHash
- `24614` — gestisciRitornoAuth
- `24704` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 24776-25037

- `24776` — apriPannelloRicette
- `24805` — chiudiPannelloRicette
- `24813` — applicaRicettaPasto
- `24849` — inizializzaP2
- `24861` — deepClone
- `24865` — applicaPatch
- `24899` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
