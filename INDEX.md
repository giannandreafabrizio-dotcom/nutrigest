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
Righe 2384-2426

- `2384` — _slugAlimento
- `2392` — _catalogoIndicizza
- `2396` — _catalogoDeindicizza
- `2403` — costruisciCatalogo
- `2426` — risolviAlimento

---

### MACROS PIANO — calcolo e badge macro reali vs target
Righe 2441-2704

- `2441` — getValoriCREA
- `2453` — getCurrentPaziente
- `2473` — getKcalWeekend
- `2530` — getMacrosRicettaComposta
- `2536` — calcolaMacrosPiano
- `2638` — renderBadgeMacrosReali
- `2611` — pctStr
- `2612` — color
- `2625` — row
- `2704` — renderBadgeMacrosReali_DOM

---

### ANALISI DEL SANGUE — parsing, indici clinici derivati, interpretazione
Righe 2989-3176

- `2989` — _parseAnalisiNum
- `2997` — calcolaIndice
- `3150` — interpretaAnalisi
- `3162` — _interpAnalisiHtml
- `3176` — mostraInfoRange

---

### CONCETTI EDUCATIVI — sync Supabase, migrazione
Righe 3319-3343

- `3319` — pushConcetiSupabase
- `3329` — pullConcetiSupabase
- `3343` — migraConcetti

---

### ALIMENTI — categorie funzionali/semaforo, chip UI, equivalenze porzioni
Righe 3533-3888

- `3533` — getCategoriaSemaforo
- `3550` — _getCategorieGruppo
- `3564` — calcolaGrammaturaEquivalente
- `3604` — _gruppoEquiv  (P121: gruppo di equivalenza + criterio per categoria funzionale)
- `3610` — _porzioneStandard  (P121: porzione `g` di database dell'alimento)
- `3625` — suggerisciGrEquivalente  (P121: firma a 3 argomenti, il gruppo si deduce dai due alimenti)
- `3651` — _etichettaCriterio  (P121: ≈carbo / ≈prot / ≈grassi / fissa / porzione)
- `3666` — _promptAlternativeGrassi  (P121: riga del prompt AI generata dal motore)
- `3682` — ricalcolaAlternative  (P121: MOTORE UNICO, unico punto che scrive la grammatura di un'alternativa)
- `3701` — ricalcolaAlternativePiano  (P121: applica il motore a tutte le celle di un piano)
- `3750` — arrotondaGrammatura  (P121: sostituisce arrotondaPorzioneDiscreta — pezzi interi senza tetto / 5g)
- `3760` — getCategoriaFunzionale
- `3800` — catArr
- `3816` — _tagComuniTrova
- `3820` — getTagComuniChip
- `3823` — setTagComuniChip
- `3831` — setCatChips
- `3844` — getStagioniChip
- `3847` — setStagioniChip
- `3854` — getProfiloChip
- `3857` — setProfiloChip
- `3866` — wireChipGroup
- `3877` — wireAttrChipGroups
- `3888` — wireRadioChipGroup

---

### CONFIG / STORAGE LOCALE — cfg, localStorage db, util data/valuta
Righe 3916-4293

- `3916` — getCfg
- `3917` — saveCfgL
- `3918` — getUrl
- `3919` — saveLocal
- `3920` — loadLocal
- `3930` — uid
- `3931` — today
- `3932` — addDays
- `3933` — fData
- `3934` — fEur
- `3936` — getLastSyncText
- `3946` — getSyncColor
- `3954` — aggiornaStatoSync
- `3980` — setSyncStatus
- `4247` — _registraTombstone
- `4255` — _tombstoneAttivi
- `4267` — _fondiTombstones
- `4281` — _mergeTombstonesRemoti *(dal 24/7 legge il meta da `collections`, P74 1d)*
- `4293` — _applicaTombstones
- `4154` — _pazFetchMeta *(P74 1d — solo `collections`)*
- `4175` — _collectionsUpsert *(P74 — scrittura primaria dei 4 meta-record dal cutover 1d)*
- `4197` — _collectionsFetch *(P74 1d — lettura unica dei meta-record)*
- `4220` — _analisiSangueUpsert *(P74 fase 2 — scrittura ombra analisi del sangue, 24/7)*

---

### SYNC SUPABASE — push/pull ricette/pazienti, tombstones, conflitti (P69)
Righe 4317-4702

- `4317` — supaHeaders
- `4331` — pushRicetteSupabase
- `4356` — pullRicetteSupabase
- `4378` — delRicetteSupabase
- `4390` — delPazienteSupabase
- `4405` — pushToSheets
- `4449` — pullFromSheets
- `4528` — syncNow
- `4541` — sincronizzaTutto
- `4360` — stpSet
- `4365` — stpMsg
- `4672` — testConnSupabase
- `4702` — _p68LogSaveAnonimo

---

### SYNC SUPABASE — save paziente, piani/cache piano, entrate, eventi
Righe 4716-5232

- `4716` — save
- `4734` — _pushRigaPerId
- `4767` — _flushDirtyIds
- `4850` — _p69LoadBaseline
- `4853` — _p69StoreBaseline
- `4856` — _p69SetBaseline
- `4860` — _p69DropBaseline
- `4864` — _p69SetBaselineFromRows
- `4870` — _p69NomePaz
- `4875` — _p69InList
- `4883` — _p69RilevaConflitti
- `4919` — _p69DialogoConflitti
- `4738` — chiudi
- `4953` — _p69RisolviRicarica
- `4982` — _p69EsportaLocali
- `4995` — _p69RisolviSovrascrivi
- `5008` — pushPianoSupabase
- `5030` — pullPianiSupabase
- `5046` — delPianoSupabase
- `5062` — delPianiPazienteSupabase
- `5074` — pushCachePianoSupabase
- `5091` — caricaCachePianoSupabase
- `5113` — pushEntrateSupabase
- `5137` — pullEntrateSupabase
- `5151` — delEntrataSupabase
- `5159` — pushEntrataSupabase
- `5170` — pushEventoSupabase
- `5183` — pushEventiSupabase
- `5207` — pullEventiSupabase
- `5221` — delEventoSupabase
- `5232` — _pianoCacheKey

---

### UI GENERALE — config AI key, notifiche, navigazione (goTo/tab/modali)
Righe 5263-5375

- `5263` — _salvaPianoCache
- `5268` — _caricaPianoCache
- `5274` — salvaCfg
- `5275` — testConn
- `5282` — testaAntKey
- `5293` — initAntCard
- `5296` — esporta
- `5297` — importa
- `5302` — goTo
- `5319` — closeM
- `5327` — ngChiudiModale
- `5336` — ngChiudiPopupCoppia
- `5340` — ngAggiungiX
- `5351` — ngUpgradeModali
- `5371` — mTab
- `5372` — aggiornaEta
- `5373` — toggleOrarioNote
- `5374` — pdTab
- `5375` — notif

---

### PAZIENTI — registro: lista/card/kanban, apertura, editing, salvataggio, routine
Righe 5383-8149

- `5383` — getPazView
- `5384` — setPazView
- `5393` — _pazStatoPiano
- `5401` — _pazUrgenzaControllo
- `5408` — _pazStatoTagHtml
- `5417` — _pazAggiornaFiltroRegimi
- `5425` — renderPaz
- `5478` — _renderPazCard
- `5503` — _renderPazLista
- `5530` — _renderPazKanban
- `5568` — openNuovoPaz
- `5594` — editPaz
- `5672` — REGOLE_SEMAFORO_ALIMENTI *(15 condizioni cliniche → grigi/celesti; globale dal 26/7 per essere verificabile dal test)*
- `6119` — _SEM_COLORI_LEGACY / `6105` _SEM_COLORI_AUTO *(F9 — unico vocabolario dei colori automatici)*
- `6124` — NOMI_CONDIZIONE_SEMAFORO *(etichette delle 15 condizioni, usate anche dal riquadro della scheda)*
- `6146` — _semaforoCondizioniAttive *(le condizioni spuntate su un paziente)*
- `6157` — _semaforoMigraPaziente *(F9 — toglie i colori legacy e ricalcola; idempotente)*
- `6168` — _semaforoMigraTutti *(passata su tutti i pazienti in memoria, con conteggio)*
- `6179` — applicaRegoloSemaforo *(dal 26/7 pulisce TUTTI e sei i colori automatici, non solo i suoi due)*
- `6267` — trovaChiaveAlimento *(match esatto sul nome: se non trova, la regola è ignorata in silenzio — vedi test s2-regole-nomi-alimenti)*
- `6291` — _pazNumOPrec *(F7 — campo assente = valore precedente, non azzeramento)*
- `6303` — _pazPreservaCampi *(F5 — l'anagrafica non cancella i campi che il form non gestisce)*
- `6309` — salvaPaz
- `6385` — openPaz
- `7836` — renderPdRoutine
- `6723` — cardHTML
- `7978` — updateRoutineCampo
- `7986` — suggerisciPastoEQuando
- `8013` — filtroLibreria
- `8022` — renderLibreriaGrid
- `8043` — aggiungiDaLibreriaIdx
- `8067` — openModalRoutine
- `8074` — salvaRoutineVoce
- `8099` — salvaRoutine
- `8106` — mostraRoutinePopup
- `8134` — removeRoutineVoce
- `8149` — _renderAggiustamentiSection

---

### 📈 PERCORSO — timeline di periodizzazione (P115 Tappe 1-5 COMPLETE, 24 lug 2026)
Righe 6021-6621 (numeri ESATTI al 24/7 notte, dopo la Tappa 5). ⚠️ Questo blocco (~600 righe) fa slittare tutti i numeri delle sezioni SUCCESSIVE a riga ~6020 rispetto all'ultima rigenerazione completa: per quelle sezioni fare grep di conferma. Rigenerazione completa alla prossima modifica strutturale.

- `6430` — _PERCORSO_TIPI (const: tipi fase, colori, pct default)
- `6437` — _percorsoGet *(normalizza p.percorso, scarta fasi invalide)*
- `6459` — _percorsoIsoLocal *(data → YYYY-MM-DD LOCALE, mai toISOString/UTC)*
- `6465` — _percorsoIntervalli *(fasi consecutive → date concrete dal/al)*
- `6479` — _percorsoFaseAt *(fase attiva a una data; dal incluso, al escluso)*
- `6488` — _percorsoKcalFase *(pct → kcal indicative via calcolaTDEE)*
- `6511` — _percorsoProiezione *(Tappa 2 — proiezione ibrida teorica/calibrata, cono, obiettivo a intervallo)*
- `6569` — _percorsoDataBreve *(ISO → "12 set")*
- `6586` — _percorsoSerieEnergia *(Tappa 3 — serie introito/TDEE stimato/TDEE osservato per la corsia energia)*
- `6625` — _percorsoSerieMassaMagra *(Tappa 4 — solo InBody: punti {data,m,pg})*
- `6644` — _percorsoConsuntivo *(Tappa 5 — legge p.consuntivo scritto da P50: aderenza, extra kcal, ritardo=extra÷7700, settimane perse; oggi sempre ok:false)*
- `6686` — _PERCORSO_LAYERS_DEFAULT / _percorsoLayersState / _percorsoLayersGet *(Tappa 4 — stato interruttori, SOLO sessione, mai su p)*
- `6691` — percorsoLayerToggle *(Tappa 4 — inverte un solo strato)*
- `6697` — percorsoVistaPreset *(Tappa 4 — preset "tecnica"/"paziente")*
- `6713` — _percorsoPaz *(e a seguire i mutatori percorsoInit/SetInizio/AddFase/UpdFase/DelFase/MoveFase)*
- `6769` — _PERCORSO_MODELLI / _PERCORSO_GEN *(P122 T3 — 4 modelli + regole dei cicli)*
- `6787` — _percorsoGeneraFasi *(P122 T3 — pura: dal traguardo alle fasi, ritmo = quello della proiezione)*
- `6867` — _percorsoModelloSelectHtml
- `6876` — percorsoGeneraDaModello *(propone; conferma prima di sostituire fasi esistenti)*
- `6899` — _percorsoShiftGiorni *(pura: ancora = ultima pesata)*
- `6909` — percorsoRiallinea *(⏩ trasla il piano, riprende dal giorno-fase dell'interruzione)*
- `6936` — _TRG_TIPI / `6744` _TRG_COMPORTAMENTI *(P122 T4 — tipi di traguardo e libreria comportamenti)*
- `6958` — _traguardiGet · `6761` _traguardoValoreAttuale *(valore corrente dai dati esistenti, null se manca)*
- `6997` — _traguardoVerso *(auto: dedotto dalla partenza)* · `6803` _traguardoValuta · `6824` _traguardiValuta
- `7038` — traguardoAdd · `6852` traguardoUpd · `6867` traguardoDel · `6873` traguardoSegna
- `7096` — _COND_TIPI · `6897` _percorsoCondizione *(pura: la fase finisce per soglia — SOLO suggerimento)*
- `7112` — percorsoSetCondizione · `6927` percorsoChiudiFase *(esito fotografato, riapribile)*
- `7146` — _traguardiHtml *(blocco 🏁 in fondo alla scheda Percorso)*
- `7244` — _percorsoVistaPaz / `7049` _percorsoVistaPazAttiva *(P122 T5 — modalità di sessione)*
- `7251` — _percorsoVittorie *(pura: vittorie dall'inizio del percorso + flag ricomposizione)*
- `7289` — _percorsoNascondiPeso *(in fase di massa il peso non si mostra al paziente)*
- `7300` — _traguardoFaseCorrente *(traguardo della fase IN CORSO, non quello lontano)*
- `7328` — _traguardoTestoPaziente *(righe in italiano semplice, riusate dal messaggio WhatsApp)*
- `7361` — _vistaPazienteHtml *(i tre riquadri che guarda il paziente)*
- `7441` — _percorsoChartSvg *(due corsie: peso + massa magra + cono proiezione sopra, striscia aderenza in mezzo (solo con dati P50), energia (kcal) sotto — tutto gated dagli interruttori)*
- `7630` — renderPdPercorso *(scheda: badge fase, riga proiezione/obiettivo, riga Piano vs Realtà (solo con dati), toolbar interruttori, grafico, editor)*

*(Tappa 2 tocca anche `calcolaMacros`: box obiettivo con intervallo al posto della data secca.)*

---

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 8234-8405

- `8234` — salvaAggiustamento
- `8267` — eliminaAggiustamento
- `8276` — renderPdNote
- `8311` — salvaNotaClinica
- `8326` — deleteNota
- `8335` — saveNote
- `8355` — resetSemaforoAuto *(F9 — pulsante 🔄 Ricalcola: pulisce gli automatici e rifà col sistema valido; il motore LEGACY non esiste più)*
- `8405` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 8623-8821

- `8623` — avviaFX
- `8651` — avviaAnalisi
- `8668` — _renderFlussoPanel
- `8712` — _riepEsc
- `8716` — _riepNum
- `8722` — _riepDelta
- `8730` — _riepDataSig
- `8748` — _riepParseFX
- `8087` — clean
- `8762` — _riepAggiornaFX
- `8788` — _riepToggleDomandaDefault
- `8800` — _riepAddDomanda
- `8813` — _riepRemoveDomanda
- `8821` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 9033-9259

- `8218` — dCol
- `8336` — card
- `9033` — renderPdRagionamento
- `9121` — inviaMessaggioRag
- `9139` — concludiERiassumi
- `9153` — salvaRagionamento
- `9174` — apriGeneratoreDaRag
- `9182` — nuovaSessioneRag
- `9188` — cancellaSavedRag
- `9198` — renderPazTimeline
- `9230` — renderPdAnamnesi
- `9259` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 10924-12059

- `10924` — _anNorm *(P125 — testo confrontabile: minuscole, niente accenti)*
- `10930` — _anCorrisponde *(P125 — ricerca per parole-prefisso: "vit d" trova "Vitamina D")*
- `10936` — filtraAnalisi *(P125 — filtro dal vivo delle 119 voci)*
- `10970` — pulisciRicercaAnalisi
- `10976` — renderPdAnalisi
- `11032` — toggleAnalisiSection
- `11181` — loadAnalisiSanguePDF
- `11068` — _impPdfConfigurata
- `11069` — _impPdfLib
- `11079` — _impPdfApri
- `11092` — _impPdfPagina *(P124b — una pagina del PDF → immagine, con la rotazione RILEVATA, non quella dichiarata dal file)*
- `11113` — _impRuotaImmagine
- `11138` — _impRilevaRotazione *(P124b — chiamata piccola: di quanti gradi va girata la pagina)*
- `11157` — _impPromptPagina *(P124b — prompt di UNA pagina, con l'impronta della riga: valore+unità+riferimento)*
- `11356` — _impNormalizzaNumero *(P124 — numero all'italiana → punto decimale, conversione fatta dall'app e non dall'AI)*
- `11367` — _impNumeri
- `11375` — _impSembraIntervallo
- `11383` — _impUgualeAlRange
- `11392` — _impLimitiStd
- `11413` — _impFuoriScala
- `11422` — _impCorrezioneVirgola
- `11434` — _impTestoLimiti
- `11455` — _impRifPlausibile *(P124b — un "riferimento" che è un'unità di misura = riga disallineata)*
- `11468` — _impUnitaCanonica
- `11490` — _impStessaGrandezza *(P124b — stesso tipo di misura a meno del prefisso: nanomoli/micromoli/millimoli)*
- `11507` — _impUnitaCompatibili
- `11518` — _impControllaValore *(P124 — i controlli anti-errore su un valore estratto)*
- `11582` — mostraDiffAnalisi *(P124 — colonna Estratto modificabile + righe sospette deselezionate)*
- `11772` — _calcoloIncluso
- `11778` — toggleCalcoloIncluso
- `11800` — _renderCalcoliPannello
- `11841` — toggleGlossario
- `11846` — updateAnalisi
- `11905` — salvaAnalisi
- `11918` — applicaGruppoClinico
- `11947` — renderBoxGruppiCliniciSuggeriti
- `11979` — suggerisciGruppiClinici
- `12059` — renderMemoriaInbody

---
### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9176 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `9389` — _richVal
- `9396` — _richBmi
- `9401` — _richPat
- `9407` — _richNum
- `9452` — _richPreselezione
- `9468` — richLeggiIntestazione
- `9472` — richSalvaIntestazione
- `9481` — apriRichiestaAnalisi
- `9501` — _richModaleHtml
- `9577` — _richEsc
- `9579` — _richMotivoCambia
- `9585` — _richToggleSez
- `9591` — _richAggiornaConteggi
- `9599` — _richMotivoCorrente
- `9609` — _richSelezione
- `9624` — _richTxt
- `9630` — _richCostruisciPDF
- `8969` — nuovaPagina
- `8970` — spazio
- `9726` — _richNomeFile
- `9731` — _richPrepara
- `9741` — _richRegistra
- `9755` — _richStato
- `9757` — richScaricaPDF
- `9806` — _richUpload
- `9808` — _richWaUrl
- `9815` — _richTestoWa
- `9829` — richInviaWhatsApp
- `9869` — richCopiaLink
- `9890` — _richStoricoHtml

---
### REFERTI DEL SANGUE DATATI — storico nel tempo (P118 tappa 1)
Righe 9194-9387 — migrazione, ordinamento, quadro attuale derivato, barra di selezione.

- `10701` — _refertoNuovoId
- `10704` — _refertoOggi
- `10708` — _refertoDataIt
- `10714` — _refertoConteggio
- `10728` — _refertiMigra
- `10755` — _refertiOrdinati
- `10766` — _refertoPiuRecente
- `10771` — _refertoInVista
- `10789` — _refertiApplica
- `10802` — _refertoCrea
- `10821` — refertoCambiaVista
- `10827` — refertoCambiaData
- `10839` — refertoNuovo
- `10847` — refertoDuplica
- `10856` — refertoElimina
- `10871` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `10314` — _rangeNum
- `10320` — _rangeTestoDa
- `10339` — _rangeCoppia
- `10349` — _rangeHtml

---
### ANDAMENTO NEL TEMPO — tracciato, variazione, grafico grande (P118 tappa 3)
Righe 9441-9745 — serie storica, regola del colore, sparkline, pannello in fondo.

- `10391` — _andLimiti
- `10412` — _andParseRangeLab
- `10425` — _andDistanza
- `10432` — _andValutazione
- `10445` — _andSerie
- `10459` — _andNum
- `10463` — _andDataBreve
- `10468` — _andMeseAnno
- `10476` — _andDominio
- `10490` — _andColore
- `10503` — _andSparkHtml
- `10529` — _andRigaHtml
- `10551` — _andEsamiSeguibili
- `10559` — andScegliEsame
- `10565` — _andPannelloHtml
- `10618` — _andGraficoGrande
- `10669` — _andPasso

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 12107-12518

- `12107` — _ibFmtBreve
- `12116` — _renderPesiIntermediSection
- `12165` — aggiungiPesoIntermedio
- `12181` — eliminaPesoIntermedio
- `12191` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `12518` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 12790-12790

- `12790` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 13168-15709

- `13168` — aggiornaLabelMacros
- `13186` — calcolaMacros
- `13327` — applicaSchema
- `13362` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `13368` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `13390` — _misuraDaReferto *(P127 — UN referto letto con le regole del traguardo: usata anche dalla verifica al controllo)*
- `13423` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `13434` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `13452` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `13565` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `13579` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `13635` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `13649` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `13681` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `13714` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `13756` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `13764` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `13775` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `13802` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `13817` — _stradeVerso *(le strade complete + percentuale libera)*
- `13864` — _VC_TOLLERANZA_PCT / _VC_GIORNI_MIN / _VC_GIORNI_MIN_RITARO / _VC_COPERTURA_MIN_PCT / _VC_MAGRA_PRUDENZA_GG *(P127 — soglie cliniche della verifica)*
- `13874` — _mediaSlotPrescritta *(media pesata sui giorni di un campo dello storico target; la usa anche _kcalMediaPrescrittaOss)*
- `13894` — _vcDeficitSlot *(deficit di uno slot: campo offset o kcal−tdee per gli slot vecchi)*
- `13902` — _vcTratto *(P127 — cosa è cambiato fra due referti, previsto vs reale, TDEE misurato)*
- `13956` — _vcTraguardoSalvato *(traguardo ricostruito dal salvato, per la scheda Percorso)*
- `13966` — _verificaControllo *(P127 — motore puro: tratto recente, quadro dall'inizio, residuo al ritmo reale)*
- `14004` — _verificaControlloHtml *(blocco 🔎, unica fonte per pannello 🎯 e scheda Percorso; azioni solo dove c'è il campo kcal)*
- `14096` — _vcRitara *(scrive le kcal ritarate nel campo regime: propone, non salva)*
- `14109` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `14177` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `14199` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `14252` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `14359` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `14374` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `14399` — _renderRifPesoBox
- `14450` — _usaRifPeso
- `14454` — _aggiornaRifPesoTarget
- `14457` — _aggiornaRegimeSlider
- `15114` — _presetRegime
- `15118` — _initRegimeSliderDaPaziente
- `15136` — ricalcolaLAF
- `15270` — renderStoricoTDEE
- `15304` — attivaSlotTDEE
- `15312` — eliminaSlotTDEE
- `15325` — _toggleCiclizzazione
- `15331` — _aggiornaAnteprimaCiclizzazione
- `15349` — salvaCalcoloMacros
- `15463` — _metAllenamento
- `15479` — _neatFrazione
- `15553` — _larnLafStileVita
- `15570` — _regimeOffset
- `15580` — _componiRegimeText
- `15613` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `15625` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `15632` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `15709` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 15727-16157

- `15727` — renderTargetBadge
- `15756` — verificaRegola_75_20_5
- `15793` — renderBadge75_20_5
- `15858` — _validaNorm
- `15861` — _validaMatchTermine
- `15869` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `15920` — _validaTesto
- `15941` — validaPiano
- `16015` — _validaFirmaBlocchi
- `16022` — renderBadgeValidatore
- `16053` — _validaVaiAlGiorno
- `16062` — apriPannelloValidatore
- `13472` — esc
- `16119` — _validaEseguiOverride
- `16142` — validaGateExport
- `16157` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 16290-16922

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
- `16290` — pianoPazSelezionato
- `16437` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `16675` — renderPanelMacrosGiorno
- `16818` — pmgCambiaGrammi
- `16845` — riapriPiano
- `16883` — _montaPianoCorrente
- `16922` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 16932-17401

- `16932` — pullTemplateSupabase
- `16943` — delTemplateSupabase
- `16952` — _promptTemplateNome
- `16977` — _creaTemplateDaJSON
- `17000` — salvaComeTemplate
- `17011` — salvaComeTemplateDaPiano
- `17020` — _normNomeAlim
- `17021` — _escRegAlim
- `17022` — _raccogliAlimentiDaPiano
- `17033` — _alimentiEsclusiPaziente
- `17045` — _trovaConflittiTemplate
- `17063` — _mostraAvvisoConflitti
- `17087` — applicaTemplate
- `17105` — apriPickerTemplate
- `17133` — _pickPaziente
- `17152` — applicaTemplatePick
- `17156` — rinominaTemplate
- `17167` — eliminaTemplate
- `17177` — renderLibreriaTemplate
- `17206` — renderStoricoPiani
- `17265` — eliminaPiano
- `17281` — _getActiveMacrosTarget
- `17305` — getTargetAttivi
- `17342` — calcolaTargetsCiclizzazione
- `17368` — _setupPianoTargets
- `17392` — getStagioneCorrente
- `17401` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 17835-17835

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `17835` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 17844-18303

- `17844` — aggiornaUIcolazione
- `17854` — salvaRegolePiano
- `17915` — _isModelloSistema
- `17918` — _isModelloSistemaModificato
- `17930` — caricaModelliCustomLocal
- `17944` — salvaModelliCustomLocal
- `17965` — _migraRecordCustom
- `17980` — _syncAliasLegacy
- `17989` — caricaAlimentiCustom
- `18013` — pushAlimentiCustomSupabase
- `18023` — pullAlimentiCustomSupabase
- `18037` — pushModelliSupabase
- `18055` — pullModelliSupabase
- `18080` — _calcolaFreqDaModello
- `18099` — aggiornaUImodello
- `18188` — popolaDropdownModelli
- `18216` — cambiaModelloRotazione
- `18222` — ripristinaModelloOriginale
- `18245` — eliminaModelloCustom
- `18263` — mostraAnteprimaModello
- `18273` — apriEditorModello
- `18303` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 18572-18810

- `15738` — rerender
- `18572` — _salvaModelloDaEditor
- `18614` — caricaRegolePiano
- `18644` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `18679` — _aiLogUsage
- `18701` — _aiProxyUrl
- `18707` — _aiTokenPerProxy
- `18736` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `18810` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 18889-19029

- `16216` — _risolviCollisioniCelle
- `18889` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `18949` — getFruttaStile
- `18956` — _fruttaGetPasto
- `18966` — _fruttaContaRigheRicetta
- `18970` — _fruttaIndiceBasePasto
- `18990` — getFruttaMarker
- `19003` — fruttaMarkerHtml
- `19011` — _fruttaCheckboxHtml
- `19020` — toggleFrutta
- `19029` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 19065-20339

- `19065` — _renderCelleGriglia
- `19145` — _renderRicetteTestuali
- `19184` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `19255` — _renderCelleHtml
- `19263` — toggleCellaMenu
- `19282` — closeAllCellaMenus
- `19290` — _trovaPasto
- `19298` — cellaSposta
- `19352` — cellaCancella
- `19373` — apriEditGrammatura
- `16789` — salva
- `19421` — cellaSwap
- `19441` — cellaRimuoviAlt
- `19455` — cellaAggiungiAlt
- `19558` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `19643` — apriEditRicetta
- `19652` — aggiungiRicetta
- `19668` — rimuoviRicetta
- `19677` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `19839` — ngAggiungiSpuntinoVuoto
- `19855` — apriAggiungiCella
- `17254` — risolviCompatibili
- `19951` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `20043` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `20184` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `20339` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 20387-20768

- `20387` — _attesoStrutturaPiano
- `20407` — _confrontaStrutturaPiano
- `20437` — _costruisciPromptDelta
- `20464` — _pianoToolSchema
- `20539` — _pianoMaxTokens
- `20548` — _estraiPianoDaRisposta
- `20570` — chiamaGeneraPiano
- `20737` — mostraLoadingSteps
- `18123` — render
- `20768` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 20835-21409

- `20835` — generaMessaggioAI
- `20940` — copiaMessaggioAI
- `20950` — salvaInStorico
- `20962` — salvaVarianteAI
- `20977` — renderVariantiSalvate
- `20996` — usaVariante
- `21014` — eliminaVariante
- `21025` — renderStoricoMsg
- `21041` — apriWhatsApp
- `21409` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 21587-23084

- `21587` — _ngColoreSemaforoNome
- `21595` — apriSceltaModalitaPiano
- `21630` — _ngChiudiModalita
- `21633` — _ngCostruisciGiornoVuoto
- `21666` — _ngCostruisciGiornoSpeciale
- `21677` — _ngIndiceInizioSpeciali
- `21688` — _ngModalitaNomeGiorno
- `21694` — _ngImpostaModalitaNomeGiorno
- `21697` — _ngLettera
- `21704` — _ngEtichettaGiorno
- `21724` — _ngEtichettaGiornoBreve
- `21738` — _ngToggleGiornoSpeciale
- `21762` — _ngRenderPannelloSpeciale
- `21830` — _generaGiornoSpecialeAI
- `21930` — _ngGiornoHaContenuto
- `21942` — _ngCreaPianoManuale
- `21965` — _ngScrollTabGiorni
- `21975` — _ngAbilitaDragScroll
- `22012` — _ngCambiaNumeroGiorni
- `22044` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `22058` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `22099` — _ngToggleCat
- `22108` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `22132` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `22288` — _ngSalvaPianoManuale
- `22314` — _ngParseIngrediente
- `22338` — _ngScomponiIngredienti
- `22350` — _ricCalcolaMacroDaIngredienti
- `22368` — _ricRicalcolaMacroLive
- `22375` — _ricAggiornaInfoMacro
- `22389` — _ricRicalcolaMacroLiveNow
- `22413` — _ngTrovaCategoriaAlimento
- `22446` — _ngPescaRicetta
- `22489` — _ngScomponiRicettaNelPasto
- `22526` — _ngDragStart
- `22537` — _ngDragStartCella
- `22548` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `22555` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `22560` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `22579` — _ngAggiungiAlimento
- `22604` — _ngRimuoviAlimento
- `22618` — _ngDopoModifica
- `22636` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `22689` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `22718` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `22735` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `22743` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `22815` — gramTestoCasalingo
- `22841` — _appendToggleNutrizionali
- `22884` — _appendTogglePromemoria
- `22913` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `23059` — cpFromEmoji
- `23065` — getEmojiCp
- `23084` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `21059` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `21081` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `21086` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `21112` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `21200` — _spesaTestoWhatsApp
- `21216` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `21261` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `21284` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `21312` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `21372` — scaricaListaSpesaPDF (download diretto, un click)
- `21380` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `21392` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 24232-24232

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
- `24232` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 24243-24449

- `24243` — salvaInbody
- `24307` — delInbody
- `24314` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `24449` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 24477-24946

- `24477` — buildSemLegenda
- `24491` — renderAlEditor
- `24552` — _alimNomeRegex
- `24560` — _alimGiorniDaPiano
- `24568` — _scanGiorniPerNome
- `24583` — scanRiferimentiAlimento
- `24612` — _alimRefsRighe
- `24618` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `24706` — modificaAlimentoCustom
- `24726` — ripristinaValoriPrecedentiAlimento
- `24738` — _resetAlimModal
- `24749` — apriNuovoAlimentoCustom
- `24755` — salvaAlimentoCustom
- `24822` — eliminaAlimentoCustom
- `24853` — _alimFonteBadge
- `24858` — renderAlimentiPage
- `22217` — E
- `24928` — archiviaAlimentoCustom
- `24946` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 24973-25210

- `24973` — _bcSetStatus
- `24975` — apriScannerBarcode
- `24983` — chiudiScannerBarcode
- `24988` — _bcStopCamera
- `24996` — _bcModaleAperto
- `24998` — _bcAvviaCamera
- `25009` — _bcAvviaNativo
- `25029` — _bcAvviaZXing
- `25038` — _bcZXStart
- `25049` — _bcErroreCamera
- `25057` — cercaBarcodeManuale
- `25063` — _barcodeTrovato
- `25079` — cercaBarcodeOFF
- `25097` — _bcProdottoNonTrovato
- `25111` — _bcPrecompilaForm
- `22477` — num
- `25135` — togAl
- `25188` — selCatAl
- `25402` — selTuttiAl
- `25210` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 25224-25540

- `25224` — setCalView
- `25225` — calPrev
- `25226` — calNext
- `25227` — calToday
- `25229` — renderCal
- `25243` — renderCalMonth
- `25267` — renderCalWeek
- `25285` — renderCalDay
- `25301` — selGiorno
- `25315` — setDisp
- `25320` — openAddEvento
- `25333` — openAddEventoPaz
- `25339` — toggleEntrataCheck
- `25344` — salvaEvento
- `25367` — openEvDetail
- `25422` — delEvento
- `25430` — copyMsg
- `25437` — aggDateCal
- `25442` — syncInizio
- `25443` — syncControllo
- `25444` — aggiornaPrev
- `25461` — renderRic
- `25488` — openNuovaRic
- `25489` — editRic
- `25499` — salvaRic
- `25524` — delRic
- `25540` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 25625-25685

- `25625` — aggiungiEntrataPerPaziente
- `25642` — openNuovaEntrata
- `25656` — salvaEntrata
- `25677` — delEntrata
- `25685` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 25715-26151

- `25715` — aiSuggerisciRicetta
- `25760` — renderConcettiModal
- `25779` — apriConcettiModal
- `25806` — salvaConcettiAllegati
- `25830` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `25868` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `25877` — loadInbodyPDF
- `25988` — _vitdLabel
- `25992` — getIntegratori
- `25996` — getIntegraWant
- `26000` — setIntegratori
- `26017` — setIntegraWant
- `26028` — getPatologieChip
- `26029` — getAllergieChip
- `26030` — setPatologieChip
- `26031` — setAllergieChip
- `26032` — getPatologie
- `26033` — getAllergie
- `26034` — setPatologieFromStr
- `26041` — setAllergieFromStr
- `26054` — getSdvChip
- `26055` — getCspChip
- `26056` — setSdvChip
- `26057` — setCspChip
- `26058` — setSdvFromStr
- `26059` — setCspFromStr
- `26063` — getBudget
- `26064` — setBudget
- `26069` — renderCalAnno
- `26100` — comprimeImmagine
- `26122` — uploadImmagineConcetto
- `26141` — rimuoviImmagineConcetto
- `26151` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 26217-26321

- `26217` — entraSelConcetti
- `26218` — annullaSelConcetti
- `26219` — toggleConcettoSel
- `26224` — eliminaConcettiSelezionati
- `26243` — confermaEliminaConcetti
- `26258` — aiRiscriviConcetto
- `26272` — editConcetto
- `26290` — salvaConcetto
- `26301` — openNuovoConcetto
- `26321` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 26322-26485

- `26322` — saveAgendaPersonale
- `26323` — getAgendaTodo
- `26324` — saveAgendaTodo
- `26326` — pulisciAgendaVecchia
- `26330` — navigaAgenda
- `26339` — toggleFormAgenda
- `26340` — toggleFormTodo
- `26342` — salvaAgendaItem
- `26356` — salvaTodoItem
- `26368` — toggleAgendaFatto
- `26376` — toggleTodoFatto
- `26389` — _catCol
- `26391` — renderAgendaDx
- `26485` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 26611-26815

- `26611` — renderScadenzeAlert
- `26796` — segnaGestito
- `26815` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 26824-26899

- `26824` — ripristinaPaz
- `26832` — eliminaPaz
- `26877` — getDove
- `26881` — setDove
- `26899` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 26904-27344

- `26904` — getCredenzialiPersistenti
- `26917` — cancellaCredenzialiPersistenti
- `26922` — rinnovaSessioneConRefreshToken
- `26939` — getSessioneSalvata
- `26958` — salvaSessione
- `26968` — cancellaSessione
- `26972` — eseguiLogin
- `27019` — eseguiLogout
- `27041` — mostraApp
- `27046` — verificaSessioneEAvvia
- `27074` — assicuraTokenValido
- `27103` — _garantiscoSessionePerSync
- `27115` — avviaRinnovoTokenPeriodico
- `27119` — fermaRinnovoTokenPeriodico
- `27128` — _authReset
- `27133` — _authMostra
- `27136` — mostraLogin
- `27137` — mostraRegistrazione
- `27138` — mostraRecupero
- `27139` — mostraNuovaPassword
- `27142` — eseguiRegistrazione
- `27180` — eseguiRecuperoPassword
- `27209` — eseguiNuovaPassword
- `27243` — _parseHashParams
- `27250` — _pulisciHash
- `27254` — gestisciRitornoAuth
- `27344` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 27416-27539

- `27416` — apriPannelloRicette
- `27445` — chiudiPannelloRicette
- `27453` — applicaRicettaPasto
- `27489` — inizializzaP2
- `27501` — deepClone
- `27505` — applicaPatch
- `27539` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
