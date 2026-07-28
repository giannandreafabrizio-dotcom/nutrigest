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
Righe 2386-2428

- `2386` — _slugAlimento
- `2394` — _catalogoIndicizza
- `2398` — _catalogoDeindicizza
- `2405` — costruisciCatalogo
- `2428` — risolviAlimento

---

### MACROS PIANO — calcolo e badge macro reali vs target
Righe 2443-2706

- `2443` — getValoriCREA
- `2455` — getCurrentPaziente
- `2475` — getKcalWeekend
- `2532` — getMacrosRicettaComposta
- `2538` — calcolaMacrosPiano
- `2640` — renderBadgeMacrosReali
- `2611` — pctStr
- `2612` — color
- `2625` — row
- `2706` — renderBadgeMacrosReali_DOM

---

### ANALISI DEL SANGUE — parsing, indici clinici derivati, interpretazione
Righe 2991-3178

- `2991` — _parseAnalisiNum
- `2999` — calcolaIndice
- `3152` — interpretaAnalisi
- `3164` — _interpAnalisiHtml
- `3178` — mostraInfoRange

---

### CONCETTI EDUCATIVI — sync Supabase, migrazione
Righe 3321-3345

- `3321` — pushConcetiSupabase
- `3331` — pullConcetiSupabase
- `3345` — migraConcetti

---

### ALIMENTI — categorie funzionali/semaforo, chip UI, equivalenze porzioni
Righe 3535-3890

- `3535` — getCategoriaSemaforo
- `3552` — _getCategorieGruppo
- `3566` — calcolaGrammaturaEquivalente
- `3606` — _gruppoEquiv  (P121: gruppo di equivalenza + criterio per categoria funzionale)
- `3612` — _porzioneStandard  (P121: porzione `g` di database dell'alimento)
- `3627` — suggerisciGrEquivalente  (P121: firma a 3 argomenti, il gruppo si deduce dai due alimenti)
- `3653` — _etichettaCriterio  (P121: ≈carbo / ≈prot / ≈grassi / fissa / porzione)
- `3668` — _promptAlternativeGrassi  (P121: riga del prompt AI generata dal motore)
- `3684` — ricalcolaAlternative  (P121: MOTORE UNICO, unico punto che scrive la grammatura di un'alternativa)
- `3703` — ricalcolaAlternativePiano  (P121: applica il motore a tutte le celle di un piano)
- `3752` — arrotondaGrammatura  (P121: sostituisce arrotondaPorzioneDiscreta — pezzi interi senza tetto / 5g)
- `3762` — getCategoriaFunzionale
- `3802` — catArr
- `3818` — _tagComuniTrova
- `3822` — getTagComuniChip
- `3825` — setTagComuniChip
- `3833` — setCatChips
- `3846` — getStagioniChip
- `3849` — setStagioniChip
- `3856` — getProfiloChip
- `3859` — setProfiloChip
- `3868` — wireChipGroup
- `3879` — wireAttrChipGroups
- `3890` — wireRadioChipGroup

---

### CONFIG / STORAGE LOCALE — cfg, localStorage db, util data/valuta
Righe 3918-4297

- `3918` — getCfg
- `3919` — saveCfgL
- `3920` — getUrl
- `3921` — saveLocal
- `3922` — loadLocal
- `3933` — uid
- `3934` — today
- `3935` — addDays
- `3936` — fData
- `3937` — fEur
- `3939` — getLastSyncText
- `3949` — getSyncColor
- `3957` — aggiornaStatoSync
- `3983` — setSyncStatus
- `4251` — _registraTombstone
- `4259` — _tombstoneAttivi
- `4271` — _fondiTombstones
- `4285` — _mergeTombstonesRemoti *(dal 24/7 legge il meta da `collections`, P74 1d)*
- `4297` — _applicaTombstones
- `4158` — _pazFetchMeta *(P74 1d — solo `collections`)*
- `4179` — _collectionsUpsert *(P74 — scrittura primaria dei 4 meta-record dal cutover 1d)*
- `4201` — _collectionsFetch *(P74 1d — lettura unica dei meta-record)*
- `4224` — _analisiSangueUpsert *(P74 fase 2 — scrittura ombra analisi del sangue, 24/7)*

---

### SYNC SUPABASE — push/pull ricette/pazienti, tombstones, conflitti (P69)
Righe 4321-4706

- `4321` — supaHeaders
- `4335` — pushRicetteSupabase
- `4360` — pullRicetteSupabase
- `4382` — delRicetteSupabase
- `4394` — delPazienteSupabase
- `4409` — pushToSheets
- `4453` — pullFromSheets
- `4532` — syncNow
- `4545` — sincronizzaTutto
- `4360` — stpSet
- `4365` — stpMsg
- `4676` — testConnSupabase
- `4706` — _p68LogSaveAnonimo

---

### SYNC SUPABASE — save paziente, piani/cache piano, entrate, eventi
Righe 4720-5236

- `4720` — save
- `4738` — _pushRigaPerId
- `4771` — _flushDirtyIds
- `4854` — _p69LoadBaseline
- `4857` — _p69StoreBaseline
- `4860` — _p69SetBaseline
- `4864` — _p69DropBaseline
- `4868` — _p69SetBaselineFromRows
- `4874` — _p69NomePaz
- `4879` — _p69InList
- `4887` — _p69RilevaConflitti
- `4923` — _p69DialogoConflitti
- `4738` — chiudi
- `4957` — _p69RisolviRicarica
- `4986` — _p69EsportaLocali
- `4999` — _p69RisolviSovrascrivi
- `5012` — pushPianoSupabase
- `5034` — pullPianiSupabase
- `5050` — delPianoSupabase
- `5066` — delPianiPazienteSupabase
- `5078` — pushCachePianoSupabase
- `5095` — caricaCachePianoSupabase
- `5117` — pushEntrateSupabase
- `5141` — pullEntrateSupabase
- `5155` — delEntrataSupabase
- `5163` — pushEntrataSupabase
- `5174` — pushEventoSupabase
- `5187` — pushEventiSupabase
- `5211` — pullEventiSupabase
- `5225` — delEventoSupabase
- `5236` — _pianoCacheKey

---

### UI GENERALE — config AI key, notifiche, navigazione (goTo/tab/modali)
Righe 5267-5379

- `5267` — _salvaPianoCache
- `5272` — _caricaPianoCache
- `5278` — salvaCfg
- `5279` — testConn
- `5286` — testaAntKey
- `5297` — initAntCard
- `5300` — esporta
- `5301` — importa
- `5306` — goTo
- `5323` — closeM
- `5331` — ngChiudiModale
- `5340` — ngChiudiPopupCoppia
- `5344` — ngAggiungiX
- `5355` — ngUpgradeModali
- `5375` — mTab
- `5376` — aggiornaEta
- `5377` — toggleOrarioNote
- `5378` — pdTab
- `5379` — notif

---

### PAZIENTI — registro: lista/card/kanban, apertura, editing, salvataggio, routine
Righe 5387-8153

- `5387` — getPazView
- `5388` — setPazView
- `5397` — _pazStatoPiano
- `5405` — _pazUrgenzaControllo
- `5412` — _pazStatoTagHtml
- `5421` — _pazAggiornaFiltroRegimi
- `5429` — renderPaz
- `5482` — _renderPazCard
- `5507` — _renderPazLista
- `5534` — _renderPazKanban
- `5572` — openNuovoPaz
- `5598` — editPaz
- `5676` — REGOLE_SEMAFORO_ALIMENTI *(15 condizioni cliniche → grigi/celesti; globale dal 26/7 per essere verificabile dal test)*
- `6123` — _SEM_COLORI_LEGACY / `6105` _SEM_COLORI_AUTO *(F9 — unico vocabolario dei colori automatici)*
- `6128` — NOMI_CONDIZIONE_SEMAFORO *(etichette delle 15 condizioni, usate anche dal riquadro della scheda)*
- `6150` — _semaforoCondizioniAttive *(le condizioni spuntate su un paziente)*
- `6161` — _semaforoMigraPaziente *(F9 — toglie i colori legacy e ricalcola; idempotente)*
- `6172` — _semaforoMigraTutti *(passata su tutti i pazienti in memoria, con conteggio)*
- `6183` — applicaRegoloSemaforo *(dal 26/7 pulisce TUTTI e sei i colori automatici, non solo i suoi due)*
- `6271` — trovaChiaveAlimento *(match esatto sul nome: se non trova, la regola è ignorata in silenzio — vedi test s2-regole-nomi-alimenti)*
- `6295` — _pazNumOPrec *(F7 — campo assente = valore precedente, non azzeramento)*
- `6307` — _pazPreservaCampi *(F5 — l'anagrafica non cancella i campi che il form non gestisce)*
- `6313` — salvaPaz
- `6389` — openPaz
- `7840` — renderPdRoutine
- `6723` — cardHTML
- `7982` — updateRoutineCampo
- `7990` — suggerisciPastoEQuando
- `8017` — filtroLibreria
- `8026` — renderLibreriaGrid
- `8047` — aggiungiDaLibreriaIdx
- `8071` — openModalRoutine
- `8078` — salvaRoutineVoce
- `8103` — salvaRoutine
- `8110` — mostraRoutinePopup
- `8138` — removeRoutineVoce
- `8153` — _renderAggiustamentiSection

---

### 📈 PERCORSO — timeline di periodizzazione (P115 Tappe 1-5 COMPLETE, 24 lug 2026)
Righe 6021-6621 (numeri ESATTI al 24/7 notte, dopo la Tappa 5). ⚠️ Questo blocco (~600 righe) fa slittare tutti i numeri delle sezioni SUCCESSIVE a riga ~6020 rispetto all'ultima rigenerazione completa: per quelle sezioni fare grep di conferma. Rigenerazione completa alla prossima modifica strutturale.

- `6434` — _PERCORSO_TIPI (const: tipi fase, colori, pct default)
- `6441` — _percorsoGet *(normalizza p.percorso, scarta fasi invalide)*
- `6463` — _percorsoIsoLocal *(data → YYYY-MM-DD LOCALE, mai toISOString/UTC)*
- `6469` — _percorsoIntervalli *(fasi consecutive → date concrete dal/al)*
- `6483` — _percorsoFaseAt *(fase attiva a una data; dal incluso, al escluso)*
- `6492` — _percorsoKcalFase *(pct → kcal indicative via calcolaTDEE)*
- `6515` — _percorsoProiezione *(Tappa 2 — proiezione ibrida teorica/calibrata, cono, obiettivo a intervallo)*
- `6573` — _percorsoDataBreve *(ISO → "12 set")*
- `6590` — _percorsoSerieEnergia *(Tappa 3 — serie introito/TDEE stimato/TDEE osservato per la corsia energia)*
- `6629` — _percorsoSerieMassaMagra *(Tappa 4 — solo InBody: punti {data,m,pg})*
- `6648` — _percorsoConsuntivo *(Tappa 5 — legge p.consuntivo scritto da P50: aderenza, extra kcal, ritardo=extra÷7700, settimane perse; oggi sempre ok:false)*
- `6690` — _PERCORSO_LAYERS_DEFAULT / _percorsoLayersState / _percorsoLayersGet *(Tappa 4 — stato interruttori, SOLO sessione, mai su p)*
- `6695` — percorsoLayerToggle *(Tappa 4 — inverte un solo strato)*
- `6701` — percorsoVistaPreset *(Tappa 4 — preset "tecnica"/"paziente")*
- `6717` — _percorsoPaz *(e a seguire i mutatori percorsoInit/SetInizio/AddFase/UpdFase/DelFase/MoveFase)*
- `6773` — _PERCORSO_MODELLI / _PERCORSO_GEN *(P122 T3 — 4 modelli + regole dei cicli)*
- `6791` — _percorsoGeneraFasi *(P122 T3 — pura: dal traguardo alle fasi, ritmo = quello della proiezione)*
- `6871` — _percorsoModelloSelectHtml
- `6880` — percorsoGeneraDaModello *(propone; conferma prima di sostituire fasi esistenti)*
- `6903` — _percorsoShiftGiorni *(pura: ancora = ultima pesata)*
- `6913` — percorsoRiallinea *(⏩ trasla il piano, riprende dal giorno-fase dell'interruzione)*
- `6940` — _TRG_TIPI / `6744` _TRG_COMPORTAMENTI *(P122 T4 — tipi di traguardo e libreria comportamenti)*
- `6962` — _traguardiGet · `6761` _traguardoValoreAttuale *(valore corrente dai dati esistenti, null se manca)*
- `7001` — _traguardoVerso *(auto: dedotto dalla partenza)* · `6803` _traguardoValuta · `6824` _traguardiValuta
- `7042` — traguardoAdd · `6852` traguardoUpd · `6867` traguardoDel · `6873` traguardoSegna
- `7100` — _COND_TIPI · `6897` _percorsoCondizione *(pura: la fase finisce per soglia — SOLO suggerimento)*
- `7116` — percorsoSetCondizione · `6927` percorsoChiudiFase *(esito fotografato, riapribile)*
- `7150` — _traguardiHtml *(blocco 🏁 in fondo alla scheda Percorso)*
- `7248` — _percorsoVistaPaz / `7049` _percorsoVistaPazAttiva *(P122 T5 — modalità di sessione)*
- `7255` — _percorsoVittorie *(pura: vittorie dall'inizio del percorso + flag ricomposizione)*
- `7293` — _percorsoNascondiPeso *(in fase di massa il peso non si mostra al paziente)*
- `7304` — _traguardoFaseCorrente *(traguardo della fase IN CORSO, non quello lontano)*
- `7332` — _traguardoTestoPaziente *(righe in italiano semplice, riusate dal messaggio WhatsApp)*
- `7365` — _vistaPazienteHtml *(i tre riquadri che guarda il paziente)*
- `7445` — _percorsoChartSvg *(due corsie: peso + massa magra + cono proiezione sopra, striscia aderenza in mezzo (solo con dati P50), energia (kcal) sotto — tutto gated dagli interruttori)*
- `7634` — renderPdPercorso *(scheda: badge fase, riga proiezione/obiettivo, riga Piano vs Realtà (solo con dati), toolbar interruttori, grafico, editor)*

*(Tappa 2 tocca anche `calcolaMacros`: box obiettivo con intervallo al posto della data secca.)*

---

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 8238-8409

- `8238` — salvaAggiustamento
- `8271` — eliminaAggiustamento
- `8280` — renderPdNote
- `8315` — salvaNotaClinica
- `8330` — deleteNota
- `8339` — saveNote
- `8359` — resetSemaforoAuto *(F9 — pulsante 🔄 Ricalcola: pulisce gli automatici e rifà col sistema valido; il motore LEGACY non esiste più)*
- `8409` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 8627-8825

- `8627` — avviaFX
- `8655` — avviaAnalisi
- `8672` — _renderFlussoPanel
- `8716` — _riepEsc
- `8720` — _riepNum
- `8726` — _riepDelta
- `8734` — _riepDataSig
- `8752` — _riepParseFX
- `8087` — clean
- `8766` — _riepAggiornaFX
- `8792` — _riepToggleDomandaDefault
- `8804` — _riepAddDomanda
- `8817` — _riepRemoveDomanda
- `8825` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 9037-9263

- `8218` — dCol
- `8336` — card
- `9037` — renderPdRagionamento
- `9125` — inviaMessaggioRag
- `9143` — concludiERiassumi
- `9157` — salvaRagionamento
- `9178` — apriGeneratoreDaRag
- `9186` — nuovaSessioneRag
- `9192` — cancellaSavedRag
- `9202` — renderPazTimeline
- `9234` — renderPdAnamnesi
- `9263` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 11162-12297

- `11162` — _anNorm *(P125 — testo confrontabile: minuscole, niente accenti)*
- `11168` — _anCorrisponde *(P125 — ricerca per parole-prefisso: "vit d" trova "Vitamina D")*
- `11174` — filtraAnalisi *(P125 — filtro dal vivo delle 119 voci)*
- `11208` — pulisciRicercaAnalisi
- `11214` — renderPdAnalisi
- `11270` — toggleAnalisiSection
- `11419` — loadAnalisiSanguePDF
- `11306` — _impPdfConfigurata
- `11307` — _impPdfLib
- `11317` — _impPdfApri
- `11330` — _impPdfPagina *(P124b — una pagina del PDF → immagine, con la rotazione RILEVATA, non quella dichiarata dal file)*
- `11351` — _impRuotaImmagine
- `11376` — _impRilevaRotazione *(P124b — chiamata piccola: di quanti gradi va girata la pagina)*
- `11395` — _impPromptPagina *(P124b — prompt di UNA pagina, con l'impronta della riga: valore+unità+riferimento)*
- `11594` — _impNormalizzaNumero *(P124 — numero all'italiana → punto decimale, conversione fatta dall'app e non dall'AI)*
- `11605` — _impNumeri
- `11613` — _impSembraIntervallo
- `11621` — _impUgualeAlRange
- `11630` — _impLimitiStd
- `11651` — _impFuoriScala
- `11660` — _impCorrezioneVirgola
- `11672` — _impTestoLimiti
- `11693` — _impRifPlausibile *(P124b — un "riferimento" che è un'unità di misura = riga disallineata)*
- `11706` — _impUnitaCanonica
- `11728` — _impStessaGrandezza *(P124b — stesso tipo di misura a meno del prefisso: nanomoli/micromoli/millimoli)*
- `11745` — _impUnitaCompatibili
- `11756` — _impControllaValore *(P124 — i controlli anti-errore su un valore estratto)*
- `11820` — mostraDiffAnalisi *(P124 — colonna Estratto modificabile + righe sospette deselezionate)*
- `12010` — _calcoloIncluso
- `12016` — toggleCalcoloIncluso
- `12038` — _renderCalcoliPannello
- `12079` — toggleGlossario
- `12084` — updateAnalisi
- `12143` — salvaAnalisi
- `12156` — applicaGruppoClinico
- `12185` — renderBoxGruppiCliniciSuggeriti
- `12217` — suggerisciGruppiClinici
- `12297` — renderMemoriaInbody

---
### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9176 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `9393` — _richVal
- `9400` — _richBmi
- `9405` — _richPat
- `9411` — _richNum
- `9456` — _richPreselezione
- `9472` — richLeggiIntestazione
- `9476` — richSalvaIntestazione
- `9485` — apriRichiestaAnalisi
- `9505` — _richModaleHtml
- `9581` — _richEsc
- `9583` — _richMotivoCambia
- `9589` — _richToggleSez
- `9595` — _richAggiornaConteggi
- `9603` — _richMotivoCorrente
- `9613` — _richSelezione
- `9628` — _richTxt
- `9634` — _richCostruisciPDF
- `8969` — nuovaPagina
- `8970` — spazio
- `9730` — _richNomeFile
- `9735` — _richPrepara
- `9748` — _richRegistra
- `9753` — _richStato
- `9755` — richScaricaPDF
- `9804` — _richUpload
- `9806` — _richWaUrl
- `9813` — _richTestoWa
- `9827` — richInviaWhatsApp
- `9867` — richCopiaLink
- `9888` — _richStoricoHtml

---
### REFERTI DEL SANGUE DATATI — storico nel tempo (P118 tappa 1)
Righe 9194-9387 — migrazione, ordinamento, quadro attuale derivato, barra di selezione.

- `10939` — _refertoNuovoId
- `10942` — _refertoOggi
- `10946` — _refertoDataIt
- `10952` — _refertoConteggio
- `10966` — _refertiMigra
- `10993` — _refertiOrdinati
- `11004` — _refertoPiuRecente
- `11009` — _refertoInVista
- `11027` — _refertiApplica
- `11040` — _refertoCrea
- `11059` — refertoCambiaVista
- `11065` — refertoCambiaData
- `11077` — refertoNuovo
- `11085` — refertoDuplica
- `11094` — refertoElimina
- `11109` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `10552` — _rangeNum
- `10558` — _rangeTestoDa
- `10577` — _rangeCoppia
- `10587` — _rangeHtml

---
### ANDAMENTO NEL TEMPO — tracciato, variazione, grafico grande (P118 tappa 3)
Righe 9441-9745 — serie storica, regola del colore, sparkline, pannello in fondo.

- `10629` — _andLimiti
- `10650` — _andParseRangeLab
- `10663` — _andDistanza
- `10670` — _andValutazione
- `10683` — _andSerie
- `10697` — _andNum
- `10701` — _andDataBreve
- `10706` — _andMeseAnno
- `10714` — _andDominio
- `10728` — _andColore
- `10741` — _andSparkHtml
- `10767` — _andRigaHtml
- `10789` — _andEsamiSeguibili
- `10797` — andScegliEsame
- `10803` — _andPannelloHtml
- `10856` — _andGraficoGrande
- `10907` — _andPasso

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 12345-12756

- `12345` — _ibFmtBreve
- `12354` — _renderPesiIntermediSection
- `12403` — aggiungiPesoIntermedio
- `12419` — eliminaPesoIntermedio
- `12429` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `12756` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 13028-13028

- `13028` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 13406-15947

- `13406` — aggiornaLabelMacros
- `13424` — calcolaMacros
- `13565` — applicaSchema
- `13600` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `13606` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `13628` — _misuraDaReferto *(P127 — UN referto letto con le regole del traguardo: usata anche dalla verifica al controllo)*
- `13661` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `13672` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `13690` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `13803` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `13817` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `13873` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `13887` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `13919` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `13952` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `13994` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `14002` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `14013` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `14040` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `14055` — _stradeVerso *(le strade complete + percentuale libera)*
- `14102` — _VC_TOLLERANZA_PCT / _VC_GIORNI_MIN / _VC_GIORNI_MIN_RITARO / _VC_COPERTURA_MIN_PCT / _VC_MAGRA_PRUDENZA_GG *(P127 — soglie cliniche della verifica)*
- `14112` — _mediaSlotPrescritta *(media pesata sui giorni di un campo dello storico target; la usa anche _kcalMediaPrescrittaOss)*
- `14132` — _vcDeficitSlot *(deficit di uno slot: campo offset o kcal−tdee per gli slot vecchi)*
- `14140` — _vcTratto *(P127 — cosa è cambiato fra due referti, previsto vs reale, TDEE misurato)*
- `14194` — _vcTraguardoSalvato *(traguardo ricostruito dal salvato, per la scheda Percorso)*
- `14204` — _verificaControllo *(P127 — motore puro: tratto recente, quadro dall'inizio, residuo al ritmo reale)*
- `14242` — _verificaControlloHtml *(blocco 🔎, unica fonte per pannello 🎯 e scheda Percorso; azioni solo dove c'è il campo kcal)*
- `14334` — _vcRitara *(scrive le kcal ritarate nel campo regime: propone, non salva)*
- `14347` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `14415` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `14437` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `14490` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `14597` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `14612` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `14637` — _renderRifPesoBox
- `14688` — _usaRifPeso
- `14692` — _aggiornaRifPesoTarget
- `14695` — _aggiornaRegimeSlider
- `15352` — _presetRegime
- `15356` — _initRegimeSliderDaPaziente
- `15374` — ricalcolaLAF
- `15508` — renderStoricoTDEE
- `15542` — attivaSlotTDEE
- `15550` — eliminaSlotTDEE
- `15563` — _toggleCiclizzazione
- `15569` — _aggiornaAnteprimaCiclizzazione
- `15587` — salvaCalcoloMacros
- `15701` — _metAllenamento
- `15717` — _neatFrazione
- `15791` — _larnLafStileVita
- `15808` — _regimeOffset
- `15818` — _componiRegimeText
- `15851` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `15863` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `15870` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `15947` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 15965-16395

- `15965` — renderTargetBadge
- `15994` — verificaRegola_75_20_5
- `16031` — renderBadge75_20_5
- `16096` — _validaNorm
- `16099` — _validaMatchTermine
- `16107` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `16158` — _validaTesto
- `16179` — validaPiano
- `16253` — _validaFirmaBlocchi
- `16260` — renderBadgeValidatore
- `16291` — _validaVaiAlGiorno
- `16300` — apriPannelloValidatore
- `13472` — esc
- `16357` — _validaEseguiOverride
- `16380` — validaGateExport
- `16395` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 16528-17160

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
- `16528` — pianoPazSelezionato
- `16675` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `16913` — renderPanelMacrosGiorno
- `17056` — pmgCambiaGrammi
- `17083` — riapriPiano
- `17121` — _montaPianoCorrente
- `17160` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 17170-17639

- `17170` — pullTemplateSupabase
- `17181` — delTemplateSupabase
- `17190` — _promptTemplateNome
- `17215` — _creaTemplateDaJSON
- `17238` — salvaComeTemplate
- `17249` — salvaComeTemplateDaPiano
- `17258` — _normNomeAlim
- `17259` — _escRegAlim
- `17260` — _raccogliAlimentiDaPiano
- `17271` — _alimentiEsclusiPaziente
- `17283` — _trovaConflittiTemplate
- `17301` — _mostraAvvisoConflitti
- `17325` — applicaTemplate
- `17343` — apriPickerTemplate
- `17371` — _pickPaziente
- `17390` — applicaTemplatePick
- `17394` — rinominaTemplate
- `17405` — eliminaTemplate
- `17415` — renderLibreriaTemplate
- `17444` — renderStoricoPiani
- `17503` — eliminaPiano
- `17519` — _getActiveMacrosTarget
- `17543` — getTargetAttivi
- `17580` — calcolaTargetsCiclizzazione
- `17606` — _setupPianoTargets
- `17630` — getStagioneCorrente
- `17639` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 18073-18073

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `18073` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 18082-18541

- `18082` — aggiornaUIcolazione
- `18092` — salvaRegolePiano
- `18153` — _isModelloSistema
- `18156` — _isModelloSistemaModificato
- `18168` — caricaModelliCustomLocal
- `18182` — salvaModelliCustomLocal
- `18203` — _migraRecordCustom
- `18218` — _syncAliasLegacy
- `18227` — caricaAlimentiCustom
- `18251` — pushAlimentiCustomSupabase
- `18261` — pullAlimentiCustomSupabase
- `18275` — pushModelliSupabase
- `18293` — pullModelliSupabase
- `18318` — _calcolaFreqDaModello
- `18337` — aggiornaUImodello
- `18426` — popolaDropdownModelli
- `18454` — cambiaModelloRotazione
- `18460` — ripristinaModelloOriginale
- `18483` — eliminaModelloCustom
- `18501` — mostraAnteprimaModello
- `18511` — apriEditorModello
- `18541` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 18810-19048

- `15738` — rerender
- `18810` — _salvaModelloDaEditor
- `18852` — caricaRegolePiano
- `18882` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `18917` — _aiLogUsage
- `18939` — _aiProxyUrl
- `18945` — _aiTokenPerProxy
- `18974` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `19048` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 19127-19267

- `16216` — _risolviCollisioniCelle
- `19127` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `19187` — getFruttaStile
- `19194` — _fruttaGetPasto
- `19204` — _fruttaContaRigheRicetta
- `19208` — _fruttaIndiceBasePasto
- `19228` — getFruttaMarker
- `19241` — fruttaMarkerHtml
- `19249` — _fruttaCheckboxHtml
- `19258` — toggleFrutta
- `19267` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 19303-20577

- `19303` — _renderCelleGriglia
- `19383` — _renderRicetteTestuali
- `19422` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `19493` — _renderCelleHtml
- `19501` — toggleCellaMenu
- `19520` — closeAllCellaMenus
- `19528` — _trovaPasto
- `19536` — cellaSposta
- `19590` — cellaCancella
- `19611` — apriEditGrammatura
- `16789` — salva
- `19659` — cellaSwap
- `19679` — cellaRimuoviAlt
- `19693` — cellaAggiungiAlt
- `19796` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `19881` — apriEditRicetta
- `19890` — aggiungiRicetta
- `19906` — rimuoviRicetta
- `19915` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `20077` — ngAggiungiSpuntinoVuoto
- `20093` — apriAggiungiCella
- `17254` — risolviCompatibili
- `20189` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `20281` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `20422` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `20577` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 20625-21017

- `20625` — _attesoStrutturaPiano
- `20645` — _confrontaStrutturaPiano
- `20675` — _costruisciPromptDelta
- `20702` — _pianoToolSchema
- `20777` — _pianoMaxTokens
- `20786` — _estraiPianoDaRisposta
- `20808` — chiamaGeneraPiano
- `20975` — mostraLoadingSteps
- `18123` — render
- `21017` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 21084-21661

- `21084` — generaMessaggioAI
- `21189` — copiaMessaggioAI
- `21199` — salvaInStorico
- `21211` — salvaVarianteAI
- `21226` — renderVariantiSalvate
- `21245` — usaVariante
- `21263` — eliminaVariante
- `21274` — renderStoricoMsg
- `21290` — apriWhatsApp
- `21661` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 21839-23336

- `21839` — _ngColoreSemaforoNome
- `21847` — apriSceltaModalitaPiano
- `21882` — _ngChiudiModalita
- `21885` — _ngCostruisciGiornoVuoto
- `21918` — _ngCostruisciGiornoSpeciale
- `21929` — _ngIndiceInizioSpeciali
- `21940` — _ngModalitaNomeGiorno
- `21946` — _ngImpostaModalitaNomeGiorno
- `21949` — _ngLettera
- `21956` — _ngEtichettaGiorno
- `21976` — _ngEtichettaGiornoBreve
- `21990` — _ngToggleGiornoSpeciale
- `22014` — _ngRenderPannelloSpeciale
- `22082` — _generaGiornoSpecialeAI
- `22182` — _ngGiornoHaContenuto
- `22194` — _ngCreaPianoManuale
- `22217` — _ngScrollTabGiorni
- `22227` — _ngAbilitaDragScroll
- `22264` — _ngCambiaNumeroGiorni
- `22296` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `22310` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `22351` — _ngToggleCat
- `22360` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `22384` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `22540` — _ngSalvaPianoManuale
- `22566` — _ngParseIngrediente
- `22590` — _ngScomponiIngredienti
- `22602` — _ricCalcolaMacroDaIngredienti
- `22620` — _ricRicalcolaMacroLive
- `22627` — _ricAggiornaInfoMacro
- `22641` — _ricRicalcolaMacroLiveNow
- `22665` — _ngTrovaCategoriaAlimento
- `22698` — _ngPescaRicetta
- `22741` — _ngScomponiRicettaNelPasto
- `22778` — _ngDragStart
- `22789` — _ngDragStartCella
- `22800` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `22807` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `22812` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `22831` — _ngAggiungiAlimento
- `22856` — _ngRimuoviAlimento
- `22870` — _ngDopoModifica
- `22888` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `22941` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `22970` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `22987` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `22995` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `23067` — gramTestoCasalingo
- `23093` — _appendToggleNutrizionali
- `23136` — _appendTogglePromemoria
- `23165` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `23311` — cpFromEmoji
- `23317` — getEmojiCp
- `23336` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `21311` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `21333` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `21338` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `21364` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `21452` — _spesaTestoWhatsApp
- `21468` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `21513` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `21536` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `21564` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `21624` — scaricaListaSpesaPDF (download diretto, un click)
- `21632` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `21644` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 24484-24484

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
- `24484` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 24495-24701

- `24495` — salvaInbody
- `24559` — delInbody
- `24566` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `24701` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 24729-25198

- `24729` — buildSemLegenda
- `24743` — renderAlEditor
- `24804` — _alimNomeRegex
- `24812` — _alimGiorniDaPiano
- `24820` — _scanGiorniPerNome
- `24835` — scanRiferimentiAlimento
- `24864` — _alimRefsRighe
- `24870` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `24958` — modificaAlimentoCustom
- `24978` — ripristinaValoriPrecedentiAlimento
- `24990` — _resetAlimModal
- `25001` — apriNuovoAlimentoCustom
- `25007` — salvaAlimentoCustom
- `25074` — eliminaAlimentoCustom
- `25105` — _alimFonteBadge
- `25110` — renderAlimentiPage
- `22217` — E
- `25180` — archiviaAlimentoCustom
- `25198` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 25225-25462

- `25225` — _bcSetStatus
- `25227` — apriScannerBarcode
- `25235` — chiudiScannerBarcode
- `25240` — _bcStopCamera
- `25248` — _bcModaleAperto
- `25250` — _bcAvviaCamera
- `25261` — _bcAvviaNativo
- `25281` — _bcAvviaZXing
- `25290` — _bcZXStart
- `25301` — _bcErroreCamera
- `25309` — cercaBarcodeManuale
- `25315` — _barcodeTrovato
- `25331` — cercaBarcodeOFF
- `25349` — _bcProdottoNonTrovato
- `25363` — _bcPrecompilaForm
- `22477` — num
- `25387` — togAl
- `25440` — selCatAl
- `25402` — selTuttiAl
- `25462` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 25476-25792

- `25476` — setCalView
- `25477` — calPrev
- `25478` — calNext
- `25479` — calToday
- `25481` — renderCal
- `25495` — renderCalMonth
- `25519` — renderCalWeek
- `25537` — renderCalDay
- `25553` — selGiorno
- `25567` — setDisp
- `25572` — openAddEvento
- `25585` — openAddEventoPaz
- `25591` — toggleEntrataCheck
- `25596` — salvaEvento
- `25619` — openEvDetail
- `25674` — delEvento
- `25682` — copyMsg
- `25689` — aggDateCal
- `25694` — syncInizio
- `25695` — syncControllo
- `25696` — aggiornaPrev
- `25713` — renderRic
- `25740` — openNuovaRic
- `25741` — editRic
- `25751` — salvaRic
- `25776` — delRic
- `25792` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 25877-25937

- `25877` — aggiungiEntrataPerPaziente
- `25894` — openNuovaEntrata
- `25908` — salvaEntrata
- `25929` — delEntrata
- `25937` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 25967-26403

- `25967` — aiSuggerisciRicetta
- `26012` — renderConcettiModal
- `26031` — apriConcettiModal
- `26058` — salvaConcettiAllegati
- `26082` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `26120` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `26129` — loadInbodyPDF
- `26240` — _vitdLabel
- `26244` — getIntegratori
- `26248` — getIntegraWant
- `26252` — setIntegratori
- `26269` — setIntegraWant
- `26280` — getPatologieChip
- `26281` — getAllergieChip
- `26282` — setPatologieChip
- `26283` — setAllergieChip
- `26284` — getPatologie
- `26285` — getAllergie
- `26286` — setPatologieFromStr
- `26293` — setAllergieFromStr
- `26306` — getSdvChip
- `26307` — getCspChip
- `26308` — setSdvChip
- `26309` — setCspChip
- `26310` — setSdvFromStr
- `26311` — setCspFromStr
- `26315` — getBudget
- `26316` — setBudget
- `26321` — renderCalAnno
- `26352` — comprimeImmagine
- `26374` — uploadImmagineConcetto
- `26393` — rimuoviImmagineConcetto
- `26403` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 26469-26573

- `26469` — entraSelConcetti
- `26470` — annullaSelConcetti
- `26471` — toggleConcettoSel
- `26476` — eliminaConcettiSelezionati
- `26495` — confermaEliminaConcetti
- `26510` — aiRiscriviConcetto
- `26524` — editConcetto
- `26542` — salvaConcetto
- `26553` — openNuovoConcetto
- `26573` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 26574-26737

- `26574` — saveAgendaPersonale
- `26575` — getAgendaTodo
- `26576` — saveAgendaTodo
- `26578` — pulisciAgendaVecchia
- `26582` — navigaAgenda
- `26591` — toggleFormAgenda
- `26592` — toggleFormTodo
- `26594` — salvaAgendaItem
- `26608` — salvaTodoItem
- `26620` — toggleAgendaFatto
- `26628` — toggleTodoFatto
- `26641` — _catCol
- `26643` — renderAgendaDx
- `26737` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 26863-27067

- `26863` — renderScadenzeAlert
- `27048` — segnaGestito
- `27067` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 27076-27151

- `27076` — ripristinaPaz
- `27084` — eliminaPaz
- `27129` — getDove
- `27133` — setDove
- `27151` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 27156-27596

- `27156` — getCredenzialiPersistenti
- `27169` — cancellaCredenzialiPersistenti
- `27174` — rinnovaSessioneConRefreshToken
- `27191` — getSessioneSalvata
- `27210` — salvaSessione
- `27220` — cancellaSessione
- `27224` — eseguiLogin
- `27271` — eseguiLogout
- `27293` — mostraApp
- `27298` — verificaSessioneEAvvia
- `27326` — assicuraTokenValido
- `27355` — _garantiscoSessionePerSync
- `27367` — avviaRinnovoTokenPeriodico
- `27371` — fermaRinnovoTokenPeriodico
- `27380` — _authReset
- `27385` — _authMostra
- `27388` — mostraLogin
- `27389` — mostraRegistrazione
- `27390` — mostraRecupero
- `27391` — mostraNuovaPassword
- `27394` — eseguiRegistrazione
- `27432` — eseguiRecuperoPassword
- `27461` — eseguiNuovaPassword
- `27495` — _parseHashParams
- `27502` — _pulisciHash
- `27506` — gestisciRitornoAuth
- `27596` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 27668-27791

- `27668` — apriPannelloRicette
- `27697` — chiudiPannelloRicette
- `27705` — applicaRicettaPasto
- `27741` — inizializzaP2
- `27753` — deepClone
- `27757` — applicaPatch
- `27791` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
