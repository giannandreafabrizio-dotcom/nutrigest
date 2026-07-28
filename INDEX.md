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
Righe 5383-8148

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
- `7835` — renderPdRoutine
- `6723` — cardHTML
- `7977` — updateRoutineCampo
- `7985` — suggerisciPastoEQuando
- `8012` — filtroLibreria
- `8021` — renderLibreriaGrid
- `8042` — aggiungiDaLibreriaIdx
- `8066` — openModalRoutine
- `8073` — salvaRoutineVoce
- `8098` — salvaRoutine
- `8105` — mostraRoutinePopup
- `8133` — removeRoutineVoce
- `8148` — _renderAggiustamentiSection

---

### 📈 PERCORSO — timeline di periodizzazione (P115 Tappe 1-5 COMPLETE, 24 lug 2026)
Righe 6021-6621 (numeri ESATTI al 24/7 notte, dopo la Tappa 5). ⚠️ Questo blocco (~600 righe) fa slittare tutti i numeri delle sezioni SUCCESSIVE a riga ~6020 rispetto all'ultima rigenerazione completa: per quelle sezioni fare grep di conferma. Rigenerazione completa alla prossima modifica strutturale.

- `6429` — _PERCORSO_TIPI (const: tipi fase, colori, pct default)
- `6436` — _percorsoGet *(normalizza p.percorso, scarta fasi invalide)*
- `6458` — _percorsoIsoLocal *(data → YYYY-MM-DD LOCALE, mai toISOString/UTC)*
- `6464` — _percorsoIntervalli *(fasi consecutive → date concrete dal/al)*
- `6478` — _percorsoFaseAt *(fase attiva a una data; dal incluso, al escluso)*
- `6487` — _percorsoKcalFase *(pct → kcal indicative via calcolaTDEE)*
- `6510` — _percorsoProiezione *(Tappa 2 — proiezione ibrida teorica/calibrata, cono, obiettivo a intervallo)*
- `6568` — _percorsoDataBreve *(ISO → "12 set")*
- `6585` — _percorsoSerieEnergia *(Tappa 3 — serie introito/TDEE stimato/TDEE osservato per la corsia energia)*
- `6624` — _percorsoSerieMassaMagra *(Tappa 4 — solo InBody: punti {data,m,pg})*
- `6643` — _percorsoConsuntivo *(Tappa 5 — legge p.consuntivo scritto da P50: aderenza, extra kcal, ritardo=extra÷7700, settimane perse; oggi sempre ok:false)*
- `6685` — _PERCORSO_LAYERS_DEFAULT / _percorsoLayersState / _percorsoLayersGet *(Tappa 4 — stato interruttori, SOLO sessione, mai su p)*
- `6690` — percorsoLayerToggle *(Tappa 4 — inverte un solo strato)*
- `6696` — percorsoVistaPreset *(Tappa 4 — preset "tecnica"/"paziente")*
- `6712` — _percorsoPaz *(e a seguire i mutatori percorsoInit/SetInizio/AddFase/UpdFase/DelFase/MoveFase)*
- `6768` — _PERCORSO_MODELLI / _PERCORSO_GEN *(P122 T3 — 4 modelli + regole dei cicli)*
- `6786` — _percorsoGeneraFasi *(P122 T3 — pura: dal traguardo alle fasi, ritmo = quello della proiezione)*
- `6866` — _percorsoModelloSelectHtml
- `6875` — percorsoGeneraDaModello *(propone; conferma prima di sostituire fasi esistenti)*
- `6898` — _percorsoShiftGiorni *(pura: ancora = ultima pesata)*
- `6908` — percorsoRiallinea *(⏩ trasla il piano, riprende dal giorno-fase dell'interruzione)*
- `6935` — _TRG_TIPI / `6744` _TRG_COMPORTAMENTI *(P122 T4 — tipi di traguardo e libreria comportamenti)*
- `6957` — _traguardiGet · `6761` _traguardoValoreAttuale *(valore corrente dai dati esistenti, null se manca)*
- `6996` — _traguardoVerso *(auto: dedotto dalla partenza)* · `6803` _traguardoValuta · `6824` _traguardiValuta
- `7037` — traguardoAdd · `6852` traguardoUpd · `6867` traguardoDel · `6873` traguardoSegna
- `7095` — _COND_TIPI · `6897` _percorsoCondizione *(pura: la fase finisce per soglia — SOLO suggerimento)*
- `7111` — percorsoSetCondizione · `6927` percorsoChiudiFase *(esito fotografato, riapribile)*
- `7145` — _traguardiHtml *(blocco 🏁 in fondo alla scheda Percorso)*
- `7243` — _percorsoVistaPaz / `7049` _percorsoVistaPazAttiva *(P122 T5 — modalità di sessione)*
- `7250` — _percorsoVittorie *(pura: vittorie dall'inizio del percorso + flag ricomposizione)*
- `7288` — _percorsoNascondiPeso *(in fase di massa il peso non si mostra al paziente)*
- `7299` — _traguardoFaseCorrente *(traguardo della fase IN CORSO, non quello lontano)*
- `7327` — _traguardoTestoPaziente *(righe in italiano semplice, riusate dal messaggio WhatsApp)*
- `7360` — _vistaPazienteHtml *(i tre riquadri che guarda il paziente)*
- `7440` — _percorsoChartSvg *(due corsie: peso + massa magra + cono proiezione sopra, striscia aderenza in mezzo (solo con dati P50), energia (kcal) sotto — tutto gated dagli interruttori)*
- `7629` — renderPdPercorso *(scheda: badge fase, riga proiezione/obiettivo, riga Piano vs Realtà (solo con dati), toolbar interruttori, grafico, editor)*

*(Tappa 2 tocca anche `calcolaMacros`: box obiettivo con intervallo al posto della data secca.)*

---

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 8233-8404

- `8233` — salvaAggiustamento
- `8266` — eliminaAggiustamento
- `8275` — renderPdNote
- `8310` — salvaNotaClinica
- `8325` — deleteNota
- `8334` — saveNote
- `8354` — resetSemaforoAuto *(F9 — pulsante 🔄 Ricalcola: pulisce gli automatici e rifà col sistema valido; il motore LEGACY non esiste più)*
- `8404` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 8622-8820

- `8622` — avviaFX
- `8650` — avviaAnalisi
- `8667` — _renderFlussoPanel
- `8711` — _riepEsc
- `8715` — _riepNum
- `8721` — _riepDelta
- `8729` — _riepDataSig
- `8747` — _riepParseFX
- `8087` — clean
- `8761` — _riepAggiornaFX
- `8787` — _riepToggleDomandaDefault
- `8799` — _riepAddDomanda
- `8812` — _riepRemoveDomanda
- `8820` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 9032-9258

- `8218` — dCol
- `8336` — card
- `9032` — renderPdRagionamento
- `9120` — inviaMessaggioRag
- `9138` — concludiERiassumi
- `9152` — salvaRagionamento
- `9173` — apriGeneratoreDaRag
- `9181` — nuovaSessioneRag
- `9187` — cancellaSavedRag
- `9197` — renderPazTimeline
- `9229` — renderPdAnamnesi
- `9258` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 10679-11814

- `10679` — _anNorm *(P125 — testo confrontabile: minuscole, niente accenti)*
- `10685` — _anCorrisponde *(P125 — ricerca per parole-prefisso: "vit d" trova "Vitamina D")*
- `10691` — filtraAnalisi *(P125 — filtro dal vivo delle 119 voci)*
- `10725` — pulisciRicercaAnalisi
- `10731` — renderPdAnalisi
- `10787` — toggleAnalisiSection
- `10936` — loadAnalisiSanguePDF
- `10823` — _impPdfConfigurata
- `10824` — _impPdfLib
- `10834` — _impPdfApri
- `10847` — _impPdfPagina *(P124b — una pagina del PDF → immagine, con la rotazione RILEVATA, non quella dichiarata dal file)*
- `10868` — _impRuotaImmagine
- `10893` — _impRilevaRotazione *(P124b — chiamata piccola: di quanti gradi va girata la pagina)*
- `10912` — _impPromptPagina *(P124b — prompt di UNA pagina, con l'impronta della riga: valore+unità+riferimento)*
- `11111` — _impNormalizzaNumero *(P124 — numero all'italiana → punto decimale, conversione fatta dall'app e non dall'AI)*
- `11122` — _impNumeri
- `11130` — _impSembraIntervallo
- `11138` — _impUgualeAlRange
- `11147` — _impLimitiStd
- `11168` — _impFuoriScala
- `11177` — _impCorrezioneVirgola
- `11189` — _impTestoLimiti
- `11210` — _impRifPlausibile *(P124b — un "riferimento" che è un'unità di misura = riga disallineata)*
- `11223` — _impUnitaCanonica
- `11245` — _impStessaGrandezza *(P124b — stesso tipo di misura a meno del prefisso: nanomoli/micromoli/millimoli)*
- `11262` — _impUnitaCompatibili
- `11273` — _impControllaValore *(P124 — i controlli anti-errore su un valore estratto)*
- `11337` — mostraDiffAnalisi *(P124 — colonna Estratto modificabile + righe sospette deselezionate)*
- `11527` — _calcoloIncluso
- `11533` — toggleCalcoloIncluso
- `11555` — _renderCalcoliPannello
- `11596` — toggleGlossario
- `11601` — updateAnalisi
- `11660` — salvaAnalisi
- `11673` — applicaGruppoClinico
- `11702` — renderBoxGruppiCliniciSuggeriti
- `11734` — suggerisciGruppiClinici
- `11814` — renderMemoriaInbody

---
### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9176 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `9388` — _richVal
- `9395` — _richBmi
- `9400` — _richPat
- `9406` — _richNum
- `9451` — _richPreselezione
- `9467` — richLeggiIntestazione
- `9471` — richSalvaIntestazione
- `9480` — apriRichiestaAnalisi
- `9500` — _richModaleHtml
- `9576` — _richEsc
- `9578` — _richMotivoCambia
- `9584` — _richToggleSez
- `9590` — _richAggiornaConteggi
- `9598` — _richMotivoCorrente
- `9608` — _richSelezione
- `9623` — _richTxt
- `9629` — _richCostruisciPDF
- `8969` — nuovaPagina
- `8970` — spazio
- `9725` — _richNomeFile
- `9730` — _richPrepara
- `9740` — _richRegistra
- `9754` — _richStato
- `9756` — richScaricaPDF
- `9771` — _richUpload
- `9799` — _richWaUrl
- `9806` — _richTestoWa
- `9820` — richInviaWhatsApp
- `9860` — richCopiaLink
- `9881` — _richStoricoHtml

---
### REFERTI DEL SANGUE DATATI — storico nel tempo (P118 tappa 1)
Righe 9194-9387 — migrazione, ordinamento, quadro attuale derivato, barra di selezione.

- `10456` — _refertoNuovoId
- `10459` — _refertoOggi
- `10463` — _refertoDataIt
- `10469` — _refertoConteggio
- `10483` — _refertiMigra
- `10510` — _refertiOrdinati
- `10521` — _refertoPiuRecente
- `10526` — _refertoInVista
- `10544` — _refertiApplica
- `10557` — _refertoCrea
- `10576` — refertoCambiaVista
- `10582` — refertoCambiaData
- `10594` — refertoNuovo
- `10602` — refertoDuplica
- `10611` — refertoElimina
- `10626` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `10069` — _rangeNum
- `10075` — _rangeTestoDa
- `10094` — _rangeCoppia
- `10104` — _rangeHtml

---
### ANDAMENTO NEL TEMPO — tracciato, variazione, grafico grande (P118 tappa 3)
Righe 9441-9745 — serie storica, regola del colore, sparkline, pannello in fondo.

- `10146` — _andLimiti
- `10167` — _andParseRangeLab
- `10180` — _andDistanza
- `10187` — _andValutazione
- `10200` — _andSerie
- `10214` — _andNum
- `10218` — _andDataBreve
- `10223` — _andMeseAnno
- `10231` — _andDominio
- `10245` — _andColore
- `10258` — _andSparkHtml
- `10284` — _andRigaHtml
- `10306` — _andEsamiSeguibili
- `10314` — andScegliEsame
- `10320` — _andPannelloHtml
- `10373` — _andGraficoGrande
- `10424` — _andPasso

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 11862-12273

- `11862` — _ibFmtBreve
- `11871` — _renderPesiIntermediSection
- `11920` — aggiungiPesoIntermedio
- `11936` — eliminaPesoIntermedio
- `11946` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `12273` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 12545-12545

- `12545` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 12923-15464

- `12923` — aggiornaLabelMacros
- `12941` — calcolaMacros
- `13082` — applicaSchema
- `13117` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `13123` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `13145` — _misuraDaReferto *(P127 — UN referto letto con le regole del traguardo: usata anche dalla verifica al controllo)*
- `13178` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `13189` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `13207` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `13320` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `13334` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `13390` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `13404` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `13436` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `13469` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `13511` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `13519` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `13530` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `13557` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `13572` — _stradeVerso *(le strade complete + percentuale libera)*
- `13619` — _VC_TOLLERANZA_PCT / _VC_GIORNI_MIN / _VC_GIORNI_MIN_RITARO / _VC_COPERTURA_MIN_PCT / _VC_MAGRA_PRUDENZA_GG *(P127 — soglie cliniche della verifica)*
- `13629` — _mediaSlotPrescritta *(media pesata sui giorni di un campo dello storico target; la usa anche _kcalMediaPrescrittaOss)*
- `13649` — _vcDeficitSlot *(deficit di uno slot: campo offset o kcal−tdee per gli slot vecchi)*
- `13657` — _vcTratto *(P127 — cosa è cambiato fra due referti, previsto vs reale, TDEE misurato)*
- `13711` — _vcTraguardoSalvato *(traguardo ricostruito dal salvato, per la scheda Percorso)*
- `13721` — _verificaControllo *(P127 — motore puro: tratto recente, quadro dall'inizio, residuo al ritmo reale)*
- `13759` — _verificaControlloHtml *(blocco 🔎, unica fonte per pannello 🎯 e scheda Percorso; azioni solo dove c'è il campo kcal)*
- `13851` — _vcRitara *(scrive le kcal ritarate nel campo regime: propone, non salva)*
- `13864` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `13932` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `13954` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `14007` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `14114` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `14129` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `14154` — _renderRifPesoBox
- `14205` — _usaRifPeso
- `14209` — _aggiornaRifPesoTarget
- `14212` — _aggiornaRegimeSlider
- `14869` — _presetRegime
- `14873` — _initRegimeSliderDaPaziente
- `14891` — ricalcolaLAF
- `15025` — renderStoricoTDEE
- `15059` — attivaSlotTDEE
- `15067` — eliminaSlotTDEE
- `15080` — _toggleCiclizzazione
- `15086` — _aggiornaAnteprimaCiclizzazione
- `15104` — salvaCalcoloMacros
- `15218` — _metAllenamento
- `15234` — _neatFrazione
- `15308` — _larnLafStileVita
- `15325` — _regimeOffset
- `15335` — _componiRegimeText
- `15368` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `15380` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `15387` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `15464` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 15482-15912

- `15482` — renderTargetBadge
- `15511` — verificaRegola_75_20_5
- `15548` — renderBadge75_20_5
- `15613` — _validaNorm
- `15616` — _validaMatchTermine
- `15624` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `15675` — _validaTesto
- `15696` — validaPiano
- `15770` — _validaFirmaBlocchi
- `15777` — renderBadgeValidatore
- `15808` — _validaVaiAlGiorno
- `15817` — apriPannelloValidatore
- `13472` — esc
- `15874` — _validaEseguiOverride
- `15897` — validaGateExport
- `15912` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 16045-16677

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
- `16045` — pianoPazSelezionato
- `16192` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `16430` — renderPanelMacrosGiorno
- `16573` — pmgCambiaGrammi
- `16600` — riapriPiano
- `16638` — _montaPianoCorrente
- `16677` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 16687-17156

- `16687` — pullTemplateSupabase
- `16698` — delTemplateSupabase
- `16707` — _promptTemplateNome
- `16732` — _creaTemplateDaJSON
- `16755` — salvaComeTemplate
- `16766` — salvaComeTemplateDaPiano
- `16775` — _normNomeAlim
- `16776` — _escRegAlim
- `16777` — _raccogliAlimentiDaPiano
- `16788` — _alimentiEsclusiPaziente
- `16800` — _trovaConflittiTemplate
- `16818` — _mostraAvvisoConflitti
- `16842` — applicaTemplate
- `16860` — apriPickerTemplate
- `16888` — _pickPaziente
- `16907` — applicaTemplatePick
- `16911` — rinominaTemplate
- `16922` — eliminaTemplate
- `16932` — renderLibreriaTemplate
- `16961` — renderStoricoPiani
- `17020` — eliminaPiano
- `17036` — _getActiveMacrosTarget
- `17060` — getTargetAttivi
- `17097` — calcolaTargetsCiclizzazione
- `17123` — _setupPianoTargets
- `17147` — getStagioneCorrente
- `17156` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 17590-17590

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `17590` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 17599-18058

- `17599` — aggiornaUIcolazione
- `17609` — salvaRegolePiano
- `17670` — _isModelloSistema
- `17673` — _isModelloSistemaModificato
- `17685` — caricaModelliCustomLocal
- `17699` — salvaModelliCustomLocal
- `17720` — _migraRecordCustom
- `17735` — _syncAliasLegacy
- `17744` — caricaAlimentiCustom
- `17768` — pushAlimentiCustomSupabase
- `17778` — pullAlimentiCustomSupabase
- `17792` — pushModelliSupabase
- `17810` — pullModelliSupabase
- `17835` — _calcolaFreqDaModello
- `17854` — aggiornaUImodello
- `17943` — popolaDropdownModelli
- `17971` — cambiaModelloRotazione
- `17977` — ripristinaModelloOriginale
- `18000` — eliminaModelloCustom
- `18018` — mostraAnteprimaModello
- `18028` — apriEditorModello
- `18058` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 18327-18565

- `15738` — rerender
- `18327` — _salvaModelloDaEditor
- `18369` — caricaRegolePiano
- `18399` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `18434` — _aiLogUsage
- `18456` — _aiProxyUrl
- `18462` — _aiTokenPerProxy
- `18491` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `18565` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 18644-18784

- `16216` — _risolviCollisioniCelle
- `18644` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `18704` — getFruttaStile
- `18711` — _fruttaGetPasto
- `18721` — _fruttaContaRigheRicetta
- `18725` — _fruttaIndiceBasePasto
- `18745` — getFruttaMarker
- `18758` — fruttaMarkerHtml
- `18766` — _fruttaCheckboxHtml
- `18775` — toggleFrutta
- `18784` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 18820-20094

- `18820` — _renderCelleGriglia
- `18900` — _renderRicetteTestuali
- `18939` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `19010` — _renderCelleHtml
- `19018` — toggleCellaMenu
- `19037` — closeAllCellaMenus
- `19045` — _trovaPasto
- `19053` — cellaSposta
- `19107` — cellaCancella
- `19128` — apriEditGrammatura
- `16789` — salva
- `19176` — cellaSwap
- `19196` — cellaRimuoviAlt
- `19210` — cellaAggiungiAlt
- `19313` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `19398` — apriEditRicetta
- `19407` — aggiungiRicetta
- `19423` — rimuoviRicetta
- `19432` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `19594` — ngAggiungiSpuntinoVuoto
- `19610` — apriAggiungiCella
- `17254` — risolviCompatibili
- `19706` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `19798` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `19939` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `20094` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 20142-20523

- `20142` — _attesoStrutturaPiano
- `20162` — _confrontaStrutturaPiano
- `20192` — _costruisciPromptDelta
- `20219` — _pianoToolSchema
- `20294` — _pianoMaxTokens
- `20303` — _estraiPianoDaRisposta
- `20325` — chiamaGeneraPiano
- `20492` — mostraLoadingSteps
- `18123` — render
- `20523` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 20590-21164

- `20590` — generaMessaggioAI
- `20695` — copiaMessaggioAI
- `20705` — salvaInStorico
- `20717` — salvaVarianteAI
- `20732` — renderVariantiSalvate
- `20751` — usaVariante
- `20769` — eliminaVariante
- `20780` — renderStoricoMsg
- `20796` — apriWhatsApp
- `21164` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 21342-22839

- `21342` — _ngColoreSemaforoNome
- `21350` — apriSceltaModalitaPiano
- `21385` — _ngChiudiModalita
- `21388` — _ngCostruisciGiornoVuoto
- `21421` — _ngCostruisciGiornoSpeciale
- `21432` — _ngIndiceInizioSpeciali
- `21443` — _ngModalitaNomeGiorno
- `21449` — _ngImpostaModalitaNomeGiorno
- `21452` — _ngLettera
- `21459` — _ngEtichettaGiorno
- `21479` — _ngEtichettaGiornoBreve
- `21493` — _ngToggleGiornoSpeciale
- `21517` — _ngRenderPannelloSpeciale
- `21585` — _generaGiornoSpecialeAI
- `21685` — _ngGiornoHaContenuto
- `21697` — _ngCreaPianoManuale
- `21720` — _ngScrollTabGiorni
- `21730` — _ngAbilitaDragScroll
- `21767` — _ngCambiaNumeroGiorni
- `21799` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `21813` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `21854` — _ngToggleCat
- `21863` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `21887` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `22043` — _ngSalvaPianoManuale
- `22069` — _ngParseIngrediente
- `22093` — _ngScomponiIngredienti
- `22105` — _ricCalcolaMacroDaIngredienti
- `22123` — _ricRicalcolaMacroLive
- `22130` — _ricAggiornaInfoMacro
- `22144` — _ricRicalcolaMacroLiveNow
- `22168` — _ngTrovaCategoriaAlimento
- `22201` — _ngPescaRicetta
- `22244` — _ngScomponiRicettaNelPasto
- `22281` — _ngDragStart
- `22292` — _ngDragStartCella
- `22303` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `22310` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `22315` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `22334` — _ngAggiungiAlimento
- `22359` — _ngRimuoviAlimento
- `22373` — _ngDopoModifica
- `22391` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `22444` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `22473` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `22490` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `22498` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `22570` — gramTestoCasalingo
- `22596` — _appendToggleNutrizionali
- `22639` — _appendTogglePromemoria
- `22668` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `22814` — cpFromEmoji
- `22820` — getEmojiCp
- `22839` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `20814` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `20836` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `20841` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `20867` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `20955` — _spesaTestoWhatsApp
- `20971` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `21016` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `21039` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `21067` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `21127` — scaricaListaSpesaPDF (download diretto, un click)
- `21135` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `21147` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 23987-23987

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
- `23987` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 23998-24204

- `23998` — salvaInbody
- `24062` — delInbody
- `24069` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `24204` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 24232-24701

- `24232` — buildSemLegenda
- `24246` — renderAlEditor
- `24307` — _alimNomeRegex
- `24315` — _alimGiorniDaPiano
- `24323` — _scanGiorniPerNome
- `24338` — scanRiferimentiAlimento
- `24367` — _alimRefsRighe
- `24373` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `24461` — modificaAlimentoCustom
- `24481` — ripristinaValoriPrecedentiAlimento
- `24493` — _resetAlimModal
- `24504` — apriNuovoAlimentoCustom
- `24510` — salvaAlimentoCustom
- `24577` — eliminaAlimentoCustom
- `24608` — _alimFonteBadge
- `24613` — renderAlimentiPage
- `22217` — E
- `24683` — archiviaAlimentoCustom
- `24701` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 24728-24965

- `24728` — _bcSetStatus
- `24730` — apriScannerBarcode
- `24738` — chiudiScannerBarcode
- `24743` — _bcStopCamera
- `24751` — _bcModaleAperto
- `24753` — _bcAvviaCamera
- `24764` — _bcAvviaNativo
- `24784` — _bcAvviaZXing
- `24793` — _bcZXStart
- `24804` — _bcErroreCamera
- `24812` — cercaBarcodeManuale
- `24818` — _barcodeTrovato
- `24834` — cercaBarcodeOFF
- `24852` — _bcProdottoNonTrovato
- `24866` — _bcPrecompilaForm
- `22477` — num
- `24890` — togAl
- `24943` — selCatAl
- `25402` — selTuttiAl
- `24965` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 24979-25295

- `24979` — setCalView
- `24980` — calPrev
- `24981` — calNext
- `24982` — calToday
- `24984` — renderCal
- `24998` — renderCalMonth
- `25022` — renderCalWeek
- `25040` — renderCalDay
- `25056` — selGiorno
- `25070` — setDisp
- `25075` — openAddEvento
- `25088` — openAddEventoPaz
- `25094` — toggleEntrataCheck
- `25099` — salvaEvento
- `25122` — openEvDetail
- `25177` — delEvento
- `25185` — copyMsg
- `25192` — aggDateCal
- `25197` — syncInizio
- `25198` — syncControllo
- `25199` — aggiornaPrev
- `25216` — renderRic
- `25243` — openNuovaRic
- `25244` — editRic
- `25254` — salvaRic
- `25279` — delRic
- `25295` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 25380-25440

- `25380` — aggiungiEntrataPerPaziente
- `25397` — openNuovaEntrata
- `25411` — salvaEntrata
- `25432` — delEntrata
- `25440` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 25470-25906

- `25470` — aiSuggerisciRicetta
- `25515` — renderConcettiModal
- `25534` — apriConcettiModal
- `25561` — salvaConcettiAllegati
- `25585` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `25623` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `25632` — loadInbodyPDF
- `25743` — _vitdLabel
- `25747` — getIntegratori
- `25751` — getIntegraWant
- `25755` — setIntegratori
- `25772` — setIntegraWant
- `25783` — getPatologieChip
- `25784` — getAllergieChip
- `25785` — setPatologieChip
- `25786` — setAllergieChip
- `25787` — getPatologie
- `25788` — getAllergie
- `25789` — setPatologieFromStr
- `25796` — setAllergieFromStr
- `25809` — getSdvChip
- `25810` — getCspChip
- `25811` — setSdvChip
- `25812` — setCspChip
- `25813` — setSdvFromStr
- `25814` — setCspFromStr
- `25818` — getBudget
- `25819` — setBudget
- `25824` — renderCalAnno
- `25855` — comprimeImmagine
- `25877` — uploadImmagineConcetto
- `25896` — rimuoviImmagineConcetto
- `25906` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 25972-26076

- `25972` — entraSelConcetti
- `25973` — annullaSelConcetti
- `25974` — toggleConcettoSel
- `25979` — eliminaConcettiSelezionati
- `25998` — confermaEliminaConcetti
- `26013` — aiRiscriviConcetto
- `26027` — editConcetto
- `26045` — salvaConcetto
- `26056` — openNuovoConcetto
- `26076` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 26077-26240

- `26077` — saveAgendaPersonale
- `26078` — getAgendaTodo
- `26079` — saveAgendaTodo
- `26081` — pulisciAgendaVecchia
- `26085` — navigaAgenda
- `26094` — toggleFormAgenda
- `26095` — toggleFormTodo
- `26097` — salvaAgendaItem
- `26111` — salvaTodoItem
- `26123` — toggleAgendaFatto
- `26131` — toggleTodoFatto
- `26144` — _catCol
- `26146` — renderAgendaDx
- `26240` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 26366-26570

- `26366` — renderScadenzeAlert
- `26551` — segnaGestito
- `26570` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 26579-26654

- `26579` — ripristinaPaz
- `26587` — eliminaPaz
- `26632` — getDove
- `26636` — setDove
- `26654` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 26659-27099

- `26659` — getCredenzialiPersistenti
- `26672` — cancellaCredenzialiPersistenti
- `26677` — rinnovaSessioneConRefreshToken
- `26694` — getSessioneSalvata
- `26713` — salvaSessione
- `26723` — cancellaSessione
- `26727` — eseguiLogin
- `26774` — eseguiLogout
- `26796` — mostraApp
- `26801` — verificaSessioneEAvvia
- `26829` — assicuraTokenValido
- `26858` — _garantiscoSessionePerSync
- `26870` — avviaRinnovoTokenPeriodico
- `26874` — fermaRinnovoTokenPeriodico
- `26883` — _authReset
- `26888` — _authMostra
- `26891` — mostraLogin
- `26892` — mostraRegistrazione
- `26893` — mostraRecupero
- `26894` — mostraNuovaPassword
- `26897` — eseguiRegistrazione
- `26935` — eseguiRecuperoPassword
- `26964` — eseguiNuovaPassword
- `26998` — _parseHashParams
- `27005` — _pulisciHash
- `27009` — gestisciRitornoAuth
- `27099` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 27171-27294

- `27171` — apriPannelloRicette
- `27200` — chiudiPannelloRicette
- `27208` — applicaRicettaPasto
- `27244` — inizializzaP2
- `27256` — deepClone
- `27260` — applicaPatch
- `27294` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
