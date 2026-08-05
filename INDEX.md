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
Righe 2353-2395

- `2353` — _slugAlimento
- `2361` — _catalogoIndicizza
- `2365` — _catalogoDeindicizza
- `2372` — costruisciCatalogo
- `2395` — risolviAlimento

---

### MACROS PIANO — calcolo e badge macro reali vs target
Righe 2410-2768

- `2410` — getValoriCREA
- `2422` — getCurrentPaziente
- `2457` — getKcalWeekend
- `2512` — getMacrosRicettaComposta
- `2529` — _macrosCella
- `2555` — calcolaMacrosPiano
- `2667` — pastoMaxPerMacro
- `2696` — pastoMaxPerMacroTuttiIGiorni
- `2702` — renderBadgeMacrosReali
- `2611` — pctStr
- `2612` — color
- `2625` — row
- `2768` — renderBadgeMacrosReali_DOM

---

### ANALISI DEL SANGUE — parsing, indici clinici derivati, interpretazione
Righe 3053-3260

- `3053` — _parseAnalisiNum
- `3061` — calcolaIndice
- `3234` — interpretaAnalisi
- `3246` — _interpAnalisiHtml
- `3260` — mostraInfoRange

---

### CONCETTI EDUCATIVI — sync Supabase, migrazione
Righe 3407-3431

- `3407` — pushConcetiSupabase
- `3417` — pullConcetiSupabase
- `3431` — migraConcetti

---

### ALIMENTI — categorie funzionali/semaforo, chip UI, equivalenze porzioni
Righe 3621-3993

- `3621` — getCategoriaSemaforo
- `3638` — _getCategorieGruppo
- `3652` — calcolaGrammaturaEquivalente
- `3704` — _gruppoEquiv  (P121: gruppo di equivalenza + criterio per categoria funzionale)
- `3710` — _porzioneStandard  (P121: porzione `g` di database dell'alimento)
- `3725` — suggerisciGrEquivalente  (P121: firma a 3 argomenti, il gruppo si deduce dai due alimenti)
- `3751` — _etichettaCriterio  (P121: ≈carbo / ≈prot / ≈grassi / fissa / porzione)
- `3771` — _promptAlternativeGrassi  (P121: riga del prompt AI generata dal motore)
- `3787` — ricalcolaAlternative  (P121: MOTORE UNICO, unico punto che scrive la grammatura di un'alternativa)
- `3806` — ricalcolaAlternativePiano  (P121: applica il motore a tutte le celle di un piano)
- `3855` — arrotondaGrammatura  (P121: sostituisce arrotondaPorzioneDiscreta — pezzi interi senza tetto / 5g)
- `3865` — getCategoriaFunzionale
- `3905` — catArr
- `3921` — _tagComuniTrova
- `3925` — getTagComuniChip
- `3928` — setTagComuniChip
- `3936` — setCatChips
- `3949` — getStagioniChip
- `3952` — setStagioniChip
- `3959` — getProfiloChip
- `3962` — setProfiloChip
- `3971` — wireChipGroup
- `3982` — wireAttrChipGroups
- `3993` — wireRadioChipGroup

---

### CONFIG / STORAGE LOCALE — cfg, localStorage db, util data/valuta
Righe 4021-4437

- `4021` — getCfg
- `4022` — saveCfgL
- `4023` — getUrl
- `4024` — saveLocal
- `4025` — loadLocal
- `4037` — uid
- `4055` — ymdLoc  (P141)
- `4060` — today
- `4068` — addDays
- `4076` — fData
- `4077` — fEur
- `4079` — getLastSyncText
- `4089` — getSyncColor
- `4096` — aggiornaStatoSync
- `4122` — setSyncStatus
- `4391` — _registraTombstone
- `4399` — _tombstoneAttivi
- `4411` — _fondiTombstones
- `4425` — _mergeTombstonesRemoti *(dal 24/7 legge il meta da `collections`, P74 1d)*
- `4437` — _applicaTombstones
- `4298` — _pazFetchMeta *(P74 1d — solo `collections`)*
- `4319` — _collectionsUpsert *(P74 — scrittura primaria dei 4 meta-record dal cutover 1d)*
- `4341` — _collectionsFetch *(P74 1d — lettura unica dei meta-record)*
- `4364` — _analisiSangueUpsert *(P74 fase 2 — scrittura ombra analisi del sangue, 24/7)*

---

### SYNC SUPABASE — push/pull ricette/pazienti, tombstones, conflitti (P69)
Righe 4461-4894

- `4461` — supaHeaders
- `4475` — pushRicetteSupabase
- `4546` — pullRicetteSupabase
- `4570` — delRicetteSupabase
- `4582` — delPazienteSupabase
- `4597` — pushToSheets
- `4641` — pullFromSheets
- `4720` — syncNow
- `4733` — sincronizzaTutto
- `4360` — stpSet
- `4365` — stpMsg
- `4864` — testConnSupabase
- `4894` — _p68LogSaveAnonimo

---

### SYNC SUPABASE — save paziente, piani/cache piano, entrate, eventi
Righe 4908-5430

- `4908` — save
- `4926` — _pushRigaPerId
- `4959` — _flushDirtyIds
- `5042` — _p69LoadBaseline
- `5045` — _p69StoreBaseline
- `5048` — _p69SetBaseline
- `5052` — _p69DropBaseline
- `5056` — _p69SetBaselineFromRows
- `5062` — _p69NomePaz
- `5067` — _p69InList
- `5075` — _p69RilevaConflitti
- `5111` — _p69DialogoConflitti
- `4738` — chiudi
- `5145` — _p69RisolviRicarica
- `5174` — _p69EsportaLocali
- `5187` — _p69RisolviSovrascrivi
- `5200` — pushPianoSupabase
- `5222` — pullPianiSupabase
- `5238` — delPianoSupabase
- `5254` — delPianiPazienteSupabase
- `5266` — pushCachePianoSupabase
- `5283` — caricaCachePianoSupabase
- `5305` — pushEntrateSupabase
- `5329` — pullEntrateSupabase
- `5343` — delEntrataSupabase
- `5351` — pushEntrataSupabase
- `5362` — pushEventoSupabase
- `5375` — pushEventiSupabase
- `5399` — pullEventiSupabase
- `5419` — delEventoSupabase
- `5430` — _pianoCacheKey

---

### UI GENERALE — config AI key, notifiche, navigazione (goTo/tab/modali)
Righe 5461-5572

- `5461` — _salvaPianoCache
- `5466` — _caricaPianoCache
- `5472` — salvaCfg
- `5473` — testConn
- `5480` — testaAntKey
- `5491` — initAntCard
- `5494` — esporta
- `5495` — importa
- `5500` — goTo
- `5516` — closeM
- `5524` — ngChiudiModale
- `5533` — ngChiudiPopupCoppia
- `5537` — ngAggiungiX
- `5548` — ngUpgradeModali
- `5568` — mTab
- `5569` — aggiornaEta
- `5570` — toggleOrarioNote
- `5571` — pdTab
- `5572` — notif

---

### PAZIENTI — registro: lista/card/kanban, apertura, editing, salvataggio, routine
Righe 5580-9009

- `5580` — getPazView
- `5581` — setPazView
- `5590` — _pazStatoPiano
- `5598` — _pazUrgenzaControllo
- `5613` — _pazBadgePrenotato  (P142)
- `5620` — pazSegnaArrivato  (P142)
- `5626` — _pazStatoTagHtml
- `5643` — _pazAggiornaFiltroRegimi
- `5651` — renderPaz
- `5709` — _renderPazCard
- `5734` — _renderPazLista
- `5761` — _renderPazKanban
- `5799` — openNuovoPaz
- `5826` — editPaz
- `5910` — REGOLE_SEMAFORO_ALIMENTI *(15 condizioni cliniche → grigi/celesti; globale dal 26/7 per essere verificabile dal test)*
- `6357` — _SEM_COLORI_LEGACY / `6105` _SEM_COLORI_AUTO *(F9 — unico vocabolario dei colori automatici)*
- `6362` — NOMI_CONDIZIONE_SEMAFORO *(etichette delle 15 condizioni, usate anche dal riquadro della scheda)*
- `6384` — _semaforoCondizioniAttive *(le condizioni spuntate su un paziente)*
- `6395` — _semaforoMigraPaziente *(F9 — toglie i colori legacy e ricalcola; idempotente)*
- `6406` — _semaforoMigraTutti *(passata su tutti i pazienti in memoria, con conteggio)*
- `6518` — applicaRegoloSemaforo *(dal 26/7 pulisce TUTTI e sei i colori automatici, non solo i suoi due)*
- `6613` — trovaChiaveAlimento *(match esatto sul nome: se non trova, la regola è ignorata in silenzio — vedi test s2-regole-nomi-alimenti)*
- `6637` — _pazNumOPrec *(F7 — campo assente = valore precedente, non azzeramento)*
- `6649` — _pazPreservaCampi *(F5 — l'anagrafica non cancella i campi che il form non gestisce)*
- `6655` — salvaPaz
- `6805` — openPaz
- `8393` — catalogoIntegratoriAttivi *(P148 — voci proponibili, esclude quelle ritirate)*
- `8397` — integratorePerChiave *(P148)*
- `8433` — _normEtichettaIntegr *(P148)*
- `8441` — chiaveIntegratore *(P148 — etichetta storica → chiave stabile, regola 21)*
- `8459` — migraEtichetteIntegratori *(P148 — {chiavi, liberi}: le sconosciute si conservano)*
- `8528` — integratoriDaSuggerireInRoutine *(P148 — ponte Clinica→Routine: suggerimento, mai aggiunta automatica)*
- `8544` — _suggerimentiDaClinicaHTML *(P148)*
- `8560` — renderPdRoutine
- `6723` — cardHTML
- `8729` — updateRoutineCampo
- `8737` — suggerisciPastoEQuando
- `8785` — pianoPiuRecenteDelPaziente *(P148 — piano più recente del paziente, già espanso)*
- `8798` — _macroRegolaRoutine *(P148 — 'g' o 'c' secondo la regolaOrario del catalogo)*
- `8806` — routineAmmetteAuto *(P148)*
- `8811` — routineSlotDelGiorno *(P148 — pasto di una voce IN UN GIORNO; la scelta manuale vince sempre)*
- `8822` — routineSlotPerGiornoNome *(P148 — stessa cosa per nome del giorno: è la forma usata dal PDF)*
- `8834` — routineAssegnazionePerGiorni *(P148 — [{giorno, slot}] per la scheda Routine)*
- `8847` — pesoAttualePaziente *(P148 — dall'InBody più recente, regola 10; mai congelato)*
- `8856` — doseIntegratoreRisolta *(P148 — dose per peso dei BCAA; senza referto non inventa numeri)*
- `8868` — filtroLibreria
- `8877` — renderLibreriaGrid
- `8898` — aggiungiDaLibreriaIdx
- `8927` — openModalRoutine
- `8934` — salvaRoutineVoce
- `8959` — salvaRoutine
- `8966` — mostraRoutinePopup
- `8994` — removeRoutineVoce
- `9009` — _renderAggiustamentiSection

---

### 📈 PERCORSO — timeline di periodizzazione (P115 Tappe 1-5 COMPLETE, 24 lug 2026)
Righe 6021-6621 (numeri ESATTI al 24/7 notte, dopo la Tappa 5). ⚠️ Questo blocco (~600 righe) fa slittare tutti i numeri delle sezioni SUCCESSIVE a riga ~6020 rispetto all'ultima rigenerazione completa: per quelle sezioni fare grep di conferma. Rigenerazione completa alla prossima modifica strutturale.

- `6851` — _PERCORSO_TIPI (const: tipi fase, colori, pct default)
- `6858` — _percorsoGet *(normalizza p.percorso, scarta fasi invalide)*
- `6882` — _percorsoIntervalli *(fasi consecutive → date concrete dal/al)*
- `6896` — _percorsoFaseAt *(fase attiva a una data; dal incluso, al escluso)*
- `6905` — _percorsoKcalFase *(pct → kcal indicative via calcolaTDEE)*
- `6928` — _percorsoProiezione *(Tappa 2 — proiezione ibrida teorica/calibrata, cono, obiettivo a intervallo)*
- `6986` — _percorsoDataBreve *(ISO → "12 set")*
- `7003` — _percorsoSerieEnergia *(Tappa 3 — serie introito/TDEE stimato/TDEE osservato per la corsia energia)*
- `7042` — _percorsoSerieMassaMagra *(Tappa 4 — solo InBody: punti {data,m,pg})*
- `7061` — _percorsoConsuntivo *(Tappa 5 — legge p.consuntivo scritto da P50: aderenza, extra kcal, ritardo=extra÷7700, settimane perse; oggi sempre ok:false)*
- `7103` — _PERCORSO_LAYERS_DEFAULT / _percorsoLayersState / _percorsoLayersGet *(Tappa 4 — stato interruttori, SOLO sessione, mai su p)*
- `7108` — percorsoLayerToggle *(Tappa 4 — inverte un solo strato)*
- `7114` — percorsoVistaPreset *(Tappa 4 — preset "tecnica"/"paziente")*
- `7130` — _percorsoPaz *(e a seguire i mutatori percorsoInit/SetInizio/AddFase/UpdFase/DelFase/MoveFase)*
- `7186` — _PERCORSO_MODELLI / _PERCORSO_GEN *(P122 T3 — 4 modelli + regole dei cicli)*
- `7204` — _percorsoGeneraFasi *(P122 T3 — pura: dal traguardo alle fasi, ritmo = quello della proiezione)*
- `7284` — _percorsoModelloSelectHtml
- `7293` — percorsoGeneraDaModello *(propone; conferma prima di sostituire fasi esistenti)*
- `7316` — _percorsoShiftGiorni *(pura: ancora = ultima pesata)*
- `7326` — percorsoRiallinea *(⏩ trasla il piano, riprende dal giorno-fase dell'interruzione)*
- `7353` — _TRG_TIPI / `6744` _TRG_COMPORTAMENTI *(P122 T4 — tipi di traguardo e libreria comportamenti)*
- `7375` — _traguardiGet · `6761` _traguardoValoreAttuale *(valore corrente dai dati esistenti, null se manca)*
- `7414` — _traguardoVerso *(auto: dedotto dalla partenza)* · `6803` _traguardoValuta · `6824` _traguardiValuta
- `7455` — traguardoAdd · `6852` traguardoUpd · `6867` traguardoDel · `6873` traguardoSegna
- `7513` — _COND_TIPI · `6897` _percorsoCondizione *(pura: la fase finisce per soglia — SOLO suggerimento)*
- `7529` — percorsoSetCondizione · `6927` percorsoChiudiFase *(esito fotografato, riapribile)*
- `7563` — _traguardiHtml *(blocco 🏁 in fondo alla scheda Percorso)*
- `7661` — _percorsoVistaPaz / `7049` _percorsoVistaPazAttiva *(P122 T5 — modalità di sessione)*
- `7668` — _percorsoVittorie *(pura: vittorie dall'inizio del percorso + flag ricomposizione)*
- `7706` — _percorsoNascondiPeso *(in fase di massa il peso non si mostra al paziente)*
- `7717` — _traguardoFaseCorrente *(traguardo della fase IN CORSO, non quello lontano)*
- `7745` — _traguardoTestoPaziente *(righe in italiano semplice, riusate dal messaggio WhatsApp)*
- `7778` — _vistaPazienteHtml *(i tre riquadri che guarda il paziente)*
- `7858` — _percorsoChartSvg *(due corsie: peso + massa magra + cono proiezione sopra, striscia aderenza in mezzo (solo con dati P50), energia (kcal) sotto — tutto gated dagli interruttori)*
- `8047` — renderPdPercorso *(scheda: badge fase, riga proiezione/obiettivo, riga Piano vs Realtà (solo con dati), toolbar interruttori, grafico, editor)*

*(Tappa 2 tocca anche `calcolaMacros`: box obiettivo con intervallo al posto della data secca.)*

---

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 9094-9265

- `9094` — salvaAggiustamento
- `9127` — eliminaAggiustamento
- `9136` — renderPdNote
- `9171` — salvaNotaClinica
- `9186` — deleteNota
- `9195` — saveNote
- `9215` — resetSemaforoAuto *(F9 — pulsante 🔄 Ricalcola: pulisce gli automatici e rifà col sistema valido; il motore LEGACY non esiste più)*
- `9265` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 9506-9704

- `9506` — avviaFX
- `9534` — avviaAnalisi
- `9551` — _renderFlussoPanel
- `9595` — _riepEsc
- `9599` — _riepNum
- `9605` — _riepDelta
- `9613` — _riepDataSig
- `9631` — _riepParseFX
- `8087` — clean
- `9645` — _riepAggiornaFX
- `9671` — _riepToggleDomandaDefault
- `9683` — _riepAddDomanda
- `9696` — _riepRemoveDomanda
- `9704` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 9916-10159

- `8218` — dCol
- `8336` — card
- `9916` — renderPdRagionamento
- `10004` — inviaMessaggioRag
- `10022` — concludiERiassumi
- `10036` — salvaRagionamento
- `10057` — apriGeneratoreDaRag
- `10065` — nuovaSessioneRag
- `10071` — cancellaSavedRag
- `10081` — renderPazTimeline
- `10118` — renderPdAnamnesi
- `10159` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 12107-13242

- `12107` — _anNorm *(P125 — testo confrontabile: minuscole, niente accenti)*
- `12113` — _anCorrisponde *(P125 — ricerca per parole-prefisso: "vit d" trova "Vitamina D")*
- `12119` — filtraAnalisi *(P125 — filtro dal vivo delle 119 voci)*
- `12153` — pulisciRicercaAnalisi
- `12159` — renderPdAnalisi
- `12215` — toggleAnalisiSection
- `12364` — loadAnalisiSanguePDF
- `12251` — _impPdfConfigurata
- `12252` — _impPdfLib
- `12262` — _impPdfApri
- `12275` — _impPdfPagina *(P124b — una pagina del PDF → immagine, con la rotazione RILEVATA, non quella dichiarata dal file)*
- `12296` — _impRuotaImmagine
- `12321` — _impRilevaRotazione *(P124b — chiamata piccola: di quanti gradi va girata la pagina)*
- `12340` — _impPromptPagina *(P124b — prompt di UNA pagina, con l'impronta della riga: valore+unità+riferimento)*
- `12539` — _impNormalizzaNumero *(P124 — numero all'italiana → punto decimale, conversione fatta dall'app e non dall'AI)*
- `12550` — _impNumeri
- `12558` — _impSembraIntervallo
- `12566` — _impUgualeAlRange
- `12575` — _impLimitiStd
- `12596` — _impFuoriScala
- `12605` — _impCorrezioneVirgola
- `12617` — _impTestoLimiti
- `12638` — _impRifPlausibile *(P124b — un "riferimento" che è un'unità di misura = riga disallineata)*
- `12651` — _impUnitaCanonica
- `12673` — _impStessaGrandezza *(P124b — stesso tipo di misura a meno del prefisso: nanomoli/micromoli/millimoli)*
- `12690` — _impUnitaCompatibili
- `12701` — _impControllaValore *(P124 — i controlli anti-errore su un valore estratto)*
- `12765` — mostraDiffAnalisi *(P124 — colonna Estratto modificabile + righe sospette deselezionate)*
- `12955` — _calcoloIncluso
- `12961` — toggleCalcoloIncluso
- `12983` — _renderCalcoliPannello
- `13024` — toggleGlossario
- `13029` — updateAnalisi
- `13088` — salvaAnalisi
- `13101` — applicaGruppoClinico
- `13130` — renderBoxGruppiCliniciSuggeriti
- `13162` — suggerisciGruppiClinici
- `13242` — renderMemoriaInbody

---
### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9176 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `10289` — _richVal
- `10296` — _richBmi
- `10301` — _richPat
- `10307` — _richNum
- `10352` — _richPreselezione
- `10368` — richLeggiIntestazione
- `10372` — richSalvaIntestazione
- `10381` — apriRichiestaAnalisi
- `10401` — _richModaleHtml
- `10477` — _richEsc
- `10479` — _richMotivoCambia
- `10485` — _richToggleSez
- `10491` — _richAggiornaConteggi
- `10499` — _richMotivoCorrente
- `10509` — _richSelezione
- `10524` — _richTxt
- `10530` — _richCostruisciPDF
- `8969` — nuovaPagina
- `8970` — spazio
- `10626` — _richNomeFile
- `10631` — _richPrepara
- `10644` — _richRegistra
- `10649` — _richStato
- `10651` — richScaricaPDF
- `10700` — _richUpload
- `10702` — _richWaUrl
- `10709` — _richTestoWa
- `10723` — richInviaWhatsApp
- `10763` — richCopiaLink
- `10784` — _richStoricoHtml

---
### REFERTI DEL SANGUE DATATI — storico nel tempo (P118 tappa 1)
Righe 9194-9387 — migrazione, ordinamento, quadro attuale derivato, barra di selezione.

- `11884` — _refertoNuovoId
- `11887` — _refertoOggi
- `11891` — _refertoDataIt
- `11897` — _refertoConteggio
- `11911` — _refertiMigra
- `11938` — _refertiOrdinati
- `11949` — _refertoPiuRecente
- `11954` — _refertoInVista
- `11972` — _refertiApplica
- `11985` — _refertoCrea
- `12004` — refertoCambiaVista
- `12010` — refertoCambiaData
- `12022` — refertoNuovo
- `12030` — refertoDuplica
- `12039` — refertoElimina
- `12054` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `11497` — _rangeNum
- `11503` — _rangeTestoDa
- `11522` — _rangeCoppia
- `11532` — _rangeHtml

---
### ANDAMENTO NEL TEMPO — tracciato, variazione, grafico grande (P118 tappa 3)
Righe 9441-9745 — serie storica, regola del colore, sparkline, pannello in fondo.

- `11574` — _andLimiti
- `11595` — _andParseRangeLab
- `11608` — _andDistanza
- `11615` — _andValutazione
- `11628` — _andSerie
- `11642` — _andNum
- `11646` — _andDataBreve
- `11651` — _andMeseAnno
- `11659` — _andDominio
- `11673` — _andColore
- `11686` — _andSparkHtml
- `11712` — _andRigaHtml
- `11734` — _andEsamiSeguibili
- `11742` — andScegliEsame
- `11748` — _andPannelloHtml
- `11801` — _andGraficoGrande
- `11852` — _andPasso

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 13292-15159

- `13292` — _ibFmtBreve
- `13754` — _renderPesiIntermediSection
- `13869` — aggiungiPesoIntermedio
- `13885` — eliminaPesoIntermedio
- `13895` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `15159` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 15467-15467

- `15467` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 15848-18930

- `15848` — aggiornaLabelMacros
- `15866` — calcolaMacros
- `16007` — applicaSchema
- `16042` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `16048` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `16070` — _misuraDaReferto *(P127 — UN referto letto con le regole del traguardo: usata anche dalla verifica al controllo)*
- `16103` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `16114` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `16132` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `16245` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `16259` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `16315` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `16329` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `16361` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `16394` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `16436` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `16444` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `16455` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `16482` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `16497` — _stradeVerso *(le strade complete + percentuale libera)*
- `16544` — _VC_TOLLERANZA_PCT / _VC_GIORNI_MIN / _VC_GIORNI_MIN_RITARO / _VC_COPERTURA_MIN_PCT / _VC_MAGRA_PRUDENZA_GG *(P127 — soglie cliniche della verifica)*
- `16554` — _mediaSlotPrescritta *(media pesata sui giorni di un campo dello storico target; la usa anche _kcalMediaPrescrittaOss)*
- `16574` — _vcDeficitSlot *(deficit di uno slot: campo offset o kcal−tdee per gli slot vecchi)*
- `16582` — _vcTratto *(P127 — cosa è cambiato fra due referti, previsto vs reale, TDEE misurato)*
- `16636` — _vcTraguardoSalvato *(traguardo ricostruito dal salvato, per la scheda Percorso)*
- `16646` — _verificaControllo *(P127 — motore puro: tratto recente, quadro dall'inizio, residuo al ritmo reale)*
- `16684` — _verificaControlloHtml *(blocco 🔎, unica fonte per pannello 🎯 e scheda Percorso; azioni solo dove c'è il campo kcal)*
- `16776` — _vcRitara *(scrive le kcal ritarate nel campo regime: propone, non salva)*
- `16789` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `16857` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `16879` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `16932` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `17039` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `17054` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `17079` — _renderRifPesoBox
- `17130` — _usaRifPeso
- `17134` — _aggiornaRifPesoTarget
- `17137` — _aggiornaRegimeSlider
- `17794` — _presetRegime
- `17798` — _initRegimeSliderDaPaziente
- `16633` — ricalcolaLAF
- `17976` — renderStoricoTDEE
- `18018` — attivaSlotTDEE
- `18035` — eliminaSlotTDEE
- `18048` — _toggleCiclizzazione
- `18054` — _aggiornaAnteprimaCiclizzazione
- `18072` — salvaCalcoloMacros
- `18387` — _metAllenamento
- `18626` — _neatFrazione
- `18745` — _larnLafStileVita
- `18762` — _regimeOffset
- `18772` — _componiRegimeText
- `18805` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `18817` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `18824` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `18930` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 18948-19392

- `18948` — renderTargetBadge
- `17819` — verificaRegola_75_20_5
- `17856` — renderBadge75_20_5
- `19093` — _validaNorm
- `19096` — _validaMatchTermine
- `19104` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `19155` — _validaTesto
- `19176` — validaPiano
- `19250` — _validaFirmaBlocchi
- `19257` — renderBadgeValidatore
- `19288` — _validaVaiAlGiorno
- `19297` — apriPannelloValidatore
- `13472` — esc
- `19354` — _validaEseguiOverride
- `19377` — validaGateExport
- `19392` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 19525-20157

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
- `19525` — pianoPazSelezionato
- `19672` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `19910` — renderPanelMacrosGiorno
- `20053` — pmgCambiaGrammi
- `20080` — riapriPiano
- `20118` — _montaPianoCorrente
- `20157` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 20167-20641

- `20167` — pullTemplateSupabase
- `20178` — delTemplateSupabase
- `20187` — _promptTemplateNome
- `20212` — _creaTemplateDaJSON
- `20235` — salvaComeTemplate
- `20246` — salvaComeTemplateDaPiano
- `20255` — _normNomeAlim
- `20256` — _escRegAlim
- `20257` — _raccogliAlimentiDaPiano
- `20268` — _alimentiEsclusiPaziente
- `20280` — _trovaConflittiTemplate
- `20298` — _mostraAvvisoConflitti
- `20322` — applicaTemplate
- `20340` — apriPickerTemplate
- `20368` — _pickPaziente
- `20392` — applicaTemplatePick
- `20396` — rinominaTemplate
- `20407` — eliminaTemplate
- `20417` — renderLibreriaTemplate
- `20446` — renderStoricoPiani
- `20505` — eliminaPiano
- `20521` — _getActiveMacrosTarget
- `20545` — getTargetAttivi
- `20582` — calcolaTargetsCiclizzazione
- `20608` — _setupPianoTargets
- `20632` — getStagioneCorrente
- `20641` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 21112-21112

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `21112` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 21121-21583

- `21121` — aggiornaUIcolazione
- `21131` — salvaRegolePiano
- `21192` — _isModelloSistema
- `21195` — _isModelloSistemaModificato
- `21207` — caricaModelliCustomLocal
- `21221` — salvaModelliCustomLocal
- `21242` — _migraRecordCustom
- `21260` — _syncAliasLegacy
- `21269` — caricaAlimentiCustom
- `21293` — pushAlimentiCustomSupabase
- `21303` — pullAlimentiCustomSupabase
- `21317` — pushModelliSupabase
- `21335` — pullModelliSupabase
- `21360` — _calcolaFreqDaModello
- `21379` — aggiornaUImodello
- `21468` — popolaDropdownModelli
- `21496` — cambiaModelloRotazione
- `21502` — ripristinaModelloOriginale
- `21525` — eliminaModelloCustom
- `21543` — mostraAnteprimaModello
- `21553` — apriEditorModello
- `21583` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 21852-22090

- `15738` — rerender
- `21852` — _salvaModelloDaEditor
- `21894` — caricaRegolePiano
- `21924` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `21959` — _aiLogUsage
- `21981` — _aiProxyUrl
- `21987` — _aiTokenPerProxy
- `22016` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `22090` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 22169-22309

- `16216` — _risolviCollisioniCelle
- `22169` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `22229` — getFruttaStile
- `22236` — _fruttaGetPasto
- `22246` — _fruttaContaRigheRicetta
- `22250` — _fruttaIndiceBasePasto
- `22270` — getFruttaMarker
- `22283` — fruttaMarkerHtml
- `22291` — _fruttaCheckboxHtml
- `22300` — toggleFrutta
- `22309` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 22345-23619

- `22345` — _renderCelleGriglia
- `22425` — _renderRicetteTestuali
- `22464` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `22535` — _renderCelleHtml
- `22543` — toggleCellaMenu
- `22562` — closeAllCellaMenus
- `22570` — _trovaPasto
- `22578` — cellaSposta
- `22632` — cellaCancella
- `22653` — apriEditGrammatura
- `16789` — salva
- `22701` — cellaSwap
- `22721` — cellaRimuoviAlt
- `22735` — cellaAggiungiAlt
- `22838` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `22923` — apriEditRicetta
- `22932` — aggiungiRicetta
- `22948` — rimuoviRicetta
- `22957` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `23119` — ngAggiungiSpuntinoVuoto
- `23135` — apriAggiungiCella
- `17254` — risolviCompatibili
- `23231` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `23323` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `23464` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `23619` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 23667-24059

- `23667` — _attesoStrutturaPiano
- `23687` — _confrontaStrutturaPiano
- `23717` — _costruisciPromptDelta
- `23744` — _pianoToolSchema
- `23819` — _pianoMaxTokens
- `23828` — _estraiPianoDaRisposta
- `23850` — chiamaGeneraPiano
- `24017` — mostraLoadingSteps
- `18123` — render
- `24059` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 24126-24703

- `24126` — generaMessaggioAI
- `24231` — copiaMessaggioAI
- `24241` — salvaInStorico
- `24253` — salvaVarianteAI
- `24268` — renderVariantiSalvate
- `24287` — usaVariante
- `24305` — eliminaVariante
- `24316` — renderStoricoMsg
- `24332` — apriWhatsApp
- `24703` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 24881-26378

- `24881` — _ngColoreSemaforoNome
- `24889` — apriSceltaModalitaPiano
- `24924` — _ngChiudiModalita
- `24927` — _ngCostruisciGiornoVuoto
- `24960` — _ngCostruisciGiornoSpeciale
- `24971` — _ngIndiceInizioSpeciali
- `24982` — _ngModalitaNomeGiorno
- `24988` — _ngImpostaModalitaNomeGiorno
- `24991` — _ngLettera
- `24998` — _ngEtichettaGiorno
- `25018` — _ngEtichettaGiornoBreve
- `25032` — _ngToggleGiornoSpeciale
- `25056` — _ngRenderPannelloSpeciale
- `25124` — _generaGiornoSpecialeAI
- `25224` — _ngGiornoHaContenuto
- `25236` — _ngCreaPianoManuale
- `25259` — _ngScrollTabGiorni
- `25269` — _ngAbilitaDragScroll
- `25306` — _ngCambiaNumeroGiorni
- `25338` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `25352` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `25393` — _ngToggleCat
- `25402` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `25426` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `25582` — _ngSalvaPianoManuale
- `25608` — _ngParseIngrediente
- `25632` — _ngScomponiIngredienti
- `25644` — _ricCalcolaMacroDaIngredienti
- `25662` — _ricRicalcolaMacroLive
- `25669` — _ricAggiornaInfoMacro
- `25683` — _ricRicalcolaMacroLiveNow
- `25707` — _ngTrovaCategoriaAlimento
- `25740` — _ngPescaRicetta
- `25783` — _ngScomponiRicettaNelPasto
- `25820` — _ngDragStart
- `25831` — _ngDragStartCella
- `25842` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `25849` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `25854` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `25873` — _ngAggiungiAlimento
- `25898` — _ngRimuoviAlimento
- `25912` — _ngDopoModifica
- `25930` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `25983` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `26012` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `26029` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `26037` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `26109` — gramTestoCasalingo
- `26135` — _appendToggleNutrizionali
- `26178` — _appendTogglePromemoria
- `26207` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `26353` — cpFromEmoji
- `26359` — getEmojiCp
- `26378` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `24353` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `24375` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `24380` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `24406` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `24494` — _spesaTestoWhatsApp
- `24510` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `24555` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `24578` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `24606` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `24666` — scaricaListaSpesaPDF (download diretto, un click)
- `24674` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `24686` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 27530-27530

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
- `27530` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 27544-27756

- `27544` — salvaInbody
- `27614` — delInbody
- `27621` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `27756` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 27784-28549

- `27784` — buildSemLegenda
- `27798` — renderAlEditor
- `27873` — _alimNomeRegex
- `27881` — _alimGiorniDaPiano
- `27889` — _scanGiorniPerNome
- `27904` — scanRiferimentiAlimento
- `27933` — _alimRefsRighe
- `27939` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `28027` — modificaAlimentoCustom
- `28047` — ripristinaValoriPrecedentiAlimento
- `28059` — _resetAlimModal
- `28071` — apriNuovoAlimentoCustom
- `28077` — salvaAlimentoCustom
- `28147` — eliminaAlimentoCustom
- `28455` — _alimFonteBadge
- `28460` — renderAlimentiPage
- `22217` — E
- `28531` — archiviaAlimentoCustom
- `28549` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 28576-29212

- `28576` — _bcSetStatus
- `28578` — apriScannerBarcode
- `28586` — chiudiScannerBarcode
- `28591` — _bcStopCamera
- `28599` — _bcModaleAperto
- `28601` — _bcAvviaCamera
- `28612` — _bcAvviaNativo
- `28632` — _bcAvviaZXing
- `28641` — _bcZXStart
- `28652` — _bcErroreCamera
- `28660` — cercaBarcodeManuale
- `28666` — _barcodeTrovato
- `28837` — cercaBarcodeOFF
- `28866` — _bcProdottoNonTrovato
- `28881` — _bcPrecompilaForm
- `22477` — num
- `28926` — togAl
- `28979` — selCatAl
- `25402` — selTuttiAl
- `29044` — _appIdAnag  (P140 T1)
- `29054` — _appSyncPaz  (P140 T1)
- `29098` — _appSpecchioInverso  (P140 T2)
- `29124` — _appRitiraSpecchio  (P140 T2)
- `29155` — _appAncoraTappe  (P140 T2)
- `29174` — _appTappe  (P140 T2)
- `29195` — _appMigraPaziente  (P140 T1)
- `29205` — _appMigraTutti  (P140 T1)
- `29212` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 29228-29697

- `29228` — setCalView
- `29238` — calPrev
- `29239` — calNext
- `29240` — calToday
- `29242` — renderCal
- `29256` — renderCalMonth
- `29283` — renderCalWeek
- `29316` — renderCalDay
- `29367` — selGiorno
- `29381` — setDisp
- `29386` — openAddEvento
- `29399` — openAddEventoPaz
- `29405` — toggleEntrataCheck
- `29410` — salvaEvento
- `29452` — _evTestoPromemoria  (P140 T1)
- `29458` — openEvDetail
- `29513` — delEvento
- `29535` — copyMsg
- `29547` — aggDateCal
- `27020` — syncInizio
- `27021` — syncControllo
- `29560` — aggiornaPrev
- `29585` — apriEventoDaScheda  (P140 T2)
- `29599` — _appAggiornaOreScheda  (P140 T2)
- `29616` — renderRic
- `29643` — openNuovaRic
- `29644` — editRic
- `29654` — salvaRic
- `29679` — delRic
- `29697` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 29783-29843

- `29783` — aggiungiEntrataPerPaziente
- `29800` — openNuovaEntrata
- `29814` — salvaEntrata
- `29835` — delEntrata
- `29843` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 29873-30588

- `29873` — aiSuggerisciRicetta
- `29918` — renderConcettiModal
- `29937` — apriConcettiModal
- `29964` — salvaConcettiAllegati
- `29988` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `30026` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `30169` — loadInbodyPDF
- `30290` — _vitdLabel
- `30294` — getIntegratori
- `30298` — getIntegraWant
- `30311` — _chiaviSpuntate *(P148 — risolve le etichette salvate in chiavi, regola 21)*
- `30319` — setIntegratori
- `30336` — setIntegraWant
- `30364` — _infoIntegratoreHtml *(P148 — contenuto del pannello ⓘ)*
- `30392` — mostraInfoIntegratore *(P148 — apre/chiude il pannello sotto la griglia)*
- `30404` — renderCaselleIntegratori *(P148 — genera le caselle dal catalogo; va chiamata PRIMA di setIntegratori, altrimenti le spunte non trovano gli elementi)*
- `30465` — getPatologieChip
- `30466` — getAllergieChip
- `30467` — setPatologieChip
- `30468` — setAllergieChip
- `30469` — getPatologie
- `30470` — getAllergie
- `30471` — setPatologieFromStr
- `30478` — setAllergieFromStr
- `30491` — getSdvChip
- `30492` — getCspChip
- `30493` — setSdvChip
- `30494` — setCspChip
- `30495` — setSdvFromStr
- `30496` — setCspFromStr
- `30500` — getBudget
- `30501` — setBudget
- `30506` — renderCalAnno
- `30537` — comprimeImmagine
- `30559` — uploadImmagineConcetto
- `30578` — rimuoviImmagineConcetto
- `30588` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 30654-30738

- `30654` — entraSelConcetti
- `30655` — annullaSelConcetti
- `30656` — toggleConcettoSel
- `30661` — eliminaConcettiSelezionati
- `30680` — confermaEliminaConcetti
- `30695` — aiRiscriviConcetto
- `30709` — editConcetto
- `30727` — salvaConcetto
- `30738` — openNuovoConcetto
- `27519` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 30775-30775

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
- `30775` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 30887-31212

- `30887` — renderScadenzeAlert
- `31147` — _scadGestiti  (P144)
- `31157` — _scadPota  (P144)
- `31172` — _scadMigraDaLocalStorage  (P144)
- `31195` — segnaGestito
- `31212` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 31221-31296

- `31221` — ripristinaPaz
- `31229` — eliminaPaz
- `31274` — getDove
- `31278` — setDove
- `31296` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 31301-31739

- `31301` — getCredenzialiPersistenti
- `31314` — cancellaCredenzialiPersistenti
- `31319` — rinnovaSessioneConRefreshToken
- `31336` — getSessioneSalvata
- `31355` — salvaSessione
- `31365` — cancellaSessione
- `31369` — eseguiLogin
- `31416` — eseguiLogout
- `31438` — mostraApp
- `31443` — verificaSessioneEAvvia
- `31471` — assicuraTokenValido
- `31500` — _garantiscoSessionePerSync
- `31512` — avviaRinnovoTokenPeriodico
- `31516` — fermaRinnovoTokenPeriodico
- `31525` — _authReset
- `31530` — _authMostra
- `31533` — mostraLogin
- `31534` — mostraRegistrazione
- `31535` — mostraRecupero
- `31536` — mostraNuovaPassword
- `31539` — eseguiRegistrazione
- `31577` — eseguiRecuperoPassword
- `31606` — eseguiNuovaPassword
- `31640` — _parseHashParams
- `31647` — _pulisciHash
- `31651` — gestisciRitornoAuth
- `31739` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 31811-31912

- `31811` — apriPannelloRicette
- `31840` — chiudiPannelloRicette
- `31848` — applicaRicettaPasto
- `31884` — inizializzaP2
- `31896` — deepClone
- `30143` — applicaPatch
- `31912` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
