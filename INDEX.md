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
Righe 2371-2413

- `2371` — _slugAlimento
- `2379` — _catalogoIndicizza
- `2383` — _catalogoDeindicizza
- `2390` — costruisciCatalogo
- `2413` — risolviAlimento

---

### MACROS PIANO — calcolo e badge macro reali vs target
Righe 2428-2786

- `2428` — getValoriCREA
- `2440` — getCurrentPaziente
- `2475` — getKcalWeekend
- `2530` — getMacrosRicettaComposta
- `2547` — _macrosCella
- `2573` — calcolaMacrosPiano
- `2685` — pastoMaxPerMacro
- `2714` — pastoMaxPerMacroTuttiIGiorni
- `2720` — renderBadgeMacrosReali
- `2611` — pctStr
- `2612` — color
- `2625` — row
- `2786` — renderBadgeMacrosReali_DOM

---

### ANALISI DEL SANGUE — parsing, indici clinici derivati, interpretazione
Righe 3071-3278

- `3071` — _parseAnalisiNum
- `3079` — calcolaIndice
- `3252` — interpretaAnalisi
- `3264` — _interpAnalisiHtml
- `3278` — mostraInfoRange

---

### CONCETTI EDUCATIVI — sync Supabase, migrazione
Righe 3425-3449

- `3425` — pushConcetiSupabase
- `3435` — pullConcetiSupabase
- `3449` — migraConcetti

---

### ALIMENTI — categorie funzionali/semaforo, chip UI, equivalenze porzioni
Righe 3639-4011

- `3639` — getCategoriaSemaforo
- `3656` — _getCategorieGruppo
- `3670` — calcolaGrammaturaEquivalente
- `3722` — _gruppoEquiv  (P121: gruppo di equivalenza + criterio per categoria funzionale)
- `3728` — _porzioneStandard  (P121: porzione `g` di database dell'alimento)
- `3743` — suggerisciGrEquivalente  (P121: firma a 3 argomenti, il gruppo si deduce dai due alimenti)
- `3769` — _etichettaCriterio  (P121: ≈carbo / ≈prot / ≈grassi / fissa / porzione)
- `3789` — _promptAlternativeGrassi  (P121: riga del prompt AI generata dal motore)
- `3805` — ricalcolaAlternative  (P121: MOTORE UNICO, unico punto che scrive la grammatura di un'alternativa)
- `3824` — ricalcolaAlternativePiano  (P121: applica il motore a tutte le celle di un piano)
- `3873` — arrotondaGrammatura  (P121: sostituisce arrotondaPorzioneDiscreta — pezzi interi senza tetto / 5g)
- `3883` — getCategoriaFunzionale
- `3923` — catArr
- `3939` — _tagComuniTrova
- `3943` — getTagComuniChip
- `3946` — setTagComuniChip
- `3954` — setCatChips
- `3967` — getStagioniChip
- `3970` — setStagioniChip
- `3977` — getProfiloChip
- `3980` — setProfiloChip
- `3989` — wireChipGroup
- `4000` — wireAttrChipGroups
- `4011` — wireRadioChipGroup

---

### CONFIG / STORAGE LOCALE — cfg, localStorage db, util data/valuta
Righe 4039-4455

- `4039` — getCfg
- `4040` — saveCfgL
- `4041` — getUrl
- `4042` — saveLocal
- `4043` — loadLocal
- `4055` — uid
- `4073` — ymdLoc  (P141)
- `4078` — today
- `4086` — addDays
- `4094` — fData
- `4095` — fEur
- `4097` — getLastSyncText
- `4107` — getSyncColor
- `4114` — aggiornaStatoSync
- `4140` — setSyncStatus
- `4409` — _registraTombstone
- `4417` — _tombstoneAttivi
- `4429` — _fondiTombstones
- `4443` — _mergeTombstonesRemoti *(dal 24/7 legge il meta da `collections`, P74 1d)*
- `4455` — _applicaTombstones
- `4316` — _pazFetchMeta *(P74 1d — solo `collections`)*
- `4337` — _collectionsUpsert *(P74 — scrittura primaria dei 4 meta-record dal cutover 1d)*
- `4359` — _collectionsFetch *(P74 1d — lettura unica dei meta-record)*
- `4382` — _analisiSangueUpsert *(P74 fase 2 — scrittura ombra analisi del sangue, 24/7)*

---

### SYNC SUPABASE — push/pull ricette/pazienti, tombstones, conflitti (P69)
Righe 4479-4912

- `4479` — supaHeaders
- `4493` — pushRicetteSupabase
- `4564` — pullRicetteSupabase
- `4588` — delRicetteSupabase
- `4600` — delPazienteSupabase
- `4615` — pushToSheets
- `4659` — pullFromSheets
- `4738` — syncNow
- `4751` — sincronizzaTutto
- `4360` — stpSet
- `4365` — stpMsg
- `4882` — testConnSupabase
- `4912` — _p68LogSaveAnonimo

---

### SYNC SUPABASE — save paziente, piani/cache piano, entrate, eventi
Righe 4926-5448

- `4926` — save
- `4944` — _pushRigaPerId
- `4977` — _flushDirtyIds
- `5060` — _p69LoadBaseline
- `5063` — _p69StoreBaseline
- `5066` — _p69SetBaseline
- `5070` — _p69DropBaseline
- `5074` — _p69SetBaselineFromRows
- `5080` — _p69NomePaz
- `5085` — _p69InList
- `5093` — _p69RilevaConflitti
- `5129` — _p69DialogoConflitti
- `4738` — chiudi
- `5163` — _p69RisolviRicarica
- `5192` — _p69EsportaLocali
- `5205` — _p69RisolviSovrascrivi
- `5218` — pushPianoSupabase
- `5240` — pullPianiSupabase
- `5256` — delPianoSupabase
- `5272` — delPianiPazienteSupabase
- `5284` — pushCachePianoSupabase
- `5301` — caricaCachePianoSupabase
- `5323` — pushEntrateSupabase
- `5347` — pullEntrateSupabase
- `5361` — delEntrataSupabase
- `5369` — pushEntrataSupabase
- `5380` — pushEventoSupabase
- `5393` — pushEventiSupabase
- `5417` — pullEventiSupabase
- `5437` — delEventoSupabase
- `5448` — _pianoCacheKey

---

### UI GENERALE — config AI key, notifiche, navigazione (goTo/tab/modali)
Righe 5479-5590

- `5479` — _salvaPianoCache
- `5484` — _caricaPianoCache
- `5490` — salvaCfg
- `5491` — testConn
- `5498` — testaAntKey
- `5509` — initAntCard
- `5512` — esporta
- `5513` — importa
- `5518` — goTo
- `5534` — closeM
- `5542` — ngChiudiModale
- `5551` — ngChiudiPopupCoppia
- `5555` — ngAggiungiX
- `5566` — ngUpgradeModali
- `5586` — mTab
- `5587` — aggiornaEta
- `5588` — toggleOrarioNote
- `5589` — pdTab
- `5590` — notif

---

### PAZIENTI — registro: lista/card/kanban, apertura, editing, salvataggio, routine
Righe 5598-9079

- `5598` — getPazView
- `5599` — setPazView
- `5608` — _pazStatoPiano
- `5616` — _pazUrgenzaControllo
- `5631` — _pazBadgePrenotato  (P142)
- `5638` — pazSegnaArrivato  (P142)
- `5644` — _pazStatoTagHtml
- `5661` — _pazAggiornaFiltroRegimi
- `5669` — renderPaz
- `5727` — _renderPazCard
- `5752` — _renderPazLista
- `5779` — _renderPazKanban
- `5817` — openNuovoPaz
- `5844` — editPaz
- `5928` — REGOLE_SEMAFORO_ALIMENTI *(15 condizioni cliniche → grigi/celesti; globale dal 26/7 per essere verificabile dal test)*
- `6375` — _SEM_COLORI_LEGACY / `6105` _SEM_COLORI_AUTO *(F9 — unico vocabolario dei colori automatici)*
- `6380` — NOMI_CONDIZIONE_SEMAFORO *(etichette delle 15 condizioni, usate anche dal riquadro della scheda)*
- `6402` — _semaforoCondizioniAttive *(le condizioni spuntate su un paziente)*
- `6413` — _semaforoMigraPaziente *(F9 — toglie i colori legacy e ricalcola; idempotente)*
- `6424` — _semaforoMigraTutti *(passata su tutti i pazienti in memoria, con conteggio)*
- `6579` — applicaRegoloSemaforo *(dal 26/7 pulisce TUTTI e sei i colori automatici, non solo i suoi due)*
- `6683` — trovaChiaveAlimento *(match esatto sul nome: se non trova, la regola è ignorata in silenzio — vedi test s2-regole-nomi-alimenti)*
- `6707` — _pazNumOPrec *(F7 — campo assente = valore precedente, non azzeramento)*
- `6719` — _pazPreservaCampi *(F5 — l'anagrafica non cancella i campi che il form non gestisce)*
- `6725` — salvaPaz
- `6875` — openPaz
- `8463` — catalogoIntegratoriAttivi *(P148 — voci proponibili, esclude quelle ritirate)*
- `8467` — integratorePerChiave *(P148)*
- `8503` — _normEtichettaIntegr *(P148)*
- `8511` — chiaveIntegratore *(P148 — etichetta storica → chiave stabile, regola 21)*
- `8529` — migraEtichetteIntegratori *(P148 — {chiavi, liberi}: le sconosciute si conservano)*
- `8598` — integratoriDaSuggerireInRoutine *(P148 — ponte Clinica→Routine: suggerimento, mai aggiunta automatica)*
- `8614` — _suggerimentiDaClinicaHTML *(P148)*
- `8630` — renderPdRoutine
- `6723` — cardHTML
- `8799` — updateRoutineCampo
- `8807` — suggerisciPastoEQuando
- `8855` — pianoPiuRecenteDelPaziente *(P148 — piano più recente del paziente, già espanso)*
- `8868` — _macroRegolaRoutine *(P148 — 'g' o 'c' secondo la regolaOrario del catalogo)*
- `8876` — routineAmmetteAuto *(P148)*
- `8881` — routineSlotDelGiorno *(P148 — pasto di una voce IN UN GIORNO; la scelta manuale vince sempre)*
- `8892` — routineSlotPerGiornoNome *(P148 — stessa cosa per nome del giorno: è la forma usata dal PDF)*
- `8904` — routineAssegnazionePerGiorni *(P148 — [{giorno, slot}] per la scheda Routine)*
- `8917` — pesoAttualePaziente *(P148 — dall'InBody più recente, regola 10; mai congelato)*
- `8926` — doseIntegratoreRisolta *(P148 — dose per peso dei BCAA; senza referto non inventa numeri)*
- `8938` — filtroLibreria
- `8947` — renderLibreriaGrid
- `8968` — aggiungiDaLibreriaIdx
- `8997` — openModalRoutine
- `9004` — salvaRoutineVoce
- `9029` — salvaRoutine
- `9036` — mostraRoutinePopup
- `9064` — removeRoutineVoce
- `9079` — _renderAggiustamentiSection

---

### 📈 PERCORSO — timeline di periodizzazione (P115 Tappe 1-5 COMPLETE, 24 lug 2026)
Righe 6021-6621 (numeri ESATTI al 24/7 notte, dopo la Tappa 5). ⚠️ Questo blocco (~600 righe) fa slittare tutti i numeri delle sezioni SUCCESSIVE a riga ~6020 rispetto all'ultima rigenerazione completa: per quelle sezioni fare grep di conferma. Rigenerazione completa alla prossima modifica strutturale.

- `6921` — _PERCORSO_TIPI (const: tipi fase, colori, pct default)
- `6928` — _percorsoGet *(normalizza p.percorso, scarta fasi invalide)*
- `6952` — _percorsoIntervalli *(fasi consecutive → date concrete dal/al)*
- `6966` — _percorsoFaseAt *(fase attiva a una data; dal incluso, al escluso)*
- `6975` — _percorsoKcalFase *(pct → kcal indicative via calcolaTDEE)*
- `6998` — _percorsoProiezione *(Tappa 2 — proiezione ibrida teorica/calibrata, cono, obiettivo a intervallo)*
- `7056` — _percorsoDataBreve *(ISO → "12 set")*
- `7073` — _percorsoSerieEnergia *(Tappa 3 — serie introito/TDEE stimato/TDEE osservato per la corsia energia)*
- `7112` — _percorsoSerieMassaMagra *(Tappa 4 — solo InBody: punti {data,m,pg})*
- `7131` — _percorsoConsuntivo *(Tappa 5 — legge p.consuntivo scritto da P50: aderenza, extra kcal, ritardo=extra÷7700, settimane perse; oggi sempre ok:false)*
- `7173` — _PERCORSO_LAYERS_DEFAULT / _percorsoLayersState / _percorsoLayersGet *(Tappa 4 — stato interruttori, SOLO sessione, mai su p)*
- `7178` — percorsoLayerToggle *(Tappa 4 — inverte un solo strato)*
- `7184` — percorsoVistaPreset *(Tappa 4 — preset "tecnica"/"paziente")*
- `7200` — _percorsoPaz *(e a seguire i mutatori percorsoInit/SetInizio/AddFase/UpdFase/DelFase/MoveFase)*
- `7256` — _PERCORSO_MODELLI / _PERCORSO_GEN *(P122 T3 — 4 modelli + regole dei cicli)*
- `7274` — _percorsoGeneraFasi *(P122 T3 — pura: dal traguardo alle fasi, ritmo = quello della proiezione)*
- `7354` — _percorsoModelloSelectHtml
- `7363` — percorsoGeneraDaModello *(propone; conferma prima di sostituire fasi esistenti)*
- `7386` — _percorsoShiftGiorni *(pura: ancora = ultima pesata)*
- `7396` — percorsoRiallinea *(⏩ trasla il piano, riprende dal giorno-fase dell'interruzione)*
- `7423` — _TRG_TIPI / `6744` _TRG_COMPORTAMENTI *(P122 T4 — tipi di traguardo e libreria comportamenti)*
- `7445` — _traguardiGet · `6761` _traguardoValoreAttuale *(valore corrente dai dati esistenti, null se manca)*
- `7484` — _traguardoVerso *(auto: dedotto dalla partenza)* · `6803` _traguardoValuta · `6824` _traguardiValuta
- `7525` — traguardoAdd · `6852` traguardoUpd · `6867` traguardoDel · `6873` traguardoSegna
- `7583` — _COND_TIPI · `6897` _percorsoCondizione *(pura: la fase finisce per soglia — SOLO suggerimento)*
- `7599` — percorsoSetCondizione · `6927` percorsoChiudiFase *(esito fotografato, riapribile)*
- `7633` — _traguardiHtml *(blocco 🏁 in fondo alla scheda Percorso)*
- `7731` — _percorsoVistaPaz / `7049` _percorsoVistaPazAttiva *(P122 T5 — modalità di sessione)*
- `7738` — _percorsoVittorie *(pura: vittorie dall'inizio del percorso + flag ricomposizione)*
- `7776` — _percorsoNascondiPeso *(in fase di massa il peso non si mostra al paziente)*
- `7787` — _traguardoFaseCorrente *(traguardo della fase IN CORSO, non quello lontano)*
- `7815` — _traguardoTestoPaziente *(righe in italiano semplice, riusate dal messaggio WhatsApp)*
- `7848` — _vistaPazienteHtml *(i tre riquadri che guarda il paziente)*
- `7928` — _percorsoChartSvg *(due corsie: peso + massa magra + cono proiezione sopra, striscia aderenza in mezzo (solo con dati P50), energia (kcal) sotto — tutto gated dagli interruttori)*
- `8117` — renderPdPercorso *(scheda: badge fase, riga proiezione/obiettivo, riga Piano vs Realtà (solo con dati), toolbar interruttori, grafico, editor)*

*(Tappa 2 tocca anche `calcolaMacros`: box obiettivo con intervallo al posto della data secca.)*

---

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 9164-9335

- `9164` — salvaAggiustamento
- `9197` — eliminaAggiustamento
- `9206` — renderPdNote
- `9241` — salvaNotaClinica
- `9256` — deleteNota
- `9265` — saveNote
- `9285` — resetSemaforoAuto *(F9 — pulsante 🔄 Ricalcola: pulisce gli automatici e rifà col sistema valido; il motore LEGACY non esiste più)*
- `9335` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 9576-9774

- `9576` — avviaFX
- `9604` — avviaAnalisi
- `9621` — _renderFlussoPanel
- `9665` — _riepEsc
- `9669` — _riepNum
- `9675` — _riepDelta
- `9683` — _riepDataSig
- `9701` — _riepParseFX
- `8087` — clean
- `9715` — _riepAggiornaFX
- `9741` — _riepToggleDomandaDefault
- `9753` — _riepAddDomanda
- `9766` — _riepRemoveDomanda
- `9774` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 9986-10229

- `8218` — dCol
- `8336` — card
- `9986` — renderPdRagionamento
- `10074` — inviaMessaggioRag
- `10092` — concludiERiassumi
- `10106` — salvaRagionamento
- `10127` — apriGeneratoreDaRag
- `10135` — nuovaSessioneRag
- `10141` — cancellaSavedRag
- `10151` — renderPazTimeline
- `10188` — renderPdAnamnesi
- `10229` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 12177-13312

- `12177` — _anNorm *(P125 — testo confrontabile: minuscole, niente accenti)*
- `12183` — _anCorrisponde *(P125 — ricerca per parole-prefisso: "vit d" trova "Vitamina D")*
- `12189` — filtraAnalisi *(P125 — filtro dal vivo delle 119 voci)*
- `12223` — pulisciRicercaAnalisi
- `12229` — renderPdAnalisi
- `12285` — toggleAnalisiSection
- `12434` — loadAnalisiSanguePDF
- `12321` — _impPdfConfigurata
- `12322` — _impPdfLib
- `12332` — _impPdfApri
- `12345` — _impPdfPagina *(P124b — una pagina del PDF → immagine, con la rotazione RILEVATA, non quella dichiarata dal file)*
- `12366` — _impRuotaImmagine
- `12391` — _impRilevaRotazione *(P124b — chiamata piccola: di quanti gradi va girata la pagina)*
- `12410` — _impPromptPagina *(P124b — prompt di UNA pagina, con l'impronta della riga: valore+unità+riferimento)*
- `12609` — _impNormalizzaNumero *(P124 — numero all'italiana → punto decimale, conversione fatta dall'app e non dall'AI)*
- `12620` — _impNumeri
- `12628` — _impSembraIntervallo
- `12636` — _impUgualeAlRange
- `12645` — _impLimitiStd
- `12666` — _impFuoriScala
- `12675` — _impCorrezioneVirgola
- `12687` — _impTestoLimiti
- `12708` — _impRifPlausibile *(P124b — un "riferimento" che è un'unità di misura = riga disallineata)*
- `12721` — _impUnitaCanonica
- `12743` — _impStessaGrandezza *(P124b — stesso tipo di misura a meno del prefisso: nanomoli/micromoli/millimoli)*
- `12760` — _impUnitaCompatibili
- `12771` — _impControllaValore *(P124 — i controlli anti-errore su un valore estratto)*
- `12835` — mostraDiffAnalisi *(P124 — colonna Estratto modificabile + righe sospette deselezionate)*
- `13025` — _calcoloIncluso
- `13031` — toggleCalcoloIncluso
- `13053` — _renderCalcoliPannello
- `13094` — toggleGlossario
- `13099` — updateAnalisi
- `13158` — salvaAnalisi
- `13171` — applicaGruppoClinico
- `13200` — renderBoxGruppiCliniciSuggeriti
- `13232` — suggerisciGruppiClinici
- `13312` — renderMemoriaInbody

---
### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9176 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `10359` — _richVal
- `10366` — _richBmi
- `10371` — _richPat
- `10377` — _richNum
- `10422` — _richPreselezione
- `10438` — richLeggiIntestazione
- `10442` — richSalvaIntestazione
- `10451` — apriRichiestaAnalisi
- `10471` — _richModaleHtml
- `10547` — _richEsc
- `10549` — _richMotivoCambia
- `10555` — _richToggleSez
- `10561` — _richAggiornaConteggi
- `10569` — _richMotivoCorrente
- `10579` — _richSelezione
- `10594` — _richTxt
- `10600` — _richCostruisciPDF
- `8969` — nuovaPagina
- `8970` — spazio
- `10696` — _richNomeFile
- `10701` — _richPrepara
- `10714` — _richRegistra
- `10719` — _richStato
- `10721` — richScaricaPDF
- `10770` — _richUpload
- `10772` — _richWaUrl
- `10779` — _richTestoWa
- `10793` — richInviaWhatsApp
- `10833` — richCopiaLink
- `10854` — _richStoricoHtml

---
### REFERTI DEL SANGUE DATATI — storico nel tempo (P118 tappa 1)
Righe 9194-9387 — migrazione, ordinamento, quadro attuale derivato, barra di selezione.

- `11954` — _refertoNuovoId
- `11957` — _refertoOggi
- `11961` — _refertoDataIt
- `11967` — _refertoConteggio
- `11981` — _refertiMigra
- `12008` — _refertiOrdinati
- `12019` — _refertoPiuRecente
- `12024` — _refertoInVista
- `12042` — _refertiApplica
- `12055` — _refertoCrea
- `12074` — refertoCambiaVista
- `12080` — refertoCambiaData
- `12092` — refertoNuovo
- `12100` — refertoDuplica
- `12109` — refertoElimina
- `12124` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `11567` — _rangeNum
- `11573` — _rangeTestoDa
- `11592` — _rangeCoppia
- `11602` — _rangeHtml

---
### ANDAMENTO NEL TEMPO — tracciato, variazione, grafico grande (P118 tappa 3)
Righe 9441-9745 — serie storica, regola del colore, sparkline, pannello in fondo.

- `11644` — _andLimiti
- `11665` — _andParseRangeLab
- `11678` — _andDistanza
- `11685` — _andValutazione
- `11698` — _andSerie
- `11712` — _andNum
- `11716` — _andDataBreve
- `11721` — _andMeseAnno
- `11729` — _andDominio
- `11743` — _andColore
- `11756` — _andSparkHtml
- `11782` — _andRigaHtml
- `11804` — _andEsamiSeguibili
- `11812` — andScegliEsame
- `11818` — _andPannelloHtml
- `11871` — _andGraficoGrande
- `11922` — _andPasso

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 13362-15229

- `13362` — _ibFmtBreve
- `13824` — _renderPesiIntermediSection
- `13939` — aggiungiPesoIntermedio
- `13955` — eliminaPesoIntermedio
- `13965` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `15229` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 15537-15537

- `15537` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 15939-19140

- `15939` — aggiornaLabelMacros
- `15957` — calcolaMacros
- `16098` — applicaSchema
- `16133` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `16139` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `16161` — _misuraDaReferto *(P127 — UN referto letto con le regole del traguardo: usata anche dalla verifica al controllo)*
- `16194` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `16205` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `16223` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `16336` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `16350` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `16406` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `16420` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `16452` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `16485` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `16527` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `16535` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `16546` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `16573` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `16588` — _stradeVerso *(le strade complete + percentuale libera)*
- `16635` — _VC_TOLLERANZA_PCT / _VC_GIORNI_MIN / _VC_GIORNI_MIN_RITARO / _VC_COPERTURA_MIN_PCT / _VC_MAGRA_PRUDENZA_GG *(P127 — soglie cliniche della verifica)*
- `16645` — _mediaSlotPrescritta *(media pesata sui giorni di un campo dello storico target; la usa anche _kcalMediaPrescrittaOss)*
- `16665` — _vcDeficitSlot *(deficit di uno slot: campo offset o kcal−tdee per gli slot vecchi)*
- `16673` — _vcTratto *(P127 — cosa è cambiato fra due referti, previsto vs reale, TDEE misurato)*
- `16727` — _vcTraguardoSalvato *(traguardo ricostruito dal salvato, per la scheda Percorso)*
- `16737` — _verificaControllo *(P127 — motore puro: tratto recente, quadro dall'inizio, residuo al ritmo reale)*
- `16775` — _verificaControlloHtml *(blocco 🔎, unica fonte per pannello 🎯 e scheda Percorso; azioni solo dove c'è il campo kcal)*
- `16867` — _vcRitara *(scrive le kcal ritarate nel campo regime: propone, non salva)*
- `16885` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `17017` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `17041` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `17103` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `17241` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `17256` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `17281` — _renderRifPesoBox
- `17336` — _usaRifPeso
- `17340` — _aggiornaRifPesoTarget
- `17343` — _aggiornaRegimeSlider
- `18004` — _presetRegime
- `18008` — _initRegimeSliderDaPaziente
- `16633` — ricalcolaLAF
- `18186` — renderStoricoTDEE
- `18228` — attivaSlotTDEE
- `18245` — eliminaSlotTDEE
- `18258` — _toggleCiclizzazione
- `18264` — _aggiornaAnteprimaCiclizzazione
- `18282` — salvaCalcoloMacros
- `18597` — _metAllenamento
- `18836` — _neatFrazione
- `18955` — _larnLafStileVita
- `18972` — _regimeOffset
- `18982` — _componiRegimeText
- `19015` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `19027` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `19034` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `19140` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 19158-19602

- `19158` — renderTargetBadge
- `17819` — verificaRegola_75_20_5
- `17856` — renderBadge75_20_5
- `19303` — _validaNorm
- `19306` — _validaMatchTermine
- `19314` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `19365` — _validaTesto
- `19386` — validaPiano
- `19460` — _validaFirmaBlocchi
- `19467` — renderBadgeValidatore
- `19498` — _validaVaiAlGiorno
- `19507` — apriPannelloValidatore
- `13472` — esc
- `19564` — _validaEseguiOverride
- `19587` — validaGateExport
- `19602` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 19735-20367

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
- `19735` — pianoPazSelezionato
- `19882` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `20120` — renderPanelMacrosGiorno
- `20263` — pmgCambiaGrammi
- `20290` — riapriPiano
- `20328` — _montaPianoCorrente
- `20367` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 20377-20851

- `20377` — pullTemplateSupabase
- `20388` — delTemplateSupabase
- `20397` — _promptTemplateNome
- `20422` — _creaTemplateDaJSON
- `20445` — salvaComeTemplate
- `20456` — salvaComeTemplateDaPiano
- `20465` — _normNomeAlim
- `20466` — _escRegAlim
- `20467` — _raccogliAlimentiDaPiano
- `20478` — _alimentiEsclusiPaziente
- `20490` — _trovaConflittiTemplate
- `20508` — _mostraAvvisoConflitti
- `20532` — applicaTemplate
- `20550` — apriPickerTemplate
- `20578` — _pickPaziente
- `20602` — applicaTemplatePick
- `20606` — rinominaTemplate
- `20617` — eliminaTemplate
- `20627` — renderLibreriaTemplate
- `20656` — renderStoricoPiani
- `20715` — eliminaPiano
- `20731` — _getActiveMacrosTarget
- `20755` — getTargetAttivi
- `20792` — calcolaTargetsCiclizzazione
- `20818` — _setupPianoTargets
- `20842` — getStagioneCorrente
- `20851` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 21322-21322

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `21322` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 21331-21793

- `21331` — aggiornaUIcolazione
- `21341` — salvaRegolePiano
- `21402` — _isModelloSistema
- `21405` — _isModelloSistemaModificato
- `21417` — caricaModelliCustomLocal
- `21431` — salvaModelliCustomLocal
- `21452` — _migraRecordCustom
- `21470` — _syncAliasLegacy
- `21479` — caricaAlimentiCustom
- `21503` — pushAlimentiCustomSupabase
- `21513` — pullAlimentiCustomSupabase
- `21527` — pushModelliSupabase
- `21545` — pullModelliSupabase
- `21570` — _calcolaFreqDaModello
- `21589` — aggiornaUImodello
- `21678` — popolaDropdownModelli
- `21706` — cambiaModelloRotazione
- `21712` — ripristinaModelloOriginale
- `21735` — eliminaModelloCustom
- `21753` — mostraAnteprimaModello
- `21763` — apriEditorModello
- `21793` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 22062-22300

- `15738` — rerender
- `22062` — _salvaModelloDaEditor
- `22104` — caricaRegolePiano
- `22134` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `22169` — _aiLogUsage
- `22191` — _aiProxyUrl
- `22197` — _aiTokenPerProxy
- `22226` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `22300` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 22379-22519

- `16216` — _risolviCollisioniCelle
- `22379` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `22439` — getFruttaStile
- `22446` — _fruttaGetPasto
- `22456` — _fruttaContaRigheRicetta
- `22460` — _fruttaIndiceBasePasto
- `22480` — getFruttaMarker
- `22493` — fruttaMarkerHtml
- `22501` — _fruttaCheckboxHtml
- `22510` — toggleFrutta
- `22519` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 22555-23829

- `22555` — _renderCelleGriglia
- `22635` — _renderRicetteTestuali
- `22674` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `22745` — _renderCelleHtml
- `22753` — toggleCellaMenu
- `22772` — closeAllCellaMenus
- `22780` — _trovaPasto
- `22788` — cellaSposta
- `22842` — cellaCancella
- `22863` — apriEditGrammatura
- `16789` — salva
- `22911` — cellaSwap
- `22931` — cellaRimuoviAlt
- `22945` — cellaAggiungiAlt
- `23048` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `23133` — apriEditRicetta
- `23142` — aggiungiRicetta
- `23158` — rimuoviRicetta
- `23167` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `23329` — ngAggiungiSpuntinoVuoto
- `23345` — apriAggiungiCella
- `17254` — risolviCompatibili
- `23441` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `23533` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `23674` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `23829` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 23877-24269

- `23877` — _attesoStrutturaPiano
- `23897` — _confrontaStrutturaPiano
- `23927` — _costruisciPromptDelta
- `23954` — _pianoToolSchema
- `24029` — _pianoMaxTokens
- `24038` — _estraiPianoDaRisposta
- `24060` — chiamaGeneraPiano
- `24227` — mostraLoadingSteps
- `18123` — render
- `24269` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 24336-24913

- `24336` — generaMessaggioAI
- `24441` — copiaMessaggioAI
- `24451` — salvaInStorico
- `24463` — salvaVarianteAI
- `24478` — renderVariantiSalvate
- `24497` — usaVariante
- `24515` — eliminaVariante
- `24526` — renderStoricoMsg
- `24542` — apriWhatsApp
- `24913` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 25091-26588

- `25091` — _ngColoreSemaforoNome
- `25099` — apriSceltaModalitaPiano
- `25134` — _ngChiudiModalita
- `25137` — _ngCostruisciGiornoVuoto
- `25170` — _ngCostruisciGiornoSpeciale
- `25181` — _ngIndiceInizioSpeciali
- `25192` — _ngModalitaNomeGiorno
- `25198` — _ngImpostaModalitaNomeGiorno
- `25201` — _ngLettera
- `25208` — _ngEtichettaGiorno
- `25228` — _ngEtichettaGiornoBreve
- `25242` — _ngToggleGiornoSpeciale
- `25266` — _ngRenderPannelloSpeciale
- `25334` — _generaGiornoSpecialeAI
- `25434` — _ngGiornoHaContenuto
- `25446` — _ngCreaPianoManuale
- `25469` — _ngScrollTabGiorni
- `25479` — _ngAbilitaDragScroll
- `25516` — _ngCambiaNumeroGiorni
- `25548` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `25562` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `25603` — _ngToggleCat
- `25612` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `25636` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `25792` — _ngSalvaPianoManuale
- `25818` — _ngParseIngrediente
- `25842` — _ngScomponiIngredienti
- `25854` — _ricCalcolaMacroDaIngredienti
- `25872` — _ricRicalcolaMacroLive
- `25879` — _ricAggiornaInfoMacro
- `25893` — _ricRicalcolaMacroLiveNow
- `25917` — _ngTrovaCategoriaAlimento
- `25950` — _ngPescaRicetta
- `25993` — _ngScomponiRicettaNelPasto
- `26030` — _ngDragStart
- `26041` — _ngDragStartCella
- `26052` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `26059` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `26064` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `26083` — _ngAggiungiAlimento
- `26108` — _ngRimuoviAlimento
- `26122` — _ngDopoModifica
- `26140` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `26193` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `26222` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `26239` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `26247` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `26319` — gramTestoCasalingo
- `26345` — _appendToggleNutrizionali
- `26388` — _appendTogglePromemoria
- `26417` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `26563` — cpFromEmoji
- `26569` — getEmojiCp
- `26588` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `24563` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `24585` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `24590` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `24616` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `24704` — _spesaTestoWhatsApp
- `24720` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `24765` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `24788` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `24816` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `24876` — scaricaListaSpesaPDF (download diretto, un click)
- `24884` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `24896` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 27740-27740

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
- `27740` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 27754-27966

- `27754` — salvaInbody
- `27824` — delInbody
- `27831` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `27966` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 27994-28781

- `27994` — buildSemLegenda
- `28008` — renderAlEditor
- `28105` — _alimNomeRegex
- `28113` — _alimGiorniDaPiano
- `28121` — _scanGiorniPerNome
- `28136` — scanRiferimentiAlimento
- `28165` — _alimRefsRighe
- `28171` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `28259` — modificaAlimentoCustom
- `28279` — ripristinaValoriPrecedentiAlimento
- `28291` — _resetAlimModal
- `28303` — apriNuovoAlimentoCustom
- `28309` — salvaAlimentoCustom
- `28379` — eliminaAlimentoCustom
- `28687` — _alimFonteBadge
- `28692` — renderAlimentiPage
- `22217` — E
- `28763` — archiviaAlimentoCustom
- `28781` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 28808-29444

- `28808` — _bcSetStatus
- `28810` — apriScannerBarcode
- `28818` — chiudiScannerBarcode
- `28823` — _bcStopCamera
- `28831` — _bcModaleAperto
- `28833` — _bcAvviaCamera
- `28844` — _bcAvviaNativo
- `28864` — _bcAvviaZXing
- `28873` — _bcZXStart
- `28884` — _bcErroreCamera
- `28892` — cercaBarcodeManuale
- `28898` — _barcodeTrovato
- `29069` — cercaBarcodeOFF
- `29098` — _bcProdottoNonTrovato
- `29113` — _bcPrecompilaForm
- `22477` — num
- `29158` — togAl
- `29211` — selCatAl
- `25402` — selTuttiAl
- `29276` — _appIdAnag  (P140 T1)
- `29286` — _appSyncPaz  (P140 T1)
- `29330` — _appSpecchioInverso  (P140 T2)
- `29356` — _appRitiraSpecchio  (P140 T2)
- `29387` — _appAncoraTappe  (P140 T2)
- `29406` — _appTappe  (P140 T2)
- `29427` — _appMigraPaziente  (P140 T1)
- `29437` — _appMigraTutti  (P140 T1)
- `29444` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 29460-29929

- `29460` — setCalView
- `29470` — calPrev
- `29471` — calNext
- `29472` — calToday
- `29474` — renderCal
- `29488` — renderCalMonth
- `29515` — renderCalWeek
- `29548` — renderCalDay
- `29599` — selGiorno
- `29613` — setDisp
- `29618` — openAddEvento
- `29631` — openAddEventoPaz
- `29637` — toggleEntrataCheck
- `29642` — salvaEvento
- `29684` — _evTestoPromemoria  (P140 T1)
- `29690` — openEvDetail
- `29745` — delEvento
- `29767` — copyMsg
- `29779` — aggDateCal
- `27020` — syncInizio
- `27021` — syncControllo
- `29792` — aggiornaPrev
- `29817` — apriEventoDaScheda  (P140 T2)
- `29831` — _appAggiornaOreScheda  (P140 T2)
- `29848` — renderRic
- `29875` — openNuovaRic
- `29876` — editRic
- `29886` — salvaRic
- `29911` — delRic
- `29929` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 30015-30075

- `30015` — aggiungiEntrataPerPaziente
- `30032` — openNuovaEntrata
- `30046` — salvaEntrata
- `30067` — delEntrata
- `30075` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 30105-30820

- `30105` — aiSuggerisciRicetta
- `30150` — renderConcettiModal
- `30169` — apriConcettiModal
- `30196` — salvaConcettiAllegati
- `30220` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `30258` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `30401` — loadInbodyPDF
- `30522` — _vitdLabel
- `30526` — getIntegratori
- `30530` — getIntegraWant
- `30543` — _chiaviSpuntate *(P148 — risolve le etichette salvate in chiavi, regola 21)*
- `30551` — setIntegratori
- `30568` — setIntegraWant
- `30596` — _infoIntegratoreHtml *(P148 — contenuto del pannello ⓘ)*
- `30624` — mostraInfoIntegratore *(P148 — apre/chiude il pannello sotto la griglia)*
- `30636` — renderCaselleIntegratori *(P148 — genera le caselle dal catalogo; va chiamata PRIMA di setIntegratori, altrimenti le spunte non trovano gli elementi)*
- `30697` — getPatologieChip
- `30698` — getAllergieChip
- `30699` — setPatologieChip
- `30700` — setAllergieChip
- `30701` — getPatologie
- `30702` — getAllergie
- `30703` — setPatologieFromStr
- `30710` — setAllergieFromStr
- `30723` — getSdvChip
- `30724` — getCspChip
- `30725` — setSdvChip
- `30726` — setCspChip
- `30727` — setSdvFromStr
- `30728` — setCspFromStr
- `30732` — getBudget
- `30733` — setBudget
- `30738` — renderCalAnno
- `30769` — comprimeImmagine
- `30791` — uploadImmagineConcetto
- `30810` — rimuoviImmagineConcetto
- `30820` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 30886-30970

- `30886` — entraSelConcetti
- `30887` — annullaSelConcetti
- `30888` — toggleConcettoSel
- `30893` — eliminaConcettiSelezionati
- `30912` — confermaEliminaConcetti
- `30927` — aiRiscriviConcetto
- `30941` — editConcetto
- `30959` — salvaConcetto
- `30970` — openNuovoConcetto
- `27519` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 31007-31007

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
- `31007` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 31119-31444

- `31119` — renderScadenzeAlert
- `31379` — _scadGestiti  (P144)
- `31389` — _scadPota  (P144)
- `31404` — _scadMigraDaLocalStorage  (P144)
- `31427` — segnaGestito
- `31444` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 31453-31528

- `31453` — ripristinaPaz
- `31461` — eliminaPaz
- `31506` — getDove
- `31510` — setDove
- `31528` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 31533-31971

- `31533` — getCredenzialiPersistenti
- `31546` — cancellaCredenzialiPersistenti
- `31551` — rinnovaSessioneConRefreshToken
- `31568` — getSessioneSalvata
- `31587` — salvaSessione
- `31597` — cancellaSessione
- `31601` — eseguiLogin
- `31648` — eseguiLogout
- `31670` — mostraApp
- `31675` — verificaSessioneEAvvia
- `31703` — assicuraTokenValido
- `31732` — _garantiscoSessionePerSync
- `31744` — avviaRinnovoTokenPeriodico
- `31748` — fermaRinnovoTokenPeriodico
- `31757` — _authReset
- `31762` — _authMostra
- `31765` — mostraLogin
- `31766` — mostraRegistrazione
- `31767` — mostraRecupero
- `31768` — mostraNuovaPassword
- `31771` — eseguiRegistrazione
- `31809` — eseguiRecuperoPassword
- `31838` — eseguiNuovaPassword
- `31872` — _parseHashParams
- `31879` — _pulisciHash
- `31883` — gestisciRitornoAuth
- `31971` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 32043-32144

- `32043` — apriPannelloRicette
- `32072` — chiudiPannelloRicette
- `32080` — applicaRicettaPasto
- `32116` — inizializzaP2
- `32128` — deepClone
- `30143` — applicaPatch
- `32144` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
