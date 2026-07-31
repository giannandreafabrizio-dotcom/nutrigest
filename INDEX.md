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
Righe 3347-3371

- `3347` — pushConcetiSupabase
- `3357` — pullConcetiSupabase
- `3371` — migraConcetti

---

### ALIMENTI — categorie funzionali/semaforo, chip UI, equivalenze porzioni
Righe 3561-3916

- `3561` — getCategoriaSemaforo
- `3578` — _getCategorieGruppo
- `3592` — calcolaGrammaturaEquivalente
- `3632` — _gruppoEquiv  (P121: gruppo di equivalenza + criterio per categoria funzionale)
- `3638` — _porzioneStandard  (P121: porzione `g` di database dell'alimento)
- `3653` — suggerisciGrEquivalente  (P121: firma a 3 argomenti, il gruppo si deduce dai due alimenti)
- `3679` — _etichettaCriterio  (P121: ≈carbo / ≈prot / ≈grassi / fissa / porzione)
- `3694` — _promptAlternativeGrassi  (P121: riga del prompt AI generata dal motore)
- `3710` — ricalcolaAlternative  (P121: MOTORE UNICO, unico punto che scrive la grammatura di un'alternativa)
- `3729` — ricalcolaAlternativePiano  (P121: applica il motore a tutte le celle di un piano)
- `3778` — arrotondaGrammatura  (P121: sostituisce arrotondaPorzioneDiscreta — pezzi interi senza tetto / 5g)
- `3788` — getCategoriaFunzionale
- `3828` — catArr
- `3844` — _tagComuniTrova
- `3848` — getTagComuniChip
- `3851` — setTagComuniChip
- `3859` — setCatChips
- `3872` — getStagioniChip
- `3875` — setStagioniChip
- `3882` — getProfiloChip
- `3885` — setProfiloChip
- `3894` — wireChipGroup
- `3905` — wireAttrChipGroups
- `3916` — wireRadioChipGroup

---

### CONFIG / STORAGE LOCALE — cfg, localStorage db, util data/valuta
Righe 3944-4324

- `3944` — getCfg
- `3945` — saveCfgL
- `3946` — getUrl
- `3947` — saveLocal
- `3948` — loadLocal
- `3960` — uid
- `3961` — today
- `3962` — addDays
- `3963` — fData
- `3964` — fEur
- `3966` — getLastSyncText
- `3976` — getSyncColor
- `3983` — aggiornaStatoSync
- `4009` — setSyncStatus
- `4278` — _registraTombstone
- `4286` — _tombstoneAttivi
- `4298` — _fondiTombstones
- `4312` — _mergeTombstonesRemoti *(dal 24/7 legge il meta da `collections`, P74 1d)*
- `4324` — _applicaTombstones
- `4185` — _pazFetchMeta *(P74 1d — solo `collections`)*
- `4206` — _collectionsUpsert *(P74 — scrittura primaria dei 4 meta-record dal cutover 1d)*
- `4228` — _collectionsFetch *(P74 1d — lettura unica dei meta-record)*
- `4251` — _analisiSangueUpsert *(P74 fase 2 — scrittura ombra analisi del sangue, 24/7)*

---

### SYNC SUPABASE — push/pull ricette/pazienti, tombstones, conflitti (P69)
Righe 4348-4733

- `4348` — supaHeaders
- `4362` — pushRicetteSupabase
- `4387` — pullRicetteSupabase
- `4409` — delRicetteSupabase
- `4421` — delPazienteSupabase
- `4436` — pushToSheets
- `4480` — pullFromSheets
- `4559` — syncNow
- `4572` — sincronizzaTutto
- `4360` — stpSet
- `4365` — stpMsg
- `4703` — testConnSupabase
- `4733` — _p68LogSaveAnonimo

---

### SYNC SUPABASE — save paziente, piani/cache piano, entrate, eventi
Righe 4747-5269

- `4747` — save
- `4765` — _pushRigaPerId
- `4798` — _flushDirtyIds
- `4881` — _p69LoadBaseline
- `4884` — _p69StoreBaseline
- `4887` — _p69SetBaseline
- `4891` — _p69DropBaseline
- `4895` — _p69SetBaselineFromRows
- `4901` — _p69NomePaz
- `4906` — _p69InList
- `4914` — _p69RilevaConflitti
- `4950` — _p69DialogoConflitti
- `4738` — chiudi
- `4984` — _p69RisolviRicarica
- `5013` — _p69EsportaLocali
- `5026` — _p69RisolviSovrascrivi
- `5039` — pushPianoSupabase
- `5061` — pullPianiSupabase
- `5077` — delPianoSupabase
- `5093` — delPianiPazienteSupabase
- `5105` — pushCachePianoSupabase
- `5122` — caricaCachePianoSupabase
- `5144` — pushEntrateSupabase
- `5168` — pullEntrateSupabase
- `5182` — delEntrataSupabase
- `5190` — pushEntrataSupabase
- `5201` — pushEventoSupabase
- `5214` — pushEventiSupabase
- `5238` — pullEventiSupabase
- `5258` — delEventoSupabase
- `5269` — _pianoCacheKey

---

### UI GENERALE — config AI key, notifiche, navigazione (goTo/tab/modali)
Righe 5300-5411

- `5300` — _salvaPianoCache
- `5305` — _caricaPianoCache
- `5311` — salvaCfg
- `5312` — testConn
- `5319` — testaAntKey
- `5330` — initAntCard
- `5333` — esporta
- `5334` — importa
- `5339` — goTo
- `5355` — closeM
- `5363` — ngChiudiModale
- `5372` — ngChiudiPopupCoppia
- `5376` — ngAggiungiX
- `5387` — ngUpgradeModali
- `5407` — mTab
- `5408` — aggiornaEta
- `5409` — toggleOrarioNote
- `5410` — pdTab
- `5411` — notif

---

### PAZIENTI — registro: lista/card/kanban, apertura, editing, salvataggio, routine
Righe 5419-8200

- `5419` — getPazView
- `5420` — setPazView
- `5429` — _pazStatoPiano
- `5437` — _pazUrgenzaControllo
- `5444` — _pazStatoTagHtml
- `5453` — _pazAggiornaFiltroRegimi
- `5461` — renderPaz
- `5514` — _renderPazCard
- `5539` — _renderPazLista
- `5566` — _renderPazKanban
- `5604` — openNuovoPaz
- `5630` — editPaz
- `5708` — REGOLE_SEMAFORO_ALIMENTI *(15 condizioni cliniche → grigi/celesti; globale dal 26/7 per essere verificabile dal test)*
- `6155` — _SEM_COLORI_LEGACY / `6105` _SEM_COLORI_AUTO *(F9 — unico vocabolario dei colori automatici)*
- `6160` — NOMI_CONDIZIONE_SEMAFORO *(etichette delle 15 condizioni, usate anche dal riquadro della scheda)*
- `6182` — _semaforoCondizioniAttive *(le condizioni spuntate su un paziente)*
- `6193` — _semaforoMigraPaziente *(F9 — toglie i colori legacy e ricalcola; idempotente)*
- `6204` — _semaforoMigraTutti *(passata su tutti i pazienti in memoria, con conteggio)*
- `6215` — applicaRegoloSemaforo *(dal 26/7 pulisce TUTTI e sei i colori automatici, non solo i suoi due)*
- `6303` — trovaChiaveAlimento *(match esatto sul nome: se non trova, la regola è ignorata in silenzio — vedi test s2-regole-nomi-alimenti)*
- `6327` — _pazNumOPrec *(F7 — campo assente = valore precedente, non azzeramento)*
- `6339` — _pazPreservaCampi *(F5 — l'anagrafica non cancella i campi che il form non gestisce)*
- `6345` — salvaPaz
- `6436` — openPaz
- `7887` — renderPdRoutine
- `6723` — cardHTML
- `8029` — updateRoutineCampo
- `8037` — suggerisciPastoEQuando
- `8064` — filtroLibreria
- `8073` — renderLibreriaGrid
- `8094` — aggiungiDaLibreriaIdx
- `8118` — openModalRoutine
- `8125` — salvaRoutineVoce
- `8150` — salvaRoutine
- `8157` — mostraRoutinePopup
- `8185` — removeRoutineVoce
- `8200` — _renderAggiustamentiSection

---

### 📈 PERCORSO — timeline di periodizzazione (P115 Tappe 1-5 COMPLETE, 24 lug 2026)
Righe 6021-6621 (numeri ESATTI al 24/7 notte, dopo la Tappa 5). ⚠️ Questo blocco (~600 righe) fa slittare tutti i numeri delle sezioni SUCCESSIVE a riga ~6020 rispetto all'ultima rigenerazione completa: per quelle sezioni fare grep di conferma. Rigenerazione completa alla prossima modifica strutturale.

- `6481` — _PERCORSO_TIPI (const: tipi fase, colori, pct default)
- `6488` — _percorsoGet *(normalizza p.percorso, scarta fasi invalide)*
- `6510` — _percorsoIsoLocal *(data → YYYY-MM-DD LOCALE, mai toISOString/UTC)*
- `6516` — _percorsoIntervalli *(fasi consecutive → date concrete dal/al)*
- `6530` — _percorsoFaseAt *(fase attiva a una data; dal incluso, al escluso)*
- `6539` — _percorsoKcalFase *(pct → kcal indicative via calcolaTDEE)*
- `6562` — _percorsoProiezione *(Tappa 2 — proiezione ibrida teorica/calibrata, cono, obiettivo a intervallo)*
- `6620` — _percorsoDataBreve *(ISO → "12 set")*
- `6637` — _percorsoSerieEnergia *(Tappa 3 — serie introito/TDEE stimato/TDEE osservato per la corsia energia)*
- `6676` — _percorsoSerieMassaMagra *(Tappa 4 — solo InBody: punti {data,m,pg})*
- `6695` — _percorsoConsuntivo *(Tappa 5 — legge p.consuntivo scritto da P50: aderenza, extra kcal, ritardo=extra÷7700, settimane perse; oggi sempre ok:false)*
- `6737` — _PERCORSO_LAYERS_DEFAULT / _percorsoLayersState / _percorsoLayersGet *(Tappa 4 — stato interruttori, SOLO sessione, mai su p)*
- `6742` — percorsoLayerToggle *(Tappa 4 — inverte un solo strato)*
- `6748` — percorsoVistaPreset *(Tappa 4 — preset "tecnica"/"paziente")*
- `6764` — _percorsoPaz *(e a seguire i mutatori percorsoInit/SetInizio/AddFase/UpdFase/DelFase/MoveFase)*
- `6820` — _PERCORSO_MODELLI / _PERCORSO_GEN *(P122 T3 — 4 modelli + regole dei cicli)*
- `6838` — _percorsoGeneraFasi *(P122 T3 — pura: dal traguardo alle fasi, ritmo = quello della proiezione)*
- `6918` — _percorsoModelloSelectHtml
- `6927` — percorsoGeneraDaModello *(propone; conferma prima di sostituire fasi esistenti)*
- `6950` — _percorsoShiftGiorni *(pura: ancora = ultima pesata)*
- `6960` — percorsoRiallinea *(⏩ trasla il piano, riprende dal giorno-fase dell'interruzione)*
- `6987` — _TRG_TIPI / `6744` _TRG_COMPORTAMENTI *(P122 T4 — tipi di traguardo e libreria comportamenti)*
- `7009` — _traguardiGet · `6761` _traguardoValoreAttuale *(valore corrente dai dati esistenti, null se manca)*
- `7048` — _traguardoVerso *(auto: dedotto dalla partenza)* · `6803` _traguardoValuta · `6824` _traguardiValuta
- `7089` — traguardoAdd · `6852` traguardoUpd · `6867` traguardoDel · `6873` traguardoSegna
- `7147` — _COND_TIPI · `6897` _percorsoCondizione *(pura: la fase finisce per soglia — SOLO suggerimento)*
- `7163` — percorsoSetCondizione · `6927` percorsoChiudiFase *(esito fotografato, riapribile)*
- `7197` — _traguardiHtml *(blocco 🏁 in fondo alla scheda Percorso)*
- `7295` — _percorsoVistaPaz / `7049` _percorsoVistaPazAttiva *(P122 T5 — modalità di sessione)*
- `7302` — _percorsoVittorie *(pura: vittorie dall'inizio del percorso + flag ricomposizione)*
- `7340` — _percorsoNascondiPeso *(in fase di massa il peso non si mostra al paziente)*
- `7351` — _traguardoFaseCorrente *(traguardo della fase IN CORSO, non quello lontano)*
- `7379` — _traguardoTestoPaziente *(righe in italiano semplice, riusate dal messaggio WhatsApp)*
- `7412` — _vistaPazienteHtml *(i tre riquadri che guarda il paziente)*
- `7492` — _percorsoChartSvg *(due corsie: peso + massa magra + cono proiezione sopra, striscia aderenza in mezzo (solo con dati P50), energia (kcal) sotto — tutto gated dagli interruttori)*
- `7681` — renderPdPercorso *(scheda: badge fase, riga proiezione/obiettivo, riga Piano vs Realtà (solo con dati), toolbar interruttori, grafico, editor)*

*(Tappa 2 tocca anche `calcolaMacros`: box obiettivo con intervallo al posto della data secca.)*

---

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 8285-8456

- `8285` — salvaAggiustamento
- `8318` — eliminaAggiustamento
- `8327` — renderPdNote
- `8362` — salvaNotaClinica
- `8377` — deleteNota
- `8386` — saveNote
- `8406` — resetSemaforoAuto *(F9 — pulsante 🔄 Ricalcola: pulisce gli automatici e rifà col sistema valido; il motore LEGACY non esiste più)*
- `8456` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 8682-8880

- `8682` — avviaFX
- `8710` — avviaAnalisi
- `8727` — _renderFlussoPanel
- `8771` — _riepEsc
- `8775` — _riepNum
- `8781` — _riepDelta
- `8789` — _riepDataSig
- `8807` — _riepParseFX
- `8087` — clean
- `8821` — _riepAggiornaFX
- `8847` — _riepToggleDomandaDefault
- `8859` — _riepAddDomanda
- `8872` — _riepRemoveDomanda
- `8880` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 9092-9319

- `8218` — dCol
- `8336` — card
- `9092` — renderPdRagionamento
- `9180` — inviaMessaggioRag
- `9198` — concludiERiassumi
- `9212` — salvaRagionamento
- `9233` — apriGeneratoreDaRag
- `9241` — nuovaSessioneRag
- `9247` — cancellaSavedRag
- `9257` — renderPazTimeline
- `9289` — renderPdAnamnesi
- `9319` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 11267-12402

- `11267` — _anNorm *(P125 — testo confrontabile: minuscole, niente accenti)*
- `11273` — _anCorrisponde *(P125 — ricerca per parole-prefisso: "vit d" trova "Vitamina D")*
- `11279` — filtraAnalisi *(P125 — filtro dal vivo delle 119 voci)*
- `11313` — pulisciRicercaAnalisi
- `11319` — renderPdAnalisi
- `11375` — toggleAnalisiSection
- `11524` — loadAnalisiSanguePDF
- `11411` — _impPdfConfigurata
- `11412` — _impPdfLib
- `11422` — _impPdfApri
- `11435` — _impPdfPagina *(P124b — una pagina del PDF → immagine, con la rotazione RILEVATA, non quella dichiarata dal file)*
- `11456` — _impRuotaImmagine
- `11481` — _impRilevaRotazione *(P124b — chiamata piccola: di quanti gradi va girata la pagina)*
- `11500` — _impPromptPagina *(P124b — prompt di UNA pagina, con l'impronta della riga: valore+unità+riferimento)*
- `11699` — _impNormalizzaNumero *(P124 — numero all'italiana → punto decimale, conversione fatta dall'app e non dall'AI)*
- `11710` — _impNumeri
- `11718` — _impSembraIntervallo
- `11726` — _impUgualeAlRange
- `11735` — _impLimitiStd
- `11756` — _impFuoriScala
- `11765` — _impCorrezioneVirgola
- `11777` — _impTestoLimiti
- `11798` — _impRifPlausibile *(P124b — un "riferimento" che è un'unità di misura = riga disallineata)*
- `11811` — _impUnitaCanonica
- `11833` — _impStessaGrandezza *(P124b — stesso tipo di misura a meno del prefisso: nanomoli/micromoli/millimoli)*
- `11850` — _impUnitaCompatibili
- `11861` — _impControllaValore *(P124 — i controlli anti-errore su un valore estratto)*
- `11925` — mostraDiffAnalisi *(P124 — colonna Estratto modificabile + righe sospette deselezionate)*
- `12115` — _calcoloIncluso
- `12121` — toggleCalcoloIncluso
- `12143` — _renderCalcoliPannello
- `12184` — toggleGlossario
- `12189` — updateAnalisi
- `12248` — salvaAnalisi
- `12261` — applicaGruppoClinico
- `12290` — renderBoxGruppiCliniciSuggeriti
- `12322` — suggerisciGruppiClinici
- `12402` — renderMemoriaInbody

---
### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9176 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `9449` — _richVal
- `9456` — _richBmi
- `9461` — _richPat
- `9467` — _richNum
- `9512` — _richPreselezione
- `9528` — richLeggiIntestazione
- `9532` — richSalvaIntestazione
- `9541` — apriRichiestaAnalisi
- `9561` — _richModaleHtml
- `9637` — _richEsc
- `9639` — _richMotivoCambia
- `9645` — _richToggleSez
- `9651` — _richAggiornaConteggi
- `9659` — _richMotivoCorrente
- `9669` — _richSelezione
- `9684` — _richTxt
- `9690` — _richCostruisciPDF
- `8969` — nuovaPagina
- `8970` — spazio
- `9786` — _richNomeFile
- `9791` — _richPrepara
- `9804` — _richRegistra
- `9809` — _richStato
- `9811` — richScaricaPDF
- `9860` — _richUpload
- `9862` — _richWaUrl
- `9869` — _richTestoWa
- `9883` — richInviaWhatsApp
- `9923` — richCopiaLink
- `9944` — _richStoricoHtml

---
### REFERTI DEL SANGUE DATATI — storico nel tempo (P118 tappa 1)
Righe 9194-9387 — migrazione, ordinamento, quadro attuale derivato, barra di selezione.

- `11044` — _refertoNuovoId
- `11047` — _refertoOggi
- `11051` — _refertoDataIt
- `11057` — _refertoConteggio
- `11071` — _refertiMigra
- `11098` — _refertiOrdinati
- `11109` — _refertoPiuRecente
- `11114` — _refertoInVista
- `11132` — _refertiApplica
- `11145` — _refertoCrea
- `11164` — refertoCambiaVista
- `11170` — refertoCambiaData
- `11182` — refertoNuovo
- `11190` — refertoDuplica
- `11199` — refertoElimina
- `11214` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `10657` — _rangeNum
- `10663` — _rangeTestoDa
- `10682` — _rangeCoppia
- `10692` — _rangeHtml

---
### ANDAMENTO NEL TEMPO — tracciato, variazione, grafico grande (P118 tappa 3)
Righe 9441-9745 — serie storica, regola del colore, sparkline, pannello in fondo.

- `10734` — _andLimiti
- `10755` — _andParseRangeLab
- `10768` — _andDistanza
- `10775` — _andValutazione
- `10788` — _andSerie
- `10802` — _andNum
- `10806` — _andDataBreve
- `10811` — _andMeseAnno
- `10819` — _andDominio
- `10833` — _andColore
- `10846` — _andSparkHtml
- `10872` — _andRigaHtml
- `10894` — _andEsamiSeguibili
- `10902` — andScegliEsame
- `10908` — _andPannelloHtml
- `10961` — _andGraficoGrande
- `11012` — _andPasso

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 12452-13773

- `12452` — _ibFmtBreve
- `12461` — _renderPesiIntermediSection
- `12510` — aggiungiPesoIntermedio
- `12526` — eliminaPesoIntermedio
- `12536` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `13773` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 14081-14081

- `14081` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 14459-17000

- `14459` — aggiornaLabelMacros
- `14477` — calcolaMacros
- `14618` — applicaSchema
- `14653` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `14659` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `14681` — _misuraDaReferto *(P127 — UN referto letto con le regole del traguardo: usata anche dalla verifica al controllo)*
- `14714` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `14725` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `14743` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `14856` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `14870` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `14926` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `14940` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `14972` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `15005` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `15047` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `15055` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `15066` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `15093` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `15108` — _stradeVerso *(le strade complete + percentuale libera)*
- `15155` — _VC_TOLLERANZA_PCT / _VC_GIORNI_MIN / _VC_GIORNI_MIN_RITARO / _VC_COPERTURA_MIN_PCT / _VC_MAGRA_PRUDENZA_GG *(P127 — soglie cliniche della verifica)*
- `15165` — _mediaSlotPrescritta *(media pesata sui giorni di un campo dello storico target; la usa anche _kcalMediaPrescrittaOss)*
- `15185` — _vcDeficitSlot *(deficit di uno slot: campo offset o kcal−tdee per gli slot vecchi)*
- `15193` — _vcTratto *(P127 — cosa è cambiato fra due referti, previsto vs reale, TDEE misurato)*
- `15247` — _vcTraguardoSalvato *(traguardo ricostruito dal salvato, per la scheda Percorso)*
- `15257` — _verificaControllo *(P127 — motore puro: tratto recente, quadro dall'inizio, residuo al ritmo reale)*
- `15295` — _verificaControlloHtml *(blocco 🔎, unica fonte per pannello 🎯 e scheda Percorso; azioni solo dove c'è il campo kcal)*
- `15387` — _vcRitara *(scrive le kcal ritarate nel campo regime: propone, non salva)*
- `15400` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `15468` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `15490` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `15543` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `15650` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `15665` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `15690` — _renderRifPesoBox
- `15741` — _usaRifPeso
- `15745` — _aggiornaRifPesoTarget
- `15748` — _aggiornaRegimeSlider
- `16405` — _presetRegime
- `16409` — _initRegimeSliderDaPaziente
- `16427` — ricalcolaLAF
- `16561` — renderStoricoTDEE
- `16595` — attivaSlotTDEE
- `16603` — eliminaSlotTDEE
- `16616` — _toggleCiclizzazione
- `16622` — _aggiornaAnteprimaCiclizzazione
- `16640` — salvaCalcoloMacros
- `16754` — _metAllenamento
- `16770` — _neatFrazione
- `16844` — _larnLafStileVita
- `16861` — _regimeOffset
- `16871` — _componiRegimeText
- `16904` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `16916` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `16923` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `17000` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 17018-17448

- `17018` — renderTargetBadge
- `17047` — verificaRegola_75_20_5
- `17084` — renderBadge75_20_5
- `17149` — _validaNorm
- `17152` — _validaMatchTermine
- `17160` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `17211` — _validaTesto
- `17232` — validaPiano
- `17306` — _validaFirmaBlocchi
- `17313` — renderBadgeValidatore
- `17344` — _validaVaiAlGiorno
- `17353` — apriPannelloValidatore
- `13472` — esc
- `17410` — _validaEseguiOverride
- `17433` — validaGateExport
- `17448` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 17581-18213

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
- `17581` — pianoPazSelezionato
- `17728` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `17966` — renderPanelMacrosGiorno
- `18109` — pmgCambiaGrammi
- `18136` — riapriPiano
- `18174` — _montaPianoCorrente
- `18213` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 18223-18692

- `18223` — pullTemplateSupabase
- `18234` — delTemplateSupabase
- `18243` — _promptTemplateNome
- `18268` — _creaTemplateDaJSON
- `18291` — salvaComeTemplate
- `18302` — salvaComeTemplateDaPiano
- `18311` — _normNomeAlim
- `18312` — _escRegAlim
- `18313` — _raccogliAlimentiDaPiano
- `18324` — _alimentiEsclusiPaziente
- `18336` — _trovaConflittiTemplate
- `18354` — _mostraAvvisoConflitti
- `18378` — applicaTemplate
- `18396` — apriPickerTemplate
- `18424` — _pickPaziente
- `18443` — applicaTemplatePick
- `18447` — rinominaTemplate
- `18458` — eliminaTemplate
- `18468` — renderLibreriaTemplate
- `18497` — renderStoricoPiani
- `18556` — eliminaPiano
- `18572` — _getActiveMacrosTarget
- `18596` — getTargetAttivi
- `18633` — calcolaTargetsCiclizzazione
- `18659` — _setupPianoTargets
- `18683` — getStagioneCorrente
- `18692` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 19154-19154

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `19154` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 19163-19622

- `19163` — aggiornaUIcolazione
- `19173` — salvaRegolePiano
- `19234` — _isModelloSistema
- `19237` — _isModelloSistemaModificato
- `19249` — caricaModelliCustomLocal
- `19263` — salvaModelliCustomLocal
- `19284` — _migraRecordCustom
- `19299` — _syncAliasLegacy
- `19308` — caricaAlimentiCustom
- `19332` — pushAlimentiCustomSupabase
- `19342` — pullAlimentiCustomSupabase
- `19356` — pushModelliSupabase
- `19374` — pullModelliSupabase
- `19399` — _calcolaFreqDaModello
- `19418` — aggiornaUImodello
- `19507` — popolaDropdownModelli
- `19535` — cambiaModelloRotazione
- `19541` — ripristinaModelloOriginale
- `19564` — eliminaModelloCustom
- `19582` — mostraAnteprimaModello
- `19592` — apriEditorModello
- `19622` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 19891-20129

- `15738` — rerender
- `19891` — _salvaModelloDaEditor
- `19933` — caricaRegolePiano
- `19963` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `19998` — _aiLogUsage
- `20020` — _aiProxyUrl
- `20026` — _aiTokenPerProxy
- `20055` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `20129` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 20208-20348

- `16216` — _risolviCollisioniCelle
- `20208` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `20268` — getFruttaStile
- `20275` — _fruttaGetPasto
- `20285` — _fruttaContaRigheRicetta
- `20289` — _fruttaIndiceBasePasto
- `20309` — getFruttaMarker
- `20322` — fruttaMarkerHtml
- `20330` — _fruttaCheckboxHtml
- `20339` — toggleFrutta
- `20348` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 20384-21658

- `20384` — _renderCelleGriglia
- `20464` — _renderRicetteTestuali
- `20503` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `20574` — _renderCelleHtml
- `20582` — toggleCellaMenu
- `20601` — closeAllCellaMenus
- `20609` — _trovaPasto
- `20617` — cellaSposta
- `20671` — cellaCancella
- `20692` — apriEditGrammatura
- `16789` — salva
- `20740` — cellaSwap
- `20760` — cellaRimuoviAlt
- `20774` — cellaAggiungiAlt
- `20877` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `20962` — apriEditRicetta
- `20971` — aggiungiRicetta
- `20987` — rimuoviRicetta
- `20996` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `21158` — ngAggiungiSpuntinoVuoto
- `21174` — apriAggiungiCella
- `17254` — risolviCompatibili
- `21270` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `21362` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `21503` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `21658` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 21706-22098

- `21706` — _attesoStrutturaPiano
- `21726` — _confrontaStrutturaPiano
- `21756` — _costruisciPromptDelta
- `21783` — _pianoToolSchema
- `21858` — _pianoMaxTokens
- `21867` — _estraiPianoDaRisposta
- `21889` — chiamaGeneraPiano
- `22056` — mostraLoadingSteps
- `18123` — render
- `22098` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 22165-22742

- `22165` — generaMessaggioAI
- `22270` — copiaMessaggioAI
- `22280` — salvaInStorico
- `22292` — salvaVarianteAI
- `22307` — renderVariantiSalvate
- `22326` — usaVariante
- `22344` — eliminaVariante
- `22355` — renderStoricoMsg
- `22371` — apriWhatsApp
- `22742` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 22920-24417

- `22920` — _ngColoreSemaforoNome
- `22928` — apriSceltaModalitaPiano
- `22963` — _ngChiudiModalita
- `22966` — _ngCostruisciGiornoVuoto
- `22999` — _ngCostruisciGiornoSpeciale
- `23010` — _ngIndiceInizioSpeciali
- `23021` — _ngModalitaNomeGiorno
- `23027` — _ngImpostaModalitaNomeGiorno
- `23030` — _ngLettera
- `23037` — _ngEtichettaGiorno
- `23057` — _ngEtichettaGiornoBreve
- `23071` — _ngToggleGiornoSpeciale
- `23095` — _ngRenderPannelloSpeciale
- `23163` — _generaGiornoSpecialeAI
- `23263` — _ngGiornoHaContenuto
- `23275` — _ngCreaPianoManuale
- `23298` — _ngScrollTabGiorni
- `23308` — _ngAbilitaDragScroll
- `23345` — _ngCambiaNumeroGiorni
- `23377` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `23391` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `23432` — _ngToggleCat
- `23441` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `23465` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `23621` — _ngSalvaPianoManuale
- `23647` — _ngParseIngrediente
- `23671` — _ngScomponiIngredienti
- `23683` — _ricCalcolaMacroDaIngredienti
- `23701` — _ricRicalcolaMacroLive
- `23708` — _ricAggiornaInfoMacro
- `23722` — _ricRicalcolaMacroLiveNow
- `23746` — _ngTrovaCategoriaAlimento
- `23779` — _ngPescaRicetta
- `23822` — _ngScomponiRicettaNelPasto
- `23859` — _ngDragStart
- `23870` — _ngDragStartCella
- `23881` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `23888` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `23893` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `23912` — _ngAggiungiAlimento
- `23937` — _ngRimuoviAlimento
- `23951` — _ngDopoModifica
- `23969` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `24022` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `24051` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `24068` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `24076` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `24148` — gramTestoCasalingo
- `24174` — _appendToggleNutrizionali
- `24217` — _appendTogglePromemoria
- `24246` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `24392` — cpFromEmoji
- `24398` — getEmojiCp
- `24417` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `22392` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `22414` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `22419` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `22445` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `22533` — _spesaTestoWhatsApp
- `22549` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `22594` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `22617` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `22645` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `22705` — scaricaListaSpesaPDF (download diretto, un click)
- `22713` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `22725` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 25565-25565

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
- `25565` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 25577-25784

- `25577` — salvaInbody
- `25642` — delInbody
- `25649` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `25784` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 25812-26281

- `25812` — buildSemLegenda
- `25826` — renderAlEditor
- `25887` — _alimNomeRegex
- `25895` — _alimGiorniDaPiano
- `25903` — _scanGiorniPerNome
- `25918` — scanRiferimentiAlimento
- `25947` — _alimRefsRighe
- `25953` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `26041` — modificaAlimentoCustom
- `26061` — ripristinaValoriPrecedentiAlimento
- `26073` — _resetAlimModal
- `26084` — apriNuovoAlimentoCustom
- `26090` — salvaAlimentoCustom
- `26157` — eliminaAlimentoCustom
- `26188` — _alimFonteBadge
- `26193` — renderAlimentiPage
- `22217` — E
- `26263` — archiviaAlimentoCustom
- `26281` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 26308-26633

- `26308` — _bcSetStatus
- `26310` — apriScannerBarcode
- `26318` — chiudiScannerBarcode
- `26323` — _bcStopCamera
- `26331` — _bcModaleAperto
- `26333` — _bcAvviaCamera
- `26344` — _bcAvviaNativo
- `26364` — _bcAvviaZXing
- `26373` — _bcZXStart
- `26384` — _bcErroreCamera
- `26392` — cercaBarcodeManuale
- `26398` — _barcodeTrovato
- `26414` — cercaBarcodeOFF
- `26432` — _bcProdottoNonTrovato
- `26446` — _bcPrecompilaForm
- `22477` — num
- `26470` — togAl
- `26523` — selCatAl
- `25402` — selTuttiAl
- `26567` — _appIdAnag  (P140 T1)
- `26577` — _appSyncPaz  (P140 T1)
- `26617` — _appMigraPaziente  (P140 T1)
- `26626` — _appMigraTutti  (P140 T1)
- `26633` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 26648-27061

- `26648` — setCalView
- `26658` — calPrev
- `26659` — calNext
- `26660` — calToday
- `26662` — renderCal
- `26676` — renderCalMonth
- `26706` — renderCalWeek
- `26739` — renderCalDay
- `26790` — selGiorno
- `26804` — setDisp
- `26809` — openAddEvento
- `26822` — openAddEventoPaz
- `26828` — toggleEntrataCheck
- `26833` — salvaEvento
- `26865` — _evTestoPromemoria  (P140 T1)
- `26871` — openEvDetail
- `26926` — delEvento
- `26949` — copyMsg
- `26956` — aggDateCal
- `26961` — syncInizio
- `26962` — syncControllo
- `26963` — aggiornaPrev
- `26982` — renderRic
- `27009` — openNuovaRic
- `27010` — editRic
- `27020` — salvaRic
- `27045` — delRic
- `27061` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 27146-27206

- `27146` — aggiungiEntrataPerPaziente
- `27163` — openNuovaEntrata
- `27177` — salvaEntrata
- `27198` — delEntrata
- `27206` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 27236-27706

- `27236` — aiSuggerisciRicetta
- `27281` — renderConcettiModal
- `27300` — apriConcettiModal
- `27327` — salvaConcettiAllegati
- `27351` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `27389` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `27398` — loadInbodyPDF
- `27516` — _vitdLabel
- `27520` — getIntegratori
- `27524` — getIntegraWant
- `27528` — setIntegratori
- `27545` — setIntegraWant
- `27583` — getPatologieChip
- `27584` — getAllergieChip
- `27585` — setPatologieChip
- `27586` — setAllergieChip
- `27587` — getPatologie
- `27588` — getAllergie
- `27589` — setPatologieFromStr
- `27596` — setAllergieFromStr
- `27609` — getSdvChip
- `27610` — getCspChip
- `27611` — setSdvChip
- `27612` — setCspChip
- `27613` — setSdvFromStr
- `27614` — setCspFromStr
- `27618` — getBudget
- `27619` — setBudget
- `27624` — renderCalAnno
- `27655` — comprimeImmagine
- `27677` — uploadImmagineConcetto
- `27696` — rimuoviImmagineConcetto
- `27706` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 27772-27856

- `27772` — entraSelConcetti
- `27773` — annullaSelConcetti
- `27774` — toggleConcettoSel
- `27779` — eliminaConcettiSelezionati
- `27798` — confermaEliminaConcetti
- `27813` — aiRiscriviConcetto
- `27827` — editConcetto
- `27845` — salvaConcetto
- `27856` — openNuovoConcetto
- `27519` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 27893-27893

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
- `27893` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 28004-28250

- `28004` — renderScadenzeAlert
- `28231` — segnaGestito
- `28250` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 28259-28334

- `28259` — ripristinaPaz
- `28267` — eliminaPaz
- `28312` — getDove
- `28316` — setDove
- `28334` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 28339-28777

- `28339` — getCredenzialiPersistenti
- `28352` — cancellaCredenzialiPersistenti
- `28357` — rinnovaSessioneConRefreshToken
- `28374` — getSessioneSalvata
- `28393` — salvaSessione
- `28403` — cancellaSessione
- `28407` — eseguiLogin
- `28454` — eseguiLogout
- `28476` — mostraApp
- `28481` — verificaSessioneEAvvia
- `28509` — assicuraTokenValido
- `28538` — _garantiscoSessionePerSync
- `28550` — avviaRinnovoTokenPeriodico
- `28554` — fermaRinnovoTokenPeriodico
- `28563` — _authReset
- `28568` — _authMostra
- `28571` — mostraLogin
- `28572` — mostraRegistrazione
- `28573` — mostraRecupero
- `28574` — mostraNuovaPassword
- `28577` — eseguiRegistrazione
- `28615` — eseguiRecuperoPassword
- `28644` — eseguiNuovaPassword
- `28678` — _parseHashParams
- `28685` — _pulisciHash
- `28689` — gestisciRitornoAuth
- `28777` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 28849-28972

- `28849` — apriPannelloRicette
- `28878` — chiudiPannelloRicette
- `28886` — applicaRicettaPasto
- `28922` — inizializzaP2
- `28934` — deepClone
- `28938` — applicaPatch
- `28972` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
