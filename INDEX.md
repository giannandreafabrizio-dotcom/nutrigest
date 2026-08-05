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
Righe 5580-9061

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
- `6561` — applicaRegoloSemaforo *(dal 26/7 pulisce TUTTI e sei i colori automatici, non solo i suoi due)*
- `6665` — trovaChiaveAlimento *(match esatto sul nome: se non trova, la regola è ignorata in silenzio — vedi test s2-regole-nomi-alimenti)*
- `6689` — _pazNumOPrec *(F7 — campo assente = valore precedente, non azzeramento)*
- `6701` — _pazPreservaCampi *(F5 — l'anagrafica non cancella i campi che il form non gestisce)*
- `6707` — salvaPaz
- `6857` — openPaz
- `8445` — catalogoIntegratoriAttivi *(P148 — voci proponibili, esclude quelle ritirate)*
- `8449` — integratorePerChiave *(P148)*
- `8485` — _normEtichettaIntegr *(P148)*
- `8493` — chiaveIntegratore *(P148 — etichetta storica → chiave stabile, regola 21)*
- `8511` — migraEtichetteIntegratori *(P148 — {chiavi, liberi}: le sconosciute si conservano)*
- `8580` — integratoriDaSuggerireInRoutine *(P148 — ponte Clinica→Routine: suggerimento, mai aggiunta automatica)*
- `8596` — _suggerimentiDaClinicaHTML *(P148)*
- `8612` — renderPdRoutine
- `6723` — cardHTML
- `8781` — updateRoutineCampo
- `8789` — suggerisciPastoEQuando
- `8837` — pianoPiuRecenteDelPaziente *(P148 — piano più recente del paziente, già espanso)*
- `8850` — _macroRegolaRoutine *(P148 — 'g' o 'c' secondo la regolaOrario del catalogo)*
- `8858` — routineAmmetteAuto *(P148)*
- `8863` — routineSlotDelGiorno *(P148 — pasto di una voce IN UN GIORNO; la scelta manuale vince sempre)*
- `8874` — routineSlotPerGiornoNome *(P148 — stessa cosa per nome del giorno: è la forma usata dal PDF)*
- `8886` — routineAssegnazionePerGiorni *(P148 — [{giorno, slot}] per la scheda Routine)*
- `8899` — pesoAttualePaziente *(P148 — dall'InBody più recente, regola 10; mai congelato)*
- `8908` — doseIntegratoreRisolta *(P148 — dose per peso dei BCAA; senza referto non inventa numeri)*
- `8920` — filtroLibreria
- `8929` — renderLibreriaGrid
- `8950` — aggiungiDaLibreriaIdx
- `8979` — openModalRoutine
- `8986` — salvaRoutineVoce
- `9011` — salvaRoutine
- `9018` — mostraRoutinePopup
- `9046` — removeRoutineVoce
- `9061` — _renderAggiustamentiSection

---

### 📈 PERCORSO — timeline di periodizzazione (P115 Tappe 1-5 COMPLETE, 24 lug 2026)
Righe 6021-6621 (numeri ESATTI al 24/7 notte, dopo la Tappa 5). ⚠️ Questo blocco (~600 righe) fa slittare tutti i numeri delle sezioni SUCCESSIVE a riga ~6020 rispetto all'ultima rigenerazione completa: per quelle sezioni fare grep di conferma. Rigenerazione completa alla prossima modifica strutturale.

- `6903` — _PERCORSO_TIPI (const: tipi fase, colori, pct default)
- `6910` — _percorsoGet *(normalizza p.percorso, scarta fasi invalide)*
- `6934` — _percorsoIntervalli *(fasi consecutive → date concrete dal/al)*
- `6948` — _percorsoFaseAt *(fase attiva a una data; dal incluso, al escluso)*
- `6957` — _percorsoKcalFase *(pct → kcal indicative via calcolaTDEE)*
- `6980` — _percorsoProiezione *(Tappa 2 — proiezione ibrida teorica/calibrata, cono, obiettivo a intervallo)*
- `7038` — _percorsoDataBreve *(ISO → "12 set")*
- `7055` — _percorsoSerieEnergia *(Tappa 3 — serie introito/TDEE stimato/TDEE osservato per la corsia energia)*
- `7094` — _percorsoSerieMassaMagra *(Tappa 4 — solo InBody: punti {data,m,pg})*
- `7113` — _percorsoConsuntivo *(Tappa 5 — legge p.consuntivo scritto da P50: aderenza, extra kcal, ritardo=extra÷7700, settimane perse; oggi sempre ok:false)*
- `7155` — _PERCORSO_LAYERS_DEFAULT / _percorsoLayersState / _percorsoLayersGet *(Tappa 4 — stato interruttori, SOLO sessione, mai su p)*
- `7160` — percorsoLayerToggle *(Tappa 4 — inverte un solo strato)*
- `7166` — percorsoVistaPreset *(Tappa 4 — preset "tecnica"/"paziente")*
- `7182` — _percorsoPaz *(e a seguire i mutatori percorsoInit/SetInizio/AddFase/UpdFase/DelFase/MoveFase)*
- `7238` — _PERCORSO_MODELLI / _PERCORSO_GEN *(P122 T3 — 4 modelli + regole dei cicli)*
- `7256` — _percorsoGeneraFasi *(P122 T3 — pura: dal traguardo alle fasi, ritmo = quello della proiezione)*
- `7336` — _percorsoModelloSelectHtml
- `7345` — percorsoGeneraDaModello *(propone; conferma prima di sostituire fasi esistenti)*
- `7368` — _percorsoShiftGiorni *(pura: ancora = ultima pesata)*
- `7378` — percorsoRiallinea *(⏩ trasla il piano, riprende dal giorno-fase dell'interruzione)*
- `7405` — _TRG_TIPI / `6744` _TRG_COMPORTAMENTI *(P122 T4 — tipi di traguardo e libreria comportamenti)*
- `7427` — _traguardiGet · `6761` _traguardoValoreAttuale *(valore corrente dai dati esistenti, null se manca)*
- `7466` — _traguardoVerso *(auto: dedotto dalla partenza)* · `6803` _traguardoValuta · `6824` _traguardiValuta
- `7507` — traguardoAdd · `6852` traguardoUpd · `6867` traguardoDel · `6873` traguardoSegna
- `7565` — _COND_TIPI · `6897` _percorsoCondizione *(pura: la fase finisce per soglia — SOLO suggerimento)*
- `7581` — percorsoSetCondizione · `6927` percorsoChiudiFase *(esito fotografato, riapribile)*
- `7615` — _traguardiHtml *(blocco 🏁 in fondo alla scheda Percorso)*
- `7713` — _percorsoVistaPaz / `7049` _percorsoVistaPazAttiva *(P122 T5 — modalità di sessione)*
- `7720` — _percorsoVittorie *(pura: vittorie dall'inizio del percorso + flag ricomposizione)*
- `7758` — _percorsoNascondiPeso *(in fase di massa il peso non si mostra al paziente)*
- `7769` — _traguardoFaseCorrente *(traguardo della fase IN CORSO, non quello lontano)*
- `7797` — _traguardoTestoPaziente *(righe in italiano semplice, riusate dal messaggio WhatsApp)*
- `7830` — _vistaPazienteHtml *(i tre riquadri che guarda il paziente)*
- `7910` — _percorsoChartSvg *(due corsie: peso + massa magra + cono proiezione sopra, striscia aderenza in mezzo (solo con dati P50), energia (kcal) sotto — tutto gated dagli interruttori)*
- `8099` — renderPdPercorso *(scheda: badge fase, riga proiezione/obiettivo, riga Piano vs Realtà (solo con dati), toolbar interruttori, grafico, editor)*

*(Tappa 2 tocca anche `calcolaMacros`: box obiettivo con intervallo al posto della data secca.)*

---

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 9146-9317

- `9146` — salvaAggiustamento
- `9179` — eliminaAggiustamento
- `9188` — renderPdNote
- `9223` — salvaNotaClinica
- `9238` — deleteNota
- `9247` — saveNote
- `9267` — resetSemaforoAuto *(F9 — pulsante 🔄 Ricalcola: pulisce gli automatici e rifà col sistema valido; il motore LEGACY non esiste più)*
- `9317` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 9558-9756

- `9558` — avviaFX
- `9586` — avviaAnalisi
- `9603` — _renderFlussoPanel
- `9647` — _riepEsc
- `9651` — _riepNum
- `9657` — _riepDelta
- `9665` — _riepDataSig
- `9683` — _riepParseFX
- `8087` — clean
- `9697` — _riepAggiornaFX
- `9723` — _riepToggleDomandaDefault
- `9735` — _riepAddDomanda
- `9748` — _riepRemoveDomanda
- `9756` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 9968-10211

- `8218` — dCol
- `8336` — card
- `9968` — renderPdRagionamento
- `10056` — inviaMessaggioRag
- `10074` — concludiERiassumi
- `10088` — salvaRagionamento
- `10109` — apriGeneratoreDaRag
- `10117` — nuovaSessioneRag
- `10123` — cancellaSavedRag
- `10133` — renderPazTimeline
- `10170` — renderPdAnamnesi
- `10211` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 12159-13294

- `12159` — _anNorm *(P125 — testo confrontabile: minuscole, niente accenti)*
- `12165` — _anCorrisponde *(P125 — ricerca per parole-prefisso: "vit d" trova "Vitamina D")*
- `12171` — filtraAnalisi *(P125 — filtro dal vivo delle 119 voci)*
- `12205` — pulisciRicercaAnalisi
- `12211` — renderPdAnalisi
- `12267` — toggleAnalisiSection
- `12416` — loadAnalisiSanguePDF
- `12303` — _impPdfConfigurata
- `12304` — _impPdfLib
- `12314` — _impPdfApri
- `12327` — _impPdfPagina *(P124b — una pagina del PDF → immagine, con la rotazione RILEVATA, non quella dichiarata dal file)*
- `12348` — _impRuotaImmagine
- `12373` — _impRilevaRotazione *(P124b — chiamata piccola: di quanti gradi va girata la pagina)*
- `12392` — _impPromptPagina *(P124b — prompt di UNA pagina, con l'impronta della riga: valore+unità+riferimento)*
- `12591` — _impNormalizzaNumero *(P124 — numero all'italiana → punto decimale, conversione fatta dall'app e non dall'AI)*
- `12602` — _impNumeri
- `12610` — _impSembraIntervallo
- `12618` — _impUgualeAlRange
- `12627` — _impLimitiStd
- `12648` — _impFuoriScala
- `12657` — _impCorrezioneVirgola
- `12669` — _impTestoLimiti
- `12690` — _impRifPlausibile *(P124b — un "riferimento" che è un'unità di misura = riga disallineata)*
- `12703` — _impUnitaCanonica
- `12725` — _impStessaGrandezza *(P124b — stesso tipo di misura a meno del prefisso: nanomoli/micromoli/millimoli)*
- `12742` — _impUnitaCompatibili
- `12753` — _impControllaValore *(P124 — i controlli anti-errore su un valore estratto)*
- `12817` — mostraDiffAnalisi *(P124 — colonna Estratto modificabile + righe sospette deselezionate)*
- `13007` — _calcoloIncluso
- `13013` — toggleCalcoloIncluso
- `13035` — _renderCalcoliPannello
- `13076` — toggleGlossario
- `13081` — updateAnalisi
- `13140` — salvaAnalisi
- `13153` — applicaGruppoClinico
- `13182` — renderBoxGruppiCliniciSuggeriti
- `13214` — suggerisciGruppiClinici
- `13294` — renderMemoriaInbody

---
### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9176 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `10341` — _richVal
- `10348` — _richBmi
- `10353` — _richPat
- `10359` — _richNum
- `10404` — _richPreselezione
- `10420` — richLeggiIntestazione
- `10424` — richSalvaIntestazione
- `10433` — apriRichiestaAnalisi
- `10453` — _richModaleHtml
- `10529` — _richEsc
- `10531` — _richMotivoCambia
- `10537` — _richToggleSez
- `10543` — _richAggiornaConteggi
- `10551` — _richMotivoCorrente
- `10561` — _richSelezione
- `10576` — _richTxt
- `10582` — _richCostruisciPDF
- `8969` — nuovaPagina
- `8970` — spazio
- `10678` — _richNomeFile
- `10683` — _richPrepara
- `10696` — _richRegistra
- `10701` — _richStato
- `10703` — richScaricaPDF
- `10752` — _richUpload
- `10754` — _richWaUrl
- `10761` — _richTestoWa
- `10775` — richInviaWhatsApp
- `10815` — richCopiaLink
- `10836` — _richStoricoHtml

---
### REFERTI DEL SANGUE DATATI — storico nel tempo (P118 tappa 1)
Righe 9194-9387 — migrazione, ordinamento, quadro attuale derivato, barra di selezione.

- `11936` — _refertoNuovoId
- `11939` — _refertoOggi
- `11943` — _refertoDataIt
- `11949` — _refertoConteggio
- `11963` — _refertiMigra
- `11990` — _refertiOrdinati
- `12001` — _refertoPiuRecente
- `12006` — _refertoInVista
- `12024` — _refertiApplica
- `12037` — _refertoCrea
- `12056` — refertoCambiaVista
- `12062` — refertoCambiaData
- `12074` — refertoNuovo
- `12082` — refertoDuplica
- `12091` — refertoElimina
- `12106` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `11549` — _rangeNum
- `11555` — _rangeTestoDa
- `11574` — _rangeCoppia
- `11584` — _rangeHtml

---
### ANDAMENTO NEL TEMPO — tracciato, variazione, grafico grande (P118 tappa 3)
Righe 9441-9745 — serie storica, regola del colore, sparkline, pannello in fondo.

- `11626` — _andLimiti
- `11647` — _andParseRangeLab
- `11660` — _andDistanza
- `11667` — _andValutazione
- `11680` — _andSerie
- `11694` — _andNum
- `11698` — _andDataBreve
- `11703` — _andMeseAnno
- `11711` — _andDominio
- `11725` — _andColore
- `11738` — _andSparkHtml
- `11764` — _andRigaHtml
- `11786` — _andEsamiSeguibili
- `11794` — andScegliEsame
- `11800` — _andPannelloHtml
- `11853` — _andGraficoGrande
- `11904` — _andPasso

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 13344-15211

- `13344` — _ibFmtBreve
- `13806` — _renderPesiIntermediSection
- `13921` — aggiungiPesoIntermedio
- `13937` — eliminaPesoIntermedio
- `13947` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `15211` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 15519-15519

- `15519` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 15900-18982

- `15900` — aggiornaLabelMacros
- `15918` — calcolaMacros
- `16059` — applicaSchema
- `16094` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `16100` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `16122` — _misuraDaReferto *(P127 — UN referto letto con le regole del traguardo: usata anche dalla verifica al controllo)*
- `16155` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `16166` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `16184` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `16297` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `16311` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `16367` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `16381` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `16413` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `16446` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `16488` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `16496` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `16507` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `16534` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `16549` — _stradeVerso *(le strade complete + percentuale libera)*
- `16596` — _VC_TOLLERANZA_PCT / _VC_GIORNI_MIN / _VC_GIORNI_MIN_RITARO / _VC_COPERTURA_MIN_PCT / _VC_MAGRA_PRUDENZA_GG *(P127 — soglie cliniche della verifica)*
- `16606` — _mediaSlotPrescritta *(media pesata sui giorni di un campo dello storico target; la usa anche _kcalMediaPrescrittaOss)*
- `16626` — _vcDeficitSlot *(deficit di uno slot: campo offset o kcal−tdee per gli slot vecchi)*
- `16634` — _vcTratto *(P127 — cosa è cambiato fra due referti, previsto vs reale, TDEE misurato)*
- `16688` — _vcTraguardoSalvato *(traguardo ricostruito dal salvato, per la scheda Percorso)*
- `16698` — _verificaControllo *(P127 — motore puro: tratto recente, quadro dall'inizio, residuo al ritmo reale)*
- `16736` — _verificaControlloHtml *(blocco 🔎, unica fonte per pannello 🎯 e scheda Percorso; azioni solo dove c'è il campo kcal)*
- `16828` — _vcRitara *(scrive le kcal ritarate nel campo regime: propone, non salva)*
- `16841` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `16909` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `16931` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `16984` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `17091` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `17106` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `17131` — _renderRifPesoBox
- `17182` — _usaRifPeso
- `17186` — _aggiornaRifPesoTarget
- `17189` — _aggiornaRegimeSlider
- `17846` — _presetRegime
- `17850` — _initRegimeSliderDaPaziente
- `16633` — ricalcolaLAF
- `18028` — renderStoricoTDEE
- `18070` — attivaSlotTDEE
- `18087` — eliminaSlotTDEE
- `18100` — _toggleCiclizzazione
- `18106` — _aggiornaAnteprimaCiclizzazione
- `18124` — salvaCalcoloMacros
- `18439` — _metAllenamento
- `18678` — _neatFrazione
- `18797` — _larnLafStileVita
- `18814` — _regimeOffset
- `18824` — _componiRegimeText
- `18857` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `18869` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `18876` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `18982` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 19000-19444

- `19000` — renderTargetBadge
- `17819` — verificaRegola_75_20_5
- `17856` — renderBadge75_20_5
- `19145` — _validaNorm
- `19148` — _validaMatchTermine
- `19156` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `19207` — _validaTesto
- `19228` — validaPiano
- `19302` — _validaFirmaBlocchi
- `19309` — renderBadgeValidatore
- `19340` — _validaVaiAlGiorno
- `19349` — apriPannelloValidatore
- `13472` — esc
- `19406` — _validaEseguiOverride
- `19429` — validaGateExport
- `19444` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 19577-20209

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
- `19577` — pianoPazSelezionato
- `19724` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `19962` — renderPanelMacrosGiorno
- `20105` — pmgCambiaGrammi
- `20132` — riapriPiano
- `20170` — _montaPianoCorrente
- `20209` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 20219-20693

- `20219` — pullTemplateSupabase
- `20230` — delTemplateSupabase
- `20239` — _promptTemplateNome
- `20264` — _creaTemplateDaJSON
- `20287` — salvaComeTemplate
- `20298` — salvaComeTemplateDaPiano
- `20307` — _normNomeAlim
- `20308` — _escRegAlim
- `20309` — _raccogliAlimentiDaPiano
- `20320` — _alimentiEsclusiPaziente
- `20332` — _trovaConflittiTemplate
- `20350` — _mostraAvvisoConflitti
- `20374` — applicaTemplate
- `20392` — apriPickerTemplate
- `20420` — _pickPaziente
- `20444` — applicaTemplatePick
- `20448` — rinominaTemplate
- `20459` — eliminaTemplate
- `20469` — renderLibreriaTemplate
- `20498` — renderStoricoPiani
- `20557` — eliminaPiano
- `20573` — _getActiveMacrosTarget
- `20597` — getTargetAttivi
- `20634` — calcolaTargetsCiclizzazione
- `20660` — _setupPianoTargets
- `20684` — getStagioneCorrente
- `20693` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 21164-21164

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `21164` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 21173-21635

- `21173` — aggiornaUIcolazione
- `21183` — salvaRegolePiano
- `21244` — _isModelloSistema
- `21247` — _isModelloSistemaModificato
- `21259` — caricaModelliCustomLocal
- `21273` — salvaModelliCustomLocal
- `21294` — _migraRecordCustom
- `21312` — _syncAliasLegacy
- `21321` — caricaAlimentiCustom
- `21345` — pushAlimentiCustomSupabase
- `21355` — pullAlimentiCustomSupabase
- `21369` — pushModelliSupabase
- `21387` — pullModelliSupabase
- `21412` — _calcolaFreqDaModello
- `21431` — aggiornaUImodello
- `21520` — popolaDropdownModelli
- `21548` — cambiaModelloRotazione
- `21554` — ripristinaModelloOriginale
- `21577` — eliminaModelloCustom
- `21595` — mostraAnteprimaModello
- `21605` — apriEditorModello
- `21635` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 21904-22142

- `15738` — rerender
- `21904` — _salvaModelloDaEditor
- `21946` — caricaRegolePiano
- `21976` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `22011` — _aiLogUsage
- `22033` — _aiProxyUrl
- `22039` — _aiTokenPerProxy
- `22068` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `22142` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 22221-22361

- `16216` — _risolviCollisioniCelle
- `22221` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `22281` — getFruttaStile
- `22288` — _fruttaGetPasto
- `22298` — _fruttaContaRigheRicetta
- `22302` — _fruttaIndiceBasePasto
- `22322` — getFruttaMarker
- `22335` — fruttaMarkerHtml
- `22343` — _fruttaCheckboxHtml
- `22352` — toggleFrutta
- `22361` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 22397-23671

- `22397` — _renderCelleGriglia
- `22477` — _renderRicetteTestuali
- `22516` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `22587` — _renderCelleHtml
- `22595` — toggleCellaMenu
- `22614` — closeAllCellaMenus
- `22622` — _trovaPasto
- `22630` — cellaSposta
- `22684` — cellaCancella
- `22705` — apriEditGrammatura
- `16789` — salva
- `22753` — cellaSwap
- `22773` — cellaRimuoviAlt
- `22787` — cellaAggiungiAlt
- `22890` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `22975` — apriEditRicetta
- `22984` — aggiungiRicetta
- `23000` — rimuoviRicetta
- `23009` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `23171` — ngAggiungiSpuntinoVuoto
- `23187` — apriAggiungiCella
- `17254` — risolviCompatibili
- `23283` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `23375` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `23516` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `23671` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 23719-24111

- `23719` — _attesoStrutturaPiano
- `23739` — _confrontaStrutturaPiano
- `23769` — _costruisciPromptDelta
- `23796` — _pianoToolSchema
- `23871` — _pianoMaxTokens
- `23880` — _estraiPianoDaRisposta
- `23902` — chiamaGeneraPiano
- `24069` — mostraLoadingSteps
- `18123` — render
- `24111` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 24178-24755

- `24178` — generaMessaggioAI
- `24283` — copiaMessaggioAI
- `24293` — salvaInStorico
- `24305` — salvaVarianteAI
- `24320` — renderVariantiSalvate
- `24339` — usaVariante
- `24357` — eliminaVariante
- `24368` — renderStoricoMsg
- `24384` — apriWhatsApp
- `24755` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 24933-26430

- `24933` — _ngColoreSemaforoNome
- `24941` — apriSceltaModalitaPiano
- `24976` — _ngChiudiModalita
- `24979` — _ngCostruisciGiornoVuoto
- `25012` — _ngCostruisciGiornoSpeciale
- `25023` — _ngIndiceInizioSpeciali
- `25034` — _ngModalitaNomeGiorno
- `25040` — _ngImpostaModalitaNomeGiorno
- `25043` — _ngLettera
- `25050` — _ngEtichettaGiorno
- `25070` — _ngEtichettaGiornoBreve
- `25084` — _ngToggleGiornoSpeciale
- `25108` — _ngRenderPannelloSpeciale
- `25176` — _generaGiornoSpecialeAI
- `25276` — _ngGiornoHaContenuto
- `25288` — _ngCreaPianoManuale
- `25311` — _ngScrollTabGiorni
- `25321` — _ngAbilitaDragScroll
- `25358` — _ngCambiaNumeroGiorni
- `25390` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `25404` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `25445` — _ngToggleCat
- `25454` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `25478` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `25634` — _ngSalvaPianoManuale
- `25660` — _ngParseIngrediente
- `25684` — _ngScomponiIngredienti
- `25696` — _ricCalcolaMacroDaIngredienti
- `25714` — _ricRicalcolaMacroLive
- `25721` — _ricAggiornaInfoMacro
- `25735` — _ricRicalcolaMacroLiveNow
- `25759` — _ngTrovaCategoriaAlimento
- `25792` — _ngPescaRicetta
- `25835` — _ngScomponiRicettaNelPasto
- `25872` — _ngDragStart
- `25883` — _ngDragStartCella
- `25894` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `25901` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `25906` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `25925` — _ngAggiungiAlimento
- `25950` — _ngRimuoviAlimento
- `25964` — _ngDopoModifica
- `25982` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `26035` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `26064` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `26081` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `26089` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `26161` — gramTestoCasalingo
- `26187` — _appendToggleNutrizionali
- `26230` — _appendTogglePromemoria
- `26259` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `26405` — cpFromEmoji
- `26411` — getEmojiCp
- `26430` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `24405` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `24427` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `24432` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `24458` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `24546` — _spesaTestoWhatsApp
- `24562` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `24607` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `24630` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `24658` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `24718` — scaricaListaSpesaPDF (download diretto, un click)
- `24726` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `24738` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 27582-27582

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
- `27582` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 27596-27808

- `27596` — salvaInbody
- `27666` — delInbody
- `27673` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `27808` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 27836-28623

- `27836` — buildSemLegenda
- `27850` — renderAlEditor
- `27947` — _alimNomeRegex
- `27955` — _alimGiorniDaPiano
- `27963` — _scanGiorniPerNome
- `27978` — scanRiferimentiAlimento
- `28007` — _alimRefsRighe
- `28013` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `28101` — modificaAlimentoCustom
- `28121` — ripristinaValoriPrecedentiAlimento
- `28133` — _resetAlimModal
- `28145` — apriNuovoAlimentoCustom
- `28151` — salvaAlimentoCustom
- `28221` — eliminaAlimentoCustom
- `28529` — _alimFonteBadge
- `28534` — renderAlimentiPage
- `22217` — E
- `28605` — archiviaAlimentoCustom
- `28623` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 28650-29286

- `28650` — _bcSetStatus
- `28652` — apriScannerBarcode
- `28660` — chiudiScannerBarcode
- `28665` — _bcStopCamera
- `28673` — _bcModaleAperto
- `28675` — _bcAvviaCamera
- `28686` — _bcAvviaNativo
- `28706` — _bcAvviaZXing
- `28715` — _bcZXStart
- `28726` — _bcErroreCamera
- `28734` — cercaBarcodeManuale
- `28740` — _barcodeTrovato
- `28911` — cercaBarcodeOFF
- `28940` — _bcProdottoNonTrovato
- `28955` — _bcPrecompilaForm
- `22477` — num
- `29000` — togAl
- `29053` — selCatAl
- `25402` — selTuttiAl
- `29118` — _appIdAnag  (P140 T1)
- `29128` — _appSyncPaz  (P140 T1)
- `29172` — _appSpecchioInverso  (P140 T2)
- `29198` — _appRitiraSpecchio  (P140 T2)
- `29229` — _appAncoraTappe  (P140 T2)
- `29248` — _appTappe  (P140 T2)
- `29269` — _appMigraPaziente  (P140 T1)
- `29279` — _appMigraTutti  (P140 T1)
- `29286` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 29302-29771

- `29302` — setCalView
- `29312` — calPrev
- `29313` — calNext
- `29314` — calToday
- `29316` — renderCal
- `29330` — renderCalMonth
- `29357` — renderCalWeek
- `29390` — renderCalDay
- `29441` — selGiorno
- `29455` — setDisp
- `29460` — openAddEvento
- `29473` — openAddEventoPaz
- `29479` — toggleEntrataCheck
- `29484` — salvaEvento
- `29526` — _evTestoPromemoria  (P140 T1)
- `29532` — openEvDetail
- `29587` — delEvento
- `29609` — copyMsg
- `29621` — aggDateCal
- `27020` — syncInizio
- `27021` — syncControllo
- `29634` — aggiornaPrev
- `29659` — apriEventoDaScheda  (P140 T2)
- `29673` — _appAggiornaOreScheda  (P140 T2)
- `29690` — renderRic
- `29717` — openNuovaRic
- `29718` — editRic
- `29728` — salvaRic
- `29753` — delRic
- `29771` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 29857-29917

- `29857` — aggiungiEntrataPerPaziente
- `29874` — openNuovaEntrata
- `29888` — salvaEntrata
- `29909` — delEntrata
- `29917` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 29947-30662

- `29947` — aiSuggerisciRicetta
- `29992` — renderConcettiModal
- `30011` — apriConcettiModal
- `30038` — salvaConcettiAllegati
- `30062` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `30100` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `30243` — loadInbodyPDF
- `30364` — _vitdLabel
- `30368` — getIntegratori
- `30372` — getIntegraWant
- `30385` — _chiaviSpuntate *(P148 — risolve le etichette salvate in chiavi, regola 21)*
- `30393` — setIntegratori
- `30410` — setIntegraWant
- `30438` — _infoIntegratoreHtml *(P148 — contenuto del pannello ⓘ)*
- `30466` — mostraInfoIntegratore *(P148 — apre/chiude il pannello sotto la griglia)*
- `30478` — renderCaselleIntegratori *(P148 — genera le caselle dal catalogo; va chiamata PRIMA di setIntegratori, altrimenti le spunte non trovano gli elementi)*
- `30539` — getPatologieChip
- `30540` — getAllergieChip
- `30541` — setPatologieChip
- `30542` — setAllergieChip
- `30543` — getPatologie
- `30544` — getAllergie
- `30545` — setPatologieFromStr
- `30552` — setAllergieFromStr
- `30565` — getSdvChip
- `30566` — getCspChip
- `30567` — setSdvChip
- `30568` — setCspChip
- `30569` — setSdvFromStr
- `30570` — setCspFromStr
- `30574` — getBudget
- `30575` — setBudget
- `30580` — renderCalAnno
- `30611` — comprimeImmagine
- `30633` — uploadImmagineConcetto
- `30652` — rimuoviImmagineConcetto
- `30662` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 30728-30812

- `30728` — entraSelConcetti
- `30729` — annullaSelConcetti
- `30730` — toggleConcettoSel
- `30735` — eliminaConcettiSelezionati
- `30754` — confermaEliminaConcetti
- `30769` — aiRiscriviConcetto
- `30783` — editConcetto
- `30801` — salvaConcetto
- `30812` — openNuovoConcetto
- `27519` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 30849-30849

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
- `30849` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 30961-31286

- `30961` — renderScadenzeAlert
- `31221` — _scadGestiti  (P144)
- `31231` — _scadPota  (P144)
- `31246` — _scadMigraDaLocalStorage  (P144)
- `31269` — segnaGestito
- `31286` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 31295-31370

- `31295` — ripristinaPaz
- `31303` — eliminaPaz
- `31348` — getDove
- `31352` — setDove
- `31370` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 31375-31813

- `31375` — getCredenzialiPersistenti
- `31388` — cancellaCredenzialiPersistenti
- `31393` — rinnovaSessioneConRefreshToken
- `31410` — getSessioneSalvata
- `31429` — salvaSessione
- `31439` — cancellaSessione
- `31443` — eseguiLogin
- `31490` — eseguiLogout
- `31512` — mostraApp
- `31517` — verificaSessioneEAvvia
- `31545` — assicuraTokenValido
- `31574` — _garantiscoSessionePerSync
- `31586` — avviaRinnovoTokenPeriodico
- `31590` — fermaRinnovoTokenPeriodico
- `31599` — _authReset
- `31604` — _authMostra
- `31607` — mostraLogin
- `31608` — mostraRegistrazione
- `31609` — mostraRecupero
- `31610` — mostraNuovaPassword
- `31613` — eseguiRegistrazione
- `31651` — eseguiRecuperoPassword
- `31680` — eseguiNuovaPassword
- `31714` — _parseHashParams
- `31721` — _pulisciHash
- `31725` — gestisciRitornoAuth
- `31813` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 31885-31986

- `31885` — apriPannelloRicette
- `31914` — chiudiPannelloRicette
- `31922` — applicaRicettaPasto
- `31958` — inizializzaP2
- `31970` — deepClone
- `30143` — applicaPatch
- `31986` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
