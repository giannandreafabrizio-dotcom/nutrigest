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
Righe 2382-2424

- `2382` — _slugAlimento
- `2390` — _catalogoIndicizza
- `2394` — _catalogoDeindicizza
- `2401` — costruisciCatalogo
- `2424` — risolviAlimento

---

### MACROS PIANO — calcolo e badge macro reali vs target
Righe 2439-2702

- `2439` — getValoriCREA
- `2451` — getCurrentPaziente
- `2471` — getKcalWeekend
- `2528` — getMacrosRicettaComposta
- `2534` — calcolaMacrosPiano
- `2636` — renderBadgeMacrosReali
- `2611` — pctStr
- `2612` — color
- `2625` — row
- `2702` — renderBadgeMacrosReali_DOM

---

### ANALISI DEL SANGUE — parsing, indici clinici derivati, interpretazione
Righe 2987-3174

- `2987` — _parseAnalisiNum
- `2995` — calcolaIndice
- `3148` — interpretaAnalisi
- `3160` — _interpAnalisiHtml
- `3174` — mostraInfoRange

---

### CONCETTI EDUCATIVI — sync Supabase, migrazione
Righe 3317-3341

- `3317` — pushConcetiSupabase
- `3327` — pullConcetiSupabase
- `3341` — migraConcetti

---

### ALIMENTI — categorie funzionali/semaforo, chip UI, equivalenze porzioni
Righe 3531-3886

- `3531` — getCategoriaSemaforo
- `3548` — _getCategorieGruppo
- `3562` — calcolaGrammaturaEquivalente
- `3602` — _gruppoEquiv  (P121: gruppo di equivalenza + criterio per categoria funzionale)
- `3608` — _porzioneStandard  (P121: porzione `g` di database dell'alimento)
- `3623` — suggerisciGrEquivalente  (P121: firma a 3 argomenti, il gruppo si deduce dai due alimenti)
- `3649` — _etichettaCriterio  (P121: ≈carbo / ≈prot / ≈grassi / fissa / porzione)
- `3664` — _promptAlternativeGrassi  (P121: riga del prompt AI generata dal motore)
- `3680` — ricalcolaAlternative  (P121: MOTORE UNICO, unico punto che scrive la grammatura di un'alternativa)
- `3699` — ricalcolaAlternativePiano  (P121: applica il motore a tutte le celle di un piano)
- `3748` — arrotondaGrammatura  (P121: sostituisce arrotondaPorzioneDiscreta — pezzi interi senza tetto / 5g)
- `3758` — getCategoriaFunzionale
- `3798` — catArr
- `3814` — _tagComuniTrova
- `3818` — getTagComuniChip
- `3821` — setTagComuniChip
- `3829` — setCatChips
- `3842` — getStagioniChip
- `3845` — setStagioniChip
- `3852` — getProfiloChip
- `3855` — setProfiloChip
- `3864` — wireChipGroup
- `3875` — wireAttrChipGroups
- `3886` — wireRadioChipGroup

---

### CONFIG / STORAGE LOCALE — cfg, localStorage db, util data/valuta
Righe 3914-4287

- `3914` — getCfg
- `3915` — saveCfgL
- `3916` — getUrl
- `3917` — saveLocal
- `3918` — loadLocal
- `3925` — uid
- `3926` — today
- `3927` — addDays
- `3928` — fData
- `3929` — fEur
- `3931` — getLastSyncText
- `3941` — getSyncColor
- `3949` — aggiornaStatoSync
- `3975` — setSyncStatus
- `4241` — _registraTombstone
- `4249` — _tombstoneAttivi
- `4261` — _fondiTombstones
- `4275` — _mergeTombstonesRemoti *(dal 24/7 legge il meta da `collections`, P74 1d)*
- `4287` — _applicaTombstones
- `4148` — _pazFetchMeta *(P74 1d — solo `collections`)*
- `4169` — _collectionsUpsert *(P74 — scrittura primaria dei 4 meta-record dal cutover 1d)*
- `4191` — _collectionsFetch *(P74 1d — lettura unica dei meta-record)*
- `4214` — _analisiSangueUpsert *(P74 fase 2 — scrittura ombra analisi del sangue, 24/7)*

---

### SYNC SUPABASE — push/pull ricette/pazienti, tombstones, conflitti (P69)
Righe 4311-4696

- `4311` — supaHeaders
- `4325` — pushRicetteSupabase
- `4350` — pullRicetteSupabase
- `4372` — delRicetteSupabase
- `4384` — delPazienteSupabase
- `4399` — pushToSheets
- `4443` — pullFromSheets
- `4522` — syncNow
- `4535` — sincronizzaTutto
- `4360` — stpSet
- `4365` — stpMsg
- `4666` — testConnSupabase
- `4696` — _p68LogSaveAnonimo

---

### SYNC SUPABASE — save paziente, piani/cache piano, entrate, eventi
Righe 4710-5226

- `4710` — save
- `4728` — _pushRigaPerId
- `4761` — _flushDirtyIds
- `4844` — _p69LoadBaseline
- `4847` — _p69StoreBaseline
- `4850` — _p69SetBaseline
- `4854` — _p69DropBaseline
- `4858` — _p69SetBaselineFromRows
- `4864` — _p69NomePaz
- `4869` — _p69InList
- `4877` — _p69RilevaConflitti
- `4913` — _p69DialogoConflitti
- `4738` — chiudi
- `4947` — _p69RisolviRicarica
- `4976` — _p69EsportaLocali
- `4989` — _p69RisolviSovrascrivi
- `5002` — pushPianoSupabase
- `5024` — pullPianiSupabase
- `5040` — delPianoSupabase
- `5056` — delPianiPazienteSupabase
- `5068` — pushCachePianoSupabase
- `5085` — caricaCachePianoSupabase
- `5107` — pushEntrateSupabase
- `5131` — pullEntrateSupabase
- `5145` — delEntrataSupabase
- `5153` — pushEntrataSupabase
- `5164` — pushEventoSupabase
- `5177` — pushEventiSupabase
- `5201` — pullEventiSupabase
- `5215` — delEventoSupabase
- `5226` — _pianoCacheKey

---

### UI GENERALE — config AI key, notifiche, navigazione (goTo/tab/modali)
Righe 5253-5365

- `5253` — _salvaPianoCache
- `5258` — _caricaPianoCache
- `5264` — salvaCfg
- `5265` — testConn
- `5272` — testaAntKey
- `5283` — initAntCard
- `5286` — esporta
- `5287` — importa
- `5292` — goTo
- `5309` — closeM
- `5317` — ngChiudiModale
- `5326` — ngChiudiPopupCoppia
- `5330` — ngAggiungiX
- `5341` — ngUpgradeModali
- `5361` — mTab
- `5362` — aggiornaEta
- `5363` — toggleOrarioNote
- `5364` — pdTab
- `5365` — notif

---

### PAZIENTI — registro: lista/card/kanban, apertura, editing, salvataggio, routine
Righe 5373-8046

- `5373` — getPazView
- `5374` — setPazView
- `5383` — _pazStatoPiano
- `5391` — _pazUrgenzaControllo
- `5398` — _pazStatoTagHtml
- `5407` — _pazAggiornaFiltroRegimi
- `5415` — renderPaz
- `5468` — _renderPazCard
- `5493` — _renderPazLista
- `5520` — _renderPazKanban
- `5558` — openNuovoPaz
- `5584` — editPaz
- `5654` — applicaRegoloSemaforo
- `6165` — trovaChiaveAlimento
- `6189` — _pazNumOPrec *(F7 — campo assente = valore precedente, non azzeramento)*
- `6201` — _pazPreservaCampi *(F5 — l'anagrafica non cancella i campi che il form non gestisce)*
- `6207` — salvaPaz
- `6283` — openPaz
- `7733` — renderPdRoutine
- `6723` — cardHTML
- `7875` — updateRoutineCampo
- `7883` — suggerisciPastoEQuando
- `7910` — filtroLibreria
- `7919` — renderLibreriaGrid
- `7940` — aggiungiDaLibreriaIdx
- `7964` — openModalRoutine
- `7971` — salvaRoutineVoce
- `7996` — salvaRoutine
- `8003` — mostraRoutinePopup
- `8031` — removeRoutineVoce
- `8046` — _renderAggiustamentiSection

---

### 📈 PERCORSO — timeline di periodizzazione (P115 Tappe 1-5 COMPLETE, 24 lug 2026)
Righe 6021-6621 (numeri ESATTI al 24/7 notte, dopo la Tappa 5). ⚠️ Questo blocco (~600 righe) fa slittare tutti i numeri delle sezioni SUCCESSIVE a riga ~6020 rispetto all'ultima rigenerazione completa: per quelle sezioni fare grep di conferma. Rigenerazione completa alla prossima modifica strutturale.

- `6327` — _PERCORSO_TIPI (const: tipi fase, colori, pct default)
- `6334` — _percorsoGet *(normalizza p.percorso, scarta fasi invalide)*
- `6356` — _percorsoIsoLocal *(data → YYYY-MM-DD LOCALE, mai toISOString/UTC)*
- `6362` — _percorsoIntervalli *(fasi consecutive → date concrete dal/al)*
- `6376` — _percorsoFaseAt *(fase attiva a una data; dal incluso, al escluso)*
- `6385` — _percorsoKcalFase *(pct → kcal indicative via calcolaTDEE)*
- `6408` — _percorsoProiezione *(Tappa 2 — proiezione ibrida teorica/calibrata, cono, obiettivo a intervallo)*
- `6466` — _percorsoDataBreve *(ISO → "12 set")*
- `6483` — _percorsoSerieEnergia *(Tappa 3 — serie introito/TDEE stimato/TDEE osservato per la corsia energia)*
- `6522` — _percorsoSerieMassaMagra *(Tappa 4 — solo InBody: punti {data,m,pg})*
- `6541` — _percorsoConsuntivo *(Tappa 5 — legge p.consuntivo scritto da P50: aderenza, extra kcal, ritardo=extra÷7700, settimane perse; oggi sempre ok:false)*
- `6583` — _PERCORSO_LAYERS_DEFAULT / _percorsoLayersState / _percorsoLayersGet *(Tappa 4 — stato interruttori, SOLO sessione, mai su p)*
- `6588` — percorsoLayerToggle *(Tappa 4 — inverte un solo strato)*
- `6594` — percorsoVistaPreset *(Tappa 4 — preset "tecnica"/"paziente")*
- `6610` — _percorsoPaz *(e a seguire i mutatori percorsoInit/SetInizio/AddFase/UpdFase/DelFase/MoveFase)*
- `6666` — _PERCORSO_MODELLI / _PERCORSO_GEN *(P122 T3 — 4 modelli + regole dei cicli)*
- `6684` — _percorsoGeneraFasi *(P122 T3 — pura: dal traguardo alle fasi, ritmo = quello della proiezione)*
- `6764` — _percorsoModelloSelectHtml
- `6773` — percorsoGeneraDaModello *(propone; conferma prima di sostituire fasi esistenti)*
- `6796` — _percorsoShiftGiorni *(pura: ancora = ultima pesata)*
- `6806` — percorsoRiallinea *(⏩ trasla il piano, riprende dal giorno-fase dell'interruzione)*
- `6833` — _TRG_TIPI / `6744` _TRG_COMPORTAMENTI *(P122 T4 — tipi di traguardo e libreria comportamenti)*
- `6855` — _traguardiGet · `6761` _traguardoValoreAttuale *(valore corrente dai dati esistenti, null se manca)*
- `6894` — _traguardoVerso *(auto: dedotto dalla partenza)* · `6803` _traguardoValuta · `6824` _traguardiValuta
- `6935` — traguardoAdd · `6852` traguardoUpd · `6867` traguardoDel · `6873` traguardoSegna
- `6993` — _COND_TIPI · `6897` _percorsoCondizione *(pura: la fase finisce per soglia — SOLO suggerimento)*
- `7009` — percorsoSetCondizione · `6927` percorsoChiudiFase *(esito fotografato, riapribile)*
- `7043` — _traguardiHtml *(blocco 🏁 in fondo alla scheda Percorso)*
- `7141` — _percorsoVistaPaz / `7049` _percorsoVistaPazAttiva *(P122 T5 — modalità di sessione)*
- `7148` — _percorsoVittorie *(pura: vittorie dall'inizio del percorso + flag ricomposizione)*
- `7186` — _percorsoNascondiPeso *(in fase di massa il peso non si mostra al paziente)*
- `7197` — _traguardoFaseCorrente *(traguardo della fase IN CORSO, non quello lontano)*
- `7225` — _traguardoTestoPaziente *(righe in italiano semplice, riusate dal messaggio WhatsApp)*
- `7258` — _vistaPazienteHtml *(i tre riquadri che guarda il paziente)*
- `7338` — _percorsoChartSvg *(due corsie: peso + massa magra + cono proiezione sopra, striscia aderenza in mezzo (solo con dati P50), energia (kcal) sotto — tutto gated dagli interruttori)*
- `7527` — renderPdPercorso *(scheda: badge fase, riga proiezione/obiettivo, riga Piano vs Realtà (solo con dati), toolbar interruttori, grafico, editor)*

*(Tappa 2 tocca anche `calcolaMacros`: box obiettivo con intervallo al posto della data secca.)*

---

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 8131-8835

- `8131` — salvaAggiustamento
- `8164` — eliminaAggiustamento
- `8173` — renderPdNote
- `8208` — salvaNotaClinica
- `8223` — deleteNota
- `8232` — saveNote
- `8747` — _applicaRegoloSemaforoLEGACY
- `8788` — resetSemaforoAuto
- `8835` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 9053-9251

- `9053` — avviaFX
- `9081` — avviaAnalisi
- `9098` — _renderFlussoPanel
- `9142` — _riepEsc
- `9146` — _riepNum
- `9152` — _riepDelta
- `9160` — _riepDataSig
- `9178` — _riepParseFX
- `8087` — clean
- `9192` — _riepAggiornaFX
- `9218` — _riepToggleDomandaDefault
- `9230` — _riepAddDomanda
- `9243` — _riepRemoveDomanda
- `9251` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 9463-9689

- `8218` — dCol
- `8336` — card
- `9463` — renderPdRagionamento
- `9551` — inviaMessaggioRag
- `9569` — concludiERiassumi
- `9583` — salvaRagionamento
- `9604` — apriGeneratoreDaRag
- `9612` — nuovaSessioneRag
- `9618` — cancellaSavedRag
- `9628` — renderPazTimeline
- `9660` — renderPdAnamnesi
- `9689` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 11106-12241

- `11106` — _anNorm *(P125 — testo confrontabile: minuscole, niente accenti)*
- `11112` — _anCorrisponde *(P125 — ricerca per parole-prefisso: "vit d" trova "Vitamina D")*
- `11118` — filtraAnalisi *(P125 — filtro dal vivo delle 119 voci)*
- `11152` — pulisciRicercaAnalisi
- `11158` — renderPdAnalisi
- `11214` — toggleAnalisiSection
- `11363` — loadAnalisiSanguePDF
- `11250` — _impPdfConfigurata
- `11251` — _impPdfLib
- `11261` — _impPdfApri
- `11274` — _impPdfPagina *(P124b — una pagina del PDF → immagine, con la rotazione RILEVATA, non quella dichiarata dal file)*
- `11295` — _impRuotaImmagine
- `11320` — _impRilevaRotazione *(P124b — chiamata piccola: di quanti gradi va girata la pagina)*
- `11339` — _impPromptPagina *(P124b — prompt di UNA pagina, con l'impronta della riga: valore+unità+riferimento)*
- `11538` — _impNormalizzaNumero *(P124 — numero all'italiana → punto decimale, conversione fatta dall'app e non dall'AI)*
- `11549` — _impNumeri
- `11557` — _impSembraIntervallo
- `11565` — _impUgualeAlRange
- `11574` — _impLimitiStd
- `11595` — _impFuoriScala
- `11604` — _impCorrezioneVirgola
- `11616` — _impTestoLimiti
- `11637` — _impRifPlausibile *(P124b — un "riferimento" che è un'unità di misura = riga disallineata)*
- `11650` — _impUnitaCanonica
- `11672` — _impStessaGrandezza *(P124b — stesso tipo di misura a meno del prefisso: nanomoli/micromoli/millimoli)*
- `11689` — _impUnitaCompatibili
- `11700` — _impControllaValore *(P124 — i controlli anti-errore su un valore estratto)*
- `11764` — mostraDiffAnalisi *(P124 — colonna Estratto modificabile + righe sospette deselezionate)*
- `11954` — _calcoloIncluso
- `11960` — toggleCalcoloIncluso
- `11982` — _renderCalcoliPannello
- `12023` — toggleGlossario
- `12028` — updateAnalisi
- `12087` — salvaAnalisi
- `12100` — applicaGruppoClinico
- `12129` — renderBoxGruppiCliniciSuggeriti
- `12161` — suggerisciGruppiClinici
- `12241` — renderMemoriaInbody

---
### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9176 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `9815` — _richVal
- `9822` — _richBmi
- `9827` — _richPat
- `9833` — _richNum
- `9878` — _richPreselezione
- `9894` — richLeggiIntestazione
- `9898` — richSalvaIntestazione
- `9907` — apriRichiestaAnalisi
- `9927` — _richModaleHtml
- `10003` — _richEsc
- `10005` — _richMotivoCambia
- `10011` — _richToggleSez
- `10017` — _richAggiornaConteggi
- `10025` — _richMotivoCorrente
- `10035` — _richSelezione
- `10050` — _richTxt
- `10056` — _richCostruisciPDF
- `8969` — nuovaPagina
- `8970` — spazio
- `10152` — _richNomeFile
- `10157` — _richPrepara
- `10167` — _richRegistra
- `10181` — _richStato
- `10183` — richScaricaPDF
- `10198` — _richUpload
- `10226` — _richWaUrl
- `10233` — _richTestoWa
- `10247` — richInviaWhatsApp
- `10287` — richCopiaLink
- `10308` — _richStoricoHtml

---
### REFERTI DEL SANGUE DATATI — storico nel tempo (P118 tappa 1)
Righe 9194-9387 — migrazione, ordinamento, quadro attuale derivato, barra di selezione.

- `10883` — _refertoNuovoId
- `10886` — _refertoOggi
- `10890` — _refertoDataIt
- `10896` — _refertoConteggio
- `10910` — _refertiMigra
- `10937` — _refertiOrdinati
- `10948` — _refertoPiuRecente
- `10953` — _refertoInVista
- `10971` — _refertiApplica
- `10984` — _refertoCrea
- `11003` — refertoCambiaVista
- `11009` — refertoCambiaData
- `11021` — refertoNuovo
- `11029` — refertoDuplica
- `11038` — refertoElimina
- `11053` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `10496` — _rangeNum
- `10502` — _rangeTestoDa
- `10521` — _rangeCoppia
- `10531` — _rangeHtml

---
### ANDAMENTO NEL TEMPO — tracciato, variazione, grafico grande (P118 tappa 3)
Righe 9441-9745 — serie storica, regola del colore, sparkline, pannello in fondo.

- `10573` — _andLimiti
- `10594` — _andParseRangeLab
- `10607` — _andDistanza
- `10614` — _andValutazione
- `10627` — _andSerie
- `10641` — _andNum
- `10645` — _andDataBreve
- `10650` — _andMeseAnno
- `10658` — _andDominio
- `10672` — _andColore
- `10685` — _andSparkHtml
- `10711` — _andRigaHtml
- `10733` — _andEsamiSeguibili
- `10741` — andScegliEsame
- `10747` — _andPannelloHtml
- `10800` — _andGraficoGrande
- `10851` — _andPasso

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 12289-12700

- `12289` — _ibFmtBreve
- `12298` — _renderPesiIntermediSection
- `12347` — aggiungiPesoIntermedio
- `12363` — eliminaPesoIntermedio
- `12373` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `12700` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 12972-12972

- `12972` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 13350-15891

- `13350` — aggiornaLabelMacros
- `13368` — calcolaMacros
- `13509` — applicaSchema
- `13544` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `13550` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `13572` — _misuraDaReferto *(P127 — UN referto letto con le regole del traguardo: usata anche dalla verifica al controllo)*
- `13605` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `13616` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `13634` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `13747` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `13761` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `13817` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `13831` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `13863` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `13896` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `13938` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `13946` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `13957` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `13984` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `13999` — _stradeVerso *(le strade complete + percentuale libera)*
- `14046` — _VC_TOLLERANZA_PCT / _VC_GIORNI_MIN / _VC_GIORNI_MIN_RITARO / _VC_COPERTURA_MIN_PCT / _VC_MAGRA_PRUDENZA_GG *(P127 — soglie cliniche della verifica)*
- `14056` — _mediaSlotPrescritta *(media pesata sui giorni di un campo dello storico target; la usa anche _kcalMediaPrescrittaOss)*
- `14076` — _vcDeficitSlot *(deficit di uno slot: campo offset o kcal−tdee per gli slot vecchi)*
- `14084` — _vcTratto *(P127 — cosa è cambiato fra due referti, previsto vs reale, TDEE misurato)*
- `14138` — _vcTraguardoSalvato *(traguardo ricostruito dal salvato, per la scheda Percorso)*
- `14148` — _verificaControllo *(P127 — motore puro: tratto recente, quadro dall'inizio, residuo al ritmo reale)*
- `14186` — _verificaControlloHtml *(blocco 🔎, unica fonte per pannello 🎯 e scheda Percorso; azioni solo dove c'è il campo kcal)*
- `14278` — _vcRitara *(scrive le kcal ritarate nel campo regime: propone, non salva)*
- `14291` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `14359` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `14381` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `14434` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `14541` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `14556` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `14581` — _renderRifPesoBox
- `14632` — _usaRifPeso
- `14636` — _aggiornaRifPesoTarget
- `14639` — _aggiornaRegimeSlider
- `15296` — _presetRegime
- `15300` — _initRegimeSliderDaPaziente
- `15318` — ricalcolaLAF
- `15452` — renderStoricoTDEE
- `15486` — attivaSlotTDEE
- `15494` — eliminaSlotTDEE
- `15507` — _toggleCiclizzazione
- `15513` — _aggiornaAnteprimaCiclizzazione
- `15531` — salvaCalcoloMacros
- `15645` — _metAllenamento
- `15661` — _neatFrazione
- `15735` — _larnLafStileVita
- `15752` — _regimeOffset
- `15762` — _componiRegimeText
- `15795` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `15807` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `15814` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `15891` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 15909-16339

- `15909` — renderTargetBadge
- `15938` — verificaRegola_75_20_5
- `15975` — renderBadge75_20_5
- `16040` — _validaNorm
- `16043` — _validaMatchTermine
- `16051` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `16102` — _validaTesto
- `16123` — validaPiano
- `16197` — _validaFirmaBlocchi
- `16204` — renderBadgeValidatore
- `16235` — _validaVaiAlGiorno
- `16244` — apriPannelloValidatore
- `13472` — esc
- `16301` — _validaEseguiOverride
- `16324` — validaGateExport
- `16339` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 16472-17104

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
- `16472` — pianoPazSelezionato
- `16619` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `16857` — renderPanelMacrosGiorno
- `17000` — pmgCambiaGrammi
- `17027` — riapriPiano
- `17065` — _montaPianoCorrente
- `17104` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 17114-17583

- `17114` — pullTemplateSupabase
- `17125` — delTemplateSupabase
- `17134` — _promptTemplateNome
- `17159` — _creaTemplateDaJSON
- `17182` — salvaComeTemplate
- `17193` — salvaComeTemplateDaPiano
- `17202` — _normNomeAlim
- `17203` — _escRegAlim
- `17204` — _raccogliAlimentiDaPiano
- `17215` — _alimentiEsclusiPaziente
- `17227` — _trovaConflittiTemplate
- `17245` — _mostraAvvisoConflitti
- `17269` — applicaTemplate
- `17287` — apriPickerTemplate
- `17315` — _pickPaziente
- `17334` — applicaTemplatePick
- `17338` — rinominaTemplate
- `17349` — eliminaTemplate
- `17359` — renderLibreriaTemplate
- `17388` — renderStoricoPiani
- `17447` — eliminaPiano
- `17463` — _getActiveMacrosTarget
- `17487` — getTargetAttivi
- `17524` — calcolaTargetsCiclizzazione
- `17550` — _setupPianoTargets
- `17574` — getStagioneCorrente
- `17583` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 18017-18017

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `18017` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 18026-18485

- `18026` — aggiornaUIcolazione
- `18036` — salvaRegolePiano
- `18097` — _isModelloSistema
- `18100` — _isModelloSistemaModificato
- `18112` — caricaModelliCustomLocal
- `18126` — salvaModelliCustomLocal
- `18147` — _migraRecordCustom
- `18162` — _syncAliasLegacy
- `18171` — caricaAlimentiCustom
- `18195` — pushAlimentiCustomSupabase
- `18205` — pullAlimentiCustomSupabase
- `18219` — pushModelliSupabase
- `18237` — pullModelliSupabase
- `18262` — _calcolaFreqDaModello
- `18281` — aggiornaUImodello
- `18370` — popolaDropdownModelli
- `18398` — cambiaModelloRotazione
- `18404` — ripristinaModelloOriginale
- `18427` — eliminaModelloCustom
- `18445` — mostraAnteprimaModello
- `18455` — apriEditorModello
- `18485` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 18754-18992

- `15738` — rerender
- `18754` — _salvaModelloDaEditor
- `18796` — caricaRegolePiano
- `18826` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `18861` — _aiLogUsage
- `18883` — _aiProxyUrl
- `18889` — _aiTokenPerProxy
- `18918` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `18992` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 19071-19211

- `16216` — _risolviCollisioniCelle
- `19071` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `19131` — getFruttaStile
- `19138` — _fruttaGetPasto
- `19148` — _fruttaContaRigheRicetta
- `19152` — _fruttaIndiceBasePasto
- `19172` — getFruttaMarker
- `19185` — fruttaMarkerHtml
- `19193` — _fruttaCheckboxHtml
- `19202` — toggleFrutta
- `19211` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 19247-20521

- `19247` — _renderCelleGriglia
- `19327` — _renderRicetteTestuali
- `19366` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `19437` — _renderCelleHtml
- `19445` — toggleCellaMenu
- `19464` — closeAllCellaMenus
- `19472` — _trovaPasto
- `19480` — cellaSposta
- `19534` — cellaCancella
- `19555` — apriEditGrammatura
- `16789` — salva
- `19603` — cellaSwap
- `19623` — cellaRimuoviAlt
- `19637` — cellaAggiungiAlt
- `19740` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `19825` — apriEditRicetta
- `19834` — aggiungiRicetta
- `19850` — rimuoviRicetta
- `19859` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `20021` — ngAggiungiSpuntinoVuoto
- `20037` — apriAggiungiCella
- `17254` — risolviCompatibili
- `20133` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `20225` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `20366` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `20521` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 20569-20950

- `20569` — _attesoStrutturaPiano
- `20589` — _confrontaStrutturaPiano
- `20619` — _costruisciPromptDelta
- `20646` — _pianoToolSchema
- `20721` — _pianoMaxTokens
- `20730` — _estraiPianoDaRisposta
- `20752` — chiamaGeneraPiano
- `20919` — mostraLoadingSteps
- `18123` — render
- `20950` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 21017-21591

- `21017` — generaMessaggioAI
- `21122` — copiaMessaggioAI
- `21132` — salvaInStorico
- `21144` — salvaVarianteAI
- `21159` — renderVariantiSalvate
- `21178` — usaVariante
- `21196` — eliminaVariante
- `21207` — renderStoricoMsg
- `21223` — apriWhatsApp
- `21591` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 21769-23266

- `21769` — _ngColoreSemaforoNome
- `21777` — apriSceltaModalitaPiano
- `21812` — _ngChiudiModalita
- `21815` — _ngCostruisciGiornoVuoto
- `21848` — _ngCostruisciGiornoSpeciale
- `21859` — _ngIndiceInizioSpeciali
- `21870` — _ngModalitaNomeGiorno
- `21876` — _ngImpostaModalitaNomeGiorno
- `21879` — _ngLettera
- `21886` — _ngEtichettaGiorno
- `21906` — _ngEtichettaGiornoBreve
- `21920` — _ngToggleGiornoSpeciale
- `21944` — _ngRenderPannelloSpeciale
- `22012` — _generaGiornoSpecialeAI
- `22112` — _ngGiornoHaContenuto
- `22124` — _ngCreaPianoManuale
- `22147` — _ngScrollTabGiorni
- `22157` — _ngAbilitaDragScroll
- `22194` — _ngCambiaNumeroGiorni
- `22226` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `22240` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `22281` — _ngToggleCat
- `22290` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `22314` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `22470` — _ngSalvaPianoManuale
- `22496` — _ngParseIngrediente
- `22520` — _ngScomponiIngredienti
- `22532` — _ricCalcolaMacroDaIngredienti
- `22550` — _ricRicalcolaMacroLive
- `22557` — _ricAggiornaInfoMacro
- `22571` — _ricRicalcolaMacroLiveNow
- `22595` — _ngTrovaCategoriaAlimento
- `22628` — _ngPescaRicetta
- `22671` — _ngScomponiRicettaNelPasto
- `22708` — _ngDragStart
- `22719` — _ngDragStartCella
- `22730` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `22737` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `22742` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `22761` — _ngAggiungiAlimento
- `22786` — _ngRimuoviAlimento
- `22800` — _ngDopoModifica
- `22818` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `22871` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `22900` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `22917` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `22925` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `22997` — gramTestoCasalingo
- `23023` — _appendToggleNutrizionali
- `23066` — _appendTogglePromemoria
- `23095` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `23241` — cpFromEmoji
- `23247` — getEmojiCp
- `23266` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `21241` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `21263` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `21268` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `21294` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `21382` — _spesaTestoWhatsApp
- `21398` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `21443` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `21466` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `21494` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `21554` — scaricaListaSpesaPDF (download diretto, un click)
- `21562` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `21574` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 24414-24414

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
- `24414` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 24425-24631

- `24425` — salvaInbody
- `24489` — delInbody
- `24496` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `24631` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 24659-25128

- `24659` — buildSemLegenda
- `24673` — renderAlEditor
- `24734` — _alimNomeRegex
- `24742` — _alimGiorniDaPiano
- `24750` — _scanGiorniPerNome
- `24765` — scanRiferimentiAlimento
- `24794` — _alimRefsRighe
- `24800` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `24888` — modificaAlimentoCustom
- `24908` — ripristinaValoriPrecedentiAlimento
- `24920` — _resetAlimModal
- `24931` — apriNuovoAlimentoCustom
- `24937` — salvaAlimentoCustom
- `25004` — eliminaAlimentoCustom
- `25035` — _alimFonteBadge
- `25040` — renderAlimentiPage
- `22217` — E
- `25110` — archiviaAlimentoCustom
- `25128` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 25155-25396

- `25155` — _bcSetStatus
- `25157` — apriScannerBarcode
- `25165` — chiudiScannerBarcode
- `25170` — _bcStopCamera
- `25178` — _bcModaleAperto
- `25180` — _bcAvviaCamera
- `25191` — _bcAvviaNativo
- `25211` — _bcAvviaZXing
- `25220` — _bcZXStart
- `25231` — _bcErroreCamera
- `25239` — cercaBarcodeManuale
- `25245` — _barcodeTrovato
- `25261` — cercaBarcodeOFF
- `25279` — _bcProdottoNonTrovato
- `25293` — _bcPrecompilaForm
- `22477` — num
- `25317` — togAl
- `25370` — selCatAl
- `25384` — selTuttiAl
- `25396` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 25410-25726

- `25410` — setCalView
- `25411` — calPrev
- `25412` — calNext
- `25413` — calToday
- `25415` — renderCal
- `25429` — renderCalMonth
- `25453` — renderCalWeek
- `25471` — renderCalDay
- `25487` — selGiorno
- `25501` — setDisp
- `25506` — openAddEvento
- `25519` — openAddEventoPaz
- `25525` — toggleEntrataCheck
- `25530` — salvaEvento
- `25553` — openEvDetail
- `25608` — delEvento
- `25616` — copyMsg
- `25623` — aggDateCal
- `25628` — syncInizio
- `25629` — syncControllo
- `25630` — aggiornaPrev
- `25647` — renderRic
- `25674` — openNuovaRic
- `25675` — editRic
- `25685` — salvaRic
- `25710` — delRic
- `25726` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 25811-25871

- `25811` — aggiungiEntrataPerPaziente
- `25828` — openNuovaEntrata
- `25842` — salvaEntrata
- `25863` — delEntrata
- `25871` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 25901-26337

- `25901` — aiSuggerisciRicetta
- `25946` — renderConcettiModal
- `25965` — apriConcettiModal
- `25992` — salvaConcettiAllegati
- `26016` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `26054` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `26063` — loadInbodyPDF
- `26174` — _vitdLabel
- `26178` — getIntegratori
- `26182` — getIntegraWant
- `26186` — setIntegratori
- `26203` — setIntegraWant
- `26214` — getPatologieChip
- `26215` — getAllergieChip
- `26216` — setPatologieChip
- `26217` — setAllergieChip
- `26218` — getPatologie
- `26219` — getAllergie
- `26220` — setPatologieFromStr
- `26227` — setAllergieFromStr
- `26240` — getSdvChip
- `26241` — getCspChip
- `26242` — setSdvChip
- `26243` — setCspChip
- `26244` — setSdvFromStr
- `26245` — setCspFromStr
- `26249` — getBudget
- `26250` — setBudget
- `26255` — renderCalAnno
- `26286` — comprimeImmagine
- `26308` — uploadImmagineConcetto
- `26327` — rimuoviImmagineConcetto
- `26337` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 26403-26507

- `26403` — entraSelConcetti
- `26404` — annullaSelConcetti
- `26405` — toggleConcettoSel
- `26410` — eliminaConcettiSelezionati
- `26429` — confermaEliminaConcetti
- `26444` — aiRiscriviConcetto
- `26458` — editConcetto
- `26476` — salvaConcetto
- `26487` — openNuovoConcetto
- `26507` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 26508-26671

- `26508` — saveAgendaPersonale
- `26509` — getAgendaTodo
- `26510` — saveAgendaTodo
- `26512` — pulisciAgendaVecchia
- `26516` — navigaAgenda
- `26525` — toggleFormAgenda
- `26526` — toggleFormTodo
- `26528` — salvaAgendaItem
- `26542` — salvaTodoItem
- `26554` — toggleAgendaFatto
- `26562` — toggleTodoFatto
- `26575` — _catCol
- `26577` — renderAgendaDx
- `26671` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 26797-27001

- `26797` — renderScadenzeAlert
- `26982` — segnaGestito
- `27001` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 27010-27085

- `27010` — ripristinaPaz
- `27018` — eliminaPaz
- `27063` — getDove
- `27067` — setDove
- `27085` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 27090-27530

- `27090` — getCredenzialiPersistenti
- `27103` — cancellaCredenzialiPersistenti
- `27108` — rinnovaSessioneConRefreshToken
- `27125` — getSessioneSalvata
- `27144` — salvaSessione
- `27154` — cancellaSessione
- `27158` — eseguiLogin
- `27205` — eseguiLogout
- `27227` — mostraApp
- `27232` — verificaSessioneEAvvia
- `27260` — assicuraTokenValido
- `27289` — _garantiscoSessionePerSync
- `27301` — avviaRinnovoTokenPeriodico
- `27305` — fermaRinnovoTokenPeriodico
- `27314` — _authReset
- `27319` — _authMostra
- `27322` — mostraLogin
- `27323` — mostraRegistrazione
- `27324` — mostraRecupero
- `27325` — mostraNuovaPassword
- `27328` — eseguiRegistrazione
- `27366` — eseguiRecuperoPassword
- `27395` — eseguiNuovaPassword
- `27429` — _parseHashParams
- `27436` — _pulisciHash
- `27440` — gestisciRitornoAuth
- `27530` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 27602-27725

- `27602` — apriPannelloRicette
- `27631` — chiudiPannelloRicette
- `27639` — applicaRicettaPasto
- `27675` — inizializzaP2
- `27687` — deepClone
- `27691` — applicaPatch
- `27725` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
