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
Righe 2421-2463

- `2421` — _slugAlimento
- `2429` — _catalogoIndicizza
- `2433` — _catalogoDeindicizza
- `2440` — costruisciCatalogo
- `2463` — risolviAlimento

---

### MACROS PIANO — calcolo e badge macro reali vs target
Righe 2478-2754

- `2478` — getValoriCREA
- `2490` — getCurrentPaziente
- `2525` — getKcalWeekend
- `2580` — getMacrosRicettaComposta
- `2586` — calcolaMacrosPiano
- `2688` — renderBadgeMacrosReali
- `2611` — pctStr
- `2612` — color
- `2625` — row
- `2754` — renderBadgeMacrosReali_DOM

---

### ANALISI DEL SANGUE — parsing, indici clinici derivati, interpretazione
Righe 3039-3226

- `3039` — _parseAnalisiNum
- `3047` — calcolaIndice
- `3200` — interpretaAnalisi
- `3212` — _interpAnalisiHtml
- `3226` — mostraInfoRange

---

### CONCETTI EDUCATIVI — sync Supabase, migrazione
Righe 3373-3397

- `3373` — pushConcetiSupabase
- `3383` — pullConcetiSupabase
- `3397` — migraConcetti

---

### ALIMENTI — categorie funzionali/semaforo, chip UI, equivalenze porzioni
Righe 3587-3942

- `3587` — getCategoriaSemaforo
- `3604` — _getCategorieGruppo
- `3618` — calcolaGrammaturaEquivalente
- `3658` — _gruppoEquiv  (P121: gruppo di equivalenza + criterio per categoria funzionale)
- `3664` — _porzioneStandard  (P121: porzione `g` di database dell'alimento)
- `3679` — suggerisciGrEquivalente  (P121: firma a 3 argomenti, il gruppo si deduce dai due alimenti)
- `3705` — _etichettaCriterio  (P121: ≈carbo / ≈prot / ≈grassi / fissa / porzione)
- `3720` — _promptAlternativeGrassi  (P121: riga del prompt AI generata dal motore)
- `3736` — ricalcolaAlternative  (P121: MOTORE UNICO, unico punto che scrive la grammatura di un'alternativa)
- `3755` — ricalcolaAlternativePiano  (P121: applica il motore a tutte le celle di un piano)
- `3804` — arrotondaGrammatura  (P121: sostituisce arrotondaPorzioneDiscreta — pezzi interi senza tetto / 5g)
- `3814` — getCategoriaFunzionale
- `3854` — catArr
- `3870` — _tagComuniTrova
- `3874` — getTagComuniChip
- `3877` — setTagComuniChip
- `3885` — setCatChips
- `3898` — getStagioniChip
- `3901` — setStagioniChip
- `3908` — getProfiloChip
- `3911` — setProfiloChip
- `3920` — wireChipGroup
- `3931` — wireAttrChipGroups
- `3942` — wireRadioChipGroup

---

### CONFIG / STORAGE LOCALE — cfg, localStorage db, util data/valuta
Righe 3970-4386

- `3970` — getCfg
- `3971` — saveCfgL
- `3972` — getUrl
- `3973` — saveLocal
- `3974` — loadLocal
- `3986` — uid
- `4004` — ymdLoc  (P141)
- `4009` — today
- `4017` — addDays
- `4025` — fData
- `4026` — fEur
- `4028` — getLastSyncText
- `4038` — getSyncColor
- `4045` — aggiornaStatoSync
- `4071` — setSyncStatus
- `4340` — _registraTombstone
- `4348` — _tombstoneAttivi
- `4360` — _fondiTombstones
- `4374` — _mergeTombstonesRemoti *(dal 24/7 legge il meta da `collections`, P74 1d)*
- `4386` — _applicaTombstones
- `4247` — _pazFetchMeta *(P74 1d — solo `collections`)*
- `4268` — _collectionsUpsert *(P74 — scrittura primaria dei 4 meta-record dal cutover 1d)*
- `4290` — _collectionsFetch *(P74 1d — lettura unica dei meta-record)*
- `4313` — _analisiSangueUpsert *(P74 fase 2 — scrittura ombra analisi del sangue, 24/7)*

---

### SYNC SUPABASE — push/pull ricette/pazienti, tombstones, conflitti (P69)
Righe 4410-4795

- `4410` — supaHeaders
- `4424` — pushRicetteSupabase
- `4449` — pullRicetteSupabase
- `4471` — delRicetteSupabase
- `4483` — delPazienteSupabase
- `4498` — pushToSheets
- `4542` — pullFromSheets
- `4621` — syncNow
- `4634` — sincronizzaTutto
- `4360` — stpSet
- `4365` — stpMsg
- `4765` — testConnSupabase
- `4795` — _p68LogSaveAnonimo

---

### SYNC SUPABASE — save paziente, piani/cache piano, entrate, eventi
Righe 4809-5331

- `4809` — save
- `4827` — _pushRigaPerId
- `4860` — _flushDirtyIds
- `4943` — _p69LoadBaseline
- `4946` — _p69StoreBaseline
- `4949` — _p69SetBaseline
- `4953` — _p69DropBaseline
- `4957` — _p69SetBaselineFromRows
- `4963` — _p69NomePaz
- `4968` — _p69InList
- `4976` — _p69RilevaConflitti
- `5012` — _p69DialogoConflitti
- `4738` — chiudi
- `5046` — _p69RisolviRicarica
- `5075` — _p69EsportaLocali
- `5088` — _p69RisolviSovrascrivi
- `5101` — pushPianoSupabase
- `5123` — pullPianiSupabase
- `5139` — delPianoSupabase
- `5155` — delPianiPazienteSupabase
- `5167` — pushCachePianoSupabase
- `5184` — caricaCachePianoSupabase
- `5206` — pushEntrateSupabase
- `5230` — pullEntrateSupabase
- `5244` — delEntrataSupabase
- `5252` — pushEntrataSupabase
- `5263` — pushEventoSupabase
- `5276` — pushEventiSupabase
- `5300` — pullEventiSupabase
- `5320` — delEventoSupabase
- `5331` — _pianoCacheKey

---

### UI GENERALE — config AI key, notifiche, navigazione (goTo/tab/modali)
Righe 5362-5473

- `5362` — _salvaPianoCache
- `5367` — _caricaPianoCache
- `5373` — salvaCfg
- `5374` — testConn
- `5381` — testaAntKey
- `5392` — initAntCard
- `5395` — esporta
- `5396` — importa
- `5401` — goTo
- `5417` — closeM
- `5425` — ngChiudiModale
- `5434` — ngChiudiPopupCoppia
- `5438` — ngAggiungiX
- `5449` — ngUpgradeModali
- `5469` — mTab
- `5470` — aggiornaEta
- `5471` — toggleOrarioNote
- `5472` — pdTab
- `5473` — notif

---

### PAZIENTI — registro: lista/card/kanban, apertura, editing, salvataggio, routine
Righe 5481-8355

- `5481` — getPazView
- `5482` — setPazView
- `5491` — _pazStatoPiano
- `5499` — _pazUrgenzaControllo
- `5514` — _pazBadgePrenotato  (P142)
- `5521` — pazSegnaArrivato  (P142)
- `5527` — _pazStatoTagHtml
- `5544` — _pazAggiornaFiltroRegimi
- `5552` — renderPaz
- `5610` — _renderPazCard
- `5635` — _renderPazLista
- `5662` — _renderPazKanban
- `5700` — openNuovoPaz
- `5727` — editPaz
- `5807` — REGOLE_SEMAFORO_ALIMENTI *(15 condizioni cliniche → grigi/celesti; globale dal 26/7 per essere verificabile dal test)*
- `6254` — _SEM_COLORI_LEGACY / `6105` _SEM_COLORI_AUTO *(F9 — unico vocabolario dei colori automatici)*
- `6259` — NOMI_CONDIZIONE_SEMAFORO *(etichette delle 15 condizioni, usate anche dal riquadro della scheda)*
- `6281` — _semaforoCondizioniAttive *(le condizioni spuntate su un paziente)*
- `6292` — _semaforoMigraPaziente *(F9 — toglie i colori legacy e ricalcola; idempotente)*
- `6303` — _semaforoMigraTutti *(passata su tutti i pazienti in memoria, con conteggio)*
- `6314` — applicaRegoloSemaforo *(dal 26/7 pulisce TUTTI e sei i colori automatici, non solo i suoi due)*
- `6402` — trovaChiaveAlimento *(match esatto sul nome: se non trova, la regola è ignorata in silenzio — vedi test s2-regole-nomi-alimenti)*
- `6426` — _pazNumOPrec *(F7 — campo assente = valore precedente, non azzeramento)*
- `6438` — _pazPreservaCampi *(F5 — l'anagrafica non cancella i campi che il form non gestisce)*
- `6444` — salvaPaz
- `6594` — openPaz
- `8042` — renderPdRoutine
- `6723` — cardHTML
- `8184` — updateRoutineCampo
- `8192` — suggerisciPastoEQuando
- `8219` — filtroLibreria
- `8228` — renderLibreriaGrid
- `8249` — aggiungiDaLibreriaIdx
- `8273` — openModalRoutine
- `8280` — salvaRoutineVoce
- `8305` — salvaRoutine
- `8312` — mostraRoutinePopup
- `8340` — removeRoutineVoce
- `8355` — _renderAggiustamentiSection

---

### 📈 PERCORSO — timeline di periodizzazione (P115 Tappe 1-5 COMPLETE, 24 lug 2026)
Righe 6021-6621 (numeri ESATTI al 24/7 notte, dopo la Tappa 5). ⚠️ Questo blocco (~600 righe) fa slittare tutti i numeri delle sezioni SUCCESSIVE a riga ~6020 rispetto all'ultima rigenerazione completa: per quelle sezioni fare grep di conferma. Rigenerazione completa alla prossima modifica strutturale.

- `6640` — _PERCORSO_TIPI (const: tipi fase, colori, pct default)
- `6647` — _percorsoGet *(normalizza p.percorso, scarta fasi invalide)*
- `6671` — _percorsoIntervalli *(fasi consecutive → date concrete dal/al)*
- `6685` — _percorsoFaseAt *(fase attiva a una data; dal incluso, al escluso)*
- `6694` — _percorsoKcalFase *(pct → kcal indicative via calcolaTDEE)*
- `6717` — _percorsoProiezione *(Tappa 2 — proiezione ibrida teorica/calibrata, cono, obiettivo a intervallo)*
- `6775` — _percorsoDataBreve *(ISO → "12 set")*
- `6792` — _percorsoSerieEnergia *(Tappa 3 — serie introito/TDEE stimato/TDEE osservato per la corsia energia)*
- `6831` — _percorsoSerieMassaMagra *(Tappa 4 — solo InBody: punti {data,m,pg})*
- `6850` — _percorsoConsuntivo *(Tappa 5 — legge p.consuntivo scritto da P50: aderenza, extra kcal, ritardo=extra÷7700, settimane perse; oggi sempre ok:false)*
- `6892` — _PERCORSO_LAYERS_DEFAULT / _percorsoLayersState / _percorsoLayersGet *(Tappa 4 — stato interruttori, SOLO sessione, mai su p)*
- `6897` — percorsoLayerToggle *(Tappa 4 — inverte un solo strato)*
- `6903` — percorsoVistaPreset *(Tappa 4 — preset "tecnica"/"paziente")*
- `6919` — _percorsoPaz *(e a seguire i mutatori percorsoInit/SetInizio/AddFase/UpdFase/DelFase/MoveFase)*
- `6975` — _PERCORSO_MODELLI / _PERCORSO_GEN *(P122 T3 — 4 modelli + regole dei cicli)*
- `6993` — _percorsoGeneraFasi *(P122 T3 — pura: dal traguardo alle fasi, ritmo = quello della proiezione)*
- `7073` — _percorsoModelloSelectHtml
- `7082` — percorsoGeneraDaModello *(propone; conferma prima di sostituire fasi esistenti)*
- `7105` — _percorsoShiftGiorni *(pura: ancora = ultima pesata)*
- `7115` — percorsoRiallinea *(⏩ trasla il piano, riprende dal giorno-fase dell'interruzione)*
- `7142` — _TRG_TIPI / `6744` _TRG_COMPORTAMENTI *(P122 T4 — tipi di traguardo e libreria comportamenti)*
- `7164` — _traguardiGet · `6761` _traguardoValoreAttuale *(valore corrente dai dati esistenti, null se manca)*
- `7203` — _traguardoVerso *(auto: dedotto dalla partenza)* · `6803` _traguardoValuta · `6824` _traguardiValuta
- `7244` — traguardoAdd · `6852` traguardoUpd · `6867` traguardoDel · `6873` traguardoSegna
- `7302` — _COND_TIPI · `6897` _percorsoCondizione *(pura: la fase finisce per soglia — SOLO suggerimento)*
- `7318` — percorsoSetCondizione · `6927` percorsoChiudiFase *(esito fotografato, riapribile)*
- `7352` — _traguardiHtml *(blocco 🏁 in fondo alla scheda Percorso)*
- `7450` — _percorsoVistaPaz / `7049` _percorsoVistaPazAttiva *(P122 T5 — modalità di sessione)*
- `7457` — _percorsoVittorie *(pura: vittorie dall'inizio del percorso + flag ricomposizione)*
- `7495` — _percorsoNascondiPeso *(in fase di massa il peso non si mostra al paziente)*
- `7506` — _traguardoFaseCorrente *(traguardo della fase IN CORSO, non quello lontano)*
- `7534` — _traguardoTestoPaziente *(righe in italiano semplice, riusate dal messaggio WhatsApp)*
- `7567` — _vistaPazienteHtml *(i tre riquadri che guarda il paziente)*
- `7647` — _percorsoChartSvg *(due corsie: peso + massa magra + cono proiezione sopra, striscia aderenza in mezzo (solo con dati P50), energia (kcal) sotto — tutto gated dagli interruttori)*
- `7836` — renderPdPercorso *(scheda: badge fase, riga proiezione/obiettivo, riga Piano vs Realtà (solo con dati), toolbar interruttori, grafico, editor)*

*(Tappa 2 tocca anche `calcolaMacros`: box obiettivo con intervallo al posto della data secca.)*

---

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 8440-8611

- `8440` — salvaAggiustamento
- `8473` — eliminaAggiustamento
- `8482` — renderPdNote
- `8517` — salvaNotaClinica
- `8532` — deleteNota
- `8541` — saveNote
- `8561` — resetSemaforoAuto *(F9 — pulsante 🔄 Ricalcola: pulisce gli automatici e rifà col sistema valido; il motore LEGACY non esiste più)*
- `8611` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 8852-9050

- `8852` — avviaFX
- `8880` — avviaAnalisi
- `8897` — _renderFlussoPanel
- `8941` — _riepEsc
- `8945` — _riepNum
- `8951` — _riepDelta
- `8959` — _riepDataSig
- `8977` — _riepParseFX
- `8087` — clean
- `8991` — _riepAggiornaFX
- `9017` — _riepToggleDomandaDefault
- `9029` — _riepAddDomanda
- `9042` — _riepRemoveDomanda
- `9050` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 9262-9505

- `8218` — dCol
- `8336` — card
- `9262` — renderPdRagionamento
- `9350` — inviaMessaggioRag
- `9368` — concludiERiassumi
- `9382` — salvaRagionamento
- `9403` — apriGeneratoreDaRag
- `9411` — nuovaSessioneRag
- `9417` — cancellaSavedRag
- `9427` — renderPazTimeline
- `9464` — renderPdAnamnesi
- `9505` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 11453-12588

- `11453` — _anNorm *(P125 — testo confrontabile: minuscole, niente accenti)*
- `11459` — _anCorrisponde *(P125 — ricerca per parole-prefisso: "vit d" trova "Vitamina D")*
- `11465` — filtraAnalisi *(P125 — filtro dal vivo delle 119 voci)*
- `11499` — pulisciRicercaAnalisi
- `11505` — renderPdAnalisi
- `11561` — toggleAnalisiSection
- `11710` — loadAnalisiSanguePDF
- `11597` — _impPdfConfigurata
- `11598` — _impPdfLib
- `11608` — _impPdfApri
- `11621` — _impPdfPagina *(P124b — una pagina del PDF → immagine, con la rotazione RILEVATA, non quella dichiarata dal file)*
- `11642` — _impRuotaImmagine
- `11667` — _impRilevaRotazione *(P124b — chiamata piccola: di quanti gradi va girata la pagina)*
- `11686` — _impPromptPagina *(P124b — prompt di UNA pagina, con l'impronta della riga: valore+unità+riferimento)*
- `11885` — _impNormalizzaNumero *(P124 — numero all'italiana → punto decimale, conversione fatta dall'app e non dall'AI)*
- `11896` — _impNumeri
- `11904` — _impSembraIntervallo
- `11912` — _impUgualeAlRange
- `11921` — _impLimitiStd
- `11942` — _impFuoriScala
- `11951` — _impCorrezioneVirgola
- `11963` — _impTestoLimiti
- `11984` — _impRifPlausibile *(P124b — un "riferimento" che è un'unità di misura = riga disallineata)*
- `11997` — _impUnitaCanonica
- `12019` — _impStessaGrandezza *(P124b — stesso tipo di misura a meno del prefisso: nanomoli/micromoli/millimoli)*
- `12036` — _impUnitaCompatibili
- `12047` — _impControllaValore *(P124 — i controlli anti-errore su un valore estratto)*
- `12111` — mostraDiffAnalisi *(P124 — colonna Estratto modificabile + righe sospette deselezionate)*
- `12301` — _calcoloIncluso
- `12307` — toggleCalcoloIncluso
- `12329` — _renderCalcoliPannello
- `12370` — toggleGlossario
- `12375` — updateAnalisi
- `12434` — salvaAnalisi
- `12447` — applicaGruppoClinico
- `12476` — renderBoxGruppiCliniciSuggeriti
- `12508` — suggerisciGruppiClinici
- `12588` — renderMemoriaInbody

---
### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9176 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `9635` — _richVal
- `9642` — _richBmi
- `9647` — _richPat
- `9653` — _richNum
- `9698` — _richPreselezione
- `9714` — richLeggiIntestazione
- `9718` — richSalvaIntestazione
- `9727` — apriRichiestaAnalisi
- `9747` — _richModaleHtml
- `9823` — _richEsc
- `9825` — _richMotivoCambia
- `9831` — _richToggleSez
- `9837` — _richAggiornaConteggi
- `9845` — _richMotivoCorrente
- `9855` — _richSelezione
- `9870` — _richTxt
- `9876` — _richCostruisciPDF
- `8969` — nuovaPagina
- `8970` — spazio
- `9972` — _richNomeFile
- `9977` — _richPrepara
- `9990` — _richRegistra
- `9995` — _richStato
- `9997` — richScaricaPDF
- `10046` — _richUpload
- `10048` — _richWaUrl
- `10055` — _richTestoWa
- `10069` — richInviaWhatsApp
- `10109` — richCopiaLink
- `10130` — _richStoricoHtml

---
### REFERTI DEL SANGUE DATATI — storico nel tempo (P118 tappa 1)
Righe 9194-9387 — migrazione, ordinamento, quadro attuale derivato, barra di selezione.

- `11230` — _refertoNuovoId
- `11233` — _refertoOggi
- `11237` — _refertoDataIt
- `11243` — _refertoConteggio
- `11257` — _refertiMigra
- `11284` — _refertiOrdinati
- `11295` — _refertoPiuRecente
- `11300` — _refertoInVista
- `11318` — _refertiApplica
- `11331` — _refertoCrea
- `11350` — refertoCambiaVista
- `11356` — refertoCambiaData
- `11368` — refertoNuovo
- `11376` — refertoDuplica
- `11385` — refertoElimina
- `11400` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `10843` — _rangeNum
- `10849` — _rangeTestoDa
- `10868` — _rangeCoppia
- `10878` — _rangeHtml

---
### ANDAMENTO NEL TEMPO — tracciato, variazione, grafico grande (P118 tappa 3)
Righe 9441-9745 — serie storica, regola del colore, sparkline, pannello in fondo.

- `10920` — _andLimiti
- `10941` — _andParseRangeLab
- `10954` — _andDistanza
- `10961` — _andValutazione
- `10974` — _andSerie
- `10988` — _andNum
- `10992` — _andDataBreve
- `10997` — _andMeseAnno
- `11005` — _andDominio
- `11019` — _andColore
- `11032` — _andSparkHtml
- `11058` — _andRigaHtml
- `11080` — _andEsamiSeguibili
- `11088` — andScegliEsame
- `11094` — _andPannelloHtml
- `11147` — _andGraficoGrande
- `11198` — _andPasso

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 12638-13986

- `12638` — _ibFmtBreve
- `12647` — _renderPesiIntermediSection
- `12696` — aggiungiPesoIntermedio
- `12712` — eliminaPesoIntermedio
- `12722` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `13986` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 14294-14294

- `14294` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 14675-17735

- `14675` — aggiornaLabelMacros
- `14693` — calcolaMacros
- `14834` — applicaSchema
- `14869` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `14875` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `14897` — _misuraDaReferto *(P127 — UN referto letto con le regole del traguardo: usata anche dalla verifica al controllo)*
- `14930` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `14941` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `14959` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `15072` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `15086` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `15142` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `15156` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `15188` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `15221` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `15263` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `15271` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `15282` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `15309` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `15324` — _stradeVerso *(le strade complete + percentuale libera)*
- `15371` — _VC_TOLLERANZA_PCT / _VC_GIORNI_MIN / _VC_GIORNI_MIN_RITARO / _VC_COPERTURA_MIN_PCT / _VC_MAGRA_PRUDENZA_GG *(P127 — soglie cliniche della verifica)*
- `15381` — _mediaSlotPrescritta *(media pesata sui giorni di un campo dello storico target; la usa anche _kcalMediaPrescrittaOss)*
- `15401` — _vcDeficitSlot *(deficit di uno slot: campo offset o kcal−tdee per gli slot vecchi)*
- `15409` — _vcTratto *(P127 — cosa è cambiato fra due referti, previsto vs reale, TDEE misurato)*
- `15463` — _vcTraguardoSalvato *(traguardo ricostruito dal salvato, per la scheda Percorso)*
- `15473` — _verificaControllo *(P127 — motore puro: tratto recente, quadro dall'inizio, residuo al ritmo reale)*
- `15511` — _verificaControlloHtml *(blocco 🔎, unica fonte per pannello 🎯 e scheda Percorso; azioni solo dove c'è il campo kcal)*
- `15603` — _vcRitara *(scrive le kcal ritarate nel campo regime: propone, non salva)*
- `15616` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `15684` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `15706` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `15759` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `15866` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `15881` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `15906` — _renderRifPesoBox
- `15957` — _usaRifPeso
- `15961` — _aggiornaRifPesoTarget
- `15964` — _aggiornaRegimeSlider
- `16621` — _presetRegime
- `16625` — _initRegimeSliderDaPaziente
- `16633` — ricalcolaLAF
- `16781` — renderStoricoTDEE
- `16823` — attivaSlotTDEE
- `16840` — eliminaSlotTDEE
- `16853` — _toggleCiclizzazione
- `16859` — _aggiornaAnteprimaCiclizzazione
- `16877` — salvaCalcoloMacros
- `17192` — _metAllenamento
- `17431` — _neatFrazione
- `17550` — _larnLafStileVita
- `17567` — _regimeOffset
- `17577` — _componiRegimeText
- `17610` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `17622` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `17629` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `17735` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 17753-18183

- `17753` — renderTargetBadge
- `17782` — verificaRegola_75_20_5
- `17819` — renderBadge75_20_5
- `17884` — _validaNorm
- `17887` — _validaMatchTermine
- `17895` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `17946` — _validaTesto
- `17967` — validaPiano
- `18041` — _validaFirmaBlocchi
- `18048` — renderBadgeValidatore
- `18079` — _validaVaiAlGiorno
- `18088` — apriPannelloValidatore
- `13472` — esc
- `18145` — _validaEseguiOverride
- `18168` — validaGateExport
- `18183` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 18316-18948

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
- `18316` — pianoPazSelezionato
- `18463` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `18701` — renderPanelMacrosGiorno
- `18844` — pmgCambiaGrammi
- `18871` — riapriPiano
- `18909` — _montaPianoCorrente
- `18948` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 18958-19432

- `18958` — pullTemplateSupabase
- `18969` — delTemplateSupabase
- `18978` — _promptTemplateNome
- `19003` — _creaTemplateDaJSON
- `19026` — salvaComeTemplate
- `19037` — salvaComeTemplateDaPiano
- `19046` — _normNomeAlim
- `19047` — _escRegAlim
- `19048` — _raccogliAlimentiDaPiano
- `19059` — _alimentiEsclusiPaziente
- `19071` — _trovaConflittiTemplate
- `19089` — _mostraAvvisoConflitti
- `19113` — applicaTemplate
- `19131` — apriPickerTemplate
- `19159` — _pickPaziente
- `19183` — applicaTemplatePick
- `19187` — rinominaTemplate
- `19198` — eliminaTemplate
- `19208` — renderLibreriaTemplate
- `19237` — renderStoricoPiani
- `19296` — eliminaPiano
- `19312` — _getActiveMacrosTarget
- `19336` — getTargetAttivi
- `19373` — calcolaTargetsCiclizzazione
- `19399` — _setupPianoTargets
- `19423` — getStagioneCorrente
- `19432` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 19903-19903

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `19903` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 19912-20371

- `19912` — aggiornaUIcolazione
- `19922` — salvaRegolePiano
- `19983` — _isModelloSistema
- `19986` — _isModelloSistemaModificato
- `19998` — caricaModelliCustomLocal
- `20012` — salvaModelliCustomLocal
- `20033` — _migraRecordCustom
- `20048` — _syncAliasLegacy
- `20057` — caricaAlimentiCustom
- `20081` — pushAlimentiCustomSupabase
- `20091` — pullAlimentiCustomSupabase
- `20105` — pushModelliSupabase
- `20123` — pullModelliSupabase
- `20148` — _calcolaFreqDaModello
- `20167` — aggiornaUImodello
- `20256` — popolaDropdownModelli
- `20284` — cambiaModelloRotazione
- `20290` — ripristinaModelloOriginale
- `20313` — eliminaModelloCustom
- `20331` — mostraAnteprimaModello
- `20341` — apriEditorModello
- `20371` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 20640-20878

- `15738` — rerender
- `20640` — _salvaModelloDaEditor
- `20682` — caricaRegolePiano
- `20712` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `20747` — _aiLogUsage
- `20769` — _aiProxyUrl
- `20775` — _aiTokenPerProxy
- `20804` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `20878` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 20957-21097

- `16216` — _risolviCollisioniCelle
- `20957` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `21017` — getFruttaStile
- `21024` — _fruttaGetPasto
- `21034` — _fruttaContaRigheRicetta
- `21038` — _fruttaIndiceBasePasto
- `21058` — getFruttaMarker
- `21071` — fruttaMarkerHtml
- `21079` — _fruttaCheckboxHtml
- `21088` — toggleFrutta
- `21097` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 21133-22407

- `21133` — _renderCelleGriglia
- `21213` — _renderRicetteTestuali
- `21252` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `21323` — _renderCelleHtml
- `21331` — toggleCellaMenu
- `21350` — closeAllCellaMenus
- `21358` — _trovaPasto
- `21366` — cellaSposta
- `21420` — cellaCancella
- `21441` — apriEditGrammatura
- `16789` — salva
- `21489` — cellaSwap
- `21509` — cellaRimuoviAlt
- `21523` — cellaAggiungiAlt
- `21626` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `21711` — apriEditRicetta
- `21720` — aggiungiRicetta
- `21736` — rimuoviRicetta
- `21745` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `21907` — ngAggiungiSpuntinoVuoto
- `21923` — apriAggiungiCella
- `17254` — risolviCompatibili
- `22019` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `22111` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `22252` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `22407` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 22455-22847

- `22455` — _attesoStrutturaPiano
- `22475` — _confrontaStrutturaPiano
- `22505` — _costruisciPromptDelta
- `22532` — _pianoToolSchema
- `22607` — _pianoMaxTokens
- `22616` — _estraiPianoDaRisposta
- `22638` — chiamaGeneraPiano
- `22805` — mostraLoadingSteps
- `18123` — render
- `22847` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 22914-23491

- `22914` — generaMessaggioAI
- `23019` — copiaMessaggioAI
- `23029` — salvaInStorico
- `23041` — salvaVarianteAI
- `23056` — renderVariantiSalvate
- `23075` — usaVariante
- `23093` — eliminaVariante
- `23104` — renderStoricoMsg
- `23120` — apriWhatsApp
- `23491` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 23669-25166

- `23669` — _ngColoreSemaforoNome
- `23677` — apriSceltaModalitaPiano
- `23712` — _ngChiudiModalita
- `23715` — _ngCostruisciGiornoVuoto
- `23748` — _ngCostruisciGiornoSpeciale
- `23759` — _ngIndiceInizioSpeciali
- `23770` — _ngModalitaNomeGiorno
- `23776` — _ngImpostaModalitaNomeGiorno
- `23779` — _ngLettera
- `23786` — _ngEtichettaGiorno
- `23806` — _ngEtichettaGiornoBreve
- `23820` — _ngToggleGiornoSpeciale
- `23844` — _ngRenderPannelloSpeciale
- `23912` — _generaGiornoSpecialeAI
- `24012` — _ngGiornoHaContenuto
- `24024` — _ngCreaPianoManuale
- `24047` — _ngScrollTabGiorni
- `24057` — _ngAbilitaDragScroll
- `24094` — _ngCambiaNumeroGiorni
- `24126` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `24140` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `24181` — _ngToggleCat
- `24190` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `24214` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `24370` — _ngSalvaPianoManuale
- `24396` — _ngParseIngrediente
- `24420` — _ngScomponiIngredienti
- `24432` — _ricCalcolaMacroDaIngredienti
- `24450` — _ricRicalcolaMacroLive
- `24457` — _ricAggiornaInfoMacro
- `24471` — _ricRicalcolaMacroLiveNow
- `24495` — _ngTrovaCategoriaAlimento
- `24528` — _ngPescaRicetta
- `24571` — _ngScomponiRicettaNelPasto
- `24608` — _ngDragStart
- `24619` — _ngDragStartCella
- `24630` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `24637` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `24642` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `24661` — _ngAggiungiAlimento
- `24686` — _ngRimuoviAlimento
- `24700` — _ngDopoModifica
- `24718` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `24771` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `24800` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `24817` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `24825` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `24897` — gramTestoCasalingo
- `24923` — _appendToggleNutrizionali
- `24966` — _appendTogglePromemoria
- `24995` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `25141` — cpFromEmoji
- `25147` — getEmojiCp
- `25166` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `23141` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `23163` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `23168` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `23194` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `23282` — _spesaTestoWhatsApp
- `23298` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `23343` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `23366` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `23394` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `23454` — scaricaListaSpesaPDF (download diretto, un click)
- `23462` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `23474` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 26314-26314

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
- `26314` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 26328-26540

- `26328` — salvaInbody
- `26398` — delInbody
- `26405` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `26540` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 26568-27037

- `26568` — buildSemLegenda
- `26582` — renderAlEditor
- `26643` — _alimNomeRegex
- `26651` — _alimGiorniDaPiano
- `26659` — _scanGiorniPerNome
- `26674` — scanRiferimentiAlimento
- `26703` — _alimRefsRighe
- `26709` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `26797` — modificaAlimentoCustom
- `26817` — ripristinaValoriPrecedentiAlimento
- `26829` — _resetAlimModal
- `26840` — apriNuovoAlimentoCustom
- `26846` — salvaAlimentoCustom
- `26913` — eliminaAlimentoCustom
- `26944` — _alimFonteBadge
- `26949` — renderAlimentiPage
- `22217` — E
- `27019` — archiviaAlimentoCustom
- `27037` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 27064-27491

- `27064` — _bcSetStatus
- `27066` — apriScannerBarcode
- `27074` — chiudiScannerBarcode
- `27079` — _bcStopCamera
- `27087` — _bcModaleAperto
- `27089` — _bcAvviaCamera
- `27100` — _bcAvviaNativo
- `27120` — _bcAvviaZXing
- `27129` — _bcZXStart
- `27140` — _bcErroreCamera
- `27148` — cercaBarcodeManuale
- `27154` — _barcodeTrovato
- `27170` — cercaBarcodeOFF
- `27188` — _bcProdottoNonTrovato
- `27202` — _bcPrecompilaForm
- `22477` — num
- `27226` — togAl
- `27279` — selCatAl
- `25402` — selTuttiAl
- `27323` — _appIdAnag  (P140 T1)
- `27333` — _appSyncPaz  (P140 T1)
- `27377` — _appSpecchioInverso  (P140 T2)
- `27403` — _appRitiraSpecchio  (P140 T2)
- `27434` — _appAncoraTappe  (P140 T2)
- `27453` — _appTappe  (P140 T2)
- `27474` — _appMigraPaziente  (P140 T1)
- `27484` — _appMigraTutti  (P140 T1)
- `27491` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 27507-27974

- `27507` — setCalView
- `27517` — calPrev
- `27518` — calNext
- `27519` — calToday
- `27521` — renderCal
- `27535` — renderCalMonth
- `27562` — renderCalWeek
- `27595` — renderCalDay
- `27646` — selGiorno
- `27660` — setDisp
- `27665` — openAddEvento
- `27678` — openAddEventoPaz
- `27684` — toggleEntrataCheck
- `27689` — salvaEvento
- `27731` — _evTestoPromemoria  (P140 T1)
- `27737` — openEvDetail
- `27792` — delEvento
- `27814` — copyMsg
- `27826` — aggDateCal
- `27020` — syncInizio
- `27021` — syncControllo
- `27839` — aggiornaPrev
- `27864` — apriEventoDaScheda  (P140 T2)
- `27878` — _appAggiornaOreScheda  (P140 T2)
- `27895` — renderRic
- `27922` — openNuovaRic
- `27923` — editRic
- `27933` — salvaRic
- `27958` — delRic
- `27974` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 28060-28120

- `28060` — aggiungiEntrataPerPaziente
- `28077` — openNuovaEntrata
- `28091` — salvaEntrata
- `28112` — delEntrata
- `28120` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 28150-28759

- `28150` — aiSuggerisciRicetta
- `28195` — renderConcettiModal
- `28214` — apriConcettiModal
- `28241` — salvaConcettiAllegati
- `28265` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `28303` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `28446` — loadInbodyPDF
- `28569` — _vitdLabel
- `28573` — getIntegratori
- `28577` — getIntegraWant
- `28581` — setIntegratori
- `28598` — setIntegraWant
- `28636` — getPatologieChip
- `28637` — getAllergieChip
- `28638` — setPatologieChip
- `28639` — setAllergieChip
- `28640` — getPatologie
- `28641` — getAllergie
- `28642` — setPatologieFromStr
- `28649` — setAllergieFromStr
- `28662` — getSdvChip
- `28663` — getCspChip
- `28664` — setSdvChip
- `28665` — setCspChip
- `28666` — setSdvFromStr
- `28667` — setCspFromStr
- `28671` — getBudget
- `28672` — setBudget
- `28677` — renderCalAnno
- `28708` — comprimeImmagine
- `28730` — uploadImmagineConcetto
- `28749` — rimuoviImmagineConcetto
- `28759` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 28825-28909

- `28825` — entraSelConcetti
- `28826` — annullaSelConcetti
- `28827` — toggleConcettoSel
- `28832` — eliminaConcettiSelezionati
- `28851` — confermaEliminaConcetti
- `28866` — aiRiscriviConcetto
- `28880` — editConcetto
- `28898` — salvaConcetto
- `28909` — openNuovoConcetto
- `27519` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 28946-28946

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
- `28946` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 29058-29383

- `29058` — renderScadenzeAlert
- `29318` — _scadGestiti  (P144)
- `29328` — _scadPota  (P144)
- `29343` — _scadMigraDaLocalStorage  (P144)
- `29366` — segnaGestito
- `29383` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 29392-29467

- `29392` — ripristinaPaz
- `29400` — eliminaPaz
- `29445` — getDove
- `29449` — setDove
- `29467` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 29472-29910

- `29472` — getCredenzialiPersistenti
- `29485` — cancellaCredenzialiPersistenti
- `29490` — rinnovaSessioneConRefreshToken
- `29507` — getSessioneSalvata
- `29526` — salvaSessione
- `29536` — cancellaSessione
- `29540` — eseguiLogin
- `29587` — eseguiLogout
- `29609` — mostraApp
- `29614` — verificaSessioneEAvvia
- `29642` — assicuraTokenValido
- `29671` — _garantiscoSessionePerSync
- `29683` — avviaRinnovoTokenPeriodico
- `29687` — fermaRinnovoTokenPeriodico
- `29696` — _authReset
- `29701` — _authMostra
- `29704` — mostraLogin
- `29705` — mostraRegistrazione
- `29706` — mostraRecupero
- `29707` — mostraNuovaPassword
- `29710` — eseguiRegistrazione
- `29748` — eseguiRecuperoPassword
- `29777` — eseguiNuovaPassword
- `29811` — _parseHashParams
- `29818` — _pulisciHash
- `29822` — gestisciRitornoAuth
- `29910` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 29982-30105

- `29982` — apriPannelloRicette
- `30011` — chiudiPannelloRicette
- `30019` — applicaRicettaPasto
- `30055` — inizializzaP2
- `30067` — deepClone
- `30071` — applicaPatch
- `30105` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
