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
Righe 3948-4328

- `3948` — getCfg
- `3949` — saveCfgL
- `3950` — getUrl
- `3951` — saveLocal
- `3952` — loadLocal
- `3964` — uid
- `3965` — today
- `3966` — addDays
- `3967` — fData
- `3968` — fEur
- `3970` — getLastSyncText
- `3980` — getSyncColor
- `3987` — aggiornaStatoSync
- `4013` — setSyncStatus
- `4282` — _registraTombstone
- `4290` — _tombstoneAttivi
- `4302` — _fondiTombstones
- `4316` — _mergeTombstonesRemoti *(dal 24/7 legge il meta da `collections`, P74 1d)*
- `4328` — _applicaTombstones
- `4189` — _pazFetchMeta *(P74 1d — solo `collections`)*
- `4210` — _collectionsUpsert *(P74 — scrittura primaria dei 4 meta-record dal cutover 1d)*
- `4232` — _collectionsFetch *(P74 1d — lettura unica dei meta-record)*
- `4255` — _analisiSangueUpsert *(P74 fase 2 — scrittura ombra analisi del sangue, 24/7)*

---

### SYNC SUPABASE — push/pull ricette/pazienti, tombstones, conflitti (P69)
Righe 4352-4737

- `4352` — supaHeaders
- `4366` — pushRicetteSupabase
- `4391` — pullRicetteSupabase
- `4413` — delRicetteSupabase
- `4425` — delPazienteSupabase
- `4440` — pushToSheets
- `4484` — pullFromSheets
- `4563` — syncNow
- `4576` — sincronizzaTutto
- `4360` — stpSet
- `4365` — stpMsg
- `4707` — testConnSupabase
- `4737` — _p68LogSaveAnonimo

---

### SYNC SUPABASE — save paziente, piani/cache piano, entrate, eventi
Righe 4751-5273

- `4751` — save
- `4769` — _pushRigaPerId
- `4802` — _flushDirtyIds
- `4885` — _p69LoadBaseline
- `4888` — _p69StoreBaseline
- `4891` — _p69SetBaseline
- `4895` — _p69DropBaseline
- `4899` — _p69SetBaselineFromRows
- `4905` — _p69NomePaz
- `4910` — _p69InList
- `4918` — _p69RilevaConflitti
- `4954` — _p69DialogoConflitti
- `4738` — chiudi
- `4988` — _p69RisolviRicarica
- `5017` — _p69EsportaLocali
- `5030` — _p69RisolviSovrascrivi
- `5043` — pushPianoSupabase
- `5065` — pullPianiSupabase
- `5081` — delPianoSupabase
- `5097` — delPianiPazienteSupabase
- `5109` — pushCachePianoSupabase
- `5126` — caricaCachePianoSupabase
- `5148` — pushEntrateSupabase
- `5172` — pullEntrateSupabase
- `5186` — delEntrataSupabase
- `5194` — pushEntrataSupabase
- `5205` — pushEventoSupabase
- `5218` — pushEventiSupabase
- `5242` — pullEventiSupabase
- `5262` — delEventoSupabase
- `5273` — _pianoCacheKey

---

### UI GENERALE — config AI key, notifiche, navigazione (goTo/tab/modali)
Righe 5304-5415

- `5304` — _salvaPianoCache
- `5309` — _caricaPianoCache
- `5315` — salvaCfg
- `5316` — testConn
- `5323` — testaAntKey
- `5334` — initAntCard
- `5337` — esporta
- `5338` — importa
- `5343` — goTo
- `5359` — closeM
- `5367` — ngChiudiModale
- `5376` — ngChiudiPopupCoppia
- `5380` — ngAggiungiX
- `5391` — ngUpgradeModali
- `5411` — mTab
- `5412` — aggiornaEta
- `5413` — toggleOrarioNote
- `5414` — pdTab
- `5415` — notif

---

### PAZIENTI — registro: lista/card/kanban, apertura, editing, salvataggio, routine
Righe 5423-8220

- `5423` — getPazView
- `5424` — setPazView
- `5433` — _pazStatoPiano
- `5441` — _pazUrgenzaControllo
- `5448` — _pazStatoTagHtml
- `5457` — _pazAggiornaFiltroRegimi
- `5465` — renderPaz
- `5518` — _renderPazCard
- `5543` — _renderPazLista
- `5570` — _renderPazKanban
- `5608` — openNuovoPaz
- `5635` — editPaz
- `5715` — REGOLE_SEMAFORO_ALIMENTI *(15 condizioni cliniche → grigi/celesti; globale dal 26/7 per essere verificabile dal test)*
- `6162` — _SEM_COLORI_LEGACY / `6105` _SEM_COLORI_AUTO *(F9 — unico vocabolario dei colori automatici)*
- `6167` — NOMI_CONDIZIONE_SEMAFORO *(etichette delle 15 condizioni, usate anche dal riquadro della scheda)*
- `6189` — _semaforoCondizioniAttive *(le condizioni spuntate su un paziente)*
- `6200` — _semaforoMigraPaziente *(F9 — toglie i colori legacy e ricalcola; idempotente)*
- `6211` — _semaforoMigraTutti *(passata su tutti i pazienti in memoria, con conteggio)*
- `6222` — applicaRegoloSemaforo *(dal 26/7 pulisce TUTTI e sei i colori automatici, non solo i suoi due)*
- `6310` — trovaChiaveAlimento *(match esatto sul nome: se non trova, la regola è ignorata in silenzio — vedi test s2-regole-nomi-alimenti)*
- `6334` — _pazNumOPrec *(F7 — campo assente = valore precedente, non azzeramento)*
- `6346` — _pazPreservaCampi *(F5 — l'anagrafica non cancella i campi che il form non gestisce)*
- `6352` — salvaPaz
- `6456` — openPaz
- `7907` — renderPdRoutine
- `6723` — cardHTML
- `8049` — updateRoutineCampo
- `8057` — suggerisciPastoEQuando
- `8084` — filtroLibreria
- `8093` — renderLibreriaGrid
- `8114` — aggiungiDaLibreriaIdx
- `8138` — openModalRoutine
- `8145` — salvaRoutineVoce
- `8170` — salvaRoutine
- `8177` — mostraRoutinePopup
- `8205` — removeRoutineVoce
- `8220` — _renderAggiustamentiSection

---

### 📈 PERCORSO — timeline di periodizzazione (P115 Tappe 1-5 COMPLETE, 24 lug 2026)
Righe 6021-6621 (numeri ESATTI al 24/7 notte, dopo la Tappa 5). ⚠️ Questo blocco (~600 righe) fa slittare tutti i numeri delle sezioni SUCCESSIVE a riga ~6020 rispetto all'ultima rigenerazione completa: per quelle sezioni fare grep di conferma. Rigenerazione completa alla prossima modifica strutturale.

- `6501` — _PERCORSO_TIPI (const: tipi fase, colori, pct default)
- `6508` — _percorsoGet *(normalizza p.percorso, scarta fasi invalide)*
- `6530` — _percorsoIsoLocal *(data → YYYY-MM-DD LOCALE, mai toISOString/UTC)*
- `6536` — _percorsoIntervalli *(fasi consecutive → date concrete dal/al)*
- `6550` — _percorsoFaseAt *(fase attiva a una data; dal incluso, al escluso)*
- `6559` — _percorsoKcalFase *(pct → kcal indicative via calcolaTDEE)*
- `6582` — _percorsoProiezione *(Tappa 2 — proiezione ibrida teorica/calibrata, cono, obiettivo a intervallo)*
- `6640` — _percorsoDataBreve *(ISO → "12 set")*
- `6657` — _percorsoSerieEnergia *(Tappa 3 — serie introito/TDEE stimato/TDEE osservato per la corsia energia)*
- `6696` — _percorsoSerieMassaMagra *(Tappa 4 — solo InBody: punti {data,m,pg})*
- `6715` — _percorsoConsuntivo *(Tappa 5 — legge p.consuntivo scritto da P50: aderenza, extra kcal, ritardo=extra÷7700, settimane perse; oggi sempre ok:false)*
- `6757` — _PERCORSO_LAYERS_DEFAULT / _percorsoLayersState / _percorsoLayersGet *(Tappa 4 — stato interruttori, SOLO sessione, mai su p)*
- `6762` — percorsoLayerToggle *(Tappa 4 — inverte un solo strato)*
- `6768` — percorsoVistaPreset *(Tappa 4 — preset "tecnica"/"paziente")*
- `6784` — _percorsoPaz *(e a seguire i mutatori percorsoInit/SetInizio/AddFase/UpdFase/DelFase/MoveFase)*
- `6840` — _PERCORSO_MODELLI / _PERCORSO_GEN *(P122 T3 — 4 modelli + regole dei cicli)*
- `6858` — _percorsoGeneraFasi *(P122 T3 — pura: dal traguardo alle fasi, ritmo = quello della proiezione)*
- `6938` — _percorsoModelloSelectHtml
- `6947` — percorsoGeneraDaModello *(propone; conferma prima di sostituire fasi esistenti)*
- `6970` — _percorsoShiftGiorni *(pura: ancora = ultima pesata)*
- `6980` — percorsoRiallinea *(⏩ trasla il piano, riprende dal giorno-fase dell'interruzione)*
- `7007` — _TRG_TIPI / `6744` _TRG_COMPORTAMENTI *(P122 T4 — tipi di traguardo e libreria comportamenti)*
- `7029` — _traguardiGet · `6761` _traguardoValoreAttuale *(valore corrente dai dati esistenti, null se manca)*
- `7068` — _traguardoVerso *(auto: dedotto dalla partenza)* · `6803` _traguardoValuta · `6824` _traguardiValuta
- `7109` — traguardoAdd · `6852` traguardoUpd · `6867` traguardoDel · `6873` traguardoSegna
- `7167` — _COND_TIPI · `6897` _percorsoCondizione *(pura: la fase finisce per soglia — SOLO suggerimento)*
- `7183` — percorsoSetCondizione · `6927` percorsoChiudiFase *(esito fotografato, riapribile)*
- `7217` — _traguardiHtml *(blocco 🏁 in fondo alla scheda Percorso)*
- `7315` — _percorsoVistaPaz / `7049` _percorsoVistaPazAttiva *(P122 T5 — modalità di sessione)*
- `7322` — _percorsoVittorie *(pura: vittorie dall'inizio del percorso + flag ricomposizione)*
- `7360` — _percorsoNascondiPeso *(in fase di massa il peso non si mostra al paziente)*
- `7371` — _traguardoFaseCorrente *(traguardo della fase IN CORSO, non quello lontano)*
- `7399` — _traguardoTestoPaziente *(righe in italiano semplice, riusate dal messaggio WhatsApp)*
- `7432` — _vistaPazienteHtml *(i tre riquadri che guarda il paziente)*
- `7512` — _percorsoChartSvg *(due corsie: peso + massa magra + cono proiezione sopra, striscia aderenza in mezzo (solo con dati P50), energia (kcal) sotto — tutto gated dagli interruttori)*
- `7701` — renderPdPercorso *(scheda: badge fase, riga proiezione/obiettivo, riga Piano vs Realtà (solo con dati), toolbar interruttori, grafico, editor)*

*(Tappa 2 tocca anche `calcolaMacros`: box obiettivo con intervallo al posto della data secca.)*

---

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 8305-8476

- `8305` — salvaAggiustamento
- `8338` — eliminaAggiustamento
- `8347` — renderPdNote
- `8382` — salvaNotaClinica
- `8397` — deleteNota
- `8406` — saveNote
- `8426` — resetSemaforoAuto *(F9 — pulsante 🔄 Ricalcola: pulisce gli automatici e rifà col sistema valido; il motore LEGACY non esiste più)*
- `8476` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 8702-8900

- `8702` — avviaFX
- `8730` — avviaAnalisi
- `8747` — _renderFlussoPanel
- `8791` — _riepEsc
- `8795` — _riepNum
- `8801` — _riepDelta
- `8809` — _riepDataSig
- `8827` — _riepParseFX
- `8087` — clean
- `8841` — _riepAggiornaFX
- `8867` — _riepToggleDomandaDefault
- `8879` — _riepAddDomanda
- `8892` — _riepRemoveDomanda
- `8900` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 9112-9344

- `8218` — dCol
- `8336` — card
- `9112` — renderPdRagionamento
- `9200` — inviaMessaggioRag
- `9218` — concludiERiassumi
- `9232` — salvaRagionamento
- `9253` — apriGeneratoreDaRag
- `9261` — nuovaSessioneRag
- `9267` — cancellaSavedRag
- `9277` — renderPazTimeline
- `9314` — renderPdAnamnesi
- `9344` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 11292-12427

- `11292` — _anNorm *(P125 — testo confrontabile: minuscole, niente accenti)*
- `11298` — _anCorrisponde *(P125 — ricerca per parole-prefisso: "vit d" trova "Vitamina D")*
- `11304` — filtraAnalisi *(P125 — filtro dal vivo delle 119 voci)*
- `11338` — pulisciRicercaAnalisi
- `11344` — renderPdAnalisi
- `11400` — toggleAnalisiSection
- `11549` — loadAnalisiSanguePDF
- `11436` — _impPdfConfigurata
- `11437` — _impPdfLib
- `11447` — _impPdfApri
- `11460` — _impPdfPagina *(P124b — una pagina del PDF → immagine, con la rotazione RILEVATA, non quella dichiarata dal file)*
- `11481` — _impRuotaImmagine
- `11506` — _impRilevaRotazione *(P124b — chiamata piccola: di quanti gradi va girata la pagina)*
- `11525` — _impPromptPagina *(P124b — prompt di UNA pagina, con l'impronta della riga: valore+unità+riferimento)*
- `11724` — _impNormalizzaNumero *(P124 — numero all'italiana → punto decimale, conversione fatta dall'app e non dall'AI)*
- `11735` — _impNumeri
- `11743` — _impSembraIntervallo
- `11751` — _impUgualeAlRange
- `11760` — _impLimitiStd
- `11781` — _impFuoriScala
- `11790` — _impCorrezioneVirgola
- `11802` — _impTestoLimiti
- `11823` — _impRifPlausibile *(P124b — un "riferimento" che è un'unità di misura = riga disallineata)*
- `11836` — _impUnitaCanonica
- `11858` — _impStessaGrandezza *(P124b — stesso tipo di misura a meno del prefisso: nanomoli/micromoli/millimoli)*
- `11875` — _impUnitaCompatibili
- `11886` — _impControllaValore *(P124 — i controlli anti-errore su un valore estratto)*
- `11950` — mostraDiffAnalisi *(P124 — colonna Estratto modificabile + righe sospette deselezionate)*
- `12140` — _calcoloIncluso
- `12146` — toggleCalcoloIncluso
- `12168` — _renderCalcoliPannello
- `12209` — toggleGlossario
- `12214` — updateAnalisi
- `12273` — salvaAnalisi
- `12286` — applicaGruppoClinico
- `12315` — renderBoxGruppiCliniciSuggeriti
- `12347` — suggerisciGruppiClinici
- `12427` — renderMemoriaInbody

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

- `11069` — _refertoNuovoId
- `11072` — _refertoOggi
- `11076` — _refertoDataIt
- `11082` — _refertoConteggio
- `11096` — _refertiMigra
- `11123` — _refertiOrdinati
- `11134` — _refertoPiuRecente
- `11139` — _refertoInVista
- `11157` — _refertiApplica
- `11170` — _refertoCrea
- `11189` — refertoCambiaVista
- `11195` — refertoCambiaData
- `11207` — refertoNuovo
- `11215` — refertoDuplica
- `11224` — refertoElimina
- `11239` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `10682` — _rangeNum
- `10688` — _rangeTestoDa
- `10707` — _rangeCoppia
- `10717` — _rangeHtml

---
### ANDAMENTO NEL TEMPO — tracciato, variazione, grafico grande (P118 tappa 3)
Righe 9441-9745 — serie storica, regola del colore, sparkline, pannello in fondo.

- `10759` — _andLimiti
- `10780` — _andParseRangeLab
- `10793` — _andDistanza
- `10800` — _andValutazione
- `10813` — _andSerie
- `10827` — _andNum
- `10831` — _andDataBreve
- `10836` — _andMeseAnno
- `10844` — _andDominio
- `10858` — _andColore
- `10871` — _andSparkHtml
- `10897` — _andRigaHtml
- `10919` — _andEsamiSeguibili
- `10927` — andScegliEsame
- `10933` — _andPannelloHtml
- `10986` — _andGraficoGrande
- `11037` — _andPasso

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 12477-13798

- `12477` — _ibFmtBreve
- `12486` — _renderPesiIntermediSection
- `12535` — aggiungiPesoIntermedio
- `12551` — eliminaPesoIntermedio
- `12561` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `13798` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 14106-14106

- `14106` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 14484-17025

- `14484` — aggiornaLabelMacros
- `14502` — calcolaMacros
- `14643` — applicaSchema
- `14678` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `14684` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `14706` — _misuraDaReferto *(P127 — UN referto letto con le regole del traguardo: usata anche dalla verifica al controllo)*
- `14739` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `14750` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `14768` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `14881` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `14895` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `14951` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `14965` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `14997` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `15030` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `15072` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `15080` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `15091` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `15118` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `15133` — _stradeVerso *(le strade complete + percentuale libera)*
- `15180` — _VC_TOLLERANZA_PCT / _VC_GIORNI_MIN / _VC_GIORNI_MIN_RITARO / _VC_COPERTURA_MIN_PCT / _VC_MAGRA_PRUDENZA_GG *(P127 — soglie cliniche della verifica)*
- `15190` — _mediaSlotPrescritta *(media pesata sui giorni di un campo dello storico target; la usa anche _kcalMediaPrescrittaOss)*
- `15210` — _vcDeficitSlot *(deficit di uno slot: campo offset o kcal−tdee per gli slot vecchi)*
- `15218` — _vcTratto *(P127 — cosa è cambiato fra due referti, previsto vs reale, TDEE misurato)*
- `15272` — _vcTraguardoSalvato *(traguardo ricostruito dal salvato, per la scheda Percorso)*
- `15282` — _verificaControllo *(P127 — motore puro: tratto recente, quadro dall'inizio, residuo al ritmo reale)*
- `15320` — _verificaControlloHtml *(blocco 🔎, unica fonte per pannello 🎯 e scheda Percorso; azioni solo dove c'è il campo kcal)*
- `15412` — _vcRitara *(scrive le kcal ritarate nel campo regime: propone, non salva)*
- `15425` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `15493` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `15515` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `15568` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `15675` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `15690` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `15715` — _renderRifPesoBox
- `15766` — _usaRifPeso
- `15770` — _aggiornaRifPesoTarget
- `15773` — _aggiornaRegimeSlider
- `16430` — _presetRegime
- `16434` — _initRegimeSliderDaPaziente
- `16452` — ricalcolaLAF
- `16586` — renderStoricoTDEE
- `16620` — attivaSlotTDEE
- `16628` — eliminaSlotTDEE
- `16641` — _toggleCiclizzazione
- `16647` — _aggiornaAnteprimaCiclizzazione
- `16665` — salvaCalcoloMacros
- `16779` — _metAllenamento
- `16795` — _neatFrazione
- `16869` — _larnLafStileVita
- `16886` — _regimeOffset
- `16896` — _componiRegimeText
- `16929` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `16941` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `16948` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `17025` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 17043-17473

- `17043` — renderTargetBadge
- `17072` — verificaRegola_75_20_5
- `17109` — renderBadge75_20_5
- `17174` — _validaNorm
- `17177` — _validaMatchTermine
- `17185` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `17236` — _validaTesto
- `17257` — validaPiano
- `17331` — _validaFirmaBlocchi
- `17338` — renderBadgeValidatore
- `17369` — _validaVaiAlGiorno
- `17378` — apriPannelloValidatore
- `13472` — esc
- `17435` — _validaEseguiOverride
- `17458` — validaGateExport
- `17473` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 17606-18238

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
- `17606` — pianoPazSelezionato
- `17753` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `17991` — renderPanelMacrosGiorno
- `18134` — pmgCambiaGrammi
- `18161` — riapriPiano
- `18199` — _montaPianoCorrente
- `18238` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 18248-18717

- `18248` — pullTemplateSupabase
- `18259` — delTemplateSupabase
- `18268` — _promptTemplateNome
- `18293` — _creaTemplateDaJSON
- `18316` — salvaComeTemplate
- `18327` — salvaComeTemplateDaPiano
- `18336` — _normNomeAlim
- `18337` — _escRegAlim
- `18338` — _raccogliAlimentiDaPiano
- `18349` — _alimentiEsclusiPaziente
- `18361` — _trovaConflittiTemplate
- `18379` — _mostraAvvisoConflitti
- `18403` — applicaTemplate
- `18421` — apriPickerTemplate
- `18449` — _pickPaziente
- `18468` — applicaTemplatePick
- `18472` — rinominaTemplate
- `18483` — eliminaTemplate
- `18493` — renderLibreriaTemplate
- `18522` — renderStoricoPiani
- `18581` — eliminaPiano
- `18597` — _getActiveMacrosTarget
- `18621` — getTargetAttivi
- `18658` — calcolaTargetsCiclizzazione
- `18684` — _setupPianoTargets
- `18708` — getStagioneCorrente
- `18717` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 19179-19179

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `19179` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 19188-19647

- `19188` — aggiornaUIcolazione
- `19198` — salvaRegolePiano
- `19259` — _isModelloSistema
- `19262` — _isModelloSistemaModificato
- `19274` — caricaModelliCustomLocal
- `19288` — salvaModelliCustomLocal
- `19309` — _migraRecordCustom
- `19324` — _syncAliasLegacy
- `19333` — caricaAlimentiCustom
- `19357` — pushAlimentiCustomSupabase
- `19367` — pullAlimentiCustomSupabase
- `19381` — pushModelliSupabase
- `19399` — pullModelliSupabase
- `19424` — _calcolaFreqDaModello
- `19443` — aggiornaUImodello
- `19532` — popolaDropdownModelli
- `19560` — cambiaModelloRotazione
- `19566` — ripristinaModelloOriginale
- `19589` — eliminaModelloCustom
- `19607` — mostraAnteprimaModello
- `19617` — apriEditorModello
- `19647` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 19916-20154

- `15738` — rerender
- `19916` — _salvaModelloDaEditor
- `19958` — caricaRegolePiano
- `19988` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `20023` — _aiLogUsage
- `20045` — _aiProxyUrl
- `20051` — _aiTokenPerProxy
- `20080` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `20154` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 20233-20373

- `16216` — _risolviCollisioniCelle
- `20233` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `20293` — getFruttaStile
- `20300` — _fruttaGetPasto
- `20310` — _fruttaContaRigheRicetta
- `20314` — _fruttaIndiceBasePasto
- `20334` — getFruttaMarker
- `20347` — fruttaMarkerHtml
- `20355` — _fruttaCheckboxHtml
- `20364` — toggleFrutta
- `20373` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 20409-21683

- `20409` — _renderCelleGriglia
- `20489` — _renderRicetteTestuali
- `20528` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `20599` — _renderCelleHtml
- `20607` — toggleCellaMenu
- `20626` — closeAllCellaMenus
- `20634` — _trovaPasto
- `20642` — cellaSposta
- `20696` — cellaCancella
- `20717` — apriEditGrammatura
- `16789` — salva
- `20765` — cellaSwap
- `20785` — cellaRimuoviAlt
- `20799` — cellaAggiungiAlt
- `20902` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `20987` — apriEditRicetta
- `20996` — aggiungiRicetta
- `21012` — rimuoviRicetta
- `21021` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `21183` — ngAggiungiSpuntinoVuoto
- `21199` — apriAggiungiCella
- `17254` — risolviCompatibili
- `21295` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `21387` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `21528` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `21683` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 21731-22123

- `21731` — _attesoStrutturaPiano
- `21751` — _confrontaStrutturaPiano
- `21781` — _costruisciPromptDelta
- `21808` — _pianoToolSchema
- `21883` — _pianoMaxTokens
- `21892` — _estraiPianoDaRisposta
- `21914` — chiamaGeneraPiano
- `22081` — mostraLoadingSteps
- `18123` — render
- `22123` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 22190-22767

- `22190` — generaMessaggioAI
- `22295` — copiaMessaggioAI
- `22305` — salvaInStorico
- `22317` — salvaVarianteAI
- `22332` — renderVariantiSalvate
- `22351` — usaVariante
- `22369` — eliminaVariante
- `22380` — renderStoricoMsg
- `22396` — apriWhatsApp
- `22767` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 22945-24442

- `22945` — _ngColoreSemaforoNome
- `22953` — apriSceltaModalitaPiano
- `22988` — _ngChiudiModalita
- `22991` — _ngCostruisciGiornoVuoto
- `23024` — _ngCostruisciGiornoSpeciale
- `23035` — _ngIndiceInizioSpeciali
- `23046` — _ngModalitaNomeGiorno
- `23052` — _ngImpostaModalitaNomeGiorno
- `23055` — _ngLettera
- `23062` — _ngEtichettaGiorno
- `23082` — _ngEtichettaGiornoBreve
- `23096` — _ngToggleGiornoSpeciale
- `23120` — _ngRenderPannelloSpeciale
- `23188` — _generaGiornoSpecialeAI
- `23288` — _ngGiornoHaContenuto
- `23300` — _ngCreaPianoManuale
- `23323` — _ngScrollTabGiorni
- `23333` — _ngAbilitaDragScroll
- `23370` — _ngCambiaNumeroGiorni
- `23402` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `23416` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `23457` — _ngToggleCat
- `23466` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `23490` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `23646` — _ngSalvaPianoManuale
- `23672` — _ngParseIngrediente
- `23696` — _ngScomponiIngredienti
- `23708` — _ricCalcolaMacroDaIngredienti
- `23726` — _ricRicalcolaMacroLive
- `23733` — _ricAggiornaInfoMacro
- `23747` — _ricRicalcolaMacroLiveNow
- `23771` — _ngTrovaCategoriaAlimento
- `23804` — _ngPescaRicetta
- `23847` — _ngScomponiRicettaNelPasto
- `23884` — _ngDragStart
- `23895` — _ngDragStartCella
- `23906` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `23913` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `23918` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `23937` — _ngAggiungiAlimento
- `23962` — _ngRimuoviAlimento
- `23976` — _ngDopoModifica
- `23994` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `24047` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `24076` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `24093` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `24101` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `24173` — gramTestoCasalingo
- `24199` — _appendToggleNutrizionali
- `24242` — _appendTogglePromemoria
- `24271` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `24417` — cpFromEmoji
- `24423` — getEmojiCp
- `24442` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `22417` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `22439` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `22444` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `22470` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `22558` — _spesaTestoWhatsApp
- `22574` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `22619` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `22642` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `22670` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `22730` — scaricaListaSpesaPDF (download diretto, un click)
- `22738` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `22750` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 25590-25590

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
- `25590` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 25602-25809

- `25602` — salvaInbody
- `25667` — delInbody
- `25674` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `25809` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 25837-26306

- `25837` — buildSemLegenda
- `25851` — renderAlEditor
- `25912` — _alimNomeRegex
- `25920` — _alimGiorniDaPiano
- `25928` — _scanGiorniPerNome
- `25943` — scanRiferimentiAlimento
- `25972` — _alimRefsRighe
- `25978` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `26066` — modificaAlimentoCustom
- `26086` — ripristinaValoriPrecedentiAlimento
- `26098` — _resetAlimModal
- `26109` — apriNuovoAlimentoCustom
- `26115` — salvaAlimentoCustom
- `26182` — eliminaAlimentoCustom
- `26213` — _alimFonteBadge
- `26218` — renderAlimentiPage
- `22217` — E
- `26288` — archiviaAlimentoCustom
- `26306` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 26333-26760

- `26333` — _bcSetStatus
- `26335` — apriScannerBarcode
- `26343` — chiudiScannerBarcode
- `26348` — _bcStopCamera
- `26356` — _bcModaleAperto
- `26358` — _bcAvviaCamera
- `26369` — _bcAvviaNativo
- `26389` — _bcAvviaZXing
- `26398` — _bcZXStart
- `26409` — _bcErroreCamera
- `26417` — cercaBarcodeManuale
- `26423` — _barcodeTrovato
- `26439` — cercaBarcodeOFF
- `26457` — _bcProdottoNonTrovato
- `26471` — _bcPrecompilaForm
- `22477` — num
- `26495` — togAl
- `26548` — selCatAl
- `25402` — selTuttiAl
- `26592` — _appIdAnag  (P140 T1)
- `26602` — _appSyncPaz  (P140 T1)
- `26646` — _appSpecchioInverso  (P140 T2)
- `26672` — _appRitiraSpecchio  (P140 T2)
- `26703` — _appAncoraTappe  (P140 T2)
- `26722` — _appTappe  (P140 T2)
- `26743` — _appMigraPaziente  (P140 T1)
- `26753` — _appMigraTutti  (P140 T1)
- `26760` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 26776-27246

- `26776` — setCalView
- `26786` — calPrev
- `26787` — calNext
- `26788` — calToday
- `26790` — renderCal
- `26804` — renderCalMonth
- `26834` — renderCalWeek
- `26867` — renderCalDay
- `26918` — selGiorno
- `26932` — setDisp
- `26937` — openAddEvento
- `26950` — openAddEventoPaz
- `26956` — toggleEntrataCheck
- `26961` — salvaEvento
- `27003` — _evTestoPromemoria  (P140 T1)
- `27009` — openEvDetail
- `27064` — delEvento
- `27086` — copyMsg
- `27098` — aggDateCal
- `27020` — syncInizio
- `27021` — syncControllo
- `27111` — aggiornaPrev
- `27136` — apriEventoDaScheda  (P140 T2)
- `27150` — _appAggiornaOreScheda  (P140 T2)
- `27167` — renderRic
- `27194` — openNuovaRic
- `27195` — editRic
- `27205` — salvaRic
- `27230` — delRic
- `27246` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 27331-27391

- `27331` — aggiungiEntrataPerPaziente
- `27348` — openNuovaEntrata
- `27362` — salvaEntrata
- `27383` — delEntrata
- `27391` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 27421-27891

- `27421` — aiSuggerisciRicetta
- `27466` — renderConcettiModal
- `27485` — apriConcettiModal
- `27512` — salvaConcettiAllegati
- `27536` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `27574` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `27583` — loadInbodyPDF
- `27701` — _vitdLabel
- `27705` — getIntegratori
- `27709` — getIntegraWant
- `27713` — setIntegratori
- `27730` — setIntegraWant
- `27768` — getPatologieChip
- `27769` — getAllergieChip
- `27770` — setPatologieChip
- `27771` — setAllergieChip
- `27772` — getPatologie
- `27773` — getAllergie
- `27774` — setPatologieFromStr
- `27781` — setAllergieFromStr
- `27794` — getSdvChip
- `27795` — getCspChip
- `27796` — setSdvChip
- `27797` — setCspChip
- `27798` — setSdvFromStr
- `27799` — setCspFromStr
- `27803` — getBudget
- `27804` — setBudget
- `27809` — renderCalAnno
- `27840` — comprimeImmagine
- `27862` — uploadImmagineConcetto
- `27881` — rimuoviImmagineConcetto
- `27891` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 27957-28041

- `27957` — entraSelConcetti
- `27958` — annullaSelConcetti
- `27959` — toggleConcettoSel
- `27964` — eliminaConcettiSelezionati
- `27983` — confermaEliminaConcetti
- `27998` — aiRiscriviConcetto
- `28012` — editConcetto
- `28030` — salvaConcetto
- `28041` — openNuovoConcetto
- `27519` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 28078-28078

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
- `28078` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 28189-28450

- `28189` — renderScadenzeAlert
- `28431` — segnaGestito
- `28450` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 28459-28534

- `28459` — ripristinaPaz
- `28467` — eliminaPaz
- `28512` — getDove
- `28516` — setDove
- `28534` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 28539-28977

- `28539` — getCredenzialiPersistenti
- `28552` — cancellaCredenzialiPersistenti
- `28557` — rinnovaSessioneConRefreshToken
- `28574` — getSessioneSalvata
- `28593` — salvaSessione
- `28603` — cancellaSessione
- `28607` — eseguiLogin
- `28654` — eseguiLogout
- `28676` — mostraApp
- `28681` — verificaSessioneEAvvia
- `28709` — assicuraTokenValido
- `28738` — _garantiscoSessionePerSync
- `28750` — avviaRinnovoTokenPeriodico
- `28754` — fermaRinnovoTokenPeriodico
- `28763` — _authReset
- `28768` — _authMostra
- `28771` — mostraLogin
- `28772` — mostraRegistrazione
- `28773` — mostraRecupero
- `28774` — mostraNuovaPassword
- `28777` — eseguiRegistrazione
- `28815` — eseguiRecuperoPassword
- `28844` — eseguiNuovaPassword
- `28878` — _parseHashParams
- `28885` — _pulisciHash
- `28889` — gestisciRitornoAuth
- `28977` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 29049-29172

- `29049` — apriPannelloRicette
- `29078` — chiudiPannelloRicette
- `29086` — applicaRicettaPasto
- `29122` — inizializzaP2
- `29134` — deepClone
- `29138` — applicaPatch
- `29172` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
