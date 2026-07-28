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
Righe 3916-4295

- `3916` — getCfg
- `3917` — saveCfgL
- `3918` — getUrl
- `3919` — saveLocal
- `3920` — loadLocal
- `3931` — uid
- `3932` — today
- `3933` — addDays
- `3934` — fData
- `3935` — fEur
- `3937` — getLastSyncText
- `3947` — getSyncColor
- `3955` — aggiornaStatoSync
- `3981` — setSyncStatus
- `4249` — _registraTombstone
- `4257` — _tombstoneAttivi
- `4269` — _fondiTombstones
- `4283` — _mergeTombstonesRemoti *(dal 24/7 legge il meta da `collections`, P74 1d)*
- `4295` — _applicaTombstones
- `4156` — _pazFetchMeta *(P74 1d — solo `collections`)*
- `4177` — _collectionsUpsert *(P74 — scrittura primaria dei 4 meta-record dal cutover 1d)*
- `4199` — _collectionsFetch *(P74 1d — lettura unica dei meta-record)*
- `4222` — _analisiSangueUpsert *(P74 fase 2 — scrittura ombra analisi del sangue, 24/7)*

---

### SYNC SUPABASE — push/pull ricette/pazienti, tombstones, conflitti (P69)
Righe 4319-4704

- `4319` — supaHeaders
- `4333` — pushRicetteSupabase
- `4358` — pullRicetteSupabase
- `4380` — delRicetteSupabase
- `4392` — delPazienteSupabase
- `4407` — pushToSheets
- `4451` — pullFromSheets
- `4530` — syncNow
- `4543` — sincronizzaTutto
- `4360` — stpSet
- `4365` — stpMsg
- `4674` — testConnSupabase
- `4704` — _p68LogSaveAnonimo

---

### SYNC SUPABASE — save paziente, piani/cache piano, entrate, eventi
Righe 4718-5234

- `4718` — save
- `4736` — _pushRigaPerId
- `4769` — _flushDirtyIds
- `4852` — _p69LoadBaseline
- `4855` — _p69StoreBaseline
- `4858` — _p69SetBaseline
- `4862` — _p69DropBaseline
- `4866` — _p69SetBaselineFromRows
- `4872` — _p69NomePaz
- `4877` — _p69InList
- `4885` — _p69RilevaConflitti
- `4921` — _p69DialogoConflitti
- `4738` — chiudi
- `4955` — _p69RisolviRicarica
- `4984` — _p69EsportaLocali
- `4997` — _p69RisolviSovrascrivi
- `5010` — pushPianoSupabase
- `5032` — pullPianiSupabase
- `5048` — delPianoSupabase
- `5064` — delPianiPazienteSupabase
- `5076` — pushCachePianoSupabase
- `5093` — caricaCachePianoSupabase
- `5115` — pushEntrateSupabase
- `5139` — pullEntrateSupabase
- `5153` — delEntrataSupabase
- `5161` — pushEntrataSupabase
- `5172` — pushEventoSupabase
- `5185` — pushEventiSupabase
- `5209` — pullEventiSupabase
- `5223` — delEventoSupabase
- `5234` — _pianoCacheKey

---

### UI GENERALE — config AI key, notifiche, navigazione (goTo/tab/modali)
Righe 5265-5377

- `5265` — _salvaPianoCache
- `5270` — _caricaPianoCache
- `5276` — salvaCfg
- `5277` — testConn
- `5284` — testaAntKey
- `5295` — initAntCard
- `5298` — esporta
- `5299` — importa
- `5304` — goTo
- `5321` — closeM
- `5329` — ngChiudiModale
- `5338` — ngChiudiPopupCoppia
- `5342` — ngAggiungiX
- `5353` — ngUpgradeModali
- `5373` — mTab
- `5374` — aggiornaEta
- `5375` — toggleOrarioNote
- `5376` — pdTab
- `5377` — notif

---

### PAZIENTI — registro: lista/card/kanban, apertura, editing, salvataggio, routine
Righe 5385-8151

- `5385` — getPazView
- `5386` — setPazView
- `5395` — _pazStatoPiano
- `5403` — _pazUrgenzaControllo
- `5410` — _pazStatoTagHtml
- `5419` — _pazAggiornaFiltroRegimi
- `5427` — renderPaz
- `5480` — _renderPazCard
- `5505` — _renderPazLista
- `5532` — _renderPazKanban
- `5570` — openNuovoPaz
- `5596` — editPaz
- `5674` — REGOLE_SEMAFORO_ALIMENTI *(15 condizioni cliniche → grigi/celesti; globale dal 26/7 per essere verificabile dal test)*
- `6121` — _SEM_COLORI_LEGACY / `6105` _SEM_COLORI_AUTO *(F9 — unico vocabolario dei colori automatici)*
- `6126` — NOMI_CONDIZIONE_SEMAFORO *(etichette delle 15 condizioni, usate anche dal riquadro della scheda)*
- `6148` — _semaforoCondizioniAttive *(le condizioni spuntate su un paziente)*
- `6159` — _semaforoMigraPaziente *(F9 — toglie i colori legacy e ricalcola; idempotente)*
- `6170` — _semaforoMigraTutti *(passata su tutti i pazienti in memoria, con conteggio)*
- `6181` — applicaRegoloSemaforo *(dal 26/7 pulisce TUTTI e sei i colori automatici, non solo i suoi due)*
- `6269` — trovaChiaveAlimento *(match esatto sul nome: se non trova, la regola è ignorata in silenzio — vedi test s2-regole-nomi-alimenti)*
- `6293` — _pazNumOPrec *(F7 — campo assente = valore precedente, non azzeramento)*
- `6305` — _pazPreservaCampi *(F5 — l'anagrafica non cancella i campi che il form non gestisce)*
- `6311` — salvaPaz
- `6387` — openPaz
- `7838` — renderPdRoutine
- `6723` — cardHTML
- `7980` — updateRoutineCampo
- `7988` — suggerisciPastoEQuando
- `8015` — filtroLibreria
- `8024` — renderLibreriaGrid
- `8045` — aggiungiDaLibreriaIdx
- `8069` — openModalRoutine
- `8076` — salvaRoutineVoce
- `8101` — salvaRoutine
- `8108` — mostraRoutinePopup
- `8136` — removeRoutineVoce
- `8151` — _renderAggiustamentiSection

---

### 📈 PERCORSO — timeline di periodizzazione (P115 Tappe 1-5 COMPLETE, 24 lug 2026)
Righe 6021-6621 (numeri ESATTI al 24/7 notte, dopo la Tappa 5). ⚠️ Questo blocco (~600 righe) fa slittare tutti i numeri delle sezioni SUCCESSIVE a riga ~6020 rispetto all'ultima rigenerazione completa: per quelle sezioni fare grep di conferma. Rigenerazione completa alla prossima modifica strutturale.

- `6432` — _PERCORSO_TIPI (const: tipi fase, colori, pct default)
- `6439` — _percorsoGet *(normalizza p.percorso, scarta fasi invalide)*
- `6461` — _percorsoIsoLocal *(data → YYYY-MM-DD LOCALE, mai toISOString/UTC)*
- `6467` — _percorsoIntervalli *(fasi consecutive → date concrete dal/al)*
- `6481` — _percorsoFaseAt *(fase attiva a una data; dal incluso, al escluso)*
- `6490` — _percorsoKcalFase *(pct → kcal indicative via calcolaTDEE)*
- `6513` — _percorsoProiezione *(Tappa 2 — proiezione ibrida teorica/calibrata, cono, obiettivo a intervallo)*
- `6571` — _percorsoDataBreve *(ISO → "12 set")*
- `6588` — _percorsoSerieEnergia *(Tappa 3 — serie introito/TDEE stimato/TDEE osservato per la corsia energia)*
- `6627` — _percorsoSerieMassaMagra *(Tappa 4 — solo InBody: punti {data,m,pg})*
- `6646` — _percorsoConsuntivo *(Tappa 5 — legge p.consuntivo scritto da P50: aderenza, extra kcal, ritardo=extra÷7700, settimane perse; oggi sempre ok:false)*
- `6688` — _PERCORSO_LAYERS_DEFAULT / _percorsoLayersState / _percorsoLayersGet *(Tappa 4 — stato interruttori, SOLO sessione, mai su p)*
- `6693` — percorsoLayerToggle *(Tappa 4 — inverte un solo strato)*
- `6699` — percorsoVistaPreset *(Tappa 4 — preset "tecnica"/"paziente")*
- `6715` — _percorsoPaz *(e a seguire i mutatori percorsoInit/SetInizio/AddFase/UpdFase/DelFase/MoveFase)*
- `6771` — _PERCORSO_MODELLI / _PERCORSO_GEN *(P122 T3 — 4 modelli + regole dei cicli)*
- `6789` — _percorsoGeneraFasi *(P122 T3 — pura: dal traguardo alle fasi, ritmo = quello della proiezione)*
- `6869` — _percorsoModelloSelectHtml
- `6878` — percorsoGeneraDaModello *(propone; conferma prima di sostituire fasi esistenti)*
- `6901` — _percorsoShiftGiorni *(pura: ancora = ultima pesata)*
- `6911` — percorsoRiallinea *(⏩ trasla il piano, riprende dal giorno-fase dell'interruzione)*
- `6938` — _TRG_TIPI / `6744` _TRG_COMPORTAMENTI *(P122 T4 — tipi di traguardo e libreria comportamenti)*
- `6960` — _traguardiGet · `6761` _traguardoValoreAttuale *(valore corrente dai dati esistenti, null se manca)*
- `6999` — _traguardoVerso *(auto: dedotto dalla partenza)* · `6803` _traguardoValuta · `6824` _traguardiValuta
- `7040` — traguardoAdd · `6852` traguardoUpd · `6867` traguardoDel · `6873` traguardoSegna
- `7098` — _COND_TIPI · `6897` _percorsoCondizione *(pura: la fase finisce per soglia — SOLO suggerimento)*
- `7114` — percorsoSetCondizione · `6927` percorsoChiudiFase *(esito fotografato, riapribile)*
- `7148` — _traguardiHtml *(blocco 🏁 in fondo alla scheda Percorso)*
- `7246` — _percorsoVistaPaz / `7049` _percorsoVistaPazAttiva *(P122 T5 — modalità di sessione)*
- `7253` — _percorsoVittorie *(pura: vittorie dall'inizio del percorso + flag ricomposizione)*
- `7291` — _percorsoNascondiPeso *(in fase di massa il peso non si mostra al paziente)*
- `7302` — _traguardoFaseCorrente *(traguardo della fase IN CORSO, non quello lontano)*
- `7330` — _traguardoTestoPaziente *(righe in italiano semplice, riusate dal messaggio WhatsApp)*
- `7363` — _vistaPazienteHtml *(i tre riquadri che guarda il paziente)*
- `7443` — _percorsoChartSvg *(due corsie: peso + massa magra + cono proiezione sopra, striscia aderenza in mezzo (solo con dati P50), energia (kcal) sotto — tutto gated dagli interruttori)*
- `7632` — renderPdPercorso *(scheda: badge fase, riga proiezione/obiettivo, riga Piano vs Realtà (solo con dati), toolbar interruttori, grafico, editor)*

*(Tappa 2 tocca anche `calcolaMacros`: box obiettivo con intervallo al posto della data secca.)*

---

### PAZIENTI — aggiustamenti terapia, note cliniche, semaforo alimentare (auto+legacy)
Righe 8236-8407

- `8236` — salvaAggiustamento
- `8269` — eliminaAggiustamento
- `8278` — renderPdNote
- `8313` — salvaNotaClinica
- `8328` — deleteNota
- `8337` — saveNote
- `8357` — resetSemaforoAuto *(F9 — pulsante 🔄 Ricalcola: pulisce gli automatici e rifà col sistema valido; il motore LEGACY non esiste più)*
- `8407` — costruisciContestoPaziente

---

### AI/FX — contesto paziente per prompt, ragionamento clinico automatico (avviaFX)
Righe 8625-8823

- `8625` — avviaFX
- `8653` — avviaAnalisi
- `8670` — _renderFlussoPanel
- `8714` — _riepEsc
- `8718` — _riepNum
- `8724` — _riepDelta
- `8732` — _riepDataSig
- `8750` — _riepParseFX
- `8087` — clean
- `8764` — _riepAggiornaFX
- `8790` — _riepToggleDomandaDefault
- `8802` — _riepAddDomanda
- `8815` — _riepRemoveDomanda
- `8823` — renderPdRiepilogo

---

### AI/FX — riepilogo paziente, ragionamento esteso, timeline, anamnesi
Righe 9035-9261

- `8218` — dCol
- `8336` — card
- `9035` — renderPdRagionamento
- `9123` — inviaMessaggioRag
- `9141` — concludiERiassumi
- `9155` — salvaRagionamento
- `9176` — apriGeneratoreDaRag
- `9184` — nuovaSessioneRag
- `9190` — cancellaSavedRag
- `9200` — renderPazTimeline
- `9232` — renderPdAnamnesi
- `9261` — renderPdAlimenti

---

### ANALISI DEL SANGUE — UI scheda paziente, diff import PDF, calcoli pannello, gruppi clinici
Righe 10967-12102

- `10967` — _anNorm *(P125 — testo confrontabile: minuscole, niente accenti)*
- `10973` — _anCorrisponde *(P125 — ricerca per parole-prefisso: "vit d" trova "Vitamina D")*
- `10979` — filtraAnalisi *(P125 — filtro dal vivo delle 119 voci)*
- `11013` — pulisciRicercaAnalisi
- `11019` — renderPdAnalisi
- `11075` — toggleAnalisiSection
- `11224` — loadAnalisiSanguePDF
- `11111` — _impPdfConfigurata
- `11112` — _impPdfLib
- `11122` — _impPdfApri
- `11135` — _impPdfPagina *(P124b — una pagina del PDF → immagine, con la rotazione RILEVATA, non quella dichiarata dal file)*
- `11156` — _impRuotaImmagine
- `11181` — _impRilevaRotazione *(P124b — chiamata piccola: di quanti gradi va girata la pagina)*
- `11200` — _impPromptPagina *(P124b — prompt di UNA pagina, con l'impronta della riga: valore+unità+riferimento)*
- `11399` — _impNormalizzaNumero *(P124 — numero all'italiana → punto decimale, conversione fatta dall'app e non dall'AI)*
- `11410` — _impNumeri
- `11418` — _impSembraIntervallo
- `11426` — _impUgualeAlRange
- `11435` — _impLimitiStd
- `11456` — _impFuoriScala
- `11465` — _impCorrezioneVirgola
- `11477` — _impTestoLimiti
- `11498` — _impRifPlausibile *(P124b — un "riferimento" che è un'unità di misura = riga disallineata)*
- `11511` — _impUnitaCanonica
- `11533` — _impStessaGrandezza *(P124b — stesso tipo di misura a meno del prefisso: nanomoli/micromoli/millimoli)*
- `11550` — _impUnitaCompatibili
- `11561` — _impControllaValore *(P124 — i controlli anti-errore su un valore estratto)*
- `11625` — mostraDiffAnalisi *(P124 — colonna Estratto modificabile + righe sospette deselezionate)*
- `11815` — _calcoloIncluso
- `11821` — toggleCalcoloIncluso
- `11843` — _renderCalcoliPannello
- `11884` — toggleGlossario
- `11889` — updateAnalisi
- `11948` — salvaAnalisi
- `11961` — applicaGruppoClinico
- `11990` — renderBoxGruppiCliniciSuggeriti
- `12022` — suggerisciGruppiClinici
- `12102` — renderMemoriaInbody

---
### RICHIESTA ANALISI DEL SANGUE — foglio per il medico curante (P116)
Righe 8602-9176 — catalogo voci, regole di preselezione, modale checklist, PDF, invio.

- `9391` — _richVal
- `9398` — _richBmi
- `9403` — _richPat
- `9409` — _richNum
- `9454` — _richPreselezione
- `9470` — richLeggiIntestazione
- `9474` — richSalvaIntestazione
- `9483` — apriRichiestaAnalisi
- `9503` — _richModaleHtml
- `9579` — _richEsc
- `9581` — _richMotivoCambia
- `9587` — _richToggleSez
- `9593` — _richAggiornaConteggi
- `9601` — _richMotivoCorrente
- `9611` — _richSelezione
- `9626` — _richTxt
- `9632` — _richCostruisciPDF
- `8969` — nuovaPagina
- `8970` — spazio
- `9728` — _richNomeFile
- `9733` — _richPrepara
- `9746` — _richRegistra
- `9751` — _richStato
- `9753` — richScaricaPDF
- `9802` — _richUpload
- `9804` — _richWaUrl
- `9811` — _richTestoWa
- `9825` — richInviaWhatsApp
- `9865` — richCopiaLink
- `9886` — _richStoricoHtml

---
### REFERTI DEL SANGUE DATATI — storico nel tempo (P118 tappa 1)
Righe 9194-9387 — migrazione, ordinamento, quadro attuale derivato, barra di selezione.

- `10744` — _refertoNuovoId
- `10747` — _refertoOggi
- `10751` — _refertoDataIt
- `10757` — _refertoConteggio
- `10771` — _refertiMigra
- `10798` — _refertiOrdinati
- `10809` — _refertoPiuRecente
- `10814` — _refertoInVista
- `10832` — _refertiApplica
- `10845` — _refertoCrea
- `10864` — refertoCambiaVista
- `10870` — refertoCambiaData
- `10882` — refertoNuovo
- `10890` — refertoDuplica
- `10899` — refertoElimina
- `10914` — _refertiBarraHtml

---

### RANGE DI RIFERIMENTO — tabella 119 voci + lettura dal referto (P118 tappa 2)
Righe 9367+ — RANGE_STD, formattazione intervalli, riga sotto ogni valore.

- `10357` — _rangeNum
- `10363` — _rangeTestoDa
- `10382` — _rangeCoppia
- `10392` — _rangeHtml

---
### ANDAMENTO NEL TEMPO — tracciato, variazione, grafico grande (P118 tappa 3)
Righe 9441-9745 — serie storica, regola del colore, sparkline, pannello in fondo.

- `10434` — _andLimiti
- `10455` — _andParseRangeLab
- `10468` — _andDistanza
- `10475` — _andValutazione
- `10488` — _andSerie
- `10502` — _andNum
- `10506` — _andDataBreve
- `10511` — _andMeseAnno
- `10519` — _andDominio
- `10533` — _andColore
- `10546` — _andSparkHtml
- `10572` — _andRigaHtml
- `10594` — _andEsamiSeguibili
- `10602` — andScegliEsame
- `10608` — _andPannelloHtml
- `10661` — _andGraficoGrande
- `10712` — _andPasso

---


### COMPOSIZIONE CORPOREA — memoria InBody, pesi intermedi, silhouette segmentale
Righe 12150-12561

- `12150` — _ibFmtBreve
- `12159` — _renderPesiIntermediSection
- `12208` — aggiungiPesoIntermedio
- `12224` — eliminaPesoIntermedio
- `12234` — _ibSilhouetteSegmentale
- `10686` — pct
- `10692` — colMagra
- `10698` — colGrassa
- `10706` — colTroncoGrassa
- `12561` — renderPdInbody

---

### COMPOSIZIONE CORPOREA — render scheda InBody paziente
Righe 12833-12833

- `12833` — renderPdMacros

---

### MOTORE TDEE — render scheda macros, calcolo MET/NEAT/TEF, ciclizzazione, storico TDEE
Righe 13211-15752

- `13211` — aggiornaLabelMacros
- `13229` — calcolaMacros
- `13370` — applicaSchema
- `13405` — _TRAGUARDO_SOGLIE *(P122 — soglie grasso essenziale per sesso)*
- `13411` — _traguardoSoglie *(null se il sesso manca: nessun ripiego)*
- `13433` — _misuraDaReferto *(P127 — UN referto letto con le regole del traguardo: usata anche dalla verifica al controllo)*
- `13466` — _traguardoMisura *(InBody piu' recente · %grasso SEMPRE derivata dalla magra · rileva referti incoerenti)*
- `13477` — _traguardoModoDaCategoria *(dimagrimento vs ricomposizione, dalla categoria della Tappa 2)*
- `13495` — calcolaTraguardoComposizione *(due scenari, fascia, avvisi · dal 26/7 modo dimagrimento|ricomposizione)*
- `13608` — _traguardoGet *(normalizza p.obiettivoPercorso)*
- `13622` — _traguardoScrivi *(UNICO punto di scrittura: clinico + storico + specchio pesoTarget)*
- `13678` — _OB_CATEGORIE *(P122 T2 — categorie dell'obiettivo del paziente)*
- `13692` — _obiettivoPazienteDaForm *(P122 T2 — form → obiettivoPercorso.paziente, no-op senza markup)*
- `13724` — _traguardoConfrontoAspettativa *(pura · dal 26/7 riconosce le direzioni opposte guardando il peso attuale)*
- `13757` — _traguardoVocePazienteHtml *(riga "La voce del paziente" nel pannello 🎯)*
- `13799` — _STRADE_DEFAULT *(P123 — le tre velocità standard: −10/−15/−20%)*
- `13807` — _traguardoGrassoDaTogliere *(pura: i kg di grasso, quasi indipendenti dal muscolo previsto)*
- `13818` — _stradaCalcola *(kcal, ritmo sul grasso, settimane, data, guardrail)*
- `13845` — _stradaAllaScadenza *(dove sarà alla data che conta per il paziente)*
- `13860` — _stradeVerso *(le strade complete + percentuale libera)*
- `13907` — _VC_TOLLERANZA_PCT / _VC_GIORNI_MIN / _VC_GIORNI_MIN_RITARO / _VC_COPERTURA_MIN_PCT / _VC_MAGRA_PRUDENZA_GG *(P127 — soglie cliniche della verifica)*
- `13917` — _mediaSlotPrescritta *(media pesata sui giorni di un campo dello storico target; la usa anche _kcalMediaPrescrittaOss)*
- `13937` — _vcDeficitSlot *(deficit di uno slot: campo offset o kcal−tdee per gli slot vecchi)*
- `13945` — _vcTratto *(P127 — cosa è cambiato fra due referti, previsto vs reale, TDEE misurato)*
- `13999` — _vcTraguardoSalvato *(traguardo ricostruito dal salvato, per la scheda Percorso)*
- `14009` — _verificaControllo *(P127 — motore puro: tratto recente, quadro dall'inizio, residuo al ritmo reale)*
- `14047` — _verificaControlloHtml *(blocco 🔎, unica fonte per pannello 🎯 e scheda Percorso; azioni solo dove c'è il campo kcal)*
- `14139` — _vcRitara *(scrive le kcal ritarate nel campo regime: propone, non salva)*
- `14152` — _stradeHtml *(blocco 🛣, nascosto in chetogenica)* · `13350` _stradaPctExtra
- `14220` — _stradaUsa *(imposta il regime e propone di riscrivere le fasi)*
- `14242` — _traguardoPanelHtml *(guscio statico: selettore modo + campo pertinente + avviso referto incoerente)*
- `14295` — _traguardoAnteprima *(ridisegna solo #trg-out: niente perdita di focus)*
- `14402` — _traguardoAllineaManuale *(registra come revisione il traguardo scritto a mano)*
- `14417` — _traguardoUsa *(applica lo scenario scelto, salva, ridisegna)*
- `14442` — _renderRifPesoBox
- `14493` — _usaRifPeso
- `14497` — _aggiornaRifPesoTarget
- `14500` — _aggiornaRegimeSlider
- `15157` — _presetRegime
- `15161` — _initRegimeSliderDaPaziente
- `15179` — ricalcolaLAF
- `15313` — renderStoricoTDEE
- `15347` — attivaSlotTDEE
- `15355` — eliminaSlotTDEE
- `15368` — _toggleCiclizzazione
- `15374` — _aggiornaAnteprimaCiclizzazione
- `15392` — salvaCalcoloMacros
- `15506` — _metAllenamento
- `15522` — _neatFrazione
- `15596` — _larnLafStileVita
- `15613` — _regimeOffset
- `15623` — _componiRegimeText
- `15656` — _mifflinBMR *(P114 passo 7 — MB teorico Mifflin-St Jeor)*
- `15668` — _crossCheckMifflin *(P114 passo 7 — confronto MB InBody vs Mifflin, bandierina >15%)*
- `15675` — calcolaTDEE *(dal 24/7 restituisce anche `crossCheck`, P114 passo 7)*
- `15752` — renderPianoPage

---

### GENERATORE PIANI — validatore clinico (regola 75/20/5, validaPiano, override, gate export)
Righe 15770-16200

- `15770` — renderTargetBadge
- `15799` — verificaRegola_75_20_5
- `15836` — renderBadge75_20_5
- `15901` — _validaNorm
- `15904` — _validaMatchTermine
- `15912` — _validaCostruisciListe
- `13276` — addA
- `13277` — addR
- `13278` — addE
- `15963` — _validaTesto
- `15984` — validaPiano
- `16058` — _validaFirmaBlocchi
- `16065` — renderBadgeValidatore
- `16096` — _validaVaiAlGiorno
- `16105` — apriPannelloValidatore
- `13472` — esc
- `16162` — _validaEseguiOverride
- `16185` — validaGateExport
- `16200` — renderRiepilogoSettimana

---

### GENERATORE PIANI — riepilogo settimana, rendering piano con tab, template
Righe 16333-16965

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
- `16333` — pianoPazSelezionato
- `16480` — renderPianoConPillTabs
- `13846` — _renderGiornoGen
- `13890` — _dc
- `13891` — _dd
- `13898` — rowG
- `16718` — renderPanelMacrosGiorno
- `16861` — pmgCambiaGrammi
- `16888` — riapriPiano
- `16926` — _montaPianoCorrente
- `16965` — pushTemplateSupabase

---

### TEMPLATE PIANI — CRUD template, conflitti alimenti esclusi/allergie
Righe 16975-17444

- `16975` — pullTemplateSupabase
- `16986` — delTemplateSupabase
- `16995` — _promptTemplateNome
- `17020` — _creaTemplateDaJSON
- `17043` — salvaComeTemplate
- `17054` — salvaComeTemplateDaPiano
- `17063` — _normNomeAlim
- `17064` — _escRegAlim
- `17065` — _raccogliAlimentiDaPiano
- `17076` — _alimentiEsclusiPaziente
- `17088` — _trovaConflittiTemplate
- `17106` — _mostraAvvisoConflitti
- `17130` — applicaTemplate
- `17148` — apriPickerTemplate
- `17176` — _pickPaziente
- `17195` — applicaTemplatePick
- `17199` — rinominaTemplate
- `17210` — eliminaTemplate
- `17220` — renderLibreriaTemplate
- `17249` — renderStoricoPiani
- `17308` — eliminaPiano
- `17324` — _getActiveMacrosTarget
- `17348` — getTargetAttivi
- `17385` — calcolaTargetsCiclizzazione
- `17411` — _setupPianoTargets
- `17435` — getStagioneCorrente
- `17444` — costruisciPrompt

---

### GENERATORE PIANI — costruzione prompt AI (costruisciPrompt)
Righe 17878-17878

- `14882` — _ricSlots
- `14958` — _ricPescaBilanciata *(P119 — pescata bilanciata dell'ispirazione, annidata in costruisciPrompt)*
- `17878` — toggleRegolePiano

---

### REGOLE PIANO / MODELLI ROTAZIONE — editor modelli custom, frequenze pasti
Righe 17887-18346

- `17887` — aggiornaUIcolazione
- `17897` — salvaRegolePiano
- `17958` — _isModelloSistema
- `17961` — _isModelloSistemaModificato
- `17973` — caricaModelliCustomLocal
- `17987` — salvaModelliCustomLocal
- `18008` — _migraRecordCustom
- `18023` — _syncAliasLegacy
- `18032` — caricaAlimentiCustom
- `18056` — pushAlimentiCustomSupabase
- `18066` — pullAlimentiCustomSupabase
- `18080` — pushModelliSupabase
- `18098` — pullModelliSupabase
- `18123` — _calcolaFreqDaModello
- `18142` — aggiornaUImodello
- `18231` — popolaDropdownModelli
- `18259` — cambiaModelloRotazione
- `18265` — ripristinaModelloOriginale
- `18288` — eliminaModelloCustom
- `18306` — mostraAnteprimaModello
- `18316` — apriEditorModello
- `18346` — _renderGrigliaModello

---

### MODELLI ROTAZIONE — editor griglia visuale, salvataggio; AI CALL — auth token, aiCall generico
> Nota: dopo P66c + pulizia (18 lug 2026) i numeri di riga di quest'area e successive si sono spostati; usare grep per conferma.
Righe 18615-18853

- `15738` — rerender
- `18615` — _salvaModelloDaEditor
- `18657` — caricaRegolePiano
- `18687` — _aiPronto  (P66c: sostituisce getAnthropicKey — chiave AI solo server-side)
- `18722` — _aiLogUsage
- `18744` — _aiProxyUrl
- `18750` — _aiTokenPerProxy
- `18779` — aiCall
- `16144` — fetchConTimeout
- `16160` — unTentativo
- `18853` — _normalizzaPianoNuovo

---

### GENERATORE PIANI — normalizzazione/espansione piano AI, stile frutta
Righe 18932-19072

- `16216` — _risolviCollisioniCelle
- `18932` — espandiPiano
- `16287` — al2
- `16288` — espPasto
- `18992` — getFruttaStile
- `18999` — _fruttaGetPasto
- `19009` — _fruttaContaRigheRicetta
- `19013` — _fruttaIndiceBasePasto
- `19033` — getFruttaMarker
- `19046` — fruttaMarkerHtml
- `19054` — _fruttaCheckboxHtml
- `19063` — toggleFrutta
- `19072` — _appendToggleFruttaStile

---

### COMPOSITORE MANUALE — griglia celle, drag&drop, swap/alt alimenti, editor ricetta inline
Righe 19108-20382

- `19108` — _renderCelleGriglia
- `19188` — _renderRicetteTestuali
- `19227` — scambiaRicette
- `16586` — _ricDragTrovaRigaSotto
- `16592` — _ricDragPulisciEvidenza
- `16595` — _onPointerMove
- `16611` — _onPointerUp
- `19298` — _renderCelleHtml
- `19306` — toggleCellaMenu
- `19325` — closeAllCellaMenus
- `19333` — _trovaPasto
- `19341` — cellaSposta
- `19395` — cellaCancella
- `19416` — apriEditGrammatura
- `16789` — salva
- `19464` — cellaSwap
- `19484` — cellaRimuoviAlt
- `19498` — cellaAggiungiAlt
- `19601` — _mostraPopupAggiungiAlt
- `16968` — renderLista
- `19686` — apriEditRicetta
- `19695` — aggiungiRicetta
- `19711` — rimuoviRicetta
- `19720` — _mostraPopupEditRicetta
- `17112` — renderListaRicette
- `17141` — renderRicettario
- `17144` — renderParziali
- `17148` — salvaRicetta
- `19882` — ngAggiungiSpuntinoVuoto
- `19898` — apriAggiungiCella
- `17254` — risolviCompatibili
- `19994` — _apriPopupRicettaComposta
- `17376` — aggiornaMacros
- `20086` — _mostraPopupSceltaCategoriaAlimento
- `17499` — vaiAlleCategorie
- `20227` — _aggiornaPianoBox
- `17594` — _renderGiornoAttivo
- `20382` — parseJSONSicuro

---

### GENERATORE PIANI — parsing risposta AI, schema tool-use, chiamata generazione (chiamaGeneraPiano)
Righe 20430-20822

- `20430` — _attesoStrutturaPiano
- `20450` — _confrontaStrutturaPiano
- `20480` — _costruisciPromptDelta
- `20507` — _pianoToolSchema
- `20582` — _pianoMaxTokens
- `20591` — _estraiPianoDaRisposta
- `20613` — chiamaGeneraPiano
- `20780` — mostraLoadingSteps
- `18123` — render
- `20822` — apriAIWhatsApp

---

### MESSAGGISTICA AI — WhatsApp assistito, varianti, storico messaggi
Righe 20889-21466

- `20889` — generaMessaggioAI
- `20994` — copiaMessaggioAI
- `21004` — salvaInStorico
- `21016` — salvaVarianteAI
- `21031` — renderVariantiSalvate
- `21050` — usaVariante
- `21068` — eliminaVariante
- `21079` — renderStoricoMsg
- `21095` — apriWhatsApp
- `21466` — generaPiano

---

### COMPOSITORE MANUALE — editor manuale piano completo (creazione, drag&drop, ricerca alimenti)
Righe 21644-23141

- `21644` — _ngColoreSemaforoNome
- `21652` — apriSceltaModalitaPiano
- `21687` — _ngChiudiModalita
- `21690` — _ngCostruisciGiornoVuoto
- `21723` — _ngCostruisciGiornoSpeciale
- `21734` — _ngIndiceInizioSpeciali
- `21745` — _ngModalitaNomeGiorno
- `21751` — _ngImpostaModalitaNomeGiorno
- `21754` — _ngLettera
- `21761` — _ngEtichettaGiorno
- `21781` — _ngEtichettaGiornoBreve
- `21795` — _ngToggleGiornoSpeciale
- `21819` — _ngRenderPannelloSpeciale
- `21887` — _generaGiornoSpecialeAI
- `21987` — _ngGiornoHaContenuto
- `21999` — _ngCreaPianoManuale
- `22022` — _ngScrollTabGiorni
- `22032` — _ngAbilitaDragScroll
- `22069` — _ngCambiaNumeroGiorni
- `22101` — _ngRenderEditorManuale — LEGACY (14 lug sera): non più nel percorso vivo, Componi a mano ora usa _renderGiornoGen
- `22115` — _ngRenderAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaRenderPannelloAlimenti nel percorso vivo
- `22156` — _ngToggleCat
- `22165` — _ngFiltraAlbero — LEGACY (14 lug sera): fallback, sostituito da _garaFiltro nel percorso vivo
- `22189` — _ngRenderPianoDestra — LEGACY (14 lug sera): fallback, Componi a mano ora renderizza via _renderGiornoGen
- `22345` — _ngSalvaPianoManuale
- `22371` — _ngParseIngrediente
- `22395` — _ngScomponiIngredienti
- `22407` — _ricCalcolaMacroDaIngredienti
- `22425` — _ricRicalcolaMacroLive
- `22432` — _ricAggiornaInfoMacro
- `22446` — _ricRicalcolaMacroLiveNow
- `22470` — _ngTrovaCategoriaAlimento
- `22503` — _ngPescaRicetta
- `22546` — _ngScomponiRicettaNelPasto
- `22583` — _ngDragStart
- `22594` — _ngDragStartCella
- `22605` — _ngDragOver — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragOver
- `22612` — _ngDragLeave — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDragLeave
- `22617` — _ngDrop — LEGACY (14 lug sera): fallback, il percorso vivo usa _garaDrop
- `22636` — _ngAggiungiAlimento
- `22661` — _ngRimuoviAlimento
- `22675` — _ngDopoModifica
- `22693` — _garaRenderPannelloAlimenti (14 lug sera: pannello alimenti unificato — ricerca, semaforo, filtro solo-paziente)
- `22746` — _garaFiltro (14 lug sera: filtro combinato ricerca + solo-paziente per il pannello unificato)
- `22775` — _garaDragOver (14 lug sera: drop-zone pasto generatore — evidenzia + mostra grammi proposti)
- `22792` — _garaDragLeave (14 lug sera: drop-zone pasto generatore — reset evidenza)
- `22800` — _garaDrop (14 lug sera: drop-zone pasto generatore — inserisce alimento via _ngAggiungiAlimento)
- `22872` — gramTestoCasalingo
- `22898` — _appendToggleNutrizionali
- `22941` — _appendTogglePromemoria
- `22970` — _appendBtnConcetti
- `20293` — _refreshBtnConcetti
- `23116` — cpFromEmoji
- `23122` — getEmojiCp
- `23141` — generaPDF

---

### LISTA DELLA SPESA (P84) — motore, vista a riquadri, PDF diretto, condivisione
Righe ~15057-15410. NB: l'aggiunta di P84 ha spostato IN GIÙ di ~280 righe tutte le sezioni successive (EXPORT, ecc.): i numeri sotto qui sono aggiornati, quelli delle sezioni seguenti no — fare grep di conferma.

- `21116` — _SPESA_CAT_ORDINE / _SPESA_CAT_LABEL / _SPESA_CAT_GENERICHE / _SPESA_CAT_COLORE (config categorie: ordine, etichette, quali sono "generiche", colori riquadri)
- `21138` — _spesaTagliaFrutta (taglia frutta: 50=piccoli, 100=medi, 150=interi — valori fissi)
- `21143` — _spesaNorm · `15087` — _spesaEsc · `15091` — _spesaEsclusa (esclude sale e olio) · `15098` — _spesaFormattaQta · `15105` — _spesaQtaVoce
- `21169` — costruisciListaSpesa (MOTORE PURO: piano → lista aggregata per categoria; solo principali, no alternative; esclude sabato cena libera; frutta/verdura/frutta secca come voci a porzioni raggruppate per grammatura)
- `21257` — _spesaTestoWhatsApp
- `21273` — _spesaHtml (vista a riquadri colorati, due colonne bilanciate LPT + ordine canonico)
- `21318` — mostraListaSpesa (overlay + pulsanti Scarica PDF / Condividi PDF)
- `21341` — stampaListaSpesa (LEGACY window.print, non più collegata) · `15292` — copiaListaSpesa (LEGACY clipboard, non più collegata)
- `21369` — _spesaHexRgb · `15315` — _spesaCostruisciPDF (disegna il PDF con jsPDF, due colonne)
- `21429` — scaricaListaSpesaPDF (download diretto, un click)
- `21437` — whatsappListaSpesa (LEGACY wa.me testo, non più collegata)
- `21449` — condividiListaSpesaPDF (navigator.share col PDF allegato; fallback download su desktop)

Pulsante d'ingresso: `🛒 Lista della spesa` in renderPianoConPillTabs (ramo attivo _renderGiornoGen), sotto ai pulsanti del piano.

---

### EXPORT — generazione PDF piano (generaPDF)
Righe 24289-24289

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
- `24289` — openInbody

---

### COMPOSIZIONE CORPOREA — salvataggio InBody, ascolta progresso vocale
Righe 24300-24506

- `24300` — salvaInbody
- `24364` — delInbody
- `24371` — ascoltaProgresso
- `21688` — d
- `21689` — fD
- `24506` — buildSemBadges

---

### ALIMENTI CUSTOM + P108 FASE 1 (sezione "Alimenti") — editor, badge semaforo per condizione, CRUD custom, archivia/ripristina
Righe 24534-25003

- `24534` — buildSemLegenda
- `24548` — renderAlEditor
- `24609` — _alimNomeRegex
- `24617` — _alimGiorniDaPiano
- `24625` — _scanGiorniPerNome
- `24640` — scanRiferimentiAlimento
- `24669` — _alimRefsRighe
- `24675` — rinominaAlimentoCustom
- `21991` — _renameInGiorni
- `22010` — _renameInPianoRecord
- `24763` — modificaAlimentoCustom
- `24783` — ripristinaValoriPrecedentiAlimento
- `24795` — _resetAlimModal
- `24806` — apriNuovoAlimentoCustom
- `24812` — salvaAlimentoCustom
- `24879` — eliminaAlimentoCustom
- `24910` — _alimFonteBadge
- `24915` — renderAlimentiPage
- `22217` — E
- `24985` — archiviaAlimentoCustom
- `25003` — ripristinaAlimentoCustom

---

### SCANNER BARCODE — P110 (Open Food Facts) — camera nativa/ZXing, fetch OFF, precompilazione form, dedup
Righe 25030-25267

- `25030` — _bcSetStatus
- `25032` — apriScannerBarcode
- `25040` — chiudiScannerBarcode
- `25045` — _bcStopCamera
- `25053` — _bcModaleAperto
- `25055` — _bcAvviaCamera
- `25066` — _bcAvviaNativo
- `25086` — _bcAvviaZXing
- `25095` — _bcZXStart
- `25106` — _bcErroreCamera
- `25114` — cercaBarcodeManuale
- `25120` — _barcodeTrovato
- `25136` — cercaBarcodeOFF
- `25154` — _bcProdottoNonTrovato
- `25168` — _bcPrecompilaForm
- `22477` — num
- `25192` — togAl
- `25245` — selCatAl
- `25402` — selTuttiAl
- `25267` — getEventi

---

### CALENDARIO APPUNTAMENTI — viste mese/settimana/giorno, eventi, disponibilità
Righe 25281-25597

- `25281` — setCalView
- `25282` — calPrev
- `25283` — calNext
- `25284` — calToday
- `25286` — renderCal
- `25300` — renderCalMonth
- `25324` — renderCalWeek
- `25342` — renderCalDay
- `25358` — selGiorno
- `25372` — setDisp
- `25377` — openAddEvento
- `25390` — openAddEventoPaz
- `25396` — toggleEntrataCheck
- `25401` — salvaEvento
- `25424` — openEvDetail
- `25479` — delEvento
- `25487` — copyMsg
- `25494` — aggDateCal
- `25499` — syncInizio
- `25500` — syncControllo
- `25501` — aggiornaPrev
- `25518` — renderRic
- `25545` — openNuovaRic
- `25546` — editRic
- `25556` — salvaRic
- `25581` — delRic
- `25597` — renderEntrate

---

### RICETTARIO — CRUD ricette
Righe 25682-25742

- `25682` — aggiungiEntrataPerPaziente
- `25699` — openNuovaEntrata
- `25713` — salvaEntrata
- `25734` — delEntrata
- `25742` — startVoiceRicetta

---

### RICETTARIO — input vocale, suggerimento AI ricetta; CONCETTI EDUCATIVI — modale allegati
Righe 25772-26208

- `25772` — aiSuggerisciRicetta
- `25817` — renderConcettiModal
- `25836` — apriConcettiModal
- `25863` — salvaConcettiAllegati
- `25887` — _ibNormalizzaData *(P120 — data del test dal referto → YYYY-MM-DD o null)*
- `25925` — _ibOrdinaPerData *(P120 — invariante: p.inbody sempre ordinato per data)*
- `25934` — loadInbodyPDF
- `26045` — _vitdLabel
- `26049` — getIntegratori
- `26053` — getIntegraWant
- `26057` — setIntegratori
- `26074` — setIntegraWant
- `26085` — getPatologieChip
- `26086` — getAllergieChip
- `26087` — setPatologieChip
- `26088` — setAllergieChip
- `26089` — getPatologie
- `26090` — getAllergie
- `26091` — setPatologieFromStr
- `26098` — setAllergieFromStr
- `26111` — getSdvChip
- `26112` — getCspChip
- `26113` — setSdvChip
- `26114` — setCspChip
- `26115` — setSdvFromStr
- `26116` — setCspFromStr
- `26120` — getBudget
- `26121` — setBudget
- `26126` — renderCalAnno
- `26157` — comprimeImmagine
- `26179` — uploadImmagineConcetto
- `26198` — rimuoviImmagineConcetto
- `26208` — renderConcettiPage

---

### CONCETTI EDUCATIVI — pagina gestione, riscrittura AI, upload immagini
Righe 26274-26378

- `26274` — entraSelConcetti
- `26275` — annullaSelConcetti
- `26276` — toggleConcettoSel
- `26281` — eliminaConcettiSelezionati
- `26300` — confermaEliminaConcetti
- `26315` — aiRiscriviConcetto
- `26329` — editConcetto
- `26347` — salvaConcetto
- `26358` — openNuovoConcetto
- `26378` — getAgendaPersonale

---

### DASHBOARD — agenda personale, todo, promemoria
Righe 26379-26542

- `26379` — saveAgendaPersonale
- `26380` — getAgendaTodo
- `26381` — saveAgendaTodo
- `26383` — pulisciAgendaVecchia
- `26387` — navigaAgenda
- `26396` — toggleFormAgenda
- `26397` — toggleFormTodo
- `26399` — salvaAgendaItem
- `26413` — salvaTodoItem
- `26425` — toggleAgendaFatto
- `26433` — toggleTodoFatto
- `26446` — _catCol
- `26448` — renderAgendaDx
- `26542` — renderDashboard

---

### DASHBOARD — home, scadenze/alert controlli in ritardo
Righe 26668-26872

- `26668` — renderScadenzeAlert
- `26853` — segnaGestito
- `26872` — archiviaPaz

---

### PAZIENTI — archiviazione/ripristino/eliminazione
Righe 26881-26956

- `26881` — ripristinaPaz
- `26889` — eliminaPaz
- `26934` — getDove
- `26938` — setDove
- `26956` — salvaCredenzialiPersistenti

---

### AUTENTICAZIONE — login/signup/recovery, refresh token, sessione Supabase
Righe 26961-27401

- `26961` — getCredenzialiPersistenti
- `26974` — cancellaCredenzialiPersistenti
- `26979` — rinnovaSessioneConRefreshToken
- `26996` — getSessioneSalvata
- `27015` — salvaSessione
- `27025` — cancellaSessione
- `27029` — eseguiLogin
- `27076` — eseguiLogout
- `27098` — mostraApp
- `27103` — verificaSessioneEAvvia
- `27131` — assicuraTokenValido
- `27160` — _garantiscoSessionePerSync
- `27172` — avviaRinnovoTokenPeriodico
- `27176` — fermaRinnovoTokenPeriodico
- `27185` — _authReset
- `27190` — _authMostra
- `27193` — mostraLogin
- `27194` — mostraRegistrazione
- `27195` — mostraRecupero
- `27196` — mostraNuovaPassword
- `27199` — eseguiRegistrazione
- `27237` — eseguiRecuperoPassword
- `27266` — eseguiNuovaPassword
- `27300` — _parseHashParams
- `27307` — _pulisciHash
- `27311` — gestisciRitornoAuth
- `27401` — renderPianoBox

---

### GENERATORE PIANI — rendering box piano, pannello scelta ricette, patch piano
Righe 27473-27596

- `27473` — apriPannelloRicette
- `27502` — chiudiPannelloRicette
- `27510` — applicaRicettaPasto
- `27546` — inizializzaP2
- `27558` — deepClone
- `27562` — applicaPatch
- `27596` — _aggiornaLabelSalvaPiano
- `24992` — getHint
- `24997` — validaInput
- `25022` — attacca
- `25029` — attaccaTutti
- `25037` — wireCatChips

---
