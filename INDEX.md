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
Righe 2412-2454

- `2412` — _slugAlimento
- `2420` — _catalogoIndicizza
- `2424` — _catalogoDeindicizza
- `2431` — costruisciCatalogo
- `2454` — risolviAlimento

---

### MACROS PIANO — calcolo e badge macro reali vs target
Righe 2469-2732

- `2469` — getValoriCREA
- `2481` — getCurrentPaziente
- `2501` — getKcalWeekend
- `2558` — getMacrosRicettaComposta
- `2564` — calcolaMacrosPiano
- `2666` — renderBadgeMacrosReali
- `2611` — pctStr
- `2612` — color
- `2625` — row
- `2732` — renderBadgeMacrosReali_DOM

---

### ANALISI DEL SANGUE — parsing, indici clinici derivati, interpretazione
Righe 3017-3204

- `3017` — _parseAnalisiNum
- `3025` — calcolaIndice
- `3178` — interpretaAnalisi
- `3190` — _interpAnalisiHtml
- `3204` — mostraInfoRange

---

### CONCETTI EDUCATIVI — sync Supabase, migrazione
Righe 3351-3375

- `3351` — pushConcetiSupabase
- `3361` — pullConcetiSupabase
- `3375` — migraConcetti

---

### ALIMENTI — categorie funzionali/semaforo, chip UI, equivalenze porzioni
Righe 3565-3920

- `3565` — getCategoriaSemaforo
- `3582` — _getCategorieGruppo
- `3596` — calcolaGrammaturaEquivalente
- `3636` — _gruppoEquiv  (P121: gruppo di equivalenza + criterio per categoria funzionale)
- `3642` — _porzioneStandard  (P121: porzione `g` di database dell'alimento)
- `3657` — suggerisciGrEquivalente  (P121: firma a 3 argomenti, il gruppo si deduce dai due alimenti)
- `3683` — _etichettaCriterio  (P121: ≈carbo / ≈prot / ≈grassi / fissa / porzione)
- `3698` — _promptAlternativeGrassi  (P121: riga del prompt AI generata dal motore)
- `3714` — ricalcolaAlternative  (P121: MOTORE UNICO, unico punto che scrive la grammatura di un'alternativa)
- `3733` — ricalcolaAlternativePiano  (P121: applica il motore a tutte le celle di un piano)
- `3782` — arrotondaGrammatura  (P121: sostituisce arrotondaPorzioneDiscreta — pezzi interi senza tetto / 5g)
- `3792` — getCategoriaFunzionale
- `3832` — catArr
- `3848` — _tagComuniTrova
- `3852` — getTagComuniChip
- `3855` — setTagComuniChip
- `3863` — setCatChips
- `3876` — getStagioniChip
- `3879` — setStagioniChip
- `3886` — getProfiloChip
- `3889` — setProfiloChip
- `3898` — wireChipGroup
- `3909` — wireAttrChipGroups
- `3920` — wireRadioChipGroup

---

### CONFIG / STORAGE LOCALE — cfg, localStorage db, util data/valuta
Righe 3948-4364

- `3948` — getCfg
- `3949` — saveCfgL
- `3950` — getUrl
- `3951` — saveLocal
- `3952` — loadLocal
- `3964` — uid
- `3982` — ymdLoc  (P141)
- `3987` — today
- `3995` — addDays
- `4003` — fData
- `4004` — fEur
- `4006` — getLastSyncText
- `4016` — getSyncColor
- `4023` — aggiornaStatoSync
- `4049` — setSyncStatus
- `4318` — _registraTombstone
- `4326` — _tombstoneAttivi
- `4338` — _fondiTombstones
- `4352` — _mergeTombstonesRemoti *(dal 24/7 legge il meta da `collections`, P74 1d)*
- `4364` — _applicaTombstones
- `4225` — _pazFetchMeta *(P74 1d — solo `collections`)*
- `4246` — _collectionsUpsert *(P74 — scrittura primaria dei 4 meta-record dal cutover 1d)*
- `4268` — _collectionsFetch *(P74 1d — lettura unica dei meta-record)*
- `4291` — _analisiSangueUpsert *(P74 fase 2 — scrittura ombra analisi del sangue, 24/7)*

---

### SYNC SUPABASE — push/pull ricette/pazienti, tombstones, conflitti (P69)
Righe 4388-4773

- `4388` — supaHeaders
- `4402` — pushRicetteSupabase
- `4427` — pullRicetteSupabase
- `4449` — delRicetteSupabase
- `4461` — delPazienteSupabase
- `4476` — pushToSheets
- `4520` — pullFromSheets
- `4599` — syncNow
- `4612` — sincronizzaTutto
- `4360` — stpSet
- `4365` — stpMsg
- `4743` — testConnSupabase
- `4773` — _p68LogSaveAnonimo

---

### SYNC SUPABASE — save paziente, piani/cache piano, entrate, eventi
Righe 4787-5309

- `4787` — save
- `4805` — _pushRigaPerId
- `4838` — _flushDirtyIds
- `4921` — _p69LoadBaseline
- `4924` — _p69StoreBaseline
- `4927` — _p69SetBaseline
- `4931` — _p69DropBaseline
- `4935` — _p69SetBaselineFromRows
- `4941` — _p69NomePaz
- `4946` — _p69InList
- `4954` — _p69RilevaConflitti
- `4990` — _p69DialogoConflitti
- `4738` — chiudi
- `5024` — _p69RisolviRicarica
- `5053` — _p69EsportaLocali
- `5066` — _p69RisolviSovrascrivi
- `5079` — pushPianoSupabase
- `5101` — pullPianiSupabase
- `5117` — delPianoSupabase
- `5133` — delPianiPazienteSupabase
- `5145` — pushCachePianoSupabase
- `5162` — caricaCachePianoSupabase
- `5184` — pushEntrateSupabase
- `5208` — pullEntrateSupabase
- `5222` — delEntrataSupabase
- `5230` — pushEntrataSupabase
- `5241` — pushEventoSupabase
- `5254` — pushEventiSupabase
- `5278` — pullEventiSupabase
- `5298` — delEventoSupabase
- `5309` — _pianoCacheKey

---

### UI GENERALE — config AI key, notifiche, navigazione (goTo/tab/modali)
Righe 5340-5451

- `5340` — _salvaPianoCache
- `5345` — _caricaPianoCache
- `5351` — salvaCfg
- `5352` — testConn
- `5359` — testaAntKey
- `5370` — initAntCard
- `5373` — esporta
- `5374` — importa
- `5379` — goTo
- `5395` — closeM
- `5403` — ngChiudiModale
- `5412` — ngChiudiPopupCoppia
- `5416` — ngAggiungiX
- `5427` — ngUpgradeModali
- `5447` — mTab
- `5448` — aggiornaEta
- `5449` — toggleOrarioNote
- `5450` — pdTab
- `5451` — notif

---

### PAZIENTI — registro: lista/card/kanban, apertura, editing, salvataggio, routine
Righe 5459-8295

- `5459` — getPazView
- `5460` — setPazView
- `5469` — _pazStatoPiano
- `5477` — _pazUrgenzaControllo
- `5492` — _pazBadgePrenotato  (P142)
- `5499` — pazSegnaArrivato  (P142)
- `5505` — _pazStatoTagHtml
- `5522` — _pazAggiornaFiltroRegimi
- `5530` — renderPaz
- `5588` — _renderPazCard
- `5613` — _renderPazLista
- `5640` — _renderPazKanban
- `5678` — openNuovoPaz
- `5705` — editPaz
- `5785` — REGOLE_SEMAFORO_ALIMENTI *(15 condizioni cliniche → grigi/celesti; globale dal 26/7 per essere verificabile dal test)*
- `6232` — _SEM_COLORI_LEGACY / `6105` _SEM_COLORI_AUTO *(F9 — unico vocabolario dei colori automatici)*
- `6237` — NOMI_CONDIZIONE_SEMAFORO *(etichette delle 15 condizioni, usate anche dal riquadro della scheda)*
- `6259` — _semaforoCondizioniAttive *(le condizioni spuntate su un paziente)*
- `6270` — _semaforoMigraPaziente *(F9 — toglie i colori legacy e ricalcola; idempotente)*
- `6281` — _semaforoMigraTutti *(passata su tutti i pazienti in memoria, con conteggio)*
- `6292` — applicaRegoloSemaforo *(dal 26/7 pulisce TUTTI e sei i colori automatici, non solo i suoi due)*
- `6380` — trovaChiaveAlimento *(match esatto sul nome: se non trova, la regola è ignorata in silenzio — vedi test s2-regole-nomi-alimenti)*
- `6404` — _pazNumOPrec *(F7 — campo assente = valore precedente, non azzeramento)*
- `6416` — _pazPreservaCampi *(F5 — l'anagrafica non cancella i campi che il form non gestisce)*
- `6422` — salvaPaz
- `6534` — openPaz
- `7982` — renderPdRoutine
- `6723` — cardHTML
- `8124` — updateRoutineCampo
- `8132` — suggerisciPastoEQuando
- `8159` — filtroLibreria
- `8168` — renderLibreriaGrid
- `8189` — aggiungiDaLibreriaIdx
- `8213` — openModalRoutine
- `8220` — salvaRoutineVoce
- `8245` — salvaRoutine
- `8252` — mostraRoutinePopup
- `8280` — removeRoutineVoce
- `8295` — _renderAggiustamentiSection

---

### 📈 PERCORSO — timeline di periodizzazione (P115 Tappe 1-5 COMPLETE, 24 lug 2026)
Righe 6021-6621 (numeri ESATTI al 24/7 notte, dopo la Tappa 5). ⚠️ Questo blocco (~600 righe) fa slittare tutti i numeri delle sezioni SUCCESSIVE a riga ~6020 rispetto all'ultima rigenerazione completa: per quelle sezioni fare grep di conferma. Rigenerazione completa alla prossima modifica strutturale.

- `6580` — _PERCORSO_TIPI (const: tipi fase, colori, pct default)
- `6587` — _percorsoGet *(normalizza p.percorso, scarta fasi invalide)*
- `6611` — _percorsoIntervalli *(fasi consecutive → date concrete dal/al)*
- `6625` — _percorsoFaseAt *(fase attiva a una data; dal incluso, al escluso)*
- `6634` — _percorsoKcalFase *(pct → kcal indicative via calcolaTDEE)*
- `6657` — _percorsoProiezione *(Tappa 2 — proiezione ibrida teorica/calibrata, cono, obiettivo a intervallo)*
- `6715` — _percorsoDataBreve *(ISO → "12 set")*
- `6732` — _percorsoSerieEnergia *(Tappa 3 — serie introito/TDEE stimato/TDEE osservato per la corsia energia)*
- `6771` — _percorsoSerieMassaMagra *(Tappa 4 — solo InBody: punti {data,m,pg})*
- `6790` — _percorsoConsuntivo *(Tappa 5 — legge p.consuntivo scritto da P50: aderenza, extra kcal, ritardo=extra÷7700, settimane perse; oggi sempre ok:false)*
- `6832` — _PERCORSO_LAYERS_DEFAULT / _percorsoLayersState / _percorsoLayersGet *(Tappa 4 — stato interruttori, SOLO sessione, mai su p)*
- `6837` — percorsoLayerToggle *(Tappa 4 — inverte un solo strato)*
- `6843` — percorsoVistaPreset *(Tappa 4 — preset "tecnica"/"paziente")*
- `6859` — _percorsoPaz *(e a seguire i mutatori percorsoInit/SetInizio/AddFase/UpdFase/DelFase/MoveFase)*
- `6915` — _PERCORSO_MODELLI / _PERCORSO_GEN *(P122 T3 — 4 modelli + regole dei cicli)*
- `6933` — _percorsoGeneraFasi *(P122 T3 — pura: dal traguardo alle fasi, ritmo = quello della proiezione)*
- `7013` — _percorsoModelloSelectHtml
- `7022` — percorsoGeneraDaModello *(propone; conferma prima di sostituire fasi esistenti)*
- `7045` — _percorsoShiftGiorni *(pura: ancora = ultima pesata)*
- `7055` — percorsoRiallinea *(⏩ trasla il piano, riprende dal giorno-fase dell'interruzione)*
- `7082` — _TRG_TIPI / `6744` _TRG_COMPORTAMENTI *(P122 T4 — tipi di traguardo e libreria comportamenti)*
- `7104` — _traguardiGet · `6761` _traguardoValoreAttuale *(valore corrente dai dati esistenti, null se manca)*
- `7143` — _traguardoVerso *(auto: dedotto dalla partenza)* · `6803` _traguardoValuta · `6824` _traguardiValuta
- `7184` — traguardoAdd · `6852` traguardoUpd · `6867` traguardoDel · `6873` traguardoSegna
- `7242` — _COND_TIPI · `6897` _percorsoCondizione *(pura: la fase finisce per soglia — SOLO suggerimento)*
- `7258` — percorsoSetCondizione · `6927` percorsoChiudiFase *(esito fotografato, riapribile)*
- `7292` — _traguardiHtml *(blocco 🏁 in fondo alla scheda Percorso)*
- `7390` — _percorsoVistaPaz / `7049` _percorsoVistaPazAttiva *(P122 T5 — modalità di sessione)*
- `7397` — _percorsoVittorie *(pura: vittorie dall'inizio del percorso + flag ricomposizione)*
- `7435` — _percorsoNascondiPeso *(in fase di massa il peso non si mostra al paziente)*
- `7446` — _traguardoFaseCorrente *(traguardo della fase IN CORSO, non quello lontano)*
- `7474` — _traguardoTestoPaziente *(righe in italiano semplice, riusate dal messaggio WhatsApp)*
- `7507` — _vistaPazienteHtml *(i tre riquadri che guarda il paziente)*
- `7587` — _percorsoChartSvg *(due corsie: peso + massa magra + cono proiezione sopra, striscia aderenza in mezzo (solo con dati P50), energia (kcal) sotto — tutto gated dagli interruttori)*
- `7776` — renderPdPercorso *(scheda: badge fase, riga proiezione/obiettivo, riga Piano vs Realtà (solo con dati), toolbar interruttori, grafico, editor)*

*(Tappa 2 tocca anche `calcolaMacros`: box obiettivo con intervallo al posto della data secca.)*

---

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 8380-8551

- `8380` — salvaAggiustamento
- `8413` — eliminaAggiustamento
- `8422` — renderPdNote
- `8457` — salvaNotaClinica
- `8472` — deleteNota
- `8481` — saveNote
- `8501` — resetSemaforoAuto *(F9 — pulsante 🔄 Ricalcola: pulisce gli automatici e rifà col sistema valido; il motore LEGACY non esiste più)*
- `8551` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 8777-8975

- `8777` — avviaFX
- `8805` — avviaAnalisi
- `8822` — _renderFlussoPanel
- `8866` — _riepEsc
- `8870` — _riepNum
- `8876` — _riepDelta
- `8884` — _riepDataSig
- `8902` — _riepParseFX
- `8087` — clean
- `8916` — _riepAggiornaFX
- `8942` — _riepToggleDomandaDefault
- `8954` — _riepAddDomanda
- `8967` — _riepRemoveDomanda
- `8975` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 9187-9419

- `8218` — dCol
- `8336` — card
- `9187` — renderPdRagionamento
- `9275` — inviaMessaggioRag
- `9293` — concludiERiassumi
- `9307` — salvaRagionamento
- `9328` — apriGeneratoreDaRag
- `9336` — nuovaSessioneRag
- `9342` — cancellaSavedRag
- `9352` — renderPazTimeline
- `9389` — renderPdAnamnesi
- `9419` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 11367-12502

- `11367` — _anNorm *(P125 — testo confrontabile: minuscole, niente accenti)*
- `11373` — _anCorrisponde *(P125 — ricerca per parole-prefisso: "vit d" trova "Vitamina D")*
- `11379` — filtraAnalisi *(P125 — filtro dal vivo delle 119 voci)*
- `11413` — pulisciRicercaAnalisi
- `11419` — renderPdAnalisi
- `11475` — toggleAnalisiSection
- `11624` — loadAnalisiSanguePDF
- `11511` — _impPdfConfigurata
- `11512` — _impPdfLib
- `11522` — _impPdfApri
- `11535` — _impPdfPagina *(P124b — una pagina del PDF → immagine, con la rotazione RILEVATA, non quella dichiarata dal file)*
- `11556` — _impRuotaImmagine
- `11581` — _impRilevaRotazione *(P124b — chiamata piccola: di quanti gradi va girata la pagina)*
- `11600` — _impPromptPagina *(P124b — prompt di UNA pagina, con l'impronta della riga: valore+unità+riferimento)*
- `11799` — _impNormalizzaNumero *(P124 — numero all'italiana → punto decimale, conversione fatta dall'app e non dall'AI)*
- `11810` — _impNumeri
- `11818` — _impSembraIntervallo
- `11826` — _impUgualeAlRange
- `11835` — _impLimitiStd
- `11856` — _impFuoriScala
- `11865` — _impCorrezioneVirgola
- `11877` — _impTestoLimiti
- `11898` — _impRifPlausibile *(P124b — un "riferimento" che è un'unità di misura = riga disallineata)*
- `11911` — _impUnitaCanonica
- `11933` — _impStessaGrandezza *(P124b — stesso tipo di misura a meno del prefisso: nanomoli/micromoli/millimoli)*
- `11950` — _impUnitaCompatibili
- `11961` — _impControllaValore *(P124 — i controlli anti-errore su un valore estratto)*
- `12025` — mostraDiffAnalisi *(P124 — colonna Estratto modificabile + righe sospette deselezionate)*
- `12215` — _calcoloIncluso
- `12221` — toggleCalcoloIncluso
- `12243` — _renderCalcoliPannello
- `12284` — toggleGlossario
- `12289` — updateAnalisi
- `12348` — salvaAnalisi
- `12361` — applicaGruppoClinico
- `12390` — renderBoxGruppiCliniciSuggeriti
- `12422` — suggerisciGruppiClinici
- `12502` — renderMemoriaInbody

---
### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9176 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `9549` — _richVal
- `9556` — _richBmi
- `9561` — _richPat
- `9567` — _richNum
- `9612` — _richPreselezione
- `9628` — richLeggiIntestazione
- `9632` — richSalvaIntestazione
- `9641` — apriRichiestaAnalisi
- `9661` — _richModaleHtml
- `9737` — _richEsc
- `9739` — _richMotivoCambia
- `9745` — _richToggleSez
- `9751` — _richAggiornaConteggi
- `9759` — _richMotivoCorrente
- `9769` — _richSelezione
- `9784` — _richTxt
- `9790` — _richCostruisciPDF
- `8969` — nuovaPagina
- `8970` — spazio
- `9886` — _richNomeFile
- `9891` — _richPrepara
- `9904` — _richRegistra
- `9909` — _richStato
- `9911` — richScaricaPDF
- `9960` — _richUpload
- `9962` — _richWaUrl
- `9969` — _richTestoWa
- `9983` — richInviaWhatsApp
- `10023` — richCopiaLink
- `10044` — _richStoricoHtml

---
### REFERTI DEL SANGUE DATATI — storico nel tempo (P118 tappa 1)
Righe 9194-9387 — migrazione, ordinamento, quadro attuale derivato, barra di selezione.

- `11144` — _refertoNuovoId
- `11147` — _refertoOggi
- `11151` — _refertoDataIt
- `11157` — _refertoConteggio
- `11171` — _refertiMigra
- `11198` — _refertiOrdinati
- `11209` — _refertoPiuRecente
- `11214` — _refertoInVista
- `11232` — _refertiApplica
- `11245` — _refertoCrea
- `11264` — refertoCambiaVista
- `11270` — refertoCambiaData
- `11282` — refertoNuovo
- `11290` — refertoDuplica
- `11299` — refertoElimina
- `11314` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `10757` — _rangeNum
- `10763` — _rangeTestoDa
- `10782` — _rangeCoppia
- `10792` — _rangeHtml

---
### ANDAMENTO NEL TEMPO — tracciato, variazione, grafico grande (P118 tappa 3)
Righe 9441-9745 — serie storica, regola del colore, sparkline, pannello in fondo.

- `10834` — _andLimiti
- `10855` — _andParseRangeLab
- `10868` — _andDistanza
- `10875` — _andValutazione
- `10888` — _andSerie
- `10902` — _andNum
- `10906` — _andDataBreve
- `10911` — _andMeseAnno
- `10919` — _andDominio
- `10933` — _andColore
- `10946` — _andSparkHtml
- `10972` — _andRigaHtml
- `10994` — _andEsamiSeguibili
- `11002` — andScegliEsame
- `11008` — _andPannelloHtml
- `11061` — _andGraficoGrande
- `11112` — _andPasso

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 12552-13900

- `12552` — _ibFmtBreve
- `12561` — _renderPesiIntermediSection
- `12610` — aggiungiPesoIntermedio
- `12626` — eliminaPesoIntermedio
- `12636` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `13900` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 14208-14208

- `14208` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 14586-17127

- `14586` — aggiornaLabelMacros
- `14604` — calcolaMacros
- `14745` — applicaSchema
- `14780` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `14786` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `14808` — _misuraDaReferto *(P127 — UN referto letto con le regole del traguardo: usata anche dalla verifica al controllo)*
- `14841` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `14852` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `14870` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `14983` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `14997` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `15053` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `15067` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `15099` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `15132` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `15174` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `15182` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `15193` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `15220` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `15235` — _stradeVerso *(le strade complete + percentuale libera)*
- `15282` — _VC_TOLLERANZA_PCT / _VC_GIORNI_MIN / _VC_GIORNI_MIN_RITARO / _VC_COPERTURA_MIN_PCT / _VC_MAGRA_PRUDENZA_GG *(P127 — soglie cliniche della verifica)*
- `15292` — _mediaSlotPrescritta *(media pesata sui giorni di un campo dello storico target; la usa anche _kcalMediaPrescrittaOss)*
- `15312` — _vcDeficitSlot *(deficit di uno slot: campo offset o kcal−tdee per gli slot vecchi)*
- `15320` — _vcTratto *(P127 — cosa è cambiato fra due referti, previsto vs reale, TDEE misurato)*
- `15374` — _vcTraguardoSalvato *(traguardo ricostruito dal salvato, per la scheda Percorso)*
- `15384` — _verificaControllo *(P127 — motore puro: tratto recente, quadro dall'inizio, residuo al ritmo reale)*
- `15422` — _verificaControlloHtml *(blocco 🔎, unica fonte per pannello 🎯 e scheda Percorso; azioni solo dove c'è il campo kcal)*
- `15514` — _vcRitara *(scrive le kcal ritarate nel campo regime: propone, non salva)*
- `15527` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `15595` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `15617` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `15670` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `15777` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `15792` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `15817` — _renderRifPesoBox
- `15868` — _usaRifPeso
- `15872` — _aggiornaRifPesoTarget
- `15875` — _aggiornaRegimeSlider
- `16532` — _presetRegime
- `16536` — _initRegimeSliderDaPaziente
- `16554` — ricalcolaLAF
- `16688` — renderStoricoTDEE
- `16722` — attivaSlotTDEE
- `16730` — eliminaSlotTDEE
- `16743` — _toggleCiclizzazione
- `16749` — _aggiornaAnteprimaCiclizzazione
- `16767` — salvaCalcoloMacros
- `16881` — _metAllenamento
- `16897` — _neatFrazione
- `16971` — _larnLafStileVita
- `16988` — _regimeOffset
- `16998` — _componiRegimeText
- `17031` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `17043` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `17050` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `17127` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 17145-17575

- `17145` — renderTargetBadge
- `17174` — verificaRegola_75_20_5
- `17211` — renderBadge75_20_5
- `17276` — _validaNorm
- `17279` — _validaMatchTermine
- `17287` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `17338` — _validaTesto
- `17359` — validaPiano
- `17433` — _validaFirmaBlocchi
- `17440` — renderBadgeValidatore
- `17471` — _validaVaiAlGiorno
- `17480` — apriPannelloValidatore
- `13472` — esc
- `17537` — _validaEseguiOverride
- `17560` — validaGateExport
- `17575` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 17708-18340

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
- `17708` — pianoPazSelezionato
- `17855` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `18093` — renderPanelMacrosGiorno
- `18236` — pmgCambiaGrammi
- `18263` — riapriPiano
- `18301` — _montaPianoCorrente
- `18340` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 18350-18819

- `18350` — pullTemplateSupabase
- `18361` — delTemplateSupabase
- `18370` — _promptTemplateNome
- `18395` — _creaTemplateDaJSON
- `18418` — salvaComeTemplate
- `18429` — salvaComeTemplateDaPiano
- `18438` — _normNomeAlim
- `18439` — _escRegAlim
- `18440` — _raccogliAlimentiDaPiano
- `18451` — _alimentiEsclusiPaziente
- `18463` — _trovaConflittiTemplate
- `18481` — _mostraAvvisoConflitti
- `18505` — applicaTemplate
- `18523` — apriPickerTemplate
- `18551` — _pickPaziente
- `18570` — applicaTemplatePick
- `18574` — rinominaTemplate
- `18585` — eliminaTemplate
- `18595` — renderLibreriaTemplate
- `18624` — renderStoricoPiani
- `18683` — eliminaPiano
- `18699` — _getActiveMacrosTarget
- `18723` — getTargetAttivi
- `18760` — calcolaTargetsCiclizzazione
- `18786` — _setupPianoTargets
- `18810` — getStagioneCorrente
- `18819` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 19281-19281

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `19281` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 19290-19749

- `19290` — aggiornaUIcolazione
- `19300` — salvaRegolePiano
- `19361` — _isModelloSistema
- `19364` — _isModelloSistemaModificato
- `19376` — caricaModelliCustomLocal
- `19390` — salvaModelliCustomLocal
- `19411` — _migraRecordCustom
- `19426` — _syncAliasLegacy
- `19435` — caricaAlimentiCustom
- `19459` — pushAlimentiCustomSupabase
- `19469` — pullAlimentiCustomSupabase
- `19483` — pushModelliSupabase
- `19501` — pullModelliSupabase
- `19526` — _calcolaFreqDaModello
- `19545` — aggiornaUImodello
- `19634` — popolaDropdownModelli
- `19662` — cambiaModelloRotazione
- `19668` — ripristinaModelloOriginale
- `19691` — eliminaModelloCustom
- `19709` — mostraAnteprimaModello
- `19719` — apriEditorModello
- `19749` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 20018-20256

- `15738` — rerender
- `20018` — _salvaModelloDaEditor
- `20060` — caricaRegolePiano
- `20090` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `20125` — _aiLogUsage
- `20147` — _aiProxyUrl
- `20153` — _aiTokenPerProxy
- `20182` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `20256` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 20335-20475

- `16216` — _risolviCollisioniCelle
- `20335` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `20395` — getFruttaStile
- `20402` — _fruttaGetPasto
- `20412` — _fruttaContaRigheRicetta
- `20416` — _fruttaIndiceBasePasto
- `20436` — getFruttaMarker
- `20449` — fruttaMarkerHtml
- `20457` — _fruttaCheckboxHtml
- `20466` — toggleFrutta
- `20475` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 20511-21785

- `20511` — _renderCelleGriglia
- `20591` — _renderRicetteTestuali
- `20630` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `20701` — _renderCelleHtml
- `20709` — toggleCellaMenu
- `20728` — closeAllCellaMenus
- `20736` — _trovaPasto
- `20744` — cellaSposta
- `20798` — cellaCancella
- `20819` — apriEditGrammatura
- `16789` — salva
- `20867` — cellaSwap
- `20887` — cellaRimuoviAlt
- `20901` — cellaAggiungiAlt
- `21004` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `21089` — apriEditRicetta
- `21098` — aggiungiRicetta
- `21114` — rimuoviRicetta
- `21123` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `21285` — ngAggiungiSpuntinoVuoto
- `21301` — apriAggiungiCella
- `17254` — risolviCompatibili
- `21397` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `21489` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `21630` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `21785` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 21833-22225

- `21833` — _attesoStrutturaPiano
- `21853` — _confrontaStrutturaPiano
- `21883` — _costruisciPromptDelta
- `21910` — _pianoToolSchema
- `21985` — _pianoMaxTokens
- `21994` — _estraiPianoDaRisposta
- `22016` — chiamaGeneraPiano
- `22183` — mostraLoadingSteps
- `18123` — render
- `22225` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 22292-22869

- `22292` — generaMessaggioAI
- `22397` — copiaMessaggioAI
- `22407` — salvaInStorico
- `22419` — salvaVarianteAI
- `22434` — renderVariantiSalvate
- `22453` — usaVariante
- `22471` — eliminaVariante
- `22482` — renderStoricoMsg
- `22498` — apriWhatsApp
- `22869` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 23047-24544

- `23047` — _ngColoreSemaforoNome
- `23055` — apriSceltaModalitaPiano
- `23090` — _ngChiudiModalita
- `23093` — _ngCostruisciGiornoVuoto
- `23126` — _ngCostruisciGiornoSpeciale
- `23137` — _ngIndiceInizioSpeciali
- `23148` — _ngModalitaNomeGiorno
- `23154` — _ngImpostaModalitaNomeGiorno
- `23157` — _ngLettera
- `23164` — _ngEtichettaGiorno
- `23184` — _ngEtichettaGiornoBreve
- `23198` — _ngToggleGiornoSpeciale
- `23222` — _ngRenderPannelloSpeciale
- `23290` — _generaGiornoSpecialeAI
- `23390` — _ngGiornoHaContenuto
- `23402` — _ngCreaPianoManuale
- `23425` — _ngScrollTabGiorni
- `23435` — _ngAbilitaDragScroll
- `23472` — _ngCambiaNumeroGiorni
- `23504` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `23518` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `23559` — _ngToggleCat
- `23568` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `23592` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `23748` — _ngSalvaPianoManuale
- `23774` — _ngParseIngrediente
- `23798` — _ngScomponiIngredienti
- `23810` — _ricCalcolaMacroDaIngredienti
- `23828` — _ricRicalcolaMacroLive
- `23835` — _ricAggiornaInfoMacro
- `23849` — _ricRicalcolaMacroLiveNow
- `23873` — _ngTrovaCategoriaAlimento
- `23906` — _ngPescaRicetta
- `23949` — _ngScomponiRicettaNelPasto
- `23986` — _ngDragStart
- `23997` — _ngDragStartCella
- `24008` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `24015` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `24020` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `24039` — _ngAggiungiAlimento
- `24064` — _ngRimuoviAlimento
- `24078` — _ngDopoModifica
- `24096` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `24149` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `24178` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `24195` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `24203` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `24275` — gramTestoCasalingo
- `24301` — _appendToggleNutrizionali
- `24344` — _appendTogglePromemoria
- `24373` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `24519` — cpFromEmoji
- `24525` — getEmojiCp
- `24544` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `22519` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `22541` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `22546` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `22572` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `22660` — _spesaTestoWhatsApp
- `22676` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `22721` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `22744` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `22772` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `22832` — scaricaListaSpesaPDF (download diretto, un click)
- `22840` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `22852` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 25692-25692

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
- `25692` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 25704-25916

- `25704` — salvaInbody
- `25774` — delInbody
- `25781` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `25916` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 25944-26413

- `25944` — buildSemLegenda
- `25958` — renderAlEditor
- `26019` — _alimNomeRegex
- `26027` — _alimGiorniDaPiano
- `26035` — _scanGiorniPerNome
- `26050` — scanRiferimentiAlimento
- `26079` — _alimRefsRighe
- `26085` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `26173` — modificaAlimentoCustom
- `26193` — ripristinaValoriPrecedentiAlimento
- `26205` — _resetAlimModal
- `26216` — apriNuovoAlimentoCustom
- `26222` — salvaAlimentoCustom
- `26289` — eliminaAlimentoCustom
- `26320` — _alimFonteBadge
- `26325` — renderAlimentiPage
- `22217` — E
- `26395` — archiviaAlimentoCustom
- `26413` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 26440-26867

- `26440` — _bcSetStatus
- `26442` — apriScannerBarcode
- `26450` — chiudiScannerBarcode
- `26455` — _bcStopCamera
- `26463` — _bcModaleAperto
- `26465` — _bcAvviaCamera
- `26476` — _bcAvviaNativo
- `26496` — _bcAvviaZXing
- `26505` — _bcZXStart
- `26516` — _bcErroreCamera
- `26524` — cercaBarcodeManuale
- `26530` — _barcodeTrovato
- `26546` — cercaBarcodeOFF
- `26564` — _bcProdottoNonTrovato
- `26578` — _bcPrecompilaForm
- `22477` — num
- `26602` — togAl
- `26655` — selCatAl
- `25402` — selTuttiAl
- `26699` — _appIdAnag  (P140 T1)
- `26709` — _appSyncPaz  (P140 T1)
- `26753` — _appSpecchioInverso  (P140 T2)
- `26779` — _appRitiraSpecchio  (P140 T2)
- `26810` — _appAncoraTappe  (P140 T2)
- `26829` — _appTappe  (P140 T2)
- `26850` — _appMigraPaziente  (P140 T1)
- `26860` — _appMigraTutti  (P140 T1)
- `26867` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 26883-27350

- `26883` — setCalView
- `26893` — calPrev
- `26894` — calNext
- `26895` — calToday
- `26897` — renderCal
- `26911` — renderCalMonth
- `26938` — renderCalWeek
- `26971` — renderCalDay
- `27022` — selGiorno
- `27036` — setDisp
- `27041` — openAddEvento
- `27054` — openAddEventoPaz
- `27060` — toggleEntrataCheck
- `27065` — salvaEvento
- `27107` — _evTestoPromemoria  (P140 T1)
- `27113` — openEvDetail
- `27168` — delEvento
- `27190` — copyMsg
- `27202` — aggDateCal
- `27020` — syncInizio
- `27021` — syncControllo
- `27215` — aggiornaPrev
- `27240` — apriEventoDaScheda  (P140 T2)
- `27254` — _appAggiornaOreScheda  (P140 T2)
- `27271` — renderRic
- `27298` — openNuovaRic
- `27299` — editRic
- `27309` — salvaRic
- `27334` — delRic
- `27350` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 27436-27496

- `27436` — aggiungiEntrataPerPaziente
- `27453` — openNuovaEntrata
- `27467` — salvaEntrata
- `27488` — delEntrata
- `27496` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 27526-27996

- `27526` — aiSuggerisciRicetta
- `27571` — renderConcettiModal
- `27590` — apriConcettiModal
- `27617` — salvaConcettiAllegati
- `27641` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `27679` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `27688` — loadInbodyPDF
- `27806` — _vitdLabel
- `27810` — getIntegratori
- `27814` — getIntegraWant
- `27818` — setIntegratori
- `27835` — setIntegraWant
- `27873` — getPatologieChip
- `27874` — getAllergieChip
- `27875` — setPatologieChip
- `27876` — setAllergieChip
- `27877` — getPatologie
- `27878` — getAllergie
- `27879` — setPatologieFromStr
- `27886` — setAllergieFromStr
- `27899` — getSdvChip
- `27900` — getCspChip
- `27901` — setSdvChip
- `27902` — setCspChip
- `27903` — setSdvFromStr
- `27904` — setCspFromStr
- `27908` — getBudget
- `27909` — setBudget
- `27914` — renderCalAnno
- `27945` — comprimeImmagine
- `27967` — uploadImmagineConcetto
- `27986` — rimuoviImmagineConcetto
- `27996` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 28062-28146

- `28062` — entraSelConcetti
- `28063` — annullaSelConcetti
- `28064` — toggleConcettoSel
- `28069` — eliminaConcettiSelezionati
- `28088` — confermaEliminaConcetti
- `28103` — aiRiscriviConcetto
- `28117` — editConcetto
- `28135` — salvaConcetto
- `28146` — openNuovoConcetto
- `27519` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 28183-28183

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
- `28183` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 28295-28620

- `28295` — renderScadenzeAlert
- `28555` — _scadGestiti  (P144)
- `28565` — _scadPota  (P144)
- `28580` — _scadMigraDaLocalStorage  (P144)
- `28603` — segnaGestito
- `28620` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 28629-28704

- `28629` — ripristinaPaz
- `28637` — eliminaPaz
- `28682` — getDove
- `28686` — setDove
- `28704` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 28709-29147

- `28709` — getCredenzialiPersistenti
- `28722` — cancellaCredenzialiPersistenti
- `28727` — rinnovaSessioneConRefreshToken
- `28744` — getSessioneSalvata
- `28763` — salvaSessione
- `28773` — cancellaSessione
- `28777` — eseguiLogin
- `28824` — eseguiLogout
- `28846` — mostraApp
- `28851` — verificaSessioneEAvvia
- `28879` — assicuraTokenValido
- `28908` — _garantiscoSessionePerSync
- `28920` — avviaRinnovoTokenPeriodico
- `28924` — fermaRinnovoTokenPeriodico
- `28933` — _authReset
- `28938` — _authMostra
- `28941` — mostraLogin
- `28942` — mostraRegistrazione
- `28943` — mostraRecupero
- `28944` — mostraNuovaPassword
- `28947` — eseguiRegistrazione
- `28985` — eseguiRecuperoPassword
- `29014` — eseguiNuovaPassword
- `29048` — _parseHashParams
- `29055` — _pulisciHash
- `29059` — gestisciRitornoAuth
- `29147` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 29219-29342

- `29219` — apriPannelloRicette
- `29248` — chiudiPannelloRicette
- `29256` — applicaRicettaPasto
- `29292` — inizializzaP2
- `29304` — deepClone
- `29308` — applicaPatch
- `29342` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
