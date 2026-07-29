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
Righe 2458-2500

- `2458` — _slugAlimento
- `2466` — _catalogoIndicizza
- `2470` — _catalogoDeindicizza
- `2477` — costruisciCatalogo
- `2500` — risolviAlimento

---

### MACROS PIANO — calcolo e badge macro reali vs target
Righe 2515-2778

- `2515` — getValoriCREA
- `2527` — getCurrentPaziente
- `2547` — getKcalWeekend
- `2604` — getMacrosRicettaComposta
- `2610` — calcolaMacrosPiano
- `2712` — renderBadgeMacrosReali
- `2611` — pctStr
- `2612` — color
- `2625` — row
- `2778` — renderBadgeMacrosReali_DOM

---

### ANALISI DEL SANGUE — parsing, indici clinici derivati, interpretazione
Righe 3063-3250

- `3063` — _parseAnalisiNum
- `3071` — calcolaIndice
- `3224` — interpretaAnalisi
- `3236` — _interpAnalisiHtml
- `3250` — mostraInfoRange

---

### CONCETTI EDUCATIVI — sync Supabase, migrazione
Righe 3393-3417

- `3393` — pushConcetiSupabase
- `3403` — pullConcetiSupabase
- `3417` — migraConcetti

---

### ALIMENTI — categorie funzionali/semaforo, chip UI, equivalenze porzioni
Righe 3607-3962

- `3607` — getCategoriaSemaforo
- `3624` — _getCategorieGruppo
- `3638` — calcolaGrammaturaEquivalente
- `3678` — _gruppoEquiv  (P121: gruppo di equivalenza + criterio per categoria funzionale)
- `3684` — _porzioneStandard  (P121: porzione `g` di database dell'alimento)
- `3699` — suggerisciGrEquivalente  (P121: firma a 3 argomenti, il gruppo si deduce dai due alimenti)
- `3725` — _etichettaCriterio  (P121: ≈carbo / ≈prot / ≈grassi / fissa / porzione)
- `3740` — _promptAlternativeGrassi  (P121: riga del prompt AI generata dal motore)
- `3756` — ricalcolaAlternative  (P121: MOTORE UNICO, unico punto che scrive la grammatura di un'alternativa)
- `3775` — ricalcolaAlternativePiano  (P121: applica il motore a tutte le celle di un piano)
- `3824` — arrotondaGrammatura  (P121: sostituisce arrotondaPorzioneDiscreta — pezzi interi senza tetto / 5g)
- `3834` — getCategoriaFunzionale
- `3874` — catArr
- `3890` — _tagComuniTrova
- `3894` — getTagComuniChip
- `3897` — setTagComuniChip
- `3905` — setCatChips
- `3918` — getStagioniChip
- `3921` — setStagioniChip
- `3928` — getProfiloChip
- `3931` — setProfiloChip
- `3940` — wireChipGroup
- `3951` — wireAttrChipGroups
- `3962` — wireRadioChipGroup

---

### CONFIG / STORAGE LOCALE — cfg, localStorage db, util data/valuta
Righe 3990-4369

- `3990` — getCfg
- `3991` — saveCfgL
- `3992` — getUrl
- `3993` — saveLocal
- `3994` — loadLocal
- `4005` — uid
- `4006` — today
- `4007` — addDays
- `4008` — fData
- `4009` — fEur
- `4011` — getLastSyncText
- `4021` — getSyncColor
- `4029` — aggiornaStatoSync
- `4055` — setSyncStatus
- `4323` — _registraTombstone
- `4331` — _tombstoneAttivi
- `4343` — _fondiTombstones
- `4357` — _mergeTombstonesRemoti *(dal 24/7 legge il meta da `collections`, P74 1d)*
- `4369` — _applicaTombstones
- `4230` — _pazFetchMeta *(P74 1d — solo `collections`)*
- `4251` — _collectionsUpsert *(P74 — scrittura primaria dei 4 meta-record dal cutover 1d)*
- `4273` — _collectionsFetch *(P74 1d — lettura unica dei meta-record)*
- `4296` — _analisiSangueUpsert *(P74 fase 2 — scrittura ombra analisi del sangue, 24/7)*

---

### SYNC SUPABASE — push/pull ricette/pazienti, tombstones, conflitti (P69)
Righe 4393-4778

- `4393` — supaHeaders
- `4407` — pushRicetteSupabase
- `4432` — pullRicetteSupabase
- `4454` — delRicetteSupabase
- `4466` — delPazienteSupabase
- `4481` — pushToSheets
- `4525` — pullFromSheets
- `4604` — syncNow
- `4617` — sincronizzaTutto
- `4360` — stpSet
- `4365` — stpMsg
- `4748` — testConnSupabase
- `4778` — _p68LogSaveAnonimo

---

### SYNC SUPABASE — save paziente, piani/cache piano, entrate, eventi
Righe 4792-5308

- `4792` — save
- `4810` — _pushRigaPerId
- `4843` — _flushDirtyIds
- `4926` — _p69LoadBaseline
- `4929` — _p69StoreBaseline
- `4932` — _p69SetBaseline
- `4936` — _p69DropBaseline
- `4940` — _p69SetBaselineFromRows
- `4946` — _p69NomePaz
- `4951` — _p69InList
- `4959` — _p69RilevaConflitti
- `4995` — _p69DialogoConflitti
- `4738` — chiudi
- `5029` — _p69RisolviRicarica
- `5058` — _p69EsportaLocali
- `5071` — _p69RisolviSovrascrivi
- `5084` — pushPianoSupabase
- `5106` — pullPianiSupabase
- `5122` — delPianoSupabase
- `5138` — delPianiPazienteSupabase
- `5150` — pushCachePianoSupabase
- `5167` — caricaCachePianoSupabase
- `5189` — pushEntrateSupabase
- `5213` — pullEntrateSupabase
- `5227` — delEntrataSupabase
- `5235` — pushEntrataSupabase
- `5246` — pushEventoSupabase
- `5259` — pushEventiSupabase
- `5283` — pullEventiSupabase
- `5297` — delEventoSupabase
- `5308` — _pianoCacheKey

---

### UI GENERALE — config AI key, notifiche, navigazione (goTo/tab/modali)
Righe 5339-5451

- `5339` — _salvaPianoCache
- `5344` — _caricaPianoCache
- `5350` — salvaCfg
- `5351` — testConn
- `5358` — testaAntKey
- `5369` — initAntCard
- `5372` — esporta
- `5373` — importa
- `5378` — goTo
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
Righe 5459-8225

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
- `5670` — editPaz
- `5748` — REGOLE_SEMAFORO_ALIMENTI *(15 condizioni cliniche → grigi/celesti; globale dal 26/7 per essere verificabile dal test)*
- `6195` — _SEM_COLORI_LEGACY / `6105` _SEM_COLORI_AUTO *(F9 — unico vocabolario dei colori automatici)*
- `6200` — NOMI_CONDIZIONE_SEMAFORO *(etichette delle 15 condizioni, usate anche dal riquadro della scheda)*
- `6222` — _semaforoCondizioniAttive *(le condizioni spuntate su un paziente)*
- `6233` — _semaforoMigraPaziente *(F9 — toglie i colori legacy e ricalcola; idempotente)*
- `6244` — _semaforoMigraTutti *(passata su tutti i pazienti in memoria, con conteggio)*
- `6255` — applicaRegoloSemaforo *(dal 26/7 pulisce TUTTI e sei i colori automatici, non solo i suoi due)*
- `6343` — trovaChiaveAlimento *(match esatto sul nome: se non trova, la regola è ignorata in silenzio — vedi test s2-regole-nomi-alimenti)*
- `6367` — _pazNumOPrec *(F7 — campo assente = valore precedente, non azzeramento)*
- `6379` — _pazPreservaCampi *(F5 — l'anagrafica non cancella i campi che il form non gestisce)*
- `6385` — salvaPaz
- `6461` — openPaz
- `7912` — renderPdRoutine
- `6723` — cardHTML
- `8054` — updateRoutineCampo
- `8062` — suggerisciPastoEQuando
- `8089` — filtroLibreria
- `8098` — renderLibreriaGrid
- `8119` — aggiungiDaLibreriaIdx
- `8143` — openModalRoutine
- `8150` — salvaRoutineVoce
- `8175` — salvaRoutine
- `8182` — mostraRoutinePopup
- `8210` — removeRoutineVoce
- `8225` — _renderAggiustamentiSection

---

### 📈 PERCORSO — timeline di periodizzazione (P115 Tappe 1-5 COMPLETE, 24 lug 2026)
Righe 6021-6621 (numeri ESATTI al 24/7 notte, dopo la Tappa 5). ⚠️ Questo blocco (~600 righe) fa slittare tutti i numeri delle sezioni SUCCESSIVE a riga ~6020 rispetto all'ultima rigenerazione completa: per quelle sezioni fare grep di conferma. Rigenerazione completa alla prossima modifica strutturale.

- `6506` — _PERCORSO_TIPI (const: tipi fase, colori, pct default)
- `6513` — _percorsoGet *(normalizza p.percorso, scarta fasi invalide)*
- `6535` — _percorsoIsoLocal *(data → YYYY-MM-DD LOCALE, mai toISOString/UTC)*
- `6541` — _percorsoIntervalli *(fasi consecutive → date concrete dal/al)*
- `6555` — _percorsoFaseAt *(fase attiva a una data; dal incluso, al escluso)*
- `6564` — _percorsoKcalFase *(pct → kcal indicative via calcolaTDEE)*
- `6587` — _percorsoProiezione *(Tappa 2 — proiezione ibrida teorica/calibrata, cono, obiettivo a intervallo)*
- `6645` — _percorsoDataBreve *(ISO → "12 set")*
- `6662` — _percorsoSerieEnergia *(Tappa 3 — serie introito/TDEE stimato/TDEE osservato per la corsia energia)*
- `6701` — _percorsoSerieMassaMagra *(Tappa 4 — solo InBody: punti {data,m,pg})*
- `6720` — _percorsoConsuntivo *(Tappa 5 — legge p.consuntivo scritto da P50: aderenza, extra kcal, ritardo=extra÷7700, settimane perse; oggi sempre ok:false)*
- `6762` — _PERCORSO_LAYERS_DEFAULT / _percorsoLayersState / _percorsoLayersGet *(Tappa 4 — stato interruttori, SOLO sessione, mai su p)*
- `6767` — percorsoLayerToggle *(Tappa 4 — inverte un solo strato)*
- `6773` — percorsoVistaPreset *(Tappa 4 — preset "tecnica"/"paziente")*
- `6789` — _percorsoPaz *(e a seguire i mutatori percorsoInit/SetInizio/AddFase/UpdFase/DelFase/MoveFase)*
- `6845` — _PERCORSO_MODELLI / _PERCORSO_GEN *(P122 T3 — 4 modelli + regole dei cicli)*
- `6863` — _percorsoGeneraFasi *(P122 T3 — pura: dal traguardo alle fasi, ritmo = quello della proiezione)*
- `6943` — _percorsoModelloSelectHtml
- `6952` — percorsoGeneraDaModello *(propone; conferma prima di sostituire fasi esistenti)*
- `6975` — _percorsoShiftGiorni *(pura: ancora = ultima pesata)*
- `6985` — percorsoRiallinea *(⏩ trasla il piano, riprende dal giorno-fase dell'interruzione)*
- `7012` — _TRG_TIPI / `6744` _TRG_COMPORTAMENTI *(P122 T4 — tipi di traguardo e libreria comportamenti)*
- `7034` — _traguardiGet · `6761` _traguardoValoreAttuale *(valore corrente dai dati esistenti, null se manca)*
- `7073` — _traguardoVerso *(auto: dedotto dalla partenza)* · `6803` _traguardoValuta · `6824` _traguardiValuta
- `7114` — traguardoAdd · `6852` traguardoUpd · `6867` traguardoDel · `6873` traguardoSegna
- `7172` — _COND_TIPI · `6897` _percorsoCondizione *(pura: la fase finisce per soglia — SOLO suggerimento)*
- `7188` — percorsoSetCondizione · `6927` percorsoChiudiFase *(esito fotografato, riapribile)*
- `7222` — _traguardiHtml *(blocco 🏁 in fondo alla scheda Percorso)*
- `7320` — _percorsoVistaPaz / `7049` _percorsoVistaPazAttiva *(P122 T5 — modalità di sessione)*
- `7327` — _percorsoVittorie *(pura: vittorie dall'inizio del percorso + flag ricomposizione)*
- `7365` — _percorsoNascondiPeso *(in fase di massa il peso non si mostra al paziente)*
- `7376` — _traguardoFaseCorrente *(traguardo della fase IN CORSO, non quello lontano)*
- `7404` — _traguardoTestoPaziente *(righe in italiano semplice, riusate dal messaggio WhatsApp)*
- `7437` — _vistaPazienteHtml *(i tre riquadri che guarda il paziente)*
- `7517` — _percorsoChartSvg *(due corsie: peso + massa magra + cono proiezione sopra, striscia aderenza in mezzo (solo con dati P50), energia (kcal) sotto — tutto gated dagli interruttori)*
- `7706` — renderPdPercorso *(scheda: badge fase, riga proiezione/obiettivo, riga Piano vs Realtà (solo con dati), toolbar interruttori, grafico, editor)*

*(Tappa 2 tocca anche `calcolaMacros`: box obiettivo con intervallo al posto della data secca.)*

---

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 8310-8481

- `8310` — salvaAggiustamento
- `8343` — eliminaAggiustamento
- `8352` — renderPdNote
- `8387` — salvaNotaClinica
- `8402` — deleteNota
- `8411` — saveNote
- `8431` — resetSemaforoAuto *(F9 — pulsante 🔄 Ricalcola: pulisce gli automatici e rifà col sistema valido; il motore LEGACY non esiste più)*
- `8481` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 8707-8905

- `8707` — avviaFX
- `8735` — avviaAnalisi
- `8752` — _renderFlussoPanel
- `8796` — _riepEsc
- `8800` — _riepNum
- `8806` — _riepDelta
- `8814` — _riepDataSig
- `8832` — _riepParseFX
- `8087` — clean
- `8846` — _riepAggiornaFX
- `8872` — _riepToggleDomandaDefault
- `8884` — _riepAddDomanda
- `8897` — _riepRemoveDomanda
- `8905` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 9117-9344

- `8218` — dCol
- `8336` — card
- `9117` — renderPdRagionamento
- `9205` — inviaMessaggioRag
- `9223` — concludiERiassumi
- `9237` — salvaRagionamento
- `9258` — apriGeneratoreDaRag
- `9266` — nuovaSessioneRag
- `9272` — cancellaSavedRag
- `9282` — renderPazTimeline
- `9314` — renderPdAnamnesi
- `9344` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 11243-12378

- `11243` — _anNorm *(P125 — testo confrontabile: minuscole, niente accenti)*
- `11249` — _anCorrisponde *(P125 — ricerca per parole-prefisso: "vit d" trova "Vitamina D")*
- `11255` — filtraAnalisi *(P125 — filtro dal vivo delle 119 voci)*
- `11289` — pulisciRicercaAnalisi
- `11295` — renderPdAnalisi
- `11351` — toggleAnalisiSection
- `11500` — loadAnalisiSanguePDF
- `11387` — _impPdfConfigurata
- `11388` — _impPdfLib
- `11398` — _impPdfApri
- `11411` — _impPdfPagina *(P124b — una pagina del PDF → immagine, con la rotazione RILEVATA, non quella dichiarata dal file)*
- `11432` — _impRuotaImmagine
- `11457` — _impRilevaRotazione *(P124b — chiamata piccola: di quanti gradi va girata la pagina)*
- `11476` — _impPromptPagina *(P124b — prompt di UNA pagina, con l'impronta della riga: valore+unità+riferimento)*
- `11675` — _impNormalizzaNumero *(P124 — numero all'italiana → punto decimale, conversione fatta dall'app e non dall'AI)*
- `11686` — _impNumeri
- `11694` — _impSembraIntervallo
- `11702` — _impUgualeAlRange
- `11711` — _impLimitiStd
- `11732` — _impFuoriScala
- `11741` — _impCorrezioneVirgola
- `11753` — _impTestoLimiti
- `11774` — _impRifPlausibile *(P124b — un "riferimento" che è un'unità di misura = riga disallineata)*
- `11787` — _impUnitaCanonica
- `11809` — _impStessaGrandezza *(P124b — stesso tipo di misura a meno del prefisso: nanomoli/micromoli/millimoli)*
- `11826` — _impUnitaCompatibili
- `11837` — _impControllaValore *(P124 — i controlli anti-errore su un valore estratto)*
- `11901` — mostraDiffAnalisi *(P124 — colonna Estratto modificabile + righe sospette deselezionate)*
- `12091` — _calcoloIncluso
- `12097` — toggleCalcoloIncluso
- `12119` — _renderCalcoliPannello
- `12160` — toggleGlossario
- `12165` — updateAnalisi
- `12224` — salvaAnalisi
- `12237` — applicaGruppoClinico
- `12266` — renderBoxGruppiCliniciSuggeriti
- `12298` — suggerisciGruppiClinici
- `12378` — renderMemoriaInbody

---
### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9176 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `9474` — _richVal
- `9481` — _richBmi
- `9486` — _richPat
- `9492` — _richNum
- `9537` — _richPreselezione
- `9553` — richLeggiIntestazione
- `9557` — richSalvaIntestazione
- `9566` — apriRichiestaAnalisi
- `9586` — _richModaleHtml
- `9662` — _richEsc
- `9664` — _richMotivoCambia
- `9670` — _richToggleSez
- `9676` — _richAggiornaConteggi
- `9684` — _richMotivoCorrente
- `9694` — _richSelezione
- `9709` — _richTxt
- `9715` — _richCostruisciPDF
- `8969` — nuovaPagina
- `8970` — spazio
- `9811` — _richNomeFile
- `9816` — _richPrepara
- `9829` — _richRegistra
- `9834` — _richStato
- `9836` — richScaricaPDF
- `9885` — _richUpload
- `9887` — _richWaUrl
- `9894` — _richTestoWa
- `9908` — richInviaWhatsApp
- `9948` — richCopiaLink
- `9969` — _richStoricoHtml

---
### REFERTI DEL SANGUE DATATI — storico nel tempo (P118 tappa 1)
Righe 9194-9387 — migrazione, ordinamento, quadro attuale derivato, barra di selezione.

- `11020` — _refertoNuovoId
- `11023` — _refertoOggi
- `11027` — _refertoDataIt
- `11033` — _refertoConteggio
- `11047` — _refertiMigra
- `11074` — _refertiOrdinati
- `11085` — _refertoPiuRecente
- `11090` — _refertoInVista
- `11108` — _refertiApplica
- `11121` — _refertoCrea
- `11140` — refertoCambiaVista
- `11146` — refertoCambiaData
- `11158` — refertoNuovo
- `11166` — refertoDuplica
- `11175` — refertoElimina
- `11190` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `10633` — _rangeNum
- `10639` — _rangeTestoDa
- `10658` — _rangeCoppia
- `10668` — _rangeHtml

---
### ANDAMENTO NEL TEMPO — tracciato, variazione, grafico grande (P118 tappa 3)
Righe 9441-9745 — serie storica, regola del colore, sparkline, pannello in fondo.

- `10710` — _andLimiti
- `10731` — _andParseRangeLab
- `10744` — _andDistanza
- `10751` — _andValutazione
- `10764` — _andSerie
- `10778` — _andNum
- `10782` — _andDataBreve
- `10787` — _andMeseAnno
- `10795` — _andDominio
- `10809` — _andColore
- `10822` — _andSparkHtml
- `10848` — _andRigaHtml
- `10870` — _andEsamiSeguibili
- `10878` — andScegliEsame
- `10884` — _andPannelloHtml
- `10937` — _andGraficoGrande
- `10988` — _andPasso

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 12426-13586

- `12426` — _ibFmtBreve
- `12435` — _renderPesiIntermediSection
- `12484` — aggiungiPesoIntermedio
- `12500` — eliminaPesoIntermedio
- `12510` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `13586` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 13877-13877

- `13877` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 14255-16796

- `14255` — aggiornaLabelMacros
- `14273` — calcolaMacros
- `14414` — applicaSchema
- `14449` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `14455` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `14477` — _misuraDaReferto *(P127 — UN referto letto con le regole del traguardo: usata anche dalla verifica al controllo)*
- `14510` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `14521` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `14539` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `14652` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `14666` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `14722` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `14736` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `14768` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `14801` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `14843` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `14851` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `14862` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `14889` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `14904` — _stradeVerso *(le strade complete + percentuale libera)*
- `14951` — _VC_TOLLERANZA_PCT / _VC_GIORNI_MIN / _VC_GIORNI_MIN_RITARO / _VC_COPERTURA_MIN_PCT / _VC_MAGRA_PRUDENZA_GG *(P127 — soglie cliniche della verifica)*
- `14961` — _mediaSlotPrescritta *(media pesata sui giorni di un campo dello storico target; la usa anche _kcalMediaPrescrittaOss)*
- `14981` — _vcDeficitSlot *(deficit di uno slot: campo offset o kcal−tdee per gli slot vecchi)*
- `14989` — _vcTratto *(P127 — cosa è cambiato fra due referti, previsto vs reale, TDEE misurato)*
- `15043` — _vcTraguardoSalvato *(traguardo ricostruito dal salvato, per la scheda Percorso)*
- `15053` — _verificaControllo *(P127 — motore puro: tratto recente, quadro dall'inizio, residuo al ritmo reale)*
- `15091` — _verificaControlloHtml *(blocco 🔎, unica fonte per pannello 🎯 e scheda Percorso; azioni solo dove c'è il campo kcal)*
- `15183` — _vcRitara *(scrive le kcal ritarate nel campo regime: propone, non salva)*
- `15196` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `15264` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `15286` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `15339` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `15446` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `15461` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `15486` — _renderRifPesoBox
- `15537` — _usaRifPeso
- `15541` — _aggiornaRifPesoTarget
- `15544` — _aggiornaRegimeSlider
- `16201` — _presetRegime
- `16205` — _initRegimeSliderDaPaziente
- `16223` — ricalcolaLAF
- `16357` — renderStoricoTDEE
- `16391` — attivaSlotTDEE
- `16399` — eliminaSlotTDEE
- `16412` — _toggleCiclizzazione
- `16418` — _aggiornaAnteprimaCiclizzazione
- `16436` — salvaCalcoloMacros
- `16550` — _metAllenamento
- `16566` — _neatFrazione
- `16640` — _larnLafStileVita
- `16657` — _regimeOffset
- `16667` — _componiRegimeText
- `16700` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `16712` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `16719` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `16796` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 16814-17244

- `16814` — renderTargetBadge
- `16843` — verificaRegola_75_20_5
- `16880` — renderBadge75_20_5
- `16945` — _validaNorm
- `16948` — _validaMatchTermine
- `16956` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `17007` — _validaTesto
- `17028` — validaPiano
- `17102` — _validaFirmaBlocchi
- `17109` — renderBadgeValidatore
- `17140` — _validaVaiAlGiorno
- `17149` — apriPannelloValidatore
- `13472` — esc
- `17206` — _validaEseguiOverride
- `17229` — validaGateExport
- `17244` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 17377-18009

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
- `17377` — pianoPazSelezionato
- `17524` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `17762` — renderPanelMacrosGiorno
- `17905` — pmgCambiaGrammi
- `17932` — riapriPiano
- `17970` — _montaPianoCorrente
- `18009` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 18019-18488

- `18019` — pullTemplateSupabase
- `18030` — delTemplateSupabase
- `18039` — _promptTemplateNome
- `18064` — _creaTemplateDaJSON
- `18087` — salvaComeTemplate
- `18098` — salvaComeTemplateDaPiano
- `18107` — _normNomeAlim
- `18108` — _escRegAlim
- `18109` — _raccogliAlimentiDaPiano
- `18120` — _alimentiEsclusiPaziente
- `18132` — _trovaConflittiTemplate
- `18150` — _mostraAvvisoConflitti
- `18174` — applicaTemplate
- `18192` — apriPickerTemplate
- `18220` — _pickPaziente
- `18239` — applicaTemplatePick
- `18243` — rinominaTemplate
- `18254` — eliminaTemplate
- `18264` — renderLibreriaTemplate
- `18293` — renderStoricoPiani
- `18352` — eliminaPiano
- `18368` — _getActiveMacrosTarget
- `18392` — getTargetAttivi
- `18429` — calcolaTargetsCiclizzazione
- `18455` — _setupPianoTargets
- `18479` — getStagioneCorrente
- `18488` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 18950-18950

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `18950` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 18959-19418

- `18959` — aggiornaUIcolazione
- `18969` — salvaRegolePiano
- `19030` — _isModelloSistema
- `19033` — _isModelloSistemaModificato
- `19045` — caricaModelliCustomLocal
- `19059` — salvaModelliCustomLocal
- `19080` — _migraRecordCustom
- `19095` — _syncAliasLegacy
- `19104` — caricaAlimentiCustom
- `19128` — pushAlimentiCustomSupabase
- `19138` — pullAlimentiCustomSupabase
- `19152` — pushModelliSupabase
- `19170` — pullModelliSupabase
- `19195` — _calcolaFreqDaModello
- `19214` — aggiornaUImodello
- `19303` — popolaDropdownModelli
- `19331` — cambiaModelloRotazione
- `19337` — ripristinaModelloOriginale
- `19360` — eliminaModelloCustom
- `19378` — mostraAnteprimaModello
- `19388` — apriEditorModello
- `19418` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 19687-19925

- `15738` — rerender
- `19687` — _salvaModelloDaEditor
- `19729` — caricaRegolePiano
- `19759` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `19794` — _aiLogUsage
- `19816` — _aiProxyUrl
- `19822` — _aiTokenPerProxy
- `19851` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `19925` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 20004-20144

- `16216` — _risolviCollisioniCelle
- `20004` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `20064` — getFruttaStile
- `20071` — _fruttaGetPasto
- `20081` — _fruttaContaRigheRicetta
- `20085` — _fruttaIndiceBasePasto
- `20105` — getFruttaMarker
- `20118` — fruttaMarkerHtml
- `20126` — _fruttaCheckboxHtml
- `20135` — toggleFrutta
- `20144` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 20180-21454

- `20180` — _renderCelleGriglia
- `20260` — _renderRicetteTestuali
- `20299` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `20370` — _renderCelleHtml
- `20378` — toggleCellaMenu
- `20397` — closeAllCellaMenus
- `20405` — _trovaPasto
- `20413` — cellaSposta
- `20467` — cellaCancella
- `20488` — apriEditGrammatura
- `16789` — salva
- `20536` — cellaSwap
- `20556` — cellaRimuoviAlt
- `20570` — cellaAggiungiAlt
- `20673` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `20758` — apriEditRicetta
- `20767` — aggiungiRicetta
- `20783` — rimuoviRicetta
- `20792` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `20954` — ngAggiungiSpuntinoVuoto
- `20970` — apriAggiungiCella
- `17254` — risolviCompatibili
- `21066` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `21158` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `21299` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `21454` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 21502-21894

- `21502` — _attesoStrutturaPiano
- `21522` — _confrontaStrutturaPiano
- `21552` — _costruisciPromptDelta
- `21579` — _pianoToolSchema
- `21654` — _pianoMaxTokens
- `21663` — _estraiPianoDaRisposta
- `21685` — chiamaGeneraPiano
- `21852` — mostraLoadingSteps
- `18123` — render
- `21894` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 21961-22538

- `21961` — generaMessaggioAI
- `22066` — copiaMessaggioAI
- `22076` — salvaInStorico
- `22088` — salvaVarianteAI
- `22103` — renderVariantiSalvate
- `22122` — usaVariante
- `22140` — eliminaVariante
- `22151` — renderStoricoMsg
- `22167` — apriWhatsApp
- `22538` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 22716-24213

- `22716` — _ngColoreSemaforoNome
- `22724` — apriSceltaModalitaPiano
- `22759` — _ngChiudiModalita
- `22762` — _ngCostruisciGiornoVuoto
- `22795` — _ngCostruisciGiornoSpeciale
- `22806` — _ngIndiceInizioSpeciali
- `22817` — _ngModalitaNomeGiorno
- `22823` — _ngImpostaModalitaNomeGiorno
- `22826` — _ngLettera
- `22833` — _ngEtichettaGiorno
- `22853` — _ngEtichettaGiornoBreve
- `22867` — _ngToggleGiornoSpeciale
- `22891` — _ngRenderPannelloSpeciale
- `22959` — _generaGiornoSpecialeAI
- `23059` — _ngGiornoHaContenuto
- `23071` — _ngCreaPianoManuale
- `23094` — _ngScrollTabGiorni
- `23104` — _ngAbilitaDragScroll
- `23141` — _ngCambiaNumeroGiorni
- `23173` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `23187` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `23228` — _ngToggleCat
- `23237` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `23261` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `23417` — _ngSalvaPianoManuale
- `23443` — _ngParseIngrediente
- `23467` — _ngScomponiIngredienti
- `23479` — _ricCalcolaMacroDaIngredienti
- `23497` — _ricRicalcolaMacroLive
- `23504` — _ricAggiornaInfoMacro
- `23518` — _ricRicalcolaMacroLiveNow
- `23542` — _ngTrovaCategoriaAlimento
- `23575` — _ngPescaRicetta
- `23618` — _ngScomponiRicettaNelPasto
- `23655` — _ngDragStart
- `23666` — _ngDragStartCella
- `23677` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `23684` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `23689` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `23708` — _ngAggiungiAlimento
- `23733` — _ngRimuoviAlimento
- `23747` — _ngDopoModifica
- `23765` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `23818` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `23847` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `23864` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `23872` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `23944` — gramTestoCasalingo
- `23970` — _appendToggleNutrizionali
- `24013` — _appendTogglePromemoria
- `24042` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `24188` — cpFromEmoji
- `24194` — getEmojiCp
- `24213` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `22188` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `22210` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `22215` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `22241` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `22329` — _spesaTestoWhatsApp
- `22345` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `22390` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `22413` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `22441` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `22501` — scaricaListaSpesaPDF (download diretto, un click)
- `22509` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `22521` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 25361-25361

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
- `25361` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 25373-25580

- `25373` — salvaInbody
- `25438` — delInbody
- `25445` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `25580` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 25608-26077

- `25608` — buildSemLegenda
- `25622` — renderAlEditor
- `25683` — _alimNomeRegex
- `25691` — _alimGiorniDaPiano
- `25699` — _scanGiorniPerNome
- `25714` — scanRiferimentiAlimento
- `25743` — _alimRefsRighe
- `25749` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `25837` — modificaAlimentoCustom
- `25857` — ripristinaValoriPrecedentiAlimento
- `25869` — _resetAlimModal
- `25880` — apriNuovoAlimentoCustom
- `25886` — salvaAlimentoCustom
- `25953` — eliminaAlimentoCustom
- `25984` — _alimFonteBadge
- `25989` — renderAlimentiPage
- `22217` — E
- `26059` — archiviaAlimentoCustom
- `26077` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 26104-26341

- `26104` — _bcSetStatus
- `26106` — apriScannerBarcode
- `26114` — chiudiScannerBarcode
- `26119` — _bcStopCamera
- `26127` — _bcModaleAperto
- `26129` — _bcAvviaCamera
- `26140` — _bcAvviaNativo
- `26160` — _bcAvviaZXing
- `26169` — _bcZXStart
- `26180` — _bcErroreCamera
- `26188` — cercaBarcodeManuale
- `26194` — _barcodeTrovato
- `26210` — cercaBarcodeOFF
- `26228` — _bcProdottoNonTrovato
- `26242` — _bcPrecompilaForm
- `22477` — num
- `26266` — togAl
- `26319` — selCatAl
- `25402` — selTuttiAl
- `26341` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 26355-26671

- `26355` — setCalView
- `26356` — calPrev
- `26357` — calNext
- `26358` — calToday
- `26360` — renderCal
- `26374` — renderCalMonth
- `26398` — renderCalWeek
- `26416` — renderCalDay
- `26432` — selGiorno
- `26446` — setDisp
- `26451` — openAddEvento
- `26464` — openAddEventoPaz
- `26470` — toggleEntrataCheck
- `26475` — salvaEvento
- `26498` — openEvDetail
- `26553` — delEvento
- `26561` — copyMsg
- `26568` — aggDateCal
- `26573` — syncInizio
- `26574` — syncControllo
- `26575` — aggiornaPrev
- `26592` — renderRic
- `26619` — openNuovaRic
- `26620` — editRic
- `26630` — salvaRic
- `26655` — delRic
- `26671` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 26756-26816

- `26756` — aggiungiEntrataPerPaziente
- `26773` — openNuovaEntrata
- `26787` — salvaEntrata
- `26808` — delEntrata
- `26816` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 26846-27316

- `26846` — aiSuggerisciRicetta
- `26891` — renderConcettiModal
- `26910` — apriConcettiModal
- `26937` — salvaConcettiAllegati
- `26961` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `26999` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `27008` — loadInbodyPDF
- `27126` — _vitdLabel
- `27130` — getIntegratori
- `27134` — getIntegraWant
- `27138` — setIntegratori
- `27155` — setIntegraWant
- `27193` — getPatologieChip
- `27194` — getAllergieChip
- `27195` — setPatologieChip
- `27196` — setAllergieChip
- `27197` — getPatologie
- `27198` — getAllergie
- `27199` — setPatologieFromStr
- `27206` — setAllergieFromStr
- `27219` — getSdvChip
- `27220` — getCspChip
- `27221` — setSdvChip
- `27222` — setCspChip
- `27223` — setSdvFromStr
- `27224` — setCspFromStr
- `27228` — getBudget
- `27229` — setBudget
- `27234` — renderCalAnno
- `27265` — comprimeImmagine
- `27287` — uploadImmagineConcetto
- `27306` — rimuoviImmagineConcetto
- `27316` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 27382-27486

- `27382` — entraSelConcetti
- `27383` — annullaSelConcetti
- `27384` — toggleConcettoSel
- `27389` — eliminaConcettiSelezionati
- `27408` — confermaEliminaConcetti
- `27423` — aiRiscriviConcetto
- `27437` — editConcetto
- `27455` — salvaConcetto
- `27466` — openNuovoConcetto
- `27486` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 27487-27650

- `27487` — saveAgendaPersonale
- `27488` — getAgendaTodo
- `27489` — saveAgendaTodo
- `27491` — pulisciAgendaVecchia
- `27495` — navigaAgenda
- `27504` — toggleFormAgenda
- `27505` — toggleFormTodo
- `27507` — salvaAgendaItem
- `27521` — salvaTodoItem
- `27533` — toggleAgendaFatto
- `27541` — toggleTodoFatto
- `27554` — _catCol
- `27556` — renderAgendaDx
- `27650` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 27776-27980

- `27776` — renderScadenzeAlert
- `27961` — segnaGestito
- `27980` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 27989-28064

- `27989` — ripristinaPaz
- `27997` — eliminaPaz
- `28042` — getDove
- `28046` — setDove
- `28064` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 28069-28509

- `28069` — getCredenzialiPersistenti
- `28082` — cancellaCredenzialiPersistenti
- `28087` — rinnovaSessioneConRefreshToken
- `28104` — getSessioneSalvata
- `28123` — salvaSessione
- `28133` — cancellaSessione
- `28137` — eseguiLogin
- `28184` — eseguiLogout
- `28206` — mostraApp
- `28211` — verificaSessioneEAvvia
- `28239` — assicuraTokenValido
- `28268` — _garantiscoSessionePerSync
- `28280` — avviaRinnovoTokenPeriodico
- `28284` — fermaRinnovoTokenPeriodico
- `28293` — _authReset
- `28298` — _authMostra
- `28301` — mostraLogin
- `28302` — mostraRegistrazione
- `28303` — mostraRecupero
- `28304` — mostraNuovaPassword
- `28307` — eseguiRegistrazione
- `28345` — eseguiRecuperoPassword
- `28374` — eseguiNuovaPassword
- `28408` — _parseHashParams
- `28415` — _pulisciHash
- `28419` — gestisciRitornoAuth
- `28509` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 28581-28704

- `28581` — apriPannelloRicette
- `28610` — chiudiPannelloRicette
- `28618` — applicaRicettaPasto
- `28654` — inizializzaP2
- `28666` — deepClone
- `28670` — applicaPatch
- `28704` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
