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
Righe 2408-2450

- `2408` — _slugAlimento
- `2416` — _catalogoIndicizza
- `2420` — _catalogoDeindicizza
- `2427` — costruisciCatalogo
- `2450` — risolviAlimento

---

### MACROS PIANO — calcolo e badge macro reali vs target
Righe 2465-2728

- `2465` — getValoriCREA
- `2477` — getCurrentPaziente
- `2497` — getKcalWeekend
- `2554` — getMacrosRicettaComposta
- `2560` — calcolaMacrosPiano
- `2662` — renderBadgeMacrosReali
- `2611` — pctStr
- `2612` — color
- `2625` — row
- `2728` — renderBadgeMacrosReali_DOM

---

### ANALISI DEL SANGUE — parsing, indici clinici derivati, interpretazione
Righe 3013-3200

- `3013` — _parseAnalisiNum
- `3021` — calcolaIndice
- `3174` — interpretaAnalisi
- `3186` — _interpAnalisiHtml
- `3200` — mostraInfoRange

---

### CONCETTI EDUCATIVI — sync Supabase, migrazione
Righe 3343-3367

- `3343` — pushConcetiSupabase
- `3353` — pullConcetiSupabase
- `3367` — migraConcetti

---

### ALIMENTI — categorie funzionali/semaforo, chip UI, equivalenze porzioni
Righe 3557-3912

- `3557` — getCategoriaSemaforo
- `3574` — _getCategorieGruppo
- `3588` — calcolaGrammaturaEquivalente
- `3628` — _gruppoEquiv  (P121: gruppo di equivalenza + criterio per categoria funzionale)
- `3634` — _porzioneStandard  (P121: porzione `g` di database dell'alimento)
- `3649` — suggerisciGrEquivalente  (P121: firma a 3 argomenti, il gruppo si deduce dai due alimenti)
- `3675` — _etichettaCriterio  (P121: ≈carbo / ≈prot / ≈grassi / fissa / porzione)
- `3690` — _promptAlternativeGrassi  (P121: riga del prompt AI generata dal motore)
- `3706` — ricalcolaAlternative  (P121: MOTORE UNICO, unico punto che scrive la grammatura di un'alternativa)
- `3725` — ricalcolaAlternativePiano  (P121: applica il motore a tutte le celle di un piano)
- `3774` — arrotondaGrammatura  (P121: sostituisce arrotondaPorzioneDiscreta — pezzi interi senza tetto / 5g)
- `3784` — getCategoriaFunzionale
- `3824` — catArr
- `3840` — _tagComuniTrova
- `3844` — getTagComuniChip
- `3847` — setTagComuniChip
- `3855` — setCatChips
- `3868` — getStagioniChip
- `3871` — setStagioniChip
- `3878` — getProfiloChip
- `3881` — setProfiloChip
- `3890` — wireChipGroup
- `3901` — wireAttrChipGroups
- `3912` — wireRadioChipGroup

---

### CONFIG / STORAGE LOCALE — cfg, localStorage db, util data/valuta
Righe 3940-4320

- `3940` — getCfg
- `3941` — saveCfgL
- `3942` — getUrl
- `3943` — saveLocal
- `3944` — loadLocal
- `3956` — uid
- `3957` — today
- `3958` — addDays
- `3959` — fData
- `3960` — fEur
- `3962` — getLastSyncText
- `3972` — getSyncColor
- `3979` — aggiornaStatoSync
- `4005` — setSyncStatus
- `4274` — _registraTombstone
- `4282` — _tombstoneAttivi
- `4294` — _fondiTombstones
- `4308` — _mergeTombstonesRemoti *(dal 24/7 legge il meta da `collections`, P74 1d)*
- `4320` — _applicaTombstones
- `4181` — _pazFetchMeta *(P74 1d — solo `collections`)*
- `4202` — _collectionsUpsert *(P74 — scrittura primaria dei 4 meta-record dal cutover 1d)*
- `4224` — _collectionsFetch *(P74 1d — lettura unica dei meta-record)*
- `4247` — _analisiSangueUpsert *(P74 fase 2 — scrittura ombra analisi del sangue, 24/7)*

---

### SYNC SUPABASE — push/pull ricette/pazienti, tombstones, conflitti (P69)
Righe 4344-4729

- `4344` — supaHeaders
- `4358` — pushRicetteSupabase
- `4383` — pullRicetteSupabase
- `4405` — delRicetteSupabase
- `4417` — delPazienteSupabase
- `4432` — pushToSheets
- `4476` — pullFromSheets
- `4555` — syncNow
- `4568` — sincronizzaTutto
- `4360` — stpSet
- `4365` — stpMsg
- `4699` — testConnSupabase
- `4729` — _p68LogSaveAnonimo

---

### SYNC SUPABASE — save paziente, piani/cache piano, entrate, eventi
Righe 4743-5265

- `4743` — save
- `4761` — _pushRigaPerId
- `4794` — _flushDirtyIds
- `4877` — _p69LoadBaseline
- `4880` — _p69StoreBaseline
- `4883` — _p69SetBaseline
- `4887` — _p69DropBaseline
- `4891` — _p69SetBaselineFromRows
- `4897` — _p69NomePaz
- `4902` — _p69InList
- `4910` — _p69RilevaConflitti
- `4946` — _p69DialogoConflitti
- `4738` — chiudi
- `4980` — _p69RisolviRicarica
- `5009` — _p69EsportaLocali
- `5022` — _p69RisolviSovrascrivi
- `5035` — pushPianoSupabase
- `5057` — pullPianiSupabase
- `5073` — delPianoSupabase
- `5089` — delPianiPazienteSupabase
- `5101` — pushCachePianoSupabase
- `5118` — caricaCachePianoSupabase
- `5140` — pushEntrateSupabase
- `5164` — pullEntrateSupabase
- `5178` — delEntrataSupabase
- `5186` — pushEntrataSupabase
- `5197` — pushEventoSupabase
- `5210` — pushEventiSupabase
- `5234` — pullEventiSupabase
- `5254` — delEventoSupabase
- `5265` — _pianoCacheKey

---

### UI GENERALE — config AI key, notifiche, navigazione (goTo/tab/modali)
Righe 5296-5407

- `5296` — _salvaPianoCache
- `5301` — _caricaPianoCache
- `5307` — salvaCfg
- `5308` — testConn
- `5315` — testaAntKey
- `5326` — initAntCard
- `5329` — esporta
- `5330` — importa
- `5335` — goTo
- `5351` — closeM
- `5359` — ngChiudiModale
- `5368` — ngChiudiPopupCoppia
- `5372` — ngAggiungiX
- `5383` — ngUpgradeModali
- `5403` — mTab
- `5404` — aggiornaEta
- `5405` — toggleOrarioNote
- `5406` — pdTab
- `5407` — notif

---

### PAZIENTI — registro: lista/card/kanban, apertura, editing, salvataggio, routine
Righe 5415-8196

- `5415` — getPazView
- `5416` — setPazView
- `5425` — _pazStatoPiano
- `5433` — _pazUrgenzaControllo
- `5440` — _pazStatoTagHtml
- `5449` — _pazAggiornaFiltroRegimi
- `5457` — renderPaz
- `5510` — _renderPazCard
- `5535` — _renderPazLista
- `5562` — _renderPazKanban
- `5600` — openNuovoPaz
- `5626` — editPaz
- `5704` — REGOLE_SEMAFORO_ALIMENTI *(15 condizioni cliniche → grigi/celesti; globale dal 26/7 per essere verificabile dal test)*
- `6151` — _SEM_COLORI_LEGACY / `6105` _SEM_COLORI_AUTO *(F9 — unico vocabolario dei colori automatici)*
- `6156` — NOMI_CONDIZIONE_SEMAFORO *(etichette delle 15 condizioni, usate anche dal riquadro della scheda)*
- `6178` — _semaforoCondizioniAttive *(le condizioni spuntate su un paziente)*
- `6189` — _semaforoMigraPaziente *(F9 — toglie i colori legacy e ricalcola; idempotente)*
- `6200` — _semaforoMigraTutti *(passata su tutti i pazienti in memoria, con conteggio)*
- `6211` — applicaRegoloSemaforo *(dal 26/7 pulisce TUTTI e sei i colori automatici, non solo i suoi due)*
- `6299` — trovaChiaveAlimento *(match esatto sul nome: se non trova, la regola è ignorata in silenzio — vedi test s2-regole-nomi-alimenti)*
- `6323` — _pazNumOPrec *(F7 — campo assente = valore precedente, non azzeramento)*
- `6335` — _pazPreservaCampi *(F5 — l'anagrafica non cancella i campi che il form non gestisce)*
- `6341` — salvaPaz
- `6432` — openPaz
- `7883` — renderPdRoutine
- `6723` — cardHTML
- `8025` — updateRoutineCampo
- `8033` — suggerisciPastoEQuando
- `8060` — filtroLibreria
- `8069` — renderLibreriaGrid
- `8090` — aggiungiDaLibreriaIdx
- `8114` — openModalRoutine
- `8121` — salvaRoutineVoce
- `8146` — salvaRoutine
- `8153` — mostraRoutinePopup
- `8181` — removeRoutineVoce
- `8196` — _renderAggiustamentiSection

---

### 📈 PERCORSO — timeline di periodizzazione (P115 Tappe 1-5 COMPLETE, 24 lug 2026)
Righe 6021-6621 (numeri ESATTI al 24/7 notte, dopo la Tappa 5). ⚠️ Questo blocco (~600 righe) fa slittare tutti i numeri delle sezioni SUCCESSIVE a riga ~6020 rispetto all'ultima rigenerazione completa: per quelle sezioni fare grep di conferma. Rigenerazione completa alla prossima modifica strutturale.

- `6477` — _PERCORSO_TIPI (const: tipi fase, colori, pct default)
- `6484` — _percorsoGet *(normalizza p.percorso, scarta fasi invalide)*
- `6506` — _percorsoIsoLocal *(data → YYYY-MM-DD LOCALE, mai toISOString/UTC)*
- `6512` — _percorsoIntervalli *(fasi consecutive → date concrete dal/al)*
- `6526` — _percorsoFaseAt *(fase attiva a una data; dal incluso, al escluso)*
- `6535` — _percorsoKcalFase *(pct → kcal indicative via calcolaTDEE)*
- `6558` — _percorsoProiezione *(Tappa 2 — proiezione ibrida teorica/calibrata, cono, obiettivo a intervallo)*
- `6616` — _percorsoDataBreve *(ISO → "12 set")*
- `6633` — _percorsoSerieEnergia *(Tappa 3 — serie introito/TDEE stimato/TDEE osservato per la corsia energia)*
- `6672` — _percorsoSerieMassaMagra *(Tappa 4 — solo InBody: punti {data,m,pg})*
- `6691` — _percorsoConsuntivo *(Tappa 5 — legge p.consuntivo scritto da P50: aderenza, extra kcal, ritardo=extra÷7700, settimane perse; oggi sempre ok:false)*
- `6733` — _PERCORSO_LAYERS_DEFAULT / _percorsoLayersState / _percorsoLayersGet *(Tappa 4 — stato interruttori, SOLO sessione, mai su p)*
- `6738` — percorsoLayerToggle *(Tappa 4 — inverte un solo strato)*
- `6744` — percorsoVistaPreset *(Tappa 4 — preset "tecnica"/"paziente")*
- `6760` — _percorsoPaz *(e a seguire i mutatori percorsoInit/SetInizio/AddFase/UpdFase/DelFase/MoveFase)*
- `6816` — _PERCORSO_MODELLI / _PERCORSO_GEN *(P122 T3 — 4 modelli + regole dei cicli)*
- `6834` — _percorsoGeneraFasi *(P122 T3 — pura: dal traguardo alle fasi, ritmo = quello della proiezione)*
- `6914` — _percorsoModelloSelectHtml
- `6923` — percorsoGeneraDaModello *(propone; conferma prima di sostituire fasi esistenti)*
- `6946` — _percorsoShiftGiorni *(pura: ancora = ultima pesata)*
- `6956` — percorsoRiallinea *(⏩ trasla il piano, riprende dal giorno-fase dell'interruzione)*
- `6983` — _TRG_TIPI / `6744` _TRG_COMPORTAMENTI *(P122 T4 — tipi di traguardo e libreria comportamenti)*
- `7005` — _traguardiGet · `6761` _traguardoValoreAttuale *(valore corrente dai dati esistenti, null se manca)*
- `7044` — _traguardoVerso *(auto: dedotto dalla partenza)* · `6803` _traguardoValuta · `6824` _traguardiValuta
- `7085` — traguardoAdd · `6852` traguardoUpd · `6867` traguardoDel · `6873` traguardoSegna
- `7143` — _COND_TIPI · `6897` _percorsoCondizione *(pura: la fase finisce per soglia — SOLO suggerimento)*
- `7159` — percorsoSetCondizione · `6927` percorsoChiudiFase *(esito fotografato, riapribile)*
- `7193` — _traguardiHtml *(blocco 🏁 in fondo alla scheda Percorso)*
- `7291` — _percorsoVistaPaz / `7049` _percorsoVistaPazAttiva *(P122 T5 — modalità di sessione)*
- `7298` — _percorsoVittorie *(pura: vittorie dall'inizio del percorso + flag ricomposizione)*
- `7336` — _percorsoNascondiPeso *(in fase di massa il peso non si mostra al paziente)*
- `7347` — _traguardoFaseCorrente *(traguardo della fase IN CORSO, non quello lontano)*
- `7375` — _traguardoTestoPaziente *(righe in italiano semplice, riusate dal messaggio WhatsApp)*
- `7408` — _vistaPazienteHtml *(i tre riquadri che guarda il paziente)*
- `7488` — _percorsoChartSvg *(due corsie: peso + massa magra + cono proiezione sopra, striscia aderenza in mezzo (solo con dati P50), energia (kcal) sotto — tutto gated dagli interruttori)*
- `7677` — renderPdPercorso *(scheda: badge fase, riga proiezione/obiettivo, riga Piano vs Realtà (solo con dati), toolbar interruttori, grafico, editor)*

*(Tappa 2 tocca anche `calcolaMacros`: box obiettivo con intervallo al posto della data secca.)*

---

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 8281-8452

- `8281` — salvaAggiustamento
- `8314` — eliminaAggiustamento
- `8323` — renderPdNote
- `8358` — salvaNotaClinica
- `8373` — deleteNota
- `8382` — saveNote
- `8402` — resetSemaforoAuto *(F9 — pulsante 🔄 Ricalcola: pulisce gli automatici e rifà col sistema valido; il motore LEGACY non esiste più)*
- `8452` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 8678-8876

- `8678` — avviaFX
- `8706` — avviaAnalisi
- `8723` — _renderFlussoPanel
- `8767` — _riepEsc
- `8771` — _riepNum
- `8777` — _riepDelta
- `8785` — _riepDataSig
- `8803` — _riepParseFX
- `8087` — clean
- `8817` — _riepAggiornaFX
- `8843` — _riepToggleDomandaDefault
- `8855` — _riepAddDomanda
- `8868` — _riepRemoveDomanda
- `8876` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 9088-9315

- `8218` — dCol
- `8336` — card
- `9088` — renderPdRagionamento
- `9176` — inviaMessaggioRag
- `9194` — concludiERiassumi
- `9208` — salvaRagionamento
- `9229` — apriGeneratoreDaRag
- `9237` — nuovaSessioneRag
- `9243` — cancellaSavedRag
- `9253` — renderPazTimeline
- `9285` — renderPdAnamnesi
- `9315` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 11263-12398

- `11263` — _anNorm *(P125 — testo confrontabile: minuscole, niente accenti)*
- `11269` — _anCorrisponde *(P125 — ricerca per parole-prefisso: "vit d" trova "Vitamina D")*
- `11275` — filtraAnalisi *(P125 — filtro dal vivo delle 119 voci)*
- `11309` — pulisciRicercaAnalisi
- `11315` — renderPdAnalisi
- `11371` — toggleAnalisiSection
- `11520` — loadAnalisiSanguePDF
- `11407` — _impPdfConfigurata
- `11408` — _impPdfLib
- `11418` — _impPdfApri
- `11431` — _impPdfPagina *(P124b — una pagina del PDF → immagine, con la rotazione RILEVATA, non quella dichiarata dal file)*
- `11452` — _impRuotaImmagine
- `11477` — _impRilevaRotazione *(P124b — chiamata piccola: di quanti gradi va girata la pagina)*
- `11496` — _impPromptPagina *(P124b — prompt di UNA pagina, con l'impronta della riga: valore+unità+riferimento)*
- `11695` — _impNormalizzaNumero *(P124 — numero all'italiana → punto decimale, conversione fatta dall'app e non dall'AI)*
- `11706` — _impNumeri
- `11714` — _impSembraIntervallo
- `11722` — _impUgualeAlRange
- `11731` — _impLimitiStd
- `11752` — _impFuoriScala
- `11761` — _impCorrezioneVirgola
- `11773` — _impTestoLimiti
- `11794` — _impRifPlausibile *(P124b — un "riferimento" che è un'unità di misura = riga disallineata)*
- `11807` — _impUnitaCanonica
- `11829` — _impStessaGrandezza *(P124b — stesso tipo di misura a meno del prefisso: nanomoli/micromoli/millimoli)*
- `11846` — _impUnitaCompatibili
- `11857` — _impControllaValore *(P124 — i controlli anti-errore su un valore estratto)*
- `11921` — mostraDiffAnalisi *(P124 — colonna Estratto modificabile + righe sospette deselezionate)*
- `12111` — _calcoloIncluso
- `12117` — toggleCalcoloIncluso
- `12139` — _renderCalcoliPannello
- `12180` — toggleGlossario
- `12185` — updateAnalisi
- `12244` — salvaAnalisi
- `12257` — applicaGruppoClinico
- `12286` — renderBoxGruppiCliniciSuggeriti
- `12318` — suggerisciGruppiClinici
- `12398` — renderMemoriaInbody

---
### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9176 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `9445` — _richVal
- `9452` — _richBmi
- `9457` — _richPat
- `9463` — _richNum
- `9508` — _richPreselezione
- `9524` — richLeggiIntestazione
- `9528` — richSalvaIntestazione
- `9537` — apriRichiestaAnalisi
- `9557` — _richModaleHtml
- `9633` — _richEsc
- `9635` — _richMotivoCambia
- `9641` — _richToggleSez
- `9647` — _richAggiornaConteggi
- `9655` — _richMotivoCorrente
- `9665` — _richSelezione
- `9680` — _richTxt
- `9686` — _richCostruisciPDF
- `8969` — nuovaPagina
- `8970` — spazio
- `9782` — _richNomeFile
- `9787` — _richPrepara
- `9800` — _richRegistra
- `9805` — _richStato
- `9807` — richScaricaPDF
- `9856` — _richUpload
- `9858` — _richWaUrl
- `9865` — _richTestoWa
- `9879` — richInviaWhatsApp
- `9919` — richCopiaLink
- `9940` — _richStoricoHtml

---
### REFERTI DEL SANGUE DATATI — storico nel tempo (P118 tappa 1)
Righe 9194-9387 — migrazione, ordinamento, quadro attuale derivato, barra di selezione.

- `11040` — _refertoNuovoId
- `11043` — _refertoOggi
- `11047` — _refertoDataIt
- `11053` — _refertoConteggio
- `11067` — _refertiMigra
- `11094` — _refertiOrdinati
- `11105` — _refertoPiuRecente
- `11110` — _refertoInVista
- `11128` — _refertiApplica
- `11141` — _refertoCrea
- `11160` — refertoCambiaVista
- `11166` — refertoCambiaData
- `11178` — refertoNuovo
- `11186` — refertoDuplica
- `11195` — refertoElimina
- `11210` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `10653` — _rangeNum
- `10659` — _rangeTestoDa
- `10678` — _rangeCoppia
- `10688` — _rangeHtml

---
### ANDAMENTO NEL TEMPO — tracciato, variazione, grafico grande (P118 tappa 3)
Righe 9441-9745 — serie storica, regola del colore, sparkline, pannello in fondo.

- `10730` — _andLimiti
- `10751` — _andParseRangeLab
- `10764` — _andDistanza
- `10771` — _andValutazione
- `10784` — _andSerie
- `10798` — _andNum
- `10802` — _andDataBreve
- `10807` — _andMeseAnno
- `10815` — _andDominio
- `10829` — _andColore
- `10842` — _andSparkHtml
- `10868` — _andRigaHtml
- `10890` — _andEsamiSeguibili
- `10898` — andScegliEsame
- `10904` — _andPannelloHtml
- `10957` — _andGraficoGrande
- `11008` — _andPasso

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 12448-13769

- `12448` — _ibFmtBreve
- `12457` — _renderPesiIntermediSection
- `12506` — aggiungiPesoIntermedio
- `12522` — eliminaPesoIntermedio
- `12532` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `13769` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 14077-14077

- `14077` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 14455-16996

- `14455` — aggiornaLabelMacros
- `14473` — calcolaMacros
- `14614` — applicaSchema
- `14649` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `14655` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `14677` — _misuraDaReferto *(P127 — UN referto letto con le regole del traguardo: usata anche dalla verifica al controllo)*
- `14710` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `14721` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `14739` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `14852` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `14866` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `14922` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `14936` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `14968` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `15001` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `15043` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `15051` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `15062` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `15089` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `15104` — _stradeVerso *(le strade complete + percentuale libera)*
- `15151` — _VC_TOLLERANZA_PCT / _VC_GIORNI_MIN / _VC_GIORNI_MIN_RITARO / _VC_COPERTURA_MIN_PCT / _VC_MAGRA_PRUDENZA_GG *(P127 — soglie cliniche della verifica)*
- `15161` — _mediaSlotPrescritta *(media pesata sui giorni di un campo dello storico target; la usa anche _kcalMediaPrescrittaOss)*
- `15181` — _vcDeficitSlot *(deficit di uno slot: campo offset o kcal−tdee per gli slot vecchi)*
- `15189` — _vcTratto *(P127 — cosa è cambiato fra due referti, previsto vs reale, TDEE misurato)*
- `15243` — _vcTraguardoSalvato *(traguardo ricostruito dal salvato, per la scheda Percorso)*
- `15253` — _verificaControllo *(P127 — motore puro: tratto recente, quadro dall'inizio, residuo al ritmo reale)*
- `15291` — _verificaControlloHtml *(blocco 🔎, unica fonte per pannello 🎯 e scheda Percorso; azioni solo dove c'è il campo kcal)*
- `15383` — _vcRitara *(scrive le kcal ritarate nel campo regime: propone, non salva)*
- `15396` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `15464` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `15486` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `15539` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `15646` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `15661` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `15686` — _renderRifPesoBox
- `15737` — _usaRifPeso
- `15741` — _aggiornaRifPesoTarget
- `15744` — _aggiornaRegimeSlider
- `16401` — _presetRegime
- `16405` — _initRegimeSliderDaPaziente
- `16423` — ricalcolaLAF
- `16557` — renderStoricoTDEE
- `16591` — attivaSlotTDEE
- `16599` — eliminaSlotTDEE
- `16612` — _toggleCiclizzazione
- `16618` — _aggiornaAnteprimaCiclizzazione
- `16636` — salvaCalcoloMacros
- `16750` — _metAllenamento
- `16766` — _neatFrazione
- `16840` — _larnLafStileVita
- `16857` — _regimeOffset
- `16867` — _componiRegimeText
- `16900` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `16912` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `16919` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `16996` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 17014-17444

- `17014` — renderTargetBadge
- `17043` — verificaRegola_75_20_5
- `17080` — renderBadge75_20_5
- `17145` — _validaNorm
- `17148` — _validaMatchTermine
- `17156` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `17207` — _validaTesto
- `17228` — validaPiano
- `17302` — _validaFirmaBlocchi
- `17309` — renderBadgeValidatore
- `17340` — _validaVaiAlGiorno
- `17349` — apriPannelloValidatore
- `13472` — esc
- `17406` — _validaEseguiOverride
- `17429` — validaGateExport
- `17444` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 17577-18209

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
- `17577` — pianoPazSelezionato
- `17724` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `17962` — renderPanelMacrosGiorno
- `18105` — pmgCambiaGrammi
- `18132` — riapriPiano
- `18170` — _montaPianoCorrente
- `18209` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 18219-18688

- `18219` — pullTemplateSupabase
- `18230` — delTemplateSupabase
- `18239` — _promptTemplateNome
- `18264` — _creaTemplateDaJSON
- `18287` — salvaComeTemplate
- `18298` — salvaComeTemplateDaPiano
- `18307` — _normNomeAlim
- `18308` — _escRegAlim
- `18309` — _raccogliAlimentiDaPiano
- `18320` — _alimentiEsclusiPaziente
- `18332` — _trovaConflittiTemplate
- `18350` — _mostraAvvisoConflitti
- `18374` — applicaTemplate
- `18392` — apriPickerTemplate
- `18420` — _pickPaziente
- `18439` — applicaTemplatePick
- `18443` — rinominaTemplate
- `18454` — eliminaTemplate
- `18464` — renderLibreriaTemplate
- `18493` — renderStoricoPiani
- `18552` — eliminaPiano
- `18568` — _getActiveMacrosTarget
- `18592` — getTargetAttivi
- `18629` — calcolaTargetsCiclizzazione
- `18655` — _setupPianoTargets
- `18679` — getStagioneCorrente
- `18688` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 19150-19150

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `19150` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 19159-19618

- `19159` — aggiornaUIcolazione
- `19169` — salvaRegolePiano
- `19230` — _isModelloSistema
- `19233` — _isModelloSistemaModificato
- `19245` — caricaModelliCustomLocal
- `19259` — salvaModelliCustomLocal
- `19280` — _migraRecordCustom
- `19295` — _syncAliasLegacy
- `19304` — caricaAlimentiCustom
- `19328` — pushAlimentiCustomSupabase
- `19338` — pullAlimentiCustomSupabase
- `19352` — pushModelliSupabase
- `19370` — pullModelliSupabase
- `19395` — _calcolaFreqDaModello
- `19414` — aggiornaUImodello
- `19503` — popolaDropdownModelli
- `19531` — cambiaModelloRotazione
- `19537` — ripristinaModelloOriginale
- `19560` — eliminaModelloCustom
- `19578` — mostraAnteprimaModello
- `19588` — apriEditorModello
- `19618` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 19887-20125

- `15738` — rerender
- `19887` — _salvaModelloDaEditor
- `19929` — caricaRegolePiano
- `19959` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `19994` — _aiLogUsage
- `20016` — _aiProxyUrl
- `20022` — _aiTokenPerProxy
- `20051` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `20125` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 20204-20344

- `16216` — _risolviCollisioniCelle
- `20204` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `20264` — getFruttaStile
- `20271` — _fruttaGetPasto
- `20281` — _fruttaContaRigheRicetta
- `20285` — _fruttaIndiceBasePasto
- `20305` — getFruttaMarker
- `20318` — fruttaMarkerHtml
- `20326` — _fruttaCheckboxHtml
- `20335` — toggleFrutta
- `20344` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 20380-21654

- `20380` — _renderCelleGriglia
- `20460` — _renderRicetteTestuali
- `20499` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `20570` — _renderCelleHtml
- `20578` — toggleCellaMenu
- `20597` — closeAllCellaMenus
- `20605` — _trovaPasto
- `20613` — cellaSposta
- `20667` — cellaCancella
- `20688` — apriEditGrammatura
- `16789` — salva
- `20736` — cellaSwap
- `20756` — cellaRimuoviAlt
- `20770` — cellaAggiungiAlt
- `20873` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `20958` — apriEditRicetta
- `20967` — aggiungiRicetta
- `20983` — rimuoviRicetta
- `20992` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `21154` — ngAggiungiSpuntinoVuoto
- `21170` — apriAggiungiCella
- `17254` — risolviCompatibili
- `21266` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `21358` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `21499` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `21654` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 21702-22094

- `21702` — _attesoStrutturaPiano
- `21722` — _confrontaStrutturaPiano
- `21752` — _costruisciPromptDelta
- `21779` — _pianoToolSchema
- `21854` — _pianoMaxTokens
- `21863` — _estraiPianoDaRisposta
- `21885` — chiamaGeneraPiano
- `22052` — mostraLoadingSteps
- `18123` — render
- `22094` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 22161-22738

- `22161` — generaMessaggioAI
- `22266` — copiaMessaggioAI
- `22276` — salvaInStorico
- `22288` — salvaVarianteAI
- `22303` — renderVariantiSalvate
- `22322` — usaVariante
- `22340` — eliminaVariante
- `22351` — renderStoricoMsg
- `22367` — apriWhatsApp
- `22738` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 22916-24413

- `22916` — _ngColoreSemaforoNome
- `22924` — apriSceltaModalitaPiano
- `22959` — _ngChiudiModalita
- `22962` — _ngCostruisciGiornoVuoto
- `22995` — _ngCostruisciGiornoSpeciale
- `23006` — _ngIndiceInizioSpeciali
- `23017` — _ngModalitaNomeGiorno
- `23023` — _ngImpostaModalitaNomeGiorno
- `23026` — _ngLettera
- `23033` — _ngEtichettaGiorno
- `23053` — _ngEtichettaGiornoBreve
- `23067` — _ngToggleGiornoSpeciale
- `23091` — _ngRenderPannelloSpeciale
- `23159` — _generaGiornoSpecialeAI
- `23259` — _ngGiornoHaContenuto
- `23271` — _ngCreaPianoManuale
- `23294` — _ngScrollTabGiorni
- `23304` — _ngAbilitaDragScroll
- `23341` — _ngCambiaNumeroGiorni
- `23373` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `23387` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `23428` — _ngToggleCat
- `23437` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `23461` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `23617` — _ngSalvaPianoManuale
- `23643` — _ngParseIngrediente
- `23667` — _ngScomponiIngredienti
- `23679` — _ricCalcolaMacroDaIngredienti
- `23697` — _ricRicalcolaMacroLive
- `23704` — _ricAggiornaInfoMacro
- `23718` — _ricRicalcolaMacroLiveNow
- `23742` — _ngTrovaCategoriaAlimento
- `23775` — _ngPescaRicetta
- `23818` — _ngScomponiRicettaNelPasto
- `23855` — _ngDragStart
- `23866` — _ngDragStartCella
- `23877` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `23884` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `23889` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `23908` — _ngAggiungiAlimento
- `23933` — _ngRimuoviAlimento
- `23947` — _ngDopoModifica
- `23965` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `24018` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `24047` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `24064` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `24072` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `24144` — gramTestoCasalingo
- `24170` — _appendToggleNutrizionali
- `24213` — _appendTogglePromemoria
- `24242` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `24388` — cpFromEmoji
- `24394` — getEmojiCp
- `24413` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `22388` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `22410` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `22415` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `22441` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `22529` — _spesaTestoWhatsApp
- `22545` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `22590` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `22613` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `22641` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `22701` — scaricaListaSpesaPDF (download diretto, un click)
- `22709` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `22721` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 25561-25561

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
- `25561` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 25573-25780

- `25573` — salvaInbody
- `25638` — delInbody
- `25645` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `25780` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 25808-26277

- `25808` — buildSemLegenda
- `25822` — renderAlEditor
- `25883` — _alimNomeRegex
- `25891` — _alimGiorniDaPiano
- `25899` — _scanGiorniPerNome
- `25914` — scanRiferimentiAlimento
- `25943` — _alimRefsRighe
- `25949` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `26037` — modificaAlimentoCustom
- `26057` — ripristinaValoriPrecedentiAlimento
- `26069` — _resetAlimModal
- `26080` — apriNuovoAlimentoCustom
- `26086` — salvaAlimentoCustom
- `26153` — eliminaAlimentoCustom
- `26184` — _alimFonteBadge
- `26189` — renderAlimentiPage
- `22217` — E
- `26259` — archiviaAlimentoCustom
- `26277` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 26304-26629

- `26304` — _bcSetStatus
- `26306` — apriScannerBarcode
- `26314` — chiudiScannerBarcode
- `26319` — _bcStopCamera
- `26327` — _bcModaleAperto
- `26329` — _bcAvviaCamera
- `26340` — _bcAvviaNativo
- `26360` — _bcAvviaZXing
- `26369` — _bcZXStart
- `26380` — _bcErroreCamera
- `26388` — cercaBarcodeManuale
- `26394` — _barcodeTrovato
- `26410` — cercaBarcodeOFF
- `26428` — _bcProdottoNonTrovato
- `26442` — _bcPrecompilaForm
- `22477` — num
- `26466` — togAl
- `26519` — selCatAl
- `25402` — selTuttiAl
- `26563` — _appIdAnag  (P140 T1)
- `26573` — _appSyncPaz  (P140 T1)
- `26613` — _appMigraPaziente  (P140 T1)
- `26622` — _appMigraTutti  (P140 T1)
- `26629` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 26644-27042

- `26644` — setCalView
- `26654` — calPrev
- `26655` — calNext
- `26656` — calToday
- `26658` — renderCal
- `26672` — renderCalMonth
- `26702` — renderCalWeek
- `26735` — renderCalDay
- `26786` — selGiorno
- `26800` — setDisp
- `26805` — openAddEvento
- `26818` — openAddEventoPaz
- `26824` — toggleEntrataCheck
- `26829` — salvaEvento
- `26852` — openEvDetail
- `26907` — delEvento
- `26930` — copyMsg
- `26937` — aggDateCal
- `26942` — syncInizio
- `26943` — syncControllo
- `26944` — aggiornaPrev
- `26963` — renderRic
- `26990` — openNuovaRic
- `26991` — editRic
- `27001` — salvaRic
- `27026` — delRic
- `27042` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 27127-27187

- `27127` — aggiungiEntrataPerPaziente
- `27144` — openNuovaEntrata
- `27158` — salvaEntrata
- `27179` — delEntrata
- `27187` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 27217-27687

- `27217` — aiSuggerisciRicetta
- `27262` — renderConcettiModal
- `27281` — apriConcettiModal
- `27308` — salvaConcettiAllegati
- `27332` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `27370` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `27379` — loadInbodyPDF
- `27497` — _vitdLabel
- `27501` — getIntegratori
- `27505` — getIntegraWant
- `27509` — setIntegratori
- `27526` — setIntegraWant
- `27564` — getPatologieChip
- `27565` — getAllergieChip
- `27566` — setPatologieChip
- `27567` — setAllergieChip
- `27568` — getPatologie
- `27569` — getAllergie
- `27570` — setPatologieFromStr
- `27577` — setAllergieFromStr
- `27590` — getSdvChip
- `27591` — getCspChip
- `27592` — setSdvChip
- `27593` — setCspChip
- `27594` — setSdvFromStr
- `27595` — setCspFromStr
- `27599` — getBudget
- `27600` — setBudget
- `27605` — renderCalAnno
- `27636` — comprimeImmagine
- `27658` — uploadImmagineConcetto
- `27677` — rimuoviImmagineConcetto
- `27687` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 27753-27837

- `27753` — entraSelConcetti
- `27754` — annullaSelConcetti
- `27755` — toggleConcettoSel
- `27760` — eliminaConcettiSelezionati
- `27779` — confermaEliminaConcetti
- `27794` — aiRiscriviConcetto
- `27808` — editConcetto
- `27826` — salvaConcetto
- `27837` — openNuovoConcetto
- `27519` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 27874-27874

- `27520` — saveAgendaPersonale
- `27521` — getAgendaTodo
- `27522` — saveAgendaTodo
- `27524` — pulisciAgendaVecchia
- `27528` — navigaAgenda
- `27537` — toggleFormAgenda
- `27538` — toggleFormTodo
- `27540` — salvaAgendaItem
- `27554` — salvaTodoItem
- `27566` — toggleAgendaFatto
- `27574` — toggleTodoFatto
- `27587` — _catCol
- `27589` — renderAgendaDx
- `27874` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 27985-28231

- `27985` — renderScadenzeAlert
- `28212` — segnaGestito
- `28231` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 28240-28315

- `28240` — ripristinaPaz
- `28248` — eliminaPaz
- `28293` — getDove
- `28297` — setDove
- `28315` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 28320-28758

- `28320` — getCredenzialiPersistenti
- `28333` — cancellaCredenzialiPersistenti
- `28338` — rinnovaSessioneConRefreshToken
- `28355` — getSessioneSalvata
- `28374` — salvaSessione
- `28384` — cancellaSessione
- `28388` — eseguiLogin
- `28435` — eseguiLogout
- `28457` — mostraApp
- `28462` — verificaSessioneEAvvia
- `28490` — assicuraTokenValido
- `28519` — _garantiscoSessionePerSync
- `28531` — avviaRinnovoTokenPeriodico
- `28535` — fermaRinnovoTokenPeriodico
- `28544` — _authReset
- `28549` — _authMostra
- `28552` — mostraLogin
- `28553` — mostraRegistrazione
- `28554` — mostraRecupero
- `28555` — mostraNuovaPassword
- `28558` — eseguiRegistrazione
- `28596` — eseguiRecuperoPassword
- `28625` — eseguiNuovaPassword
- `28659` — _parseHashParams
- `28666` — _pulisciHash
- `28670` — gestisciRitornoAuth
- `28758` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 28830-28953

- `28830` — apriPannelloRicette
- `28859` — chiudiPannelloRicette
- `28867` — applicaRicettaPasto
- `28903` — inizializzaP2
- `28915` — deepClone
- `28919` — applicaPatch
- `28953` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
