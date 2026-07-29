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
Righe 2448-2490

- `2448` — _slugAlimento
- `2456` — _catalogoIndicizza
- `2460` — _catalogoDeindicizza
- `2467` — costruisciCatalogo
- `2490` — risolviAlimento

---

### MACROS PIANO — calcolo e badge macro reali vs target
Righe 2505-2768

- `2505` — getValoriCREA
- `2517` — getCurrentPaziente
- `2537` — getKcalWeekend
- `2594` — getMacrosRicettaComposta
- `2600` — calcolaMacrosPiano
- `2702` — renderBadgeMacrosReali
- `2611` — pctStr
- `2612` — color
- `2625` — row
- `2768` — renderBadgeMacrosReali_DOM

---

### ANALISI DEL SANGUE — parsing, indici clinici derivati, interpretazione
Righe 3053-3240

- `3053` — _parseAnalisiNum
- `3061` — calcolaIndice
- `3214` — interpretaAnalisi
- `3226` — _interpAnalisiHtml
- `3240` — mostraInfoRange

---

### CONCETTI EDUCATIVI — sync Supabase, migrazione
Righe 3383-3407

- `3383` — pushConcetiSupabase
- `3393` — pullConcetiSupabase
- `3407` — migraConcetti

---

### ALIMENTI — categorie funzionali/semaforo, chip UI, equivalenze porzioni
Righe 3597-3952

- `3597` — getCategoriaSemaforo
- `3614` — _getCategorieGruppo
- `3628` — calcolaGrammaturaEquivalente
- `3668` — _gruppoEquiv  (P121: gruppo di equivalenza + criterio per categoria funzionale)
- `3674` — _porzioneStandard  (P121: porzione `g` di database dell'alimento)
- `3689` — suggerisciGrEquivalente  (P121: firma a 3 argomenti, il gruppo si deduce dai due alimenti)
- `3715` — _etichettaCriterio  (P121: ≈carbo / ≈prot / ≈grassi / fissa / porzione)
- `3730` — _promptAlternativeGrassi  (P121: riga del prompt AI generata dal motore)
- `3746` — ricalcolaAlternative  (P121: MOTORE UNICO, unico punto che scrive la grammatura di un'alternativa)
- `3765` — ricalcolaAlternativePiano  (P121: applica il motore a tutte le celle di un piano)
- `3814` — arrotondaGrammatura  (P121: sostituisce arrotondaPorzioneDiscreta — pezzi interi senza tetto / 5g)
- `3824` — getCategoriaFunzionale
- `3864` — catArr
- `3880` — _tagComuniTrova
- `3884` — getTagComuniChip
- `3887` — setTagComuniChip
- `3895` — setCatChips
- `3908` — getStagioniChip
- `3911` — setStagioniChip
- `3918` — getProfiloChip
- `3921` — setProfiloChip
- `3930` — wireChipGroup
- `3941` — wireAttrChipGroups
- `3952` — wireRadioChipGroup

---

### CONFIG / STORAGE LOCALE — cfg, localStorage db, util data/valuta
Righe 3980-4359

- `3980` — getCfg
- `3981` — saveCfgL
- `3982` — getUrl
- `3983` — saveLocal
- `3984` — loadLocal
- `3995` — uid
- `3996` — today
- `3997` — addDays
- `3998` — fData
- `3999` — fEur
- `4001` — getLastSyncText
- `4011` — getSyncColor
- `4019` — aggiornaStatoSync
- `4045` — setSyncStatus
- `4313` — _registraTombstone
- `4321` — _tombstoneAttivi
- `4333` — _fondiTombstones
- `4347` — _mergeTombstonesRemoti *(dal 24/7 legge il meta da `collections`, P74 1d)*
- `4359` — _applicaTombstones
- `4220` — _pazFetchMeta *(P74 1d — solo `collections`)*
- `4241` — _collectionsUpsert *(P74 — scrittura primaria dei 4 meta-record dal cutover 1d)*
- `4263` — _collectionsFetch *(P74 1d — lettura unica dei meta-record)*
- `4286` — _analisiSangueUpsert *(P74 fase 2 — scrittura ombra analisi del sangue, 24/7)*

---

### SYNC SUPABASE — push/pull ricette/pazienti, tombstones, conflitti (P69)
Righe 4383-4768

- `4383` — supaHeaders
- `4397` — pushRicetteSupabase
- `4422` — pullRicetteSupabase
- `4444` — delRicetteSupabase
- `4456` — delPazienteSupabase
- `4471` — pushToSheets
- `4515` — pullFromSheets
- `4594` — syncNow
- `4607` — sincronizzaTutto
- `4360` — stpSet
- `4365` — stpMsg
- `4738` — testConnSupabase
- `4768` — _p68LogSaveAnonimo

---

### SYNC SUPABASE — save paziente, piani/cache piano, entrate, eventi
Righe 4782-5298

- `4782` — save
- `4800` — _pushRigaPerId
- `4833` — _flushDirtyIds
- `4916` — _p69LoadBaseline
- `4919` — _p69StoreBaseline
- `4922` — _p69SetBaseline
- `4926` — _p69DropBaseline
- `4930` — _p69SetBaselineFromRows
- `4936` — _p69NomePaz
- `4941` — _p69InList
- `4949` — _p69RilevaConflitti
- `4985` — _p69DialogoConflitti
- `4738` — chiudi
- `5019` — _p69RisolviRicarica
- `5048` — _p69EsportaLocali
- `5061` — _p69RisolviSovrascrivi
- `5074` — pushPianoSupabase
- `5096` — pullPianiSupabase
- `5112` — delPianoSupabase
- `5128` — delPianiPazienteSupabase
- `5140` — pushCachePianoSupabase
- `5157` — caricaCachePianoSupabase
- `5179` — pushEntrateSupabase
- `5203` — pullEntrateSupabase
- `5217` — delEntrataSupabase
- `5225` — pushEntrataSupabase
- `5236` — pushEventoSupabase
- `5249` — pushEventiSupabase
- `5273` — pullEventiSupabase
- `5287` — delEventoSupabase
- `5298` — _pianoCacheKey

---

### UI GENERALE — config AI key, notifiche, navigazione (goTo/tab/modali)
Righe 5329-5441

- `5329` — _salvaPianoCache
- `5334` — _caricaPianoCache
- `5340` — salvaCfg
- `5341` — testConn
- `5348` — testaAntKey
- `5359` — initAntCard
- `5362` — esporta
- `5363` — importa
- `5368` — goTo
- `5385` — closeM
- `5393` — ngChiudiModale
- `5402` — ngChiudiPopupCoppia
- `5406` — ngAggiungiX
- `5417` — ngUpgradeModali
- `5437` — mTab
- `5438` — aggiornaEta
- `5439` — toggleOrarioNote
- `5440` — pdTab
- `5441` — notif

---

### PAZIENTI — registro: lista/card/kanban, apertura, editing, salvataggio, routine
Righe 5449-8215

- `5449` — getPazView
- `5450` — setPazView
- `5459` — _pazStatoPiano
- `5467` — _pazUrgenzaControllo
- `5474` — _pazStatoTagHtml
- `5483` — _pazAggiornaFiltroRegimi
- `5491` — renderPaz
- `5544` — _renderPazCard
- `5569` — _renderPazLista
- `5596` — _renderPazKanban
- `5634` — openNuovoPaz
- `5660` — editPaz
- `5738` — REGOLE_SEMAFORO_ALIMENTI *(15 condizioni cliniche → grigi/celesti; globale dal 26/7 per essere verificabile dal test)*
- `6185` — _SEM_COLORI_LEGACY / `6105` _SEM_COLORI_AUTO *(F9 — unico vocabolario dei colori automatici)*
- `6190` — NOMI_CONDIZIONE_SEMAFORO *(etichette delle 15 condizioni, usate anche dal riquadro della scheda)*
- `6212` — _semaforoCondizioniAttive *(le condizioni spuntate su un paziente)*
- `6223` — _semaforoMigraPaziente *(F9 — toglie i colori legacy e ricalcola; idempotente)*
- `6234` — _semaforoMigraTutti *(passata su tutti i pazienti in memoria, con conteggio)*
- `6245` — applicaRegoloSemaforo *(dal 26/7 pulisce TUTTI e sei i colori automatici, non solo i suoi due)*
- `6333` — trovaChiaveAlimento *(match esatto sul nome: se non trova, la regola è ignorata in silenzio — vedi test s2-regole-nomi-alimenti)*
- `6357` — _pazNumOPrec *(F7 — campo assente = valore precedente, non azzeramento)*
- `6369` — _pazPreservaCampi *(F5 — l'anagrafica non cancella i campi che il form non gestisce)*
- `6375` — salvaPaz
- `6451` — openPaz
- `7902` — renderPdRoutine
- `6723` — cardHTML
- `8044` — updateRoutineCampo
- `8052` — suggerisciPastoEQuando
- `8079` — filtroLibreria
- `8088` — renderLibreriaGrid
- `8109` — aggiungiDaLibreriaIdx
- `8133` — openModalRoutine
- `8140` — salvaRoutineVoce
- `8165` — salvaRoutine
- `8172` — mostraRoutinePopup
- `8200` — removeRoutineVoce
- `8215` — _renderAggiustamentiSection

---

### 📈 PERCORSO — timeline di periodizzazione (P115 Tappe 1-5 COMPLETE, 24 lug 2026)
Righe 6021-6621 (numeri ESATTI al 24/7 notte, dopo la Tappa 5). ⚠️ Questo blocco (~600 righe) fa slittare tutti i numeri delle sezioni SUCCESSIVE a riga ~6020 rispetto all'ultima rigenerazione completa: per quelle sezioni fare grep di conferma. Rigenerazione completa alla prossima modifica strutturale.

- `6496` — _PERCORSO_TIPI (const: tipi fase, colori, pct default)
- `6503` — _percorsoGet *(normalizza p.percorso, scarta fasi invalide)*
- `6525` — _percorsoIsoLocal *(data → YYYY-MM-DD LOCALE, mai toISOString/UTC)*
- `6531` — _percorsoIntervalli *(fasi consecutive → date concrete dal/al)*
- `6545` — _percorsoFaseAt *(fase attiva a una data; dal incluso, al escluso)*
- `6554` — _percorsoKcalFase *(pct → kcal indicative via calcolaTDEE)*
- `6577` — _percorsoProiezione *(Tappa 2 — proiezione ibrida teorica/calibrata, cono, obiettivo a intervallo)*
- `6635` — _percorsoDataBreve *(ISO → "12 set")*
- `6652` — _percorsoSerieEnergia *(Tappa 3 — serie introito/TDEE stimato/TDEE osservato per la corsia energia)*
- `6691` — _percorsoSerieMassaMagra *(Tappa 4 — solo InBody: punti {data,m,pg})*
- `6710` — _percorsoConsuntivo *(Tappa 5 — legge p.consuntivo scritto da P50: aderenza, extra kcal, ritardo=extra÷7700, settimane perse; oggi sempre ok:false)*
- `6752` — _PERCORSO_LAYERS_DEFAULT / _percorsoLayersState / _percorsoLayersGet *(Tappa 4 — stato interruttori, SOLO sessione, mai su p)*
- `6757` — percorsoLayerToggle *(Tappa 4 — inverte un solo strato)*
- `6763` — percorsoVistaPreset *(Tappa 4 — preset "tecnica"/"paziente")*
- `6779` — _percorsoPaz *(e a seguire i mutatori percorsoInit/SetInizio/AddFase/UpdFase/DelFase/MoveFase)*
- `6835` — _PERCORSO_MODELLI / _PERCORSO_GEN *(P122 T3 — 4 modelli + regole dei cicli)*
- `6853` — _percorsoGeneraFasi *(P122 T3 — pura: dal traguardo alle fasi, ritmo = quello della proiezione)*
- `6933` — _percorsoModelloSelectHtml
- `6942` — percorsoGeneraDaModello *(propone; conferma prima di sostituire fasi esistenti)*
- `6965` — _percorsoShiftGiorni *(pura: ancora = ultima pesata)*
- `6975` — percorsoRiallinea *(⏩ trasla il piano, riprende dal giorno-fase dell'interruzione)*
- `7002` — _TRG_TIPI / `6744` _TRG_COMPORTAMENTI *(P122 T4 — tipi di traguardo e libreria comportamenti)*
- `7024` — _traguardiGet · `6761` _traguardoValoreAttuale *(valore corrente dai dati esistenti, null se manca)*
- `7063` — _traguardoVerso *(auto: dedotto dalla partenza)* · `6803` _traguardoValuta · `6824` _traguardiValuta
- `7104` — traguardoAdd · `6852` traguardoUpd · `6867` traguardoDel · `6873` traguardoSegna
- `7162` — _COND_TIPI · `6897` _percorsoCondizione *(pura: la fase finisce per soglia — SOLO suggerimento)*
- `7178` — percorsoSetCondizione · `6927` percorsoChiudiFase *(esito fotografato, riapribile)*
- `7212` — _traguardiHtml *(blocco 🏁 in fondo alla scheda Percorso)*
- `7310` — _percorsoVistaPaz / `7049` _percorsoVistaPazAttiva *(P122 T5 — modalità di sessione)*
- `7317` — _percorsoVittorie *(pura: vittorie dall'inizio del percorso + flag ricomposizione)*
- `7355` — _percorsoNascondiPeso *(in fase di massa il peso non si mostra al paziente)*
- `7366` — _traguardoFaseCorrente *(traguardo della fase IN CORSO, non quello lontano)*
- `7394` — _traguardoTestoPaziente *(righe in italiano semplice, riusate dal messaggio WhatsApp)*
- `7427` — _vistaPazienteHtml *(i tre riquadri che guarda il paziente)*
- `7507` — _percorsoChartSvg *(due corsie: peso + massa magra + cono proiezione sopra, striscia aderenza in mezzo (solo con dati P50), energia (kcal) sotto — tutto gated dagli interruttori)*
- `7696` — renderPdPercorso *(scheda: badge fase, riga proiezione/obiettivo, riga Piano vs Realtà (solo con dati), toolbar interruttori, grafico, editor)*

*(Tappa 2 tocca anche `calcolaMacros`: box obiettivo con intervallo al posto della data secca.)*

---

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 8300-8471

- `8300` — salvaAggiustamento
- `8333` — eliminaAggiustamento
- `8342` — renderPdNote
- `8377` — salvaNotaClinica
- `8392` — deleteNota
- `8401` — saveNote
- `8421` — resetSemaforoAuto *(F9 — pulsante 🔄 Ricalcola: pulisce gli automatici e rifà col sistema valido; il motore LEGACY non esiste più)*
- `8471` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 8697-8895

- `8697` — avviaFX
- `8725` — avviaAnalisi
- `8742` — _renderFlussoPanel
- `8786` — _riepEsc
- `8790` — _riepNum
- `8796` — _riepDelta
- `8804` — _riepDataSig
- `8822` — _riepParseFX
- `8087` — clean
- `8836` — _riepAggiornaFX
- `8862` — _riepToggleDomandaDefault
- `8874` — _riepAddDomanda
- `8887` — _riepRemoveDomanda
- `8895` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 9107-9334

- `8218` — dCol
- `8336` — card
- `9107` — renderPdRagionamento
- `9195` — inviaMessaggioRag
- `9213` — concludiERiassumi
- `9227` — salvaRagionamento
- `9248` — apriGeneratoreDaRag
- `9256` — nuovaSessioneRag
- `9262` — cancellaSavedRag
- `9272` — renderPazTimeline
- `9304` — renderPdAnamnesi
- `9334` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 11233-12368

- `11233` — _anNorm *(P125 — testo confrontabile: minuscole, niente accenti)*
- `11239` — _anCorrisponde *(P125 — ricerca per parole-prefisso: "vit d" trova "Vitamina D")*
- `11245` — filtraAnalisi *(P125 — filtro dal vivo delle 119 voci)*
- `11279` — pulisciRicercaAnalisi
- `11285` — renderPdAnalisi
- `11341` — toggleAnalisiSection
- `11490` — loadAnalisiSanguePDF
- `11377` — _impPdfConfigurata
- `11378` — _impPdfLib
- `11388` — _impPdfApri
- `11401` — _impPdfPagina *(P124b — una pagina del PDF → immagine, con la rotazione RILEVATA, non quella dichiarata dal file)*
- `11422` — _impRuotaImmagine
- `11447` — _impRilevaRotazione *(P124b — chiamata piccola: di quanti gradi va girata la pagina)*
- `11466` — _impPromptPagina *(P124b — prompt di UNA pagina, con l'impronta della riga: valore+unità+riferimento)*
- `11665` — _impNormalizzaNumero *(P124 — numero all'italiana → punto decimale, conversione fatta dall'app e non dall'AI)*
- `11676` — _impNumeri
- `11684` — _impSembraIntervallo
- `11692` — _impUgualeAlRange
- `11701` — _impLimitiStd
- `11722` — _impFuoriScala
- `11731` — _impCorrezioneVirgola
- `11743` — _impTestoLimiti
- `11764` — _impRifPlausibile *(P124b — un "riferimento" che è un'unità di misura = riga disallineata)*
- `11777` — _impUnitaCanonica
- `11799` — _impStessaGrandezza *(P124b — stesso tipo di misura a meno del prefisso: nanomoli/micromoli/millimoli)*
- `11816` — _impUnitaCompatibili
- `11827` — _impControllaValore *(P124 — i controlli anti-errore su un valore estratto)*
- `11891` — mostraDiffAnalisi *(P124 — colonna Estratto modificabile + righe sospette deselezionate)*
- `12081` — _calcoloIncluso
- `12087` — toggleCalcoloIncluso
- `12109` — _renderCalcoliPannello
- `12150` — toggleGlossario
- `12155` — updateAnalisi
- `12214` — salvaAnalisi
- `12227` — applicaGruppoClinico
- `12256` — renderBoxGruppiCliniciSuggeriti
- `12288` — suggerisciGruppiClinici
- `12368` — renderMemoriaInbody

---
### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9176 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `9464` — _richVal
- `9471` — _richBmi
- `9476` — _richPat
- `9482` — _richNum
- `9527` — _richPreselezione
- `9543` — richLeggiIntestazione
- `9547` — richSalvaIntestazione
- `9556` — apriRichiestaAnalisi
- `9576` — _richModaleHtml
- `9652` — _richEsc
- `9654` — _richMotivoCambia
- `9660` — _richToggleSez
- `9666` — _richAggiornaConteggi
- `9674` — _richMotivoCorrente
- `9684` — _richSelezione
- `9699` — _richTxt
- `9705` — _richCostruisciPDF
- `8969` — nuovaPagina
- `8970` — spazio
- `9801` — _richNomeFile
- `9806` — _richPrepara
- `9819` — _richRegistra
- `9824` — _richStato
- `9826` — richScaricaPDF
- `9875` — _richUpload
- `9877` — _richWaUrl
- `9884` — _richTestoWa
- `9898` — richInviaWhatsApp
- `9938` — richCopiaLink
- `9959` — _richStoricoHtml

---
### REFERTI DEL SANGUE DATATI — storico nel tempo (P118 tappa 1)
Righe 9194-9387 — migrazione, ordinamento, quadro attuale derivato, barra di selezione.

- `11010` — _refertoNuovoId
- `11013` — _refertoOggi
- `11017` — _refertoDataIt
- `11023` — _refertoConteggio
- `11037` — _refertiMigra
- `11064` — _refertiOrdinati
- `11075` — _refertoPiuRecente
- `11080` — _refertoInVista
- `11098` — _refertiApplica
- `11111` — _refertoCrea
- `11130` — refertoCambiaVista
- `11136` — refertoCambiaData
- `11148` — refertoNuovo
- `11156` — refertoDuplica
- `11165` — refertoElimina
- `11180` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `10623` — _rangeNum
- `10629` — _rangeTestoDa
- `10648` — _rangeCoppia
- `10658` — _rangeHtml

---
### ANDAMENTO NEL TEMPO — tracciato, variazione, grafico grande (P118 tappa 3)
Righe 9441-9745 — serie storica, regola del colore, sparkline, pannello in fondo.

- `10700` — _andLimiti
- `10721` — _andParseRangeLab
- `10734` — _andDistanza
- `10741` — _andValutazione
- `10754` — _andSerie
- `10768` — _andNum
- `10772` — _andDataBreve
- `10777` — _andMeseAnno
- `10785` — _andDominio
- `10799` — _andColore
- `10812` — _andSparkHtml
- `10838` — _andRigaHtml
- `10860` — _andEsamiSeguibili
- `10868` — andScegliEsame
- `10874` — _andPannelloHtml
- `10927` — _andGraficoGrande
- `10978` — _andPasso

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 12416-13634

- `12416` — _ibFmtBreve
- `12425` — _renderPesiIntermediSection
- `12474` — aggiungiPesoIntermedio
- `12490` — eliminaPesoIntermedio
- `12500` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `13634` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 13919-13919

- `13919` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 14297-16838

- `14297` — aggiornaLabelMacros
- `14315` — calcolaMacros
- `14456` — applicaSchema
- `14491` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `14497` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `14519` — _misuraDaReferto *(P127 — UN referto letto con le regole del traguardo: usata anche dalla verifica al controllo)*
- `14552` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `14563` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `14581` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `14694` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `14708` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `14764` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `14778` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `14810` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `14843` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `14885` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `14893` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `14904` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `14931` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `14946` — _stradeVerso *(le strade complete + percentuale libera)*
- `14993` — _VC_TOLLERANZA_PCT / _VC_GIORNI_MIN / _VC_GIORNI_MIN_RITARO / _VC_COPERTURA_MIN_PCT / _VC_MAGRA_PRUDENZA_GG *(P127 — soglie cliniche della verifica)*
- `15003` — _mediaSlotPrescritta *(media pesata sui giorni di un campo dello storico target; la usa anche _kcalMediaPrescrittaOss)*
- `15023` — _vcDeficitSlot *(deficit di uno slot: campo offset o kcal−tdee per gli slot vecchi)*
- `15031` — _vcTratto *(P127 — cosa è cambiato fra due referti, previsto vs reale, TDEE misurato)*
- `15085` — _vcTraguardoSalvato *(traguardo ricostruito dal salvato, per la scheda Percorso)*
- `15095` — _verificaControllo *(P127 — motore puro: tratto recente, quadro dall'inizio, residuo al ritmo reale)*
- `15133` — _verificaControlloHtml *(blocco 🔎, unica fonte per pannello 🎯 e scheda Percorso; azioni solo dove c'è il campo kcal)*
- `15225` — _vcRitara *(scrive le kcal ritarate nel campo regime: propone, non salva)*
- `15238` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `15306` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `15328` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `15381` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `15488` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `15503` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `15528` — _renderRifPesoBox
- `15579` — _usaRifPeso
- `15583` — _aggiornaRifPesoTarget
- `15586` — _aggiornaRegimeSlider
- `16243` — _presetRegime
- `16247` — _initRegimeSliderDaPaziente
- `16265` — ricalcolaLAF
- `16399` — renderStoricoTDEE
- `16433` — attivaSlotTDEE
- `16441` — eliminaSlotTDEE
- `16454` — _toggleCiclizzazione
- `16460` — _aggiornaAnteprimaCiclizzazione
- `16478` — salvaCalcoloMacros
- `16592` — _metAllenamento
- `16608` — _neatFrazione
- `16682` — _larnLafStileVita
- `16699` — _regimeOffset
- `16709` — _componiRegimeText
- `16742` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `16754` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `16761` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `16838` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 16856-17286

- `16856` — renderTargetBadge
- `16885` — verificaRegola_75_20_5
- `16922` — renderBadge75_20_5
- `16987` — _validaNorm
- `16990` — _validaMatchTermine
- `16998` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `17049` — _validaTesto
- `17070` — validaPiano
- `17144` — _validaFirmaBlocchi
- `17151` — renderBadgeValidatore
- `17182` — _validaVaiAlGiorno
- `17191` — apriPannelloValidatore
- `13472` — esc
- `17248` — _validaEseguiOverride
- `17271` — validaGateExport
- `17286` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 17419-18051

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
- `17419` — pianoPazSelezionato
- `17566` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `17804` — renderPanelMacrosGiorno
- `17947` — pmgCambiaGrammi
- `17974` — riapriPiano
- `18012` — _montaPianoCorrente
- `18051` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 18061-18530

- `18061` — pullTemplateSupabase
- `18072` — delTemplateSupabase
- `18081` — _promptTemplateNome
- `18106` — _creaTemplateDaJSON
- `18129` — salvaComeTemplate
- `18140` — salvaComeTemplateDaPiano
- `18149` — _normNomeAlim
- `18150` — _escRegAlim
- `18151` — _raccogliAlimentiDaPiano
- `18162` — _alimentiEsclusiPaziente
- `18174` — _trovaConflittiTemplate
- `18192` — _mostraAvvisoConflitti
- `18216` — applicaTemplate
- `18234` — apriPickerTemplate
- `18262` — _pickPaziente
- `18281` — applicaTemplatePick
- `18285` — rinominaTemplate
- `18296` — eliminaTemplate
- `18306` — renderLibreriaTemplate
- `18335` — renderStoricoPiani
- `18394` — eliminaPiano
- `18410` — _getActiveMacrosTarget
- `18434` — getTargetAttivi
- `18471` — calcolaTargetsCiclizzazione
- `18497` — _setupPianoTargets
- `18521` — getStagioneCorrente
- `18530` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 18992-18992

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `18992` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 19001-19460

- `19001` — aggiornaUIcolazione
- `19011` — salvaRegolePiano
- `19072` — _isModelloSistema
- `19075` — _isModelloSistemaModificato
- `19087` — caricaModelliCustomLocal
- `19101` — salvaModelliCustomLocal
- `19122` — _migraRecordCustom
- `19137` — _syncAliasLegacy
- `19146` — caricaAlimentiCustom
- `19170` — pushAlimentiCustomSupabase
- `19180` — pullAlimentiCustomSupabase
- `19194` — pushModelliSupabase
- `19212` — pullModelliSupabase
- `19237` — _calcolaFreqDaModello
- `19256` — aggiornaUImodello
- `19345` — popolaDropdownModelli
- `19373` — cambiaModelloRotazione
- `19379` — ripristinaModelloOriginale
- `19402` — eliminaModelloCustom
- `19420` — mostraAnteprimaModello
- `19430` — apriEditorModello
- `19460` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 19729-19967

- `15738` — rerender
- `19729` — _salvaModelloDaEditor
- `19771` — caricaRegolePiano
- `19801` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `19836` — _aiLogUsage
- `19858` — _aiProxyUrl
- `19864` — _aiTokenPerProxy
- `19893` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `19967` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 20046-20186

- `16216` — _risolviCollisioniCelle
- `20046` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `20106` — getFruttaStile
- `20113` — _fruttaGetPasto
- `20123` — _fruttaContaRigheRicetta
- `20127` — _fruttaIndiceBasePasto
- `20147` — getFruttaMarker
- `20160` — fruttaMarkerHtml
- `20168` — _fruttaCheckboxHtml
- `20177` — toggleFrutta
- `20186` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 20222-21496

- `20222` — _renderCelleGriglia
- `20302` — _renderRicetteTestuali
- `20341` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `20412` — _renderCelleHtml
- `20420` — toggleCellaMenu
- `20439` — closeAllCellaMenus
- `20447` — _trovaPasto
- `20455` — cellaSposta
- `20509` — cellaCancella
- `20530` — apriEditGrammatura
- `16789` — salva
- `20578` — cellaSwap
- `20598` — cellaRimuoviAlt
- `20612` — cellaAggiungiAlt
- `20715` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `20800` — apriEditRicetta
- `20809` — aggiungiRicetta
- `20825` — rimuoviRicetta
- `20834` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `20996` — ngAggiungiSpuntinoVuoto
- `21012` — apriAggiungiCella
- `17254` — risolviCompatibili
- `21108` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `21200` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `21341` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `21496` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 21544-21936

- `21544` — _attesoStrutturaPiano
- `21564` — _confrontaStrutturaPiano
- `21594` — _costruisciPromptDelta
- `21621` — _pianoToolSchema
- `21696` — _pianoMaxTokens
- `21705` — _estraiPianoDaRisposta
- `21727` — chiamaGeneraPiano
- `21894` — mostraLoadingSteps
- `18123` — render
- `21936` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 22003-22580

- `22003` — generaMessaggioAI
- `22108` — copiaMessaggioAI
- `22118` — salvaInStorico
- `22130` — salvaVarianteAI
- `22145` — renderVariantiSalvate
- `22164` — usaVariante
- `22182` — eliminaVariante
- `22193` — renderStoricoMsg
- `22209` — apriWhatsApp
- `22580` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 22758-24255

- `22758` — _ngColoreSemaforoNome
- `22766` — apriSceltaModalitaPiano
- `22801` — _ngChiudiModalita
- `22804` — _ngCostruisciGiornoVuoto
- `22837` — _ngCostruisciGiornoSpeciale
- `22848` — _ngIndiceInizioSpeciali
- `22859` — _ngModalitaNomeGiorno
- `22865` — _ngImpostaModalitaNomeGiorno
- `22868` — _ngLettera
- `22875` — _ngEtichettaGiorno
- `22895` — _ngEtichettaGiornoBreve
- `22909` — _ngToggleGiornoSpeciale
- `22933` — _ngRenderPannelloSpeciale
- `23001` — _generaGiornoSpecialeAI
- `23101` — _ngGiornoHaContenuto
- `23113` — _ngCreaPianoManuale
- `23136` — _ngScrollTabGiorni
- `23146` — _ngAbilitaDragScroll
- `23183` — _ngCambiaNumeroGiorni
- `23215` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `23229` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `23270` — _ngToggleCat
- `23279` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `23303` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `23459` — _ngSalvaPianoManuale
- `23485` — _ngParseIngrediente
- `23509` — _ngScomponiIngredienti
- `23521` — _ricCalcolaMacroDaIngredienti
- `23539` — _ricRicalcolaMacroLive
- `23546` — _ricAggiornaInfoMacro
- `23560` — _ricRicalcolaMacroLiveNow
- `23584` — _ngTrovaCategoriaAlimento
- `23617` — _ngPescaRicetta
- `23660` — _ngScomponiRicettaNelPasto
- `23697` — _ngDragStart
- `23708` — _ngDragStartCella
- `23719` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `23726` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `23731` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `23750` — _ngAggiungiAlimento
- `23775` — _ngRimuoviAlimento
- `23789` — _ngDopoModifica
- `23807` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `23860` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `23889` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `23906` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `23914` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `23986` — gramTestoCasalingo
- `24012` — _appendToggleNutrizionali
- `24055` — _appendTogglePromemoria
- `24084` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `24230` — cpFromEmoji
- `24236` — getEmojiCp
- `24255` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `22230` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `22252` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `22257` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `22283` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `22371` — _spesaTestoWhatsApp
- `22387` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `22432` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `22455` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `22483` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `22543` — scaricaListaSpesaPDF (download diretto, un click)
- `22551` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `22563` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 25403-25403

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
- `25403` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 25415-25622

- `25415` — salvaInbody
- `25480` — delInbody
- `25487` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `25622` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 25650-26119

- `25650` — buildSemLegenda
- `25664` — renderAlEditor
- `25725` — _alimNomeRegex
- `25733` — _alimGiorniDaPiano
- `25741` — _scanGiorniPerNome
- `25756` — scanRiferimentiAlimento
- `25785` — _alimRefsRighe
- `25791` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `25879` — modificaAlimentoCustom
- `25899` — ripristinaValoriPrecedentiAlimento
- `25911` — _resetAlimModal
- `25922` — apriNuovoAlimentoCustom
- `25928` — salvaAlimentoCustom
- `25995` — eliminaAlimentoCustom
- `26026` — _alimFonteBadge
- `26031` — renderAlimentiPage
- `22217` — E
- `26101` — archiviaAlimentoCustom
- `26119` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 26146-26383

- `26146` — _bcSetStatus
- `26148` — apriScannerBarcode
- `26156` — chiudiScannerBarcode
- `26161` — _bcStopCamera
- `26169` — _bcModaleAperto
- `26171` — _bcAvviaCamera
- `26182` — _bcAvviaNativo
- `26202` — _bcAvviaZXing
- `26211` — _bcZXStart
- `26222` — _bcErroreCamera
- `26230` — cercaBarcodeManuale
- `26236` — _barcodeTrovato
- `26252` — cercaBarcodeOFF
- `26270` — _bcProdottoNonTrovato
- `26284` — _bcPrecompilaForm
- `22477` — num
- `26308` — togAl
- `26361` — selCatAl
- `25402` — selTuttiAl
- `26383` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 26397-26713

- `26397` — setCalView
- `26398` — calPrev
- `26399` — calNext
- `26400` — calToday
- `26402` — renderCal
- `26416` — renderCalMonth
- `26440` — renderCalWeek
- `26458` — renderCalDay
- `26474` — selGiorno
- `26488` — setDisp
- `26493` — openAddEvento
- `26506` — openAddEventoPaz
- `26512` — toggleEntrataCheck
- `26517` — salvaEvento
- `26540` — openEvDetail
- `26595` — delEvento
- `26603` — copyMsg
- `26610` — aggDateCal
- `26615` — syncInizio
- `26616` — syncControllo
- `26617` — aggiornaPrev
- `26634` — renderRic
- `26661` — openNuovaRic
- `26662` — editRic
- `26672` — salvaRic
- `26697` — delRic
- `26713` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 26798-26858

- `26798` — aggiungiEntrataPerPaziente
- `26815` — openNuovaEntrata
- `26829` — salvaEntrata
- `26850` — delEntrata
- `26858` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 26888-27358

- `26888` — aiSuggerisciRicetta
- `26933` — renderConcettiModal
- `26952` — apriConcettiModal
- `26979` — salvaConcettiAllegati
- `27003` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `27041` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `27050` — loadInbodyPDF
- `27168` — _vitdLabel
- `27172` — getIntegratori
- `27176` — getIntegraWant
- `27180` — setIntegratori
- `27197` — setIntegraWant
- `27235` — getPatologieChip
- `27236` — getAllergieChip
- `27237` — setPatologieChip
- `27238` — setAllergieChip
- `27239` — getPatologie
- `27240` — getAllergie
- `27241` — setPatologieFromStr
- `27248` — setAllergieFromStr
- `27261` — getSdvChip
- `27262` — getCspChip
- `27263` — setSdvChip
- `27264` — setCspChip
- `27265` — setSdvFromStr
- `27266` — setCspFromStr
- `27270` — getBudget
- `27271` — setBudget
- `27276` — renderCalAnno
- `27307` — comprimeImmagine
- `27329` — uploadImmagineConcetto
- `27348` — rimuoviImmagineConcetto
- `27358` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 27424-27528

- `27424` — entraSelConcetti
- `27425` — annullaSelConcetti
- `27426` — toggleConcettoSel
- `27431` — eliminaConcettiSelezionati
- `27450` — confermaEliminaConcetti
- `27465` — aiRiscriviConcetto
- `27479` — editConcetto
- `27497` — salvaConcetto
- `27508` — openNuovoConcetto
- `27528` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 27529-27692

- `27529` — saveAgendaPersonale
- `27530` — getAgendaTodo
- `27531` — saveAgendaTodo
- `27533` — pulisciAgendaVecchia
- `27537` — navigaAgenda
- `27546` — toggleFormAgenda
- `27547` — toggleFormTodo
- `27549` — salvaAgendaItem
- `27563` — salvaTodoItem
- `27575` — toggleAgendaFatto
- `27583` — toggleTodoFatto
- `27596` — _catCol
- `27598` — renderAgendaDx
- `27692` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 27818-28022

- `27818` — renderScadenzeAlert
- `28003` — segnaGestito
- `28022` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 28031-28106

- `28031` — ripristinaPaz
- `28039` — eliminaPaz
- `28084` — getDove
- `28088` — setDove
- `28106` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 28111-28551

- `28111` — getCredenzialiPersistenti
- `28124` — cancellaCredenzialiPersistenti
- `28129` — rinnovaSessioneConRefreshToken
- `28146` — getSessioneSalvata
- `28165` — salvaSessione
- `28175` — cancellaSessione
- `28179` — eseguiLogin
- `28226` — eseguiLogout
- `28248` — mostraApp
- `28253` — verificaSessioneEAvvia
- `28281` — assicuraTokenValido
- `28310` — _garantiscoSessionePerSync
- `28322` — avviaRinnovoTokenPeriodico
- `28326` — fermaRinnovoTokenPeriodico
- `28335` — _authReset
- `28340` — _authMostra
- `28343` — mostraLogin
- `28344` — mostraRegistrazione
- `28345` — mostraRecupero
- `28346` — mostraNuovaPassword
- `28349` — eseguiRegistrazione
- `28387` — eseguiRecuperoPassword
- `28416` — eseguiNuovaPassword
- `28450` — _parseHashParams
- `28457` — _pulisciHash
- `28461` — gestisciRitornoAuth
- `28551` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 28623-28746

- `28623` — apriPannelloRicette
- `28652` — chiudiPannelloRicette
- `28660` — applicaRicettaPasto
- `28696` — inizializzaP2
- `28708` — deepClone
- `28712` — applicaPatch
- `28746` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
