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
Righe 2408-2450

- `2408` — _slugAlimento
- `2416` — _catalogoIndicizza
- `2420` — _catalogoDeindicizza
- `2427` — costruisciCatalogo
- `2450` — risolviAlimento

---

### MACROS PIANO — calcolo e badge macro reali vs target
Righe 2465-2728

- `2465` — getValoriCREA
- `2477` — getCurrentPaziente
- `2497` — getKcalWeekend
- `2554` — getMacrosRicettaComposta
- `2560` — calcolaMacrosPiano
- `2662` — renderBadgeMacrosReali
- `2611` — pctStr
- `2612` — color
- `2625` — row
- `2728` — renderBadgeMacrosReali_DOM

---

### ANALISI DEL SANGUE — parsing, indici clinici derivati, interpretazione
Righe 3013-3200

- `3013` — _parseAnalisiNum
- `3021` — calcolaIndice
- `3174` — interpretaAnalisi
- `3186` — _interpAnalisiHtml
- `3200` — mostraInfoRange

---

### CONCETTI EDUCATIVI — sync Supabase, migrazione
Righe 3343-3367

- `3343` — pushConcetiSupabase
- `3353` — pullConcetiSupabase
- `3367` — migraConcetti

---

### ALIMENTI — categorie funzionali/semaforo, chip UI, equivalenze porzioni
Righe 3557-3912

- `3557` — getCategoriaSemaforo
- `3574` — _getCategorieGruppo
- `3588` — calcolaGrammaturaEquivalente
- `3628` — _gruppoEquiv  (P121: gruppo di equivalenza + criterio per categoria funzionale)
- `3634` — _porzioneStandard  (P121: porzione `g` di database dell'alimento)
- `3649` — suggerisciGrEquivalente  (P121: firma a 3 argomenti, il gruppo si deduce dai due alimenti)
- `3675` — _etichettaCriterio  (P121: ≈carbo / ≈prot / ≈grassi / fissa / porzione)
- `3690` — _promptAlternativeGrassi  (P121: riga del prompt AI generata dal motore)
- `3706` — ricalcolaAlternative  (P121: MOTORE UNICO, unico punto che scrive la grammatura di un'alternativa)
- `3725` — ricalcolaAlternativePiano  (P121: applica il motore a tutte le celle di un piano)
- `3774` — arrotondaGrammatura  (P121: sostituisce arrotondaPorzioneDiscreta — pezzi interi senza tetto / 5g)
- `3784` — getCategoriaFunzionale
- `3824` — catArr
- `3840` — _tagComuniTrova
- `3844` — getTagComuniChip
- `3847` — setTagComuniChip
- `3855` — setCatChips
- `3868` — getStagioniChip
- `3871` — setStagioniChip
- `3878` — getProfiloChip
- `3881` — setProfiloChip
- `3890` — wireChipGroup
- `3901` — wireAttrChipGroups
- `3912` — wireRadioChipGroup

---

### CONFIG / STORAGE LOCALE — cfg, localStorage db, util data/valuta
Righe 3940-4319

- `3940` — getCfg
- `3941` — saveCfgL
- `3942` — getUrl
- `3943` — saveLocal
- `3944` — loadLocal
- `3955` — uid
- `3956` — today
- `3957` — addDays
- `3958` — fData
- `3959` — fEur
- `3961` — getLastSyncText
- `3971` — getSyncColor
- `3979` — aggiornaStatoSync
- `4005` — setSyncStatus
- `4273` — _registraTombstone
- `4281` — _tombstoneAttivi
- `4293` — _fondiTombstones
- `4307` — _mergeTombstonesRemoti *(dal 24/7 legge il meta da `collections`, P74 1d)*
- `4319` — _applicaTombstones
- `4180` — _pazFetchMeta *(P74 1d — solo `collections`)*
- `4201` — _collectionsUpsert *(P74 — scrittura primaria dei 4 meta-record dal cutover 1d)*
- `4223` — _collectionsFetch *(P74 1d — lettura unica dei meta-record)*
- `4246` — _analisiSangueUpsert *(P74 fase 2 — scrittura ombra analisi del sangue, 24/7)*

---

### SYNC SUPABASE — push/pull ricette/pazienti, tombstones, conflitti (P69)
Righe 4343-4728

- `4343` — supaHeaders
- `4357` — pushRicetteSupabase
- `4382` — pullRicetteSupabase
- `4404` — delRicetteSupabase
- `4416` — delPazienteSupabase
- `4431` — pushToSheets
- `4475` — pullFromSheets
- `4554` — syncNow
- `4567` — sincronizzaTutto
- `4360` — stpSet
- `4365` — stpMsg
- `4698` — testConnSupabase
- `4728` — _p68LogSaveAnonimo

---

### SYNC SUPABASE — save paziente, piani/cache piano, entrate, eventi
Righe 4742-5258

- `4742` — save
- `4760` — _pushRigaPerId
- `4793` — _flushDirtyIds
- `4876` — _p69LoadBaseline
- `4879` — _p69StoreBaseline
- `4882` — _p69SetBaseline
- `4886` — _p69DropBaseline
- `4890` — _p69SetBaselineFromRows
- `4896` — _p69NomePaz
- `4901` — _p69InList
- `4909` — _p69RilevaConflitti
- `4945` — _p69DialogoConflitti
- `4738` — chiudi
- `4979` — _p69RisolviRicarica
- `5008` — _p69EsportaLocali
- `5021` — _p69RisolviSovrascrivi
- `5034` — pushPianoSupabase
- `5056` — pullPianiSupabase
- `5072` — delPianoSupabase
- `5088` — delPianiPazienteSupabase
- `5100` — pushCachePianoSupabase
- `5117` — caricaCachePianoSupabase
- `5139` — pushEntrateSupabase
- `5163` — pullEntrateSupabase
- `5177` — delEntrataSupabase
- `5185` — pushEntrataSupabase
- `5196` — pushEventoSupabase
- `5209` — pushEventiSupabase
- `5233` — pullEventiSupabase
- `5247` — delEventoSupabase
- `5258` — _pianoCacheKey

---

### UI GENERALE — config AI key, notifiche, navigazione (goTo/tab/modali)
Righe 5289-5401

- `5289` — _salvaPianoCache
- `5294` — _caricaPianoCache
- `5300` — salvaCfg
- `5301` — testConn
- `5308` — testaAntKey
- `5319` — initAntCard
- `5322` — esporta
- `5323` — importa
- `5328` — goTo
- `5345` — closeM
- `5353` — ngChiudiModale
- `5362` — ngChiudiPopupCoppia
- `5366` — ngAggiungiX
- `5377` — ngUpgradeModali
- `5397` — mTab
- `5398` — aggiornaEta
- `5399` — toggleOrarioNote
- `5400` — pdTab
- `5401` — notif

---

### PAZIENTI — registro: lista/card/kanban, apertura, editing, salvataggio, routine
Righe 5409-8175

- `5409` — getPazView
- `5410` — setPazView
- `5419` — _pazStatoPiano
- `5427` — _pazUrgenzaControllo
- `5434` — _pazStatoTagHtml
- `5443` — _pazAggiornaFiltroRegimi
- `5451` — renderPaz
- `5504` — _renderPazCard
- `5529` — _renderPazLista
- `5556` — _renderPazKanban
- `5594` — openNuovoPaz
- `5620` — editPaz
- `5698` — REGOLE_SEMAFORO_ALIMENTI *(15 condizioni cliniche → grigi/celesti; globale dal 26/7 per essere verificabile dal test)*
- `6145` — _SEM_COLORI_LEGACY / `6105` _SEM_COLORI_AUTO *(F9 — unico vocabolario dei colori automatici)*
- `6150` — NOMI_CONDIZIONE_SEMAFORO *(etichette delle 15 condizioni, usate anche dal riquadro della scheda)*
- `6172` — _semaforoCondizioniAttive *(le condizioni spuntate su un paziente)*
- `6183` — _semaforoMigraPaziente *(F9 — toglie i colori legacy e ricalcola; idempotente)*
- `6194` — _semaforoMigraTutti *(passata su tutti i pazienti in memoria, con conteggio)*
- `6205` — applicaRegoloSemaforo *(dal 26/7 pulisce TUTTI e sei i colori automatici, non solo i suoi due)*
- `6293` — trovaChiaveAlimento *(match esatto sul nome: se non trova, la regola è ignorata in silenzio — vedi test s2-regole-nomi-alimenti)*
- `6317` — _pazNumOPrec *(F7 — campo assente = valore precedente, non azzeramento)*
- `6329` — _pazPreservaCampi *(F5 — l'anagrafica non cancella i campi che il form non gestisce)*
- `6335` — salvaPaz
- `6411` — openPaz
- `7862` — renderPdRoutine
- `6723` — cardHTML
- `8004` — updateRoutineCampo
- `8012` — suggerisciPastoEQuando
- `8039` — filtroLibreria
- `8048` — renderLibreriaGrid
- `8069` — aggiungiDaLibreriaIdx
- `8093` — openModalRoutine
- `8100` — salvaRoutineVoce
- `8125` — salvaRoutine
- `8132` — mostraRoutinePopup
- `8160` — removeRoutineVoce
- `8175` — _renderAggiustamentiSection

---

### 📈 PERCORSO — timeline di periodizzazione (P115 Tappe 1-5 COMPLETE, 24 lug 2026)
Righe 6021-6621 (numeri ESATTI al 24/7 notte, dopo la Tappa 5). ⚠️ Questo blocco (~600 righe) fa slittare tutti i numeri delle sezioni SUCCESSIVE a riga ~6020 rispetto all'ultima rigenerazione completa: per quelle sezioni fare grep di conferma. Rigenerazione completa alla prossima modifica strutturale.

- `6456` — _PERCORSO_TIPI (const: tipi fase, colori, pct default)
- `6463` — _percorsoGet *(normalizza p.percorso, scarta fasi invalide)*
- `6485` — _percorsoIsoLocal *(data → YYYY-MM-DD LOCALE, mai toISOString/UTC)*
- `6491` — _percorsoIntervalli *(fasi consecutive → date concrete dal/al)*
- `6505` — _percorsoFaseAt *(fase attiva a una data; dal incluso, al escluso)*
- `6514` — _percorsoKcalFase *(pct → kcal indicative via calcolaTDEE)*
- `6537` — _percorsoProiezione *(Tappa 2 — proiezione ibrida teorica/calibrata, cono, obiettivo a intervallo)*
- `6595` — _percorsoDataBreve *(ISO → "12 set")*
- `6612` — _percorsoSerieEnergia *(Tappa 3 — serie introito/TDEE stimato/TDEE osservato per la corsia energia)*
- `6651` — _percorsoSerieMassaMagra *(Tappa 4 — solo InBody: punti {data,m,pg})*
- `6670` — _percorsoConsuntivo *(Tappa 5 — legge p.consuntivo scritto da P50: aderenza, extra kcal, ritardo=extra÷7700, settimane perse; oggi sempre ok:false)*
- `6712` — _PERCORSO_LAYERS_DEFAULT / _percorsoLayersState / _percorsoLayersGet *(Tappa 4 — stato interruttori, SOLO sessione, mai su p)*
- `6717` — percorsoLayerToggle *(Tappa 4 — inverte un solo strato)*
- `6723` — percorsoVistaPreset *(Tappa 4 — preset "tecnica"/"paziente")*
- `6739` — _percorsoPaz *(e a seguire i mutatori percorsoInit/SetInizio/AddFase/UpdFase/DelFase/MoveFase)*
- `6795` — _PERCORSO_MODELLI / _PERCORSO_GEN *(P122 T3 — 4 modelli + regole dei cicli)*
- `6813` — _percorsoGeneraFasi *(P122 T3 — pura: dal traguardo alle fasi, ritmo = quello della proiezione)*
- `6893` — _percorsoModelloSelectHtml
- `6902` — percorsoGeneraDaModello *(propone; conferma prima di sostituire fasi esistenti)*
- `6925` — _percorsoShiftGiorni *(pura: ancora = ultima pesata)*
- `6935` — percorsoRiallinea *(⏩ trasla il piano, riprende dal giorno-fase dell'interruzione)*
- `6962` — _TRG_TIPI / `6744` _TRG_COMPORTAMENTI *(P122 T4 — tipi di traguardo e libreria comportamenti)*
- `6984` — _traguardiGet · `6761` _traguardoValoreAttuale *(valore corrente dai dati esistenti, null se manca)*
- `7023` — _traguardoVerso *(auto: dedotto dalla partenza)* · `6803` _traguardoValuta · `6824` _traguardiValuta
- `7064` — traguardoAdd · `6852` traguardoUpd · `6867` traguardoDel · `6873` traguardoSegna
- `7122` — _COND_TIPI · `6897` _percorsoCondizione *(pura: la fase finisce per soglia — SOLO suggerimento)*
- `7138` — percorsoSetCondizione · `6927` percorsoChiudiFase *(esito fotografato, riapribile)*
- `7172` — _traguardiHtml *(blocco 🏁 in fondo alla scheda Percorso)*
- `7270` — _percorsoVistaPaz / `7049` _percorsoVistaPazAttiva *(P122 T5 — modalità di sessione)*
- `7277` — _percorsoVittorie *(pura: vittorie dall'inizio del percorso + flag ricomposizione)*
- `7315` — _percorsoNascondiPeso *(in fase di massa il peso non si mostra al paziente)*
- `7326` — _traguardoFaseCorrente *(traguardo della fase IN CORSO, non quello lontano)*
- `7354` — _traguardoTestoPaziente *(righe in italiano semplice, riusate dal messaggio WhatsApp)*
- `7387` — _vistaPazienteHtml *(i tre riquadri che guarda il paziente)*
- `7467` — _percorsoChartSvg *(due corsie: peso + massa magra + cono proiezione sopra, striscia aderenza in mezzo (solo con dati P50), energia (kcal) sotto — tutto gated dagli interruttori)*
- `7656` — renderPdPercorso *(scheda: badge fase, riga proiezione/obiettivo, riga Piano vs Realtà (solo con dati), toolbar interruttori, grafico, editor)*

*(Tappa 2 tocca anche `calcolaMacros`: box obiettivo con intervallo al posto della data secca.)*

---

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 8260-8431

- `8260` — salvaAggiustamento
- `8293` — eliminaAggiustamento
- `8302` — renderPdNote
- `8337` — salvaNotaClinica
- `8352` — deleteNota
- `8361` — saveNote
- `8381` — resetSemaforoAuto *(F9 — pulsante 🔄 Ricalcola: pulisce gli automatici e rifà col sistema valido; il motore LEGACY non esiste più)*
- `8431` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 8657-8855

- `8657` — avviaFX
- `8685` — avviaAnalisi
- `8702` — _renderFlussoPanel
- `8746` — _riepEsc
- `8750` — _riepNum
- `8756` — _riepDelta
- `8764` — _riepDataSig
- `8782` — _riepParseFX
- `8087` — clean
- `8796` — _riepAggiornaFX
- `8822` — _riepToggleDomandaDefault
- `8834` — _riepAddDomanda
- `8847` — _riepRemoveDomanda
- `8855` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 9067-9294

- `8218` — dCol
- `8336` — card
- `9067` — renderPdRagionamento
- `9155` — inviaMessaggioRag
- `9173` — concludiERiassumi
- `9187` — salvaRagionamento
- `9208` — apriGeneratoreDaRag
- `9216` — nuovaSessioneRag
- `9222` — cancellaSavedRag
- `9232` — renderPazTimeline
- `9264` — renderPdAnamnesi
- `9294` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 11193-12328

- `11193` — _anNorm *(P125 — testo confrontabile: minuscole, niente accenti)*
- `11199` — _anCorrisponde *(P125 — ricerca per parole-prefisso: "vit d" trova "Vitamina D")*
- `11205` — filtraAnalisi *(P125 — filtro dal vivo delle 119 voci)*
- `11239` — pulisciRicercaAnalisi
- `11245` — renderPdAnalisi
- `11301` — toggleAnalisiSection
- `11450` — loadAnalisiSanguePDF
- `11337` — _impPdfConfigurata
- `11338` — _impPdfLib
- `11348` — _impPdfApri
- `11361` — _impPdfPagina *(P124b — una pagina del PDF → immagine, con la rotazione RILEVATA, non quella dichiarata dal file)*
- `11382` — _impRuotaImmagine
- `11407` — _impRilevaRotazione *(P124b — chiamata piccola: di quanti gradi va girata la pagina)*
- `11426` — _impPromptPagina *(P124b — prompt di UNA pagina, con l'impronta della riga: valore+unità+riferimento)*
- `11625` — _impNormalizzaNumero *(P124 — numero all'italiana → punto decimale, conversione fatta dall'app e non dall'AI)*
- `11636` — _impNumeri
- `11644` — _impSembraIntervallo
- `11652` — _impUgualeAlRange
- `11661` — _impLimitiStd
- `11682` — _impFuoriScala
- `11691` — _impCorrezioneVirgola
- `11703` — _impTestoLimiti
- `11724` — _impRifPlausibile *(P124b — un "riferimento" che è un'unità di misura = riga disallineata)*
- `11737` — _impUnitaCanonica
- `11759` — _impStessaGrandezza *(P124b — stesso tipo di misura a meno del prefisso: nanomoli/micromoli/millimoli)*
- `11776` — _impUnitaCompatibili
- `11787` — _impControllaValore *(P124 — i controlli anti-errore su un valore estratto)*
- `11851` — mostraDiffAnalisi *(P124 — colonna Estratto modificabile + righe sospette deselezionate)*
- `12041` — _calcoloIncluso
- `12047` — toggleCalcoloIncluso
- `12069` — _renderCalcoliPannello
- `12110` — toggleGlossario
- `12115` — updateAnalisi
- `12174` — salvaAnalisi
- `12187` — applicaGruppoClinico
- `12216` — renderBoxGruppiCliniciSuggeriti
- `12248` — suggerisciGruppiClinici
- `12328` — renderMemoriaInbody

---
### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9176 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `9424` — _richVal
- `9431` — _richBmi
- `9436` — _richPat
- `9442` — _richNum
- `9487` — _richPreselezione
- `9503` — richLeggiIntestazione
- `9507` — richSalvaIntestazione
- `9516` — apriRichiestaAnalisi
- `9536` — _richModaleHtml
- `9612` — _richEsc
- `9614` — _richMotivoCambia
- `9620` — _richToggleSez
- `9626` — _richAggiornaConteggi
- `9634` — _richMotivoCorrente
- `9644` — _richSelezione
- `9659` — _richTxt
- `9665` — _richCostruisciPDF
- `8969` — nuovaPagina
- `8970` — spazio
- `9761` — _richNomeFile
- `9766` — _richPrepara
- `9779` — _richRegistra
- `9784` — _richStato
- `9786` — richScaricaPDF
- `9835` — _richUpload
- `9837` — _richWaUrl
- `9844` — _richTestoWa
- `9858` — richInviaWhatsApp
- `9898` — richCopiaLink
- `9919` — _richStoricoHtml

---
### REFERTI DEL SANGUE DATATI — storico nel tempo (P118 tappa 1)
Righe 9194-9387 — migrazione, ordinamento, quadro attuale derivato, barra di selezione.

- `10970` — _refertoNuovoId
- `10973` — _refertoOggi
- `10977` — _refertoDataIt
- `10983` — _refertoConteggio
- `10997` — _refertiMigra
- `11024` — _refertiOrdinati
- `11035` — _refertoPiuRecente
- `11040` — _refertoInVista
- `11058` — _refertiApplica
- `11071` — _refertoCrea
- `11090` — refertoCambiaVista
- `11096` — refertoCambiaData
- `11108` — refertoNuovo
- `11116` — refertoDuplica
- `11125` — refertoElimina
- `11140` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `10583` — _rangeNum
- `10589` — _rangeTestoDa
- `10608` — _rangeCoppia
- `10618` — _rangeHtml

---
### ANDAMENTO NEL TEMPO — tracciato, variazione, grafico grande (P118 tappa 3)
Righe 9441-9745 — serie storica, regola del colore, sparkline, pannello in fondo.

- `10660` — _andLimiti
- `10681` — _andParseRangeLab
- `10694` — _andDistanza
- `10701` — _andValutazione
- `10714` — _andSerie
- `10728` — _andNum
- `10732` — _andDataBreve
- `10737` — _andMeseAnno
- `10745` — _andDominio
- `10759` — _andColore
- `10772` — _andSparkHtml
- `10798` — _andRigaHtml
- `10820` — _andEsamiSeguibili
- `10828` — andScegliEsame
- `10834` — _andPannelloHtml
- `10887` — _andGraficoGrande
- `10938` — _andPasso

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 12376-12787

- `12376` — _ibFmtBreve
- `12385` — _renderPesiIntermediSection
- `12434` — aggiungiPesoIntermedio
- `12450` — eliminaPesoIntermedio
- `12460` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `12787` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 13059-13059

- `13059` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 13437-15978

- `13437` — aggiornaLabelMacros
- `13455` — calcolaMacros
- `13596` — applicaSchema
- `13631` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `13637` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `13659` — _misuraDaReferto *(P127 — UN referto letto con le regole del traguardo: usata anche dalla verifica al controllo)*
- `13692` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `13703` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `13721` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `13834` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `13848` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `13904` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `13918` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `13950` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `13983` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `14025` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `14033` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `14044` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `14071` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `14086` — _stradeVerso *(le strade complete + percentuale libera)*
- `14133` — _VC_TOLLERANZA_PCT / _VC_GIORNI_MIN / _VC_GIORNI_MIN_RITARO / _VC_COPERTURA_MIN_PCT / _VC_MAGRA_PRUDENZA_GG *(P127 — soglie cliniche della verifica)*
- `14143` — _mediaSlotPrescritta *(media pesata sui giorni di un campo dello storico target; la usa anche _kcalMediaPrescrittaOss)*
- `14163` — _vcDeficitSlot *(deficit di uno slot: campo offset o kcal−tdee per gli slot vecchi)*
- `14171` — _vcTratto *(P127 — cosa è cambiato fra due referti, previsto vs reale, TDEE misurato)*
- `14225` — _vcTraguardoSalvato *(traguardo ricostruito dal salvato, per la scheda Percorso)*
- `14235` — _verificaControllo *(P127 — motore puro: tratto recente, quadro dall'inizio, residuo al ritmo reale)*
- `14273` — _verificaControlloHtml *(blocco 🔎, unica fonte per pannello 🎯 e scheda Percorso; azioni solo dove c'è il campo kcal)*
- `14365` — _vcRitara *(scrive le kcal ritarate nel campo regime: propone, non salva)*
- `14378` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `14446` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `14468` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `14521` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `14628` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `14643` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `14668` — _renderRifPesoBox
- `14719` — _usaRifPeso
- `14723` — _aggiornaRifPesoTarget
- `14726` — _aggiornaRegimeSlider
- `15383` — _presetRegime
- `15387` — _initRegimeSliderDaPaziente
- `15405` — ricalcolaLAF
- `15539` — renderStoricoTDEE
- `15573` — attivaSlotTDEE
- `15581` — eliminaSlotTDEE
- `15594` — _toggleCiclizzazione
- `15600` — _aggiornaAnteprimaCiclizzazione
- `15618` — salvaCalcoloMacros
- `15732` — _metAllenamento
- `15748` — _neatFrazione
- `15822` — _larnLafStileVita
- `15839` — _regimeOffset
- `15849` — _componiRegimeText
- `15882` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `15894` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `15901` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `15978` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 15996-16426

- `15996` — renderTargetBadge
- `16025` — verificaRegola_75_20_5
- `16062` — renderBadge75_20_5
- `16127` — _validaNorm
- `16130` — _validaMatchTermine
- `16138` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `16189` — _validaTesto
- `16210` — validaPiano
- `16284` — _validaFirmaBlocchi
- `16291` — renderBadgeValidatore
- `16322` — _validaVaiAlGiorno
- `16331` — apriPannelloValidatore
- `13472` — esc
- `16388` — _validaEseguiOverride
- `16411` — validaGateExport
- `16426` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 16559-17191

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
- `16559` — pianoPazSelezionato
- `16706` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `16944` — renderPanelMacrosGiorno
- `17087` — pmgCambiaGrammi
- `17114` — riapriPiano
- `17152` — _montaPianoCorrente
- `17191` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 17201-17670

- `17201` — pullTemplateSupabase
- `17212` — delTemplateSupabase
- `17221` — _promptTemplateNome
- `17246` — _creaTemplateDaJSON
- `17269` — salvaComeTemplate
- `17280` — salvaComeTemplateDaPiano
- `17289` — _normNomeAlim
- `17290` — _escRegAlim
- `17291` — _raccogliAlimentiDaPiano
- `17302` — _alimentiEsclusiPaziente
- `17314` — _trovaConflittiTemplate
- `17332` — _mostraAvvisoConflitti
- `17356` — applicaTemplate
- `17374` — apriPickerTemplate
- `17402` — _pickPaziente
- `17421` — applicaTemplatePick
- `17425` — rinominaTemplate
- `17436` — eliminaTemplate
- `17446` — renderLibreriaTemplate
- `17475` — renderStoricoPiani
- `17534` — eliminaPiano
- `17550` — _getActiveMacrosTarget
- `17574` — getTargetAttivi
- `17611` — calcolaTargetsCiclizzazione
- `17637` — _setupPianoTargets
- `17661` — getStagioneCorrente
- `17670` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 18132-18132

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `18132` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 18141-18600

- `18141` — aggiornaUIcolazione
- `18151` — salvaRegolePiano
- `18212` — _isModelloSistema
- `18215` — _isModelloSistemaModificato
- `18227` — caricaModelliCustomLocal
- `18241` — salvaModelliCustomLocal
- `18262` — _migraRecordCustom
- `18277` — _syncAliasLegacy
- `18286` — caricaAlimentiCustom
- `18310` — pushAlimentiCustomSupabase
- `18320` — pullAlimentiCustomSupabase
- `18334` — pushModelliSupabase
- `18352` — pullModelliSupabase
- `18377` — _calcolaFreqDaModello
- `18396` — aggiornaUImodello
- `18485` — popolaDropdownModelli
- `18513` — cambiaModelloRotazione
- `18519` — ripristinaModelloOriginale
- `18542` — eliminaModelloCustom
- `18560` — mostraAnteprimaModello
- `18570` — apriEditorModello
- `18600` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 18869-19107

- `15738` — rerender
- `18869` — _salvaModelloDaEditor
- `18911` — caricaRegolePiano
- `18941` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `18976` — _aiLogUsage
- `18998` — _aiProxyUrl
- `19004` — _aiTokenPerProxy
- `19033` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `19107` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 19186-19326

- `16216` — _risolviCollisioniCelle
- `19186` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `19246` — getFruttaStile
- `19253` — _fruttaGetPasto
- `19263` — _fruttaContaRigheRicetta
- `19267` — _fruttaIndiceBasePasto
- `19287` — getFruttaMarker
- `19300` — fruttaMarkerHtml
- `19308` — _fruttaCheckboxHtml
- `19317` — toggleFrutta
- `19326` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 19362-20636

- `19362` — _renderCelleGriglia
- `19442` — _renderRicetteTestuali
- `19481` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `19552` — _renderCelleHtml
- `19560` — toggleCellaMenu
- `19579` — closeAllCellaMenus
- `19587` — _trovaPasto
- `19595` — cellaSposta
- `19649` — cellaCancella
- `19670` — apriEditGrammatura
- `16789` — salva
- `19718` — cellaSwap
- `19738` — cellaRimuoviAlt
- `19752` — cellaAggiungiAlt
- `19855` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `19940` — apriEditRicetta
- `19949` — aggiungiRicetta
- `19965` — rimuoviRicetta
- `19974` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `20136` — ngAggiungiSpuntinoVuoto
- `20152` — apriAggiungiCella
- `17254` — risolviCompatibili
- `20248` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `20340` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `20481` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `20636` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 20684-21076

- `20684` — _attesoStrutturaPiano
- `20704` — _confrontaStrutturaPiano
- `20734` — _costruisciPromptDelta
- `20761` — _pianoToolSchema
- `20836` — _pianoMaxTokens
- `20845` — _estraiPianoDaRisposta
- `20867` — chiamaGeneraPiano
- `21034` — mostraLoadingSteps
- `18123` — render
- `21076` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 21143-21720

- `21143` — generaMessaggioAI
- `21248` — copiaMessaggioAI
- `21258` — salvaInStorico
- `21270` — salvaVarianteAI
- `21285` — renderVariantiSalvate
- `21304` — usaVariante
- `21322` — eliminaVariante
- `21333` — renderStoricoMsg
- `21349` — apriWhatsApp
- `21720` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 21898-23395

- `21898` — _ngColoreSemaforoNome
- `21906` — apriSceltaModalitaPiano
- `21941` — _ngChiudiModalita
- `21944` — _ngCostruisciGiornoVuoto
- `21977` — _ngCostruisciGiornoSpeciale
- `21988` — _ngIndiceInizioSpeciali
- `21999` — _ngModalitaNomeGiorno
- `22005` — _ngImpostaModalitaNomeGiorno
- `22008` — _ngLettera
- `22015` — _ngEtichettaGiorno
- `22035` — _ngEtichettaGiornoBreve
- `22049` — _ngToggleGiornoSpeciale
- `22073` — _ngRenderPannelloSpeciale
- `22141` — _generaGiornoSpecialeAI
- `22241` — _ngGiornoHaContenuto
- `22253` — _ngCreaPianoManuale
- `22276` — _ngScrollTabGiorni
- `22286` — _ngAbilitaDragScroll
- `22323` — _ngCambiaNumeroGiorni
- `22355` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `22369` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `22410` — _ngToggleCat
- `22419` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `22443` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `22599` — _ngSalvaPianoManuale
- `22625` — _ngParseIngrediente
- `22649` — _ngScomponiIngredienti
- `22661` — _ricCalcolaMacroDaIngredienti
- `22679` — _ricRicalcolaMacroLive
- `22686` — _ricAggiornaInfoMacro
- `22700` — _ricRicalcolaMacroLiveNow
- `22724` — _ngTrovaCategoriaAlimento
- `22757` — _ngPescaRicetta
- `22800` — _ngScomponiRicettaNelPasto
- `22837` — _ngDragStart
- `22848` — _ngDragStartCella
- `22859` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `22866` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `22871` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `22890` — _ngAggiungiAlimento
- `22915` — _ngRimuoviAlimento
- `22929` — _ngDopoModifica
- `22947` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `23000` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `23029` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `23046` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `23054` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `23126` — gramTestoCasalingo
- `23152` — _appendToggleNutrizionali
- `23195` — _appendTogglePromemoria
- `23224` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `23370` — cpFromEmoji
- `23376` — getEmojiCp
- `23395` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `21370` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `21392` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `21397` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `21423` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `21511` — _spesaTestoWhatsApp
- `21527` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `21572` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `21595` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `21623` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `21683` — scaricaListaSpesaPDF (download diretto, un click)
- `21691` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `21703` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 24543-24543

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
- `24543` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 24554-24760

- `24554` — salvaInbody
- `24618` — delInbody
- `24625` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `24760` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 24788-25257

- `24788` — buildSemLegenda
- `24802` — renderAlEditor
- `24863` — _alimNomeRegex
- `24871` — _alimGiorniDaPiano
- `24879` — _scanGiorniPerNome
- `24894` — scanRiferimentiAlimento
- `24923` — _alimRefsRighe
- `24929` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `25017` — modificaAlimentoCustom
- `25037` — ripristinaValoriPrecedentiAlimento
- `25049` — _resetAlimModal
- `25060` — apriNuovoAlimentoCustom
- `25066` — salvaAlimentoCustom
- `25133` — eliminaAlimentoCustom
- `25164` — _alimFonteBadge
- `25169` — renderAlimentiPage
- `22217` — E
- `25239` — archiviaAlimentoCustom
- `25257` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 25284-25521

- `25284` — _bcSetStatus
- `25286` — apriScannerBarcode
- `25294` — chiudiScannerBarcode
- `25299` — _bcStopCamera
- `25307` — _bcModaleAperto
- `25309` — _bcAvviaCamera
- `25320` — _bcAvviaNativo
- `25340` — _bcAvviaZXing
- `25349` — _bcZXStart
- `25360` — _bcErroreCamera
- `25368` — cercaBarcodeManuale
- `25374` — _barcodeTrovato
- `25390` — cercaBarcodeOFF
- `25408` — _bcProdottoNonTrovato
- `25422` — _bcPrecompilaForm
- `22477` — num
- `25446` — togAl
- `25499` — selCatAl
- `25402` — selTuttiAl
- `25521` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 25535-25851

- `25535` — setCalView
- `25536` — calPrev
- `25537` — calNext
- `25538` — calToday
- `25540` — renderCal
- `25554` — renderCalMonth
- `25578` — renderCalWeek
- `25596` — renderCalDay
- `25612` — selGiorno
- `25626` — setDisp
- `25631` — openAddEvento
- `25644` — openAddEventoPaz
- `25650` — toggleEntrataCheck
- `25655` — salvaEvento
- `25678` — openEvDetail
- `25733` — delEvento
- `25741` — copyMsg
- `25748` — aggDateCal
- `25753` — syncInizio
- `25754` — syncControllo
- `25755` — aggiornaPrev
- `25772` — renderRic
- `25799` — openNuovaRic
- `25800` — editRic
- `25810` — salvaRic
- `25835` — delRic
- `25851` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 25936-25996

- `25936` — aggiungiEntrataPerPaziente
- `25953` — openNuovaEntrata
- `25967` — salvaEntrata
- `25988` — delEntrata
- `25996` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 26026-26490

- `26026` — aiSuggerisciRicetta
- `26071` — renderConcettiModal
- `26090` — apriConcettiModal
- `26117` — salvaConcettiAllegati
- `26141` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `26179` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `26188` — loadInbodyPDF
- `26300` — _vitdLabel
- `26304` — getIntegratori
- `26308` — getIntegraWant
- `26312` — setIntegratori
- `26329` — setIntegraWant
- `26367` — getPatologieChip
- `26368` — getAllergieChip
- `26369` — setPatologieChip
- `26370` — setAllergieChip
- `26371` — getPatologie
- `26372` — getAllergie
- `26373` — setPatologieFromStr
- `26380` — setAllergieFromStr
- `26393` — getSdvChip
- `26394` — getCspChip
- `26395` — setSdvChip
- `26396` — setCspChip
- `26397` — setSdvFromStr
- `26398` — setCspFromStr
- `26402` — getBudget
- `26403` — setBudget
- `26408` — renderCalAnno
- `26439` — comprimeImmagine
- `26461` — uploadImmagineConcetto
- `26480` — rimuoviImmagineConcetto
- `26490` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 26556-26660

- `26556` — entraSelConcetti
- `26557` — annullaSelConcetti
- `26558` — toggleConcettoSel
- `26563` — eliminaConcettiSelezionati
- `26582` — confermaEliminaConcetti
- `26597` — aiRiscriviConcetto
- `26611` — editConcetto
- `26629` — salvaConcetto
- `26640` — openNuovoConcetto
- `26660` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 26661-26824

- `26661` — saveAgendaPersonale
- `26662` — getAgendaTodo
- `26663` — saveAgendaTodo
- `26665` — pulisciAgendaVecchia
- `26669` — navigaAgenda
- `26678` — toggleFormAgenda
- `26679` — toggleFormTodo
- `26681` — salvaAgendaItem
- `26695` — salvaTodoItem
- `26707` — toggleAgendaFatto
- `26715` — toggleTodoFatto
- `26728` — _catCol
- `26730` — renderAgendaDx
- `26824` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 26950-27154

- `26950` — renderScadenzeAlert
- `27135` — segnaGestito
- `27154` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 27163-27238

- `27163` — ripristinaPaz
- `27171` — eliminaPaz
- `27216` — getDove
- `27220` — setDove
- `27238` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 27243-27683

- `27243` — getCredenzialiPersistenti
- `27256` — cancellaCredenzialiPersistenti
- `27261` — rinnovaSessioneConRefreshToken
- `27278` — getSessioneSalvata
- `27297` — salvaSessione
- `27307` — cancellaSessione
- `27311` — eseguiLogin
- `27358` — eseguiLogout
- `27380` — mostraApp
- `27385` — verificaSessioneEAvvia
- `27413` — assicuraTokenValido
- `27442` — _garantiscoSessionePerSync
- `27454` — avviaRinnovoTokenPeriodico
- `27458` — fermaRinnovoTokenPeriodico
- `27467` — _authReset
- `27472` — _authMostra
- `27475` — mostraLogin
- `27476` — mostraRegistrazione
- `27477` — mostraRecupero
- `27478` — mostraNuovaPassword
- `27481` — eseguiRegistrazione
- `27519` — eseguiRecuperoPassword
- `27548` — eseguiNuovaPassword
- `27582` — _parseHashParams
- `27589` — _pulisciHash
- `27593` — gestisciRitornoAuth
- `27683` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 27755-27878

- `27755` — apriPannelloRicette
- `27784` — chiudiPannelloRicette
- `27792` — applicaRicettaPasto
- `27828` — inizializzaP2
- `27840` — deepClone
- `27844` — applicaPatch
- `27878` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
