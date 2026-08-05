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
Righe 5580-8901

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
- `6417` — applicaRegoloSemaforo *(dal 26/7 pulisce TUTTI e sei i colori automatici, non solo i suoi due)*
- `6505` — trovaChiaveAlimento *(match esatto sul nome: se non trova, la regola è ignorata in silenzio — vedi test s2-regole-nomi-alimenti)*
- `6529` — _pazNumOPrec *(F7 — campo assente = valore precedente, non azzeramento)*
- `6541` — _pazPreservaCampi *(F5 — l'anagrafica non cancella i campi che il form non gestisce)*
- `6547` — salvaPaz
- `6697` — openPaz
- `8285` — catalogoIntegratoriAttivi *(P148 — voci proponibili, esclude quelle ritirate)*
- `8289` — integratorePerChiave *(P148)*
- `8325` — _normEtichettaIntegr *(P148)*
- `8333` — chiaveIntegratore *(P148 — etichetta storica → chiave stabile, regola 21)*
- `8351` — migraEtichetteIntegratori *(P148 — {chiavi, liberi}: le sconosciute si conservano)*
- `8420` — integratoriDaSuggerireInRoutine *(P148 — ponte Clinica→Routine: suggerimento, mai aggiunta automatica)*
- `8436` — _suggerimentiDaClinicaHTML *(P148)*
- `8452` — renderPdRoutine
- `6723` — cardHTML
- `8621` — updateRoutineCampo
- `8629` — suggerisciPastoEQuando
- `8677` — pianoPiuRecenteDelPaziente *(P148 — piano più recente del paziente, già espanso)*
- `8690` — _macroRegolaRoutine *(P148 — 'g' o 'c' secondo la regolaOrario del catalogo)*
- `8698` — routineAmmetteAuto *(P148)*
- `8703` — routineSlotDelGiorno *(P148 — pasto di una voce IN UN GIORNO; la scelta manuale vince sempre)*
- `8714` — routineSlotPerGiornoNome *(P148 — stessa cosa per nome del giorno: è la forma usata dal PDF)*
- `8726` — routineAssegnazionePerGiorni *(P148 — [{giorno, slot}] per la scheda Routine)*
- `8739` — pesoAttualePaziente *(P148 — dall'InBody più recente, regola 10; mai congelato)*
- `8748` — doseIntegratoreRisolta *(P148 — dose per peso dei BCAA; senza referto non inventa numeri)*
- `8760` — filtroLibreria
- `8769` — renderLibreriaGrid
- `8790` — aggiungiDaLibreriaIdx
- `8819` — openModalRoutine
- `8826` — salvaRoutineVoce
- `8851` — salvaRoutine
- `8858` — mostraRoutinePopup
- `8886` — removeRoutineVoce
- `8901` — _renderAggiustamentiSection

---

### 📈 PERCORSO — timeline di periodizzazione (P115 Tappe 1-5 COMPLETE, 24 lug 2026)
Righe 6021-6621 (numeri ESATTI al 24/7 notte, dopo la Tappa 5). ⚠️ Questo blocco (~600 righe) fa slittare tutti i numeri delle sezioni SUCCESSIVE a riga ~6020 rispetto all'ultima rigenerazione completa: per quelle sezioni fare grep di conferma. Rigenerazione completa alla prossima modifica strutturale.

- `6743` — _PERCORSO_TIPI (const: tipi fase, colori, pct default)
- `6750` — _percorsoGet *(normalizza p.percorso, scarta fasi invalide)*
- `6774` — _percorsoIntervalli *(fasi consecutive → date concrete dal/al)*
- `6788` — _percorsoFaseAt *(fase attiva a una data; dal incluso, al escluso)*
- `6797` — _percorsoKcalFase *(pct → kcal indicative via calcolaTDEE)*
- `6820` — _percorsoProiezione *(Tappa 2 — proiezione ibrida teorica/calibrata, cono, obiettivo a intervallo)*
- `6878` — _percorsoDataBreve *(ISO → "12 set")*
- `6895` — _percorsoSerieEnergia *(Tappa 3 — serie introito/TDEE stimato/TDEE osservato per la corsia energia)*
- `6934` — _percorsoSerieMassaMagra *(Tappa 4 — solo InBody: punti {data,m,pg})*
- `6953` — _percorsoConsuntivo *(Tappa 5 — legge p.consuntivo scritto da P50: aderenza, extra kcal, ritardo=extra÷7700, settimane perse; oggi sempre ok:false)*
- `6995` — _PERCORSO_LAYERS_DEFAULT / _percorsoLayersState / _percorsoLayersGet *(Tappa 4 — stato interruttori, SOLO sessione, mai su p)*
- `7000` — percorsoLayerToggle *(Tappa 4 — inverte un solo strato)*
- `7006` — percorsoVistaPreset *(Tappa 4 — preset "tecnica"/"paziente")*
- `7022` — _percorsoPaz *(e a seguire i mutatori percorsoInit/SetInizio/AddFase/UpdFase/DelFase/MoveFase)*
- `7078` — _PERCORSO_MODELLI / _PERCORSO_GEN *(P122 T3 — 4 modelli + regole dei cicli)*
- `7096` — _percorsoGeneraFasi *(P122 T3 — pura: dal traguardo alle fasi, ritmo = quello della proiezione)*
- `7176` — _percorsoModelloSelectHtml
- `7185` — percorsoGeneraDaModello *(propone; conferma prima di sostituire fasi esistenti)*
- `7208` — _percorsoShiftGiorni *(pura: ancora = ultima pesata)*
- `7218` — percorsoRiallinea *(⏩ trasla il piano, riprende dal giorno-fase dell'interruzione)*
- `7245` — _TRG_TIPI / `6744` _TRG_COMPORTAMENTI *(P122 T4 — tipi di traguardo e libreria comportamenti)*
- `7267` — _traguardiGet · `6761` _traguardoValoreAttuale *(valore corrente dai dati esistenti, null se manca)*
- `7306` — _traguardoVerso *(auto: dedotto dalla partenza)* · `6803` _traguardoValuta · `6824` _traguardiValuta
- `7347` — traguardoAdd · `6852` traguardoUpd · `6867` traguardoDel · `6873` traguardoSegna
- `7405` — _COND_TIPI · `6897` _percorsoCondizione *(pura: la fase finisce per soglia — SOLO suggerimento)*
- `7421` — percorsoSetCondizione · `6927` percorsoChiudiFase *(esito fotografato, riapribile)*
- `7455` — _traguardiHtml *(blocco 🏁 in fondo alla scheda Percorso)*
- `7553` — _percorsoVistaPaz / `7049` _percorsoVistaPazAttiva *(P122 T5 — modalità di sessione)*
- `7560` — _percorsoVittorie *(pura: vittorie dall'inizio del percorso + flag ricomposizione)*
- `7598` — _percorsoNascondiPeso *(in fase di massa il peso non si mostra al paziente)*
- `7609` — _traguardoFaseCorrente *(traguardo della fase IN CORSO, non quello lontano)*
- `7637` — _traguardoTestoPaziente *(righe in italiano semplice, riusate dal messaggio WhatsApp)*
- `7670` — _vistaPazienteHtml *(i tre riquadri che guarda il paziente)*
- `7750` — _percorsoChartSvg *(due corsie: peso + massa magra + cono proiezione sopra, striscia aderenza in mezzo (solo con dati P50), energia (kcal) sotto — tutto gated dagli interruttori)*
- `7939` — renderPdPercorso *(scheda: badge fase, riga proiezione/obiettivo, riga Piano vs Realtà (solo con dati), toolbar interruttori, grafico, editor)*

*(Tappa 2 tocca anche `calcolaMacros`: box obiettivo con intervallo al posto della data secca.)*

---

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 8986-9157

- `8986` — salvaAggiustamento
- `9019` — eliminaAggiustamento
- `9028` — renderPdNote
- `9063` — salvaNotaClinica
- `9078` — deleteNota
- `9087` — saveNote
- `9107` — resetSemaforoAuto *(F9 — pulsante 🔄 Ricalcola: pulisce gli automatici e rifà col sistema valido; il motore LEGACY non esiste più)*
- `9157` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 9398-9596

- `9398` — avviaFX
- `9426` — avviaAnalisi
- `9443` — _renderFlussoPanel
- `9487` — _riepEsc
- `9491` — _riepNum
- `9497` — _riepDelta
- `9505` — _riepDataSig
- `9523` — _riepParseFX
- `8087` — clean
- `9537` — _riepAggiornaFX
- `9563` — _riepToggleDomandaDefault
- `9575` — _riepAddDomanda
- `9588` — _riepRemoveDomanda
- `9596` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 9808-10051

- `8218` — dCol
- `8336` — card
- `9808` — renderPdRagionamento
- `9896` — inviaMessaggioRag
- `9914` — concludiERiassumi
- `9928` — salvaRagionamento
- `9949` — apriGeneratoreDaRag
- `9957` — nuovaSessioneRag
- `9963` — cancellaSavedRag
- `9973` — renderPazTimeline
- `10010` — renderPdAnamnesi
- `10051` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 11999-13134

- `11999` — _anNorm *(P125 — testo confrontabile: minuscole, niente accenti)*
- `12005` — _anCorrisponde *(P125 — ricerca per parole-prefisso: "vit d" trova "Vitamina D")*
- `12011` — filtraAnalisi *(P125 — filtro dal vivo delle 119 voci)*
- `12045` — pulisciRicercaAnalisi
- `12051` — renderPdAnalisi
- `12107` — toggleAnalisiSection
- `12256` — loadAnalisiSanguePDF
- `12143` — _impPdfConfigurata
- `12144` — _impPdfLib
- `12154` — _impPdfApri
- `12167` — _impPdfPagina *(P124b — una pagina del PDF → immagine, con la rotazione RILEVATA, non quella dichiarata dal file)*
- `12188` — _impRuotaImmagine
- `12213` — _impRilevaRotazione *(P124b — chiamata piccola: di quanti gradi va girata la pagina)*
- `12232` — _impPromptPagina *(P124b — prompt di UNA pagina, con l'impronta della riga: valore+unità+riferimento)*
- `12431` — _impNormalizzaNumero *(P124 — numero all'italiana → punto decimale, conversione fatta dall'app e non dall'AI)*
- `12442` — _impNumeri
- `12450` — _impSembraIntervallo
- `12458` — _impUgualeAlRange
- `12467` — _impLimitiStd
- `12488` — _impFuoriScala
- `12497` — _impCorrezioneVirgola
- `12509` — _impTestoLimiti
- `12530` — _impRifPlausibile *(P124b — un "riferimento" che è un'unità di misura = riga disallineata)*
- `12543` — _impUnitaCanonica
- `12565` — _impStessaGrandezza *(P124b — stesso tipo di misura a meno del prefisso: nanomoli/micromoli/millimoli)*
- `12582` — _impUnitaCompatibili
- `12593` — _impControllaValore *(P124 — i controlli anti-errore su un valore estratto)*
- `12657` — mostraDiffAnalisi *(P124 — colonna Estratto modificabile + righe sospette deselezionate)*
- `12847` — _calcoloIncluso
- `12853` — toggleCalcoloIncluso
- `12875` — _renderCalcoliPannello
- `12916` — toggleGlossario
- `12921` — updateAnalisi
- `12980` — salvaAnalisi
- `12993` — applicaGruppoClinico
- `13022` — renderBoxGruppiCliniciSuggeriti
- `13054` — suggerisciGruppiClinici
- `13134` — renderMemoriaInbody

---
### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9176 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `10181` — _richVal
- `10188` — _richBmi
- `10193` — _richPat
- `10199` — _richNum
- `10244` — _richPreselezione
- `10260` — richLeggiIntestazione
- `10264` — richSalvaIntestazione
- `10273` — apriRichiestaAnalisi
- `10293` — _richModaleHtml
- `10369` — _richEsc
- `10371` — _richMotivoCambia
- `10377` — _richToggleSez
- `10383` — _richAggiornaConteggi
- `10391` — _richMotivoCorrente
- `10401` — _richSelezione
- `10416` — _richTxt
- `10422` — _richCostruisciPDF
- `8969` — nuovaPagina
- `8970` — spazio
- `10518` — _richNomeFile
- `10523` — _richPrepara
- `10536` — _richRegistra
- `10541` — _richStato
- `10543` — richScaricaPDF
- `10592` — _richUpload
- `10594` — _richWaUrl
- `10601` — _richTestoWa
- `10615` — richInviaWhatsApp
- `10655` — richCopiaLink
- `10676` — _richStoricoHtml

---
### REFERTI DEL SANGUE DATATI — storico nel tempo (P118 tappa 1)
Righe 9194-9387 — migrazione, ordinamento, quadro attuale derivato, barra di selezione.

- `11776` — _refertoNuovoId
- `11779` — _refertoOggi
- `11783` — _refertoDataIt
- `11789` — _refertoConteggio
- `11803` — _refertiMigra
- `11830` — _refertiOrdinati
- `11841` — _refertoPiuRecente
- `11846` — _refertoInVista
- `11864` — _refertiApplica
- `11877` — _refertoCrea
- `11896` — refertoCambiaVista
- `11902` — refertoCambiaData
- `11914` — refertoNuovo
- `11922` — refertoDuplica
- `11931` — refertoElimina
- `11946` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `11389` — _rangeNum
- `11395` — _rangeTestoDa
- `11414` — _rangeCoppia
- `11424` — _rangeHtml

---
### ANDAMENTO NEL TEMPO — tracciato, variazione, grafico grande (P118 tappa 3)
Righe 9441-9745 — serie storica, regola del colore, sparkline, pannello in fondo.

- `11466` — _andLimiti
- `11487` — _andParseRangeLab
- `11500` — _andDistanza
- `11507` — _andValutazione
- `11520` — _andSerie
- `11534` — _andNum
- `11538` — _andDataBreve
- `11543` — _andMeseAnno
- `11551` — _andDominio
- `11565` — _andColore
- `11578` — _andSparkHtml
- `11604` — _andRigaHtml
- `11626` — _andEsamiSeguibili
- `11634` — andScegliEsame
- `11640` — _andPannelloHtml
- `11693` — _andGraficoGrande
- `11744` — _andPasso

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 13184-15051

- `13184` — _ibFmtBreve
- `13646` — _renderPesiIntermediSection
- `13761` — aggiungiPesoIntermedio
- `13777` — eliminaPesoIntermedio
- `13787` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `15051` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 15359-15359

- `15359` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 15740-18822

- `15740` — aggiornaLabelMacros
- `15758` — calcolaMacros
- `15899` — applicaSchema
- `15934` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `15940` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `15962` — _misuraDaReferto *(P127 — UN referto letto con le regole del traguardo: usata anche dalla verifica al controllo)*
- `15995` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `16006` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `16024` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `16137` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `16151` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `16207` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `16221` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `16253` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `16286` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `16328` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `16336` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `16347` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `16374` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `16389` — _stradeVerso *(le strade complete + percentuale libera)*
- `16436` — _VC_TOLLERANZA_PCT / _VC_GIORNI_MIN / _VC_GIORNI_MIN_RITARO / _VC_COPERTURA_MIN_PCT / _VC_MAGRA_PRUDENZA_GG *(P127 — soglie cliniche della verifica)*
- `16446` — _mediaSlotPrescritta *(media pesata sui giorni di un campo dello storico target; la usa anche _kcalMediaPrescrittaOss)*
- `16466` — _vcDeficitSlot *(deficit di uno slot: campo offset o kcal−tdee per gli slot vecchi)*
- `16474` — _vcTratto *(P127 — cosa è cambiato fra due referti, previsto vs reale, TDEE misurato)*
- `16528` — _vcTraguardoSalvato *(traguardo ricostruito dal salvato, per la scheda Percorso)*
- `16538` — _verificaControllo *(P127 — motore puro: tratto recente, quadro dall'inizio, residuo al ritmo reale)*
- `16576` — _verificaControlloHtml *(blocco 🔎, unica fonte per pannello 🎯 e scheda Percorso; azioni solo dove c'è il campo kcal)*
- `16668` — _vcRitara *(scrive le kcal ritarate nel campo regime: propone, non salva)*
- `16681` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `16749` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `16771` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `16824` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `16931` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `16946` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `16971` — _renderRifPesoBox
- `17022` — _usaRifPeso
- `17026` — _aggiornaRifPesoTarget
- `17029` — _aggiornaRegimeSlider
- `17686` — _presetRegime
- `17690` — _initRegimeSliderDaPaziente
- `16633` — ricalcolaLAF
- `17868` — renderStoricoTDEE
- `17910` — attivaSlotTDEE
- `17927` — eliminaSlotTDEE
- `17940` — _toggleCiclizzazione
- `17946` — _aggiornaAnteprimaCiclizzazione
- `17964` — salvaCalcoloMacros
- `18279` — _metAllenamento
- `18518` — _neatFrazione
- `18637` — _larnLafStileVita
- `18654` — _regimeOffset
- `18664` — _componiRegimeText
- `18697` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `18709` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `18716` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `18822` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 18840-19284

- `18840` — renderTargetBadge
- `17819` — verificaRegola_75_20_5
- `17856` — renderBadge75_20_5
- `18985` — _validaNorm
- `18988` — _validaMatchTermine
- `18996` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `19047` — _validaTesto
- `19068` — validaPiano
- `19142` — _validaFirmaBlocchi
- `19149` — renderBadgeValidatore
- `19180` — _validaVaiAlGiorno
- `19189` — apriPannelloValidatore
- `13472` — esc
- `19246` — _validaEseguiOverride
- `19269` — validaGateExport
- `19284` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 19417-20049

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
- `19417` — pianoPazSelezionato
- `19564` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `19802` — renderPanelMacrosGiorno
- `19945` — pmgCambiaGrammi
- `19972` — riapriPiano
- `20010` — _montaPianoCorrente
- `20049` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 20059-20533

- `20059` — pullTemplateSupabase
- `20070` — delTemplateSupabase
- `20079` — _promptTemplateNome
- `20104` — _creaTemplateDaJSON
- `20127` — salvaComeTemplate
- `20138` — salvaComeTemplateDaPiano
- `20147` — _normNomeAlim
- `20148` — _escRegAlim
- `20149` — _raccogliAlimentiDaPiano
- `20160` — _alimentiEsclusiPaziente
- `20172` — _trovaConflittiTemplate
- `20190` — _mostraAvvisoConflitti
- `20214` — applicaTemplate
- `20232` — apriPickerTemplate
- `20260` — _pickPaziente
- `20284` — applicaTemplatePick
- `20288` — rinominaTemplate
- `20299` — eliminaTemplate
- `20309` — renderLibreriaTemplate
- `20338` — renderStoricoPiani
- `20397` — eliminaPiano
- `20413` — _getActiveMacrosTarget
- `20437` — getTargetAttivi
- `20474` — calcolaTargetsCiclizzazione
- `20500` — _setupPianoTargets
- `20524` — getStagioneCorrente
- `20533` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 21004-21004

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `21004` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 21013-21475

- `21013` — aggiornaUIcolazione
- `21023` — salvaRegolePiano
- `21084` — _isModelloSistema
- `21087` — _isModelloSistemaModificato
- `21099` — caricaModelliCustomLocal
- `21113` — salvaModelliCustomLocal
- `21134` — _migraRecordCustom
- `21152` — _syncAliasLegacy
- `21161` — caricaAlimentiCustom
- `21185` — pushAlimentiCustomSupabase
- `21195` — pullAlimentiCustomSupabase
- `21209` — pushModelliSupabase
- `21227` — pullModelliSupabase
- `21252` — _calcolaFreqDaModello
- `21271` — aggiornaUImodello
- `21360` — popolaDropdownModelli
- `21388` — cambiaModelloRotazione
- `21394` — ripristinaModelloOriginale
- `21417` — eliminaModelloCustom
- `21435` — mostraAnteprimaModello
- `21445` — apriEditorModello
- `21475` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 21744-21982

- `15738` — rerender
- `21744` — _salvaModelloDaEditor
- `21786` — caricaRegolePiano
- `21816` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `21851` — _aiLogUsage
- `21873` — _aiProxyUrl
- `21879` — _aiTokenPerProxy
- `21908` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `21982` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 22061-22201

- `16216` — _risolviCollisioniCelle
- `22061` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `22121` — getFruttaStile
- `22128` — _fruttaGetPasto
- `22138` — _fruttaContaRigheRicetta
- `22142` — _fruttaIndiceBasePasto
- `22162` — getFruttaMarker
- `22175` — fruttaMarkerHtml
- `22183` — _fruttaCheckboxHtml
- `22192` — toggleFrutta
- `22201` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 22237-23511

- `22237` — _renderCelleGriglia
- `22317` — _renderRicetteTestuali
- `22356` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `22427` — _renderCelleHtml
- `22435` — toggleCellaMenu
- `22454` — closeAllCellaMenus
- `22462` — _trovaPasto
- `22470` — cellaSposta
- `22524` — cellaCancella
- `22545` — apriEditGrammatura
- `16789` — salva
- `22593` — cellaSwap
- `22613` — cellaRimuoviAlt
- `22627` — cellaAggiungiAlt
- `22730` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `22815` — apriEditRicetta
- `22824` — aggiungiRicetta
- `22840` — rimuoviRicetta
- `22849` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `23011` — ngAggiungiSpuntinoVuoto
- `23027` — apriAggiungiCella
- `17254` — risolviCompatibili
- `23123` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `23215` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `23356` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `23511` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 23559-23951

- `23559` — _attesoStrutturaPiano
- `23579` — _confrontaStrutturaPiano
- `23609` — _costruisciPromptDelta
- `23636` — _pianoToolSchema
- `23711` — _pianoMaxTokens
- `23720` — _estraiPianoDaRisposta
- `23742` — chiamaGeneraPiano
- `23909` — mostraLoadingSteps
- `18123` — render
- `23951` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 24018-24595

- `24018` — generaMessaggioAI
- `24123` — copiaMessaggioAI
- `24133` — salvaInStorico
- `24145` — salvaVarianteAI
- `24160` — renderVariantiSalvate
- `24179` — usaVariante
- `24197` — eliminaVariante
- `24208` — renderStoricoMsg
- `24224` — apriWhatsApp
- `24595` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 24773-26270

- `24773` — _ngColoreSemaforoNome
- `24781` — apriSceltaModalitaPiano
- `24816` — _ngChiudiModalita
- `24819` — _ngCostruisciGiornoVuoto
- `24852` — _ngCostruisciGiornoSpeciale
- `24863` — _ngIndiceInizioSpeciali
- `24874` — _ngModalitaNomeGiorno
- `24880` — _ngImpostaModalitaNomeGiorno
- `24883` — _ngLettera
- `24890` — _ngEtichettaGiorno
- `24910` — _ngEtichettaGiornoBreve
- `24924` — _ngToggleGiornoSpeciale
- `24948` — _ngRenderPannelloSpeciale
- `25016` — _generaGiornoSpecialeAI
- `25116` — _ngGiornoHaContenuto
- `25128` — _ngCreaPianoManuale
- `25151` — _ngScrollTabGiorni
- `25161` — _ngAbilitaDragScroll
- `25198` — _ngCambiaNumeroGiorni
- `25230` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `25244` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `25285` — _ngToggleCat
- `25294` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `25318` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `25474` — _ngSalvaPianoManuale
- `25500` — _ngParseIngrediente
- `25524` — _ngScomponiIngredienti
- `25536` — _ricCalcolaMacroDaIngredienti
- `25554` — _ricRicalcolaMacroLive
- `25561` — _ricAggiornaInfoMacro
- `25575` — _ricRicalcolaMacroLiveNow
- `25599` — _ngTrovaCategoriaAlimento
- `25632` — _ngPescaRicetta
- `25675` — _ngScomponiRicettaNelPasto
- `25712` — _ngDragStart
- `25723` — _ngDragStartCella
- `25734` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `25741` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `25746` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `25765` — _ngAggiungiAlimento
- `25790` — _ngRimuoviAlimento
- `25804` — _ngDopoModifica
- `25822` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `25875` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `25904` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `25921` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `25929` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `26001` — gramTestoCasalingo
- `26027` — _appendToggleNutrizionali
- `26070` — _appendTogglePromemoria
- `26099` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `26245` — cpFromEmoji
- `26251` — getEmojiCp
- `26270` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `24245` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `24267` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `24272` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `24298` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `24386` — _spesaTestoWhatsApp
- `24402` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `24447` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `24470` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `24498` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `24558` — scaricaListaSpesaPDF (download diretto, un click)
- `24566` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `24578` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 27422-27422

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
- `27422` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 27436-27648

- `27436` — salvaInbody
- `27506` — delInbody
- `27513` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `27648` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 27676-28431

- `27676` — buildSemLegenda
- `27690` — renderAlEditor
- `27765` — _alimNomeRegex
- `27773` — _alimGiorniDaPiano
- `27781` — _scanGiorniPerNome
- `27796` — scanRiferimentiAlimento
- `27825` — _alimRefsRighe
- `27831` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `27919` — modificaAlimentoCustom
- `27939` — ripristinaValoriPrecedentiAlimento
- `27951` — _resetAlimModal
- `27963` — apriNuovoAlimentoCustom
- `27969` — salvaAlimentoCustom
- `28037` — eliminaAlimentoCustom
- `28337` — _alimFonteBadge
- `28342` — renderAlimentiPage
- `22217` — E
- `28413` — archiviaAlimentoCustom
- `28431` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 28458-29094

- `28458` — _bcSetStatus
- `28460` — apriScannerBarcode
- `28468` — chiudiScannerBarcode
- `28473` — _bcStopCamera
- `28481` — _bcModaleAperto
- `28483` — _bcAvviaCamera
- `28494` — _bcAvviaNativo
- `28514` — _bcAvviaZXing
- `28523` — _bcZXStart
- `28534` — _bcErroreCamera
- `28542` — cercaBarcodeManuale
- `28548` — _barcodeTrovato
- `28719` — cercaBarcodeOFF
- `28748` — _bcProdottoNonTrovato
- `28763` — _bcPrecompilaForm
- `22477` — num
- `28808` — togAl
- `28861` — selCatAl
- `25402` — selTuttiAl
- `28926` — _appIdAnag  (P140 T1)
- `28936` — _appSyncPaz  (P140 T1)
- `28980` — _appSpecchioInverso  (P140 T2)
- `29006` — _appRitiraSpecchio  (P140 T2)
- `29037` — _appAncoraTappe  (P140 T2)
- `29056` — _appTappe  (P140 T2)
- `29077` — _appMigraPaziente  (P140 T1)
- `29087` — _appMigraTutti  (P140 T1)
- `29094` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 29110-29579

- `29110` — setCalView
- `29120` — calPrev
- `29121` — calNext
- `29122` — calToday
- `29124` — renderCal
- `29138` — renderCalMonth
- `29165` — renderCalWeek
- `29198` — renderCalDay
- `29249` — selGiorno
- `29263` — setDisp
- `29268` — openAddEvento
- `29281` — openAddEventoPaz
- `29287` — toggleEntrataCheck
- `29292` — salvaEvento
- `29334` — _evTestoPromemoria  (P140 T1)
- `29340` — openEvDetail
- `29395` — delEvento
- `29417` — copyMsg
- `29429` — aggDateCal
- `27020` — syncInizio
- `27021` — syncControllo
- `29442` — aggiornaPrev
- `29467` — apriEventoDaScheda  (P140 T2)
- `29481` — _appAggiornaOreScheda  (P140 T2)
- `29498` — renderRic
- `29525` — openNuovaRic
- `29526` — editRic
- `29536` — salvaRic
- `29561` — delRic
- `29579` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 29665-29725

- `29665` — aggiungiEntrataPerPaziente
- `29682` — openNuovaEntrata
- `29696` — salvaEntrata
- `29717` — delEntrata
- `29725` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 29755-30470

- `29755` — aiSuggerisciRicetta
- `29800` — renderConcettiModal
- `29819` — apriConcettiModal
- `29846` — salvaConcettiAllegati
- `29870` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `29908` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `30051` — loadInbodyPDF
- `30172` — _vitdLabel
- `30176` — getIntegratori
- `30180` — getIntegraWant
- `30193` — _chiaviSpuntate *(P148 — risolve le etichette salvate in chiavi, regola 21)*
- `30201` — setIntegratori
- `30218` — setIntegraWant
- `30246` — _infoIntegratoreHtml *(P148 — contenuto del pannello ⓘ)*
- `30274` — mostraInfoIntegratore *(P148 — apre/chiude il pannello sotto la griglia)*
- `30286` — renderCaselleIntegratori *(P148 — genera le caselle dal catalogo; va chiamata PRIMA di setIntegratori, altrimenti le spunte non trovano gli elementi)*
- `30347` — getPatologieChip
- `30348` — getAllergieChip
- `30349` — setPatologieChip
- `30350` — setAllergieChip
- `30351` — getPatologie
- `30352` — getAllergie
- `30353` — setPatologieFromStr
- `30360` — setAllergieFromStr
- `30373` — getSdvChip
- `30374` — getCspChip
- `30375` — setSdvChip
- `30376` — setCspChip
- `30377` — setSdvFromStr
- `30378` — setCspFromStr
- `30382` — getBudget
- `30383` — setBudget
- `30388` — renderCalAnno
- `30419` — comprimeImmagine
- `30441` — uploadImmagineConcetto
- `30460` — rimuoviImmagineConcetto
- `30470` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 30536-30620

- `30536` — entraSelConcetti
- `30537` — annullaSelConcetti
- `30538` — toggleConcettoSel
- `30543` — eliminaConcettiSelezionati
- `30562` — confermaEliminaConcetti
- `30577` — aiRiscriviConcetto
- `30591` — editConcetto
- `30609` — salvaConcetto
- `30620` — openNuovoConcetto
- `27519` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 30657-30657

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
- `30657` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 30769-31094

- `30769` — renderScadenzeAlert
- `31029` — _scadGestiti  (P144)
- `31039` — _scadPota  (P144)
- `31054` — _scadMigraDaLocalStorage  (P144)
- `31077` — segnaGestito
- `31094` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 31103-31178

- `31103` — ripristinaPaz
- `31111` — eliminaPaz
- `31156` — getDove
- `31160` — setDove
- `31178` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 31183-31621

- `31183` — getCredenzialiPersistenti
- `31196` — cancellaCredenzialiPersistenti
- `31201` — rinnovaSessioneConRefreshToken
- `31218` — getSessioneSalvata
- `31237` — salvaSessione
- `31247` — cancellaSessione
- `31251` — eseguiLogin
- `31298` — eseguiLogout
- `31320` — mostraApp
- `31325` — verificaSessioneEAvvia
- `31353` — assicuraTokenValido
- `31382` — _garantiscoSessionePerSync
- `31394` — avviaRinnovoTokenPeriodico
- `31398` — fermaRinnovoTokenPeriodico
- `31407` — _authReset
- `31412` — _authMostra
- `31415` — mostraLogin
- `31416` — mostraRegistrazione
- `31417` — mostraRecupero
- `31418` — mostraNuovaPassword
- `31421` — eseguiRegistrazione
- `31459` — eseguiRecuperoPassword
- `31488` — eseguiNuovaPassword
- `31522` — _parseHashParams
- `31529` — _pulisciHash
- `31533` — gestisciRitornoAuth
- `31621` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 31693-31794

- `31693` — apriPannelloRicette
- `31722` — chiudiPannelloRicette
- `31730` — applicaRicettaPasto
- `31766` — inizializzaP2
- `31778` — deepClone
- `30143` — applicaPatch
- `31794` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
