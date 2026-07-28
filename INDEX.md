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
Righe 12382-13136

- `12382` — _ibFmtBreve
- `12391` — _renderPesiIntermediSection
- `12440` — aggiungiPesoIntermedio
- `12456` — eliminaPesoIntermedio
- `12466` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `13136` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 13372-13372

- `13372` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 13750-16291

- `13750` — aggiornaLabelMacros
- `13768` — calcolaMacros
- `13909` — applicaSchema
- `13944` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `13950` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `13972` — _misuraDaReferto *(P127 — UN referto letto con le regole del traguardo: usata anche dalla verifica al controllo)*
- `14005` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `14016` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `14034` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `14147` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `14161` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `14217` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `14231` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `14263` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `14296` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `14338` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `14346` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `14357` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `14384` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `14399` — _stradeVerso *(le strade complete + percentuale libera)*
- `14446` — _VC_TOLLERANZA_PCT / _VC_GIORNI_MIN / _VC_GIORNI_MIN_RITARO / _VC_COPERTURA_MIN_PCT / _VC_MAGRA_PRUDENZA_GG *(P127 — soglie cliniche della verifica)*
- `14456` — _mediaSlotPrescritta *(media pesata sui giorni di un campo dello storico target; la usa anche _kcalMediaPrescrittaOss)*
- `14476` — _vcDeficitSlot *(deficit di uno slot: campo offset o kcal−tdee per gli slot vecchi)*
- `14484` — _vcTratto *(P127 — cosa è cambiato fra due referti, previsto vs reale, TDEE misurato)*
- `14538` — _vcTraguardoSalvato *(traguardo ricostruito dal salvato, per la scheda Percorso)*
- `14548` — _verificaControllo *(P127 — motore puro: tratto recente, quadro dall'inizio, residuo al ritmo reale)*
- `14586` — _verificaControlloHtml *(blocco 🔎, unica fonte per pannello 🎯 e scheda Percorso; azioni solo dove c'è il campo kcal)*
- `14678` — _vcRitara *(scrive le kcal ritarate nel campo regime: propone, non salva)*
- `14691` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `14759` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `14781` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `14834` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `14941` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `14956` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `14981` — _renderRifPesoBox
- `15032` — _usaRifPeso
- `15036` — _aggiornaRifPesoTarget
- `15039` — _aggiornaRegimeSlider
- `15696` — _presetRegime
- `15700` — _initRegimeSliderDaPaziente
- `15718` — ricalcolaLAF
- `15852` — renderStoricoTDEE
- `15886` — attivaSlotTDEE
- `15894` — eliminaSlotTDEE
- `15907` — _toggleCiclizzazione
- `15913` — _aggiornaAnteprimaCiclizzazione
- `15931` — salvaCalcoloMacros
- `16045` — _metAllenamento
- `16061` — _neatFrazione
- `16135` — _larnLafStileVita
- `16152` — _regimeOffset
- `16162` — _componiRegimeText
- `16195` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `16207` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `16214` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `16291` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 16309-16739

- `16309` — renderTargetBadge
- `16338` — verificaRegola_75_20_5
- `16375` — renderBadge75_20_5
- `16440` — _validaNorm
- `16443` — _validaMatchTermine
- `16451` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `16502` — _validaTesto
- `16523` — validaPiano
- `16597` — _validaFirmaBlocchi
- `16604` — renderBadgeValidatore
- `16635` — _validaVaiAlGiorno
- `16644` — apriPannelloValidatore
- `13472` — esc
- `16701` — _validaEseguiOverride
- `16724` — validaGateExport
- `16739` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 16872-17504

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
- `16872` — pianoPazSelezionato
- `17019` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `17257` — renderPanelMacrosGiorno
- `17400` — pmgCambiaGrammi
- `17427` — riapriPiano
- `17465` — _montaPianoCorrente
- `17504` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 17514-17983

- `17514` — pullTemplateSupabase
- `17525` — delTemplateSupabase
- `17534` — _promptTemplateNome
- `17559` — _creaTemplateDaJSON
- `17582` — salvaComeTemplate
- `17593` — salvaComeTemplateDaPiano
- `17602` — _normNomeAlim
- `17603` — _escRegAlim
- `17604` — _raccogliAlimentiDaPiano
- `17615` — _alimentiEsclusiPaziente
- `17627` — _trovaConflittiTemplate
- `17645` — _mostraAvvisoConflitti
- `17669` — applicaTemplate
- `17687` — apriPickerTemplate
- `17715` — _pickPaziente
- `17734` — applicaTemplatePick
- `17738` — rinominaTemplate
- `17749` — eliminaTemplate
- `17759` — renderLibreriaTemplate
- `17788` — renderStoricoPiani
- `17847` — eliminaPiano
- `17863` — _getActiveMacrosTarget
- `17887` — getTargetAttivi
- `17924` — calcolaTargetsCiclizzazione
- `17950` — _setupPianoTargets
- `17974` — getStagioneCorrente
- `17983` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 18445-18445

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `18445` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 18454-18913

- `18454` — aggiornaUIcolazione
- `18464` — salvaRegolePiano
- `18525` — _isModelloSistema
- `18528` — _isModelloSistemaModificato
- `18540` — caricaModelliCustomLocal
- `18554` — salvaModelliCustomLocal
- `18575` — _migraRecordCustom
- `18590` — _syncAliasLegacy
- `18599` — caricaAlimentiCustom
- `18623` — pushAlimentiCustomSupabase
- `18633` — pullAlimentiCustomSupabase
- `18647` — pushModelliSupabase
- `18665` — pullModelliSupabase
- `18690` — _calcolaFreqDaModello
- `18709` — aggiornaUImodello
- `18798` — popolaDropdownModelli
- `18826` — cambiaModelloRotazione
- `18832` — ripristinaModelloOriginale
- `18855` — eliminaModelloCustom
- `18873` — mostraAnteprimaModello
- `18883` — apriEditorModello
- `18913` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 19182-19420

- `15738` — rerender
- `19182` — _salvaModelloDaEditor
- `19224` — caricaRegolePiano
- `19254` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `19289` — _aiLogUsage
- `19311` — _aiProxyUrl
- `19317` — _aiTokenPerProxy
- `19346` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `19420` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 19499-19639

- `16216` — _risolviCollisioniCelle
- `19499` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `19559` — getFruttaStile
- `19566` — _fruttaGetPasto
- `19576` — _fruttaContaRigheRicetta
- `19580` — _fruttaIndiceBasePasto
- `19600` — getFruttaMarker
- `19613` — fruttaMarkerHtml
- `19621` — _fruttaCheckboxHtml
- `19630` — toggleFrutta
- `19639` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 19675-20949

- `19675` — _renderCelleGriglia
- `19755` — _renderRicetteTestuali
- `19794` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `19865` — _renderCelleHtml
- `19873` — toggleCellaMenu
- `19892` — closeAllCellaMenus
- `19900` — _trovaPasto
- `19908` — cellaSposta
- `19962` — cellaCancella
- `19983` — apriEditGrammatura
- `16789` — salva
- `20031` — cellaSwap
- `20051` — cellaRimuoviAlt
- `20065` — cellaAggiungiAlt
- `20168` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `20253` — apriEditRicetta
- `20262` — aggiungiRicetta
- `20278` — rimuoviRicetta
- `20287` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `20449` — ngAggiungiSpuntinoVuoto
- `20465` — apriAggiungiCella
- `17254` — risolviCompatibili
- `20561` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `20653` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `20794` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `20949` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 20997-21389

- `20997` — _attesoStrutturaPiano
- `21017` — _confrontaStrutturaPiano
- `21047` — _costruisciPromptDelta
- `21074` — _pianoToolSchema
- `21149` — _pianoMaxTokens
- `21158` — _estraiPianoDaRisposta
- `21180` — chiamaGeneraPiano
- `21347` — mostraLoadingSteps
- `18123` — render
- `21389` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 21456-22033

- `21456` — generaMessaggioAI
- `21561` — copiaMessaggioAI
- `21571` — salvaInStorico
- `21583` — salvaVarianteAI
- `21598` — renderVariantiSalvate
- `21617` — usaVariante
- `21635` — eliminaVariante
- `21646` — renderStoricoMsg
- `21662` — apriWhatsApp
- `22033` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 22211-23708

- `22211` — _ngColoreSemaforoNome
- `22219` — apriSceltaModalitaPiano
- `22254` — _ngChiudiModalita
- `22257` — _ngCostruisciGiornoVuoto
- `22290` — _ngCostruisciGiornoSpeciale
- `22301` — _ngIndiceInizioSpeciali
- `22312` — _ngModalitaNomeGiorno
- `22318` — _ngImpostaModalitaNomeGiorno
- `22321` — _ngLettera
- `22328` — _ngEtichettaGiorno
- `22348` — _ngEtichettaGiornoBreve
- `22362` — _ngToggleGiornoSpeciale
- `22386` — _ngRenderPannelloSpeciale
- `22454` — _generaGiornoSpecialeAI
- `22554` — _ngGiornoHaContenuto
- `22566` — _ngCreaPianoManuale
- `22589` — _ngScrollTabGiorni
- `22599` — _ngAbilitaDragScroll
- `22636` — _ngCambiaNumeroGiorni
- `22668` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `22682` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `22723` — _ngToggleCat
- `22732` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `22756` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `22912` — _ngSalvaPianoManuale
- `22938` — _ngParseIngrediente
- `22962` — _ngScomponiIngredienti
- `22974` — _ricCalcolaMacroDaIngredienti
- `22992` — _ricRicalcolaMacroLive
- `22999` — _ricAggiornaInfoMacro
- `23013` — _ricRicalcolaMacroLiveNow
- `23037` — _ngTrovaCategoriaAlimento
- `23070` — _ngPescaRicetta
- `23113` — _ngScomponiRicettaNelPasto
- `23150` — _ngDragStart
- `23161` — _ngDragStartCella
- `23172` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `23179` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `23184` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `23203` — _ngAggiungiAlimento
- `23228` — _ngRimuoviAlimento
- `23242` — _ngDopoModifica
- `23260` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `23313` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `23342` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `23359` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `23367` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `23439` — gramTestoCasalingo
- `23465` — _appendToggleNutrizionali
- `23508` — _appendTogglePromemoria
- `23537` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `23683` — cpFromEmoji
- `23689` — getEmojiCp
- `23708` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `21683` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `21705` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `21710` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `21736` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `21824` — _spesaTestoWhatsApp
- `21840` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `21885` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `21908` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `21936` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `21996` — scaricaListaSpesaPDF (download diretto, un click)
- `22004` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `22016` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 24856-24856

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
- `24856` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 24867-25073

- `24867` — salvaInbody
- `24931` — delInbody
- `24938` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `25073` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 25101-25570

- `25101` — buildSemLegenda
- `25115` — renderAlEditor
- `25176` — _alimNomeRegex
- `25184` — _alimGiorniDaPiano
- `25192` — _scanGiorniPerNome
- `25207` — scanRiferimentiAlimento
- `25236` — _alimRefsRighe
- `25242` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `25330` — modificaAlimentoCustom
- `25350` — ripristinaValoriPrecedentiAlimento
- `25362` — _resetAlimModal
- `25373` — apriNuovoAlimentoCustom
- `25379` — salvaAlimentoCustom
- `25446` — eliminaAlimentoCustom
- `25477` — _alimFonteBadge
- `25482` — renderAlimentiPage
- `22217` — E
- `25552` — archiviaAlimentoCustom
- `25570` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 25597-25834

- `25597` — _bcSetStatus
- `25599` — apriScannerBarcode
- `25607` — chiudiScannerBarcode
- `25612` — _bcStopCamera
- `25620` — _bcModaleAperto
- `25622` — _bcAvviaCamera
- `25633` — _bcAvviaNativo
- `25653` — _bcAvviaZXing
- `25662` — _bcZXStart
- `25673` — _bcErroreCamera
- `25681` — cercaBarcodeManuale
- `25687` — _barcodeTrovato
- `25703` — cercaBarcodeOFF
- `25721` — _bcProdottoNonTrovato
- `25735` — _bcPrecompilaForm
- `22477` — num
- `25759` — togAl
- `25812` — selCatAl
- `25402` — selTuttiAl
- `25834` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 25848-26164

- `25848` — setCalView
- `25849` — calPrev
- `25850` — calNext
- `25851` — calToday
- `25853` — renderCal
- `25867` — renderCalMonth
- `25891` — renderCalWeek
- `25909` — renderCalDay
- `25925` — selGiorno
- `25939` — setDisp
- `25944` — openAddEvento
- `25957` — openAddEventoPaz
- `25963` — toggleEntrataCheck
- `25968` — salvaEvento
- `25991` — openEvDetail
- `26046` — delEvento
- `26054` — copyMsg
- `26061` — aggDateCal
- `26066` — syncInizio
- `26067` — syncControllo
- `26068` — aggiornaPrev
- `26085` — renderRic
- `26112` — openNuovaRic
- `26113` — editRic
- `26123` — salvaRic
- `26148` — delRic
- `26164` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 26249-26309

- `26249` — aggiungiEntrataPerPaziente
- `26266` — openNuovaEntrata
- `26280` — salvaEntrata
- `26301` — delEntrata
- `26309` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 26339-26803

- `26339` — aiSuggerisciRicetta
- `26384` — renderConcettiModal
- `26403` — apriConcettiModal
- `26430` — salvaConcettiAllegati
- `26454` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `26492` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `26501` — loadInbodyPDF
- `26613` — _vitdLabel
- `26617` — getIntegratori
- `26621` — getIntegraWant
- `26625` — setIntegratori
- `26642` — setIntegraWant
- `26680` — getPatologieChip
- `26681` — getAllergieChip
- `26682` — setPatologieChip
- `26683` — setAllergieChip
- `26684` — getPatologie
- `26685` — getAllergie
- `26686` — setPatologieFromStr
- `26693` — setAllergieFromStr
- `26706` — getSdvChip
- `26707` — getCspChip
- `26708` — setSdvChip
- `26709` — setCspChip
- `26710` — setSdvFromStr
- `26711` — setCspFromStr
- `26715` — getBudget
- `26716` — setBudget
- `26721` — renderCalAnno
- `26752` — comprimeImmagine
- `26774` — uploadImmagineConcetto
- `26793` — rimuoviImmagineConcetto
- `26803` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 26869-26973

- `26869` — entraSelConcetti
- `26870` — annullaSelConcetti
- `26871` — toggleConcettoSel
- `26876` — eliminaConcettiSelezionati
- `26895` — confermaEliminaConcetti
- `26910` — aiRiscriviConcetto
- `26924` — editConcetto
- `26942` — salvaConcetto
- `26953` — openNuovoConcetto
- `26973` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 26974-27137

- `26974` — saveAgendaPersonale
- `26975` — getAgendaTodo
- `26976` — saveAgendaTodo
- `26978` — pulisciAgendaVecchia
- `26982` — navigaAgenda
- `26991` — toggleFormAgenda
- `26992` — toggleFormTodo
- `26994` — salvaAgendaItem
- `27008` — salvaTodoItem
- `27020` — toggleAgendaFatto
- `27028` — toggleTodoFatto
- `27041` — _catCol
- `27043` — renderAgendaDx
- `27137` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 27263-27467

- `27263` — renderScadenzeAlert
- `27448` — segnaGestito
- `27467` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 27476-27551

- `27476` — ripristinaPaz
- `27484` — eliminaPaz
- `27529` — getDove
- `27533` — setDove
- `27551` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 27556-27996

- `27556` — getCredenzialiPersistenti
- `27569` — cancellaCredenzialiPersistenti
- `27574` — rinnovaSessioneConRefreshToken
- `27591` — getSessioneSalvata
- `27610` — salvaSessione
- `27620` — cancellaSessione
- `27624` — eseguiLogin
- `27671` — eseguiLogout
- `27693` — mostraApp
- `27698` — verificaSessioneEAvvia
- `27726` — assicuraTokenValido
- `27755` — _garantiscoSessionePerSync
- `27767` — avviaRinnovoTokenPeriodico
- `27771` — fermaRinnovoTokenPeriodico
- `27780` — _authReset
- `27785` — _authMostra
- `27788` — mostraLogin
- `27789` — mostraRegistrazione
- `27790` — mostraRecupero
- `27791` — mostraNuovaPassword
- `27794` — eseguiRegistrazione
- `27832` — eseguiRecuperoPassword
- `27861` — eseguiNuovaPassword
- `27895` — _parseHashParams
- `27902` — _pulisciHash
- `27906` — gestisciRitornoAuth
- `27996` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 28068-28191

- `28068` — apriPannelloRicette
- `28097` — chiudiPannelloRicette
- `28105` — applicaRicettaPasto
- `28141` — inizializzaP2
- `28153` — deepClone
- `28157` — applicaPatch
- `28191` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
