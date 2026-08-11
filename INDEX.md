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
Righe 19755-20387

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
- `20140` — renderPanelMacrosGiorno
- `20283` — pmgCambiaGrammi
- `20310` — riapriPiano
- `20348` — _montaPianoCorrente
- `20387` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 20397-20871

- `20397` — pullTemplateSupabase
- `20408` — delTemplateSupabase
- `20417` — _promptTemplateNome
- `20442` — _creaTemplateDaJSON
- `20465` — salvaComeTemplate
- `20476` — salvaComeTemplateDaPiano
- `20485` — _normNomeAlim
- `20486` — _escRegAlim
- `20487` — _raccogliAlimentiDaPiano
- `20498` — _alimentiEsclusiPaziente
- `20510` — _trovaConflittiTemplate
- `20528` — _mostraAvvisoConflitti
- `20552` — applicaTemplate
- `20570` — apriPickerTemplate
- `20598` — _pickPaziente
- `20622` — applicaTemplatePick
- `20626` — rinominaTemplate
- `20637` — eliminaTemplate
- `20647` — renderLibreriaTemplate
- `20676` — renderStoricoPiani
- `20735` — eliminaPiano
- `20751` — _getActiveMacrosTarget
- `20775` — getTargetAttivi
- `20812` — calcolaTargetsCiclizzazione
- `20838` — _setupPianoTargets
- `20862` — getStagioneCorrente
- `20871` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 21342-21342

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `21342` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 21351-21813

- `21351` — aggiornaUIcolazione
- `21361` — salvaRegolePiano
- `21422` — _isModelloSistema
- `21425` — _isModelloSistemaModificato
- `21437` — caricaModelliCustomLocal
- `21451` — salvaModelliCustomLocal
- `21472` — _migraRecordCustom
- `21490` — _syncAliasLegacy
- `21499` — caricaAlimentiCustom
- `21523` — pushAlimentiCustomSupabase
- `21533` — pullAlimentiCustomSupabase
- `21547` — pushModelliSupabase
- `21565` — pullModelliSupabase
- `21590` — _calcolaFreqDaModello
- `21609` — aggiornaUImodello
- `21698` — popolaDropdownModelli
- `21726` — cambiaModelloRotazione
- `21732` — ripristinaModelloOriginale
- `21755` — eliminaModelloCustom
- `21773` — mostraAnteprimaModello
- `21783` — apriEditorModello
- `21813` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 22082-22320

- `15738` — rerender
- `22082` — _salvaModelloDaEditor
- `22124` — caricaRegolePiano
- `22154` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `22189` — _aiLogUsage
- `22211` — _aiProxyUrl
- `22217` — _aiTokenPerProxy
- `22246` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `22320` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 22399-22539

- `16216` — _risolviCollisioniCelle
- `22399` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `22459` — getFruttaStile
- `22466` — _fruttaGetPasto
- `22476` — _fruttaContaRigheRicetta
- `22480` — _fruttaIndiceBasePasto
- `22500` — getFruttaMarker
- `22513` — fruttaMarkerHtml
- `22521` — _fruttaCheckboxHtml
- `22530` — toggleFrutta
- `22539` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 22575-23849

- `22575` — _renderCelleGriglia
- `22655` — _renderRicetteTestuali
- `22694` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `22765` — _renderCelleHtml
- `22773` — toggleCellaMenu
- `22792` — closeAllCellaMenus
- `22800` — _trovaPasto
- `22808` — cellaSposta
- `22862` — cellaCancella
- `22883` — apriEditGrammatura
- `16789` — salva
- `22931` — cellaSwap
- `22951` — cellaRimuoviAlt
- `22965` — cellaAggiungiAlt
- `23068` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `23153` — apriEditRicetta
- `23162` — aggiungiRicetta
- `23178` — rimuoviRicetta
- `23187` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `23349` — ngAggiungiSpuntinoVuoto
- `23365` — apriAggiungiCella
- `17254` — risolviCompatibili
- `23461` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `23553` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `23694` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `23849` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 23897-24289

- `23897` — _attesoStrutturaPiano
- `23917` — _confrontaStrutturaPiano
- `23947` — _costruisciPromptDelta
- `23974` — _pianoToolSchema
- `24049` — _pianoMaxTokens
- `24058` — _estraiPianoDaRisposta
- `24080` — chiamaGeneraPiano
- `24247` — mostraLoadingSteps
- `18123` — render
- `24289` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 24356-24933

- `24356` — generaMessaggioAI
- `24461` — copiaMessaggioAI
- `24471` — salvaInStorico
- `24483` — salvaVarianteAI
- `24498` — renderVariantiSalvate
- `24517` — usaVariante
- `24535` — eliminaVariante
- `24546` — renderStoricoMsg
- `24562` — apriWhatsApp
- `24933` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 25111-26608

- `25111` — _ngColoreSemaforoNome
- `25119` — apriSceltaModalitaPiano
- `25154` — _ngChiudiModalita
- `25157` — _ngCostruisciGiornoVuoto
- `25190` — _ngCostruisciGiornoSpeciale
- `25201` — _ngIndiceInizioSpeciali
- `25212` — _ngModalitaNomeGiorno
- `25218` — _ngImpostaModalitaNomeGiorno
- `25221` — _ngLettera
- `25228` — _ngEtichettaGiorno
- `25248` — _ngEtichettaGiornoBreve
- `25262` — _ngToggleGiornoSpeciale
- `25286` — _ngRenderPannelloSpeciale
- `25354` — _generaGiornoSpecialeAI
- `25454` — _ngGiornoHaContenuto
- `25466` — _ngCreaPianoManuale
- `25489` — _ngScrollTabGiorni
- `25499` — _ngAbilitaDragScroll
- `25536` — _ngCambiaNumeroGiorni
- `25568` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `25582` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `25623` — _ngToggleCat
- `25632` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `25656` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `25812` — _ngSalvaPianoManuale
- `25838` — _ngParseIngrediente
- `25862` — _ngScomponiIngredienti
- `25874` — _ricCalcolaMacroDaIngredienti
- `25892` — _ricRicalcolaMacroLive
- `25899` — _ricAggiornaInfoMacro
- `25913` — _ricRicalcolaMacroLiveNow
- `25937` — _ngTrovaCategoriaAlimento
- `25970` — _ngPescaRicetta
- `26013` — _ngScomponiRicettaNelPasto
- `26050` — _ngDragStart
- `26061` — _ngDragStartCella
- `26072` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `26079` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `26084` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `26103` — _ngAggiungiAlimento
- `26128` — _ngRimuoviAlimento
- `26142` — _ngDopoModifica
- `26160` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `26213` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `26242` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `26259` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `26267` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `26339` — gramTestoCasalingo
- `26365` — _appendToggleNutrizionali
- `26408` — _appendTogglePromemoria
- `26437` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `26583` — cpFromEmoji
- `26589` — getEmojiCp
- `26608` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `24583` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `24605` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `24610` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `24636` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `24724` — _spesaTestoWhatsApp
- `24740` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `24785` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `24808` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `24836` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `24896` — scaricaListaSpesaPDF (download diretto, un click)
- `24904` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `24916` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 27760-27760

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
- `27760` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 27774-27986

- `27774` — salvaInbody
- `27844` — delInbody
- `27851` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `27986` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 28014-28801

- `28014` — buildSemLegenda
- `28028` — renderAlEditor
- `28125` — _alimNomeRegex
- `28133` — _alimGiorniDaPiano
- `28141` — _scanGiorniPerNome
- `28156` — scanRiferimentiAlimento
- `28185` — _alimRefsRighe
- `28191` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `28279` — modificaAlimentoCustom
- `28299` — ripristinaValoriPrecedentiAlimento
- `28311` — _resetAlimModal
- `28323` — apriNuovoAlimentoCustom
- `28329` — salvaAlimentoCustom
- `28399` — eliminaAlimentoCustom
- `28707` — _alimFonteBadge
- `28712` — renderAlimentiPage
- `22217` — E
- `28783` — archiviaAlimentoCustom
- `28801` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 28828-29464

- `28828` — _bcSetStatus
- `28830` — apriScannerBarcode
- `28838` — chiudiScannerBarcode
- `28843` — _bcStopCamera
- `28851` — _bcModaleAperto
- `28853` — _bcAvviaCamera
- `28864` — _bcAvviaNativo
- `28884` — _bcAvviaZXing
- `28893` — _bcZXStart
- `28904` — _bcErroreCamera
- `28912` — cercaBarcodeManuale
- `28918` — _barcodeTrovato
- `29089` — cercaBarcodeOFF
- `29118` — _bcProdottoNonTrovato
- `29133` — _bcPrecompilaForm
- `22477` — num
- `29178` — togAl
- `29231` — selCatAl
- `25402` — selTuttiAl
- `29296` — _appIdAnag  (P140 T1)
- `29306` — _appSyncPaz  (P140 T1)
- `29350` — _appSpecchioInverso  (P140 T2)
- `29376` — _appRitiraSpecchio  (P140 T2)
- `29407` — _appAncoraTappe  (P140 T2)
- `29426` — _appTappe  (P140 T2)
- `29447` — _appMigraPaziente  (P140 T1)
- `29457` — _appMigraTutti  (P140 T1)
- `29464` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 29480-29949

- `29480` — setCalView
- `29490` — calPrev
- `29491` — calNext
- `29492` — calToday
- `29494` — renderCal
- `29508` — renderCalMonth
- `29535` — renderCalWeek
- `29568` — renderCalDay
- `29619` — selGiorno
- `29633` — setDisp
- `29638` — openAddEvento
- `29651` — openAddEventoPaz
- `29657` — toggleEntrataCheck
- `29662` — salvaEvento
- `29704` — _evTestoPromemoria  (P140 T1)
- `29710` — openEvDetail
- `29765` — delEvento
- `29787` — copyMsg
- `29799` — aggDateCal
- `27020` — syncInizio
- `27021` — syncControllo
- `29812` — aggiornaPrev
- `29837` — apriEventoDaScheda  (P140 T2)
- `29851` — _appAggiornaOreScheda  (P140 T2)
- `29868` — renderRic
- `29895` — openNuovaRic
- `29896` — editRic
- `29906` — salvaRic
- `29931` — delRic
- `29949` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 30035-30095

- `30035` — aggiungiEntrataPerPaziente
- `30052` — openNuovaEntrata
- `30066` — salvaEntrata
- `30087` — delEntrata
- `30095` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 30125-30840

- `30125` — aiSuggerisciRicetta
- `30170` — renderConcettiModal
- `30189` — apriConcettiModal
- `30216` — salvaConcettiAllegati
- `30240` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `30278` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `30421` — loadInbodyPDF
- `30542` — _vitdLabel
- `30546` — getIntegratori
- `30550` — getIntegraWant
- `30563` — _chiaviSpuntate *(P148 — risolve le etichette salvate in chiavi, regola 21)*
- `30571` — setIntegratori
- `30588` — setIntegraWant
- `30616` — _infoIntegratoreHtml *(P148 — contenuto del pannello ⓘ)*
- `30644` — mostraInfoIntegratore *(P148 — apre/chiude il pannello sotto la griglia)*
- `30656` — renderCaselleIntegratori *(P148 — genera le caselle dal catalogo; va chiamata PRIMA di setIntegratori, altrimenti le spunte non trovano gli elementi)*
- `30717` — getPatologieChip
- `30718` — getAllergieChip
- `30719` — setPatologieChip
- `30720` — setAllergieChip
- `30721` — getPatologie
- `30722` — getAllergie
- `30723` — setPatologieFromStr
- `30730` — setAllergieFromStr
- `30743` — getSdvChip
- `30744` — getCspChip
- `30745` — setSdvChip
- `30746` — setCspChip
- `30747` — setSdvFromStr
- `30748` — setCspFromStr
- `30752` — getBudget
- `30753` — setBudget
- `30758` — renderCalAnno
- `30789` — comprimeImmagine
- `30811` — uploadImmagineConcetto
- `30830` — rimuoviImmagineConcetto
- `30840` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 30906-30990

- `30906` — entraSelConcetti
- `30907` — annullaSelConcetti
- `30908` — toggleConcettoSel
- `30913` — eliminaConcettiSelezionati
- `30932` — confermaEliminaConcetti
- `30947` — aiRiscriviConcetto
- `30961` — editConcetto
- `30979` — salvaConcetto
- `30990` — openNuovoConcetto
- `27519` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 31027-31027

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
- `31027` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 31139-31464

- `31139` — renderScadenzeAlert
- `31399` — _scadGestiti  (P144)
- `31409` — _scadPota  (P144)
- `31424` — _scadMigraDaLocalStorage  (P144)
- `31447` — segnaGestito
- `31464` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 31473-31548

- `31473` — ripristinaPaz
- `31481` — eliminaPaz
- `31526` — getDove
- `31530` — setDove
- `31548` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 31553-31991

- `31553` — getCredenzialiPersistenti
- `31566` — cancellaCredenzialiPersistenti
- `31571` — rinnovaSessioneConRefreshToken
- `31588` — getSessioneSalvata
- `31607` — salvaSessione
- `31617` — cancellaSessione
- `31621` — eseguiLogin
- `31668` — eseguiLogout
- `31690` — mostraApp
- `31695` — verificaSessioneEAvvia
- `31723` — assicuraTokenValido
- `31752` — _garantiscoSessionePerSync
- `31764` — avviaRinnovoTokenPeriodico
- `31768` — fermaRinnovoTokenPeriodico
- `31777` — _authReset
- `31782` — _authMostra
- `31785` — mostraLogin
- `31786` — mostraRegistrazione
- `31787` — mostraRecupero
- `31788` — mostraNuovaPassword
- `31791` — eseguiRegistrazione
- `31829` — eseguiRecuperoPassword
- `31858` — eseguiNuovaPassword
- `31892` — _parseHashParams
- `31899` — _pulisciHash
- `31903` — gestisciRitornoAuth
- `31991` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 32063-32164

- `32063` — apriPannelloRicette
- `32092` — chiudiPannelloRicette
- `32100` — applicaRicettaPasto
- `32136` — inizializzaP2
- `32148` — deepClone
- `30143` — applicaPatch
- `32164` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
