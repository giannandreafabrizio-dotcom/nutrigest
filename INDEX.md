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
**Ultimo rigenero automatico: 5 agosto 2026** (audit al contrario: correzione `selCatAl`, rinomina `verificaRegola_70_25_10`, ricette di sistema eliminabili, rimozione `applicaPatch`; poi P148 tappa 1: `_macrosCella`, `pastoMaxPerMacro`, `pastoMaxPerMacroTuttiIGiorni`) — lo script ha corretto **1447 voci** in totale nella giornata; i range "Righe A-B" di sezione NON sono stati ricalcolati in questa passata (restano quelli del 26 lug, indicativi). Righe totali file: 30466.

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
Righe 5648-8522

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
- `8209` — renderPdRoutine
- `6723` — cardHTML
- `8351` — updateRoutineCampo
- `8359` — suggerisciPastoEQuando
- `8386` — filtroLibreria
- `8395` — renderLibreriaGrid
- `8416` — aggiungiDaLibreriaIdx
- `8440` — openModalRoutine
- `8447` — salvaRoutineVoce
- `8472` — salvaRoutine
- `8479` — mostraRoutinePopup
- `8507` — removeRoutineVoce
- `8522` — _renderAggiustamentiSection

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
Righe 8607-8778

- `8607` — salvaAggiustamento
- `8640` — eliminaAggiustamento
- `8649` — renderPdNote
- `8684` — salvaNotaClinica
- `8699` — deleteNota
- `8708` — saveNote
- `8728` — resetSemaforoAuto *(F9 — pulsante 🔄 Ricalcola: pulisce gli automatici e rifà col sistema valido; il motore LEGACY non esiste più)*
- `8778` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 9019-9217

- `9019` — avviaFX
- `9047` — avviaAnalisi
- `9064` — _renderFlussoPanel
- `9108` — _riepEsc
- `9112` — _riepNum
- `9118` — _riepDelta
- `9126` — _riepDataSig
- `9144` — _riepParseFX
- `8087` — clean
- `9158` — _riepAggiornaFX
- `9184` — _riepToggleDomandaDefault
- `9196` — _riepAddDomanda
- `9209` — _riepRemoveDomanda
- `9217` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 9429-9672

- `8218` — dCol
- `8336` — card
- `9429` — renderPdRagionamento
- `9517` — inviaMessaggioRag
- `9535` — concludiERiassumi
- `9549` — salvaRagionamento
- `9570` — apriGeneratoreDaRag
- `9578` — nuovaSessioneRag
- `9584` — cancellaSavedRag
- `9594` — renderPazTimeline
- `9631` — renderPdAnamnesi
- `9672` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 11620-12755

- `11620` — _anNorm *(P125 — testo confrontabile: minuscole, niente accenti)*
- `11626` — _anCorrisponde *(P125 — ricerca per parole-prefisso: "vit d" trova "Vitamina D")*
- `11632` — filtraAnalisi *(P125 — filtro dal vivo delle 119 voci)*
- `11666` — pulisciRicercaAnalisi
- `11672` — renderPdAnalisi
- `11728` — toggleAnalisiSection
- `11877` — loadAnalisiSanguePDF
- `11764` — _impPdfConfigurata
- `11765` — _impPdfLib
- `11775` — _impPdfApri
- `11788` — _impPdfPagina *(P124b — una pagina del PDF → immagine, con la rotazione RILEVATA, non quella dichiarata dal file)*
- `11809` — _impRuotaImmagine
- `11834` — _impRilevaRotazione *(P124b — chiamata piccola: di quanti gradi va girata la pagina)*
- `11853` — _impPromptPagina *(P124b — prompt di UNA pagina, con l'impronta della riga: valore+unità+riferimento)*
- `12052` — _impNormalizzaNumero *(P124 — numero all'italiana → punto decimale, conversione fatta dall'app e non dall'AI)*
- `12063` — _impNumeri
- `12071` — _impSembraIntervallo
- `12079` — _impUgualeAlRange
- `12088` — _impLimitiStd
- `12109` — _impFuoriScala
- `12118` — _impCorrezioneVirgola
- `12130` — _impTestoLimiti
- `12151` — _impRifPlausibile *(P124b — un "riferimento" che è un'unità di misura = riga disallineata)*
- `12164` — _impUnitaCanonica
- `12186` — _impStessaGrandezza *(P124b — stesso tipo di misura a meno del prefisso: nanomoli/micromoli/millimoli)*
- `12203` — _impUnitaCompatibili
- `12214` — _impControllaValore *(P124 — i controlli anti-errore su un valore estratto)*
- `12278` — mostraDiffAnalisi *(P124 — colonna Estratto modificabile + righe sospette deselezionate)*
- `12468` — _calcoloIncluso
- `12474` — toggleCalcoloIncluso
- `12496` — _renderCalcoliPannello
- `12537` — toggleGlossario
- `12542` — updateAnalisi
- `12601` — salvaAnalisi
- `12614` — applicaGruppoClinico
- `12643` — renderBoxGruppiCliniciSuggeriti
- `12675` — suggerisciGruppiClinici
- `12755` — renderMemoriaInbody

---
### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9176 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `9802` — _richVal
- `9809` — _richBmi
- `9814` — _richPat
- `9820` — _richNum
- `9865` — _richPreselezione
- `9881` — richLeggiIntestazione
- `9885` — richSalvaIntestazione
- `9894` — apriRichiestaAnalisi
- `9914` — _richModaleHtml
- `9990` — _richEsc
- `9992` — _richMotivoCambia
- `9998` — _richToggleSez
- `10004` — _richAggiornaConteggi
- `10012` — _richMotivoCorrente
- `10022` — _richSelezione
- `10037` — _richTxt
- `10043` — _richCostruisciPDF
- `8969` — nuovaPagina
- `8970` — spazio
- `10139` — _richNomeFile
- `10144` — _richPrepara
- `10157` — _richRegistra
- `10162` — _richStato
- `10164` — richScaricaPDF
- `10213` — _richUpload
- `10215` — _richWaUrl
- `10222` — _richTestoWa
- `10236` — richInviaWhatsApp
- `10276` — richCopiaLink
- `10297` — _richStoricoHtml

---
### REFERTI DEL SANGUE DATATI — storico nel tempo (P118 tappa 1)
Righe 9194-9387 — migrazione, ordinamento, quadro attuale derivato, barra di selezione.

- `11397` — _refertoNuovoId
- `11400` — _refertoOggi
- `11404` — _refertoDataIt
- `11410` — _refertoConteggio
- `11424` — _refertiMigra
- `11451` — _refertiOrdinati
- `11462` — _refertoPiuRecente
- `11467` — _refertoInVista
- `11485` — _refertiApplica
- `11498` — _refertoCrea
- `11517` — refertoCambiaVista
- `11523` — refertoCambiaData
- `11535` — refertoNuovo
- `11543` — refertoDuplica
- `11552` — refertoElimina
- `11567` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `11010` — _rangeNum
- `11016` — _rangeTestoDa
- `11035` — _rangeCoppia
- `11045` — _rangeHtml

---
### ANDAMENTO NEL TEMPO — tracciato, variazione, grafico grande (P118 tappa 3)
Righe 9441-9745 — serie storica, regola del colore, sparkline, pannello in fondo.

- `11087` — _andLimiti
- `11108` — _andParseRangeLab
- `11121` — _andDistanza
- `11128` — _andValutazione
- `11141` — _andSerie
- `11155` — _andNum
- `11159` — _andDataBreve
- `11164` — _andMeseAnno
- `11172` — _andDominio
- `11186` — _andColore
- `11199` — _andSparkHtml
- `11225` — _andRigaHtml
- `11247` — _andEsamiSeguibili
- `11255` — andScegliEsame
- `11261` — _andPannelloHtml
- `11314` — _andGraficoGrande
- `11365` — _andPasso

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 12805-14153

- `12805` — _ibFmtBreve
- `12814` — _renderPesiIntermediSection
- `12863` — aggiungiPesoIntermedio
- `12879` — eliminaPesoIntermedio
- `12889` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `14153` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 14461-14461

- `14461` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 14842-17902

- `14842` — aggiornaLabelMacros
- `14860` — calcolaMacros
- `15001` — applicaSchema
- `15036` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `15042` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `15064` — _misuraDaReferto *(P127 — UN referto letto con le regole del traguardo: usata anche dalla verifica al controllo)*
- `15097` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `15108` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `15126` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `15239` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `15253` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `15309` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `15323` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `15355` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `15388` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `15430` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `15438` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `15449` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `15476` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `15491` — _stradeVerso *(le strade complete + percentuale libera)*
- `15538` — _VC_TOLLERANZA_PCT / _VC_GIORNI_MIN / _VC_GIORNI_MIN_RITARO / _VC_COPERTURA_MIN_PCT / _VC_MAGRA_PRUDENZA_GG *(P127 — soglie cliniche della verifica)*
- `15548` — _mediaSlotPrescritta *(media pesata sui giorni di un campo dello storico target; la usa anche _kcalMediaPrescrittaOss)*
- `15568` — _vcDeficitSlot *(deficit di uno slot: campo offset o kcal−tdee per gli slot vecchi)*
- `15576` — _vcTratto *(P127 — cosa è cambiato fra due referti, previsto vs reale, TDEE misurato)*
- `15630` — _vcTraguardoSalvato *(traguardo ricostruito dal salvato, per la scheda Percorso)*
- `15640` — _verificaControllo *(P127 — motore puro: tratto recente, quadro dall'inizio, residuo al ritmo reale)*
- `15678` — _verificaControlloHtml *(blocco 🔎, unica fonte per pannello 🎯 e scheda Percorso; azioni solo dove c'è il campo kcal)*
- `15770` — _vcRitara *(scrive le kcal ritarate nel campo regime: propone, non salva)*
- `15783` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `15851` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `15873` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `15926` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `16033` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `16048` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `16073` — _renderRifPesoBox
- `16124` — _usaRifPeso
- `16128` — _aggiornaRifPesoTarget
- `16131` — _aggiornaRegimeSlider
- `16788` — _presetRegime
- `16792` — _initRegimeSliderDaPaziente
- `16633` — ricalcolaLAF
- `16948` — renderStoricoTDEE
- `16990` — attivaSlotTDEE
- `17007` — eliminaSlotTDEE
- `17020` — _toggleCiclizzazione
- `17026` — _aggiornaAnteprimaCiclizzazione
- `17044` — salvaCalcoloMacros
- `17359` — _metAllenamento
- `17598` — _neatFrazione
- `17717` — _larnLafStileVita
- `17734` — _regimeOffset
- `17744` — _componiRegimeText
- `17777` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `17789` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `17796` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `17902` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 17920-18364

- `17920` — renderTargetBadge
- `17819` — verificaRegola_75_20_5
- `17856` — renderBadge75_20_5
- `18065` — _validaNorm
- `18068` — _validaMatchTermine
- `18076` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `18127` — _validaTesto
- `18148` — validaPiano
- `18222` — _validaFirmaBlocchi
- `18229` — renderBadgeValidatore
- `18260` — _validaVaiAlGiorno
- `18269` — apriPannelloValidatore
- `13472` — esc
- `18326` — _validaEseguiOverride
- `18349` — validaGateExport
- `18364` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 18497-19129

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
- `18497` — pianoPazSelezionato
- `18644` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `18882` — renderPanelMacrosGiorno
- `19025` — pmgCambiaGrammi
- `19052` — riapriPiano
- `19090` — _montaPianoCorrente
- `19129` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 19139-19613

- `19139` — pullTemplateSupabase
- `19150` — delTemplateSupabase
- `19159` — _promptTemplateNome
- `19184` — _creaTemplateDaJSON
- `19207` — salvaComeTemplate
- `19218` — salvaComeTemplateDaPiano
- `19227` — _normNomeAlim
- `19228` — _escRegAlim
- `19229` — _raccogliAlimentiDaPiano
- `19240` — _alimentiEsclusiPaziente
- `19252` — _trovaConflittiTemplate
- `19270` — _mostraAvvisoConflitti
- `19294` — applicaTemplate
- `19312` — apriPickerTemplate
- `19340` — _pickPaziente
- `19364` — applicaTemplatePick
- `19368` — rinominaTemplate
- `19379` — eliminaTemplate
- `19389` — renderLibreriaTemplate
- `19418` — renderStoricoPiani
- `19477` — eliminaPiano
- `19493` — _getActiveMacrosTarget
- `19517` — getTargetAttivi
- `19554` — calcolaTargetsCiclizzazione
- `19580` — _setupPianoTargets
- `19604` — getStagioneCorrente
- `19613` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 20084-20084

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `20084` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 20093-20552

- `20093` — aggiornaUIcolazione
- `20103` — salvaRegolePiano
- `20164` — _isModelloSistema
- `20167` — _isModelloSistemaModificato
- `20179` — caricaModelliCustomLocal
- `20193` — salvaModelliCustomLocal
- `20214` — _migraRecordCustom
- `20229` — _syncAliasLegacy
- `20238` — caricaAlimentiCustom
- `20262` — pushAlimentiCustomSupabase
- `20272` — pullAlimentiCustomSupabase
- `20286` — pushModelliSupabase
- `20304` — pullModelliSupabase
- `20329` — _calcolaFreqDaModello
- `20348` — aggiornaUImodello
- `20437` — popolaDropdownModelli
- `20465` — cambiaModelloRotazione
- `20471` — ripristinaModelloOriginale
- `20494` — eliminaModelloCustom
- `20512` — mostraAnteprimaModello
- `20522` — apriEditorModello
- `20552` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 20821-21059

- `15738` — rerender
- `20821` — _salvaModelloDaEditor
- `20863` — caricaRegolePiano
- `20893` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `20928` — _aiLogUsage
- `20950` — _aiProxyUrl
- `20956` — _aiTokenPerProxy
- `20985` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `21059` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 21138-21278

- `16216` — _risolviCollisioniCelle
- `21138` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `21198` — getFruttaStile
- `21205` — _fruttaGetPasto
- `21215` — _fruttaContaRigheRicetta
- `21219` — _fruttaIndiceBasePasto
- `21239` — getFruttaMarker
- `21252` — fruttaMarkerHtml
- `21260` — _fruttaCheckboxHtml
- `21269` — toggleFrutta
- `21278` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 21314-22588

- `21314` — _renderCelleGriglia
- `21394` — _renderRicetteTestuali
- `21433` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `21504` — _renderCelleHtml
- `21512` — toggleCellaMenu
- `21531` — closeAllCellaMenus
- `21539` — _trovaPasto
- `21547` — cellaSposta
- `21601` — cellaCancella
- `21622` — apriEditGrammatura
- `16789` — salva
- `21670` — cellaSwap
- `21690` — cellaRimuoviAlt
- `21704` — cellaAggiungiAlt
- `21807` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `21892` — apriEditRicetta
- `21901` — aggiungiRicetta
- `21917` — rimuoviRicetta
- `21926` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `22088` — ngAggiungiSpuntinoVuoto
- `22104` — apriAggiungiCella
- `17254` — risolviCompatibili
- `22200` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `22292` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `22433` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `22588` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 22636-23028

- `22636` — _attesoStrutturaPiano
- `22656` — _confrontaStrutturaPiano
- `22686` — _costruisciPromptDelta
- `22713` — _pianoToolSchema
- `22788` — _pianoMaxTokens
- `22797` — _estraiPianoDaRisposta
- `22819` — chiamaGeneraPiano
- `22986` — mostraLoadingSteps
- `18123` — render
- `23028` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 23095-23672

- `23095` — generaMessaggioAI
- `23200` — copiaMessaggioAI
- `23210` — salvaInStorico
- `23222` — salvaVarianteAI
- `23237` — renderVariantiSalvate
- `23256` — usaVariante
- `23274` — eliminaVariante
- `23285` — renderStoricoMsg
- `23301` — apriWhatsApp
- `23672` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 23850-25347

- `23850` — _ngColoreSemaforoNome
- `23858` — apriSceltaModalitaPiano
- `23893` — _ngChiudiModalita
- `23896` — _ngCostruisciGiornoVuoto
- `23929` — _ngCostruisciGiornoSpeciale
- `23940` — _ngIndiceInizioSpeciali
- `23951` — _ngModalitaNomeGiorno
- `23957` — _ngImpostaModalitaNomeGiorno
- `23960` — _ngLettera
- `23967` — _ngEtichettaGiorno
- `23987` — _ngEtichettaGiornoBreve
- `24001` — _ngToggleGiornoSpeciale
- `24025` — _ngRenderPannelloSpeciale
- `24093` — _generaGiornoSpecialeAI
- `24193` — _ngGiornoHaContenuto
- `24205` — _ngCreaPianoManuale
- `24228` — _ngScrollTabGiorni
- `24238` — _ngAbilitaDragScroll
- `24275` — _ngCambiaNumeroGiorni
- `24307` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `24321` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `24362` — _ngToggleCat
- `24371` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `24395` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `24551` — _ngSalvaPianoManuale
- `24577` — _ngParseIngrediente
- `24601` — _ngScomponiIngredienti
- `24613` — _ricCalcolaMacroDaIngredienti
- `24631` — _ricRicalcolaMacroLive
- `24638` — _ricAggiornaInfoMacro
- `24652` — _ricRicalcolaMacroLiveNow
- `24676` — _ngTrovaCategoriaAlimento
- `24709` — _ngPescaRicetta
- `24752` — _ngScomponiRicettaNelPasto
- `24789` — _ngDragStart
- `24800` — _ngDragStartCella
- `24811` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `24818` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `24823` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `24842` — _ngAggiungiAlimento
- `24867` — _ngRimuoviAlimento
- `24881` — _ngDopoModifica
- `24899` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `24952` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `24981` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `24998` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `25006` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `25078` — gramTestoCasalingo
- `25104` — _appendToggleNutrizionali
- `25147` — _appendTogglePromemoria
- `25176` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `25322` — cpFromEmoji
- `25328` — getEmojiCp
- `25347` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `23322` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `23344` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `23349` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `23375` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `23463` — _spesaTestoWhatsApp
- `23479` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `23524` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `23547` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `23575` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `23635` — scaricaListaSpesaPDF (download diretto, un click)
- `23643` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `23655` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 26495-26495

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
- `26495` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 26509-26721

- `26509` — salvaInbody
- `26579` — delInbody
- `26586` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `26721` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 26749-27232

- `26749` — buildSemLegenda
- `26763` — renderAlEditor
- `26838` — _alimNomeRegex
- `26846` — _alimGiorniDaPiano
- `26854` — _scanGiorniPerNome
- `26869` — scanRiferimentiAlimento
- `26898` — _alimRefsRighe
- `26904` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `26992` — modificaAlimentoCustom
- `27012` — ripristinaValoriPrecedentiAlimento
- `27024` — _resetAlimModal
- `27035` — apriNuovoAlimentoCustom
- `27041` — salvaAlimentoCustom
- `27108` — eliminaAlimentoCustom
- `27139` — _alimFonteBadge
- `27144` — renderAlimentiPage
- `22217` — E
- `27214` — archiviaAlimentoCustom
- `27232` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 27259-27707

- `27259` — _bcSetStatus
- `27261` — apriScannerBarcode
- `27269` — chiudiScannerBarcode
- `27274` — _bcStopCamera
- `27282` — _bcModaleAperto
- `27284` — _bcAvviaCamera
- `27295` — _bcAvviaNativo
- `27315` — _bcAvviaZXing
- `27324` — _bcZXStart
- `27335` — _bcErroreCamera
- `27343` — cercaBarcodeManuale
- `27349` — _barcodeTrovato
- `27365` — cercaBarcodeOFF
- `27383` — _bcProdottoNonTrovato
- `27397` — _bcPrecompilaForm
- `22477` — num
- `27421` — togAl
- `27474` — selCatAl
- `25402` — selTuttiAl
- `27539` — _appIdAnag  (P140 T1)
- `27549` — _appSyncPaz  (P140 T1)
- `27593` — _appSpecchioInverso  (P140 T2)
- `27619` — _appRitiraSpecchio  (P140 T2)
- `27650` — _appAncoraTappe  (P140 T2)
- `27669` — _appTappe  (P140 T2)
- `27690` — _appMigraPaziente  (P140 T1)
- `27700` — _appMigraTutti  (P140 T1)
- `27707` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 27723-28192

- `27723` — setCalView
- `27733` — calPrev
- `27734` — calNext
- `27735` — calToday
- `27737` — renderCal
- `27751` — renderCalMonth
- `27778` — renderCalWeek
- `27811` — renderCalDay
- `27862` — selGiorno
- `27876` — setDisp
- `27881` — openAddEvento
- `27894` — openAddEventoPaz
- `27900` — toggleEntrataCheck
- `27905` — salvaEvento
- `27947` — _evTestoPromemoria  (P140 T1)
- `27953` — openEvDetail
- `28008` — delEvento
- `28030` — copyMsg
- `28042` — aggDateCal
- `27020` — syncInizio
- `27021` — syncControllo
- `28055` — aggiornaPrev
- `28080` — apriEventoDaScheda  (P140 T2)
- `28094` — _appAggiornaOreScheda  (P140 T2)
- `28111` — renderRic
- `28138` — openNuovaRic
- `28139` — editRic
- `28149` — salvaRic
- `28174` — delRic
- `28192` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 28278-28338

- `28278` — aggiungiEntrataPerPaziente
- `28295` — openNuovaEntrata
- `28309` — salvaEntrata
- `28330` — delEntrata
- `28338` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 28368-28977

- `28368` — aiSuggerisciRicetta
- `28413` — renderConcettiModal
- `28432` — apriConcettiModal
- `28459` — salvaConcettiAllegati
- `28483` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `28521` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `28664` — loadInbodyPDF
- `28787` — _vitdLabel
- `28791` — getIntegratori
- `28795` — getIntegraWant
- `28799` — setIntegratori
- `28816` — setIntegraWant
- `28854` — getPatologieChip
- `28855` — getAllergieChip
- `28856` — setPatologieChip
- `28857` — setAllergieChip
- `28858` — getPatologie
- `28859` — getAllergie
- `28860` — setPatologieFromStr
- `28867` — setAllergieFromStr
- `28880` — getSdvChip
- `28881` — getCspChip
- `28882` — setSdvChip
- `28883` — setCspChip
- `28884` — setSdvFromStr
- `28885` — setCspFromStr
- `28889` — getBudget
- `28890` — setBudget
- `28895` — renderCalAnno
- `28926` — comprimeImmagine
- `28948` — uploadImmagineConcetto
- `28967` — rimuoviImmagineConcetto
- `28977` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 29043-29127

- `29043` — entraSelConcetti
- `29044` — annullaSelConcetti
- `29045` — toggleConcettoSel
- `29050` — eliminaConcettiSelezionati
- `29069` — confermaEliminaConcetti
- `29084` — aiRiscriviConcetto
- `29098` — editConcetto
- `29116` — salvaConcetto
- `29127` — openNuovoConcetto
- `27519` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 29164-29164

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
- `29164` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 29276-29601

- `29276` — renderScadenzeAlert
- `29536` — _scadGestiti  (P144)
- `29546` — _scadPota  (P144)
- `29561` — _scadMigraDaLocalStorage  (P144)
- `29584` — segnaGestito
- `29601` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 29610-29685

- `29610` — ripristinaPaz
- `29618` — eliminaPaz
- `29663` — getDove
- `29667` — setDove
- `29685` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 29690-30128

- `29690` — getCredenzialiPersistenti
- `29703` — cancellaCredenzialiPersistenti
- `29708` — rinnovaSessioneConRefreshToken
- `29725` — getSessioneSalvata
- `29744` — salvaSessione
- `29754` — cancellaSessione
- `29758` — eseguiLogin
- `29805` — eseguiLogout
- `29827` — mostraApp
- `29832` — verificaSessioneEAvvia
- `29860` — assicuraTokenValido
- `29889` — _garantiscoSessionePerSync
- `29901` — avviaRinnovoTokenPeriodico
- `29905` — fermaRinnovoTokenPeriodico
- `29914` — _authReset
- `29919` — _authMostra
- `29922` — mostraLogin
- `29923` — mostraRegistrazione
- `29924` — mostraRecupero
- `29925` — mostraNuovaPassword
- `29928` — eseguiRegistrazione
- `29966` — eseguiRecuperoPassword
- `29995` — eseguiNuovaPassword
- `30029` — _parseHashParams
- `30036` — _pulisciHash
- `30040` — gestisciRitornoAuth
- `30128` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 30200-30301

- `30200` — apriPannelloRicette
- `30229` — chiudiPannelloRicette
- `30237` — applicaRicettaPasto
- `30273` — inizializzaP2
- `30285` — deepClone
- `30143` — applicaPatch
- `30301` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
