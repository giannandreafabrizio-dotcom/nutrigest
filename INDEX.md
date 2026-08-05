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
Righe 13175-15015

- `13175` — _ibFmtBreve
- `13627` — _renderPesiIntermediSection
- `13725` — aggiungiPesoIntermedio
- `13741` — eliminaPesoIntermedio
- `13751` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `15015` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 15323-15323

- `15323` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 15704-18786

- `15704` — aggiornaLabelMacros
- `15722` — calcolaMacros
- `15863` — applicaSchema
- `15898` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `15904` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `15926` — _misuraDaReferto *(P127 — UN referto letto con le regole del traguardo: usata anche dalla verifica al controllo)*
- `15959` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `15970` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `15988` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `16101` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `16115` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `16171` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `16185` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `16217` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `16250` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `16292` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `16300` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `16311` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `16338` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `16353` — _stradeVerso *(le strade complete + percentuale libera)*
- `16400` — _VC_TOLLERANZA_PCT / _VC_GIORNI_MIN / _VC_GIORNI_MIN_RITARO / _VC_COPERTURA_MIN_PCT / _VC_MAGRA_PRUDENZA_GG *(P127 — soglie cliniche della verifica)*
- `16410` — _mediaSlotPrescritta *(media pesata sui giorni di un campo dello storico target; la usa anche _kcalMediaPrescrittaOss)*
- `16430` — _vcDeficitSlot *(deficit di uno slot: campo offset o kcal−tdee per gli slot vecchi)*
- `16438` — _vcTratto *(P127 — cosa è cambiato fra due referti, previsto vs reale, TDEE misurato)*
- `16492` — _vcTraguardoSalvato *(traguardo ricostruito dal salvato, per la scheda Percorso)*
- `16502` — _verificaControllo *(P127 — motore puro: tratto recente, quadro dall'inizio, residuo al ritmo reale)*
- `16540` — _verificaControlloHtml *(blocco 🔎, unica fonte per pannello 🎯 e scheda Percorso; azioni solo dove c'è il campo kcal)*
- `16632` — _vcRitara *(scrive le kcal ritarate nel campo regime: propone, non salva)*
- `16645` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `16713` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `16735` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `16788` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `16895` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `16910` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `16935` — _renderRifPesoBox
- `16986` — _usaRifPeso
- `16990` — _aggiornaRifPesoTarget
- `16993` — _aggiornaRegimeSlider
- `17650` — _presetRegime
- `17654` — _initRegimeSliderDaPaziente
- `16633` — ricalcolaLAF
- `17832` — renderStoricoTDEE
- `17874` — attivaSlotTDEE
- `17891` — eliminaSlotTDEE
- `17904` — _toggleCiclizzazione
- `17910` — _aggiornaAnteprimaCiclizzazione
- `17928` — salvaCalcoloMacros
- `18243` — _metAllenamento
- `18482` — _neatFrazione
- `18601` — _larnLafStileVita
- `18618` — _regimeOffset
- `18628` — _componiRegimeText
- `18661` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `18673` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `18680` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `18786` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 18804-19248

- `18804` — renderTargetBadge
- `17819` — verificaRegola_75_20_5
- `17856` — renderBadge75_20_5
- `18949` — _validaNorm
- `18952` — _validaMatchTermine
- `18960` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `19011` — _validaTesto
- `19032` — validaPiano
- `19106` — _validaFirmaBlocchi
- `19113` — renderBadgeValidatore
- `19144` — _validaVaiAlGiorno
- `19153` — apriPannelloValidatore
- `13472` — esc
- `19210` — _validaEseguiOverride
- `19233` — validaGateExport
- `19248` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 19381-20013

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
- `19381` — pianoPazSelezionato
- `19528` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `19766` — renderPanelMacrosGiorno
- `19909` — pmgCambiaGrammi
- `19936` — riapriPiano
- `19974` — _montaPianoCorrente
- `20013` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 20023-20497

- `20023` — pullTemplateSupabase
- `20034` — delTemplateSupabase
- `20043` — _promptTemplateNome
- `20068` — _creaTemplateDaJSON
- `20091` — salvaComeTemplate
- `20102` — salvaComeTemplateDaPiano
- `20111` — _normNomeAlim
- `20112` — _escRegAlim
- `20113` — _raccogliAlimentiDaPiano
- `20124` — _alimentiEsclusiPaziente
- `20136` — _trovaConflittiTemplate
- `20154` — _mostraAvvisoConflitti
- `20178` — applicaTemplate
- `20196` — apriPickerTemplate
- `20224` — _pickPaziente
- `20248` — applicaTemplatePick
- `20252` — rinominaTemplate
- `20263` — eliminaTemplate
- `20273` — renderLibreriaTemplate
- `20302` — renderStoricoPiani
- `20361` — eliminaPiano
- `20377` — _getActiveMacrosTarget
- `20401` — getTargetAttivi
- `20438` — calcolaTargetsCiclizzazione
- `20464` — _setupPianoTargets
- `20488` — getStagioneCorrente
- `20497` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 20968-20968

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `20968` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 20977-21436

- `20977` — aggiornaUIcolazione
- `20987` — salvaRegolePiano
- `21048` — _isModelloSistema
- `21051` — _isModelloSistemaModificato
- `21063` — caricaModelliCustomLocal
- `21077` — salvaModelliCustomLocal
- `21098` — _migraRecordCustom
- `21113` — _syncAliasLegacy
- `21122` — caricaAlimentiCustom
- `21146` — pushAlimentiCustomSupabase
- `21156` — pullAlimentiCustomSupabase
- `21170` — pushModelliSupabase
- `21188` — pullModelliSupabase
- `21213` — _calcolaFreqDaModello
- `21232` — aggiornaUImodello
- `21321` — popolaDropdownModelli
- `21349` — cambiaModelloRotazione
- `21355` — ripristinaModelloOriginale
- `21378` — eliminaModelloCustom
- `21396` — mostraAnteprimaModello
- `21406` — apriEditorModello
- `21436` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 21705-21943

- `15738` — rerender
- `21705` — _salvaModelloDaEditor
- `21747` — caricaRegolePiano
- `21777` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `21812` — _aiLogUsage
- `21834` — _aiProxyUrl
- `21840` — _aiTokenPerProxy
- `21869` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `21943` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 22022-22162

- `16216` — _risolviCollisioniCelle
- `22022` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `22082` — getFruttaStile
- `22089` — _fruttaGetPasto
- `22099` — _fruttaContaRigheRicetta
- `22103` — _fruttaIndiceBasePasto
- `22123` — getFruttaMarker
- `22136` — fruttaMarkerHtml
- `22144` — _fruttaCheckboxHtml
- `22153` — toggleFrutta
- `22162` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 22198-23472

- `22198` — _renderCelleGriglia
- `22278` — _renderRicetteTestuali
- `22317` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `22388` — _renderCelleHtml
- `22396` — toggleCellaMenu
- `22415` — closeAllCellaMenus
- `22423` — _trovaPasto
- `22431` — cellaSposta
- `22485` — cellaCancella
- `22506` — apriEditGrammatura
- `16789` — salva
- `22554` — cellaSwap
- `22574` — cellaRimuoviAlt
- `22588` — cellaAggiungiAlt
- `22691` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `22776` — apriEditRicetta
- `22785` — aggiungiRicetta
- `22801` — rimuoviRicetta
- `22810` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `22972` — ngAggiungiSpuntinoVuoto
- `22988` — apriAggiungiCella
- `17254` — risolviCompatibili
- `23084` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `23176` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `23317` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `23472` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 23520-23912

- `23520` — _attesoStrutturaPiano
- `23540` — _confrontaStrutturaPiano
- `23570` — _costruisciPromptDelta
- `23597` — _pianoToolSchema
- `23672` — _pianoMaxTokens
- `23681` — _estraiPianoDaRisposta
- `23703` — chiamaGeneraPiano
- `23870` — mostraLoadingSteps
- `18123` — render
- `23912` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 23979-24556

- `23979` — generaMessaggioAI
- `24084` — copiaMessaggioAI
- `24094` — salvaInStorico
- `24106` — salvaVarianteAI
- `24121` — renderVariantiSalvate
- `24140` — usaVariante
- `24158` — eliminaVariante
- `24169` — renderStoricoMsg
- `24185` — apriWhatsApp
- `24556` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 24734-26231

- `24734` — _ngColoreSemaforoNome
- `24742` — apriSceltaModalitaPiano
- `24777` — _ngChiudiModalita
- `24780` — _ngCostruisciGiornoVuoto
- `24813` — _ngCostruisciGiornoSpeciale
- `24824` — _ngIndiceInizioSpeciali
- `24835` — _ngModalitaNomeGiorno
- `24841` — _ngImpostaModalitaNomeGiorno
- `24844` — _ngLettera
- `24851` — _ngEtichettaGiorno
- `24871` — _ngEtichettaGiornoBreve
- `24885` — _ngToggleGiornoSpeciale
- `24909` — _ngRenderPannelloSpeciale
- `24977` — _generaGiornoSpecialeAI
- `25077` — _ngGiornoHaContenuto
- `25089` — _ngCreaPianoManuale
- `25112` — _ngScrollTabGiorni
- `25122` — _ngAbilitaDragScroll
- `25159` — _ngCambiaNumeroGiorni
- `25191` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `25205` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `25246` — _ngToggleCat
- `25255` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `25279` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `25435` — _ngSalvaPianoManuale
- `25461` — _ngParseIngrediente
- `25485` — _ngScomponiIngredienti
- `25497` — _ricCalcolaMacroDaIngredienti
- `25515` — _ricRicalcolaMacroLive
- `25522` — _ricAggiornaInfoMacro
- `25536` — _ricRicalcolaMacroLiveNow
- `25560` — _ngTrovaCategoriaAlimento
- `25593` — _ngPescaRicetta
- `25636` — _ngScomponiRicettaNelPasto
- `25673` — _ngDragStart
- `25684` — _ngDragStartCella
- `25695` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `25702` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `25707` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `25726` — _ngAggiungiAlimento
- `25751` — _ngRimuoviAlimento
- `25765` — _ngDopoModifica
- `25783` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `25836` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `25865` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `25882` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `25890` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `25962` — gramTestoCasalingo
- `25988` — _appendToggleNutrizionali
- `26031` — _appendTogglePromemoria
- `26060` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `26206` — cpFromEmoji
- `26212` — getEmojiCp
- `26231` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `24206` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `24228` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `24233` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `24259` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `24347` — _spesaTestoWhatsApp
- `24363` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `24408` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `24431` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `24459` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `24519` — scaricaListaSpesaPDF (download diretto, un click)
- `24527` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `24539` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 27383-27383

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
- `27383` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 27397-27609

- `27397` — salvaInbody
- `27467` — delInbody
- `27474` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `27609` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 27637-28120

- `27637` — buildSemLegenda
- `27651` — renderAlEditor
- `27726` — _alimNomeRegex
- `27734` — _alimGiorniDaPiano
- `27742` — _scanGiorniPerNome
- `27757` — scanRiferimentiAlimento
- `27786` — _alimRefsRighe
- `27792` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `27880` — modificaAlimentoCustom
- `27900` — ripristinaValoriPrecedentiAlimento
- `27912` — _resetAlimModal
- `27923` — apriNuovoAlimentoCustom
- `27929` — salvaAlimentoCustom
- `27996` — eliminaAlimentoCustom
- `28027` — _alimFonteBadge
- `28032` — renderAlimentiPage
- `22217` — E
- `28102` — archiviaAlimentoCustom
- `28120` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 28147-28595

- `28147` — _bcSetStatus
- `28149` — apriScannerBarcode
- `28157` — chiudiScannerBarcode
- `28162` — _bcStopCamera
- `28170` — _bcModaleAperto
- `28172` — _bcAvviaCamera
- `28183` — _bcAvviaNativo
- `28203` — _bcAvviaZXing
- `28212` — _bcZXStart
- `28223` — _bcErroreCamera
- `28231` — cercaBarcodeManuale
- `28237` — _barcodeTrovato
- `28253` — cercaBarcodeOFF
- `28271` — _bcProdottoNonTrovato
- `28285` — _bcPrecompilaForm
- `22477` — num
- `28309` — togAl
- `28362` — selCatAl
- `25402` — selTuttiAl
- `28427` — _appIdAnag  (P140 T1)
- `28437` — _appSyncPaz  (P140 T1)
- `28481` — _appSpecchioInverso  (P140 T2)
- `28507` — _appRitiraSpecchio  (P140 T2)
- `28538` — _appAncoraTappe  (P140 T2)
- `28557` — _appTappe  (P140 T2)
- `28578` — _appMigraPaziente  (P140 T1)
- `28588` — _appMigraTutti  (P140 T1)
- `28595` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 28611-29080

- `28611` — setCalView
- `28621` — calPrev
- `28622` — calNext
- `28623` — calToday
- `28625` — renderCal
- `28639` — renderCalMonth
- `28666` — renderCalWeek
- `28699` — renderCalDay
- `28750` — selGiorno
- `28764` — setDisp
- `28769` — openAddEvento
- `28782` — openAddEventoPaz
- `28788` — toggleEntrataCheck
- `28793` — salvaEvento
- `28835` — _evTestoPromemoria  (P140 T1)
- `28841` — openEvDetail
- `28896` — delEvento
- `28918` — copyMsg
- `28930` — aggDateCal
- `27020` — syncInizio
- `27021` — syncControllo
- `28943` — aggiornaPrev
- `28968` — apriEventoDaScheda  (P140 T2)
- `28982` — _appAggiornaOreScheda  (P140 T2)
- `28999` — renderRic
- `29026` — openNuovaRic
- `29027` — editRic
- `29037` — salvaRic
- `29062` — delRic
- `29080` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 29166-29226

- `29166` — aggiungiEntrataPerPaziente
- `29183` — openNuovaEntrata
- `29197` — salvaEntrata
- `29218` — delEntrata
- `29226` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 29256-29971

- `29256` — aiSuggerisciRicetta
- `29301` — renderConcettiModal
- `29320` — apriConcettiModal
- `29347` — salvaConcettiAllegati
- `29371` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `29409` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `29552` — loadInbodyPDF
- `29673` — _vitdLabel
- `29677` — getIntegratori
- `29681` — getIntegraWant
- `29694` — _chiaviSpuntate *(P148 — risolve le etichette salvate in chiavi, regola 21)*
- `29702` — setIntegratori
- `29719` — setIntegraWant
- `29747` — _infoIntegratoreHtml *(P148 — contenuto del pannello ⓘ)*
- `29775` — mostraInfoIntegratore *(P148 — apre/chiude il pannello sotto la griglia)*
- `29787` — renderCaselleIntegratori *(P148 — genera le caselle dal catalogo; va chiamata PRIMA di setIntegratori, altrimenti le spunte non trovano gli elementi)*
- `29848` — getPatologieChip
- `29849` — getAllergieChip
- `29850` — setPatologieChip
- `29851` — setAllergieChip
- `29852` — getPatologie
- `29853` — getAllergie
- `29854` — setPatologieFromStr
- `29861` — setAllergieFromStr
- `29874` — getSdvChip
- `29875` — getCspChip
- `29876` — setSdvChip
- `29877` — setCspChip
- `29878` — setSdvFromStr
- `29879` — setCspFromStr
- `29883` — getBudget
- `29884` — setBudget
- `29889` — renderCalAnno
- `29920` — comprimeImmagine
- `29942` — uploadImmagineConcetto
- `29961` — rimuoviImmagineConcetto
- `29971` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 30037-30121

- `30037` — entraSelConcetti
- `30038` — annullaSelConcetti
- `30039` — toggleConcettoSel
- `30044` — eliminaConcettiSelezionati
- `30063` — confermaEliminaConcetti
- `30078` — aiRiscriviConcetto
- `30092` — editConcetto
- `30110` — salvaConcetto
- `30121` — openNuovoConcetto
- `27519` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 30158-30158

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
- `30158` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 30270-30595

- `30270` — renderScadenzeAlert
- `30530` — _scadGestiti  (P144)
- `30540` — _scadPota  (P144)
- `30555` — _scadMigraDaLocalStorage  (P144)
- `30578` — segnaGestito
- `30595` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 30604-30679

- `30604` — ripristinaPaz
- `30612` — eliminaPaz
- `30657` — getDove
- `30661` — setDove
- `30679` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 30684-31122

- `30684` — getCredenzialiPersistenti
- `30697` — cancellaCredenzialiPersistenti
- `30702` — rinnovaSessioneConRefreshToken
- `30719` — getSessioneSalvata
- `30738` — salvaSessione
- `30748` — cancellaSessione
- `30752` — eseguiLogin
- `30799` — eseguiLogout
- `30821` — mostraApp
- `30826` — verificaSessioneEAvvia
- `30854` — assicuraTokenValido
- `30883` — _garantiscoSessionePerSync
- `30895` — avviaRinnovoTokenPeriodico
- `30899` — fermaRinnovoTokenPeriodico
- `30908` — _authReset
- `30913` — _authMostra
- `30916` — mostraLogin
- `30917` — mostraRegistrazione
- `30918` — mostraRecupero
- `30919` — mostraNuovaPassword
- `30922` — eseguiRegistrazione
- `30960` — eseguiRecuperoPassword
- `30989` — eseguiNuovaPassword
- `31023` — _parseHashParams
- `31030` — _pulisciHash
- `31034` — gestisciRitornoAuth
- `31122` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 31194-31295

- `31194` — apriPannelloRicette
- `31223` — chiudiPannelloRicette
- `31231` — applicaRicettaPasto
- `31267` — inizializzaP2
- `31279` — deepClone
- `30143` — applicaPatch
- `31295` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
