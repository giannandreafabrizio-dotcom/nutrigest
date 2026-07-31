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
Righe 2420-2462

- `2420` — _slugAlimento
- `2428` — _catalogoIndicizza
- `2432` — _catalogoDeindicizza
- `2439` — costruisciCatalogo
- `2462` — risolviAlimento

---

### MACROS PIANO — calcolo e badge macro reali vs target
Righe 2477-2740

- `2477` — getValoriCREA
- `2489` — getCurrentPaziente
- `2509` — getKcalWeekend
- `2566` — getMacrosRicettaComposta
- `2572` — calcolaMacrosPiano
- `2674` — renderBadgeMacrosReali
- `2611` — pctStr
- `2612` — color
- `2625` — row
- `2740` — renderBadgeMacrosReali_DOM

---

### ANALISI DEL SANGUE — parsing, indici clinici derivati, interpretazione
Righe 3025-3212

- `3025` — _parseAnalisiNum
- `3033` — calcolaIndice
- `3186` — interpretaAnalisi
- `3198` — _interpAnalisiHtml
- `3212` — mostraInfoRange

---

### CONCETTI EDUCATIVI — sync Supabase, migrazione
Righe 3359-3383

- `3359` — pushConcetiSupabase
- `3369` — pullConcetiSupabase
- `3383` — migraConcetti

---

### ALIMENTI — categorie funzionali/semaforo, chip UI, equivalenze porzioni
Righe 3573-3928

- `3573` — getCategoriaSemaforo
- `3590` — _getCategorieGruppo
- `3604` — calcolaGrammaturaEquivalente
- `3644` — _gruppoEquiv  (P121: gruppo di equivalenza + criterio per categoria funzionale)
- `3650` — _porzioneStandard  (P121: porzione `g` di database dell'alimento)
- `3665` — suggerisciGrEquivalente  (P121: firma a 3 argomenti, il gruppo si deduce dai due alimenti)
- `3691` — _etichettaCriterio  (P121: ≈carbo / ≈prot / ≈grassi / fissa / porzione)
- `3706` — _promptAlternativeGrassi  (P121: riga del prompt AI generata dal motore)
- `3722` — ricalcolaAlternative  (P121: MOTORE UNICO, unico punto che scrive la grammatura di un'alternativa)
- `3741` — ricalcolaAlternativePiano  (P121: applica il motore a tutte le celle di un piano)
- `3790` — arrotondaGrammatura  (P121: sostituisce arrotondaPorzioneDiscreta — pezzi interi senza tetto / 5g)
- `3800` — getCategoriaFunzionale
- `3840` — catArr
- `3856` — _tagComuniTrova
- `3860` — getTagComuniChip
- `3863` — setTagComuniChip
- `3871` — setCatChips
- `3884` — getStagioniChip
- `3887` — setStagioniChip
- `3894` — getProfiloChip
- `3897` — setProfiloChip
- `3906` — wireChipGroup
- `3917` — wireAttrChipGroups
- `3928` — wireRadioChipGroup

---

### CONFIG / STORAGE LOCALE — cfg, localStorage db, util data/valuta
Righe 3956-4372

- `3956` — getCfg
- `3957` — saveCfgL
- `3958` — getUrl
- `3959` — saveLocal
- `3960` — loadLocal
- `3972` — uid
- `3990` — ymdLoc  (P141)
- `3995` — today
- `4003` — addDays
- `4011` — fData
- `4012` — fEur
- `4014` — getLastSyncText
- `4024` — getSyncColor
- `4031` — aggiornaStatoSync
- `4057` — setSyncStatus
- `4326` — _registraTombstone
- `4334` — _tombstoneAttivi
- `4346` — _fondiTombstones
- `4360` — _mergeTombstonesRemoti *(dal 24/7 legge il meta da `collections`, P74 1d)*
- `4372` — _applicaTombstones
- `4233` — _pazFetchMeta *(P74 1d — solo `collections`)*
- `4254` — _collectionsUpsert *(P74 — scrittura primaria dei 4 meta-record dal cutover 1d)*
- `4276` — _collectionsFetch *(P74 1d — lettura unica dei meta-record)*
- `4299` — _analisiSangueUpsert *(P74 fase 2 — scrittura ombra analisi del sangue, 24/7)*

---

### SYNC SUPABASE — push/pull ricette/pazienti, tombstones, conflitti (P69)
Righe 4396-4781

- `4396` — supaHeaders
- `4410` — pushRicetteSupabase
- `4435` — pullRicetteSupabase
- `4457` — delRicetteSupabase
- `4469` — delPazienteSupabase
- `4484` — pushToSheets
- `4528` — pullFromSheets
- `4607` — syncNow
- `4620` — sincronizzaTutto
- `4360` — stpSet
- `4365` — stpMsg
- `4751` — testConnSupabase
- `4781` — _p68LogSaveAnonimo

---

### SYNC SUPABASE — save paziente, piani/cache piano, entrate, eventi
Righe 4795-5317

- `4795` — save
- `4813` — _pushRigaPerId
- `4846` — _flushDirtyIds
- `4929` — _p69LoadBaseline
- `4932` — _p69StoreBaseline
- `4935` — _p69SetBaseline
- `4939` — _p69DropBaseline
- `4943` — _p69SetBaselineFromRows
- `4949` — _p69NomePaz
- `4954` — _p69InList
- `4962` — _p69RilevaConflitti
- `4998` — _p69DialogoConflitti
- `4738` — chiudi
- `5032` — _p69RisolviRicarica
- `5061` — _p69EsportaLocali
- `5074` — _p69RisolviSovrascrivi
- `5087` — pushPianoSupabase
- `5109` — pullPianiSupabase
- `5125` — delPianoSupabase
- `5141` — delPianiPazienteSupabase
- `5153` — pushCachePianoSupabase
- `5170` — caricaCachePianoSupabase
- `5192` — pushEntrateSupabase
- `5216` — pullEntrateSupabase
- `5230` — delEntrataSupabase
- `5238` — pushEntrataSupabase
- `5249` — pushEventoSupabase
- `5262` — pushEventiSupabase
- `5286` — pullEventiSupabase
- `5306` — delEventoSupabase
- `5317` — _pianoCacheKey

---

### UI GENERALE — config AI key, notifiche, navigazione (goTo/tab/modali)
Righe 5348-5459

- `5348` — _salvaPianoCache
- `5353` — _caricaPianoCache
- `5359` — salvaCfg
- `5360` — testConn
- `5367` — testaAntKey
- `5378` — initAntCard
- `5381` — esporta
- `5382` — importa
- `5387` — goTo
- `5403` — closeM
- `5411` — ngChiudiModale
- `5420` — ngChiudiPopupCoppia
- `5424` — ngAggiungiX
- `5435` — ngUpgradeModali
- `5455` — mTab
- `5456` — aggiornaEta
- `5457` — toggleOrarioNote
- `5458` — pdTab
- `5459` — notif

---

### PAZIENTI — registro: lista/card/kanban, apertura, editing, salvataggio, routine
Righe 5467-8303

- `5467` — getPazView
- `5468` — setPazView
- `5477` — _pazStatoPiano
- `5485` — _pazUrgenzaControllo
- `5500` — _pazBadgePrenotato  (P142)
- `5507` — pazSegnaArrivato  (P142)
- `5513` — _pazStatoTagHtml
- `5530` — _pazAggiornaFiltroRegimi
- `5538` — renderPaz
- `5596` — _renderPazCard
- `5621` — _renderPazLista
- `5648` — _renderPazKanban
- `5686` — openNuovoPaz
- `5713` — editPaz
- `5793` — REGOLE_SEMAFORO_ALIMENTI *(15 condizioni cliniche → grigi/celesti; globale dal 26/7 per essere verificabile dal test)*
- `6240` — _SEM_COLORI_LEGACY / `6105` _SEM_COLORI_AUTO *(F9 — unico vocabolario dei colori automatici)*
- `6245` — NOMI_CONDIZIONE_SEMAFORO *(etichette delle 15 condizioni, usate anche dal riquadro della scheda)*
- `6267` — _semaforoCondizioniAttive *(le condizioni spuntate su un paziente)*
- `6278` — _semaforoMigraPaziente *(F9 — toglie i colori legacy e ricalcola; idempotente)*
- `6289` — _semaforoMigraTutti *(passata su tutti i pazienti in memoria, con conteggio)*
- `6300` — applicaRegoloSemaforo *(dal 26/7 pulisce TUTTI e sei i colori automatici, non solo i suoi due)*
- `6388` — trovaChiaveAlimento *(match esatto sul nome: se non trova, la regola è ignorata in silenzio — vedi test s2-regole-nomi-alimenti)*
- `6412` — _pazNumOPrec *(F7 — campo assente = valore precedente, non azzeramento)*
- `6424` — _pazPreservaCampi *(F5 — l'anagrafica non cancella i campi che il form non gestisce)*
- `6430` — salvaPaz
- `6542` — openPaz
- `7990` — renderPdRoutine
- `6723` — cardHTML
- `8132` — updateRoutineCampo
- `8140` — suggerisciPastoEQuando
- `8167` — filtroLibreria
- `8176` — renderLibreriaGrid
- `8197` — aggiungiDaLibreriaIdx
- `8221` — openModalRoutine
- `8228` — salvaRoutineVoce
- `8253` — salvaRoutine
- `8260` — mostraRoutinePopup
- `8288` — removeRoutineVoce
- `8303` — _renderAggiustamentiSection

---

### 📈 PERCORSO — timeline di periodizzazione (P115 Tappe 1-5 COMPLETE, 24 lug 2026)
Righe 6021-6621 (numeri ESATTI al 24/7 notte, dopo la Tappa 5). ⚠️ Questo blocco (~600 righe) fa slittare tutti i numeri delle sezioni SUCCESSIVE a riga ~6020 rispetto all'ultima rigenerazione completa: per quelle sezioni fare grep di conferma. Rigenerazione completa alla prossima modifica strutturale.

- `6588` — _PERCORSO_TIPI (const: tipi fase, colori, pct default)
- `6595` — _percorsoGet *(normalizza p.percorso, scarta fasi invalide)*
- `6619` — _percorsoIntervalli *(fasi consecutive → date concrete dal/al)*
- `6633` — _percorsoFaseAt *(fase attiva a una data; dal incluso, al escluso)*
- `6642` — _percorsoKcalFase *(pct → kcal indicative via calcolaTDEE)*
- `6665` — _percorsoProiezione *(Tappa 2 — proiezione ibrida teorica/calibrata, cono, obiettivo a intervallo)*
- `6723` — _percorsoDataBreve *(ISO → "12 set")*
- `6740` — _percorsoSerieEnergia *(Tappa 3 — serie introito/TDEE stimato/TDEE osservato per la corsia energia)*
- `6779` — _percorsoSerieMassaMagra *(Tappa 4 — solo InBody: punti {data,m,pg})*
- `6798` — _percorsoConsuntivo *(Tappa 5 — legge p.consuntivo scritto da P50: aderenza, extra kcal, ritardo=extra÷7700, settimane perse; oggi sempre ok:false)*
- `6840` — _PERCORSO_LAYERS_DEFAULT / _percorsoLayersState / _percorsoLayersGet *(Tappa 4 — stato interruttori, SOLO sessione, mai su p)*
- `6845` — percorsoLayerToggle *(Tappa 4 — inverte un solo strato)*
- `6851` — percorsoVistaPreset *(Tappa 4 — preset "tecnica"/"paziente")*
- `6867` — _percorsoPaz *(e a seguire i mutatori percorsoInit/SetInizio/AddFase/UpdFase/DelFase/MoveFase)*
- `6923` — _PERCORSO_MODELLI / _PERCORSO_GEN *(P122 T3 — 4 modelli + regole dei cicli)*
- `6941` — _percorsoGeneraFasi *(P122 T3 — pura: dal traguardo alle fasi, ritmo = quello della proiezione)*
- `7021` — _percorsoModelloSelectHtml
- `7030` — percorsoGeneraDaModello *(propone; conferma prima di sostituire fasi esistenti)*
- `7053` — _percorsoShiftGiorni *(pura: ancora = ultima pesata)*
- `7063` — percorsoRiallinea *(⏩ trasla il piano, riprende dal giorno-fase dell'interruzione)*
- `7090` — _TRG_TIPI / `6744` _TRG_COMPORTAMENTI *(P122 T4 — tipi di traguardo e libreria comportamenti)*
- `7112` — _traguardiGet · `6761` _traguardoValoreAttuale *(valore corrente dai dati esistenti, null se manca)*
- `7151` — _traguardoVerso *(auto: dedotto dalla partenza)* · `6803` _traguardoValuta · `6824` _traguardiValuta
- `7192` — traguardoAdd · `6852` traguardoUpd · `6867` traguardoDel · `6873` traguardoSegna
- `7250` — _COND_TIPI · `6897` _percorsoCondizione *(pura: la fase finisce per soglia — SOLO suggerimento)*
- `7266` — percorsoSetCondizione · `6927` percorsoChiudiFase *(esito fotografato, riapribile)*
- `7300` — _traguardiHtml *(blocco 🏁 in fondo alla scheda Percorso)*
- `7398` — _percorsoVistaPaz / `7049` _percorsoVistaPazAttiva *(P122 T5 — modalità di sessione)*
- `7405` — _percorsoVittorie *(pura: vittorie dall'inizio del percorso + flag ricomposizione)*
- `7443` — _percorsoNascondiPeso *(in fase di massa il peso non si mostra al paziente)*
- `7454` — _traguardoFaseCorrente *(traguardo della fase IN CORSO, non quello lontano)*
- `7482` — _traguardoTestoPaziente *(righe in italiano semplice, riusate dal messaggio WhatsApp)*
- `7515` — _vistaPazienteHtml *(i tre riquadri che guarda il paziente)*
- `7595` — _percorsoChartSvg *(due corsie: peso + massa magra + cono proiezione sopra, striscia aderenza in mezzo (solo con dati P50), energia (kcal) sotto — tutto gated dagli interruttori)*
- `7784` — renderPdPercorso *(scheda: badge fase, riga proiezione/obiettivo, riga Piano vs Realtà (solo con dati), toolbar interruttori, grafico, editor)*

*(Tappa 2 tocca anche `calcolaMacros`: box obiettivo con intervallo al posto della data secca.)*

---

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 8388-8559

- `8388` — salvaAggiustamento
- `8421` — eliminaAggiustamento
- `8430` — renderPdNote
- `8465` — salvaNotaClinica
- `8480` — deleteNota
- `8489` — saveNote
- `8509` — resetSemaforoAuto *(F9 — pulsante 🔄 Ricalcola: pulisce gli automatici e rifà col sistema valido; il motore LEGACY non esiste più)*
- `8559` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 8785-8983

- `8785` — avviaFX
- `8813` — avviaAnalisi
- `8830` — _renderFlussoPanel
- `8874` — _riepEsc
- `8878` — _riepNum
- `8884` — _riepDelta
- `8892` — _riepDataSig
- `8910` — _riepParseFX
- `8087` — clean
- `8924` — _riepAggiornaFX
- `8950` — _riepToggleDomandaDefault
- `8962` — _riepAddDomanda
- `8975` — _riepRemoveDomanda
- `8983` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 9195-9427

- `8218` — dCol
- `8336` — card
- `9195` — renderPdRagionamento
- `9283` — inviaMessaggioRag
- `9301` — concludiERiassumi
- `9315` — salvaRagionamento
- `9336` — apriGeneratoreDaRag
- `9344` — nuovaSessioneRag
- `9350` — cancellaSavedRag
- `9360` — renderPazTimeline
- `9397` — renderPdAnamnesi
- `9427` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 11375-12510

- `11375` — _anNorm *(P125 — testo confrontabile: minuscole, niente accenti)*
- `11381` — _anCorrisponde *(P125 — ricerca per parole-prefisso: "vit d" trova "Vitamina D")*
- `11387` — filtraAnalisi *(P125 — filtro dal vivo delle 119 voci)*
- `11421` — pulisciRicercaAnalisi
- `11427` — renderPdAnalisi
- `11483` — toggleAnalisiSection
- `11632` — loadAnalisiSanguePDF
- `11519` — _impPdfConfigurata
- `11520` — _impPdfLib
- `11530` — _impPdfApri
- `11543` — _impPdfPagina *(P124b — una pagina del PDF → immagine, con la rotazione RILEVATA, non quella dichiarata dal file)*
- `11564` — _impRuotaImmagine
- `11589` — _impRilevaRotazione *(P124b — chiamata piccola: di quanti gradi va girata la pagina)*
- `11608` — _impPromptPagina *(P124b — prompt di UNA pagina, con l'impronta della riga: valore+unità+riferimento)*
- `11807` — _impNormalizzaNumero *(P124 — numero all'italiana → punto decimale, conversione fatta dall'app e non dall'AI)*
- `11818` — _impNumeri
- `11826` — _impSembraIntervallo
- `11834` — _impUgualeAlRange
- `11843` — _impLimitiStd
- `11864` — _impFuoriScala
- `11873` — _impCorrezioneVirgola
- `11885` — _impTestoLimiti
- `11906` — _impRifPlausibile *(P124b — un "riferimento" che è un'unità di misura = riga disallineata)*
- `11919` — _impUnitaCanonica
- `11941` — _impStessaGrandezza *(P124b — stesso tipo di misura a meno del prefisso: nanomoli/micromoli/millimoli)*
- `11958` — _impUnitaCompatibili
- `11969` — _impControllaValore *(P124 — i controlli anti-errore su un valore estratto)*
- `12033` — mostraDiffAnalisi *(P124 — colonna Estratto modificabile + righe sospette deselezionate)*
- `12223` — _calcoloIncluso
- `12229` — toggleCalcoloIncluso
- `12251` — _renderCalcoliPannello
- `12292` — toggleGlossario
- `12297` — updateAnalisi
- `12356` — salvaAnalisi
- `12369` — applicaGruppoClinico
- `12398` — renderBoxGruppiCliniciSuggeriti
- `12430` — suggerisciGruppiClinici
- `12510` — renderMemoriaInbody

---
### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9176 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `9557` — _richVal
- `9564` — _richBmi
- `9569` — _richPat
- `9575` — _richNum
- `9620` — _richPreselezione
- `9636` — richLeggiIntestazione
- `9640` — richSalvaIntestazione
- `9649` — apriRichiestaAnalisi
- `9669` — _richModaleHtml
- `9745` — _richEsc
- `9747` — _richMotivoCambia
- `9753` — _richToggleSez
- `9759` — _richAggiornaConteggi
- `9767` — _richMotivoCorrente
- `9777` — _richSelezione
- `9792` — _richTxt
- `9798` — _richCostruisciPDF
- `8969` — nuovaPagina
- `8970` — spazio
- `9894` — _richNomeFile
- `9899` — _richPrepara
- `9912` — _richRegistra
- `9917` — _richStato
- `9919` — richScaricaPDF
- `9968` — _richUpload
- `9970` — _richWaUrl
- `9977` — _richTestoWa
- `9991` — richInviaWhatsApp
- `10031` — richCopiaLink
- `10052` — _richStoricoHtml

---
### REFERTI DEL SANGUE DATATI — storico nel tempo (P118 tappa 1)
Righe 9194-9387 — migrazione, ordinamento, quadro attuale derivato, barra di selezione.

- `11152` — _refertoNuovoId
- `11155` — _refertoOggi
- `11159` — _refertoDataIt
- `11165` — _refertoConteggio
- `11179` — _refertiMigra
- `11206` — _refertiOrdinati
- `11217` — _refertoPiuRecente
- `11222` — _refertoInVista
- `11240` — _refertiApplica
- `11253` — _refertoCrea
- `11272` — refertoCambiaVista
- `11278` — refertoCambiaData
- `11290` — refertoNuovo
- `11298` — refertoDuplica
- `11307` — refertoElimina
- `11322` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `10765` — _rangeNum
- `10771` — _rangeTestoDa
- `10790` — _rangeCoppia
- `10800` — _rangeHtml

---
### ANDAMENTO NEL TEMPO — tracciato, variazione, grafico grande (P118 tappa 3)
Righe 9441-9745 — serie storica, regola del colore, sparkline, pannello in fondo.

- `10842` — _andLimiti
- `10863` — _andParseRangeLab
- `10876` — _andDistanza
- `10883` — _andValutazione
- `10896` — _andSerie
- `10910` — _andNum
- `10914` — _andDataBreve
- `10919` — _andMeseAnno
- `10927` — _andDominio
- `10941` — _andColore
- `10954` — _andSparkHtml
- `10980` — _andRigaHtml
- `11002` — _andEsamiSeguibili
- `11010` — andScegliEsame
- `11016` — _andPannelloHtml
- `11069` — _andGraficoGrande
- `11120` — _andPasso

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 12560-13908

- `12560` — _ibFmtBreve
- `12569` — _renderPesiIntermediSection
- `12618` — aggiungiPesoIntermedio
- `12634` — eliminaPesoIntermedio
- `12644` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `13908` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 14216-14216

- `14216` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 14594-17135

- `14594` — aggiornaLabelMacros
- `14612` — calcolaMacros
- `14753` — applicaSchema
- `14788` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `14794` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `14816` — _misuraDaReferto *(P127 — UN referto letto con le regole del traguardo: usata anche dalla verifica al controllo)*
- `14849` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `14860` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `14878` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `14991` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `15005` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `15061` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `15075` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `15107` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `15140` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `15182` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `15190` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `15201` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `15228` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `15243` — _stradeVerso *(le strade complete + percentuale libera)*
- `15290` — _VC_TOLLERANZA_PCT / _VC_GIORNI_MIN / _VC_GIORNI_MIN_RITARO / _VC_COPERTURA_MIN_PCT / _VC_MAGRA_PRUDENZA_GG *(P127 — soglie cliniche della verifica)*
- `15300` — _mediaSlotPrescritta *(media pesata sui giorni di un campo dello storico target; la usa anche _kcalMediaPrescrittaOss)*
- `15320` — _vcDeficitSlot *(deficit di uno slot: campo offset o kcal−tdee per gli slot vecchi)*
- `15328` — _vcTratto *(P127 — cosa è cambiato fra due referti, previsto vs reale, TDEE misurato)*
- `15382` — _vcTraguardoSalvato *(traguardo ricostruito dal salvato, per la scheda Percorso)*
- `15392` — _verificaControllo *(P127 — motore puro: tratto recente, quadro dall'inizio, residuo al ritmo reale)*
- `15430` — _verificaControlloHtml *(blocco 🔎, unica fonte per pannello 🎯 e scheda Percorso; azioni solo dove c'è il campo kcal)*
- `15522` — _vcRitara *(scrive le kcal ritarate nel campo regime: propone, non salva)*
- `15535` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `15603` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `15625` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `15678` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `15785` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `15800` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `15825` — _renderRifPesoBox
- `15876` — _usaRifPeso
- `15880` — _aggiornaRifPesoTarget
- `15883` — _aggiornaRegimeSlider
- `16540` — _presetRegime
- `16544` — _initRegimeSliderDaPaziente
- `16562` — ricalcolaLAF
- `16696` — renderStoricoTDEE
- `16730` — attivaSlotTDEE
- `16738` — eliminaSlotTDEE
- `16751` — _toggleCiclizzazione
- `16757` — _aggiornaAnteprimaCiclizzazione
- `16775` — salvaCalcoloMacros
- `16889` — _metAllenamento
- `16905` — _neatFrazione
- `16979` — _larnLafStileVita
- `16996` — _regimeOffset
- `17006` — _componiRegimeText
- `17039` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `17051` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `17058` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `17135` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 17153-17583

- `17153` — renderTargetBadge
- `17182` — verificaRegola_75_20_5
- `17219` — renderBadge75_20_5
- `17284` — _validaNorm
- `17287` — _validaMatchTermine
- `17295` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `17346` — _validaTesto
- `17367` — validaPiano
- `17441` — _validaFirmaBlocchi
- `17448` — renderBadgeValidatore
- `17479` — _validaVaiAlGiorno
- `17488` — apriPannelloValidatore
- `13472` — esc
- `17545` — _validaEseguiOverride
- `17568` — validaGateExport
- `17583` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 17716-18348

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
- `17716` — pianoPazSelezionato
- `17863` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `18101` — renderPanelMacrosGiorno
- `18244` — pmgCambiaGrammi
- `18271` — riapriPiano
- `18309` — _montaPianoCorrente
- `18348` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 18358-18827

- `18358` — pullTemplateSupabase
- `18369` — delTemplateSupabase
- `18378` — _promptTemplateNome
- `18403` — _creaTemplateDaJSON
- `18426` — salvaComeTemplate
- `18437` — salvaComeTemplateDaPiano
- `18446` — _normNomeAlim
- `18447` — _escRegAlim
- `18448` — _raccogliAlimentiDaPiano
- `18459` — _alimentiEsclusiPaziente
- `18471` — _trovaConflittiTemplate
- `18489` — _mostraAvvisoConflitti
- `18513` — applicaTemplate
- `18531` — apriPickerTemplate
- `18559` — _pickPaziente
- `18578` — applicaTemplatePick
- `18582` — rinominaTemplate
- `18593` — eliminaTemplate
- `18603` — renderLibreriaTemplate
- `18632` — renderStoricoPiani
- `18691` — eliminaPiano
- `18707` — _getActiveMacrosTarget
- `18731` — getTargetAttivi
- `18768` — calcolaTargetsCiclizzazione
- `18794` — _setupPianoTargets
- `18818` — getStagioneCorrente
- `18827` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 19289-19289

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `19289` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 19298-19757

- `19298` — aggiornaUIcolazione
- `19308` — salvaRegolePiano
- `19369` — _isModelloSistema
- `19372` — _isModelloSistemaModificato
- `19384` — caricaModelliCustomLocal
- `19398` — salvaModelliCustomLocal
- `19419` — _migraRecordCustom
- `19434` — _syncAliasLegacy
- `19443` — caricaAlimentiCustom
- `19467` — pushAlimentiCustomSupabase
- `19477` — pullAlimentiCustomSupabase
- `19491` — pushModelliSupabase
- `19509` — pullModelliSupabase
- `19534` — _calcolaFreqDaModello
- `19553` — aggiornaUImodello
- `19642` — popolaDropdownModelli
- `19670` — cambiaModelloRotazione
- `19676` — ripristinaModelloOriginale
- `19699` — eliminaModelloCustom
- `19717` — mostraAnteprimaModello
- `19727` — apriEditorModello
- `19757` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 20026-20264

- `15738` — rerender
- `20026` — _salvaModelloDaEditor
- `20068` — caricaRegolePiano
- `20098` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `20133` — _aiLogUsage
- `20155` — _aiProxyUrl
- `20161` — _aiTokenPerProxy
- `20190` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `20264` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 20343-20483

- `16216` — _risolviCollisioniCelle
- `20343` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `20403` — getFruttaStile
- `20410` — _fruttaGetPasto
- `20420` — _fruttaContaRigheRicetta
- `20424` — _fruttaIndiceBasePasto
- `20444` — getFruttaMarker
- `20457` — fruttaMarkerHtml
- `20465` — _fruttaCheckboxHtml
- `20474` — toggleFrutta
- `20483` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 20519-21793

- `20519` — _renderCelleGriglia
- `20599` — _renderRicetteTestuali
- `20638` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `20709` — _renderCelleHtml
- `20717` — toggleCellaMenu
- `20736` — closeAllCellaMenus
- `20744` — _trovaPasto
- `20752` — cellaSposta
- `20806` — cellaCancella
- `20827` — apriEditGrammatura
- `16789` — salva
- `20875` — cellaSwap
- `20895` — cellaRimuoviAlt
- `20909` — cellaAggiungiAlt
- `21012` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `21097` — apriEditRicetta
- `21106` — aggiungiRicetta
- `21122` — rimuoviRicetta
- `21131` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `21293` — ngAggiungiSpuntinoVuoto
- `21309` — apriAggiungiCella
- `17254` — risolviCompatibili
- `21405` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `21497` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `21638` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `21793` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 21841-22233

- `21841` — _attesoStrutturaPiano
- `21861` — _confrontaStrutturaPiano
- `21891` — _costruisciPromptDelta
- `21918` — _pianoToolSchema
- `21993` — _pianoMaxTokens
- `22002` — _estraiPianoDaRisposta
- `22024` — chiamaGeneraPiano
- `22191` — mostraLoadingSteps
- `18123` — render
- `22233` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 22300-22877

- `22300` — generaMessaggioAI
- `22405` — copiaMessaggioAI
- `22415` — salvaInStorico
- `22427` — salvaVarianteAI
- `22442` — renderVariantiSalvate
- `22461` — usaVariante
- `22479` — eliminaVariante
- `22490` — renderStoricoMsg
- `22506` — apriWhatsApp
- `22877` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 23055-24552

- `23055` — _ngColoreSemaforoNome
- `23063` — apriSceltaModalitaPiano
- `23098` — _ngChiudiModalita
- `23101` — _ngCostruisciGiornoVuoto
- `23134` — _ngCostruisciGiornoSpeciale
- `23145` — _ngIndiceInizioSpeciali
- `23156` — _ngModalitaNomeGiorno
- `23162` — _ngImpostaModalitaNomeGiorno
- `23165` — _ngLettera
- `23172` — _ngEtichettaGiorno
- `23192` — _ngEtichettaGiornoBreve
- `23206` — _ngToggleGiornoSpeciale
- `23230` — _ngRenderPannelloSpeciale
- `23298` — _generaGiornoSpecialeAI
- `23398` — _ngGiornoHaContenuto
- `23410` — _ngCreaPianoManuale
- `23433` — _ngScrollTabGiorni
- `23443` — _ngAbilitaDragScroll
- `23480` — _ngCambiaNumeroGiorni
- `23512` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `23526` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `23567` — _ngToggleCat
- `23576` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `23600` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `23756` — _ngSalvaPianoManuale
- `23782` — _ngParseIngrediente
- `23806` — _ngScomponiIngredienti
- `23818` — _ricCalcolaMacroDaIngredienti
- `23836` — _ricRicalcolaMacroLive
- `23843` — _ricAggiornaInfoMacro
- `23857` — _ricRicalcolaMacroLiveNow
- `23881` — _ngTrovaCategoriaAlimento
- `23914` — _ngPescaRicetta
- `23957` — _ngScomponiRicettaNelPasto
- `23994` — _ngDragStart
- `24005` — _ngDragStartCella
- `24016` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `24023` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `24028` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `24047` — _ngAggiungiAlimento
- `24072` — _ngRimuoviAlimento
- `24086` — _ngDopoModifica
- `24104` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `24157` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `24186` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `24203` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `24211` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `24283` — gramTestoCasalingo
- `24309` — _appendToggleNutrizionali
- `24352` — _appendTogglePromemoria
- `24381` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `24527` — cpFromEmoji
- `24533` — getEmojiCp
- `24552` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `22527` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `22549` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `22554` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `22580` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `22668` — _spesaTestoWhatsApp
- `22684` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `22729` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `22752` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `22780` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `22840` — scaricaListaSpesaPDF (download diretto, un click)
- `22848` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `22860` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 25700-25700

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
- `25700` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 25714-25926

- `25714` — salvaInbody
- `25784` — delInbody
- `25791` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `25926` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 25954-26423

- `25954` — buildSemLegenda
- `25968` — renderAlEditor
- `26029` — _alimNomeRegex
- `26037` — _alimGiorniDaPiano
- `26045` — _scanGiorniPerNome
- `26060` — scanRiferimentiAlimento
- `26089` — _alimRefsRighe
- `26095` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `26183` — modificaAlimentoCustom
- `26203` — ripristinaValoriPrecedentiAlimento
- `26215` — _resetAlimModal
- `26226` — apriNuovoAlimentoCustom
- `26232` — salvaAlimentoCustom
- `26299` — eliminaAlimentoCustom
- `26330` — _alimFonteBadge
- `26335` — renderAlimentiPage
- `22217` — E
- `26405` — archiviaAlimentoCustom
- `26423` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 26450-26877

- `26450` — _bcSetStatus
- `26452` — apriScannerBarcode
- `26460` — chiudiScannerBarcode
- `26465` — _bcStopCamera
- `26473` — _bcModaleAperto
- `26475` — _bcAvviaCamera
- `26486` — _bcAvviaNativo
- `26506` — _bcAvviaZXing
- `26515` — _bcZXStart
- `26526` — _bcErroreCamera
- `26534` — cercaBarcodeManuale
- `26540` — _barcodeTrovato
- `26556` — cercaBarcodeOFF
- `26574` — _bcProdottoNonTrovato
- `26588` — _bcPrecompilaForm
- `22477` — num
- `26612` — togAl
- `26665` — selCatAl
- `25402` — selTuttiAl
- `26709` — _appIdAnag  (P140 T1)
- `26719` — _appSyncPaz  (P140 T1)
- `26763` — _appSpecchioInverso  (P140 T2)
- `26789` — _appRitiraSpecchio  (P140 T2)
- `26820` — _appAncoraTappe  (P140 T2)
- `26839` — _appTappe  (P140 T2)
- `26860` — _appMigraPaziente  (P140 T1)
- `26870` — _appMigraTutti  (P140 T1)
- `26877` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 26893-27360

- `26893` — setCalView
- `26903` — calPrev
- `26904` — calNext
- `26905` — calToday
- `26907` — renderCal
- `26921` — renderCalMonth
- `26948` — renderCalWeek
- `26981` — renderCalDay
- `27032` — selGiorno
- `27046` — setDisp
- `27051` — openAddEvento
- `27064` — openAddEventoPaz
- `27070` — toggleEntrataCheck
- `27075` — salvaEvento
- `27117` — _evTestoPromemoria  (P140 T1)
- `27123` — openEvDetail
- `27178` — delEvento
- `27200` — copyMsg
- `27212` — aggDateCal
- `27020` — syncInizio
- `27021` — syncControllo
- `27225` — aggiornaPrev
- `27250` — apriEventoDaScheda  (P140 T2)
- `27264` — _appAggiornaOreScheda  (P140 T2)
- `27281` — renderRic
- `27308` — openNuovaRic
- `27309` — editRic
- `27319` — salvaRic
- `27344` — delRic
- `27360` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 27446-27506

- `27446` — aggiungiEntrataPerPaziente
- `27463` — openNuovaEntrata
- `27477` — salvaEntrata
- `27498` — delEntrata
- `27506` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 27536-28145

- `27536` — aiSuggerisciRicetta
- `27581` — renderConcettiModal
- `27600` — apriConcettiModal
- `27627` — salvaConcettiAllegati
- `27651` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `27689` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `27832` — loadInbodyPDF
- `27955` — _vitdLabel
- `27959` — getIntegratori
- `27963` — getIntegraWant
- `27967` — setIntegratori
- `27984` — setIntegraWant
- `28022` — getPatologieChip
- `28023` — getAllergieChip
- `28024` — setPatologieChip
- `28025` — setAllergieChip
- `28026` — getPatologie
- `28027` — getAllergie
- `28028` — setPatologieFromStr
- `28035` — setAllergieFromStr
- `28048` — getSdvChip
- `28049` — getCspChip
- `28050` — setSdvChip
- `28051` — setCspChip
- `28052` — setSdvFromStr
- `28053` — setCspFromStr
- `28057` — getBudget
- `28058` — setBudget
- `28063` — renderCalAnno
- `28094` — comprimeImmagine
- `28116` — uploadImmagineConcetto
- `28135` — rimuoviImmagineConcetto
- `28145` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 28211-28295

- `28211` — entraSelConcetti
- `28212` — annullaSelConcetti
- `28213` — toggleConcettoSel
- `28218` — eliminaConcettiSelezionati
- `28237` — confermaEliminaConcetti
- `28252` — aiRiscriviConcetto
- `28266` — editConcetto
- `28284` — salvaConcetto
- `28295` — openNuovoConcetto
- `27519` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 28332-28332

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
- `28332` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 28444-28769

- `28444` — renderScadenzeAlert
- `28704` — _scadGestiti  (P144)
- `28714` — _scadPota  (P144)
- `28729` — _scadMigraDaLocalStorage  (P144)
- `28752` — segnaGestito
- `28769` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 28778-28853

- `28778` — ripristinaPaz
- `28786` — eliminaPaz
- `28831` — getDove
- `28835` — setDove
- `28853` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 28858-29296

- `28858` — getCredenzialiPersistenti
- `28871` — cancellaCredenzialiPersistenti
- `28876` — rinnovaSessioneConRefreshToken
- `28893` — getSessioneSalvata
- `28912` — salvaSessione
- `28922` — cancellaSessione
- `28926` — eseguiLogin
- `28973` — eseguiLogout
- `28995` — mostraApp
- `29000` — verificaSessioneEAvvia
- `29028` — assicuraTokenValido
- `29057` — _garantiscoSessionePerSync
- `29069` — avviaRinnovoTokenPeriodico
- `29073` — fermaRinnovoTokenPeriodico
- `29082` — _authReset
- `29087` — _authMostra
- `29090` — mostraLogin
- `29091` — mostraRegistrazione
- `29092` — mostraRecupero
- `29093` — mostraNuovaPassword
- `29096` — eseguiRegistrazione
- `29134` — eseguiRecuperoPassword
- `29163` — eseguiNuovaPassword
- `29197` — _parseHashParams
- `29204` — _pulisciHash
- `29208` — gestisciRitornoAuth
- `29296` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 29368-29491

- `29368` — apriPannelloRicette
- `29397` — chiudiPannelloRicette
- `29405` — applicaRicettaPasto
- `29441` — inizializzaP2
- `29453` — deepClone
- `29457` — applicaPatch
- `29491` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
