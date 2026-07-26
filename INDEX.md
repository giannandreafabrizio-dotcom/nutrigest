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
Righe 10992-12039

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
- `11493` — _impUnitaCompatibili
- `11504` — _impControllaValore *(P124 — i controlli anti-errore su un valore estratto)*
- `11567` — mostraDiffAnalisi *(P124 — colonna Estratto modificabile + righe sospette deselezionate)*
- `11757` — _calcoloIncluso
- `11763` — toggleCalcoloIncluso
- `11785` — _renderCalcoliPannello
- `11821` — toggleGlossario
- `11826` — updateAnalisi
- `11885` — salvaAnalisi
- `11898` — applicaGruppoClinico
- `11927` — renderBoxGruppiCliniciSuggeriti
- `11959` — suggerisciGruppiClinici
- `12039` — renderMemoriaInbody

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
Righe 12087-12498

- `12087` — _ibFmtBreve
- `12096` — _renderPesiIntermediSection
- `12145` — aggiungiPesoIntermedio
- `12161` — eliminaPesoIntermedio
- `12171` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `12498` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 12770-12770

- `12770` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 13148-15405

- `13148` — aggiornaLabelMacros
- `13166` — calcolaMacros
- `13307` — applicaSchema
- `13342` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `13348` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `13365` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `13401` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `13419` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `13532` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `13546` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `13602` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `13616` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `13648` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `13681` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `13723` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `13731` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `13742` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `13769` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `13784` — _stradeVerso *(le strade complete + percentuale libera)*
- `13807` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `13875` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `13897` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `13950` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `14054` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `14069` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `14094` — _renderRifPesoBox
- `14145` — _usaRifPeso
- `14149` — _aggiornaRifPesoTarget
- `14152` — _aggiornaRegimeSlider
- `14809` — _presetRegime
- `14813` — _initRegimeSliderDaPaziente
- `14831` — ricalcolaLAF
- `14973` — renderStoricoTDEE
- `15007` — attivaSlotTDEE
- `15015` — eliminaSlotTDEE
- `15028` — _toggleCiclizzazione
- `15034` — _aggiornaAnteprimaCiclizzazione
- `15052` — salvaCalcoloMacros
- `15166` — _metAllenamento
- `15182` — _neatFrazione
- `15256` — _larnLafStileVita
- `15273` — _regimeOffset
- `15283` — _componiRegimeText
- `15316` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `15328` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `15335` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `15405` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 15423-15853

- `15423` — renderTargetBadge
- `15452` — verificaRegola_75_20_5
- `15489` — renderBadge75_20_5
- `15554` — _validaNorm
- `15557` — _validaMatchTermine
- `15565` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `15616` — _validaTesto
- `15637` — validaPiano
- `15711` — _validaFirmaBlocchi
- `15718` — renderBadgeValidatore
- `15749` — _validaVaiAlGiorno
- `15758` — apriPannelloValidatore
- `13472` — esc
- `15815` — _validaEseguiOverride
- `15838` — validaGateExport
- `15853` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 15986-16618

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
- `15986` — pianoPazSelezionato
- `16133` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `16371` — renderPanelMacrosGiorno
- `16514` — pmgCambiaGrammi
- `16541` — riapriPiano
- `16579` — _montaPianoCorrente
- `16618` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 16628-17097

- `16628` — pullTemplateSupabase
- `16639` — delTemplateSupabase
- `16648` — _promptTemplateNome
- `16673` — _creaTemplateDaJSON
- `16696` — salvaComeTemplate
- `16707` — salvaComeTemplateDaPiano
- `16716` — _normNomeAlim
- `16717` — _escRegAlim
- `16718` — _raccogliAlimentiDaPiano
- `16729` — _alimentiEsclusiPaziente
- `16741` — _trovaConflittiTemplate
- `16759` — _mostraAvvisoConflitti
- `16783` — applicaTemplate
- `16801` — apriPickerTemplate
- `16829` — _pickPaziente
- `16848` — applicaTemplatePick
- `16852` — rinominaTemplate
- `16863` — eliminaTemplate
- `16873` — renderLibreriaTemplate
- `16902` — renderStoricoPiani
- `16961` — eliminaPiano
- `16977` — _getActiveMacrosTarget
- `17001` — getTargetAttivi
- `17038` — calcolaTargetsCiclizzazione
- `17064` — _setupPianoTargets
- `17088` — getStagioneCorrente
- `17097` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 17531-17531

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `17531` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 17540-17999

- `17540` — aggiornaUIcolazione
- `17550` — salvaRegolePiano
- `17611` — _isModelloSistema
- `17614` — _isModelloSistemaModificato
- `17626` — caricaModelliCustomLocal
- `17640` — salvaModelliCustomLocal
- `17661` — _migraRecordCustom
- `17676` — _syncAliasLegacy
- `17685` — caricaAlimentiCustom
- `17709` — pushAlimentiCustomSupabase
- `17719` — pullAlimentiCustomSupabase
- `17733` — pushModelliSupabase
- `17751` — pullModelliSupabase
- `17776` — _calcolaFreqDaModello
- `17795` — aggiornaUImodello
- `17884` — popolaDropdownModelli
- `17912` — cambiaModelloRotazione
- `17918` — ripristinaModelloOriginale
- `17941` — eliminaModelloCustom
- `17959` — mostraAnteprimaModello
- `17969` — apriEditorModello
- `17999` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 18268-18506

- `15738` — rerender
- `18268` — _salvaModelloDaEditor
- `18310` — caricaRegolePiano
- `18340` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `18375` — _aiLogUsage
- `18397` — _aiProxyUrl
- `18403` — _aiTokenPerProxy
- `18432` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `18506` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 18585-18725

- `16216` — _risolviCollisioniCelle
- `18585` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `18645` — getFruttaStile
- `18652` — _fruttaGetPasto
- `18662` — _fruttaContaRigheRicetta
- `18666` — _fruttaIndiceBasePasto
- `18686` — getFruttaMarker
- `18699` — fruttaMarkerHtml
- `18707` — _fruttaCheckboxHtml
- `18716` — toggleFrutta
- `18725` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 18761-20035

- `18761` — _renderCelleGriglia
- `18841` — _renderRicetteTestuali
- `18880` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `18951` — _renderCelleHtml
- `18959` — toggleCellaMenu
- `18978` — closeAllCellaMenus
- `18986` — _trovaPasto
- `18994` — cellaSposta
- `19048` — cellaCancella
- `19069` — apriEditGrammatura
- `16789` — salva
- `19117` — cellaSwap
- `19137` — cellaRimuoviAlt
- `19151` — cellaAggiungiAlt
- `19254` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `19339` — apriEditRicetta
- `19348` — aggiungiRicetta
- `19364` — rimuoviRicetta
- `19373` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `19535` — ngAggiungiSpuntinoVuoto
- `19551` — apriAggiungiCella
- `17254` — risolviCompatibili
- `19647` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `19739` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `19880` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `20035` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 20083-20464

- `20083` — _attesoStrutturaPiano
- `20103` — _confrontaStrutturaPiano
- `20133` — _costruisciPromptDelta
- `20160` — _pianoToolSchema
- `20235` — _pianoMaxTokens
- `20244` — _estraiPianoDaRisposta
- `20266` — chiamaGeneraPiano
- `20433` — mostraLoadingSteps
- `18123` — render
- `20464` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 20531-21105

- `20531` — generaMessaggioAI
- `20636` — copiaMessaggioAI
- `20646` — salvaInStorico
- `20658` — salvaVarianteAI
- `20673` — renderVariantiSalvate
- `20692` — usaVariante
- `20710` — eliminaVariante
- `20721` — renderStoricoMsg
- `20737` — apriWhatsApp
- `21105` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 21283-22780

- `21283` — _ngColoreSemaforoNome
- `21291` — apriSceltaModalitaPiano
- `21326` — _ngChiudiModalita
- `21329` — _ngCostruisciGiornoVuoto
- `21362` — _ngCostruisciGiornoSpeciale
- `21373` — _ngIndiceInizioSpeciali
- `21384` — _ngModalitaNomeGiorno
- `21390` — _ngImpostaModalitaNomeGiorno
- `21393` — _ngLettera
- `21400` — _ngEtichettaGiorno
- `21420` — _ngEtichettaGiornoBreve
- `21434` — _ngToggleGiornoSpeciale
- `21458` — _ngRenderPannelloSpeciale
- `21526` — _generaGiornoSpecialeAI
- `21626` — _ngGiornoHaContenuto
- `21638` — _ngCreaPianoManuale
- `21661` — _ngScrollTabGiorni
- `21671` — _ngAbilitaDragScroll
- `21708` — _ngCambiaNumeroGiorni
- `21740` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `21754` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `21795` — _ngToggleCat
- `21804` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `21828` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `21984` — _ngSalvaPianoManuale
- `22010` — _ngParseIngrediente
- `22034` — _ngScomponiIngredienti
- `22046` — _ricCalcolaMacroDaIngredienti
- `22064` — _ricRicalcolaMacroLive
- `22071` — _ricAggiornaInfoMacro
- `22085` — _ricRicalcolaMacroLiveNow
- `22109` — _ngTrovaCategoriaAlimento
- `22142` — _ngPescaRicetta
- `22185` — _ngScomponiRicettaNelPasto
- `22222` — _ngDragStart
- `22233` — _ngDragStartCella
- `22244` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `22251` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `22256` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `22275` — _ngAggiungiAlimento
- `22300` — _ngRimuoviAlimento
- `22314` — _ngDopoModifica
- `22332` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `22385` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `22414` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `22431` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `22439` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `22511` — gramTestoCasalingo
- `22537` — _appendToggleNutrizionali
- `22580` — _appendTogglePromemoria
- `22609` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `22755` — cpFromEmoji
- `22761` — getEmojiCp
- `22780` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `20755` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `20777` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `20782` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `20808` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `20896` — _spesaTestoWhatsApp
- `20912` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `20957` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `20980` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `21008` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `21068` — scaricaListaSpesaPDF (download diretto, un click)
- `21076` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `21088` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 23928-23928

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
- `23928` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 23939-24145

- `23939` — salvaInbody
- `24003` — delInbody
- `24010` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `24145` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 24173-24642

- `24173` — buildSemLegenda
- `24187` — renderAlEditor
- `24248` — _alimNomeRegex
- `24256` — _alimGiorniDaPiano
- `24264` — _scanGiorniPerNome
- `24279` — scanRiferimentiAlimento
- `24308` — _alimRefsRighe
- `24314` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `24402` — modificaAlimentoCustom
- `24422` — ripristinaValoriPrecedentiAlimento
- `24434` — _resetAlimModal
- `24445` — apriNuovoAlimentoCustom
- `24451` — salvaAlimentoCustom
- `24518` — eliminaAlimentoCustom
- `24549` — _alimFonteBadge
- `24554` — renderAlimentiPage
- `22217` — E
- `24624` — archiviaAlimentoCustom
- `24642` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 24669-24910

- `24669` — _bcSetStatus
- `24671` — apriScannerBarcode
- `24679` — chiudiScannerBarcode
- `24684` — _bcStopCamera
- `24692` — _bcModaleAperto
- `24694` — _bcAvviaCamera
- `24705` — _bcAvviaNativo
- `24725` — _bcAvviaZXing
- `24734` — _bcZXStart
- `24745` — _bcErroreCamera
- `24753` — cercaBarcodeManuale
- `24759` — _barcodeTrovato
- `24775` — cercaBarcodeOFF
- `24793` — _bcProdottoNonTrovato
- `24807` — _bcPrecompilaForm
- `22477` — num
- `24831` — togAl
- `24884` — selCatAl
- `24898` — selTuttiAl
- `24910` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 24924-25240

- `24924` — setCalView
- `24925` — calPrev
- `24926` — calNext
- `24927` — calToday
- `24929` — renderCal
- `24943` — renderCalMonth
- `24967` — renderCalWeek
- `24985` — renderCalDay
- `25001` — selGiorno
- `25015` — setDisp
- `25020` — openAddEvento
- `25033` — openAddEventoPaz
- `25039` — toggleEntrataCheck
- `25044` — salvaEvento
- `25067` — openEvDetail
- `25122` — delEvento
- `25130` — copyMsg
- `25137` — aggDateCal
- `25142` — syncInizio
- `25143` — syncControllo
- `25144` — aggiornaPrev
- `25161` — renderRic
- `25188` — openNuovaRic
- `25189` — editRic
- `25199` — salvaRic
- `25224` — delRic
- `25240` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 25325-25385

- `25325` — aggiungiEntrataPerPaziente
- `25342` — openNuovaEntrata
- `25356` — salvaEntrata
- `25377` — delEntrata
- `25385` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 25415-25851

- `25415` — aiSuggerisciRicetta
- `25460` — renderConcettiModal
- `25479` — apriConcettiModal
- `25506` — salvaConcettiAllegati
- `25530` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `25568` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `25577` — loadInbodyPDF
- `25688` — _vitdLabel
- `25692` — getIntegratori
- `25696` — getIntegraWant
- `25700` — setIntegratori
- `25717` — setIntegraWant
- `25728` — getPatologieChip
- `25729` — getAllergieChip
- `25730` — setPatologieChip
- `25731` — setAllergieChip
- `25732` — getPatologie
- `25733` — getAllergie
- `25734` — setPatologieFromStr
- `25741` — setAllergieFromStr
- `25754` — getSdvChip
- `25755` — getCspChip
- `25756` — setSdvChip
- `25757` — setCspChip
- `25758` — setSdvFromStr
- `25759` — setCspFromStr
- `25763` — getBudget
- `25764` — setBudget
- `25769` — renderCalAnno
- `25800` — comprimeImmagine
- `25822` — uploadImmagineConcetto
- `25841` — rimuoviImmagineConcetto
- `25851` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 25917-26021

- `25917` — entraSelConcetti
- `25918` — annullaSelConcetti
- `25919` — toggleConcettoSel
- `25924` — eliminaConcettiSelezionati
- `25943` — confermaEliminaConcetti
- `25958` — aiRiscriviConcetto
- `25972` — editConcetto
- `25990` — salvaConcetto
- `26001` — openNuovoConcetto
- `26021` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 26022-26185

- `26022` — saveAgendaPersonale
- `26023` — getAgendaTodo
- `26024` — saveAgendaTodo
- `26026` — pulisciAgendaVecchia
- `26030` — navigaAgenda
- `26039` — toggleFormAgenda
- `26040` — toggleFormTodo
- `26042` — salvaAgendaItem
- `26056` — salvaTodoItem
- `26068` — toggleAgendaFatto
- `26076` — toggleTodoFatto
- `26089` — _catCol
- `26091` — renderAgendaDx
- `26185` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 26311-26515

- `26311` — renderScadenzeAlert
- `26496` — segnaGestito
- `26515` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 26524-26599

- `26524` — ripristinaPaz
- `26532` — eliminaPaz
- `26577` — getDove
- `26581` — setDove
- `26599` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 26604-27044

- `26604` — getCredenzialiPersistenti
- `26617` — cancellaCredenzialiPersistenti
- `26622` — rinnovaSessioneConRefreshToken
- `26639` — getSessioneSalvata
- `26658` — salvaSessione
- `26668` — cancellaSessione
- `26672` — eseguiLogin
- `26719` — eseguiLogout
- `26741` — mostraApp
- `26746` — verificaSessioneEAvvia
- `26774` — assicuraTokenValido
- `26803` — _garantiscoSessionePerSync
- `26815` — avviaRinnovoTokenPeriodico
- `26819` — fermaRinnovoTokenPeriodico
- `26828` — _authReset
- `26833` — _authMostra
- `26836` — mostraLogin
- `26837` — mostraRegistrazione
- `26838` — mostraRecupero
- `26839` — mostraNuovaPassword
- `26842` — eseguiRegistrazione
- `26880` — eseguiRecuperoPassword
- `26909` — eseguiNuovaPassword
- `26943` — _parseHashParams
- `26950` — _pulisciHash
- `26954` — gestisciRitornoAuth
- `27044` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 27116-27239

- `27116` — apriPannelloRicette
- `27145` — chiudiPannelloRicette
- `27153` — applicaRicettaPasto
- `27189` — inizializzaP2
- `27201` — deepClone
- `27205` — applicaPatch
- `27239` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
