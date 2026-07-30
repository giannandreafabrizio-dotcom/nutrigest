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
Righe 3940-4318

- `3940` — getCfg
- `3941` — saveCfgL
- `3942` — getUrl
- `3943` — saveLocal
- `3944` — loadLocal
- `3955` — uid
- `3956` — today
- `3957` — addDays
- `3958` — fData
- `3959` — fEur
- `3961` — getLastSyncText
- `3971` — getSyncColor
- `3978` — aggiornaStatoSync
- `4004` — setSyncStatus
- `4272` — _registraTombstone
- `4280` — _tombstoneAttivi
- `4292` — _fondiTombstones
- `4306` — _mergeTombstonesRemoti *(dal 24/7 legge il meta da `collections`, P74 1d)*
- `4318` — _applicaTombstones
- `4179` — _pazFetchMeta *(P74 1d — solo `collections`)*
- `4200` — _collectionsUpsert *(P74 — scrittura primaria dei 4 meta-record dal cutover 1d)*
- `4222` — _collectionsFetch *(P74 1d — lettura unica dei meta-record)*
- `4245` — _analisiSangueUpsert *(P74 fase 2 — scrittura ombra analisi del sangue, 24/7)*

---

### SYNC SUPABASE — push/pull ricette/pazienti, tombstones, conflitti (P69)
Righe 4342-4727

- `4342` — supaHeaders
- `4356` — pushRicetteSupabase
- `4381` — pullRicetteSupabase
- `4403` — delRicetteSupabase
- `4415` — delPazienteSupabase
- `4430` — pushToSheets
- `4474` — pullFromSheets
- `4553` — syncNow
- `4566` — sincronizzaTutto
- `4360` — stpSet
- `4365` — stpMsg
- `4697` — testConnSupabase
- `4727` — _p68LogSaveAnonimo

---

### SYNC SUPABASE — save paziente, piani/cache piano, entrate, eventi
Righe 4741-5257

- `4741` — save
- `4759` — _pushRigaPerId
- `4792` — _flushDirtyIds
- `4875` — _p69LoadBaseline
- `4878` — _p69StoreBaseline
- `4881` — _p69SetBaseline
- `4885` — _p69DropBaseline
- `4889` — _p69SetBaselineFromRows
- `4895` — _p69NomePaz
- `4900` — _p69InList
- `4908` — _p69RilevaConflitti
- `4944` — _p69DialogoConflitti
- `4738` — chiudi
- `4978` — _p69RisolviRicarica
- `5007` — _p69EsportaLocali
- `5020` — _p69RisolviSovrascrivi
- `5033` — pushPianoSupabase
- `5055` — pullPianiSupabase
- `5071` — delPianoSupabase
- `5087` — delPianiPazienteSupabase
- `5099` — pushCachePianoSupabase
- `5116` — caricaCachePianoSupabase
- `5138` — pushEntrateSupabase
- `5162` — pullEntrateSupabase
- `5176` — delEntrataSupabase
- `5184` — pushEntrataSupabase
- `5195` — pushEventoSupabase
- `5208` — pushEventiSupabase
- `5232` — pullEventiSupabase
- `5246` — delEventoSupabase
- `5257` — _pianoCacheKey

---

### UI GENERALE — config AI key, notifiche, navigazione (goTo/tab/modali)
Righe 5288-5399

- `5288` — _salvaPianoCache
- `5293` — _caricaPianoCache
- `5299` — salvaCfg
- `5300` — testConn
- `5307` — testaAntKey
- `5318` — initAntCard
- `5321` — esporta
- `5322` — importa
- `5327` — goTo
- `5343` — closeM
- `5351` — ngChiudiModale
- `5360` — ngChiudiPopupCoppia
- `5364` — ngAggiungiX
- `5375` — ngUpgradeModali
- `5395` — mTab
- `5396` — aggiornaEta
- `5397` — toggleOrarioNote
- `5398` — pdTab
- `5399` — notif

---

### PAZIENTI — registro: lista/card/kanban, apertura, editing, salvataggio, routine
Righe 5407-8173

- `5407` — getPazView
- `5408` — setPazView
- `5417` — _pazStatoPiano
- `5425` — _pazUrgenzaControllo
- `5432` — _pazStatoTagHtml
- `5441` — _pazAggiornaFiltroRegimi
- `5449` — renderPaz
- `5502` — _renderPazCard
- `5527` — _renderPazLista
- `5554` — _renderPazKanban
- `5592` — openNuovoPaz
- `5618` — editPaz
- `5696` — REGOLE_SEMAFORO_ALIMENTI *(15 condizioni cliniche → grigi/celesti; globale dal 26/7 per essere verificabile dal test)*
- `6143` — _SEM_COLORI_LEGACY / `6105` _SEM_COLORI_AUTO *(F9 — unico vocabolario dei colori automatici)*
- `6148` — NOMI_CONDIZIONE_SEMAFORO *(etichette delle 15 condizioni, usate anche dal riquadro della scheda)*
- `6170` — _semaforoCondizioniAttive *(le condizioni spuntate su un paziente)*
- `6181` — _semaforoMigraPaziente *(F9 — toglie i colori legacy e ricalcola; idempotente)*
- `6192` — _semaforoMigraTutti *(passata su tutti i pazienti in memoria, con conteggio)*
- `6203` — applicaRegoloSemaforo *(dal 26/7 pulisce TUTTI e sei i colori automatici, non solo i suoi due)*
- `6291` — trovaChiaveAlimento *(match esatto sul nome: se non trova, la regola è ignorata in silenzio — vedi test s2-regole-nomi-alimenti)*
- `6315` — _pazNumOPrec *(F7 — campo assente = valore precedente, non azzeramento)*
- `6327` — _pazPreservaCampi *(F5 — l'anagrafica non cancella i campi che il form non gestisce)*
- `6333` — salvaPaz
- `6409` — openPaz
- `7860` — renderPdRoutine
- `6723` — cardHTML
- `8002` — updateRoutineCampo
- `8010` — suggerisciPastoEQuando
- `8037` — filtroLibreria
- `8046` — renderLibreriaGrid
- `8067` — aggiungiDaLibreriaIdx
- `8091` — openModalRoutine
- `8098` — salvaRoutineVoce
- `8123` — salvaRoutine
- `8130` — mostraRoutinePopup
- `8158` — removeRoutineVoce
- `8173` — _renderAggiustamentiSection

---

### 📈 PERCORSO — timeline di periodizzazione (P115 Tappe 1-5 COMPLETE, 24 lug 2026)
Righe 6021-6621 (numeri ESATTI al 24/7 notte, dopo la Tappa 5). ⚠️ Questo blocco (~600 righe) fa slittare tutti i numeri delle sezioni SUCCESSIVE a riga ~6020 rispetto all'ultima rigenerazione completa: per quelle sezioni fare grep di conferma. Rigenerazione completa alla prossima modifica strutturale.

- `6454` — _PERCORSO_TIPI (const: tipi fase, colori, pct default)
- `6461` — _percorsoGet *(normalizza p.percorso, scarta fasi invalide)*
- `6483` — _percorsoIsoLocal *(data → YYYY-MM-DD LOCALE, mai toISOString/UTC)*
- `6489` — _percorsoIntervalli *(fasi consecutive → date concrete dal/al)*
- `6503` — _percorsoFaseAt *(fase attiva a una data; dal incluso, al escluso)*
- `6512` — _percorsoKcalFase *(pct → kcal indicative via calcolaTDEE)*
- `6535` — _percorsoProiezione *(Tappa 2 — proiezione ibrida teorica/calibrata, cono, obiettivo a intervallo)*
- `6593` — _percorsoDataBreve *(ISO → "12 set")*
- `6610` — _percorsoSerieEnergia *(Tappa 3 — serie introito/TDEE stimato/TDEE osservato per la corsia energia)*
- `6649` — _percorsoSerieMassaMagra *(Tappa 4 — solo InBody: punti {data,m,pg})*
- `6668` — _percorsoConsuntivo *(Tappa 5 — legge p.consuntivo scritto da P50: aderenza, extra kcal, ritardo=extra÷7700, settimane perse; oggi sempre ok:false)*
- `6710` — _PERCORSO_LAYERS_DEFAULT / _percorsoLayersState / _percorsoLayersGet *(Tappa 4 — stato interruttori, SOLO sessione, mai su p)*
- `6715` — percorsoLayerToggle *(Tappa 4 — inverte un solo strato)*
- `6721` — percorsoVistaPreset *(Tappa 4 — preset "tecnica"/"paziente")*
- `6737` — _percorsoPaz *(e a seguire i mutatori percorsoInit/SetInizio/AddFase/UpdFase/DelFase/MoveFase)*
- `6793` — _PERCORSO_MODELLI / _PERCORSO_GEN *(P122 T3 — 4 modelli + regole dei cicli)*
- `6811` — _percorsoGeneraFasi *(P122 T3 — pura: dal traguardo alle fasi, ritmo = quello della proiezione)*
- `6891` — _percorsoModelloSelectHtml
- `6900` — percorsoGeneraDaModello *(propone; conferma prima di sostituire fasi esistenti)*
- `6923` — _percorsoShiftGiorni *(pura: ancora = ultima pesata)*
- `6933` — percorsoRiallinea *(⏩ trasla il piano, riprende dal giorno-fase dell'interruzione)*
- `6960` — _TRG_TIPI / `6744` _TRG_COMPORTAMENTI *(P122 T4 — tipi di traguardo e libreria comportamenti)*
- `6982` — _traguardiGet · `6761` _traguardoValoreAttuale *(valore corrente dai dati esistenti, null se manca)*
- `7021` — _traguardoVerso *(auto: dedotto dalla partenza)* · `6803` _traguardoValuta · `6824` _traguardiValuta
- `7062` — traguardoAdd · `6852` traguardoUpd · `6867` traguardoDel · `6873` traguardoSegna
- `7120` — _COND_TIPI · `6897` _percorsoCondizione *(pura: la fase finisce per soglia — SOLO suggerimento)*
- `7136` — percorsoSetCondizione · `6927` percorsoChiudiFase *(esito fotografato, riapribile)*
- `7170` — _traguardiHtml *(blocco 🏁 in fondo alla scheda Percorso)*
- `7268` — _percorsoVistaPaz / `7049` _percorsoVistaPazAttiva *(P122 T5 — modalità di sessione)*
- `7275` — _percorsoVittorie *(pura: vittorie dall'inizio del percorso + flag ricomposizione)*
- `7313` — _percorsoNascondiPeso *(in fase di massa il peso non si mostra al paziente)*
- `7324` — _traguardoFaseCorrente *(traguardo della fase IN CORSO, non quello lontano)*
- `7352` — _traguardoTestoPaziente *(righe in italiano semplice, riusate dal messaggio WhatsApp)*
- `7385` — _vistaPazienteHtml *(i tre riquadri che guarda il paziente)*
- `7465` — _percorsoChartSvg *(due corsie: peso + massa magra + cono proiezione sopra, striscia aderenza in mezzo (solo con dati P50), energia (kcal) sotto — tutto gated dagli interruttori)*
- `7654` — renderPdPercorso *(scheda: badge fase, riga proiezione/obiettivo, riga Piano vs Realtà (solo con dati), toolbar interruttori, grafico, editor)*

*(Tappa 2 tocca anche `calcolaMacros`: box obiettivo con intervallo al posto della data secca.)*

---

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 8258-8429

- `8258` — salvaAggiustamento
- `8291` — eliminaAggiustamento
- `8300` — renderPdNote
- `8335` — salvaNotaClinica
- `8350` — deleteNota
- `8359` — saveNote
- `8379` — resetSemaforoAuto *(F9 — pulsante 🔄 Ricalcola: pulisce gli automatici e rifà col sistema valido; il motore LEGACY non esiste più)*
- `8429` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 8655-8853

- `8655` — avviaFX
- `8683` — avviaAnalisi
- `8700` — _renderFlussoPanel
- `8744` — _riepEsc
- `8748` — _riepNum
- `8754` — _riepDelta
- `8762` — _riepDataSig
- `8780` — _riepParseFX
- `8087` — clean
- `8794` — _riepAggiornaFX
- `8820` — _riepToggleDomandaDefault
- `8832` — _riepAddDomanda
- `8845` — _riepRemoveDomanda
- `8853` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 9065-9292

- `8218` — dCol
- `8336` — card
- `9065` — renderPdRagionamento
- `9153` — inviaMessaggioRag
- `9171` — concludiERiassumi
- `9185` — salvaRagionamento
- `9206` — apriGeneratoreDaRag
- `9214` — nuovaSessioneRag
- `9220` — cancellaSavedRag
- `9230` — renderPazTimeline
- `9262` — renderPdAnamnesi
- `9292` — renderPdAlimenti

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

- `9422` — _richVal
- `9429` — _richBmi
- `9434` — _richPat
- `9440` — _richNum
- `9485` — _richPreselezione
- `9501` — richLeggiIntestazione
- `9505` — richSalvaIntestazione
- `9514` — apriRichiestaAnalisi
- `9534` — _richModaleHtml
- `9610` — _richEsc
- `9612` — _richMotivoCambia
- `9618` — _richToggleSez
- `9624` — _richAggiornaConteggi
- `9632` — _richMotivoCorrente
- `9642` — _richSelezione
- `9657` — _richTxt
- `9663` — _richCostruisciPDF
- `8969` — nuovaPagina
- `8970` — spazio
- `9759` — _richNomeFile
- `9764` — _richPrepara
- `9777` — _richRegistra
- `9782` — _richStato
- `9784` — richScaricaPDF
- `9833` — _richUpload
- `9835` — _richWaUrl
- `9842` — _richTestoWa
- `9856` — richInviaWhatsApp
- `9896` — richCopiaLink
- `9917` — _richStoricoHtml

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
Righe 12425-13746

- `12425` — _ibFmtBreve
- `12434` — _renderPesiIntermediSection
- `12483` — aggiungiPesoIntermedio
- `12499` — eliminaPesoIntermedio
- `12509` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `13746` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 14054-14054

- `14054` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 14432-16973

- `14432` — aggiornaLabelMacros
- `14450` — calcolaMacros
- `14591` — applicaSchema
- `14626` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `14632` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `14654` — _misuraDaReferto *(P127 — UN referto letto con le regole del traguardo: usata anche dalla verifica al controllo)*
- `14687` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `14698` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `14716` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `14829` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `14843` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `14899` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `14913` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `14945` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `14978` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `15020` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `15028` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `15039` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `15066` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `15081` — _stradeVerso *(le strade complete + percentuale libera)*
- `15128` — _VC_TOLLERANZA_PCT / _VC_GIORNI_MIN / _VC_GIORNI_MIN_RITARO / _VC_COPERTURA_MIN_PCT / _VC_MAGRA_PRUDENZA_GG *(P127 — soglie cliniche della verifica)*
- `15138` — _mediaSlotPrescritta *(media pesata sui giorni di un campo dello storico target; la usa anche _kcalMediaPrescrittaOss)*
- `15158` — _vcDeficitSlot *(deficit di uno slot: campo offset o kcal−tdee per gli slot vecchi)*
- `15166` — _vcTratto *(P127 — cosa è cambiato fra due referti, previsto vs reale, TDEE misurato)*
- `15220` — _vcTraguardoSalvato *(traguardo ricostruito dal salvato, per la scheda Percorso)*
- `15230` — _verificaControllo *(P127 — motore puro: tratto recente, quadro dall'inizio, residuo al ritmo reale)*
- `15268` — _verificaControlloHtml *(blocco 🔎, unica fonte per pannello 🎯 e scheda Percorso; azioni solo dove c'è il campo kcal)*
- `15360` — _vcRitara *(scrive le kcal ritarate nel campo regime: propone, non salva)*
- `15373` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `15441` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `15463` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `15516` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `15623` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `15638` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `15663` — _renderRifPesoBox
- `15714` — _usaRifPeso
- `15718` — _aggiornaRifPesoTarget
- `15721` — _aggiornaRegimeSlider
- `16378` — _presetRegime
- `16382` — _initRegimeSliderDaPaziente
- `16400` — ricalcolaLAF
- `16534` — renderStoricoTDEE
- `16568` — attivaSlotTDEE
- `16576` — eliminaSlotTDEE
- `16589` — _toggleCiclizzazione
- `16595` — _aggiornaAnteprimaCiclizzazione
- `16613` — salvaCalcoloMacros
- `16727` — _metAllenamento
- `16743` — _neatFrazione
- `16817` — _larnLafStileVita
- `16834` — _regimeOffset
- `16844` — _componiRegimeText
- `16877` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `16889` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `16896` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `16973` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 16991-17421

- `16991` — renderTargetBadge
- `17020` — verificaRegola_75_20_5
- `17057` — renderBadge75_20_5
- `17122` — _validaNorm
- `17125` — _validaMatchTermine
- `17133` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `17184` — _validaTesto
- `17205` — validaPiano
- `17279` — _validaFirmaBlocchi
- `17286` — renderBadgeValidatore
- `17317` — _validaVaiAlGiorno
- `17326` — apriPannelloValidatore
- `13472` — esc
- `17383` — _validaEseguiOverride
- `17406` — validaGateExport
- `17421` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 17554-18186

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
- `17554` — pianoPazSelezionato
- `17701` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `17939` — renderPanelMacrosGiorno
- `18082` — pmgCambiaGrammi
- `18109` — riapriPiano
- `18147` — _montaPianoCorrente
- `18186` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 18196-18665

- `18196` — pullTemplateSupabase
- `18207` — delTemplateSupabase
- `18216` — _promptTemplateNome
- `18241` — _creaTemplateDaJSON
- `18264` — salvaComeTemplate
- `18275` — salvaComeTemplateDaPiano
- `18284` — _normNomeAlim
- `18285` — _escRegAlim
- `18286` — _raccogliAlimentiDaPiano
- `18297` — _alimentiEsclusiPaziente
- `18309` — _trovaConflittiTemplate
- `18327` — _mostraAvvisoConflitti
- `18351` — applicaTemplate
- `18369` — apriPickerTemplate
- `18397` — _pickPaziente
- `18416` — applicaTemplatePick
- `18420` — rinominaTemplate
- `18431` — eliminaTemplate
- `18441` — renderLibreriaTemplate
- `18470` — renderStoricoPiani
- `18529` — eliminaPiano
- `18545` — _getActiveMacrosTarget
- `18569` — getTargetAttivi
- `18606` — calcolaTargetsCiclizzazione
- `18632` — _setupPianoTargets
- `18656` — getStagioneCorrente
- `18665` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 19127-19127

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `19127` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 19136-19595

- `19136` — aggiornaUIcolazione
- `19146` — salvaRegolePiano
- `19207` — _isModelloSistema
- `19210` — _isModelloSistemaModificato
- `19222` — caricaModelliCustomLocal
- `19236` — salvaModelliCustomLocal
- `19257` — _migraRecordCustom
- `19272` — _syncAliasLegacy
- `19281` — caricaAlimentiCustom
- `19305` — pushAlimentiCustomSupabase
- `19315` — pullAlimentiCustomSupabase
- `19329` — pushModelliSupabase
- `19347` — pullModelliSupabase
- `19372` — _calcolaFreqDaModello
- `19391` — aggiornaUImodello
- `19480` — popolaDropdownModelli
- `19508` — cambiaModelloRotazione
- `19514` — ripristinaModelloOriginale
- `19537` — eliminaModelloCustom
- `19555` — mostraAnteprimaModello
- `19565` — apriEditorModello
- `19595` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 19864-20102

- `15738` — rerender
- `19864` — _salvaModelloDaEditor
- `19906` — caricaRegolePiano
- `19936` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `19971` — _aiLogUsage
- `19993` — _aiProxyUrl
- `19999` — _aiTokenPerProxy
- `20028` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `20102` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 20181-20321

- `16216` — _risolviCollisioniCelle
- `20181` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `20241` — getFruttaStile
- `20248` — _fruttaGetPasto
- `20258` — _fruttaContaRigheRicetta
- `20262` — _fruttaIndiceBasePasto
- `20282` — getFruttaMarker
- `20295` — fruttaMarkerHtml
- `20303` — _fruttaCheckboxHtml
- `20312` — toggleFrutta
- `20321` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 20357-21631

- `20357` — _renderCelleGriglia
- `20437` — _renderRicetteTestuali
- `20476` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `20547` — _renderCelleHtml
- `20555` — toggleCellaMenu
- `20574` — closeAllCellaMenus
- `20582` — _trovaPasto
- `20590` — cellaSposta
- `20644` — cellaCancella
- `20665` — apriEditGrammatura
- `16789` — salva
- `20713` — cellaSwap
- `20733` — cellaRimuoviAlt
- `20747` — cellaAggiungiAlt
- `20850` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `20935` — apriEditRicetta
- `20944` — aggiungiRicetta
- `20960` — rimuoviRicetta
- `20969` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `21131` — ngAggiungiSpuntinoVuoto
- `21147` — apriAggiungiCella
- `17254` — risolviCompatibili
- `21243` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `21335` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `21476` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `21631` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 21679-22071

- `21679` — _attesoStrutturaPiano
- `21699` — _confrontaStrutturaPiano
- `21729` — _costruisciPromptDelta
- `21756` — _pianoToolSchema
- `21831` — _pianoMaxTokens
- `21840` — _estraiPianoDaRisposta
- `21862` — chiamaGeneraPiano
- `22029` — mostraLoadingSteps
- `18123` — render
- `22071` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 22138-22715

- `22138` — generaMessaggioAI
- `22243` — copiaMessaggioAI
- `22253` — salvaInStorico
- `22265` — salvaVarianteAI
- `22280` — renderVariantiSalvate
- `22299` — usaVariante
- `22317` — eliminaVariante
- `22328` — renderStoricoMsg
- `22344` — apriWhatsApp
- `22715` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 22893-24390

- `22893` — _ngColoreSemaforoNome
- `22901` — apriSceltaModalitaPiano
- `22936` — _ngChiudiModalita
- `22939` — _ngCostruisciGiornoVuoto
- `22972` — _ngCostruisciGiornoSpeciale
- `22983` — _ngIndiceInizioSpeciali
- `22994` — _ngModalitaNomeGiorno
- `23000` — _ngImpostaModalitaNomeGiorno
- `23003` — _ngLettera
- `23010` — _ngEtichettaGiorno
- `23030` — _ngEtichettaGiornoBreve
- `23044` — _ngToggleGiornoSpeciale
- `23068` — _ngRenderPannelloSpeciale
- `23136` — _generaGiornoSpecialeAI
- `23236` — _ngGiornoHaContenuto
- `23248` — _ngCreaPianoManuale
- `23271` — _ngScrollTabGiorni
- `23281` — _ngAbilitaDragScroll
- `23318` — _ngCambiaNumeroGiorni
- `23350` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `23364` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `23405` — _ngToggleCat
- `23414` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `23438` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `23594` — _ngSalvaPianoManuale
- `23620` — _ngParseIngrediente
- `23644` — _ngScomponiIngredienti
- `23656` — _ricCalcolaMacroDaIngredienti
- `23674` — _ricRicalcolaMacroLive
- `23681` — _ricAggiornaInfoMacro
- `23695` — _ricRicalcolaMacroLiveNow
- `23719` — _ngTrovaCategoriaAlimento
- `23752` — _ngPescaRicetta
- `23795` — _ngScomponiRicettaNelPasto
- `23832` — _ngDragStart
- `23843` — _ngDragStartCella
- `23854` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `23861` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `23866` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `23885` — _ngAggiungiAlimento
- `23910` — _ngRimuoviAlimento
- `23924` — _ngDopoModifica
- `23942` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `23995` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `24024` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `24041` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `24049` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `24121` — gramTestoCasalingo
- `24147` — _appendToggleNutrizionali
- `24190` — _appendTogglePromemoria
- `24219` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `24365` — cpFromEmoji
- `24371` — getEmojiCp
- `24390` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `22365` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `22387` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `22392` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `22418` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `22506` — _spesaTestoWhatsApp
- `22522` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `22567` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `22590` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `22618` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `22678` — scaricaListaSpesaPDF (download diretto, un click)
- `22686` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `22698` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 25538-25538

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
- `25538` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 25550-25757

- `25550` — salvaInbody
- `25615` — delInbody
- `25622` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `25757` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 25785-26254

- `25785` — buildSemLegenda
- `25799` — renderAlEditor
- `25860` — _alimNomeRegex
- `25868` — _alimGiorniDaPiano
- `25876` — _scanGiorniPerNome
- `25891` — scanRiferimentiAlimento
- `25920` — _alimRefsRighe
- `25926` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `26014` — modificaAlimentoCustom
- `26034` — ripristinaValoriPrecedentiAlimento
- `26046` — _resetAlimModal
- `26057` — apriNuovoAlimentoCustom
- `26063` — salvaAlimentoCustom
- `26130` — eliminaAlimentoCustom
- `26161` — _alimFonteBadge
- `26166` — renderAlimentiPage
- `22217` — E
- `26236` — archiviaAlimentoCustom
- `26254` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 26281-26518

- `26281` — _bcSetStatus
- `26283` — apriScannerBarcode
- `26291` — chiudiScannerBarcode
- `26296` — _bcStopCamera
- `26304` — _bcModaleAperto
- `26306` — _bcAvviaCamera
- `26317` — _bcAvviaNativo
- `26337` — _bcAvviaZXing
- `26346` — _bcZXStart
- `26357` — _bcErroreCamera
- `26365` — cercaBarcodeManuale
- `26371` — _barcodeTrovato
- `26387` — cercaBarcodeOFF
- `26405` — _bcProdottoNonTrovato
- `26419` — _bcPrecompilaForm
- `22477` — num
- `26443` — togAl
- `26496` — selCatAl
- `25402` — selTuttiAl
- `26518` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 26532-26913

- `26532` — setCalView
- `26542` — calPrev
- `26543` — calNext
- `26544` — calToday
- `26546` — renderCal
- `26560` — renderCalMonth
- `26590` — renderCalWeek
- `26623` — renderCalDay
- `26674` — selGiorno
- `26688` — setDisp
- `26693` — openAddEvento
- `26706` — openAddEventoPaz
- `26712` — toggleEntrataCheck
- `26717` — salvaEvento
- `26740` — openEvDetail
- `26795` — delEvento
- `26803` — copyMsg
- `26810` — aggDateCal
- `26815` — syncInizio
- `26816` — syncControllo
- `26817` — aggiornaPrev
- `26834` — renderRic
- `26861` — openNuovaRic
- `26862` — editRic
- `26872` — salvaRic
- `26897` — delRic
- `26913` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 26998-27058

- `26998` — aggiungiEntrataPerPaziente
- `27015` — openNuovaEntrata
- `27029` — salvaEntrata
- `27050` — delEntrata
- `27058` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 27088-27558

- `27088` — aiSuggerisciRicetta
- `27133` — renderConcettiModal
- `27152` — apriConcettiModal
- `27179` — salvaConcettiAllegati
- `27203` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `27241` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `27250` — loadInbodyPDF
- `27368` — _vitdLabel
- `27372` — getIntegratori
- `27376` — getIntegraWant
- `27380` — setIntegratori
- `27397` — setIntegraWant
- `27435` — getPatologieChip
- `27436` — getAllergieChip
- `27437` — setPatologieChip
- `27438` — setAllergieChip
- `27439` — getPatologie
- `27440` — getAllergie
- `27441` — setPatologieFromStr
- `27448` — setAllergieFromStr
- `27461` — getSdvChip
- `27462` — getCspChip
- `27463` — setSdvChip
- `27464` — setCspChip
- `27465` — setSdvFromStr
- `27466` — setCspFromStr
- `27470` — getBudget
- `27471` — setBudget
- `27476` — renderCalAnno
- `27507` — comprimeImmagine
- `27529` — uploadImmagineConcetto
- `27548` — rimuoviImmagineConcetto
- `27558` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 27624-27708

- `27624` — entraSelConcetti
- `27625` — annullaSelConcetti
- `27626` — toggleConcettoSel
- `27631` — eliminaConcettiSelezionati
- `27650` — confermaEliminaConcetti
- `27665` — aiRiscriviConcetto
- `27679` — editConcetto
- `27697` — salvaConcetto
- `27708` — openNuovoConcetto
- `27519` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 27745-27745

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
- `27745` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 27856-28102

- `27856` — renderScadenzeAlert
- `28083` — segnaGestito
- `28102` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 28111-28186

- `28111` — ripristinaPaz
- `28119` — eliminaPaz
- `28164` — getDove
- `28168` — setDove
- `28186` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 28191-28629

- `28191` — getCredenzialiPersistenti
- `28204` — cancellaCredenzialiPersistenti
- `28209` — rinnovaSessioneConRefreshToken
- `28226` — getSessioneSalvata
- `28245` — salvaSessione
- `28255` — cancellaSessione
- `28259` — eseguiLogin
- `28306` — eseguiLogout
- `28328` — mostraApp
- `28333` — verificaSessioneEAvvia
- `28361` — assicuraTokenValido
- `28390` — _garantiscoSessionePerSync
- `28402` — avviaRinnovoTokenPeriodico
- `28406` — fermaRinnovoTokenPeriodico
- `28415` — _authReset
- `28420` — _authMostra
- `28423` — mostraLogin
- `28424` — mostraRegistrazione
- `28425` — mostraRecupero
- `28426` — mostraNuovaPassword
- `28429` — eseguiRegistrazione
- `28467` — eseguiRecuperoPassword
- `28496` — eseguiNuovaPassword
- `28530` — _parseHashParams
- `28537` — _pulisciHash
- `28541` — gestisciRitornoAuth
- `28629` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 28701-28824

- `28701` — apriPannelloRicette
- `28730` — chiudiPannelloRicette
- `28738` — applicaRicettaPasto
- `28774` — inizializzaP2
- `28786` — deepClone
- `28790` — applicaPatch
- `28824` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
