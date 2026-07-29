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
Righe 2455-2497

- `2455` — _slugAlimento
- `2463` — _catalogoIndicizza
- `2467` — _catalogoDeindicizza
- `2474` — costruisciCatalogo
- `2497` — risolviAlimento

---

### MACROS PIANO — calcolo e badge macro reali vs target
Righe 2512-2775

- `2512` — getValoriCREA
- `2524` — getCurrentPaziente
- `2544` — getKcalWeekend
- `2601` — getMacrosRicettaComposta
- `2607` — calcolaMacrosPiano
- `2709` — renderBadgeMacrosReali
- `2611` — pctStr
- `2612` — color
- `2625` — row
- `2775` — renderBadgeMacrosReali_DOM

---

### ANALISI DEL SANGUE — parsing, indici clinici derivati, interpretazione
Righe 3060-3247

- `3060` — _parseAnalisiNum
- `3068` — calcolaIndice
- `3221` — interpretaAnalisi
- `3233` — _interpAnalisiHtml
- `3247` — mostraInfoRange

---

### CONCETTI EDUCATIVI — sync Supabase, migrazione
Righe 3390-3414

- `3390` — pushConcetiSupabase
- `3400` — pullConcetiSupabase
- `3414` — migraConcetti

---

### ALIMENTI — categorie funzionali/semaforo, chip UI, equivalenze porzioni
Righe 3604-3959

- `3604` — getCategoriaSemaforo
- `3621` — _getCategorieGruppo
- `3635` — calcolaGrammaturaEquivalente
- `3675` — _gruppoEquiv  (P121: gruppo di equivalenza + criterio per categoria funzionale)
- `3681` — _porzioneStandard  (P121: porzione `g` di database dell'alimento)
- `3696` — suggerisciGrEquivalente  (P121: firma a 3 argomenti, il gruppo si deduce dai due alimenti)
- `3722` — _etichettaCriterio  (P121: ≈carbo / ≈prot / ≈grassi / fissa / porzione)
- `3737` — _promptAlternativeGrassi  (P121: riga del prompt AI generata dal motore)
- `3753` — ricalcolaAlternative  (P121: MOTORE UNICO, unico punto che scrive la grammatura di un'alternativa)
- `3772` — ricalcolaAlternativePiano  (P121: applica il motore a tutte le celle di un piano)
- `3821` — arrotondaGrammatura  (P121: sostituisce arrotondaPorzioneDiscreta — pezzi interi senza tetto / 5g)
- `3831` — getCategoriaFunzionale
- `3871` — catArr
- `3887` — _tagComuniTrova
- `3891` — getTagComuniChip
- `3894` — setTagComuniChip
- `3902` — setCatChips
- `3915` — getStagioniChip
- `3918` — setStagioniChip
- `3925` — getProfiloChip
- `3928` — setProfiloChip
- `3937` — wireChipGroup
- `3948` — wireAttrChipGroups
- `3959` — wireRadioChipGroup

---

### CONFIG / STORAGE LOCALE — cfg, localStorage db, util data/valuta
Righe 3987-4366

- `3987` — getCfg
- `3988` — saveCfgL
- `3989` — getUrl
- `3990` — saveLocal
- `3991` — loadLocal
- `4002` — uid
- `4003` — today
- `4004` — addDays
- `4005` — fData
- `4006` — fEur
- `4008` — getLastSyncText
- `4018` — getSyncColor
- `4026` — aggiornaStatoSync
- `4052` — setSyncStatus
- `4320` — _registraTombstone
- `4328` — _tombstoneAttivi
- `4340` — _fondiTombstones
- `4354` — _mergeTombstonesRemoti *(dal 24/7 legge il meta da `collections`, P74 1d)*
- `4366` — _applicaTombstones
- `4227` — _pazFetchMeta *(P74 1d — solo `collections`)*
- `4248` — _collectionsUpsert *(P74 — scrittura primaria dei 4 meta-record dal cutover 1d)*
- `4270` — _collectionsFetch *(P74 1d — lettura unica dei meta-record)*
- `4293` — _analisiSangueUpsert *(P74 fase 2 — scrittura ombra analisi del sangue, 24/7)*

---

### SYNC SUPABASE — push/pull ricette/pazienti, tombstones, conflitti (P69)
Righe 4390-4775

- `4390` — supaHeaders
- `4404` — pushRicetteSupabase
- `4429` — pullRicetteSupabase
- `4451` — delRicetteSupabase
- `4463` — delPazienteSupabase
- `4478` — pushToSheets
- `4522` — pullFromSheets
- `4601` — syncNow
- `4614` — sincronizzaTutto
- `4360` — stpSet
- `4365` — stpMsg
- `4745` — testConnSupabase
- `4775` — _p68LogSaveAnonimo

---

### SYNC SUPABASE — save paziente, piani/cache piano, entrate, eventi
Righe 4789-5305

- `4789` — save
- `4807` — _pushRigaPerId
- `4840` — _flushDirtyIds
- `4923` — _p69LoadBaseline
- `4926` — _p69StoreBaseline
- `4929` — _p69SetBaseline
- `4933` — _p69DropBaseline
- `4937` — _p69SetBaselineFromRows
- `4943` — _p69NomePaz
- `4948` — _p69InList
- `4956` — _p69RilevaConflitti
- `4992` — _p69DialogoConflitti
- `4738` — chiudi
- `5026` — _p69RisolviRicarica
- `5055` — _p69EsportaLocali
- `5068` — _p69RisolviSovrascrivi
- `5081` — pushPianoSupabase
- `5103` — pullPianiSupabase
- `5119` — delPianoSupabase
- `5135` — delPianiPazienteSupabase
- `5147` — pushCachePianoSupabase
- `5164` — caricaCachePianoSupabase
- `5186` — pushEntrateSupabase
- `5210` — pullEntrateSupabase
- `5224` — delEntrataSupabase
- `5232` — pushEntrataSupabase
- `5243` — pushEventoSupabase
- `5256` — pushEventiSupabase
- `5280` — pullEventiSupabase
- `5294` — delEventoSupabase
- `5305` — _pianoCacheKey

---

### UI GENERALE — config AI key, notifiche, navigazione (goTo/tab/modali)
Righe 5336-5448

- `5336` — _salvaPianoCache
- `5341` — _caricaPianoCache
- `5347` — salvaCfg
- `5348` — testConn
- `5355` — testaAntKey
- `5366` — initAntCard
- `5369` — esporta
- `5370` — importa
- `5375` — goTo
- `5392` — closeM
- `5400` — ngChiudiModale
- `5409` — ngChiudiPopupCoppia
- `5413` — ngAggiungiX
- `5424` — ngUpgradeModali
- `5444` — mTab
- `5445` — aggiornaEta
- `5446` — toggleOrarioNote
- `5447` — pdTab
- `5448` — notif

---

### PAZIENTI — registro: lista/card/kanban, apertura, editing, salvataggio, routine
Righe 5456-8222

- `5456` — getPazView
- `5457` — setPazView
- `5466` — _pazStatoPiano
- `5474` — _pazUrgenzaControllo
- `5481` — _pazStatoTagHtml
- `5490` — _pazAggiornaFiltroRegimi
- `5498` — renderPaz
- `5551` — _renderPazCard
- `5576` — _renderPazLista
- `5603` — _renderPazKanban
- `5641` — openNuovoPaz
- `5667` — editPaz
- `5745` — REGOLE_SEMAFORO_ALIMENTI *(15 condizioni cliniche → grigi/celesti; globale dal 26/7 per essere verificabile dal test)*
- `6192` — _SEM_COLORI_LEGACY / `6105` _SEM_COLORI_AUTO *(F9 — unico vocabolario dei colori automatici)*
- `6197` — NOMI_CONDIZIONE_SEMAFORO *(etichette delle 15 condizioni, usate anche dal riquadro della scheda)*
- `6219` — _semaforoCondizioniAttive *(le condizioni spuntate su un paziente)*
- `6230` — _semaforoMigraPaziente *(F9 — toglie i colori legacy e ricalcola; idempotente)*
- `6241` — _semaforoMigraTutti *(passata su tutti i pazienti in memoria, con conteggio)*
- `6252` — applicaRegoloSemaforo *(dal 26/7 pulisce TUTTI e sei i colori automatici, non solo i suoi due)*
- `6340` — trovaChiaveAlimento *(match esatto sul nome: se non trova, la regola è ignorata in silenzio — vedi test s2-regole-nomi-alimenti)*
- `6364` — _pazNumOPrec *(F7 — campo assente = valore precedente, non azzeramento)*
- `6376` — _pazPreservaCampi *(F5 — l'anagrafica non cancella i campi che il form non gestisce)*
- `6382` — salvaPaz
- `6458` — openPaz
- `7909` — renderPdRoutine
- `6723` — cardHTML
- `8051` — updateRoutineCampo
- `8059` — suggerisciPastoEQuando
- `8086` — filtroLibreria
- `8095` — renderLibreriaGrid
- `8116` — aggiungiDaLibreriaIdx
- `8140` — openModalRoutine
- `8147` — salvaRoutineVoce
- `8172` — salvaRoutine
- `8179` — mostraRoutinePopup
- `8207` — removeRoutineVoce
- `8222` — _renderAggiustamentiSection

---

### 📈 PERCORSO — timeline di periodizzazione (P115 Tappe 1-5 COMPLETE, 24 lug 2026)
Righe 6021-6621 (numeri ESATTI al 24/7 notte, dopo la Tappa 5). ⚠️ Questo blocco (~600 righe) fa slittare tutti i numeri delle sezioni SUCCESSIVE a riga ~6020 rispetto all'ultima rigenerazione completa: per quelle sezioni fare grep di conferma. Rigenerazione completa alla prossima modifica strutturale.

- `6503` — _PERCORSO_TIPI (const: tipi fase, colori, pct default)
- `6510` — _percorsoGet *(normalizza p.percorso, scarta fasi invalide)*
- `6532` — _percorsoIsoLocal *(data → YYYY-MM-DD LOCALE, mai toISOString/UTC)*
- `6538` — _percorsoIntervalli *(fasi consecutive → date concrete dal/al)*
- `6552` — _percorsoFaseAt *(fase attiva a una data; dal incluso, al escluso)*
- `6561` — _percorsoKcalFase *(pct → kcal indicative via calcolaTDEE)*
- `6584` — _percorsoProiezione *(Tappa 2 — proiezione ibrida teorica/calibrata, cono, obiettivo a intervallo)*
- `6642` — _percorsoDataBreve *(ISO → "12 set")*
- `6659` — _percorsoSerieEnergia *(Tappa 3 — serie introito/TDEE stimato/TDEE osservato per la corsia energia)*
- `6698` — _percorsoSerieMassaMagra *(Tappa 4 — solo InBody: punti {data,m,pg})*
- `6717` — _percorsoConsuntivo *(Tappa 5 — legge p.consuntivo scritto da P50: aderenza, extra kcal, ritardo=extra÷7700, settimane perse; oggi sempre ok:false)*
- `6759` — _PERCORSO_LAYERS_DEFAULT / _percorsoLayersState / _percorsoLayersGet *(Tappa 4 — stato interruttori, SOLO sessione, mai su p)*
- `6764` — percorsoLayerToggle *(Tappa 4 — inverte un solo strato)*
- `6770` — percorsoVistaPreset *(Tappa 4 — preset "tecnica"/"paziente")*
- `6786` — _percorsoPaz *(e a seguire i mutatori percorsoInit/SetInizio/AddFase/UpdFase/DelFase/MoveFase)*
- `6842` — _PERCORSO_MODELLI / _PERCORSO_GEN *(P122 T3 — 4 modelli + regole dei cicli)*
- `6860` — _percorsoGeneraFasi *(P122 T3 — pura: dal traguardo alle fasi, ritmo = quello della proiezione)*
- `6940` — _percorsoModelloSelectHtml
- `6949` — percorsoGeneraDaModello *(propone; conferma prima di sostituire fasi esistenti)*
- `6972` — _percorsoShiftGiorni *(pura: ancora = ultima pesata)*
- `6982` — percorsoRiallinea *(⏩ trasla il piano, riprende dal giorno-fase dell'interruzione)*
- `7009` — _TRG_TIPI / `6744` _TRG_COMPORTAMENTI *(P122 T4 — tipi di traguardo e libreria comportamenti)*
- `7031` — _traguardiGet · `6761` _traguardoValoreAttuale *(valore corrente dai dati esistenti, null se manca)*
- `7070` — _traguardoVerso *(auto: dedotto dalla partenza)* · `6803` _traguardoValuta · `6824` _traguardiValuta
- `7111` — traguardoAdd · `6852` traguardoUpd · `6867` traguardoDel · `6873` traguardoSegna
- `7169` — _COND_TIPI · `6897` _percorsoCondizione *(pura: la fase finisce per soglia — SOLO suggerimento)*
- `7185` — percorsoSetCondizione · `6927` percorsoChiudiFase *(esito fotografato, riapribile)*
- `7219` — _traguardiHtml *(blocco 🏁 in fondo alla scheda Percorso)*
- `7317` — _percorsoVistaPaz / `7049` _percorsoVistaPazAttiva *(P122 T5 — modalità di sessione)*
- `7324` — _percorsoVittorie *(pura: vittorie dall'inizio del percorso + flag ricomposizione)*
- `7362` — _percorsoNascondiPeso *(in fase di massa il peso non si mostra al paziente)*
- `7373` — _traguardoFaseCorrente *(traguardo della fase IN CORSO, non quello lontano)*
- `7401` — _traguardoTestoPaziente *(righe in italiano semplice, riusate dal messaggio WhatsApp)*
- `7434` — _vistaPazienteHtml *(i tre riquadri che guarda il paziente)*
- `7514` — _percorsoChartSvg *(due corsie: peso + massa magra + cono proiezione sopra, striscia aderenza in mezzo (solo con dati P50), energia (kcal) sotto — tutto gated dagli interruttori)*
- `7703` — renderPdPercorso *(scheda: badge fase, riga proiezione/obiettivo, riga Piano vs Realtà (solo con dati), toolbar interruttori, grafico, editor)*

*(Tappa 2 tocca anche `calcolaMacros`: box obiettivo con intervallo al posto della data secca.)*

---

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 8307-8478

- `8307` — salvaAggiustamento
- `8340` — eliminaAggiustamento
- `8349` — renderPdNote
- `8384` — salvaNotaClinica
- `8399` — deleteNota
- `8408` — saveNote
- `8428` — resetSemaforoAuto *(F9 — pulsante 🔄 Ricalcola: pulisce gli automatici e rifà col sistema valido; il motore LEGACY non esiste più)*
- `8478` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 8704-8902

- `8704` — avviaFX
- `8732` — avviaAnalisi
- `8749` — _renderFlussoPanel
- `8793` — _riepEsc
- `8797` — _riepNum
- `8803` — _riepDelta
- `8811` — _riepDataSig
- `8829` — _riepParseFX
- `8087` — clean
- `8843` — _riepAggiornaFX
- `8869` — _riepToggleDomandaDefault
- `8881` — _riepAddDomanda
- `8894` — _riepRemoveDomanda
- `8902` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 9114-9341

- `8218` — dCol
- `8336` — card
- `9114` — renderPdRagionamento
- `9202` — inviaMessaggioRag
- `9220` — concludiERiassumi
- `9234` — salvaRagionamento
- `9255` — apriGeneratoreDaRag
- `9263` — nuovaSessioneRag
- `9269` — cancellaSavedRag
- `9279` — renderPazTimeline
- `9311` — renderPdAnamnesi
- `9341` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 11240-12375

- `11240` — _anNorm *(P125 — testo confrontabile: minuscole, niente accenti)*
- `11246` — _anCorrisponde *(P125 — ricerca per parole-prefisso: "vit d" trova "Vitamina D")*
- `11252` — filtraAnalisi *(P125 — filtro dal vivo delle 119 voci)*
- `11286` — pulisciRicercaAnalisi
- `11292` — renderPdAnalisi
- `11348` — toggleAnalisiSection
- `11497` — loadAnalisiSanguePDF
- `11384` — _impPdfConfigurata
- `11385` — _impPdfLib
- `11395` — _impPdfApri
- `11408` — _impPdfPagina *(P124b — una pagina del PDF → immagine, con la rotazione RILEVATA, non quella dichiarata dal file)*
- `11429` — _impRuotaImmagine
- `11454` — _impRilevaRotazione *(P124b — chiamata piccola: di quanti gradi va girata la pagina)*
- `11473` — _impPromptPagina *(P124b — prompt di UNA pagina, con l'impronta della riga: valore+unità+riferimento)*
- `11672` — _impNormalizzaNumero *(P124 — numero all'italiana → punto decimale, conversione fatta dall'app e non dall'AI)*
- `11683` — _impNumeri
- `11691` — _impSembraIntervallo
- `11699` — _impUgualeAlRange
- `11708` — _impLimitiStd
- `11729` — _impFuoriScala
- `11738` — _impCorrezioneVirgola
- `11750` — _impTestoLimiti
- `11771` — _impRifPlausibile *(P124b — un "riferimento" che è un'unità di misura = riga disallineata)*
- `11784` — _impUnitaCanonica
- `11806` — _impStessaGrandezza *(P124b — stesso tipo di misura a meno del prefisso: nanomoli/micromoli/millimoli)*
- `11823` — _impUnitaCompatibili
- `11834` — _impControllaValore *(P124 — i controlli anti-errore su un valore estratto)*
- `11898` — mostraDiffAnalisi *(P124 — colonna Estratto modificabile + righe sospette deselezionate)*
- `12088` — _calcoloIncluso
- `12094` — toggleCalcoloIncluso
- `12116` — _renderCalcoliPannello
- `12157` — toggleGlossario
- `12162` — updateAnalisi
- `12221` — salvaAnalisi
- `12234` — applicaGruppoClinico
- `12263` — renderBoxGruppiCliniciSuggeriti
- `12295` — suggerisciGruppiClinici
- `12375` — renderMemoriaInbody

---
### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9176 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `9471` — _richVal
- `9478` — _richBmi
- `9483` — _richPat
- `9489` — _richNum
- `9534` — _richPreselezione
- `9550` — richLeggiIntestazione
- `9554` — richSalvaIntestazione
- `9563` — apriRichiestaAnalisi
- `9583` — _richModaleHtml
- `9659` — _richEsc
- `9661` — _richMotivoCambia
- `9667` — _richToggleSez
- `9673` — _richAggiornaConteggi
- `9681` — _richMotivoCorrente
- `9691` — _richSelezione
- `9706` — _richTxt
- `9712` — _richCostruisciPDF
- `8969` — nuovaPagina
- `8970` — spazio
- `9808` — _richNomeFile
- `9813` — _richPrepara
- `9826` — _richRegistra
- `9831` — _richStato
- `9833` — richScaricaPDF
- `9882` — _richUpload
- `9884` — _richWaUrl
- `9891` — _richTestoWa
- `9905` — richInviaWhatsApp
- `9945` — richCopiaLink
- `9966` — _richStoricoHtml

---
### REFERTI DEL SANGUE DATATI — storico nel tempo (P118 tappa 1)
Righe 9194-9387 — migrazione, ordinamento, quadro attuale derivato, barra di selezione.

- `11017` — _refertoNuovoId
- `11020` — _refertoOggi
- `11024` — _refertoDataIt
- `11030` — _refertoConteggio
- `11044` — _refertiMigra
- `11071` — _refertiOrdinati
- `11082` — _refertoPiuRecente
- `11087` — _refertoInVista
- `11105` — _refertiApplica
- `11118` — _refertoCrea
- `11137` — refertoCambiaVista
- `11143` — refertoCambiaData
- `11155` — refertoNuovo
- `11163` — refertoDuplica
- `11172` — refertoElimina
- `11187` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `10630` — _rangeNum
- `10636` — _rangeTestoDa
- `10655` — _rangeCoppia
- `10665` — _rangeHtml

---
### ANDAMENTO NEL TEMPO — tracciato, variazione, grafico grande (P118 tappa 3)
Righe 9441-9745 — serie storica, regola del colore, sparkline, pannello in fondo.

- `10707` — _andLimiti
- `10728` — _andParseRangeLab
- `10741` — _andDistanza
- `10748` — _andValutazione
- `10761` — _andSerie
- `10775` — _andNum
- `10779` — _andDataBreve
- `10784` — _andMeseAnno
- `10792` — _andDominio
- `10806` — _andColore
- `10819` — _andSparkHtml
- `10845` — _andRigaHtml
- `10867` — _andEsamiSeguibili
- `10875` — andScegliEsame
- `10881` — _andPannelloHtml
- `10934` — _andGraficoGrande
- `10985` — _andPasso

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 12425-13633

- `12425` — _ibFmtBreve
- `12434` — _renderPesiIntermediSection
- `12483` — aggiungiPesoIntermedio
- `12499` — eliminaPesoIntermedio
- `12509` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `13633` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 13910-13910

- `13910` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 14288-16829

- `14288` — aggiornaLabelMacros
- `14306` — calcolaMacros
- `14447` — applicaSchema
- `14482` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `14488` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `14510` — _misuraDaReferto *(P127 — UN referto letto con le regole del traguardo: usata anche dalla verifica al controllo)*
- `14543` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `14554` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `14572` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `14685` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `14699` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `14755` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `14769` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `14801` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `14834` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `14876` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `14884` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `14895` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `14922` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `14937` — _stradeVerso *(le strade complete + percentuale libera)*
- `14984` — _VC_TOLLERANZA_PCT / _VC_GIORNI_MIN / _VC_GIORNI_MIN_RITARO / _VC_COPERTURA_MIN_PCT / _VC_MAGRA_PRUDENZA_GG *(P127 — soglie cliniche della verifica)*
- `14994` — _mediaSlotPrescritta *(media pesata sui giorni di un campo dello storico target; la usa anche _kcalMediaPrescrittaOss)*
- `15014` — _vcDeficitSlot *(deficit di uno slot: campo offset o kcal−tdee per gli slot vecchi)*
- `15022` — _vcTratto *(P127 — cosa è cambiato fra due referti, previsto vs reale, TDEE misurato)*
- `15076` — _vcTraguardoSalvato *(traguardo ricostruito dal salvato, per la scheda Percorso)*
- `15086` — _verificaControllo *(P127 — motore puro: tratto recente, quadro dall'inizio, residuo al ritmo reale)*
- `15124` — _verificaControlloHtml *(blocco 🔎, unica fonte per pannello 🎯 e scheda Percorso; azioni solo dove c'è il campo kcal)*
- `15216` — _vcRitara *(scrive le kcal ritarate nel campo regime: propone, non salva)*
- `15229` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `15297` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `15319` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `15372` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `15479` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `15494` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `15519` — _renderRifPesoBox
- `15570` — _usaRifPeso
- `15574` — _aggiornaRifPesoTarget
- `15577` — _aggiornaRegimeSlider
- `16234` — _presetRegime
- `16238` — _initRegimeSliderDaPaziente
- `16256` — ricalcolaLAF
- `16390` — renderStoricoTDEE
- `16424` — attivaSlotTDEE
- `16432` — eliminaSlotTDEE
- `16445` — _toggleCiclizzazione
- `16451` — _aggiornaAnteprimaCiclizzazione
- `16469` — salvaCalcoloMacros
- `16583` — _metAllenamento
- `16599` — _neatFrazione
- `16673` — _larnLafStileVita
- `16690` — _regimeOffset
- `16700` — _componiRegimeText
- `16733` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `16745` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `16752` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `16829` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 16847-17277

- `16847` — renderTargetBadge
- `16876` — verificaRegola_75_20_5
- `16913` — renderBadge75_20_5
- `16978` — _validaNorm
- `16981` — _validaMatchTermine
- `16989` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `17040` — _validaTesto
- `17061` — validaPiano
- `17135` — _validaFirmaBlocchi
- `17142` — renderBadgeValidatore
- `17173` — _validaVaiAlGiorno
- `17182` — apriPannelloValidatore
- `13472` — esc
- `17239` — _validaEseguiOverride
- `17262` — validaGateExport
- `17277` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 17410-18042

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
- `17410` — pianoPazSelezionato
- `17557` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `17795` — renderPanelMacrosGiorno
- `17938` — pmgCambiaGrammi
- `17965` — riapriPiano
- `18003` — _montaPianoCorrente
- `18042` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 18052-18521

- `18052` — pullTemplateSupabase
- `18063` — delTemplateSupabase
- `18072` — _promptTemplateNome
- `18097` — _creaTemplateDaJSON
- `18120` — salvaComeTemplate
- `18131` — salvaComeTemplateDaPiano
- `18140` — _normNomeAlim
- `18141` — _escRegAlim
- `18142` — _raccogliAlimentiDaPiano
- `18153` — _alimentiEsclusiPaziente
- `18165` — _trovaConflittiTemplate
- `18183` — _mostraAvvisoConflitti
- `18207` — applicaTemplate
- `18225` — apriPickerTemplate
- `18253` — _pickPaziente
- `18272` — applicaTemplatePick
- `18276` — rinominaTemplate
- `18287` — eliminaTemplate
- `18297` — renderLibreriaTemplate
- `18326` — renderStoricoPiani
- `18385` — eliminaPiano
- `18401` — _getActiveMacrosTarget
- `18425` — getTargetAttivi
- `18462` — calcolaTargetsCiclizzazione
- `18488` — _setupPianoTargets
- `18512` — getStagioneCorrente
- `18521` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 18983-18983

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `18983` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 18992-19451

- `18992` — aggiornaUIcolazione
- `19002` — salvaRegolePiano
- `19063` — _isModelloSistema
- `19066` — _isModelloSistemaModificato
- `19078` — caricaModelliCustomLocal
- `19092` — salvaModelliCustomLocal
- `19113` — _migraRecordCustom
- `19128` — _syncAliasLegacy
- `19137` — caricaAlimentiCustom
- `19161` — pushAlimentiCustomSupabase
- `19171` — pullAlimentiCustomSupabase
- `19185` — pushModelliSupabase
- `19203` — pullModelliSupabase
- `19228` — _calcolaFreqDaModello
- `19247` — aggiornaUImodello
- `19336` — popolaDropdownModelli
- `19364` — cambiaModelloRotazione
- `19370` — ripristinaModelloOriginale
- `19393` — eliminaModelloCustom
- `19411` — mostraAnteprimaModello
- `19421` — apriEditorModello
- `19451` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 19720-19958

- `15738` — rerender
- `19720` — _salvaModelloDaEditor
- `19762` — caricaRegolePiano
- `19792` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `19827` — _aiLogUsage
- `19849` — _aiProxyUrl
- `19855` — _aiTokenPerProxy
- `19884` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `19958` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 20037-20177

- `16216` — _risolviCollisioniCelle
- `20037` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `20097` — getFruttaStile
- `20104` — _fruttaGetPasto
- `20114` — _fruttaContaRigheRicetta
- `20118` — _fruttaIndiceBasePasto
- `20138` — getFruttaMarker
- `20151` — fruttaMarkerHtml
- `20159` — _fruttaCheckboxHtml
- `20168` — toggleFrutta
- `20177` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 20213-21487

- `20213` — _renderCelleGriglia
- `20293` — _renderRicetteTestuali
- `20332` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `20403` — _renderCelleHtml
- `20411` — toggleCellaMenu
- `20430` — closeAllCellaMenus
- `20438` — _trovaPasto
- `20446` — cellaSposta
- `20500` — cellaCancella
- `20521` — apriEditGrammatura
- `16789` — salva
- `20569` — cellaSwap
- `20589` — cellaRimuoviAlt
- `20603` — cellaAggiungiAlt
- `20706` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `20791` — apriEditRicetta
- `20800` — aggiungiRicetta
- `20816` — rimuoviRicetta
- `20825` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `20987` — ngAggiungiSpuntinoVuoto
- `21003` — apriAggiungiCella
- `17254` — risolviCompatibili
- `21099` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `21191` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `21332` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `21487` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 21535-21927

- `21535` — _attesoStrutturaPiano
- `21555` — _confrontaStrutturaPiano
- `21585` — _costruisciPromptDelta
- `21612` — _pianoToolSchema
- `21687` — _pianoMaxTokens
- `21696` — _estraiPianoDaRisposta
- `21718` — chiamaGeneraPiano
- `21885` — mostraLoadingSteps
- `18123` — render
- `21927` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 21994-22571

- `21994` — generaMessaggioAI
- `22099` — copiaMessaggioAI
- `22109` — salvaInStorico
- `22121` — salvaVarianteAI
- `22136` — renderVariantiSalvate
- `22155` — usaVariante
- `22173` — eliminaVariante
- `22184` — renderStoricoMsg
- `22200` — apriWhatsApp
- `22571` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 22749-24246

- `22749` — _ngColoreSemaforoNome
- `22757` — apriSceltaModalitaPiano
- `22792` — _ngChiudiModalita
- `22795` — _ngCostruisciGiornoVuoto
- `22828` — _ngCostruisciGiornoSpeciale
- `22839` — _ngIndiceInizioSpeciali
- `22850` — _ngModalitaNomeGiorno
- `22856` — _ngImpostaModalitaNomeGiorno
- `22859` — _ngLettera
- `22866` — _ngEtichettaGiorno
- `22886` — _ngEtichettaGiornoBreve
- `22900` — _ngToggleGiornoSpeciale
- `22924` — _ngRenderPannelloSpeciale
- `22992` — _generaGiornoSpecialeAI
- `23092` — _ngGiornoHaContenuto
- `23104` — _ngCreaPianoManuale
- `23127` — _ngScrollTabGiorni
- `23137` — _ngAbilitaDragScroll
- `23174` — _ngCambiaNumeroGiorni
- `23206` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `23220` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `23261` — _ngToggleCat
- `23270` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `23294` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `23450` — _ngSalvaPianoManuale
- `23476` — _ngParseIngrediente
- `23500` — _ngScomponiIngredienti
- `23512` — _ricCalcolaMacroDaIngredienti
- `23530` — _ricRicalcolaMacroLive
- `23537` — _ricAggiornaInfoMacro
- `23551` — _ricRicalcolaMacroLiveNow
- `23575` — _ngTrovaCategoriaAlimento
- `23608` — _ngPescaRicetta
- `23651` — _ngScomponiRicettaNelPasto
- `23688` — _ngDragStart
- `23699` — _ngDragStartCella
- `23710` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `23717` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `23722` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `23741` — _ngAggiungiAlimento
- `23766` — _ngRimuoviAlimento
- `23780` — _ngDopoModifica
- `23798` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `23851` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `23880` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `23897` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `23905` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `23977` — gramTestoCasalingo
- `24003` — _appendToggleNutrizionali
- `24046` — _appendTogglePromemoria
- `24075` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `24221` — cpFromEmoji
- `24227` — getEmojiCp
- `24246` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `22221` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `22243` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `22248` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `22274` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `22362` — _spesaTestoWhatsApp
- `22378` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `22423` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `22446` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `22474` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `22534` — scaricaListaSpesaPDF (download diretto, un click)
- `22542` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `22554` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 25394-25394

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
- `25394` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 25406-25613

- `25406` — salvaInbody
- `25471` — delInbody
- `25478` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `25613` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 25641-26110

- `25641` — buildSemLegenda
- `25655` — renderAlEditor
- `25716` — _alimNomeRegex
- `25724` — _alimGiorniDaPiano
- `25732` — _scanGiorniPerNome
- `25747` — scanRiferimentiAlimento
- `25776` — _alimRefsRighe
- `25782` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `25870` — modificaAlimentoCustom
- `25890` — ripristinaValoriPrecedentiAlimento
- `25902` — _resetAlimModal
- `25913` — apriNuovoAlimentoCustom
- `25919` — salvaAlimentoCustom
- `25986` — eliminaAlimentoCustom
- `26017` — _alimFonteBadge
- `26022` — renderAlimentiPage
- `22217` — E
- `26092` — archiviaAlimentoCustom
- `26110` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 26137-26374

- `26137` — _bcSetStatus
- `26139` — apriScannerBarcode
- `26147` — chiudiScannerBarcode
- `26152` — _bcStopCamera
- `26160` — _bcModaleAperto
- `26162` — _bcAvviaCamera
- `26173` — _bcAvviaNativo
- `26193` — _bcAvviaZXing
- `26202` — _bcZXStart
- `26213` — _bcErroreCamera
- `26221` — cercaBarcodeManuale
- `26227` — _barcodeTrovato
- `26243` — cercaBarcodeOFF
- `26261` — _bcProdottoNonTrovato
- `26275` — _bcPrecompilaForm
- `22477` — num
- `26299` — togAl
- `26352` — selCatAl
- `25402` — selTuttiAl
- `26374` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 26388-26704

- `26388` — setCalView
- `26389` — calPrev
- `26390` — calNext
- `26391` — calToday
- `26393` — renderCal
- `26407` — renderCalMonth
- `26431` — renderCalWeek
- `26449` — renderCalDay
- `26465` — selGiorno
- `26479` — setDisp
- `26484` — openAddEvento
- `26497` — openAddEventoPaz
- `26503` — toggleEntrataCheck
- `26508` — salvaEvento
- `26531` — openEvDetail
- `26586` — delEvento
- `26594` — copyMsg
- `26601` — aggDateCal
- `26606` — syncInizio
- `26607` — syncControllo
- `26608` — aggiornaPrev
- `26625` — renderRic
- `26652` — openNuovaRic
- `26653` — editRic
- `26663` — salvaRic
- `26688` — delRic
- `26704` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 26789-26849

- `26789` — aggiungiEntrataPerPaziente
- `26806` — openNuovaEntrata
- `26820` — salvaEntrata
- `26841` — delEntrata
- `26849` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 26879-27349

- `26879` — aiSuggerisciRicetta
- `26924` — renderConcettiModal
- `26943` — apriConcettiModal
- `26970` — salvaConcettiAllegati
- `26994` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `27032` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `27041` — loadInbodyPDF
- `27159` — _vitdLabel
- `27163` — getIntegratori
- `27167` — getIntegraWant
- `27171` — setIntegratori
- `27188` — setIntegraWant
- `27226` — getPatologieChip
- `27227` — getAllergieChip
- `27228` — setPatologieChip
- `27229` — setAllergieChip
- `27230` — getPatologie
- `27231` — getAllergie
- `27232` — setPatologieFromStr
- `27239` — setAllergieFromStr
- `27252` — getSdvChip
- `27253` — getCspChip
- `27254` — setSdvChip
- `27255` — setCspChip
- `27256` — setSdvFromStr
- `27257` — setCspFromStr
- `27261` — getBudget
- `27262` — setBudget
- `27267` — renderCalAnno
- `27298` — comprimeImmagine
- `27320` — uploadImmagineConcetto
- `27339` — rimuoviImmagineConcetto
- `27349` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 27415-27519

- `27415` — entraSelConcetti
- `27416` — annullaSelConcetti
- `27417` — toggleConcettoSel
- `27422` — eliminaConcettiSelezionati
- `27441` — confermaEliminaConcetti
- `27456` — aiRiscriviConcetto
- `27470` — editConcetto
- `27488` — salvaConcetto
- `27499` — openNuovoConcetto
- `27519` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 27520-27683

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
- `27683` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 27809-28013

- `27809` — renderScadenzeAlert
- `27994` — segnaGestito
- `28013` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 28022-28097

- `28022` — ripristinaPaz
- `28030` — eliminaPaz
- `28075` — getDove
- `28079` — setDove
- `28097` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 28102-28542

- `28102` — getCredenzialiPersistenti
- `28115` — cancellaCredenzialiPersistenti
- `28120` — rinnovaSessioneConRefreshToken
- `28137` — getSessioneSalvata
- `28156` — salvaSessione
- `28166` — cancellaSessione
- `28170` — eseguiLogin
- `28217` — eseguiLogout
- `28239` — mostraApp
- `28244` — verificaSessioneEAvvia
- `28272` — assicuraTokenValido
- `28301` — _garantiscoSessionePerSync
- `28313` — avviaRinnovoTokenPeriodico
- `28317` — fermaRinnovoTokenPeriodico
- `28326` — _authReset
- `28331` — _authMostra
- `28334` — mostraLogin
- `28335` — mostraRegistrazione
- `28336` — mostraRecupero
- `28337` — mostraNuovaPassword
- `28340` — eseguiRegistrazione
- `28378` — eseguiRecuperoPassword
- `28407` — eseguiNuovaPassword
- `28441` — _parseHashParams
- `28448` — _pulisciHash
- `28452` — gestisciRitornoAuth
- `28542` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 28614-28737

- `28614` — apriPannelloRicette
- `28643` — chiudiPannelloRicette
- `28651` — applicaRicettaPasto
- `28687` — inizializzaP2
- `28699` — deepClone
- `28703` — applicaPatch
- `28737` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
