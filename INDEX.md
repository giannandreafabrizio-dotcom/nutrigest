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
Righe 2425-2467

- `2425` — _slugAlimento
- `2433` — _catalogoIndicizza
- `2437` — _catalogoDeindicizza
- `2444` — costruisciCatalogo
- `2467` — risolviAlimento

---

### MACROS PIANO — calcolo e badge macro reali vs target
Righe 2482-2745

- `2482` — getValoriCREA
- `2494` — getCurrentPaziente
- `2514` — getKcalWeekend
- `2571` — getMacrosRicettaComposta
- `2577` — calcolaMacrosPiano
- `2679` — renderBadgeMacrosReali
- `2611` — pctStr
- `2612` — color
- `2625` — row
- `2745` — renderBadgeMacrosReali_DOM

---

### ANALISI DEL SANGUE — parsing, indici clinici derivati, interpretazione
Righe 3030-3217

- `3030` — _parseAnalisiNum
- `3038` — calcolaIndice
- `3191` — interpretaAnalisi
- `3203` — _interpAnalisiHtml
- `3217` — mostraInfoRange

---

### CONCETTI EDUCATIVI — sync Supabase, migrazione
Righe 3360-3384

- `3360` — pushConcetiSupabase
- `3370` — pullConcetiSupabase
- `3384` — migraConcetti

---

### ALIMENTI — categorie funzionali/semaforo, chip UI, equivalenze porzioni
Righe 3574-3929

- `3574` — getCategoriaSemaforo
- `3591` — _getCategorieGruppo
- `3605` — calcolaGrammaturaEquivalente
- `3645` — _gruppoEquiv  (P121: gruppo di equivalenza + criterio per categoria funzionale)
- `3651` — _porzioneStandard  (P121: porzione `g` di database dell'alimento)
- `3666` — suggerisciGrEquivalente  (P121: firma a 3 argomenti, il gruppo si deduce dai due alimenti)
- `3692` — _etichettaCriterio  (P121: ≈carbo / ≈prot / ≈grassi / fissa / porzione)
- `3707` — _promptAlternativeGrassi  (P121: riga del prompt AI generata dal motore)
- `3723` — ricalcolaAlternative  (P121: MOTORE UNICO, unico punto che scrive la grammatura di un'alternativa)
- `3742` — ricalcolaAlternativePiano  (P121: applica il motore a tutte le celle di un piano)
- `3791` — arrotondaGrammatura  (P121: sostituisce arrotondaPorzioneDiscreta — pezzi interi senza tetto / 5g)
- `3801` — getCategoriaFunzionale
- `3841` — catArr
- `3857` — _tagComuniTrova
- `3861` — getTagComuniChip
- `3864` — setTagComuniChip
- `3872` — setCatChips
- `3885` — getStagioniChip
- `3888` — setStagioniChip
- `3895` — getProfiloChip
- `3898` — setProfiloChip
- `3907` — wireChipGroup
- `3918` — wireAttrChipGroups
- `3929` — wireRadioChipGroup

---

### CONFIG / STORAGE LOCALE — cfg, localStorage db, util data/valuta
Righe 3957-4336

- `3957` — getCfg
- `3958` — saveCfgL
- `3959` — getUrl
- `3960` — saveLocal
- `3961` — loadLocal
- `3972` — uid
- `3973` — today
- `3974` — addDays
- `3975` — fData
- `3976` — fEur
- `3978` — getLastSyncText
- `3988` — getSyncColor
- `3996` — aggiornaStatoSync
- `4022` — setSyncStatus
- `4290` — _registraTombstone
- `4298` — _tombstoneAttivi
- `4310` — _fondiTombstones
- `4324` — _mergeTombstonesRemoti *(dal 24/7 legge il meta da `collections`, P74 1d)*
- `4336` — _applicaTombstones
- `4197` — _pazFetchMeta *(P74 1d — solo `collections`)*
- `4218` — _collectionsUpsert *(P74 — scrittura primaria dei 4 meta-record dal cutover 1d)*
- `4240` — _collectionsFetch *(P74 1d — lettura unica dei meta-record)*
- `4263` — _analisiSangueUpsert *(P74 fase 2 — scrittura ombra analisi del sangue, 24/7)*

---

### SYNC SUPABASE — push/pull ricette/pazienti, tombstones, conflitti (P69)
Righe 4360-4745

- `4360` — supaHeaders
- `4374` — pushRicetteSupabase
- `4399` — pullRicetteSupabase
- `4421` — delRicetteSupabase
- `4433` — delPazienteSupabase
- `4448` — pushToSheets
- `4492` — pullFromSheets
- `4571` — syncNow
- `4584` — sincronizzaTutto
- `4360` — stpSet
- `4365` — stpMsg
- `4715` — testConnSupabase
- `4745` — _p68LogSaveAnonimo

---

### SYNC SUPABASE — save paziente, piani/cache piano, entrate, eventi
Righe 4759-5275

- `4759` — save
- `4777` — _pushRigaPerId
- `4810` — _flushDirtyIds
- `4893` — _p69LoadBaseline
- `4896` — _p69StoreBaseline
- `4899` — _p69SetBaseline
- `4903` — _p69DropBaseline
- `4907` — _p69SetBaselineFromRows
- `4913` — _p69NomePaz
- `4918` — _p69InList
- `4926` — _p69RilevaConflitti
- `4962` — _p69DialogoConflitti
- `4738` — chiudi
- `4996` — _p69RisolviRicarica
- `5025` — _p69EsportaLocali
- `5038` — _p69RisolviSovrascrivi
- `5051` — pushPianoSupabase
- `5073` — pullPianiSupabase
- `5089` — delPianoSupabase
- `5105` — delPianiPazienteSupabase
- `5117` — pushCachePianoSupabase
- `5134` — caricaCachePianoSupabase
- `5156` — pushEntrateSupabase
- `5180` — pullEntrateSupabase
- `5194` — delEntrataSupabase
- `5202` — pushEntrataSupabase
- `5213` — pushEventoSupabase
- `5226` — pushEventiSupabase
- `5250` — pullEventiSupabase
- `5264` — delEventoSupabase
- `5275` — _pianoCacheKey

---

### UI GENERALE — config AI key, notifiche, navigazione (goTo/tab/modali)
Righe 5306-5418

- `5306` — _salvaPianoCache
- `5311` — _caricaPianoCache
- `5317` — salvaCfg
- `5318` — testConn
- `5325` — testaAntKey
- `5336` — initAntCard
- `5339` — esporta
- `5340` — importa
- `5345` — goTo
- `5362` — closeM
- `5370` — ngChiudiModale
- `5379` — ngChiudiPopupCoppia
- `5383` — ngAggiungiX
- `5394` — ngUpgradeModali
- `5414` — mTab
- `5415` — aggiornaEta
- `5416` — toggleOrarioNote
- `5417` — pdTab
- `5418` — notif

---

### PAZIENTI — registro: lista/card/kanban, apertura, editing, salvataggio, routine
Righe 5426-8192

- `5426` — getPazView
- `5427` — setPazView
- `5436` — _pazStatoPiano
- `5444` — _pazUrgenzaControllo
- `5451` — _pazStatoTagHtml
- `5460` — _pazAggiornaFiltroRegimi
- `5468` — renderPaz
- `5521` — _renderPazCard
- `5546` — _renderPazLista
- `5573` — _renderPazKanban
- `5611` — openNuovoPaz
- `5637` — editPaz
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
- `6428` — openPaz
- `7879` — renderPdRoutine
- `6723` — cardHTML
- `8021` — updateRoutineCampo
- `8029` — suggerisciPastoEQuando
- `8056` — filtroLibreria
- `8065` — renderLibreriaGrid
- `8086` — aggiungiDaLibreriaIdx
- `8110` — openModalRoutine
- `8117` — salvaRoutineVoce
- `8142` — salvaRoutine
- `8149` — mostraRoutinePopup
- `8177` — removeRoutineVoce
- `8192` — _renderAggiustamentiSection

---

### 📈 PERCORSO — timeline di periodizzazione (P115 Tappe 1-5 COMPLETE, 24 lug 2026)
Righe 6021-6621 (numeri ESATTI al 24/7 notte, dopo la Tappa 5). ⚠️ Questo blocco (~600 righe) fa slittare tutti i numeri delle sezioni SUCCESSIVE a riga ~6020 rispetto all'ultima rigenerazione completa: per quelle sezioni fare grep di conferma. Rigenerazione completa alla prossima modifica strutturale.

- `6473` — _PERCORSO_TIPI (const: tipi fase, colori, pct default)
- `6480` — _percorsoGet *(normalizza p.percorso, scarta fasi invalide)*
- `6502` — _percorsoIsoLocal *(data → YYYY-MM-DD LOCALE, mai toISOString/UTC)*
- `6508` — _percorsoIntervalli *(fasi consecutive → date concrete dal/al)*
- `6522` — _percorsoFaseAt *(fase attiva a una data; dal incluso, al escluso)*
- `6531` — _percorsoKcalFase *(pct → kcal indicative via calcolaTDEE)*
- `6554` — _percorsoProiezione *(Tappa 2 — proiezione ibrida teorica/calibrata, cono, obiettivo a intervallo)*
- `6612` — _percorsoDataBreve *(ISO → "12 set")*
- `6629` — _percorsoSerieEnergia *(Tappa 3 — serie introito/TDEE stimato/TDEE osservato per la corsia energia)*
- `6668` — _percorsoSerieMassaMagra *(Tappa 4 — solo InBody: punti {data,m,pg})*
- `6687` — _percorsoConsuntivo *(Tappa 5 — legge p.consuntivo scritto da P50: aderenza, extra kcal, ritardo=extra÷7700, settimane perse; oggi sempre ok:false)*
- `6729` — _PERCORSO_LAYERS_DEFAULT / _percorsoLayersState / _percorsoLayersGet *(Tappa 4 — stato interruttori, SOLO sessione, mai su p)*
- `6734` — percorsoLayerToggle *(Tappa 4 — inverte un solo strato)*
- `6740` — percorsoVistaPreset *(Tappa 4 — preset "tecnica"/"paziente")*
- `6756` — _percorsoPaz *(e a seguire i mutatori percorsoInit/SetInizio/AddFase/UpdFase/DelFase/MoveFase)*
- `6812` — _PERCORSO_MODELLI / _PERCORSO_GEN *(P122 T3 — 4 modelli + regole dei cicli)*
- `6830` — _percorsoGeneraFasi *(P122 T3 — pura: dal traguardo alle fasi, ritmo = quello della proiezione)*
- `6910` — _percorsoModelloSelectHtml
- `6919` — percorsoGeneraDaModello *(propone; conferma prima di sostituire fasi esistenti)*
- `6942` — _percorsoShiftGiorni *(pura: ancora = ultima pesata)*
- `6952` — percorsoRiallinea *(⏩ trasla il piano, riprende dal giorno-fase dell'interruzione)*
- `6979` — _TRG_TIPI / `6744` _TRG_COMPORTAMENTI *(P122 T4 — tipi di traguardo e libreria comportamenti)*
- `7001` — _traguardiGet · `6761` _traguardoValoreAttuale *(valore corrente dai dati esistenti, null se manca)*
- `7040` — _traguardoVerso *(auto: dedotto dalla partenza)* · `6803` _traguardoValuta · `6824` _traguardiValuta
- `7081` — traguardoAdd · `6852` traguardoUpd · `6867` traguardoDel · `6873` traguardoSegna
- `7139` — _COND_TIPI · `6897` _percorsoCondizione *(pura: la fase finisce per soglia — SOLO suggerimento)*
- `7155` — percorsoSetCondizione · `6927` percorsoChiudiFase *(esito fotografato, riapribile)*
- `7189` — _traguardiHtml *(blocco 🏁 in fondo alla scheda Percorso)*
- `7287` — _percorsoVistaPaz / `7049` _percorsoVistaPazAttiva *(P122 T5 — modalità di sessione)*
- `7294` — _percorsoVittorie *(pura: vittorie dall'inizio del percorso + flag ricomposizione)*
- `7332` — _percorsoNascondiPeso *(in fase di massa il peso non si mostra al paziente)*
- `7343` — _traguardoFaseCorrente *(traguardo della fase IN CORSO, non quello lontano)*
- `7371` — _traguardoTestoPaziente *(righe in italiano semplice, riusate dal messaggio WhatsApp)*
- `7404` — _vistaPazienteHtml *(i tre riquadri che guarda il paziente)*
- `7484` — _percorsoChartSvg *(due corsie: peso + massa magra + cono proiezione sopra, striscia aderenza in mezzo (solo con dati P50), energia (kcal) sotto — tutto gated dagli interruttori)*
- `7673` — renderPdPercorso *(scheda: badge fase, riga proiezione/obiettivo, riga Piano vs Realtà (solo con dati), toolbar interruttori, grafico, editor)*

*(Tappa 2 tocca anche `calcolaMacros`: box obiettivo con intervallo al posto della data secca.)*

---

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 8277-8448

- `8277` — salvaAggiustamento
- `8310` — eliminaAggiustamento
- `8319` — renderPdNote
- `8354` — salvaNotaClinica
- `8369` — deleteNota
- `8378` — saveNote
- `8398` — resetSemaforoAuto *(F9 — pulsante 🔄 Ricalcola: pulisce gli automatici e rifà col sistema valido; il motore LEGACY non esiste più)*
- `8448` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 8674-8872

- `8674` — avviaFX
- `8702` — avviaAnalisi
- `8719` — _renderFlussoPanel
- `8763` — _riepEsc
- `8767` — _riepNum
- `8773` — _riepDelta
- `8781` — _riepDataSig
- `8799` — _riepParseFX
- `8087` — clean
- `8813` — _riepAggiornaFX
- `8839` — _riepToggleDomandaDefault
- `8851` — _riepAddDomanda
- `8864` — _riepRemoveDomanda
- `8872` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 9084-9311

- `8218` — dCol
- `8336` — card
- `9084` — renderPdRagionamento
- `9172` — inviaMessaggioRag
- `9190` — concludiERiassumi
- `9204` — salvaRagionamento
- `9225` — apriGeneratoreDaRag
- `9233` — nuovaSessioneRag
- `9239` — cancellaSavedRag
- `9249` — renderPazTimeline
- `9281` — renderPdAnamnesi
- `9311` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 11210-12345

- `11210` — _anNorm *(P125 — testo confrontabile: minuscole, niente accenti)*
- `11216` — _anCorrisponde *(P125 — ricerca per parole-prefisso: "vit d" trova "Vitamina D")*
- `11222` — filtraAnalisi *(P125 — filtro dal vivo delle 119 voci)*
- `11256` — pulisciRicercaAnalisi
- `11262` — renderPdAnalisi
- `11318` — toggleAnalisiSection
- `11467` — loadAnalisiSanguePDF
- `11354` — _impPdfConfigurata
- `11355` — _impPdfLib
- `11365` — _impPdfApri
- `11378` — _impPdfPagina *(P124b — una pagina del PDF → immagine, con la rotazione RILEVATA, non quella dichiarata dal file)*
- `11399` — _impRuotaImmagine
- `11424` — _impRilevaRotazione *(P124b — chiamata piccola: di quanti gradi va girata la pagina)*
- `11443` — _impPromptPagina *(P124b — prompt di UNA pagina, con l'impronta della riga: valore+unità+riferimento)*
- `11642` — _impNormalizzaNumero *(P124 — numero all'italiana → punto decimale, conversione fatta dall'app e non dall'AI)*
- `11653` — _impNumeri
- `11661` — _impSembraIntervallo
- `11669` — _impUgualeAlRange
- `11678` — _impLimitiStd
- `11699` — _impFuoriScala
- `11708` — _impCorrezioneVirgola
- `11720` — _impTestoLimiti
- `11741` — _impRifPlausibile *(P124b — un "riferimento" che è un'unità di misura = riga disallineata)*
- `11754` — _impUnitaCanonica
- `11776` — _impStessaGrandezza *(P124b — stesso tipo di misura a meno del prefisso: nanomoli/micromoli/millimoli)*
- `11793` — _impUnitaCompatibili
- `11804` — _impControllaValore *(P124 — i controlli anti-errore su un valore estratto)*
- `11868` — mostraDiffAnalisi *(P124 — colonna Estratto modificabile + righe sospette deselezionate)*
- `12058` — _calcoloIncluso
- `12064` — toggleCalcoloIncluso
- `12086` — _renderCalcoliPannello
- `12127` — toggleGlossario
- `12132` — updateAnalisi
- `12191` — salvaAnalisi
- `12204` — applicaGruppoClinico
- `12233` — renderBoxGruppiCliniciSuggeriti
- `12265` — suggerisciGruppiClinici
- `12345` — renderMemoriaInbody

---
### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9176 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `9441` — _richVal
- `9448` — _richBmi
- `9453` — _richPat
- `9459` — _richNum
- `9504` — _richPreselezione
- `9520` — richLeggiIntestazione
- `9524` — richSalvaIntestazione
- `9533` — apriRichiestaAnalisi
- `9553` — _richModaleHtml
- `9629` — _richEsc
- `9631` — _richMotivoCambia
- `9637` — _richToggleSez
- `9643` — _richAggiornaConteggi
- `9651` — _richMotivoCorrente
- `9661` — _richSelezione
- `9676` — _richTxt
- `9682` — _richCostruisciPDF
- `8969` — nuovaPagina
- `8970` — spazio
- `9778` — _richNomeFile
- `9783` — _richPrepara
- `9796` — _richRegistra
- `9801` — _richStato
- `9803` — richScaricaPDF
- `9852` — _richUpload
- `9854` — _richWaUrl
- `9861` — _richTestoWa
- `9875` — richInviaWhatsApp
- `9915` — richCopiaLink
- `9936` — _richStoricoHtml

---
### REFERTI DEL SANGUE DATATI — storico nel tempo (P118 tappa 1)
Righe 9194-9387 — migrazione, ordinamento, quadro attuale derivato, barra di selezione.

- `10987` — _refertoNuovoId
- `10990` — _refertoOggi
- `10994` — _refertoDataIt
- `11000` — _refertoConteggio
- `11014` — _refertiMigra
- `11041` — _refertiOrdinati
- `11052` — _refertoPiuRecente
- `11057` — _refertoInVista
- `11075` — _refertiApplica
- `11088` — _refertoCrea
- `11107` — refertoCambiaVista
- `11113` — refertoCambiaData
- `11125` — refertoNuovo
- `11133` — refertoDuplica
- `11142` — refertoElimina
- `11157` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `10600` — _rangeNum
- `10606` — _rangeTestoDa
- `10625` — _rangeCoppia
- `10635` — _rangeHtml

---
### ANDAMENTO NEL TEMPO — tracciato, variazione, grafico grande (P118 tappa 3)
Righe 9441-9745 — serie storica, regola del colore, sparkline, pannello in fondo.

- `10677` — _andLimiti
- `10698` — _andParseRangeLab
- `10711` — _andDistanza
- `10718` — _andValutazione
- `10731` — _andSerie
- `10745` — _andNum
- `10749` — _andDataBreve
- `10754` — _andMeseAnno
- `10762` — _andDominio
- `10776` — _andColore
- `10789` — _andSparkHtml
- `10815` — _andRigaHtml
- `10837` — _andEsamiSeguibili
- `10845` — andScegliEsame
- `10851` — _andPannelloHtml
- `10904` — _andGraficoGrande
- `10955` — _andPasso

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 12393-13341

- `12393` — _ibFmtBreve
- `12402` — _renderPesiIntermediSection
- `12451` — aggiungiPesoIntermedio
- `12467` — eliminaPesoIntermedio
- `12477` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `13341` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 13584-13584

- `13584` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 13962-16503

- `13962` — aggiornaLabelMacros
- `13980` — calcolaMacros
- `14121` — applicaSchema
- `14156` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `14162` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `14184` — _misuraDaReferto *(P127 — UN referto letto con le regole del traguardo: usata anche dalla verifica al controllo)*
- `14217` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `14228` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `14246` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `14359` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `14373` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `14429` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `14443` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `14475` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `14508` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `14550` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `14558` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `14569` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `14596` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `14611` — _stradeVerso *(le strade complete + percentuale libera)*
- `14658` — _VC_TOLLERANZA_PCT / _VC_GIORNI_MIN / _VC_GIORNI_MIN_RITARO / _VC_COPERTURA_MIN_PCT / _VC_MAGRA_PRUDENZA_GG *(P127 — soglie cliniche della verifica)*
- `14668` — _mediaSlotPrescritta *(media pesata sui giorni di un campo dello storico target; la usa anche _kcalMediaPrescrittaOss)*
- `14688` — _vcDeficitSlot *(deficit di uno slot: campo offset o kcal−tdee per gli slot vecchi)*
- `14696` — _vcTratto *(P127 — cosa è cambiato fra due referti, previsto vs reale, TDEE misurato)*
- `14750` — _vcTraguardoSalvato *(traguardo ricostruito dal salvato, per la scheda Percorso)*
- `14760` — _verificaControllo *(P127 — motore puro: tratto recente, quadro dall'inizio, residuo al ritmo reale)*
- `14798` — _verificaControlloHtml *(blocco 🔎, unica fonte per pannello 🎯 e scheda Percorso; azioni solo dove c'è il campo kcal)*
- `14890` — _vcRitara *(scrive le kcal ritarate nel campo regime: propone, non salva)*
- `14903` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `14971` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `14993` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `15046` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `15153` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `15168` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `15193` — _renderRifPesoBox
- `15244` — _usaRifPeso
- `15248` — _aggiornaRifPesoTarget
- `15251` — _aggiornaRegimeSlider
- `15908` — _presetRegime
- `15912` — _initRegimeSliderDaPaziente
- `15930` — ricalcolaLAF
- `16064` — renderStoricoTDEE
- `16098` — attivaSlotTDEE
- `16106` — eliminaSlotTDEE
- `16119` — _toggleCiclizzazione
- `16125` — _aggiornaAnteprimaCiclizzazione
- `16143` — salvaCalcoloMacros
- `16257` — _metAllenamento
- `16273` — _neatFrazione
- `16347` — _larnLafStileVita
- `16364` — _regimeOffset
- `16374` — _componiRegimeText
- `16407` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `16419` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `16426` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `16503` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 16521-16951

- `16521` — renderTargetBadge
- `16550` — verificaRegola_75_20_5
- `16587` — renderBadge75_20_5
- `16652` — _validaNorm
- `16655` — _validaMatchTermine
- `16663` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `16714` — _validaTesto
- `16735` — validaPiano
- `16809` — _validaFirmaBlocchi
- `16816` — renderBadgeValidatore
- `16847` — _validaVaiAlGiorno
- `16856` — apriPannelloValidatore
- `13472` — esc
- `16913` — _validaEseguiOverride
- `16936` — validaGateExport
- `16951` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 17084-17716

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
- `17084` — pianoPazSelezionato
- `17231` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `17469` — renderPanelMacrosGiorno
- `17612` — pmgCambiaGrammi
- `17639` — riapriPiano
- `17677` — _montaPianoCorrente
- `17716` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 17726-18195

- `17726` — pullTemplateSupabase
- `17737` — delTemplateSupabase
- `17746` — _promptTemplateNome
- `17771` — _creaTemplateDaJSON
- `17794` — salvaComeTemplate
- `17805` — salvaComeTemplateDaPiano
- `17814` — _normNomeAlim
- `17815` — _escRegAlim
- `17816` — _raccogliAlimentiDaPiano
- `17827` — _alimentiEsclusiPaziente
- `17839` — _trovaConflittiTemplate
- `17857` — _mostraAvvisoConflitti
- `17881` — applicaTemplate
- `17899` — apriPickerTemplate
- `17927` — _pickPaziente
- `17946` — applicaTemplatePick
- `17950` — rinominaTemplate
- `17961` — eliminaTemplate
- `17971` — renderLibreriaTemplate
- `18000` — renderStoricoPiani
- `18059` — eliminaPiano
- `18075` — _getActiveMacrosTarget
- `18099` — getTargetAttivi
- `18136` — calcolaTargetsCiclizzazione
- `18162` — _setupPianoTargets
- `18186` — getStagioneCorrente
- `18195` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 18657-18657

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `18657` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 18666-19125

- `18666` — aggiornaUIcolazione
- `18676` — salvaRegolePiano
- `18737` — _isModelloSistema
- `18740` — _isModelloSistemaModificato
- `18752` — caricaModelliCustomLocal
- `18766` — salvaModelliCustomLocal
- `18787` — _migraRecordCustom
- `18802` — _syncAliasLegacy
- `18811` — caricaAlimentiCustom
- `18835` — pushAlimentiCustomSupabase
- `18845` — pullAlimentiCustomSupabase
- `18859` — pushModelliSupabase
- `18877` — pullModelliSupabase
- `18902` — _calcolaFreqDaModello
- `18921` — aggiornaUImodello
- `19010` — popolaDropdownModelli
- `19038` — cambiaModelloRotazione
- `19044` — ripristinaModelloOriginale
- `19067` — eliminaModelloCustom
- `19085` — mostraAnteprimaModello
- `19095` — apriEditorModello
- `19125` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 19394-19632

- `15738` — rerender
- `19394` — _salvaModelloDaEditor
- `19436` — caricaRegolePiano
- `19466` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `19501` — _aiLogUsage
- `19523` — _aiProxyUrl
- `19529` — _aiTokenPerProxy
- `19558` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `19632` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 19711-19851

- `16216` — _risolviCollisioniCelle
- `19711` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `19771` — getFruttaStile
- `19778` — _fruttaGetPasto
- `19788` — _fruttaContaRigheRicetta
- `19792` — _fruttaIndiceBasePasto
- `19812` — getFruttaMarker
- `19825` — fruttaMarkerHtml
- `19833` — _fruttaCheckboxHtml
- `19842` — toggleFrutta
- `19851` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 19887-21161

- `19887` — _renderCelleGriglia
- `19967` — _renderRicetteTestuali
- `20006` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `20077` — _renderCelleHtml
- `20085` — toggleCellaMenu
- `20104` — closeAllCellaMenus
- `20112` — _trovaPasto
- `20120` — cellaSposta
- `20174` — cellaCancella
- `20195` — apriEditGrammatura
- `16789` — salva
- `20243` — cellaSwap
- `20263` — cellaRimuoviAlt
- `20277` — cellaAggiungiAlt
- `20380` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `20465` — apriEditRicetta
- `20474` — aggiungiRicetta
- `20490` — rimuoviRicetta
- `20499` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `20661` — ngAggiungiSpuntinoVuoto
- `20677` — apriAggiungiCella
- `17254` — risolviCompatibili
- `20773` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `20865` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `21006` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `21161` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 21209-21601

- `21209` — _attesoStrutturaPiano
- `21229` — _confrontaStrutturaPiano
- `21259` — _costruisciPromptDelta
- `21286` — _pianoToolSchema
- `21361` — _pianoMaxTokens
- `21370` — _estraiPianoDaRisposta
- `21392` — chiamaGeneraPiano
- `21559` — mostraLoadingSteps
- `18123` — render
- `21601` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 21668-22245

- `21668` — generaMessaggioAI
- `21773` — copiaMessaggioAI
- `21783` — salvaInStorico
- `21795` — salvaVarianteAI
- `21810` — renderVariantiSalvate
- `21829` — usaVariante
- `21847` — eliminaVariante
- `21858` — renderStoricoMsg
- `21874` — apriWhatsApp
- `22245` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 22423-23920

- `22423` — _ngColoreSemaforoNome
- `22431` — apriSceltaModalitaPiano
- `22466` — _ngChiudiModalita
- `22469` — _ngCostruisciGiornoVuoto
- `22502` — _ngCostruisciGiornoSpeciale
- `22513` — _ngIndiceInizioSpeciali
- `22524` — _ngModalitaNomeGiorno
- `22530` — _ngImpostaModalitaNomeGiorno
- `22533` — _ngLettera
- `22540` — _ngEtichettaGiorno
- `22560` — _ngEtichettaGiornoBreve
- `22574` — _ngToggleGiornoSpeciale
- `22598` — _ngRenderPannelloSpeciale
- `22666` — _generaGiornoSpecialeAI
- `22766` — _ngGiornoHaContenuto
- `22778` — _ngCreaPianoManuale
- `22801` — _ngScrollTabGiorni
- `22811` — _ngAbilitaDragScroll
- `22848` — _ngCambiaNumeroGiorni
- `22880` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `22894` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `22935` — _ngToggleCat
- `22944` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `22968` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `23124` — _ngSalvaPianoManuale
- `23150` — _ngParseIngrediente
- `23174` — _ngScomponiIngredienti
- `23186` — _ricCalcolaMacroDaIngredienti
- `23204` — _ricRicalcolaMacroLive
- `23211` — _ricAggiornaInfoMacro
- `23225` — _ricRicalcolaMacroLiveNow
- `23249` — _ngTrovaCategoriaAlimento
- `23282` — _ngPescaRicetta
- `23325` — _ngScomponiRicettaNelPasto
- `23362` — _ngDragStart
- `23373` — _ngDragStartCella
- `23384` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `23391` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `23396` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `23415` — _ngAggiungiAlimento
- `23440` — _ngRimuoviAlimento
- `23454` — _ngDopoModifica
- `23472` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `23525` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `23554` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `23571` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `23579` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `23651` — gramTestoCasalingo
- `23677` — _appendToggleNutrizionali
- `23720` — _appendTogglePromemoria
- `23749` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `23895` — cpFromEmoji
- `23901` — getEmojiCp
- `23920` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `21895` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `21917` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `21922` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `21948` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `22036` — _spesaTestoWhatsApp
- `22052` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `22097` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `22120` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `22148` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `22208` — scaricaListaSpesaPDF (download diretto, un click)
- `22216` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `22228` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 25068-25068

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
- `25068` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 25079-25285

- `25079` — salvaInbody
- `25143` — delInbody
- `25150` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `25285` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 25313-25782

- `25313` — buildSemLegenda
- `25327` — renderAlEditor
- `25388` — _alimNomeRegex
- `25396` — _alimGiorniDaPiano
- `25404` — _scanGiorniPerNome
- `25419` — scanRiferimentiAlimento
- `25448` — _alimRefsRighe
- `25454` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `25542` — modificaAlimentoCustom
- `25562` — ripristinaValoriPrecedentiAlimento
- `25574` — _resetAlimModal
- `25585` — apriNuovoAlimentoCustom
- `25591` — salvaAlimentoCustom
- `25658` — eliminaAlimentoCustom
- `25689` — _alimFonteBadge
- `25694` — renderAlimentiPage
- `22217` — E
- `25764` — archiviaAlimentoCustom
- `25782` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 25809-26046

- `25809` — _bcSetStatus
- `25811` — apriScannerBarcode
- `25819` — chiudiScannerBarcode
- `25824` — _bcStopCamera
- `25832` — _bcModaleAperto
- `25834` — _bcAvviaCamera
- `25845` — _bcAvviaNativo
- `25865` — _bcAvviaZXing
- `25874` — _bcZXStart
- `25885` — _bcErroreCamera
- `25893` — cercaBarcodeManuale
- `25899` — _barcodeTrovato
- `25915` — cercaBarcodeOFF
- `25933` — _bcProdottoNonTrovato
- `25947` — _bcPrecompilaForm
- `22477` — num
- `25971` — togAl
- `26024` — selCatAl
- `25402` — selTuttiAl
- `26046` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 26060-26376

- `26060` — setCalView
- `26061` — calPrev
- `26062` — calNext
- `26063` — calToday
- `26065` — renderCal
- `26079` — renderCalMonth
- `26103` — renderCalWeek
- `26121` — renderCalDay
- `26137` — selGiorno
- `26151` — setDisp
- `26156` — openAddEvento
- `26169` — openAddEventoPaz
- `26175` — toggleEntrataCheck
- `26180` — salvaEvento
- `26203` — openEvDetail
- `26258` — delEvento
- `26266` — copyMsg
- `26273` — aggDateCal
- `26278` — syncInizio
- `26279` — syncControllo
- `26280` — aggiornaPrev
- `26297` — renderRic
- `26324` — openNuovaRic
- `26325` — editRic
- `26335` — salvaRic
- `26360` — delRic
- `26376` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 26461-26521

- `26461` — aggiungiEntrataPerPaziente
- `26478` — openNuovaEntrata
- `26492` — salvaEntrata
- `26513` — delEntrata
- `26521` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 26551-27015

- `26551` — aiSuggerisciRicetta
- `26596` — renderConcettiModal
- `26615` — apriConcettiModal
- `26642` — salvaConcettiAllegati
- `26666` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `26704` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `26713` — loadInbodyPDF
- `26825` — _vitdLabel
- `26829` — getIntegratori
- `26833` — getIntegraWant
- `26837` — setIntegratori
- `26854` — setIntegraWant
- `26892` — getPatologieChip
- `26893` — getAllergieChip
- `26894` — setPatologieChip
- `26895` — setAllergieChip
- `26896` — getPatologie
- `26897` — getAllergie
- `26898` — setPatologieFromStr
- `26905` — setAllergieFromStr
- `26918` — getSdvChip
- `26919` — getCspChip
- `26920` — setSdvChip
- `26921` — setCspChip
- `26922` — setSdvFromStr
- `26923` — setCspFromStr
- `26927` — getBudget
- `26928` — setBudget
- `26933` — renderCalAnno
- `26964` — comprimeImmagine
- `26986` — uploadImmagineConcetto
- `27005` — rimuoviImmagineConcetto
- `27015` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 27081-27185

- `27081` — entraSelConcetti
- `27082` — annullaSelConcetti
- `27083` — toggleConcettoSel
- `27088` — eliminaConcettiSelezionati
- `27107` — confermaEliminaConcetti
- `27122` — aiRiscriviConcetto
- `27136` — editConcetto
- `27154` — salvaConcetto
- `27165` — openNuovoConcetto
- `27185` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 27186-27349

- `27186` — saveAgendaPersonale
- `27187` — getAgendaTodo
- `27188` — saveAgendaTodo
- `27190` — pulisciAgendaVecchia
- `27194` — navigaAgenda
- `27203` — toggleFormAgenda
- `27204` — toggleFormTodo
- `27206` — salvaAgendaItem
- `27220` — salvaTodoItem
- `27232` — toggleAgendaFatto
- `27240` — toggleTodoFatto
- `27253` — _catCol
- `27255` — renderAgendaDx
- `27349` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 27475-27679

- `27475` — renderScadenzeAlert
- `27660` — segnaGestito
- `27679` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 27688-27763

- `27688` — ripristinaPaz
- `27696` — eliminaPaz
- `27741` — getDove
- `27745` — setDove
- `27763` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 27768-28208

- `27768` — getCredenzialiPersistenti
- `27781` — cancellaCredenzialiPersistenti
- `27786` — rinnovaSessioneConRefreshToken
- `27803` — getSessioneSalvata
- `27822` — salvaSessione
- `27832` — cancellaSessione
- `27836` — eseguiLogin
- `27883` — eseguiLogout
- `27905` — mostraApp
- `27910` — verificaSessioneEAvvia
- `27938` — assicuraTokenValido
- `27967` — _garantiscoSessionePerSync
- `27979` — avviaRinnovoTokenPeriodico
- `27983` — fermaRinnovoTokenPeriodico
- `27992` — _authReset
- `27997` — _authMostra
- `28000` — mostraLogin
- `28001` — mostraRegistrazione
- `28002` — mostraRecupero
- `28003` — mostraNuovaPassword
- `28006` — eseguiRegistrazione
- `28044` — eseguiRecuperoPassword
- `28073` — eseguiNuovaPassword
- `28107` — _parseHashParams
- `28114` — _pulisciHash
- `28118` — gestisciRitornoAuth
- `28208` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 28280-28403

- `28280` — apriPannelloRicette
- `28309` — chiudiPannelloRicette
- `28317` — applicaRicettaPasto
- `28353` — inizializzaP2
- `28365` — deepClone
- `28369` — applicaPatch
- `28403` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
