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
Righe 2381-2423

- `2381` — _slugAlimento
- `2389` — _catalogoIndicizza
- `2393` — _catalogoDeindicizza
- `2400` — costruisciCatalogo
- `2423` — risolviAlimento

---

### MACROS PIANO — calcolo e badge macro reali vs target
Righe 2438-2701

- `2438` — getValoriCREA
- `2450` — getCurrentPaziente
- `2470` — getKcalWeekend
- `2527` — getMacrosRicettaComposta
- `2533` — calcolaMacrosPiano
- `2635` — renderBadgeMacrosReali
- `2611` — pctStr
- `2612` — color
- `2625` — row
- `2701` — renderBadgeMacrosReali_DOM

---

### ANALISI DEL SANGUE — parsing, indici clinici derivati, interpretazione
Righe 2949-3121

- `2949` — _parseAnalisiNum
- `2957` — calcolaIndice
- `3095` — interpretaAnalisi
- `3107` — _interpAnalisiHtml
- `3121` — mostraInfoRange

---

### CONCETTI EDUCATIVI — sync Supabase, migrazione
Righe 3264-3288

- `3264` — pushConcetiSupabase
- `3274` — pullConcetiSupabase
- `3288` — migraConcetti

---

### ALIMENTI — categorie funzionali/semaforo, chip UI, equivalenze porzioni
Righe 3478-3833

- `3478` — getCategoriaSemaforo
- `3495` — _getCategorieGruppo
- `3509` — calcolaGrammaturaEquivalente
- `3549` — _gruppoEquiv  (P121: gruppo di equivalenza + criterio per categoria funzionale)
- `3555` — _porzioneStandard  (P121: porzione `g` di database dell'alimento)
- `3570` — suggerisciGrEquivalente  (P121: firma a 3 argomenti, il gruppo si deduce dai due alimenti)
- `3596` — _etichettaCriterio  (P121: ≈carbo / ≈prot / ≈grassi / fissa / porzione)
- `3611` — _promptAlternativeGrassi  (P121: riga del prompt AI generata dal motore)
- `3627` — ricalcolaAlternative  (P121: MOTORE UNICO, unico punto che scrive la grammatura di un'alternativa)
- `3646` — ricalcolaAlternativePiano  (P121: applica il motore a tutte le celle di un piano)
- `3695` — arrotondaGrammatura  (P121: sostituisce arrotondaPorzioneDiscreta — pezzi interi senza tetto / 5g)
- `3705` — getCategoriaFunzionale
- `3745` — catArr
- `3761` — _tagComuniTrova
- `3765` — getTagComuniChip
- `3768` — setTagComuniChip
- `3776` — setCatChips
- `3789` — getStagioniChip
- `3792` — setStagioniChip
- `3799` — getProfiloChip
- `3802` — setProfiloChip
- `3811` — wireChipGroup
- `3822` — wireAttrChipGroups
- `3833` — wireRadioChipGroup

---

### CONFIG / STORAGE LOCALE — cfg, localStorage db, util data/valuta
Righe 3861-4234

- `3861` — getCfg
- `3862` — saveCfgL
- `3863` — getUrl
- `3864` — saveLocal
- `3865` — loadLocal
- `3872` — uid
- `3873` — today
- `3874` — addDays
- `3875` — fData
- `3876` — fEur
- `3878` — getLastSyncText
- `3888` — getSyncColor
- `3896` — aggiornaStatoSync
- `3922` — setSyncStatus
- `4188` — _registraTombstone
- `4196` — _tombstoneAttivi
- `4208` — _fondiTombstones
- `4222` — _mergeTombstonesRemoti *(dal 24/7 legge il meta da `collections`, P74 1d)*
- `4234` — _applicaTombstones
- `4095` — _pazFetchMeta *(P74 1d — solo `collections`)*
- `4116` — _collectionsUpsert *(P74 — scrittura primaria dei 4 meta-record dal cutover 1d)*
- `4138` — _collectionsFetch *(P74 1d — lettura unica dei meta-record)*
- `4161` — _analisiSangueUpsert *(P74 fase 2 — scrittura ombra analisi del sangue, 24/7)*

---

### SYNC SUPABASE — push/pull ricette/pazienti, tombstones, conflitti (P69)
Righe 4258-4643

- `4258` — supaHeaders
- `4272` — pushRicetteSupabase
- `4297` — pullRicetteSupabase
- `4319` — delRicetteSupabase
- `4331` — delPazienteSupabase
- `4346` — pushToSheets
- `4390` — pullFromSheets
- `4469` — syncNow
- `4482` — sincronizzaTutto
- `4360` — stpSet
- `4365` — stpMsg
- `4613` — testConnSupabase
- `4643` — _p68LogSaveAnonimo

---

### SYNC SUPABASE — save paziente, piani/cache piano, entrate, eventi
Righe 4657-5173

- `4657` — save
- `4675` — _pushRigaPerId
- `4708` — _flushDirtyIds
- `4791` — _p69LoadBaseline
- `4794` — _p69StoreBaseline
- `4797` — _p69SetBaseline
- `4801` — _p69DropBaseline
- `4805` — _p69SetBaselineFromRows
- `4811` — _p69NomePaz
- `4816` — _p69InList
- `4824` — _p69RilevaConflitti
- `4860` — _p69DialogoConflitti
- `4738` — chiudi
- `4894` — _p69RisolviRicarica
- `4923` — _p69EsportaLocali
- `4936` — _p69RisolviSovrascrivi
- `4949` — pushPianoSupabase
- `4971` — pullPianiSupabase
- `4987` — delPianoSupabase
- `5003` — delPianiPazienteSupabase
- `5015` — pushCachePianoSupabase
- `5032` — caricaCachePianoSupabase
- `5054` — pushEntrateSupabase
- `5078` — pullEntrateSupabase
- `5092` — delEntrataSupabase
- `5100` — pushEntrataSupabase
- `5111` — pushEventoSupabase
- `5124` — pushEventiSupabase
- `5148` — pullEventiSupabase
- `5162` — delEventoSupabase
- `5173` — _pianoCacheKey

---

### UI GENERALE — config AI key, notifiche, navigazione (goTo/tab/modali)
Righe 5200-5312

- `5200` — _salvaPianoCache
- `5205` — _caricaPianoCache
- `5211` — salvaCfg
- `5212` — testConn
- `5219` — testaAntKey
- `5230` — initAntCard
- `5233` — esporta
- `5234` — importa
- `5239` — goTo
- `5256` — closeM
- `5264` — ngChiudiModale
- `5273` — ngChiudiPopupCoppia
- `5277` — ngAggiungiX
- `5288` — ngUpgradeModali
- `5308` — mTab
- `5309` — aggiornaEta
- `5310` — toggleOrarioNote
- `5311` — pdTab
- `5312` — notif

---

### PAZIENTI — registro: lista/card/kanban, apertura, editing, salvataggio, routine
Righe 5320-7989

- `5320` — getPazView
- `5321` — setPazView
- `5330` — _pazStatoPiano
- `5338` — _pazUrgenzaControllo
- `5345` — _pazStatoTagHtml
- `5354` — _pazAggiornaFiltroRegimi
- `5362` — renderPaz
- `5415` — _renderPazCard
- `5440` — _renderPazLista
- `5467` — _renderPazKanban
- `5505` — openNuovoPaz
- `5531` — editPaz
- `5601` — applicaRegoloSemaforo
- `6112` — trovaChiaveAlimento
- `6136` — _pazNumOPrec *(F7 — campo assente = valore precedente, non azzeramento)*
- `6148` — _pazPreservaCampi *(F5 — l'anagrafica non cancella i campi che il form non gestisce)*
- `6154` — salvaPaz
- `6230` — openPaz
- `7676` — renderPdRoutine
- `6723` — cardHTML
- `7818` — updateRoutineCampo
- `7826` — suggerisciPastoEQuando
- `7853` — filtroLibreria
- `7862` — renderLibreriaGrid
- `7883` — aggiungiDaLibreriaIdx
- `7907` — openModalRoutine
- `7914` — salvaRoutineVoce
- `7939` — salvaRoutine
- `7946` — mostraRoutinePopup
- `7974` — removeRoutineVoce
- `7989` — _renderAggiustamentiSection

---

### 📈 PERCORSO — timeline di periodizzazione (P115 Tappe 1-5 COMPLETE, 24 lug 2026)
Righe 6021-6621 (numeri ESATTI al 24/7 notte, dopo la Tappa 5). ⚠️ Questo blocco (~600 righe) fa slittare tutti i numeri delle sezioni SUCCESSIVE a riga ~6020 rispetto all'ultima rigenerazione completa: per quelle sezioni fare grep di conferma. Rigenerazione completa alla prossima modifica strutturale.

- `6274` — _PERCORSO_TIPI (const: tipi fase, colori, pct default)
- `6281` — _percorsoGet *(normalizza p.percorso, scarta fasi invalide)*
- `6303` — _percorsoIsoLocal *(data → YYYY-MM-DD LOCALE, mai toISOString/UTC)*
- `6309` — _percorsoIntervalli *(fasi consecutive → date concrete dal/al)*
- `6323` — _percorsoFaseAt *(fase attiva a una data; dal incluso, al escluso)*
- `6332` — _percorsoKcalFase *(pct → kcal indicative via calcolaTDEE)*
- `6355` — _percorsoProiezione *(Tappa 2 — proiezione ibrida teorica/calibrata, cono, obiettivo a intervallo)*
- `6413` — _percorsoDataBreve *(ISO → "12 set")*
- `6430` — _percorsoSerieEnergia *(Tappa 3 — serie introito/TDEE stimato/TDEE osservato per la corsia energia)*
- `6469` — _percorsoSerieMassaMagra *(Tappa 4 — solo InBody: punti {data,m,pg})*
- `6488` — _percorsoConsuntivo *(Tappa 5 — legge p.consuntivo scritto da P50: aderenza, extra kcal, ritardo=extra÷7700, settimane perse; oggi sempre ok:false)*
- `6530` — _PERCORSO_LAYERS_DEFAULT / _percorsoLayersState / _percorsoLayersGet *(Tappa 4 — stato interruttori, SOLO sessione, mai su p)*
- `6535` — percorsoLayerToggle *(Tappa 4 — inverte un solo strato)*
- `6541` — percorsoVistaPreset *(Tappa 4 — preset "tecnica"/"paziente")*
- `6557` — _percorsoPaz *(e a seguire i mutatori percorsoInit/SetInizio/AddFase/UpdFase/DelFase/MoveFase)*
- `6613` — _PERCORSO_MODELLI / _PERCORSO_GEN *(P122 T3 — 4 modelli + regole dei cicli)*
- `6631` — _percorsoGeneraFasi *(P122 T3 — pura: dal traguardo alle fasi, ritmo = quello della proiezione)*
- `6711` — _percorsoModelloSelectHtml
- `6720` — percorsoGeneraDaModello *(propone; conferma prima di sostituire fasi esistenti)*
- `6743` — _percorsoShiftGiorni *(pura: ancora = ultima pesata)*
- `6753` — percorsoRiallinea *(⏩ trasla il piano, riprende dal giorno-fase dell'interruzione)*
- `6780` — _TRG_TIPI / `6744` _TRG_COMPORTAMENTI *(P122 T4 — tipi di traguardo e libreria comportamenti)*
- `6802` — _traguardiGet · `6761` _traguardoValoreAttuale *(valore corrente dai dati esistenti, null se manca)*
- `6841` — _traguardoVerso *(auto: dedotto dalla partenza)* · `6803` _traguardoValuta · `6824` _traguardiValuta
- `6882` — traguardoAdd · `6852` traguardoUpd · `6867` traguardoDel · `6873` traguardoSegna
- `6940` — _COND_TIPI · `6897` _percorsoCondizione *(pura: la fase finisce per soglia — SOLO suggerimento)*
- `6956` — percorsoSetCondizione · `6927` percorsoChiudiFase *(esito fotografato, riapribile)*
- `6990` — _traguardiHtml *(blocco 🏁 in fondo alla scheda Percorso)*
- `7088` — _percorsoVistaPaz / `7049` _percorsoVistaPazAttiva *(P122 T5 — modalità di sessione)*
- `7095` — _percorsoVittorie *(pura: vittorie dall'inizio del percorso + flag ricomposizione)*
- `7133` — _percorsoNascondiPeso *(in fase di massa il peso non si mostra al paziente)*
- `7144` — _traguardoFaseCorrente *(traguardo della fase IN CORSO, non quello lontano)*
- `7172` — _traguardoTestoPaziente *(righe in italiano semplice, riusate dal messaggio WhatsApp)*
- `7205` — _vistaPazienteHtml *(i tre riquadri che guarda il paziente)*
- `7285` — _percorsoChartSvg *(due corsie: peso + massa magra + cono proiezione sopra, striscia aderenza in mezzo (solo con dati P50), energia (kcal) sotto — tutto gated dagli interruttori)*
- `7474` — renderPdPercorso *(scheda: badge fase, riga proiezione/obiettivo, riga Piano vs Realtà (solo con dati), toolbar interruttori, grafico, editor)*

*(Tappa 2 tocca anche `calcolaMacros`: box obiettivo con intervallo al posto della data secca.)*

---

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 8074-8778

- `8074` — salvaAggiustamento
- `8107` — eliminaAggiustamento
- `8116` — renderPdNote
- `8151` — salvaNotaClinica
- `8166` — deleteNota
- `8175` — saveNote
- `8690` — _applicaRegoloSemaforoLEGACY
- `8731` — resetSemaforoAuto
- `8778` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 8947-9145

- `8947` — avviaFX
- `8975` — avviaAnalisi
- `8992` — _renderFlussoPanel
- `9036` — _riepEsc
- `9040` — _riepNum
- `9046` — _riepDelta
- `9054` — _riepDataSig
- `9072` — _riepParseFX
- `8087` — clean
- `9086` — _riepAggiornaFX
- `9112` — _riepToggleDomandaDefault
- `9124` — _riepAddDomanda
- `9137` — _riepRemoveDomanda
- `9145` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 9357-9583

- `8218` — dCol
- `8336` — card
- `9357` — renderPdRagionamento
- `9445` — inviaMessaggioRag
- `9463` — concludiERiassumi
- `9477` — salvaRagionamento
- `9498` — apriGeneratoreDaRag
- `9506` — nuovaSessioneRag
- `9512` — cancellaSavedRag
- `9522` — renderPazTimeline
- `9554` — renderPdAnamnesi
- `9583` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 10992-12063

- `10992` — renderPdAnalisi
- `11041` — toggleAnalisiSection
- `11190` — loadAnalisiSanguePDF
- `11077` — _impPdfConfigurata
- `11078` — _impPdfLib
- `11088` — _impPdfApri
- `11101` — _impPdfPagina *(P124b — una pagina del PDF → immagine, con la rotazione RILEVATA, non quella dichiarata dal file)*
- `11122` — _impRuotaImmagine
- `11147` — _impRilevaRotazione *(P124b — chiamata piccola: di quanti gradi va girata la pagina)*
- `11166` — _impPromptPagina *(P124b — prompt di UNA pagina, con l'impronta della riga: valore+unità+riferimento)*
- `11365` — _impNormalizzaNumero *(P124 — numero all'italiana → punto decimale, conversione fatta dall'app e non dall'AI)*
- `11376` — _impNumeri
- `11384` — _impSembraIntervallo
- `11392` — _impUgualeAlRange
- `11401` — _impLimitiStd
- `11422` — _impFuoriScala
- `11431` — _impCorrezioneVirgola
- `11443` — _impTestoLimiti
- `11464` — _impRifPlausibile *(P124b — un "riferimento" che è un'unità di misura = riga disallineata)*
- `11477` — _impUnitaCanonica
- `11499` — _impStessaGrandezza *(P124b — stesso tipo di misura a meno del prefisso: nanomoli/micromoli/millimoli)*
- `11516` — _impUnitaCompatibili
- `11527` — _impControllaValore *(P124 — i controlli anti-errore su un valore estratto)*
- `11591` — mostraDiffAnalisi *(P124 — colonna Estratto modificabile + righe sospette deselezionate)*
- `11781` — _calcoloIncluso
- `11787` — toggleCalcoloIncluso
- `11809` — _renderCalcoliPannello
- `11845` — toggleGlossario
- `11850` — updateAnalisi
- `11909` — salvaAnalisi
- `11922` — applicaGruppoClinico
- `11951` — renderBoxGruppiCliniciSuggeriti
- `11983` — suggerisciGruppiClinici
- `12063` — renderMemoriaInbody

---
### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9176 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `9709` — _richVal
- `9716` — _richBmi
- `9721` — _richPat
- `9727` — _richNum
- `9772` — _richPreselezione
- `9788` — richLeggiIntestazione
- `9792` — richSalvaIntestazione
- `9801` — apriRichiestaAnalisi
- `9821` — _richModaleHtml
- `9897` — _richEsc
- `9899` — _richMotivoCambia
- `9905` — _richToggleSez
- `9911` — _richAggiornaConteggi
- `9919` — _richMotivoCorrente
- `9929` — _richSelezione
- `9944` — _richTxt
- `9950` — _richCostruisciPDF
- `8969` — nuovaPagina
- `8970` — spazio
- `10046` — _richNomeFile
- `10051` — _richPrepara
- `10061` — _richRegistra
- `10075` — _richStato
- `10077` — richScaricaPDF
- `10092` — _richUpload
- `10120` — _richWaUrl
- `10127` — _richTestoWa
- `10141` — richInviaWhatsApp
- `10181` — richCopiaLink
- `10202` — _richStoricoHtml

---
### REFERTI DEL SANGUE DATATI — storico nel tempo (P118 tappa 1)
Righe 9194-9387 — migrazione, ordinamento, quadro attuale derivato, barra di selezione.

- `10777` — _refertoNuovoId
- `10780` — _refertoOggi
- `10784` — _refertoDataIt
- `10790` — _refertoConteggio
- `10804` — _refertiMigra
- `10831` — _refertiOrdinati
- `10842` — _refertoPiuRecente
- `10847` — _refertoInVista
- `10865` — _refertiApplica
- `10878` — _refertoCrea
- `10897` — refertoCambiaVista
- `10903` — refertoCambiaData
- `10915` — refertoNuovo
- `10923` — refertoDuplica
- `10932` — refertoElimina
- `10947` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `10390` — _rangeNum
- `10396` — _rangeTestoDa
- `10415` — _rangeCoppia
- `10425` — _rangeHtml

---
### ANDAMENTO NEL TEMPO — tracciato, variazione, grafico grande (P118 tappa 3)
Righe 9441-9745 — serie storica, regola del colore, sparkline, pannello in fondo.

- `10467` — _andLimiti
- `10488` — _andParseRangeLab
- `10501` — _andDistanza
- `10508` — _andValutazione
- `10521` — _andSerie
- `10535` — _andNum
- `10539` — _andDataBreve
- `10544` — _andMeseAnno
- `10552` — _andDominio
- `10566` — _andColore
- `10579` — _andSparkHtml
- `10605` — _andRigaHtml
- `10627` — _andEsamiSeguibili
- `10635` — andScegliEsame
- `10641` — _andPannelloHtml
- `10694` — _andGraficoGrande
- `10745` — _andPasso

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 12111-12522

- `12111` — _ibFmtBreve
- `12120` — _renderPesiIntermediSection
- `12169` — aggiungiPesoIntermedio
- `12185` — eliminaPesoIntermedio
- `12195` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `12522` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 12794-12794

- `12794` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 13172-15429

- `13172` — aggiornaLabelMacros
- `13190` — calcolaMacros
- `13331` — applicaSchema
- `13366` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `13372` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `13389` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `13425` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `13443` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `13556` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `13570` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `13626` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `13640` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `13672` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `13705` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `13747` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `13755` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `13766` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `13793` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `13808` — _stradeVerso *(le strade complete + percentuale libera)*
- `13831` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `13899` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `13921` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `13974` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `14078` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `14093` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `14118` — _renderRifPesoBox
- `14169` — _usaRifPeso
- `14173` — _aggiornaRifPesoTarget
- `14176` — _aggiornaRegimeSlider
- `14833` — _presetRegime
- `14837` — _initRegimeSliderDaPaziente
- `14855` — ricalcolaLAF
- `14997` — renderStoricoTDEE
- `15031` — attivaSlotTDEE
- `15039` — eliminaSlotTDEE
- `15052` — _toggleCiclizzazione
- `15058` — _aggiornaAnteprimaCiclizzazione
- `15076` — salvaCalcoloMacros
- `15190` — _metAllenamento
- `15206` — _neatFrazione
- `15280` — _larnLafStileVita
- `15297` — _regimeOffset
- `15307` — _componiRegimeText
- `15340` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `15352` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `15359` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `15429` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 15447-15877

- `15447` — renderTargetBadge
- `15476` — verificaRegola_75_20_5
- `15513` — renderBadge75_20_5
- `15578` — _validaNorm
- `15581` — _validaMatchTermine
- `15589` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `15640` — _validaTesto
- `15661` — validaPiano
- `15735` — _validaFirmaBlocchi
- `15742` — renderBadgeValidatore
- `15773` — _validaVaiAlGiorno
- `15782` — apriPannelloValidatore
- `13472` — esc
- `15839` — _validaEseguiOverride
- `15862` — validaGateExport
- `15877` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 16010-16642

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
- `16010` — pianoPazSelezionato
- `16157` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `16395` — renderPanelMacrosGiorno
- `16538` — pmgCambiaGrammi
- `16565` — riapriPiano
- `16603` — _montaPianoCorrente
- `16642` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 16652-17121

- `16652` — pullTemplateSupabase
- `16663` — delTemplateSupabase
- `16672` — _promptTemplateNome
- `16697` — _creaTemplateDaJSON
- `16720` — salvaComeTemplate
- `16731` — salvaComeTemplateDaPiano
- `16740` — _normNomeAlim
- `16741` — _escRegAlim
- `16742` — _raccogliAlimentiDaPiano
- `16753` — _alimentiEsclusiPaziente
- `16765` — _trovaConflittiTemplate
- `16783` — _mostraAvvisoConflitti
- `16807` — applicaTemplate
- `16825` — apriPickerTemplate
- `16853` — _pickPaziente
- `16872` — applicaTemplatePick
- `16876` — rinominaTemplate
- `16887` — eliminaTemplate
- `16897` — renderLibreriaTemplate
- `16926` — renderStoricoPiani
- `16985` — eliminaPiano
- `17001` — _getActiveMacrosTarget
- `17025` — getTargetAttivi
- `17062` — calcolaTargetsCiclizzazione
- `17088` — _setupPianoTargets
- `17112` — getStagioneCorrente
- `17121` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 17555-17555

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `17555` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 17564-18023

- `17564` — aggiornaUIcolazione
- `17574` — salvaRegolePiano
- `17635` — _isModelloSistema
- `17638` — _isModelloSistemaModificato
- `17650` — caricaModelliCustomLocal
- `17664` — salvaModelliCustomLocal
- `17685` — _migraRecordCustom
- `17700` — _syncAliasLegacy
- `17709` — caricaAlimentiCustom
- `17733` — pushAlimentiCustomSupabase
- `17743` — pullAlimentiCustomSupabase
- `17757` — pushModelliSupabase
- `17775` — pullModelliSupabase
- `17800` — _calcolaFreqDaModello
- `17819` — aggiornaUImodello
- `17908` — popolaDropdownModelli
- `17936` — cambiaModelloRotazione
- `17942` — ripristinaModelloOriginale
- `17965` — eliminaModelloCustom
- `17983` — mostraAnteprimaModello
- `17993` — apriEditorModello
- `18023` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 18292-18530

- `15738` — rerender
- `18292` — _salvaModelloDaEditor
- `18334` — caricaRegolePiano
- `18364` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `18399` — _aiLogUsage
- `18421` — _aiProxyUrl
- `18427` — _aiTokenPerProxy
- `18456` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `18530` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 18609-18749

- `16216` — _risolviCollisioniCelle
- `18609` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `18669` — getFruttaStile
- `18676` — _fruttaGetPasto
- `18686` — _fruttaContaRigheRicetta
- `18690` — _fruttaIndiceBasePasto
- `18710` — getFruttaMarker
- `18723` — fruttaMarkerHtml
- `18731` — _fruttaCheckboxHtml
- `18740` — toggleFrutta
- `18749` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 18785-20059

- `18785` — _renderCelleGriglia
- `18865` — _renderRicetteTestuali
- `18904` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `18975` — _renderCelleHtml
- `18983` — toggleCellaMenu
- `19002` — closeAllCellaMenus
- `19010` — _trovaPasto
- `19018` — cellaSposta
- `19072` — cellaCancella
- `19093` — apriEditGrammatura
- `16789` — salva
- `19141` — cellaSwap
- `19161` — cellaRimuoviAlt
- `19175` — cellaAggiungiAlt
- `19278` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `19363` — apriEditRicetta
- `19372` — aggiungiRicetta
- `19388` — rimuoviRicetta
- `19397` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `19559` — ngAggiungiSpuntinoVuoto
- `19575` — apriAggiungiCella
- `17254` — risolviCompatibili
- `19671` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `19763` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `19904` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `20059` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 20107-20488

- `20107` — _attesoStrutturaPiano
- `20127` — _confrontaStrutturaPiano
- `20157` — _costruisciPromptDelta
- `20184` — _pianoToolSchema
- `20259` — _pianoMaxTokens
- `20268` — _estraiPianoDaRisposta
- `20290` — chiamaGeneraPiano
- `20457` — mostraLoadingSteps
- `18123` — render
- `20488` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 20555-21129

- `20555` — generaMessaggioAI
- `20660` — copiaMessaggioAI
- `20670` — salvaInStorico
- `20682` — salvaVarianteAI
- `20697` — renderVariantiSalvate
- `20716` — usaVariante
- `20734` — eliminaVariante
- `20745` — renderStoricoMsg
- `20761` — apriWhatsApp
- `21129` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 21307-22804

- `21307` — _ngColoreSemaforoNome
- `21315` — apriSceltaModalitaPiano
- `21350` — _ngChiudiModalita
- `21353` — _ngCostruisciGiornoVuoto
- `21386` — _ngCostruisciGiornoSpeciale
- `21397` — _ngIndiceInizioSpeciali
- `21408` — _ngModalitaNomeGiorno
- `21414` — _ngImpostaModalitaNomeGiorno
- `21417` — _ngLettera
- `21424` — _ngEtichettaGiorno
- `21444` — _ngEtichettaGiornoBreve
- `21458` — _ngToggleGiornoSpeciale
- `21482` — _ngRenderPannelloSpeciale
- `21550` — _generaGiornoSpecialeAI
- `21650` — _ngGiornoHaContenuto
- `21662` — _ngCreaPianoManuale
- `21685` — _ngScrollTabGiorni
- `21695` — _ngAbilitaDragScroll
- `21732` — _ngCambiaNumeroGiorni
- `21764` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `21778` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `21819` — _ngToggleCat
- `21828` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `21852` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `22008` — _ngSalvaPianoManuale
- `22034` — _ngParseIngrediente
- `22058` — _ngScomponiIngredienti
- `22070` — _ricCalcolaMacroDaIngredienti
- `22088` — _ricRicalcolaMacroLive
- `22095` — _ricAggiornaInfoMacro
- `22109` — _ricRicalcolaMacroLiveNow
- `22133` — _ngTrovaCategoriaAlimento
- `22166` — _ngPescaRicetta
- `22209` — _ngScomponiRicettaNelPasto
- `22246` — _ngDragStart
- `22257` — _ngDragStartCella
- `22268` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `22275` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `22280` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `22299` — _ngAggiungiAlimento
- `22324` — _ngRimuoviAlimento
- `22338` — _ngDopoModifica
- `22356` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `22409` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `22438` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `22455` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `22463` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `22535` — gramTestoCasalingo
- `22561` — _appendToggleNutrizionali
- `22604` — _appendTogglePromemoria
- `22633` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `22779` — cpFromEmoji
- `22785` — getEmojiCp
- `22804` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `20779` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `20801` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `20806` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `20832` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `20920` — _spesaTestoWhatsApp
- `20936` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `20981` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `21004` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `21032` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `21092` — scaricaListaSpesaPDF (download diretto, un click)
- `21100` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `21112` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 23952-23952

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
- `23952` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 23963-24169

- `23963` — salvaInbody
- `24027` — delInbody
- `24034` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `24169` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 24197-24666

- `24197` — buildSemLegenda
- `24211` — renderAlEditor
- `24272` — _alimNomeRegex
- `24280` — _alimGiorniDaPiano
- `24288` — _scanGiorniPerNome
- `24303` — scanRiferimentiAlimento
- `24332` — _alimRefsRighe
- `24338` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `24426` — modificaAlimentoCustom
- `24446` — ripristinaValoriPrecedentiAlimento
- `24458` — _resetAlimModal
- `24469` — apriNuovoAlimentoCustom
- `24475` — salvaAlimentoCustom
- `24542` — eliminaAlimentoCustom
- `24573` — _alimFonteBadge
- `24578` — renderAlimentiPage
- `22217` — E
- `24648` — archiviaAlimentoCustom
- `24666` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 24693-24934

- `24693` — _bcSetStatus
- `24695` — apriScannerBarcode
- `24703` — chiudiScannerBarcode
- `24708` — _bcStopCamera
- `24716` — _bcModaleAperto
- `24718` — _bcAvviaCamera
- `24729` — _bcAvviaNativo
- `24749` — _bcAvviaZXing
- `24758` — _bcZXStart
- `24769` — _bcErroreCamera
- `24777` — cercaBarcodeManuale
- `24783` — _barcodeTrovato
- `24799` — cercaBarcodeOFF
- `24817` — _bcProdottoNonTrovato
- `24831` — _bcPrecompilaForm
- `22477` — num
- `24855` — togAl
- `24908` — selCatAl
- `24922` — selTuttiAl
- `24934` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 24948-25264

- `24948` — setCalView
- `24949` — calPrev
- `24950` — calNext
- `24951` — calToday
- `24953` — renderCal
- `24967` — renderCalMonth
- `24991` — renderCalWeek
- `25009` — renderCalDay
- `25025` — selGiorno
- `25039` — setDisp
- `25044` — openAddEvento
- `25057` — openAddEventoPaz
- `25063` — toggleEntrataCheck
- `25068` — salvaEvento
- `25091` — openEvDetail
- `25146` — delEvento
- `25154` — copyMsg
- `25161` — aggDateCal
- `25166` — syncInizio
- `25167` — syncControllo
- `25168` — aggiornaPrev
- `25185` — renderRic
- `25212` — openNuovaRic
- `25213` — editRic
- `25223` — salvaRic
- `25248` — delRic
- `25264` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 25349-25409

- `25349` — aggiungiEntrataPerPaziente
- `25366` — openNuovaEntrata
- `25380` — salvaEntrata
- `25401` — delEntrata
- `25409` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 25439-25875

- `25439` — aiSuggerisciRicetta
- `25484` — renderConcettiModal
- `25503` — apriConcettiModal
- `25530` — salvaConcettiAllegati
- `25554` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `25592` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `25601` — loadInbodyPDF
- `25712` — _vitdLabel
- `25716` — getIntegratori
- `25720` — getIntegraWant
- `25724` — setIntegratori
- `25741` — setIntegraWant
- `25752` — getPatologieChip
- `25753` — getAllergieChip
- `25754` — setPatologieChip
- `25755` — setAllergieChip
- `25756` — getPatologie
- `25757` — getAllergie
- `25758` — setPatologieFromStr
- `25765` — setAllergieFromStr
- `25778` — getSdvChip
- `25779` — getCspChip
- `25780` — setSdvChip
- `25781` — setCspChip
- `25782` — setSdvFromStr
- `25783` — setCspFromStr
- `25787` — getBudget
- `25788` — setBudget
- `25793` — renderCalAnno
- `25824` — comprimeImmagine
- `25846` — uploadImmagineConcetto
- `25865` — rimuoviImmagineConcetto
- `25875` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 25941-26045

- `25941` — entraSelConcetti
- `25942` — annullaSelConcetti
- `25943` — toggleConcettoSel
- `25948` — eliminaConcettiSelezionati
- `25967` — confermaEliminaConcetti
- `25982` — aiRiscriviConcetto
- `25996` — editConcetto
- `26014` — salvaConcetto
- `26025` — openNuovoConcetto
- `26045` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 26046-26209

- `26046` — saveAgendaPersonale
- `26047` — getAgendaTodo
- `26048` — saveAgendaTodo
- `26050` — pulisciAgendaVecchia
- `26054` — navigaAgenda
- `26063` — toggleFormAgenda
- `26064` — toggleFormTodo
- `26066` — salvaAgendaItem
- `26080` — salvaTodoItem
- `26092` — toggleAgendaFatto
- `26100` — toggleTodoFatto
- `26113` — _catCol
- `26115` — renderAgendaDx
- `26209` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 26335-26539

- `26335` — renderScadenzeAlert
- `26520` — segnaGestito
- `26539` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 26548-26623

- `26548` — ripristinaPaz
- `26556` — eliminaPaz
- `26601` — getDove
- `26605` — setDove
- `26623` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 26628-27068

- `26628` — getCredenzialiPersistenti
- `26641` — cancellaCredenzialiPersistenti
- `26646` — rinnovaSessioneConRefreshToken
- `26663` — getSessioneSalvata
- `26682` — salvaSessione
- `26692` — cancellaSessione
- `26696` — eseguiLogin
- `26743` — eseguiLogout
- `26765` — mostraApp
- `26770` — verificaSessioneEAvvia
- `26798` — assicuraTokenValido
- `26827` — _garantiscoSessionePerSync
- `26839` — avviaRinnovoTokenPeriodico
- `26843` — fermaRinnovoTokenPeriodico
- `26852` — _authReset
- `26857` — _authMostra
- `26860` — mostraLogin
- `26861` — mostraRegistrazione
- `26862` — mostraRecupero
- `26863` — mostraNuovaPassword
- `26866` — eseguiRegistrazione
- `26904` — eseguiRecuperoPassword
- `26933` — eseguiNuovaPassword
- `26967` — _parseHashParams
- `26974` — _pulisciHash
- `26978` — gestisciRitornoAuth
- `27068` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 27140-27263

- `27140` — apriPannelloRicette
- `27169` — chiudiPannelloRicette
- `27177` — applicaRicettaPasto
- `27213` — inizializzaP2
- `27225` — deepClone
- `27229` — applicaPatch
- `27263` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
