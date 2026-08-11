# NutriGest — INDEX.md

> **Come si riallineano i numeri di riga (26 lug 2026 · conteggio verificato il 10 ago 2026).** Questo file ha **899 voci** (l'intestazione ne dichiarava 823, e `CLAUDE.md` ne dichiarava ~673: contate una per una il 10 agosto):
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
**Ultimo rigenero automatico: 10 agosto 2026** — P130, campo `stato` in `FODMAP_PORZIONI`: 507 voci riallineate, 278 gia' esatte, 114 non verificabili (funzioni annidate). Righe totali file: 32.329. Suite 738/738 verde dopo il rigenero.

**Rigenero precedente: 5 agosto 2026** (audit al contrario: correzione `selCatAl`, rinomina `verificaRegola_70_25_10`, ricette di sistema eliminabili, rimozione `applicaPatch`; poi P148 tappa 1: `_macrosCella`, `pastoMaxPerMacro`, `pastoMaxPerMacroTuttiIGiorni`; poi P148 tappa 2: `CATALOGO_INTEGRATORI` e i cinque helper di risoluzione etichette; poi P148 tappa 3: `renderCaselleIntegratori`, `mostraInfoIntegratore`, `_infoIntegratoreHtml`; poi P148 tappa 4: le dieci funzioni del pasto automatico e del ponte Clinica→Routine) — lo script ha corretto **3371 voci** in totale nella giornata; i range "Righe A-B" di sezione NON sono stati ricalcolati in questa passata (restano quelli del 26 lug, indicativi). Righe totali file: 30946.

> **Attenzione, lezione del 5 ago 2026:** `rigenera-index.js` RIALLINEA i numeri di riga delle voci già presenti, ma **non aggiunge le funzioni nuove**. Dopo la tappa 1 di P148 la suite era verde e l'indice "allineato" pur non contenendo nessuna delle tre funzioni appena scritte — il test `s1-doc-allineata` verifica che le voci elencate siano giuste, non che siano complete. Una funzione nuova va aggiunta a mano alla sezione giusta, altrimenti la prossima sessione non la trova e rischia di riscriverla. Stessa famiglia della regola 20: un controllo automatico verde non è una verifica di ciò che il controllo non guarda.

> ⚠️ **Nota storica, da tenere presente.** L'intestazione precedente dichiarava un riallineo completo il 25 luglio, ma un controllo automatico su quel commit (`924414b`) ha trovato **657 voci sbagliate su 687**, con scarto mediano di +117 righe: la dichiarazione non corrispondeva al file. Prima ancora, la rigenerazione integrale del 14 luglio. Morale: **il riallineo va verificato, non dichiarato** — lo script sopra stampa quante voci corregge, e quel numero va guardato.

⚠️ **Nota sulla rigenerazione:** la versione precedente copriva solo la sezione COMPOSITORE MANUALE dopo P95; questa rigenerazione ricalcola TUTTI i numeri di riga da zero con uno script automatico (stesso metodo dichiarato qui sotto), così l'intero indice torna affidabile, non solo una sezione.

## Come usarlo
1. Trova l'area funzionale pertinente qui sotto (o cerca il nome funzione nella tabella).
2. Usa `view` con `view_range` sul range indicato invece di leggere tutto il file.
3. Se il nome funzione non è chiaro o non è in tabella, `grep -n "nomeFunzione" index.html` prima di editare.
4. **Rigenera questo indice a OGNI sessione che tocca `index.html`** — `cd test-suite && node rigenera-index.js`, dieci secondi. *(Riga corretta il 10 ago 2026: diceva «dopo modifiche strutturali ampie, non dopo ogni piccolo commit». Era la politica in vigore fino al 26 luglio, ed è **esattamente quella che ha prodotto 719 numeri su 730 sbagliati** — il difetto raccontato tre righe più sopra in questo stesso file. Dal 26 luglio `CLAUDE.md` prescrive l'opposto e il test `s1-doc-allineata` fallisce se l'indice è disallineato: questa riga istruiva a seguire la regola abbandonata perché rompeva il file che la contiene.)*

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
Righe 12198-13333

- `12198` — _anNorm *(P125 — testo confrontabile: minuscole, niente accenti)*
- `12204` — _anCorrisponde *(P125 — ricerca per parole-prefisso: "vit d" trova "Vitamina D")*
- `12210` — filtraAnalisi *(P125 — filtro dal vivo delle 119 voci)*
- `12244` — pulisciRicercaAnalisi
- `12250` — renderPdAnalisi
- `12306` — toggleAnalisiSection
- `12455` — loadAnalisiSanguePDF
- `12342` — _impPdfConfigurata
- `12343` — _impPdfLib
- `12353` — _impPdfApri
- `12366` — _impPdfPagina *(P124b — una pagina del PDF → immagine, con la rotazione RILEVATA, non quella dichiarata dal file)*
- `12387` — _impRuotaImmagine
- `12412` — _impRilevaRotazione *(P124b — chiamata piccola: di quanti gradi va girata la pagina)*
- `12431` — _impPromptPagina *(P124b — prompt di UNA pagina, con l'impronta della riga: valore+unità+riferimento)*
- `12630` — _impNormalizzaNumero *(P124 — numero all'italiana → punto decimale, conversione fatta dall'app e non dall'AI)*
- `12641` — _impNumeri
- `12649` — _impSembraIntervallo
- `12657` — _impUgualeAlRange
- `12666` — _impLimitiStd
- `12687` — _impFuoriScala
- `12696` — _impCorrezioneVirgola
- `12708` — _impTestoLimiti
- `12729` — _impRifPlausibile *(P124b — un "riferimento" che è un'unità di misura = riga disallineata)*
- `12742` — _impUnitaCanonica
- `12764` — _impStessaGrandezza *(P124b — stesso tipo di misura a meno del prefisso: nanomoli/micromoli/millimoli)*
- `12781` — _impUnitaCompatibili
- `12792` — _impControllaValore *(P124 — i controlli anti-errore su un valore estratto)*
- `12856` — mostraDiffAnalisi *(P124 — colonna Estratto modificabile + righe sospette deselezionate)*
- `13046` — _calcoloIncluso
- `13052` — toggleCalcoloIncluso
- `13074` — _renderCalcoliPannello
- `13115` — toggleGlossario
- `13120` — updateAnalisi
- `13179` — salvaAnalisi
- `13192` — applicaGruppoClinico
- `13221` — renderBoxGruppiCliniciSuggeriti
- `13253` — suggerisciGruppiClinici
- `13333` — renderMemoriaInbody

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

- `11975` — _refertoNuovoId
- `11978` — _refertoOggi
- `11982` — _refertoDataIt
- `11988` — _refertoConteggio
- `12002` — _refertiMigra
- `12029` — _refertiOrdinati
- `12040` — _refertoPiuRecente
- `12045` — _refertoInVista
- `12063` — _refertiApplica
- `12076` — _refertoCrea
- `12095` — refertoCambiaVista
- `12101` — refertoCambiaData
- `12113` — refertoNuovo
- `12121` — refertoDuplica
- `12130` — refertoElimina
- `12145` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `11588` — _rangeNum
- `11594` — _rangeTestoDa
- `11613` — _rangeCoppia
- `11623` — _rangeHtml

---
### ANDAMENTO NEL TEMPO — tracciato, variazione, grafico grande (P118 tappa 3)
Righe 9441-9745 — serie storica, regola del colore, sparkline, pannello in fondo.

- `11665` — _andLimiti
- `11686` — _andParseRangeLab
- `11699` — _andDistanza
- `11706` — _andValutazione
- `11719` — _andSerie
- `11733` — _andNum
- `11737` — _andDataBreve
- `11742` — _andMeseAnno
- `11750` — _andDominio
- `11764` — _andColore
- `11777` — _andSparkHtml
- `11803` — _andRigaHtml
- `11825` — _andEsamiSeguibili
- `11833` — andScegliEsame
- `11839` — _andPannelloHtml
- `11892` — _andGraficoGrande
- `11943` — _andPasso

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 13383-15250

- `13383` — _ibFmtBreve
- `13845` — _renderPesiIntermediSection
- `13960` — aggiungiPesoIntermedio
- `13976` — eliminaPesoIntermedio
- `13986` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `15250` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 15558-15558

- `15558` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 15960-19160

- `15960` — aggiornaLabelMacros
- `15978` — calcolaMacros
- `16119` — applicaSchema
- `16154` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `16160` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `16182` — _misuraDaReferto *(P127 — UN referto letto con le regole del traguardo: usata anche dalla verifica al controllo)*
- `16215` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `16226` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `16244` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `16357` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `16371` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `16427` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `16441` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `16473` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `16506` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `16548` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `16556` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `16567` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `16594` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `16609` — _stradeVerso *(le strade complete + percentuale libera)*
- `16656` — _VC_TOLLERANZA_PCT / _VC_GIORNI_MIN / _VC_GIORNI_MIN_RITARO / _VC_COPERTURA_MIN_PCT / _VC_MAGRA_PRUDENZA_GG *(P127 — soglie cliniche della verifica)*
- `16666` — _mediaSlotPrescritta *(media pesata sui giorni di un campo dello storico target; la usa anche _kcalMediaPrescrittaOss)*
- `16686` — _vcDeficitSlot *(deficit di uno slot: campo offset o kcal−tdee per gli slot vecchi)*
- `16694` — _vcTratto *(P127 — cosa è cambiato fra due referti, previsto vs reale, TDEE misurato)*
- `16748` — _vcTraguardoSalvato *(traguardo ricostruito dal salvato, per la scheda Percorso)*
- `16758` — _verificaControllo *(P127 — motore puro: tratto recente, quadro dall'inizio, residuo al ritmo reale)*
- `16796` — _verificaControlloHtml *(blocco 🔎, unica fonte per pannello 🎯 e scheda Percorso; azioni solo dove c'è il campo kcal)*
- `16888` — _vcRitara *(scrive le kcal ritarate nel campo regime: propone, non salva)*
- `16906` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `17037` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `17061` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `17123` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `17261` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `17276` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `17301` — _renderRifPesoBox
- `17356` — _usaRifPeso
- `17360` — _aggiornaRifPesoTarget
- `17363` — _aggiornaRegimeSlider
- `18024` — _presetRegime
- `18028` — _initRegimeSliderDaPaziente
- `16633` — ricalcolaLAF
- `18206` — renderStoricoTDEE
- `18248` — attivaSlotTDEE
- `18265` — eliminaSlotTDEE
- `18278` — _toggleCiclizzazione
- `18284` — _aggiornaAnteprimaCiclizzazione
- `18302` — salvaCalcoloMacros
- `18617` — _metAllenamento
- `18856` — _neatFrazione
- `18975` — _larnLafStileVita
- `18992` — _regimeOffset
- `19002` — _componiRegimeText
- `19035` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `19047` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `19054` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `19160` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 19178-19622

- `19178` — renderTargetBadge
- `17819` — verificaRegola_75_20_5
- `17856` — renderBadge75_20_5
- `19323` — _validaNorm
- `19326` — _validaMatchTermine
- `19334` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `19385` — _validaTesto
- `19406` — validaPiano
- `19480` — _validaFirmaBlocchi
- `19487` — renderBadgeValidatore
- `19518` — _validaVaiAlGiorno
- `19527` — apriPannelloValidatore
- `13472` — esc
- `19584` — _validaEseguiOverride
- `19607` — validaGateExport
- `19622` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 19755-20401

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
- `19755` — pianoPazSelezionato
- `19902` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `20154` — renderPanelMacrosGiorno
- `20297` — pmgCambiaGrammi
- `20324` — riapriPiano
- `20362` — _montaPianoCorrente
- `20401` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 20411-20885

- `20411` — pullTemplateSupabase
- `20422` — delTemplateSupabase
- `20431` — _promptTemplateNome
- `20456` — _creaTemplateDaJSON
- `20479` — salvaComeTemplate
- `20490` — salvaComeTemplateDaPiano
- `20499` — _normNomeAlim
- `20500` — _escRegAlim
- `20501` — _raccogliAlimentiDaPiano
- `20512` — _alimentiEsclusiPaziente
- `20524` — _trovaConflittiTemplate
- `20542` — _mostraAvvisoConflitti
- `20566` — applicaTemplate
- `20584` — apriPickerTemplate
- `20612` — _pickPaziente
- `20636` — applicaTemplatePick
- `20640` — rinominaTemplate
- `20651` — eliminaTemplate
- `20661` — renderLibreriaTemplate
- `20690` — renderStoricoPiani
- `20749` — eliminaPiano
- `20765` — _getActiveMacrosTarget
- `20789` — getTargetAttivi
- `20826` — calcolaTargetsCiclizzazione
- `20852` — _setupPianoTargets
- `20876` — getStagioneCorrente
- `20885` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 21356-21356

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `21356` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 21365-21827

- `21365` — aggiornaUIcolazione
- `21375` — salvaRegolePiano
- `21436` — _isModelloSistema
- `21439` — _isModelloSistemaModificato
- `21451` — caricaModelliCustomLocal
- `21465` — salvaModelliCustomLocal
- `21486` — _migraRecordCustom
- `21504` — _syncAliasLegacy
- `21513` — caricaAlimentiCustom
- `21537` — pushAlimentiCustomSupabase
- `21547` — pullAlimentiCustomSupabase
- `21561` — pushModelliSupabase
- `21579` — pullModelliSupabase
- `21604` — _calcolaFreqDaModello
- `21623` — aggiornaUImodello
- `21712` — popolaDropdownModelli
- `21740` — cambiaModelloRotazione
- `21746` — ripristinaModelloOriginale
- `21769` — eliminaModelloCustom
- `21787` — mostraAnteprimaModello
- `21797` — apriEditorModello
- `21827` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 22096-22334

- `15738` — rerender
- `22096` — _salvaModelloDaEditor
- `22138` — caricaRegolePiano
- `22168` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `22203` — _aiLogUsage
- `22225` — _aiProxyUrl
- `22231` — _aiTokenPerProxy
- `22260` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `22334` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 22413-22553

- `16216` — _risolviCollisioniCelle
- `22413` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `22473` — getFruttaStile
- `22480` — _fruttaGetPasto
- `22490` — _fruttaContaRigheRicetta
- `22494` — _fruttaIndiceBasePasto
- `22514` — getFruttaMarker
- `22527` — fruttaMarkerHtml
- `22535` — _fruttaCheckboxHtml
- `22544` — toggleFrutta
- `22553` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 22589-23863

- `22589` — _renderCelleGriglia
- `22669` — _renderRicetteTestuali
- `22708` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `22779` — _renderCelleHtml
- `22787` — toggleCellaMenu
- `22806` — closeAllCellaMenus
- `22814` — _trovaPasto
- `22822` — cellaSposta
- `22876` — cellaCancella
- `22897` — apriEditGrammatura
- `16789` — salva
- `22945` — cellaSwap
- `22965` — cellaRimuoviAlt
- `22979` — cellaAggiungiAlt
- `23082` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `23167` — apriEditRicetta
- `23176` — aggiungiRicetta
- `23192` — rimuoviRicetta
- `23201` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `23363` — ngAggiungiSpuntinoVuoto
- `23379` — apriAggiungiCella
- `17254` — risolviCompatibili
- `23475` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `23567` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `23708` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `23863` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 23911-24303

- `23911` — _attesoStrutturaPiano
- `23931` — _confrontaStrutturaPiano
- `23961` — _costruisciPromptDelta
- `23988` — _pianoToolSchema
- `24063` — _pianoMaxTokens
- `24072` — _estraiPianoDaRisposta
- `24094` — chiamaGeneraPiano
- `24261` — mostraLoadingSteps
- `18123` — render
- `24303` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 24370-24947

- `24370` — generaMessaggioAI
- `24475` — copiaMessaggioAI
- `24485` — salvaInStorico
- `24497` — salvaVarianteAI
- `24512` — renderVariantiSalvate
- `24531` — usaVariante
- `24549` — eliminaVariante
- `24560` — renderStoricoMsg
- `24576` — apriWhatsApp
- `24947` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 25125-26622

- `25125` — _ngColoreSemaforoNome
- `25133` — apriSceltaModalitaPiano
- `25168` — _ngChiudiModalita
- `25171` — _ngCostruisciGiornoVuoto
- `25204` — _ngCostruisciGiornoSpeciale
- `25215` — _ngIndiceInizioSpeciali
- `25226` — _ngModalitaNomeGiorno
- `25232` — _ngImpostaModalitaNomeGiorno
- `25235` — _ngLettera
- `25242` — _ngEtichettaGiorno
- `25262` — _ngEtichettaGiornoBreve
- `25276` — _ngToggleGiornoSpeciale
- `25300` — _ngRenderPannelloSpeciale
- `25368` — _generaGiornoSpecialeAI
- `25468` — _ngGiornoHaContenuto
- `25480` — _ngCreaPianoManuale
- `25503` — _ngScrollTabGiorni
- `25513` — _ngAbilitaDragScroll
- `25550` — _ngCambiaNumeroGiorni
- `25582` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `25596` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `25637` — _ngToggleCat
- `25646` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `25670` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `25826` — _ngSalvaPianoManuale
- `25852` — _ngParseIngrediente
- `25876` — _ngScomponiIngredienti
- `25888` — _ricCalcolaMacroDaIngredienti
- `25906` — _ricRicalcolaMacroLive
- `25913` — _ricAggiornaInfoMacro
- `25927` — _ricRicalcolaMacroLiveNow
- `25951` — _ngTrovaCategoriaAlimento
- `25984` — _ngPescaRicetta
- `26027` — _ngScomponiRicettaNelPasto
- `26064` — _ngDragStart
- `26075` — _ngDragStartCella
- `26086` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `26093` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `26098` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `26117` — _ngAggiungiAlimento
- `26142` — _ngRimuoviAlimento
- `26156` — _ngDopoModifica
- `26174` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `26227` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `26256` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `26273` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `26281` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `26353` — gramTestoCasalingo
- `26379` — _appendToggleNutrizionali
- `26422` — _appendTogglePromemoria
- `26451` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `26597` — cpFromEmoji
- `26603` — getEmojiCp
- `26622` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `24597` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `24619` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `24624` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `24650` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `24738` — _spesaTestoWhatsApp
- `24754` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `24799` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `24822` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `24850` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `24910` — scaricaListaSpesaPDF (download diretto, un click)
- `24918` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `24930` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 27774-27774

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
- `27774` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 27788-28000

- `27788` — salvaInbody
- `27858` — delInbody
- `27865` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `28000` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 28028-28815

- `28028` — buildSemLegenda
- `28042` — renderAlEditor
- `28139` — _alimNomeRegex
- `28147` — _alimGiorniDaPiano
- `28155` — _scanGiorniPerNome
- `28170` — scanRiferimentiAlimento
- `28199` — _alimRefsRighe
- `28205` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `28293` — modificaAlimentoCustom
- `28313` — ripristinaValoriPrecedentiAlimento
- `28325` — _resetAlimModal
- `28337` — apriNuovoAlimentoCustom
- `28343` — salvaAlimentoCustom
- `28413` — eliminaAlimentoCustom
- `28721` — _alimFonteBadge
- `28726` — renderAlimentiPage
- `22217` — E
- `28797` — archiviaAlimentoCustom
- `28815` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 28842-29478

- `28842` — _bcSetStatus
- `28844` — apriScannerBarcode
- `28852` — chiudiScannerBarcode
- `28857` — _bcStopCamera
- `28865` — _bcModaleAperto
- `28867` — _bcAvviaCamera
- `28878` — _bcAvviaNativo
- `28898` — _bcAvviaZXing
- `28907` — _bcZXStart
- `28918` — _bcErroreCamera
- `28926` — cercaBarcodeManuale
- `28932` — _barcodeTrovato
- `29103` — cercaBarcodeOFF
- `29132` — _bcProdottoNonTrovato
- `29147` — _bcPrecompilaForm
- `22477` — num
- `29192` — togAl
- `29245` — selCatAl
- `25402` — selTuttiAl
- `29310` — _appIdAnag  (P140 T1)
- `29320` — _appSyncPaz  (P140 T1)
- `29364` — _appSpecchioInverso  (P140 T2)
- `29390` — _appRitiraSpecchio  (P140 T2)
- `29421` — _appAncoraTappe  (P140 T2)
- `29440` — _appTappe  (P140 T2)
- `29461` — _appMigraPaziente  (P140 T1)
- `29471` — _appMigraTutti  (P140 T1)
- `29478` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 29494-29963

- `29494` — setCalView
- `29504` — calPrev
- `29505` — calNext
- `29506` — calToday
- `29508` — renderCal
- `29522` — renderCalMonth
- `29549` — renderCalWeek
- `29582` — renderCalDay
- `29633` — selGiorno
- `29647` — setDisp
- `29652` — openAddEvento
- `29665` — openAddEventoPaz
- `29671` — toggleEntrataCheck
- `29676` — salvaEvento
- `29718` — _evTestoPromemoria  (P140 T1)
- `29724` — openEvDetail
- `29779` — delEvento
- `29801` — copyMsg
- `29813` — aggDateCal
- `27020` — syncInizio
- `27021` — syncControllo
- `29826` — aggiornaPrev
- `29851` — apriEventoDaScheda  (P140 T2)
- `29865` — _appAggiornaOreScheda  (P140 T2)
- `29882` — renderRic
- `29909` — openNuovaRic
- `29910` — editRic
- `29920` — salvaRic
- `29945` — delRic
- `29963` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 30049-30109

- `30049` — aggiungiEntrataPerPaziente
- `30066` — openNuovaEntrata
- `30080` — salvaEntrata
- `30101` — delEntrata
- `30109` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 30139-30854

- `30139` — aiSuggerisciRicetta
- `30184` — renderConcettiModal
- `30203` — apriConcettiModal
- `30230` — salvaConcettiAllegati
- `30254` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `30292` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `30435` — loadInbodyPDF
- `30556` — _vitdLabel
- `30560` — getIntegratori
- `30564` — getIntegraWant
- `30577` — _chiaviSpuntate *(P148 — risolve le etichette salvate in chiavi, regola 21)*
- `30585` — setIntegratori
- `30602` — setIntegraWant
- `30630` — _infoIntegratoreHtml *(P148 — contenuto del pannello ⓘ)*
- `30658` — mostraInfoIntegratore *(P148 — apre/chiude il pannello sotto la griglia)*
- `30670` — renderCaselleIntegratori *(P148 — genera le caselle dal catalogo; va chiamata PRIMA di setIntegratori, altrimenti le spunte non trovano gli elementi)*
- `30731` — getPatologieChip
- `30732` — getAllergieChip
- `30733` — setPatologieChip
- `30734` — setAllergieChip
- `30735` — getPatologie
- `30736` — getAllergie
- `30737` — setPatologieFromStr
- `30744` — setAllergieFromStr
- `30757` — getSdvChip
- `30758` — getCspChip
- `30759` — setSdvChip
- `30760` — setCspChip
- `30761` — setSdvFromStr
- `30762` — setCspFromStr
- `30766` — getBudget
- `30767` — setBudget
- `30772` — renderCalAnno
- `30803` — comprimeImmagine
- `30825` — uploadImmagineConcetto
- `30844` — rimuoviImmagineConcetto
- `30854` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 30920-31004

- `30920` — entraSelConcetti
- `30921` — annullaSelConcetti
- `30922` — toggleConcettoSel
- `30927` — eliminaConcettiSelezionati
- `30946` — confermaEliminaConcetti
- `30961` — aiRiscriviConcetto
- `30975` — editConcetto
- `30993` — salvaConcetto
- `31004` — openNuovoConcetto
- `27519` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 31041-31041

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
- `31041` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 31153-31478

- `31153` — renderScadenzeAlert
- `31413` — _scadGestiti  (P144)
- `31423` — _scadPota  (P144)
- `31438` — _scadMigraDaLocalStorage  (P144)
- `31461` — segnaGestito
- `31478` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 31487-31562

- `31487` — ripristinaPaz
- `31495` — eliminaPaz
- `31540` — getDove
- `31544` — setDove
- `31562` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 31567-32005

- `31567` — getCredenzialiPersistenti
- `31580` — cancellaCredenzialiPersistenti
- `31585` — rinnovaSessioneConRefreshToken
- `31602` — getSessioneSalvata
- `31621` — salvaSessione
- `31631` — cancellaSessione
- `31635` — eseguiLogin
- `31682` — eseguiLogout
- `31704` — mostraApp
- `31709` — verificaSessioneEAvvia
- `31737` — assicuraTokenValido
- `31766` — _garantiscoSessionePerSync
- `31778` — avviaRinnovoTokenPeriodico
- `31782` — fermaRinnovoTokenPeriodico
- `31791` — _authReset
- `31796` — _authMostra
- `31799` — mostraLogin
- `31800` — mostraRegistrazione
- `31801` — mostraRecupero
- `31802` — mostraNuovaPassword
- `31805` — eseguiRegistrazione
- `31843` — eseguiRecuperoPassword
- `31872` — eseguiNuovaPassword
- `31906` — _parseHashParams
- `31913` — _pulisciHash
- `31917` — gestisciRitornoAuth
- `32005` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 32077-32178

- `32077` — apriPannelloRicette
- `32106` — chiudiPannelloRicette
- `32114` — applicaRicettaPasto
- `32150` — inizializzaP2
- `32162` — deepClone
- `30143` — applicaPatch
- `32178` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
