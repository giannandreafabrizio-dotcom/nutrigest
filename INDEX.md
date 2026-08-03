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
Righe 5467-8341

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
- `6580` — openPaz
- `8028` — renderPdRoutine
- `6723` — cardHTML
- `8170` — updateRoutineCampo
- `8178` — suggerisciPastoEQuando
- `8205` — filtroLibreria
- `8214` — renderLibreriaGrid
- `8235` — aggiungiDaLibreriaIdx
- `8259` — openModalRoutine
- `8266` — salvaRoutineVoce
- `8291` — salvaRoutine
- `8298` — mostraRoutinePopup
- `8326` — removeRoutineVoce
- `8341` — _renderAggiustamentiSection

---

### 📈 PERCORSO — timeline di periodizzazione (P115 Tappe 1-5 COMPLETE, 24 lug 2026)
Righe 6021-6621 (numeri ESATTI al 24/7 notte, dopo la Tappa 5). ⚠️ Questo blocco (~600 righe) fa slittare tutti i numeri delle sezioni SUCCESSIVE a riga ~6020 rispetto all'ultima rigenerazione completa: per quelle sezioni fare grep di conferma. Rigenerazione completa alla prossima modifica strutturale.

- `6626` — _PERCORSO_TIPI (const: tipi fase, colori, pct default)
- `6633` — _percorsoGet *(normalizza p.percorso, scarta fasi invalide)*
- `6657` — _percorsoIntervalli *(fasi consecutive → date concrete dal/al)*
- `6671` — _percorsoFaseAt *(fase attiva a una data; dal incluso, al escluso)*
- `6680` — _percorsoKcalFase *(pct → kcal indicative via calcolaTDEE)*
- `6703` — _percorsoProiezione *(Tappa 2 — proiezione ibrida teorica/calibrata, cono, obiettivo a intervallo)*
- `6761` — _percorsoDataBreve *(ISO → "12 set")*
- `6778` — _percorsoSerieEnergia *(Tappa 3 — serie introito/TDEE stimato/TDEE osservato per la corsia energia)*
- `6817` — _percorsoSerieMassaMagra *(Tappa 4 — solo InBody: punti {data,m,pg})*
- `6836` — _percorsoConsuntivo *(Tappa 5 — legge p.consuntivo scritto da P50: aderenza, extra kcal, ritardo=extra÷7700, settimane perse; oggi sempre ok:false)*
- `6878` — _PERCORSO_LAYERS_DEFAULT / _percorsoLayersState / _percorsoLayersGet *(Tappa 4 — stato interruttori, SOLO sessione, mai su p)*
- `6883` — percorsoLayerToggle *(Tappa 4 — inverte un solo strato)*
- `6889` — percorsoVistaPreset *(Tappa 4 — preset "tecnica"/"paziente")*
- `6905` — _percorsoPaz *(e a seguire i mutatori percorsoInit/SetInizio/AddFase/UpdFase/DelFase/MoveFase)*
- `6961` — _PERCORSO_MODELLI / _PERCORSO_GEN *(P122 T3 — 4 modelli + regole dei cicli)*
- `6979` — _percorsoGeneraFasi *(P122 T3 — pura: dal traguardo alle fasi, ritmo = quello della proiezione)*
- `7059` — _percorsoModelloSelectHtml
- `7068` — percorsoGeneraDaModello *(propone; conferma prima di sostituire fasi esistenti)*
- `7091` — _percorsoShiftGiorni *(pura: ancora = ultima pesata)*
- `7101` — percorsoRiallinea *(⏩ trasla il piano, riprende dal giorno-fase dell'interruzione)*
- `7128` — _TRG_TIPI / `6744` _TRG_COMPORTAMENTI *(P122 T4 — tipi di traguardo e libreria comportamenti)*
- `7150` — _traguardiGet · `6761` _traguardoValoreAttuale *(valore corrente dai dati esistenti, null se manca)*
- `7189` — _traguardoVerso *(auto: dedotto dalla partenza)* · `6803` _traguardoValuta · `6824` _traguardiValuta
- `7230` — traguardoAdd · `6852` traguardoUpd · `6867` traguardoDel · `6873` traguardoSegna
- `7288` — _COND_TIPI · `6897` _percorsoCondizione *(pura: la fase finisce per soglia — SOLO suggerimento)*
- `7304` — percorsoSetCondizione · `6927` percorsoChiudiFase *(esito fotografato, riapribile)*
- `7338` — _traguardiHtml *(blocco 🏁 in fondo alla scheda Percorso)*
- `7436` — _percorsoVistaPaz / `7049` _percorsoVistaPazAttiva *(P122 T5 — modalità di sessione)*
- `7443` — _percorsoVittorie *(pura: vittorie dall'inizio del percorso + flag ricomposizione)*
- `7481` — _percorsoNascondiPeso *(in fase di massa il peso non si mostra al paziente)*
- `7492` — _traguardoFaseCorrente *(traguardo della fase IN CORSO, non quello lontano)*
- `7520` — _traguardoTestoPaziente *(righe in italiano semplice, riusate dal messaggio WhatsApp)*
- `7553` — _vistaPazienteHtml *(i tre riquadri che guarda il paziente)*
- `7633` — _percorsoChartSvg *(due corsie: peso + massa magra + cono proiezione sopra, striscia aderenza in mezzo (solo con dati P50), energia (kcal) sotto — tutto gated dagli interruttori)*
- `7822` — renderPdPercorso *(scheda: badge fase, riga proiezione/obiettivo, riga Piano vs Realtà (solo con dati), toolbar interruttori, grafico, editor)*

*(Tappa 2 tocca anche `calcolaMacros`: box obiettivo con intervallo al posto della data secca.)*

---

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 8426-8597

- `8426` — salvaAggiustamento
- `8459` — eliminaAggiustamento
- `8468` — renderPdNote
- `8503` — salvaNotaClinica
- `8518` — deleteNota
- `8527` — saveNote
- `8547` — resetSemaforoAuto *(F9 — pulsante 🔄 Ricalcola: pulisce gli automatici e rifà col sistema valido; il motore LEGACY non esiste più)*
- `8597` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 8838-9036

- `8838` — avviaFX
- `8866` — avviaAnalisi
- `8883` — _renderFlussoPanel
- `8927` — _riepEsc
- `8931` — _riepNum
- `8937` — _riepDelta
- `8945` — _riepDataSig
- `8963` — _riepParseFX
- `8087` — clean
- `8977` — _riepAggiornaFX
- `9003` — _riepToggleDomandaDefault
- `9015` — _riepAddDomanda
- `9028` — _riepRemoveDomanda
- `9036` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 9248-9491

- `8218` — dCol
- `8336` — card
- `9248` — renderPdRagionamento
- `9336` — inviaMessaggioRag
- `9354` — concludiERiassumi
- `9368` — salvaRagionamento
- `9389` — apriGeneratoreDaRag
- `9397` — nuovaSessioneRag
- `9403` — cancellaSavedRag
- `9413` — renderPazTimeline
- `9450` — renderPdAnamnesi
- `9491` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 11439-12574

- `11439` — _anNorm *(P125 — testo confrontabile: minuscole, niente accenti)*
- `11445` — _anCorrisponde *(P125 — ricerca per parole-prefisso: "vit d" trova "Vitamina D")*
- `11451` — filtraAnalisi *(P125 — filtro dal vivo delle 119 voci)*
- `11485` — pulisciRicercaAnalisi
- `11491` — renderPdAnalisi
- `11547` — toggleAnalisiSection
- `11696` — loadAnalisiSanguePDF
- `11583` — _impPdfConfigurata
- `11584` — _impPdfLib
- `11594` — _impPdfApri
- `11607` — _impPdfPagina *(P124b — una pagina del PDF → immagine, con la rotazione RILEVATA, non quella dichiarata dal file)*
- `11628` — _impRuotaImmagine
- `11653` — _impRilevaRotazione *(P124b — chiamata piccola: di quanti gradi va girata la pagina)*
- `11672` — _impPromptPagina *(P124b — prompt di UNA pagina, con l'impronta della riga: valore+unità+riferimento)*
- `11871` — _impNormalizzaNumero *(P124 — numero all'italiana → punto decimale, conversione fatta dall'app e non dall'AI)*
- `11882` — _impNumeri
- `11890` — _impSembraIntervallo
- `11898` — _impUgualeAlRange
- `11907` — _impLimitiStd
- `11928` — _impFuoriScala
- `11937` — _impCorrezioneVirgola
- `11949` — _impTestoLimiti
- `11970` — _impRifPlausibile *(P124b — un "riferimento" che è un'unità di misura = riga disallineata)*
- `11983` — _impUnitaCanonica
- `12005` — _impStessaGrandezza *(P124b — stesso tipo di misura a meno del prefisso: nanomoli/micromoli/millimoli)*
- `12022` — _impUnitaCompatibili
- `12033` — _impControllaValore *(P124 — i controlli anti-errore su un valore estratto)*
- `12097` — mostraDiffAnalisi *(P124 — colonna Estratto modificabile + righe sospette deselezionate)*
- `12287` — _calcoloIncluso
- `12293` — toggleCalcoloIncluso
- `12315` — _renderCalcoliPannello
- `12356` — toggleGlossario
- `12361` — updateAnalisi
- `12420` — salvaAnalisi
- `12433` — applicaGruppoClinico
- `12462` — renderBoxGruppiCliniciSuggeriti
- `12494` — suggerisciGruppiClinici
- `12574` — renderMemoriaInbody

---
### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9176 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `9621` — _richVal
- `9628` — _richBmi
- `9633` — _richPat
- `9639` — _richNum
- `9684` — _richPreselezione
- `9700` — richLeggiIntestazione
- `9704` — richSalvaIntestazione
- `9713` — apriRichiestaAnalisi
- `9733` — _richModaleHtml
- `9809` — _richEsc
- `9811` — _richMotivoCambia
- `9817` — _richToggleSez
- `9823` — _richAggiornaConteggi
- `9831` — _richMotivoCorrente
- `9841` — _richSelezione
- `9856` — _richTxt
- `9862` — _richCostruisciPDF
- `8969` — nuovaPagina
- `8970` — spazio
- `9958` — _richNomeFile
- `9963` — _richPrepara
- `9976` — _richRegistra
- `9981` — _richStato
- `9983` — richScaricaPDF
- `10032` — _richUpload
- `10034` — _richWaUrl
- `10041` — _richTestoWa
- `10055` — richInviaWhatsApp
- `10095` — richCopiaLink
- `10116` — _richStoricoHtml

---
### REFERTI DEL SANGUE DATATI — storico nel tempo (P118 tappa 1)
Righe 9194-9387 — migrazione, ordinamento, quadro attuale derivato, barra di selezione.

- `11216` — _refertoNuovoId
- `11219` — _refertoOggi
- `11223` — _refertoDataIt
- `11229` — _refertoConteggio
- `11243` — _refertiMigra
- `11270` — _refertiOrdinati
- `11281` — _refertoPiuRecente
- `11286` — _refertoInVista
- `11304` — _refertiApplica
- `11317` — _refertoCrea
- `11336` — refertoCambiaVista
- `11342` — refertoCambiaData
- `11354` — refertoNuovo
- `11362` — refertoDuplica
- `11371` — refertoElimina
- `11386` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `10829` — _rangeNum
- `10835` — _rangeTestoDa
- `10854` — _rangeCoppia
- `10864` — _rangeHtml

---
### ANDAMENTO NEL TEMPO — tracciato, variazione, grafico grande (P118 tappa 3)
Righe 9441-9745 — serie storica, regola del colore, sparkline, pannello in fondo.

- `10906` — _andLimiti
- `10927` — _andParseRangeLab
- `10940` — _andDistanza
- `10947` — _andValutazione
- `10960` — _andSerie
- `10974` — _andNum
- `10978` — _andDataBreve
- `10983` — _andMeseAnno
- `10991` — _andDominio
- `11005` — _andColore
- `11018` — _andSparkHtml
- `11044` — _andRigaHtml
- `11066` — _andEsamiSeguibili
- `11074` — andScegliEsame
- `11080` — _andPannelloHtml
- `11133` — _andGraficoGrande
- `11184` — _andPasso

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 12624-13972

- `12624` — _ibFmtBreve
- `12633` — _renderPesiIntermediSection
- `12682` — aggiungiPesoIntermedio
- `12698` — eliminaPesoIntermedio
- `12708` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `13972` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 14280-14280

- `14280` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 14665-17588

- `14665` — aggiornaLabelMacros
- `14683` — calcolaMacros
- `14824` — applicaSchema
- `14859` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `14865` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `14887` — _misuraDaReferto *(P127 — UN referto letto con le regole del traguardo: usata anche dalla verifica al controllo)*
- `14920` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `14931` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `14949` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `15062` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `15076` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `15132` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `15146` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `15178` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `15211` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `15253` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `15261` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `15272` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `15299` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `15314` — _stradeVerso *(le strade complete + percentuale libera)*
- `15361` — _VC_TOLLERANZA_PCT / _VC_GIORNI_MIN / _VC_GIORNI_MIN_RITARO / _VC_COPERTURA_MIN_PCT / _VC_MAGRA_PRUDENZA_GG *(P127 — soglie cliniche della verifica)*
- `15371` — _mediaSlotPrescritta *(media pesata sui giorni di un campo dello storico target; la usa anche _kcalMediaPrescrittaOss)*
- `15391` — _vcDeficitSlot *(deficit di uno slot: campo offset o kcal−tdee per gli slot vecchi)*
- `15399` — _vcTratto *(P127 — cosa è cambiato fra due referti, previsto vs reale, TDEE misurato)*
- `15453` — _vcTraguardoSalvato *(traguardo ricostruito dal salvato, per la scheda Percorso)*
- `15463` — _verificaControllo *(P127 — motore puro: tratto recente, quadro dall'inizio, residuo al ritmo reale)*
- `15501` — _verificaControlloHtml *(blocco 🔎, unica fonte per pannello 🎯 e scheda Percorso; azioni solo dove c'è il campo kcal)*
- `15593` — _vcRitara *(scrive le kcal ritarate nel campo regime: propone, non salva)*
- `15606` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `15674` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `15696` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `15749` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `15856` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `15871` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `15896` — _renderRifPesoBox
- `15947` — _usaRifPeso
- `15951` — _aggiornaRifPesoTarget
- `15954` — _aggiornaRegimeSlider
- `16611` — _presetRegime
- `16615` — _initRegimeSliderDaPaziente
- `16633` — ricalcolaLAF
- `16749` — renderStoricoTDEE
- `16783` — attivaSlotTDEE
- `16791` — eliminaSlotTDEE
- `16804` — _toggleCiclizzazione
- `16810` — _aggiornaAnteprimaCiclizzazione
- `16828` — salvaCalcoloMacros
- `17105` — _metAllenamento
- `17288` — _neatFrazione
- `17403` — _larnLafStileVita
- `17420` — _regimeOffset
- `17430` — _componiRegimeText
- `17463` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `17475` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `17482` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `17588` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 17606-18036

- `17606` — renderTargetBadge
- `17635` — verificaRegola_75_20_5
- `17672` — renderBadge75_20_5
- `17737` — _validaNorm
- `17740` — _validaMatchTermine
- `17748` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `17799` — _validaTesto
- `17820` — validaPiano
- `17894` — _validaFirmaBlocchi
- `17901` — renderBadgeValidatore
- `17932` — _validaVaiAlGiorno
- `17941` — apriPannelloValidatore
- `13472` — esc
- `17998` — _validaEseguiOverride
- `18021` — validaGateExport
- `18036` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 18169-18801

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
- `18169` — pianoPazSelezionato
- `18316` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `18554` — renderPanelMacrosGiorno
- `18697` — pmgCambiaGrammi
- `18724` — riapriPiano
- `18762` — _montaPianoCorrente
- `18801` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 18811-19280

- `18811` — pullTemplateSupabase
- `18822` — delTemplateSupabase
- `18831` — _promptTemplateNome
- `18856` — _creaTemplateDaJSON
- `18879` — salvaComeTemplate
- `18890` — salvaComeTemplateDaPiano
- `18899` — _normNomeAlim
- `18900` — _escRegAlim
- `18901` — _raccogliAlimentiDaPiano
- `18912` — _alimentiEsclusiPaziente
- `18924` — _trovaConflittiTemplate
- `18942` — _mostraAvvisoConflitti
- `18966` — applicaTemplate
- `18984` — apriPickerTemplate
- `19012` — _pickPaziente
- `19031` — applicaTemplatePick
- `19035` — rinominaTemplate
- `19046` — eliminaTemplate
- `19056` — renderLibreriaTemplate
- `19085` — renderStoricoPiani
- `19144` — eliminaPiano
- `19160` — _getActiveMacrosTarget
- `19184` — getTargetAttivi
- `19221` — calcolaTargetsCiclizzazione
- `19247` — _setupPianoTargets
- `19271` — getStagioneCorrente
- `19280` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 19751-19751

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `19751` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 19760-20219

- `19760` — aggiornaUIcolazione
- `19770` — salvaRegolePiano
- `19831` — _isModelloSistema
- `19834` — _isModelloSistemaModificato
- `19846` — caricaModelliCustomLocal
- `19860` — salvaModelliCustomLocal
- `19881` — _migraRecordCustom
- `19896` — _syncAliasLegacy
- `19905` — caricaAlimentiCustom
- `19929` — pushAlimentiCustomSupabase
- `19939` — pullAlimentiCustomSupabase
- `19953` — pushModelliSupabase
- `19971` — pullModelliSupabase
- `19996` — _calcolaFreqDaModello
- `20015` — aggiornaUImodello
- `20104` — popolaDropdownModelli
- `20132` — cambiaModelloRotazione
- `20138` — ripristinaModelloOriginale
- `20161` — eliminaModelloCustom
- `20179` — mostraAnteprimaModello
- `20189` — apriEditorModello
- `20219` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 20488-20726

- `15738` — rerender
- `20488` — _salvaModelloDaEditor
- `20530` — caricaRegolePiano
- `20560` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `20595` — _aiLogUsage
- `20617` — _aiProxyUrl
- `20623` — _aiTokenPerProxy
- `20652` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `20726` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 20805-20945

- `16216` — _risolviCollisioniCelle
- `20805` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `20865` — getFruttaStile
- `20872` — _fruttaGetPasto
- `20882` — _fruttaContaRigheRicetta
- `20886` — _fruttaIndiceBasePasto
- `20906` — getFruttaMarker
- `20919` — fruttaMarkerHtml
- `20927` — _fruttaCheckboxHtml
- `20936` — toggleFrutta
- `20945` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 20981-22255

- `20981` — _renderCelleGriglia
- `21061` — _renderRicetteTestuali
- `21100` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `21171` — _renderCelleHtml
- `21179` — toggleCellaMenu
- `21198` — closeAllCellaMenus
- `21206` — _trovaPasto
- `21214` — cellaSposta
- `21268` — cellaCancella
- `21289` — apriEditGrammatura
- `16789` — salva
- `21337` — cellaSwap
- `21357` — cellaRimuoviAlt
- `21371` — cellaAggiungiAlt
- `21474` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `21559` — apriEditRicetta
- `21568` — aggiungiRicetta
- `21584` — rimuoviRicetta
- `21593` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `21755` — ngAggiungiSpuntinoVuoto
- `21771` — apriAggiungiCella
- `17254` — risolviCompatibili
- `21867` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `21959` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `22100` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `22255` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 22303-22695

- `22303` — _attesoStrutturaPiano
- `22323` — _confrontaStrutturaPiano
- `22353` — _costruisciPromptDelta
- `22380` — _pianoToolSchema
- `22455` — _pianoMaxTokens
- `22464` — _estraiPianoDaRisposta
- `22486` — chiamaGeneraPiano
- `22653` — mostraLoadingSteps
- `18123` — render
- `22695` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 22762-23339

- `22762` — generaMessaggioAI
- `22867` — copiaMessaggioAI
- `22877` — salvaInStorico
- `22889` — salvaVarianteAI
- `22904` — renderVariantiSalvate
- `22923` — usaVariante
- `22941` — eliminaVariante
- `22952` — renderStoricoMsg
- `22968` — apriWhatsApp
- `23339` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 23517-25014

- `23517` — _ngColoreSemaforoNome
- `23525` — apriSceltaModalitaPiano
- `23560` — _ngChiudiModalita
- `23563` — _ngCostruisciGiornoVuoto
- `23596` — _ngCostruisciGiornoSpeciale
- `23607` — _ngIndiceInizioSpeciali
- `23618` — _ngModalitaNomeGiorno
- `23624` — _ngImpostaModalitaNomeGiorno
- `23627` — _ngLettera
- `23634` — _ngEtichettaGiorno
- `23654` — _ngEtichettaGiornoBreve
- `23668` — _ngToggleGiornoSpeciale
- `23692` — _ngRenderPannelloSpeciale
- `23760` — _generaGiornoSpecialeAI
- `23860` — _ngGiornoHaContenuto
- `23872` — _ngCreaPianoManuale
- `23895` — _ngScrollTabGiorni
- `23905` — _ngAbilitaDragScroll
- `23942` — _ngCambiaNumeroGiorni
- `23974` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `23988` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `24029` — _ngToggleCat
- `24038` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `24062` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `24218` — _ngSalvaPianoManuale
- `24244` — _ngParseIngrediente
- `24268` — _ngScomponiIngredienti
- `24280` — _ricCalcolaMacroDaIngredienti
- `24298` — _ricRicalcolaMacroLive
- `24305` — _ricAggiornaInfoMacro
- `24319` — _ricRicalcolaMacroLiveNow
- `24343` — _ngTrovaCategoriaAlimento
- `24376` — _ngPescaRicetta
- `24419` — _ngScomponiRicettaNelPasto
- `24456` — _ngDragStart
- `24467` — _ngDragStartCella
- `24478` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `24485` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `24490` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `24509` — _ngAggiungiAlimento
- `24534` — _ngRimuoviAlimento
- `24548` — _ngDopoModifica
- `24566` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `24619` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `24648` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `24665` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `24673` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `24745` — gramTestoCasalingo
- `24771` — _appendToggleNutrizionali
- `24814` — _appendTogglePromemoria
- `24843` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `24989` — cpFromEmoji
- `24995` — getEmojiCp
- `25014` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `22989` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `23011` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `23016` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `23042` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `23130` — _spesaTestoWhatsApp
- `23146` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `23191` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `23214` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `23242` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `23302` — scaricaListaSpesaPDF (download diretto, un click)
- `23310` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `23322` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 26162-26162

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
- `26162` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 26176-26388

- `26176` — salvaInbody
- `26246` — delInbody
- `26253` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `26388` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 26416-26885

- `26416` — buildSemLegenda
- `26430` — renderAlEditor
- `26491` — _alimNomeRegex
- `26499` — _alimGiorniDaPiano
- `26507` — _scanGiorniPerNome
- `26522` — scanRiferimentiAlimento
- `26551` — _alimRefsRighe
- `26557` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `26645` — modificaAlimentoCustom
- `26665` — ripristinaValoriPrecedentiAlimento
- `26677` — _resetAlimModal
- `26688` — apriNuovoAlimentoCustom
- `26694` — salvaAlimentoCustom
- `26761` — eliminaAlimentoCustom
- `26792` — _alimFonteBadge
- `26797` — renderAlimentiPage
- `22217` — E
- `26867` — archiviaAlimentoCustom
- `26885` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 26912-27339

- `26912` — _bcSetStatus
- `26914` — apriScannerBarcode
- `26922` — chiudiScannerBarcode
- `26927` — _bcStopCamera
- `26935` — _bcModaleAperto
- `26937` — _bcAvviaCamera
- `26948` — _bcAvviaNativo
- `26968` — _bcAvviaZXing
- `26977` — _bcZXStart
- `26988` — _bcErroreCamera
- `26996` — cercaBarcodeManuale
- `27002` — _barcodeTrovato
- `27018` — cercaBarcodeOFF
- `27036` — _bcProdottoNonTrovato
- `27050` — _bcPrecompilaForm
- `22477` — num
- `27074` — togAl
- `27127` — selCatAl
- `25402` — selTuttiAl
- `27171` — _appIdAnag  (P140 T1)
- `27181` — _appSyncPaz  (P140 T1)
- `27225` — _appSpecchioInverso  (P140 T2)
- `27251` — _appRitiraSpecchio  (P140 T2)
- `27282` — _appAncoraTappe  (P140 T2)
- `27301` — _appTappe  (P140 T2)
- `27322` — _appMigraPaziente  (P140 T1)
- `27332` — _appMigraTutti  (P140 T1)
- `27339` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 27355-27822

- `27355` — setCalView
- `27365` — calPrev
- `27366` — calNext
- `27367` — calToday
- `27369` — renderCal
- `27383` — renderCalMonth
- `27410` — renderCalWeek
- `27443` — renderCalDay
- `27494` — selGiorno
- `27508` — setDisp
- `27513` — openAddEvento
- `27526` — openAddEventoPaz
- `27532` — toggleEntrataCheck
- `27537` — salvaEvento
- `27579` — _evTestoPromemoria  (P140 T1)
- `27585` — openEvDetail
- `27640` — delEvento
- `27662` — copyMsg
- `27674` — aggDateCal
- `27020` — syncInizio
- `27021` — syncControllo
- `27687` — aggiornaPrev
- `27712` — apriEventoDaScheda  (P140 T2)
- `27726` — _appAggiornaOreScheda  (P140 T2)
- `27743` — renderRic
- `27770` — openNuovaRic
- `27771` — editRic
- `27781` — salvaRic
- `27806` — delRic
- `27822` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 27908-27968

- `27908` — aggiungiEntrataPerPaziente
- `27925` — openNuovaEntrata
- `27939` — salvaEntrata
- `27960` — delEntrata
- `27968` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 27998-28607

- `27998` — aiSuggerisciRicetta
- `28043` — renderConcettiModal
- `28062` — apriConcettiModal
- `28089` — salvaConcettiAllegati
- `28113` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `28151` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `28294` — loadInbodyPDF
- `28417` — _vitdLabel
- `28421` — getIntegratori
- `28425` — getIntegraWant
- `28429` — setIntegratori
- `28446` — setIntegraWant
- `28484` — getPatologieChip
- `28485` — getAllergieChip
- `28486` — setPatologieChip
- `28487` — setAllergieChip
- `28488` — getPatologie
- `28489` — getAllergie
- `28490` — setPatologieFromStr
- `28497` — setAllergieFromStr
- `28510` — getSdvChip
- `28511` — getCspChip
- `28512` — setSdvChip
- `28513` — setCspChip
- `28514` — setSdvFromStr
- `28515` — setCspFromStr
- `28519` — getBudget
- `28520` — setBudget
- `28525` — renderCalAnno
- `28556` — comprimeImmagine
- `28578` — uploadImmagineConcetto
- `28597` — rimuoviImmagineConcetto
- `28607` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 28673-28757

- `28673` — entraSelConcetti
- `28674` — annullaSelConcetti
- `28675` — toggleConcettoSel
- `28680` — eliminaConcettiSelezionati
- `28699` — confermaEliminaConcetti
- `28714` — aiRiscriviConcetto
- `28728` — editConcetto
- `28746` — salvaConcetto
- `28757` — openNuovoConcetto
- `27519` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 28794-28794

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
- `28794` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 28906-29231

- `28906` — renderScadenzeAlert
- `29166` — _scadGestiti  (P144)
- `29176` — _scadPota  (P144)
- `29191` — _scadMigraDaLocalStorage  (P144)
- `29214` — segnaGestito
- `29231` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 29240-29315

- `29240` — ripristinaPaz
- `29248` — eliminaPaz
- `29293` — getDove
- `29297` — setDove
- `29315` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 29320-29758

- `29320` — getCredenzialiPersistenti
- `29333` — cancellaCredenzialiPersistenti
- `29338` — rinnovaSessioneConRefreshToken
- `29355` — getSessioneSalvata
- `29374` — salvaSessione
- `29384` — cancellaSessione
- `29388` — eseguiLogin
- `29435` — eseguiLogout
- `29457` — mostraApp
- `29462` — verificaSessioneEAvvia
- `29490` — assicuraTokenValido
- `29519` — _garantiscoSessionePerSync
- `29531` — avviaRinnovoTokenPeriodico
- `29535` — fermaRinnovoTokenPeriodico
- `29544` — _authReset
- `29549` — _authMostra
- `29552` — mostraLogin
- `29553` — mostraRegistrazione
- `29554` — mostraRecupero
- `29555` — mostraNuovaPassword
- `29558` — eseguiRegistrazione
- `29596` — eseguiRecuperoPassword
- `29625` — eseguiNuovaPassword
- `29659` — _parseHashParams
- `29666` — _pulisciHash
- `29670` — gestisciRitornoAuth
- `29758` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 29830-29953

- `29830` — apriPannelloRicette
- `29859` — chiudiPannelloRicette
- `29867` — applicaRicettaPasto
- `29903` — inizializzaP2
- `29915` — deepClone
- `29919` — applicaPatch
- `29953` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
