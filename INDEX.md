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
Righe 3916-4289

- `3916` — getCfg
- `3917` — saveCfgL
- `3918` — getUrl
- `3919` — saveLocal
- `3920` — loadLocal
- `3927` — uid
- `3928` — today
- `3929` — addDays
- `3930` — fData
- `3931` — fEur
- `3933` — getLastSyncText
- `3943` — getSyncColor
- `3951` — aggiornaStatoSync
- `3977` — setSyncStatus
- `4243` — _registraTombstone
- `4251` — _tombstoneAttivi
- `4263` — _fondiTombstones
- `4277` — _mergeTombstonesRemoti *(dal 24/7 legge il meta da `collections`, P74 1d)*
- `4289` — _applicaTombstones
- `4150` — _pazFetchMeta *(P74 1d — solo `collections`)*
- `4171` — _collectionsUpsert *(P74 — scrittura primaria dei 4 meta-record dal cutover 1d)*
- `4193` — _collectionsFetch *(P74 1d — lettura unica dei meta-record)*
- `4216` — _analisiSangueUpsert *(P74 fase 2 — scrittura ombra analisi del sangue, 24/7)*

---

### SYNC SUPABASE — push/pull ricette/pazienti, tombstones, conflitti (P69)
Righe 4313-4698

- `4313` — supaHeaders
- `4327` — pushRicetteSupabase
- `4352` — pullRicetteSupabase
- `4374` — delRicetteSupabase
- `4386` — delPazienteSupabase
- `4401` — pushToSheets
- `4445` — pullFromSheets
- `4524` — syncNow
- `4537` — sincronizzaTutto
- `4360` — stpSet
- `4365` — stpMsg
- `4668` — testConnSupabase
- `4698` — _p68LogSaveAnonimo

---

### SYNC SUPABASE — save paziente, piani/cache piano, entrate, eventi
Righe 4712-5228

- `4712` — save
- `4730` — _pushRigaPerId
- `4763` — _flushDirtyIds
- `4846` — _p69LoadBaseline
- `4849` — _p69StoreBaseline
- `4852` — _p69SetBaseline
- `4856` — _p69DropBaseline
- `4860` — _p69SetBaselineFromRows
- `4866` — _p69NomePaz
- `4871` — _p69InList
- `4879` — _p69RilevaConflitti
- `4915` — _p69DialogoConflitti
- `4738` — chiudi
- `4949` — _p69RisolviRicarica
- `4978` — _p69EsportaLocali
- `4991` — _p69RisolviSovrascrivi
- `5004` — pushPianoSupabase
- `5026` — pullPianiSupabase
- `5042` — delPianoSupabase
- `5058` — delPianiPazienteSupabase
- `5070` — pushCachePianoSupabase
- `5087` — caricaCachePianoSupabase
- `5109` — pushEntrateSupabase
- `5133` — pullEntrateSupabase
- `5147` — delEntrataSupabase
- `5155` — pushEntrataSupabase
- `5166` — pushEventoSupabase
- `5179` — pushEventiSupabase
- `5203` — pullEventiSupabase
- `5217` — delEventoSupabase
- `5228` — _pianoCacheKey

---

### UI GENERALE — config AI key, notifiche, navigazione (goTo/tab/modali)
Righe 5255-5367

- `5255` — _salvaPianoCache
- `5260` — _caricaPianoCache
- `5266` — salvaCfg
- `5267` — testConn
- `5274` — testaAntKey
- `5285` — initAntCard
- `5288` — esporta
- `5289` — importa
- `5294` — goTo
- `5311` — closeM
- `5319` — ngChiudiModale
- `5328` — ngChiudiPopupCoppia
- `5332` — ngAggiungiX
- `5343` — ngUpgradeModali
- `5363` — mTab
- `5364` — aggiornaEta
- `5365` — toggleOrarioNote
- `5366` — pdTab
- `5367` — notif

---

### PAZIENTI — registro: lista/card/kanban, apertura, editing, salvataggio, routine
Righe 5375-8064

- `5375` — getPazView
- `5376` — setPazView
- `5385` — _pazStatoPiano
- `5393` — _pazUrgenzaControllo
- `5400` — _pazStatoTagHtml
- `5409` — _pazAggiornaFiltroRegimi
- `5417` — renderPaz
- `5470` — _renderPazCard
- `5495` — _renderPazLista
- `5522` — _renderPazKanban
- `5560` — openNuovoPaz
- `5586` — editPaz
- `5664` — REGOLE_SEMAFORO_ALIMENTI *(15 condizioni cliniche → grigi/celesti; globale dal 26/7 per essere verificabile dal test)*
- `6082` — applicaRegoloSemaforo
- `6183` — trovaChiaveAlimento *(match esatto sul nome: se non trova, la regola è ignorata in silenzio — vedi test s2-regole-nomi-alimenti)*
- `6207` — _pazNumOPrec *(F7 — campo assente = valore precedente, non azzeramento)*
- `6219` — _pazPreservaCampi *(F5 — l'anagrafica non cancella i campi che il form non gestisce)*
- `6225` — salvaPaz
- `6301` — openPaz
- `7751` — renderPdRoutine
- `6723` — cardHTML
- `7893` — updateRoutineCampo
- `7901` — suggerisciPastoEQuando
- `7928` — filtroLibreria
- `7937` — renderLibreriaGrid
- `7958` — aggiungiDaLibreriaIdx
- `7982` — openModalRoutine
- `7989` — salvaRoutineVoce
- `8014` — salvaRoutine
- `8021` — mostraRoutinePopup
- `8049` — removeRoutineVoce
- `8064` — _renderAggiustamentiSection

---

### 📈 PERCORSO — timeline di periodizzazione (P115 Tappe 1-5 COMPLETE, 24 lug 2026)
Righe 6021-6621 (numeri ESATTI al 24/7 notte, dopo la Tappa 5). ⚠️ Questo blocco (~600 righe) fa slittare tutti i numeri delle sezioni SUCCESSIVE a riga ~6020 rispetto all'ultima rigenerazione completa: per quelle sezioni fare grep di conferma. Rigenerazione completa alla prossima modifica strutturale.

- `6345` — _PERCORSO_TIPI (const: tipi fase, colori, pct default)
- `6352` — _percorsoGet *(normalizza p.percorso, scarta fasi invalide)*
- `6374` — _percorsoIsoLocal *(data → YYYY-MM-DD LOCALE, mai toISOString/UTC)*
- `6380` — _percorsoIntervalli *(fasi consecutive → date concrete dal/al)*
- `6394` — _percorsoFaseAt *(fase attiva a una data; dal incluso, al escluso)*
- `6403` — _percorsoKcalFase *(pct → kcal indicative via calcolaTDEE)*
- `6426` — _percorsoProiezione *(Tappa 2 — proiezione ibrida teorica/calibrata, cono, obiettivo a intervallo)*
- `6484` — _percorsoDataBreve *(ISO → "12 set")*
- `6501` — _percorsoSerieEnergia *(Tappa 3 — serie introito/TDEE stimato/TDEE osservato per la corsia energia)*
- `6540` — _percorsoSerieMassaMagra *(Tappa 4 — solo InBody: punti {data,m,pg})*
- `6559` — _percorsoConsuntivo *(Tappa 5 — legge p.consuntivo scritto da P50: aderenza, extra kcal, ritardo=extra÷7700, settimane perse; oggi sempre ok:false)*
- `6601` — _PERCORSO_LAYERS_DEFAULT / _percorsoLayersState / _percorsoLayersGet *(Tappa 4 — stato interruttori, SOLO sessione, mai su p)*
- `6606` — percorsoLayerToggle *(Tappa 4 — inverte un solo strato)*
- `6612` — percorsoVistaPreset *(Tappa 4 — preset "tecnica"/"paziente")*
- `6628` — _percorsoPaz *(e a seguire i mutatori percorsoInit/SetInizio/AddFase/UpdFase/DelFase/MoveFase)*
- `6684` — _PERCORSO_MODELLI / _PERCORSO_GEN *(P122 T3 — 4 modelli + regole dei cicli)*
- `6702` — _percorsoGeneraFasi *(P122 T3 — pura: dal traguardo alle fasi, ritmo = quello della proiezione)*
- `6782` — _percorsoModelloSelectHtml
- `6791` — percorsoGeneraDaModello *(propone; conferma prima di sostituire fasi esistenti)*
- `6814` — _percorsoShiftGiorni *(pura: ancora = ultima pesata)*
- `6824` — percorsoRiallinea *(⏩ trasla il piano, riprende dal giorno-fase dell'interruzione)*
- `6851` — _TRG_TIPI / `6744` _TRG_COMPORTAMENTI *(P122 T4 — tipi di traguardo e libreria comportamenti)*
- `6873` — _traguardiGet · `6761` _traguardoValoreAttuale *(valore corrente dai dati esistenti, null se manca)*
- `6912` — _traguardoVerso *(auto: dedotto dalla partenza)* · `6803` _traguardoValuta · `6824` _traguardiValuta
- `6953` — traguardoAdd · `6852` traguardoUpd · `6867` traguardoDel · `6873` traguardoSegna
- `7011` — _COND_TIPI · `6897` _percorsoCondizione *(pura: la fase finisce per soglia — SOLO suggerimento)*
- `7027` — percorsoSetCondizione · `6927` percorsoChiudiFase *(esito fotografato, riapribile)*
- `7061` — _traguardiHtml *(blocco 🏁 in fondo alla scheda Percorso)*
- `7159` — _percorsoVistaPaz / `7049` _percorsoVistaPazAttiva *(P122 T5 — modalità di sessione)*
- `7166` — _percorsoVittorie *(pura: vittorie dall'inizio del percorso + flag ricomposizione)*
- `7204` — _percorsoNascondiPeso *(in fase di massa il peso non si mostra al paziente)*
- `7215` — _traguardoFaseCorrente *(traguardo della fase IN CORSO, non quello lontano)*
- `7243` — _traguardoTestoPaziente *(righe in italiano semplice, riusate dal messaggio WhatsApp)*
- `7276` — _vistaPazienteHtml *(i tre riquadri che guarda il paziente)*
- `7356` — _percorsoChartSvg *(due corsie: peso + massa magra + cono proiezione sopra, striscia aderenza in mezzo (solo con dati P50), energia (kcal) sotto — tutto gated dagli interruttori)*
- `7545` — renderPdPercorso *(scheda: badge fase, riga proiezione/obiettivo, riga Piano vs Realtà (solo con dati), toolbar interruttori, grafico, editor)*

*(Tappa 2 tocca anche `calcolaMacros`: box obiettivo con intervallo al posto della data secca.)*

---

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 8149-8853

- `8149` — salvaAggiustamento
- `8182` — eliminaAggiustamento
- `8191` — renderPdNote
- `8226` — salvaNotaClinica
- `8241` — deleteNota
- `8250` — saveNote
- `8765` — _applicaRegoloSemaforoLEGACY
- `8806` — resetSemaforoAuto
- `8853` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 9071-9269

- `9071` — avviaFX
- `9099` — avviaAnalisi
- `9116` — _renderFlussoPanel
- `9160` — _riepEsc
- `9164` — _riepNum
- `9170` — _riepDelta
- `9178` — _riepDataSig
- `9196` — _riepParseFX
- `8087` — clean
- `9210` — _riepAggiornaFX
- `9236` — _riepToggleDomandaDefault
- `9248` — _riepAddDomanda
- `9261` — _riepRemoveDomanda
- `9269` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 9481-9707

- `8218` — dCol
- `8336` — card
- `9481` — renderPdRagionamento
- `9569` — inviaMessaggioRag
- `9587` — concludiERiassumi
- `9601` — salvaRagionamento
- `9622` — apriGeneratoreDaRag
- `9630` — nuovaSessioneRag
- `9636` — cancellaSavedRag
- `9646` — renderPazTimeline
- `9678` — renderPdAnamnesi
- `9707` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 11124-12259

- `11124` — _anNorm *(P125 — testo confrontabile: minuscole, niente accenti)*
- `11130` — _anCorrisponde *(P125 — ricerca per parole-prefisso: "vit d" trova "Vitamina D")*
- `11136` — filtraAnalisi *(P125 — filtro dal vivo delle 119 voci)*
- `11170` — pulisciRicercaAnalisi
- `11176` — renderPdAnalisi
- `11232` — toggleAnalisiSection
- `11381` — loadAnalisiSanguePDF
- `11268` — _impPdfConfigurata
- `11269` — _impPdfLib
- `11279` — _impPdfApri
- `11292` — _impPdfPagina *(P124b — una pagina del PDF → immagine, con la rotazione RILEVATA, non quella dichiarata dal file)*
- `11313` — _impRuotaImmagine
- `11338` — _impRilevaRotazione *(P124b — chiamata piccola: di quanti gradi va girata la pagina)*
- `11357` — _impPromptPagina *(P124b — prompt di UNA pagina, con l'impronta della riga: valore+unità+riferimento)*
- `11556` — _impNormalizzaNumero *(P124 — numero all'italiana → punto decimale, conversione fatta dall'app e non dall'AI)*
- `11567` — _impNumeri
- `11575` — _impSembraIntervallo
- `11583` — _impUgualeAlRange
- `11592` — _impLimitiStd
- `11613` — _impFuoriScala
- `11622` — _impCorrezioneVirgola
- `11634` — _impTestoLimiti
- `11655` — _impRifPlausibile *(P124b — un "riferimento" che è un'unità di misura = riga disallineata)*
- `11668` — _impUnitaCanonica
- `11690` — _impStessaGrandezza *(P124b — stesso tipo di misura a meno del prefisso: nanomoli/micromoli/millimoli)*
- `11707` — _impUnitaCompatibili
- `11718` — _impControllaValore *(P124 — i controlli anti-errore su un valore estratto)*
- `11782` — mostraDiffAnalisi *(P124 — colonna Estratto modificabile + righe sospette deselezionate)*
- `11972` — _calcoloIncluso
- `11978` — toggleCalcoloIncluso
- `12000` — _renderCalcoliPannello
- `12041` — toggleGlossario
- `12046` — updateAnalisi
- `12105` — salvaAnalisi
- `12118` — applicaGruppoClinico
- `12147` — renderBoxGruppiCliniciSuggeriti
- `12179` — suggerisciGruppiClinici
- `12259` — renderMemoriaInbody

---
### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9176 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `9833` — _richVal
- `9840` — _richBmi
- `9845` — _richPat
- `9851` — _richNum
- `9896` — _richPreselezione
- `9912` — richLeggiIntestazione
- `9916` — richSalvaIntestazione
- `9925` — apriRichiestaAnalisi
- `9945` — _richModaleHtml
- `10021` — _richEsc
- `10023` — _richMotivoCambia
- `10029` — _richToggleSez
- `10035` — _richAggiornaConteggi
- `10043` — _richMotivoCorrente
- `10053` — _richSelezione
- `10068` — _richTxt
- `10074` — _richCostruisciPDF
- `8969` — nuovaPagina
- `8970` — spazio
- `10170` — _richNomeFile
- `10175` — _richPrepara
- `10185` — _richRegistra
- `10199` — _richStato
- `10201` — richScaricaPDF
- `10216` — _richUpload
- `10244` — _richWaUrl
- `10251` — _richTestoWa
- `10265` — richInviaWhatsApp
- `10305` — richCopiaLink
- `10326` — _richStoricoHtml

---
### REFERTI DEL SANGUE DATATI — storico nel tempo (P118 tappa 1)
Righe 9194-9387 — migrazione, ordinamento, quadro attuale derivato, barra di selezione.

- `10901` — _refertoNuovoId
- `10904` — _refertoOggi
- `10908` — _refertoDataIt
- `10914` — _refertoConteggio
- `10928` — _refertiMigra
- `10955` — _refertiOrdinati
- `10966` — _refertoPiuRecente
- `10971` — _refertoInVista
- `10989` — _refertiApplica
- `11002` — _refertoCrea
- `11021` — refertoCambiaVista
- `11027` — refertoCambiaData
- `11039` — refertoNuovo
- `11047` — refertoDuplica
- `11056` — refertoElimina
- `11071` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `10514` — _rangeNum
- `10520` — _rangeTestoDa
- `10539` — _rangeCoppia
- `10549` — _rangeHtml

---
### ANDAMENTO NEL TEMPO — tracciato, variazione, grafico grande (P118 tappa 3)
Righe 9441-9745 — serie storica, regola del colore, sparkline, pannello in fondo.

- `10591` — _andLimiti
- `10612` — _andParseRangeLab
- `10625` — _andDistanza
- `10632` — _andValutazione
- `10645` — _andSerie
- `10659` — _andNum
- `10663` — _andDataBreve
- `10668` — _andMeseAnno
- `10676` — _andDominio
- `10690` — _andColore
- `10703` — _andSparkHtml
- `10729` — _andRigaHtml
- `10751` — _andEsamiSeguibili
- `10759` — andScegliEsame
- `10765` — _andPannelloHtml
- `10818` — _andGraficoGrande
- `10869` — _andPasso

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 12307-12718

- `12307` — _ibFmtBreve
- `12316` — _renderPesiIntermediSection
- `12365` — aggiungiPesoIntermedio
- `12381` — eliminaPesoIntermedio
- `12391` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `12718` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 12990-12990

- `12990` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 13368-15909

- `13368` — aggiornaLabelMacros
- `13386` — calcolaMacros
- `13527` — applicaSchema
- `13562` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `13568` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `13590` — _misuraDaReferto *(P127 — UN referto letto con le regole del traguardo: usata anche dalla verifica al controllo)*
- `13623` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `13634` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `13652` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `13765` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `13779` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `13835` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `13849` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `13881` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `13914` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `13956` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `13964` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `13975` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `14002` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `14017` — _stradeVerso *(le strade complete + percentuale libera)*
- `14064` — _VC_TOLLERANZA_PCT / _VC_GIORNI_MIN / _VC_GIORNI_MIN_RITARO / _VC_COPERTURA_MIN_PCT / _VC_MAGRA_PRUDENZA_GG *(P127 — soglie cliniche della verifica)*
- `14074` — _mediaSlotPrescritta *(media pesata sui giorni di un campo dello storico target; la usa anche _kcalMediaPrescrittaOss)*
- `14094` — _vcDeficitSlot *(deficit di uno slot: campo offset o kcal−tdee per gli slot vecchi)*
- `14102` — _vcTratto *(P127 — cosa è cambiato fra due referti, previsto vs reale, TDEE misurato)*
- `14156` — _vcTraguardoSalvato *(traguardo ricostruito dal salvato, per la scheda Percorso)*
- `14166` — _verificaControllo *(P127 — motore puro: tratto recente, quadro dall'inizio, residuo al ritmo reale)*
- `14204` — _verificaControlloHtml *(blocco 🔎, unica fonte per pannello 🎯 e scheda Percorso; azioni solo dove c'è il campo kcal)*
- `14296` — _vcRitara *(scrive le kcal ritarate nel campo regime: propone, non salva)*
- `14309` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `14377` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `14399` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `14452` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `14559` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `14574` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `14599` — _renderRifPesoBox
- `14650` — _usaRifPeso
- `14654` — _aggiornaRifPesoTarget
- `14657` — _aggiornaRegimeSlider
- `15314` — _presetRegime
- `15318` — _initRegimeSliderDaPaziente
- `15336` — ricalcolaLAF
- `15470` — renderStoricoTDEE
- `15504` — attivaSlotTDEE
- `15512` — eliminaSlotTDEE
- `15525` — _toggleCiclizzazione
- `15531` — _aggiornaAnteprimaCiclizzazione
- `15549` — salvaCalcoloMacros
- `15663` — _metAllenamento
- `15679` — _neatFrazione
- `15753` — _larnLafStileVita
- `15770` — _regimeOffset
- `15780` — _componiRegimeText
- `15813` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `15825` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `15832` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `15909` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 15927-16357

- `15927` — renderTargetBadge
- `15956` — verificaRegola_75_20_5
- `15993` — renderBadge75_20_5
- `16058` — _validaNorm
- `16061` — _validaMatchTermine
- `16069` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `16120` — _validaTesto
- `16141` — validaPiano
- `16215` — _validaFirmaBlocchi
- `16222` — renderBadgeValidatore
- `16253` — _validaVaiAlGiorno
- `16262` — apriPannelloValidatore
- `13472` — esc
- `16319` — _validaEseguiOverride
- `16342` — validaGateExport
- `16357` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 16490-17122

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
- `16490` — pianoPazSelezionato
- `16637` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `16875` — renderPanelMacrosGiorno
- `17018` — pmgCambiaGrammi
- `17045` — riapriPiano
- `17083` — _montaPianoCorrente
- `17122` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 17132-17601

- `17132` — pullTemplateSupabase
- `17143` — delTemplateSupabase
- `17152` — _promptTemplateNome
- `17177` — _creaTemplateDaJSON
- `17200` — salvaComeTemplate
- `17211` — salvaComeTemplateDaPiano
- `17220` — _normNomeAlim
- `17221` — _escRegAlim
- `17222` — _raccogliAlimentiDaPiano
- `17233` — _alimentiEsclusiPaziente
- `17245` — _trovaConflittiTemplate
- `17263` — _mostraAvvisoConflitti
- `17287` — applicaTemplate
- `17305` — apriPickerTemplate
- `17333` — _pickPaziente
- `17352` — applicaTemplatePick
- `17356` — rinominaTemplate
- `17367` — eliminaTemplate
- `17377` — renderLibreriaTemplate
- `17406` — renderStoricoPiani
- `17465` — eliminaPiano
- `17481` — _getActiveMacrosTarget
- `17505` — getTargetAttivi
- `17542` — calcolaTargetsCiclizzazione
- `17568` — _setupPianoTargets
- `17592` — getStagioneCorrente
- `17601` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 18035-18035

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `18035` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 18044-18503

- `18044` — aggiornaUIcolazione
- `18054` — salvaRegolePiano
- `18115` — _isModelloSistema
- `18118` — _isModelloSistemaModificato
- `18130` — caricaModelliCustomLocal
- `18144` — salvaModelliCustomLocal
- `18165` — _migraRecordCustom
- `18180` — _syncAliasLegacy
- `18189` — caricaAlimentiCustom
- `18213` — pushAlimentiCustomSupabase
- `18223` — pullAlimentiCustomSupabase
- `18237` — pushModelliSupabase
- `18255` — pullModelliSupabase
- `18280` — _calcolaFreqDaModello
- `18299` — aggiornaUImodello
- `18388` — popolaDropdownModelli
- `18416` — cambiaModelloRotazione
- `18422` — ripristinaModelloOriginale
- `18445` — eliminaModelloCustom
- `18463` — mostraAnteprimaModello
- `18473` — apriEditorModello
- `18503` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 18772-19010

- `15738` — rerender
- `18772` — _salvaModelloDaEditor
- `18814` — caricaRegolePiano
- `18844` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `18879` — _aiLogUsage
- `18901` — _aiProxyUrl
- `18907` — _aiTokenPerProxy
- `18936` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `19010` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 19089-19229

- `16216` — _risolviCollisioniCelle
- `19089` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `19149` — getFruttaStile
- `19156` — _fruttaGetPasto
- `19166` — _fruttaContaRigheRicetta
- `19170` — _fruttaIndiceBasePasto
- `19190` — getFruttaMarker
- `19203` — fruttaMarkerHtml
- `19211` — _fruttaCheckboxHtml
- `19220` — toggleFrutta
- `19229` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 19265-20539

- `19265` — _renderCelleGriglia
- `19345` — _renderRicetteTestuali
- `19384` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `19455` — _renderCelleHtml
- `19463` — toggleCellaMenu
- `19482` — closeAllCellaMenus
- `19490` — _trovaPasto
- `19498` — cellaSposta
- `19552` — cellaCancella
- `19573` — apriEditGrammatura
- `16789` — salva
- `19621` — cellaSwap
- `19641` — cellaRimuoviAlt
- `19655` — cellaAggiungiAlt
- `19758` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `19843` — apriEditRicetta
- `19852` — aggiungiRicetta
- `19868` — rimuoviRicetta
- `19877` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `20039` — ngAggiungiSpuntinoVuoto
- `20055` — apriAggiungiCella
- `17254` — risolviCompatibili
- `20151` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `20243` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `20384` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `20539` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 20587-20968

- `20587` — _attesoStrutturaPiano
- `20607` — _confrontaStrutturaPiano
- `20637` — _costruisciPromptDelta
- `20664` — _pianoToolSchema
- `20739` — _pianoMaxTokens
- `20748` — _estraiPianoDaRisposta
- `20770` — chiamaGeneraPiano
- `20937` — mostraLoadingSteps
- `18123` — render
- `20968` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 21035-21609

- `21035` — generaMessaggioAI
- `21140` — copiaMessaggioAI
- `21150` — salvaInStorico
- `21162` — salvaVarianteAI
- `21177` — renderVariantiSalvate
- `21196` — usaVariante
- `21214` — eliminaVariante
- `21225` — renderStoricoMsg
- `21241` — apriWhatsApp
- `21609` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 21787-23284

- `21787` — _ngColoreSemaforoNome
- `21795` — apriSceltaModalitaPiano
- `21830` — _ngChiudiModalita
- `21833` — _ngCostruisciGiornoVuoto
- `21866` — _ngCostruisciGiornoSpeciale
- `21877` — _ngIndiceInizioSpeciali
- `21888` — _ngModalitaNomeGiorno
- `21894` — _ngImpostaModalitaNomeGiorno
- `21897` — _ngLettera
- `21904` — _ngEtichettaGiorno
- `21924` — _ngEtichettaGiornoBreve
- `21938` — _ngToggleGiornoSpeciale
- `21962` — _ngRenderPannelloSpeciale
- `22030` — _generaGiornoSpecialeAI
- `22130` — _ngGiornoHaContenuto
- `22142` — _ngCreaPianoManuale
- `22165` — _ngScrollTabGiorni
- `22175` — _ngAbilitaDragScroll
- `22212` — _ngCambiaNumeroGiorni
- `22244` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `22258` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `22299` — _ngToggleCat
- `22308` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `22332` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `22488` — _ngSalvaPianoManuale
- `22514` — _ngParseIngrediente
- `22538` — _ngScomponiIngredienti
- `22550` — _ricCalcolaMacroDaIngredienti
- `22568` — _ricRicalcolaMacroLive
- `22575` — _ricAggiornaInfoMacro
- `22589` — _ricRicalcolaMacroLiveNow
- `22613` — _ngTrovaCategoriaAlimento
- `22646` — _ngPescaRicetta
- `22689` — _ngScomponiRicettaNelPasto
- `22726` — _ngDragStart
- `22737` — _ngDragStartCella
- `22748` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `22755` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `22760` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `22779` — _ngAggiungiAlimento
- `22804` — _ngRimuoviAlimento
- `22818` — _ngDopoModifica
- `22836` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `22889` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `22918` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `22935` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `22943` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `23015` — gramTestoCasalingo
- `23041` — _appendToggleNutrizionali
- `23084` — _appendTogglePromemoria
- `23113` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `23259` — cpFromEmoji
- `23265` — getEmojiCp
- `23284` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `21259` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `21281` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `21286` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `21312` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `21400` — _spesaTestoWhatsApp
- `21416` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `21461` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `21484` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `21512` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `21572` — scaricaListaSpesaPDF (download diretto, un click)
- `21580` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `21592` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 24432-24432

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
- `24432` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 24443-24649

- `24443` — salvaInbody
- `24507` — delInbody
- `24514` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `24649` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 24677-25146

- `24677` — buildSemLegenda
- `24691` — renderAlEditor
- `24752` — _alimNomeRegex
- `24760` — _alimGiorniDaPiano
- `24768` — _scanGiorniPerNome
- `24783` — scanRiferimentiAlimento
- `24812` — _alimRefsRighe
- `24818` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `24906` — modificaAlimentoCustom
- `24926` — ripristinaValoriPrecedentiAlimento
- `24938` — _resetAlimModal
- `24949` — apriNuovoAlimentoCustom
- `24955` — salvaAlimentoCustom
- `25022` — eliminaAlimentoCustom
- `25053` — _alimFonteBadge
- `25058` — renderAlimentiPage
- `22217` — E
- `25128` — archiviaAlimentoCustom
- `25146` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 25173-25414

- `25173` — _bcSetStatus
- `25175` — apriScannerBarcode
- `25183` — chiudiScannerBarcode
- `25188` — _bcStopCamera
- `25196` — _bcModaleAperto
- `25198` — _bcAvviaCamera
- `25209` — _bcAvviaNativo
- `25229` — _bcAvviaZXing
- `25238` — _bcZXStart
- `25249` — _bcErroreCamera
- `25257` — cercaBarcodeManuale
- `25263` — _barcodeTrovato
- `25279` — cercaBarcodeOFF
- `25297` — _bcProdottoNonTrovato
- `25311` — _bcPrecompilaForm
- `22477` — num
- `25335` — togAl
- `25388` — selCatAl
- `25402` — selTuttiAl
- `25414` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 25428-25744

- `25428` — setCalView
- `25429` — calPrev
- `25430` — calNext
- `25431` — calToday
- `25433` — renderCal
- `25447` — renderCalMonth
- `25471` — renderCalWeek
- `25489` — renderCalDay
- `25505` — selGiorno
- `25519` — setDisp
- `25524` — openAddEvento
- `25537` — openAddEventoPaz
- `25543` — toggleEntrataCheck
- `25548` — salvaEvento
- `25571` — openEvDetail
- `25626` — delEvento
- `25634` — copyMsg
- `25641` — aggDateCal
- `25646` — syncInizio
- `25647` — syncControllo
- `25648` — aggiornaPrev
- `25665` — renderRic
- `25692` — openNuovaRic
- `25693` — editRic
- `25703` — salvaRic
- `25728` — delRic
- `25744` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 25829-25889

- `25829` — aggiungiEntrataPerPaziente
- `25846` — openNuovaEntrata
- `25860` — salvaEntrata
- `25881` — delEntrata
- `25889` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 25919-26355

- `25919` — aiSuggerisciRicetta
- `25964` — renderConcettiModal
- `25983` — apriConcettiModal
- `26010` — salvaConcettiAllegati
- `26034` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `26072` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `26081` — loadInbodyPDF
- `26192` — _vitdLabel
- `26196` — getIntegratori
- `26200` — getIntegraWant
- `26204` — setIntegratori
- `26221` — setIntegraWant
- `26232` — getPatologieChip
- `26233` — getAllergieChip
- `26234` — setPatologieChip
- `26235` — setAllergieChip
- `26236` — getPatologie
- `26237` — getAllergie
- `26238` — setPatologieFromStr
- `26245` — setAllergieFromStr
- `26258` — getSdvChip
- `26259` — getCspChip
- `26260` — setSdvChip
- `26261` — setCspChip
- `26262` — setSdvFromStr
- `26263` — setCspFromStr
- `26267` — getBudget
- `26268` — setBudget
- `26273` — renderCalAnno
- `26304` — comprimeImmagine
- `26326` — uploadImmagineConcetto
- `26345` — rimuoviImmagineConcetto
- `26355` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 26421-26525

- `26421` — entraSelConcetti
- `26422` — annullaSelConcetti
- `26423` — toggleConcettoSel
- `26428` — eliminaConcettiSelezionati
- `26447` — confermaEliminaConcetti
- `26462` — aiRiscriviConcetto
- `26476` — editConcetto
- `26494` — salvaConcetto
- `26505` — openNuovoConcetto
- `26525` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 26526-26689

- `26526` — saveAgendaPersonale
- `26527` — getAgendaTodo
- `26528` — saveAgendaTodo
- `26530` — pulisciAgendaVecchia
- `26534` — navigaAgenda
- `26543` — toggleFormAgenda
- `26544` — toggleFormTodo
- `26546` — salvaAgendaItem
- `26560` — salvaTodoItem
- `26572` — toggleAgendaFatto
- `26580` — toggleTodoFatto
- `26593` — _catCol
- `26595` — renderAgendaDx
- `26689` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 26815-27019

- `26815` — renderScadenzeAlert
- `27000` — segnaGestito
- `27019` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 27028-27103

- `27028` — ripristinaPaz
- `27036` — eliminaPaz
- `27081` — getDove
- `27085` — setDove
- `27103` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 27108-27548

- `27108` — getCredenzialiPersistenti
- `27121` — cancellaCredenzialiPersistenti
- `27126` — rinnovaSessioneConRefreshToken
- `27143` — getSessioneSalvata
- `27162` — salvaSessione
- `27172` — cancellaSessione
- `27176` — eseguiLogin
- `27223` — eseguiLogout
- `27245` — mostraApp
- `27250` — verificaSessioneEAvvia
- `27278` — assicuraTokenValido
- `27307` — _garantiscoSessionePerSync
- `27319` — avviaRinnovoTokenPeriodico
- `27323` — fermaRinnovoTokenPeriodico
- `27332` — _authReset
- `27337` — _authMostra
- `27340` — mostraLogin
- `27341` — mostraRegistrazione
- `27342` — mostraRecupero
- `27343` — mostraNuovaPassword
- `27346` — eseguiRegistrazione
- `27384` — eseguiRecuperoPassword
- `27413` — eseguiNuovaPassword
- `27447` — _parseHashParams
- `27454` — _pulisciHash
- `27458` — gestisciRitornoAuth
- `27548` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 27620-27743

- `27620` — apriPannelloRicette
- `27649` — chiudiPannelloRicette
- `27657` — applicaRicettaPasto
- `27693` — inizializzaP2
- `27705` — deepClone
- `27709` — applicaPatch
- `27743` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
