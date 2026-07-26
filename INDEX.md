# NutriGest — INDEX.md

> **Come si riallineano i numeri di riga (26 lug 2026).** Questo file ha 823 voci:
> ogni riga aggiunta a `index.html` sposta tutte quelle sotto, quindi a mano non
> si mantiene. Il 26 luglio erano **719 su 730 sbagliate**, con uno scarto mediano
> di oltre 1800 righe — ed erano gia' 657 su 687 prima della sessione: il file era
> alla deriva da settimane. Non e' un problema di disciplina, e' un problema di
> metodo. Da rigenerare con questo script dopo ogni sessione che tocca il codice:
>
> ```python
> import io, re
> html = io.open('index.html', encoding='utf-8').read()
> reale = {}
> for n, l in enumerate(html.split('\n'), 1):
>     m = re.match(r'^(?:async )?function (\w+)\s*\(', l) or re.match(r'^(?:const|let|var) (\w+)\s*=', l)
>     if m and m.group(1) not in reale: reale[m.group(1)] = n
> idx = io.open('INDEX.md', encoding='utf-8').read()
> def fix(m):
>     nome = m.group(2)
>     return '- `%d` — %s%s' % (reale[nome], nome, m.group(3)) if nome in reale else m.group(0)
> io.open('INDEX.md', 'w', encoding='utf-8').write(
>     re.sub(r'^- `(\d+)` — (\w+)(.*)$', fix, idx, flags=re.M))
> ```
>
> Le 93 voci non trovate dallo script sono funzioni annidate o dichiarate non a
> inizio riga: quelle restano da controllare a mano.


Mappa funzioni → righe di `index.html`, organizzata per area funzionale.
**Numeri di riga riallineati il 26 luglio 2026** (P122 + P123 + F5/F6/F7): ricalcolate **719 voci su 730** con lo script qui sopra, insieme ai range "Righe A-B" di ogni sezione. Righe totali file: 26883.

> ⚠️ **Nota storica, da tenere presente.** L'intestazione precedente dichiarava un riallineo completo il 25 luglio, ma un controllo automatico su quel commit (`924414b`) ha trovato **657 voci sbagliate su 687**, con scarto mediano di +117 righe: la dichiarazione non corrispondeva al file. Prima ancora, la rigenerazione integrale del 14 luglio. Morale: **il riallineo va verificato, non dichiarato** — lo script sopra stampa quante voci corregge, e quel numero va guardato.

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
Righe 2375-2417

- `2375` — _slugAlimento
- `2383` — _catalogoIndicizza
- `2387` — _catalogoDeindicizza
- `2394` — costruisciCatalogo
- `2417` — risolviAlimento

---

### MACROS PIANO — calcolo e badge macro reali vs target
Righe 2432-2695

- `2432` — getValoriCREA
- `2444` — getCurrentPaziente
- `2464` — getKcalWeekend
- `2521` — getMacrosRicettaComposta
- `2527` — calcolaMacrosPiano
- `2629` — renderBadgeMacrosReali
- `2611` — pctStr
- `2612` — color
- `2625` — row
- `2695` — renderBadgeMacrosReali_DOM

---

### ANALISI DEL SANGUE — parsing, indici clinici derivati, interpretazione
Righe 2943-3115

- `2943` — _parseAnalisiNum
- `2951` — calcolaIndice
- `3089` — interpretaAnalisi
- `3101` — _interpAnalisiHtml
- `3115` — mostraInfoRange

---

### CONCETTI EDUCATIVI — sync Supabase, migrazione
Righe 3258-3282

- `3258` — pushConcetiSupabase
- `3268` — pullConcetiSupabase
- `3282` — migraConcetti

---

### ALIMENTI — categorie funzionali/semaforo, chip UI, equivalenze porzioni
Righe 3472-3827

- `3472` — getCategoriaSemaforo
- `3489` — _getCategorieGruppo
- `3503` — calcolaGrammaturaEquivalente
- `3543` — _gruppoEquiv  (P121: gruppo di equivalenza + criterio per categoria funzionale)
- `3549` — _porzioneStandard  (P121: porzione `g` di database dell'alimento)
- `3564` — suggerisciGrEquivalente  (P121: firma a 3 argomenti, il gruppo si deduce dai due alimenti)
- `3590` — _etichettaCriterio  (P121: ≈carbo / ≈prot / ≈grassi / fissa / porzione)
- `3605` — _promptAlternativeGrassi  (P121: riga del prompt AI generata dal motore)
- `3621` — ricalcolaAlternative  (P121: MOTORE UNICO, unico punto che scrive la grammatura di un'alternativa)
- `3640` — ricalcolaAlternativePiano  (P121: applica il motore a tutte le celle di un piano)
- `3689` — arrotondaGrammatura  (P121: sostituisce arrotondaPorzioneDiscreta — pezzi interi senza tetto / 5g)
- `3699` — getCategoriaFunzionale
- `3739` — catArr
- `3755` — _tagComuniTrova
- `3759` — getTagComuniChip
- `3762` — setTagComuniChip
- `3770` — setCatChips
- `3783` — getStagioniChip
- `3786` — setStagioniChip
- `3793` — getProfiloChip
- `3796` — setProfiloChip
- `3805` — wireChipGroup
- `3816` — wireAttrChipGroups
- `3827` — wireRadioChipGroup

---

### CONFIG / STORAGE LOCALE — cfg, localStorage db, util data/valuta
Righe 3855-4228

- `3855` — getCfg
- `3856` — saveCfgL
- `3857` — getUrl
- `3858` — saveLocal
- `3859` — loadLocal
- `3866` — uid
- `3867` — today
- `3868` — addDays
- `3869` — fData
- `3870` — fEur
- `3872` — getLastSyncText
- `3882` — getSyncColor
- `3890` — aggiornaStatoSync
- `3916` — setSyncStatus
- `4182` — _registraTombstone
- `4190` — _tombstoneAttivi
- `4202` — _fondiTombstones
- `4216` — _mergeTombstonesRemoti *(dal 24/7 legge il meta da `collections`, P74 1d)*
- `4228` — _applicaTombstones
- `4089` — _pazFetchMeta *(P74 1d — solo `collections`)*
- `4110` — _collectionsUpsert *(P74 — scrittura primaria dei 4 meta-record dal cutover 1d)*
- `4132` — _collectionsFetch *(P74 1d — lettura unica dei meta-record)*
- `4155` — _analisiSangueUpsert *(P74 fase 2 — scrittura ombra analisi del sangue, 24/7)*

---

### SYNC SUPABASE — push/pull ricette/pazienti, tombstones, conflitti (P69)
Righe 4252-4637

- `4252` — supaHeaders
- `4266` — pushRicetteSupabase
- `4291` — pullRicetteSupabase
- `4313` — delRicetteSupabase
- `4325` — delPazienteSupabase
- `4340` — pushToSheets
- `4384` — pullFromSheets
- `4463` — syncNow
- `4476` — sincronizzaTutto
- `4360` — stpSet
- `4365` — stpMsg
- `4607` — testConnSupabase
- `4637` — _p68LogSaveAnonimo

---

### SYNC SUPABASE — save paziente, piani/cache piano, entrate, eventi
Righe 4651-5167

- `4651` — save
- `4669` — _pushRigaPerId
- `4702` — _flushDirtyIds
- `4785` — _p69LoadBaseline
- `4788` — _p69StoreBaseline
- `4791` — _p69SetBaseline
- `4795` — _p69DropBaseline
- `4799` — _p69SetBaselineFromRows
- `4805` — _p69NomePaz
- `4810` — _p69InList
- `4818` — _p69RilevaConflitti
- `4854` — _p69DialogoConflitti
- `4738` — chiudi
- `4888` — _p69RisolviRicarica
- `4917` — _p69EsportaLocali
- `4930` — _p69RisolviSovrascrivi
- `4943` — pushPianoSupabase
- `4965` — pullPianiSupabase
- `4981` — delPianoSupabase
- `4997` — delPianiPazienteSupabase
- `5009` — pushCachePianoSupabase
- `5026` — caricaCachePianoSupabase
- `5048` — pushEntrateSupabase
- `5072` — pullEntrateSupabase
- `5086` — delEntrataSupabase
- `5094` — pushEntrataSupabase
- `5105` — pushEventoSupabase
- `5118` — pushEventiSupabase
- `5142` — pullEventiSupabase
- `5156` — delEventoSupabase
- `5167` — _pianoCacheKey

---

### UI GENERALE — config AI key, notifiche, navigazione (goTo/tab/modali)
Righe 5194-5306

- `5194` — _salvaPianoCache
- `5199` — _caricaPianoCache
- `5205` — salvaCfg
- `5206` — testConn
- `5213` — testaAntKey
- `5224` — initAntCard
- `5227` — esporta
- `5228` — importa
- `5233` — goTo
- `5250` — closeM
- `5258` — ngChiudiModale
- `5267` — ngChiudiPopupCoppia
- `5271` — ngAggiungiX
- `5282` — ngUpgradeModali
- `5302` — mTab
- `5303` — aggiornaEta
- `5304` — toggleOrarioNote
- `5305` — pdTab
- `5306` — notif

---

### PAZIENTI — registro: lista/card/kanban, apertura, editing, salvataggio, routine
Righe 5314-7983

- `5314` — getPazView
- `5315` — setPazView
- `5324` — _pazStatoPiano
- `5332` — _pazUrgenzaControllo
- `5339` — _pazStatoTagHtml
- `5348` — _pazAggiornaFiltroRegimi
- `5356` — renderPaz
- `5409` — _renderPazCard
- `5434` — _renderPazLista
- `5461` — _renderPazKanban
- `5499` — openNuovoPaz
- `5525` — editPaz
- `5595` — applicaRegoloSemaforo
- `6106` — trovaChiaveAlimento
- `6130` — _pazNumOPrec *(F7 — campo assente = valore precedente, non azzeramento)*
- `6142` — _pazPreservaCampi *(F5 — l'anagrafica non cancella i campi che il form non gestisce)*
- `6148` — salvaPaz
- `6224` — openPaz
- `7670` — renderPdRoutine
- `6723` — cardHTML
- `7812` — updateRoutineCampo
- `7820` — suggerisciPastoEQuando
- `7847` — filtroLibreria
- `7856` — renderLibreriaGrid
- `7877` — aggiungiDaLibreriaIdx
- `7901` — openModalRoutine
- `7908` — salvaRoutineVoce
- `7933` — salvaRoutine
- `7940` — mostraRoutinePopup
- `7968` — removeRoutineVoce
- `7983` — _renderAggiustamentiSection

---

### 📈 PERCORSO — timeline di periodizzazione (P115 Tappe 1-5 COMPLETE, 24 lug 2026)
Righe 6021-6621 (numeri ESATTI al 24/7 notte, dopo la Tappa 5). ⚠️ Questo blocco (~600 righe) fa slittare tutti i numeri delle sezioni SUCCESSIVE a riga ~6020 rispetto all'ultima rigenerazione completa: per quelle sezioni fare grep di conferma. Rigenerazione completa alla prossima modifica strutturale.

- `6268` — _PERCORSO_TIPI (const: tipi fase, colori, pct default)
- `6275` — _percorsoGet *(normalizza p.percorso, scarta fasi invalide)*
- `6297` — _percorsoIsoLocal *(data → YYYY-MM-DD LOCALE, mai toISOString/UTC)*
- `6303` — _percorsoIntervalli *(fasi consecutive → date concrete dal/al)*
- `6317` — _percorsoFaseAt *(fase attiva a una data; dal incluso, al escluso)*
- `6326` — _percorsoKcalFase *(pct → kcal indicative via calcolaTDEE)*
- `6349` — _percorsoProiezione *(Tappa 2 — proiezione ibrida teorica/calibrata, cono, obiettivo a intervallo)*
- `6407` — _percorsoDataBreve *(ISO → "12 set")*
- `6424` — _percorsoSerieEnergia *(Tappa 3 — serie introito/TDEE stimato/TDEE osservato per la corsia energia)*
- `6463` — _percorsoSerieMassaMagra *(Tappa 4 — solo InBody: punti {data,m,pg})*
- `6482` — _percorsoConsuntivo *(Tappa 5 — legge p.consuntivo scritto da P50: aderenza, extra kcal, ritardo=extra÷7700, settimane perse; oggi sempre ok:false)*
- `6524` — _PERCORSO_LAYERS_DEFAULT / _percorsoLayersState / _percorsoLayersGet *(Tappa 4 — stato interruttori, SOLO sessione, mai su p)*
- `6529` — percorsoLayerToggle *(Tappa 4 — inverte un solo strato)*
- `6535` — percorsoVistaPreset *(Tappa 4 — preset "tecnica"/"paziente")*
- `6551` — _percorsoPaz *(e a seguire i mutatori percorsoInit/SetInizio/AddFase/UpdFase/DelFase/MoveFase)*
- `6607` — _PERCORSO_MODELLI / _PERCORSO_GEN *(P122 T3 — 4 modelli + regole dei cicli)*
- `6625` — _percorsoGeneraFasi *(P122 T3 — pura: dal traguardo alle fasi, ritmo = quello della proiezione)*
- `6705` — _percorsoModelloSelectHtml
- `6714` — percorsoGeneraDaModello *(propone; conferma prima di sostituire fasi esistenti)*
- `6737` — _percorsoShiftGiorni *(pura: ancora = ultima pesata)*
- `6747` — percorsoRiallinea *(⏩ trasla il piano, riprende dal giorno-fase dell'interruzione)*
- `6774` — _TRG_TIPI / `6744` _TRG_COMPORTAMENTI *(P122 T4 — tipi di traguardo e libreria comportamenti)*
- `6796` — _traguardiGet · `6761` _traguardoValoreAttuale *(valore corrente dai dati esistenti, null se manca)*
- `6835` — _traguardoVerso *(auto: dedotto dalla partenza)* · `6803` _traguardoValuta · `6824` _traguardiValuta
- `6876` — traguardoAdd · `6852` traguardoUpd · `6867` traguardoDel · `6873` traguardoSegna
- `6934` — _COND_TIPI · `6897` _percorsoCondizione *(pura: la fase finisce per soglia — SOLO suggerimento)*
- `6950` — percorsoSetCondizione · `6927` percorsoChiudiFase *(esito fotografato, riapribile)*
- `6984` — _traguardiHtml *(blocco 🏁 in fondo alla scheda Percorso)*
- `7082` — _percorsoVistaPaz / `7049` _percorsoVistaPazAttiva *(P122 T5 — modalità di sessione)*
- `7089` — _percorsoVittorie *(pura: vittorie dall'inizio del percorso + flag ricomposizione)*
- `7127` — _percorsoNascondiPeso *(in fase di massa il peso non si mostra al paziente)*
- `7138` — _traguardoFaseCorrente *(traguardo della fase IN CORSO, non quello lontano)*
- `7166` — _traguardoTestoPaziente *(righe in italiano semplice, riusate dal messaggio WhatsApp)*
- `7199` — _vistaPazienteHtml *(i tre riquadri che guarda il paziente)*
- `7279` — _percorsoChartSvg *(due corsie: peso + massa magra + cono proiezione sopra, striscia aderenza in mezzo (solo con dati P50), energia (kcal) sotto — tutto gated dagli interruttori)*
- `7468` — renderPdPercorso *(scheda: badge fase, riga proiezione/obiettivo, riga Piano vs Realtà (solo con dati), toolbar interruttori, grafico, editor)*

*(Tappa 2 tocca anche `calcolaMacros`: box obiettivo con intervallo al posto della data secca.)*

---

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 8068-8772

- `8068` — salvaAggiustamento
- `8101` — eliminaAggiustamento
- `8110` — renderPdNote
- `8145` — salvaNotaClinica
- `8160` — deleteNota
- `8169` — saveNote
- `8684` — _applicaRegoloSemaforoLEGACY
- `8725` — resetSemaforoAuto
- `8772` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 8941-9139

- `8941` — avviaFX
- `8969` — avviaAnalisi
- `8986` — _renderFlussoPanel
- `9030` — _riepEsc
- `9034` — _riepNum
- `9040` — _riepDelta
- `9048` — _riepDataSig
- `9066` — _riepParseFX
- `8087` — clean
- `9080` — _riepAggiornaFX
- `9106` — _riepToggleDomandaDefault
- `9118` — _riepAddDomanda
- `9131` — _riepRemoveDomanda
- `9139` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 9351-9577

- `8218` — dCol
- `8336` — card
- `9351` — renderPdRagionamento
- `9439` — inviaMessaggioRag
- `9457` — concludiERiassumi
- `9471` — salvaRagionamento
- `9492` — apriGeneratoreDaRag
- `9500` — nuovaSessioneRag
- `9506` — cancellaSavedRag
- `9516` — renderPazTimeline
- `9548` — renderPdAnamnesi
- `9577` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 10986-11518

- `10986` — renderPdAnalisi
- `11035` — toggleAnalisiSection
- `11045` — loadAnalisiSanguePDF
- `11137` — mostraDiffAnalisi
- `11236` — _calcoloIncluso
- `11242` — toggleCalcoloIncluso
- `11264` — _renderCalcoliPannello
- `11300` — toggleGlossario
- `11305` — updateAnalisi
- `11364` — salvaAnalisi
- `11377` — applicaGruppoClinico
- `11406` — renderBoxGruppiCliniciSuggeriti
- `11438` — suggerisciGruppiClinici
- `11518` — renderMemoriaInbody

---
### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9176 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `9703` — _richVal
- `9710` — _richBmi
- `9715` — _richPat
- `9721` — _richNum
- `9766` — _richPreselezione
- `9782` — richLeggiIntestazione
- `9786` — richSalvaIntestazione
- `9795` — apriRichiestaAnalisi
- `9815` — _richModaleHtml
- `9891` — _richEsc
- `9893` — _richMotivoCambia
- `9899` — _richToggleSez
- `9905` — _richAggiornaConteggi
- `9913` — _richMotivoCorrente
- `9923` — _richSelezione
- `9938` — _richTxt
- `9944` — _richCostruisciPDF
- `8969` — nuovaPagina
- `8970` — spazio
- `10040` — _richNomeFile
- `10045` — _richPrepara
- `10055` — _richRegistra
- `10069` — _richStato
- `10071` — richScaricaPDF
- `10086` — _richUpload
- `10114` — _richWaUrl
- `10121` — _richTestoWa
- `10135` — richInviaWhatsApp
- `10175` — richCopiaLink
- `10196` — _richStoricoHtml

---
### REFERTI DEL SANGUE DATATI — storico nel tempo (P118 tappa 1)
Righe 9194-9387 — migrazione, ordinamento, quadro attuale derivato, barra di selezione.

- `10771` — _refertoNuovoId
- `10774` — _refertoOggi
- `10778` — _refertoDataIt
- `10784` — _refertoConteggio
- `10798` — _refertiMigra
- `10825` — _refertiOrdinati
- `10836` — _refertoPiuRecente
- `10841` — _refertoInVista
- `10859` — _refertiApplica
- `10872` — _refertoCrea
- `10891` — refertoCambiaVista
- `10897` — refertoCambiaData
- `10909` — refertoNuovo
- `10917` — refertoDuplica
- `10926` — refertoElimina
- `10941` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `10384` — _rangeNum
- `10390` — _rangeTestoDa
- `10409` — _rangeCoppia
- `10419` — _rangeHtml

---
### ANDAMENTO NEL TEMPO — tracciato, variazione, grafico grande (P118 tappa 3)
Righe 9441-9745 — serie storica, regola del colore, sparkline, pannello in fondo.

- `10461` — _andLimiti
- `10482` — _andParseRangeLab
- `10495` — _andDistanza
- `10502` — _andValutazione
- `10515` — _andSerie
- `10529` — _andNum
- `10533` — _andDataBreve
- `10538` — _andMeseAnno
- `10546` — _andDominio
- `10560` — _andColore
- `10573` — _andSparkHtml
- `10599` — _andRigaHtml
- `10621` — _andEsamiSeguibili
- `10629` — andScegliEsame
- `10635` — _andPannelloHtml
- `10688` — _andGraficoGrande
- `10739` — _andPasso

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 11566-11977

- `11566` — _ibFmtBreve
- `11575` — _renderPesiIntermediSection
- `11624` — aggiungiPesoIntermedio
- `11640` — eliminaPesoIntermedio
- `11650` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `11977` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 12249-12249

- `12249` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 12627-14884

- `12627` — aggiornaLabelMacros
- `12645` — calcolaMacros
- `12786` — applicaSchema
- `12821` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `12827` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `12844` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `12880` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `12898` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `13011` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `13025` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `13081` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `13095` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `13127` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `13160` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `13202` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `13210` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `13221` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `13248` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `13263` — _stradeVerso *(le strade complete + percentuale libera)*
- `13286` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `13354` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `13376` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `13429` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `13533` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `13548` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `13573` — _renderRifPesoBox
- `13624` — _usaRifPeso
- `13628` — _aggiornaRifPesoTarget
- `13631` — _aggiornaRegimeSlider
- `14288` — _presetRegime
- `14292` — _initRegimeSliderDaPaziente
- `14310` — ricalcolaLAF
- `14452` — renderStoricoTDEE
- `14486` — attivaSlotTDEE
- `14494` — eliminaSlotTDEE
- `14507` — _toggleCiclizzazione
- `14513` — _aggiornaAnteprimaCiclizzazione
- `14531` — salvaCalcoloMacros
- `14645` — _metAllenamento
- `14661` — _neatFrazione
- `14735` — _larnLafStileVita
- `14752` — _regimeOffset
- `14762` — _componiRegimeText
- `14795` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `14807` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `14814` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `14884` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 14902-15332

- `14902` — renderTargetBadge
- `14931` — verificaRegola_75_20_5
- `14968` — renderBadge75_20_5
- `15033` — _validaNorm
- `15036` — _validaMatchTermine
- `15044` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `15095` — _validaTesto
- `15116` — validaPiano
- `15190` — _validaFirmaBlocchi
- `15197` — renderBadgeValidatore
- `15228` — _validaVaiAlGiorno
- `15237` — apriPannelloValidatore
- `13472` — esc
- `15294` — _validaEseguiOverride
- `15317` — validaGateExport
- `15332` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 15465-16097

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
- `15465` — pianoPazSelezionato
- `15612` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `15850` — renderPanelMacrosGiorno
- `15993` — pmgCambiaGrammi
- `16020` — riapriPiano
- `16058` — _montaPianoCorrente
- `16097` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 16107-16576

- `16107` — pullTemplateSupabase
- `16118` — delTemplateSupabase
- `16127` — _promptTemplateNome
- `16152` — _creaTemplateDaJSON
- `16175` — salvaComeTemplate
- `16186` — salvaComeTemplateDaPiano
- `16195` — _normNomeAlim
- `16196` — _escRegAlim
- `16197` — _raccogliAlimentiDaPiano
- `16208` — _alimentiEsclusiPaziente
- `16220` — _trovaConflittiTemplate
- `16238` — _mostraAvvisoConflitti
- `16262` — applicaTemplate
- `16280` — apriPickerTemplate
- `16308` — _pickPaziente
- `16327` — applicaTemplatePick
- `16331` — rinominaTemplate
- `16342` — eliminaTemplate
- `16352` — renderLibreriaTemplate
- `16381` — renderStoricoPiani
- `16440` — eliminaPiano
- `16456` — _getActiveMacrosTarget
- `16480` — getTargetAttivi
- `16517` — calcolaTargetsCiclizzazione
- `16543` — _setupPianoTargets
- `16567` — getStagioneCorrente
- `16576` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 17010-17010

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `17010` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 17019-17478

- `17019` — aggiornaUIcolazione
- `17029` — salvaRegolePiano
- `17090` — _isModelloSistema
- `17093` — _isModelloSistemaModificato
- `17105` — caricaModelliCustomLocal
- `17119` — salvaModelliCustomLocal
- `17140` — _migraRecordCustom
- `17155` — _syncAliasLegacy
- `17164` — caricaAlimentiCustom
- `17188` — pushAlimentiCustomSupabase
- `17198` — pullAlimentiCustomSupabase
- `17212` — pushModelliSupabase
- `17230` — pullModelliSupabase
- `17255` — _calcolaFreqDaModello
- `17274` — aggiornaUImodello
- `17363` — popolaDropdownModelli
- `17391` — cambiaModelloRotazione
- `17397` — ripristinaModelloOriginale
- `17420` — eliminaModelloCustom
- `17438` — mostraAnteprimaModello
- `17448` — apriEditorModello
- `17478` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 17747-17985

- `15738` — rerender
- `17747` — _salvaModelloDaEditor
- `17789` — caricaRegolePiano
- `17819` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `17854` — _aiLogUsage
- `17876` — _aiProxyUrl
- `17882` — _aiTokenPerProxy
- `17911` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `17985` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 18064-18204

- `16216` — _risolviCollisioniCelle
- `18064` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `18124` — getFruttaStile
- `18131` — _fruttaGetPasto
- `18141` — _fruttaContaRigheRicetta
- `18145` — _fruttaIndiceBasePasto
- `18165` — getFruttaMarker
- `18178` — fruttaMarkerHtml
- `18186` — _fruttaCheckboxHtml
- `18195` — toggleFrutta
- `18204` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 18240-19514

- `18240` — _renderCelleGriglia
- `18320` — _renderRicetteTestuali
- `18359` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `18430` — _renderCelleHtml
- `18438` — toggleCellaMenu
- `18457` — closeAllCellaMenus
- `18465` — _trovaPasto
- `18473` — cellaSposta
- `18527` — cellaCancella
- `18548` — apriEditGrammatura
- `16789` — salva
- `18596` — cellaSwap
- `18616` — cellaRimuoviAlt
- `18630` — cellaAggiungiAlt
- `18733` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `18818` — apriEditRicetta
- `18827` — aggiungiRicetta
- `18843` — rimuoviRicetta
- `18852` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `19014` — ngAggiungiSpuntinoVuoto
- `19030` — apriAggiungiCella
- `17254` — risolviCompatibili
- `19126` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `19218` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `19359` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `19514` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 19562-19943

- `19562` — _attesoStrutturaPiano
- `19582` — _confrontaStrutturaPiano
- `19612` — _costruisciPromptDelta
- `19639` — _pianoToolSchema
- `19714` — _pianoMaxTokens
- `19723` — _estraiPianoDaRisposta
- `19745` — chiamaGeneraPiano
- `19912` — mostraLoadingSteps
- `18123` — render
- `19943` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 20010-20584

- `20010` — generaMessaggioAI
- `20115` — copiaMessaggioAI
- `20125` — salvaInStorico
- `20137` — salvaVarianteAI
- `20152` — renderVariantiSalvate
- `20171` — usaVariante
- `20189` — eliminaVariante
- `20200` — renderStoricoMsg
- `20216` — apriWhatsApp
- `20584` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 20762-22259

- `20762` — _ngColoreSemaforoNome
- `20770` — apriSceltaModalitaPiano
- `20805` — _ngChiudiModalita
- `20808` — _ngCostruisciGiornoVuoto
- `20841` — _ngCostruisciGiornoSpeciale
- `20852` — _ngIndiceInizioSpeciali
- `20863` — _ngModalitaNomeGiorno
- `20869` — _ngImpostaModalitaNomeGiorno
- `20872` — _ngLettera
- `20879` — _ngEtichettaGiorno
- `20899` — _ngEtichettaGiornoBreve
- `20913` — _ngToggleGiornoSpeciale
- `20937` — _ngRenderPannelloSpeciale
- `21005` — _generaGiornoSpecialeAI
- `21105` — _ngGiornoHaContenuto
- `21117` — _ngCreaPianoManuale
- `21140` — _ngScrollTabGiorni
- `21150` — _ngAbilitaDragScroll
- `21187` — _ngCambiaNumeroGiorni
- `21219` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `21233` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `21274` — _ngToggleCat
- `21283` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `21307` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `21463` — _ngSalvaPianoManuale
- `21489` — _ngParseIngrediente
- `21513` — _ngScomponiIngredienti
- `21525` — _ricCalcolaMacroDaIngredienti
- `21543` — _ricRicalcolaMacroLive
- `21550` — _ricAggiornaInfoMacro
- `21564` — _ricRicalcolaMacroLiveNow
- `21588` — _ngTrovaCategoriaAlimento
- `21621` — _ngPescaRicetta
- `21664` — _ngScomponiRicettaNelPasto
- `21701` — _ngDragStart
- `21712` — _ngDragStartCella
- `21723` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `21730` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `21735` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `21754` — _ngAggiungiAlimento
- `21779` — _ngRimuoviAlimento
- `21793` — _ngDopoModifica
- `21811` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `21864` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `21893` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `21910` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `21918` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `21990` — gramTestoCasalingo
- `22016` — _appendToggleNutrizionali
- `22059` — _appendTogglePromemoria
- `22088` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `22234` — cpFromEmoji
- `22240` — getEmojiCp
- `22259` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `20234` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `20256` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `20261` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `20287` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `20375` — _spesaTestoWhatsApp
- `20391` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `20436` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `20459` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `20487` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `20547` — scaricaListaSpesaPDF (download diretto, un click)
- `20555` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `20567` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 23407-23407

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
- `23407` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 23418-23624

- `23418` — salvaInbody
- `23482` — delInbody
- `23489` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `23624` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 23652-24121

- `23652` — buildSemLegenda
- `23666` — renderAlEditor
- `23727` — _alimNomeRegex
- `23735` — _alimGiorniDaPiano
- `23743` — _scanGiorniPerNome
- `23758` — scanRiferimentiAlimento
- `23787` — _alimRefsRighe
- `23793` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `23881` — modificaAlimentoCustom
- `23901` — ripristinaValoriPrecedentiAlimento
- `23913` — _resetAlimModal
- `23924` — apriNuovoAlimentoCustom
- `23930` — salvaAlimentoCustom
- `23997` — eliminaAlimentoCustom
- `24028` — _alimFonteBadge
- `24033` — renderAlimentiPage
- `22217` — E
- `24103` — archiviaAlimentoCustom
- `24121` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 24148-24389

- `24148` — _bcSetStatus
- `24150` — apriScannerBarcode
- `24158` — chiudiScannerBarcode
- `24163` — _bcStopCamera
- `24171` — _bcModaleAperto
- `24173` — _bcAvviaCamera
- `24184` — _bcAvviaNativo
- `24204` — _bcAvviaZXing
- `24213` — _bcZXStart
- `24224` — _bcErroreCamera
- `24232` — cercaBarcodeManuale
- `24238` — _barcodeTrovato
- `24254` — cercaBarcodeOFF
- `24272` — _bcProdottoNonTrovato
- `24286` — _bcPrecompilaForm
- `22477` — num
- `24310` — togAl
- `24363` — selCatAl
- `24377` — selTuttiAl
- `24389` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 24403-24719

- `24403` — setCalView
- `24404` — calPrev
- `24405` — calNext
- `24406` — calToday
- `24408` — renderCal
- `24422` — renderCalMonth
- `24446` — renderCalWeek
- `24464` — renderCalDay
- `24480` — selGiorno
- `24494` — setDisp
- `24499` — openAddEvento
- `24512` — openAddEventoPaz
- `24518` — toggleEntrataCheck
- `24523` — salvaEvento
- `24546` — openEvDetail
- `24601` — delEvento
- `24609` — copyMsg
- `24616` — aggDateCal
- `24621` — syncInizio
- `24622` — syncControllo
- `24623` — aggiornaPrev
- `24640` — renderRic
- `24667` — openNuovaRic
- `24668` — editRic
- `24678` — salvaRic
- `24703` — delRic
- `24719` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 24804-24864

- `24804` — aggiungiEntrataPerPaziente
- `24821` — openNuovaEntrata
- `24835` — salvaEntrata
- `24856` — delEntrata
- `24864` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 24894-25330

- `24894` — aiSuggerisciRicetta
- `24939` — renderConcettiModal
- `24958` — apriConcettiModal
- `24985` — salvaConcettiAllegati
- `25009` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `25047` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `25056` — loadInbodyPDF
- `25167` — _vitdLabel
- `25171` — getIntegratori
- `25175` — getIntegraWant
- `25179` — setIntegratori
- `25196` — setIntegraWant
- `25207` — getPatologieChip
- `25208` — getAllergieChip
- `25209` — setPatologieChip
- `25210` — setAllergieChip
- `25211` — getPatologie
- `25212` — getAllergie
- `25213` — setPatologieFromStr
- `25220` — setAllergieFromStr
- `25233` — getSdvChip
- `25234` — getCspChip
- `25235` — setSdvChip
- `25236` — setCspChip
- `25237` — setSdvFromStr
- `25238` — setCspFromStr
- `25242` — getBudget
- `25243` — setBudget
- `25248` — renderCalAnno
- `25279` — comprimeImmagine
- `25301` — uploadImmagineConcetto
- `25320` — rimuoviImmagineConcetto
- `25330` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 25396-25500

- `25396` — entraSelConcetti
- `25397` — annullaSelConcetti
- `25398` — toggleConcettoSel
- `25403` — eliminaConcettiSelezionati
- `25422` — confermaEliminaConcetti
- `25437` — aiRiscriviConcetto
- `25451` — editConcetto
- `25469` — salvaConcetto
- `25480` — openNuovoConcetto
- `25500` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 25501-25664

- `25501` — saveAgendaPersonale
- `25502` — getAgendaTodo
- `25503` — saveAgendaTodo
- `25505` — pulisciAgendaVecchia
- `25509` — navigaAgenda
- `25518` — toggleFormAgenda
- `25519` — toggleFormTodo
- `25521` — salvaAgendaItem
- `25535` — salvaTodoItem
- `25547` — toggleAgendaFatto
- `25555` — toggleTodoFatto
- `25568` — _catCol
- `25570` — renderAgendaDx
- `25664` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 25790-25994

- `25790` — renderScadenzeAlert
- `25975` — segnaGestito
- `25994` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 26003-26078

- `26003` — ripristinaPaz
- `26011` — eliminaPaz
- `26056` — getDove
- `26060` — setDove
- `26078` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 26083-26523

- `26083` — getCredenzialiPersistenti
- `26096` — cancellaCredenzialiPersistenti
- `26101` — rinnovaSessioneConRefreshToken
- `26118` — getSessioneSalvata
- `26137` — salvaSessione
- `26147` — cancellaSessione
- `26151` — eseguiLogin
- `26198` — eseguiLogout
- `26220` — mostraApp
- `26225` — verificaSessioneEAvvia
- `26253` — assicuraTokenValido
- `26282` — _garantiscoSessionePerSync
- `26294` — avviaRinnovoTokenPeriodico
- `26298` — fermaRinnovoTokenPeriodico
- `26307` — _authReset
- `26312` — _authMostra
- `26315` — mostraLogin
- `26316` — mostraRegistrazione
- `26317` — mostraRecupero
- `26318` — mostraNuovaPassword
- `26321` — eseguiRegistrazione
- `26359` — eseguiRecuperoPassword
- `26388` — eseguiNuovaPassword
- `26422` — _parseHashParams
- `26429` — _pulisciHash
- `26433` — gestisciRitornoAuth
- `26523` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 26595-26718

- `26595` — apriPannelloRicette
- `26624` — chiudiPannelloRicette
- `26632` — applicaRicettaPasto
- `26668` — inizializzaP2
- `26680` — deepClone
- `26684` — applicaPatch
- `26718` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
