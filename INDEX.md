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
Righe 2414-2456

- `2414` — _slugAlimento
- `2422` — _catalogoIndicizza
- `2426` — _catalogoDeindicizza
- `2433` — costruisciCatalogo
- `2456` — risolviAlimento

---

### MACROS PIANO — calcolo e badge macro reali vs target
Righe 2471-2734

- `2471` — getValoriCREA
- `2483` — getCurrentPaziente
- `2503` — getKcalWeekend
- `2560` — getMacrosRicettaComposta
- `2566` — calcolaMacrosPiano
- `2668` — renderBadgeMacrosReali
- `2611` — pctStr
- `2612` — color
- `2625` — row
- `2734` — renderBadgeMacrosReali_DOM

---

### ANALISI DEL SANGUE — parsing, indici clinici derivati, interpretazione
Righe 3019-3206

- `3019` — _parseAnalisiNum
- `3027` — calcolaIndice
- `3180` — interpretaAnalisi
- `3192` — _interpAnalisiHtml
- `3206` — mostraInfoRange

---

### CONCETTI EDUCATIVI — sync Supabase, migrazione
Righe 3349-3373

- `3349` — pushConcetiSupabase
- `3359` — pullConcetiSupabase
- `3373` — migraConcetti

---

### ALIMENTI — categorie funzionali/semaforo, chip UI, equivalenze porzioni
Righe 3563-3918

- `3563` — getCategoriaSemaforo
- `3580` — _getCategorieGruppo
- `3594` — calcolaGrammaturaEquivalente
- `3634` — _gruppoEquiv  (P121: gruppo di equivalenza + criterio per categoria funzionale)
- `3640` — _porzioneStandard  (P121: porzione `g` di database dell'alimento)
- `3655` — suggerisciGrEquivalente  (P121: firma a 3 argomenti, il gruppo si deduce dai due alimenti)
- `3681` — _etichettaCriterio  (P121: ≈carbo / ≈prot / ≈grassi / fissa / porzione)
- `3696` — _promptAlternativeGrassi  (P121: riga del prompt AI generata dal motore)
- `3712` — ricalcolaAlternative  (P121: MOTORE UNICO, unico punto che scrive la grammatura di un'alternativa)
- `3731` — ricalcolaAlternativePiano  (P121: applica il motore a tutte le celle di un piano)
- `3780` — arrotondaGrammatura  (P121: sostituisce arrotondaPorzioneDiscreta — pezzi interi senza tetto / 5g)
- `3790` — getCategoriaFunzionale
- `3830` — catArr
- `3846` — _tagComuniTrova
- `3850` — getTagComuniChip
- `3853` — setTagComuniChip
- `3861` — setCatChips
- `3874` — getStagioniChip
- `3877` — setStagioniChip
- `3884` — getProfiloChip
- `3887` — setProfiloChip
- `3896` — wireChipGroup
- `3907` — wireAttrChipGroups
- `3918` — wireRadioChipGroup

---

### CONFIG / STORAGE LOCALE — cfg, localStorage db, util data/valuta
Righe 3946-4325

- `3946` — getCfg
- `3947` — saveCfgL
- `3948` — getUrl
- `3949` — saveLocal
- `3950` — loadLocal
- `3961` — uid
- `3962` — today
- `3963` — addDays
- `3964` — fData
- `3965` — fEur
- `3967` — getLastSyncText
- `3977` — getSyncColor
- `3985` — aggiornaStatoSync
- `4011` — setSyncStatus
- `4279` — _registraTombstone
- `4287` — _tombstoneAttivi
- `4299` — _fondiTombstones
- `4313` — _mergeTombstonesRemoti *(dal 24/7 legge il meta da `collections`, P74 1d)*
- `4325` — _applicaTombstones
- `4186` — _pazFetchMeta *(P74 1d — solo `collections`)*
- `4207` — _collectionsUpsert *(P74 — scrittura primaria dei 4 meta-record dal cutover 1d)*
- `4229` — _collectionsFetch *(P74 1d — lettura unica dei meta-record)*
- `4252` — _analisiSangueUpsert *(P74 fase 2 — scrittura ombra analisi del sangue, 24/7)*

---

### SYNC SUPABASE — push/pull ricette/pazienti, tombstones, conflitti (P69)
Righe 4349-4734

- `4349` — supaHeaders
- `4363` — pushRicetteSupabase
- `4388` — pullRicetteSupabase
- `4410` — delRicetteSupabase
- `4422` — delPazienteSupabase
- `4437` — pushToSheets
- `4481` — pullFromSheets
- `4560` — syncNow
- `4573` — sincronizzaTutto
- `4360` — stpSet
- `4365` — stpMsg
- `4704` — testConnSupabase
- `4734` — _p68LogSaveAnonimo

---

### SYNC SUPABASE — save paziente, piani/cache piano, entrate, eventi
Righe 4748-5264

- `4748` — save
- `4766` — _pushRigaPerId
- `4799` — _flushDirtyIds
- `4882` — _p69LoadBaseline
- `4885` — _p69StoreBaseline
- `4888` — _p69SetBaseline
- `4892` — _p69DropBaseline
- `4896` — _p69SetBaselineFromRows
- `4902` — _p69NomePaz
- `4907` — _p69InList
- `4915` — _p69RilevaConflitti
- `4951` — _p69DialogoConflitti
- `4738` — chiudi
- `4985` — _p69RisolviRicarica
- `5014` — _p69EsportaLocali
- `5027` — _p69RisolviSovrascrivi
- `5040` — pushPianoSupabase
- `5062` — pullPianiSupabase
- `5078` — delPianoSupabase
- `5094` — delPianiPazienteSupabase
- `5106` — pushCachePianoSupabase
- `5123` — caricaCachePianoSupabase
- `5145` — pushEntrateSupabase
- `5169` — pullEntrateSupabase
- `5183` — delEntrataSupabase
- `5191` — pushEntrataSupabase
- `5202` — pushEventoSupabase
- `5215` — pushEventiSupabase
- `5239` — pullEventiSupabase
- `5253` — delEventoSupabase
- `5264` — _pianoCacheKey

---

### UI GENERALE — config AI key, notifiche, navigazione (goTo/tab/modali)
Righe 5295-5407

- `5295` — _salvaPianoCache
- `5300` — _caricaPianoCache
- `5306` — salvaCfg
- `5307` — testConn
- `5314` — testaAntKey
- `5325` — initAntCard
- `5328` — esporta
- `5329` — importa
- `5334` — goTo
- `5351` — closeM
- `5359` — ngChiudiModale
- `5368` — ngChiudiPopupCoppia
- `5372` — ngAggiungiX
- `5383` — ngUpgradeModali
- `5403` — mTab
- `5404` — aggiornaEta
- `5405` — toggleOrarioNote
- `5406` — pdTab
- `5407` — notif

---

### PAZIENTI — registro: lista/card/kanban, apertura, editing, salvataggio, routine
Righe 5415-8181

- `5415` — getPazView
- `5416` — setPazView
- `5425` — _pazStatoPiano
- `5433` — _pazUrgenzaControllo
- `5440` — _pazStatoTagHtml
- `5449` — _pazAggiornaFiltroRegimi
- `5457` — renderPaz
- `5510` — _renderPazCard
- `5535` — _renderPazLista
- `5562` — _renderPazKanban
- `5600` — openNuovoPaz
- `5626` — editPaz
- `5704` — REGOLE_SEMAFORO_ALIMENTI *(15 condizioni cliniche → grigi/celesti; globale dal 26/7 per essere verificabile dal test)*
- `6151` — _SEM_COLORI_LEGACY / `6105` _SEM_COLORI_AUTO *(F9 — unico vocabolario dei colori automatici)*
- `6156` — NOMI_CONDIZIONE_SEMAFORO *(etichette delle 15 condizioni, usate anche dal riquadro della scheda)*
- `6178` — _semaforoCondizioniAttive *(le condizioni spuntate su un paziente)*
- `6189` — _semaforoMigraPaziente *(F9 — toglie i colori legacy e ricalcola; idempotente)*
- `6200` — _semaforoMigraTutti *(passata su tutti i pazienti in memoria, con conteggio)*
- `6211` — applicaRegoloSemaforo *(dal 26/7 pulisce TUTTI e sei i colori automatici, non solo i suoi due)*
- `6299` — trovaChiaveAlimento *(match esatto sul nome: se non trova, la regola è ignorata in silenzio — vedi test s2-regole-nomi-alimenti)*
- `6323` — _pazNumOPrec *(F7 — campo assente = valore precedente, non azzeramento)*
- `6335` — _pazPreservaCampi *(F5 — l'anagrafica non cancella i campi che il form non gestisce)*
- `6341` — salvaPaz
- `6417` — openPaz
- `7868` — renderPdRoutine
- `6723` — cardHTML
- `8010` — updateRoutineCampo
- `8018` — suggerisciPastoEQuando
- `8045` — filtroLibreria
- `8054` — renderLibreriaGrid
- `8075` — aggiungiDaLibreriaIdx
- `8099` — openModalRoutine
- `8106` — salvaRoutineVoce
- `8131` — salvaRoutine
- `8138` — mostraRoutinePopup
- `8166` — removeRoutineVoce
- `8181` — _renderAggiustamentiSection

---

### 📈 PERCORSO — timeline di periodizzazione (P115 Tappe 1-5 COMPLETE, 24 lug 2026)
Righe 6021-6621 (numeri ESATTI al 24/7 notte, dopo la Tappa 5). ⚠️ Questo blocco (~600 righe) fa slittare tutti i numeri delle sezioni SUCCESSIVE a riga ~6020 rispetto all'ultima rigenerazione completa: per quelle sezioni fare grep di conferma. Rigenerazione completa alla prossima modifica strutturale.

- `6462` — _PERCORSO_TIPI (const: tipi fase, colori, pct default)
- `6469` — _percorsoGet *(normalizza p.percorso, scarta fasi invalide)*
- `6491` — _percorsoIsoLocal *(data → YYYY-MM-DD LOCALE, mai toISOString/UTC)*
- `6497` — _percorsoIntervalli *(fasi consecutive → date concrete dal/al)*
- `6511` — _percorsoFaseAt *(fase attiva a una data; dal incluso, al escluso)*
- `6520` — _percorsoKcalFase *(pct → kcal indicative via calcolaTDEE)*
- `6543` — _percorsoProiezione *(Tappa 2 — proiezione ibrida teorica/calibrata, cono, obiettivo a intervallo)*
- `6601` — _percorsoDataBreve *(ISO → "12 set")*
- `6618` — _percorsoSerieEnergia *(Tappa 3 — serie introito/TDEE stimato/TDEE osservato per la corsia energia)*
- `6657` — _percorsoSerieMassaMagra *(Tappa 4 — solo InBody: punti {data,m,pg})*
- `6676` — _percorsoConsuntivo *(Tappa 5 — legge p.consuntivo scritto da P50: aderenza, extra kcal, ritardo=extra÷7700, settimane perse; oggi sempre ok:false)*
- `6718` — _PERCORSO_LAYERS_DEFAULT / _percorsoLayersState / _percorsoLayersGet *(Tappa 4 — stato interruttori, SOLO sessione, mai su p)*
- `6723` — percorsoLayerToggle *(Tappa 4 — inverte un solo strato)*
- `6729` — percorsoVistaPreset *(Tappa 4 — preset "tecnica"/"paziente")*
- `6745` — _percorsoPaz *(e a seguire i mutatori percorsoInit/SetInizio/AddFase/UpdFase/DelFase/MoveFase)*
- `6801` — _PERCORSO_MODELLI / _PERCORSO_GEN *(P122 T3 — 4 modelli + regole dei cicli)*
- `6819` — _percorsoGeneraFasi *(P122 T3 — pura: dal traguardo alle fasi, ritmo = quello della proiezione)*
- `6899` — _percorsoModelloSelectHtml
- `6908` — percorsoGeneraDaModello *(propone; conferma prima di sostituire fasi esistenti)*
- `6931` — _percorsoShiftGiorni *(pura: ancora = ultima pesata)*
- `6941` — percorsoRiallinea *(⏩ trasla il piano, riprende dal giorno-fase dell'interruzione)*
- `6968` — _TRG_TIPI / `6744` _TRG_COMPORTAMENTI *(P122 T4 — tipi di traguardo e libreria comportamenti)*
- `6990` — _traguardiGet · `6761` _traguardoValoreAttuale *(valore corrente dai dati esistenti, null se manca)*
- `7029` — _traguardoVerso *(auto: dedotto dalla partenza)* · `6803` _traguardoValuta · `6824` _traguardiValuta
- `7070` — traguardoAdd · `6852` traguardoUpd · `6867` traguardoDel · `6873` traguardoSegna
- `7128` — _COND_TIPI · `6897` _percorsoCondizione *(pura: la fase finisce per soglia — SOLO suggerimento)*
- `7144` — percorsoSetCondizione · `6927` percorsoChiudiFase *(esito fotografato, riapribile)*
- `7178` — _traguardiHtml *(blocco 🏁 in fondo alla scheda Percorso)*
- `7276` — _percorsoVistaPaz / `7049` _percorsoVistaPazAttiva *(P122 T5 — modalità di sessione)*
- `7283` — _percorsoVittorie *(pura: vittorie dall'inizio del percorso + flag ricomposizione)*
- `7321` — _percorsoNascondiPeso *(in fase di massa il peso non si mostra al paziente)*
- `7332` — _traguardoFaseCorrente *(traguardo della fase IN CORSO, non quello lontano)*
- `7360` — _traguardoTestoPaziente *(righe in italiano semplice, riusate dal messaggio WhatsApp)*
- `7393` — _vistaPazienteHtml *(i tre riquadri che guarda il paziente)*
- `7473` — _percorsoChartSvg *(due corsie: peso + massa magra + cono proiezione sopra, striscia aderenza in mezzo (solo con dati P50), energia (kcal) sotto — tutto gated dagli interruttori)*
- `7662` — renderPdPercorso *(scheda: badge fase, riga proiezione/obiettivo, riga Piano vs Realtà (solo con dati), toolbar interruttori, grafico, editor)*

*(Tappa 2 tocca anche `calcolaMacros`: box obiettivo con intervallo al posto della data secca.)*

---

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 8266-8437

- `8266` — salvaAggiustamento
- `8299` — eliminaAggiustamento
- `8308` — renderPdNote
- `8343` — salvaNotaClinica
- `8358` — deleteNota
- `8367` — saveNote
- `8387` — resetSemaforoAuto *(F9 — pulsante 🔄 Ricalcola: pulisce gli automatici e rifà col sistema valido; il motore LEGACY non esiste più)*
- `8437` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 8663-8861

- `8663` — avviaFX
- `8691` — avviaAnalisi
- `8708` — _renderFlussoPanel
- `8752` — _riepEsc
- `8756` — _riepNum
- `8762` — _riepDelta
- `8770` — _riepDataSig
- `8788` — _riepParseFX
- `8087` — clean
- `8802` — _riepAggiornaFX
- `8828` — _riepToggleDomandaDefault
- `8840` — _riepAddDomanda
- `8853` — _riepRemoveDomanda
- `8861` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 9073-9300

- `8218` — dCol
- `8336` — card
- `9073` — renderPdRagionamento
- `9161` — inviaMessaggioRag
- `9179` — concludiERiassumi
- `9193` — salvaRagionamento
- `9214` — apriGeneratoreDaRag
- `9222` — nuovaSessioneRag
- `9228` — cancellaSavedRag
- `9238` — renderPazTimeline
- `9270` — renderPdAnamnesi
- `9300` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 11199-12334

- `11199` — _anNorm *(P125 — testo confrontabile: minuscole, niente accenti)*
- `11205` — _anCorrisponde *(P125 — ricerca per parole-prefisso: "vit d" trova "Vitamina D")*
- `11211` — filtraAnalisi *(P125 — filtro dal vivo delle 119 voci)*
- `11245` — pulisciRicercaAnalisi
- `11251` — renderPdAnalisi
- `11307` — toggleAnalisiSection
- `11456` — loadAnalisiSanguePDF
- `11343` — _impPdfConfigurata
- `11344` — _impPdfLib
- `11354` — _impPdfApri
- `11367` — _impPdfPagina *(P124b — una pagina del PDF → immagine, con la rotazione RILEVATA, non quella dichiarata dal file)*
- `11388` — _impRuotaImmagine
- `11413` — _impRilevaRotazione *(P124b — chiamata piccola: di quanti gradi va girata la pagina)*
- `11432` — _impPromptPagina *(P124b — prompt di UNA pagina, con l'impronta della riga: valore+unità+riferimento)*
- `11631` — _impNormalizzaNumero *(P124 — numero all'italiana → punto decimale, conversione fatta dall'app e non dall'AI)*
- `11642` — _impNumeri
- `11650` — _impSembraIntervallo
- `11658` — _impUgualeAlRange
- `11667` — _impLimitiStd
- `11688` — _impFuoriScala
- `11697` — _impCorrezioneVirgola
- `11709` — _impTestoLimiti
- `11730` — _impRifPlausibile *(P124b — un "riferimento" che è un'unità di misura = riga disallineata)*
- `11743` — _impUnitaCanonica
- `11765` — _impStessaGrandezza *(P124b — stesso tipo di misura a meno del prefisso: nanomoli/micromoli/millimoli)*
- `11782` — _impUnitaCompatibili
- `11793` — _impControllaValore *(P124 — i controlli anti-errore su un valore estratto)*
- `11857` — mostraDiffAnalisi *(P124 — colonna Estratto modificabile + righe sospette deselezionate)*
- `12047` — _calcoloIncluso
- `12053` — toggleCalcoloIncluso
- `12075` — _renderCalcoliPannello
- `12116` — toggleGlossario
- `12121` — updateAnalisi
- `12180` — salvaAnalisi
- `12193` — applicaGruppoClinico
- `12222` — renderBoxGruppiCliniciSuggeriti
- `12254` — suggerisciGruppiClinici
- `12334` — renderMemoriaInbody

---
### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9176 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `9430` — _richVal
- `9437` — _richBmi
- `9442` — _richPat
- `9448` — _richNum
- `9493` — _richPreselezione
- `9509` — richLeggiIntestazione
- `9513` — richSalvaIntestazione
- `9522` — apriRichiestaAnalisi
- `9542` — _richModaleHtml
- `9618` — _richEsc
- `9620` — _richMotivoCambia
- `9626` — _richToggleSez
- `9632` — _richAggiornaConteggi
- `9640` — _richMotivoCorrente
- `9650` — _richSelezione
- `9665` — _richTxt
- `9671` — _richCostruisciPDF
- `8969` — nuovaPagina
- `8970` — spazio
- `9767` — _richNomeFile
- `9772` — _richPrepara
- `9785` — _richRegistra
- `9790` — _richStato
- `9792` — richScaricaPDF
- `9841` — _richUpload
- `9843` — _richWaUrl
- `9850` — _richTestoWa
- `9864` — richInviaWhatsApp
- `9904` — richCopiaLink
- `9925` — _richStoricoHtml

---
### REFERTI DEL SANGUE DATATI — storico nel tempo (P118 tappa 1)
Righe 9194-9387 — migrazione, ordinamento, quadro attuale derivato, barra di selezione.

- `10976` — _refertoNuovoId
- `10979` — _refertoOggi
- `10983` — _refertoDataIt
- `10989` — _refertoConteggio
- `11003` — _refertiMigra
- `11030` — _refertiOrdinati
- `11041` — _refertoPiuRecente
- `11046` — _refertoInVista
- `11064` — _refertiApplica
- `11077` — _refertoCrea
- `11096` — refertoCambiaVista
- `11102` — refertoCambiaData
- `11114` — refertoNuovo
- `11122` — refertoDuplica
- `11131` — refertoElimina
- `11146` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `10589` — _rangeNum
- `10595` — _rangeTestoDa
- `10614` — _rangeCoppia
- `10624` — _rangeHtml

---
### ANDAMENTO NEL TEMPO — tracciato, variazione, grafico grande (P118 tappa 3)
Righe 9441-9745 — serie storica, regola del colore, sparkline, pannello in fondo.

- `10666` — _andLimiti
- `10687` — _andParseRangeLab
- `10700` — _andDistanza
- `10707` — _andValutazione
- `10720` — _andSerie
- `10734` — _andNum
- `10738` — _andDataBreve
- `10743` — _andMeseAnno
- `10751` — _andDominio
- `10765` — _andColore
- `10778` — _andSparkHtml
- `10804` — _andRigaHtml
- `10826` — _andEsamiSeguibili
- `10834` — andScegliEsame
- `10840` — _andPannelloHtml
- `10893` — _andGraficoGrande
- `10944` — _andPasso

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 12382-13149

- `12382` — _ibFmtBreve
- `12391` — _renderPesiIntermediSection
- `12440` — aggiungiPesoIntermedio
- `12456` — eliminaPesoIntermedio
- `12466` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `13149` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 13408-13408

- `13408` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 13786-16327

- `13786` — aggiornaLabelMacros
- `13804` — calcolaMacros
- `13945` — applicaSchema
- `13980` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `13986` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `14008` — _misuraDaReferto *(P127 — UN referto letto con le regole del traguardo: usata anche dalla verifica al controllo)*
- `14041` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `14052` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `14070` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `14183` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `14197` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `14253` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `14267` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `14299` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `14332` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `14374` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `14382` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `14393` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `14420` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `14435` — _stradeVerso *(le strade complete + percentuale libera)*
- `14482` — _VC_TOLLERANZA_PCT / _VC_GIORNI_MIN / _VC_GIORNI_MIN_RITARO / _VC_COPERTURA_MIN_PCT / _VC_MAGRA_PRUDENZA_GG *(P127 — soglie cliniche della verifica)*
- `14492` — _mediaSlotPrescritta *(media pesata sui giorni di un campo dello storico target; la usa anche _kcalMediaPrescrittaOss)*
- `14512` — _vcDeficitSlot *(deficit di uno slot: campo offset o kcal−tdee per gli slot vecchi)*
- `14520` — _vcTratto *(P127 — cosa è cambiato fra due referti, previsto vs reale, TDEE misurato)*
- `14574` — _vcTraguardoSalvato *(traguardo ricostruito dal salvato, per la scheda Percorso)*
- `14584` — _verificaControllo *(P127 — motore puro: tratto recente, quadro dall'inizio, residuo al ritmo reale)*
- `14622` — _verificaControlloHtml *(blocco 🔎, unica fonte per pannello 🎯 e scheda Percorso; azioni solo dove c'è il campo kcal)*
- `14714` — _vcRitara *(scrive le kcal ritarate nel campo regime: propone, non salva)*
- `14727` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `14795` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `14817` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `14870` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `14977` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `14992` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `15017` — _renderRifPesoBox
- `15068` — _usaRifPeso
- `15072` — _aggiornaRifPesoTarget
- `15075` — _aggiornaRegimeSlider
- `15732` — _presetRegime
- `15736` — _initRegimeSliderDaPaziente
- `15754` — ricalcolaLAF
- `15888` — renderStoricoTDEE
- `15922` — attivaSlotTDEE
- `15930` — eliminaSlotTDEE
- `15943` — _toggleCiclizzazione
- `15949` — _aggiornaAnteprimaCiclizzazione
- `15967` — salvaCalcoloMacros
- `16081` — _metAllenamento
- `16097` — _neatFrazione
- `16171` — _larnLafStileVita
- `16188` — _regimeOffset
- `16198` — _componiRegimeText
- `16231` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `16243` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `16250` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `16327` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 16345-16775

- `16345` — renderTargetBadge
- `16374` — verificaRegola_75_20_5
- `16411` — renderBadge75_20_5
- `16476` — _validaNorm
- `16479` — _validaMatchTermine
- `16487` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `16538` — _validaTesto
- `16559` — validaPiano
- `16633` — _validaFirmaBlocchi
- `16640` — renderBadgeValidatore
- `16671` — _validaVaiAlGiorno
- `16680` — apriPannelloValidatore
- `13472` — esc
- `16737` — _validaEseguiOverride
- `16760` — validaGateExport
- `16775` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 16908-17540

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
- `16908` — pianoPazSelezionato
- `17055` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `17293` — renderPanelMacrosGiorno
- `17436` — pmgCambiaGrammi
- `17463` — riapriPiano
- `17501` — _montaPianoCorrente
- `17540` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 17550-18019

- `17550` — pullTemplateSupabase
- `17561` — delTemplateSupabase
- `17570` — _promptTemplateNome
- `17595` — _creaTemplateDaJSON
- `17618` — salvaComeTemplate
- `17629` — salvaComeTemplateDaPiano
- `17638` — _normNomeAlim
- `17639` — _escRegAlim
- `17640` — _raccogliAlimentiDaPiano
- `17651` — _alimentiEsclusiPaziente
- `17663` — _trovaConflittiTemplate
- `17681` — _mostraAvvisoConflitti
- `17705` — applicaTemplate
- `17723` — apriPickerTemplate
- `17751` — _pickPaziente
- `17770` — applicaTemplatePick
- `17774` — rinominaTemplate
- `17785` — eliminaTemplate
- `17795` — renderLibreriaTemplate
- `17824` — renderStoricoPiani
- `17883` — eliminaPiano
- `17899` — _getActiveMacrosTarget
- `17923` — getTargetAttivi
- `17960` — calcolaTargetsCiclizzazione
- `17986` — _setupPianoTargets
- `18010` — getStagioneCorrente
- `18019` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 18481-18481

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `18481` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 18490-18949

- `18490` — aggiornaUIcolazione
- `18500` — salvaRegolePiano
- `18561` — _isModelloSistema
- `18564` — _isModelloSistemaModificato
- `18576` — caricaModelliCustomLocal
- `18590` — salvaModelliCustomLocal
- `18611` — _migraRecordCustom
- `18626` — _syncAliasLegacy
- `18635` — caricaAlimentiCustom
- `18659` — pushAlimentiCustomSupabase
- `18669` — pullAlimentiCustomSupabase
- `18683` — pushModelliSupabase
- `18701` — pullModelliSupabase
- `18726` — _calcolaFreqDaModello
- `18745` — aggiornaUImodello
- `18834` — popolaDropdownModelli
- `18862` — cambiaModelloRotazione
- `18868` — ripristinaModelloOriginale
- `18891` — eliminaModelloCustom
- `18909` — mostraAnteprimaModello
- `18919` — apriEditorModello
- `18949` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 19218-19456

- `15738` — rerender
- `19218` — _salvaModelloDaEditor
- `19260` — caricaRegolePiano
- `19290` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `19325` — _aiLogUsage
- `19347` — _aiProxyUrl
- `19353` — _aiTokenPerProxy
- `19382` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `19456` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 19535-19675

- `16216` — _risolviCollisioniCelle
- `19535` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `19595` — getFruttaStile
- `19602` — _fruttaGetPasto
- `19612` — _fruttaContaRigheRicetta
- `19616` — _fruttaIndiceBasePasto
- `19636` — getFruttaMarker
- `19649` — fruttaMarkerHtml
- `19657` — _fruttaCheckboxHtml
- `19666` — toggleFrutta
- `19675` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 19711-20985

- `19711` — _renderCelleGriglia
- `19791` — _renderRicetteTestuali
- `19830` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `19901` — _renderCelleHtml
- `19909` — toggleCellaMenu
- `19928` — closeAllCellaMenus
- `19936` — _trovaPasto
- `19944` — cellaSposta
- `19998` — cellaCancella
- `20019` — apriEditGrammatura
- `16789` — salva
- `20067` — cellaSwap
- `20087` — cellaRimuoviAlt
- `20101` — cellaAggiungiAlt
- `20204` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `20289` — apriEditRicetta
- `20298` — aggiungiRicetta
- `20314` — rimuoviRicetta
- `20323` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `20485` — ngAggiungiSpuntinoVuoto
- `20501` — apriAggiungiCella
- `17254` — risolviCompatibili
- `20597` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `20689` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `20830` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `20985` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 21033-21425

- `21033` — _attesoStrutturaPiano
- `21053` — _confrontaStrutturaPiano
- `21083` — _costruisciPromptDelta
- `21110` — _pianoToolSchema
- `21185` — _pianoMaxTokens
- `21194` — _estraiPianoDaRisposta
- `21216` — chiamaGeneraPiano
- `21383` — mostraLoadingSteps
- `18123` — render
- `21425` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 21492-22069

- `21492` — generaMessaggioAI
- `21597` — copiaMessaggioAI
- `21607` — salvaInStorico
- `21619` — salvaVarianteAI
- `21634` — renderVariantiSalvate
- `21653` — usaVariante
- `21671` — eliminaVariante
- `21682` — renderStoricoMsg
- `21698` — apriWhatsApp
- `22069` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 22247-23744

- `22247` — _ngColoreSemaforoNome
- `22255` — apriSceltaModalitaPiano
- `22290` — _ngChiudiModalita
- `22293` — _ngCostruisciGiornoVuoto
- `22326` — _ngCostruisciGiornoSpeciale
- `22337` — _ngIndiceInizioSpeciali
- `22348` — _ngModalitaNomeGiorno
- `22354` — _ngImpostaModalitaNomeGiorno
- `22357` — _ngLettera
- `22364` — _ngEtichettaGiorno
- `22384` — _ngEtichettaGiornoBreve
- `22398` — _ngToggleGiornoSpeciale
- `22422` — _ngRenderPannelloSpeciale
- `22490` — _generaGiornoSpecialeAI
- `22590` — _ngGiornoHaContenuto
- `22602` — _ngCreaPianoManuale
- `22625` — _ngScrollTabGiorni
- `22635` — _ngAbilitaDragScroll
- `22672` — _ngCambiaNumeroGiorni
- `22704` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `22718` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `22759` — _ngToggleCat
- `22768` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `22792` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `22948` — _ngSalvaPianoManuale
- `22974` — _ngParseIngrediente
- `22998` — _ngScomponiIngredienti
- `23010` — _ricCalcolaMacroDaIngredienti
- `23028` — _ricRicalcolaMacroLive
- `23035` — _ricAggiornaInfoMacro
- `23049` — _ricRicalcolaMacroLiveNow
- `23073` — _ngTrovaCategoriaAlimento
- `23106` — _ngPescaRicetta
- `23149` — _ngScomponiRicettaNelPasto
- `23186` — _ngDragStart
- `23197` — _ngDragStartCella
- `23208` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `23215` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `23220` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `23239` — _ngAggiungiAlimento
- `23264` — _ngRimuoviAlimento
- `23278` — _ngDopoModifica
- `23296` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `23349` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `23378` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `23395` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `23403` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `23475` — gramTestoCasalingo
- `23501` — _appendToggleNutrizionali
- `23544` — _appendTogglePromemoria
- `23573` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `23719` — cpFromEmoji
- `23725` — getEmojiCp
- `23744` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `21719` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `21741` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `21746` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `21772` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `21860` — _spesaTestoWhatsApp
- `21876` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `21921` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `21944` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `21972` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `22032` — scaricaListaSpesaPDF (download diretto, un click)
- `22040` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `22052` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 24892-24892

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
- `24892` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 24903-25109

- `24903` — salvaInbody
- `24967` — delInbody
- `24974` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `25109` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 25137-25606

- `25137` — buildSemLegenda
- `25151` — renderAlEditor
- `25212` — _alimNomeRegex
- `25220` — _alimGiorniDaPiano
- `25228` — _scanGiorniPerNome
- `25243` — scanRiferimentiAlimento
- `25272` — _alimRefsRighe
- `25278` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `25366` — modificaAlimentoCustom
- `25386` — ripristinaValoriPrecedentiAlimento
- `25398` — _resetAlimModal
- `25409` — apriNuovoAlimentoCustom
- `25415` — salvaAlimentoCustom
- `25482` — eliminaAlimentoCustom
- `25513` — _alimFonteBadge
- `25518` — renderAlimentiPage
- `22217` — E
- `25588` — archiviaAlimentoCustom
- `25606` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 25633-25870

- `25633` — _bcSetStatus
- `25635` — apriScannerBarcode
- `25643` — chiudiScannerBarcode
- `25648` — _bcStopCamera
- `25656` — _bcModaleAperto
- `25658` — _bcAvviaCamera
- `25669` — _bcAvviaNativo
- `25689` — _bcAvviaZXing
- `25698` — _bcZXStart
- `25709` — _bcErroreCamera
- `25717` — cercaBarcodeManuale
- `25723` — _barcodeTrovato
- `25739` — cercaBarcodeOFF
- `25757` — _bcProdottoNonTrovato
- `25771` — _bcPrecompilaForm
- `22477` — num
- `25795` — togAl
- `25848` — selCatAl
- `25402` — selTuttiAl
- `25870` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 25884-26200

- `25884` — setCalView
- `25885` — calPrev
- `25886` — calNext
- `25887` — calToday
- `25889` — renderCal
- `25903` — renderCalMonth
- `25927` — renderCalWeek
- `25945` — renderCalDay
- `25961` — selGiorno
- `25975` — setDisp
- `25980` — openAddEvento
- `25993` — openAddEventoPaz
- `25999` — toggleEntrataCheck
- `26004` — salvaEvento
- `26027` — openEvDetail
- `26082` — delEvento
- `26090` — copyMsg
- `26097` — aggDateCal
- `26102` — syncInizio
- `26103` — syncControllo
- `26104` — aggiornaPrev
- `26121` — renderRic
- `26148` — openNuovaRic
- `26149` — editRic
- `26159` — salvaRic
- `26184` — delRic
- `26200` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 26285-26345

- `26285` — aggiungiEntrataPerPaziente
- `26302` — openNuovaEntrata
- `26316` — salvaEntrata
- `26337` — delEntrata
- `26345` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 26375-26839

- `26375` — aiSuggerisciRicetta
- `26420` — renderConcettiModal
- `26439` — apriConcettiModal
- `26466` — salvaConcettiAllegati
- `26490` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `26528` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `26537` — loadInbodyPDF
- `26649` — _vitdLabel
- `26653` — getIntegratori
- `26657` — getIntegraWant
- `26661` — setIntegratori
- `26678` — setIntegraWant
- `26716` — getPatologieChip
- `26717` — getAllergieChip
- `26718` — setPatologieChip
- `26719` — setAllergieChip
- `26720` — getPatologie
- `26721` — getAllergie
- `26722` — setPatologieFromStr
- `26729` — setAllergieFromStr
- `26742` — getSdvChip
- `26743` — getCspChip
- `26744` — setSdvChip
- `26745` — setCspChip
- `26746` — setSdvFromStr
- `26747` — setCspFromStr
- `26751` — getBudget
- `26752` — setBudget
- `26757` — renderCalAnno
- `26788` — comprimeImmagine
- `26810` — uploadImmagineConcetto
- `26829` — rimuoviImmagineConcetto
- `26839` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 26905-27009

- `26905` — entraSelConcetti
- `26906` — annullaSelConcetti
- `26907` — toggleConcettoSel
- `26912` — eliminaConcettiSelezionati
- `26931` — confermaEliminaConcetti
- `26946` — aiRiscriviConcetto
- `26960` — editConcetto
- `26978` — salvaConcetto
- `26989` — openNuovoConcetto
- `27009` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 27010-27173

- `27010` — saveAgendaPersonale
- `27011` — getAgendaTodo
- `27012` — saveAgendaTodo
- `27014` — pulisciAgendaVecchia
- `27018` — navigaAgenda
- `27027` — toggleFormAgenda
- `27028` — toggleFormTodo
- `27030` — salvaAgendaItem
- `27044` — salvaTodoItem
- `27056` — toggleAgendaFatto
- `27064` — toggleTodoFatto
- `27077` — _catCol
- `27079` — renderAgendaDx
- `27173` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 27299-27503

- `27299` — renderScadenzeAlert
- `27484` — segnaGestito
- `27503` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 27512-27587

- `27512` — ripristinaPaz
- `27520` — eliminaPaz
- `27565` — getDove
- `27569` — setDove
- `27587` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 27592-28032

- `27592` — getCredenzialiPersistenti
- `27605` — cancellaCredenzialiPersistenti
- `27610` — rinnovaSessioneConRefreshToken
- `27627` — getSessioneSalvata
- `27646` — salvaSessione
- `27656` — cancellaSessione
- `27660` — eseguiLogin
- `27707` — eseguiLogout
- `27729` — mostraApp
- `27734` — verificaSessioneEAvvia
- `27762` — assicuraTokenValido
- `27791` — _garantiscoSessionePerSync
- `27803` — avviaRinnovoTokenPeriodico
- `27807` — fermaRinnovoTokenPeriodico
- `27816` — _authReset
- `27821` — _authMostra
- `27824` — mostraLogin
- `27825` — mostraRegistrazione
- `27826` — mostraRecupero
- `27827` — mostraNuovaPassword
- `27830` — eseguiRegistrazione
- `27868` — eseguiRecuperoPassword
- `27897` — eseguiNuovaPassword
- `27931` — _parseHashParams
- `27938` — _pulisciHash
- `27942` — gestisciRitornoAuth
- `28032` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 28104-28227

- `28104` — apriPannelloRicette
- `28133` — chiudiPannelloRicette
- `28141` — applicaRicettaPasto
- `28177` — inizializzaP2
- `28189` — deepClone
- `28193` — applicaPatch
- `28227` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
