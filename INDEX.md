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
Righe 10986-11756

- `10986` — renderPdAnalisi
- `11035` — toggleAnalisiSection
- `11045` — loadAnalisiSanguePDF
- `11157` — _impNormalizzaNumero *(P124 — numero all'italiana → punto decimale, conversione fatta dall'app e non dall'AI)*
- `11168` — _impNumeri
- `11176` — _impSembraIntervallo
- `11184` — _impUgualeAlRange
- `11193` — _impLimitiStd
- `11214` — _impFuoriScala
- `11223` — _impCorrezioneVirgola
- `11235` — _impTestoLimiti
- `11247` — _impControllaValore *(P124 — i tre controlli anti-errore su un valore estratto)*
- `11289` — mostraDiffAnalisi *(P124 — colonna Estratto modificabile + righe sospette deselezionate)*
- `11474` — _calcoloIncluso
- `11480` — toggleCalcoloIncluso
- `11502` — _renderCalcoliPannello
- `11538` — toggleGlossario
- `11543` — updateAnalisi
- `11602` — salvaAnalisi
- `11615` — applicaGruppoClinico
- `11644` — renderBoxGruppiCliniciSuggeriti
- `11676` — suggerisciGruppiClinici
- `11756` — renderMemoriaInbody

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
Righe 11804-12215

- `11804` — _ibFmtBreve
- `11813` — _renderPesiIntermediSection
- `11862` — aggiungiPesoIntermedio
- `11878` — eliminaPesoIntermedio
- `11888` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `12215` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 12487-12487

- `12487` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 12865-15122

- `12865` — aggiornaLabelMacros
- `12883` — calcolaMacros
- `13024` — applicaSchema
- `13059` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `13065` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `13082` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `13118` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `13136` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `13249` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `13263` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `13319` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `13333` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `13365` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `13398` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `13440` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `13448` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `13459` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `13486` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `13501` — _stradeVerso *(le strade complete + percentuale libera)*
- `13524` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `13592` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `13614` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `13667` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `13771` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `13786` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `13811` — _renderRifPesoBox
- `13862` — _usaRifPeso
- `13866` — _aggiornaRifPesoTarget
- `13869` — _aggiornaRegimeSlider
- `14526` — _presetRegime
- `14530` — _initRegimeSliderDaPaziente
- `14548` — ricalcolaLAF
- `14690` — renderStoricoTDEE
- `14724` — attivaSlotTDEE
- `14732` — eliminaSlotTDEE
- `14745` — _toggleCiclizzazione
- `14751` — _aggiornaAnteprimaCiclizzazione
- `14769` — salvaCalcoloMacros
- `14883` — _metAllenamento
- `14899` — _neatFrazione
- `14973` — _larnLafStileVita
- `14990` — _regimeOffset
- `15000` — _componiRegimeText
- `15033` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `15045` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `15052` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `15122` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 15140-15570

- `15140` — renderTargetBadge
- `15169` — verificaRegola_75_20_5
- `15206` — renderBadge75_20_5
- `15271` — _validaNorm
- `15274` — _validaMatchTermine
- `15282` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `15333` — _validaTesto
- `15354` — validaPiano
- `15428` — _validaFirmaBlocchi
- `15435` — renderBadgeValidatore
- `15466` — _validaVaiAlGiorno
- `15475` — apriPannelloValidatore
- `13472` — esc
- `15532` — _validaEseguiOverride
- `15555` — validaGateExport
- `15570` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 15703-16335

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
- `15703` — pianoPazSelezionato
- `15850` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `16088` — renderPanelMacrosGiorno
- `16231` — pmgCambiaGrammi
- `16258` — riapriPiano
- `16296` — _montaPianoCorrente
- `16335` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 16345-16814

- `16345` — pullTemplateSupabase
- `16356` — delTemplateSupabase
- `16365` — _promptTemplateNome
- `16390` — _creaTemplateDaJSON
- `16413` — salvaComeTemplate
- `16424` — salvaComeTemplateDaPiano
- `16433` — _normNomeAlim
- `16434` — _escRegAlim
- `16435` — _raccogliAlimentiDaPiano
- `16446` — _alimentiEsclusiPaziente
- `16458` — _trovaConflittiTemplate
- `16476` — _mostraAvvisoConflitti
- `16500` — applicaTemplate
- `16518` — apriPickerTemplate
- `16546` — _pickPaziente
- `16565` — applicaTemplatePick
- `16569` — rinominaTemplate
- `16580` — eliminaTemplate
- `16590` — renderLibreriaTemplate
- `16619` — renderStoricoPiani
- `16678` — eliminaPiano
- `16694` — _getActiveMacrosTarget
- `16718` — getTargetAttivi
- `16755` — calcolaTargetsCiclizzazione
- `16781` — _setupPianoTargets
- `16805` — getStagioneCorrente
- `16814` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 17248-17248

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `17248` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 17257-17716

- `17257` — aggiornaUIcolazione
- `17267` — salvaRegolePiano
- `17328` — _isModelloSistema
- `17331` — _isModelloSistemaModificato
- `17343` — caricaModelliCustomLocal
- `17357` — salvaModelliCustomLocal
- `17378` — _migraRecordCustom
- `17393` — _syncAliasLegacy
- `17402` — caricaAlimentiCustom
- `17426` — pushAlimentiCustomSupabase
- `17436` — pullAlimentiCustomSupabase
- `17450` — pushModelliSupabase
- `17468` — pullModelliSupabase
- `17493` — _calcolaFreqDaModello
- `17512` — aggiornaUImodello
- `17601` — popolaDropdownModelli
- `17629` — cambiaModelloRotazione
- `17635` — ripristinaModelloOriginale
- `17658` — eliminaModelloCustom
- `17676` — mostraAnteprimaModello
- `17686` — apriEditorModello
- `17716` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 17985-18223

- `15738` — rerender
- `17985` — _salvaModelloDaEditor
- `18027` — caricaRegolePiano
- `18057` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `18092` — _aiLogUsage
- `18114` — _aiProxyUrl
- `18120` — _aiTokenPerProxy
- `18149` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `18223` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 18302-18442

- `16216` — _risolviCollisioniCelle
- `18302` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `18362` — getFruttaStile
- `18369` — _fruttaGetPasto
- `18379` — _fruttaContaRigheRicetta
- `18383` — _fruttaIndiceBasePasto
- `18403` — getFruttaMarker
- `18416` — fruttaMarkerHtml
- `18424` — _fruttaCheckboxHtml
- `18433` — toggleFrutta
- `18442` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 18478-19752

- `18478` — _renderCelleGriglia
- `18558` — _renderRicetteTestuali
- `18597` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `18668` — _renderCelleHtml
- `18676` — toggleCellaMenu
- `18695` — closeAllCellaMenus
- `18703` — _trovaPasto
- `18711` — cellaSposta
- `18765` — cellaCancella
- `18786` — apriEditGrammatura
- `16789` — salva
- `18834` — cellaSwap
- `18854` — cellaRimuoviAlt
- `18868` — cellaAggiungiAlt
- `18971` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `19056` — apriEditRicetta
- `19065` — aggiungiRicetta
- `19081` — rimuoviRicetta
- `19090` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `19252` — ngAggiungiSpuntinoVuoto
- `19268` — apriAggiungiCella
- `17254` — risolviCompatibili
- `19364` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `19456` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `19597` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `19752` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 19800-20181

- `19800` — _attesoStrutturaPiano
- `19820` — _confrontaStrutturaPiano
- `19850` — _costruisciPromptDelta
- `19877` — _pianoToolSchema
- `19952` — _pianoMaxTokens
- `19961` — _estraiPianoDaRisposta
- `19983` — chiamaGeneraPiano
- `20150` — mostraLoadingSteps
- `18123` — render
- `20181` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 20248-20822

- `20248` — generaMessaggioAI
- `20353` — copiaMessaggioAI
- `20363` — salvaInStorico
- `20375` — salvaVarianteAI
- `20390` — renderVariantiSalvate
- `20409` — usaVariante
- `20427` — eliminaVariante
- `20438` — renderStoricoMsg
- `20454` — apriWhatsApp
- `20822` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 21000-22497

- `21000` — _ngColoreSemaforoNome
- `21008` — apriSceltaModalitaPiano
- `21043` — _ngChiudiModalita
- `21046` — _ngCostruisciGiornoVuoto
- `21079` — _ngCostruisciGiornoSpeciale
- `21090` — _ngIndiceInizioSpeciali
- `21101` — _ngModalitaNomeGiorno
- `21107` — _ngImpostaModalitaNomeGiorno
- `21110` — _ngLettera
- `21117` — _ngEtichettaGiorno
- `21137` — _ngEtichettaGiornoBreve
- `21151` — _ngToggleGiornoSpeciale
- `21175` — _ngRenderPannelloSpeciale
- `21243` — _generaGiornoSpecialeAI
- `21343` — _ngGiornoHaContenuto
- `21355` — _ngCreaPianoManuale
- `21378` — _ngScrollTabGiorni
- `21388` — _ngAbilitaDragScroll
- `21425` — _ngCambiaNumeroGiorni
- `21457` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `21471` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `21512` — _ngToggleCat
- `21521` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `21545` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `21701` — _ngSalvaPianoManuale
- `21727` — _ngParseIngrediente
- `21751` — _ngScomponiIngredienti
- `21763` — _ricCalcolaMacroDaIngredienti
- `21781` — _ricRicalcolaMacroLive
- `21788` — _ricAggiornaInfoMacro
- `21802` — _ricRicalcolaMacroLiveNow
- `21826` — _ngTrovaCategoriaAlimento
- `21859` — _ngPescaRicetta
- `21902` — _ngScomponiRicettaNelPasto
- `21939` — _ngDragStart
- `21950` — _ngDragStartCella
- `21961` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `21968` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `21973` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `21992` — _ngAggiungiAlimento
- `22017` — _ngRimuoviAlimento
- `22031` — _ngDopoModifica
- `22049` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `22102` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `22131` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `22148` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `22156` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `22228` — gramTestoCasalingo
- `22254` — _appendToggleNutrizionali
- `22297` — _appendTogglePromemoria
- `22326` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `22472` — cpFromEmoji
- `22478` — getEmojiCp
- `22497` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `20472` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `20494` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `20499` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `20525` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `20613` — _spesaTestoWhatsApp
- `20629` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `20674` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `20697` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `20725` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `20785` — scaricaListaSpesaPDF (download diretto, un click)
- `20793` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `20805` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 23645-23645

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
- `23645` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 23656-23862

- `23656` — salvaInbody
- `23720` — delInbody
- `23727` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `23862` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 23890-24359

- `23890` — buildSemLegenda
- `23904` — renderAlEditor
- `23965` — _alimNomeRegex
- `23973` — _alimGiorniDaPiano
- `23981` — _scanGiorniPerNome
- `23996` — scanRiferimentiAlimento
- `24025` — _alimRefsRighe
- `24031` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `24119` — modificaAlimentoCustom
- `24139` — ripristinaValoriPrecedentiAlimento
- `24151` — _resetAlimModal
- `24162` — apriNuovoAlimentoCustom
- `24168` — salvaAlimentoCustom
- `24235` — eliminaAlimentoCustom
- `24266` — _alimFonteBadge
- `24271` — renderAlimentiPage
- `22217` — E
- `24341` — archiviaAlimentoCustom
- `24359` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 24386-24627

- `24386` — _bcSetStatus
- `24388` — apriScannerBarcode
- `24396` — chiudiScannerBarcode
- `24401` — _bcStopCamera
- `24409` — _bcModaleAperto
- `24411` — _bcAvviaCamera
- `24422` — _bcAvviaNativo
- `24442` — _bcAvviaZXing
- `24451` — _bcZXStart
- `24462` — _bcErroreCamera
- `24470` — cercaBarcodeManuale
- `24476` — _barcodeTrovato
- `24492` — cercaBarcodeOFF
- `24510` — _bcProdottoNonTrovato
- `24524` — _bcPrecompilaForm
- `22477` — num
- `24548` — togAl
- `24601` — selCatAl
- `24615` — selTuttiAl
- `24627` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 24641-24957

- `24641` — setCalView
- `24642` — calPrev
- `24643` — calNext
- `24644` — calToday
- `24646` — renderCal
- `24660` — renderCalMonth
- `24684` — renderCalWeek
- `24702` — renderCalDay
- `24718` — selGiorno
- `24732` — setDisp
- `24737` — openAddEvento
- `24750` — openAddEventoPaz
- `24756` — toggleEntrataCheck
- `24761` — salvaEvento
- `24784` — openEvDetail
- `24839` — delEvento
- `24847` — copyMsg
- `24854` — aggDateCal
- `24859` — syncInizio
- `24860` — syncControllo
- `24861` — aggiornaPrev
- `24878` — renderRic
- `24905` — openNuovaRic
- `24906` — editRic
- `24916` — salvaRic
- `24941` — delRic
- `24957` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 25042-25102

- `25042` — aggiungiEntrataPerPaziente
- `25059` — openNuovaEntrata
- `25073` — salvaEntrata
- `25094` — delEntrata
- `25102` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 25132-25568

- `25132` — aiSuggerisciRicetta
- `25177` — renderConcettiModal
- `25196` — apriConcettiModal
- `25223` — salvaConcettiAllegati
- `25247` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `25285` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `25294` — loadInbodyPDF
- `25405` — _vitdLabel
- `25409` — getIntegratori
- `25413` — getIntegraWant
- `25417` — setIntegratori
- `25434` — setIntegraWant
- `25445` — getPatologieChip
- `25446` — getAllergieChip
- `25447` — setPatologieChip
- `25448` — setAllergieChip
- `25449` — getPatologie
- `25450` — getAllergie
- `25451` — setPatologieFromStr
- `25458` — setAllergieFromStr
- `25471` — getSdvChip
- `25472` — getCspChip
- `25473` — setSdvChip
- `25474` — setCspChip
- `25475` — setSdvFromStr
- `25476` — setCspFromStr
- `25480` — getBudget
- `25481` — setBudget
- `25486` — renderCalAnno
- `25517` — comprimeImmagine
- `25539` — uploadImmagineConcetto
- `25558` — rimuoviImmagineConcetto
- `25568` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 25634-25738

- `25634` — entraSelConcetti
- `25635` — annullaSelConcetti
- `25636` — toggleConcettoSel
- `25641` — eliminaConcettiSelezionati
- `25660` — confermaEliminaConcetti
- `25675` — aiRiscriviConcetto
- `25689` — editConcetto
- `25707` — salvaConcetto
- `25718` — openNuovoConcetto
- `25738` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 25739-25902

- `25739` — saveAgendaPersonale
- `25740` — getAgendaTodo
- `25741` — saveAgendaTodo
- `25743` — pulisciAgendaVecchia
- `25747` — navigaAgenda
- `25756` — toggleFormAgenda
- `25757` — toggleFormTodo
- `25759` — salvaAgendaItem
- `25773` — salvaTodoItem
- `25785` — toggleAgendaFatto
- `25793` — toggleTodoFatto
- `25806` — _catCol
- `25808` — renderAgendaDx
- `25902` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 26028-26232

- `26028` — renderScadenzeAlert
- `26213` — segnaGestito
- `26232` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 26241-26316

- `26241` — ripristinaPaz
- `26249` — eliminaPaz
- `26294` — getDove
- `26298` — setDove
- `26316` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 26321-26761

- `26321` — getCredenzialiPersistenti
- `26334` — cancellaCredenzialiPersistenti
- `26339` — rinnovaSessioneConRefreshToken
- `26356` — getSessioneSalvata
- `26375` — salvaSessione
- `26385` — cancellaSessione
- `26389` — eseguiLogin
- `26436` — eseguiLogout
- `26458` — mostraApp
- `26463` — verificaSessioneEAvvia
- `26491` — assicuraTokenValido
- `26520` — _garantiscoSessionePerSync
- `26532` — avviaRinnovoTokenPeriodico
- `26536` — fermaRinnovoTokenPeriodico
- `26545` — _authReset
- `26550` — _authMostra
- `26553` — mostraLogin
- `26554` — mostraRegistrazione
- `26555` — mostraRecupero
- `26556` — mostraNuovaPassword
- `26559` — eseguiRegistrazione
- `26597` — eseguiRecuperoPassword
- `26626` — eseguiNuovaPassword
- `26660` — _parseHashParams
- `26667` — _pulisciHash
- `26671` — gestisciRitornoAuth
- `26761` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 26833-26956

- `26833` — apriPannelloRicette
- `26862` — chiudiPannelloRicette
- `26870` — applicaRicettaPasto
- `26906` — inizializzaP2
- `26918` — deepClone
- `26922` — applicaPatch
- `26956` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
