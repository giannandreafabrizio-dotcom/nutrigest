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
Righe 2478-2754

- `2478` — getValoriCREA
- `2490` — getCurrentPaziente
- `2525` — getKcalWeekend
- `2580` — getMacrosRicettaComposta
- `2586` — calcolaMacrosPiano
- `2688` — renderBadgeMacrosReali
- `2611` — pctStr
- `2612` — color
- `2625` — row
- `2754` — renderBadgeMacrosReali_DOM

---

### ANALISI DEL SANGUE — parsing, indici clinici derivati, interpretazione
Righe 3039-3246

- `3039` — _parseAnalisiNum
- `3047` — calcolaIndice
- `3220` — interpretaAnalisi
- `3232` — _interpAnalisiHtml
- `3246` — mostraInfoRange

---

### CONCETTI EDUCATIVI — sync Supabase, migrazione
Righe 3393-3417

- `3393` — pushConcetiSupabase
- `3403` — pullConcetiSupabase
- `3417` — migraConcetti

---

### ALIMENTI — categorie funzionali/semaforo, chip UI, equivalenze porzioni
Righe 3607-3974

- `3607` — getCategoriaSemaforo
- `3624` — _getCategorieGruppo
- `3638` — calcolaGrammaturaEquivalente
- `3690` — _gruppoEquiv  (P121: gruppo di equivalenza + criterio per categoria funzionale)
- `3696` — _porzioneStandard  (P121: porzione `g` di database dell'alimento)
- `3711` — suggerisciGrEquivalente  (P121: firma a 3 argomenti, il gruppo si deduce dai due alimenti)
- `3737` — _etichettaCriterio  (P121: ≈carbo / ≈prot / ≈grassi / fissa / porzione)
- `3752` — _promptAlternativeGrassi  (P121: riga del prompt AI generata dal motore)
- `3768` — ricalcolaAlternative  (P121: MOTORE UNICO, unico punto che scrive la grammatura di un'alternativa)
- `3787` — ricalcolaAlternativePiano  (P121: applica il motore a tutte le celle di un piano)
- `3836` — arrotondaGrammatura  (P121: sostituisce arrotondaPorzioneDiscreta — pezzi interi senza tetto / 5g)
- `3846` — getCategoriaFunzionale
- `3886` — catArr
- `3902` — _tagComuniTrova
- `3906` — getTagComuniChip
- `3909` — setTagComuniChip
- `3917` — setCatChips
- `3930` — getStagioniChip
- `3933` — setStagioniChip
- `3940` — getProfiloChip
- `3943` — setProfiloChip
- `3952` — wireChipGroup
- `3963` — wireAttrChipGroups
- `3974` — wireRadioChipGroup

---

### CONFIG / STORAGE LOCALE — cfg, localStorage db, util data/valuta
Righe 4002-4418

- `4002` — getCfg
- `4003` — saveCfgL
- `4004` — getUrl
- `4005` — saveLocal
- `4006` — loadLocal
- `4018` — uid
- `4036` — ymdLoc  (P141)
- `4041` — today
- `4049` — addDays
- `4057` — fData
- `4058` — fEur
- `4060` — getLastSyncText
- `4070` — getSyncColor
- `4077` — aggiornaStatoSync
- `4103` — setSyncStatus
- `4372` — _registraTombstone
- `4380` — _tombstoneAttivi
- `4392` — _fondiTombstones
- `4406` — _mergeTombstonesRemoti *(dal 24/7 legge il meta da `collections`, P74 1d)*
- `4418` — _applicaTombstones
- `4279` — _pazFetchMeta *(P74 1d — solo `collections`)*
- `4300` — _collectionsUpsert *(P74 — scrittura primaria dei 4 meta-record dal cutover 1d)*
- `4322` — _collectionsFetch *(P74 1d — lettura unica dei meta-record)*
- `4345` — _analisiSangueUpsert *(P74 fase 2 — scrittura ombra analisi del sangue, 24/7)*

---

### SYNC SUPABASE — push/pull ricette/pazienti, tombstones, conflitti (P69)
Righe 4442-4827

- `4442` — supaHeaders
- `4456` — pushRicetteSupabase
- `4481` — pullRicetteSupabase
- `4503` — delRicetteSupabase
- `4515` — delPazienteSupabase
- `4530` — pushToSheets
- `4574` — pullFromSheets
- `4653` — syncNow
- `4666` — sincronizzaTutto
- `4360` — stpSet
- `4365` — stpMsg
- `4797` — testConnSupabase
- `4827` — _p68LogSaveAnonimo

---

### SYNC SUPABASE — save paziente, piani/cache piano, entrate, eventi
Righe 4841-5363

- `4841` — save
- `4859` — _pushRigaPerId
- `4892` — _flushDirtyIds
- `4975` — _p69LoadBaseline
- `4978` — _p69StoreBaseline
- `4981` — _p69SetBaseline
- `4985` — _p69DropBaseline
- `4989` — _p69SetBaselineFromRows
- `4995` — _p69NomePaz
- `5000` — _p69InList
- `5008` — _p69RilevaConflitti
- `5044` — _p69DialogoConflitti
- `4738` — chiudi
- `5078` — _p69RisolviRicarica
- `5107` — _p69EsportaLocali
- `5120` — _p69RisolviSovrascrivi
- `5133` — pushPianoSupabase
- `5155` — pullPianiSupabase
- `5171` — delPianoSupabase
- `5187` — delPianiPazienteSupabase
- `5199` — pushCachePianoSupabase
- `5216` — caricaCachePianoSupabase
- `5238` — pushEntrateSupabase
- `5262` — pullEntrateSupabase
- `5276` — delEntrataSupabase
- `5284` — pushEntrataSupabase
- `5295` — pushEventoSupabase
- `5308` — pushEventiSupabase
- `5332` — pullEventiSupabase
- `5352` — delEventoSupabase
- `5363` — _pianoCacheKey

---

### UI GENERALE — config AI key, notifiche, navigazione (goTo/tab/modali)
Righe 5394-5505

- `5394` — _salvaPianoCache
- `5399` — _caricaPianoCache
- `5405` — salvaCfg
- `5406` — testConn
- `5413` — testaAntKey
- `5424` — initAntCard
- `5427` — esporta
- `5428` — importa
- `5433` — goTo
- `5449` — closeM
- `5457` — ngChiudiModale
- `5466` — ngChiudiPopupCoppia
- `5470` — ngAggiungiX
- `5481` — ngUpgradeModali
- `5501` — mTab
- `5502` — aggiornaEta
- `5503` — toggleOrarioNote
- `5504` — pdTab
- `5505` — notif

---

### PAZIENTI — registro: lista/card/kanban, apertura, editing, salvataggio, routine
Righe 5513-8387

- `5513` — getPazView
- `5514` — setPazView
- `5523` — _pazStatoPiano
- `5531` — _pazUrgenzaControllo
- `5546` — _pazBadgePrenotato  (P142)
- `5553` — pazSegnaArrivato  (P142)
- `5559` — _pazStatoTagHtml
- `5576` — _pazAggiornaFiltroRegimi
- `5584` — renderPaz
- `5642` — _renderPazCard
- `5667` — _renderPazLista
- `5694` — _renderPazKanban
- `5732` — openNuovoPaz
- `5759` — editPaz
- `5839` — REGOLE_SEMAFORO_ALIMENTI *(15 condizioni cliniche → grigi/celesti; globale dal 26/7 per essere verificabile dal test)*
- `6286` — _SEM_COLORI_LEGACY / `6105` _SEM_COLORI_AUTO *(F9 — unico vocabolario dei colori automatici)*
- `6291` — NOMI_CONDIZIONE_SEMAFORO *(etichette delle 15 condizioni, usate anche dal riquadro della scheda)*
- `6313` — _semaforoCondizioniAttive *(le condizioni spuntate su un paziente)*
- `6324` — _semaforoMigraPaziente *(F9 — toglie i colori legacy e ricalcola; idempotente)*
- `6335` — _semaforoMigraTutti *(passata su tutti i pazienti in memoria, con conteggio)*
- `6346` — applicaRegoloSemaforo *(dal 26/7 pulisce TUTTI e sei i colori automatici, non solo i suoi due)*
- `6434` — trovaChiaveAlimento *(match esatto sul nome: se non trova, la regola è ignorata in silenzio — vedi test s2-regole-nomi-alimenti)*
- `6458` — _pazNumOPrec *(F7 — campo assente = valore precedente, non azzeramento)*
- `6470` — _pazPreservaCampi *(F5 — l'anagrafica non cancella i campi che il form non gestisce)*
- `6476` — salvaPaz
- `6626` — openPaz
- `8074` — renderPdRoutine
- `6723` — cardHTML
- `8216` — updateRoutineCampo
- `8224` — suggerisciPastoEQuando
- `8251` — filtroLibreria
- `8260` — renderLibreriaGrid
- `8281` — aggiungiDaLibreriaIdx
- `8305` — openModalRoutine
- `8312` — salvaRoutineVoce
- `8337` — salvaRoutine
- `8344` — mostraRoutinePopup
- `8372` — removeRoutineVoce
- `8387` — _renderAggiustamentiSection

---

### 📈 PERCORSO — timeline di periodizzazione (P115 Tappe 1-5 COMPLETE, 24 lug 2026)
Righe 6021-6621 (numeri ESATTI al 24/7 notte, dopo la Tappa 5). ⚠️ Questo blocco (~600 righe) fa slittare tutti i numeri delle sezioni SUCCESSIVE a riga ~6020 rispetto all'ultima rigenerazione completa: per quelle sezioni fare grep di conferma. Rigenerazione completa alla prossima modifica strutturale.

- `6672` — _PERCORSO_TIPI (const: tipi fase, colori, pct default)
- `6679` — _percorsoGet *(normalizza p.percorso, scarta fasi invalide)*
- `6703` — _percorsoIntervalli *(fasi consecutive → date concrete dal/al)*
- `6717` — _percorsoFaseAt *(fase attiva a una data; dal incluso, al escluso)*
- `6726` — _percorsoKcalFase *(pct → kcal indicative via calcolaTDEE)*
- `6749` — _percorsoProiezione *(Tappa 2 — proiezione ibrida teorica/calibrata, cono, obiettivo a intervallo)*
- `6807` — _percorsoDataBreve *(ISO → "12 set")*
- `6824` — _percorsoSerieEnergia *(Tappa 3 — serie introito/TDEE stimato/TDEE osservato per la corsia energia)*
- `6863` — _percorsoSerieMassaMagra *(Tappa 4 — solo InBody: punti {data,m,pg})*
- `6882` — _percorsoConsuntivo *(Tappa 5 — legge p.consuntivo scritto da P50: aderenza, extra kcal, ritardo=extra÷7700, settimane perse; oggi sempre ok:false)*
- `6924` — _PERCORSO_LAYERS_DEFAULT / _percorsoLayersState / _percorsoLayersGet *(Tappa 4 — stato interruttori, SOLO sessione, mai su p)*
- `6929` — percorsoLayerToggle *(Tappa 4 — inverte un solo strato)*
- `6935` — percorsoVistaPreset *(Tappa 4 — preset "tecnica"/"paziente")*
- `6951` — _percorsoPaz *(e a seguire i mutatori percorsoInit/SetInizio/AddFase/UpdFase/DelFase/MoveFase)*
- `7007` — _PERCORSO_MODELLI / _PERCORSO_GEN *(P122 T3 — 4 modelli + regole dei cicli)*
- `7025` — _percorsoGeneraFasi *(P122 T3 — pura: dal traguardo alle fasi, ritmo = quello della proiezione)*
- `7105` — _percorsoModelloSelectHtml
- `7114` — percorsoGeneraDaModello *(propone; conferma prima di sostituire fasi esistenti)*
- `7137` — _percorsoShiftGiorni *(pura: ancora = ultima pesata)*
- `7147` — percorsoRiallinea *(⏩ trasla il piano, riprende dal giorno-fase dell'interruzione)*
- `7174` — _TRG_TIPI / `6744` _TRG_COMPORTAMENTI *(P122 T4 — tipi di traguardo e libreria comportamenti)*
- `7196` — _traguardiGet · `6761` _traguardoValoreAttuale *(valore corrente dai dati esistenti, null se manca)*
- `7235` — _traguardoVerso *(auto: dedotto dalla partenza)* · `6803` _traguardoValuta · `6824` _traguardiValuta
- `7276` — traguardoAdd · `6852` traguardoUpd · `6867` traguardoDel · `6873` traguardoSegna
- `7334` — _COND_TIPI · `6897` _percorsoCondizione *(pura: la fase finisce per soglia — SOLO suggerimento)*
- `7350` — percorsoSetCondizione · `6927` percorsoChiudiFase *(esito fotografato, riapribile)*
- `7384` — _traguardiHtml *(blocco 🏁 in fondo alla scheda Percorso)*
- `7482` — _percorsoVistaPaz / `7049` _percorsoVistaPazAttiva *(P122 T5 — modalità di sessione)*
- `7489` — _percorsoVittorie *(pura: vittorie dall'inizio del percorso + flag ricomposizione)*
- `7527` — _percorsoNascondiPeso *(in fase di massa il peso non si mostra al paziente)*
- `7538` — _traguardoFaseCorrente *(traguardo della fase IN CORSO, non quello lontano)*
- `7566` — _traguardoTestoPaziente *(righe in italiano semplice, riusate dal messaggio WhatsApp)*
- `7599` — _vistaPazienteHtml *(i tre riquadri che guarda il paziente)*
- `7679` — _percorsoChartSvg *(due corsie: peso + massa magra + cono proiezione sopra, striscia aderenza in mezzo (solo con dati P50), energia (kcal) sotto — tutto gated dagli interruttori)*
- `7868` — renderPdPercorso *(scheda: badge fase, riga proiezione/obiettivo, riga Piano vs Realtà (solo con dati), toolbar interruttori, grafico, editor)*

*(Tappa 2 tocca anche `calcolaMacros`: box obiettivo con intervallo al posto della data secca.)*

---

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 8472-8643

- `8472` — salvaAggiustamento
- `8505` — eliminaAggiustamento
- `8514` — renderPdNote
- `8549` — salvaNotaClinica
- `8564` — deleteNota
- `8573` — saveNote
- `8593` — resetSemaforoAuto *(F9 — pulsante 🔄 Ricalcola: pulisce gli automatici e rifà col sistema valido; il motore LEGACY non esiste più)*
- `8643` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 8884-9082

- `8884` — avviaFX
- `8912` — avviaAnalisi
- `8929` — _renderFlussoPanel
- `8973` — _riepEsc
- `8977` — _riepNum
- `8983` — _riepDelta
- `8991` — _riepDataSig
- `9009` — _riepParseFX
- `8087` — clean
- `9023` — _riepAggiornaFX
- `9049` — _riepToggleDomandaDefault
- `9061` — _riepAddDomanda
- `9074` — _riepRemoveDomanda
- `9082` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 9294-9537

- `8218` — dCol
- `8336` — card
- `9294` — renderPdRagionamento
- `9382` — inviaMessaggioRag
- `9400` — concludiERiassumi
- `9414` — salvaRagionamento
- `9435` — apriGeneratoreDaRag
- `9443` — nuovaSessioneRag
- `9449` — cancellaSavedRag
- `9459` — renderPazTimeline
- `9496` — renderPdAnamnesi
- `9537` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 11485-12620

- `11485` — _anNorm *(P125 — testo confrontabile: minuscole, niente accenti)*
- `11491` — _anCorrisponde *(P125 — ricerca per parole-prefisso: "vit d" trova "Vitamina D")*
- `11497` — filtraAnalisi *(P125 — filtro dal vivo delle 119 voci)*
- `11531` — pulisciRicercaAnalisi
- `11537` — renderPdAnalisi
- `11593` — toggleAnalisiSection
- `11742` — loadAnalisiSanguePDF
- `11629` — _impPdfConfigurata
- `11630` — _impPdfLib
- `11640` — _impPdfApri
- `11653` — _impPdfPagina *(P124b — una pagina del PDF → immagine, con la rotazione RILEVATA, non quella dichiarata dal file)*
- `11674` — _impRuotaImmagine
- `11699` — _impRilevaRotazione *(P124b — chiamata piccola: di quanti gradi va girata la pagina)*
- `11718` — _impPromptPagina *(P124b — prompt di UNA pagina, con l'impronta della riga: valore+unità+riferimento)*
- `11917` — _impNormalizzaNumero *(P124 — numero all'italiana → punto decimale, conversione fatta dall'app e non dall'AI)*
- `11928` — _impNumeri
- `11936` — _impSembraIntervallo
- `11944` — _impUgualeAlRange
- `11953` — _impLimitiStd
- `11974` — _impFuoriScala
- `11983` — _impCorrezioneVirgola
- `11995` — _impTestoLimiti
- `12016` — _impRifPlausibile *(P124b — un "riferimento" che è un'unità di misura = riga disallineata)*
- `12029` — _impUnitaCanonica
- `12051` — _impStessaGrandezza *(P124b — stesso tipo di misura a meno del prefisso: nanomoli/micromoli/millimoli)*
- `12068` — _impUnitaCompatibili
- `12079` — _impControllaValore *(P124 — i controlli anti-errore su un valore estratto)*
- `12143` — mostraDiffAnalisi *(P124 — colonna Estratto modificabile + righe sospette deselezionate)*
- `12333` — _calcoloIncluso
- `12339` — toggleCalcoloIncluso
- `12361` — _renderCalcoliPannello
- `12402` — toggleGlossario
- `12407` — updateAnalisi
- `12466` — salvaAnalisi
- `12479` — applicaGruppoClinico
- `12508` — renderBoxGruppiCliniciSuggeriti
- `12540` — suggerisciGruppiClinici
- `12620` — renderMemoriaInbody

---
### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9176 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `9667` — _richVal
- `9674` — _richBmi
- `9679` — _richPat
- `9685` — _richNum
- `9730` — _richPreselezione
- `9746` — richLeggiIntestazione
- `9750` — richSalvaIntestazione
- `9759` — apriRichiestaAnalisi
- `9779` — _richModaleHtml
- `9855` — _richEsc
- `9857` — _richMotivoCambia
- `9863` — _richToggleSez
- `9869` — _richAggiornaConteggi
- `9877` — _richMotivoCorrente
- `9887` — _richSelezione
- `9902` — _richTxt
- `9908` — _richCostruisciPDF
- `8969` — nuovaPagina
- `8970` — spazio
- `10004` — _richNomeFile
- `10009` — _richPrepara
- `10022` — _richRegistra
- `10027` — _richStato
- `10029` — richScaricaPDF
- `10078` — _richUpload
- `10080` — _richWaUrl
- `10087` — _richTestoWa
- `10101` — richInviaWhatsApp
- `10141` — richCopiaLink
- `10162` — _richStoricoHtml

---
### REFERTI DEL SANGUE DATATI — storico nel tempo (P118 tappa 1)
Righe 9194-9387 — migrazione, ordinamento, quadro attuale derivato, barra di selezione.

- `11262` — _refertoNuovoId
- `11265` — _refertoOggi
- `11269` — _refertoDataIt
- `11275` — _refertoConteggio
- `11289` — _refertiMigra
- `11316` — _refertiOrdinati
- `11327` — _refertoPiuRecente
- `11332` — _refertoInVista
- `11350` — _refertiApplica
- `11363` — _refertoCrea
- `11382` — refertoCambiaVista
- `11388` — refertoCambiaData
- `11400` — refertoNuovo
- `11408` — refertoDuplica
- `11417` — refertoElimina
- `11432` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `10875` — _rangeNum
- `10881` — _rangeTestoDa
- `10900` — _rangeCoppia
- `10910` — _rangeHtml

---
### ANDAMENTO NEL TEMPO — tracciato, variazione, grafico grande (P118 tappa 3)
Righe 9441-9745 — serie storica, regola del colore, sparkline, pannello in fondo.

- `10952` — _andLimiti
- `10973` — _andParseRangeLab
- `10986` — _andDistanza
- `10993` — _andValutazione
- `11006` — _andSerie
- `11020` — _andNum
- `11024` — _andDataBreve
- `11029` — _andMeseAnno
- `11037` — _andDominio
- `11051` — _andColore
- `11064` — _andSparkHtml
- `11090` — _andRigaHtml
- `11112` — _andEsamiSeguibili
- `11120` — andScegliEsame
- `11126` — _andPannelloHtml
- `11179` — _andGraficoGrande
- `11230` — _andPasso

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 12670-14018

- `12670` — _ibFmtBreve
- `12679` — _renderPesiIntermediSection
- `12728` — aggiungiPesoIntermedio
- `12744` — eliminaPesoIntermedio
- `12754` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `14018` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 14326-14326

- `14326` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 14707-17767

- `14707` — aggiornaLabelMacros
- `14725` — calcolaMacros
- `14866` — applicaSchema
- `14901` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `14907` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `14929` — _misuraDaReferto *(P127 — UN referto letto con le regole del traguardo: usata anche dalla verifica al controllo)*
- `14962` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `14973` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `14991` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `15104` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `15118` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `15174` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `15188` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `15220` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `15253` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `15295` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `15303` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `15314` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `15341` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `15356` — _stradeVerso *(le strade complete + percentuale libera)*
- `15403` — _VC_TOLLERANZA_PCT / _VC_GIORNI_MIN / _VC_GIORNI_MIN_RITARO / _VC_COPERTURA_MIN_PCT / _VC_MAGRA_PRUDENZA_GG *(P127 — soglie cliniche della verifica)*
- `15413` — _mediaSlotPrescritta *(media pesata sui giorni di un campo dello storico target; la usa anche _kcalMediaPrescrittaOss)*
- `15433` — _vcDeficitSlot *(deficit di uno slot: campo offset o kcal−tdee per gli slot vecchi)*
- `15441` — _vcTratto *(P127 — cosa è cambiato fra due referti, previsto vs reale, TDEE misurato)*
- `15495` — _vcTraguardoSalvato *(traguardo ricostruito dal salvato, per la scheda Percorso)*
- `15505` — _verificaControllo *(P127 — motore puro: tratto recente, quadro dall'inizio, residuo al ritmo reale)*
- `15543` — _verificaControlloHtml *(blocco 🔎, unica fonte per pannello 🎯 e scheda Percorso; azioni solo dove c'è il campo kcal)*
- `15635` — _vcRitara *(scrive le kcal ritarate nel campo regime: propone, non salva)*
- `15648` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `15716` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `15738` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `15791` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `15898` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `15913` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `15938` — _renderRifPesoBox
- `15989` — _usaRifPeso
- `15993` — _aggiornaRifPesoTarget
- `15996` — _aggiornaRegimeSlider
- `16653` — _presetRegime
- `16657` — _initRegimeSliderDaPaziente
- `16633` — ricalcolaLAF
- `16813` — renderStoricoTDEE
- `16855` — attivaSlotTDEE
- `16872` — eliminaSlotTDEE
- `16885` — _toggleCiclizzazione
- `16891` — _aggiornaAnteprimaCiclizzazione
- `16909` — salvaCalcoloMacros
- `17224` — _metAllenamento
- `17463` — _neatFrazione
- `17582` — _larnLafStileVita
- `17599` — _regimeOffset
- `17609` — _componiRegimeText
- `17642` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `17654` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `17661` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `17767` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 17785-18215

- `17785` — renderTargetBadge
- `17814` — verificaRegola_75_20_5
- `17851` — renderBadge75_20_5
- `17916` — _validaNorm
- `17919` — _validaMatchTermine
- `17927` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `17978` — _validaTesto
- `17999` — validaPiano
- `18073` — _validaFirmaBlocchi
- `18080` — renderBadgeValidatore
- `18111` — _validaVaiAlGiorno
- `18120` — apriPannelloValidatore
- `13472` — esc
- `18177` — _validaEseguiOverride
- `18200` — validaGateExport
- `18215` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 18348-18980

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
- `18348` — pianoPazSelezionato
- `18495` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `18733` — renderPanelMacrosGiorno
- `18876` — pmgCambiaGrammi
- `18903` — riapriPiano
- `18941` — _montaPianoCorrente
- `18980` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 18990-19464

- `18990` — pullTemplateSupabase
- `19001` — delTemplateSupabase
- `19010` — _promptTemplateNome
- `19035` — _creaTemplateDaJSON
- `19058` — salvaComeTemplate
- `19069` — salvaComeTemplateDaPiano
- `19078` — _normNomeAlim
- `19079` — _escRegAlim
- `19080` — _raccogliAlimentiDaPiano
- `19091` — _alimentiEsclusiPaziente
- `19103` — _trovaConflittiTemplate
- `19121` — _mostraAvvisoConflitti
- `19145` — applicaTemplate
- `19163` — apriPickerTemplate
- `19191` — _pickPaziente
- `19215` — applicaTemplatePick
- `19219` — rinominaTemplate
- `19230` — eliminaTemplate
- `19240` — renderLibreriaTemplate
- `19269` — renderStoricoPiani
- `19328` — eliminaPiano
- `19344` — _getActiveMacrosTarget
- `19368` — getTargetAttivi
- `19405` — calcolaTargetsCiclizzazione
- `19431` — _setupPianoTargets
- `19455` — getStagioneCorrente
- `19464` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 19935-19935

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `19935` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 19944-20403

- `19944` — aggiornaUIcolazione
- `19954` — salvaRegolePiano
- `20015` — _isModelloSistema
- `20018` — _isModelloSistemaModificato
- `20030` — caricaModelliCustomLocal
- `20044` — salvaModelliCustomLocal
- `20065` — _migraRecordCustom
- `20080` — _syncAliasLegacy
- `20089` — caricaAlimentiCustom
- `20113` — pushAlimentiCustomSupabase
- `20123` — pullAlimentiCustomSupabase
- `20137` — pushModelliSupabase
- `20155` — pullModelliSupabase
- `20180` — _calcolaFreqDaModello
- `20199` — aggiornaUImodello
- `20288` — popolaDropdownModelli
- `20316` — cambiaModelloRotazione
- `20322` — ripristinaModelloOriginale
- `20345` — eliminaModelloCustom
- `20363` — mostraAnteprimaModello
- `20373` — apriEditorModello
- `20403` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 20672-20910

- `15738` — rerender
- `20672` — _salvaModelloDaEditor
- `20714` — caricaRegolePiano
- `20744` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `20779` — _aiLogUsage
- `20801` — _aiProxyUrl
- `20807` — _aiTokenPerProxy
- `20836` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `20910` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 20989-21129

- `16216` — _risolviCollisioniCelle
- `20989` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `21049` — getFruttaStile
- `21056` — _fruttaGetPasto
- `21066` — _fruttaContaRigheRicetta
- `21070` — _fruttaIndiceBasePasto
- `21090` — getFruttaMarker
- `21103` — fruttaMarkerHtml
- `21111` — _fruttaCheckboxHtml
- `21120` — toggleFrutta
- `21129` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 21165-22439

- `21165` — _renderCelleGriglia
- `21245` — _renderRicetteTestuali
- `21284` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `21355` — _renderCelleHtml
- `21363` — toggleCellaMenu
- `21382` — closeAllCellaMenus
- `21390` — _trovaPasto
- `21398` — cellaSposta
- `21452` — cellaCancella
- `21473` — apriEditGrammatura
- `16789` — salva
- `21521` — cellaSwap
- `21541` — cellaRimuoviAlt
- `21555` — cellaAggiungiAlt
- `21658` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `21743` — apriEditRicetta
- `21752` — aggiungiRicetta
- `21768` — rimuoviRicetta
- `21777` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `21939` — ngAggiungiSpuntinoVuoto
- `21955` — apriAggiungiCella
- `17254` — risolviCompatibili
- `22051` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `22143` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `22284` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `22439` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 22487-22879

- `22487` — _attesoStrutturaPiano
- `22507` — _confrontaStrutturaPiano
- `22537` — _costruisciPromptDelta
- `22564` — _pianoToolSchema
- `22639` — _pianoMaxTokens
- `22648` — _estraiPianoDaRisposta
- `22670` — chiamaGeneraPiano
- `22837` — mostraLoadingSteps
- `18123` — render
- `22879` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 22946-23523

- `22946` — generaMessaggioAI
- `23051` — copiaMessaggioAI
- `23061` — salvaInStorico
- `23073` — salvaVarianteAI
- `23088` — renderVariantiSalvate
- `23107` — usaVariante
- `23125` — eliminaVariante
- `23136` — renderStoricoMsg
- `23152` — apriWhatsApp
- `23523` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 23701-25198

- `23701` — _ngColoreSemaforoNome
- `23709` — apriSceltaModalitaPiano
- `23744` — _ngChiudiModalita
- `23747` — _ngCostruisciGiornoVuoto
- `23780` — _ngCostruisciGiornoSpeciale
- `23791` — _ngIndiceInizioSpeciali
- `23802` — _ngModalitaNomeGiorno
- `23808` — _ngImpostaModalitaNomeGiorno
- `23811` — _ngLettera
- `23818` — _ngEtichettaGiorno
- `23838` — _ngEtichettaGiornoBreve
- `23852` — _ngToggleGiornoSpeciale
- `23876` — _ngRenderPannelloSpeciale
- `23944` — _generaGiornoSpecialeAI
- `24044` — _ngGiornoHaContenuto
- `24056` — _ngCreaPianoManuale
- `24079` — _ngScrollTabGiorni
- `24089` — _ngAbilitaDragScroll
- `24126` — _ngCambiaNumeroGiorni
- `24158` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `24172` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `24213` — _ngToggleCat
- `24222` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `24246` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `24402` — _ngSalvaPianoManuale
- `24428` — _ngParseIngrediente
- `24452` — _ngScomponiIngredienti
- `24464` — _ricCalcolaMacroDaIngredienti
- `24482` — _ricRicalcolaMacroLive
- `24489` — _ricAggiornaInfoMacro
- `24503` — _ricRicalcolaMacroLiveNow
- `24527` — _ngTrovaCategoriaAlimento
- `24560` — _ngPescaRicetta
- `24603` — _ngScomponiRicettaNelPasto
- `24640` — _ngDragStart
- `24651` — _ngDragStartCella
- `24662` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `24669` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `24674` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `24693` — _ngAggiungiAlimento
- `24718` — _ngRimuoviAlimento
- `24732` — _ngDopoModifica
- `24750` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `24803` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `24832` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `24849` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `24857` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `24929` — gramTestoCasalingo
- `24955` — _appendToggleNutrizionali
- `24998` — _appendTogglePromemoria
- `25027` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `25173` — cpFromEmoji
- `25179` — getEmojiCp
- `25198` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `23173` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `23195` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `23200` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `23226` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `23314` — _spesaTestoWhatsApp
- `23330` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `23375` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `23398` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `23426` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `23486` — scaricaListaSpesaPDF (download diretto, un click)
- `23494` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `23506` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 26346-26346

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
- `26346` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 26360-26572

- `26360` — salvaInbody
- `26430` — delInbody
- `26437` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `26572` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 26600-27069

- `26600` — buildSemLegenda
- `26614` — renderAlEditor
- `26675` — _alimNomeRegex
- `26683` — _alimGiorniDaPiano
- `26691` — _scanGiorniPerNome
- `26706` — scanRiferimentiAlimento
- `26735` — _alimRefsRighe
- `26741` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `26829` — modificaAlimentoCustom
- `26849` — ripristinaValoriPrecedentiAlimento
- `26861` — _resetAlimModal
- `26872` — apriNuovoAlimentoCustom
- `26878` — salvaAlimentoCustom
- `26945` — eliminaAlimentoCustom
- `26976` — _alimFonteBadge
- `26981` — renderAlimentiPage
- `22217` — E
- `27051` — archiviaAlimentoCustom
- `27069` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 27096-27523

- `27096` — _bcSetStatus
- `27098` — apriScannerBarcode
- `27106` — chiudiScannerBarcode
- `27111` — _bcStopCamera
- `27119` — _bcModaleAperto
- `27121` — _bcAvviaCamera
- `27132` — _bcAvviaNativo
- `27152` — _bcAvviaZXing
- `27161` — _bcZXStart
- `27172` — _bcErroreCamera
- `27180` — cercaBarcodeManuale
- `27186` — _barcodeTrovato
- `27202` — cercaBarcodeOFF
- `27220` — _bcProdottoNonTrovato
- `27234` — _bcPrecompilaForm
- `22477` — num
- `27258` — togAl
- `27311` — selCatAl
- `25402` — selTuttiAl
- `27355` — _appIdAnag  (P140 T1)
- `27365` — _appSyncPaz  (P140 T1)
- `27409` — _appSpecchioInverso  (P140 T2)
- `27435` — _appRitiraSpecchio  (P140 T2)
- `27466` — _appAncoraTappe  (P140 T2)
- `27485` — _appTappe  (P140 T2)
- `27506` — _appMigraPaziente  (P140 T1)
- `27516` — _appMigraTutti  (P140 T1)
- `27523` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 27539-28006

- `27539` — setCalView
- `27549` — calPrev
- `27550` — calNext
- `27551` — calToday
- `27553` — renderCal
- `27567` — renderCalMonth
- `27594` — renderCalWeek
- `27627` — renderCalDay
- `27678` — selGiorno
- `27692` — setDisp
- `27697` — openAddEvento
- `27710` — openAddEventoPaz
- `27716` — toggleEntrataCheck
- `27721` — salvaEvento
- `27763` — _evTestoPromemoria  (P140 T1)
- `27769` — openEvDetail
- `27824` — delEvento
- `27846` — copyMsg
- `27858` — aggDateCal
- `27020` — syncInizio
- `27021` — syncControllo
- `27871` — aggiornaPrev
- `27896` — apriEventoDaScheda  (P140 T2)
- `27910` — _appAggiornaOreScheda  (P140 T2)
- `27927` — renderRic
- `27954` — openNuovaRic
- `27955` — editRic
- `27965` — salvaRic
- `27990` — delRic
- `28006` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 28092-28152

- `28092` — aggiungiEntrataPerPaziente
- `28109` — openNuovaEntrata
- `28123` — salvaEntrata
- `28144` — delEntrata
- `28152` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 28182-28791

- `28182` — aiSuggerisciRicetta
- `28227` — renderConcettiModal
- `28246` — apriConcettiModal
- `28273` — salvaConcettiAllegati
- `28297` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `28335` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `28478` — loadInbodyPDF
- `28601` — _vitdLabel
- `28605` — getIntegratori
- `28609` — getIntegraWant
- `28613` — setIntegratori
- `28630` — setIntegraWant
- `28668` — getPatologieChip
- `28669` — getAllergieChip
- `28670` — setPatologieChip
- `28671` — setAllergieChip
- `28672` — getPatologie
- `28673` — getAllergie
- `28674` — setPatologieFromStr
- `28681` — setAllergieFromStr
- `28694` — getSdvChip
- `28695` — getCspChip
- `28696` — setSdvChip
- `28697` — setCspChip
- `28698` — setSdvFromStr
- `28699` — setCspFromStr
- `28703` — getBudget
- `28704` — setBudget
- `28709` — renderCalAnno
- `28740` — comprimeImmagine
- `28762` — uploadImmagineConcetto
- `28781` — rimuoviImmagineConcetto
- `28791` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 28857-28941

- `28857` — entraSelConcetti
- `28858` — annullaSelConcetti
- `28859` — toggleConcettoSel
- `28864` — eliminaConcettiSelezionati
- `28883` — confermaEliminaConcetti
- `28898` — aiRiscriviConcetto
- `28912` — editConcetto
- `28930` — salvaConcetto
- `28941` — openNuovoConcetto
- `27519` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 28978-28978

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
- `28978` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 29090-29415

- `29090` — renderScadenzeAlert
- `29350` — _scadGestiti  (P144)
- `29360` — _scadPota  (P144)
- `29375` — _scadMigraDaLocalStorage  (P144)
- `29398` — segnaGestito
- `29415` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 29424-29499

- `29424` — ripristinaPaz
- `29432` — eliminaPaz
- `29477` — getDove
- `29481` — setDove
- `29499` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 29504-29942

- `29504` — getCredenzialiPersistenti
- `29517` — cancellaCredenzialiPersistenti
- `29522` — rinnovaSessioneConRefreshToken
- `29539` — getSessioneSalvata
- `29558` — salvaSessione
- `29568` — cancellaSessione
- `29572` — eseguiLogin
- `29619` — eseguiLogout
- `29641` — mostraApp
- `29646` — verificaSessioneEAvvia
- `29674` — assicuraTokenValido
- `29703` — _garantiscoSessionePerSync
- `29715` — avviaRinnovoTokenPeriodico
- `29719` — fermaRinnovoTokenPeriodico
- `29728` — _authReset
- `29733` — _authMostra
- `29736` — mostraLogin
- `29737` — mostraRegistrazione
- `29738` — mostraRecupero
- `29739` — mostraNuovaPassword
- `29742` — eseguiRegistrazione
- `29780` — eseguiRecuperoPassword
- `29809` — eseguiNuovaPassword
- `29843` — _parseHashParams
- `29850` — _pulisciHash
- `29854` — gestisciRitornoAuth
- `29942` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 30014-30137

- `30014` — apriPannelloRicette
- `30043` — chiudiPannelloRicette
- `30051` — applicaRicettaPasto
- `30087` — inizializzaP2
- `30099` — deepClone
- `30103` — applicaPatch
- `30137` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
