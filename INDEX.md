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
**Ultimo rigenero automatico: 5 agosto 2026** (audit al contrario: correzione `selCatAl`, rinomina `verificaRegola_70_25_10`, ricette di sistema eliminabili, rimozione `applicaPatch`; poi P148 tappa 1: `_macrosCella`, `pastoMaxPerMacro`, `pastoMaxPerMacroTuttiIGiorni`; poi P148 tappa 2: `CATALOGO_INTEGRATORI` e i cinque helper di risoluzione etichette; poi P148 tappa 3: `renderCaselleIntegratori`, `mostraInfoIntegratore`, `_infoIntegratoreHtml`) — lo script ha corretto **2793 voci** in totale nella giornata; i range "Righe A-B" di sezione NON sono stati ricalcolati in questa passata (restano quelli del 26 lug, indicativi). Righe totali file: 30764.

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
Righe 5571-8714

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
- `8401` — renderPdRoutine
- `6723` — cardHTML
- `8543` — updateRoutineCampo
- `8551` — suggerisciPastoEQuando
- `8578` — filtroLibreria
- `8587` — renderLibreriaGrid
- `8608` — aggiungiDaLibreriaIdx
- `8632` — openModalRoutine
- `8639` — salvaRoutineVoce
- `8664` — salvaRoutine
- `8671` — mostraRoutinePopup
- `8699` — removeRoutineVoce
- `8714` — _renderAggiustamentiSection

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
Righe 8799-8970

- `8799` — salvaAggiustamento
- `8832` — eliminaAggiustamento
- `8841` — renderPdNote
- `8876` — salvaNotaClinica
- `8891` — deleteNota
- `8900` — saveNote
- `8920` — resetSemaforoAuto *(F9 — pulsante 🔄 Ricalcola: pulisce gli automatici e rifà col sistema valido; il motore LEGACY non esiste più)*
- `8970` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 9211-9409

- `9211` — avviaFX
- `9239` — avviaAnalisi
- `9256` — _renderFlussoPanel
- `9300` — _riepEsc
- `9304` — _riepNum
- `9310` — _riepDelta
- `9318` — _riepDataSig
- `9336` — _riepParseFX
- `8087` — clean
- `9350` — _riepAggiornaFX
- `9376` — _riepToggleDomandaDefault
- `9388` — _riepAddDomanda
- `9401` — _riepRemoveDomanda
- `9409` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 9621-9864

- `8218` — dCol
- `8336` — card
- `9621` — renderPdRagionamento
- `9709` — inviaMessaggioRag
- `9727` — concludiERiassumi
- `9741` — salvaRagionamento
- `9762` — apriGeneratoreDaRag
- `9770` — nuovaSessioneRag
- `9776` — cancellaSavedRag
- `9786` — renderPazTimeline
- `9823` — renderPdAnamnesi
- `9864` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 11812-12947

- `11812` — _anNorm *(P125 — testo confrontabile: minuscole, niente accenti)*
- `11818` — _anCorrisponde *(P125 — ricerca per parole-prefisso: "vit d" trova "Vitamina D")*
- `11824` — filtraAnalisi *(P125 — filtro dal vivo delle 119 voci)*
- `11858` — pulisciRicercaAnalisi
- `11864` — renderPdAnalisi
- `11920` — toggleAnalisiSection
- `12069` — loadAnalisiSanguePDF
- `11956` — _impPdfConfigurata
- `11957` — _impPdfLib
- `11967` — _impPdfApri
- `11980` — _impPdfPagina *(P124b — una pagina del PDF → immagine, con la rotazione RILEVATA, non quella dichiarata dal file)*
- `12001` — _impRuotaImmagine
- `12026` — _impRilevaRotazione *(P124b — chiamata piccola: di quanti gradi va girata la pagina)*
- `12045` — _impPromptPagina *(P124b — prompt di UNA pagina, con l'impronta della riga: valore+unità+riferimento)*
- `12244` — _impNormalizzaNumero *(P124 — numero all'italiana → punto decimale, conversione fatta dall'app e non dall'AI)*
- `12255` — _impNumeri
- `12263` — _impSembraIntervallo
- `12271` — _impUgualeAlRange
- `12280` — _impLimitiStd
- `12301` — _impFuoriScala
- `12310` — _impCorrezioneVirgola
- `12322` — _impTestoLimiti
- `12343` — _impRifPlausibile *(P124b — un "riferimento" che è un'unità di misura = riga disallineata)*
- `12356` — _impUnitaCanonica
- `12378` — _impStessaGrandezza *(P124b — stesso tipo di misura a meno del prefisso: nanomoli/micromoli/millimoli)*
- `12395` — _impUnitaCompatibili
- `12406` — _impControllaValore *(P124 — i controlli anti-errore su un valore estratto)*
- `12470` — mostraDiffAnalisi *(P124 — colonna Estratto modificabile + righe sospette deselezionate)*
- `12660` — _calcoloIncluso
- `12666` — toggleCalcoloIncluso
- `12688` — _renderCalcoliPannello
- `12729` — toggleGlossario
- `12734` — updateAnalisi
- `12793` — salvaAnalisi
- `12806` — applicaGruppoClinico
- `12835` — renderBoxGruppiCliniciSuggeriti
- `12867` — suggerisciGruppiClinici
- `12947` — renderMemoriaInbody

---
### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9176 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `9994` — _richVal
- `10001` — _richBmi
- `10006` — _richPat
- `10012` — _richNum
- `10057` — _richPreselezione
- `10073` — richLeggiIntestazione
- `10077` — richSalvaIntestazione
- `10086` — apriRichiestaAnalisi
- `10106` — _richModaleHtml
- `10182` — _richEsc
- `10184` — _richMotivoCambia
- `10190` — _richToggleSez
- `10196` — _richAggiornaConteggi
- `10204` — _richMotivoCorrente
- `10214` — _richSelezione
- `10229` — _richTxt
- `10235` — _richCostruisciPDF
- `8969` — nuovaPagina
- `8970` — spazio
- `10331` — _richNomeFile
- `10336` — _richPrepara
- `10349` — _richRegistra
- `10354` — _richStato
- `10356` — richScaricaPDF
- `10405` — _richUpload
- `10407` — _richWaUrl
- `10414` — _richTestoWa
- `10428` — richInviaWhatsApp
- `10468` — richCopiaLink
- `10489` — _richStoricoHtml

---
### REFERTI DEL SANGUE DATATI — storico nel tempo (P118 tappa 1)
Righe 9194-9387 — migrazione, ordinamento, quadro attuale derivato, barra di selezione.

- `11589` — _refertoNuovoId
- `11592` — _refertoOggi
- `11596` — _refertoDataIt
- `11602` — _refertoConteggio
- `11616` — _refertiMigra
- `11643` — _refertiOrdinati
- `11654` — _refertoPiuRecente
- `11659` — _refertoInVista
- `11677` — _refertiApplica
- `11690` — _refertoCrea
- `11709` — refertoCambiaVista
- `11715` — refertoCambiaData
- `11727` — refertoNuovo
- `11735` — refertoDuplica
- `11744` — refertoElimina
- `11759` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `11202` — _rangeNum
- `11208` — _rangeTestoDa
- `11227` — _rangeCoppia
- `11237` — _rangeHtml

---
### ANDAMENTO NEL TEMPO — tracciato, variazione, grafico grande (P118 tappa 3)
Righe 9441-9745 — serie storica, regola del colore, sparkline, pannello in fondo.

- `11279` — _andLimiti
- `11300` — _andParseRangeLab
- `11313` — _andDistanza
- `11320` — _andValutazione
- `11333` — _andSerie
- `11347` — _andNum
- `11351` — _andDataBreve
- `11356` — _andMeseAnno
- `11364` — _andDominio
- `11378` — _andColore
- `11391` — _andSparkHtml
- `11417` — _andRigaHtml
- `11439` — _andEsamiSeguibili
- `11447` — andScegliEsame
- `11453` — _andPannelloHtml
- `11506` — _andGraficoGrande
- `11557` — _andPasso

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 12997-14345

- `12997` — _ibFmtBreve
- `13006` — _renderPesiIntermediSection
- `13055` — aggiungiPesoIntermedio
- `13071` — eliminaPesoIntermedio
- `13081` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `14345` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 14653-14653

- `14653` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 15034-18094

- `15034` — aggiornaLabelMacros
- `15052` — calcolaMacros
- `15193` — applicaSchema
- `15228` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `15234` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `15256` — _misuraDaReferto *(P127 — UN referto letto con le regole del traguardo: usata anche dalla verifica al controllo)*
- `15289` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `15300` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `15318` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `15431` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `15445` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `15501` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `15515` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `15547` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `15580` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `15622` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `15630` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `15641` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `15668` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `15683` — _stradeVerso *(le strade complete + percentuale libera)*
- `15730` — _VC_TOLLERANZA_PCT / _VC_GIORNI_MIN / _VC_GIORNI_MIN_RITARO / _VC_COPERTURA_MIN_PCT / _VC_MAGRA_PRUDENZA_GG *(P127 — soglie cliniche della verifica)*
- `15740` — _mediaSlotPrescritta *(media pesata sui giorni di un campo dello storico target; la usa anche _kcalMediaPrescrittaOss)*
- `15760` — _vcDeficitSlot *(deficit di uno slot: campo offset o kcal−tdee per gli slot vecchi)*
- `15768` — _vcTratto *(P127 — cosa è cambiato fra due referti, previsto vs reale, TDEE misurato)*
- `15822` — _vcTraguardoSalvato *(traguardo ricostruito dal salvato, per la scheda Percorso)*
- `15832` — _verificaControllo *(P127 — motore puro: tratto recente, quadro dall'inizio, residuo al ritmo reale)*
- `15870` — _verificaControlloHtml *(blocco 🔎, unica fonte per pannello 🎯 e scheda Percorso; azioni solo dove c'è il campo kcal)*
- `15962` — _vcRitara *(scrive le kcal ritarate nel campo regime: propone, non salva)*
- `15975` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `16043` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `16065` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `16118` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `16225` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `16240` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `16265` — _renderRifPesoBox
- `16316` — _usaRifPeso
- `16320` — _aggiornaRifPesoTarget
- `16323` — _aggiornaRegimeSlider
- `16980` — _presetRegime
- `16984` — _initRegimeSliderDaPaziente
- `16633` — ricalcolaLAF
- `17140` — renderStoricoTDEE
- `17182` — attivaSlotTDEE
- `17199` — eliminaSlotTDEE
- `17212` — _toggleCiclizzazione
- `17218` — _aggiornaAnteprimaCiclizzazione
- `17236` — salvaCalcoloMacros
- `17551` — _metAllenamento
- `17790` — _neatFrazione
- `17909` — _larnLafStileVita
- `17926` — _regimeOffset
- `17936` — _componiRegimeText
- `17969` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `17981` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `17988` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `18094` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 18112-18556

- `18112` — renderTargetBadge
- `17819` — verificaRegola_75_20_5
- `17856` — renderBadge75_20_5
- `18257` — _validaNorm
- `18260` — _validaMatchTermine
- `18268` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `18319` — _validaTesto
- `18340` — validaPiano
- `18414` — _validaFirmaBlocchi
- `18421` — renderBadgeValidatore
- `18452` — _validaVaiAlGiorno
- `18461` — apriPannelloValidatore
- `13472` — esc
- `18518` — _validaEseguiOverride
- `18541` — validaGateExport
- `18556` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 18689-19321

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
- `18689` — pianoPazSelezionato
- `18836` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `19074` — renderPanelMacrosGiorno
- `19217` — pmgCambiaGrammi
- `19244` — riapriPiano
- `19282` — _montaPianoCorrente
- `19321` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 19331-19805

- `19331` — pullTemplateSupabase
- `19342` — delTemplateSupabase
- `19351` — _promptTemplateNome
- `19376` — _creaTemplateDaJSON
- `19399` — salvaComeTemplate
- `19410` — salvaComeTemplateDaPiano
- `19419` — _normNomeAlim
- `19420` — _escRegAlim
- `19421` — _raccogliAlimentiDaPiano
- `19432` — _alimentiEsclusiPaziente
- `19444` — _trovaConflittiTemplate
- `19462` — _mostraAvvisoConflitti
- `19486` — applicaTemplate
- `19504` — apriPickerTemplate
- `19532` — _pickPaziente
- `19556` — applicaTemplatePick
- `19560` — rinominaTemplate
- `19571` — eliminaTemplate
- `19581` — renderLibreriaTemplate
- `19610` — renderStoricoPiani
- `19669` — eliminaPiano
- `19685` — _getActiveMacrosTarget
- `19709` — getTargetAttivi
- `19746` — calcolaTargetsCiclizzazione
- `19772` — _setupPianoTargets
- `19796` — getStagioneCorrente
- `19805` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 20276-20276

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `20276` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 20285-20744

- `20285` — aggiornaUIcolazione
- `20295` — salvaRegolePiano
- `20356` — _isModelloSistema
- `20359` — _isModelloSistemaModificato
- `20371` — caricaModelliCustomLocal
- `20385` — salvaModelliCustomLocal
- `20406` — _migraRecordCustom
- `20421` — _syncAliasLegacy
- `20430` — caricaAlimentiCustom
- `20454` — pushAlimentiCustomSupabase
- `20464` — pullAlimentiCustomSupabase
- `20478` — pushModelliSupabase
- `20496` — pullModelliSupabase
- `20521` — _calcolaFreqDaModello
- `20540` — aggiornaUImodello
- `20629` — popolaDropdownModelli
- `20657` — cambiaModelloRotazione
- `20663` — ripristinaModelloOriginale
- `20686` — eliminaModelloCustom
- `20704` — mostraAnteprimaModello
- `20714` — apriEditorModello
- `20744` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 21013-21251

- `15738` — rerender
- `21013` — _salvaModelloDaEditor
- `21055` — caricaRegolePiano
- `21085` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `21120` — _aiLogUsage
- `21142` — _aiProxyUrl
- `21148` — _aiTokenPerProxy
- `21177` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `21251` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 21330-21470

- `16216` — _risolviCollisioniCelle
- `21330` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `21390` — getFruttaStile
- `21397` — _fruttaGetPasto
- `21407` — _fruttaContaRigheRicetta
- `21411` — _fruttaIndiceBasePasto
- `21431` — getFruttaMarker
- `21444` — fruttaMarkerHtml
- `21452` — _fruttaCheckboxHtml
- `21461` — toggleFrutta
- `21470` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 21506-22780

- `21506` — _renderCelleGriglia
- `21586` — _renderRicetteTestuali
- `21625` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `21696` — _renderCelleHtml
- `21704` — toggleCellaMenu
- `21723` — closeAllCellaMenus
- `21731` — _trovaPasto
- `21739` — cellaSposta
- `21793` — cellaCancella
- `21814` — apriEditGrammatura
- `16789` — salva
- `21862` — cellaSwap
- `21882` — cellaRimuoviAlt
- `21896` — cellaAggiungiAlt
- `21999` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `22084` — apriEditRicetta
- `22093` — aggiungiRicetta
- `22109` — rimuoviRicetta
- `22118` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `22280` — ngAggiungiSpuntinoVuoto
- `22296` — apriAggiungiCella
- `17254` — risolviCompatibili
- `22392` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `22484` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `22625` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `22780` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 22828-23220

- `22828` — _attesoStrutturaPiano
- `22848` — _confrontaStrutturaPiano
- `22878` — _costruisciPromptDelta
- `22905` — _pianoToolSchema
- `22980` — _pianoMaxTokens
- `22989` — _estraiPianoDaRisposta
- `23011` — chiamaGeneraPiano
- `23178` — mostraLoadingSteps
- `18123` — render
- `23220` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 23287-23864

- `23287` — generaMessaggioAI
- `23392` — copiaMessaggioAI
- `23402` — salvaInStorico
- `23414` — salvaVarianteAI
- `23429` — renderVariantiSalvate
- `23448` — usaVariante
- `23466` — eliminaVariante
- `23477` — renderStoricoMsg
- `23493` — apriWhatsApp
- `23864` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 24042-25539

- `24042` — _ngColoreSemaforoNome
- `24050` — apriSceltaModalitaPiano
- `24085` — _ngChiudiModalita
- `24088` — _ngCostruisciGiornoVuoto
- `24121` — _ngCostruisciGiornoSpeciale
- `24132` — _ngIndiceInizioSpeciali
- `24143` — _ngModalitaNomeGiorno
- `24149` — _ngImpostaModalitaNomeGiorno
- `24152` — _ngLettera
- `24159` — _ngEtichettaGiorno
- `24179` — _ngEtichettaGiornoBreve
- `24193` — _ngToggleGiornoSpeciale
- `24217` — _ngRenderPannelloSpeciale
- `24285` — _generaGiornoSpecialeAI
- `24385` — _ngGiornoHaContenuto
- `24397` — _ngCreaPianoManuale
- `24420` — _ngScrollTabGiorni
- `24430` — _ngAbilitaDragScroll
- `24467` — _ngCambiaNumeroGiorni
- `24499` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `24513` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `24554` — _ngToggleCat
- `24563` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `24587` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `24743` — _ngSalvaPianoManuale
- `24769` — _ngParseIngrediente
- `24793` — _ngScomponiIngredienti
- `24805` — _ricCalcolaMacroDaIngredienti
- `24823` — _ricRicalcolaMacroLive
- `24830` — _ricAggiornaInfoMacro
- `24844` — _ricRicalcolaMacroLiveNow
- `24868` — _ngTrovaCategoriaAlimento
- `24901` — _ngPescaRicetta
- `24944` — _ngScomponiRicettaNelPasto
- `24981` — _ngDragStart
- `24992` — _ngDragStartCella
- `25003` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `25010` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `25015` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `25034` — _ngAggiungiAlimento
- `25059` — _ngRimuoviAlimento
- `25073` — _ngDopoModifica
- `25091` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `25144` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `25173` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `25190` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `25198` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `25270` — gramTestoCasalingo
- `25296` — _appendToggleNutrizionali
- `25339` — _appendTogglePromemoria
- `25368` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `25514` — cpFromEmoji
- `25520` — getEmojiCp
- `25539` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `23514` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `23536` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `23541` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `23567` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `23655` — _spesaTestoWhatsApp
- `23671` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `23716` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `23739` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `23767` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `23827` — scaricaListaSpesaPDF (download diretto, un click)
- `23835` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `23847` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 26687-26687

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
- `26687` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 26701-26913

- `26701` — salvaInbody
- `26771` — delInbody
- `26778` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `26913` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 26941-27424

- `26941` — buildSemLegenda
- `26955` — renderAlEditor
- `27030` — _alimNomeRegex
- `27038` — _alimGiorniDaPiano
- `27046` — _scanGiorniPerNome
- `27061` — scanRiferimentiAlimento
- `27090` — _alimRefsRighe
- `27096` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `27184` — modificaAlimentoCustom
- `27204` — ripristinaValoriPrecedentiAlimento
- `27216` — _resetAlimModal
- `27227` — apriNuovoAlimentoCustom
- `27233` — salvaAlimentoCustom
- `27300` — eliminaAlimentoCustom
- `27331` — _alimFonteBadge
- `27336` — renderAlimentiPage
- `22217` — E
- `27406` — archiviaAlimentoCustom
- `27424` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 27451-27899

- `27451` — _bcSetStatus
- `27453` — apriScannerBarcode
- `27461` — chiudiScannerBarcode
- `27466` — _bcStopCamera
- `27474` — _bcModaleAperto
- `27476` — _bcAvviaCamera
- `27487` — _bcAvviaNativo
- `27507` — _bcAvviaZXing
- `27516` — _bcZXStart
- `27527` — _bcErroreCamera
- `27535` — cercaBarcodeManuale
- `27541` — _barcodeTrovato
- `27557` — cercaBarcodeOFF
- `27575` — _bcProdottoNonTrovato
- `27589` — _bcPrecompilaForm
- `22477` — num
- `27613` — togAl
- `27666` — selCatAl
- `25402` — selTuttiAl
- `27731` — _appIdAnag  (P140 T1)
- `27741` — _appSyncPaz  (P140 T1)
- `27785` — _appSpecchioInverso  (P140 T2)
- `27811` — _appRitiraSpecchio  (P140 T2)
- `27842` — _appAncoraTappe  (P140 T2)
- `27861` — _appTappe  (P140 T2)
- `27882` — _appMigraPaziente  (P140 T1)
- `27892` — _appMigraTutti  (P140 T1)
- `27899` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 27915-28384

- `27915` — setCalView
- `27925` — calPrev
- `27926` — calNext
- `27927` — calToday
- `27929` — renderCal
- `27943` — renderCalMonth
- `27970` — renderCalWeek
- `28003` — renderCalDay
- `28054` — selGiorno
- `28068` — setDisp
- `28073` — openAddEvento
- `28086` — openAddEventoPaz
- `28092` — toggleEntrataCheck
- `28097` — salvaEvento
- `28139` — _evTestoPromemoria  (P140 T1)
- `28145` — openEvDetail
- `28200` — delEvento
- `28222` — copyMsg
- `28234` — aggDateCal
- `27020` — syncInizio
- `27021` — syncControllo
- `28247` — aggiornaPrev
- `28272` — apriEventoDaScheda  (P140 T2)
- `28286` — _appAggiornaOreScheda  (P140 T2)
- `28303` — renderRic
- `28330` — openNuovaRic
- `28331` — editRic
- `28341` — salvaRic
- `28366` — delRic
- `28384` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 28470-28530

- `28470` — aggiungiEntrataPerPaziente
- `28487` — openNuovaEntrata
- `28501` — salvaEntrata
- `28522` — delEntrata
- `28530` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 28560-29275

- `28560` — aiSuggerisciRicetta
- `28605` — renderConcettiModal
- `28624` — apriConcettiModal
- `28651` — salvaConcettiAllegati
- `28675` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `28713` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `28856` — loadInbodyPDF
- `28977` — _vitdLabel
- `28981` — getIntegratori
- `28985` — getIntegraWant
- `28998` — _chiaviSpuntate *(P148 — risolve le etichette salvate in chiavi, regola 21)*
- `29006` — setIntegratori
- `29023` — setIntegraWant
- `29051` — _infoIntegratoreHtml *(P148 — contenuto del pannello ⓘ)*
- `29079` — mostraInfoIntegratore *(P148 — apre/chiude il pannello sotto la griglia)*
- `29091` — renderCaselleIntegratori *(P148 — genera le caselle dal catalogo; va chiamata PRIMA di setIntegratori, altrimenti le spunte non trovano gli elementi)*
- `29152` — getPatologieChip
- `29153` — getAllergieChip
- `29154` — setPatologieChip
- `29155` — setAllergieChip
- `29156` — getPatologie
- `29157` — getAllergie
- `29158` — setPatologieFromStr
- `29165` — setAllergieFromStr
- `29178` — getSdvChip
- `29179` — getCspChip
- `29180` — setSdvChip
- `29181` — setCspChip
- `29182` — setSdvFromStr
- `29183` — setCspFromStr
- `29187` — getBudget
- `29188` — setBudget
- `29193` — renderCalAnno
- `29224` — comprimeImmagine
- `29246` — uploadImmagineConcetto
- `29265` — rimuoviImmagineConcetto
- `29275` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 29341-29425

- `29341` — entraSelConcetti
- `29342` — annullaSelConcetti
- `29343` — toggleConcettoSel
- `29348` — eliminaConcettiSelezionati
- `29367` — confermaEliminaConcetti
- `29382` — aiRiscriviConcetto
- `29396` — editConcetto
- `29414` — salvaConcetto
- `29425` — openNuovoConcetto
- `27519` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 29462-29462

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
- `29462` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 29574-29899

- `29574` — renderScadenzeAlert
- `29834` — _scadGestiti  (P144)
- `29844` — _scadPota  (P144)
- `29859` — _scadMigraDaLocalStorage  (P144)
- `29882` — segnaGestito
- `29899` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 29908-29983

- `29908` — ripristinaPaz
- `29916` — eliminaPaz
- `29961` — getDove
- `29965` — setDove
- `29983` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 29988-30426

- `29988` — getCredenzialiPersistenti
- `30001` — cancellaCredenzialiPersistenti
- `30006` — rinnovaSessioneConRefreshToken
- `30023` — getSessioneSalvata
- `30042` — salvaSessione
- `30052` — cancellaSessione
- `30056` — eseguiLogin
- `30103` — eseguiLogout
- `30125` — mostraApp
- `30130` — verificaSessioneEAvvia
- `30158` — assicuraTokenValido
- `30187` — _garantiscoSessionePerSync
- `30199` — avviaRinnovoTokenPeriodico
- `30203` — fermaRinnovoTokenPeriodico
- `30212` — _authReset
- `30217` — _authMostra
- `30220` — mostraLogin
- `30221` — mostraRegistrazione
- `30222` — mostraRecupero
- `30223` — mostraNuovaPassword
- `30226` — eseguiRegistrazione
- `30264` — eseguiRecuperoPassword
- `30293` — eseguiNuovaPassword
- `30327` — _parseHashParams
- `30334` — _pulisciHash
- `30338` — gestisciRitornoAuth
- `30426` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 30498-30599

- `30498` — apriPannelloRicette
- `30527` — chiudiPannelloRicette
- `30535` — applicaRicettaPasto
- `30571` — inizializzaP2
- `30583` — deepClone
- `30143` — applicaPatch
- `30599` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
