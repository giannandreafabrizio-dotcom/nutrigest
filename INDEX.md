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
Righe 14665-17728

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
- `16789` — renderStoricoTDEE
- `16831` — attivaSlotTDEE
- `16848` — eliminaSlotTDEE
- `16861` — _toggleCiclizzazione
- `16867` — _aggiornaAnteprimaCiclizzazione
- `16885` — salvaCalcoloMacros
- `17200` — _metAllenamento
- `17424` — _neatFrazione
- `17543` — _larnLafStileVita
- `17560` — _regimeOffset
- `17570` — _componiRegimeText
- `17603` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `17615` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `17622` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `17728` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 17746-18176

- `17746` — renderTargetBadge
- `17775` — verificaRegola_75_20_5
- `17812` — renderBadge75_20_5
- `17877` — _validaNorm
- `17880` — _validaMatchTermine
- `17888` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `17939` — _validaTesto
- `17960` — validaPiano
- `18034` — _validaFirmaBlocchi
- `18041` — renderBadgeValidatore
- `18072` — _validaVaiAlGiorno
- `18081` — apriPannelloValidatore
- `13472` — esc
- `18138` — _validaEseguiOverride
- `18161` — validaGateExport
- `18176` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 18309-18941

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
- `18309` — pianoPazSelezionato
- `18456` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `18694` — renderPanelMacrosGiorno
- `18837` — pmgCambiaGrammi
- `18864` — riapriPiano
- `18902` — _montaPianoCorrente
- `18941` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 18951-19420

- `18951` — pullTemplateSupabase
- `18962` — delTemplateSupabase
- `18971` — _promptTemplateNome
- `18996` — _creaTemplateDaJSON
- `19019` — salvaComeTemplate
- `19030` — salvaComeTemplateDaPiano
- `19039` — _normNomeAlim
- `19040` — _escRegAlim
- `19041` — _raccogliAlimentiDaPiano
- `19052` — _alimentiEsclusiPaziente
- `19064` — _trovaConflittiTemplate
- `19082` — _mostraAvvisoConflitti
- `19106` — applicaTemplate
- `19124` — apriPickerTemplate
- `19152` — _pickPaziente
- `19171` — applicaTemplatePick
- `19175` — rinominaTemplate
- `19186` — eliminaTemplate
- `19196` — renderLibreriaTemplate
- `19225` — renderStoricoPiani
- `19284` — eliminaPiano
- `19300` — _getActiveMacrosTarget
- `19324` — getTargetAttivi
- `19361` — calcolaTargetsCiclizzazione
- `19387` — _setupPianoTargets
- `19411` — getStagioneCorrente
- `19420` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 19891-19891

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `19891` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 19900-20359

- `19900` — aggiornaUIcolazione
- `19910` — salvaRegolePiano
- `19971` — _isModelloSistema
- `19974` — _isModelloSistemaModificato
- `19986` — caricaModelliCustomLocal
- `20000` — salvaModelliCustomLocal
- `20021` — _migraRecordCustom
- `20036` — _syncAliasLegacy
- `20045` — caricaAlimentiCustom
- `20069` — pushAlimentiCustomSupabase
- `20079` — pullAlimentiCustomSupabase
- `20093` — pushModelliSupabase
- `20111` — pullModelliSupabase
- `20136` — _calcolaFreqDaModello
- `20155` — aggiornaUImodello
- `20244` — popolaDropdownModelli
- `20272` — cambiaModelloRotazione
- `20278` — ripristinaModelloOriginale
- `20301` — eliminaModelloCustom
- `20319` — mostraAnteprimaModello
- `20329` — apriEditorModello
- `20359` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 20628-20866

- `15738` — rerender
- `20628` — _salvaModelloDaEditor
- `20670` — caricaRegolePiano
- `20700` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `20735` — _aiLogUsage
- `20757` — _aiProxyUrl
- `20763` — _aiTokenPerProxy
- `20792` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `20866` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 20945-21085

- `16216` — _risolviCollisioniCelle
- `20945` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `21005` — getFruttaStile
- `21012` — _fruttaGetPasto
- `21022` — _fruttaContaRigheRicetta
- `21026` — _fruttaIndiceBasePasto
- `21046` — getFruttaMarker
- `21059` — fruttaMarkerHtml
- `21067` — _fruttaCheckboxHtml
- `21076` — toggleFrutta
- `21085` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 21121-22395

- `21121` — _renderCelleGriglia
- `21201` — _renderRicetteTestuali
- `21240` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `21311` — _renderCelleHtml
- `21319` — toggleCellaMenu
- `21338` — closeAllCellaMenus
- `21346` — _trovaPasto
- `21354` — cellaSposta
- `21408` — cellaCancella
- `21429` — apriEditGrammatura
- `16789` — salva
- `21477` — cellaSwap
- `21497` — cellaRimuoviAlt
- `21511` — cellaAggiungiAlt
- `21614` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `21699` — apriEditRicetta
- `21708` — aggiungiRicetta
- `21724` — rimuoviRicetta
- `21733` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `21895` — ngAggiungiSpuntinoVuoto
- `21911` — apriAggiungiCella
- `17254` — risolviCompatibili
- `22007` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `22099` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `22240` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `22395` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 22443-22835

- `22443` — _attesoStrutturaPiano
- `22463` — _confrontaStrutturaPiano
- `22493` — _costruisciPromptDelta
- `22520` — _pianoToolSchema
- `22595` — _pianoMaxTokens
- `22604` — _estraiPianoDaRisposta
- `22626` — chiamaGeneraPiano
- `22793` — mostraLoadingSteps
- `18123` — render
- `22835` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 22902-23479

- `22902` — generaMessaggioAI
- `23007` — copiaMessaggioAI
- `23017` — salvaInStorico
- `23029` — salvaVarianteAI
- `23044` — renderVariantiSalvate
- `23063` — usaVariante
- `23081` — eliminaVariante
- `23092` — renderStoricoMsg
- `23108` — apriWhatsApp
- `23479` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 23657-25154

- `23657` — _ngColoreSemaforoNome
- `23665` — apriSceltaModalitaPiano
- `23700` — _ngChiudiModalita
- `23703` — _ngCostruisciGiornoVuoto
- `23736` — _ngCostruisciGiornoSpeciale
- `23747` — _ngIndiceInizioSpeciali
- `23758` — _ngModalitaNomeGiorno
- `23764` — _ngImpostaModalitaNomeGiorno
- `23767` — _ngLettera
- `23774` — _ngEtichettaGiorno
- `23794` — _ngEtichettaGiornoBreve
- `23808` — _ngToggleGiornoSpeciale
- `23832` — _ngRenderPannelloSpeciale
- `23900` — _generaGiornoSpecialeAI
- `24000` — _ngGiornoHaContenuto
- `24012` — _ngCreaPianoManuale
- `24035` — _ngScrollTabGiorni
- `24045` — _ngAbilitaDragScroll
- `24082` — _ngCambiaNumeroGiorni
- `24114` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `24128` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `24169` — _ngToggleCat
- `24178` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `24202` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `24358` — _ngSalvaPianoManuale
- `24384` — _ngParseIngrediente
- `24408` — _ngScomponiIngredienti
- `24420` — _ricCalcolaMacroDaIngredienti
- `24438` — _ricRicalcolaMacroLive
- `24445` — _ricAggiornaInfoMacro
- `24459` — _ricRicalcolaMacroLiveNow
- `24483` — _ngTrovaCategoriaAlimento
- `24516` — _ngPescaRicetta
- `24559` — _ngScomponiRicettaNelPasto
- `24596` — _ngDragStart
- `24607` — _ngDragStartCella
- `24618` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `24625` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `24630` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `24649` — _ngAggiungiAlimento
- `24674` — _ngRimuoviAlimento
- `24688` — _ngDopoModifica
- `24706` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `24759` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `24788` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `24805` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `24813` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `24885` — gramTestoCasalingo
- `24911` — _appendToggleNutrizionali
- `24954` — _appendTogglePromemoria
- `24983` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `25129` — cpFromEmoji
- `25135` — getEmojiCp
- `25154` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `23129` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `23151` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `23156` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `23182` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `23270` — _spesaTestoWhatsApp
- `23286` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `23331` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `23354` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `23382` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `23442` — scaricaListaSpesaPDF (download diretto, un click)
- `23450` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `23462` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 26302-26302

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
- `26302` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 26316-26528

- `26316` — salvaInbody
- `26386` — delInbody
- `26393` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `26528` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 26556-27025

- `26556` — buildSemLegenda
- `26570` — renderAlEditor
- `26631` — _alimNomeRegex
- `26639` — _alimGiorniDaPiano
- `26647` — _scanGiorniPerNome
- `26662` — scanRiferimentiAlimento
- `26691` — _alimRefsRighe
- `26697` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `26785` — modificaAlimentoCustom
- `26805` — ripristinaValoriPrecedentiAlimento
- `26817` — _resetAlimModal
- `26828` — apriNuovoAlimentoCustom
- `26834` — salvaAlimentoCustom
- `26901` — eliminaAlimentoCustom
- `26932` — _alimFonteBadge
- `26937` — renderAlimentiPage
- `22217` — E
- `27007` — archiviaAlimentoCustom
- `27025` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 27052-27479

- `27052` — _bcSetStatus
- `27054` — apriScannerBarcode
- `27062` — chiudiScannerBarcode
- `27067` — _bcStopCamera
- `27075` — _bcModaleAperto
- `27077` — _bcAvviaCamera
- `27088` — _bcAvviaNativo
- `27108` — _bcAvviaZXing
- `27117` — _bcZXStart
- `27128` — _bcErroreCamera
- `27136` — cercaBarcodeManuale
- `27142` — _barcodeTrovato
- `27158` — cercaBarcodeOFF
- `27176` — _bcProdottoNonTrovato
- `27190` — _bcPrecompilaForm
- `22477` — num
- `27214` — togAl
- `27267` — selCatAl
- `25402` — selTuttiAl
- `27311` — _appIdAnag  (P140 T1)
- `27321` — _appSyncPaz  (P140 T1)
- `27365` — _appSpecchioInverso  (P140 T2)
- `27391` — _appRitiraSpecchio  (P140 T2)
- `27422` — _appAncoraTappe  (P140 T2)
- `27441` — _appTappe  (P140 T2)
- `27462` — _appMigraPaziente  (P140 T1)
- `27472` — _appMigraTutti  (P140 T1)
- `27479` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 27495-27962

- `27495` — setCalView
- `27505` — calPrev
- `27506` — calNext
- `27507` — calToday
- `27509` — renderCal
- `27523` — renderCalMonth
- `27550` — renderCalWeek
- `27583` — renderCalDay
- `27634` — selGiorno
- `27648` — setDisp
- `27653` — openAddEvento
- `27666` — openAddEventoPaz
- `27672` — toggleEntrataCheck
- `27677` — salvaEvento
- `27719` — _evTestoPromemoria  (P140 T1)
- `27725` — openEvDetail
- `27780` — delEvento
- `27802` — copyMsg
- `27814` — aggDateCal
- `27020` — syncInizio
- `27021` — syncControllo
- `27827` — aggiornaPrev
- `27852` — apriEventoDaScheda  (P140 T2)
- `27866` — _appAggiornaOreScheda  (P140 T2)
- `27883` — renderRic
- `27910` — openNuovaRic
- `27911` — editRic
- `27921` — salvaRic
- `27946` — delRic
- `27962` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 28048-28108

- `28048` — aggiungiEntrataPerPaziente
- `28065` — openNuovaEntrata
- `28079` — salvaEntrata
- `28100` — delEntrata
- `28108` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 28138-28747

- `28138` — aiSuggerisciRicetta
- `28183` — renderConcettiModal
- `28202` — apriConcettiModal
- `28229` — salvaConcettiAllegati
- `28253` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `28291` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `28434` — loadInbodyPDF
- `28557` — _vitdLabel
- `28561` — getIntegratori
- `28565` — getIntegraWant
- `28569` — setIntegratori
- `28586` — setIntegraWant
- `28624` — getPatologieChip
- `28625` — getAllergieChip
- `28626` — setPatologieChip
- `28627` — setAllergieChip
- `28628` — getPatologie
- `28629` — getAllergie
- `28630` — setPatologieFromStr
- `28637` — setAllergieFromStr
- `28650` — getSdvChip
- `28651` — getCspChip
- `28652` — setSdvChip
- `28653` — setCspChip
- `28654` — setSdvFromStr
- `28655` — setCspFromStr
- `28659` — getBudget
- `28660` — setBudget
- `28665` — renderCalAnno
- `28696` — comprimeImmagine
- `28718` — uploadImmagineConcetto
- `28737` — rimuoviImmagineConcetto
- `28747` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 28813-28897

- `28813` — entraSelConcetti
- `28814` — annullaSelConcetti
- `28815` — toggleConcettoSel
- `28820` — eliminaConcettiSelezionati
- `28839` — confermaEliminaConcetti
- `28854` — aiRiscriviConcetto
- `28868` — editConcetto
- `28886` — salvaConcetto
- `28897` — openNuovoConcetto
- `27519` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 28934-28934

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
- `28934` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 29046-29371

- `29046` — renderScadenzeAlert
- `29306` — _scadGestiti  (P144)
- `29316` — _scadPota  (P144)
- `29331` — _scadMigraDaLocalStorage  (P144)
- `29354` — segnaGestito
- `29371` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 29380-29455

- `29380` — ripristinaPaz
- `29388` — eliminaPaz
- `29433` — getDove
- `29437` — setDove
- `29455` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 29460-29898

- `29460` — getCredenzialiPersistenti
- `29473` — cancellaCredenzialiPersistenti
- `29478` — rinnovaSessioneConRefreshToken
- `29495` — getSessioneSalvata
- `29514` — salvaSessione
- `29524` — cancellaSessione
- `29528` — eseguiLogin
- `29575` — eseguiLogout
- `29597` — mostraApp
- `29602` — verificaSessioneEAvvia
- `29630` — assicuraTokenValido
- `29659` — _garantiscoSessionePerSync
- `29671` — avviaRinnovoTokenPeriodico
- `29675` — fermaRinnovoTokenPeriodico
- `29684` — _authReset
- `29689` — _authMostra
- `29692` — mostraLogin
- `29693` — mostraRegistrazione
- `29694` — mostraRecupero
- `29695` — mostraNuovaPassword
- `29698` — eseguiRegistrazione
- `29736` — eseguiRecuperoPassword
- `29765` — eseguiNuovaPassword
- `29799` — _parseHashParams
- `29806` — _pulisciHash
- `29810` — gestisciRitornoAuth
- `29898` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 29970-30093

- `29970` — apriPannelloRicette
- `29999` — chiudiPannelloRicette
- `30007` — applicaRicettaPasto
- `30043` — inizializzaP2
- `30055` — deepClone
- `30059` — applicaPatch
- `30093` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
