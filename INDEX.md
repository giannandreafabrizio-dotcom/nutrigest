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
Righe 12416-13478

- `12416` — _ibFmtBreve
- `12425` — _renderPesiIntermediSection
- `12474` — aggiungiPesoIntermedio
- `12490` — eliminaPesoIntermedio
- `12500` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `13478` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 13755-13755

- `13755` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 14133-16674

- `14133` — aggiornaLabelMacros
- `14151` — calcolaMacros
- `14292` — applicaSchema
- `14327` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `14333` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `14355` — _misuraDaReferto *(P127 — UN referto letto con le regole del traguardo: usata anche dalla verifica al controllo)*
- `14388` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `14399` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `14417` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `14530` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `14544` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `14600` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `14614` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `14646` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `14679` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `14721` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `14729` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `14740` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `14767` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `14782` — _stradeVerso *(le strade complete + percentuale libera)*
- `14829` — _VC_TOLLERANZA_PCT / _VC_GIORNI_MIN / _VC_GIORNI_MIN_RITARO / _VC_COPERTURA_MIN_PCT / _VC_MAGRA_PRUDENZA_GG *(P127 — soglie cliniche della verifica)*
- `14839` — _mediaSlotPrescritta *(media pesata sui giorni di un campo dello storico target; la usa anche _kcalMediaPrescrittaOss)*
- `14859` — _vcDeficitSlot *(deficit di uno slot: campo offset o kcal−tdee per gli slot vecchi)*
- `14867` — _vcTratto *(P127 — cosa è cambiato fra due referti, previsto vs reale, TDEE misurato)*
- `14921` — _vcTraguardoSalvato *(traguardo ricostruito dal salvato, per la scheda Percorso)*
- `14931` — _verificaControllo *(P127 — motore puro: tratto recente, quadro dall'inizio, residuo al ritmo reale)*
- `14969` — _verificaControlloHtml *(blocco 🔎, unica fonte per pannello 🎯 e scheda Percorso; azioni solo dove c'è il campo kcal)*
- `15061` — _vcRitara *(scrive le kcal ritarate nel campo regime: propone, non salva)*
- `15074` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `15142` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `15164` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `15217` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `15324` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `15339` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `15364` — _renderRifPesoBox
- `15415` — _usaRifPeso
- `15419` — _aggiornaRifPesoTarget
- `15422` — _aggiornaRegimeSlider
- `16079` — _presetRegime
- `16083` — _initRegimeSliderDaPaziente
- `16101` — ricalcolaLAF
- `16235` — renderStoricoTDEE
- `16269` — attivaSlotTDEE
- `16277` — eliminaSlotTDEE
- `16290` — _toggleCiclizzazione
- `16296` — _aggiornaAnteprimaCiclizzazione
- `16314` — salvaCalcoloMacros
- `16428` — _metAllenamento
- `16444` — _neatFrazione
- `16518` — _larnLafStileVita
- `16535` — _regimeOffset
- `16545` — _componiRegimeText
- `16578` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `16590` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `16597` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `16674` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 16692-17122

- `16692` — renderTargetBadge
- `16721` — verificaRegola_75_20_5
- `16758` — renderBadge75_20_5
- `16823` — _validaNorm
- `16826` — _validaMatchTermine
- `16834` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `16885` — _validaTesto
- `16906` — validaPiano
- `16980` — _validaFirmaBlocchi
- `16987` — renderBadgeValidatore
- `17018` — _validaVaiAlGiorno
- `17027` — apriPannelloValidatore
- `13472` — esc
- `17084` — _validaEseguiOverride
- `17107` — validaGateExport
- `17122` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 17255-17887

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
- `17255` — pianoPazSelezionato
- `17402` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `17640` — renderPanelMacrosGiorno
- `17783` — pmgCambiaGrammi
- `17810` — riapriPiano
- `17848` — _montaPianoCorrente
- `17887` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 17897-18366

- `17897` — pullTemplateSupabase
- `17908` — delTemplateSupabase
- `17917` — _promptTemplateNome
- `17942` — _creaTemplateDaJSON
- `17965` — salvaComeTemplate
- `17976` — salvaComeTemplateDaPiano
- `17985` — _normNomeAlim
- `17986` — _escRegAlim
- `17987` — _raccogliAlimentiDaPiano
- `17998` — _alimentiEsclusiPaziente
- `18010` — _trovaConflittiTemplate
- `18028` — _mostraAvvisoConflitti
- `18052` — applicaTemplate
- `18070` — apriPickerTemplate
- `18098` — _pickPaziente
- `18117` — applicaTemplatePick
- `18121` — rinominaTemplate
- `18132` — eliminaTemplate
- `18142` — renderLibreriaTemplate
- `18171` — renderStoricoPiani
- `18230` — eliminaPiano
- `18246` — _getActiveMacrosTarget
- `18270` — getTargetAttivi
- `18307` — calcolaTargetsCiclizzazione
- `18333` — _setupPianoTargets
- `18357` — getStagioneCorrente
- `18366` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 18828-18828

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `18828` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 18837-19296

- `18837` — aggiornaUIcolazione
- `18847` — salvaRegolePiano
- `18908` — _isModelloSistema
- `18911` — _isModelloSistemaModificato
- `18923` — caricaModelliCustomLocal
- `18937` — salvaModelliCustomLocal
- `18958` — _migraRecordCustom
- `18973` — _syncAliasLegacy
- `18982` — caricaAlimentiCustom
- `19006` — pushAlimentiCustomSupabase
- `19016` — pullAlimentiCustomSupabase
- `19030` — pushModelliSupabase
- `19048` — pullModelliSupabase
- `19073` — _calcolaFreqDaModello
- `19092` — aggiornaUImodello
- `19181` — popolaDropdownModelli
- `19209` — cambiaModelloRotazione
- `19215` — ripristinaModelloOriginale
- `19238` — eliminaModelloCustom
- `19256` — mostraAnteprimaModello
- `19266` — apriEditorModello
- `19296` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 19565-19803

- `15738` — rerender
- `19565` — _salvaModelloDaEditor
- `19607` — caricaRegolePiano
- `19637` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `19672` — _aiLogUsage
- `19694` — _aiProxyUrl
- `19700` — _aiTokenPerProxy
- `19729` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `19803` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 19882-20022

- `16216` — _risolviCollisioniCelle
- `19882` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `19942` — getFruttaStile
- `19949` — _fruttaGetPasto
- `19959` — _fruttaContaRigheRicetta
- `19963` — _fruttaIndiceBasePasto
- `19983` — getFruttaMarker
- `19996` — fruttaMarkerHtml
- `20004` — _fruttaCheckboxHtml
- `20013` — toggleFrutta
- `20022` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 20058-21332

- `20058` — _renderCelleGriglia
- `20138` — _renderRicetteTestuali
- `20177` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `20248` — _renderCelleHtml
- `20256` — toggleCellaMenu
- `20275` — closeAllCellaMenus
- `20283` — _trovaPasto
- `20291` — cellaSposta
- `20345` — cellaCancella
- `20366` — apriEditGrammatura
- `16789` — salva
- `20414` — cellaSwap
- `20434` — cellaRimuoviAlt
- `20448` — cellaAggiungiAlt
- `20551` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `20636` — apriEditRicetta
- `20645` — aggiungiRicetta
- `20661` — rimuoviRicetta
- `20670` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `20832` — ngAggiungiSpuntinoVuoto
- `20848` — apriAggiungiCella
- `17254` — risolviCompatibili
- `20944` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `21036` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `21177` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `21332` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 21380-21772

- `21380` — _attesoStrutturaPiano
- `21400` — _confrontaStrutturaPiano
- `21430` — _costruisciPromptDelta
- `21457` — _pianoToolSchema
- `21532` — _pianoMaxTokens
- `21541` — _estraiPianoDaRisposta
- `21563` — chiamaGeneraPiano
- `21730` — mostraLoadingSteps
- `18123` — render
- `21772` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 21839-22416

- `21839` — generaMessaggioAI
- `21944` — copiaMessaggioAI
- `21954` — salvaInStorico
- `21966` — salvaVarianteAI
- `21981` — renderVariantiSalvate
- `22000` — usaVariante
- `22018` — eliminaVariante
- `22029` — renderStoricoMsg
- `22045` — apriWhatsApp
- `22416` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 22594-24091

- `22594` — _ngColoreSemaforoNome
- `22602` — apriSceltaModalitaPiano
- `22637` — _ngChiudiModalita
- `22640` — _ngCostruisciGiornoVuoto
- `22673` — _ngCostruisciGiornoSpeciale
- `22684` — _ngIndiceInizioSpeciali
- `22695` — _ngModalitaNomeGiorno
- `22701` — _ngImpostaModalitaNomeGiorno
- `22704` — _ngLettera
- `22711` — _ngEtichettaGiorno
- `22731` — _ngEtichettaGiornoBreve
- `22745` — _ngToggleGiornoSpeciale
- `22769` — _ngRenderPannelloSpeciale
- `22837` — _generaGiornoSpecialeAI
- `22937` — _ngGiornoHaContenuto
- `22949` — _ngCreaPianoManuale
- `22972` — _ngScrollTabGiorni
- `22982` — _ngAbilitaDragScroll
- `23019` — _ngCambiaNumeroGiorni
- `23051` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `23065` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `23106` — _ngToggleCat
- `23115` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `23139` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `23295` — _ngSalvaPianoManuale
- `23321` — _ngParseIngrediente
- `23345` — _ngScomponiIngredienti
- `23357` — _ricCalcolaMacroDaIngredienti
- `23375` — _ricRicalcolaMacroLive
- `23382` — _ricAggiornaInfoMacro
- `23396` — _ricRicalcolaMacroLiveNow
- `23420` — _ngTrovaCategoriaAlimento
- `23453` — _ngPescaRicetta
- `23496` — _ngScomponiRicettaNelPasto
- `23533` — _ngDragStart
- `23544` — _ngDragStartCella
- `23555` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `23562` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `23567` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `23586` — _ngAggiungiAlimento
- `23611` — _ngRimuoviAlimento
- `23625` — _ngDopoModifica
- `23643` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `23696` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `23725` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `23742` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `23750` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `23822` — gramTestoCasalingo
- `23848` — _appendToggleNutrizionali
- `23891` — _appendTogglePromemoria
- `23920` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `24066` — cpFromEmoji
- `24072` — getEmojiCp
- `24091` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `22066` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `22088` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `22093` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `22119` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `22207` — _spesaTestoWhatsApp
- `22223` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `22268` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `22291` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `22319` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `22379` — scaricaListaSpesaPDF (download diretto, un click)
- `22387` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `22399` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 25239-25239

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
- `25239` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 25251-25458

- `25251` — salvaInbody
- `25316` — delInbody
- `25323` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `25458` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 25486-25955

- `25486` — buildSemLegenda
- `25500` — renderAlEditor
- `25561` — _alimNomeRegex
- `25569` — _alimGiorniDaPiano
- `25577` — _scanGiorniPerNome
- `25592` — scanRiferimentiAlimento
- `25621` — _alimRefsRighe
- `25627` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `25715` — modificaAlimentoCustom
- `25735` — ripristinaValoriPrecedentiAlimento
- `25747` — _resetAlimModal
- `25758` — apriNuovoAlimentoCustom
- `25764` — salvaAlimentoCustom
- `25831` — eliminaAlimentoCustom
- `25862` — _alimFonteBadge
- `25867` — renderAlimentiPage
- `22217` — E
- `25937` — archiviaAlimentoCustom
- `25955` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 25982-26219

- `25982` — _bcSetStatus
- `25984` — apriScannerBarcode
- `25992` — chiudiScannerBarcode
- `25997` — _bcStopCamera
- `26005` — _bcModaleAperto
- `26007` — _bcAvviaCamera
- `26018` — _bcAvviaNativo
- `26038` — _bcAvviaZXing
- `26047` — _bcZXStart
- `26058` — _bcErroreCamera
- `26066` — cercaBarcodeManuale
- `26072` — _barcodeTrovato
- `26088` — cercaBarcodeOFF
- `26106` — _bcProdottoNonTrovato
- `26120` — _bcPrecompilaForm
- `22477` — num
- `26144` — togAl
- `26197` — selCatAl
- `25402` — selTuttiAl
- `26219` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 26233-26549

- `26233` — setCalView
- `26234` — calPrev
- `26235` — calNext
- `26236` — calToday
- `26238` — renderCal
- `26252` — renderCalMonth
- `26276` — renderCalWeek
- `26294` — renderCalDay
- `26310` — selGiorno
- `26324` — setDisp
- `26329` — openAddEvento
- `26342` — openAddEventoPaz
- `26348` — toggleEntrataCheck
- `26353` — salvaEvento
- `26376` — openEvDetail
- `26431` — delEvento
- `26439` — copyMsg
- `26446` — aggDateCal
- `26451` — syncInizio
- `26452` — syncControllo
- `26453` — aggiornaPrev
- `26470` — renderRic
- `26497` — openNuovaRic
- `26498` — editRic
- `26508` — salvaRic
- `26533` — delRic
- `26549` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 26634-26694

- `26634` — aggiungiEntrataPerPaziente
- `26651` — openNuovaEntrata
- `26665` — salvaEntrata
- `26686` — delEntrata
- `26694` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 26724-27194

- `26724` — aiSuggerisciRicetta
- `26769` — renderConcettiModal
- `26788` — apriConcettiModal
- `26815` — salvaConcettiAllegati
- `26839` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `26877` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `26886` — loadInbodyPDF
- `27004` — _vitdLabel
- `27008` — getIntegratori
- `27012` — getIntegraWant
- `27016` — setIntegratori
- `27033` — setIntegraWant
- `27071` — getPatologieChip
- `27072` — getAllergieChip
- `27073` — setPatologieChip
- `27074` — setAllergieChip
- `27075` — getPatologie
- `27076` — getAllergie
- `27077` — setPatologieFromStr
- `27084` — setAllergieFromStr
- `27097` — getSdvChip
- `27098` — getCspChip
- `27099` — setSdvChip
- `27100` — setCspChip
- `27101` — setSdvFromStr
- `27102` — setCspFromStr
- `27106` — getBudget
- `27107` — setBudget
- `27112` — renderCalAnno
- `27143` — comprimeImmagine
- `27165` — uploadImmagineConcetto
- `27184` — rimuoviImmagineConcetto
- `27194` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 27260-27364

- `27260` — entraSelConcetti
- `27261` — annullaSelConcetti
- `27262` — toggleConcettoSel
- `27267` — eliminaConcettiSelezionati
- `27286` — confermaEliminaConcetti
- `27301` — aiRiscriviConcetto
- `27315` — editConcetto
- `27333` — salvaConcetto
- `27344` — openNuovoConcetto
- `27364` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 27365-27528

- `27365` — saveAgendaPersonale
- `27366` — getAgendaTodo
- `27367` — saveAgendaTodo
- `27369` — pulisciAgendaVecchia
- `27373` — navigaAgenda
- `27382` — toggleFormAgenda
- `27383` — toggleFormTodo
- `27385` — salvaAgendaItem
- `27399` — salvaTodoItem
- `27411` — toggleAgendaFatto
- `27419` — toggleTodoFatto
- `27432` — _catCol
- `27434` — renderAgendaDx
- `27528` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 27654-27858

- `27654` — renderScadenzeAlert
- `27839` — segnaGestito
- `27858` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 27867-27942

- `27867` — ripristinaPaz
- `27875` — eliminaPaz
- `27920` — getDove
- `27924` — setDove
- `27942` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 27947-28387

- `27947` — getCredenzialiPersistenti
- `27960` — cancellaCredenzialiPersistenti
- `27965` — rinnovaSessioneConRefreshToken
- `27982` — getSessioneSalvata
- `28001` — salvaSessione
- `28011` — cancellaSessione
- `28015` — eseguiLogin
- `28062` — eseguiLogout
- `28084` — mostraApp
- `28089` — verificaSessioneEAvvia
- `28117` — assicuraTokenValido
- `28146` — _garantiscoSessionePerSync
- `28158` — avviaRinnovoTokenPeriodico
- `28162` — fermaRinnovoTokenPeriodico
- `28171` — _authReset
- `28176` — _authMostra
- `28179` — mostraLogin
- `28180` — mostraRegistrazione
- `28181` — mostraRecupero
- `28182` — mostraNuovaPassword
- `28185` — eseguiRegistrazione
- `28223` — eseguiRecuperoPassword
- `28252` — eseguiNuovaPassword
- `28286` — _parseHashParams
- `28293` — _pulisciHash
- `28297` — gestisciRitornoAuth
- `28387` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 28459-28582

- `28459` — apriPannelloRicette
- `28488` — chiudiPannelloRicette
- `28496` — applicaRicettaPasto
- `28532` — inizializzaP2
- `28544` — deepClone
- `28548` — applicaPatch
- `28582` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
