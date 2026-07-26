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
Righe 5373-8042

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
- `7729` — renderPdRoutine
- `6723` — cardHTML
- `7871` — updateRoutineCampo
- `7879` — suggerisciPastoEQuando
- `7906` — filtroLibreria
- `7915` — renderLibreriaGrid
- `7936` — aggiungiDaLibreriaIdx
- `7960` — openModalRoutine
- `7967` — salvaRoutineVoce
- `7992` — salvaRoutine
- `7999` — mostraRoutinePopup
- `8027` — removeRoutineVoce
- `8042` — _renderAggiustamentiSection

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
Righe 8127-8831

- `8127` — salvaAggiustamento
- `8160` — eliminaAggiustamento
- `8169` — renderPdNote
- `8204` — salvaNotaClinica
- `8219` — deleteNota
- `8228` — saveNote
- `8743` — _applicaRegoloSemaforoLEGACY
- `8784` — resetSemaforoAuto
- `8831` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 9000-9198

- `9000` — avviaFX
- `9028` — avviaAnalisi
- `9045` — _renderFlussoPanel
- `9089` — _riepEsc
- `9093` — _riepNum
- `9099` — _riepDelta
- `9107` — _riepDataSig
- `9125` — _riepParseFX
- `8087` — clean
- `9139` — _riepAggiornaFX
- `9165` — _riepToggleDomandaDefault
- `9177` — _riepAddDomanda
- `9190` — _riepRemoveDomanda
- `9198` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 9410-9636

- `8218` — dCol
- `8336` — card
- `9410` — renderPdRagionamento
- `9498` — inviaMessaggioRag
- `9516` — concludiERiassumi
- `9530` — salvaRagionamento
- `9551` — apriGeneratoreDaRag
- `9559` — nuovaSessioneRag
- `9565` — cancellaSavedRag
- `9575` — renderPazTimeline
- `9607` — renderPdAnamnesi
- `9636` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 11105-12188

- `11053` — _anNorm *(P125 — testo confrontabile: minuscole, niente accenti)*
- `11059` — _anCorrisponde *(P125 — ricerca per parole-prefisso: "vit d" trova "Vitamina D")*
- `11065` — filtraAnalisi *(P125 — filtro dal vivo delle 119 voci)*
- `11099` — pulisciRicercaAnalisi
- `11105` — renderPdAnalisi
- `11161` — toggleAnalisiSection
- `11310` — loadAnalisiSanguePDF
- `11197` — _impPdfConfigurata
- `11198` — _impPdfLib
- `11208` — _impPdfApri
- `11221` — _impPdfPagina *(P124b — una pagina del PDF → immagine, con la rotazione RILEVATA, non quella dichiarata dal file)*
- `11242` — _impRuotaImmagine
- `11267` — _impRilevaRotazione *(P124b — chiamata piccola: di quanti gradi va girata la pagina)*
- `11286` — _impPromptPagina *(P124b — prompt di UNA pagina, con l'impronta della riga: valore+unità+riferimento)*
- `11485` — _impNormalizzaNumero *(P124 — numero all'italiana → punto decimale, conversione fatta dall'app e non dall'AI)*
- `11496` — _impNumeri
- `11504` — _impSembraIntervallo
- `11512` — _impUgualeAlRange
- `11521` — _impLimitiStd
- `11542` — _impFuoriScala
- `11551` — _impCorrezioneVirgola
- `11563` — _impTestoLimiti
- `11584` — _impRifPlausibile *(P124b — un "riferimento" che è un'unità di misura = riga disallineata)*
- `11597` — _impUnitaCanonica
- `11619` — _impStessaGrandezza *(P124b — stesso tipo di misura a meno del prefisso: nanomoli/micromoli/millimoli)*
- `11636` — _impUnitaCompatibili
- `11647` — _impControllaValore *(P124 — i controlli anti-errore su un valore estratto)*
- `11711` — mostraDiffAnalisi *(P124 — colonna Estratto modificabile + righe sospette deselezionate)*
- `11901` — _calcoloIncluso
- `11907` — toggleCalcoloIncluso
- `11929` — _renderCalcoliPannello
- `11970` — toggleGlossario
- `11975` — updateAnalisi
- `12034` — salvaAnalisi
- `12047` — applicaGruppoClinico
- `12076` — renderBoxGruppiCliniciSuggeriti
- `12108` — suggerisciGruppiClinici
- `12188` — renderMemoriaInbody

---
### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9176 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `9762` — _richVal
- `9769` — _richBmi
- `9774` — _richPat
- `9780` — _richNum
- `9825` — _richPreselezione
- `9841` — richLeggiIntestazione
- `9845` — richSalvaIntestazione
- `9854` — apriRichiestaAnalisi
- `9874` — _richModaleHtml
- `9950` — _richEsc
- `9952` — _richMotivoCambia
- `9958` — _richToggleSez
- `9964` — _richAggiornaConteggi
- `9972` — _richMotivoCorrente
- `9982` — _richSelezione
- `9997` — _richTxt
- `10003` — _richCostruisciPDF
- `8969` — nuovaPagina
- `8970` — spazio
- `10099` — _richNomeFile
- `10104` — _richPrepara
- `10114` — _richRegistra
- `10128` — _richStato
- `10130` — richScaricaPDF
- `10145` — _richUpload
- `10173` — _richWaUrl
- `10180` — _richTestoWa
- `10194` — richInviaWhatsApp
- `10234` — richCopiaLink
- `10255` — _richStoricoHtml

---
### REFERTI DEL SANGUE DATATI — storico nel tempo (P118 tappa 1)
Righe 9194-9387 — migrazione, ordinamento, quadro attuale derivato, barra di selezione.

- `10830` — _refertoNuovoId
- `10833` — _refertoOggi
- `10837` — _refertoDataIt
- `10843` — _refertoConteggio
- `10857` — _refertiMigra
- `10884` — _refertiOrdinati
- `10895` — _refertoPiuRecente
- `10900` — _refertoInVista
- `10918` — _refertiApplica
- `10931` — _refertoCrea
- `10950` — refertoCambiaVista
- `10956` — refertoCambiaData
- `10968` — refertoNuovo
- `10976` — refertoDuplica
- `10985` — refertoElimina
- `11000` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `10443` — _rangeNum
- `10449` — _rangeTestoDa
- `10468` — _rangeCoppia
- `10478` — _rangeHtml

---
### ANDAMENTO NEL TEMPO — tracciato, variazione, grafico grande (P118 tappa 3)
Righe 9441-9745 — serie storica, regola del colore, sparkline, pannello in fondo.

- `10520` — _andLimiti
- `10541` — _andParseRangeLab
- `10554` — _andDistanza
- `10561` — _andValutazione
- `10574` — _andSerie
- `10588` — _andNum
- `10592` — _andDataBreve
- `10597` — _andMeseAnno
- `10605` — _andDominio
- `10619` — _andColore
- `10632` — _andSparkHtml
- `10658` — _andRigaHtml
- `10680` — _andEsamiSeguibili
- `10688` — andScegliEsame
- `10694` — _andPannelloHtml
- `10747` — _andGraficoGrande
- `10798` — _andPasso

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 12236-12647

- `12236` — _ibFmtBreve
- `12245` — _renderPesiIntermediSection
- `12294` — aggiungiPesoIntermedio
- `12310` — eliminaPesoIntermedio
- `12320` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `12647` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 12919-12919

- `12919` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 13297-15554

- `13297` — aggiornaLabelMacros
- `13315` — calcolaMacros
- `13456` — applicaSchema
- `13491` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `13497` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `13514` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `13550` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `13568` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `13681` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `13695` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `13751` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `13765` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `13797` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `13830` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `13872` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `13880` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `13891` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `13918` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `13933` — _stradeVerso *(le strade complete + percentuale libera)*
- `13956` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `14024` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `14046` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `14099` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `14203` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `14218` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `14243` — _renderRifPesoBox
- `14294` — _usaRifPeso
- `14298` — _aggiornaRifPesoTarget
- `14301` — _aggiornaRegimeSlider
- `14958` — _presetRegime
- `14962` — _initRegimeSliderDaPaziente
- `14980` — ricalcolaLAF
- `15122` — renderStoricoTDEE
- `15156` — attivaSlotTDEE
- `15164` — eliminaSlotTDEE
- `15177` — _toggleCiclizzazione
- `15183` — _aggiornaAnteprimaCiclizzazione
- `15201` — salvaCalcoloMacros
- `15315` — _metAllenamento
- `15331` — _neatFrazione
- `15405` — _larnLafStileVita
- `15422` — _regimeOffset
- `15432` — _componiRegimeText
- `15465` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `15477` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `15484` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `15554` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 15572-16002

- `15572` — renderTargetBadge
- `15601` — verificaRegola_75_20_5
- `15638` — renderBadge75_20_5
- `15703` — _validaNorm
- `15706` — _validaMatchTermine
- `15714` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `15765` — _validaTesto
- `15786` — validaPiano
- `15860` — _validaFirmaBlocchi
- `15867` — renderBadgeValidatore
- `15898` — _validaVaiAlGiorno
- `15907` — apriPannelloValidatore
- `13472` — esc
- `15964` — _validaEseguiOverride
- `15987` — validaGateExport
- `16002` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 16135-16767

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
- `16135` — pianoPazSelezionato
- `16282` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `16520` — renderPanelMacrosGiorno
- `16663` — pmgCambiaGrammi
- `16690` — riapriPiano
- `16728` — _montaPianoCorrente
- `16767` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 16777-17246

- `16777` — pullTemplateSupabase
- `16788` — delTemplateSupabase
- `16797` — _promptTemplateNome
- `16822` — _creaTemplateDaJSON
- `16845` — salvaComeTemplate
- `16856` — salvaComeTemplateDaPiano
- `16865` — _normNomeAlim
- `16866` — _escRegAlim
- `16867` — _raccogliAlimentiDaPiano
- `16878` — _alimentiEsclusiPaziente
- `16890` — _trovaConflittiTemplate
- `16908` — _mostraAvvisoConflitti
- `16932` — applicaTemplate
- `16950` — apriPickerTemplate
- `16978` — _pickPaziente
- `16997` — applicaTemplatePick
- `17001` — rinominaTemplate
- `17012` — eliminaTemplate
- `17022` — renderLibreriaTemplate
- `17051` — renderStoricoPiani
- `17110` — eliminaPiano
- `17126` — _getActiveMacrosTarget
- `17150` — getTargetAttivi
- `17187` — calcolaTargetsCiclizzazione
- `17213` — _setupPianoTargets
- `17237` — getStagioneCorrente
- `17246` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 17680-17680

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `17680` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 17689-18148

- `17689` — aggiornaUIcolazione
- `17699` — salvaRegolePiano
- `17760` — _isModelloSistema
- `17763` — _isModelloSistemaModificato
- `17775` — caricaModelliCustomLocal
- `17789` — salvaModelliCustomLocal
- `17810` — _migraRecordCustom
- `17825` — _syncAliasLegacy
- `17834` — caricaAlimentiCustom
- `17858` — pushAlimentiCustomSupabase
- `17868` — pullAlimentiCustomSupabase
- `17882` — pushModelliSupabase
- `17900` — pullModelliSupabase
- `17925` — _calcolaFreqDaModello
- `17944` — aggiornaUImodello
- `18033` — popolaDropdownModelli
- `18061` — cambiaModelloRotazione
- `18067` — ripristinaModelloOriginale
- `18090` — eliminaModelloCustom
- `18108` — mostraAnteprimaModello
- `18118` — apriEditorModello
- `18148` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 18417-18655

- `15738` — rerender
- `18417` — _salvaModelloDaEditor
- `18459` — caricaRegolePiano
- `18489` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `18524` — _aiLogUsage
- `18546` — _aiProxyUrl
- `18552` — _aiTokenPerProxy
- `18581` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `18655` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 18734-18874

- `16216` — _risolviCollisioniCelle
- `18734` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `18794` — getFruttaStile
- `18801` — _fruttaGetPasto
- `18811` — _fruttaContaRigheRicetta
- `18815` — _fruttaIndiceBasePasto
- `18835` — getFruttaMarker
- `18848` — fruttaMarkerHtml
- `18856` — _fruttaCheckboxHtml
- `18865` — toggleFrutta
- `18874` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 18910-20184

- `18910` — _renderCelleGriglia
- `18990` — _renderRicetteTestuali
- `19029` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `19100` — _renderCelleHtml
- `19108` — toggleCellaMenu
- `19127` — closeAllCellaMenus
- `19135` — _trovaPasto
- `19143` — cellaSposta
- `19197` — cellaCancella
- `19218` — apriEditGrammatura
- `16789` — salva
- `19266` — cellaSwap
- `19286` — cellaRimuoviAlt
- `19300` — cellaAggiungiAlt
- `19403` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `19488` — apriEditRicetta
- `19497` — aggiungiRicetta
- `19513` — rimuoviRicetta
- `19522` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `19684` — ngAggiungiSpuntinoVuoto
- `19700` — apriAggiungiCella
- `17254` — risolviCompatibili
- `19796` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `19888` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `20029` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `20184` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 20232-20613

- `20232` — _attesoStrutturaPiano
- `20252` — _confrontaStrutturaPiano
- `20282` — _costruisciPromptDelta
- `20309` — _pianoToolSchema
- `20384` — _pianoMaxTokens
- `20393` — _estraiPianoDaRisposta
- `20415` — chiamaGeneraPiano
- `20582` — mostraLoadingSteps
- `18123` — render
- `20613` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 20680-21254

- `20680` — generaMessaggioAI
- `20785` — copiaMessaggioAI
- `20795` — salvaInStorico
- `20807` — salvaVarianteAI
- `20822` — renderVariantiSalvate
- `20841` — usaVariante
- `20859` — eliminaVariante
- `20870` — renderStoricoMsg
- `20886` — apriWhatsApp
- `21254` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 21432-22929

- `21432` — _ngColoreSemaforoNome
- `21440` — apriSceltaModalitaPiano
- `21475` — _ngChiudiModalita
- `21478` — _ngCostruisciGiornoVuoto
- `21511` — _ngCostruisciGiornoSpeciale
- `21522` — _ngIndiceInizioSpeciali
- `21533` — _ngModalitaNomeGiorno
- `21539` — _ngImpostaModalitaNomeGiorno
- `21542` — _ngLettera
- `21549` — _ngEtichettaGiorno
- `21569` — _ngEtichettaGiornoBreve
- `21583` — _ngToggleGiornoSpeciale
- `21607` — _ngRenderPannelloSpeciale
- `21675` — _generaGiornoSpecialeAI
- `21775` — _ngGiornoHaContenuto
- `21787` — _ngCreaPianoManuale
- `21810` — _ngScrollTabGiorni
- `21820` — _ngAbilitaDragScroll
- `21857` — _ngCambiaNumeroGiorni
- `21889` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `21903` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `21944` — _ngToggleCat
- `21953` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `21977` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `22133` — _ngSalvaPianoManuale
- `22159` — _ngParseIngrediente
- `22183` — _ngScomponiIngredienti
- `22195` — _ricCalcolaMacroDaIngredienti
- `22213` — _ricRicalcolaMacroLive
- `22220` — _ricAggiornaInfoMacro
- `22234` — _ricRicalcolaMacroLiveNow
- `22258` — _ngTrovaCategoriaAlimento
- `22291` — _ngPescaRicetta
- `22334` — _ngScomponiRicettaNelPasto
- `22371` — _ngDragStart
- `22382` — _ngDragStartCella
- `22393` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `22400` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `22405` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `22424` — _ngAggiungiAlimento
- `22449` — _ngRimuoviAlimento
- `22463` — _ngDopoModifica
- `22481` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `22534` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `22563` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `22580` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `22588` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `22660` — gramTestoCasalingo
- `22686` — _appendToggleNutrizionali
- `22729` — _appendTogglePromemoria
- `22758` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `22904` — cpFromEmoji
- `22910` — getEmojiCp
- `22929` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `20904` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `20926` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `20931` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `20957` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `21045` — _spesaTestoWhatsApp
- `21061` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `21106` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `21129` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `21157` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `21217` — scaricaListaSpesaPDF (download diretto, un click)
- `21225` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `21237` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 24077-24077

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
- `24077` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 24088-24294

- `24088` — salvaInbody
- `24152` — delInbody
- `24159` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `24294` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 24322-24791

- `24322` — buildSemLegenda
- `24336` — renderAlEditor
- `24397` — _alimNomeRegex
- `24405` — _alimGiorniDaPiano
- `24413` — _scanGiorniPerNome
- `24428` — scanRiferimentiAlimento
- `24457` — _alimRefsRighe
- `24463` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `24551` — modificaAlimentoCustom
- `24571` — ripristinaValoriPrecedentiAlimento
- `24583` — _resetAlimModal
- `24594` — apriNuovoAlimentoCustom
- `24600` — salvaAlimentoCustom
- `24667` — eliminaAlimentoCustom
- `24698` — _alimFonteBadge
- `24703` — renderAlimentiPage
- `22217` — E
- `24773` — archiviaAlimentoCustom
- `24791` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 24818-25059

- `24818` — _bcSetStatus
- `24820` — apriScannerBarcode
- `24828` — chiudiScannerBarcode
- `24833` — _bcStopCamera
- `24841` — _bcModaleAperto
- `24843` — _bcAvviaCamera
- `24854` — _bcAvviaNativo
- `24874` — _bcAvviaZXing
- `24883` — _bcZXStart
- `24894` — _bcErroreCamera
- `24902` — cercaBarcodeManuale
- `24908` — _barcodeTrovato
- `24924` — cercaBarcodeOFF
- `24942` — _bcProdottoNonTrovato
- `24956` — _bcPrecompilaForm
- `22477` — num
- `24980` — togAl
- `25033` — selCatAl
- `25047` — selTuttiAl
- `25059` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 25073-25389

- `25073` — setCalView
- `25074` — calPrev
- `25075` — calNext
- `25076` — calToday
- `25078` — renderCal
- `25092` — renderCalMonth
- `25116` — renderCalWeek
- `25134` — renderCalDay
- `25150` — selGiorno
- `25164` — setDisp
- `25169` — openAddEvento
- `25182` — openAddEventoPaz
- `25188` — toggleEntrataCheck
- `25193` — salvaEvento
- `25216` — openEvDetail
- `25271` — delEvento
- `25279` — copyMsg
- `25286` — aggDateCal
- `25291` — syncInizio
- `25292` — syncControllo
- `25293` — aggiornaPrev
- `25310` — renderRic
- `25337` — openNuovaRic
- `25338` — editRic
- `25348` — salvaRic
- `25373` — delRic
- `25389` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 25474-25534

- `25474` — aggiungiEntrataPerPaziente
- `25491` — openNuovaEntrata
- `25505` — salvaEntrata
- `25526` — delEntrata
- `25534` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 25564-26000

- `25564` — aiSuggerisciRicetta
- `25609` — renderConcettiModal
- `25628` — apriConcettiModal
- `25655` — salvaConcettiAllegati
- `25679` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `25717` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `25726` — loadInbodyPDF
- `25837` — _vitdLabel
- `25841` — getIntegratori
- `25845` — getIntegraWant
- `25849` — setIntegratori
- `25866` — setIntegraWant
- `25877` — getPatologieChip
- `25878` — getAllergieChip
- `25879` — setPatologieChip
- `25880` — setAllergieChip
- `25881` — getPatologie
- `25882` — getAllergie
- `25883` — setPatologieFromStr
- `25890` — setAllergieFromStr
- `25903` — getSdvChip
- `25904` — getCspChip
- `25905` — setSdvChip
- `25906` — setCspChip
- `25907` — setSdvFromStr
- `25908` — setCspFromStr
- `25912` — getBudget
- `25913` — setBudget
- `25918` — renderCalAnno
- `25949` — comprimeImmagine
- `25971` — uploadImmagineConcetto
- `25990` — rimuoviImmagineConcetto
- `26000` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 26066-26170

- `26066` — entraSelConcetti
- `26067` — annullaSelConcetti
- `26068` — toggleConcettoSel
- `26073` — eliminaConcettiSelezionati
- `26092` — confermaEliminaConcetti
- `26107` — aiRiscriviConcetto
- `26121` — editConcetto
- `26139` — salvaConcetto
- `26150` — openNuovoConcetto
- `26170` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 26171-26334

- `26171` — saveAgendaPersonale
- `26172` — getAgendaTodo
- `26173` — saveAgendaTodo
- `26175` — pulisciAgendaVecchia
- `26179` — navigaAgenda
- `26188` — toggleFormAgenda
- `26189` — toggleFormTodo
- `26191` — salvaAgendaItem
- `26205` — salvaTodoItem
- `26217` — toggleAgendaFatto
- `26225` — toggleTodoFatto
- `26238` — _catCol
- `26240` — renderAgendaDx
- `26334` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 26460-26664

- `26460` — renderScadenzeAlert
- `26645` — segnaGestito
- `26664` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 26673-26748

- `26673` — ripristinaPaz
- `26681` — eliminaPaz
- `26726` — getDove
- `26730` — setDove
- `26748` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 26753-27193

- `26753` — getCredenzialiPersistenti
- `26766` — cancellaCredenzialiPersistenti
- `26771` — rinnovaSessioneConRefreshToken
- `26788` — getSessioneSalvata
- `26807` — salvaSessione
- `26817` — cancellaSessione
- `26821` — eseguiLogin
- `26868` — eseguiLogout
- `26890` — mostraApp
- `26895` — verificaSessioneEAvvia
- `26923` — assicuraTokenValido
- `26952` — _garantiscoSessionePerSync
- `26964` — avviaRinnovoTokenPeriodico
- `26968` — fermaRinnovoTokenPeriodico
- `26977` — _authReset
- `26982` — _authMostra
- `26985` — mostraLogin
- `26986` — mostraRegistrazione
- `26987` — mostraRecupero
- `26988` — mostraNuovaPassword
- `26991` — eseguiRegistrazione
- `27029` — eseguiRecuperoPassword
- `27058` — eseguiNuovaPassword
- `27092` — _parseHashParams
- `27099` — _pulisciHash
- `27103` — gestisciRitornoAuth
- `27193` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 27265-27388

- `27265` — apriPannelloRicette
- `27294` — chiudiPannelloRicette
- `27302` — applicaRicettaPasto
- `27338` — inizializzaP2
- `27350` — deepClone
- `27354` — applicaPatch
- `27388` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
