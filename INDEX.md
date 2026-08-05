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
**Ultimo rigenero automatico: 5 agosto 2026** (audit al contrario: correzione `selCatAl`, rinomina `verificaRegola_70_25_10`, ricette di sistema eliminabili, rimozione `applicaPatch`; poi P148 tappa 1: `_macrosCella`, `pastoMaxPerMacro`, `pastoMaxPerMacroTuttiIGiorni`; poi P148 tappa 2: `CATALOGO_INTEGRATORI` e i cinque helper di risoluzione etichette) — lo script ha corretto **2021 voci** in totale nella giornata; i range "Righe A-B" di sezione NON sono stati ricalcolati in questa passata (restano quelli del 26 lug, indicativi). Righe totali file: 30747.

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
Righe 2421-2463

- `2421` — _slugAlimento
- `2429` — _catalogoIndicizza
- `2433` — _catalogoDeindicizza
- `2440` — costruisciCatalogo
- `2463` — risolviAlimento

---

### MACROS PIANO — calcolo e badge macro reali vs target
Righe 2478-2836

- `2478` — getValoriCREA
- `2490` — getCurrentPaziente
- `2525` — getKcalWeekend
- `2580` — getMacrosRicettaComposta
- `2597` — _macrosCella
- `2623` — calcolaMacrosPiano
- `2735` — pastoMaxPerMacro
- `2764` — pastoMaxPerMacroTuttiIGiorni
- `2770` — renderBadgeMacrosReali
- `2611` — pctStr
- `2612` — color
- `2625` — row
- `2836` — renderBadgeMacrosReali_DOM

---

### ANALISI DEL SANGUE — parsing, indici clinici derivati, interpretazione
Righe 3121-3328

- `3121` — _parseAnalisiNum
- `3129` — calcolaIndice
- `3302` — interpretaAnalisi
- `3314` — _interpAnalisiHtml
- `3328` — mostraInfoRange

---

### CONCETTI EDUCATIVI — sync Supabase, migrazione
Righe 3475-3499

- `3475` — pushConcetiSupabase
- `3485` — pullConcetiSupabase
- `3499` — migraConcetti

---

### ALIMENTI — categorie funzionali/semaforo, chip UI, equivalenze porzioni
Righe 3689-4061

- `3689` — getCategoriaSemaforo
- `3706` — _getCategorieGruppo
- `3720` — calcolaGrammaturaEquivalente
- `3772` — _gruppoEquiv  (P121: gruppo di equivalenza + criterio per categoria funzionale)
- `3778` — _porzioneStandard  (P121: porzione `g` di database dell'alimento)
- `3793` — suggerisciGrEquivalente  (P121: firma a 3 argomenti, il gruppo si deduce dai due alimenti)
- `3819` — _etichettaCriterio  (P121: ≈carbo / ≈prot / ≈grassi / fissa / porzione)
- `3839` — _promptAlternativeGrassi  (P121: riga del prompt AI generata dal motore)
- `3855` — ricalcolaAlternative  (P121: MOTORE UNICO, unico punto che scrive la grammatura di un'alternativa)
- `3874` — ricalcolaAlternativePiano  (P121: applica il motore a tutte le celle di un piano)
- `3923` — arrotondaGrammatura  (P121: sostituisce arrotondaPorzioneDiscreta — pezzi interi senza tetto / 5g)
- `3933` — getCategoriaFunzionale
- `3973` — catArr
- `3989` — _tagComuniTrova
- `3993` — getTagComuniChip
- `3996` — setTagComuniChip
- `4004` — setCatChips
- `4017` — getStagioniChip
- `4020` — setStagioniChip
- `4027` — getProfiloChip
- `4030` — setProfiloChip
- `4039` — wireChipGroup
- `4050` — wireAttrChipGroups
- `4061` — wireRadioChipGroup

---

### CONFIG / STORAGE LOCALE — cfg, localStorage db, util data/valuta
Righe 4089-4505

- `4089` — getCfg
- `4090` — saveCfgL
- `4091` — getUrl
- `4092` — saveLocal
- `4093` — loadLocal
- `4105` — uid
- `4123` — ymdLoc  (P141)
- `4128` — today
- `4136` — addDays
- `4144` — fData
- `4145` — fEur
- `4147` — getLastSyncText
- `4157` — getSyncColor
- `4164` — aggiornaStatoSync
- `4190` — setSyncStatus
- `4459` — _registraTombstone
- `4467` — _tombstoneAttivi
- `4479` — _fondiTombstones
- `4493` — _mergeTombstonesRemoti *(dal 24/7 legge il meta da `collections`, P74 1d)*
- `4505` — _applicaTombstones
- `4366` — _pazFetchMeta *(P74 1d — solo `collections`)*
- `4387` — _collectionsUpsert *(P74 — scrittura primaria dei 4 meta-record dal cutover 1d)*
- `4409` — _collectionsFetch *(P74 1d — lettura unica dei meta-record)*
- `4432` — _analisiSangueUpsert *(P74 fase 2 — scrittura ombra analisi del sangue, 24/7)*

---

### SYNC SUPABASE — push/pull ricette/pazienti, tombstones, conflitti (P69)
Righe 4529-4962

- `4529` — supaHeaders
- `4543` — pushRicetteSupabase
- `4614` — pullRicetteSupabase
- `4638` — delRicetteSupabase
- `4650` — delPazienteSupabase
- `4665` — pushToSheets
- `4709` — pullFromSheets
- `4788` — syncNow
- `4801` — sincronizzaTutto
- `4360` — stpSet
- `4365` — stpMsg
- `4932` — testConnSupabase
- `4962` — _p68LogSaveAnonimo

---

### SYNC SUPABASE — save paziente, piani/cache piano, entrate, eventi
Righe 4976-5498

- `4976` — save
- `4994` — _pushRigaPerId
- `5027` — _flushDirtyIds
- `5110` — _p69LoadBaseline
- `5113` — _p69StoreBaseline
- `5116` — _p69SetBaseline
- `5120` — _p69DropBaseline
- `5124` — _p69SetBaselineFromRows
- `5130` — _p69NomePaz
- `5135` — _p69InList
- `5143` — _p69RilevaConflitti
- `5179` — _p69DialogoConflitti
- `4738` — chiudi
- `5213` — _p69RisolviRicarica
- `5242` — _p69EsportaLocali
- `5255` — _p69RisolviSovrascrivi
- `5268` — pushPianoSupabase
- `5290` — pullPianiSupabase
- `5306` — delPianoSupabase
- `5322` — delPianiPazienteSupabase
- `5334` — pushCachePianoSupabase
- `5351` — caricaCachePianoSupabase
- `5373` — pushEntrateSupabase
- `5397` — pullEntrateSupabase
- `5411` — delEntrataSupabase
- `5419` — pushEntrataSupabase
- `5430` — pushEventoSupabase
- `5443` — pushEventiSupabase
- `5467` — pullEventiSupabase
- `5487` — delEventoSupabase
- `5498` — _pianoCacheKey

---

### UI GENERALE — config AI key, notifiche, navigazione (goTo/tab/modali)
Righe 5529-5640

- `5529` — _salvaPianoCache
- `5534` — _caricaPianoCache
- `5540` — salvaCfg
- `5541` — testConn
- `5548` — testaAntKey
- `5559` — initAntCard
- `5562` — esporta
- `5563` — importa
- `5568` — goTo
- `5584` — closeM
- `5592` — ngChiudiModale
- `5601` — ngChiudiPopupCoppia
- `5605` — ngAggiungiX
- `5616` — ngUpgradeModali
- `5636` — mTab
- `5637` — aggiornaEta
- `5638` — toggleOrarioNote
- `5639` — pdTab
- `5640` — notif

---

### PAZIENTI — registro: lista/card/kanban, apertura, editing, salvataggio, routine
Righe 5648-8787

- `5648` — getPazView
- `5649` — setPazView
- `5658` — _pazStatoPiano
- `5666` — _pazUrgenzaControllo
- `5681` — _pazBadgePrenotato  (P142)
- `5688` — pazSegnaArrivato  (P142)
- `5694` — _pazStatoTagHtml
- `5711` — _pazAggiornaFiltroRegimi
- `5719` — renderPaz
- `5777` — _renderPazCard
- `5802` — _renderPazLista
- `5829` — _renderPazKanban
- `5867` — openNuovoPaz
- `5894` — editPaz
- `5974` — REGOLE_SEMAFORO_ALIMENTI *(15 condizioni cliniche → grigi/celesti; globale dal 26/7 per essere verificabile dal test)*
- `6421` — _SEM_COLORI_LEGACY / `6105` _SEM_COLORI_AUTO *(F9 — unico vocabolario dei colori automatici)*
- `6426` — NOMI_CONDIZIONE_SEMAFORO *(etichette delle 15 condizioni, usate anche dal riquadro della scheda)*
- `6448` — _semaforoCondizioniAttive *(le condizioni spuntate su un paziente)*
- `6459` — _semaforoMigraPaziente *(F9 — toglie i colori legacy e ricalcola; idempotente)*
- `6470` — _semaforoMigraTutti *(passata su tutti i pazienti in memoria, con conteggio)*
- `6481` — applicaRegoloSemaforo *(dal 26/7 pulisce TUTTI e sei i colori automatici, non solo i suoi due)*
- `6569` — trovaChiaveAlimento *(match esatto sul nome: se non trova, la regola è ignorata in silenzio — vedi test s2-regole-nomi-alimenti)*
- `6593` — _pazNumOPrec *(F7 — campo assente = valore precedente, non azzeramento)*
- `6605` — _pazPreservaCampi *(F5 — l'anagrafica non cancella i campi che il form non gestisce)*
- `6611` — salvaPaz
- `6761` — openPaz
- `8349` — catalogoIntegratoriAttivi *(P148 — voci proponibili, esclude quelle ritirate)*
- `8353` — integratorePerChiave *(P148)*
- `8389` — _normEtichettaIntegr *(P148)*
- `8397` — chiaveIntegratore *(P148 — etichetta storica → chiave stabile, regola 21)*
- `8415` — migraEtichetteIntegratori *(P148 — {chiavi, liberi}: le sconosciute si conservano)*
- `8474` — renderPdRoutine
- `6723` — cardHTML
- `8616` — updateRoutineCampo
- `8624` — suggerisciPastoEQuando
- `8651` — filtroLibreria
- `8660` — renderLibreriaGrid
- `8681` — aggiungiDaLibreriaIdx
- `8705` — openModalRoutine
- `8712` — salvaRoutineVoce
- `8737` — salvaRoutine
- `8744` — mostraRoutinePopup
- `8772` — removeRoutineVoce
- `8787` — _renderAggiustamentiSection

---

### 📈 PERCORSO — timeline di periodizzazione (P115 Tappe 1-5 COMPLETE, 24 lug 2026)
Righe 6021-6621 (numeri ESATTI al 24/7 notte, dopo la Tappa 5). ⚠️ Questo blocco (~600 righe) fa slittare tutti i numeri delle sezioni SUCCESSIVE a riga ~6020 rispetto all'ultima rigenerazione completa: per quelle sezioni fare grep di conferma. Rigenerazione completa alla prossima modifica strutturale.

- `6807` — _PERCORSO_TIPI (const: tipi fase, colori, pct default)
- `6814` — _percorsoGet *(normalizza p.percorso, scarta fasi invalide)*
- `6838` — _percorsoIntervalli *(fasi consecutive → date concrete dal/al)*
- `6852` — _percorsoFaseAt *(fase attiva a una data; dal incluso, al escluso)*
- `6861` — _percorsoKcalFase *(pct → kcal indicative via calcolaTDEE)*
- `6884` — _percorsoProiezione *(Tappa 2 — proiezione ibrida teorica/calibrata, cono, obiettivo a intervallo)*
- `6942` — _percorsoDataBreve *(ISO → "12 set")*
- `6959` — _percorsoSerieEnergia *(Tappa 3 — serie introito/TDEE stimato/TDEE osservato per la corsia energia)*
- `6998` — _percorsoSerieMassaMagra *(Tappa 4 — solo InBody: punti {data,m,pg})*
- `7017` — _percorsoConsuntivo *(Tappa 5 — legge p.consuntivo scritto da P50: aderenza, extra kcal, ritardo=extra÷7700, settimane perse; oggi sempre ok:false)*
- `7059` — _PERCORSO_LAYERS_DEFAULT / _percorsoLayersState / _percorsoLayersGet *(Tappa 4 — stato interruttori, SOLO sessione, mai su p)*
- `7064` — percorsoLayerToggle *(Tappa 4 — inverte un solo strato)*
- `7070` — percorsoVistaPreset *(Tappa 4 — preset "tecnica"/"paziente")*
- `7086` — _percorsoPaz *(e a seguire i mutatori percorsoInit/SetInizio/AddFase/UpdFase/DelFase/MoveFase)*
- `7142` — _PERCORSO_MODELLI / _PERCORSO_GEN *(P122 T3 — 4 modelli + regole dei cicli)*
- `7160` — _percorsoGeneraFasi *(P122 T3 — pura: dal traguardo alle fasi, ritmo = quello della proiezione)*
- `7240` — _percorsoModelloSelectHtml
- `7249` — percorsoGeneraDaModello *(propone; conferma prima di sostituire fasi esistenti)*
- `7272` — _percorsoShiftGiorni *(pura: ancora = ultima pesata)*
- `7282` — percorsoRiallinea *(⏩ trasla il piano, riprende dal giorno-fase dell'interruzione)*
- `7309` — _TRG_TIPI / `6744` _TRG_COMPORTAMENTI *(P122 T4 — tipi di traguardo e libreria comportamenti)*
- `7331` — _traguardiGet · `6761` _traguardoValoreAttuale *(valore corrente dai dati esistenti, null se manca)*
- `7370` — _traguardoVerso *(auto: dedotto dalla partenza)* · `6803` _traguardoValuta · `6824` _traguardiValuta
- `7411` — traguardoAdd · `6852` traguardoUpd · `6867` traguardoDel · `6873` traguardoSegna
- `7469` — _COND_TIPI · `6897` _percorsoCondizione *(pura: la fase finisce per soglia — SOLO suggerimento)*
- `7485` — percorsoSetCondizione · `6927` percorsoChiudiFase *(esito fotografato, riapribile)*
- `7519` — _traguardiHtml *(blocco 🏁 in fondo alla scheda Percorso)*
- `7617` — _percorsoVistaPaz / `7049` _percorsoVistaPazAttiva *(P122 T5 — modalità di sessione)*
- `7624` — _percorsoVittorie *(pura: vittorie dall'inizio del percorso + flag ricomposizione)*
- `7662` — _percorsoNascondiPeso *(in fase di massa il peso non si mostra al paziente)*
- `7673` — _traguardoFaseCorrente *(traguardo della fase IN CORSO, non quello lontano)*
- `7701` — _traguardoTestoPaziente *(righe in italiano semplice, riusate dal messaggio WhatsApp)*
- `7734` — _vistaPazienteHtml *(i tre riquadri che guarda il paziente)*
- `7814` — _percorsoChartSvg *(due corsie: peso + massa magra + cono proiezione sopra, striscia aderenza in mezzo (solo con dati P50), energia (kcal) sotto — tutto gated dagli interruttori)*
- `8003` — renderPdPercorso *(scheda: badge fase, riga proiezione/obiettivo, riga Piano vs Realtà (solo con dati), toolbar interruttori, grafico, editor)*

*(Tappa 2 tocca anche `calcolaMacros`: box obiettivo con intervallo al posto della data secca.)*

---

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 8872-9043

- `8872` — salvaAggiustamento
- `8905` — eliminaAggiustamento
- `8914` — renderPdNote
- `8949` — salvaNotaClinica
- `8964` — deleteNota
- `8973` — saveNote
- `8993` — resetSemaforoAuto *(F9 — pulsante 🔄 Ricalcola: pulisce gli automatici e rifà col sistema valido; il motore LEGACY non esiste più)*
- `9043` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 9284-9482

- `9284` — avviaFX
- `9312` — avviaAnalisi
- `9329` — _renderFlussoPanel
- `9373` — _riepEsc
- `9377` — _riepNum
- `9383` — _riepDelta
- `9391` — _riepDataSig
- `9409` — _riepParseFX
- `8087` — clean
- `9423` — _riepAggiornaFX
- `9449` — _riepToggleDomandaDefault
- `9461` — _riepAddDomanda
- `9474` — _riepRemoveDomanda
- `9482` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 9694-9937

- `8218` — dCol
- `8336` — card
- `9694` — renderPdRagionamento
- `9782` — inviaMessaggioRag
- `9800` — concludiERiassumi
- `9814` — salvaRagionamento
- `9835` — apriGeneratoreDaRag
- `9843` — nuovaSessioneRag
- `9849` — cancellaSavedRag
- `9859` — renderPazTimeline
- `9896` — renderPdAnamnesi
- `9937` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 11885-13020

- `11885` — _anNorm *(P125 — testo confrontabile: minuscole, niente accenti)*
- `11891` — _anCorrisponde *(P125 — ricerca per parole-prefisso: "vit d" trova "Vitamina D")*
- `11897` — filtraAnalisi *(P125 — filtro dal vivo delle 119 voci)*
- `11931` — pulisciRicercaAnalisi
- `11937` — renderPdAnalisi
- `11993` — toggleAnalisiSection
- `12142` — loadAnalisiSanguePDF
- `12029` — _impPdfConfigurata
- `12030` — _impPdfLib
- `12040` — _impPdfApri
- `12053` — _impPdfPagina *(P124b — una pagina del PDF → immagine, con la rotazione RILEVATA, non quella dichiarata dal file)*
- `12074` — _impRuotaImmagine
- `12099` — _impRilevaRotazione *(P124b — chiamata piccola: di quanti gradi va girata la pagina)*
- `12118` — _impPromptPagina *(P124b — prompt di UNA pagina, con l'impronta della riga: valore+unità+riferimento)*
- `12317` — _impNormalizzaNumero *(P124 — numero all'italiana → punto decimale, conversione fatta dall'app e non dall'AI)*
- `12328` — _impNumeri
- `12336` — _impSembraIntervallo
- `12344` — _impUgualeAlRange
- `12353` — _impLimitiStd
- `12374` — _impFuoriScala
- `12383` — _impCorrezioneVirgola
- `12395` — _impTestoLimiti
- `12416` — _impRifPlausibile *(P124b — un "riferimento" che è un'unità di misura = riga disallineata)*
- `12429` — _impUnitaCanonica
- `12451` — _impStessaGrandezza *(P124b — stesso tipo di misura a meno del prefisso: nanomoli/micromoli/millimoli)*
- `12468` — _impUnitaCompatibili
- `12479` — _impControllaValore *(P124 — i controlli anti-errore su un valore estratto)*
- `12543` — mostraDiffAnalisi *(P124 — colonna Estratto modificabile + righe sospette deselezionate)*
- `12733` — _calcoloIncluso
- `12739` — toggleCalcoloIncluso
- `12761` — _renderCalcoliPannello
- `12802` — toggleGlossario
- `12807` — updateAnalisi
- `12866` — salvaAnalisi
- `12879` — applicaGruppoClinico
- `12908` — renderBoxGruppiCliniciSuggeriti
- `12940` — suggerisciGruppiClinici
- `13020` — renderMemoriaInbody

---
### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9176 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `10067` — _richVal
- `10074` — _richBmi
- `10079` — _richPat
- `10085` — _richNum
- `10130` — _richPreselezione
- `10146` — richLeggiIntestazione
- `10150` — richSalvaIntestazione
- `10159` — apriRichiestaAnalisi
- `10179` — _richModaleHtml
- `10255` — _richEsc
- `10257` — _richMotivoCambia
- `10263` — _richToggleSez
- `10269` — _richAggiornaConteggi
- `10277` — _richMotivoCorrente
- `10287` — _richSelezione
- `10302` — _richTxt
- `10308` — _richCostruisciPDF
- `8969` — nuovaPagina
- `8970` — spazio
- `10404` — _richNomeFile
- `10409` — _richPrepara
- `10422` — _richRegistra
- `10427` — _richStato
- `10429` — richScaricaPDF
- `10478` — _richUpload
- `10480` — _richWaUrl
- `10487` — _richTestoWa
- `10501` — richInviaWhatsApp
- `10541` — richCopiaLink
- `10562` — _richStoricoHtml

---
### REFERTI DEL SANGUE DATATI — storico nel tempo (P118 tappa 1)
Righe 9194-9387 — migrazione, ordinamento, quadro attuale derivato, barra di selezione.

- `11662` — _refertoNuovoId
- `11665` — _refertoOggi
- `11669` — _refertoDataIt
- `11675` — _refertoConteggio
- `11689` — _refertiMigra
- `11716` — _refertiOrdinati
- `11727` — _refertoPiuRecente
- `11732` — _refertoInVista
- `11750` — _refertiApplica
- `11763` — _refertoCrea
- `11782` — refertoCambiaVista
- `11788` — refertoCambiaData
- `11800` — refertoNuovo
- `11808` — refertoDuplica
- `11817` — refertoElimina
- `11832` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `11275` — _rangeNum
- `11281` — _rangeTestoDa
- `11300` — _rangeCoppia
- `11310` — _rangeHtml

---
### ANDAMENTO NEL TEMPO — tracciato, variazione, grafico grande (P118 tappa 3)
Righe 9441-9745 — serie storica, regola del colore, sparkline, pannello in fondo.

- `11352` — _andLimiti
- `11373` — _andParseRangeLab
- `11386` — _andDistanza
- `11393` — _andValutazione
- `11406` — _andSerie
- `11420` — _andNum
- `11424` — _andDataBreve
- `11429` — _andMeseAnno
- `11437` — _andDominio
- `11451` — _andColore
- `11464` — _andSparkHtml
- `11490` — _andRigaHtml
- `11512` — _andEsamiSeguibili
- `11520` — andScegliEsame
- `11526` — _andPannelloHtml
- `11579` — _andGraficoGrande
- `11630` — _andPasso

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 13070-14418

- `13070` — _ibFmtBreve
- `13079` — _renderPesiIntermediSection
- `13128` — aggiungiPesoIntermedio
- `13144` — eliminaPesoIntermedio
- `13154` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `14418` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 14726-14726

- `14726` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 15107-18167

- `15107` — aggiornaLabelMacros
- `15125` — calcolaMacros
- `15266` — applicaSchema
- `15301` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `15307` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `15329` — _misuraDaReferto *(P127 — UN referto letto con le regole del traguardo: usata anche dalla verifica al controllo)*
- `15362` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `15373` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `15391` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `15504` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `15518` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `15574` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `15588` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `15620` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `15653` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `15695` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `15703` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `15714` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `15741` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `15756` — _stradeVerso *(le strade complete + percentuale libera)*
- `15803` — _VC_TOLLERANZA_PCT / _VC_GIORNI_MIN / _VC_GIORNI_MIN_RITARO / _VC_COPERTURA_MIN_PCT / _VC_MAGRA_PRUDENZA_GG *(P127 — soglie cliniche della verifica)*
- `15813` — _mediaSlotPrescritta *(media pesata sui giorni di un campo dello storico target; la usa anche _kcalMediaPrescrittaOss)*
- `15833` — _vcDeficitSlot *(deficit di uno slot: campo offset o kcal−tdee per gli slot vecchi)*
- `15841` — _vcTratto *(P127 — cosa è cambiato fra due referti, previsto vs reale, TDEE misurato)*
- `15895` — _vcTraguardoSalvato *(traguardo ricostruito dal salvato, per la scheda Percorso)*
- `15905` — _verificaControllo *(P127 — motore puro: tratto recente, quadro dall'inizio, residuo al ritmo reale)*
- `15943` — _verificaControlloHtml *(blocco 🔎, unica fonte per pannello 🎯 e scheda Percorso; azioni solo dove c'è il campo kcal)*
- `16035` — _vcRitara *(scrive le kcal ritarate nel campo regime: propone, non salva)*
- `16048` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `16116` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `16138` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `16191` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `16298` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `16313` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `16338` — _renderRifPesoBox
- `16389` — _usaRifPeso
- `16393` — _aggiornaRifPesoTarget
- `16396` — _aggiornaRegimeSlider
- `17053` — _presetRegime
- `17057` — _initRegimeSliderDaPaziente
- `16633` — ricalcolaLAF
- `17213` — renderStoricoTDEE
- `17255` — attivaSlotTDEE
- `17272` — eliminaSlotTDEE
- `17285` — _toggleCiclizzazione
- `17291` — _aggiornaAnteprimaCiclizzazione
- `17309` — salvaCalcoloMacros
- `17624` — _metAllenamento
- `17863` — _neatFrazione
- `17982` — _larnLafStileVita
- `17999` — _regimeOffset
- `18009` — _componiRegimeText
- `18042` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `18054` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `18061` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `18167` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 18185-18629

- `18185` — renderTargetBadge
- `17819` — verificaRegola_75_20_5
- `17856` — renderBadge75_20_5
- `18330` — _validaNorm
- `18333` — _validaMatchTermine
- `18341` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `18392` — _validaTesto
- `18413` — validaPiano
- `18487` — _validaFirmaBlocchi
- `18494` — renderBadgeValidatore
- `18525` — _validaVaiAlGiorno
- `18534` — apriPannelloValidatore
- `13472` — esc
- `18591` — _validaEseguiOverride
- `18614` — validaGateExport
- `18629` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 18762-19394

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
- `18762` — pianoPazSelezionato
- `18909` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `19147` — renderPanelMacrosGiorno
- `19290` — pmgCambiaGrammi
- `19317` — riapriPiano
- `19355` — _montaPianoCorrente
- `19394` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 19404-19878

- `19404` — pullTemplateSupabase
- `19415` — delTemplateSupabase
- `19424` — _promptTemplateNome
- `19449` — _creaTemplateDaJSON
- `19472` — salvaComeTemplate
- `19483` — salvaComeTemplateDaPiano
- `19492` — _normNomeAlim
- `19493` — _escRegAlim
- `19494` — _raccogliAlimentiDaPiano
- `19505` — _alimentiEsclusiPaziente
- `19517` — _trovaConflittiTemplate
- `19535` — _mostraAvvisoConflitti
- `19559` — applicaTemplate
- `19577` — apriPickerTemplate
- `19605` — _pickPaziente
- `19629` — applicaTemplatePick
- `19633` — rinominaTemplate
- `19644` — eliminaTemplate
- `19654` — renderLibreriaTemplate
- `19683` — renderStoricoPiani
- `19742` — eliminaPiano
- `19758` — _getActiveMacrosTarget
- `19782` — getTargetAttivi
- `19819` — calcolaTargetsCiclizzazione
- `19845` — _setupPianoTargets
- `19869` — getStagioneCorrente
- `19878` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 20349-20349

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `20349` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 20358-20817

- `20358` — aggiornaUIcolazione
- `20368` — salvaRegolePiano
- `20429` — _isModelloSistema
- `20432` — _isModelloSistemaModificato
- `20444` — caricaModelliCustomLocal
- `20458` — salvaModelliCustomLocal
- `20479` — _migraRecordCustom
- `20494` — _syncAliasLegacy
- `20503` — caricaAlimentiCustom
- `20527` — pushAlimentiCustomSupabase
- `20537` — pullAlimentiCustomSupabase
- `20551` — pushModelliSupabase
- `20569` — pullModelliSupabase
- `20594` — _calcolaFreqDaModello
- `20613` — aggiornaUImodello
- `20702` — popolaDropdownModelli
- `20730` — cambiaModelloRotazione
- `20736` — ripristinaModelloOriginale
- `20759` — eliminaModelloCustom
- `20777` — mostraAnteprimaModello
- `20787` — apriEditorModello
- `20817` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 21086-21324

- `15738` — rerender
- `21086` — _salvaModelloDaEditor
- `21128` — caricaRegolePiano
- `21158` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `21193` — _aiLogUsage
- `21215` — _aiProxyUrl
- `21221` — _aiTokenPerProxy
- `21250` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `21324` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 21403-21543

- `16216` — _risolviCollisioniCelle
- `21403` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `21463` — getFruttaStile
- `21470` — _fruttaGetPasto
- `21480` — _fruttaContaRigheRicetta
- `21484` — _fruttaIndiceBasePasto
- `21504` — getFruttaMarker
- `21517` — fruttaMarkerHtml
- `21525` — _fruttaCheckboxHtml
- `21534` — toggleFrutta
- `21543` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 21579-22853

- `21579` — _renderCelleGriglia
- `21659` — _renderRicetteTestuali
- `21698` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `21769` — _renderCelleHtml
- `21777` — toggleCellaMenu
- `21796` — closeAllCellaMenus
- `21804` — _trovaPasto
- `21812` — cellaSposta
- `21866` — cellaCancella
- `21887` — apriEditGrammatura
- `16789` — salva
- `21935` — cellaSwap
- `21955` — cellaRimuoviAlt
- `21969` — cellaAggiungiAlt
- `22072` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `22157` — apriEditRicetta
- `22166` — aggiungiRicetta
- `22182` — rimuoviRicetta
- `22191` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `22353` — ngAggiungiSpuntinoVuoto
- `22369` — apriAggiungiCella
- `17254` — risolviCompatibili
- `22465` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `22557` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `22698` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `22853` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 22901-23293

- `22901` — _attesoStrutturaPiano
- `22921` — _confrontaStrutturaPiano
- `22951` — _costruisciPromptDelta
- `22978` — _pianoToolSchema
- `23053` — _pianoMaxTokens
- `23062` — _estraiPianoDaRisposta
- `23084` — chiamaGeneraPiano
- `23251` — mostraLoadingSteps
- `18123` — render
- `23293` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 23360-23937

- `23360` — generaMessaggioAI
- `23465` — copiaMessaggioAI
- `23475` — salvaInStorico
- `23487` — salvaVarianteAI
- `23502` — renderVariantiSalvate
- `23521` — usaVariante
- `23539` — eliminaVariante
- `23550` — renderStoricoMsg
- `23566` — apriWhatsApp
- `23937` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 24115-25612

- `24115` — _ngColoreSemaforoNome
- `24123` — apriSceltaModalitaPiano
- `24158` — _ngChiudiModalita
- `24161` — _ngCostruisciGiornoVuoto
- `24194` — _ngCostruisciGiornoSpeciale
- `24205` — _ngIndiceInizioSpeciali
- `24216` — _ngModalitaNomeGiorno
- `24222` — _ngImpostaModalitaNomeGiorno
- `24225` — _ngLettera
- `24232` — _ngEtichettaGiorno
- `24252` — _ngEtichettaGiornoBreve
- `24266` — _ngToggleGiornoSpeciale
- `24290` — _ngRenderPannelloSpeciale
- `24358` — _generaGiornoSpecialeAI
- `24458` — _ngGiornoHaContenuto
- `24470` — _ngCreaPianoManuale
- `24493` — _ngScrollTabGiorni
- `24503` — _ngAbilitaDragScroll
- `24540` — _ngCambiaNumeroGiorni
- `24572` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `24586` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `24627` — _ngToggleCat
- `24636` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `24660` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `24816` — _ngSalvaPianoManuale
- `24842` — _ngParseIngrediente
- `24866` — _ngScomponiIngredienti
- `24878` — _ricCalcolaMacroDaIngredienti
- `24896` — _ricRicalcolaMacroLive
- `24903` — _ricAggiornaInfoMacro
- `24917` — _ricRicalcolaMacroLiveNow
- `24941` — _ngTrovaCategoriaAlimento
- `24974` — _ngPescaRicetta
- `25017` — _ngScomponiRicettaNelPasto
- `25054` — _ngDragStart
- `25065` — _ngDragStartCella
- `25076` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `25083` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `25088` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `25107` — _ngAggiungiAlimento
- `25132` — _ngRimuoviAlimento
- `25146` — _ngDopoModifica
- `25164` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `25217` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `25246` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `25263` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `25271` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `25343` — gramTestoCasalingo
- `25369` — _appendToggleNutrizionali
- `25412` — _appendTogglePromemoria
- `25441` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `25587` — cpFromEmoji
- `25593` — getEmojiCp
- `25612` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `23587` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `23609` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `23614` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `23640` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `23728` — _spesaTestoWhatsApp
- `23744` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `23789` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `23812` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `23840` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `23900` — scaricaListaSpesaPDF (download diretto, un click)
- `23908` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `23920` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 26760-26760

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
- `26760` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 26774-26986

- `26774` — salvaInbody
- `26844` — delInbody
- `26851` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `26986` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 27014-27497

- `27014` — buildSemLegenda
- `27028` — renderAlEditor
- `27103` — _alimNomeRegex
- `27111` — _alimGiorniDaPiano
- `27119` — _scanGiorniPerNome
- `27134` — scanRiferimentiAlimento
- `27163` — _alimRefsRighe
- `27169` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `27257` — modificaAlimentoCustom
- `27277` — ripristinaValoriPrecedentiAlimento
- `27289` — _resetAlimModal
- `27300` — apriNuovoAlimentoCustom
- `27306` — salvaAlimentoCustom
- `27373` — eliminaAlimentoCustom
- `27404` — _alimFonteBadge
- `27409` — renderAlimentiPage
- `22217` — E
- `27479` — archiviaAlimentoCustom
- `27497` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 27524-27972

- `27524` — _bcSetStatus
- `27526` — apriScannerBarcode
- `27534` — chiudiScannerBarcode
- `27539` — _bcStopCamera
- `27547` — _bcModaleAperto
- `27549` — _bcAvviaCamera
- `27560` — _bcAvviaNativo
- `27580` — _bcAvviaZXing
- `27589` — _bcZXStart
- `27600` — _bcErroreCamera
- `27608` — cercaBarcodeManuale
- `27614` — _barcodeTrovato
- `27630` — cercaBarcodeOFF
- `27648` — _bcProdottoNonTrovato
- `27662` — _bcPrecompilaForm
- `22477` — num
- `27686` — togAl
- `27739` — selCatAl
- `25402` — selTuttiAl
- `27804` — _appIdAnag  (P140 T1)
- `27814` — _appSyncPaz  (P140 T1)
- `27858` — _appSpecchioInverso  (P140 T2)
- `27884` — _appRitiraSpecchio  (P140 T2)
- `27915` — _appAncoraTappe  (P140 T2)
- `27934` — _appTappe  (P140 T2)
- `27955` — _appMigraPaziente  (P140 T1)
- `27965` — _appMigraTutti  (P140 T1)
- `27972` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 27988-28457

- `27988` — setCalView
- `27998` — calPrev
- `27999` — calNext
- `28000` — calToday
- `28002` — renderCal
- `28016` — renderCalMonth
- `28043` — renderCalWeek
- `28076` — renderCalDay
- `28127` — selGiorno
- `28141` — setDisp
- `28146` — openAddEvento
- `28159` — openAddEventoPaz
- `28165` — toggleEntrataCheck
- `28170` — salvaEvento
- `28212` — _evTestoPromemoria  (P140 T1)
- `28218` — openEvDetail
- `28273` — delEvento
- `28295` — copyMsg
- `28307` — aggDateCal
- `27020` — syncInizio
- `27021` — syncControllo
- `28320` — aggiornaPrev
- `28345` — apriEventoDaScheda  (P140 T2)
- `28359` — _appAggiornaOreScheda  (P140 T2)
- `28376` — renderRic
- `28403` — openNuovaRic
- `28404` — editRic
- `28414` — salvaRic
- `28439` — delRic
- `28457` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 28543-28603

- `28543` — aggiungiEntrataPerPaziente
- `28560` — openNuovaEntrata
- `28574` — salvaEntrata
- `28595` — delEntrata
- `28603` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 28633-29258

- `28633` — aiSuggerisciRicetta
- `28678` — renderConcettiModal
- `28697` — apriConcettiModal
- `28724` — salvaConcettiAllegati
- `28748` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `28786` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `28929` — loadInbodyPDF
- `29050` — _vitdLabel
- `29054` — getIntegratori
- `29058` — getIntegraWant
- `29071` — _chiaviSpuntate *(P148 — risolve le etichette salvate in chiavi, regola 21)*
- `29079` — setIntegratori
- `29096` — setIntegraWant
- `29135` — getPatologieChip
- `29136` — getAllergieChip
- `29137` — setPatologieChip
- `29138` — setAllergieChip
- `29139` — getPatologie
- `29140` — getAllergie
- `29141` — setPatologieFromStr
- `29148` — setAllergieFromStr
- `29161` — getSdvChip
- `29162` — getCspChip
- `29163` — setSdvChip
- `29164` — setCspChip
- `29165` — setSdvFromStr
- `29166` — setCspFromStr
- `29170` — getBudget
- `29171` — setBudget
- `29176` — renderCalAnno
- `29207` — comprimeImmagine
- `29229` — uploadImmagineConcetto
- `29248` — rimuoviImmagineConcetto
- `29258` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 29324-29408

- `29324` — entraSelConcetti
- `29325` — annullaSelConcetti
- `29326` — toggleConcettoSel
- `29331` — eliminaConcettiSelezionati
- `29350` — confermaEliminaConcetti
- `29365` — aiRiscriviConcetto
- `29379` — editConcetto
- `29397` — salvaConcetto
- `29408` — openNuovoConcetto
- `27519` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 29445-29445

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
- `29445` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 29557-29882

- `29557` — renderScadenzeAlert
- `29817` — _scadGestiti  (P144)
- `29827` — _scadPota  (P144)
- `29842` — _scadMigraDaLocalStorage  (P144)
- `29865` — segnaGestito
- `29882` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 29891-29966

- `29891` — ripristinaPaz
- `29899` — eliminaPaz
- `29944` — getDove
- `29948` — setDove
- `29966` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 29971-30409

- `29971` — getCredenzialiPersistenti
- `29984` — cancellaCredenzialiPersistenti
- `29989` — rinnovaSessioneConRefreshToken
- `30006` — getSessioneSalvata
- `30025` — salvaSessione
- `30035` — cancellaSessione
- `30039` — eseguiLogin
- `30086` — eseguiLogout
- `30108` — mostraApp
- `30113` — verificaSessioneEAvvia
- `30141` — assicuraTokenValido
- `30170` — _garantiscoSessionePerSync
- `30182` — avviaRinnovoTokenPeriodico
- `30186` — fermaRinnovoTokenPeriodico
- `30195` — _authReset
- `30200` — _authMostra
- `30203` — mostraLogin
- `30204` — mostraRegistrazione
- `30205` — mostraRecupero
- `30206` — mostraNuovaPassword
- `30209` — eseguiRegistrazione
- `30247` — eseguiRecuperoPassword
- `30276` — eseguiNuovaPassword
- `30310` — _parseHashParams
- `30317` — _pulisciHash
- `30321` — gestisciRitornoAuth
- `30409` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 30481-30582

- `30481` — apriPannelloRicette
- `30510` — chiudiPannelloRicette
- `30518` — applicaRicettaPasto
- `30554` — inizializzaP2
- `30566` — deepClone
- `30143` — applicaPatch
- `30582` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
