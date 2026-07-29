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
Righe 12416-13518

- `12416` — _ibFmtBreve
- `12425` — _renderPesiIntermediSection
- `12474` — aggiungiPesoIntermedio
- `12490` — eliminaPesoIntermedio
- `12500` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `13518` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 13803-13803

- `13803` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 14181-16722

- `14181` — aggiornaLabelMacros
- `14199` — calcolaMacros
- `14340` — applicaSchema
- `14375` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `14381` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `14403` — _misuraDaReferto *(P127 — UN referto letto con le regole del traguardo: usata anche dalla verifica al controllo)*
- `14436` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `14447` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `14465` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `14578` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `14592` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `14648` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `14662` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `14694` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `14727` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `14769` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `14777` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `14788` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `14815` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `14830` — _stradeVerso *(le strade complete + percentuale libera)*
- `14877` — _VC_TOLLERANZA_PCT / _VC_GIORNI_MIN / _VC_GIORNI_MIN_RITARO / _VC_COPERTURA_MIN_PCT / _VC_MAGRA_PRUDENZA_GG *(P127 — soglie cliniche della verifica)*
- `14887` — _mediaSlotPrescritta *(media pesata sui giorni di un campo dello storico target; la usa anche _kcalMediaPrescrittaOss)*
- `14907` — _vcDeficitSlot *(deficit di uno slot: campo offset o kcal−tdee per gli slot vecchi)*
- `14915` — _vcTratto *(P127 — cosa è cambiato fra due referti, previsto vs reale, TDEE misurato)*
- `14969` — _vcTraguardoSalvato *(traguardo ricostruito dal salvato, per la scheda Percorso)*
- `14979` — _verificaControllo *(P127 — motore puro: tratto recente, quadro dall'inizio, residuo al ritmo reale)*
- `15017` — _verificaControlloHtml *(blocco 🔎, unica fonte per pannello 🎯 e scheda Percorso; azioni solo dove c'è il campo kcal)*
- `15109` — _vcRitara *(scrive le kcal ritarate nel campo regime: propone, non salva)*
- `15122` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `15190` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `15212` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `15265` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `15372` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `15387` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `15412` — _renderRifPesoBox
- `15463` — _usaRifPeso
- `15467` — _aggiornaRifPesoTarget
- `15470` — _aggiornaRegimeSlider
- `16127` — _presetRegime
- `16131` — _initRegimeSliderDaPaziente
- `16149` — ricalcolaLAF
- `16283` — renderStoricoTDEE
- `16317` — attivaSlotTDEE
- `16325` — eliminaSlotTDEE
- `16338` — _toggleCiclizzazione
- `16344` — _aggiornaAnteprimaCiclizzazione
- `16362` — salvaCalcoloMacros
- `16476` — _metAllenamento
- `16492` — _neatFrazione
- `16566` — _larnLafStileVita
- `16583` — _regimeOffset
- `16593` — _componiRegimeText
- `16626` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `16638` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `16645` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `16722` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 16740-17170

- `16740` — renderTargetBadge
- `16769` — verificaRegola_75_20_5
- `16806` — renderBadge75_20_5
- `16871` — _validaNorm
- `16874` — _validaMatchTermine
- `16882` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `16933` — _validaTesto
- `16954` — validaPiano
- `17028` — _validaFirmaBlocchi
- `17035` — renderBadgeValidatore
- `17066` — _validaVaiAlGiorno
- `17075` — apriPannelloValidatore
- `13472` — esc
- `17132` — _validaEseguiOverride
- `17155` — validaGateExport
- `17170` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 17303-17935

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
- `17303` — pianoPazSelezionato
- `17450` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `17688` — renderPanelMacrosGiorno
- `17831` — pmgCambiaGrammi
- `17858` — riapriPiano
- `17896` — _montaPianoCorrente
- `17935` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 17945-18414

- `17945` — pullTemplateSupabase
- `17956` — delTemplateSupabase
- `17965` — _promptTemplateNome
- `17990` — _creaTemplateDaJSON
- `18013` — salvaComeTemplate
- `18024` — salvaComeTemplateDaPiano
- `18033` — _normNomeAlim
- `18034` — _escRegAlim
- `18035` — _raccogliAlimentiDaPiano
- `18046` — _alimentiEsclusiPaziente
- `18058` — _trovaConflittiTemplate
- `18076` — _mostraAvvisoConflitti
- `18100` — applicaTemplate
- `18118` — apriPickerTemplate
- `18146` — _pickPaziente
- `18165` — applicaTemplatePick
- `18169` — rinominaTemplate
- `18180` — eliminaTemplate
- `18190` — renderLibreriaTemplate
- `18219` — renderStoricoPiani
- `18278` — eliminaPiano
- `18294` — _getActiveMacrosTarget
- `18318` — getTargetAttivi
- `18355` — calcolaTargetsCiclizzazione
- `18381` — _setupPianoTargets
- `18405` — getStagioneCorrente
- `18414` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 18876-18876

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `18876` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 18885-19344

- `18885` — aggiornaUIcolazione
- `18895` — salvaRegolePiano
- `18956` — _isModelloSistema
- `18959` — _isModelloSistemaModificato
- `18971` — caricaModelliCustomLocal
- `18985` — salvaModelliCustomLocal
- `19006` — _migraRecordCustom
- `19021` — _syncAliasLegacy
- `19030` — caricaAlimentiCustom
- `19054` — pushAlimentiCustomSupabase
- `19064` — pullAlimentiCustomSupabase
- `19078` — pushModelliSupabase
- `19096` — pullModelliSupabase
- `19121` — _calcolaFreqDaModello
- `19140` — aggiornaUImodello
- `19229` — popolaDropdownModelli
- `19257` — cambiaModelloRotazione
- `19263` — ripristinaModelloOriginale
- `19286` — eliminaModelloCustom
- `19304` — mostraAnteprimaModello
- `19314` — apriEditorModello
- `19344` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 19613-19851

- `15738` — rerender
- `19613` — _salvaModelloDaEditor
- `19655` — caricaRegolePiano
- `19685` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `19720` — _aiLogUsage
- `19742` — _aiProxyUrl
- `19748` — _aiTokenPerProxy
- `19777` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `19851` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 19930-20070

- `16216` — _risolviCollisioniCelle
- `19930` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `19990` — getFruttaStile
- `19997` — _fruttaGetPasto
- `20007` — _fruttaContaRigheRicetta
- `20011` — _fruttaIndiceBasePasto
- `20031` — getFruttaMarker
- `20044` — fruttaMarkerHtml
- `20052` — _fruttaCheckboxHtml
- `20061` — toggleFrutta
- `20070` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 20106-21380

- `20106` — _renderCelleGriglia
- `20186` — _renderRicetteTestuali
- `20225` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `20296` — _renderCelleHtml
- `20304` — toggleCellaMenu
- `20323` — closeAllCellaMenus
- `20331` — _trovaPasto
- `20339` — cellaSposta
- `20393` — cellaCancella
- `20414` — apriEditGrammatura
- `16789` — salva
- `20462` — cellaSwap
- `20482` — cellaRimuoviAlt
- `20496` — cellaAggiungiAlt
- `20599` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `20684` — apriEditRicetta
- `20693` — aggiungiRicetta
- `20709` — rimuoviRicetta
- `20718` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `20880` — ngAggiungiSpuntinoVuoto
- `20896` — apriAggiungiCella
- `17254` — risolviCompatibili
- `20992` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `21084` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `21225` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `21380` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 21428-21820

- `21428` — _attesoStrutturaPiano
- `21448` — _confrontaStrutturaPiano
- `21478` — _costruisciPromptDelta
- `21505` — _pianoToolSchema
- `21580` — _pianoMaxTokens
- `21589` — _estraiPianoDaRisposta
- `21611` — chiamaGeneraPiano
- `21778` — mostraLoadingSteps
- `18123` — render
- `21820` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 21887-22464

- `21887` — generaMessaggioAI
- `21992` — copiaMessaggioAI
- `22002` — salvaInStorico
- `22014` — salvaVarianteAI
- `22029` — renderVariantiSalvate
- `22048` — usaVariante
- `22066` — eliminaVariante
- `22077` — renderStoricoMsg
- `22093` — apriWhatsApp
- `22464` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 22642-24139

- `22642` — _ngColoreSemaforoNome
- `22650` — apriSceltaModalitaPiano
- `22685` — _ngChiudiModalita
- `22688` — _ngCostruisciGiornoVuoto
- `22721` — _ngCostruisciGiornoSpeciale
- `22732` — _ngIndiceInizioSpeciali
- `22743` — _ngModalitaNomeGiorno
- `22749` — _ngImpostaModalitaNomeGiorno
- `22752` — _ngLettera
- `22759` — _ngEtichettaGiorno
- `22779` — _ngEtichettaGiornoBreve
- `22793` — _ngToggleGiornoSpeciale
- `22817` — _ngRenderPannelloSpeciale
- `22885` — _generaGiornoSpecialeAI
- `22985` — _ngGiornoHaContenuto
- `22997` — _ngCreaPianoManuale
- `23020` — _ngScrollTabGiorni
- `23030` — _ngAbilitaDragScroll
- `23067` — _ngCambiaNumeroGiorni
- `23099` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `23113` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `23154` — _ngToggleCat
- `23163` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `23187` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `23343` — _ngSalvaPianoManuale
- `23369` — _ngParseIngrediente
- `23393` — _ngScomponiIngredienti
- `23405` — _ricCalcolaMacroDaIngredienti
- `23423` — _ricRicalcolaMacroLive
- `23430` — _ricAggiornaInfoMacro
- `23444` — _ricRicalcolaMacroLiveNow
- `23468` — _ngTrovaCategoriaAlimento
- `23501` — _ngPescaRicetta
- `23544` — _ngScomponiRicettaNelPasto
- `23581` — _ngDragStart
- `23592` — _ngDragStartCella
- `23603` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `23610` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `23615` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `23634` — _ngAggiungiAlimento
- `23659` — _ngRimuoviAlimento
- `23673` — _ngDopoModifica
- `23691` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `23744` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `23773` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `23790` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `23798` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `23870` — gramTestoCasalingo
- `23896` — _appendToggleNutrizionali
- `23939` — _appendTogglePromemoria
- `23968` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `24114` — cpFromEmoji
- `24120` — getEmojiCp
- `24139` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `22114` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `22136` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `22141` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `22167` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `22255` — _spesaTestoWhatsApp
- `22271` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `22316` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `22339` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `22367` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `22427` — scaricaListaSpesaPDF (download diretto, un click)
- `22435` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `22447` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 25287-25287

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
- `25287` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 25299-25506

- `25299` — salvaInbody
- `25364` — delInbody
- `25371` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `25506` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 25534-26003

- `25534` — buildSemLegenda
- `25548` — renderAlEditor
- `25609` — _alimNomeRegex
- `25617` — _alimGiorniDaPiano
- `25625` — _scanGiorniPerNome
- `25640` — scanRiferimentiAlimento
- `25669` — _alimRefsRighe
- `25675` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `25763` — modificaAlimentoCustom
- `25783` — ripristinaValoriPrecedentiAlimento
- `25795` — _resetAlimModal
- `25806` — apriNuovoAlimentoCustom
- `25812` — salvaAlimentoCustom
- `25879` — eliminaAlimentoCustom
- `25910` — _alimFonteBadge
- `25915` — renderAlimentiPage
- `22217` — E
- `25985` — archiviaAlimentoCustom
- `26003` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 26030-26267

- `26030` — _bcSetStatus
- `26032` — apriScannerBarcode
- `26040` — chiudiScannerBarcode
- `26045` — _bcStopCamera
- `26053` — _bcModaleAperto
- `26055` — _bcAvviaCamera
- `26066` — _bcAvviaNativo
- `26086` — _bcAvviaZXing
- `26095` — _bcZXStart
- `26106` — _bcErroreCamera
- `26114` — cercaBarcodeManuale
- `26120` — _barcodeTrovato
- `26136` — cercaBarcodeOFF
- `26154` — _bcProdottoNonTrovato
- `26168` — _bcPrecompilaForm
- `22477` — num
- `26192` — togAl
- `26245` — selCatAl
- `25402` — selTuttiAl
- `26267` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 26281-26597

- `26281` — setCalView
- `26282` — calPrev
- `26283` — calNext
- `26284` — calToday
- `26286` — renderCal
- `26300` — renderCalMonth
- `26324` — renderCalWeek
- `26342` — renderCalDay
- `26358` — selGiorno
- `26372` — setDisp
- `26377` — openAddEvento
- `26390` — openAddEventoPaz
- `26396` — toggleEntrataCheck
- `26401` — salvaEvento
- `26424` — openEvDetail
- `26479` — delEvento
- `26487` — copyMsg
- `26494` — aggDateCal
- `26499` — syncInizio
- `26500` — syncControllo
- `26501` — aggiornaPrev
- `26518` — renderRic
- `26545` — openNuovaRic
- `26546` — editRic
- `26556` — salvaRic
- `26581` — delRic
- `26597` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 26682-26742

- `26682` — aggiungiEntrataPerPaziente
- `26699` — openNuovaEntrata
- `26713` — salvaEntrata
- `26734` — delEntrata
- `26742` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 26772-27242

- `26772` — aiSuggerisciRicetta
- `26817` — renderConcettiModal
- `26836` — apriConcettiModal
- `26863` — salvaConcettiAllegati
- `26887` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `26925` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `26934` — loadInbodyPDF
- `27052` — _vitdLabel
- `27056` — getIntegratori
- `27060` — getIntegraWant
- `27064` — setIntegratori
- `27081` — setIntegraWant
- `27119` — getPatologieChip
- `27120` — getAllergieChip
- `27121` — setPatologieChip
- `27122` — setAllergieChip
- `27123` — getPatologie
- `27124` — getAllergie
- `27125` — setPatologieFromStr
- `27132` — setAllergieFromStr
- `27145` — getSdvChip
- `27146` — getCspChip
- `27147` — setSdvChip
- `27148` — setCspChip
- `27149` — setSdvFromStr
- `27150` — setCspFromStr
- `27154` — getBudget
- `27155` — setBudget
- `27160` — renderCalAnno
- `27191` — comprimeImmagine
- `27213` — uploadImmagineConcetto
- `27232` — rimuoviImmagineConcetto
- `27242` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 27308-27412

- `27308` — entraSelConcetti
- `27309` — annullaSelConcetti
- `27310` — toggleConcettoSel
- `27315` — eliminaConcettiSelezionati
- `27334` — confermaEliminaConcetti
- `27349` — aiRiscriviConcetto
- `27363` — editConcetto
- `27381` — salvaConcetto
- `27392` — openNuovoConcetto
- `27412` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 27413-27576

- `27413` — saveAgendaPersonale
- `27414` — getAgendaTodo
- `27415` — saveAgendaTodo
- `27417` — pulisciAgendaVecchia
- `27421` — navigaAgenda
- `27430` — toggleFormAgenda
- `27431` — toggleFormTodo
- `27433` — salvaAgendaItem
- `27447` — salvaTodoItem
- `27459` — toggleAgendaFatto
- `27467` — toggleTodoFatto
- `27480` — _catCol
- `27482` — renderAgendaDx
- `27576` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 27702-27906

- `27702` — renderScadenzeAlert
- `27887` — segnaGestito
- `27906` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 27915-27990

- `27915` — ripristinaPaz
- `27923` — eliminaPaz
- `27968` — getDove
- `27972` — setDove
- `27990` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 27995-28435

- `27995` — getCredenzialiPersistenti
- `28008` — cancellaCredenzialiPersistenti
- `28013` — rinnovaSessioneConRefreshToken
- `28030` — getSessioneSalvata
- `28049` — salvaSessione
- `28059` — cancellaSessione
- `28063` — eseguiLogin
- `28110` — eseguiLogout
- `28132` — mostraApp
- `28137` — verificaSessioneEAvvia
- `28165` — assicuraTokenValido
- `28194` — _garantiscoSessionePerSync
- `28206` — avviaRinnovoTokenPeriodico
- `28210` — fermaRinnovoTokenPeriodico
- `28219` — _authReset
- `28224` — _authMostra
- `28227` — mostraLogin
- `28228` — mostraRegistrazione
- `28229` — mostraRecupero
- `28230` — mostraNuovaPassword
- `28233` — eseguiRegistrazione
- `28271` — eseguiRecuperoPassword
- `28300` — eseguiNuovaPassword
- `28334` — _parseHashParams
- `28341` — _pulisciHash
- `28345` — gestisciRitornoAuth
- `28435` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 28507-28630

- `28507` — apriPannelloRicette
- `28536` — chiudiPannelloRicette
- `28544` — applicaRicettaPasto
- `28580` — inizializzaP2
- `28592` — deepClone
- `28596` — applicaPatch
- `28630` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
