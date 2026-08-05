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
Righe 2344-2386

- `2344` — _slugAlimento
- `2352` — _catalogoIndicizza
- `2356` — _catalogoDeindicizza
- `2363` — costruisciCatalogo
- `2386` — risolviAlimento

---

### MACROS PIANO — calcolo e badge macro reali vs target
Righe 2401-2759

- `2401` — getValoriCREA
- `2413` — getCurrentPaziente
- `2448` — getKcalWeekend
- `2503` — getMacrosRicettaComposta
- `2520` — _macrosCella
- `2546` — calcolaMacrosPiano
- `2658` — pastoMaxPerMacro
- `2687` — pastoMaxPerMacroTuttiIGiorni
- `2693` — renderBadgeMacrosReali
- `2611` — pctStr
- `2612` — color
- `2625` — row
- `2759` — renderBadgeMacrosReali_DOM

---

### ANALISI DEL SANGUE — parsing, indici clinici derivati, interpretazione
Righe 3044-3251

- `3044` — _parseAnalisiNum
- `3052` — calcolaIndice
- `3225` — interpretaAnalisi
- `3237` — _interpAnalisiHtml
- `3251` — mostraInfoRange

---

### CONCETTI EDUCATIVI — sync Supabase, migrazione
Righe 3398-3422

- `3398` — pushConcetiSupabase
- `3408` — pullConcetiSupabase
- `3422` — migraConcetti

---

### ALIMENTI — categorie funzionali/semaforo, chip UI, equivalenze porzioni
Righe 3612-3984

- `3612` — getCategoriaSemaforo
- `3629` — _getCategorieGruppo
- `3643` — calcolaGrammaturaEquivalente
- `3695` — _gruppoEquiv  (P121: gruppo di equivalenza + criterio per categoria funzionale)
- `3701` — _porzioneStandard  (P121: porzione `g` di database dell'alimento)
- `3716` — suggerisciGrEquivalente  (P121: firma a 3 argomenti, il gruppo si deduce dai due alimenti)
- `3742` — _etichettaCriterio  (P121: ≈carbo / ≈prot / ≈grassi / fissa / porzione)
- `3762` — _promptAlternativeGrassi  (P121: riga del prompt AI generata dal motore)
- `3778` — ricalcolaAlternative  (P121: MOTORE UNICO, unico punto che scrive la grammatura di un'alternativa)
- `3797` — ricalcolaAlternativePiano  (P121: applica il motore a tutte le celle di un piano)
- `3846` — arrotondaGrammatura  (P121: sostituisce arrotondaPorzioneDiscreta — pezzi interi senza tetto / 5g)
- `3856` — getCategoriaFunzionale
- `3896` — catArr
- `3912` — _tagComuniTrova
- `3916` — getTagComuniChip
- `3919` — setTagComuniChip
- `3927` — setCatChips
- `3940` — getStagioniChip
- `3943` — setStagioniChip
- `3950` — getProfiloChip
- `3953` — setProfiloChip
- `3962` — wireChipGroup
- `3973` — wireAttrChipGroups
- `3984` — wireRadioChipGroup

---

### CONFIG / STORAGE LOCALE — cfg, localStorage db, util data/valuta
Righe 4012-4428

- `4012` — getCfg
- `4013` — saveCfgL
- `4014` — getUrl
- `4015` — saveLocal
- `4016` — loadLocal
- `4028` — uid
- `4046` — ymdLoc  (P141)
- `4051` — today
- `4059` — addDays
- `4067` — fData
- `4068` — fEur
- `4070` — getLastSyncText
- `4080` — getSyncColor
- `4087` — aggiornaStatoSync
- `4113` — setSyncStatus
- `4382` — _registraTombstone
- `4390` — _tombstoneAttivi
- `4402` — _fondiTombstones
- `4416` — _mergeTombstonesRemoti *(dal 24/7 legge il meta da `collections`, P74 1d)*
- `4428` — _applicaTombstones
- `4289` — _pazFetchMeta *(P74 1d — solo `collections`)*
- `4310` — _collectionsUpsert *(P74 — scrittura primaria dei 4 meta-record dal cutover 1d)*
- `4332` — _collectionsFetch *(P74 1d — lettura unica dei meta-record)*
- `4355` — _analisiSangueUpsert *(P74 fase 2 — scrittura ombra analisi del sangue, 24/7)*

---

### SYNC SUPABASE — push/pull ricette/pazienti, tombstones, conflitti (P69)
Righe 4452-4885

- `4452` — supaHeaders
- `4466` — pushRicetteSupabase
- `4537` — pullRicetteSupabase
- `4561` — delRicetteSupabase
- `4573` — delPazienteSupabase
- `4588` — pushToSheets
- `4632` — pullFromSheets
- `4711` — syncNow
- `4724` — sincronizzaTutto
- `4360` — stpSet
- `4365` — stpMsg
- `4855` — testConnSupabase
- `4885` — _p68LogSaveAnonimo

---

### SYNC SUPABASE — save paziente, piani/cache piano, entrate, eventi
Righe 4899-5421

- `4899` — save
- `4917` — _pushRigaPerId
- `4950` — _flushDirtyIds
- `5033` — _p69LoadBaseline
- `5036` — _p69StoreBaseline
- `5039` — _p69SetBaseline
- `5043` — _p69DropBaseline
- `5047` — _p69SetBaselineFromRows
- `5053` — _p69NomePaz
- `5058` — _p69InList
- `5066` — _p69RilevaConflitti
- `5102` — _p69DialogoConflitti
- `4738` — chiudi
- `5136` — _p69RisolviRicarica
- `5165` — _p69EsportaLocali
- `5178` — _p69RisolviSovrascrivi
- `5191` — pushPianoSupabase
- `5213` — pullPianiSupabase
- `5229` — delPianoSupabase
- `5245` — delPianiPazienteSupabase
- `5257` — pushCachePianoSupabase
- `5274` — caricaCachePianoSupabase
- `5296` — pushEntrateSupabase
- `5320` — pullEntrateSupabase
- `5334` — delEntrataSupabase
- `5342` — pushEntrataSupabase
- `5353` — pushEventoSupabase
- `5366` — pushEventiSupabase
- `5390` — pullEventiSupabase
- `5410` — delEventoSupabase
- `5421` — _pianoCacheKey

---

### UI GENERALE — config AI key, notifiche, navigazione (goTo/tab/modali)
Righe 5452-5563

- `5452` — _salvaPianoCache
- `5457` — _caricaPianoCache
- `5463` — salvaCfg
- `5464` — testConn
- `5471` — testaAntKey
- `5482` — initAntCard
- `5485` — esporta
- `5486` — importa
- `5491` — goTo
- `5507` — closeM
- `5515` — ngChiudiModale
- `5524` — ngChiudiPopupCoppia
- `5528` — ngAggiungiX
- `5539` — ngUpgradeModali
- `5559` — mTab
- `5560` — aggiornaEta
- `5561` — toggleOrarioNote
- `5562` — pdTab
- `5563` — notif

---

### PAZIENTI — registro: lista/card/kanban, apertura, editing, salvataggio, routine
Righe 5571-8892

- `5571` — getPazView
- `5572` — setPazView
- `5581` — _pazStatoPiano
- `5589` — _pazUrgenzaControllo
- `5604` — _pazBadgePrenotato  (P142)
- `5611` — pazSegnaArrivato  (P142)
- `5617` — _pazStatoTagHtml
- `5634` — _pazAggiornaFiltroRegimi
- `5642` — renderPaz
- `5700` — _renderPazCard
- `5725` — _renderPazLista
- `5752` — _renderPazKanban
- `5790` — openNuovoPaz
- `5817` — editPaz
- `5901` — REGOLE_SEMAFORO_ALIMENTI *(15 condizioni cliniche → grigi/celesti; globale dal 26/7 per essere verificabile dal test)*
- `6348` — _SEM_COLORI_LEGACY / `6105` _SEM_COLORI_AUTO *(F9 — unico vocabolario dei colori automatici)*
- `6353` — NOMI_CONDIZIONE_SEMAFORO *(etichette delle 15 condizioni, usate anche dal riquadro della scheda)*
- `6375` — _semaforoCondizioniAttive *(le condizioni spuntate su un paziente)*
- `6386` — _semaforoMigraPaziente *(F9 — toglie i colori legacy e ricalcola; idempotente)*
- `6397` — _semaforoMigraTutti *(passata su tutti i pazienti in memoria, con conteggio)*
- `6408` — applicaRegoloSemaforo *(dal 26/7 pulisce TUTTI e sei i colori automatici, non solo i suoi due)*
- `6496` — trovaChiaveAlimento *(match esatto sul nome: se non trova, la regola è ignorata in silenzio — vedi test s2-regole-nomi-alimenti)*
- `6520` — _pazNumOPrec *(F7 — campo assente = valore precedente, non azzeramento)*
- `6532` — _pazPreservaCampi *(F5 — l'anagrafica non cancella i campi che il form non gestisce)*
- `6538` — salvaPaz
- `6688` — openPaz
- `8276` — catalogoIntegratoriAttivi *(P148 — voci proponibili, esclude quelle ritirate)*
- `8280` — integratorePerChiave *(P148)*
- `8316` — _normEtichettaIntegr *(P148)*
- `8324` — chiaveIntegratore *(P148 — etichetta storica → chiave stabile, regola 21)*
- `8342` — migraEtichetteIntegratori *(P148 — {chiavi, liberi}: le sconosciute si conservano)*
- `8411` — integratoriDaSuggerireInRoutine *(P148 — ponte Clinica→Routine: suggerimento, mai aggiunta automatica)*
- `8427` — _suggerimentiDaClinicaHTML *(P148)*
- `8443` — renderPdRoutine
- `6723` — cardHTML
- `8612` — updateRoutineCampo
- `8620` — suggerisciPastoEQuando
- `8668` — pianoPiuRecenteDelPaziente *(P148 — piano più recente del paziente, già espanso)*
- `8681` — _macroRegolaRoutine *(P148 — 'g' o 'c' secondo la regolaOrario del catalogo)*
- `8689` — routineAmmetteAuto *(P148)*
- `8694` — routineSlotDelGiorno *(P148 — pasto di una voce IN UN GIORNO; la scelta manuale vince sempre)*
- `8705` — routineSlotPerGiornoNome *(P148 — stessa cosa per nome del giorno: è la forma usata dal PDF)*
- `8717` — routineAssegnazionePerGiorni *(P148 — [{giorno, slot}] per la scheda Routine)*
- `8730` — pesoAttualePaziente *(P148 — dall'InBody più recente, regola 10; mai congelato)*
- `8739` — doseIntegratoreRisolta *(P148 — dose per peso dei BCAA; senza referto non inventa numeri)*
- `8751` — filtroLibreria
- `8760` — renderLibreriaGrid
- `8781` — aggiungiDaLibreriaIdx
- `8810` — openModalRoutine
- `8817` — salvaRoutineVoce
- `8842` — salvaRoutine
- `8849` — mostraRoutinePopup
- `8877` — removeRoutineVoce
- `8892` — _renderAggiustamentiSection

---

### 📈 PERCORSO — timeline di periodizzazione (P115 Tappe 1-5 COMPLETE, 24 lug 2026)
Righe 6021-6621 (numeri ESATTI al 24/7 notte, dopo la Tappa 5). ⚠️ Questo blocco (~600 righe) fa slittare tutti i numeri delle sezioni SUCCESSIVE a riga ~6020 rispetto all'ultima rigenerazione completa: per quelle sezioni fare grep di conferma. Rigenerazione completa alla prossima modifica strutturale.

- `6734` — _PERCORSO_TIPI (const: tipi fase, colori, pct default)
- `6741` — _percorsoGet *(normalizza p.percorso, scarta fasi invalide)*
- `6765` — _percorsoIntervalli *(fasi consecutive → date concrete dal/al)*
- `6779` — _percorsoFaseAt *(fase attiva a una data; dal incluso, al escluso)*
- `6788` — _percorsoKcalFase *(pct → kcal indicative via calcolaTDEE)*
- `6811` — _percorsoProiezione *(Tappa 2 — proiezione ibrida teorica/calibrata, cono, obiettivo a intervallo)*
- `6869` — _percorsoDataBreve *(ISO → "12 set")*
- `6886` — _percorsoSerieEnergia *(Tappa 3 — serie introito/TDEE stimato/TDEE osservato per la corsia energia)*
- `6925` — _percorsoSerieMassaMagra *(Tappa 4 — solo InBody: punti {data,m,pg})*
- `6944` — _percorsoConsuntivo *(Tappa 5 — legge p.consuntivo scritto da P50: aderenza, extra kcal, ritardo=extra÷7700, settimane perse; oggi sempre ok:false)*
- `6986` — _PERCORSO_LAYERS_DEFAULT / _percorsoLayersState / _percorsoLayersGet *(Tappa 4 — stato interruttori, SOLO sessione, mai su p)*
- `6991` — percorsoLayerToggle *(Tappa 4 — inverte un solo strato)*
- `6997` — percorsoVistaPreset *(Tappa 4 — preset "tecnica"/"paziente")*
- `7013` — _percorsoPaz *(e a seguire i mutatori percorsoInit/SetInizio/AddFase/UpdFase/DelFase/MoveFase)*
- `7069` — _PERCORSO_MODELLI / _PERCORSO_GEN *(P122 T3 — 4 modelli + regole dei cicli)*
- `7087` — _percorsoGeneraFasi *(P122 T3 — pura: dal traguardo alle fasi, ritmo = quello della proiezione)*
- `7167` — _percorsoModelloSelectHtml
- `7176` — percorsoGeneraDaModello *(propone; conferma prima di sostituire fasi esistenti)*
- `7199` — _percorsoShiftGiorni *(pura: ancora = ultima pesata)*
- `7209` — percorsoRiallinea *(⏩ trasla il piano, riprende dal giorno-fase dell'interruzione)*
- `7236` — _TRG_TIPI / `6744` _TRG_COMPORTAMENTI *(P122 T4 — tipi di traguardo e libreria comportamenti)*
- `7258` — _traguardiGet · `6761` _traguardoValoreAttuale *(valore corrente dai dati esistenti, null se manca)*
- `7297` — _traguardoVerso *(auto: dedotto dalla partenza)* · `6803` _traguardoValuta · `6824` _traguardiValuta
- `7338` — traguardoAdd · `6852` traguardoUpd · `6867` traguardoDel · `6873` traguardoSegna
- `7396` — _COND_TIPI · `6897` _percorsoCondizione *(pura: la fase finisce per soglia — SOLO suggerimento)*
- `7412` — percorsoSetCondizione · `6927` percorsoChiudiFase *(esito fotografato, riapribile)*
- `7446` — _traguardiHtml *(blocco 🏁 in fondo alla scheda Percorso)*
- `7544` — _percorsoVistaPaz / `7049` _percorsoVistaPazAttiva *(P122 T5 — modalità di sessione)*
- `7551` — _percorsoVittorie *(pura: vittorie dall'inizio del percorso + flag ricomposizione)*
- `7589` — _percorsoNascondiPeso *(in fase di massa il peso non si mostra al paziente)*
- `7600` — _traguardoFaseCorrente *(traguardo della fase IN CORSO, non quello lontano)*
- `7628` — _traguardoTestoPaziente *(righe in italiano semplice, riusate dal messaggio WhatsApp)*
- `7661` — _vistaPazienteHtml *(i tre riquadri che guarda il paziente)*
- `7741` — _percorsoChartSvg *(due corsie: peso + massa magra + cono proiezione sopra, striscia aderenza in mezzo (solo con dati P50), energia (kcal) sotto — tutto gated dagli interruttori)*
- `7930` — renderPdPercorso *(scheda: badge fase, riga proiezione/obiettivo, riga Piano vs Realtà (solo con dati), toolbar interruttori, grafico, editor)*

*(Tappa 2 tocca anche `calcolaMacros`: box obiettivo con intervallo al posto della data secca.)*

---

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 8977-9148

- `8977` — salvaAggiustamento
- `9010` — eliminaAggiustamento
- `9019` — renderPdNote
- `9054` — salvaNotaClinica
- `9069` — deleteNota
- `9078` — saveNote
- `9098` — resetSemaforoAuto *(F9 — pulsante 🔄 Ricalcola: pulisce gli automatici e rifà col sistema valido; il motore LEGACY non esiste più)*
- `9148` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 9389-9587

- `9389` — avviaFX
- `9417` — avviaAnalisi
- `9434` — _renderFlussoPanel
- `9478` — _riepEsc
- `9482` — _riepNum
- `9488` — _riepDelta
- `9496` — _riepDataSig
- `9514` — _riepParseFX
- `8087` — clean
- `9528` — _riepAggiornaFX
- `9554` — _riepToggleDomandaDefault
- `9566` — _riepAddDomanda
- `9579` — _riepRemoveDomanda
- `9587` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 9799-10042

- `8218` — dCol
- `8336` — card
- `9799` — renderPdRagionamento
- `9887` — inviaMessaggioRag
- `9905` — concludiERiassumi
- `9919` — salvaRagionamento
- `9940` — apriGeneratoreDaRag
- `9948` — nuovaSessioneRag
- `9954` — cancellaSavedRag
- `9964` — renderPazTimeline
- `10001` — renderPdAnamnesi
- `10042` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 11990-13125

- `11990` — _anNorm *(P125 — testo confrontabile: minuscole, niente accenti)*
- `11996` — _anCorrisponde *(P125 — ricerca per parole-prefisso: "vit d" trova "Vitamina D")*
- `12002` — filtraAnalisi *(P125 — filtro dal vivo delle 119 voci)*
- `12036` — pulisciRicercaAnalisi
- `12042` — renderPdAnalisi
- `12098` — toggleAnalisiSection
- `12247` — loadAnalisiSanguePDF
- `12134` — _impPdfConfigurata
- `12135` — _impPdfLib
- `12145` — _impPdfApri
- `12158` — _impPdfPagina *(P124b — una pagina del PDF → immagine, con la rotazione RILEVATA, non quella dichiarata dal file)*
- `12179` — _impRuotaImmagine
- `12204` — _impRilevaRotazione *(P124b — chiamata piccola: di quanti gradi va girata la pagina)*
- `12223` — _impPromptPagina *(P124b — prompt di UNA pagina, con l'impronta della riga: valore+unità+riferimento)*
- `12422` — _impNormalizzaNumero *(P124 — numero all'italiana → punto decimale, conversione fatta dall'app e non dall'AI)*
- `12433` — _impNumeri
- `12441` — _impSembraIntervallo
- `12449` — _impUgualeAlRange
- `12458` — _impLimitiStd
- `12479` — _impFuoriScala
- `12488` — _impCorrezioneVirgola
- `12500` — _impTestoLimiti
- `12521` — _impRifPlausibile *(P124b — un "riferimento" che è un'unità di misura = riga disallineata)*
- `12534` — _impUnitaCanonica
- `12556` — _impStessaGrandezza *(P124b — stesso tipo di misura a meno del prefisso: nanomoli/micromoli/millimoli)*
- `12573` — _impUnitaCompatibili
- `12584` — _impControllaValore *(P124 — i controlli anti-errore su un valore estratto)*
- `12648` — mostraDiffAnalisi *(P124 — colonna Estratto modificabile + righe sospette deselezionate)*
- `12838` — _calcoloIncluso
- `12844` — toggleCalcoloIncluso
- `12866` — _renderCalcoliPannello
- `12907` — toggleGlossario
- `12912` — updateAnalisi
- `12971` — salvaAnalisi
- `12984` — applicaGruppoClinico
- `13013` — renderBoxGruppiCliniciSuggeriti
- `13045` — suggerisciGruppiClinici
- `13125` — renderMemoriaInbody

---
### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9176 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `10172` — _richVal
- `10179` — _richBmi
- `10184` — _richPat
- `10190` — _richNum
- `10235` — _richPreselezione
- `10251` — richLeggiIntestazione
- `10255` — richSalvaIntestazione
- `10264` — apriRichiestaAnalisi
- `10284` — _richModaleHtml
- `10360` — _richEsc
- `10362` — _richMotivoCambia
- `10368` — _richToggleSez
- `10374` — _richAggiornaConteggi
- `10382` — _richMotivoCorrente
- `10392` — _richSelezione
- `10407` — _richTxt
- `10413` — _richCostruisciPDF
- `8969` — nuovaPagina
- `8970` — spazio
- `10509` — _richNomeFile
- `10514` — _richPrepara
- `10527` — _richRegistra
- `10532` — _richStato
- `10534` — richScaricaPDF
- `10583` — _richUpload
- `10585` — _richWaUrl
- `10592` — _richTestoWa
- `10606` — richInviaWhatsApp
- `10646` — richCopiaLink
- `10667` — _richStoricoHtml

---
### REFERTI DEL SANGUE DATATI — storico nel tempo (P118 tappa 1)
Righe 9194-9387 — migrazione, ordinamento, quadro attuale derivato, barra di selezione.

- `11767` — _refertoNuovoId
- `11770` — _refertoOggi
- `11774` — _refertoDataIt
- `11780` — _refertoConteggio
- `11794` — _refertiMigra
- `11821` — _refertiOrdinati
- `11832` — _refertoPiuRecente
- `11837` — _refertoInVista
- `11855` — _refertiApplica
- `11868` — _refertoCrea
- `11887` — refertoCambiaVista
- `11893` — refertoCambiaData
- `11905` — refertoNuovo
- `11913` — refertoDuplica
- `11922` — refertoElimina
- `11937` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `11380` — _rangeNum
- `11386` — _rangeTestoDa
- `11405` — _rangeCoppia
- `11415` — _rangeHtml

---
### ANDAMENTO NEL TEMPO — tracciato, variazione, grafico grande (P118 tappa 3)
Righe 9441-9745 — serie storica, regola del colore, sparkline, pannello in fondo.

- `11457` — _andLimiti
- `11478` — _andParseRangeLab
- `11491` — _andDistanza
- `11498` — _andValutazione
- `11511` — _andSerie
- `11525` — _andNum
- `11529` — _andDataBreve
- `11534` — _andMeseAnno
- `11542` — _andDominio
- `11556` — _andColore
- `11569` — _andSparkHtml
- `11595` — _andRigaHtml
- `11617` — _andEsamiSeguibili
- `11625` — andScegliEsame
- `11631` — _andPannelloHtml
- `11684` — _andGraficoGrande
- `11735` — _andPasso

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 13175-15042

- `13175` — _ibFmtBreve
- `13637` — _renderPesiIntermediSection
- `13752` — aggiungiPesoIntermedio
- `13768` — eliminaPesoIntermedio
- `13778` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `15042` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 15350-15350

- `15350` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 15731-18813

- `15731` — aggiornaLabelMacros
- `15749` — calcolaMacros
- `15890` — applicaSchema
- `15925` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `15931` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `15953` — _misuraDaReferto *(P127 — UN referto letto con le regole del traguardo: usata anche dalla verifica al controllo)*
- `15986` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `15997` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `16015` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `16128` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `16142` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `16198` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `16212` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `16244` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `16277` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `16319` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `16327` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `16338` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `16365` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `16380` — _stradeVerso *(le strade complete + percentuale libera)*
- `16427` — _VC_TOLLERANZA_PCT / _VC_GIORNI_MIN / _VC_GIORNI_MIN_RITARO / _VC_COPERTURA_MIN_PCT / _VC_MAGRA_PRUDENZA_GG *(P127 — soglie cliniche della verifica)*
- `16437` — _mediaSlotPrescritta *(media pesata sui giorni di un campo dello storico target; la usa anche _kcalMediaPrescrittaOss)*
- `16457` — _vcDeficitSlot *(deficit di uno slot: campo offset o kcal−tdee per gli slot vecchi)*
- `16465` — _vcTratto *(P127 — cosa è cambiato fra due referti, previsto vs reale, TDEE misurato)*
- `16519` — _vcTraguardoSalvato *(traguardo ricostruito dal salvato, per la scheda Percorso)*
- `16529` — _verificaControllo *(P127 — motore puro: tratto recente, quadro dall'inizio, residuo al ritmo reale)*
- `16567` — _verificaControlloHtml *(blocco 🔎, unica fonte per pannello 🎯 e scheda Percorso; azioni solo dove c'è il campo kcal)*
- `16659` — _vcRitara *(scrive le kcal ritarate nel campo regime: propone, non salva)*
- `16672` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `16740` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `16762` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `16815` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `16922` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `16937` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `16962` — _renderRifPesoBox
- `17013` — _usaRifPeso
- `17017` — _aggiornaRifPesoTarget
- `17020` — _aggiornaRegimeSlider
- `17677` — _presetRegime
- `17681` — _initRegimeSliderDaPaziente
- `16633` — ricalcolaLAF
- `17859` — renderStoricoTDEE
- `17901` — attivaSlotTDEE
- `17918` — eliminaSlotTDEE
- `17931` — _toggleCiclizzazione
- `17937` — _aggiornaAnteprimaCiclizzazione
- `17955` — salvaCalcoloMacros
- `18270` — _metAllenamento
- `18509` — _neatFrazione
- `18628` — _larnLafStileVita
- `18645` — _regimeOffset
- `18655` — _componiRegimeText
- `18688` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `18700` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `18707` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `18813` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 18831-19275

- `18831` — renderTargetBadge
- `17819` — verificaRegola_75_20_5
- `17856` — renderBadge75_20_5
- `18976` — _validaNorm
- `18979` — _validaMatchTermine
- `18987` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `19038` — _validaTesto
- `19059` — validaPiano
- `19133` — _validaFirmaBlocchi
- `19140` — renderBadgeValidatore
- `19171` — _validaVaiAlGiorno
- `19180` — apriPannelloValidatore
- `13472` — esc
- `19237` — _validaEseguiOverride
- `19260` — validaGateExport
- `19275` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 19408-20040

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
- `19408` — pianoPazSelezionato
- `19555` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `19793` — renderPanelMacrosGiorno
- `19936` — pmgCambiaGrammi
- `19963` — riapriPiano
- `20001` — _montaPianoCorrente
- `20040` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 20050-20524

- `20050` — pullTemplateSupabase
- `20061` — delTemplateSupabase
- `20070` — _promptTemplateNome
- `20095` — _creaTemplateDaJSON
- `20118` — salvaComeTemplate
- `20129` — salvaComeTemplateDaPiano
- `20138` — _normNomeAlim
- `20139` — _escRegAlim
- `20140` — _raccogliAlimentiDaPiano
- `20151` — _alimentiEsclusiPaziente
- `20163` — _trovaConflittiTemplate
- `20181` — _mostraAvvisoConflitti
- `20205` — applicaTemplate
- `20223` — apriPickerTemplate
- `20251` — _pickPaziente
- `20275` — applicaTemplatePick
- `20279` — rinominaTemplate
- `20290` — eliminaTemplate
- `20300` — renderLibreriaTemplate
- `20329` — renderStoricoPiani
- `20388` — eliminaPiano
- `20404` — _getActiveMacrosTarget
- `20428` — getTargetAttivi
- `20465` — calcolaTargetsCiclizzazione
- `20491` — _setupPianoTargets
- `20515` — getStagioneCorrente
- `20524` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 20995-20995

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `20995` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 21004-21463

- `21004` — aggiornaUIcolazione
- `21014` — salvaRegolePiano
- `21075` — _isModelloSistema
- `21078` — _isModelloSistemaModificato
- `21090` — caricaModelliCustomLocal
- `21104` — salvaModelliCustomLocal
- `21125` — _migraRecordCustom
- `21140` — _syncAliasLegacy
- `21149` — caricaAlimentiCustom
- `21173` — pushAlimentiCustomSupabase
- `21183` — pullAlimentiCustomSupabase
- `21197` — pushModelliSupabase
- `21215` — pullModelliSupabase
- `21240` — _calcolaFreqDaModello
- `21259` — aggiornaUImodello
- `21348` — popolaDropdownModelli
- `21376` — cambiaModelloRotazione
- `21382` — ripristinaModelloOriginale
- `21405` — eliminaModelloCustom
- `21423` — mostraAnteprimaModello
- `21433` — apriEditorModello
- `21463` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 21732-21970

- `15738` — rerender
- `21732` — _salvaModelloDaEditor
- `21774` — caricaRegolePiano
- `21804` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `21839` — _aiLogUsage
- `21861` — _aiProxyUrl
- `21867` — _aiTokenPerProxy
- `21896` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `21970` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 22049-22189

- `16216` — _risolviCollisioniCelle
- `22049` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `22109` — getFruttaStile
- `22116` — _fruttaGetPasto
- `22126` — _fruttaContaRigheRicetta
- `22130` — _fruttaIndiceBasePasto
- `22150` — getFruttaMarker
- `22163` — fruttaMarkerHtml
- `22171` — _fruttaCheckboxHtml
- `22180` — toggleFrutta
- `22189` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 22225-23499

- `22225` — _renderCelleGriglia
- `22305` — _renderRicetteTestuali
- `22344` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `22415` — _renderCelleHtml
- `22423` — toggleCellaMenu
- `22442` — closeAllCellaMenus
- `22450` — _trovaPasto
- `22458` — cellaSposta
- `22512` — cellaCancella
- `22533` — apriEditGrammatura
- `16789` — salva
- `22581` — cellaSwap
- `22601` — cellaRimuoviAlt
- `22615` — cellaAggiungiAlt
- `22718` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `22803` — apriEditRicetta
- `22812` — aggiungiRicetta
- `22828` — rimuoviRicetta
- `22837` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `22999` — ngAggiungiSpuntinoVuoto
- `23015` — apriAggiungiCella
- `17254` — risolviCompatibili
- `23111` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `23203` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `23344` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `23499` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 23547-23939

- `23547` — _attesoStrutturaPiano
- `23567` — _confrontaStrutturaPiano
- `23597` — _costruisciPromptDelta
- `23624` — _pianoToolSchema
- `23699` — _pianoMaxTokens
- `23708` — _estraiPianoDaRisposta
- `23730` — chiamaGeneraPiano
- `23897` — mostraLoadingSteps
- `18123` — render
- `23939` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 24006-24583

- `24006` — generaMessaggioAI
- `24111` — copiaMessaggioAI
- `24121` — salvaInStorico
- `24133` — salvaVarianteAI
- `24148` — renderVariantiSalvate
- `24167` — usaVariante
- `24185` — eliminaVariante
- `24196` — renderStoricoMsg
- `24212` — apriWhatsApp
- `24583` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 24761-26258

- `24761` — _ngColoreSemaforoNome
- `24769` — apriSceltaModalitaPiano
- `24804` — _ngChiudiModalita
- `24807` — _ngCostruisciGiornoVuoto
- `24840` — _ngCostruisciGiornoSpeciale
- `24851` — _ngIndiceInizioSpeciali
- `24862` — _ngModalitaNomeGiorno
- `24868` — _ngImpostaModalitaNomeGiorno
- `24871` — _ngLettera
- `24878` — _ngEtichettaGiorno
- `24898` — _ngEtichettaGiornoBreve
- `24912` — _ngToggleGiornoSpeciale
- `24936` — _ngRenderPannelloSpeciale
- `25004` — _generaGiornoSpecialeAI
- `25104` — _ngGiornoHaContenuto
- `25116` — _ngCreaPianoManuale
- `25139` — _ngScrollTabGiorni
- `25149` — _ngAbilitaDragScroll
- `25186` — _ngCambiaNumeroGiorni
- `25218` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `25232` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `25273` — _ngToggleCat
- `25282` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `25306` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `25462` — _ngSalvaPianoManuale
- `25488` — _ngParseIngrediente
- `25512` — _ngScomponiIngredienti
- `25524` — _ricCalcolaMacroDaIngredienti
- `25542` — _ricRicalcolaMacroLive
- `25549` — _ricAggiornaInfoMacro
- `25563` — _ricRicalcolaMacroLiveNow
- `25587` — _ngTrovaCategoriaAlimento
- `25620` — _ngPescaRicetta
- `25663` — _ngScomponiRicettaNelPasto
- `25700` — _ngDragStart
- `25711` — _ngDragStartCella
- `25722` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `25729` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `25734` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `25753` — _ngAggiungiAlimento
- `25778` — _ngRimuoviAlimento
- `25792` — _ngDopoModifica
- `25810` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `25863` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `25892` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `25909` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `25917` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `25989` — gramTestoCasalingo
- `26015` — _appendToggleNutrizionali
- `26058` — _appendTogglePromemoria
- `26087` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `26233` — cpFromEmoji
- `26239` — getEmojiCp
- `26258` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `24233` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `24255` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `24260` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `24286` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `24374` — _spesaTestoWhatsApp
- `24390` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `24435` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `24458` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `24486` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `24546` — scaricaListaSpesaPDF (download diretto, un click)
- `24554` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `24566` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 27410-27410

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
- `27410` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 27424-27636

- `27424` — salvaInbody
- `27494` — delInbody
- `27501` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `27636` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 27664-28147

- `27664` — buildSemLegenda
- `27678` — renderAlEditor
- `27753` — _alimNomeRegex
- `27761` — _alimGiorniDaPiano
- `27769` — _scanGiorniPerNome
- `27784` — scanRiferimentiAlimento
- `27813` — _alimRefsRighe
- `27819` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `27907` — modificaAlimentoCustom
- `27927` — ripristinaValoriPrecedentiAlimento
- `27939` — _resetAlimModal
- `27950` — apriNuovoAlimentoCustom
- `27956` — salvaAlimentoCustom
- `28023` — eliminaAlimentoCustom
- `28054` — _alimFonteBadge
- `28059` — renderAlimentiPage
- `22217` — E
- `28129` — archiviaAlimentoCustom
- `28147` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 28174-28622

- `28174` — _bcSetStatus
- `28176` — apriScannerBarcode
- `28184` — chiudiScannerBarcode
- `28189` — _bcStopCamera
- `28197` — _bcModaleAperto
- `28199` — _bcAvviaCamera
- `28210` — _bcAvviaNativo
- `28230` — _bcAvviaZXing
- `28239` — _bcZXStart
- `28250` — _bcErroreCamera
- `28258` — cercaBarcodeManuale
- `28264` — _barcodeTrovato
- `28280` — cercaBarcodeOFF
- `28298` — _bcProdottoNonTrovato
- `28312` — _bcPrecompilaForm
- `22477` — num
- `28336` — togAl
- `28389` — selCatAl
- `25402` — selTuttiAl
- `28454` — _appIdAnag  (P140 T1)
- `28464` — _appSyncPaz  (P140 T1)
- `28508` — _appSpecchioInverso  (P140 T2)
- `28534` — _appRitiraSpecchio  (P140 T2)
- `28565` — _appAncoraTappe  (P140 T2)
- `28584` — _appTappe  (P140 T2)
- `28605` — _appMigraPaziente  (P140 T1)
- `28615` — _appMigraTutti  (P140 T1)
- `28622` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 28638-29107

- `28638` — setCalView
- `28648` — calPrev
- `28649` — calNext
- `28650` — calToday
- `28652` — renderCal
- `28666` — renderCalMonth
- `28693` — renderCalWeek
- `28726` — renderCalDay
- `28777` — selGiorno
- `28791` — setDisp
- `28796` — openAddEvento
- `28809` — openAddEventoPaz
- `28815` — toggleEntrataCheck
- `28820` — salvaEvento
- `28862` — _evTestoPromemoria  (P140 T1)
- `28868` — openEvDetail
- `28923` — delEvento
- `28945` — copyMsg
- `28957` — aggDateCal
- `27020` — syncInizio
- `27021` — syncControllo
- `28970` — aggiornaPrev
- `28995` — apriEventoDaScheda  (P140 T2)
- `29009` — _appAggiornaOreScheda  (P140 T2)
- `29026` — renderRic
- `29053` — openNuovaRic
- `29054` — editRic
- `29064` — salvaRic
- `29089` — delRic
- `29107` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 29193-29253

- `29193` — aggiungiEntrataPerPaziente
- `29210` — openNuovaEntrata
- `29224` — salvaEntrata
- `29245` — delEntrata
- `29253` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 29283-29998

- `29283` — aiSuggerisciRicetta
- `29328` — renderConcettiModal
- `29347` — apriConcettiModal
- `29374` — salvaConcettiAllegati
- `29398` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `29436` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `29579` — loadInbodyPDF
- `29700` — _vitdLabel
- `29704` — getIntegratori
- `29708` — getIntegraWant
- `29721` — _chiaviSpuntate *(P148 — risolve le etichette salvate in chiavi, regola 21)*
- `29729` — setIntegratori
- `29746` — setIntegraWant
- `29774` — _infoIntegratoreHtml *(P148 — contenuto del pannello ⓘ)*
- `29802` — mostraInfoIntegratore *(P148 — apre/chiude il pannello sotto la griglia)*
- `29814` — renderCaselleIntegratori *(P148 — genera le caselle dal catalogo; va chiamata PRIMA di setIntegratori, altrimenti le spunte non trovano gli elementi)*
- `29875` — getPatologieChip
- `29876` — getAllergieChip
- `29877` — setPatologieChip
- `29878` — setAllergieChip
- `29879` — getPatologie
- `29880` — getAllergie
- `29881` — setPatologieFromStr
- `29888` — setAllergieFromStr
- `29901` — getSdvChip
- `29902` — getCspChip
- `29903` — setSdvChip
- `29904` — setCspChip
- `29905` — setSdvFromStr
- `29906` — setCspFromStr
- `29910` — getBudget
- `29911` — setBudget
- `29916` — renderCalAnno
- `29947` — comprimeImmagine
- `29969` — uploadImmagineConcetto
- `29988` — rimuoviImmagineConcetto
- `29998` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 30064-30148

- `30064` — entraSelConcetti
- `30065` — annullaSelConcetti
- `30066` — toggleConcettoSel
- `30071` — eliminaConcettiSelezionati
- `30090` — confermaEliminaConcetti
- `30105` — aiRiscriviConcetto
- `30119` — editConcetto
- `30137` — salvaConcetto
- `30148` — openNuovoConcetto
- `27519` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 30185-30185

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
- `30185` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 30297-30622

- `30297` — renderScadenzeAlert
- `30557` — _scadGestiti  (P144)
- `30567` — _scadPota  (P144)
- `30582` — _scadMigraDaLocalStorage  (P144)
- `30605` — segnaGestito
- `30622` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 30631-30706

- `30631` — ripristinaPaz
- `30639` — eliminaPaz
- `30684` — getDove
- `30688` — setDove
- `30706` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 30711-31149

- `30711` — getCredenzialiPersistenti
- `30724` — cancellaCredenzialiPersistenti
- `30729` — rinnovaSessioneConRefreshToken
- `30746` — getSessioneSalvata
- `30765` — salvaSessione
- `30775` — cancellaSessione
- `30779` — eseguiLogin
- `30826` — eseguiLogout
- `30848` — mostraApp
- `30853` — verificaSessioneEAvvia
- `30881` — assicuraTokenValido
- `30910` — _garantiscoSessionePerSync
- `30922` — avviaRinnovoTokenPeriodico
- `30926` — fermaRinnovoTokenPeriodico
- `30935` — _authReset
- `30940` — _authMostra
- `30943` — mostraLogin
- `30944` — mostraRegistrazione
- `30945` — mostraRecupero
- `30946` — mostraNuovaPassword
- `30949` — eseguiRegistrazione
- `30987` — eseguiRecuperoPassword
- `31016` — eseguiNuovaPassword
- `31050` — _parseHashParams
- `31057` — _pulisciHash
- `31061` — gestisciRitornoAuth
- `31149` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 31221-31322

- `31221` — apriPannelloRicette
- `31250` — chiudiPannelloRicette
- `31258` — applicaRicettaPasto
- `31294` — inizializzaP2
- `31306` — deepClone
- `30143` — applicaPatch
- `31322` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
