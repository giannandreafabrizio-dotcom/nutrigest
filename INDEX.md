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
Righe 3039-3246

- `3039` — _parseAnalisiNum
- `3047` — calcolaIndice
- `3220` — interpretaAnalisi
- `3232` — _interpAnalisiHtml
- `3246` — mostraInfoRange

---

### CONCETTI EDUCATIVI — sync Supabase, migrazione
Righe 3393-3417

- `3393` — pushConcetiSupabase
- `3403` — pullConcetiSupabase
- `3417` — migraConcetti

---

### ALIMENTI — categorie funzionali/semaforo, chip UI, equivalenze porzioni
Righe 3607-3979

- `3607` — getCategoriaSemaforo
- `3624` — _getCategorieGruppo
- `3638` — calcolaGrammaturaEquivalente
- `3690` — _gruppoEquiv  (P121: gruppo di equivalenza + criterio per categoria funzionale)
- `3696` — _porzioneStandard  (P121: porzione `g` di database dell'alimento)
- `3711` — suggerisciGrEquivalente  (P121: firma a 3 argomenti, il gruppo si deduce dai due alimenti)
- `3737` — _etichettaCriterio  (P121: ≈carbo / ≈prot / ≈grassi / fissa / porzione)
- `3757` — _promptAlternativeGrassi  (P121: riga del prompt AI generata dal motore)
- `3773` — ricalcolaAlternative  (P121: MOTORE UNICO, unico punto che scrive la grammatura di un'alternativa)
- `3792` — ricalcolaAlternativePiano  (P121: applica il motore a tutte le celle di un piano)
- `3841` — arrotondaGrammatura  (P121: sostituisce arrotondaPorzioneDiscreta — pezzi interi senza tetto / 5g)
- `3851` — getCategoriaFunzionale
- `3891` — catArr
- `3907` — _tagComuniTrova
- `3911` — getTagComuniChip
- `3914` — setTagComuniChip
- `3922` — setCatChips
- `3935` — getStagioniChip
- `3938` — setStagioniChip
- `3945` — getProfiloChip
- `3948` — setProfiloChip
- `3957` — wireChipGroup
- `3968` — wireAttrChipGroups
- `3979` — wireRadioChipGroup

---

### CONFIG / STORAGE LOCALE — cfg, localStorage db, util data/valuta
Righe 4007-4423

- `4007` — getCfg
- `4008` — saveCfgL
- `4009` — getUrl
- `4010` — saveLocal
- `4011` — loadLocal
- `4023` — uid
- `4041` — ymdLoc  (P141)
- `4046` — today
- `4054` — addDays
- `4062` — fData
- `4063` — fEur
- `4065` — getLastSyncText
- `4075` — getSyncColor
- `4082` — aggiornaStatoSync
- `4108` — setSyncStatus
- `4377` — _registraTombstone
- `4385` — _tombstoneAttivi
- `4397` — _fondiTombstones
- `4411` — _mergeTombstonesRemoti *(dal 24/7 legge il meta da `collections`, P74 1d)*
- `4423` — _applicaTombstones
- `4284` — _pazFetchMeta *(P74 1d — solo `collections`)*
- `4305` — _collectionsUpsert *(P74 — scrittura primaria dei 4 meta-record dal cutover 1d)*
- `4327` — _collectionsFetch *(P74 1d — lettura unica dei meta-record)*
- `4350` — _analisiSangueUpsert *(P74 fase 2 — scrittura ombra analisi del sangue, 24/7)*

---

### SYNC SUPABASE — push/pull ricette/pazienti, tombstones, conflitti (P69)
Righe 4447-4832

- `4447` — supaHeaders
- `4461` — pushRicetteSupabase
- `4486` — pullRicetteSupabase
- `4508` — delRicetteSupabase
- `4520` — delPazienteSupabase
- `4535` — pushToSheets
- `4579` — pullFromSheets
- `4658` — syncNow
- `4671` — sincronizzaTutto
- `4360` — stpSet
- `4365` — stpMsg
- `4802` — testConnSupabase
- `4832` — _p68LogSaveAnonimo

---

### SYNC SUPABASE — save paziente, piani/cache piano, entrate, eventi
Righe 4846-5368

- `4846` — save
- `4864` — _pushRigaPerId
- `4897` — _flushDirtyIds
- `4980` — _p69LoadBaseline
- `4983` — _p69StoreBaseline
- `4986` — _p69SetBaseline
- `4990` — _p69DropBaseline
- `4994` — _p69SetBaselineFromRows
- `5000` — _p69NomePaz
- `5005` — _p69InList
- `5013` — _p69RilevaConflitti
- `5049` — _p69DialogoConflitti
- `4738` — chiudi
- `5083` — _p69RisolviRicarica
- `5112` — _p69EsportaLocali
- `5125` — _p69RisolviSovrascrivi
- `5138` — pushPianoSupabase
- `5160` — pullPianiSupabase
- `5176` — delPianoSupabase
- `5192` — delPianiPazienteSupabase
- `5204` — pushCachePianoSupabase
- `5221` — caricaCachePianoSupabase
- `5243` — pushEntrateSupabase
- `5267` — pullEntrateSupabase
- `5281` — delEntrataSupabase
- `5289` — pushEntrataSupabase
- `5300` — pushEventoSupabase
- `5313` — pushEventiSupabase
- `5337` — pullEventiSupabase
- `5357` — delEventoSupabase
- `5368` — _pianoCacheKey

---

### UI GENERALE — config AI key, notifiche, navigazione (goTo/tab/modali)
Righe 5399-5510

- `5399` — _salvaPianoCache
- `5404` — _caricaPianoCache
- `5410` — salvaCfg
- `5411` — testConn
- `5418` — testaAntKey
- `5429` — initAntCard
- `5432` — esporta
- `5433` — importa
- `5438` — goTo
- `5454` — closeM
- `5462` — ngChiudiModale
- `5471` — ngChiudiPopupCoppia
- `5475` — ngAggiungiX
- `5486` — ngUpgradeModali
- `5506` — mTab
- `5507` — aggiornaEta
- `5508` — toggleOrarioNote
- `5509` — pdTab
- `5510` — notif

---

### PAZIENTI — registro: lista/card/kanban, apertura, editing, salvataggio, routine
Righe 5518-8392

- `5518` — getPazView
- `5519` — setPazView
- `5528` — _pazStatoPiano
- `5536` — _pazUrgenzaControllo
- `5551` — _pazBadgePrenotato  (P142)
- `5558` — pazSegnaArrivato  (P142)
- `5564` — _pazStatoTagHtml
- `5581` — _pazAggiornaFiltroRegimi
- `5589` — renderPaz
- `5647` — _renderPazCard
- `5672` — _renderPazLista
- `5699` — _renderPazKanban
- `5737` — openNuovoPaz
- `5764` — editPaz
- `5844` — REGOLE_SEMAFORO_ALIMENTI *(15 condizioni cliniche → grigi/celesti; globale dal 26/7 per essere verificabile dal test)*
- `6291` — _SEM_COLORI_LEGACY / `6105` _SEM_COLORI_AUTO *(F9 — unico vocabolario dei colori automatici)*
- `6296` — NOMI_CONDIZIONE_SEMAFORO *(etichette delle 15 condizioni, usate anche dal riquadro della scheda)*
- `6318` — _semaforoCondizioniAttive *(le condizioni spuntate su un paziente)*
- `6329` — _semaforoMigraPaziente *(F9 — toglie i colori legacy e ricalcola; idempotente)*
- `6340` — _semaforoMigraTutti *(passata su tutti i pazienti in memoria, con conteggio)*
- `6351` — applicaRegoloSemaforo *(dal 26/7 pulisce TUTTI e sei i colori automatici, non solo i suoi due)*
- `6439` — trovaChiaveAlimento *(match esatto sul nome: se non trova, la regola è ignorata in silenzio — vedi test s2-regole-nomi-alimenti)*
- `6463` — _pazNumOPrec *(F7 — campo assente = valore precedente, non azzeramento)*
- `6475` — _pazPreservaCampi *(F5 — l'anagrafica non cancella i campi che il form non gestisce)*
- `6481` — salvaPaz
- `6631` — openPaz
- `8079` — renderPdRoutine
- `6723` — cardHTML
- `8221` — updateRoutineCampo
- `8229` — suggerisciPastoEQuando
- `8256` — filtroLibreria
- `8265` — renderLibreriaGrid
- `8286` — aggiungiDaLibreriaIdx
- `8310` — openModalRoutine
- `8317` — salvaRoutineVoce
- `8342` — salvaRoutine
- `8349` — mostraRoutinePopup
- `8377` — removeRoutineVoce
- `8392` — _renderAggiustamentiSection

---

### 📈 PERCORSO — timeline di periodizzazione (P115 Tappe 1-5 COMPLETE, 24 lug 2026)
Righe 6021-6621 (numeri ESATTI al 24/7 notte, dopo la Tappa 5). ⚠️ Questo blocco (~600 righe) fa slittare tutti i numeri delle sezioni SUCCESSIVE a riga ~6020 rispetto all'ultima rigenerazione completa: per quelle sezioni fare grep di conferma. Rigenerazione completa alla prossima modifica strutturale.

- `6677` — _PERCORSO_TIPI (const: tipi fase, colori, pct default)
- `6684` — _percorsoGet *(normalizza p.percorso, scarta fasi invalide)*
- `6708` — _percorsoIntervalli *(fasi consecutive → date concrete dal/al)*
- `6722` — _percorsoFaseAt *(fase attiva a una data; dal incluso, al escluso)*
- `6731` — _percorsoKcalFase *(pct → kcal indicative via calcolaTDEE)*
- `6754` — _percorsoProiezione *(Tappa 2 — proiezione ibrida teorica/calibrata, cono, obiettivo a intervallo)*
- `6812` — _percorsoDataBreve *(ISO → "12 set")*
- `6829` — _percorsoSerieEnergia *(Tappa 3 — serie introito/TDEE stimato/TDEE osservato per la corsia energia)*
- `6868` — _percorsoSerieMassaMagra *(Tappa 4 — solo InBody: punti {data,m,pg})*
- `6887` — _percorsoConsuntivo *(Tappa 5 — legge p.consuntivo scritto da P50: aderenza, extra kcal, ritardo=extra÷7700, settimane perse; oggi sempre ok:false)*
- `6929` — _PERCORSO_LAYERS_DEFAULT / _percorsoLayersState / _percorsoLayersGet *(Tappa 4 — stato interruttori, SOLO sessione, mai su p)*
- `6934` — percorsoLayerToggle *(Tappa 4 — inverte un solo strato)*
- `6940` — percorsoVistaPreset *(Tappa 4 — preset "tecnica"/"paziente")*
- `6956` — _percorsoPaz *(e a seguire i mutatori percorsoInit/SetInizio/AddFase/UpdFase/DelFase/MoveFase)*
- `7012` — _PERCORSO_MODELLI / _PERCORSO_GEN *(P122 T3 — 4 modelli + regole dei cicli)*
- `7030` — _percorsoGeneraFasi *(P122 T3 — pura: dal traguardo alle fasi, ritmo = quello della proiezione)*
- `7110` — _percorsoModelloSelectHtml
- `7119` — percorsoGeneraDaModello *(propone; conferma prima di sostituire fasi esistenti)*
- `7142` — _percorsoShiftGiorni *(pura: ancora = ultima pesata)*
- `7152` — percorsoRiallinea *(⏩ trasla il piano, riprende dal giorno-fase dell'interruzione)*
- `7179` — _TRG_TIPI / `6744` _TRG_COMPORTAMENTI *(P122 T4 — tipi di traguardo e libreria comportamenti)*
- `7201` — _traguardiGet · `6761` _traguardoValoreAttuale *(valore corrente dai dati esistenti, null se manca)*
- `7240` — _traguardoVerso *(auto: dedotto dalla partenza)* · `6803` _traguardoValuta · `6824` _traguardiValuta
- `7281` — traguardoAdd · `6852` traguardoUpd · `6867` traguardoDel · `6873` traguardoSegna
- `7339` — _COND_TIPI · `6897` _percorsoCondizione *(pura: la fase finisce per soglia — SOLO suggerimento)*
- `7355` — percorsoSetCondizione · `6927` percorsoChiudiFase *(esito fotografato, riapribile)*
- `7389` — _traguardiHtml *(blocco 🏁 in fondo alla scheda Percorso)*
- `7487` — _percorsoVistaPaz / `7049` _percorsoVistaPazAttiva *(P122 T5 — modalità di sessione)*
- `7494` — _percorsoVittorie *(pura: vittorie dall'inizio del percorso + flag ricomposizione)*
- `7532` — _percorsoNascondiPeso *(in fase di massa il peso non si mostra al paziente)*
- `7543` — _traguardoFaseCorrente *(traguardo della fase IN CORSO, non quello lontano)*
- `7571` — _traguardoTestoPaziente *(righe in italiano semplice, riusate dal messaggio WhatsApp)*
- `7604` — _vistaPazienteHtml *(i tre riquadri che guarda il paziente)*
- `7684` — _percorsoChartSvg *(due corsie: peso + massa magra + cono proiezione sopra, striscia aderenza in mezzo (solo con dati P50), energia (kcal) sotto — tutto gated dagli interruttori)*
- `7873` — renderPdPercorso *(scheda: badge fase, riga proiezione/obiettivo, riga Piano vs Realtà (solo con dati), toolbar interruttori, grafico, editor)*

*(Tappa 2 tocca anche `calcolaMacros`: box obiettivo con intervallo al posto della data secca.)*

---

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 8477-8648

- `8477` — salvaAggiustamento
- `8510` — eliminaAggiustamento
- `8519` — renderPdNote
- `8554` — salvaNotaClinica
- `8569` — deleteNota
- `8578` — saveNote
- `8598` — resetSemaforoAuto *(F9 — pulsante 🔄 Ricalcola: pulisce gli automatici e rifà col sistema valido; il motore LEGACY non esiste più)*
- `8648` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 8889-9087

- `8889` — avviaFX
- `8917` — avviaAnalisi
- `8934` — _renderFlussoPanel
- `8978` — _riepEsc
- `8982` — _riepNum
- `8988` — _riepDelta
- `8996` — _riepDataSig
- `9014` — _riepParseFX
- `8087` — clean
- `9028` — _riepAggiornaFX
- `9054` — _riepToggleDomandaDefault
- `9066` — _riepAddDomanda
- `9079` — _riepRemoveDomanda
- `9087` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 9299-9542

- `8218` — dCol
- `8336` — card
- `9299` — renderPdRagionamento
- `9387` — inviaMessaggioRag
- `9405` — concludiERiassumi
- `9419` — salvaRagionamento
- `9440` — apriGeneratoreDaRag
- `9448` — nuovaSessioneRag
- `9454` — cancellaSavedRag
- `9464` — renderPazTimeline
- `9501` — renderPdAnamnesi
- `9542` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 11490-12625

- `11490` — _anNorm *(P125 — testo confrontabile: minuscole, niente accenti)*
- `11496` — _anCorrisponde *(P125 — ricerca per parole-prefisso: "vit d" trova "Vitamina D")*
- `11502` — filtraAnalisi *(P125 — filtro dal vivo delle 119 voci)*
- `11536` — pulisciRicercaAnalisi
- `11542` — renderPdAnalisi
- `11598` — toggleAnalisiSection
- `11747` — loadAnalisiSanguePDF
- `11634` — _impPdfConfigurata
- `11635` — _impPdfLib
- `11645` — _impPdfApri
- `11658` — _impPdfPagina *(P124b — una pagina del PDF → immagine, con la rotazione RILEVATA, non quella dichiarata dal file)*
- `11679` — _impRuotaImmagine
- `11704` — _impRilevaRotazione *(P124b — chiamata piccola: di quanti gradi va girata la pagina)*
- `11723` — _impPromptPagina *(P124b — prompt di UNA pagina, con l'impronta della riga: valore+unità+riferimento)*
- `11922` — _impNormalizzaNumero *(P124 — numero all'italiana → punto decimale, conversione fatta dall'app e non dall'AI)*
- `11933` — _impNumeri
- `11941` — _impSembraIntervallo
- `11949` — _impUgualeAlRange
- `11958` — _impLimitiStd
- `11979` — _impFuoriScala
- `11988` — _impCorrezioneVirgola
- `12000` — _impTestoLimiti
- `12021` — _impRifPlausibile *(P124b — un "riferimento" che è un'unità di misura = riga disallineata)*
- `12034` — _impUnitaCanonica
- `12056` — _impStessaGrandezza *(P124b — stesso tipo di misura a meno del prefisso: nanomoli/micromoli/millimoli)*
- `12073` — _impUnitaCompatibili
- `12084` — _impControllaValore *(P124 — i controlli anti-errore su un valore estratto)*
- `12148` — mostraDiffAnalisi *(P124 — colonna Estratto modificabile + righe sospette deselezionate)*
- `12338` — _calcoloIncluso
- `12344` — toggleCalcoloIncluso
- `12366` — _renderCalcoliPannello
- `12407` — toggleGlossario
- `12412` — updateAnalisi
- `12471` — salvaAnalisi
- `12484` — applicaGruppoClinico
- `12513` — renderBoxGruppiCliniciSuggeriti
- `12545` — suggerisciGruppiClinici
- `12625` — renderMemoriaInbody

---
### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9176 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `9672` — _richVal
- `9679` — _richBmi
- `9684` — _richPat
- `9690` — _richNum
- `9735` — _richPreselezione
- `9751` — richLeggiIntestazione
- `9755` — richSalvaIntestazione
- `9764` — apriRichiestaAnalisi
- `9784` — _richModaleHtml
- `9860` — _richEsc
- `9862` — _richMotivoCambia
- `9868` — _richToggleSez
- `9874` — _richAggiornaConteggi
- `9882` — _richMotivoCorrente
- `9892` — _richSelezione
- `9907` — _richTxt
- `9913` — _richCostruisciPDF
- `8969` — nuovaPagina
- `8970` — spazio
- `10009` — _richNomeFile
- `10014` — _richPrepara
- `10027` — _richRegistra
- `10032` — _richStato
- `10034` — richScaricaPDF
- `10083` — _richUpload
- `10085` — _richWaUrl
- `10092` — _richTestoWa
- `10106` — richInviaWhatsApp
- `10146` — richCopiaLink
- `10167` — _richStoricoHtml

---
### REFERTI DEL SANGUE DATATI — storico nel tempo (P118 tappa 1)
Righe 9194-9387 — migrazione, ordinamento, quadro attuale derivato, barra di selezione.

- `11267` — _refertoNuovoId
- `11270` — _refertoOggi
- `11274` — _refertoDataIt
- `11280` — _refertoConteggio
- `11294` — _refertiMigra
- `11321` — _refertiOrdinati
- `11332` — _refertoPiuRecente
- `11337` — _refertoInVista
- `11355` — _refertiApplica
- `11368` — _refertoCrea
- `11387` — refertoCambiaVista
- `11393` — refertoCambiaData
- `11405` — refertoNuovo
- `11413` — refertoDuplica
- `11422` — refertoElimina
- `11437` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `10880` — _rangeNum
- `10886` — _rangeTestoDa
- `10905` — _rangeCoppia
- `10915` — _rangeHtml

---
### ANDAMENTO NEL TEMPO — tracciato, variazione, grafico grande (P118 tappa 3)
Righe 9441-9745 — serie storica, regola del colore, sparkline, pannello in fondo.

- `10957` — _andLimiti
- `10978` — _andParseRangeLab
- `10991` — _andDistanza
- `10998` — _andValutazione
- `11011` — _andSerie
- `11025` — _andNum
- `11029` — _andDataBreve
- `11034` — _andMeseAnno
- `11042` — _andDominio
- `11056` — _andColore
- `11069` — _andSparkHtml
- `11095` — _andRigaHtml
- `11117` — _andEsamiSeguibili
- `11125` — andScegliEsame
- `11131` — _andPannelloHtml
- `11184` — _andGraficoGrande
- `11235` — _andPasso

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 12675-14023

- `12675` — _ibFmtBreve
- `12684` — _renderPesiIntermediSection
- `12733` — aggiungiPesoIntermedio
- `12749` — eliminaPesoIntermedio
- `12759` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `14023` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 14331-14331

- `14331` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 14712-17772

- `14712` — aggiornaLabelMacros
- `14730` — calcolaMacros
- `14871` — applicaSchema
- `14906` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `14912` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `14934` — _misuraDaReferto *(P127 — UN referto letto con le regole del traguardo: usata anche dalla verifica al controllo)*
- `14967` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `14978` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `14996` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `15109` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `15123` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `15179` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `15193` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `15225` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `15258` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `15300` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `15308` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `15319` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `15346` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `15361` — _stradeVerso *(le strade complete + percentuale libera)*
- `15408` — _VC_TOLLERANZA_PCT / _VC_GIORNI_MIN / _VC_GIORNI_MIN_RITARO / _VC_COPERTURA_MIN_PCT / _VC_MAGRA_PRUDENZA_GG *(P127 — soglie cliniche della verifica)*
- `15418` — _mediaSlotPrescritta *(media pesata sui giorni di un campo dello storico target; la usa anche _kcalMediaPrescrittaOss)*
- `15438` — _vcDeficitSlot *(deficit di uno slot: campo offset o kcal−tdee per gli slot vecchi)*
- `15446` — _vcTratto *(P127 — cosa è cambiato fra due referti, previsto vs reale, TDEE misurato)*
- `15500` — _vcTraguardoSalvato *(traguardo ricostruito dal salvato, per la scheda Percorso)*
- `15510` — _verificaControllo *(P127 — motore puro: tratto recente, quadro dall'inizio, residuo al ritmo reale)*
- `15548` — _verificaControlloHtml *(blocco 🔎, unica fonte per pannello 🎯 e scheda Percorso; azioni solo dove c'è il campo kcal)*
- `15640` — _vcRitara *(scrive le kcal ritarate nel campo regime: propone, non salva)*
- `15653` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `15721` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `15743` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `15796` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `15903` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `15918` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `15943` — _renderRifPesoBox
- `15994` — _usaRifPeso
- `15998` — _aggiornaRifPesoTarget
- `16001` — _aggiornaRegimeSlider
- `16658` — _presetRegime
- `16662` — _initRegimeSliderDaPaziente
- `16633` — ricalcolaLAF
- `16818` — renderStoricoTDEE
- `16860` — attivaSlotTDEE
- `16877` — eliminaSlotTDEE
- `16890` — _toggleCiclizzazione
- `16896` — _aggiornaAnteprimaCiclizzazione
- `16914` — salvaCalcoloMacros
- `17229` — _metAllenamento
- `17468` — _neatFrazione
- `17587` — _larnLafStileVita
- `17604` — _regimeOffset
- `17614` — _componiRegimeText
- `17647` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `17659` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `17666` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `17772` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 17790-18220

- `17790` — renderTargetBadge
- `17819` — verificaRegola_75_20_5
- `17856` — renderBadge75_20_5
- `17921` — _validaNorm
- `17924` — _validaMatchTermine
- `17932` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `17983` — _validaTesto
- `18004` — validaPiano
- `18078` — _validaFirmaBlocchi
- `18085` — renderBadgeValidatore
- `18116` — _validaVaiAlGiorno
- `18125` — apriPannelloValidatore
- `13472` — esc
- `18182` — _validaEseguiOverride
- `18205` — validaGateExport
- `18220` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 18353-18985

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
- `18353` — pianoPazSelezionato
- `18500` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `18738` — renderPanelMacrosGiorno
- `18881` — pmgCambiaGrammi
- `18908` — riapriPiano
- `18946` — _montaPianoCorrente
- `18985` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 18995-19469

- `18995` — pullTemplateSupabase
- `19006` — delTemplateSupabase
- `19015` — _promptTemplateNome
- `19040` — _creaTemplateDaJSON
- `19063` — salvaComeTemplate
- `19074` — salvaComeTemplateDaPiano
- `19083` — _normNomeAlim
- `19084` — _escRegAlim
- `19085` — _raccogliAlimentiDaPiano
- `19096` — _alimentiEsclusiPaziente
- `19108` — _trovaConflittiTemplate
- `19126` — _mostraAvvisoConflitti
- `19150` — applicaTemplate
- `19168` — apriPickerTemplate
- `19196` — _pickPaziente
- `19220` — applicaTemplatePick
- `19224` — rinominaTemplate
- `19235` — eliminaTemplate
- `19245` — renderLibreriaTemplate
- `19274` — renderStoricoPiani
- `19333` — eliminaPiano
- `19349` — _getActiveMacrosTarget
- `19373` — getTargetAttivi
- `19410` — calcolaTargetsCiclizzazione
- `19436` — _setupPianoTargets
- `19460` — getStagioneCorrente
- `19469` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 19940-19940

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `19940` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 19949-20408

- `19949` — aggiornaUIcolazione
- `19959` — salvaRegolePiano
- `20020` — _isModelloSistema
- `20023` — _isModelloSistemaModificato
- `20035` — caricaModelliCustomLocal
- `20049` — salvaModelliCustomLocal
- `20070` — _migraRecordCustom
- `20085` — _syncAliasLegacy
- `20094` — caricaAlimentiCustom
- `20118` — pushAlimentiCustomSupabase
- `20128` — pullAlimentiCustomSupabase
- `20142` — pushModelliSupabase
- `20160` — pullModelliSupabase
- `20185` — _calcolaFreqDaModello
- `20204` — aggiornaUImodello
- `20293` — popolaDropdownModelli
- `20321` — cambiaModelloRotazione
- `20327` — ripristinaModelloOriginale
- `20350` — eliminaModelloCustom
- `20368` — mostraAnteprimaModello
- `20378` — apriEditorModello
- `20408` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 20677-20915

- `15738` — rerender
- `20677` — _salvaModelloDaEditor
- `20719` — caricaRegolePiano
- `20749` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `20784` — _aiLogUsage
- `20806` — _aiProxyUrl
- `20812` — _aiTokenPerProxy
- `20841` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `20915` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 20994-21134

- `16216` — _risolviCollisioniCelle
- `20994` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `21054` — getFruttaStile
- `21061` — _fruttaGetPasto
- `21071` — _fruttaContaRigheRicetta
- `21075` — _fruttaIndiceBasePasto
- `21095` — getFruttaMarker
- `21108` — fruttaMarkerHtml
- `21116` — _fruttaCheckboxHtml
- `21125` — toggleFrutta
- `21134` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 21170-22444

- `21170` — _renderCelleGriglia
- `21250` — _renderRicetteTestuali
- `21289` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `21360` — _renderCelleHtml
- `21368` — toggleCellaMenu
- `21387` — closeAllCellaMenus
- `21395` — _trovaPasto
- `21403` — cellaSposta
- `21457` — cellaCancella
- `21478` — apriEditGrammatura
- `16789` — salva
- `21526` — cellaSwap
- `21546` — cellaRimuoviAlt
- `21560` — cellaAggiungiAlt
- `21663` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `21748` — apriEditRicetta
- `21757` — aggiungiRicetta
- `21773` — rimuoviRicetta
- `21782` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `21944` — ngAggiungiSpuntinoVuoto
- `21960` — apriAggiungiCella
- `17254` — risolviCompatibili
- `22056` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `22148` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `22289` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `22444` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 22492-22884

- `22492` — _attesoStrutturaPiano
- `22512` — _confrontaStrutturaPiano
- `22542` — _costruisciPromptDelta
- `22569` — _pianoToolSchema
- `22644` — _pianoMaxTokens
- `22653` — _estraiPianoDaRisposta
- `22675` — chiamaGeneraPiano
- `22842` — mostraLoadingSteps
- `18123` — render
- `22884` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 22951-23528

- `22951` — generaMessaggioAI
- `23056` — copiaMessaggioAI
- `23066` — salvaInStorico
- `23078` — salvaVarianteAI
- `23093` — renderVariantiSalvate
- `23112` — usaVariante
- `23130` — eliminaVariante
- `23141` — renderStoricoMsg
- `23157` — apriWhatsApp
- `23528` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 23706-25203

- `23706` — _ngColoreSemaforoNome
- `23714` — apriSceltaModalitaPiano
- `23749` — _ngChiudiModalita
- `23752` — _ngCostruisciGiornoVuoto
- `23785` — _ngCostruisciGiornoSpeciale
- `23796` — _ngIndiceInizioSpeciali
- `23807` — _ngModalitaNomeGiorno
- `23813` — _ngImpostaModalitaNomeGiorno
- `23816` — _ngLettera
- `23823` — _ngEtichettaGiorno
- `23843` — _ngEtichettaGiornoBreve
- `23857` — _ngToggleGiornoSpeciale
- `23881` — _ngRenderPannelloSpeciale
- `23949` — _generaGiornoSpecialeAI
- `24049` — _ngGiornoHaContenuto
- `24061` — _ngCreaPianoManuale
- `24084` — _ngScrollTabGiorni
- `24094` — _ngAbilitaDragScroll
- `24131` — _ngCambiaNumeroGiorni
- `24163` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `24177` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `24218` — _ngToggleCat
- `24227` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `24251` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `24407` — _ngSalvaPianoManuale
- `24433` — _ngParseIngrediente
- `24457` — _ngScomponiIngredienti
- `24469` — _ricCalcolaMacroDaIngredienti
- `24487` — _ricRicalcolaMacroLive
- `24494` — _ricAggiornaInfoMacro
- `24508` — _ricRicalcolaMacroLiveNow
- `24532` — _ngTrovaCategoriaAlimento
- `24565` — _ngPescaRicetta
- `24608` — _ngScomponiRicettaNelPasto
- `24645` — _ngDragStart
- `24656` — _ngDragStartCella
- `24667` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `24674` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `24679` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `24698` — _ngAggiungiAlimento
- `24723` — _ngRimuoviAlimento
- `24737` — _ngDopoModifica
- `24755` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `24808` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `24837` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `24854` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `24862` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `24934` — gramTestoCasalingo
- `24960` — _appendToggleNutrizionali
- `25003` — _appendTogglePromemoria
- `25032` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `25178` — cpFromEmoji
- `25184` — getEmojiCp
- `25203` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `23178` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `23200` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `23205` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `23231` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `23319` — _spesaTestoWhatsApp
- `23335` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `23380` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `23403` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `23431` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `23491` — scaricaListaSpesaPDF (download diretto, un click)
- `23499` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `23511` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 26351-26351

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
- `26351` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 26365-26577

- `26365` — salvaInbody
- `26435` — delInbody
- `26442` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `26577` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 26605-27074

- `26605` — buildSemLegenda
- `26619` — renderAlEditor
- `26680` — _alimNomeRegex
- `26688` — _alimGiorniDaPiano
- `26696` — _scanGiorniPerNome
- `26711` — scanRiferimentiAlimento
- `26740` — _alimRefsRighe
- `26746` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `26834` — modificaAlimentoCustom
- `26854` — ripristinaValoriPrecedentiAlimento
- `26866` — _resetAlimModal
- `26877` — apriNuovoAlimentoCustom
- `26883` — salvaAlimentoCustom
- `26950` — eliminaAlimentoCustom
- `26981` — _alimFonteBadge
- `26986` — renderAlimentiPage
- `22217` — E
- `27056` — archiviaAlimentoCustom
- `27074` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 27101-27528

- `27101` — _bcSetStatus
- `27103` — apriScannerBarcode
- `27111` — chiudiScannerBarcode
- `27116` — _bcStopCamera
- `27124` — _bcModaleAperto
- `27126` — _bcAvviaCamera
- `27137` — _bcAvviaNativo
- `27157` — _bcAvviaZXing
- `27166` — _bcZXStart
- `27177` — _bcErroreCamera
- `27185` — cercaBarcodeManuale
- `27191` — _barcodeTrovato
- `27207` — cercaBarcodeOFF
- `27225` — _bcProdottoNonTrovato
- `27239` — _bcPrecompilaForm
- `22477` — num
- `27263` — togAl
- `27316` — selCatAl
- `25402` — selTuttiAl
- `27360` — _appIdAnag  (P140 T1)
- `27370` — _appSyncPaz  (P140 T1)
- `27414` — _appSpecchioInverso  (P140 T2)
- `27440` — _appRitiraSpecchio  (P140 T2)
- `27471` — _appAncoraTappe  (P140 T2)
- `27490` — _appTappe  (P140 T2)
- `27511` — _appMigraPaziente  (P140 T1)
- `27521` — _appMigraTutti  (P140 T1)
- `27528` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 27544-28011

- `27544` — setCalView
- `27554` — calPrev
- `27555` — calNext
- `27556` — calToday
- `27558` — renderCal
- `27572` — renderCalMonth
- `27599` — renderCalWeek
- `27632` — renderCalDay
- `27683` — selGiorno
- `27697` — setDisp
- `27702` — openAddEvento
- `27715` — openAddEventoPaz
- `27721` — toggleEntrataCheck
- `27726` — salvaEvento
- `27768` — _evTestoPromemoria  (P140 T1)
- `27774` — openEvDetail
- `27829` — delEvento
- `27851` — copyMsg
- `27863` — aggDateCal
- `27020` — syncInizio
- `27021` — syncControllo
- `27876` — aggiornaPrev
- `27901` — apriEventoDaScheda  (P140 T2)
- `27915` — _appAggiornaOreScheda  (P140 T2)
- `27932` — renderRic
- `27959` — openNuovaRic
- `27960` — editRic
- `27970` — salvaRic
- `27995` — delRic
- `28011` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 28097-28157

- `28097` — aggiungiEntrataPerPaziente
- `28114` — openNuovaEntrata
- `28128` — salvaEntrata
- `28149` — delEntrata
- `28157` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 28187-28796

- `28187` — aiSuggerisciRicetta
- `28232` — renderConcettiModal
- `28251` — apriConcettiModal
- `28278` — salvaConcettiAllegati
- `28302` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `28340` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `28483` — loadInbodyPDF
- `28606` — _vitdLabel
- `28610` — getIntegratori
- `28614` — getIntegraWant
- `28618` — setIntegratori
- `28635` — setIntegraWant
- `28673` — getPatologieChip
- `28674` — getAllergieChip
- `28675` — setPatologieChip
- `28676` — setAllergieChip
- `28677` — getPatologie
- `28678` — getAllergie
- `28679` — setPatologieFromStr
- `28686` — setAllergieFromStr
- `28699` — getSdvChip
- `28700` — getCspChip
- `28701` — setSdvChip
- `28702` — setCspChip
- `28703` — setSdvFromStr
- `28704` — setCspFromStr
- `28708` — getBudget
- `28709` — setBudget
- `28714` — renderCalAnno
- `28745` — comprimeImmagine
- `28767` — uploadImmagineConcetto
- `28786` — rimuoviImmagineConcetto
- `28796` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 28862-28946

- `28862` — entraSelConcetti
- `28863` — annullaSelConcetti
- `28864` — toggleConcettoSel
- `28869` — eliminaConcettiSelezionati
- `28888` — confermaEliminaConcetti
- `28903` — aiRiscriviConcetto
- `28917` — editConcetto
- `28935` — salvaConcetto
- `28946` — openNuovoConcetto
- `27519` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 28983-28983

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
- `28983` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 29095-29420

- `29095` — renderScadenzeAlert
- `29355` — _scadGestiti  (P144)
- `29365` — _scadPota  (P144)
- `29380` — _scadMigraDaLocalStorage  (P144)
- `29403` — segnaGestito
- `29420` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 29429-29504

- `29429` — ripristinaPaz
- `29437` — eliminaPaz
- `29482` — getDove
- `29486` — setDove
- `29504` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 29509-29947

- `29509` — getCredenzialiPersistenti
- `29522` — cancellaCredenzialiPersistenti
- `29527` — rinnovaSessioneConRefreshToken
- `29544` — getSessioneSalvata
- `29563` — salvaSessione
- `29573` — cancellaSessione
- `29577` — eseguiLogin
- `29624` — eseguiLogout
- `29646` — mostraApp
- `29651` — verificaSessioneEAvvia
- `29679` — assicuraTokenValido
- `29708` — _garantiscoSessionePerSync
- `29720` — avviaRinnovoTokenPeriodico
- `29724` — fermaRinnovoTokenPeriodico
- `29733` — _authReset
- `29738` — _authMostra
- `29741` — mostraLogin
- `29742` — mostraRegistrazione
- `29743` — mostraRecupero
- `29744` — mostraNuovaPassword
- `29747` — eseguiRegistrazione
- `29785` — eseguiRecuperoPassword
- `29814` — eseguiNuovaPassword
- `29848` — _parseHashParams
- `29855` — _pulisciHash
- `29859` — gestisciRitornoAuth
- `29947` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 30019-30142

- `30019` — apriPannelloRicette
- `30048` — chiudiPannelloRicette
- `30056` — applicaRicettaPasto
- `30092` — inizializzaP2
- `30104` — deepClone
- `30108` — applicaPatch
- `30142` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
