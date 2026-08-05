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
**Ultimo rigenero automatico: 5 agosto 2026** (audit al contrario: correzione `selCatAl`, rinomina `verificaRegola_70_25_10`, ricette di sistema eliminabili, rimozione `applicaPatch`; poi P148 tappa 1: `_macrosCella`, `pastoMaxPerMacro`, `pastoMaxPerMacroTuttiIGiorni`; poi P148 tappa 2: `CATALOGO_INTEGRATORI` e i cinque helper di risoluzione etichette; poi P148 tappa 3: `renderCaselleIntegratori`, `mostraInfoIntegratore`, `_infoIntegratoreHtml`; poi P148 tappa 4: le dieci funzioni del pasto automatico e del ponte Clinica→Routine) — lo script ha corretto **3371 voci** in totale nella giornata; i range "Righe A-B" di sezione NON sono stati ricalcolati in questa passata (restano quelli del 26 lug, indicativi). Righe totali file: 30946.

> **Attenzione, lezione del 5 ago 2026:** `rigenera-index.js` RIALLINEA i numeri di riga delle voci già presenti, ma **non aggiunge le funzioni nuove**. Dopo la tappa 1 di P148 la suite era verde e l'indice "allineato" pur non contenendo nessuna delle tre funzioni appena scritte — il test `s1-doc-allineata` verifica che le voci elencate siano giuste, non che siano complete. Una funzione nuova va aggiunta a mano alla sezione giusta, altrimenti la prossima sessione non la trova e rischia di riscriverla. Stessa famiglia della regola 20: un controllo automatico verde non è una verifica di ciò che il controllo non guarda.

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
Righe 2345-2387

- `2345` — _slugAlimento
- `2353` — _catalogoIndicizza
- `2357` — _catalogoDeindicizza
- `2364` — costruisciCatalogo
- `2387` — risolviAlimento

---

### MACROS PIANO — calcolo e badge macro reali vs target
Righe 2402-2760

- `2402` — getValoriCREA
- `2414` — getCurrentPaziente
- `2449` — getKcalWeekend
- `2504` — getMacrosRicettaComposta
- `2521` — _macrosCella
- `2547` — calcolaMacrosPiano
- `2659` — pastoMaxPerMacro
- `2688` — pastoMaxPerMacroTuttiIGiorni
- `2694` — renderBadgeMacrosReali
- `2611` — pctStr
- `2612` — color
- `2625` — row
- `2760` — renderBadgeMacrosReali_DOM

---

### ANALISI DEL SANGUE — parsing, indici clinici derivati, interpretazione
Righe 3045-3252

- `3045` — _parseAnalisiNum
- `3053` — calcolaIndice
- `3226` — interpretaAnalisi
- `3238` — _interpAnalisiHtml
- `3252` — mostraInfoRange

---

### CONCETTI EDUCATIVI — sync Supabase, migrazione
Righe 3399-3423

- `3399` — pushConcetiSupabase
- `3409` — pullConcetiSupabase
- `3423` — migraConcetti

---

### ALIMENTI — categorie funzionali/semaforo, chip UI, equivalenze porzioni
Righe 3613-3985

- `3613` — getCategoriaSemaforo
- `3630` — _getCategorieGruppo
- `3644` — calcolaGrammaturaEquivalente
- `3696` — _gruppoEquiv  (P121: gruppo di equivalenza + criterio per categoria funzionale)
- `3702` — _porzioneStandard  (P121: porzione `g` di database dell'alimento)
- `3717` — suggerisciGrEquivalente  (P121: firma a 3 argomenti, il gruppo si deduce dai due alimenti)
- `3743` — _etichettaCriterio  (P121: ≈carbo / ≈prot / ≈grassi / fissa / porzione)
- `3763` — _promptAlternativeGrassi  (P121: riga del prompt AI generata dal motore)
- `3779` — ricalcolaAlternative  (P121: MOTORE UNICO, unico punto che scrive la grammatura di un'alternativa)
- `3798` — ricalcolaAlternativePiano  (P121: applica il motore a tutte le celle di un piano)
- `3847` — arrotondaGrammatura  (P121: sostituisce arrotondaPorzioneDiscreta — pezzi interi senza tetto / 5g)
- `3857` — getCategoriaFunzionale
- `3897` — catArr
- `3913` — _tagComuniTrova
- `3917` — getTagComuniChip
- `3920` — setTagComuniChip
- `3928` — setCatChips
- `3941` — getStagioniChip
- `3944` — setStagioniChip
- `3951` — getProfiloChip
- `3954` — setProfiloChip
- `3963` — wireChipGroup
- `3974` — wireAttrChipGroups
- `3985` — wireRadioChipGroup

---

### CONFIG / STORAGE LOCALE — cfg, localStorage db, util data/valuta
Righe 4013-4429

- `4013` — getCfg
- `4014` — saveCfgL
- `4015` — getUrl
- `4016` — saveLocal
- `4017` — loadLocal
- `4029` — uid
- `4047` — ymdLoc  (P141)
- `4052` — today
- `4060` — addDays
- `4068` — fData
- `4069` — fEur
- `4071` — getLastSyncText
- `4081` — getSyncColor
- `4088` — aggiornaStatoSync
- `4114` — setSyncStatus
- `4383` — _registraTombstone
- `4391` — _tombstoneAttivi
- `4403` — _fondiTombstones
- `4417` — _mergeTombstonesRemoti *(dal 24/7 legge il meta da `collections`, P74 1d)*
- `4429` — _applicaTombstones
- `4290` — _pazFetchMeta *(P74 1d — solo `collections`)*
- `4311` — _collectionsUpsert *(P74 — scrittura primaria dei 4 meta-record dal cutover 1d)*
- `4333` — _collectionsFetch *(P74 1d — lettura unica dei meta-record)*
- `4356` — _analisiSangueUpsert *(P74 fase 2 — scrittura ombra analisi del sangue, 24/7)*

---

### SYNC SUPABASE — push/pull ricette/pazienti, tombstones, conflitti (P69)
Righe 4453-4886

- `4453` — supaHeaders
- `4467` — pushRicetteSupabase
- `4538` — pullRicetteSupabase
- `4562` — delRicetteSupabase
- `4574` — delPazienteSupabase
- `4589` — pushToSheets
- `4633` — pullFromSheets
- `4712` — syncNow
- `4725` — sincronizzaTutto
- `4360` — stpSet
- `4365` — stpMsg
- `4856` — testConnSupabase
- `4886` — _p68LogSaveAnonimo

---

### SYNC SUPABASE — save paziente, piani/cache piano, entrate, eventi
Righe 4900-5422

- `4900` — save
- `4918` — _pushRigaPerId
- `4951` — _flushDirtyIds
- `5034` — _p69LoadBaseline
- `5037` — _p69StoreBaseline
- `5040` — _p69SetBaseline
- `5044` — _p69DropBaseline
- `5048` — _p69SetBaselineFromRows
- `5054` — _p69NomePaz
- `5059` — _p69InList
- `5067` — _p69RilevaConflitti
- `5103` — _p69DialogoConflitti
- `4738` — chiudi
- `5137` — _p69RisolviRicarica
- `5166` — _p69EsportaLocali
- `5179` — _p69RisolviSovrascrivi
- `5192` — pushPianoSupabase
- `5214` — pullPianiSupabase
- `5230` — delPianoSupabase
- `5246` — delPianiPazienteSupabase
- `5258` — pushCachePianoSupabase
- `5275` — caricaCachePianoSupabase
- `5297` — pushEntrateSupabase
- `5321` — pullEntrateSupabase
- `5335` — delEntrataSupabase
- `5343` — pushEntrataSupabase
- `5354` — pushEventoSupabase
- `5367` — pushEventiSupabase
- `5391` — pullEventiSupabase
- `5411` — delEventoSupabase
- `5422` — _pianoCacheKey

---

### UI GENERALE — config AI key, notifiche, navigazione (goTo/tab/modali)
Righe 5453-5564

- `5453` — _salvaPianoCache
- `5458` — _caricaPianoCache
- `5464` — salvaCfg
- `5465` — testConn
- `5472` — testaAntKey
- `5483` — initAntCard
- `5486` — esporta
- `5487` — importa
- `5492` — goTo
- `5508` — closeM
- `5516` — ngChiudiModale
- `5525` — ngChiudiPopupCoppia
- `5529` — ngAggiungiX
- `5540` — ngUpgradeModali
- `5560` — mTab
- `5561` — aggiornaEta
- `5562` — toggleOrarioNote
- `5563` — pdTab
- `5564` — notif

---

### PAZIENTI — registro: lista/card/kanban, apertura, editing, salvataggio, routine
Righe 5572-8893

- `5572` — getPazView
- `5573` — setPazView
- `5582` — _pazStatoPiano
- `5590` — _pazUrgenzaControllo
- `5605` — _pazBadgePrenotato  (P142)
- `5612` — pazSegnaArrivato  (P142)
- `5618` — _pazStatoTagHtml
- `5635` — _pazAggiornaFiltroRegimi
- `5643` — renderPaz
- `5701` — _renderPazCard
- `5726` — _renderPazLista
- `5753` — _renderPazKanban
- `5791` — openNuovoPaz
- `5818` — editPaz
- `5902` — REGOLE_SEMAFORO_ALIMENTI *(15 condizioni cliniche → grigi/celesti; globale dal 26/7 per essere verificabile dal test)*
- `6349` — _SEM_COLORI_LEGACY / `6105` _SEM_COLORI_AUTO *(F9 — unico vocabolario dei colori automatici)*
- `6354` — NOMI_CONDIZIONE_SEMAFORO *(etichette delle 15 condizioni, usate anche dal riquadro della scheda)*
- `6376` — _semaforoCondizioniAttive *(le condizioni spuntate su un paziente)*
- `6387` — _semaforoMigraPaziente *(F9 — toglie i colori legacy e ricalcola; idempotente)*
- `6398` — _semaforoMigraTutti *(passata su tutti i pazienti in memoria, con conteggio)*
- `6409` — applicaRegoloSemaforo *(dal 26/7 pulisce TUTTI e sei i colori automatici, non solo i suoi due)*
- `6497` — trovaChiaveAlimento *(match esatto sul nome: se non trova, la regola è ignorata in silenzio — vedi test s2-regole-nomi-alimenti)*
- `6521` — _pazNumOPrec *(F7 — campo assente = valore precedente, non azzeramento)*
- `6533` — _pazPreservaCampi *(F5 — l'anagrafica non cancella i campi che il form non gestisce)*
- `6539` — salvaPaz
- `6689` — openPaz
- `8277` — catalogoIntegratoriAttivi *(P148 — voci proponibili, esclude quelle ritirate)*
- `8281` — integratorePerChiave *(P148)*
- `8317` — _normEtichettaIntegr *(P148)*
- `8325` — chiaveIntegratore *(P148 — etichetta storica → chiave stabile, regola 21)*
- `8343` — migraEtichetteIntegratori *(P148 — {chiavi, liberi}: le sconosciute si conservano)*
- `8412` — integratoriDaSuggerireInRoutine *(P148 — ponte Clinica→Routine: suggerimento, mai aggiunta automatica)*
- `8428` — _suggerimentiDaClinicaHTML *(P148)*
- `8444` — renderPdRoutine
- `6723` — cardHTML
- `8613` — updateRoutineCampo
- `8621` — suggerisciPastoEQuando
- `8669` — pianoPiuRecenteDelPaziente *(P148 — piano più recente del paziente, già espanso)*
- `8682` — _macroRegolaRoutine *(P148 — 'g' o 'c' secondo la regolaOrario del catalogo)*
- `8690` — routineAmmetteAuto *(P148)*
- `8695` — routineSlotDelGiorno *(P148 — pasto di una voce IN UN GIORNO; la scelta manuale vince sempre)*
- `8706` — routineSlotPerGiornoNome *(P148 — stessa cosa per nome del giorno: è la forma usata dal PDF)*
- `8718` — routineAssegnazionePerGiorni *(P148 — [{giorno, slot}] per la scheda Routine)*
- `8731` — pesoAttualePaziente *(P148 — dall'InBody più recente, regola 10; mai congelato)*
- `8740` — doseIntegratoreRisolta *(P148 — dose per peso dei BCAA; senza referto non inventa numeri)*
- `8752` — filtroLibreria
- `8761` — renderLibreriaGrid
- `8782` — aggiungiDaLibreriaIdx
- `8811` — openModalRoutine
- `8818` — salvaRoutineVoce
- `8843` — salvaRoutine
- `8850` — mostraRoutinePopup
- `8878` — removeRoutineVoce
- `8893` — _renderAggiustamentiSection

---

### 📈 PERCORSO — timeline di periodizzazione (P115 Tappe 1-5 COMPLETE, 24 lug 2026)
Righe 6021-6621 (numeri ESATTI al 24/7 notte, dopo la Tappa 5). ⚠️ Questo blocco (~600 righe) fa slittare tutti i numeri delle sezioni SUCCESSIVE a riga ~6020 rispetto all'ultima rigenerazione completa: per quelle sezioni fare grep di conferma. Rigenerazione completa alla prossima modifica strutturale.

- `6735` — _PERCORSO_TIPI (const: tipi fase, colori, pct default)
- `6742` — _percorsoGet *(normalizza p.percorso, scarta fasi invalide)*
- `6766` — _percorsoIntervalli *(fasi consecutive → date concrete dal/al)*
- `6780` — _percorsoFaseAt *(fase attiva a una data; dal incluso, al escluso)*
- `6789` — _percorsoKcalFase *(pct → kcal indicative via calcolaTDEE)*
- `6812` — _percorsoProiezione *(Tappa 2 — proiezione ibrida teorica/calibrata, cono, obiettivo a intervallo)*
- `6870` — _percorsoDataBreve *(ISO → "12 set")*
- `6887` — _percorsoSerieEnergia *(Tappa 3 — serie introito/TDEE stimato/TDEE osservato per la corsia energia)*
- `6926` — _percorsoSerieMassaMagra *(Tappa 4 — solo InBody: punti {data,m,pg})*
- `6945` — _percorsoConsuntivo *(Tappa 5 — legge p.consuntivo scritto da P50: aderenza, extra kcal, ritardo=extra÷7700, settimane perse; oggi sempre ok:false)*
- `6987` — _PERCORSO_LAYERS_DEFAULT / _percorsoLayersState / _percorsoLayersGet *(Tappa 4 — stato interruttori, SOLO sessione, mai su p)*
- `6992` — percorsoLayerToggle *(Tappa 4 — inverte un solo strato)*
- `6998` — percorsoVistaPreset *(Tappa 4 — preset "tecnica"/"paziente")*
- `7014` — _percorsoPaz *(e a seguire i mutatori percorsoInit/SetInizio/AddFase/UpdFase/DelFase/MoveFase)*
- `7070` — _PERCORSO_MODELLI / _PERCORSO_GEN *(P122 T3 — 4 modelli + regole dei cicli)*
- `7088` — _percorsoGeneraFasi *(P122 T3 — pura: dal traguardo alle fasi, ritmo = quello della proiezione)*
- `7168` — _percorsoModelloSelectHtml
- `7177` — percorsoGeneraDaModello *(propone; conferma prima di sostituire fasi esistenti)*
- `7200` — _percorsoShiftGiorni *(pura: ancora = ultima pesata)*
- `7210` — percorsoRiallinea *(⏩ trasla il piano, riprende dal giorno-fase dell'interruzione)*
- `7237` — _TRG_TIPI / `6744` _TRG_COMPORTAMENTI *(P122 T4 — tipi di traguardo e libreria comportamenti)*
- `7259` — _traguardiGet · `6761` _traguardoValoreAttuale *(valore corrente dai dati esistenti, null se manca)*
- `7298` — _traguardoVerso *(auto: dedotto dalla partenza)* · `6803` _traguardoValuta · `6824` _traguardiValuta
- `7339` — traguardoAdd · `6852` traguardoUpd · `6867` traguardoDel · `6873` traguardoSegna
- `7397` — _COND_TIPI · `6897` _percorsoCondizione *(pura: la fase finisce per soglia — SOLO suggerimento)*
- `7413` — percorsoSetCondizione · `6927` percorsoChiudiFase *(esito fotografato, riapribile)*
- `7447` — _traguardiHtml *(blocco 🏁 in fondo alla scheda Percorso)*
- `7545` — _percorsoVistaPaz / `7049` _percorsoVistaPazAttiva *(P122 T5 — modalità di sessione)*
- `7552` — _percorsoVittorie *(pura: vittorie dall'inizio del percorso + flag ricomposizione)*
- `7590` — _percorsoNascondiPeso *(in fase di massa il peso non si mostra al paziente)*
- `7601` — _traguardoFaseCorrente *(traguardo della fase IN CORSO, non quello lontano)*
- `7629` — _traguardoTestoPaziente *(righe in italiano semplice, riusate dal messaggio WhatsApp)*
- `7662` — _vistaPazienteHtml *(i tre riquadri che guarda il paziente)*
- `7742` — _percorsoChartSvg *(due corsie: peso + massa magra + cono proiezione sopra, striscia aderenza in mezzo (solo con dati P50), energia (kcal) sotto — tutto gated dagli interruttori)*
- `7931` — renderPdPercorso *(scheda: badge fase, riga proiezione/obiettivo, riga Piano vs Realtà (solo con dati), toolbar interruttori, grafico, editor)*

*(Tappa 2 tocca anche `calcolaMacros`: box obiettivo con intervallo al posto della data secca.)*

---

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 8978-9149

- `8978` — salvaAggiustamento
- `9011` — eliminaAggiustamento
- `9020` — renderPdNote
- `9055` — salvaNotaClinica
- `9070` — deleteNota
- `9079` — saveNote
- `9099` — resetSemaforoAuto *(F9 — pulsante 🔄 Ricalcola: pulisce gli automatici e rifà col sistema valido; il motore LEGACY non esiste più)*
- `9149` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 9390-9588

- `9390` — avviaFX
- `9418` — avviaAnalisi
- `9435` — _renderFlussoPanel
- `9479` — _riepEsc
- `9483` — _riepNum
- `9489` — _riepDelta
- `9497` — _riepDataSig
- `9515` — _riepParseFX
- `8087` — clean
- `9529` — _riepAggiornaFX
- `9555` — _riepToggleDomandaDefault
- `9567` — _riepAddDomanda
- `9580` — _riepRemoveDomanda
- `9588` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 9800-10043

- `8218` — dCol
- `8336` — card
- `9800` — renderPdRagionamento
- `9888` — inviaMessaggioRag
- `9906` — concludiERiassumi
- `9920` — salvaRagionamento
- `9941` — apriGeneratoreDaRag
- `9949` — nuovaSessioneRag
- `9955` — cancellaSavedRag
- `9965` — renderPazTimeline
- `10002` — renderPdAnamnesi
- `10043` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 11991-13126

- `11991` — _anNorm *(P125 — testo confrontabile: minuscole, niente accenti)*
- `11997` — _anCorrisponde *(P125 — ricerca per parole-prefisso: "vit d" trova "Vitamina D")*
- `12003` — filtraAnalisi *(P125 — filtro dal vivo delle 119 voci)*
- `12037` — pulisciRicercaAnalisi
- `12043` — renderPdAnalisi
- `12099` — toggleAnalisiSection
- `12248` — loadAnalisiSanguePDF
- `12135` — _impPdfConfigurata
- `12136` — _impPdfLib
- `12146` — _impPdfApri
- `12159` — _impPdfPagina *(P124b — una pagina del PDF → immagine, con la rotazione RILEVATA, non quella dichiarata dal file)*
- `12180` — _impRuotaImmagine
- `12205` — _impRilevaRotazione *(P124b — chiamata piccola: di quanti gradi va girata la pagina)*
- `12224` — _impPromptPagina *(P124b — prompt di UNA pagina, con l'impronta della riga: valore+unità+riferimento)*
- `12423` — _impNormalizzaNumero *(P124 — numero all'italiana → punto decimale, conversione fatta dall'app e non dall'AI)*
- `12434` — _impNumeri
- `12442` — _impSembraIntervallo
- `12450` — _impUgualeAlRange
- `12459` — _impLimitiStd
- `12480` — _impFuoriScala
- `12489` — _impCorrezioneVirgola
- `12501` — _impTestoLimiti
- `12522` — _impRifPlausibile *(P124b — un "riferimento" che è un'unità di misura = riga disallineata)*
- `12535` — _impUnitaCanonica
- `12557` — _impStessaGrandezza *(P124b — stesso tipo di misura a meno del prefisso: nanomoli/micromoli/millimoli)*
- `12574` — _impUnitaCompatibili
- `12585` — _impControllaValore *(P124 — i controlli anti-errore su un valore estratto)*
- `12649` — mostraDiffAnalisi *(P124 — colonna Estratto modificabile + righe sospette deselezionate)*
- `12839` — _calcoloIncluso
- `12845` — toggleCalcoloIncluso
- `12867` — _renderCalcoliPannello
- `12908` — toggleGlossario
- `12913` — updateAnalisi
- `12972` — salvaAnalisi
- `12985` — applicaGruppoClinico
- `13014` — renderBoxGruppiCliniciSuggeriti
- `13046` — suggerisciGruppiClinici
- `13126` — renderMemoriaInbody

---
### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9176 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `10173` — _richVal
- `10180` — _richBmi
- `10185` — _richPat
- `10191` — _richNum
- `10236` — _richPreselezione
- `10252` — richLeggiIntestazione
- `10256` — richSalvaIntestazione
- `10265` — apriRichiestaAnalisi
- `10285` — _richModaleHtml
- `10361` — _richEsc
- `10363` — _richMotivoCambia
- `10369` — _richToggleSez
- `10375` — _richAggiornaConteggi
- `10383` — _richMotivoCorrente
- `10393` — _richSelezione
- `10408` — _richTxt
- `10414` — _richCostruisciPDF
- `8969` — nuovaPagina
- `8970` — spazio
- `10510` — _richNomeFile
- `10515` — _richPrepara
- `10528` — _richRegistra
- `10533` — _richStato
- `10535` — richScaricaPDF
- `10584` — _richUpload
- `10586` — _richWaUrl
- `10593` — _richTestoWa
- `10607` — richInviaWhatsApp
- `10647` — richCopiaLink
- `10668` — _richStoricoHtml

---
### REFERTI DEL SANGUE DATATI — storico nel tempo (P118 tappa 1)
Righe 9194-9387 — migrazione, ordinamento, quadro attuale derivato, barra di selezione.

- `11768` — _refertoNuovoId
- `11771` — _refertoOggi
- `11775` — _refertoDataIt
- `11781` — _refertoConteggio
- `11795` — _refertiMigra
- `11822` — _refertiOrdinati
- `11833` — _refertoPiuRecente
- `11838` — _refertoInVista
- `11856` — _refertiApplica
- `11869` — _refertoCrea
- `11888` — refertoCambiaVista
- `11894` — refertoCambiaData
- `11906` — refertoNuovo
- `11914` — refertoDuplica
- `11923` — refertoElimina
- `11938` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `11381` — _rangeNum
- `11387` — _rangeTestoDa
- `11406` — _rangeCoppia
- `11416` — _rangeHtml

---
### ANDAMENTO NEL TEMPO — tracciato, variazione, grafico grande (P118 tappa 3)
Righe 9441-9745 — serie storica, regola del colore, sparkline, pannello in fondo.

- `11458` — _andLimiti
- `11479` — _andParseRangeLab
- `11492` — _andDistanza
- `11499` — _andValutazione
- `11512` — _andSerie
- `11526` — _andNum
- `11530` — _andDataBreve
- `11535` — _andMeseAnno
- `11543` — _andDominio
- `11557` — _andColore
- `11570` — _andSparkHtml
- `11596` — _andRigaHtml
- `11618` — _andEsamiSeguibili
- `11626` — andScegliEsame
- `11632` — _andPannelloHtml
- `11685` — _andGraficoGrande
- `11736` — _andPasso

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 13176-15043

- `13176` — _ibFmtBreve
- `13638` — _renderPesiIntermediSection
- `13753` — aggiungiPesoIntermedio
- `13769` — eliminaPesoIntermedio
- `13779` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `15043` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 15351-15351

- `15351` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 15732-18814

- `15732` — aggiornaLabelMacros
- `15750` — calcolaMacros
- `15891` — applicaSchema
- `15926` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `15932` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `15954` — _misuraDaReferto *(P127 — UN referto letto con le regole del traguardo: usata anche dalla verifica al controllo)*
- `15987` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `15998` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `16016` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `16129` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `16143` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `16199` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `16213` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `16245` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `16278` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `16320` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `16328` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `16339` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `16366` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `16381` — _stradeVerso *(le strade complete + percentuale libera)*
- `16428` — _VC_TOLLERANZA_PCT / _VC_GIORNI_MIN / _VC_GIORNI_MIN_RITARO / _VC_COPERTURA_MIN_PCT / _VC_MAGRA_PRUDENZA_GG *(P127 — soglie cliniche della verifica)*
- `16438` — _mediaSlotPrescritta *(media pesata sui giorni di un campo dello storico target; la usa anche _kcalMediaPrescrittaOss)*
- `16458` — _vcDeficitSlot *(deficit di uno slot: campo offset o kcal−tdee per gli slot vecchi)*
- `16466` — _vcTratto *(P127 — cosa è cambiato fra due referti, previsto vs reale, TDEE misurato)*
- `16520` — _vcTraguardoSalvato *(traguardo ricostruito dal salvato, per la scheda Percorso)*
- `16530` — _verificaControllo *(P127 — motore puro: tratto recente, quadro dall'inizio, residuo al ritmo reale)*
- `16568` — _verificaControlloHtml *(blocco 🔎, unica fonte per pannello 🎯 e scheda Percorso; azioni solo dove c'è il campo kcal)*
- `16660` — _vcRitara *(scrive le kcal ritarate nel campo regime: propone, non salva)*
- `16673` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `16741` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `16763` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `16816` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `16923` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `16938` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `16963` — _renderRifPesoBox
- `17014` — _usaRifPeso
- `17018` — _aggiornaRifPesoTarget
- `17021` — _aggiornaRegimeSlider
- `17678` — _presetRegime
- `17682` — _initRegimeSliderDaPaziente
- `16633` — ricalcolaLAF
- `17860` — renderStoricoTDEE
- `17902` — attivaSlotTDEE
- `17919` — eliminaSlotTDEE
- `17932` — _toggleCiclizzazione
- `17938` — _aggiornaAnteprimaCiclizzazione
- `17956` — salvaCalcoloMacros
- `18271` — _metAllenamento
- `18510` — _neatFrazione
- `18629` — _larnLafStileVita
- `18646` — _regimeOffset
- `18656` — _componiRegimeText
- `18689` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `18701` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `18708` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `18814` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 18832-19276

- `18832` — renderTargetBadge
- `17819` — verificaRegola_75_20_5
- `17856` — renderBadge75_20_5
- `18977` — _validaNorm
- `18980` — _validaMatchTermine
- `18988` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `19039` — _validaTesto
- `19060` — validaPiano
- `19134` — _validaFirmaBlocchi
- `19141` — renderBadgeValidatore
- `19172` — _validaVaiAlGiorno
- `19181` — apriPannelloValidatore
- `13472` — esc
- `19238` — _validaEseguiOverride
- `19261` — validaGateExport
- `19276` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 19409-20041

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
- `19409` — pianoPazSelezionato
- `19556` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `19794` — renderPanelMacrosGiorno
- `19937` — pmgCambiaGrammi
- `19964` — riapriPiano
- `20002` — _montaPianoCorrente
- `20041` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 20051-20525

- `20051` — pullTemplateSupabase
- `20062` — delTemplateSupabase
- `20071` — _promptTemplateNome
- `20096` — _creaTemplateDaJSON
- `20119` — salvaComeTemplate
- `20130` — salvaComeTemplateDaPiano
- `20139` — _normNomeAlim
- `20140` — _escRegAlim
- `20141` — _raccogliAlimentiDaPiano
- `20152` — _alimentiEsclusiPaziente
- `20164` — _trovaConflittiTemplate
- `20182` — _mostraAvvisoConflitti
- `20206` — applicaTemplate
- `20224` — apriPickerTemplate
- `20252` — _pickPaziente
- `20276` — applicaTemplatePick
- `20280` — rinominaTemplate
- `20291` — eliminaTemplate
- `20301` — renderLibreriaTemplate
- `20330` — renderStoricoPiani
- `20389` — eliminaPiano
- `20405` — _getActiveMacrosTarget
- `20429` — getTargetAttivi
- `20466` — calcolaTargetsCiclizzazione
- `20492` — _setupPianoTargets
- `20516` — getStagioneCorrente
- `20525` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 20996-20996

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `20996` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 21005-21467

- `21005` — aggiornaUIcolazione
- `21015` — salvaRegolePiano
- `21076` — _isModelloSistema
- `21079` — _isModelloSistemaModificato
- `21091` — caricaModelliCustomLocal
- `21105` — salvaModelliCustomLocal
- `21126` — _migraRecordCustom
- `21144` — _syncAliasLegacy
- `21153` — caricaAlimentiCustom
- `21177` — pushAlimentiCustomSupabase
- `21187` — pullAlimentiCustomSupabase
- `21201` — pushModelliSupabase
- `21219` — pullModelliSupabase
- `21244` — _calcolaFreqDaModello
- `21263` — aggiornaUImodello
- `21352` — popolaDropdownModelli
- `21380` — cambiaModelloRotazione
- `21386` — ripristinaModelloOriginale
- `21409` — eliminaModelloCustom
- `21427` — mostraAnteprimaModello
- `21437` — apriEditorModello
- `21467` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 21736-21974

- `15738` — rerender
- `21736` — _salvaModelloDaEditor
- `21778` — caricaRegolePiano
- `21808` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `21843` — _aiLogUsage
- `21865` — _aiProxyUrl
- `21871` — _aiTokenPerProxy
- `21900` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `21974` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 22053-22193

- `16216` — _risolviCollisioniCelle
- `22053` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `22113` — getFruttaStile
- `22120` — _fruttaGetPasto
- `22130` — _fruttaContaRigheRicetta
- `22134` — _fruttaIndiceBasePasto
- `22154` — getFruttaMarker
- `22167` — fruttaMarkerHtml
- `22175` — _fruttaCheckboxHtml
- `22184` — toggleFrutta
- `22193` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 22229-23503

- `22229` — _renderCelleGriglia
- `22309` — _renderRicetteTestuali
- `22348` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `22419` — _renderCelleHtml
- `22427` — toggleCellaMenu
- `22446` — closeAllCellaMenus
- `22454` — _trovaPasto
- `22462` — cellaSposta
- `22516` — cellaCancella
- `22537` — apriEditGrammatura
- `16789` — salva
- `22585` — cellaSwap
- `22605` — cellaRimuoviAlt
- `22619` — cellaAggiungiAlt
- `22722` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `22807` — apriEditRicetta
- `22816` — aggiungiRicetta
- `22832` — rimuoviRicetta
- `22841` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `23003` — ngAggiungiSpuntinoVuoto
- `23019` — apriAggiungiCella
- `17254` — risolviCompatibili
- `23115` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `23207` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `23348` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `23503` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 23551-23943

- `23551` — _attesoStrutturaPiano
- `23571` — _confrontaStrutturaPiano
- `23601` — _costruisciPromptDelta
- `23628` — _pianoToolSchema
- `23703` — _pianoMaxTokens
- `23712` — _estraiPianoDaRisposta
- `23734` — chiamaGeneraPiano
- `23901` — mostraLoadingSteps
- `18123` — render
- `23943` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 24010-24587

- `24010` — generaMessaggioAI
- `24115` — copiaMessaggioAI
- `24125` — salvaInStorico
- `24137` — salvaVarianteAI
- `24152` — renderVariantiSalvate
- `24171` — usaVariante
- `24189` — eliminaVariante
- `24200` — renderStoricoMsg
- `24216` — apriWhatsApp
- `24587` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 24765-26262

- `24765` — _ngColoreSemaforoNome
- `24773` — apriSceltaModalitaPiano
- `24808` — _ngChiudiModalita
- `24811` — _ngCostruisciGiornoVuoto
- `24844` — _ngCostruisciGiornoSpeciale
- `24855` — _ngIndiceInizioSpeciali
- `24866` — _ngModalitaNomeGiorno
- `24872` — _ngImpostaModalitaNomeGiorno
- `24875` — _ngLettera
- `24882` — _ngEtichettaGiorno
- `24902` — _ngEtichettaGiornoBreve
- `24916` — _ngToggleGiornoSpeciale
- `24940` — _ngRenderPannelloSpeciale
- `25008` — _generaGiornoSpecialeAI
- `25108` — _ngGiornoHaContenuto
- `25120` — _ngCreaPianoManuale
- `25143` — _ngScrollTabGiorni
- `25153` — _ngAbilitaDragScroll
- `25190` — _ngCambiaNumeroGiorni
- `25222` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `25236` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `25277` — _ngToggleCat
- `25286` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `25310` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `25466` — _ngSalvaPianoManuale
- `25492` — _ngParseIngrediente
- `25516` — _ngScomponiIngredienti
- `25528` — _ricCalcolaMacroDaIngredienti
- `25546` — _ricRicalcolaMacroLive
- `25553` — _ricAggiornaInfoMacro
- `25567` — _ricRicalcolaMacroLiveNow
- `25591` — _ngTrovaCategoriaAlimento
- `25624` — _ngPescaRicetta
- `25667` — _ngScomponiRicettaNelPasto
- `25704` — _ngDragStart
- `25715` — _ngDragStartCella
- `25726` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `25733` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `25738` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `25757` — _ngAggiungiAlimento
- `25782` — _ngRimuoviAlimento
- `25796` — _ngDopoModifica
- `25814` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `25867` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `25896` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `25913` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `25921` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `25993` — gramTestoCasalingo
- `26019` — _appendToggleNutrizionali
- `26062` — _appendTogglePromemoria
- `26091` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `26237` — cpFromEmoji
- `26243` — getEmojiCp
- `26262` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `24237` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `24259` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `24264` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `24290` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `24378` — _spesaTestoWhatsApp
- `24394` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `24439` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `24462` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `24490` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `24550` — scaricaListaSpesaPDF (download diretto, un click)
- `24558` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `24570` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 27414-27414

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
- `27414` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 27428-27640

- `27428` — salvaInbody
- `27498` — delInbody
- `27505` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `27640` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 27668-28153

- `27668` — buildSemLegenda
- `27682` — renderAlEditor
- `27757` — _alimNomeRegex
- `27765` — _alimGiorniDaPiano
- `27773` — _scanGiorniPerNome
- `27788` — scanRiferimentiAlimento
- `27817` — _alimRefsRighe
- `27823` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `27911` — modificaAlimentoCustom
- `27931` — ripristinaValoriPrecedentiAlimento
- `27943` — _resetAlimModal
- `27955` — apriNuovoAlimentoCustom
- `27961` — salvaAlimentoCustom
- `28029` — eliminaAlimentoCustom
- `28060` — _alimFonteBadge
- `28065` — renderAlimentiPage
- `22217` — E
- `28135` — archiviaAlimentoCustom
- `28153` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 28180-28774

- `28180` — _bcSetStatus
- `28182` — apriScannerBarcode
- `28190` — chiudiScannerBarcode
- `28195` — _bcStopCamera
- `28203` — _bcModaleAperto
- `28205` — _bcAvviaCamera
- `28216` — _bcAvviaNativo
- `28236` — _bcAvviaZXing
- `28245` — _bcZXStart
- `28256` — _bcErroreCamera
- `28264` — cercaBarcodeManuale
- `28270` — _barcodeTrovato
- `28400` — cercaBarcodeOFF
- `28428` — _bcProdottoNonTrovato
- `28443` — _bcPrecompilaForm
- `22477` — num
- `28488` — togAl
- `28541` — selCatAl
- `25402` — selTuttiAl
- `28606` — _appIdAnag  (P140 T1)
- `28616` — _appSyncPaz  (P140 T1)
- `28660` — _appSpecchioInverso  (P140 T2)
- `28686` — _appRitiraSpecchio  (P140 T2)
- `28717` — _appAncoraTappe  (P140 T2)
- `28736` — _appTappe  (P140 T2)
- `28757` — _appMigraPaziente  (P140 T1)
- `28767` — _appMigraTutti  (P140 T1)
- `28774` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 28790-29259

- `28790` — setCalView
- `28800` — calPrev
- `28801` — calNext
- `28802` — calToday
- `28804` — renderCal
- `28818` — renderCalMonth
- `28845` — renderCalWeek
- `28878` — renderCalDay
- `28929` — selGiorno
- `28943` — setDisp
- `28948` — openAddEvento
- `28961` — openAddEventoPaz
- `28967` — toggleEntrataCheck
- `28972` — salvaEvento
- `29014` — _evTestoPromemoria  (P140 T1)
- `29020` — openEvDetail
- `29075` — delEvento
- `29097` — copyMsg
- `29109` — aggDateCal
- `27020` — syncInizio
- `27021` — syncControllo
- `29122` — aggiornaPrev
- `29147` — apriEventoDaScheda  (P140 T2)
- `29161` — _appAggiornaOreScheda  (P140 T2)
- `29178` — renderRic
- `29205` — openNuovaRic
- `29206` — editRic
- `29216` — salvaRic
- `29241` — delRic
- `29259` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 29345-29405

- `29345` — aggiungiEntrataPerPaziente
- `29362` — openNuovaEntrata
- `29376` — salvaEntrata
- `29397` — delEntrata
- `29405` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 29435-30150

- `29435` — aiSuggerisciRicetta
- `29480` — renderConcettiModal
- `29499` — apriConcettiModal
- `29526` — salvaConcettiAllegati
- `29550` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `29588` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `29731` — loadInbodyPDF
- `29852` — _vitdLabel
- `29856` — getIntegratori
- `29860` — getIntegraWant
- `29873` — _chiaviSpuntate *(P148 — risolve le etichette salvate in chiavi, regola 21)*
- `29881` — setIntegratori
- `29898` — setIntegraWant
- `29926` — _infoIntegratoreHtml *(P148 — contenuto del pannello ⓘ)*
- `29954` — mostraInfoIntegratore *(P148 — apre/chiude il pannello sotto la griglia)*
- `29966` — renderCaselleIntegratori *(P148 — genera le caselle dal catalogo; va chiamata PRIMA di setIntegratori, altrimenti le spunte non trovano gli elementi)*
- `30027` — getPatologieChip
- `30028` — getAllergieChip
- `30029` — setPatologieChip
- `30030` — setAllergieChip
- `30031` — getPatologie
- `30032` — getAllergie
- `30033` — setPatologieFromStr
- `30040` — setAllergieFromStr
- `30053` — getSdvChip
- `30054` — getCspChip
- `30055` — setSdvChip
- `30056` — setCspChip
- `30057` — setSdvFromStr
- `30058` — setCspFromStr
- `30062` — getBudget
- `30063` — setBudget
- `30068` — renderCalAnno
- `30099` — comprimeImmagine
- `30121` — uploadImmagineConcetto
- `30140` — rimuoviImmagineConcetto
- `30150` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 30216-30300

- `30216` — entraSelConcetti
- `30217` — annullaSelConcetti
- `30218` — toggleConcettoSel
- `30223` — eliminaConcettiSelezionati
- `30242` — confermaEliminaConcetti
- `30257` — aiRiscriviConcetto
- `30271` — editConcetto
- `30289` — salvaConcetto
- `30300` — openNuovoConcetto
- `27519` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 30337-30337

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
- `30337` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 30449-30774

- `30449` — renderScadenzeAlert
- `30709` — _scadGestiti  (P144)
- `30719` — _scadPota  (P144)
- `30734` — _scadMigraDaLocalStorage  (P144)
- `30757` — segnaGestito
- `30774` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 30783-30858

- `30783` — ripristinaPaz
- `30791` — eliminaPaz
- `30836` — getDove
- `30840` — setDove
- `30858` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 30863-31301

- `30863` — getCredenzialiPersistenti
- `30876` — cancellaCredenzialiPersistenti
- `30881` — rinnovaSessioneConRefreshToken
- `30898` — getSessioneSalvata
- `30917` — salvaSessione
- `30927` — cancellaSessione
- `30931` — eseguiLogin
- `30978` — eseguiLogout
- `31000` — mostraApp
- `31005` — verificaSessioneEAvvia
- `31033` — assicuraTokenValido
- `31062` — _garantiscoSessionePerSync
- `31074` — avviaRinnovoTokenPeriodico
- `31078` — fermaRinnovoTokenPeriodico
- `31087` — _authReset
- `31092` — _authMostra
- `31095` — mostraLogin
- `31096` — mostraRegistrazione
- `31097` — mostraRecupero
- `31098` — mostraNuovaPassword
- `31101` — eseguiRegistrazione
- `31139` — eseguiRecuperoPassword
- `31168` — eseguiNuovaPassword
- `31202` — _parseHashParams
- `31209` — _pulisciHash
- `31213` — gestisciRitornoAuth
- `31301` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 31373-31474

- `31373` — apriPannelloRicette
- `31402` — chiudiPannelloRicette
- `31410` — applicaRicettaPasto
- `31446` — inizializzaP2
- `31458` — deepClone
- `30143` — applicaPatch
- `31474` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
