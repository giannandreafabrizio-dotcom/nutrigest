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
Righe 2412-2454

- `2412` — _slugAlimento
- `2420` — _catalogoIndicizza
- `2424` — _catalogoDeindicizza
- `2431` — costruisciCatalogo
- `2454` — risolviAlimento

---

### MACROS PIANO — calcolo e badge macro reali vs target
Righe 2469-2732

- `2469` — getValoriCREA
- `2481` — getCurrentPaziente
- `2501` — getKcalWeekend
- `2558` — getMacrosRicettaComposta
- `2564` — calcolaMacrosPiano
- `2666` — renderBadgeMacrosReali
- `2611` — pctStr
- `2612` — color
- `2625` — row
- `2732` — renderBadgeMacrosReali_DOM

---

### ANALISI DEL SANGUE — parsing, indici clinici derivati, interpretazione
Righe 3017-3204

- `3017` — _parseAnalisiNum
- `3025` — calcolaIndice
- `3178` — interpretaAnalisi
- `3190` — _interpAnalisiHtml
- `3204` — mostraInfoRange

---

### CONCETTI EDUCATIVI — sync Supabase, migrazione
Righe 3351-3375

- `3351` — pushConcetiSupabase
- `3361` — pullConcetiSupabase
- `3375` — migraConcetti

---

### ALIMENTI — categorie funzionali/semaforo, chip UI, equivalenze porzioni
Righe 3565-3920

- `3565` — getCategoriaSemaforo
- `3582` — _getCategorieGruppo
- `3596` — calcolaGrammaturaEquivalente
- `3636` — _gruppoEquiv  (P121: gruppo di equivalenza + criterio per categoria funzionale)
- `3642` — _porzioneStandard  (P121: porzione `g` di database dell'alimento)
- `3657` — suggerisciGrEquivalente  (P121: firma a 3 argomenti, il gruppo si deduce dai due alimenti)
- `3683` — _etichettaCriterio  (P121: ≈carbo / ≈prot / ≈grassi / fissa / porzione)
- `3698` — _promptAlternativeGrassi  (P121: riga del prompt AI generata dal motore)
- `3714` — ricalcolaAlternative  (P121: MOTORE UNICO, unico punto che scrive la grammatura di un'alternativa)
- `3733` — ricalcolaAlternativePiano  (P121: applica il motore a tutte le celle di un piano)
- `3782` — arrotondaGrammatura  (P121: sostituisce arrotondaPorzioneDiscreta — pezzi interi senza tetto / 5g)
- `3792` — getCategoriaFunzionale
- `3832` — catArr
- `3848` — _tagComuniTrova
- `3852` — getTagComuniChip
- `3855` — setTagComuniChip
- `3863` — setCatChips
- `3876` — getStagioniChip
- `3879` — setStagioniChip
- `3886` — getProfiloChip
- `3889` — setProfiloChip
- `3898` — wireChipGroup
- `3909` — wireAttrChipGroups
- `3920` — wireRadioChipGroup

---

### CONFIG / STORAGE LOCALE — cfg, localStorage db, util data/valuta
Righe 3948-4364

- `3948` — getCfg
- `3949` — saveCfgL
- `3950` — getUrl
- `3951` — saveLocal
- `3952` — loadLocal
- `3964` — uid
- `3982` — ymdLoc  (P141)
- `3987` — today
- `3995` — addDays
- `4003` — fData
- `4004` — fEur
- `4006` — getLastSyncText
- `4016` — getSyncColor
- `4023` — aggiornaStatoSync
- `4049` — setSyncStatus
- `4318` — _registraTombstone
- `4326` — _tombstoneAttivi
- `4338` — _fondiTombstones
- `4352` — _mergeTombstonesRemoti *(dal 24/7 legge il meta da `collections`, P74 1d)*
- `4364` — _applicaTombstones
- `4225` — _pazFetchMeta *(P74 1d — solo `collections`)*
- `4246` — _collectionsUpsert *(P74 — scrittura primaria dei 4 meta-record dal cutover 1d)*
- `4268` — _collectionsFetch *(P74 1d — lettura unica dei meta-record)*
- `4291` — _analisiSangueUpsert *(P74 fase 2 — scrittura ombra analisi del sangue, 24/7)*

---

### SYNC SUPABASE — push/pull ricette/pazienti, tombstones, conflitti (P69)
Righe 4388-4773

- `4388` — supaHeaders
- `4402` — pushRicetteSupabase
- `4427` — pullRicetteSupabase
- `4449` — delRicetteSupabase
- `4461` — delPazienteSupabase
- `4476` — pushToSheets
- `4520` — pullFromSheets
- `4599` — syncNow
- `4612` — sincronizzaTutto
- `4360` — stpSet
- `4365` — stpMsg
- `4743` — testConnSupabase
- `4773` — _p68LogSaveAnonimo

---

### SYNC SUPABASE — save paziente, piani/cache piano, entrate, eventi
Righe 4787-5309

- `4787` — save
- `4805` — _pushRigaPerId
- `4838` — _flushDirtyIds
- `4921` — _p69LoadBaseline
- `4924` — _p69StoreBaseline
- `4927` — _p69SetBaseline
- `4931` — _p69DropBaseline
- `4935` — _p69SetBaselineFromRows
- `4941` — _p69NomePaz
- `4946` — _p69InList
- `4954` — _p69RilevaConflitti
- `4990` — _p69DialogoConflitti
- `4738` — chiudi
- `5024` — _p69RisolviRicarica
- `5053` — _p69EsportaLocali
- `5066` — _p69RisolviSovrascrivi
- `5079` — pushPianoSupabase
- `5101` — pullPianiSupabase
- `5117` — delPianoSupabase
- `5133` — delPianiPazienteSupabase
- `5145` — pushCachePianoSupabase
- `5162` — caricaCachePianoSupabase
- `5184` — pushEntrateSupabase
- `5208` — pullEntrateSupabase
- `5222` — delEntrataSupabase
- `5230` — pushEntrataSupabase
- `5241` — pushEventoSupabase
- `5254` — pushEventiSupabase
- `5278` — pullEventiSupabase
- `5298` — delEventoSupabase
- `5309` — _pianoCacheKey

---

### UI GENERALE — config AI key, notifiche, navigazione (goTo/tab/modali)
Righe 5340-5451

- `5340` — _salvaPianoCache
- `5345` — _caricaPianoCache
- `5351` — salvaCfg
- `5352` — testConn
- `5359` — testaAntKey
- `5370` — initAntCard
- `5373` — esporta
- `5374` — importa
- `5379` — goTo
- `5395` — closeM
- `5403` — ngChiudiModale
- `5412` — ngChiudiPopupCoppia
- `5416` — ngAggiungiX
- `5427` — ngUpgradeModali
- `5447` — mTab
- `5448` — aggiornaEta
- `5449` — toggleOrarioNote
- `5450` — pdTab
- `5451` — notif

---

### PAZIENTI — registro: lista/card/kanban, apertura, editing, salvataggio, routine
Righe 5459-8252

- `5459` — getPazView
- `5460` — setPazView
- `5469` — _pazStatoPiano
- `5477` — _pazUrgenzaControllo
- `5484` — _pazStatoTagHtml
- `5493` — _pazAggiornaFiltroRegimi
- `5501` — renderPaz
- `5554` — _renderPazCard
- `5579` — _renderPazLista
- `5606` — _renderPazKanban
- `5644` — openNuovoPaz
- `5671` — editPaz
- `5751` — REGOLE_SEMAFORO_ALIMENTI *(15 condizioni cliniche → grigi/celesti; globale dal 26/7 per essere verificabile dal test)*
- `6198` — _SEM_COLORI_LEGACY / `6105` _SEM_COLORI_AUTO *(F9 — unico vocabolario dei colori automatici)*
- `6203` — NOMI_CONDIZIONE_SEMAFORO *(etichette delle 15 condizioni, usate anche dal riquadro della scheda)*
- `6225` — _semaforoCondizioniAttive *(le condizioni spuntate su un paziente)*
- `6236` — _semaforoMigraPaziente *(F9 — toglie i colori legacy e ricalcola; idempotente)*
- `6247` — _semaforoMigraTutti *(passata su tutti i pazienti in memoria, con conteggio)*
- `6258` — applicaRegoloSemaforo *(dal 26/7 pulisce TUTTI e sei i colori automatici, non solo i suoi due)*
- `6346` — trovaChiaveAlimento *(match esatto sul nome: se non trova, la regola è ignorata in silenzio — vedi test s2-regole-nomi-alimenti)*
- `6370` — _pazNumOPrec *(F7 — campo assente = valore precedente, non azzeramento)*
- `6382` — _pazPreservaCampi *(F5 — l'anagrafica non cancella i campi che il form non gestisce)*
- `6388` — salvaPaz
- `6492` — openPaz
- `7939` — renderPdRoutine
- `6723` — cardHTML
- `8081` — updateRoutineCampo
- `8089` — suggerisciPastoEQuando
- `8116` — filtroLibreria
- `8125` — renderLibreriaGrid
- `8146` — aggiungiDaLibreriaIdx
- `8170` — openModalRoutine
- `8177` — salvaRoutineVoce
- `8202` — salvaRoutine
- `8209` — mostraRoutinePopup
- `8237` — removeRoutineVoce
- `8252` — _renderAggiustamentiSection

---

### 📈 PERCORSO — timeline di periodizzazione (P115 Tappe 1-5 COMPLETE, 24 lug 2026)
Righe 6021-6621 (numeri ESATTI al 24/7 notte, dopo la Tappa 5). ⚠️ Questo blocco (~600 righe) fa slittare tutti i numeri delle sezioni SUCCESSIVE a riga ~6020 rispetto all'ultima rigenerazione completa: per quelle sezioni fare grep di conferma. Rigenerazione completa alla prossima modifica strutturale.

- `6537` — _PERCORSO_TIPI (const: tipi fase, colori, pct default)
- `6544` — _percorsoGet *(normalizza p.percorso, scarta fasi invalide)*
- `6568` — _percorsoIntervalli *(fasi consecutive → date concrete dal/al)*
- `6582` — _percorsoFaseAt *(fase attiva a una data; dal incluso, al escluso)*
- `6591` — _percorsoKcalFase *(pct → kcal indicative via calcolaTDEE)*
- `6614` — _percorsoProiezione *(Tappa 2 — proiezione ibrida teorica/calibrata, cono, obiettivo a intervallo)*
- `6672` — _percorsoDataBreve *(ISO → "12 set")*
- `6689` — _percorsoSerieEnergia *(Tappa 3 — serie introito/TDEE stimato/TDEE osservato per la corsia energia)*
- `6728` — _percorsoSerieMassaMagra *(Tappa 4 — solo InBody: punti {data,m,pg})*
- `6747` — _percorsoConsuntivo *(Tappa 5 — legge p.consuntivo scritto da P50: aderenza, extra kcal, ritardo=extra÷7700, settimane perse; oggi sempre ok:false)*
- `6789` — _PERCORSO_LAYERS_DEFAULT / _percorsoLayersState / _percorsoLayersGet *(Tappa 4 — stato interruttori, SOLO sessione, mai su p)*
- `6794` — percorsoLayerToggle *(Tappa 4 — inverte un solo strato)*
- `6800` — percorsoVistaPreset *(Tappa 4 — preset "tecnica"/"paziente")*
- `6816` — _percorsoPaz *(e a seguire i mutatori percorsoInit/SetInizio/AddFase/UpdFase/DelFase/MoveFase)*
- `6872` — _PERCORSO_MODELLI / _PERCORSO_GEN *(P122 T3 — 4 modelli + regole dei cicli)*
- `6890` — _percorsoGeneraFasi *(P122 T3 — pura: dal traguardo alle fasi, ritmo = quello della proiezione)*
- `6970` — _percorsoModelloSelectHtml
- `6979` — percorsoGeneraDaModello *(propone; conferma prima di sostituire fasi esistenti)*
- `7002` — _percorsoShiftGiorni *(pura: ancora = ultima pesata)*
- `7012` — percorsoRiallinea *(⏩ trasla il piano, riprende dal giorno-fase dell'interruzione)*
- `7039` — _TRG_TIPI / `6744` _TRG_COMPORTAMENTI *(P122 T4 — tipi di traguardo e libreria comportamenti)*
- `7061` — _traguardiGet · `6761` _traguardoValoreAttuale *(valore corrente dai dati esistenti, null se manca)*
- `7100` — _traguardoVerso *(auto: dedotto dalla partenza)* · `6803` _traguardoValuta · `6824` _traguardiValuta
- `7141` — traguardoAdd · `6852` traguardoUpd · `6867` traguardoDel · `6873` traguardoSegna
- `7199` — _COND_TIPI · `6897` _percorsoCondizione *(pura: la fase finisce per soglia — SOLO suggerimento)*
- `7215` — percorsoSetCondizione · `6927` percorsoChiudiFase *(esito fotografato, riapribile)*
- `7249` — _traguardiHtml *(blocco 🏁 in fondo alla scheda Percorso)*
- `7347` — _percorsoVistaPaz / `7049` _percorsoVistaPazAttiva *(P122 T5 — modalità di sessione)*
- `7354` — _percorsoVittorie *(pura: vittorie dall'inizio del percorso + flag ricomposizione)*
- `7392` — _percorsoNascondiPeso *(in fase di massa il peso non si mostra al paziente)*
- `7403` — _traguardoFaseCorrente *(traguardo della fase IN CORSO, non quello lontano)*
- `7431` — _traguardoTestoPaziente *(righe in italiano semplice, riusate dal messaggio WhatsApp)*
- `7464` — _vistaPazienteHtml *(i tre riquadri che guarda il paziente)*
- `7544` — _percorsoChartSvg *(due corsie: peso + massa magra + cono proiezione sopra, striscia aderenza in mezzo (solo con dati P50), energia (kcal) sotto — tutto gated dagli interruttori)*
- `7733` — renderPdPercorso *(scheda: badge fase, riga proiezione/obiettivo, riga Piano vs Realtà (solo con dati), toolbar interruttori, grafico, editor)*

*(Tappa 2 tocca anche `calcolaMacros`: box obiettivo con intervallo al posto della data secca.)*

---

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 8337-8508

- `8337` — salvaAggiustamento
- `8370` — eliminaAggiustamento
- `8379` — renderPdNote
- `8414` — salvaNotaClinica
- `8429` — deleteNota
- `8438` — saveNote
- `8458` — resetSemaforoAuto *(F9 — pulsante 🔄 Ricalcola: pulisce gli automatici e rifà col sistema valido; il motore LEGACY non esiste più)*
- `8508` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 8734-8932

- `8734` — avviaFX
- `8762` — avviaAnalisi
- `8779` — _renderFlussoPanel
- `8823` — _riepEsc
- `8827` — _riepNum
- `8833` — _riepDelta
- `8841` — _riepDataSig
- `8859` — _riepParseFX
- `8087` — clean
- `8873` — _riepAggiornaFX
- `8899` — _riepToggleDomandaDefault
- `8911` — _riepAddDomanda
- `8924` — _riepRemoveDomanda
- `8932` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 9144-9376

- `8218` — dCol
- `8336` — card
- `9144` — renderPdRagionamento
- `9232` — inviaMessaggioRag
- `9250` — concludiERiassumi
- `9264` — salvaRagionamento
- `9285` — apriGeneratoreDaRag
- `9293` — nuovaSessioneRag
- `9299` — cancellaSavedRag
- `9309` — renderPazTimeline
- `9346` — renderPdAnamnesi
- `9376` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 11324-12459

- `11324` — _anNorm *(P125 — testo confrontabile: minuscole, niente accenti)*
- `11330` — _anCorrisponde *(P125 — ricerca per parole-prefisso: "vit d" trova "Vitamina D")*
- `11336` — filtraAnalisi *(P125 — filtro dal vivo delle 119 voci)*
- `11370` — pulisciRicercaAnalisi
- `11376` — renderPdAnalisi
- `11432` — toggleAnalisiSection
- `11581` — loadAnalisiSanguePDF
- `11468` — _impPdfConfigurata
- `11469` — _impPdfLib
- `11479` — _impPdfApri
- `11492` — _impPdfPagina *(P124b — una pagina del PDF → immagine, con la rotazione RILEVATA, non quella dichiarata dal file)*
- `11513` — _impRuotaImmagine
- `11538` — _impRilevaRotazione *(P124b — chiamata piccola: di quanti gradi va girata la pagina)*
- `11557` — _impPromptPagina *(P124b — prompt di UNA pagina, con l'impronta della riga: valore+unità+riferimento)*
- `11756` — _impNormalizzaNumero *(P124 — numero all'italiana → punto decimale, conversione fatta dall'app e non dall'AI)*
- `11767` — _impNumeri
- `11775` — _impSembraIntervallo
- `11783` — _impUgualeAlRange
- `11792` — _impLimitiStd
- `11813` — _impFuoriScala
- `11822` — _impCorrezioneVirgola
- `11834` — _impTestoLimiti
- `11855` — _impRifPlausibile *(P124b — un "riferimento" che è un'unità di misura = riga disallineata)*
- `11868` — _impUnitaCanonica
- `11890` — _impStessaGrandezza *(P124b — stesso tipo di misura a meno del prefisso: nanomoli/micromoli/millimoli)*
- `11907` — _impUnitaCompatibili
- `11918` — _impControllaValore *(P124 — i controlli anti-errore su un valore estratto)*
- `11982` — mostraDiffAnalisi *(P124 — colonna Estratto modificabile + righe sospette deselezionate)*
- `12172` — _calcoloIncluso
- `12178` — toggleCalcoloIncluso
- `12200` — _renderCalcoliPannello
- `12241` — toggleGlossario
- `12246` — updateAnalisi
- `12305` — salvaAnalisi
- `12318` — applicaGruppoClinico
- `12347` — renderBoxGruppiCliniciSuggeriti
- `12379` — suggerisciGruppiClinici
- `12459` — renderMemoriaInbody

---
### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9176 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `9506` — _richVal
- `9513` — _richBmi
- `9518` — _richPat
- `9524` — _richNum
- `9569` — _richPreselezione
- `9585` — richLeggiIntestazione
- `9589` — richSalvaIntestazione
- `9598` — apriRichiestaAnalisi
- `9618` — _richModaleHtml
- `9694` — _richEsc
- `9696` — _richMotivoCambia
- `9702` — _richToggleSez
- `9708` — _richAggiornaConteggi
- `9716` — _richMotivoCorrente
- `9726` — _richSelezione
- `9741` — _richTxt
- `9747` — _richCostruisciPDF
- `8969` — nuovaPagina
- `8970` — spazio
- `9843` — _richNomeFile
- `9848` — _richPrepara
- `9861` — _richRegistra
- `9866` — _richStato
- `9868` — richScaricaPDF
- `9917` — _richUpload
- `9919` — _richWaUrl
- `9926` — _richTestoWa
- `9940` — richInviaWhatsApp
- `9980` — richCopiaLink
- `10001` — _richStoricoHtml

---
### REFERTI DEL SANGUE DATATI — storico nel tempo (P118 tappa 1)
Righe 9194-9387 — migrazione, ordinamento, quadro attuale derivato, barra di selezione.

- `11101` — _refertoNuovoId
- `11104` — _refertoOggi
- `11108` — _refertoDataIt
- `11114` — _refertoConteggio
- `11128` — _refertiMigra
- `11155` — _refertiOrdinati
- `11166` — _refertoPiuRecente
- `11171` — _refertoInVista
- `11189` — _refertiApplica
- `11202` — _refertoCrea
- `11221` — refertoCambiaVista
- `11227` — refertoCambiaData
- `11239` — refertoNuovo
- `11247` — refertoDuplica
- `11256` — refertoElimina
- `11271` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `10714` — _rangeNum
- `10720` — _rangeTestoDa
- `10739` — _rangeCoppia
- `10749` — _rangeHtml

---
### ANDAMENTO NEL TEMPO — tracciato, variazione, grafico grande (P118 tappa 3)
Righe 9441-9745 — serie storica, regola del colore, sparkline, pannello in fondo.

- `10791` — _andLimiti
- `10812` — _andParseRangeLab
- `10825` — _andDistanza
- `10832` — _andValutazione
- `10845` — _andSerie
- `10859` — _andNum
- `10863` — _andDataBreve
- `10868` — _andMeseAnno
- `10876` — _andDominio
- `10890` — _andColore
- `10903` — _andSparkHtml
- `10929` — _andRigaHtml
- `10951` — _andEsamiSeguibili
- `10959` — andScegliEsame
- `10965` — _andPannelloHtml
- `11018` — _andGraficoGrande
- `11069` — _andPasso

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 12509-13832

- `12509` — _ibFmtBreve
- `12518` — _renderPesiIntermediSection
- `12567` — aggiungiPesoIntermedio
- `12583` — eliminaPesoIntermedio
- `12593` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `13832` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 14140-14140

- `14140` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 14518-17059

- `14518` — aggiornaLabelMacros
- `14536` — calcolaMacros
- `14677` — applicaSchema
- `14712` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `14718` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `14740` — _misuraDaReferto *(P127 — UN referto letto con le regole del traguardo: usata anche dalla verifica al controllo)*
- `14773` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `14784` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `14802` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `14915` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `14929` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `14985` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `14999` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `15031` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `15064` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `15106` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `15114` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `15125` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `15152` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `15167` — _stradeVerso *(le strade complete + percentuale libera)*
- `15214` — _VC_TOLLERANZA_PCT / _VC_GIORNI_MIN / _VC_GIORNI_MIN_RITARO / _VC_COPERTURA_MIN_PCT / _VC_MAGRA_PRUDENZA_GG *(P127 — soglie cliniche della verifica)*
- `15224` — _mediaSlotPrescritta *(media pesata sui giorni di un campo dello storico target; la usa anche _kcalMediaPrescrittaOss)*
- `15244` — _vcDeficitSlot *(deficit di uno slot: campo offset o kcal−tdee per gli slot vecchi)*
- `15252` — _vcTratto *(P127 — cosa è cambiato fra due referti, previsto vs reale, TDEE misurato)*
- `15306` — _vcTraguardoSalvato *(traguardo ricostruito dal salvato, per la scheda Percorso)*
- `15316` — _verificaControllo *(P127 — motore puro: tratto recente, quadro dall'inizio, residuo al ritmo reale)*
- `15354` — _verificaControlloHtml *(blocco 🔎, unica fonte per pannello 🎯 e scheda Percorso; azioni solo dove c'è il campo kcal)*
- `15446` — _vcRitara *(scrive le kcal ritarate nel campo regime: propone, non salva)*
- `15459` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `15527` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `15549` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `15602` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `15709` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `15724` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `15749` — _renderRifPesoBox
- `15800` — _usaRifPeso
- `15804` — _aggiornaRifPesoTarget
- `15807` — _aggiornaRegimeSlider
- `16464` — _presetRegime
- `16468` — _initRegimeSliderDaPaziente
- `16486` — ricalcolaLAF
- `16620` — renderStoricoTDEE
- `16654` — attivaSlotTDEE
- `16662` — eliminaSlotTDEE
- `16675` — _toggleCiclizzazione
- `16681` — _aggiornaAnteprimaCiclizzazione
- `16699` — salvaCalcoloMacros
- `16813` — _metAllenamento
- `16829` — _neatFrazione
- `16903` — _larnLafStileVita
- `16920` — _regimeOffset
- `16930` — _componiRegimeText
- `16963` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `16975` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `16982` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `17059` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 17077-17507

- `17077` — renderTargetBadge
- `17106` — verificaRegola_75_20_5
- `17143` — renderBadge75_20_5
- `17208` — _validaNorm
- `17211` — _validaMatchTermine
- `17219` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `17270` — _validaTesto
- `17291` — validaPiano
- `17365` — _validaFirmaBlocchi
- `17372` — renderBadgeValidatore
- `17403` — _validaVaiAlGiorno
- `17412` — apriPannelloValidatore
- `13472` — esc
- `17469` — _validaEseguiOverride
- `17492` — validaGateExport
- `17507` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 17640-18272

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
- `17640` — pianoPazSelezionato
- `17787` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `18025` — renderPanelMacrosGiorno
- `18168` — pmgCambiaGrammi
- `18195` — riapriPiano
- `18233` — _montaPianoCorrente
- `18272` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 18282-18751

- `18282` — pullTemplateSupabase
- `18293` — delTemplateSupabase
- `18302` — _promptTemplateNome
- `18327` — _creaTemplateDaJSON
- `18350` — salvaComeTemplate
- `18361` — salvaComeTemplateDaPiano
- `18370` — _normNomeAlim
- `18371` — _escRegAlim
- `18372` — _raccogliAlimentiDaPiano
- `18383` — _alimentiEsclusiPaziente
- `18395` — _trovaConflittiTemplate
- `18413` — _mostraAvvisoConflitti
- `18437` — applicaTemplate
- `18455` — apriPickerTemplate
- `18483` — _pickPaziente
- `18502` — applicaTemplatePick
- `18506` — rinominaTemplate
- `18517` — eliminaTemplate
- `18527` — renderLibreriaTemplate
- `18556` — renderStoricoPiani
- `18615` — eliminaPiano
- `18631` — _getActiveMacrosTarget
- `18655` — getTargetAttivi
- `18692` — calcolaTargetsCiclizzazione
- `18718` — _setupPianoTargets
- `18742` — getStagioneCorrente
- `18751` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 19213-19213

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `19213` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 19222-19681

- `19222` — aggiornaUIcolazione
- `19232` — salvaRegolePiano
- `19293` — _isModelloSistema
- `19296` — _isModelloSistemaModificato
- `19308` — caricaModelliCustomLocal
- `19322` — salvaModelliCustomLocal
- `19343` — _migraRecordCustom
- `19358` — _syncAliasLegacy
- `19367` — caricaAlimentiCustom
- `19391` — pushAlimentiCustomSupabase
- `19401` — pullAlimentiCustomSupabase
- `19415` — pushModelliSupabase
- `19433` — pullModelliSupabase
- `19458` — _calcolaFreqDaModello
- `19477` — aggiornaUImodello
- `19566` — popolaDropdownModelli
- `19594` — cambiaModelloRotazione
- `19600` — ripristinaModelloOriginale
- `19623` — eliminaModelloCustom
- `19641` — mostraAnteprimaModello
- `19651` — apriEditorModello
- `19681` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 19950-20188

- `15738` — rerender
- `19950` — _salvaModelloDaEditor
- `19992` — caricaRegolePiano
- `20022` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `20057` — _aiLogUsage
- `20079` — _aiProxyUrl
- `20085` — _aiTokenPerProxy
- `20114` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `20188` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 20267-20407

- `16216` — _risolviCollisioniCelle
- `20267` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `20327` — getFruttaStile
- `20334` — _fruttaGetPasto
- `20344` — _fruttaContaRigheRicetta
- `20348` — _fruttaIndiceBasePasto
- `20368` — getFruttaMarker
- `20381` — fruttaMarkerHtml
- `20389` — _fruttaCheckboxHtml
- `20398` — toggleFrutta
- `20407` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 20443-21717

- `20443` — _renderCelleGriglia
- `20523` — _renderRicetteTestuali
- `20562` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `20633` — _renderCelleHtml
- `20641` — toggleCellaMenu
- `20660` — closeAllCellaMenus
- `20668` — _trovaPasto
- `20676` — cellaSposta
- `20730` — cellaCancella
- `20751` — apriEditGrammatura
- `16789` — salva
- `20799` — cellaSwap
- `20819` — cellaRimuoviAlt
- `20833` — cellaAggiungiAlt
- `20936` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `21021` — apriEditRicetta
- `21030` — aggiungiRicetta
- `21046` — rimuoviRicetta
- `21055` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `21217` — ngAggiungiSpuntinoVuoto
- `21233` — apriAggiungiCella
- `17254` — risolviCompatibili
- `21329` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `21421` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `21562` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `21717` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 21765-22157

- `21765` — _attesoStrutturaPiano
- `21785` — _confrontaStrutturaPiano
- `21815` — _costruisciPromptDelta
- `21842` — _pianoToolSchema
- `21917` — _pianoMaxTokens
- `21926` — _estraiPianoDaRisposta
- `21948` — chiamaGeneraPiano
- `22115` — mostraLoadingSteps
- `18123` — render
- `22157` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 22224-22801

- `22224` — generaMessaggioAI
- `22329` — copiaMessaggioAI
- `22339` — salvaInStorico
- `22351` — salvaVarianteAI
- `22366` — renderVariantiSalvate
- `22385` — usaVariante
- `22403` — eliminaVariante
- `22414` — renderStoricoMsg
- `22430` — apriWhatsApp
- `22801` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 22979-24476

- `22979` — _ngColoreSemaforoNome
- `22987` — apriSceltaModalitaPiano
- `23022` — _ngChiudiModalita
- `23025` — _ngCostruisciGiornoVuoto
- `23058` — _ngCostruisciGiornoSpeciale
- `23069` — _ngIndiceInizioSpeciali
- `23080` — _ngModalitaNomeGiorno
- `23086` — _ngImpostaModalitaNomeGiorno
- `23089` — _ngLettera
- `23096` — _ngEtichettaGiorno
- `23116` — _ngEtichettaGiornoBreve
- `23130` — _ngToggleGiornoSpeciale
- `23154` — _ngRenderPannelloSpeciale
- `23222` — _generaGiornoSpecialeAI
- `23322` — _ngGiornoHaContenuto
- `23334` — _ngCreaPianoManuale
- `23357` — _ngScrollTabGiorni
- `23367` — _ngAbilitaDragScroll
- `23404` — _ngCambiaNumeroGiorni
- `23436` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `23450` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `23491` — _ngToggleCat
- `23500` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `23524` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `23680` — _ngSalvaPianoManuale
- `23706` — _ngParseIngrediente
- `23730` — _ngScomponiIngredienti
- `23742` — _ricCalcolaMacroDaIngredienti
- `23760` — _ricRicalcolaMacroLive
- `23767` — _ricAggiornaInfoMacro
- `23781` — _ricRicalcolaMacroLiveNow
- `23805` — _ngTrovaCategoriaAlimento
- `23838` — _ngPescaRicetta
- `23881` — _ngScomponiRicettaNelPasto
- `23918` — _ngDragStart
- `23929` — _ngDragStartCella
- `23940` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `23947` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `23952` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `23971` — _ngAggiungiAlimento
- `23996` — _ngRimuoviAlimento
- `24010` — _ngDopoModifica
- `24028` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `24081` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `24110` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `24127` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `24135` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `24207` — gramTestoCasalingo
- `24233` — _appendToggleNutrizionali
- `24276` — _appendTogglePromemoria
- `24305` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `24451` — cpFromEmoji
- `24457` — getEmojiCp
- `24476` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `22451` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `22473` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `22478` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `22504` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `22592` — _spesaTestoWhatsApp
- `22608` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `22653` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `22676` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `22704` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `22764` — scaricaListaSpesaPDF (download diretto, un click)
- `22772` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `22784` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 25624-25624

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
- `25624` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 25636-25843

- `25636` — salvaInbody
- `25701` — delInbody
- `25708` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `25843` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 25871-26340

- `25871` — buildSemLegenda
- `25885` — renderAlEditor
- `25946` — _alimNomeRegex
- `25954` — _alimGiorniDaPiano
- `25962` — _scanGiorniPerNome
- `25977` — scanRiferimentiAlimento
- `26006` — _alimRefsRighe
- `26012` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `26100` — modificaAlimentoCustom
- `26120` — ripristinaValoriPrecedentiAlimento
- `26132` — _resetAlimModal
- `26143` — apriNuovoAlimentoCustom
- `26149` — salvaAlimentoCustom
- `26216` — eliminaAlimentoCustom
- `26247` — _alimFonteBadge
- `26252` — renderAlimentiPage
- `22217` — E
- `26322` — archiviaAlimentoCustom
- `26340` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 26367-26794

- `26367` — _bcSetStatus
- `26369` — apriScannerBarcode
- `26377` — chiudiScannerBarcode
- `26382` — _bcStopCamera
- `26390` — _bcModaleAperto
- `26392` — _bcAvviaCamera
- `26403` — _bcAvviaNativo
- `26423` — _bcAvviaZXing
- `26432` — _bcZXStart
- `26443` — _bcErroreCamera
- `26451` — cercaBarcodeManuale
- `26457` — _barcodeTrovato
- `26473` — cercaBarcodeOFF
- `26491` — _bcProdottoNonTrovato
- `26505` — _bcPrecompilaForm
- `22477` — num
- `26529` — togAl
- `26582` — selCatAl
- `25402` — selTuttiAl
- `26626` — _appIdAnag  (P140 T1)
- `26636` — _appSyncPaz  (P140 T1)
- `26680` — _appSpecchioInverso  (P140 T2)
- `26706` — _appRitiraSpecchio  (P140 T2)
- `26737` — _appAncoraTappe  (P140 T2)
- `26756` — _appTappe  (P140 T2)
- `26777` — _appMigraPaziente  (P140 T1)
- `26787` — _appMigraTutti  (P140 T1)
- `26794` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 26810-27277

- `26810` — setCalView
- `26820` — calPrev
- `26821` — calNext
- `26822` — calToday
- `26824` — renderCal
- `26838` — renderCalMonth
- `26865` — renderCalWeek
- `26898` — renderCalDay
- `26949` — selGiorno
- `26963` — setDisp
- `26968` — openAddEvento
- `26981` — openAddEventoPaz
- `26987` — toggleEntrataCheck
- `26992` — salvaEvento
- `27034` — _evTestoPromemoria  (P140 T1)
- `27040` — openEvDetail
- `27095` — delEvento
- `27117` — copyMsg
- `27129` — aggDateCal
- `27020` — syncInizio
- `27021` — syncControllo
- `27142` — aggiornaPrev
- `27167` — apriEventoDaScheda  (P140 T2)
- `27181` — _appAggiornaOreScheda  (P140 T2)
- `27198` — renderRic
- `27225` — openNuovaRic
- `27226` — editRic
- `27236` — salvaRic
- `27261` — delRic
- `27277` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 27363-27423

- `27363` — aggiungiEntrataPerPaziente
- `27380` — openNuovaEntrata
- `27394` — salvaEntrata
- `27415` — delEntrata
- `27423` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 27453-27923

- `27453` — aiSuggerisciRicetta
- `27498` — renderConcettiModal
- `27517` — apriConcettiModal
- `27544` — salvaConcettiAllegati
- `27568` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `27606` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `27615` — loadInbodyPDF
- `27733` — _vitdLabel
- `27737` — getIntegratori
- `27741` — getIntegraWant
- `27745` — setIntegratori
- `27762` — setIntegraWant
- `27800` — getPatologieChip
- `27801` — getAllergieChip
- `27802` — setPatologieChip
- `27803` — setAllergieChip
- `27804` — getPatologie
- `27805` — getAllergie
- `27806` — setPatologieFromStr
- `27813` — setAllergieFromStr
- `27826` — getSdvChip
- `27827` — getCspChip
- `27828` — setSdvChip
- `27829` — setCspChip
- `27830` — setSdvFromStr
- `27831` — setCspFromStr
- `27835` — getBudget
- `27836` — setBudget
- `27841` — renderCalAnno
- `27872` — comprimeImmagine
- `27894` — uploadImmagineConcetto
- `27913` — rimuoviImmagineConcetto
- `27923` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 27989-28073

- `27989` — entraSelConcetti
- `27990` — annullaSelConcetti
- `27991` — toggleConcettoSel
- `27996` — eliminaConcettiSelezionati
- `28015` — confermaEliminaConcetti
- `28030` — aiRiscriviConcetto
- `28044` — editConcetto
- `28062` — salvaConcetto
- `28073` — openNuovoConcetto
- `27519` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 28110-28110

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
- `28110` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 28221-28482

- `28221` — renderScadenzeAlert
- `28463` — segnaGestito
- `28482` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 28491-28566

- `28491` — ripristinaPaz
- `28499` — eliminaPaz
- `28544` — getDove
- `28548` — setDove
- `28566` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 28571-29009

- `28571` — getCredenzialiPersistenti
- `28584` — cancellaCredenzialiPersistenti
- `28589` — rinnovaSessioneConRefreshToken
- `28606` — getSessioneSalvata
- `28625` — salvaSessione
- `28635` — cancellaSessione
- `28639` — eseguiLogin
- `28686` — eseguiLogout
- `28708` — mostraApp
- `28713` — verificaSessioneEAvvia
- `28741` — assicuraTokenValido
- `28770` — _garantiscoSessionePerSync
- `28782` — avviaRinnovoTokenPeriodico
- `28786` — fermaRinnovoTokenPeriodico
- `28795` — _authReset
- `28800` — _authMostra
- `28803` — mostraLogin
- `28804` — mostraRegistrazione
- `28805` — mostraRecupero
- `28806` — mostraNuovaPassword
- `28809` — eseguiRegistrazione
- `28847` — eseguiRecuperoPassword
- `28876` — eseguiNuovaPassword
- `28910` — _parseHashParams
- `28917` — _pulisciHash
- `28921` — gestisciRitornoAuth
- `29009` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 29081-29204

- `29081` — apriPannelloRicette
- `29110` — chiudiPannelloRicette
- `29118` — applicaRicettaPasto
- `29154` — inizializzaP2
- `29166` — deepClone
- `29170` — applicaPatch
- `29204` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
