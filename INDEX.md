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
Righe 2384-2426

- `2384` — _slugAlimento
- `2392` — _catalogoIndicizza
- `2396` — _catalogoDeindicizza
- `2403` — costruisciCatalogo
- `2426` — risolviAlimento

---

### MACROS PIANO — calcolo e badge macro reali vs target
Righe 2441-2704

- `2441` — getValoriCREA
- `2453` — getCurrentPaziente
- `2473` — getKcalWeekend
- `2530` — getMacrosRicettaComposta
- `2536` — calcolaMacrosPiano
- `2638` — renderBadgeMacrosReali
- `2611` — pctStr
- `2612` — color
- `2625` — row
- `2704` — renderBadgeMacrosReali_DOM

---

### ANALISI DEL SANGUE — parsing, indici clinici derivati, interpretazione
Righe 2989-3176

- `2989` — _parseAnalisiNum
- `2997` — calcolaIndice
- `3150` — interpretaAnalisi
- `3162` — _interpAnalisiHtml
- `3176` — mostraInfoRange

---

### CONCETTI EDUCATIVI — sync Supabase, migrazione
Righe 3319-3343

- `3319` — pushConcetiSupabase
- `3329` — pullConcetiSupabase
- `3343` — migraConcetti

---

### ALIMENTI — categorie funzionali/semaforo, chip UI, equivalenze porzioni
Righe 3533-3888

- `3533` — getCategoriaSemaforo
- `3550` — _getCategorieGruppo
- `3564` — calcolaGrammaturaEquivalente
- `3604` — _gruppoEquiv  (P121: gruppo di equivalenza + criterio per categoria funzionale)
- `3610` — _porzioneStandard  (P121: porzione `g` di database dell'alimento)
- `3625` — suggerisciGrEquivalente  (P121: firma a 3 argomenti, il gruppo si deduce dai due alimenti)
- `3651` — _etichettaCriterio  (P121: ≈carbo / ≈prot / ≈grassi / fissa / porzione)
- `3666` — _promptAlternativeGrassi  (P121: riga del prompt AI generata dal motore)
- `3682` — ricalcolaAlternative  (P121: MOTORE UNICO, unico punto che scrive la grammatura di un'alternativa)
- `3701` — ricalcolaAlternativePiano  (P121: applica il motore a tutte le celle di un piano)
- `3750` — arrotondaGrammatura  (P121: sostituisce arrotondaPorzioneDiscreta — pezzi interi senza tetto / 5g)
- `3760` — getCategoriaFunzionale
- `3800` — catArr
- `3816` — _tagComuniTrova
- `3820` — getTagComuniChip
- `3823` — setTagComuniChip
- `3831` — setCatChips
- `3844` — getStagioniChip
- `3847` — setStagioniChip
- `3854` — getProfiloChip
- `3857` — setProfiloChip
- `3866` — wireChipGroup
- `3877` — wireAttrChipGroups
- `3888` — wireRadioChipGroup

---

### CONFIG / STORAGE LOCALE — cfg, localStorage db, util data/valuta
Righe 3916-4293

- `3916` — getCfg
- `3917` — saveCfgL
- `3918` — getUrl
- `3919` — saveLocal
- `3920` — loadLocal
- `3930` — uid
- `3931` — today
- `3932` — addDays
- `3933` — fData
- `3934` — fEur
- `3936` — getLastSyncText
- `3946` — getSyncColor
- `3954` — aggiornaStatoSync
- `3980` — setSyncStatus
- `4247` — _registraTombstone
- `4255` — _tombstoneAttivi
- `4267` — _fondiTombstones
- `4281` — _mergeTombstonesRemoti *(dal 24/7 legge il meta da `collections`, P74 1d)*
- `4293` — _applicaTombstones
- `4154` — _pazFetchMeta *(P74 1d — solo `collections`)*
- `4175` — _collectionsUpsert *(P74 — scrittura primaria dei 4 meta-record dal cutover 1d)*
- `4197` — _collectionsFetch *(P74 1d — lettura unica dei meta-record)*
- `4220` — _analisiSangueUpsert *(P74 fase 2 — scrittura ombra analisi del sangue, 24/7)*

---

### SYNC SUPABASE — push/pull ricette/pazienti, tombstones, conflitti (P69)
Righe 4317-4702

- `4317` — supaHeaders
- `4331` — pushRicetteSupabase
- `4356` — pullRicetteSupabase
- `4378` — delRicetteSupabase
- `4390` — delPazienteSupabase
- `4405` — pushToSheets
- `4449` — pullFromSheets
- `4528` — syncNow
- `4541` — sincronizzaTutto
- `4360` — stpSet
- `4365` — stpMsg
- `4672` — testConnSupabase
- `4702` — _p68LogSaveAnonimo

---

### SYNC SUPABASE — save paziente, piani/cache piano, entrate, eventi
Righe 4716-5232

- `4716` — save
- `4734` — _pushRigaPerId
- `4767` — _flushDirtyIds
- `4850` — _p69LoadBaseline
- `4853` — _p69StoreBaseline
- `4856` — _p69SetBaseline
- `4860` — _p69DropBaseline
- `4864` — _p69SetBaselineFromRows
- `4870` — _p69NomePaz
- `4875` — _p69InList
- `4883` — _p69RilevaConflitti
- `4919` — _p69DialogoConflitti
- `4738` — chiudi
- `4953` — _p69RisolviRicarica
- `4982` — _p69EsportaLocali
- `4995` — _p69RisolviSovrascrivi
- `5008` — pushPianoSupabase
- `5030` — pullPianiSupabase
- `5046` — delPianoSupabase
- `5062` — delPianiPazienteSupabase
- `5074` — pushCachePianoSupabase
- `5091` — caricaCachePianoSupabase
- `5113` — pushEntrateSupabase
- `5137` — pullEntrateSupabase
- `5151` — delEntrataSupabase
- `5159` — pushEntrataSupabase
- `5170` — pushEventoSupabase
- `5183` — pushEventiSupabase
- `5207` — pullEventiSupabase
- `5221` — delEventoSupabase
- `5232` — _pianoCacheKey

---

### UI GENERALE — config AI key, notifiche, navigazione (goTo/tab/modali)
Righe 5263-5375

- `5263` — _salvaPianoCache
- `5268` — _caricaPianoCache
- `5274` — salvaCfg
- `5275` — testConn
- `5282` — testaAntKey
- `5293` — initAntCard
- `5296` — esporta
- `5297` — importa
- `5302` — goTo
- `5319` — closeM
- `5327` — ngChiudiModale
- `5336` — ngChiudiPopupCoppia
- `5340` — ngAggiungiX
- `5351` — ngUpgradeModali
- `5371` — mTab
- `5372` — aggiornaEta
- `5373` — toggleOrarioNote
- `5374` — pdTab
- `5375` — notif

---

### PAZIENTI — registro: lista/card/kanban, apertura, editing, salvataggio, routine
Righe 5383-8133

- `5383` — getPazView
- `5384` — setPazView
- `5393` — _pazStatoPiano
- `5401` — _pazUrgenzaControllo
- `5408` — _pazStatoTagHtml
- `5417` — _pazAggiornaFiltroRegimi
- `5425` — renderPaz
- `5478` — _renderPazCard
- `5503` — _renderPazLista
- `5530` — _renderPazKanban
- `5568` — openNuovoPaz
- `5594` — editPaz
- `5672` — REGOLE_SEMAFORO_ALIMENTI *(15 condizioni cliniche → grigi/celesti; globale dal 26/7 per essere verificabile dal test)*
- `6104` — _SEM_COLORI_LEGACY / `6105` _SEM_COLORI_AUTO *(F9 — unico vocabolario dei colori automatici)*
- `6109` — NOMI_CONDIZIONE_SEMAFORO *(etichette delle 15 condizioni, usate anche dal riquadro della scheda)*
- `6131` — _semaforoCondizioniAttive *(le condizioni spuntate su un paziente)*
- `6142` — _semaforoMigraPaziente *(F9 — toglie i colori legacy e ricalcola; idempotente)*
- `6153` — _semaforoMigraTutti *(passata su tutti i pazienti in memoria, con conteggio)*
- `6164` — applicaRegoloSemaforo *(dal 26/7 pulisce TUTTI e sei i colori automatici, non solo i suoi due)*
- `6252` — trovaChiaveAlimento *(match esatto sul nome: se non trova, la regola è ignorata in silenzio — vedi test s2-regole-nomi-alimenti)*
- `6276` — _pazNumOPrec *(F7 — campo assente = valore precedente, non azzeramento)*
- `6288` — _pazPreservaCampi *(F5 — l'anagrafica non cancella i campi che il form non gestisce)*
- `6294` — salvaPaz
- `6370` — openPaz
- `7820` — renderPdRoutine
- `6723` — cardHTML
- `7962` — updateRoutineCampo
- `7970` — suggerisciPastoEQuando
- `7997` — filtroLibreria
- `8006` — renderLibreriaGrid
- `8027` — aggiungiDaLibreriaIdx
- `8051` — openModalRoutine
- `8058` — salvaRoutineVoce
- `8083` — salvaRoutine
- `8090` — mostraRoutinePopup
- `8118` — removeRoutineVoce
- `8133` — _renderAggiustamentiSection

---

### 📈 PERCORSO — timeline di periodizzazione (P115 Tappe 1-5 COMPLETE, 24 lug 2026)
Righe 6021-6621 (numeri ESATTI al 24/7 notte, dopo la Tappa 5). ⚠️ Questo blocco (~600 righe) fa slittare tutti i numeri delle sezioni SUCCESSIVE a riga ~6020 rispetto all'ultima rigenerazione completa: per quelle sezioni fare grep di conferma. Rigenerazione completa alla prossima modifica strutturale.

- `6414` — _PERCORSO_TIPI (const: tipi fase, colori, pct default)
- `6421` — _percorsoGet *(normalizza p.percorso, scarta fasi invalide)*
- `6443` — _percorsoIsoLocal *(data → YYYY-MM-DD LOCALE, mai toISOString/UTC)*
- `6449` — _percorsoIntervalli *(fasi consecutive → date concrete dal/al)*
- `6463` — _percorsoFaseAt *(fase attiva a una data; dal incluso, al escluso)*
- `6472` — _percorsoKcalFase *(pct → kcal indicative via calcolaTDEE)*
- `6495` — _percorsoProiezione *(Tappa 2 — proiezione ibrida teorica/calibrata, cono, obiettivo a intervallo)*
- `6553` — _percorsoDataBreve *(ISO → "12 set")*
- `6570` — _percorsoSerieEnergia *(Tappa 3 — serie introito/TDEE stimato/TDEE osservato per la corsia energia)*
- `6609` — _percorsoSerieMassaMagra *(Tappa 4 — solo InBody: punti {data,m,pg})*
- `6628` — _percorsoConsuntivo *(Tappa 5 — legge p.consuntivo scritto da P50: aderenza, extra kcal, ritardo=extra÷7700, settimane perse; oggi sempre ok:false)*
- `6670` — _PERCORSO_LAYERS_DEFAULT / _percorsoLayersState / _percorsoLayersGet *(Tappa 4 — stato interruttori, SOLO sessione, mai su p)*
- `6675` — percorsoLayerToggle *(Tappa 4 — inverte un solo strato)*
- `6681` — percorsoVistaPreset *(Tappa 4 — preset "tecnica"/"paziente")*
- `6697` — _percorsoPaz *(e a seguire i mutatori percorsoInit/SetInizio/AddFase/UpdFase/DelFase/MoveFase)*
- `6753` — _PERCORSO_MODELLI / _PERCORSO_GEN *(P122 T3 — 4 modelli + regole dei cicli)*
- `6771` — _percorsoGeneraFasi *(P122 T3 — pura: dal traguardo alle fasi, ritmo = quello della proiezione)*
- `6851` — _percorsoModelloSelectHtml
- `6860` — percorsoGeneraDaModello *(propone; conferma prima di sostituire fasi esistenti)*
- `6883` — _percorsoShiftGiorni *(pura: ancora = ultima pesata)*
- `6893` — percorsoRiallinea *(⏩ trasla il piano, riprende dal giorno-fase dell'interruzione)*
- `6920` — _TRG_TIPI / `6744` _TRG_COMPORTAMENTI *(P122 T4 — tipi di traguardo e libreria comportamenti)*
- `6942` — _traguardiGet · `6761` _traguardoValoreAttuale *(valore corrente dai dati esistenti, null se manca)*
- `6981` — _traguardoVerso *(auto: dedotto dalla partenza)* · `6803` _traguardoValuta · `6824` _traguardiValuta
- `7022` — traguardoAdd · `6852` traguardoUpd · `6867` traguardoDel · `6873` traguardoSegna
- `7080` — _COND_TIPI · `6897` _percorsoCondizione *(pura: la fase finisce per soglia — SOLO suggerimento)*
- `7096` — percorsoSetCondizione · `6927` percorsoChiudiFase *(esito fotografato, riapribile)*
- `7130` — _traguardiHtml *(blocco 🏁 in fondo alla scheda Percorso)*
- `7228` — _percorsoVistaPaz / `7049` _percorsoVistaPazAttiva *(P122 T5 — modalità di sessione)*
- `7235` — _percorsoVittorie *(pura: vittorie dall'inizio del percorso + flag ricomposizione)*
- `7273` — _percorsoNascondiPeso *(in fase di massa il peso non si mostra al paziente)*
- `7284` — _traguardoFaseCorrente *(traguardo della fase IN CORSO, non quello lontano)*
- `7312` — _traguardoTestoPaziente *(righe in italiano semplice, riusate dal messaggio WhatsApp)*
- `7345` — _vistaPazienteHtml *(i tre riquadri che guarda il paziente)*
- `7425` — _percorsoChartSvg *(due corsie: peso + massa magra + cono proiezione sopra, striscia aderenza in mezzo (solo con dati P50), energia (kcal) sotto — tutto gated dagli interruttori)*
- `7614` — renderPdPercorso *(scheda: badge fase, riga proiezione/obiettivo, riga Piano vs Realtà (solo con dati), toolbar interruttori, grafico, editor)*

*(Tappa 2 tocca anche `calcolaMacros`: box obiettivo con intervallo al posto della data secca.)*

---

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 8218-8389

- `8218` — salvaAggiustamento
- `8251` — eliminaAggiustamento
- `8260` — renderPdNote
- `8295` — salvaNotaClinica
- `8310` — deleteNota
- `8319` — saveNote
- `8339` — resetSemaforoAuto *(F9 — pulsante 🔄 Ricalcola: pulisce gli automatici e rifà col sistema valido; il motore LEGACY non esiste più)*
- `8389` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 8607-8805

- `8607` — avviaFX
- `8635` — avviaAnalisi
- `8652` — _renderFlussoPanel
- `8696` — _riepEsc
- `8700` — _riepNum
- `8706` — _riepDelta
- `8714` — _riepDataSig
- `8732` — _riepParseFX
- `8087` — clean
- `8746` — _riepAggiornaFX
- `8772` — _riepToggleDomandaDefault
- `8784` — _riepAddDomanda
- `8797` — _riepRemoveDomanda
- `8805` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 9017-9243

- `8218` — dCol
- `8336` — card
- `9017` — renderPdRagionamento
- `9105` — inviaMessaggioRag
- `9123` — concludiERiassumi
- `9137` — salvaRagionamento
- `9158` — apriGeneratoreDaRag
- `9166` — nuovaSessioneRag
- `9172` — cancellaSavedRag
- `9182` — renderPazTimeline
- `9214` — renderPdAnamnesi
- `9243` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 10664-11799

- `10664` — _anNorm *(P125 — testo confrontabile: minuscole, niente accenti)*
- `10670` — _anCorrisponde *(P125 — ricerca per parole-prefisso: "vit d" trova "Vitamina D")*
- `10676` — filtraAnalisi *(P125 — filtro dal vivo delle 119 voci)*
- `10710` — pulisciRicercaAnalisi
- `10716` — renderPdAnalisi
- `10772` — toggleAnalisiSection
- `10921` — loadAnalisiSanguePDF
- `10808` — _impPdfConfigurata
- `10809` — _impPdfLib
- `10819` — _impPdfApri
- `10832` — _impPdfPagina *(P124b — una pagina del PDF → immagine, con la rotazione RILEVATA, non quella dichiarata dal file)*
- `10853` — _impRuotaImmagine
- `10878` — _impRilevaRotazione *(P124b — chiamata piccola: di quanti gradi va girata la pagina)*
- `10897` — _impPromptPagina *(P124b — prompt di UNA pagina, con l'impronta della riga: valore+unità+riferimento)*
- `11096` — _impNormalizzaNumero *(P124 — numero all'italiana → punto decimale, conversione fatta dall'app e non dall'AI)*
- `11107` — _impNumeri
- `11115` — _impSembraIntervallo
- `11123` — _impUgualeAlRange
- `11132` — _impLimitiStd
- `11153` — _impFuoriScala
- `11162` — _impCorrezioneVirgola
- `11174` — _impTestoLimiti
- `11195` — _impRifPlausibile *(P124b — un "riferimento" che è un'unità di misura = riga disallineata)*
- `11208` — _impUnitaCanonica
- `11230` — _impStessaGrandezza *(P124b — stesso tipo di misura a meno del prefisso: nanomoli/micromoli/millimoli)*
- `11247` — _impUnitaCompatibili
- `11258` — _impControllaValore *(P124 — i controlli anti-errore su un valore estratto)*
- `11322` — mostraDiffAnalisi *(P124 — colonna Estratto modificabile + righe sospette deselezionate)*
- `11512` — _calcoloIncluso
- `11518` — toggleCalcoloIncluso
- `11540` — _renderCalcoliPannello
- `11581` — toggleGlossario
- `11586` — updateAnalisi
- `11645` — salvaAnalisi
- `11658` — applicaGruppoClinico
- `11687` — renderBoxGruppiCliniciSuggeriti
- `11719` — suggerisciGruppiClinici
- `11799` — renderMemoriaInbody

---
### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9176 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `9373` — _richVal
- `9380` — _richBmi
- `9385` — _richPat
- `9391` — _richNum
- `9436` — _richPreselezione
- `9452` — richLeggiIntestazione
- `9456` — richSalvaIntestazione
- `9465` — apriRichiestaAnalisi
- `9485` — _richModaleHtml
- `9561` — _richEsc
- `9563` — _richMotivoCambia
- `9569` — _richToggleSez
- `9575` — _richAggiornaConteggi
- `9583` — _richMotivoCorrente
- `9593` — _richSelezione
- `9608` — _richTxt
- `9614` — _richCostruisciPDF
- `8969` — nuovaPagina
- `8970` — spazio
- `9710` — _richNomeFile
- `9715` — _richPrepara
- `9725` — _richRegistra
- `9739` — _richStato
- `9741` — richScaricaPDF
- `9756` — _richUpload
- `9784` — _richWaUrl
- `9791` — _richTestoWa
- `9805` — richInviaWhatsApp
- `9845` — richCopiaLink
- `9866` — _richStoricoHtml

---
### REFERTI DEL SANGUE DATATI — storico nel tempo (P118 tappa 1)
Righe 9194-9387 — migrazione, ordinamento, quadro attuale derivato, barra di selezione.

- `10441` — _refertoNuovoId
- `10444` — _refertoOggi
- `10448` — _refertoDataIt
- `10454` — _refertoConteggio
- `10468` — _refertiMigra
- `10495` — _refertiOrdinati
- `10506` — _refertoPiuRecente
- `10511` — _refertoInVista
- `10529` — _refertiApplica
- `10542` — _refertoCrea
- `10561` — refertoCambiaVista
- `10567` — refertoCambiaData
- `10579` — refertoNuovo
- `10587` — refertoDuplica
- `10596` — refertoElimina
- `10611` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `10054` — _rangeNum
- `10060` — _rangeTestoDa
- `10079` — _rangeCoppia
- `10089` — _rangeHtml

---
### ANDAMENTO NEL TEMPO — tracciato, variazione, grafico grande (P118 tappa 3)
Righe 9441-9745 — serie storica, regola del colore, sparkline, pannello in fondo.

- `10131` — _andLimiti
- `10152` — _andParseRangeLab
- `10165` — _andDistanza
- `10172` — _andValutazione
- `10185` — _andSerie
- `10199` — _andNum
- `10203` — _andDataBreve
- `10208` — _andMeseAnno
- `10216` — _andDominio
- `10230` — _andColore
- `10243` — _andSparkHtml
- `10269` — _andRigaHtml
- `10291` — _andEsamiSeguibili
- `10299` — andScegliEsame
- `10305` — _andPannelloHtml
- `10358` — _andGraficoGrande
- `10409` — _andPasso

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 11847-12258

- `11847` — _ibFmtBreve
- `11856` — _renderPesiIntermediSection
- `11905` — aggiungiPesoIntermedio
- `11921` — eliminaPesoIntermedio
- `11931` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `12258` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 12530-12530

- `12530` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 12908-15449

- `12908` — aggiornaLabelMacros
- `12926` — calcolaMacros
- `13067` — applicaSchema
- `13102` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `13108` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `13130` — _misuraDaReferto *(P127 — UN referto letto con le regole del traguardo: usata anche dalla verifica al controllo)*
- `13163` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `13174` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `13192` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `13305` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `13319` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `13375` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `13389` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `13421` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `13454` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `13496` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `13504` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `13515` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `13542` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `13557` — _stradeVerso *(le strade complete + percentuale libera)*
- `13604` — _VC_TOLLERANZA_PCT / _VC_GIORNI_MIN / _VC_GIORNI_MIN_RITARO / _VC_COPERTURA_MIN_PCT / _VC_MAGRA_PRUDENZA_GG *(P127 — soglie cliniche della verifica)*
- `13614` — _mediaSlotPrescritta *(media pesata sui giorni di un campo dello storico target; la usa anche _kcalMediaPrescrittaOss)*
- `13634` — _vcDeficitSlot *(deficit di uno slot: campo offset o kcal−tdee per gli slot vecchi)*
- `13642` — _vcTratto *(P127 — cosa è cambiato fra due referti, previsto vs reale, TDEE misurato)*
- `13696` — _vcTraguardoSalvato *(traguardo ricostruito dal salvato, per la scheda Percorso)*
- `13706` — _verificaControllo *(P127 — motore puro: tratto recente, quadro dall'inizio, residuo al ritmo reale)*
- `13744` — _verificaControlloHtml *(blocco 🔎, unica fonte per pannello 🎯 e scheda Percorso; azioni solo dove c'è il campo kcal)*
- `13836` — _vcRitara *(scrive le kcal ritarate nel campo regime: propone, non salva)*
- `13849` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `13917` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `13939` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `13992` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `14099` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `14114` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `14139` — _renderRifPesoBox
- `14190` — _usaRifPeso
- `14194` — _aggiornaRifPesoTarget
- `14197` — _aggiornaRegimeSlider
- `14854` — _presetRegime
- `14858` — _initRegimeSliderDaPaziente
- `14876` — ricalcolaLAF
- `15010` — renderStoricoTDEE
- `15044` — attivaSlotTDEE
- `15052` — eliminaSlotTDEE
- `15065` — _toggleCiclizzazione
- `15071` — _aggiornaAnteprimaCiclizzazione
- `15089` — salvaCalcoloMacros
- `15203` — _metAllenamento
- `15219` — _neatFrazione
- `15293` — _larnLafStileVita
- `15310` — _regimeOffset
- `15320` — _componiRegimeText
- `15353` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `15365` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `15372` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `15449` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 15467-15897

- `15467` — renderTargetBadge
- `15496` — verificaRegola_75_20_5
- `15533` — renderBadge75_20_5
- `15598` — _validaNorm
- `15601` — _validaMatchTermine
- `15609` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `15660` — _validaTesto
- `15681` — validaPiano
- `15755` — _validaFirmaBlocchi
- `15762` — renderBadgeValidatore
- `15793` — _validaVaiAlGiorno
- `15802` — apriPannelloValidatore
- `13472` — esc
- `15859` — _validaEseguiOverride
- `15882` — validaGateExport
- `15897` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 16030-16662

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
- `16030` — pianoPazSelezionato
- `16177` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `16415` — renderPanelMacrosGiorno
- `16558` — pmgCambiaGrammi
- `16585` — riapriPiano
- `16623` — _montaPianoCorrente
- `16662` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 16672-17141

- `16672` — pullTemplateSupabase
- `16683` — delTemplateSupabase
- `16692` — _promptTemplateNome
- `16717` — _creaTemplateDaJSON
- `16740` — salvaComeTemplate
- `16751` — salvaComeTemplateDaPiano
- `16760` — _normNomeAlim
- `16761` — _escRegAlim
- `16762` — _raccogliAlimentiDaPiano
- `16773` — _alimentiEsclusiPaziente
- `16785` — _trovaConflittiTemplate
- `16803` — _mostraAvvisoConflitti
- `16827` — applicaTemplate
- `16845` — apriPickerTemplate
- `16873` — _pickPaziente
- `16892` — applicaTemplatePick
- `16896` — rinominaTemplate
- `16907` — eliminaTemplate
- `16917` — renderLibreriaTemplate
- `16946` — renderStoricoPiani
- `17005` — eliminaPiano
- `17021` — _getActiveMacrosTarget
- `17045` — getTargetAttivi
- `17082` — calcolaTargetsCiclizzazione
- `17108` — _setupPianoTargets
- `17132` — getStagioneCorrente
- `17141` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 17575-17575

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `17575` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 17584-18043

- `17584` — aggiornaUIcolazione
- `17594` — salvaRegolePiano
- `17655` — _isModelloSistema
- `17658` — _isModelloSistemaModificato
- `17670` — caricaModelliCustomLocal
- `17684` — salvaModelliCustomLocal
- `17705` — _migraRecordCustom
- `17720` — _syncAliasLegacy
- `17729` — caricaAlimentiCustom
- `17753` — pushAlimentiCustomSupabase
- `17763` — pullAlimentiCustomSupabase
- `17777` — pushModelliSupabase
- `17795` — pullModelliSupabase
- `17820` — _calcolaFreqDaModello
- `17839` — aggiornaUImodello
- `17928` — popolaDropdownModelli
- `17956` — cambiaModelloRotazione
- `17962` — ripristinaModelloOriginale
- `17985` — eliminaModelloCustom
- `18003` — mostraAnteprimaModello
- `18013` — apriEditorModello
- `18043` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 18312-18550

- `15738` — rerender
- `18312` — _salvaModelloDaEditor
- `18354` — caricaRegolePiano
- `18384` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `18419` — _aiLogUsage
- `18441` — _aiProxyUrl
- `18447` — _aiTokenPerProxy
- `18476` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `18550` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 18629-18769

- `16216` — _risolviCollisioniCelle
- `18629` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `18689` — getFruttaStile
- `18696` — _fruttaGetPasto
- `18706` — _fruttaContaRigheRicetta
- `18710` — _fruttaIndiceBasePasto
- `18730` — getFruttaMarker
- `18743` — fruttaMarkerHtml
- `18751` — _fruttaCheckboxHtml
- `18760` — toggleFrutta
- `18769` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 18805-20079

- `18805` — _renderCelleGriglia
- `18885` — _renderRicetteTestuali
- `18924` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `18995` — _renderCelleHtml
- `19003` — toggleCellaMenu
- `19022` — closeAllCellaMenus
- `19030` — _trovaPasto
- `19038` — cellaSposta
- `19092` — cellaCancella
- `19113` — apriEditGrammatura
- `16789` — salva
- `19161` — cellaSwap
- `19181` — cellaRimuoviAlt
- `19195` — cellaAggiungiAlt
- `19298` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `19383` — apriEditRicetta
- `19392` — aggiungiRicetta
- `19408` — rimuoviRicetta
- `19417` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `19579` — ngAggiungiSpuntinoVuoto
- `19595` — apriAggiungiCella
- `17254` — risolviCompatibili
- `19691` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `19783` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `19924` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `20079` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 20127-20508

- `20127` — _attesoStrutturaPiano
- `20147` — _confrontaStrutturaPiano
- `20177` — _costruisciPromptDelta
- `20204` — _pianoToolSchema
- `20279` — _pianoMaxTokens
- `20288` — _estraiPianoDaRisposta
- `20310` — chiamaGeneraPiano
- `20477` — mostraLoadingSteps
- `18123` — render
- `20508` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 20575-21149

- `20575` — generaMessaggioAI
- `20680` — copiaMessaggioAI
- `20690` — salvaInStorico
- `20702` — salvaVarianteAI
- `20717` — renderVariantiSalvate
- `20736` — usaVariante
- `20754` — eliminaVariante
- `20765` — renderStoricoMsg
- `20781` — apriWhatsApp
- `21149` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 21327-22824

- `21327` — _ngColoreSemaforoNome
- `21335` — apriSceltaModalitaPiano
- `21370` — _ngChiudiModalita
- `21373` — _ngCostruisciGiornoVuoto
- `21406` — _ngCostruisciGiornoSpeciale
- `21417` — _ngIndiceInizioSpeciali
- `21428` — _ngModalitaNomeGiorno
- `21434` — _ngImpostaModalitaNomeGiorno
- `21437` — _ngLettera
- `21444` — _ngEtichettaGiorno
- `21464` — _ngEtichettaGiornoBreve
- `21478` — _ngToggleGiornoSpeciale
- `21502` — _ngRenderPannelloSpeciale
- `21570` — _generaGiornoSpecialeAI
- `21670` — _ngGiornoHaContenuto
- `21682` — _ngCreaPianoManuale
- `21705` — _ngScrollTabGiorni
- `21715` — _ngAbilitaDragScroll
- `21752` — _ngCambiaNumeroGiorni
- `21784` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `21798` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `21839` — _ngToggleCat
- `21848` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `21872` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `22028` — _ngSalvaPianoManuale
- `22054` — _ngParseIngrediente
- `22078` — _ngScomponiIngredienti
- `22090` — _ricCalcolaMacroDaIngredienti
- `22108` — _ricRicalcolaMacroLive
- `22115` — _ricAggiornaInfoMacro
- `22129` — _ricRicalcolaMacroLiveNow
- `22153` — _ngTrovaCategoriaAlimento
- `22186` — _ngPescaRicetta
- `22229` — _ngScomponiRicettaNelPasto
- `22266` — _ngDragStart
- `22277` — _ngDragStartCella
- `22288` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `22295` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `22300` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `22319` — _ngAggiungiAlimento
- `22344` — _ngRimuoviAlimento
- `22358` — _ngDopoModifica
- `22376` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `22429` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `22458` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `22475` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `22483` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `22555` — gramTestoCasalingo
- `22581` — _appendToggleNutrizionali
- `22624` — _appendTogglePromemoria
- `22653` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `22799` — cpFromEmoji
- `22805` — getEmojiCp
- `22824` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `20799` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `20821` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `20826` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `20852` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `20940` — _spesaTestoWhatsApp
- `20956` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `21001` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `21024` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `21052` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `21112` — scaricaListaSpesaPDF (download diretto, un click)
- `21120` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `21132` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 23972-23972

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
- `23972` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 23983-24189

- `23983` — salvaInbody
- `24047` — delInbody
- `24054` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `24189` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 24217-24686

- `24217` — buildSemLegenda
- `24231` — renderAlEditor
- `24292` — _alimNomeRegex
- `24300` — _alimGiorniDaPiano
- `24308` — _scanGiorniPerNome
- `24323` — scanRiferimentiAlimento
- `24352` — _alimRefsRighe
- `24358` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `24446` — modificaAlimentoCustom
- `24466` — ripristinaValoriPrecedentiAlimento
- `24478` — _resetAlimModal
- `24489` — apriNuovoAlimentoCustom
- `24495` — salvaAlimentoCustom
- `24562` — eliminaAlimentoCustom
- `24593` — _alimFonteBadge
- `24598` — renderAlimentiPage
- `22217` — E
- `24668` — archiviaAlimentoCustom
- `24686` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 24713-24950

- `24713` — _bcSetStatus
- `24715` — apriScannerBarcode
- `24723` — chiudiScannerBarcode
- `24728` — _bcStopCamera
- `24736` — _bcModaleAperto
- `24738` — _bcAvviaCamera
- `24749` — _bcAvviaNativo
- `24769` — _bcAvviaZXing
- `24778` — _bcZXStart
- `24789` — _bcErroreCamera
- `24797` — cercaBarcodeManuale
- `24803` — _barcodeTrovato
- `24819` — cercaBarcodeOFF
- `24837` — _bcProdottoNonTrovato
- `24851` — _bcPrecompilaForm
- `22477` — num
- `24875` — togAl
- `24928` — selCatAl
- `25402` — selTuttiAl
- `24950` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 24964-25280

- `24964` — setCalView
- `24965` — calPrev
- `24966` — calNext
- `24967` — calToday
- `24969` — renderCal
- `24983` — renderCalMonth
- `25007` — renderCalWeek
- `25025` — renderCalDay
- `25041` — selGiorno
- `25055` — setDisp
- `25060` — openAddEvento
- `25073` — openAddEventoPaz
- `25079` — toggleEntrataCheck
- `25084` — salvaEvento
- `25107` — openEvDetail
- `25162` — delEvento
- `25170` — copyMsg
- `25177` — aggDateCal
- `25182` — syncInizio
- `25183` — syncControllo
- `25184` — aggiornaPrev
- `25201` — renderRic
- `25228` — openNuovaRic
- `25229` — editRic
- `25239` — salvaRic
- `25264` — delRic
- `25280` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 25365-25425

- `25365` — aggiungiEntrataPerPaziente
- `25382` — openNuovaEntrata
- `25396` — salvaEntrata
- `25417` — delEntrata
- `25425` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 25455-25891

- `25455` — aiSuggerisciRicetta
- `25500` — renderConcettiModal
- `25519` — apriConcettiModal
- `25546` — salvaConcettiAllegati
- `25570` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `25608` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `25617` — loadInbodyPDF
- `25728` — _vitdLabel
- `25732` — getIntegratori
- `25736` — getIntegraWant
- `25740` — setIntegratori
- `25757` — setIntegraWant
- `25768` — getPatologieChip
- `25769` — getAllergieChip
- `25770` — setPatologieChip
- `25771` — setAllergieChip
- `25772` — getPatologie
- `25773` — getAllergie
- `25774` — setPatologieFromStr
- `25781` — setAllergieFromStr
- `25794` — getSdvChip
- `25795` — getCspChip
- `25796` — setSdvChip
- `25797` — setCspChip
- `25798` — setSdvFromStr
- `25799` — setCspFromStr
- `25803` — getBudget
- `25804` — setBudget
- `25809` — renderCalAnno
- `25840` — comprimeImmagine
- `25862` — uploadImmagineConcetto
- `25881` — rimuoviImmagineConcetto
- `25891` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 25957-26061

- `25957` — entraSelConcetti
- `25958` — annullaSelConcetti
- `25959` — toggleConcettoSel
- `25964` — eliminaConcettiSelezionati
- `25983` — confermaEliminaConcetti
- `25998` — aiRiscriviConcetto
- `26012` — editConcetto
- `26030` — salvaConcetto
- `26041` — openNuovoConcetto
- `26061` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 26062-26225

- `26062` — saveAgendaPersonale
- `26063` — getAgendaTodo
- `26064` — saveAgendaTodo
- `26066` — pulisciAgendaVecchia
- `26070` — navigaAgenda
- `26079` — toggleFormAgenda
- `26080` — toggleFormTodo
- `26082` — salvaAgendaItem
- `26096` — salvaTodoItem
- `26108` — toggleAgendaFatto
- `26116` — toggleTodoFatto
- `26129` — _catCol
- `26131` — renderAgendaDx
- `26225` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 26351-26555

- `26351` — renderScadenzeAlert
- `26536` — segnaGestito
- `26555` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 26564-26639

- `26564` — ripristinaPaz
- `26572` — eliminaPaz
- `26617` — getDove
- `26621` — setDove
- `26639` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 26644-27084

- `26644` — getCredenzialiPersistenti
- `26657` — cancellaCredenzialiPersistenti
- `26662` — rinnovaSessioneConRefreshToken
- `26679` — getSessioneSalvata
- `26698` — salvaSessione
- `26708` — cancellaSessione
- `26712` — eseguiLogin
- `26759` — eseguiLogout
- `26781` — mostraApp
- `26786` — verificaSessioneEAvvia
- `26814` — assicuraTokenValido
- `26843` — _garantiscoSessionePerSync
- `26855` — avviaRinnovoTokenPeriodico
- `26859` — fermaRinnovoTokenPeriodico
- `26868` — _authReset
- `26873` — _authMostra
- `26876` — mostraLogin
- `26877` — mostraRegistrazione
- `26878` — mostraRecupero
- `26879` — mostraNuovaPassword
- `26882` — eseguiRegistrazione
- `26920` — eseguiRecuperoPassword
- `26949` — eseguiNuovaPassword
- `26983` — _parseHashParams
- `26990` — _pulisciHash
- `26994` — gestisciRitornoAuth
- `27084` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 27156-27279

- `27156` — apriPannelloRicette
- `27185` — chiudiPannelloRicette
- `27193` — applicaRicettaPasto
- `27229` — inizializzaP2
- `27241` — deepClone
- `27245` — applicaPatch
- `27279` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
