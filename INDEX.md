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
**Ultimo rigenero automatico: 5 agosto 2026** (audit al contrario: correzione `selCatAl`, rinomina `verificaRegola_70_25_10`, ricette di sistema eliminabili, rimozione `applicaPatch`) — lo script ha corretto **693 voci** in totale nella giornata; i range "Righe A-B" di sezione NON sono stati ricalcolati in questa passata (restano quelli del 26 lug, indicativi). Righe totali file: 30383.

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
Righe 2421-2463

- `2421` — _slugAlimento
- `2429` — _catalogoIndicizza
- `2433` — _catalogoDeindicizza
- `2440` — costruisciCatalogo
- `2463` — risolviAlimento

---

### MACROS PIANO — calcolo e badge macro reali vs target
Righe 2478-2754

- `2478` — getValoriCREA
- `2490` — getCurrentPaziente
- `2525` — getKcalWeekend
- `2580` — getMacrosRicettaComposta
- `2586` — calcolaMacrosPiano
- `2688` — renderBadgeMacrosReali
- `2611` — pctStr
- `2612` — color
- `2625` — row
- `2754` — renderBadgeMacrosReali_DOM

---

### ANALISI DEL SANGUE — parsing, indici clinici derivati, interpretazione
Righe 3039-3246

- `3039` — _parseAnalisiNum
- `3047` — calcolaIndice
- `3220` — interpretaAnalisi
- `3232` — _interpAnalisiHtml
- `3246` — mostraInfoRange

---

### CONCETTI EDUCATIVI — sync Supabase, migrazione
Righe 3393-3417

- `3393` — pushConcetiSupabase
- `3403` — pullConcetiSupabase
- `3417` — migraConcetti

---

### ALIMENTI — categorie funzionali/semaforo, chip UI, equivalenze porzioni
Righe 3607-3979

- `3607` — getCategoriaSemaforo
- `3624` — _getCategorieGruppo
- `3638` — calcolaGrammaturaEquivalente
- `3690` — _gruppoEquiv  (P121: gruppo di equivalenza + criterio per categoria funzionale)
- `3696` — _porzioneStandard  (P121: porzione `g` di database dell'alimento)
- `3711` — suggerisciGrEquivalente  (P121: firma a 3 argomenti, il gruppo si deduce dai due alimenti)
- `3737` — _etichettaCriterio  (P121: ≈carbo / ≈prot / ≈grassi / fissa / porzione)
- `3757` — _promptAlternativeGrassi  (P121: riga del prompt AI generata dal motore)
- `3773` — ricalcolaAlternative  (P121: MOTORE UNICO, unico punto che scrive la grammatura di un'alternativa)
- `3792` — ricalcolaAlternativePiano  (P121: applica il motore a tutte le celle di un piano)
- `3841` — arrotondaGrammatura  (P121: sostituisce arrotondaPorzioneDiscreta — pezzi interi senza tetto / 5g)
- `3851` — getCategoriaFunzionale
- `3891` — catArr
- `3907` — _tagComuniTrova
- `3911` — getTagComuniChip
- `3914` — setTagComuniChip
- `3922` — setCatChips
- `3935` — getStagioniChip
- `3938` — setStagioniChip
- `3945` — getProfiloChip
- `3948` — setProfiloChip
- `3957` — wireChipGroup
- `3968` — wireAttrChipGroups
- `3979` — wireRadioChipGroup

---

### CONFIG / STORAGE LOCALE — cfg, localStorage db, util data/valuta
Righe 4007-4423

- `4007` — getCfg
- `4008` — saveCfgL
- `4009` — getUrl
- `4010` — saveLocal
- `4011` — loadLocal
- `4023` — uid
- `4041` — ymdLoc  (P141)
- `4046` — today
- `4054` — addDays
- `4062` — fData
- `4063` — fEur
- `4065` — getLastSyncText
- `4075` — getSyncColor
- `4082` — aggiornaStatoSync
- `4108` — setSyncStatus
- `4377` — _registraTombstone
- `4385` — _tombstoneAttivi
- `4397` — _fondiTombstones
- `4411` — _mergeTombstonesRemoti *(dal 24/7 legge il meta da `collections`, P74 1d)*
- `4423` — _applicaTombstones
- `4284` — _pazFetchMeta *(P74 1d — solo `collections`)*
- `4305` — _collectionsUpsert *(P74 — scrittura primaria dei 4 meta-record dal cutover 1d)*
- `4327` — _collectionsFetch *(P74 1d — lettura unica dei meta-record)*
- `4350` — _analisiSangueUpsert *(P74 fase 2 — scrittura ombra analisi del sangue, 24/7)*

---

### SYNC SUPABASE — push/pull ricette/pazienti, tombstones, conflitti (P69)
Righe 4447-4832

- `4447` — supaHeaders
- `4461` — pushRicetteSupabase
- `4532` — pullRicetteSupabase
- `4556` — delRicetteSupabase
- `4568` — delPazienteSupabase
- `4583` — pushToSheets
- `4627` — pullFromSheets
- `4706` — syncNow
- `4719` — sincronizzaTutto
- `4360` — stpSet
- `4365` — stpMsg
- `4850` — testConnSupabase
- `4880` — _p68LogSaveAnonimo

---

### SYNC SUPABASE — save paziente, piani/cache piano, entrate, eventi
Righe 4846-5368

- `4894` — save
- `4912` — _pushRigaPerId
- `4945` — _flushDirtyIds
- `5028` — _p69LoadBaseline
- `5031` — _p69StoreBaseline
- `5034` — _p69SetBaseline
- `5038` — _p69DropBaseline
- `5042` — _p69SetBaselineFromRows
- `5048` — _p69NomePaz
- `5053` — _p69InList
- `5061` — _p69RilevaConflitti
- `5097` — _p69DialogoConflitti
- `4738` — chiudi
- `5131` — _p69RisolviRicarica
- `5160` — _p69EsportaLocali
- `5173` — _p69RisolviSovrascrivi
- `5186` — pushPianoSupabase
- `5208` — pullPianiSupabase
- `5224` — delPianoSupabase
- `5240` — delPianiPazienteSupabase
- `5252` — pushCachePianoSupabase
- `5269` — caricaCachePianoSupabase
- `5291` — pushEntrateSupabase
- `5315` — pullEntrateSupabase
- `5329` — delEntrataSupabase
- `5337` — pushEntrataSupabase
- `5348` — pushEventoSupabase
- `5361` — pushEventiSupabase
- `5385` — pullEventiSupabase
- `5405` — delEventoSupabase
- `5416` — _pianoCacheKey

---

### UI GENERALE — config AI key, notifiche, navigazione (goTo/tab/modali)
Righe 5399-5510

- `5447` — _salvaPianoCache
- `5452` — _caricaPianoCache
- `5458` — salvaCfg
- `5459` — testConn
- `5466` — testaAntKey
- `5477` — initAntCard
- `5480` — esporta
- `5481` — importa
- `5486` — goTo
- `5502` — closeM
- `5510` — ngChiudiModale
- `5519` — ngChiudiPopupCoppia
- `5523` — ngAggiungiX
- `5534` — ngUpgradeModali
- `5554` — mTab
- `5555` — aggiornaEta
- `5556` — toggleOrarioNote
- `5557` — pdTab
- `5558` — notif

---

### PAZIENTI — registro: lista/card/kanban, apertura, editing, salvataggio, routine
Righe 5518-8392

- `5566` — getPazView
- `5567` — setPazView
- `5576` — _pazStatoPiano
- `5584` — _pazUrgenzaControllo
- `5599` — _pazBadgePrenotato  (P142)
- `5606` — pazSegnaArrivato  (P142)
- `5612` — _pazStatoTagHtml
- `5629` — _pazAggiornaFiltroRegimi
- `5637` — renderPaz
- `5695` — _renderPazCard
- `5720` — _renderPazLista
- `5747` — _renderPazKanban
- `5785` — openNuovoPaz
- `5812` — editPaz
- `5892` — REGOLE_SEMAFORO_ALIMENTI *(15 condizioni cliniche → grigi/celesti; globale dal 26/7 per essere verificabile dal test)*
- `6339` — _SEM_COLORI_LEGACY / `6105` _SEM_COLORI_AUTO *(F9 — unico vocabolario dei colori automatici)*
- `6344` — NOMI_CONDIZIONE_SEMAFORO *(etichette delle 15 condizioni, usate anche dal riquadro della scheda)*
- `6366` — _semaforoCondizioniAttive *(le condizioni spuntate su un paziente)*
- `6377` — _semaforoMigraPaziente *(F9 — toglie i colori legacy e ricalcola; idempotente)*
- `6388` — _semaforoMigraTutti *(passata su tutti i pazienti in memoria, con conteggio)*
- `6399` — applicaRegoloSemaforo *(dal 26/7 pulisce TUTTI e sei i colori automatici, non solo i suoi due)*
- `6487` — trovaChiaveAlimento *(match esatto sul nome: se non trova, la regola è ignorata in silenzio — vedi test s2-regole-nomi-alimenti)*
- `6511` — _pazNumOPrec *(F7 — campo assente = valore precedente, non azzeramento)*
- `6523` — _pazPreservaCampi *(F5 — l'anagrafica non cancella i campi che il form non gestisce)*
- `6529` — salvaPaz
- `6679` — openPaz
- `8127` — renderPdRoutine
- `6723` — cardHTML
- `8269` — updateRoutineCampo
- `8277` — suggerisciPastoEQuando
- `8304` — filtroLibreria
- `8313` — renderLibreriaGrid
- `8334` — aggiungiDaLibreriaIdx
- `8358` — openModalRoutine
- `8365` — salvaRoutineVoce
- `8390` — salvaRoutine
- `8397` — mostraRoutinePopup
- `8425` — removeRoutineVoce
- `8440` — _renderAggiustamentiSection

---

### 📈 PERCORSO — timeline di periodizzazione (P115 Tappe 1-5 COMPLETE, 24 lug 2026)
Righe 6021-6621 (numeri ESATTI al 24/7 notte, dopo la Tappa 5). ⚠️ Questo blocco (~600 righe) fa slittare tutti i numeri delle sezioni SUCCESSIVE a riga ~6020 rispetto all'ultima rigenerazione completa: per quelle sezioni fare grep di conferma. Rigenerazione completa alla prossima modifica strutturale.

- `6725` — _PERCORSO_TIPI (const: tipi fase, colori, pct default)
- `6732` — _percorsoGet *(normalizza p.percorso, scarta fasi invalide)*
- `6756` — _percorsoIntervalli *(fasi consecutive → date concrete dal/al)*
- `6770` — _percorsoFaseAt *(fase attiva a una data; dal incluso, al escluso)*
- `6779` — _percorsoKcalFase *(pct → kcal indicative via calcolaTDEE)*
- `6802` — _percorsoProiezione *(Tappa 2 — proiezione ibrida teorica/calibrata, cono, obiettivo a intervallo)*
- `6860` — _percorsoDataBreve *(ISO → "12 set")*
- `6877` — _percorsoSerieEnergia *(Tappa 3 — serie introito/TDEE stimato/TDEE osservato per la corsia energia)*
- `6916` — _percorsoSerieMassaMagra *(Tappa 4 — solo InBody: punti {data,m,pg})*
- `6935` — _percorsoConsuntivo *(Tappa 5 — legge p.consuntivo scritto da P50: aderenza, extra kcal, ritardo=extra÷7700, settimane perse; oggi sempre ok:false)*
- `6977` — _PERCORSO_LAYERS_DEFAULT / _percorsoLayersState / _percorsoLayersGet *(Tappa 4 — stato interruttori, SOLO sessione, mai su p)*
- `6982` — percorsoLayerToggle *(Tappa 4 — inverte un solo strato)*
- `6988` — percorsoVistaPreset *(Tappa 4 — preset "tecnica"/"paziente")*
- `7004` — _percorsoPaz *(e a seguire i mutatori percorsoInit/SetInizio/AddFase/UpdFase/DelFase/MoveFase)*
- `7060` — _PERCORSO_MODELLI / _PERCORSO_GEN *(P122 T3 — 4 modelli + regole dei cicli)*
- `7078` — _percorsoGeneraFasi *(P122 T3 — pura: dal traguardo alle fasi, ritmo = quello della proiezione)*
- `7158` — _percorsoModelloSelectHtml
- `7167` — percorsoGeneraDaModello *(propone; conferma prima di sostituire fasi esistenti)*
- `7190` — _percorsoShiftGiorni *(pura: ancora = ultima pesata)*
- `7200` — percorsoRiallinea *(⏩ trasla il piano, riprende dal giorno-fase dell'interruzione)*
- `7227` — _TRG_TIPI / `6744` _TRG_COMPORTAMENTI *(P122 T4 — tipi di traguardo e libreria comportamenti)*
- `7249` — _traguardiGet · `6761` _traguardoValoreAttuale *(valore corrente dai dati esistenti, null se manca)*
- `7288` — _traguardoVerso *(auto: dedotto dalla partenza)* · `6803` _traguardoValuta · `6824` _traguardiValuta
- `7329` — traguardoAdd · `6852` traguardoUpd · `6867` traguardoDel · `6873` traguardoSegna
- `7387` — _COND_TIPI · `6897` _percorsoCondizione *(pura: la fase finisce per soglia — SOLO suggerimento)*
- `7403` — percorsoSetCondizione · `6927` percorsoChiudiFase *(esito fotografato, riapribile)*
- `7437` — _traguardiHtml *(blocco 🏁 in fondo alla scheda Percorso)*
- `7535` — _percorsoVistaPaz / `7049` _percorsoVistaPazAttiva *(P122 T5 — modalità di sessione)*
- `7542` — _percorsoVittorie *(pura: vittorie dall'inizio del percorso + flag ricomposizione)*
- `7580` — _percorsoNascondiPeso *(in fase di massa il peso non si mostra al paziente)*
- `7591` — _traguardoFaseCorrente *(traguardo della fase IN CORSO, non quello lontano)*
- `7619` — _traguardoTestoPaziente *(righe in italiano semplice, riusate dal messaggio WhatsApp)*
- `7652` — _vistaPazienteHtml *(i tre riquadri che guarda il paziente)*
- `7732` — _percorsoChartSvg *(due corsie: peso + massa magra + cono proiezione sopra, striscia aderenza in mezzo (solo con dati P50), energia (kcal) sotto — tutto gated dagli interruttori)*
- `7921` — renderPdPercorso *(scheda: badge fase, riga proiezione/obiettivo, riga Piano vs Realtà (solo con dati), toolbar interruttori, grafico, editor)*

*(Tappa 2 tocca anche `calcolaMacros`: box obiettivo con intervallo al posto della data secca.)*

---

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 8477-8648

- `8525` — salvaAggiustamento
- `8558` — eliminaAggiustamento
- `8567` — renderPdNote
- `8602` — salvaNotaClinica
- `8617` — deleteNota
- `8626` — saveNote
- `8646` — resetSemaforoAuto *(F9 — pulsante 🔄 Ricalcola: pulisce gli automatici e rifà col sistema valido; il motore LEGACY non esiste più)*
- `8696` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 8889-9087

- `8937` — avviaFX
- `8965` — avviaAnalisi
- `8982` — _renderFlussoPanel
- `9026` — _riepEsc
- `9030` — _riepNum
- `9036` — _riepDelta
- `9044` — _riepDataSig
- `9062` — _riepParseFX
- `8087` — clean
- `9076` — _riepAggiornaFX
- `9102` — _riepToggleDomandaDefault
- `9114` — _riepAddDomanda
- `9127` — _riepRemoveDomanda
- `9135` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 9299-9542

- `8218` — dCol
- `8336` — card
- `9347` — renderPdRagionamento
- `9435` — inviaMessaggioRag
- `9453` — concludiERiassumi
- `9467` — salvaRagionamento
- `9488` — apriGeneratoreDaRag
- `9496` — nuovaSessioneRag
- `9502` — cancellaSavedRag
- `9512` — renderPazTimeline
- `9549` — renderPdAnamnesi
- `9590` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 11490-12625

- `11538` — _anNorm *(P125 — testo confrontabile: minuscole, niente accenti)*
- `11544` — _anCorrisponde *(P125 — ricerca per parole-prefisso: "vit d" trova "Vitamina D")*
- `11550` — filtraAnalisi *(P125 — filtro dal vivo delle 119 voci)*
- `11584` — pulisciRicercaAnalisi
- `11590` — renderPdAnalisi
- `11646` — toggleAnalisiSection
- `11795` — loadAnalisiSanguePDF
- `11682` — _impPdfConfigurata
- `11683` — _impPdfLib
- `11693` — _impPdfApri
- `11706` — _impPdfPagina *(P124b — una pagina del PDF → immagine, con la rotazione RILEVATA, non quella dichiarata dal file)*
- `11727` — _impRuotaImmagine
- `11752` — _impRilevaRotazione *(P124b — chiamata piccola: di quanti gradi va girata la pagina)*
- `11771` — _impPromptPagina *(P124b — prompt di UNA pagina, con l'impronta della riga: valore+unità+riferimento)*
- `11970` — _impNormalizzaNumero *(P124 — numero all'italiana → punto decimale, conversione fatta dall'app e non dall'AI)*
- `11981` — _impNumeri
- `11989` — _impSembraIntervallo
- `11997` — _impUgualeAlRange
- `12006` — _impLimitiStd
- `12027` — _impFuoriScala
- `12036` — _impCorrezioneVirgola
- `12048` — _impTestoLimiti
- `12069` — _impRifPlausibile *(P124b — un "riferimento" che è un'unità di misura = riga disallineata)*
- `12082` — _impUnitaCanonica
- `12104` — _impStessaGrandezza *(P124b — stesso tipo di misura a meno del prefisso: nanomoli/micromoli/millimoli)*
- `12121` — _impUnitaCompatibili
- `12132` — _impControllaValore *(P124 — i controlli anti-errore su un valore estratto)*
- `12196` — mostraDiffAnalisi *(P124 — colonna Estratto modificabile + righe sospette deselezionate)*
- `12386` — _calcoloIncluso
- `12392` — toggleCalcoloIncluso
- `12414` — _renderCalcoliPannello
- `12455` — toggleGlossario
- `12460` — updateAnalisi
- `12519` — salvaAnalisi
- `12532` — applicaGruppoClinico
- `12561` — renderBoxGruppiCliniciSuggeriti
- `12593` — suggerisciGruppiClinici
- `12673` — renderMemoriaInbody

---
### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9176 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `9720` — _richVal
- `9727` — _richBmi
- `9732` — _richPat
- `9738` — _richNum
- `9783` — _richPreselezione
- `9799` — richLeggiIntestazione
- `9803` — richSalvaIntestazione
- `9812` — apriRichiestaAnalisi
- `9832` — _richModaleHtml
- `9908` — _richEsc
- `9910` — _richMotivoCambia
- `9916` — _richToggleSez
- `9922` — _richAggiornaConteggi
- `9930` — _richMotivoCorrente
- `9940` — _richSelezione
- `9955` — _richTxt
- `9961` — _richCostruisciPDF
- `8969` — nuovaPagina
- `8970` — spazio
- `10057` — _richNomeFile
- `10062` — _richPrepara
- `10075` — _richRegistra
- `10080` — _richStato
- `10082` — richScaricaPDF
- `10131` — _richUpload
- `10133` — _richWaUrl
- `10140` — _richTestoWa
- `10154` — richInviaWhatsApp
- `10194` — richCopiaLink
- `10215` — _richStoricoHtml

---
### REFERTI DEL SANGUE DATATI — storico nel tempo (P118 tappa 1)
Righe 9194-9387 — migrazione, ordinamento, quadro attuale derivato, barra di selezione.

- `11315` — _refertoNuovoId
- `11318` — _refertoOggi
- `11322` — _refertoDataIt
- `11328` — _refertoConteggio
- `11342` — _refertiMigra
- `11369` — _refertiOrdinati
- `11380` — _refertoPiuRecente
- `11385` — _refertoInVista
- `11403` — _refertiApplica
- `11416` — _refertoCrea
- `11435` — refertoCambiaVista
- `11441` — refertoCambiaData
- `11453` — refertoNuovo
- `11461` — refertoDuplica
- `11470` — refertoElimina
- `11485` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `10928` — _rangeNum
- `10934` — _rangeTestoDa
- `10953` — _rangeCoppia
- `10963` — _rangeHtml

---
### ANDAMENTO NEL TEMPO — tracciato, variazione, grafico grande (P118 tappa 3)
Righe 9441-9745 — serie storica, regola del colore, sparkline, pannello in fondo.

- `11005` — _andLimiti
- `11026` — _andParseRangeLab
- `11039` — _andDistanza
- `11046` — _andValutazione
- `11059` — _andSerie
- `11073` — _andNum
- `11077` — _andDataBreve
- `11082` — _andMeseAnno
- `11090` — _andDominio
- `11104` — _andColore
- `11117` — _andSparkHtml
- `11143` — _andRigaHtml
- `11165` — _andEsamiSeguibili
- `11173` — andScegliEsame
- `11179` — _andPannelloHtml
- `11232` — _andGraficoGrande
- `11283` — _andPasso

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 12675-14023

- `12723` — _ibFmtBreve
- `12732` — _renderPesiIntermediSection
- `12781` — aggiungiPesoIntermedio
- `12797` — eliminaPesoIntermedio
- `12807` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `14071` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 14331-14331

- `14379` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 14712-17772

- `14760` — aggiornaLabelMacros
- `14778` — calcolaMacros
- `14919` — applicaSchema
- `14954` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `14960` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `14982` — _misuraDaReferto *(P127 — UN referto letto con le regole del traguardo: usata anche dalla verifica al controllo)*
- `15015` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `15026` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `15044` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `15157` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `15171` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `15227` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `15241` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `15273` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `15306` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `15348` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `15356` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `15367` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `15394` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `15409` — _stradeVerso *(le strade complete + percentuale libera)*
- `15456` — _VC_TOLLERANZA_PCT / _VC_GIORNI_MIN / _VC_GIORNI_MIN_RITARO / _VC_COPERTURA_MIN_PCT / _VC_MAGRA_PRUDENZA_GG *(P127 — soglie cliniche della verifica)*
- `15466` — _mediaSlotPrescritta *(media pesata sui giorni di un campo dello storico target; la usa anche _kcalMediaPrescrittaOss)*
- `15486` — _vcDeficitSlot *(deficit di uno slot: campo offset o kcal−tdee per gli slot vecchi)*
- `15494` — _vcTratto *(P127 — cosa è cambiato fra due referti, previsto vs reale, TDEE misurato)*
- `15548` — _vcTraguardoSalvato *(traguardo ricostruito dal salvato, per la scheda Percorso)*
- `15558` — _verificaControllo *(P127 — motore puro: tratto recente, quadro dall'inizio, residuo al ritmo reale)*
- `15596` — _verificaControlloHtml *(blocco 🔎, unica fonte per pannello 🎯 e scheda Percorso; azioni solo dove c'è il campo kcal)*
- `15688` — _vcRitara *(scrive le kcal ritarate nel campo regime: propone, non salva)*
- `15701` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `15769` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `15791` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `15844` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `15951` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `15966` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `15991` — _renderRifPesoBox
- `16042` — _usaRifPeso
- `16046` — _aggiornaRifPesoTarget
- `16049` — _aggiornaRegimeSlider
- `16706` — _presetRegime
- `16710` — _initRegimeSliderDaPaziente
- `16633` — ricalcolaLAF
- `16866` — renderStoricoTDEE
- `16908` — attivaSlotTDEE
- `16925` — eliminaSlotTDEE
- `16938` — _toggleCiclizzazione
- `16944` — _aggiornaAnteprimaCiclizzazione
- `16962` — salvaCalcoloMacros
- `17277` — _metAllenamento
- `17516` — _neatFrazione
- `17635` — _larnLafStileVita
- `17652` — _regimeOffset
- `17662` — _componiRegimeText
- `17695` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `17707` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `17714` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `17820` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 17790-18220

- `17838` — renderTargetBadge
- `17819` — verificaRegola_75_20_5
- `17856` — renderBadge75_20_5
- `17983` — _validaNorm
- `17986` — _validaMatchTermine
- `17994` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `18045` — _validaTesto
- `18066` — validaPiano
- `18140` — _validaFirmaBlocchi
- `18147` — renderBadgeValidatore
- `18178` — _validaVaiAlGiorno
- `18187` — apriPannelloValidatore
- `13472` — esc
- `18244` — _validaEseguiOverride
- `18267` — validaGateExport
- `18282` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 18353-18985

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
- `18415` — pianoPazSelezionato
- `18562` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `18800` — renderPanelMacrosGiorno
- `18943` — pmgCambiaGrammi
- `18970` — riapriPiano
- `19008` — _montaPianoCorrente
- `19047` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 18995-19469

- `19057` — pullTemplateSupabase
- `19068` — delTemplateSupabase
- `19077` — _promptTemplateNome
- `19102` — _creaTemplateDaJSON
- `19125` — salvaComeTemplate
- `19136` — salvaComeTemplateDaPiano
- `19145` — _normNomeAlim
- `19146` — _escRegAlim
- `19147` — _raccogliAlimentiDaPiano
- `19158` — _alimentiEsclusiPaziente
- `19170` — _trovaConflittiTemplate
- `19188` — _mostraAvvisoConflitti
- `19212` — applicaTemplate
- `19230` — apriPickerTemplate
- `19258` — _pickPaziente
- `19282` — applicaTemplatePick
- `19286` — rinominaTemplate
- `19297` — eliminaTemplate
- `19307` — renderLibreriaTemplate
- `19336` — renderStoricoPiani
- `19395` — eliminaPiano
- `19411` — _getActiveMacrosTarget
- `19435` — getTargetAttivi
- `19472` — calcolaTargetsCiclizzazione
- `19498` — _setupPianoTargets
- `19522` — getStagioneCorrente
- `19531` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 19940-19940

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `20002` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 19949-20408

- `20011` — aggiornaUIcolazione
- `20021` — salvaRegolePiano
- `20082` — _isModelloSistema
- `20085` — _isModelloSistemaModificato
- `20097` — caricaModelliCustomLocal
- `20111` — salvaModelliCustomLocal
- `20132` — _migraRecordCustom
- `20147` — _syncAliasLegacy
- `20156` — caricaAlimentiCustom
- `20180` — pushAlimentiCustomSupabase
- `20190` — pullAlimentiCustomSupabase
- `20204` — pushModelliSupabase
- `20222` — pullModelliSupabase
- `20247` — _calcolaFreqDaModello
- `20266` — aggiornaUImodello
- `20355` — popolaDropdownModelli
- `20383` — cambiaModelloRotazione
- `20389` — ripristinaModelloOriginale
- `20412` — eliminaModelloCustom
- `20430` — mostraAnteprimaModello
- `20440` — apriEditorModello
- `20470` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 20677-20915

- `15738` — rerender
- `20739` — _salvaModelloDaEditor
- `20781` — caricaRegolePiano
- `20811` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `20846` — _aiLogUsage
- `20868` — _aiProxyUrl
- `20874` — _aiTokenPerProxy
- `20903` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `20977` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 20994-21134

- `16216` — _risolviCollisioniCelle
- `21056` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `21116` — getFruttaStile
- `21123` — _fruttaGetPasto
- `21133` — _fruttaContaRigheRicetta
- `21137` — _fruttaIndiceBasePasto
- `21157` — getFruttaMarker
- `21170` — fruttaMarkerHtml
- `21178` — _fruttaCheckboxHtml
- `21187` — toggleFrutta
- `21196` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 21170-22444

- `21232` — _renderCelleGriglia
- `21312` — _renderRicetteTestuali
- `21351` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `21422` — _renderCelleHtml
- `21430` — toggleCellaMenu
- `21449` — closeAllCellaMenus
- `21457` — _trovaPasto
- `21465` — cellaSposta
- `21519` — cellaCancella
- `21540` — apriEditGrammatura
- `16789` — salva
- `21588` — cellaSwap
- `21608` — cellaRimuoviAlt
- `21622` — cellaAggiungiAlt
- `21725` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `21810` — apriEditRicetta
- `21819` — aggiungiRicetta
- `21835` — rimuoviRicetta
- `21844` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `22006` — ngAggiungiSpuntinoVuoto
- `22022` — apriAggiungiCella
- `17254` — risolviCompatibili
- `22118` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `22210` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `22351` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `22506` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 22492-22884

- `22554` — _attesoStrutturaPiano
- `22574` — _confrontaStrutturaPiano
- `22604` — _costruisciPromptDelta
- `22631` — _pianoToolSchema
- `22706` — _pianoMaxTokens
- `22715` — _estraiPianoDaRisposta
- `22737` — chiamaGeneraPiano
- `22904` — mostraLoadingSteps
- `18123` — render
- `22946` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 22951-23528

- `23013` — generaMessaggioAI
- `23118` — copiaMessaggioAI
- `23128` — salvaInStorico
- `23140` — salvaVarianteAI
- `23155` — renderVariantiSalvate
- `23174` — usaVariante
- `23192` — eliminaVariante
- `23203` — renderStoricoMsg
- `23219` — apriWhatsApp
- `23590` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 23706-25203

- `23768` — _ngColoreSemaforoNome
- `23776` — apriSceltaModalitaPiano
- `23811` — _ngChiudiModalita
- `23814` — _ngCostruisciGiornoVuoto
- `23847` — _ngCostruisciGiornoSpeciale
- `23858` — _ngIndiceInizioSpeciali
- `23869` — _ngModalitaNomeGiorno
- `23875` — _ngImpostaModalitaNomeGiorno
- `23878` — _ngLettera
- `23885` — _ngEtichettaGiorno
- `23905` — _ngEtichettaGiornoBreve
- `23919` — _ngToggleGiornoSpeciale
- `23943` — _ngRenderPannelloSpeciale
- `24011` — _generaGiornoSpecialeAI
- `24111` — _ngGiornoHaContenuto
- `24123` — _ngCreaPianoManuale
- `24146` — _ngScrollTabGiorni
- `24156` — _ngAbilitaDragScroll
- `24193` — _ngCambiaNumeroGiorni
- `24225` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `24239` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `24280` — _ngToggleCat
- `24289` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `24313` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `24469` — _ngSalvaPianoManuale
- `24495` — _ngParseIngrediente
- `24519` — _ngScomponiIngredienti
- `24531` — _ricCalcolaMacroDaIngredienti
- `24549` — _ricRicalcolaMacroLive
- `24556` — _ricAggiornaInfoMacro
- `24570` — _ricRicalcolaMacroLiveNow
- `24594` — _ngTrovaCategoriaAlimento
- `24627` — _ngPescaRicetta
- `24670` — _ngScomponiRicettaNelPasto
- `24707` — _ngDragStart
- `24718` — _ngDragStartCella
- `24729` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `24736` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `24741` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `24760` — _ngAggiungiAlimento
- `24785` — _ngRimuoviAlimento
- `24799` — _ngDopoModifica
- `24817` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `24870` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `24899` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `24916` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `24924` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `24996` — gramTestoCasalingo
- `25022` — _appendToggleNutrizionali
- `25065` — _appendTogglePromemoria
- `25094` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `25240` — cpFromEmoji
- `25246` — getEmojiCp
- `25265` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `23240` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `23262` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `23267` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `23293` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `23381` — _spesaTestoWhatsApp
- `23397` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `23442` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `23465` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `23493` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `23553` — scaricaListaSpesaPDF (download diretto, un click)
- `23561` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `23573` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 26351-26351

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
- `26413` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 26365-26577

- `26427` — salvaInbody
- `26497` — delInbody
- `26504` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `26639` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 26605-27074

- `26667` — buildSemLegenda
- `26681` — renderAlEditor
- `26756` — _alimNomeRegex
- `26764` — _alimGiorniDaPiano
- `26772` — _scanGiorniPerNome
- `26787` — scanRiferimentiAlimento
- `26816` — _alimRefsRighe
- `26822` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `26910` — modificaAlimentoCustom
- `26930` — ripristinaValoriPrecedentiAlimento
- `26942` — _resetAlimModal
- `26953` — apriNuovoAlimentoCustom
- `26959` — salvaAlimentoCustom
- `27026` — eliminaAlimentoCustom
- `27057` — _alimFonteBadge
- `27062` — renderAlimentiPage
- `22217` — E
- `27132` — archiviaAlimentoCustom
- `27150` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 27101-27528

- `27177` — _bcSetStatus
- `27179` — apriScannerBarcode
- `27187` — chiudiScannerBarcode
- `27192` — _bcStopCamera
- `27200` — _bcModaleAperto
- `27202` — _bcAvviaCamera
- `27213` — _bcAvviaNativo
- `27233` — _bcAvviaZXing
- `27242` — _bcZXStart
- `27253` — _bcErroreCamera
- `27261` — cercaBarcodeManuale
- `27267` — _barcodeTrovato
- `27283` — cercaBarcodeOFF
- `27301` — _bcProdottoNonTrovato
- `27315` — _bcPrecompilaForm
- `22477` — num
- `27339` — togAl
- `27392` — selCatAl
- `25402` — selTuttiAl
- `27457` — _appIdAnag  (P140 T1)
- `27467` — _appSyncPaz  (P140 T1)
- `27511` — _appSpecchioInverso  (P140 T2)
- `27537` — _appRitiraSpecchio  (P140 T2)
- `27568` — _appAncoraTappe  (P140 T2)
- `27587` — _appTappe  (P140 T2)
- `27608` — _appMigraPaziente  (P140 T1)
- `27618` — _appMigraTutti  (P140 T1)
- `27625` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 27544-28011

- `27641` — setCalView
- `27651` — calPrev
- `27652` — calNext
- `27653` — calToday
- `27655` — renderCal
- `27669` — renderCalMonth
- `27696` — renderCalWeek
- `27729` — renderCalDay
- `27780` — selGiorno
- `27794` — setDisp
- `27799` — openAddEvento
- `27812` — openAddEventoPaz
- `27818` — toggleEntrataCheck
- `27823` — salvaEvento
- `27865` — _evTestoPromemoria  (P140 T1)
- `27871` — openEvDetail
- `27926` — delEvento
- `27948` — copyMsg
- `27960` — aggDateCal
- `27020` — syncInizio
- `27021` — syncControllo
- `27973` — aggiornaPrev
- `27998` — apriEventoDaScheda  (P140 T2)
- `28012` — _appAggiornaOreScheda  (P140 T2)
- `28029` — renderRic
- `28056` — openNuovaRic
- `28057` — editRic
- `28067` — salvaRic
- `28092` — delRic
- `28110` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 28097-28157

- `28196` — aggiungiEntrataPerPaziente
- `28213` — openNuovaEntrata
- `28227` — salvaEntrata
- `28248` — delEntrata
- `28256` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 28187-28796

- `28286` — aiSuggerisciRicetta
- `28331` — renderConcettiModal
- `28350` — apriConcettiModal
- `28377` — salvaConcettiAllegati
- `28401` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `28439` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `28582` — loadInbodyPDF
- `28705` — _vitdLabel
- `28709` — getIntegratori
- `28713` — getIntegraWant
- `28717` — setIntegratori
- `28734` — setIntegraWant
- `28772` — getPatologieChip
- `28773` — getAllergieChip
- `28774` — setPatologieChip
- `28775` — setAllergieChip
- `28776` — getPatologie
- `28777` — getAllergie
- `28778` — setPatologieFromStr
- `28785` — setAllergieFromStr
- `28798` — getSdvChip
- `28799` — getCspChip
- `28800` — setSdvChip
- `28801` — setCspChip
- `28802` — setSdvFromStr
- `28803` — setCspFromStr
- `28807` — getBudget
- `28808` — setBudget
- `28813` — renderCalAnno
- `28844` — comprimeImmagine
- `28866` — uploadImmagineConcetto
- `28885` — rimuoviImmagineConcetto
- `28895` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 28862-28946

- `28961` — entraSelConcetti
- `28962` — annullaSelConcetti
- `28963` — toggleConcettoSel
- `28968` — eliminaConcettiSelezionati
- `28987` — confermaEliminaConcetti
- `29002` — aiRiscriviConcetto
- `29016` — editConcetto
- `29034` — salvaConcetto
- `29045` — openNuovoConcetto
- `27519` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 28983-28983

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
- `29082` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 29095-29420

- `29194` — renderScadenzeAlert
- `29454` — _scadGestiti  (P144)
- `29464` — _scadPota  (P144)
- `29479` — _scadMigraDaLocalStorage  (P144)
- `29502` — segnaGestito
- `29519` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 29429-29504

- `29528` — ripristinaPaz
- `29536` — eliminaPaz
- `29581` — getDove
- `29585` — setDove
- `29603` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 29509-29947

- `29608` — getCredenzialiPersistenti
- `29621` — cancellaCredenzialiPersistenti
- `29626` — rinnovaSessioneConRefreshToken
- `29643` — getSessioneSalvata
- `29662` — salvaSessione
- `29672` — cancellaSessione
- `29676` — eseguiLogin
- `29723` — eseguiLogout
- `29745` — mostraApp
- `29750` — verificaSessioneEAvvia
- `29778` — assicuraTokenValido
- `29807` — _garantiscoSessionePerSync
- `29819` — avviaRinnovoTokenPeriodico
- `29823` — fermaRinnovoTokenPeriodico
- `29832` — _authReset
- `29837` — _authMostra
- `29840` — mostraLogin
- `29841` — mostraRegistrazione
- `29842` — mostraRecupero
- `29843` — mostraNuovaPassword
- `29846` — eseguiRegistrazione
- `29884` — eseguiRecuperoPassword
- `29913` — eseguiNuovaPassword
- `29947` — _parseHashParams
- `29954` — _pulisciHash
- `29958` — gestisciRitornoAuth
- `30046` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 30019-30142

- `30118` — apriPannelloRicette
- `30147` — chiudiPannelloRicette
- `30155` — applicaRicettaPasto
- `30191` — inizializzaP2
- `30203` — deepClone
- `30143` — applicaPatch
- `30219` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
